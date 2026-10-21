/* eras/joseon/models-yeongjo.js — 영조·정조 스테이지에 서는 것 (설계서 2-4 세워지는 것 · 3-4 연출)
 * 탕평비(성균관 앞, 지붕돌 얹은 비석) · 규장각(궁궐 숲속 2층 누각, 창마다 책장) · 큰길 좌판(신해통공) · 수원 화성(성벽 고리 + 장안문 + 공심돈)
 * · 거중기(나무틀 + 도르래 + 들린 돌) · 한강 배다리(배를 나란히 잇고 널빤지) · 장시 천막 · 세책점(책 묶음을 매단 가게) · 탈놀이 마당 · 벽돌집(박지원)
 * 실제 건물의 칸 수·모양을 그대로 따르지 않은 그림이다(CREDITS.md). 삼각형을 아낀다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const col = JK.col;
  const M = JK.eraModels;
  const { roof, hall, platform, C } = JK.kit;

  const CLOTH = [col('#e9dfc6'), col('#d9c49a'), col('#c9a07a'), col('#b8c8d8')];
  const BRICK = col('#a8644a');
  const BRICK_D = col('#8a4e3a');
  const PLANK = col('#9a7048');
  const BOOK = [col('#3f5a8a'), col('#8a3a3a'), col('#c9a85a'), col('#4f7a5a')];

  /* ---------- 탕평비: 받침돌 + 비석 + 지붕돌(성균관 앞) ---------- */
  M.tangpyeong = function () {
    const b = new JK.Builder();
    b.push().s(1.5, 1.5, 1.5); // 마을 집 크기에 맞춤
    b.ao(0, 0.25, 0.72);
    b.box(0, 0.025, 0, 0.26, 0.05, 0.16, C.stoneDark, { top: C.stone, noBottom: true });
    b.box(0, 0.22, 0, 0.15, 0.34, 0.045, C.stone, { top: C.stoneWarm });
    // 지붕돌(작은 기와 지붕 모양)
    b.push().t(0, 0.39, 0);
    roof(b, { type: 'hip', w: 0.13, d: 0.06, h: 0.05, r: 0.07, lift: 0.01, out: 0.01, nu: 4, nv: 2, dens: 40, bw: 0.09, bd: 0.04, color: C.stoneDark, tiles: false });
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 규장각: 높은 기단 위 2층 누각, 아래층 창마다 책장 ---------- */
  M.gyujang = function () {
    const b = new JK.Builder();
    b.ao(0, 0.25, 0.72);
    platform(b, 0.42, 0.3, 0.06, { steps: true, stepW: 0.12 });
    b.push().t(0, 0.06, 0);
    const t1 = hall(b, { bw: 0.3, bd: 0.18, h: 0.15, nx: 5, nz: 3, glow: true, colR: 0.013 });
    // 책장(아래층 앞 칸 안쪽)
    for (let i = 0; i < 5; i++) b.box(-0.24 + i * 0.12, 0.07, 0.15, 0.08, 0.1, 0.012, BOOK[i % 4]);
    // 2층(조금 작게) + 지붕
    b.push().t(0, t1, 0);
    b.box(0, 0.012, 0, 0.66, 0.024, 0.42, C.wood, { noBottom: true });
    b.push().t(0, 0.024, 0);
    const t2 = hall(b, { bw: 0.24, bd: 0.14, h: 0.12, nx: 5, nz: 3, glow: true, colR: 0.011 });
    b.ao(0, 0, 1);
    b.push().t(0, t2, 0);
    roof(b, { type: 'paljak', w: 0.34, d: 0.24, h: 0.15, r: 0.16, lift: 0.05, out: 0.03, nu: 8, nv: 3, dens: 34, bw: 0.25, bd: 0.15, v1: 0.55 });
    b.pop();
    b.pop();
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 좌판 한 칸: 낮은 평상 + 물건 더미 + 차양 ---------- */
  M.jwapan = function () {
    const b = new JK.Builder();
    b.push().s(1.4, 1.4, 1.4); // 마을 집 크기에 맞춤
    b.ao(0, 0.12, 0.75);
    b.box(0, 0.035, 0, 0.26, 0.03, 0.16, PLANK, { noBottom: true });
    for (const [x, z, c] of [[-0.08, -0.02, 0], [0.0, 0.03, 2], [0.08, -0.03, 1]]) b.ball(x, 0.07, z, 0.035, 0, CLOTH[c], 0.7);
    // 차양: 기둥 둘 + 천
    b.cyl(-0.12, 0, -0.07, 0.006, 0.006, 0.17, 4, C.woodDark);
    b.cyl(0.12, 0, -0.07, 0.006, 0.006, 0.17, 4, C.woodDark);
    b.box(0, 0.17, -0.01, 0.28, 0.008, 0.16, CLOTH[3]);
    b.pop();
    return b.build();
  };

  /* ---------- 수원 화성: 둥근 돌성벽(여장) + 장안문(문루) + 서북공심돈(속이 빈 망루) ---------- */
  M.hwaseong = function () {
    const b = new JK.Builder();
    const R = 0.85,
      n = 16;
    b.ao(0, 0.25, 0.72);
    for (let i = 0; i < n; i++) {
      if (i === 4) continue; // 문 자리
      const a0 = (i / n) * Math.PI * 2,
        a1 = ((i + 1) / n) * Math.PI * 2;
      const x0 = Math.cos(a0) * R,
        z0 = Math.sin(a0) * R * 0.75,
        x1 = Math.cos(a1) * R,
        z1 = Math.sin(a1) * R * 0.75;
      const len = Math.hypot(x1 - x0, z1 - z0) + 0.02;
      b.push().t((x0 + x1) / 2, 0, (z0 + z1) / 2).ry(-Math.atan2(z1 - z0, x1 - x0));
      b.box(0, 0.08, 0, len, 0.16, 0.07, C.stone, { top: C.stoneWarm, noBottom: true });
      // 여장(벽돌 톱니) — 화성은 위쪽을 벽돌로 쌓았다
      for (let k = 0; k < 3; k++) b.box(-len / 2 + (k + 0.5) * (len / 3), 0.185, 0, len / 3 - 0.03, 0.05, 0.06, BRICK_D);
      b.pop();
    }
    // 장안문(정문): 석축 위 2층 문루를 작게
    const ga = (4.5 / n) * Math.PI * 2;
    b.push().t(Math.cos(ga) * R, 0, Math.sin(ga) * R * 0.75).ry(-ga - Math.PI / 2);
    b.box(0, 0.1, 0, 0.32, 0.2, 0.14, C.stone, { top: C.stoneWarm, noBottom: true });
    b.box(0, 0.07, 0.071, 0.1, 0.12, 0.004, C.arch);
    b.push().t(0, 0.2, 0);
    const t = hall(b, { bw: 0.13, bd: 0.06, h: 0.07, nx: 3, nz: 1, colR: 0.008 });
    b.push().t(0, t, 0);
    roof(b, { type: 'hip', w: 0.19, d: 0.11, h: 0.08, r: 0.1, lift: 0.025, out: 0.015, nu: 6, nv: 2, dens: 40, bw: 0.14, bd: 0.07 });
    b.pop();
    b.pop();
    b.pop();
    // 서북공심돈: 성벽 모서리의 둥근 벽돌 망루(구멍 창)
    const ta = (12.5 / n) * Math.PI * 2;
    b.push().t(Math.cos(ta) * R, 0, Math.sin(ta) * R * 0.75);
    b.cyl(0, 0, 0, 0.1, 0.11, 0.34, 8, BRICK, { top: BRICK_D });
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2;
      b.box(Math.cos(a) * 0.1, 0.22, Math.sin(a) * 0.1, 0.03, 0.03, 0.03, C.arch);
    }
    b.push().t(0, 0.34, 0);
    roof(b, { type: 'hip', w: 0.12, d: 0.12, h: 0.06, r: 0.01, lift: 0.015, out: 0.01, nu: 4, nv: 2, dens: 40, bw: 0.09, bd: 0.09 });
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 거중기: 나무 기둥 넷 + 가로대 + 도르래 + 밧줄 + 들린 돌 ---------- */
  M.geojunggi = function () {
    const b = new JK.Builder();
    b.push().s(1.4, 1.4, 1.4); // 마을 집 크기에 맞춤
    b.ao(0, 0.25, 0.75);
    const H = 0.42;
    for (const [x, z] of [[-0.12, -0.08], [0.12, -0.08], [-0.12, 0.08], [0.12, 0.08]]) b.cyl(x, 0, z, 0.01, 0.012, H, 5, C.wood);
    b.box(0, H, -0.08, 0.28, 0.025, 0.025, C.woodDark);
    b.box(0, H, 0.08, 0.28, 0.025, 0.025, C.woodDark);
    b.box(0, H + 0.02, 0, 0.03, 0.03, 0.2, C.woodDark);
    // 도르래(위·아래 둥근 바퀴)
    b.cyl(0, H - 0.06, 0, 0.03, 0.03, 0.02, 8, PLANK);
    b.cyl(0, H - 0.16, 0, 0.026, 0.026, 0.02, 8, PLANK);
    // 밧줄 + 들린 돌
    b.cyl(0, 0.13, 0, 0.003, 0.003, H - 0.17, 3, col('#c9b48a'));
    b.box(0, 0.09, 0, 0.1, 0.07, 0.08, C.stone, { top: C.stoneWarm });
    // 물레(감는 바퀴) 옆에
    b.cyl(0.2, 0.05, 0, 0.05, 0.05, 0.02, 8, PLANK);
    b.pop();
    return b.build();
  };

  /* ---------- 배다리: 작은 배를 나란히 이어 그 위에 널빤지 길(강을 가로지름) ---------- */
  M.baedari = function () {
    const b = new JK.Builder();
    b.ao(0, 0.1, 0.8);
    const n = 9;
    for (let i = 0; i < n; i++) {
      const z = (i - (n - 1) / 2) * 0.13;
      // 배(길쭉한 상자 + 뾰족 앞뒤)
      b.box(0, 0.02, z, 0.36, 0.05, 0.1, C.woodDark, { top: C.wood });
      b.box(-0.2, 0.025, z, 0.06, 0.04, 0.06, C.woodDark);
      b.box(0.2, 0.025, z, 0.06, 0.04, 0.06, C.woodDark);
    }
    // 널빤지 길 + 난간
    b.box(0, 0.058, 0, 0.16, 0.012, n * 0.13, PLANK);
    b.box(-0.085, 0.09, 0, 0.008, 0.05, n * 0.13, C.woodDark);
    b.box(0.085, 0.09, 0, 0.008, 0.05, n * 0.13, C.woodDark);
    // 양 끝 홍살문 같은 표시 기둥(깃발)
    for (const s of [-1, 1]) {
      b.cyl(0, 0.05, s * (n * 0.065 + 0.03), 0.006, 0.006, 0.26, 4, C.column);
      b.box(0.04, 0.27, s * (n * 0.065 + 0.03), 0.07, 0.05, 0.004, col('#d8b64e'));
    }
    return b.build();
  };

  /* ---------- 장시 천막: 기둥 넷 위 천 지붕 + 좌판 ---------- */
  M.jangsi = function () {
    const b = new JK.Builder();
    b.push().s(1.5, 1.5, 1.5); // 마을 집 크기에 맞춤
    b.ao(0, 0.15, 0.75);
    const c = CLOTH[(Math.random() * 3) | 0];
    for (const [x, z] of [[-0.14, -0.1], [0.14, -0.1], [-0.14, 0.1], [0.14, 0.1]]) b.cyl(x, 0, z, 0.007, 0.007, 0.2, 4, C.woodDark);
    // 천 지붕(낮은 박공)
    b.push().t(0, 0.2, 0);
    roof(b, { type: 'gable', w: 0.18, d: 0.14, h: 0.07, lift: 0, out: 0.01, nu: 3, nv: 2, dens: 40, bw: 0.15, bd: 0.11, color: c, tiles: false });
    b.pop();
    b.box(0, 0.04, 0, 0.24, 0.03, 0.14, PLANK, { noBottom: true });
    for (const [x, k] of [[-0.07, 1], [0.02, 2], [0.09, 0]]) b.ball(x, 0.075, 0, 0.03, 0, CLOTH[k], 0.7);
    b.pop();
    return b.build();
  };

  /* ---------- 세책점: 작은 기와 가게 + 처마에 매단 책 묶음 ---------- */
  M.sechaek = function () {
    const b = new JK.Builder();
    b.push().s(1.7, 1.7, 1.7); // 마을 집 크기에 맞춤
    b.ao(0, 0.2, 0.72);
    platform(b, 0.24, 0.16, 0.03);
    b.push().t(0, 0.03, 0);
    const t = hall(b, { bw: 0.17, bd: 0.1, h: 0.12, nx: 3, nz: 1, colR: 0.01, wall: C.wallWhite });
    b.push().t(0, t, 0);
    roof(b, { type: 'gable', w: 0.24, d: 0.16, h: 0.08, lift: 0.02, out: 0.02, nu: 5, nv: 2, dens: 40, bw: 0.18, bd: 0.11, color: C.tileHouse });
    b.pop();
    // 처마 아래 줄에 매단 책 묶음
    for (let i = 0; i < 4; i++) b.box(-0.12 + i * 0.08, t - 0.04, 0.125, 0.045, 0.06, 0.012, BOOK[i % 4]);
    b.pop();
    b.pop();
    return b.build();
  };

  /* ---------- 탈놀이 마당: 둥근 흙마당 + 둘러앉은 구경꾼 자리(멍석) + 깃발 장대 ---------- */
  M.talnori = function () {
    const b = new JK.Builder();
    b.push().s(1.3, 1.3, 1.3); // 마을 집 크기에 맞춤
    b.ao(0, 0.1, 0.85);
    b.cyl(0, 0, 0, 0.42, 0.42, 0.012, 14, col('#d8c49a'), { top: col('#e4d2a8') });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      b.push().t(Math.cos(a) * 0.36, 0.014, Math.sin(a) * 0.36).ry(-a);
      b.box(0, 0, 0, 0.05, 0.006, 0.14, col('#b89a62'));
      b.pop();
    }
    // 가운데 탈(둥근 얼굴 판 두 개)
    b.ball(-0.05, 0.08, 0, 0.035, 0, col('#f2e2c4'), 1);
    b.ball(0.05, 0.08, 0, 0.035, 0, col('#c0392b'), 1);
    b.cyl(0.3, 0, -0.22, 0.007, 0.007, 0.4, 4, C.woodDark);
    b.box(0.34, 0.37, -0.22, 0.08, 0.06, 0.005, col('#2f5f8c'));
    b.pop();
    return b.build();
  };

  /* ---------- 벽돌집: 벽돌 벽 + 기와 지붕(박지원이 청에서 보고 와 권한 벽돌) ---------- */
  M.brickHouse = function () {
    const b = new JK.Builder();
    b.push().s(1.7, 1.7, 1.7); // 마을 집 크기에 맞춤
    b.ao(0, 0.2, 0.72);
    b.box(0, 0.08, 0, 0.36, 0.16, 0.22, BRICK, { top: BRICK_D, noBottom: true });
    // 벽돌 줄눈
    for (let k = 1; k < 4; k++) {
      b.box(0, k * 0.04, 0.111, 0.36, 0.004, 0.002, BRICK_D);
      b.box(0, k * 0.04, -0.111, 0.36, 0.004, 0.002, BRICK_D);
    }
    b.box(0, 0.06, 0.112, 0.07, 0.11, 0.003, C.door);
    b.box(-0.11, 0.1, 0.112, 0.05, 0.04, 0.003, C.paper);
    b.box(0.11, 0.1, 0.112, 0.05, 0.04, 0.003, C.paper);
    b.push().t(0, 0.16, 0);
    roof(b, { type: 'gable', w: 0.24, d: 0.15, h: 0.09, lift: 0.02, out: 0.02, nu: 5, nv: 2, dens: 40, bw: 0.18, bd: 0.11, color: C.tileHouse });
    b.pop();
    b.pop();
    return b.build();
  };
})();
