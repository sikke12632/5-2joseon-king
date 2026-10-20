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
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T08"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T09"
  ]
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
  "checked_against_review_site": false,
  "about": [
   "T03"
  ]
 },
 {
  "id": "QT14",
  "stage": "taejo",
  "question": "고려 말, 이성계와 같은 무인 세력은 어떤 일로 힘을 키웠을까요?",
  "answer": "홍건적과 왜구의 침입을 물리쳐서",
  "wrong": [
   "바다 건너 일본을 정벌해서",
   "훈민정음을 만들어서"
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
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
 },
 {
  "id": "QT15",
  "stage": "taejo",
  "question": "조선을 세운 관리들이 따른 성리학은 무엇을 중요하게 여겼을까요?",
  "answer": "사람이 지켜야 할 바른 도리",
  "wrong": [
   "바다를 건너는 배 만드는 기술",
   "땅속에 묻힌 금을 찾는 방법"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 용어 풀이)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
 },
 {
  "id": "QT16",
  "stage": "taejo",
  "question": "조선의 수도 한양은 오늘날 어느 곳에 해당할까요?",
  "answer": "서울의 한강 북쪽 지역",
  "wrong": [
   "개성의 송악산 아래",
   "부산의 바닷가"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT17",
  "stage": "taejo",
  "question": "한양 한가운데에 지어, 왕이 살면서 나라를 다스린 궁궐은?",
  "answer": "경복궁",
  "wrong": [
   "종묘",
   "사직단"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT18",
  "stage": "taejo",
  "question": "한양 도성의 서쪽 큰 문인 돈의문에 담긴 유교 덕목은?",
  "answer": "옳음(의)",
  "wrong": [
   "어짊(인)",
   "예의 바름(예)"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT19",
  "stage": "taejo",
  "question": "한양 도성의 남쪽에 있는 큰 문은 무엇일까요?",
  "answer": "숭례문",
  "wrong": [
   "흥인지문",
   "돈의문"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT20",
  "stage": "taejo",
  "question": "‘덕목’이라는 낱말의 뜻으로 알맞은 것은?",
  "answer": "사람으로서 마땅히 갖추어야 할 성품이나 도리",
  "wrong": [
   "나라에 바치는 곡식의 양",
   "궁궐을 지키는 군사의 수"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75 용어 풀이)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT21",
  "stage": "taejo",
  "question": "한양 도성의 큰 문은 어디에 만들었을까요?",
  "answer": "성곽의 동서남북 네 방향",
  "wrong": [
   "한강 가의 나루터 한 곳",
   "경복궁 안쪽 마당"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT22",
  "stage": "taejo",
  "question": "다음 가운데 가장 먼저 일어난 일은 무엇일까요?",
  "answer": "이성계가 조선을 세웠다",
  "wrong": [
   "한양으로 수도를 옮겼다",
   "임진왜란이 일어났다"
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
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
 },
 {
  "id": "QT23",
  "stage": "taejo",
  "question": "조선이 도성을 만들 때 종묘를 지은 것은 조선이 어떤 나라임을 보여 줄까요?",
  "answer": "유교를 근본으로 한 나라",
  "wrong": [
   "불교를 가장 받든 나라",
   "바다 무역으로 먹고사는 나라"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "231"
   }
  ],
  "sources_text": "지도서 231 지도상의 유의점",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "T06"
  ]
 },
 {
  "id": "QT24",
  "stage": "taejo",
  "question": "조선이 세워지기까지의 순서로 알맞은 것은?",
  "answer": "고려 말 혼란 → 무인 세력 성장 → 조선 건국",
  "wrong": [
   "조선 건국 → 고려 말 혼란 → 무인 세력 성장",
   "무인 세력 성장 → 조선 건국 → 고려 말 혼란"
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
  "checked_against_review_site": false,
  "about": [
   "T02"
  ]
 },
 {
  "id": "QT25",
  "stage": "taejo",
  "question": "한양 도성 그림에서 북쪽 큰 문의 이름은?",
  "answer": "숙정문",
  "wrong": [
   "흥인지문",
   "숭례문"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75 그림)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT26",
  "stage": "taejo",
  "question": "성균관에서 공부한 유생이 과거에 합격하면 어떻게 되었을까요?",
  "answer": "관리가 되어 나랏일을 맡았다",
  "wrong": [
   "군대를 이끄는 장수가 되었다",
   "다른 나라로 공부하러 떠났다"
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
  "checked_against_review_site": false,
  "about": [
   "T08"
  ]
 },
 {
  "id": "QT27",
  "stage": "taejo",
  "question": "다음 가운데 한양 도성의 실제 모습과 다른 것은?",
  "answer": "한강 물가를 따라 둥글게 쌓았다",
  "wrong": [
   "한양을 둘러싼 산줄기를 따라 쌓았다",
   "네 방향에 큰 문을 두었다"
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
  "checked_against_review_site": false,
  "about": [
   "T04",
   "T05",
   "T06",
   "T07"
  ]
 },
 {
  "id": "QT28",
  "stage": "taejo",
  "question": "1394년 《조선경국전》을 지어 새 나라를 다스릴 원칙을 정리한 사람은?",
  "answer": "정도전",
  "wrong": [
   "정몽주",
   "이방원"
  ],
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷 '조선경국전'",
    "url": "https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10"
   }
  ],
  "sources_text": "우리역사넷 '조선경국전' https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10",
  "out_of_textbook": true,
  "checked_against_review_site": false
 },
 {
  "id": "QT29",
  "stage": "taejo",
  "question": "태조가 한양보다 먼저 새 도읍 공사를 시작했다가 멈춘 곳은?",
  "answer": "계룡산 아래",
  "wrong": [
   "압록강 가",
   "제주도"
  ],
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 2년 2월 13일",
    "url": "https://sillok.history.go.kr/id/kaa_10202013_001"
   },
   {
    "type": "web",
    "title": "12월 11일",
    "url": "https://sillok.history.go.kr/id/kaa_10212011_001"
   }
  ],
  "sources_text": "조선왕조실록 태조 2년 2월 13일 https://sillok.history.go.kr/id/kaa_10202013_001 · 12월 11일 https://sillok.history.go.kr/id/kaa_10212011_001",
  "out_of_textbook": true,
  "checked_against_review_site": false
 },
 {
  "id": "QT30",
  "stage": "taejo",
  "question": "경복궁 근정전의 이름에 담긴 뜻은?",
  "answer": "부지런히 나라를 다스린다",
  "wrong": [
   "날마다 큰 잔치를 연다",
   "군사를 많이 기른다"
  ],
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "out_of_textbook": true,
  "checked_against_review_site": false
 }
]);
})();
