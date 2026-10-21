/* 루트(다른 길·실제 경로 잠금·갈래) — 집필 파일 routes_Y.py 에서 tools/import-routes2.py 로 만든 파일. 직접 고치지 말 것.
 * 그 왕 역사 카드에 사건 이름·paths(real.require 난이도별 · alt 다른 길)를 붙이고, 갈래 카드·변형판·갈래 이야기·칭호를 더한다. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const P = {
 "Y01": {
  "event": "붕당과 탕평",
  "event_type": "normal",
  "real": {},
  "alt": [
   {
    "id": "Y01a1",
    "label": "끝까지 한쪽만 쓴다",
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
    "set_flag": "F_한붕당",
    "this_run": "상소가 쏟아져도 물러서지 않았다. 푸른 깃발 대신들만 조정에 남았다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "한 붕당만 밀어줄 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 상소가 쏟아져도 물러서지 않았다.",
    "merge_real": {
     "text": "조선 후기에는 붕당 사이 다툼이 잦아졌다. 영조는 특정 붕당에 치우치지 않고 인물을 고루 뽑아 쓰는 탕평 정치를 펼쳤다.",
     "sources": [
      {
       "type": "guide",
       "page": "282",
       "tb": "94"
      }
     ],
     "out_of_textbook": false
    },
    "branch": "①",
    "device": {
     "scale": 3
    },
    "crisis_mult": {
     "faction:high": 1.3
    }
   }
  ]
 },
 "Y02": {
  "event": "탕평비",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 10",
    "normal": "gauge(nobles) >= 20",
    "sage": "gauge(nobles) >= 25",
    "annals": "gauge(nobles) >= 30"
   },
   "require_reason": "비석을 세울 유생과 대신들의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "Y02a1",
    "label": "비석을 미룬다",
    "unlock": "gauge(nobles) <= 55",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "set_flag": "F_탕평비없음",
    "this_run": "비석 세울 돌값을 아껴 곳간에 두었다. 성균관 앞마당은 그대로였다.",
    "lock_hint": "양반 55 이하",
    "lock_reason": "비석을 세우자는 대신들의 힘이 크다",
    "merge_text": "이번 생에서는 비석 세울 돌값을 아껴 곳간에 두었다.",
    "merge_real": {
     "text": "1742년 영조는 성균관 앞에 붕당에 치우치지 말라는 뜻을 새긴 탕평비를 세웠다.",
     "sources": [
      {
       "type": "guide",
       "page": "282",
       "tb": "94"
      }
     ],
     "out_of_textbook": false
    }
   }
  ]
 },
 "Y03": {
  "event": "균역법",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 20",
    "sage": "gauge(people) >= 25 && gauge(treasury) >= 20",
    "annals": "gauge(people) >= 30 && gauge(treasury) >= 20 && real(Y02)"
   },
   "require_reason": "새 세금법을 펼칠 힘이 모자란다"
  },
  "alt": [
   {
    "id": "Y03a1",
    "label": "군포를 그대로 둔다",
    "unlock": {
     "sprout": "gauge(treasury) <= 48",
     "normal": "gauge(treasury) <= 40",
     "sage": "gauge(treasury) <= 40",
     "annals": "gauge(treasury) <= 40"
    },
    "effects": {
     "treasury": 10,
     "people": -10
    },
    "set_flag": "F_군포그대로",
    "this_run": "군포를 줄이지 않았다. 곳간은 지켰지만 마을마다 베틀 소리가 무거웠다.",
    "lock_hint": "국고 40 이하",
    "lock_reason": "곳간에 여유가 있어 백성 부담을 덜자는 쪽이 크다",
    "merge_text": "이번 생에서는 군포를 줄이지 않았다.",
    "merge_real": {
     "text": "1750년 영조는 균역법으로 군포를 2필에서 1필로 줄였다. 모자란 돈은 땅 주인에게 걷는 결작과 바다·소금 세금 등으로 채웠다.",
     "sources": [
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '균역법'",
       "url": "https://encykorea.aks.ac.kr/Article/E0007303"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "Y05": {
  "event": "규장각",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(nobles) >= 10",
    "normal": "gauge(nobles) >= 20",
    "sage": "gauge(nobles) >= 25 && gauge(treasury) >= 20",
    "annals": "gauge(nobles) >= 30 && gauge(treasury) >= 20 && real(Y03)"
   },
   "require_reason": "학자를 모을 힘이 모자란다"
  },
  "alt": [
   {
    "id": "Y05a1",
    "label": "연구소를 두지 않는다",
    "unlock": "gauge(treasury) <= 40",
    "effects": {
     "treasury": 10,
     "nobles": -5
    },
    "set_flag": "F_규장각없음",
    "this_run": "학자들을 따로 모으지 않았다. 책은 여러 관청에 흩어져 있었다.",
    "lock_hint": "국고 40 이하",
    "lock_reason": "학자를 모을 곳간이 넉넉하다",
    "merge_text": "이번 생에서는 학자들을 따로 모으지 않았다.",
    "merge_real": {
     "text": "정조는 유능한 학자들을 뽑아 학문과 정책을 연구하게 했다. 그 중심이 1776년 창덕궁 안에 세운 규장각이다.",
     "sources": [
      {
       "type": "guide",
       "page": "282",
       "tb": "94"
      },
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '규장각'",
       "url": "https://encykorea.aks.ac.kr/Article/E0007273"
      }
     ],
     "out_of_textbook": true
    },
    "skip": [
     "Y06"
    ]
   }
  ]
 },
 "Y06": {
  "event": "서얼 검서관",
  "event_type": "normal",
  "real": {},
  "alt": [
   {
    "id": "Y06a1",
    "label": "서얼을 쓰지 않는다",
    "unlock": "gauge(nobles) >= 65",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_서얼막음",
    "this_run": "\"신분을 따져야 한다\"는 대신들 말에 서얼 출신 학자들은 벼슬길에 오르지 못했다.",
    "lock_hint": "양반 65 이상",
    "lock_reason": "신분을 따지는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 \"신분을 따져야 한다\"는 대신들 말에 서얼 출신 학자들은 벼슬길에 오르지 못했다.",
    "merge_real": {
     "text": "1779년 정조는 서얼 출신 이덕무·유득공·박제가·서이수를 규장각 검서관으로 뽑았다.",
     "sources": [
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '검서관'",
       "url": "https://encykorea.aks.ac.kr/Article/E0002076"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "Y07": {
  "event": "신해통공",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 20",
    "sage": "gauge(people) >= 25",
    "annals": "gauge(people) >= 30 && real(Y05)"
   },
   "require_reason": "시전 특권을 거둘 백성의 힘이 모자란다"
  },
  "alt": [
   {
    "id": "Y07a1",
    "label": "시전 특권을 지킨다",
    "unlock": "gauge(nobles) >= 60",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "set_flag": "F_시전특권",
    "this_run": "시전 상인들의 특권을 그대로 두었다. 골목 좌판은 포졸에게 쫓겨났다.",
    "lock_hint": "양반 60 이상",
    "lock_reason": "시전 상인 편을 드는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 시전 상인들의 특권을 그대로 두었다.",
    "merge_real": {
     "text": "1791년 정조는 육의전을 뺀 시전 상인의 특권을 없애 더 많은 사람이 장사할 수 있게 했다(신해통공).",
     "sources": [
      {
       "type": "guide",
       "page": "283",
       "tb": "95"
      },
      {
       "type": "web",
       "title": "한국민족문화대백과사전 '신해통공'",
       "url": "https://encykorea.aks.ac.kr/Article/E0033551"
      }
     ],
     "out_of_textbook": true
    }
   }
  ]
 },
 "Y08": {
  "event": "수원 화성",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(treasury) >= 10",
    "normal": "gauge(treasury) >= 20",
    "sage": "gauge(treasury) >= 25 && gauge(people) >= 20",
    "annals": "gauge(treasury) >= 30 && gauge(people) >= 20 && real(Y05)"
   },
   "require_reason": "큰 성을 쌓을 곳간이 모자란다"
  },
  "alt": [
   {
    "id": "Y08a1",
    "label": "화성을 쌓지 않는다",
    "unlock": "gauge(treasury) <= 40 || gauge(people) <= 40",
    "effects": {
     "treasury": 10,
     "army": -5
    },
    "set_flag": "F_화성없음",
    "this_run": "수원에 새 성을 쌓지 않았다. 그 돈은 곳간에 남았고, 거중기는 만들어지지 않았다.",
    "lock_hint": "국고 40 이하 또는 백성 40 이하",
    "lock_reason": "큰 공사를 감당할 곳간과 백성의 힘이 있다",
    "merge_text": "이번 생에서는 수원에 새 성을 쌓지 않았다.",
    "merge_real": {
     "text": "1794년부터 1796년까지 수원 화성을 쌓았다. 정약용이 고안한 거중기와 녹로 같은 새 기구가 쓰였고, 공사에 나온 백성은 품삯을 받았다.",
     "sources": [
      {
       "type": "guide",
       "page": "282",
       "tb": "94"
      }
     ],
     "out_of_textbook": false
    },
    "branch": "②",
    "skip": [
     "DY135",
     "DY136",
     "DY137",
     "DY138",
     "DY140",
     "CY03a",
     "CY03b",
     "CY04a",
     "CY04b",
     "RY01",
     "LY02"
    ],
    "variants": {
     "Y09": "Y09v1"
    }
   }
  ]
 },
 "Y09": {
  "event": "화성 행차와 배다리",
  "event_type": "normal",
  "real": {},
  "alt": []
 },
 "Y10": {
  "event": "김만덕",
  "event_type": "normal",
  "real": {
   "require": {
    "sprout": "gauge(people) >= 10",
    "normal": "gauge(people) >= 15",
    "sage": "gauge(people) >= 20",
    "annals": "gauge(people) >= 25"
   },
   "require_reason": "제주 백성을 돌볼 힘이 모자란다"
  },
  "alt": [
   {
    "id": "Y10a1",
    "label": "섬에 머물게 한다",
    "unlock": "gauge(nobles) >= 65",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "set_flag": "F_만덕섬",
    "this_run": "\"섬 여인은 바다를 건널 수 없다\"는 법대로 했다. 김만덕은 제주에서 고마움의 편지만 보냈다.",
    "lock_hint": "양반 65 이상",
    "lock_reason": "법을 앞세우는 대신들의 힘이 아직 작다",
    "merge_text": "이번 생에서는 \"섬 여인은 바다를 건널 수 없다\"는 법대로 했다.",
    "merge_real": {
     "text": "김만덕은 제주 여성은 섬 밖에 나갈 수 없던 때에 왕의 허락을 받아 한양(1796)과 금강산(1797)을 여행했다.",
     "sources": [
      {
       "type": "guide",
       "page": "286~287",
       "tb": "99"
      },
      {
       "type": "web",
       "title": "연도: 한국민족문화대백과사전 '김만덕'",
       "url": "https://encykorea.aks.ac.kr/Contents/Item/E0076304"
      }
     ],
     "out_of_textbook": true
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
  "id": "AY01",
  "kind": "alt",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_한붕당) && seen(Y02) && !seen(Y05)"
  ],
  "conditions_text": "끝까지 한쪽만 쓴 생, Y02 뒤 Y05 앞",
  "who": {
   "name": "붉은 붕당 대신",
   "doll": "party_red"
  },
  "line": "벼슬을 모두 잃은 저희 붕당 사람들이 고향으로 내려가겠다 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "붙잡아 둔다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "고향으로 가려던 대신 몇이 붙잡혀 한직을 맡았다.",
    "device": {
     "scale": -1
    }
   },
   "left": {
    "label": "떠나게 둔다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "붉은 깃발 대신들이 짐을 싸서 한양을 떠났다. 조정이 조용해졌다.",
    "device": {
     "scale": 1
    }
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 영조와 정조는 특정 붕당에 치우치지 않고 인물을 고루 뽑아 쓰는 탕평 정치를 펼쳤다(지도서 282, 교과서 94).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "한양 성문 밖으로 붉은 깃발 행렬이 천천히 빠져나간다."
  }
 },
 {
  "id": "AY02",
  "kind": "alt",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_한붕당) && seen(AY01) && seen(Y05)"
  ],
  "conditions_text": "끝까지 한쪽만 쓴 생, AY01 뒤 Y05 뒤",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "한 붕당이 조정을 차지하자 올라오는 상소마다 같은 말뿐이옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "다른 목소리를 듣는다",
    "effects": {
     "people": 5,
     "nobles": -10
    },
    "this_run": "고을 선비들의 글을 따로 받아 읽었다. 조정 대신들은 못마땅해했다.",
    "device": {
     "scale": -2
    }
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "nobles": 10,
     "people": -10
    },
    "this_run": "상소는 한목소리로 올라왔다. 고을의 억울한 일은 묻혔다.",
    "device": {
     "scale": 1
    }
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 탕평 정치로 붕당 간의 대립을 줄이고 정치를 안정시키려고 노력했다(지도서 282, 교과서 94).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "궁궐 마당에 푸른 깃발만 줄지어 서 있다."
  }
 },
 {
  "id": "Y09v1",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "variant_of": "Y09",
  "event_type": "variant",
  "conditions": [
   "flag(F_화성없음)"
  ],
  "conditions_text": "Y08에서 다른 길 \"화성을 쌓지 않는다\"를 고른 생 — Y09 대신",
  "who": {
   "name": "잔치를 준비하는 신하",
   "doll": "official_blue"
  },
  "line": "어머님 회갑을 맞아 궁궐에서 큰 잔치를 열려 하옵니다. 크게 열까요, 줄여 열까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 연다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -15
    },
    "this_run": "궁궐 마당에 잔치상이 길게 차려지고 백성들에게도 떡이 돌았다."
   },
   "left": {
    "label": "줄여 연다",
    "effects": {
     "treasury": 10,
     "nobles": -10
    },
    "this_run": "잔치는 조촐했다. 대신들은 체면이 섰다 아니다 말이 많았다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1795년 정조는 어머니 혜경궁 홍씨를 모시고 화성에 다녀왔고, 노량진 한강에는 배를 이은 배다리를 놓았다(백과 '원행을묘정리의궤').",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "궁궐 마당에 잔치 천막이 서고 등불이 걸린다. 한강에는 배다리가 놓이지 않는다."
  }
 },
 {
  "id": "AY03",
  "kind": "alt",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_화성없음) && !seen(Y10)"
  ],
  "conditions_text": "화성을 쌓지 않은 생, Y08 뒤",
  "who": {
   "name": "수원 고을 수령",
   "doll": "official_green"
  },
  "line": "새 성을 쌓지 않으니, 수원 고을 사람들이 장터라도 크게 열어 달라 하옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "장터를 열어 준다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "수원 고을에 장터가 섰다. 사람들이 조금씩 모여들었다."
   },
   "left": {
    "label": "한양 장터로 보낸다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "수원 사람들은 한양 장터까지 먼 길을 다녔다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 정조는 수원에 화성을 건설했다(지도서 282, 교과서 94).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "섬 서쪽 언덕 아래에 장터 천막 몇 개가 선다.",
   "scene": "market"
  }
 },
 {
  "id": "AY04",
  "kind": "alt",
  "stages": [
   "yeongjo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_화성없음) && seen(AY03) && seen(Y09)"
  ],
  "conditions_text": "화성을 쌓지 않은 생, AY03 뒤 Y09 뒤",
  "who": {
   "name": "공사 감독관",
   "doll": "official_blue"
  },
  "line": "화성에 쓰려던 돈으로 한양 길과 다리를 고치자는 말이 있사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "길과 다리를 고친다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "한양 큰길이 반듯해지고 개울마다 다리가 놓였다."
   },
   "left": {
    "label": "곳간에 둔다",
    "effects": {
     "treasury": 10,
     "people": -5
    },
    "this_run": "돈은 곳간에 그대로 쌓였다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 수원 화성 공사에는 거중기와 녹로 같은 새 기구가 쓰였고, 공사에 나온 백성은 품삯을 받았다(지도서 282 참고 자료).",
  "sources_text": "이번 생 전용 장면(갈래 이야기·다른 길)",
  "fx": {
   "note": "한양 큰길 위에 일꾼 인형들이 흙을 고르고, 개울에 다리가 놓인다."
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
  "id": "yeongjo①",
  "stage": "yeongjo",
  "name": "탕평 없는 조선",
  "flag": "F_한붕당",
  "done": "flag(F_한붕당) && seen(AY01) && seen(AY02)",
  "done_text": "F_한붕당 + AY01·AY02를 지나 클리어",
  "title": "한 깃발만 남은 조정",
  "scene": "궁궐 마당에 푸른 깃발만 줄지어 서 있고, 성 밖 길로 붉은 깃발 행렬이 멀어진다.",
  "sagwan": "이번 생의 조선은 한 붕당만 조정에 남았다. 실제로 영조와 정조는 인물을 고루 뽑아 쓰는 탕평 정치를 펼쳐 붕당 간의 대립을 줄이려 했다.",
  "path": [
   "Y01a1 끝까지 한쪽만 쓴다",
   "AY01 고향으로 내려가는 대신들",
   "AY02 한목소리 상소"
  ],
  "end_fx": {
   "scene": "envoy",
   "at": "seonggyun"
  }
 },
 {
  "id": "yeongjo②",
  "stage": "yeongjo",
  "name": "화성을 쌓지 않은 조선",
  "flag": "F_화성없음",
  "done": "flag(F_화성없음) && seen(AY03) && seen(AY04)",
  "done_text": "F_화성없음 + AY03·AY04를 지나 클리어",
  "title": "성 대신 길을 닦은 임금",
  "scene": "서쪽 언덕은 빈 들판 그대로이고, 한양 큰길과 다리가 반듯하다.",
  "sagwan": "이번 생의 조선은 수원에 새 성을 쌓지 않았다. 실제로 정조는 1794~1796년 수원 화성을 쌓았고, 거중기·녹로 같은 기구를 쓰며 일꾼에게 품삯을 주었다.",
  "path": [
   "Y08a1 화성을 쌓지 않는다",
   "Y09v1 궁궐 잔치",
   "AY03 수원 장터",
   "AY04 한양 길과 다리"
  ],
  "end_fx": {
   "scene": "market",
   "at": "sungnye"
  }
 }
]);
  D.titles.push(...[
 {
  "id": "branch-yeongjo①",
  "name": "한 깃발만 남은 조정",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 yeongjo① 탕평 없는 조선 — F_한붕당 + AY01·AY02를 지나 클리어",
  "rule": "branch:yeongjo①"
 },
 {
  "id": "branch-yeongjo②",
  "name": "성 대신 길을 닦은 임금",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 yeongjo② 화성을 쌓지 않은 조선 — F_화성없음 + AY03·AY04를 지나 클리어",
  "rule": "branch:yeongjo②"
 }
]);
})();
