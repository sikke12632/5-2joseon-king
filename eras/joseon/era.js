/* eras/joseon/era.js — 조선 시대팩 등록: 게이지, 왕(스테이지), 하늘, 실각 기록, 칭호 규칙
 * 글(카드·퀴즈·도감)은 data/*.js 에 있다. 엔진 코드에는 시대 글을 넣지 않는다.
 */
(function () {
  'use strict';
  const JK = (window.JK = window.JK || {});
  const D = (JK.eraData = JK.eraData || { cards: [], quizzes: [], roles: {}, codex: [], titles: [], falls: [] });

  // 하루의 빛 열쇠 값 (t 0 = 스테이지 시작, 1 = 끝)
  const SKY_DAWN_TO_DUSK = [
    { t: 0.0, top: '#8a95cf', hor: '#f8c9ad', bot: '#f2d8cc', sun: '#ffbf98', si: 1.7, hs: '#cfd0f2', hg: '#dcb8a2', hi: 0.95, el: 0.14, az: 1.35, night: 0.5, ink: '#4a4f78' },
    { t: 0.35, top: '#86b9ea', hor: '#fdebcf', bot: '#f2efe8', sun: '#fff1d8', si: 2.5, hs: '#d4e6ff', hg: '#e8dcbc', hi: 1.05, el: 0.85, az: 0.75, night: 0.0, ink: '#3b4a66' },
    { t: 0.72, top: '#78a8de', hor: '#ffe3ae', bot: '#f6e7cf', sun: '#ffd89c', si: 2.4, hs: '#d2e0f8', hg: '#ecd6b0', hi: 1.0, el: 0.6, az: -0.2, night: 0.0, ink: '#4b4a66' },
    { t: 1.0, top: '#40447f', hor: '#f49b6c', bot: '#e8aa92', sun: '#ff9960', si: 1.6, hs: '#9496d6', hg: '#cf9f80', hi: 0.85, el: 0.13, az: -1.1, night: 1.0, ink: '#2f2f55' },
  ];

  // 세종(설계서 2-2): 맑은 봄 아침 → 여름 한낮 → 저녁 → 별이 뚜렷한 밤
  const SKY_SPRING_TO_STARS = [
    { t: 0.0, top: '#7fb4e8', hor: '#fdeed2', bot: '#f2eee4', sun: '#fff1d6', si: 2.4, hs: '#d4e6ff', hg: '#e6dcbc', hi: 1.05, el: 0.5, az: 1.1, night: 0.0, ink: '#3b4a66' },
    { t: 0.45, top: '#68a6e4', hor: '#fff2d4', bot: '#f4f1e6', sun: '#fff6e2', si: 2.6, hs: '#d0e4ff', hg: '#e8e0bc', hi: 1.08, el: 0.95, az: 0.2, night: 0.0, ink: '#3b4a66' },
    { t: 0.78, top: '#5f86c8', hor: '#ffd7a2', bot: '#f2dcc4', sun: '#ffc888', si: 2.1, hs: '#c4d0f0', hg: '#dcc6a0', hi: 0.95, el: 0.28, az: -0.8, night: 0.15, ink: '#3d4266' },
    { t: 1.0, top: '#2a3170', hor: '#8c7fb8', bot: '#5d5f92', sun: '#c8d0ff', si: 1.3, hs: '#7f88c8', hg: '#6a6890', hi: 0.8, el: 0.12, az: -1.2, night: 1.0, ink: '#262a58' },
  ];

  // 선조·인조(설계서 2-3): 맑은 봄(평화) → 잿빛 여름(임진왜란) → 겨울 저녁(병자호란, 눈)
  const SKY_PEACE_WAR_SNOW = [
    { t: 0.0, top: '#86b6e6', hor: '#fbeed6', bot: '#f2eee6', sun: '#fff1d8', si: 2.4, hs: '#d4e4fb', hg: '#e4dcc0', hi: 1.05, el: 0.55, az: 1.1, night: 0.0, ink: '#3b4a66' },
    { t: 0.14, top: '#8e98a6', hor: '#cfc6b6', bot: '#b9b2a6', sun: '#e6d8bc', si: 1.4, hs: '#b8c0cc', hg: '#a8a090', hi: 0.9, el: 0.75, az: 0.6, night: 0.0, ink: '#3a3f4a' },
    { t: 0.6, top: '#8a93a2', hor: '#d2c8b6', bot: '#bdb5a8', sun: '#e8dcc0', si: 1.5, hs: '#bcc4d0', hg: '#aaa294', hi: 0.92, el: 0.6, az: -0.1, night: 0.0, ink: '#3a3f4a' },
    { t: 0.72, top: '#a9b6c8', hor: '#e6e8ee', bot: '#d8dce4', sun: '#f2f4fa', si: 1.5, hs: '#d6dee8', hg: '#e8eaee', hi: 1.0, el: 0.35, az: -0.6, night: 0.05, ink: '#3c4458' },
    { t: 1.0, top: '#4a5478', hor: '#b8bcd0', bot: '#8a8ea8', sun: '#d8dcf0', si: 1.2, hs: '#9aa2c4', hg: '#c8ccd8', hi: 0.85, el: 0.15, az: -1.1, night: 0.7, ink: '#2c3050' },
  ];

  JK.era = {
    id: 'joseon',
    title: '조선의 왕',
    tagline: '레인즈식 조선 경영 게임',
    map: JK.eraMap,
    // 네 게이지 (설계서 1장: 백성 초가, 양반 갓, 국고 엽전, 국방 깃발)
    gauges: [
      { key: 'people', name: '백성', icon: '<path d="M12 3.2L1.8 12.4h3.1V21h14.2v-8.6h3.1z"/><path fill="#23302f" d="M10 21v-5h4v5z"/>' },
      { key: 'nobles', name: '양반', icon: '<ellipse cx="12" cy="16.2" rx="11" ry="2.7"/><path d="M7.8 15V7.6C7.8 5.7 9.6 4.6 12 4.6s4.2 1.1 4.2 3V15z"/><path d="M8.4 18.4l2 4.2h1.2l-1.6-4.2zM15.6 18.4l-2 4.2h-1.2l1.6-4.2z"/>' },
      { key: 'treasury', name: '국고', icon: '<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-3.2 6.8v6.4h6.4V8.8z"/>' },
      { key: 'army', name: '국방', icon: '<path d="M4 1.8h2.2V22.4H4z"/><path d="M6.2 2.6c4.2-1.4 7.2 1.6 13.8 0v10.2c-6.6 1.6-9.6-1.4-13.8 0z"/>' },
    ],
    // 왕(스테이지). ready:false 는 "준비 중"
    stages: [
      {
        id: 'taejo',
        king: '태조',
        seal: '太祖',
        title: '새 나라를 짓다',
        years: '1392~1398',
        ready: true,
        sky: SKY_DAWN_TO_DUSK,
        tod: [0.06, 0.92],
        // 섬에 처음부터 서 있는 것 (설계서 T00: 초가 몇 채뿐)
        prebuilt: { choga: 5 },
        kingRole: 'taejo',
        randomSlots: [5, 8], // 무작위 일상 카드 칸 수(설계서 10-2). ★필수 카드는 따로
        // 그 사건 앞에 꼭 두는 무작위 칸(위 칸 수 안에서). T01 정몽주는 판 맨 처음이라 게이지를 움직일 기회가 필요하다(담임 제보 2026-10-21)
        slotsBefore: { T01: 2 },
        realEnd: '실제로 태조는 1398년까지 왕위에 있었다.',
        tutorial: 3, // 처음 세 장은 손 모양 안내
        // 시작 장면(설계서 10-12 ③): 빈 섬과 멀리 개경 쪽 산 그림자, 섬 둘레에 고려 깃발과 새 깃발 하나씩(이름 없는 장식)
        //  고려 깃발은 T01에서 실제 경로를 고르면 천천히 내려간다(T01 연출). 시작 게이지·보정·소개 글은 data/common/stages.js(10-12)
        scene: ['kaesongHills', 'goryeoFlag', 'newFlag'],
      },
      {
        id: 'sejong',
        king: '세종',
        seal: '世宗',
        title: '발명 진행도',
        years: '1418~1450',
        ready: true,
        // 설계서 2-2 하늘: 화창한 봄~여름, 밤에는 별이 뚜렷하다(혼천의와 연결)
        sky: SKY_SPRING_TO_STARS,
        tod: [0.04, 0.97],
        // 시작 한양(설계서 1장·10-12 ③): 경복궁·종묘·사직단·도성과 네 큰 문·성균관이 다 선 한양(태조 때 실제 모습)
        prebuilt: { choga: 18, giwa: 14, gyeongbok: 1, jongmyo: 1, sajik: 1, wall: 1, heungin: 1, donui: 1, sungnye: 1, sukjeong: 1, seonggyun: 1 },
        kingRole: 'sejong',
        randomSlots: [6, 9],
        slotsBefore: {},
        realEnd: '실제로 세종은 1450년까지 32년 동안 나라를 다스렸다.',
        scene: [],
        // 발명 진행도(설계서 2-2): 0~6. 장치 카드 문턱은 난이도표 stage.sejongTriggers, 6을 채우면 「과학 임금의 벗」
        device: { key: 'invention', name: '발명 진행도', max: 6, start: { invention: 0 }, triggers: 'sejongTriggers', triggersDefault: [2, 3, 5], title: 'invention6', hint: '학자·장인을 도우면 오르고, 혼천의·앙부일구·측우기가 일찍 나와요' },
      },
      {
        id: 'seonjo',
        king: '선조·인조',
        // 한 판에 두 왕(설계서 2-3): 처음은 선조, J08(인조반정)이 뜨는 순간 인조로
        kingFirst: '선조',
        kingSwap: { at: 'J08', name: '인조', role: 'injo', text: '왕이 바뀌었다 — 이제부터 인조' },
        seal: '宣祖',
        title: '전쟁 버티기',
        years: '1567~1649',
        ready: true,
        // 설계서 2-3 하늘: 평화로운 봄 → 잿빛 여름(전쟁) → 겨울 눈(병자호란)
        sky: SKY_PEACE_WAR_SNOW,
        tod: [0.04, 0.97],
        // 시작 한양(10-12 ③): 서당·향교가 늘어난 평화로운 한양. 경복궁·종묘는 J02에 불탄다
        prebuilt: { choga: 22, giwa: 18, gyeongbok: 1, jongmyo: 1, sajik: 1, wall: 1, heungin: 1, donui: 1, sungnye: 1, sukjeong: 1, seonggyun: 1, seodang: 1, hyanggyo: 1 },
        kingRole: 'seonjo',
        randomSlots: [6, 9],
        // 남한산성(J09~J11)이 두세 장으로 끝나면 식량 눈금이 의미가 없다 — 사이에 무작위 칸을 꼭 둔다.
        //  J09 바로 뒤에는 사슬 CJ04a·b(강화도 → 남한산성)가 반드시 두 장 붙으므로 J10 앞은 한 칸: 보통 식량 6이면 J11 즈음 바닥
        //  J02 앞 한 칸: 전쟁 전 평화로운 한양 카드(DJ101~108)가 나올 자리
        slotsBefore: { J02: 1, J10: 1, J11: 2 },
        realEnd: '실제로 선조는 1608년까지, 인조는 1649년까지 왕위에 있었다.',
        scene: [],
        // 전쟁 버티기(설계서 2-3): 숫자는 난이도표 stage 칸(warCost·food·starvePeople)
        war: { from: 'J02', to: 'J07', cost: 'warCost', name: '⚔ 임진왜란', hint: '전쟁 중에는 카드마다 국고가 줄어요' },
        siege: { from: 'J09', to: 'J11', food: 'food', starve: 'starvePeople', name: '남한산성 식량', hint: '식량이 바닥나면 카드마다 백성이 줄어요. 끝까지 버텨도 결국 항복해요(역사 그대로)' },
      },
      { id: 'yeongjo', king: '영조·정조', seal: '英祖', title: '붕당 저울', years: '1724~1800', ready: false },
      { id: 'gojong', king: '고종', seal: '高宗', title: '개항 압력', years: '1863~1899', ready: false },
    ],
    data: D,
    // 게이지 위기 (설계서 10-8, v3 규칙). 단계별 값은 { sprout, normal, sage, annals }
    crisis: {
      // 10-8-1 구간: 거리(0·100까지 남은 값) < warn → 위험, < stable → 경고, < cliff(6) → 벼랑, 0 → 끝
      zones: { sprout: { stable: 31, warn: 16 }, normal: { stable: 26, warn: 16 }, sage: { stable: 21, warn: 13 }, annals: { stable: 21, warn: 11 } },
      cliff: 6,
      // 10-8-2 예고: 왕당 최대 장수
      forewarnMax: { sprout: 5, normal: 4, sage: 4, annals: 4 },
      // 10-8-3 ① 카드마다 위기가 터질 확률(보통). 난이도 crisisMult를 곱하고 95%가 상한
      chance: { warn: 0.06, danger: 0.18, cliff: 0.4, end: 0.75, cap: 0.95 },
      // 전체 쉬는 장수(어떤 위기든 터진 뒤 이 동안 다른 종류 위기도 없음). 다른 게이지가 끝 구간이면 end(1)
      rest: { sprout: 5, normal: 3, sage: 2, annals: 2, end: 1 },
      // 10-8-3 ②③ 실각 확률 = 구간 기본값 × 대응 배율 × 난이도 배율 (+ 후속 가산), 상한 95%
      fall: {
        base: { warn: 0.05, danger: 0.15, cliff: 0.35, end: 0.6 },
        // 대응 배율(담임 결정 2026-10-21: 처음 강한 ×0.5·가벼운 ×0.75에서 올림). 대응에 쓰는 게이지가 이미 위험 이하면 weak*
        response: { strong: 0.75, light: 1.0, weakStrong: 1.0, weakLight: 1.25 },
        diff: { sprout: 0.5, normal: 1.0, sage: 1.2, annals: 1.4 },
        followAdd: { sprout: 0.05, normal: 0.1, sage: 0.1, annals: 0.15 },
        cap: 0.95,
      },
      // 위기 카드 버튼 아래: 새싹 숫자 / 보통 말 / 성군·실록 없음
      showChance: { sprout: 'number', normal: 'words', sage: 'none', annals: 'none' },
      // 10-8-3 ⑤ 후속: 같은 위기의 쉬는 장수가 끝났을 때 아직 거리 15 이하이면 그 다음 카드에 반드시. 16 이상이면 취소
      followupIfAtMost: 15,
      followupMaxStep: 3,
      // 같은 위기의 쉬는 장수(담임 추가, 10-8-3 표): 수습하면 같은 게이지·같은 방향 위기는 이 장수 동안 다시 터지지 않는다.
      // 쉬는 동안에도 경고 연출은 그대로이고 아이콘 옆에 ⏳남은 장수. 후속 위기를 수습한 뒤에는 +2
      cooldown: {
        'people:low': { sprout: 8, normal: 5, sage: 4, annals: 3 },
        'people:high': { sprout: 6, normal: 4, sage: 3, annals: 2 },
        'nobles:low': { sprout: 9, normal: 6, sage: 4, annals: 3 },
        'nobles:high': { sprout: 6, normal: 4, sage: 3, annals: 2 },
        'treasury:low': { sprout: 6, normal: 4, sage: 3, annals: 2 },
        'treasury:high': { sprout: 6, normal: 4, sage: 3, annals: 2 },
        'army:low': { sprout: 8, normal: 5, sage: 4, annals: 3 },
        'army:high': { sprout: 6, normal: 4, sage: 3, annals: 2 },
        'faction:any': { sprout: 8, normal: 5, sage: 4, annals: 3 },
      },
      cooldownAfterFollowup: 2,
      // 10-8-3 ⑤-1: 수습 직후 문제 게이지는 최소 이 거리까지 올라온다(벼랑·끝에 머물지 않게)
      minAfterHeld: 8,
      // 구간에 처음 들어설 때 뜨는 짧은 알림
      alerts: {
        people: { low: { warn: '백성들의 불만이 커지고 있사옵니다.', danger: '백성들이 궁궐 앞에 모이고 있사옵니다!', end: '백성의 마음이 바닥났사옵니다!' }, high: { warn: '백성 눈치만 본다는 말이 도옵니다.', danger: '관아 일이 멈추어 가옵니다!', end: '관리들이 손을 놓았사옵니다!' } },
        nobles: { low: { warn: '대신들이 하나둘 등을 돌리옵니다.', danger: '빈 방석이 늘어 가옵니다!', end: '밤마다 한 집에 불이 켜지옵니다!' }, high: { warn: '대신들끼리 수군거리옵니다.', danger: '대신들 방에만 불이 켜지옵니다!', end: '왕명이 되돌아오옵니다!' } },
        treasury: { low: { warn: '곳간 쌀가마가 줄고 있사옵니다.', danger: '곳간 문이 열린 채 텅 비었사옵니다!', end: '녹봉을 못 받은 관리들이 줄을 섰사옵니다!' }, high: { warn: '곳간이 넘쳐 가옵니다.', danger: '곳간에 쥐가 드나드옵니다!', end: '곳간을 두고 다툼이 났사옵니다!' } },
        army: { low: { warn: '성벽 위 군사가 줄고 있사옵니다.', danger: '봉수대에 연기가 오르옵니다!', end: '산마다 봉수 불이 올랐사옵니다!' }, high: { warn: '성 밖 군막이 늘어 가옵니다.', danger: '장수 깃발이 궁궐 깃발보다 많사옵니다!', end: '군사들이 도성 문 앞을 막아섰사옵니다!' } },
      },
      // 10-8-4 세계 반응: warn(1단계) · danger(2단계, 위험·벼랑·끝) · event(3단계, 위기 사건). 폭력 장면 없음
      scenes: {
        people: {
          low: {
            warn: {},
            danger: { crowds: [{ at: 'gate', n: 8, face: 'gyeongbok', flags: 0, clothes: ['#ece4d2', '#e3dccb'] }] },
            event: { crowds: [{ at: 'gate', n: 16, face: 'gyeongbok', flags: 5, flag: '#f4f0e4', clothes: ['#ece4d2', '#e3dccb', '#ddd2bb'] }], smoke: ['fields'] },
          },
          high: {
            warn: {},
            danger: { lights: 0.6 },
            event: { lights: 0.3, crowds: [{ at: 'yard', n: 6, face: 'gyeongbok', flags: 0, clothes: ['#3d5e8c', '#9a3d3a'] }] },
          },
        },
        nobles: {
          low: { warn: {}, danger: { processions: [{ path: 'leave', n: 4, clothes: ['#d7e8e0', '#e9eef0'] }] }, event: { processions: [{ path: 'leave', n: 9, clothes: ['#d7e8e0', '#e9eef0', '#c9dcea'] }], lights: 0.4 } },
          high: {
            warn: { crowds: [{ at: 'yard', n: 4, face: 'yard', flags: 0, clothes: ['#3d5e8c', '#9a3d3a'] }] },
            danger: { crowds: [{ at: 'yard', n: 8, face: 'yard', flags: 2, flag: '#3d5e8c', clothes: ['#3d5e8c', '#9a3d3a'] }] },
            event: { crowds: [{ at: 'yard', n: 12, face: 'gyeongbok', flags: 4, flag: '#3d5e8c', clothes: ['#3d5e8c', '#9a3d3a', '#3f7a62'] }] },
          },
        },
        treasury: {
          low: { warn: { lights: 0.7 }, danger: { lights: 0.35 }, event: { lights: 0.1, crowds: [{ at: 'yard', n: 8, face: 'gyeongbok', flags: 0, clothes: ['#3d5e8c', '#3f7a62'] }] } },
          high: { warn: {}, danger: { crowds: [{ at: 'street', n: 5, face: 'gyeongbok', flags: 1, flag: '#d8b64e', clothes: ['#3d5e8c', '#9a3d3a'] }] }, event: { crowds: [{ at: 'street', n: 10, face: 'gyeongbok', flags: 3, flag: '#d8b64e', clothes: ['#3d5e8c', '#9a3d3a'] }] } },
        },
        army: {
          low: { warn: {}, danger: { beacons: 1 }, event: { beacons: 3 } },
          high: {
            warn: {},
            danger: { crowds: [{ at: 'southGate', n: 6, face: 'gyeongbok', flags: 2, flag: '#b23b30', clothes: ['#4a4a55'] }] },
            event: { crowds: [{ at: 'southGate', n: 12, face: 'gyeongbok', flags: 4, flag: '#b23b30', clothes: ['#4a4a55', '#3a3a44'] }] },
          },
        },
      },
    },
    // 카드의 결 (설계서 10-9): balance 저울 · complex 복합 · gift 선물 · mire 수렁 · seed 씨앗 · gamble 도박
    //  maxRun 같은 결이 연달아 나올 수 있는 장수 · banAfter [앞, 뒤] 바로 이어 나오면 안 되는 짝
    //  state 게이지 상태에 따른 가중치(무작위 칸에만, 위에서부터 먼저 맞는 한 줄) · diff 난이도별 가중치
    //  gambleWin 도박 성공 확률 · marks 끄는 동안 미리보기에 붙는 작은 표시
    grain: {
      names: { balance: '저울형', complex: '복합형', gift: '선물형', mire: '수렁형', seed: '씨앗형', gamble: '도박형' },
      target: { balance: 0.5, complex: 0.15, gift: 0.1, mire: 0.1, seed: 0.08, gamble: 0.07 },
      maxRun: { balance: 3, complex: 2, gift: 1, mire: 1, seed: 1, gamble: 1 },
      banAfter: [['mire', 'gamble']],
      state: [
        { when: 'danger', mult: { gift: 1.5, mire: 0.6, gamble: 1.2 } },
        { when: 'afterHeld', cards: 3, mult: { gift: 1.3, mire: 0.5, gamble: 0.8 } },
        { when: 'calm', cards: 6, mult: { gift: 0.7, mire: 1.5, gamble: 1.0 } },
      ],
      diff: { sprout: { gift: 1.2, mire: 0.8 }, normal: { gift: 1, mire: 1 }, sage: { gift: 0.8, mire: 1.2 }, annals: { gift: 0.7, mire: 1.3 } },
      gambleWin: { sprout: 0.7, normal: 0.6, sage: 0.5, annals: 0.45 },
      marks: { gift: '🌸', mire: '☁', seed: '🌱' },
    },
    // 무작위 칸 뽑기 가중치 (설계서 10-2): 희귀도 · 처음 보는 카드 · 기록관 10권 이상이면 드묾·희귀 ×1.5
    deck: { rarity: { common: 1, uncommon: 0.35, rare: 0.12, legend: 0.04 }, unseen: 3, archiveBoostAt: 10, archiveBoost: 1.5 },
    // 사관 퀴즈 (설계서 4-1·9-3 결정 4): 왕이 바뀔 때 3문항, 그 가운데 교과서 밖은 많아야 1문항. 왕당 문항 풀에서 교과서 밖은 6문항까지
    quiz: { perStage: 3, outsidePerRound: 1, outsidePoolMax: 6 },
    // 돌발 이벤트 (설계서 10-13-1): 무작위 칸이 돌발로 바뀔 확률 · 한 판 최대(연쇄 포함) · 돌발 뒤 쉬는 장수 · 종류 비율
    //  chainMult 연쇄 확률에 곱함 · boxBad 상자의 나쁜 결과 확률에 더함(그만큼 좋은 결과에서 뺌) · firstCards 처음 몇 장은 돌발 없음
    //  chainAfter 연쇄가 이어지는 거리(장) · chainDepth 연쇄 최대 단계 · mindBoost 마음 카드(ET16)가 조건이 맞으면 나올 확률 배율
    events: {
      // 담임 결정 2026-10-21: 설계서 표(15·25·30·35%)의 ×1.8 — 보통 한 생 평균 약 2번(표 숫자로는 약 1번이었음)
      chance: { sprout: 0.27, normal: 0.45, sage: 0.54, annals: 0.63 },
      max: { sprout: 2, normal: 4, sage: 5, annals: 6 },
      rest: { sprout: 4, normal: 3, sage: 3, annals: 2 },
      ratio: {
        sprout: { bad: 3, good: 4, guest: 1, box: 2, mind: 1 },
        normal: { bad: 4, good: 3, guest: 1, box: 2, mind: 1 },
        sage: { bad: 4, good: 2, guest: 1, box: 2, mind: 1 },
        annals: { bad: 5, good: 2, guest: 1, box: 2, mind: 1 },
      },
      chainMult: { sprout: 0.7, normal: 1.0, sage: 1.2, annals: 1.3 },
      boxBad: { sprout: -0.1, normal: 0, sage: 0.05, annals: 0.1 },
      firstCards: 3,
      chainAfter: [3, 6],
      chainDepth: 3,
      mindBoost: { ET16: 3, ES17: 3, EJ17: 3 },
      names: { bad: '흉', good: '길', guest: '손님', box: '상자', mind: '마음', chain: '연쇄' },
    },
    // 왕의 마음 (설계서 10-13-2) — [게임 속 일]. 0~100, 숫자는 보이지 않고 붓에 먹이 차오른다
    //  up/down 오르내리는 값 · traitOdds 100에 닿았을 때 나쁜 기질이 붙을 확률(나머지는 좋은 기질) · after 굴린 뒤 마음
    //  night '무너질 듯한 밤'(나쁜 기질이 붙은 채 다시 100): 가장 나쁜 게이지의 위기 확률 ×mult, cards장 동안
    mind: {
      // 담임 결정 2026-10-21: 기질이 두 생에 1번쯤 보이게 위기 20→30, 경고 구간 한 장 2→4 (event-sim STRAT=random 보통 30생: 기질 0.47번/생, 전에는 약 0.07)
      up: { crisis: 30, badEvent: 10, boxBad: 10, warnCard: 4, realShut: 10 },
      down: { held: -10 },
      traitOdds: { sprout: 0.6, normal: 0.75, sage: 0.8, annals: 0.85 },
      after: 50,
      night: { mult: 2, cards: 3 },
      // 기질: bad 나쁨 · last 풀리는 장수 · 효과는 engine/events.js(의심 양반+ 절반 · 지침 미리보기 없음 · 성급 ×1.25 · 겁 위기 ×1.3 · 굳셈 실각 ×0.5 · 너그러움 백성− 절반)
      traits: {
        suspicious: { name: '의심 많은 왕', bad: true, last: 12, icon: '👀', tip: '양반이 오르는 효과가 절반만 올라요' },
        tired: { name: '지친 왕', bad: true, last: 12, icon: '💤', tip: '게이지 점(미리보기)이 보이지 않아요' },
        hasty: { name: '성급한 왕', bad: true, last: 12, icon: '⚡', tip: '모든 효과가 크게 출렁여요(×1.25)' },
        fearful: { name: '겁먹은 왕', bad: true, last: 12, icon: '😨', tip: '위기가 더 자주 와요(×1.3)' },
        steadfast: { name: '굳센 왕', bad: false, last: 10, icon: '🛡️', tip: '위기에서 무너질 확률이 절반이에요' },
        generous: { name: '너그러운 왕', bad: false, last: 10, icon: '🤲', tip: '백성이 내려가는 효과가 절반만 내려가요' },
      },
    },
    // 사관의 한 줄 (설계서 10-13-3): 세 장에 한 번까지. 겹치면 앞쪽(우선순위 높은 것) 하나만
    narr: {
      every: 3,
      order: ['brink', 'crisis', 'night', 'held', 'trait', 'badEvent', 'chainBad', 'box', 'big', 'warn', 'good'],
      lines: {
        big: ['붓이 떨렸다. 오늘 일은 크게 적어야겠다.', '장터 소문이 하룻밤 새 도성을 한 바퀴 돌았다.', '대신들의 얼굴빛이 한꺼번에 바뀌었다.'],
        warn: ['어딘가에서 금 가는 소리가 들렸다.', '바람이 바뀌었다. 사관은 먹을 진하게 갈았다.'],
        crisis: ['올 것이 왔다.', '궁궐 북이 세 번 울렸다. 좋은 소식일 리 없다.', '사관은 붓을 멈추고 숨을 골랐다.'],
        held: ['버텼다. 오늘 밤은 다들 다리 뻗고 자리라.', '큰 고비 하나를 넘었다. 다음 고비는 아직 모른다.'],
        badEvent: ['하늘이 먼저 시험을 냈다.'],
        chainBad: ['엎친 데 덮쳤다.'],
        good: ['드물게, 하늘이 웃었다.', '오늘만은 사관도 붓을 가볍게 놀렸다.'],
        box: ['열지 말았어야 했을까, 열기를 잘했을까.'],
        brink: ['이 장이 마지막 장이 될지도 모른다.'],
        night: ['{왕의} 방에 밤새 등불이 꺼지지 않았다.'],
      },
      // 기질이 붙을 때(설계서 표의 두 줄 + 나머지 넷은 같은 말투로 엔진 세션이 씀 — 담임 확인 필요)
      //  {왕은}·{왕의}: 그 생의 왕 이름 + 맞는 조사(engine/terms.js, 담임 결정: '임금' 대신 왕 이름)
      trait: {
        suspicious: '이번 생의 {왕은} 요즘 사람을 잘 믿지 못한다.',
        steadfast: '{왕의} 눈빛이 달라졌다. 굳센 빛이다.',
        tired: '이번 생의 {왕은} 요즘 몹시 지쳐 있다.',
        hasty: '이번 생의 {왕은} 요즘 마음이 급하다.',
        fearful: '이번 생의 {왕은} 요즘 자꾸 성벽 쪽을 돌아본다.',
        generous: '이번 생의 {왕은} 요즘 마음이 넉넉하다.',
      },
    },
    // 역사 분기 (설계서 10-10-2): 한 왕에서 다른 길은 최대 3개. 넘으면 남은 다른 길은 잠긴다
    branch: { maxPerStage: 3, fullReason: '이미 나라가 많이 흔들렸다' },
    // 진엔딩 (설계서 10-11): 다섯 왕 역사 사건(생명 사건 빼고)을 모두 실제대로. totalEvents는 10-11-4의 "46장"(다섯 왕 집필이 끝나면 데이터에서 센다)
    //  needHint 잠긴 실제 경로 이유에 붙이는 말(10-11-5): number 모자란 숫자 / gauge 게이지 이름 / none 이유 문장만
    trueEnding: {
      totalEvents: 46,
      needHint: { sprout: 'number', normal: 'gauge', sage: 'none', annals: 'none' },
      brokenText: '이번 생의 진엔딩은 멀어졌어요',
      otherEndingAlts: 5,
    },
    // 난이도 (설계서 10-7). 역사·카드 순서·「실제 역사」는 난이도와 무관하고, 숫자와 도움말만 바뀐다.
    //  mult 게이지 변화 배율 · safe 안전 구간(이 값 아래/100−값 위에서 실각 쪽 변화에 k를 곱함)
    //  warn 위험 경고(이 값 이하·100−값 이상에서 깜빡임) · preview 미리보기 · carry 다음 왕이 이어받는 몫
    //  quizOptions 보기 수 · quizRetry 틀리면 한 번 더 · quizBonus 정답 하나당 50 쪽으로 당김
    //  afterFall 실각 뒤(reset50 처음 3장 큰 미리보기 / same 그대로). 판 = 왕 하나라 모두 그 왕 처음부터(담임 결정 2026-10-21)
    //  carry·quizBonus: 왕끼리 이어지지 않게 되어(담임 결정 2026-10-21) 엔진이 쓰지 않는다 — 퀴즈는 그 왕의 별로 남는다
    //  hint 사관의 귀띔(full / gauge / none) · stage 왕별 장치 숫자(P1~P4에서 씀) · unlock 열리는 때
    //  desc 난이도 고르기 화면의 한 줄 설명
    //  담임 결정(2026-10-21): 생애 첫 판은 무조건 새싹, 왕 하나라도 클리어하면 모든 난이도가 열림(unlock.rule 'clearAny')
    //  scoreMult 오늘의 덱 점수 배율 — 담임 결정(9-3 #3)으로 "나중 후보". 엔진은 쓰지 않는다(서버·점수 경쟁 없음, 기기 저장 + 기록 코드만)
    difficultyDefault: 'normal',
    difficulty: {
      sprout: {
        name: '새싹', icon: '🌱', desc: '게이지가 천천히 움직이고, 어느 쪽이 얼마나 움직일지 화살표로 미리 보여요',
        mult: 0.6, safe: { below: 20, k: 0.5 }, warn: 25, preview: 'arrows', carry: 0.25,
        quizOptions: 3, quizRetry: true, quizBonus: 8, afterFall: 'reset50', hint: 'full', rareMult: 1.0, scoreMult: 0.7, crisisMult: 0.5,
        stage: { warCost: 0, food: 8, starvePeople: -3, scaleFall: 6, shipThreat: -10, sejongTriggers: [1, 2, 4] },
      },
      normal: {
        name: '보통', icon: '🙂', desc: '기본 난이도. 움직일 게이지를 점 크기로 미리 보여요',
        mult: 1.0, safe: { below: 10, k: 0.75 }, warn: 15, preview: 'dots', carry: 0.5,
        quizOptions: 3, quizRetry: false, quizBonus: 5, afterFall: 'same', hint: 'gauge', rareMult: 1.0, scoreMult: 1.0, crisisMult: 1.0,
        stage: { warCost: -1, food: 6, starvePeople: -5, scaleFall: 5, shipThreat: -15, sejongTriggers: [2, 3, 5] },
        unlock: { rule: 'clearAny', text: '왕 하나를 클리어하면 열려요' },
      },
      sage: {
        name: '성군', icon: '👑', desc: '게이지가 크게 움직이고, 미리보기는 크기 없는 점만',
        mult: 1.3, safe: null, warn: 10, preview: 'flat', carry: 0.75,
        quizOptions: 4, quizRetry: false, quizBonus: 5, afterFall: 'same', hint: 'none', rareMult: 1.2, scoreMult: 1.3, crisisMult: 1.3,
        stage: { warCost: -2, food: 5, starvePeople: -8, scaleFall: 4, shipThreat: -20, sejongTriggers: [2, 4, 6] },
unlock: { rule: 'clearAny', text: '왕 하나를 클리어하면 열려요' },
      },
      annals: {
        name: '실록 도전', icon: '📜', desc: '미리보기·경고 없음. 실각하면 생 전체를 처음부터',
        mult: 1.5, safe: null, warn: 0, preview: 'none', carry: 0.75,
        quizOptions: 4, quizRetry: false, quizBonus: 3, afterFall: 'same', hint: 'none', rareMult: 1.5, scoreMult: 1.6, crisisMult: 1.5,
        stage: { warCost: -2, food: 5, starvePeople: -8, scaleFall: 4, shipThreat: -20, sejongTriggers: [2, 4, 6] },
unlock: { rule: 'clearAny', text: '왕 하나를 클리어하면 열려요' },
      },
    },
  };
})();
