/* 루트 늘리기(설계서 10-14) — 집필 세션의 routes_T.py와 설계서 10-14-1 조건 식 표에서 tools/import-routes.py 로 만든 파일. 직접 고치지 말 것.
 * ① 역사 사건마다 다른 길 2~3개(paths.alt를 이 표로 바꿈, a1의 엔진 칸은 그대로) ② 새 갈래 카드 5장 ③ 갈래 이야기 셋과 갈래 칭호
 * ④ 계룡산 판에서도 한양 전용 일상 카드가 나오지 않게 조건을 더함 ⑤ 계룡산 갈래의 CT01c 결과 문장 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const ALTS = {
 "T01": [
  {
   "id": "T01a1",
   "label": "정몽주를 곁에 둔다",
   "unlock": "gauge(army) <= 60",
   "effects": {
    "nobles": 10,
    "army": -10
   },
   "set_flag": "F_정몽주",
   "this_run": "정몽주가 살아 반대하는 대신으로 남았다. 회의 때마다 \"고려의 법도\"를 이야기했다.",
   "lock_hint": "국방 60 이하",
   "branch": "①"
  },
  {
   "id": "T01a2",
   "label": "시골로 보낸다",
   "unlock": "gauge(army) >= 50",
   "effects": {
    "army": 5,
    "nobles": -5
   },
   "set_flag": "F_은거",
   "this_run": "정몽주는 벼슬을 내려놓고 고향으로 내려갔다. 제자들은 \"언젠가 돌아오실 것\"이라며 글을 읽었다.",
   "lock_hint": "국방 50 이상"
  }
 ],
 "T02": [
  {
   "id": "T02a1",
   "label": "불교와 함께 다스린다",
   "unlock": "gauge(nobles) <= 45",
   "effects": {
    "people": 10,
    "nobles": -10
   },
   "set_flag": "F_불교",
   "this_run": "큰 절이 섬에 남았다. 나라 잔치 때 스님과 선비가 나란히 앉았다.",
   "lock_hint": "양반 45 이하"
  },
  {
   "id": "T02a2",
   "label": "고려 법을 그대로 쓴다",
   "unlock": "gauge(nobles) >= 50",
   "effects": {
    "nobles": 10,
    "people": -10
   },
   "set_flag": "F_고려법",
   "this_run": "관청 이름도 세금도 고려 때 그대로였다. \"새 나라라는데 달라진 게 없다\"며 장터가 수군댔다.",
   "lock_hint": "양반 50 이상"
  }
 ],
 "T03": [
  {
   "id": "T03a1",
   "label": "고려 이름을 쓴다",
   "unlock": "gauge(nobles) >= 55",
   "effects": {
    "nobles": 5,
    "army": -10
   },
   "set_flag": "F_국호",
   "this_run": "깃발에도 사관의 두루마리에도 \"고려\"라는 이름이 그대로 쓰였다.",
   "lock_hint": "양반 55 이상"
  },
  {
   "id": "T03a2",
   "label": "명에 묻지 않고 정한다",
   "unlock": "gauge(army) >= 60",
   "effects": {
    "nobles": 5,
    "army": -10
   },
   "set_flag": "F_자주국호",
   "this_run": "사신을 보내 묻지 않고 새 이름을 하늘에 고했다. 명에서 \"허락도 없이\"라는 꾸지람 편지가 왔다.",
   "lock_hint": "국방 60 이상",
   "fx": {
    "skyText": "朝鮮"
   }
  }
 ],
 "T04": [
  {
   "id": "T04a1",
   "label": "개경에 머문다",
   "unlock": "gauge(treasury) <= 35 || gauge(nobles) >= 65",
   "effects": {
    "treasury": 10,
    "nobles": 5,
    "army": -10
   },
   "set_flag": "F_개경",
   "this_run": "섬이 개경 모습이 되었다. 옛 궁궐 지붕을 고치는 망치 소리가 났다.",
   "lock_hint": "국고 35 이하 또는 양반 65 이상",
   "branch": "②"
  },
  {
   "id": "T04a2",
   "label": "계룡산으로 옮긴다",
   "unlock": "chosen(CT01a,R) && gauge(treasury) >= 30",
   "effects": {
    "nobles": 5,
    "treasury": -10,
    "people": -5
   },
   "set_flag": "F_계룡",
   "this_run": "계룡산 아래 공사장에 다시 망치 소리가 울렸다. 남쪽 끝 새 도읍까지 짐을 나르는 길이 멀었다.",
   "lock_hint": "CT01a에서 \"크게 공사를 연다\"를 고름 + 국고 30 이상",
   "branch": "③",
   "build": [
    "gyeryong"
   ],
   "variants": {
    "T05": "T05v2",
    "T07": "T07v2"
   },
   "skip": [
    "CT04"
   ]
  },
  {
   "id": "T04a3",
   "label": "무악에 도읍한다",
   "unlock": "seen(CT02a) && gauge(nobles) >= 50",
   "effects": {
    "nobles": 5,
    "people": -5
   },
   "set_flag": "F_무악",
   "this_run": "무악 고개 아래에 새 궁궐 터를 닦았다. 터가 좁아 집들이 산비탈까지 올라갔다.",
   "lock_hint": "CT02a(하륜의 무악 추천)를 봄 + 양반 50 이상",
   "build": [
    "muak"
   ]
  }
 ],
 "T05": [
  {
   "id": "T05a1",
   "label": "옛 집을 고쳐 쓴다",
   "unlock": "gauge(treasury) <= 30 || gauge(people) <= 30",
   "effects": {
    "people": 10,
    "treasury": 10,
    "nobles": -10
   },
   "set_flag": "F_궁궐",
   "this_run": "경복궁 자리에 작은 기와 궁궐(이름 없음)이 섰다.",
   "lock_hint": "국고 30 이하 또는 백성 30 이하"
  },
  {
   "id": "T05a2",
   "label": "관청부터 짓는다",
   "unlock": "gauge(people) >= 45",
   "effects": {
    "people": 5,
    "treasury": 5,
    "nobles": -10
   },
   "set_flag": "F_관청",
   "this_run": "궁궐 자리는 비워 두고 관청과 곳간부터 세웠다. 전하는 한동안 작은 집에서 나랏일을 보았다.",
   "lock_hint": "백성 45 이상",
   "build": [
    "altOffice"
   ],
   "skip": [
    "CT04"
   ]
  }
 ],
 "T06": [
  {
   "id": "T06a1",
   "label": "제사 터를 미룬다",
   "unlock": "gauge(nobles) <= 35",
   "effects": {
    "nobles": -15
   },
   "set_flag": "F_종묘",
   "this_run": "종묘와 사직단 자리가 풀밭으로 남았다. 예법을 따지는 신하들이 한숨을 쉬었다.",
   "lock_hint": "양반 35 이하"
  },
  {
   "id": "T06a2",
   "label": "절을 함께 짓는다",
   "unlock": "flag(F_불교) && gauge(people) >= 50",
   "effects": {
    "people": 10,
    "nobles": -10
   },
   "set_flag": "F_원찰",
   "this_run": "종묘 옆에 작은 절이 함께 섰다. 제삿날이면 향 연기와 목탁 소리가 섞였다.",
   "lock_hint": "\"불교와 함께 다스린다\"(T02a1)를 고른 판 + 백성 50 이상",
   "build": [
    "jongmyo",
    "sajik",
    "wonchal"
   ]
  }
 ],
 "T07": [
  {
   "id": "T07a1",
   "label": "성 없이 문만 세운다",
   "unlock": "gauge(army) >= 70",
   "effects": {
    "treasury": 15
   },
   "set_flag": "F_성곽",
   "this_run": "성곽 없이 네 문만 섰다. 문 옆으로 사람들이 그냥 지나다녔다.",
   "lock_hint": "국방 70 이상"
  },
  {
   "id": "T07a2",
   "label": "나무 울타리를 두른다",
   "unlock": "gauge(treasury) <= 30",
   "effects": {
    "treasury": 10,
    "army": -10
   },
   "set_flag": "F_목책",
   "this_run": "산등성이를 따라 통나무 울타리가 길게 섰다. 비가 오면 울타리가 기울어 군사들이 밤새 받쳤다.",
   "lock_hint": "국고 30 이하",
   "build": [
    "palisade"
   ],
   "skip": [
    "CT05",
    "C01a"
   ],
   "crisis_mult": {
    "army:low": 1.3
   }
  }
 ],
 "T08": [
  {
   "id": "T08a1",
   "label": "고을 향교부터 세운다",
   "unlock": "gauge(people) >= 55",
   "effects": {
    "people": 10,
    "nobles": -10
   },
   "set_flag": "F_향교",
   "this_run": "성균관 대신 고을마다 이름 없는 향교가 섰다.",
   "lock_hint": "백성 55 이상"
  }
 ],
 "T08v1": [
  {
   "id": "T08a2",
   "label": "절에서 인재를 기른다",
   "unlock": "flag(F_불교)",
   "effects": {
    "people": 5,
    "treasury": 5,
    "nobles": -10
   },
   "set_flag": "F_절교육",
   "this_run": "큰 절의 스님들이 글과 셈을 가르쳤다. 유생들은 \"성균관은 언제 서느냐\"며 상소를 올렸다.",
   "lock_hint": "\"불교와 함께 다스린다\"(T02a1)를 고른 판",
   "build": [
    "altSmallSG"
   ]
  }
 ],
 "T09": [
  {
   "id": "T09a1",
   "label": "형제를 화해시킨다",
   "unlock": "gauge(nobles) >= 45 && gauge(army) >= 45 && gauge(army) <= 65 && !flag(F_정몽주)",
   "effects": {
    "nobles": 10,
    "army": -5
   },
   "set_flag": "F_양위",
   "this_run": "왕자들이 한자리에서 술잔을 나눴다. 태조는 다툼 없이 둘째 아들에게 왕위를 물려주었다.",
   "lock_hint": "양반 45 이상 · 국방 45~65 · 정몽주 플래그 없음"
  },
  {
   "id": "T09a2",
   "label": "정몽주에게 맡긴다",
   "unlock": "flag(F_정몽주)",
   "effects": {
    "nobles": 10,
    "army": -5
   },
   "set_flag": "F_중재",
   "this_run": "정몽주가 두 편 왕자들을 한자리에 불렀다. 긴 밤이 지나고, 누구도 칼을 뽑지 않았다.",
   "lock_hint": "\"정몽주를 곁에 둔다\"(T01a1)를 고른 판",
   "branch": "①"
  },
  {
   "id": "T09a3",
   "label": "방원을 세자로 세운다",
   "unlock": "gauge(army) >= 60",
   "effects": {
    "army": 5,
    "nobles": -10
   },
   "set_flag": "F_세자교체",
   "this_run": "막내 세자 대신 다섯째 아들 방원이 세자가 되었다. 정도전은 조정을 떠났다.",
   "lock_hint": "국방 60 이상"
  }
 ]
};
  for (const cid in ALTS) {
    const c = byId(cid);
    if (!c) continue;
    c.paths = c.paths || { real: {} };
    const old = c.paths.alt || [];
    c.paths.alt = ALTS[cid].map((a) => Object.assign({}, old.find((o) => o.id === a.id) || {}, a));
  }
  D.cards.push(...[
 {
  "id": "AT05",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "①",
  "conditions": [
   "flag(F_정몽주) && seen(T04) && !seen(T08)"
  ],
  "conditions_text": "정몽주가 곁에 남은 판, T04 뒤 T08 앞",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "정몽주 대감과 정도전 대감이 새 법을 두고 사흘째 다투고 있사옵니다. 전하께서 한쪽 손을 들어 주소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "정도전 편을 든다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "새 법이 내려갔다. 정몽주는 붓을 꺾었다가, 다음 날 다시 들었다."
   },
   "left": {
    "label": "둘 다 듣는다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "두 대감이 한 상에 앉아 법을 고쳐 썼다. 회의는 길어졌지만 큰소리는 줄었다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 정몽주는 1392년 세상을 떠나, 정도전과 조선 조정에서 함께 일한 적이 없다(10-10-3 T01 「실제 역사」 줄).",
  "sources_text": "이번 생 전용 장면(갈래 이야기, 설계서 10-14-3)",
  "fx": {
   "note": "궁궐 마루에 붉은 관복(정몽주)과 푸른 관복(정도전) 인형이 마주 앉고, 가운데 두루마리가 펼쳐진다.",
   "scene": "debate"
  }
 },
 {
  "id": "AT06",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "②",
  "conditions": [
   "flag(F_개경) && seen(T06v1)"
  ],
  "conditions_text": "개경에 머문 생, T06v1 뒤",
  "who": {
   "name": "도읍 터를 살핀 신하",
   "doll": "official_green"
  },
  "line": "한양 터를 둘러보고 온 신하들이 \"한강 물길이 참 좋더라\"며 아쉬워하옵니다. 다시 살펴보게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "다시 살펴보게 한다",
    "effects": {
     "nobles": 5,
     "treasury": -5
    },
    "this_run": "신하 둘이 지도 한 장을 들고 한양 쪽으로 떠났다."
   },
   "left": {
    "label": "개경을 가꾼다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "개경 개울가에 버드나무를 심고 장터 길을 넓혔다."
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 1394년 한양으로 도읍을 옮겼다(지도서 232·238). 한양은 한강이 흘러 물자를 옮기기 편했다(지도서 233).",
  "sources_text": "이번 생 전용 장면(갈래 이야기, 설계서 10-14-3)",
  "fx": {
   "note": "개경 섬 가장자리에서 신하 인형 둘이 지도를 펼쳐 남쪽을 가리킨다.",
   "scene": "longing"
  }
 },
 {
  "id": "T05v2",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "variant_of": "T05",
  "alt_only": true,
  "branch": "③",
  "conditions": [
   "flag(F_계룡)"
  ],
  "conditions_text": "T04에서 다른 길 \"계룡산으로 옮긴다\"를 고른 판 — T05 대신",
  "who": {
   "name": "공사 감독관",
   "doll": "official_blue"
  },
  "line": "계룡산 아래에 궁궐을 지으려니 돌은 넉넉한데 물길이 멀옵니다. 어찌 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 짓는다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "산을 등진 궁궐이 우뚝 섰다. 물지게꾼 행렬이 하루 종일 이어졌다.",
    "build": [
     "gyeryongPalace"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "물가에 작게 짓는다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "개울가에 아담한 궁궐이 섰다. 마당 우물에서 물 긷기가 쉬웠다.",
    "build": [
     "gyeryongPalace"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 계룡산 아래 공사는 1393년 멈추었고(실록, 사슬 CT01), 1395년 한양에 경복궁이 완성되었다(지도서 233·238).",
  "sources_text": "이번 생 전용 장면(갈래 이야기, 설계서 10-14-3)",
  "fx": {
   "note": "섬 남쪽 산 아래에 이름 없는 궁궐이 선다. 크게 지으면 비계와 먹구름, 작게 지으면 개울가 기와지붕."
  }
 },
 {
  "id": "T07v2",
  "kind": "history",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "variant_of": "T07",
  "alt_only": true,
  "branch": "③",
  "conditions": [
   "flag(F_계룡)"
  ],
  "conditions_text": "계룡산으로 옮긴 판 — T07 대신",
  "who": {
   "name": "정도전",
   "doll": "jeong"
  },
  "line": "계룡산 봉우리를 따라 성을 두를까요, 도읍 둘레만 쌓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "봉우리를 잇는다",
    "effects": {
     "army": 15,
     "people": -10,
     "treasury": -5
    },
    "this_run": "산마루를 따라 돌성이 구불구불 이어졌다. 성돌을 지고 오르던 일꾼들이 숨을 몰아쉬었다.",
    "build": [
     "gyeryongFort"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "둘레만 쌓는다",
    "effects": {
     "army": 5,
     "treasury": -5
    },
    "this_run": "도읍 둘레에 낮은 돌담 성이 섰다.",
    "build": [
     "gyeryongFort"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 한양 도성은 1396년 북악산·낙산·남산·인왕산 능선을 따라 쌓았다(지도서 238).",
  "sources_text": "이번 생 전용 장면(갈래 이야기, 설계서 10-14-3)",
  "fx": {
   "note": "계룡산 봉우리를 잇는 돌성 선이 그려진다. 네 큰 문 이름 연출은 없다(이름 없는 문)."
  }
 },
 {
  "id": "AT07",
  "kind": "alt",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "alt_only": true,
  "force": true,
  "branch": "③",
  "conditions": [
   "flag(F_계룡) && seen(T05v2)"
  ],
  "conditions_text": "계룡산으로 옮긴 판, T05v2 뒤",
  "who": {
   "name": "역참 관리",
   "doll": "official_green"
  },
  "line": "북쪽 고을 관리들이 \"새 도읍까지 열흘이 걸린다\"며 지쳐 쓰러졌사옵니다. 어찌할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "역참을 늘린다",
    "effects": {
     "people": 5,
     "treasury": -10
    },
    "this_run": "큰길마다 말을 바꿔 타는 역참이 섰다. 북쪽 편지가 사흘 빨리 왔다.",
    "build": [
     "yeokcham"
    ]
   },
   "left": {
    "label": "그대로 둔다",
    "effects": {
     "treasury": 5,
     "nobles": -10
    },
    "this_run": "북쪽 관리들의 보고가 점점 늦게 왔다. 대신들이 \"멀어도 너무 멀다\"고 했다.",
    "build": [
     "yeokcham"
    ]
   }
  },
  "grain": "balance",
  "real_note": "실제 역사: 하륜은 계룡산이 나라 남쪽에 치우쳐 동·서·북쪽 고을과 멀다고 아뢰었다(실록, 사슬 CT01b).",
  "sources_text": "이번 생 전용 장면(갈래 이야기, 설계서 10-14-3)",
  "fx": {
   "note": "섬 북쪽 끝에서 계룡산까지 점선 길이 이어지고, 길 위에 말 탄 인형이 달린다.",
   "scene": "relay"
  }
 }
]);
  // 변형판은 원래 카드의 순서(order)를 따른다
  for (const c of D.cards)
    if (c.variant_of && c.order === undefined) {
      const o = byId(c.variant_of);
      if (o) c.order = o.order;
    }
  D.branches = (D.branches || []).concat([
 {
  "id": "①",
  "stage": "taejo",
  "name": "정몽주가 살아 있는 조선",
  "flag": "F_정몽주",
  "done": "flag(F_정몽주) && flag(F_중재)",
  "done_text": "F_정몽주 + T09a2를 고르고 클리어",
  "title": "충신과 함께 연 나라",
  "scene": "성균관 마당에서 붉은 관복(정몽주)과 푸른 관복(정도전) 인형이 마주 앉아 책을 펴고, 태조가 가운데 앉는다.",
  "sagwan": "이번 생의 조선은 옛 충신과 새 신하가 함께 열었다. 실제로는 정몽주가 1392년 세상을 떠났다.",
  "path": [
   "T01a1 정몽주를 곁에 둔다",
   "T02v1 (변형판: 정몽주 말도 듣는 T02)",
   "AT02 고려 선비들을 부름 → 열매 AT02f",
   "AT05 두 대감의 논쟁(새)",
   "AT01 정몽주의 상소",
   "T09a2 정몽주에게 맡긴다(새 다른 길)"
  ]
 },
 {
  "id": "②",
  "stage": "taejo",
  "name": "개경에 머문 조선",
  "flag": "F_개경",
  "done": "flag(F_개경) && seen(T05v1) && seen(T06v1) && seen(T07v1)",
  "done_text": "F_개경 + T05v1·T06v1·T07v1을 모두 지나 클리어",
  "title": "개경의 새 나라",
  "scene": "개경 섬. 단청을 새로 칠한 옛 궁궐, 개울가 장터, 다시 쌓은 옛 성.",
  "sagwan": "이번 생에서 조선은 개경에서 자랐다. 실제로는 1394년 한양으로 도읍을 옮겼다.",
  "path": [
   "T04a1 개경에 머문다",
   "T05v1 옛 궁궐 고치기",
   "AT03 개경 거리",
   "T06v1 개경의 제사 터",
   "AT06 한양을 그리워하는 신하(새)",
   "T07v1 옛 성 고치기"
  ]
 },
 {
  "id": "③",
  "stage": "taejo",
  "name": "계룡산 아래 조선",
  "flag": "F_계룡",
  "done": "flag(F_계룡) && seen(T05v2) && seen(T07v2) && seen(AT07)",
  "done_text": "F_계룡 + T05v2·T07v2·AT07을 지나 클리어",
  "title": "남쪽 산 아래 나라",
  "scene": "계룡산 아래 이름 없는 궁궐과 봉우리를 잇는 돌성, 북쪽으로 길게 이어진 역참 길.",
  "sagwan": "이번 생의 도읍은 계룡산 아래였다. 실제로는 그해 공사를 멈추고 한양을 골랐다.",
  "path": [
   "CT01a \"크게 공사를 연다\"",
   "CT01b (어느 쪽이든)",
   "T04a2 계룡산으로 옮긴다(새)",
   "T05v2 계룡산 궁궐(새)",
   "AT07 먼 도읍(새)",
   "T07v2 산을 두른 성(새)"
  ]
 }
]);
  D.titles.push(...[
 {
  "id": "branch-①",
  "name": "충신과 함께 연 나라",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 ① 정몽주가 살아 있는 조선 — F_정몽주 + T09a2를 고르고 클리어",
  "rule": "branch:①"
 },
 {
  "id": "branch-②",
  "name": "개경의 새 나라",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 ② 개경에 머문 조선 — F_개경 + T05v1·T06v1·T07v1을 모두 지나 클리어",
  "rule": "branch:②"
 },
 {
  "id": "branch-③",
  "name": "남쪽 산 아래 나라",
  "hint": "갈래 이야기를 끝까지",
  "cond": "갈래 ③ 계룡산 아래 조선 — F_계룡 + T05v2·T07v2·AT07을 지나 클리어",
  "rule": "branch:③"
 },
 {
  "id": "branch-two",
  "name": "두 갈래의 임금",
  "hint": "한 판에 갈래 둘",
  "cond": "한 판에서 갈래 완성 조건 둘을 채우고 클리어(10-14-2)",
  "rule": "branch:two"
 }
]);
  for (const c of D.cards)
    if (c.stages.includes('taejo') && (c.conditions || []).some((x) => /!flag\(F_개경\)/.test(x) && !/F_계룡/.test(x))) c.conditions = c.conditions.map((x) => (/!flag\(F_개경\)/.test(x) ? `(${x}) && !flag(F_계룡)` : x));
  const RUN_IF = {
 "CT01c": {
  "right": [
   {
    "when": "flag(F_계룡)",
    "this_run": "돌과 나무는 멀리 갈 것도 없이 계룡산 새 도읍 공사장으로 들어갔다."
   }
  ]
 }
};
  for (const id in RUN_IF) {
    const c = byId(id);
    if (c) for (const sk in RUN_IF[id]) c.choices[sk].this_run_if = RUN_IF[id][sk];
  }
})();
