/* data/quizzes.js — 사관 퀴즈 (3지선다: answer 하나 + wrong 둘)
 * ※ 지금은 설계서 초안에서 옮긴 임시 문항(temp: true). 설계서 v2 문항으로 바뀐다.
 */
(function () {
  'use strict';
  const Q = window.JK.eraData.quizzes;
  Q.push(
    { id: 'QX1', stage: 'taejo', temp: true, q: '이성계가 새 나라 조선을 세운 해는 언제일까요?', answer: '1392년', wrong: ['1394년', '1446년'], source: [{ book: '지도서', page: '232', tb: '74' }] },
    { id: 'QX2', stage: 'taejo', temp: true, q: '경복궁 동쪽에 지어 조선의 왕과 왕비를 위해 제사를 지낸 곳은?', answer: '종묘', wrong: ['사직단', '성균관'], source: [{ book: '지도서', page: '233', tb: '75' }] },
    { id: 'QX3', stage: 'taejo', temp: true, q: '숭례문의 ‘례(禮)’ 자에 담긴 뜻은 무엇일까요?', answer: '예의 바름', wrong: ['어짊', '옳음'], source: [{ book: '지도서', page: '233', tb: '75' }] },
    { id: 'QX4', stage: 'taejo', temp: true, q: '한양 도성의 성곽은 무엇을 따라 쌓았을까요?', answer: '한양을 둘러싼 산줄기', wrong: ['한강의 물줄기', '바닷가 모래밭'], source: [{ book: '지도서', page: '233', tb: '75' }] }
  );
})();
