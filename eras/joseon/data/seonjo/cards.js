/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "J00",
  "kind": "sagwan",
  "stages": [
   "seonjo"
  ],
  "order": 0,
  "year": "1450~1567",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "세종 뒤 여러 임금을 거치며, 세조 때 시작한 나라의 기본 법전 《경국대전》이 성종 때 완성되었다. 조선은 이 법에 따라 다스려졌고, 큰 전쟁 없이 200년이 흘렀다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "244~245",
    "tb": "80"
   },
   {
    "type": "guide",
    "page": "248"
   },
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "지도서 244~245(교과서 80) 《경국대전》 · 248(세조 때 시작, 성종 때 완성) · 235(건국 200년 뒤 임진왜란, 평화로 국방에 소홀)",
  "learn": "《경국대전》",
  "fx": {
   "note": "두루마리 위로 법전 책이 내려앉고, 섬 위 계절이 빠르게 여러 번 바뀐다."
  }
 },
 {
  "id": "J01",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 1,
  "year": "1590~1591",
  "who": {
   "name": "통신사 황윤길",
   "doll": "official_red"
  },
  "line": "일본에 다녀왔사온데, 반드시 쳐들어올 것이옵니다. 성을 고치고 군사를 모으소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "전쟁에 대비한다",
    "effects": {
     "army": 15,
     "people": -10,
     "treasury": -5
    },
    "this_run": "성을 고치는 공사에 백성들이 불려 나왔고 → 전쟁이 터졌을 때 몇몇 성은 버텼다."
   },
   "left": {
    "label": "백성을 쉬게 한다",
    "effects": {
     "people": 10,
     "army": -20
    },
    "this_run": "전하는 김성일의 말을 믿고 백성을 쉬게 했지만 → 일본군이 바다를 건너왔다 → 준비 없이 맞아 → 성들이 하나둘 무너졌다."
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "judge",
  "real_history": "1592년 4월, 일본군이 쳐들어왔다(임진왜란). 김성일의 보고는 나라가 혼란에 빠지지 않게 하려던 것이었지만 뒷날 논란이 되었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "235"
   }
  ],
  "sources_text": "[교과서 밖] 지도서 235 수업 도움말(황윤길·김성일 통신사, 두 보고가 달랐음)",
  "learn": "임진왜란 직전 상황",
  "fx": {
   "scene": "stormSea",
   "note": "바다 건너 먹구름이 몰려오고 파도가 높아진다."
  },
  "caution": "김성일을 ‘틀린 사람’으로 몰지 않는다(지도서 표현 그대로 ‘논란이 되었다’)."
 },
 {
  "id": "J02",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 2,
  "year": "1592",
  "who": {
   "name": "유성룡",
   "doll": "yuseongryong"
  },
  "line": "한양을 지킬 군사가 모자라 북쪽으로 피하셔야 하옵니다. 서둘러 떠나실까요, 백성을 달래고 떠나실까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 떠난다",
    "effects": {
     "army": 10,
     "people": -15
    },
    "this_run": "새벽 빗속에 서둘러 떠나자 백성들이 ‘버려졌다’며 울었다.",
    "build": [
     "gyeongbokRuin",
     "jongmyoRuin"
    ]
   },
   "left": {
    "label": "백성 달래고 떠난다",
    "effects": {
     "people": -5,
     "army": -10
    },
    "this_run": "백성을 달래느라 떠남이 늦어 적이 가까이 다가왔다.",
    "build": [
     "gyeongbokRuin",
     "jongmyoRuin"
    ]
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "전쟁 초기 조선은 일본군을 막아 내지 못했다. 1592년 4월 30일 선조는 한양을 떠나 평양을 거쳐 6월 의주에 이르렀다. 종묘와 궁궐이 불에 탔다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "guide",
    "page": "239"
   },
   {
    "type": "web",
    "title": "날짜: 조선왕조실록 선조 25년 4월 30일",
    "url": "https://sillok.history.go.kr/search/inspectionDayList.do?id=kna_125040&did=kna_12504030"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 전쟁 초기 패배·《징비록》(종묘와 세 대궐이 재가 됨) · 239(유성룡이 의주로 피란 간 선조를 모심) / [교과서 밖] 날짜: 조선왕조실록 선조 25년 4월 30일 https://sillok.history.go.kr/search/inspectionDayList.do?id=kna_125040&did=kna_12504030",
  "learn": "임진왜란 초기",
  "fx": {
   "remove": [
    "gyeongbok",
    "jongmyo"
   ],
   "scene": "warSmoke",
   "build": [
    "gyeongbokRuin",
    "jongmyoRuin"
   ],
   "note": "하늘이 잿빛으로 바뀌고 경복궁·종묘에서 연기가 피어오른다 → 경복궁이 주춧돌만 남은 터로 바뀐다(이 터는 고종 때까지 남는다)."
  }
 },
 {
  "id": "J03",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 3,
  "year": "1592",
  "who": {
   "name": "전라좌수사 이순신",
   "doll": "yisunsin"
  },
  "line": "학이 날개를 펴듯 적을 둘러싸 치겠사옵니다. 수군에 화약과 쌀을 보내 주소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "화약을 보낸다",
    "effects": {
     "army": 15,
     "treasury": -10
    },
    "this_run": "화약 수레가 남쪽 바다로 달렸다."
   },
   "left": {
    "label": "가진 것으로 버틴다",
    "effects": {
     "treasury": 5,
     "army": -5
    },
    "this_run": "수군은 가진 화약을 아껴 썼다."
   }
  },
  "grain": "balance",
  "event_type": "normal",
  "real_history": "1592년 한산도에서 이순신의 수군이 학익진으로 크게 이겼다. 덮개를 씌우고 그 위에 칼·송곳을 꽂은 거북선도 함께 싸웠다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "guide",
    "page": "229"
   },
   {
    "type": "web",
    "title": "거북선 생김새: 우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0001833"
   }
  ],
  "sources_text": "지도서 235(교과서 77 그림: 한산도 대첩·학익진) · 229(교과서 그림의 거북선) / [교과서 밖] 거북선 생김새: 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300020&code=kc_age_30 · 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0001833",
  "learn": "이순신과 수군의 활약",
  "fx": {
   "scene": "fleet",
   "note": "바다에 거북선이 물살을 가르며 지나가고(용머리·덮개 위 칼), 판옥선들이 학 날개처럼 둥글게 펼쳐진다. 불빛과 연기만, 쓰러지는 사람 없음."
  },
  "caution": "거북선을 ‘철갑선’이나 ‘이순신이 처음 발명’으로 쓰지 않는다."
 },
 {
  "id": "J04",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 4,
  "year": "1592",
  "who": {
   "name": "의령의 선비 곽재우",
   "doll": "gwakjaewoo"
  },
  "line": "고을 사람들과 의병을 일으키겠사옵니다. 나라에서 도와주시겠사옵니까, 저희 힘으로 싸울까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "의병을 돕는다",
    "effects": {
     "army": 10,
     "people": 5,
     "treasury": -5
    },
    "this_run": "관아의 활과 쌀이 의병에게 건네졌다."
   },
   "left": {
    "label": "스스로 싸우게",
    "effects": {
     "treasury": 5,
     "army": 5,
     "nobles": -5
    },
    "this_run": "의병들은 낫과 몽둥이로 싸웠고, 관군과 손발이 잘 안 맞았다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "전국 각지에서 의병이 일어나 싸웠다. 곽재우는 붉은 옷을 입고 스스로 ‘하늘에서 내려온 붉은 옷의 장군(천강홍의장군)’이라 했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "web",
    "title": "곽재우: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0004695"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 전국 각지 의병의 활약 / [교과서 밖] 곽재우: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0004695",
  "learn": "의병의 활약",
  "fx": {
   "scene": "militia",
   "note": "산골 마을에서 흰 옷 인형들이 깃발을 들고 모이고, 붉은 옷 인형 하나가 앞장선다."
  }
 },
 {
  "id": "J05",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 5,
  "year": "1592~1593",
  "who": {
   "name": "명에 다녀온 사신",
   "doll": "official_green"
  },
  "line": "명에서 군대를 보내 준다 하옵니다. 그 군사들이 먹을 군량을 다 댈까요, 줄여 달라 청할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "군량을 댄다",
    "effects": {
     "army": 15,
     "treasury": -15
    },
    "this_run": "군량 수레가 북쪽 길을 가득 메웠다."
   },
   "left": {
    "label": "군량을 줄여 청한다",
    "effects": {
     "treasury": 10,
     "people": -5,
     "army": -5
    },
    "this_run": "명군은 왔지만, 군량 다툼으로 사이가 껄끄러웠다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "명에서 군대를 보내 도와주면서 전쟁의 흐름이 바뀌었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 명의 원군과 전쟁의 흐름",
  "learn": "명의 원군",
  "fx": {
   "scene": "envoy",
   "note": "북쪽 길로 다른 색 깃발의 행렬이 섬에 들어온다."
  }
 },
 {
  "id": "J06",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 6,
  "year": "1597",
  "who": {
   "name": "이순신",
   "doll": "yisunsin"
  },
  "line": "남은 배는 열두 척이오나 바다를 지킬 수 있사옵니다. 수군에 힘을 실어 주시겠사옵니까, 육지 방어도 함께 챙기시겠사옵니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "수군에 힘을 싣는다",
    "effects": {
     "army": 15,
     "people": 5,
     "treasury": -10
    },
    "this_run": "흩어졌던 배와 군사가 다시 모였다."
   },
   "left": {
    "label": "육지 방어도 챙긴다",
    "effects": {
     "army": 5,
     "treasury": -10
    },
    "this_run": "수군에 갈 군량 일부가 육지 성으로 갔다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1597년 명량(울돌목)에서 이순신은 13척으로 일본 배 133척과 싸워 31척을 깨뜨렸다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '명량대첩'",
    "url": "https://encykorea.aks.ac.kr/Article/E0018250"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '명량대첩' https://encykorea.aks.ac.kr/Article/E0018250",
  "learn": "이순신의 명량 해전",
  "fx": {
   "scene": "fleet13",
   "note": "좁은 바닷목에 물살이 소용돌이치고, 배 열세 척이 한 줄로 버틴다."
  },
  "caution": "‘12척’은 처음 남은 배, ‘13척’은 싸운 배. 두 숫자를 섞지 않게 문구 고정."
 },
 {
  "id": "J07",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 7,
  "year": "1598",
  "who": {
   "name": "유성룡",
   "doll": "yuseongryong"
  },
  "line": "전쟁에서 잘못한 일을 숨기지 않고 적어, 뒷날 다시는 이런 일이 없게 하겠사옵니다.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "낱낱이 적게 한다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "부끄러운 일까지 적힌다는 말에 몇몇 대신이 얼굴을 붉혔다.",
    "build": [
     "jongmyo"
    ]
   },
   "left": {
    "label": "좋은 일만 남긴다",
    "effects": {
     "nobles": 5,
     "people": -15
    },
    "this_run": "전하는 좋은 일만 남기자 했지만 → 유성룡은 물러난 뒤 스스로 붓을 들어 → 잘못까지 《징비록》에 적었다 → 조정의 체면이 깎이고 백성은 숨긴 일에 실망했다.",
    "build": [
     "jongmyo"
    ]
   }
  },
  "against": "left",
  "grain": "balance",
  "event_type": "normal",
  "real_history": "1598년 일본군이 물러가며 7년 전쟁이 끝났다. 조선은 일본군을 물리쳤지만 큰 피해를 입었다. 유성룡은 이때의 일을 《징비록》에 적었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "235",
    "tb": "77"
   },
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 235(교과서 77) 7년 전쟁과 큰 피해, 《징비록》 · 239(관직에서 물러난 뒤 기록)",
  "learn": "임진왜란의 결과와 《징비록》",
  "fx": {
   "remove": [
    "jongmyoRuin"
   ],
   "build": [
    "jongmyo"
   ],
   "note": "잿빛 하늘이 천천히 개고, 불탄 논밭에 새싹이 돋는다. 책 한 권이 하늘로 오른다."
  }
 },
 {
  "id": "J08",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 8,
  "year": "1623",
  "who": {
   "name": "반정을 일으킨 신하",
   "doll": "official_red"
  },
  "line": "새 임금이시니 이제 명을 받들고 후금을 멀리하소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "명을 받든다",
    "effects": {
     "nobles": 15,
     "army": -10
    },
    "this_run": "조정은 명을 가까이했고 → 후금의 눈초리가 날카로워졌다."
   },
   "left": {
    "label": "후금과도 지낸다",
    "effects": {
     "nobles": -15,
     "army": -5
    },
    "this_run": "전하는 후금과도 지내려 했지만 → 반정을 일으킨 신하들이 거세게 밀어붙여 → 조정은 명을 가까이했다 → 신하들과 사이가 벌어지고 후금도 믿지 않았다."
   }
  },
  "against": "left",
  "grain": "balance",
  "event_type": "normal",
  "real_history": "광해군은 명과 후금 사이에서 한쪽에 치우치지 않으려 했다. 1623년 신하들이 광해군을 몰아내고 인조를 세웠다(인조반정). 광해군을 어떻게 볼지는 학자마다 다르다. 1627년 후금이 쳐들어왔다(정묘호란).",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "239"
   },
   {
    "type": "web",
    "title": "우리역사넷 '광해군'",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n300900&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "'광해군의 중립 외교'",
    "url": "https://contents.history.go.kr/mobile/mid/hm_099_0010?tabId=e"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 '광해군' https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_n300900&code=kc_age_30 · '광해군의 중립 외교' https://contents.history.go.kr/mobile/mid/hm_099_0010?tabId=e / 정묘호란: 지도서 239",
  "learn": "병자호란 전 상황",
  "fx": {
   "note": "궁궐 앞 깃발이 바뀌고 새 왕 인형이 들어선다. 북쪽 하늘에 먼지 바람."
  }
 },
 {
  "id": "J09",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 9,
  "year": "1636",
  "who": {
   "name": "청의 사신",
   "doll": "qing"
  },
  "line": "우리 칸께서 황제가 되셨다. 조선도 황제로 받들라.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "요구를 고민한다",
    "effects": {
     "army": 5,
     "nobles": -20
    },
    "this_run": "전하가 망설이자 → 신하들이 ‘오랑캐를 황제로 섬길 수 없다’며 들고일어나 → 조정은 요구를 물리쳤다 → 전하의 말이 힘을 잃었다."
   },
   "left": {
    "label": "요구를 물리친다",
    "effects": {
     "nobles": 10,
     "army": -15
    },
    "this_run": "조정은 요구를 물리쳤고 → 북쪽 국경에 군사를 보낼 준비를 서둘렀다."
   }
  },
  "grain": "balance",
  "event_type": "normal",
  "real_history": "조선은 이 요구를 받아들일 수 없었다. 후금은 나라 이름을 청으로 바꾸고, 1636년 12월 조선을 쳐들어왔다(병자호란).",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   },
   {
    "type": "guide",
    "page": "239"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 후금→청, 조선 침략 · 239(황제로 받들라는 요구를 조선이 받아들일 수 없었음)",
  "learn": "병자호란이 일어난 과정",
  "fx": {
   "snow": true,
   "note": "북쪽 산 너머로 겨울 먹구름이 몰려오고 눈이 내리기 시작한다."
  }
 },
 {
  "id": "J10",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 10,
  "year": "1636~1637",
  "who": {
   "name": "김상헌 · 최명길",
   "doll": "official_blue"
  },
  "line": "김상헌: ‘끝까지 싸워 명과의 의리를 지켜야 하옵니다.’ 최명길: ‘먼저 화해해 나라와 백성을 지켜야 하옵니다.’",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "김상헌을 따른다",
    "effects": {
     "nobles": 15,
     "people": -10,
     "army": -5
    },
    "this_run": "군사들이 다시 성벽에 올랐지만 → 식량이 바닥나 → 결국 항복했다 → 버틴 날만큼 백성의 고생이 커졌다.",
    "build": [
     "namhansan"
    ]
   },
   "left": {
    "label": "최명길을 따른다",
    "effects": {
     "people": 15,
     "nobles": -15
    },
    "this_run": "화해의 글이 청 진영으로 보내졌고 → 결국 항복했다 → ‘의리를 버렸다’는 선비들의 비난이 쏟아졌다.",
    "build": [
     "namhansan"
    ]
   }
  },
  "against": "right",
  "grain": "complex",
  "event_type": "judge",
  "real_history": "식량이 바닥난 남한산성에서 40여 일을 버틴 끝에, 1637년 1월 인조는 삼전도에서 청에 항복했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   },
   {
    "type": "guide",
    "page": "236"
   },
   {
    "type": "web",
    "title": "버틴 기간: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0023151"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i302800&code=kc_age_30"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 김상헌·최명길의 주장, 남한산성 · 지도서 236 유의점(어느 쪽도 정답으로 다루지 않음) / [교과서 밖] 버틴 기간: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0023151 · 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i302800&code=kc_age_30",
  "learn": "주화와 척화 — 두 생각 모두 나라를 위한 것",
  "fx": {
   "build": [
    "namhansan"
   ],
   "note": "눈 덮인 남한산성 성벽 위에 깃발이 흔들린다. 선택에 따라 성 안의 불빛(척화) 또는 성문 앞 사신 행렬(주화)이 보인다."
  },
  "caution": "카드 좌우 버튼에 이름(김상헌/최명길)을 쓴다. 결과 화면에 “정답” 표시 금지."
 },
 {
  "id": "J11",
  "kind": "history",
  "stages": [
   "seonjo"
  ],
  "order": 11,
  "year": "1637",
  "who": {
   "name": "청의 장수",
   "doll": "qing"
  },
  "line": "세자와 대군을 데려가겠다. 해마다 물품도 바쳐라.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "인질을 보낸다",
    "effects": {
     "army": 5,
     "people": -10,
     "treasury": -15
    },
    "this_run": "세자 일행이 북쪽으로 떠났고, 물품 수레가 뒤따랐다.",
    "build": [
     "samjeondo"
    ]
   },
   "left": {
    "label": "물품을 줄여 청한다",
    "effects": {
     "treasury": -5,
     "nobles": -10,
     "army": -10
    },
    "this_run": "청은 물품을 조금 줄여 주었지만, 세자 일행은 그대로 떠났다.",
    "build": [
     "samjeondo"
    ]
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "소현 세자와 봉림 대군이 청의 심양으로 끌려갔다. 조선은 청에 물품을 바쳐야 했고, 수많은 백성이 청에 끌려가 큰 고통을 겪었다. 삼전도에는 청의 승리를 적은 비석이 세워졌다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "236",
    "tb": "78"
   },
   {
    "type": "guide",
    "page": "239"
   },
   {
    "type": "web",
    "title": "소현 세자: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0030360"
   }
  ],
  "sources_text": "지도서 236(교과서 78) 물품, 끌려간 백성, 삼전도비 · 239(세자와 왕자를 인질로) / [교과서 밖] 소현 세자: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0030360",
  "learn": "병자호란의 결과",
  "fx": {
   "heavy": true,
   "build": [
    "samjeondo"
   ],
   "note": "강가에 삼전도비가 “쿵” 하고 무겁게 선다(뽕이 아니라 무거운 소리). 겨울 하늘, 눈."
  }
 }
]);
})();
