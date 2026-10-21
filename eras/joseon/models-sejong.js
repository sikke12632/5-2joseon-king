/* eras/joseon/models-sejong.js — 세종 스테이지에 새로 서는 것 (설계서 2-2, 7-1·7-2 연출표)
 * 집현전(경복궁 안 일반 전각 — 지금의 수정전 모양을 따라 하지 않음) · 자격루 누각(누각 + 물항아리 + 나무 인형,
 * 세종 때 원본은 남아 있지 않아 '그대로'를 흉내 내지 않음) · 혼천의(겹친 고리)와 관측대 · 앙부일구(가마솥 모양 해시계 + 바늘)
 * · 측우기(원통 그릇 + 받침돌) · 4군 6진 진(목책 + 봉화대 + 깃발 열 개) · 백자 가마(비탈 가마)
 * 모양이 확실하지 않은 세부는 넣지 않는다. 삼각형 예산(보통 화질 20만)이 빠듯하므로 면을 아낀다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const col = JK.col;
  const M = JK.eraModels;
  const { roof, hall, platform, C } = JK.kit;

  const BRONZE = col('#7a6a44');
  const BRONZE_D = col('#5a4c30');
  const BRASS = col('#b8913e');
  const WHITE = col('#f2efe6');
  const BEAM = col('#6b4a30');

  /* ---------- 집현전: 기단 위 다섯 칸 전각, 창마다 등불(학자들이 밤늦게까지) ---------- */
  M.jiphyeon = function () {
    const b = new JK.Builder();
    b.ao(0, 0.2, 0.72);
    platform(b, 0.72, 0.36, 0.05, { steps: true, stepW: 0.16 });
    b.push().t(0, 0.05, 0);
    const t = hall(b, { bw: 0.3, bd: 0.12, h: 0.15, nx: 5, nz: 2, glow: true, colR: 0.014 });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.4, d: 0.21, h: 0.17, r: 0.22, lift: 0.05, out: 0.03, nu: 8, nv: 3, dens: 34, bw: 0.31, bd: 0.13, v1: 0.55 });
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 자격루: 작은 누각 + 계단 위 물항아리(큰 것에서 작은 것으로) + 시각을 알리는 나무 인형과 종 ---------- */
  M.jagyeok = function () {
    const b = new JK.Builder();
    b.ao(0, 0.18, 0.72);
    platform(b, 0.5, 0.42, 0.04);
    // 누각(보루각): 세 칸, 앞이 트인 모양
    b.push().t(0.04, 0.04, -0.06);
    const t = hall(b, { bw: 0.17, bd: 0.11, h: 0.17, nx: 3, nz: 1, glow: false, colR: 0.012, noFrontPanels: true });
    b.ao(0, 0, 1);
    b.push().t(0, t, 0);
    roof(b, { type: 'hip', w: 0.25, d: 0.18, h: 0.13, r: 0.09, lift: 0.04, out: 0.02, nu: 6, nv: 3, dens: 34, bw: 0.18, bd: 0.12 });
    b.pop();
    b.pop();
    // 물항아리 계단(왼쪽 앞): 높은 데서 낮은 데로 물이 흐르는 모습
    b.ao(0.04, 0.2, 0.75);
    const steps = [
      [-0.19, 0.16, 0.055],
      [-0.12, 0.11, 0.045],
      [-0.05, 0.07, 0.036],
    ];
    for (const [x, h, r] of steps) {
      b.box(x, 0.04 + h / 2, 0.13, 0.07, h, 0.08, C.stoneDark, { top: C.stone, noBottom: true });
      b.cyl(x, 0.04 + h, 0.13, r * 0.85, r, r * 1.3, 7, BRONZE, { top: col('#4f7fa0') });
    }
    // 받는 통(긴 원통) + 그 위 나무 인형 + 종
    b.cyl(0.07, 0.04, 0.14, 0.035, 0.035, 0.2, 7, BRONZE_D, { top: BRONZE });
    b.box(0.07, 0.27, 0.14, 0.022, 0.05, 0.02, C.wood);
    b.ball(0.07, 0.31, 0.14, 0.014, 0, C.wood);
    b.ball(0.1, 0.28, 0.14, 0.016, 0, BRASS, 1.2);
    return b.build();
  };

  /* ---------- 혼천의: 돌 관측대 위에 겹친 고리(가로·세로·기운 고리) ---------- */
  function ring(b, r, tilt, axis, seg, w, color) {
    const pts = [];
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    b.push();
    if (axis === 'x') b.rx(tilt);
    else b.rz(tilt);
    for (let i = 0; i < seg; i++) {
      const [x0, z0] = pts[i];
      const [x1, z1] = pts[i + 1];
      b.cylAB([x0, 0, z0], [x1, 0, z1], w, w, 3, color);
    }
    b.pop();
  }
  M.honcheon = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.7);
    // 관측대: 돌을 쌓은 네모 대 + 오르는 계단
    b.box(0, 0.11, 0, 0.36, 0.22, 0.36, C.stone, { top: C.stoneWarm, noBottom: true });
    for (let k = 0; k < 4; k++) b.box(0.13, 0.03 + k * 0.05, 0.25 - k * 0.025, 0.1, 0.05, 0.05, C.stoneDark, { top: C.stone, noBottom: true });
    b.box(0, 0.225, 0, 0.38, 0.012, 0.38, C.stoneDark);
    b.ao(0, 0, 1);
    // 받침 기둥과 네 발
    b.push().t(0, 0.23, 0);
    b.cyl(0, 0, 0, 0.02, 0.014, 0.12, 6, BEAM);
    for (const [x, z] of [[0.06, 0.06], [-0.06, 0.06], [0.06, -0.06], [-0.06, -0.06]]) b.cylAB([0, 0.06, 0], [x, 0, z], 0.006, 0.006, 3, BEAM);
    // 고리들
    b.push().t(0, 0.24, 0);
    ring(b, 0.1, 0, 'x', 14, 0.006, BRASS); // 지평 고리
    ring(b, 0.1, Math.PI / 2, 'x', 14, 0.006, BRASS); // 자오 고리
    ring(b, 0.085, Math.PI / 2 - 0.66, 'z', 12, 0.005, BRONZE); // 기운 고리
    ring(b, 0.085, 0.66, 'x', 12, 0.005, BRONZE);
    b.ball(0, 0, 0, 0.022, 0, col('#3f6f9a'));
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 앙부일구: 돌 받침 위 가마솥 모양 오목 해시계 + 비스듬한 바늘 ---------- */
  M.angbu = function () {
    const b = new JK.Builder();
    b.ao(0, 0.12, 0.75);
    b.box(0, 0.05, 0, 0.13, 0.1, 0.13, C.stoneDark, { top: C.stone, noBottom: true });
    b.ao(0, 0, 1);
    b.push().t(0, 0.1, 0);
    // 네 발
    for (const [x, z] of [[0.045, 0.045], [-0.045, 0.045], [0.045, -0.045], [-0.045, -0.045]]) b.cyl(x, 0, z, 0.008, 0.006, 0.03, 4, BRONZE_D);
    // 솥 모양(안쪽이 보이게 위가 넓은 그릇)
    b.lathe([
      [0.0, 0.03, BRONZE_D],
      [0.04, 0.035, BRONZE_D],
      [0.06, 0.055, BRONZE],
      [0.066, 0.08, BRONZE],
      [0.055, 0.08, BRASS],
      [0.035, 0.06, BRASS],
      [0.0, 0.052, BRASS],
    ], 10);
    // 그림자 바늘(북쪽을 향해 비스듬히)
    b.cylAB([0, 0.055, 0.05], [0, 0.09, -0.04], 0.003, 0.002, 3, col('#2a2522'));
    b.pop();
    return b.build();
  };

  /* ---------- 측우기: 받침돌 + 띠 두른 원통 그릇 ---------- */
  M.cheugu = function () {
    const b = new JK.Builder();
    b.ao(0, 0.12, 0.75);
    b.box(0, 0.04, 0, 0.1, 0.08, 0.1, C.stone, { top: C.stoneWarm, noBottom: true });
    b.ao(0, 0, 1);
    b.cyl(0, 0.08, 0, 0.026, 0.026, 0.1, 8, BRONZE, { top: col('#3f6f9a') });
    for (const y of [0.11, 0.145]) b.cyl(0, y, 0, 0.029, 0.029, 0.008, 8, BRONZE_D, { noTop: true });
    return b.build();
  };

  /* ---------- 4군 6진: 강가 목책 + 봉화대 둘 + 깃발 열 개(4 + 6) ---------- */
  M.jin = function () {
    const b = new JK.Builder();
    const L = 1.15; // 반길이
    const arc = (u) => [u * L, 0, -0.18 * (1 - u * u)];
    b.ao(0, 0.25, 0.7);
    // 목책: 말뚝 + 가로대 두 줄
    const n = 16;
    for (let i = 0; i <= n; i++) {
      const [x, , z] = arc(-1 + (2 * i) / n);
      b.cyl(x, 0, z, 0.018, 0.012, 0.2 + (i % 2) * 0.03, 4, BEAM, { noTop: true });
    }
    for (const y of [0.07, 0.15]) {
      const pts = [];
      for (let i = 0; i <= 8; i++) {
        const p = arc(-1 + i / 4);
        pts.push([p[0], y, p[2] + 0.01]);
      }
      b.bar(pts, 0.014, 0.014, col('#7a5a3a'));
    }
    // 봉화대: 둥글게 쌓은 돌 + 위의 굴뚝 다섯
    for (const u of [-0.8, 0.8]) {
      const [x, , z] = arc(u);
      b.push().t(x, 0, z - 0.32);
      b.cyl(0, 0, 0, 0.16, 0.13, 0.16, 8, C.stoneDark, { top: C.stone });
      for (let k = 0; k < 5; k++) b.cyl(-0.08 + k * 0.04, 0.16, 0, 0.016, 0.014, 0.07, 5, C.stone, { top: col('#3a3430') });
      b.pop();
    }
    // 깃발 열 개: 압록강 쪽 넷(푸른 깃발) · 두만강 쪽 여섯(붉은 깃발) — 4군 6진의 수만 보여 주는 이름 없는 깃발
    b.ao(0, 0, 1);
    for (let i = 0; i < 10; i++) {
      const u = -0.9 + (1.8 * i) / 9;
      const [x, , z] = arc(u);
      const c = i < 4 ? col('#3a5f9a') : col('#b23b30');
      b.cyl(x, 0, z - 0.1, 0.008, 0.006, 0.38, 4, C.woodDark);
      b.box(x + 0.045, 0.33, z - 0.1, 0.08, 0.06, 0.006, c);
    }
    return b.build();
  };

  /* ---------- 백자 가마: 비탈을 따라 오르는 칸 가마 + 굴뚝 + 흰 항아리 몇 개 ---------- */
  M.kiln = function () {
    const b = new JK.Builder();
    b.ao(0, 0.2, 0.7);
    const mud = col('#b98a5e');
    const mudD = col('#8e6440');
    for (let k = 0; k < 4; k++) {
      const x = -0.3 + k * 0.17;
      const y = k * 0.05;
      b.box(x, y / 2, 0, 0.17, y + 0.02, 0.2, mudD, { noBottom: true });
      b.ball(x, y + 0.01, 0, 0.11, 1, mud, 0.65);
      b.box(x - 0.02, y + 0.04, 0.1, 0.035, 0.05, 0.01, col('#2a2420'));
    }
    b.cyl(0.38, 0.12, 0, 0.04, 0.03, 0.18, 6, mudD, { top: col('#2a2420') });
    // 구운 백자 항아리
    b.ao(0, 0, 1);
    for (const [x, z, s] of [[-0.42, 0.22, 1], [-0.32, 0.27, 0.8], [-0.2, 0.24, 0.9]]) {
      b.push().t(x, 0, z).s(s);
      b.lathe([
        [0.0, 0.0, WHITE],
        [0.03, 0.0, WHITE],
        [0.05, 0.05, WHITE],
        [0.045, 0.085, WHITE],
        [0.025, 0.1, WHITE],
        [0.0, 0.1, WHITE],
      ], 8);
      b.pop();
    }
    return b.build();
  };
})();
