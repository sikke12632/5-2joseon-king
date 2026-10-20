// headroom.mjs — 60fps 제한을 풀고(UNCAP=1) 화질·해상도별 최대 fps를 잰다
//   UNCAP=1 node tools/cdp.mjs tools/headroom.mjs
export const options = { width: 1920, height: 1080 };
export default async function (t) {
  const sizes = [[1366, 768], [1920, 1080]];
  console.log('| 화면 | 화질 | 플레이 | 다 지은 뒤 | 실각(수묵) |');
  console.log('|---|---|---|---|---|');
  for (const [w, h] of sizes) {
    await t.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    for (const q of ['high', 'normal', 'low']) {
      await t.goto(`http://127.0.0.1:8642/index.html?q=${q}&idle=0`);
      await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
      await t.eval("document.querySelector('#btnStart').click()");
      await t.sleep(3000);
      const a = await t.fps(3);
      await t.eval('__jk.G.debugBuildAll()');
      await t.sleep(6000);
      const b = await t.fps(3);
      await t.eval('__jk.W.state.inkTarget=1');
      await t.sleep(3000);
      const c = await t.fps(3);
      console.log(`| ${w}×${h} | ${q} | ${a.avgFps.toFixed(0)} | ${b.avgFps.toFixed(0)} | ${c.avgFps.toFixed(0)} |`);
    }
  }
}
