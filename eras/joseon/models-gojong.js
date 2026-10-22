/* eras/joseon/models-gojong.js — 고종 스테이지에 서는 것 (설계서 2-5·3-5 연출)
 * 척화비(길목마다 작은 비석) · 개항장 부두(나무 부두 + 창고) · 우정총국(한옥 관청) · 독립문(돌 아치) · 환구단(둥근 3단 단 + 지붕)
 * · 병원(한옥 + 깃발) · 학교(벽돌 2층) · 전등(궁궐 연못가 등 기둥) · 전봇대(줄지은 기둥) · 전차(차량 + 선로) · 경인선(선로 + 기관차)
 * 실제 건물 모양을 그대로 따르지 않은 그림이다(CREDITS.md). 삼각형을 아낀다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const col = JK.col;
  const M = JK.eraModels;
  const { roof, hall, platform, C } = JK.kit;

  const BRICK = col('#a8644a');
  const BRICK_D = col('#8a4e3a');
  const IRON = col('#3a3f46');
  const RAIL = col('#6a6e74');
  const GLOW = col('#ffe08a');
  const PLANK = col('#9a7048');

  /* ---------- 척화비: 받침돌 + 비석(작게) ---------- */
  M.cheokhwa = function () {
    const b = new JK.Builder();
    b.push().s(1.5, 1.5, 1.5);
    b.ao(0, 0.2, 0.72);
    b.box(0, 0.02, 0, 0.16, 0.04, 0.1, C.stoneDark, { top: C.stone, noBottom: true });
    b.box(0, 0.15, 0, 0.1, 0.22, 0.035, C.stone, { top: C.stoneWarm });
    b.box(0, 0.27, 0, 0.12, 0.025, 0.05, C.stoneDark);
    b.pop();
    return b.build();
  };

  /* ---------- 개항장 부두: 물가 나무 부두 + 작은 창고 ---------- */
  M.port = function () {
    const b = new JK.Builder();
    b.ao(0, 0.15, 0.8);
    b.box(0, 0.03, 0.25, 0.22, 0.03, 0.6, PLANK, { noBottom: true });
    for (const z of [0.05, 0.25, 0.45]) for (const x of [-0.1, 0.1]) b.cyl(x, -0.1, z, 0.012, 0.012, 0.14, 4, C.woodDark);
    b.box(0, 0.1, -0.15, 0.3, 0.2, 0.2, BRICK, { top: BRICK_D, noBottom: true });
    b.push().t(0, 0.2, -0.15);
    roof(b, { type: 'gable', w: 0.2, d: 0.13, h: 0.07, lift: 0, out: 0.015, nu: 4, nv: 2, dens: 40, bw: 0.16, bd: 0.11, color: IRON, tiles: false });
    b.pop();
    return b.build();
  };

  /* ---------- 우정총국: 기단 위 한옥 관청 + 깃대 ---------- */
  M.ujeong = function () {
    const b = new JK.Builder();
    b.push().s(1.6, 1.6, 1.6);
    b.ao(0, 0.2, 0.72);
    platform(b, 0.28, 0.18, 0.03);
    b.push().t(0, 0.03, 0);
    const t = hall(b, { bw: 0.2, bd: 0.1, h: 0.12, nx: 5, nz: 2, colR: 0.01 });
    b.push().t(0, t, 0);
    roof(b, { type: 'paljak', w: 0.28, d: 0.17, h: 0.11, r: 0.14, lift: 0.03, out: 0.02, nu: 6, nv: 3, dens: 34, bw: 0.21, bd: 0.11, v1: 0.55 });
    b.pop();
    b.pop();
    b.cyl(0.25, 0, 0.12, 0.005, 0.005, 0.36, 4, C.woodDark);
    b.box(0.29, 0.32, 0.12, 0.08, 0.05, 0.004, col('#2f5f8c'));
    b.pop();
    return b.build();
  };

  /* ---------- 독립문: 돌을 쌓은 아치 문 ---------- */
  M.dongnipmun = function () {
    const b = new JK.Builder();
    b.push().s(1.5, 1.5, 1.5);
    b.ao(0, 0.3, 0.72);
    b.box(-0.13, 0.15, 0, 0.1, 0.3, 0.12, C.stone, { top: C.stoneWarm, noBottom: true });
    b.box(0.13, 0.15, 0, 0.1, 0.3, 0.12, C.stone, { top: C.stoneWarm, noBottom: true });
    b.box(0, 0.33, 0, 0.36, 0.08, 0.12, C.stone, { top: C.stoneWarm });
    b.box(0, 0.385, 0, 0.38, 0.025, 0.14, C.stoneDark);
    b.box(0, 0.27, 0.061, 0.16, 0.05, 0.004, C.stoneDark);
    b.pop();
    return b.build();
  };

  /* ---------- 환구단: 둥근 3단 돌 단 + 작은 둥근 지붕 전각 ---------- */
  M.hwangudan = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.72);
    b.cyl(0, 0, 0, 0.42, 0.44, 0.05, 16, C.stoneDark, { top: C.stone });
    b.cyl(0, 0.05, 0, 0.32, 0.34, 0.05, 16, C.stoneDark, { top: C.stone });
    b.cyl(0, 0.1, 0, 0.22, 0.24, 0.05, 14, C.stoneDark, { top: C.stone });
    b.cyl(0, 0.15, 0, 0.12, 0.12, 0.12, 10, C.column);
    b.cyl(0, 0.27, 0, 0.02, 0.18, 0.09, 10, col('#2f5f6a'));
    b.ball(0, 0.37, 0, 0.025, 0, col('#d8b64e'), 1);
    return b.build();
  };

  /* ---------- 병원: 한옥 + 문 앞 이름 깃발 ---------- */
  M.hospital = function () {
    const b = new JK.Builder();
    b.push().s(1.6, 1.6, 1.6);
    b.ao(0, 0.2, 0.72);
    platform(b, 0.26, 0.16, 0.03);
    b.push().t(0, 0.03, 0);
    const t = hall(b, { bw: 0.19, bd: 0.1, h: 0.12, nx: 4, nz: 2, colR: 0.01, wall: C.wallWhite });
    b.push().t(0, t, 0);
    roof(b, { type: 'hip', w: 0.26, d: 0.16, h: 0.1, r: 0.12, lift: 0.03, out: 0.02, nu: 6, nv: 3, dens: 34, bw: 0.2, bd: 0.11 });
    b.pop();
    b.pop();
    b.cyl(-0.22, 0, 0.14, 0.005, 0.005, 0.3, 4, C.woodDark);
    b.box(-0.18, 0.26, 0.14, 0.07, 0.05, 0.004, col('#f4f4f0'));
    b.box(-0.18, 0.26, 0.143, 0.02, 0.035, 0.002, col('#c0392b'));
    b.pop();
    return b.build();
  };

  /* ---------- 학교: 벽돌 2층 + 창 ---------- */
  M.school = function () {
    const b = new JK.Builder();
    b.push().s(1.6, 1.6, 1.6);
    b.ao(0, 0.3, 0.72);
    b.box(0, 0.13, 0, 0.44, 0.26, 0.2, BRICK, { top: BRICK_D, noBottom: true });
    for (let k = 0; k < 2; k++)
      for (let i = 0; i < 5; i++) b.box(-0.17 + i * 0.085, 0.07 + k * 0.11, 0.101, 0.04, 0.05, 0.003, C.paper);
    b.push().t(0, 0.26, 0);
    roof(b, { type: 'hip', w: 0.25, d: 0.12, h: 0.08, r: 0.13, lift: 0.01, out: 0.015, nu: 5, nv: 2, dens: 40, bw: 0.23, bd: 0.11, color: IRON, tiles: false });
    b.pop();
    // 마당의 공
    b.ball(0.15, 0.02, 0.2, 0.02, 0, col('#f2f2ee'), 1);
    b.pop();
    return b.build();
  };

  /* ---------- 전등: 쇠기둥 위 둥근 등(빛나는 색) ---------- */
  M.lamps = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.8);
    for (const [x, z] of [[-0.3, 0], [0, 0.1], [0.3, 0]]) {
      b.cyl(x, 0, z, 0.008, 0.01, 0.34, 5, IRON);
      b.ball(x, 0.36, z, 0.03, 0, GLOW, 1);
    }
    return b.build();
  };

  /* ---------- 전봇대: 나무 기둥 + 가로대 + 전선 ---------- */
  M.telepole = function () {
    const b = new JK.Builder();
    b.ao(0, 0.3, 0.8);
    const n = 4;
    for (let i = 0; i < n; i++) {
      const x = (i - (n - 1) / 2) * 0.35;
      b.cyl(x, 0, 0, 0.008, 0.01, 0.4, 4, C.woodDark);
      b.box(x, 0.37, 0, 0.012, 0.012, 0.09, C.woodDark);
    }
    b.box(0, 0.37, 0.03, (n - 1) * 0.35, 0.003, 0.003, IRON);
    b.box(0, 0.37, -0.03, (n - 1) * 0.35, 0.003, 0.003, IRON);
    return b.build();
  };

  /* ---------- 전차: 선로 + 상자 차량 + 위 전선 기둥 ---------- */
  M.tram = function () {
    const b = new JK.Builder();
    b.ao(0, 0.2, 0.8);
    b.box(0, 0.006, 0.05, 1.4, 0.012, 0.012, RAIL);
    b.box(0, 0.006, -0.05, 1.4, 0.012, 0.012, RAIL);
    b.push().t(0.1, 0, 0);
    b.box(0, 0.08, 0, 0.3, 0.12, 0.13, col('#c9a85a'), { top: col('#8a3a3a'), noBottom: true });
    for (let i = 0; i < 4; i++) b.box(-0.105 + i * 0.07, 0.1, 0.066, 0.045, 0.04, 0.003, GLOW);
    b.box(0, 0.15, 0, 0.32, 0.02, 0.15, col('#8a3a3a'));
    b.cyl(0, 0.16, 0, 0.004, 0.004, 0.12, 3, IRON);
    b.pop();
    return b.build();
  };

  /* ---------- 경인선: 긴 선로 + 침목 + 기관차와 객차 하나 ---------- */
  M.railway = function () {
    const b = new JK.Builder();
    b.ao(0, 0.2, 0.8);
    const L = 2.6;
    b.box(0, 0.008, 0.045, L, 0.014, 0.012, RAIL);
    b.box(0, 0.008, -0.045, L, 0.014, 0.012, RAIL);
    for (let i = 0; i < 18; i++) b.box(-L / 2 + (i + 0.5) * (L / 18), 0.002, 0, 0.03, 0.006, 0.14, C.woodDark);
    // 기관차: 원통 보일러 + 굴뚝 + 운전칸
    b.push().t(0.3, 0.02, 0);
    b.push().rz(Math.PI / 2);
    b.cyl(0.06, -0.12, 0, 0.05, 0.05, 0.2, 8, IRON);
    b.pop();
    b.cyl(0.07, 0.08, 0, 0.018, 0.022, 0.07, 6, IRON);
    b.box(-0.1, 0.08, 0, 0.1, 0.13, 0.12, IRON, { top: col('#2a2e34') });
    b.pop();
    b.box(0.0, 0.08, 0, 0.26, 0.11, 0.12, col('#6a3a2a'), { top: col('#3a2a20') });
    return b.build();
  };

  /* ---------- 공방(고종 갈래 「문을 끝내 닫은 조선」): 기와 공방 + 굴뚝 + 마당의 톱니바퀴 기계 ---------- */
  M.gongbang = function () {
    const b = new JK.Builder();
    b.push().s(1.5, 1.5, 1.5);
    b.ao(0, 0.2, 0.72);
    b.box(0, 0.08, -0.05, 0.3, 0.16, 0.18, C.wallWhite, { top: C.stoneWarm, noBottom: true });
    b.push().t(0, 0.16, -0.05);
    roof(b, { type: 'gable', w: 0.2, d: 0.13, h: 0.07, lift: 0.02, out: 0.015, nu: 4, nv: 2, dens: 40, bw: 0.16, bd: 0.1, color: C.tileHouse });
    b.pop();
    b.cyl(0.1, 0.12, -0.1, 0.022, 0.026, 0.2, 6, BRICK, { top: BRICK_D });
    // 마당의 기계: 받침 + 큰 톱니바퀴 둘
    b.box(0, 0.03, 0.14, 0.16, 0.06, 0.06, C.woodDark);
    for (const [x, r] of [[-0.04, 0.05], [0.05, 0.035]]) {
      b.push().t(x, 0.06 + r, 0.14).rx(Math.PI / 2);
      b.cyl(0, -0.006, 0, r, r, 0.012, 10, IRON);
      b.pop();
    }
    b.pop();
    return b.build();
  };

  /* ---------- 포대와 봉화(고종 갈래): 돌을 쌓은 낮은 포대 + 위에 불 피운 봉화 ---------- */
  M.podae = function () {
    const b = new JK.Builder();
    b.push().s(1.4, 1.4, 1.4);
    b.ao(0, 0.15, 0.75);
    b.cyl(0, 0, 0, 0.16, 0.19, 0.1, 8, C.stone, { top: C.stoneWarm });
    b.cyl(0, 0.1, 0, 0.05, 0.06, 0.08, 6, C.stoneDark);
    b.ball(0, 0.2, 0, 0.035, 0, col('#ffb050'), 1);
    b.box(0.11, 0.12, 0.05, 0.1, 0.03, 0.03, IRON);
    b.pop();
    return b.build();
  };
})();
