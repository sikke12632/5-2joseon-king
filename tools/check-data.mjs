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
// 조건 식 해석기(engine/cond.js) — 카드 conditions·버튼 requires의 문법 검사에 쓴다
vm.runInContext(readFileSync(join(ROOT, 'engine', 'cond.js'), 'utf8'), ctx, { filename: 'cond.js' });
const Cond = ctx.window.JK.Cond;
const checkCond = (id, where, expr) => {
  if (expr === undefined) return;
  const list = Array.isArray(expr) ? expr : [expr];
  for (const e of list) {
    if (typeof e !== 'string') err(id, `${where} 조건 식은 글이어야 함`);
    else {
      const m = Cond.check(e);
      if (m) err(id, `${where} ${m} (한국어 설명은 conditions_text에)`);
    }
  }
};
// 데이터: data/common/*.js 먼저, 그다음 왕별 폴더(era.js의 스테이지 순서)
const dataDir = join(eraDir, 'data');
const load = (dir) => {
  if (!existsSync(dir)) return;
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.js')).sort()) vm.runInContext(readFileSync(join(dir, f), 'utf8'), ctx, { filename: join(dir, f) });
};
load(join(dataDir, 'common'));
for (const st of ctx.window.JK.era.stages) load(join(dataDir, st.id));
const era = ctx.window.JK.era;
const D = era.data;
const stageIds = era.stages.map((s) => s.id);
const gaugeKeys = era.gauges.map((g) => g.key);

// 문장 수: . ? ! 로 끝나는 덩어리
// 따옴표 안 말(“공자 왈!”)은 문장으로 세지 않는다(집필 규칙과 같게)
const sentences = (t) => (t.replace(/“[^”]*”/g, '말').replace(/‘[^’]*’/g, '말').replace(/["「」『』]/g, '').match(/[^.?!]+[.?!]+/g) || [t]).filter((s) => s.trim()).length;
const hasSource = (src) => Array.isArray(src) && src.some((s) => (s.type === 'guide' && s.page) || (s.type === 'textbook' && s.page) || (s.type === 'web' && s.url));

/* ---------- 카드 (설계서 10-5 형식) ---------- */
const ids = new Set();
const KINDS = ['sagwan', 'history', 'device', 'daily', 'chain', 'rare', 'legend', 'crisis', 'alt'];
for (const c of D.cards) {
  const id = c.id || '(id 없음)';
  if (ids.has(id)) err(id, '카드 id 중복');
  ids.add(id);
  if (!KINDS.includes(c.kind)) err(id, `kind 이상: ${c.kind}`);
  if (!Array.isArray(c.stages) || !c.stages.length) err(id, 'stages 없음');
  else for (const k of c.stages) if (!stageIds.includes(k)) err(id, `stages에 없는 왕: ${k}`);
  if (c.required_in && !(c.stages || []).includes(c.required_in)) err(id, 'required_in 왕이 stages에 없음');
  if (c.kind === 'sagwan' || c.kind === 'history') {
    if (typeof c.order !== 'number') err(id, 'order 없음');
    if (!hasSource(c.sources) && !c.variant_of) err(id, '역사 카드 근거(sources) 없음');
  }
  // 변형판(다른 길 뒤 바뀐 사건)은 「이번 판에서」만 — 실제 역사는 비교 화면용 real_note(출처 포함)
  if (c.kind === 'history' && !c.real_history && !(c.variant_of && c.real_note)) err(id, '역사 카드에 「실제 역사」(real_history) 없음');
  // 위기 카드(설계서 10-8): 어느 게이지·어느 쪽·예고(warn)/사건(event)/후속(followup)
  if (c.kind === 'crisis') {
    if (!gaugeKeys.includes(c.gauge)) err(id, `위기 카드 gauge 이상: ${c.gauge}`);
    if (!['low', 'high'].includes(c.side)) err(id, `위기 카드 side 이상: ${c.side}`);
    if (!['warn', 'event', 'followup'].includes(c.level)) err(id, `위기 카드 level 이상: ${c.level}`);
    if (c.level !== 'warn' && !c.name) err(id, '위기 이름(name) 없음 — 실각 화면·기록관에 쓴다');
    if (!c.game_event) warn(id, '위기 카드인데 [게임 속 일](game_event) 표시가 없음');
    if (c.strong && !['left', 'right'].includes(c.strong)) err(id, `strong 이상: ${c.strong}`);
    for (const b of (c.damage && c.damage.targets) || []) if (!era.map.buildings[b]) err(id, `damage에 없는 건물: ${b}`);
    if (c.similar && c.similar.out_of_textbook && !hasSource(c.similar.sources)) err(id, '비슷한 실제 일이 [교과서 밖]인데 출처 없음');
  }
  checkCond(id, 'conditions', c.conditions);
  // 사슬 다음 카드 · 변형판 · 희귀도
  if (c.chain_next && !D.cards.some((x) => x.id === c.chain_next.card)) err(id, `사슬 다음 카드 없음: ${c.chain_next.card}`);
  if (c.variant_of && !D.cards.some((x) => x.id === c.variant_of)) err(id, `변형판의 원래 카드 없음: ${c.variant_of}`);
  if (c.rarity && !['common', 'uncommon', 'rare', 'legend'].includes(c.rarity)) err(id, `rarity 이상: ${c.rarity}`);
  for (const b of (c.fx && c.fx.build) || []) if (!era.map.buildings[b]) err(id, `fx.build에 없는 건물: ${b}`);
  for (const b of (c.fx && c.fx.remove) || []) if (!era.map.buildings[b]) err(id, `fx.remove에 없는 건물: ${b}`);
  // 역사 분기(10-10): 다른 길 열림 조건·실제 경로 잠김 조건·세울 건물·바뀌는 카드
  if (c.paths) {
    for (const sk of ['lock_right', 'lock_left']) {
      const L = (c.paths.real || {})[sk];
      if (!L) continue;
      checkCond(id, `paths.real.${sk}`, L.when);
      if (!L.reason) warn(id, `${sk} 잠김 이유 없음`);
      if (L.reason_auto) warn(id, `${sk} 잠김 이유가 설계서에 없어 임시 문장: "${L.reason}"`);
    }
    for (const a of c.paths.alt || []) {
      if (!a.label) err(id, '다른 길 버튼 글 없음');
      else if (a.label.length > LABEL_MAX) err(id, `다른 길 버튼 글 ${a.label.length}자: ${a.label}`);
      if (!a.unlock) warn(id, `다른 길 ${a.label}: 열림 조건 없음(늘 열림)`);
      checkCond(id, `다른 길 ${a.label} unlock`, a.unlock);
      if (!a.this_run) err(id, `다른 길 ${a.label}: 「이번 판에서」 없음`);
      for (const k in a.effects || {}) if (!gaugeKeys.includes(k)) err(id, `다른 길 효과에 없는 게이지: ${k}`);
      for (const b of a.build || []) if (!era.map.buildings[b]) err(id, `다른 길 build에 없는 건물: ${b}`);
      for (const k in a.crisis_mult || {}) if (!/^(people|nobles|treasury|army):(low|high)$/.test(k)) err(id, `crisis_mult 키 이상: ${k}`);
      for (const [from, to] of Object.entries(a.variants || {})) if (!D.cards.some((x) => x.id === to)) warn(id, `다른 길 변형판 ${to}(${from} 대신) 아직 없음 — 원래 카드가 나온다`);
    }
    if ((c.paths.alt || []).length > 2) err(id, '다른 길은 사건 하나에 최대 2개');
  }
  // 결(10-9): 위기·예고·사관 빼고 모두. 역사 사건 카드에는 도박형을 쓰지 않는다
  const GRAINS = ['balance', 'complex', 'gift', 'mire', 'seed', 'gamble'];
  if (c.kind !== 'crisis' && c.kind !== 'sagwan') {
    if (!c.grain) warn(id, '결(grain) 없음');
    else if (!GRAINS.includes(c.grain)) err(id, `결 이상: ${c.grain}`);
  }
  if (c.kind === 'history' && c.grain === 'gamble') err(id, '역사 사건 카드에 도박형');
  if (c.grain === 'gamble') {
    const gm = c.gamble;
    if (!gm || !['left', 'right'].includes(gm.side) || !gm.win || !gm.lose) err(id, '도박형인데 gamble{side, win, lose} 없음');
  }
  if (c.seed && c.seed.fruit_id && !D.cards.some((x) => x.id === c.seed.fruit_id)) warn(id, `씨앗의 열매 카드 없음: ${c.seed.fruit_id}`);
  if (c.kind === 'daily' && (!c.sources || !c.sources.length) && !c.general) warn(id, '일상 카드 근거 없음(일반 상황이면 general: true)');
  if (!c.who || !D.roles[c.who.doll]) err(id, `인형(who.doll) 없음: ${c.who && c.who.doll}`);
  if (!c.line) err(id, '대사(line) 없음');
  else if (sentences(c.line) > 2) err(id, `대사 ${sentences(c.line)}문장 (2문장 이내)`);
  if (c.out_of_textbook && !hasSource(c.sources)) err(id, '[교과서 밖]인데 출처(사이트 주소 또는 지도서 쪽) 없음');
  if (c.kind === 'sagwan') {
    if (!c.single) err(id, '사관 두루마리에 버튼 글(single) 없음');
  } else {
    if (!['how', 'oppose', 'free'].includes(c.choice_type)) err(id, `choice_type 이상: ${c.choice_type}`);
    for (const side of ['left', 'right']) {
      const s = c.choices && c.choices[side];
      if (!s) {
        err(id, `choices.${side} 없음`);
        continue;
      }
      if (!s.label || !s.label.trim()) err(id, `${side} 버튼 글 없음`);
      else if (s.label.length > LABEL_MAX) err(id, `${side} 버튼 글 ${s.label.length}자 (${LABEL_MAX}자 이내): ${s.label}`);
      if (/^(들어준다|거절한다)$/.test((s.label || '').trim())) err(id, `${side} 버튼 글이 "${s.label}" — 무엇을 고르는지 분명한 말로`);
      for (const k in s.effects || {}) {
        if (!gaugeKeys.includes(k)) err(id, `${side} 효과에 없는 게이지: ${k}`);
        // 후속 위기(10-8-5)는 대가가 커서 25까지
        else if (typeof s.effects[k] !== 'number' || Math.abs(s.effects[k]) > (c.level === 'followup' ? 25 : 20)) err(id, `${side} 효과 값 이상: ${k}=${s.effects[k]}`);
      }
      if (!s.this_run) warn(id, `${side} 「이번 판에서」(this_run) 없음`);
      checkCond(id, `${side}.requires`, s.requires);
      if (s.build_state && !['smooth', 'forced', 'late'].includes(s.build_state)) err(id, `${side} build_state 이상: ${s.build_state}`);
      for (const b of s.build || []) if (!era.map.buildings[b]) err(id, `build에 없는 건물: ${b}`);
      if (c.kind === 'history' && (s.build || []).some((b) => era.map.buildings[b] && era.map.buildings[b].name && era.map.buildings[b].kind === 'single') && !s.build_state && c.choice_type === 'how') warn(id, `${side} 이름 있는 건물을 세우는데 건물 상태(build_state)가 없음`);
    }
    if (c.choices && c.choices.left && c.choices.right && c.choices.left.label === c.choices.right.label) err(id, '좌/우 버튼 글이 같음');
    if (c.choice_type === 'oppose' && !c.against) warn(id, '반대가 있는 카드인데 거스른 쪽(against)을 못 찾음');
  }
  if (c.temp) warn(id, '임시 글(temp)');
}
// 위기 카드 짝: 위기 사건이 있는 게이지·방향에는 예고와 후속도 있어야 한다
for (const c of D.cards.filter((x) => x.kind === 'crisis' && x.level === 'event')) {
  for (const lv of ['warn', 'followup'])
    if (!D.cards.some((x) => x.kind === 'crisis' && x.level === lv && x.gauge === c.gauge && x.side === c.side && x.stages.some((st) => c.stages.includes(st)))) warn(c.id, `같은 게이지·방향의 ${lv === 'warn' ? '예고' : '후속'} 카드 없음`);
}
// 위기 숫자(10-8): 엔진이 읽는 칸
for (const k of ['zones', 'chance', 'rest', 'fall', 'followupIfAtMost', 'cooldown', 'forewarnMax']) if (!(era.crisis || {})[k]) err('era.crisis', `${k} 없음`);
// 교과서 밖 역사 카드는 왕마다 절반을 넘지 않게
for (const st of stageIds) {
  const h = D.cards.filter((c) => (c.stages || []).includes(st) && c.kind === 'history');
  const o = h.filter((c) => c.out_of_textbook).length;
  if (h.length && o > h.length / 2) err(st, `교과서 밖 역사 카드 ${o}/${h.length} — 절반을 넘음`);
}
// 난이도 표(설계서 10-7): 모든 단계에 엔진이 읽는 숫자가 있는지
for (const id in era.difficulty || {}) {
  const d = era.difficulty[id];
  for (const k of ['mult', 'warn', 'preview', 'carry', 'quizOptions', 'quizBonus', 'afterFall', 'hint']) if (d[k] === undefined) err('난이도 ' + id, `${k} 없음`);
}

/* ---------- 퀴즈 ---------- */
const qids = new Set();
for (const q of D.quizzes) {
  const id = q.id || '(id 없음)';
  if (qids.has(id)) err(id, '퀴즈 id 중복');
  qids.add(id);
  if (!stageIds.includes(q.stage)) err(id, `stage 이상: ${q.stage}`);
  if (!q.question || !q.answer) err(id, '문항 또는 정답 없음');
  if (!Array.isArray(q.wrong) || q.wrong.length !== 2) err(id, '오답은 2개');
  else {
    if (q.wrong.includes(q.answer)) err(id, '정답이 오답에도 있음');
    if (new Set(q.wrong).size !== 2) err(id, '오답 두 개가 같음');
  }
  if (!hasSource(q.sources)) err(id, '근거 없음');
  if (q.temp) warn(id, '임시 문항(temp)');
}
for (const st of stageIds) {
  const n = D.quizzes.filter((q) => q.stage === st).length;
  const o = D.quizzes.filter((q) => q.stage === st && q.out_of_textbook).length;
  // 담임 결정(9-3 #4): 왕당 문항 풀에서 교과서 밖은 6문항까지(한 번에 나오는 3문항 가운데는 많아야 1 — 엔진이 지킴)
  const omax = (era.quiz || {}).outsidePoolMax || 6;
  if (n && o > omax) err(st, `교과서 밖 퀴즈 ${o}문항 (왕당 ${omax}문항 이하)`);
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
    const nq = norm(q.question),
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
      for (const k in v) if (!['url', 'sources', 'sources_text', 'source', 'id', 'who', 'icon', 'cloth', 'trim', 'bg', 'hat', 'items', 'rule', 'build', 'opens', 'stage', 'gauge'].includes(k)) walk(v[k]);
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
  nHist = D.cards.filter((c) => c.kind === 'history').length;
console.log(`[${ERA}] 카드 ${nCards}장(역사 ${nHist}) · 퀴즈 ${D.quizzes.length} · 인물 ${Object.keys(D.roles).length} · 도감 ${D.codex.length} · 칭호 ${D.titles.length} · 복습 사이트 문항 ${reviewN}개와 대조`);
if (warns.length) console.log(`\n경고 ${warns.length}개\n  ` + warns.join('\n  '));
if (errors.length) {
  console.log(`\n오류 ${errors.length}개\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log('\n오류 0개');
