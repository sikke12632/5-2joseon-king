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
 },
 {
  "id": "QY16",
  "stage": "yeongjo",
  "question": "조선 후기에 미리 기른 모를 논에 옮겨 심는 농사법은?",
  "answer": "모내기법",
  "wrong": [
   "이모작",
   "상평통보"
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
  "id": "QY17",
  "stage": "yeongjo",
  "question": "같은 땅에서 한 해에 서로 다른 작물을 두 번 농사짓는 것을 무엇이라 할까요?",
  "answer": "이모작",
  "wrong": [
   "모내기법",
   "탕평"
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
  "id": "QY18",
  "stage": "yeongjo",
  "question": "조선 후기 농민들이 장에 내다 팔려고 기른 작물로 알맞은 것은?",
  "answer": "인삼, 담배, 채소",
  "wrong": [
   "쌀과 보리만",
   "목화와 비단만"
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
  "id": "QY19",
  "stage": "yeongjo",
  "question": "조선 후기 신분제의 변화로 알맞은 것은?",
  "answer": "상민 중에 양반이 되는 사람도 많이 생겼다",
  "wrong": [
   "양반이 모두 사라졌다",
   "천민의 수가 크게 늘었다"
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
  "id": "QY20",
  "stage": "yeongjo",
  "question": "김홍도의 <자리 짜기>에서 자리를 짜는 사람은 사방관을 쓴 것으로 보아 어떤 사람일까요?",
  "answer": "가난한 양반",
  "wrong": [
   "왕실의 왕자",
   "먼 나라 상인"
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
  "id": "QY21",
  "stage": "yeongjo",
  "question": "조선 후기에 들어온 서양 문물 가운데 정해진 시각이 되면 스스로 종을 울리는 시계는?",
  "answer": "자명종",
  "wrong": [
   "천리경",
   "앙부일구"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY22",
  "stage": "yeongjo",
  "question": "멀리 있는 물체를 가깝게 보는 도구로, 조선 후기에 들어온 것은?",
  "answer": "천리경",
  "wrong": [
   "자명종",
   "측우기"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY23",
  "stage": "yeongjo",
  "question": "새로운 문물이 들어오면서 조선 사람들의 생각은 어떻게 바뀌었을까요?",
  "answer": "중국 중심의 세계관에서 점차 벗어났다",
  "wrong": [
   "바다 밖 나라와 모두 교류를 끊었다",
   "중국을 더욱 세계의 한가운데로 여겼다"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY24",
  "stage": "yeongjo",
  "question": "새로운 문물과 현실 문제에 관심을 두고 연구한 조선 후기의 학문은?",
  "answer": "실학",
  "wrong": [
   "성리학의 예법",
   "서학"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "285",
    "tb": "97"
   }
  ],
  "sources_text": "지도서 285(교과서 97)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY25",
  "stage": "yeongjo",
  "question": "조선 후기 세계지도(<곤여만국전도>)에서 중국과 조선은 조선 전기 지도와 견주어 어떻게 그려졌을까요?",
  "answer": "크기가 많이 작아졌다",
  "wrong": [
   "더 크게 그려졌다",
   "아예 그려지지 않았다"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "285",
    "tb": "97"
   }
  ],
  "sources_text": "지도서 285(교과서 97)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY26",
  "stage": "yeongjo",
  "question": "이야기를 노래로 들려주는 공연으로, 서민뿐 아니라 양반도 즐긴 것은?",
  "answer": "판소리",
  "wrong": [
   "탈놀이",
   "승경도놀이"
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
  "id": "QY27",
  "stage": "yeongjo",
  "question": "탈을 쓰고 하는 연극인 탈놀이는 주로 어디에서 공연되었을까요?",
  "answer": "장터처럼 사람이 많이 모이는 곳",
  "wrong": [
   "궁궐 깊은 곳",
   "성균관 명륜당"
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
  "id": "QY28",
  "stage": "yeongjo",
  "question": "민화 <호랑이와 까치>에 담긴 바람은?",
  "answer": "나쁜 운을 물리치고 복을 부르기",
  "wrong": [
   "전쟁에서 이기기",
   "과거 시험에 붙기"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "293",
    "tb": "101"
   }
  ],
  "sources_text": "지도서 293(교과서 101)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QY29",
  "stage": "yeongjo",
  "question": "수원 화성에 있는, 가운데가 비어 있는 높은 감시 건물은?",
  "answer": "공심돈",
  "wrong": [
   "봉수대",
   "명륜당"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "288"
   }
  ],
  "sources_text": "지도서 288 활동지(수원 서북공심돈)",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "Y08"
  ]
 },
 {
  "id": "QY30",
  "stage": "yeongjo",
  "question": "거중기와 함께 수원 화성 공사에 쓰인, 도르래로 물건을 높은 곳으로 옮기는 장치는?",
  "answer": "녹로",
  "wrong": [
   "측우기",
   "자격루"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "282"
   },
   {
    "type": "guide",
    "page": "288"
   }
  ],
  "sources_text": "지도서 282 참고 자료 · 288 활동지",
  "out_of_textbook": true,
  "checked_against_review_site": false,
  "about": [
   "Y01",
   "Y02",
   "Y05",
   "Y08"
  ]
 },
 {
  "id": "QY31",
  "stage": "yeongjo",
  "question": "조선 후기에 인기를 끈 한글 소설로 교과서에 나온 것은?",
  "answer": "《홍길동전》·《춘향전》·《흥부전》",
  "wrong": [
   "《농사직설》·《향약집성방》",
   "《경국대전》·《삼강행실도》"
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
 }
]);
})();
