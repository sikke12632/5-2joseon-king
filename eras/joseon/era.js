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
        dailyGap: [0, 2], // 역사 카드 사이에 끼는 일상 카드 수(무작위 최소~최대)
        realEnd: '실제로 태조는 1398년까지 왕위에 있었다.',
        tutorial: 3, // 처음 세 장은 손 모양 안내
      },
      { id: 'sejong', king: '세종', seal: '世宗', title: '발명 진행도', years: '1418~1450', ready: false },
      { id: 'seonjo', king: '선조·인조', seal: '宣祖', title: '전쟁 버티기', years: '1567~1649', ready: false },
      { id: 'yeongjo', king: '영조·정조', seal: '英祖', title: '붕당 저울', years: '1724~1800', ready: false },
      { id: 'gojong', king: '고종', seal: '高宗', title: '개항 압력', years: '1863~1899', ready: false },
    ],
    data: D,
  };
})();
