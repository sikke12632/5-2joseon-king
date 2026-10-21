# -*- coding: utf-8 -*-
"""설계서 v2 때 쓴 사건 사슬·희귀 카드(작업/1A-카드데이터/cards_more.py의 M)를 시대팩 데이터로 옮긴다.

    python tools/import-v2.py taejo sejong

- 결과: eras/joseon/data/<왕>/v2.js (카드). cards_more.py는 읽기만 한다.
- 이 카드들은 설계서 3-7·3-8에 있지만 import-design.py가 읽지 않아 그동안 게임에 들어가지 않았다(2026-10-21 발견).
- 원본의 '나오는 조건'(trig)은 한국어 문장이라, 아래 RULE 표에 엔진 조건 식으로 옮겨 적는다.
    when     조건 식(engine/cond.js). 희귀는 무작위 칸에서 이 조건이 맞을 때 희귀도 가중치로 뽑힌다(설계서 10-2)
    trigger  (카드, 쪽, n): 그 카드에서 그 쪽(None = 어느 쪽이든)을 고르면 n장 뒤에 반드시(사슬 — '…를 고르면 n장 뒤')
    force    조건이 맞는 순간 다음 자리에 반드시 한 번
- 왕을 건너는 카드(세종 S07 → 선조·인조 C03a 등)는 왕끼리 이어지지 않게 된 결정(2026-10-21)에 따라 그 왕 집필 때 다시 본다.
"""
import os, re, sys, json, runpy

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARD_DIR = os.path.join(HERE, '작업', '1A-카드데이터')
sys.path.insert(0, CARD_DIR)
M = runpy.run_path(os.path.join(CARD_DIR, 'cards_more.py'), run_name='v2_data')['M']
STAGES = sys.argv[1:] or ['taejo', 'sejong']

RULE = {
    'taejo': {
        'C01a': {'trigger': ('T07', 'left', 3)},          # T07 '농한기에 쌓는다' → 3장 뒤
        'R01': {'when': 'seen(T04)'},                      # T04 뒤 아무 때나
        # R02는 여러 왕 카드(원본 st='TSJY'). id가 하나라 태조 파일에 두 왕을 함께 적는다 — 세종 판은 성균관이 이미 서 있다
        'R02': {'when': 'stage(sejong) || seen(T08)', 'stages': ['taejo', 'sejong']},
        'R13': {'when': 'seen(T07)'},
        'R14': {'when': 'seen(T06) && !seen(T09)'},
    },
    'sejong': {
        'C02a': {'when': 'device(invention) >= 1 && !seen(S06)', 'force': True},   # 진행도 1 이상이 되면 바로 다음(S06보다 앞)
        'C02b': {'trigger': ('S06', 'right', 0)},                                  # S06 '구리를 내준다' → 바로 다음
        'C13a': {'trigger': ('SX3', None, 0), 'when': 'device(invention) >= 4'},   # SX3 뒤 바로 다음(진행도 4 이상일 때)
        'R12': {'when': 'chosen(S01,R)'},                                          # S01 '곧바로 친다' 뒤(희귀라 확률로)
    },
}
LETTER = {'taejo': 'T', 'sejong': 'S', 'seonjo': 'J', 'yeongjo': 'Y', 'gojong': 'G'}
GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
DEVICE = {'발': 'invention', '저': 'scale', '개': 'open'}
RAR = {'보통': 'common', '드묾': 'uncommon', '희귀': 'rare', '전설': 'legend'}
KIND = {'사슬': 'chain', '희귀': 'rare', '전설': 'legend'}
DOLL = [('하륜', 'haryun'), ('조준', 'jojun'), ('장영실', 'jangyeongsil'), ('군관', 'general'), ('문지기', 'general'), ('장수', 'general')]


def effects(s):
    fx, dev = {}, {}
    for k, sign, n in re.findall(r'([백반고방발저개])\s*([+\-−])\s*(\d+)', s or ''):
        v = int(n) * (-1 if sign in '-−' else 1)
        if k in GAUGE:
            fx[GAUGE[k]] = fx.get(GAUGE[k], 0) + v
        else:
            dev[DEVICE[k]] = dev.get(DEVICE[k], 0) + v
    return fx, dev


def sources(raw):
    out = []
    for m in re.finditer(r'지도서\s*(\d+(?:[~∼]\d+)?)(?:\(교과서\s*(\d+(?:[~∼]\d+)?)[^)]*\))?', raw):
        e = {'type': 'guide', 'page': m.group(1)}
        if m.group(2):
            e['tb'] = m.group(2)
        out.append(e)
    for m in re.finditer(r'(https?://\S+)', raw):
        url = m.group(1).rstrip('·,)')
        name = re.split(r'[·/]|]|근거:', raw[: m.start()])[-1]
        name = re.sub(r'https?://\S+', '', name).strip() or '출처'
        out.append({'type': 'web', 'title': name[:40], 'url': url})
    return out


def role_of(n):
    for k, v in DOLL:
        if k in n:
            return v
    return ['official_blue', 'official_green', 'official_red'][sum(map(ord, n)) % 3]


def grain(fxR, fxL):
    vals = list(fxR.values()) + list(fxL.values())
    if vals and all(v > 0 for v in vals):
        return 'gift'
    if vals and all(v < 0 for v in vals):
        return 'mire'
    if len(fxR) >= 3 or len(fxL) >= 3:
        return 'complex'
    return 'balance'


def card(c, stage, rule):
    fxR, devR = effects(c['R'][0])
    fxL, devL = effects(c['L'][0])
    for sk, txt in (c.get('dev') or {}).items():
        d = effects(txt)[1]
        (devR if sk == 'R' else devL).update(d)
    o = {'id': c['id'], 'kind': KIND[c['kind']], 'stages': rule.get('stages', [stage]), 'rarity': RAR.get(c.get('rar', '보통'), 'common')}
    if c.get('yr'):
        o['year'] = c['yr']
    if rule.get('when'):
        o['conditions'] = [rule['when']]
    o['conditions_text'] = c.get('trig', '')
    if rule.get('trigger'):
        cid, side, n = rule['trigger']
        o['trigger'] = {'card': cid, 'after_n': n}
        if side:
            o['trigger']['side'] = side
    if rule.get('force'):
        o['force'] = True
    if c['kind'] == '사슬':
        o['chain'] = c.get('chain', '')
    o['who'] = {'name': c['who'], 'doll': role_of(c['who'])}
    o['line'] = c['line']
    o['choice_type'] = 'free'
    o['choices'] = {'right': {'label': c['Rl'], 'effects': fxR, 'this_run': c['R'][1]}, 'left': {'label': c['Ll'], 'effects': fxL, 'this_run': c['L'][1]}}
    if devR:
        o['choices']['right']['device'] = devR
    if devL:
        o['choices']['left']['device'] = devL
    o['grain'] = grain(fxR, fxL)
    if c.get('sa'):
        o['real_history'] = c['sa']
    o['out_of_textbook'] = bool(c.get('out'))
    o['sources'] = sources(c.get('src', ''))
    o['sources_text'] = c.get('src', '')
    if c.get('learn'):
        o['learn'] = c['learn']
    o['fx'] = {'note': c['fx']} if c.get('fx') else {}
    if c.get('note'):
        o['caution'] = c['note']
    return o


for st in STAGES:
    rules = RULE.get(st, {})
    out = [card(c, st, rules[c['id']]) for c in M if LETTER[st] in c['st'] and c['id'] in rules]
    missing = [c['id'] for c in M if LETTER[st] in c['st'] and c['id'] not in rules and not any(c['id'] in r and st in r[c['id']].get('stages', []) for r in RULE.values())]
    body = f"D.cards.push(...{json.dumps(out, ensure_ascii=False, indent=1)});"
    path = os.path.join(HERE, 'eras', 'joseon', 'data', st, 'v2.js')
    open(path, 'w', encoding='utf-8', newline='\n').write(f"""/* 설계서 v2의 사건 사슬·희귀 카드(작업/1A-카드데이터/cards_more.py)에서 tools/import-v2.py 로 만든 파일 — 직접 고치지 말 것.
 * 나오는 조건은 import-v2.py의 RULE 표(엔진 조건 식). 필드는 설계서 10-5 형식 + trigger(앞 카드의 선택이 부르는 사슬). */
(function () {{
  'use strict';
  const D = window.JK.eraData;
  {body}
}})();
""")
    print(st, len(out), '장:', ' '.join(o['id'] for o in out), ('· 규칙 없어 뺌: ' + ' '.join(missing)) if missing else '')
