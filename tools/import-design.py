"""설계서.md(정본) → 시대팩 데이터(eras/joseon/data/*.js)

    python tools/import-design.py [왕 id ...]      (기본: taejo)

결과(설계서 10-5 필드): eras/joseon/data/<왕>/cards.js · quizzes.js, data/common/daily.js · records.js

설계서의 글을 손으로 옮기지 않고 이 스크립트로 옮긴다. 글을 고칠 일이 생기면 설계서를 고치고 다시 돌린다.
화면 연출(세워지는 건물·건물 상태·하늘 글씨 등)처럼 설계서 표에 기계로 읽을 칸이 없는 것은 아래 STAGE_FX에 적는다.
만든 뒤: node tools/check-data.mjs → python tools/subset-fonts.py tools/fonts-src
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGN = os.path.join(HERE, '설계서.md')
OUT = os.path.join(HERE, 'eras', 'joseon', 'data')
STAGES = sys.argv[1:] or ['taejo']

KING = {'태조': 'taejo', '세종': 'sejong', '선조·인조': 'seonjo', '영조·정조': 'yeongjo', '고종': 'gojong'}
PREFIX = {'taejo': 'T', 'sejong': 'S', 'seonjo': 'J', 'yeongjo': 'Y', 'gojong': 'G'}
GAUGE = {'백': 'people', '반': 'nobles', '고': 'treasury', '방': 'army'}
DEVICE = {'발': 'invention', '저': 'scale', '개': 'open'}
STATE = {'순조롭게': 'smooth', '억지로': 'forced', '늦게': 'late'}
# 결(10-9). 설계서에 "결:" 줄이 있으면 그것을, 없으면 10-9-2의 셈 방법으로 정한다
GRAIN = {'저울형': 'balance', '복합형': 'complex', '선물형': 'gift', '수렁형': 'mire', '씨앗형': 'seed', '도박형': 'gamble'}
CHAIN_OPENERS = {'T07', 'S01', 'S05', 'S06', 'S07', 'SX3', 'J02', 'J04', 'Y03', 'Y09', 'Y10', 'G02', 'G09', 'GX2'}


def grain_of(c):
    if c.get('grain'):
        return c['grain']
    if c['id'] in CHAIN_OPENERS:
        return 'seed'
    fx = [c[s]['fx'] for s in ('right', 'left') if s in c]
    if not fx:
        return None
    vals = [v for f in fx for v in f.values()]
    if vals and all(all(v > 0 for v in f.values()) and f for f in fx):
        return 'gift'
    if vals and all(all(v < 0 for v in f.values()) and f for f in fx):
        return 'mire'
    if any(len(f) >= 3 for f in fx):
        return 'complex'
    return 'balance'

# 설계서 7장(연출표)·7-4(건물 상태)를 따라 카드마다 세우는 것과 연출
STAGE_FX = {
    'T00': {'fx': {'prebuilt': True}},
    'T02': {'fx': {'flag': True}},
    'T03': {'fx': {'skyText': '조선'}},
    'T04': {'build': ['giwa'], 'fx': {'boats': True}},
    'T05': {'build': ['gyeongbok']},
    'T06': {'build': ['jongmyo', 'sajik']},
    'T07': {'build': ['wall', 'heungin', 'donui', 'sungnye', 'sukjeong'], 'fx': {'glyphs': {'heungin': '仁', 'donui': '義', 'sungnye': '禮'}}},
    'T08': {'build': ['seonggyun']},
    'T09': {'fx': {'dusk': True}},
    'D001': {'build': ['seodang']},
    'D003': {'build': ['hyanggyo']},
    'D018': {'build': ['bridge']},
    'D112': {'build': ['reservoir']},
    'D122': {'build': ['seowon']},
    'D131': {'build': ['hakdang']},
}

src = open(DESIGN, encoding='utf-8').read()
if not re.search(r'^v2\b', src, re.M):
    sys.exit('설계서에 "v2" 줄이 없다 — 1A 세션이 v2를 끝낸 뒤 돌린다')


def effects(s):
    fx, dev = {}, {}
    for k, sign, n in re.findall(r'([백반고방발저개])\s*([+\-−])\s*(\d+)', s):
        v = int(n) * (-1 if sign in '-−' else 1)
        if k in GAUGE:
            fx[GAUGE[k]] = v
        else:
            dev[DEVICE[k]] = v
    return fx, dev


def sources(raw):
    """근거 칸 → [{book,page,tb} | {site,url}] (+ 원문)"""
    out = []
    for m in re.finditer(r'지도서\s*(\d+(?:[~∼]\d+)?)(?:\(교과서\s*(\d+(?:[~∼]\d+)?)[^)]*\))?', raw):
        e = {'book': '지도서', 'page': m.group(1)}
        if m.group(2):
            e['tb'] = m.group(2)
        out.append(e)
    # "지도서 233(...) · 238" 처럼 이어진 쪽 번호
    for m in re.finditer(r'[·/]\s*(\d{3})(?:\(교과서\s*(\d+)[^)]*\))?(?=[\s(가-힣]|$)', raw):
        e = {'book': '지도서', 'page': m.group(1)}
        if m.group(2):
            e['tb'] = m.group(2)
        if e not in out:
            out.append(e)
    for m in re.finditer(r'(https?://\S+)', raw):
        url = m.group(1).rstrip('·,)')
        before = raw[: m.start()]
        name = re.split(r'[·/]|]|근거:', before)[-1].strip() or '출처'
        name = re.sub(r'https?://\S+', '', name).strip()
        out.append({'site': name[:40] or '출처', 'url': url})
    return out


def block_cards():
    cards = []
    for m in re.finditer(r'\*\*([A-Z]\d{2})\*\* · ([^\n]+)\n```\n(.*?)\n```', src, re.S):
        cid, head, body = m.group(1), m.group(2), m.group(3)
        if cid[0] not in [PREFIX[s] for s in STAGES]:
            continue
        stage = [s for s in STAGES if PREFIX[s] == cid[0]][0]
        kind = head.split('·')[0].strip()
        year = head.split('·')[1].strip() if '·' in head else ''
        year = re.sub(r'`\[교과서 밖\]`', '', year).strip()
        c = {'id': cid, 'stage': stage, 'type': 'scroll' if kind == '사관' else 'history', 'order': int(cid[1:])}
        if year:
            c['year'] = year
        if '[교과서 밖]' in head:
            c['outside'] = True
        lines = body.split('\n')
        cur = None
        for ln in lines:
            s = ln.strip()
            if s.startswith('인물:'):
                c['whoName'] = re.sub(r'\s*\(.*\)$', '', s[3:].strip())
            elif s.startswith('대사:'):
                c['text'] = s[3:].strip().strip('"“”')
            elif s.startswith('고르는 것:'):
                c['choice'] = 'oppose' if '반대' in s else 'how'
            elif s.startswith('→') or s.startswith('←'):
                side = 'right' if s.startswith('→') else 'left'
                lm = re.match(r'[→←]\s*\[([^\]]+)\]\s*(.*)', s)
                fx, dev = effects(lm.group(2))
                c[side] = {'label': lm.group(1).strip(), 'fx': fx}
                if dev:
                    c[side]['dev'] = dev
                cur = c[side]
            elif s.startswith('이번 판에서:') and cur is not None:
                cur['result'] = s[len('이번 판에서:'):].strip().strip('"“”')
            elif s.startswith('건물 상태:') and cur is not None:
                for k, v in STATE.items():
                    if s[len('건물 상태:'):].strip().startswith(k):
                        cur['state'] = v
            elif s.startswith('실제 역사'):
                c['record'] = s.split(':', 1)[1].strip().strip('"“”')
            elif s.startswith('근거:'):
                c['sourceText'] = s[3:].strip()
                c['source'] = sources(s[3:])
            elif s.startswith('배움 포인트:'):
                c['learn'] = s.split(':', 1)[1].strip()
            elif s.startswith('연출:'):
                c['direction'] = s[3:].strip()
            elif s.startswith('주의:'):
                c['note'] = s[3:].strip()
            elif s.startswith('↑ 다른 길'):
                am = re.match(r'↑ 다른 길 \[([^\]]+)\].*?이번 판에서:\s*(.*?)\s*→\s*실제 역사와 달라졌어요', s)
                if am:
                    c['altLine'] = {'label': am.group(1).strip(), 'this_run': am.group(2).strip().rstrip('.') + '.'}
            elif s.startswith('결:'):
                g = s[2:].strip().split()[0] if s[2:].strip() else ''
                if g in GRAIN:
                    c['grain'] = GRAIN[g]
            elif s.startswith('(선택 없음'):
                mm = re.search(r'‘([^’]+)’', s)
                c['single'] = mm.group(1) if mm else '기록을 넘긴다'
        c.update(STAGE_FX.get(cid, {}))
        cards.append(c)
    return cards


def daily_cards():
    out = []
    for ln in src.split('\n'):
        if not re.match(r'\|\s*D\d{3}\s*\|', ln):
            continue
        cells = [x.strip() for x in ln.strip().strip('|').split('|')]
        if len(cells) < 9:
            continue
        did, kings_raw, who, text, right, left, basis, learn, direction = cells[:9]
        kings = [KING[k] for k in KING if re.search(r'(^|\s)' + re.escape(k) + r'(\s|$|·\s)', kings_raw.split('**')[0] + ' ')]
        if not any(s in kings for s in STAGES):
            continue
        c = {'id': did, 'type': 'daily', 'daily': {'kings': kings}}
        req = re.search(r'★(\S+?) 필수', kings_raw)
        if req:
            c['daily']['required'] = KING.get(req.group(1), req.group(1))
        cond = re.search(r'조건:\s*([^|]+)$', kings_raw)
        if cond:
            c['daily']['cond'] = cond.group(1).strip()
        if '[교과서 밖]' in who or '[교과서 밖]' in basis:
            c['outside'] = True
        c['whoName'] = re.sub(r'`?\[교과서 밖\]`?', '', who).strip()
        c['text'] = text
        for side, cell in (('right', right), ('left', left)):
            lm = re.match(r'\*\*\[([^\]]+)\]\*\*\s*(.*?)\s+—\s+(.*)$', cell)
            if not lm:
                raise SystemExit(f'{did} {side} 칸을 못 읽음: {cell}')
            fx, dev = effects(lm.group(2))
            c[side] = {'label': lm.group(1).strip(), 'fx': fx, 'result': lm.group(3).strip()}
            if dev:
                c[side]['dev'] = dev
        c['sourceText'] = basis
        if basis.startswith('일반 상황'):
            c['general'] = True
        c['source'] = sources(basis)
        if learn and learn != '-':
            c['learn'] = learn
        c['direction'] = direction
        c.update(STAGE_FX.get(did, {}))
        out.append(c)
    return out


def quizzes():
    out = []
    for ln in src.split('\n'):
        m = re.match(r'\|\s*(Q([A-Z])\d+)\s*\|(.*)\|\s*$', ln)
        if not m:
            continue
        stage = [s for s in STAGES if PREFIX[s] == m.group(2)]
        if not stage:
            continue
        cells = [x.strip() for x in m.group(3).split('|')]
        q, ans, wrong, basis = cells[0], cells[1].strip('*'), cells[2], cells[3]
        e = {'id': m.group(1), 'stage': stage[0], 'q': re.sub(r'^\[교과서 밖\]\s*', '', q), 'answer': ans, 'wrong': [w.strip() for w in wrong.split(' / ')]}
        if q.startswith('[교과서 밖]'):
            e['outside'] = True
        e['sourceText'] = basis
        e['source'] = sources(basis)
        if not e['source']:
            # "설계서 T09", "(T03)"처럼 카드를 가리키면 그 카드의 출처를 쓴다
            ref = re.findall(r'([A-Z]\d{2})', basis)
            e['source'] = [x for c in CARDS_BY_ID.get(ref[0], {}).get('source', []) for x in [c]] if ref else []
        out.append(e)
    return out


def table_after(title):
    i = src.index(title)
    rows = []
    for ln in src[i:].split('\n')[1:]:
        if ln.startswith('#') and rows:
            break
        if ln.startswith('|') and not ln.startswith('|---'):
            rows.append([x.strip() for x in ln.strip().strip('|').split('|')])
        elif rows and not ln.strip():
            break
    return rows[1:]


def records():
    falls = []
    gmap = {'백성': 'people', '양반': 'nobles', '국고': 'treasury', '국방': 'army'}
    # v3(10-8): 실각은 위기 사건에서 무너졌을 때. id는 예전 저장과 맞도록 people0(낮음)·people100(높음)
    for r in table_after('**실각 기록 (도감'):
        m = re.match(r'(백성|양반|국고|국방) (낮음|높음|0|100)', r[0])
        if m:
            at = 0 if m.group(2) in ('낮음', '0') else 100
            falls.append({'id': gmap[m.group(1)] + str(at), 'gauge': gmap[m.group(1)], 'at': at, 'side': 'low' if at == 0 else 'high', 'name': r[1], 'text': r[2]})
        elif r[0].startswith('붕당'):
            falls.append({'id': 'faction', 'gauge': 'faction', 'at': 0, 'name': r[1], 'text': r[2], 'stages': ['yeongjo']})
    rules = {'아슬아슬 줄타기': 'edgeClear', '위기를 넘긴 임금': 'held5', '벼랑 끝의 임금': 'heldAtEnd', '같은 위기는 두 번 없다': 'cancel3'}
    titles = []
    for r in table_after('### 4-2. 엔딩 칭호'):
        if not r[0].isdigit():
            continue
        titles.append({'id': 'title' + r[0].zfill(2), 'name': r[1], 'hint': r[3] if r[3] != '—' else '', 'cond': r[2], 'rule': rules.get(r[1], 'later')})
    # 다른 길 칭호 (10-10-6): 실록과 같이 / 다른 조선 / 다른 길마다 / 갈림길 탐험가
    if '#### 10-10-6.' in src:
        ahint = {'allReal': '실제 역사의 길을 끝까지', 'alt5': '다른 길을 여러 번', 'explorer': '갈림길을 모두 걸어 보라'}
        for r in table_after('#### 10-10-6.'):
            if len(r) < 2:
                continue
            for name in [x.strip() for x in r[0].split('·')]:
                rule = {'실록과 같이': 'allReal', '다른 조선': 'alt5', '갈림길 탐험가': 'explorer'}.get(name)
                if not rule and name in ALT_TITLES:
                    rule = 'flag:' + ALT_TITLES[name]
                if not rule:
                    continue
                titles.append({'id': 'path-' + rule.replace(':', '-'), 'name': name, 'hint': ahint.get(rule, '이번 판의 다른 길'), 'cond': r[1], 'rule': rule})
    # 진엔딩 칭호(난이도별, 10-11-3) · 다른 역사 칭호(10-11-6)
    if '#### 10-11-3.' in src:
        for r in table_after('#### 10-11-3.'):
            if r[0].startswith('칭호'):
                for d, name in zip(DIFFS, re.findall(r'「([^」]+)」', r[1])):
                    titles.append({'id': 'true-' + d, 'name': name, 'hint': '다섯 왕의 사건을 모두 실제대로', 'cond': f'진엔딩({d})', 'rule': 'true:' + d})
    if '#### 10-11-6.' in src:
        other = {'새 길을 연 임금': 'alt10', '다섯 갈래의 임금': 'altEvery', '반쯤 같은 실록': 'half'}
        ohint = {'alt10': '다른 길을 아주 많이', 'altEvery': '왕마다 다른 길 하나씩', 'half': '반은 같고 반은 다르게'}
        for r in table_after('#### 10-11-6.'):
            name = r[0].replace('*', '').strip()
            if name in other:
                titles.append({'id': 'other-' + other[name], 'name': name, 'hint': ohint[other[name]], 'cond': r[1], 'rule': other[name]})
    # 위기 칭호 3개 (10-8-7). 힌트는 설계서에 없어 조건을 짧게 가린 말로 둔다
    hint = {'held5': '위기를 여러 번 넘겨 보라', 'heldAtEnd': '끝에서 돌아온 임금', 'cancel3': '버틴 뒤 바로 고쳐라'}
    for r in table_after('#### 10-8-7.'):
        if r[0] == '칭호':
            rule = rules.get(r[1], 'later')
            titles.append({'id': 'crisis-' + rule, 'name': r[1], 'hint': hint.get(rule, ''), 'cond': r[2], 'rule': rule})
    codex = []
    for r in table_after('**인물 도감'):
        if len(r) < 4:
            continue
        codex.append({'id': 'p-' + str(len(codex) + 1).zfill(2), 'cat': '인물', 'name': r[0], 'band': r[1], 'opens': ids(r[2]), 'desc': r[3], 'outside': '교과서 밖' in r[1]})
    for r in table_after('**유물·건축 도감'):
        if len(r) < 3:
            continue
        codex.append({'id': 'a-' + str(len(codex) + 1).zfill(3), 'cat': '유물·건축', 'name': r[0], 'band': r[1], 'opens': ids(r[2]), 'outside': '교과서 밖' in r[1]})
    return falls, titles, codex


def ids(s):
    out = []
    for a, b in re.findall(r'([A-Z]{1,2}\d{1,3}[a-z]?)(?:~([A-Z]{1,2}\d{1,3}))?', s):
        out.append(a)
        pre = re.match(r'[A-Z]+', a).group(0)
        if b and not b.startswith(pre) or b and not b[len(pre):].isdigit():
            out.append(b)
        elif b:
            for n in range(int(a[len(pre):]) + 1, int(b[len(pre):]) + 1):
                out.append(pre + str(n).zfill(len(a) - len(pre)))
    return out


# ---------- 인물 인형: 이름 → 인형 (7-3 표의 신분별 모자·옷) ----------
def role_of(name, cid):
    n = name
    if cid == 'T00' or n == '사관':
        return 'sagwan'
    if n == '정도전':
        return 'jeong'
    if n.startswith('이방원'):
        return 'bangwon'
    if '유생' in n:
        return 'yusaeng'
    if any(k in n for k in ['역관', '의원', '화원']):
        return 'jungin'
    if any(k in n for k in ['노비']):
        return 'nobi'
    if any(k in n for k in ['상인', '보부상', '장사']):
        return 'merchant'
    if any(k in n for k in ['상궁', '궁녀', '중전', '부인', '여성']):
        return 'courtlady'
    if '아이' in n and '아버지' not in n:
        return 'child'
    if any(k in n for k in ['농민', '장정', '상민', '혼례 집', '백성']):
        return 'farmer'
    if any(k in n for k in ['선비', '양반', '훈장', '집안 어른', '아버지']):
        return 'yangban'
    if '내관' in n:
        return 'naegwan'
    # 나머지(신하·관리·수령·판서·스승 등)는 사모·단령 관리. 색은 이름으로 고르게 나눈다
    return ['official_blue', 'official_green', 'official_red'][sum(map(ord, n)) % 3]


def js(body):
    return f"""/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다.
 * 필드는 설계서 10-5 형식이다(스키마: eras/joseon/data/스키마.md). */
(function () {{
  'use strict';
  const D = window.JK.eraData;
  {body}
}})();
"""


def src105(lst):
    out = []
    for s in lst:
        if s.get('url') is not None and 'site' in s:
            out.append({'type': 'web', 'title': s['site'], 'url': s['url']})
        else:
            e = {'type': 'guide', 'page': s['page']}
            if s.get('tb'):
                e['tb'] = s['tb']
            out.append(e)
    return out


def against_side(c):
    # 반대가 있는 카드(oppose): 결과가 "~했지만 →"로 시작하는 쪽이 역사를 거스른 선택이다
    if c.get('choice') != 'oppose':
        return None
    for side in ('right', 'left'):
        first = c[side].get('result', '').split('→')[0]
        if '지만' in first:
            return side
    return None


def to105(c):
    o = {'id': c['id']}
    o['kind'] = {'scroll': 'sagwan', 'history': 'history', 'daily': 'daily'}[c['type']]
    o['stages'] = [c['stage']] if 'stage' in c else c['daily']['kings']
    if 'order' in c:
        o['order'] = c['order']
    if c.get('daily', {}).get('required'):
        o['required_in'] = c['daily']['required']
    if c.get('daily', {}).get('cond'):
        o['conditions_text'] = c['daily']['cond']
    if c['type'] == 'daily':
        o['rarity'] = 'common'
    if c.get('year'):
        o['year'] = c['year']
    o['who'] = {'name': c.get('whoName') or '', 'doll': c['who']}
    o['line'] = c['text']
    if c.get('single'):
        o['single'] = c['single']
    else:
        o['choice_type'] = c.get('choice') or 'free'
        o['choices'] = {}
        for side in ('right', 'left'):
            s = c[side]
            ch = {'label': s['label'], 'effects': s['fx']}
            if s.get('dev'):
                ch['device'] = s['dev']
            if s.get('result'):
                ch['this_run'] = s['result']
            if c.get('build'):
                ch['build'] = c['build']
                if s.get('state'):
                    ch['build_state'] = s['state']
            o['choices'][side] = ch
        ag = against_side(c)
        if ag:
            o['against'] = ag
    g = grain_of(c) if not c.get('single') else None
    if g:
        o['grain'] = g
    if c['type'] == 'history':
        o['event_type'] = EVENT_TYPE.get(c['id'], 'normal')
    if c['id'] in ALT and c['type'] == 'history':
        p = json.loads(json.dumps(ALT[c['id']]))
        o['event'] = p.pop('event')
        for a in p['alt']:
            line = c.get('altLine') or {}
            tr = line.get('this_run') or a['result_text'].split('.')[0] + '.'
            # 설계서 줄에 섞인 설계 메모(뒤 카드·스테이지·위기 배율)는 화면 글에서 뺀다 — 아이용 문장은 집필 때 따로
            parts = [x.strip() for x in tr.rstrip('.').split(',') if not re.search(r'카드|스테이지|위기 ×|×\d', x)]
            a['this_run'] = (', '.join(parts) or tr.rstrip('.')) + '.'
            a.pop('result_text', None)
        p['real'].update(REQUIRE.get(c['id'], {}))
        p['real']['how_right'] = c['right']['label']
        p['real']['how_left'] = c['left']['label']
        o['paths'] = p
    if c.get('record'):
        o['real_history'] = c['record']
    o['out_of_textbook'] = bool(c.get('outside'))
    o['sources'] = src105(c.get('source', []))
    if c.get('sourceText'):
        o['sources_text'] = c['sourceText']
    if c.get('general'):
        o['general'] = True
    if c.get('learn'):
        o['learn'] = c['learn']
    fx = dict(c.get('fx', {}))
    if c.get('build'):
        fx['build'] = c['build']
    if c.get('direction'):
        fx['note'] = c['direction']
    o['fx'] = fx
    if c.get('note'):
        o['caution'] = c['note']
    return o


# ---------- 역사 분기 (10-10-3): 다른 길 ----------
# 표의 열림·잠김 조건(한국어)을 조건 식(engine/cond.js)으로 옮긴 것과, 표에 적힌 섬 모습(10-10-7)을 건물 키로 옮긴 것.
# 표의 글(버튼·이유·이번 판·플래그·합류 문장)은 아래 alt_paths()가 설계서에서 직접 읽는다.
#  reason_auto: 설계서에 잠김 이유 문장이 없어 엔진 화면용으로 지은 짧은 문장(담임 확인 필요)
ALT_FX = {
    # T01·T02는 판 맨 앞이라 앞에 놓이는 카드가 적다 → 난이도별로 낮춘다(담임 제보 2026-10-21, 새싹은 도움 되는 카드 한 장이면 열림).
    # T01 앞에는 T00 뒤 무작위 칸 2개가 꼭 놓인다(era.js slotsBefore). 실록 도전은 설계서 원래 값
    'T01': {'unlock': {'sprout': 'gauge(nobles) >= 52 && gauge(army) <= 55', 'normal': 'gauge(nobles) >= 56 && gauge(army) <= 50',
                       'sage': 'gauge(nobles) >= 58 && gauge(army) <= 50', 'annals': 'gauge(nobles) >= 60 && gauge(army) <= 50'}, 'variants': {'T02': 'T02v1'}},
    'T02': {'unlock': {'sprout': 'gauge(people) >= 55', 'normal': 'gauge(people) >= 57', 'sage': 'gauge(people) >= 60', 'annals': 'gauge(people) >= 60'},
            'build': ['altTemple'], 'variants': {'T08': 'T08v1'}},
    'T03': {'unlock': 'gauge(nobles) >= 55'},
    'T04': {'unlock': 'gauge(treasury) <= 35 || gauge(nobles) >= 65', 'build': ['altPalace'],
            'lock_right': {'when': 'gauge(treasury) < 20', 'reason': '곳간이 비어 도읍을 옮길 수 없다'},
            'lock_left': {'when': 'gauge(treasury) < 20', 'reason': '곳간이 비어 도읍을 옮길 수 없다'},
            'variants': {'T05': 'T05v1', 'T06': 'T06v1', 'T07': 'T07v1'}},
    'T05': {'unlock': 'gauge(treasury) <= 30 || gauge(people) <= 30', 'build': ['altPalace'], 'skip': ['CT04'],
            'lock_right': {'when': 'gauge(treasury) < 15', 'reason': '곳간이 모자라 크게 지을 수 없다', 'reason_auto': True}},
    'T06': {'unlock': 'gauge(nobles) <= 35', 'crisis_mult': {'nobles:low': 1.3}},
    'T07': {'unlock': 'gauge(army) >= 70', 'build': ['heungin', 'donui', 'sungnye', 'sukjeong'], 'crisis_mult': {'army:low': 1.5}, 'skip': ['CT05', 'C01a'],
            'lock_right': {'when': 'gauge(people) < 20', 'reason': '백성이 너무 지쳤다'}},
    'T08': {'unlock': 'gauge(people) >= 55', 'build': ['altHyanggyo']},
    'T09': {'unlock': 'gauge(nobles) >= 45 && gauge(army) >= 45 && gauge(army) <= 65 && !flag(F_정몽주)'},
}
FULL_GAUGE = {'백성': 'people', '양반': 'nobles', '국고': 'treasury', '국방': 'army'}


def alt_paths():
    out, titles_by_flag = {}, {}
    if '#### 10-10-3.' not in src:
        return out, titles_by_flag
    for r in table_after('#### 10-10-3.'):
        if len(r) < 8:
            continue
        m = re.match(r'([A-Z]\d{2})\s+(.*)', r[0])
        if not m:
            continue
        cid, event = m.group(1), m.group(2).strip()
        label = re.search(r'\*\*(.+?)\*\*', r[2]).group(1)
        reason = re.search(r'🔒\s*["“](.+?)["”]', r[3])
        fx = {}
        for g, sign, n in re.findall(r'(백성|양반|국고|국방)\s*([+\-−])(\d+)', r[5]):
            fx[FULL_GAUGE[g]] = int(n) * (-1 if sign in '-−' else 1)
        flag = re.search(r'`(F_[^`]+)`', r[6])
        for t in re.findall(r'칭호 「([^」]+)」', r[6]):
            if flag:
                titles_by_flag[t] = flag.group(1)
        merge = re.search(r'["“](.+?)["”]', r[7])
        alt = {'id': cid + 'a1', 'label': label, 'effects': fx, 'lock_reason': reason.group(1) if reason else ''}
        if flag:
            alt['set_flag'] = flag.group(1)
        if merge:
            alt['merge_text'] = merge.group(1)
        if '실제 역사:' in r[7]:
            real = r[7].split('실제 역사:', 1)[1].strip()
            alt['merge_real'] = {'text': re.split(r'\(\[교과서 밖\]|\(지도서', real)[0].strip(), 'sources': src105(sources(real)), 'out_of_textbook': '[교과서 밖]' in real}
        alt['result_text'] = r[5]
        ex = ALT_FX.get(cid, {})
        alt['unlock'] = ex.get('unlock', '')
        for k in ('build', 'skip', 'variants', 'crisis_mult'):
            if ex.get(k):
                alt[k] = ex[k]
        real = {}
        for k in ('lock_right', 'lock_left'):
            if ex.get(k):
                real[k] = ex[k]
        out[cid] = {'event': event, 'real': real, 'alt': [alt]}
    return out, titles_by_flag


ALT, ALT_TITLES = alt_paths()


# ---------- 실제 역사 경로와 진엔딩 (10-11) ----------
DIFFS = ['sprout', 'normal', 'sage', 'annals']


def event_types():
    """10-11-1 표: 열린 사건(판단)·(생명)의 카드 id. 나머지 역사 사건은 보통 사건"""
    out = {}
    if '#### 10-11-1.' not in src:
        return out
    for r in table_after('#### 10-11-1.'):
        kind = 'judge' if '판단' in r[0] else 'life' if '생명' in r[0] else None
        if kind:
            for cid in re.findall(r'\b([A-Z]\d{2})\b', r[1]):
                out[cid] = kind
    return out


def need_expr(cell):
    """'양반 45 이상 + 백성 30 이상 + **T02 실제대로**' → 'gauge(nobles) >= 45 && gauge(people) >= 30 && real(T02)'"""
    terms = []
    for part in cell.replace('*', '').split('+'):
        m = re.search(r'(백성|양반|국고|국방)\s*(\d+)\s*이상', part)
        if m:
            terms.append(f'gauge({FULL_GAUGE[m.group(1)]}) >= {m.group(2)}')
        m = re.search(r'([A-Z]\d{2})\s*실제대로', part)
        if m:
            terms.append(f'real({m.group(1)})')
    return ' && '.join(terms)


def real_requires():
    out = {}
    if '#### 10-11-2.' not in src:
        return out
    for r in table_after('#### 10-11-2.'):
        m = re.match(r'([A-Z]\d{2})\s', r[0])
        if not m or len(r) < 6 or '열린 사건' in r[1]:
            continue
        req = {d: need_expr(c) for d, c in zip(DIFFS, r[1:5]) if need_expr(c)}
        reason = re.search(r'["“](.+?)["”]', r[5])
        out[m.group(1)] = {'require': req, 'require_reason': reason.group(1) if reason else ''}
    return out


EVENT_TYPE = event_types()
REQUIRE = real_requires()


# ---------- 위기 카드 (10-8-5): 예고 NT·위기 KT·후속 KTb, 모두 [게임 속 일] ----------
# 번호 순서: 01 백성 낮음, 02 백성 높음, 03 양반 낮음 … 08 국방 높음. 오른쪽 = 강한 대응
CRISIS_ORDER = [('people', 'low'), ('people', 'high'), ('nobles', 'low'), ('nobles', 'high'), ('treasury', 'low'), ('treasury', 'high'), ('army', 'low'), ('army', 'high')]
# 수습하면 손상되는 건물(10-8-5 아래 줄). 지도에 없는 곳(관아·곳간·공신 집)은 비워 두면 엔진이 지어진 건물 하나를 고른다
CRISIS_DAMAGE = {'04': ['gyeongbok'], '07': ['wall'], '08': ['sungnye', 'heungin', 'donui', 'sukjeong']}
CRISIS_DOLL = {'고을에서 올라온 관리': 'official_green', '호조 판서': 'official_red', '호조 관리': 'official_blue', '승지': 'official_red', '내관': 'naegwan', '장터를 돌아본 내관': 'naegwan', '곳간지기': 'farmer', '바닷가 군관': 'official_green', '병조 관리': 'official_blue', '병조 판서': 'official_red'}


def crisis_side(cell):
    lm = re.match(r'\*\*\[([^\]]+)\]\*\*\s*(.*?)\s+—\s+(?:이번 판에서:\s*)?(.*)$', cell)
    if not lm:
        raise SystemExit('위기 카드 칸을 못 읽음: ' + cell)
    fx, _ = effects(lm.group(2))
    return {'label': lm.group(1).strip(), 'effects': fx, 'this_run': lm.group(3).strip().strip('"“”')}


def crisis_cards():
    out = []
    for hm in re.finditer(r'^#### 10-8-\d+\. (\S+) 위기 카드', src, re.M):
        stage = KING.get(hm.group(1))
        if stage not in STAGES:
            continue
        p = PREFIX[stage]
        sec = src[hm.start():]
        sec = sec[: sec.index('\n#### ', 5)]

        def rows(title):
            i = sec.index(title)
            rs = []
            for ln in sec[i:].split('\n')[1:]:
                if ln.startswith('|') and not ln.startswith('|---'):
                    rs.append([x.strip() for x in ln.strip().strip('|').split('|')])
                elif rs and not ln.strip():
                    break
            return rs[1:]
        base = {'kind': 'crisis', 'stages': [stage], 'game_event': True, 'out_of_textbook': False, 'choice_type': 'free', 'strong': 'right'}
        who_of = {}
        for r in rows('**예고 카드'):
            n = r[0][-2:]
            g, side = CRISIS_ORDER[int(n) - 1]
            who = r[2]
            out.append(dict(base, id=r[0], gauge=g, side=side, level='warn', who={'name': who, 'doll': CRISIS_DOLL.get(who) or role_of(who, r[0])}, line=r[3], conditions_text=r[1],
                            choices={'right': crisis_side(r[4]), 'left': crisis_side(r[5])}, sources=[], fx={}))
        for r in rows('**위기 8장'):
            n = r[0][-2:]
            g, side = CRISIS_ORDER[int(n) - 1]
            name = re.sub(r'\s*\(.*?\)\s*$', '', r[1]).strip()
            wm = re.match(r'(.+?):\s*["“](.*)["”]$', r[2])
            who, line = wm.group(1).strip(), wm.group(2).strip()
            who_of[n] = who
            c = dict(base, id=r[0], gauge=g, side=side, level='event', name=name, who={'name': who, 'doll': CRISIS_DOLL.get(who) or role_of(who, r[0])}, line=line,
                     choices={'right': crisis_side(r[3]), 'left': crisis_side(r[4])}, sources=[], fx={})
            sim = r[5]
            if not sim.startswith('(비움'):
                sm = re.match(r'["“](.*?)["”]\s*\((.*)\)$', sim)
                c['similar'] = {'text': sm.group(1), 'sources_text': sm.group(2), 'sources': src105(sources(sm.group(2))), 'out_of_textbook': '[교과서 밖]' in sm.group(2)}
            if n in CRISIS_DAMAGE:
                c['damage'] = {'targets': CRISIS_DAMAGE[n]}
            out.append(c)
        for r in rows('**후속 위기'):
            n = r[0][-3:-1]
            g, side = CRISIS_ORDER[int(n) - 1]
            ev = next(x for x in out if x['id'] == 'K' + p + n)
            c = dict(base, id=r[0], gauge=g, side=side, level='followup', step=2, name=ev['name'], who=dict(ev['who']), line=r[1].strip('"“”'),
                     choices={'right': crisis_side(r[2]), 'left': crisis_side(r[3])}, sources=[], fx={})
            if n in CRISIS_DAMAGE:
                c['damage'] = {'targets': CRISIS_DAMAGE[n]}
            out.append(c)
    return out


cards = block_cards() + daily_cards()
CARDS_BY_ID = {c['id']: c for c in cards}
for c in cards:
    c['who'] = role_of(c.get('whoName', ''), c['id'])
    if c['who'] in ('sagwan', 'jeong') and c.get('whoName') in ('사관', '정도전'):
        c.pop('whoName')
qs = quizzes()
crisis = crisis_cards()
falls, titles, codex = records()

# 왕별 파일: data/<왕>/cards.js(그 왕의 역사·사관·전용 일상), data/<왕>/quizzes.js
# 여러 왕에 나오는 일상 카드(D001~)는 data/common/daily.js. 공통 기록은 data/common/records.js
for st in STAGES:
    d = os.path.join(OUT, st)
    os.makedirs(d, exist_ok=True)
    mine = [to105(c) for c in cards if c['type'] != 'daily' and c['stage'] == st]
    mine += [to105(c) for c in cards if c['type'] == 'daily' and re.match(r'D[A-Z]\d{3}$', c['id']) and st in c['daily']['kings']]
    mine += [c for c in crisis if c['stages'] == [st]]
    open(os.path.join(d, 'cards.js'), 'w', encoding='utf-8', newline='\n').write(js(f"D.cards.push(...{json.dumps(mine, ensure_ascii=False, indent=1)});"))
    qq = []
    for q in qs:
        if q['stage'] != st:
            continue
        e = {'id': q['id'], 'stage': q['stage'], 'question': q['q'], 'answer': q['answer'], 'wrong': q['wrong'], 'sources': src105(q['source']), 'sources_text': q['sourceText'], 'out_of_textbook': bool(q.get('outside')), 'checked_against_review_site': False}
        # 이어진 사건: 근거 칸이 카드를 가리키면 그 카드, 아니면 같은 지도서 쪽을 쓰는 역사 카드(10-10-5 퀴즈와 잇기)
        about = [x for x in re.findall(r'\b([A-Z]\d{2})\b', q['sourceText']) if x in CARDS_BY_ID]
        if not about:
            qp = {s.get('page') for s in q['source'] if s.get('page')}
            about = [c['id'] for c in cards if c['type'] == 'history' and c.get('stage') == st and qp & {s.get('page') for s in c.get('source', []) if s.get('page')}]
        if about:
            e['about'] = about
        qq.append(e)
    open(os.path.join(d, 'quizzes.js'), 'w', encoding='utf-8', newline='\n').write(js(f"D.quizzes.push(...{json.dumps(qq, ensure_ascii=False, indent=1)});"))
common = os.path.join(OUT, 'common')
os.makedirs(common, exist_ok=True)
# 공통 일상 카드는 지금까지 가져온 모든 왕의 것을 합친다(이미 있는 파일과 합침)
daily_path = os.path.join(common, 'daily.js')
old = {}
if os.path.exists(daily_path):
    t = open(daily_path, encoding='utf-8').read()
    m = re.search(r'D\.cards\.push\(\.\.\.(\[.*\])\);', t, re.S)
    if m:
        for c in json.loads(m.group(1)):
            old[c['id']] = c
for c in cards:
    if c['type'] == 'daily' and re.match(r'D\d{3}$', c['id']):
        old[c['id']] = to105(c)
daily = [old[k] for k in sorted(old)]
open(daily_path, 'w', encoding='utf-8', newline='\n').write(js(f"D.cards.push(...{json.dumps(daily, ensure_ascii=False, indent=1)});"))
open(os.path.join(common, 'records.js'), 'w', encoding='utf-8', newline='\n').write(js(
    f"D.falls.push(...{json.dumps(falls, ensure_ascii=False, indent=1)});\n  D.titles.push(...{json.dumps(titles, ensure_ascii=False, indent=1)});\n  D.codex.push(...{json.dumps(codex, ensure_ascii=False, indent=1)});"))
roles = sorted(set(c['who'] for c in cards))
print(f'카드 {len(cards)}장 (역사·사관 {sum(1 for c in cards if c["type"] != "daily")}, 일상 {sum(1 for c in cards if c["type"] == "daily")}) · 퀴즈 {len(qs)} · 실각 {len(falls)} · 칭호 {len(titles)} · 도감 {len(codex)}')
print(f'위기 카드 {len(crisis)}장 (예고 {sum(c["level"] == "warn" for c in crisis)} · 위기 {sum(c["level"] == "event" for c in crisis)} · 후속 {sum(c["level"] == "followup" for c in crisis)})')
print('쓰인 인형:', ', '.join(roles))
print('거스른 쪽(against):', ', '.join(f"{c['id']}={against_side(c)}" for c in cards if against_side(c)))
