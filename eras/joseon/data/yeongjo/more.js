/* 집필 세션의 add_Y.py에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "DY101",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "이조 관리",
   "doll": "official_green"
  },
  "line": "이번 과거 합격자를 어느 관청에 보낼지 두 붕당 대신들이 서로 데려가겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "고루 나눈다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "두 붕당 관청에 합격자를 고루 나누어 보냈다. 양쪽 대신 모두 조금씩 서운해했다.",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "먼저 청한 쪽에 준다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "먼저 청한 푸른 깃발 대신들 관청으로 합격자들이 갔다.",
    "device": {
     "scale": 2
    }
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "탕평 — 인물을 고루 뽑아 씀",
  "fx": {
   "note": "관청 두 곳 앞에 갓 쓴 인형들이 나뉘어 선다."
  }
 },
 {
  "id": "DY102",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "승지",
   "doll": "official_green"
  },
  "line": "붉은 깃발 대신이 자기 집 잔치에 푸른 깃발 대신을 불러도 되겠냐고 여쭈었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "함께 부르게 한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "두 붕당 대신이 한 상에 앉아 술잔을 나눴다. 말은 적었지만 웃음이 났다.",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "따로 열게 둔다",
    "effects": {
     "people": 5
    },
    "this_run": "잔치는 따로 열렸다. 남은 음식은 이웃 백성들에게 나눠졌다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "붕당 사이의 화합",
  "fx": {
   "note": "기와집 마당에 붉은·푸른 깃발 대신 인형이 마주 앉는다."
  }
 },
 {
  "id": "DY103",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "경연을 맡은 학자",
   "doll": "official_red"
  },
  "line": "오늘 경연(왕과 신하가 함께 책을 읽고 의논하는 자리)에 두 붕당 학자를 함께 부를까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "함께 부른다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "두 붕당 학자가 같은 책을 펴고 앉았다. 의논이 길어져 저녁상이 늦었다.",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "가까운 학자만 부른다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "가까운 학자들만 불러 조용히 책을 읽었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "탕평 정치",
  "fx": {
   "note": "궁궐 마루에 책상이 둘, 서로 다른 깃발 색 관복이 마주 앉는다."
  }
 },
 {
  "id": "DY104",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "승정원 관리",
   "doll": "official_red"
  },
  "line": "두 붕당이 올리는 상소가 너무 많아 승정원 일손이 모자라옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "관리를 더 둔다",
    "effects": {
     "treasury": -10
    },
    "this_run": "상소를 읽을 관리를 더 들였다. 녹봉 장부가 두꺼워졌다."
   },
   "left": {
    "label": "상소를 줄이게 한다",
    "effects": {
     "nobles": -5,
     "people": -5
    },
    "this_run": "상소를 줄이라는 명이 내려갔다. 고을 백성의 억울한 글까지 함께 줄었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치(붕당 간 다툼이 잦아짐) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "붕당 다툼",
  "fx": {
   "note": "승정원 책상 위에 상소 두루마리가 산처럼 쌓인다."
  }
 },
 {
  "id": "DY105",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "두 붕당 젊은 관리들을 한 관청에서 함께 일하게 해 볼까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한 관청에 둔다",
    "effects": {},
    "this_run": "붉은·푸른 깃발 젊은 관리들이 한 방에 책상을 붙였다."
   },
   "left": {
    "label": "따로 보낸다",
    "effects": {
     "treasury": 5
    },
    "this_run": "젊은 관리들은 붕당대로 다른 관청에 갔다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "함께 일하던 젊은 관리들이 서로의 글을 고쳐 주는 사이가 되었다!"
   },
   "lose": {
    "effects": {
     "nobles": -10
    },
    "this_run": "첫날부터 자리다툼이 났다. 관청이 시끄러웠다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "탕평 정치",
  "fx": {
   "note": "관청 마당에 두 색 관복 인형이 나란히 선다. 잘되면 함께 웃고, 안 되면 등을 돌린다."
  }
 },
 {
  "id": "DY106",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "이조 판서",
   "doll": "official_blue"
  },
  "line": "고을 수령을 뽑는데, 붕당 추천보다 백성들 평판을 먼저 보자는 말이 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "평판을 먼저 본다",
    "effects": {
     "people": 5,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "평판을 들으러 관리들이 고을을 돌았다. 길삯이 들었다.",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "추천대로 뽑는다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "붉은 깃발 대신들이 추천한 사람이 수령이 되었다.",
    "device": {
     "scale": -2
    }
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "인물을 고루 뽑아 쓰는 정치",
  "fx": {
   "note": "고을 관아 앞에 새 수령 인형이 선다."
  }
 },
 {
  "id": "DY107",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y01)"
  ],
  "conditions_text": "Y01 뒤(붕당 다툼이 보인 뒤)",
  "who": {
   "name": "푸른 붕당 대신",
   "doll": "official_red"
  },
  "line": "저쪽 대신이 쓴 글에 전하를 깎아내리는 말이 있사옵니다. 벌하소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "글을 다시 읽는다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "this_run": "글을 처음부터 다시 읽게 했다. 깎아내리는 말은 아니었다며 일이 가라앉았다.",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "바로 벌한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "글쓴이가 벼슬에서 물러났다. 푸른 깃발 대신들이 웃었다.",
    "device": {
     "scale": 2
    }
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치(붕당 간 다툼이 잦아짐) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "붕당 다툼",
  "fx": {
   "note": "궁궐 마당에 두루마리 하나가 펼쳐지고 대신들이 모여든다."
  }
 },
 {
  "id": "DY108",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민",
   "doll": "farmer"
  },
  "line": "모내기를 하려면 봄에 물이 넉넉해야 하옵니다. 개울에 보를 새로 막을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "보를 막는다",
    "effects": {
     "treasury": -5
    },
    "this_run": "마을 사람들이 돌과 흙을 날라 개울에 보를 막았다."
   },
   "left": {
    "label": "내년으로 미룬다",
    "effects": {
     "treasury": 5
    },
    "this_run": "보는 내년으로 미루고 하늘만 바라보았다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DY108f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(모내기법) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "모내기법과 물",
  "fx": {
   "note": "개울가에 흙 둑이 한 줄 솟는다."
  }
 },
 {
  "id": "DY108f",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민",
   "doll": "farmer"
  },
  "line": "그때 막은 보 덕에 비가 적은 봄에도 모내기를 마쳤사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "곳간을 채운다",
    "effects": {
     "treasury": 15
    },
    "this_run": "가을 들판이 누렇게 익었다. 곳간에 볏섬이 쌓였다."
   },
   "left": {
    "label": "이웃과 나눈다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "이웃 마을까지 물을 나눠 주었다. 마을끼리 떡을 주고받았다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(모내기법) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "미리 준비한 열매",
  "fx": {
   "note": "보에 고인 물이 반짝이고, 논마다 모가 줄지어 선다."
  }
 },
 {
  "id": "DY109",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민",
   "doll": "farmer"
  },
  "line": "논 한쪽에 인삼을 길러 장에 내다 팔겠다는 농민이 늘었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "팔게 둔다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "인삼밭에 차양이 늘어섰다. 장세는 늘었지만 곡식이 줄어 쌀값이 조금 올랐다."
   },
   "left": {
    "label": "곡식부터 심게 한다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "곡식을 먼저 심게 했다. 쌀값은 내렸지만 장세는 줄었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(인삼·담배·채소 등 상품이 될 작물)",
  "learn": "상품 작물",
  "fx": {
   "note": "논 한쪽에 그늘막을 친 인삼밭이 생긴다."
  }
 },
 {
  "id": "DY110",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_red"
  },
  "line": "담배밭이 늘어 장날마다 담배 장수가 북적이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "담배 장수들이 낸 장세가 곳간에 들어왔다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "people": 10
    },
    "this_run": "장터는 그대로 두었다. 장꾼들이 신이 났다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(인삼·담배·채소 등 상품이 될 작물)",
  "learn": "장시와 상품 작물",
  "fx": {
   "note": "장터 좌판에 담뱃잎 묶음이 매달린다."
  }
 },
 {
  "id": "DY111",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "농민 대표",
   "doll": "farmer"
  },
  "line": "벼를 거둔 논에 보리를 또 심었더니 봄 배고픔이 덜하옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "보리 씨를 나눈다",
    "effects": {
     "people": 10
    },
    "this_run": "보리 씨앗이 마을마다 나뉘었다. 이듬해 봄 보릿고개가 낮아졌다."
   },
   "left": {
    "label": "세금을 조금 받는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "보리에도 조금씩 세금을 받아 곳간을 채웠다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(벼와 보리의 이모작)",
  "learn": "이모작",
  "fx": {
   "note": "추수가 끝난 논에 초록 보리 싹이 돋는다."
  }
 },
 {
  "id": "DY112",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_red"
  },
  "line": "장날마다 힘센 무리가 상인들에게서 자릿세를 뜯는다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "포졸을 보낸다",
    "effects": {
     "army": -5,
     "treasury": -5
    },
    "this_run": "포졸들이 장날마다 장터를 돌았다. 그 무리는 다른 고을로 떠났다."
   },
   "left": {
    "label": "상인들에게 맡긴다",
    "effects": {
     "people": -10
    },
    "this_run": "상인들끼리 막게 두었다. 장사꾼 몇이 장을 옮겼다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(장시) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "장시",
  "fx": {
   "note": "장터 골목에 포졸 인형이 순찰을 돈다."
  }
 },
 {
  "id": "DY113",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "떠돌이 장사꾼",
   "doll": "merchant"
  },
  "line": "소금을 지고 먼 고을 장까지 가 보겠사옵니다. 고갯길 통행을 허락해 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "먼 장까지 보낸다",
    "effects": {},
    "this_run": "장사꾼이 소금 짐을 지고 고갯길을 넘었다."
   },
   "left": {
    "label": "가까운 장만 돈다",
    "effects": {
     "people": 5
    },
    "this_run": "장사꾼은 가까운 장만 돌았다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "treasury": 15
    },
    "this_run": "먼 고을 장에서 소금이 불티나게 팔렸다! 장세가 곳간에 들어왔다."
   },
   "lose": {
    "effects": {
     "people": -10
    },
    "this_run": "고갯길에 비가 내려 소금이 녹아 버렸다. 장사꾼이 빈손으로 돌아왔다."
   }
  },
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   },
   {
    "type": "guide",
    "page": "283"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(장시) · [교과서 밖] 지도서 283 참고 자료(장날을 달리해 행상이 고을을 돎)",
  "learn": "장시와 행상",
  "fx": {
   "note": "고갯길 위로 짐 진 장사꾼 인형이 넘어간다."
  }
 },
 {
  "id": "DY114",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "호조 관리",
   "doll": "official_green"
  },
  "line": "엽전을 너무 많이 찍으면 물건값이 오를까 걱정하는 말이 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "찍는 양을 줄인다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "엽전 찍는 양을 줄였다. 장터에서 \"잔돈이 모자라다\"는 말이 나왔다."
   },
   "left": {
    "label": "더 찍는다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "엽전을 더 찍었다. 장사는 늘었지만 쌀값이 조금 올랐다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(동전을 쓰는 일이 흔해짐) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "상평통보와 장사",
  "fx": {
   "note": "엽전 꾸러미가 장터 좌판 위에서 짤랑인다."
  }
 },
 {
  "id": "DY115",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "!seen(Y07)"
  ],
  "conditions_text": "Y07 앞(신해통공 전)",
  "who": {
   "name": "시전 상인",
   "doll": "merchant"
  },
  "line": "골목마다 허락 없는 가게(난전)가 늘어 시전 장사가 줄었다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "난전을 막는다",
    "effects": {
     "nobles": 5,
     "treasury": 5,
     "people": -10
    },
    "this_run": "포졸들이 난전을 걷어 냈다. 골목 장사꾼들이 짐을 쌌다."
   },
   "left": {
    "label": "두고 본다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "난전을 두고 보았다. 시전 상인들은 투덜댔다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(상업의 발달) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "상업의 발달",
  "fx": {
   "note": "큰길 시전 앞과 골목 좌판이 나란히 보인다."
  }
 },
 {
  "id": "DY116",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "호적을 맡은 관리",
   "doll": "official_green"
  },
  "line": "돈을 모은 노비들이 값을 치르고 상민이 되겠다며 문서를 내밀었사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "문서를 받아 준다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "노비 문서 몇 장이 불살라졌다. 새 상민들이 마을에 집을 지었다."
   },
   "left": {
    "label": "주인에게 맡긴다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "문서는 주인에게 돌아갔다. 노비들은 고개를 숙였다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(상민으로 신분이 오른 천민이 많아짐) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "신분제의 변화",
  "fx": {
   "note": "초가 한 채의 지붕 아래 노비 인형 옷이 상민 옷으로 바뀐다."
  }
 },
 {
  "id": "DY117",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "돈을 내고 남의 집안 족보에 이름을 올리려는 사람이 있다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "막게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "관아가 족보 장사를 막았다. 양반 집안들이 고개를 끄덕였다."
   },
   "left": {
    "label": "모른 척한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "관아는 모른 척했다. 마을에 새 \"양반\"이 늘었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(상민 중에는 양반이 되는 사람도 많이 생김) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "신분제의 변화",
  "fx": {
   "note": "양반 집 사랑방에 두꺼운 족보 책이 펼쳐진다."
  }
 },
 {
  "id": "DY118",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "머슴",
   "doll": "official_green"
  },
  "line": "주인집에서 한 해 일한 값(새경)을 아직 받지 못했사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "주인을 타이른다",
    "effects": {
     "nobles": -10
    },
    "this_run": "관아가 주인을 불러 새경을 주라고 타일렀다. 양반 주인은 얼굴을 붉혔다."
   },
   "left": {
    "label": "관아가 대신 준다",
    "effects": {
     "treasury": -10
    },
    "this_run": "관아가 대신 쌀을 내주었다. 곳간이 조금 줄었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "296"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 296 활동지(머슴·새경 낱말 풀이) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "조선 후기 사람들의 삶",
  "fx": {
   "note": "초가 마당에 머슴 인형이 쌀가마를 받는다."
  }
 },
 {
  "id": "DY119",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "고을 수령",
   "doll": "official_red"
  },
  "line": "천민이었던 상인이 장사로 큰돈을 벌어 마을 앞 개울에 다리를 놓겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다리를 놓게 한다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "돌다리가 놓였다. 양반 몇은 \"천민 출신이 놓은 다리\"라며 수군댔다."
   },
   "left": {
    "label": "양반에게 맡긴다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "다리 놓는 일은 양반 집안에 맡겼다. 일이 한 해 늦어졌다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "283",
    "tb": "95"
   }
  ],
  "sources_text": "지도서 283(교과서 95) 농업과 상업의 발달 · 신분제의 변화(신분 이동이 많이 나타남) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "신분제의 변화",
  "fx": {
   "note": "개울 위에 돌다리가 “뽕”."
  }
 },
 {
  "id": "DY120",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "서당 훈장",
   "doll": "yangban"
  },
  "line": "살림에 여유가 생긴 상민 집 아이들도 서당에 많이 다니옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "책을 보낸다",
    "effects": {
     "people": 10
    },
    "this_run": "서당에 책상이 늘었다. 아이들 글 읽는 소리가 담장을 넘었다."
   },
   "left": {
    "label": "훈장을 더 둔다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "훈장을 한 사람 더 모셔 아이들을 나누어 가르쳤다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   },
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 292(교과서 100) 서민 문화(경제적 여유) · 지도서 245(교과서 81 서당) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "서당과 배움",
  "fx": {
   "note": "서당 마루에 아이 인형들이 빼곡히 앉는다."
  }
 },
 {
  "id": "DY121",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "늙은 대신",
   "doll": "official_red"
  },
  "line": "안경을 쓰니 작은 글씨가 또렷하옵니다. 눈 어두운 대신들에게도 나눠 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "나눠 준다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "대신들이 안경을 코에 걸고 상소를 읽었다. \"글씨가 이렇게 컸나!\""
   },
   "left": {
    "label": "스스로 사게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "안경은 스스로 사게 했다. 값을 듣고 대신 몇이 한숨을 쉬었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96) 새로운 문물의 수용(안경)",
  "learn": "새로운 문물",
  "fx": {
   "note": "대신 인형 얼굴에 동그란 안경이 반짝인다."
  }
 },
 {
  "id": "DY122",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "궁궐 장인",
   "doll": "craftsman"
  },
  "line": "정해진 시각에 종을 울리던 자명종이 멈췄사옵니다. 뜯어보아도 되겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "뜯어보게 한다",
    "effects": {},
    "this_run": "장인이 작은 톱니를 하나하나 늘어놓았다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "자명종은 그대로 장식장에 두었다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "장인이 원리를 깨쳐 자명종이 다시 울렸다! 학자들이 구경하러 몰려왔다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "톱니 하나를 잃어버렸다. 새 자명종 값을 치러야 했다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96) 새로운 문물의 수용(자명종)",
  "learn": "새로운 문물",
  "fx": {
   "note": "책상 위에 톱니바퀴가 흩어져 있다. 잘되면 “땡!”"
  }
 },
 {
  "id": "DY123",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "병조 관리",
   "doll": "official_red"
  },
  "line": "천리경으로 먼 바다와 산을 살피면 봉수대보다 먼저 알 수 있다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "군사에게 준다",
    "effects": {
     "army": 10
    },
    "this_run": "성벽 위 군사가 천리경으로 먼 바다를 살폈다."
   },
   "left": {
    "label": "서운관에 둔다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "천리경은 서운관에 두어 학자들이 하늘을 보게 했다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96) 새로운 문물의 수용(천리경 — 멀리 있는 물체를 가깝게 보는 도구)",
  "learn": "새로운 문물",
  "fx": {
   "note": "성벽 위 군사 인형이 긴 통을 눈에 댄다."
  }
 },
 {
  "id": "DY124",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "실학을 공부하는 선비",
   "doll": "yangban"
  },
  "line": "우리나라 산과 강, 길을 직접 걸어 다니며 지리책을 쓰겠사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길삯을 대 준다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -5
    },
    "this_run": "선비가 지팡이를 짚고 고을마다 산과 강을 적어 왔다."
   },
   "left": {
    "label": "옛 지도를 보게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "선비는 관아에 있는 옛 지도만 보며 책을 썼다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "285",
    "tb": "97"
   }
  ],
  "sources_text": "지도서 285(교과서 97) 실학(실학자들은 우리나라의 역사·지리·언어를 연구함)",
  "learn": "실학",
  "fx": {
   "note": "섬 둘레 길을 따라 작은 선비 인형이 걸어간다."
  }
 },
 {
  "id": "DY125",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "실학을 공부하는 선비",
   "doll": "yangban"
  },
  "line": "우리말 낱말과 그 뜻을 모아 책으로 엮고 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "종이와 먹을 준다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "종이와 먹이 선비 집으로 보내졌다. 낱말 묶음이 두꺼워졌다."
   },
   "left": {
    "label": "경전부터 읽게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "\"경전부터 읽으라\"는 말에 선비는 묵묵히 책을 덮었다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "285",
    "tb": "97"
   }
  ],
  "sources_text": "지도서 285(교과서 97) 실학(우리나라 언어 연구)",
  "learn": "실학",
  "fx": {
   "note": "책상 위 종이에 한글 낱말이 줄줄이 적힌다."
  }
 },
 {
  "id": "DY126",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "청에 다녀온 사신",
   "doll": "official_red"
  },
  "line": "청으로 가는 사신 길이 멀고 험해 짐꾼들이 지쳤사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "짐을 줄인다",
    "effects": {
     "nobles": -10
    },
    "this_run": "보내는 선물을 줄였다. 대신들이 체면이 깎였다며 투덜댔다."
   },
   "left": {
    "label": "짐꾼을 더 둔다",
    "effects": {
     "treasury": -10
    },
    "this_run": "짐꾼을 더 붙여 보냈다. 품삯이 많이 들었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   }
  ],
  "sources_text": "지도서 284(교과서 96) 새로운 문물의 수용(주변 나라들과 다시 교류) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "주변 나라와의 교류",
  "fx": {
   "note": "북쪽 길로 짐 진 사신 행렬이 줄지어 간다."
  }
 },
 {
  "id": "DY127",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "실학을 공부하는 선비",
   "doll": "yangban"
  },
  "line": "청에서 본 것처럼 우리 길도 넓고 반듯하게 닦으면 수레가 다닐 수 있사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "길을 넓혀 본다",
    "effects": {
     "treasury": -5
    },
    "this_run": "시험 삼아 장터로 가는 길 하나를 넓혔다."
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "treasury": 5
    },
    "this_run": "\"우리 땅은 산이 많다\"며 길은 그대로 두었다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DY127f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "286",
    "tb": "98"
   }
  ],
  "sources_text": "지도서 286(교과서 98 박지원: 청의 문물과 기술 — 벽돌집, 잘 정리된 도로)",
  "learn": "실학 — 청의 문물을 배우자",
  "fx": {
   "note": "장터로 가는 길 하나가 반듯하게 넓어진다."
  }
 },
 {
  "id": "DY127f",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "장터 상인",
   "doll": "merchant"
  },
  "line": "그때 넓힌 길로 수레가 오가자 장터 장사가 크게 늘었사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 15
    },
    "this_run": "수레 장사꾼들이 낸 장세가 곳간에 들어왔다."
   },
   "left": {
    "label": "길을 더 넓힌다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "다른 길도 넓히자 마을마다 장터가 가까워졌다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "286",
    "tb": "98"
   }
  ],
  "sources_text": "지도서 286(교과서 98 박지원)",
  "learn": "실학의 열매",
  "fx": {
   "note": "넓은 길 위로 짐수레가 줄지어 오간다."
  }
 },
 {
  "id": "DY128",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "잔치를 맡은 관리",
   "doll": "official_blue"
  },
  "line": "양반들도 판소리를 듣겠다며 소리꾼을 잔치에 불러 달라 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "잔치에 부른다",
    "effects": {
     "nobles": 10
    },
    "this_run": "양반 잔치 마당에 북장단과 소리가 울렸다."
   },
   "left": {
    "label": "장터로 보낸다",
    "effects": {
     "people": 5,
     "treasury": 5
    },
    "this_run": "소리꾼을 장터로 보내 누구나 듣게 했다. 장터가 북적여 장세도 늘었다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100) 서민 문화(판소리는 서민뿐 아니라 양반도 즐김)",
  "learn": "판소리",
  "fx": {
   "note": "잔치 마당에 북 치는 고수와 소리꾼 인형이 선다."
  }
 },
 {
  "id": "DY129",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "세책점 주인",
   "doll": "official_red"
  },
  "line": "빌려 간 책장을 침 묻혀 넘기는 바람에 글자가 지워진 책이 많사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새로 베껴 끼운다",
    "effects": {
     "treasury": -10
    },
    "this_run": "지워진 쪽만 새로 베껴 끼워 넣었다. 품이 많이 들었다."
   },
   "left": {
    "label": "그대로 빌려준다",
    "effects": {
     "people": -5,
     "nobles": -5
    },
    "this_run": "그대로 빌려주었다. 이야기가 끊긴다는 불평이 늘었다."
   }
  },
  "grain": "mire",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "294"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 294 참고 자료(세책본은 손을 많이 타 글자가 지워지지 않게 만듦) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "세책점",
  "fx": {
   "note": "세책점 책상 위에 너덜너덜한 책이 쌓인다."
  }
 },
 {
  "id": "DY130",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "민화를 그리는 사람",
   "doll": "official_blue"
  },
  "line": "오래 살고 복 받기를 비는 글자 그림을 새해에 집집마다 걸겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장터에서 팔게 한다",
    "effects": {
     "treasury": 10
    },
    "this_run": "장터에서 글자 그림이 불티나게 팔렸다."
   },
   "left": {
    "label": "집집마다 나눈다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "가난한 집에도 그림 한 장씩이 돌아갔다. 그림을 그린 선비들도 이름이 났다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "293",
    "tb": "101"
   }
  ],
  "sources_text": "지도서 293(교과서 101) 풍속화와 민화(수복문자도 — 건강하게 오래 살고 복을 받기를 바람)",
  "learn": "민화",
  "fx": {
   "note": "초가 벽마다 ‘壽’·‘福’ 글자 그림이 붙는다."
  }
 },
 {
  "id": "DY131",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "한글 소설을 쓰는 선비",
   "doll": "yangban"
  },
  "line": "새 이야기를 한글로 쓰고 있사옵니다. 다 쓸 때까지 먹을 쌀을 대 주시겠사옵니까?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "쌀을 대 준다",
    "effects": {
     "treasury": -5
    },
    "this_run": "선비 집에 쌀자루가 닿았다. 밤마다 붓 소리가 났다."
   },
   "left": {
    "label": "경전을 권한다",
    "effects": {
     "nobles": 5
    },
    "this_run": "\"소설보다 경전\"이라는 말에 선비는 붓을 내려놓았다."
   }
  },
  "grain": "seed",
  "seed": {
   "fruit_id": "DY131f",
   "after_n": 6,
   "side": "right"
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100) 서민 문화(한글 소설의 인기)",
  "learn": "한글 소설",
  "fx": {
   "note": "초가 창호지에 붓을 든 그림자가 비친다."
  }
 },
 {
  "id": "DY131f",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "세책점 주인",
   "doll": "official_red"
  },
  "line": "그때 그 선비가 쓴 소설을 빌리려고 세책점 앞에 줄이 길게 섰사옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "이야기를 즐긴다",
    "effects": {
     "people": 10,
     "treasury": 5
    },
    "this_run": "장터 사람들이 소설 이야기로 밤을 새웠다. 세책점 장세도 늘었다."
   },
   "left": {
    "label": "세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "책을 빌려주는 값이 장세로 들어왔다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100) 서민 문화(한글 소설의 인기 · 세책점)",
  "learn": "한글 소설의 열매",
  "fx": {
   "note": "세책점 앞에 사람 인형들이 길게 줄을 선다."
  }
 },
 {
  "id": "DY132",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "장터 사람들",
   "doll": "official_red"
  },
  "line": "장날에 탈놀이와 판소리 공연이 겹쳐 장터가 북새통이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "공연 마당을 내준다",
    "effects": {
     "people": 5,
     "treasury": -5,
     "army": -5
    },
    "this_run": "공연 마당을 따로 내주고 포졸들이 길을 정리했다."
   },
   "left": {
    "label": "하나만 하게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "하루에 공연 하나만 하라는 명이 내려갔다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   }
  ],
  "sources_text": "지도서 292(교과서 100) 서민 문화(탈놀이는 사람이 많이 모이는 장터 등에서 공연)",
  "learn": "서민 문화",
  "fx": {
   "note": "장터 두 곳에 구경꾼이 둥글게 모인다."
  }
 },
 {
  "id": "DY133",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "장터와 들판의 사람들 모습을 그린 그림첩을 엮어 보겠사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "그림첩을 엮게 한다",
    "effects": {},
    "this_run": "화원이 붓과 종이를 들고 장터에 쪼그려 앉았다."
   },
   "left": {
    "label": "궁궐 그림만 그린다",
    "effects": {
     "nobles": 5
    },
    "this_run": "화원은 궁궐 행사 그림만 그렸다."
   }
  },
  "grain": "gamble",
  "gamble": {
   "side": "right",
   "win": {
    "effects": {
     "nobles": 15
    },
    "this_run": "그림 속 장터 사람들이 살아 있는 듯했다! 사람들이 그림 앞에서 자기 얼굴을 찾았다."
   },
   "lose": {
    "effects": {
     "treasury": -10
    },
    "this_run": "비에 그림이 젖어 물감이 번졌다. 종이와 물감만 들었다."
   }
  },
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "293",
    "tb": "101"
   }
  ],
  "sources_text": "지도서 293(교과서 101) 풍속화와 민화(풍속화 — 조선 후기 사람들의 생활 모습)",
  "learn": "풍속화",
  "fx": {
   "note": "종이 위에 장터 사람들 모습이 먹선으로 하나씩 그려진다."
  }
 },
 {
  "id": "DY134",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "who": {
   "name": "민화를 그리는 사람",
   "doll": "official_blue"
  },
  "line": "호랑이와 까치 그림을 대문에 붙이면 나쁜 일을 막는다며 다들 찾사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "정월에 나눠 준다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "정월에 집집마다 호랑이와 까치 그림이 붙었다."
   },
   "left": {
    "label": "값을 받게 한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "그림 값을 그대로 받게 했다. 가난한 집은 사지 못했다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "293",
    "tb": "101"
   }
  ],
  "sources_text": "지도서 293(교과서 101) 풍속화와 민화(<호랑이와 까치> — 나쁜 운을 물리치고 복을 부름)",
  "learn": "민화",
  "fx": {
   "note": "대문마다 호랑이와 까치 그림이 붙는다."
  }
 },
 {
  "id": "DY135",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y07) && !seen(Y09)"
  ],
  "conditions_text": "Y07 뒤, Y09 앞(화성을 쌓을 무렵)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "공사장 일꾼 품삯을 날마다 줄까요, 일이 끝난 뒤 한꺼번에 줄까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "날마다 준다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "일꾼들이 저녁마다 품삯을 받아 집으로 쌀을 사 갔다."
   },
   "left": {
    "label": "끝나고 준다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "일꾼들은 끝날 날만 손꼽아 기다렸다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "지도서 282 참고 자료(공사에 동원된 백성들에게 품삯을 줌)",
  "learn": "수원 화성과 품삯",
  "fx": {
   "note": "공사장 한쪽에 품삯 엽전을 나누는 줄이 선다."
  }
 },
 {
  "id": "DY136",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y08)"
  ],
  "conditions_text": "Y08 뒤(화성을 쌓은 뒤)",
  "who": {
   "name": "거중기를 돌리는 일꾼",
   "doll": "craftsman"
  },
  "line": "거중기 덕분에 무거운 돌을 사람 힘의 몇 배로 쉽게 들어 올리옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "일꾼에게 상을 준다",
    "effects": {
     "people": 10
    },
    "this_run": "일꾼들에게 떡과 술이 내려졌다."
   },
   "left": {
    "label": "다른 공사에도 쓴다",
    "effects": {
     "treasury": 10
    },
    "this_run": "거중기를 다른 공사에도 빌려주어 품삯을 아꼈다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "288"
   }
  ],
  "sources_text": "지도서 288 활동지(거중기 — 도르래로 무거운 물건을 들어 올림)",
  "learn": "거중기",
  "fx": {
   "note": "거중기 도르래가 돌며 큰 돌이 스르륵 올라간다."
  }
 },
 {
  "id": "DY137",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y07) && !seen(Y09)"
  ],
  "conditions_text": "Y07 뒤, Y09 앞(화성을 쌓을 무렵)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "돌을 캐던 산에 큰비가 와 돌 나르는 길이 무너졌사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "새 길을 낸다",
    "effects": {
     "treasury": -10
    },
    "this_run": "새 길을 내느라 품삯이 더 들었다."
   },
   "left": {
    "label": "공사를 쉰다",
    "effects": {
     "army": -5,
     "people": -5
    },
    "this_run": "공사를 며칠 쉬었다. 성벽 쌓는 군사와 일꾼이 기다리기만 했다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "큰 공사의 어려움",
  "fx": {
   "note": "산비탈 흙길이 무너져 있고, 돌수레가 멈춰 서 있다."
  }
 },
 {
  "id": "DY138",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y08)"
  ],
  "conditions_text": "Y08 뒤(화성을 쌓은 뒤)",
  "who": {
   "name": "수원 고을 수령",
   "doll": "official_green"
  },
  "line": "화성 둘레에 장터와 마을을 크게 열면 사람이 모일 것이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장터를 연다",
    "effects": {
     "treasury": 10,
     "people": 5,
     "nobles": -5
    },
    "this_run": "화성 안팎에 장터가 서고 마을이 커졌다. 한양 양반들은 시큰둥했다."
   },
   "left": {
    "label": "성만 지키게 한다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "성만 지키게 했다. 성 안이 조용했다."
   }
  },
  "grain": "complex",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치(정조가 수원에 화성을 건설) · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "수원 화성",
  "fx": {
   "note": "화성 성벽 둘레에 장터 천막과 초가가 늘어난다."
  }
 },
 {
  "id": "DY139",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y09)"
  ],
  "conditions_text": "Y09 뒤(화성 행차 뒤)",
  "who": {
   "name": "길가의 백성",
   "doll": "farmer"
  },
  "line": "행차 길가에 백성들이 몰려들어 억울한 일을 아뢰겠다 하옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "말을 들어 준다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "행렬이 멈추고 백성들의 말을 들었다. 대신들은 \"법도에 어긋난다\"며 수군댔다."
   },
   "left": {
    "label": "길을 비키게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "군사들이 길을 비키게 했다. 백성들은 뒤에서 행렬을 바라보았다."
   }
  },
  "grain": "balance",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "백성의 목소리",
  "fx": {
   "note": "긴 행렬 옆에 백성 인형들이 엎드려 있다."
  }
 },
 {
  "id": "DY140",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y09)"
  ],
  "conditions_text": "Y09 뒤(화성 행차 뒤)",
  "who": {
   "name": "화성 장터 상인",
   "doll": "merchant"
  },
  "line": "행차 덕에 화성 장터가 사람으로 넘치옵니다!",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "장세를 걷는다",
    "effects": {
     "treasury": 10
    },
    "this_run": "장세가 곳간에 들어왔다."
   },
   "left": {
    "label": "잔치를 연다",
    "effects": {
     "people": 10
    },
    "this_run": "장터에 잔치가 열렸다. 풍물 소리가 밤까지 이어졌다."
   }
  },
  "grain": "gift",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치 · 일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "화성과 장터",
  "fx": {
   "note": "화성 장터 천막 사이로 사람 인형들이 북적인다."
  }
 },
 {
  "id": "DY141",
  "kind": "daily",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "conditions": [
   "seen(Y09)"
  ],
  "conditions_text": "Y09 뒤(화성 행차 뒤)",
  "who": {
   "name": "배다리를 맡은 관리",
   "doll": "official_green"
  },
  "line": "배다리에 쓴 배들을 주인에게 돌려줘야 하는데 몇 척이 상했사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "값을 물어 준다",
    "effects": {
     "treasury": -10
    },
    "this_run": "나라에서 상한 배 값을 물어 주었다."
   },
   "left": {
    "label": "주인이 고치게 한다",
    "effects": {
     "people": -10
    },
    "this_run": "배 주인들에게 스스로 고치게 했다. 사공들이 투덜댔다."
   }
  },
  "grain": "mire",
  "out_of_textbook": false,
  "sources": [],
  "sources_text": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "learn": "배다리",
  "fx": {
   "note": "강가에 배 몇 척이 뒤집혀 고쳐지고 있다."
  }
 },
 {
  "id": "CY01a",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "1725",
  "conditions": [
   "seen(Y00) && !seen(Y03)"
  ],
  "conditions_text": "Y00 뒤, Y03 앞(영조 초)",
  "who": {
   "name": "남쪽 고을의 책 장수",
   "doll": "general"
  },
  "line": "소설을 나무판에 새겨 여러 권 찍어 팔겠사옵니다. 허락해 주시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "찍어 팔게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "장터에 같은 소설책이 여러 권 놓였다. 양반 몇은 \"책을 장사에 쓴다\"며 혀를 찼다."
   },
   "left": {
    "label": "베껴 쓰게 둔다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "소설은 여전히 손으로 베낀 몇 권만 돌았다."
   }
  },
  "grain": "balance",
  "real_history": "돈을 벌려고 민간에서 나무판에 새겨 펴낸 책을 방각본이라 한다. 처음 나온 방각본 소설은 1725년 전라도 나주에서 펴낸 《구운몽》이다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "294"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 294 참고 자료(조선 후기 한글 소설의 유행 — 우리역사넷)",
  "learn": "소설이 널리 읽히다 — 방각본",
  "fx": {
   "note": "장터 좌판에 같은 표지의 책이 차곡차곡 쌓인다."
  },
  "chain": "나무판에 새긴 소설"
 },
 {
  "id": "CY01b",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "1780",
  "conditions": [
   "seen(CY01a) && seen(Y05)"
  ],
  "conditions_text": "CY01a를 본 생에서 Y05 뒤 반드시 한 번",
  "who": {
   "name": "한양의 책 장수",
   "doll": "general"
  },
  "line": "이번에는 한양에서 한글 소설을 나무판에 새겨 찍겠사옵니다!",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "장터마다 보낸다",
    "effects": {
     "people": 10
    },
    "this_run": "한글 소설책이 장터마다 퍼졌다. 글을 막 배운 아이들도 책장을 넘겼다."
   },
   "left": {
    "label": "세책점에 먼저 준다",
    "effects": {
     "treasury": 10
    },
    "this_run": "세책점들이 앞다투어 책을 사 갔다. 장세가 늘었다."
   }
  },
  "grain": "gift",
  "real_history": "가장 이른 한글 방각본 소설로 알려진 것은 1780년 서울에서 펴낸 《임경업전》이다. 방각본 소설은 주로 경제 활동이 활발한 곳에서 펴냈다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "294"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 294 참고 자료(조선 후기 한글 소설의 유행 — 우리역사넷)",
  "learn": "한글 소설의 유행",
  "fx": {
   "note": "한양 장터 좌판에 한글 책이 산처럼 쌓인다."
  },
  "chain": "나무판에 새긴 소설",
  "force": true
 },
 {
  "id": "CY02a",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "18세기",
  "conditions": [
   "seen(Y02)"
  ],
  "conditions_text": "Y02 뒤",
  "who": {
   "name": "필사쟁이",
   "doll": "official_red"
  },
  "line": "소설을 베껴 써 달라는 일감이 넘치옵니다. 관청 문서 베끼는 일보다 낫다는 사람이 많사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "일감을 두게 한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "필사쟁이들이 장터 골목에 책상을 펴고 소설을 베꼈다."
   },
   "left": {
    "label": "관청 일부터 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "필사쟁이들은 관청 문서부터 베꼈다. 소설은 밤에만 베꼈다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CY02b",
   "after_n": 4
  },
  "real_history": "한글 소설이 인기를 끌면서 소설을 쓰는 작가, 소설을 베껴 써 주는 필사자, 소설을 읽어 주는 전기수, 책을 사고파는 거간꾼 같은 새 직업이 생겨났다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "294"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 294 참고 자료(조선 후기 한글 소설의 유행 — 우리역사넷)",
  "learn": "한글 소설과 새 직업",
  "fx": {
   "note": "장터 골목에 붓을 든 인형들이 책상을 줄지어 편다."
  },
  "chain": "소설이 만든 새 일거리"
 },
 {
  "id": "CY02b",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "18세기",
  "conditions": [
   "seen(CY02a)"
  ],
  "conditions_text": "CY02a 4장 뒤",
  "who": {
   "name": "역관",
   "doll": "jungin"
  },
  "line": "중국 소설을 우리말로 옮겨 달라는 사람들이 찾아오옵니다. 옮겨도 되겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "옮기게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "우리말로 옮긴 소설이 장터에 나왔다. 사람들이 낯선 나라 이야기에 빠졌다."
   },
   "left": {
    "label": "사신 일에 쓴다",
    "effects": {
     "nobles": 5,
     "army": 5
    },
    "this_run": "역관은 사신 길 통역을 먼저 맡았다. 소설 일은 짬짬이 했다."
   }
  },
  "grain": "gift",
  "real_history": "중국 소설을 우리말로 옮기는 번역가도 새 직업으로 나타났다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "294"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 294 참고 자료(조선 후기 한글 소설의 유행 — 우리역사넷)",
  "learn": "한글 소설과 새 직업",
  "fx": {
   "note": "책상 위 한자 책 옆에 한글로 옮긴 책이 한 권씩 쌓인다."
  },
  "chain": "소설이 만든 새 일거리"
 },
 {
  "id": "CY03a",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1796~1801",
  "conditions": [
   "seen(Y08)"
  ],
  "conditions_text": "Y08 뒤",
  "who": {
   "name": "공사 기록을 맡은 관리",
   "doll": "official_red"
  },
  "line": "화성 공사에 쓴 돈과 일꾼 이름까지 모두 적어 책으로 남길까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 적는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "관리들이 장부를 펼쳐 일꾼 이름을 한 사람씩 옮겨 적었다."
   },
   "left": {
    "label": "줄여 적는다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "큰 줄기만 적었다. 책은 얇아졌다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CY03b",
   "after_n": 3
  },
  "real_history": "정조는 정약용 등 학자들과 함께 새로운 과학 기술과 기구를 이용해 수원 화성을 건설했다. 화성은 일제 강점기와 전쟁으로 훼손되었지만, 공사 기록인 《화성성역의궤》를 바탕으로 복원되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 282 참고 자료(수원 화성 — 《화성성역의궤》를 바탕으로 복원)",
  "learn": "기록의 힘 — 《화성성역의궤》",
  "fx": {
   "note": "책상 위 장부에서 일꾼 이름들이 금빛으로 한 줄씩 떠오른다."
  },
  "chain": "화성을 기록하다"
 },
 {
  "id": "CY03b",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1796~1801",
  "conditions": [
   "seen(CY03a)"
  ],
  "conditions_text": "CY03a 3장 뒤",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "기록 책에 거중기와 성문 모습을 그림으로도 넣겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그림까지 넣는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "거중기의 도르래 하나, 성문 돌 하나까지 그림으로 남았다."
   },
   "left": {
    "label": "글로만 남긴다",
    "effects": {
     "treasury": 5,
     "people": 5
    },
    "this_run": "그림 대신 글을 길게 적었다. 남은 물감은 서당 아이들에게 갔다."
   }
  },
  "grain": "gift",
  "real_history": "수원 화성은 과학 기술뿐 아니라 건축물의 예술적 가치도 인정받았고, 남은 기록 덕분에 무너진 곳을 옛 모습대로 다시 쌓을 수 있었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   },
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "지도서 282(교과서 94) · [교과서 밖] 지도서 282 참고 자료(《화성성역의궤》로 복원)",
  "learn": "기록의 힘",
  "fx": {
   "note": "펼쳐진 책 위로 거중기 그림이 떠오르고, 화성 성벽에 금빛이 한 번 스친다."
  },
  "chain": "화성을 기록하다"
 },
 {
  "id": "CY04a",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "1794~1796",
  "conditions": [
   "seen(Y08)"
  ],
  "conditions_text": "Y08 뒤",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "도르래로 물건을 높은 곳까지 옮기는 녹로를 더 만들어 성벽 위 일을 돕게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "녹로를 더 만든다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "성벽 곁에 녹로가 여럿 섰다. 기와와 돌이 성벽 위로 술술 올라갔다."
   },
   "left": {
    "label": "있는 것으로 한다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "녹로 하나를 번갈아 썼다. 성벽 위 일이 조금 더뎠다."
   }
  },
  "grain": "seed",
  "chain_next": {
   "card": "CY04b",
   "after_n": 3
  },
  "real_history": "녹로는 도르래를 이용해 물건을 높은 곳으로 옮기는 장치로, 거중기와 함께 수원 화성 공사에 쓰였다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "282"
   },
   {
    "type": "guide",
    "page": "288"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 282 참고 자료(거중기·녹로) · 지도서 288 활동지(녹로)",
  "learn": "수원 화성의 과학 기술",
  "fx": {
   "note": "성벽 곁 높은 나무틀 위로 바구니가 도르래를 타고 올라간다."
  },
  "chain": "녹로와 공심돈"
 },
 {
  "id": "CY04b",
  "kind": "chain",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "year": "1796",
  "conditions": [
   "seen(CY04a)"
  ],
  "conditions_text": "CY04a 3장 뒤",
  "who": {
   "name": "성을 지키는 군관",
   "doll": "general"
  },
  "line": "성벽 위 가운데가 빈 망루(공심돈)에 오르니 성 안팎이 한눈에 보이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "군사를 더 둔다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "공심돈 창마다 군사가 서서 먼 길을 살폈다."
   },
   "left": {
    "label": "한 사람만 둔다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "공심돈에는 군사 한 사람만 번갈아 섰다."
   }
  },
  "grain": "balance",
  "real_history": "공심돈은 성 안팎을 감시하는 높은 건물로, 가운데가 비어 있는 구조이다. 지금 남아 있는 우리나라 성곽 가운데 수원 화성에서만 볼 수 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "288"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 288 활동지(수원 서북공심돈)",
  "learn": "수원 화성의 공심돈",
  "fx": {
   "note": "화성 모서리 둥근 망루의 창마다 불빛이 켜진다."
  },
  "chain": "녹로와 공심돈"
 },
 {
  "id": "RY01",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1794",
  "conditions": [
   "seen(Y07) && !seen(Y09)"
  ],
  "conditions_text": "Y07 뒤, Y09 앞(화성을 쌓을 무렵)",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "화성의 정문을 어느 쪽에 둘까요? 보통은 남쪽 문을 정문으로 삼사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "북문을 정문 삼는다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "한양에서 오는 길을 따라 북문이 크고 높게 세워졌다."
   },
   "left": {
    "label": "남문을 정문 삼는다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "남문을 정문으로 삼았다. 한양에서 오는 행렬은 성을 반 바퀴 돌아야 했다."
   }
  },
  "grain": "balance",
  "real_history": "수원 화성은 한양의 남쪽에 있어서 왕이 한양에서 행차할 때 북문을 먼저 만나게 된다. 그래서 북문인 장안문이 정문이 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 282 자료 해설(장안문이 정문이 된 까닭)",
  "learn": "수원 화성 장안문",
  "fx": {
   "note": "화성 북쪽에 2층 문루가 “뽕” 솟는다."
  }
 },
 {
  "id": "RY02",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "18세기",
  "conditions_text": "아무 때나",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "서당에서 나이가 다른 아이들이 함께 공부하는 모습을 그려 보겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "그리게 한다",
    "effects": {
     "people": 10
    },
    "this_run": "훈장 앞에서 훌쩍이는 아이와 웃음을 참는 아이들이 그림에 담겼다."
   },
   "left": {
    "label": "서당에 책을 보낸다",
    "effects": {
     "nobles": 5,
     "people": 5
    },
    "this_run": "그림 대신 서당마다 책 한 묶음씩이 보내졌다."
   }
  },
  "grain": "gift",
  "real_history": "김홍도의 <서당>에는 오늘날과 달리 여러 나이의 학생들이 함께 공부하는 모습이 담겨 있다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 245(교과서 81 김홍도 <서당>)",
  "learn": "풍속화로 보는 서당",
  "fx": {
   "note": "종이 위에 서당 아이들 모습이 먹선으로 그려진다."
  }
 },
 {
  "id": "RY03",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1602 이후",
  "conditions_text": "아무 때나",
  "who": {
   "name": "실학을 공부하는 선비",
   "doll": "yangban"
  },
  "line": "명에서 서양 신부와 함께 만든 세계지도가 들어왔사옵니다. 크게 다시 그려 궁에 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 그려 둔다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -5
    },
    "this_run": "병풍만 한 세계지도가 궁궐 벽에 펼쳐졌다. 대신들이 지도 앞에서 한참 서 있었다."
   },
   "left": {
    "label": "작은 것만 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "작은 지도 한 장이 서고에 들어갔다."
   }
  },
  "grain": "complex",
  "real_history": "<곤여만국전도>는 1602년 이탈리아인 신부 마테오 리치와 명의 이지조가 함께 만들어 목판으로 찍어 펴낸 세계지도로, 조선에도 전해졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "284"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 284 자료 해설(<곤여만국전도>)",
  "learn": "세계관의 변화",
  "fx": {
   "note": "궁궐 벽에 둥근 세계지도 두 장이 나란히 펼쳐진다."
  }
 },
 {
  "id": "RY04",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1788 무렵",
  "conditions": [
   "seen(Y05)"
  ],
  "conditions_text": "Y05 뒤(정조)",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "금강산 경치를 그려 오라 하시면 두루마리를 메고 길을 떠나겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "금강산으로 보낸다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "화원이 돌아와 긴 두루마리를 펼치자 금강산 봉우리가 줄지어 나타났다."
   },
   "left": {
    "label": "궁 행사를 그린다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "화원은 궁궐 잔치 그림을 그렸다."
   }
  },
  "grain": "balance",
  "real_history": "김홍도는 정조의 명을 받고 김응환과 함께 금강산에 가서, 그 경치를 수십 장이나 되는 긴 두루마리에 그려 바쳤다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "295"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 295 참고 자료(김홍도의 생애와 활동 — 《한국사를 움직인 100인》)",
  "learn": "화원 김홍도",
  "fx": {
   "note": "두루마리가 길게 풀리며 산봉우리 그림이 이어진다."
  }
 },
 {
  "id": "RY05",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "조선 후기",
  "conditions_text": "아무 때나",
  "who": {
   "name": "양반 집 어른",
   "doll": "yangban"
  },
  "line": "사랑방에는 책과 문방구 그림을, 안방에는 꽃과 새 그림을 걸겠다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "책가도를 권한다",
    "effects": {
     "nobles": 10
    },
    "this_run": "사랑방 벽에 책장 그림이 걸렸다. 손님들이 그림 속 책 제목을 읽으려 했다."
   },
   "left": {
    "label": "화조도를 권한다",
    "effects": {
     "people": 10
    },
    "this_run": "안방에 꽃과 새가 어우러진 그림이 걸렸다. 집안이 환해졌다."
   }
  },
  "grain": "gift",
  "real_history": "민화 가운데 책과 문방구를 그린 책가도는 사랑방 장식으로, 꽃과 새가 어우러진 화조도는 화목을 비는 뜻으로 신혼 방이나 안방에 걸었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "295"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 295 참고 자료(풍속화와 민화의 유행)",
  "learn": "민화",
  "fx": {
   "note": "기와집 방 벽에 그림 두 폭이 걸린다."
  }
 },
 {
  "id": "RY06",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1760년 무렵",
  "conditions": [
   "seen(Y01) && !seen(Y04)"
  ],
  "conditions_text": "Y01 뒤, Y04 앞(영조)",
  "who": {
   "name": "안산의 선비 화가",
   "doll": "yangban"
  },
  "line": "그림 잘 그리는 어린아이 하나를 제자로 받아 가르치겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "제자로 보낸다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "어린 제자가 스승 곁에서 붓 잡는 법부터 배웠다."
   },
   "left": {
    "label": "도화서에서 배운다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "아이는 도화서에 들어가 선배 화원들 심부름부터 했다."
   }
  },
  "grain": "balance",
  "real_history": "김홍도는 경기도 안산에 머물던 강세황에게서 그림을 배워 20대에 도화서 화원이 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "295"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 295 참고 자료(김홍도의 생애와 활동 — 《한국사를 움직인 100인》)",
  "learn": "화원 김홍도",
  "fx": {
   "note": "초가 마루에 스승과 어린 제자 인형이 나란히 앉아 붓을 든다."
  }
 },
 {
  "id": "RY07",
  "kind": "rare",
  "stages": [
   "yeongjo"
  ],
  "rarity": "uncommon",
  "year": "1795",
  "conditions": [
   "seen(Y09)"
  ],
  "conditions_text": "Y09 뒤",
  "who": {
   "name": "도화서 화원",
   "doll": "jungin"
  },
  "line": "화성 행차 모습을 그림으로 남기겠사옵니다. 행렬 사람 하나하나까지 그릴까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "하나하나 그린다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -10
    },
    "this_run": "깃발 든 군사부터 북 치는 사람까지 긴 그림에 담겼다."
   },
   "left": {
    "label": "큰 줄기만 그린다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "행렬의 큰 모양만 그렸다. 그림은 빨리 끝났다."
   }
  },
  "grain": "complex",
  "real_history": "김홍도는 《원행을묘정리의궤》와 <화성전도> 같은 나라의 중요한 행사를 그림으로 그렸다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "295"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 295 참고 자료(김홍도의 생애와 활동 — 《한국사를 움직인 100인》)",
  "learn": "그림으로 남긴 화성 행차",
  "fx": {
   "note": "긴 두루마리 위로 깃발 행렬 그림이 이어진다."
  }
 },
 {
  "id": "LY01",
  "kind": "legend",
  "stages": [
   "yeongjo"
  ],
  "rarity": "legend",
  "year": "1742",
  "conditions": [
   "seen(Y02) && archive_count >= 20"
  ],
  "conditions_text": "Y02 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "두 붕당 대신이 한 상에 앉아 같은 음식을 먹은 날을 실록에 적사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 적는다",
    "effects": {
     "nobles": 10
    },
    "this_run": "사관의 붓이 또박또박 움직였다. \"이날 두 깃발이 한 상에 앉았다.\"",
    "device": {
     "scaleToward": 1
    }
   },
   "left": {
    "label": "백성 이야기도 적는다",
    "effects": {
     "people": 10
    },
    "this_run": "그날 장터에서 백성들이 나눈 이야기도 함께 적혔다."
   }
  },
  "grain": "gift",
  "real_history": "영조와 정조는 특정 붕당에 치우치지 않고 인물을 고루 뽑아 쓰는 탕평 정치를 펼쳐, 붕당 간의 대립을 줄이고 정치를 안정시키려고 노력했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94)",
  "learn": "탕평 정치",
  "fx": {
   "note": "사관의 두루마리 위에 붉은 깃발과 푸른 깃발이 나란히 그려진다."
  }
 },
 {
  "id": "LY02",
  "kind": "legend",
  "stages": [
   "yeongjo"
  ],
  "rarity": "legend",
  "year": "1796",
  "conditions": [
   "seen(Y08) && archive_count >= 20"
  ],
  "conditions_text": "Y08 뒤, 기록관 20권 뒤부터",
  "who": {
   "name": "사관",
   "doll": "sagwan"
  },
  "line": "화성의 돌 하나, 문 하나까지 적사옵니다. 먼 훗날 누군가 이 기록을 펼쳐 볼 것이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모두 적는다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "두꺼운 기록 책이 여러 권 엮였다."
   },
   "left": {
    "label": "그림으로 남긴다",
    "effects": {
     "people": 5,
     "nobles": 5
    },
    "this_run": "성문과 성벽 그림이 기록 책 사이사이에 들어갔다."
   }
  },
  "grain": "complex",
  "real_history": "수원 화성은 과학 기술뿐 아니라 건축물의 예술적 가치도 인정받아 유네스코 세계 유산에 등재되었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94)",
  "learn": "수원 화성의 가치",
  "fx": {
   "note": "화성 성벽 위로 금빛 글씨가 한 줄 지나간다."
  }
 }
]);
})();
