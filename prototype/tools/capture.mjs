// capture.mjs — 보고서용 화면 캡처 3장(보통 장면, 건물 다 지은 장면, 실각)을 캡처/ 에 남긴다
//   node tools/cdp.mjs tools/capture.mjs
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const OUT = join(dirname(dirname(fileURLToPath(import.meta.url))), '캡처');
const BASE = 'http://127.0.0.1:8642/index.html?q=normal&idle=0';
export default async function (t) {
  const mouse = (type, x, y) => t.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 });
  const cardReady = "__jk.G.state !== 'play' || (!__jk.G.busy && getComputedStyle(document.querySelector('#card')).opacity > 0.9)";
  async function swipe(dir, hold) {
    await t.waitFor(cardReady, 15000);
    const r = await t.eval("(()=>{const b=document.querySelector('#card').getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height*0.6}})()");
    await mouse('mousePressed', r.x, r.y);
    for (let k = 1; k <= 10; k++) { await mouse('mouseMoved', r.x + dir * k * 16, r.y + k); await t.sleep(25); }
    if (hold) await hold();
    await mouse('mouseReleased', r.x + dir * 160, r.y + 10);
    await t.sleep(400);
  }
  // 1) 보통 장면: 궁궐·종묘·초가가 선 뒤, 카드를 끄는 중(게이지 미리 빛나기)
  await t.goto(BASE);
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("document.querySelector('#btnStart').click()");
  await t.sleep(2600);
  for (const d of [1, 1, -1, 1]) await swipe(d);
  await t.sleep(1500);
  await swipe(1, async () => { await t.sleep(500); await t.shot(join(OUT, '1-보통장면.png')); });
  console.log('1 찍음', await t.eval('JSON.stringify(__jk.G.vals)'));
  // 2) 건물 다 지은 장면: 끝까지 가서 해 질 녘 도성 완성
  for (const d of [-1, 1]) await swipe(d);
  await t.waitFor("__jk.G.state === 'end'", 20000);
  await t.sleep(4500);
  await t.shot(join(OUT, '2-건물완성.png'));
  console.log('2 찍음', await t.eval("__jk.G.state + ' ' + (JK.Audio.ctx && JK.Audio.ctx.state)"));
  // 3) 실각: 모두 들어주면 국고가 바닥 나 실각
  await t.goto(BASE);
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("document.querySelector('#btnStart').click()");
  await t.sleep(2600);
  for (let i = 0; i < 6; i++) { if ((await t.eval('__jk.G.state')) !== 'play') break; await swipe(1); }
  await t.waitFor("!document.querySelector('#fall').classList.contains('hide')", 20000);
  await t.sleep(2500);
  await t.shot(join(OUT, '3-실각.png'));
  console.log('3 찍음', await t.eval('JSON.stringify(__jk.G.vals)'));
}
