/* engine/game.js — 한 판의 흐름: 덱 만들기 → 카드 넘기기 → 「이번 판에서」+「실제 역사」 두루마리 → 실각(그 왕 처음부터) / 클리어 → 사관 퀴즈 → 다음 왕
 * 시대와 무관하다. 카드는 설계서 10-5 형식(kind, stages, line, choices.right/left{label, effects, this_run, build_state, build}, real_history …),
 * 난이도 숫자는 시대팩의 difficulty 표(설계서 10-7)에서 읽는다. 진행은 카드마다 저장해 이어하기가 된다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const G = (JK.Game = { run: null, state: 'title' });
  let era, W, S, Cards, pics;
  const cardsById = {};

  G.init = function (opts) {
    era = JK.era;
    W = JK.World;
    S = JK.Save;
    Cards = JK.Cards;
    pics = opts.portraits;
    for (const c of era.data.cards) cardsById[c.id] = c;
    Cards.init({ gauges: era.gauges, onCommit: commit });
    JK.Crisis.init();
    JK.Events.init();
  };
  G.card = (id) => cardsById[id];
  const stageOf = (id) => era.stages.find((s) => s.id === id);
  const stageIndex = (id) => era.stages.findIndex((s) => s.id === id);
  const isFixed = (c) => c.kind === 'history' || c.kind === 'sagwan';

  /* ---------- 난이도 (설계서 10-7) ---------- */
  G.diffId = () => (G.run && G.run.diff) || S.settings.difficulty || era.difficultyDefault || 'normal';
  G.diff = (id) => era.difficulty[id || G.diffId()];
  // 카드 효과에 난이도 배율과 안전 구간을 적용한다(역사·카드 순서는 그대로)
  // 왕별 시작 배경(설계서 10-12): 시작 게이지·기본 보정(위기 확률·변화 배율)은 data/common/stages.js. 난이도 배율과 곱한다
  G.stageInfo = (id) => ((era.data.stageInfo || {})[id || (G.run && G.run.stage)] || {});
  G.stageMult = (k) => (G.stageInfo()[k] !== undefined ? G.stageInfo()[k] : 1);
  // 시작 게이지: 그 왕의 값. 🌱 새싹은 50 쪽으로 절반 당긴다
  G.startVals = function (stageId, diffId) {
    const s = G.stageInfo(stageId).start;
    const v = {};
    for (const g of era.gauges) {
      const x = s && s[g.key] !== undefined ? s[g.key] : 50;
      v[g.key] = diffId === 'sprout' ? Math.round(50 + (x - 50) / 2) : x;
    }
    return v;
  };
  G.effect = function (k, base, vals) {
    const D = G.diff();
    let v = base * D.mult * G.stageMult('mult');
    // 왕의 기질(10-13-2): 의심 = 양반 오름 ½ · 성급 = ×1.25 · 너그러움 = 백성 내림 ½
    if (JK.Events) v = JK.Events.effectMult(k, v);
    const cur = vals[k];
    if (D.safe && ((v < 0 && cur < D.safe.below) || (v > 0 && cur > 100 - D.safe.below))) v *= D.safe.k;
    return Math.round(v);
  };

  /* ---------- 덱 만들기 (설계서 10-2) ---------- */
  function shuffle(a, rnd) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  G.buildDeck = function (stage, seed, used, short) {
    const rnd = JK.rng(seed);
    const cards = era.data.cards;
    const si = stageIndex(stage.id);
    const hist = cards.filter((c) => isFixed(c) && !c.variant_of && c.stages.includes(stage.id)).sort((a, b) => a.order - b.order);
    // 무작위 후보(10-2): 일상·희귀·전설과 사슬의 첫 카드. 사슬의 다음 카드·씨앗 열매·다른 길 카드·꼭 끼울 카드는 따로 들어온다
    const followers = new Set(cards.filter((c) => c.chain_next).map((c) => c.chain_next.card).concat(cards.filter((c) => c.seed && c.seed.fruit_id).map((c) => c.seed.fruit_id)));
    const daily = cards.filter(
      (c) => ['daily', 'rare', 'legend', 'chain'].includes(c.kind) && !c.force && !c.alt_only && !followers.has(c.id) && c.stages.includes(stage.id) && !used.includes(c.id),
    );
    // 필수(★)는 이 왕에서 꼭 한 번. 다른 왕의 필수 카드는 그 왕보다 앞선 왕에서 뽑지 않는다.
    const required = daily.filter((c) => c.required_in === stage.id);
    const optional = short ? [] : shuffle(daily.filter((c) => !c.required_in || stageIndex(c.required_in) < si), rnd);
    // 일상 카드는 역사 카드 사이(첫 카드 뒤부터)에 끼운다
    const gaps = Math.max(1, hist.length - 1);
    const slots = Array.from({ length: gaps }, () => []);
    shuffle(required.slice(), rnd).forEach((c, i) => slots[(Math.floor(rnd() * gaps) + i) % gaps].push(c.id));
    // 무작위 칸은 '*' 자리표만 둔다. 어떤 카드가 올지는 그 자리에 왔을 때 게이지 상태·결 규칙으로 뽑는다(10-9-3)
    const [mn, mx] = stage.randomSlots || [5, 8];
    const n = mn + Math.floor(rnd() * (mx - mn + 1));
    // 어떤 사건 앞에는 무작위 칸을 꼭 둔다(slotsBefore — 담임 제보: T01이 판 맨 처음이라 게이지를 움직일 기회가 없었음)
    let placed = 0;
    for (const id in stage.slotsBefore || {}) {
      const gi = hist.findIndex((c) => c.id === id) - 1;
      if (gi < 0) continue;
      for (let k = 0; k < stage.slotsBefore[id] && placed < n && placed < optional.length; k++, placed++) slots[gi].push('*');
    }
    for (let k = placed; k < n && k < optional.length; k++) slots[Math.floor(rnd() * gaps)].push('*');
    G.lastPool = optional.map((c) => c.id);
    for (const s of slots) shuffle(s, rnd);
    const deck = [];
    hist.forEach((c, i) => {
      deck.push(c.id);
      if (i < slots.length) deck.push(...slots[i]);
    });
    if (!hist.length) for (const s of slots) deck.push(...s);
    return deck;
  };

  /* ---------- 판 시작·이어하기 ---------- */
  const fifty = () => {
    const v = {};
    for (const g of era.gauges) v[g.key] = 50;
    return v;
  };
  // 판 = 왕 하나(담임 결정 2026-10-21: 왕끼리 이어지지 않는다). 예전 저장의 '다음 왕 기다리는 중'은 끝난 판으로 본다
  G.hasRun = () => !!(S.run && S.run.era === era.id && S.run.stage && !S.run.waiting && !S.run.ended);
  // 새 판: 고른 왕 하나를 시작 게이지(50)에서. opts.afterFall: 실각 뒤 다시(새싹은 처음 3장 큰 미리보기, 10-7)
  G.newRun = function (stageId, diffId, opts) {
    opts = opts || {};
    S.meta.plays++;
    S.saveMeta();
    document.body.classList.remove('over');
    W.state.inkTarget = 0;
    W.state.ink = 0;
    const seed = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
    const diff = diffId || S.settings.difficulty || 'normal';
    const st = stageOf(stageId) && stageOf(stageId).ready ? stageId : era.stages[0].id;
    const sv = G.startVals(st, diff);
    G.run = { era: era.id, seed, diff, easiest: diff, stage: st, vals: Object.assign({}, sv), start: sv, used: [], stats: { fallsRun: 0, quiz: { asked: 0, right: 0 } }, intro: true };
    if (opts.afterFall && era.difficulty[diff].afterFall === 'reset50') G.run.bigPreview = 3;
    G.startStage(st, G.run.start);
  };
  // 판 도중 난이도를 바꾸면 그 판의 칭호는 가장 쉬운 단계 기준(설계서 10-7)
  G.setDifficulty = function (id) {
    S.setSetting('difficulty', id);
    if (!G.run) return;
    G.run.diff = id;
    const order = Object.keys(era.difficulty);
    if (order.indexOf(id) < order.indexOf(G.run.easiest || id)) G.run.easiest = id;
    save();
    refreshWarn();
  };
  G.startStage = function (stageId, start) {
    const st = stageOf(stageId);
    const run = G.run;
    run.stage = stageId;
    run.start = Object.assign({}, start);
    run.vals = Object.assign({}, start);
    run.stageSeed = (run.seed + stageIndex(stageId) * 7919 + (run.stats.fallsRun || 0) * 104729) >>> 0;
    run.deck = G.buildDeck(st, run.stageSeed, run.used || [], S.settings.short);
    run.pool = G.lastPool || [];
    run.pos = 0;
    // 결(10-9): 지나간 카드의 결, 씨앗 → 열매 예약, 안정이 이어진 장수, 마지막으로 위기를 버틴 자리
    run.grainHist = [];
    run.reserve = [];
    run.calmRun = 0;
    run.heldAt = -99;
    run.pending = null;
    run.built = run.builtBefore ? run.builtBefore.slice() : [];
    run.builtBefore = run.built.slice();
    run.states = Object.assign({}, run.statesBefore || {});
    run.statesBefore = Object.assign({}, run.states);
    run.flags = Object.assign({}, run.flagsBefore || {});
    run.flagsBefore = Object.assign({}, run.flags);
    run.grown = run.grownBefore || 0;
    run.stageStats = { edge: false, falls: run.stageStats && run.stageStats.stage === stageId ? run.stageStats.falls : 0, stage: stageId };
    run.waiting = null;
    // 게이지 위기 상태(10-8): 왕을 새로 시작하면 모두 처음부터. 손상된 건물도 이때 고쳐진다
    run.zones = {};
    run.crisisRest = 0;
    run.damaged = {};
    run.followups = [];
    run.pendingFollow = {};
    run.followStep = {};
    run.cooldown = {};
    run.forewarned = {};
    run.forewarnCount = 0;
    run.eventScene = null;
    // 조건 식(engine/cond.js)이 읽는 이번 왕의 기록
    run.choices = {};
    run.seenRun = [];
    // 역사 분기(10-10): 이 왕에서 고른 다른 길, 바뀌는 뒤 카드, 서지 않은 실제 건물(다음 왕에서 합류), 위기 확률 배율
    run.route = run.route || {};
    run.route[stageId] = {}; // 진엔딩 판정(10-11): 이 왕의 사건마다 same/diff/open/life. 실각해 다시 하면 다시 한 기록으로
    run.altPick = {};
    run.altCards = [];
    run.variants = {};
    run.altSkipped = [];
    run.crisisMult = {};
    run.branchDone = [];
    run.flagsRun = Object.assign({}, run.flagsRunBefore || {});
    // 돌발 이벤트·왕의 마음(10-13): 판마다 처음부터(선조·인조·고종은 마음 20에서, 10-12)
    run.lastShown = '';
    JK.Events.reset(run, G.stageInfo(stageId));
    G.state = 'play';
    setupWorld(st, false);
    save();
    // 새 판이면 그 왕의 소개 화면(10-12 ③) 뒤에 첫 카드
    // (시험 도구: 주소에 pick=… 이 있으면 소개 화면을 건너뛴다)
    if (run.intro && new URLSearchParams(location.search).get('pick')) run.intro = false;
    if (run.intro) {
      run.intro = false;
      setTimeout(() => JK.UI.showIntro(st, G.stageInfo(st.id), () => setTimeout(showCurrent, 300)), 900);
    } else setTimeout(showCurrent, 700);
  };
  G.continueRun = function () {
    G.run = S.run;
    const run = G.run;
    const st = stageOf(run.stage);
    if (run.waiting || run.ended) return JK.UI.toTitle();
    G.state = 'play';
    setupWorld(st, true);
    setTimeout(showCurrent, 500);
  };
  function setupWorld(st, restoring) {
    W.reset();
    W.setSky(st.sky);
    W.state.title = false;
    // 시작 장면(10-12 ③): 이번 판에서 치우지 않은 장식만(T01에서 내려간 고려 깃발 등은 G.run.unscene)
    for (const k of st.scene || []) if (!(G.run.unscene || []).includes(k)) W.buildInstant(k);
    for (const k in st.prebuilt || {}) {
      const v = era.map.buildings[k];
      W.buildInstant(k, st.prebuilt[k]);
      if (v && v.grow && G.run.grown) W.growVillage(k, v.grow * G.run.grown, true);
    }
    // 앞 왕에서 지은 것은 상태 없이, 이 왕에서 지은 것은 상태(늦게 = 비계)까지 되살린다
    for (const k of G.run.built) W.buildInstant(k, undefined, G.run.builtBefore.includes(k) ? null : (G.run.states || {})[k]);
    const fl = G.run.flags || {};
    if (fl.boats) W.fxBoats(true);
    if (fl.flag) W.fxFlag(true);
    W.state.people = G.run.vals.people !== undefined ? G.run.vals.people : 50;
    setTOD(true);
    W.camTo(W.CAM_PLAY, restoring ? 1.2 : 2.4);
    W.setOrbit(false);
    Cards.setGauges(G.run.vals, true);
    refreshWarn(true);
    for (const k in G.run.damaged || {}) W.setBuildState(k, 'damaged', 0);
    JK.UI.setStage(st);
    refreshSeal();
    JK.Events.setKing(pics[st.kingRole || st.id], st.name);
    JK.Events.refresh(G.run, true);
    if (JK.EvFx) JK.EvFx.reset();
  }
  function setTOD(instant) {
    const st = stageOf(G.run.stage);
    const n = Math.max(1, G.run.deck.length - 1);
    const t = st.tod[0] + (st.tod[1] - st.tod[0]) * Math.min(1, G.run.pos / n);
    W.setTOD(t, instant);
  }
  function save() {
    S.saveRun(G.run);
  }
  // 게이지 구간(안정/경고/위험): 아이콘·알림·세계 반응 (engine/crisis.js)
  function refreshWarn(quiet) {
    JK.Crisis.apply(G.run, quiet);
  }

  /* ---------- 카드 보여 주기 ---------- */
  function roleView(doll, name) {
    const r = era.data.roles[doll] || { name: name || '', tag: '', bg: '#ddd' };
    return { img: pics[doll], bg: r.bg, name: name || r.name, tag: r.tag };
  }
  /* ---------- 결 (설계서 10-9) ---------- */
  const grainCfg = () => era.grain || {};
  const fruitIds = () => {
    if (!G._fruits) G._fruits = new Set(era.data.cards.filter((c) => c.seed && c.seed.fruit_id).map((c) => c.seed.fruit_id));
    return G._fruits;
  };
  // 같은 결 연속 / 금지 짝 검사: seq 끝에 붙은 결이 규칙을 어기면 true
  function grainBreaks(seq) {
    const g = grainCfg();
    const n = seq.length;
    if (!n || !seq[n - 1]) return false;
    const last = seq[n - 1];
    let k = 0;
    for (let i = n - 1; i >= 0 && seq[i] === last; i--) k++;
    if (k > ((g.maxRun || {})[last] || 99)) return true;
    for (const [a, b] of g.banAfter || []) if (n >= 2 && seq[n - 2] === a && last === b) return true;
    return false;
  }
  // 지금 게이지 상태(10-9-3 표): 위험 이하 / 위기 수습 직후 / 오래 안정
  function grainState(run) {
    const zones = run.zones || {};
    for (const row of grainCfg().state || []) {
      if (row.when === 'danger' && Object.values(zones).some((z) => JK.Crisis.RANK[z.level] >= 2)) return row;
      if (row.when === 'afterHeld' && run.pos - (run.heldAt || -99) <= (row.cards || 3)) return row;
      if (row.when === 'calm' && (run.calmRun || 0) > (row.cards || 6)) return row;
    }
    return null;
  }
  G.grainState = () => grainState(G.run);
  // 이 결의 카드를 지금 자리에 내도 연속 규칙(10-9-3)을 어기지 않는가 — 돌발 뽑기(engine/events.js)도 쓴다
  G.grainFits = function (run, grain) {
    if (!grain) return true;
    const seq = run.grainHist.concat(grain);
    if (grainBreaks(seq)) return false;
    for (let i = run.pos + 1; i < run.deck.length; i++) {
      if (run.deck[i] === '*') break;
      const nc = cardsById[run.deck[i]];
      if (nc && nc.grain) return !grainBreaks(seq.concat(nc.grain));
    }
    return true;
  };
  // 무작위 칸 하나 뽑기: 조건(cond.js) → 결 가중치(상태 × 난이도) → 앞뒤 연속 규칙
  function drawRandom(run) {
    const ctx = { run, meta: S.meta };
    const fr = fruitIds();
    const row = grainState(run);
    const dm = (grainCfg().diff || {})[G.diffId()] || {};
    // 바로 뒤 고정 카드의 결(연속 규칙은 앞뒤 모두 본다)
    let nextGrain = null;
    for (let i = run.pos + 1; i < run.deck.length; i++) {
      const nc = cardsById[run.deck[i]];
      if (run.deck[i] === '*') break;
      if (nc && nc.grain) {
        nextGrain = nc.grain;
        break;
      }
    }
    const cands = [];
    for (const id of run.pool) {
      const c = cardsById[id];
      if (!c || fr.has(id) || (run.used || []).includes(id) || !JK.Cond.test(c.conditions, ctx)) continue;
      const g = c.grain || 'balance';
      let w = deckWeight(c) * ((row && row.mult && row.mult[g]) || 1) * (dm[g] || 1);
      const seq = run.grainHist.concat(g);
      const bad = grainBreaks(seq) || (nextGrain && grainBreaks(seq.concat(nextGrain)));
      cands.push({ id, w, bad });
    }
    let list = cands.filter((x) => !x.bad);
    if (!list.length) list = cands; // 모두 걸리면 규칙보다 카드가 나오는 쪽
    if (!list.length) return null;
    const rnd = JK.rng((run.stageSeed + run.pos * 613 + run.grainHist.length * 17) >>> 0);
    let sum = 0;
    for (const x of list) sum += x.w;
    let r = rnd() * sum;
    for (const x of list) if ((r -= x.w) <= 0) return x.id;
    return list[list.length - 1].id;
  }
  // 무작위 칸 가중치(설계서 10-2): 희귀도(보통 1 · 드묾 .35 · 희귀 .12 · 전설 .04) × 처음 보는 카드 3 × 기록관 10권 이상이면 드묾·희귀 1.5 × 난이도 rareMult
  function deckWeight(c) {
    const dk = era.deck || {};
    const r = c.rarity || 'common';
    let w = (dk.rarity || {})[r] !== undefined ? dk.rarity[r] : 1;
    if (!S.meta.seen[c.id]) w *= dk.unseen || 3;
    if ((r === 'uncommon' || r === 'rare') && G.archiveCount() >= (dk.archiveBoostAt || 10)) w *= dk.archiveBoost || 1.5;
    if (r === 'rare' || r === 'legend') w *= G.diff().rareMult || 1;
    return w;
  }
  // 기록관 권수 = 왕을 마친 기록 + 실각 기록(설계서 10-1, 담임 판단: 전설 조건에 씀)
  G.archiveCount = function () {
    let n = 0;
    for (const k in S.meta.clears || {}) n += S.meta.clears[k];
    for (const k in S.meta.falls || {}) n += S.meta.falls[k];
    return n;
  };
  // 도박 결과 미리 정하기는 하지 않는다. 고른 순간 굴린다(성공 확률은 난이도표)
  function gambleRoll(run, c) {
    const p = ((grainCfg().gambleWin || {})[G.diffId()]) || 0.6;
    return JK.rng((run.stageSeed + run.pos * 2027 + (run.stats.fallsRun || 0) * 13 + 5) >>> 0)() < p;
  }

  function showCurrent() {
    const run = G.run;
    if (G.state !== 'play') return;
    if (run.pending) return showRecord();
    // 무작위 칸: 이 자리에서 뽑는다. 낼 카드가 없으면 칸을 지운다
    while (run.deck[run.pos] === '*') {
      // 돌발 이벤트(10-13-1): 무작위 칸이 난이도별 확률로 돌발 카드가 된다
      const id = JK.Events.tryReplace(run, JK.rng((run.stageSeed + run.pos * 7177 + 3) >>> 0)) || drawRandom(run);
      if (id) {
        run.deck[run.pos] = id;
        run.pool = run.pool.filter((x) => x !== id);
      } else run.deck.splice(run.pos, 1);
    }
    if (run.pos >= run.deck.length) return stageClear();
    // 다른 길 때문에 바뀐 뒤 카드(변형판). 변형판 카드가 아직 없으면 원래 카드 그대로
    const vid = run.variants && run.variants[run.deck[run.pos]];
    if (vid && cardsById[vid]) run.deck[run.pos] = vid;
    const c = cardsById[run.deck[run.pos]];
    const st = stageOf(run.stage);
    const v = roleView(c.who.doll, c.who.name);
    const D = G.diff();
    const scaled = (side) => {
      const o = {};
      for (const k in side.effects || {}) o[k] = G.effect(k, side.effects[k], run.vals);
      return o;
    };
    const crisisEvent = c.kind === 'crisis' && c.level !== 'warn';
    // 이 자리에서 처음 뜨는가(이어 하기로 다시 뜰 때 마음·즉시 효과를 두 번 하지 않게)
    const first = run.lastShown !== run.pos + ':' + c.id;
    run.lastShown = run.pos + ':' + c.id;
    const isEv = JK.Events.isEvent(c);
    let evNow = null;
    if (isEv) {
      const luck = c.ev === 'chain' ? (c.event || {}).luck : c.ev;
      v.game = true;
      v.evTag = `${c.ev === 'chain' ? '연쇄' : '돌발 · ' + ((era.events.names || {})[c.ev] || '')} · ${c.name}`;
      v.evKind = luck;
      if (first) evNow = JK.Events.onShow(run, c);
    }
    if (c.kind === 'crisis') {
      v.tag = c.level === 'warn' ? '예고' : c.level === 'followup' ? '후속 위기' : '위기';
      v.game = !!c.game_event;
      if (crisisEvent) {
        v.crisisName = c.name;
        v.similar = c.similar || null;
        // 버튼 아래 무너질 확률(새싹 숫자 / 보통 말 / 성군·실록 없음)
        const pL = JK.Crisis.fallChance(c, 'left', run.vals).p;
        const pR = JK.Crisis.fallChance(c, 'right', run.vals).p;
        const L = JK.Crisis.chanceLabel(pL);
        const R = JK.Crisis.chanceLabel(pR);
        if (L || R) v.chance = { left: L, right: R };
        // 위기가 터짐: 왕의 마음 +20, 사관 한 줄(실각 확률이 50% 넘으면 '마지막 장')
        if (first) {
          JK.Events.addMind(run, (era.mind.up || {}).crisis || 20);
          JK.Events.say(run, Math.min(pL, pR) > 0.5 ? 'brink' : 'crisis');
        }
      }
    }
    if (!run.seenRun.includes(c.id)) run.seenRun.push(c.id);
    // 역사 분기(10-10-1): 실제 경로 잠김 · 아래 '다른 길' 버튼(열림 조건) · 막다른 길 금지
    if (c.paths && c.choices) Object.assign(v, pathView(run, c));
    // 실제 경로가 잠겨 다른 길만 열림: 왕의 마음 +10
    if (v.realShut && first) JK.Events.addMind(run, (era.mind.up || {}).realShut || 10);
    Object.assign(v, {
      crisis: c.kind === 'crisis' ? c.level : '',
      text: JK.Events.lineOf(run, c, lineOf(run, c)),
      left: c.choices && c.choices.left.label,
      right: c.choices && c.choices.right.label,
      single: c.single,
      scroll: c.kind === 'sagwan',
      outside: !!c.out_of_textbook,
      turn: `${run.pos + 1} / ${run.deck.length}`,
      year: c.year || '',
      fx: c.single ? null : { left: previewFx(c, 'left', scaled), right: previewFx(c, 'right', scaled) },
      grainMark: c.grain && (grainCfg().marks || {})[c.grain] ? grainMarkFor(c) : null,
      // 지친 왕(10-13-2): 게이지 점(미리보기)이 보이지 않는다
      preview: JK.Events.previewHidden(run) ? 'none' : run.bigPreview > 0 ? 'arrows' : D.preview,
      rarity: ['rare', 'legend', 'uncommon'].includes(c.rarity) && c.kind !== 'daily' ? c.rarity : '',
      chain: c.kind === 'chain' ? c.chain || '사건 사슬' : '',
      hand: st.tutorial && run.pos < st.tutorial && S.meta.cardsPlayed < 12,
    });
    if (isEv) {
      const ln = lineIf(run, c);
      if (ln && ln.who) v.name = ln.who;
    }
    S.markSeen(c.id);
    Cards.show(v);
    // 돌발이 터지는 순간(10-13): 큰 글씨, 세계 연출, 즉시 효과(작게)
    if (isEv && first) {
      JK.Events.banner(c);
      if (JK.EvFx) JK.EvFx.play((c.fx || {}).scene, c);
      if (evNow && Object.keys(evNow.now).length) {
        setTimeout(() => {
          Cards.setGauges(run.vals);
          Cards.flash(evNow.now, true);
          W.state.people = run.vals.people;
          refreshWarn();
          save();
        }, 900);
      }
    }
    // 갈래 카드의 세계 연출(10-14-3 연출 칸: 두 대감의 논쟁 · 한양을 그리워하는 신하 · 역참 길)
    if (!isEv && first && c.fx && c.fx.scene && JK.EvFx) JK.EvFx.play(c.fx.scene, c);
    // 기질이 붙음·풀림·무너질 듯한 밤 알림, 사관의 한 줄(세 장에 한 번)
    for (const p of JK.Events.takePending()) setTimeout(() => JK.Events.announce(p), 1200);
    JK.Events.flush(run);
    // 위기 사건(10-8-4): 위기 장면(3단계), 아이콘 흔들림, 카메라 살짝 당김, 징 한 번
    if (crisisEvent) {
      run.eventScene = { gauge: c.gauge, side: c.side, until: run.pos + 1 };
      refreshWarn(true);
      W.crisisBeat();
      W.camTo({ dist: W.CAM_PLAY.dist - 3 }, 1.4);
      Cards.gaugeMark(c.gauge, 'quake');
      if (JK.Audio) JK.Audio.gong();
    }
  }
  /* ---------- 역사 분기 (설계서 10-10) ---------- */
  const branchCfg = () => era.branch || {};
  const cctx = (run) => ({ run, meta: S.meta });
  function pathView(run, c) {
    const real = c.paths.real || {};
    const lock = {};
    const flavor = {};
    for (const sk of ['right', 'left']) {
      const L = real['lock_' + sk];
      if (L && JK.Cond.test(L.when, cctx(run))) {
        lock[sk] = needText(run, L.when, true) || L.reason || '지금은 고를 수 없다';
        flavor[sk] = L.reason || '';
      }
    }
    // 난이도별 실제 경로 요구(10-11-2): 못 채우면 좌우 두 버튼이 함께 잠기고, 다른 길은 조건 없이 열린다
    const need = real.require && real.require[G.diffId()];
    const realShut = !!need && !JK.Cond.test(need, cctx(run));
    if (realShut) {
      // 숫자 조건을 크게, 분위기 문장(require_reason)은 그 밑에 작게
      lock.right = lock.left = needText(run, need) || real.require_reason || '지금은 실제 역사대로 갈 수 없다';
      flavor.right = flavor.left = real.require_reason || '';
    }
    const alts = c.paths.alt || [];
    // 다른 길 열림 조건은 난이도별일 수 있다({ sprout, normal, sage, annals })
    const unlockOf = (a) => (a.unlock && typeof a.unlock === 'object' ? a.unlock[G.diffId()] : a.unlock);
    const full = run.altCards.length >= (branchCfg().maxPerStage || 3);
    const fullWhy = `${branchCfg().fullReason || '이미 나라가 많이 흔들렸다'} (한 왕에 다른 길은 ${branchCfg().maxPerStage || 3}번까지)`;
    // 다른 길 2~3개(10-14): 조건이 맞는 길만 열린다. 실제 경로가 잠겼는데(10-11-2) 맞는 길이 하나도 없으면 모두 조건 없이 열린다
    const conds = alts.map((a) => JK.Cond.test(unlockOf(a), cctx(run)));
    const freeAll = realShut && !conds.some(Boolean);
    const opts = alts.map((a, i) => {
      const op = !full && (conds[i] || freeAll);
      return {
        idx: i,
        label: a.label,
        branch: a.branch || '',
        open: op,
        locked: !op,
        reason: op ? '' : full ? fullWhy : needText(run, unlockOf(a)) || a.lock_reason || a.lock_hint || '',
        flavor: op || full ? '' : a.lock_reason || '',
        fx: op ? Object.fromEntries(Object.entries(a.effects || {}).map(([k, x]) => [k, G.effect(k, x, run.vals)])) : null,
      };
    });
    let ai = opts.findIndex((o) => o.open);
    const open = ai >= 0;
    if (ai < 0) ai = 0;
    // 막다른 길 금지: 세 버튼이 모두 잠기면 실제 경로의 가벼운 방식(움직임이 작은 쪽) 하나를 연다
    if (lock.right && lock.left && !open) {
      const size = (sk) => Object.values(c.choices[sk].effects || {}).reduce((s, x) => s + Math.abs(x), 0);
      delete lock[size('right') <= size('left') ? 'right' : 'left'];
    }
    run.shownAlt = alts.length ? { card: c.id, idx: ai, open, opts: opts.map((o) => ({ idx: o.idx, open: o.open })) } : null;
    const out = { lock, flavor, need: realShut ? missingGauges(run, need) : [], realShut };
    if (alts.length) {
      // alt: 한 개일 때의 버튼(예전 모양) · alts: 부채꼴로 펼칠 2~3개
      const o = opts[ai];
      out.alt = { label: o.label, locked: !open, reason: o.reason, flavor: o.flavor };
      out.alts = opts;
      if (open) out.fxAlt = o.fx;
    }
    return out;
  }
  // 잠긴 조건을 글로(담임 피드백): "양반 35 이상 필요 · 지금 22", 플래그는 "앞에서 「…」을 … 해야 열림"
  //  expr: 조건 식(참이어야 열림). invert: 잠김 식(참이면 잠김 — 단순 비교 하나만 뒤집는다)
  const OPW = { '>=': '이상', '<=': '이하', '>': '초과', '<': '미만' };
  const OPINV = { '<': '>=', '<=': '>', '>': '<=', '>=': '<' };
  const josa = (w, a, b) => w + ((w.charCodeAt(w.length - 1) - 0xac00) % 28 ? a : b);
  function needText(run, expr, invert) {
    const gname = (k) => (era.gauges.find((g) => g.key === k) || {}).name || k;
    const altLabel = (f) => {
      for (const c of era.data.cards) for (const a of (c.paths && c.paths.alt) || []) if (a.set_flag === f) return a.label;
      return f.replace(/^F_/, '');
    };
    const alts = [];
    for (const alt of String(expr).split('||')) {
      const g = [],
        cur = [],
        other = [];
      for (let t of alt.split('&&')) {
        t = t.trim();
        if (/^\(.*\)$/.test(t) && !/^\w+\(/.test(t)) t = t.slice(1, -1).trim();
        let m = t.match(/^gauge\((\w+)\)\s*(>=|<=|>|<)\s*(\d+)$/);
        if (m) {
          const op = invert ? OPINV[m[2]] : m[2];
          const v = run.vals[m[1]],
            n = +m[3];
          const met = { '>=': v >= n, '<=': v <= n, '>': v > n, '<': v < n }[op];
          // 이미 채운 조건은 빼고 모자란 것만 보여 준다
          if (!met) {
            g.push(`${gname(m[1])} ${m[3]} ${OPW[op]}`);
            cur.push([m[1], v]);
          }
          continue;
        }
        if ((m = t.match(/^real\((\w+)\)$/)) && !JK.Cond.test(t, cctx(run))) {
          const ev = (cardsById[m[1]] || {}).event || m[1];
          other.push(`앞에서 「${ev}」${josa(ev, '을', '를').slice(-1)} 실제 역사대로 해야 열림`);
          continue;
        }
        if ((m = t.match(/^(!?)flag\((\S+)\)$/)) && !JK.Cond.test(t, cctx(run))) {
          const l = altLabel(m[2]);
          other.push(m[1] ? `앞에서 「${l}」${josa(l, '을', '를').slice(-1)} 고르지 않은 판에서만` : `앞에서 「${l}」${josa(l, '을', '를').slice(-1)} 골라야 열림`);
        }
      }
      let s = '';
      if (g.length) {
        s = `${g.join(' + ')} 필요 · 지금 ` + (cur.length === 1 ? cur[0][1] : cur.map(([k, v]) => `${gname(k)} ${v}`).join(', '));
      }
      if (other.length) s += (s ? ' · ' : '') + other.join(' · ');
      if (s) alts.push(s);
    }
    return alts.join(' 또는 ');
  }
  // 잠긴 이유에 붙는 단서(10-11-5): 새싹 "국고 8 더" / 보통 "(국고)" / 성군·실록 없음
  function missingGauges(run, expr) {
    const out = [];
    for (const m of expr.matchAll(/gauge\((\w+)\)\s*>=\s*(\d+)/g)) if (run.vals[m[1]] < +m[2]) out.push({ key: m[1], more: +m[2] - run.vals[m[1]] });
    return out;
  }
  function needHint(run, expr) {
    const mode = ((era.trueEnding || {}).needHint || {})[G.diffId()] || 'none';
    const miss = missingGauges(run, expr);
    const name = (k) => era.gauges.find((g) => g.key === k).name;
    const prev = [...expr.matchAll(/real\((\w+)\)/g)].filter((m) => !JK.Cond.test(m[0], cctx(run))).map((m) => (cardsById[m[1]] || {}).event || m[1]);
    if (mode === 'none' || (!miss.length && !prev.length)) return '';
    const parts = miss.map((x) => (mode === 'number' ? `${name(x.key)} ${x.more} 더` : name(x.key)));
    for (const p of prev) parts.push(`앞의 「${p}」을 실제대로`);
    return ` (${parts.join(', ')})`;
  }
  // 진엔딩 셈(10-11): 판 전체에서 실제대로 지난 사건 수와, 진엔딩이 아직 가능한지
  function routeSummary(run) {
    let same = 0,
      counted = 0,
      broken = false;
    for (const st in run.route || {})
      for (const id in run.route[st]) {
        const r = run.route[st][id];
        if (r === 'life') continue;
        counted++;
        if (r === 'diff') broken = true;
        else same++;
      }
    // 판 = 왕 하나: 전체는 이 왕의 셈에 넣는 사건 수(생명 사건·변형판·사관 빼고)
    const total = era.data.cards.filter((c) => c.kind === 'history' && !c.variant_of && c.stages.includes(run.stage) && c.event_type !== 'life').length || counted;
    return { same, counted, total, broken, left: Math.max(0, total - counted) };
  }
  G.routeSummary = () => routeSummary(G.run);
  function refreshSeal() {
    const r = routeSummary(G.run);
    JK.UI.setSeal && JK.UI.setSeal(r);
  }
  // 이번 왕의 "나의 역사 vs 실제 역사" 기록(기록관에 짧게 남기고, 글은 볼 때 데이터에서 다시 만든다)
  function compareEntry(run, st) {
    const hist = era.data.cards.filter((x) => x.kind === 'history' && !x.variant_of && x.stages.includes(st.id)).sort((a, b) => a.order - b.order);
    const ch = {};
    const vr = {};
    for (const h of hist) if (run.choices[h.id]) ch[h.id] = run.choices[h.id];
    // 다른 길 때문에 바뀐 사건(변형판)은 원래 사건 줄에
    for (const v of era.data.cards.filter((x) => x.variant_of && run.choices[x.id])) {
      vr[v.variant_of] = v.id;
      ch[v.variant_of] = 'v:' + run.choices[v.id];
    }
    const states = {};
    for (const h of hist) {
      const sk = run.choices[h.id];
      const b = sk && sk !== 'alt' && !sk.startsWith('v:') && h.choices[sk].build;
      if (b && b[0] && run.states[b[0]]) states[h.id] = run.states[b[0]];
    }
    const log = (run.crisisLog || []).filter((x) => x.stage === st.id);
    return { d: new Date().toISOString().slice(0, 10), st: st.id, ch, vr, ap: Object.assign({}, run.altPick), bs: states, tr: routeSummary(run), alts: run.stats.alt || 0, held: log.filter((x) => !x.fell).map((x) => [x.name, Math.round(x.p * 100)]), fell: log.filter((x) => x.fell).length };
  }
  G.compareEntry = () => compareEntry(G.run, stageOf(G.run.stage));
  // 도박 쪽 버튼은 수치 대신 '?'(이기면·지면 움직이는 게이지 모두)
  function previewFx(c, sideKey, scaled) {
    // 알 수 없는 상자(10-13-4): 나올 수 있는 게이지마다 '?'
    if (c.box && c.box.side === sideKey) {
      const o = {};
      for (const out of c.box.outcomes) for (const k in out.effects || {}) o[k] = '?';
      return o;
    }
    if (!(c.gamble && c.gamble.side === sideKey)) return scaled(c.choices[sideKey]);
    const o = {};
    for (const k of Object.keys(Object.assign({}, c.gamble.win.effects, c.gamble.lose.effects, c.choices[sideKey].effects))) o[k] = '?';
    return o;
  }
  function grainMarkFor(c) {
    const m = grainCfg().marks[c.grain];
    if (c.grain === 'seed' && c.seed && c.seed.side) return { [c.seed.side]: m };
    return { left: m, right: m };
  }
  // 판의 상황에 따라 대사만 바꾸는 카드(line_if: [{ when, line, who }]) — 예: 개경에 머문 판의 큰비(ET06)
  function lineIf(run, c) {
    for (const x of c.line_if || []) if (JK.Cond.test(x.when, cctx(run))) return x;
    return null;
  }
  function lineOf(run, c) {
    const x = lineIf(run, c);
    return x ? x.line : c.line;
  }
  function showRecord() {
    const p = G.run.pending;
    const v = roleView('sagwan');
    Object.assign(v, { text: p.text, run: p.run || '', against: !!p.against, single: '기록을 넘긴다', scroll: true, record: true, turn: '실제 역사', fx: null, outside: !!p.outside, year: p.year || '' });
    Cards.show(v);
  }

  /* ---------- 넘기기 ---------- */
  function commit(dir) {
    const run = G.run;
    // 「실제 역사」 두루마리를 넘김
    if (run.pending) {
      run.pending = null;
      save();
      return setTimeout(showCurrent, 600);
    }
    const c = cardsById[run.deck[run.pos]];
    // dir 2 = 카드 아래 '다른 길'(10-10)
    const isAlt = dir === 2 && c.paths && run.shownAlt && run.shownAlt.card === c.id && run.shownAlt.open;
    // 부채꼴(10-14)에서 고른 다른 길. 열린 길만 받는다
    if (isAlt && Cards.altChoice !== undefined && run.shownAlt.opts) {
      const o = run.shownAlt.opts.find((x) => x.idx === Cards.altChoice);
      if (o && o.open) run.shownAlt.idx = o.idx;
    }
    Cards.altChoice = undefined;
    const sideKey = isAlt ? 'alt' : dir > 0 ? 'right' : 'left';
    const alt = isAlt ? c.paths.alt[run.shownAlt.idx] : null;
    const side = c.single ? null : isAlt ? alt : c.choices[sideKey];
    if (!c.single) run.choices[c.id] = sideKey;
    // 진엔딩 셈(10-11-1): 보통 사건은 좌우 = 실제대로, 다른 길 = 다름 / 판단 사건은 좌우 어느 쪽이든 실제대로 / 생명 사건은 셈에서 뺌
    if (c.kind === 'history' && !c.single) {
      const et = c.event_type || 'normal';
      const before = routeSummary(run).broken;
      run.route[run.stage][c.variant_of || c.id] = et === 'life' ? 'life' : isAlt || et === 'variant' ? 'diff' : et === 'judge' ? 'open' : 'same';
      if (!before && routeSummary(run).broken) {
        JK.UI.setSeal && JK.UI.setSeal(routeSummary(run), true);
        setTimeout(() => Cards.toast((era.trueEnding || {}).brokenText || '이번 판의 진엔딩은 멀어졌어요', 2600), 3000);
      }
    }
    if (c.paths) {
      const mp = (S.meta.paths = S.meta.paths || {});
      (mp[c.id] = mp[c.id] || {})[isAlt ? alt.id : 'real'] = 1;
    }
    const prevZones = run.zones || {};
    // 도박형(10-9): 도박 쪽을 고르면 이 자리에서 굴려 이기면 win, 지면 lose 효과
    let gres = null;
    let sideEff = side;
    // 판의 상황에 따라 「이번 판에서」 문장만 바뀌는 쪽(this_run_if) — 예: 계룡산 갈래의 CT01c
    //  (그 문장이 맞는 판에서는 도박을 굴리지 않는다 — 계룡산 판의 CT01c는 돌을 먼 길로 나르지 않으므로)
    let runIf = null;
    if (side && side.this_run_if) {
      runIf = side.this_run_if.find((r) => JK.Cond.test(r.when, cctx(run))) || null;
      if (runIf) sideEff = Object.assign({}, side, { this_run: runIf.this_run });
    }
    if (side && c.gamble && c.gamble.side === sideKey && !runIf) {
      const won = gambleRoll(run, c);
      const o = won ? c.gamble.win : c.gamble.lose;
      gres = { won };
      sideEff = Object.assign({}, side, { effects: o.effects || {}, this_run: o.this_run || side.this_run });
      run.gambles = (run.gambles || []).concat({ card: c.id, won });
    }
    // 알 수 없는 상자(10-13-4): 여는 쪽을 고르면 좋은·나쁜·빈 셋 가운데 하나
    let bres = null;
    if (side && JK.Events.isBox(c, sideKey)) {
      bres = JK.Events.openBox(run, c, JK.rng((run.stageSeed + run.pos * 3571 + (run.stats.fallsRun || 0) * 11 + 41) >>> 0));
      sideEff = Object.assign({}, side, { effects: bres.effects || {}, this_run: bres.this_run || side.this_run });
    }
    // 위기 사건·후속: 고른 순간(효과 전 게이지로) 수습 또는 실각을 굴린다 (10-8-3)
    let cres = null;
    if (c.kind === 'crisis' && c.level !== 'warn' && side) {
      cres = JK.Crisis.resolve(run, c, sideKey, Object.assign({}, run.vals), JK.rng((run.stageSeed + run.pos * 131 + (run.stats.fallsRun || 0) * 7 + 99) >>> 0));
      const at = c.side === 'low' ? 0 : 100;
      const frec = era.data.falls.find((f) => f.gauge === c.gauge && f.at === at);
      S.addCrisis(cres, frec ? frec.id : c.gauge + at);
      Cards.gaugeMark(null);
      if (cres.fell) {
        W.crisisBeat();
        run.eventScene = null;
        save();
        S.saveMeta();
        return setTimeout(() => fall(c.gauge, at, false, cres), 900);
      }
    }
    // 역사를 거스르는 쪽을 골랐는데 결국 일이 일어나는 카드: "그래도 역사는 흘렀다" 한 박자
    const against = !!(side && c.against === sideKey);
    let big = 0;
    if (side) {
      const applied = {};
      for (const k in sideEff.effects || {}) {
        if (!(k in run.vals)) continue;
        const d = G.effect(k, sideEff.effects[k], run.vals);
        // 화면에 띄우는 숫자는 실제로 움직인 만큼(0·100에서 멈춘 만큼은 빼고)
        const nv = JK.clamp(run.vals[k] + d, 0, 100);
        applied[k] = nv - run.vals[k];
        run.vals[k] = nv;
        big = Math.max(big, Math.abs(d));
      }
      for (const k in run.vals) if (run.vals[k] <= 10 || run.vals[k] >= 90) run.stageStats.edge = true;
      W.state.people = run.vals.people;
      if (bres) {
        // 상자: 흔들리다 뚜껑이 튀고 결과가 뜬 뒤 게이지가 움직인다
        JK.Events.reveal(c, bres);
        if (JK.EvFx) JK.EvFx.open((c.fx || {}).scene, bres.kind);
        setTimeout(() => {
          Cards.setGauges(run.vals);
          Cards.flash(applied, bres.kind === 'bad');
          if (bres.kind === 'bad') Cards.shake();
        }, 1300);
      } else if (gres) {
        // 도박: 동전이 돌고 "운이 따랐다 / 운이 없었다"가 뜬 뒤 게이지가 움직인다
        Cards.gamble(gres.won);
        setTimeout(() => {
          Cards.setGauges(run.vals);
          Cards.flash(applied, !gres.won);
          if (!gres.won) Cards.shake();
        }, 1100);
      } else if (against) {
        W.historyBeat();
        Cards.beat();
        setTimeout(() => {
          Cards.setGauges(run.vals);
          Cards.flash(applied, true);
        }, 450);
      } else {
        Cards.setGauges(run.vals);
        Cards.flash(applied);
        if (big >= 15) {
          W.shake(0.5);
          Cards.shake();
        }
      }
      if (sideEff.this_run && (!c.real_history || isAlt)) setTimeout(() => Cards.toast(sideEff.this_run, Math.max(2600, sideEff.this_run.length * 70), isAlt ? '실제 역사와 달라졌어요 📜' : ''), bres ? 1500 : gres ? 1100 : 0);
      // 큰 변화: 사관 한 줄 후보
      if (big >= 15) JK.Events.say(run, 'big');
      // 돌발: 고른 쪽의 마음 변화, 마음 카드의 쉬는 쪽, 연쇄 예약
      if (JK.Events.isEvent(c)) {
        JK.Events.onCommit(run, c, sideKey, JK.rng((run.stageSeed + run.pos * 6007 + 13) >>> 0));
        if (JK.EvFx) JK.EvFx.chose((c.fx || {}).scene, sideKey, c);
        // 공사장 불(ET08): 꺼진 뒤 공사 중인 건물은 판 끝까지 손상 모습(10-8-4)
        if (c.id === 'ET08') {
          const t = ['workyard', 'gyeongbok'].find((k) => run.built.includes(k) && !(run.damaged || {})[k]);
          if (t) {
            run.damaged = run.damaged || {};
            run.damaged[t] = c.id;
            setTimeout(() => W.setBuildState(t, 'damaged', 0), 1600);
          }
        }
      } else if (c.fx && c.fx.scene && JK.EvFx) JK.EvFx.chose(c.fx.scene, sideKey, c);
      if (isAlt) takeAlt(run, c, alt);
      // 수습("버텼다!"): 붉은 도장 "버팀", 북 세 번, 아이콘이 원래 색으로. 아직 거리 15 이하면 후속 예약
      if (cres) {
        run.eventScene = null;
        JK.Crisis.afterHeld(run, c);
        Cards.setGauges(run.vals);
        W.state.people = run.vals.people;
        W.camTo(W.CAM_PLAY, 1.6);
        W.state.alarm = 0;
        Cards.held(c.name, `무너질 확률 ${Math.round(cres.p * 100)}%에서 버텼다!`, 2400);
        JK.Events.addMind(run, (era.mind.down || {}).held || -10);
        JK.Events.say(run, 'held');
        run.heldAt = run.pos;
        Cards.gaugeMark(c.gauge, 'relief');
        if (JK.Audio) [0, 380, 760].forEach((t) => setTimeout(() => JK.Audio.drum(), t));
        if (cres.level === 'end') titleNow(['heldAtEnd']);
      }
      refreshWarn();
      // 경고 구간에 들어섬: 사관 한 줄 후보
      const RK = JK.Crisis.RANK;
      for (const k in run.zones || {}) if ((RK[run.zones[k].level] || 0) >= RK.warn && (RK[(prevZones[k] || {}).level] || 0) < RK.warn) JK.Events.say(run, 'warn');
      if ((run.stats.followupsCancelled || 0) >= 3) titleNow(['cancel3']);
    }
    if (run.bigPreview > 0) run.bigPreview--;
    // 결 기록(연속 규칙) · 씨앗 → 열매 예약 · 안정 구간이 이어진 장수
    if (c.grain) run.grainHist.push(c.grain);
    if (c.seed && c.seed.fruit_id && side && (!c.seed.side || c.seed.side === sideKey) && cardsById[c.seed.fruit_id]) run.reserve.push({ card: c.seed.fruit_id, at: run.pos + 1 + (c.seed.after_n || 5), from: c.id });
    // 사건 사슬(10-2 ⑤): 다음 카드를 n장 뒤에 예약(무작위 칸을 대신 쓰는 셈)
    if (c.chain_next && cardsById[c.chain_next.card]) run.reserve.push({ card: c.chain_next.card, at: run.pos + 1 + (c.chain_next.after_n || 3), from: c.id });
    run.calmRun = Object.values(run.zones || {}).every((z) => z.level === 'stable') ? (run.calmRun || 0) + 1 : 0;
    S.meta.cardsPlayed++;
    W.cardPassed();
    if (!isFixed(c) && c.kind !== 'crisis') run.used.push(c.id);
    // 공사철이 끝나면(성균관을 세우면) 공사장 같은 장식을 치운다
    for (const k of run.built.slice()) {
      const def = era.map.buildings[k.split(':')[0]] || {};
      if ((def.removeAfter || []).includes(c.variant_of || c.id)) unbuild(k, 900);
    }
    // 짓기: 이름 있는 건물은 어느 쪽을 골라도 역사대로 선다. 고른 방식은 건물 상태로 남는다(설계서 7-4).
    let wait = against ? 1300 : cres ? 2300 : gres || bres ? 2000 : 700;
    // 다른 길이면 그 길의 장식만(실제 경로 카드의 연출 build는 세우지 않음)
    const builds = isAlt ? alt.build || [] : ((side && side.build) || []).concat((c.fx && c.fx.build) || []).filter((k, i, a) => a.indexOf(k) === i);
    const state = side && side.build_state;
    if (builds.length) wait = Math.max(wait, doBuilds(builds, against ? 1300 : 350, state));
    // 다른 길에서는 실제 경로의 연출(하늘 글씨·짐배 등)을 하지 않는다
    if (!isAlt) cardFx(c, state, builds);
    else if (alt.fx) cardFx({ fx: alt.fx }, null, builds);
    // 이름 없는 마을은 카드마다 조금씩 자란다
    for (const k in era.map.buildings) {
      const v = era.map.buildings[k];
      if (v.kind === 'village' && v.grow && !builds.includes(k)) setTimeout(() => W.growVillage(k, v.grow), 600);
    }
    run.grown = (run.grown || 0) + 1;
    // 왕의 마음: 경고 이하에서 넘긴 장 +2, 기질·무너질 듯한 밤·돌발 쉬는 장수 줄이기
    JK.Events.afterCard(run, c);
    run.pos++;
    // 위기 카드 끼워 넣기: 지금 구간에 따라 확률로 다음 자리에(역사 카드 순서는 그대로 밀린다)
    // 위기 카드 끼워 넣기(10-8): 후속(기한) → 예고(안정→경고) → 위기 사건(구간 확률). 역사 카드 순서는 그대로 밀린다.
    // 게이지가 0·100에 닿아도 바로 실각하지 않는다(v3) — 끝 구간에서는 위기 확률이 매우 높을 뿐이다
    const cid = JK.Crisis.pick(run, JK.rng((run.stageSeed + run.pos * 977 + (run.stats.fallsRun || 0)) >>> 0), prevZones);
    if (cid) run.deck.splice(run.pos, 0, cid);
    else {
      // 씨앗의 열매·사슬의 다음 카드: 기한이 되고 조건이 맞는 것 하나를 다음 자리에(위기가 끼면 한 장 미룸, 조건이 안 맞으면 기다림)
      const ctx = { run, meta: S.meta };
      // 끼워도 결 연속 규칙(10-9-3)을 어기지 않을 때만 — 어기면 한 장 더 기다린다
      const fits = (id) => !cardsById[id] || !cardsById[id].grain || !grainBreaks(run.grainHist.concat(cardsById[id].grain));
      const due = run.reserve.find((r) => r.at <= run.pos && fits(r.card) && JK.Cond.test((cardsById[r.card] || {}).conditions, ctx));
      if (due) {
        run.reserve = run.reserve.filter((r) => r !== due);
        run.deck.splice(run.pos, 0, due.card);
      } else {
        // 꼭 나와야 하는 카드(사슬 시작 '반드시'·다른 길 전용 카드): 조건이 맞는 순간 한 번
        const f = era.data.cards.find((x) => x.force && x.stages.includes(run.stage) && !run.seenRun.includes(x.id) && !run.deck.slice(run.pos).includes(x.id) && fits(x.id) && JK.Cond.test(x.conditions, ctx));
        if (f) run.deck.splice(run.pos, 0, f.id);
      }
    }
    // 갈래 이야기(10-14-2): 완성 조건을 처음 채운 순서대로 적어 둔다(엔딩은 먼저 채운 갈래). 채우면 알림
    for (const b of era.data.branches || []) {
      if (b.stage !== run.stage || (run.branchDone || []).includes(b.id) || !JK.Cond.test(b.done, cctx(run))) continue;
      run.branchDone = (run.branchDone || []).concat(b.id);
      setTimeout(() => Cards.toast(`📘 갈래 이야기 「${b.name}」 — 끝까지 왔어요`, 3200, '이 왕을 마치면 갈래 엔딩'), 2600);
    }
    // 실제 경로는 「실제 역사」 두루마리. 다른 길은 그 자리에서 길게 보여 주지 않고 비교 화면에서 한꺼번에(10-10-5)
    if (c.real_history && !isAlt) run.pending = { text: c.real_history, run: sideEff ? sideEff.this_run : '', against, outside: !!c.out_of_textbook, year: c.year };
    setTOD(false);
    save();
    S.saveMeta();
    setTimeout(showCurrent, Math.max(wait, c.single ? 500 : 900));
  }
  // 건물을 차례로 세우고, 다 설 때까지 걸리는 시간(ms)을 돌려준다
  function doBuilds(keys, delay, stateIn) {
    let t = delay;
    let end = 0;
    keys.forEach((k, idx) => {
      if (G.run.built.includes(k)) return;
      const def = era.map.buildings[k] || {};
      // 같은 자리를 쓰는 건물: conflicts가 서 있으면 짓지 않고, replaces는 치우고 짓는다
      if ((def.conflicts || []).some((x) => G.run.built.includes(x))) return;
      for (const r of def.replaces || []) {
        if (!G.run.built.includes(r)) continue;
        G.run.built = G.run.built.filter((x) => x !== r);
        setTimeout(() => W.disposeBuilding(r), t);
      }
      G.run.built.push(k);
      // 건물 상태는 그 카드의 첫 건물에만(설계서 7-4 건물별 정리)
      const state = idx === 0 && stateIn ? stateIn : 'smooth';
      G.run.states = G.run.states || {};
      G.run.states[k] = state;
      const bs = (S.meta.buildStates = S.meta.buildStates || {});
      (bs[k] = bs[k] || {})[state] = 1;
      const at = t;
      setTimeout(() => W.build(k, { state }), at);
      const kind = era.map.buildings[k] && era.map.buildings[k].kind;
      end = Math.max(end, at + (kind === 'village' || kind === 'wall' ? 2200 : state === 'smooth' ? 1300 : 2300));
      t += 900;
    });
    return end;
  }
  function unbuild(k, delay) {
    // 시작 장면 장식(stage.scene)은 run.built에 없으므로 따로 기록해 둔다
    if ((stageOf(G.run.stage).scene || []).includes(k)) {
      G.run.unscene = (G.run.unscene || []).concat(k);
      setTimeout(() => W.unbuild(k, 2.6), delay || 0);
      return;
    }
    if (!G.run.built.includes(k)) return;
    G.run.built = G.run.built.filter((x) => x !== k);
    setTimeout(() => W.unbuild(k), delay || 0);
  }
  // 카드 연출 (설계서 3장 연출 칸): 왕기, 짐배, 하늘 글씨, 성문 글자 빛
  function cardFx(c, state, builds) {
    const f = c.fx || {};
    const run = G.run;
    run.flags = run.flags || {};
    if (f.flag) {
      run.flags.flag = true;
      setTimeout(() => W.fxFlag(true), 500);
    }
    if (f.boats) {
      run.flags.boats = true;
      setTimeout(() => W.fxBoats(true), 600);
    }
    if (f.skyText) setTimeout(() => W.fxSkyText(f.skyText), 400);
    for (const k of f.remove || []) unbuild(k, 600);
    // 잠깐 떠올랐다 사라지는 장식(예: 수창궁 즉위 — 이름표 없는 옛 궁궐)
    if (f.flash && !run.built.includes(f.flash)) {
      setTimeout(() => W.build(f.flash, { state: 'smooth' }), 500);
      setTimeout(() => W.unbuild(f.flash), 5200);
    }
    if (f.glyphs) {
      for (const k in f.glyphs) {
        const i = builds.indexOf(k);
        W.fxGlyph(k, f.glyphs[k], 350 + Math.max(0, i) * 900 + 900 + (state === 'late' ? 1800 : 0));
      }
    }
  }

  /* ---------- 실각 ---------- */
  // cr: 무너진 위기 { name, gauge, value, choice, p } (10-8-3 ④)
  function fall(key, at, preview, cr) {
    const run = G.run;
    G.state = 'fall';
    Cards.hide();
    document.body.classList.add('over');
    W.setOrbit(false);
    W.state.inkTarget = 1;
    W.camTo({ dist: 37, el: 0.5 }, 3.5);
    if (JK.Audio) JK.Audio.gong();
    const rec = era.data.falls.find((f) => f.gauge === key && f.at === at) || { id: key + at, name: '실각', text: '' };
    if (!preview) {
      S.addFall(rec.id);
      S.saveMeta();
      run.stats.fallsRun = (run.stats.fallsRun || 0) + 1;
      run.stageStats.falls++;
      // 판 = 왕 하나: 실각하면 판이 끝난다(「같은 왕 다시」로 새 판). 이어 하기에 남기지 않는다
      run.ended = true;
      S.saveRun(null);
    }
    const st = stageOf(run.stage);
    const D = G.diff();
    const g = era.gauges.find((x) => x.key === key);
    // 사관의 귀띔(10-7): 새싹은 자세히, 보통은 게이지 이름만
    let hint = '';
    // 받침에 따라 을/를
    const eul = (w) => w + ((w.charCodeAt(w.length - 1) - 0xac00) % 28 ? '을' : '를');
    if (D.hint === 'full') hint = `사관의 귀띔: ${g.name} 게이지를 지켜 보세요. ${g.name}에 점이 빛나는 카드에서 ${eul(g.name)} ${at === 0 ? '아끼는' : '덜 올리는'} 쪽을 골라 보면 어떨까요?`;
    else if (D.hint === 'gauge') hint = `사관의 귀띔: ${g.name} 게이지를 지켜 보세요.`;
    const again = '이 왕의 처음부터 다시!';
    const t0 = performance.now();
    const iv = setInterval(() => {
      const el = performance.now() - t0;
      if (el < 2200 || (W.state.ink < 0.8 && el < 6000)) return;
      clearInterval(iv);
      if (G.state !== 'fall') return;
      const crisis = cr ? { name: cr.name, gauge: g.name, value: cr.value, choice: cr.choice, p: cr.p } : null;
      JK.UI.showFall({ rec, real: `${st.realEnd} ${again}`, hint, img: pics[st.kingRole || st.id], preview, crisis });
    }, 100);
  }
  // 점검 상자 '실각 보기': 녹봉이 밀리다(국고 낮음) 위기에서 무너진 모습을 미리 본다(기록에 남지 않음)
  G.debugFall = function () {
    const c = cardsById['KT05'];
    const v = Object.assign({}, G.run.vals, { treasury: 4 });
    fall('treasury', 0, true, { name: c ? c.name : '국고 위기', value: 4, choice: c ? c.choices.left.label : '', p: c ? JK.Crisis.fallChance(c, 'left', v).p : 0.3 });
  };
  // 다른 길을 고름(10-10): 깃발·뒤 카드·위기 배율·합류할 건물·칭호
  function takeAlt(run, c, alt) {
    run.altPick[c.id] = run.shownAlt.idx;
    run.altCards.push(c.id);
    run.stats.alt = (run.stats.alt || 0) + 1;
    if (alt.set_flag) run.flagsRun[alt.set_flag] = true;
    Object.assign(run.variants, alt.variants || {});
    for (const k in alt.crisis_mult || {}) run.crisisMult[k] = (run.crisisMult[k] || 1) * alt.crisis_mult[k];
    if (alt.skip && alt.skip.length) run.deck = run.deck.slice(0, run.pos + 1).concat(run.deck.slice(run.pos + 1).filter((id) => !alt.skip.includes(id)));
    // 실제 경로라면 섰을 건물: 이번 왕 동안은 서지 않고, 다음 왕 시작 때 합류
    for (const k of (c.choices.right.build || []).concat(c.choices.left.build || [])) if (!run.altSkipped.includes(k) && !(alt.build || []).includes(k)) run.altSkipped.push(k);
    const rules = [];
    if (alt.set_flag) rules.push('flag:' + alt.set_flag);
    if (run.stats.alt >= 5) rules.push('alt5');
    const all = era.data.cards.filter((x) => x.paths).flatMap((x) => x.paths.alt.map((a) => [x.id, a.id]));
    if (all.length && all.every(([cid, aid]) => (S.meta.paths[cid] || {})[aid])) rules.push('explorer');
    titleNow(rules);
  }
  // 위기 칭호는 이룬 그 자리에서 준다(10-8-7)
  function titleNow(rules) {
    const got = awardTitles(rules);
    if (got.length) setTimeout(() => Cards.toast(`새 칭호 「${got[0].name}」`, 2800), 2600);
  }
  // 실각 뒤 (10-7): 새싹 = 시작 게이지 50 + 처음 3장 큰 미리보기 / 보통·성군 = 시작 게이지 그대로 / 실록 도전 = 판 전체 처음부터
  G.retryStage = function () {
    document.body.classList.remove('over');
    W.state.inkTarget = 0;
    W.state.ink = 0;
    const run = G.run;
    const D = G.diff();
    if (D.afterFall === 'run') {
      run.flagsRunBefore = {};
      run.builtBefore = [];
      run.statesBefore = {};
      run.flagsBefore = {};
      run.grownBefore = 0;
      run.used = [];
      run.built = [];
      return G.startStage(era.stages[0].id, fifty());
    }
    run.built = run.builtBefore.slice();
    if (D.afterFall === 'reset50') {
      run.bigPreview = 3;
      return G.startStage(run.stage, fifty());
    }
    G.startStage(run.stage, run.start);
  };

  /* ---------- 클리어 → 사관 퀴즈 → 다음 왕 ---------- */
  function stageClear() {
    const run = G.run;
    const st = stageOf(run.stage);
    const D = G.diff();
    G.state = 'quiz';
    Cards.hide();
    // 처음으로 왕 하나를 마치면 모든 난이도가 열린다(담임 결정 2026-10-21) — 그 순간 알림
    const firstClear = !Object.values(S.meta.clears || {}).some((n) => n > 0);
    S.meta.clears[st.id] = (S.meta.clears[st.id] || 0) + 1;
    const got = [];
    if (run.stageStats.edge) got.push('edgeClear');
    if (!run.stageStats.falls) got.push('noFallStage');
    // 판 = 왕 하나(담임 결정 2026-10-21): 왕을 마치면 판이 끝난다
    if ((run.stats.held || 0) >= 5) got.push('held5');
    if (!(run.stats.alt || 0)) got.push('allReal');
    // 왕별 진엔딩(10-11, 담임 결정): 이 왕의 사건을 모두 실제대로 지나 클리어 — 난이도별로 기록
    const route = routeSummary(run);
    const dId = run.easiest || G.diffId();
    const kingTrue = !route.broken;
    // 갈래 엔딩(10-14-2): 완성 조건을 채우고 클리어 — 먼저 채운 갈래 하나. 둘 이상 채웠으면 「두 갈래의 임금」도
    const brDone = (run.branchDone || []).map((id) => (era.data.branches || []).find((b) => b.id === id && b.stage === st.id)).filter(Boolean);
    const branch = brDone[0] || null;
    if (branch) got.push('branch:' + branch.id);
    if (brDone.length >= 2) got.push('branch:two');
    W.setTOD(Math.min(1, st.tod[1] + 0.06));
    const qs = pickQuiz(st.id, run.stageSeed);
    // 나의 역사 vs 실제 역사(10-10-5): 퀴즈 바로 앞. 기록관에도 남긴다
    const entry = compareEntry(run, st);
    S.meta.archive = [entry].concat(S.meta.archive || []).slice(0, 20);
    S.saveMeta();
    const explain = (q) => JK.UI.compareLine(entry, q.about || []);
    JK.UI.showCompare(entry, { onNext: () => quizStep() });
    const quizStep = () => JK.Quiz.run(qs, { options: D.quizOptions, retry: D.quizRetry, explain }, (res) => {
      const right = res.filter(Boolean).length;
      run.stats.quiz.asked += res.length;
      run.stats.quiz.right += right;
      S.meta.quiz.asked += res.length;
      S.meta.quiz.right += right;
      if (res.length && right === res.length) got.push('quizPerfect');
      // 왕별 기록: 클리어 수 · 퀴즈 별(맞힌 수, 가장 좋은 것) · 진엔딩(난이도별 날짜). 별·이름 규칙은 설계서가 정한다(자리)
      const kings = (S.meta.kings = S.meta.kings || {});
      const k = (kings[st.id] = kings[st.id] || { clears: 0, stars: 0, trueEnd: {} });
      k.clears++;
      k.stars = Math.max(k.stars || 0, right);
      k.asked = Math.max(k.asked || 0, res.length);
      if (kingTrue) k.trueEnd[dId] = k.trueEnd[dId] || new Date().toISOString().slice(0, 10);
      // 갈래 엔딩은 기록관에 푸른 실록으로(진엔딩은 금빛)
      if (branch) {
        const day = new Date().toISOString().slice(0, 10);
        k.branches = k.branches || {};
        k.branches[branch.id] = k.branches[branch.id] || day;
        S.meta.endings = S.meta.endings || {};
        (S.meta.endings.branch = S.meta.endings.branch || {})[branch.id] = (S.meta.endings.branch || {})[branch.id] || day;
      }
      // 다섯 왕 모두 그 난이도 진엔딩을 모으면 최종 진엔딩 칭호(지금은 태조만 있어 아직 못 받음)
      const all = era.stages.every((x) => ((kings[x.id] || {}).trueEnd || {})[dId]);
      if (all) {
        got.push('true:' + dId);
        S.meta.endings = S.meta.endings || {};
        (S.meta.endings.true = S.meta.endings.true || {})[dId] = new Date().toISOString().slice(0, 10);
      }
      const newTitles = awardTitles(got);
      // 이 왕에서 지은 것과 그 모습(상태)
      const built = run.built.map((x) => [x, run.states[x] || 'smooth']);
      const end = { from: st.id, right, asked: res.length, titles: newTitles, unlockedAll: firstClear, vals: Object.assign({}, run.vals), built, kingTrue, diff: dId, route, allTrue: all, branch };
      run.ended = true;
      G.state = 'ended';
      G.lastEnd = end;
      S.saveRun(null);
      S.saveMeta();
      W.setOrbit(true);
      W.camTo({ dist: 31, el: 0.42, fov: 30 }, 3);
      if (JK.Audio) JK.Audio.chime();
      if (all) JK.UI.showEnding('true', { diff: dId, route, titles: newTitles });
      else if (branch) {
        JK.UI.showEnding('branch', { diff: dId, route, titles: newTitles, branch });
        if (JK.EvFx) JK.EvFx.branchEnd(branch);
      }
      setTimeout(() => JK.UI.showKingEnd(end), 1200);
    });
  }
  function pickQuiz(stageId, seed) {
    const rnd = JK.rng(seed + 17);
    // 다른 길로 간 사건과 이어진 문항은 뽑힐 확률 ×2(10-10-5): 가중치 순서 섞기
    const alts = (G.run && G.run.altCards) || [];
    const pool = era.data.quizzes
      .filter((q) => q.stage === stageId)
      .map((q) => ({ q, k: Math.pow(rnd(), 1 / ((q.about || []).some((id) => alts.includes(id)) ? 2 : 1)) }))
      .sort((a, b) => b.k - a.k)
      .map((x) => x.q);
    const out = [];
    let outside = 0;
    for (const q of pool) {
      if (out.length >= ((era.quiz || {}).perStage || 3)) break;
      if (q.out_of_textbook) {
        if (outside >= ((era.quiz || {}).outsidePerRound || 1)) continue;
        outside++;
      }
      out.push(q);
    }
    return out;
  }
  // 칭호: 시대팩 칭호 가운데 rule이 이번에 이룬 것과 같은 것
  function awardTitles(rules) {
    const out = [];
    for (const t of era.data.titles) if (rules.includes(t.rule) && S.addTitle(t.id)) out.push(t);
    return out;
  }

  /* ---------- 점검용 ---------- */
  // 점검: 실제 경로로 설 수 있는 건물을 모두 세운다(다른 길 장식은 실제 건물과 같은 자리라 빼고)
  G.debugBuildAll = function () {
    for (const c of era.data.cards) {
      if (c.alt_only || c.variant_of) continue;
      const b = ((c.choices && c.choices.right.build) || []).concat((c.fx && c.fx.build) || []).filter((k) => !(era.map.buildings[k] || {}).alt);
      for (const k of b) if (!G.run.built.includes(k)) doBuilds([k], 0, c.choices && c.choices.left.build_state);
    }
  };
  G.debugSkip = function () {
    if (G.state !== 'play') return;
    G.run.pos = G.run.deck.length;
    G.run.pending = null;
    Cards.hide();
    showCurrent();
  };
  // 점검 상자: 엔딩 자리 미리 보기(기록에 남지 않음)
  G.debugEnding = function (kind) {
    JK.UI.showEnding(kind || 'true', { diff: G.diffId(), route: G.run ? routeSummary(G.run) : { same: 46, counted: 46, total: 46 }, titles: [], preview: true });
  };
  // 시험용: 데이터에 없는 카드를 잠시 등록한다(새로 고치면 사라짐)
  G.debugAddCard = function (c) {
    era.data.cards.push(c);
    cardsById[c.id] = c;
    G._fruits = null;
  };
  // 시험용: 지금 자리에 카드 한 장을 끼워 바로 보여 준다
  G.debugInsert = function (id) {
    if (G.state !== 'play' || !cardsById[id]) return;
    G.run.pending = null;
    G.run.deck.splice(G.run.pos, 0, id);
    Cards.hide();
    setTimeout(showCurrent, 300);
  };
  G.commit = (dir) => Cards.commit(dir);
  // 시험용: 지금 카드의 다른 길을 id로 골라 넘긴다(부채꼴을 거치지 않음)
  G.commitAlt = function (id) {
    const c = cardsById[G.run.deck[G.run.pos]];
    const i = c && c.paths ? c.paths.alt.findIndex((a) => a.id === id) : -1;
    if (i < 0) return false;
    Cards.altChoice = i;
    return Cards.commit(2);
  };
})();
