# -*- coding: utf-8 -*-
"""돌발 이벤트 카드(설계서 10-13-4)를 시대팩 데이터로 옮긴다.

  python tools/import-events.py 작업/1A-카드데이터/events_T.py taejo

- events_T.py는 읽기만 한다(runpy로 E 목록만 꺼냄).
- 결과: eras/joseon/data/<왕>/events.js
- 카드 모양은 일상 카드(10-5)와 같고 event(즉시·마음·연쇄)·box(세 결과) 칸이 더 있다.
- 세계 연출(fx.scene)은 아래 SCENE에서 카드 id별로 고른다(engine/evfx.js가 그린다).
"""
import os, re, sys, json, runpy

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, STAGE = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'taejo')
OUT = os.path.join(HERE, 'eras', 'joseon', 'data', STAGE, 'events.js')
E = runpy.run_path(SRC if os.path.isabs(SRC) else os.path.join(HERE, SRC), run_name='events_data')['E']

GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
GRAIN = {'저울': 'balance', '복합': 'complex', '선물': 'gift', '수렁': 'mire', '씨앗': 'seed', '도박': 'gamble'}
KIND = {'흉': 'bad', '길': 'good', '손님': 'guest', '상자': 'box', '마음': 'mind', '연쇄': 'chain'}
LUCK = {'불운': 'bad', '행운': 'good'}
# 인물 → 인형(data/common/roles.js)
DOLL = {'고을 수령': 'official_green', '도성 문지기': 'general', '한성부 관리': 'official_green', '의원': 'jungin',
        '공사 감독관': 'official_blue', '곳간지기': 'farmer', '농민 대표': 'farmer', '내관': 'naegwan', '나루 관리': 'official_green',
        '예조 관리': 'official_red', '서리(관청 아전)': 'official_blue', '떠돌이 장사꾼': 'merchant',
        # 세종(events_S.py)
        '집현전 학자': 'yusaeng', '공방 장인': 'craftsman', '서운관 관리': 'official_blue', '북방 군관': 'general',
        # 선조·인조(events_J.py)
        '호위 군관': 'general', '성을 지키는 군관': 'general', '바닷가 군관': 'official_green', '역참 관리': 'official_blue'}
# 세계 연출(engine/evfx.js의 장면 이름)
SCENE = {'ET01': 'drought', 'ET02': 'locust', 'ET03': 'hungry', 'ET06': 'flood', 'ET07': 'fever', 'ET08': 'fire', 'ET18': 'thief',
         'ET04': 'rain', 'ET05': 'harvest', 'ET09': 'deer', 'ET10': 'market', 'ET11': 'ship', 'ET12': 'envoy',
         'ET13': 'jar', 'ET14': 'chest', 'ET15': 'map', 'ET16': 'plum', 'ET17': 'night',
         # 세종: 지금 있는 장면을 다시 쓴다(새 장면은 따로 — 별똥별·금빛 잉어는 밤·봄 하늘 장면으로)
         'ES01': 'drought', 'ES02': 'flood', 'ES03': 'flood', 'ES04': 'harvest', 'ES05': 'night', 'ES06': 'flood', 'ES07': 'hungry', 'ES08': 'fire',
         'ES09': 'meteor', 'ES10': 'rain', 'ES11': 'meteor', 'ES12': 'carp', 'ES13': 'envoy', 'ES14': 'chest', 'ES15': 'jar', 'ES16': 'map',
         'ES17': 'lotus', 'ES18': 'night',
         # 선조·인조: 안개·얼음·산성 우물만 새 장면(seaFog·frost·wellSpring), 나머지는 있는 장면(EJ07 산길 소문은 성문 앞에 모인 사람들)
         'EJ01': 'flood', 'EJ02': 'thief', 'EJ03': 'fever', 'EJ04': 'flood', 'EJ05': 'drought', 'EJ06': 'thief', 'EJ07': 'hungry', 'EJ08': 'frost',
         'EJ09': 'wellSpring', 'EJ10': 'seaFog', 'EJ11': 'wellSpring', 'EJ12': 'harvest', 'EJ13': 'ship', 'EJ14': 'jar', 'EJ15': 'chest', 'EJ16': 'map',
         'EJ17': 'plum', 'EJ18': 'night'}
# 설계서 표에 적힌 '대사만 바꿈'(ET06: 개경에 머문 판은 개경 앞 개울)
LINE_IF = {'ET06': [{'when': 'flag(F_개경)', 'who': '개경 관리', 'line': '장맛비에 개경 앞 개울이 넘쳐 나루 마을이 잠겼사옵니다.'}]}
COND = {'ET06': 'seen(T04) && !flag(F_계룡)'}  # 개경 판은 대사만 바꾸고(LINE_IF), 계룡산 판에는 한강이 없으니 뺀다


def effects(s):
    fx = {}
    for k, sign, n in re.findall(r'([백반고방])\s*([+\-−])\s*(\d+)', s or ''):
        fx[GAUGE[k]] = fx.get(GAUGE[k], 0) + int(n) * (-1 if sign in '-−' else 1)
    return fx


# 연쇄 카드의 운(불운·행운)은 부르는 카드 쪽에 적혀 있다
luck_of = {}
for c in E:
    for nid, p, luck in c['chain'] or []:
        luck_of.setdefault(nid, LUCK[luck])

out = []
for c in E:
    o = {'id': c['id'], 'kind': 'event', 'ev': KIND[c['kind']], 'name': c['title'], 'stages': [STAGE], 'rarity': 'common'}
    o['conditions'] = [COND.get(c['id'], c['when'])]
    o['conditions_text'] = c['when_txt']
    o['who'] = {'name': c['who'], 'doll': DOLL.get(c['who'], 'official_blue')}
    o['line'] = c['line']
    if c['id'] in LINE_IF or c.get('line_if'):
        o['line_if'] = LINE_IF.get(c['id']) or c['line_if']
    o['choice_type'] = 'free'
    o['choices'] = {}
    for k, sk in (('R', 'right'), ('L', 'left')):
        lab, eff, run = c[k]
        o['choices'][sk] = {'label': lab, 'effects': {} if eff.strip() == '?' else effects(eff), 'this_run': run}
    o['grain'] = GRAIN[c['grain']]
    o['game_event'] = True
    o['out_of_textbook'] = False
    ev = {'mind': {'show': c['mind'][0], 'right': c['mind'][1], 'left': c['mind'][2]}}
    if c['now']:
        ev['now'] = effects(c['now'])
    if c['chain']:
        ev['chains'] = [{'card': nid, 'p': p / 100, 'luck': LUCK[luck]} for nid, p, luck in c['chain']]
    if c['kind'] == '연쇄':
        ev['luck'] = luck_of.get(c['id'], 'bad')
        ev['chain_only'] = True
    o['event'] = ev
    if c['box']:
        res = []
        for p, eff, text in c['box']:
            fx = effects(eff)
            kind = 'empty' if not fx else 'good' if sum(fx.values()) > 0 else 'bad'
            res.append({'kind': kind, 'p': p / 100, 'effects': fx, 'this_run': text})
        # 상자 쪽: 효과 칸이 '?'인 버튼
        side = 'right' if c['R'][1].strip() == '?' else 'left'
        o['box'] = {'side': side, 'outcomes': res}
    o['fx'] = {'note': c['fx'], 'scene': SCENE.get(c['id'], '')}
    if c.get('caution'):
        o['caution'] = c['caution']
    o['sources_text'] = '[게임 속 일] 이번 생에서만 일어난 일(설계서 10-13)'
    out.append(o)

head = """/* 돌발 이벤트 카드(설계서 10-13-4) — 집필 세션의 events_<왕>.py에서 tools/import-events.py 로 만든 파일. 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 모두 [게임 속 일]. kind 'event' · ev(bad 흉 · good 길 · guest 손님 · box 상자 · mind 마음 · chain 연쇄)
 * event.now 뜨는 순간 효과 · event.mind 왕의 마음(뜰 때/오른쪽/왼쪽) · event.chains 3~6장 뒤 이어질 카드(확률) · box 세 결과 */
(function () {
  'use strict';
  const D = window.JK.eraData;
  D.cards.push(...
"""
with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
    f.write(head + json.dumps(out, ensure_ascii=False, indent=1) + '\n  );\n})();\n')
from collections import Counter
print(len(out), '장', dict(Counter(o['ev'] for o in out)), '→', os.path.relpath(OUT, HERE))
