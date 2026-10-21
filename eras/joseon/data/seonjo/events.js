/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_<왕>.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
[
 {
  "id": "EJ01",
  "kind": "event",
  "ev": "bad",
  "name": "피란길 큰비",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J08)"
  ],
  "conditions_text": "J02 뒤, J08 앞(임진왜란 동안)",
  "who": {
   "name": "호위 군관",
   "doll": "general"
  },
  "line": "피란길에 큰비가 쏟아져 길이 진흙탕이 되었사옵니다. 수레바퀴가 빠져 움직이지 않사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "짐을 덜고 간다",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "this_run": "무거운 짐 수레 몇 대를 두고 걸음을 서둘렀다."
   },
   "left": {
    "label": "비 그치길 기다린다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "길가 절집 처마 밑에서 모두 비를 피했다. 하룻길이 늦어졌다."
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
     "card": "EJ04",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "먹빛 하늘에 빗줄기, 강물이 불어 오른다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ02",
  "kind": "event",
  "ev": "bad",
  "name": "군량 창고의 쥐 떼",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "card >= 4"
  ],
  "conditions_text": "생 4장째부터",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "군량 창고에 쥐 떼가 들어 쌀가마마다 구멍이 났사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "창고를 고친다",
    "effects": {
     "treasury": -10
    },
    "this_run": "바닥을 돌로 높이고 틈을 메웠다. 쥐들이 더는 들어오지 못했다."
   },
   "left": {
    "label": "남은 쌀만 쓴다",
    "effects": {
     "army": -10
    },
    "this_run": "구멍 난 가마는 그대로 두고 남은 쌀만 덜어 썼다. 군사들 밥그릇이 작아졌다."
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
   "note": "반쯤 열린 곳간 앞에 쌀알이 흩어져 있다.",
   "scene": "thief"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ03",
  "kind": "event",
  "ev": "bad",
  "name": "돌림병",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02)"
  ],
  "conditions_text": "J02 뒤(전쟁이 난 뒤)",
  "who": {
   "name": "의원",
   "doll": "jungin"
  },
  "line": "피란 온 사람들 사이에 열병이 돌고 있사옵니다. 약 달일 솥이 모자라옵니다.",
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
    "label": "따로 쉬게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "열이 나는 식구들이 양반집 빈 사랑채에서 따로 쉬었다. 양반들은 못마땅해했다."
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
   "note": "엷은 병색 하늘, 아랫마을 집집마다 약 달이는 김.",
   "scene": "fever"
  },
  "caution": "앓다가 세상을 떠나는 장면은 쓰지 않는다. 쉬고 낫는 모습까지만.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ05",
  "kind": "event",
  "ev": "bad",
  "name": "빈 들판",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03)"
  ],
  "conditions_text": "J03 뒤(전쟁이 길어질 때)",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "올해는 일손이 모자라 논밭 절반이 비어 있었사옵니다. 가을인데 거둘 것이 없사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "세금을 덜어 준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "올해 세금 장부에 붉은 줄이 그어졌다. 마을마다 한숨을 돌렸다."
   },
   "left": {
    "label": "씨앗을 빌려준다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "관아 마당에 씨앗 자루가 쌓였다. 내년 봄을 기다리기로 했다."
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
     "card": "EJ06",
     "p": 0.3,
     "luck": "bad"
    }
   ]
  },
  "fx": {
   "note": "섬의 논이 누렇게 바래고, 들판 절반이 비어 있다.",
   "scene": "drought"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ08",
  "kind": "event",
  "ev": "bad",
  "name": "얼어붙은 강",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J08)"
  ],
  "conditions_text": "J08 뒤(병자호란 무렵 겨울)",
  "who": {
   "name": "나루 관리",
   "doll": "official_green"
  },
  "line": "강이 꽁꽁 얼어 나룻배가 다니지 못하옵니다. 건너편 장터로 쌀이 오지 않사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "얼음길을 낸다",
    "effects": {
     "people": 10,
     "army": -5
    },
    "this_run": "군사들이 얼음 위에 모래를 뿌려 사람이 건널 길을 냈다."
   },
   "left": {
    "label": "봄까지 기다린다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "장터 쌀값이 올랐다. 사람들이 강가에서 얼음만 바라보았다."
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
   "note": "잿빛 하늘에서 눈이 날리고, 강물 빛이 하얗게 언다.",
   "scene": "frost"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ04",
  "kind": "event",
  "ev": "chain",
  "name": "떠내려간 다리",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EJ01)"
  ],
  "conditions_text": "EJ01(피란길 큰비) 뒤 3~6장, 30% — 불운 연쇄의 끝",
  "who": {
   "name": "나루 관리",
   "doll": "official_green"
  },
  "line": "큰비에 나루 다리가 떠내려갔사옵니다. 건너편 마을과 길이 끊겼사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배다리를 놓는다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "나룻배 여러 척을 나란히 묶고 그 위에 널빤지를 깔았다."
   },
   "left": {
    "label": "나룻배로 건넨다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "나룻배가 하루 종일 강을 오갔다. 사공의 팔이 뻐근했다."
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
   "note": "불어난 강물 위로 끊긴 다리 기둥만 남아 있다.",
   "scene": "flood"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ06",
  "kind": "event",
  "ev": "chain",
  "name": "곳간을 넘보는 무리",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EJ05)"
  ],
  "conditions_text": "EJ05(빈 들판) 뒤 3~6장, 30%",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "빈 들판 탓에 밤마다 관아 곳간을 넘보는 무리가 생겼사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간 쌀을 나눈다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "굶던 집마다 쌀을 나누자 밤길이 조용해졌다."
   },
   "left": {
    "label": "순라꾼을 늘린다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "순라꾼들이 밤마다 등불을 들고 골목을 돌았다."
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
     "card": "EJ07",
     "p": 0.3,
     "luck": "bad"
    }
   ],
   "luck": "bad",
   "chain_only": true
  },
  "fx": {
   "note": "반쯤 열린 곳간 앞에 쌀알이 흩어져 있다.",
   "scene": "thief"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ07",
  "kind": "event",
  "ev": "chain",
  "name": "산길의 소문",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EJ06)"
  ],
  "conditions_text": "EJ06 뒤 3~6장, 30% — 흉년 연쇄의 끝",
  "who": {
   "name": "역참 관리",
   "doll": "official_blue"
  },
  "line": "고개 너머 산길에 낯선 무리가 산다는 소문에 장사꾼들이 발길을 끊었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "산길에 군사를 둔다",
    "effects": {
     "army": -10,
     "treasury": 10
    },
    "this_run": "고갯마루에 군사 초막이 서자 장사꾼 행렬이 다시 넘어왔다."
   },
   "left": {
    "label": "소문을 알아본다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "알고 보니 집 잃은 사람 몇이 산에 숨어 지낸 것이었다. 관아가 그들을 마을로 데려왔다."
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
   "note": "성문 앞에 사람들이 모여 산 쪽을 바라본다.",
   "scene": "hungry"
  },
  "caution": "싸우는 장면은 쓰지 않는다. 소문의 정체는 집 잃은 사람들로 푼다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ11",
  "kind": "event",
  "ev": "chain",
  "name": "우물가의 줄",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "chain(EJ09)"
  ],
  "conditions_text": "EJ09(산성 우물) 뒤 3~6장, 30%",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "새 우물 소식에 성 안 사람들이 물동이를 들고 줄을 섰사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "차례로 나눠 준다",
    "effects": {
     "people": 10
    },
    "this_run": "물동이마다 맑은 물이 찰랑였다. 아이들이 물을 마시며 웃었다."
   },
   "left": {
    "label": "군사 먼저 마신다",
    "effects": {
     "army": 10
    },
    "this_run": "성벽 위 군사들이 맑은 물로 목을 축이고 다시 깃발을 들었다."
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
   "note": "산성 가운데 우물에서 맑은 물이 반짝인다.",
   "scene": "wellSpring"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ09",
  "kind": "event",
  "ev": "good",
  "name": "산성 우물",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(남한산성에 있을 때)",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "성 안 바위틈에서 맑은 물이 솟는 우물을 찾았사옵니다! 이제 눈을 녹이지 않아도 되옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "우물을 지킨다",
    "effects": {
     "army": 10
    },
    "this_run": "우물가에 군사 둘이 번갈아 섰다. 물은 날마다 맑았다."
   },
   "left": {
    "label": "모두에게 알린다",
    "effects": {
     "people": 10
    },
    "this_run": "성 안 사람들이 우물 소식에 오랜만에 웃었다."
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
     "card": "EJ11",
     "p": 0.3,
     "luck": "good"
    }
   ]
  },
  "fx": {
   "note": "산성 가운데 바위틈에서 맑은 물이 반짝이며 솟는다.",
   "scene": "wellSpring"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ10",
  "kind": "event",
  "ev": "good",
  "name": "바다 안개",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J08)"
  ],
  "conditions_text": "J02 뒤, J08 앞(임진왜란 동안)",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "바다에 짙은 안개가 끼어 낯선 배들이 물길을 잃고 돌아갔다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "망루를 살핀다",
    "effects": {
     "army": 10
    },
    "this_run": "망루 군사들이 안개 너머로 귀를 기울였다. 바다는 조용했다."
   },
   "left": {
    "label": "어부들을 쉬게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "어부들이 그물을 손질하며 하루를 쉬었다."
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
   "note": "하늘이 흐려지고 강 위로 흰 안개가 낮게 깔려 흘러간다.",
   "scene": "seaFog"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ12",
  "kind": "event",
  "ev": "good",
  "name": "다시 익은 들판",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07)"
  ],
  "conditions_text": "J07 뒤(임진왜란이 끝난 뒤)",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "전쟁이 끝나고 처음으로 들판이 누렇게 익었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "감사 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "마을마다 떡시루에 김이 올랐다. 오랜만에 풍물 소리가 났다."
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
  "id": "EJ13",
  "kind": "event",
  "ev": "guest",
  "name": "떠돌다 닿은 선원",
  "stages": [
   "seonjo"
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
  "line": "바다를 떠돌던 낯선 배가 포구에 닿았사옵니다. 말이 통하지 않는 선원들이 먹을 물을 달라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "물과 먹을 것을 준다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "선원들이 고개를 여러 번 숙이고, 물통을 채워 바다로 떠났다."
   },
   "left": {
    "label": "이야기를 들어 본다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "역관이 손짓 발짓으로 이야기를 나눴다. 그들은 먼 바다에서 길을 잃었다고 했다."
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
   "note": "강 아래쪽에 낯선 돛배 한 척이 천천히 다가온다.",
   "scene": "ship"
  },
  "caution": "실제 나라·사람 이름을 쓰지 않는다. 떠돌다 온 사람은 따뜻하게 대한다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ14",
  "kind": "event",
  "ev": "box",
  "name": "불탄 터의 항아리",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07)"
  ],
  "conditions_text": "J07 뒤(전쟁이 끝나고 터를 치울 때)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "불탄 궁궐 터를 치우다 흙 속에서 뚜껑 덮인 항아리가 나왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "열어 본다",
    "effects": {},
    "this_run": "관리들이 흙을 털고 조심조심 뚜껑을 들어 올렸다."
   },
   "left": {
    "label": "그대로 묻는다",
    "effects": {
     "nobles": 5
    },
    "this_run": "항아리는 다시 흙 속에 묻혔다."
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
     "this_run": "옛 엽전과 은붙이가 가득! 무너진 곳을 고치는 데 보탰다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "깨진 그릇 조각뿐이었다. 치우는 품삯만 들었다."
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
   "note": "주춧돌만 남은 터에서 흙 묻은 항아리가 솟는다.",
   "scene": "jar"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ15",
  "kind": "event",
  "ev": "box",
  "name": "의병이 숨긴 수레",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04)"
  ],
  "conditions_text": "J04 뒤(의병이 일어난 뒤)",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "산골 동굴에서 의병들이 숨겨 둔 수레가 나왔사옵니다. 거적이 덮여 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "거적을 걷어 본다",
    "effects": {},
    "this_run": "군사들이 동굴 안으로 들어가 수레를 끌어냈다."
   },
   "left": {
    "label": "의병에게 돌려준다",
    "effects": {
     "people": 5
    },
    "this_run": "수레는 거적을 덮은 채 의병 마을로 돌아갔다."
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
     "this_run": "쌀가마와 짚신이 가득! 성을 지키는 군사들에게 보냈다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "people": -10
     },
     "this_run": "곰팡이 핀 쌀뿐이었다. 기다리던 사람들이 실망했다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "빈 수레였다. 누군가 벌써 나눠 먹은 모양이었다."
    }
   ]
  },
  "fx": {
   "note": "어두운 동굴 앞에 거적 덮인 궤짝이 놓여 있다.",
   "scene": "chest"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ16",
  "kind": "event",
  "ev": "box",
  "name": "의병이 그린 산길 지도",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04)"
  ],
  "conditions_text": "J04 뒤(의병이 일어난 뒤)",
  "who": {
   "name": "역참 관리",
   "doll": "official_blue"
  },
  "line": "의병들이 그린 산길 지도가 나왔사옵니다. 숨은 지름길이 그려져 있다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길을 따라가 본다",
    "effects": {},
    "this_run": "역참 관리가 지도를 들고 산길로 들어섰다."
   },
   "left": {
    "label": "관아에 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "지도는 관아 서랍 깊숙이 들어갔다."
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
     "this_run": "정말 지름길이었다! 피란 가던 사람들이 이틀 길을 하루에 넘었다."
    },
    {
     "kind": "bad",
     "p": 0.35,
     "effects": {
      "treasury": -10
     },
     "this_run": "길이 끊겨 있었다. 헤매느라 짚신과 양식만 들었다."
    },
    {
     "kind": "empty",
     "p": 0.25,
     "effects": {},
     "this_run": "반쯤 지워져 알아볼 수 없었다. 관리가 아쉬워했다."
    }
   ]
  },
  "fx": {
   "note": "펼쳐진 지도 위로 산길이 먹선으로 하나씩 이어진다.",
   "scene": "map"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ17",
  "kind": "event",
  "ev": "mind",
  "name": "뜰에 핀 매화",
  "stages": [
   "seonjo"
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
  "line": "전하, 뜰에 매화가 피었사옵니다. 잠시 바람을 쐬시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "뜰을 걷는다",
    "effects": {
     "treasury": -5
    },
    "this_run": "전하의 어깨가 조금 가벼워 보였다. 읽던 보고는 내일로 미뤘다."
   },
   "left": {
    "label": "일을 계속한다",
    "effects": {
     "treasury": 5
    },
    "this_run": "보고 더미가 조금 줄었다. 전하는 한숨을 참았다."
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
   "note": "분홍 매화 꽃잎이 궁궐 터 위로 천천히 날린다.",
   "scene": "plum"
  },
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 },
 {
  "id": "EJ18",
  "kind": "event",
  "ev": "mind",
  "name": "꿈에 놀라 깬 밤",
  "stages": [
   "seonjo"
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
  "line": "전하, 또 꿈에 놀라 깨셨사옵니까? 아직 한밤중이옵니다.",
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
    "label": "지도를 펼친다",
    "effects": {
     "nobles": 5
    },
    "this_run": "전하는 등불 아래 지도를 펴고 성들을 하나하나 짚었다. 눈 밑이 어두워졌다."
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
   "note": "밤의 섬. 한 방에만 등불이 늦게까지 켜져 있다.",
   "scene": "night"
  },
  "caution": "꿈 내용(싸움 장면)은 말하지 않는다.",
  "sources_text": "[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)"
 }
]
  );
})();
