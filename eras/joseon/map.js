/* eras/joseon/map.js — 조선 시대팩 지도: 한양 섬의 산·도성·강·길·터·건물 자리
 * 근거: 지도서 233·238·272·275 (산으로 둘러싸인 분지, 북악산·낙산·남산·인왕산 능선을 따라 쌓은 도성,
 *       경복궁 동쪽 종묘·서쪽 사직단, 남쪽 한강). 산 이름은 화면에 붙이지 않는다(장식).
 */
(function () {
  'use strict';
  const JK = (window.JK = window.JK || {});

  JK.eraMap = {
    // [x, z, 높이, 퍼짐]
    mounts: [
      [0.3, -7.4, 3.0, 1.45], // 북쪽 큰 산
      [-6.9, -2.5, 2.0, 1.3], // 서쪽 산
      [7.5, -3.2, 1.05, 1.05], // 동쪽 낮은 산
      [2.9, 6.25, 1.4, 1.1], // 남쪽 산
      [-8.0, 4.2, 0.8, 0.9],
      [6.6, 5.6, 0.6, 0.9],
    ],
    // 도성 고리(타원)와 성문 자리(각도)
    ring: { cx: 0, cz: -0.4, rx: 7.1, rz: 6.3, gates: { sungnye: 1.95, heungin: 0.2 } },
    // 한강: 남쪽 가장자리를 따라 흐르다 동남쪽 끝에서 폭포가 된다
    river: { from: 2.75, to: 0.72, r: 8.05 },
    roads(g) {
      return [
        [
          [0, -1.15],
          [0, 1.3],
        ],
        [
          [-5.8, 1.35],
          [-2.5, 1.35],
          [0, 1.3],
          [3.5, 1.1],
          [g.heungin[0], g.heungin[1]],
          [9.3, 0.95],
        ],
        [
          [0, 1.3],
          [-1.25, 3.4],
          [g.sungnye[0], g.sungnye[1]],
          [-3.15, 7.3],
        ],
        [
          [4.1, 1.12],
          [4.1, -0.35],
        ],
      ];
    },
    // 사람만 다니는 논두렁 길
    extraPaths(g) {
      return [
        [
          [-3.15, 7.3],
          [-5.2, 6.4],
          [-6.9, 4.6],
        ],
        [
          [g.heungin[0], g.heungin[1]],
          [8.3, 3.2],
          [7.2, 6.0],
        ],
      ];
    },
    // 터(평평하게 고른 자리)
    sites: {
      gyeongbok: { x: 0, z: -3.1, hw: 2.45, hd: 1.95, h: 0.03 },
      jongmyo: { x: 4.1, z: -1.4, hw: 1.7, hd: 1.15, h: 0.03 },
    },
    // 도성 밖 남쪽·서쪽 낮은 땅은 논
    paddy(x, z) {
      return z > 2.2 || x < -6.2;
    },
    // 종로와 궁궐 가까이는 기와집, 바깥쪽은 초가
    houseKind(c, rnd) {
      const nearMain = Math.abs(c.z - 1.3) < 1.5 && c.x > -3.4 && c.x < 5.6;
      const nearPalace = c.z < -0.6 && Math.abs(c.x) < 3.2;
      return (nearMain || nearPalace) && rnd() < 0.85 ? 'giwa' : 'choga';
    },
    // 화면에 세워지는 것. kind: single(한 채) | village(마을, 인스턴싱) | wall(도성 성곽)
    // name이 있으면 이름표가 뜬다 → 근거가 있어야 한다(CREDITS.md).
    buildings: {
      gyeongbok: { kind: 'single', name: '경복궁', model: 'gyeongbok', at: { site: 'gyeongbok' }, label: 2.2, shadowR: [2.4, 1.9] },
      jongmyo: { kind: 'single', name: '종묘', model: 'jongmyo', at: { site: 'jongmyo' }, label: 1.0, shadowR: [1.6, 1.05] },
      sungnye: { kind: 'single', name: '숭례문', model: 'sungnye', at: { gate: 'sungnye' }, label: 1.4, shadowR: [0.7, 0.4] },
      heungin: { kind: 'single', name: '흥인지문', model: 'heungin', at: { gate: 'heungin' }, label: 1.3, shadowR: [0.8, 0.8] },
      wall: { kind: 'wall', name: '한양 도성', startGate: 'sungnye', labelAt: [0.3, 3.6, -6.7] },
      choga: { kind: 'village', name: '초가집 마을', model: 'choga', max: 40, focus: [-1.5, 2.6], extra: [[-4.6, 7.0], [-5.6, 6.2], [-1.2, 7.4], [0.6, 7.3], [-7.8, 1.4], [-7.6, 0.3]] },
      giwa: { kind: 'village', name: '기와집 마을', model: 'giwa', max: 30, focus: [1.0, 0.8] },
    },
  };
})();
