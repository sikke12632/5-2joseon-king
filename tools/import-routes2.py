# -*- coding: utf-8 -*-
"""루트(다른 길·실제 경로 잠금·갈래)를 시대팩 데이터로 옮긴다 — 엔진 칸을 원본 파일에 함께 적는 왕(세종부터)용.

  python tools/import-routes2.py 작업/1A-카드데이터/routes_S.py sejong

태조는 조건 식이 설계서 표에 있어 import-routes.py를 쓴다. 이 스크립트는 routes_<왕>.py의
  ALTS(다른 길: label·expr·eff·flag·result·merge_real·src·fx·lock_reason) · REAL(난이도별 실제 경로 잠금, 엔진 식) ·
  EVENT(사건 이름) · EVENT_TYPE · NEWCARDS(갈래 카드·변형판) · BRANCHES(갈래 이야기, done_expr)
를 그대로 읽어 eras/joseon/data/<왕>/routes.js 를 만든다. 원본은 읽기만 한다(runpy).
결과 파일은 cards.js·more.js 뒤에 읽혀, 그 왕 역사 카드에 paths(real·alt)와 사건 이름을 붙이고 새 카드·갈래·칭호를 더한다.
"""
import os, re, sys, json, runpy

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, STAGE = sys.argv[1], sys.argv[2]
OUT = os.path.join(HERE, 'eras', 'joseon', 'data', STAGE, 'routes.js')
G = runpy.run_path(SRC if os.path.isabs(SRC) else os.path.join(HERE, SRC), run_name='routes_data')

GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
DEV = {'발': 'invention', '저': 'scale', '개': 'open'}
GRAIN = {'저울': 'balance', '복합': 'complex', '선물': 'gift', '수렁': 'mire', '씨앗': 'seed', '도박': 'gamble'}
STATE = {'순조': 'smooth', '억지': 'forced', '늦게': 'late'}
DIFF = G.get('DIFF_KEY', {'새싹': 'sprout', '보통': 'normal', '성군': 'sage', '실록': 'annals'})
DOLL = {'장영실': 'jangyeongsil', '바닷가 군관': 'official_green', '궁궐 장인': 'craftsman', '고을 수령': 'official_green', '시골 선비': 'yangban', '붉은 붕당 대신': 'party_red', '승지': 'official_red', '잔치를 준비하는 신하': 'official_blue', '수원 고을 수령': 'official_green', '공사 감독관': 'official_blue', '도성 문지기': 'general', '종묘를 지키는 관리': 'official_green', '국경의 역관': 'jungin', '명에 다녀온 사신': 'official_red', '바닷가 고을 수령': 'official_red', '예조 관리': 'official_red', '의금부 관리': 'official_blue'}


def effects(s):
    fx = {}
    for k, sign, n in re.findall(r'([백반고방])\s*([+\-−])\s*(\d+)', s or ''):
        fx[GAUGE[k]] = fx.get(GAUGE[k], 0) + int(n) * (-1 if sign in '-−' else 1)
    return fx


def sources(raw):
    out = []
    for m in re.finditer(r'지도서\s*(\d+(?:[~∼]\d+)?)(?:\(교과서\s*(\d+(?:[~∼]\d+)?)[^)]*\))?', raw):
        e = {'type': 'guide', 'page': m.group(1)}
        if m.group(2):
            e['tb'] = m.group(2)
        out.append(e)
    for m in re.finditer(r'(https?://\S+)', raw):
        url = m.group(1).rstrip('·,)')
        name = re.split(r'[·/]|]', raw[: m.start()])[-1]
        name = re.sub(r'https?://\S+', '', name).strip() or '출처'
        out.append({'type': 'web', 'title': name[:40], 'url': url})
    return out


# 1) 역사 카드에 붙일 것: 사건 이름·종류 · 실제 경로 잠금 · 다른 길
patch = {}
for cid, name in G['EVENT'].items():
    p = patch.setdefault(cid, {'event': name, 'event_type': G.get('EVENT_TYPE', {}).get(cid, 'normal'), 'real': {}, 'alt': []})
    rq = G['REAL'].get(cid)
    if rq:
        p['real']['require'] = {DIFF[k]: v[1] for k, v in rq.items() if k in DIFF}
        p['real']['require_reason'] = rq.get('why', '')
    for a in G['ALTS'].get(cid, []):
        o = {'id': a['id'], 'label': a['label'], 'unlock': a['expr'], 'effects': effects(a['eff']), 'set_flag': a['flag'],
             'this_run': a['result'], 'lock_hint': a['cond_txt'].split('(새싹')[0].strip(), 'lock_reason': a.get('lock_reason', ''),
             'merge_text': '이번 생에서는 ' + a['result'].split('.')[0] + '.',
             'merge_real': {'text': a['merge_real'], 'sources': sources(a['src']), 'out_of_textbook': bool(a['out'])}}
        if a.get('link'):
            o['branch'] = a['link'].replace('갈래 ', '')
        o.update(a.get('fx') or {})
        p['alt'].append(o)

# 2) 새 카드(갈래 카드·변형판)
cards = []
for c in G['NEWCARDS']:
    o = {'id': c['id'], 'kind': 'history' if c['base'] else 'alt', 'stages': [STAGE], 'rarity': 'common', 'alt_only': True}
    if c['base']:
        o['variant_of'] = c['base']
        o['event_type'] = 'variant'
    else:
        o['force'] = True
    if c.get('branch'):
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
        dv = {}
        for g, sign, n in re.findall(r'([발저개])\s*([+\-−])\s*(\d+)', (c.get('dev') or {}).get(k, '')):
            dv[DEV[g]] = int(n) * (-1 if sign in '-−' else 1)
        if dv:
            s['device'] = dv
        o['choices'][sk] = s
    o['grain'] = GRAIN[c['grain']]
    o['real_note'] = c['real_note']
    o['sources_text'] = '이번 생 전용 장면(갈래 이야기·다른 길)'
    o['fx'] = {'note': c['fx']}
    if c.get('scene'):
        o['fx']['scene'] = c['scene']
    # 갈래 장면이 세우는 건물(어느 쪽을 골라도) — 고종 갈래 마지막 장면의 공방·포대
    if c.get('build'):
        for sk in ('right', 'left'):
            o['choices'][sk]['build'] = list(c['build'])
    cards.append(o)

# 3) 갈래 이야기와 칭호
branches = []
for b in G['BRANCHES']:
    m = re.search(r'사관: "([^"]+)"', b['ending'])
    branches.append({'id': STAGE + b['no'], 'stage': STAGE, 'name': b['name'], 'flag': b['flag'], 'done': b['done_expr'], 'done_text': b['done'],
                     'title': b['title'], 'scene': b['ending'].split(' 사관:')[0], 'sagwan': m.group(1) if m else '', 'path': b['path'],
                     'end_fx': b.get('end_fx')})
titles = [{'id': f"branch-{b['id']}", 'name': b['title'], 'hint': '갈래 이야기를 끝까지', 'cond': f"갈래 {b['id']} {b['name']} — {b['done_text']}", 'rule': f"branch:{b['id']}"} for b in branches]

js = """/* 루트(다른 길·실제 경로 잠금·갈래) — 집필 파일 %s 에서 tools/import-routes2.py 로 만든 파일. 직접 고치지 말 것.
 * 그 왕 역사 카드에 사건 이름·paths(real.require 난이도별 · alt 다른 길)를 붙이고, 갈래 카드·변형판·갈래 이야기·칭호를 더한다. */
(function () {
  'use strict';
  const D = window.JK.eraData;
  const byId = (id) => D.cards.find((c) => c.id === id);
  const P = %s;
  for (const cid in P) {
    const c = byId(cid);
    if (!c) continue;
    c.event = P[cid].event;
    c.event_type = P[cid].event_type;
    c.paths = c.paths || { real: {} };
    Object.assign(c.paths.real, P[cid].real, { how_right: c.choices.right.label, how_left: c.choices.left.label });
    c.paths.alt = P[cid].alt;
  }
  D.cards.push(...%s);
  for (const c of D.cards)
    if (c.variant_of && c.order === undefined) {
      const o = byId(c.variant_of);
      if (o) {
        c.order = o.order;
        c.event = o.event;
      }
    }
  D.branches = (D.branches || []).concat(%s);
  D.titles.push(...%s);
})();
""" % (os.path.basename(SRC), json.dumps(patch, ensure_ascii=False, indent=1), json.dumps(cards, ensure_ascii=False, indent=1),
       json.dumps(branches, ensure_ascii=False, indent=1), json.dumps(titles, ensure_ascii=False, indent=1))
with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(js)
print('사건', len(patch), '· 다른 길', sum(len(p['alt']) for p in patch.values()), '· 새 카드', len(cards), '· 갈래', len(branches), '→', os.path.relpath(OUT, HERE))
