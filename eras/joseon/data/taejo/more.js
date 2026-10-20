/* 집필 세션의 add_T.py에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "DT101",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "새 도읍의 집터를 나눠야 하옵니다. 공신들께 좋은 자리를 먼저 드릴까요, 제비를 뽑게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공신에게 먼저 준다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "경복궁 가까운 언덕마다 공신 집 기둥이 섰다. 백성들은 산비탈로 올라갔다.",
    "build": [
     "giwa",
     "choga"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "제비를 뽑게 한다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "대감도 짚신 장수도 같은 통에 손을 넣었다. 우물가 명당은 떡 장수가 뽑았다.",
    "build": [
     "giwa",
     "choga"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 새 수도 한양 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 수도 한양에 사람들이 모여 살게 됨",
  "fx": {
   "note": "빈 터에 집 기둥이 “뽕뽕” 솟는다. 공신 먼저면 궁궐 둘레 언덕에 기와집이, 제비뽑기면 기와집과 초가가 섞인 동네가 선다."
  }
 },
 {
  "id": "DT102",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "우물 파는 장인",
   "doll": "craftsman"
  },
  "line": "물이 날지 모르는 언덕에 깊은 우물을 파 볼까요? 물이 터지면 동네가 살고, 안 터지면 헛수고이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "언덕에 깊게 판다",
    "effects": {},
    "this_run": "장인들이 언덕 꼭대기에 말뚝을 박았다."
   },
   "left": {
    "label": "개울물을 쓴다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "개울물을 길어 쓰기로 했다. 물지게 진 사람들이 언덕을 오르내렸다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "people": 15
    },
    "this_run": "맑은 물이 솟구쳤다! 동네 사람들이 바가지를 들고 춤을 췄다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "사흘을 팠지만 나온 것은 돌멩이뿐이었다. 장인들은 품삯만 받고 머리를 긁었다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍에 사람이 모이면 물이 먼저 필요하다",
  "fx": {
   "note": "언덕에서 물줄기가 “퐁” 솟거나, 흙더미만 쌓인다."
  }
 },
 {
  "id": "DT103",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "개경에서 짐을 싣고 온 수레가 한양 길목에 줄줄이 막혔사옵니다. 대감댁 장롱 수레가 길을 다 차지했사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "대감 짐부터 보낸다",
    "effects": {
     "people": -10
    },
    "this_run": "장롱 수레가 지나가는 동안 소금 장수 수레는 반나절을 기다렸다."
   },
   "left": {
    "label": "차례를 지키게 한다",
    "effects": {
     "nobles": -10
    },
    "this_run": "대감댁 장롱도 짚단 수레 뒤에 줄을 섰다. 대감은 수레 위에서 부채만 부쳤다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 238 1394년 한양으로 도읍을 옮김 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍을 옮기면 사람과 짐도 함께 옮겨 온다",
  "fx": {
   "note": "좁은 길목에 수레 행렬이 꽉 막혀 있다. 고른 쪽 수레부터 줄이 풀린다."
  }
 },
 {
  "id": "DT104",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T07) && !flag(F_성곽)"
  ],
  "conditions_text": "T07 뒤(성을 쌓은 판)",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "장사꾼들이 밤늦게까지 드나들고 싶다 하옵니다. 저녁 종이 울려도 문을 조금 더 열어 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문을 늦게 닫는다",
    "effects": {
     "people": 10,
     "army": -5
    },
    "this_run": "어둠 속에 등불 든 장사꾼들이 바쁘게 오갔다. 문지기는 하품을 참았다."
   },
   "left": {
    "label": "제때 닫는다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "종소리가 울리자 문이 닫혔다. 문밖에 남은 소금 장수가 한숨을 쉬었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '인정'",
    "url": "https://encykorea.aks.ac.kr/Article/E0047016"
   },
   {
    "type": "web",
    "title": "'파루'",
    "url": "https://encykorea.aks.ac.kr/Article/E0059560"
   },
   {
    "type": "web",
    "title": "'종루'",
    "url": "https://encykorea.aks.ac.kr/Article/E0052922"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '인정' https://encykorea.aks.ac.kr/Article/E0047016 · '파루' https://encykorea.aks.ac.kr/Article/E0059560 · '종루' https://encykorea.aks.ac.kr/Article/E0052922",
  "learn": "도성 문은 종소리에 맞춰 열고 닫았다",
  "fx": {
   "note": "해 질 녘 성문 앞에 등불 행렬. 종이 울리면 성문이 “쿵” 닫힌다."
  }
 },
 {
  "id": "DT105",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "나무꾼",
   "doll": "craftsman"
  },
  "line": "도성을 둘러싼 북악·인왕·남산·낙산에 마른 가지가 수북이 떨어졌사옵니다. 어디에 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "땔감을 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "집집마다 굴뚝에 연기가 올랐다. 아이들이 아랫목에서 뒹굴었다."
   },
   "left": {
    "label": "쌓아 둔다",
    "effects": {
     "treasury": 10
    },
    "this_run": "겨울에 쓸 땔감 더미가 관아 뒤에 차곡차곡 쌓였다. 땔감 살 돈을 아꼈다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 238 한양 도성은 북악산·낙산·남산·인왕산 능선을 따라 쌓음",
  "learn": "한양을 둘러싼 네 산",
  "fx": {
   "note": "네 산 자락에서 장작을 진 인형들이 마을로 내려오고, 굴뚝마다 흰 연기."
  }
 },
 {
  "id": "DT106",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한강 나루 사공",
   "doll": "craftsman"
  },
  "line": "한강 나루에 짐배가 몰려 서로 먼저 대겠다고 다투옵니다. 누구 배부터 댈까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "나라 배를 먼저 댄다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "나라 곡식 배가 먼저 닿았다. 젓갈 배는 물때를 놓쳐 한나절을 떠 있었다."
   },
   "left": {
    "label": "온 차례대로 댄다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "먼저 온 배부터 짐을 내렸다. 곡식 배 사공은 노를 끌어안고 졸았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 한양은 한강이 흐르고 바다가 가까워 물자를 운송하기 편리",
  "learn": "한양을 도읍으로 정한 까닭(물길)",
  "fx": {
   "note": "한강 나루에 작은 짐배들이 줄지어 닿는다."
  }
 },
 {
  "id": "DT107",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "공조 관리",
   "doll": "official_green"
  },
  "line": "개울 위에 새 돌다리를 놓았사옵니다. 첫 수레가 지나갔으니 무엇으로 기념할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다리 밟기를 한다",
    "effects": {
     "people": 10
    },
    "this_run": "다리 위에서 아이들이 깡충깡충 뛰었다. 할아버지도 몰래 한 번 뛰었다.",
    "build": [
     "bridge"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "다리 이름을 짓는다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "선비들이 다리 이름을 두고 밤새 시를 지었다. 마을 사람들은 이름보다 떡에 관심이 있었다.",
    "build": [
     "bridge"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍의 길과 다리",
  "fx": {
   "note": "개울 위에 돌다리가 “뽕” 놓이고, 인형들이 다리를 건넌다."
  }
 },
 {
  "id": "DT108",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "성 안에 집이 모자라 성 밖 개울가에 움막이 늘고 있사옵니다. 어찌할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "성 안에 들인다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "양반 동네 옆에 새 초가 동네가 생겼다. 대감들은 투덜댔고, 집 지을 나무값도 나갔다.",
    "build": [
     "choga"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "성 밖에 둔다",
    "effects": {
     "people": -10
    },
    "this_run": "개울가 움막은 비가 오면 물이 들었다. 아이들이 바가지로 물을 퍼냈다.",
    "build": [
     "choga"
    ]
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍이 커지면 살 곳이 모자란다",
  "fx": {
   "note": "성 밖 개울가에 작은 움막들. 성 안으로 들이면 초가 마을이 하나 더 선다."
  }
 },
 {
  "id": "DT109",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "도성 안을 다섯 부로 나눠 동네마다 이름을 붙이려 하옵니다. 다섯 부로 나눌까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다섯 부로 나눈다",
    "effects": {
     "nobles": 5,
     "treasury": 5,
     "people": -5
    },
    "this_run": "부마다 장부가 생겨 세금 걷기가 쉬워졌다. 백성들은 새 동네 이름을 외우느라 헷갈렸다."
   },
   "left": {
    "label": "옛 이름을 쓴다",
    "effects": {
     "people": 5,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "“윗동네 우물집 옆” 같은 옛 주소가 그대로 쓰였다. 관리들은 편지 배달에 진땀을 뺐다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 5년 4월 19일(5부 52방에 이름 표지를 세움)",
    "url": "https://sillok.history.go.kr/id/kaa_10504019_001"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '한성부'",
    "url": "https://encykorea.aks.ac.kr/Article/E0061730"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 5년 4월 19일(5부 52방에 이름 표지를 세움) https://sillok.history.go.kr/id/kaa_10504019_001 · 한국민족문화대백과사전 '한성부' https://encykorea.aks.ac.kr/Article/E0061730",
  "learn": "한성부와 다섯 부",
  "fx": {
   "note": "도성 위에 다섯 빛깔 구획선이 잠깐 떠올랐다 사라진다."
  }
 },
 {
  "id": "DT110",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "개경 상인",
   "doll": "merchant"
  },
  "line": "조상 무덤이 개경에 있어 한양으로 못 가겠사옵니다. 그냥 두시면 안 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한양으로 데려온다",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "this_run": "개경 상인들이 울며 짐을 쌌다. 한양 장터는 금세 북적였다."
   },
   "left": {
    "label": "개경에 남게 둔다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "개경 장터는 그대로 붐볐다. 한양 장터에는 파리만 날렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 238 1394년 한양으로 도읍을 옮김 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍을 옮길 때의 어려움",
  "fx": {
   "note": "개경 쪽 길에서 짐 지게 행렬이 한양으로 들어오거나, 되돌아간다."
  }
 },
 {
  "id": "DT111",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "궁궐 대목장",
   "doll": "craftsman"
  },
  "line": "기둥 나무가 모자라옵니다. 먼 산의 큰 소나무를 베어 올까요, 작은 나무를 이어 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "큰 소나무를 벤다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "큰 소나무가 뗏목이 되어 강을 내려왔다. 대신들이 굵은 기둥을 두드려 보며 흐뭇해했다."
   },
   "left": {
    "label": "작은 나무를 잇는다",
    "effects": {
     "treasury": 10,
     "nobles": -10
    },
    "this_run": "기둥에 이음매가 생겼다. 대신들은 “궁궐 기둥이 조각보 같다”며 혀를 찼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "궁궐을 짓는 사람들",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "강 위로 통나무 뗏목이 떠내려오거나, 공사장에서 나무를 잇는 망치 소리."
  }
 },
 {
  "id": "DT112",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "기와장이",
   "doll": "craftsman"
  },
  "line": "가마에 기와를 한가득 넣어 한 번에 구워 볼까요? 잘되면 금방 끝나고, 잘못되면 다 금이 가옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한가득 굽는다",
    "effects": {},
    "this_run": "기와장이가 가마 문을 진흙으로 꼭꼭 막았다."
   },
   "left": {
    "label": "조금씩 굽는다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "기와를 조금씩 구웠다. 느렸지만 깨진 것은 없었다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "가마 문을 열자 기와가 한 장도 깨지지 않고 반짝였다!"
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "가마 문을 열자 기와마다 “쩍” 금이 가 있었다. 기와장이가 털썩 주저앉았다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기와를 굽는 가마",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "가마 굴뚝에서 연기가 오르고, 문을 열면 기와가 반짝이거나 금이 가 있다."
  }
 },
 {
  "id": "DT113",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "석수",
   "doll": "craftsman"
  },
  "line": "돌 캐던 산비탈에 금이 갔사옵니다. 공사를 멈출까요, 조심해서 계속 캘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공사를 멈춘다",
    "effects": {
     "nobles": -10
    },
    "this_run": "공사를 서두르던 대신들이 “이러다 언제 짓느냐”며 발을 굴렀다."
   },
   "left": {
    "label": "조심해서 캔다",
    "effects": {
     "people": -10
    },
    "this_run": "일꾼들이 살금살금 돌을 날랐다. 다들 밤마다 무너지는 꿈을 꾸었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "돌을 캐는 사람들",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "산비탈에 금이 간 바위. 멈추면 바위 앞에 새끼줄이 쳐진다."
  }
 },
 {
  "id": "DT114",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "일꾼들 밥을 어찌할까요? 고깃국을 끓여 줄까요, 쌀밥만 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고깃국을 끓인다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "일꾼들이 국그릇을 들고 노래를 불렀다. 돌이 평소보다 빨리 올라갔다."
   },
   "left": {
    "label": "쌀밥만 준다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "일꾼들은 밥만 먹고 말없이 돌을 날랐다. 곳간지기는 콧노래를 불렀다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "공사장 일꾼의 살림",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "공사장 가마솥에서 김이 오른다. 고깃국이면 일꾼 인형들이 둘러앉는다."
  }
 },
 {
  "id": "DT115",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "겨울 공사장에 손발이 언 일꾼이 늘고 있사옵니다. 어찌 녹여 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "솜옷을 나눈다",
    "effects": {
     "treasury": -10
    },
    "this_run": "곳간의 솜이 모두 공사장으로 갔다. 일꾼들은 솜옷을 입고 둥글둥글해졌다."
   },
   "left": {
    "label": "모닥불만 피운다",
    "effects": {
     "people": -10
    },
    "this_run": "모닥불은 따뜻했지만 손등은 그대로 갈라졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "겨울 공사의 어려움",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "눈 내리는 공사장에 모닥불 몇 개. 솜옷을 나누면 일꾼 인형 옷이 두툼해진다."
  }
 },
 {
  "id": "DT116",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "돌에 발을 다친 일꾼이 있사옵니다. 집으로 보낼까요, 남겨서 가벼운 일을 맡길까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "품삯 주어 보낸다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "일꾼은 품삯을 쥐고 절룩이며 고향으로 갔다. 마을 사람들이 그를 반겼다."
   },
   "left": {
    "label": "가벼운 일을 준다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "일꾼은 앉아서 새끼줄을 꼬았다. 다리는 더디 나았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "공사장 일꾼의 살림",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "다친 일꾼 인형이 지팡이를 짚고 고향 길로 가거나, 공사장 그늘에 앉는다."
  }
 },
 {
  "id": "DT117",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T05)"
  ],
  "conditions_text": "T05 뒤",
  "who": {
   "name": "일꾼 우두머리",
   "doll": "craftsman"
  },
  "line": "건물 한 채가 다 올라갔사옵니다! 일꾼들이 잔치를 바라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "막걸리를 돌린다",
    "effects": {
     "people": 10
    },
    "this_run": "공사장 마당에 꽹과리 소리가 울렸다. 감독관도 어깨를 들썩였다."
   },
   "left": {
    "label": "사흘 쉬게 한다",
    "effects": {
     "treasury": 10
    },
    "this_run": "사흘 동안 공사장이 조용했다. 그동안 나갈 품삯을 아꼈다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "공사를 마친 기쁨",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "공사장 마당에 깃발과 꽹과리. 쉬게 하면 일꾼 인형들이 집으로 흩어진다."
  }
 },
 {
  "id": "DT118",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "장맛비에 쌓아 둔 흙더미가 쓸려 내려와 큰길을 막았사옵니다. 누가 치울까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사가 치운다",
    "effects": {
     "army": -10
    },
    "this_run": "군사들이 성벽 대신 흙을 퍼 날랐다. 성벽 위는 한동안 텅 비었다."
   },
   "left": {
    "label": "비 그친 뒤 치운다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "비 그칠 때까지 기다렸다. 진흙길에 수레가 빠져 장이 사흘 멈췄다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍 공사의 어려움",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "큰길에 흙더미. 군사 인형들이 삽을 들거나, 수레가 진흙에 빠져 있다."
  }
 },
 {
  "id": "DT119",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T07) && !flag(F_성곽)"
  ],
  "conditions_text": "T07 뒤",
  "who": {
   "name": "도성 공사 감독관",
   "doll": "official_blue"
  },
  "line": "성돌에 맡은 고을 이름을 새기게 하면, 나중에 무너져도 누가 쌓았는지 알 수 있사옵니다. 새기게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "이름을 새긴다",
    "effects": {
     "army": 5,
     "nobles": -5,
     "people": -5
    },
    "this_run": "고을 이름이 걸리자 일꾼들이 돌을 더 단단히 맞췄다. 수령들은 진땀을 흘렸다."
   },
   "left": {
    "label": "그냥 쌓게 둔다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "army": -5
    },
    "this_run": "공사는 빨랐다. 그런데 어디가 허술한지 아무도 몰랐다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 5년 1월 9일(도성을 97구간으로 나눔)",
    "url": "https://sillok.history.go.kr/id/kaa_10501009_001"
   },
   {
    "type": "web",
    "title": "고을 이름을 새김)",
    "url": "https://encykorea.aks.ac.kr/Article/E0028013"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 5년 1월 9일(도성을 97구간으로 나눔) https://sillok.history.go.kr/id/kaa_10501009_001 · 한국민족문화대백과사전 '서울 한양도성'(성돌에 감독자·고을 이름을 새김) https://encykorea.aks.ac.kr/Article/E0028013",
  "learn": "성돌에 새긴 글자(공사 구간 표시)",
  "fx": {
   "glyphs": {
    "wall": "✦"
   },
   "build": [
    "workyard"
   ],
   "note": "성벽 돌 하나에 글자가 새겨지며 잠깐 빛난다."
  }
 },
 {
  "id": "DT120",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !seen(T08)"
  ],
  "conditions_text": "T04 뒤, T08 앞(공사철)",
  "who": {
   "name": "석수 우두머리",
   "doll": "craftsman"
  },
  "line": "산에서 집채만 한 바위를 통째로 떼어 내 볼까요? 잘되면 주춧돌이 쏟아지옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "통째로 떼어 낸다",
    "effects": {},
    "this_run": "석수들이 바위 틈에 나무 쐐기를 박고 물을 부었다."
   },
   "left": {
    "label": "조금씩 쪼갠다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "작은 돌을 조금씩 쪼개 모았다. 먼저 모인 돌은 성벽 쪽으로 갔다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "바위가 반듯하게 갈라져 주춧돌 백 개가 나왔다!"
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "바위가 엉뚱한 쪽으로 굴러 일꾼들이 혼비백산 흩어졌다. 다친 사람은 없었지만 다들 일손을 놓았다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "돌을 캐는 사람들",
  "fx": {
   "build": [
    "workyard"
   ],
   "note": "바위가 “쩍” 갈라지며 반듯한 돌이 쏟아지거나, 엉뚱하게 데굴데굴 굴러간다."
  }
 },
 {
  "id": "DT121",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02) && !flag(F_불교)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "큰 절이 가진 땅과 노비를 나라로 거둘까요? 늙은 스님들 몫은 남겨 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모두 거둔다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "절 곳간의 쌀이 나라 곳간으로 옮겨졌다. 절에 기대던 백성들이 서운해했다."
   },
   "left": {
    "label": "스님 몫은 남긴다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "늙은 스님들이 합장하며 고개를 숙였다. 곳간은 기대만큼 차지 않았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "228"
   }
  ],
  "sources_text": "지도서 228 고려 때 컸던 불교의 비중이 조선에서 크게 줄어듦",
  "learn": "불교 대신 유교가 중심이 됨",
  "fx": {
   "note": "산자락 절의 곳간에서 쌀가마 수레가 도성 쪽으로 내려간다."
  }
 },
 {
  "id": "DT122",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "해마다 절에서 하던 큰 잔치를 올해도 열어 달라는 백성이 많사옵니다. 열게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "올해는 열게 한다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "등불 아래 백성들이 오랜만에 웃었다. 유학자 신하들은 고개를 저었다."
   },
   "left": {
    "label": "잔치를 줄인다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "절 마당이 조용했다. 아이들은 등불 대신 반딧불을 잡으러 갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "228"
   }
  ],
  "sources_text": "지도서 228 고려 때 컸던 불교의 비중이 조선에서 크게 줄어듦",
  "learn": "고려와 달라진 조선의 생활",
  "fx": {
   "note": "산자락 절 마당에 등불이 하나둘 켜지거나, 어둡게 남는다."
  }
 },
 {
  "id": "DT123",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "절에 다니던 할머니가 “이제 어디 가서 비느냐”며 관아 앞에 앉아 계시옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "절에 가시게 둔다",
    "effects": {
     "nobles": -10
    },
    "this_run": "할머니는 웃으며 절로 갔다. 유학자 관리들은 “나라 뜻과 다르다”며 상소를 썼다."
   },
   "left": {
    "label": "선비를 보낸다",
    "effects": {
     "people": -5,
     "nobles": -5
    },
    "this_run": "향교 선비가 찾아가 예법을 일러 드렸다. 할머니는 끝까지 고개를 갸웃했고, 선비는 진이 빠졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "생활 습관은 하루아침에 바뀌지 않는다",
  "fx": {
   "note": "관아 앞 섬돌에 작은 할머니 인형이 앉아 있다."
  },
  "caution": "종교를 놀리지 않는다. 할머니를 웃음거리로 그리지 않는다."
 },
 {
  "id": "DT124",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "양반 집안 어른",
   "doll": "yangban"
  },
  "line": "조상 제사를 유교 예법대로 지내라 하니, 상 차리는 순서를 몰라 집안이 시끌시끌하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "예법 책을 나눈다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "집집마다 예법 책을 펴 놓고 형제끼리 “홍동백서냐, 백동홍서냐” 다퉜다."
   },
   "left": {
    "label": "하던 대로 둔다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "할머니 하던 대로 상을 차렸다. 아무도 다투지 않았지만 예법 따지는 선비는 혀를 찼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "231"
   }
  ],
  "sources_text": "지도서 231 고려 말~조선 초 민간에 유교식 제사 풍습이 자리 잡음 · 246(교과서 82) 제사도 유교 예절에 따라",
  "learn": "유교 예절이 생활로 들어옴",
  "fx": {
   "note": "양반집 대청에 제사상이 차려지고, 예법 책 두루마리가 펼쳐진다."
  }
 },
 {
  "id": "DT125",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "궁궐 침방 나인",
   "doll": "courtlady"
  },
  "line": "새 나라 관복을 다 짓고 옷감이 넉넉히 남았사옵니다. 남은 천을 어디에 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "아이 옷을 짓는다",
    "effects": {
     "people": 10
    },
    "this_run": "고을 아이들이 새 저고리를 입고 골목을 뛰어다녔다."
   },
   "left": {
    "label": "창고에 넣어 둔다",
    "effects": {
     "treasury": 10
    },
    "this_run": "남은 옷감은 궁궐 창고에 차곡차곡 쌓였다. 다음 해 관복 걱정이 사라졌다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 나라의 새 옷차림",
  "fx": {
   "note": "궁궐 마당에 붉은 옷감 필이 펼쳐진다."
  }
 },
 {
  "id": "DT126",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "비가 오지 않아 마을 사람들이 큰 굿을 하겠다 하옵니다. 관리들은 유교식으로 비를 빌자 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마을에 맡긴다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "징 소리가 사흘 밤낮 울렸다. 유학자 관리는 귀를 막고 잠을 설쳤다."
   },
   "left": {
    "label": "유교식으로 빈다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "관리들이 단정히 절하며 비를 빌었다. 마을 사람들은 “흥이 안 난다”며 수군댔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "옛 풍습과 유교 예법이 함께 있던 때",
  "fx": {
   "note": "마른 논 위로 구름 한 점. 고른 쪽 소리(징 / 조용한 절)가 들린다."
  },
  "caution": "풍습을 놀리지 않는다."
 },
 {
  "id": "DT127",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "궁궐 악공",
   "doll": "official_red"
  },
  "line": "궁궐 잔치에서 고려 때 부르던 노래를 계속 부를까요, 새 나라 노래를 지을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "옛 노래를 부른다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "익숙한 가락에 사람들이 흥얼거렸다. 새 노래 지을 돈도 아꼈다."
   },
   "left": {
    "label": "새 노래를 짓는다",
    "effects": {
     "nobles": 5,
     "treasury": -5,
     "people": -5
    },
    "this_run": "새 나라를 기리는 노래가 울렸다. 가사가 어려워 따라 부르는 사람은 적었다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 나라는 새 노래를 만들고 싶어 했다",
  "fx": {
   "note": "궁궐 마당에 악공 인형들이 둘러앉아 연주한다."
  }
 },
 {
  "id": "DT128",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "나라 제사가 많아 제물 마련에 백성 허리가 휘옵니다. 제사를 줄일까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "제사를 줄인다",
    "effects": {
     "nobles": -10
    },
    "this_run": "제사가 줄자 대신들이 “예법이 무너진다”며 혀를 찼다."
   },
   "left": {
    "label": "그대로 지낸다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "제사는 그대로였다. 장터 생선값이 껑충 뛰었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 조선은 제사 등을 유교 예절에 따라 치름",
  "learn": "유교와 제사",
  "fx": {
   "note": "제단 위 제물 상이 줄거나, 장터 생선 가게 앞이 붐빈다."
  }
 },
 {
  "id": "DT129",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "향교 선비",
   "doll": "yangban"
  },
  "line": "산속 옛 절터 창고에 오래된 책 상자가 있다는 소문이옵니다. 자물쇠를 뜯어 볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "자물쇠를 뜯는다",
    "effects": {},
    "this_run": "선비들이 자물쇠 장인을 데리고 산을 올랐다."
   },
   "left": {
    "label": "새 책을 산다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "창고는 그대로 두고, 그 돈으로 향교에 새 책을 샀다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "상자에서 귀한 옛 책이 쏟아졌다! 선비들이 소리를 지르며 껴안았다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "상자 안에는 쥐가 갉아 먹은 종이 부스러기뿐이었다. 장인 품삯만 나갔다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "옛 책을 아끼는 마음",
  "fx": {
   "note": "산속 낡은 창고 문이 “끼익” 열리며 먼지가 피어오른다."
  }
 },
 {
  "id": "DT130",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "포도청 군관",
   "doll": "general"
  },
  "line": "골목 아이들이 갓 쓴 선비 흉내를 내며 “공자 왈!” 하고 뛰어다니옵니다. 버릇없다고 혼낼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "웃고 넘어간다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "아이들은 더 신이 나서 “맹자 왈!”까지 외쳤다. 선비들은 못 들은 척했다."
   },
   "left": {
    "label": "예법을 가르친다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "아이들은 꾸벅 절하고 돌아섰다. 그리고 골목 끝에서 또 “공자 왈!”을 외쳤다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "유교가 생활 곳곳에 퍼짐",
  "fx": {
   "note": "골목에서 종이 갓을 쓴 아이 인형들이 줄지어 뛰어간다."
  }
 },
 {
  "id": "DT131",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "개국 공신",
   "doll": "official_red"
  },
  "line": "새 나라를 세운 공을 생각하시어 상으로 받은 땅을 조금 더 늘려 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "땅을 더 준다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "공신들이 새 땅 문서를 받고 허허 웃었다. 나라 땅은 그만큼 줄었다."
   },
   "left": {
    "label": "나라 땅으로 둔다",
    "effects": {
     "treasury": 10,
     "nobles": -10
    },
    "this_run": "전하는 “나라 땅은 나라의 것”이라 했다. 공신들은 술잔만 만지작거렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 8월 20일(개국 공신 등급)",
    "url": "https://sillok.history.go.kr/id/kaa_10108020_002"
   },
   {
    "type": "web",
    "title": "9월 16일(공신에게 땅과 노비를 내림)",
    "url": "https://sillok.history.go.kr/id/kaa_10109016_002"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 8월 20일(개국 공신 등급) https://sillok.history.go.kr/id/kaa_10108020_002 · 9월 16일(공신에게 땅과 노비를 내림) https://sillok.history.go.kr/id/kaa_10109016_002",
  "learn": "개국 공신",
  "fx": {
   "note": "공신 집 마당에 땅 문서 두루마리가 쌓이거나, 그대로 나라 곳간에 남는다."
  }
 },
 {
  "id": "DT132",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "공신 두 분이 서로 “내 공이 더 크다”며 회의 자리에서 언성을 높이셨사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "둘 다 꾸짖는다",
    "effects": {
     "nobles": -10
    },
    "this_run": "두 대감이 동시에 입을 삐죽 내밀었다. 그날 회의는 아무것도 정하지 못했다."
   },
   "left": {
    "label": "못 본 척한다",
    "effects": {
     "army": -5,
     "nobles": -5
    },
    "this_run": "다툼이 길어져 군사 일이 미뤄졌다. 다른 대신들도 편을 갈라 수군댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 나라를 세운 사람들 사이의 다툼",
  "fx": {
   "note": "조정 마당에서 관복 입은 인형 둘이 등을 돌리고 선다."
  }
 },
 {
  "id": "DT133",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "고려 때 일 잘하던 관리들을 다시 불러 쓸까요, 새 사람만 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "옛 관리도 쓴다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "옛 관리들이 장부를 척척 넘겼다. 공신들은 “고려 사람이 왜 여기 있나” 하고 수군댔다."
   },
   "left": {
    "label": "새 사람만 쓴다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "새 관리들은 의욕이 넘쳤다. 다만 장부 보는 법을 몰라 한참 헤맸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 나라를 꾸려 갈 사람들",
  "fx": {
   "note": "관청 마루에 관리 인형들이 앉아 장부를 넘긴다."
  }
 },
 {
  "id": "DT134",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "멀리 떨어진 고을에 보낼 수령을 정해야 하옵니다. 누구를 보낼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공신을 보낸다",
    "effects": {
     "nobles": 5,
     "army": 5,
     "people": -5
    },
    "this_run": "공신 출신 수령은 군사는 잘 챙겼다. 그런데 백성 말은 잘 듣지 않았다."
   },
   "left": {
    "label": "토박이를 보낸다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "army": -5
    },
    "this_run": "그 고을 토박이가 수령이 되었다. 백성들은 반겼지만 성벽 공사는 늦어졌다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "지방을 다스리는 수령",
  "fx": {
   "note": "먼 고을 관아로 가마 하나가 산길을 넘어간다."
  }
 },
 {
  "id": "DT135",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "관리들 녹봉을 무엇으로 줄까요? 쌀로 넉넉히 줄까요, 베를 섞어 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "쌀로 넉넉히 준다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "관리들이 쌀가마를 지고 싱글벙글 퇴근했다."
   },
   "left": {
    "label": "베를 섞어 준다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "관리들은 베를 들고 장터에서 쌀로 바꾸느라 하루를 다 썼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "관리의 녹봉",
  "fx": {
   "note": "관청 앞에 녹봉 쌀가마가 쌓이거나, 베 필이 쌓인다."
  }
 },
 {
  "id": "DT136",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "산속에 숨어 사는 이름난 선비가 있다 하옵니다. 소문만큼일지는 모르오나 직접 모시러 갈까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모시러 간다",
    "effects": {},
    "this_run": "가마꾼들이 산길을 사흘 동안 올랐다."
   },
   "left": {
    "label": "시험으로 뽑는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "시험을 열어 사람을 뽑았다. 붓 소리가 마당을 가득 채웠다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "선비는 소문보다 더 뛰어났다. 회의 때마다 좋은 꾀를 냈다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "선비는 사흘 내내 낮잠만 자다가 “산이 그립다”며 돌아갔다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "나라를 꾸려 갈 인재 찾기",
  "fx": {
   "note": "산속 초가에서 선비 인형이 가마에 오르거나, 문을 닫는다."
  }
 },
 {
  "id": "DT137",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "공신 한 분이 고향에서 딴 감을 한 수레 바쳤사옵니다. 어떻게 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곶감을 만든다",
    "effects": {
     "treasury": 10
    },
    "this_run": "감을 깎아 처마에 매달았다. 겨울 곳간이 곶감으로 달콤해졌다."
   },
   "left": {
    "label": "군사에게 보낸다",
    "effects": {
     "army": 10
    },
    "this_run": "성벽 위 군사들이 감을 한 입씩 베어 물었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기쁨을 나누는 임금",
  "fx": {
   "note": "궁궐 마당에 주황빛 감 수레. 고른 쪽 인형들 손에 감이 하나씩."
  }
 },
 {
  "id": "DT138",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "사헌부 관리",
   "doll": "official_green"
  },
  "line": "공신 한 분이 뇌물을 받았다는 말이 있사옵니다. 사헌부가 조사해도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "조사하게 한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "조사가 시작되자 공신들 얼굴이 하얘졌다. 백성들은 “새 나라는 다르다”고 했다."
   },
   "left": {
    "label": "공신을 감싼다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "전하는 공신을 감쌌다. 백성들은 “그럼 그렇지” 하고 돌아섰다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 7월 28일(관제: 사헌부가 관리의 잘못을 따짐)",
    "url": "https://sillok.history.go.kr/id/kaa_10107028_004"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 7월 28일(관제: 사헌부가 관리의 잘못을 따짐) https://sillok.history.go.kr/id/kaa_10107028_004",
  "learn": "관리를 감시하는 기관(사헌부)",
  "fx": {
   "note": "사헌부 관리 인형이 두루마리를 들고 공신 집 대문 앞에 선다."
  }
 },
 {
  "id": "DT139",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "개국 공신",
   "doll": "official_red"
  },
  "line": "공신 자식들에게는 시험 없이 벼슬을 주시면 어떻겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "벼슬을 준다",
    "effects": {
     "nobles": 10,
     "people": -5,
     "treasury": -5
    },
    "this_run": "공신 자식들이 관복을 입었다. 밤새 공부하던 선비들은 붓을 내던졌다."
   },
   "left": {
    "label": "시험을 보게 한다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -10
    },
    "this_run": "공신 자식들도 시험장에 앉았다. 몇은 떨어져 얼굴이 빨개졌다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "관리를 뽑는 공정한 방법",
  "fx": {
   "note": "관청 마당에 관복을 받는 인형들, 또는 시험지를 든 인형들."
  }
 },
 {
  "id": "DT140",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "젊은 관리",
   "doll": "official_blue"
  },
  "line": "전하, 사냥을 너무 자주 나가시옵니다. 나랏일이 밀리오니 줄이소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사냥을 줄인다",
    "effects": {
     "nobles": 10,
     "army": -5
    },
    "this_run": "전하는 활을 벽에 걸고 상소를 읽었다. 군사들은 심심해했다."
   },
   "left": {
    "label": "훈련이라 한다",
    "effects": {
     "army": 5,
     "nobles": -10
    },
    "this_run": "전하는 “이것도 군사 훈련이니라” 하며 말에 올랐다. 젊은 관리는 상소를 또 썼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "임금에게 바른말을 하는 신하",
  "fx": {
   "note": "궁궐 벽에 활이 걸리거나, 왕 인형이 말을 타고 성문을 나선다."
  }
 },
 {
  "id": "DT141",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "봄에 뿌릴 씨앗이 없는 집이 많사옵니다. 곳간 종자를 빌려줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "종자를 빌려준다",
    "effects": {
     "treasury": -5
    },
    "this_run": "종자 자루를 받은 농부들이 고개를 숙이고 논으로 갔다."
   },
   "left": {
    "label": "곳간을 지킨다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "곳간 문은 닫혔다. 빈 논에 잡초만 났다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DT141f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 9월 24일(의창 규정)",
    "url": "https://sillok.history.go.kr/id/kaa_10109024_001"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '의창'",
    "url": "https://encykorea.aks.ac.kr/Article/E0043415"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 9월 24일(의창 규정) https://sillok.history.go.kr/id/kaa_10109024_001 · 한국민족문화대백과사전 '의창' https://encykorea.aks.ac.kr/Article/E0043415",
  "learn": "흉년과 봄철에 곡식을 빌려주던 제도",
  "fx": {
   "note": "관아 곳간 앞에 종자 자루. 빌려주면 빈 논에 연둣빛 싹이 돋는다(열매 카드에서 누렇게 익음)."
  }
 },
 {
  "id": "DT141f",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chosen(DT141,R)"
  ],
  "conditions_text": "DT141에서 ‘종자를 빌려준다’를 고르면 6장 뒤(열매)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "봄에 종자를 빌려 간 농부들이 가을걷이를 마치고 곡식을 들고 왔사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간에 받는다",
    "effects": {
     "treasury": 15
    },
    "this_run": "갚은 곡식이 곳간에 그득했다. 곳간지기가 볏섬을 세다 잠들었다."
   },
   "left": {
    "label": "떡 잔치로 받는다",
    "effects": {
     "people": 15
    },
    "this_run": "“올해는 떡으로 받으마.” 마을마다 햅쌀 떡을 쪘다."
   }
  },
  "grain": "gift",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '의창'",
    "url": "https://encykorea.aks.ac.kr/Article/E0043415"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '의창' https://encykorea.aks.ac.kr/Article/E0043415",
  "learn": "빌려준 곡식이 가을에 돌아옴",
  "fx": {
   "note": "봄에 싹이 돋았던 논이 누렇게 익고, 볏섬 수레가 관아로 들어온다."
  }
 },
 {
  "id": "DT142",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "올해는 비가 알맞게 내려 들판이 온통 누렇사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "풍년 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "풍년 잔치에 온 마을이 들썩였다. 소도 한 그릇 더 먹었다."
   },
   "left": {
    "label": "곳간을 채운다",
    "effects": {
     "treasury": 10
    },
    "this_run": "곳간에 볏섬이 차곡차곡 쌓였다. 곳간지기가 춤을 췄다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "풍년의 기쁨",
  "fx": {
   "note": "들판이 금빛으로 물들고, 고른 쪽(마을 잔치 / 곳간)에 볏섬이 쌓인다."
  }
 },
 {
  "id": "DT143",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "부모 없는 아이와 홀로 사는 노인들이 겨울을 걱정하옵니다. 어찌 돌볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "관아가 돌본다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "관아에서 쌀과 땔감을 보냈다. 노인은 아이에게 옛이야기를 들려주었다."
   },
   "left": {
    "label": "이웃에게 맡긴다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "이웃들이 번갈아 죽을 날랐다. 정성은 컸지만 손이 모자랐다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "자식 없는 노인을 돌보라)",
    "url": "https://sillok.history.go.kr/id/kaa_10107028_003"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 7월 28일 즉위 교서(홀아비·과부·고아·자식 없는 노인을 돌보라) https://sillok.history.go.kr/id/kaa_10107028_003",
  "learn": "어려운 백성을 돌보는 나라",
  "fx": {
   "note": "눈 덮인 초가에 관아 수레가 닿고, 굴뚝에서 연기가 오른다."
  }
 },
 {
  "id": "DT144",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "조운 관리",
   "doll": "official_green"
  },
  "line": "세금으로 거둔 곡식을 큰 배 한 척에 몽땅 실어 바닷길로 보낼까요? 빠르지만 풍랑이 걱정이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "큰 배로 보낸다",
    "effects": {},
    "this_run": "큰 배가 돛을 활짝 펴고 포구를 떠났다."
   },
   "left": {
    "label": "작은 배로 나눈다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "작은 배 여러 척에 나눠 실었다. 사공을 많이 부르느라 바닷가 마을이 바빴다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "배가 순풍을 타고 한 번에 나루에 닿았다! 곳간이 가득 찼다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "풍랑을 만나 배가 섬 뒤에 숨었다. 젖은 쌀가마를 말리느라 한 달이 걸렸다."
   }
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '조운'",
    "url": "https://encykorea.aks.ac.kr/Article/E0052436"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '조운' https://encykorea.aks.ac.kr/Article/E0052436",
  "learn": "세금 곡식을 배로 나르던 일",
  "fx": {
   "note": "바다 위로 큰 돛배 한 척이 지나가거나, 작은 배 여러 척이 줄지어 간다."
  }
 },
 {
  "id": "DT145",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "새 도읍의 장터를 어디에 둘까요? 궁궐 앞 큰길에 둘까요, 개울가에 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "큰길에 둔다",
    "effects": {
     "treasury": 10,
     "nobles": -10
    },
    "this_run": "큰길 장터가 시끌벅적했다. 대신들은 회의 중에 “엿 사려!” 소리를 들었다."
   },
   "left": {
    "label": "개울가에 둔다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "개울가 장터는 조용했다. 손님이 적어 장사꾼들이 하품을 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도읍의 장터(상업은 뒤의 왕 때 크게 자람)",
  "fx": {
   "note": "궁궐 앞 큰길이나 개울가에 천막 장터가 “뽕” 펼쳐진다."
  }
 },
 {
  "id": "DT146",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "마을 소들이 병에 걸려 쟁기를 끌 소가 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "관아 소를 빌린다",
    "effects": {
     "army": -5,
     "treasury": -5
    },
    "this_run": "군영 말과 관아 소가 논으로 갔다. 말들은 쟁기를 처음 끌어 보고 어리둥절했다."
   },
   "left": {
    "label": "사람이 쟁기를 끈다",
    "effects": {
     "people": -10
    },
    "this_run": "장정 셋이 소 대신 쟁기를 끌었다. 저녁마다 어깨를 주물렀다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "농사와 소",
  "fx": {
   "note": "논에서 말 인형이 쟁기를 끌거나, 사람 인형 셋이 쟁기를 끈다."
  }
 },
 {
  "id": "DT147",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "논에 메뚜기 떼가 새까맣게 내려앉았사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사가 쫓는다",
    "effects": {
     "army": -10
    },
    "this_run": "군사들이 깃발을 흔들며 논두렁을 뛰어다녔다. 성벽 위는 텅 비었다."
   },
   "left": {
    "label": "백성이 잡게 둔다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "백성들이 밤새 메뚜기를 잡았다. 그해 세금은 덜 걷혔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "농사의 어려움",
  "fx": {
   "note": "논 위로 작은 점들이 구름처럼 지나가고, 깃발 든 인형들이 뛴다."
  }
 },
 {
  "id": "DT148",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "형조 관리",
   "doll": "official_red"
  },
  "line": "“원래 양인이었는데 억울하게 노비가 되었다”는 호소가 쌓였사옵니다. 문서를 다시 살필까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문서를 다시 본다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "문서를 다시 보니 억울한 사람이 여럿 풀려났다. 주인들은 얼굴을 붉혔다."
   },
   "left": {
    "label": "주인 문서를 따른다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "주인의 문서대로 정했다. 호소한 사람은 고개를 떨구고 돌아갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '노비변정도감'(1395년 노비 다툼을 가리는 관청",
    "url": "https://encykorea.aks.ac.kr/Contents/Item/E0012761"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림) 고려 말 노비 수가 크게 늘어남 · [교과서 밖] 한국민족문화대백과사전 '노비변정도감'(1395년 노비 다툼을 가리는 관청) https://encykorea.aks.ac.kr/Contents/Item/E0012761",
  "learn": "고려 말 노비가 크게 늘어 생긴 다툼",
  "fx": {
   "note": "관청 마루에 노비 문서 더미. 다시 살피면 문서 몇 장이 바람에 날아간다."
  },
  "caution": "노비를 놀림감으로 쓰지 않는다. 호소하는 사람의 말투를 존중한다(지도서 256)."
 },
 {
  "id": "DT149",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "한 농부가 “수령이 우리 소를 빼앗아 갔다”며 궁궐 문 앞에 엎드려 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "직접 듣는다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "전하가 직접 이야기를 듣자 소가 돌아왔다. 수령 편 대신들은 못마땅해했다."
   },
   "left": {
    "label": "관아로 돌려보낸다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "this_run": "농부는 고을 관아로 돌려보내졌다. 소는 돌아오지 않았다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "억울한 백성의 목소리",
  "fx": {
   "note": "궁궐 문 앞에 엎드린 농부 인형. 직접 들으면 소 한 마리가 고을로 걸어간다."
  }
 },
 {
  "id": "DT150",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "새 나라가 섰다며 고을마다 축하 잔치를 바라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "떡을 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "고을마다 떡을 찌고 그네를 맸다."
   },
   "left": {
    "label": "활쏘기 대회를 연다",
    "effects": {
     "army": 10
    },
    "this_run": "활쏘기 대회가 열렸다. 과녁 앞에 구경꾼이 구름처럼 모였다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "새 나라를 맞는 백성",
  "fx": {
   "note": "마을마다 깃발이 오르고, 그네나 과녁이 “뽕” 선다."
  }
 },
 {
  "id": "DT151",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "왜구가 휩쓸고 간 바닷가 마을이 텅 비었사옵니다. 어찌 도울까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간을 연다",
    "effects": {
     "treasury": -10
    },
    "this_run": "쌀 수레가 바닷가로 내려갔다. 사람들이 하나둘 마을로 돌아왔다."
   },
   "left": {
    "label": "군사를 남긴다",
    "effects": {
     "army": -10
    },
    "this_run": "군사 일부가 바닷가에 남아 지켰다. 도성 성벽이 허전해졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 왜구(일본 해적)의 침입이 계속됨",
  "learn": "왜구의 침입",
  "fx": {
   "note": "바닷가 빈 마을에 쌀 수레가 닿거나, 군사 깃발이 선다(사람이 다치는 장면 없음)."
  }
 },
 {
  "id": "DT152",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "북쪽 국경 관리",
   "doll": "official_red"
  },
  "line": "여진 추장이 무리를 이끌고 와 “조선 백성이 되겠다”며 벼슬을 청하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "벼슬을 내린다",
    "effects": {
     "army": 10,
     "nobles": -5
    },
    "this_run": "추장은 조선 관복을 입고 북쪽 국경을 함께 지켰다. 대신 몇은 못마땅해했다."
   },
   "left": {
    "label": "선물만 준다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "추장은 선물 보따리만 받고 돌아갔다. 국경은 조용했지만 그 마음은 알 수 없었다."
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
  "sources_text": "지도서 234(교과서 76) 여진과 좋은 관계를 유지함",
  "learn": "여진과의 관계",
  "fx": {
   "note": "국경 마을에 털모자 쓴 여진 인형들이 말을 끌고 온다."
  }
 },
 {
  "id": "DT153",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "명에 다녀온 사신",
   "doll": "official_green"
  },
  "line": "명에서 돌아오는 길에 비단과 책을 선물로 받아 왔사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "책을 돌려 읽힌다",
    "effects": {
     "nobles": 10
    },
    "this_run": "선비들이 새 책을 돌려 읽느라 밤을 새웠다."
   },
   "left": {
    "label": "비단을 곳간에 둔다",
    "effects": {
     "treasury": 10
    },
    "this_run": "비단은 곳간에 들어갔다. 다음 사신 예물 걱정이 줄었다."
   }
  },
  "grain": "gift",
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
   "note": "사신 행렬의 수레에서 책 상자와 비단 필이 내려진다."
  }
 },
 {
  "id": "DT154",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "명의 사신이 오옵니다. 환영 잔치를 크게 열까요, 검소하게 차릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 크게 연다",
    "effects": {
     "army": 5,
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "사신은 배를 두드리며 웃었고 대신들은 체면이 섰다. 곳간지기는 울상이었다."
   },
   "left": {
    "label": "검소하게 차린다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "사신은 국수 한 그릇을 비우고 “검소한 나라로군” 하고 갔다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 명과 사신을 보내 친밀한 관계를 이어 감",
  "learn": "명과의 관계",
  "fx": {
   "note": "궁궐 마당에 잔칫상이 길게 놓이거나, 작은 상 하나만 놓인다."
  }
 },
 {
  "id": "DT155",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "공조 관리",
   "doll": "official_green"
  },
  "line": "명으로 가는 사신 길이 험하옵니다. 길을 넓게 닦을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길을 넓게 닦는다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "사신 행렬이 빨리 오갔다. 길가 마을 장정들은 삽을 들고 불려 나갔다."
   },
   "left": {
    "label": "있던 길을 쓴다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "사신들은 진흙길에서 미끄러지며 투덜댔다."
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
  "sources_text": "지도서 234(교과서 76) 명과 서로 사신을 보냄",
  "learn": "사신이 오가던 길",
  "fx": {
   "note": "북쪽으로 난 길이 넓어지고, 사신 행렬 깃발이 지나간다."
  }
 },
 {
  "id": "DT156",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "사복시 관리",
   "doll": "official_blue"
  },
  "line": "명에 보낼 말을 고르옵니다. 거친 야생마를 길들여 보내 볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "야생마를 길들인다",
    "effects": {},
    "this_run": "말 조련사가 야생마 등에 올라탔다. 첫날 열두 번 떨어졌다."
   },
   "left": {
    "label": "길든 말을 보낸다",
    "effects": {
     "army": -5,
     "treasury": 5
    },
    "this_run": "군영의 길든 말이 떠났다. 군사들이 말 목을 쓰다듬으며 아쉬워했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "야생마가 순한 명마가 되었다. 군영에도 길든 말이 그대로 남았다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "야생마가 마구간 문을 부수고 장터로 달아났다. 다친 사람은 없었지만 고칠 값이 들었다."
   }
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 3년 4월 4일(명 사신이 말을 보내라 함)",
    "url": "https://sillok.history.go.kr/id/kaa_10304004_001"
   },
   {
    "type": "web",
    "title": "태조 1년 8월 27일",
    "url": "https://sillok.history.go.kr/id/kaa_10108027_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 3년 4월 4일(명 사신이 말을 보내라 함) https://sillok.history.go.kr/id/kaa_10304004_001 · 태조 1년 8월 27일 https://sillok.history.go.kr/id/kaa_10108027_001",
  "learn": "명과 말을 주고받던 일",
  "fx": {
   "note": "마구간 앞에서 말 인형이 앞발을 들고 “히힝”."
  }
 },
 {
  "id": "DT157",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "군사를 모아 사냥하며 훈련할 때이옵니다. 그런데 들판은 한창 농사철이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사냥 훈련을 한다",
    "effects": {
     "army": 10,
     "people": -5
    },
    "this_run": "말발굽 소리가 들판을 울렸다. 밭두렁 몇 군데가 무너졌다."
   },
   "left": {
    "label": "농사철 뒤로 미룬다",
    "effects": {
     "people": 5,
     "army": -10
    },
    "this_run": "군사들은 활 대신 호미를 들었다. 활 솜씨는 조금 녹슬었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '강무'",
    "url": "https://encykorea.aks.ac.kr/Article/E0001141"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '강무' https://encykorea.aks.ac.kr/Article/E0001141",
  "learn": "사냥을 겸한 군사 훈련(강무)",
  "fx": {
   "note": "들판에 깃발과 말 탄 인형들이 줄지어 달리거나, 논에 호미 든 군사 인형."
  }
 },
 {
  "id": "DT158",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T07) && !flag(F_성곽)"
  ],
  "conditions_text": "T07 뒤(성을 쌓은 판)",
  "who": {
   "name": "수문장",
   "doll": "general"
  },
  "line": "성문 지키는 군사들이 밤새 서 있느라 꾸벅꾸벅 조옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문지기를 늘린다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "문지기를 둘씩 세웠다. 서로 옆구리를 찔러 깨워 주었다."
   },
   "left": {
    "label": "번갈아 쉬게 한다",
    "effects": {
     "treasury": 5,
     "army": -10
    },
    "this_run": "번갈아 쉬게 했다. 문지기들은 개운해졌지만, 그사이 고양이가 성문을 드나들었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "도성을 지키는 군사",
  "fx": {
   "note": "성문 앞에서 창을 든 인형이 꾸벅 졸다가 화들짝 깬다."
  }
 },
 {
  "id": "DT159",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "who": {
   "name": "국경 고을 수령",
   "doll": "official_red"
  },
  "line": "압록강 얼음이 녹으며 국경 마을의 나무다리가 떠내려갔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사가 다리를 놓는다",
    "effects": {
     "army": -10
    },
    "this_run": "군사들이 차가운 강물에 들어가 다리를 놓았다. 국경 순찰은 며칠 비었다."
   },
   "left": {
    "label": "봄까지 배로 건넌다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "봄까지 나룻배로 건넜다. 순찰 군사도 배를 기다리느라 국경이 허술해졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76 지도) 압록강",
  "learn": "북쪽 국경",
  "fx": {
   "note": "얼음 조각이 떠내려가는 강 위로 새 다리가 놓이거나, 나룻배가 오간다."
  }
 },
 {
  "id": "DT160",
  "kind": "daily",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "전하, 고향 화령에서 옛 이웃들이 인사를 왔사옵니다! 어릴 적 같이 활 쏘던 동무도 왔다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고향 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "궁궐 마당에 북쪽 고향 말씨가 가득했다. 전하가 크게 웃었다."
   },
   "left": {
    "label": "함께 활을 쏜다",
    "effects": {
     "army": 10
    },
    "this_run": "전하가 쏜 화살이 과녁 한가운데 꽂혔다. 고향 사람들이 “그 솜씨 그대로네!” 하고 박수를 쳤다."
   }
  },
  "grain": "gift",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조실록 총서(태조가 화령부에서 태어남)",
    "url": "https://sillok.history.go.kr/id/kaa_000028"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '태조'",
    "url": "https://encykorea.aks.ac.kr/Article/E0059033"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조실록 총서(태조가 화령부에서 태어남) https://sillok.history.go.kr/id/kaa_000028 · 한국민족문화대백과사전 '태조' https://encykorea.aks.ac.kr/Article/E0059033",
  "learn": "태조 이성계의 고향",
  "fx": {
   "note": "궁궐 마당에 소박한 옷차림의 인형들이 모이고, 과녁에 화살이 “탁”."
  }
 },
 {
  "id": "CT01a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1393 봄",
  "conditions": [
   "seen(T03)"
  ],
  "conditions_text": "T03 뒤 반드시 시작",
  "who": {
   "name": "도읍 터를 살피는 신하",
   "doll": "official_blue"
  },
  "line": "계룡산 아래 땅이 넓고 산이 둘러싸 새 도읍으로 좋다 하옵니다. 공사를 크게 벌일까요, 터부터 닦을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 공사를 연다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "계룡산 아래에 일꾼들이 몰려들었다. 신하들은 벌써 새 집 자리를 고르느라 바빴다."
   },
   "left": {
    "label": "터부터 닦는다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "먼저 땅만 고르게 닦았다. 성질 급한 신하들은 발을 굴렀다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT01b",
   "after_n": 3
  },
  "real_history": "1393년 2월 태조는 계룡산 아래를 직접 살펴보고, 신하들에게 새 도읍 공사를 맡겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 2년 2월 8일",
    "url": "https://sillok.history.go.kr/id/kaa_10202008_001"
   },
   {
    "type": "web",
    "title": "2월 13일",
    "url": "https://sillok.history.go.kr/id/kaa_10202013_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 2년 2월 8일 https://sillok.history.go.kr/id/kaa_10202008_001 · 2월 13일 https://sillok.history.go.kr/id/kaa_10202013_001",
  "learn": "한양 전에 계룡산이 새 도읍 후보였다",
  "fx": {
   "build": [
    "gyeryong"
   ],
   "note": "섬 남쪽 끝에 산 하나가 솟고, 그 아래에 말뚝과 새끼줄이 쳐진다."
  },
  "chain": "계룡산 새 도읍",
  "force": true
 },
 {
  "id": "CT01b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1393 겨울",
  "conditions": [
   "seen(CT01a)"
  ],
  "conditions_text": "CT01a 3장 뒤",
  "who": {
   "name": "하륜",
   "doll": "haryun"
  },
  "line": "계룡산은 나라 남쪽에 치우쳐 동쪽·서쪽·북쪽 고을과 너무 머옵니다. 공사를 거두소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "곧바로 멈춘다",
    "effects": {
     "nobles": -10
    },
    "this_run": "공사장 망치 소리가 그쳤다. 새 집 자리를 골라 둔 신하들이 입을 삐죽였다."
   },
   "left": {
    "label": "한 번 더 따진다",
    "effects": {
     "treasury": -10
    },
    "this_run": "회의가 길어지는 동안에도 공사는 이어졌다. 결국 멈췄고, 그사이 쓴 돈은 돌아오지 않았다."
   }
  },
  "grain": "mire",
  "chain_next": {
   "card": "CT01c",
   "after_n": 3
  },
  "real_history": "1393년 12월 하륜이 계룡산은 나라 남쪽에 치우쳐 있다고 아뢰자, 태조는 계룡산 공사를 멈추게 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 2년 12월 11일",
    "url": "https://sillok.history.go.kr/id/kaa_10212011_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 2년 12월 11일 https://sillok.history.go.kr/id/kaa_10212011_001",
  "learn": "도읍은 나라 가운데 있어야 다스리기 좋다",
  "fx": {
   "remove": [
    "gyeryong"
   ],
   "note": "계룡산 아래 공사장 말뚝이 하나씩 쓰러지고 눈이 내려 덮인다."
  },
  "chain": "계룡산 새 도읍"
 },
 {
  "id": "CT01c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1394",
  "conditions": [
   "seen(CT01b)"
  ],
  "conditions_text": "CT01b 3장 뒤",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "계룡산 공사장에 다듬어 둔 돌과 나무가 그대로 남았사옵니다. 먼 길이지만 새 도읍까지 옮겨 볼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "새 도읍까지 옮긴다",
    "effects": {},
    "this_run": "돌과 나무를 실은 수레 행렬이 북쪽으로 떠났다."
   },
   "left": {
    "label": "근처 고을에 나눈다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "근처 마을 사람들이 그 나무로 다리와 헛간을 고쳤다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "길이 순조로웠다! 옮겨 온 돌이 새 궁궐 주춧돌이 되어 공사비를 크게 아꼈다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "고갯길에서 수레바퀴가 줄줄이 빠졌다. 옮기는 값이 돌값보다 더 들었다."
   }
  },
  "real_history": "계룡산 공사가 멈춘 터는 ‘신도안(새 도읍 안)’이라는 이름으로 불린다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '계룡산 신도안'",
    "url": "https://encykorea.aks.ac.kr/Article/E0003091"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '계룡산 신도안' https://encykorea.aks.ac.kr/Article/E0003091",
  "learn": "멈춘 공사의 흔적이 땅이름으로 남음",
  "fx": {
   "note": "계룡산 아래 빈터에 다듬은 돌 더미. 옮기면 수레 행렬이 섬을 가로지른다."
  },
  "chain": "계룡산 새 도읍"
 },
 {
  "id": "CT02a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1394 여름",
  "conditions": [
   "seen(CT01b) && !seen(T04)"
  ],
  "conditions_text": "CT01b를 본 판, T04 바로 앞",
  "who": {
   "name": "하륜",
   "doll": "haryun"
  },
  "line": "옛 책에 무악 땅이 도읍 자리로 좋다고 적혀 있사옵니다. 전하께서 직접 보러 가시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "무악부터 살핀다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "전하가 하륜과 함께 무악 고개를 올랐다. 다른 신하들은 숨을 헐떡였다."
   },
   "left": {
    "label": "두 곳을 함께 본다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "무악과 한양을 잇달아 둘러보느라 행차가 길어졌다. 길가 백성들은 임금 행차 구경에 신이 났다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT02b",
   "after_n": 1
  },
  "real_history": "1394년 8월 하륜은 옛 책을 근거로 무악을 도읍으로 삼자고 했고, 태조는 무악을 직접 둘러보았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 3년 8월 11일",
    "url": "https://sillok.history.go.kr/id/kaa_10308011_001"
   },
   {
    "type": "web",
    "title": "8월 12일",
    "url": "https://sillok.history.go.kr/id/kaa_10308012_005"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 3년 8월 11일 https://sillok.history.go.kr/id/kaa_10308011_001 · 8월 12일 https://sillok.history.go.kr/id/kaa_10308012_005",
  "learn": "한양을 도읍으로 정하기까지 여러 후보가 있었다",
  "fx": {
   "build": [
    "muak"
   ],
   "note": "섬 가장자리에 무악 고개와 한양 터가 나란히 떠오르고, 왕 행렬 깃발이 오간다."
  },
  "chain": "무악이냐 한양이냐",
  "force": true
 },
 {
  "id": "CT02b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1394 여름",
  "conditions": [
   "seen(CT02a)"
  ],
  "conditions_text": "CT02a 바로 다음",
  "who": {
   "name": "도읍 터를 살핀 신하",
   "doll": "official_red"
  },
  "line": "무악도 보시고 한양 옛 궁궐터도 보셨사옵니다. 어떻게 정하시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그 자리에서 정한다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "전하가 한양 터에 서서 “여기다” 하고 말했다. 무악을 밀던 신하는 머쓱해했다."
   },
   "left": {
    "label": "회의를 열어 정한다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "대신들이 모두 한마디씩 했다. 이사 날짜만 기다리던 백성들은 애가 탔다."
   }
  },
  "grain": "balance",
  "real_history": "1394년 8월 태조는 한양의 옛 궁궐터를 보고 한양을 도읍으로 정했고, 그해 10월 한양으로 옮겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 3년 8월 13일",
    "url": "https://sillok.history.go.kr/id/kaa_10308013_001"
   },
   {
    "type": "web",
    "title": "10월 25일",
    "url": "https://sillok.history.go.kr/id/kaa_10310025_001"
   }
  ],
  "sources_text": "지도서 238 1394년 천도 · [교과서 밖] 조선왕조실록 태조 3년 8월 13일 https://sillok.history.go.kr/id/kaa_10308013_001 · 10월 25일 https://sillok.history.go.kr/id/kaa_10310025_001",
  "learn": "한양 천도",
  "fx": {
   "remove": [
    "muak"
   ],
   "note": "한양 터 위로 햇살이 비치고, 무악 고개는 구름 속으로 물러난다."
  },
  "chain": "무악이냐 한양이냐"
 },
 {
  "id": "CT03a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1394",
  "conditions": [
   "chosen(T02,R) && seen(T04)"
  ],
  "conditions_text": "T02에서 ‘한꺼번에 바꾼다’를 고른 판, T04 뒤",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "새 나라를 어떻게 다스릴지 책 한 권에 모두 적어 바치겠사옵니다. 서둘러 엮을까요, 꼼꼼히 다듬을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 엮게 한다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "정도전 집 등불이 밤마다 늦게까지 켜져 있었다."
   },
   "left": {
    "label": "꼼꼼히 다듬게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "정도전은 한 글자씩 고쳐 썼다. 기다리던 신하들은 하품을 했다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT03b",
   "after_n": 4
  },
  "real_history": "1394년 정도전은 나라 이름의 뜻과 나라 다스리는 원칙, 관청이 할 일을 정리한 《조선경국전》을 지어 태조에게 바쳤다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷 '조선경국전'",
    "url": "https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '조선경국전' https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10",
  "learn": "새 나라의 설계도 《조선경국전》",
  "fx": {
   "note": "정도전 인형 앞 책상에 두루마리가 한 장씩 쌓인다."
  },
  "chain": "나라의 설계도"
 },
 {
  "id": "CT03b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1394",
  "conditions": [
   "seen(CT03a)"
  ],
  "conditions_text": "CT03a 4장 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "정도전 대감이 지은 책이 다 되었사옵니다. 어떻게 기리시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "말과 비단을 내린다",
    "effects": {
     "nobles": 10
    },
    "this_run": "정도전이 비단 보따리를 안고 고개를 숙였다. 대신들이 부러운 눈으로 쳐다봤다."
   },
   "left": {
    "label": "관리들에게 읽힌다",
    "effects": {
     "nobles": 5,
     "treasury": 5
    },
    "this_run": "관리들이 책을 돌려 읽었다. 관청 일 처리가 빨라져 곳간 장부도 깔끔해졌다."
   }
  },
  "grain": "gift",
  "real_history": "태조는 《조선경국전》을 읽고 정도전에게 말과 비단 등을 내렸다. 이 책은 뒷날 《경국대전》을 만드는 바탕이 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "245"
   },
   {
    "type": "web",
    "title": "우리역사넷 '조선경국전'",
    "url": "https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '조선경국전' https://contents.history.go.kr/front/tg/view.do?treeId=0200&levelId=tg_003_1430&ganada=&pageUnit=10 · 《경국대전》: 지도서 245",
  "learn": "《조선경국전》에서 《경국대전》으로",
  "fx": {
   "note": "책이 한 권으로 묶이며 금빛 끈이 매어진다."
  },
  "note": "희귀 R14 《경제육전》으로 이어진다.",
  "chain": "나라의 설계도"
 },
 {
  "id": "CT04a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1395",
  "conditions": [
   "seen(T05) && !flag(F_궁궐) && !flag(F_개경)"
  ],
  "conditions_text": "T05 뒤(경복궁을 지은 판)",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "가장 큰 전각은 ‘근정전’, 부지런히 다스리라는 뜻이옵니다. 전하는 무엇에 가장 부지런하시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "인재를 찾는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "전하는 이름난 선비가 있다 하면 먼저 찾아 물었다."
   },
   "left": {
    "label": "백성을 돌본다",
    "effects": {
     "people": 5
    },
    "this_run": "전하는 아침마다 고을에서 올라온 글부터 읽었다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT04b",
   "after_n": 3
  },
  "real_history": "정도전은 ‘근정전’에 부지런해야 나라가 잘 다스려지며, 무엇보다 어진 사람을 찾는 데 부지런하라는 뜻을 담았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 경복궁 · [교과서 밖] 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "learn": "경복궁 전각 이름에 담긴 뜻(근정전)",
  "fx": {
   "glyphs": {
    "gyeongbok": "勤政殿"
   },
   "note": "근정전 현판에 금빛 글씨가 한 획씩 써진다."
  },
  "chain": "전각 이름의 뜻"
 },
 {
  "id": "CT04b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1395",
  "conditions": [
   "seen(CT04a)"
  ],
  "conditions_text": "CT04a 3장 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "깊이 생각하라는 뜻의 사정전에 상소가 산더미처럼 쌓였사옵니다. 어떻게 보시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "하나씩 깊이 읽는다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "전하는 밤늦도록 상소를 한 장씩 읽었다. 급한 고을 일이 하루 늦었다."
   },
   "left": {
    "label": "급한 것부터 본다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "굶주린 고을 이야기부터 처리했다. 긴 상소를 쓴 선비는 서운해했다."
   }
  },
  "grain": "balance",
  "chain_next": {
   "card": "CT04c",
   "after_n": 3
  },
  "real_history": "‘사정전’에는 깊이 생각해야 옳고 그름을 가리고 사람을 알아볼 수 있다는 뜻이 담겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 경복궁 · [교과서 밖] 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "learn": "경복궁 전각 이름에 담긴 뜻(사정전)",
  "fx": {
   "glyphs": {
    "gyeongbok": "思政殿"
   },
   "note": "사정전 창에 늦게까지 등불이 켜진다."
  },
  "chain": "전각 이름의 뜻"
 },
 {
  "id": "CT04c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1395",
  "conditions": [
   "seen(CT04b)"
  ],
  "conditions_text": "CT04b 3장 뒤",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "쉬시는 곳 ‘강녕전’에는 혼자 쉴 때 게을러지지 말라는 뜻도 있다 하옵니다. 오늘은 어찌 쉬시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "하루 푹 쉰다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "전하가 쉬자 궁궐 사람들도 한숨 돌렸다. 대신들은 “강녕전 뜻을 잊으셨다”며 수군댔다."
   },
   "left": {
    "label": "쉬면서 책을 편다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "전하는 누워서도 책을 놓지 않았다. 내관은 등불 기름을 세 번 갈았다."
   }
  },
  "grain": "complex",
  "real_history": "‘강녕전’에는 임금이 마음을 바르게 하고 덕을 닦아야 오래 편안하며, 혼자 쉴 때일수록 게을러지지 말라는 당부가 담겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 경복궁 · [교과서 밖] 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "learn": "경복궁 전각 이름에 담긴 뜻(강녕전)",
  "fx": {
   "glyphs": {
    "gyeongbok": "康寧殿"
   },
   "note": "강녕전 처마 아래 등불 하나. 다 보면 도감 ‘전각 이름’ 칸에 세 현판이 모인다."
  },
  "chain": "전각 이름의 뜻"
 },
 {
  "id": "CT05a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1396",
  "conditions": [
   "seen(T07)"
  ],
  "conditions_text": "T07 뒤",
  "who": {
   "name": "외교 문서를 맡은 신하",
   "doll": "official_blue"
  },
  "line": "명이 우리가 보낸 외교 문서의 글귀가 무례하다며 트집을 잡았사옵니다. 어떻게 답할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "사과하는 글을 쓴다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "정중한 글이 명으로 떠났다. 글 쓴 신하들은 자존심이 상했다."
   },
   "left": {
    "label": "뜻을 풀어 설명한다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "“그런 뜻이 아니었다”는 긴 설명이 떠났다. 명 쪽 반응은 시큰둥했다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT05b",
   "after_n": 3
  },
  "real_history": "1396년 명은 조선이 보낸 외교 문서(표전)의 글귀를 문제 삼아, 글을 지은 사람을 보내라고 요구했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   },
   {
    "type": "web",
    "title": "우리역사넷 '표전 문제'",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0035812"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '표전 문제' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30 · 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0035812 · 지도서 234(교과서 76) 명과 사신을 주고받음",
  "learn": "명과의 외교가 늘 쉽지는 않았다",
  "fx": {
   "note": "섬 위 하늘에 두루마리 한 장이 떠 있다가 바람에 펄럭인다."
  },
  "chain": "외교 문서 소동"
 },
 {
  "id": "CT05b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1396",
  "conditions": [
   "seen(CT05a)"
  ],
  "conditions_text": "CT05a 3장 뒤",
  "who": {
   "name": "외교 문서를 맡은 신하",
   "doll": "official_blue"
  },
  "line": "명이 정도전 대감을 콕 집어 보내라 하옵니다. 대감은 병이 들어 못 가겠다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "다른 신하를 보낸다",
    "effects": {
     "treasury": -10
    },
    "this_run": "예물을 넉넉히 들려 다른 신하들을 보냈다. 곳간이 가벼워졌다."
   },
   "left": {
    "label": "정도전을 설득한다",
    "effects": {
     "army": -5,
     "nobles": -5
    },
    "this_run": "여러 번 달랬지만 정도전은 끝내 자리에서 일어나지 않았다. 그사이 명과의 사이만 껄끄러워졌다."
   }
  },
  "grain": "mire",
  "chain_next": {
   "card": "CT05c",
   "after_n": 4
  },
  "real_history": "명은 정도전을 보내라 했지만, 정도전은 병을 이유로 가지 않았다. 대신 권근 등이 명에 가서 사정을 설명했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷 '표전 문제'",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0035812"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '표전 문제' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30 · 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0035812",
  "learn": "명과의 외교 갈등",
  "fx": {
   "note": "압록강 쪽 길로 사신 행렬이 떠난다."
  },
  "chain": "외교 문서 소동"
 },
 {
  "id": "CT05c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1397",
  "conditions": [
   "seen(CT05b)"
  ],
  "conditions_text": "CT05b 4장 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "명에 갔던 권근이 돌아왔사옵니다! 명 황제 앞에서 시를 지어 칭찬을 받았다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "nobles": 10
    },
    "this_run": "권근이 잔치 자리에서 그 시를 다시 읊었다. 대신들이 무릎을 쳤다."
   },
   "left": {
    "label": "답례를 아낀다",
    "effects": {
     "treasury": 10
    },
    "this_run": "명에 보낼 답례 예물을 줄였다. 곳간지기가 웃었다."
   }
  },
  "grain": "gift",
  "real_history": "권근은 명 황제의 명으로 시 24편을 지어 바쳤고, 황제가 지은 시도 받아 1397년에 돌아왔다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷 '표전 문제'",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0035812"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '표전 문제' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i305920&code=kc_age_30 · 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0035812",
  "learn": "글로 외교 갈등을 푼 신하",
  "fx": {
   "note": "돌아오는 사신 행렬 위로 붓글씨 시 한 줄이 하늘에 떠오른다."
  },
  "chain": "외교 문서 소동"
 },
 {
  "id": "CT06a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1392",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "배극렴",
   "doll": "baegeuk"
  },
  "line": "세자를 정하셔야 하옵니다. 막내 왕자 방석을 세우시겠다는 뜻을 어떻게 알릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "곧바로 알린다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "세자 책봉이 곧바로 발표되었다. 형 왕자들은 말없이 자리를 떴다."
   },
   "left": {
    "label": "왕자들을 먼저 부른다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "형 왕자들을 먼저 불러 뜻을 전했다. 대신들은 “임금 뜻을 왜 묻느냐”며 수군댔다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT06b",
   "after_n": 5
  },
  "real_history": "1392년 8월 태조는 막내아들 방석을 세자로 정했다. 신하 배극렴이 ‘막내아들이 좋다’고 아뢴 일이 실록에 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 8월 20일",
    "url": "https://sillok.history.go.kr/id/kaa_10108020_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 8월 20일 https://sillok.history.go.kr/id/kaa_10108020_001",
  "learn": "세자 자리를 둘러싼 갈등의 시작",
  "fx": {
   "note": "궁궐 동쪽 작은 전각(세자 처소)에 등불이 켜진다."
  },
  "chain": "막내 세자"
 },
 {
  "id": "CT06b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1390년대",
  "conditions": [
   "seen(CT06a) && !seen(T09)"
  ],
  "conditions_text": "CT06a 5장 뒤, T09 앞",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "세자 저하는 아직 어리신데, 형 왕자들의 얼굴빛이 어둡사옵니다. 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "형들을 달랜다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "형 왕자들에게 군사 일을 맡겼다. 왕자들은 웃었지만 대신들은 걱정했다."
   },
   "left": {
    "label": "세자 공부를 늘린다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "세자 곁에 스승이 늘었다. 형 왕자들은 사냥터에서 활만 당겼다."
   }
  },
  "grain": "balance",
  "real_history": "세자 자리를 둘러싼 갈등은 1398년 제1차 왕자의 난으로 이어졌다.",
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
   "note": "궁궐 하늘에 먹구름 한 조각이 걸린다."
  },
  "note": "T09(왕자의 난)로 이어진다.",
  "chain": "막내 세자"
 },
 {
  "id": "CT07a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1390",
  "conditions": [
   "seen(T00) && !seen(T02)"
  ],
  "conditions_text": "건국 전 칸(T00 뒤, T02 앞)",
  "who": {
   "name": "개혁을 주장하는 신하",
   "doll": "official_green"
  },
  "line": "장군, 힘센 집안들이 땅을 마구 차지한 옛 땅 문서를 거리에 모아 불태우려 하옵니다. 어떻게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 태운다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "개경 거리에 연기가 높이 올랐다. 땅을 많이 가진 집안들은 발을 동동 굴렀다."
   },
   "left": {
    "label": "골라서 태운다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "문서를 하나씩 골라 태우느라 며칠이 걸렸다. 그사이 몇 장이 몰래 빠져나갔다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT07b",
   "after_n": 2
  },
  "real_history": "1390년 9월 옛 토지 문서를 개경 거리에 모아 불태웠다. 이듬해에는 새 토지 제도인 과전법을 만들었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_024_0020_0010_0010_0030"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림) 고려 말 일부 세력이 많은 토지를 차지함 · [교과서 밖] 우리역사넷 https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_024_0020_0010_0010_0030",
  "learn": "고려 말 토지 문제와 개혁",
  "fx": {
   "note": "섬 위 마을 마당에서 종이 더미가 타오르고, 연기가 하늘로 올라간다(불길은 작게)."
  },
  "chain": "토지 문서를 불태우다"
 },
 {
  "id": "CT07b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1391",
  "conditions": [
   "seen(CT07a)"
  ],
  "conditions_text": "CT07a 2장 뒤",
  "who": {
   "name": "조준",
   "doll": "jojun"
  },
  "line": "새 법으로 관리들에게 경기 땅에서만 곡식을 거둘 권리를 나눠 주려 하옵니다. 관리 몫을 넉넉히 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "관리 몫을 늘린다",
    "effects": {
     "nobles": 10,
     "people": -5,
     "treasury": -5
    },
    "this_run": "관리들이 웃었다. 땅을 부치는 농민들은 내야 할 곡식이 늘까 걱정했다."
   },
   "left": {
    "label": "나라 몫을 늘린다",
    "effects": {
     "treasury": 10,
     "nobles": -5,
     "people": -5
    },
    "this_run": "나라 곳간이 든든해졌다. 관리들은 “이래서야 살겠나” 하고 투덜댔다."
   }
  },
  "grain": "complex",
  "chain_next": {
   "card": "CT07c",
   "after_n": 4
  },
  "real_history": "1391년 과전법을 만들어, 관리들은 경기 지역의 정해진 땅에서만 곡식을 거둘 권리를 받게 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '과전법'",
    "url": "https://encykorea.aks.ac.kr/Article/E0004611"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '과전법' https://encykorea.aks.ac.kr/Article/E0004611",
  "learn": "과전법",
  "fx": {
   "note": "경기 들판 위에 땅 경계를 표시하는 말뚝이 줄지어 박힌다."
  },
  "chain": "토지 문서를 불태우다"
 },
 {
  "id": "CT07c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1392",
  "conditions": [
   "seen(CT07b) && seen(T02)"
  ],
  "conditions_text": "CT07b 4장 뒤, T02 뒤",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "새 나라가 섰사옵니다. 과전법을 그대로 이어 쓸까요, 농민 사정을 더 살필까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그대로 이어 쓴다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "관리들은 하던 대로 곡식을 거뒀다. 농민들은 “새 나라도 똑같네” 했다."
   },
   "left": {
    "label": "농민 사정을 살핀다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "같은 법을 쓰되, 가뭄 든 고을은 거두는 양을 줄였다. 관리들은 계산이 복잡해졌다."
   }
  },
  "grain": "balance",
  "real_history": "과전법은 1392년 세워진 조선에 그대로 이어졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '과전법'",
    "url": "https://encykorea.aks.ac.kr/Article/E0004611"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 7월 28일 즉위 교서",
    "url": "https://sillok.history.go.kr/id/kaa_10107028_003"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '과전법' https://encykorea.aks.ac.kr/Article/E0004611 · 조선왕조실록 태조 1년 7월 28일 즉위 교서 https://sillok.history.go.kr/id/kaa_10107028_003",
  "learn": "고려 말 개혁이 조선으로 이어짐",
  "fx": {
   "note": "경기 들판 말뚝 위로 새 나라 깃발이 걸린다."
  },
  "chain": "토지 문서를 불태우다"
 },
 {
  "id": "CT08a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1380",
  "conditions": [
   "seen(T00) && !seen(T02)"
  ],
  "conditions_text": "건국 전 칸(T00 뒤, T02 앞)",
  "who": {
   "name": "이성계 부대의 군관",
   "doll": "general"
  },
  "line": "장군, 왜구가 지리산 근처 황산에 진을 쳤사옵니다. 어떻게 치시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "정면으로 친다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "군사들이 함성을 지르며 산 아래로 나아갔다."
   },
   "left": {
    "label": "산길로 돌아 친다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "군사들이 밤새 산길을 돌았다. 짚신이 다 닳았다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT08b",
   "after_n": 2
  },
  "real_history": "1380년 이성계는 지리산 근처 황산(오늘날 남원 운봉 일대)에서 왜구를 크게 물리쳤다(황산 대첩).",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '황산대첩'",
    "url": "https://encykorea.aks.ac.kr/Article/E0065178"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조실록 총서",
    "url": "https://sillok.history.go.kr/id/kaa_000066"
   }
  ],
  "sources_text": "지도서 232(교과서 74) 이성계가 왜구를 물리치며 성장 · [교과서 밖] 한국민족문화대백과사전 '황산대첩' https://encykorea.aks.ac.kr/Article/E0065178 · 조선왕조실록 태조실록 총서 https://sillok.history.go.kr/id/kaa_000066",
  "learn": "이성계가 외적을 물리치며 이름을 떨침",
  "fx": {
   "note": "섬 가장자리 산줄기에 깃발 행렬이 늘어선다(싸우는 장면 없음, 깃발과 연기만)."
  },
  "chain": "황산의 화살"
 },
 {
  "id": "CT08b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1380",
  "conditions": [
   "seen(CT08a)"
  ],
  "conditions_text": "CT08a 2장 뒤",
  "who": {
   "name": "이두란",
   "doll": "idoran"
  },
  "line": "왜구 우두머리가 쓴 투구가 단단해 화살이 들지 않사옵니다. 장군의 활 솜씨를 보여 주시옵소서!",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "투구 꼭지를 쏜다",
    "effects": {
     "army": 10
    },
    "this_run": "화살이 투구 꼭지를 “딱” 맞혔다. 왜구들이 놀라 흩어졌다."
   },
   "left": {
    "label": "함께 시위를 당긴다",
    "effects": {
     "army": 5,
     "nobles": 5
    },
    "this_run": "두 장수가 나란히 활을 당겼다. 왜구들이 물러갔다."
   }
  },
  "grain": "gift",
  "chain_next": {
   "card": "CT08c",
   "after_n": 3
  },
  "real_history": "실록에는 이성계가 적장의 투구를 활로 쏘아 떨어뜨리고, 이두란과 함께 싸움을 이겼다는 이야기가 실려 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '황산대첩'",
    "url": "https://encykorea.aks.ac.kr/Article/E0065178"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조실록 총서",
    "url": "https://sillok.history.go.kr/id/kaa_000066"
   }
  ],
  "sources_text": "지도서 232(교과서 74) 이성계가 왜구를 물리치며 성장 · [교과서 밖] 한국민족문화대백과사전 '황산대첩' https://encykorea.aks.ac.kr/Article/E0065178 · 조선왕조실록 태조실록 총서 https://sillok.history.go.kr/id/kaa_000066",
  "learn": "이성계의 활 솜씨",
  "fx": {
   "note": "화살 한 줄기가 빛을 그리며 날아가고, 투구 하나가 “통” 떨어진다."
  },
  "caution": "사람이 다치는 장면은 그리지 않는다. 투구가 떨어지는 것만 보여 준다.",
  "chain": "황산의 화살"
 },
 {
  "id": "CT08c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1380년대",
  "conditions": [
   "seen(CT08b) && !seen(T02)"
  ],
  "conditions_text": "CT08b 3장 뒤, T02 앞",
  "who": {
   "name": "개경의 늙은 관리",
   "doll": "official_red"
  },
  "line": "황산 싸움 뒤로 백성들이 장군 이름을 노래처럼 부르옵니다. 개경 대신들 가운데 이를 경계하는 이도 있사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "백성 잔치에 간다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "장군이 마을 잔치에 나타나자 사람들이 몰려들었다. 개경 대신들의 눈빛이 날카로워졌다."
   },
   "left": {
    "label": "조용히 개경에 간다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "장군은 조용히 개경으로 돌아갔다. 기다리던 백성들은 아쉬워했다."
   }
  },
  "grain": "balance",
  "real_history": "이성계는 홍건적과 왜구의 침입을 물리치며 이름을 떨쳤고, 이를 바탕으로 힘을 키웠다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림) 이성계와 같은 무인 세력이 홍건적과 왜구를 물리치며 성장",
  "learn": "무인 세력의 성장",
  "fx": {
   "note": "섬 마을 골목에 깃발을 든 아이 인형들이 뛰어다닌다."
  },
  "chain": "황산의 화살"
 },
 {
  "id": "CT09a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1392",
  "conditions": [
   "seen(T02) && !seen(T03)"
  ],
  "conditions_text": "T02 뒤, T03 앞",
  "who": {
   "name": "교서를 쓰는 신하",
   "doll": "official_blue"
  },
  "line": "즉위 교서에 “나라 이름은 그전대로 고려”라고 적었사옵니다. 이 교서를 백성에게 어떻게 알릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "장터에서 읽어 준다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "장터에서 교서를 읽자 사람들이 고개를 갸웃했다. “임금님은 바뀌었는데 나라는 그대로네?”"
   },
   "left": {
    "label": "관청에만 보낸다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "교서는 관청 벽에만 붙었다. 백성들은 새 임금이 선 줄도 한참 몰랐다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CT09b",
   "after_n": 2
  },
  "real_history": "1392년 7월 28일 태조의 즉위 교서에는 “나라 이름은 그전대로 고려라 하고, 법과 제도도 고려의 옛것을 따른다”고 적혀 있었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 7월 28일",
    "url": "https://sillok.history.go.kr/id/kaa_10107028_003"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 7월 28일 https://sillok.history.go.kr/id/kaa_10107028_003",
  "learn": "조선은 처음에 ‘고려’라는 이름을 그대로 썼다",
  "fx": {
   "skyText": "高麗",
   "note": "섬 끝 깃발에 아직 ‘高麗’ 글자가 펄럭인다."
  },
  "chain": "처음엔 고려라는 이름"
 },
 {
  "id": "CT09b",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1392",
  "conditions": [
   "seen(CT09a) && !seen(T03)"
  ],
  "conditions_text": "CT09a 2장 뒤, T03 앞",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "장터에서 “임금님이 바뀌었는데 이름은 고려라니, 뭐가 달라진 거냐”는 말이 도옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "새 이름을 서두른다",
    "effects": {
     "nobles": 5,
     "treasury": -5,
     "army": -5
    },
    "this_run": "신하들이 밤새 이름 후보를 적었다. 명에 보낼 사신 채비로 곳간과 군영이 바빴다."
   },
   "left": {
    "label": "천천히 정한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "백성들은 익숙한 이름에 마음을 놓았다. 새 나라를 세운 신하들은 답답해했다."
   }
  },
  "grain": "complex",
  "chain_next": {
   "card": "CT09c",
   "after_n": 3
  },
  "real_history": "그해 11월 조선은 새 나라 이름 후보로 ‘조선’과 ‘화령’을 명에 적어 보냈다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 11월 29일",
    "url": "https://sillok.history.go.kr/id/kaa_10111029_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 11월 29일 https://sillok.history.go.kr/id/kaa_10111029_001",
  "learn": "나라 이름 ‘조선’이 정해지기까지",
  "fx": {
   "note": "깃발 옆에 빈 깃발 하나가 더 걸린다."
  },
  "note": "T03(국호)으로 이어진다.",
  "chain": "처음엔 고려라는 이름"
 },
 {
  "id": "CT09c",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1393",
  "conditions": [
   "seen(CT09b) && seen(T03) && !flag(F_국호)"
  ],
  "conditions_text": "CT09b 뒤, T03 다음(나라 이름을 바꾼 판)",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "나라 이름이 조선으로 바뀌었사옵니다. ‘고려’라고 새긴 도장과 깃발을 모두 바꿔야 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 바꾼다",
    "effects": {
     "treasury": -10
    },
    "this_run": "도장 새기는 장인과 깃발 짓는 침방이 밤을 새웠다. 곳간이 가벼워졌다."
   },
   "left": {
    "label": "닳는 대로 바꾼다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "한동안 고려 도장과 조선 도장이 섞여 쓰였다. 관리도 백성도 헷갈렸다."
   }
  },
  "grain": "mire",
  "real_history": "1393년 2월 15일 나라 이름이 조선으로 정해졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 2년 2월 15일",
    "url": "https://sillok.history.go.kr/id/kaa_10202015_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 2년 2월 15일 https://sillok.history.go.kr/id/kaa_10202015_001",
  "learn": "나라 이름 ‘조선’",
  "fx": {
   "skyText": "朝鮮",
   "note": "깃발의 ‘高麗’ 글자가 먹물로 지워지고 ‘朝鮮’이 써진다."
  },
  "chain": "처음엔 고려라는 이름"
 },
 {
  "id": "RT01",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "rare",
  "year": "1395",
  "conditions": [
   "seen(T05)"
  ],
  "conditions_text": "T05 뒤",
  "who": {
   "name": "권근",
   "doll": "gwongeun"
  },
  "line": "고구려 때 돌에 새긴 별 그림이 강물에 빠져 사라졌는데, 그 그림을 찍은 종이를 바친 사람이 있사옵니다! 어떻게 남길까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "돌에 다시 새긴다",
    "effects": {
     "nobles": 10
    },
    "this_run": "석수가 별 하나하나를 정으로 쪼았다. 선비들이 밤하늘과 돌을 번갈아 보았다."
   },
   "left": {
    "label": "종이로 찍어 둔다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "별 그림이 여러 장 찍혀 관청 벽에 걸렸다."
   }
  },
  "grain": "gift",
  "real_history": "1395년 권근 등이 고구려 천문도를 찍은 종이(인본)를 바탕으로 별 1,467개를 돌에 새긴 ‘천상열차분야지도’를 만들었다. 지금 국보로 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "268"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '천상열차분야지도'",
    "url": "https://encykorea.aks.ac.kr/Article/E0055909"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300835&code=kc_age_30"
   }
  ],
  "sources_text": "지도서 268(만 원권 지폐에 그려진 천상열차분야지도) · [교과서 밖] 한국민족문화대백과사전 '천상열차분야지도' https://encykorea.aks.ac.kr/Article/E0055909 · 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300835&code=kc_age_30",
  "learn": "천상열차분야지도(만 원권 뒷면의 별자리 그림)",
  "fx": {
   "build": [
    "starStone"
   ],
   "note": "밤하늘의 별이 하나씩 내려와 섬 위 검은 돌판에 박힌다(전설 다음으로 화려하게)."
  },
  "note": "공통 소재 주인표: 태조의 과학 소재는 이 카드만."
 },
 {
  "id": "RT02",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1395",
  "conditions": [
   "seen(T04) && !flag(F_개경)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판)",
  "who": {
   "name": "도승지",
   "doll": "official_green"
  },
  "line": "도읍 한양부의 이름을 ‘한성부’로 고쳐 부르옵니다. 한성부를 맡을 우두머리로 누구를 앉힐까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "공신을 앉힌다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "공신이 한성부를 맡았다. 도읍 살림보다 잔치 소식이 더 자주 들렸다."
   },
   "left": {
    "label": "꼼꼼한 관리를 앉힌다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "꼼꼼한 관리가 맡아 골목길과 도랑부터 살폈다. 공신들은 서운해했다."
   }
  },
  "grain": "balance",
  "real_history": "1395년 6월 한양부를 한성부로 고쳐 불렀다. 한성부는 도읍의 살림을 맡았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 4년 6월 6일",
    "url": "https://sillok.history.go.kr/id/kaa_10406006_001"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '한성부'",
    "url": "https://encykorea.aks.ac.kr/Article/E0061730"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 4년 6월 6일 https://sillok.history.go.kr/id/kaa_10406006_001 · 한국민족문화대백과사전 '한성부' https://encykorea.aks.ac.kr/Article/E0061730",
  "learn": "한성부(도읍을 다스리는 관청)",
  "fx": {
   "skyText": "漢城府",
   "note": "도성 위 하늘에 ‘漢城府’ 글씨가 잠깐 떠올랐다가 사라진다."
  }
 },
 {
  "id": "RT03",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1398",
  "conditions": [
   "seen(T07) && !flag(F_성곽)"
  ],
  "conditions_text": "T07 뒤(성을 쌓은 판)",
  "who": {
   "name": "도성 공사 감독관",
   "doll": "official_blue"
  },
  "line": "남쪽 큰 문 숭례문이 다 지어졌사옵니다! 문을 처음 여는 날 어떻게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "큰 행렬로 연다",
    "effects": {
     "nobles": 5,
     "army": 5,
     "treasury": -10
    },
    "this_run": "깃발 든 행렬이 숭례문을 지나갔다. 구경꾼이 성벽 위까지 올라갔다."
   },
   "left": {
    "label": "장꾼부터 들인다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "첫 손님은 짐 진 장꾼들이었다. 대신들은 “체면이 안 선다”고 했다."
   }
  },
  "grain": "complex",
  "real_history": "숭례문은 1396년 짓기 시작해 1398년 2월에 완공되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '숭례문'",
    "url": "https://encykorea.aks.ac.kr/Article/E0028017"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 숭례문은 도성 남쪽 큰 문 · [교과서 밖] 한국민족문화대백과사전 '숭례문' https://encykorea.aks.ac.kr/Article/E0028017",
  "learn": "숭례문",
  "fx": {
   "note": "숭례문 문짝이 “끼이익” 열리고 첫 행렬이 지나간다."
  }
 },
 {
  "id": "RT04",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "rare",
  "year": "1398",
  "conditions": [
   "seen(T08) && !flag(F_향교)"
  ],
  "conditions_text": "T08 뒤(성균관을 세운 판)",
  "who": {
   "name": "성균관 유생 대표",
   "doll": "yusaeng"
  },
  "line": "새 문묘에서 처음으로 공자께 제사(석전)를 올리옵니다. 어떻게 올릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "예법대로 올린다",
    "effects": {
     "nobles": 10
    },
    "this_run": "유생들이 줄을 맞춰 절을 올렸다. 향 연기가 명륜당 지붕까지 올랐다."
   },
   "left": {
    "label": "백성도 보게 한다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "담장 너머로 백성들이 구경했다. 아이들이 유생 절하는 모습을 따라 했다."
   }
  },
  "grain": "gift",
  "real_history": "성균관은 1395년 짓기 시작해 1398년 완성되었고, 같은 해 문묘도 세워졌다. 문묘에서는 공자 같은 옛 성인을 기리는 제사(석전)를 지냈다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '성균관'",
    "url": "https://encykorea.aks.ac.kr/Article/E0029204"
   },
   {
    "type": "web",
    "title": "'문묘'",
    "url": "https://encykorea.aks.ac.kr/Article/E0019465"
   },
   {
    "type": "web",
    "title": "'석전'",
    "url": "https://encykorea.aks.ac.kr/Article/E0028492"
   }
  ],
  "sources_text": "지도서 238(태조가 문묘·성균관을 건설) · [교과서 밖] 한국민족문화대백과사전 '성균관' https://encykorea.aks.ac.kr/Article/E0029204 · '문묘' https://encykorea.aks.ac.kr/Article/E0019465 · '석전' https://encykorea.aks.ac.kr/Article/E0028492",
  "learn": "성균관과 문묘",
  "fx": {
   "build": [
    "munmyo"
   ],
   "note": "명륜당 옆 문묘 마당에 흰 향 연기가 가늘게 오른다."
  }
 },
 {
  "id": "RT05",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1398",
  "conditions": [
   "seen(T06) && !seen(T09) && !flag(F_불교)"
  ],
  "conditions_text": "T06 뒤, T09 앞(불교와 함께 다스리지 않은 판)",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "불교의 가르침이 왜 나라에 맞지 않는지 글로 썼사옵니다. 선비들에게 돌려 읽힐까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "돌려 읽게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "베껴 쓴 글이 선비들 사이를 돌았다. 절에 다니던 백성들은 서운해했다."
   },
   "left": {
    "label": "고이 넣어 둔다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "글은 정도전 집 책장에 머물렀다. 선비들은 “아깝다”고 했다."
   }
  },
  "grain": "balance",
  "real_history": "1398년 정도전은 불교를 비판하는 글 《불씨잡변》을 썼다. 그해 정도전이 세상을 떠나 곧바로 책으로 찍히지는 못했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "228"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '불씨잡변'",
    "url": "https://encykorea.aks.ac.kr/Article/E0024993"
   }
  ],
  "sources_text": "지도서 228 고려 때 컸던 불교의 비중이 줄어듦 · [교과서 밖] 한국민족문화대백과사전 '불씨잡변' https://encykorea.aks.ac.kr/Article/E0024993",
  "learn": "유교 나라를 꿈꾼 정도전",
  "fx": {
   "note": "정도전 책상 위 두루마리에 먹 글씨가 빼곡히 차오른다."
  },
  "caution": "불교를 깎아내리는 말은 쓰지 않는다. “정도전은 이렇게 생각했다”로만."
 },
 {
  "id": "RT06",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1393",
  "conditions": [
   "seen(T06)"
  ],
  "conditions_text": "T06 뒤",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "여기저기 흩어진 군사 지휘를 한곳에 모으겠사옵니다. 왕자와 공신들이 거느린 군사까지 모을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 한곳에 모은다",
    "effects": {
     "army": 10,
     "treasury": 5,
     "nobles": -10
    },
    "this_run": "군사 장부가 한 권으로 모였다. 군사를 내놓은 왕자와 공신들은 얼굴이 굳었다."
   },
   "left": {
    "label": "나라 군사만 모은다",
    "effects": {
     "nobles": 5,
     "army": 5,
     "treasury": -5
    },
    "this_run": "왕자와 공신들의 군사는 그대로 두었다. 장부를 따로 관리하느라 비용이 들었다."
   }
  },
  "grain": "complex",
  "real_history": "1393년 9월 군사 일을 한곳에서 맡는 의흥삼군부를 만들었고, 정도전이 이끌었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '의흥삼군부'",
    "url": "https://encykorea.aks.ac.kr/Article/E0043453"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 3년 2월 29일",
    "url": "https://sillok.history.go.kr/id/kaa_10302029_005"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '의흥삼군부' https://encykorea.aks.ac.kr/Article/E0043453 · 조선왕조실록 태조 3년 2월 29일 https://sillok.history.go.kr/id/kaa_10302029_005",
  "learn": "군사 권한을 한곳에 모으려 함(왕자의 난의 배경)",
  "fx": {
   "note": "궁궐 앞마당에 군기 여러 개가 하나의 큰 깃발 아래 모인다."
  }
 },
 {
  "id": "RT07",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "rare",
  "year": "1392",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤 아무 때나",
  "who": {
   "name": "무학",
   "doll": "muhak"
  },
  "line": "소승을 왕의 스승(왕사)으로 삼으신다니 황공하옵니다. 유학자 신하들이 못마땅해한다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "왕사로 모신다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "절에 다니던 백성들이 기뻐했다. 유학자 신하들은 상소를 쓰기 시작했다."
   },
   "left": {
    "label": "조용히 모신다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "큰 의식 없이 조용히 모셨다. 백성들은 그런 일이 있었는지도 몰랐다."
   }
  },
  "grain": "balance",
  "real_history": "1392년 10월 태조는 승려 무학(자초)을 왕의 스승인 왕사로 삼았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 10월 9일",
    "url": "https://sillok.history.go.kr/id/kaa_10110009_002"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '무학'",
    "url": "https://encykorea.aks.ac.kr/Article/E0048094"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 10월 9일 https://sillok.history.go.kr/id/kaa_10110009_002 · 한국민족문화대백과사전 '무학' https://encykorea.aks.ac.kr/Article/E0048094",
  "learn": "유교 나라를 세웠지만 태조 곁에는 승려 스승도 있었다",
  "fx": {
   "note": "궁궐 마루에 회색 장삼을 입은 승려 인형이 앉는다."
  },
  "note": "무학이 한양 터를 골랐다는 이야기는 전해지는 말이라 쓰지 않는다."
 },
 {
  "id": "RT08",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1392",
  "conditions": [
   "seen(DT121) || seen(DT122) || seen(DT123) || seen(DT129)"
  ],
  "conditions_text": "DT121~DT130 가운데 불교 관련 카드 한 장을 본 뒤",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "승려가 되려면 나라에 베를 바치고 허가증(도첩)을 받게 했사옵니다. 허가 없이 머리 깎은 이를 절마다 찾아볼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "절마다 살핀다",
    "effects": {},
    "this_run": "관리들이 장부를 들고 산길을 올랐다."
   },
   "left": {
    "label": "새로 오는 이만 본다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "앞으로 출가하는 사람만 허가증을 확인했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "밀린 베가 한꺼번에 걷혔다. 곳간 장부가 두꺼워졌다."
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "엉뚱한 나무꾼까지 붙잡는 소동이 났다. 마을 사람들이 관리들을 흘겨봤다."
   }
  },
  "real_history": "1392년 9월 승려가 되려면 나라에 베를 바치고 허가증(도첩)을 받게 했다. 양반은 베 100필, 평민은 150필, 천인은 200필이었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 9월 24일",
    "url": "https://sillok.history.go.kr/id/kaa_10109024_001"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '도첩제'",
    "url": "https://encykorea.aks.ac.kr/Article/E0015878"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 9월 24일 https://sillok.history.go.kr/id/kaa_10109024_001 · 한국민족문화대백과사전 '도첩제' https://encykorea.aks.ac.kr/Article/E0015878",
  "learn": "도첩제(승려가 되려면 나라 허가가 필요)",
  "fx": {
   "note": "절 문 앞에서 관리 인형이 두루마리를 펼친다."
  }
 },
 {
  "id": "RT09",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "rare",
  "year": "1390년대",
  "conditions": [
   "seen(RT06)"
  ],
  "conditions_text": "RT06 뒤",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "제가 지은 진법 책(《진도》)대로 군사를 훈련시키겠사옵니다. 장수들에게 큰 시험을 치르게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "큰 시험을 연다",
    "effects": {},
    "this_run": "훈련장에 깃발 수백 개가 꽂혔다. 장수들이 책을 펴 놓고 진땀을 흘렸다."
   },
   "left": {
    "label": "천천히 익힌다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "군사들이 하루 한 가지씩 진법을 익혔다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "군사들이 깃발 신호에 맞춰 한 몸처럼 움직였다! 구경하던 장수들이 박수를 쳤다."
   },
   "lose": {
    "effects": {
     "nobles": -10
    },
    "this_run": "진법을 못 외운 장수들이 왼쪽 오른쪽을 헷갈려 망신을 당했다. 다들 정도전을 원망했다."
   }
  },
  "real_history": "정도전은 진법 책 《진도》를 지어 군사 훈련에 쓰게 했다. 1398년에는 《진도》를 익히지 않은 장수들을 벌하자는 건의까지 나왔다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 7년 8월 9일",
    "url": "https://sillok.history.go.kr/id/kaa_10708009_001"
   },
   {
    "type": "web",
    "title": "태조 7년 8월 26일",
    "url": "https://sillok.history.go.kr/id/kaa_10708026_002"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정도전'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050093"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 7년 8월 9일 https://sillok.history.go.kr/id/kaa_10708009_001 · 태조 7년 8월 26일 https://sillok.history.go.kr/id/kaa_10708026_002 · 한국민족문화대백과사전 '정도전' https://encykorea.aks.ac.kr/Article/E0050093",
  "learn": "정도전의 군사 개혁",
  "fx": {
   "note": "훈련장 위에서 깃발들이 진 모양(둥근 모양·네모 모양)으로 움직인다."
  }
 },
 {
  "id": "LT01",
  "kind": "legend",
  "stages": [
   "taejo"
  ],
  "rarity": "legend",
  "year": "1388",
  "conditions": [
   "seen(T00) && !seen(T01) && archive_count >= 20"
  ],
  "conditions_text": "건국 전 칸(T00 뒤, T01 앞), 기록관 20권 뒤부터",
  "who": {
   "name": "이성계 곁의 장수",
   "doll": "general"
  },
  "line": "장군, 요동으로 가는 길에 장맛비로 압록강이 불었사옵니다. 활을 붙인 아교가 녹고 병든 군사가 늘고 있사옵니다.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "군사를 돌린다",
    "effects": {
     "army": 10,
     "nobles": -10,
     "people": 5
    },
    "this_run": "장군은 위화도에서 말머리를 돌렸다. 군사들은 집에 간다며 기뻐했고, 개경 조정은 발칵 뒤집혔다."
   },
   "left": {
    "label": "여기서 버틴다",
    "effects": {
     "people": -15,
     "army": -5,
     "nobles": 5
    },
    "this_run": "장군은 버티려 했지만 → 비는 그치지 않았고 병든 군사가 늘었다 → 결국 위화도에서 군사를 돌렸다 → 그사이 지친 군사들의 원망이 쌓였다."
   }
  },
  "against": "left",
  "grain": "complex",
  "real_history": "1388년 요동 정벌에 나선 이성계는 ‘작은 나라가 큰 나라를 치는 것, 여름에 군사를 일으키는 것, 그 틈에 왜구가 쳐들어올 것, 장마에 활이 풀리고 병이 도는 것’이 옳지 않다며 위화도에서 군사를 돌렸다(위화도 회군).",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '위화도회군'",
    "url": "https://encykorea.aks.ac.kr/Article/E0041212"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조실록 총서",
    "url": "https://sillok.history.go.kr/id/kaa_000083"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '위화도회군' https://encykorea.aks.ac.kr/Article/E0041212 · 조선왕조실록 태조실록 총서 https://sillok.history.go.kr/id/kaa_000083",
  "learn": "조선 건국으로 가는 갈림길, 위화도 회군",
  "fx": {
   "build": [
    "wihwa"
   ],
   "note": "금빛 테두리. 압록강 한가운데 작은 섬(위화도)에서 깃발 행렬이 천천히 뒤로 돌아선다. 사관이 붓을 멈추고 고개를 든다."
  }
 },
 {
  "id": "LT02",
  "kind": "legend",
  "stages": [
   "taejo"
  ],
  "rarity": "legend",
  "year": "1392",
  "conditions": [
   "seen(T01) && !seen(T02) && archive_count >= 20"
  ],
  "conditions_text": "T01 뒤, T02 앞, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "오늘 전하께서 왕위에 오르시옵니다. 그런데 그 자리는 한양이 아니라 개경의 수창궁이옵니다!",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "쌀을 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "개경 거리에 쌀 수레가 돌았다. 사람들은 “새 임금님이 쌀을 주신다”며 줄을 섰다."
   },
   "left": {
    "label": "옛 신하를 부른다",
    "effects": {
     "nobles": 10
    },
    "this_run": "고려 때 신하들까지 불러 술잔을 나눴다. 굳었던 얼굴들이 조금 풀렸다."
   }
  },
  "grain": "gift",
  "real_history": "1392년 7월 17일 태조는 한양이 아니라 고려의 도읍 개경의 수창궁에서 왕위에 올랐다. 한양으로 도읍을 옮긴 것은 2년 뒤였다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "232"
   },
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 7월 17일",
    "url": "https://sillok.history.go.kr/id/kaa_10107017_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 7월 17일 https://sillok.history.go.kr/id/kaa_10107017_001 · 한양 천도 1394년: 지도서 232",
  "learn": "조선의 첫 임금은 개경에서 왕이 되었다",
  "fx": {
   "flash": "altPalace",
   "note": "금빛 테두리. 섬 위에 옛 궁궐(이름표 없는 장식)이 잠깐 떠오르고, 왕 인형이 익선관을 쓴다. 사관이 붓을 멈춘다."
  },
  "note": "설계서 ⑤-4의 LT02 후보(즉위 교서의 ‘고려’ 이름)는 사슬 CT09로 썼으므로, 전설은 수창궁 즉위로 바꿨다."
 },
 {
  "id": "T02v1",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_정몽주)"
  ],
  "conditions_text": "T01에서 다른 길 ‘정몽주를 곁에 둔다’를 고른 판 — T02 대신",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "정몽주 대감은 고려의 옛 법을 고쳐 쓰자 하고, 신은 새 법으로 한꺼번에 바꾸자 하옵니다. 어찌하시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 바꾼다",
    "effects": {
     "nobles": 15,
     "people": -10
    },
    "this_run": "새 법이 한꺼번에 내려갔다. 정몽주는 긴 상소를 써서 “너무 서두른다”고 했다."
   },
   "left": {
    "label": "정몽주 말도 듣는다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "옛 법을 고쳐 가며 천천히 바꿨다. 정도전은 답답해 붓을 내려놓았다."
   }
  },
  "grain": "balance",
  "real_history": "조선은 유교 사상을 나라를 다스리는 기본 원리로 삼았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74) 유교 사상을 기본 원리로 삼음 · 이번 판 전용 장면(정몽주가 살아 있는 판)",
  "learn": "조선 건국과 유교 통치 원리",
  "fx": {
   "note": "섬 한가운데 왕기가 꽂히고, 그 옆에 고려식 관복을 입은 인형 하나가 팔짱을 끼고 선다."
  },
  "variant_of": "T02",
  "event_type": "normal",
  "real_note": "실제 역사: 정몽주는 1392년 이방원 쪽 사람들에 의해 세상을 떠났다. [교과서 밖] 한국민족문화대백과사전 '정몽주' https://encykorea.aks.ac.kr/Article/E0050190",
  "alt_only": true,
  "order": 2
 },
 {
  "id": "T05v1",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_개경)"
  ],
  "conditions_text": "T04에서 다른 길 ‘개경에 머문다’를 고른 판 — T05 대신",
  "who": {
   "name": "궁궐 공사를 맡은 관리",
   "doll": "official_red"
  },
  "line": "개경에 머물기로 했으니 옛 궁궐을 고쳐 쓰옵니다. 크게 고칠까요, 새는 곳만 막을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 고친다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "옛 궁궐에 새 단청이 칠해졌다. 일꾼들은 “새로 짓는 것만큼 힘들다”고 했다.",
    "build": [
     "altPalace"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "새는 곳만 막는다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "지붕 새는 곳만 막았다. 비 오는 날이면 대신들이 대야를 들고 다녔다.",
    "build": [
     "altPalace"
    ],
    "build_state": "late"
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(개경에 머문 판)",
  "learn": "실제로는 한양에 경복궁을 지었다",
  "fx": {
   "note": "섬 뒤 산자락의 옛 궁궐(이름표 없음)에 새 단청이 칠해진다."
  },
  "variant_of": "T05",
  "event_type": "variant",
  "real_note": "실제 역사: 1394년 한양으로 도읍을 옮기고, 1395년 경복궁을 완성했다. (지도서 233·238)",
  "alt_only": true,
  "order": 5
 },
 {
  "id": "T06v1",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_개경)"
  ],
  "conditions_text": "개경에 머문 판 — T06 대신",
  "who": {
   "name": "예법을 맡은 신하",
   "doll": "official_green"
  },
  "line": "개경에서도 새 나라의 제사 터를 갖춰야 하옵니다. 서둘러 지을까요, 농사철 뒤에 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 짓는다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "제사 터는 일찍 섰지만, 모내기철 들판에 일손이 모자랐다.",
    "build": [
     "altAltar"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "농사철 뒤에 짓는다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "가을걷이 뒤에 지었다. 대신들은 “제사가 늦다”며 투덜댔다.",
    "build": [
     "altAltar"
    ],
    "build_state": "late"
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(개경에 머문 판)",
  "learn": "실제로는 한양에 종묘와 사직단을 지었다",
  "fx": {
   "note": "옛 궁궐 옆 빈터에 이름 없는 제단이 선다."
  },
  "variant_of": "T06",
  "event_type": "variant",
  "real_note": "실제 역사: 한양 경복궁 동쪽에 종묘, 서쪽에 사직단을 두었다. (지도서 233)",
  "alt_only": true,
  "order": 6
 },
 {
  "id": "T07v1",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_개경)"
  ],
  "conditions_text": "개경에 머문 판 — T07 대신",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "개경을 둘러싼 옛 성이 군데군데 허물어졌사옵니다. 높게 고쳐 쌓을까요, 무너진 곳만 고칠까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "높게 고쳐 쌓는다",
    "effects": {
     "army": 10,
     "people": -5,
     "treasury": -5
    },
    "this_run": "옛 성벽이 한 뼘씩 높아졌다. 겨울 공사에 일꾼들 손이 텄다.",
    "build": [
     "altOldWall"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "무너진 곳만 고친다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "구멍 난 곳만 메웠다. 성벽은 누더기 같았지만 돈은 아꼈다.",
    "build": [
     "altOldWall"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(개경에 머문 판, 네 큰 문 이름 연출 없음)",
  "learn": "실제로는 한양 도성을 쌓았다",
  "fx": {
   "note": "섬 뒤 산자락에 낡은 성벽이 이어진다(문 현판 글자 빛 없음)."
  },
  "variant_of": "T07",
  "event_type": "variant",
  "real_note": "실제 역사: 1396년 한양을 둘러싼 산줄기를 따라 도성을 쌓고, 네 큰 문에 유교 덕목을 담은 이름을 붙였다. (지도서 233·238)",
  "alt_only": true,
  "order": 7
 },
 {
  "id": "T08v1",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_불교)"
  ],
  "conditions_text": "T02에서 다른 길 ‘불교와 함께 다스린다’를 고른 판 — T08 대신",
  "who": {
   "name": "젊은 유생 대표",
   "doll": "yusaeng"
  },
  "line": "절과 함께 다스리는 나라라 하여, 성균관은 작게 세우자는 말이 있사옵니다. 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "강당 하나로 연다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "작은 강당에 유생들이 무릎을 맞대고 앉았다.",
    "build": [
     "altSmallSG"
    ],
    "build_state": "late"
   },
   "left": {
    "label": "절 옆에 글방을 연다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "절 옆 글방에서 스님과 선비가 나란히 아이들을 가르쳤다. 유학자 신하들은 고개를 저었다.",
    "build": [
     "altSmallSG"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(불교와 함께 다스린 판)",
  "learn": "실제로는 성균관을 세워 유교 교육을 했다",
  "fx": {
   "note": "도성 북쪽에 강당 하나만 작게 솟는다."
  },
  "variant_of": "T08",
  "event_type": "variant",
  "real_note": "실제 역사: 태조는 한양에 문묘와 성균관을 세웠다. 성균관은 오늘날의 대학교에 해당하는 최고 교육 기관이다. (지도서 238·245)",
  "alt_only": true,
  "order": 8
 },
 {
  "id": "AT01",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_정몽주) && seen(T05)"
  ],
  "conditions_text": "정몽주가 곁에 남은 판, T05 뒤",
  "who": {
   "name": "정몽주",
   "doll": "jeongmongju"
  },
  "line": "전하, 새 궁궐 공사가 백성의 허리를 휘게 하옵니다. 공사를 늦추소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공사를 늦춘다",
    "effects": {
     "nobles": -10
    },
    "this_run": "공사를 늦추자 공신들이 “고려 신하 말만 듣는다”며 등을 돌렸다."
   },
   "left": {
    "label": "상소를 물린다",
    "effects": {
     "people": -10
    },
    "this_run": "상소는 돌아갔다. 정몽주의 말이 장터에 퍼져 백성들이 수군댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(정몽주가 살아 있는 판)",
  "learn": "새 나라를 반대한 사람도 있었다",
  "fx": {
   "note": "궁궐 앞에 붉은 관복 인형 하나가 상소 두루마리를 들고 선다."
  },
  "force": true,
  "real_note": "실제 역사: 정몽주는 끝내 새 나라를 반대했고 1392년 세상을 떠났다. [교과서 밖] 한국민족문화대백과사전 '정몽주' https://encykorea.aks.ac.kr/Article/E0050190",
  "alt_only": true
 },
 {
  "id": "AT02",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_정몽주) && seen(T03)"
  ],
  "conditions_text": "정몽주가 곁에 남은 판, T03 뒤",
  "who": {
   "name": "정몽주",
   "doll": "jeongmongju"
  },
  "line": "고려를 섬기던 선비들이 시골에 숨어 지내옵니다. 그들에게 고을 아이들을 가르치게 하면 어떻겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "선비들을 부른다",
    "effects": {
     "nobles": 5
    },
    "this_run": "시골 선비들이 하나둘 고을 글방에 앉았다. 공신들은 못마땅한 눈치였다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "선비들은 산속에 머물렀다. 정몽주는 한숨을 쉬었다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "AT02f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(정몽주가 살아 있는 판)",
  "learn": "나라가 바뀌어도 배움은 이어진다",
  "fx": {
   "note": "산속 초가에서 갓 쓴 인형들이 고을로 내려온다."
  },
  "force": true,
  "alt_only": true
 },
 {
  "id": "AT02f",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chosen(AT02,R)"
  ],
  "conditions_text": "AT02에서 ‘선비들을 부른다’를 고르면 6장 뒤(열매)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "정몽주 대감이 부른 선비들의 제자들이 글을 잘해 이름이 났사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상을 내린다",
    "effects": {
     "nobles": 15
    },
    "this_run": "제자들이 상을 받고 절을 올렸다. 고려 선비와 조선 관리가 한자리에서 웃었다."
   },
   "left": {
    "label": "고을에 알린다",
    "effects": {
     "people": 10,
     "nobles": 5
    },
    "this_run": "고을마다 “우리 아이도 보내자”는 말이 돌았다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(정몽주가 살아 있는 판)",
  "learn": "배움이 다음 세대로 이어짐",
  "fx": {
   "note": "고을 글방에서 아이 인형들이 두루마리를 들고 뛰어나온다."
  },
  "alt_only": true
 },
 {
  "id": "AT03",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_개경) && seen(T05v1)"
  ],
  "conditions_text": "개경에 머문 판, T05v1 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "개경에 남아 이사 비용은 아꼈사옵니다. 그런데 “새 나라 기분이 안 난다”는 신하들이 많사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "개경 거리를 꾸민다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "개경 큰길에 새 깃발과 새 현판이 걸렸다. 곳간지기는 한숨을 쉬었다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "개경은 고려 때 모습 그대로였다. 신하들은 “이름만 바뀌었다”며 투덜댔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(개경에 머문 판)",
  "learn": "한양 천도의 까닭(물자를 나르기 좋은 곳)",
  "fx": {
   "note": "개경 섬 큰길에 새 깃발이 줄지어 걸린다."
  },
  "force": true,
  "real_note": "실제 역사: 도읍은 1394년 한양으로 옮겼고, 정종 때 잠시 개경으로 돌아갔다가 태종 때 다시 한양으로 옮겼다. [교과서 밖] 한국민족문화대백과사전 '정종' https://encykorea.aks.ac.kr/Article/E0050884 · 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i306100&code=kc_age_30",
  "alt_only": true
 },
 {
  "id": "AT04",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "flag(F_성곽)"
  ],
  "conditions_text": "T07에서 다른 길 ‘성 없이 문만 세운다’를 고른 판, 3장 뒤",
  "who": {
   "name": "수문장",
   "doll": "general"
  },
  "line": "성벽 없이 문만 서 있으니, 사람들이 문 옆으로 그냥 지나다니옵니다. 문지기들이 할 일이 없다며 웃사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "울타리를 두른다",
    "effects": {
     "treasury": -10
    },
    "this_run": "문 양옆에 나무 울타리를 둘렀다. 그래도 개구쟁이들은 울타리 밑으로 기어 다녔다.",
    "build": [
     "gateFence"
    ]
   },
   "left": {
    "label": "그냥 둔다",
    "effects": {
     "army": -10
    },
    "this_run": "문지기가 문 앞에 섰지만 사람들은 옆으로 돌아갔다. 도둑도 그랬다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "이번 판 전용 장면(성 없이 문만 세운 판)",
  "learn": "도성은 성벽과 문이 함께 있어야 했다",
  "fx": {
   "note": "산등성이에 성벽 없이 문만 덩그러니 서 있고, 인형들이 문 옆으로 돌아간다."
  },
  "force": true,
  "real_note": "실제 역사: 1396년 한양을 둘러싼 산줄기를 따라 성곽을 쌓았다. (지도서 233·238)",
  "alt_only": true
 }
]);
})();
