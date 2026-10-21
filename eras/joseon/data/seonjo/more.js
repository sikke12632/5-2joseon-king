/* 집필 세션의 add_J.py에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "DJ101",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "큰 전쟁이 없은 지 오래라 군사 훈련을 하는 날이 자꾸 미뤄지옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "훈련을 다시 한다",
    "effects": {
     "army": 10,
     "people": -5
    },
    "this_run": "훈련장에 북소리가 다시 울렸다. 농사철에 불려 나온 장정들은 투덜댔다."
   },
   "left": {
    "label": "가을 뒤로 미룬다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "훈련 날을 가을걷이 뒤로 미뤘다. 활터 과녁에 거미줄이 쳐졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(평화가 이어져 국방에 소홀해짐)",
  "learn": "오랜 평화와 국방",
  "fx": {
   "note": "빈 훈련장에 북이 놓여 있다. 고르면 장정 인형들이 줄을 선다."
  }
 },
 {
  "id": "DJ102",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "향교 교관",
   "doll": "official_blue"
  },
  "line": "고을 향교에 배우러 오는 유생이 늘어 명륜당이 비좁사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "강당을 덧짓는다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "명륜당 옆에 강당 한 칸을 덧지었다. 글 읽는 소리가 담장 밖까지 들렸다."
   },
   "left": {
    "label": "있는 대로 쓴다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "유생들은 마루 끝까지 붙어 앉았다. 늦게 온 유생은 툇마루에서 들었다."
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
  "sources_text": "지도서 245(교과서 81) 서당·향교·서원·성균관 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "향교에서 유교를 배움",
  "fx": {
   "note": "향교 마당에 갓 쓴 유생 인형들이 북적인다."
  }
 },
 {
  "id": "DJ103",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "서원 유생",
   "doll": "yusaeng"
  },
  "line": "고을 선비들이 서원에 모여 함께 책을 읽고 토론하옵니다. 책을 보내 주실 수 있사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "책 상자를 보낸다",
    "effects": {
     "nobles": 10
    },
    "this_run": "책 상자가 서원에 닿았다. 유생들이 상자 앞에 둘러앉아 첫 장을 넘겼다."
   },
   "left": {
    "label": "아이들도 읽게 한다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "책은 서원에 두되, 마을 아이들도 와서 읽게 했다."
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
  "sources_text": "지도서 245(교과서 81) 서당·향교·서원·성균관(향교나 서원에 들어가 과거 시험을 위해 공부) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "서원",
  "fx": {
   "note": "서원 처마 아래 등불이 늦게까지 켜진다."
  }
 },
 {
  "id": "DJ104",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "서당 아이들이 《천자문》을 다 떼었사옵니다. 작은 잔치를 열어도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "떡을 내려 준다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "아이들이 떡을 한 접시씩 받아 들고 훈장님께 절을 했다."
   },
   "left": {
    "label": "마을 잔치로 한다",
    "effects": {
     "people": 10
    },
    "this_run": "마을 어른들이 떡시루를 들고 와 서당 마당이 잔칫집이 되었다."
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
  "sources_text": "지도서 245(교과서 81) 서당·향교·서원·성균관(서당에서 《천자문》으로 한자를 배움) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "서당 공부",
  "fx": {
   "note": "서당 마당에 떡시루 김이 오르고 아이 인형들이 깡충깡충."
  }
 },
 {
  "id": "DJ105",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "성벽 돌 몇 곳이 헐거워졌사옵니다. 지금 고칠까요, 나중에 한꺼번에 고칠까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "지금 고친다",
    "effects": {
     "treasury": -5
    },
    "this_run": "석수들이 헐거운 돌을 빼고 새 돌을 끼웠다. 일은 한 달이 걸렸다."
   },
   "left": {
    "label": "나중에 고친다",
    "effects": {
     "treasury": 5
    },
    "this_run": "헐거운 돌에 붉은 줄만 그어 두었다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DJ105f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(평화가 이어져 국방에 소홀해짐) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "미리 준비하는 일",
  "fx": {
   "note": "성벽 한쪽에 석수 인형들이 돌을 나른다."
  }
 },
 {
  "id": "DJ105f",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "그때 고쳐 둔 성벽 덕에, 큰비에도 도성 성벽이 끄떡없었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 칭찬한다",
    "effects": {
     "army": 15
    },
    "this_run": "성벽 위에 선 군사들이 고친 돌을 손바닥으로 두드리며 웃었다."
   },
   "left": {
    "label": "마을에 알린다",
    "effects": {
     "people": 10
    },
    "this_run": "성벽 아래 마을 사람들이 무너질 걱정 없이 잠을 잤다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "미리 준비한 열매",
  "fx": {
   "note": "고친 성벽 돌이 금빛으로 한 번 반짝인다."
  }
 },
 {
  "id": "DJ106",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "바다 건너 왜인과의 장사가 줄어 포구 장터가 한산하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "작은 장을 연다",
    "effects": {
     "treasury": -5,
     "people": -5
    },
    "this_run": "포구에 작은 장을 따로 열었지만 손님은 드문드문했다."
   },
   "left": {
    "label": "군사를 장터에 둔다",
    "effects": {
     "army": -5,
     "nobles": -5
    },
    "this_run": "포구 군사를 장터 지키는 데 돌리고, 관리들 몫의 비단을 내다 팔았다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "장사와 이웃 나라",
  "fx": {
   "note": "포구 장터 천막 몇 개가 바람에 펄럭인다."
  }
 },
 {
  "id": "DJ107",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "사신을 맞는 관리",
   "doll": "official_blue"
  },
  "line": "바다 건너 소식을 알아보려면 사람을 보내야 하옵니다. 이번엔 누구를 보낼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사람을 보낸다",
    "effects": {},
    "this_run": "말 잘하는 관리 둘이 짐을 꾸려 포구로 떠났다."
   },
   "left": {
    "label": "소문만 모은다",
    "effects": {
     "treasury": 5
    },
    "this_run": "사람을 보내지 않고 포구 상인들에게 소문만 모아 오게 했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "돌아온 관리가 바다 건너 군사들이 크게 늘었다고 알렸다! 성마다 활과 화살을 챙겼다."
   },
   "lose": {
    "effects": {
     "nobles": -10
    },
    "this_run": "돌아온 관리 둘의 말이 서로 달랐다. 대신들이 두 편으로 갈려 다투었다."
   }
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(황윤길·김성일을 통신사로 보냄 — 두 보고가 달랐음) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "이웃 나라 소식을 알아보는 일",
  "fx": {
   "note": "포구에서 돛배 한 척이 떠난다. 돌아올 때 깃발 색이 결과를 알려 준다."
  }
 },
 {
  "id": "DJ108",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞(전쟁 전 평화로운 때)",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "올해 풍년이라 곳간이 넉넉하옵니다. 남는 곡식을 어디에 쓸까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간에 둔다",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "this_run": "곳간 문을 단단히 잠그고 장부에 붉은 도장을 찍었다."
   },
   "left": {
    "label": "군량 창고를 채운다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "곡식 일부로 군량 창고를 채웠다. 곳간지기가 \"평화로운데 왜\"냐며 고개를 갸웃했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "나라 살림과 대비",
  "fx": {
   "note": "들판의 볏단이 곳간과 군량 창고로 나뉘어 들어간다."
  }
 },
 {
  "id": "DJ109",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "피란길 관리",
   "doll": "official_red"
  },
  "line": "피란 행렬이 너무 길어 하루에 몇 리도 못 가옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "짐을 맡기고 간다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "무거운 짐을 길가 절집에 맡기고 걸음을 서둘렀다."
   },
   "left": {
    "label": "함께 천천히 간다",
    "effects": {
     "army": -5,
     "nobles": -5
    },
    "this_run": "호위 군사 일부와 관리 몇이 남아 뒤처진 사람들과 함께 걸었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(전쟁 초기 조선은 일본군의 공격을 막아 내지 못함) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "피란길",
  "fx": {
   "note": "산길 위로 짐을 진 사람 인형들이 길게 늘어선다."
  }
 },
 {
  "id": "DJ110",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "피란 온 사람들이 저희 고을로 몰려들어 잘 곳이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "양반집을 내준다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "양반집 사랑채와 헛간까지 피란 온 식구들에게 내주었다."
   },
   "left": {
    "label": "관아 마당만 쓴다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "관아 마당에만 거적을 깔게 했다. 밤이슬을 맞는 사람이 많았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(전쟁 중 피란을 다닌 사람들) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "피란민을 맞는 고을",
  "fx": {
   "note": "관아 마당과 양반집 마당에 거적이 깔린다."
  }
 },
 {
  "id": "DJ111",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "피란 중인 양반",
   "doll": "yangban"
  },
  "line": "피란길에 골짜기 시냇가에서 밤을 보내야 하옵니다. 불을 피워도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "불을 피운다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "모닥불 곁에서 몸을 녹였지만, 연기가 멀리서도 보여 밤새 망을 섰다."
   },
   "left": {
    "label": "불 없이 견딘다",
    "effects": {
     "people": -10
    },
    "this_run": "불 없이 서로 붙어 앉아 밤을 새웠다. 이 밤의 괴로움은 말로 다 할 수 없었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(《쇄미록》: 골짜기 산속 시냇가에서 잤다) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 중 사람들의 어려움",
  "fx": {
   "note": "어두운 골짜기에 작은 불빛 하나."
  }
 },
 {
  "id": "DJ112",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "의원",
   "doll": "jungin"
  },
  "line": "피란길에 앓는 노인과 아이가 많사옵니다. 약은 모자라고 갈 길은 멀옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "수레에 태운다",
    "effects": {
     "people": 10,
     "army": -5,
     "nobles": -5
    },
    "this_run": "양반들의 짐 수레 하나를 비워 아픈 사람들을 태웠다. 양반들이 짐을 등에 졌다."
   },
   "left": {
    "label": "약을 아껴 쓴다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "약을 아껴 가장 위급한 사람에게만 썼다. 의원의 한숨이 깊어졌다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(전쟁 중에 병이 난 가족을 돌보는 일기 — 예시 답안) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁과 병",
  "fx": {
   "note": "피란 수레 위에 이불 덮은 인형들이 앉아 간다."
  },
  "caution": "앓다가 세상을 떠나는 장면은 쓰지 않는다."
 },
 {
  "id": "DJ113",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "피란 중인 양반",
   "doll": "yangban"
  },
  "line": "산골 마을 사람들이 피란 온 저희에게 감자와 나물을 나눠 주었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "일손을 거든다",
    "effects": {
     "people": 10
    },
    "this_run": "피란 온 식구들이 마을 일손을 거들며 고마움을 갚았다."
   },
   "left": {
    "label": "글을 가르쳐 준다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "양반들이 마을 아이들에게 글을 가르쳐 주며 답례했다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "어려울 때 서로 돕기",
  "fx": {
   "note": "산골 마을 굴뚝마다 연기가 오르고, 마당에 나물 바구니가 놓인다."
  }
 },
 {
  "id": "DJ114",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "피란 중인 양반",
   "doll": "yangban"
  },
  "line": "피란 중에 어머니께서 병이 나셨사옵니다. 길을 멈추고 돌볼까요, 서둘러 더 안전한 곳으로 갈까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "멈추고 돌본다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "식구들이 빈 초가에 짐을 풀고 어머니 곁을 지켰다."
   },
   "left": {
    "label": "서둘러 떠난다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "어머니를 가마에 모시고 밤길을 서둘렀다. 모두 지쳐 말이 없었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(전쟁 중 어머니의 병을 돌보는 일기 — 예시 답안) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁을 겪은 사람들의 마음",
  "fx": {
   "note": "빈 초가 창호지에 등불이 하나 켜진다."
  }
 },
 {
  "id": "DJ115",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "불탄 마을 사람들이 씨앗까지 잃었사옵니다. 내년 농사를 어찌할지 걱정이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "씨앗을 나눠 준다",
    "effects": {},
    "this_run": "관아 곳간 깊숙이 넣어 둔 씨앗 자루를 꺼내 나눠 주었다."
   },
   "left": {
    "label": "봄에 다시 정한다",
    "effects": {
     "treasury": 5
    },
    "this_run": "씨앗은 곳간에 두고, 봄이 오면 다시 의논하기로 했다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "people": 15
    },
    "this_run": "불탄 밭에서도 싹이 텄다! 마을 사람들이 밭두렁에 앉아 한참을 바라보았다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "늦게 뿌린 씨앗이 서리를 맞았다. 곳간 씨앗만 줄었다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(그림: 집과 농사지을 땅이 다 타 버린 백성) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁의 피해와 다시 일어서기",
  "fx": {
   "note": "잿빛 밭에 씨앗 자루가 놓인다. 잘되면 연둣빛 싹이 돋는다."
  }
 },
 {
  "id": "DJ116",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07) && !flag(F_한양)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안) — 한양을 지킨 생은 빼고",
  "who": {
   "name": "도성에 남은 관리",
   "doll": "official_blue"
  },
  "line": "도성의 큰 관청들이 불타 장부와 문서를 둘 곳이 없사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "절집으로 옮긴다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "타다 남은 문서를 절집 창고로 옮겼다. 관리들이 산길을 오르내렸다."
   },
   "left": {
    "label": "군막에 둔다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "문서를 군막 한쪽에 두었다. 군사들이 비좁다고 투덜댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(《징비록》: 종루와 큰 거리 북쪽의 관청들이 모두 재가 됨)",
  "learn": "전쟁의 피해",
  "fx": {
   "note": "불탄 관청 터에 문서 궤짝 몇 개가 놓여 있다."
  }
 },
 {
  "id": "DJ117",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J02) && !seen(J07)"
  ],
  "conditions_text": "J02 뒤, J07 앞(임진왜란 동안)",
  "who": {
   "name": "나루 관리",
   "doll": "official_green"
  },
  "line": "피란민이 강을 건너려고 나루에 몰렸사옵니다. 배가 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사가 배를 젓는다",
    "effects": {
     "people": 10,
     "army": -5,
     "treasury": -5
    },
    "this_run": "군사들이 배를 저어 밤새 사람들을 건넸다. 배삯은 받지 않았다."
   },
   "left": {
    "label": "배삯을 받는다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "배삯을 받고 차례대로 건넸다. 돈 없는 사람들은 강가에서 밤을 보냈다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "피란길의 강 건너기",
  "fx": {
   "note": "나루에 나룻배가 바쁘게 오가고, 강가에 사람 인형들이 모여 있다."
  }
 },
 {
  "id": "DJ118",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "바닷가 마을 어부들이 배를 끌고 와 수군을 돕겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길잡이로 삼는다",
    "effects": {
     "army": 10
    },
    "this_run": "어부들의 작은 배가 판옥선 뒤를 따랐다. 바닷길을 잘 아는 어부가 길잡이가 되었다."
   },
   "left": {
    "label": "고기잡이를 맡긴다",
    "effects": {
     "people": 10
    },
    "this_run": "어부들에게는 고기를 잡아 수군에 보내 달라고 했다. 진중 밥상에 생선이 올랐다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(이순신이 이끄는 수군의 활약) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "수군과 바닷가 사람들",
  "fx": {
   "note": "판옥선 뒤로 작은 고깃배들이 줄지어 따라간다."
  }
 },
 {
  "id": "DJ119",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "판옥선을 고칠 나무가 모자라옵니다. 바닷가 산의 소나무를 베어도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "소나무를 벤다",
    "effects": {
     "army": 10,
     "treasury": 5,
     "people": -5
    },
    "this_run": "바닷가 산의 큰 소나무들이 배 만드는 곳으로 실려 갔다. 남은 가지는 땔감으로 팔았다."
   },
   "left": {
    "label": "조각을 맞춰 고친다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "산은 그대로 두고 부서진 배끼리 조각을 맞춰 고쳤다. 일이 더뎠다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "배를 만드는 나무",
  "fx": {
   "note": "바닷가 산비탈에서 통나무가 굴러 내려온다."
  }
 },
 {
  "id": "DJ120",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "진중에 쌀이 떨어져 가옵니다. 섬 사람들에게 둔전을 일구게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "섬에 밭을 일군다",
    "effects": {
     "army": 10,
     "treasury": 5,
     "people": -10
    },
    "this_run": "섬마다 군사와 섬 사람들이 함께 밭을 일궜다. 바닷바람에 허리가 굽었다."
   },
   "left": {
    "label": "육지 쌀을 싣는다",
    "effects": {
     "treasury": -5,
     "army": 5
    },
    "this_run": "육지 고을에서 쌀을 실어 왔다. 배 한 척이 쌀 나르는 데 묶였다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 중의 군량",
  "fx": {
   "note": "바닷가 섬 비탈에 밭고랑이 생긴다."
  }
 },
 {
  "id": "DJ121",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "밤바다에 짙은 안개가 끼었사옵니다. 배를 띄워 살필까요, 포구에서 기다릴까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배를 띄워 살핀다",
    "effects": {},
    "this_run": "판옥선 두 척이 등불을 끄고 안개 속으로 미끄러져 나갔다."
   },
   "left": {
    "label": "포구에서 기다린다",
    "effects": {
     "army": 5
    },
    "this_run": "배들은 포구에 머물렀다. 망루 군사들이 귀를 기울이며 밤을 새웠다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "안개 너머 낯선 배들이 물러가는 것을 먼저 보았다! 포구마다 미리 채비를 했다."
   },
   "lose": {
    "effects": {
     "army": -10
    },
    "this_run": "안개 속에서 길을 잃어 새벽에야 돌아왔다. 군사들이 지쳐 하루를 쉬었다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "바다를 지키는 일",
  "fx": {
   "note": "밤바다에 안개가 깔리고, 배 그림자가 사라졌다 나타난다."
  }
 },
 {
  "id": "DJ122",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "바닷가 사람들이 전쟁 소문에 마을을 떠나려 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사를 남긴다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "군사 몇을 남겨 마을을 지키게 했다. 성의 군사가 그만큼 줄었다."
   },
   "left": {
    "label": "떠나게 둔다",
    "effects": {
     "people": -10
    },
    "this_run": "사람들은 짐을 싸서 산속 마을로 떠났다. 빈 포구에 그물만 남았다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁과 바닷가 마을",
  "fx": {
   "note": "바닷가 초가 몇 채의 굴뚝 연기가 하나둘 꺼진다."
  }
 },
 {
  "id": "DJ123",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "젊은 군사들에게 물길과 바람 읽는 법을 가르치려 하옵니다. 시간을 내 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "가르칠 틈을 준다",
    "effects": {
     "army": -5
    },
    "this_run": "젊은 군사들이 고참 사공 곁에서 날마다 바다를 읽었다. 순찰은 조금 줄었다."
   },
   "left": {
    "label": "바로 노를 젓게 한다",
    "effects": {
     "army": 5
    },
    "this_run": "젊은 군사들은 바로 노를 저으러 나갔다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DJ123f",
   "after_n": 5,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "사람을 기르는 일",
  "fx": {
   "note": "판옥선 뱃전에 고참과 젊은 군사 인형이 나란히 선다."
  }
 },
 {
  "id": "DJ123f",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "그때 물길을 배운 젊은 군사들이 이제 배 한 척씩을 맡았사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배를 맡긴다",
    "effects": {
     "army": 15
    },
    "this_run": "젊은 군사들이 맡은 배들이 물살을 가르며 줄지어 나아갔다."
   },
   "left": {
    "label": "어부와 나누게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "젊은 군사들이 어부들에게도 물길을 가르쳐 주었다. 고기잡이가 늘었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기른 사람의 열매",
  "fx": {
   "note": "판옥선 돛들이 한꺼번에 바람을 받는다."
  }
 },
 {
  "id": "DJ124",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "수군 장수가 진중에서 쓴 보고가 올라왔사옵니다. 배와 군사가 더 필요하다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "배와 군사를 보낸다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "새 배를 만들 목수와 군사가 바닷가로 내려갔다."
   },
   "left": {
    "label": "있는 배로 버틴다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "\"있는 배로 버텨 달라\"는 답이 내려갔다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(이순신이 이끄는 수군) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "수군을 돕는 일",
  "fx": {
   "note": "진중 보고서가 말을 탄 군관 손에 실려 달린다."
  }
 },
 {
  "id": "DJ125",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞(수군이 활약할 때)",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "수군이 지켜 준 덕에 바닷가 장터가 다시 열렸사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "포구 장터에 소금과 생선이 쌓였다. 장세가 곳간으로 들어왔다."
   },
   "left": {
    "label": "진중에 보낸다",
    "effects": {
     "army": 5,
     "people": 5
    },
    "this_run": "장터 사람들이 생선과 짚신을 모아 수군 진중으로 보냈다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(수군의 활약으로 전쟁의 흐름이 바뀜) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "수군의 활약",
  "fx": {
   "note": "포구 장터 천막이 다시 펴지고 사람 인형들이 북적인다."
  }
 },
 {
  "id": "DJ126",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "고을 선비",
   "doll": "yangban"
  },
  "line": "고을 선비들이 의병을 모으겠다며 집안 곡식을 내놓았사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "관아도 보탠다",
    "effects": {
     "army": 10,
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "관아도 곡식을 보태자 의병 깃발 아래 사람들이 더 모였다."
   },
   "left": {
    "label": "칭찬 글을 내린다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "선비들의 뜻을 칭찬하는 글만 내려 보냈다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(전국 각지에서 일어난 의병) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "의병",
  "fx": {
   "note": "산골 마을에 흰 깃발이 하나둘 오른다."
  }
 },
 {
  "id": "DJ127",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "의병장",
   "doll": "official_green"
  },
  "line": "의병들이 농사철이라 집에 돌아가야 한다 하옵니다. 보내 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "집으로 보낸다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "army": -5
    },
    "this_run": "의병 절반이 낫을 들고 논으로 돌아갔다. 가을에 거둔 곡식 일부를 나라에 내기로 했다."
   },
   "left": {
    "label": "진지에 남긴다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "의병들은 진지에 남았다. 마을 논에는 노인과 아이들만 보였다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "의병의 삶",
  "fx": {
   "note": "의병 진지에서 사람 인형 몇이 논 쪽으로 걸어간다."
  }
 },
 {
  "id": "DJ128",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "관군 장수",
   "doll": "general"
  },
  "line": "관군과 의병이 서로 자기 뜻대로 하겠다며 다투고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한자리에 부른다",
    "effects": {
     "nobles": -5,
     "army": -5
    },
    "this_run": "관군 장수와 의병장이 한 자리에 불려 와 서로 길을 나누었다."
   },
   "left": {
    "label": "따로 움직이게 한다",
    "effects": {
     "army": -10
    },
    "this_run": "두 편이 따로 움직였다. 같은 산길을 두 번 지키느라 힘이 들었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "힘을 모으는 일",
  "fx": {
   "note": "두 깃발 사이에 사람 인형 둘이 마주 선다."
  }
 },
 {
  "id": "DJ129",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "의병장",
   "doll": "official_green"
  },
  "line": "산길을 잘 아는 마을 사람이 숨은 지름길을 알려 주겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "지름길로 간다",
    "effects": {},
    "this_run": "마을 사람을 앞세워 안개 낀 산길로 들어섰다."
   },
   "left": {
    "label": "아는 길로 간다",
    "effects": {
     "army": 5
    },
    "this_run": "아는 길로만 다녔다. 늦었지만 길을 잃지는 않았다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "army": 15
    },
    "this_run": "지름길 덕에 한발 먼저 고개를 지켰다! 의병들이 깃발을 높이 들었다."
   },
   "lose": {
    "effects": {
     "army": -10
    },
    "this_run": "지름길이 비에 무너져 있었다. 한나절을 헤매고 돌아왔다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "의병과 고향 땅",
  "fx": {
   "note": "산 능선을 따라 흰 깃발 행렬이 구불구불 이어진다."
  }
 },
 {
  "id": "DJ130",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "명 군대를 맞는 관리",
   "doll": "official_blue"
  },
  "line": "도우러 온 명의 군사들이 먹을 군량이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고을에서 거둔다",
    "effects": {
     "treasury": -5,
     "people": -5
    },
    "this_run": "고을마다 곡식을 거두어 명 군대 진중으로 보냈다."
   },
   "left": {
    "label": "녹봉을 덜어 보낸다",
    "effects": {
     "nobles": -5,
     "army": -5
    },
    "this_run": "관리들 녹봉과 우리 군사의 몫을 덜어 보냈다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(명에서 군대를 보내 도와줌)",
  "learn": "명의 원군",
  "fx": {
   "note": "곡식 수레가 북쪽 길로 줄지어 간다."
  }
 },
 {
  "id": "DJ131",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "의병장",
   "doll": "official_green"
  },
  "line": "의병을 따라온 아이들이 심부름을 하겠다 하옵니다. 어찌할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "심부름을 맡긴다",
    "effects": {
     "people": 5,
     "army": 5
    },
    "this_run": "아이들은 마을과 진지를 오가며 소식을 전했다. 위험한 곳에는 보내지 않았다."
   },
   "left": {
    "label": "서당에 맡긴다",
    "effects": {
     "people": 10
    },
    "this_run": "아이들을 산속 마을 서당에 맡겼다. 아이들은 투덜대며 책을 폈다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 속 아이들",
  "fx": {
   "note": "서당 마루에 아이 인형들이 앉고, 훈장이 책을 편다."
  },
  "caution": "아이를 싸움에 보내는 내용은 쓰지 않는다."
 },
 {
  "id": "DJ132",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "의병장",
   "doll": "official_green"
  },
  "line": "의병 이야기를 들은 이웃 고을 사람들까지 모여들어 먹을 것이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간을 연다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "관아 곳간이 열렸다. 의병 수가 늘어 산마다 깃발이 섰다."
   },
   "left": {
    "label": "고향으로 돌려보낸다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "새로 온 사람들은 고향 고을 의병에 들어가게 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(전국 각지에서 의병이 일어남) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "의병",
  "fx": {
   "note": "산마다 흰 깃발이 하나씩 늘어난다."
  }
 },
 {
  "id": "DJ133",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J04) && !seen(J07)"
  ],
  "conditions_text": "J04 뒤, J07 앞(의병이 일어난 뒤)",
  "who": {
   "name": "관군 장수",
   "doll": "general"
  },
  "line": "흩어졌던 관군이 다시 모였사옵니다. 어디부터 지킬까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "마을 고개를 지킨다",
    "effects": {
     "army": 10,
     "people": 5,
     "nobles": -5
    },
    "this_run": "관군이 마을 고개마다 섰다. 피란 갔던 사람들이 하나둘 돌아왔다."
   },
   "left": {
    "label": "관아부터 지킨다",
    "effects": {
     "nobles": 5,
     "treasury": 5,
     "people": -5
    },
    "this_run": "관군이 관아와 곳간부터 지켰다. 마을 사람들은 서운해했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(전쟁의 흐름이 바뀜) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "다시 모인 군대",
  "fx": {
   "note": "관군 깃발이 고개마다 꽂힌다."
  }
 },
 {
  "id": "DJ134",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "전쟁이 끝나 피란 갔던 사람들이 돌아오고 있사옵니다. 그런데 집이 다 타 버렸사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "재목을 나눠 준다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "관아 나무를 풀어 집 지을 재목으로 나눠 주었다."
   },
   "left": {
    "label": "스스로 짓게 한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "사람들은 타다 남은 기둥을 모아 움막부터 지었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(그림: 집과 농사지을 땅이 다 타 버린 백성)",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "잿빛 마을 터에 새 초가 지붕이 하나둘 올라간다."
  }
 },
 {
  "id": "DJ135",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "불탄 논에 다시 물을 대려면 무너진 보부터 고쳐야 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "보부터 고친다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "마을 사람과 군사가 함께 돌을 날라 보를 다시 쌓았다."
   },
   "left": {
    "label": "내년으로 미룬다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "보는 내년으로 미루고 우물물로 밭부터 적셨다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "다시 농사를 짓다",
  "fx": {
   "note": "마른 논에 물길이 다시 반짝이며 흐른다."
  }
 },
 {
  "id": "DJ136",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "서원 유생",
   "doll": "yusaeng"
  },
  "line": "불탄 서원 터에 유생들이 다시 모여 글을 읽고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "강당을 세워 준다",
    "effects": {
     "nobles": 10
    },
    "this_run": "서원 터에 임시 강당이 섰다. 글 읽는 소리가 잿빛 마을에 퍼졌다."
   },
   "left": {
    "label": "마을 일도 돕게 한다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "유생들이 마을 집 짓는 일을 거든 뒤 저녁에 글을 읽었다."
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
  "sources_text": "지도서 245(교과서 81) 서당·향교·서원·성균관 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 뒤의 배움",
  "fx": {
   "note": "서원 터에 작은 강당 지붕이 올라간다."
  }
 },
 {
  "id": "DJ137",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "전쟁이 끝나자 장터가 다시 열렸사옵니다! 사람들이 오랜만에 웃사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장터를 그냥 둔다",
    "effects": {
     "people": 10
    },
    "this_run": "장터에 엿장수와 짚신 장수가 돌아왔다. 아이들이 엿가락을 물고 뛰었다."
   },
   "left": {
    "label": "장세를 조금 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "장세를 조금씩 걷어 무너진 다리를 고치는 데 썼다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "다시 열린 장터",
  "fx": {
   "note": "장터 천막이 하나둘 펴지고 사람 인형들이 북적인다."
  }
 },
 {
  "id": "DJ138",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "전쟁 기록을 맡은 관리",
   "doll": "official_blue"
  },
  "line": "전쟁 때 일을 적어 둔 쪽지들이 상자에 가득하옵니다. 정리해 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "날짜대로 정리한다",
    "effects": {
     "nobles": -5
    },
    "this_run": "관리들이 쪽지를 날짜대로 늘어놓고 한 장씩 베껴 썼다."
   },
   "left": {
    "label": "창고에 둔다",
    "effects": {
     "nobles": 5
    },
    "this_run": "쪽지 상자는 창고 선반에 올라갔다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DJ138f",
   "after_n": 4,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(《징비록》 — 전쟁의 경험을 기록) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기록을 남기는 일",
  "fx": {
   "note": "책상 위 쪽지들이 날짜 순서로 줄을 선다."
  }
 },
 {
  "id": "DJ138f",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "who": {
   "name": "전쟁 기록을 맡은 관리",
   "doll": "official_blue"
  },
  "line": "그때 정리해 둔 기록 덕에, 다시는 같은 잘못을 하지 않을 방법이 보이옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "성과 봉수대를 고친다",
    "effects": {
     "army": 15
    },
    "this_run": "기록에서 찾은 잘못을 하나씩 고쳐 성과 봉수대를 손보았다."
   },
   "left": {
    "label": "대신들과 돌려 읽는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "기록을 돌려 읽은 대신들이 고개를 끄덕였다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(《징비록》) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "기록의 열매",
  "fx": {
   "note": "쪽지들이 한 권의 책으로 묶이며 금빛으로 빛난다."
  }
 },
 {
  "id": "DJ139",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "전쟁 동안 밀린 일이 산더미이옵니다. 무엇부터 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다리부터 고친다",
    "effects": {
     "people": 5,
     "army": 5,
     "treasury": -10
    },
    "this_run": "무너진 다리와 봉수대를 한꺼번에 고쳤다. 곳간이 바닥을 보였다."
   },
   "left": {
    "label": "장부부터 편다",
    "effects": {
     "treasury": 10,
     "people": -5,
     "army": -5
    },
    "this_run": "세금 장부부터 다시 펴 곳간을 채웠다. 다리 고치는 일은 미뤄졌다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 뒤의 나라 살림",
  "fx": {
   "note": "섬 곳곳에 일꾼 인형들이 흩어져 무언가를 고친다."
  }
 },
 {
  "id": "DJ140",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "전쟁 통에 잃어버린 가족을 찾는 사람들이 관아 앞에 이름을 붙이고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "이웃 고을에 알린다",
    "effects": {},
    "this_run": "관아가 이웃 고을마다 이름 적힌 종이를 보냈다."
   },
   "left": {
    "label": "담벼락에 붙여 둔다",
    "effects": {
     "people": 5
    },
    "this_run": "관아 담벼락에 이름 쓴 종이가 빼곡히 붙었다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "people": 15
    },
    "this_run": "이웃 고을에서 소식이 왔다! 헤어졌던 식구들이 관아 마당에서 다시 만났다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "종이를 들고 고을을 돈 아전들의 길삯만 들었다. 소식은 오지 않았다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁이 남긴 아픔",
  "fx": {
   "note": "관아 담벼락에 종이가 한 장씩 붙는다. 잘되면 두 사람 인형이 마주 선다."
  }
 },
 {
  "id": "DJ141",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09) && !flag(F_한양)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤) — 한양을 지킨 생은 빼고",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "불탄 궁궐 대신 머무실 곳이 좁아 신하들이 드나들기 어렵사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "이웃 집을 사들인다",
    "effects": {
     "treasury": -5,
     "people": -5
    },
    "this_run": "이웃 집 몇 채를 사들여 담을 텄다. 집을 판 사람들은 이사를 했다."
   },
   "left": {
    "label": "좁은 대로 지낸다",
    "effects": {
     "nobles": -10
    },
    "this_run": "좁은 대로 지냈다. 대신들이 마당에 서서 차례를 기다렸다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(《징비록》: 세 대궐이 모두 재가 됨) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "불탄 궁궐",
  "fx": {
   "note": "좁은 집 마당에 관복 입은 인형들이 줄을 선다."
  }
 },
 {
  "id": "DJ142",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞(임진왜란이 끝난 뒤)",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "전쟁 때 무너진 봉수대를 다시 쌓을까요, 그 돌로 성벽부터 고칠까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "봉수대를 쌓는다",
    "effects": {
     "army": 10,
     "people": -5
    },
    "this_run": "산마다 봉수대가 다시 섰다. 돌을 나르느라 마을 장정들이 바빴다."
   },
   "left": {
    "label": "성벽부터 고친다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "도성 성벽부터 고쳤다. 먼 산 봉수대는 무너진 채 남았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 뒤의 대비",
  "fx": {
   "note": "산꼭대기에 봉수대 연기가 다시 오른다."
  }
 },
 {
  "id": "DJ143",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "성벽 위 군사들이 추위에 손이 얼어 활을 당기기 어렵사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "솜과 짚을 모은다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "성 안 솜과 짚을 모두 모아 군사들의 옷 속에 넣었다."
   },
   "left": {
    "label": "이불을 내놓게 한다",
    "effects": {
     "people": -5,
     "army": 5
    },
    "this_run": "성 안 집집마다 이불 한 채씩을 내놓게 했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란(남한산성은 전쟁 준비가 제대로 되어 있지 않았음) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "남한산성의 겨울",
  "fx": {
   "note": "눈 덮인 성벽 위에 군사 인형들이 손을 비빈다."
  }
 },
 {
  "id": "DJ144",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "곳간지기",
   "doll": "official_blue"
  },
  "line": "성 안 쌀을 하루 한 줌씩 줄여 나누자는 말이 나오옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "신하 밥부터 줄인다",
    "effects": {
     "people": -5,
     "nobles": -5
    },
    "this_run": "신하들 밥상부터 반으로 줄였다. 모두 말없이 숟가락을 들었다."
   },
   "left": {
    "label": "군사 몫을 줄인다",
    "effects": {
     "army": -10
    },
    "this_run": "군사들의 몫을 줄였다. 성벽 위 군사들의 걸음이 느려졌다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란(남한산성은 식량도 부족했음)",
  "learn": "남한산성의 식량",
  "fx": {
   "note": "곳간 문 앞에서 쌀을 됫박으로 나눈다."
  }
 },
 {
  "id": "DJ145",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "물이 모자라 대나무 위에 쌓인 눈을 녹여 쓰고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "끓여서 쓴다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "솥마다 눈을 녹여 끓였다. 땔감이 빨리 줄었다."
   },
   "left": {
    "label": "땔감을 아낀다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "땔감을 아끼려고 눈을 그대로 녹여 마셨다. 배앓이하는 사람이 늘었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(대나무 위의 눈을 녹여 먹음 — 예시 답안) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "전쟁 중 사람들의 어려움",
  "fx": {
   "note": "성 안 솥에서 김이 오르고, 대나무 위 눈이 녹아내린다."
  }
 },
 {
  "id": "DJ146",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "성 안 아이들이 눈사람을 만들고 놀고 있사옵니다. 잠시 내다보시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "아이들을 본다",
    "effects": {
     "people": 10
    },
    "this_run": "아이들이 눈사람에 솔잎 눈썹을 붙이며 깔깔 웃었다. 모처럼 성 안이 밝아졌다."
   },
   "left": {
    "label": "신하들도 내보낸다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "아이들이 신하들에게도 눈뭉치를 건넸다. 굳었던 얼굴들이 조금 풀렸다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "어려울 때의 작은 웃음",
  "fx": {
   "note": "성 안 마당에 작은 눈사람 하나가 선다."
  }
 },
 {
  "id": "DJ147",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "두 편 신하들이 밤마다 따로 모여 의논하옵니다. 함께 모이게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "함께 모이게 한다",
    "effects": {
     "nobles": 10,
     "army": -5,
     "people": -5
    },
    "this_run": "두 편 신하들이 한 방에 앉았다. 목소리가 높아졌다가 낮아지기를 밤새 되풀이했다."
   },
   "left": {
    "label": "따로 글을 받는다",
    "effects": {
     "nobles": -5,
     "army": 5
    },
    "this_run": "두 편의 글을 따로 받아 읽었다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란(청과 끝까지 싸우자는 신하들과 화해하자는 신하들로 의견이 나뉨)",
  "learn": "주화와 척화",
  "fx": {
   "note": "성 안 두 방에 각각 등불이 켜졌다가, 고르면 한 방으로 모인다."
  },
  "caution": "어느 쪽도 정답으로 다루지 않는다(지도서 236 유의점)."
 },
 {
  "id": "DJ148",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "성 밖으로 몰래 나가 바깥 소식을 알아 올 사람이 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "사람을 내보낸다",
    "effects": {},
    "this_run": "날랜 군사 하나가 밤에 성벽을 넘어 눈길로 사라졌다."
   },
   "left": {
    "label": "성문을 닫아 둔다",
    "effects": {
     "army": 5
    },
    "this_run": "성문을 굳게 닫고 아무도 내보내지 않았다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "군사가 바깥 소식을 안고 돌아왔다! 신하들이 소식을 두고 밤새 의논했다."
   },
   "lose": {
    "effects": {
     "army": -10
    },
    "this_run": "군사는 길이 막혀 돌아왔다. 성벽을 지킬 사람이 그사이 비었다."
   }
  },
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "갇힌 성의 바깥 소식",
  "fx": {
   "note": "눈 덮인 성벽 아래로 작은 그림자 하나가 내려간다."
  }
 },
 {
  "id": "DJ149",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "성벽 한쪽이 눈 무게에 허물어지려 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "담장 돌로 메운다",
    "effects": {
     "army": -5,
     "treasury": -5
    },
    "this_run": "성 안 집 담장 돌을 빼다 성벽을 메웠다."
   },
   "left": {
    "label": "밤새 눈을 치운다",
    "effects": {
     "people": -5,
     "army": -5
    },
    "this_run": "마을 사람들이 밤새 눈을 치웠다. 다음 날 모두 몸살을 앓았다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "남한산성의 겨울",
  "fx": {
   "note": "성벽 위 눈이 미끄러져 내린다."
  }
 },
 {
  "id": "DJ150",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "곳간지기",
   "doll": "official_blue"
  },
  "line": "성 안 절에서 스님들이 모아 둔 곡식을 내놓겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사에게 보낸다",
    "effects": {
     "army": 10
    },
    "this_run": "곡식 자루가 군사들 진막으로 옮겨졌다. 군사들이 두 손을 모았다."
   },
   "left": {
    "label": "죽을 쑤어 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "곡식으로 죽을 쑤어 성 안 사람들과 나누었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "어려울 때 서로 돕기",
  "fx": {
   "note": "성 안 절 마당에 곡식 자루가 쌓인다."
  }
 },
 {
  "id": "DJ151",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "성 안 신하들의 가족이 피란 중이라 소식을 몰라 애태우고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "소식을 알아 온다",
    "effects": {
     "nobles": 10,
     "army": -5
    },
    "this_run": "군사 하나를 보내 가족들의 피란 소식을 알아 오게 했다."
   },
   "left": {
    "label": "성을 먼저 지킨다",
    "effects": {
     "army": 5,
     "nobles": -5
    },
    "this_run": "\"지금은 성을 지키는 일이 먼저\"라는 말에 신하들이 고개를 떨궜다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(《병자일기》: 남한산성에서 임금을 모시는 남편에게서 연락이 옴)",
  "learn": "전쟁 중의 가족",
  "fx": {
   "note": "성 밖 눈길 위로 편지를 든 작은 인형이 걸어간다."
  }
 },
 {
  "id": "DJ152",
  "kind": "daily",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤(병자호란 — 남한산성)",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "성문 하나를 열어 땔감을 구해 올지, 성 안 나무를 베어 쓸지 정해야 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "땔감을 구해 온다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "army": -10
    },
    "this_run": "군사들이 새벽에 성문을 나가 땔감을 지고 돌아왔다. 성문 지키는 사람이 줄었다."
   },
   "left": {
    "label": "성 안 나무를 쓴다",
    "effects": {
     "army": 5,
     "people": -5,
     "nobles": -5
    },
    "this_run": "성 안 정자 기둥과 나무를 베어 땔감으로 썼다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "남한산성의 겨울",
  "fx": {
   "note": "성문이 잠깐 열렸다 닫히고, 땔감 지게가 들어온다."
  }
 },
 {
  "id": "CJ01a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1591",
  "conditions": [
   "seen(J01) && !seen(J02)"
  ],
  "conditions_text": "J01 뒤, J02 앞",
  "who": {
   "name": "유성룡",
   "doll": "yuseongryong"
  },
  "line": "바다와 땅을 맡길 장수가 필요하옵니다. 벼슬이 낮아도 뛰어난 사람이면 크게 쓰시옵소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "벼슬을 건너 올린다",
    "effects": {
     "army": 10,
     "nobles": -5
    },
    "this_run": "이름이 덜 알려진 두 장수가 높은 자리에 올랐다. 대신 몇이 \"차례를 건너뛰었다\"며 수군댔다."
   },
   "left": {
    "label": "차례를 지킨다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "벼슬 차례대로 장수를 정했다. 대신들은 고개를 끄덕였다."
   }
  },
  "grain": "balance",
  "real_history": "유성룡은 일찍이 왜란이 일어날 것을 예상하고, 뒤에 행주 대첩을 승리로 이끈 권율과 조선 수군의 큰 승리를 이끈 이순신을 천거했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(유성룡과 《징비록》 — 권율·이순신을 천거)",
  "learn": "임진왜란 직전의 준비",
  "fx": {
   "note": "궁궐 마당에 두 장수 인형이 나란히 서고, 깃발 두 개가 오른다."
  },
  "chain": "두 장수를 천거하다"
 },
 {
  "id": "CJ01b",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1593",
  "conditions": [
   "seen(CJ01a) && seen(J05) && !seen(J07)"
  ],
  "conditions_text": "CJ01a를 본 생에서 J05 뒤 반드시 한 번(J07 앞)",
  "who": {
   "name": "권율",
   "doll": "general"
  },
  "line": "한양 가까운 산성에 군사를 모았사옵니다. 성 안 사람들까지 힘을 모으면 버틸 수 있사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 힘을 모은다",
    "effects": {
     "army": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "군사와 마을 사람들이 함께 성벽에 돌을 쌓았다. 성은 끝까지 버텼다."
   },
   "left": {
    "label": "군사만 지킨다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "마을 사람들은 성 뒤로 피했다. 군사들만 성을 지켰다."
   }
  },
  "grain": "complex",
  "real_history": "권율은 행주 대첩을 승리로 이끌었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(행주 대첩을 승리로 이끈 권율)",
  "learn": "행주 대첩",
  "fx": {
   "note": "한강 가 산성에 깃발이 오르고, 성벽 위에 사람 인형들이 늘어선다."
  },
  "note": "행주치마 이야기처럼 확인되지 않은 이야기는 쓰지 않는다.",
  "chain": "두 장수를 천거하다",
  "force": true
 },
 {
  "id": "CJ02a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1592",
  "conditions": [
   "seen(J02) && !seen(J05)"
  ],
  "conditions_text": "J02 뒤, J05 앞",
  "who": {
   "name": "피란 중인 양반",
   "doll": "yangban"
  },
  "line": "피란길에 겪은 일을 날마다 적고 있사옵니다. 나라에서 내려온 글이나 의병들의 글도 베껴 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 베껴 두게 한다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "관아에서 종이 묶음을 내주었다. 양반은 등불 아래서 글을 베껴 썼다."
   },
   "left": {
    "label": "집안 일만 적는다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "양반은 식구들의 하루만 짧게 적었다."
   }
  },
  "grain": "balance",
  "real_history": "《쇄미록》은 임진왜란 때 양반 오희문이 전쟁을 겪으며 쓴 일기로, 왕과 세자의 교서, 의병들이 쓴 글, 여러 공문서 내용 등이 적혀 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   },
   {
    "type": "guide",
    "page": "237"
   }
  ],
  "sources_text": "지도서 237(교과서 79) 전쟁 중에 쓴 일기(《쇄미록》은 양반 오희문이 쓴 일기) · [교과서 밖] 지도서 237 자료 해설(교서·의병들의 글·공문서를 기록)",
  "learn": "《쇄미록》",
  "fx": {
   "note": "피란 초가 창호지에 붓을 든 그림자가 비친다."
  },
  "chain": "피란길의 일기"
 },
 {
  "id": "CJ02b",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1601",
  "conditions": [
   "seen(CJ02a) && seen(J07)"
  ],
  "conditions_text": "CJ02a를 본 생에서 J07 뒤 반드시 한 번",
  "who": {
   "name": "오희문",
   "doll": "yangban"
  },
  "line": "전쟁 동안 쓴 일기가 여러 권이 되었사옵니다. 이 일기를 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "집안에 물려준다",
    "effects": {
     "nobles": 10
    },
    "this_run": "일기는 비단 보자기에 싸여 자손에게 전해졌다."
   },
   "left": {
    "label": "이웃과 돌려 본다",
    "effects": {
     "people": 10
    },
    "this_run": "이웃들이 일기를 돌려 읽으며 \"그때 우리도 그랬지\" 하고 고개를 끄덕였다."
   }
  },
  "grain": "gift",
  "real_history": "《쇄미록》은 1591년부터 1601년 2월까지 약 9년 3개월 동안의 일을 적은 일기로, 전쟁 때의 상황을 이해하는 데 큰 도움을 준다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "237"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 237 자료 해설(《쇄미록》 — 선조 24년부터 34년 2월까지 약 9년 3개월)",
  "learn": "기록으로 남은 전쟁",
  "fx": {
   "note": "일기책 여러 권이 쌓이고, 맨 위 책이 금빛으로 빛난다."
  },
  "chain": "피란길의 일기",
  "force": true
 },
 {
  "id": "CJ03a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1598",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "전쟁 통에 땅과 사람을 적어 둔 장부(양안·호적)가 거의 다 없어졌사옵니다. 세금을 어찌 걷을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "새로 조사한다",
    "effects": {
     "treasury": -5,
     "people": 5
    },
    "this_run": "관리들이 고을마다 다니며 밭 넓이와 식구 수를 다시 적었다."
   },
   "left": {
    "label": "아는 만큼 걷는다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "기억나는 대로 세금을 매겼다. 억울하다는 말이 여기저기서 나왔다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CJ03b",
   "after_n": 4
  },
  "real_history": "임진왜란으로 양안(땅을 적은 장부)과 호적(사람을 적은 장부)이 대부분 없어져 나라를 꾸려 가는 데 큰 어려움이 생겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(양안과 호적 등이 대부분 없어져 국가 운영에 큰 차질)",
  "learn": "임진왜란의 피해 — 기록이 사라짐",
  "fx": {
   "note": "빈 서가에서 먼지만 날린다."
  },
  "chain": "사라진 장부"
 },
 {
  "id": "CJ03b",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1600년 무렵",
  "conditions": [
   "seen(CJ03a)"
  ],
  "conditions_text": "CJ03a 4장 뒤",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "다시 조사해 보니 농사지을 수 있는 땅이 전쟁 전보다 크게 줄었사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "세금을 덜어 준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "줄어든 땅만큼 세금을 덜었다. 농민들이 한숨을 돌렸다."
   },
   "left": {
    "label": "빈 땅을 일구게 한다",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "this_run": "묵은 땅을 다시 일구라는 명이 내려갔다. 허리 펼 틈이 없었다."
   }
  },
  "grain": "balance",
  "real_history": "전쟁으로 온 나라가 싸움터가 되어 땅이 황폐해졌고, 사람들은 굶주림과 병에 시달렸다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   },
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(토지의 황폐화, 기근과 질병) · 지도서 235(교과서 77 그림: 집과 땅이 다 타 버린 백성)",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "섬의 들판 절반이 잿빛이었다가, 고르면 조금씩 초록이 번진다."
  },
  "chain": "사라진 장부"
 },
 {
  "id": "CJ04a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1636",
  "conditions": [
   "seen(J09) && !seen(J10)"
  ],
  "conditions_text": "J09 바로 다음 반드시",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "청의 군대가 빠르게 내려오고 있사옵니다. 왕실 가족을 먼저 강화도로 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "먼저 보낸다",
    "effects": {
     "people": -5,
     "nobles": 5
    },
    "this_run": "왕실 가족을 태운 가마가 서둘러 서쪽 길로 떠났다."
   },
   "left": {
    "label": "함께 움직인다",
    "effects": {
     "nobles": -5,
     "army": 5
    },
    "this_run": "왕실 가족과 신하들이 한 행렬로 움직였다. 걸음이 느렸다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CJ04b",
   "after_n": 0
  },
  "real_history": "병자호란 때 인조는 왕족들을 먼저 강화도로 보내고 자신도 강화도로 피란을 가려 했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(병자호란과 그 영향 — 왕족들을 먼저 강화도로 보냄)",
  "learn": "병자호란의 전개",
  "fx": {
   "note": "눈 덮인 서쪽 길로 가마 행렬이 떠난다."
  },
  "trigger": {
   "card": "J09",
   "after_n": 0
  },
  "chain": "강화도로 가는 길"
 },
 {
  "id": "CJ04b",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1636",
  "conditions": [
   "seen(CJ04a)"
  ],
  "conditions_text": "CJ04a 바로 다음",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "강화도로 가는 길이 이미 막혔사옵니다! 가까운 남한산성으로 들어가야 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "남한산성으로 간다",
    "effects": {
     "people": -5,
     "treasury": -5
    },
    "this_run": "행렬이 방향을 돌려 눈 덮인 산길을 올랐다. 짐 수레 몇은 길에 두고 갔다."
   },
   "left": {
    "label": "다른 길을 살핀다",
    "effects": {
     "army": -10
    },
    "this_run": "길을 살피러 간 군사들이 고개를 저으며 돌아왔다. 결국 남한산성으로 향했다."
   }
  },
  "grain": "mire",
  "real_history": "청군이 빠르게 내려와 강화도로 가는 길이 막히자, 인조는 남한산성으로 들어갔다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   },
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(청군의 빠른 진격으로 길이 막혀 남한산성으로) · 지도서 236(교과서 78) 병자호란(남한산성)",
  "learn": "남한산성으로 들어간 까닭",
  "fx": {
   "note": "서쪽 길에 먹구름이 끼고, 행렬이 동남쪽 산성으로 방향을 바꾼다."
  },
  "chain": "강화도로 가는 길"
 },
 {
  "id": "CJ05a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1624",
  "conditions": [
   "seen(J08) && !seen(J09)"
  ],
  "conditions_text": "J08 뒤, J09 앞",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "평안도의 한 장수가 군사를 일으켰다가 진압되었사옵니다. 그 바람에 북쪽 군사들이 흩어졌사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "남쪽 군사를 보낸다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "남쪽 고을 장정들이 짐을 지고 북쪽 길을 올랐다."
   },
   "left": {
    "label": "흩어진 군사를 달랜다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "흩어진 군사들에게 죄를 묻지 않겠다는 글을 내렸다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CJ05b",
   "after_n": 3
  },
  "real_history": "1624년 평안도 지역에서 이괄의 난이 일어나, 서북 지역을 지키는 힘이 약해졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(병자호란에서 조선이 패배한 원인 — 이괄의 난으로 서북 지역 방어력이 약해짐)",
  "learn": "병자호란 앞의 상황",
  "fx": {
   "note": "북쪽 성벽 위 깃발이 하나둘 내려간다."
  },
  "chain": "북쪽의 빈자리"
 },
 {
  "id": "CJ05b",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1620년대",
  "conditions": [
   "seen(CJ05a)"
  ],
  "conditions_text": "CJ05a 3장 뒤",
  "who": {
   "name": "북쪽 성의 군관",
   "doll": "general"
  },
  "line": "북쪽 성들을 다시 채울 군사와 활이 모자라옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "곳간을 열어 채운다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "활과 군복을 실은 수레가 북쪽으로 떠났다."
   },
   "left": {
    "label": "고을에 맡긴다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "북쪽 고을들이 스스로 군사를 모으게 했다. 모이는 속도가 더뎠다."
   }
  },
  "grain": "balance",
  "real_history": "병자호란에서 조선이 진 까닭으로 서북 지역의 방어력이 약해진 점, 조정의 대응 전략이 부실했던 점, 청군이 예상보다 빨리 한양으로 내려온 점 등을 꼽는다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(병자호란에서 조선이 패배한 주요 원인)",
  "learn": "병자호란에서 진 까닭",
  "fx": {
   "note": "북쪽 길로 수레 행렬이 올라간다."
  },
  "chain": "북쪽의 빈자리"
 },
 {
  "id": "RJ01",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1592~1598",
  "conditions": [
   "seen(J03) && !seen(J07)"
  ],
  "conditions_text": "J03 뒤, J07 앞",
  "who": {
   "name": "수군 군관",
   "doll": "general"
  },
  "line": "수군 장수께서 싸움이 없는 날에도 진중의 일을 날마다 일기로 적고 계시옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "종이와 먹을 보낸다",
    "effects": {
     "nobles": 5,
     "army": 5
    },
    "this_run": "진중에 종이 한 짐과 먹 열 자루가 닿았다."
   },
   "left": {
    "label": "군사 일에 보탠다",
    "effects": {
     "army": 10
    },
    "this_run": "종이 대신 활과 화살을 한 수레 더 보냈다."
   }
  },
  "grain": "gift",
  "real_history": "이순신은 임진왜란 때 진중에서 《난중일기》를 썼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(이순신이 임진왜란 때 쓴 《난중일기》)",
  "learn": "《난중일기》",
  "fx": {
   "note": "진중 막사 안 등불 아래 붓 그림자가 움직인다."
  }
 },
 {
  "id": "RJ02",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1590년 무렵",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞",
  "who": {
   "name": "병조 판서",
   "doll": "official_green"
  },
  "line": "큰 전쟁 없이 200년이 지나 성벽이 낡고 군사 훈련도 느슨해졌사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "훈련을 다시 한다",
    "effects": {
     "army": 10,
     "people": -5,
     "treasury": -5
    },
    "this_run": "고을마다 훈련 북이 울렸다. 장정들은 농사 틈틈이 활을 쏘았다."
   },
   "left": {
    "label": "평화로우니 둔다",
    "effects": {
     "treasury": 10,
     "army": -10
    },
    "this_run": "군사 훈련 대신 곳간을 채웠다. 활터는 조용했다."
   }
  },
  "grain": "complex",
  "real_history": "조선은 큰 전쟁 없이 평화가 이어져 국방에 소홀해졌지만, 일본은 전쟁을 거듭하면서 군사들이 잘 훈련되어 있었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   },
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(조선은 국방에 소홀, 일본은 군사가 잘 훈련됨) · 지도서 235(교과서 77) 임진왜란(건국 200년 뒤)",
  "learn": "임진왜란 직전의 상황",
  "fx": {
   "note": "낡은 성벽에 이끼가 끼어 있다. 고르면 훈련장 북이 울린다."
  }
 },
 {
  "id": "RJ03",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1600년대 초",
  "conditions": [
   "seen(J07) && !seen(J08)"
  ],
  "conditions_text": "J07 뒤, J08 앞",
  "who": {
   "name": "사신",
   "doll": "official_red"
  },
  "line": "전쟁 뒤 명의 힘이 크게 약해졌고, 만주의 여진이 힘을 키운다는 소식이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "북쪽을 살핀다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "북쪽 국경 성마다 군사를 늘리고 망을 세웠다."
   },
   "left": {
    "label": "명을 믿고 둔다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "\"명이 있으니 걱정 없다\"는 말에 대신들이 고개를 끄덕였다."
   }
  },
  "grain": "balance",
  "real_history": "임진왜란 이후 명이 약해진 틈을 타 만주 지역에 살던 여진족이 세력을 키워 후금을 세웠다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란(명이 약해진 틈을 타 여진족이 후금을 세움)",
  "learn": "병자호란의 배경",
  "fx": {
   "note": "북쪽 하늘에 낯선 깃발 그림자가 어른거린다."
  }
 },
 {
  "id": "RJ04",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1598 이후",
  "conditions": [
   "seen(J07) && !seen(J09)"
  ],
  "conditions_text": "J07 뒤, J09 앞",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "전쟁 때 그릇 굽던 장인들이 바다 건너로 끌려가 가마 마을이 비었사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "새 장인을 기른다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "남은 늙은 장인에게 젊은이들이 흙 고르는 법부터 배웠다."
   },
   "left": {
    "label": "이웃 고을에서 부른다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "이웃 고을 장인들이 옮겨 왔다. 그 고을 가마는 하나 줄었다."
   }
  },
  "grain": "balance",
  "real_history": "임진왜란 때 일본은 조선의 뛰어난 도공과 인쇄공·활자공 등을 끌고 가, 일본의 도자기 기술과 활자술이 크게 발전하는 계기가 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(도공·인쇄공·활자공을 끌고 감)",
  "learn": "임진왜란이 남긴 영향",
  "fx": {
   "note": "식은 가마 앞에 젊은 인형 하나가 흙을 고른다."
  }
 },
 {
  "id": "RJ05",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1636~1637",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "지방 군사들이 성을 구하러 올라온다는 소식이옵니다. 성문을 열어 맞을 준비를 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "맞을 준비를 한다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "성벽 위에서 날마다 남쪽 길을 내다보았다. 군사들은 끝내 성에 닿지 못했다."
   },
   "left": {
    "label": "성을 굳게 지킨다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "성문을 닫아걸고 성 안 사람들을 성벽 일에 불렀다."
   }
  },
  "grain": "balance",
  "real_history": "남한산성의 조정은 지방 관군이 와서 구해 주기를 기대했지만, 도움이 되지는 못했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(지방 관군의 활약과 구원을 기대했지만 도움이 되지 못함)",
  "learn": "남한산성",
  "fx": {
   "note": "성벽 위 군사 인형들이 남쪽 눈길을 내다본다."
  }
 },
 {
  "id": "RJ06",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞",
  "who": {
   "name": "한성부 관리",
   "doll": "official_green"
  },
  "line": "도성 성벽이 산 능선을 따라 길게 이어져 다 돌아보는 데도 며칠이 걸리옵니다. 무너진 곳을 고칠까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 고친다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "석수들이 능선을 따라 올라가며 무너진 곳을 메웠다."
   },
   "left": {
    "label": "큰 문 둘레만 고친다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "네 큰 문 둘레만 새 돌로 반듯해졌다."
   }
  },
  "grain": "balance",
  "real_history": "한양 도성은 북악산·낙산·남산·인왕산의 능선을 따라 쌓은 길이 약 18.6㎞의 성곽이다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 238 참고 자료(서울 한양 도성 — 약 18.6㎞, 네 산의 능선)",
  "learn": "한양 도성",
  "fx": {
   "note": "도성 성벽을 따라 석수 인형들이 능선을 오른다."
  }
 },
 {
  "id": "RJ07",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions_text": "아무 때나",
  "who": {
   "name": "상궁",
   "doll": "courtlady"
  },
  "line": "전하, 먼 곳에 계신 공주께 소식을 보내시겠사옵니까? 한글로 쓰시면 공주께서 바로 읽으실 것이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한글로 쓴다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "또박또박 한글 편지가 쓰였다. 받은 공주가 편지를 품에 안았다."
   },
   "left": {
    "label": "한문으로 쓴다",
    "effects": {
     "nobles": 10
    },
    "this_run": "반듯한 한문 편지가 쓰였다. 대신들이 글씨를 칭찬했다."
   }
  },
  "grain": "gift",
  "real_history": "훈민정음을 만든 뒤에도 공식 문서는 한자를 썼지만, 한글을 쓰는 사람은 계속 늘었고 왕이나 왕비가 쓴 한글 편지도 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "263"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 263 지도상의 유의점(왕이나 왕비가 쓴 한글 편지도 남아 있음)",
  "learn": "한글의 쓰임",
  "fx": {
   "note": "편지지 위에 한글 글자가 한 자씩 떠오른다."
  }
 },
 {
  "id": "RJ08",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions": [
   "!seen(J02)"
  ],
  "conditions_text": "J02 앞",
  "who": {
   "name": "성균관 대사성",
   "doll": "official_blue"
  },
  "line": "유생들이 성리학 책을 두고 밤새 토론하옵니다. 토론 자리를 크게 열어 줄까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 열어 준다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "명륜당 마당에 멍석이 깔리고 이름난 선비들이 모였다."
   },
   "left": {
    "label": "조용히 읽게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "유생들은 각자 방에서 책을 읽었다. 토론은 쪽지로 오갔다."
   }
  },
  "grain": "balance",
  "real_history": "조선은 유교(성리학)를 나라를 다스리는 기본 원리로 삼았다. 성리학은 고려 후기에 원에서 들어온 유학의 한 갈래이다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   },
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 237(교과서 79 한 문장 정리: 유교를 나라를 다스리는 기본 원리로) · [교과서 밖] 지도서 238 참고 자료(성리학)",
  "learn": "조선과 성리학",
  "fx": {
   "note": "명륜당 마루에 유생 인형들이 둘러앉는다."
  }
 },
 {
  "id": "RJ09",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1636",
  "conditions": [
   "seen(J09)"
  ],
  "conditions_text": "J09 뒤",
  "who": {
   "name": "곳간지기",
   "doll": "official_blue"
  },
  "line": "성 안 곳간을 다 열어 보니 쌀이 생각보다 훨씬 적사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "똑같이 나눈다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "신하든 백성이든 같은 됫박으로 쌀을 받았다. 대신 몇이 얼굴을 찌푸렸다."
   },
   "left": {
    "label": "군사부터 먹인다",
    "effects": {
     "army": 10,
     "people": -10
    },
    "this_run": "성벽 위 군사들 밥이 먼저 올라갔다. 성 안 아이들 배가 홀쭉해졌다."
   }
  },
  "grain": "balance",
  "real_history": "병자호란 때 왕과 신하들이 피란한 남한산성은 전쟁 준비가 제대로 되어 있지 않았고 식량도 부족했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 병자호란(남한산성은 전쟁 준비가 제대로 되어 있지 않았고 식량도 부족)",
  "learn": "남한산성",
  "fx": {
   "note": "곳간 문이 열리고 쌀가마 몇 개만 덩그러니 놓여 있다."
  }
 },
 {
  "id": "LJ01",
  "kind": "legend",
  "stages": [
   "seonjo"
  ],
  "rarity": "legend",
  "year": "1592~1640",
  "conditions": [
   "seen(J09) && archive_count >= 20"
  ],
  "conditions_text": "J09 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "성 안의 하루하루를 실록에 적사옵니다. 부끄러운 일까지 다 적을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 적는다",
    "effects": {
     "people": 10
    },
    "this_run": "사관의 붓이 멈추지 않았다. 이 기록이 먼 훗날의 교훈이 되었다."
   },
   "left": {
    "label": "버틴 일을 적는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "추위 속에 버틴 사람들의 이름이 한 줄씩 적혔다."
   }
  },
  "grain": "gift",
  "real_history": "조선은 기록을 중시했다. 《징비록》·《난중일기》·《쇄미록》·《병자일기》 같은 기록 덕분에 오늘날 전쟁을 겪은 사람들의 모습을 알 수 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "guide",
    "page": "237",
    "tb": "79"
   },
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 임진왜란(《징비록》) · 지도서 237(교과서 79) 전쟁 중에 쓴 일기(《쇄미록》·《병자일기》) · [교과서 밖] 지도서 235 수업 도움말(《난중일기》, 조선이 기록을 중시함)",
  "learn": "전쟁의 기록",
  "fx": {
   "note": "사관의 두루마리가 길게 펼쳐지고, 네 권의 책 이름이 금빛으로 떠오른다."
  }
 },
 {
  "id": "LJ02",
  "kind": "legend",
  "stages": [
   "seonjo"
  ],
  "rarity": "legend",
  "year": "1597",
  "conditions": [
   "seen(J06) && !seen(J07) && archive_count >= 20"
  ],
  "conditions_text": "J06 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "이순신",
   "doll": "yisunsin"
  },
  "line": "한 사람이 길목을 잘 지키면, 천 명의 적도 두렵게 할 수 있사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "좁은 물목을 지킨다",
    "effects": {
     "army": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "배들이 좁은 물목에 한 줄로 섰다. 물살이 뱃전을 때렸다."
   },
   "left": {
    "label": "배를 더 모은다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "흩어진 배들을 모으라는 명이 바닷가 고을마다 내려갔다."
   }
  },
  "grain": "complex",
  "real_history": "교과서에는 이순신의 말로 “한 사람이 길목을 잘 지키면, 천 명의 적도 두렵게 할 수 있다!”가 실려 있다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77 이순신의 말)",
  "learn": "이순신과 수군",
  "fx": {
   "note": "좁은 물목에 배 그림자들이 한 줄로 서고, 물살이 소용돌이친다."
  }
 }
]);
})();
