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
    // 숙정문은 북쪽 산속(지도서 238: 북악산 능선을 따라 쌓은 도성), 돈의문은 서쪽
    ring: { cx: 0, cz: -0.4, rx: 7.1, rz: 6.3, gates: { sungnye: 1.95, heungin: 0.2, donui: 3.12, sukjeong: 4.95 } },
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
        // 돈의문으로
        [
          [-5.8, 1.35],
          [g.donui[0], g.donui[1]],
          [-9.0, -0.2],
        ],
        // 성균관으로 (종묘 동쪽으로 돌아)
        [
          [5.0, 1.05],
          [6.1, 0.2],
          [6.1, -3.3],
          [5.1, -4.3],
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
      sajik: { x: -3.9, z: -1.7, hw: 0.95, hd: 0.8, h: 0.03 },
      seonggyun: { x: 4.0, z: -4.45, hw: 1.0, hd: 0.78, h: 0.03 },
      // 생활 건물 자리 (일상 카드로 선다)
      seodang: { x: -3.3, z: 3.0, hw: 0.45, hd: 0.32, h: 0.02 },
      hyanggyo: { x: 8.35, z: -1.1, hw: 0.65, hd: 0.55, h: 0.02 },
      seowon: { x: -7.55, z: 3.0, hw: 0.62, hd: 0.52, h: 0.05 },
      reservoir: { x: -5.4, z: 4.6, hw: 0.95, hd: 0.95, h: 0.0 },
      hak1: { x: 5.5, z: 2.6, hw: 0.4, hd: 0.26, h: 0.02 },
      hak2: { x: -4.7, z: 0.2, hw: 0.4, hd: 0.26, h: 0.02 },
      hak3: { x: 1.1, z: 4.3, hw: 0.4, hd: 0.26, h: 0.02 },
      hak4: { x: -1.7, z: -0.55, hw: 0.4, hd: 0.26, h: 0.02 },
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
      sajik: { kind: 'single', name: '사직단', model: 'sajik', at: { site: 'sajik' }, label: 0.8, shadowR: [0.9, 0.75] },
      donui: { kind: 'single', name: '돈의문', model: 'donui', at: { gate: 'donui' }, label: 1.2, shadowR: [0.6, 0.35] },
      sukjeong: { kind: 'single', name: '숙정문', model: 'sukjeong', at: { gate: 'sukjeong' }, label: 1.1, shadowR: [0.5, 0.3] },
      seonggyun: { kind: 'single', name: '성균관', model: 'seonggyun', at: { site: 'seonggyun' }, label: 1.0, shadowR: [1.0, 0.75] },
      wall: { kind: 'wall', name: '한양 도성', startGate: 'sungnye', labelAt: [0.3, 3.6, -6.7] },
      // 생활 건물 (근거: 설계서 7-1 연출표)
      seodang: { kind: 'single', name: '서당', model: 'seodang', at: { site: 'seodang' }, label: 0.8, shadowR: [0.42, 0.26] },
      hyanggyo: { kind: 'single', name: '향교', model: 'hyanggyo', at: { site: 'hyanggyo' }, rot: -Math.PI / 2, label: 0.9, shadowR: [0.6, 0.5] },
      seowon: { kind: 'single', name: '서원', model: 'seowon', at: { site: 'seowon' }, rot: Math.PI / 2, label: 0.9, shadowR: [0.6, 0.5] },
      reservoir: { kind: 'single', name: '저수지', model: 'reservoir', at: { site: 'reservoir' }, label: 0.4, shadowR: [0, 0], y: 0.0 },
      bridge: { kind: 'single', name: '돌다리', model: 'bridge', at: { riverPhi: 1.98 }, label: 0.5, shadowR: [0, 0], y: 0.0 },
      hakdang: { kind: 'spots', name: '학당', model: 'hakdang', sites: ['hak1', 'hak2', 'hak3', 'hak4'], label: 0.8 },
      // 초가 마을은 이름 없는 장식 무리(연출표 7-1): 처음 몇 채에서 카드마다 조금씩 늘어난다
      choga: { kind: 'village', name: '', grow: 2, model: 'choga', max: 40, focus: [-1.5, 2.6], extra: [[-4.6, 7.0], [-5.6, 6.2], [-1.2, 7.4], [0.6, 7.3], [-7.8, 1.4], [-7.6, 0.3]] },
      giwa: { kind: 'village', name: '기와집 마을', model: 'giwa', max: 30, focus: [1.0, 0.8] },
    },
  };
})();
