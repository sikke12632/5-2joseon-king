/* engine/events.js — 돌발 이벤트 (설계서 10-13): 돌발 사건 뽑기 · 연쇄 · 알 수 없는 상자 · 왕의 마음과 기질 · 사관의 한 줄
 * 모두 [게임 속 일]. 숫자는 시대팩(era.events · era.mind · era.narr), 카드는 kind 'event'(data/<왕>/events.js).
 * 판의 상태는 run.ev(돌발 기록) · run.mind(0~100) · run.trait(기질) · run.night(무너질 듯한 밤)에 두어 이어 하기에 남는다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const E = (JK.Events = {});
  let era;
  const $ = (s) => document.querySelector(s);
  const ecfg = () => era.events || {};
  const mcfg = () => era.mind || {};
  const ncfg = () => era.narr || {};
  const dId = () => JK.Game.diffId();
  const byDiff = (o, fb) => (o && typeof o === 'object' ? (o[dId()] !== undefined ? o[dId()] : o.normal !== undefined ? o.normal : fb) : o !== undefined ? o : fb);
  const RANK = () => JK.Crisis.RANK;

  E.init = function () {
    era = JK.era;
  };
  E.isEvent = (c) => !!c && c.kind === 'event';
  const card = (id) => JK.Game.card(id);
  const evCards = (stage) => era.data.cards.filter((c) => c.kind === 'event' && c.stages.includes(stage));

  /* ---------- 판 시작 ---------- */
  E.reset = function (run, info) {
    run.ev = { count: 0, rest: 0, seen: [], depth: {}, lastNarr: -99, q: [], nowAt: -1, boxes: [] };
    run.mind = (info && info.mindStart) || 0;
    run.trait = null;
    run.night = null;
    E.refresh(run, true);
  };
  const ev = (run) => (run.ev = run.ev || { count: 0, rest: 0, seen: [], depth: {}, lastNarr: -99, q: [], nowAt: -1, boxes: [] });

  /* ---------- 무작위 칸 → 돌발 (10-13-1) ---------- */
  // 무작위 칸('*')에 왔을 때 부른다. 돌발 카드 id 또는 null
  E.tryReplace = function (run, rnd) {
    const C = ecfg();
    const s = ev(run);
    if (!C.chance) return null;
    if (run.pos < (C.firstCards || 3)) return null;
    // 마지막 역사 사건 카드 바로 앞에는 돌발이 없다
    const deck = run.deck;
    let lastHist = -1;
    for (let i = deck.length - 1; i >= 0; i--) {
      const c = card(deck[i]);
      if (c && c.kind === 'history') {
        lastHist = i;
        break;
      }
    }
    if (lastHist === run.pos + 1) return null;
    if (s.rest > 0) return null;
    // 기다리는 연쇄까지 세어 한 판 최대를 넘지 않게
    const pendingChains = (run.reserve || []).filter((r) => r.ev).length;
    if (s.count + pendingChains >= byDiff(C.max, 4)) return null;
    if (rnd() >= byDiff(C.chance, 0.25)) return null;
    return E.pick(run, rnd);
  };
  // 종류 비율 → 그 종류 안에서 한 장. 억울함 막기: 가장 나쁜 게이지가 벼랑 이하면 흉 ½·길 ×2
  E.pick = function (run, rnd) {
    const C = ecfg();
    const s = ev(run);
    const ctx = { run, meta: JK.Save.meta };
    const ratio = Object.assign({}, byDiff(C.ratio, { bad: 4, good: 3, guest: 1, box: 2, mind: 1 }));
    const worst = Math.max(0, ...Object.values(run.zones || {}).map((z) => RANK()[z.level] || 0));
    if (worst >= RANK().cliff) {
      ratio.bad = (ratio.bad || 0) * 0.5;
      ratio.good = (ratio.good || 0) * 2;
    }
    const byKind = {};
    for (const c of evCards(run.stage)) {
      if (c.event && c.event.chain_only) continue;
      if (s.seen.includes(c.id) || (run.used || []).includes(c.id)) continue;
      if (!JK.Cond.test(c.conditions, ctx)) continue;
      // 결 연속 규칙(10-9-3)도 지킨다(예: 수렁 바로 뒤 도박형 상자는 내지 않음)
      if (!JK.Game.grainFits(run, c.grain)) continue;
      (byKind[c.ev] = byKind[c.ev] || []).push(c);
    }
    const kinds = Object.keys(byKind).filter((k) => (ratio[k] || 0) > 0);
    if (!kinds.length) return null;
    let sum = 0;
    for (const k of kinds) sum += ratio[k];
    let r = rnd() * sum;
    let kind = kinds[kinds.length - 1];
    for (const k of kinds) if ((r -= ratio[k]) <= 0) {
      kind = k;
      break;
    }
    // 같은 종류 안: 처음 보는 카드 ×2, 마음 카드는 조건이 맞으면 ×mindBoost
    const list = byKind[kind].map((c) => ({ c, w: (JK.Save.meta.seen[c.id] ? 1 : 2) * ((C.mindBoost || {})[c.id] || 1) }));
    let tw = 0;
    for (const x of list) tw += x.w;
    let q = rnd() * tw;
    for (const x of list) if ((q -= x.w) <= 0) return x.c.id;
    return list[list.length - 1].c.id;
  };

  /* ---------- 돌발이 뜰 때 ---------- */
  // 뜨는 순간: 즉시 효과(작게), 왕의 마음, 사관 한 줄, 세계 연출. 같은 자리에서 두 번 하지 않는다(이어 하기)
  // 돌려줌: { now: {게이지: 실제로 움직인 값} } 또는 null
  E.onShow = function (run, c) {
    const s = ev(run);
    if (s.nowAt === run.pos && s.seen.includes(c.id)) return null;
    s.nowAt = run.pos;
    if (!s.seen.includes(c.id)) s.seen.push(c.id);
    s.count++;
    s.rest = byDiff(ecfg().rest, 3);
    const e = c.event || {};
    const applied = {};
    for (const k in e.now || {}) {
      if (!(k in run.vals)) continue;
      const d = JK.Game.effect(k, e.now[k], run.vals);
      const nv = JK.clamp(run.vals[k] + d, 0, 100);
      applied[k] = nv - run.vals[k];
      run.vals[k] = nv;
    }
    if (e.mind && e.mind.show) E.addMind(run, e.mind.show);
    const luck = c.ev === 'chain' ? e.luck : c.ev;
    if (luck === 'good') E.say(run, 'good');
    else if (c.ev === 'chain' && luck === 'bad') E.say(run, (s.depth[c.id] || 2) >= 2 ? 'chainBad' : 'badEvent');
    else if (c.ev === 'bad' || (c.ev === 'guest' && e.mind && e.mind.show > 0)) E.say(run, 'badEvent');
    const m = JK.Save.meta;
    m.events = m.events || {};
    m.events[c.id] = (m.events[c.id] || 0) + 1;
    return { now: applied };
  };
  // 이 카드에서 상자를 여는 쪽인가
  E.isBox = (c, sideKey) => !!(c && c.box && c.box.side === sideKey);
  // 상자 굴리기(10-13-4): 좋은·나쁜·빈 셋. 난이도에 따라 나쁜 결과 확률을 더하고 그만큼 좋은 결과에서 뺀다
  E.openBox = function (run, c, rnd) {
    const add = byDiff(ecfg().boxBad, 0);
    const outs = c.box.outcomes.map((o) => Object.assign({}, o, { p: o.p + (o.kind === 'bad' ? add : o.kind === 'good' ? -add : 0) }));
    let r = rnd();
    let got = outs[outs.length - 1];
    for (const o of outs) if ((r -= o.p) <= 0) {
      got = o;
      break;
    }
    if (got.kind === 'bad') E.addMind(run, (mcfg().up || {}).boxBad || 10);
    E.say(run, 'box');
    const m = JK.Save.meta;
    m.boxes = m.boxes || {};
    (m.boxes[c.id] = m.boxes[c.id] || {})[got.kind] = 1;
    ev(run).boxes.push({ card: c.id, kind: got.kind });
    return got;
  };
  // 고른 뒤: 마음(오른쪽/왼쪽), 마음 카드의 쉬는 쪽은 나쁜 기질을 풀어 줌, 연쇄 예약
  E.onCommit = function (run, c, sideKey, rnd) {
    const s = ev(run);
    const e = c.event || {};
    const dm = e.mind ? e.mind[sideKey] || 0 : 0;
    if (dm) E.addMind(run, dm);
    if (c.ev === 'mind' && dm < 0 && run.trait && traitDef(run.trait.key).bad) E.clearTrait(run, true);
    // 연쇄(10-13-4 ⑤): 적힌 확률 × 난이도 배율. 셋째 단계까지. 하나만 굴린다(불운·행운이 갈림)
    const depth = s.depth[c.id] || 1;
    if (e.chains && depth < (ecfg().chainDepth || 3) && s.count < byDiff(ecfg().max, 4)) {
      const mult = byDiff(ecfg().chainMult, 1);
      let r = rnd();
      for (const ch of e.chains) {
        const p = Math.min(0.95, ch.p * mult);
        if (r < p) {
          if (s.seen.includes(ch.card) || !card(ch.card)) break;
          const [a, b] = ecfg().chainAfter || [3, 6];
          const k = a + Math.floor(rnd() * (b - a + 1));
          run.reserve.push({ card: ch.card, at: run.pos + k, from: c.id, ev: true });
          s.depth[ch.card] = depth + 1;
          break;
        }
        r -= p;
      }
    }
  };

  /* ---------- 왕의 마음과 기질 (10-13-2) ---------- */
  const traitDef = (k) => ((mcfg().traits || {})[k] || {});
  E.traitDef = traitDef;
  E.addMind = function (run, d) {
    if (!d) return;
    run.mind = JK.clamp((run.mind || 0) + d, 0, 100);
    if (run.mind >= 100) {
      run.mind = mcfg().after !== undefined ? mcfg().after : 50;
      if (run.trait && traitDef(run.trait.key).bad) {
        // 나쁜 기질이 붙은 채 다시 100: 무너질 듯한 밤 — 가장 나쁜 게이지의 위기 확률 ×2, 3장 동안
        const N = mcfg().night || {};
        let worst = null;
        for (const k in run.vals) if (!worst || Math.min(run.vals[k], 100 - run.vals[k]) < Math.min(run.vals[worst], 100 - run.vals[worst])) worst = k;
        run.night = { gauge: worst, left: N.cards || 3, mult: N.mult || 2 };
        E.say(run, 'night');
        E._pending = (E._pending || []).concat({ type: 'night' });
      } else {
        const odds = byDiff(mcfg().traitOdds, 0.75);
        const rnd = JK.rng((run.stageSeed + run.pos * 389 + 17) >>> 0);
        const bad = rnd() < odds;
        const keys = Object.keys(mcfg().traits || {}).filter((k) => !!traitDef(k).bad === bad);
        const key = keys[Math.floor(rnd() * keys.length)];
        if (key) {
          run.trait = { key, left: traitDef(key).last || 12 };
          E.say(run, 'trait', ((ncfg().trait || {})[key]) || '');
          E._pending = (E._pending || []).concat({ type: 'trait', key });
          const m = JK.Save.meta;
          m.traits = m.traits || {};
          m.traits[key] = (m.traits[key] || 0) + 1;
        }
      }
    }
    E.refresh(run);
  };
  E.clearTrait = function (run, byCard) {
    if (!run.trait) return;
    const key = run.trait.key;
    run.trait = null;
    E._pending = (E._pending || []).concat({ type: 'clear', key, byCard });
    E.refresh(run);
  };
  // 카드 한 장을 넘길 때마다(역사·일상·위기·돌발 모두): 경고 이하 +2, 기질·밤·쉬는 장수 줄이기
  E.afterCard = function (run, c) {
    const s = ev(run);
    const zs = run.zones || {};
    if (Object.values(zs).some((z) => (RANK()[z.level] || 0) >= RANK().warn)) E.addMind(run, (mcfg().up || {}).warnCard || 2);
    if (run.trait && --run.trait.left <= 0) E.clearTrait(run);
    if (run.night && --run.night.left <= 0) run.night = null;
    if (s.rest > 0 && !(c && E.isEvent(c) && s.nowAt === run.pos)) s.rest--;
    E.refresh(run);
  };
  // 효과 배율(G.effect에서): 의심 = 양반 오름 ½ · 성급 = ×1.25 · 너그러움 = 백성 내림 ½
  E.effectMult = function (k, v) {
    const run = JK.Game.run;
    const t = run && run.trait && run.trait.key;
    if (!t) return v;
    if (t === 'suspicious' && k === 'nobles' && v > 0) return v * 0.5;
    if (t === 'hasty') return v * 1.25;
    if (t === 'generous' && k === 'people' && v < 0) return v * 0.5;
    return v;
  };
  // 위기 확률 배율(crisis.pick): 겁먹은 왕 ×1.3 · 무너질 듯한 밤(그 게이지) ×2
  E.crisisMult = function (run, gaugeKey) {
    let m = 1;
    if (run && run.trait && run.trait.key === 'fearful') m *= 1.3;
    if (run && run.night && run.night.gauge === gaugeKey) m *= run.night.mult || 2;
    return m;
  };
  // 실각 확률 배율(crisis.fallChance): 굳센 왕 ×0.5
  E.fallMult = (run) => (run && run.trait && run.trait.key === 'steadfast' ? 0.5 : 1);
  E.previewHidden = (run) => !!(run && run.trait && run.trait.key === 'tired');
  // 의심 많은 왕: 신하 인형 대사 끝에 "…정말이옵니다"(역사 사건 대사는 그대로)
  E.lineOf = function (run, c, text) {
    if (run && run.trait && run.trait.key === 'suspicious' && c.kind !== 'history' && c.kind !== 'sagwan' && /^official|^jeong$|^jojun$|^haryun$|^gwongeun$|^baegeuk$|^naegwan$/.test((c.who && c.who.doll) || '')) return text.replace(/[.!?]?$/, (m) => (m || '') + ' …정말이옵니다');
    return text;
  };
  E.takePending = function () {
    const p = E._pending || [];
    E._pending = [];
    return p;
  };

  /* ---------- 사관의 한 줄 (10-13-3) ---------- */
  // 이번 장에서 생긴 일을 모아 두었다가(say), 카드가 뜰 때 하나만 쓴다(flush). 세 장에 한 번까지, 우선순위가 높은 것
  E.say = function (run, kind, text) {
    ev(run).q.push({ kind, text: text || '' });
  };
  E.flush = function (run) {
    const s = ev(run);
    const q = s.q;
    s.q = [];
    if (!q.length) return '';
    if (run.pos - s.lastNarr < (ncfg().every || 3)) return '';
    const order = ncfg().order || [];
    q.sort((a, b) => (order.indexOf(a.kind) + 99) % 99 - (order.indexOf(b.kind) + 99) % 99);
    const top = q[0];
    let line = top.text;
    if (!line) {
      const L = (ncfg().lines || {})[top.kind] || [];
      if (!L.length) return '';
      line = L[Math.floor(JK.rng((run.stageSeed + run.pos * 53 + top.kind.length) >>> 0)() * L.length)];
    }
    s.lastNarr = run.pos;
    E.showNarr(line);
    return line;
  };
  // 화면 아래 두루마리에 붓으로 한 줄(2초 남짓)
  let narrTimer = 0;
  E.showNarr = function (line) {
    const el = $('#sagwanLine');
    if (!el) return;
    line = JK.Terms.withKing(line);
    el.querySelector('.sl-text').textContent = line;
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(narrTimer);
    narrTimer = setTimeout(() => el.classList.remove('show'), 2600 + line.length * 70);
  };

  /* ---------- 화면: 임금 메달 · 마음 붓 · 기질 ---------- */
  E.refresh = function (run, instant) {
    const box = $('#kingMind');
    if (!box || !run) return;
    const fill = box.querySelector('.km-ink');
    if (instant) fill.style.transition = 'none';
    fill.style.height = Math.round(run.mind || 0) + '%';
    // 마음이 한 번에 크게 오르면 붓이 출렁인다(아이들이 "왕이 지쳐 간다"를 알아보게)
    if (!instant && (run.mind || 0) - (E._lastMind || 0) >= 8) {
      box.classList.remove('bump');
      void box.offsetWidth;
      box.classList.add('bump');
    }
    E._lastMind = run.mind || 0;
    if (instant) {
      void fill.offsetWidth;
      fill.style.transition = '';
    }
    box.classList.toggle('high', (run.mind || 0) >= 70);
    const t = run.trait && traitDef(run.trait.key);
    for (const k of Object.keys(mcfg().traits || {})) box.classList.toggle('t-' + k, !!(run.trait && run.trait.key === k));
    box.classList.toggle('night', !!run.night);
    const chip = box.querySelector('.km-trait');
    chip.style.display = t ? '' : 'none';
    if (t) {
      chip.querySelector('.kt-icon').textContent = t.icon || '';
      chip.querySelector('.kt-name').textContent = JK.Terms.withKing('이번 생의 {왕은} · ', run.stage) + t.name;
      chip.querySelector('.kt-tip').textContent = `${t.tip} (${run.trait.left}장 남음)`;
      chip.classList.toggle('good', !t.bad);
    }
    document.body.classList.toggle('hasty', !!(run.trait && run.trait.key === 'hasty'));
  };
  E.setKing = function (img, name) {
    const box = $('#kingMind');
    if (!box) return;
    box.querySelector('.km-face').src = img || '';
    box.querySelector('.km-face').alt = name || '';
    box.style.display = '';
  };
  E.hideHud = function () {
    const box = $('#kingMind');
    if (box) box.style.display = 'none';
    document.body.classList.remove('hasty');
    // 첫 화면으로 갈 때 떠 있던 돌발 큰 글씨·사관 한 줄·상자·지도도 거둔다
    for (const s of ['#evBanner', '#boxReveal', '#evMap']) if ($(s)) $(s).className = '';
    if ($('#sagwanLine')) $('#sagwanLine').classList.remove('show');
  };
  // 기질이 붙음/풀림: 메달이 번쩍이고 큰 글씨
  E.announce = function (p) {
    const box = $('#kingMind');
    if (!box) return;
    box.classList.remove('pop');
    void box.offsetWidth;
    box.classList.add('pop');
    const t = traitDef(p.key);
    if (p.type === 'trait' && JK.EvFx) JK.EvFx.trait(p.key);
    if (p.type === 'trait') JK.Cards.toast(`${t.icon} ${JK.Terms.withKing('이번 생의 {왕은}')} 「${t.name}」 — ${t.tip}`, 3600, t.bad ? '왕의 마음이 지쳤어요' : '왕의 마음이 단단해졌어요');
    else if (p.type === 'clear') JK.Cards.toast(p.byCard ? `${t.icon} ${JK.Terms.withKing('{왕의}')} 마음이 풀렸다 — 「${t.name}」이 사라졌어요` : `「${t.name}」이 지나갔어요`, 2600);
    else if (p.type === 'night') JK.Cards.toast('🕯 무너질 듯한 밤 — 다음 3장 동안 가장 나쁜 게이지의 위기가 두 배로 잦아요', 3600, '왕의 마음');
  };

  /* ---------- 돌발이 터지는 순간의 큰 글씨 (10-13 "우와") ---------- */
  E.banner = function (c) {
    const el = $('#evBanner');
    if (!el) return;
    const names = ecfg().names || {};
    const luck = c.ev === 'chain' ? (c.event || {}).luck : c.ev;
    el.className = '';
    el.querySelector('.eb-kind').textContent = c.ev === 'chain' ? `연쇄 · ${luck === 'good' ? '행운이 이어진다' : '불운이 이어진다'}` : `돌발 · ${names[c.ev] || ''}`;
    el.querySelector('.eb-name').textContent = c.name || '';
    void el.offsetWidth;
    el.className = 'show k-' + (luck || c.ev);
    clearTimeout(E._bt);
    E._bt = setTimeout(() => (el.className = ''), 2300);
  };
  // 상자를 여는 순간: 흔들리다 뚜껑이 튀고, 좋은·나쁜·빈 결과가 크게
  E.reveal = function (c, got) {
    const el = $('#boxReveal');
    if (!el) return;
    const icon = { ET13: '🏺', ET14: '🧰', ET15: '🗺️' }[c.id] || '🎁';
    const res = { good: '✨', bad: '💨', empty: '🕸️' }[got.kind];
    const word = { good: '좋은 것이 나왔다!', bad: '나쁜 것이 나왔다…', empty: '텅 비었다' }[got.kind];
    el.querySelector('.br-box').textContent = icon;
    el.querySelector('.br-res').textContent = res;
    el.querySelector('.br-word').textContent = word;
    el.className = '';
    void el.offsetWidth;
    el.className = 'show ' + got.kind;
    clearTimeout(E._rt);
    E._rt = setTimeout(() => (el.className = ''), 2600);
  };
})();
