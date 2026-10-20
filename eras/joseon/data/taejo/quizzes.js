/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.quizzes.push(...[
 {
  "id": "QT01",
  "stage": "taejo",
  "question": "이성계가 새 나라 조선을 세운 해는 언제일까요?",
  "answer": "1392년",
  "wrong": [
   "1394년",
   "1446년"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 연표)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT02",
  "stage": "taejo",
  "question": "조선이 한강 북쪽의 한양에 도읍을 정한 까닭으로 알맞은 것은?",
  "answer": "강과 바닷길로 짐을 실어 나르기 좋아서",
  "wrong": [
   "산이 하나도 없는 넓은 들판이어서",
   "고려의 도읍이 있던 곳이어서"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT03",
  "stage": "taejo",
  "question": "경복궁 동쪽에 지어 조선의 왕과 왕비를 위해 제사를 지낸 곳은?",
  "answer": "종묘",
  "wrong": [
   "사직단",
   "성균관"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT04",
  "stage": "taejo",
  "question": "경복궁 서쪽에 두고 토지의 신과 곡식의 신에게 제사를 지낸 곳은?",
  "answer": "사직단",
  "wrong": [
   "종묘",
   "향교"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT05",
  "stage": "taejo",
  "question": "숭례문의 ‘례(禮)’ 자에 담긴 뜻은 무엇일까요?",
  "answer": "예의 바름",
  "wrong": [
   "어짊",
   "옳음"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT06",
  "stage": "taejo",
  "question": "한양 도성의 동쪽 큰 문으로, ‘어짊(인)’의 뜻을 담은 문은?",
  "answer": "흥인지문",
  "wrong": [
   "돈의문",
   "숭례문"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT07",
  "stage": "taejo",
  "question": "‘경복궁’이라는 이름에 담긴 바람은 무엇일까요?",
  "answer": "덕으로 다스려 오래도록 큰 복을 누리기",
  "wrong": [
   "군사를 길러 이웃 나라를 이기기",
   "바다 건너 먼 나라와 장사하기"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT08",
  "stage": "taejo",
  "question": "한양 도성의 성곽은 무엇을 따라 쌓았을까요?",
  "answer": "한양을 둘러싼 산줄기",
  "wrong": [
   "한강의 물줄기",
   "바닷가 모래밭"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT09",
  "stage": "taejo",
  "question": "오늘날의 대학교에 해당하는, 한양에 있던 조선의 최고 교육 기관은?",
  "answer": "성균관",
  "wrong": [
   "서당",
   "향교"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT10",
  "stage": "taejo",
  "question": "고려 말에 나라 살림이 나빠진 까닭으로 알맞은 것은?",
  "answer": "몇몇 세력이 땅과 노비를 지나치게 많이 가져서",
  "wrong": [
   "농사짓는 법을 모두 잊어버려서",
   "바다에 큰 섬이 새로 생겨서"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT13",
  "stage": "taejo",
  "question": "조선 시대 사람들이 부모님 장례를 치른 뒤 3년 동안 무덤을 지킨 것은 무엇을 실천한 것일까요?",
  "answer": "효",
  "wrong": [
   "충",
   "신"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QT11",
  "stage": "taejo",
  "question": "1398년 군사를 일으켜 정도전 세력을 무너뜨린 태조의 아들은?",
  "answer": "이방원",
  "wrong": [
   "정몽주",
   "유성룡"
  ],
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정종'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050884"
   }
  ],
  "sources_text": "실록·백과(왕자의 난) — 설계서 T09",
  "out_of_textbook": true,
  "checked_against_review_site": false
 },
 {
  "id": "QT12",
  "stage": "taejo",
  "question": "1393년 정해진 새 나라 이름 ‘조선’과 함께 명에 적어 보냈던 다른 후보 이름은?",
  "answer": "화령",
  "wrong": [
   "고려",
   "한양"
  ],
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 11월 29일",
    "url": "https://sillok.history.go.kr/id/kaa_10111029_001"
   },
   {
    "type": "web",
    "title": "태조 2년 2월 15일",
    "url": "https://sillok.history.go.kr/id/kaa_10202015_001"
   }
  ],
  "sources_text": "조선왕조실록(T03)",
  "out_of_textbook": true,
  "checked_against_review_site": false
 }
]);
})();
