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
      el.innerHTML = `<div class="g-icon"><svg class="g-bg" viewBox="0 0 24 24">${g.icon}</svg><div class="g-fillwrap"><svg class="g-fill" viewBox="0 0 24 24">${g.icon}</svg></div></div><div class="g-dot"></div><div class="g-fu" title="후속 위기 예약"><svg viewBox="0 0 24 16"><path d="M6 15a5 5 0 0 1-.6-10A6 6 0 0 1 17 4.2 4.5 4.5 0 1 1 18.5 15z"/></svg></div><div class="g-cd" title="같은 위기가 쉬는 장수"></div><div class="g-name">${g.name}</div>`;
      gw.appendChild(el);
    }
    card = $('#card');
    deck = $('#deck');
    setupDrag();
    $('#altBtn').addEventListener('click', () => !C.busy && fly(2));
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
    $('#crisisName').textContent = v.crisisName || '';
    $('#crisisName').style.display = v.crisisName ? '' : 'none';
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
    // 잠긴 쪽(10-10-1): 회색 + 🔒 + 이유. 그쪽으로는 끌어도 넘어가지 않는다
    const lock = v.lock || {};
    $('#chL').textContent = lock.left ? `🔒 ${lock.left}` : v.single || v.left || '';
    $('#chR').textContent = lock.right ? `🔒 ${lock.right}` : v.single || v.right || '';
    $('#chL').classList.toggle('locked', !!lock.left);
    $('#chR').classList.toggle('locked', !!lock.right);
    $('#hintL').textContent = '← ' + (lock.left ? '🔒 ' : '') + (v.single || v.left || '');
    $('#hintR').textContent = (lock.right ? '🔒 ' : '') + (v.single || v.right || '') + ' →';
    $('#hintL').classList.toggle('locked', !!lock.left);
    $('#hintR').classList.toggle('locked', !!lock.right);
    // 잠긴 이유는 늘 보이게(버튼 줄 아래). 두 쪽 이유가 같으면 한 줄로
    if (lock.left || lock.right) {
      const same = lock.left && lock.right && lock.left === lock.right;
      $('#chanceL').textContent = lock.left ? `🔒 ${lock.left}` : '';
      $('#chanceR').textContent = same ? '' : lock.right ? `🔒 ${lock.right}` : '';
      $('#chance').style.display = '';
      $('#chance').classList.toggle('one', !!same);
    } else $('#chance').classList.remove('one');
    // 실제 경로가 잠긴 까닭인 게이지 아이콘을 깜빡인다(10-11-5)
    const need = new Set((v.need || []).map((x) => x.key));
    for (const el of document.querySelectorAll('.gauge')) el.classList.toggle('need', need.has(el.dataset.key));
    // 카드 아래 '다른 길' 버튼(위로 끌거나 누르기)
    const ab = $('#altBtn');
    ab.style.display = v.alt ? '' : 'none';
    if (v.alt) {
      $('#altLabel').textContent = v.alt.label;
      $('#altWhy').textContent = v.alt.locked ? `🔒 ${v.alt.reason}` : '';
      ab.classList.toggle('locked', !!v.alt.locked);
      ab.disabled = false;
    }
    $('#turn').textContent = [v.year, v.turn].filter(Boolean).join(' · ');
    $('#outside').style.display = v.outside ? '' : 'none';
    // 위기 카드: [게임 속 일] 표시, 버튼 아래 무너질 확률, 비슷한 실제 일(작게)
    $('#gameTag').style.display = v.game ? '' : 'none';
    $('#gameTag').classList.toggle('shift', !!v.outside);
    if (!(lock.left || lock.right)) {
      $('#chanceL').textContent = (v.chance && v.chance.left) || '';
      $('#chanceR').textContent = (v.chance && v.chance.right) || '';
      $('#chance').style.display = v.chance ? '' : 'none';
    }
    const sim = $('#similar');
    sim.style.display = v.similar ? '' : 'none';
    if (v.similar) sim.innerHTML = `<b>비슷한 실제 일</b> ${v.similar.out_of_textbook ? '<span class="tag-out">교과서 밖</span> ' : ''}${esc(v.similar.text)}`;
    card.classList.toggle('scroll', !!v.scroll);
    card.classList.toggle('record', !!v.record);
    card.classList.toggle('crisis', !!v.crisis);
    card.classList.toggle('crisis-event', v.crisis === 'event' || v.crisis === 'followup');
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
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

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
  // 게이지 구간(10-8-4): 경고 = 노랑 천천히, 위험 = 빨강, 벼랑 = 빨강 빠르게, 끝 = 아이콘에 금. 낮음/높음 표시
  // followups: 후속 위기 예약 → 아이콘 옆 작은 먹구름
  // cooldown: 같은 위기의 쉬는 장수 → 아이콘 옆 ⏳남은 장수(경고 깜빡임은 그대로)
  C.setZones = function (zones, followups, cooldown) {
    const fu = {};
    for (const f of followups || []) fu[f.gauge] = 1;
    const cd = {};
    for (const k in cooldown || {}) {
      const g = k.split(':')[0];
      cd[g] = Math.max(cd[g] || 0, cooldown[k]);
    }
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const z = zones[g.key] || { level: 'stable' };
      el.classList.toggle('zone-warn', z.level === 'warn');
      el.classList.toggle('zone-danger', z.level === 'danger' || z.level === 'cliff' || z.level === 'end');
      el.classList.toggle('zone-cliff', z.level === 'cliff' || z.level === 'end');
      el.classList.toggle('zone-end', z.level === 'end');
      el.classList.toggle('zone-low', z.side === 'low');
      el.classList.toggle('zone-high', z.side === 'high');
      el.classList.toggle('fu', !!fu[g.key]);
      el.classList.toggle('cd', !!cd[g.key] && !fu[g.key]);
      el.querySelector('.g-cd').textContent = cd[g.key] ? `⏳${cd[g.key]}` : '';
    }
  };
  // 위기 사건 동안 그 게이지 아이콘이 흔들림(quake) / 버텼으면 "후—" 하며 원래 색으로(relief)
  C.gaugeMark = function (key, cls) {
    for (const el of document.querySelectorAll('.gauge')) el.classList.remove('quake', 'relief');
    const el = key && document.querySelector(`.gauge[data-key="${key}"]`);
    if (!el || !cls) return;
    void el.offsetWidth;
    el.classList.add(cls);
  };
  // 도박 결과 드러내기(10-9): 동전이 돌다 멈추며 "운이 따랐다 / 운이 없었다"
  C.gamble = function (won) {
    const el = $('#luck');
    el.className = '';
    $('#luckText').textContent = won ? '운이 따랐다!' : '운이 없었다…';
    void el.offsetWidth;
    el.className = 'show ' + (won ? 'won' : 'lost');
    setTimeout(() => (el.className = ''), 2200);
  };
  // 수습("버텼다!"): 사관의 붉은 도장 "버팀" (10-8-3 ④)
  let heldTimer = 0;
  C.held = function (name, line, ms) {
    const el = $('#held');
    $('#heldName').textContent = name || '';
    $('#heldLine').textContent = line || '';
    el.classList.remove('show');
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(heldTimer);
    heldTimer = setTimeout(() => el.classList.remove('show'), ms || 2400);
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
    const fx = mode !== 'none' && view && view.fx ? (dir === 2 ? view.fxAlt : dir > 0 ? view.fx.right : dir < 0 ? view.fx.left : null) : null;
    // 선물 🌸 · 수렁 ☁ · 씨앗 🌱: 끄는 동안 카드 위에 작은 표시
    const gm = $('#grainMark');
    const mk = dir && dir !== 2 && view && view.grainMark ? view.grainMark[dir > 0 ? 'right' : 'left'] : '';
    gm.textContent = mode !== 'none' ? mk || '' : '';
    gm.classList.toggle('show', !!gm.textContent);
    for (const g of gauges) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const raw = fx && fx[g.key] ? fx[g.key] : 0;
      // 도박 쪽: 크기를 숨기고 '?'만 (10-9)
      if (raw === '?') {
        el.classList.add('pv', 'pv-q');
        el.classList.remove('pv-big', 'pv-mid', 'pv-arrow');
        el.querySelector('.g-dot').textContent = '?';
        continue;
      }
      el.classList.remove('pv-q');
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
  // badge: 결과 글 아래 작은 표시(예: "실제 역사와 달라졌어요 📜")
  C.toast = function (t, ms, badge) {
    const el = $('#result');
    el.innerHTML = esc(t) + (badge ? `<span class="r-badge">${esc(badge)}</span>` : '');
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), ms || 2600);
  };

  /* ---------- 끌기 ---------- */
  function setChoice(dx, dy) {
    const th = threshold();
    const k = Math.min(1, Math.abs(dx) / th);
    const up = view && view.alt && (dy || 0) < -30 && Math.abs(dx) < 40;
    $('#chL').style.opacity = !up && dx < -8 ? (0.35 + k * 0.65).toFixed(2) : 0;
    $('#chR').style.opacity = !up && dx > 8 ? (0.35 + k * 0.65).toFixed(2) : 0;
    $('#altBtn').classList.toggle('hot', !!up);
    preview(up ? 2 : Math.abs(dx) > 18 ? Math.sign(dx) : 0);
  }
  function threshold() {
    return Math.min(120, card.clientWidth * 0.32);
  }
  // 잠긴 쪽으로 넘기려 하면 되돌아오며 이유를 보여 준다
  function refuse(reason) {
    card.style.transition = 'transform .35s cubic-bezier(.2,1.4,.4,1)';
    card.style.transform = '';
    setChoice(0);
    C.shake();
    if (reason) C.toast('🔒 ' + reason, 2200);
    C.busy = false;
  }
  function fly(dir) {
    const lock = (view && view.lock) || {};
    if (dir === 2 && (!view.alt || view.alt.locked)) return refuse(view.alt && view.alt.reason);
    if (dir === 1 && lock.right) return refuse(lock.right);
    if (dir === -1 && lock.left) return refuse(lock.left);
    C.busy = true;
    C.hand(false);
    $('#altBtn').style.display = 'none';
    card.style.transition = 'transform .45s cubic-bezier(.5,0,.9,.4), opacity .45s';
    card.style.transform = dir === 2 ? 'translate(0, -120%) rotate(-4deg)' : `translate(${dir * 130}%, 18%) rotate(${dir * 28}deg)`;
    card.style.opacity = '0';
    setChoice(0);
    if (JK.Audio) JK.Audio.swipe(dir);
    onCommit(dir);
  }
  C.commit = (dir) => !C.busy && fly(dir);
  C.isLocked = (dir) => {
    const lock = (view && view.lock) || {};
    return dir === 2 ? !view || !view.alt || view.alt.locked : dir > 0 ? !!lock.right : !!lock.left;
  };
  function setupDrag() {
    card.addEventListener('pointerdown', (e) => {
      if (C.busy) return;
      dragging = { x0: e.clientX, y0: e.clientY, dx: 0, dy: 0, id: e.pointerId };
      card.setPointerCapture(e.pointerId);
      card.style.transition = 'none';
    });
    card.addEventListener('pointermove', (e) => {
      if (!dragging || e.pointerId !== dragging.id) return;
      const dx = e.clientX - dragging.x0;
      const rawDy = e.clientY - dragging.y0;
      // 다른 길이 있는 카드는 위로도 끌린다
      const dy = view && view.alt && rawDy < 0 ? rawDy * 0.8 : rawDy * 0.25;
      dragging.dx = dx;
      dragging.dy = rawDy;
      card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.07}deg)`;
      setChoice(dx, rawDy);
      if (Math.abs(dx) > 30) C.hand(false);
    });
    const up = (e) => {
      if (!dragging || e.pointerId !== dragging.id) return;
      const dx = dragging.dx,
        dy = dragging.dy;
      dragging = null;
      if (view && view.alt && dy < -threshold() && Math.abs(dx) < threshold() * 0.6) fly(2);
      else if (Math.abs(dx) > threshold()) fly(Math.sign(dx));
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
    if (e.key === 'ArrowUp' && view && view.alt) return fly(2);
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
