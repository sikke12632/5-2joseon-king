// play.mjs — 게이지를 50 가까이 지키는 쪽을 고르며 한 왕을 끝까지 둔다(키보드 ←/→). 정한 카드 뒤에 화면을 찍는다.
//   OUT=폴더 SHOTS=T00,T05,T06 FORCE=T05:R,T06:L  node tools/cdp.mjs tools/play.mjs
const BASE = process.env.BASE || 'http://127.0.0.1:8643/index.html';
const OUT = process.env.OUT || '';
const SHOTS = (process.env.SHOTS || '').split(',').filter(Boolean);
const FORCE = Object.fromEntries((process.env.FORCE || '').split(',').filter(Boolean).map((x) => x.split(':')));
export const options = { width: Number(process.env.W || 1366), height: Number(process.env.H || 768) };
export default async function (t) {
  const key = async (k) => {
    const code = k === 'R' ? ['ArrowRight', 39] : ['ArrowLeft', 37];
    await t.send('Input.dispatchKeyEvent', { type: 'keyDown', key: code[0], code: code[0], windowsVirtualKeyCode: code[1] });
    await t.send('Input.dispatchKeyEvent', { type: 'keyUp', key: code[0], code: code[0], windowsVirtualKeyCode: code[1] });
  };
  await t.goto(BASE + '?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval('localStorage.clear()');
  await t.goto(BASE + '?idle=0' + (process.env.Q ? '&q=' + process.env.Q : ''));
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  if (SHOTS.includes('title') && OUT) await t.shot(`${OUT}/title.png`);
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(2500);
  console.log('덱', await t.eval("__jk.G.run.deck.join(' ')"));
  const ready = "__jk.G.state !== 'play' || (JK.Cards.isReady() && getComputedStyle(document.querySelector('#card')).opacity > 0.95)";
  for (let n = 0; n < 80; n++) {
    await t.waitFor(ready, 20000);
    if ((await t.eval('__jk.G.state')) !== 'play') break;
    const cur = await t.eval("(()=>{const r=__jk.G.run;return r.pending?'기록':r.deck[r.pos]})()");
    // 고르기: FORCE에 있으면 그대로, 아니면 끝 게이지가 50에서 덜 멀어지는 쪽
    const dir = await t.eval(`(()=>{const r=__jk.G.run;if(r.pending) return 'R';const c=__jk.G.card(r.deck[r.pos]);if(c.single) return 'R';
      const f=${JSON.stringify(FORCE)};if(f[c.id]) return f[c.id];
      const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
      return cost(c.right.fx)<=cost(c.left.fx)?'R':'L';})()`);
    if (SHOTS.includes(cur + '-card') && OUT) await t.shot(`${OUT}/${cur}-card.png`);
    await key(dir);
    console.log(n, cur, dir, await t.eval('JSON.stringify(__jk.G.run.vals)'));
    if (SHOTS.includes(cur) && OUT) {
      await t.sleep(Number(process.env.SHOT_DELAY || 2600));
      await t.shot(`${OUT}/${cur}.png`);
    }
  }
  console.log('상태', await t.eval('__jk.G.state'), '| 지은 것', await t.eval("__jk.G.run.built.join(',')"), '| 상태', await t.eval('JSON.stringify(__jk.G.run.states)'));
  if (process.env.QUIZ !== '0') {
    for (let q = 0; q < 3; q++) {
      try { await t.waitFor("!document.querySelector('#quiz').classList.contains('hide')", 9000); } catch { break; }
      await t.eval(`(()=>{const q=JK.era.data.quizzes.find(x=>x.q===document.querySelector('#qText').textContent);[...document.querySelectorAll('.q-opt')].find(b=>b.textContent===q.answer).click();})()`);
      await t.sleep(400);
      await t.eval("document.querySelector('#qNext').click()");
    }
    try { await t.waitFor("!document.querySelector('#soon').classList.contains('hide')", 9000); } catch {}
    await t.sleep(3000);
    if (SHOTS.includes('end') && OUT) await t.shot(`${OUT}/end.png`);
    console.log('끝:', await t.eval("[...document.querySelectorAll('#soon .m-box > *')].map(e=>e.textContent).filter(Boolean).join(' | ')"));
  }
}
