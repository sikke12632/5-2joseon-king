/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_<왕>.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
[
 {
  "id": "EG01",
  "kind": "event",
  "ev": "bad",
  "name": "개항장의 큰불",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤)",
  "who": {
   "name": "개항장 관리",
   "doll": "official_green"
  },
  "line": "개항장 창고에서 불이 나 이웃 가게로 번지고 있사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 보내 끈다",
    "effects": {
     "people": 5,
     "army": -10
    },
    "this_run": "군사들이 물동이를 날라 불길을 잡았다. 그을린 창고만 남았다."
   },
   "left": {
    "label": "상인들이 끄게 둔다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "상인들이 모래와 물로 불을 껐지만 창고 몇 채가 타 버렸다."
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
   "note": "포구 창고에서 붉은 불길과 연기가 오르고, 꺼진 뒤 그을린 지붕이 남는다.",
   "scene": "fire"
  },
  "caution": "다치는 사람은 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG02",
  "kind": "event",
  "ev": "bad",
  "name": "돌림병",
  "stages": [
   "gojong"
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
  "line": "항구에서 시작된 열병이 도성 골목까지 번지고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 병원에 맡긴다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "병원 앞에 줄이 길게 섰다. 의원들이 밤낮으로 약을 지었다."
   },
   "left": {
    "label": "집에서 쉬게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "열이 나는 식구들이 집에서 따로 쉬었다. 이웃들이 문 앞에 죽을 두고 갔다."
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
  "id": "EG03",
  "kind": "event",
  "ev": "bad",
  "name": "곳간이 비었다는 소문",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간이 텅 비었다는 소문에 장터 쌀값이 하루 만에 뛰었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간 문을 열어 보인다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "곳간 문을 활짝 열어 쌀가마를 보여 주었다. 소문이 잦아들었다."
   },
   "left": {
    "label": "소문을 막는다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "포졸들이 소문 퍼뜨린 사람을 찾았지만, 쌀값은 그대로였다."
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
   "note": "곳간 앞에 사람들이 몰려들고, 장터 쌀자루 앞에 줄이 선다.",
   "scene": "hungry"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG04",
  "kind": "event",
  "ev": "bad",
  "name": "긴 가뭄",
  "stages": [
   "gojong"
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
  "line": "봄부터 비가 오지 않아 모낸 논이 갈라지고 있사옵니다.",
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
     "card": "EG08",
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
  "id": "EG05",
  "kind": "event",
  "ev": "bad",
  "name": "수평선의 낯선 배",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(G04)"
  ],
  "conditions_text": "G04 앞(개항 전)",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "수평선에 검은 연기를 뿜는 낯선 배가 사흘째 머물고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "포대를 지킨다",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "this_run": "포대마다 군사가 늘었다. 배는 멀리서 맴돌았다."
   },
   "left": {
    "label": "지켜보기만 한다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "바닷가 사람들이 언덕에 올라 배를 바라보았다."
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
    "army": -5
   },
   "chains": [
    {
     "card": "EG06",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "수평선에 검은 연기를 뿜는 배 한 척이 떠 있다.",
   "scene": "stormSea"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG06",
  "kind": "event",
  "ev": "chain",
  "name": "통상을 요구하는 편지",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EG05)"
  ],
  "conditions_text": "EG05(낯선 배) 뒤 3~6장, 30%",
  "who": {
   "name": "역관",
   "doll": "jungin"
  },
  "line": "낯선 배에서 장사를 하자는 편지를 보내왔사옵니다. 답을 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "정중히 거절한다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "정중한 거절 편지가 배로 보내졌다. 배는 한동안 더 머물렀다."
   },
   "left": {
    "label": "천천히 의논한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "대신들이 편지를 두고 여러 날 의논했다."
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
     "card": "EG07",
     "p": 0.4,
     "luck": "bad"
    }
   ],
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "배에서 작은 배가 내려와 편지 상자를 포구에 둔다.",
   "scene": "envoy"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG07",
  "kind": "event",
  "ev": "chain",
  "name": "포구의 소동",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EG06)"
  ],
  "conditions_text": "EG06 뒤 3~6장, 40% — 낯선 배 연쇄의 끝",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "낯선 배 사람들이 포구에 내려 물을 구하려다 마을 사람들과 말이 엇갈렸사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "역관을 보낸다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "역관이 손짓 발짓으로 말을 이어 주자 소동이 가라앉았다."
   },
   "left": {
    "label": "포구를 닫는다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "포구 문이 닫히고, 낯선 배 사람들은 배로 돌아갔다."
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
   "note": "포구에 사람 인형들이 모였다 흩어진다(싸움 없음).",
   "scene": "ship"
  },
  "caution": "싸우는 장면은 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG08",
  "kind": "event",
  "ev": "chain",
  "name": "마른 장터",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EG04)"
  ],
  "conditions_text": "EG04(가뭄) 뒤 3~6장, 30% — 불운 연쇄의 끝",
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
    "label": "상인을 달랜다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "상인들이 곡식을 조금씩 내놓았지만 값은 그대로였다."
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
  "id": "EG09",
  "kind": "event",
  "ev": "chain",
  "name": "불빛 구경꾼",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EG10)"
  ],
  "conditions_text": "EG10(첫 전깃불) 뒤 3~6장, 30%",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "궁궐 불빛 이야기가 퍼져 밤마다 궁궐 담 밖에 구경꾼이 모이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "담 밖 길을 밝힌다",
    "effects": {
     "people": 10
    },
    "this_run": "궁궐 담 밖 길에도 등불이 하나 켜졌다. 구경꾼들이 환호했다."
   },
   "left": {
    "label": "문지기를 늘린다",
    "effects": {
     "army": 10
    },
    "this_run": "문지기들이 구경꾼들을 질서 있게 줄 세웠다."
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
   "note": "궁궐 담 밖에 사람 인형들이 모여 불빛을 바라본다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG10",
  "kind": "event",
  "ev": "good",
  "name": "첫 전깃불 구경",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(GX3)"
  ],
  "conditions_text": "GX3(전등) 뒤",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "궁궐 연못가에 처음으로 전깃불이 환하게 켜졌사옵니다! 대신들이 입을 다물지 못하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치를 연다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "연못가에서 잔치가 열렸다. 전깃불이 깜빡일 때마다 웃음이 터졌다."
   },
   "left": {
    "label": "조용히 본다",
    "effects": {
     "treasury": 10
    },
    "this_run": "잔치 대신 불빛만 바라보았다. 기름값이 조금 아껴졌다."
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
     "card": "EG09",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "밤 궁궐 연못가에 노란 불빛이 깜빡깜빡 켜진다.",
   "scene": "meteor"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG11",
  "kind": "event",
  "ev": "good",
  "name": "새 학교 아이들의 노래",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(GX2)"
  ],
  "conditions_text": "GX2(학교) 뒤",
  "who": {
   "name": "학교 선생",
   "doll": "yangban"
  },
  "line": "새 학교 아이들이 운동회에서 함께 노래를 불렀사옵니다! 구경 온 부모들이 눈물을 훔쳤사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공책을 나눠 준다",
    "effects": {
     "people": 10
    },
    "this_run": "아이들 손에 새 공책이 하나씩 들렸다."
   },
   "left": {
    "label": "학교를 더 짓는다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "이웃 고을에도 학교 터가 잡혔다."
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
   "note": "학교 마당에 아이 인형들이 둥글게 서고 꽃잎이 날린다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG12",
  "kind": "event",
  "ev": "good",
  "name": "장터의 새 물건",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤)",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "개항장에서 들어온 성냥과 석유등이 장터에서 불티나게 팔리옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "새 물건 장세가 곳간에 들어왔다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "people": 10
    },
    "this_run": "밤에도 불을 켜는 집이 늘었다. 골목이 환해졌다."
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
   "note": "장터 좌판에 작은 등잔 불빛이 반짝인다.",
   "scene": "market"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG13",
  "kind": "event",
  "ev": "guest",
  "name": "사진기를 든 서양 사람",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤)",
  "who": {
   "name": "역관",
   "doll": "jungin"
  },
  "line": "검은 상자(사진기)를 든 서양 사람이 궁궐과 거리를 찍게 해 달라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "찍게 해 준다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "사람들이 신기한 상자 앞에 줄지어 섰다. 몇몇은 혼이 빠진다며 도망쳤다."
   },
   "left": {
    "label": "궁궐은 막는다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "서양 사람은 거리만 찍고 돌아갔다."
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
   "note": "거리 한가운데 다리 셋 달린 검은 상자 앞에 사람 인형들이 선다.",
   "scene": "envoy"
  },
  "caution": "실제 사람 이름·나라 이름을 쓰지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG14",
  "kind": "event",
  "ev": "guest",
  "name": "떠돌다 닿은 선원",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "바다를 떠돌던 배가 포구에 닿았사옵니다. 선원들이 먹을 물을 달라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "물과 먹을 것을 준다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "선원들이 고개를 여러 번 숙이고, 물통을 채워 떠났다."
   },
   "left": {
    "label": "이야기를 들어 본다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "역관이 손짓 발짓으로 이야기를 나눴다. 먼 바다에서 길을 잃었다고 했다."
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
   "note": "포구에 낯선 돛배 한 척이 천천히 다가온다.",
   "scene": "ship"
  },
  "caution": "떠돌다 온 사람은 따뜻하게 대한다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG15",
  "kind": "event",
  "ev": "box",
  "name": "서양 상인의 수수께끼 상자",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤)",
  "who": {
   "name": "개항장 관리",
   "doll": "official_green"
  },
  "line": "서양 상인이 무엇이 들었는지 말하지 않는 상자를 팔겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사서 열어 본다",
    "effects": {},
    "this_run": "관리들이 상자 뚜껑을 조심조심 들어 올렸다."
   },
   "left": {
    "label": "사지 않는다",
    "effects": {
     "treasury": 5
    },
    "this_run": "상인은 상자를 들고 다음 항구로 떠났다."
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
     "this_run": "바늘이 스스로 움직이는 나침반이 가득! 학자들이 몰려와 구경했다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "깨진 유리병뿐이었다. 상자 값만 날렸다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "텅 비어 있었다. 관리들이 허탈하게 웃었다."
    }
   ]
  },
  "fx": {
   "note": "포구 창고 앞에 자물쇠 달린 상자가 놓인다.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG16",
  "kind": "event",
  "ev": "box",
  "name": "멈춘 서양 시계",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "궁궐 장인",
   "doll": "craftsman"
  },
  "line": "선물로 받은 서양 시계가 멈췄사옵니다. 뜯어보아도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "뜯어보게 한다",
    "effects": {},
    "this_run": "장인이 작은 톱니를 하나하나 늘어놓았다."
   },
   "left": {
    "label": "장식으로 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "시계는 멈춘 채 장식장에 놓였다."
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
     "this_run": "장인이 원리를 깨쳐 시계가 다시 움직였다! 학자들이 감탄했다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "톱니 하나를 잃어버려 새 시계 값을 치렀다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "뜯었다가 다시 맞췄지만 여전히 멈춰 있었다."
    }
   ]
  },
  "fx": {
   "note": "책상 위에 톱니바퀴가 흩어져 있다. 잘되면 “째깍”.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG17",
  "kind": "event",
  "ev": "box",
  "name": "낡은 바닷길 지도",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 5"
  ],
  "conditions_text": "생 5장째부터",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "포구 창고에서 바닷길이 그려진 낡은 지도가 나왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "지도를 따라가 본다",
    "effects": {},
    "this_run": "작은 배가 지도를 들고 섬 사이 바닷길로 나섰다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "지도는 창고 깊숙이 들어갔다."
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
      "army": 15
     },
     "this_run": "숨은 물길을 찾았다! 포대를 지킬 배가 더 빨리 오갈 수 있게 되었다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "물길이 막혀 있었다. 배를 고치는 데 돈이 들었다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "반쯤 지워져 알아볼 수 없었다."
    }
   ]
  },
  "fx": {
   "note": "펼쳐진 지도 위로 바닷길이 먹선으로 하나씩 이어진다.",
   "scene": "map"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG18",
  "kind": "event",
  "ev": "mind",
  "name": "대포 소리 꿈",
  "stages": [
   "gojong"
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
  "line": "전하, 또 바다 대포 소리 꿈에 깨셨사옵니까? 아직 한밤중이옵니다.",
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
    "label": "바닷길 보고를 읽는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "전하는 등불 아래 바닷가 보고를 다시 읽었다. 눈 밑이 어두워졌다."
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
  "caution": "꿈 내용(싸움 장면)은 말하지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EG19",
  "kind": "event",
  "ev": "mind",
  "name": "연못가 산책",
  "stages": [
   "gojong"
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
  "line": "전하, 후원 연못에 연꽃이 피었사옵니다. 잠시 걸으시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "연못가를 걷는다",
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
   "note": "궁궐 연못에 분홍 연꽃. 왕 인형이 천천히 걷는다.",
   "scene": "lotus"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 }
]
  );
})();
