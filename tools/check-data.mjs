// check-data.mjs — 시대팩 데이터 검사 (단계마다 돌린다. 오류가 있으면 끝 코드 1)
//   node tools/check-data.mjs [시대=joseon]
// 검사: 카드·퀴즈 id 중복, 필수 칸, 대사 2문장 이내, 좌/우 버튼 글 있음·길이, 효과 값, 역사 카드 근거,
//       [교과서 밖] 출처, 교과서 밖 비율, 인물·건물 키, 퀴즈 정답이 보기에 있음, 복습 사이트와 퀴즈 중복, 글꼴에 없는 글자
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ERA = process.argv[2] || 'joseon';
const REVIEW = 'C:/Users/USER/Desktop/사회/lessons/sahoe-5-2/u2';
const LABEL_MAX = 14; // 버튼 글 최대 글자 수(공백 포함)

const errors = [];
const warns = [];
const err = (id, m) => errors.push(`${id}: ${m}`);
const warn = (id, m) => warns.push(`${id}: ${m}`);

// 데이터 읽기 (브라우저와 같은 순서)
const ctx = { window: {}, console };
ctx.window.JK = {};
ctx.JK = ctx.window.JK;
vm.createContext(ctx);
const eraDir = join(ROOT, 'eras', ERA);
for (const f of ['map.js', 'era.js']) vm.runInContext(readFileSync(join(eraDir, f), 'utf8'), ctx, { filename: f });
for (const f of readdirSync(join(eraDir, 'data')).filter((f) => f.endsWith('.js')).sort()) vm.runInContext(readFileSync(join(eraDir, 'data', f), 'utf8'), ctx, { filename: f });
const era = ctx.window.JK.era;
const D = era.data;
const stageIds = era.stages.map((s) => s.id);
const gaugeKeys = era.gauges.map((g) => g.key);

// 문장 수: . ? ! 로 끝나는 덩어리
const sentences = (t) => (t.replace(/[“”"「」『』]/g, '').match(/[^.?!]+[.?!]+/g) || [t]).filter((s) => s.trim()).length;
const hasSource = (src) => Array.isArray(src) && src.some((s) => (s.book && s.page) || (s.site && s.url));

/* ---------- 카드 ---------- */
const ids = new Set();
for (const c of D.cards) {
  const id = c.id || '(id 없음)';
  if (ids.has(id)) err(id, '카드 id 중복');
  ids.add(id);
  if (!['scroll', 'history', 'daily', 'device'].includes(c.type)) err(id, `type 이상: ${c.type}`);
  if (c.type === 'scroll' || c.type === 'history') {
    if (!stageIds.includes(c.stage)) err(id, `stage 이상: ${c.stage}`);
    if (typeof c.order !== 'number') err(id, 'order 없음');
    if (!hasSource(c.source)) err(id, '역사 카드 근거(source) 없음');
  }
  if (c.type === 'daily') {
    if (!c.daily || !c.daily.kings || !c.daily.kings.length) err(id, 'daily.kings 없음');
    else {
      for (const k of c.daily.kings) if (!stageIds.includes(k)) err(id, `daily.kings에 없는 왕: ${k}`);
      if (c.daily.required && !c.daily.kings.includes(c.daily.required)) err(id, 'required 왕이 kings에 없음');
    }
    if ((!c.source || !c.source.length) && !c.general) warn(id, '일상 카드 근거 없음(일반 상황이면 general: true)');
  }
  if (!D.roles[c.who]) err(id, `인물(who) 없음: ${c.who}`);
  if (!c.text) err(id, '대사 없음');
  else if (sentences(c.text) > 2) err(id, `대사 ${sentences(c.text)}문장 (2문장 이내)`);
  if (c.outside && !hasSource(c.source)) err(id, '[교과서 밖]인데 출처(사이트 이름·주소 또는 문헌 쪽) 없음');
  if (c.type === 'scroll') {
    if (!c.single) err(id, '사관 두루마리에 버튼 글(single) 없음');
  } else {
    for (const side of ['left', 'right']) {
      const s = c[side];
      if (!s) {
        err(id, `${side} 없음`);
        continue;
      }
      if (!s.label || !s.label.trim()) err(id, `${side} 버튼 글 없음`);
      else if (s.label.length > LABEL_MAX) err(id, `${side} 버튼 글 ${s.label.length}자 (${LABEL_MAX}자 이내): ${s.label}`);
      if (/^(들어준다|거절한다)$/.test((s.label || '').trim())) err(id, `${side} 버튼 글이 "${s.label}" — 무엇을 고르는지 분명한 말로`);
      for (const k in s.fx || {}) {
        if (!gaugeKeys.includes(k)) err(id, `${side} 효과에 없는 게이지: ${k}`);
        else if (typeof s.fx[k] !== 'number' || Math.abs(s.fx[k]) > 20) err(id, `${side} 효과 값 이상: ${k}=${s.fx[k]}`);
      }
      if (!s.result) warn(id, `${side} 결과 글 없음`);
    }
    if (c.left && c.right && c.left.label === c.right.label) err(id, '좌/우 버튼 글이 같음');
  }
  for (const b of c.build || []) if (!era.map.buildings[b]) err(id, `build에 없는 건물: ${b}`);
  if (c.temp) warn(id, '임시 글(temp)');
}
// 교과서 밖 역사 카드는 왕마다 절반을 넘지 않게
for (const st of stageIds) {
  const h = D.cards.filter((c) => c.stage === st && c.type === 'history');
  const o = h.filter((c) => c.outside).length;
  if (h.length && o > h.length / 2) err(st, `교과서 밖 역사 카드 ${o}/${h.length} — 절반을 넘음`);
}

/* ---------- 퀴즈 ---------- */
const qids = new Set();
for (const q of D.quizzes) {
  const id = q.id || '(id 없음)';
  if (qids.has(id)) err(id, '퀴즈 id 중복');
  qids.add(id);
  if (!stageIds.includes(q.stage)) err(id, `stage 이상: ${q.stage}`);
  if (!q.q || !q.answer) err(id, '문항 또는 정답 없음');
  if (!Array.isArray(q.wrong) || q.wrong.length !== 2) err(id, '오답은 2개');
  else {
    if (q.wrong.includes(q.answer)) err(id, '정답이 오답에도 있음');
    if (new Set(q.wrong).size !== 2) err(id, '오답 두 개가 같음');
  }
  if (!hasSource(q.source)) err(id, '근거 없음');
  if (q.temp) warn(id, '임시 문항(temp)');
}
for (const st of stageIds) {
  const n = D.quizzes.filter((q) => q.stage === st).length;
  const o = D.quizzes.filter((q) => q.stage === st && q.outside).length;
  if (n && o > 2) err(st, `교과서 밖 퀴즈 ${o}문항 (왕당 2문항 이하)`);
}

/* ---------- 복습 사이트와 퀴즈 중복 ---------- */
const norm = (s) => String(s).replace(/<[^>]+>/g, '').replace(/[\s.,?!·《》〈〉「」『』“”"'‘’()\[\]~-]/g, '');
const bigrams = (s) => {
  const out = new Set();
  for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2));
  return out;
};
const sim = (a, b) => {
  const A = bigrams(a),
    B = bigrams(b);
  let n = 0;
  for (const x of A) if (B.has(x)) n++;
  return n / Math.max(1, Math.min(A.size, B.size));
};
let reviewN = 0;
if (existsSync(REVIEW)) {
  const items = [];
  for (const f of readdirSync(REVIEW).filter((f) => f.endsWith('.json'))) {
    const j = JSON.parse(readFileSync(join(REVIEW, f), 'utf8'));
    for (const s of j.sections || []) for (const q of s.quiz || []) items.push({ f, text: q.text, answer: (q.options || []).find((o) => o.a)?.t || '' });
  }
  reviewN = items.length;
  for (const q of D.quizzes) {
    const nq = norm(q.q),
      na = norm(q.answer);
    for (const r of items) {
      const s = sim(nq, norm(r.text));
      if (s >= 0.7) err(q.id, `복습 사이트 문항과 비슷함(${(s * 100).toFixed(0)}%): ${r.f} "${r.text}"`);
      if (na.length >= 6 && na === norm(r.answer)) err(q.id, `복습 사이트와 정답 문장이 같음: ${r.f} "${r.answer}"`);
      else if (na && na === norm(r.answer) && s >= 0.45) warn(q.id, `정답 낱말이 같고 문항이 조금 비슷함: ${r.f} "${r.text}"`);
    }
  }
} else warn('복습 사이트', `${REVIEW} 를 찾지 못해 퀴즈 중복 검사를 건너뜀`);

/* ---------- 글꼴에 없는 글자 ---------- */
const csPath = join(ROOT, 'engine', 'fonts', 'charset.txt');
if (existsSync(csPath)) {
  const have = new Set(readFileSync(csPath, 'utf8'));
  const missing = new Set();
  const walk = (v) => {
    if (typeof v === 'string') {
      for (const ch of v) if (!have.has(ch) && ch.trim()) missing.add(ch);
    } else if (v && typeof v === 'object') {
      for (const k in v) if (!['url', 'source', 'id', 'who', 'icon', 'cloth', 'trim', 'bg', 'hat', 'items', 'rule', 'build', 'opens', 'stage', 'gauge'].includes(k)) walk(v[k]);
    }
  };
  walk(D.cards);
  walk(D.quizzes);
  walk(D.codex);
  walk(D.titles);
  walk(D.falls);
  walk(D.roles);
  if (missing.size) err('글꼴', `글꼴에 없는 글자 ${missing.size}개: ${[...missing].join('')} → python tools/subset-fonts.py tools/fonts-src`);
} else warn('글꼴', 'engine/fonts/charset.txt 없음 — subset-fonts.py를 돌리면 생긴다');

/* ---------- 결과 ---------- */
const nCards = D.cards.length,
  nHist = D.cards.filter((c) => c.type === 'history').length;
console.log(`[${ERA}] 카드 ${nCards}장(역사 ${nHist}) · 퀴즈 ${D.quizzes.length} · 인물 ${Object.keys(D.roles).length} · 도감 ${D.codex.length} · 칭호 ${D.titles.length} · 복습 사이트 문항 ${reviewN}개와 대조`);
if (warns.length) console.log(`\n경고 ${warns.length}개\n  ` + warns.join('\n  '));
if (errors.length) {
  console.log(`\n오류 ${errors.length}개\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\n오류 0개');
