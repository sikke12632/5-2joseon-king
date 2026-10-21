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
// 복습 사이트 퀴즈(JSON) 폴더: REVIEW=경로 로 바꿀 수 있다. 기본은 저장소 안 작업/자료/review-u2(저장소에는 없음 — 없으면 경고만)
const REVIEW = process.env.REVIEW || join(dirname(dirname(fileURLToPath(import.meta.url))), '작업', '자료', 'review-u2');
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
const KINDS = ['sagwan', 'history', 'device', 'daily', 'chain', 'rare', 'legend', 'crisis', 'alt', 'event'];
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
  // 돌발 이벤트(10-13): [게임 속 일] · 종류 · 즉시·마음·연쇄 · 상자 세 결과
  if (c.kind === 'event') {
    if (!c.game_event) err(id, '돌발 카드인데 [게임 속 일](game_event) 표시가 없음');
    if (!['bad', 'good', 'guest', 'box', 'mind', 'chain'].includes(c.ev)) err(id, `돌발 종류(ev) 이상: ${c.ev}`);
    if (!c.name) err(id, '돌발 이름(name) 없음 — 큰 글씨·도감에 쓴다');
    const e = c.event || {};
    for (const k in e.now || {}) if (!gaugeKeys.includes(k)) err(id, `즉시 효과에 없는 게이지: ${k}`);
    for (const k of ['show', 'right', 'left']) if (typeof (e.mind || {})[k] !== 'number') err(id, `마음 변화(event.mind.${k}) 없음`);
    for (const ch of e.chains || []) {
      const t = D.cards.find((x) => x.id === ch.card);
      if (!t || t.kind !== 'event') err(id, `연쇄 대상 돌발 카드 없음: ${ch.card}`);
      if (!(ch.p > 0 && ch.p <= 1)) err(id, `연쇄 확률 이상: ${ch.p}`);
    }
    if (c.ev === 'chain' && !D.cards.some((x) => ((x.event || {}).chains || []).some((ch) => ch.card === c.id))) err(id, '연쇄 카드인데 부르는 카드가 없음');
    if (c.box) {
      const ps = c.box.outcomes.map((o) => o.p);
      if (Math.abs(ps.reduce((s, x) => s + x, 0) - 1) > 1e-6) err(id, `상자 확률 합이 1이 아님: ${ps.join('+')}`);
      if (!['good', 'bad', 'empty'].every((k) => c.box.outcomes.some((o) => o.kind === k))) err(id, '상자 결과는 좋은·나쁜·빈 셋');
      if (!['left', 'right'].includes(c.box.side)) err(id, `상자 쪽 이상: ${c.box.side}`);
      for (const o of c.box.outcomes) for (const k in o.effects || {}) if (Math.abs(o.effects[k]) > 15) err(id, `상자 결과 효과가 15를 넘음: ${k}=${o.effects[k]}`);
    }
    for (const x of c.line_if || []) checkCond(id, 'line_if', x.when);
    if (!(c.fx && c.fx.scene)) warn(id, '세계 연출(fx.scene) 없음');
  }
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
      checkCond(id, `다른 길 ${a.label} unlock`, a.unlock && typeof a.unlock === 'object' ? Object.values(a.unlock) : a.unlock);
      if (!a.this_run) err(id, `다른 길 ${a.label}: 「이번 판에서」 없음`);
      for (const k in a.effects || {}) if (!gaugeKeys.includes(k)) err(id, `다른 길 효과에 없는 게이지: ${k}`);
      for (const b of a.build || []) if (!era.map.buildings[b]) err(id, `다른 길 build에 없는 건물: ${b}`);
      for (const k in a.crisis_mult || {}) if (!/^(people|nobles|treasury|army):(low|high)$/.test(k)) err(id, `crisis_mult 키 이상: ${k}`);
      for (const [from, to] of Object.entries(a.variants || {})) if (!D.cards.some((x) => x.id === to)) warn(id, `다른 길 변형판 ${to}(${from} 대신) 아직 없음 — 원래 카드가 나온다`);
    }
    if ((c.paths.alt || []).length > 3) err(id, '다른 길은 사건 하나에 최대 3개(10-14)');
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
    // 알 수 없는 상자(돌발, 10-13-4)는 결과가 셋이라 box{side, outcomes}로 둔다
    if (!c.box && (!gm || !['left', 'right'].includes(gm.side) || !gm.win || !gm.lose)) err(id, '도박형인데 gamble{side, win, lose} 없음');
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

/* ---------- 잠금 조건이 실제로 열릴 수 있는지 (담임 제보 2026-10-21: T01 다른 길이 절대 안 열림) ----------
 * 그 사건 칸 전까지 "반드시 놓이는" 카드만으로 게이지를 최대한 올리거나 내린 범위를 셈한다.
 *  - 시작은 그 왕의 시작 게이지(10-12, 새싹은 50 쪽으로 절반), 앞의 역사·사관 카드는 그 게이지에 가장 좋은 쪽을 골랐다고 본다
 *  - 무작위 칸은 era 스테이지 slotsBefore(그 사건 앞에 꼭 두는 칸 수)만큼만 센다. 한 칸이 한 게이지를 SLOT(10)까지 움직인다고 본다
 *  - 난이도 배율(mult)을 곱해 반올림. 게이지마다 따로 본다(여러 게이지 조건은 각각 닿으면 통과)
 *  - flag(F)는 F를 세우는 다른 길이 앞 사건에 있어야, real(T)는 T가 앞에 있어야 한다
 * 열 수 없는 조건 = 오류. 실제 경로 잠김(lock_*)은 "피할 수 있는지"를 본다. */
{
  const SLOT = 10;
  const diffs = Object.keys(era.difficulty);
  for (const st of era.stages.filter((x) => x.ready)) {
    const hist = D.cards.filter((c) => (c.kind === 'history' || c.kind === 'sagwan') && !c.variant_of && c.stages.includes(st.id)).sort((a, b) => a.order - b.order);
    const before = st.slotsBefore || {};
    for (const dId of diffs) {
      // 왕별 시작 게이지·변화 배율(10-12): 새싹은 시작값을 50 쪽으로 절반 당긴다
      const info = (D.stageInfo || {})[st.id] || {};
      const mult = era.difficulty[dId].mult * (info.mult || 1);
      const eff = (v) => Math.round(v * mult);
      const range = {};
      for (const k of gaugeKeys) {
        const x = info.start && info.start[k] !== undefined ? info.start[k] : 50;
        const v0 = dId === 'sprout' ? Math.round(50 + (x - 50) / 2) : x;
        range[k] = [v0, v0];
      }
      const flagsBefore = new Set();
      const seenBefore = new Set();
      let slots = 0;
      for (const c of hist) {
        // 이 카드 앞에 꼭 두는 무작위 칸
        const n = before[c.id] || 0;
        slots += n;
        for (const k of gaugeKeys) range[k] = [Math.max(0, range[k][0] - eff(SLOT) * n), Math.min(100, range[k][1] + eff(SLOT) * n)];
        const lo = (k) => range[k][0],
          hi = (k) => range[k][1];
        const termOk = (t, invert) => {
          let m = t.match(/^gauge\((\w+)\)\s*(>=|<=|>|<)\s*(\d+)$/);
          if (m) {
            let op = m[2];
            if (invert) op = { '<': '>=', '<=': '>', '>': '<=', '>=': '<' }[op];
            const n = +m[3];
            return { '>=': hi(m[1]) >= n, '>': hi(m[1]) > n, '<=': lo(m[1]) <= n, '<': lo(m[1]) < n }[op];
          }
          if ((m = t.match(/^flag\((\S+)\)$/))) return flagsBefore.has(m[1]);
          if ((m = t.match(/^real\((\w+)\)$/))) return seenBefore.has(m[1]);
          return true;
        };
        const exprOk = (e, invert) => {
          if (!e) return true;
          if (invert) return !/&&|\|\|/.test(e) ? termOk(e.trim(), true) : true;
          return String(e)
            .split('||')
            .some((alt) => alt.split('&&').every((t) => termOk(t.trim().replace(/^\((.*)\)$/, '$1'), false)));
        };
        const show = (e) => `${e} — 이 칸까지 닿는 범위 ${gaugeKeys.map((k) => `${k} ${lo(k)}~${hi(k)}`).join(', ')}`;
        if (c.paths) {
          const real = c.paths.real || {};
          const need = real.require && real.require[dId];
          if (need && !exprOk(need)) err(c.id, `[${dId}] 실제 경로 요구를 채울 수 없음: ${show(need)}`);
          for (const sk of ['lock_right', 'lock_left']) if (real[sk] && !exprOk(real[sk].when, true)) err(c.id, `[${dId}] ${sk} 잠김을 피할 수 없음: ${show(real[sk].when)}`);
          for (const a of c.paths.alt || []) {
            const u = a.unlock && typeof a.unlock === 'object' ? a.unlock[dId] : a.unlock;
            if (u && !exprOk(u)) err(c.id, `[${dId}] 다른 길 「${a.label}」 열림 조건을 채울 수 없음: ${show(u)}`);
          }
        }
        // 이 카드를 지나며 고를 수 있는 최대·최소
        if (c.choices)
          for (const k of gaugeKeys) {
            const vals = ['right', 'left'].map((sk) => eff((c.choices[sk].effects || {})[k] || 0));
            range[k] = [Math.max(0, range[k][0] + Math.min(0, ...vals)), Math.min(100, range[k][1] + Math.max(0, ...vals))];
          }
        // 변형판에 놓인 다른 길(예: T02a1을 고른 판의 T08v1에 둔 T08a2)
        for (const v of D.cards.filter((x) => x.variant_of === c.id && x.paths && x.stages.includes(st.id)))
          for (const a of v.paths.alt || []) {
            const u = a.unlock && typeof a.unlock === 'object' ? a.unlock[dId] : a.unlock;
            if (u && !exprOk(u)) err(v.id, `[${dId}] 다른 길 「${a.label}」 열림 조건을 채울 수 없음: ${show(u)}`);
            if (a.set_flag) flagsBefore.add(a.set_flag);
          }
        for (const a of (c.paths && c.paths.alt) || []) if (a.set_flag) flagsBefore.add(a.set_flag);
        seenBefore.add(c.id);
      }
    }
  }
}

/* ---------- 돌발 조건이 열릴 수 있는지 (설계서 10-13-4) ----------
 * 낱말마다: card >= N 은 그 왕의 판 길이 안, seen(X) 는 그 왕에 있는 카드, flag(F) 는 F를 세우는 다른 길이 있어야,
 * chain(X) 는 X가 이 카드를 부르는 연쇄여야, mind() 는 0~100, gauge 는 0~100 안. '!낱말'은 늘 채울 수 있다고 본다. */
{
  for (const c of D.cards.filter((x) => x.kind === 'event')) {
    for (const st of c.stages) {
      const stage = era.stages.find((x) => x.id === st) || {};
      const nHist = D.cards.filter((x) => (x.kind === 'history' || x.kind === 'sagwan') && !x.variant_of && x.stages.includes(st)).length;
      const maxLen = nHist + ((stage.randomSlots || [5, 8])[1] || 8) + 8;
      const flags = new Set(D.cards.flatMap((x) => ((x.paths && x.paths.alt) || []).map((a) => a.set_flag)).filter(Boolean));
      const termOk = (t) => {
        t = t.trim().replace(/^\((.*)\)$/, '$1').trim();
        if (t.startsWith('!')) return true;
        let m;
        if ((m = t.match(/^card\s*(>=|>)\s*(\d+)$/))) return +m[2] < maxLen;
        if ((m = t.match(/^seen\((\w+)\)$/))) return D.cards.some((x) => x.id === m[1] && x.stages.includes(st));
        if ((m = t.match(/^flag\((\S+)\)$/))) return flags.has(m[1]);
        if ((m = t.match(/^chain\((\w+)\)$/))) return D.cards.some((x) => x.id === m[1] && ((x.event || {}).chains || []).some((ch) => ch.card === c.id));
        if ((m = t.match(/^mind\(\)\s*(>=|>)\s*(\d+)$/))) return +m[2] <= 100;
        if ((m = t.match(/^gauge\((\w+)\)\s*(>=|>|<=|<)\s*(\d+)$/))) return +m[3] >= 0 && +m[3] <= 100;
        return true;
      };
      for (const e of c.conditions || []) {
        const ok = String(e).split('||').some((alt) => alt.split('&&').every((t) => termOk(t)));
        if (!ok) err(c.id, `[${st}] 돌발 조건을 채울 수 없음: ${e}`);
      }
    }
  }
}

/* ---------- 갈래 이야기(설계서 10-14-2) ---------- */
for (const b of D.branches || []) {
  checkCond('갈래 ' + b.id, 'done', b.done);
  if (!D.titles.some((t) => t.rule === 'branch:' + b.id)) err('갈래 ' + b.id, '갈래 칭호(rule branch:id) 없음');
  if (!D.cards.some((c) => ((c.paths && c.paths.alt) || []).some((a) => a.set_flag === b.flag))) err('갈래 ' + b.id, `시작 플래그 ${b.flag}를 세우는 다른 길 없음`);
  for (const m of String(b.done).matchAll(/seen\((\w+)\)/g)) if (!D.cards.some((c) => c.id === m[1])) err('갈래 ' + b.id, `완성 조건의 카드 없음: ${m[1]}`);
  if (!b.sagwan) warn('갈래 ' + b.id, '갈래 엔딩 사관의 말 없음');
}
if ((D.branches || []).length && !D.titles.some((t) => t.rule === 'branch:two')) err('갈래', '「두 갈래의 임금」 칭호 없음');

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
  if (missing.size) err('글꼴', `글꼴에 없는 글자 ${missing.size}개: ${[...missing].join('')} → python tools/subset-fonts.py 작업/fonts-src`);
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
