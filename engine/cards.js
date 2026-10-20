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
    $('#chL').textContent = v.single || v.left || '';
    $('#chR').textContent = v.single || v.right || '';
    $('#hintL').textContent = '← ' + (v.single || v.left || '');
    $('#hintR').textContent = (v.single || v.right || '') + ' →';
    $('#turn').textContent = v.turn || '';
    $('#outside').style.display = v.outside ? '' : 'none';
    card.classList.toggle('scroll', !!v.scroll);
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
  C.flash = function (fx) {
    for (const k in fx) {
      const el = document.querySelector(`.gauge[data-key="${k}"]`);
      if (!el || !fx[k]) continue;
      el.classList.remove('up', 'down');
      void el.offsetWidth;
      el.classList.add(fx[k] > 0 ? 'up' : 'down');
    }
  };
  function preview(dir) {
    const fx = view && view.fx ? (dir > 0 ? view.fx.right : dir < 0 ? view.fx.left : null) : null;
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const v = fx && fx[g.key] ? Math.abs(fx[g.key]) : 0;
      el.classList.toggle('pv', v > 0);
      el.classList.toggle('pv-big', v >= 15);
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
