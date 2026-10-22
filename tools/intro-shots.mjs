// intro-shots.mjs — 왕별 소개 화면·시작 장면(설계서 10-12) 확인, 1280×664
//   OUT=폴더 node tools/cdp.mjs tools/intro-shots.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor(`!document.querySelector('#intro').classList.contains('hide')`, 15000);
  await t.sleep(1800);
  const it = JSON.parse(await t.eval(`JSON.stringify({text:document.querySelector('#inPage').textContent, start:(()=>{for(let k=0;k<2;k++) document.querySelector('#inGo').click(); return document.querySelector('#inStart').textContent})(), level:document.querySelector('#inLevel').textContent, vals:__jk.G.run.vals, clip:(()=>{const b=document.querySelector('#intro .m-box').getBoundingClientRect();return b.top<0||b.bottom>innerHeight})()})`));
  ok('소개 글(10-12 ③)', /고려 말/.test(it.text), it.text.slice(0, 40));
  ok('새싹: 시작 게이지를 50 쪽으로 절반(태조 50·40·35·55 → 50·45·43·53)', JSON.stringify(it.vals) === '{"people":50,"nobles":45,"treasury":43,"army":53}', JSON.stringify(it.vals));
  ok('소개 화면이 화면 안', !it.clip, it.level + ' / ' + it.start);
  await t.shot(`${OUT}/intro-1.png`);
  await t.eval(`(()=>{for(let k=0;k<5&&!document.querySelector('#intro').classList.contains('hide');k++) document.querySelector('#inGo').click()})()`);
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.sleep(2500);
  ok('시작 장면: 개경 쪽 산·고려 깃발·새 깃발', await t.eval(`['kaesongHills','goryeoFlag','newFlag'].every(k=>__jk.W.island.children.some(m=>m.visible&&__jk.W.BUILD_DEFS[k]&&m.position.x===__jk.W.BUILD_DEFS[k].x))`));
  await t.shot(`${OUT}/intro-2-scene.png`);
}
