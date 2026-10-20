/* engine/save.js — 저장: 이어하기(run), 영구 기록(meta), 설정(settings), 기록 코드 내보내기/불러오기
 * 기기 안(localStorage)에 판(version)을 붙여 저장한다. 저장소를 못 쓰거나 지워져도 게임은 정상 시작한다.
 * 모든 저장소 접근은 try/catch 안에서 한다.
 */
(function () {
  'use strict';
  const JK = (window.JK = window.JK || {});
  const VERSION = 1;
  const SETTINGS_KEY = 'jk.settings.v1';

  function readJSON(key) {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : null;
    } catch (e) {
      return null;
    }
  }
  function writeJSON(key, v) {
    try {
      localStorage.setItem(key, JSON.stringify(v));
      return true;
    } catch (e) {
      return false;
    }
  }
  function remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      /* 무시 */
    }
  }

  const emptyMeta = () => ({
    seen: {}, // 만난 카드 id → 처음 만난 날
    falls: {}, // 실각 기록 id → 횟수
    titles: {}, // 칭호 id → 처음 받은 날
    clears: {}, // 스테이지 id → 클리어 횟수
    plays: 0, // 새로 시작한 판 수
    cardsPlayed: 0,
    quiz: { asked: 0, right: 0 },
  });
  const defaultSettings = () => ({ sound: false, music: false, tier: 'auto', short: false, difficulty: 'normal' });

  const S = (JK.Save = {
    era: 'joseon',
    meta: emptyMeta(),
    run: null,
    settings: defaultSettings(),
    ok: true, // 저장소를 쓸 수 있는지
  });
  const key = (k) => `jk.${S.era}.${k}.v${VERSION}`;

  S.load = function (era) {
    S.era = era || S.era;
    S.meta = Object.assign(emptyMeta(), migrate(readJSON(key('meta'))) || {});
    S.run = readJSON(key('run'));
    if (S.run && S.run.v !== VERSION) S.run = null;
    S.settings = Object.assign(defaultSettings(), readJSON(SETTINGS_KEY) || {});
    try {
      localStorage.setItem('jk.test', '1');
      localStorage.removeItem('jk.test');
      S.ok = true;
    } catch (e) {
      S.ok = false;
    }
    return S;
  };
  // 나중에 저장 형식이 바뀌면 여기서 옛 형식을 고친다
  function migrate(m) {
    return m;
  }
  S.saveMeta = () => writeJSON(key('meta'), S.meta);
  S.saveRun = function (run) {
    S.run = run;
    if (run) {
      run.v = VERSION;
      run.savedAt = Date.now();
      writeJSON(key('run'), run);
    } else remove(key('run'));
  };
  S.saveSettings = () => writeJSON(SETTINGS_KEY, S.settings);
  S.setSetting = function (k, v) {
    S.settings[k] = v;
    S.saveSettings();
  };
  S.clearAll = function () {
    remove(key('meta'));
    remove(key('run'));
    S.meta = emptyMeta();
    S.run = null;
  };

  /* ---------- 영구 기록 도우미 ---------- */
  const today = () => new Date().toISOString().slice(0, 10);
  S.markSeen = function (id) {
    if (!S.meta.seen[id]) S.meta.seen[id] = today();
  };
  S.addFall = (id) => (S.meta.falls[id] = (S.meta.falls[id] || 0) + 1);
  S.addTitle = function (id) {
    if (S.meta.titles[id]) return false;
    S.meta.titles[id] = today();
    return true;
  };

  // 코드를 짧게: 날짜는 버리고 id만 쉼표로 잇는다
  function packMeta(m) {
    const ids = (o) => Object.keys(o).join(',');
    return { s: ids(m.seen), t: ids(m.titles), f: m.falls, c: m.clears, p: m.plays, n: m.cardsPlayed, q: [m.quiz.asked, m.quiz.right] };
  }
  function unpackMeta(k) {
    if (!k || k.seen) return k; // 옛 형식
    const day = today();
    const obj = (str) => {
      const o = {};
      for (const id of (str || '').split(',')) if (id) o[id] = day;
      return o;
    };
    return { seen: obj(k.s), titles: obj(k.t), falls: k.f || {}, clears: k.c || {}, plays: k.p || 0, cardsPlayed: k.n || 0, quiz: { asked: (k.q || [])[0] || 0, right: (k.q || [])[1] || 0 } };
  }

  /* ---------- 기록 코드 (기기를 바꿔도 이어가기) ----------
   * 형식: JK1-<base64url(deflate-raw(JSON))>-<검사 4자리>
   * 압축을 못 쓰는 브라우저면 압축 없이 JK0- 로 만든다.
   */
  function crc16(str) {
    let c = 0xffff;
    for (let i = 0; i < str.length; i++) {
      c ^= str.charCodeAt(i) << 8;
      for (let k = 0; k < 8; k++) c = c & 0x8000 ? ((c << 1) ^ 0x1021) & 0xffff : (c << 1) & 0xffff;
    }
    return c.toString(36).padStart(4, '0').slice(-4).toUpperCase();
  }
  const b64u = (bytes) => {
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const unb64u = (str) => {
    const s = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    const out = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  };
  async function pipe(bytes, stream) {
    const res = new Response(new Blob([bytes]).stream().pipeThrough(stream));
    return new Uint8Array(await res.arrayBuffer());
  }
  S.exportCode = async function () {
    const json = JSON.stringify({ e: S.era, v: VERSION, m: packMeta(S.meta), r: S.run });
    const raw = new TextEncoder().encode(json);
    let body, tag;
    if (window.CompressionStream) {
      body = b64u(await pipe(raw, new CompressionStream('deflate-raw')));
      tag = 'JK1';
    } else {
      body = b64u(raw);
      tag = 'JK0';
    }
    return `${tag}-${body}-${crc16(body)}`;
  };
  // 돌려주는 값: { ok, msg }
  S.importCode = async function (code) {
    try {
      const c = String(code || '').replace(/\s+/g, '');
      const m = /^(JK[01])-([A-Za-z0-9_-]+)-([0-9A-Z]{4})$/.exec(c);
      if (!m) return { ok: false, msg: '기록 코드 모양이 아니에요. 처음부터 끝까지 다 붙여 넣었는지 확인해 주세요.' };
      if (crc16(m[2]) !== m[3]) return { ok: false, msg: '기록 코드 글자가 하나 이상 틀렸어요.' };
      let bytes = unb64u(m[2]);
      if (m[1] === 'JK1') {
        if (!window.DecompressionStream) return { ok: false, msg: '이 브라우저에서는 이 코드를 풀 수 없어요.' };
        bytes = await pipe(bytes, new DecompressionStream('deflate-raw'));
      }
      const d = JSON.parse(new TextDecoder().decode(bytes));
      if (d.e !== S.era) return { ok: false, msg: '다른 게임의 기록 코드예요.' };
      S.meta = Object.assign(emptyMeta(), migrate(unpackMeta(d.m)) || {});
      S.saveMeta();
      S.saveRun(d.r && d.r.v === VERSION ? d.r : null);
      return { ok: true, msg: '기록을 불러왔어요.' };
    } catch (e) {
      return { ok: false, msg: '기록 코드를 읽지 못했어요.' };
    }
  };
})();
