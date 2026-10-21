/* engine/terms.js — 아이에게 보이는 말 맞추기 (담임 결정 2026-10-21)
 *  ① 게임 한 번을 '판'이 아니라 '생'이라 부른다: "이번 판에서" → "이번 생에서", "한 판", "판을 클리어" → "생을 클리어"
 *  ② 이번 생의 '임금'은 그 왕의 이름으로: "이번 생의 태조는", "민심을 잃은 태조" (조사는 이름 받침에 맞춤)
 * 카드·기록 데이터는 설계서·집필 파일에서 다시 만들어지므로, 불러온 뒤 여기서 한 번 바꾼다(다시 만들어도 '판'이 돌아오지 않게).
 * 실제 역사 문장·인물의 말("임금님")·도감 설명처럼 '임금'이 일반 낱말인 곳은 그대로 둔다(이름으로 바꾸면 사실이 틀어진다).
 */
(function () {
  'use strict';
  const JK = window.JK;
  const T = (JK.Terms = { count: 0, samples: [] });

  /* ---------- ① 판 → 생 ---------- */
  // '판서·들판·현판·판단·변형판' 같은 낱말은 건드리지 않게, 게임 한 번을 뜻하는 꼴만 고른다
  const NOT = '(?![서단정소자결화본매])';
  const RULES = [
    // 이번 판 · 한 판 · 새 판 · 같은 판 · 다음 판 · 여러 판 …
    [new RegExp('(이번|한|새|같은|다음|매|여러|지난|첫|어느|모든|짧은) 판' + NOT, 'g'), '$1 생'],
    // ~을 고른 판 · 개경에 머문 판 · 한양으로 옮긴 판 …
    [new RegExp('(고른|머문|옮긴|다스린|채운|남은|끝낸|이어 하던|있는|세운|지은|된) 판' + NOT, 'g'), '$1 생'],
    // 선조·인조 판을 · 다섯 왕 판 모두에서 → 선조·인조의 생을 · 다섯 왕의 생 모두에서
    [/(왕|[가-힣]조|[가-힣]종) 판( 모두|을|에서|에|은|이)/g, '$1의 생$2'],
    // 낱말 첫머리의 판 + 조사: 판을 클리어 · 판 전체 · 판마다
    [/(^|[\s(“"'‘「])판(을|이|은|의|에서|에|마다|까지|부터|이라도|이면| 전체| 끝)(?=[\s.,)」”"'’·!?…]|$)/g, '$1생$2'],
  ];
  T.round = function (s) {
    if (typeof s !== 'string' || s.indexOf('판') < 0) return s;
    let out = s;
    for (const [re, to] of RULES) out = out.replace(re, to);
    return out;
  };
  // 데이터에서 바꾸지 않는 칸(조건 식·id·연출 이름 등)
  const SKIP = new Set(['id', 'conditions', 'when', 'done', 'unlock', 'rule', 'url', 'scene', 'set_flag', 'flag', 'variants', 'build', 'skip', 'kind', 'ev', 'doll', 'gauge', 'side', 'level', 'strong', 'grain', 'rarity', 'stages', 'stage', 'choice_type', 'against', 'variant_of', 'required_in', 'model', 'icon', 'card', 'luck']);
  function walk(o) {
    if (Array.isArray(o)) {
      for (let i = 0; i < o.length; i++) {
        if (typeof o[i] === 'string') o[i] = fix(o[i]);
        else walk(o[i]);
      }
    } else if (o && typeof o === 'object') {
      for (const k in o) {
        if (SKIP.has(k)) continue;
        if (typeof o[k] === 'string') o[k] = fix(o[k]);
        else walk(o[k]);
      }
    }
  }
  function fix(s) {
    const t = T.round(s);
    if (t !== s) {
      T.count++;
      if (T.samples.length < 40) T.samples.push([s, t]);
    }
    return t;
  }
  // 시대팩을 불러온 뒤 한 번: 카드·퀴즈·도감·칭호·실각 기록·갈래·왕별 배경과 시대팩 설정의 화면 글
  T.applyEra = function (era) {
    if (T.done) return T.count;
    T.done = true;
    walk(era.data);
    for (const k of ['difficulty', 'trueEnding', 'mind', 'narr', 'events', 'branch', 'stages']) walk(era[k]);
    return T.count;
  };

  /* ---------- ② 임금 → 그 왕의 이름 ---------- */
  const has = (w) => {
    const c = w.charCodeAt(w.length - 1) - 0xac00;
    return c >= 0 && c <= 11171 && c % 28 !== 0;
  };
  const PAIR = { 은: ['은', '는'], 는: ['은', '는'], 이: ['이', '가'], 가: ['이', '가'], 을: ['을', '를'], 를: ['을', '를'], 과: ['과', '와'], 와: ['과', '와'] };
  const josa = (name, j) => (!j ? '' : PAIR[j] ? PAIR[j][has(name) ? 0 : 1] : j);
  // 그 생의 왕 이름(시대팩 stage의 king). 왕을 모르면 첫 왕
  T.king = function (stageId) {
    const era = JK.era;
    const id = stageId || (JK.Game && JK.Game.run && JK.Game.run.stage);
    // 한 판에 두 왕(선조·인조): 지금 그 생의 왕 이름(run.kingName)
    const run = JK.Game && JK.Game.run;
    if (run && run.kingName && run.stage === id) return run.kingName;
    const st = era.stages.find((s) => s.id === id) || era.stages[0];
    return st.kingFirst || st.king;
  };
  // 자리표 {왕} {왕은} {왕이} {왕을} {왕의} … 를 이름 + 맞는 조사로
  T.withKing = function (s, stageId) {
    if (typeof s !== 'string' || s.indexOf('{왕') < 0) return s;
    const name = T.king(stageId);
    return s.replace(/\{왕(은|는|이|가|을|를|과|와|의)?\}/g, (m, j) => name + josa(name, j));
  };
  // 그 생의 임금을 가리키는 글(실각 기록·칭호 이름)의 '임금'을 이름으로. 여러 왕을 함께 말하는 글('다섯 임금', '과학 임금의 벗')은 그대로
  const KEEP = /다섯|만나지 못한 임금|과학 임금/;
  T.kingify = function (s, stageId) {
    if (typeof s !== 'string' || s.indexOf('임금') < 0 || KEEP.test(s)) return s;
    const name = T.king(stageId);
    return s.replace(/임금(은|는|이|가|을|를|과|와|의)?/g, (m, j) => name + josa(name, j));
  };
})();
