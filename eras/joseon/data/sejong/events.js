/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_<왕>.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
[
 {
  "id": "ES01",
  "kind": "event",
  "ev": "bad",
  "name": "큰 가뭄",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "판 6장째부터",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "봄부터 비가 오지 않아 저수지 바닥이 드러났사옵니다. 모를 낼 물이 없사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간을 연다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "관아 마당에 쌀자루가 줄지어 나왔다. 사람들이 바가지를 들고 줄을 섰다."
   },
   "left": {
    "label": "우물을 더 판다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "마을마다 새 우물 자리에 말뚝이 박혔다. 물은 아직 찔끔찔끔 나왔다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "now": {
    "people": -5
   },
   "chains": [
    {
     "card": "ES07",
     "p": 0.3,
     "luck": "bad"
    },
    {
     "card": "ES10",
     "p": 0.2,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "섬의 논이 누렇게 바래고, 하늘에 구름 한 점 없다. 해가 크게 이글거린다.",
   "scene": "drought"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES02",
  "kind": "event",
  "ev": "bad",
  "name": "큰비",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "판 6장째부터",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "장맛비가 사흘째 그치지 않사옵니다. 개울물이 길까지 넘치고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 보내 돕는다",
    "effects": {
     "people": 10,
     "army": -10
    },
    "this_run": "군사들이 나룻배를 저어 지붕 위 사람들을 실어 날랐다."
   },
   "left": {
    "label": "물길을 넓힌다",
    "effects": {
     "treasury": -10,
     "people": 5
    },
    "this_run": "개울가에 일꾼들이 모여 물길을 한 뼘씩 넓혔다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "now": {
    "people": -5
   },
   "chains": [
    {
     "card": "ES03",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "섬 아래 강물이 불어나 나루 마을 지붕까지 찰랑인다. 빗줄기 먹선.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES05",
  "kind": "event",
  "ev": "bad",
  "name": "쓰러진 학자",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00) && card >= 4"
  ],
  "conditions_text": "판 4장째부터(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "yusaeng"
  },
  "line": "함께 책을 엮던 동료가 밤새 일하다 쓰러졌사옵니다. 며칠째 일어나지 못하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "의원을 보낸다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "궁궐 의원이 약 보따리를 들고 학자의 집으로 갔다. 동료들이 고개를 숙였다."
   },
   "left": {
    "label": "일을 나눠 맡긴다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "남은 학자들이 책 더미를 나눠 들었다. 책은 조금 늦어졌다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "now": {
    "nobles": -5
   }
  },
  "fx": {
   "note": "밤의 궁궐. 집현전 창 하나만 등불이 꺼져 있다.",
   "scene": "night"
  },
  "caution": "쓰러진 뒤의 일은 말하지 않는다. 쉬는 모습까지만.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES06",
  "kind": "event",
  "ev": "bad",
  "name": "연못 둑이 무너지다",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "공사 감독관",
   "doll": "official_blue"
  },
  "line": "궁궐 연못 둑 한쪽이 무너져 물이 마당으로 흘러들었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "바로 다시 쌓는다",
    "effects": {
     "treasury": -10,
     "people": 5
    },
    "this_run": "일꾼들이 흙 가마니를 날라 하루 만에 둑을 메웠다."
   },
   "left": {
    "label": "가을까지 미룬다",
    "effects": {
     "nobles": -5,
     "treasury": 5
    },
    "this_run": "무너진 자리에 새끼줄만 둘러쳤다. 대신들이 지나가며 혀를 찼다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "now": {
    "treasury": -5
   }
  },
  "fx": {
   "note": "궁궐 연못가 흙이 무너지고 물이 마당으로 번진다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES08",
  "kind": "event",
  "ev": "bad",
  "name": "공방에 난 불",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S02) && !seen(S09)"
  ],
  "conditions_text": "S02 뒤, S09 앞(기구를 만들던 때)",
  "who": {
   "name": "공방 장인",
   "doll": "craftsman"
  },
  "line": "공방 가마에서 불똥이 튀어 지붕에 옮겨붙었사옵니다! 만들던 기구가 안에 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모두 불을 끈다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "물동이 행렬이 밤새 이어졌다. 기구 절반을 건졌다."
   },
   "left": {
    "label": "공방을 새로 짓는다",
    "effects": {
     "treasury": -10,
     "nobles": 5
    },
    "this_run": "타 버린 공방 옆에 더 넓은 공방 터가 닦였다."
   }
  },
  "grain": "mire",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "now": {
    "treasury": -5
   }
  },
  "fx": {
   "note": "공방 한쪽에서 붉은 불길과 연기. 꺼진 뒤 그을린 지붕이 남는다.",
   "scene": "fire"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES03",
  "kind": "event",
  "ev": "chain",
  "name": "개울이 넘친 마을",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ES02)"
  ],
  "conditions_text": "ES02(큰비) 뒤 3~6장, 30%",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "불어난 개울이 마을 논밭을 덮쳤사옵니다. 사람들이 언덕으로 올라가 있사옵니다.",
  "line_if": [
   {
    "when": "seen(SX3)",
    "who": "고을 수령",
    "line": "측우기 눈금이 하룻밤 새 넘쳤사옵니다. 불어난 개울이 마을 논밭을 덮쳤사옵니다."
   }
  ],
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "관아로 맞아들인다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "관아 마당에 거적이 깔리고, 저녁 죽 솥에 김이 올랐다."
   },
   "left": {
    "label": "언덕에 움막을 친다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "언덕마다 움막이 섰다. 젖은 이불이 바람에 펄럭였다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "chains": [
    {
     "card": "ES04",
     "p": 0.4,
     "luck": "good"
    }
   ],
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "개울가 마을 지붕까지 물이 차고, 언덕에 사람 인형들이 모여 있다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES04",
  "kind": "event",
  "ev": "chain",
  "name": "둑 쌓기",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ES03)"
  ],
  "conditions_text": "ES03(물난리) 뒤 3~6장, 40% — 물난리 연쇄의 끝",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "물이 빠지자 마을 사람들이 스스로 둑을 쌓겠다고 나섰사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "쌀을 품삯으로 준다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "삽을 든 사람들 사이로 쌀 수레가 지나갔다. 둑이 하루하루 높아졌다."
   },
   "left": {
    "label": "군사를 보태 준다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "군사와 마을 사람이 나란히 흙을 다졌다."
   }
  },
  "grain": "gift",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": -10,
    "right": 0,
    "left": 0
   },
   "luck": "good",
   "chain_only": true
  },
  "fx": {
   "note": "물이 빠진 개울가에 흙 둑이 한 줄 솟는다.",
   "scene": "harvest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES07",
  "kind": "event",
  "ev": "chain",
  "name": "마른 우물",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ES01)"
  ],
  "conditions_text": "ES01(큰 가뭄) 뒤 3~6장, 30% — 불운 연쇄의 끝",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "가뭄이 길어져 마을 우물까지 말랐사옵니다. 물 긷는 줄이 고개를 넘었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "물지게를 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "강에서 물을 실은 지게가 줄지어 마을로 올라갔다."
   },
   "left": {
    "label": "먼 우물로 보낸다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "사람들이 물동이를 이고 이웃 마을까지 걸었다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 10,
    "right": 0,
    "left": 0
   },
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "마른 우물가에 물동이를 인 사람 인형들이 길게 줄을 선다.",
   "scene": "hungry"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES11",
  "kind": "event",
  "ev": "chain",
  "name": "별을 적은 책",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ES09)"
  ],
  "conditions_text": "ES09(별똥별 비) 뒤 3~6장, 30%",
  "who": {
   "name": "서운관 관리",
   "doll": "official_blue"
  },
  "line": "별똥별을 본 날의 기록을 모아 한 권으로 엮었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "서운관에 둔다",
    "effects": {
     "nobles": 10
    },
    "this_run": "서운관 서가 맨 위 칸에 새 책 한 권이 꽂혔다."
   },
   "left": {
    "label": "고을에도 알린다",
    "effects": {
     "people": 10
    },
    "this_run": "고을마다 \"그날 밤 하늘\"을 그린 종이가 붙었다."
   }
  },
  "grain": "gift",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": -10,
    "right": 0,
    "left": 0
   },
   "luck": "good",
   "chain_only": true
  },
  "fx": {
   "note": "책장 위로 별 모양 먹점이 반짝인다.",
   "scene": "night"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES09",
  "kind": "event",
  "ev": "good",
  "name": "별똥별 비",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 4"
  ],
  "conditions_text": "판 4장째부터",
  "who": {
   "name": "서운관 관리",
   "doll": "official_blue"
  },
  "line": "간밤에 별똥별이 비처럼 쏟아졌사옵니다! 서운관 관리들이 밤새 숫자를 셌사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "마을 사람들이 지붕에 올라가 밤하늘을 올려다보았다."
   },
   "left": {
    "label": "하나하나 적게 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "서운관 관리들이 별똥별 수를 두루마리에 빼곡히 적었다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": -15,
    "right": 0,
    "left": 0
   },
   "chains": [
    {
     "card": "ES11",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "밤하늘에 흰 줄이 여러 개 그어진다. 마을 지붕 위에 사람 인형들이 앉아 있다.",
   "scene": "night"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES10",
  "kind": "event",
  "ev": "good",
  "name": "단비",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "판 6장째부터(가뭄 뒤에는 20%로 이어짐)",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "드디어 단비가 내리옵니다! 들판의 백성들이 춤을 추고 있사옵니다.",
  "line_if": [
   {
    "when": "seen(SX3)",
    "who": "농민 대표",
    "line": "드디어 단비가 내리옵니다! 측우기 눈금이 쑥쑥 올라간다며 아이들이 신이 났사옵니다."
   }
  ],
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "감사 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "마을마다 막걸리 항아리가 열렸다. 아이들이 빗물 웅덩이를 첨벙댔다."
   },
   "left": {
    "label": "모내기를 서두른다",
    "effects": {
     "treasury": 10
    },
    "this_run": "물 고인 논마다 모가 줄지어 꽂혔다."
   }
  },
  "grain": "gift",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": -15,
    "right": 0,
    "left": 0
   }
  },
  "fx": {
   "note": "먹구름에서 굵은 빗줄기. 누렇던 논이 초록으로 번진다.",
   "scene": "rain"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES12",
  "kind": "event",
  "ev": "good",
  "name": "금빛 잉어",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 4"
  ],
  "conditions_text": "판 4장째부터",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "궁궐 연못에 금빛 잉어가 나타났다는 소문이옵니다! 좋은 징조라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "연못가에 등불이 걸리고, 궁궐 사람들이 잉어를 구경했다."
   },
   "left": {
    "label": "그림으로 남긴다",
    "effects": {
     "nobles": 5
    },
    "this_run": "화원이 연못가에 앉아 잉어를 그렸다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": -15,
    "right": 0,
    "left": 0
   }
  },
  "fx": {
   "note": "궁궐 연못 물빛이 금빛으로 반짝이고, 꽃잎이 떠다닌다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES13",
  "kind": "event",
  "ev": "guest",
  "name": "강 건너 사냥꾼 무리",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "북방 군관",
   "doll": "general"
  },
  "line": "북쪽 강 건너에서 사냥꾼 무리가 가죽을 들고 왔사옵니다. 곡식과 바꾸자 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곡식과 바꾼다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "진 앞마당에 가죽과 곡식 자루가 나란히 놓였다. 구경꾼이 몰려들었다."
   },
   "left": {
    "label": "강 너머로 보낸다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "사냥꾼들은 가죽을 다시 메고 강을 건너갔다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": 0,
    "left": 0
   }
  },
  "fx": {
   "note": "북쪽 강가 길에 털모자를 쓴 사람 인형들의 줄이 다가온다.",
   "scene": "envoy"
  },
  "caution": "실제 부족·나라 이름을 쓰지 않는다. 좋은 일인지 나쁜 일인지는 고르기에 달렸으므로 마음 변화 없음.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES14",
  "kind": "event",
  "ev": "box",
  "name": "오래된 활자 상자",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "서리(관청 아전)",
   "doll": "official_blue"
  },
  "line": "옛 관청 창고에서 쇠붙이가 가득 든 상자가 나왔사옵니다. 글자 모양이 새겨져 있다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "열어 본다",
    "effects": {},
    "this_run": "서리들이 먼지를 털고 뚜껑을 들어 올렸다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "상자는 다시 창고 구석으로 들어갔다."
   }
  },
  "grain": "gamble",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": 0,
    "left": 0
   }
  },
  "box": {
   "side": "right",
   "outcomes": [
    {
     "kind": "good",
     "p": 0.4,
     "effects": {
      "nobles": 15
     },
     "this_run": "쓸 만한 활자가 가득! 집현전 학자들이 새 책을 찍는 데 보탰다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "녹슨 쇳덩이뿐이었다. 녹이는 데 땔감만 잔뜩 들었다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "텅 비어 있었다. 서리들이 허탈하게 웃었다."
    }
   ]
  },
  "fx": {
   "note": "어두운 창고에 묵직한 궤짝. 열면 작은 쇠 글자들이 반짝인다.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES15",
  "kind": "event",
  "ev": "box",
  "name": "이름 모를 약초 꾸러미",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "의원",
   "doll": "jungin"
  },
  "line": "먼 고을 사람이 이름 모를 약초 꾸러미를 바쳤사옵니다. 열을 내린다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "달여 본다",
    "effects": {},
    "this_run": "의원들이 약초를 한 줌씩 달여 맛을 보았다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "nobles": 5
    },
    "this_run": "약초 꾸러미는 그 고을로 돌아갔다."
   }
  },
  "grain": "gamble",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": 0,
    "left": 0
   }
  },
  "box": {
   "side": "right",
   "outcomes": [
    {
     "kind": "good",
     "p": 0.4,
     "effects": {
      "people": 15
     },
     "this_run": "정말 열이 내렸다! 의원들이 고을마다 그 약초를 나눠 보냈다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "people": -10
     },
     "this_run": "아무 효과가 없었다. 약을 기다리던 사람들이 실망했다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "그냥 흔한 들풀이었다. 의원들이 머리를 긁적였다."
    }
   ]
  },
  "fx": {
   "note": "약 달이는 솥에서 김이 오르고, 낯선 풀 냄새가 퍼진다.",
   "scene": "jar"
  },
  "caution": "먹고 탈이 나는 장면은 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES16",
  "kind": "event",
  "ev": "box",
  "name": "옛 별자리 두루마리",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "서운관 관리",
   "doll": "official_blue"
  },
  "line": "오래된 별자리 그림 두루마리가 나왔사옵니다. 지금 하늘과 맞는지 맞춰 보시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "밤마다 맞춰 본다",
    "effects": {},
    "this_run": "서운관 관리들이 두루마리를 들고 밤하늘을 올려다보았다."
   },
   "left": {
    "label": "서고에 넣는다",
    "effects": {
     "treasury": 5
    },
    "this_run": "두루마리는 서고 맨 아래 칸에 들어갔다."
   }
  },
  "grain": "gamble",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": 0,
    "left": 0
   }
  },
  "box": {
   "side": "right",
   "outcomes": [
    {
     "kind": "good",
     "p": 0.4,
     "effects": {
      "nobles": 15
     },
     "this_run": "하늘과 딱 맞았다! 서운관 관리들이 무릎을 쳤다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "별이 하나도 맞지 않았다. 종이와 먹만 잔뜩 들었다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "반쯤 지워져 알아볼 수 없었다. 관리들이 아쉬워했다."
    }
   ]
  },
  "fx": {
   "note": "펼쳐진 두루마리 위로 별 모양 먹점이 하나씩 빛난다.",
   "scene": "map"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES17",
  "kind": "event",
  "ev": "mind",
  "name": "연꽃 핀 연못",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "mind() >= 50"
  ],
  "conditions_text": "왕의 마음 50 이상(나올 확률 ×3)",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "궁궐 연못에 연꽃이 피었사옵니다. 잠시 바람을 쐬시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "연못가를 걷는다",
    "effects": {
     "treasury": -5
    },
    "this_run": "전하의 어깨가 조금 가벼워 보였다. 읽던 책은 내일로 미뤘다."
   },
   "left": {
    "label": "일을 계속한다",
    "effects": {
     "treasury": 5
    },
    "this_run": "상소 더미가 조금 줄었다. 전하는 하품을 참았다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": -30,
    "left": 10
   }
  },
  "fx": {
   "note": "궁궐 연못에 분홍 연꽃. 왕 인형이 천천히 걷고, 꽃잎이 흩날린다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ES18",
  "kind": "event",
  "ev": "mind",
  "name": "책 더미 속 밤샘",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "mind() >= 60"
  ],
  "conditions_text": "왕의 마음 60 이상",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "전하, 벌써 닭이 우옵니다. 오늘 밤도 책을 덮지 않으시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "등불을 끈다",
    "effects": {
     "nobles": -5
    },
    "this_run": "전하는 아쉬운 얼굴로 책갈피를 꽂았다. 모처럼 푹 잤다."
   },
   "left": {
    "label": "한 권만 더 읽는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "새벽까지 책장 넘기는 소리가 났다. 전하의 눈 밑이 어두워졌다."
   }
  },
  "grain": "balance",
  "game_event": true,
  "out_of_textbook": false,
  "event": {
   "mind": {
    "show": 0,
    "right": -15,
    "left": 15
   }
  },
  "fx": {
   "note": "밤의 궁궐. 왕의 방에만 등불이 늦게까지 켜져 있다.",
   "scene": "night"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 }
]
  );
})();
