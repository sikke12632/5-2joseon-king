# -*- coding: utf-8 -*-
"""루트 늘리기(설계서 10-14)를 시대팩 데이터로 옮긴다 — 다른 길 2~3개 · 갈래 이야기 셋 · 새 갈래 카드 5장.

  python tools/import-routes.py 작업/1A-카드데이터/routes_T.py taejo

- routes_T.py는 읽기만 한다(runpy로 ALTS·NEWCARDS·BRANCHES만 꺼냄). 열림 조건 식은 설계서 10-14-1 "엔진 조건 식" 표에서 읽는다.
- 결과: eras/joseon/data/<왕>/routes.js — cards.js·more.js 뒤에 읽혀, 역사 사건 카드의 paths.alt를 이 표로 바꾸고
  (a1에 있던 엔진 칸 — 변형판·건물·건너뛰기·위기 배율·합류 글 — 은 그대로 둔다) 새 카드·갈래·칭호를 더한다.
- 새 다른 길의 엔진 칸(세울 장식·변형판 등)은 아래 ALT_FX에 적는다(설계서 표의 「이번 판에서」에 맞춘 연출).
"""
import os, re, sys, json, runpy

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, STAGE = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'taejo')
OUT = os.path.join(HERE, 'eras', 'joseon', 'data', STAGE, 'routes.js')
G = runpy.run_path(SRC if os.path.isabs(SRC) else os.path.join(HERE, SRC), run_name='routes_data')
ALTS, NEW, BR = G['ALTS'], G['NEWCARDS'], G['BRANCHES']

GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
GRAIN = {'저울': 'balance', '복합': 'complex', '선물': 'gift', '수렁': 'mire', '씨앗': 'seed', '도박': 'gamble'}
STATE = {'순조': 'smooth', '억지': 'forced', '늦게': 'late'}
BUILD = {'계룡산 궁궐(이름 없는 장식)': 'gyeryongPalace', '계룡산 산성(이름 없는 장식)': 'gyeryongFort', '역참(이름 없는 장식)': 'yeokcham'}
DOLL = {'승지': 'official_red', '도읍 터를 살핀 신하': 'official_green', '공사 감독관': 'official_blue', '정도전': 'jeong', '역참 관리': 'official_green'}


def effects(s):
    fx = {}
    for k, sign, n in re.findall(r'([백반고방])\s*([+\-−])\s*(\d+)', s or ''):
        fx[GAUGE[k]] = fx.get(GAUGE[k], 0) + int(n) * (-1 if sign in '-−' else 1)
    return fx


# 설계서 10-14-1 "엔진 조건 식" 표
doc = open(os.path.join(HERE, '작업', '설계서.md'), encoding='utf-8').read()
sec = doc[doc.index('**엔진 조건 식** (`engine/cond.js` 문법)'):doc.index('#### 10-14-2')]
EXPR = dict(re.findall(r'^\|\s*(T\d\da\d)\s*\|\s*`([^`]+)`\s*\|', sec, re.M))
for cid, alts in ALTS.items():
    for a in alts:
        if a['id'] not in EXPR:
            sys.exit(f"설계서 10-14-1 표에 {a['id']}의 조건 식이 없음")

# 새 다른 길의 엔진 칸 — 세울 장식(이름 없는 장식)·변형판·연출
ALT_FX = {
    'T04a2': {'build': ['gyeryong'], 'variants': {'T05': 'T05v2', 'T07': 'T07v2'}, 'skip': ['CT04']},   # 계룡산 공사장 다시, 갈래 ③
    'T04a3': {'build': ['muak']},                                                                       # 무악 고개
    'T05a2': {'build': ['altOffice'], 'skip': ['CT04']},                                               # 관청·곳간(궁궐 자리는 비움)
    'T06a2': {'build': ['jongmyo', 'sajik', 'wonchal']},                                               # 종묘 옆 작은 절
    'T07a2': {'build': ['palisade'], 'skip': ['CT05', 'C01a'], 'crisis_mult': {'army:low': 1.3}},      # 통나무 울타리
    'T08a2': {'build': ['altSmallSG']},                                                                # 절에서 글을 가르침(작은 강당)
    'T03a2': {'fx': {'skyText': '朝鮮'}},                                                               # 새 이름을 하늘에 고함
}
# 다른 길이 실제로 놓이는 카드: T02a1을 고른 판에서는 T08 대신 T08v1이 나오므로, T08a2는 T08v1에 둔다(엔진 세션 판단)
HOST = {'T08a2': 'T08v1'}

alts_out = {}
for cid, alts in ALTS.items():
    for a in alts:
        o = {'id': a['id'], 'label': a['label'], 'unlock': EXPR[a['id']], 'effects': effects(a['eff']), 'set_flag': a['flag'],
             'this_run': a['result'], 'lock_hint': a['cond_txt'].split(' (처음')[0]}
        if a.get('link'):
            o['branch'] = a['link'].replace('갈래 ', '')
        o.update(ALT_FX.get(a['id'], {}))
        alts_out.setdefault(HOST.get(a['id'], cid), []).append(o)

cards = []
for c in NEW:
    o = {'id': c['id'], 'kind': 'history' if c['base'] else 'alt', 'stages': [STAGE], 'rarity': 'common'}
    if c['base']:
        o['variant_of'] = c['base']
    o['alt_only'] = True
    if not c['base']:
        o['force'] = True
    o['branch'] = c['branch']
    o['conditions'] = [c['when']]
    o['conditions_text'] = c['trig']
    o['who'] = {'name': c['who'], 'doll': DOLL.get(c['who'], 'official_blue')}
    o['line'] = c['line']
    o['choice_type'] = 'how'
    o['choices'] = {}
    for k, sk in (('R', 'right'), ('L', 'left')):
        eff, run = c[k]
        s = {'label': c[k + 'l'], 'effects': effects(eff), 'this_run': run}
        b = [BUILD.get(x, x) for x in c.get('build') or []]
        if b:
            s['build'] = b
        st = (c.get('bs') or {}).get(k)
        if st:
            s['build_state'] = STATE[st]
        o['choices'][sk] = s
    o['grain'] = GRAIN[c['grain']]
    o['real_note'] = c['real_note']
    o['sources_text'] = '이번 판 전용 장면(갈래 이야기, 설계서 10-14-3)'
    o['fx'] = {'note': c['fx']}
    cards.append(o)
# 갈래 카드 연출(engine/evfx.js 장면)
SCENE = {'AT05': 'debate', 'AT06': 'longing', 'AT07': 'relay'}
for o in cards:
    if o['id'] in SCENE:
        o['fx']['scene'] = SCENE[o['id']]

# 갈래 완성 조건(엔진 식) — 설계서 10-14-2 "완성 조건" 칸을 식으로
DONE = {'①': 'flag(F_정몽주) && flag(F_중재)',
        '②': 'flag(F_개경) && seen(T05v1) && seen(T06v1) && seen(T07v1)',
        '③': 'flag(F_계룡) && seen(T05v2) && seen(T07v2) && seen(AT07)'}
branches = []
for b in BR:
    m = re.search(r'사관: "([^"]+)"', b['ending'])
    branches.append({'id': b['no'], 'stage': STAGE, 'name': b['name'], 'flag': b['flag'], 'done': DONE[b['no']], 'done_text': b['done'],
                     'title': b['title'], 'scene': b['ending'].split(' 사관:')[0], 'sagwan': m.group(1) if m else '', 'path': b['path']})
titles = [{'id': f"branch-{b['id']}", 'name': b['title'], 'hint': '갈래 이야기를 끝까지', 'cond': f"갈래 {b['id']} {b['name']} — {b['done_text']}", 'rule': f"branch:{b['id']}"} for b in branches]
titles.append({'id': 'branch-two', 'name': '두 갈래의 임금', 'hint': '한 판에 갈래 둘', 'cond': '한 판에서 갈래 완성 조건 둘을 채우고 클리어(10-14-2)', 'rule': 'branch:two'})

# 설계서 10-14-2: 계룡산 판에서도 한양 전용 일상 카드는 나오지 않는다(!flag(F_개경)이 있는 조건에 !flag(F_계룡) 더함)
# CT01c: 계룡산 갈래에서는 "새 도읍까지 옮긴다" 쪽 결과 문장이 바뀐다(엔진 대사 변형 1줄 — 문장은 엔진 세션이 씀, 담임 확인)
RUN_IF = {'CT01c': {'right': [{'when': 'flag(F_계룡)', 'this_run': '돌과 나무는 멀리 갈 것도 없이 계룡산 새 도읍 공사장으로 들어갔다.'}]}}

js = """/* 루트 늘리기(설계서 10-14) — 집필 세션의 routes_T.py와 설계서 10-14-1 조건 식 표에서 tools/import-routes.py 로 만든 파일. 직접 고치지 말 것.
 * ① 역사 사건마다 다른 길 2~3개(paths.alt를 이 표로 바꿈, a1의 엔진 칸은 그대로) ② 새 갈래 카드 5장 ③ 갈래 이야기 셋과 갈래 칭호
 * ④ 계룡산 판에서도 한양 전용 일상 카드가 나오지 않게 조건을 더함 ⑤ 계룡산 갈래의 CT01c 결과 문장 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const ALTS = %s;
  for (const cid in ALTS) {
    const c = byId(cid);
    if (!c) continue;
    c.paths = c.paths || { real: {} };
    const old = c.paths.alt || [];
    c.paths.alt = ALTS[cid].map((a) => Object.assign({}, old.find((o) => o.id === a.id) || {}, a));
  }
  D.cards.push(...%s);
  // 변형판은 원래 카드의 순서(order)를 따른다
  for (const c of D.cards)
    if (c.variant_of && c.order === undefined) {
      const o = byId(c.variant_of);
      if (o) c.order = o.order;
    }
  D.branches = (D.branches || []).concat(%s);
  D.titles.push(...%s);
  for (const c of D.cards)
    if (c.stages.includes('%s') && (c.conditions || []).some((x) => /!flag\\(F_개경\\)/.test(x) && !/F_계룡/.test(x))) c.conditions = c.conditions.map((x) => (/!flag\\(F_개경\\)/.test(x) ? `(${x}) && !flag(F_계룡)` : x));
  const RUN_IF = %s;
  for (const id in RUN_IF) {
    const c = byId(id);
    if (c) for (const sk in RUN_IF[id]) c.choices[sk].this_run_if = RUN_IF[id][sk];
  }
})();
""" % (json.dumps(alts_out, ensure_ascii=False, indent=1), json.dumps(cards, ensure_ascii=False, indent=1), json.dumps(branches, ensure_ascii=False, indent=1),
       json.dumps(titles, ensure_ascii=False, indent=1), STAGE, json.dumps(RUN_IF, ensure_ascii=False, indent=1))
with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(js)
print('다른 길', sum(len(v) for v in alts_out.values()), '· 새 카드', len(cards), '· 갈래', len(branches), '· 칭호', len(titles), '→', os.path.relpath(OUT, HERE))
