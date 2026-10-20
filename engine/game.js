/* engine/game.js — 한 판의 흐름: 덱 만들기 → 카드 넘기기 → 사관 기록 → 실각(그 왕 처음부터) / 클리어 → 사관 퀴즈 → 다음 왕
 * 시대와 무관하다. 글과 규칙 값은 JK.era(시대팩)에서 읽는다. 진행은 카드마다 저장해 이어하기가 된다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const G = (JK.Game = { run: null, state: 'title' });
  let era, W, S, Cards, pics;
  let cardsById = {};

  G.init = function (opts) {
    era = JK.era;
    W = JK.World;
    S = JK.Save;
    Cards = JK.Cards;
    pics = opts.portraits;
    for (const c of era.data.cards) cardsById[c.id] = c;
    Cards.init({ gauges: era.gauges, onCommit: commit });
  };
  G.card = (id) => cardsById[id];
  const stageOf = (id) => era.stages.find((s) => s.id === id);
  const stageIndex = (id) => era.stages.findIndex((s) => s.id === id);

  /* ---------- 덱 만들기 ---------- */
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
    const hist = cards.filter((c) => c.stage === stage.id && (c.type === 'history' || c.type === 'scroll')).sort((a, b) => a.order - b.order);
    const daily = cards.filter((c) => c.type === 'daily' && c.daily.kings.includes(stage.id) && !used.includes(c.id));
    // 필수(★)는 이 왕에서 꼭 한 번. 다른 왕의 필수 카드는 그 왕보다 앞선 왕에서 뽑지 않는다.
    const required = daily.filter((c) => c.daily.required === stage.id);
    const optional = short ? [] : shuffle(daily.filter((c) => !c.daily.required || (c.daily.required !== stage.id && stageIndex(c.daily.required) < si)), rnd);
    // 일상 카드는 역사 카드 사이(첫 카드 뒤부터)에 끼운다
    const gaps = Math.max(1, hist.length - 1);
    const slots = Array.from({ length: gaps }, () => []);
    shuffle(required.slice(), rnd).forEach((c, i) => slots[(Math.floor(rnd() * gaps) + i) % gaps].push(c.id));
    // 무작위 칸(설계서 10-2: 왕마다 5~8칸)
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
  const startVals = () => {
    const v = {};
    for (const g of era.gauges) v[g.key] = 50;
    return v;
  };
  G.hasRun = () => !!(S.run && S.run.era === era.id && S.run.stage);
  G.newRun = function () {
    S.meta.plays++;
    S.saveMeta();
    const seed = (Date.now() ^ (Math.random() * 1e9)) >>> 0;
    G.run = {
      era: era.id,
      seed,
      stage: era.stages[0].id,
      vals: startVals(),
      start: startVals(),
      used: [],
      stats: { fallsRun: 0, quiz: { asked: 0, right: 0 } },
    };
    G.startStage(era.stages[0].id, G.run.start);
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
    run.states = {};
    run.flags = Object.assign({}, run.flagsBefore || {});
    run.flagsBefore = Object.assign({}, run.flags);
    run.grown = run.grownBefore || 0;
    run.stageStats = { edge: false, falls: run.stageStats && run.stageStats.stage === stageId ? run.stageStats.falls : 0, stage: stageId };
    run.waiting = null;
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
    for (const k of G.run.built) W.buildInstant(k, undefined, (G.run.states || {})[k]);
    const fl = G.run.flags || {};
    if (fl.boats) W.fxBoats(true);
    if (fl.flag) W.fxFlag(true);
    W.state.people = G.run.vals.people !== undefined ? G.run.vals.people : 50;
    setTOD(true);
    W.camTo(W.CAM_PLAY, restoring ? 1.2 : 2.4);
    W.setOrbit(false);
    Cards.setGauges(G.run.vals, true);
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

  /* ---------- 카드 보여 주기 ---------- */
  function roleView(who, whoName) {
    const r = era.data.roles[who] || { name: whoName || '', tag: '', bg: '#ddd' };
    return { img: pics[who], bg: r.bg, name: whoName || r.name, tag: r.tag };
  }
  function showCurrent() {
    const run = G.run;
    if (G.state !== 'play') return;
    if (run.pending) return showRecord();
    if (run.pos >= run.deck.length) return stageClear();
    const c = cardsById[run.deck[run.pos]];
    const st = stageOf(run.stage);
    const v = roleView(c.who, c.whoName);
    Object.assign(v, {
      text: c.text,
      left: c.left && c.left.label,
      right: c.right && c.right.label,
      single: c.single,
      scroll: c.type === 'scroll',
      outside: !!c.outside,
      turn: `${run.pos + 1} / ${run.deck.length}`,
      year: c.year || '',
      fx: c.single ? null : { left: c.left.fx, right: c.right.fx },
      hand: st.tutorial && run.pos < st.tutorial && S.meta.cardsPlayed < 12,
    });
    S.markSeen(c.id);
    Cards.show(v);
  }
  function showRecord() {
    const p = G.run.pending;
    const v = roleView('sagwan');
    Object.assign(v, { text: p.text, run: p.run || '', single: '기록을 넘긴다', scroll: true, record: true, turn: '실제 역사', fx: null, outside: !!p.outside, year: p.year || '' });
    Cards.show(v);
  }

  /* ---------- 넘기기 ---------- */
  function commit(dir) {
    const run = G.run;
    // 사관 기록을 넘김 → 거절해서 늦어진 건물이 이제 선다
    if (run.pending) {
      const p = run.pending;
      run.pending = null;
      const wait = doBuilds(p.build, 300);
      save();
      return setTimeout(showCurrent, Math.max(700, wait));
    }
    const c = cardsById[run.deck[run.pos]];
    const side = c.single ? null : dir > 0 ? c.right : c.left;
    let big = 0;
    if (side) {
      for (const k in side.fx || {}) {
        if (!(k in run.vals)) continue;
        run.vals[k] = JK.clamp(run.vals[k] + side.fx[k], 0, 100);
        big = Math.max(big, Math.abs(side.fx[k]));
      }
      for (const k in run.vals) if (run.vals[k] <= 10 || run.vals[k] >= 90) run.stageStats.edge = true;
      W.state.people = run.vals.people;
      Cards.setGauges(run.vals);
      Cards.flash(side.fx || {});
      if (big >= 15) {
        W.shake(0.5);
        Cards.shake();
      }
      if (side.result && !c.record) Cards.toast(side.result, Math.max(2600, side.result.length * 70));
    }
    S.meta.cardsPlayed++;
    W.cardPassed();
    if (c.type === 'daily') run.used.push(c.id);
    // 짓기: 이름 있는 건물은 어느 쪽을 골라도 역사대로 선다. 고른 방식은 건물 상태로 남는다(설계서 7-4).
    let wait = 700;
    const builds = c.build || [];
    const state = side && side.state;
    if (builds.length) wait = Math.max(wait, doBuilds(builds, 350, state));
    cardFx(c, state);
    // 이름 없는 마을은 카드마다 조금씩 자란다
    for (const k in era.map.buildings) {
      const v = era.map.buildings[k];
      if (v.kind === 'village' && v.grow && !builds.includes(k)) setTimeout(() => W.growVillage(k, v.grow), 600);
    }
    run.grown = (run.grown || 0) + 1;
    run.pos++;
    if (c.record) run.pending = { text: c.record, run: side ? side.result : '', outside: !!c.outside, year: c.year, build: [] };
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
      const state = idx === 0 ? stateIn : null;
      if (state) {
        G.run.states = G.run.states || {};
        G.run.states[k] = state;
        const bs = (S.meta.buildStates = S.meta.buildStates || {});
        (bs[k] = bs[k] || {})[state] = 1;
      }
      const at = t;
      setTimeout(() => W.build(k, { state }), at);
      const kind = era.map.buildings[k] && era.map.buildings[k].kind;
      end = Math.max(end, at + (kind === 'village' || kind === 'wall' ? 2200 : 1300));
      t += 900;
    });
    return end;
  }

  // 카드 연출 (설계서 3장 연출 칸): 왕기, 짐배, 하늘 글씨, 성문 글자 빛
  function cardFx(c, state) {
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
      const keys = c.build || [];
      for (const k in f.glyphs) {
        const i = keys.indexOf(k);
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
    const t0 = performance.now();
    const iv = setInterval(() => {
      const el = performance.now() - t0;
      if (el < 2200 || (W.state.ink < 0.8 && el < 6000)) return;
      clearInterval(iv);
      if (G.state !== 'fall') return;
      JK.UI.showFall({ rec, real: st.realEnd, img: pics[st.kingRole || st.id], preview });
    }, 100);
  }
  G.debugFall = () => fall('treasury', 0, true);
  // 실각 뒤: 그 왕의 처음부터 (시작 게이지 그대로)
  G.retryStage = function () {
    document.body.classList.remove('over');
    W.state.inkTarget = 0;
    W.state.ink = 0;
    const run = G.run;
    run.built = run.builtBefore.slice();
    G.startStage(run.stage, run.start);
  };

  /* ---------- 클리어 → 사관 퀴즈 → 다음 왕 ---------- */
  function stageClear() {
    const run = G.run;
    const st = stageOf(run.stage);
    G.state = 'quiz';
    Cards.hide();
    S.meta.clears[st.id] = (S.meta.clears[st.id] || 0) + 1;
    const got = [];
    if (run.stageStats.edge) got.push('edgeClear');
    if (!run.stageStats.falls) got.push('noFallStage');
    W.setTOD(Math.min(1, st.tod[1] + 0.06));
    const qs = pickQuiz(st.id, run.stageSeed);
    JK.Quiz.run(qs, (res) => {
      const right = res.filter(Boolean).length;
      run.stats.quiz.asked += res.length;
      run.stats.quiz.right += right;
      S.meta.quiz.asked += res.length;
      S.meta.quiz.right += right;
      if (res.length && right === res.length) got.push('quizPerfect');
      const newTitles = awardTitles(got);
      // 다음 왕 시작 게이지: 끝 게이지를 절반만 이어받고, 맞힌 문항마다 50에서 가장 먼 게이지를 5씩 당긴다
      const next = {};
      for (const k in run.vals) next[k] = Math.round(50 + (run.vals[k] - 50) / 2);
      for (let i = 0; i < right; i++) {
        let far = null;
        for (const k in next) if (!far || Math.abs(next[k] - 50) > Math.abs(next[far] - 50)) far = k;
        if (far && next[far] !== 50) next[far] += next[far] > 50 ? -Math.min(5, next[far] - 50) : Math.min(5, 50 - next[far]);
      }
      S.saveMeta();
      const si = stageIndex(st.id);
      const nst = era.stages[si + 1];
      run.builtBefore = run.built.slice();
      run.flagsBefore = Object.assign({}, run.flags || {});
      run.grownBefore = run.grown || 0;
      if (nst && nst.ready) {
        G.startStage(nst.id, next);
        return;
      }
      run.waiting = { from: st.id, next: nst ? nst.id : null, start: next, right, asked: res.length, titles: newTitles, vals: Object.assign({}, run.vals) };
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
      if (q.outside) {
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
    for (const c of era.data.cards) for (const b of c.build || []) if (!G.run.built.includes(b)) doBuilds([b], 0);
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
