/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "Y00",
  "kind": "sagwan",
  "stages": [
   "yeongjo"
  ],
  "order": 0,
  "year": "1724",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "전쟁의 상처를 딛고 다시 일어선 조선에서는 모내기법과 장시가 퍼져 살림에 여유가 생긴 백성들도 소설과 노래, 그림을 즐기기 시작했다. 1724년 영조가 왕위에 올랐다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "284",
    "tb": "96"
   },
   {
    "type": "guide",
    "page": "292",
    "tb": "100"
   },
   {
    "type": "guide",
    "page": "282"
   }
  ],
  "sources_text": "지도서 284(교과서 96) 전쟁 피해 극복·교류 재개 · 292(교과서 100) 경제적 여유와 서민 문화 · 282(1724 영조 즉위)",
  "learn": "조선 후기의 시작",
  "fx": {
   "note": "섬에 다시 봄빛. 불탄 경복궁 터는 풀밭으로 남아 있고, 마을이 넓어진다."
  }
 },
 {
  "id": "Y01",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 1,
  "year": "1720년대~",
  "who": {
   "name": "한 붕당의 대신",
   "doll": "party_blue"
  },
  "line": "전하, 이번 벼슬자리는 모두 저희 붕당 사람으로 채우소서. 저쪽 붕당은 믿을 수 없사옵니다.",
  "choice_type": "oppose",
  "choices": {
   "right": {
    "label": "한 붕당만 쓴다",
    "effects": {
     "nobles": 5,
     "people": -10
    },
    "device": {
     "scale": 2
    },
    "this_run": "전하는 한쪽 붕당에만 벼슬을 주려 했지만 → 다른 붕당의 상소가 쏟아졌고 → 결국 고루 뽑는 탕평으로 돌아왔다 → 조정이 한동안 시끄러웠다."
   },
   "left": {
    "label": "고루 뽑는다",
    "effects": {
     "nobles": -5,
     "people": 5
    },
    "device": {
     "scaleToward": 1
    },
    "this_run": "두 붕당 사람이 나란히 벼슬을 받았다."
   }
  },
  "against": "right",
  "grain": "balance",
  "event_type": "normal",
  "real_history": "조선 후기에는 생각이 같은 사람들이 붕당을 만들어 정치에 참여했는데, 다툼이 잦아졌다. 영조는 특정 붕당에 치우치지 않고 인물을 고루 뽑아 쓰는 탕평 정치를 펼쳤다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 붕당과 탕평 정치",
  "learn": "붕당과 탕평 정치",
  "fx": {
   "note": "왕좌 위 저울이 처음 나타나 한쪽으로 기운다."
  }
 },
 {
  "id": "Y02",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 2,
  "year": "1742",
  "who": {
   "name": "성균관 유생",
   "doll": "yusaeng"
  },
  "line": "성균관 앞에 ‘붕당에 치우치지 말라’는 비석을 세우겠사옵니다. 바로 세울까요, 글귀를 더 다듬어 세울까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "바로 세운다",
    "effects": {
     "nobles": 10,
     "treasury": -5
    },
    "device": {
     "scaleToward": 2
    },
    "this_run": "유생들이 새 비석 앞에서 글귀를 소리 내어 읽었다.",
    "build": [
     "tangpyeong"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "글귀 다듬어 세운다",
    "effects": {
     "treasury": 5,
     "nobles": 5,
     "people": -5
    },
    "device": {
     "scaleToward": 1
    },
    "this_run": "글귀를 고치느라 비석 자리에 한동안 천막이 쳐져 있었다.",
    "build": [
     "tangpyeong"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1742년 영조는 성균관 앞에 탕평비를 세웠다. 묵·고기·나물을 섞은 탕평채가 이 무렵 신하들과 먹은 음식에서 이름이 왔다는 이야기가 전해지지만, 확실한 기록은 없다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   },
   {
    "type": "web",
    "title": "탕평채 유래가 불확실함: 한국민족문화대백과사전 '탕평채'",
    "url": "https://encykorea.aks.ac.kr/Article/E0058859"
   },
   {
    "type": "web",
    "title": "'탕평책'",
    "url": "https://encykorea.aks.ac.kr/Article/E0058860"
   }
  ],
  "sources_text": "지도서 282(교과서 94 연표: 1742 탕평비, 생각 깨우기: 탕평채) / [교과서 밖] 탕평채 유래가 불확실함: 한국민족문화대백과사전 '탕평채' https://encykorea.aks.ac.kr/Article/E0058859 · '탕평책' https://encykorea.aks.ac.kr/Article/E0058860",
  "learn": "탕평비",
  "fx": {
   "build": [
    "tangpyeong"
   ],
   "note": "성균관 앞 다리 위에 비석이 “뽕”. 저울이 가운데로 흔들리며 돌아온다."
  },
  "caution": "교과서는 탕평채 이야기를 생각 깨우기로 소개한다. 게임은 ‘전해진다’로만 쓴다."
 },
 {
  "id": "Y03",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 3,
  "year": "1750",
  "who": {
   "name": "호조 판서",
   "doll": "official_blue"
  },
  "line": "군포를 2필에서 1필로 줄이려 하옵니다. 단번에 줄일까요, 모자랄 세금부터 정하고 줄일까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "단번에 줄인다",
    "effects": {
     "people": 15,
     "treasury": -15
    },
    "this_run": "농민들 사이에 웃음이 돌았지만 곳간이 텅 비었다."
   },
   "left": {
    "label": "빈자리부터 채운다",
    "effects": {
     "treasury": 5,
     "people": 5,
     "nobles": -10
    },
    "this_run": "새 세금을 먼저 정하느라 땅 주인들이 들고일어났다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1750년 영조는 균역법으로 군포를 2필에서 1필로 줄였다. 모자란 돈은 땅 주인에게 걷는 결작과 바다·소금 세금 등으로 채웠다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '균역법'",
    "url": "https://encykorea.aks.ac.kr/Article/E0007303"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '균역법' https://encykorea.aks.ac.kr/Article/E0007303",
  "learn": "백성의 부담을 줄인 균역법",
  "fx": {
   "note": "마을 베틀 소리가 한결 가벼워지고, 집집마다 연기가 오른다."
  }
 },
 {
  "id": "Y04",
  "kind": "sagwan",
  "stages": [
   "yeongjo"
  ],
  "order": 4,
  "year": "1762",
  "who": {
   "name": "",
   "doll": "sagwan"
  },
  "line": "1762년, 사도 세자가 아버지 영조와의 갈등 끝에 세상을 떠났다(까닭은 학자마다 설명이 다르다). 세자의 아들이 1776년 왕위에 오르니, 그가 정조다.",
  "single": "기록을 넘긴다",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '임오화변'",
    "url": "https://encykorea.aks.ac.kr/Article/E0076535"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '임오화변' https://encykorea.aks.ac.kr/Article/E0076535",
  "learn": "정조가 왕이 되기까지",
  "fx": {
   "dusk": true,
   "note": "화면이 잠시 수묵으로 가라앉았다가 아침 해와 함께 새 왕 인형(정조)이 선다. 장면은 그리지 않는다."
  },
  "caution": "선택 없는 사관 카드(버튼 하나: ‘기록을 넘긴다’). 게이지 변화 없음. 수위(담임 결정): ‘뒤주’ 같은 말 없이 ‘갈등 끝에 세상을 떠났다’만."
 },
 {
  "id": "Y05",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 5,
  "year": "1776",
  "who": {
   "name": "젊은 학자",
   "doll": "official_green"
  },
  "line": "뛰어난 학자들이 책을 모으고 정책을 연구할 곳을 세우겠사옵니다. 크게 세울까요, 작게 시작할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 세운다",
    "effects": {
     "nobles": 5,
     "people": 5,
     "treasury": -10
    },
    "device": {
     "scaleToward": 1
    },
    "this_run": "궁궐 숲속 누각에 책이 가득 쌓였다.",
    "build": [
     "gyujang"
    ],
    "build_state": "smooth"
   },
   "left": {
    "label": "작게 시작한다",
    "effects": {
     "treasury": 5,
     "nobles": -5
    },
    "this_run": "학자 몇이 좁은 방에서 책을 펼쳤다.",
    "build": [
     "gyujang"
    ],
    "build_state": "late"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "정조는 유능한 학자들을 뽑아 학문과 정책을 연구하게 했다. 그 중심이 된 곳이 1776년 창덕궁 안에 세운 규장각이다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   },
   {
    "type": "web",
    "title": "규장각: 한국민족문화대백과사전",
    "url": "https://encykorea.aks.ac.kr/Article/E0007273"
   }
  ],
  "sources_text": "지도서 282(교과서 94) 정조가 유능한 학자를 선발해 연구하게 함 / [교과서 밖] 규장각: 한국민족문화대백과사전 https://encykorea.aks.ac.kr/Article/E0007273",
  "learn": "정조의 개혁 정치",
  "fx": {
   "build": [
    "gyujang"
   ],
   "note": "궁궐 숲속에 2층 누각(규장각)이 “뽕”, 창마다 책장이 보인다."
  }
 },
 {
  "id": "Y06",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 6,
  "year": "1779",
  "who": {
   "name": "규장각 관리",
   "doll": "official_green"
  },
  "line": "서얼 출신이지만 학문이 뛰어난 이들을 규장각 일에 쓰려 하옵니다. 처음부터 크게 맡길까요, 궁궐 밖 관청(외각)부터 둘까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 맡긴다",
    "effects": {
     "people": 10,
     "nobles": -15
    },
    "this_run": "서얼 출신 학자들이 궁궐 안 누각에 들어서자 양반들이 술렁였다."
   },
   "left": {
    "label": "외각부터 둔다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "네 학자는 궁궐 밖 관청에서 먼저 일을 시작했다."
   }
  },
  "grain": "balance",
  "event_type": "normal",
  "real_history": "1779년 정조는 서얼 출신 이덕무·유득공·박제가·서이수를 검서관으로 뽑았다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '검서관'",
    "url": "https://encykorea.aks.ac.kr/Article/E0002076"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '검서관' https://encykorea.aks.ac.kr/Article/E0002076",
  "learn": "신분 차별을 줄이려는 노력",
  "fx": {
   "note": "규장각 창가에 등불 넷이 켜진다."
  }
 },
 {
  "id": "Y07",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 7,
  "year": "1791",
  "who": {
   "name": "좌의정 채제공",
   "doll": "official_blue"
  },
  "line": "시전 상인의 특권을 거두어 누구나 장사하게 하려 하옵니다. 육의전만 남기고 한꺼번에 풀까요, 천천히 풀까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "육의전만 남긴다",
    "effects": {
     "people": 10,
     "treasury": 5,
     "nobles": -10
    },
    "this_run": "골목마다 좌판이 늘었다.",
    "build": [
     "jwapan"
    ]
   },
   "left": {
    "label": "천천히 풀어 준다",
    "effects": {
     "people": 5,
     "nobles": -5
    },
    "this_run": "좌판이 하나둘 조심스레 늘었다.",
    "build": [
     "jwapan"
    ]
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1791년 정조는 육의전을 뺀 시전 상인의 특권(다른 상인의 장사를 막는 권리)을 없애 더 많은 사람이 장사할 수 있게 했다(신해통공).",
  "out_of_textbook": true,
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
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '신해통공' https://encykorea.aks.ac.kr/Article/E0033551 / 상업 발달: 지도서 283(교과서 95)",
  "learn": "조선 후기 상업의 발달",
  "fx": {
   "build": [
    "jwapan"
   ],
   "note": "한양 큰길가에 천막 좌판이 “뽕뽕뽕” 늘어나고 사람 인형이 붐빈다."
  }
 },
 {
  "id": "Y08",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 8,
  "year": "1794~1796",
  "who": {
   "name": "정약용",
   "doll": "jeongyakyong"
  },
  "line": "거중기를 쓰고 일한 백성에게 품삯을 주겠사옵니다. 빨리 쌓을까요, 돌을 골라 튼튼히 쌓을까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "빨리 쌓는다",
    "effects": {
     "army": 10,
     "people": -5,
     "treasury": -10
    },
    "this_run": "거중기를 밤낮 돌려 성벽이 빨리 올랐지만 일꾼들이 지쳤다.",
    "build": [
     "hwaseong",
     "geojunggi"
    ],
    "build_state": "forced"
   },
   "left": {
    "label": "튼튼히 쌓는다",
    "effects": {
     "people": 10,
     "army": 5,
     "treasury": -15
    },
    "this_run": "돌 하나하나를 고르며 쌓아 품삯이 더 들었다.",
    "build": [
     "hwaseong",
     "geojunggi"
    ],
    "build_state": "smooth"
   }
  },
  "grain": "complex",
  "event_type": "normal",
  "real_history": "1794년부터 1796년까지 수원 화성을 쌓았다. 정약용이 고안한 거중기와 녹로 같은 새 기구가 쓰였고, 공사에 나온 백성은 품삯을 받았다.",
  "out_of_textbook": false,
  "sources": [
   {
    "type": "guide",
    "page": "282",
    "tb": "94"
   },
   {
    "type": "guide",
    "page": "288"
   },
   {
    "type": "web",
    "title": "정약용 고안: 우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300890&code=kc_age_30"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '거중기'",
    "url": "https://encykorea.aks.ac.kr/Article/E0001891"
   }
  ],
  "sources_text": "지도서 282(교과서 94, 참고 자료: 거중기·녹로·품삯) · 288(거중기·녹로·서북공심돈) / [교과서 밖] 공사 기간·정약용 고안: 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300890&code=kc_age_30 · 한국민족문화대백과사전 '거중기' https://encykorea.aks.ac.kr/Article/E0001891",
  "learn": "수원 화성과 과학 기술",
  "fx": {
   "build": [
    "hwaseong",
    "geojunggi"
   ],
   "note": "섬 남쪽 언덕에 화성 성벽이 고리처럼 이어지고 장안문·서북공심돈이 “뽕”. 거중기가 도르래로 돌을 들어 올린다."
  }
 },
 {
  "id": "Y09",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 9,
  "year": "1795",
  "who": {
   "name": "행차를 준비하는 신하",
   "doll": "official_blue"
  },
  "line": "어머님 회갑을 맞아 화성에 가시려면 한강에 배다리를 놓아야 하옵니다. 행렬을 크게 할까요, 줄일까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "크게 행차한다",
    "effects": {
     "nobles": 10,
     "people": 5,
     "treasury": -15
    },
    "this_run": "배 수십 척이 한 줄로 이어져 강 위에 길이 생겼다.",
    "build": [
     "baedari"
    ]
   },
   "left": {
    "label": "행렬을 줄인다",
    "effects": {
     "treasury": 10,
     "nobles": -10
    },
    "this_run": "행렬은 짧아졌지만, 대신들은 체면이 섰다 아니다 말이 많았다.",
    "build": [
     "baedari"
    ]
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "1795년 정조는 어머니 혜경궁 홍씨를 모시고 화성에 다녀왔다. 노량진 한강에는 배를 이은 배다리를 놓았고, 그 모습을 《원행을묘정리의궤》에 그림으로 남겼다.",
  "out_of_textbook": true,
  "sources": [
   {
    "type": "guide",
    "page": "295"
   },
   {
    "type": "web",
    "title": "한국민족문화대백과사전 '원행을묘정리의궤'",
    "url": "https://encykorea.aks.ac.kr/Article/E0040890"
   },
   {
    "type": "web",
    "title": "'배다리'",
    "url": "https://encykorea.aks.ac.kr/Article/E0071928"
   }
  ],
  "sources_text": "[교과서 밖] 한국민족문화대백과사전 '원행을묘정리의궤' https://encykorea.aks.ac.kr/Article/E0040890 · '배다리' https://encykorea.aks.ac.kr/Article/E0071928 / 의궤 이름: 지도서 295",
  "learn": "정조의 화성 행차",
  "fx": {
   "build": [
    "baedari"
   ],
   "note": "한강 위로 배들이 하나씩 이어져 다리가 되고, 깃발 행렬이 건너간다."
  }
 },
 {
  "id": "Y10",
  "kind": "history",
  "stages": [
   "yeongjo"
  ],
  "order": 10,
  "year": "1795~1797",
  "who": {
   "name": "제주 목사",
   "doll": "official_blue"
  },
  "line": "흉년에 쌀을 내놓은 상인 김만덕이 한양과 금강산 구경을 원하옵니다. 나라에서 길을 돌봐 줄까요, 스스로 오게 할까요?",
  "choice_type": "how",
  "choices": {
   "right": {
    "label": "길을 돌봐 준다",
    "effects": {
     "people": 10,
     "treasury": -10
    },
    "this_run": "김만덕은 배에 올라 처음으로 섬 밖 바다를 건넜다."
   },
   "left": {
    "label": "스스로 오게 한다",
    "effects": {
     "treasury": 5,
     "nobles": 5,
     "people": -5
    },
    "this_run": "김만덕은 제 돈으로 배와 길을 마련했다."
   }
  },
  "grain": "seed",
  "event_type": "normal",
  "real_history": "김만덕은 제주 여성은 섬 밖에 나갈 수 없던 때에 왕의 허락을 받아 한양(1796)과 금강산(1797)을 여행했다.",
  "out_of_textbook": false,
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
  "sources_text": "지도서 286~287(교과서 99) 김만덕 / [교과서 밖] 연도: 한국민족문화대백과사전 '김만덕' https://encykorea.aks.ac.kr/Contents/Item/E0076304",
  "learn": "조선 후기 여성 상인 김만덕",
  "fx": {
   "scene": "ship",
   "note": "섬 바닷가에 쌀 배가 닿고, 마을 굴뚝에서 다시 밥 짓는 연기가 오른다."
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY01",
  "gauge": "people",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_green"
  },
  "line": "장날인데도 장터가 한산하옵니다. 고을에서 올라오는 상소가 쌓이고 있사옵니다.",
  "conditions_text": "백성 경고(낮음)",
  "choices": {
   "right": {
    "label": "세금을 덜어 준다",
    "effects": {
     "people": 15,
     "treasury": -10,
     "army": -5
    },
    "this_run": "장터 세금 장부에 붉은 줄이 그어졌다."
   },
   "left": {
    "label": "상소를 읽는다",
    "effects": {
     "people": 8,
     "nobles": -5
    },
    "this_run": "쌓인 상소가 하나씩 펼쳐졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY02",
  "gauge": "people",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "시전과 관청 일꾼들이 백성 눈치만 보며 일을 미루고 있사옵니다.",
  "conditions_text": "백성 경고(높음)",
  "choices": {
   "right": {
    "label": "관청을 다잡는다",
    "effects": {
     "people": -10,
     "treasury": 10,
     "nobles": 5
    },
    "this_run": "미뤄 둔 장부가 다시 펼쳐졌다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY03",
  "gauge": "nobles",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "벼슬을 얻지 못한 양반들이 모여 한숨만 쉰다 하옵니다.",
  "conditions_text": "양반 경고(낮음)",
  "choices": {
   "right": {
    "label": "과거를 더 연다",
    "effects": {
     "nobles": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "과거 날짜가 방에 붙자 선비들이 짐을 꾸렸다."
   },
   "left": {
    "label": "선비들을 불러 듣는다",
    "effects": {
     "nobles": 8,
     "people": -5
    },
    "this_run": "선비들이 하고 싶던 말을 쏟아 냈다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY04",
  "gauge": "nobles",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 전하께 아뢰기 전에 자기들끼리 일을 정한다는 소문이옵니다.",
  "conditions_text": "양반 경고(높음)",
  "choices": {
   "right": {
    "label": "직접 회의를 연다",
    "effects": {
     "nobles": -15,
     "people": 5,
     "army": 5
    },
    "this_run": "전하가 회의 자리 한가운데 앉았다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY05",
  "gauge": "treasury",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "엽전이 모자라 장터에서 물건값을 치르기 어렵다 하옵니다.",
  "conditions_text": "국고 경고(낮음)",
  "choices": {
   "right": {
    "label": "잔치를 줄인다",
    "effects": {
     "treasury": 15,
     "nobles": -5,
     "people": -5
    },
    "this_run": "궁궐 잔치가 조촐해지고 그 돈이 곳간에 남았다."
   },
   "left": {
    "label": "공사를 미룬다",
    "effects": {
     "treasury": 8,
     "army": -5
    },
    "this_run": "성벽 고치는 일이 한 철 미뤄졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY06",
  "gauge": "treasury",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "곳간에 엽전이 쌓여 녹이 슨다는 말이 나오옵니다.",
  "conditions_text": "국고 경고(높음)",
  "choices": {
   "right": {
    "label": "곡식을 사서 푼다",
    "effects": {
     "treasury": -15,
     "people": 15
    },
    "this_run": "엽전이 곡식이 되어 고을마다 나뉘었다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY07",
  "gauge": "army",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "병조 관리",
   "doll": "official_blue"
  },
  "line": "도성 성벽 군데군데가 낡고, 군영 군사들이 흩어지고 있사옵니다.",
  "conditions_text": "국방 경고(낮음)",
  "choices": {
   "right": {
    "label": "군영을 다시 모은다",
    "effects": {
     "army": 15,
     "treasury": -10,
     "people": -5
    },
    "this_run": "군영 깃발 아래 군사들이 다시 줄을 섰다."
   },
   "left": {
    "label": "성벽만 고친다",
    "effects": {
     "army": 8,
     "treasury": -5
    },
    "this_run": "무너진 성벽 몇 곳이 메워졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY08",
  "gauge": "army",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "병조 관리",
   "doll": "official_blue"
  },
  "line": "군영 장수들이 거느린 군사가 늘었다는 말이 돌고 있사옵니다.",
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY09",
  "gauge": "faction",
  "side": "low",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "붉은 깃발 대신들만 조정에 남고, 푸른 깃발 대신들이 하나둘 집으로 돌아가고 있사옵니다.",
  "conditions_text": "붕당 저울 경고(붉은 쪽)",
  "choices": {
   "right": {
    "label": "푸른 쪽도 부른다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "푸른 깃발 대신 몇이 다시 조정에 나왔다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "글을 내려 달랜다",
    "effects": {
     "people": -5
    },
    "this_run": "달래는 글이 푸른 깃발 대신들 집으로 보내졌다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "NY10",
  "gauge": "faction",
  "side": "high",
  "level": "warn",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "푸른 깃발 대신들 목소리만 커지고, 붉은 깃발 대신들은 말을 아끼고 있사옵니다.",
  "conditions_text": "붕당 저울 경고(푸른 쪽)",
  "choices": {
   "right": {
    "label": "붉은 쪽도 부른다",
    "effects": {
     "nobles": -5,
     "treasury": -5
    },
    "this_run": "붉은 깃발 대신 몇이 다시 말문을 열었다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "글을 내려 달랜다",
    "effects": {
     "people": -5
    },
    "this_run": "달래는 글이 붉은 깃발 대신들 집으로 보내졌다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY01",
  "gauge": "people",
  "side": "low",
  "level": "event",
  "name": "장터가 텅 비다",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_green"
  },
  "line": "장날마다 장터가 비고, 고을마다 살기 어렵다는 상소가 산처럼 쌓였사옵니다.",
  "choices": {
   "right": {
    "label": "창고를 열어 나눈다",
    "effects": {
     "people": 20,
     "treasury": -20
    },
    "this_run": "관아 창고의 쌀이 장터로 나오자, 사람들이 하나둘 다시 모였다."
   },
   "left": {
    "label": "수령을 바꾼다",
    "effects": {
     "people": 12,
     "nobles": -10
    },
    "this_run": "새 수령이 내려왔지만 장터가 살아나는 데는 시간이 걸렸다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY02",
  "gauge": "people",
  "side": "high",
  "level": "event",
  "name": "시전과 관청이 손을 놓다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "관리와 시전 상인들이 ‘백성 눈치에 아무것도 못 한다’며 장부를 덮었사옵니다.",
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY03",
  "gauge": "nobles",
  "side": "low",
  "level": "event",
  "name": "벼슬 잃은 양반들의 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "벼슬을 얻지 못한 양반들이 밤마다 한 집에 모인다 하옵니다. 조정을 흔들 꾀를 낸다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "벼슬과 상을 내린다",
    "effects": {
     "nobles": 20,
     "treasury": -20
    },
    "this_run": "벼슬을 받은 양반들이 모임을 그만두었다."
   },
   "left": {
    "label": "군사로 막는다",
    "effects": {
     "nobles": 12,
     "army": -15
    },
    "this_run": "모임 집 앞에 군사가 서자 모의는 흩어졌지만, 양반들의 눈빛은 차가웠다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY04",
  "gauge": "nobles",
  "side": "high",
  "level": "event",
  "name": "왕명이 되돌아오다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 의논을 마쳤다며 전하의 명을 되돌려 보냈사옵니다.",
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
    "this_run": "대신들을 하나씩 불러 이야기했다. 그사이 백성의 일은 늦어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY05",
  "gauge": "treasury",
  "side": "low",
  "level": "event",
  "name": "엽전이 모자라 장사가 멈추다",
  "who": {
   "name": "호조 관리",
   "doll": "official_blue"
  },
  "line": "곳간이 비고 엽전이 모자라 관리 녹봉도, 장터 장사도 멈췄사옵니다.",
  "choices": {
   "right": {
    "label": "궁궐 살림을 줄인다",
    "effects": {
     "treasury": 20,
     "nobles": -20
    },
    "this_run": "궁궐 잔치와 수라상이 줄고, 그 돈이 녹봉이 되었다. 대신들은 체면이 깎였다며 투덜댔다."
   },
   "left": {
    "label": "세금을 더 걷는다",
    "effects": {
     "treasury": 12,
     "people": -15
    },
    "this_run": "곳간은 조금 찼지만 장터마다 한숨이 늘었다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY06",
  "gauge": "treasury",
  "side": "high",
  "level": "event",
  "name": "곳간을 노리는 손",
  "who": {
   "name": "곳간지기",
   "doll": "farmer"
  },
  "line": "넘치는 곳간에서 관리 몇이 엽전을 몰래 빼돌렸다는 소문이옵니다.",
  "choices": {
   "right": {
    "label": "조사해 벌한다",
    "effects": {
     "treasury": -20,
     "nobles": -15
    },
    "this_run": "빼돌린 엽전이 돌아왔고, 관리 몇이 벼슬을 잃었다."
   },
   "left": {
    "label": "곡식을 풀어 버린다",
    "effects": {
     "treasury": -12,
     "army": -5
    },
    "this_run": "곳간이 줄자 다툼도 잦아들었지만, 군영 몫까지 나갔다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY07",
  "gauge": "army",
  "side": "low",
  "level": "event",
  "name": "성벽이 낡고 군영이 흩어지다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "도성 성벽이 곳곳에서 무너지고, 군영 군사들이 떠나 빈 막사가 늘었사옵니다.",
  "choices": {
   "right": {
    "label": "군영을 다시 세운다",
    "effects": {
     "army": 20,
     "treasury": -20
    },
    "this_run": "군영 깃발이 다시 오르고, 성벽 위에 군사들이 섰다."
   },
   "left": {
    "label": "고을 장정을 부른다",
    "effects": {
     "army": 12,
     "people": -15
    },
    "this_run": "고을 장정들이 성벽 일을 거들었다. 그해 농사가 늦어졌다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY08",
  "gauge": "army",
  "side": "high",
  "level": "event",
  "name": "군영 장수들이 세력을 키우다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "군영 장수 몇이 거느린 군사를 늘리고는 조정의 명을 가볍게 여기옵니다.",
  "choices": {
   "right": {
    "label": "군권을 거둔다",
    "effects": {
     "army": -20,
     "nobles": -15
    },
    "this_run": "장수들이 거느린 군사 일부가 조정 군영으로 돌아왔다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY09",
  "gauge": "faction",
  "side": "low",
  "level": "event",
  "name": "푸른 깃발 대신들이 조정을 떠나려 하다",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "붉은 깃발 대신들만 벼슬을 받자, 푸른 깃발 대신들이 모두 조정을 떠나겠다며 한곳에 모였사옵니다.",
  "choices": {
   "right": {
    "label": "두 쪽을 함께 쓴다",
    "effects": {
     "nobles": -10,
     "treasury": -10
    },
    "this_run": "두 붕당에서 한 사람씩 뽑아 같은 일을 맡겼다. 자리를 늘리느라 곳간이 줄었다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "떠나는 이를 붙잡는다",
    "effects": {
     "people": -10
    },
    "this_run": "떠나려던 대신 몇이 붙잡혀 돌아왔지만, 나머지는 끝내 짐을 쌌다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {},
  "similar": {
   "text": "조선 후기에는 생각이 같은 사람들이 붕당을 만들어 정치에 참여했는데, 붕당 사이 다툼이 잦아졌다.",
   "sources_text": "지도서 282(교과서 94)",
   "sources": [
    {
     "type": "guide",
     "page": "282",
     "tb": "94"
    }
   ],
   "out_of_textbook": false
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY10",
  "gauge": "faction",
  "side": "high",
  "level": "event",
  "name": "푸른 깃발 대신들이 왕명을 되돌리다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "푸른 깃발 대신들이 조정을 차지하고는, 저쪽 붕당을 돕는 전하의 명을 모두 되돌려 보냈사옵니다.",
  "choices": {
   "right": {
    "label": "두 쪽을 함께 쓴다",
    "effects": {
     "nobles": -10,
     "treasury": -10
    },
    "this_run": "붉은 깃발 대신들도 다시 벼슬을 받았다. 푸른 깃발 대신들이 얼굴을 찌푸렸다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "명을 다시 내린다",
    "effects": {
     "nobles": -10
    },
    "this_run": "같은 명이 두 번, 세 번 내려가서야 겨우 받아들여졌다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {},
  "similar": {
   "text": "조선 후기에는 생각이 같은 사람들이 붕당을 만들어 정치에 참여했는데, 붕당 사이 다툼이 잦아졌다.",
   "sources_text": "지도서 282(교과서 94)",
   "sources": [
    {
     "type": "guide",
     "page": "282",
     "tb": "94"
    }
   ],
   "out_of_textbook": false
  }
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY01b",
  "gauge": "people",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "장터가 텅 비다",
  "who": {
   "name": "장시를 돌아본 관리",
   "doll": "official_green"
  },
  "line": "텅 빈 장터 소문이 이웃 고을까지 번졌사옵니다.",
  "choices": {
   "right": {
    "label": "수령을 바꾸고 푼다",
    "effects": {
     "people": 20,
     "treasury": -25
    },
    "this_run": "새 수령이 창고를 열자 장터에 다시 사람이 모였다."
   },
   "left": {
    "label": "장날을 늘린다",
    "effects": {
     "people": 12,
     "army": -15
    },
    "this_run": "장날을 늘렸지만, 장터를 지킬 군사가 모자랐다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY02b",
  "gauge": "people",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "시전과 관청이 손을 놓다",
  "who": {
   "name": "호조 판서",
   "doll": "official_red"
  },
  "line": "관청 문이 고을마다 닫혀 나라 살림이 멈추옵니다.",
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY03b",
  "gauge": "nobles",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "벼슬 잃은 양반들의 모의",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "모인 양반들이 상소를 모아 조정을 흔들려 하옵니다.",
  "choices": {
   "right": {
    "label": "벼슬을 돌려준다",
    "effects": {
     "nobles": 20,
     "treasury": -25
    },
    "this_run": "벼슬을 되찾은 양반들이 모의를 그만두었다."
   },
   "left": {
    "label": "모임을 흩는다",
    "effects": {
     "nobles": 12,
     "army": -20
    },
    "this_run": "군사들이 모임 집을 둘러쌌고, 양반들은 흩어졌다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY04b",
  "gauge": "nobles",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "왕명이 되돌아오다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "대신들이 상소를 모아 전하의 결정을 모두 미루자 하옵니다.",
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY05b",
  "gauge": "treasury",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "엽전이 모자라 장사가 멈추다",
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
    "label": "공사를 멈춘다",
    "effects": {
     "treasury": 12,
     "army": -15
    },
    "this_run": "성벽 고치는 일까지 멈췄다."
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY06b",
  "gauge": "treasury",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "곳간을 노리는 손",
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY07b",
  "gauge": "army",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "성벽이 낡고 군영이 흩어지다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "군영이 비어 도성 문을 지킬 군사조차 모자라옵니다.",
  "choices": {
   "right": {
    "label": "군영과 성을 챙긴다",
    "effects": {
     "army": 20,
     "treasury": -25
    },
    "this_run": "성벽에 돌이 더해지고 군사가 모였다."
   },
   "left": {
    "label": "장정을 더 부른다",
    "effects": {
     "army": 12,
     "people": -20
    },
    "this_run": "고을 장정들이 모두 성으로 불려 왔다."
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
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY08b",
  "gauge": "army",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "군영 장수들이 세력을 키우다",
  "who": {
   "name": "병조 판서",
   "doll": "official_red"
  },
  "line": "장수들이 서로 군사를 겨루며 군영 문을 걸어 잠갔사옵니다.",
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
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY09b",
  "gauge": "faction",
  "side": "low",
  "level": "followup",
  "step": 2,
  "name": "푸른 깃발 대신들이 조정을 떠나려 하다",
  "who": {
   "name": "승지",
   "doll": "official_red"
  },
  "line": "푸른 깃발 대신들이 정말로 짐을 싸서 도성을 떠나고 있사옵니다.",
  "choices": {
   "right": {
    "label": "직접 찾아가 붙든다",
    "effects": {
     "nobles": -10,
     "treasury": -15
    },
    "this_run": "보낸 편지와 선물에 대신들이 짐을 풀었다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "빈자리를 채운다",
    "effects": {
     "people": -10
    },
    "this_run": "새 사람을 뽑느라 한동안 조정 일이 비었다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {}
 },
 {
  "kind": "crisis",
  "stages": [
   "yeongjo"
  ],
  "game_event": true,
  "out_of_textbook": false,
  "choice_type": "free",
  "strong": "right",
  "id": "KY10b",
  "gauge": "faction",
  "side": "high",
  "level": "followup",
  "step": 2,
  "name": "푸른 깃발 대신들이 왕명을 되돌리다",
  "who": {
   "name": "내관",
   "doll": "naegwan"
  },
  "line": "푸른 깃발 대신들이 다른 쪽 사람은 아무도 벼슬에 오르지 못하게 막고 있사옵니다.",
  "choices": {
   "right": {
    "label": "고루 뽑으라 명한다",
    "effects": {
     "nobles": -15,
     "treasury": -10
    },
    "this_run": "두 붕당에서 고루 뽑으라는 명이 내려갔다. 대신들이 마지못해 따랐다.",
    "device": {
     "scaleToward": 2
    }
   },
   "left": {
    "label": "한 자리씩 나눈다",
    "effects": {
     "nobles": -10
    },
    "this_run": "자리 몇 개만 붉은 깃발 대신들에게 돌아갔다.",
    "device": {
     "scaleToward": 1
    }
   }
  },
  "sources": [],
  "fx": {}
 }
]);
})();
