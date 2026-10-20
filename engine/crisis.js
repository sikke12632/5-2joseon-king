/* engine/crisis.js — 게이지 위기 (설계서 10-8, v3 규칙)
 * - 게이지가 0·100에 닿아도 바로 실각하지 않는다. 끝으로 갈수록 위기 사건 확률이 오른다.
 * - 구간: 안정 / 경고 / 위험 / 벼랑(거리 1~5) / 끝(0·100). 거리 = 0이나 100 가운데 가까운 쪽까지 남은 값.
 * - 안정→경고로 처음 들어가면 예고 카드. 위기 사건은 카드마다 확률로(가장 끝에 가까운 게이지 하나로 굴림).
 * - 위기 사건의 결과는 확률로 수습("버텼다!") 또는 실각. 실각 확률 = 구간 기본값 × 대응 배율 × 난이도 배율 (+ 후속 가산).
 * - 수습 뒤에도 거리 15 이하면 후속 위기 예약(정해진 장수 안에 반드시). 그 안에 거리 16 이상으로 돌아오면 취소.
 * - 수습한 위기 종류는 정해진 장수 동안 다시 터지지 않는다(쿨다운, 담임 추가 규칙). 극단 경고 연출은 그대로.
 * 숫자·글·장면은 모두 시대팩(era.crisis, kind:'crisis' 카드)에서 읽는다. 저장(run)에 모든 상태가 들어간다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const C = (JK.Crisis = {});
  let era, W, Cards;
  const RANK = { stable: 0, warn: 1, danger: 2, cliff: 3, end: 4 };
  C.RANK = RANK;

  C.init = function () {
    era = JK.era;
    W = JK.World;
    Cards = JK.Cards;
  };
  const cfg = () => era.crisis || {};
  const dId = () => JK.Game.diffId();
  const byDiff = (o, fallback) => (o && typeof o === 'object' ? (o[dId()] !== undefined ? o[dId()] : o.normal !== undefined ? o.normal : fallback) : o !== undefined ? o : fallback);

  /* ---------- 구간 (10-8-1) ---------- */
  C.zoneOf = function (v) {
    const Z = byDiff(cfg().zones, { stable: 26, warn: 16 });
    const d = Math.min(v, 100 - v);
    const side = v < 50 ? 'low' : 'high';
    let level = 'stable';
    if (d <= 0) level = 'end';
    else if (d < (cfg().cliff || 6)) level = 'cliff';
    else if (d < Z.warn) level = 'danger';
    else if (d < Z.stable) level = 'warn';
    return { level, side: level === 'stable' ? null : side, d };
  };
  C.zones = function (vals) {
    const out = {};
    for (const k in vals) out[k] = C.zoneOf(vals[k]);
    return out;
  };

  /* ---------- 눈에 보이는 경고 + 세계 반응 (10-8-4) ---------- */
  C.apply = function (run, quiet) {
    const zones = C.zones(run.vals);
    const D = JK.Game.diff();
    const showUI = D.warn !== 0; // 실록 도전은 아이콘 경고를 숨긴다(10-7)
    Cards.setZones(showUI ? zones : {}, run.followups || []);
    const prev = run.zones || {};
    if (!quiet && showUI) {
      for (const k in zones) {
        const z = zones[k],
          p = prev[k] || { level: 'stable' };
        if (z.level !== 'stable' && (RANK[z.level] > RANK[p.level] || z.side !== p.side)) {
          const g = era.gauges.find((x) => x.key === k);
          const a = ((cfg().alerts || {})[k] || {})[z.side] || {};
          const text = a[z.level] || a.danger || a.warn || `${g.name} 게이지가 ${z.side === 'low' ? '바닥나' : '넘쳐'} 가고 있어요!`;
          Cards.alert(g, text, RANK[z.level] >= 2 ? 'danger' : 'warn');
          break;
        }
      }
    }
    // 후속 예약이 걸린 게이지가 거리 16 이상으로 돌아오면 후속 취소(10-8-3 ⑤)
    if (run.followups) {
      const keep = [];
      for (const f of run.followups) {
        if (zones[f.gauge].d >= (cfg().followupCancelAt || 16)) {
          run.stats.followupsCancelled = (run.stats.followupsCancelled || 0) + 1;
          continue;
        }
        keep.push(f);
      }
      run.followups = keep;
    }
    run.zones = zones;
    // 세계 반응: 구간 + 지금 벌어진 위기 사건
    const sceneZones = {};
    for (const k in zones) sceneZones[k] = { level: zones[k].level === 'stable' ? 'stable' : RANK[zones[k].level] >= 2 ? 'danger' : 'warn', side: zones[k].side };
    if (run.eventScene && run.eventScene.until > run.pos) sceneZones[run.eventScene.gauge] = { level: 'event', side: run.eventScene.side };
    W.crisisScene(sceneZones);
    // 끝 구간: 섬 가장자리가 살짝 기울고 색이 엷어짐(실각 연출의 예고)
    W.state.edgeTarget = Object.values(zones).some((z) => z.level === 'end') ? 1 : 0;
    return zones;
  };

  /* ---------- 예고 카드 (10-8-2) ---------- */
  // 안정 → 경고로 처음 들어간 게이지·방향에 예고 카드. 안정으로 돌아가야 다시 나온다. 왕당 최대 4장(새싹 5)
  function pickForewarn(run, zones, prev) {
    run.forewarned = run.forewarned || {};
    for (const k in zones) {
      const z = zones[k];
      if (z.level === 'stable') delete run.forewarned[k];
    }
    const max = byDiff(cfg().forewarnMax, 4);
    for (const k in zones) {
      const z = zones[k],
        p = prev[k] || { level: 'stable' };
      if (z.level === 'stable' || p.level !== 'stable') continue;
      if (run.forewarned[k] === z.side) continue;
      run.forewarned[k] = z.side;
      if ((run.forewarnCount || 0) >= max) {
        Cards.toast(`사관: ${era.gauges.find((g) => g.key === k).name} 게이지를 살피소서.`, 2600);
        continue;
      }
      const card = era.data.cards.find((x) => x.kind === 'crisis' && x.level === 'warn' && x.gauge === k && x.side === z.side && x.stages.includes(run.stage));
      if (!card) continue;
      run.forewarnCount = (run.forewarnCount || 0) + 1;
      return card.id;
    }
    return null;
  }

  /* ---------- 위기 사건 굴림 (10-8-3 ①) ---------- */
  // 카드를 넘긴 뒤 부른다. 다음 자리에 끼워 넣을 카드 id(없으면 null)
  C.pick = function (run, rnd, prevZones) {
    const zones = run.zones || C.zones(run.vals);
    // 쿨다운 줄이기
    for (const key in run.cooldown || {}) if (--run.cooldown[key] <= 0) delete run.cooldown[key];
    // 1) 후속 위기가 기한이 되었으면 반드시
    if (run.followups && run.followups.length) {
      const due = run.followups.find((f) => f.at <= run.pos);
      if (due) {
        run.followups = run.followups.filter((f) => f !== due);
        const fc = era.data.cards.find((x) => x.id === due.card);
        if (fc) {
          run.followStep = Object.assign({}, run.followStep, { [due.gauge]: due.step });
          return fc.id;
        }
      }
    }
    // 2) 예고
    const fw = pickForewarn(run, zones, prevZones || {});
    if (fw) return fw;
    // 3) 위기 사건: 쉬는 장수
    if ((run.crisisRest || 0) > 0) {
      run.crisisRest--;
      return null;
    }
    // 가장 끝에 가까운 게이지 하나(쿨다운 중인 종류는 건너뜀)
    let best = null;
    for (const k in zones) {
      const z = zones[k];
      if (z.level === 'stable') continue;
      if ((run.cooldown || {})[k + ':' + z.side]) continue;
      if (!best || z.d < best.z.d) best = { k, z };
    }
    if (!best) return null;
    const ch = cfg().chance || {};
    const p = Math.min(ch.cap || 0.95, (ch[best.z.level] || 0) * (JK.Game.diff().crisisMult || 1));
    if (rnd() >= p) return null;
    const card = era.data.cards.find((x) => x.kind === 'crisis' && x.level === 'event' && x.gauge === best.k && x.side === best.z.side && x.stages.includes(run.stage));
    if (!card) return null;
    // 쉬는 장수: 끝 구간에서는 1
    const rest = cfg().rest || {};
    run.crisisRest = best.z.level === 'end' ? rest.end || 1 : byDiff(rest, 3);
    return card.id;
  };

  /* ---------- 실각 확률 (10-8-3 ②③) ---------- */
  // card: 위기·후속 카드, sideKey: 'right'(강한 대응) | 'left'(가벼운 대응), vals: 고르기 전 게이지
  C.fallChance = function (card, sideKey, vals) {
    const F = cfg().fall || {};
    const z = C.zoneOf(vals[card.gauge]);
    const base = (F.base || {})[z.level] || 0;
    const side = card.choices[sideKey];
    const strong = sideKey === (card.strong || 'right');
    // 대응에 쓰는 게이지(문제 게이지가 아닌, 깎이는 게이지)가 이미 위험 이하이면 대응이 약해진다
    let weak = false;
    for (const k in side.effects || {}) if (k !== card.gauge && side.effects[k] < 0 && RANK[C.zoneOf(vals[k]).level] >= 2) weak = true;
    const R = F.response || { strong: 0.5, light: 0.75, weakStrong: 0.75, weakLight: 1.0 };
    const mult = strong ? (weak ? R.weakStrong : R.strong) : weak ? R.weakLight : R.light;
    const dm = byDiff(F.diff, 1);
    const step = card.level === 'followup' ? card.step || 2 : 1;
    const add = (step - 1) * byDiff(F.followAdd, 0.1);
    return { p: Math.min(F.cap || 0.95, base * mult * dm + add), level: z.level, weak, strong };
  };
  // 위기 카드 버튼 아래 보여 줄 말(새싹: 숫자, 보통: 말, 성군·실록: 없음)
  C.chanceLabel = function (p) {
    const mode = byDiff(cfg().showChance, 'words');
    if (mode === 'none') return '';
    if (mode === 'number') return `무너질 확률 ${Math.round(p * 100)}%`;
    const w = cfg().chanceWords || [
      [0.08, '무너질 걱정 낮음'],
      [0.2, '무너질 걱정 조금'],
      [0.4, '무너질 걱정 높음'],
      [1, '무너질 걱정 매우 높음'],
    ];
    for (const [t, s] of w) if (p <= t) return s;
    return w[w.length - 1][1];
  };

  /* ---------- 결과: 수습 또는 실각 (10-8-3 ④⑤) ---------- */
  // 고른 직후(효과 적용 전 게이지 vals0로) 굴린다. 돌려주는 값: { fell, p, level }
  C.resolve = function (run, card, sideKey, vals0, rnd) {
    const r = C.fallChance(card, sideKey, vals0);
    const fell = rnd() < r.p;
    const rec = { card: card.id, name: card.name || card.who.name, gauge: card.gauge, side: card.side, value: vals0[card.gauge], choice: card.choices[sideKey].label, p: r.p, level: r.level, stage: run.stage };
    run.crisisLog = (run.crisisLog || []).concat(Object.assign({ fell }, rec));
    if (fell) return Object.assign({ fell: true }, rec);
    // 수습: 쿨다운, 손상(위험 이하에서 수습하면), 후속 예약
    run.cooldown = run.cooldown || {};
    run.cooldown[card.gauge + ':' + card.side] = byDiff(cfg().cooldown, 6);
    run.stats.held = (run.stats.held || 0) + 1;
    if (r.level === 'end') run.stats.heldAtEnd = (run.stats.heldAtEnd || 0) + 1;
    if (RANK[r.level] >= 2) damage(run, card);
    return Object.assign({ fell: false }, rec);
  };
  // 효과가 들어간 뒤 부른다: 아직 거리 15 이하이면 후속 위기 예약
  C.afterHeld = function (run, card) {
    const z = C.zoneOf(run.vals[card.gauge]);
    const step = card.level === 'followup' ? (card.step || 2) + 1 : 2;
    const next = era.data.cards.find((x) => x.kind === 'crisis' && x.level === 'followup' && x.gauge === card.gauge && x.side === card.side && x.stages.includes(run.stage));
    if (!next || z.d > (cfg().followupIfAtMost || 15) || step > (cfg().followupMaxStep || 3)) return;
    const within = byDiff((cfg().followup || {}).within, 3);
    run.followups = (run.followups || []).filter((f) => f.gauge !== card.gauge).concat({ gauge: card.gauge, side: card.side, card: next.id, at: run.pos + within, step });
  };
  function damage(run, card) {
    let targets = (card.damage && card.damage.targets) || [];
    targets = targets.filter((k) => run.built.includes(k) && !(run.damaged || {})[k]);
    if (!targets.length) {
      const named = run.built.filter((k) => era.map.buildings[k] && era.map.buildings[k].kind === 'single' && era.map.buildings[k].name && !(run.damaged || {})[k]);
      if (!named.length) return;
      targets = [named[Math.floor(Math.random() * named.length)]];
    }
    const target = targets[0];
    run.damaged = run.damaged || {};
    run.damaged[target] = card.id;
    setTimeout(() => W.setBuildState(target, 'damaged', 0), 1200);
  }
})();
