"""설계서.md(정본) → 시대팩 데이터(eras/joseon/data/*.js)

    python tools/import-design.py [왕 id ...]      (기본: taejo)

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
    for r in table_after('**실각 기록 (도감'):
        m = re.match(r'(백성|양반|국고|국방) (0|100)', r[0])
        if m:
            falls.append({'id': gmap[m.group(1)] + m.group(2), 'gauge': gmap[m.group(1)], 'at': int(m.group(2)), 'name': r[1], 'text': r[2]})
    rules = {'아슬아슬 줄타기': 'edgeClear'}
    titles = []
    for r in table_after('### 4-2. 엔딩 칭호'):
        if not r[0].isdigit():
            continue
        titles.append({'id': 'title' + r[0].zfill(2), 'name': r[1], 'hint': r[3] if r[3] != '—' else '', 'cond': r[2], 'rule': rules.get(r[1], 'later')})
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


def js(var, items):
    body = json.dumps(items, ensure_ascii=False, indent=1)
    return f"""/* 설계서 v2에서 tools/import-design.py 로 만든 파일 — 직접 고치지 말고 설계서를 고친 뒤 다시 만든다 */
(function () {{
  'use strict';
  const D = window.JK.eraData;
  {var}
}})();
"""


cards = block_cards() + daily_cards()
CARDS_BY_ID = {c['id']: c for c in cards}
for c in cards:
    c['who'] = role_of(c.get('whoName', ''), c['id'])
    if c['who'] in ('sagwan', 'jeong') and c.get('whoName') in ('사관', '정도전'):
        c.pop('whoName')
qs = quizzes()
falls, titles, codex = records()

open(os.path.join(OUT, 'cards.js'), 'w', encoding='utf-8', newline='\n').write(
    js('', None).replace('  \n})', '') if False else js(f"D.cards.push(...{json.dumps(cards, ensure_ascii=False, indent=1)});", None))
open(os.path.join(OUT, 'quizzes.js'), 'w', encoding='utf-8', newline='\n').write(js(f"D.quizzes.push(...{json.dumps(qs, ensure_ascii=False, indent=1)});", None))
open(os.path.join(OUT, 'records.js'), 'w', encoding='utf-8', newline='\n').write(js(
    f"D.falls.push(...{json.dumps(falls, ensure_ascii=False, indent=1)});\n  D.titles.push(...{json.dumps(titles, ensure_ascii=False, indent=1)});\n  D.codex.push(...{json.dumps(codex, ensure_ascii=False, indent=1)});", None))
roles = sorted(set(c['who'] for c in cards))
print(f'카드 {len(cards)}장 (역사·사관 {sum(1 for c in cards if c["type"] != "daily")}, 일상 {sum(1 for c in cards if c["type"] == "daily")}) · 퀴즈 {len(qs)} · 실각 {len(falls)} · 칭호 {len(titles)} · 도감 {len(codex)}')
print('쓰인 인형:', ', '.join(roles))
for c in cards:
    if c['type'] != 'scroll' and ('right' not in c or 'left' not in c):
        print('버튼 없음', c['id'])
