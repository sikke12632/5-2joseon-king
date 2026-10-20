/* engine/main.js — 시작: 저장 읽기 → 3D 세계 → 초상화 찍기 → 화면 → 화질 자동 고르기, 점검 상자(?debug=1) */
(function () {
  'use strict';
  const JK = window.JK;
  const $ = (s) => document.querySelector(s);
  const qs = new URLSearchParams(location.search);
  const DEBUG = qs.get('debug') === '1';
  const Q = qs.get('q'); // low | normal | high 이면 고정
  const W = JK.World;

  function gpuName(gl) {
    try {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      return ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    } catch (e) {
      return '알 수 없음';
    }
  }

  function boot() {
    const era = JK.era;
    const S = JK.Save.load(era.id);
    JK.Audio.init();
    const saved = S.settings.tier;
    const fixed = ['low', 'normal', 'high'].includes(Q) ? Q : ['low', 'normal', 'high'].includes(saved) ? saved : null;
    try {
      W.init($('#gl'), { map: era.map, sky: era.stages[0].sky, tier: fixed || 'normal', tierLocked: !!fixed, preserve: qs.get('preserve') === '1' });
    } catch (e) {
      $('#loading').innerHTML = '<p>이 기기에서 3D 그래픽(WebGL2)을 켤 수 없어요.<br>크롬을 최신으로 바꾸거나 다른 기기에서 열어 주세요.</p>';
      console.error(e);
      return;
    }
    JK.gpu = gpuName(W.renderer.getContext());
    if (!fixed && /SwiftShader|llvmpipe|Software|Basic Render/i.test(JK.gpu)) W.setTier('low', false);
    layout();
    window.addEventListener('resize', layout);
    // 초상화: 같은 엔진에서 목각 인형을 찍는다
    const roles = Object.keys(era.data.roles).map((id) => Object.assign({ id }, era.data.roles[id]));
    const pics = W.portraits(roles, 320);
    JK.portraitsData = pics;
    JK.Game.init({ portraits: pics });
    JK.UI.init();
    W.camTo(W.CAM_TITLE, 0.01);
    W.setTOD(0.06, true);
    for (const k in era.stages[0].prebuilt || {}) W.buildInstant(k, era.stages[0].prebuilt[k]);
    W.start();
    $('#loading').classList.add('gone');
    if (!fixed) autoTier();
    if (DEBUG) setupDebug();
    W.onLost = () => $('#lost').classList.remove('hide');
    W.onRestored = () => $('#lost').classList.add('hide');
    W.onTier = () => JK.UI.paintSettings();
    ['pointerdown', 'pointermove', 'wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, () => (W.lastInput = performance.now()), { passive: true }));
    if (qs.get('idle') === '0') W.noIdle = true;
    window.__jk = { W, G: JK.Game, S: JK.Save, gpu: JK.gpu };
  }

  /* 카드 자리에 맞춰 섬 위치를 옮긴다 */
  function layout() {
    const w = window.innerWidth,
      h = window.innerHeight;
    const portrait = h > w * 1.05;
    document.body.classList.toggle('portrait', portrait);
    const panel = $('#panel');
    W.layout.portrait = portrait;
    W.layout.panelW = portrait ? 0 : panel.offsetWidth + 24;
    W.layout.panelH = portrait ? panel.offsetHeight : 0;
    W.resize();
  }

  /* 처음 몇 초 프레임 시간을 재서 화질을 고른다 */
  function autoTier() {
    const strong = /NVIDIA|GeForce|RTX|Radeon RX|Radeon Pro|Apple M\d/i.test(JK.gpu);
    setTimeout(() => {
      W.frameTimes.length = 0;
      setTimeout(() => {
        const a = W.frameTimes.slice().sort((x, y) => x - y);
        if (!a.length) return;
        const med = a[Math.floor(a.length / 2)];
        const t = W.getTier();
        if (med > 24) W.setTier(t === 'high' ? 'normal' : 'low');
        else if (t === 'normal' && med < 18 && strong) W.setTier('high');
        JK.autoInfo = `처음 측정 ${med.toFixed(1)}ms`;
        watch();
      }, 2500);
    }, 1500);
    // 계속 느리면 한 단계 더 내린다
    let downs = 0;
    function watch() {
      setInterval(() => {
        if (W.isTierLocked() || downs >= 2 || document.hidden || W.state.idle) return;
        const a = W.frameTimes.slice(-180);
        if (a.length < 120) return;
        const avg = a.reduce((s, x) => s + x, 0) / a.length;
        const t = W.getTier();
        if (avg > 36 && t !== 'low') {
          W.setTier(t === 'high' ? 'normal' : 'low');
          downs++;
        }
      }, 4000);
    }
  }

  function setupDebug() {
    const el = $('#debug');
    el.classList.remove('hide');
    el.innerHTML = '<pre id="dbgText"></pre><div class="dbg-btns"><button id="dbgFall">실각 보기</button><button id="dbgEnd">진엔딩 보기</button><button id="dbgBuild">모두 짓기</button><button id="dbgSkip">끝까지</button><button id="dbgLose">문맥 잃기 시험</button></div>';
    $('#dbgFall').onclick = () => JK.Game.debugFall();
    $('#dbgEnd').onclick = () => JK.Game.debugEnding('true');
    $('#dbgBuild').onclick = () => JK.Game.debugBuildAll();
    $('#dbgSkip').onclick = () => JK.Game.debugSkip();
    $('#dbgLose').onclick = () => {
      const ext = W.renderer.getContext().getExtension('WEBGL_lose_context');
      if (!ext) return;
      ext.loseContext();
      setTimeout(() => ext.restoreContext(), 1200);
    };
    const t = $('#dbgText');
    W.onStats = (s) => {
      t.textContent = [
        `fps ${s.fps.toFixed(0)}  (${s.ms.toFixed(1)}ms)`,
        `그리기 ${s.calls}  삼각형 ${(s.tris / 1000).toFixed(1)}k`,
        `화질 ${W.TIERS[W.getTier()].name}${W.isTierLocked() ? ' (고정)' : ' (자동)'}`,
        `해상도 ${W.renderer.domElement.width}×${W.renderer.domElement.height}`,
        `사람 ${s.walkers}  ${W.state.idle ? '· 쉬는 중' : ''}`,
        `GPU ${JK.gpu}`,
      ].join('\n');
    };
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (document.fonts && document.fonts.ready) {
      // 글꼴을 1.2초까지만 기다린다(늦으면 그냥 시작)
      Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(boot);
    } else boot();
  });
})();
