/* 집필 세션의 add_G.py에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "DG101",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(G04)"
  ],
  "conditions_text": "G04 앞(개항 전)",
  "who": {
   "name": "이조 관리",
   "doll": "official_green"
  },
  "line": "힘센 집안에 돈을 바치고 수령 자리를 얻으려는 사람이 줄을 섰다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "벼슬 장사를 막는다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "돈을 받고 벼슬을 주던 관리 몇이 쫓겨났다. 힘센 집안이 얼굴을 찌푸렸다."
   },
   "left": {
    "label": "모른 척한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "모른 척했다. 돈을 내고 수령이 된 사람은 고을에서 그 돈을 다시 걷었다."
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
  "sources_text": "지도서 300(교과서 102) 조선의 개항(세도 정치 — 왕실과 혼인한 집안이 권력을 휘두름) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "세도 정치",
  "fx": {
   "note": "관아 앞에 돈 꾸러미를 든 인형들이 줄을 선다."
  }
 },
 {
  "id": "DG102",
  "kind": "daily",
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
   "doll": "general"
  },
  "line": "서양 배에서 물건을 사고팔자는 글을 보내왔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "정중히 거절한다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "\"나라의 뜻이 아니다\"라는 답이 배로 보내졌다. 배는 한동안 바다에 머물렀다."
   },
   "left": {
    "label": "의논을 미룬다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "답을 미루고 대신들이 여러 날 의논했다."
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
  "sources_text": "지도서 300(교과서 102) 조선의 개항(서양 여러 나라가 통상을 요구함)",
  "learn": "통상 요구",
  "fx": {
   "note": "수평선의 낯선 배에서 작은 배가 편지를 싣고 온다."
  }
 },
 {
  "id": "DG103",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(G04)"
  ],
  "conditions_text": "G04 앞(개항 전)",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "바닷가 포대를 더 높이 쌓자는 말이 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "포대를 높인다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "바닷가 언덕마다 포대가 높아졌다. 돌 나르는 일꾼이 바빴다."
   },
   "left": {
    "label": "있는 대로 지킨다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "\"있는 포대로 지키자\"는 말에 공사는 미뤄졌다."
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
  "sources_text": "지도서 300(교과서 102) 조선의 개항(프랑스와 미국이 조선을 침략) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "나라를 지키는 준비",
  "fx": {
   "note": "바닷가 언덕에 돌 포대가 쌓인다."
  }
 },
 {
  "id": "DG104",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(G04)"
  ],
  "conditions_text": "G04 앞(개항 전)",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "서양 물건을 몰래 들여와 파는 사람이 있다 하옵니다. 사 보시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사서 살펴본다",
    "effects": {},
    "this_run": "상인이 보자기를 풀자 낯선 물건들이 나왔다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "nobles": 5
    },
    "this_run": "\"나라에서 막은 물건\"이라며 돌려보냈다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "석유등이었다! 학자들이 불빛을 보며 밤새 이야기했다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "값만 비싸고 쓸 줄 모르는 물건이었다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "300",
    "tb": "102"
   }
  ],
  "sources_text": "지도서 300(교과서 102) 조선의 개항(통상 거부) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "통상을 거부하던 때",
  "fx": {
   "note": "보자기 위에 낯선 물건들이 반짝인다."
  }
 },
 {
  "id": "DG105",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(G04)"
  ],
  "conditions_text": "G04 앞(개항 전)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "세금 걷는 관리들이 정해진 것보다 더 걷어 농민들이 울상이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "돌려주게 한다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "더 걷은 세금을 돌려주라는 명이 내려갔다. 곳간이 조금 줄었다."
   },
   "left": {
    "label": "타이르기만 한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "관리를 타이르기만 했다. 농민들 한숨은 그대로였다."
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
  "sources_text": "지도서 300(교과서 102) 조선의 개항(관리의 횡포, 농민의 세금 부담)",
  "learn": "개항 전 조선 사회의 문제",
  "fx": {
   "note": "관아 앞에서 농민 인형들이 세금 자루를 내려놓는다."
  }
 },
 {
  "id": "DG106",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "일본 배가 우리 바닷가를 재고 다니며 지도를 그리고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "항의 문서를 보낸다",
    "effects": {
     "army": -5,
     "nobles": -5
    },
    "this_run": "항의 문서를 보냈지만, 조약에 적힌 일이라며 측량은 계속되었다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "army": -10
    },
    "this_run": "그대로 두었다. 바닷가 사람들은 불안해했다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(제7관 — 일본인이 조선 해안을 자유롭게 측량)",
  "learn": "강화도 조약의 불평등한 조항",
  "fx": {
   "note": "바닷가 바위 위에 낯선 사람 인형이 막대를 세운다."
  }
 },
 {
  "id": "DG107",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "개항장 관리",
   "doll": "official_red"
  },
  "line": "개항장에서 일본 사람이 잘못을 저질렀는데 우리 법으로 다스릴 수 없다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "억울함을 알린다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "억울함을 적은 문서를 보냈지만 일본 관리가 따로 재판했다."
   },
   "left": {
    "label": "그대로 넘긴다",
    "effects": {
     "people": -10
    },
    "this_run": "그대로 넘어갔다. 억울한 사람들이 관아 앞에서 한숨을 쉬었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(제10관 — 죄지은 일본인은 일본 관리가 심판)",
  "learn": "강화도 조약의 불평등한 조항",
  "fx": {
   "note": "개항장 관아 앞에 사람 인형들이 모여 선다."
  }
 },
 {
  "id": "DG108",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "개항장 관리",
   "doll": "official_red"
  },
  "line": "부산 말고도 항구 두 곳을 더 열게 되었사옵니다. 어디부터 꾸릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "창고부터 짓는다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "새 항구에 창고와 부두가 들어섰다. 세관 장부가 바빠졌다."
   },
   "left": {
    "label": "군사부터 둔다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "항구 둘레에 군사를 먼저 두었다. 장사는 천천히 시작했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(제4관 — 부산 외 두 곳의 항구를 엶)",
  "learn": "개항",
  "fx": {
   "note": "바닷가에 새 부두가 하나 더 놓인다."
  }
 },
 {
  "id": "DG109",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "외국 상인들이 곡식을 많이 사 가서 고을 쌀값이 오르고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곡식을 막는다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "곡식을 고을 밖으로 못 내가게 잠시 막았다. 상인들이 항의했다."
   },
   "left": {
    "label": "팔게 둔다",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "this_run": "쌀을 팔아 곳간은 찼지만, 장터 쌀값이 크게 올랐다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(개항 뒤 통상) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "개항 뒤의 변화",
  "fx": {
   "note": "포구에 쌀가마를 실은 배가 줄지어 떠난다."
  }
 },
 {
  "id": "DG110",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "역관",
   "doll": "jungin"
  },
  "line": "개항장에 외국 말을 하는 사람이 모자라 장사마다 말이 엇갈리옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "역관을 보낸다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "역관 몇이 개항장으로 내려가 말을 이어 주었다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "상인들에게 맡긴다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "상인들이 손짓 발짓으로 장사했다. 다툼이 잦았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(서양 여러 나라와도 조약을 맺음) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "개항과 교류",
  "fx": {
   "note": "개항장 창고 앞에서 역관 인형이 양쪽 말을 잇는다."
  }
 },
 {
  "id": "DG111",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤(개항 뒤 — 문을 끝내 닫은 생은 빼고)",
  "who": {
   "name": "베 짜는 아낙",
   "doll": "courtlady"
  },
  "line": "값싼 서양 옷감이 들어와 우리 베가 팔리지 않사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "베를 사 준다",
    "effects": {
     "treasury": -5,
     "people": -5
    },
    "this_run": "나라에서 베를 조금 사 주었다. 그래도 베틀 소리는 줄었다."
   },
   "left": {
    "label": "우리 베를 권한다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "양반 집안에 우리 베를 입으라 권했지만 따르는 집이 적었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 의식주 생활의 변화(서양식 옷을 입는 사람이 나타남) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "개항 뒤의 생활 변화",
  "fx": {
   "note": "초가 마루의 베틀이 멈춰 있다."
  }
 },
 {
  "id": "DG112",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "전화를 잇는 관리",
   "doll": "official_green"
  },
  "line": "전화 교환원이 모자라 말을 잇느라 진땀을 빼고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "교환원을 뽑는다",
    "effects": {
     "treasury": -5,
     "nobles": 5
    },
    "this_run": "교환원을 더 뽑아 가르쳤다. 전화 잇는 소리가 빨라졌다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "있는 사람으로 한다",
    "effects": {
     "nobles": -5,
     "treasury": 5
    },
    "this_run": "있는 사람으로 버텼다. 전화가 자주 끊겼다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 의식주 생활의 변화(자료 해설 — 전화 교환원)",
  "learn": "전화",
  "fx": {
   "note": "관청 책상 앞에 교환원 인형이 줄을 꽂는다."
  }
 },
 {
  "id": "DG113",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "큰길에 가로등을 세우면 밤에도 다니기 편할 것이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "가로등을 세운다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "큰길에 가로등이 줄지어 섰다. 밤 장터가 북적였다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "다음 해로 미룬다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "가로등은 다음 해로 미뤘다. 밤길은 여전히 어두웠다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(가로등 — 밤에도 다니기 편해짐)",
  "learn": "근대 시설",
  "fx": {
   "note": "한성 큰길에 등불 기둥이 하나둘 켜진다."
  }
 },
 {
  "id": "DG114",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "편지 배달부",
   "doll": "farmer"
  },
  "line": "먼 고을까지 편지를 나르려면 배달부가 더 있어야 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배달부를 늘린다",
    "effects": {
     "people": 10
    },
    "this_run": "배달부들이 가방을 메고 고을마다 편지를 날랐다."
   },
   "left": {
    "label": "편지 값을 받는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "편지 값을 조금 올려 받아 곳간을 채웠다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(우편 제도가 시행됨)",
  "learn": "우편 제도",
  "fx": {
   "note": "고갯길 위로 가방 멘 배달부 인형이 걸어간다."
  }
 },
 {
  "id": "DG115",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "병원 의사",
   "doll": "official_green"
  },
  "line": "서양식 병원에서 진찰받으려는 사람들이 문밖까지 줄을 섰사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "진찰실을 늘린다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "진찰실을 하나 더 열었다. 줄이 조금 줄었다."
   },
   "left": {
    "label": "사람 수를 정한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "하루에 볼 사람 수를 정했다. 늦게 온 사람들은 돌아갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(서양 의학 — 서양식 병원)",
  "learn": "서양식 병원",
  "fx": {
   "note": "병원 앞에 사람 인형들이 길게 줄을 선다."
  }
 },
 {
  "id": "DG116",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "큰길에 서양식 벽돌 건물이 늘어 한옥 사이에서 눈에 띄옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "세금을 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "서양식 건물에 가게가 들어서 세금이 늘었다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "구경하게 둔다",
    "effects": {
     "people": 10
    },
    "this_run": "건물 앞에 구경꾼이 모여 길이 북적였다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 의식주 생활의 변화(도시에 서양식 건축물이 세워짐)",
  "learn": "의식주의 변화",
  "fx": {
   "note": "한옥 지붕 사이로 벽돌 건물이 하나 솟는다."
  }
 },
 {
  "id": "DG117",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "마을 어른",
   "doll": "official_green"
  },
  "line": "근대 시설은 한성 부자들만 누리고, 시골 사람들은 구경도 못 한다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시골에도 보여 준다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "시골 장터에도 전깃불 구경 날을 열었다. 한성 부자들은 시큰둥했다."
   },
   "left": {
    "label": "한성부터 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "\"한성부터 차례로\"라는 말에 시골 사람들은 한숨을 쉬었다."
   }
  },
  "grain": "complex",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "311"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 311 지도상의 유의점(경제적 격차로 근대 문물을 누리지 못한 사람도 있었음)",
  "learn": "근대 문물의 그늘",
  "fx": {
   "note": "시골 장터에 사람 인형들이 모여 먼 불빛을 바라본다."
  }
 },
 {
  "id": "DG118",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G09)"
  ],
  "conditions_text": "G09 뒤(《독립신문》 뒤)",
  "who": {
   "name": "전차 운전수",
   "doll": "official_red"
  },
  "line": "전차 선로를 건너다 넘어질 뻔한 사람이 많사옵니다. 표지판을 세울까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "표지판을 세운다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "선로 옆에 표지판과 건널목 지기가 섰다."
   },
   "left": {
    "label": "방만 붙인다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "\"조심하라\"는 방만 붙였다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(전차와 기차가 운행 — 새 시설의 문제점도 생김)",
  "learn": "근대 시설과 안전",
  "fx": {
   "note": "선로 옆에 작은 표지판이 선다."
  },
  "caution": "다치는 장면은 쓰지 않는다."
 },
 {
  "id": "DG119",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "학부 관리",
   "doll": "official_red"
  },
  "line": "새 학교에서 가르칠 선생이 모자라옵니다. 선생을 기르는 학교를 세울까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "선생 학교를 세운다",
    "effects": {
     "treasury": -5
    },
    "this_run": "선생을 기르는 학교에 첫 학생들이 들어왔다."
   },
   "left": {
    "label": "있는 선생으로 한다",
    "effects": {
     "treasury": 5
    },
    "this_run": "있는 선생들로 버텼다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DG119f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(근대 학문을 가르치는 학교) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "근대 교육",
  "fx": {
   "note": "벽돌 학교 창가에 책을 든 인형들이 앉는다."
  }
 },
 {
  "id": "DG119f",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "who": {
   "name": "학부 관리",
   "doll": "official_red"
  },
  "line": "그때 기른 선생들이 고을마다 새 학교를 열었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을 학교를 돕는다",
    "effects": {
     "people": 15
    },
    "this_run": "고을 학교 마당마다 아이들 웃음소리가 났다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "모두 다니게 한다",
    "effects": {
     "nobles": 10
    },
    "this_run": "양반 집안 아이들도 새 학교에 다니기 시작했다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(근대 학문을 가르치는 학교)",
  "learn": "기른 사람의 열매",
  "fx": {
   "note": "섬 곳곳에 작은 학교 지붕이 솟는다."
  }
 },
 {
  "id": "DG120",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G07) && !flag(F_개혁없음)"
  ],
  "conditions_text": "G07 뒤(갑오개혁 뒤 — 옛 제도를 지킨 생은 빼고)",
  "who": {
   "name": "시골 선비",
   "doll": "yangban"
  },
  "line": "과거가 없어져 평생 하던 공부가 쓸모없게 되었다며 선비들이 낙심하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 학교에 모신다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "선비들을 새 학교 선생으로 모셨다. 선비들이 서양 책도 펴 보았다."
   },
   "left": {
    "label": "새로 배우게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "\"새 세상에 맞게 배우라\"는 말만 내려갔다. 선비들은 서운해했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "305"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(갑오개혁) · 지도서 305(과거제 폐지)",
  "learn": "갑오개혁",
  "fx": {
   "note": "선비 인형이 갓을 쓴 채 학교 마당에 선다."
  }
 },
 {
  "id": "DG121",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G07) && !flag(F_개혁없음)"
  ],
  "conditions_text": "G07 뒤(갑오개혁 뒤 — 옛 제도를 지킨 생은 빼고)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "남편을 잃은 여인이 다시 혼인하려 하자 집안 어른들이 반대하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "법대로 허락한다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "\"이제 법이 허락한다\"는 말에 혼례가 치러졌다."
   },
   "left": {
    "label": "집안 뜻을 따른다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "집안 어른들 뜻대로 혼례는 미뤄졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "305"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(갑오개혁) · 지도서 305(재혼 허락)",
  "learn": "갑오개혁과 여성",
  "fx": {
   "note": "초가 마당에 작은 혼례상이 차려진다."
  }
 },
 {
  "id": "DG122",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G07) && !flag(F_개혁없음)"
  ],
  "conditions_text": "G07 뒤(갑오개혁 뒤 — 옛 제도를 지킨 생은 빼고)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "정해진 세금 말고 잡다한 세금을 걷지 말라는 명을 고을마다 알릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을마다 알린다",
    "effects": {
     "people": 10
    },
    "this_run": "관아 앞에 방이 붙었다. 농민들이 방 앞에서 손뼉을 쳤다."
   },
   "left": {
    "label": "장부부터 고친다",
    "effects": {
     "people": 5,
     "treasury": 5
    },
    "this_run": "잡세를 줄이고, 줄인 만큼 장부를 바로잡았다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(동학 농민군 개혁안 — 잡다한 세금을 없앰 · 갑오개혁 세금 제도 개혁)",
  "learn": "세금 개혁",
  "fx": {
   "note": "관아 앞에 방이 붙고 농민 인형들이 모인다."
  }
 },
 {
  "id": "DG123",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G08)"
  ],
  "conditions_text": "G08 뒤(단발령)",
  "who": {
   "name": "나이 든 선비",
   "doll": "yangban"
  },
  "line": "상투를 자르라는 명에 \"부모가 주신 머리\"라며 문을 걸어 잠갔사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "천천히 설득한다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "관리가 찾아가 천천히 설득했다. 선비는 끝내 문을 열지 않았다."
   },
   "left": {
    "label": "억지로 자르게 한다",
    "effects": {
     "people": -5,
     "nobles": -5
    },
    "this_run": "억지로 자르게 하자 마을이 시끄러워졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '단발령'",
    "url": "https://encykorea.aks.ac.kr/Article/E0013579"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '단발령' https://encykorea.aks.ac.kr/Article/E0013579 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "단발령에 대한 반발",
  "fx": {
   "note": "초가 대문이 닫히고, 마당에 갓 쓴 인형 하나가 서 있다."
  }
 },
 {
  "id": "DG124",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G07) && !flag(F_개혁없음)"
  ],
  "conditions_text": "G07 뒤(갑오개혁 뒤 — 옛 제도를 지킨 생은 빼고)",
  "who": {
   "name": "천민이었던 사람",
   "doll": "farmer"
  },
  "line": "신분 차별이 없어졌으니, 저희 아이도 새 학교에 보내고 싶사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "입학을 돕는다",
    "effects": {
     "people": 10
    },
    "this_run": "아이가 새 학교 맨 앞자리에 앉았다."
   },
   "left": {
    "label": "마을이 함께 돕는다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "학교에 다닐 옷과 책을 마을에서 함께 마련해 주었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(신분 제도 폐지) · 지도서 310(교과서 106) 서양 근대 문물의 도입(근대 학교)",
  "learn": "신분제 폐지",
  "fx": {
   "note": "학교 마당에 새로 온 아이 인형이 선다."
  }
 },
 {
  "id": "DG125",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G09)"
  ],
  "conditions_text": "G09 뒤(《독립신문》 뒤)",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "한글 신문을 읽으려고 글을 배우러 오는 어른들이 늘었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "밤 공부를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "밤마다 서당에 어른들 글 읽는 소리가 났다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "장터에서 읽어 준다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "훈장이 장터에 나가 신문을 소리 내어 읽어 주었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 독립 협회와 대한 제국(《독립신문》 — 한글 신문)",
  "learn": "한글 신문",
  "fx": {
   "note": "서당 등불 아래 어른 인형들이 신문을 펼친다."
  }
 },
 {
  "id": "DG126",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G09)"
  ],
  "conditions_text": "G09 뒤(《독립신문》 뒤)",
  "who": {
   "name": "장터 사람들",
   "doll": "official_red"
  },
  "line": "장터에서도 나랏일을 두고 연설하는 모임을 열겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "모임을 열게 한다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "장터 한가운데 연설 자리가 생겼다. 대신들은 걱정스러운 눈치였다."
   },
   "left": {
    "label": "날을 정해 준다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "모임은 정해진 날에만 열게 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 독립 협회와 대한 제국(만민 공동회)",
  "learn": "백성의 목소리",
  "fx": {
   "note": "장터 단 위에 한 사람이 서고 사람 인형들이 둘러선다."
  }
 },
 {
  "id": "DG127",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "군부 관리",
   "doll": "official_blue"
  },
  "line": "새 군대 군사들에게 서양식 군복을 입히려 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군복을 바꾼다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "서양식 군복을 입은 군사들이 줄을 맞춰 걸었다."
   },
   "left": {
    "label": "훈련만 바꾼다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "군복은 그대로 두고 훈련만 바꾸었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 의식주 생활의 변화(서양식 옷) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "근대 군대",
  "fx": {
   "note": "훈련장에 같은 옷을 입은 군사 인형들이 줄을 선다."
  }
 },
 {
  "id": "DG128",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G10)"
  ],
  "conditions_text": "G10 뒤(대한 제국)",
  "who": {
   "name": "공장 주인",
   "doll": "official_blue"
  },
  "line": "기계로 실을 뽑는 작은 공장을 세우려 하옵니다. 도와주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공장을 돕는다",
    "effects": {},
    "this_run": "공장에 기계가 들어오고 굴뚝에서 연기가 올랐다."
   },
   "left": {
    "label": "손으로 뽑는다",
    "effects": {
     "treasury": 5
    },
    "this_run": "공장은 미루고 손으로 실을 뽑았다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "기계 실이 장터에서 불티나게 팔렸다! 공장이 하나 더 섰다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "기계가 자주 멈춰 고치는 값만 들었다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 독립 협회와 대한 제국(대한 제국 — 공장과 회사 설립을 도움) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "근대 산업",
  "fx": {
   "note": "마을 끝에 굴뚝 달린 작은 벽돌 공장이 선다."
  }
 },
 {
  "id": "DG129",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G05)"
  ],
  "conditions_text": "G05 뒤(근대 시설이 들어온 뒤)",
  "who": {
   "name": "사진관 주인",
   "doll": "official_blue"
  },
  "line": "가족사진을 찍으려는 사람들이 사진관 앞에 줄을 섰사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "그대로 찍게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "사진관 앞에서 가족들이 옷매무새를 고쳤다."
   },
   "left": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "사진 값을 받아 장세를 걷었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 의식주 생활의 변화(개항 뒤 달라진 생활) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "근대 생활",
  "fx": {
   "note": "사진관 앞에 가족 인형들이 나란히 선다."
  }
 },
 {
  "id": "DG130",
  "kind": "daily",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "conditions": [
   "seen(G09)"
  ],
  "conditions_text": "G09 뒤(《독립신문》 뒤)",
  "who": {
   "name": "전차 운전수",
   "doll": "official_red"
  },
  "line": "전차 표를 사려는 사람들이 많아 정거장이 북새통이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "창구를 더 연다",
    "effects": {},
    "this_run": "표 파는 창구를 하나 더 열어 보았다."
   },
   "left": {
    "label": "줄을 세운다",
    "effects": {
     "treasury": 5
    },
    "this_run": "줄을 서게 하고 그대로 두었다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "people": 15
    },
    "this_run": "줄이 금세 줄었다! 사람들이 신나게 전차에 올랐다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "창구 일꾼 품삯만 들고 표는 그대로 모자랐다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양 근대 문물의 도입(전차 운행)",
  "learn": "전차",
  "fx": {
   "note": "정거장 앞에 사람 인형들이 길게 줄을 선다."
  }
 },
 {
  "id": "CG01a",
  "kind": "chain",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "year": "1893~1894",
  "conditions": [
   "seen(G05) && !seen(G06)"
  ],
  "conditions_text": "G05 뒤, G06 앞",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "농민들이 사발을 엎어 그린 동그라미 둘레에 이름을 적은 글을 돌린다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "무슨 뜻인지 알아본다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "관리가 마을을 돌며 농민들의 하소연을 들었다."
   },
   "left": {
    "label": "글을 거두게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "포졸들이 글을 거두러 다녔지만, 글은 이미 이웃 고을로 퍼졌다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CG01b",
   "after_n": 3
  },
  "real_history": "사발통문은 봉기를 이끈 사람이 누구인지 알 수 없도록, 사발을 엎어 원을 그리고 그 둘레에 참여한 사람들의 이름을 둥글게 써넣은 알림글이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(사발통문)",
  "learn": "동학 농민 운동",
  "fx": {
   "note": "종이 위에 둥근 원과 이름들이 바람에 날려 마을마다 내려앉는다."
  },
  "chain": "사발통문과 개혁안"
 },
 {
  "id": "CG01b",
  "kind": "chain",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "year": "1894",
  "conditions": [
   "seen(CG01a)"
  ],
  "conditions_text": "CG01a 3장 뒤",
  "who": {
   "name": "동학 농민 대표",
   "doll": "farmer"
  },
  "line": "저희가 바라는 일을 적었사옵니다. 못된 관리를 벌하고, 노비 문서를 불태우고, 잡다한 세금을 없애 주소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "개혁안을 받아 본다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "개혁안이 조정에 올라갔다. 대신들이 술렁였다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "this_run": "개혁안은 돌아갔다. 고을마다 한숨이 깊어졌다."
   }
  },
  "grain": "balance",
  "real_history": "동학 농민군은 탐관오리와 못된 양반을 벌하고, 노비 문서를 불태우고, 정해진 것 말고 잡다한 세금을 없애며, 여성의 재혼을 허용하라는 등의 개혁안을 주장했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 나라를 개혁하려는 노력(동학 농민군의 개혁안 — 《동학사》)",
  "learn": "동학 농민군의 개혁안",
  "fx": {
   "note": "관아 마당에 개혁안 두루마리가 펼쳐진다."
  },
  "chain": "사발통문과 개혁안"
 },
 {
  "id": "RG01",
  "kind": "rare",
  "stages": [
   "gojong"
  ],
  "rarity": "uncommon",
  "year": "1880년대",
  "conditions": [
   "seen(G04) && !flag(F_문닫음)"
  ],
  "conditions_text": "G04 뒤",
  "who": {
   "name": "외교를 맡은 관리",
   "doll": "official_red"
  },
  "line": "서양 여러 나라에서도 조약을 맺자는 사신이 왔사옵니다. 만나 보시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "조약을 의논한다",
    "effects": {
     "nobles": -5,
     "treasury": 10
    },
    "this_run": "사신과 마주 앉아 조약 글을 한 줄씩 읽었다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "천천히 맺는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "\"한 나라씩 천천히\"라는 답이 사신에게 전해졌다."
   }
  },
  "grain": "balance",
  "real_history": "강화도 조약 뒤 조선은 서양 여러 나라와도 조약을 맺으며 개화 정책을 펼쳤다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약",
  "learn": "개화 정책",
  "fx": {
   "note": "포구에 여러 나라 깃발을 단 배가 들어온다."
  }
 },
 {
  "id": "RG02",
  "kind": "rare",
  "stages": [
   "gojong"
  ],
  "rarity": "uncommon",
  "year": "1899",
  "conditions": [
   "seen(G10)"
  ],
  "conditions_text": "G10 뒤",
  "who": {
   "name": "공부 관리",
   "doll": "official_blue"
  },
  "line": "일본 회사가 한성과 인천을 잇는 철도를 놓겠다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "놓게 한다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "들판을 가로질러 침목과 선로가 깔리기 시작했다.",
    "device": {
     "open": 1
    }
   },
   "left": {
    "label": "조건을 따져 본다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "대신들이 조건을 하나하나 따지느라 공사가 늦어졌다."
   }
  },
  "grain": "balance",
  "real_history": "우리나라 최초의 철도인 경인선은 일본 회사가 놓았다. 교과서는 이것이 조선을 위한 것이었는지 생각해 보게 한다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "311"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 311 발문(일본 회사가 우리나라 최초의 철도를 놓음)",
  "learn": "철도와 개항 뒤의 변화",
  "fx": {
   "note": "남서쪽 들판에 침목이 한 줄로 놓인다."
  }
 },
 {
  "id": "LG01",
  "kind": "legend",
  "stages": [
   "gojong"
  ],
  "rarity": "legend",
  "year": "1876",
  "conditions": [
   "seen(G04) && archive_count >= 20"
  ],
  "conditions_text": "G04 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "문을 열자는 신하와 문을 지키자는 신하의 말을 실록에 적사옵니다. 어느 쪽을 더 크게 적을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "똑같이 적는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "두 쪽의 말이 같은 크기 글씨로 나란히 적혔다."
   },
   "left": {
    "label": "백성의 말도 적는다",
    "effects": {
     "people": 10
    },
    "this_run": "그날 포구 사람들이 나눈 이야기도 함께 적혔다."
   }
  },
  "grain": "gift",
  "real_history": "개항을 반대했던 사람들을 지금의 눈으로 잘못 판단했다고 보는 것은 알맞지 않다. 그때의 상황을 역사적 사실로 이해해야 한다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "301"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 301 지도상의 유의점",
  "learn": "역사를 보는 눈",
  "fx": {
   "note": "사관의 두루마리에 두 줄의 글씨가 나란히 금빛으로 떠오른다."
  }
 },
 {
  "id": "LG02",
  "kind": "legend",
  "stages": [
   "gojong"
  ],
  "rarity": "legend",
  "year": "1899",
  "conditions": [
   "seen(G11) && archive_count >= 20"
  ],
  "conditions_text": "G11 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "오늘 동대문 앞에 사람들이 구름처럼 모여 처음 달리는 전차를 보았사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그날을 크게 적는다",
    "effects": {
     "people": 10,
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "구경꾼들의 웃음과 땡땡 소리까지 실록에 적혔다."
   },
   "left": {
    "label": "짧게 적는다",
    "effects": {
     "nobles": 5,
     "treasury": 5
    },
    "this_run": "\"전차가 처음 달렸다\" 한 줄이 적혔다."
   }
  },
  "grain": "complex",
  "real_history": "1899년 동대문 앞에서 전차 개통식이 열려 많은 사람이 모여 구경했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "281",
    "tb": "93"
   }
  ],
  "sources_text": "지도서 281(교과서 93 사진: 1899 전차 개통식)",
  "learn": "근대 문물의 도입",
  "fx": {
   "note": "밤의 한성, 흥인지문 옆으로 불 켠 전차가 땡땡 지나간다."
  }
 }
]);
})();
