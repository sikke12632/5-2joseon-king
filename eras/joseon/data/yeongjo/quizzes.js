/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.quizzes.push(...[
 {
  "id": "QY01",
  "stage": "yeongjo",
  "question": "1742년 성균관 앞에 탕평비를 세운 왕은?",
  "answer": "영조",
  "wrong": [
   "세종",
   "고종"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94 연표)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY02",
  "stage": "yeongjo",
  "question": "수원에 화성을 쌓은 왕은?",
  "answer": "정조",
  "wrong": [
   "태조",
   "선조"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY03",
  "stage": "yeongjo",
  "question": "수원 화성 공사에서 도르래로 무거운 돌을 들어 올린 기구는?",
  "answer": "거중기",
  "wrong": [
   "측우기",
   "자명종"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "지도서 282, 288",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY04",
  "stage": "yeongjo",
  "question": "수원 화성 공사에 나온 백성들은 나라에서 무엇을 받았을까요?",
  "answer": "일한 값인 품삯",
  "wrong": [
   "양반 신분",
   "과거 합격증"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "지도서 282 참고 자료",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY05",
  "stage": "yeongjo",
  "question": "조선 후기 전국에서 널리 쓰인 동전 이름은?",
  "answer": "상평통보",
  "wrong": [
   "당백전",
   "척화비"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y07"
  ]
 },
 {
  "id": "QY06",
  "stage": "yeongjo",
  "question": "조선 후기의 장시는 보통 며칠마다 열렸을까요?",
  "answer": "5일마다",
  "wrong": [
   "하루도 빠짐없이 날마다",
   "1년에 한 번"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y07"
  ]
 },
 {
  "id": "QY07",
  "stage": "yeongjo",
  "question": "실학자 박지원이 주장한 것으로 알맞은 것은?",
  "answer": "청의 문물을 받아들여 상공업을 키우자",
  "wrong": [
   "외국과의 교류를 모두 끊자",
   "모든 백성이 과거를 보게 하자"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "286",
    "tb": "98"
   }
  ],
  "sources_text": "지도서 286(교과서 98)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY08",
  "stage": "yeongjo",
  "question": "상인 김만덕이 제주에서 한 일로 알맞은 것은?",
  "answer": "장사로 번 돈으로 쌀을 사서 굶는 백성에게 나누었다",
  "wrong": [
   "제주에 첫 서당을 세웠다",
   "배를 만들어 일본과 싸웠다"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "287",
    "tb": "99"
   }
  ],
  "sources_text": "지도서 287(교과서 99)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY09",
  "stage": "yeongjo",
  "question": "조선 후기에 천민이 점점 줄어든 것은 왜일까요?",
  "answer": "상민으로 신분이 오른 천민이 많아져서",
  "wrong": [
   "천민이 모두 다른 나라로 떠나서",
   "나라에서 천민을 양반으로 뽑아서"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y07"
  ]
 },
 {
  "id": "QY10",
  "stage": "yeongjo",
  "question": "수원 화성의 정문 장안문이 남문이 아닌 북문인 까닭은?",
  "answer": "왕이 한양에서 올 때 먼저 만나는 문이어서",
  "wrong": [
   "북쪽에 바다가 있어서",
   "남쪽 문은 짓지 않아서"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94 사진 설명·자료 해설)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY11",
  "stage": "yeongjo",
  "question": "<서당>, <벼 타작> 같은 풍속화를 그린 화가는?",
  "answer": "김홍도",
  "wrong": [
   "정약용",
   "박지원"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "293"
   }
  ],
  "sources_text": "지도서 293, 295",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY12",
  "stage": "yeongjo",
  "question": "돈을 받고 한글 소설책을 빌려주던 가게는?",
  "answer": "세책점",
  "wrong": [
   "시전",
   "향교"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY13",
  "stage": "yeongjo",
  "question": "조선 후기에 사람들에게 소설을 읽어 주던 직업은?",
  "answer": "전기수",
  "wrong": [
   "역관",
   "화원"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY14",
  "stage": "yeongjo",
  "question": "영조의 균역법으로 백성이 내던 군포는 어떻게 바뀌었을까요?",
  "answer": "2필에서 1필로 줄었다",
  "wrong": [
   "1필에서 2필로 늘었다",
   "군포가 쌀로 바뀌었다"
  ],
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '균역법'",
    "url": "https://encykorea.aks.ac.kr/Article/E0007303"
   }
  ],
  "sources_text": "백과(Y03)",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "Y03"
  ]
 },
 {
  "id": "QY15",
  "stage": "yeongjo",
  "question": "정조가 창덕궁 안에 세워 학자들이 연구하게 한 곳은?",
  "answer": "규장각",
  "wrong": [
   "집현전",
   "우정총국"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   },
   {
    "type": "web",
    "title": "규장각: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0007273"
   }
  ],
  "sources_text": "백과(Y05)",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "Y05"
  ]
 }
]);
})();
