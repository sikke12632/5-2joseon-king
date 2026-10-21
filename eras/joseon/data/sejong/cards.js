/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "S00",
  "kind": "sagwan",
  "stages": [
   "sejong"
  ],
  "order": 0,
  "year": "1418",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "태조 뒤 정종과 태종을 거쳐, 1418년 세종이 왕위에 올랐다. 세종은 집현전에 젊은 학자들을 모아 연구하게 했다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "262",
    "tb": "88"
   },
   {
    "type": "guide",
    "page": "266"
   },
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "지도서 262(교과서 88 세종) · 266(집현전의 젊은 학자) · 249(집현전에서 책 편찬)",
  "learn": "세종과 집현전",
  "fx": {
   "build": [
    "jiphyeon"
   ],
   "note": "봄 하늘. 경복궁 곁에 집현전 지붕이 “뽕”, 창마다 등불."
  },
  "caution": "집현전은 지도서 참고 자료에 나옴(교과서 본문에는 이름이 없을 수 있음)."
 },
 {
  "id": "S01",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 1,
  "year": "1419",
  "who": {
   "name": "바닷가 고을 수령",
   "doll": "official_red"
  },
  "line": "왜구의 근거지 쓰시마섬을 치기로 했사옵니다. 곧바로 칠까요, 배를 더 모아 칠까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "곧바로 친다",
    "effects": {
     "army": 15,
     "people": -10
    },
    "this_run": "서두르느라 바닷가 고을의 고깃배까지 불려 나갔다."
   },
   "left": {
    "label": "배를 더 모아 친다",
    "effects": {
     "army": 10,
     "treasury": -10
    },
    "this_run": "배를 더 만드느라 곳간이 가벼워졌다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1419년(세종 1) 조선은 왜구의 근거지 쓰시마섬을 정벌했다. 정벌은 상왕 태종이 결정했고 이종무가 이끌었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   },
   {
    "type": "web",
    "title": "배 수: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0014343"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 세종 때 쓰시마섬 정벌 / [교과서 밖] 태종·이종무·배 수: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0014343",
  "learn": "조선 전기 주변 나라와의 관계(왜구에 강하게 대응)",
  "fx": {
   "boats": true,
   "note": "섬 남쪽 바다로 돛배 무리가 지나간다(전투 장면 없이 깃발과 물살만)."
  }
 },
 {
  "id": "S02",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 2,
  "year": "1429",
  "who": {
   "name": "경상도 관찰사",
   "doll": "official_green"
  },
  "line": "경험 많은 농부들에게 물어 우리 땅에 맞는 농사책을 엮겠사옵니다. 서둘러 낼까요, 모든 도를 꼼꼼히 살필까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 엮는다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -5
    },
    "device": {
     "invention": 1
    },
    "this_run": "책은 빨리 나왔지만, 빠진 고을이 있다며 학자들이 아쉬워했다."
   },
   "left": {
    "label": "꼼꼼히 엮는다",
    "effects": {
     "people": 15,
     "treasury": -10
    },
    "device": {
     "invention": 1
    },
    "this_run": "모든 도의 농법을 모으느라 관리들이 오래 길 위에 있었다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1429년 《농사직설》이 나왔다. 농민들의 경험을 모아 우리나라 환경에 맞게 농사법을 정리한 책이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "263",
    "tb": "89"
   }
  ],
  "sources_text": "지도서 263(교과서 89) 《농사직설》 · 266~267 1428년 관찰사에게 농법 조사 명령, 1429년 간행",
  "learn": "《농사직설》 편찬",
  "fx": {
   "note": "논밭의 벼 이삭이 금빛으로 출렁이고, 책 한 권이 마을 쪽으로 날아간다."
  }
 },
 {
  "id": "S03",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 3,
  "year": "1430",
  "who": {
   "name": "호조 판서",
   "doll": "official_blue"
  },
  "line": "새 세금법을 두고 관리부터 마을 백성까지 찬반을 묻겠사옵니다. 서둘러 물을까요, 농사철을 피해 물을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 묻는다",
    "effects": {
     "nobles": 5,
     "people": -5
    },
    "this_run": "바쁜 농사철에 관리가 찾아와 백성들이 귀찮아했다."
   },
   "left": {
    "label": "농사철 피해 묻는다",
    "effects": {
     "people": 10,
     "nobles": -5,
     "treasury": -10
    },
    "this_run": "조사가 길어져 대신들은 답답해했지만, 백성들은 차분히 답했다."
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1430년, 약 17만 명에게 새 세금법(공법)의 찬반을 물었다. 찬성 9만 8천여 명, 반대 7만 4천여 명. 지역마다 생각이 달라 오래 의논한 끝에 1444년에 정해졌다. (노비 등은 묻지 않았다.)",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 세종 12년 8월 10일",
    "url": "https://sillok.history.go.kr/id/kda_11208010_005"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 세종 12년 8월 10일 https://sillok.history.go.kr/id/kda_11208010_005",
  "learn": "백성의 뜻을 물은 세종의 정치",
  "fx": {
   "note": "마을 마당마다 작은 깃발이 꽂히며 숫자가 올라간다."
  }
 },
 {
  "id": "S04",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 4,
  "year": "1430년대",
  "who": {
   "name": "북쪽 국경의 장수",
   "doll": "official_red"
  },
  "line": "압록강·두만강까지 진을 쌓고 남쪽 백성을 옮겨 살게 하겠사옵니다. 서둘러 옮길까요, 가겠다는 사람부터 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 옮긴다",
    "effects": {
     "army": 15,
     "people": -15
    },
    "this_run": "정든 고향을 억지로 떠나는 백성들의 울음이 길을 메웠다.",
    "build": [
     "jin"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "원하는 이부터",
    "effects": {
     "army": 5,
     "people": 5,
     "treasury": -10
    },
    "this_run": "스스로 가겠다는 사람부터 보내, 진이 채워지기까지 오래 걸렸다.",
    "build": [
     "jin"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "세종 때 압록강 유역에 4군, 두만강 유역에 6진을 두어, 오늘날과 비슷한 국경선이 정해졌다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "234",
    "tb": "76"
   }
  ],
  "sources_text": "지도서 234(교과서 76) 4군 6진 · 수업 도움말(남쪽 백성을 옮겨 살게 함)",
  "learn": "4군 6진과 국경선",
  "fx": {
   "build": [
    "jin"
   ],
   "note": "섬 북쪽 끝 강가에 목책과 봉화대가 줄지어 서고 깃발 열 개(4+6)가 꽂힌다."
  }
 },
 {
  "id": "S05",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 5,
  "year": "1434",
  "who": {
   "name": "집현전 학자",
   "doll": "official_blue"
  },
  "line": "효자·충신 이야기를 그림과 함께 엮은 책을 만들겠사옵니다. 서둘러 펴낼까요, 이야기를 골라 펴낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "서둘러 펴낸다",
    "effects": {
     "people": 5,
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "책은 빨리 나왔지만 그림이 거칠다는 말이 있었다."
   },
   "left": {
    "label": "골라서 펴낸다",
    "effects": {
     "nobles": 10,
     "treasury": -10
    },
    "this_run": "이야기를 고르고 또 고르느라 학자들이 밤을 새웠다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1434년 《삼강행실도》가 나왔다. 글을 모르는 백성도 알아보도록 이야기마다 그림을 넣었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "246",
    "tb": "82"
   },
   {
    "type": "guide",
    "page": "249"
   }
  ],
  "sources_text": "지도서 246(교과서 82) 《삼강행실도》 · 249(1434년 집현전 편찬)",
  "learn": "《삼강행실도》와 유교 예절의 보급",
  "fx": {
   "note": "목판화 같은 흑백 그림 한 장(부모를 모시는 장면)이 하늘에 펼쳐졌다 접힌다."
  },
  "caution": "수위: 책 속 이야기는 효도·공경 장면만 쓴다. 지도서 249가 경고한 자해·죽음 이야기는 쓰지 않는다."
 },
 {
  "id": "S06",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 6,
  "year": "1434",
  "who": {
   "name": "장영실",
   "doll": "jangyeongsil"
  },
  "line": "스스로 시각을 알리는 물시계를 만들겠사옵니다. 구리를 넉넉히 내주시겠사옵니까, 아껴 쓸까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "구리를 내준다",
    "effects": {
     "treasury": -15,
     "people": 5
    },
    "device": {
     "invention": 2
    },
    "this_run": "장인들이 밤낮으로 쇠를 부어 물시계가 빨리 섰다.",
    "build": [
     "jagyeok"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "재료를 아낀다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "device": {
     "invention": 1
    },
    "this_run": "재료를 아끼느라 누각에 한동안 비계가 남았다.",
    "build": [
     "jagyeok"
    ],
    "build_state": "late"
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1434년 물시계 자격루가 완성되었다. 정해진 때가 되면 나무 인형이 종·북·징을 쳐서 시각을 알렸다. 장영실은 동래현 관청 노비 출신으로, 세종이 재주를 알아보고 벼슬을 주었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   },
   {
    "type": "guide",
    "page": "267"
   },
   {
    "type": "web",
    "title": "인형이 시각을 알림: 한국민족문화대백과사전 '자격루'",
    "url": "https://encykorea.aks.ac.kr/Article/E0047854"
   },
   {
    "type": "web",
    "title": "장영실의 신분:",
    "url": "https://encykorea.aks.ac.kr/Article/E0048697"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 물시계 자격루 · 267(장영실) / [교과서 밖] 인형이 시각을 알림: 한국민족문화대백과사전 '자격루' https://encykorea.aks.ac.kr/Article/E0047854 · 장영실의 신분: https://encykorea.aks.ac.kr/Article/E0048697 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30",
  "learn": "자격루와 과학 기구 발명",
  "fx": {
   "build": [
    "jagyeok"
   ],
   "note": "경회루 남쪽에 자격루 누각이 “뽕”. 정해진 때마다 작은 나무 인형이 종을 친다 “둥—”."
  }
 },
 {
  "id": "S07",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 7,
  "year": "1426~1434",
  "who": {
   "name": "관청 노비 아낙",
   "doll": "nobi"
  },
  "line": "전하, 아이를 낳고 며칠 만에 다시 일하러 나와야 하옵니다. 몸을 추스를 날을 주소서.",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "100일을 바로 준다",
    "effects": {
     "people": 15,
     "treasury": -10
    },
    "this_run": "아낙은 아기를 안고 고개를 숙였다. 관청 일손은 한동안 모자랐다."
   },
   "left": {
    "label": "차례로 늘린다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "휴가가 몇 해에 걸쳐 조금씩 늘어, 그사이 산모들은 힘들었다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "세종은 1426년 아이를 낳은 관청 여자 노비에게 100일 휴가를 주었고, 1430년 낳기 전 1개월을 더했으며, 1434년에는 남편에게도 30일 휴가를 주었다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010"
   },
   {
    "type": "web",
    "title": "조선왕조실록 세종 12년 10월 19일",
    "url": "https://sillok.history.go.kr/id/kda_11210019_006"
   }
  ],
  "sources_text": "[교과서 밖] 우리역사넷 https://contents.history.go.kr/mobile/nh/view.do?levelId=nh_025_0020_0060_0030_0010 · 조선왕조실록 세종 12년 10월 19일 https://sillok.history.go.kr/id/kda_11210019_006",
  "learn": "천민의 삶과 세종의 정책",
  "fx": {
   "note": "초가 마당에 아기 요람이 놓이고 저녁 불빛이 켜진다."
  },
  "caution": "천민 카드: 놀림 없이, 존중하는 말투로."
 },
 {
  "id": "S08",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 8,
  "year": "1442",
  "who": {
   "name": "의금부 관리",
   "doll": "official_green"
  },
  "line": "임금님 가마가 부서졌사옵니다. 만드는 일을 감독한 장영실에게 무거운 벌을 내리소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "벌을 줄여 준다",
    "effects": {
     "people": 5,
     "nobles": -10
    },
    "this_run": "전하가 벌을 줄이자 → 대신들은 ‘법이 흔들린다’며 수군거렸다 → 그래도 장영실은 벼슬을 잃었다 → 공방의 장인들이 말을 잃었다."
   },
   "left": {
    "label": "법대로 둔다",
    "effects": {
     "nobles": 10,
     "people": -15
    },
    "device": {
     "invention": -1
    },
    "this_run": "전하는 법대로 하라 했지만 → 오랜 공을 아끼는 신하들이 거듭 아뢰어 → 결국 벌이 조금 줄었다 → 장인들은 ‘재주보다 신분’이라며 크게 낙담했다."
   }
  },
  "against": "left",
  "grain": "balance",
  "event_type": "normal",
  "real_history": "1442년, 의금부가 장영실에게 무거운 벌을 청했고 세종은 벌을 줄여 주었다. 장영실은 벼슬을 잃었고, 그 뒤 기록에서 이름이 사라졌다. 사라진 까닭을 둘러싼 이야기는 소설·드라마에서 지어낸 것이 많다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "조선왕조실록 세종 24년 4월 27일",
    "url": "https://sillok.history.go.kr/id/kda_12404027_002"
   },
   {
    "type": "web",
    "title": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30"
   }
  ],
  "sources_text": "[교과서 밖] 조선왕조실록 세종 24년 4월 27일 https://sillok.history.go.kr/id/kda_12404027_002 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0400_0010&code=eh_age_30",
  "learn": "신분을 넘어 재주를 인정받은 장영실(그리고 그 끝)",
  "fx": {
   "note": "왕의 가마 모형이 덜컹 기울고, 자격루 종소리가 한 번 멈췄다가 다시 울린다."
  }
 },
 {
  "id": "S09",
  "kind": "history",
  "stages": [
   "sejong"
  ],
  "order": 9,
  "year": "1443~1446",
  "who": {
   "name": "집현전 학자 최만리",
   "doll": "official_green"
  },
  "line": "전하, 새 글자를 만드시면 선비들이 한자를 멀리할까 두렵사옵니다. 거두어 주시옵소서.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "반포를 미룬다",
    "effects": {
     "nobles": 15,
     "people": -15
    },
    "device": {
     "invention": -1
    },
    "this_run": "전하는 반포를 미뤘지만 → 백성을 위한 글자라는 뜻을 꺾지 못해 → 결국 훈민정음을 반포했다 → 그사이 연구가 늦어지고 양반들 기대만 커졌다."
   },
   "left": {
    "label": "뜻을 지킨다",
    "effects": {
     "people": 10,
     "nobles": -15
    },
    "this_run": "전하는 뜻을 굽히지 않았고 → 최만리 등은 크게 반발했다 → 훈민정음은 그대로 반포되었다 → 집현전 안이 한동안 서먹했다."
   }
  },
  "against": "right",
  "grain": "balance",
  "event_type": "normal",
  "real_history": "세종은 1443년 훈민정음 28자를 만들고 1446년 반포했다. ‘백성을 가르치는 바른 소리’라는 뜻이다. 최만리는 1444년 반대하는 글을 올렸다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "262",
    "tb": "88"
   },
   {
    "type": "guide",
    "page": "263"
   },
   {
    "type": "guide",
    "page": "266"
   }
  ],
  "sources_text": "지도서 262(교과서 88) 훈민정음 창제·28자·뜻 · 263 유의점(반포를 반대한 양반) · 266(1443 창제·1446 반포, 최만리 1444년 상소)",
  "learn": "훈민정음 창제와 양반의 반대",
  "fx": {
   "skyText": "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ",
   "note": "반포 순간 하늘에 ㄱ ㄴ ㄷ … 스물여덟 글자가 빛으로 떠올라 마을 지붕 위로 흩어진다."
  },
  "caution": "제작서 참고물 카드를 그대로 썼다. 최만리라는 이름은 지도서 266 참고 자료에 나온다(교과서 본문은 ‘반대한 양반’)."
 },
 {
  "id": "SX1",
  "kind": "device",
  "device_card": {
   "key": "invention",
   "step": 0,
   "after": "S04",
   "before": "S08"
  },
  "stages": [
   "sejong"
  ],
  "order": 1,
  "year": "세종 때",
  "who": {
   "name": "서운관(하늘을 살피는 관청) 관리",
   "doll": "official_green"
  },
  "line": "해와 달, 별의 움직임을 살피는 혼천의를 완성했사옵니다. 높은 관측대를 세울까요, 작은 대에 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "관측대를 세운다",
    "effects": {
     "treasury": -10,
     "people": 10
    },
    "this_run": "궁궐 뜰에 높은 관측대가 섰다.",
    "build": [
     "honcheon"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작은 대에 둔다",
    "effects": {
     "treasury": 5,
     "people": -5
    },
    "this_run": "혼천의는 낮은 대 위에서 돌았다.",
    "build": [
     "honcheon"
    ],
    "build_state": "late"
   }
  },
  "grain": "balance",
  "real_history": "세종 때 혼천의를 만들어 해와 달, 별의 움직임을 관찰했다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   },
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 혼천의 · 267(서운관)",
  "learn": "과학 기구 발명(혼천의)",
  "fx": {
   "build": [
    "honcheon"
   ],
   "note": "궁궐 뜰에 둥근 고리 여러 겹이 겹친 혼천의가 천천히 돈다."
  },
  "caution": "나오는 창: S04 뒤 ~ S08 앞. 진행도 2 이상이면 창 처음에, 아니면 창 끝에."
 },
 {
  "id": "SX2",
  "kind": "device",
  "device_card": {
   "key": "invention",
   "step": 1,
   "after": "S05",
   "before": "S08"
  },
  "stages": [
   "sejong"
  ],
  "order": 2,
  "year": "1434",
  "who": {
   "name": "장인",
   "doll": "official_red"
  },
  "line": "해시계를 오가는 백성이 많은 거리에 두겠사옵니다. 혜정교 앞에 둘까요, 종묘 앞에 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "혜정교 앞에 둔다",
    "effects": {
     "people": 10,
     "treasury": -5
    },
    "this_run": "다리 앞을 오가는 장사꾼들이 그림자를 들여다봤다.",
    "build": [
     "angbu"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "종묘 앞에 둔다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -5
    },
    "this_run": "제사 길 사람들이 해시계 앞에 멈춰 섰다.",
    "build": [
     "angbu"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "complex",
  "real_history": "1434년 앙부일구가 혜정교 앞과 종묘 앞 거리에 놓였다. 열두 띠 동물 그림을 그려 글자를 몰라도 시각을 알 수 있었다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   },
   {
    "type": "guide",
    "page": "267"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 앙부일구 · 267(1434년 길가 설치, 열두 띠 동물 그림)",
  "learn": "앙부일구와 백성을 위한 과학",
  "fx": {
   "build": [
    "angbu"
   ],
   "note": "종로 길가에 가마솥 모양 해시계가 “뽕”, 그림자 바늘이 천천히 움직인다."
  },
  "caution": "나오는 창: S05 뒤 ~ S08 앞. 진행도 3 이상이면 창 처음에."
 },
 {
  "id": "SX3",
  "kind": "device",
  "device_card": {
   "key": "invention",
   "step": 2,
   "after": "SX2",
   "before": "S08"
  },
  "stages": [
   "sejong"
  ],
  "order": 3,
  "year": "1441~1442",
  "who": {
   "name": "세자",
   "doll": "seja"
  },
  "line": "아바마마, 땅에 스민 빗물로는 비의 양을 알 수 없어 구리 그릇으로 재 보았사옵니다. 이 그릇을 고을마다 한꺼번에 보낼까요, 큰 고을부터 보낼까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "모든 고을에 보낸다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "고을마다 그릇이 한꺼번에 닿아 수령들이 바빴다.",
    "build": [
     "cheugu"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "큰 고을부터",
    "effects": {
     "treasury": 5,
     "nobles": 5,
     "people": -5
    },
    "this_run": "작은 고을에는 그릇이 늦게 닿아 그 고을 백성들이 섭섭해했다.",
    "build": [
     "cheugu"
    ],
    "build_state": "late"
   }
  },
  "grain": "seed",
  "real_history": "1441~1442년 측우기 제도가 마련되어 서울과 지방 고을에서 비의 양을 재 보고하게 했다. 실록에는 세자가 빗물 재는 실험을 했다고 적혀 있다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "264",
    "tb": "90"
   },
   {
    "type": "guide",
    "page": "267"
   },
   {
    "type": "web",
    "title": "세자의 실험: 조선왕조실록 세종 23년 4월 29일",
    "url": "https://sillok.history.go.kr/id/kda_12304029_001"
   }
  ],
  "sources_text": "지도서 264(교과서 90) 측우기·여러 지방에 보냄 · 267(1441~1442 측우기 제도) / [교과서 밖] 세자의 실험: 조선왕조실록 세종 23년 4월 29일 https://sillok.history.go.kr/id/kda_12304029_001",
  "learn": "측우기와 농사",
  "fx": {
   "build": [
    "cheugu"
   ],
   "note": "고을마다 작은 원통 그릇이 놓이고, 비가 오면 눈금이 차오른다."
  },
  "caution": "나오는 창: SX2 뒤 ~ S08 앞. 진행도 5 이상이면 창 처음에. 장영실이 측우기를 발명했다고 쓰지 않는다."
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS01",
  "gauge": "people",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "올봄 비가 적어 보리가 말라 가옵니다. 고을마다 걱정하는 소리가 커지옵니다.",
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
    "label": "씨앗을 나눠 준다",
    "effects": {
     "people": 8,
     "treasury": -5
    },
    "this_run": "관아 마당에 씨앗 자루가 쌓였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS02",
  "gauge": "people",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "수령들이 백성이 섭섭해한다며 논밭 조사를 미루고 있사옵니다.",
  "conditions_text": "백성 경고(높음)",
  "choices": {
   "right": {
    "label": "조사를 다시 연다",
    "effects": {
     "people": -10,
     "treasury": 10,
     "nobles": 5
    },
    "this_run": "수령들이 다시 줄자를 들고 논밭을 쟀다."
   },
   "left": {
    "label": "수령을 달랜다",
    "effects": {
     "nobles": 8,
     "people": -5
    },
    "this_run": "수령들의 투덜거림이 잦아들었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS03",
  "gauge": "nobles",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "새 일이 너무 많다며 대신들 얼굴이 어둡사옵니다. 집현전 학자들도 지쳐 보이옵니다.",
  "conditions_text": "양반 경고(낮음)",
  "choices": {
   "right": {
    "label": "잔치를 열어 준다",
    "effects": {
     "nobles": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "궁궐 연못가에 오랜만에 웃음소리가 났다."
   },
   "left": {
    "label": "쉬는 날을 준다",
    "effects": {
     "nobles": 8,
     "treasury": -5
    },
    "this_run": "학자들이 하루 집에 돌아가 늦잠을 잤다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS04",
  "gauge": "nobles",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 새 제도를 아뢰기도 전에 자기들끼리 미룬다는 소문이옵니다.",
  "conditions_text": "양반 경고(높음)",
  "choices": {
   "right": {
    "label": "직접 회의를 연다",
    "effects": {
     "nobles": -15,
     "people": 5,
     "army": 5
    },
    "this_run": "세종이 회의 자리 한가운데 앉아 하나하나 물었다."
   },
   "left": {
    "label": "미룬 일을 묻는다",
    "effects": {
     "nobles": -8,
     "army": 5
    },
    "this_run": "대신 하나가 미뤄 둔 문서를 꺼내 왔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS05",
  "gauge": "treasury",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "구리와 쌀이 줄어 장인들 품삯을 걱정하는 소리가 나오옵니다.",
  "conditions_text": "국고 경고(낮음)",
  "choices": {
   "right": {
    "label": "새 일을 쉰다",
    "effects": {
     "treasury": 15,
     "nobles": -5,
     "people": -5
    },
    "this_run": "공방의 망치 소리가 잠시 멈췄다."
   },
   "left": {
    "label": "수라상을 줄인다",
    "effects": {
     "treasury": 8,
     "nobles": -5
    },
    "this_run": "세종의 밥상 반찬이 몇 가지 줄었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS06",
  "gauge": "treasury",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간이 넘쳐 묵은 쌀에 벌레가 생긴다 하옵니다.",
  "conditions_text": "국고 경고(높음)",
  "choices": {
   "right": {
    "label": "곡식을 푼다",
    "effects": {
     "treasury": -15,
     "people": 15
    },
    "this_run": "가난한 집 마당마다 쌀자루가 놓였다."
   },
   "left": {
    "label": "책을 찍어 낸다",
    "effects": {
     "treasury": -8,
     "nobles": 5
    },
    "this_run": "집현전 책들이 여러 벌 찍혀 고을로 갔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS07",
  "gauge": "army",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "북방 군관",
   "doll": "general"
  },
  "line": "북쪽 강가 진에 군사가 모자라 봉수대를 지킬 사람이 없사옵니다.",
  "conditions_text": "국방 경고(낮음)",
  "choices": {
   "right": {
    "label": "군사를 보낸다",
    "effects": {
     "army": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "북쪽 진마다 새 군사가 도착했다."
   },
   "left": {
    "label": "마을에 망을 맡긴다",
    "effects": {
     "army": 8,
     "people": -5
    },
    "this_run": "강가 마을 사람들이 번갈아 언덕에 올랐다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NS08",
  "gauge": "army",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "병조 관리",
   "doll": "official_blue"
  },
  "line": "북방 장수들이 군사를 늘리고도 보고를 미룬다는 말이 돌고 있사옵니다.",
  "conditions_text": "국방 경고(높음)",
  "choices": {
   "right": {
    "label": "군사 명부를 받는다",
    "effects": {
     "army": -15,
     "nobles": 5
    },
    "this_run": "장수들이 마지못해 군사 명부를 올려 보냈다."
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS01",
  "gauge": "people",
  "side": "low",
  "level": "event",
  "name": "굶주린 백성이 관아로 몰려들다",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "가뭄 끝에 굶주린 백성들이 관아 마당을 가득 메웠사옵니다. 곡식을 내놓으라며 물러나지 않사옵니다.",
  "choices": {
   "right": {
    "label": "창고를 열어 나눈다",
    "effects": {
     "people": 20,
     "treasury": -20
    },
    "this_run": "관아 창고의 쌀이 바가지마다 담기자, 사람들이 하나둘 돌아갔다."
   },
   "left": {
    "label": "군사로 지킨다",
    "effects": {
     "people": 12,
     "army": -10
    },
    "this_run": "관아 앞에 군사가 늘어서자 사람들은 물러났지만, 배고픔은 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS02",
  "gauge": "people",
  "side": "high",
  "level": "event",
  "name": "세금 조사가 멈추다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "수령들이 백성이 싫어한다며 논밭 조사를 그만두었사옵니다. 나라 장부가 비어 가옵니다.",
  "choices": {
   "right": {
    "label": "조사관을 보낸다",
    "effects": {
     "people": -20,
     "treasury": -15
    },
    "this_run": "새 조사관들이 줄자를 들고 고을을 돌았다. 길삯이 많이 들었다."
   },
   "left": {
    "label": "수령을 타이른다",
    "effects": {
     "people": -12,
     "nobles": -10
    },
    "this_run": "수령들이 마지못해 다시 붓을 들었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS03",
  "gauge": "nobles",
  "side": "low",
  "level": "event",
  "name": "대신과 학자들이 벼슬을 내놓다",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "새 일에 지친 대신과 학자들이 한꺼번에 벼슬을 내놓겠다며 모였사옵니다. 조정이 텅 빌까 걱정이옵니다.",
  "choices": {
   "right": {
    "label": "벼슬과 상을 내린다",
    "effects": {
     "nobles": 20,
     "treasury": -20
    },
    "this_run": "상을 받은 대신들이 다시 조정에 나왔다."
   },
   "left": {
    "label": "일을 줄여 준다",
    "effects": {
     "nobles": 12,
     "people": -15
    },
    "this_run": "대신들은 돌아왔지만, 백성을 위한 일 몇 가지가 미뤄졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS04",
  "gauge": "nobles",
  "side": "high",
  "level": "event",
  "name": "새 제도가 모두 막히다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 의논을 마쳤다며 새 제도를 모두 되돌려 보냈사옵니다.",
  "choices": {
   "right": {
    "label": "대신을 바꾼다",
    "effects": {
     "nobles": -20,
     "treasury": -15
    },
    "this_run": "힘센 대신 몇이 먼 고을로 떠나고, 젊은 학자들이 그 자리를 채웠다."
   },
   "left": {
    "label": "하나씩 설득한다",
    "effects": {
     "nobles": -12,
     "people": -10
    },
    "this_run": "세종은 대신들을 하나씩 불러 이야기했다. 그사이 백성의 일은 늦어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS05",
  "gauge": "treasury",
  "side": "low",
  "level": "event",
  "name": "장인들의 품삯이 밀리다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "곳간이 비어 장인과 관리들 품삯이 밀렸사옵니다. 공방 문이 하나둘 닫히고 있사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 살림을 줄인다",
    "effects": {
     "treasury": 20,
     "nobles": -20
    },
    "this_run": "세종의 수라상이 줄고 그 쌀이 품삯이 되었다. 대신들은 체면이 깎였다며 투덜댔다."
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS06",
  "gauge": "treasury",
  "side": "high",
  "level": "event",
  "name": "구리를 노리는 손",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "넘치는 곳간에서 관리 몇이 쌀과 구리를 몰래 빼돌렸다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "조사해 벌한다",
    "effects": {
     "treasury": -20,
     "nobles": -15
    },
    "this_run": "빼돌린 구리가 돌아왔고, 관리 몇이 벼슬을 잃었다."
   },
   "left": {
    "label": "공방에 나눠 준다",
    "effects": {
     "treasury": -12,
     "army": -5
    },
    "this_run": "구리가 공방으로 가자 다툼은 줄었지만, 무기 만들 몫까지 나갔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS07",
  "gauge": "army",
  "side": "low",
  "level": "event",
  "name": "여진 무리가 강을 건너다",
  "who": {
   "name": "북방 군관",
   "doll": "general"
  },
  "line": "강 건너에서 넘어온 무리가 마을 곡식을 가져갔사옵니다! 봉수대에 불이 올랐사옵니다.",
  "choices": {
   "right": {
    "label": "군사를 모아 보낸다",
    "effects": {
     "army": 20,
     "treasury": -20
    },
    "this_run": "군사들이 밤새 달려 강가를 지켰고, 무리는 강 너머로 물러갔다."
   },
   "left": {
    "label": "진 안으로 피한다",
    "effects": {
     "army": 12,
     "people": -15
    },
    "this_run": "강가 사람들이 짐을 지고 진 안으로 피했다. 빈 마을은 쓸쓸했다."
   }
  },
  "sources": [],
  "fx": {},
  "similar": {
   "text": "여진이 국경을 넘어와 피해를 주자, 조선은 세종 때 압록강 유역에 4군, 두만강 유역에 6진을 설치했다.",
   "sources_text": "지도서 234(교과서 76)",
   "sources": [
    {
     "type": "guide",
     "page": "234",
     "tb": "76"
    }
   ],
   "out_of_textbook": false
  },
  "damage": {
   "targets": [
    "jin"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS08",
  "gauge": "army",
  "side": "high",
  "level": "event",
  "name": "북방 장수들이 명을 듣지 않다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "북쪽 진의 장수 몇이 군사를 늘리고는 도성의 명을 따르지 않사옵니다.",
  "choices": {
   "right": {
    "label": "장수를 불러들인다",
    "effects": {
     "army": -20,
     "nobles": -15
    },
    "this_run": "장수들이 도성으로 불려 오고, 새 장수가 진을 맡았다."
   },
   "left": {
    "label": "상을 주어 달랜다",
    "effects": {
     "army": -12,
     "treasury": -15
    },
    "this_run": "장수들은 상을 받고 물러섰지만 군사는 그대로였다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS01b",
  "gauge": "people",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "굶주린 백성이 관아로 몰려들다",
  "who": {
   "name": "고을에서 올라온 관리",
   "doll": "official_green"
  },
  "line": "관아 마당의 사람들이 더 늘었사옵니다. 이대로면 이웃 고을로 번지옵니다.",
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS02b",
  "gauge": "people",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "세금 조사가 멈추다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "고을마다 조사가 멈춰 올해 세금을 정할 수 없사옵니다.",
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS03b",
  "gauge": "nobles",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "대신과 학자들이 벼슬을 내놓다",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "벼슬을 내놓은 대신들이 고향으로 짐을 싸고 있사옵니다.",
  "choices": {
   "right": {
    "label": "직접 찾아가 붙든다",
    "effects": {
     "nobles": 20,
     "treasury": -25
    },
    "this_run": "세종이 보낸 편지와 선물에 대신들이 짐을 풀었다."
   },
   "left": {
    "label": "새 사람을 뽑는다",
    "effects": {
     "nobles": 12,
     "people": -20
    },
    "this_run": "새 관리를 뽑느라 고을 일이 한동안 비었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS04b",
  "gauge": "nobles",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "새 제도가 모두 막히다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 상소를 모아 새 제도를 모두 멈추자 하옵니다.",
  "choices": {
   "right": {
    "label": "대신 권한을 줄인다",
    "effects": {
     "nobles": -20,
     "treasury": -20
    },
    "this_run": "대신들이 맡던 일 몇 가지가 세종 곁으로 돌아왔다."
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS05b",
  "gauge": "treasury",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "장인들의 품삯이 밀리다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "품삯을 못 받은 장인들이 공방을 떠나기 시작했사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 창고를 연다",
    "effects": {
     "treasury": 20,
     "nobles": -25
    },
    "this_run": "궁궐 창고의 비단과 그릇이 품삯이 되었다."
   },
   "left": {
    "label": "새 일을 멈춘다",
    "effects": {
     "treasury": 12,
     "army": -15
    },
    "this_run": "북쪽 진을 쌓던 일까지 멈췄다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS06b",
  "gauge": "treasury",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "구리를 노리는 손",
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
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS07b",
  "gauge": "army",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "여진 무리가 강을 건너다",
  "who": {
   "name": "북방 군관",
   "doll": "general"
  },
  "line": "무리가 다시 와 더 깊이 들어왔사옵니다. 강가 진이 위태롭사옵니다.",
  "choices": {
   "right": {
    "label": "진과 군사를 챙긴다",
    "effects": {
     "army": 20,
     "treasury": -25
    },
    "this_run": "강가 진에 목책이 한 겹 더 둘러지고 군사가 모였다."
   },
   "left": {
    "label": "강가 마을을 비운다",
    "effects": {
     "army": 12,
     "people": -20
    },
    "this_run": "강가 사람들이 모두 진 안으로 들어왔다."
   }
  },
  "sources": [],
  "fx": {},
  "damage": {
   "targets": [
    "jin"
   ]
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "sejong"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KS08b",
  "gauge": "army",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "북방 장수들이 명을 듣지 않다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "장수들이 서로 군사를 겨루며 진 문을 걸어 잠갔사옵니다.",
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
  "fx": {}
 }
]);
})();
