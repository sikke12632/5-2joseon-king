// fx-shots.mjs — 태조 추가 연출표 건물 눈으로 보기: 실제 경로 장식 한 장, 다른 길 장식 한 장
//   OUT=폴더 node tools/cdp.mjs tools/fx-shots.mjs
const OUT = process.env.OUT || '.';
export default async function (t) {
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  console.log('섬 변환 정상:', await t.eval('Number.isFinite(__jk.W.island.rotation.z) && Number.isFinite(__jk.W.island.rotation.x)'));
  await t.eval('JK.Cards.hide()');
  for (const k of ['gyeongbok', 'seonggyun', 'jongmyo', 'munmyo', 'starStone', 'gyeryong', 'muak', 'wihwa', 'workyard', 'wall', 'sungnye', 'heungin', 'donui', 'sukjeong']) await t.eval(`__jk.W.buildInstant('${k}')`);
  await t.sleep(2500);
  await t.shot(OUT + '/fx-real.png');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.eval('JK.Cards.hide()');
  for (const k of ['altPalace', 'altAltar', 'altOldWall', 'altSmallSG', 'gateFence', 'sungnye', 'heungin', 'donui', 'sukjeong', 'altTemple']) await t.eval(`__jk.W.buildInstant('${k}')`);
  await t.sleep(2500);
  await t.shot(OUT + '/fx-alt.png');
}
