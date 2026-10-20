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
  };
  G.card = (id) => cardsById[id];
  const stageOf = (id) => era.stages.find((s) => s.id === id);
  const stageIndex = (id) => era.stages.findIndex((s) => s.id === id);
  const isFixed = (c) => c.kind === 'history' || c.kind === 'sagwan';

  /* ---------- 난이도 (설계서 10-7) ---------- */
  G.diffId = () => (G.run && G.run.diff) || S.settings.difficulty || era.difficultyDefault || 'normal';
  G.diff = (id) => era.difficulty[id || G.diffId()];
  // 카드 효과에 난이도 배율과 안전 구간을 적용한다(역사·카드 순서는 그대로)
  G.effect = function (k, base, vals) {
    const D = G.diff();
    let v = base * D.mult;
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
    const hist = cards.filter((c) => isFixed(c) && c.stages.includes(stage.id)).sort((a, b) => a.order - b.order);
    const daily = cards.filter((c) => c.kind === 'daily' && c.stages.includes(stage.id) && !used.includes(c.id));
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
    for (let k = 0; k < n && k < optional.length; k++) slots[Math.floor(rnd() * gaps)].push('*');
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
  G.hasRun = () => !!(S.run && S.run.era === era.id && S.run.stage);
  G.newRun = function () {
    S.meta.plays++;
    S.saveMeta();
    const seed = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
    const diff = S.settings.difficulty || 'normal';
    G.run = { era: era.id, seed, diff, easiest: diff, stage: era.stages[0].id, vals: fifty(), start: fifty(), used: [], stats: { fallsRun: 0, quiz: { asked: 0, right: 0 } } };
    G.startStage(era.stages[0].id, G.run.start);
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
    run.followStep = {};
    run.cooldown = {};
    run.forewarned = {};
    run.forewarnCount = 0;
    run.eventScene = null;
    // 조건 식(engine/cond.js)이 읽는 이번 왕의 기록
    run.choices = {};
    run.seenRun = [];
    run.flagsRun = Object.assign({}, run.flagsRunBefore || {});
    G.state = 'play';
    setupWorld(st, false);
    save();
    setTimeout(showCurrent, 700);
  };
  G.continueRun = function () {
    G.run = S.run;
    const run = G.run;
    const st = stageOf(run.stage);
    if (run.waiting) return JK.UI.showComingSoon(run.waiting);
    G.state = 'play';
    setupWorld(st, true);
    setTimeout(showCurrent, 500);
  };
  function setupWorld(st, restoring) {
    W.reset();
    W.setSky(st.sky);
    W.state.title = false;
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
      let w = 1 * ((row && row.mult && row.mult[g]) || 1) * (dm[g] || 1);
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
      const id = drawRandom(run);
      if (id) {
        run.deck[run.pos] = id;
        run.pool = run.pool.filter((x) => x !== id);
      } else run.deck.splice(run.pos, 1);
    }
    if (run.pos >= run.deck.length) return stageClear();
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
    if (c.kind === 'crisis') {
      v.tag = c.level === 'warn' ? '예고' : c.level === 'followup' ? '후속 위기' : '위기';
      v.game = !!c.game_event;
      if (crisisEvent) {
        v.crisisName = c.name;
        v.similar = c.similar || null;
        // 버튼 아래 무너질 확률(새싹 숫자 / 보통 말 / 성군·실록 없음)
        const L = JK.Crisis.chanceLabel(JK.Crisis.fallChance(c, 'left', run.vals).p);
        const R = JK.Crisis.chanceLabel(JK.Crisis.fallChance(c, 'right', run.vals).p);
        if (L || R) v.chance = { left: L, right: R };
      }
    }
    if (!run.seenRun.includes(c.id)) run.seenRun.push(c.id);
    Object.assign(v, {
      crisis: c.kind === 'crisis' ? c.level : '',
      text: c.line,
      left: c.choices && c.choices.left.label,
      right: c.choices && c.choices.right.label,
      single: c.single,
      scroll: c.kind === 'sagwan',
      outside: !!c.out_of_textbook,
      turn: `${run.pos + 1} / ${run.deck.length}`,
      year: c.year || '',
      fx: c.single ? null : { left: previewFx(c, 'left', scaled), right: previewFx(c, 'right', scaled) },
      grainMark: c.grain && (grainCfg().marks || {})[c.grain] ? grainMarkFor(c) : null,
      preview: run.bigPreview > 0 ? 'arrows' : D.preview,
      hand: st.tutorial && run.pos < st.tutorial && S.meta.cardsPlayed < 12,
    });
    S.markSeen(c.id);
    Cards.show(v);
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
  // 도박 쪽 버튼은 수치 대신 '?'(이기면·지면 움직이는 게이지 모두)
  function previewFx(c, sideKey, scaled) {
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
    const sideKey = dir > 0 ? 'right' : 'left';
    const side = c.single ? null : c.choices[sideKey];
    if (!c.single) run.choices[c.id] = sideKey;
    const prevZones = run.zones || {};
    // 도박형(10-9): 도박 쪽을 고르면 이 자리에서 굴려 이기면 win, 지면 lose 효과
    let gres = null;
    let sideEff = side;
    if (side && c.gamble && c.gamble.side === sideKey) {
      const won = gambleRoll(run, c);
      const o = won ? c.gamble.win : c.gamble.lose;
      gres = { won };
      sideEff = Object.assign({}, side, { effects: o.effects || {}, this_run: o.this_run || side.this_run });
      run.gambles = (run.gambles || []).concat({ card: c.id, won });
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
        applied[k] = d;
        run.vals[k] = JK.clamp(run.vals[k] + d, 0, 100);
        big = Math.max(big, Math.abs(d));
      }
      for (const k in run.vals) if (run.vals[k] <= 10 || run.vals[k] >= 90) run.stageStats.edge = true;
      W.state.people = run.vals.people;
      if (gres) {
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
      if (sideEff.this_run && !c.real_history) setTimeout(() => Cards.toast(sideEff.this_run, Math.max(2600, sideEff.this_run.length * 70)), gres ? 1100 : 0);
      // 수습("버텼다!"): 붉은 도장 "버팀", 북 세 번, 아이콘이 원래 색으로. 아직 거리 15 이하면 후속 예약
      if (cres) {
        run.eventScene = null;
        JK.Crisis.afterHeld(run, c);
        W.camTo(W.CAM_PLAY, 1.6);
        W.state.alarm = 0;
        Cards.held(c.name, `무너질 확률 ${Math.round(cres.p * 100)}%에서 버텼다!`, 2400);
        run.heldAt = run.pos;
        Cards.gaugeMark(c.gauge, 'relief');
        if (JK.Audio) [0, 380, 760].forEach((t) => setTimeout(() => JK.Audio.drum(), t));
        if (cres.level === 'end') titleNow(['heldAtEnd']);
      }
      refreshWarn();
      if ((run.stats.followupsCancelled || 0) >= 3) titleNow(['cancel3']);
    }
    if (run.bigPreview > 0) run.bigPreview--;
    // 결 기록(연속 규칙) · 씨앗 → 열매 예약 · 안정 구간이 이어진 장수
    if (c.grain) run.grainHist.push(c.grain);
    if (c.seed && c.seed.fruit_id && side && (!c.seed.side || c.seed.side === sideKey) && cardsById[c.seed.fruit_id]) run.reserve.push({ card: c.seed.fruit_id, at: run.pos + 1 + (c.seed.after_n || 5), from: c.id });
    run.calmRun = Object.values(run.zones || {}).every((z) => z.level === 'stable') ? (run.calmRun || 0) + 1 : 0;
    S.meta.cardsPlayed++;
    W.cardPassed();
    if (c.kind === 'daily') run.used.push(c.id);
    // 짓기: 이름 있는 건물은 어느 쪽을 골라도 역사대로 선다. 고른 방식은 건물 상태로 남는다(설계서 7-4).
    let wait = against ? 1300 : cres ? 2300 : gres ? 2000 : 700;
    const builds = (side ? side.build : c.fx && c.fx.build) || [];
    const state = side && side.build_state;
    if (builds.length) wait = Math.max(wait, doBuilds(builds, against ? 1300 : 350, state));
    cardFx(c, state, builds);
    // 이름 없는 마을은 카드마다 조금씩 자란다
    for (const k in era.map.buildings) {
      const v = era.map.buildings[k];
      if (v.kind === 'village' && v.grow && !builds.includes(k)) setTimeout(() => W.growVillage(k, v.grow), 600);
    }
    run.grown = (run.grown || 0) + 1;
    run.pos++;
    // 위기 카드 끼워 넣기: 지금 구간에 따라 확률로 다음 자리에(역사 카드 순서는 그대로 밀린다)
    // 위기 카드 끼워 넣기(10-8): 후속(기한) → 예고(안정→경고) → 위기 사건(구간 확률). 역사 카드 순서는 그대로 밀린다.
    // 게이지가 0·100에 닿아도 바로 실각하지 않는다(v3) — 끝 구간에서는 위기 확률이 매우 높을 뿐이다
    const cid = JK.Crisis.pick(run, JK.rng((run.stageSeed + run.pos * 977 + (run.stats.fallsRun || 0)) >>> 0), prevZones);
    if (cid) run.deck.splice(run.pos, 0, cid);
    else if (run.reserve.length) {
      // 씨앗의 열매: 기한이 된 것 하나를 다음 자리에(위기가 끼면 한 장 미룸)
      const due = run.reserve.find((r) => r.at <= run.pos);
      if (due) {
        run.reserve = run.reserve.filter((r) => r !== due);
        run.deck.splice(run.pos, 0, due.card);
      }
    }
    if (c.real_history) run.pending = { text: c.real_history, run: side ? side.this_run : '', against, outside: !!c.out_of_textbook, year: c.year };
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
      save();
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
    const again = D.afterFall === 'run' ? '판 전체를 처음부터 다시!' : '이 왕의 처음부터 다시!';
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
    S.meta.clears[st.id] = (S.meta.clears[st.id] || 0) + 1;
    const got = [];
    if (run.stageStats.edge) got.push('edgeClear');
    if (!run.stageStats.falls) got.push('noFallStage');
    const lastStage = !era.stages[stageIndex(st.id) + 1];
    if (lastStage && (run.stats.held || 0) >= 5) got.push('held5');
    W.setTOD(Math.min(1, st.tod[1] + 0.06));
    const qs = pickQuiz(st.id, run.stageSeed);
    JK.Quiz.run(qs, { options: D.quizOptions, retry: D.quizRetry }, (res) => {
      const right = res.filter(Boolean).length;
      run.stats.quiz.asked += res.length;
      run.stats.quiz.right += right;
      S.meta.quiz.asked += res.length;
      S.meta.quiz.right += right;
      if (res.length && right === res.length) got.push('quizPerfect');
      const newTitles = awardTitles(got);
      // 다음 왕 시작 게이지: 끝 게이지를 난이도만큼 이어받고(보통 1/2), 맞힌 문항마다 50에서 가장 먼 게이지를 당긴다
      const next = {};
      for (const k in run.vals) next[k] = Math.round(50 + (run.vals[k] - 50) * D.carry);
      for (let i = 0; i < right; i++) {
        let far = null;
        for (const k in next) if (!far || Math.abs(next[k] - 50) > Math.abs(next[far] - 50)) far = k;
        if (far && next[far] !== 50) next[far] += next[far] > 50 ? -Math.min(D.quizBonus, next[far] - 50) : Math.min(D.quizBonus, 50 - next[far]);
      }
      S.saveMeta();
      const si = stageIndex(st.id);
      const nst = era.stages[si + 1];
      // 이 왕에서 지은 것과 그 모습(상태)은 판 기록으로 남는다(엔딩 "나의 한양"·기록관용)
      run.history = run.history || [];
      run.history.push({ stage: st.id, vals: Object.assign({}, run.vals), built: run.built.filter((k) => !run.builtBefore.includes(k)).map((k) => [k, run.states[k] || 'smooth']) });
      run.builtBefore = run.built.slice();
      run.statesBefore = {};
      run.flagsBefore = Object.assign({}, run.flags || {});
      run.flagsRunBefore = Object.assign({}, run.flagsRun || {});
      run.grownBefore = run.grown || 0;
      if (nst && nst.ready) {
        G.startStage(nst.id, next);
        return;
      }
      run.waiting = { from: st.id, next: nst ? nst.id : null, start: next, right, asked: res.length, titles: newTitles, vals: Object.assign({}, run.vals), built: run.history[run.history.length - 1].built };
      G.state = 'waiting';
      save();
      W.setOrbit(true);
      W.camTo({ dist: 31, el: 0.42, fov: 30 }, 3);
      if (JK.Audio) JK.Audio.chime();
      setTimeout(() => JK.UI.showComingSoon(run.waiting), 1200);
    });
  }
  function pickQuiz(stageId, seed) {
    const rnd = JK.rng(seed + 17);
    const pool = shuffle(era.data.quizzes.filter((q) => q.stage === stageId), rnd);
    const out = [];
    let outside = 0;
    for (const q of pool) {
      if (out.length >= 3) break;
      if (q.out_of_textbook) {
        if (outside >= 1) continue;
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
  G.debugBuildAll = function () {
    for (const c of era.data.cards) {
      const b = (c.choices ? c.choices.right.build : c.fx && c.fx.build) || [];
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
})();
