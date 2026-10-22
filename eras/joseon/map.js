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
      // 영조·정조 생활 건물 자리(마을 집이 덮지 않게)
      sechaek: { x: 2.9, z: 2.4, hw: 0.26, hd: 0.18, h: 0.02 },
      talnori: { x: 2.3, z: 4.9, hw: 0.45, hd: 0.45, h: 0.01 },
      brickHouse: { x: 5.75, z: 2.25, hw: 0.25, hd: 0.18, h: 0.02 },
      // 고종 건물 자리(마을 집이 덮지 않게)
      ujeong: { x: -1.45, z: 2.45, hw: 0.32, hd: 0.2, h: 0.02 },
      hospital: { x: 4.6, z: 3.0, hw: 0.3, hd: 0.2, h: 0.02 },
      school: { x: -3.95, z: 1.75, hw: 0.4, hd: 0.25, h: 0.02 },
      hwangudan: { x: 0.95, z: 3.35, hw: 0.45, hd: 0.45, h: 0.02 },
    },
    // 게이지 위기 때 사람이 모이고 연기가 오르는 자리(이름 없음)
    crisis: {
      gate: [0, -0.75], // 궁궐 앞
      yard: [0, 0.6], // 궁궐 앞 큰길
      street: [2.2, 1.65], // 큰길(종로)
      southGate: [-2.2, 4.6], // 숭례문 안쪽
      fields: [
        [-4.7, 6.3],
        [-1.6, 6.9],
        [-6.6, 3.6],
      ],
      leave: [
        [0, -1.1],
        [0, 1.3],
        [-1.25, 3.4],
        [-2.55, 5.3],
        [-3.15, 7.2],
      ],
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
      gyeongbok: { kind: 'single', name: '경복궁', model: 'gyeongbok', at: { site: 'gyeongbok' }, label: 2.2, shadowR: [2.4, 1.9], replaces: ['altPalace', 'altOffice'] },
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
      seowon: { kind: 'single', name: '서원', model: 'seowon', at: { site: 'seowon' }, rot: Math.PI / 2, label: 0.9, shadowR: [0.6, 0.5], conflicts: ['altTemple'] },
      reservoir: { kind: 'single', name: '저수지', model: 'reservoir', at: { site: 'reservoir' }, label: 0.4, shadowR: [0, 0], y: 0.0 },
      bridge: { kind: 'single', name: '돌다리', model: 'bridge', at: { riverPhi: 1.98 }, label: 0.5, shadowR: [0, 0], y: 0.0 },
      hakdang: { kind: 'spots', name: '학당', model: 'hakdang', sites: ['hak1', 'hak2', 'hak3', 'hak4'], label: 0.8, conflicts: ['altHyanggyo'] },
      // 다른 길(10-10-7): 이름 없는 장식. 그 왕 동안만 있고 다음 왕 시작 때 실제 줄기로 돌아간다
      altPalace: { kind: 'single', name: '', model: 'altPalace', at: { site: 'gyeongbok' }, label: 0, shadowR: [1.3, 1.0], alt: true },
      altTemple: { kind: 'single', name: '', model: 'altTemple', at: { site: 'seowon' }, rot: Math.PI / 2, label: 0, shadowR: [0.6, 0.5], alt: true, conflicts: ['seowon'] },
      altHyanggyo: { kind: 'spots', name: '', model: 'altHyanggyo', sites: ['hak1', 'hak2', 'hak3'], label: 0, alt: true, conflicts: ['hakdang'] },
      altAltar: { kind: 'single', name: '', model: 'altAltar', at: { site: 'sajik' }, label: 0, shadowR: [0.6, 0.5], alt: true, conflicts: ['sajik'] },
      altOldWall: { kind: 'single', name: '', model: 'altOldWall', at: { x: -4.4, z: -4.6 }, rot: 0.6, label: 0, shadowR: [0.8, 0.2], alt: true },
      altSmallSG: { kind: 'single', name: '', model: 'altSmallSG', at: { site: 'seonggyun' }, label: 0, shadowR: [0.6, 0.4], alt: true, conflicts: ['seonggyun'] },
      gateFence: { kind: 'single', name: '', model: 'gateFence', at: { gate: 'sungnye' }, label: 0, shadowR: [0, 0], alt: true },
      // 시작 장면(10-12 ③, 이름 없는 장식): 멀리 개경 쪽 산 그림자 · 고려 깃발 · 새 깃발
      kaesongHills: { kind: 'single', name: '', model: 'kaesongHills', at: { x: -12.5, z: -11.5 }, rot: 0.5, label: 0, shadowR: [0, 0], y: -2.2 },
      goryeoFlag: { kind: 'single', name: '', model: 'goryeoFlag', at: { x: 7.9, z: -4.6 }, label: 0, shadowR: [0.15, 0.15] },
      newFlag: { kind: 'single', name: '', model: 'newFlag', at: { x: -8.3, z: -3.6 }, label: 0, shadowR: [0.15, 0.15] },
      // 태조 추가 집필 연출표(FX_T). 이름표는 근거가 있는 것만(문묘·천상열차분야지도 — CREDITS.md)
      munmyo: { kind: 'single', name: '문묘', model: 'munmyo', at: { x: 4.0, z: -3.12 }, label: 0.8, shadowR: [0.45, 0.3] },
      starStone: { kind: 'single', name: '천상열차분야지도', model: 'starStone', at: { x: -2.72, z: -3.35 }, rot: 0.3, label: 0.9, shadowR: [0.2, 0.1] },
      gyeryong: { kind: 'single', name: '', model: 'gyeryong', at: { x: 0.3, z: 5.9 }, label: 0, shadowR: [0.7, 0.5] },
      muak: { kind: 'single', name: '', model: 'muak', at: { x: -6.1, z: -4.4 }, rot: 0.7, label: 0, shadowR: [0.9, 0.6] },
      wihwa: { kind: 'single', name: '', model: 'wihwa', at: { riverPhi: 2.25 }, label: 0, shadowR: [0, 0], y: 0.0 },
      workyard: { kind: 'single', name: '', model: 'workyard', at: { x: 5.6, z: 4.3 }, label: 0, shadowR: [0.6, 0.45], removeAfter: ['T08', 'T08v1'] },
      // 루트 늘리기(10-14): 갈래·새 다른 길의 이름 없는 장식(그 판 동안만)
      gyeryongPalace: { kind: 'single', name: '', model: 'gyeryongPalace', at: { x: -0.9, z: 4.9 }, label: 0, shadowR: [1.0, 0.75], alt: true },
      gyeryongFort: { kind: 'single', name: '', model: 'gyeryongFort', at: { x: -0.3, z: 5.4 }, label: 0, shadowR: [0, 0], alt: true },
      yeokcham: { kind: 'single', name: '', model: 'yeokcham', at: { x: -5.0, z: 2.9 }, label: 0, shadowR: [0.3, 0.2], alt: true },
      palisade: { kind: 'single', name: '', model: 'palisade', at: { x: 0, z: -0.4 }, label: 0, shadowR: [0, 0], alt: true },
      wonchal: { kind: 'single', name: '', model: 'wonchal', at: { x: 6.95, z: -2.3 }, label: 0, shadowR: [0.4, 0.35], alt: true },
      altOffice: { kind: 'single', name: '', model: 'altOffice', at: { site: 'gyeongbok' }, label: 0, shadowR: [0.8, 0.6], alt: true },
      // 세종(설계서 7-1·7-2). 경복궁 바깥 담 안 서쪽 뜰(집현전·자격루)·동쪽 뜰(혼천의)은 터라서 집·나무가 들지 않는다
      //  해시계·측우기는 좌표 자리(points)라 마을 집 자리를 바꾸지 않는다. 이름표는 설계서 근거가 있는 것만
      jiphyeon: { kind: 'single', name: '집현전', model: 'jiphyeon', at: { x: -1.86, z: -3.75 }, rot: Math.PI / 2, label: 0.7, shadowR: [0.22, 0.4] },
      jagyeok: { kind: 'single', name: '자격루', model: 'jagyeok', at: { x: -1.86, z: -2.25 }, rot: Math.PI / 2, label: 0.75, shadowR: [0.25, 0.3] },
      honcheon: { kind: 'single', name: '혼천의', model: 'honcheon', at: { x: 1.86, z: -3.6 }, label: 0.95, shadowR: [0.25, 0.25] },
      angbu: { kind: 'spots', name: '앙부일구', model: 'angbu', points: [[2.0, 1.66], [3.72, -0.06]], label: 0.45 },
      cheugu: { kind: 'spots', name: '측우기', model: 'cheugu', points: [[-4.7, 6.05], [-1.3, 7.05], [-7.25, 2.1], [1.86, -2.3]], label: 0.4 },
      jin: { kind: 'single', name: '4군 6진', model: 'jin', at: { x: -4.9, z: -6.75 }, rot: 0.62, label: 1.0, shadowR: [1.1, 0.25] },
      kiln: { kind: 'single', name: '백자 가마', model: 'kiln', at: { x: 6.25, z: 4.55 }, rot: -0.5, label: 0.6, shadowR: [0.5, 0.2] },
      // 선조·인조(설계서 7-1·2-3): 불탄 경복궁 터(주춧돌·기단만 — 고종 때까지 남음) · 불탄 종묘 터 · 남한산성(남쪽 산 위, 눈) · 삼전도비(한강 가, 거북 받침)
      gyeongbokRuin: { kind: 'single', name: '경복궁 터', model: 'gyeongbokRuin', at: { site: 'gyeongbok' }, label: 0.6, shadowR: [2.2, 1.7] },
      jongmyoRuin: { kind: 'single', name: '', model: 'jongmyoRuin', at: { site: 'jongmyo' }, label: 0, shadowR: [1.4, 0.9] },
      namhansan: { kind: 'single', name: '남한산성', model: 'namhansan', at: { x: 6.75, z: 5.5 }, rot: -0.6, label: 1.2, shadowR: [0.9, 0.7] },
      samjeondo: { kind: 'single', name: '삼전도비', model: 'samjeondo', at: { riverPhi: 1.0 }, label: 0.7, shadowR: [0.25, 0.2] },
      // 영조·정조(설계서 2-4): 탕평비는 성균관 앞 · 규장각은 경복궁 터 동쪽 궁궐 숲(창덕궁 쪽) · 좌판은 종로 큰길가 · 화성은 도성 밖 서남쪽 언덕(수원 쪽)
      //  배다리는 한강을 가로질러 · 장시 천막은 성 밖 들판 고을 셋 · 세책점·벽돌집·탈놀이 마당은 마을 안
      tangpyeong: { kind: 'single', name: '탕평비', model: 'tangpyeong', at: { x: 4.0, z: -3.45 }, label: 0.55, shadowR: [0.15, 0.1] },
      gyujang: { kind: 'single', name: '규장각', model: 'gyujang', at: { x: 2.55, z: -5.15 }, rot: 0.15, label: 0.65, shadowR: [0.45, 0.3] },
      jwapan: { kind: 'spots', name: '좌판', model: 'jwapan', points: [[-1.7, 1.78], [-0.75, 1.75], [1.0, 1.62], [2.05, 1.52], [3.05, 1.42]], label: 0.4 },
      hwaseong: { kind: 'single', name: '수원 화성', model: 'hwaseong', at: { x: -7.9, z: 1.75 }, rot: 0.4, label: 0.9, shadowR: [0.9, 0.7] },
      geojunggi: { kind: 'single', name: '거중기', model: 'geojunggi', at: { x: -6.75, z: 2.55 }, rot: 0.4, label: 0.6, shadowR: [0.18, 0.12] },
      baedari: { kind: 'single', name: '배다리', model: 'baedari', at: { riverPhi: 1.62 }, label: 0.4, shadowR: [0, 0], y: 0.0 },
      jangsi: { kind: 'spots', name: '장시', model: 'jangsi', points: [[6.05, 2.95], [-6.4, -0.9], [1.7, 5.4]], label: 0.4 },
      sechaek: { kind: 'single', name: '세책점', model: 'sechaek', at: { site: 'sechaek' }, label: 0.45, shadowR: [0.2, 0.12] },
      talnori: { kind: 'single', name: '탈놀이 마당', model: 'talnori', at: { site: 'talnori' }, label: 0.4, shadowR: [0, 0] },
      brickHouse: { kind: 'single', name: '벽돌집', model: 'brickHouse', at: { site: 'brickHouse' }, rot: -0.3, label: 0.4, shadowR: [0.2, 0.12] },
      // 고종(설계서 2-5): 척화비는 길목 셋 · 개항장 부두는 강가 · 독립문은 돈의문 밖 · 전등은 경복궁 연못가 · 전봇대는 궁궐에서 관청 쪽 · 전차는 종로 끝 흥인지문 쪽 · 경인선은 도성 밖 남서쪽 들판
      cheokhwa: { kind: 'spots', name: '척화비', model: 'cheokhwa', points: [[-2.05, 3.7], [3.85, 0.85], [-5.7, 1.05]], label: 0.4 },
      port: { kind: 'single', name: '개항장', model: 'port', at: { riverPhi: 2.45 }, label: 0.5, shadowR: [0.2, 0.2], y: 0.0 },
      ujeong: { kind: 'single', name: '우정총국', model: 'ujeong', at: { site: 'ujeong' }, label: 0.6, shadowR: [0.4, 0.25] },
      dongnipmun: { kind: 'single', name: '독립문', model: 'dongnipmun', at: { x: -8.05, z: -0.45 }, rot: Math.PI / 2, label: 0.7, shadowR: [0.3, 0.12] },
      hwangudan: { kind: 'single', name: '환구단', model: 'hwangudan', at: { site: 'hwangudan' }, label: 0.6, shadowR: [0.4, 0.4] },
      hospital: { kind: 'single', name: '병원', model: 'hospital', at: { site: 'hospital' }, label: 0.6, shadowR: [0.35, 0.22] },
      school: { kind: 'single', name: '학교', model: 'school', at: { site: 'school' }, label: 0.7, shadowR: [0.4, 0.2] },
      lamps: { kind: 'single', name: '전등', model: 'lamps', at: { x: -1.55, z: -3.45 }, label: 0.5, shadowR: [0, 0] },
      telepole: { kind: 'single', name: '전화', model: 'telepole', at: { x: 1.3, z: -0.95 }, label: 0.5, shadowR: [0, 0] },
      tram: { kind: 'single', name: '전차', model: 'tram', at: { x: 5.4, z: 1.02 }, rot: -0.05, label: 0.4, shadowR: [0.2, 0.1] },
      gongbang: { kind: 'single', name: '공방', model: 'gongbang', at: { x: -2.65, z: -5.45 }, label: 0.5, shadowR: [0.25, 0.15] },
      podae: { kind: 'spots', name: '포대', model: 'podae', points: [[-6.95, 4.75], [5.5, 6.05], [7.6, 2.6]], label: 0.4 },
      railway: { kind: 'single', name: '경인선', model: 'railway', at: { x: -3.3, z: 6.45 }, rot: -0.45, label: 0.5, shadowR: [0.3, 0.1] },
      // 초가 마을은 이름 없는 장식 무리(연출표 7-1): 처음 몇 채에서 카드마다 조금씩 늘어난다
      choga: { kind: 'village', name: '', grow: 2, model: 'choga', max: 40, focus: [-1.5, 2.6], extra: [[-4.6, 7.0], [-5.6, 6.2], [-1.2, 7.4], [0.6, 7.3], [-7.8, 1.4], [-7.6, 0.3]] },
      giwa: { kind: 'village', name: '기와집 마을', model: 'giwa', max: 30, focus: [1.0, 0.8] },
    },
  };
})();
