// perf.mjs — 화질 단계별 fps·그리기 호출·삼각형, CPU 6배 느리게, 첫 내려받기 용량을 잰다
//   (정적 서버를 먼저 켠다: python -m http.server 8642 --bind 127.0.0.1)
//   node tools/cdp.mjs tools/perf.mjs
const BASE = process.env.BASE || 'http://127.0.0.1:8642/index.html';
export const options = { width: Number(process.env.W || 1366), height: Number(process.env.H || 768) };

export default async function (t) {
  const rows = [];
  // 1) 첫 내려받기 + 첫 화면까지 시간 (캐시 없음)
  await t.send('Network.setCacheDisabled', { cacheDisabled: true });
  const t0 = Date.now();
  await t.goto(BASE + '?idle=0');
  await t.waitFor("document.querySelector('#loading').classList.contains('hide')");
  const firstScreen = Date.now() - t0;
  await t.sleep(1500);
  let bytes = 0;
  const files = [];
  for (const [, v] of t.net) if (v.url.startsWith('http')) { bytes += v.bytes || 0; files.push(`${v.url.replace(/^.*8642\//, '')} ${(v.bytes / 1024).toFixed(0)}KB`); }
  console.log(`첫 화면까지 ${firstScreen}ms, 내려받기 ${(bytes / 1024).toFixed(0)}KB (${files.length}개)`);
  console.log('  ' + files.join('\n  '));
  console.log('GPU', await t.eval('__jk.gpu'));
  console.log('자동 화질이 고른 단계', await t.eval('new Promise(r=>setTimeout(()=>r(__jk.W.getTier()+" / "+(JK.autoInfo||"")),3500))'));

  for (const q of ['high', 'normal', 'low']) {
    for (const cpu of [1, 6]) {
      await t.cpu(1);
      await t.goto(`${BASE}?q=${q}&idle=0`);
      await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
      await t.eval("document.querySelector('#btnStart').click()");
      await t.sleep(3000);
      await t.cpu(cpu);
      await t.sleep(800);
      const play = await t.fps(4);
      // 모두 짓는 동안(그림자 다시 굽기·먼지·흔들림이 겹치는 가장 무거운 때)
      await t.eval(`window.__mx={c:0,t:0};(function f(){const s=__jk.W.stats;__mx.c=Math.max(__mx.c,s.calls);__mx.t=Math.max(__mx.t,s.tris);requestAnimationFrame(f)})()`);
      await t.eval('__jk.G.debugBuildAll()');
      const build = await t.fps(4);
      await t.sleep(3000);
      const built = await t.fps(4);
      const mx = await t.eval('__mx');
      await t.eval('__jk.W.state.inkTarget=1');
      const ink = await t.fps(3);
      rows.push({ q, cpu, play: play.avgFps, playLow: play.low1Fps, build: build.avgFps, buildLow: build.low1Fps, built: built.avgFps, ink: ink.avgFps, calls: built.calls, tris: built.tris, maxCalls: mx.c, maxTris: mx.t });
      console.log(JSON.stringify(rows[rows.length - 1]));
    }
  }
  await t.cpu(1);
  console.log('\n| 화질 | CPU | 플레이 평균/하위5% | 짓는 중 평균/하위5% | 다 지은 뒤 | 실각(수묵) | 그리기(평소/최대) | 삼각형(평소/최대) |');
  console.log('|---|---|---|---|---|---|---|---|');
  for (const r of rows) console.log(`| ${r.q} | ${r.cpu}배 느리게 | ${r.play.toFixed(0)} / ${r.playLow.toFixed(0)} | ${r.build.toFixed(0)} / ${r.buildLow.toFixed(0)} | ${r.built.toFixed(0)} | ${r.ink.toFixed(0)} | ${r.calls} / ${r.maxCalls} | ${(r.tris / 1000).toFixed(0)}k / ${(r.maxTris / 1000).toFixed(0)}k |`);
}
