/* engine/audio.js — 소리는 모두 코드로 합성한다(파일 없음).
 * 기본값은 효과음·음악 모두 끔(교실 수업 중). 켜면 설정(JK.Save.settings)에 기억한다.
 * 켜도 처음 크기는 작게 둔다(교실 30대가 같이 울린다).
 */
(function () {
  'use strict';
  const JK = window.JK;
  const A = (JK.Audio = {
    ctx: null,
    master: null,
    on: false,
    musicOn: false,
    volume: 0.32,
    _noise: null,
    _musicTimer: null,
  });
  // 설정에서 읽는다(engine/save.js). ?sound=0 이면 언제나 끔.
  A.init = function () {
    const st = (JK.Save && JK.Save.settings) || {};
    A.on = !!st.sound;
    A.musicOn = !!st.music;
    if (new URLSearchParams(location.search).get('sound') === '0') A.on = false;
  };
  function save() {
    if (!JK.Save) return;
    JK.Save.setSetting('sound', A.on);
    JK.Save.setSetting('music', A.musicOn);
  }

  A.unlock = function () {
    // 소리가 꺼져 있으면 오디오 장치를 아예 만들지 않는다
    if (!A.on) return;
    if (!A.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      A.ctx = new AC();
      A.master = A.ctx.createGain();
      A.master.gain.value = A.on ? A.volume : 0;
      // 부드럽게 눌러 주는 압축기 (여러 소리가 겹쳐도 귀가 아프지 않게)
      const comp = A.ctx.createDynamicsCompressor();
      comp.threshold.value = -18;
      comp.ratio.value = 4;
      A.master.connect(comp);
      comp.connect(A.ctx.destination);
      const len = A.ctx.sampleRate * 1.0;
      const buf = A.ctx.createBuffer(1, len, A.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      A._noise = buf;
    }
    if (A.ctx.state === 'suspended') A.ctx.resume();
    if (A.musicOn && A.on) A.startMusic();
  };
  A.setOn = function (on) {
    A.on = on;
    if (on) A.unlock();
    if (A.master) A.master.gain.setTargetAtTime(on ? A.volume : 0, A.ctx.currentTime, 0.05);
    if (on && A.musicOn) A.startMusic();
    if (!on) A.stopMusic();
    save();
  };
  A.setMusic = function (on) {
    A.musicOn = on;
    if (on && A.on) A.startMusic();
    else A.stopMusic();
    save();
  };
  const ok = () => A.ctx && A.on && A.ctx.state === 'running';

  function env(g, t, a, peak, dec) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  }
  function noiseSrc() {
    const s = A.ctx.createBufferSource();
    s.buffer = A._noise;
    return s;
  }

  // 짓기: "뽕" — 아래로 떨어지는 음 + 나무 두드림
  A.pop = function (pitch, gain) {
    if (!ok()) return;
    const c = A.ctx,
      t = c.currentTime;
    pitch = pitch || 1;
    gain = gain === undefined ? 1 : gain;
    const o = c.createOscillator(),
      g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(520 * pitch, t);
    o.frequency.exponentialRampToValueAtTime(150 * pitch, t + 0.16);
    env(g, t, 0.006, 0.55 * gain, 0.22);
    o.connect(g).connect(A.master);
    o.start(t);
    o.stop(t + 0.3);
    const k = c.createOscillator(),
      kg = c.createGain();
    k.type = 'triangle';
    k.frequency.setValueAtTime(1250 * pitch, t);
    env(kg, t, 0.002, 0.18 * gain, 0.05);
    k.connect(kg).connect(A.master);
    k.start(t);
    k.stop(t + 0.1);
    const n = noiseSrc(),
      f = c.createBiquadFilter(),
      ng = c.createGain();
    f.type = 'lowpass';
    f.frequency.value = 900;
    env(ng, t + 0.02, 0.01, 0.12 * gain, 0.25);
    n.connect(f).connect(ng).connect(A.master);
    n.start(t);
    n.stop(t + 0.4);
  };
  // 성벽 돌 쌓기: 낮은 쿵
  A.thud = function (gain) {
    if (!ok()) return;
    const c = A.ctx,
      t = c.currentTime;
    const o = c.createOscillator(),
      g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(120 + Math.random() * 30, t);
    o.frequency.exponentialRampToValueAtTime(55, t + 0.14);
    env(g, t, 0.004, 0.5 * (gain || 1), 0.18);
    o.connect(g).connect(A.master);
    o.start(t);
    o.stop(t + 0.25);
  };
  // 늦게 지음: 망치 소리 몇 번
  A.hammer = function () {
    if (!ok()) return;
    const c = A.ctx;
    for (let i = 0; i < 4; i++) {
      const t = c.currentTime + 0.35 + i * 0.32 + Math.random() * 0.05;
      const o = c.createOscillator(),
        g = c.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(700 + Math.random() * 120, t);
      env(g, t, 0.002, 0.16, 0.06);
      o.connect(g).connect(A.master);
      o.start(t);
      o.stop(t + 0.1);
    }
  };
  // 카드 넘김: 종이 스치는 소리
  A.swipe = function (dir) {
    if (!ok()) return;
    const c = A.ctx,
      t = c.currentTime;
    const n = noiseSrc(),
      f = c.createBiquadFilter(),
      g = c.createGain();
    f.type = 'bandpass';
    f.Q.value = 0.9;
    f.frequency.setValueAtTime(dir > 0 ? 2400 : 1700, t);
    f.frequency.exponentialRampToValueAtTime(dir > 0 ? 700 : 450, t + 0.22);
    env(g, t, 0.02, 0.35, 0.22);
    n.connect(f).connect(g).connect(A.master);
    n.start(t);
    n.stop(t + 0.35);
  };
  // 실각: 징 — 여러 배음이 천천히 사라진다
  A.gong = function () {
    if (!ok()) return;
    const c = A.ctx,
      t = c.currentTime;
    const f0 = 98;
    const parts = [
      [1, 0.5, 5.5],
      [1.006, 0.35, 5],
      [2.01, 0.18, 3.5],
      [2.76, 0.12, 2.6],
      [4.1, 0.06, 1.6],
      [5.4, 0.03, 1.1],
    ];
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(2600, t);
    lp.frequency.exponentialRampToValueAtTime(500, t + 4);
    lp.connect(A.master);
    for (const [m, a, d] of parts) {
      const o = c.createOscillator(),
        g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f0 * m * 1.012, t);
      o.frequency.exponentialRampToValueAtTime(f0 * m, t + 1.2);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(a, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(g).connect(lp);
      o.start(t);
      o.stop(t + d + 0.1);
    }
    const n = noiseSrc(),
      nf = c.createBiquadFilter(),
      ng = c.createGain();
    nf.type = 'bandpass';
    nf.frequency.value = 400;
    env(ng, t, 0.005, 0.25, 0.3);
    n.connect(nf).connect(ng).connect(A.master);
    n.start(t);
    n.stop(t + 0.5);
  };
  // 완성: 가야금처럼 튕기는 음 세 개
  A.chime = function () {
    if (!ok()) return;
    [0, 0.16, 0.34].forEach((d, i) => pluck(A.ctx.currentTime + d, [293.66, 392, 440][i], 0.28, 1.6));
  };

  // 가야금 비슷한 소리: 튕김 + 농현(떨림)
  function pluck(t, f, gain, dur) {
    const c = A.ctx;
    const o = c.createOscillator(),
      o2 = c.createOscillator(),
      g = c.createGain(),
      lp = c.createBiquadFilter();
    o.type = 'triangle';
    o2.type = 'sine';
    o.frequency.setValueAtTime(f, t);
    o2.frequency.setValueAtTime(f * 2, t);
    // 농현: 조금 뒤에 음이 흔들린다
    const lfo = c.createOscillator(),
      lg = c.createGain();
    lfo.frequency.value = 5.2;
    lg.gain.setValueAtTime(0, t);
    lg.gain.linearRampToValueAtTime(f * 0.018, t + 0.45);
    lfo.connect(lg);
    lg.connect(o.frequency);
    lg.connect(o2.frequency);
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(3200, t);
    lp.frequency.exponentialRampToValueAtTime(700, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const g2 = c.createGain();
    g2.gain.value = 0.25;
    o.connect(lp);
    o2.connect(g2).connect(lp);
    lp.connect(g).connect(A.master);
    for (const x of [o, o2, lfo]) {
      x.start(t);
      x.stop(t + dur + 0.05);
    }
  }
  // 배경 음악: 평조 느낌의 다섯 음을 느리게 튕긴다
  const SCALE = [146.83, 164.81, 196.0, 220.0, 246.94, 293.66, 329.63, 392.0];
  let idx = 4,
    nextT = 0,
    bar = 0;
  A.startMusic = function () {
    if (!A.ctx || A._musicTimer) return;
    nextT = A.ctx.currentTime + 0.3;
    A._musicTimer = setInterval(() => {
      if (!ok() || !A.musicOn) return;
      const c = A.ctx;
      while (nextT < c.currentTime + 0.6) {
        const beat = 60 / 66;
        if (Math.random() < 0.78) {
          idx = Math.max(0, Math.min(SCALE.length - 1, idx + [-2, -1, -1, 1, 1, 2, 0][Math.floor(Math.random() * 7)]));
          pluck(nextT, SCALE[idx], 0.09, 2.2);
          if (Math.random() < 0.18) pluck(nextT + beat / 2, SCALE[Math.max(0, idx - 1)], 0.06, 1.6);
        }
        if (bar % 8 === 0) pluck(nextT, 73.42, 0.07, 3.5);
        bar++;
        nextT += beat;
      }
    }, 200);
  };
  A.stopMusic = function () {
    if (A._musicTimer) clearInterval(A._musicTimer);
    A._musicTimer = null;
  };
  document.addEventListener('visibilitychange', () => {
    if (!A.ctx) return;
    if (document.hidden) A.ctx.suspend();
    else if (A.on) A.ctx.resume();
  });
})();
