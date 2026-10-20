/* engine/crisis.js — 게이지 위기: 구간 판정(안정/경고/위험, 낮음·높음), 눈에 보이는 경고, 세계 반응, 위기 카드 끼워 넣기
 * 숫자·글·카드는 모두 시대팩에서 읽는다(era.crisis, data의 kind:'crisis' 카드 — 설계서 10-8).
 * 역사는 바뀌지 않는다: 위기 카드는 "이번 판에서" 일어나는 일이고, 고정 역사 카드 순서는 그대로다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const C = (JK.Crisis = {});
  let era, W, Cards, S;

  C.init = function () {
    era = JK.era;
    W = JK.World;
    Cards = JK.Cards;
    S = JK.Save;
  };
  const cfg = () => era.crisis || {};

  /* ---------- 구간 ---------- */
  // 낮음: val ≤ warn → 경고, ≤ danger → 위험. 높음: 100에서 같은 거리.
  C.zones = function (vals) {
    const z = cfg().zones || { warn: 25, danger: 12 };
    const out = {};
    for (const k in vals) {
      const v = vals[k];
      let level = 'stable',
        side = null;
      if (v <= z.danger) [level, side] = ['danger', 'low'];
      else if (v <= z.warn) [level, side] = ['warn', 'low'];
      else if (v >= 100 - z.danger) [level, side] = ['danger', 'high'];
      else if (v >= 100 - z.warn) [level, side] = ['warn', 'high'];
      out[k] = { level, side };
    }
    return out;
  };
  const rank = { stable: 0, warn: 1, danger: 2 };

  /* ---------- 눈에 보이는 경고 + 세계 반응 ---------- */
  // prev: 지난 구간(첫 진입 알림용). quiet: 알림 없이 모습만(이어하기 등)
  C.apply = function (run, quiet) {
    const zones = C.zones(run.vals);
    const D = JK.Game.diff();
    const showUI = D.warn !== 0; // 실록 도전은 경고 표시 없음(설계서 10-7)
    Cards.setZones(showUI ? zones : {});
    const prev = run.zones || {};
    if (!quiet && showUI) {
      for (const k in zones) {
        const z = zones[k],
          p = prev[k] || { level: 'stable' };
        if (rank[z.level] > rank[p.level] || (z.side && p.side && z.side !== p.side)) {
          const g = era.gauges.find((x) => x.key === k);
          const a = ((cfg().alerts || {})[k] || {})[z.side];
          const text = a ? a[z.level] || a.warn : `${g.name} 게이지가 ${z.side === 'low' ? '바닥나' : '넘쳐'} 가고 있어요!`;
          Cards.alert(g, text, z.level);
          break;
        }
      }
    }
    run.zones = zones;
    W.crisisScene(zones);
    return zones;
  };

  /* ---------- 위기 카드 끼워 넣기 ---------- */
  // 카드를 넘긴 뒤 부른다. 끼워 넣을 카드 id를 돌려준다(없으면 null).
  C.pick = function (run, rnd) {
    const c = cfg();
    const pool = era.data.cards.filter((x) => x.kind === 'crisis' && x.stages.includes(run.stage));
    if (!pool.length) return null;
    if ((run.crisisRest || 0) > 0) {
      run.crisisRest--;
      return null;
    }
    const zones = run.zones || C.zones(run.vals);
    const D = JK.Game.diff();
    const mult = D.crisisMult !== undefined ? D.crisisMult : 1;
    // 가장 위험한 게이지부터
    const keys = Object.keys(zones).filter((k) => zones[k].level !== 'stable').sort((a, b) => rank[zones[b].level] - rank[zones[a].level]);
    for (const k of keys) {
      const z = zones[k];
      const p = ((c.chance || {})[z.level] || 0) * mult;
      if (rnd() >= p) continue;
      // 위험 구간이면 사건 카드, 경고 구간이면 예고 카드. 이번 판에 아직 안 나온 것
      const want = z.level === 'danger' ? 'event' : 'warn';
      const cand = pool.filter((x) => x.gauge === k && x.side === z.side && x.level === want && !(run.crisisUsed || []).includes(x.id));
      if (!cand.length) continue;
      const card = cand[Math.floor(rnd() * cand.length)];
      run.crisisUsed = (run.crisisUsed || []).concat(card.id);
      run.crisisRest = c.rest !== undefined ? c.rest : 3;
      return card.id;
    }
    return null;
  };

  // 위기 사건 카드를 넘겼을 때: 큰 연출 + 건물 손상(이번 판에서만)
  C.event = function (run, card) {
    W.crisisBeat(card.gauge);
    const dmg = card.damage;
    if (!dmg) return;
    let target = dmg.target;
    if (!target || target === 'random') {
      const named = run.built.filter((k) => era.map.buildings[k] && era.map.buildings[k].kind === 'single' && !(run.damaged || {})[k]);
      if (!named.length) return;
      target = named[Math.floor(Math.random() * named.length)];
    }
    if (!run.built.includes(target)) return;
    run.damaged = run.damaged || {};
    run.damaged[target] = card.id;
    setTimeout(() => W.setBuildState(target, 'damaged', 0), 900);
  };
})();
