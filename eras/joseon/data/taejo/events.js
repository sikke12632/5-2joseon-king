/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_T.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
[
 {
  "id": "ET01",
  "kind": "event",
  "ev": "bad",
  "name": "가뭄",
  "stages": [
   "taejo"
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
  "line": "넉 달째 비 한 방울 오지 않사옵니다. 논바닥이 거북 등처럼 갈라졌사옵니다.",
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
    "label": "기우제를 올린다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "산마루 제단에 향 연기가 피어올랐다. 하늘은 아직 말이 없다."
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
     "card": "ET02",
     "p": 0.3,
     "luck": "bad"
    },
    {
     "card": "ET04",
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
  "id": "ET02",
  "kind": "event",
  "ev": "chain",
  "name": "메뚜기 떼",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ET01)"
  ],
  "conditions_text": "ET01(가뭄) 뒤 3~6장, 30%",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "가뭄 끝에 메뚜기 떼까지 몰려왔사옵니다! 하늘이 새까맣사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모두 나가 잡는다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "군사와 마을 사람이 함께 키를 휘둘렀다. 메뚜기 절반은 잡았다."
   },
   "left": {
    "label": "세금을 깎아 준다",
    "effects": {
     "people": 5,
     "treasury": -10
    },
    "this_run": "올해 세금 장부가 반으로 줄었다. 곳간지기가 한숨을 쉬었다."
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
   },
   "chains": [
    {
     "card": "ET03",
     "p": 0.3,
     "luck": "bad"
    }
   ],
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "하늘에 검은 점이 몰려와 들판을 덮는다. 붓질 같은 날갯소리.",
   "scene": "locust"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET03",
  "kind": "event",
  "ev": "chain",
  "name": "굶주린 사람들",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ET02)"
  ],
  "conditions_text": "ET02(메뚜기 떼) 뒤 3~6장, 30% — 불운 연쇄의 끝",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "흉년에 굶주린 사람들이 도성 문 앞으로 몰려들고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "죽을 쑤어 준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "성문 앞 가마솥 열 개에서 김이 올랐다. 줄은 해가 질 때까지 이어졌다."
   },
   "left": {
    "label": "고향으로 보낸다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "사람들이 빈 자루를 메고 고갯길을 되돌아갔다."
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
   "note": "성문 앞에 사람 인형들이 길게 줄을 선다. 쓰러지는 장면은 그리지 않는다.",
   "scene": "hungry"
  },
  "caution": "굶주림은 줄 선 모습과 빈 자루로만 보여 준다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET06",
  "kind": "event",
  "ev": "bad",
  "name": "큰비",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T04) && !flag(F_계룡)"
  ],
  "conditions_text": "T04 뒤(한양으로 옮긴 판). 개경 판은 \"개경 앞 개울이 넘침\"으로 대사만 바꿈",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "장맛비에 한강 물이 불어 나루 마을이 잠겼사옵니다.",
  "line_if": [
   {
    "when": "flag(F_개경)",
    "who": "개경 관리",
    "line": "장맛비에 개경 앞 개울이 넘쳐 나루 마을이 잠겼사옵니다."
   }
  ],
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
    "label": "둑을 높인다",
    "effects": {
     "treasury": -10,
     "people": 5
    },
    "this_run": "물이 빠지자 강가에 흙 둑이 한 길 높아졌다."
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
   }
  },
  "fx": {
   "note": "섬 아래 강물이 불어나 나루 마을 지붕까지 찰랑인다. 빗줄기 먹선.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET07",
  "kind": "event",
  "ev": "bad",
  "name": "열병",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 8"
  ],
  "conditions_text": "판 8장째부터",
  "who": {
   "name": "의원",
   "doll": "jungin"
  },
  "line": "도성 아랫마을에 열병이 돌고 있사옵니다. 앓는 사람이 날마다 늘고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "의원을 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "약초 보따리를 진 의원들이 골목을 돌았다. 아이들 열이 내리기 시작했다."
   },
   "left": {
    "label": "마을 길을 막는다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "마을 어귀에 새끼줄이 쳐졌다. 장꾼들이 발길을 돌렸다."
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
   }
  },
  "fx": {
   "note": "아랫마을 굴뚝 연기가 가늘어지고, 집집마다 약 달이는 김이 오른다.",
   "scene": "fever"
  },
  "caution": "죽음은 말하지 않는다. 앓는 사람·약 달이는 모습까지만.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET08",
  "kind": "event",
  "ev": "bad",
  "name": "공사장 불",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T05) && !seen(T08)"
  ],
  "conditions_text": "T05 뒤, T08 앞(공사철)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_blue"
  },
  "line": "공사장 헛간에서 불이 났사옵니다! 쌓아 둔 나무에 옮겨붙고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모두 불을 끈다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "물동이 행렬이 밤새 이어졌다. 나무 절반을 건졌다."
   },
   "left": {
    "label": "공사를 멈춘다",
    "effects": {
     "nobles": -10
    },
    "this_run": "타 버린 자리에 잿더미만 남았다. 대신들이 \"언제 다시 짓느냐\"고 물었다."
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
   "note": "공사장 한쪽에서 붉은 불길과 연기. 꺼진 뒤 그 건물은 \"손상\" 모습(10-8-4)으로 판 끝까지 남는다.",
   "scene": "fire"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET18",
  "kind": "event",
  "ev": "bad",
  "name": "곳간 도둑",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "gauge(treasury) >= 40"
  ],
  "conditions_text": "국고 40 이상일 때(훔칠 것이 있을 때)",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "밤사이 곳간 자물쇠가 부서지고 쌀가마가 사라졌사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "범인을 쫓는다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "포졸들이 골목을 뒤졌다. 쌀가마 절반을 되찾았다."
   },
   "left": {
    "label": "자물쇠를 바꾼다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "튼튼한 새 자물쇠가 달렸다. 잃은 쌀은 돌아오지 않았다."
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
   "note": "곳간 문이 반쯤 열려 있고, 바닥에 쌀알이 흩어져 있다.",
   "scene": "thief"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET04",
  "kind": "event",
  "ev": "good",
  "name": "단비",
  "stages": [
   "taejo"
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
   },
   "chains": [
    {
     "card": "ET05",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "먹구름에서 굵은 빗줄기. 누렇던 논이 초록으로 번진다.",
   "scene": "rain"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET05",
  "kind": "event",
  "ev": "chain",
  "name": "묵은 땅의 첫 수확",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ET04)"
  ],
  "conditions_text": "ET04(단비) 뒤 3~6장, 30%",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "버려져 있던 묵은 땅에서 첫 곡식을 거두었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간에 들인다",
    "effects": {
     "treasury": 10
    },
    "this_run": "새 곡식 냄새가 곳간에 가득했다."
   },
   "left": {
    "label": "일군 이에게 준다",
    "effects": {
     "people": 10
    },
    "this_run": "땅을 일군 농부들이 볏단을 지고 덩실덩실 걸었다."
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
   "note": "섬 가장자리 빈 땅에 노란 볏단이 쌓인다.",
   "scene": "harvest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET09",
  "kind": "event",
  "ev": "good",
  "name": "흰 사슴",
  "stages": [
   "taejo"
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
  "line": "궁궐 뒷산에서 흰 사슴을 보았다는 소문이옵니다! 좋은 징조라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "잔치 마당에 흰 사슴을 그린 깃발이 걸렸다."
   },
   "left": {
    "label": "사관에게 적게 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "사관이 두루마리 한 귀퉁이에 사슴 이야기를 적었다."
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
     "card": "ET10",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "뒷산 숲 사이로 하얀 사슴 한 마리가 걸어 나왔다가 사라진다. 사관이 고개를 든다.",
   "scene": "deer"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET10",
  "kind": "event",
  "ev": "chain",
  "name": "북적이는 장터",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(ET09)"
  ],
  "conditions_text": "ET09(흰 사슴) 뒤 3~6장, 30%",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "흰 사슴 소문에 먼 고을 사람들까지 장터로 몰려들었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "장터 어귀에 세금 걷는 탁자가 섰다. 엽전 소리가 그치지 않았다."
   },
   "left": {
    "label": "자리를 넓혀 준다",
    "effects": {
     "people": 10
    },
    "this_run": "좌판이 골목 끝까지 늘어섰다. 엿장수 가위 소리가 신났다."
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
   "note": "장터 천막이 두 배로 늘고 사람 인형이 북적인다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET11",
  "kind": "event",
  "ev": "guest",
  "name": "낯선 상인 배",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "나루 관리",
   "doll": "official_green"
  },
  "line": "바다 건너 섬나라에서 왔다는 상인 배가 닿았사옵니다. 처음 보는 물건을 잔뜩 실었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사고팔게 한다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "나루에 낯선 향신료 냄새가 퍼졌다. 구경꾼이 몰려들었다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "배는 돛을 올리고 수평선 너머로 돌아갔다."
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
   "note": "수평선에 처음 보는 돛배 한 척. 돛에 낯선 무늬(이름 없는 장식).",
   "scene": "ship"
  },
  "caution": "실제 나라 이름을 쓰지 않는다. 좋은 일인지 나쁜 일인지는 고르기에 달렸으므로 마음 변화 없음.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET12",
  "kind": "event",
  "ev": "guest",
  "name": "예고 없는 사신",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T03)"
  ],
  "conditions_text": "T03 뒤(명에 국호를 알린 판)",
  "who": {
   "name": "예조 관리",
   "doll": "official_red"
  },
  "line": "명의 사신이 예고도 없이 압록강을 건넜다 하옵니다! 잔치 준비가 하나도 안 되었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "서둘러 맞는다",
    "effects": {
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "밤새 등불을 밝혀 연회장을 꾸몄다. 사신은 국을 두 그릇 비웠다."
   },
   "left": {
    "label": "격식대로 맞는다",
    "effects": {
     "treasury": -5,
     "army": -5
    },
    "this_run": "사신은 사흘을 기다리며 \"늦다\"고 투덜댔다."
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
   }
  },
  "fx": {
   "note": "압록강 쪽 길에 붉은 깃발 행렬이 급히 다가온다.",
   "scene": "envoy"
  },
  "caution": "명과 사신을 주고받은 것은 사실(지도서 234)이지만, 이 카드의 \"예고 없는 방문\"은 게임 속 일이다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET13",
  "kind": "event",
  "ev": "box",
  "name": "땅속 항아리",
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
   "doll": "official_blue"
  },
  "line": "궁궐 터를 파다가 흙 속에서 커다란 항아리가 나왔사옵니다. 뚜껑이 단단히 닫혀 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "열어 본다",
    "effects": {},
    "this_run": "일꾼들이 숨을 죽이고 뚜껑을 비틀었다."
   },
   "left": {
    "label": "그대로 묻는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "\"옛 물건은 함부로 열지 않는 법\"이라며 신하들이 고개를 끄덕였다."
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
      "treasury": 15
     },
     "this_run": "오래된 엽전이 가득! 곳간지기가 엽전을 세다가 잠들었다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "people": -10
     },
     "this_run": "고약한 냄새가 퍼졌다. 일꾼들이 사흘 동안 코를 막고 일했다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "텅 비어 있었다. 일꾼들이 허탈하게 웃었다."
    }
   ]
  },
  "fx": {
   "note": "흙더미 사이로 커다란 질항아리 하나가 드러난다. 물음표 먹 도장.",
   "scene": "jar"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET14",
  "kind": "event",
  "ev": "box",
  "name": "고려 때 문서 궤짝",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(T02)"
  ],
  "conditions_text": "T02 뒤",
  "who": {
   "name": "서리(관청 아전)",
   "doll": "official_blue"
  },
  "line": "옛 관청 창고에서 고려 때 문서가 든 궤짝이 나왔사옵니다. 자물쇠가 녹슬었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "펼쳐 읽는다",
    "effects": {},
    "this_run": "녹슨 자물쇠를 망치로 두드려 열었다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "궤짝은 다시 창고 구석으로 들어갔다. 먼지만 한 번 털었다."
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
     "this_run": "빠졌던 땅 장부가 나왔다! 숨겨 둔 땅을 찾아 나라 장부에 올렸다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "nobles": -10
     },
     "this_run": "어느 공신 집안의 옛 잘못이 적혀 있었다. 조정이 술렁였다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "좀먹은 종이뿐이었다. 사관이 아까워하며 한 장만 챙겼다."
    }
   ]
  },
  "fx": {
   "note": "어두운 창고에 녹슨 궤짝. 열면 누런 종이가 바람에 날린다.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET15",
  "kind": "event",
  "ev": "box",
  "name": "낡은 지도",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "판 5장째부터",
  "who": {
   "name": "떠돌이 장사꾼",
   "doll": "merchant"
  },
  "line": "\"보물 산\"이 그려진 낡은 지도를 바치겠사옵니다. 믿어 보시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사람을 보낸다",
    "effects": {},
    "this_run": "군사 다섯이 지도를 들고 산으로 떠났다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "nobles": 5
    },
    "this_run": "장사꾼은 투덜대며 다른 고을로 갔다."
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
     "p": 0.35,
     "effects": {
      "treasury": 15
     },
     "this_run": "산속 개울에서 쓸 만한 구리 돌을 찾아냈다!"
    },
    {
     "kind": "bad",
     "p": 0.4,
     "effects": {
      "army": -10
     },
     "this_run": "보낸 군사들이 길을 잃어 열흘 만에 돌아왔다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "산은 그냥 산이었다. 군사들이 도토리만 한 자루 주워 왔다."
    }
   ]
  },
  "fx": {
   "note": "구겨진 지도 위에 붉은 X 표시. 섬 뒤 산에 작은 깃발이 꽂혔다 사라진다.",
   "scene": "map"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET16",
  "kind": "event",
  "ev": "mind",
  "name": "매화 핀 뜰",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "conditions": [
   "mind() >= 50 && (seen(T05) || flag(F_개경))"
  ],
  "conditions_text": "왕의 마음 50 이상, 궁궐이 있을 때(나올 확률 ×3)",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "궁궐 뜰에 매화가 피었사옵니다. 잠시 거닐어 보시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "뜰을 거닌다",
    "effects": {
     "treasury": -5
    },
    "this_run": "전하의 어깨가 조금 가벼워 보였다. 상소는 내일로 미뤘다."
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
   "note": "궁궐 뜰에 분홍 매화. 왕 인형이 천천히 걷고, 꽃잎이 흩날린다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "ET17",
  "kind": "event",
  "ev": "mind",
  "name": "잠 못 드는 밤",
  "stages": [
   "taejo"
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
  "line": "전하, 간밤에 잠을 설치셨사옵니까? 얼굴빛이 어둡사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "의원을 부른다",
    "effects": {
     "treasury": -5
    },
    "this_run": "의원이 쓴 약을 달였다. 전하는 얼굴을 찡그리며 마셨다."
   },
   "left": {
    "label": "괜찮다고 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "신하들은 안심했지만, 전하의 눈 밑은 더 어두워졌다."
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
