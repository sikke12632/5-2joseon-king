// yeongjo-route-test.mjs — 영조·정조 루트(routes_Y.py): 탕평 없는 갈래(Y01a1 → 저울이 푸른 쪽으로 3칸 → AY01·AY02)
//   · 화성을 쌓지 않은 갈래(Y08a1 → 화성 없음, Y09 자리에 Y09v1 → AY03·AY04) · 실록 도전 실제 경로 잠금(real(Y02))
//   SOFTGL=1 node tools/cdp.mjs tools/yeongjo-route-test.mjs
export const options = { width: 1280, height: 664 };
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const quiet = () => t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; document.querySelector('#warnFirst').classList.add('hide')`);
  const start = async (diff) => {
    await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('yeongjo','${diff}');})()`);
    await t.sleep(1200);
    await ready();
    await quiet();
  };
  const setVals = (o) => t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:55,nobles:55,treasury:55,army:50},${JSON.stringify(o)});r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  const passPending = async () => {
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(700);
      await ready();
    }
  };
  const show = async (id, vals) => {
    await passPending();
    if (vals) await setVals(vals);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && !__jk.G.run.pending && __jk.G.run.deck[__jk.G.run.pos]===(__jk.G.run.variants['${id}']||'${id}')`, 8000).catch(() => {});
    await t.sleep(300);
  };
  const cur = () => t.eval('__jk.G.run.deck[__jk.G.run.pos]');
  const commit = async (dir) => {
    await t.eval(`__jk.G.commit(${dir})`);
    await t.sleep(900);
    await passPending();
    return cur();
  };
  // 지금 카드부터 넘기며 id가 n장 안에 나오는지
  const within = async (id, n) => {
    const seen = [await cur()];
    for (let i = 0; i < n && seen[seen.length - 1] !== id; i++) seen.push(await commit(1));
    return seen;
  };
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,60),...a);})()`);

  console.log('1) 탕평 없는 조선');
  await start('normal');
  await show('Y01', { nobles: 65 });
  const f1 = await J(`__jk.G.run.shownAlt`);
  ok('Y01 「끝까지 한쪽만 쓴다」 열림', f1 && f1.opts[0].open, JSON.stringify(f1 && f1.opts));
  await t.eval(`__jk.G.commitAlt('Y01a1')`);
  await t.sleep(900);
  await passPending();
  ok('플래그 F_한붕당 · 저울 +3(푸른 쪽)', await t.eval(`!!__jk.G.run.flagsRun['F_한붕당'] && __jk.G.run.device.scale === 3`), await t.eval('__jk.G.run.device.scale'));
  await show('Y02');
  await commit(1);
  let s = await within('AY01', 3);
  ok('Y02 뒤 AY01(고향으로 내려가는 대신들)', s[s.length - 1] === 'AY01', s.join(' → '));
  await commit(1);
  await show('Y05');
  await commit(1);
  s = await within('AY02', 5);
  ok('Y05 뒤 AY02(한목소리 상소)', s[s.length - 1] === 'AY02', s.join(' → '));
  await commit(1);
  ok('갈래 ① 완성(yeongjo①)', await t.eval(`(__jk.G.run.branchDone||[]).includes('yeongjo①')`), await t.eval(`JSON.stringify(__jk.G.run.branchDone)`));

  console.log('2) 화성을 쌓지 않은 조선');
  await start('normal');
  await show('Y08', { treasury: 35 });
  const f8 = await J(`__jk.G.run.shownAlt`);
  ok('Y08 「화성을 쌓지 않는다」 열림', f8 && f8.opts[0].open, JSON.stringify(f8 && f8.opts));
  await t.eval(`__jk.G.commitAlt('Y08a1')`);
  await t.sleep(900);
  await passPending();
  ok('화성·거중기가 서지 않음', await t.eval(`!__jk.G.run.built.includes('hwaseong') && !__jk.G.run.built.includes('geojunggi')`));
  s = await within('AY03', 3);
  ok('Y08a1 뒤 AY03(수원 장터)', s[s.length - 1] === 'AY03', s.join(' → '));
  await commit(1);
  await show('Y09');
  ok('Y09 자리에 Y09v1(궁궐 잔치)', (await cur()) === 'Y09v1', await cur());
  await commit(1);
  ok('변형판도 그 사건을 지난 것으로(seen(Y09))', await t.eval(`__jk.G.run.seenRun.includes('Y09')`));
  s = await within('AY04', 4);
  ok('Y09v1 뒤 AY04(한양 길과 다리)', s[s.length - 1] === 'AY04', s.join(' → '));
  await commit(1);
  ok('갈래 ② 완성(yeongjo②)', await t.eval(`(__jk.G.run.branchDone||[]).includes('yeongjo②')`));

  console.log('3) 실록 도전: Y03은 Y02를 실제대로 해야 열림');
  await start('annals');
  await show('Y02', { nobles: 50 });
  await t.eval(`__jk.G.commitAlt('Y02a1')`);
  await t.sleep(900);
  await show('Y03', { people: 60, treasury: 60 });
  const shut = await t.eval(`JK.Cond.test(__jk.G.card('Y03').paths.real.require.annals, {run:__jk.G.run, meta:JK.Save.meta})`);
  ok('Y03 실제 경로 잠김(real(Y02) 없음)', !shut);
  const f3 = await J(`__jk.G.run.shownAlt`);
  ok('잠기면 다른 길 부채꼴이 뜸', !!f3, JSON.stringify(f3 && f3.opts));
}
