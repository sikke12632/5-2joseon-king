/* data/records.js — 실각 기록, 칭호, 도감
 * ※ 설계서 초안 4-2·4-3에서 옮긴 임시 값(temp). 설계서 v2로 바뀐다.
 *   칭호 조건(rule)은 엔진이 아는 규칙 이름이다(engine/game.js TITLE_RULES).
 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  // 실각 기록: 게이지 0·100마다 하나
  D.falls.push(
    { id: 'people0', gauge: 'people', at: 0, name: '민심을 잃은 임금', text: '굶주린 백성들이 들고일어났다.' },
    { id: 'people100', gauge: 'people', at: 100, name: '잔치만 연 임금', text: '백성의 청만 들어주다 보니, 나랏일을 맡을 관리들이 모두 떠났다.' },
    { id: 'nobles0', gauge: 'nobles', at: 0, name: '신하 없는 임금', text: '대신들이 모두 벼슬을 내던지고 고향으로 돌아갔다.' },
    { id: 'nobles100', gauge: 'nobles', at: 100, name: '허수아비 임금', text: '힘이 너무 커진 대신들이 모든 일을 저희끼리 정했다.' },
    { id: 'treasury0', gauge: 'treasury', at: 0, name: '빈 곳간', text: '곳간이 텅 비어 관리에게 줄 녹봉도 없다.' },
    { id: 'treasury100', gauge: 'treasury', at: 100, name: '쌓아만 둔 곳간', text: '곳간을 쌓아만 두자 욕심 많은 관리들이 곳간을 노렸다.' },
    { id: 'army0', gauge: 'army', at: 0, name: '무너진 성문', text: '성을 지킬 군사가 남지 않았다.' },
    { id: 'army100', gauge: 'army', at: 100, name: '장수의 나라', text: '너무 강해진 장수들이 임금의 말을 듣지 않았다.' }
  );
  // 칭호 (태조 스테이지에서 받을 수 있는 것 일부)
  D.titles.push(
    { id: 'tightrope', name: '아슬아슬 줄타기', hint: '벼랑 끝에서 돌아온 왕', rule: 'edgeClear', temp: true },
    { id: 'quizAll', name: '사관의 단골', hint: '사관의 두루마리를 잘 읽으면', rule: 'quizPerfect', temp: true },
    { id: 'firstTry', name: '한 번에 세운 나라', hint: '한 번도 쓰러지지 않고', rule: 'noFallStage', temp: true }
  );
  // 도감: 카드를 한 번 만나면 열린다
  D.codex.push(
    { id: 'p-taejo', cat: '인물', name: '태조 이성계', opens: ['X00'], desc: '조선을 세운 첫 임금. 유교를 나라의 기본 원리로 삼았다.', temp: true },
    { id: 'b-gyeongbok', cat: '건물', name: '경복궁', opens: ['X01'], desc: '한양에 세운 조선의 궁궐.', temp: true },
    { id: 'b-jongmyo', cat: '건물', name: '종묘', opens: ['X02'], desc: '역대 왕과 왕비의 위패를 모시고 제사를 지낸 곳.', temp: true },
    { id: 'b-wall', cat: '건물', name: '한양 도성', opens: ['X03'], desc: '한양을 둘러싼 산줄기를 따라 쌓은 성.', temp: true }
  );
})();
