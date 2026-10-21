/* 루트(다른 길·실제 경로 잠금·갈래) — 집필 파일 routes_S.py 에서 tools/import-routes2.py 로 만든 파일. 직접 고치지 말 것.
 * 그 왕 역사 카드에 사건 이름·paths(real.require 난이도별 · alt 다른 길)를 붙이고, 갈래 카드·변형판·갈래 이야기·칭호를 더한다. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const P = {
 "S01": {
  "event": "쓰시마섬 정벌",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(army) >= 15",
    "normal": "gauge(army) >= 30",
    "sage": "gauge(army) >= 40 && gauge(treasury) >= 25",
    "annals": "gauge(army) >= 45 && gauge(treasury) >= 30"
   },
   "require_reason": "바다를 건널 군사가 모자란다"
  },
  "alt": [
   {
    "id": "S01a1",
    "label": "정벌하지 않는다",
    "unlock": "gauge(army) <= 50",
    "effects": {
     "treasury": 10,
     "army": -10
    },
    "set_flag": "F_쓰시마",
    "this_run": "정벌 배를 띄우지 않았다. 바닷가 고을마다 봉수대만 늘었다.",
    "lock_hint": "국방 50 이하",
    "lock_reason": "바다를 그냥 두자는 목소리가 아직 작다",
    "merge_text": "이번 생에서는 정벌 배를 띄우지 않았다.",
    "merge_real": {
     "text": "1419년 조선은 왜구의 근거지 쓰시마섬을 정벌했다.",
     "sources": [
      {
       "type": "guide",
       "page": "234",
       "tb": "76"
      }
     ],
     "out_of_textbook": false
    },
    "branch": "①",
    "skip": [
     "R12",
     "DS151"
    ],
    "crisis_mult": {
     "army:low": 1.3
    }
   },
   {
    "id": "S01a2",
    "label": "바닷가 성만 쌓는다",
    "unlock": "gauge(treasury) >= 50",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "set_flag": "F_바닷가성",
    "this_run": "바다로 나가지 않고 바닷가 고을마다 돌성을 쌓았다. 왜구 배는 멀리서 맴돌았다.",
    "lock_hint": "국고 50 이상",
    "lock_reason": "성을 쌓을 곳간이 모자란다",
    "merge_text": "이번 생에서는 바다로 나가지 않고 바닷가 고을마다 돌성을 쌓았다.",
    "merge_real": {
     "text": "1419년 조선은 왜구의 근거지 쓰시마섬을 정벌했다.",
     "sources": [
      {
       "type": "guide",
       "page": "234",
       "tb": "76"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "R12",
     "DS151"
    ]
   }
  ]
 },
 "S02": {
  "event": "《농사직설》",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 15",
    "normal": "gauge(people) >= 30",
    "sage": "gauge(people) >= 40 && gauge(treasury) >= 25",
    "annals": "gauge(people) >= 45 && gauge(treasury) >= 30 && real(S01)"
   },
   "require_reason": "농부들의 이야기를 모을 힘이 모자란다"
  },
  "alt": [
   {
    "id": "S02a1",
    "label": "중국 농서를 쓴다",
    "unlock": "gauge(treasury) <= 50",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "set_flag": "F_중국농서",
    "this_run": "중국에서 들여온 농사책을 그대로 나눠 주었다. 남쪽 논에서는 \"우리 땅과 안 맞는다\"는 말이 나왔다.",
    "lock_hint": "국고 50 이하",
    "lock_reason": "곳간이 넉넉해 새 책을 엮자는 쪽이 크다",
    "merge_text": "이번 생에서는 중국에서 들여온 농사책을 그대로 나눠 주었다.",
    "merge_real": {
     "text": "1429년 농민들의 경험을 모아 우리나라 환경에 맞게 엮은 《농사직설》이 나왔다. 그 전에는 우리 땅에 잘 맞지 않는 중국 농서를 많이 따랐다.",
     "sources": [
      {
       "type": "guide",
       "page": "263",
       "tb": "89"
      },
      {
       "type": "guide",
       "page": "266"
      }
     ],
     "out_of_textbook": true
    },
    "skip": [
     "CS02a",
     "DS109",
     "DS110",
     "DS116",
     "RS09"
    ]
   },
   {
    "id": "S02a2",
    "label": "고을에 맡긴다",
    "unlock": "gauge(people) <= 50",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "set_flag": "F_고을농법",
    "this_run": "책을 엮지 않고 고을마다 하던 대로 짓게 했다. 이웃 고을끼리 농사법이 달라 장터에서 다툼이 났다.",
    "lock_hint": "백성 50 이하",
    "lock_reason": "백성들이 새 농사책을 기다린다",
    "merge_text": "이번 생에서는 책을 엮지 않고 고을마다 하던 대로 짓게 했다.",
    "merge_real": {
     "text": "1429년 《농사직설》이 나왔다. 농민들의 경험을 모아 우리나라 환경에 맞게 농사법을 정리한 책이다.",
     "sources": [
      {
       "type": "guide",
       "page": "263",
       "tb": "89"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "CS02a",
     "DS109",
     "DS110",
     "DS116",
     "RS09"
    ]
   }
  ]
 },
 "S03": {
  "event": "공법 찬반 묻기",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 15",
    "normal": "gauge(nobles) >= 30",
    "sage": "gauge(nobles) >= 40 && gauge(people) >= 30 && real(S02)",
    "annals": "gauge(nobles) >= 45 && gauge(people) >= 35 && real(S02)"
   },
   "require_reason": "온 나라에 찬반을 물을 관리들이 모자란다"
  },
  "alt": [
   {
    "id": "S03a1",
    "label": "묻지 않고 정한다",
    "unlock": {
     "sprout": "gauge(nobles) >= 52",
     "normal": "gauge(nobles) >= 55",
     "sage": "gauge(nobles) >= 55",
     "annals": "gauge(nobles) >= 55"
    },
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_공법명령",
    "this_run": "대신들끼리 의논해 새 세금법을 바로 정했다. 마을 사람들은 바뀐 줄도 모르고 세금을 냈다.",
    "lock_hint": "양반 55 이상",
    "lock_reason": "대신들의 힘이 아직 모자란다",
    "merge_text": "이번 생에서는 대신들끼리 의논해 새 세금법을 바로 정했다.",
    "merge_real": {
     "text": "1430년 약 17만 명에게 새 세금법(공법)의 찬반을 물었다. 오래 의논한 끝에 1444년에 정해졌다.",
     "sources": [
      {
       "type": "web",
       "title": "조선왕조실록 세종 12년 8월 10일",
       "url": "https://sillok.history.go.kr/id/kda_11208010_005"
      }
     ],
     "out_of_textbook": true
    }
   },
   {
    "id": "S03a2",
    "label": "옛 세법을 둔다",
    "unlock": "gauge(treasury) >= 55",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "set_flag": "F_옛세법",
    "this_run": "세금법을 고치지 않았다. 풍년이든 흉년이든 걷는 양이 같아 흉년 고을이 힘들어했다.",
    "lock_hint": "국고 55 이상",
    "lock_reason": "곳간에 여유가 있어야 옛 법을 버틸 수 있다",
    "merge_text": "이번 생에서는 세금법을 고치지 않았다.",
    "merge_real": {
     "text": "1430년 약 17만 명에게 새 세금법(공법)의 찬반을 물었다. 오래 의논한 끝에 1444년에 정해졌다.",
     "sources": [
      {
       "type": "web",
       "title": "조선왕조실록 세종 12년 8월 10일",
       "url": "https://sillok.history.go.kr/id/kda_11208010_005"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "S04": {
  "event": "4군 6진",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(army) >= 20",
    "normal": "gauge(army) >= 30",
    "sage": "gauge(army) >= 40 && gauge(people) >= 30",
    "annals": "gauge(army) >= 45 && gauge(people) >= 35 && real(S01)"
   },
   "require_reason": "북쪽 강까지 나아갈 군사가 모자란다"
  },
  "alt": [
   {
    "id": "S04a1",
    "label": "국경을 남쪽에 둔다",
    "unlock": "gauge(people) <= 45 || gauge(army) <= 55",
    "effects": {
     "people": 10,
     "army": -10
    },
    "set_flag": "F_국경남쪽",
    "this_run": "압록강·두만강까지 올라가지 않고 옛 국경을 지켰다. 북쪽 땅은 비어 있었다.",
    "lock_hint": "백성 45 이하 또는 국방 55 이하",
    "lock_reason": "북쪽으로 나아가자는 장수들이 많다",
    "merge_text": "이번 생에서는 압록강·두만강까지 올라가지 않고 옛 국경을 지켰다.",
    "merge_real": {
     "text": "세종 때 압록강 유역에 4군, 두만강 유역에 6진을 두어 오늘날과 비슷한 국경선이 정해졌다.",
     "sources": [
      {
       "type": "guide",
       "page": "234",
       "tb": "76"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "DS138",
     "DS143",
     "DS144",
     "DS145",
     "DS146",
     "DS150"
    ],
    "crisis_mult": {
     "army:low": 1.3
    }
   },
   {
    "id": "S04a2",
    "label": "진만 쌓는다",
    "unlock": "gauge(people) >= 55",
    "effects": {
     "people": 5,
     "army": -5
    },
    "set_flag": "F_진만",
    "this_run": "강가에 진은 쌓았지만 백성을 옮겨 살게 하지 않았다. 진에는 군사만 오갔다.",
    "lock_hint": "백성 55 이상",
    "lock_reason": "백성들이 고향을 떠나기 싫어하는 마음이 아직 작다",
    "merge_text": "이번 생에서는 강가에 진은 쌓았지만 백성을 옮겨 살게 하지 않았다.",
    "merge_real": {
     "text": "세종 때 압록강 유역에 4군, 두만강 유역에 6진을 두고, 남쪽 백성을 옮겨 살게 했다.",
     "sources": [
      {
       "type": "guide",
       "page": "234",
       "tb": "76"
      }
     ],
     "out_of_textbook": false
    },
    "build": [
     "jin"
    ],
    "skip": [
     "DS143",
     "DS144"
    ]
   }
  ]
 },
 "S05": {
  "event": "《삼강행실도》",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 15",
    "normal": "gauge(nobles) >= 30",
    "sage": "gauge(nobles) >= 40 && gauge(treasury) >= 25",
    "annals": "gauge(nobles) >= 45 && gauge(treasury) >= 30 && real(S03)"
   },
   "require_reason": "책을 엮을 학자와 곳간이 모자란다"
  },
  "alt": [
   {
    "id": "S05a1",
    "label": "그림 없이 펴낸다",
    "unlock": "gauge(treasury) <= 45",
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "set_flag": "F_그림없음",
    "this_run": "그림을 빼고 글로만 찍었다. 글을 모르는 백성들은 책장을 넘기다 덮었다.",
    "lock_hint": "국고 45 이하",
    "lock_reason": "그림까지 넣을 여유가 있다",
    "merge_text": "이번 생에서는 그림을 빼고 글로만 찍었다.",
    "merge_real": {
     "text": "1434년 《삼강행실도》가 나왔다. 글을 모르는 백성도 알아보도록 이야기마다 그림을 넣었다.",
     "sources": [
      {
       "type": "guide",
       "page": "246",
       "tb": "82"
      }
     ],
     "out_of_textbook": false
    }
   },
   {
    "id": "S05a2",
    "label": "양반 집에만 나눈다",
    "unlock": {
     "sprout": "gauge(nobles) >= 55",
     "normal": "gauge(nobles) >= 60",
     "sage": "gauge(nobles) >= 60",
     "annals": "gauge(nobles) >= 60"
    },
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_양반만",
    "this_run": "책은 양반 집 서가에만 꽂혔다. 마을 사람들은 책이 있다는 소문만 들었다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "양반들의 목소리가 아직 작다",
    "merge_text": "이번 생에서는 책은 양반 집 서가에만 꽂혔다.",
    "merge_real": {
     "text": "1434년 《삼강행실도》가 나왔다. 글을 모르는 백성도 알아보도록 이야기마다 그림을 넣었다.",
     "sources": [
      {
       "type": "guide",
       "page": "246",
       "tb": "82"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "S06": {
  "event": "자격루",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(treasury) >= 15",
    "normal": "gauge(treasury) >= 25",
    "sage": "gauge(treasury) >= 35 && real(S02)",
    "annals": "gauge(treasury) >= 40 && gauge(nobles) >= 30 && real(S05)"
   },
   "require_reason": "구리를 살 곳간이 모자란다"
  },
  "alt": [
   {
    "id": "S06a1",
    "label": "장영실을 돌려보낸다",
    "unlock": "gauge(nobles) >= 60",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_장영실귀향",
    "this_run": "\"노비 출신에게 맡길 수 없다\"는 말에 장영실은 동래로 돌아갔다. 물시계는 만들어지지 않았다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "신분을 따지는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 \"노비 출신에게 맡길 수 없다\"는 말에 장영실은 동래로 돌아갔다.",
    "merge_real": {
     "text": "1434년 장영실이 만든 물시계 자격루가 완성되었다. 장영실은 동래현 관청 노비 출신으로, 세종이 재주를 알아보고 벼슬을 주었다.",
     "sources": [
      {
       "type": "guide",
       "page": "264",
       "tb": "90"
      }
     ],
     "out_of_textbook": false
    },
    "variants": {
     "S08": "S08v1"
    },
    "skip": [
     "C02b"
    ]
   },
   {
    "id": "S06a2",
    "label": "해시계만 쓴다",
    "unlock": "gauge(treasury) <= 40",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "set_flag": "F_해시계만",
    "this_run": "물시계는 그만두고 해시계만 썼다. 밤과 흐린 날에는 시각을 알 수 없었다.",
    "lock_hint": "국고 40 이하",
    "lock_reason": "곳간이 넉넉해 물시계를 만들자는 쪽이 크다",
    "merge_text": "이번 생에서는 물시계는 그만두고 해시계만 썼다.",
    "merge_real": {
     "text": "1434년 물시계 자격루가 완성되었다. 정해진 때가 되면 나무 인형이 종·북·징을 쳐서 시각을 알렸다.",
     "sources": [
      {
       "type": "guide",
       "page": "264",
       "tb": "90"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "S07": {
  "event": "관청 노비의 출산 휴가",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 15",
    "normal": "gauge(people) >= 30",
    "sage": "gauge(people) >= 40 && gauge(treasury) >= 25",
    "annals": "gauge(people) >= 45 && gauge(treasury) >= 30 && real(S06)"
   },
   "require_reason": "백성을 돌볼 여유가 모자란다"
  },
  "alt": [
   {
    "id": "S07a1",
    "label": "양반 집에도 준다",
    "unlock": "gauge(people) >= 60",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "set_flag": "F_휴가확대",
    "this_run": "관청 노비뿐 아니라 양반 집 노비에게도 출산 휴가를 주게 했다. 양반들이 \"일손이 없다\"며 들고일어났다.",
    "lock_hint": "백성 60 이상",
    "lock_reason": "백성 편을 드는 목소리가 아직 작다",
    "merge_text": "이번 생에서는 관청 노비뿐 아니라 양반 집 노비에게도 출산 휴가를 주게 했다.",
    "merge_real": {
     "text": "세종은 1426년 아이를 낳은 관청 여자 노비에게 100일 휴가를 주었고, 1430년 낳기 전 1개월을 더했으며, 1434년 남편에게도 30일을 주었다.",
     "sources": [
      {
       "type": "web",
       "title": "우리역사넷",
       "url": "https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010"
      }
     ],
     "out_of_textbook": true
    }
   },
   {
    "id": "S07a2",
    "label": "일손부터 늘린다",
    "unlock": "gauge(treasury) >= 55",
    "effects": {
     "people": 5,
     "treasury": -10
    },
    "set_flag": "F_일손",
    "this_run": "휴가를 주는 대신 관청에 일꾼을 더 들였다. 산모들의 일이 조금 줄었다.",
    "lock_hint": "국고 55 이상",
    "lock_reason": "일꾼을 들일 곳간이 모자란다",
    "merge_text": "이번 생에서는 휴가를 주는 대신 관청에 일꾼을 더 들였다.",
    "merge_real": {
     "text": "세종은 1426년 아이를 낳은 관청 여자 노비에게 100일 휴가를 주었다.",
     "sources": [
      {
       "type": "web",
       "title": "우리역사넷",
       "url": "https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "S08": {
  "event": "임금 가마 사건",
  "event_type": "judge",
  "real": {},
  "alt": [
   {
    "id": "S08a1",
    "label": "장영실을 감싼다",
    "unlock": "gauge(people) >= 55 && !flag(F_장영실귀향)",
    "effects": {
     "people": 10,
     "nobles": -15
    },
    "set_flag": "F_장영실",
    "this_run": "세종은 벌을 묻지 않고 장영실을 공방으로 돌려보냈다. 대신들은 \"법이 무너졌다\"며 며칠 동안 상소를 올렸다.",
    "lock_hint": "백성 55 이상 · 장영실을 돌려보내지 않은 판",
    "lock_reason": "장영실 편을 들어 줄 백성의 마음이 아직 작다",
    "merge_text": "이번 생에서는 세종은 벌을 묻지 않고 장영실을 공방으로 돌려보냈다.",
    "merge_real": {
     "text": "1442년 의금부가 장영실에게 무거운 벌을 청했고 세종은 벌을 줄여 주었다. 장영실은 벼슬을 잃었고, 그 뒤 기록에서 이름이 사라졌다.",
     "sources": [
      {
       "type": "web",
       "title": "조선왕조실록 세종 24년 4월 27일",
       "url": "https://sillok.history.go.kr/id/kda_12404027_002"
      }
     ],
     "out_of_textbook": true
    },
    "branch": "②"
   }
  ]
 },
 "S09": {
  "event": "훈민정음 반포",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 20",
    "normal": "gauge(people) >= 30",
    "sage": "gauge(people) >= 40 && gauge(nobles) >= 30 && real(S07)",
    "annals": "gauge(people) >= 45 && gauge(nobles) >= 35 && real(S05) && real(S07)"
   },
   "require_reason": "새 글자를 받아 줄 백성의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "S09a1",
    "label": "반포를 거둔다",
    "unlock": {
     "sprout": "gauge(nobles) >= 64",
     "normal": "gauge(nobles) >= 70",
     "sage": "gauge(nobles) >= 70",
     "annals": "gauge(nobles) >= 70"
    },
    "effects": {
     "nobles": 15,
     "people": -15
    },
    "set_flag": "F_반포취소",
    "this_run": "새 글자는 궁궐 서고 깊숙이 들어갔다. 백성들은 여전히 한자를 몰라 글을 읽지 못했다.",
    "lock_hint": "양반 70 이상",
    "lock_reason": "반대하는 양반들의 힘이 그 정도로 크지는 않다",
    "merge_text": "이번 생에서는 새 글자는 궁궐 서고 깊숙이 들어갔다.",
    "merge_real": {
     "text": "세종은 1443년 훈민정음 28자를 만들고 1446년 반포했다. 최만리 등의 반대가 있었지만 반포를 거두지 않았다.",
     "sources": [
      {
       "type": "guide",
       "page": "262",
       "tb": "88"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 }
};
  for (const cid in P) {
    const c = byId(cid);
    if (!c) continue;
    c.event = P[cid].event;
    c.event_type = P[cid].event_type;
    c.paths = c.paths || { real: {} };
    Object.assign(c.paths.real, P[cid].real, { how_right: c.choices.right.label, how_left: c.choices.left.label });
    c.paths.alt = P[cid].alt;
  }
  D.cards.push(...[
 {
  "id": "AS01",
  "kind": "alt",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_쓰시마) && seen(S02) && !seen(S04)"
  ],
  "conditions_text": "쓰시마를 치지 않은 생, S02 뒤 S04 앞",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "왜구 배가 또 바닷가 마을에 나타났사옵니다. 이번에는 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "수군을 늘린다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "바닷가 포구마다 새 배가 매였다. 수군들이 밤낮으로 바다를 돌았다."
   },
   "left": {
    "label": "마을을 안으로 옮긴다",
    "effects": {
     "army": 5,
     "people": -10
    },
    "this_run": "바닷가 사람들이 짐을 지고 산 쪽 마을로 옮겨 갔다. 빈 포구에 갈매기만 남았다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1419년 조선은 왜구의 근거지 쓰시마섬을 정벌했다(지도서 234).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "남쪽 바다에 낯선 돛배 몇 척이 맴돌고, 포구에 수군 배가 늘어선다.",
   "scene": "ship"
  }
 },
 {
  "id": "AS02",
  "kind": "alt",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_쓰시마) && seen(AS01) && seen(S05)"
  ],
  "conditions_text": "쓰시마를 치지 않은 생, AS01 뒤 S05 뒤",
  "who": {
   "name": "예조 관리",
   "doll": "official_red"
  },
  "line": "쓰시마에서 사신이 와 \"쌀을 보내 주면 왜구를 막겠다\" 하옵니다. 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "쌀을 보낸다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "쌀을 실은 배가 쓰시마로 떠났다. 그해 바닷가가 조용했다."
   },
   "left": {
    "label": "돌려보낸다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "사신은 빈손으로 돌아갔다. 바닷가 봉수대에 다시 연기가 올랐다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 쓰시마섬을 정벌한 뒤 1423년 부산포와 제포를 열어 왜인들이 머물며 장사하게 했다(백과 '삼포' https://encykorea.aks.ac.kr/Article/E0026914).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "쓰시마 쪽 바다로 쌀가마를 실은 배가 떠나간다.",
   "scene": "envoy"
  }
 },
 {
  "id": "AS03",
  "kind": "alt",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_장영실) && !seen(S09)"
  ],
  "conditions_text": "장영실을 끝까지 감싼 생, S08 바로 뒤",
  "who": {
   "name": "장영실",
   "doll": "jangyeongsil"
  },
  "line": "벌을 면해 주신 은혜를 갚고 싶사옵니다. 하늘과 시간을 한 번에 보는 큰 기구를 만들어 보겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "공방을 맡긴다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "장영실이 공방 문을 다시 열었다. 망치 소리가 새벽까지 이어졌다.",
    "device": {
     "invention": 1
    }
   },
   "left": {
    "label": "쉬며 가르치게 한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "장영실은 젊은 장인들에게 물시계 만드는 법을 가르쳤다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1442년 장영실은 벼슬을 잃었고, 그 뒤 기록에서 이름이 사라졌다(실록 세종 24년 4월 27일 https://sillok.history.go.kr/id/kda_12404027_002).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "공방 굴뚝에서 연기가 오르고, 혼천의와 물시계를 합친 듯한 기구 그림자가 창에 비친다."
  }
 },
 {
  "id": "S08v1",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "rarity": "common",
  "alt_only": true,
  "variant_of": "S08",
  "event_type": "variant",
  "conditions": [
   "flag(F_장영실귀향)"
  ],
  "conditions_text": "S06에서 다른 길 \"장영실을 돌려보낸다\"를 고른 생 — S08 대신",
  "who": {
   "name": "의금부 관리",
   "doll": "official_blue"
  },
  "line": "임금님 가마가 부서졌사옵니다. 장영실이 떠난 뒤 공방을 맡은 장인들이 만든 가마이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "벌을 줄여 준다",
    "effects": {
     "people": 5,
     "nobles": -10
    },
    "this_run": "장인들은 매만 조금 맞고 공방으로 돌아갔다. 대신들은 \"법이 가볍다\"고 했다."
   },
   "left": {
    "label": "법대로 둔다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "장인들이 무거운 벌을 받았다. 공방 문이 한동안 닫혔다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1442년 가마가 부서진 일로 의금부가 장영실에게 무거운 벌을 청했고, 세종은 벌을 줄여 주었다(실록 https://sillok.history.go.kr/id/kda_12404027_002).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "왕의 가마 모형이 덜컹 기운다. 자격루가 없는 궁궐에 종소리는 울리지 않는다."
  }
 }
]);
  for (const c of D.cards)
    if (c.variant_of && c.order === undefined) {
      const o = byId(c.variant_of);
      if (o) {
        c.order = o.order;
        c.event = o.event;
      }
    }
  D.branches = (D.branches || []).concat([
 {
  "id": "sejong①",
  "stage": "sejong",
  "name": "쓰시마를 치지 않은 조선",
  "flag": "F_쓰시마",
  "done": "flag(F_쓰시마) && seen(AS01) && seen(AS02)",
  "done_text": "F_쓰시마 + AS01·AS02를 지나 클리어",
  "title": "칼 대신 바닷가를 지킨 나라",
  "scene": "남쪽 바닷가를 따라 봉수대와 수군 배가 늘어서고, 쓰시마 쪽 바다로 쌀 배가 오간다.",
  "sagwan": "이번 생의 조선은 바다를 건너 싸우지 않고 바닷가를 지켰다. 실제로는 1419년 쓰시마섬을 정벌했다.",
  "path": [
   "S01a1 정벌하지 않는다",
   "AS01 다시 나타난 왜구 배",
   "AS02 쓰시마의 사신"
  ],
  "end_fx": {
   "scene": "ship",
   "at": "sungnye"
  }
 },
 {
  "id": "sejong②",
  "stage": "sejong",
  "name": "장영실과 함께한 조선",
  "flag": "F_장영실",
  "done": "flag(F_장영실) && seen(AS03)",
  "done_text": "F_장영실 + AS03을 지나 클리어",
  "title": "장인을 끝까지 믿은 임금",
  "scene": "공방 마당에 장영실과 젊은 장인 인형들이 둘러서고, 새 기구의 고리가 햇빛에 반짝인다.",
  "sagwan": "이번 생의 장영실은 끝까지 공방을 지켰다. 실제로는 1442년 가마 사건 뒤 벼슬을 잃고 기록에서 사라졌다.",
  "path": [
   "S06 자격루(실제대로)",
   "S08a1 장영실을 감싼다",
   "AS03 장영실의 새 기구"
  ],
  "end_fx": {
   "scene": "market",
   "at": "jagyeok"
  }
 }
]);
  D.titles.push(...[
 {
  "id": "branch-sejong①",
  "name": "칼 대신 바닷가를 지킨 나라",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 sejong① 쓰시마를 치지 않은 조선 — F_쓰시마 + AS01·AS02를 지나 클리어",
  "rule": "branch:sejong①"
 },
 {
  "id": "branch-sejong②",
  "name": "장인을 끝까지 믿은 임금",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 sejong② 장영실과 함께한 조선 — F_장영실 + AS03을 지나 클리어",
  "rule": "branch:sejong②"
 }
]);
})();
