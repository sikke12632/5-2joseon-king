/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "T00",
  "kind": "sagwan",
  "stages": [
   "taejo"
  ],
  "order": 0,
  "year": "고려 말",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "고려 말, 일부 세력이 많은 땅을 차지하고 노비를 크게 늘려 나라 살림이 나빠졌다. 홍건적과 왜구를 물리치며 이름을 떨친 장수가 있었으니, 이성계다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   }
  ],
  "sources_text": "지도서 232(교과서 74 그림: 고려 말 상황과 건국 과정)",
  "learn": "고려 말의 혼란과 이성계의 성장",
  "fx": {
   "prebuilt": true,
   "note": "수묵 번짐 하늘에서 빈 섬이 구름을 뚫고 떠오른다. 섬 위에는 초가 몇 채뿐."
  }
 },
 {
  "id": "T01",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 1,
  "year": "1392 봄",
  "who": {
   "name": "이방원",
   "doll": "bangwon"
  },
  "line": "아버님, 정몽주 대감이 새 나라를 끝까지 반대하옵니다. 한 번 더 설득해 보시겠습니까?",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "찾아가 설득한다",
    "effects": {
     "nobles": 10,
     "army": -5
    },
    "this_run": "전하는 정몽주를 찾아가 마음을 물었지만 → 정몽주는 고려를 향한 뜻을 굽히지 않았고 → 이방원 쪽 사람들이 먼저 움직였다 → 전하의 마음이 무거워졌다."
   },
   "left": {
    "label": "설득을 멈춘다",
    "effects": {
     "army": 10,
     "nobles": -15
    },
    "this_run": "전하가 설득을 멈추자 → 고려를 따르던 신하들이 등을 돌렸고 → 이방원 쪽이 일을 서둘렀다 → 조정에 차가운 바람이 불었다."
   }
  },
  "against": "right",
  "grain": "balance",
  "event_type": "life",
  "event": "정몽주",
  "paths": {
   "real": {
    "how_right": "찾아가 설득한다",
    "how_left": "설득을 멈춘다"
   },
   "alt": [
    {
     "id": "T01a1",
     "label": "정몽주를 곁에 둔다",
     "effects": {
      "nobles": 10,
      "army": -10
     },
     "lock_reason": "고려를 따르는 신하들의 힘이 모자란다",
     "set_flag": "F_정몽주",
     "merge_text": "정몽주는 끝내 새 나라의 벼슬을 받지 않고 물러났다(이번 판).",
     "unlock": "gauge(nobles) >= 60 && gauge(army) <= 50",
     "variants": {
      "T02": "T02v1"
     },
     "this_run": "정몽주가 반대하는 대신으로 남는다."
    }
   ]
  },
  "real_history": "정몽주는 끝내 뜻을 굽히지 않았고, 1392년 이방원 쪽 사람들에 의해 세상을 떠났다. 두 사람이 시조(하여가·단심가)를 주고받았다는 이야기와 그 장소가 선죽교라는 이야기는 뒷날 전해진 것이다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정몽주'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050190"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code="
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '정몽주' https://encykorea.aks.ac.kr/Article/E0050190 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code=",
  "learn": "건국 과정에는 고려를 지키려던 사람과의 갈등도 있었다",
  "fx": {
   "note": "저녁 하늘. 섬 끝에 걸린 고려 깃발이 천천히 내려간다(사람·장면은 그리지 않음)."
  }
 },
 {
  "id": "T02",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 2,
  "year": "1392",
  "who": {
   "name": "",
   "doll": "jeong"
  },
  "line": "새 나라는 유교의 가르침으로 다스려야 하옵니다. 한꺼번에 바꿀까요, 천천히 바꿀까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "한꺼번에 바꾼다",
    "effects": {
     "nobles": 15,
     "people": -10
    },
    "this_run": "절의 땅과 노비가 한꺼번에 줄자, 절에 다니던 백성들이 서운해했다."
   },
   "left": {
    "label": "천천히 바꾼다",
    "effects": {
     "nobles": -10,
     "people": 5
    },
    "this_run": "옛 풍습을 한동안 두었더니, 새 나라를 세운 신하들이 답답해했다."
   }
  },
  "grain": "balance",
  "event_type": "normal",
  "event": "유교 원리",
  "paths": {
   "real": {
    "require": {
     "sprout": "gauge(nobles) >= 20",
     "normal": "gauge(nobles) >= 35",
     "sage": "gauge(nobles) >= 45 && gauge(people) >= 30",
     "annals": "gauge(nobles) >= 50 && gauge(people) >= 35"
    },
    "require_reason": "유교를 따르는 신하들의 힘이 모자란다",
    "how_right": "한꺼번에 바꾼다",
    "how_left": "천천히 바꾼다"
   },
   "alt": [
    {
     "id": "T02a1",
     "label": "불교와 함께 다스린다",
     "effects": {
      "nobles": -10,
      "people": 10
     },
     "lock_reason": "백성들의 지지가 더 필요하다",
     "set_flag": "F_불교",
     "merge_text": "그래도 나라를 다스리는 뼈대는 점점 유교로 바뀌어 갔다(이번 판).",
     "unlock": "gauge(people) >= 60",
     "build": [
      "altTemple"
     ],
     "variants": {
      "T08": "T08v1"
     },
     "this_run": "큰 절이 남고 성균관이 작아진다."
    }
   ]
  },
  "real_history": "조선은 유교 사상을 나라를 다스리는 기본 원리로 삼았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "232",
    "tb": "74"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "guide",
    "page": "228"
   }
  ],
  "sources_text": "지도서 232(교과서 74) 유교 사상을 기본 원리로 삼음 · 228 고려 때 컸던 불교의 비중이 줄어듦 / 인물 정도전: 지도서 238",
  "learn": "조선 건국과 유교 통치 원리",
  "fx": {
   "flag": true,
   "note": "섬 한가운데 붉은 왕기가 꽂히고, 왕 인형이 익선관을 쓴다. 하늘이 새벽빛으로 밝아진다."
  }
 },
 {
  "id": "T03",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 3,
  "year": "1392~1393",
  "who": {
   "name": "외교 문서를 맡은 신하",
   "doll": "official_blue"
  },
  "line": "명에 새 나라 이름 후보로 ‘조선’과 ‘화령’을 적어 보내려 하옵니다. 사신을 서둘러 보낼까요, 예물을 갖춰 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 보낸다",
    "effects": {
     "treasury": 5,
     "army": 5,
     "nobles": -5
    },
    "this_run": "사신이 서둘러 떠나느라 예물이 조금 모자랐다."
   },
   "left": {
    "label": "예물 갖춰 보낸다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "예물을 넉넉히 갖추느라 곳간이 가벼워졌다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "event": "국호",
  "paths": {
   "real": {
    "require": {
     "sprout": "gauge(army) >= 15",
     "normal": "gauge(army) >= 30",
     "sage": "gauge(army) >= 40 && gauge(nobles) >= 30 && real(T02)",
     "annals": "gauge(army) >= 45 && gauge(nobles) >= 35 && real(T02)"
    },
    "require_reason": "명과의 외교를 받쳐 줄 힘이 모자란다",
    "how_right": "서둘러 보낸다",
    "how_left": "예물 갖춰 보낸다"
   },
   "alt": [
    {
     "id": "T03a1",
     "label": "고려 이름을 쓴다",
     "effects": {
      "army": -10,
      "nobles": 5
     },
     "lock_reason": "옛 신하들의 바람이 모자란다",
     "set_flag": "F_국호",
     "merge_text": "다음 임금 때 나라 이름을 조선으로 고쳤다(이번 판).",
     "unlock": "gauge(nobles) >= 55",
     "this_run": "태조 동안 깃발이 고려."
    }
   ]
  },
  "real_history": "1392년 11월 두 이름을 적어 보냈고, 명은 ‘조선’이 오래되고 아름다운 이름이라며 골랐다. 1393년 2월 나라 이름이 조선으로 정해졌다. (조선 안에서 이미 ‘조선’으로 마음을 정해 두었다고 보는 견해도 있다.)",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 태조 1년 11월 29일",
    "url": "https://sillok.history.go.kr/id/kaa_10111029_001"
   },
   {
    "type": "web",
    "title": "태조 2년 2월 15일",
    "url": "https://sillok.history.go.kr/id/kaa_10202015_001"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 태조 1년 11월 29일 https://sillok.history.go.kr/id/kaa_10111029_001 · 태조 2년 2월 15일 https://sillok.history.go.kr/id/kaa_10202015_001",
  "learn": "나라 이름 ‘조선’이 정해진 과정",
  "fx": {
   "skyText": "조선",
   "note": "섬 위 하늘에 두루마리가 펼쳐지고 먹으로 ‘조선’ 두 글자가 써진다."
  },
  "caution": "“명이 이름을 지어 줬다”로 읽히지 않게, 결과 문구는 ‘골랐다’로만 쓴다."
 },
 {
  "id": "T04",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 4,
  "year": "1394",
  "who": {
   "name": "도읍 터를 살핀 신하",
   "doll": "official_red"
  },
  "line": "개경을 떠나 한양으로 도읍을 옮기옵니다. 서둘러 옮길까요, 차근차근 옮길까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 옮긴다",
    "effects": {
     "army": 10,
     "people": -10,
     "treasury": -5
    },
    "this_run": "짐 수레가 밤낮없이 길을 메웠고, 백성들이 지쳤다.",
    "build": [
     "giwa"
    ]
   },
   "left": {
    "label": "차근차근 옮긴다",
    "effects": {
     "people": 5,
     "nobles": 5,
     "treasury": -15
    },
    "this_run": "짐을 나눠 옮기느라 나라 살림이 오래 묶였다.",
    "build": [
     "giwa"
    ]
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "event": "천도",
  "paths": {
   "real": {
    "lock_right": {
     "when": "gauge(treasury) < 20",
     "reason": "곳간이 비어 도읍을 옮길 수 없다"
    },
    "lock_left": {
     "when": "gauge(treasury) < 20",
     "reason": "곳간이 비어 도읍을 옮길 수 없다"
    },
    "require": {
     "sprout": "gauge(treasury) >= 20",
     "normal": "gauge(treasury) >= 30",
     "sage": "gauge(treasury) >= 40 && gauge(people) >= 35",
     "annals": "gauge(treasury) >= 45 && gauge(people) >= 40 && real(T03)"
    },
    "require_reason": "곳간과 백성의 힘으로 도읍을 옮길 수 없다",
    "how_right": "서둘러 옮긴다",
    "how_left": "차근차근 옮긴다"
   },
   "alt": [
    {
     "id": "T04a1",
     "label": "개경에 머문다",
     "effects": {
      "treasury": 10,
      "nobles": 5,
      "army": -10
     },
     "lock_reason": "개경에 남자는 목소리가 아직 작다",
     "set_flag": "F_개경",
     "merge_text": "이번 판에서는 도읍이 개경에 머물렀다.",
     "merge_real": {
      "text": "도읍은 1399년 정종 때 개경으로 돌아갔다가 1405년 태종 때 다시 한양으로 옮겨졌다",
      "sources": [
       {
        "type": "web",
        "title": "백과 '정종'",
        "url": "https://encykorea.aks.ac.kr/Article/E0050884"
       },
       {
        "type": "web",
        "title": "우리역사넷",
        "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i306100&code=kc_age_30"
       }
      ],
      "out_of_textbook": true
     },
     "unlock": "gauge(treasury) <= 35 || gauge(nobles) >= 65",
     "build": [
      "altPalace"
     ],
     "variants": {
      "T05": "T05v1",
      "T06": "T06v1",
      "T07": "T07v1"
     },
     "this_run": "섬이 개경 모습."
    }
   ]
  },
  "real_history": "1394년, 조선은 한강이 흐르고 바다가 가까워 물자를 나르기 좋은 한양으로 도읍을 옮겼다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 한양을 수도로 정한 까닭 · 238 1394년 천도",
  "learn": "한양 천도와 그 까닭",
  "fx": {
   "boats": true,
   "build": [
    "giwa"
   ],
   "note": "구름이 걷히며 섬 위로 강줄기(한강)가 흘러들고, 작은 짐배들이 오간다."
  }
 },
 {
  "id": "T05",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 5,
  "year": "1395",
  "who": {
   "name": "궁궐 공사를 맡은 관리",
   "doll": "official_red"
  },
  "line": "새 궁궐을 짓사옵니다. 위엄 있게 크게 지을까요, 백성의 힘을 아껴 알맞게 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 짓는다",
    "effects": {
     "nobles": 10,
     "people": -10,
     "treasury": -10
    },
    "this_run": "장식을 더하느라 일꾼이 늘고 공사장에 한숨이 가득했다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "알맞게 짓는다",
    "effects": {
     "people": 10,
     "nobles": -5
    },
    "this_run": "궁궐은 단정하게 섰고, 일꾼들은 제때 집으로 돌아갔다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "event": "경복궁",
  "paths": {
   "real": {
    "lock_right": {
     "when": "gauge(treasury) < 15",
     "reason": "곳간이 모자라 크게 지을 수 없다",
     "reason_auto": true
    },
    "require": {
     "sprout": "gauge(treasury) >= 15",
     "normal": "gauge(treasury) >= 25",
     "sage": "gauge(treasury) >= 35 && real(T04)",
     "annals": "gauge(treasury) >= 40 && gauge(people) >= 30 && real(T04)"
    },
    "require_reason": "새 궁궐을 지을 곳간이 모자란다",
    "how_right": "크게 짓는다",
    "how_left": "알맞게 짓는다"
   },
   "alt": [
    {
     "id": "T05a1",
     "label": "옛 집을 고쳐 쓴다",
     "effects": {
      "people": 10,
      "treasury": 10,
      "nobles": -10
     },
     "lock_reason": "아직 새 궁궐을 지을 힘이 있다",
     "set_flag": "F_궁궐",
     "merge_text": "다음 임금 때에야 경복궁이 세워졌다(이번 판).",
     "unlock": "gauge(treasury) <= 30 || gauge(people) <= 30",
     "build": [
      "altPalace"
     ],
     "skip": [
      "CT04"
     ],
     "this_run": "경복궁이 서지 않는다."
    }
   ]
  },
  "real_history": "1395년 경복궁이 완성되었다. ‘덕으로 나라를 다스려 오래 큰 복을 누리라’는 뜻의 이름은 정도전이 지었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 경복궁과 이름 뜻 · 238 / [교과서 밖] 이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "learn": "경복궁과 그 이름에 담긴 뜻",
  "fx": {
   "build": [
    "gyeongbok"
   ],
   "note": "섬 한가운데 경복궁이 “뽕” 솟는다 — 근정전의 휜 지붕선과 단청 포인트. \"알맞게 짓는다\"를 고르면 궁궐 앞 초가 마을에 사람이 더 붐빈다(궁궐 모양은 같음)."
  }
 },
 {
  "id": "T06",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 6,
  "year": "1395",
  "who": {
   "name": "예법을 맡은 신하",
   "doll": "official_green"
  },
  "line": "궁궐 동쪽에 종묘, 서쪽에 사직단을 지어야 하옵니다. 모내기철이라도 서둘러 지을까요, 농사철 뒤에 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 짓는다",
    "effects": {
     "nobles": 10,
     "people": -10,
     "treasury": -5
    },
    "this_run": "제사는 일찍 올렸지만, 모내기철 들판에 일손이 모자랐다.",
    "build": [
     "jongmyo",
     "sajik"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "농사철 뒤에 짓는다",
    "effects": {
     "people": 5,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "농사가 끝난 뒤 지어 원망은 적었지만, 대신들은 늦다고 투덜댔다.",
    "build": [
     "jongmyo",
     "sajik"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "event": "종묘·사직",
  "paths": {
   "real": {
    "require": {
     "sprout": "gauge(nobles) >= 20",
     "normal": "gauge(nobles) >= 30",
     "sage": "gauge(nobles) >= 40 && gauge(treasury) >= 25",
     "annals": "gauge(nobles) >= 45 && gauge(treasury) >= 30 && real(T05)"
    },
    "require_reason": "예법을 받쳐 줄 신하와 곳간이 모자란다",
    "how_right": "서둘러 짓는다",
    "how_left": "농사철 뒤에 짓는다"
   },
   "alt": [
    {
     "id": "T06a1",
     "label": "제사 터를 미룬다",
     "effects": {
      "nobles": -15
     },
     "lock_reason": "예법을 따지는 신하들이 아직 많다",
     "set_flag": "F_종묘",
     "merge_text": "종묘와 사직단은 다음 임금 때 세워졌다(이번 판).",
     "unlock": "gauge(nobles) <= 35",
     "crisis_mult": {
      "nobles:low": 1.3
     },
     "this_run": "종묘·사직단이 서지 않는다."
    }
   ]
  },
  "real_history": "종묘(경복궁 동쪽)와 사직단(서쪽)은 조선이 유교의 나라임을 보여 주는 곳이 되었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "231"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 종묘·사직단의 위치와 하는 일 · 231 종묘는 유교 국가를 나타내는 대표 건물",
  "learn": "종묘와 사직단",
  "fx": {
   "build": [
    "jongmyo",
    "sajik"
   ],
   "note": "경복궁 동쪽에 지붕이 아주 긴 종묘, 서쪽에 네모난 제단 사직단이 솟는다. 제사 때 흰 연기가 가늘게 오른다."
  }
 },
 {
  "id": "T07",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 7,
  "year": "1396",
  "who": {
   "name": "",
   "doll": "jeong"
  },
  "line": "산줄기를 따라 성을 쌓고 네 큰 문에 어짊·옳음·예의 바름을 새기겠사옵니다. 겨울 농한기에 한꺼번에 쌓을까요, 나눠서 쌓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "농한기에 쌓는다",
    "effects": {
     "army": 15,
     "people": -5,
     "treasury": -5
    },
    "this_run": "추운 겨울 공사에 일꾼들 손이 텄지만, 성벽은 빨리 올라갔다.",
    "build": [
     "wall",
     "heungin",
     "donui",
     "sungnye",
     "sukjeong"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "나눠서 쌓는다",
    "effects": {
     "army": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "공사가 길게 이어져, 한동안 성벽 곳곳에 나무 발판이 남았다.",
    "build": [
     "wall",
     "heungin",
     "donui",
     "sungnye",
     "sukjeong"
    ],
    "build_state": "late"
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "event": "도성",
  "paths": {
   "real": {
    "lock_right": {
     "when": "gauge(people) < 20",
     "reason": "백성이 너무 지쳤다"
    },
    "require": {
     "sprout": "gauge(people) >= 20",
     "normal": "gauge(people) >= 30",
     "sage": "gauge(people) >= 40 && gauge(treasury) >= 30",
     "annals": "gauge(people) >= 45 && gauge(treasury) >= 35 && real(T04)"
    },
    "require_reason": "성을 쌓을 백성의 힘이 모자란다",
    "how_right": "농한기에 쌓는다",
    "how_left": "나눠서 쌓는다"
   },
   "alt": [
    {
     "id": "T07a1",
     "label": "성 없이 문만 세운다",
     "effects": {
      "treasury": 15
     },
     "lock_reason": "성 없이 지킬 만큼 군사가 강하지 않다",
     "set_flag": "F_성곽",
     "merge_text": "다음 임금 때 도성을 쌓았다(이번 판).",
     "unlock": "gauge(army) >= 70",
     "build": [
      "heungin",
      "donui",
      "sungnye",
      "sukjeong"
     ],
     "skip": [
      "CT05",
      "C01a"
     ],
     "crisis_mult": {
      "army:low": 1.5
     },
     "this_run": "성곽 없이 문만."
    }
   ]
  },
  "real_history": "1396년 한양 도성이 쌓였다(첫 공사 약 12만 명, 장마에 무너진 곳을 고친 둘째 공사 약 8만 명). 흥인지문(인)·돈의문(의)·숭례문(예)에 유교 덕목을 담았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "233",
    "tb": "75"
   },
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "web",
    "title": "동원 인원: 우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000"
   },
   {
    "type": "web",
    "title": "출처",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30"
   }
  ],
  "sources_text": "지도서 233(교과서 75) 성곽·네 큰 문·유교 덕목 · 238 1396년 축조, 도성 터는 정도전이 정함 / [교과서 밖] 동원 인원: 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000 · https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30",
  "learn": "한양 도성과 유교 덕목을 담은 문 이름",
  "fx": {
   "glyphs": {
    "heungin": "仁",
    "donui": "義",
    "sungnye": "禮"
   },
   "build": [
    "wall",
    "heungin",
    "donui",
    "sungnye",
    "sukjeong"
   ],
   "note": "산등성이를 따라 성벽이 한 칸씩 이어지고 동·서·남 큰 문이 차례로 “뽕”. 문이 설 때 현판 위로 仁·義·禮 글자 빛이 잠깐 떠오른다."
  }
 },
 {
  "id": "T08",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 8,
  "year": "1390년대",
  "who": {
   "name": "젊은 유생 대표",
   "doll": "yusaeng"
  },
  "line": "한양에 성균관을 세워 인재를 기르겠사옵니다. 처음부터 크게 세울까요, 작게 시작할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 세운다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -15
    },
    "this_run": "기숙사까지 갖춘 성균관에 유생들이 몰려왔다.",
    "build": [
     "seonggyun"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작게 시작한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "강당 하나로 시작해 유생들이 비좁게 지냈다.",
    "build": [
     "seonggyun"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "event": "성균관",
  "paths": {
   "real": {
    "require": {
     "sprout": "gauge(nobles) >= 15",
     "normal": "gauge(nobles) >= 30",
     "sage": "gauge(nobles) >= 40 && gauge(treasury) >= 25",
     "annals": "gauge(nobles) >= 45 && gauge(treasury) >= 30 && real(T02)"
    },
    "require_reason": "인재를 기를 곳간과 신하가 모자란다",
    "how_right": "크게 세운다",
    "how_left": "작게 시작한다"
   },
   "alt": [
    {
     "id": "T08a1",
     "label": "고을 향교부터 세운다",
     "effects": {
      "nobles": -10,
      "people": 10
     },
     "lock_reason": "지방 백성들의 바람이 아직 작다",
     "set_flag": "F_향교",
     "merge_text": "성균관은 다음 임금 때 세워졌다(이번 판).",
     "unlock": "gauge(people) >= 55",
     "build": [
      "altHyanggyo"
     ],
     "this_run": "성균관 대신 고을 향교 여럿."
    }
   ]
  },
  "real_history": "태조는 한양에 문묘와 성균관을 세웠다. 성균관은 오늘날의 대학교에 해당하는 최고 교육 기관이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "238"
   },
   {
    "type": "guide",
    "page": "245",
    "tb": "81"
   }
  ],
  "sources_text": "지도서 238(태조가 한양에 문묘(성균관) 등을 건설) · 245(교과서 81 성균관은 오늘날 대학교)",
  "learn": "성균관과 유교 교육",
  "fx": {
   "build": [
    "seonggyun"
   ],
   "note": "도성 북쪽에 강당 명륜당과 기숙사 지붕이 솟고, 유생 인형들이 줄지어 들어간다."
  },
  "caution": "‘태조 때 세움’은 지도서 참고 자료(교과서 본문 밖). 성균관 자체는 교과서 내용."
 },
 {
  "id": "T09",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "order": 9,
  "year": "1398",
  "who": {
   "name": "이방원",
   "doll": "bangwon"
  },
  "line": "아버님, 정도전이 왕자들이 거느린 군사를 거두려 하옵니다. 저희 형제를 믿어 주소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "아들을 믿는다",
    "effects": {
     "army": 10,
     "nobles": -10
    },
    "this_run": "전하는 아들의 말을 믿었고 → 이방원이 군사를 움직였다 → 정도전 세력이 무너졌다 → 개국 공신들이 크게 흔들렸다."
   },
   "left": {
    "label": "정도전을 믿는다",
    "effects": {
     "nobles": 5,
     "army": -20
    },
    "this_run": "전하는 정도전을 믿었지만 → 이방원이 먼저 군사를 일으켜 → 정도전 세력은 무너졌다 → 궁궐을 지키던 군사들까지 흩어졌다."
   }
  },
  "against": "left",
  "grain": "balance",
  "event_type": "life",
  "event": "왕자의 난",
  "paths": {
   "real": {
    "how_right": "아들을 믿는다",
    "how_left": "정도전을 믿는다"
   },
   "alt": [
    {
     "id": "T09a1",
     "label": "형제를 화해시킨다",
     "effects": {
      "nobles": 10,
      "army": -5
     },
     "lock_reason": "형제들 사이의 믿음이 모자란다",
     "set_flag": "F_양위",
     "merge_text": "태조는 다툼 없이 왕위를 물려주었다(이번 판).",
     "unlock": "gauge(nobles) >= 45 && gauge(army) >= 45 && gauge(army) <= 65 && !flag(F_정몽주)",
     "this_run": "왕자의 난 없이 왕위를 물려준다."
    }
   ]
  },
  "real_history": "1398년, 이방원이 군사를 일으켜 정도전 세력을 무너뜨렸다(제1차 왕자의 난). 정도전도 이때 세상을 떠났다. 그해 태조는 둘째 아들(정종)에게 왕위를 물려주었다. 스스로 원해서였는지는 의문이 남아 있다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '정종'",
    "url": "https://encykorea.aks.ac.kr/Article/E0050884"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '정종' https://encykorea.aks.ac.kr/Article/E0050884",
  "learn": "건국 초 왕위를 둘러싼 갈등",
  "fx": {
   "dusk": true,
   "note": "해 질 녘 붉은 하늘. 경복궁 처마 등불이 하나씩 꺼지고 두루마리가 말리며 다음 왕 화면으로 넘어간다."
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT01",
  "gauge": "people",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "장터를 돌아본 내관",
   "doll": "naegwan"
  },
  "line": "장터에 불만이 퍼지고 있사옵니다. 공사에 지친 백성들이 수군거리옵니다.",
  "conditions_text": "백성 경고(낮음)",
  "choices": {
   "right": {
    "label": "부역을 줄여 준다",
    "effects": {
     "people": 15,
     "treasury": -10,
     "army": -5
    },
    "this_run": "공사장 일꾼 절반이 집으로 돌아갔다."
   },
   "left": {
    "label": "곡식을 조금 푼다",
    "effects": {
     "people": 8,
     "treasury": -5
    },
    "this_run": "장터에 죽 솥이 걸렸다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT02",
  "gauge": "people",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "관리들 사이에 ‘백성 눈치만 본다’는 말이 돌고 있사옵니다.",
  "conditions_text": "백성 경고(높음)",
  "choices": {
   "right": {
    "label": "세금을 바로 세운다",
    "effects": {
     "people": -10,
     "treasury": 10,
     "nobles": 5
    },
    "this_run": "미뤄 둔 세금 장부가 다시 펼쳐졌다."
   },
   "left": {
    "label": "관리를 달랜다",
    "effects": {
     "nobles": 8,
     "people": -5
    },
    "this_run": "관리들의 투덜거림이 잦아들었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT03",
  "gauge": "nobles",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "대신들이 모이면 한숨부터 쉰다 하옵니다.",
  "conditions_text": "양반 경고(낮음)",
  "choices": {
   "right": {
    "label": "공신 잔치를 연다",
    "effects": {
     "nobles": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "공신들이 오랜만에 웃었다."
   },
   "left": {
    "label": "대신을 불러 듣는다",
    "effects": {
     "nobles": 8,
     "people": -5
    },
    "this_run": "대신들은 하고 싶던 말을 쏟아 냈다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT04",
  "gauge": "nobles",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 전하께 아뢰지 않고 일을 정한다는 소문이옵니다.",
  "conditions_text": "양반 경고(높음)",
  "choices": {
   "right": {
    "label": "직접 회의를 연다",
    "effects": {
     "nobles": -15,
     "people": 5,
     "army": 5
    },
    "this_run": "전하가 회의 자리 한가운데 앉았다."
   },
   "left": {
    "label": "한 사람만 꾸짖는다",
    "effects": {
     "nobles": -8,
     "army": 5
    },
    "this_run": "대신 하나가 고개를 숙였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT05",
  "gauge": "treasury",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "쌀가마를 세어 보니 한숨이 나오옵니다. 이대로면 겨울을 못 넘기옵니다.",
  "conditions_text": "국고 경고(낮음)",
  "choices": {
   "right": {
    "label": "공사를 쉰다",
    "effects": {
     "treasury": 15,
     "army": -5,
     "nobles": -5
    },
    "this_run": "공사장의 망치 소리가 멈췄다."
   },
   "left": {
    "label": "잔치를 줄인다",
    "effects": {
     "treasury": 8,
     "nobles": -5
    },
    "this_run": "궁궐 잔칫상이 소박해졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT06",
  "gauge": "treasury",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간이 넘쳐 아래쪽 쌀이 썩어 간다 하옵니다.",
  "conditions_text": "국고 경고(높음)",
  "choices": {
   "right": {
    "label": "곡식을 푼다",
    "effects": {
     "treasury": -15,
     "people": 15
    },
    "this_run": "굶던 집 굴뚝에 연기가 올랐다."
   },
   "left": {
    "label": "다리를 고친다",
    "effects": {
     "treasury": -8,
     "people": 5
    },
    "this_run": "무너진 다리가 다시 놓였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT07",
  "gauge": "army",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "바닷가 봉수대를 지키는 군사가 반으로 줄었사옵니다.",
  "conditions_text": "국방 경고(낮음)",
  "choices": {
   "right": {
    "label": "군사를 보낸다",
    "effects": {
     "army": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "봉수대마다 군사가 둘씩 섰다."
   },
   "left": {
    "label": "마을에 망을 맡긴다",
    "effects": {
     "army": 8,
     "people": -5
    },
    "this_run": "마을 사람들이 번갈아 언덕에 올랐다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NT08",
  "gauge": "army",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "병조 관리",
   "doll": "official_blue"
  },
  "line": "장수들이 거느린 군사가 궁궐 군사보다 많다는 말이 돌고 있사옵니다.",
  "conditions_text": "국방 경고(높음)",
  "choices": {
   "right": {
    "label": "군사 수를 센다",
    "effects": {
     "army": -15,
     "nobles": 5
    },
    "this_run": "장수들이 마지못해 군적을 내놓았다."
   },
   "left": {
    "label": "장수를 불러 타이른다",
    "effects": {
     "army": -8,
     "nobles": -5
    },
    "this_run": "장수들은 고개를 숙였지만 눈빛은 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT01",
  "gauge": "people",
  "side": "low",
  "level": "event",
  "name": "백성들이 들고일어날 기세",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "공사에 지친 백성들이 관아를 둘러싸고 물러나지 않사옵니다. 들고일어날 기세이옵니다.",
  "choices": {
   "right": {
    "label": "창고를 열어 달랜다",
    "effects": {
     "people": 20,
     "treasury": -20
    },
    "this_run": "곳간 쌀이 수레에 실려 나가자, 사람들이 깃발을 내리고 흩어졌다."
   },
   "left": {
    "label": "군사로 지킨다",
    "effects": {
     "people": 12,
     "army": -10
    },
    "this_run": "관아 앞에 군사가 늘어서자 사람들은 물러났지만 원망은 남았다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT02",
  "gauge": "people",
  "side": "high",
  "level": "event",
  "name": "관리들이 손을 놓다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "관리들이 ‘백성 눈치에 아무것도 못 한다’며 장부를 덮고 일을 멈췄사옵니다.",
  "choices": {
   "right": {
    "label": "관리에게 힘을 싣는다",
    "effects": {
     "people": -20,
     "treasury": -15
    },
    "this_run": "수령들이 다시 관아 문을 열었지만, 새 일꾼을 들이느라 곳간이 줄었다."
   },
   "left": {
    "label": "관리를 타이른다",
    "effects": {
     "people": -12,
     "nobles": -10
    },
    "this_run": "관리들이 마지못해 붓을 들었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT03",
  "gauge": "nobles",
  "side": "low",
  "level": "event",
  "name": "양반들의 반란 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "벼슬을 잃은 양반들이 밤마다 한 집에 모인다 하옵니다. 반란을 꾀한다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "공신을 불러 달랜다",
    "effects": {
     "nobles": 20,
     "treasury": -20
    },
    "this_run": "벼슬과 땅을 받은 양반들이 모임을 그만두었다."
   },
   "left": {
    "label": "군사로 막는다",
    "effects": {
     "nobles": 12,
     "army": -15
    },
    "this_run": "모임 집 앞에 군사가 서자 모의는 흩어졌지만, 양반들의 눈빛은 차가웠다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT04",
  "gauge": "nobles",
  "side": "high",
  "level": "event",
  "name": "왕명이 되돌아오다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 의논을 마쳤다며 전하의 명을 되돌려 보냈사옵니다.",
  "choices": {
   "right": {
    "label": "대신을 내려보낸다",
    "effects": {
     "nobles": -20,
     "treasury": -15
    },
    "this_run": "힘센 대신 몇이 먼 고을로 떠나고, 새 관리를 들였다."
   },
   "left": {
    "label": "궁궐 호위를 늘린다",
    "effects": {
     "nobles": -12,
     "army": -10
    },
    "this_run": "대신들은 물러섰지만 뒤에서 수군거렸다."
   }
  },
  "sources": [],
  "fx": {},
  "damage": {
   "targets": [
    "gyeongbok"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT05",
  "gauge": "treasury",
  "side": "low",
  "level": "event",
  "name": "녹봉이 밀리다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "곳간이 비어 녹봉을 못 받은 관리들이 백성에게서 몰래 거두고 있사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 살림을 줄인다",
    "effects": {
     "treasury": 20,
     "nobles": -20
    },
    "this_run": "전하의 수라상이 줄고 그 쌀이 녹봉이 되었다. 대신들은 체면이 깎였다며 투덜댔다."
   },
   "left": {
    "label": "세금을 더 걷는다",
    "effects": {
     "treasury": 12,
     "people": -15
    },
    "this_run": "곳간은 조금 찼지만 마을마다 한숨이 늘었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT06",
  "gauge": "treasury",
  "side": "high",
  "level": "event",
  "name": "곳간을 노리는 손",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "넘치는 곳간을 두고 관리 몇이 쌀을 빼돌렸다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "조사해 벌한다",
    "effects": {
     "treasury": -20,
     "nobles": -15
    },
    "this_run": "빼돌린 쌀이 돌아왔고, 관리 몇이 벼슬을 잃었다."
   },
   "left": {
    "label": "곡식을 풀어 버린다",
    "effects": {
     "treasury": -12,
     "army": -5
    },
    "this_run": "곳간이 줄자 다툼도 잦아들었지만, 군량 몫까지 나갔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT07",
  "gauge": "army",
  "side": "low",
  "level": "event",
  "name": "국경이 뚫리다",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "남쪽 바닷가 봉수대에 불이 올랐사옵니다! 낯선 배들이 고을 가까이 왔사옵니다.",
  "choices": {
   "right": {
    "label": "군사를 모아 보낸다",
    "effects": {
     "army": 20,
     "treasury": -20
    },
    "this_run": "군사들이 밤새 달려 바닷가를 지켰고 낯선 배들은 물러갔다."
   },
   "left": {
    "label": "백성을 성으로 모은다",
    "effects": {
     "army": 12,
     "people": -15
    },
    "this_run": "바닷가 사람들이 짐을 지고 성으로 피했다. 빈 마을은 쓸쓸했다."
   }
  },
  "sources": [],
  "fx": {},
  "similar": {
   "text": "고려 말부터 조선 초까지 왜구가 바닷가를 자주 침입했다.",
   "sources_text": "지도서 232(교과서 74), 234(교과서 76)",
   "sources": [
    {
     "type": "guide",
     "page": "232",
     "tb": "74"
    }
   ],
   "out_of_textbook": false
  },
  "damage": {
   "targets": [
    "wall"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT08",
  "gauge": "army",
  "side": "high",
  "level": "event",
  "name": "장수들이 명을 거부하다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "장수 몇이 군사를 이끌고 도성 밖에 모여 명을 따르지 않사옵니다.",
  "choices": {
   "right": {
    "label": "군권을 거둔다",
    "effects": {
     "army": -20,
     "nobles": -15
    },
    "this_run": "장수들이 거느린 군사 일부가 나라 군대로 들어왔다. 공신들은 불안해했다."
   },
   "left": {
    "label": "장수에게 상을 준다",
    "effects": {
     "army": -12,
     "treasury": -15
    },
    "this_run": "장수들은 상을 받고 물러갔지만 군사는 그대로였다."
   }
  },
  "sources": [],
  "fx": {},
  "similar": {
   "text": "조선 건국 초 왕위를 둘러싼 갈등 끝에, 1398년 이방원이 군사를 일으킨 제1차 왕자의 난이 일어났다.",
   "sources_text": "[교과서 밖] 백과 '정종' https://encykorea.aks.ac.kr/Article/E0050884",
   "sources": [
    {
     "type": "web",
     "title": "백과 '정종'",
     "url": "https://encykorea.aks.ac.kr/Article/E0050884"
    }
   ],
   "out_of_textbook": true
  },
  "damage": {
   "targets": [
    "sungnye",
    "heungin",
    "donui",
    "sukjeong"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT01b",
  "gauge": "people",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "백성들이 들고일어날 기세",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "관아를 둘러싼 사람들이 더 늘었사옵니다. 이번에 잘못하면 나라 곳곳으로 번지옵니다.",
  "choices": {
   "right": {
    "label": "수령을 바꾸고 푼다",
    "effects": {
     "people": 20,
     "treasury": -25
    },
    "this_run": "새 수령이 곳간을 열자 사람들이 하나둘 집으로 돌아갔다."
   },
   "left": {
    "label": "성문을 닫는다",
    "effects": {
     "people": 12,
     "army": -15
    },
    "this_run": "성문은 닫혔고, 성 밖 원망은 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT02b",
  "gauge": "people",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "관리들이 손을 놓다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "고을마다 관아 문이 닫히고 있사옵니다. 이대로면 나라 살림이 멈추옵니다.",
  "choices": {
   "right": {
    "label": "수령을 새로 뽑는다",
    "effects": {
     "people": -20,
     "treasury": -20
    },
    "this_run": "새 수령들이 다시 장부를 펼쳤다."
   },
   "left": {
    "label": "대신에게 맡긴다",
    "effects": {
     "people": -12,
     "nobles": -15
    },
    "this_run": "대신들이 나섰지만 일은 더뎠다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT03b",
  "gauge": "nobles",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "양반들의 반란 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "모의한 양반들이 군사를 모은다는 말까지 들리옵니다.",
  "choices": {
   "right": {
    "label": "벼슬을 돌려준다",
    "effects": {
     "nobles": 20,
     "treasury": -25
    },
    "this_run": "벼슬을 되찾은 양반들이 모의를 그만두었다."
   },
   "left": {
    "label": "모임을 흩는다",
    "effects": {
     "nobles": 12,
     "army": -20
    },
    "this_run": "군사들이 모임 집을 둘러쌌고, 양반들은 흩어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT04b",
  "gauge": "nobles",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "왕명이 되돌아오다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 상소를 모아 전하의 결정을 모두 미루자 하옵니다.",
  "choices": {
   "right": {
    "label": "공신 권한을 줄인다",
    "effects": {
     "nobles": -20,
     "treasury": -20
    },
    "this_run": "공신들이 맡던 일 몇 가지가 임금 곁으로 돌아왔다."
   },
   "left": {
    "label": "상소를 돌려보낸다",
    "effects": {
     "nobles": -12,
     "people": -15
    },
    "this_run": "상소는 돌아갔지만 대신들은 일을 미뤘다."
   }
  },
  "sources": [],
  "fx": {},
  "damage": {
   "targets": [
    "gyeongbok"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT05b",
  "gauge": "treasury",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "녹봉이 밀리다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "녹봉을 못 받은 관리들이 일을 놓기 시작했사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 창고를 연다",
    "effects": {
     "treasury": 20,
     "nobles": -25
    },
    "this_run": "궁궐 창고의 비단과 그릇이 녹봉이 되었다."
   },
   "left": {
    "label": "공사를 멈춘다",
    "effects": {
     "treasury": 12,
     "army": -15
    },
    "this_run": "도성 공사장이 조용해졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT06b",
  "gauge": "treasury",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "곳간을 노리는 손",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간 다툼이 관리들 패싸움 소문으로 번졌사옵니다.",
  "choices": {
   "right": {
    "label": "곳간지기를 바꾼다",
    "effects": {
     "treasury": -20,
     "nobles": -20
    },
    "this_run": "새 곳간지기가 장부를 처음부터 다시 셌다."
   },
   "left": {
    "label": "곳간을 나눠 맡긴다",
    "effects": {
     "treasury": -12,
     "people": -15
    },
    "this_run": "곳간이 여럿으로 나뉘었지만 감시가 느슨해졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT07b",
  "gauge": "army",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "국경이 뚫리다",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "낯선 배들이 다시 와 더 깊이 들어왔사옵니다. 바닷가 성이 위태롭사옵니다.",
  "choices": {
   "right": {
    "label": "성과 군사를 챙긴다",
    "effects": {
     "army": 20,
     "treasury": -25
    },
    "this_run": "바닷가 성벽에 돌이 더해지고 군사가 모였다."
   },
   "left": {
    "label": "고을을 비운다",
    "effects": {
     "army": 12,
     "people": -20
    },
    "this_run": "바닷가 고을 사람들이 모두 성으로 들어왔다."
   }
  },
  "sources": [],
  "fx": {},
  "damage": {
   "targets": [
    "wall"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "taejo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KT08b",
  "gauge": "army",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "장수들이 명을 거부하다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "장수들이 서로 군사를 겨루며 도성 문을 막아섰사옵니다.",
  "choices": {
   "right": {
    "label": "군권을 한곳에 모은다",
    "effects": {
     "army": -20,
     "nobles": -20
    },
    "this_run": "군사를 움직이는 권한이 한곳으로 모였다."
   },
   "left": {
    "label": "장수들을 갈라놓는다",
    "effects": {
     "army": -12,
     "treasury": -20
    },
    "this_run": "장수들이 먼 고을로 흩어졌지만 비용이 컸다."
   }
  },
  "sources": [],
  "fx": {},
  "damage": {
   "targets": [
    "sungnye",
    "heungin",
    "donui",
    "sukjeong"
   ]
  }
 }
]);
})();
