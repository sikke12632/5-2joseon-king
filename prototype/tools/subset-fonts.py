"""쓰는 글자만 남긴 글꼴을 만든다 (카드 글을 바꾸면 다시 돌린다).

    python tools/subset-fonts.py <원본 TTF가 있는 폴더>

원본(OFL): Song Myung, Gowun Dodum — github.com/google/fonts/ofl/
필요: pip install fonttools brotli
"""
import os
import sys
import glob
from fontTools import subset

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else '.'

texts = []
for pat in ['index.html', 'js/*.js', 'css/*.css']:
    for p in glob.glob(os.path.join(HERE, pat)):
        with open(p, encoding='utf-8') as f:
            texts.append(f.read())
chars = set(''.join(texts))
chars |= set(chr(c) for c in range(0x20, 0x7F))
chars |= set('·…「」『』—–~!?.,()[]%×→←↑↓「」《》〈〉“”‘’')
# 한글 완성형과 한자만 남기고 나머지 제어 문자는 뺀다
chars = {c for c in chars if c.isprintable()}
text = ''.join(sorted(chars))
print('글자 수:', len(chars))

jobs = [
    ('SongMyung-Regular.ttf', 'SongMyung-sub.woff2'),
    ('GowunDodum-Regular.ttf', 'GowunDodum-sub.woff2'),
]
for src, dst in jobs:
    srcp = None
    for cand in glob.glob(os.path.join(SRC, '*' + src)):
        srcp = cand
    if not srcp:
        print('원본 없음:', src)
        continue
    out = os.path.join(HERE, 'fonts', dst)
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    font = subset.load_font(srcp, opts)
    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)
    subset.save_font(font, out, opts)
    print(dst, os.path.getsize(out), 'bytes')
