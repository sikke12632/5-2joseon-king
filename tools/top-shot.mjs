// top-shot.mjs — 섬을 위에서 내려다본 화면(건물 자리 잡기용). 모두 지은 뒤 찍는다
//   STAGE=sejong OUT=폴더 node tools/cdp.mjs tools/top-shot.mjs   (STAGE 기본 taejo, BUILD=0 이면 시작 모습만)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const STAGE = process.env.STAGE || 'taejo';
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal&debug=1');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('${STAGE}','normal');})()`);
  await t.waitFor('JK.Cards.isReady()', 20000);
  if (process.env.BUILD !== '0') await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(9000);
  await t.eval(`for (const s of ['#panel','#hud','#title','#debug']) document.querySelector(s).style.display='none'`);
  await t.eval(`__jk.W.camTo({ dist: ${process.env.DIST || 34}, az: 0, el: 1.5 }, 0.1)`);
  await t.sleep(1500);
  await t.shot(`${OUT}/top-${STAGE}.png`);
  await t.eval('__jk.W.camTo(__jk.W.CAM_PLAY, 0.1)');
  await t.sleep(1500);
  await t.shot(`${OUT}/play-${STAGE}.png`);
  console.log(await t.eval(`JSON.stringify({tris: __jk.W.stats.tris || null, built: __jk.G.run.built})`));
}
