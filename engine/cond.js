/* engine/cond.js — 조건 식 해석기 (설계서 10-5 "조건 식은 한 가지 문법으로")
 * 카드 등장 조건, 버튼 잠금, 건물 분기가 모두 이 식을 쓴다. eval을 쓰지 않는다.
 *
 *   chosen(T07,R)      그 카드에서 오른쪽(R)/왼쪽(L)을 골랐다(이번 판)
 *   seen(SX2)          이번 판에 그 카드를 만났다      seen_ever(SX2) 예전 판까지 포함
 *   flag(이름)          이번 판에 그 깃발이 섰다(역사 분기 경로 등)
 *   gauge(people) < 30  게이지 비교 (< <= > >= == !=)
 *   device(S) >= 5     왕별 장치 값
 *   run_count >= 10    지금까지 시작한 판 수
 *   real(T02)          이번 왕에서 그 사건을 실제 경로(좌우 버튼)로 지났다(10-11)
 *   stage(taejo)  diff(sprout)
 *   &&  ||  !  ( )
 */
(function () {
  'use strict';
  const JK = window.JK;
  const Cond = (JK.Cond = {});
  const cache = new Map();

  function tokenize(s) {
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) {
        i++;
        continue;
      }
      const two = s.slice(i, i + 2);
      if (['&&', '||', '<=', '>=', '==', '!='].includes(two)) {
        out.push({ t: 'op', v: two });
        i += 2;
        continue;
      }
      if ('()!,<>'.includes(c)) {
        out.push({ t: 'op', v: c });
        i++;
        continue;
      }
      if (/[0-9.\-]/.test(c) && !/[A-Za-z_가-힣]/.test(s[i + 1] || '')) {
        let j = i + 1;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        out.push({ t: 'num', v: parseFloat(s.slice(i, j)) });
        i = j;
        continue;
      }
      let j = i;
      while (j < s.length && !/[\s()!,<>=&|]/.test(s[j])) j++;
      if (j === i) throw new Error('조건 식을 읽지 못함: ' + s);
      out.push({ t: 'id', v: s.slice(i, j) });
      i = j;
    }
    return out;
  }
  // 식 → 함수(ctx) 로 바꾼다
  function compile(src) {
    const tk = tokenize(src);
    let p = 0;
    const peek = () => tk[p];
    const eat = (v) => {
      if (!tk[p] || tk[p].v !== v) throw new Error(`조건 식 "${src}": ${v} 가 필요함`);
      p++;
    };
    function orE() {
      let a = andE();
      while (peek() && peek().v === '||') {
        p++;
        const l = a,
          r = andE();
        a = (c) => l(c) || r(c);
      }
      return a;
    }
    function andE() {
      let a = notE();
      while (peek() && peek().v === '&&') {
        p++;
        const l = a,
          r = notE();
        a = (c) => l(c) && r(c);
      }
      return a;
    }
    function notE() {
      if (peek() && peek().v === '!') {
        p++;
        const e = notE();
        return (c) => !e(c);
      }
      return cmpE();
    }
    function cmpE() {
      const a = atom();
      const o = peek();
      if (o && ['<', '<=', '>', '>=', '==', '!='].includes(o.v)) {
        p++;
        const b = atom();
        const f = { '<': (x, y) => x < y, '<=': (x, y) => x <= y, '>': (x, y) => x > y, '>=': (x, y) => x >= y, '==': (x, y) => x == y, '!=': (x, y) => x != y }[o.v]; // eslint-disable-line eqeqeq
        return (c) => f(a(c), b(c));
      }
      return a;
    }
    function atom() {
      const t = tk[p++];
      if (!t) throw new Error(`조건 식 "${src}"이 끝났음`);
      if (t.v === '(') {
        const e = orE();
        eat(')');
        return e;
      }
      if (t.t === 'num') return () => t.v;
      if (t.t === 'id') {
        if (peek() && peek().v === '(') {
          p++;
          const args = [];
          while (peek() && peek().v !== ')') {
            const a = tk[p++];
            args.push(a.v);
            if (peek() && peek().v === ',') p++;
          }
          eat(')');
          const fn = FUNCS[t.v];
          if (!fn) throw new Error(`조건 식 "${src}": 모르는 함수 ${t.v}`);
          return (c) => fn(c, ...args);
        }
        if (t.v === 'run_count') return (c) => (c.meta && c.meta.plays) || 0;
        if (t.v === 'true') return () => true;
        if (t.v === 'false') return () => false;
        return () => t.v; // 낱말(비교용)
      }
      throw new Error(`조건 식 "${src}": ${t.v}`);
    }
    const f = orE();
    if (p < tk.length) throw new Error(`조건 식 "${src}": 남은 글자 ${tk[p].v}`);
    return f;
  }
  const FUNCS = {
    chosen: (c, id, side) => !!(c.run && c.run.choices && c.run.choices[id] === (side === 'R' || side === 'right' ? 'right' : 'left')),
    seen: (c, id) => !!(c.run && c.run.seenRun && c.run.seenRun.includes(id)),
    seen_ever: (c, id) => !!(c.meta && c.meta.seen && c.meta.seen[id]),
    flag: (c, name) => !!(c.run && c.run.flagsRun && c.run.flagsRun[name]),
    gauge: (c, key) => (c.run && c.run.vals ? c.run.vals[key] : 50),
    device: (c, key) => (c.run && c.run.device ? c.run.device[key] || 0 : 0),
    stage: (c, id) => !!(c.run && c.run.stage === id),
    real: (c, id) => !!(c.run && c.run.choices && (c.run.choices[id] === 'right' || c.run.choices[id] === 'left')),
    diff: (c, id) => JK.Game && JK.Game.diffId() === id,
  };
  Cond.funcs = FUNCS;
  // 조건 하나(문자열) 또는 여러 개(배열, 모두 참) 검사. 문법이 틀리면 거짓(검사 도구가 따로 잡는다)
  Cond.test = function (expr, ctx) {
    if (!expr || (Array.isArray(expr) && !expr.length)) return true;
    const list = Array.isArray(expr) ? expr : [expr];
    for (const e of list) {
      let f = cache.get(e);
      if (!f) {
        try {
          f = compile(e);
        } catch (err) {
          console.warn(err.message);
          f = () => false;
        }
        cache.set(e, f);
      }
      if (!f(ctx)) return false;
    }
    return true;
  };
  // 검사 도구용: 문법만 확인 (틀리면 오류 글)
  Cond.check = function (expr) {
    try {
      compile(expr);
      return null;
    } catch (e) {
      return e.message;
    }
  };
})();
