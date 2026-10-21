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
    $('#btnNew').onclick = () => {
      if (JK.Game.hasRun() && !confirm('이어 하던 판이 지워지고 처음부터 시작해요. 괜찮나요?')) return;
      UI.leaveTitle();
      JK.Game.newRun();
    };
    $('#btnRecords').onclick = () => UI.showRecords();
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
    $('#btnRetry').onclick = () => {
      close('#fall');
      JK.Game.retryStage();
    };
    $('#btnFallHome').onclick = () => {
      close('#fall');
      UI.toTitle();
    };
    $('#btnSoonHome').onclick = () => {
      close('#soon');
      UI.toTitle();
    };
    $('#btnSoonRecords').onclick = () => UI.showRecords();
    paintSound();
    paintTitle();
  };

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

  // 난이도 단계가 열렸는지(설계서 10-7)
  UI.diffOpen = function (id) {
    const d = era.difficulty[id];
    if (!d.unlock) return true;
    if (new URLSearchParams(location.search).get('debug') === '1') return true;
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
    JK.Game.state = 'title';
    JK.Cards.hide();
    ['#fall', '#soon', '#quiz', '#records'].forEach(close);
    document.body.classList.remove('playing', 'over');
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

  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  /* ---------- 실각 ---------- */
  UI.showFall = function (o) {
    $('#fallPortrait').src = o.img || '';
    $('#fallName').textContent = o.rec.name;
    // 어떤 위기에서 무너졌는지: 위기 이름, 게이지와 그때 값, 고른 대응, 그때의 실각 확률 (4-2, 10-8-3 ④)
    const fc = $('#fallCrisis');
    fc.style.display = o.crisis ? '' : 'none';
    if (o.crisis) {
      const c = o.crisis;
      fc.innerHTML = `<b>${esc(c.name)}</b> — ${esc(c.gauge)} ${c.value}, ${esc(c.choice)}, 무너질 확률 ${Math.round(c.p * 100)}%`;
    }
    $('#fallMsg').textContent = (o.preview ? '(미리 보기) ' : '') + o.rec.text;
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
      else mine = { path: '', label: '', text: '이번 판에서 만나지 못했어요' };
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
    el.title = r.broken ? '이번 판의 진엔딩은 멀어졌어요' : `실제 역사와 같은 사건 ${r.same} / ${r.counted}`;
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
        ? `이번 판은 진엔딩이 멀어졌어요. 대신 다른 역사 칭호를 노려 보세요${toOther ? `: 「다른 조선」까지 다른 길 ${toOther}개 더` : ''}.`
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
    el.classList.toggle('other', kind !== 'true');
    $('#endKind').textContent = kind === 'true' ? '진엔딩' : '다른 조선의 한양';
    $('#endTitle').textContent = kind === 'true' ? (t ? `「${t.name}」` : '') : '';
    $('#endDiff').textContent = `${d.icon || ''} ${d.name || ''}`;
    $('#endLine').textContent = kind === 'true' ? '이 임금의 실록은 실제와 같았다.' : '이 실록은 실제와 달랐지만, 이 또한 한 임금의 길이었다.';
    $('#endCount').textContent = o.route ? `실제 역사와 같은 사건 ${o.route.same} / ${o.route.counted}` : '';
    $('#endPreview').style.display = o.preview ? '' : 'none';
    W.setOrbit(true);
    open('#ending');
  };

  /* ---------- 다음 왕 준비 중 ---------- */
  UI.showComingSoon = function (w) {
    const from = era.stages.find((s) => s.id === w.from);
    const next = w.next && era.stages.find((s) => s.id === w.next);
    $('#soonHead').textContent = `${from.king}의 기록을 마쳤습니다`;
    $('#soonQuiz').textContent = w.asked ? `사관의 질문 ${w.asked}개 가운데 ${w.right}개를 맞혔습니다.` : '';
    $('#soonTitles').textContent = w.titles && w.titles.length ? `새 칭호: ${w.titles.map((t) => `「${t.name}」`).join(' ')}` : '';
    $('#soonNext').textContent = next ? `다음 왕 「${next.king}」은 아직 준비 중이에요. 곧 이어집니다!` : '마지막 왕까지 마쳤습니다.';
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
    $('#recSummary').textContent = `만난 카드 ${seenN}/${D.cards.length} · 도감 ${codexN}/${D.codex.length} · 실각 기록 ${D.falls.filter((f) => m.falls[f.id]).length}/${D.falls.length} · 칭호 ${D.titles.filter((t) => m.titles[t.id]).length}/${D.titles.length} · 지금까지 ${m.plays}판, 넘긴 카드 ${m.cardsPlayed}장`;
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
    list($('#recFalls'), D.falls, (f) => m.falls[f.id], (f) => `${f.name} (${m.falls[f.id]}번)${(m.fallCrisis || {})[f.id] ? ' — ' + m.fallCrisis[f.id].map((n) => `「${n}」 위기에서 무너짐`).join(', ') : ''}`, () => '？？？');
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
      li.innerHTML = `<b>${esc(c.event || c.id)}</b> <span class="pth ${seen.real ? 'on' : ''}">실제 경로</span>` + c.paths.alt.map((a) => `<span class="pth alt ${seen[a.id] ? 'on' : ''}">${seen[a.id] ? esc(a.label) : '？？？'}</span>`).join('');
      rp.appendChild(li);
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
    $('#recShelf').innerHTML = shelf.length ? shelf.join('') : '<span class="off">아직 엔딩을 본 실록이 없어요.</span>';
    list($('#recTitles'), D.titles, (t) => m.titles[t.id], (t) => `「${t.name}」`, (t) => `？？？ — ${t.hint}`);
    open('#records');
  };
})();
