/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.falls.push(...[
 {
  "id": "people0",
  "gauge": "people",
  "at": 0,
  "side": "low",
  "name": "민심을 잃은 임금",
  "text": "굶주린 백성들이 들고일어났다."
 },
 {
  "id": "people100",
  "gauge": "people",
  "at": 100,
  "side": "high",
  "name": "잔치만 연 임금",
  "text": "백성의 청만 들어주다 보니, 나랏일을 맡을 관리들이 모두 떠났다."
 },
 {
  "id": "nobles0",
  "gauge": "nobles",
  "at": 0,
  "side": "low",
  "name": "신하 없는 임금",
  "text": "대신들이 모두 벼슬을 내던지고 고향으로 돌아갔다."
 },
 {
  "id": "nobles100",
  "gauge": "nobles",
  "at": 100,
  "side": "high",
  "name": "허수아비 임금",
  "text": "힘이 너무 커진 대신들이 모든 일을 저희끼리 정했다."
 },
 {
  "id": "treasury0",
  "gauge": "treasury",
  "at": 0,
  "side": "low",
  "name": "빈 곳간",
  "text": "곳간이 텅 비어 관리에게 줄 녹봉도 없다."
 },
 {
  "id": "treasury100",
  "gauge": "treasury",
  "at": 100,
  "side": "high",
  "name": "쌓아만 둔 곳간",
  "text": "곳간을 쌓아만 두자 욕심 많은 관리들이 곳간을 노렸다."
 },
 {
  "id": "army0",
  "gauge": "army",
  "at": 0,
  "side": "low",
  "name": "무너진 성문",
  "text": "성을 지킬 군사가 남지 않았다."
 },
 {
  "id": "army100",
  "gauge": "army",
  "at": 100,
  "side": "high",
  "name": "장수의 나라",
  "text": "너무 강해진 장수들이 임금의 말을 듣지 않았다."
 },
 {
  "id": "faction",
  "gauge": "faction",
  "at": 0,
  "name": "붕당에 갇힌 임금",
  "text": "한 붕당이 조정을 차지해, 임금의 말이 통하지 않았다.",
  "stages": [
   "yeongjo"
  ]
 }
]);
  D.titles.push(...[
 {
  "id": "title01",
  "name": "다섯 임금의 기록",
  "hint": "아직 만나지 못한 임금이 있다",
  "cond": "**모음**: 다섯 왕을 모두 한 번 이상 클리어",
  "rule": "later"
 },
 {
  "id": "title02",
  "name": "백성의 어버이",
  "hint": "마을에 사람이 가장 붐볐던 왕",
  "cond": "판을 클리어할 때 백성 65 이상",
  "rule": "later"
 },
 {
  "id": "title03",
  "name": "선비의 벗",
  "hint": "대신들이 늘 웃던 왕",
  "cond": "판을 클리어할 때 양반 65 이상",
  "rule": "later"
 },
 {
  "id": "title04",
  "name": "곳간 가득",
  "hint": "엽전 소리가 그치지 않던 왕",
  "cond": "판을 클리어할 때 국고 65 이상",
  "rule": "later"
 },
 {
  "id": "title05",
  "name": "철옹성",
  "hint": "성벽이 가장 높던 왕",
  "cond": "판을 클리어할 때 국방 65 이상",
  "rule": "later"
 },
 {
  "id": "title06",
  "name": "과학 임금의 벗",
  "hint": "집현전 등불이 꺼지지 않게",
  "cond": "세종 발명 진행도 6",
  "rule": "later"
 },
 {
  "id": "title07",
  "name": "바다의 방패",
  "hint": "바다를 끝까지 믿어 보라",
  "cond": "J03 \"화약을 보낸다\"·J06 \"수군에 힘을 싣는다\"를 고르고, 임진왜란 구간에 국방 30 아래로 안 내려감",
  "rule": "later"
 },
 {
  "id": "title08",
  "name": "남한산성 40여 일",
  "hint": "가장 추운 겨울을 한 번에",
  "cond": "선조·인조 판을 실각 없이 클리어",
  "rule": "later"
 },
 {
  "id": "title09",
  "name": "흔들림 없는 저울",
  "hint": "두 깃발 사이에서",
  "cond": "영조·정조 끝에 붕당 저울 ±2 안",
  "rule": "later"
 },
 {
  "id": "title10",
  "name": "문을 연 임금",
  "hint": "밤을 밝혀라",
  "cond": "고종 개화 진행도 5 이상",
  "rule": "later"
 },
 {
  "id": "title11",
  "name": "문을 지킨 임금",
  "hint": "끝까지 버텨 본 왕",
  "cond": "G03 \"척화비를 세운다\" + G04 \"버틴다\" + 고종을 실각 없이 클리어",
  "rule": "later"
 },
 {
  "id": "title12",
  "name": "신분을 넘어",
  "hint": "낮은 자리의 목소리를 들어라",
  "cond": "**모음**: S07 \"100일을 바로 준다\"·Y06 \"크게 맡긴다\"·G07 \"신분제를 없앤다\"·G11 \"모임을 둔다\"를 모두 골라 봄(여러 판에 걸쳐도 됨)",
  "rule": "later"
 },
 {
  "id": "title13",
  "name": "한양 건축가",
  "hint": "이름 없는 집도 집이다",
  "cond": "**모음**: 여러 판을 합쳐 일상 카드 생활 건물 10채 이상(서당·향교·서원·저수지·다리·장터·벽돌집·학교 등)",
  "rule": "later"
 },
 {
  "id": "title14",
  "name": "사관이 사랑한 임금",
  "hint": "사관의 두루마리를 잘 읽으면",
  "cond": "**모음**: 다섯 왕 모두 사관의 별 3개(4-1)",
  "rule": "later"
 },
 {
  "id": "title15",
  "name": "아슬아슬 줄타기",
  "hint": "벼랑 끝에서 돌아온 왕",
  "cond": "어떤 게이지든 10 이하나 90 이상까지 갔다가 그 왕을 클리어",
  "rule": "edgeClear"
 },
 {
  "id": "title16",
  "name": "무너지지 않은 왕조",
  "hint": "다섯 번 모두 한 번에",
  "cond": "**모음**: 다섯 왕을 모두 실각 없이 한 번에 클리어(왕마다 따로 해도 됨, 보통 이상, 10-7)",
  "rule": "later"
 },
 {
  "id": "path-allReal",
  "name": "실록과 같이",
  "hint": "실제 역사의 길을 끝까지",
  "cond": "한 판에서 그 왕의 역사 사건을 모두 실제 경로로 감(= 그 왕의 진엔딩, 10-11)",
  "rule": "allReal"
 },
 {
  "id": "path-alt5",
  "name": "다른 조선",
  "hint": "다른 길을 여러 번",
  "cond": "한 판에서 다른 길 3개(한 왕 한도를 다 씀)",
  "rule": "alt5"
 },
 {
  "id": "path-flag-F_정몽주",
  "name": "충신을 품은 임금",
  "hint": "이번 판의 다른 길",
  "cond": "태조 다른 길 각각(10-10-3)",
  "rule": "flag:F_정몽주"
 },
 {
  "id": "path-flag-F_불교",
  "name": "두 가르침의 임금",
  "hint": "이번 판의 다른 길",
  "cond": "태조 다른 길 각각(10-10-3)",
  "rule": "flag:F_불교"
 },
 {
  "id": "path-flag-F_국호",
  "name": "이름을 지킨 임금",
  "hint": "이번 판의 다른 길",
  "cond": "태조 다른 길 각각(10-10-3)",
  "rule": "flag:F_국호"
 },
 {
  "id": "path-flag-F_개경",
  "name": "개경을 지킨 임금",
  "hint": "이번 판의 다른 길",
  "cond": "태조 다른 길 각각(10-10-3)",
  "rule": "flag:F_개경"
 },
 {
  "id": "path-flag-F_양위",
  "name": "다툼 없는 양위",
  "hint": "이번 판의 다른 길",
  "cond": "태조 다른 길 각각(10-10-3)",
  "rule": "flag:F_양위"
 },
 {
  "id": "path-explorer",
  "name": "갈림길 탐험가",
  "hint": "갈림길을 모두 걸어 보라",
  "cond": "태조의 다른 길 9가지를 여러 판에 걸쳐 모두 가 봄",
  "rule": "explorer"
 },
 {
  "id": "true-sprout",
  "name": "(왕 이름)의 실록대로",
  "hint": "다섯 왕의 사건을 모두 실제대로",
  "cond": "진엔딩(sprout)",
  "rule": "true:sprout"
 },
 {
  "id": "true-normal",
  "name": "태조의 실록대로",
  "hint": "다섯 왕의 사건을 모두 실제대로",
  "cond": "진엔딩(normal)",
  "rule": "true:normal"
 },
 {
  "id": "true-sage",
  "name": "실록을 따른 새싹 임금",
  "hint": "다섯 왕의 사건을 모두 실제대로",
  "cond": "진엔딩(sage)",
  "rule": "true:sage"
 },
 {
  "id": "true-annals",
  "name": "실록의 임금",
  "hint": "다섯 왕의 사건을 모두 실제대로",
  "cond": "진엔딩(annals)",
  "rule": "true:annals"
 },
 {
  "id": "other-alt10",
  "name": "새 길을 연 임금",
  "hint": "다른 길을 아주 많이",
  "cond": "모음: 여러 판에 걸쳐 서로 다른 다른 길 10개 이상을 가 봄",
  "rule": "alt10"
 },
 {
  "id": "other-altEvery",
  "name": "다섯 갈래의 임금",
  "hint": "왕마다 다른 길 하나씩",
  "cond": "모음: 다섯 왕 판 모두에서 다른 길을 1개 이상 고르고 클리어",
  "rule": "altEvery"
 },
 {
  "id": "other-half",
  "name": "반쯤 같은 실록",
  "hint": "반은 같고 반은 다르게",
  "cond": "실제대로 지난 사건이 정확히 절반 안팎(45~55%)",
  "rule": "half"
 },
 {
  "id": "crisis-held5",
  "name": "위기를 넘긴 임금",
  "hint": "위기를 여러 번 넘겨 보라",
  "cond": "한 판에서 위기 5번 수습하고 끝까지 가기",
  "rule": "held5"
 },
 {
  "id": "crisis-heldAtEnd",
  "name": "벼랑 끝의 임금",
  "hint": "끝에서 돌아온 임금",
  "cond": "끝 구간(게이지 0이나 100)에서 터진 위기를 수습",
  "rule": "heldAtEnd"
 },
 {
  "id": "crisis-cancel3",
  "name": "같은 위기는 두 번 없다",
  "hint": "버틴 뒤 바로 고쳐라",
  "cond": "후속 위기가 예약된 뒤, 정해진 장수 안에 고쳐 후속을 취소하기 3번",
  "rule": "cancel3"
 }
]);
  D.codex.push(...[
 {
  "id": "p-01",
  "cat": "인물",
  "name": "태조 이성계",
  "band": "",
  "opens": [
   "T00",
   "T01",
   "T02",
   "T03",
   "T04",
   "T05",
   "T06",
   "T07",
   "T08",
   "T09"
  ],
  "desc": "조선을 세운 첫 임금. 유교를 나라의 기본 원리로 삼았다.",
  "outside": false
 },
 {
  "id": "p-02",
  "cat": "인물",
  "name": "정도전",
  "band": "교과서 밖",
  "opens": [
   "T02",
   "T07"
  ],
  "desc": "한양 도성 터를 정하고 경복궁 이름을 지었다.",
  "outside": true
 },
 {
  "id": "p-03",
  "cat": "인물",
  "name": "정몽주",
  "band": "교과서 밖",
  "opens": [
   "T01"
  ],
  "desc": "고려를 지키려다 1392년 세상을 떠났다.",
  "outside": true
 },
 {
  "id": "p-04",
  "cat": "인물",
  "name": "이방원",
  "band": "교과서 밖",
  "opens": [
   "T01",
   "T09"
  ],
  "desc": "태조의 아들. 1398년 왕자의 난을 일으켰고 뒤에 태종이 된다.",
  "outside": true
 },
 {
  "id": "p-05",
  "cat": "인물",
  "name": "세종",
  "band": "",
  "opens": [
   "S00",
   "S01",
   "S02",
   "S03",
   "S04",
   "S05",
   "S06",
   "S07",
   "S08",
   "S09"
  ],
  "desc": "훈민정음을 만들고 과학 기구를 만들게 한 임금.",
  "outside": false
 },
 {
  "id": "p-06",
  "cat": "인물",
  "name": "장영실",
  "band": "교과서 밖",
  "opens": [
   "S06",
   "S08"
  ],
  "desc": "관청 노비에서 벼슬에 오른 기술자. 자격루를 만들었다.",
  "outside": true
 },
 {
  "id": "p-07",
  "cat": "인물",
  "name": "최만리",
  "band": "이름은 지도서 참고",
  "opens": [
   "S09"
  ],
  "desc": "훈민정음 반포에 반대하는 글을 올린 집현전 학자.",
  "outside": false
 },
 {
  "id": "p-08",
  "cat": "인물",
  "name": "세자(문종)",
  "band": "교과서 밖",
  "opens": [
   "SX3"
  ],
  "desc": "빗물을 그릇에 받아 재는 실험을 했다는 기록이 있다.",
  "outside": true
 },
 {
  "id": "p-09",
  "cat": "인물",
  "name": "이종무",
  "band": "교과서 밖",
  "opens": [
   "S01"
  ],
  "desc": "1419년 쓰시마 정벌을 이끈 장수.",
  "outside": true
 },
 {
  "id": "p-10",
  "cat": "인물",
  "name": "선조",
  "band": "",
  "opens": [
   "J01",
   "J02",
   "J03",
   "J04",
   "J05",
   "J06",
   "J07"
  ],
  "desc": "임진왜란 때 의주까지 피란한 임금.",
  "outside": false
 },
 {
  "id": "p-11",
  "cat": "인물",
  "name": "황윤길",
  "band": "교과서 밖",
  "opens": [
   "J01"
  ],
  "desc": "일본이 쳐들어올 것이라 알린 통신사.",
  "outside": true
 },
 {
  "id": "p-12",
  "cat": "인물",
  "name": "김성일",
  "band": "교과서 밖",
  "opens": [
   "J01"
  ],
  "desc": "전쟁 기색이 없다고 보고해 뒷날 논란이 된 통신사.",
  "outside": true
 },
 {
  "id": "p-13",
  "cat": "인물",
  "name": "유성룡",
  "band": "",
  "opens": [
   "J02",
   "J07",
   "D035"
  ],
  "desc": "전쟁을 이끈 관리. 《징비록》을 썼다.",
  "outside": false
 },
 {
  "id": "p-14",
  "cat": "인물",
  "name": "이순신",
  "band": "",
  "opens": [
   "J03",
   "J06"
  ],
  "desc": "학익진으로 한산도에서 크게 이긴 수군 장수.",
  "outside": false
 },
 {
  "id": "p-15",
  "cat": "인물",
  "name": "곽재우",
  "band": "교과서 밖",
  "opens": [
   "J04"
  ],
  "desc": "붉은 옷을 입고 의병을 이끈 선비.",
  "outside": true
 },
 {
  "id": "p-16",
  "cat": "인물",
  "name": "오희문",
  "band": "",
  "opens": [
   "D030"
  ],
  "desc": "임진왜란 중 일기 《쇄미록》을 쓴 양반.",
  "outside": false
 },
 {
  "id": "p-17",
  "cat": "인물",
  "name": "남평 조씨",
  "band": "",
  "opens": [
   "D031"
  ],
  "desc": "병자호란 중 《병자일기》를 쓴 여성.",
  "outside": false
 },
 {
  "id": "p-18",
  "cat": "인물",
  "name": "광해군",
  "band": "교과서 밖",
  "opens": [
   "J08"
  ],
  "desc": "명과 후금 사이에서 치우치지 않으려 한 임금. 평가가 갈린다.",
  "outside": true
 },
 {
  "id": "p-19",
  "cat": "인물",
  "name": "인조",
  "band": "",
  "opens": [
   "J08",
   "J09",
   "J10",
   "J11"
  ],
  "desc": "병자호란 때 남한산성에서 버틴 임금.",
  "outside": false
 },
 {
  "id": "p-20",
  "cat": "인물",
  "name": "김상헌",
  "band": "",
  "opens": [
   "J10"
  ],
  "desc": "청과 끝까지 싸워 명과의 의리를 지키자고 했다.",
  "outside": false
 },
 {
  "id": "p-21",
  "cat": "인물",
  "name": "최명길",
  "band": "",
  "opens": [
   "J10"
  ],
  "desc": "청과 화해해 나라와 백성을 지키자고 했다.",
  "outside": false
 },
 {
  "id": "p-22",
  "cat": "인물",
  "name": "소현 세자",
  "band": "교과서 밖",
  "opens": [
   "J11"
  ],
  "desc": "병자호란 뒤 청의 심양에 인질로 끌려갔다.",
  "outside": true
 },
 {
  "id": "p-23",
  "cat": "인물",
  "name": "영조",
  "band": "",
  "opens": [
   "Y01",
   "Y02",
   "Y03"
  ],
  "desc": "탕평 정치를 펴고 탕평비를 세운 임금.",
  "outside": false
 },
 {
  "id": "p-24",
  "cat": "인물",
  "name": "사도 세자",
  "band": "교과서 밖",
  "opens": [
   "Y04"
  ],
  "desc": "영조의 아들이자 정조의 아버지.",
  "outside": true
 },
 {
  "id": "p-25",
  "cat": "인물",
  "name": "정조",
  "band": "",
  "opens": [
   "Y05",
   "Y06",
   "Y07",
   "Y08",
   "Y09",
   "Y10"
  ],
  "desc": "학자를 길러 개혁을 펴고 수원 화성을 쌓은 임금.",
  "outside": false
 },
 {
  "id": "p-26",
  "cat": "인물",
  "name": "정약용",
  "band": "",
  "opens": [
   "Y08",
   "D058"
  ],
  "desc": "거중기를 고안한 실학자.",
  "outside": false
 },
 {
  "id": "p-27",
  "cat": "인물",
  "name": "박지원",
  "band": "",
  "opens": [
   "D057"
  ],
  "desc": "청의 문물을 배워 상공업을 키우자고 한 실학자.",
  "outside": false
 },
 {
  "id": "p-28",
  "cat": "인물",
  "name": "검서관 네 사람",
  "band": "교과서 밖",
  "opens": [
   "Y06"
  ],
  "desc": "서얼 출신 이덕무·유득공·박제가·서이수.",
  "outside": true
 },
 {
  "id": "p-29",
  "cat": "인물",
  "name": "혜경궁 홍씨",
  "band": "교과서 밖",
  "opens": [
   "Y09"
  ],
  "desc": "정조의 어머니. 1795년 회갑 행차.",
  "outside": true
 },
 {
  "id": "p-30",
  "cat": "인물",
  "name": "김만덕",
  "band": "",
  "opens": [
   "Y10"
  ],
  "desc": "장사로 번 돈으로 제주 백성을 살린 상인.",
  "outside": false
 },
 {
  "id": "p-31",
  "cat": "인물",
  "name": "임윤지당",
  "band": "",
  "opens": [
   "D060"
  ],
  "desc": "성리학 글을 남긴 여성 학자.",
  "outside": false
 },
 {
  "id": "p-32",
  "cat": "인물",
  "name": "김홍도",
  "band": "",
  "opens": [
   "D065",
   "D074"
  ],
  "desc": "<서당>, <벼 타작>을 그린 화원.",
  "outside": false
 },
 {
  "id": "p-33",
  "cat": "인물",
  "name": "신윤복",
  "band": "",
  "opens": [
   "D076"
  ],
  "desc": "<장옷 입은 여인>을 그린 화원.",
  "outside": false
 },
 {
  "id": "p-34",
  "cat": "인물",
  "name": "최제우",
  "band": "이름은 지도서 참고",
  "opens": [
   "G00"
  ],
  "desc": "동학을 만든 사람.",
  "outside": false
 },
 {
  "id": "p-35",
  "cat": "인물",
  "name": "흥선 대원군",
  "band": "",
  "opens": [
   "G02",
   "G03",
   "D105"
  ],
  "desc": "척화비를 세우고 서양과의 통상을 거부했다.",
  "outside": false
 },
 {
  "id": "p-36",
  "cat": "인물",
  "name": "고종",
  "band": "",
  "opens": [
   "G00",
   "GX6"
  ],
  "desc": "대한 제국을 세우고 황제가 된 임금.",
  "outside": false
 },
 {
  "id": "p-37",
  "cat": "인물",
  "name": "김옥균",
  "band": "이름은 지도서 참고",
  "opens": [
   "G05"
  ],
  "desc": "갑신정변을 일으킨 관리.",
  "outside": false
 },
 {
  "id": "p-38",
  "cat": "인물",
  "name": "전봉준",
  "band": "이름은 지도서 참고",
  "opens": [
   "G06"
  ],
  "desc": "동학 농민 운동의 지도자.",
  "outside": false
 },
 {
  "id": "p-39",
  "cat": "인물",
  "name": "김홍집",
  "band": "이름은 지도서 참고",
  "opens": [
   "G07"
  ],
  "desc": "갑오개혁을 이끈 관리.",
  "outside": false
 },
 {
  "id": "p-40",
  "cat": "인물",
  "name": "명성 황후",
  "band": "교과서 밖",
  "opens": [
   "G08"
  ],
  "desc": "1895년 을미사변으로 세상을 떠났다.",
  "outside": true
 },
 {
  "id": "p-41",
  "cat": "인물",
  "name": "서재필",
  "band": "",
  "opens": [
   "G09"
  ],
  "desc": "《독립신문》을 펴냈다.",
  "outside": false
 },
 {
  "id": "p-42",
  "cat": "인물",
  "name": "박성춘",
  "band": "",
  "opens": [
   "G11"
  ],
  "desc": "만민 공동회에서 연설한 백정 출신.",
  "outside": false
 },
 {
  "id": "p-43",
  "cat": "인물",
  "name": "세책점 주인·전기수·소리꾼",
  "band": "",
  "opens": [
   "D061",
   "D062",
   "D063"
  ],
  "desc": "서민 문화를 이끈 이름 없는 사람들(한 칸).",
  "outside": false
 },
 {
  "id": "a-044",
  "cat": "유물·건축",
  "name": "경복궁",
  "band": "",
  "opens": [
   "T05",
   "J02",
   "G02"
  ],
  "outside": false
 },
 {
  "id": "a-045",
  "cat": "유물·건축",
  "name": "종묘",
  "band": "",
  "opens": [
   "T06"
  ],
  "outside": false
 },
 {
  "id": "a-046",
  "cat": "유물·건축",
  "name": "사직단",
  "band": "",
  "opens": [
   "T06"
  ],
  "outside": false
 },
 {
  "id": "a-047",
  "cat": "유물·건축",
  "name": "한양 도성",
  "band": "",
  "opens": [
   "T07"
  ],
  "outside": false
 },
 {
  "id": "a-048",
  "cat": "유물·건축",
  "name": "흥인지문·돈의문·숭례문·숙정문",
  "band": "",
  "opens": [
   "T07"
  ],
  "outside": false
 },
 {
  "id": "a-049",
  "cat": "유물·건축",
  "name": "성균관 명륜당",
  "band": "",
  "opens": [
   "T08"
  ],
  "outside": false
 },
 {
  "id": "a-050",
  "cat": "유물·건축",
  "name": "서당",
  "band": "",
  "opens": [
   "D001"
  ],
  "outside": false
 },
 {
  "id": "a-051",
  "cat": "유물·건축",
  "name": "향교",
  "band": "",
  "opens": [
   "D003"
  ],
  "outside": false
 },
 {
  "id": "a-052",
  "cat": "유물·건축",
  "name": "서원",
  "band": "",
  "opens": [
   "D122"
  ],
  "outside": false
 },
 {
  "id": "a-053",
  "cat": "유물·건축",
  "name": "《천자문》",
  "band": "",
  "opens": [
   "D001",
   "D121"
  ],
  "outside": false
 },
 {
  "id": "a-054",
  "cat": "유물·건축",
  "name": "집현전",
  "band": "지도서 참고",
  "opens": [
   "S00"
  ],
  "outside": false
 },
 {
  "id": "a-055",
  "cat": "유물·건축",
  "name": "《농사직설》",
  "band": "",
  "opens": [
   "S02"
  ],
  "outside": false
 },
 {
  "id": "a-056",
  "cat": "유물·건축",
  "name": "《향약집성방》",
  "band": "",
  "opens": [
   "D008"
  ],
  "outside": false
 },
 {
  "id": "a-057",
  "cat": "유물·건축",
  "name": "《삼강행실도》",
  "band": "",
  "opens": [
   "S05"
  ],
  "outside": false
 },
 {
  "id": "a-058",
  "cat": "유물·건축",
  "name": "자격루",
  "band": "",
  "opens": [
   "S06"
  ],
  "outside": false
 },
 {
  "id": "a-059",
  "cat": "유물·건축",
  "name": "혼천의",
  "band": "",
  "opens": [
   "SX1"
  ],
  "outside": false
 },
 {
  "id": "a-060",
  "cat": "유물·건축",
  "name": "앙부일구",
  "band": "",
  "opens": [
   "SX2"
  ],
  "outside": false
 },
 {
  "id": "a-061",
  "cat": "유물·건축",
  "name": "측우기",
  "band": "",
  "opens": [
   "SX3"
  ],
  "outside": false
 },
 {
  "id": "a-062",
  "cat": "유물·건축",
  "name": "훈민정음",
  "band": "",
  "opens": [
   "S09"
  ],
  "outside": false
 },
 {
  "id": "a-063",
  "cat": "유물·건축",
  "name": "활자(갑인자)",
  "band": "",
  "opens": [
   "D026"
  ],
  "outside": false
 },
 {
  "id": "a-064",
  "cat": "유물·건축",
  "name": "분청사기·백자",
  "band": "",
  "opens": [
   "D009"
  ],
  "outside": false
 },
 {
  "id": "a-065",
  "cat": "유물·건축",
  "name": "사군자 그림",
  "band": "",
  "opens": [
   "D010"
  ],
  "outside": false
 },
 {
  "id": "a-066",
  "cat": "유물·건축",
  "name": "4군 6진",
  "band": "",
  "opens": [
   "S04"
  ],
  "outside": false
 },
 {
  "id": "a-067",
  "cat": "유물·건축",
  "name": "승경도판·윤목",
  "band": "",
  "opens": [
   "D011"
  ],
  "outside": false
 },
 {
  "id": "a-068",
  "cat": "유물·건축",
  "name": "투호·윷놀이",
  "band": "",
  "opens": [
   "D024"
  ],
  "outside": false
 },
 {
  "id": "a-069",
  "cat": "유물·건축",
  "name": "《경국대전》",
  "band": "",
  "opens": [
   "J00",
   "D028",
   "D029"
  ],
  "outside": false
 },
 {
  "id": "a-070",
  "cat": "유물·건축",
  "name": "거북선",
  "band": "생김새는 교과서 밖",
  "opens": [
   "J03",
   "D042"
  ],
  "outside": true
 },
 {
  "id": "a-071",
  "cat": "유물·건축",
  "name": "판옥선",
  "band": "교과서 밖",
  "opens": [
   "J03"
  ],
  "outside": true
 },
 {
  "id": "a-072",
  "cat": "유물·건축",
  "name": "《징비록》",
  "band": "",
  "opens": [
   "J07"
  ],
  "outside": false
 },
 {
  "id": "a-073",
  "cat": "유물·건축",
  "name": "《쇄미록》",
  "band": "",
  "opens": [
   "D030"
  ],
  "outside": false
 },
 {
  "id": "a-074",
  "cat": "유물·건축",
  "name": "《병자일기》",
  "band": "",
  "opens": [
   "D031"
  ],
  "outside": false
 },
 {
  "id": "a-075",
  "cat": "유물·건축",
  "name": "훈련도감",
  "band": "교과서 밖",
  "opens": [
   "D035"
  ],
  "outside": true
 },
 {
  "id": "a-076",
  "cat": "유물·건축",
  "name": "공명첩",
  "band": "교과서 밖",
  "opens": [
   "D039"
  ],
  "outside": true
 },
 {
  "id": "a-077",
  "cat": "유물·건축",
  "name": "남한산성",
  "band": "",
  "opens": [
   "J10"
  ],
  "outside": false
 },
 {
  "id": "a-078",
  "cat": "유물·건축",
  "name": "삼전도비",
  "band": "",
  "opens": [
   "J11"
  ],
  "outside": false
 },
 {
  "id": "a-079",
  "cat": "유물·건축",
  "name": "탕평비",
  "band": "",
  "opens": [
   "Y02"
  ],
  "outside": false
 },
 {
  "id": "a-080",
  "cat": "유물·건축",
  "name": "규장각",
  "band": "교과서 밖",
  "opens": [
   "Y05"
  ],
  "outside": true
 },
 {
  "id": "a-081",
  "cat": "유물·건축",
  "name": "수원 화성(장안문·서북공심돈)",
  "band": "",
  "opens": [
   "Y08",
   "D127"
  ],
  "outside": false
 },
 {
  "id": "a-082",
  "cat": "유물·건축",
  "name": "거중기·녹로",
  "band": "",
  "opens": [
   "Y08"
  ],
  "outside": false
 },
 {
  "id": "a-083",
  "cat": "유물·건축",
  "name": "배다리·《원행을묘정리의궤》",
  "band": "교과서 밖",
  "opens": [
   "Y09"
  ],
  "outside": true
 },
 {
  "id": "a-084",
  "cat": "유물·건축",
  "name": "상평통보",
  "band": "",
  "opens": [
   "D051"
  ],
  "outside": false
 },
 {
  "id": "a-085",
  "cat": "유물·건축",
  "name": "장시",
  "band": "",
  "opens": [
   "D051",
   "D052"
  ],
  "outside": false
 },
 {
  "id": "a-086",
  "cat": "유물·건축",
  "name": "안경·자명종·천리경",
  "band": "",
  "opens": [
   "D055"
  ],
  "outside": false
 },
 {
  "id": "a-087",
  "cat": "유물·건축",
  "name": "<곤여만국전도>",
  "band": "",
  "opens": [
   "D056"
  ],
  "outside": false
 },
 {
  "id": "a-088",
  "cat": "유물·건축",
  "name": "한글 소설·세책점",
  "band": "",
  "opens": [
   "D061"
  ],
  "outside": false
 },
 {
  "id": "a-089",
  "cat": "유물·건축",
  "name": "판소리",
  "band": "",
  "opens": [
   "D063"
  ],
  "outside": false
 },
 {
  "id": "a-090",
  "cat": "유물·건축",
  "name": "하회탈·탈놀이",
  "band": "",
  "opens": [
   "D064",
   "D075"
  ],
  "outside": false
 },
 {
  "id": "a-091",
  "cat": "유물·건축",
  "name": "풍속화",
  "band": "",
  "opens": [
   "D065"
  ],
  "outside": false
 },
 {
  "id": "a-092",
  "cat": "유물·건축",
  "name": "민화(<호랑이와 까치>·<수복문자도>)",
  "band": "",
  "opens": [
   "D066",
   "D067"
  ],
  "outside": false
 },
 {
  "id": "a-093",
  "cat": "유물·건축",
  "name": "가체·족두리",
  "band": "교과서 밖",
  "opens": [
   "D069"
  ],
  "outside": true
 },
 {
  "id": "a-094",
  "cat": "유물·건축",
  "name": "척화비",
  "band": "",
  "opens": [
   "G03"
  ],
  "outside": false
 },
 {
  "id": "a-095",
  "cat": "유물·건축",
  "name": "강화도 조약 문서",
  "band": "",
  "opens": [
   "G04"
  ],
  "outside": false
 },
 {
  "id": "a-096",
  "cat": "유물·건축",
  "name": "우정총국",
  "band": "교과서 밖(지도서 304)",
  "opens": [
   "G05"
  ],
  "outside": true
 },
 {
  "id": "a-097",
  "cat": "유물·건축",
  "name": "사발통문",
  "band": "",
  "opens": [
   "G06"
  ],
  "outside": false
 },
 {
  "id": "a-098",
  "cat": "유물·건축",
  "name": "《독립신문》",
  "band": "",
  "opens": [
   "G09"
  ],
  "outside": false
 },
 {
  "id": "a-099",
  "cat": "유물·건축",
  "name": "독립문",
  "band": "교과서 밖",
  "opens": [
   "G09"
  ],
  "outside": true
 },
 {
  "id": "a-100",
  "cat": "유물·건축",
  "name": "환구단·노란 곤룡포",
  "band": "교과서 밖",
  "opens": [
   "G10"
  ],
  "outside": true
 },
 {
  "id": "a-101",
  "cat": "유물·건축",
  "name": "제중원 · 배재 학당 · 이화 학당",
  "band": "이름은 교과서 밖",
  "opens": [
   "GX1",
   "GX2"
  ],
  "outside": true
 },
 {
  "id": "a-102",
  "cat": "유물·건축",
  "name": "전등 · 전화 · 전차 · 경인선 기차",
  "band": "",
  "opens": [
   "GX3",
   "GX4",
   "GX5",
   "GX6"
  ],
  "outside": false
 },
 {
  "id": "a-103",
  "cat": "유물·건축",
  "name": "양산 · 양복 · 커피 · 대불호텔 · 태극기",
  "band": "태극기는 교과서 밖",
  "opens": [
   "D091",
   "D092",
   "D093",
   "D094",
   "D108"
  ],
  "outside": true
 }
]);
})();
