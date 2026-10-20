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
        realEnd: '실제로 태조는 1398년까지 왕위에 있었다.',
        tutorial: 3, // 처음 세 장은 손 모양 안내
      },
      { id: 'sejong', king: '세종', seal: '世宗', title: '발명 진행도', years: '1418~1450', ready: false },
      { id: 'seonjo', king: '선조·인조', seal: '宣祖', title: '전쟁 버티기', years: '1567~1649', ready: false },
      { id: 'yeongjo', king: '영조·정조', seal: '英祖', title: '붕당 저울', years: '1724~1800', ready: false },
      { id: 'gojong', king: '고종', seal: '高宗', title: '개항 압력', years: '1863~1899', ready: false },
    ],
    data: D,
    // 게이지 위기 (설계서 10-8 — 지금 숫자는 임시. 10-8이 나오면 그 표로 바꾼다)
    //  zones: 낮음 ≤warn 경고, ≤danger 위험 (높음은 100에서 같은 거리)
    //  chance: 그 구간에 있을 때 카드마다 위기 카드가 끼어들 확률(난이도 crisisMult를 곱함)
    //  rest: 위기 카드 뒤 쉬는 장수 · alerts: 구간에 처음 들어설 때 뜨는 짧은 알림
    //  scenes: 세계 반응(사람 무리·깃발·연기·봉수 불·불빛). 자리는 map.js crisis. 폭력 장면 없음
    crisis: {
      zones: { warn: 25, danger: 12 },
      chance: { warn: 0.15, danger: 0.35 },
      rest: 3,
      alerts: {
        people: { low: { warn: '백성들의 불만이 커지고 있사옵니다.', danger: '백성들이 궁궐 앞에 모였사옵니다!' }, high: { warn: '백성의 청만 쌓이고 있사옵니다.', danger: '잔치 소리에 나랏일이 멈추었사옵니다!' } },
        nobles: { low: { warn: '대신들이 하나둘 등을 돌리옵니다.', danger: '대신들이 벼슬을 내던지고 떠나옵니다!' }, high: { warn: '대신들의 목소리가 너무 커지옵니다.', danger: '대신들이 궁궐 마당을 메웠사옵니다!' } },
        treasury: { low: { warn: '곳간이 비어 가옵니다.', danger: '곳간이 바닥나 마을 불빛이 꺼져 가옵니다!' }, high: { warn: '곳간만 차고 쓰이지 않사옵니다.', danger: '곳간을 노리는 관리들이 모였사옵니다!' } },
        army: { low: { warn: '성을 지킬 군사가 줄고 있사옵니다.', danger: '산마다 봉수 불이 올랐사옵니다!' }, high: { warn: '장수들의 힘이 커지고 있사옵니다.', danger: '군사들이 도성 문 앞에 늘어섰사옵니다!' } },
      },
      scenes: {
        people: {
          low: {
            warn: { crowds: [{ at: 'gate', n: 6, face: 'gyeongbok', flags: 2, flag: '#f4f0e4', clothes: ['#ece4d2', '#e3dccb'] }] },
            danger: { crowds: [{ at: 'gate', n: 14, face: 'gyeongbok', flags: 5, flag: '#f4f0e4', clothes: ['#ece4d2', '#e3dccb', '#ddd2bb'] }], smoke: ['fields'] },
          },
          high: {
            warn: { crowds: [{ at: 'street', n: 6, mode: 'hop', flags: 2, flag: '#e98f8f', clothes: ['#f2c86b', '#e98f8f', '#9cc9a8'] }] },
            danger: { crowds: [{ at: 'street', n: 12, mode: 'hop', flags: 4, flag: '#f2c86b', clothes: ['#f2c86b', '#e98f8f', '#9cc9a8'] }] },
          },
        },
        nobles: {
          low: { warn: { processions: [{ path: 'leave', n: 4, clothes: ['#d7e8e0', '#e9eef0'] }] }, danger: { processions: [{ path: 'leave', n: 9, clothes: ['#d7e8e0', '#e9eef0', '#c9dcea'] }] } },
          high: {
            warn: { crowds: [{ at: 'yard', n: 6, face: 'gyeongbok', flags: 2, flag: '#3d5e8c', clothes: ['#3d5e8c', '#9a3d3a'] }] },
            danger: { crowds: [{ at: 'yard', n: 12, face: 'gyeongbok', flags: 4, flag: '#3d5e8c', clothes: ['#3d5e8c', '#9a3d3a', '#3f7a62'] }] },
          },
        },
        treasury: {
          low: { warn: { lights: 0.45 }, danger: { lights: 0.1 } },
          high: { warn: { crowds: [{ at: 'street', n: 5, face: 'gyeongbok', flags: 1, flag: '#d8b64e', clothes: ['#3d5e8c', '#9a3d3a'] }] }, danger: { crowds: [{ at: 'street', n: 10, face: 'gyeongbok', flags: 3, flag: '#d8b64e', clothes: ['#3d5e8c', '#9a3d3a'] }] } },
        },
        army: {
          low: { warn: { beacons: 1 }, danger: { beacons: 3 } },
          high: {
            warn: { crowds: [{ at: 'southGate', n: 6, face: 'gyeongbok', flags: 2, flag: '#b23b30', clothes: ['#4a4a55'] }] },
            danger: { crowds: [{ at: 'southGate', n: 12, face: 'gyeongbok', flags: 4, flag: '#b23b30', clothes: ['#4a4a55', '#3a3a44'] }] },
          },
        },
      },
    },
    // 난이도 (설계서 10-7). 역사·카드 순서·「실제 역사」는 난이도와 무관하고, 숫자와 도움말만 바뀐다.
    //  mult 게이지 변화 배율 · safe 안전 구간(이 값 아래/100−값 위에서 실각 쪽 변화에 k를 곱함)
    //  warn 위험 경고(이 값 이하·100−값 이상에서 깜빡임) · preview 미리보기 · carry 다음 왕이 이어받는 몫
    //  quizOptions 보기 수 · quizRetry 틀리면 한 번 더 · quizBonus 정답 하나당 50 쪽으로 당김
    //  afterFall 실각 뒤(reset50 시작 게이지 50 + 처음 3장 큰 미리보기 / same 그대로 / run 판 전체 처음부터)
    //  hint 사관의 귀띔(full / gauge / none) · stage 왕별 장치 숫자(P1~P4에서 씀) · unlock 열리는 때
    difficultyDefault: 'normal',
    difficulty: {
      sprout: {
        name: '새싹', icon: '🌱', mult: 0.6, safe: { below: 20, k: 0.5 }, warn: 25, preview: 'arrows', carry: 0.25,
        quizOptions: 3, quizRetry: true, quizBonus: 8, afterFall: 'reset50', hint: 'full', rareMult: 1.0, scoreMult: 0.7, crisisMult: 0.5,
        stage: { warCost: 0, food: 8, starvePeople: -3, scaleFall: 6, shipThreat: -10, sejongTriggers: [1, 2, 4] },
      },
      normal: {
        name: '보통', icon: '🙂', mult: 1.0, safe: { below: 10, k: 0.75 }, warn: 15, preview: 'dots', carry: 0.5,
        quizOptions: 3, quizRetry: false, quizBonus: 5, afterFall: 'same', hint: 'gauge', rareMult: 1.0, scoreMult: 1.0, crisisMult: 1.0,
        stage: { warCost: -1, food: 6, starvePeople: -5, scaleFall: 5, shipThreat: -15, sejongTriggers: [2, 3, 5] },
      },
      sage: {
        name: '성군', icon: '👑', mult: 1.3, safe: null, warn: 10, preview: 'flat', carry: 0.75,
        quizOptions: 4, quizRetry: false, quizBonus: 5, afterFall: 'same', hint: 'none', rareMult: 1.2, scoreMult: 1.3, crisisMult: 1.3,
        stage: { warCost: -2, food: 5, starvePeople: -8, scaleFall: 4, shipThreat: -20, sejongTriggers: [2, 4, 6] },
        unlock: { rule: 'fullRunNormal', text: '보통으로 한 판 끝내면 열려요' },
      },
      annals: {
        name: '실록 도전', icon: '📜', mult: 1.5, safe: null, warn: 0, preview: 'none', carry: 0.75,
        quizOptions: 4, quizRetry: false, quizBonus: 3, afterFall: 'run', hint: 'none', rareMult: 1.5, scoreMult: 1.6, crisisMult: 1.5,
        stage: { warCost: -2, food: 5, starvePeople: -8, scaleFall: 4, shipThreat: -20, sejongTriggers: [2, 4, 6] },
        unlock: { rule: 'archive30', text: '기록관 30권이 쌓이면 열려요' },
      },
    },
  };
})();
