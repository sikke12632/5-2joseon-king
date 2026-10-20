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
    const [mn, mx] = stage.randomSlots || [5, 8];
    const n = mn + Math.floor(rnd() * (mx - mn + 1));
    for (let k = 0; k < n && optional.length; k++) slots[Math.floor(rnd() * gaps)].push(optional.shift().id);
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
    run.pos = 0;
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
    run.zones = {};
    run.crisisRest = 0;
    run.damaged = {};
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
  function showCurrent() {
    const run = G.run;
    if (G.state !== 'play') return;
    if (run.pending) return showRecord();
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
    if (c.kind === 'crisis') v.tag = c.level === 'event' ? '위기' : '예고';
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
      fx: c.single ? null : { left: scaled(c.choices.left), right: scaled(c.choices.right) },
      preview: run.bigPreview > 0 ? 'arrows' : D.preview,
      hand: st.tutorial && run.pos < st.tutorial && S.meta.cardsPlayed < 12,
    });
    S.markSeen(c.id);
    Cards.show(v);
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
    // 역사를 거스르는 쪽을 골랐는데 결국 일이 일어나는 카드: "그래도 역사는 흘렀다" 한 박자
    const against = !!(side && c.against === sideKey);
    let big = 0;
    if (side) {
      const applied = {};
      for (const k in side.effects || {}) {
        if (!(k in run.vals)) continue;
        const d = G.effect(k, side.effects[k], run.vals);
        applied[k] = d;
        run.vals[k] = JK.clamp(run.vals[k] + d, 0, 100);
        big = Math.max(big, Math.abs(d));
      }
      for (const k in run.vals) if (run.vals[k] <= 10 || run.vals[k] >= 90) run.stageStats.edge = true;
      W.state.people = run.vals.people;
      if (against) {
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
      if (side.this_run && !c.real_history) Cards.toast(side.this_run, Math.max(2600, side.this_run.length * 70));
      refreshWarn();
    }
    if (run.bigPreview > 0) run.bigPreview--;
    S.meta.cardsPlayed++;
    W.cardPassed();
    if (c.kind === 'daily') run.used.push(c.id);
    // 위기 사건 카드: 큰 연출과 건물 손상(이번 판에서)
    if (c.kind === 'crisis' && c.level === 'event') JK.Crisis.event(run, c);
    // 짓기: 이름 있는 건물은 어느 쪽을 골라도 역사대로 선다. 고른 방식은 건물 상태로 남는다(설계서 7-4).
    let wait = against ? 1300 : 700;
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
    const cid = JK.Crisis.pick(run, JK.rng((run.stageSeed + run.pos * 977 + (run.stats.fallsRun || 0)) >>> 0));
    if (cid) run.deck.splice(run.pos, 0, cid);
    if (c.real_history) run.pending = { text: c.real_history, run: side ? side.this_run : '', against, outside: !!c.out_of_textbook, year: c.year };
    setTOD(false);
    const bad = era.gauges.find((g) => run.vals[g.key] <= 0 || run.vals[g.key] >= 100);
    save();
    S.saveMeta();
    setTimeout(() => {
      if (bad) return fall(bad.key, run.vals[bad.key] >= 100 ? 100 : 0);
      showCurrent();
    }, Math.max(wait, c.single ? 500 : 900));
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
  function fall(key, at, preview) {
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
      JK.UI.showFall({ rec, real: `${st.realEnd} ${again}`, hint, img: pics[st.kingRole || st.id], preview });
    }, 100);
  }
  G.debugFall = () => fall('treasury', 0, true);
  // 실각 뒤 (10-7): 새싹 = 시작 게이지 50 + 처음 3장 큰 미리보기 / 보통·성군 = 시작 게이지 그대로 / 실록 도전 = 판 전체 처음부터
  G.retryStage = function () {
    document.body.classList.remove('over');
    W.state.inkTarget = 0;
    W.state.ink = 0;
    const run = G.run;
    const D = G.diff();
    if (D.afterFall === 'run') {
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
  G.commit = (dir) => Cards.commit(dir);
})();
