/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "D001",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "required_in": "taejo",
  "rarity": "common",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "마을에 서당을 열려 하옵니다. 상민 아이들도 받아 주면 안 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상민도 받는다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "아이들이 《천자문》을 소리 내어 읽었다.",
    "build": [
     "seodang"
    ]
   },
   "left": {
    "label": "양반만 받는다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "서당은 양반집 아이들만 받았다.",
    "build": [
     "seodang"
    ]
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   },
   {
    "type": "guide",
    "page": "255"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·《천자문》 · 255 상민은 교육받을 기회가 적었음",
  "learn": "교육 기관(서당)과 신분",
  "fx": {
   "build": [
    "seodang"
   ],
   "note": "마을에 작은 서당 초가가 “뽕”, 아이 인형들이 둘러앉는다."
  }
 },
 {
  "id": "D002",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "required_in": "taejo",
  "conditions_text": "G는 G07(갑오개혁) 앞까지만",
  "rarity": "common",
  "who": {
   "name": "양반 부부",
   "doll": "yangban"
  },
  "line": "우리 아들이 과거를 준비하옵니다. 시험을 한 번 더 열어 주시면 안 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시험을 더 연다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "임시 과거가 열려 한양이 북적였다."
   },
   "left": {
    "label": "정해진 대로 한다",
    "effects": {
     "nobles": -5,
     "treasury": 5
    },
    "this_run": "정해진 3년마다의 시험만 열렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   },
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 과거에 합격하면 관리 · 248 3년마다 식년시, 경사 때 별시",
  "learn": "과거와 관리",
  "fx": {
   "note": "성균관 앞에 갓 쓴 응시생 인형들이 줄을 선다."
  }
 },
 {
  "id": "D003",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "고을에 향교를 세워 유학을 가르치소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "향교를 세운다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "향교 명륜당에서 글 읽는 소리가 났다.",
    "build": [
     "hyanggyo"
    ]
   },
   "left": {
    "label": "다음 해로 미룬다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "향교 세우기는 다음 해로 미뤄졌다.",
    "build": [
     "hyanggyo"
    ]
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 향교·명륜당",
  "learn": "교육 기관(향교)",
  "fx": {
   "build": [
    "hyanggyo"
   ],
   "note": "고을에 향교 지붕이 “뽕”."
  }
 },
 {
  "id": "D004",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "required_in": "taejo",
  "rarity": "common",
  "who": {
   "name": "예법을 맡은 신하",
   "doll": "official_green"
  },
  "line": "혼례와 장례를 유교 예법에 따라 치르도록 널리 알리소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "예법을 알린다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "혼례 절차가 꼼꼼해졌다."
   },
   "left": {
    "label": "하던 대로 둔다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "마을마다 하던 대로 잔치를 열었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 결혼·장례·제사도 유교 예절에 따라",
  "learn": "유교 예절의 실천",
  "fx": {
   "note": "마을 마당에 혼례 초례상이 차려지고 청사초롱이 켜진다."
  }
 },
 {
  "id": "D005",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "required_in": "taejo",
  "rarity": "common",
  "who": {
   "name": "농민",
   "doll": "farmer"
  },
  "line": "올봄 가뭄이 심하옵니다. 세금을 조금 줄여 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "세금을 줄인다",
    "effects": {
     "people": 15,
     "treasury": -15
    },
    "this_run": "농민들이 한숨을 돌렸다."
   },
   "left": {
    "label": "세금을 지킨다",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "this_run": "농민들은 허리띠를 졸라맸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85) 상민은 대부분 농민, 살림이 넉넉지 않음",
  "learn": "상민의 삶",
  "fx": {
   "note": "논바닥이 갈라졌다가, 세금을 줄이면 마을 굴뚝에 연기가 오른다."
  }
 },
 {
  "id": "D006",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo"
  ],
  "required_in": "sejong",
  "rarity": "common",
  "who": {
   "name": "노비",
   "doll": "nobi"
  },
  "line": "주인댁 일을 하느라 앓아누운 어머니를 돌볼 틈이 없사옵니다. 하루만 쉬게 해 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "하루 쉬게 한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "그날 밤 노비는 어머니 곁을 지켰다."
   },
   "left": {
    "label": "일을 시킨다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "this_run": "노비는 다시 물동이를 들었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   },
   {
    "type": "guide",
    "page": "256"
   }
  ],
  "sources_text": "지도서 255(교과서 85) 천민은 대부분 노비, 재산으로 여겨지고 주인을 위해 일함 · 256 유의점",
  "learn": "천민의 삶",
  "fx": {
   "note": "초가 부엌에 약 달이는 김이 오른다."
  }
 },
 {
  "id": "D007",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "required_in": "sejong",
  "rarity": "common",
  "who": {
   "name": "역관 (중인)",
   "doll": "jungin"
  },
  "line": "명에서 사신이 오는데 통역할 역관이 모자라옵니다. 역관을 더 뽑아 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "역관을 뽑는다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "통역이 막힘없이 오갔다."
   },
   "left": {
    "label": "있는 사람으로",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "역관 몇 명이 밤새 일했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "254~255",
    "tb": "84~85"
   },
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 254~255(교과서 84~85) 중인: 통역 · 248 잡과(역과)",
  "learn": "중인의 일",
  "fx": {
   "note": "궁궐 문 앞에 사신 행렬과 역관 인형."
  }
 },
 {
  "id": "D008",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "required_in": "sejong",
  "rarity": "common",
  "who": {
   "name": "의원 (중인)",
   "doll": "jungin"
  },
  "line": "우리 땅에서 나는 약초로 병을 고치는 법을 모아 책으로 엮으소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "약초 책을 엮는다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "《향약집성방》이 마을 의원들 손에 들렸다."
   },
   "left": {
    "label": "중국 책을 쓴다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "의원들은 중국 책을 계속 보았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   },
   {
    "type": "guide",
    "page": "255"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 《향약집성방》 · 255 의학은 중인의 일",
  "learn": "《향약집성방》과 중인",
  "fx": {
   "note": "약초밭이 “뽕”, 의원 인형이 약봉지를 든다."
  }
 },
 {
  "id": "D009",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "required_in": "sejong",
  "rarity": "common",
  "who": {
   "name": "도공",
   "doll": "official_blue"
  },
  "line": "화려한 청자를 구워 바칠까 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "청자를 받는다",
    "effects": {
     "treasury": -10,
     "people": 5
    },
    "this_run": "청자는 아름다웠지만 값이 비쌌다.",
    "build": [
     "kiln"
    ]
   },
   "left": {
    "label": "백자를 쓴다",
    "effects": {
     "nobles": 5,
     "treasury": 5,
     "people": -5
    },
    "this_run": "전하는 검소한 분청사기와 백자를 쓰라 했다.",
    "build": [
     "kiln"
    ]
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 양반은 검소함을 강조해 청자 대신 분청사기·백자 사용",
  "learn": "조선 전기 양반 문화",
  "fx": {
   "build": [
    "kiln"
   ],
   "note": "가마에서 흰 백자 항아리가 나온다."
  }
 },
 {
  "id": "D010",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "선비들",
   "doll": "yangban"
  },
  "line": "선비들이 매화·난초·국화·대나무를 그리는 모임을 궁에서 열고 싶다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "궁에서 연다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "선비들은 그림으로 마음가짐을 나누었다."
   },
   "left": {
    "label": "집에서 열게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "모임은 각자 집에서 열렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 양반들이 매화·난초·국화·대나무를 그려 마음가짐을 표현",
  "learn": "조선 전기 양반 문화",
  "fx": {
   "note": "궁궐 정자에 먹 향이 번진다."
  }
 },
 {
  "id": "D011",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "required_in": "sejong",
  "rarity": "common",
  "who": {
   "name": "세자를 가르치는 스승",
   "doll": "seja"
  },
  "line": "세자 저하가 승경도놀이로 벼슬 이름을 익히시옵니다. 놀이판을 새로 만들어 드릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "놀이판을 준다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "윤목이 ‘모’! 세자가 신나게 말을 옮겼다."
   },
   "left": {
    "label": "책을 권한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "전하는 놀이보다 책이라 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "256~257",
    "tb": "87"
   },
   {
    "type": "guide",
    "page": "257"
   }
  ],
  "sources_text": "지도서 256~257(교과서 87) 승경도놀이·윤목 · 257(하륜이 만들었다는 기록)",
  "learn": "승경도놀이와 관직",
  "fx": {
   "note": "궁궐 마루에 승경도판이 펼쳐지고 윤목이 굴러간다."
  }
 },
 {
  "id": "D012",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "수라간 상궁",
   "doll": "courtlady"
  },
  "line": "오늘 수라상에 반찬을 넉넉히 올릴까요, 소박하게 올릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "넉넉히 차린다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "대신들과 함께 넉넉한 상을 받았다."
   },
   "left": {
    "label": "소박하게 먹는다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "전하는 소박한 상을 받았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "fx": {
   "note": "수라간 굴뚝에서 연기가 오른다."
  }
 },
 {
  "id": "D013",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "바닷가에 왜구 배가 보였사옵니다. 성을 고칠까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "성을 고친다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "바닷가 성벽에 돌이 더해졌다."
   },
   "left": {
    "label": "마을에 맡긴다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "마을 사람들이 스스로 망을 보았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 왜구 침입과 강한 대응",
  "learn": "주변 나라와의 관계",
  "fx": {
   "note": "바닷가 성벽에 횃불이 켜진다."
  }
 },
 {
  "id": "D014",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "북쪽 국경 관리",
   "doll": "official_red"
  },
  "line": "여진 사람들이 말과 가죽을 바꾸자며 국경에 왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "물건을 바꾼다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "국경 장터에서 물건이 오갔다."
   },
   "left": {
    "label": "국경을 닫는다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "국경 문을 닫았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 여진과 필요한 물품을 주고받으며 평화 유지",
  "learn": "주변 나라와의 관계",
  "fx": {
   "note": "북쪽 강가에 장막과 말들이 모인다."
  }
 },
 {
  "id": "D015",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "외교를 맡은 신하",
   "doll": "official_red"
  },
  "line": "명의 사신이 오옵니다. 선물을 넉넉히 준비할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "선물을 늘린다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "사신은 흡족해하며 돌아갔다."
   },
   "left": {
    "label": "선물을 줄인다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "선물을 줄였다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 명과 사신을 보내 선물을 주고받음",
  "learn": "명과의 관계",
  "fx": {
   "note": "도성 문 앞에 붉은 깃발의 사신 행렬."
  }
 },
 {
  "id": "D016",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "바닷가 고을 관리",
   "doll": "official_green"
  },
  "line": "일본 사신이 물건을 사고팔자 하옵니다. 포구를 열어 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "포구를 연다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "포구에 장이 섰다."
   },
   "left": {
    "label": "포구를 닫는다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "포구는 닫혀 있었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 일본과 좋은 관계 유지",
  "learn": "주변 나라와의 관계",
  "fx": {
   "note": "포구에 돛배가 들어온다."
  }
 },
 {
  "id": "D017",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "conditions_text": "G는 G07 앞까지만",
  "rarity": "common",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "무과를 열어 활 잘 쏘는 무관을 뽑으소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "무과를 연다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "활터에 과녁 맞히는 소리가 이어졌다."
   },
   "left": {
    "label": "다음 해로 미룬다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "시험은 다음 해로 미뤄졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 248 무과(병서·활쏘기) 시험",
  "learn": "과거(무과)",
  "fx": {
   "note": "활터에 과녁이 서고 화살이 날아간다."
  }
 },
 {
  "id": "D018",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "공조 관리",
   "doll": "official_green"
  },
  "line": "장마에 다리가 무너졌사옵니다. 새로 놓을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다리를 놓는다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "새 돌다리가 놓였다.",
    "build": [
     "bridge"
    ]
   },
   "left": {
    "label": "나룻배로 버틴다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "사람들은 나룻배로 건넜다.",
    "build": [
     "bridge"
    ]
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 248 공전(도로·다리 관리) / 일반 상황(특정 사실을 주장하지 않음)",
  "fx": {
   "build": [
    "bridge"
   ],
   "note": "개울 위에 돌다리가 “뽕”."
  }
 },
 {
  "id": "D019",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "종묘 제사를 맡은 신하",
   "doll": "official_red"
  },
  "line": "이번 종묘 제사를 더 크게 올리소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "크게 올린다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "종묘에 음악이 울려 퍼졌다."
   },
   "left": {
    "label": "예년대로 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "제사는 예년대로 올렸다."
   }
  },
  "grain": "balance",
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
  "sources_text": "지도서 233(교과서 75) 종묘 · 231 종묘는 유교 국가를 나타냄",
  "learn": "종묘와 유교",
  "fx": {
   "note": "종묘 앞마당에 제사 행렬과 흰 연기."
  }
 },
 {
  "id": "D020",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "어느 집안 어른",
   "doll": "yangban"
  },
  "line": "부모님 재산을 아들딸에게 똑같이 나누려 하옵니다. 그래도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고르게 나눈다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "딸들도 아들과 똑같이 재산을 받았다."
   },
   "left": {
    "label": "집안에 맡긴다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "전하는 집안끼리 정하라 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "286~287",
    "tb": "99"
   }
  ],
  "sources_text": "지도서 286~287(교과서 99) 조선 전기에는 아들딸이 동등하게 재산을 상속",
  "learn": "조선 전기 여성의 삶",
  "fx": {
   "note": "기와집 마당에서 가족 인형들이 둘러앉는다."
  }
 },
 {
  "id": "D022",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "required_in": "seonjo",
  "rarity": "common",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "돌아가신 아버지 무덤을 3년 지키겠다며 벼슬을 내놓겠다는 관리가 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "3년상을 허락한다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "효를 다하는 모습에 칭찬이 자자했다."
   },
   "left": {
    "label": "일터로 부른다",
    "effects": {
     "treasury": 5,
     "nobles": -10
    },
    "this_run": "일손이 급하다며 붙잡았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 장례 뒤 3년 동안 무덤을 지키는 효의 실천",
  "learn": "유교 예절과 효",
  "fx": {
   "note": "산기슭 무덤 곁에 작은 움막과 등불."
  }
 },
 {
  "id": "D023",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "성균관 유생",
   "doll": "yusaeng"
  },
  "line": "성균관 기숙사 밥이 모자라 공부에 힘이 안 나옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "반찬을 늘린다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "기숙사 상에 반찬이 늘었다."
   },
   "left": {
    "label": "참으라 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "유생들은 배를 문지르며 책을 폈다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "지도서 249 성균관 유생은 기숙사(동재·서재)에서 생활",
  "learn": "성균관",
  "fx": {
   "note": "명륜당 옆 기숙사 굴뚝에 연기."
  }
 },
 {
  "id": "D024",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "궁궐 내관",
   "doll": "naegwan"
  },
  "line": "명절에 궁에서 투호와 윷놀이 잔치를 열까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "people": 5,
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "항아리에 화살이 쏙 들어가자 웃음이 터졌다."
   },
   "left": {
    "label": "조촐하게 보낸다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "잔치는 조촐하게 지나갔다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "257",
    "tb": "87"
   }
  ],
  "sources_text": "지도서 257(교과서 87) 투호·윷놀이·고누",
  "learn": "조선 시대의 놀이",
  "fx": {
   "note": "궁궐 마당에 투호 항아리와 윷판."
  }
 },
 {
  "id": "D025",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "집현전 학자들이 밤새 책을 읽다 잠들었사옵니다. 따뜻한 차와 이불을 보낼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "차와 이불을 보낸다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "device": {
     "invention": 1
    },
    "this_run": "새벽까지 집현전 등불이 꺼지지 않았다."
   },
   "left": {
    "label": "그냥 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "학자들은 새벽 찬 바람에 눈을 떴다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "266"
   }
  ],
  "sources_text": "지도서 266(집현전 젊은 학자들) / 일반 상황(특정 사실을 주장하지 않음)",
  "learn": "집현전",
  "fx": {
   "note": "집현전 창에 등불이 오래 켜져 있다."
  }
 },
 {
  "id": "D026",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "인쇄를 맡은 관리",
   "doll": "official_green"
  },
  "line": "새로 만든 활자로 책을 찍으면 글자 사이가 넓어 읽기 좋사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 활자로 찍는다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "device": {
     "invention": 1
    },
    "this_run": "또렷한 글자의 책이 쌓였다."
   },
   "left": {
    "label": "옛 활자로 찍는다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "예전 활자로 찍었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263 세종 때 갑인자 주조, 글자 사이가 여유 있어 읽기 쉬움",
  "learn": "인쇄술 발달",
  "fx": {
   "note": "활자판에 먹이 칠해지고 책장이 넘어간다."
  }
 },
 {
  "id": "D027",
  "kind": "daily",
  "stages": [
   "seonjo",
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "궁녀",
   "doll": "courtlady"
  },
  "line": "중전마마께서 한글로 편지를 쓰셨사옵니다. 궁 안에서도 한글을 더 쓰게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한글을 권한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "궁녀들도 한글로 편지를 주고받았다."
   },
   "left": {
    "label": "한자를 지킨다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "나라의 공식 문서는 여전히 한자로 썼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263 유의점: 공식 문서는 한자, 한글 사용자는 늘었고 왕·왕비의 한글 편지가 남음",
  "learn": "훈민정음 이후 한글 사용",
  "fx": {
   "note": "궁궐 창호지 너머로 한글 편지가 접힌다."
  }
 },
 {
  "id": "D028",
  "kind": "daily",
  "stages": [
   "seonjo",
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "형조 관리",
   "doll": "official_red"
  },
  "line": "주인의 잘못을 관아에 알리려는 노비가 있사옵니다. 《경국대전》은 이런 고발을 받지 말라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고발을 받아 준다",
    "effects": {
     "people": 10,
     "nobles": -15
    },
    "this_run": "관아가 술렁였다."
   },
   "left": {
    "label": "법대로 막는다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "고발은 받아들여지지 않았다. 신분이 낮은 사람이 높은 사람을 고발하기 어려운 법이었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "244~245",
    "tb": "80"
   }
  ],
  "sources_text": "지도서 244~245(교과서 80) 《경국대전》 노비 고발 조항과 그 까닭",
  "learn": "《경국대전》과 신분 질서",
  "fx": {
   "note": "관아 마당에 북이 놓여 있다."
  }
 },
 {
  "id": "D029",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "required_in": "seonjo",
  "conditions_text": "전쟁 중",
  "rarity": "common",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "군사가 모자라온데, 법전에는 부모가 70세가 넘으면 아들 하나는 군대에서 빼 준다 하옵니다. 예외 없이 뽑을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모두 뽑는다",
    "effects": {
     "army": 15,
     "people": -10,
     "nobles": -5
    },
    "this_run": "효를 어긴다며 원성이 컸다."
   },
   "left": {
    "label": "법전대로 둔다",
    "effects": {
     "people": 10,
     "army": -10
    },
    "this_run": "법전대로 부모 곁을 지키게 했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "244",
    "tb": "80"
   }
  ],
  "sources_text": "지도서 244(교과서 80) 《경국대전》 군역 면제 조항(효)",
  "learn": "《경국대전》과 효",
  "fx": {
   "note": "마을 어귀에서 늙은 부모와 아들 인형이 손을 잡는다."
  }
 },
 {
  "id": "D030",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "required_in": "seonjo",
  "conditions_text": "임진왜란 중(J02~J07)",
  "rarity": "common",
  "who": {
   "name": "피란 온 양반 오희문",
   "doll": "yangban"
  },
  "line": "골짜기 시냇가에서 잠을 잤사옵니다. 피란 온 사람들에게 곡식을 나누어 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곡식을 나눈다",
    "effects": {
     "people": 15,
     "treasury": -10
    },
    "this_run": "굶주린 피란민들이 죽 한 그릇씩 받았다."
   },
   "left": {
    "label": "군량으로 둔다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "곡식은 군사들 몫으로 남겼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 《쇄미록》(임진왜란 중 오희문의 일기)",
  "learn": "전쟁 속 사람들의 삶",
  "fx": {
   "note": "산골짜기에 피란민 천막과 모닥불."
  }
 },
 {
  "id": "D031",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "required_in": "seonjo",
  "conditions_text": "병자호란 중(J09~J10)",
  "rarity": "common",
  "who": {
   "name": "남평 조씨",
   "doll": "official_red"
  },
  "line": "남한산성에 계신 남편이 남쪽으로 피란하라 했사옵니다. 나루에 배를 대 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배를 대 준다",
    "effects": {
     "people": 10,
     "treasury": -5,
     "army": -5
    },
    "this_run": "피란민들이 배를 타고 강을 건넜다."
   },
   "left": {
    "label": "군사가 쓴다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "배는 군사들이 쓰기로 했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 《병자일기》(병자호란 중 남평 조씨의 일기)",
  "learn": "전쟁 속 사람들의 삶",
  "fx": {
   "note": "얼어붙은 나루에 작은 배 한 척."
  }
 },
 {
  "id": "D032",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J07 뒤",
  "rarity": "common",
  "who": {
   "name": "고을 농민",
   "doll": "farmer"
  },
  "line": "전쟁으로 집과 논밭이 다 타 버렸사옵니다. 씨앗을 나누어 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "씨앗을 나눈다",
    "effects": {
     "people": 15,
     "treasury": -15
    },
    "this_run": "탄 들판에 씨앗이 뿌려졌다."
   },
   "left": {
    "label": "곳간을 지킨다",
    "effects": {
     "treasury": 10,
     "people": -15
    },
    "this_run": "농민들은 빈손으로 들판에 섰다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77 그림: 집과 땅이 다 타 버린 백성)",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "검게 탄 논에 초록 싹이 하나둘 돋는다."
  }
 },
 {
  "id": "D033",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J04~J07",
  "rarity": "common",
  "who": {
   "name": "의병장",
   "doll": "official_green"
  },
  "line": "의병들이 먹을 쌀이 떨어졌다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "쌀을 보낸다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "쌀 수레가 산길을 올랐다."
   },
   "left": {
    "label": "스스로 버티게",
    "effects": {
     "treasury": 5,
     "army": -10
    },
    "this_run": "의병들은 산나물로 버텼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 의병의 활약",
  "learn": "의병",
  "fx": {
   "note": "산길에 쌀 수레와 깃발."
  }
 },
 {
  "id": "D034",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J02 뒤, J04 앞",
  "rarity": "common",
  "who": {
   "name": "피란길 마을 사람",
   "doll": "official_blue"
  },
  "line": "피란길의 백성들이 임금 행렬을 막고 ‘저희를 두고 가시옵니까’ 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "백성을 달랜다",
    "effects": {
     "people": 10,
     "army": -10
    },
    "this_run": "전하는 잠시 멈추어 백성들을 달랬다."
   },
   "left": {
    "label": "서둘러 떠난다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "행렬은 서둘러 북쪽으로 떠났다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 239(선조의 의주 피란) / 일반 상황",
  "learn": "임진왜란 초기",
  "fx": {
   "note": "빗속의 피란 행렬."
  }
 },
 {
  "id": "D035",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J05~J07",
  "rarity": "common",
  "who": {
   "name": "유성룡",
   "doll": "yuseongryong"
  },
  "line": "포를 쏘는 군사, 활 쏘는 군사, 창칼 쓰는 군사를 나누어 훈련하는 군영을 만드소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군영을 만든다",
    "effects": {
     "army": 15,
     "treasury": -10
    },
    "this_run": "훈련장에 포 소리가 울렸다."
   },
   "left": {
    "label": "예전대로 한다",
    "effects": {
     "treasury": 5,
     "army": -10
    },
    "this_run": "군사들은 예전처럼 모였다 흩어졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '훈련도감'(1593)",
    "url": "https://encykorea.aks.ac.kr/Article/E0065793"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '훈련도감'(1593) https://encykorea.aks.ac.kr/Article/E0065793",
  "learn": "임진왜란 중 군사 제도",
  "fx": {
   "note": "도성 안 훈련장에 깃발 세 가지 색."
  }
 },
 {
  "id": "D036",
  "kind": "daily",
  "stages": [
   "seonjo",
   "yeongjo"
  ],
  "conditions_text": "J11 뒤",
  "rarity": "common",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "청에 바칠 물품 목록이 왔사옵니다. 줄여 달라 청해 볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "줄여 달라 한다",
    "effects": {
     "treasury": 10,
     "army": -10
    },
    "this_run": "사신이 무거운 걸음으로 떠났다."
   },
   "left": {
    "label": "목록대로 낸다",
    "effects": {
     "army": 5,
     "treasury": -15
    },
    "this_run": "목록대로 수레에 실었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 청에 물품을 바침",
  "learn": "병자호란의 결과",
  "fx": {
   "note": "북쪽 길로 물품 수레 행렬."
  }
 },
 {
  "id": "D037",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J11 뒤",
  "rarity": "common",
  "who": {
   "name": "국경 고을 관리",
   "doll": "official_green"
  },
  "line": "청에 끌려갔다 도망쳐 온 백성들이 있사옵니다. 청은 돌려보내라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "숨겨 준다",
    "effects": {
     "people": 15,
     "army": -15
    },
    "this_run": "관리들은 그들을 산골 마을에 숨겨 주었다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "army": 5,
     "people": -15
    },
    "this_run": "백성들은 눈물을 흘리며 국경으로 돌아갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 239 청은 도망 나온 조선인을 다시 돌려보내라고 요구",
  "learn": "병자호란의 고통",
  "fx": {
   "note": "눈 덮인 국경 강가의 발자국."
  }
 },
 {
  "id": "D038",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "임진왜란 중",
  "rarity": "common",
  "who": {
   "name": "피란 가는 양반",
   "doll": "yangban"
  },
  "line": "적이 검은 갓을 쓴 양반을 붙잡아 간다 하여, 양반들도 패랭이를 쓰고 피란하옵니다. 체면을 지키라 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "체면을 지키게",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "갓을 고집한 양반들은 길을 돌아가야 했다."
   },
   "left": {
    "label": "패랭이를 허락",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "양반도 패랭이를 쓰고 길을 떠났다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '패랭이'(연려실기술 등의 기록)",
    "url": "https://encykorea.aks.ac.kr/Article/E0059795"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '패랭이'(연려실기술 등의 기록) https://encykorea.aks.ac.kr/Article/E0059795",
  "learn": "신분을 나타내는 옷차림",
  "fx": {
   "note": "양반 인형의 검은 갓이 패랭이로 바뀐다."
  }
 },
 {
  "id": "D039",
  "kind": "daily",
  "stages": [
   "seonjo",
   "yeongjo"
  ],
  "conditions_text": "J05 뒤",
  "rarity": "common",
  "who": {
   "name": "호조 판서",
   "doll": "official_blue"
  },
  "line": "나라 살림이 바닥이옵니다. 곡식을 바치는 사람에게 이름 칸이 빈 명예 벼슬 문서를 주면 어떨까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문서를 판다",
    "effects": {
     "treasury": 15,
     "nobles": -10
    },
    "this_run": "곡식 수레가 관아 앞에 줄을 섰다."
   },
   "left": {
    "label": "팔지 않는다",
    "effects": {
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "나라 곳간은 비어 갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '공명첩'(임진왜란 중 생김, 이름뿐인 벼슬)",
    "url": "https://encykorea.aks.ac.kr/Article/E0004276"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '공명첩'(임진왜란 중 생김, 이름뿐인 벼슬) https://encykorea.aks.ac.kr/Article/E0004276",
  "learn": "조선 후기 신분 질서의 흔들림",
  "fx": {
   "note": "관아 앞에 빈칸 있는 문서가 쌓인다."
  }
 },
 {
  "id": "D040",
  "kind": "daily",
  "stages": [
   "seonjo",
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "장수",
   "doll": "official_blue"
  },
  "line": "전쟁에서 공을 세운 노비를 상민으로 풀어 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상민으로 푼다",
    "effects": {
     "people": 10,
     "army": 5,
     "nobles": -10
    },
    "this_run": "노비 문서 한 장이 불살라졌다."
   },
   "left": {
    "label": "칭찬만 한다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "공은 칭찬만 받았다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 상민으로 신분이 상승한 천민이 많아짐",
  "learn": "신분제의 변화",
  "fx": {
   "note": "노비 인형의 옷이 상민 옷으로 바뀐다."
  }
 },
 {
  "id": "D041",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J10 앞(병자호란 중)",
  "rarity": "common",
  "who": {
   "name": "남한산성의 장수",
   "doll": "official_blue"
  },
  "line": "성 안 식량이 바닥나고 있사옵니다. 군사 밥부터 지키고 백성 몫을 줄일까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사 몫을 지킨다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "군사들은 성벽을 지켰다."
   },
   "left": {
    "label": "함께 나눈다",
    "effects": {
     "people": 5,
     "army": -10
    },
    "this_run": "군사와 백성이 죽을 나누어 먹었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 남한산성은 식량이 부족했음",
  "learn": "병자호란",
  "fx": {
   "note": "성 안 곳간의 쌀자루가 줄어든다."
  }
 },
 {
  "id": "D042",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J03~J07",
  "rarity": "common",
  "who": {
   "name": "전라좌수영 군관",
   "doll": "official_blue"
  },
  "line": "거북선 덮개 위의 칼과 송곳을 새로 갈아야 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "칼을 새로 간다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "덮개 위 칼날이 햇빛에 번쩍였다."
   },
   "left": {
    "label": "낡은 칼로 버틴다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "낡은 칼로 버텼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "송곳)",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '거북선'(덮개 위 칼·송곳) https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30",
  "learn": "거북선",
  "fx": {
   "note": "부두에 거북선이 정박해 있다."
  }
 },
 {
  "id": "D043",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J07 뒤, J08 앞",
  "rarity": "common",
  "who": {
   "name": "사신",
   "doll": "official_red"
  },
  "line": "전쟁 때 일본에 끌려간 도공과 학자가 많다 하옵니다. 사신을 보내 데려오시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사신을 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "사신의 배가 바다를 건넜다."
   },
   "left": {
    "label": "보내지 않는다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "바다 건너 소식은 끊겼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 239 일본이 도공·학자 등을 끌고 감 / 사신 파견은 일반 상황",
  "learn": "임진왜란의 영향",
  "fx": {
   "note": "수평선을 향하는 돛배."
  }
 },
 {
  "id": "D103",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "암행 나갔던 관리",
   "doll": "official_red"
  },
  "line": "고을 수령이 세금을 멋대로 걷는다는 소문이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "조사한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "수령이 벼슬에서 쫓겨났다."
   },
   "left": {
    "label": "소문으로 둔다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "this_run": "소문은 소문으로 끝났다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "300",
    "tb": "102"
   }
  ],
  "sources_text": "지도서 300(교과서 102) 관리들의 횡포 / 일반 상황",
  "learn": "관리의 횡포와 백성",
  "fx": {
   "note": "관아 앞에 백성들이 모인다."
  }
 },
 {
  "id": "D110",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "세자를 가르치는 스승",
   "doll": "seja"
  },
  "line": "세자 저하가 글공부보다 활쏘기를 하고 싶어 하시옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "활터로 보낸다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "세자의 화살이 과녁 한가운데를 맞혔다."
   },
   "left": {
    "label": "책상에 앉힌다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "세자는 다시 책상 앞에 앉았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "fx": {
   "note": "궁궐 뒤뜰 활터의 작은 세자 인형."
  }
 },
 {
  "id": "D111",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 의원",
   "doll": "jungin"
  },
  "line": "마을에 돌림병이 돌아 의원이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "의원을 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "의원들이 마을을 돌며 약을 나누었다."
   },
   "left": {
    "label": "문을 잠근다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "마을 사람들은 문을 걸어 잠갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255"
   }
  ],
  "sources_text": "지도서 255 의학은 중인의 일 / 일반 상황",
  "learn": "중인(의원)",
  "fx": {
   "note": "마을에 약 달이는 김이 피어오른다."
  }
 },
 {
  "id": "D112",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "비가 오지 않사옵니다. 저수지를 새로 팔까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "저수지를 판다",
    "effects": {
     "people": 10,
     "treasury": -15
    },
    "this_run": "저수지에 물이 찰랑였다.",
    "build": [
     "reservoir"
    ]
   },
   "left": {
    "label": "하늘을 기다린다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "농민들은 하늘만 바라보았다.",
    "build": [
     "reservoir"
    ]
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264"
   }
  ],
  "sources_text": "지도서 264 유의점(농사가 잘되어야 백성 생활이 안정됨) / 일반 상황",
  "learn": "농사와 백성의 삶",
  "fx": {
   "build": [
    "reservoir"
   ],
   "note": "마을 옆에 저수지가 “뽕”."
  }
 },
 {
  "id": "D113",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "공조 판서",
   "doll": "official_blue"
  },
  "line": "큰비로 강둑이 터졌사옵니다. 군사를 보내 둑을 쌓을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 보낸다",
    "effects": {
     "people": 10,
     "army": -5,
     "treasury": -5
    },
    "this_run": "군사들이 흙 가마니를 날랐다."
   },
   "left": {
    "label": "농민에게 맡긴다",
    "effects": {
     "treasury": 5,
     "people": -15
    },
    "this_run": "농민들끼리 둑을 막았다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "fx": {
   "note": "강둑에 흙 가마니가 쌓인다."
  }
 },
 {
  "id": "D114",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "시골 선비",
   "doll": "yangban"
  },
  "line": "서얼도 과거를 보게 해 달라는 상소가 올라왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "응시를 고민한다",
    "effects": {
     "people": 5,
     "nobles": -10
    },
    "this_run": "전하는 깊이 생각해 보겠다고 했다."
   },
   "left": {
    "label": "막아 둔다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "서얼의 과거 응시는 막혀 있었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 248 조선 전기에는 서얼의 과거 응시를 막기도 함(후기에는 응시 가능)",
  "learn": "신분과 과거",
  "fx": {
   "note": "과거장 문 앞에 선 젊은 선비 인형."
  }
 },
 {
  "id": "D115",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "conditions_text": "G는 G07 앞까지만",
  "rarity": "common",
  "who": {
   "name": "상민 장정",
   "doll": "farmer"
  },
  "line": "군대에 가느라 농사지을 사람이 없사옵니다. 군역을 줄여 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군역을 줄인다",
    "effects": {
     "people": 10,
     "army": -10
    },
    "this_run": "장정들이 들판으로 돌아갔다."
   },
   "left": {
    "label": "성으로 보낸다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "장정들은 창을 들고 성으로 갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85) 국역(군역)·양반은 국역 면제",
  "learn": "신분에 따른 의무",
  "fx": {
   "note": "들판과 성벽 사이를 오가는 장정 인형."
  }
 },
 {
  "id": "D116",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "상민 대표",
   "doll": "farmer"
  },
  "line": "‘양반은 왜 군대에 안 가느냐’고 백성들이 묻사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "백성 편을 든다",
    "effects": {
     "people": 10,
     "nobles": -15
    },
    "this_run": "양반들 얼굴이 굳었다."
   },
   "left": {
    "label": "예부터 그렇다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "전하는 예부터 그래 왔다고 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "85"
   }
  ],
  "sources_text": "지도서 255(교과서 85) 양반은 국역을 면제받음",
  "learn": "신분에 따른 의무",
  "fx": {
   "note": "양반과 상민 인형이 마주 선다."
  }
 },
 {
  "id": "D117",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "도화서 화원 (중인)",
   "doll": "jungin"
  },
  "line": "궁중 행사를 그릴 화원을 더 뽑을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "화원을 뽑는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "행사 그림이 두루마리로 남았다."
   },
   "left": {
    "label": "있는 사람으로",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "화원 몇 명이 바쁘게 붓을 놀렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "256"
   },
   {
    "type": "guide",
    "page": "295"
   }
  ],
  "sources_text": "지도서 256(신분제 놀이: 중인 – 화원) · 295(도화서 화원)",
  "learn": "중인의 일",
  "fx": {
   "note": "궁궐 뜰에서 화원 인형이 붓을 든다."
  }
 },
 {
  "id": "D118",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "궁궐 내관",
   "doll": "naegwan"
  },
  "line": "전하, 밤늦도록 상소를 보시니 옥체가 상하실까 걱정이옵니다. 오늘은 일찍 쉬소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "일찍 쉰다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "다음 날 전하의 얼굴이 밝았다."
   },
   "left": {
    "label": "밤새 일한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "전하는 새벽까지 등불을 켰다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "fx": {
   "note": "궁궐 창 하나의 불이 꺼지고 별이 뜬다."
  }
 },
 {
  "id": "D119",
  "kind": "daily",
  "stages": [
   "sejong",
   "seonjo",
   "yeongjo"
  ],
  "conditions_text": "S는 SX3 뒤",
  "rarity": "common",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "고을마다 잰 비의 양 기록이 올라왔사옵니다. 이를 보고 세금을 정할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "세금에 쓴다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "비가 적은 고을의 세금이 줄었다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "기록은 창고에 쌓였다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "지도서 267 지방 고을 수령이 강우량을 재 보고함",
  "learn": "측우기와 농사",
  "fx": {
   "note": "고을 측우기 눈금이 반짝인다."
  }
 },
 {
  "id": "D120",
  "kind": "daily",
  "stages": [
   "sejong",
   "seonjo",
   "yeongjo"
  ],
  "conditions_text": "S는 SX2 뒤",
  "rarity": "common",
  "who": {
   "name": "종로 상인",
   "doll": "merchant"
  },
  "line": "종로 해시계 앞에 시각을 보려는 사람이 몰려 길이 막혔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길을 넓힌다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "해시계 앞길을 넓혔다."
   },
   "left": {
    "label": "줄 서게 한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "사람들은 줄을 서서 기다렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "지도서 267 앙부일구를 사람이 많이 다니는 길가에 둠",
  "learn": "앙부일구",
  "fx": {
   "note": "해시계 앞에 줄 선 사람 인형들."
  }
 },
 {
  "id": "D121",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서당 아이",
   "doll": "child"
  },
  "line": "‘하늘 천 따 지’를 백 번 외웠사옵니다! 상을 주시옵소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상을 준다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "아이는 붓 한 자루를 받고 펄쩍 뛰었다."
   },
   "left": {
    "label": "더 외우게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "훈장님이 ‘이제 겨우 두 글자’라 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당에서 《천자문》으로 한자를 배움",
  "learn": "서당",
  "fx": {
   "note": "서당 마루에서 아이 인형이 붓을 든다."
  }
 },
 {
  "id": "D122",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "향교 유생",
   "doll": "yusaeng"
  },
  "line": "고을에 서원을 세워 훌륭한 선비를 모시고 공부하게 하소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "서원을 세운다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "산자락에 서원이 섰다.",
    "build": [
     "seowon"
    ]
   },
   "left": {
    "label": "향교로 충분하다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "유생들은 향교에서 공부했다.",
    "build": [
     "seowon"
    ]
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 향교나 서원에서 과거 공부",
  "learn": "교육 기관(서원)",
  "fx": {
   "build": [
    "seowon"
   ],
   "note": "산자락에 서원 지붕이 “뽕”."
  }
 },
 {
  "id": "D123",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "마을 혼례 집",
   "doll": "farmer"
  },
  "line": "마을에서 혼례가 열리옵니다. 잔칫상에 쓸 쌀을 내려 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "쌀을 내린다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "마을에 잔치 소리가 울렸다."
   },
   "left": {
    "label": "조촐하게 하게",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "잔치는 조촐하게 치렀다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 결혼도 유교 예절에 따라 / 일반 상황",
  "learn": "유교 예절",
  "fx": {
   "note": "마을 마당에 초례상과 사람들."
  }
 },
 {
  "id": "D124",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo",
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "어린 아들을 둔 아버지",
   "doll": "yangban"
  },
  "line": "아들에게 어른께 인사하는 법부터 가르치려 하옵니다. 서당에서도 예법을 먼저 가르치게 하소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "예법부터 가르친다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "아이들이 허리 숙여 인사하는 법을 배웠다."
   },
   "left": {
    "label": "글부터 가르친다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "서당은 글 읽기부터 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245"
   }
  ],
  "sources_text": "지도서 245 수업 도움말(어릴 때 인사·효도·웃어른 예절을 먼저 배움)",
  "learn": "유교 예절",
  "fx": {
   "note": "서당 앞에서 아이 인형이 절한다."
  }
 },
 {
  "id": "D125",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong",
   "seonjo",
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "지방 관리",
   "doll": "official_red"
  },
  "line": "부모를 지극히 모신 효자가 있사옵니다. 상을 내려 마을에 알릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상을 내린다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "효자 이야기가 고을에 퍼졌다."
   },
   "left": {
    "label": "칭찬만 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "칭찬의 말만 전했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 유교 예절, 효를 본받게 함",
  "learn": "유교 예절과 효",
  "fx": {
   "note": "마을 입구에 붉은 문(정문)이 선다."
  }
 },
 {
  "id": "D126",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J07 뒤",
  "rarity": "common",
  "who": {
   "name": "전쟁 뒤 돌아온 관리",
   "doll": "official_green"
  },
  "line": "전쟁으로 불탄 호적과 토지 문서를 다시 만들어야 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장부를 만든다",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "this_run": "관리들이 마을마다 사람과 땅을 다시 셌다."
   },
   "left": {
    "label": "비워 둔다",
    "effects": {
     "people": 5,
     "treasury": -10
    },
    "this_run": "문서는 비어 있는 채로 두었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 239 임진왜란으로 양안과 호적이 대부분 없어져 나라 운영에 차질",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "관아 책상에 새 장부가 쌓인다."
  }
 },
 {
  "id": "D130",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 향교 유생",
   "doll": "yusaeng"
  },
  "line": "향교에 가르칠 선생이 없사옵니다. 나라에서 선생(훈도)을 보내 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "훈도를 보낸다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "한양에서 온 훈도가 첫 강의를 열었다."
   },
   "left": {
    "label": "고을에 맡긴다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "유생들은 저희끼리 책을 읽었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 249 참고 자료(향교에 나라에서 교수·훈도를 보냄)",
  "learn": "교육 기관(향교)",
  "fx": {
   "note": "향교 마당에 선생 인형이 들어선다."
  }
 },
 {
  "id": "D131",
  "kind": "daily",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "한양 네 곳에 학당을 열어 아이들을 가르치면 어떨까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "학당을 연다",
    "effects": {
     "people": 5,
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "동서남북 학당에서 글 읽는 소리가 났다.",
    "build": [
     "hakdang"
    ]
   },
   "left": {
    "label": "성균관만 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "배우려는 아이들은 성균관만 바라보았다.",
    "build": [
     "hakdang"
    ]
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 249 참고 자료(한양의 4부 학당)",
  "learn": "교육 기관",
  "fx": {
   "build": [
    "hakdang"
   ],
   "note": "도성 안 네 곳에 작은 학당 지붕이 “뽕”."
  }
 },
 {
  "id": "D132",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "향약 의원",
   "doll": "jungin"
  },
  "line": "약초를 백성이 부르는 이름으로도 적어 두면 찾기 쉽사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "두 이름을 적는다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "책 속 약초 옆에 마을 이름이 함께 적혔다."
   },
   "left": {
    "label": "한자로만 적는다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "약초 이름은 어려운 한자로만 적혔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263 자료 해설(《향약집성방》에 민간에서 부르는 약초 이름까지 기록)",
  "learn": "《향약집성방》",
  "fx": {
   "note": "약초밭 팻말에 두 가지 이름이 걸린다."
  }
 },
 {
  "id": "D133",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "conditions_text": "J07 뒤",
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "전쟁 뒤 굶주림과 돌림병이 번지옵니다. 죽을 쑤어 나눌까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "죽을 나눈다",
    "effects": {
     "people": 15,
     "treasury": -15
    },
    "this_run": "관아 앞 가마솥에서 김이 피어올랐다."
   },
   "left": {
    "label": "곳간을 지킨다",
    "effects": {
     "treasury": 10,
     "people": -15
    },
    "this_run": "곳간 문은 굳게 닫혀 있었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(임진왜란 뒤 굶주림과 질병)",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "관아 마당에 큰 가마솥과 줄 선 사람들."
  }
 }
]);
})();
