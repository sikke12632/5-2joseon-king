/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "G00",
  "kind": "sagwan",
  "stages": [
   "gojong"
  ],
  "order": 0,
  "year": "1800~1863",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "정조 뒤 왕실과 혼인한 몇몇 집안이 권력을 휘두르는 세도 정치가 이어졌고, 그 사이 최제우가 서학에 맞서 우리 고유의 생각을 바탕으로 동학을 만들었다. 1863년 열두 살 고종이 왕위에 오르고, 아버지 흥선 대원군이 나랏일을 맡았다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "300",
    "tb": "102"
   },
   {
    "type": "guide",
    "page": "285",
    "tb": "97"
   }
  ],
  "sources_text": "지도서 300(교과서 102) 세도 정치 · 285(교과서 97) 동학·최제우",
  "learn": "세도 정치와 동학",
  "fx": {
   "note": "저녁 하늘. 바다 멀리 낯선 배 그림자가 보인다."
  },
  "caution": "고종 즉위 나이(12세)·흥선 대원군 섭정은 교과서 밖 일반 사실(교과서 102쪽 흥선 대원군 사진)."
 },
 {
  "id": "G01",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 1,
  "year": "1860년대",
  "who": {
   "name": "고을 농민 대표",
   "doll": "farmer"
  },
  "line": "관리들의 횡포로 세금이 날로 무거워지옵니다. 이대로는 살 수가 없사옵니다.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "관리를 벌한다",
    "effects": {
     "people": 15,
     "treasury": -10,
     "nobles": -5
    },
    "this_run": "나쁜 관리 몇이 벼슬에서 쫓겨났다."
   },
   "left": {
    "label": "세금을 지킨다",
    "effects": {
     "treasury": 10,
     "people": -15
    },
    "this_run": "세금은 그대로 걷혔고 봉기가 더 번졌다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "조선 말기 관리들의 횡포가 심해지고 농민들의 세금 부담이 커지자, 농민들은 전국 곳곳에서 봉기를 일으켰다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "300",
    "tb": "102"
   }
  ],
  "sources_text": "지도서 300(교과서 102) 세도 정치 아래 관리 횡포·농민 봉기",
  "learn": "개항 전 조선 사회의 문제",
  "fx": {
   "note": "마을 길에 횃불 몇 개가 모인다(싸움 장면 없음)."
  }
 },
 {
  "id": "G02",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 2,
  "year": "1865~1868",
  "who": {
   "name": "흥선 대원군",
   "doll": "official_blue"
  },
  "line": "임진왜란 때 불탄 경복궁을 다시 짓겠소. 원납전과 당백전으로 서둘러 지을까요, 천천히 지을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 다시 짓는다",
    "effects": {
     "treasury": 10,
     "nobles": 5,
     "people": -15
    },
    "this_run": "돈을 걷고 새 돈을 찍어 공사를 서둘렀다. 장터에 원망이 퍼졌다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "천천히 짓는다",
    "effects": {
     "people": 10,
     "nobles": -10
    },
    "this_run": "공사가 길어져 궁궐 둘레에 한동안 비계가 남았다.",
    "build": [
     "gyeongbok"
    ],
    "build_state": "late"
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1865년부터 경복궁을 다시 지어 1868년 고종이 옮겨 갔다. 공사비를 대려 찍은 당백전은 실제 가치보다 훨씬 비싸게 쓰게 해 물가가 크게 올랐다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '경복궁'",
    "url": "https://encykorea.aks.ac.kr/Article/E0002434"
   },
   {
    "type": "web",
    "title": "'당백전'",
    "url": "https://encykorea.aks.ac.kr/Article/E0013889"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '경복궁' https://encykorea.aks.ac.kr/Article/E0002434 · '당백전' https://encykorea.aks.ac.kr/Article/E0013889",
  "learn": "흥선 대원군의 정치",
  "fx": {
   "remove": [
    "gyeongbokRuin"
   ],
   "build": [
    "gyeongbok"
   ],
   "note": "임진왜란 뒤 주춧돌만 남아 있던 경복궁 터에서 궁궐이 다시 “뽕”(270여 년 만). 동전이 쏟아지는 작은 효과."
  },
  "caution": "백과 ‘경복궁’ 항목은 중건을 대왕대비의 뜻으로 적는다. 카드에서 흥선 대원군은 공사를 이끈 사람으로만 쓴다."
 },
 {
  "id": "G03",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 3,
  "year": "1866~1871",
  "who": {
   "name": "흥선 대원군",
   "doll": "official_blue"
  },
  "line": "강화도에 쳐들어온 프랑스와 미국 군대가 물러갔소. 전국에 척화비를 세워 서양과 통상하지 않겠다고 알리겠소.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "척화비를 세운다",
    "effects": {
     "nobles": 10,
     "army": 10,
     "treasury": -5
    },
    "device": {
     "open": 2
    },
    "this_run": "길목마다 비석이 섰다.",
    "build": [
     "cheokhwa"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "비석을 말린다",
    "effects": {
     "nobles": -15,
     "army": -5,
     "treasury": 5
    },
    "device": {
     "open": -1
    },
    "this_run": "전하는 비석을 말렸지만 → 흥선 대원군이 밀어붙여 → 전국에 척화비가 섰다 → 조정이 두 편으로 갈라졌다.",
    "build": [
     "cheokhwa"
    ],
    "build_state": "forced"
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1866년 프랑스(병인양요), 1871년 미국(신미양요)이 강화도를 침략했다. 흥선 대원군은 이를 물리친 뒤 전국 각지에 척화비를 세우고 서양과의 통상을 거부했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "300",
    "tb": "102"
   },
   {
    "type": "guide",
    "page": "301"
   },
   {
    "type": "guide",
    "page": "319"
   },
   {
    "type": "web",
    "title": "연도: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0023142"
   },
   {
    "type": "web",
    "title": "출처",
    "url": "https://encykorea.aks.ac.kr/Article/E0032961"
   }
  ],
  "sources_text": "지도서 300(교과서 102) 프랑스·미국 침략, 척화비 · 301(신미양요 그림) · 319(병인양요) / [교과서 밖] 연도: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0023142 · https://encykorea.aks.ac.kr/Article/E0032961",
  "learn": "통상 거부와 척화비",
  "fx": {
   "scene": "ship",
   "build": [
    "cheokhwa"
   ],
   "note": "바다에 검은 연기를 뿜는 낯선 배(이양선)가 나타났다 물러가고, 길목마다 작은 비석이 “뽕”."
  }
 },
 {
  "id": "G04",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 4,
  "year": "1876",
  "who": {
   "name": "일본의 사신",
   "doll": "official_blue"
  },
  "line": "부산 말고도 항구 두 곳을 열고, 조선 바닷가를 우리가 마음대로 재게 하라.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "조약을 맺는다",
    "effects": {
     "treasury": 5,
     "army": -15,
     "nobles": -5
    },
    "this_run": "조약 문서에 도장이 찍혔고 → 항구 세 곳이 열렸다 → 불리한 조항에 분해하는 사람이 많았다.",
    "build": [
     "port"
    ]
   },
   "left": {
    "label": "버틴다",
    "effects": {
     "nobles": 10,
     "army": -20,
     "treasury": -5
    },
    "this_run": "전하는 버텼지만 → 일본은 군함을 앞세워 거듭 요구했고 → 결국 조약을 맺었다 → 버틴 만큼 바닷가 고을이 크게 시달렸다.",
    "build": [
     "port"
    ]
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "judge",
  "real_history": "1876년 조선은 일본과 강화도 조약을 맺었다. 외국과 맺은 최초의 근대적 조약이지만, 일본에 유리한 불평등 조약이었다. 이후 조선은 서양 여러 나라와도 조약을 맺으며 개화 정책을 펼쳤다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "301",
    "tb": "103"
   },
   {
    "type": "guide",
    "page": "301"
   }
  ],
  "sources_text": "지도서 301(교과서 103) 강화도 조약(제4·7·10관), 개화 정책 · 301 유의점(개항 반대자를 지금 눈으로 틀렸다고 판단하지 않음)",
  "learn": "강화도 조약과 개항",
  "fx": {
   "build": [
    "port"
   ],
   "note": "항구 세 곳에 부두가 생기고 외국 배가 들어온다. 개항 압력 막대가 ‘개화 진행도’로 바뀐다."
  },
  "caution": "어느 쪽 선택에도 “잘했다/잘못했다” 문구 없음. 양쪽 다 대가가 있다."
 },
 {
  "id": "G05",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 5,
  "year": "1884",
  "who": {
   "name": "우정총국을 맡은 관리",
   "doll": "official_red"
  },
  "line": "나라가 편지를 모아 배달하는 우정총국 문을 엽니다. 여는 날 잔치를 크게 열까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "잔치를 크게 연다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -10
    },
    "device": {
     "open": 1
    },
    "this_run": "잔치에 나라 안팎의 손님이 모였다.",
    "build": [
     "ujeong"
    ]
   },
   "left": {
    "label": "조촐하게 연다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "잔치는 작게 열렸다.",
    "build": [
     "ujeong"
    ]
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1884년 우정총국을 여는 잔치 날, 김옥균 등 일부 관리들이 개화를 서두르려고 갑신정변을 일으켰다. 그러나 청 군대가 끼어들어 사흘 만에 실패했고, 우편 일도 멈췄다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "304"
   },
   {
    "type": "web",
    "title": "우편 업무 중단: 한국민족문화대백과사전 '우정총국'",
    "url": "https://encykorea.aks.ac.kr/Article/E0040100"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 갑신정변 · 304(우정총국 낙성식, 사흘째 실패) / [교과서 밖] 우편 업무 중단: 한국민족문화대백과사전 '우정총국' https://encykorea.aks.ac.kr/Article/E0040100",
  "learn": "갑신정변",
  "fx": {
   "build": [
    "ujeong"
   ],
   "note": "우정총국 건물이 “뽕” → 그날 밤 불꽃과 연기가 잠깐 일고 조용해진다(사람 장면 없음)."
  }
 },
 {
  "id": "G06",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 6,
  "year": "1894",
  "who": {
   "name": "동학 농민군 지도자 전봉준",
   "doll": "farmer"
  },
  "line": "탐관오리를 벌하고 노비 문서를 불태우소서! 정해진 것 말고 잡다한 세금도 없애소서!",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "개혁을 받아들인다",
    "effects": {
     "people": 15,
     "nobles": -15
    },
    "this_run": "전하가 요구를 받아들이겠다고 하자 → 양반들이 거세게 반발했고 → 나라 밖 군대까지 끼어들었다 → 운동은 끝내 실패했다."
   },
   "left": {
    "label": "군사로 막는다",
    "effects": {
     "nobles": 10,
     "people": -15,
     "army": -5
    },
    "this_run": "전하는 군사로 막으라 했지만 → 농민군은 더 크게 일어났고 → 나라 밖 군대가 끼어들었다 → 들판의 마을들이 크게 다쳤다."
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "judge",
  "real_history": "1894년 동학의 지도자와 농민들이 나라를 바로잡고 외국 세력의 침략을 막고자 동학 농민 운동을 일으켰다. 운동은 실패했지만 많은 요구가 갑오개혁에 담겼다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "323"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 동학 농민 운동·사발통문·개혁안 · 323(요구가 갑오개혁에 반영)",
  "learn": "동학 농민 운동",
  "fx": {
   "note": "사발을 엎어 둥글게 이름을 쓴 종이(사발통문)가 바람에 날려 마을마다 내려앉는다."
  }
 },
 {
  "id": "G07",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 7,
  "year": "1894",
  "who": {
   "name": "개혁을 이끈 김홍집",
   "doll": "official_green"
  },
  "line": "신분 제도를 없애고 과거제를 폐지하며, 세금은 법으로 정해 함부로 걷지 않게 하소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "신분제를 없앤다",
    "effects": {
     "people": 15,
     "nobles": -20,
     "treasury": 5
    },
    "this_run": "관청 앞에 새 법이 붙자 사람들이 몰려들었다."
   },
   "left": {
    "label": "천천히 바꾼다",
    "effects": {
     "nobles": 5,
     "people": -15
    },
    "this_run": "전하는 천천히 하자 했지만 → 개혁 관청이 석 달 동안 법을 쏟아 내 → 신분제는 그해 없어졌다 → 전하가 망설였다는 소문에 백성들이 실망했다."
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1894년 정부는 갑오개혁으로 신분 제도를 없애고 세금 제도를 고쳤다. 과거제가 없어지고, 남편을 잃은 여성이 다시 결혼하는 것도 허락되었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "302",
    "tb": "104"
   },
   {
    "type": "guide",
    "page": "305"
   }
  ],
  "sources_text": "지도서 302(교과서 104) 갑오개혁(신분제 폐지·세금 개혁) · 305(김홍집, 과거제·노비·백정 폐지, 재혼 허락)",
  "learn": "갑오개혁과 신분제 폐지",
  "fx": {
   "note": "마을 인형들의 패랭이가 하나둘 갓으로 바뀐다(1895년 천민에게도 갓 허락). 노비 문서 두루마리가 바람에 흩어진다."
  }
 },
 {
  "id": "G08",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 8,
  "year": "1895~1896",
  "who": {
   "name": "명령을 알리는 관리",
   "doll": "official_green"
  },
  "line": "모두 상투를 자르라는 명령을 내리소서. 씻기 편하고 일하기 좋사옵니다.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "단발을 명한다",
    "effects": {
     "treasury": 5,
     "nobles": -20,
     "people": -5
    },
    "this_run": "가위를 든 관리들이 거리로 나섰다."
   },
   "left": {
    "label": "명령을 미룬다",
    "effects": {
     "nobles": 5,
     "people": -10,
     "army": -5
    },
    "this_run": "전하는 미루려 했지만 → 대신들이 밀어붙여 → 단발령은 그대로 내려졌다 → 미루다 내려진 명령에 원망이 더 커졌다."
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "life",
  "real_history": "1895년 일본 세력이 궁궐에 들어와 명성 황후가 세상을 떠나는 일(을미사변)이 일어났고, 그해 말 단발령이 내려져 반발이 컸다. 이듬해 고종은 러시아 공사관으로 거처를 옮겼다(아관 파천).",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '단발령'",
    "url": "https://encykorea.aks.ac.kr/Article/E0013579"
   },
   {
    "type": "web",
    "title": "'아관파천'",
    "url": "https://encykorea.aks.ac.kr/Article/E0034214"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '단발령' https://encykorea.aks.ac.kr/Article/E0013579 · '아관파천' https://encykorea.aks.ac.kr/Article/E0034214",
  "learn": "개항 이후의 혼란과 생활 변화",
  "fx": {
   "note": "궁궐 하늘이 잠시 어두워지고, 거리의 갓 쓴 인형 몇이 짧은 머리로 바뀐다. 장면은 그리지 않는다."
  },
  "caution": "수위(담임 결정): 을미사변은 ‘세상을 떠나는 일’로만, 장면 없이 한 문장."
 },
 {
  "id": "G09",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 9,
  "year": "1896",
  "who": {
   "name": "서재필",
   "doll": "official_blue"
  },
  "line": "한글로만 쓴 신문을 내려 합니다. 정부에서 크게 도와주시겠습니까, 조금만 도와주시겠습니까?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 돕는다",
    "effects": {
     "people": 15,
     "nobles": -5,
     "treasury": -10
    },
    "device": {
     "open": 1
    },
    "this_run": "신문이요!” 외치는 소리가 거리마다 퍼졌다.",
    "build": [
     "dongnipmun"
    ]
   },
   "left": {
    "label": "조금만 돕는다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -5
    },
    "this_run": "신문은 작은 종이 몇 장으로 시작했다.",
    "build": [
     "dongnipmun"
    ]
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1896년 서재필이 정부의 지원을 받아 최초의 한글 신문 《독립신문》을 펴냈다. 독립 협회가 만들어져 정부의 잘잘못을 따지고, 모금해 독립문을 세웠다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   },
   {
    "type": "guide",
    "page": "305"
   },
   {
    "type": "web",
    "title": "독립문: 한국민족문화대백과사전 '서울 독립문'",
    "url": "https://encykorea.aks.ac.kr/Article/E0015980"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 《독립신문》·독립 협회 · 305(4월 7일 창간, 한글 신문) / [교과서 밖] 독립문: 한국민족문화대백과사전 '서울 독립문' https://encykorea.aks.ac.kr/Article/E0015980",
  "learn": "《독립신문》과 독립 협회",
  "fx": {
   "build": [
    "dongnipmun"
   ],
   "note": "한성 큰길 끝에 독립문이 “뽕”(돌로 쌓은 아치). 신문 종이가 집집마다 날아든다."
  },
  "caution": "독립문 완공은 1897년(서울 독립문 항목)과 1898년 말(독립협회 항목)로 자료가 갈림 → 연도는 쓰지 않는다."
 },
 {
  "id": "G10",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 10,
  "year": "1897",
  "who": {
   "name": "대신들",
   "doll": "official_blue"
  },
  "line": "나라 이름을 대한 제국으로 하고 황제에 오르소서. 학교와 공장, 은행도 세워 나라를 튼튼히 하소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "황제에 오른다",
    "effects": {
     "army": 10,
     "people": 5,
     "treasury": -15
    },
    "device": {
     "open": 1
    },
    "this_run": "환구단에서 황제 즉위식이 열렸다.",
    "build": [
     "hwangudan"
    ]
   },
   "left": {
    "label": "살림이 먼저다",
    "effects": {
     "treasury": 5,
     "nobles": -10,
     "army": -10
    },
    "this_run": "전하는 살림이 먼저라 했지만 → 신하와 백성들이 거듭 청해 → 대한 제국을 선포했다 → 서두른 준비로 곳간 셈이 어지러웠다.",
    "build": [
     "hwangudan"
    ]
   }
  },
  "against": "left",
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1897년 고종은 대한 제국 수립을 세상에 알리고(환구단에서 황제 즉위), 공장과 회사 설립을 돕고 은행과 학교를 세웠으며 학생들을 외국으로 유학 보냈다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   },
   {
    "type": "web",
    "title": "환구단 즉위: 한국민족문화대백과사전 '대한제국'",
    "url": "https://encykorea.aks.ac.kr/Article/E0015187"
   },
   {
    "type": "web",
    "title": "곤룡포 색 변화:",
    "url": "https://encykorea.aks.ac.kr/Article/E0004150"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 대한 제국과 근대 개혁 / [교과서 밖] 환구단 즉위: 한국민족문화대백과사전 '대한제국' https://encykorea.aks.ac.kr/Article/E0015187 · 곤룡포 색 변화: https://encykorea.aks.ac.kr/Article/E0004150",
  "learn": "대한 제국 수립",
  "fx": {
   "build": [
    "hwangudan"
   ],
   "note": "환구단 지붕이 “뽕”. 왕 인형의 곤룡포가 붉은색에서 노란색으로 바뀐다."
  }
 },
 {
  "id": "G11",
  "kind": "history",
  "stages": [
   "gojong"
  ],
  "order": 11,
  "year": "1898",
  "who": {
   "name": "독립 협회 회원",
   "doll": "official_red"
  },
  "line": "만민 공동회에서 백정 출신 박성춘이 연설했사옵니다. 신분 낮은 이가 관리와 나란히 선 것을 못마땅해하는 대신들이 있는데, 모임을 그대로 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모임을 둔다",
    "effects": {
     "people": 15,
     "nobles": -10
    },
    "this_run": "광장에 박수 소리가 오래 이어졌다."
   },
   "left": {
    "label": "모임을 줄인다",
    "effects": {
     "nobles": 10,
     "people": -15
    },
    "this_run": "광장에 관리들이 나와 사람들을 돌려보냈다."
   }
  },
  "grain": "balance",
  "event_type": "normal",
  "real_history": "1898년 만민 공동회에서 백정 출신 박성춘이 높은 관리들과 한자리에서 연설했다. ‘관리와 백성이 힘을 합쳐 나라를 지키자’는 내용이었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "303",
    "tb": "105"
   }
  ],
  "sources_text": "지도서 303(교과서 105) 만민 공동회·박성춘 연설",
  "learn": "만민 공동회와 달라진 사람들의 생각",
  "fx": {
   "note": "광장에 사람 인형들이 빽빽이 모이고, 단 위의 한 사람에게 빛이 비친다."
  }
 },
 {
  "id": "GX1",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 0,
   "after": "G05",
   "before": "G06"
  },
  "stages": [
   "gojong"
  ],
  "order": 1,
  "year": "1885",
  "who": {
   "name": "미국인 의사",
   "doll": "official_blue"
  },
  "line": "서양 의술로 병을 고치는 병원을 열겠습니다. 큰 건물을 내어 주시겠습니까, 작게 시작할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "건물을 내준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "아픈 사람들이 병원 앞에 줄을 섰다.",
    "build": [
     "hospital"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작게 시작한다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "병원은 작은 방 하나로 시작했다.",
    "build": [
     "hospital"
    ],
    "build_state": "late"
   }
  },
  "grain": "balance",
  "real_history": "1885년 최초의 서양식 국립 병원 광혜원이 문을 열었고, 곧 이름을 제중원으로 바꾸었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   },
   {
    "type": "web",
    "title": "제중원: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0051479"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 서양식 병원 / [교과서 밖] 광혜원·제중원: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0051479",
  "learn": "근대 시설: 서양식 병원",
  "fx": {
   "build": [
    "hospital"
   ],
   "note": "한옥 지붕의 병원이 “뽕”, 문 앞에 이름 깃발."
  },
  "caution": "나오는 창: G05 뒤 ~ G06 앞."
 },
 {
  "id": "GX2",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 1,
   "after": "G05",
   "before": "G06"
  },
  "stages": [
   "gojong"
  ],
  "order": 2,
  "year": "1885~1886",
  "who": {
   "name": "새 학교를 세우려는 선교사",
   "doll": "official_blue"
  },
  "line": "영어·수학·운동을 가르치는 학교와 여학교를 세우겠습니다. 처음부터 크게 세울까요, 작게 시작할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 세운다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "공 차는 소리가 담장 밖까지 들렸다.",
    "build": [
     "school"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작게 시작한다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "교실 하나로 시작해 학생들이 비좁게 앉았다.",
    "build": [
     "school"
    ],
    "build_state": "late"
   }
  },
  "grain": "seed",
  "real_history": "1885년 배재 학당, 1886년 우리 역사 최초의 여학교인 이화 학당이 세워졌다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   },
   {
    "type": "guide",
    "page": "317"
   },
   {
    "type": "web",
    "title": "이화 학당: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0046618"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 근대 학교, 여자도 공부하는 학교 · 317(배재 학당 1885) / [교과서 밖] 이화 학당: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0046618",
  "learn": "근대 시설: 학교",
  "fx": {
   "build": [
    "school"
   ],
   "note": "벽돌 학교 건물이 “뽕”, 마당에서 공 하나가 통통 튄다."
  },
  "caution": "나오는 창: G05 뒤 ~ G06 앞."
 },
 {
  "id": "GX3",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 2,
   "after": "G05",
   "before": "G06"
  },
  "stages": [
   "gojong"
  ],
  "order": 3,
  "year": "1887",
  "who": {
   "name": "궁궐 전기 기술자",
   "doll": "official_green"
  },
  "line": "궁궐 연못 물로 기계를 돌려 전등을 켜겠사옵니다. 연못가를 다 밝힐까요, 한 전각부터 켤까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "연못가에 켠다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -15
    },
    "this_run": "궁궐 연못가에 처음으로 전등이 반짝였다.",
    "build": [
     "lamps"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "한 전각만 켠다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "전등 하나가 깜빡깜빡 켜졌다 꺼졌다 했다.",
    "build": [
     "lamps"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "real_history": "1887년 미국 에디슨 회사의 설비로 경복궁 안에 전등이 켜졌다. 자주 꺼지고 돈이 많이 들어 ‘건달불’이라 불렸다는 이야기도 전한다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   },
   {
    "type": "web",
    "title": "1887 경복궁 전등: 한국민족문화대백과사전 '전기공학'",
    "url": "https://encykorea.aks.ac.kr/Article/E0049309"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 전기가 들어옴 / [교과서 밖] 1887 경복궁 전등: 한국민족문화대백과사전 '전기공학' https://encykorea.aks.ac.kr/Article/E0049309",
  "learn": "근대 시설: 전기",
  "fx": {
   "build": [
    "lamps"
   ],
   "note": "밤 장면. 경복궁 연못가에 전등이 깜빡깜빡 켜졌다 꺼졌다 한다."
  },
  "caution": "나오는 창: G05 뒤 ~ G06 앞. ‘건달불’은 ‘전한다’로만."
 },
 {
  "id": "GX4",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 3,
   "after": "G10",
   "before": "GX5"
  },
  "stages": [
   "gojong"
  ],
  "order": 4,
  "year": "1890년대 후반",
  "who": {
   "name": "전화를 놓는 관리",
   "doll": "official_blue"
  },
  "line": "궁궐과 관청을 전화선으로 잇겠사옵니다. 궁궐부터 이을까요, 관청끼리 먼저 이을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "궁궐부터 잇는다",
    "effects": {
     "nobles": 5,
     "army": 5,
     "treasury": -10
    },
    "this_run": "궁궐과 관청 사이에 전화선이 걸렸다.",
    "build": [
     "telepole"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "관청부터 잇는다",
    "effects": {
     "army": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "관청끼리 먼저 목소리를 주고받았다.",
    "build": [
     "telepole"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "complex",
  "real_history": "1890년대 후반 궁궐과 정부 부서를 잇는 전화선이 놓였다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "310",
    "tb": "106"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '전화'",
    "url": "https://encykorea.aks.ac.kr/Article/E0049763"
   }
  ],
  "sources_text": "지도서 310(교과서 106) 전화 설치 / [교과서 밖] 한국민족문화대백과사전 '전화' https://encykorea.aks.ac.kr/Article/E0049763",
  "learn": "근대 시설: 전화",
  "fx": {
   "build": [
    "telepole"
   ],
   "note": "궁궐에서 관청까지 전봇대가 줄지어 서고 전선이 이어진다."
  },
  "caution": "나오는 창: G10 뒤 ~ GX5 앞. 첫 통화 연도는 자료마다 달라 쓰지 않는다."
 },
 {
  "id": "GX5",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 4,
   "fixed": true
  },
  "stages": [
   "gojong"
  ],
  "order": 12,
  "year": "1899",
  "who": {
   "name": "전차 회사 사람",
   "doll": "official_blue"
  },
  "line": "서대문에서 청량리까지 전차를 놓겠사옵니다. 서둘러 놓을까요, 차근차근 놓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 놓는다",
    "effects": {
     "people": 10,
     "treasury": -10,
     "nobles": -5
    },
    "this_run": "공사를 서두르느라 성벽 옆 길이 먼지투성이였다.",
    "build": [
     "tram"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "차근차근 놓는다",
    "effects": {
     "people": 5,
     "treasury": -5
    },
    "this_run": "공사는 조금 늦었지만 사고 없이 끝났다.",
    "build": [
     "tram"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "complex",
  "real_history": "1899년 서울에 전차가 다니기 시작했다. 개통식을 보려고 동대문에 많은 사람이 모였다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "281",
    "tb": "93"
   },
   {
    "type": "web",
    "title": "구간: 한국민족문화대백과사전 '전차'",
    "url": "https://encykorea.aks.ac.kr/Article/E0049706"
   }
  ],
  "sources_text": "지도서 281(교과서 93 사진: 1899 전차 개통식, 동대문) · 310~311(교과서 106~107) / [교과서 밖] 구간: 한국민족문화대백과사전 '전차' https://encykorea.aks.ac.kr/Article/E0049706",
  "learn": "근대 시설: 전차",
  "fx": {
   "build": [
    "tram"
   ],
   "note": "밤의 한성. 전등 불빛 아래 전차가 땡땡 소리를 내며 흥인지문 옆을 지나간다(그래픽 기준 3번)."
  }
 },
 {
  "id": "GX6",
  "kind": "device",
  "device_card": {
   "key": "open",
   "step": 5,
   "fixed": true
  },
  "stages": [
   "gojong"
  ],
  "order": 13,
  "year": "1899",
  "who": {
   "name": "일본 회사 사람",
   "doll": "official_red"
  },
  "line": "노량진에서 인천까지 철도를 놓겠소. 허락만 해 주시오.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "철도를 허락한다",
    "effects": {
     "treasury": 10,
     "army": -10
    },
    "this_run": "칙칙폭폭, 검은 기차가 들판을 가로질렀다.",
    "build": [
     "railway"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "다른 길을 찾는다",
    "effects": {
     "army": 5,
     "treasury": -15,
     "nobles": -5
    },
    "this_run": "전하는 다른 길을 찾으려 했지만 → 일본 회사가 공사를 이어 가 → 철도는 그대로 열렸다 → 나라는 돈만 쓰고 이익은 일본 쪽으로 갔다.",
    "build": [
     "railway"
    ],
    "build_state": "forced"
   }
  },
  "against": "left",
  "grain": "complex",
  "real_history": "1899년 우리나라 최초의 철도 경인선이 노량진~인천 사이에 개통되었다. 일본 회사가 놓은 이 철도가 조선을 위한 것이었는지 생각해 볼 일이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "311",
    "tb": "107"
   },
   {
    "type": "guide",
    "page": "312"
   },
   {
    "type": "web",
    "title": "구간: 한국민족문화대백과사전 '경인선'",
    "url": "https://encykorea.aks.ac.kr/Article/E0002748"
   }
  ],
  "sources_text": "지도서 311(교과서 107) 일본 회사가 놓은 최초의 철도 · 312(인천역=경인선 종착역) / [교과서 밖] 구간: 한국민족문화대백과사전 '경인선' https://encykorea.aks.ac.kr/Article/E0002748",
  "learn": "근대 시설: 철도와 그 이면",
  "fx": {
   "build": [
    "railway"
   ],
   "note": "섬 가장자리를 따라 철길이 깔리고 기차가 연기를 뿜으며 항구(인천)로 달린다. 마지막 장면."
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG01",
  "gauge": "people",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "세금이 무겁다는 하소연이 고을마다 쌓이고 있사옵니다.",
  "conditions_text": "백성 경고(낮음)",
  "choices": {
   "right": {
    "label": "세금을 덜어 준다",
    "effects": {
     "people": 15,
     "treasury": -10,
     "army": -5
    },
    "this_run": "올해 세금 장부에 붉은 줄이 그어졌다."
   },
   "left": {
    "label": "하소연을 듣는다",
    "effects": {
     "people": 8,
     "nobles": -5
    },
    "this_run": "관아 마당에서 수령이 하소연을 하나하나 들었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG02",
  "gauge": "people",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "관리들이 백성 눈치만 보며 세금 걷는 일을 미루고 있사옵니다.",
  "conditions_text": "백성 경고(높음)",
  "choices": {
   "right": {
    "label": "관청을 다잡는다",
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG03",
  "gauge": "nobles",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "새 문물을 두고 대신들끼리 말다툼이 잦아 조정이 어수선하옵니다.",
  "conditions_text": "양반 경고(낮음)",
  "choices": {
   "right": {
    "label": "양쪽 말을 다 듣는다",
    "effects": {
     "nobles": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "두 편 대신이 한 자리에서 차례로 말했다."
   },
   "left": {
    "label": "잔치를 열어 달랜다",
    "effects": {
     "nobles": 8,
     "treasury": -5
    },
    "this_run": "대신들이 한 상에 앉았다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG04",
  "gauge": "nobles",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "힘센 몇몇 집안 사람들이 높은 벼슬을 모두 차지하고 있다는 소문이옵니다.",
  "conditions_text": "양반 경고(높음)",
  "choices": {
   "right": {
    "label": "벼슬을 고루 나눈다",
    "effects": {
     "nobles": -15,
     "people": 5,
     "army": 5
    },
    "this_run": "여러 집안 사람이 고루 벼슬을 받았다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG05",
  "gauge": "treasury",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "새 기계와 물건을 사들이느라 곳간 바닥이 보이옵니다.",
  "conditions_text": "국고 경고(낮음)",
  "choices": {
   "right": {
    "label": "살림을 줄인다",
    "effects": {
     "treasury": 15,
     "nobles": -5,
     "people": -5
    },
    "this_run": "궁궐 잔치가 줄고 그 돈이 곳간에 남았다."
   },
   "left": {
    "label": "사들이기를 미룬다",
    "effects": {
     "treasury": 8,
     "army": -5
    },
    "this_run": "새 기계 사는 일을 한 해 미뤘다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG06",
  "gauge": "treasury",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간은 넘치는데 외국 상인들과 거래하는 관리들이 늘었다는 말이 있사옵니다.",
  "conditions_text": "국고 경고(높음)",
  "choices": {
   "right": {
    "label": "곡식을 푼다",
    "effects": {
     "treasury": -15,
     "people": 15
    },
    "this_run": "넘치는 곡식이 굶는 마을로 갔다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG07",
  "gauge": "army",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "강화도 군관",
   "doll": "general"
  },
  "line": "바닷가 포대의 대포가 낡고 지킬 군사가 모자라옵니다.",
  "conditions_text": "국방 경고(낮음)",
  "choices": {
   "right": {
    "label": "군사를 보낸다",
    "effects": {
     "army": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "포대마다 군사가 둘씩 섰다."
   },
   "left": {
    "label": "마을에 망을 맡긴다",
    "effects": {
     "army": 8,
     "people": -5
    },
    "this_run": "바닷가 사람들이 번갈아 언덕에 올랐다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NG08",
  "gauge": "army",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "병조 관리",
   "doll": "official_blue"
  },
  "line": "새로 만든 군대가 조정의 명보다 장교들 말을 먼저 듣는다는 소문이옵니다.",
  "conditions_text": "국방 경고(높음)",
  "choices": {
   "right": {
    "label": "군사 명부를 받는다",
    "effects": {
     "army": -15,
     "nobles": 5
    },
    "this_run": "장교들이 마지못해 명부를 올려 보냈다."
   },
   "left": {
    "label": "장교를 불러 타이른다",
    "effects": {
     "army": -8,
     "nobles": -5
    },
    "this_run": "장교들은 고개를 숙였지만 눈빛은 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG01",
  "gauge": "people",
  "side": "low",
  "level": "event",
  "name": "농민들이 모여 호소하다",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "세금에 지친 농민들이 고을마다 모여 관아 앞을 떠나지 않사옵니다.",
  "choices": {
   "right": {
    "label": "나쁜 관리를 벌한다",
    "effects": {
     "people": 20,
     "treasury": -20
    },
    "this_run": "세금을 마구 걷던 관리 몇이 벼슬에서 쫓겨나자, 농민들이 하나둘 집으로 돌아갔다."
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
  "fx": {},
  "similar": {
   "text": "조선 말기 관리들의 횡포가 심해지고 세금 부담이 커지자, 농민들은 전국 곳곳에서 봉기를 일으켰다.",
   "sources_text": "지도서 300(교과서 102)",
   "sources": [
    {
     "type": "guide",
     "page": "300",
     "tb": "102"
    }
   ],
   "out_of_textbook": false
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG02",
  "gauge": "people",
  "side": "high",
  "level": "event",
  "name": "관청이 세금을 걷지 못하다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "관리들이 ‘백성 눈치에 아무것도 못 한다’며 장부를 덮었사옵니다. 나라 살림이 멈추옵니다.",
  "choices": {
   "right": {
    "label": "관청에 힘을 싣는다",
    "effects": {
     "people": -20,
     "treasury": -15
    },
    "this_run": "관청 문이 다시 열렸지만, 새 일꾼을 들이느라 곳간이 줄었다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG03",
  "gauge": "nobles",
  "side": "low",
  "level": "event",
  "name": "두 편 신하들의 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "새 문물을 서두르자는 신하들과 문을 지키자는 신하들이 따로 모여 조정을 흔들 꾀를 낸다 하옵니다.",
  "choices": {
   "right": {
    "label": "두 편을 함께 쓴다",
    "effects": {
     "nobles": 20,
     "treasury": -20
    },
    "this_run": "두 편에서 한 사람씩 뽑아 같은 일을 맡겼다. 모임이 잦아들었다."
   },
   "left": {
    "label": "모임을 막는다",
    "effects": {
     "nobles": 12,
     "army": -15
    },
    "this_run": "모임 집 앞에 군사가 서자 모의는 흩어졌지만, 신하들의 눈빛은 차가웠다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG04",
  "gauge": "nobles",
  "side": "high",
  "level": "event",
  "name": "왕명이 한 집안에 막히다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "힘센 집안 대신들이 의논을 마쳤다며 전하의 명을 되돌려 보냈사옵니다.",
  "choices": {
   "right": {
    "label": "대신을 바꾼다",
    "effects": {
     "nobles": -20,
     "treasury": -15
    },
    "this_run": "힘센 대신 몇이 먼 고을로 떠나고, 새 사람들이 그 자리를 채웠다."
   },
   "left": {
    "label": "하나씩 설득한다",
    "effects": {
     "nobles": -12,
     "people": -10
    },
    "this_run": "대신들을 하나씩 불러 이야기했다. 그사이 백성의 일은 늦어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG05",
  "gauge": "treasury",
  "side": "low",
  "level": "event",
  "name": "새 문물 값에 곳간이 비다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "새 기계와 물건 값을 치르다 곳간이 비어, 관리 녹봉까지 밀렸사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 살림을 줄인다",
    "effects": {
     "treasury": 20,
     "nobles": -20
    },
    "this_run": "궁궐 잔치와 수라상이 줄고 그 돈이 녹봉이 되었다. 대신들은 체면이 깎였다며 투덜댔다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG06",
  "gauge": "treasury",
  "side": "high",
  "level": "event",
  "name": "외국 상인과 손잡은 관리",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "넘치는 곳간의 곡식을 외국 상인에게 몰래 판 관리가 있다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "조사해 벌한다",
    "effects": {
     "treasury": -20,
     "nobles": -15
    },
    "this_run": "몰래 판 곡식 값이 돌아왔고, 관리 몇이 벼슬을 잃었다."
   },
   "left": {
    "label": "곡식을 풀어 버린다",
    "effects": {
     "treasury": -12,
     "army": -5
    },
    "this_run": "곳간이 줄자 소문도 잦아들었지만, 군량 몫까지 나갔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG07",
  "gauge": "army",
  "side": "low",
  "level": "event",
  "name": "바다에 낯선 배, 포대가 소란하다",
  "who": {
   "name": "강화도 군관",
   "doll": "general"
  },
  "line": "바다에 낯선 배들이 나타나 포대가 소란하옵니다! 지킬 군사가 모자라옵니다.",
  "choices": {
   "right": {
    "label": "군사를 모아 보낸다",
    "effects": {
     "army": 20,
     "treasury": -20
    },
    "this_run": "군사들이 밤새 달려 포대를 지켰고, 낯선 배들은 물러갔다."
   },
   "left": {
    "label": "바닷가 마을을 비운다",
    "effects": {
     "army": 12,
     "people": -15
    },
    "this_run": "바닷가 사람들이 짐을 지고 안쪽 마을로 옮겼다. 빈 포구는 쓸쓸했다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG08",
  "gauge": "army",
  "side": "high",
  "level": "event",
  "name": "군대가 명을 듣지 않다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "새 군대 장교 몇이 조정의 명을 미루고 자기들 뜻대로 군사를 움직이옵니다.",
  "choices": {
   "right": {
    "label": "군권을 거둔다",
    "effects": {
     "army": -20,
     "nobles": -15
    },
    "this_run": "장교들이 맡던 군사 일부가 조정으로 돌아왔다."
   },
   "left": {
    "label": "상을 주어 달랜다",
    "effects": {
     "army": -12,
     "treasury": -15
    },
    "this_run": "장교들은 상을 받고 물러섰지만 군사는 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG01b",
  "gauge": "people",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "농민들이 모여 호소하다",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "모인 농민들이 더 늘었사옵니다. 이웃 고을까지 번지옵니다.",
  "choices": {
   "right": {
    "label": "수령을 바꾸고 푼다",
    "effects": {
     "people": 20,
     "treasury": -25
    },
    "this_run": "새 수령이 창고를 열자 사람들이 하나둘 집으로 돌아갔다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG02b",
  "gauge": "people",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "관청이 세금을 걷지 못하다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "고을마다 관청 문이 닫혀 세금을 한 푼도 걷지 못했사옵니다.",
  "choices": {
   "right": {
    "label": "관찰사를 보낸다",
    "effects": {
     "people": -20,
     "treasury": -20
    },
    "this_run": "관찰사들이 고을을 돌며 장부를 다시 채웠다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG03b",
  "gauge": "nobles",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "두 편 신하들의 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "모의한 신하들이 상소를 모아 조정을 멈추자 하옵니다.",
  "choices": {
   "right": {
    "label": "벼슬을 고루 준다",
    "effects": {
     "nobles": 20,
     "treasury": -25
    },
    "this_run": "두 편 신하들이 고루 벼슬을 받고 모의를 그만두었다."
   },
   "left": {
    "label": "모임을 흩는다",
    "effects": {
     "nobles": 12,
     "army": -20
    },
    "this_run": "군사들이 모임 집을 둘러쌌고, 신하들은 흩어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG04b",
  "gauge": "nobles",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "왕명이 한 집안에 막히다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "그 집안 대신들이 상소를 모아 전하의 결정을 모두 미루자 하옵니다.",
  "choices": {
   "right": {
    "label": "대신 권한을 줄인다",
    "effects": {
     "nobles": -20,
     "treasury": -20
    },
    "this_run": "대신들이 맡던 일 몇 가지가 전하 곁으로 돌아왔다."
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
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG05b",
  "gauge": "treasury",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "새 문물 값에 곳간이 비다",
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
    "label": "새 일을 멈춘다",
    "effects": {
     "treasury": 12,
     "army": -15
    },
    "this_run": "새 군대를 기르는 일까지 멈췄다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG06b",
  "gauge": "treasury",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "외국 상인과 손잡은 관리",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간 일로 관리들 사이 다툼이 커졌사옵니다.",
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG07b",
  "gauge": "army",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "바다에 낯선 배, 포대가 소란하다",
  "who": {
   "name": "강화도 군관",
   "doll": "general"
  },
  "line": "낯선 배들이 다시 와 더 가까이 다가왔사옵니다. 포대가 위태롭사옵니다.",
  "choices": {
   "right": {
    "label": "포대와 군사를 챙긴다",
    "effects": {
     "army": 20,
     "treasury": -25
    },
    "this_run": "포대에 새 대포가 놓이고 군사가 모였다."
   },
   "left": {
    "label": "포구를 비운다",
    "effects": {
     "army": 12,
     "people": -20
    },
    "this_run": "바닷가 사람들이 모두 안쪽 마을로 들어왔다."
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
   "gojong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KG08b",
  "gauge": "army",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "군대가 명을 듣지 않다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "장교들이 서로 군사를 겨루며 군영 문을 걸어 잠갔사옵니다.",
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
    "label": "장교들을 갈라놓는다",
    "effects": {
     "army": -12,
     "treasury": -20
    },
    "this_run": "장교들이 먼 고을로 흩어졌지만 비용이 컸다."
   }
  },
  "sources": [],
  "fx": {}
 }
]);
})();
