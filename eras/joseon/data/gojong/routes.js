/* 루트(다른 길·실제 경로 잠금·갈래) — 집필 파일 routes_G.py 에서 tools/import-routes2.py 로 만든 파일. 직접 고치지 말 것.
 * 그 왕 역사 카드에 사건 이름·paths(real.require 난이도별 · alt 다른 길)를 붙이고, 갈래 카드·변형판·갈래 이야기·칭호를 더한다. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const P = {
 "G01": {
  "event": "농민 봉기",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "G02": {
  "event": "경복궁 중건",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(treasury) >= 10",
    "normal": "gauge(treasury) >= 15",
    "sage": "gauge(treasury) >= 20",
    "annals": "gauge(treasury) >= 25"
   },
   "require_reason": "궁궐을 다시 지을 곳간이 모자란다"
  },
  "alt": [
   {
    "id": "G02a1",
    "label": "궁궐을 미룬다",
    "unlock": {
     "sprout": "gauge(treasury) <= 38",
     "normal": "gauge(treasury) <= 30",
     "sage": "gauge(treasury) <= 30",
     "annals": "gauge(treasury) <= 30"
    },
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "set_flag": "F_궁궐미룸",
    "this_run": "경복궁 터는 풀밭 그대로 두었다. 공사에 쓸 돈과 일손은 고을로 돌아갔다.",
    "lock_hint": "국고 30 이하",
    "lock_reason": "궁궐을 다시 지을 곳간이 넉넉하다",
    "merge_text": "이번 생에서는 경복궁 터는 풀밭 그대로 두었다.",
    "merge_real": {
     "text": "흥선 대원군은 1865년부터 1868년까지 임진왜란 때 불탄 경복궁을 다시 지었다.",
     "sources": [
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '경복궁'",
       "url": "https://encykorea.aks.ac.kr/Article/E0002434"
      }
     ],
     "out_of_textbook": true
    },
    "skip": []
   }
  ]
 },
 "G03": {
  "event": "양요와 척화비",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "G04": {
  "event": "강화도 조약",
  "event_type": "normal",
  "real": {},
  "alt": [
   {
    "id": "G04a1",
    "label": "조약을 끝내 거부한다",
    "unlock": {
     "sprout": "gauge(army) >= 50",
     "normal": "gauge(army) >= 55",
     "sage": "gauge(army) >= 55",
     "annals": "gauge(army) >= 55"
    },
    "effects": {
     "army": -10,
     "nobles": 10
    },
    "set_flag": "F_문닫음",
    "this_run": "조약 문서에 도장을 찍지 않았다. 바닷가 포대마다 군사가 늘었고, 항구는 닫힌 채였다.",
    "lock_hint": "국방 55 이상",
    "lock_reason": "조약을 끝내 거부할 군사의 힘이 모자란다",
    "merge_text": "이번 생에서는 조약 문서에 도장을 찍지 않았다.",
    "merge_real": {
     "text": "1876년 조선은 일본과 강화도 조약을 맺었다. 외국과 맺은 최초의 근대적 조약이지만 일본에 유리한 점이 많은 불평등 조약이었다.",
     "sources": [
      {
       "type": "guide",
       "page": "301",
       "tb": "103"
      }
     ],
     "out_of_textbook": false
    },
    "branch": "①",
    "skip": [
     "RG01"
    ],
    "crisis_mult": {
     "army:low": 1.3
    }
   }
  ]
 },
 "G05": {
  "event": "우정총국과 갑신정변",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 10",
    "normal": "gauge(nobles) >= 20",
    "sage": "gauge(nobles) >= 25",
    "annals": "gauge(nobles) >= 30 && real(G02)"
   },
   "require_reason": "새 관청을 맡을 신하들의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "G05a1",
    "label": "잔치를 미룬다",
    "unlock": "gauge(treasury) <= 35",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "set_flag": "F_우정미룸",
    "this_run": "우편 관청을 여는 잔치를 미뤘다. 편지는 여전히 사람 손으로 오갔다.",
    "lock_hint": "국고 35 이하",
    "lock_reason": "잔치를 열 곳간이 넉넉하다",
    "merge_text": "이번 생에서는 우편 관청을 여는 잔치를 미뤘다.",
    "merge_real": {
     "text": "1884년 우정총국을 여는 잔치 날, 김옥균 등 일부 관리들이 개화를 서두르려고 갑신정변을 일으켰다. 정변은 사흘 만에 실패로 끝났다.",
     "sources": [
      {
       "type": "guide",
       "page": "302",
       "tb": "104"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "G06": {
  "event": "동학 농민 운동",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "G07": {
  "event": "갑오개혁",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 20",
    "sage": "gauge(people) >= 25",
    "annals": "gauge(people) >= 30 && real(G05)"
   },
   "require_reason": "개혁을 밀어붙일 백성의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "G07a1",
    "label": "옛 제도를 지킨다",
    "unlock": "gauge(nobles) >= 65",
    "effects": {
     "nobles": 10,
     "people": -15
    },
    "set_flag": "F_개혁없음",
    "this_run": "신분 제도와 과거를 그대로 두었다. 양반들은 안도했고, 노비 문서는 그대로 남았다.",
    "lock_hint": "양반 65 이상",
    "lock_reason": "옛 제도를 지키자는 양반들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 신분 제도와 과거를 그대로 두었다.",
    "merge_real": {
     "text": "1894년 정부는 갑오개혁으로 신분 제도를 없애고 세금 제도를 고쳤다. 과거제가 없어지고 남편을 잃은 여성의 재혼도 허락되었다.",
     "sources": [
      {
       "type": "guide",
       "page": "302",
       "tb": "104"
      }
     ],
     "out_of_textbook": false
    },
    "branch": "②"
   }
  ]
 },
 "G08": {
  "event": "단발령",
  "event_type": "normal",
  "real": {},
  "alt": [
   {
    "id": "G08a1",
    "label": "단발을 거둔다",
    "unlock": "gauge(people) <= 30",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "set_flag": "F_단발거둠",
    "this_run": "상투를 자르라는 명을 거두었다. 선비들이 문을 다시 열었다.",
    "lock_hint": "백성 30 이하",
    "lock_reason": "백성의 반발이 그 정도로 크지는 않다",
    "merge_text": "이번 생에서는 상투를 자르라는 명을 거두었다.",
    "merge_real": {
     "text": "1895년 말 단발령이 내려지자 많은 사람이 반발했다.",
     "sources": [
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '단발령'",
       "url": "https://encykorea.aks.ac.kr/Article/E0013579"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "G09": {
  "event": "《독립신문》",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 20",
    "sage": "gauge(people) >= 25",
    "annals": "gauge(people) >= 30 && real(G07)"
   },
   "require_reason": "신문을 읽을 백성의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "G09a1",
    "label": "신문을 막는다",
    "unlock": "gauge(nobles) >= 60",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_신문없음",
    "this_run": "한글 신문을 찍지 못하게 했다. 장터 사람들은 소문으로만 나랏일을 들었다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "신문을 막자는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 한글 신문을 찍지 못하게 했다.",
    "merge_real": {
     "text": "1896년 서재필이 정부의 지원을 받아 최초의 한글 신문 《독립신문》을 펴냈다.",
     "sources": [
      {
       "type": "guide",
       "page": "303",
       "tb": "105"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "G10": {
  "event": "대한 제국",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(treasury) >= 10",
    "normal": "gauge(treasury) >= 15",
    "sage": "gauge(treasury) >= 20",
    "annals": "gauge(treasury) >= 25"
   },
   "require_reason": "새 나라를 알릴 곳간이 모자란다"
  },
  "alt": [
   {
    "id": "G10a1",
    "label": "황제 즉위를 미룬다",
    "unlock": "gauge(treasury) <= 30",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "set_flag": "F_황제미룸",
    "this_run": "나라 이름과 왕의 칭호를 그대로 두었다. 환구단은 지어지지 않았다.",
    "lock_hint": "국고 30 이하",
    "lock_reason": "큰 의식을 치를 곳간이 넉넉하다",
    "merge_text": "이번 생에서는 나라 이름과 왕의 칭호를 그대로 두었다.",
    "merge_real": {
     "text": "1897년 고종은 대한 제국 수립을 알리고 황제에 올랐다.",
     "sources": [
      {
       "type": "guide",
       "page": "303",
       "tb": "105"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "G11": {
  "event": "만민 공동회",
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
  "id": "AG01",
  "kind": "alt",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_문닫음) && seen(G05) && !seen(G07)"
  ],
  "conditions_text": "조약을 끝내 거부한 생, G05 뒤 G07 앞",
  "who": {
   "name": "바닷가 군관",
   "doll": "official_green"
  },
  "line": "항구를 닫자 낯선 군함들이 바다에 머물며 물러가지 않사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "포대를 더 쌓는다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "바닷가 언덕마다 포대가 높아졌다. 군함들은 멀리서 맴돌았다."
   },
   "left": {
    "label": "사신을 보내 달랜다",
    "effects": {
     "nobles": 5,
     "army": -5
    },
    "this_run": "사신이 배에 올라 \"문은 닫되 싸우지는 않겠다\"는 뜻을 전했다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1876년 조선은 일본과 강화도 조약을 맺어 부산 등 항구를 열었다(지도서 301, 교과서 103).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "수평선에 검은 연기를 뿜는 군함 몇 척이 떠 있고, 바닷가 포대가 높아진다.",
   "scene": "stormSea"
  }
 },
 {
  "id": "AG02",
  "kind": "alt",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_문닫음) && seen(AG01) && seen(G09)"
  ],
  "conditions_text": "조약을 끝내 거부한 생, AG01 뒤 G09 뒤",
  "who": {
   "name": "궁궐 장인",
   "doll": "craftsman"
  },
  "line": "항구를 닫았으니, 바다 건너 물건 대신 우리 손으로 새 기계를 만들어 보겠사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "공방을 열어 준다",
    "effects": {
     "nobles": 5,
     "treasury": -10
    },
    "this_run": "궁궐 뒤뜰에 공방이 섰다. 장인들이 낯선 기계 그림을 보며 망치를 들었다."
   },
   "left": {
    "label": "옛 방식을 지킨다",
    "effects": {
     "nobles": 10,
     "people": -5
    },
    "this_run": "장인들은 하던 대로 일했다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 개항 뒤 조선은 서양 근대 문물을 받아들여 전기·전화·전차·학교·병원이 생겼다(지도서 310, 교과서 106).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "궁궐 뒤뜰에 작은 공방이 서고 굴뚝에서 연기가 오른다."
  }
 },
 {
  "id": "AG03",
  "kind": "alt",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_개혁없음) && !seen(G10)"
  ],
  "conditions_text": "옛 제도를 지킨 생, G07 뒤 G10 앞",
  "who": {
   "name": "고을 수령",
   "doll": "official_green"
  },
  "line": "신분 제도가 그대로라, 갓을 쓰고 싶다는 천민들의 청이 또 올라왔사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "고을에서 허락한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "수령이 고을 안에서만 갓을 쓰게 허락했다. 양반들이 수군댔다."
   },
   "left": {
    "label": "법대로 막는다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "this_run": "청은 돌아갔다. 천민들은 고개를 떨궜다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1894년 갑오개혁으로 신분 제도가 없어졌다(지도서 302, 교과서 104).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "관아 앞에 패랭이를 쓴 사람 인형들이 줄지어 선다."
  }
 },
 {
  "id": "AG04",
  "kind": "alt",
  "stages": [
   "gojong"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_개혁없음) && seen(AG03) && seen(G10)"
  ],
  "conditions_text": "옛 제도를 지킨 생, AG03 뒤 G10 뒤",
  "who": {
   "name": "시골 선비",
   "doll": "yangban"
  },
  "line": "과거가 그대로 있으니 올해도 과거장에 수만 명이 몰렸사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "시험을 크게 연다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "과거장 마당이 갓 쓴 선비들로 꽉 찼다."
   },
   "left": {
    "label": "새 시험을 더한다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "과거에 산수와 지리 문제가 몇 개 더해졌다. 선비들이 고개를 갸웃했다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 갑오개혁으로 과거제가 없어지고, 근대 학문을 가르치는 학교들이 세워졌다(지도서 302·305·310).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "과거장 마당에 갓 쓴 인형들이 줄지어 앉는다."
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
  "id": "gojong①",
  "stage": "gojong",
  "name": "문을 끝내 닫은 조선",
  "flag": "F_문닫음",
  "done": "flag(F_문닫음) && seen(AG01) && seen(AG02)",
  "done_text": "F_문닫음 + AG01·AG02를 지나 클리어",
  "title": "끝까지 문을 지킨 임금",
  "scene": "항구는 닫힌 채 바닷가 포대가 높고, 궁궐 뒤뜰 공방 굴뚝에서 연기가 오른다.",
  "sagwan": "이번 생의 조선은 끝까지 문을 닫았다. 실제로는 1876년 강화도 조약으로 항구를 열었다. 그때 문을 지키자던 사람들도, 열자던 사람들도 나라를 걱정한 마음은 같았다.",
  "path": [
   "G04a1 조약을 끝내 거부한다",
   "AG01 머무는 군함",
   "AG02 우리 손으로 만든 기계"
  ],
  "end_fx": {
   "scene": "stormSea",
   "at": "sungnye"
  }
 },
 {
  "id": "gojong②",
  "stage": "gojong",
  "name": "갑오개혁 없는 조선",
  "flag": "F_개혁없음",
  "done": "flag(F_개혁없음) && seen(AG03) && seen(AG04)",
  "done_text": "F_개혁없음 + AG03·AG04를 지나 클리어",
  "title": "옛 제도를 지킨 조정",
  "scene": "과거장 마당이 갓 쓴 선비로 가득하고, 관아 앞에는 패랭이를 쓴 사람들이 줄지어 서 있다.",
  "sagwan": "이번 생의 조선은 옛 신분 제도를 그대로 두었다. 실제로는 1894년 갑오개혁으로 신분 제도와 과거제가 없어졌다.",
  "path": [
   "G07a1 옛 제도를 지킨다",
   "AG03 갓을 쓰고 싶은 사람들",
   "AG04 붐비는 과거장"
  ],
  "end_fx": {
   "scene": "market",
   "at": "seonggyun"
  }
 }
]);
  D.titles.push(...[
 {
  "id": "branch-gojong①",
  "name": "끝까지 문을 지킨 임금",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 gojong① 문을 끝내 닫은 조선 — F_문닫음 + AG01·AG02를 지나 클리어",
  "rule": "branch:gojong①"
 },
 {
  "id": "branch-gojong②",
  "name": "옛 제도를 지킨 조정",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 gojong② 갑오개혁 없는 조선 — F_개혁없음 + AG03·AG04를 지나 클리어",
  "rule": "branch:gojong②"
 }
]);
})();
