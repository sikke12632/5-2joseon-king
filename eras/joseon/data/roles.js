/* data/roles.js — 카드에 나오는 인물 인형 (모자·옷·소품으로만 구분, 얼굴·몸은 모두 같다)
 * id: 카드의 who 값. name: 카드에 뜨는 이름(카드에서 whoName으로 바꿀 수 있다). tag: 이름 옆 작은 띠.
 * hat: models.js HATS 키. items: ITEMS 키 목록. bg: 초상화 배경색.
 */
(function () {
  'use strict';
  const R = window.JK.eraData.roles;
  Object.assign(R, {
    sagwan: { name: '사관', tag: '기록', cloth: '#3f5a73', trim: '#22303f', hat: 'samo', items: ['gakdae', 'scroll'], bg: '#d9cdb4' },
    taejo: { name: '태조', tag: '임금', cloth: '#c3322c', trim: '#e2b64c', hat: 'ikseongwan', items: ['bo', 'okdae'], bg: '#efcf7a' },
    jeong: { name: '정도전', tag: '신하', cloth: '#8d2f39', trim: '#2b2b30', hat: 'samo', items: ['gakdae', 'hol'], bg: '#9cc7b4' },
    yangban: { name: '양반 관리', tag: '양반', cloth: '#cfe4dc', trim: '#b2423e', hat: 'gat', items: ['sejodae', 'fan'], bg: '#b3cde0' },
    farmer: { name: '농민', tag: '백성', cloth: '#ece4d2', trim: '#c9b48a', hat: 'towel', items: ['belt', 'rice'], bg: '#c3d98f' },
    merchant: { name: '상인', tag: '백성', cloth: '#a2714a', trim: '#e8dcc3', hat: 'paeraengi', items: ['cotton', 'bundle'], bg: '#ecc192' },
  });
})();
