/* data/roles.js — 카드 인물 인형 (설계서 7-3: 신분은 모자·옷·소품으로만 구분, 얼굴·몸은 모두 같다)
 * 카드의 who = 아래 id. 카드마다 이름은 whoName으로 따로 뜬다(예: '도읍 터를 살핀 신하').
 * hat·items: eras/joseon/models.js 의 HATS·ITEMS. tag: 이름 옆 작은 띠. bg: 초상화 배경색.
 */
(function () {
  'use strict';
  const R = window.JK.eraData.roles;
  Object.assign(R, {
    // 임금과 기록
    taejo: { name: '태조', tag: '임금', cloth: '#c3322c', trim: '#e2b64c', hat: 'ikseongwan', items: ['bo', 'okdae'], bg: '#efcf7a' },
    sagwan: { name: '사관', tag: '기록', cloth: '#3f5a73', trim: '#22303f', hat: 'samo', items: ['gakdae', 'scroll'], bg: '#d9cdb4' },
    // 관리: 사모 + 단령(관복) + 홀
    jeong: { name: '정도전', tag: '관리', cloth: '#8d2f39', trim: '#2b2b30', hat: 'samo', items: ['gakdae', 'hol'], bg: '#9cc7b4' },
    bangwon: { name: '이방원', tag: '왕자', cloth: '#34507a', trim: '#d8b64e', hat: 'samo', items: ['gakdae'], bg: '#c9b6d8' },
    official_blue: { name: '신하', tag: '관리', cloth: '#3d5e8c', trim: '#26303e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#b3cde0' },
    official_green: { name: '신하', tag: '관리', cloth: '#3f7a62', trim: '#26303e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#c6dcb0' },
    official_red: { name: '신하', tag: '관리', cloth: '#9a3d3a', trim: '#26303e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#e8c7a8' },
    naegwan: { name: '내관', tag: '궁궐', cloth: '#5c5470', trim: '#2b2b30', hat: 'samo', items: ['gakdae'], bg: '#d6cbe3' },
    // 양반·선비·유생: 검은 갓 + 도포 + 책·부채
    yangban: { name: '양반', tag: '양반', cloth: '#cfe4dc', trim: '#b2423e', hat: 'gat', items: ['sejodae', 'fan'], bg: '#b8d4c8' },
    yusaeng: { name: '유생', tag: '유생', cloth: '#f1ede2', trim: '#3f5a73', hat: 'gat', items: ['sejodae', 'book'], bg: '#d8d0b8' },
    // 중인: 갓 + 수수한 도포 + 붓
    jungin: { name: '중인', tag: '중인', cloth: '#a9b3bd', trim: '#5c6670', hat: 'gat', items: ['sejodae', 'brush'], bg: '#c5d0d9' },
    // 상민·천민: 흰 무명 바지저고리
    farmer: { name: '농민', tag: '상민', cloth: '#ece4d2', trim: '#c9b48a', hat: 'towel', items: ['belt', 'rice'], bg: '#c3d98f' },
    merchant: { name: '상인', tag: '상민', cloth: '#a2714a', trim: '#e8dcc3', hat: 'paeraengi', items: ['cotton', 'bundle'], bg: '#ecc192' },
    nobi: { name: '노비', tag: '천민', cloth: '#e3dccb', trim: '#b8a98a', hat: 'topknot', items: ['belt', 'broom'], bg: '#d9cfb8' },
    // 궁궐 여성·아이
    courtlady: { name: '상궁', tag: '궁궐', cloth: '#5f8f6a', trim: '#d8b64e', hat: 'bun', items: [], bg: '#efd2c4' },
    child: { name: '아이', tag: '아이', cloth: '#f2e6c4', trim: '#c0392b', hat: 'braid', items: ['book'], bg: '#f2dc9a' },
    // 태조 추가 집필(add_T.py DOLL_T): 이름 있는 신하는 사모·관복 색으로, 장수는 투구·갑옷, 승려는 장삼·가사
    haryun: { name: '하륜', tag: '관리', cloth: '#7a3242', trim: '#26303e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#e2c3c8' },
    gwongeun: { name: '권근', tag: '관리', cloth: '#2f5d7a', trim: '#26303e', hat: 'samo', items: ['gakdae', 'book'], bg: '#bcd3e3' },
    baegeuk: { name: '배극렴', tag: '관리', cloth: '#8a4a2a', trim: '#26303e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#ead2b8' },
    jojun: { name: '조준', tag: '관리', cloth: '#4a3d73', trim: '#26303e', hat: 'samo', items: ['gakdae', 'scroll'], bg: '#d2cbe6' },
    jeongmongju: { name: '정몽주', tag: '관리', cloth: '#2f6a5a', trim: '#d8b64e', hat: 'samo', items: ['gakdae', 'hol'], bg: '#c7e0d2' },
    idoran: { name: '이두란', tag: '장수', cloth: '#6a3a2a', trim: '#c99a2e', hat: 'helmet', items: ['armor', 'bow'], bg: '#e3c9a3' },
    general: { name: '장수', tag: '장수', cloth: '#3f4a5a', trim: '#c99a2e', hat: 'helmet', items: ['armor'], bg: '#c9d2dc' },
    muhak: { name: '무학', tag: '승려', cloth: '#8b8a86', trim: '#a8382e', hat: 'shaved', items: ['kasaya', 'beads'], bg: '#dcd6c8' },
    jurchen: { name: '여진 추장', tag: '이웃', cloth: '#a07a52', trim: '#5b4130', hat: 'furhat', items: ['furcoat', 'belt'], bg: '#e2d0b4' },
    craftsman: { name: '장인', tag: '상민', cloth: '#d9cfb8', trim: '#8a6a48', hat: 'paeraengi', items: ['belt', 'hammer'], bg: '#d8c9a6' },
  });
})();
