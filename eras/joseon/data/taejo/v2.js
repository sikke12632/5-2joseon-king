/* 설계서 v2의 사건 사슬·희귀 카드(작업/1A-카드데이터/cards_more.py)에서 tools/import-v2.py 로 만든 파일 — 직접 고치지 말 것.
 * 나오는 조건은 import-v2.py의 RULE 표(엔진 조건 식). 필드는 설계서 10-5 형식 + trigger(앞 카드의 선택이 부르는 사슬). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "C01a",
  "kind": "chain",
  "stages": [
   "taejo"
  ],
  "rarity": "common",
  "year": "1396 여름",
  "conditions_text": "T07에서 ‘농한기에 쌓는다’를 고르면 3장 뒤",
  "trigger": {
   "card": "T07",
   "after_n": 3,
   "side": "left"
  },
  "chain": "도성이 무너진 여름",
  "who": {
   "name": "공사 감독관",
   "doll": "official_red"
  },
  "line": "장마에 새로 쌓은 성벽이 무너졌사옵니다. 다른 도 백성을 불러 다시 쌓을까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "다시 쌓는다",
    "effects": {
     "army": 10,
     "people": -10,
     "treasury": -5
    },
    "this_run": "가을 들판을 지나 일꾼들이 다시 모였다."
   },
   "left": {
    "label": "가을까지 둔다",
    "effects": {
     "people": 5,
     "army": -10
    },
    "this_run": "무너진 자리에 풀이 자랐다."
   }
  },
  "grain": "complex",
  "real_history": "1396년 장마에 무너진 성벽을, 그해 8~9월 경상·전라·강원도 사람 약 8만 명이 다시 쌓았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000"
   },
   {
    "type": "web",
    "title": "출처",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000 · https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30",
  "learn": "한양 도성을 쌓은 사람들",
  "fx": {
   "note": "무너진 성벽 한 칸이 흙먼지와 함께 내려앉았다가, ‘다시 쌓는다’를 고르면 돌이 하나씩 쌓인다."
  }
 },
 {
  "id": "R01",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "rare",
  "year": "조선 초",
  "conditions": [
   "seen(T04)"
  ],
  "conditions_text": "태조 T04 뒤 아무 때나",
  "who": {
   "name": "하륜",
   "doll": "haryun"
  },
  "line": "새 나라 벼슬 이름이 낯서니, 놀이판에 적어 외우게 하면 어떨까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "놀이판을 만든다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "관리들이 쉬는 시간마다 윤목을 굴렸다."
   },
   "left": {
    "label": "외우게 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "관리들은 벼슬 이름을 종이에 베껴 썼다."
   }
  },
  "grain": "balance",
  "real_history": "성현의 《용재총화》에는 승경도를 하륜이 만들었다고 적혀 있다. 고려와 달라진 조선의 관직 이름을 쉽게 익히는 놀이였다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "257"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 257 자료 해설(승경도)",
  "learn": "승경도놀이의 유래",
  "fx": {
   "note": "궁궐 마루에 첫 승경도판이 펼쳐진다."
  }
 },
 {
  "id": "R02",
  "kind": "rare",
  "stages": [
   "taejo",
   "sejong"
  ],
  "rarity": "uncommon",
  "year": "조선 시대",
  "conditions": [
   "stage(sejong) || seen(T08)"
  ],
  "conditions_text": "성균관(T08)이 선 뒤 아무 때나",
  "who": {
   "name": "성균관 대사성",
   "doll": "official_blue"
  },
  "line": "전하께서 성균관에 제사를 드리러 오시는 날, 유생들에게 시험을 보게 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "시험을 연다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "유생들이 붓을 들고 명륜당 마당에 앉았다."
   },
   "left": {
    "label": "제사만 드린다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "제사는 조용히 끝났다."
   }
  },
  "grain": "balance",
  "real_history": "임금이 성균관에 가서 제사를 지낼 때 보던 과거를 알성시라 했다.",
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
   "note": "명륜당 마당에 시험지 두루마리가 펼쳐진다."
  }
 },
 {
  "id": "R13",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1396 이후",
  "conditions": [
   "seen(T07)"
  ],
  "conditions_text": "T07 뒤",
  "who": {
   "name": "도성 문지기",
   "doll": "general"
  },
  "line": "북쪽 문 숙정문은 산에 막혀 오가는 사람이 없사옵니다. 닫아 둘까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "닫아 둔다",
    "effects": {
     "army": 5,
     "people": -5
    },
    "this_run": "숙정문에 빗장이 걸렸다."
   },
   "left": {
    "label": "열어 둔다",
    "effects": {
     "people": 5,
     "army": -5
    },
    "this_run": "나무꾼 몇이 숙정문으로 드나들었다."
   }
  },
  "grain": "balance",
  "real_history": "숙정문은 도성 뒤편 산속에 있어 닫아 두는 일이 많았다. 그래서 ‘엄숙하고 고요하다’는 뜻의 이름이 붙었다고 전해진다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "233"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 233 지도상의 유의점(숙정문)",
  "learn": "한양 도성의 문",
  "fx": {
   "note": "북쪽 산속 문에 빗장이 “철컥”."
  }
 },
 {
  "id": "R14",
  "kind": "rare",
  "stages": [
   "taejo"
  ],
  "rarity": "uncommon",
  "year": "1397",
  "conditions": [
   "seen(T06) && !seen(T09)"
  ],
  "conditions_text": "T06 뒤, T09 앞",
  "who": {
   "name": "조준",
   "doll": "jojun"
  },
  "line": "흩어진 나라의 법을 모아 한 권의 법전으로 엮으소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "법전을 엮는다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "this_run": "관리들이 오래된 문서를 모았다."
   },
   "left": {
    "label": "다음에 한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "법 문서는 관청마다 흩어져 있었다."
   }
  },
  "grain": "balance",
  "real_history": "1397년 조준을 중심으로 법전 《경제육전》을 펴냈다. 뒷날 《경국대전》을 만드는 바탕이 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "248"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 248 참고 자료(《경국대전》)",
  "learn": "《경국대전》으로 가는 길",
  "fx": {
   "note": "책상 위에 두루마리 문서가 한 권의 책으로 묶인다."
  }
 }
]);
})();
