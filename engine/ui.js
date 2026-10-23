/* engine/ui.js — 화면들: 첫 화면, 설정(화질·소리·짧은 판·기록 코드), 나의 기록, 실각, 다음 왕 준비 중 */
(function () {
  'use strict';
  const JK = window.JK;
  const $ = (s) => document.querySelector(s);
  const UI = (JK.UI = {});
  let era, S, W;

  const open = (id) => $(id).classList.remove('hide');
  const close = (id) => $(id).classList.add('hide');

  UI.init = function () {
    era = JK.era;
    S = JK.Save;
    W = JK.World;
    document.title = era.title;
    $('#tTitle').textContent = era.title;
    $('#tSmall').textContent = era.tagline;
    // 첫 화면
    $('#btnContinue').onclick = () => {
      UI.leaveTitle();
      JK.Game.continueRun();
    };
    // 새 판(담임 결정 2026-10-21): 생애 첫 판은 고르지 않고 새싹으로, 두 번째 판부터는 난이도 고르기 화면
    $('#btnNew').onclick = () => {
      if (JK.Game.hasRun() && !confirm('이어 하던 생이 지워지고 처음부터 시작해요. 괜찮나요?')) return;
      // 시험 도구용: ?pick=normal 이면 고르기 화면 없이 첫 왕을 그 난이도로
      const pick = new URLSearchParams(location.search).get('pick');
      if (pick && era.difficulty[pick]) return startWith(era.stages[0].id, pick);
      // 생애 첫 판: 태조 + 새싹(고르기 없이). 그 뒤로는 왕 고르기 → 난이도 고르기
      if (UI.firstEver()) return startWith(era.stages[0].id, 'sprout', '첫 생은 🌱 새싹으로 시작해요');
      showKingPick();
    };
    $('#btnRecords').onclick = () => UI.showRecords();
    $('#btnHow').onclick = () => UI.showHow();
    // 오른쪽 위 버튼
    $('#btnSound').onclick = () => {
      JK.Audio.setOn(!JK.Audio.on);
      paintSound();
    };
    $('#btnSet').onclick = () => {
      paintSettings();
      open('#settings');
    };
    $('#btnHome').onclick = () => UI.toTitle();
    $('#btnScroll').onclick = () => UI.showScroll();
    document.querySelectorAll('[data-close]').forEach((b) => (b.onclick = () => close('#' + b.dataset.close)));
    // 설정
    $('#optSound').onchange = (e) => {
      JK.Audio.setOn(e.target.checked);
      paintSound();
    };
    $('#optMusic').onchange = (e) => JK.Audio.setMusic(e.target.checked);
    $('#optShort').onchange = (e) => S.setSetting('short', e.target.checked);
    // 난이도: 열리지 않은 단계는 잠김(점검 상자에서는 모두 열림)
    const dsel = $('#optDiff');
    dsel.innerHTML = '';
    for (const id in era.difficulty) {
      const d = era.difficulty[id];
      const o = document.createElement('option');
      o.value = id;
      const locked = !UI.diffOpen(id);
      o.textContent = `${d.icon} ${d.name}${locked ? ' 🔒 ' + d.unlock.text : ''}`;
      o.disabled = locked;
      dsel.appendChild(o);
    }
    dsel.onchange = (e) => {
      JK.Game.setDifficulty(e.target.value);
      paintSettings();
    };
    document.querySelectorAll('input[name="tier"]').forEach((r) =>
      r.addEventListener('change', (e) => {
        const v = e.target.value;
        S.setSetting('tier', v);
        if (v === 'auto') W.setTier(W.getTier(), false);
        else W.setTier(v, true);
        paintSettings();
      })
    );
    $('#btnExport').onclick = async () => {
      const code = await S.exportCode();
      $('#codeBox').value = code;
      $('#codeMsg').textContent = `기록 코드 ${code.length}자. 「복사」를 눌러 클래스룸·메모장에 붙여 두세요.`;
    };
    $('#btnCopy').onclick = async () => {
      const t = $('#codeBox').value;
      if (!t) return;
      try {
        await navigator.clipboard.writeText(t);
        $('#codeMsg').textContent = '복사했어요.';
      } catch (e) {
        $('#codeBox').select();
        $('#codeMsg').textContent = '글자를 모두 골랐어요. Ctrl+C 로 복사하세요.';
      }
    };
    $('#btnImport').onclick = async () => {
      const r = await S.importCode($('#codeBox').value);
      $('#codeMsg').textContent = r.msg;
      if (r.ok) paintTitle();
    };
    $('#btnWipe').onclick = () => {
      if (!confirm('이 기기의 기록(도감·칭호·이어하기)을 모두 지울까요?')) return;
      if (!confirm('정말 지울까요? 기록 코드를 먼저 복사해 두면 되살릴 수 있어요.')) return;
      S.clearAll();
      $('#codeMsg').textContent = '기록을 지웠어요.';
      paintTitle();
    };
    // 실각·준비 중
    // 실각 뒤: 같은 왕 다시(난이도 고르기) · 다른 왕 고르기 · 첫 화면
    $('#btnRetry').onclick = () => showDiffPick(JK.Game.run.stage, { afterFall: true });
    $('#btnFallKings').onclick = () => showKingPick();
    $('#btnFallHome').onclick = () => {
      close('#fall');
      UI.toTitle();
    };
    $('#btnSoonHome').onclick = () => {
      close('#soon');
      UI.toTitle();
    };
    $('#btnSoonRecords').onclick = () => UI.showRecords();
    // 왕을 마친 뒤: 같은 왕 다시(난이도 고르기) · 다른 왕 고르기 · 첫 화면
    $('#btnAgain').onclick = () => showDiffPick((JK.Game.lastEnd || {}).from);
    $('#btnOtherKing').onclick = () => showKingPick();
    paintSound();
    paintTitle();
  };

  // 기록이 전혀 없는 기기의 첫 판(이미 한 판이라도 한 기기는 아님)
  UI.firstEver = () => !S.meta.plays && !Object.keys(S.meta.seen || {}).length && !JK.Game.hasRun() && new URLSearchParams(location.search).get('debug') !== '1';
  function startWith(stageId, id, note, opts) {
    ['#diffPick', '#kingPick', '#soon', '#fall', '#ending'].forEach(close);
    S.setSetting('difficulty', id);
    UI.leaveTitle();
    JK.Game.newRun(stageId, id, opts);
    if (note) setTimeout(() => JK.Cards.toast(note, 3200), 1400);
  }
  // 왕 고르기(담임 결정 2026-10-21): 아직 없는 왕은 '준비 중'으로 보이되 누를 수 없다
  function showKingPick() {
    const box = $('#kpList');
    box.innerHTML = '';
    const kings = S.meta.kings || {};
    for (const st of era.stages) {
      const k = kings[st.id] || {};
      const b = document.createElement('button');
      b.className = 'kp-card' + (st.ready ? '' : ' locked');
      b.disabled = !st.ready;
      const stars = k.asked ? '⭐'.repeat(k.stars || 0) + '☆'.repeat(Math.max(0, k.asked - (k.stars || 0))) : '';
      const gold = Object.keys(k.trueEnd || {}).map((d) => (era.difficulty[d] || {}).icon || '').join('');
      const lv = ((era.data.stageInfo || {})[st.id] || {}).level || {};
      b.innerHTML = `<span class="kp-seal">${esc(st.seal)}</span><b>${esc(st.king)}</b><small>${esc(st.title)} · ${esc(st.years)}</small>${lv.stars ? `<small class="kp-lv">${esc(lv.label)} ${lv.stars}</small>` : ''}` +
        (st.ready ? `<small class="kp-rec">${k.clears ? `클리어 ${k.clears}번 ${stars}${gold ? ' · 진엔딩 ' + gold : ''}` : '아직 안 해 봤어요'}</small>` : '<small class="kp-rec">준비 중</small>');
      if (st.ready) b.onclick = () => showDiffPick(st.id);
      box.appendChild(b);
    }
    ['#soon', '#fall'].forEach(close);
    open('#kingPick');
  }
  UI.showKingPick = showKingPick;
  function showDiffPick(stageId, opts) {
    stageId = stageId || era.stages[0].id;
    const st = era.stages.find((s) => s.id === stageId);
    $('#dpHead').textContent = `${st.king} · 난이도를 골라요`;
    close('#kingPick');
    const box = $('#dpList');
    box.innerHTML = '';
    for (const id in era.difficulty) {
      const d = era.difficulty[id];
      const lock = !UI.diffOpen(id);
      const b = document.createElement('button');
      b.className = 'dp-card' + (lock ? ' locked' : '') + (id === (S.settings.difficulty || era.difficultyDefault) && !lock ? ' cur' : '');
      b.disabled = lock;
      b.innerHTML = `<span class="dp-icon">${d.icon}</span><b>${esc(d.name)}</b><small>${lock ? '🔒 ' + esc((d.unlock && d.unlock.text) || '') : esc(d.desc || '')}</small>`;
      if (!lock) b.onclick = () => startWith(stageId, id, '', opts);
      box.appendChild(b);
    }
    open('#diffPick');
  }
  UI.showDiffPick = showDiffPick;
  function paintSound() {
    const on = JK.Audio.on;
    $('#btnSound').classList.toggle('off', !on);
    $('#btnSound').setAttribute('aria-label', on ? '소리 끄기' : '소리 켜기');
    $('#optSound').checked = on;
    $('#optMusic').checked = JK.Audio.musicOn;
  }
  function paintSettings() {
    const v = W.isTierLocked() ? W.getTier() : 'auto';
    document.querySelectorAll('input[name="tier"]').forEach((r) => (r.checked = r.value === v));
    $('#tierNow').textContent = `지금: ${W.TIERS[W.getTier()].name}`;
    $('#optShort').checked = !!S.settings.short;
    for (const o of $('#optDiff').options) {
      const d = era.difficulty[o.value];
      const locked = !UI.diffOpen(o.value);
      o.disabled = locked;
      o.textContent = `${d.icon} ${d.name}${locked ? ' 🔒 ' + d.unlock.text : ''}`;
    }
    $('#optDiff').value = JK.Game.diffId();
    const dd = era.difficulty[JK.Game.diffId()];
    $('#diffNote').textContent = `게이지 변화 ×${dd.mult} · 다음 왕 시작 게이지 ${dd.carry === 0.5 ? '절반' : dd.carry === 0.25 ? '1/4' : '3/4'} 이어받기 · 퀴즈 보기 ${dd.quizOptions}개${dd.quizRetry ? '(틀리면 한 번 더)' : ''}. 역사는 어느 단계든 같아요.`;
    $('#saveWarn').style.display = S.ok ? 'none' : '';
    paintSound();
  }
  UI.paintSettings = paintSettings;
  function paintTitle() {
    const has = JK.Game.hasRun();
    $('#btnContinue').classList.toggle('hide', !has);
    if (has) {
      const r = S.run;
      const st = era.stages.find((s) => s.id === r.stage);
      $('#btnContinue').textContent = r.waiting ? '이어 하기 · 다음 왕을 기다리는 중' : `이어 하기 · ${st.king} ${Math.min(r.pos + 1, r.deck.length)}/${r.deck.length}`;
    }
    $('#btnNew').textContent = has ? '처음부터' : '시작하기';
  }

  // 왕 하나라도 마친 기록이 있는지(그러면 모든 난이도가 열림)
  UI.anyClear = () => Object.values(S.meta.clears || {}).some((n) => n > 0);
  // 난이도 단계가 열렸는지(설계서 10-7)
  UI.diffOpen = function (id) {
    const d = era.difficulty[id];
    if (!d.unlock) return true;
    if (new URLSearchParams(location.search).get('debug') === '1') return true;
    if (d.unlock.rule === 'clearAny') return UI.anyClear();
    if (d.unlock.rule === 'fullRunNormal') return !!(S.meta.fullRuns && S.meta.fullRuns.normal);
    if (d.unlock.rule === 'archive30') return (S.meta.archive || 0) >= 30;
    return false;
  };
  const STATE_NAME = { smooth: '순조롭게', forced: '억지로', late: '늦게' };
  const bname = (k) => (era.map.buildings[k] && era.map.buildings[k].name) || '';

  /* ---------- 첫 화면 오가기 ---------- */
  UI.leaveTitle = function () {
    $('#title').classList.add('gone');
    document.body.classList.add('playing');
    document.body.classList.remove('over');
    W.state.title = false;
  };
  UI.toTitle = function () {
    if (JK.Events) JK.Events.hideHud();
    if (JK.EvFx) JK.EvFx.reset();
    JK.Game.state = 'title';
    JK.Cards.hide();
    ['#fall', '#soon', '#quiz', '#records', '#kingPick', '#diffPick', '#compare', '#ending', '#intro'].forEach(close);
    document.body.classList.remove('playing', 'over');
    $('#btnScroll').style.display = 'none';
    W.state.inkTarget = 0;
    W.state.ink = 0;
    W.setOrbit(false);
    W.state.title = true;
    W.camTo(W.CAM_TITLE, 2);
    $('#title').classList.remove('gone');
    paintTitle();
  };
  // 처음 위기 알림창은 Enter·Space·Esc로도 닫힌다
  window.addEventListener('keydown', (e) => {
    const w = document.getElementById('warnFirst');
    if (w && !w.classList.contains('hide') && ['Enter', ' ', 'Escape'].includes(e.key)) {
      w.classList.add('hide');
      e.preventDefault();
    }
  });
  UI.setStage = function (st) {
    $('#stageSeal').textContent = st.seal;
    $('#stageName').textContent = `${st.king} · ${st.title}`;
  };
  // 왕별 장치 눈금(설계서 2장, 세종 발명 진행도 0~6): 두루마리 눈금이 하나씩 금빛으로 찬다. 장치가 없는 왕은 숨긴다
  UI.setDevice = function (cfg, vals, instant, delta) {
    const el = $('#devBar');
    if (!el) return;
    el.style.display = cfg ? '' : 'none';
    if (!cfg) return;
    // 글만 보이는 막대(전쟁 중 — 카드마다 국고 −1)
    el.classList.toggle('text', !!cfg.text);
    if (cfg.text) {
      el.dataset.key = cfg.key;
      $('#devName').textContent = cfg.name;
      $('#devTicks').innerHTML = '';
      $('#devNum').textContent = cfg.text;
      el.title = cfg.hint || cfg.name;
      return;
    }
    const v = vals[cfg.key] || 0;
    // 저울(가운데 0, 양쪽으로 기움 — 영조·정조 붕당 저울): 칸 min~max, 가운데에서 v까지 채움(왼쪽 붉은·오른쪽 푸른)
    el.classList.toggle('signed', !!cfg.signed);
    if (cfg.signed) {
      const n = cfg.max - cfg.min + 1;
      if (el.dataset.key !== cfg.key + n) {
        el.dataset.key = cfg.key + n;
        $('#devName').textContent = cfg.name;
        $('#devTicks').innerHTML = Array.from({ length: n }, (_, i) => `<i data-v="${cfg.min + i}"${cfg.min + i === 0 ? ' class="mid"' : ''}></i>`).join('');
      }
      [...$('#devTicks').children].forEach((t) => {
        const tv = +t.dataset.v;
        t.classList.toggle('on', tv !== 0 && Math.sign(tv) === Math.sign(v) && Math.abs(tv) <= Math.abs(v));
        t.classList.toggle('neg', tv < 0);
      });
      const a = Math.abs(v);
      el.classList.toggle('zwarn', a === 3);
      el.classList.toggle('zdanger', a >= 4);
      const side = v < 0 ? cfg.sides.low : cfg.sides.high;
      $('#devNum').textContent = v ? `${side} ${a}` : '가운데';
      el.title = `${cfg.name} ${v ? side + ' 쪽으로 ' + a + '칸' : '가운데'}` + (cfg.hint ? ` — ${cfg.hint}` : '');
      if (!instant && delta) {
        el.classList.remove('up', 'down');
        void el.offsetWidth;
        // 가운데로 오면 좋은 쪽(초록), 멀어지면 붉은 쪽
        el.classList.add(Math.abs(v) < Math.abs(v - delta) ? 'up' : 'down');
        $('#devDelta').textContent = Math.abs(v) < Math.abs(v - delta) ? '탕평' : '기울어짐';
      }
      return;
    }
    const trig = cfg.triggers ? JK.Game.deviceTriggers() : [];
    if (el.dataset.key !== cfg.key + cfg.max) {
      el.dataset.key = cfg.key + cfg.max;
      $('#devName').textContent = cfg.name;
      $('#devTicks').innerHTML = Array.from({ length: cfg.max }, (_, i) => `<i data-n="${i + 1}"></i>`).join('');
    }
    el.title = `${cfg.name} ${v} / ${cfg.max}` + (cfg.hint ? ` — ${cfg.hint}` : '');
    [...$('#devTicks').children].forEach((t, i) => {
      t.classList.toggle('on', i < v);
      // 장치 카드가 나오는 문턱(난이도별)에 작은 별
      t.classList.toggle('mark', trig.includes(i + 1));
    });
    $('#devNum').textContent = `${v}/${cfg.max}`;
    if (!instant && delta) {
      el.classList.remove('up', 'down');
      void el.offsetWidth;
      el.classList.add(delta > 0 ? 'up' : 'down');
      $('#devDelta').textContent = (delta > 0 ? '+' : '') + delta;
    }
  };

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  /* ---------- 실각 ---------- */
  UI.showFall = function (o) {
    $('#fallPortrait').src = o.img || '';
    $('#fallName').textContent = JK.Terms.kingify(o.rec.name);
    // 어떤 위기에서 무너졌는지: 위기 이름, 게이지와 그때 값, 고른 대응, 그때의 실각 확률 (4-2, 10-8-3 ④)
    const fc = $('#fallCrisis');
    fc.style.display = o.crisis ? '' : 'none';
    if (o.crisis) {
      const c = o.crisis;
      fc.innerHTML = `<b>${esc(c.name)}</b> — ${esc(c.gauge)} ${c.value}, ${esc(c.choice)}, 무너질 확률 ${Math.round(c.p * 100)}%`;
    }
    $('#fallMsg').textContent = (o.preview ? '(미리 보기) ' : '') + JK.Terms.kingify(o.rec.text);
    $('#fallReal').textContent = o.real || '';
    $('#fallHint').textContent = o.hint || '';
    $('#fallHint').style.display = o.hint ? '' : 'none';
    open('#fall');
  };

  /* ---------- 나의 역사 vs 실제 역사 (설계서 10-10-5) ----------
   * entry: { st, ch{카드: right|left|alt}, ap{카드: 다른 길 번호}, bs{카드: 건물 상태}, held[[이름, %]], fell }
   */
  const card = (id) => era.data.cards.find((c) => c.id === id);
  const firstStep = (t) => String(t || '').split('→')[0].trim();
  function compareRows(entry) {
    const hist = era.data.cards.filter((x) => x.kind === 'history' && !x.variant_of && x.stages.includes(entry.st)).sort((a, b) => a.order - b.order);
    return hist.map((c) => {
      const sk = entry.ch[c.id];
      const alt = sk === 'alt' && c.paths ? c.paths.alt[entry.ap[c.id] || 0] : null;
      let mine;
      // 앞의 다른 길 때문에 바뀐 사건(변형판): 실제 경로가 남아 있던 변형판(T02v1)만 같은 길
      const vc = sk && sk.startsWith('v:') && card((entry.vr || {})[c.id]);
      if (vc) {
        const vs = vc.choices[sk.slice(2)];
        return { c, ev: c.event || c.learn || c.id, mine: { path: '바뀐 사건(앞의 다른 길 때문에)', label: vs.label, text: firstStep(vs.this_run) }, same: vc.event_type === 'normal', alt: null, real: { year: c.year || '', text: c.real_history || '', src: JK.Quiz.sourceLine(c.sources) } };
      }
      if (alt) mine = { path: '다른 길', label: alt.label, text: alt.this_run };
      else if (sk) mine = { path: '실제 경로', label: c.choices[sk].label, text: firstStep(c.choices[sk].this_run), state: entry.bs[c.id] };
      else mine = { path: '', label: '', text: '이번 생에서 만나지 못했어요' };
      // same: 같은 길 true / 다른 길 false / 만나지 못함 null
      return { c, ev: c.event || c.learn || c.id, mine, same: sk ? sk !== 'alt' : null, alt, real: { year: c.year || '', text: c.real_history || '', src: JK.Quiz.sourceLine(c.sources) } };
    });
  }
  UI.compareLine = function (entry, ids) {
    const row = compareRows(entry).find((r) => ids.includes(r.c.id) && r.same === false);
    return row ? `나의 역사: ${row.mine.label} — ${row.mine.text} / 실제 역사: ${row.real.text}` : '';
  };
  // 화면 위 금빛 실록 도장(10-11-3): 진엔딩이 멀어지면 금이 간다
  UI.setSeal = function (r, crackNow) {
    const el = $('#trueSeal');
    if (!el) return;
    el.classList.toggle('broken', !!r.broken);
    el.title = r.broken ? '이번 생의 진엔딩은 멀어졌어요' : `실제 역사와 같은 사건 ${r.same} / ${r.counted}`;
    if (crackNow) {
      el.classList.remove('crack');
      void el.offsetWidth;
      el.classList.add('crack');
    }
  };
  UI.showCompare = function (entry, o) {
    o = o || {};
    const st = era.stages.find((s) => s.id === entry.st);
    const rows = compareRows(entry);
    $('#cmpKing').textContent = `${st.king} · ${entry.d}`;
    // 맨 위에 크게: 실제 역사와 같은 사건 N / 지금까지 지난 사건(10-11-4), 그 아래 진엔딩까지 남은 것
    const tr = entry.tr;
    $('#cmpTrue').style.display = tr ? '' : 'none';
    if (tr) {
      const si = era.stages.findIndex((s) => s.id === entry.st);
      const nst = era.stages[si + 1];
      const toOther = Math.max(0, ((era.trueEnding || {}).otherEndingAlts || 5) - (entry.alts || 0));
      $('#cmpTrueN').textContent = `${tr.same} / ${tr.counted}`;
      $('#cmpTrueLeft').textContent = tr.broken
        ? `이번 생은 진엔딩이 멀어졌어요. 대신 다른 역사 칭호를 노려 보세요${toOther ? `: 「다른 조선」까지 다른 길 ${toOther}개 더` : ''}.`
        : `진엔딩까지: 남은 사건 ${tr.left}개를 실제대로.${nst ? ` 다음 왕은 ${nst.king}.` : ''}`;
      $('#cmpTrue').classList.toggle('broken', !!tr.broken);
    }
    const box = $('#cmpRows');
    box.innerHTML = '';
    for (const r of rows) {
      const el = document.createElement('div');
      el.className = 'c-row ' + (r.same === null ? 'none' : r.same ? 'same' : 'diff');
      const et = r.c.event_type;
      const stTag = r.mine.state && r.mine.state !== 'smooth' ? ` <span class="bst ${r.mine.state}">${STATE_NAME[r.mine.state]} 지음</span>` : '';
      el.innerHTML =
        `<div class="c-ev"><b>${esc(r.ev)}</b>${r.same === null ? '' : `<span class="c-stamp">${r.same ? (et === 'judge' ? '실제대로(어느 쪽이든)' : '같은 길') : '실제와 달라요'}</span>`}${et === 'life' && r.same === false ? '<span class="c-note">진엔딩 셈에서 빼요</span>' : ''}</div>` +
        `<div class="c-mine">${r.mine.path ? `<span class="c-path">${esc(r.mine.path)} · ${esc(r.mine.label)}</span>` : ''}${esc(r.mine.text)}${stTag}</div>` +
        `<div class="c-real">${r.real.year ? `<span class="c-year">${esc(r.real.year)}</span> ` : ''}${esc(r.real.text)}${r.real.src ? ` <span class="c-src">(${esc(r.real.src)})</span>` : ''}</div>`;
      box.appendChild(el);
    }
    const same = rows.filter((r) => r.same === true).length,
      diff = rows.filter((r) => r.same === false).length;
    const titles = era.data.titles.filter((t) => t.rule.startsWith('flag:') && rows.some((r) => r.alt && 'flag:' + r.alt.set_flag === t.rule)).map((t) => `「${t.name}」`);
    $('#cmpSum').innerHTML =
      `<b>같은 길 ${same} · 다른 길 ${diff}</b>` +
      (titles.length ? `<br>다른 길 칭호: ${titles.join(' ')}` : '') +
      `<br>위기 기록: ${entry.held.length ? entry.held.map(([n, p]) => `${esc(n)}(${p}%에서 버팀)`).join(', ') : '버틴 위기 없음'}${entry.fell ? ` · 무너짐 ${entry.fell}번` : ''}`;
    // 합류 문장(10-10-2): 다른 길로 간 일이 다음 임금 때 어떻게 큰 줄기로 돌아오는지
    const merges = rows.filter((r) => r.alt && r.alt.merge_text);
    $('#cmpMerge').innerHTML = merges.length
      ? '<h4>그 뒤의 이야기</h4>' + merges.map((r) => `<p>${esc(r.alt.merge_text)}${r.alt.merge_real ? `<br><small>실제 역사: ${esc(r.alt.merge_real.text)}${r.alt.merge_real.out_of_textbook ? ' <span class="tag-out">교과서 밖</span>' : ''}</small>` : ''}</p>`).join('')
      : '';
    $('#btnCmpNext').textContent = o.view ? '닫기' : '사관이 실제 역사를 묻습니다 →';
    $('#btnCmpNext').onclick = () => {
      $('#compare').classList.add('hide');
      if (o.onNext) o.onNext();
    };
    $('#compare').scrollTop = 0;
    open('#compare');
  };

  /* ---------- 엔딩 자리 (설계서 10-11-3·6) ----------
   * kind: 'true' 진엔딩 / 'other' 다른 조선의 한양. 특별 연출(두루마리가 겹쳐 하나, 다섯 왕 건물이 차례로 빛남, 카메라가 한 바퀴)은
   * 다섯 왕이 모두 들어온 뒤 채운다. 지금은 두루마리 겹침·금빛 도장·사관 문장·칭호·카메라 한 바퀴까지.
   */
  UI.showEnding = function (kind, o) {
    o = o || {};
    const d = era.difficulty[o.diff] || {};
    const t = era.data.titles.find((x) => x.rule === 'true:' + o.diff);
    const el = $('#ending');
    el.classList.toggle('other', kind === 'other');
    // 갈래 엔딩(10-14-2): 푸른 실록 · 갈래 이름과 칭호 · 사관의 말
    el.classList.toggle('branch', kind === 'branch');
    const br = o.branch || {};
    $('#endKind').textContent = kind === 'true' ? '진엔딩' : kind === 'branch' ? `갈래 엔딩 · ${br.name || ''}` : '다른 조선의 한양';
    $('#endTitle').textContent = kind === 'true' ? (t ? `「${t.name}」` : '') : kind === 'branch' ? `「${br.title || ''}」` : '';
    $('#endDiff').textContent = `${d.icon || ''} ${d.name || ''}`;
    $('#endLine').textContent = JK.Terms.withKing(kind === 'true' ? '{왕의} 실록은 실제와 같았다.' : kind === 'branch' ? br.sagwan || '' : '이 실록은 실제와 달랐지만, 이 또한 {왕의} 길이었다.');
    $('#endCount').textContent = o.route ? `실제 역사와 같은 사건 ${o.route.same} / ${o.route.counted}` : '';
    $('#endPreview').style.display = o.preview ? '' : 'none';
    W.setOrbit(true);
    open('#ending');
  };

  /* ---------- 왕별 소개 화면(설계서 10-12 ③) ----------
   * 사관 두루마리에 2~3문장, 그 왕의 쉬움·어려움과 시작 게이지. 누르면 첫 카드
   */
  // 사관의 두루마리(data/common/scrolls.js)가 있는 왕은 석 장: 지금까지 → 앞으로 닥칠 일(예언) → 사관의 귀띔.
  //   review: 게임 중 📜 단추로 다시 펼침(예언 장부터, 이루어진 예언에 ✔)
  UI.showIntro = function (st, info, done, review) {
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    const it = info.intro || {};
    const sc = (era.data.scrolls || {})[st.id];
    $('#inSeal').textContent = st.seal;
    $('#inKing').textContent = `${st.king} · ${st.years}`;
    $('#inTitle').textContent = st.title;
    const lv = info.level || {};
    const sv = JK.Game.run ? JK.Game.run.start : null;
    const levelHtml = lv.stars ? esc(`${lv.label} ${lv.stars}`) : '';
    const startHtml = sv ? era.gauges.map((g) => `<span><svg viewBox="0 0 24 24">${g.icon}</svg>${esc(g.name)} <b>${sv[g.key]}</b></span>`).join('') : '';
    const srcOf = (t, out) => (t ? `근거: ${esc(t)}${out ? ' · 일부 <span class="tag-out">교과서 밖</span>' : ''}` : '');
    const pages = sc ? [scrollPast(sc.past), scrollOmens(sc.omens), scrollTips(sc.tips)] : [{ html: `<p id="inText">${esc(it.text || '')}</p>`, src: it.sources_text ? srcOf(JK.Quiz.sourceLine(it.sources) || '', it.out_of_textbook) : '' }];
    const box = $('#intro');
    box.classList.toggle('scroll', !!sc);
    let i = review && sc ? 1 : 0;
    const render = () => {
      const p = pages[i];
      const last = i === pages.length - 1;
      $('#inPage').innerHTML = p.html;
      $('#inPage').scrollTop = 0;
      $('#inSrc').innerHTML = p.src || '';
      $('#inLevel').innerHTML = last && !review ? levelHtml : '';
      $('#inStart').innerHTML = last && !review ? startHtml : '';
      $('#inDots').innerHTML = pages.length > 1 ? pages.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('') : '';
      $('#inBack').style.display = i > (review ? 1 : 0) ? '' : 'none';
      $('#inGo').textContent = !last ? '다음 장 →' : review ? '두루마리를 만다' : '나라를 다스리러 간다 →';
      const box2 = box.querySelector('.in-box');
      box2.classList.remove('turn');
      void box2.offsetWidth;
      box2.classList.add('turn');
    };
    box.classList.remove('hide');
    let closed = false;
    const go = () => {
      if (closed) return;
      if (i < pages.length - 1) {
        i++;
        return render();
      }
      closed = true;
      box.classList.add('hide');
      done && done();
    };
    $('#inBack').onclick = () => {
      if (i > 0) i--;
      render();
    };
    $('#inGo').onclick = go;
    box.onkeydown = null;
    UI._introGo = go;
    render();
  };
  function scrollPast(p) {
    const ln = (x) => `<li><span class="sc-ic">${x.icon}</span>${x.year ? `<b class="sc-year">${esc(x.year)}</b>` : ''}<span>${esc(x.text)}${x.out ? ' <span class="tag-out">교과서 밖</span>' : ''}</span></li>`;
    return {
      html: `<h3 class="sc-head">📜 ${esc(p.head)}</h3><ul class="sc-list">${p.lines.map(ln).join('')}</ul>${p.lead ? `<p class="sc-lead">${esc(p.lead)}</p>` : ''}<ul class="sc-list sc-small">${(p.list || []).map(ln).join('')}</ul>`,
      src: p.sources_text ? `근거: ${esc(p.sources_text)}` : '',
    };
  }
  function scrollOmens(p) {
    const hit = (JK.Game.run && JK.Game.run.omens) || [];
    const ln = (x) => `<li class="${hit.includes(x.id) ? 'hit' : ''}"><span class="sc-ic">${x.icon}</span><span>${esc(x.text)}${x.out ? ' <span class="tag-out">교과서 밖</span>' : ''}</span>${hit.includes(x.id) ? '<b class="sc-hit">✔ 이루어짐</b>' : ''}</li>`;
    return {
      html: `<h3 class="sc-head">🔭 ${esc(p.head)}</h3>${p.sub ? `<div class="sc-sub">${esc(p.sub)}</div>` : ''}${p.lead ? `<p class="sc-lead">${esc(p.lead)}</p>` : ''}<ul class="sc-list sc-omen">${p.list.map(ln).join('')}</ul>${p.foot ? `<p class="sc-foot">${esc(p.foot)}${hit.length ? ` <b>(${hit.length} / ${p.list.length})</b>` : ''}</p>` : ''}`,
      src: p.sources_text ? `근거: ${esc(p.sources_text)}` : '',
    };
  }
  function scrollTips(p) {
    const d = JK.Game.run ? JK.Game.run.diff : 'normal';
    const riddle = d === 'sage' || d === 'annals';
    const icon = (x) => {
      const g = era.gauges.find((y) => y.key === x.gauge);
      return x.icon || (g ? `<svg viewBox="0 0 24 24">${g.icon}</svg>` : { device: '⚙️', alt: '🔀' }[x.gauge] || '⚖️');
    };
    const ln = (x) => `<li><span class="sc-ic">${icon(x)}</span><span>${esc(riddle ? x.riddle || x.plain : x.plain)}</span></li>`;
    return {
      html: `<h3 class="sc-head">🤫 ${esc(p.head)}</h3>${p.sub ? `<div class="sc-sub">${esc(riddle ? p.sub + ' — 수수께끼로' : p.sub)}</div>` : ''}<ul class="sc-list sc-tips">${p.list.map(ln).join('')}</ul>`,
      src: '',
    };
  }
  /* ---------- 하는 방법(첫 화면 「하는 방법 !」) ----------
   * 네 장: ① 카드 넘기기(연습 카드 두 장을 직접 끌어 봄) ② 네 막대 ③ 실제 역사와 다른 길 ④ 왕마다 다른 장치·두루마리·퀴즈
   * 연습 카드는 게임 기록에 남지 않는다 */
  const HOW_PRACTICE = [
    { icon: '🍚', who: '곳간지기', text: '전하, 연습 삼아 한 번 골라 보소서! 곳간의 쌀을 어찌할까요?', left: { label: '백성에게 나눈다', fx: { people: 10, treasury: -10 } }, right: { label: '곳간에 쌓아 둔다', fx: { treasury: 10, people: -10 } } },
    { icon: '🧱', who: '성을 지키는 군관', text: '성벽 한쪽이 낡았사옵니다. 고칠까요?', left: { label: '그대로 둔다', fx: { treasury: 5, army: -10 } }, right: { label: '성벽을 고친다', fx: { army: 10, treasury: -10 } } },
  ];
  const HOW_PAGES = [
    { head: '👆 카드를 넘겨요', lead: '신하가 카드로 일을 아뢰어요. 카드를 왼쪽이나 오른쪽으로 끌면 그쪽 답을 골라요. (← → 키도 돼요)', practice: true },
    {
      head: '📊 네 막대를 지켜요',
      list: [
        { g: 'people', text: '백성 · 양반 · 국고 · 국방, 네 막대가 나라의 힘이에요.' },
        { icon: '⚠️', text: '막대가 너무 낮아도, 너무 높아도 위기 카드가 와요. 위기를 넘기지 못하면 왕위에서 물러나요(실각).' },
        { icon: '⚖️', text: '네 막대를 가운데쯤에 고루 두는 것이 비결이에요.' },
        { icon: '🔵', text: '고르기 전에 막대 위의 점을 보면, 어느 막대가 움직일지 미리 알 수 있어요.' },
      ],
    },
    {
      head: '📜 실제 역사와 다른 길',
      list: [
        { icon: '📜', text: '「실제 역사」 카드는 정말 있었던 일이에요. 실제와 같은 쪽을 고르면 진엔딩(실제 역사대로 끝나는 결말)에 다가가요.' },
        { icon: '↑', text: '카드 아래 「↑ 다른 길」을 위로 끌면, 실제와 다른 이야기로 갈 수도 있어요.' },
        { icon: '🎲', text: '가끔 돌발 사건이 터지고, 왕의 마음이 지치기도 해요. 이번 생에서만 일어나는 일이에요.' },
      ],
    },
    {
      head: '👑 왕마다 달라요',
      list: [
        { icon: '📜', text: '시작할 때 「사관의 두루마리」를 꼭 읽어요. 앞으로 닥칠 일과 귀띔이 적혀 있어요. 게임 중에는 오른쪽 위 📜로 다시 볼 수 있어요.' },
        { icon: '⚙️', text: '세종은 발명 진행도, 선조·인조는 전쟁 버티기, 영조·정조는 붕당 저울, 고종은 개항 압력 — 왕마다 특별한 막대가 하나 더 있어요.' },
        { icon: '⭐', text: '게임이 끝나면 퀴즈로 별을 모으고, 칭호도 받아요. 태조부터 시작해 보세요!' },
      ],
    },
  ];
  UI.showHow = function () {
    // 첫 화면 단추에 포커스가 남으면 Space·Enter가 그 단추를 또 누른다
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
    const box = $('#howTo');
    let i = 0;
    let done = 0;
    const gIcon = (k) => {
      const g = era.gauges.find((x) => x.key === k);
      return g ? `<svg viewBox="0 0 24 24">${g.icon}</svg>` : '';
    };
    const vals = { people: 50, nobles: 50, treasury: 50, army: 50 };
    const gaugesHtml = () => era.gauges.map((g) => `<div class="hw-g" data-k="${g.key}">${gIcon(g.key)}<span class="hw-bar"><i style="height:${vals[g.key]}%"></i></span><b class="hw-d"></b><span class="hw-n">${esc(g.name)}</span></div>`).join('');
    const render = () => {
      const p = HOW_PAGES[i];
      let h = `<h3 class="sc-head">${esc(p.head)}</h3>`;
      if (p.lead) h += `<p class="sc-lead">${esc(p.lead)}</p>`;
      if (p.list) h += `<ul class="sc-list">${p.list.map((x) => `<li><span class="sc-ic">${x.g ? gIcon(x.g) : x.icon}</span><span>${esc(x.text)}</span></li>`).join('')}</ul>`;
      if (p.practice) h += `<div class="hw-gauges">${gaugesHtml()}</div><div class="hw-stage"><div id="hwCard" class="hw-card"></div></div><div id="hwMsg" class="hw-msg"></div>`;
      $('#hwPage').innerHTML = h;
      $('#hwDots').innerHTML = HOW_PAGES.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('');
      $('#hwBack').style.display = i > 0 ? '' : 'none';
      $('#hwGo').textContent = i < HOW_PAGES.length - 1 ? '다음 장 →' : '알겠어요!';
      $('#hwGo').classList.toggle('wait', !!p.practice && done < HOW_PRACTICE.length);
      if (p.practice) dealCard();
    };
    // 연습 카드: 끌어서(또는 ← → 키) 고르면 막대가 움직이고 결과 숫자가 뜬다
    const dealCard = () => {
      const card = $('#hwCard');
      if (!card) return;
      if (done >= HOW_PRACTICE.length) {
        card.className = 'hw-card fin';
        card.innerHTML = '<div class="hw-ic">🎉</div><div class="hw-t">잘했어요! 이렇게 카드를 넘기며 나라를 다스려요.</div>';
        $('#hwGo').classList.remove('wait');
        return;
      }
      const c = HOW_PRACTICE[done];
      // 새 카드는 날아간 자리에서 되돌아오지 않고 제자리에서 나타난다
      card.className = 'hw-card in';
      card.style.transition = 'none';
      card.style.transform = '';
      void card.offsetWidth;
      card.style.transition = '';
      card.innerHTML = `<div class="hw-ic">${c.icon}</div><div class="hw-who">${esc(c.who)}</div><div class="hw-t">${esc(c.text)}</div><div class="hw-ch"><span>← ${esc(c.left.label)}</span><span>${esc(c.right.label)} →</span></div><div class="hw-tip">카드를 끌어 보세요 (${done + 1} / ${HOW_PRACTICE.length})</div>`;
      let x0 = null;
      let dx = 0;
      card.onpointerdown = (e) => {
        x0 = e.clientX;
        dx = 0;
        card.setPointerCapture(e.pointerId);
        card.classList.add('drag');
      };
      card.onpointermove = (e) => {
        if (x0 === null) return;
        dx = e.clientX - x0;
        card.style.transform = `translateX(${dx}px) rotate(${dx / 14}deg)`;
        card.classList.toggle('l', dx < -30);
        card.classList.toggle('r', dx > 30);
      };
      card.onpointerup = () => {
        if (x0 === null) return;
        x0 = null;
        card.classList.remove('drag', 'l', 'r');
        if (Math.abs(dx) > 70) pick(dx < 0 ? 'left' : 'right');
        else card.style.transform = '';
      };
      UI._howPick = pick;
    };
    const pick = (side) => {
      const card = $('#hwCard');
      if (!card || card.classList.contains('gone') || done >= HOW_PRACTICE.length) return;
      const ch = HOW_PRACTICE[done][side];
      card.classList.add('gone');
      card.style.transform = `translateX(${side === 'left' ? -420 : 420}px) rotate(${side === 'left' ? -20 : 20}deg)`;
      const parts = [];
      for (const k in ch.fx) {
        vals[k] = Math.max(0, Math.min(100, vals[k] + ch.fx[k]));
        const el = document.querySelector(`.hw-g[data-k="${k}"]`);
        el.querySelector('i').style.height = vals[k] + '%';
        const d = el.querySelector('.hw-d');
        d.textContent = (ch.fx[k] > 0 ? '+' : '−') + Math.abs(ch.fx[k]);
        d.className = 'hw-d show ' + (ch.fx[k] > 0 ? 'plus' : 'minus');
        parts.push(`${era.gauges.find((g) => g.key === k).name} ${ch.fx[k] > 0 ? '+' : '−'}${Math.abs(ch.fx[k])}`);
      }
      $('#hwMsg').textContent = `「${ch.label}」 → ${parts.join(' · ')}  막대가 움직였죠?`;
      done++;
      setTimeout(dealCard, 450);
    };
    $('#hwGo').onclick = () => {
      if (i < HOW_PAGES.length - 1) {
        i++;
        return render();
      }
      close('#howTo');
    };
    $('#hwBack').onclick = () => {
      if (i > 0) i--;
      render();
    };
    $('#hwClose').onclick = () => close('#howTo');
    render();
    open('#howTo');
  };
  // 키: 연습 카드가 남아 있으면 ← → 로 고르고, 그 밖에는 → ·Enter·Space 다음 장, ← 앞 장, Esc 닫기
  window.addEventListener('keydown', (e) => {
    const b = document.getElementById('howTo');
    if (!b || b.classList.contains('hide')) return;
    const card = document.getElementById('hwCard');
    const practicing = card && !card.classList.contains('fin');
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && practicing && UI._howPick) UI._howPick(e.key === 'ArrowLeft' ? 'left' : 'right');
    else if (['ArrowRight', 'Enter', ' '].includes(e.key)) $('#hwGo').click();
    else if (e.key === 'ArrowLeft') $('#hwBack').style.display !== 'none' && $('#hwBack').click();
    else if (e.key === 'Escape') close('#howTo');
    else return;
    e.preventDefault();
  });

  // 게임 중 다시 보기(📜 단추)
  UI.showScroll = function () {
    const G = JK.Game;
    if (!G.run || G.state !== 'play') return;
    const st = era.stages.find((s) => s.id === G.run.stage);
    if (st) UI.showIntro(st, G.stageInfo(st.id), null, true);
  };
  window.addEventListener('keydown', (e) => {
    const b = document.getElementById('intro');
    if (b && !b.classList.contains('hide') && e.key === 'ArrowLeft' && $('#inBack').style.display !== 'none') {
      e.preventDefault();
      return $('#inBack').click();
    }
    if (b && !b.classList.contains('hide') && ['Enter', ' ', 'ArrowRight'].includes(e.key) && UI._introGo) {
      e.preventDefault();
      UI._introGo();
    }
  });

  /* ---------- 다음 왕 준비 중 ---------- */
  // 왕을 마친 뒤 화면(판 = 왕 하나): 퀴즈 별 · 칭호 · 그 왕의 진엔딩 · 다시/다른 왕/첫 화면
  UI.showKingEnd = function (w) {
    const from = era.stages.find((s) => s.id === w.from);
    $('#soonHead').textContent = `${from.king}의 기록을 마쳤습니다`;
    $('#soonQuiz').innerHTML = w.asked ? `사관의 질문 ${w.asked}개 가운데 ${w.right}개를 맞혔습니다 <span class="stars">${'⭐'.repeat(w.right)}${'☆'.repeat(w.asked - w.right)}</span>` : '';
    $('#soonTrue').innerHTML = w.kingTrue
      ? `🏅 <b>실제 역사대로 클리어</b> — ${esc(from.king)}의 진엔딩 (${(era.difficulty[w.diff] || {}).icon || ''} ${esc((era.difficulty[w.diff] || {}).name || '')})`
      : `실제 역사와 같은 사건 ${w.route.same} / ${w.route.counted} — 다음에는 모두 실제대로 가 보세요`;
    $('#soonTrue').classList.toggle('gold', !!w.kingTrue);
    // 갈래 엔딩(10-14-2): 푸른 실록
    if (w.branch) $('#soonTrue').innerHTML = `📘 <b>갈래 엔딩</b> 「${esc(w.branch.title)}」 — ${esc(w.branch.name)}, 푸른 실록에 꽂혔어요`;
    $('#soonTrue').classList.toggle('blue', !!w.branch);
    $('#soonTitles').textContent = (w.titles && w.titles.length ? `새 칭호: ${w.titles.map((t) => `「${JK.Terms.kingify(t.name, w.from)}」`).join(' ')}` : '') + (w.unlockedAll ? `${w.titles && w.titles.length ? ' · ' : ''}🔓 모든 난이도가 열렸어요!` : '');
    const others = era.stages.filter((s) => s.ready && s.id !== w.from).length;
    $('#soonNext').textContent = others ? '' : '다른 왕(세종~고종)은 준비 중이에요.';
    $('#soonVals').textContent = era.gauges.map((g) => `${g.name} ${w.vals[g.key]}`).join(' · ');
    // 이 왕에서 세운 것과 그 모습(순조롭게·억지로·늦게)
    $('#soonBuilt').innerHTML = (w.built || [])
      .filter(([k]) => bname(k))
      .map(([k, st]) => `<span class="bst ${st}">${st === 'smooth' ? '' : STATE_NAME[st] + ' 지은 '}${bname(k)}</span>`)
      .join(' ');
    document.body.classList.add('over');
    open('#soon');
  };

  /* ---------- 나의 기록 ---------- */
  UI.showRecords = function () {
    const D = era.data;
    const m = S.meta;
    const seenN = D.cards.filter((c) => m.seen[c.id]).length;
    const codexOpen = (x) => x.opens.some((id) => m.seen[id]);
    const codexN = D.codex.filter(codexOpen).length;
    $('#recSummary').textContent = `만난 카드 ${seenN}/${D.cards.length} · 도감 ${codexN}/${D.codex.length} · 실각 기록 ${D.falls.filter((f) => m.falls[f.id]).length}/${D.falls.length} · 칭호 ${D.titles.filter((t) => m.titles[t.id]).length}/${D.titles.length} · 지금까지 ${m.plays}번의 생, 넘긴 카드 ${m.cardsPlayed}장`;
    const list = (el, items, isOpen, label, hint) => {
      el.innerHTML = '';
      for (const it of items) {
        const li = document.createElement('li');
        const o = isOpen(it);
        li.className = o ? 'on' : 'off';
        li.textContent = o ? label(it) : hint(it);
        el.appendChild(li);
      }
    };
    // 도감은 분류별로: 열린 칸만 이름을 보이고, 닫힌 칸은 수만 센다
    const cx = $('#recCodex');
    cx.innerHTML = '';
    const cats = [...new Set(D.codex.map((x) => x.cat))];
    // 건물이 선 모습(설계서 7-4 도감 띠: "억지로 지은 ○○"). 세 모습을 다 보면 별
    const bs = m.buildStates || {};
    const stateBand = (x) => {
      const keys = Object.keys(era.map.buildings).filter((k) => bname(k) && x.name.includes(bname(k)));
      const seen = new Set();
      for (const k of keys) for (const st in bs[k] || {}) seen.add(st);
      if (!seen.size) return '';
      const bands = [...seen].filter((st) => st !== 'smooth').map((st) => `<span class="bst ${st}">${STATE_NAME[st]} 지은 ${x.name}</span>`);
      return (seen.size >= 3 ? ' ★' : '') + (bands.length ? ' ' + bands.join(' ') : '');
    };
    for (const cat of cats) {
      const all = D.codex.filter((x) => x.cat === cat);
      const on = all.filter(codexOpen);
      const li = document.createElement('li');
      li.className = on.length ? 'on' : 'off';
      li.innerHTML = `<b>${cat} ${on.length}/${all.length}</b>` + (on.length ? '<br>' + on.map((x) => `${x.name}${x.outside ? ' <span class="tag-out">교과서 밖</span>' : ''}${stateBand(x)}`).join(' · ') : '');
      cx.appendChild(li);
    }
    list($('#recFalls'), D.falls, (f) => m.falls[f.id], (f) => `${JK.Terms.kingify(f.name)} (${m.falls[f.id]}번)${(m.fallCrisis || {})[f.id] ? ' — ' + m.fallCrisis[f.id].map((n) => `「${n}」 위기에서 무너짐`).join(', ') : ''}`, () => '？？？');
    // 위기 도감(10-8-7): 위기 8종 × 왕. 처음 수습하면 칸이 열림, 그 위기로 무너진 적이 있으면 회색 도장
    const cr = m.crisis || { held: {}, fell: {} };
    const rc = $('#recCrisis');
    rc.innerHTML = '';
    for (const c of D.cards.filter((x) => x.kind === 'crisis' && x.level === 'event')) {
      const li = document.createElement('li');
      const on = cr.held[c.id];
      li.className = on ? 'on' : 'off';
      li.innerHTML = (on ? esc(c.name) : '？？？') + (cr.fell[c.id] ? '<span class="gray">무너짐</span>' : '');
      rc.appendChild(li);
    }
    // 기록관 "버틴 위기": 수습한 위기 이름과 그때 확률
    const rh = $('#recHeld');
    rh.innerHTML = '';
    for (const h of (m.heldLog || []).slice(0, 12)) {
      const st = era.stages.find((x) => x.id === h.stage);
      const li = document.createElement('li');
      li.innerHTML = `<span>${esc(h.name)} — 무너질 확률 ${h.p}%에서 버팀</span><span>${st ? esc(st.king) : ''}</span>`;
      rh.appendChild(li);
    }
    if (!rh.children.length) rh.innerHTML = '<li class="off">아직 버틴 위기가 없어요.</li>';
    // 갈림길 도감(10-10-6): 사건마다 실제 경로와 다른 길, 가 본 길에 도장
    const rp = $('#recPaths');
    rp.innerHTML = '';
    const mp = m.paths || {};
    for (const c of D.cards.filter((x) => x.paths)) {
      const li = document.createElement('li');
      const seen = mp[c.id] || {};
      // 변형판(예: T08v1)은 원래 사건 이름으로
      const base = c.variant_of ? D.cards.find((x) => x.id === c.variant_of) : null;
      li.innerHTML = `<b>${esc(c.event || (base && base.event) || c.id)}${base ? ' <small>(바뀐 사건)</small>' : ''}</b> <span class="pth ${seen.real ? 'on' : ''}">실제 경로</span>` + c.paths.alt.map((a) => `<span class="pth alt ${seen[a.id] ? 'on' : ''}">${seen[a.id] ? esc(a.label) : '？？？'}</span>`).join('');
      rp.appendChild(li);
    }
    // 갈래 이야기(10-14-2): 이룬 갈래는 이름, 못 이룬 것은 ？？？
    if ((D.branches || []).length) {
      const eb = (m.endings || {}).branch || {};
      const li = document.createElement('li');
      li.innerHTML = '<b>갈래 이야기</b> ' + D.branches.map((b) => `<span class="pth branch ${eb[b.id] ? 'on' : ''}">${eb[b.id] ? '📘 ' + esc(b.name) : '？？？'}</span>`).join('');
      rp.appendChild(li);
    }
    // 돌발 사건 도감(10-13): 만난 것은 이름과 종류, 못 만난 것은 ???. 상자는 나온 결과(좋은·나쁜·빈)를 작게
    const re = $('#recEvents');
    if (re) {
      const evs = era.data.cards.filter((c) => c.kind === 'event');
      const icon = { bad: '🌧', good: '🌈', guest: '⛵', box: '❓', mind: '🌸', chain: '🔗' };
      const got = S.meta.events || {};
      re.innerHTML =
        `<li class="re-sum">만난 돌발 ${evs.filter((c) => got[c.id]).length} / ${evs.length}</li>` +
        evs
          .map((c) => {
            if (!got[c.id]) return `<li class="re-no">${icon[c.ev] || '·'} ???</li>`;
            const bx = c.box ? ` <small>${['good', 'bad', 'empty'].map((k) => ((S.meta.boxes || {})[c.id] || {})[k] ? { good: '✨', bad: '💨', empty: '🕸️' }[k] : '·').join('')}</small>` : '';
            return `<li>${icon[c.ev] || '·'} ${esc(c.name)}${bx}</li>`;
          })
          .join('');
    }
    // 기록관: 왕마다 남긴 비교(누르면 다시 보기)
    const ra = $('#recArchive');
    ra.innerHTML = '';
    for (const e of m.archive || []) {
      const st = era.stages.find((x) => x.id === e.st);
      const rows = compareRows(e);
      const li = document.createElement('li');
      li.className = 'on';
      li.innerHTML = `<button class="arc">${st ? esc(st.king) : ''} · 같은 길 ${rows.filter((r) => r.same === true).length} · 다른 길 ${rows.filter((r) => r.same === false).length} <small>${e.d}</small></button>`;
      li.querySelector('button').onclick = () => UI.showCompare(e, { view: true });
      ra.appendChild(li);
    }
    if (!ra.children.length) ra.innerHTML = '<li class="off">왕 하나를 끝내면 비교 기록이 남아요.</li>';
    // 서가: 진엔딩 금빛 실록(난이도 색 띠) · 다른 조선의 한양 붉은 실록 (10-11-3)
    const en = m.endings || {};
    const shelf = [];
    for (const k of ['true', 'other']) for (const dId in en[k] || {}) shelf.push(`<span class="book ${k} ${dId}" title="${en[k][dId]}">${k === 'true' ? '금빛 실록' : '붉은 실록'} · ${esc((era.difficulty[dId] || {}).name || dId)}</span>`);
    for (const id in en.branch || {}) {
      const b = (D.branches || []).find((x) => x.id === id);
      shelf.push(`<span class="book branch" title="${en.branch[id]}">푸른 실록 · ${esc(b ? b.title : id)}</span>`);
    }
    $('#recShelf').innerHTML = shelf.length ? shelf.join('') : '<span class="off">아직 엔딩을 본 실록이 없어요.</span>';
    // 칭호의 '임금'은 그 칭호를 받은 왕의 이름으로(모르면 첫 왕)
    list($('#recTitles'), D.titles, (t) => m.titles[t.id], (t) => `「${JK.Terms.kingify(t.name, (m.titleKing || {})[t.id])}」`, (t) => `？？？ — ${t.hint}`);
    open('#records');
  };
})();
