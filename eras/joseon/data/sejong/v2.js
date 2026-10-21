/* 설계서 v2의 사건 사슬·희귀 카드(작업/1A-카드데이터/cards_more.py)에서 tools/import-v2.py 로 만든 파일 — 직접 고치지 말 것.
 * 나오는 조건은 import-v2.py의 RULE 표(엔진 조건 식). 필드는 설계서 10-5 형식 + trigger(앞 카드의 선택이 부르는 사슬). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "C02a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1423",
  "conditions": [
   "device(invention) >= 1 && !seen(S06)"
  ],
  "conditions_text": "세종 시작 뒤, 발명 진행도 1 이상이 되면 바로 다음(S06보다 앞)",
  "force": true,
  "chain": "장영실의 길",
  "who": {
   "name": "궁중 물건을 만드는 관청(상의원) 관리",
   "doll": "official_green"
  },
  "line": "동래현 관청 노비 장영실이 기계를 잘 다루옵니다. 노비 신분을 풀어 주고 벼슬을 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "벼슬을 준다",
    "effects": {
     "people": 5,
     "nobles": -10
    },
    "this_run": "장영실은 처음으로 관복을 입었다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "재주만 쓴다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "장영실은 노비 옷을 입은 채 장인들 틈에서 일했다."
   }
  },
  "grain": "balance",
  "real_history": "1423년 장영실은 노비 신분에서 벗어나 상의원의 벼슬(별좌)을 받았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '장영실'",
    "url": "https://encykorea.aks.ac.kr/Article/E0048697"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '장영실' https://encykorea.aks.ac.kr/Article/E0048697 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30",
  "learn": "신분을 넘어 재주를 인정받은 사람",
  "fx": {
   "note": "장영실 인형의 패랭이가 사모로 바뀐다."
  }
 },
 {
  "id": "C02b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1434",
  "conditions_text": "S06에서 ‘구리를 내준다’를 고르면 바로 다음",
  "trigger": {
   "card": "S06",
   "after_n": 0,
   "side": "right"
  },
  "chain": "장영실의 길",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "자격루를 만든 장영실의 벼슬을 높여 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "벼슬을 높인다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "대신 몇이 고개를 저었지만, 장영실은 허리를 펴고 섰다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "상만 내린다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "장영실은 비단 한 필을 받았다."
   }
  },
  "grain": "balance",
  "real_history": "1434년 장영실은 자격루를 완성한 공으로 대호군이라는 벼슬에 올랐다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '장영실'",
    "url": "https://encykorea.aks.ac.kr/Article/E0048697"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '장영실' https://encykorea.aks.ac.kr/Article/E0048697",
  "learn": "장영실과 자격루",
  "fx": {
   "note": "자격루 누각 앞에서 작은 종이 세 번 울린다."
  },
  "caution": "사슬의 끝은 역사 카드 S08(가마 사건)이다."
 },
 {
  "id": "C13a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1442",
  "conditions": [
   "device(invention) >= 4"
  ],
  "conditions_text": "SX3 뒤 바로 다음(진행도 4 이상일 때)",
  "trigger": {
   "card": "SX3",
   "after_n": 0
  },
  "chain": "측우기를 고치다",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "측우기를 조금 작게 고쳐 받침돌 위에 두고, 비가 그칠 때마다 깊이를 적으면 더 정확하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고쳐 만든다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "관원이 자를 들고 빗물 깊이를 적었다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "그대로 쓴다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "그릇은 땅바닥에 놓인 채였다."
   }
  },
  "grain": "balance",
  "real_history": "1442년 측우기 크기를 고쳐 받침 위에 두고, 비가 그칠 때마다 관원이 빗물 깊이를 재 기록하게 했다. 고을에서는 수령이 재 보고했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 267 참고 자료(측우기)",
  "learn": "측우기와 기록",
  "fx": {
   "note": "측우기가 받침돌 위로 올라가고 눈금 옆에 작은 장부가 생긴다."
  }
 },
 {
  "id": "R12",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1419",
  "conditions": [
   "chosen(S01,R)"
  ],
  "conditions_text": "S01에서 ‘곧바로 친다’를 고르면 2장 뒤",
  "who": {
   "name": "돌아온 군관",
   "doll": "general"
  },
  "line": "정벌 때 한 부대가 매복에 걸려 돌아오지 못한 군사가 많사옵니다. 가족을 돌봐 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "가족을 돌본다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "마을마다 쌀자루가 전해졌다."
   },
   "left": {
    "label": "공만 기린다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "이긴 싸움 이야기만 퍼졌다."
   }
  },
  "grain": "balance",
  "real_history": "1419년 쓰시마 정벌은 성과도 있었지만, 한 부대가 매복에 걸려 많은 군사를 잃기도 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전(쓰시마 정벌)",
    "url": "https://encykorea.aks.ac.kr/Article/E0014343"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전(쓰시마 정벌) https://encykorea.aks.ac.kr/Article/E0014343",
  "learn": "전쟁의 두 얼굴",
  "fx": {
   "note": "바닷가 마을에 등불이 하나둘 켜진다."
  }
 }
]);
})();
