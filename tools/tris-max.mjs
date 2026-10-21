// tris-max.mjs — 성능 예산(삼각형 200k) 확인: 화질별로 모두 지은 뒤 + 돌발 연출·갈래 장식을 한꺼번에 띄웠을 때 최대 삼각형·그리기 호출
//   그래픽 칩이 멈춘 때에도 SOFTGL=1 로 잴 수 있다(삼각형 수는 같다. fps는 재지 않음)
//   Q=normal,high  node tools/cdp.mjs tools/tris-max.mjs
const BASE = process.env.BASE || 'http://127.0.0.1:8643/index.html';
const QS = (process.env.Q || 'normal,high').split(',');
// STAGE=sejong 이면 그 왕 판에서 잰다(기본은 첫 판 = 태조)
const STAGE = process.env.STAGE || '';
export const options = { width: 1366, height: 768 };
export default async function (t) {
  for (const q of QS) {
    await t.goto(`${BASE}?q=${q}&idle=0&pick=normal`);
    await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
    await t.eval("localStorage.clear(); document.querySelector('#btnNew').click()");
    await t.waitFor('JK.Cards.isReady()', 30000);
    if (STAGE) {
      await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('${STAGE}','normal');})()`);
      await t.sleep(1500);
      await t.waitFor('JK.Cards.isReady()', 30000);
    }
    await t.eval(`window.__mx={c:0,t:0};(function f(){const s=__jk.W.stats;__mx.c=Math.max(__mx.c,s.calls);__mx.t=Math.max(__mx.t,s.tris);requestAnimationFrame(f)})()`);
    const start = await t.eval('JSON.stringify(__mx)');
    await t.eval('__jk.G.debugBuildAll()');
    await t.sleep(9000);
    // 모두 짓는 연출(건물 스무 채가 한꺼번에 솟음 — 실제 판에서는 카드마다 한두 채)이 끝날 때까지 기다렸다가 다시 잰다
    await t.waitFor('!__jk.W.animating()', 60000).catch(() => {});
    await t.sleep(1500);
    const built = await t.eval('JSON.stringify(__mx)');
    await t.eval('__mx.c=0; __mx.t=0');
    // 위기 장면(사람 무리·연기)과 돌발 연출을 겹쳐 가장 무거운 때를 만든다
    const extra = await t.eval(`(async()=>{ const W=__jk.W, out={};
      W.crisisScene({people:{level:'danger',side:'low',d:10},army:{level:'danger',side:'low',d:10}});
      if (JK.EvFx) for (const s of ['hungry','market','deer','ship','jar','harvest','envoy','rain','debate','relay']) { JK.EvFx.play(s,{id:'X'}); await new Promise(r=>setTimeout(r,1500)); out[s]=__mx.t; }
      return JSON.stringify(out); })()`);
    const mx = JSON.parse(await t.eval('JSON.stringify(__mx)'));
    console.log(`[${q}] 시작 ${start} · 모두 지은 뒤(짓는 연출 포함) ${built} · 다 지은 섬 + 위기 장면 + 돌발 연출 ${extra} · 최대 그리기 ${mx.c} 삼각형 ${(mx.t / 1000).toFixed(1)}k`);
    const bt = JSON.parse(built).t;
    console.log(bt <= 200000 ? '  ✔' : '  ✘', `[${q}] 모두 짓는 동안 삼각형 200k 이하`, bt);
    console.log(mx.t <= 200000 ? '  ✔' : '  ✘', `[${q}] 다 지은 섬 + 위기 + 돌발 연출 삼각형 200k 이하`, mx.t);
  }
}
