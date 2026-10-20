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
   "doll": "official_red"
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
 }
]);
})();
