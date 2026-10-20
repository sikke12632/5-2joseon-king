/* eras/joseon/models-taejo.js — 태조 스테이지에 새로 서는 것 (설계서 7-1 연출표)
 * 사직단(네모난 제단, 지붕 건물 아님) · 돈의문 · 숙정문(북쪽 산속, 늘 닫힌 문) · 성균관(강당 + 기숙사 두 줄)
 * 생활 건물: 서당(작은 초가) · 향교(성균관을 작게) · 서원(산자락) · 돌다리 · 저수지 · 학당
 * 모양이 확실하지 않은 세부는 넣지 않는다(연출표 "하지 말 것").
 */
(function () {
  'use strict';
  const JK = window.JK;
  const col = JK.col;
  const M = JK.eraModels;
  const { roof, hall, platform, archFace, C } = JK.kit;

  // 낮은 담(기와 얹은 흙담) 한 줄
  function wallLine(b, x0, z0, x1, z1, h, color) {
    const len = Math.hypot(x1 - x0, z1 - z0);
    b.push().t((x0 + x1) / 2, 0, (z0 + z1) / 2).ry(-Math.atan2(z1 - z0, x1 - x0));
    b.box(0, h / 2, 0, len, h, 0.08, color || C.wallRed, { noBottom: true });
    b.push().t(0, h, 0);
    roof(b, { type: 'gable', w: len / 2, d: 0.07, h: 0.04, nu: Math.max(2, Math.round(len * 3)), nv: 1, dens: 14, soffit: false, ridgeW: 0.015, color: C.tileHouse, ridgeColor: C.ridgeDark, gableColor: color || C.wallRed });
    b.pop();
    b.pop();
  }
  // 네모 담: 앞(+z) 가운데를 gap 만큼 비운다
  function wallRect(b, W, D, h, gap, color) {
    wallLine(b, -W, D, -gap, D, h, color);
    wallLine(b, gap, D, W, D, h, color);
    wallLine(b, W, D, W, -D, h, color);
    wallLine(b, W, -D, -W, -D, h, color);
    wallLine(b, -W, -D, -W, D, h, color);
  }
  // 홍살문: 붉은 기둥 둘 + 가로대 + 위로 솟은 살
  function hongsal(b, x, z, rot, w) {
    const red = col('#b23a2e');
    b.push().t(x, 0, z).ry(rot || 0);
    b.cyl(-w / 2, 0, 0, 0.022, 0.02, 0.42, 6, red);
    b.cyl(w / 2, 0, 0, 0.022, 0.02, 0.42, 6, red);
    b.box(0, 0.36, 0, w + 0.04, 0.03, 0.03, red);
    b.box(0, 0.3, 0, w, 0.02, 0.02, red);
    const n = 7;
    for (let i = 0; i < n; i++) b.box(-w / 2 + (w * (i + 0.5)) / n, 0.42, 0, 0.012, 0.12, 0.012, red);
    b.pop();
  }

  /* ---------- 사직단: 담 안의 네모난 제단 둘(사단·직단) ---------- */
  M.sajik = function () {
    const b = new JK.Builder();
    b.ao(0, 0.25, 0.72);
    b.box(0, 0.01, 0, 1.7, 0.02, 1.4, C.stoneWarm, { noBottom: true });
    wallRect(b, 0.9, 0.75, 0.16, 0.18, col('#c79a6b'));
    for (const sx of [-0.33, 0.33]) {
      b.push().t(sx, 0, -0.05);
      platform(b, 0.5, 0.5, 0.06, { color: C.stone, top: col('#d9cba7') });
      platform(b, 0.36, 0.36, 0.11, { color: C.stone, top: col('#d9cba7') });
      // 네 방향 계단
      for (const [dx, dz] of [[0, 0.27], [0, -0.27], [0.27, 0], [-0.27, 0]]) b.box(dx, 0.03, dz, dx ? 0.06 : 0.12, 0.06, dz ? 0.06 : 0.12, C.stoneDark, { top: C.stone });
      b.pop();
    }
    hongsal(b, 0, 0.75, 0, 0.32);
    return b.build();
  };

  /* ---------- 돈의문: 석축 홍예 + 단층 우진각 문루 ---------- */
  function gateSingle(b, s, closed) {
    const bw = 0.55 * s,
      bh = 0.38 * s,
      bd = 0.3 * s;
    b.ao(0, bh * 0.9, 0.7);
    b.box(0, bh / 2, 0, bw * 2, bh, bd * 2, C.stone, { top: C.stoneWarm, noBottom: true });
    for (let k = 1; k < 4; k++) {
      b.box(0, (bh * k) / 4, bd + 0.002, bw * 2, 0.006 * s, 0.003, C.stoneDark);
      b.box(0, (bh * k) / 4, -bd - 0.002, bw * 2, 0.006 * s, 0.003, C.stoneDark);
    }
    archFace(b, 0, 0, bd + 0.004, 0.28 * s, 0.29 * s, 1);
    archFace(b, 0, 0, -bd - 0.004, 0.28 * s, 0.29 * s, -1);
    archFace(b, 0, 0, bd - (closed ? 0.004 : 0.03) * s, 0.25 * s, 0.27 * s, 1, C.gateDoor);
    b.ao(0, 0, 1);
    b.push().t(0, bh, 0);
    const top = hall(b, { bw: 0.4 * s, bd: 0.18 * s, h: 0.18 * s, nx: 3, nz: 2, backPanels: true });
    b.push().t(0, top, 0);
    roof(b, { type: 'hip', w: 0.56 * s, d: 0.32 * s, h: 0.24 * s, r: 0.28 * s, lift: 0.09 * s, out: 0.05 * s, nu: 10, nv: 5, dens: 30 / s, bw: 0.44 * s, bd: 0.21 * s, chwidu: true, japsang: 3 });
    b.pop();
    b.pop();
  }
  M.donui = function () {
    const b = new JK.Builder();
    gateSingle(b, 0.92, false);
    return b.build();
  };
  M.sukjeong = function () {
    const b = new JK.Builder();
    gateSingle(b, 0.78, true);
    return b.build();
  };

  /* ---------- 성균관: 강당(명륜당) + 동재·서재(기숙사 두 줄) ---------- */
  function lectureHall(b, s, glow) {
    b.ao(0, 0.2 * s, 0.72);
    platform(b, 1.0 * s, 0.5 * s, 0.07 * s, { steps: true });
    b.push().t(0, 0.07 * s, 0);
    const t = hall(b, { bw: 0.42 * s, bd: 0.17 * s, h: 0.2 * s, nx: 5, nz: 2, glow, wall: C.door, colR: 0.02 * s });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.58 * s, d: 0.3 * s, h: 0.24 * s, r: 0.32 * s, lift: 0.08 * s, out: 0.04 * s, nu: 10, nv: 4, dens: 30 / s, bw: 0.44 * s, bd: 0.19 * s, v1: 0.55 });
    b.pop();
    b.pop();
  }
  function dormRow(b, len, s) {
    b.ao(0, 0.15 * s, 0.72);
    platform(b, len + 0.1 * s, 0.32 * s, 0.05 * s);
    b.push().t(0, 0.05 * s, 0);
    const t = hall(b, { bw: len / 2, bd: 0.11 * s, h: 0.15 * s, nx: Math.max(3, Math.round(len / (0.22 * s))), nz: 1, glow: true, wall: C.wallWhite, colColor: C.woodDark, colR: 0.016 * s, paper: C.paper });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'gable', w: len / 2 + 0.06 * s, d: 0.2 * s, h: 0.13 * s, nu: Math.round(len * 6), nv: 2, dens: 30 / s, bw: len / 2, bd: 0.12 * s, ridgeW: 0.02 * s, color: C.tileHouse, ridgeColor: C.ridgeDark, soffitColor: C.wood, gableColor: C.wallWhite });
    b.pop();
    b.pop();
  }
  M.seonggyun = function () {
    const b = new JK.Builder();
    const W = 0.95,
      D = 0.72;
    b.box(0, 0.01, 0, W * 2, 0.02, D * 2, C.stoneWarm, { noBottom: true });
    b.ao(0, 0.25, 0.72);
    wallRect(b, W, D, 0.18, 0.16);
    b.push().t(0, 0, -0.35);
    lectureHall(b, 1.0, true);
    b.pop();
    b.push().t(-0.62, 0, 0.2).ry(Math.PI / 2);
    dormRow(b, 0.9, 1.0);
    b.pop();
    b.push().t(0.62, 0, 0.2).ry(-Math.PI / 2);
    dormRow(b, 0.9, 1.0);
    b.pop();
    // 정문(작은 솟을대문)
    b.push().t(0, 0, D);
    b.box(0, 0.12, 0, 0.3, 0.24, 0.08, C.door, { noBottom: true });
    b.push().t(0, 0.24, 0);
    roof(b, { type: 'gable', w: 0.2, d: 0.1, h: 0.07, nu: 3, nv: 2, dens: 30, soffit: false, ridgeW: 0.018 });
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 향교: 성균관을 작게 줄인 모양 ---------- */
  M.hyanggyo = function () {
    const b = new JK.Builder();
    b.box(0, 0.01, 0, 1.2, 0.02, 1.0, C.stoneWarm, { noBottom: true });
    b.ao(0, 0.22, 0.72);
    wallRect(b, 0.6, 0.5, 0.15, 0.12);
    b.push().t(0, 0, -0.2);
    lectureHall(b, 0.68, true);
    b.pop();
    b.push().t(-0.38, 0, 0.18).ry(Math.PI / 2);
    dormRow(b, 0.42, 0.75);
    b.pop();
    b.push().t(0.38, 0, 0.18).ry(-Math.PI / 2);
    dormRow(b, 0.42, 0.75);
    b.pop();
    hongsal(b, 0, 0.5, 0, 0.22);
    return b.build();
  };

  /* ---------- 서원: 산자락의 강당 + 누각 문 ---------- */
  M.seowon = function () {
    const b = new JK.Builder();
    b.ao(0, 0.25, 0.72);
    b.box(0, 0.04, -0.2, 1.1, 0.08, 0.7, C.stoneDark, { top: C.stoneWarm, noBottom: true });
    b.push().t(0, 0.08, -0.25);
    lectureHall(b, 0.72, true);
    b.pop();
    wallRect(b, 0.58, 0.48, 0.14, 0.14, col('#c79a6b'));
    // 누각 문
    b.push().t(0, 0, 0.48);
    for (const x of [-0.14, 0.14]) for (const z of [-0.07, 0.07]) b.cyl(x, 0, z, 0.018, 0.016, 0.22, 6, C.woodDark, { noTop: true });
    b.box(0, 0.23, 0, 0.36, 0.03, 0.2, C.wood);
    b.push().t(0, 0.25, 0);
    const t = hall(b, { bw: 0.16, bd: 0.08, h: 0.1, nx: 3, nz: 1, wall: C.wood, backPanels: true, colR: 0.015 });
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.26, d: 0.16, h: 0.12, r: 0.14, lift: 0.05, out: 0.02, nu: 6, nv: 3, dens: 30, bw: 0.18, bd: 0.09, v1: 0.55 });
    b.pop();
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 서당: 작은 초가(마루가 트인 글방) ---------- */
  M.seodang = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.6);
    b.box(0, 0.025, 0, 0.8, 0.05, 0.48, C.stoneDark, { top: C.stoneWarm, noBottom: true });
    b.box(-0.12, 0.05 + 0.13, -0.05, 0.5, 0.26, 0.32, C.mud, { noBottom: true });
    // 트인 마루
    b.box(0.2, 0.09, 0.02, 0.36, 0.04, 0.4, C.wood);
    for (const x of [-0.37, 0.37]) for (const z of [-0.19, 0.19]) b.cyl(x, 0.05, z, 0.02, 0.02, 0.26, 4, C.wood, { noTop: true });
    b.kind(2);
    b.quad([-0.3, 0.12, 0.111], [-0.14, 0.12, 0.111], [-0.14, 0.24, 0.111], [-0.3, 0.24, 0.111], C.paper);
    b.kind(0);
    // 마루 위 책상 둘
    b.box(0.12, 0.13, 0.05, 0.1, 0.04, 0.07, C.woodDark);
    b.box(0.28, 0.13, -0.05, 0.1, 0.04, 0.07, C.woodDark);
    b.ao(0, 0, 1);
    b.push().t(0, 0.31, 0);
    roof(b, { type: 'hip', w: 0.47, d: 0.3, h: 0.26, r: 0.18, lift: 0.0, ridgeLift: 0.0, convex: true, nu: 4, nv: 3, color: C.straw, tiles: false, thick: 0.05, soffit: false, ridgeColor: C.strawDark, ridgeW: 0.05 });
    b.pop();
    return b.build();
  };

  /* ---------- 학당: 작은 기와 강당 ---------- */
  M.hakdang = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.62);
    b.box(0, 0.035, 0, 0.7, 0.07, 0.4, C.stoneDark, { top: C.stone, noBottom: true });
    b.push().t(0, 0.07, 0);
    const t = hall(b, { bw: 0.28, bd: 0.12, h: 0.18, nx: 3, nz: 1, glow: true, wall: C.wallWhite, colColor: C.woodDark, colR: 0.018 });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.4, d: 0.24, h: 0.2, r: 0.22, lift: 0.05, out: 0.025, nu: 6, nv: 3, dens: 30, v1: 0.55, color: C.tileHouse, ridgeColor: C.ridgeDark, soffitColor: C.wood, bw: 0.3, bd: 0.14 });
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 돌다리: 강을 가로지르는 돌판 다리 (앞뒤 = z) ---------- */
  M.bridge = function () {
    const b = new JK.Builder();
    const L = 1.5,
      w = 0.26;
    b.ao(-0.3, 0.3, 0.7);
    b.box(0, 0.06, 0, w, 0.05, L, C.stone, { top: C.stoneWarm });
    for (const z of [-0.45, 0, 0.45]) b.box(0, -0.12, z, w * 0.8, 0.32, 0.12, C.stoneDark, { top: C.stone });
    for (const x of [-w / 2, w / 2]) b.box(x, 0.11, 0, 0.03, 0.05, L, C.stoneDark);
    return b.build();
  };

  /* ---------- 저수지: 둑에 둘러싸인 물 ---------- */
  M.reservoir = function () {
    const b = new JK.Builder();
    const n = 14,
      R = 0.72;
    const rr = (i) => R * (1 + 0.12 * Math.sin(i * 2.3) + 0.06 * Math.cos(i * 4.1));
    const bank = col('#a98b5f'),
      grass = col('#86b86b');
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2,
        a1 = ((i + 1) / n) * Math.PI * 2;
      const r0 = rr(i),
        r1 = rr(i + 1);
      const p0 = [Math.cos(a0) * r0, 0.0, Math.sin(a0) * r0],
        p1 = [Math.cos(a1) * r1, 0.0, Math.sin(a1) * r1];
      const q0 = [Math.cos(a0) * (r0 + 0.14), 0.07, Math.sin(a0) * (r0 + 0.14)],
        q1 = [Math.cos(a1) * (r1 + 0.14), 0.07, Math.sin(a1) * (r1 + 0.14)];
      const o0 = [Math.cos(a0) * (r0 + 0.3), -0.02, Math.sin(a0) * (r0 + 0.3)],
        o1 = [Math.cos(a1) * (r1 + 0.3), -0.02, Math.sin(a1) * (r1 + 0.3)];
      // 물
      b.kind(4, 0, 0);
      b.tri([0, 0.01, 0], [p1[0], 0.01, p1[2]], [p0[0], 0.01, p0[2]], col('#6cc3d3'), [0, 0, 4], [Math.cos(a1) * 3, Math.sin(a1) * 3, 4], [Math.cos(a0) * 3, Math.sin(a0) * 3, 4]);
      b.kind(0);
      // 둑 안쪽·바깥쪽
      b.quad(p0, p1, q1, q0, bank);
      b.quad(q0, q1, o1, o0, grass);
    }
    return b.build();
  };

  /* ---------- 다른 길(설계서 10-10-7) — 이름 없는 장식만. 실제 이름을 붙이지 않는다 ---------- */
  // 작은 기와 궁궐: 옛 집을 고쳐 씀(T05) · 개경에 머묾(T04)
  M.altPalace = function () {
    const b = new JK.Builder();
    const W = 1.15,
      D = 0.85;
    b.box(0, 0.01, 0, W * 2, 0.02, D * 2, C.stoneWarm, { noBottom: true });
    b.ao(0, 0.25, 0.72);
    wallRect(b, W, D, 0.18, 0.2);
    b.push().t(0, 0, -0.2);
    lectureHall(b, 1.25, true);
    b.pop();
    b.push().t(-0.72, 0, 0.32).ry(Math.PI / 2);
    dormRow(b, 0.6, 0.9);
    b.pop();
    // 정문
    b.push().t(0, 0, D);
    b.box(0, 0.13, 0, 0.36, 0.26, 0.09, C.door, { noBottom: true });
    b.push().t(0, 0.26, 0);
    roof(b, { type: 'gable', w: 0.24, d: 0.11, h: 0.08, nu: 3, nv: 2, dens: 30, soffit: false, ridgeW: 0.018 });
    b.pop();
    b.pop();
    return b.build();
  };
  // 큰 절: 법당 + 돌탑 (불교와 함께 다스린다, T02)
  M.altTemple = function () {
    const b = new JK.Builder();
    b.ao(0, 0.25, 0.72);
    b.box(0, 0.01, 0, 1.2, 0.02, 1.0, C.stoneWarm, { noBottom: true });
    b.push().t(0, 0, -0.18);
    platform(b, 0.9, 0.46, 0.08, { steps: true });
    b.push().t(0, 0.08, 0);
    const t = hall(b, { bw: 0.36, bd: 0.17, h: 0.22, nx: 3, nz: 2, glow: true, wall: C.door, colR: 0.02 });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.52, d: 0.3, h: 0.26, r: 0.3, lift: 0.09, out: 0.04, nu: 10, nv: 4, dens: 30, bw: 0.38, bd: 0.19, v1: 0.55 });
    b.pop();
    b.pop();
    b.pop();
    // 돌탑(층마다 지붕돌)
    b.push().t(0, 0, 0.3);
    b.box(0, 0.04, 0, 0.18, 0.08, 0.18, C.stoneDark, { top: C.stone, noBottom: true });
    let y = 0.08;
    for (let i = 0; i < 5; i++) {
      const s = 0.1 - i * 0.012;
      b.box(0, y + 0.03, 0, s, 0.06, s, C.stone, { noBottom: true });
      b.box(0, y + 0.07, 0, s * 1.55, 0.018, s * 1.55, C.stoneDark, { top: C.stone });
      y += 0.08;
    }
    b.cyl(0, y, 0, 0.012, 0.006, 0.08, 5, C.stoneDark);
    b.pop();
    return b.build();
  };
  // 고을 향교 여럿(고을 향교부터 세운다, T08): 향교를 조금 작게
  M.altHyanggyo = function () {
    const b = new JK.Builder();
    b.push().s(0.62, 0.62, 0.62);
    b.box(0, 0.01, 0, 1.2, 0.02, 1.0, C.stoneWarm, { noBottom: true });
    b.ao(0, 0.22, 0.72);
    wallRect(b, 0.6, 0.5, 0.15, 0.12);
    b.push().t(0, 0, -0.2);
    lectureHall(b, 0.68, true);
    b.pop();
    hongsal(b, 0, 0.5, 0, 0.22);
    b.pop();
    return b.build();
  };
})();
