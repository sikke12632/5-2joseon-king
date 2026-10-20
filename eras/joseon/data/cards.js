/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...[
 {
  "id": "T00",
  "stage": "taejo",
  "type": "scroll",
  "order": 0,
  "year": "고려 말",
  "text": "고려 말, 일부 세력이 많은 땅을 차지하고 노비를 크게 늘려 나라 살림이 나빠졌다. 홍건적과 왜구를 물리치며 이름을 떨친 장수가 있었으니, 이성계다.",
  "single": "기록을 넘긴다",
  "sourceText": "지도서 232(교과서 74 그림: 고려 말 상황과 건국 과정)",
  "source": [
   {
    "book": "지도서",
    "page": "232",
    "tb": "74"
   }
  ],
  "learn": "고려 말의 혼란과 이성계의 성장",
  "direction": "수묵 번짐 하늘에서 빈 섬이 구름을 뚫고 떠오른다. 섬 위에는 초가 몇 채뿐.",
  "fx": {
   "prebuilt": true
  },
  "who": "sagwan"
 },
 {
  "id": "T01",
  "stage": "taejo",
  "type": "history",
  "order": 1,
  "year": "1392 봄",
  "outside": true,
  "whoName": "이방원",
  "text": "아버님, 정몽주 대감이 새 나라를 끝까지 반대하옵니다. 한 번 더 설득해 보시겠습니까?",
  "choice": "oppose",
  "right": {
   "label": "찾아가 설득한다",
   "fx": {
    "nobles": 10,
    "army": -5
   },
   "result": "전하는 정몽주를 찾아가 마음을 물었지만 → 정몽주는 고려를 향한 뜻을 굽히지 않았고 → 이방원 쪽 사람들이 먼저 움직였다 → 전하의 마음이 무거워졌다."
  },
  "left": {
   "label": "설득을 멈춘다",
   "fx": {
    "army": 10,
    "nobles": -15
   },
   "result": "전하가 설득을 멈추자 → 고려를 따르던 신하들이 등을 돌렸고 → 이방원 쪽이 일을 서둘렀다 → 조정에 차가운 바람이 불었다."
  },
  "record": "정몽주는 끝내 뜻을 굽히지 않았고, 1392년 이방원 쪽 사람들에 의해 세상을 떠났다. 두 사람이 시조(하여가·단심가)를 주고받았다는 이야기와 그 장소가 선죽교라는 이야기는 뒷날 전해진 것이다.",
  "sourceText": "[교과서 밖] 한국민족문화대백과사전 '정몽주' https://encykorea.aks.ac.kr/Article/E0050190 · 우리역사넷 https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code=",
  "source": [
   {
    "site": "한국민족문화대백과사전 '정몽주",
    "url": "https://encykorea.aks.ac.kr/Article/E0050190"
   },
   {
    "site": "우리역사넷",
    "url": "https://contents.history.go.kr/mobile/eh/view.do?levelId=eh_n0375_0010&code="
   }
  ],
  "learn": "건국 과정에는 고려를 지키려던 사람과의 갈등도 있었다",
  "direction": "저녁 하늘. 섬 끝에 걸린 고려 깃발이 천천히 내려간다(사람·장면은 그리지 않음).",
  "who": "bangwon"
 },
 {
  "id": "T02",
  "stage": "taejo",
  "type": "history",
  "order": 2,
  "year": "1392",
  "text": "새 나라는 유교의 가르침으로 다스려야 하옵니다. 한꺼번에 바꿀까요, 천천히 바꿀까요?",
  "choice": "how",
  "right": {
   "label": "한꺼번에 바꾼다",
   "fx": {
    "nobles": 15,
    "people": -10
   },
   "result": "절의 땅과 노비가 한꺼번에 줄자, 절에 다니던 백성들이 서운해했다."
  },
  "left": {
   "label": "천천히 바꾼다",
   "fx": {
    "nobles": -10,
    "people": 5
   },
   "result": "옛 풍습을 한동안 두었더니, 새 나라를 세운 신하들이 답답해했다."
  },
  "record": "조선은 유교 사상을 나라를 다스리는 기본 원리로 삼았다.",
  "sourceText": "지도서 232(교과서 74) 유교 사상을 기본 원리로 삼음 · 228 고려 때 컸던 불교의 비중이 줄어듦 / 인물 정도전: 지도서 238",
  "source": [
   {
    "book": "지도서",
    "page": "232",
    "tb": "74"
   },
   {
    "book": "지도서",
    "page": "238"
   },
   {
    "book": "지도서",
    "page": "228"
   }
  ],
  "learn": "조선 건국과 유교 통치 원리",
  "direction": "섬 한가운데 붉은 왕기가 꽂히고, 왕 인형이 익선관을 쓴다. 하늘이 새벽빛으로 밝아진다.",
  "fx": {
   "flag": true
  },
  "who": "jeong"
 },
 {
  "id": "T03",
  "stage": "taejo",
  "type": "history",
  "order": 3,
  "year": "1392~1393",
  "outside": true,
  "whoName": "외교 문서를 맡은 신하",
  "text": "명에 새 나라 이름 후보로 ‘조선’과 ‘화령’을 적어 보내려 하옵니다. 사신을 서둘러 보낼까요, 예물을 갖춰 보낼까요?",
  "choice": "how",
  "right": {
   "label": "서둘러 보낸다",
   "fx": {
    "treasury": 5,
    "army": 5,
    "nobles": -5
   },
   "result": "사신이 서둘러 떠나느라 예물이 조금 모자랐다."
  },
  "left": {
   "label": "예물 갖춰 보낸다",
   "fx": {
    "army": 10,
    "treasury": -10
   },
   "result": "예물을 넉넉히 갖추느라 곳간이 가벼워졌다."
  },
  "record": "1392년 11월 두 이름을 적어 보냈고, 명은 ‘조선’이 오래되고 아름다운 이름이라며 골랐다. 1393년 2월 나라 이름이 조선으로 정해졌다. (조선 안에서 이미 ‘조선’으로 마음을 정해 두었다고 보는 견해도 있다.)",
  "sourceText": "[교과서 밖] 조선왕조실록 태조 1년 11월 29일 https://sillok.history.go.kr/id/kaa_10111029_001 · 태조 2년 2월 15일 https://sillok.history.go.kr/id/kaa_10202015_001",
  "source": [
   {
    "site": "조선왕조실록 태조 1년 11월 29일",
    "url": "https://sillok.history.go.kr/id/kaa_10111029_001"
   },
   {
    "site": "태조 2년 2월 15일",
    "url": "https://sillok.history.go.kr/id/kaa_10202015_001"
   }
  ],
  "learn": "나라 이름 ‘조선’이 정해진 과정",
  "direction": "섬 위 하늘에 두루마리가 펼쳐지고 먹으로 ‘조선’ 두 글자가 써진다.",
  "note": "“명이 이름을 지어 줬다”로 읽히지 않게, 결과 문구는 ‘골랐다’로만 쓴다.",
  "fx": {
   "skyText": "조선"
  },
  "who": "official_blue"
 },
 {
  "id": "T04",
  "stage": "taejo",
  "type": "history",
  "order": 4,
  "year": "1394",
  "whoName": "도읍 터를 살핀 신하",
  "text": "개경을 떠나 한양으로 도읍을 옮기옵니다. 서둘러 옮길까요, 차근차근 옮길까요?",
  "choice": "how",
  "right": {
   "label": "서둘러 옮긴다",
   "fx": {
    "army": 10,
    "people": -10,
    "treasury": -5
   },
   "result": "짐 수레가 밤낮없이 길을 메웠고, 백성들이 지쳤다."
  },
  "left": {
   "label": "차근차근 옮긴다",
   "fx": {
    "people": 5,
    "nobles": 5,
    "treasury": -15
   },
   "result": "짐을 나눠 옮기느라 나라 살림이 오래 묶였다."
  },
  "record": "1394년, 조선은 한강이 흐르고 바다가 가까워 물자를 나르기 좋은 한양으로 도읍을 옮겼다.",
  "sourceText": "지도서 233(교과서 75) 한양을 수도로 정한 까닭 · 238 1394년 천도",
  "source": [
   {
    "book": "지도서",
    "page": "233",
    "tb": "75"
   },
   {
    "book": "지도서",
    "page": "238"
   }
  ],
  "learn": "한양 천도와 그 까닭",
  "direction": "구름이 걷히며 섬 위로 강줄기(한강)가 흘러들고, 작은 짐배들이 오간다.",
  "build": [
   "giwa"
  ],
  "fx": {
   "boats": true
  },
  "who": "official_red"
 },
 {
  "id": "T05",
  "stage": "taejo",
  "type": "history",
  "order": 5,
  "year": "1395",
  "whoName": "궁궐 공사를 맡은 관리",
  "text": "새 궁궐을 짓사옵니다. 위엄 있게 크게 지을까요, 백성의 힘을 아껴 알맞게 지을까요?",
  "choice": "how",
  "right": {
   "label": "크게 짓는다",
   "fx": {
    "nobles": 10,
    "people": -10,
    "treasury": -10
   },
   "result": "장식을 더하느라 일꾼이 늘고 공사장에 한숨이 가득했다.",
   "state": "forced"
  },
  "left": {
   "label": "알맞게 짓는다",
   "fx": {
    "people": 10,
    "nobles": -5
   },
   "result": "궁궐은 단정하게 섰고, 일꾼들은 제때 집으로 돌아갔다.",
   "state": "smooth"
  },
  "record": "1395년 경복궁이 완성되었다. ‘덕으로 나라를 다스려 오래 큰 복을 누리라’는 뜻의 이름은 정도전이 지었다.",
  "sourceText": "지도서 233(교과서 75) 경복궁과 이름 뜻 · 238 / [교과서 밖] 이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일 https://sillok.history.go.kr/id/kaa_10410007_002",
  "source": [
   {
    "book": "지도서",
    "page": "233",
    "tb": "75"
   },
   {
    "book": "지도서",
    "page": "238"
   },
   {
    "site": "이름을 지은 사람: 조선왕조실록 태조 4년 10월 7일",
    "url": "https://sillok.history.go.kr/id/kaa_10410007_002"
   }
  ],
  "learn": "경복궁과 그 이름에 담긴 뜻",
  "direction": "섬 한가운데 경복궁이 “뽕” 솟는다 — 근정전의 휜 지붕선과 단청 포인트. \"알맞게 짓는다\"를 고르면 궁궐 앞 초가 마을에 사람이 더 붐빈다(궁궐 모양은 같음).",
  "build": [
   "gyeongbok"
  ],
  "who": "official_red"
 },
 {
  "id": "T06",
  "stage": "taejo",
  "type": "history",
  "order": 6,
  "year": "1395",
  "whoName": "예법을 맡은 신하",
  "text": "궁궐 동쪽에 종묘, 서쪽에 사직단을 지어야 하옵니다. 모내기철이라도 서둘러 지을까요, 농사철 뒤에 지을까요?",
  "choice": "how",
  "right": {
   "label": "서둘러 짓는다",
   "fx": {
    "nobles": 10,
    "people": -10,
    "treasury": -5
   },
   "result": "제사는 일찍 올렸지만, 모내기철 들판에 일손이 모자랐다.",
   "state": "forced"
  },
  "left": {
   "label": "농사철 뒤에 짓는다",
   "fx": {
    "people": 5,
    "nobles": -5,
    "treasury": -5
   },
   "result": "농사가 끝난 뒤 지어 원망은 적었지만, 대신들은 늦다고 투덜댔다.",
   "state": "late"
  },
  "record": "종묘(경복궁 동쪽)와 사직단(서쪽)은 조선이 유교의 나라임을 보여 주는 곳이 되었다.",
  "sourceText": "지도서 233(교과서 75) 종묘·사직단의 위치와 하는 일 · 231 종묘는 유교 국가를 나타내는 대표 건물",
  "source": [
   {
    "book": "지도서",
    "page": "233",
    "tb": "75"
   },
   {
    "book": "지도서",
    "page": "231"
   }
  ],
  "learn": "종묘와 사직단",
  "direction": "경복궁 동쪽에 지붕이 아주 긴 종묘, 서쪽에 네모난 제단 사직단이 솟는다. 제사 때 흰 연기가 가늘게 오른다.",
  "build": [
   "jongmyo",
   "sajik"
  ],
  "who": "official_green"
 },
 {
  "id": "T07",
  "stage": "taejo",
  "type": "history",
  "order": 7,
  "year": "1396",
  "text": "산줄기를 따라 성을 쌓고 네 큰 문에 어짊·옳음·예의 바름을 새기겠사옵니다. 겨울 농한기에 한꺼번에 쌓을까요, 나눠서 쌓을까요?",
  "choice": "how",
  "right": {
   "label": "농한기에 쌓는다",
   "fx": {
    "army": 15,
    "people": -5,
    "treasury": -5
   },
   "result": "추운 겨울 공사에 일꾼들 손이 텄지만, 성벽은 빨리 올라갔다.",
   "state": "smooth"
  },
  "left": {
   "label": "나눠서 쌓는다",
   "fx": {
    "army": 5,
    "people": 5,
    "treasury": -10
   },
   "result": "공사가 길게 이어져, 한동안 성벽 곳곳에 나무 발판이 남았다.",
   "state": "late"
  },
  "record": "1396년 한양 도성이 쌓였다(첫 공사 약 12만 명, 장마에 무너진 곳을 고친 둘째 공사 약 8만 명). 흥인지문(인)·돈의문(의)·숭례문(예)에 유교 덕목을 담았다.",
  "sourceText": "지도서 233(교과서 75) 성곽·네 큰 문·유교 덕목 · 238 1396년 축조, 도성 터는 정도전이 정함 / [교과서 밖] 동원 인원: 우리역사넷 https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000 · https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30",
  "source": [
   {
    "book": "지도서",
    "page": "233",
    "tb": "75"
   },
   {
    "book": "지도서",
    "page": "238"
   },
   {
    "site": "동원 인원: 우리역사넷",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_30&levelId=kc_r301000"
   },
   {
    "site": "출처",
    "url": "https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_r300855&code=kc_age_30"
   }
  ],
  "learn": "한양 도성과 유교 덕목을 담은 문 이름",
  "direction": "산등성이를 따라 성벽이 한 칸씩 이어지고 동·서·남 큰 문이 차례로 “뽕”. 문이 설 때 현판 위로 仁·義·禮 글자 빛이 잠깐 떠오른다.",
  "build": [
   "wall",
   "heungin",
   "donui",
   "sungnye",
   "sukjeong"
  ],
  "fx": {
   "glyphs": {
    "heungin": "仁",
    "donui": "義",
    "sungnye": "禮"
   }
  },
  "who": "jeong"
 },
 {
  "id": "T08",
  "stage": "taejo",
  "type": "history",
  "order": 8,
  "year": "1390년대",
  "whoName": "젊은 유생 대표",
  "text": "한양에 성균관을 세워 인재를 기르겠사옵니다. 처음부터 크게 세울까요, 작게 시작할까요?",
  "choice": "how",
  "right": {
   "label": "크게 세운다",
   "fx": {
    "nobles": 10,
    "people": 5,
    "treasury": -15
   },
   "result": "기숙사까지 갖춘 성균관에 유생들이 몰려왔다.",
   "state": "smooth"
  },
  "left": {
   "label": "작게 시작한다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "강당 하나로 시작해 유생들이 비좁게 지냈다.",
   "state": "late"
  },
  "record": "태조는 한양에 문묘와 성균관을 세웠다. 성균관은 오늘날의 대학교에 해당하는 최고 교육 기관이다.",
  "sourceText": "지도서 238(태조가 한양에 문묘(성균관) 등을 건설) · 245(교과서 81 성균관은 오늘날 대학교)",
  "source": [
   {
    "book": "지도서",
    "page": "238"
   },
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   }
  ],
  "learn": "성균관과 유교 교육",
  "direction": "도성 북쪽에 강당 명륜당과 기숙사 지붕이 솟고, 유생 인형들이 줄지어 들어간다.",
  "note": "‘태조 때 세움’은 지도서 참고 자료(교과서 본문 밖). 성균관 자체는 교과서 내용.",
  "build": [
   "seonggyun"
  ],
  "who": "yusaeng"
 },
 {
  "id": "T09",
  "stage": "taejo",
  "type": "history",
  "order": 9,
  "year": "1398",
  "outside": true,
  "whoName": "이방원",
  "text": "아버님, 정도전이 왕자들이 거느린 군사를 거두려 하옵니다. 저희 형제를 믿어 주소서.",
  "choice": "oppose",
  "right": {
   "label": "아들을 믿는다",
   "fx": {
    "army": 10,
    "nobles": -10
   },
   "result": "전하는 아들의 말을 믿었고 → 이방원이 군사를 움직였다 → 정도전 세력이 무너졌다 → 개국 공신들이 크게 흔들렸다."
  },
  "left": {
   "label": "정도전을 믿는다",
   "fx": {
    "nobles": 5,
    "army": -20
   },
   "result": "전하는 정도전을 믿었지만 → 이방원이 먼저 군사를 일으켜 → 정도전 세력은 무너졌다 → 궁궐을 지키던 군사들까지 흩어졌다."
  },
  "record": "1398년, 이방원이 군사를 일으켜 정도전 세력을 무너뜨렸다(제1차 왕자의 난). 정도전도 이때 세상을 떠났다. 그해 태조는 둘째 아들(정종)에게 왕위를 물려주었다. 스스로 원해서였는지는 의문이 남아 있다.",
  "sourceText": "[교과서 밖] 한국민족문화대백과사전 '정종' https://encykorea.aks.ac.kr/Article/E0050884",
  "source": [
   {
    "site": "한국민족문화대백과사전 '정종",
    "url": "https://encykorea.aks.ac.kr/Article/E0050884"
   }
  ],
  "learn": "건국 초 왕위를 둘러싼 갈등",
  "direction": "해 질 녘 붉은 하늘. 경복궁 처마 등불이 하나씩 꺼지고 두루마리가 말리며 다음 왕 화면으로 넘어간다.",
  "fx": {
   "dusk": true
  },
  "who": "bangwon"
 },
 {
  "id": "D001",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ],
   "required": "taejo"
  },
  "whoName": "서당 훈장",
  "text": "마을에 서당을 열려 하옵니다. 상민 아이들도 받아 주면 안 되겠사옵니까?",
  "right": {
   "label": "상민도 받는다",
   "fx": {
    "people": 10,
    "nobles": -5
   },
   "result": "아이들이 《천자문》을 소리 내어 읽었다."
  },
  "left": {
   "label": "양반만 받는다",
   "fx": {
    "nobles": 5,
    "people": -5
   },
   "result": "서당은 양반집 아이들만 받았다."
  },
  "sourceText": "지도서 245(교과서 81) 서당·《천자문》 · 255 상민은 교육받을 기회가 적었음",
  "source": [
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   },
   {
    "book": "지도서",
    "page": "255"
   }
  ],
  "learn": "교육 기관(서당)과 신분",
  "direction": "마을에 작은 서당 초가가 “뽕”, 아이 인형들이 둘러앉는다.",
  "build": [
   "seodang"
  ],
  "who": "yangban"
 },
 {
  "id": "D002",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ],
   "required": "taejo",
   "cond": "G는 G07(갑오개혁) 앞까지만"
  },
  "whoName": "양반 부부",
  "text": "우리 아들이 과거를 준비하옵니다. 시험을 한 번 더 열어 주시면 안 되겠사옵니까?",
  "right": {
   "label": "시험을 더 연다",
   "fx": {
    "nobles": 10,
    "treasury": -5
   },
   "result": "임시 과거가 열려 한양이 북적였다."
  },
  "left": {
   "label": "정해진 대로 한다",
   "fx": {
    "nobles": -5,
    "treasury": 5
   },
   "result": "정해진 3년마다의 시험만 열렸다."
  },
  "sourceText": "지도서 245(교과서 81) 과거에 합격하면 관리 · 248 3년마다 식년시, 경사 때 별시",
  "source": [
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   },
   {
    "book": "지도서",
    "page": "248"
   }
  ],
  "learn": "과거와 관리",
  "direction": "성균관 앞에 갓 쓴 응시생 인형들이 줄을 선다.",
  "who": "yangban"
 },
 {
  "id": "D003",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ]
  },
  "whoName": "고을 수령",
  "text": "고을에 향교를 세워 유학을 가르치소서.",
  "right": {
   "label": "향교를 세운다",
   "fx": {
    "nobles": 10,
    "treasury": -10
   },
   "result": "향교 명륜당에서 글 읽는 소리가 났다."
  },
  "left": {
   "label": "다음 해로 미룬다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "향교 세우기는 다음 해로 미뤄졌다."
  },
  "sourceText": "지도서 245(교과서 81) 향교·명륜당",
  "source": [
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   }
  ],
  "learn": "교육 기관(향교)",
  "direction": "고을에 향교 지붕이 “뽕”.",
  "build": [
   "hyanggyo"
  ],
  "who": "official_red"
 },
 {
  "id": "D004",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ],
   "required": "taejo"
  },
  "whoName": "예법을 맡은 신하",
  "text": "혼례와 장례를 유교 예법에 따라 치르도록 널리 알리소서.",
  "right": {
   "label": "예법을 알린다",
   "fx": {
    "nobles": 10,
    "people": -5
   },
   "result": "혼례 절차가 꼼꼼해졌다."
  },
  "left": {
   "label": "하던 대로 둔다",
   "fx": {
    "people": 5,
    "nobles": -5
   },
   "result": "마을마다 하던 대로 잔치를 열었다."
  },
  "sourceText": "지도서 246(교과서 82) 결혼·장례·제사도 유교 예절에 따라",
  "source": [
   {
    "book": "지도서",
    "page": "246",
    "tb": "82"
   }
  ],
  "learn": "유교 예절의 실천",
  "direction": "마을 마당에 혼례 초례상이 차려지고 청사초롱이 켜진다.",
  "who": "official_green"
 },
 {
  "id": "D005",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ],
   "required": "taejo"
  },
  "whoName": "농민",
  "text": "올봄 가뭄이 심하옵니다. 세금을 조금 줄여 주소서.",
  "right": {
   "label": "세금을 줄인다",
   "fx": {
    "people": 15,
    "treasury": -15
   },
   "result": "농민들이 한숨을 돌렸다."
  },
  "left": {
   "label": "세금을 지킨다",
   "fx": {
    "treasury": 10,
    "people": -10
   },
   "result": "농민들은 허리띠를 졸라맸다."
  },
  "sourceText": "지도서 255(교과서 85) 상민은 대부분 농민, 살림이 넉넉지 않음",
  "source": [
   {
    "book": "지도서",
    "page": "255",
    "tb": "85"
   }
  ],
  "learn": "상민의 삶",
  "direction": "논바닥이 갈라졌다가, 세금을 줄이면 마을 굴뚝에 연기가 오른다.",
  "who": "farmer"
 },
 {
  "id": "D006",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo"
   ],
   "required": "sejong"
  },
  "whoName": "노비",
  "text": "주인댁 일을 하느라 앓아누운 어머니를 돌볼 틈이 없사옵니다. 하루만 쉬게 해 주소서.",
  "right": {
   "label": "하루 쉬게 한다",
   "fx": {
    "people": 10,
    "nobles": -10
   },
   "result": "그날 밤 노비는 어머니 곁을 지켰다."
  },
  "left": {
   "label": "일을 시킨다",
   "fx": {
    "nobles": 5,
    "people": -10
   },
   "result": "노비는 다시 물동이를 들었다."
  },
  "sourceText": "지도서 255(교과서 85) 천민은 대부분 노비, 재산으로 여겨지고 주인을 위해 일함 · 256 유의점",
  "source": [
   {
    "book": "지도서",
    "page": "255",
    "tb": "85"
   },
   {
    "book": "지도서",
    "page": "256"
   }
  ],
  "learn": "천민의 삶",
  "direction": "초가 부엌에 약 달이는 김이 오른다.",
  "who": "nobi"
 },
 {
  "id": "D010",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "선비들",
  "text": "선비들이 매화·난초·국화·대나무를 그리는 모임을 궁에서 열고 싶다 하옵니다.",
  "right": {
   "label": "궁에서 연다",
   "fx": {
    "nobles": 10,
    "treasury": -5
   },
   "result": "선비들은 그림으로 마음가짐을 나누었다."
  },
  "left": {
   "label": "집에서 열게 한다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "모임은 각자 집에서 열렸다."
  },
  "sourceText": "지도서 263(교과서 89) 양반들이 매화·난초·국화·대나무를 그려 마음가짐을 표현",
  "source": [
   {
    "book": "지도서",
    "page": "263",
    "tb": "89"
   }
  ],
  "learn": "조선 전기 양반 문화",
  "direction": "궁궐 정자에 먹 향이 번진다.",
  "who": "yangban"
 },
 {
  "id": "D012",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "수라간 상궁",
  "text": "오늘 수라상에 반찬을 넉넉히 올릴까요, 소박하게 올릴까요?",
  "right": {
   "label": "넉넉히 차린다",
   "fx": {
    "nobles": 5,
    "treasury": -5
   },
   "result": "대신들과 함께 넉넉한 상을 받았다."
  },
  "left": {
   "label": "소박하게 먹는다",
   "fx": {
    "people": 5,
    "nobles": -5
   },
   "result": "전하는 소박한 상을 받았다."
  },
  "sourceText": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "source": [],
  "direction": "수라간 굴뚝에서 연기가 오른다.",
  "who": "courtlady"
 },
 {
  "id": "D013",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "바닷가 고을 수령",
  "text": "바닷가에 왜구 배가 보였사옵니다. 성을 고칠까요?",
  "right": {
   "label": "성을 고친다",
   "fx": {
    "army": 10,
    "treasury": -10
   },
   "result": "바닷가 성벽에 돌이 더해졌다."
  },
  "left": {
   "label": "마을에 맡긴다",
   "fx": {
    "treasury": 5,
    "people": -10
   },
   "result": "마을 사람들이 스스로 망을 보았다."
  },
  "sourceText": "지도서 234(교과서 76) 왜구 침입과 강한 대응",
  "source": [
   {
    "book": "지도서",
    "page": "234",
    "tb": "76"
   }
  ],
  "learn": "주변 나라와의 관계",
  "direction": "바닷가 성벽에 횃불이 켜진다.",
  "who": "official_red"
 },
 {
  "id": "D014",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "북쪽 국경 관리",
  "text": "여진 사람들이 말과 가죽을 바꾸자며 국경에 왔사옵니다.",
  "right": {
   "label": "물건을 바꾼다",
   "fx": {
    "treasury": 10,
    "army": -5
   },
   "result": "국경 장터에서 물건이 오갔다."
  },
  "left": {
   "label": "국경을 닫는다",
   "fx": {
    "army": 5,
    "treasury": -5
   },
   "result": "국경 문을 닫았다."
  },
  "sourceText": "지도서 234(교과서 76) 여진과 필요한 물품을 주고받으며 평화 유지",
  "source": [
   {
    "book": "지도서",
    "page": "234",
    "tb": "76"
   }
  ],
  "learn": "주변 나라와의 관계",
  "direction": "북쪽 강가에 장막과 말들이 모인다.",
  "who": "official_red"
 },
 {
  "id": "D015",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ]
  },
  "whoName": "외교를 맡은 신하",
  "text": "명의 사신이 오옵니다. 선물을 넉넉히 준비할까요?",
  "right": {
   "label": "선물을 늘린다",
   "fx": {
    "army": 10,
    "treasury": -10
   },
   "result": "사신은 흡족해하며 돌아갔다."
  },
  "left": {
   "label": "선물을 줄인다",
   "fx": {
    "treasury": 5,
    "army": -5
   },
   "result": "선물을 줄였다."
  },
  "sourceText": "지도서 234(교과서 76) 명과 사신을 보내 선물을 주고받음",
  "source": [
   {
    "book": "지도서",
    "page": "234",
    "tb": "76"
   }
  ],
  "learn": "명과의 관계",
  "direction": "도성 문 앞에 붉은 깃발의 사신 행렬.",
  "who": "official_red"
 },
 {
  "id": "D016",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "바닷가 고을 관리",
  "text": "일본 사신이 물건을 사고팔자 하옵니다. 포구를 열어 줄까요?",
  "right": {
   "label": "포구를 연다",
   "fx": {
    "treasury": 10,
    "army": -5
   },
   "result": "포구에 장이 섰다."
  },
  "left": {
   "label": "포구를 닫는다",
   "fx": {
    "army": 5,
    "treasury": -5
   },
   "result": "포구는 닫혀 있었다."
  },
  "sourceText": "지도서 234(교과서 76) 일본과 좋은 관계 유지",
  "source": [
   {
    "book": "지도서",
    "page": "234",
    "tb": "76"
   }
  ],
  "learn": "주변 나라와의 관계",
  "direction": "포구에 돛배가 들어온다.",
  "who": "official_green"
 },
 {
  "id": "D017",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ],
   "cond": "G는 G07 앞까지만"
  },
  "whoName": "병조 판서",
  "text": "무과를 열어 활 잘 쏘는 무관을 뽑으소서.",
  "right": {
   "label": "무과를 연다",
   "fx": {
    "army": 10,
    "treasury": -5
   },
   "result": "활터에 과녁 맞히는 소리가 이어졌다."
  },
  "left": {
   "label": "다음 해로 미룬다",
   "fx": {
    "treasury": 5,
    "army": -5
   },
   "result": "시험은 다음 해로 미뤄졌다."
  },
  "sourceText": "지도서 248 무과(병서·활쏘기) 시험",
  "source": [
   {
    "book": "지도서",
    "page": "248"
   }
  ],
  "learn": "과거(무과)",
  "direction": "활터에 과녁이 서고 화살이 날아간다.",
  "who": "official_green"
 },
 {
  "id": "D018",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "공조 관리",
  "text": "장마에 다리가 무너졌사옵니다. 새로 놓을까요?",
  "right": {
   "label": "다리를 놓는다",
   "fx": {
    "people": 10,
    "treasury": -10
   },
   "result": "새 돌다리가 놓였다."
  },
  "left": {
   "label": "나룻배로 버틴다",
   "fx": {
    "treasury": 5,
    "people": -10
   },
   "result": "사람들은 나룻배로 건넜다."
  },
  "sourceText": "지도서 248 공전(도로·다리 관리) / 일반 상황(특정 사실을 주장하지 않음)",
  "source": [
   {
    "book": "지도서",
    "page": "248"
   }
  ],
  "direction": "개울 위에 돌다리가 “뽕”.",
  "build": [
   "bridge"
  ],
  "who": "official_green"
 },
 {
  "id": "D019",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "종묘 제사를 맡은 신하",
  "text": "이번 종묘 제사를 더 크게 올리소서.",
  "right": {
   "label": "크게 올린다",
   "fx": {
    "nobles": 10,
    "treasury": -10
   },
   "result": "종묘에 음악이 울려 퍼졌다."
  },
  "left": {
   "label": "예년대로 한다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "제사는 예년대로 올렸다."
  },
  "sourceText": "지도서 233(교과서 75) 종묘 · 231 종묘는 유교 국가를 나타냄",
  "source": [
   {
    "book": "지도서",
    "page": "233",
    "tb": "75"
   },
   {
    "book": "지도서",
    "page": "231"
   }
  ],
  "learn": "종묘와 유교",
  "direction": "종묘 앞마당에 제사 행렬과 흰 연기.",
  "who": "official_red"
 },
 {
  "id": "D020",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "어느 집안 어른",
  "text": "부모님 재산을 아들딸에게 똑같이 나누려 하옵니다. 그래도 되겠사옵니까?",
  "right": {
   "label": "고르게 나눈다",
   "fx": {
    "people": 10,
    "nobles": -5
   },
   "result": "딸들도 아들과 똑같이 재산을 받았다."
  },
  "left": {
   "label": "집안에 맡긴다",
   "fx": {
    "nobles": 5,
    "people": -5
   },
   "result": "전하는 집안끼리 정하라 했다."
  },
  "sourceText": "지도서 286~287(교과서 99) 조선 전기에는 아들딸이 동등하게 재산을 상속",
  "source": [
   {
    "book": "지도서",
    "page": "286~287",
    "tb": "99"
   }
  ],
  "learn": "조선 전기 여성의 삶",
  "direction": "기와집 마당에서 가족 인형들이 둘러앉는다.",
  "who": "yangban"
 },
 {
  "id": "D022",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ],
   "required": "seonjo"
  },
  "whoName": "이조 판서",
  "text": "돌아가신 아버지 무덤을 3년 지키겠다며 벼슬을 내놓겠다는 관리가 있사옵니다.",
  "right": {
   "label": "3년상을 허락한다",
   "fx": {
    "nobles": 10,
    "treasury": -5
   },
   "result": "효를 다하는 모습에 칭찬이 자자했다."
  },
  "left": {
   "label": "일터로 부른다",
   "fx": {
    "treasury": 5,
    "nobles": -10
   },
   "result": "일손이 급하다며 붙잡았다."
  },
  "sourceText": "지도서 246(교과서 82) 장례 뒤 3년 동안 무덤을 지키는 효의 실천",
  "source": [
   {
    "book": "지도서",
    "page": "246",
    "tb": "82"
   }
  ],
  "learn": "유교 예절과 효",
  "direction": "산기슭 무덤 곁에 작은 움막과 등불.",
  "who": "official_blue"
 },
 {
  "id": "D023",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ]
  },
  "whoName": "성균관 유생",
  "text": "성균관 기숙사 밥이 모자라 공부에 힘이 안 나옵니다.",
  "right": {
   "label": "반찬을 늘린다",
   "fx": {
    "nobles": 10,
    "treasury": -10
   },
   "result": "기숙사 상에 반찬이 늘었다."
  },
  "left": {
   "label": "참으라 한다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "유생들은 배를 문지르며 책을 폈다."
  },
  "sourceText": "지도서 249 성균관 유생은 기숙사(동재·서재)에서 생활",
  "source": [
   {
    "book": "지도서",
    "page": "249"
   }
  ],
  "learn": "성균관",
  "direction": "명륜당 옆 기숙사 굴뚝에 연기.",
  "who": "yusaeng"
 },
 {
  "id": "D024",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "궁궐 내관",
  "text": "명절에 궁에서 투호와 윷놀이 잔치를 열까요?",
  "right": {
   "label": "잔치를 연다",
   "fx": {
    "people": 5,
    "nobles": 5,
    "treasury": -10
   },
   "result": "항아리에 화살이 쏙 들어가자 웃음이 터졌다."
  },
  "left": {
   "label": "조촐하게 보낸다",
   "fx": {
    "treasury": 5,
    "people": -5
   },
   "result": "잔치는 조촐하게 지나갔다."
  },
  "sourceText": "지도서 257(교과서 87) 투호·윷놀이·고누",
  "source": [
   {
    "book": "지도서",
    "page": "257",
    "tb": "87"
   }
  ],
  "learn": "조선 시대의 놀이",
  "direction": "궁궐 마당에 투호 항아리와 윷판.",
  "who": "naegwan"
 },
 {
  "id": "D103",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "암행 나갔던 관리",
  "text": "고을 수령이 세금을 멋대로 걷는다는 소문이옵니다.",
  "right": {
   "label": "조사한다",
   "fx": {
    "people": 10,
    "nobles": -10
   },
   "result": "수령이 벼슬에서 쫓겨났다."
  },
  "left": {
   "label": "소문으로 둔다",
   "fx": {
    "nobles": 5,
    "people": -10
   },
   "result": "소문은 소문으로 끝났다."
  },
  "sourceText": "지도서 300(교과서 102) 관리들의 횡포 / 일반 상황",
  "source": [
   {
    "book": "지도서",
    "page": "300",
    "tb": "102"
   }
  ],
  "learn": "관리의 횡포와 백성",
  "direction": "관아 앞에 백성들이 모인다.",
  "who": "official_red"
 },
 {
  "id": "D110",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "세자를 가르치는 스승",
  "text": "세자 저하가 글공부보다 활쏘기를 하고 싶어 하시옵니다.",
  "right": {
   "label": "활터로 보낸다",
   "fx": {
    "army": 5,
    "nobles": -5
   },
   "result": "세자의 화살이 과녁 한가운데를 맞혔다."
  },
  "left": {
   "label": "책상에 앉힌다",
   "fx": {
    "nobles": 5,
    "army": -5
   },
   "result": "세자는 다시 책상 앞에 앉았다."
  },
  "sourceText": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "source": [],
  "direction": "궁궐 뒤뜰 활터의 작은 세자 인형.",
  "who": "official_red"
 },
 {
  "id": "D111",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "고을 의원",
  "text": "마을에 돌림병이 돌아 의원이 모자라옵니다.",
  "right": {
   "label": "의원을 보낸다",
   "fx": {
    "people": 10,
    "treasury": -10
   },
   "result": "의원들이 마을을 돌며 약을 나누었다."
  },
  "left": {
   "label": "문을 잠근다",
   "fx": {
    "treasury": 5,
    "people": -10
   },
   "result": "마을 사람들은 문을 걸어 잠갔다."
  },
  "sourceText": "지도서 255 의학은 중인의 일 / 일반 상황",
  "source": [
   {
    "book": "지도서",
    "page": "255"
   }
  ],
  "learn": "중인(의원)",
  "direction": "마을에 약 달이는 김이 피어오른다.",
  "who": "jungin"
 },
 {
  "id": "D112",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "고을 수령",
  "text": "비가 오지 않사옵니다. 저수지를 새로 팔까요?",
  "right": {
   "label": "저수지를 판다",
   "fx": {
    "people": 10,
    "treasury": -15
   },
   "result": "저수지에 물이 찰랑였다."
  },
  "left": {
   "label": "하늘을 기다린다",
   "fx": {
    "treasury": 5,
    "people": -10
   },
   "result": "농민들은 하늘만 바라보았다."
  },
  "sourceText": "지도서 264 유의점(농사가 잘되어야 백성 생활이 안정됨) / 일반 상황",
  "source": [
   {
    "book": "지도서",
    "page": "264"
   }
  ],
  "learn": "농사와 백성의 삶",
  "direction": "마을 옆에 저수지가 “뽕”.",
  "build": [
   "reservoir"
  ],
  "who": "official_red"
 },
 {
  "id": "D113",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "공조 판서",
  "text": "큰비로 강둑이 터졌사옵니다. 군사를 보내 둑을 쌓을까요?",
  "right": {
   "label": "군사를 보낸다",
   "fx": {
    "people": 10,
    "army": -5,
    "treasury": -5
   },
   "result": "군사들이 흙 가마니를 날랐다."
  },
  "left": {
   "label": "농민에게 맡긴다",
   "fx": {
    "treasury": 5,
    "people": -15
   },
   "result": "농민들끼리 둑을 막았다."
  },
  "sourceText": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "source": [],
  "direction": "강둑에 흙 가마니가 쌓인다.",
  "who": "official_blue"
 },
 {
  "id": "D114",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ]
  },
  "whoName": "시골 선비",
  "text": "서얼도 과거를 보게 해 달라는 상소가 올라왔사옵니다.",
  "right": {
   "label": "응시를 고민한다",
   "fx": {
    "people": 5,
    "nobles": -10
   },
   "result": "전하는 깊이 생각해 보겠다고 했다."
  },
  "left": {
   "label": "막아 둔다",
   "fx": {
    "nobles": 10,
    "people": -5
   },
   "result": "서얼의 과거 응시는 막혀 있었다."
  },
  "sourceText": "지도서 248 조선 전기에는 서얼의 과거 응시를 막기도 함(후기에는 응시 가능)",
  "source": [
   {
    "book": "지도서",
    "page": "248"
   }
  ],
  "learn": "신분과 과거",
  "direction": "과거장 문 앞에 선 젊은 선비 인형.",
  "who": "yangban"
 },
 {
  "id": "D115",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ],
   "cond": "G는 G07 앞까지만"
  },
  "whoName": "상민 장정",
  "text": "군대에 가느라 농사지을 사람이 없사옵니다. 군역을 줄여 주소서.",
  "right": {
   "label": "군역을 줄인다",
   "fx": {
    "people": 10,
    "army": -10
   },
   "result": "장정들이 들판으로 돌아갔다."
  },
  "left": {
   "label": "성으로 보낸다",
   "fx": {
    "army": 5,
    "people": -10
   },
   "result": "장정들은 창을 들고 성으로 갔다."
  },
  "sourceText": "지도서 255(교과서 85) 국역(군역)·양반은 국역 면제",
  "source": [
   {
    "book": "지도서",
    "page": "255",
    "tb": "85"
   }
  ],
  "learn": "신분에 따른 의무",
  "direction": "들판과 성벽 사이를 오가는 장정 인형.",
  "who": "farmer"
 },
 {
  "id": "D116",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo"
   ]
  },
  "whoName": "상민 대표",
  "text": "‘양반은 왜 군대에 안 가느냐’고 백성들이 묻사옵니다.",
  "right": {
   "label": "백성 편을 든다",
   "fx": {
    "people": 10,
    "nobles": -15
   },
   "result": "양반들 얼굴이 굳었다."
  },
  "left": {
   "label": "예부터 그렇다",
   "fx": {
    "nobles": 10,
    "people": -10
   },
   "result": "전하는 예부터 그래 왔다고 했다."
  },
  "sourceText": "지도서 255(교과서 85) 양반은 국역을 면제받음",
  "source": [
   {
    "book": "지도서",
    "page": "255",
    "tb": "85"
   }
  ],
  "learn": "신분에 따른 의무",
  "direction": "양반과 상민 인형이 마주 선다.",
  "who": "farmer"
 },
 {
  "id": "D117",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "도화서 화원 (중인)",
  "text": "궁중 행사를 그릴 화원을 더 뽑을까요?",
  "right": {
   "label": "화원을 뽑는다",
   "fx": {
    "nobles": 5,
    "treasury": -5
   },
   "result": "행사 그림이 두루마리로 남았다."
  },
  "left": {
   "label": "있는 사람으로",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "화원 몇 명이 바쁘게 붓을 놀렸다."
  },
  "sourceText": "지도서 256(신분제 놀이: 중인 – 화원) · 295(도화서 화원)",
  "source": [
   {
    "book": "지도서",
    "page": "256"
   },
   {
    "book": "지도서",
    "page": "295"
   }
  ],
  "learn": "중인의 일",
  "direction": "궁궐 뜰에서 화원 인형이 붓을 든다.",
  "who": "jungin"
 },
 {
  "id": "D118",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "궁궐 내관",
  "text": "전하, 밤늦도록 상소를 보시니 옥체가 상하실까 걱정이옵니다. 오늘은 일찍 쉬소서.",
  "right": {
   "label": "일찍 쉰다",
   "fx": {
    "people": 5,
    "nobles": -5
   },
   "result": "다음 날 전하의 얼굴이 밝았다."
  },
  "left": {
   "label": "밤새 일한다",
   "fx": {
    "nobles": 5,
    "people": -5
   },
   "result": "전하는 새벽까지 등불을 켰다."
  },
  "sourceText": "일반 상황(특정 사실을 주장하지 않음)",
  "general": true,
  "source": [],
  "direction": "궁궐 창 하나의 불이 꺼지고 별이 뜬다.",
  "who": "naegwan"
 },
 {
  "id": "D121",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "whoName": "서당 아이",
  "text": "‘하늘 천 따 지’를 백 번 외웠사옵니다! 상을 주시옵소서.",
  "right": {
   "label": "상을 준다",
   "fx": {
    "people": 5,
    "treasury": -5
   },
   "result": "아이는 붓 한 자루를 받고 펄쩍 뛰었다."
  },
  "left": {
   "label": "더 외우게 한다",
   "fx": {
    "nobles": 5,
    "people": -5
   },
   "result": "훈장님이 ‘이제 겨우 두 글자’라 했다."
  },
  "sourceText": "지도서 245(교과서 81) 서당에서 《천자문》으로 한자를 배움",
  "source": [
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   }
  ],
  "learn": "서당",
  "direction": "서당 마루에서 아이 인형이 붓을 든다.",
  "who": "child"
 },
 {
  "id": "D122",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo"
   ]
  },
  "whoName": "향교 유생",
  "text": "고을에 서원을 세워 훌륭한 선비를 모시고 공부하게 하소서.",
  "right": {
   "label": "서원을 세운다",
   "fx": {
    "nobles": 10,
    "treasury": -5
   },
   "result": "산자락에 서원이 섰다."
  },
  "left": {
   "label": "향교로 충분하다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "유생들은 향교에서 공부했다."
  },
  "sourceText": "지도서 245(교과서 81) 향교나 서원에서 과거 공부",
  "source": [
   {
    "book": "지도서",
    "page": "245",
    "tb": "81"
   }
  ],
  "learn": "교육 기관(서원)",
  "direction": "산자락에 서원 지붕이 “뽕”.",
  "build": [
   "seowon"
  ],
  "who": "yusaeng"
 },
 {
  "id": "D123",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "마을 혼례 집",
  "text": "마을에서 혼례가 열리옵니다. 잔칫상에 쓸 쌀을 내려 주시겠사옵니까?",
  "right": {
   "label": "쌀을 내린다",
   "fx": {
    "people": 10,
    "treasury": -5
   },
   "result": "마을에 잔치 소리가 울렸다."
  },
  "left": {
   "label": "조촐하게 하게",
   "fx": {
    "treasury": 5,
    "people": -5
   },
   "result": "잔치는 조촐하게 치렀다."
  },
  "sourceText": "지도서 246(교과서 82) 결혼도 유교 예절에 따라 / 일반 상황",
  "source": [
   {
    "book": "지도서",
    "page": "246",
    "tb": "82"
   }
  ],
  "learn": "유교 예절",
  "direction": "마을 마당에 초례상과 사람들.",
  "who": "farmer"
 },
 {
  "id": "D124",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo",
    "gojong"
   ]
  },
  "whoName": "어린 아들을 둔 아버지",
  "text": "아들에게 어른께 인사하는 법부터 가르치려 하옵니다. 서당에서도 예법을 먼저 가르치게 하소서.",
  "right": {
   "label": "예법부터 가르친다",
   "fx": {
    "nobles": 10,
    "people": -5
   },
   "result": "아이들이 허리 숙여 인사하는 법을 배웠다."
  },
  "left": {
   "label": "글부터 가르친다",
   "fx": {
    "people": 5,
    "nobles": -5
   },
   "result": "서당은 글 읽기부터 했다."
  },
  "sourceText": "지도서 245 수업 도움말(어릴 때 인사·효도·웃어른 예절을 먼저 배움)",
  "source": [
   {
    "book": "지도서",
    "page": "245"
   }
  ],
  "learn": "유교 예절",
  "direction": "서당 앞에서 아이 인형이 절한다.",
  "who": "yangban"
 },
 {
  "id": "D125",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong",
    "seonjo",
    "yeongjo"
   ]
  },
  "whoName": "지방 관리",
  "text": "부모를 지극히 모신 효자가 있사옵니다. 상을 내려 마을에 알릴까요?",
  "right": {
   "label": "상을 내린다",
   "fx": {
    "nobles": 10,
    "treasury": -5
   },
   "result": "효자 이야기가 고을에 퍼졌다."
  },
  "left": {
   "label": "칭찬만 한다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "칭찬의 말만 전했다."
  },
  "sourceText": "지도서 246(교과서 82) 유교 예절, 효를 본받게 함",
  "source": [
   {
    "book": "지도서",
    "page": "246",
    "tb": "82"
   }
  ],
  "learn": "유교 예절과 효",
  "direction": "마을 입구에 붉은 문(정문)이 선다.",
  "who": "official_red"
 },
 {
  "id": "D130",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "outside": true,
  "whoName": "고을 향교 유생",
  "text": "향교에 가르칠 선생이 없사옵니다. 나라에서 선생(훈도)을 보내 주소서.",
  "right": {
   "label": "훈도를 보낸다",
   "fx": {
    "nobles": 10,
    "treasury": -10
   },
   "result": "한양에서 온 훈도가 첫 강의를 열었다."
  },
  "left": {
   "label": "고을에 맡긴다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "유생들은 저희끼리 책을 읽었다."
  },
  "sourceText": "[교과서 밖] 지도서 249 참고 자료(향교에 나라에서 교수·훈도를 보냄)",
  "source": [
   {
    "book": "지도서",
    "page": "249"
   }
  ],
  "learn": "교육 기관(향교)",
  "direction": "향교 마당에 선생 인형이 들어선다.",
  "who": "yusaeng"
 },
 {
  "id": "D131",
  "type": "daily",
  "daily": {
   "kings": [
    "taejo",
    "sejong"
   ]
  },
  "outside": true,
  "whoName": "한성부 관리",
  "text": "한양 네 곳에 학당을 열어 아이들을 가르치면 어떨까요?",
  "right": {
   "label": "학당을 연다",
   "fx": {
    "people": 5,
    "nobles": 5,
    "treasury": -10
   },
   "result": "동서남북 학당에서 글 읽는 소리가 났다."
  },
  "left": {
   "label": "성균관만 둔다",
   "fx": {
    "treasury": 5,
    "nobles": -5
   },
   "result": "배우려는 아이들은 성균관만 바라보았다."
  },
  "sourceText": "[교과서 밖] 지도서 249 참고 자료(한양의 4부 학당)",
  "source": [
   {
    "book": "지도서",
    "page": "249"
   }
  ],
  "learn": "교육 기관",
  "direction": "도성 안 네 곳에 작은 학당 지붕이 “뽕”.",
  "build": [
   "hakdang"
  ],
  "who": "official_green"
 }
]);
})();
