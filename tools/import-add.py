# -*- coding: utf-8 -*-
"""집필 세션의 추가 카드 파일(add_<왕>.py)을 시대팩 데이터로 옮긴다 — 설계서에 아직 합쳐지지 않은 카드용.

  python tools/import-add.py 작업/1A-카드데이터/add_T.py taejo
  python tools/import-add.py 작업/1A-카드데이터/add_S.py sejong

- add_T.py는 읽기만 한다(runpy로 데이터만 꺼냄, 점검 코드는 돌리지 않음).
- 결과: eras/joseon/data/<왕>/more.js(카드) · quizzes-more.js(사관 퀴즈)
- 설계서에서 이미 가져온 id(tools/import-design.py가 만든 cards.js·quizzes.js)는 건너뛴다.
  그래서 설계서가 add_T.py를 합쳐 다시 만들어져도 카드가 두 번 들어가지 않는다.
- 연출표 줄(FX_T)은 아래 ADD_FX에서 카드 id별 연출(세울 것·치울 것·글자 빛·하늘 글씨)로 옮긴다.
"""
import os, re, sys, json, runpy

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC, STAGE = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else 'taejo')
OUT = os.path.join(HERE, 'eras', 'joseon', 'data', STAGE)
G = runpy.run_path(SRC if os.path.isabs(SRC) else os.path.join(HERE, SRC), run_name='add_data')
# 왕 글자: 원본 파일의 이름표(D_T·M_T… / D_S·M_S…)가 이 글자로 끝난다
LETTER = {'taejo': 'T', 'sejong': 'S', 'seonjo': 'J', 'yeongjo': 'Y', 'gojong': 'G'}[STAGE]
def part(name):
    return G.get(f'{name}_{LETTER}') or ([] if name != 'LAB' else {})

GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
GRAIN = {'저울': 'balance', '복합': 'complex', '선물': 'gift', '수렁': 'mire', '씨앗': 'seed', '도박': 'gamble'}
RAR = {'보통': 'common', '드묾': 'uncommon', '희귀': 'rare', '전설': 'legend'}
STATE = {'순조': 'smooth', '억지': 'forced', '늦게': 'late'}
SIDE = {'R': 'right', 'L': 'left'}
# 연출표 이름 → map.js 건물 키
BUILD = {'기와집 마을': 'giwa', '초가 마을': 'choga', '돌다리': 'bridge', '옛 궁궐(이름 없는 장식)': 'altPalace',
         '제사 터(이름 없는 장식)': 'altAltar', '옛 성벽(이름 없는 장식)': 'altOldWall', '작은 성균관(강당 하나)': 'altSmallSG'}
# 연출표에 더한 14줄(FX_T) → 카드 연출. build 세울 것 · remove 치울 것 · glyphs 건물 위 글자 빛 · skyText 하늘 글씨 · flash 잠깐 세웠다 치움
ADD_FX = {
    'RT04': {'build': ['munmyo']},                       # 문묘(대성전)
    'RT01': {'build': ['starStone']},                    # 천상열차분야지도 돌판
    'CT04a': {'glyphs': {'gyeongbok': '勤政殿'}},        # 전각 현판 금빛 글씨
    'CT04b': {'glyphs': {'gyeongbok': '思政殿'}},
    'CT04c': {'glyphs': {'gyeongbok': '康寧殿'}},
    'CT01a': {'build': ['gyeryong']},                    # 계룡산 공사터(섬 남쪽 끝)
    'CT01b': {'remove': ['gyeryong']},                   # 눈에 덮여 사라짐
    'CT02a': {'build': ['muak']},                        # 무악 고개
    'CT02b': {'remove': ['muak']},                       # 구름 속으로
    'LT01': {'build': ['wihwa']},                        # 위화도(강 가운데 모래섬, 깃발 행렬이 돌아섬)
    'CT09a': {'skyText': '高麗'},                         # 깃발 글자 高麗 → 朝鮮
    'CT09c': {'skyText': '朝鮮'},
    'DT119': {'glyphs': {'wall': '✦'}},                  # 성돌 글자(내용은 쓰지 않음)
    'RT02': {'skyText': '漢城府'},
    'LT02': {'flash': 'altPalace'},                      # 수창궁(이름표 없는 옛 궁궐이 잠깐)
}
for i in range(111, 121):
    ADD_FX.setdefault(f'DT{i}', {})['build'] = ['workyard']   # 공사장(비계·가마·돌산·흙더미): 공사철에만, T08에서 치움
SIDE_BUILD = {('AT04', 'R'): ['gateFence']}              # 성 없는 문 옆 울타리
# 새 인물 인형(DOLL_T) — 이름으로 고른다
DOLL = [('하륜', 'haryun'), ('권근', 'gwongeun'), ('배극렴', 'baegeuk'), ('조준', 'jojun'), ('이두란', 'idoran'),
        ('정몽주', 'jeongmongju'), ('무학', 'muhak'), ('여진 추장', 'jurchen'),
        ('이성계 곁의 장수', 'general'), ('이성계 부대의 군관', 'general')]
CRAFT = ['사공', '석수', '기와장이', '목수', '나무꾼', '대목장', '장인', '일꾼', '석수 우두머리']


def role_of(n, cid):
    for k, v in DOLL:
        if k in n:
            return v
    if any(k in n for k in CRAFT):
        return 'craftsman'
    if n == '사관':
        return 'sagwan'
    if n == '정도전':
        return 'jeong'
    if n.startswith('이방원'):
        return 'bangwon'
    if '유생' in n:
        return 'yusaeng'
    if any(k in n for k in ['역관', '의원', '화원']):
        return 'jungin'
    if '노비' in n:
        return 'nobi'
    if any(k in n for k in ['상인', '보부상', '장사']):
        return 'merchant'
    if any(k in n for k in ['상궁', '궁녀', '중전', '부인', '여성', '나인', '할머니']):
        return 'courtlady'
    if '아이' in n and '아버지' not in n:
        return 'child'
    if any(k in n for k in ['농민', '농부', '장정', '상민', '혼례 집', '백성', '이장']):
        return 'farmer'
    if any(k in n for k in ['선비', '양반', '훈장', '집안 어른', '아버지']):
        return 'yangban'
    if '내관' in n:
        return 'naegwan'
    if any(k in n for k in ['장수', '군관', '수문장', '문지기', '군사']):
        return 'general'
    return ['official_blue', 'official_green', 'official_red'][sum(map(ord, n)) % 3]


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
        before = raw[: m.start()]
        name = re.split(r'[·/]|]|근거:', before)[-1].strip()
        name = re.sub(r'https?://\S+', '', name).strip() or '출처'
        out.append({'type': 'web', 'title': name[:40], 'url': url})
    return out


def against_side(o):
    if o.get('choice_type') != 'oppose':
        return None
    for side in ('right', 'left'):
        if '지만' in o['choices'][side].get('this_run', '').split('→')[0]:
            return side
    return None


def side(label, eff_txt, this_run, gam=None, key=None):
    s = {'label': label, 'effects': {} if (eff_txt or '').strip() == '?' else effects(eff_txt), 'this_run': this_run}
    return s


def base_card(c, kind, labels):
    o = {'id': c['id'], 'kind': kind, 'stages': [STAGE]}
    o['rarity'] = RAR.get(c.get('rar', '보통'), 'common')
    if c.get('yr'):
        o['year'] = c['yr']
    if c.get('when'):
        w = c['when']
        # 담임 판단 ④: 전설 조건 '기록관 20권'은 판 수가 아니라 기록관 권수(완주·실각 기록 수)
        if kind == 'legend':
            w = w.replace('run_count', 'archive_count')
        o['conditions'] = [w]
    if c.get('trig') or c.get('cond'):
        o['conditions_text'] = c.get('trig') or c.get('cond')
    o['who'] = {'name': c['who'], 'doll': role_of(c['who'], c['id'])}
    o['line'] = c['line']
    typ = c.get('typ', '')
    o['choice_type'] = 'oppose' if typ == '반대' else 'how' if (typ == '방식' and c.get('sa')) else 'free'
    R, L = c['R'], c['L']
    o['choices'] = {'right': side(labels[0], R[0], R[1]), 'left': side(labels[1], L[0], L[1])}
    for k, sk in (('R', 'right'), ('L', 'left')):
        b = [BUILD.get(x, x) for x in (c.get('build') or [])] + SIDE_BUILD.get((c['id'], k), [])
        if b:
            o['choices'][sk]['build'] = b
        st = (c.get('bs') or {}).get(k)
        if st and b:
            o['choices'][sk]['build_state'] = STATE[st]
    ag = against_side(o)
    if ag:
        o['against'] = ag
    if c.get('grain'):
        o['grain'] = GRAIN[c['grain']]
    if c.get('seed'):
        s = c['seed']
        o['seed'] = {'fruit_id': s['fruit'], 'after_n': s['after'], 'side': SIDE[s.get('side', 'R')]}
    if c.get('gamble'):
        gm = c['gamble']
        o['gamble'] = {'side': SIDE[gm['side']], 'win': {'effects': effects(gm['win'][0]), 'this_run': gm['win'][1]},
                       'lose': {'effects': effects(gm['lose'][0]), 'this_run': gm['lose'][1]}}
    if c.get('chain_next'):
        o['chain_next'] = {'card': c['chain_next'][0], 'after_n': c['chain_next'][1]}
    if c.get('sa'):
        o['real_history'] = c['sa']
    o['out_of_textbook'] = bool(c.get('out'))
    o['sources'] = sources(c.get('src', ''))
    o['sources_text'] = c.get('src', '')
    if '일반 상황' in c.get('src', ''):
        o['general'] = True
    if c.get('learn'):
        o['learn'] = c['learn']
    fx = dict(ADD_FX.get(c['id'], {}))
    if c.get('fx'):
        fx['note'] = c['fx']
    o['fx'] = fx
    if c.get('caution'):
        o['caution'] = c['caution']
    if c.get('note'):
        o['note'] = c['note']
    # 왕별 장치(세종 발명 진행도): dev = {'R': '발+1'} → choices.right.device = {invention: 1}
    for k, sk in (('R', 'right'), ('L', 'left')):
        dv = {}
        for g, sign, n in re.findall(r'([발저개])\s*([+\-−])\s*(\d+)', (c.get('dev') or {}).get(k, '')):
            dv[{'발': 'invention', '저': 'scale', '개': 'open'}[g]] = int(n) * (-1 if sign in '-−' else 1)
        if dv:
            o['choices'][sk]['device'] = dv
    # 앞 카드의 선택이 부르는 사슬(엔진 trigger 칸): (카드, 'R'|'L'|None, n장 뒤)
    if c.get('trigger'):
        tc, ts, tn = c['trigger']
        o['trigger'] = {'card': tc, 'after_n': tn}
        if ts:
            o['trigger']['side'] = SIDE[ts]
    return o


def existing_ids():
    ids = set()
    for f in ('cards.js', 'quizzes.js'):
        p = os.path.join(OUT, f)
        if os.path.exists(p):
            ids |= set(re.findall(r'"id": "([A-Z]+\d+[a-z0-9]*)"', open(p, encoding='utf-8').read()))
    p = os.path.join(HERE, 'eras', 'joseon', 'data', 'common', 'daily.js')
    if os.path.exists(p):
        ids |= set(re.findall(r'"id": "([A-Z]+\d+[a-z0-9]*)"', open(p, encoding='utf-8').read()))
    return ids


have = existing_ids()
cards, skipped = [], []
# 일상(DT…)
for c in part('D'):
    o = base_card(c, 'daily', part('LAB')[c['id']])
    if c.get('star'):
        o['required_in'] = STAGE
    cards.append(o)
# 사슬·희귀·전설
KIND = {'사슬': 'chain', '희귀': 'rare', '전설': 'legend'}
for c in part('M'):
    o = base_card(c, KIND[c['kind']], (c['Rl'], c['Ll']))
    if c['kind'] == '사슬':
        o['chain'] = c.get('chain', '')
    # 꼭 나와야 하는 사슬 시작('반드시', '바로 앞')은 조건이 맞는 순간 다음 자리에 끼운다
    if re.search(r'반드시|바로 앞', c.get('trig', '')) and not c.get('trigger'):
        o['force'] = True
    cards.append(o)
# 다른 길: 변형판(원래 역사 카드 대신) · 전용 카드(조건이 맞으면 끼어듦) · 열매
for c in part('A'):
    if c['kind'] == '변형판':
        o = base_card(c, 'history', (c['Rl'], c['Ll']))
        o['variant_of'] = c['base']
        o['choice_type'] = 'how'
        o['event_type'] = 'normal' if c.get('real_path') else 'variant'
    else:
        o = base_card(c, 'alt', (c['Rl'], c['Ll']))
        if not c['id'].endswith('f'):
            o['force'] = True
    if c.get('real_note'):
        o['real_note'] = c['real_note']
    o['alt_only'] = True
    cards.append(o)
# 위기 카드(K_T)는 설계서 10-8-5에서 이미 가져온다 — id가 없을 때만
for c in part('K'):
    if c['id'] not in have:
        skipped.append(c['id'] + '(위기: 설계서에 없음 — 넣지 않음)')

out = []
for o in cards:
    if o['id'] in have:
        skipped.append(o['id'])
        continue
    out.append(o)
# 변형판의 순서·사건 이름은 원래 카드를 따른다
base_cards = {}
p = os.path.join(OUT, 'cards.js')
for m in re.finditer(r'\{\s*"id": "(' + LETTER + r'\d\d)",\s*"kind": "history".*?"order": (\d+)', open(p, encoding='utf-8').read(), re.S):
    base_cards[m.group(1)] = int(m.group(2))
for o in out:
    if o.get('variant_of'):
        o['order'] = base_cards.get(o['variant_of'], 0)

qq = []
for q in part('Q'):
    qid, question, ans, w1, w2, src, outside = q
    if qid in have:
        skipped.append(qid)
        continue
    e = {'id': qid, 'stage': STAGE, 'question': re.sub(r'^\[교과서 밖\]\s*', '', question), 'answer': ans, 'wrong': [w1, w2],
         'sources': sources(src), 'sources_text': src, 'out_of_textbook': bool(outside), 'checked_against_review_site': True}
    qq.append(e)


def js(body):
    return f"""/* 집필 세션의 {os.path.basename(SRC)}에서 tools/import-add.py 로 만든 파일 — 직접 고치지 말고 원본을 고친 뒤 다시 만든다.
 * 설계서에 합쳐지면 tools/import-design.py가 같은 id를 가져오고, 이 파일에서는 빠진다. 필드는 설계서 10-5 형식. */
(function () {{
  'use strict';
  const D = window.JK.eraData;
  {body}
}})();
"""


open(os.path.join(OUT, 'more.js'), 'w', encoding='utf-8', newline='\n').write(js(f"D.cards.push(...{json.dumps(out, ensure_ascii=False, indent=1)});"))
open(os.path.join(OUT, 'quizzes-more.js'), 'w', encoding='utf-8', newline='\n').write(js(f"D.quizzes.push(...{json.dumps(qq, ensure_ascii=False, indent=1)});"))
from collections import Counter
print(f'카드 {len(out)}장', dict(Counter(o['kind'] for o in out)), f'· 퀴즈 {len(qq)}문항 · 건너뜀 {len(skipped)}', ', '.join(skipped[:12]))
print('인형:', dict(Counter(o['who']['doll'] for o in out)))
