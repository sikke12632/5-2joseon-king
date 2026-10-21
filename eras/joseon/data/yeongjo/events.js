/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_<왕>.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
[
 {
  "id": "EY01",
  "kind": "event",
  "ev": "bad",
  "name": "장터에 난 불",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "장터 천막에서 불길이 일어 이웃 가게로 번지고 있사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 보내 끈다",
    "effects": {
     "people": 5,
     "army": -10
    },
    "this_run": "군사들이 물동이를 날라 불길을 잡았다. 그을린 천막만 남았다."
   },
   "left": {
    "label": "장사꾼들이 끄게 둔다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "장사꾼들이 모래와 물로 불을 껐지만 가게 몇 곳이 타 버렸다."
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
   "note": "장터 한쪽에서 붉은 불길과 연기가 오르고, 꺼진 뒤 그을린 천막이 남는다.",
   "scene": "fire"
  },
  "caution": "다치는 사람은 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY02",
  "kind": "event",
  "ev": "bad",
  "name": "세책점의 책 도둑",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y02)"
  ],
  "conditions_text": "Y02 뒤",
  "who": {
   "name": "세책점 주인",
   "doll": "merchant"
  },
  "line": "빌려 간 소설책이 돌아오지 않고, 책장 몇 칸이 통째로 비었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "포도청이 찾게 한다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "포졸들이 골목을 돌아 책 묶음을 찾아왔다. 빌려 간 사람이 깜빡했던 것이었다."
   },
   "left": {
    "label": "새 책을 베끼게 한다",
    "effects": {
     "treasury": -5,
     "nobles": -5
    },
    "this_run": "필사쟁이들이 밤새 책을 다시 베꼈다. 세책점 주인이 한숨을 쉬었다."
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
    "people": -5
   }
  },
  "fx": {
   "note": "세책점 처마 아래 책 묶음 줄이 텅 비어 흔들린다.",
   "scene": "thief"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY03",
  "kind": "event",
  "ev": "bad",
  "name": "행차 날 소나기",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y08)"
  ],
  "conditions_text": "Y08 뒤(화성을 쌓은 뒤)",
  "who": {
   "name": "행차를 준비하는 신하",
   "doll": "official_red"
  },
  "line": "먼 길 행차를 앞둔 날 아침, 하늘이 갑자기 어두워지고 소나기가 쏟아지옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "하루 미룬다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "행렬은 하루를 쉬었다. 길가 사람들은 젖은 깃발을 말렸다."
   },
   "left": {
    "label": "비를 맞으며 간다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "젖은 깃발을 들고 행렬이 떠났다. 길가 사람들이 우산 대신 삿갓을 썼다."
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
     "card": "EY04",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "먹구름에서 굵은 빗줄기가 쏟아지고 강물이 불어 오른다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY06",
  "kind": "event",
  "ev": "bad",
  "name": "도성의 돌림병",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "생 6장째부터",
  "who": {
   "name": "의원",
   "doll": "jungin"
  },
  "line": "도성 골목마다 열병이 돌아 장터 사람들이 줄었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "약재를 풀어 준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "고을마다 약 달이는 솥이 걸렸다. 쓴 냄새가 골목을 채웠다."
   },
   "left": {
    "label": "앓는 집을 따로 쉬게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "열이 나는 식구들이 빈집에서 따로 쉬었다. 이웃들이 문 앞에 죽을 두고 갔다."
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
   "note": "엷은 병색 하늘, 집집마다 약 달이는 김.",
   "scene": "fever"
  },
  "caution": "앓다가 세상을 떠나는 장면은 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY07",
  "kind": "event",
  "ev": "bad",
  "name": "긴 가뭄",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "생 6장째부터",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "여름 내내 비가 오지 않아 모내기한 논이 갈라지고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간을 연다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "관아 마당에 쌀자루가 줄지어 나왔다."
   },
   "left": {
    "label": "우물을 더 판다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "마을마다 새 우물 자리에 말뚝이 박혔다."
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
     "card": "EY08",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "섬의 논이 누렇게 바래고, 해가 크게 이글거린다.",
   "scene": "drought"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY04",
  "kind": "event",
  "ev": "chain",
  "name": "흔들리는 배다리",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EY03)"
  ],
  "conditions_text": "EY03(소나기) 뒤 3~6장, 30%",
  "who": {
   "name": "배다리를 맡은 관리",
   "doll": "official_green"
  },
  "line": "불어난 강물에 배다리가 흔들려 배를 잇는 밧줄이 끊어질 듯하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "밧줄을 새로 맨다",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "this_run": "사공들이 밤새 새 밧줄로 배를 다시 이었다."
   },
   "left": {
    "label": "물이 빠지길 기다린다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "강가에서 물이 빠지기를 기다렸다. 나루 사람들이 배를 지켜 주었다."
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
     "card": "EY05",
     "p": 0.4,
     "luck": "bad"
    }
   ],
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "불어난 강물 위로 배다리가 출렁인다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY05",
  "kind": "event",
  "ev": "chain",
  "name": "늦어진 행렬",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EY04)"
  ],
  "conditions_text": "EY04 뒤 3~6장, 40% — 소나기 연쇄의 끝",
  "who": {
   "name": "행차를 준비하는 신하",
   "doll": "official_red"
  },
  "line": "배다리를 고치느라 행렬이 하루 늦어졌사옵니다. 기다리던 고을 사람들이 지쳐 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을에 쌀을 내린다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "기다리던 고을 사람들에게 쌀이 돌아갔다. 사람들이 다시 길가에 섰다."
   },
   "left": {
    "label": "서둘러 지나간다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "행렬이 서둘러 지나갔다. 기다린 사람들은 깃발 끝만 보았다."
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
   "note": "긴 깃발 행렬이 천천히 길을 지나간다.",
   "scene": "envoy"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY08",
  "kind": "event",
  "ev": "chain",
  "name": "마른 장터",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EY07)"
  ],
  "conditions_text": "EY07(가뭄) 뒤 3~6장, 30% — 불운 연쇄의 끝",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_green"
  },
  "line": "가뭄이 길어지자 장터에 곡식이 나오지 않고 값만 오르고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "나라 곡식을 내놓는다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "나라 곡식이 장터에 나오자 값이 조금 내려갔다."
   },
   "left": {
    "label": "장사꾼을 달랜다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "장사꾼들이 곡식을 조금씩 내놓았지만 값은 그대로였다."
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
   "note": "장터 좌판이 텅 비고 사람들이 서성인다.",
   "scene": "hungry"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY12",
  "kind": "event",
  "ev": "chain",
  "name": "고을마다 탈놀이",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EY10)"
  ],
  "conditions_text": "EY10(탈놀이 패) 뒤 3~6장, 30%",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "그날 본 탈놀이 이야기가 퍼져, 고을마다 탈을 깎는 사람이 늘었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장날마다 열게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "장날이면 고을마다 탈놀이 마당이 열렸다. 장터가 더 북적였다."
   },
   "left": {
    "label": "탈 장인을 돕는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "탈을 깎는 장인들의 가게가 늘어 장터 세금도 늘었다."
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
   "note": "고을 장터 곳곳에 작은 탈놀이 마당이 열린다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY10",
  "kind": "event",
  "ev": "good",
  "name": "탈놀이 패의 깜짝 공연",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 4"
  ],
  "conditions_text": "생 4장째부터",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "떠돌던 탈놀이 패가 장터에서 깜짝 공연을 열었사옵니다! 구경꾼이 구름처럼 몰렸사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마당을 내준다",
    "effects": {
     "people": 10
    },
    "this_run": "탈을 쓴 광대들이 양반 흉내를 내자 구경꾼들이 배를 잡고 웃었다."
   },
   "left": {
    "label": "삯을 넉넉히 준다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "탈놀이 패가 넉넉한 삯을 받고 다음 고을로 떠났다."
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
     "card": "EY12",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "장터 가운데 둥근 마당에 탈을 쓴 인형들이 춤추고, 구경꾼이 둘러선다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY11",
  "kind": "event",
  "ev": "good",
  "name": "풍년 장시",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 6"
  ],
  "conditions_text": "생 6장째부터",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "올해는 모내기가 잘되어 들판이 누렇게 익었사옵니다! 장시마다 곡식이 넘치옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "감사 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "마을마다 떡시루에 김이 올랐다. 풍물 소리가 밤까지 이어졌다."
   },
   "left": {
    "label": "곳간을 채운다",
    "effects": {
     "treasury": 10
    },
    "this_run": "빈 곳간에 볏섬이 하나둘 쌓였다."
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
   "note": "들판 가장자리에 볏단이 하나둘 솟는다.",
   "scene": "harvest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY13",
  "kind": "event",
  "ev": "good",
  "name": "장터 씨름판",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 4"
  ],
  "conditions_text": "생 4장째부터",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "장날 씨름판에서 이긴 장사가 황소를 탔사옵니다! 장터가 들썩이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상을 더 내린다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "황소 등에 오른 장사가 장터를 한 바퀴 돌았다."
   },
   "left": {
    "label": "군영에 들게 한다",
    "effects": {
     "army": 10,
     "people": -5
    },
    "this_run": "힘센 장사가 군영 군사가 되었다. 마을 사람들은 아쉬워했다."
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
   "note": "장터 가운데 모래판에 사람들이 둘러서 함성을 지른다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY14",
  "kind": "event",
  "ev": "guest",
  "name": "먼 나라 책을 든 역관",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "역관",
   "doll": "jungin"
  },
  "line": "사신을 따라갔던 역관이 먼 나라 글자로 된 책 꾸러미를 가져왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "학자들에게 보낸다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "학자들이 낯선 그림과 숫자를 보며 밤늦도록 머리를 맞댔다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "책 꾸러미는 창고 깊숙이 들어갔다. 역관은 아쉬운 얼굴이었다."
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
   "note": "북쪽 길로 짐을 진 역관 인형이 들어오고, 책 꾸러미가 풀린다.",
   "scene": "envoy"
  },
  "caution": "실제 책 이름·나라 이름을 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY15",
  "kind": "event",
  "ev": "box",
  "name": "오래된 족보 궤짝",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "어느 집안 어른",
   "doll": "yangban"
  },
  "line": "헐린 사당에서 오래된 족보가 든 궤짝이 나왔사옵니다. 누구 집안 것인지 모르겠사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "열어 본다",
    "effects": {},
    "this_run": "집안 어른들이 먼지를 털고 궤짝 뚜껑을 열었다."
   },
   "left": {
    "label": "관아에 맡긴다",
    "effects": {
     "nobles": 5
    },
    "this_run": "궤짝은 관아 창고로 옮겨졌다."
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
     "this_run": "잃어버린 집안의 족보였다! 여러 집안이 모여 고마워했다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "nobles": -10
     },
     "this_run": "서로 자기 집안 것이라며 집안 셋이 다투기 시작했다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "벌레 먹어 한 글자도 읽을 수 없었다."
    }
   ]
  },
  "fx": {
   "note": "어두운 사당에서 묵직한 궤짝이 끌려 나온다.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY16",
  "kind": "event",
  "ev": "box",
  "name": "낡은 그림 두루마리",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "장터에서 사 온 낡은 두루마리를 펼쳐 보니 옛 한양 거리 그림이 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "펼쳐 연구한다",
    "effects": {},
    "this_run": "화원들이 두루마리를 조심조심 펼쳐 붓끝으로 먼지를 털었다."
   },
   "left": {
    "label": "도로 말아 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "두루마리는 도화서 서랍으로 들어갔다."
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
     "this_run": "옛 거리와 장터 모습이 그대로 남아 있었다! 사람들이 그림 앞에 줄을 섰다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "반쯤 찢어져 있었다. 고치는 데 비단과 풀이 잔뜩 들었다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "그림인 줄 알았던 것이 얼룩이었다. 화원들이 머리를 긁적였다."
    }
   ]
  },
  "fx": {
   "note": "펼쳐진 두루마리 위로 옛 거리 그림이 먹선으로 하나씩 이어진다.",
   "scene": "map"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY09",
  "kind": "event",
  "ev": "box",
  "name": "우물 속 항아리",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "마른 우물을 치우다 바닥에서 뚜껑 덮인 항아리가 나왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "열어 본다",
    "effects": {},
    "this_run": "마을 사람들이 빙 둘러선 가운데 이장이 뚜껑을 들어 올렸다."
   },
   "left": {
    "label": "그대로 묻는다",
    "effects": {
     "people": 5
    },
    "this_run": "항아리는 다시 우물 바닥에 묻혔다."
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
     "this_run": "옛 엽전이 가득! 마을 우물을 새로 파는 데 보탰다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "깨진 그릇 조각뿐이었다. 우물만 더 망가졌다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "텅 비어 있었다. 이장이 허탈하게 웃었다."
    }
   ]
  },
  "fx": {
   "note": "우물가에 흙 묻은 항아리가 솟는다.",
   "scene": "jar"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY17",
  "kind": "event",
  "ev": "mind",
  "name": "후원에 핀 국화",
  "stages": [
   "yeongjo"
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
  "line": "전하, 후원에 국화가 한창이옵니다. 잠시 걸으시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "후원을 걷는다",
    "effects": {
     "treasury": -5
    },
    "this_run": "전하의 어깨가 조금 가벼워 보였다. 읽던 상소는 내일로 미뤘다."
   },
   "left": {
    "label": "상소를 계속 본다",
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
   "note": "궁궐 후원에 노란 꽃잎이 천천히 흩날린다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EY18",
  "kind": "event",
  "ev": "mind",
  "name": "잠 못 드는 밤",
  "stages": [
   "yeongjo"
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
  "line": "전하, 두 붕당이 또 다툰다는 소식에 밤새 잠을 이루지 못하셨사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "등불을 끈다",
    "effects": {
     "nobles": -5
    },
    "this_run": "전하는 다시 눈을 감았다. 새벽까지 깨지 않았다."
   },
   "left": {
    "label": "상소를 더 읽는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "전하는 두 붕당의 상소를 밤새 번갈아 읽었다. 눈 밑이 어두워졌다."
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
