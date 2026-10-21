// text-test.mjs — 글씨를 키운 뒤 디벗 화면(1280×664)에서 카드 글이 넘치거나 잘리지 않는지
//  역사 카드 전부 + 대사가 가장 긴 일상·사슬·희귀·위기 카드 + 「실제 역사」 두루마리를 차례로 띄워 잰다
//   OUT=폴더 node tools/cdp.mjs tools/text-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval('localStorage.clear()');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  const ids = JSON.parse(await t.eval(`(()=>{const C=JK.era.data.cards;const h=C.filter(c=>c.kind==='history'&&!c.variant_of).map(c=>c.id);
    const longest=(k,n)=>C.filter(c=>c.kind===k).sort((a,b)=>b.line.length-a.line.length).slice(0,n).map(c=>c.id);
    return JSON.stringify(h.concat(longest('daily',6),longest('chain',3),longest('rare',2),longest('legend',1),longest('crisis',3)));})()`));
  // 카드 안 글이 카드 밖으로 나가거나(아래쪽), 글 상자가 스스로 넘치는지
  const measure = () => t.eval(`(()=>{const card=document.querySelector('#card').getBoundingClientRect();const bad=[];
    for(const s of ['#text','#runBox','.who-line','#crisisName','#similar']){const e=document.querySelector(s);if(!e||!e.offsetParent)continue;const r=e.getBoundingClientRect();if(r.height===0)continue;
      if(r.bottom>card.bottom-4||r.right>card.right+1||e.scrollHeight>e.clientHeight+3)bad.push(s+'('+Math.round(r.bottom-card.bottom)+')');}
    const p=document.querySelector('#panel').getBoundingClientRect();if(p.top<0||p.bottom>innerHeight)bad.push('panel');
    return bad.join(',');})()`);
  const fails = [];
  let shots = 0;
  for (const id of ids) {
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}' && !__jk.G.run.pending`, 8000);
    await t.sleep(650);
    const b = await measure();
    if (b) fails.push(`${id}: ${b}`);
    if (shots < 2 && /^(T04|DT)/.test(id)) {
      shots++;
      await t.shot(`${OUT}/text-${id}.png`);
    }
    // 「실제 역사」 두루마리도(역사·사슬·희귀)
    const real = await t.eval(`!!__jk.G.card('${id}').real_history`);
    await t.eval(`__jk.G.commit(JK.Cards.isLocked(1) ? (JK.Cards.isLocked(-1) ? 2 : -1) : 1)`);
    await t.sleep(900);
    if (real) {
      await t.waitFor(`JK.Cards.isReady()`, 8000);
      await t.sleep(650);
      if (await t.eval('!!__jk.G.run.pending')) {
        const b2 = await measure();
        if (b2) fails.push(`${id}(실제 역사): ${b2}`);
        if (shots < 3 && id === 'T07') {
          shots++;
          await t.shot(`${OUT}/text-${id}-real.png`);
        }
        await t.eval('__jk.G.commit(1)');
        await t.sleep(700);
      }
    }
    await t.waitFor(`JK.Cards.isReady() || __jk.G.state!=='play'`, 8000);
    if ((await t.eval('__jk.G.state')) !== 'play') break;
  }
  console.log(`  카드 ${ids.length}장 확인`);
  ok('넘치거나 잘린 글 없음', fails.length === 0, fails.join(' | '));
}
