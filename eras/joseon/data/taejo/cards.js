/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "T00",
  "kind": "sagwan",
  "stages": [
   "taejo"
  ],
  "order": 0,
  "year": "고려 말",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "고려 말, 일부 세력이 많은 땅을 차지하고 노비를 크게 늘려 나라 살림이 나빠졌다. 홍건적과 왜구를 물리치며 이름을 떨친 장수가 있었으니, 이성계다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림: 고려 말 상황과 건국 과정)",
  "learn": "고려 말의 혼란과 이성계의 성장",
  "fx": {
   "prebuilt": true,
   "note": "수묵 번짐 하늘에서 빈 섬이 구름을 뚫고 떠오른다. 섬 위에는 초가 몇 채뿐."
  }
 },
 {
  "id": "T01",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 1,
  "year": "1392 봄",
  "who": {
   "name": "이방원",
   "doll": "bangwon"
  },
  "line": "아버님, 정몽주 대감이 새 나라를 끝까지 반대하옵니다. 한 번 더 설득해 보시겠습니까?",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "찾아가 설득한다",
    "effects": {
     "nobles": 10,
     "army": -5
    },
    "this_run": "전하는 정몽주를 찾아가 마음을 물었지만 → 정몽주는 고려를 향한 뜻을 굽히지 않았고 → 이방원 쪽 사람들이 먼저 움직였다 → 전하의 마음이 무거워졌다."
   },
   "left": {
    "label": "설득을 멈춘다",
    "effects": {
     "army": 10,
     "nobles": -15
    },
    "this_run": "전하가 설득을 멈추자 → 고려를 따르던 신하들이 등을 돌렸고 → 이방원 쪽이 일을 서둘렀다 → 조정에 차가운 바람이 불었다."
   }
  },
  "against": "right",
  "real_history": "정몽주는 끝내 뜻을 굽히지 않았고, 1392년 이방원 쪽 사람들에 의해 세상을 떠났다. 두 사람이 시조(하여가·단심가)를 주고받았다는 이야기와 그 장소가 선죽교라는 이야기는 뒷날 전해진 것이다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정몽주'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050190"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code="
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '정몽주' https://encykorea.aks.ac.kr/Article/E0050190 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code=",
  "learn": "건국 과정에는 고려를 지키려던 사람과의 갈등도 있었다",
  "fx": {
   "note": "저녁 하늘. 섬 끝에 걸린 고려 깃발이 천천히 내려간다(사람·장면은 그리지 않음)."
  }
 },
 {
  "id": "T02",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 2,
  "year": "1392",
  "who": {
   "name": "",
   "doll": "jeong"
  },
  "line": "새 나라는 유교의 가르침으로 다스려야 하옵니다. 한꺼번에 바꿀까요, 천천히 바꿀까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 바꾼다",
    "effects": {
     "nobles": 15,
     "people": -10
    },
    "this_run": "절의 땅과 노비가 한꺼번에 줄자, 절에 다니던 백성들이 서운해했다."
   },
   "left": {
    "label": "천천히 바꾼다",
    "effects": {
     "nobles": -10,
     "people": 5
    },
    "this_run": "옛 풍습을 한동안 두었더니, 새 나라를 세운 신하들이 답답해했다."
   }
  },
  "real_history": "조선은 유교 사상을 나라를 다스리는 기본 원리로 삼았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "guide",
    "page": "228"
   }
  ],
  "sources_text": "지도서 232(교과서 74) 유교 사상을 기본 원리로 삼음 · 228 고려 때 컸던 불교의 비중이 줄어듦 / 인물 정도전: 지도서 238",
  "learn": "조선 건국과 유교 통치 원리",
  "fx": {
   "flag": true,
   "note": "섬 한가운데 붉은 왕기가 꽂히고, 왕 인형이 익선관을 쓴다. 하늘이 새벽빛으로 밝아진다."
  }
 },
 {
  "id": "T03",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 3,
  "year": "1392~1393",
  "who": {
   "name": "외교 문서를 맡은 신하",
   "doll": "official_blue"
  },
  "line": "명에 새 나라 이름 후보로 ‘조선’과 ‘화령’을 적어 보내려 하옵니다. 사신을 서둘러 보낼까요, 예물을 갖춰 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 보낸다",
    "effects": {
     "treasury": 5,
     "army": 5,
     "nobles": -5
    },
    "this_run": "사신이 서둘러 떠나느라 예물이 조금 모자랐다."
   },
   "left": {
    "label": "예물 갖춰 보낸다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "예물을 넉넉히 갖추느라 곳간이 가벼워졌다."
   }
  },
  "real_history": "1392년 11월 두 이름을 적어 보냈고, 명은 ‘조선’이 오래되고 아름다운 이름이라며 골랐다. 1393년 2월 나라 이름이 조선으로 정해졌다. (조선 안에서 이미 ‘조선’으로 마음을 정해 두었다고 보는 견해도 있다.)",
  "out_of_textbook": true,
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
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 11월 29일 https://sillok.history.go.kr/id/kaa_10111029_001 · 태조 2년 2월 15일 https://sillok.history.go.kr/id/kaa_10202015_001",
  "learn": "나라 이름 ‘조선’이 정해진 과정",
  "fx": {
   "skyText": "조선",
   "note": "섬 위 하늘에 두루마리가 펼쳐지고 먹으로 ‘조선’ 두 글자가 써진다."
  },
  "caution": "“명이 이름을 지어 줬다”로 읽히지 않게, 결과 문구는 ‘골랐다’로만 쓴다."
 },
 {
  "id": "T04",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 4,
  "year": "1394",
  "who": {
   "name": "도읍 터를 살핀 신하",
   "doll": "official_red"
  },
  "line": "개경을 떠나 한양으로 도읍을 옮기옵니다. 서둘러 옮길까요, 차근차근 옮길까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 옮긴다",
    "effects": {
     "army": 10,
     "people": -10,
     "treasury": -5
    },
    "this_run": "짐 수레가 밤낮없이 길을 메웠고, 백성들이 지쳤다.",
    "build": [
     "giwa"
    ]
   },
   "left": {
    "label": "차근차근 옮긴다",
    "effects": {
     "people": 5,
     "nobles": 5,
     "treasury": -15
    },
    "this_run": "짐을 나눠 옮기느라 나라 살림이 오래 묶였다.",
    "build": [
     "giwa"
    ]
   }
  },
  "real_history": "1394년, 조선은 한강이 흐르고 바다가 가까워 물자를 나르기 좋은 한양으로 도읍을 옮겼다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 한양을 수도로 정한 까닭 · 238 1394년 천도",
  "learn": "한양 천도와 그 까닭",
  "fx": {
   "boats": true,
   "build": [
    "giwa"
   ],
   "note": "구름이 걷히며 섬 위로 강줄기(한강)가 흘러들고, 작은 짐배들이 오간다."
  }
 },
 {
  "id": "T05",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 5,
  "year": "1395",
  "who": {
   "name": "궁궐 공사를 맡은 관리",
   "doll": "official_red"
  },
  "line": "새 궁궐을 짓사옵니다. 위엄 있게 크게 지을까요, 백성의 힘을 아껴 알맞게 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 짓는다",
    "effects": {
     "nobles": 10,
     "people": -10,
     "treasury": -10
    },
    "this_run": "장식을 더하느라 일꾼이 늘고 공사장에 한숨이 가득했다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "알맞게 짓는다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "궁궐은 단정하게 섰고, 일꾼들은 제때 집으로 돌아갔다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "smooth"
   }
  },
  "real_history": "1395년 경복궁이 완성되었다. ‘덕으로 나라를 다스려 오래 큰 복을 누리라’는 뜻의 이름은 정도전이 지었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 경복궁과 이름 뜻 · 238 / [교과서 밖] 이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "learn": "경복궁과 그 이름에 담긴 뜻",
  "fx": {
   "build": [
    "gyeongbok"
   ],
   "note": "섬 한가운데 경복궁이 “뽕” 솟는다 — 근정전의 휜 지붕선과 단청 포인트. \"알맞게 짓는다\"를 고르면 궁궐 앞 초가 마을에 사람이 더 붐빈다(궁궐 모양은 같음)."
  }
 },
 {
  "id": "T06",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 6,
  "year": "1395",
  "who": {
   "name": "예법을 맡은 신하",
   "doll": "official_green"
  },
  "line": "궁궐 동쪽에 종묘, 서쪽에 사직단을 지어야 하옵니다. 모내기철이라도 서둘러 지을까요, 농사철 뒤에 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 짓는다",
    "effects": {
     "nobles": 10,
     "people": -10,
     "treasury": -5
    },
    "this_run": "제사는 일찍 올렸지만, 모내기철 들판에 일손이 모자랐다.",
    "build": [
     "jongmyo",
     "sajik"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "농사철 뒤에 짓는다",
    "effects": {
     "people": 5,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "농사가 끝난 뒤 지어 원망은 적었지만, 대신들은 늦다고 투덜댔다.",
    "build": [
     "jongmyo",
     "sajik"
    ],
    "build_state": "late"
   }
  },
  "real_history": "종묘(경복궁 동쪽)와 사직단(서쪽)은 조선이 유교의 나라임을 보여 주는 곳이 되었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "231"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 종묘·사직단의 위치와 하는 일 · 231 종묘는 유교 국가를 나타내는 대표 건물",
  "learn": "종묘와 사직단",
  "fx": {
   "build": [
    "jongmyo",
    "sajik"
   ],
   "note": "경복궁 동쪽에 지붕이 아주 긴 종묘, 서쪽에 네모난 제단 사직단이 솟는다. 제사 때 흰 연기가 가늘게 오른다."
  }
 },
 {
  "id": "T07",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 7,
  "year": "1396",
  "who": {
   "name": "",
   "doll": "jeong"
  },
  "line": "산줄기를 따라 성을 쌓고 네 큰 문에 어짊·옳음·예의 바름을 새기겠사옵니다. 겨울 농한기에 한꺼번에 쌓을까요, 나눠서 쌓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "농한기에 쌓는다",
    "effects": {
     "army": 15,
     "people": -5,
     "treasury": -5
    },
    "this_run": "추운 겨울 공사에 일꾼들 손이 텄지만, 성벽은 빨리 올라갔다.",
    "build": [
     "wall",
     "heungin",
     "donui",
     "sungnye",
     "sukjeong"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "나눠서 쌓는다",
    "effects": {
     "army": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "공사가 길게 이어져, 한동안 성벽 곳곳에 나무 발판이 남았다.",
    "build": [
     "wall",
     "heungin",
     "donui",
     "sungnye",
     "sukjeong"
    ],
    "build_state": "late"
   }
  },
  "real_history": "1396년 한양 도성이 쌓였다(첫 공사 약 12만 명, 장마에 무너진 곳을 고친 둘째 공사 약 8만 명). 흥인지문(인)·돈의문(의)·숭례문(예)에 유교 덕목을 담았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "동원 인원: 우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000"
   },
   {
    "type": "web",
    "title": "출처",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 성곽·네 큰 문·유교 덕목 · 238 1396년 축조, 도성 터는 정도전이 정함 / [교과서 밖] 동원 인원: 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000 · https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30",
  "learn": "한양 도성과 유교 덕목을 담은 문 이름",
  "fx": {
   "glyphs": {
    "heungin": "仁",
    "donui": "義",
    "sungnye": "禮"
   },
   "build": [
    "wall",
    "heungin",
    "donui",
    "sungnye",
    "sukjeong"
   ],
   "note": "산등성이를 따라 성벽이 한 칸씩 이어지고 동·서·남 큰 문이 차례로 “뽕”. 문이 설 때 현판 위로 仁·義·禮 글자 빛이 잠깐 떠오른다."
  }
 },
 {
  "id": "T08",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 8,
  "year": "1390년대",
  "who": {
   "name": "젊은 유생 대표",
   "doll": "yusaeng"
  },
  "line": "한양에 성균관을 세워 인재를 기르겠사옵니다. 처음부터 크게 세울까요, 작게 시작할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 세운다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -15
    },
    "this_run": "기숙사까지 갖춘 성균관에 유생들이 몰려왔다.",
    "build": [
     "seonggyun"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작게 시작한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "강당 하나로 시작해 유생들이 비좁게 지냈다.",
    "build": [
     "seonggyun"
    ],
    "build_state": "late"
   }
  },
  "real_history": "태조는 한양에 문묘와 성균관을 세웠다. 성균관은 오늘날의 대학교에 해당하는 최고 교육 기관이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 238(태조가 한양에 문묘(성균관) 등을 건설) · 245(교과서 81 성균관은 오늘날 대학교)",
  "learn": "성균관과 유교 교육",
  "fx": {
   "build": [
    "seonggyun"
   ],
   "note": "도성 북쪽에 강당 명륜당과 기숙사 지붕이 솟고, 유생 인형들이 줄지어 들어간다."
  },
  "caution": "‘태조 때 세움’은 지도서 참고 자료(교과서 본문 밖). 성균관 자체는 교과서 내용."
 },
 {
  "id": "T09",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 9,
  "year": "1398",
  "who": {
   "name": "이방원",
   "doll": "bangwon"
  },
  "line": "아버님, 정도전이 왕자들이 거느린 군사를 거두려 하옵니다. 저희 형제를 믿어 주소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "아들을 믿는다",
    "effects": {
     "army": 10,
     "nobles": -10
    },
    "this_run": "전하는 아들의 말을 믿었고 → 이방원이 군사를 움직였다 → 정도전 세력이 무너졌다 → 개국 공신들이 크게 흔들렸다."
   },
   "left": {
    "label": "정도전을 믿는다",
    "effects": {
     "nobles": 5,
     "army": -20
    },
    "this_run": "전하는 정도전을 믿었지만 → 이방원이 먼저 군사를 일으켜 → 정도전 세력은 무너졌다 → 궁궐을 지키던 군사들까지 흩어졌다."
   }
  },
  "against": "left",
  "real_history": "1398년, 이방원이 군사를 일으켜 정도전 세력을 무너뜨렸다(제1차 왕자의 난). 정도전도 이때 세상을 떠났다. 그해 태조는 둘째 아들(정종)에게 왕위를 물려주었다. 스스로 원해서였는지는 의문이 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정종'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050884"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '정종' https://encykorea.aks.ac.kr/Article/E0050884",
  "learn": "건국 초 왕위를 둘러싼 갈등",
  "fx": {
   "dusk": true,
   "note": "해 질 녘 붉은 하늘. 경복궁 처마 등불이 하나씩 꺼지고 두루마리가 말리며 다음 왕 화면으로 넘어간다."
  }
 }
]);
})();
