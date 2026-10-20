/* engine/cards.js — 카드 한 장 화면: 끌기(기울기·날아가기), 게이지 미리 빛나기, 게이지 채움, 결과 글, 손 모양 안내
 * 시대와 무관하다. 무엇을 보여 줄지는 game.js가 view 객체로 준다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const $ = (s) => document.querySelector(s);
  const C = (JK.Cards = { busy: true });
  let card, deck, gauges = [], onCommit = null, view = null, dragging = null;

  C.init = function (opts) {
    gauges = opts.gauges;
    onCommit = opts.onCommit;
    const gw = $('#gauges');
    gw.innerHTML = '';
    for (const g of gauges) {
      const el = document.createElement('div');
      el.className = 'gauge';
      el.dataset.key = g.key;
      el.innerHTML = `<div class="g-icon"><svg class="g-bg" viewBox="0 0 24 24">${g.icon}</svg><div class="g-fillwrap"><svg class="g-fill" viewBox="0 0 24 24">${g.icon}</svg></div></div><div class="g-dot"></div><div class="g-name">${g.name}</div>`;
      gw.appendChild(el);
    }
    card = $('#card');
    deck = $('#deck');
    setupDrag();
    window.addEventListener('keydown', onKey);
  };

  /* ---------- 카드 보이기 ----------
   * view: { img, bg, name, tag, text, left, right, single, turn, outside, temp, scroll, fx:{left,right}, hand }
   */
  C.show = function (v) {
    view = v;
    $('#portrait').src = v.img || '';
    $('#portrait').style.background = v.bg || '#ddd';
    $('#who').textContent = v.name || '';
    $('#whoTitle').textContent = v.tag || '';
    $('#whoTitle').style.display = v.tag ? '' : 'none';
    $('#text').textContent = v.text || '';
    $('#runBox').style.display = v.run ? '' : 'none';
    $('#runBox').classList.toggle('against', !!v.against);
    $('#runLabel').textContent = v.against ? '이번 판에서 — 거스른 대가' : '이번 판에서';
    const stamp = $('#stamp');
    stamp.classList.remove('show');
    if (v.against) {
      void stamp.offsetWidth;
      stamp.classList.add('show');
    }
    // 4단계 결과("~했지만 → … → … → …")는 화살표마다 줄을 바꾼다
    $('#runText').textContent = (v.run || '').replace(/\s*→\s*/g, '\n→ ');
    $('#realLabel').style.display = v.record ? '' : 'none';
    $('#chL').textContent = v.single || v.left || '';
    $('#chR').textContent = v.single || v.right || '';
    $('#hintL').textContent = '← ' + (v.single || v.left || '');
    $('#hintR').textContent = (v.single || v.right || '') + ' →';
    $('#turn').textContent = [v.year, v.turn].filter(Boolean).join(' · ');
    $('#outside').style.display = v.outside ? '' : 'none';
    card.classList.toggle('scroll', !!v.scroll);
    card.classList.toggle('record', !!v.record);
    card.classList.toggle('crisis', !!v.crisis);
    card.classList.toggle('crisis-event', v.crisis === 'event');
    card.style.transition = 'none';
    card.style.transform = 'translate(0, 40px) rotateY(80deg) scale(0.96)';
    card.style.opacity = '0';
    deck.classList.add('show');
    void card.offsetWidth;
    card.style.transition = 'transform .5s cubic-bezier(.2,1.3,.4,1), opacity .25s';
    card.style.transform = '';
    card.style.opacity = '1';
    setChoice(0);
    C.hand(!!v.hand);
    C.busy = false;
  };
  C.hide = function () {
    deck.classList.remove('show');
    card.style.opacity = '0';
    C.hand(false);
    C.busy = true;
  };
  C.isReady = () => !C.busy;

  // 손 모양 안내(처음 몇 장)
  C.hand = function (on) {
    $('#hand').classList.toggle('show', on);
  };

  /* ---------- 게이지 ---------- */
  C.setGauges = function (vals, instant) {
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"] .g-fillwrap`);
      if (instant) el.style.transition = 'none';
      el.style.clipPath = `inset(${100 - vals[g.key]}% 0 0 0)`;
      if (instant) {
        void el.offsetWidth;
        el.style.transition = '';
      }
    }
  };
  // heavy: "그래도 역사는 흘렀다" 때 크게 흔들리며 깎임
  C.flash = function (fx, heavy) {
    for (const k in fx) {
      const el = document.querySelector(`.gauge[data-key="${k}"]`);
      if (!el || !fx[k]) continue;
      el.classList.remove('up', 'down', 'hit');
      void el.offsetWidth;
      el.classList.add(fx[k] > 0 ? 'up' : 'down');
      if (heavy && fx[k] < 0) el.classList.add('hit');
    }
  };
  // 게이지 구간: 경고 = 떨림·붉은 빛, 위험 = 빠른 떨림·맥박. 낮음/높음 표시
  C.setZones = function (zones) {
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const z = zones[g.key] || { level: 'stable' };
      el.classList.toggle('zone-warn', z.level === 'warn');
      el.classList.toggle('zone-danger', z.level === 'danger');
      el.classList.toggle('zone-low', z.side === 'low');
      el.classList.toggle('zone-high', z.side === 'high');
    }
  };
  C.setWarn = () => {};
  // 구간에 처음 들어설 때 짧은 알림
  let alertTimer = 0;
  C.alert = function (g, text, level) {
    const el = $('#zoneAlert');
    el.innerHTML = `<svg viewBox="0 0 24 24">${g.icon}</svg><span>${text}</span>`;
    el.className = 'show ' + level;
    clearTimeout(alertTimer);
    alertTimer = setTimeout(() => (el.className = ''), level === 'danger' ? 3600 : 2800);
  };
  // "그래도 역사는 흘렀다" 한 박자: 게이지 띠가 크게 흔들린다
  C.beat = function () {
    document.body.classList.remove('beat');
    void document.body.offsetWidth;
    document.body.classList.add('beat');
    C.shake();
  };
  // 미리보기(난이도별, 설계서 10-7): arrows ▲▼+크기 / dots 점 크기(레인즈) / flat 같은 크기 점 / none 없음
  function preview(dir) {
    const mode = (view && view.preview) || 'dots';
    const fx = mode !== 'none' && view && view.fx ? (dir > 0 ? view.fx.right : dir < 0 ? view.fx.left : null) : null;
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const raw = fx && fx[g.key] ? fx[g.key] : 0;
      const v = Math.abs(raw);
      el.classList.toggle('pv', v > 0);
      el.classList.toggle('pv-big', v >= 15 && mode !== 'flat');
      el.classList.toggle('pv-mid', v >= 8 && v < 15 && mode === 'arrows');
      el.classList.toggle('pv-arrow', v > 0 && mode === 'arrows');
      el.querySelector('.g-dot').textContent = v > 0 && mode === 'arrows' ? (raw > 0 ? '▲' : '▼') : '';
    }
  }
  C.shake = function () {
    document.body.classList.remove('shake');
    void document.body.offsetWidth;
    document.body.classList.add('shake');
  };

  /* ---------- 결과 글 ---------- */
  let toastTimer = 0;
  C.toast = function (t, ms) {
    const el = $('#result');
    el.textContent = t;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), ms || 2600);
  };

  /* ---------- 끌기 ---------- */
  function setChoice(dx) {
    const th = threshold();
    const k = Math.min(1, Math.abs(dx) / th);
    $('#chL').style.opacity = dx < -8 ? (0.35 + k * 0.65).toFixed(2) : 0;
    $('#chR').style.opacity = dx > 8 ? (0.35 + k * 0.65).toFixed(2) : 0;
    preview(Math.abs(dx) > 18 ? Math.sign(dx) : 0);
  }
  function threshold() {
    return Math.min(120, card.clientWidth * 0.32);
  }
  function fly(dir) {
    C.busy = true;
    C.hand(false);
    card.style.transition = 'transform .45s cubic-bezier(.5,0,.9,.4), opacity .45s';
    card.style.transform = `translate(${dir * 130}%, 18%) rotate(${dir * 28}deg)`;
    card.style.opacity = '0';
    setChoice(0);
    if (JK.Audio) JK.Audio.swipe(dir);
    onCommit(dir);
  }
  C.commit = (dir) => !C.busy && fly(dir);
  function setupDrag() {
    card.addEventListener('pointerdown', (e) => {
      if (C.busy) return;
      dragging = { x0: e.clientX, y0: e.clientY, dx: 0, id: e.pointerId };
      card.setPointerCapture(e.pointerId);
      card.style.transition = 'none';
    });
    card.addEventListener('pointermove', (e) => {
      if (!dragging || e.pointerId !== dragging.id) return;
      const dx = e.clientX - dragging.x0;
      const dy = (e.clientY - dragging.y0) * 0.25;
      dragging.dx = dx;
      card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.07}deg)`;
      setChoice(dx);
      if (Math.abs(dx) > 30) C.hand(false);
    });
    const up = (e) => {
      if (!dragging || e.pointerId !== dragging.id) return;
      const dx = dragging.dx;
      dragging = null;
      if (Math.abs(dx) > threshold()) fly(Math.sign(dx));
      else {
        card.style.transition = 'transform .35s cubic-bezier(.2,1.4,.4,1)';
        card.style.transform = '';
        setChoice(0);
        if (view && view.hand) C.hand(true);
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
  }
  function onKey(e) {
    if (C.busy || document.querySelector('.modal:not(.hide)')) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      C.busy = true;
      card.style.transition = 'transform .18s ease-out';
      card.style.transform = `translate(${dir * 60}px, 0) rotate(${dir * 5}deg)`;
      setChoice(dir * threshold());
      setTimeout(() => fly(dir), 220);
    }
  }
})();
