/* 집필 세션의 add_S.py에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "DS101",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "집현전에 할 일이 넘치옵니다. 젊은 학자를 더 뽑을까요, 지금 사람으로 버틸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "학자를 더 뽑는다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "과거 성적이 뛰어난 젊은 선비들이 집현전 문턱을 넘었다. 녹봉 장부가 두꺼워졌다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "있는 사람으로 한다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "학자들은 책상 두 개를 오가며 일했다. 밤마다 집현전 등불이 늦게 꺼졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '집현전'(처음 10명, 뒤에 20명)",
    "url": "https://encykorea.aks.ac.kr/Article/E0055081"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '집현전'(처음 10명, 뒤에 20명) https://encykorea.aks.ac.kr/Article/E0055081",
  "learn": "집현전과 학자들",
  "fx": {
   "note": "집현전 창마다 등불이 하나씩 늘어난다."
  }
 },
 {
  "id": "DS102",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 서고지기",
   "doll": "official_red"
  },
  "line": "명에서 구해 온 책 수레가 도착했사옵니다. 어디에 먼저 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "서고에 들인다",
    "effects": {
     "nobles": 10
    },
    "this_run": "서고 선반이 새 책으로 꽉 찼다. 학자들이 먼지 털 틈도 없이 책장을 넘겼다."
   },
   "left": {
    "label": "고을로 먼저 보낸다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "농사와 약초에 관한 책은 고을로 먼저 보냈다. 수령들이 책을 받아 들고 고개를 끄덕였다."
   }
  },
  "grain": "gift",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '집현전'(책을 모으고 보관하며 쓰게 함)",
    "url": "https://encykorea.aks.ac.kr/Article/E0055081"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '집현전'(책을 모으고 보관하며 쓰게 함) https://encykorea.aks.ac.kr/Article/E0055081",
  "learn": "집현전은 책을 모으고 연구하는 곳",
  "fx": {
   "note": "집현전 마당에 책 상자를 실은 수레가 줄지어 들어온다."
  }
 },
 {
  "id": "DS103",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 서고지기",
   "doll": "official_red"
  },
  "line": "장맛비에 집현전 지붕이 새어 책 몇 권이 젖었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "지붕을 고친다",
    "effects": {
     "treasury": -10
    },
    "this_run": "기와장이들이 지붕에 올라 깨진 기와를 모두 갈았다."
   },
   "left": {
    "label": "책을 말린다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "학자들과 일꾼들이 젖은 책을 마당에 펼쳐 말렸다. 하루 종일 책장을 넘겨 가며 부채질을 했다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "책을 지키는 일",
  "fx": {
   "note": "집현전 지붕에서 빗물이 똑똑 떨어지고, 마당에 책이 줄지어 펼쳐진다."
  }
 },
 {
  "id": "DS104",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "젊은 학자",
   "doll": "official_green"
  },
  "line": "명에서 들여온 어려운 천문 책이 있사옵니다. 제가 한번 풀어 보면 안 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "풀어 보게 한다",
    "effects": {},
    "this_run": "젊은 학자가 책을 끌어안고 서운관으로 달려갔다."
   },
   "left": {
    "label": "기초부터 닦게 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "\"먼저 기초부터 닦게\"라는 말에 젊은 학자는 고개를 숙였다. 선배들은 흐뭇해했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "석 달 만에 책의 셈법을 모두 풀었다! 서운관 관리들이 줄을 서서 배우러 왔다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "종이와 먹만 수레로 들어갔다. 젊은 학자는 아직 첫 장을 넘기지 못했다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "학문 연구를 장려함",
  "fx": {
   "note": "책상 위에 별 그림이 가득한 두루마리. 풀리면 별빛이 반짝, 막히면 먹물이 번진다."
  }
 },
 {
  "id": "DS105",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "오늘 경연(전하께서 학자들과 공부하는 자리)에서 백성 살림 이야기를 길게 나누자 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "경연을 길게 연다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "해가 질 때까지 경연이 이어졌다. 학자들이 내놓은 생각이 두루마리 세 개를 채웠다."
   },
   "left": {
    "label": "짧게 마친다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "경연을 짧게 마치고 밀린 일을 했다. 학자들은 하고 싶던 말을 다 못 해 아쉬워했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '집현전'(학문 활동과 국왕의 자문)",
    "url": "https://encykorea.aks.ac.kr/Article/E0055081"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '집현전'(학문 활동과 국왕의 자문) https://encykorea.aks.ac.kr/Article/E0055081",
  "learn": "집현전은 왕에게 학문으로 조언함",
  "fx": {
   "note": "궁궐 전각에 왕 인형과 학자 인형들이 둘러앉아 책을 펼친다."
  }
 },
 {
  "id": "DS106",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "책으로만 공부하니 백성 살림을 모르겠사옵니다. 고을을 돌며 백성 이야기를 듣고 오면 어떻겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을로 보낸다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "학자들이 짚신을 신고 고을을 돌았다. 돌아와서는 장터 이야기를 한참 했다."
   },
   "left": {
    "label": "서고에서 공부한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "학자들은 서고에 남아 옛 책을 더 읽었다. 고을 소식은 수령의 글로만 들었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "백성의 생활을 살피는 학문",
  "fx": {
   "note": "학자 인형들이 갓을 쓰고 논두렁을 걸어간다."
  }
 },
 {
  "id": "DS107",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "집현전에서 엮던 책 한 권이 드디어 다 되었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "작은 잔치를 연다",
    "effects": {
     "nobles": 10
    },
    "this_run": "집현전 마당에서 작은 잔치가 열렸다. 학자들이 오랜만에 활짝 웃었다."
   },
   "left": {
    "label": "고을마다 보낸다",
    "effects": {
     "people": 10
    },
    "this_run": "첫 책을 고을마다 한 벌씩 보냈다. 향교 선비들이 돌려 가며 읽었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "지도서 249(집현전에서 책을 편찬함) · 일반 상황",
  "general": true,
  "learn": "집현전에서 책을 펴냄",
  "fx": {
   "note": "집현전 처마 아래 새 책이 금빛으로 빛난다."
  }
 },
 {
  "id": "DS108",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤(집현전이 선 뒤)",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "어린 학자가 배울 것이 많은데 일에 치여 공부할 틈이 없사옵니다. 공부할 시간을 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공부할 시간을 준다",
    "effects": {
     "treasury": -5
    },
    "this_run": "어린 학자는 아침마다 선배 곁에서 책을 읽었다. 일은 조금 느려졌다."
   },
   "left": {
    "label": "일부터 맡긴다",
    "effects": {
     "nobles": 5
    },
    "this_run": "어린 학자는 문서를 옮겨 적는 일부터 했다. 선배들의 일이 조금 줄었다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DS108f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "사람을 기르는 데는 시간이 든다",
  "fx": {
   "note": "집현전 구석 책상에 작은 등불 하나."
  }
 },
 {
  "id": "DS108f",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "그때 공부할 시간을 받은 어린 학자가 새 책의 첫 장을 썼사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "책을 받아 든다",
    "effects": {
     "nobles": 15
    },
    "this_run": "선배 학자들이 어린 학자의 글을 돌려 읽으며 무릎을 쳤다."
   },
   "left": {
    "label": "서당에도 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "어린 학자가 쓴 쉬운 풀이가 고을 서당에까지 퍼졌다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "사람을 기른 열매",
  "fx": {
   "note": "집현전 창에서 새 책장이 날아올라 금빛으로 흩어진다."
  }
 },
 {
  "id": "DS109",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S02)"
  ],
  "conditions_text": "S02 뒤(《농사직설》이 나온 뒤)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "《농사직설》이 고을에 왔사옵니다. 그런데 글을 아는 농부가 드무옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "읽어 주게 한다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "관아 아전이 마을마다 돌며 책을 소리 내어 읽어 주었다. 농부들이 귀를 쫑긋 세웠다."
   },
   "left": {
    "label": "관아에 둔다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "책은 관아 서가에 꽂혔다. 물어보러 오는 농부만 책 내용을 들을 수 있었다."
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
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "《농사직설》과 백성의 농사",
  "fx": {
   "note": "논두렁에 사람들이 모여 앉고, 아전 인형이 책을 펼친다."
  }
 },
 {
  "id": "DS110",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S02)"
  ],
  "conditions_text": "S02 뒤(《농사직설》이 나온 뒤)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "《농사직설》에 적힌 대로 거름을 냈더니, 올해 보리가 눈에 띄게 잘 자랐사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간에 들인다",
    "effects": {
     "treasury": 10
    },
    "this_run": "곳간지기가 보리 가마를 세다가 숫자를 두 번 고쳐 적었다."
   },
   "left": {
    "label": "마을 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "마을마다 보리떡 냄새가 났다. 아이들이 떡을 들고 논두렁을 뛰었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "우리 땅에 맞는 농사법",
  "fx": {
   "note": "누렇게 익은 보리밭이 바람에 물결친다."
  }
 },
 {
  "id": "DS111",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 의원",
   "doll": "jungin"
  },
  "line": "우리 산에서 나는 약초로 새 약을 지어 보았사옵니다. 아픈 사람들에게 써 볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 약을 써 본다",
    "effects": {},
    "this_run": "의원이 약 달이는 솥 앞에 앉아 밤새 불을 지켰다."
   },
   "left": {
    "label": "옛 처방을 쓴다",
    "effects": {
     "nobles": 5
    },
    "this_run": "의원은 오래 써 온 처방대로 약을 지었다. 대신들은 \"옛 법이 낫다\"며 고개를 끄덕였다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "people": 15
    },
    "this_run": "열이 내리고 기침이 멎었다! 이웃 고을에서도 약초 이름을 물으러 왔다."
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "약이 듣지 않았다. 약을 기다리던 사람들이 실망해 돌아갔다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬(《향약집성방》 — 우리나라에서 나는 약초로 병을 고치는 법) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "우리 약초로 병을 고침",
  "fx": {
   "note": "약 달이는 김이 솥에서 피어오른다. 잘되면 아이들이 뛰어나오고, 안 되면 김만 가늘게 오른다."
  },
  "caution": "약을 먹고 탈이 나는 장면은 쓰지 않는다. 실패는 \"효과가 없었다\"까지만."
 },
 {
  "id": "DS112",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "종이를 뜨는 장인",
   "doll": "craftsman"
  },
  "line": "책을 많이 찍느라 종이 만들 닥나무가 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "닥나무를 사 온다",
    "effects": {
     "treasury": -10
    },
    "this_run": "먼 고을에서 닥나무 껍질을 사 왔다. 종이 뜨는 소리가 다시 났다."
   },
   "left": {
    "label": "책 찍기를 미룬다",
    "effects": {
     "nobles": -10
    },
    "this_run": "책 찍는 일을 한 철 미뤘다. 학자들이 빈 서가를 보며 한숨을 쉬었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬(종이 만드는 기술의 발전) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "책을 만들려면 종이가 필요하다",
  "fx": {
   "note": "개울가 장인들이 발을 들어 올리자 하얀 종이가 한 장씩 생긴다."
  }
 },
 {
  "id": "DS113",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "인쇄를 맡은 관리",
   "doll": "official_green"
  },
  "line": "새 책을 몇 벌이나 찍을까요? 많이 찍으면 고을마다 보낼 수 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "여러 벌 찍는다",
    "effects": {
     "people": 5,
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "활자판 앞에 일꾼들이 줄지어 섰다. 책 수레가 팔도로 떠났다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "한 벌만 찍는다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "책은 궁궐과 집현전에만 한 벌씩 두었다. 고을 선비들은 베껴 쓰려고 줄을 섰다."
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
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬(인쇄술의 발전) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "인쇄술과 책의 보급",
  "fx": {
   "note": "활자판에 먹이 발리고, 종이가 차례로 찍혀 나온다."
  }
 },
 {
  "id": "DS114",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 의원",
   "doll": "jungin"
  },
  "line": "약초 캘 철이 되었사옵니다. 마을 사람들을 불러 함께 캘까요, 약초꾼에게 살까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마을 사람을 부른다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "마을 사람들이 바구니를 들고 산에 올랐다. 농사일이 하루 밀렸다."
   },
   "left": {
    "label": "약초꾼에게 산다",
    "effects": {
     "people": 5,
     "treasury": -10
    },
    "this_run": "약초꾼들이 지게 가득 약초를 지고 왔다. 값은 비쌌지만 마을은 쉬었다."
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
  "sources_text": "지도서 263(교과서 89) 다양한 책의 편찬(우리나라 약초) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "우리 땅의 약초",
  "fx": {
   "note": "산비탈에 바구니를 든 인형들이 흩어진다."
  }
 },
 {
  "id": "DS115",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "집현전 서고지기",
   "doll": "official_red"
  },
  "line": "서고에 쥐가 들어 책 귀퉁이를 갉아 먹었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고양이를 들인다",
    "effects": {
     "treasury": -5
    },
    "this_run": "서고 문틈마다 나무판을 덧대고 고양이 두 마리를 들였다."
   },
   "left": {
    "label": "다시 베껴 쓴다",
    "effects": {
     "nobles": -5
    },
    "this_run": "쥐가 갉은 책을 학자들이 하나하나 다시 베껴 썼다. 손목이 시큰거렸다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "책을 지키는 일",
  "fx": {
   "note": "서고 선반 사이로 작은 쥐가 쪼르르, 뒤따라 고양이가 슬금슬금."
  }
 },
 {
  "id": "DS116",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S02)"
  ],
  "conditions_text": "S02 뒤(《농사직설》이 나온 뒤)",
  "who": {
   "name": "시골 선비",
   "doll": "yangban"
  },
  "line": "저희 집안에 할아버지 때부터 적어 온 농사 일기가 있사옵니다. 바쳐도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "농부들에게 알린다",
    "effects": {
     "people": 10
    },
    "this_run": "농사 일기에서 쓸 만한 이야기를 골라 고을 농부들에게 알렸다."
   },
   "left": {
    "label": "서고에 들인다",
    "effects": {
     "treasury": 10
    },
    "this_run": "나라에서 일기를 사들여 서고에 두었다. 그 값으로 다른 고을 일기도 모았다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 263(농민들의 경험을 모아 정리) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "경험을 모아 지식으로",
  "fx": {
   "note": "누렇게 바랜 일기책이 펼쳐지고 글자가 반짝인다."
  }
 },
 {
  "id": "DS117",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(SX2)"
  ],
  "conditions_text": "SX2 뒤(앙부일구를 둔 뒤)",
  "who": {
   "name": "종로 상인",
   "doll": "merchant"
  },
  "line": "흐린 날에는 해시계에 그림자가 없어 시각을 모르겠사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "북을 쳐 알린다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "흐린 날에는 관리가 북을 쳐서 시각을 알렸다. 장꾼들이 북소리에 맞춰 가게 문을 열었다."
   },
   "left": {
    "label": "맑은 날만 본다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "흐린 날 장터는 저마다 짐작으로 문을 열고 닫았다. 약속 시각을 두고 다툼이 잦았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(해의 그림자로 시각을 앎) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "해시계의 쓰임과 한계",
  "fx": {
   "note": "먹구름 아래 해시계 위에 그림자가 사라졌다가, 북소리와 함께 사람들이 움직인다."
  }
 },
 {
  "id": "DS118",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S06)"
  ],
  "conditions_text": "S06 뒤(자격루가 선 뒤)",
  "who": {
   "name": "자격루를 지키는 관리",
   "doll": "official_green"
  },
  "line": "자격루 인형이 시각마다 종을 치자 구경꾼이 몰려들었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "구경하게 둔다",
    "effects": {
     "people": 10
    },
    "this_run": "아이들이 누각 앞에 쪼그려 앉아 인형이 움직이기만 기다렸다."
   },
   "left": {
    "label": "관청 시각을 맞춘다",
    "effects": {
     "treasury": 10
    },
    "this_run": "관청마다 자격루 시각에 맞춰 일을 시작했다. 늦게까지 켜던 등불 기름이 줄었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(물시계 자격루)",
  "learn": "자격루로 시각을 알림",
  "fx": {
   "note": "누각 안 작은 나무 인형이 팔을 들어 종을 “땡”."
  }
 },
 {
  "id": "DS119",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S06)"
  ],
  "conditions_text": "S06 뒤(자격루가 선 뒤)",
  "who": {
   "name": "자격루를 지키는 관리",
   "doll": "official_green"
  },
  "line": "자격루 물항아리에 금이 가 물이 새고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 항아리를 붓는다",
    "effects": {
     "treasury": -10
    },
    "this_run": "구리 장인들이 새 항아리를 부었다. 자격루가 다시 제 시각을 알렸다."
   },
   "left": {
    "label": "덧대어 쓴다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "항아리에 헝겊을 덧대어 썼다. 시각이 조금씩 틀려 관리와 장꾼이 함께 투덜댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기구를 고쳐 가며 쓰는 일",
  "fx": {
   "note": "자격루 항아리에서 물방울이 똑똑 샌다."
  }
 },
 {
  "id": "DS120",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "별을 제대로 보려면 밤새 관측해야 하옵니다. 밤 관측 당번을 늘릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "밤 당번을 늘린다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "서운관 관리들이 번갈아 밤을 새웠다. 별 기록이 두 배로 쌓였다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "맑은 밤만 본다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "관측은 맑은 밤에만 했다. 학자들은 빈칸 많은 기록을 아쉬워했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(해와 달, 별의 움직임을 관찰)",
  "learn": "하늘을 관찰해 계절을 앎",
  "fx": {
   "note": "밤하늘 아래 관측대에 등불 하나, 별 사이로 붓 끝이 오간다."
  }
 },
 {
  "id": "DS121",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(SX3)"
  ],
  "conditions_text": "SX3 뒤(측우기를 보낸 뒤)",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "측우기 기록을 보니 올해는 비가 일찍 올 것 같사옵니다. 모내기를 앞당기게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모내기를 앞당긴다",
    "effects": {},
    "this_run": "고을마다 \"모내기를 서두르라\"는 알림이 붙었다."
   },
   "left": {
    "label": "예년대로 한다",
    "effects": {
     "people": 5
    },
    "this_run": "예년대로 모내기를 했다. 농부들은 익숙한 대로 일해 마음이 편했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "정말 비가 일찍 왔다! 앞당겨 심은 모가 쑥쑥 자랐다."
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "비가 늦어 일찍 심은 모가 목말라했다. 농부들이 물동이를 이고 논을 오갔다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(측우기로 비의 양을 잼) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "측우기 기록과 농사",
  "fx": {
   "note": "논마다 모가 꽂히고, 하늘 구름이 몰려오거나 맑게 갠다."
  }
 },
 {
  "id": "DS122",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S06)"
  ],
  "conditions_text": "S06 뒤(자격루가 선 뒤)",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "궁궐 물시계 시각이 정확해졌사옵니다. 그 시각에 맞춰 도성 문을 여닫을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "종에 맞춰 연다",
    "effects": {
     "people": 10,
     "army": -5
    },
    "this_run": "문 여는 시각이 날마다 똑같아졌다. 새벽 장꾼들이 문 앞에서 덜 기다렸다."
   },
   "left": {
    "label": "해를 보고 연다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "문지기들은 하던 대로 해를 보고 문을 열었다. 흐린 날엔 문이 늦게 열렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(물시계 자격루) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "정확한 시각이 생활을 바꿈",
  "fx": {
   "note": "도성 문이 종소리에 맞춰 “쿵” 열리고 장꾼들이 쏟아져 들어온다."
  }
 },
 {
  "id": "DS123",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "셈을 잘하는 젊은 관리가 있사옵니다. 하늘의 움직임을 셈하는 공부를 시킬까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "셈 공부를 시킨다",
    "effects": {
     "treasury": -5
    },
    "this_run": "젊은 관리는 낮에는 일하고 밤에는 셈판을 두드렸다."
   },
   "left": {
    "label": "기록 정리를 맡긴다",
    "effects": {
     "nobles": 5
    },
    "this_run": "젊은 관리는 곧바로 기록 정리를 맡았다. 서운관 일이 조금 빨라졌다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DS123f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "사람을 길러 과학을 발전시킴",
  "fx": {
   "note": "서운관 책상 위 셈가지가 달그락거린다."
  }
 },
 {
  "id": "DS123f",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "셈 공부를 하던 젊은 관리가 해와 달이 언제 가려질지 미리 셈해 냈사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "서운관에 상을 준다",
    "effects": {
     "nobles": 10
    },
    "this_run": "서운관 사람들이 그날 하늘을 올려다보며 손뼉을 쳤다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "고을에 미리 알린다",
    "effects": {
     "people": 15
    },
    "this_run": "고을마다 \"그날 하늘이 어두워져도 놀라지 말라\"는 알림이 붙었다. 사람들이 오히려 구경을 나왔다.",
    "device": {
     "invention": 1
    }
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "사람을 기른 열매",
  "fx": {
   "note": "셈판 위로 해와 달 모양 먹점이 겹쳐진다."
  }
 },
 {
  "id": "DS124",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(SX1)"
  ],
  "conditions_text": "SX1 뒤(혼천의를 만든 뒤)",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "혼천의를 날마다 돌려 보며 기록할 사람이 필요하옵니다. 누구에게 맡길까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "학자에게 맡긴다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "학자 한 사람이 혼천의 곁에 붙어 앉아 날마다 기록했다."
   },
   "left": {
    "label": "장인에게 맡긴다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "혼천의를 만든 장인이 직접 맡았다. 대신들은 \"장인에게?\" 하며 고개를 갸웃했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 과학 기구의 발명(혼천의)",
  "learn": "혼천의로 하늘을 관찰",
  "fx": {
   "note": "궁궐 뜰 혼천의 고리가 천천히 돈다."
  }
 },
 {
  "id": "DS125",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "관청 노비의 아이가 날마다 서당 담 너머에서 글 읽는 소리를 따라 외우옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "함께 배우게 한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "아이는 마당 끝 자리에 앉아 함께 글을 배웠다. 몇몇 양반 집안은 못마땅해했다."
   },
   "left": {
    "label": "일터로 돌려보낸다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "아이는 관청 일로 돌아갔다. 담 너머로 들리던 글 읽는 소리가 그쳤다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(신분에 따라 교육받을 기회가 달랐음) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "신분과 교육 기회",
  "fx": {
   "note": "서당 담 너머로 작은 얼굴이 빼꼼 보인다."
  },
  "caution": "천민 아이를 놀리지 않는다. 존중하는 말투로."
 },
 {
  "id": "DS126",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "그릇 굽는 장인",
   "doll": "craftsman"
  },
  "line": "나라에 바칠 그릇을 굽느라 장인들이 제 일을 못 하고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "품삯을 준다",
    "effects": {
     "treasury": -10
    },
    "this_run": "장인들에게 품삯을 쳐 주었다. 가마 불이 다시 활활 탔다."
   },
   "left": {
    "label": "그릇 수를 줄인다",
    "effects": {
     "nobles": -10
    },
    "this_run": "궁궐에 들일 그릇 수를 줄였다. 잔칫상이 소박해지자 대신들이 수군댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   },
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(상민 — 수공업) · 지도서 263(분청사기와 백자) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "상민의 삶 — 수공업자",
  "fx": {
   "note": "가마 앞에 흰 그릇이 줄지어 마른다."
  }
 },
 {
  "id": "DS127",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "고을 의원이 열이 펄펄 끓던 아이를 낫게 했다며, 마을 사람들이 떡을 쪄 왔사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마을 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "떡 바구니가 의원 집 마당에 줄지어 놓였다."
   },
   "left": {
    "label": "의원을 더 뽑는다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "의원에게 상을 내리고 의원을 두 명 더 뽑았다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(중인 — 의학에 관한 일)",
  "learn": "중인의 삶 — 의원",
  "fx": {
   "note": "의원 집 앞에 떡 바구니를 든 인형들이 줄을 선다."
  }
 },
 {
  "id": "DS128",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "양반 대감댁에서 잔치를 연다며 마을 상민들을 일꾼으로 부르옵니다. 농사철인데 어찌할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "삯을 주게 한다",
    "effects": {
     "people": 10,
     "nobles": -10,
     "treasury": -5
    },
    "this_run": "대감댁이 일꾼에게 삯을 주게 했다. 관아가 모자란 삯을 조금 보탰다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "상민들은 논을 두고 대감댁 마당을 쓸었다. 대감은 잔치를 크게 열었다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(양반과 상민의 생활) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "신분에 따른 생활 모습",
  "fx": {
   "note": "기와집 마당에 천막이 서고, 논에는 빈 자리가 생긴다."
  }
 },
 {
  "id": "DS129",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "농부",
   "doll": "farmer"
  },
  "line": "마을 뒤 산비탈을 일궈 밭을 늘려 보고 싶사옵니다. 돌이 많아 될지 모르겠사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "산비탈을 일군다",
    "effects": {},
    "this_run": "마을 장정들이 괭이를 메고 산비탈에 올랐다."
   },
   "left": {
    "label": "하던 논만 짓는다",
    "effects": {
     "people": 5
    },
    "this_run": "하던 논만 정성껏 지었다. 큰 수확은 없었지만 마음은 편했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "돌을 골라내자 흙이 기름졌다! 새 밭에서 콩이 수북이 났다."
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "아무리 파도 돌만 나왔다. 장정들은 손에 물집만 잔뜩 잡혔다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(상민 — 대부분 농민) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "상민의 삶 — 농민",
  "fx": {
   "note": "산비탈에 밭고랑이 생기거나 돌무더기만 쌓인다."
  }
 },
 {
  "id": "DS130",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "관청 노비",
   "doll": "nobi"
  },
  "line": "겨울이 다가오는데 관청 노비들이 입을 솜옷이 없사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "솜옷을 나눈다",
    "effects": {
     "treasury": -10
    },
    "this_run": "관아 창고에서 무명과 솜을 내주었다. 노비들이 밤새 솜옷을 지었다."
   },
   "left": {
    "label": "봄까지 참게 한다",
    "effects": {
     "people": -10
    },
    "this_run": "\"봄까지 참으라\"는 말만 돌아왔다. 노비들은 짚을 엮어 등에 둘렀다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(천민 — 대부분 노비)",
  "learn": "천민의 삶",
  "fx": {
   "note": "관아 마당에 무명 꾸러미가 쌓이거나, 짚을 두른 인형들이 손을 비빈다."
  },
  "caution": "노비를 낮추어 부르지 않는다. 존중하는 말투로."
 },
 {
  "id": "DS131",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "시골 선비",
   "doll": "yangban"
  },
  "line": "이웃 상민 집 아들이 글을 아주 잘하옵니다. 과거를 보게 도와주면 어떻겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "과거 공부를 돕는다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "선비가 책을 빌려주고 글을 봐 주었다. 마을 사람들이 그 아이를 자랑스러워했다."
   },
   "left": {
    "label": "농사일을 돕게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "아이는 아버지를 도와 농사를 지었다. 책은 다락에 올라갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 248 참고 자료(문과·무과는 원칙적으로 양인 이상이면 응시할 수 있었으나, 실제로는 대부분 양반) · 일반 상황",
  "general": true,
  "learn": "과거 시험과 신분",
  "fx": {
   "note": "초가 방 안에서 아이가 등잔불 아래 책을 읽는다."
  }
 },
 {
  "id": "DS132",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "마을 이장",
   "doll": "farmer"
  },
  "line": "명절에 마을 마당에서 윷놀이 판이 크게 벌어졌사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "상품을 내린다",
    "effects": {
     "people": 10
    },
    "this_run": "관아에서 상품으로 쌀 한 가마를 내렸다. 윷가락이 하늘 높이 날았다."
   },
   "left": {
    "label": "활쏘기 판도 연다",
    "effects": {
     "army": 5,
     "people": 5
    },
    "this_run": "활쏘기 판도 함께 열었다. 과녁 맞히는 소리에 마당이 떠들썩했다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "257"
   }
  ],
  "sources_text": "지도서 257(조선 시대 놀이 — 윷놀이·투호·고누) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "조선 시대 사람들의 놀이",
  "fx": {
   "note": "마을 마당에 윷가락이 “탁” 떨어지고 사람들이 들썩인다."
  }
 },
 {
  "id": "DS133",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "사역원 관리",
   "doll": "official_red"
  },
  "line": "통역하는 역관이 되려는 사람이 많사옵니다. 역과 시험을 더 열까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시험을 더 연다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "시험장에 낯선 나라 말이 가득 울렸다. 새 역관들이 뽑혔다."
   },
   "left": {
    "label": "정해진 날만 연다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "정해진 날에만 시험을 열었다. 떨어진 이들은 다음 시험을 기다렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "255",
    "tb": "84~85"
   },
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 255(교과서 84~85) 신분에 따른 생활 모습(중인 — 통역) · [교과서 밖] 지도서 248 참고 자료(잡과 — 역과)",
  "learn": "중인의 일과 잡과",
  "fx": {
   "note": "시험장 책상마다 다른 나라 글자가 적힌 종이가 놓인다."
  }
 },
 {
  "id": "DS134",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "성균관 대사성",
   "doll": "official_blue"
  },
  "line": "성균관 동재와 서재(기숙사)가 비좁아 유생들이 한방에 너무 많이 자옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "기숙사를 늘린다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "기숙사 한 줄을 더 지었다. 유생들이 다리를 쭉 뻗고 잤다."
   },
   "left": {
    "label": "방을 나눠 쓴다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "방을 나눠 쓰게 했다. 유생들은 밤마다 서로의 코 고는 소리를 견뎠다."
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
  "sources_text": "[교과서 밖] 지도서 249 참고 자료(성균관 유생은 동재와 서재라는 기숙사에서 생활)",
  "learn": "성균관의 생활",
  "fx": {
   "note": "성균관 담 안에 기와지붕 한 줄이 더 솟는다."
  }
 },
 {
  "id": "DS135",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "서당 아이들을 데리고 고을 백일장(글짓기 대회)을 열어 볼까 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "백일장을 연다",
    "effects": {},
    "this_run": "아이들이 붓을 들고 향교 마당에 앉았다. 고을 사람들이 담 너머로 구경했다."
   },
   "left": {
    "label": "평소대로 가르친다",
    "effects": {
     "people": 5
    },
    "this_run": "훈장은 평소처럼 천자문을 가르쳤다. 아이들은 백일장 소문만 들었다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "열 살 아이가 쓴 글이 장원이었다! 고을 선비들이 그 글을 베껴 갔다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "상품만 잔뜩 나갔다. 아이들 글은 아직 서툴러 장원을 뽑지 못했다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "서당에서 공부한 아이들",
  "fx": {
   "note": "향교 마당에 작은 책상이 줄지어 놓이고 종이가 바람에 날린다."
  }
 },
 {
  "id": "DS136",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "향교 유생",
   "doll": "yusaeng"
  },
  "line": "저희 향교에서 공부한 선비가 과거에 붙었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을 잔치를 연다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "고을 사람들이 꽹과리를 치며 합격자를 맞았다."
   },
   "left": {
    "label": "향교에 상을 준다",
    "effects": {
     "nobles": 10
    },
    "this_run": "향교에 책과 붓을 상으로 내렸다. 유생들이 더 일찍 일어났다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거",
  "learn": "향교에서 공부해 과거에 합격",
  "fx": {
   "note": "향교 앞길에 깃발을 든 행렬이 지나간다."
  }
 },
 {
  "id": "DS137",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "과거 날 큰비가 와서 시골 선비들이 강을 못 건너고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시험을 미룬다",
    "effects": {
     "treasury": -5,
     "nobles": -5
    },
    "this_run": "시험을 닷새 미뤘다. 시험장 준비를 다시 하느라 돈과 품이 들었다."
   },
   "left": {
    "label": "그대로 치른다",
    "effects": {
     "people": -10
    },
    "this_run": "시험은 그대로 치렀다. 강가에서 발을 구르던 선비들은 다음 시험을 기다려야 했다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "과거 시험",
  "fx": {
   "note": "강물이 불어난 나루에 갓 쓴 선비들이 줄지어 서 있다."
  }
 },
 {
  "id": "DS138",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "무과에 붙은 이들을 어디로 보낼까요? 북쪽 진이 사람을 기다리옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "북쪽 진으로 보낸다",
    "effects": {
     "army": 10,
     "people": -5,
     "nobles": -5
    },
    "this_run": "새 무관들이 활을 메고 북쪽 진으로 떠났다. 가족들은 먼 길을 걱정했다."
   },
   "left": {
    "label": "도성에 둔다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "새 무관들은 도성에 남아 궁궐을 지켰다. 북쪽 진에서는 사람이 모자라 투덜댔다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   },
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 주변 나라와의 관계(4군 6진) · [교과서 밖] 지도서 248 참고 자료(무과 — 활쏘기 등 무예)",
  "learn": "무과와 국경 수비",
  "fx": {
   "note": "활을 멘 인형들이 북쪽 강가 길로 줄지어 간다."
  }
 },
 {
  "id": "DS139",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "성균관 유생",
   "doll": "yusaeng"
  },
  "line": "성균관 유생들이 청소와 물 긷는 일을 덜어 주면 공부에 더 힘쓰겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "일꾼을 들인다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "일하는 사람을 더 들였다. 유생들은 아침부터 책만 펼쳤다."
   },
   "left": {
    "label": "돌아가며 하게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "유생들이 돌아가며 청소를 했다. 몇몇은 투덜댔지만 서로 친해졌다."
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
  "sources_text": "지도서 249(성균관) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "성균관의 생활",
  "fx": {
   "note": "성균관 마당에 빗자루를 든 유생 인형들이 줄지어 선다."
  }
 },
 {
  "id": "DS140",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "마을 서당에 책이 모자라 아이들이 한 권을 돌려 보옵니다. 나라에서 책을 보내 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "책을 보낸다",
    "effects": {
     "treasury": -5
    },
    "this_run": "책 한 수레가 서당에 닿았다. 아이들이 저마다 책을 끌어안았다."
   },
   "left": {
    "label": "베껴 쓰게 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "훈장이 책을 손으로 베껴 나눠 주었다. 마을 양반들이 종이를 보탰다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DS140f",
   "after_n": 7,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거",
  "learn": "서당에서 시작하는 공부",
  "fx": {
   "note": "서당 마루에 책이 한 권씩 놓인다."
  }
 },
 {
  "id": "DS140f",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "그때 책을 받은 서당 아이들이 자라 여럿이 향교에 들어갔사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "향교에 상을 준다",
    "effects": {
     "nobles": 10
    },
    "this_run": "향교 마당이 새 유생들로 북적였다."
   },
   "left": {
    "label": "서당을 더 연다",
    "effects": {
     "people": 15
    },
    "this_run": "서당 아이들 이야기에 마을마다 서당을 열겠다는 사람이 늘었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거",
  "learn": "서당에 보낸 책의 열매",
  "fx": {
   "note": "서당에서 향교로 이어지는 길에 아이들이 줄지어 걸어간다."
  }
 },
 {
  "id": "DS141",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "향교 유생",
   "doll": "yusaeng"
  },
  "line": "향교에서 공자께 올리는 제사가 다가오는데 제물을 마련할 돈이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "나라에서 댄다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -10
    },
    "this_run": "나라에서 제물과 그릇을 보냈다. 고을 사람들도 제사 구경을 왔다."
   },
   "left": {
    "label": "고을이 마련한다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "고을이 알아서 마련하라 했다. 마을마다 쌀을 조금씩 걷었다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거(향교) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "향교와 유교",
  "fx": {
   "note": "향교 사당 앞에 제사상이 차려지고 향 연기가 오른다."
  }
 },
 {
  "id": "DS142",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "과거 시험장에서 남의 답안을 베낀 유생이 들켰사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시험을 다시 본다",
    "effects": {
     "treasury": -5,
     "nobles": -5
    },
    "this_run": "그 시험장 시험을 모두 다시 치렀다. 다시 오느라 선비들이 고생했다."
   },
   "left": {
    "label": "그 사람만 벌한다",
    "effects": {
     "nobles": -10
    },
    "this_run": "베낀 유생만 벌하고 몇 해 동안 시험을 못 보게 했다. 그 집안이 크게 부끄러워했다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81) 서당·향교·성균관과 과거 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "공정한 시험",
  "fx": {
   "note": "시험장에서 종이 두 장이 펄럭 겹친다."
  }
 },
 {
  "id": "DS143",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "북쪽 진의 장수",
   "doll": "general"
  },
  "line": "남쪽에서 옮겨 온 백성들이 처음 맞는 북쪽 겨울이옵니다. 땔감이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "땔감을 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "나라에서 땔감과 솜을 실어 보냈다. 새 마을 굴뚝마다 연기가 올랐다."
   },
   "left": {
    "label": "스스로 하게 둔다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "백성들이 산에 올라 스스로 나무를 했다. 첫 겨울은 길고 추웠다."
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
  "sources_text": "지도서 234(교과서 76) 주변 나라와의 관계(4군 6진) · 수업 도움말(남쪽 백성을 옮겨 살게 함)",
  "learn": "4군 6진과 옮겨 간 백성",
  "fx": {
   "note": "북쪽 강가 새 마을에 눈이 내리고, 땔감 수레가 지나간다."
  }
 },
 {
  "id": "DS144",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "북쪽 진의 장수",
   "doll": "general"
  },
  "line": "진 둘레에 새로 일군 밭에서 첫 곡식을 거두었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간에 들인다",
    "effects": {
     "treasury": 10
    },
    "this_run": "첫 곡식이 수레에 실려 곳간으로 갔다."
   },
   "left": {
    "label": "군사들과 나눈다",
    "effects": {
     "army": 10
    },
    "this_run": "군사들이 햅쌀로 지은 밥을 배불리 먹고 성벽을 다시 돌았다."
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
  "sources_text": "지도서 234(교과서 76) 주변 나라와의 관계(4군 6진) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "국경 지역의 새 마을",
  "fx": {
   "note": "북쪽 강가 밭에 누런 곡식이 출렁인다."
  }
 },
 {
  "id": "DS145",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "북쪽 진의 장수",
   "doll": "general"
  },
  "line": "큰비에 진 둘레 목책 한쪽이 쓰러졌사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "목책을 다시 세운다",
    "effects": {
     "treasury": -10
    },
    "this_run": "나무를 새로 베어 와 목책을 다시 세웠다."
   },
   "left": {
    "label": "군사가 메운다",
    "effects": {
     "army": -10
    },
    "this_run": "당분간 군사들이 번갈아 서서 빈자리를 지켰다. 군사들 눈 밑이 어두워졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "국경을 지키는 일",
  "fx": {
   "note": "북쪽 진 목책 한쪽이 기울어져 있다."
  }
 },
 {
  "id": "DS146",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "북쪽 진의 군관",
   "doll": "general"
  },
  "line": "강 건너 지형을 그려 오면 진을 지키기 쉬울 것이옵니다. 정찰을 보낼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "정찰을 보낸다",
    "effects": {},
    "this_run": "날랜 군사 다섯이 얼어붙은 강을 건너갔다."
   },
   "left": {
    "label": "진만 지킨다",
    "effects": {
     "nobles": 5
    },
    "this_run": "진만 단단히 지켰다. 대신들은 \"괜히 일을 만들지 않았다\"며 안심했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "군사들이 산길과 여울을 모두 그려 왔다! 진의 장수가 지도를 벽에 걸었다."
   },
   "lose": {
    "effects": {
     "army": -10
    },
    "this_run": "눈보라에 길을 잃고 빈손으로 돌아왔다. 다행히 모두 무사했다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "국경을 지키는 일",
  "fx": {
   "note": "강 건너 산줄기에 작은 깃발이 꽂혔다가 돌아온다."
  }
 },
 {
  "id": "DS147",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S01)"
  ],
  "conditions_text": "S01 뒤(쓰시마섬 정벌 뒤)",
  "who": {
   "name": "왜관을 맡은 관리",
   "doll": "official_red"
  },
  "line": "포구에 머무는 왜인 상인이 구리를 팔겠다 하옵니다. 사들일까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "구리를 사들인다",
    "effects": {
     "treasury": -10,
     "nobles": 5,
     "people": 5
    },
    "this_run": "구리가 공방으로 들어갔다. 장인들이 새 기구를 만들 재료가 생겼다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "쌀만 바꾼다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "쌀과 무명만 바꾸었다. 구리가 모자란 공방은 기다렸다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '삼포'(포구를 열어 교역을 허락함)",
    "url": "https://encykorea.aks.ac.kr/Article/E0026914"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '삼포'(포구를 열어 교역을 허락함) https://encykorea.aks.ac.kr/Article/E0026914",
  "learn": "조선 전기 일본과의 교역",
  "fx": {
   "note": "포구에 짐 꾸러미가 내려지고 구리 덩어리가 반짝인다."
  }
 },
 {
  "id": "DS148",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S01)"
  ],
  "conditions_text": "S01 뒤(쓰시마섬 정벌 뒤)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "왜관에 머물던 왜인 몇이 정해진 곳 밖으로 나와 마을 사람과 다툼이 났사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문지기를 세운다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "왜관 둘레에 문지기를 더 세웠다. 다툼은 줄었지만 품이 들었다."
   },
   "left": {
    "label": "타일러 돌려보낸다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "수령이 양쪽을 불러 타일렀다. 장사는 이어졌지만 마을 사람들은 불안해했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '삼포'(왜관 — 성 밖 정해진 곳, 마찰이 잦아짐",
    "url": "https://encykorea.aks.ac.kr/Article/E0026914"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '삼포'(왜관 — 성 밖 정해진 곳, 마찰이 잦아짐) https://encykorea.aks.ac.kr/Article/E0026914",
  "learn": "왜관과 교류의 어려움",
  "fx": {
   "note": "포구 마을에 담이 서고 문지기 인형이 선다."
  }
 },
 {
  "id": "DS149",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "who": {
   "name": "봉수대 군사",
   "doll": "general"
  },
  "line": "봉수대 불이 잘못 올라 이웃 봉수대까지 소동이 났사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "봉수군을 다시 익힌다",
    "effects": {
     "army": 10,
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "봉수군을 새로 뽑아 불 올리는 법을 다시 익히게 했다."
   },
   "left": {
    "label": "꾸짖고 넘어간다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "잘못 올린 군사만 꾸짖었다. 다음 봉수 때 군사들이 머뭇거렸다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "봉수로 소식을 알림",
  "fx": {
   "note": "산꼭대기 봉수대에서 연기가 올랐다가 꺼진다."
  }
 },
 {
  "id": "DS150",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S04)"
  ],
  "conditions_text": "S04 뒤(4군 6진을 둔 뒤)",
  "who": {
   "name": "북쪽 진의 군관",
   "doll": "general"
  },
  "line": "진으로 가던 군량 수레가 눈길에 갇혔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사가 끌어온다",
    "effects": {
     "army": -10
    },
    "this_run": "군사들이 나가 눈을 치우고 수레를 끌었다. 진이 며칠 비었다."
   },
   "left": {
    "label": "마을에 맡긴다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "마을 사람들에게 수레 끄는 일을 맡겼다. 봄 농사 준비가 늦어졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "국경을 지키는 일",
  "fx": {
   "note": "눈 덮인 산길에 수레가 멈춰 있다."
  }
 },
 {
  "id": "DS151",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S01)"
  ],
  "conditions_text": "S01 뒤(쓰시마섬 정벌 뒤)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "쓰시마섬에 갔던 군사들이 무사히 돌아왔사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마을 잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "바닷가 마을마다 잔치가 열렸다. 아이들이 아버지 등에 매달렸다."
   },
   "left": {
    "label": "군사에게 상을 준다",
    "effects": {
     "army": 10
    },
    "this_run": "돌아온 군사들에게 상을 내렸다. 군사들이 어깨를 펴고 진으로 돌아갔다."
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
  "sources_text": "지도서 234(교과서 76) 주변 나라와의 관계(쓰시마섬 정벌) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "쓰시마섬 정벌",
  "fx": {
   "note": "포구에 배가 닿고, 깃발 든 인형들이 내린다."
  }
 },
 {
  "id": "DS152",
  "kind": "daily",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(S01)"
  ],
  "conditions_text": "S01 뒤(쓰시마섬 정벌 뒤)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "바닷가 사람들이 고깃배를 멀리까지 띄우게 해 달라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "먼바다로 보낸다",
    "effects": {
     "people": 10,
     "army": -5
    },
    "this_run": "고깃배들이 먼바다로 나갔다. 저녁 장터에 생선이 가득했다."
   },
   "left": {
    "label": "봉수대부터 고친다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "봉수대부터 고치고 배는 가까운 바다에만 띄우게 했다."
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
  "sources_text": "지도서 234(교과서 76) 주변 나라와의 관계(왜구에 강하게 대응) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "바닷가 사람들의 살림",
  "fx": {
   "note": "바다 위로 작은 고깃배들이 점점이 흩어진다."
  }
 },
 {
  "id": "CS01a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1426",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "학자들이 일에 쫓겨 책 읽을 틈이 없사옵니다. 몇 사람에게 휴가를 주어 집에서 책만 읽게 하면 어떻겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 쉬게 한다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "뛰어난 학자 몇이 한꺼번에 집으로 돌아갔다. 집현전이 조금 썰렁해졌다."
   },
   "left": {
    "label": "돌아가며 쉬게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "학자들이 차례를 정해 쉬었다. 차례를 기다리는 학자들이 달력을 셌다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CS01b",
   "after_n": 4
  },
  "real_history": "1426년 세종은 집현전 학자들에게 휴가를 주어 집에서 책을 읽게 했다. 이를 사가독서라고 한다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '사가독서'",
    "url": "https://encykorea.aks.ac.kr/Article/E0025343"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '사가독서' https://encykorea.aks.ac.kr/Article/E0025343",
  "learn": "세종의 인재 기르기 — 사가독서",
  "fx": {
   "note": "집현전 학자 인형 하나가 책 보따리를 메고 집으로 간다."
  },
  "chain": "학자들의 휴가"
 },
 {
  "id": "CS01b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1442",
  "conditions": [
   "seen(CS01a)"
  ],
  "conditions_text": "CS01a 4장 뒤",
  "who": {
   "name": "신숙주",
   "doll": "official_blue"
  },
  "line": "저희 여섯이 휴가를 받으면 집보다 조용한 산속 절에서 글을 읽고 싶사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "산속 절로 보낸다",
    "effects": {
     "nobles": 10
    },
    "this_run": "여섯 학자가 산사에 짐을 풀었다. 밤마다 글 읽는 소리가 계곡을 울렸다."
   },
   "left": {
    "label": "집에서 읽게 한다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "학자들은 집에서 읽으며 이웃 아이들에게도 글을 가르쳤다."
   }
  },
  "grain": "gift",
  "real_history": "1442년에는 신숙주 등 6명에게 휴가를 주어 진관사에서 글을 읽게 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '사가독서'",
    "url": "https://encykorea.aks.ac.kr/Article/E0025343"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '사가독서' https://encykorea.aks.ac.kr/Article/E0025343",
  "learn": "사가독서",
  "fx": {
   "note": "산속 절 지붕 아래 등불 여섯 개가 켜진다."
  },
  "chain": "학자들의 휴가"
 },
 {
  "id": "CS02a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1430",
  "conditions": [
   "seen(S02)"
  ],
  "conditions_text": "S02 뒤",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "《농사직설》을 고을마다 나눠 주려 하옵니다. 어디부터 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모든 도에 보낸다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "책 수레가 팔도로 한꺼번에 떠났다. 수레꾼이 모자라 관리들까지 고삐를 잡았다."
   },
   "left": {
    "label": "관리에게 먼저 준다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "서울의 높은 관리들과 수령들이 먼저 책을 받아 읽었다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CS02b",
   "after_n": 4
  },
  "real_history": "세종은 1430년부터 《농사직설》을 각 도의 지방관과 서울의 높은 관리들에게 널리 나누어 주었고, 그 뒤에도 여러 번 다시 찍었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 267 참고 자료(국사편찬위원회 우리역사넷 《농사직설》)",
  "learn": "《농사직설》의 보급",
  "fx": {
   "note": "책을 실은 수레가 섬의 길을 따라 사방으로 흩어진다."
  },
  "chain": "《농사직설》을 나누다"
 },
 {
  "id": "CS02b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1430년대",
  "conditions": [
   "seen(CS02a)"
  ],
  "conditions_text": "CS02a 4장 뒤",
  "who": {
   "name": "북쪽 고을 수령",
   "doll": "official_red"
  },
  "line": "《농사직설》에 적힌 남쪽 농법이 저희 고을 날씨와는 조금 다르옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "고을에 맞춰 쓴다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "수령이 늙은 농부들과 의논해 심는 날을 고을에 맞게 바꾸었다."
   },
   "left": {
    "label": "책대로 짓게 한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "책에 적힌 대로 심었다. 몇몇 논은 잘되고 몇몇 논은 늦되었다."
   }
  },
  "grain": "balance",
  "real_history": "《농사직설》을 펴낸 까닭 가운데 하나는 앞선 남부 지방의 농사 기술을 중북부 지역으로 널리 알리려는 것이었다고 본다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 267 참고 자료(《농사직설》의 편찬 이유)",
  "learn": "《농사직설》과 지역의 농사",
  "fx": {
   "note": "남쪽 논의 초록빛이 북쪽 논으로 번져 간다."
  },
  "chain": "《농사직설》을 나누다"
 },
 {
  "id": "CS03a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1434",
  "conditions": [
   "seen(SX1)"
  ],
  "conditions_text": "SX1(혼천의) 뒤",
  "who": {
   "name": "서운관 관리",
   "doll": "official_red"
  },
  "line": "경회루 북쪽에 돌로 큰 관측대(간의대)를 쌓으려 하옵니다. 어떻게 쌓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "높게 쌓는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "돌 수레가 줄지어 궁궐로 들어갔다. 관측대가 담장보다 높이 솟았다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "천천히 쌓는다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "돌을 하나하나 맞춰 천천히 쌓았다. 학자들은 완성 날만 기다렸다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CS03b",
   "after_n": 4
  },
  "real_history": "경회루 북쪽에 돌로 쌓은 천문 관측대 간의대가 1434년(세종 16)에 완성되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '세종'(경회루 북쪽 간의대)",
    "url": "https://encykorea.aks.ac.kr/Article/E0029857"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '세종'(경회루 북쪽 간의대) https://encykorea.aks.ac.kr/Article/E0029857",
  "learn": "세종 때의 천문 관측",
  "fx": {
   "note": "경회루 북쪽에 돌 관측대가 층층이 올라간다."
  },
  "chain": "하늘을 셈하다"
 },
 {
  "id": "CS03b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1433~1442",
  "conditions": [
   "seen(CS03a)"
  ],
  "conditions_text": "CS03a 4장 뒤",
  "who": {
   "name": "정인지",
   "doll": "official_blue"
  },
  "line": "해와 달, 다섯 별의 움직임을 셈하는 책(칠정산)을 엮고 있사옵니다. 끝까지 셈해 볼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "끝까지 셈한다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -10
    },
    "this_run": "학자들이 몇 해 동안 셈판을 두드렸다. 두꺼운 책이 완성되었다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "있는 책을 쓴다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "명에서 들여온 책을 그대로 썼다. 계절이 조금씩 어긋난다는 말이 나왔다."
   }
  },
  "grain": "complex",
  "real_history": "세종은 1433년 정인지 등에게 《칠정산내편》을 짓게 했고, 1442년(세종 24)에 완성되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '세종'(《칠정산내편》)",
    "url": "https://encykorea.aks.ac.kr/Article/E0029857"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '세종'(《칠정산내편》) https://encykorea.aks.ac.kr/Article/E0029857",
  "learn": "우리 실정에 맞는 천문 계산",
  "fx": {
   "note": "밤하늘의 해·달·별 모양 먹점이 셈판 위로 내려앉는다."
  },
  "chain": "하늘을 셈하다"
 },
 {
  "id": "CS04a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1423",
  "conditions": [
   "seen(S01)"
  ],
  "conditions_text": "S01(쓰시마섬 정벌) 뒤",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "왜인들이 다시 와서 장사하게 해 달라 청하옵니다. 포구에 머물게 한다면 어디서 지내게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "왜관을 지어 준다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "성 밖에 왜인이 머물 집(왜관)을 지었다. 포구에 낯선 말소리가 들렸다."
   },
   "left": {
    "label": "배에서 지내게 한다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "왜인들은 장사가 끝날 때까지 배에서 지냈다. 불편하다는 말이 끊이지 않았다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CS04b",
   "after_n": 5
  },
  "real_history": "1423년(세종 5) 부산포와 제포를 열어 왜인들이 머물며 장사하게 했다. 왜인들은 성 밖 정해진 곳(왜관)에서 지내게 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '삼포'",
    "url": "https://encykorea.aks.ac.kr/Article/E0026914"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '삼포' https://encykorea.aks.ac.kr/Article/E0026914",
  "learn": "조선 전기 일본과의 관계(교린)",
  "fx": {
   "note": "남쪽 바닷가 포구에 작은 집 몇 채와 돛배가 들어선다."
  },
  "chain": "삼포를 열다"
 },
 {
  "id": "CS04b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1426",
  "conditions": [
   "seen(CS04a)"
  ],
  "conditions_text": "CS04a 5장 뒤",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "포구에 머무는 왜인이 너무 많아졌사옵니다. 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "새 포구로 나눈다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "울산 쪽 포구를 하나 더 열어 왜인들을 나누어 머물게 했다."
   },
   "left": {
    "label": "문지기를 늘린다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "포구마다 문지기를 늘렸다. 그래도 사람은 계속 늘어 결국 포구를 하나 더 열었다."
   }
  },
  "grain": "balance",
  "real_history": "거주하는 왜인이 늘자 1426년(세종 8) 염포를 더 열어 나누었다. 부산포·제포·염포를 삼포라 한다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '삼포'",
    "url": "https://encykorea.aks.ac.kr/Article/E0026914"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '삼포' https://encykorea.aks.ac.kr/Article/E0026914",
  "learn": "삼포",
  "fx": {
   "note": "바닷가 세 곳에 포구 깃발이 꽂힌다."
  },
  "chain": "삼포를 열다"
 },
 {
  "id": "CS05a",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1443",
  "conditions": [
   "seen(S08) && !seen(S09)"
  ],
  "conditions_text": "S08 뒤 반드시(바로 다음)",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "전하, 밤마다 혼자 무엇을 그리시는지 대신들이 궁금해하옵니다. 계속 조용히 하시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "조용히 이어 간다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "세종은 밤마다 등불 아래서 소리와 글자를 맞춰 보았다. 대신들은 고개를 갸웃했다."
   },
   "left": {
    "label": "학자 몇에게 알린다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "믿을 만한 학자 몇이 밤늦게 불려 와 함께 소리를 연구했다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CS05b",
   "after_n": 0
  },
  "real_history": "세종은 1443년 훈민정음을 만들었다. 신하들의 반발을 걱정해 새 글자 만드는 일을 조용히 진행했다는 설명이 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "266"
   }
  ],
  "sources_text": "지도서 266 참고 자료(1443년 창제) · [교과서 밖] 같은 자료(세종은 반발을 걱정해 비밀스럽게 추진했다는 설명 — 강문식 외)",
  "learn": "훈민정음 창제",
  "fx": {
   "note": "밤의 궁궐, 왕의 방 창호지에 ㄱ·ㄴ·ㅅ 모양 그림자가 어른거린다."
  },
  "trigger": {
   "card": "S08",
   "after_n": 0
  },
  "chain": "새 글자를 만들다"
 },
 {
  "id": "CS05b",
  "kind": "chain",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "year": "1443~1446",
  "conditions": [
   "seen(CS05a)"
  ],
  "conditions_text": "CS05a 바로 다음",
  "who": {
   "name": "성삼문",
   "doll": "official_green"
  },
  "line": "저희 젊은 학자들이 새 글자로 할 일을 찾고 있사옵니다. 무엇부터 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "책을 옮겨 쓴다",
    "effects": {
     "people": 10
    },
    "this_run": "어려운 한문 책을 새 글자로 옮기기 시작했다. 학자들의 붓끝이 바빴다."
   },
   "left": {
    "label": "소리를 연구한다",
    "effects": {
     "nobles": 10
    },
    "this_run": "학자들이 우리말 소리를 하나하나 새 글자로 적어 보았다."
   }
  },
  "grain": "gift",
  "real_history": "세종은 새 글자를 만든 뒤, 성삼문이나 신숙주 같은 집현전의 젊은 학자들과 함께 여러 사업을 이어 갔다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "266"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 266 참고 자료(성삼문·신숙주 등 젊은 학자들을 동원)",
  "learn": "훈민정음과 집현전 학자들",
  "fx": {
   "note": "집현전 창으로 새 글자들이 빛 점이 되어 날아오른다."
  },
  "chain": "새 글자를 만들다"
 },
 {
  "id": "RS01",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "세종 때",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤",
  "who": {
   "name": "궁중 악공",
   "doll": "official_red"
  },
  "line": "박연이 옛 책을 살펴 궁중 음악에 쓸 악기들을 새로 만들었사옵니다!",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "잔치에서 연주한다",
    "effects": {
     "nobles": 10
    },
    "this_run": "궁궐 잔치에 맑은 소리가 울렸다. 대신들이 눈을 감고 들었다."
   },
   "left": {
    "label": "제사에 먼저 쓴다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "종묘 제사에 새 악기 소리가 울렸다. 구경 온 백성들도 귀를 기울였다."
   }
  },
  "grain": "gift",
  "real_history": "세종은 박연 등에게 옛 책들을 참고해 아악기를 만들게 하여 궁중 음악(아악)을 바로 세웠다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "아악)",
    "url": "https://encykorea.aks.ac.kr/Article/E0029857"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '세종'(박연·아악) https://encykorea.aks.ac.kr/Article/E0029857",
  "learn": "세종 때의 음악 정비",
  "fx": {
   "note": "궁궐 마당에 돌로 만든 악기 틀이 서고 맑은 소리가 “땡—” 울린다."
  }
 },
 {
  "id": "RS02",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1443",
  "conditions": [
   "seen(S07)"
  ],
  "conditions_text": "S07 뒤",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "남쪽 바다에서 오는 왜인 배의 수를 약속으로 정하자는 말이 있사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "배 수를 정한다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "해마다 올 배의 수를 문서로 정했다. 포구가 조금 조용해졌다."
   },
   "left": {
    "label": "넉넉히 허락한다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "배를 넉넉히 오게 했다. 장사는 늘었지만 포구 관리가 바빠졌다."
   }
  },
  "grain": "balance",
  "real_history": "1443년(세종 25) 조선은 계해약조를 맺어 왜인들을 달래며 교류의 틀을 정했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '세종'(계해약조)",
    "url": "https://encykorea.aks.ac.kr/Article/E0029857"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '세종'(계해약조) https://encykorea.aks.ac.kr/Article/E0029857",
  "learn": "조선 전기 일본과의 관계",
  "fx": {
   "note": "포구 깃대에 약속 문서가 매달려 펄럭인다."
  }
 },
 {
  "id": "RS03",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1436",
  "conditions": [
   "seen(S00)"
  ],
  "conditions_text": "S00 뒤",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "집현전 학사가 열 사람뿐이라 일이 밀리옵니다. 스무 사람으로 늘려 주소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "스무 명으로 늘린다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "집현전 책상이 두 줄로 늘어났다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "열 명으로 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "열 사람이 더 바빠졌다. 등불이 새벽까지 켜졌다."
   }
  },
  "grain": "balance",
  "real_history": "집현전 학사는 처음 10명이었고, 1436년부터 20명으로 정해졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '집현전'",
    "url": "https://encykorea.aks.ac.kr/Article/E0055081"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '집현전' https://encykorea.aks.ac.kr/Article/E0055081",
  "learn": "집현전",
  "fx": {
   "note": "집현전 창마다 등불이 두 배로 켜진다."
  }
 },
 {
  "id": "RS04",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "조선 전기",
  "conditions_text": "아무 때나",
  "who": {
   "name": "성균관 대사성",
   "doll": "official_blue"
  },
  "line": "올해 성균관 자리가 다 차지 않았사옵니다. 특별 시험으로 유생을 더 받을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "특별 시험을 연다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "특별 시험에 붙은 유생들이 짐을 지고 성균관 문을 들어섰다."
   },
   "left": {
    "label": "빈자리로 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "빈 방에 먼지가 쌓였다. 유생들은 넓어서 좋다고 했다."
   }
  },
  "grain": "complex",
  "real_history": "조선 전기 성균관의 정원은 200명이었다. 정원이 차지 않으면 특별 시험으로 생원·진사가 아닌 유생도 들어갈 수 있었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 249 참고 자료(성균관과 향교)",
  "learn": "성균관",
  "fx": {
   "note": "성균관 명륜당 앞에 새 유생들이 줄지어 선다."
  }
 },
 {
  "id": "RS05",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions_text": "아무 때나",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "3년마다 여는 큰 과거(식년시) 날이 다가오옵니다. 이번엔 어디에 힘을 실을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "문과에 힘을 싣는다",
    "effects": {
     "nobles": 10,
     "army": -5
    },
    "this_run": "문과 시험장이 붓 소리로 가득했다. 서른세 명의 이름이 방에 붙었다."
   },
   "left": {
    "label": "무과에 힘을 싣는다",
    "effects": {
     "army": 10,
     "nobles": -5
    },
    "this_run": "무과 시험장에 화살이 과녁을 울렸다. 스물여덟 명이 뽑혔다."
   }
  },
  "grain": "balance",
  "real_history": "식년시는 3년에 한 번 열린 정기 과거로, 문과에서 33명, 무과에서 28명을 뽑았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 248 참고 자료(조선 시대의 과거 시험)",
  "learn": "과거 제도",
  "fx": {
   "note": "시험장 담에 합격자 이름이 적힌 종이가 붙는다."
  }
 },
 {
  "id": "RS06",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions_text": "아무 때나",
  "who": {
   "name": "예조 관리",
   "doll": "official_blue"
  },
  "line": "통역, 의학, 하늘, 법을 맡을 사람을 뽑는 시험(잡과)을 열 때가 되었사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "네 과목 다 연다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "역관·의원·천문 관리·법 관리가 될 사람들이 한꺼번에 뽑혔다."
   },
   "left": {
    "label": "역과만 연다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "통역할 사람만 뽑았다. 고을 의원 자리는 그대로 비었다."
   }
  },
  "grain": "complex",
  "real_history": "잡과는 통역(역과), 의학(의과), 천문·풍수(음양과), 법(율과)을 맡을 전문 관리를 뽑던 시험이었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 248 참고 자료(조선 시대의 과거 시험 — 잡과)",
  "learn": "중인과 잡과",
  "fx": {
   "note": "시험장 네 칸에 서로 다른 책이 놓인다."
  }
 },
 {
  "id": "RS07",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "rare",
  "year": "1434",
  "conditions": [
   "seen(SX2)"
  ],
  "conditions_text": "SX2(앙부일구) 뒤",
  "who": {
   "name": "이순지",
   "doll": "official_blue"
  },
  "line": "앙부일구 그림자로 시각뿐 아니라 절기까지 더 잘 읽게 다듬어 보겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "맡겨 본다",
    "effects": {},
    "this_run": "이순지가 해시계 앞에 붓과 자를 들고 며칠을 앉아 있었다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "지금대로 쓴다",
    "effects": {
     "people": 5
    },
    "this_run": "해시계는 지금 모습 그대로 거리에 남았다. 백성들은 그래도 고마워했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "눈금이 한결 촘촘해졌다! 절기를 읽는 법이 고을에도 알려졌다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "새로 그은 눈금이 오히려 헷갈렸다. 다시 지우는 데 품이 들었다."
   }
  },
  "real_history": "앙부일구는 1434년에 만들어 혜정교 옆과 종묘 남쪽에 두었다. 누가 만들었는지는 분명하지 않지만, 이순지가 세종의 명을 받아 참여했다는 기록이 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '앙부일구'",
    "url": "https://encykorea.aks.ac.kr/Article/E0035191"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '앙부일구' https://encykorea.aks.ac.kr/Article/E0035191 · 지도서 267 참고 자료",
  "learn": "앙부일구",
  "fx": {
   "note": "해시계 안 그림자 바늘 아래로 가는 눈금이 새로 그어진다."
  }
 },
 {
  "id": "RS08",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1442",
  "conditions": [
   "seen(SX3)"
  ],
  "conditions_text": "SX3(측우기) 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "비가 올 때마다 객사 뜰에서 측우기를 재어 올리라 하시니, 관아 일이 밀리옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "꼭 재게 한다",
    "effects": {
     "nobles": -10
    },
    "this_run": "수령들은 비만 오면 객사 뜰로 달려갔다. \"일이 늘었다\"는 투덜거림도 늘었다."
   },
   "left": {
    "label": "큰비만 재게 한다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "작은 비는 적지 않았다. 나중에 가뭄을 따질 때 빈칸이 많아 애를 먹었다."
   }
  },
  "grain": "mire",
  "real_history": "지방 고을에서도 객사 뜰에 측우기를 두고, 수령이 직접 비의 양을 재 보고하게 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 267 참고 자료(국사편찬위원회 우리역사넷 측우기)",
  "learn": "측우기와 강우량 기록",
  "fx": {
   "note": "고을 객사 마당 측우기 앞에 우산 쓴 수령 인형이 쪼그려 앉는다."
  }
 },
 {
  "id": "RS09",
  "kind": "rare",
  "stages": [
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "1429",
  "conditions": [
   "seen(S02)"
  ],
  "conditions_text": "S02 뒤",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "정초와 변효문이 각 도의 농사 보고서를 모아 《농사직설》을 엮었사옵니다. 어떻게 상을 내릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "벼슬을 높여 준다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "두 신하가 새 관복을 입고 궁궐에 들어섰다."
   },
   "left": {
    "label": "책이 퍼진 뒤 준다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "\"책이 고을에 다 퍼지면 그때\"라는 말에 두 신하는 웃으며 기다렸다."
   }
  },
  "grain": "balance",
  "real_history": "《농사직설》은 각 도의 관찰사가 경험 많은 농부들에게 물어 올린 보고서를 바탕으로 정초와 변효문이 엮었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "266~267"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 266~267 참고 자료(《농사직설》 — 관찰사에게 조사 명령, 정초·변효문 편찬)",
  "learn": "《농사직설》을 엮은 사람들",
  "fx": {
   "note": "책상 위 보고서 더미가 한 권의 책으로 묶인다."
  }
 },
 {
  "id": "LS01",
  "kind": "legend",
  "stages": [
   "sejong"
  ],
  "rarity": "legend",
  "year": "1443",
  "conditions": [
   "seen(S06) && archive_count >= 20"
  ],
  "conditions_text": "S06 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "새 글자를 만드신 일을 실록에 적사옵니다. \"전하께서 친히 만드셨다\"고 적을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그대로 적는다",
    "effects": {
     "people": 10
    },
    "this_run": "사관의 붓이 또박또박 움직였다. 이 한 줄이 먼 훗날까지 남았다."
   },
   "left": {
    "label": "학자들 공도 적는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "함께 애쓴 학자들의 이름도 나란히 적었다. 학자들이 고개를 숙였다."
   }
  },
  "grain": "gift",
  "real_history": "《세종실록》을 보면 세종의 수많은 업적 가운데 \"친히 만들었다(친제)\"고 적은 것은 훈민정음뿐이라는 설명이 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "266"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 266 참고 자료(강문식 외, 《15세기 조선의 때 이른 절정》)",
  "learn": "훈민정음은 세종이 직접 만듦",
  "fx": {
   "note": "사관이 붓을 멈추고, 두루마리 위 \"親製\" 두 글자가 금빛으로 빛난다."
  }
 },
 {
  "id": "LS02",
  "kind": "legend",
  "stages": [
   "sejong"
  ],
  "rarity": "legend",
  "year": "1445",
  "conditions": [
   "seen(S08) && archive_count >= 20"
  ],
  "conditions_text": "S08 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "새 글자로 나라를 세운 조상들의 이야기를 노래로 엮었사옵니다. 어떻게 널리 알릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "잔치에서 부른다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "궁궐 잔치에서 새 글자로 쓴 노래가 처음 울려 퍼졌다."
   },
   "left": {
    "label": "책으로 찍어 나눈다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "노래책이 고을마다 한 권씩 보내졌다."
   }
  },
  "grain": "complex",
  "real_history": "1445년(세종 27) 훈민정음으로 쓴 노래책 《용비어천가》를 엮었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "268"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '세종'(세종 27년 편찬)",
    "url": "https://encykorea.aks.ac.kr/Article/E0029857"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 268 활동지(훈민정음으로 쓴 책인 《용비어천가》) · 한국민족문화대백과사전 '세종'(세종 27년 편찬) https://encykorea.aks.ac.kr/Article/E0029857",
  "learn": "《용비어천가》",
  "fx": {
   "note": "하늘에 새 글자로 된 노랫말이 물결처럼 흘러간다."
  }
 }
]);
})();
