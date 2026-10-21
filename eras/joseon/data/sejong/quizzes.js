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
 },
 {
  "id": "QS15",
  "stage": "sejong",
  "question": "《향약집성방》은 어떤 내용을 정리한 책일까요?",
  "answer": "우리나라에서 나는 약초로 병을 고치는 법",
  "wrong": [
   "우리 땅에 맞는 농사짓는 법",
   "효자와 충신의 이야기"
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
  "id": "QS16",
  "stage": "sejong",
  "question": "《농사직설》은 무엇을 바탕으로 엮었을까요?",
  "answer": "농민들의 경험",
  "wrong": [
   "중국 황제의 명령",
   "바다 건너 상인들의 이야기"
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
  "id": "QS17",
  "stage": "sejong",
  "question": "조선 전기 양반들이 매화·난초·국화·대나무를 그려 나타내려 한 것은?",
  "answer": "자신의 마음가짐",
  "wrong": [
   "집안의 재산",
   "사냥 솜씨"
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
  "id": "QS18",
  "stage": "sejong",
  "question": "훈민정음이라는 이름에 담긴 뜻은?",
  "answer": "백성을 가르치는 바른 소리",
  "wrong": [
   "임금이 쓰는 귀한 글자",
   "중국 글자를 쉽게 읽는 법"
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
  "id": "QS19",
  "stage": "sejong",
  "question": "앙부일구 안에 그림을 그려 넣은 까닭은 무엇일까요?",
  "answer": "글자를 모르는 백성도 시각을 알 수 있게 하려고",
  "wrong": [
   "해시계를 더 비싸게 팔려고",
   "비의 양을 함께 재려고"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263 자료 해설(교과서 90)",
  "out_of_textbook": false,
  "checked_against_review_site": false,
  "about": [
   "S02",
   "S09"
  ]
 },
 {
  "id": "QS20",
  "stage": "sejong",
  "question": "세종 때 측우기를 한양 말고 어디에도 보내 쓰게 했을까요?",
  "answer": "여러 지방",
  "wrong": [
   "명나라",
   "바다 건너 일본"
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
  "id": "QS21",
  "stage": "sejong",
  "question": "세종 때 책을 많이 펴낼 수 있었던 까닭으로 알맞은 것은?",
  "answer": "종이를 만드는 기술과 인쇄술이 발전해서",
  "wrong": [
   "모든 백성이 한자를 잘 알아서",
   "책을 모두 손으로 베껴 써서"
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
  "id": "QS22",
  "stage": "sejong",
  "question": "조선 시대 신분 가운데 대체로 풍족하게 살며 교육받을 기회를 가장 많이 누린 신분은?",
  "answer": "양반",
  "wrong": [
   "상민",
   "천민"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QS23",
  "stage": "sejong",
  "question": "조선 시대 중인이 주로 한 일은 무엇일까요?",
  "answer": "의학·법률에 관한 일이나 통역",
  "wrong": [
   "농사짓기와 장사",
   "주인집의 허드렛일"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QS24",
  "stage": "sejong",
  "question": "조선 시대 상민은 대부분 어떤 일을 했을까요?",
  "answer": "농사를 지었다",
  "wrong": [
   "외국 말을 통역했다",
   "나라의 법을 만들었다"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QS25",
  "stage": "sejong",
  "question": "양반이 나랏일에 참여하면서 면제받은 ‘국역’은 무엇일까요?",
  "answer": "나라의 큰 공사에 동원되거나 군대에 가는 일",
  "wrong": [
   "해마다 과거 시험을 보는 일",
   "서당에서 아이들을 가르치는 일"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85 용어 풀이)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QS26",
  "stage": "sejong",
  "question": "승경도놀이에서 굴려서 나온 수만큼 말을 옮기는 숫자 방망이는?",
  "answer": "윤목",
  "wrong": [
   "투호",
   "고누"
  ],
  "sources": [
   {
    "type": "guide",
    "page": "257",
    "tb": "87"
   }
  ],
  "sources_text": "지도서 257(교과서 87)",
  "out_of_textbook": false,
  "checked_against_review_site": false
 },
 {
  "id": "QS27",
  "stage": "sejong",
  "question": "조선 시대 학생들이 어릴 때 주로 공부한 곳은?",
  "answer": "가정이나 서당",
  "wrong": [
   "성균관",
   "향교의 명륜당"
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
  "id": "QS28",
  "stage": "sejong",
  "question": "《삼강행실도》에 그림을 함께 실은 까닭은 무엇일까요?",
  "answer": "글을 모르는 백성도 쉽게 이해하게 하려고",
  "wrong": [
   "책을 더 두껍게 만들려고",
   "중국에 선물로 보내려고"
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
  "checked_against_review_site": false,
  "about": [
   "S05"
  ]
 },
 {
  "id": "QS29",
  "stage": "sejong",
  "question": "세종이 집현전 학자들에게 휴가를 주어 책만 읽게 한 제도는?",
  "answer": "사가독서",
  "wrong": [
   "과거 시험",
   "경연"
  ],
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '사가독서'",
    "url": "https://encykorea.aks.ac.kr/Article/E0025343"
   }
  ],
  "sources_text": "한국민족문화대백과사전 '사가독서' https://encykorea.aks.ac.kr/Article/E0025343",
  "out_of_textbook": true,
  "checked_against_review_site": false
 },
 {
  "id": "QS30",
  "stage": "sejong",
  "question": "세종 때 왜인들이 머물며 장사할 수 있게 연 남쪽 바닷가 세 포구를 무엇이라 할까요?",
  "answer": "삼포",
  "wrong": [
   "4군 6진",
   "삼전도"
  ],
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '삼포'",
    "url": "https://encykorea.aks.ac.kr/Article/E0026914"
   }
  ],
  "sources_text": "한국민족문화대백과사전 '삼포' https://encykorea.aks.ac.kr/Article/E0026914",
  "out_of_textbook": true,
  "checked_against_review_site": false
 }
]);
})();
