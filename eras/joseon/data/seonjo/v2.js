/* 설계서 v2의 사건 사슬·희귀 카드(작업/1A-카드데이터/cards_more.py)에서 tools/import-v2.py 로 만든 파일 — 직접 고치지 말 것.
 * 나오는 조건은 import-v2.py의 RULE 표(엔진 조건 식). 필드는 설계서 10-5 형식 + trigger(앞 카드의 선택이 부르는 사슬). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "C03a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1485 이후",
  "conditions": [
   "seen(J00) && !seen(J02)"
  ],
  "conditions_text": "세종 S07에서 ‘100일을 바로 준다’를 고른 판에서, 선조·인조 J00 뒤 5장 안",
  "chain": "출산 휴가의 뒷이야기",
  "who": {
   "name": "형조 관리",
   "doll": "official_red"
  },
  "line": "법전(경국대전)에는 관청 노비의 출산 휴가가 50일, 남편은 15일로 적혀 있사옵니다. 세종 때보다 짧은데 법전대로 할까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "법전대로 한다",
    "effects": {
     "treasury": 5,
     "people": -10
    },
    "this_run": "산모들은 몸이 덜 풀린 채 일터로 나왔다."
   },
   "left": {
    "label": "더 쉬게 한다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "고을 수령이 슬그머니 날짜를 늘려 주었다."
   }
  },
  "grain": "complex",
  "real_history": "세종 때 산모 100일·남편 30일이던 휴가가, 뒤에 만든 《경국대전》에서는 산모 50일·남편 15일로 정해졌다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010",
  "learn": "법은 시대에 따라 달라진다",
  "fx": {
   "note": "책장이 넘어가며 ‘100일’이 ‘50일’로 바뀌는 글자 연출."
  },
  "caution": "판을 건너 이어지는 사슬(세종→선조·인조). 화면 구석에 책갈피 표시."
 },
 {
  "id": "C04a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1592",
  "conditions_text": "J04에서 ‘의병을 돕는다’를 고르면 3장 뒤",
  "trigger": {
   "card": "J04",
   "after_n": 3,
   "side": "right"
  },
  "chain": "붉은 옷의 의병장",
  "who": {
   "name": "곽재우",
   "doll": "gwakjaewoo"
  },
  "line": "처음엔 집안 사람 열 명 남짓이었는데, 이제 2천 명이 모였사옵니다. 무기를 보내 주소서.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "무기를 보낸다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "활과 창을 실은 수레가 산길을 올랐다."
   },
   "left": {
    "label": "스스로 구하게",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "의병들은 낫과 몽둥이를 들었다."
   }
  },
  "grain": "balance",
  "real_history": "곽재우의 의병은 집안 종 10여 명으로 시작해 약 2천 명까지 늘었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '곽재우'",
    "url": "https://encykorea.aks.ac.kr/Article/E0004695"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '곽재우' https://encykorea.aks.ac.kr/Article/E0004695",
  "learn": "의병의 활약",
  "fx": {
   "note": "산골 마을의 흰 옷 인형이 한 무리씩 늘어난다."
  }
 },
 {
  "id": "C05a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "common",
  "year": "1593",
  "conditions": [
   "seen(J05) && !seen(J07)"
  ],
  "conditions_text": "J05 뒤(임진왜란 중) 반드시 한 번 — 사슬 시작은 J02",
  "force": true,
  "chain": "불탄 도성으로",
  "who": {
   "name": "도승지(임금 곁에서 문서를 맡은 신하)",
   "doll": "official_blue"
  },
  "line": "한양을 되찾았사옵니다. 그러나 궁궐이 모두 불타 머무실 곳이 없사옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "작은 집에 머문다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "선조는 좁은 집에 짐을 풀었다."
   },
   "left": {
    "label": "궁부터 고친다",
    "effects": {
     "nobles": 5,
     "treasury": -15
    },
    "this_run": "전쟁 중에 목수들이 궁궐로 불려 갔다."
   }
  },
  "grain": "balance",
  "real_history": "선조는 1593년 10월 한양으로 돌아왔지만, 궁궐은 이미 불타 버린 뒤였다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '선조'",
    "url": "https://encykorea.aks.ac.kr/Article/E0028912"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '선조' https://encykorea.aks.ac.kr/Article/E0028912 / 궁궐이 불탐: 지도서 235(교과서 77 《징비록》)",
  "learn": "임진왜란의 피해",
  "fx": {
   "note": "주춧돌만 남은 경복궁 터 앞에 작은 기와집 하나."
  }
 },
 {
  "id": "C14a",
  "kind": "chain",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1481",
  "conditions": [
   "seen(J00) && !seen(J02)"
  ],
  "conditions_text": "세종 S05를 본 판에서, 선조·인조 J00 바로 다음",
  "chain": "한글로 읽는 삼강행실도",
  "who": {
   "name": "홍문관 학자",
   "doll": "official_green"
  },
  "line": "《삼강행실도》를 한글로 풀어 다시 찍으면 더 많은 백성이 읽을 것이옵니다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "한글판을 찍는다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "한글이 적힌 책이 마을로 퍼졌다."
   },
   "left": {
    "label": "한문대로 둔다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "책은 서원 서가에 꽂혔다."
   }
  },
  "grain": "complex",
  "real_history": "세종 때 신하들의 반대로 못 했던 《삼강행실도》 한글판(언해본)은 1481년 성종 때 처음 나왔다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 249 참고 자료(《삼강행실도》)",
  "learn": "훈민정음의 보급",
  "fx": {
   "note": "그림책 위에 한글 글씨가 한 줄씩 떠오른다."
  },
  "caution": "J00 사관 두루마리가 다루는 1450~1567년 사이의 일. 판을 건너 이어지는 사슬."
 },
 {
  "id": "R03",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "rare",
  "year": "1592",
  "conditions": [
   "seen(J02) && !seen(J03)"
  ],
  "conditions_text": "J02 뒤, J03 앞",
  "who": {
   "name": "전라좌수영 군관",
   "doll": "general"
  },
  "line": "거북선이 처음 바다에 나갈 준비를 마쳤사옵니다. 앞장세울까요?",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "앞장세운다",
    "effects": {
     "army": 10,
     "treasury": -5
    },
    "this_run": "용머리가 물살을 가르며 맨 앞으로 나섰다."
   },
   "left": {
    "label": "뒤에 둔다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "거북선은 판옥선 뒤를 따랐다."
   }
  },
  "grain": "balance",
  "real_history": "거북선은 1592년 5월 사천 해전에서 처음 싸웠다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷 '거북선'",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '거북선' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30",
  "learn": "거북선",
  "fx": {
   "note": "포구에서 거북선이 처음 미끄러져 나간다."
  }
 },
 {
  "id": "R06",
  "kind": "rare",
  "stages": [
   "seonjo"
  ],
  "rarity": "uncommon",
  "year": "1627",
  "conditions": [
   "seen(J08) && !seen(J09)"
  ],
  "conditions_text": "J08 뒤, J09 앞",
  "who": {
   "name": "후금의 장수",
   "doll": "qing"
  },
  "line": "형제의 나라가 되기로 약속하면 군대를 물리겠다.",
  "choice_type": "free",
  "choices": {
   "right": {
    "label": "약속한다",
    "effects": {
     "army": 10,
     "nobles": -10
    },
    "this_run": "후금 군대가 북쪽으로 물러갔다."
   },
   "left": {
    "label": "끝까지 맞선다",
    "effects": {
     "nobles": 10,
     "army": -15
    },
    "this_run": "성벽 위에 횃불이 밤새 켜졌다."
   }
  },
  "grain": "balance",
  "real_history": "1627년 정묘호란 때 조선은 후금과 형제의 맹약을 맺고 화친했다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 239 참고 자료(정묘호란)",
  "learn": "병자호란 전의 정묘호란",
  "fx": {
   "note": "북쪽 하늘에 먼지 바람이 일었다가 걷힌다."
  }
 }
]);
})();
