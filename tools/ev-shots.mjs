// ev-shots.mjs — 돌발 18장의 세계 연출을 한 장씩 찍는다(설계서 10-13-4 연출 칸 확인), 디벗 1280×664
//   카드가 뜬 뒤 WAIT ms에 한 장, 상자는 연 뒤에 한 장 더. IDS=ET01,ET09 로 골라 찍을 수 있다
//   OUT=폴더 node tools/cdp.mjs tools/ev-shots.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const WAIT = Number(process.env.WAIT || 2600);
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 30000);
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  // 궁궐·공사장이 선 섬에서(연출이 건물 자리를 쓴다)
  await t.eval(`(()=>{const r=__jk.G.run; for(const k of ['gyeongbok','workyard','giwa','choga','jongmyo']) if(!r.built.includes(k)){r.built.push(k); __jk.W.buildInstant(k);} })()`);
  const ids = (process.env.IDS || '').split(',').filter(Boolean);
  const all = ids.length ? ids : JSON.parse(await t.eval(`JSON.stringify(JK.era.data.cards.filter(c=>c.kind==='event').map(c=>c.id))`));
  for (const id of all) {
    await t.waitFor('JK.Cards.isReady()', 20000);
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.waitFor('JK.Cards.isReady()', 20000);
    }
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide'); __jk.G.run.ev.lastNarr=-99; __jk.G.run.ev.seen=[]`);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}'`, 15000);
    await t.sleep(WAIT);
    const name = await t.eval(`__jk.G.card('${id}').name`);
    await t.shot(`${OUT}/ev-${id}-${name.replace(/\s/g, '')}.png`);
    const box = await t.eval(`!!__jk.G.card('${id}').box`);
    await t.eval(`__jk.G.commit(${box ? `__jk.G.card('${id}').box.side==='right'?1:-1` : 1})`);
    if (box) {
      await t.sleep(1900);
      await t.shot(`${OUT}/ev-${id}-${name.replace(/\s/g, '')}-열기.png`);
    }
    await t.sleep(1200);
    console.log('  찍음', id, name);
  }
}
