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
  UI.setStage = function (st) {
    $('#stageSeal').textContent = st.seal;
    $('#stageName').textContent = `${st.king} · ${st.title}`;
  };

  /* ---------- 실각 ---------- */
  UI.showFall = function (o) {
    $('#fallPortrait').src = o.img || '';
    $('#fallName').textContent = o.rec.name;
    $('#fallMsg').textContent = (o.preview ? '(미리 보기) ' : '') + o.rec.text;
    $('#fallReal').textContent = o.real || '';
    $('#fallHint').textContent = o.hint || '';
    $('#fallHint').style.display = o.hint ? '' : 'none';
    open('#fall');
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
    list($('#recFalls'), D.falls, (f) => m.falls[f.id], (f) => `${f.name} (${m.falls[f.id]}번)`, () => '？？？');
    list($('#recTitles'), D.titles, (t) => m.titles[t.id], (t) => `「${t.name}」`, (t) => `？？？ — ${t.hint}`);
    open('#records');
  };
})();
