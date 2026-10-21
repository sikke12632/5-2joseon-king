/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.quizzes.push(...[
 {
  "id": "QS01",
  "stage": "sejong",
  "question": "세종이 만든 훈민정음은 처음에 모두 몇 글자였을까요?",
  "answer": "스물여덟 글자",
  "wrong": [
   "스물네 글자",
   "천 글자"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "262",
    "tb": "88"
   }
  ],
  "sources_text": "지도서 262(교과서 88)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S09"
  ]
 },
 {
  "id": "QS02",
  "stage": "sejong",
  "question": "훈민정음이 한자보다 백성이 배우기 쉬웠던 까닭은?",
  "answer": "말소리를 그대로 옮겨 적는 글자여서",
  "wrong": [
   "글자 수가 한자보다 많아서",
   "중국 글자와 모양이 같아서"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "262",
    "tb": "88"
   }
  ],
  "sources_text": "지도서 262(교과서 88)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S09"
  ]
 },
 {
  "id": "QS03",
  "stage": "sejong",
  "question": "훈민정음을 세상에 널리 알린(반포한) 해는?",
  "answer": "1446년",
  "wrong": [
   "1392년",
   "1592년"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "262",
    "tb": "88"
   }
  ],
  "sources_text": "지도서 262(교과서 88 연표)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S09"
  ]
 },
 {
  "id": "QS04",
  "stage": "sejong",
  "question": "훈민정음 반포를 반대한 양반들의 생각으로 알맞은 것은?",
  "answer": "중국과 다른 글자를 쓰면 학문이 뒤처진다",
  "wrong": [
   "글자가 너무 많아 외우기 어렵다",
   "백성은 이미 한자를 잘 안다"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263 유의점",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S02",
   "S09"
  ]
 },
 {
  "id": "QS05",
  "stage": "sejong",
  "question": "원통 모양 그릇에 빗물을 받아 비가 온 양을 잰 기구는?",
  "answer": "측우기",
  "wrong": [
   "혼천의",
   "자격루"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS06",
  "stage": "sejong",
  "question": "해와 달, 별의 움직임을 살펴 계절의 변화를 알려고 만든 기구는?",
  "answer": "혼천의",
  "wrong": [
   "측우기",
   "앙부일구"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS07",
  "stage": "sejong",
  "question": "물의 흐름을 이용해 스스로 시각을 알린 물시계는?",
  "answer": "자격루",
  "wrong": [
   "혼천의",
   "측우기"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS08",
  "stage": "sejong",
  "question": "앙부일구를 종로처럼 사람이 많이 다니는 거리에 둔 까닭은?",
  "answer": "더 많은 백성이 시각을 알 수 있게 하려고",
  "wrong": [
   "궁궐 사람만 몰래 보려고",
   "다른 나라 사신에게 팔려고"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "지도서 267, 274 주제 평가",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS09",
  "stage": "sejong",
  "question": "세종 때 압록강과 두만강 유역에 설치해 영토를 넓힌 것은?",
  "answer": "4군 6진",
  "wrong": [
   "한양 도성",
   "남한산성"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S01",
   "S04"
  ]
 },
 {
  "id": "QS10",
  "stage": "sejong",
  "question": "세종 때 왜구의 근거지를 정벌한 섬은?",
  "answer": "쓰시마섬",
  "wrong": [
   "강화도",
   "제주도"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S01",
   "S04"
  ]
 },
 {
  "id": "QS11",
  "stage": "sejong",
  "question": "세종 때 과학 기구를 많이 만든 가장 큰 까닭은?",
  "answer": "계절과 날씨를 정확히 알아 농사를 도우려고",
  "wrong": [
   "전쟁에서 이기는 무기를 만들려고",
   "궁궐을 화려하게 꾸미려고"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS12",
  "stage": "sejong",
  "question": "조선 전기 양반들이 검소함을 생각해 화려한 청자 대신 쓴 그릇은?",
  "answer": "분청사기와 백자",
  "wrong": [
   "금과 은으로 만든 그릇",
   "유리그릇"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S02",
   "S09"
  ]
 },
 {
  "id": "QS13",
  "stage": "sejong",
  "question": "자격루를 만든 장영실은 원래 어떤 신분이었을까요?",
  "answer": "관청에 속한 노비",
  "wrong": [
   "왕의 친척",
   "이웃 나라 왕자"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   },
   {
    "type": "guide",
    "page": "267"
   },
   {
    "type": "web",
    "title": "인형이 시각을 알림: 한국민족문화대백과사전 '자격루'",
    "url": "https://encykorea.aks.ac.kr/Article/E0047854"
   },
   {
    "type": "web",
    "title": "장영실의 신분:",
    "url": "https://encykorea.aks.ac.kr/Article/E0048697"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30"
   }
  ],
  "sources_text": "백과·우리역사넷(S06)",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "S06"
  ]
 },
 {
  "id": "QS14",
  "stage": "sejong",
  "question": "세종이 새 세금법을 정하기 전에 찬반을 물은 사람은 약 몇 명일까요?",
  "answer": "약 17만 명",
  "wrong": [
   "약 100명",
   "약 1,000만 명"
  ],
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 세종 12년 8월 10일",
    "url": "https://sillok.history.go.kr/id/kda_11208010_005"
   }
  ],
  "sources_text": "조선왕조실록(S03)",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "S03"
  ]
 }
]);
})();
