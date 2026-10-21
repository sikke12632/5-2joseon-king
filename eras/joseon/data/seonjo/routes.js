/* 루트(다른 길·실제 경로 잠금·갈래) — 집필 파일 routes_J.py 에서 tools/import-routes2.py 로 만든 파일. 직접 고치지 말 것.
 * 그 왕 역사 카드에 사건 이름·paths(real.require 난이도별 · alt 다른 길)를 붙이고, 갈래 카드·변형판·갈래 이야기·칭호를 더한다. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const P = {
 "J01": {
  "event": "통신사의 두 보고",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(army) >= 10",
    "normal": "gauge(army) >= 20",
    "sage": "gauge(army) >= 25",
    "annals": "gauge(army) >= 25 && gauge(treasury) >= 25"
   },
   "require_reason": "전쟁 준비를 의논할 장수들이 모자란다"
  },
  "alt": [
   {
    "id": "J01a1",
    "label": "바닷가 성만 고친다",
    "unlock": "gauge(treasury) >= 40",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "set_flag": "F_바닷가성",
    "this_run": "온 나라를 다 준비하지는 않고 남쪽 바닷가 성 몇 곳만 고쳤다. 다른 성들은 그대로였다.",
    "lock_hint": "국고 40 이상",
    "lock_reason": "성을 고칠 곳간이 모자란다",
    "merge_text": "이번 생에서는 온 나라를 다 준비하지는 않고 남쪽 바닷가 성 몇 곳만 고쳤다.",
    "merge_real": {
     "text": "1592년 4월 일본군이 쳐들어왔다(임진왜란). 통신사 황윤길과 김성일의 보고가 서로 달랐다.",
     "sources": [
      {
       "type": "guide",
       "page": "235"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "J02": {
  "event": "임진왜란 — 한양을 떠나다",
  "event_type": "normal",
  "real": {},
  "alt": [
   {
    "id": "J02a1",
    "label": "한양을 지킨다",
    "unlock": "gauge(army) >= 45",
    "effects": {
     "army": -10,
     "people": 10
    },
    "set_flag": "F_한양",
    "this_run": "한양을 떠나지 않고 성문을 닫았다. 군사와 백성이 함께 성벽에 올랐고, 도성 곳곳에 연기가 올랐지만 궁궐과 종묘는 지켜 냈다.",
    "lock_hint": "국방 45 이상",
    "lock_reason": "도성을 지킬 군사가 모자란다",
    "merge_text": "이번 생에서는 한양을 떠나지 않고 성문을 닫았다.",
    "merge_real": {
     "text": "전쟁 초기 조선은 일본군을 막아 내지 못했다. 1592년 4월 30일 선조는 한양을 떠나 평양을 거쳐 의주에 이르렀고, 종묘와 궁궐이 불에 탔다.",
     "sources": [
      {
       "type": "guide",
       "page": "235",
       "tb": "77"
      },
      {
       "type": "web",
       "title": "날짜: 조선왕조실록 선조 25년 4월 30일",
       "url": "https://sillok.history.go.kr/search/inspectionDayList.do?id=kna_125040&did=kna_12504030"
      }
     ],
     "out_of_textbook": true
    },
    "branch": "①",
    "skip": [
     "C05a",
     "DJ116",
     "DJ141"
    ],
    "fx": {
     "scene": "warSmoke"
    }
   }
  ]
 },
 "J03": {
  "event": "한산도 대첩",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(army) >= 10",
    "normal": "gauge(army) >= 20",
    "sage": "gauge(army) >= 25 && gauge(treasury) >= 20",
    "annals": "gauge(army) >= 30 && gauge(treasury) >= 20 && real(J01)"
   },
   "require_reason": "수군에 보낼 화약과 쌀이 모자란다"
  },
  "alt": [
   {
    "id": "J03a1",
    "label": "배를 육지 성으로",
    "unlock": "gauge(army) <= 40",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "set_flag": "F_수군해산",
    "this_run": "수군 군사들을 배에서 내려 바닷가 성을 지키게 했다. 바다는 비었고, 낯선 배들이 물길을 따라 올라왔다.",
    "lock_hint": "국방 40 이하",
    "lock_reason": "수군을 믿는 목소리가 크다",
    "merge_text": "이번 생에서는 수군 군사들을 배에서 내려 바닷가 성을 지키게 했다.",
    "merge_real": {
     "text": "1592년 한산도에서 이순신의 수군이 학익진으로 크게 이겼다. 수군의 활약으로 전쟁의 흐름이 바뀌었다.",
     "sources": [
      {
       "type": "guide",
       "page": "235",
       "tb": "77"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "R03",
     "DJ118",
     "DJ121",
     "DJ123",
     "DJ124",
     "DJ125"
    ],
    "crisis_mult": {
     "army:low": 1.3
    }
   }
  ]
 },
 "J04": {
  "event": "의병",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 20",
    "sage": "gauge(people) >= 25",
    "annals": "gauge(people) >= 30"
   },
   "require_reason": "의병으로 일어설 백성의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "J04a1",
    "label": "관군만 믿는다",
    "unlock": "gauge(nobles) >= 55",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_관군만",
    "this_run": "\"군사 일은 나라가 한다\"며 의병을 모으지 말라는 명을 내렸다. 고을 선비들은 몰래 모였지만 수가 적었다.",
    "lock_hint": "양반 55 이상",
    "lock_reason": "관군만으로 된다는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 \"군사 일은 나라가 한다\"며 의병을 모으지 말라는 명을 내렸다.",
    "merge_real": {
     "text": "전국 각지에서 의병이 일어나 활약했다. 의병과 수군, 명의 원군으로 전쟁의 흐름이 바뀌었다.",
     "sources": [
      {
       "type": "guide",
       "page": "235",
       "tb": "77"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "C04a",
     "DJ126",
     "DJ132"
    ],
    "crisis_mult": {
     "army:low": 1.2
    }
   }
  ]
 },
 "J05": {
  "event": "명의 원군",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 10",
    "normal": "gauge(nobles) >= 20",
    "sage": "gauge(nobles) >= 25 && gauge(treasury) >= 20",
    "annals": "gauge(nobles) >= 30 && gauge(treasury) >= 20 && real(J03)"
   },
   "require_reason": "명에 사신을 보내 청할 대신들의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "J05a1",
    "label": "스스로 막아 낸다",
    "unlock": "gauge(army) >= 60",
    "effects": {
     "army": -10,
     "treasury": 10
    },
    "set_flag": "F_원군없음",
    "this_run": "명에 군대를 청하지 않고 조선 군사만으로 버티기로 했다. 군량은 아꼈지만 싸움은 더디게 흘렀다.",
    "lock_hint": "국방 60 이상",
    "lock_reason": "조선 군사만으로 버틸 힘이 모자란다",
    "merge_text": "이번 생에서는 명에 군대를 청하지 않고 조선 군사만으로 버티기로 했다.",
    "merge_real": {
     "text": "명에서 군대를 보내 도와주면서 전쟁의 흐름이 바뀌었다.",
     "sources": [
      {
       "type": "guide",
       "page": "235",
       "tb": "77"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "DJ130"
    ]
   }
  ]
 },
 "J06": {
  "event": "명량 해전",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(army) >= 10",
    "normal": "gauge(army) >= 15",
    "sage": "gauge(army) >= 20",
    "annals": "gauge(army) >= 25 && real(J03)"
   },
   "require_reason": "남은 배를 다시 모을 군사가 모자란다"
  },
  "alt": [
   {
    "id": "J06a1",
    "label": "육지 성을 쌓는다",
    "unlock": "gauge(treasury) >= 45",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "set_flag": "F_육지성",
    "this_run": "남은 배로 바다에 나가지 않고, 바닷가 산성을 높이 쌓아 지켰다. 물길은 열린 채였다.",
    "lock_hint": "국고 45 이상",
    "lock_reason": "산성을 쌓을 곳간이 모자란다",
    "merge_text": "이번 생에서는 남은 배로 바다에 나가지 않고, 바닷가 산성을 높이 쌓아 지켰다.",
    "merge_real": {
     "text": "1597년 명량(울돌목)에서 이순신은 13척의 배로 싸워 크게 이겼다.",
     "sources": [
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '명량대첩'",
       "url": "https://encykorea.aks.ac.kr/Article/E0018250"
      }
     ],
     "out_of_textbook": true
    },
    "skip": [
     "LJ02"
    ]
   }
  ]
 },
 "J07": {
  "event": "《징비록》",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 10",
    "normal": "gauge(nobles) >= 15",
    "sage": "gauge(nobles) >= 20",
    "annals": "gauge(nobles) >= 25"
   },
   "require_reason": "전쟁을 되돌아볼 신하들이 모자란다"
  },
  "alt": [
   {
    "id": "J07a1",
    "label": "기록을 남기지 않는다",
    "unlock": {
     "sprout": "gauge(nobles) >= 52",
     "normal": "gauge(nobles) >= 60",
     "sage": "gauge(nobles) >= 60",
     "annals": "gauge(nobles) >= 60"
    },
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_기록없음",
    "this_run": "부끄러운 일을 적지 않기로 했다. 몇 해 뒤 \"같은 잘못을 되풀이할까 걱정된다\"는 상소가 올라왔다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "잘못을 덮자는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 부끄러운 일을 적지 않기로 했다.",
    "merge_real": {
     "text": "1598년 7년 전쟁이 끝났다. 유성룡은 관직에서 물러난 뒤 전쟁의 잘못까지 숨기지 않고 《징비록》에 적었다.",
     "sources": [
      {
       "type": "guide",
       "page": "235",
       "tb": "77"
      }
     ],
     "out_of_textbook": false
    },
    "skip": [
     "DJ138",
     "DJ138f"
    ]
   }
  ]
 },
 "J08": {
  "event": "인조반정과 명·후금",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 15",
    "normal": "gauge(nobles) >= 25",
    "sage": "gauge(nobles) >= 30",
    "annals": "gauge(nobles) >= 30 && real(J07)"
   },
   "require_reason": "새 조정을 세울 신하들의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "J08a1",
    "label": "두 나라와 다 지낸다",
    "unlock": "gauge(people) >= 50 && gauge(army) >= 40",
    "effects": {
     "nobles": -10,
     "army": 10
    },
    "set_flag": "F_중립",
    "this_run": "새 조정도 명과 후금 어느 한쪽에 치우치지 않기로 했다. 명을 받들자는 신하들은 거세게 반대했다.",
    "lock_hint": "백성 50 이상 · 국방 40 이상",
    "lock_reason": "나라를 버틸 백성과 군사의 힘이 모자란다",
    "merge_text": "이번 생에서는 새 조정도 명과 후금 어느 한쪽에 치우치지 않기로 했다.",
    "merge_real": {
     "text": "광해군은 명과 후금 사이에서 한쪽에 치우치지 않으려 했다. 1623년 신하들이 광해군을 몰아내고 인조를 세운 뒤 조정은 명을 가까이했다. 광해군을 어떻게 볼지는 학자마다 다르다.",
     "sources": [
      {
       "type": "web",
       "title": "우리역사넷 '광해군'",
       "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n300900&code=kc_age_30"
      }
     ],
     "out_of_textbook": true
    },
    "branch": "②"
   }
  ]
 },
 "J09": {
  "event": "청의 요구",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "J10": {
  "event": "남한산성 — 주화와 척화",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "J11": {
  "event": "병자호란의 결과",
  "event_type": "normal",
  "real": {},
  "alt": []
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
  "id": "AJ01",
  "kind": "alt",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_한양) && seen(J03) && !seen(J07)"
  ],
  "conditions_text": "한양을 지킨 생, J03 뒤 J07 앞",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "성벽을 지키느라 도성 사람들이 모두 지쳤사옵니다. 성 안 사람들을 어찌 쉬게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "번갈아 쉬게 한다",
    "effects": {
     "people": 10,
     "army": -5
    },
    "this_run": "성벽 위 사람들을 세 무리로 나누어 번갈아 쉬게 했다. 성 안 마당에 죽 솥이 걸렸다."
   },
   "left": {
    "label": "군사만 지키게 한다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "백성은 성벽에서 내려오고 군사들만 남았다. 성벽 위 자리가 듬성듬성해졌다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1592년 4월 30일 선조는 한양을 떠나 의주까지 피란했고, 종묘와 궁궐이 불에 탔다(지도서 235, 실록 선조 25년 4월 30일).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "도성 성벽 위에 깃발과 사람 인형들이 줄지어 서 있고, 성 안 마당에 김이 오른다."
  }
 },
 {
  "id": "AJ02",
  "kind": "alt",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_한양) && seen(AJ01) && seen(J07)"
  ],
  "conditions_text": "한양을 지킨 생, AJ01 뒤 J07 뒤",
  "who": {
   "name": "종묘를 지키는 관리",
   "doll": "official_green"
  },
  "line": "전쟁 동안 종묘를 지켜 낸 것을 기리는 제사를 올릴까 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 올린다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "종묘 앞마당에 제사상이 차려지고 신하들이 줄지어 섰다."
   },
   "left": {
    "label": "조용히 올린다",
    "effects": {
     "people": 5,
     "treasury": 5
    },
    "this_run": "제사는 조용히 지내고, 남은 쌀은 도성 사람들에게 나누었다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 임진왜란 때 종묘와 세 대궐이 모두 재가 되었다(《징비록》, 지도서 235).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "종묘 지붕 위로 맑은 하늘이 열리고 향 연기가 곧게 오른다."
  }
 },
 {
  "id": "AJ03",
  "kind": "alt",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_중립) && !seen(J09)"
  ],
  "conditions_text": "두 나라와 다 지낸 생, J08 뒤 J09 앞",
  "who": {
   "name": "국경의 역관",
   "doll": "jungin"
  },
  "line": "후금 사신이 국경 강가에 장터를 열어 물건을 사고팔자 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "장터를 연다",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "this_run": "국경 강가에 장막이 서고 말과 인삼, 쌀과 무명이 오갔다."
   },
   "left": {
    "label": "사신만 맞는다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "사신은 대접을 받고 돌아갔다. 장터 이야기는 다음으로 미뤘다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1623년 인조반정 뒤 조정은 명을 가까이했고, 1627년 후금이 쳐들어왔다(정묘호란 — 우리역사넷 '광해군' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n300900&code=kc_age_30 · 지도서 239).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "북쪽 강가에 장막 몇 개가 서고, 말 인형과 짐 꾸러미가 오간다.",
   "scene": "market"
  }
 },
 {
  "id": "AJ04",
  "kind": "alt",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_중립) && seen(AJ03) && !seen(J09)"
  ],
  "conditions_text": "두 나라와 다 지낸 생, AJ03 뒤 J09 앞",
  "who": {
   "name": "명에 다녀온 사신",
   "doll": "official_red"
  },
  "line": "명에서 \"조선이 후금과 가깝게 지낸다\"며 못마땅해한다 하옵니다. 어찌 답할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "두 나라 다 존중한다",
    "effects": {
     "nobles": -5,
     "army": 10
    },
    "this_run": "\"어느 나라와도 다투지 않으려 한다\"는 글을 보냈다. 명 사신의 얼굴은 굳었다."
   },
   "left": {
    "label": "명을 달랜다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "명에 선물을 넉넉히 보내 달랬다. 후금 쪽 장터는 조용해졌다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 광해군은 명과 후금 사이에서 한쪽에 치우치지 않으려 했다. 이 외교를 어떻게 볼지는 학자마다 다르다(우리역사넷).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "남쪽과 북쪽 길로 사신 행렬이 하나씩 오간다.",
   "scene": "envoy"
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
  "id": "seonjo①",
  "stage": "seonjo",
  "name": "한양을 지킨 조선",
  "flag": "F_한양",
  "done": "flag(F_한양) && seen(AJ01) && seen(AJ02)",
  "done_text": "F_한양 + AJ01·AJ02를 지나 클리어",
  "title": "도성을 지킨 임금",
  "scene": "도성 성벽 위에 깃발이 늘어서고, 불타지 않은 종묘 지붕 위로 맑은 하늘이 열린다.",
  "sagwan": "이번 생의 조선은 한양을 떠나지 않았다. 실제로는 1592년 선조가 한양을 떠나 의주까지 피란했고, 종묘와 궁궐이 불에 탔다.",
  "path": [
   "J02a1 한양을 지킨다",
   "AJ01 지친 도성 사람들",
   "AJ02 종묘를 기리는 제사"
  ],
  "end_fx": {
   "scene": "harvest",
   "at": "jongmyo"
  }
 },
 {
  "id": "seonjo②",
  "stage": "seonjo",
  "name": "광해군 길을 이은 조선",
  "flag": "F_중립",
  "done": "flag(F_중립) && seen(AJ03) && seen(AJ04)",
  "done_text": "F_중립 + AJ03·AJ04를 지나 클리어",
  "title": "두 나라 사이를 걸은 임금",
  "scene": "북쪽 강가 장터와 남쪽 사신 길에 행렬이 오간다. 그래도 겨울이 오자 북쪽에서 군대가 내려온다.",
  "sagwan": "이번 생의 조선은 명과 후금 사이에서 한쪽에 치우치지 않으려 했다. 실제로는 인조반정 뒤 조정이 명을 가까이했고, 1627년 정묘호란과 1636년 병자호란이 일어났다. 다른 길이었다면 어땠을지는 아무도 모른다.",
  "path": [
   "J08a1 두 나라와 다 지낸다",
   "AJ03 국경 강가의 장터",
   "AJ04 명의 못마땅함"
  ],
  "end_fx": {
   "scene": "envoy",
   "at": "heungin"
  }
 }
]);
  D.titles.push(...[
 {
  "id": "branch-seonjo①",
  "name": "도성을 지킨 임금",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 seonjo① 한양을 지킨 조선 — F_한양 + AJ01·AJ02를 지나 클리어",
  "rule": "branch:seonjo①"
 },
 {
  "id": "branch-seonjo②",
  "name": "두 나라 사이를 걸은 임금",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 seonjo② 광해군 길을 이은 조선 — F_중립 + AJ03·AJ04를 지나 클리어",
  "rule": "branch:seonjo②"
 }
]);
})();
