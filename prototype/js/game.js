/* game.js — 카드 스와이프, 네 게이지, 한 판의 흐름(태조 시제품)
 * ※ 카드 글은 모두 「시제품 — 임시 글」이다. 1A 설계서가 나오면 바뀐다.
 *   역사 사실을 새로 지어내지 않고, 건물 이름(근거: CREDITS.md)만 쓴다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const $ = (s) => document.querySelector(s);

  const GAUGES = [
    { key: 'people', name: '백성' },
    { key: 'nobles', name: '양반' },
    { key: 'treasury', name: '국고' },
    { key: 'army', name: '국방' },
  ];
  const WHO = {
    taejo: { name: '태조', title: '임금', bg: '#efcf7a' },
    jeong: { name: '정도전', title: '신하', bg: '#9cc7b4' },
    yangban: { name: '양반 관리', title: '양반', bg: '#b3cde0' },
    farmer: { name: '농민', title: '백성', bg: '#c3d98f' },
    merchant: { name: '상인', title: '백성', bg: '#ecc192' },
  };
  // 임시 카드 (시제품). fx: 게이지 변화, build: 세워지는 것
  const CARDS = [
    {
      who: 'taejo',
      text: '과인은 새 도읍 한양에서 새 나라를 꾸리겠노라. 카드를 오른쪽으로 밀면 들어주고, 왼쪽으로 밀면 거절한다.',
      yes: { label: '시작하자', fx: {} },
      no: { label: '시작하자', fx: {} },
    },
    {
      who: 'jeong',
      text: '전하, 새 궁궐 공사를 서두를까요? 일꾼이 많이 필요하옵니다.',
      yes: { label: '서둘러라', fx: { people: -10, nobles: 5, treasury: -15 }, result: '궁궐이 빨리 올라갔다.' },
      no: { label: '천천히 하라', fx: { people: 5, nobles: -5, treasury: -5 }, result: '공사는 느렸지만 궁궐은 세워졌다.' },
      build: ['gyeongbok'],
    },
    {
      who: 'yangban',
      text: '조상께 제사를 드릴 종묘를 크고 엄숙하게 지어야 하옵니다.',
      yes: { label: '크게 지어라', fx: { nobles: 15, treasury: -15 }, result: '양반들이 크게 기뻐했다.' },
      no: { label: '소박하게 하라', fx: { nobles: -10, people: 5, treasury: -5 }, result: '종묘는 소박하게 세워졌다.' },
      build: ['jongmyo'],
    },
    {
      who: 'farmer',
      text: '나라님, 새 도읍에 온 백성들이 살 집이 없사옵니다. 나무를 나누어 주소서.',
      yes: { label: '나누어 주어라', fx: { people: 15, treasury: -10 }, result: '백성들이 초가집을 지었다.' },
      no: { label: '스스로 지어라', fx: { people: -15, treasury: 5 }, result: '백성들이 힘들게 초가집을 지었다.' },
      build: ['choga'],
    },
    {
      who: 'jeong',
      text: '도읍을 지키려면 둘레에 튼튼한 성을 쌓아야 하옵니다.',
      yes: { label: '성을 쌓아라', fx: { army: 20, people: -10, treasury: -5 }, result: '산줄기를 따라 성곽이 이어졌다.' },
      no: { label: '나중에 하라', fx: { army: -10, people: 5 }, result: '시간은 걸렸지만 성곽이 이어졌다.' },
      build: ['wall'],
    },
    {
      who: 'yangban',
      text: '성에 큰 문을 내고, 문 이름에 유교의 가르침을 담으면 어떻겠사옵니까?',
      yes: { label: '그리하라', fx: { nobles: 10, army: 5, treasury: -10 }, result: '남쪽에 숭례문, 동쪽에 흥인지문이 섰다.' },
      no: { label: '쉬운 이름으로', fx: { nobles: -10, people: 5 }, result: '신하들이 다시 아뢰어, 문 이름에 유교의 가르침이 담겼다.' },
      build: ['sungnye', 'heungin'],
    },
    {
      who: 'merchant',
      text: '도성에 사람이 모여드옵니다. 큰길 옆에 집과 가게를 짓게 해 주시옵소서.',
      yes: { label: '그리하라', fx: { treasury: 15, people: 5, nobles: -10 }, result: '큰길을 따라 기와집이 늘어섰다.' },
      no: { label: '아직 이르다', fx: { treasury: -5, nobles: 5 }, result: '천천히 기와집이 늘어섰다.' },
      build: ['giwa'],
    },
  ];
  const FALL_TEXT = {
    people: ['백성들이 도성을 떠났사옵니다.', '백성의 원성만 높아 신하들이 등을 돌렸사옵니다.'],
    nobles: ['양반들이 전하를 따르지 않사옵니다.', '양반들의 힘이 너무 커졌사옵니다.'],
    treasury: ['나라 곳간이 텅 비었사옵니다.', '곳간만 채우다 백성의 원망을 샀사옵니다.'],
    army: ['나라를 지킬 군사가 없사옵니다.', '군사의 힘이 너무 커졌사옵니다.'],
  };

  const G = (JK.Game = { idx: 0, vals: {}, busy: false, state: 'title' });
  let portraits = {};
  let card, cardWrap, dragging = null;

  const ICONS = {
    people: '<circle cx="12" cy="7" r="4.2"/><path d="M3.5 22c0-5.2 3.8-8.6 8.5-8.6s8.5 3.4 8.5 8.6z"/>',
    nobles: '<ellipse cx="12" cy="16.2" rx="11" ry="2.7"/><path d="M7.8 15V7.6C7.8 5.7 9.6 4.6 12 4.6s4.2 1.1 4.2 3V15z"/><path d="M8.4 18.4l2 4.2h1.2l-1.6-4.2zM15.6 18.4l-2 4.2h-1.2l1.6-4.2z"/>',
    treasury: '<path fill-rule="evenodd" d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm-3.2 6.8v6.4h6.4V8.8z"/>',
    army: '<path d="M12 1.6l1.7 5h-3.4z"/><path d="M3.6 16.4a8.4 8.4 0 0 1 16.8 0v1.2H3.6z"/><path d="M1.8 18.6h20.4v2.6H1.8z"/>',
  };

  G.init = function (pics) {
    portraits = pics;
    const gw = $('#gauges');
    gw.innerHTML = '';
    for (const g of GAUGES) {
      const el = document.createElement('div');
      el.className = 'gauge';
      el.dataset.key = g.key;
      el.innerHTML = `<div class="g-icon"><svg class="g-bg" viewBox="0 0 24 24">${ICONS[g.key]}</svg><div class="g-fillwrap"><svg class="g-fill" viewBox="0 0 24 24">${ICONS[g.key]}</svg></div></div><div class="g-dot"></div><div class="g-name">${g.name}</div>`;
      gw.appendChild(el);
    }
    card = $('#card');
    cardWrap = $('#deck');
    setupDrag();
    window.addEventListener('keydown', onKey);
    $('#btnStart').addEventListener('click', start);
    $('#btnAgain').addEventListener('click', restart);
    $('#btnAgain2').addEventListener('click', restart);
    $('#btnFallPreview').addEventListener('click', () => fall('treasury', 0, true));
    resetVals();
    renderGauges(true);
  };

  function resetVals() {
    for (const g of GAUGES) G.vals[g.key] = 50;
    JK.World.state.people = 50;
  }

  /* ---------- 흐름 ---------- */
  function start() {
    if (G.state !== 'title') return;
    JK.Audio.unlock();
    G.state = 'play';
    $('#title').classList.add('hide');
    document.body.classList.add('playing');
    JK.World.state.title = false;
    JK.World.camTo(JK.World.CAM_PLAY, 2.4);
    JK.World.setTOD(0.1);
    G.idx = 0;
    setTimeout(() => showCard(0), 900);
  }
  function restart() {
    document.body.classList.remove('over');
    $('#end').classList.add('hide');
    $('#fall').classList.add('hide');
    JK.World.reset();
    JK.World.setOrbit(false);
    JK.World.camTo(JK.World.CAM_PLAY, 1.6);
    JK.World.setTOD(0.1, true);
    resetVals();
    renderGauges(true);
    G.state = 'play';
    setTimeout(() => showCard(1), 500);
  }
  G.debugBuildAll = function () {
    for (const c of CARDS) if (c.build) for (const b of c.build) JK.World.build(b);
  };
  G.debugFall = () => fall('treasury', 0, true);

  function showCard(i) {
    G.idx = i;
    const c = CARDS[i];
    const w = WHO[c.who];
    $('#portrait').src = portraits[c.who];
    $('#portrait').style.background = w.bg;
    $('#who').textContent = w.name;
    $('#whoTitle').textContent = w.title;
    $('#text').textContent = c.text;
    $('#chL').textContent = c.no.label;
    $('#chR').textContent = c.yes.label;
    $('#turn').textContent = i === 0 ? '시작' : `${i} / ${CARDS.length - 1}`;
    card.style.transition = 'none';
    card.style.transform = 'translate(0, 40px) rotateY(80deg) scale(0.96)';
    card.style.opacity = '0';
    cardWrap.classList.add('show');
    void card.offsetWidth;
    card.style.transition = 'transform .5s cubic-bezier(.2,1.3,.4,1), opacity .25s';
    card.style.transform = '';
    card.style.opacity = '1';
    setChoice(0);
    G.busy = false;
  }

  function commit(dir) {
    if (G.busy || G.state !== 'play') return;
    G.busy = true;
    const c = CARDS[G.idx];
    const ch = dir > 0 ? c.yes : c.no;
    JK.Audio.swipe(dir);
    // 날아가기
    card.style.transition = 'transform .45s cubic-bezier(.5,0,.9,.4), opacity .45s';
    card.style.transform = `translate(${dir * 130}%, 18%) rotate(${dir * 28}deg)`;
    card.style.opacity = '0';
    setChoice(0);
    let big = 0;
    for (const k in ch.fx) {
      G.vals[k] = JK.clamp(G.vals[k] + ch.fx[k], 0, 100);
      big = Math.max(big, Math.abs(ch.fx[k]));
      flash(k, ch.fx[k]);
    }
    JK.World.state.people = G.vals.people;
    renderGauges();
    if (big >= 15) {
      JK.World.shake(0.5);
      document.body.classList.remove('shake');
      void document.body.offsetWidth;
      document.body.classList.add('shake');
    }
    if (ch.result) toast(ch.result);
    // 짓기 (건물이 여럿이면 차례로)
    let wait = 700;
    if (c.build) {
      c.build.forEach((b, n) => {
        setTimeout(() => {
          const d = JK.World.build(b);
          wait = Math.max(wait, d * 1000);
        }, 350 + n * 900);
      });
      wait = 1500 + (c.build.length - 1) * 900;
      if (c.build[0] === 'wall' || c.build[0] === 'choga' || c.build[0] === 'giwa') wait = 2200;
    }
    // 하루가 흐른다: 새벽 → 해 질 녘
    JK.World.setTOD(0.1 + (G.idx / (CARDS.length - 1)) * 0.78);
    // 실각 확인
    const bad = GAUGES.find((g) => G.vals[g.key] <= 0 || G.vals[g.key] >= 100);
    setTimeout(() => {
      cardWrap.classList.remove('show');
      if (bad) return fall(bad.key, G.vals[bad.key]);
      if (G.idx >= CARDS.length - 1) return complete();
      showCard(G.idx + 1);
    }, wait);
  }

  function complete() {
    G.state = 'end';
    document.body.classList.add('over');
    JK.World.setTOD(1.0);
    JK.World.setOrbit(true);
    JK.World.camTo({ dist: 31, el: 0.42, fov: 30 }, 3);
    JK.Audio.chime();
    setTimeout(() => {
      $('#endSummary').textContent = GAUGES.map((g) => `${g.name} ${G.vals[g.key]}`).join(' · ');
      $('#end').classList.remove('hide');
    }, 1800);
  }

  function fall(key, val, preview) {
    G.state = 'fall';
    G.busy = true;
    cardWrap.classList.remove('show');
    card.style.opacity = '0';
    document.body.classList.add('over');
    $('#end').classList.add('hide');
    JK.World.setOrbit(false);
    JK.World.state.inkTarget = 1;
    JK.World.camTo({ dist: 37, el: 0.5 }, 3.5);
    JK.Audio.gong();
    const msg = FALL_TEXT[key][val >= 100 ? 1 : 0];
    // 수묵이 충분히 번진 뒤(또는 6초가 지나면) 글상자를 띄운다
    const t0 = performance.now();
    const iv = setInterval(() => {
      const el = performance.now() - t0;
      if (el < 2200 || (JK.World.state.ink < 0.8 && el < 6000)) return;
      clearInterval(iv);
      if (G.state !== 'fall') return;
      $('#fallMsg').textContent = (preview ? '(미리 보기) ' : '') + msg;
      $('#fallPortrait').src = portraits.taejo;
      $('#fall').classList.remove('hide');
    }, 100);
  }

  /* ---------- 게이지 ---------- */
  function renderGauges(instant) {
    for (const g of GAUGES) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"] .g-fillwrap`);
      if (instant) el.style.transition = 'none';
      el.style.clipPath = `inset(${100 - G.vals[g.key]}% 0 0 0)`;
      if (instant) {
        void el.offsetWidth;
        el.style.transition = '';
      }
    }
  }
  function flash(k, v) {
    const el = document.querySelector(`.gauge[data-key="${k}"]`);
    el.classList.remove('up', 'down');
    void el.offsetWidth;
    el.classList.add(v > 0 ? 'up' : 'down');
  }
  function preview(dir) {
    const c = CARDS[G.idx];
    const ch = dir > 0 ? c.yes : dir < 0 ? c.no : null;
    for (const g of GAUGES) {
      const el = document.querySelector(`.gauge[data-key="${g.key}"]`);
      const v = ch && ch.fx[g.key] ? Math.abs(ch.fx[g.key]) : 0;
      el.classList.toggle('pv', v > 0);
      el.classList.toggle('pv-big', v >= 15);
    }
  }

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
  function setupDrag() {
    card.addEventListener('pointerdown', (e) => {
      if (G.busy || G.state !== 'play') return;
      JK.Audio.unlock();
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
      JK.World.lastInput = performance.now();
    });
    const up = (e) => {
      if (!dragging || e.pointerId !== dragging.id) return;
      const dx = dragging.dx;
      dragging = null;
      if (Math.abs(dx) > threshold()) commit(Math.sign(dx));
      else {
        card.style.transition = 'transform .35s cubic-bezier(.2,1.4,.4,1)';
        card.style.transform = '';
        setChoice(0);
      }
    };
    card.addEventListener('pointerup', up);
    card.addEventListener('pointercancel', up);
  }
  function onKey(e) {
    JK.World.lastInput = performance.now();
    if (G.state === 'title' && (e.key === 'Enter' || e.key === ' ')) return start();
    if (G.state !== 'play' || G.busy) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      JK.Audio.unlock();
      card.style.transition = 'transform .18s ease-out';
      card.style.transform = `translate(${dir * 60}px, 0) rotate(${dir * 5}deg)`;
      setChoice(dir * threshold());
      setTimeout(() => commit(dir), 220);
    }
  }

  let toastTimer = 0;
  function toast(t) {
    const el = $('#result');
    el.textContent = t;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  G.CARDS = CARDS;
  G.WHO = WHO;
  G.commit = commit;
})();
