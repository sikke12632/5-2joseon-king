/* eras/joseon/models-seonjo.js — 선조·인조 스테이지에 서는 것 (설계서 2-3, 7-1 연출표)
 * 경복궁 터(불탄 뒤 주춧돌과 기단만 — 고종 때까지 남음) · 종묘 터 · 남한산성(산 위 돌성벽과 문, 눈) · 삼전도비(거북 받침 비석)
 * 전쟁 연출은 연기·불빛·배만(설계서 2-3). 사람이 쓰러지는 모습·불타는 사람은 만들지 않는다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const col = JK.col;
  const M = JK.eraModels;
  const { platform, C } = JK.kit;

  const ASH = col('#6e6a64');
  const ASH_D = col('#4e4a46');
  const GRASS = col('#8fae6a');
  const SNOW = col('#f4f6fa');

  // 기단 위 주춧돌 줄: nx × nz 칸, 칸 간격 sx·sz
  function pillarStones(b, nx, nz, sx, sz, y) {
    for (let i = 0; i < nx; i++)
      for (let j = 0; j < nz; j++) {
        const x = (i - (nx - 1) / 2) * sx,
          z = (j - (nz - 1) / 2) * sz;
        b.cyl(x, y, z, 0.035, 0.03, 0.03, 5, C.stoneDark, { top: C.stone });
      }
  }

  /* ---------- 경복궁 터: 바깥 담 자리 낮은 돌줄 · 근정전 기단과 주춧돌 · 잿빛 흙 · 풀 ---------- */
  M.gyeongbokRuin = function () {
    const b = new JK.Builder();
    const W = 2.3,
      D = 1.85;
    b.ao(0, 0.15, 0.75);
    b.box(0, 0.01, 0, W * 2, 0.02, D * 2, col('#b9b09e'), { noBottom: true });
    // 무너진 담 자리: 군데군데 끊긴 낮은 돌줄
    const wall = (x0, z0, x1, z1) => {
      const n = 9;
      for (let i = 0; i < n; i++) {
        if (i % 3 === 1) continue;
        const u0 = i / n,
          u1 = (i + 0.8) / n;
        const ax = x0 + (x1 - x0) * u0,
          az = z0 + (z1 - z0) * u0,
          bx = x0 + (x1 - x0) * u1,
          bz = z0 + (z1 - z0) * u1;
        b.box((ax + bx) / 2, 0.04, (az + bz) / 2, Math.abs(bx - ax) + 0.06, 0.08, Math.abs(bz - az) + 0.06, ASH, { top: C.stoneDark, noBottom: true });
      }
    };
    wall(-W, D, W, D);
    wall(-W, -D, W, -D);
    wall(-W, -D, -W, D);
    wall(W, -D, W, D);
    // 근정전 자리: 두 단 기단 + 주춧돌
    b.push().t(0, 0, -0.35);
    platform(b, 1.3, 0.8, 0.07, { color: C.stoneDark, top: col('#c9c0ac') });
    b.push().t(0, 0.07, 0);
    platform(b, 0.95, 0.55, 0.06, { color: C.stoneDark, top: col('#c9c0ac') });
    pillarStones(b, 6, 3, 0.16, 0.18, 0.06);
    b.pop();
    b.pop();
    // 다른 전각 자리: 낮은 기단과 주춧돌
    for (const [x, z, nx, nz] of [[-1.3, 0.9, 3, 2], [1.3, 0.9, 3, 2], [0, 1.25, 4, 2], [-1.4, -1.2, 3, 2], [1.4, -1.2, 3, 2]]) {
      b.push().t(x, 0, z);
      platform(b, nx * 0.17 + 0.1, nz * 0.17 + 0.1, 0.04, { color: C.stoneDark, top: col('#c4baa6') });
      pillarStones(b, nx, nz, 0.17, 0.17, 0.04);
      b.pop();
    }
    // 잿빛 흙과 풀 무더기(불탄 뒤 오래 비어 있음)
    const rnd = JK.rng(392);
    for (let i = 0; i < 26; i++) {
      const x = (rnd() - 0.5) * W * 1.8,
        z = (rnd() - 0.5) * D * 1.8;
      b.ball(x, 0.02, z, 0.05 + rnd() * 0.05, 0, rnd() < 0.35 ? ASH_D : GRASS, 0.45);
    }
    return b.build();
  };

  /* ---------- 종묘 터: 긴 기단과 주춧돌 한 줄 ---------- */
  M.jongmyoRuin = function () {
    const b = new JK.Builder();
    b.ao(0, 0.12, 0.75);
    b.box(0, 0.01, 0, 3.2, 0.02, 2.0, col('#b9b09e'), { noBottom: true });
    b.push().t(0, 0, -0.15);
    platform(b, 2.6, 0.6, 0.08, { color: C.stoneDark, top: col('#c9c0ac') });
    pillarStones(b, 11, 2, 0.23, 0.32, 0.08);
    b.pop();
    const rnd = JK.rng(1592);
    for (let i = 0; i < 12; i++) b.ball((rnd() - 0.5) * 2.8, 0.02, 0.45 + rnd() * 0.4, 0.05 + rnd() * 0.04, 0, rnd() < 0.4 ? ASH_D : GRASS, 0.45);
    return b.build();
  };

  /* ---------- 남한산성: 산마루를 두른 돌성벽 + 문 하나 + 눈 ---------- */
  M.namhansan = function () {
    const b = new JK.Builder();
    const R = 0.75;
    const n = 14;
    b.ao(0, 0.3, 0.72);
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2,
        a1 = ((i + 1) / n) * Math.PI * 2;
      if (i === 3) continue; // 문 자리
      const x0 = Math.cos(a0) * R,
        z0 = Math.sin(a0) * R * 0.8,
        x1 = Math.cos(a1) * R,
        z1 = Math.sin(a1) * R * 0.8;
      const h = 0.16 + Math.sin(i * 1.7) * 0.03;
      b.push().t((x0 + x1) / 2, 0, (z0 + z1) / 2).ry(-Math.atan2(z1 - z0, x1 - x0));
      const len = Math.hypot(x1 - x0, z1 - z0) + 0.02;
      b.box(0, h / 2, 0, len, h, 0.07, C.stone, { top: SNOW, noBottom: true });
      // 성가퀴(톱니)
      for (let k = 0; k < 3; k++) b.box(-len / 2 + (k + 0.5) * (len / 3), h + 0.025, 0, len / 3 - 0.03, 0.05, 0.07, C.stoneDark, { top: SNOW });
      b.pop();
    }
    // 문(홍예 + 작은 문루)
    const ga = (3.5 / n) * Math.PI * 2;
    b.push().t(Math.cos(ga) * R, 0, Math.sin(ga) * R * 0.8).ry(-ga - Math.PI / 2);
    b.box(0, 0.11, 0, 0.26, 0.22, 0.12, C.stone, { top: SNOW, noBottom: true });
    b.box(0, 0.07, 0.061, 0.1, 0.14, 0.005, C.arch);
    b.box(0, 0.27, 0, 0.3, 0.06, 0.16, C.tile, { top: SNOW });
    b.pop();
    // 성 안 눈 덮인 땅과 깃발
    b.ao(0, 0, 1);
    b.cyl(0, 0, 0, R * 0.92, R * 0.9, 0.02, 12, SNOW, { top: SNOW });
    b.cyl(0.12, 0, -0.05, 0.008, 0.006, 0.42, 4, C.woodDark);
    b.box(0.17, 0.37, -0.05, 0.1, 0.07, 0.006, col('#b23b30'));
    return b.build();
  };

  /* ---------- 삼전도비: 거북 받침 + 비석 + 머릿돌 ---------- */
  M.samjeondo = function () {
    const b = new JK.Builder();
    const st = col('#5a5e62'),
      st2 = col('#6c7074');
    b.ao(0, 0.3, 0.72);
    b.box(0, 0.02, 0, 0.34, 0.04, 0.44, C.stoneDark, { top: C.stone, noBottom: true });
    // 거북 받침(등은 납작한 구, 머리·발)
    b.push().t(0, 0.04, 0).s(1, 0.55, 1.35);
    b.ball(0, 0.04, 0, 0.13, 1, st2);
    b.pop();
    b.box(0, 0.08, 0.2, 0.06, 0.05, 0.08, st2);
    for (const [x, z] of [[0.1, 0.12], [-0.1, 0.12], [0.1, -0.12], [-0.1, -0.12]]) b.box(x, 0.04, z, 0.05, 0.04, 0.05, st2);
    // 비석과 머릿돌
    b.box(0, 0.32, 0, 0.16, 0.42, 0.045, st, { top: st2 });
    b.box(0, 0.56, 0, 0.2, 0.08, 0.06, st2);
    return b.build();
  };
})();
