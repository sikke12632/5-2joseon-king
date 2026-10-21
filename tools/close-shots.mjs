// close-shots.mjs — 건물 가까이 찍기(모양 확인용). 모두 지은 뒤 건물마다 한 장
//   STAGE=sejong KEYS=jiphyeon,jagyeok OUT=폴더 node tools/cdp.mjs tools/close-shots.mjs   (그래픽 칩이 멈추면 SOFTGL=1)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const STAGE = process.env.STAGE || 'sejong';
const KEYS = (process.env.KEYS || 'jiphyeon,jagyeok,honcheon,angbu:0,cheugu:0,jin,kiln').split(',');
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal&debug=1');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('${STAGE}','normal');})()`);
  await t.waitFor('JK.Cards.isReady()', 20000);
  await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(10000);
  await t.eval(`for (const s of ['#panel','#hud','#title','#debug']) document.querySelector(s).style.display='none'`);
  for (const k of KEYS) {
    const p = JSON.parse(await t.eval(`JSON.stringify(__jk.W.buildingPos('${k}'))`));
    if (!p) {
      console.log('  ✘ 자리 없음', k);
      continue;
    }
    await t.eval(`__jk.W.camLook(${p[0]}, ${p[1]}); __jk.W.camTo({ dist: ${process.env.DIST || 7}, az: ${process.env.AZ || 0.5}, el: 0.55, fov: 30 }, 0.1)`);
    await t.sleep(1800);
    await t.shot(`${OUT}/close-${k.replace(':', '-')}.png`);
  }
  await t.eval('__jk.W.camLook()');
}
