// seonjo-route-test.mjs — 선조·인조 루트(routes_J.py): 한양을 지킨 갈래(J02a1 → AJ01·AJ02, 궁궐·종묘가 남음, 불탄 도성 카드 빠짐)
//   · 광해군 길을 이은 갈래(J08a1 → AJ03·AJ04, 왕은 그대로 인조로 바뀜) · 실록 도전 실제 경로 잠금(real(J01))
//   SOFTGL=1 node tools/cdp.mjs tools/seonjo-route-test.mjs
export const options = { width: 1280, height: 664 };
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const quiet = () => t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; document.querySelector('#warnFirst').classList.add('hide')`);
  const start = async (diff) => {
    await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('seonjo','${diff}');})()`);
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

  console.log('1) 한양을 지킨 조선');
  await start('normal');
  await show('J02', { army: 50 });
  const fan = await J(`__jk.G.run.shownAlt`);
  ok('J02 「한양을 지킨다」 열림', fan && fan.opts.length === 1 && fan.opts[0].open, JSON.stringify(fan && fan.opts));
  await t.eval(`__jk.G.commitAlt('J02a1')`);
  await t.sleep(900);
  await passPending();
  ok('플래그 F_한양', await t.eval(`!!__jk.G.run.flagsRun['F_한양']`));
  ok('경복궁·종묘가 치워지지 않음(터 없음)', await t.eval(`!(__jk.G.run.unscene||[]).includes('gyeongbok') && !__jk.G.run.built.includes('gyeongbokRuin')`));
  ok('불탄 도성 카드 C05a가 이 생에서 빠짐', await t.eval(`!JK.Cond.test(__jk.G.card('C05a').conditions, {run:Object.assign({}, __jk.G.run, {seenRun: __jk.G.run.seenRun.concat(['J05'])}), meta:JK.Save.meta})`));
  await show('J03');
  let s = await within('AJ01', 3);
  ok('J03 뒤 AJ01(지친 도성 사람들)', s[s.length - 1] === 'AJ01', s.join(' → '));
  await commit(1);
  await show('J07');
  s = await within('AJ02', 6); // 결 연속 규칙(저울 넷 연속 금지)으로 한두 장 늦을 수 있다
  ok('J07 뒤 6장 안 AJ02(종묘를 기리는 제사)', s[s.length - 1] === 'AJ02', s.join(' → '));
  await commit(1);
  ok('갈래 ① 완성(seonjo①)', await t.eval(`(__jk.G.run.branchDone||[]).includes('seonjo①')`), await t.eval(`JSON.stringify(__jk.G.run.branchDone)`));

  console.log('2) 광해군 길을 이은 조선');
  await start('normal');
  await show('J08', { people: 55, army: 45 });
  const f8 = await J(`__jk.G.run.shownAlt`);
  ok('J08 「두 나라와 다 지낸다」 열림', f8 && f8.opts[0].open, JSON.stringify(f8 && f8.opts));
  ok('J08에서 왕이 인조로 바뀜(다른 길이어도)', (await t.eval('__jk.G.run.kingName')) === '인조');
  await t.eval(`__jk.G.commitAlt('J08a1')`);
  await t.sleep(900);
  await passPending();
  s = await within('AJ03', 2);
  ok('J08a1 뒤 AJ03(국경 강가의 장터)', s[s.length - 1] === 'AJ03', s.join(' → '));
  s = await within('AJ04', 3);
  ok('AJ03 뒤 AJ04(명의 못마땅함)', s[s.length - 1] === 'AJ04', s.join(' → '));
  await commit(1);
  ok('갈래 ② 완성(seonjo②)', await t.eval(`(__jk.G.run.branchDone||[]).includes('seonjo②')`));

  console.log('3) 실록 도전: J03은 J01을 실제대로 해야 열림');
  await start('annals');
  await show('J01', { treasury: 50 });
  await t.eval(`__jk.G.commitAlt('J01a1')`);
  await t.sleep(900);
  await show('J03', { army: 60, treasury: 60 });
  const shut = await t.eval(`JK.Cond.test(__jk.G.card('J03').paths.real.require.annals, {run:__jk.G.run, meta:JK.Save.meta})`);
  ok('J03 실제 경로 잠김(real(J01) 없음)', !shut);
  const f3 = await J(`__jk.G.run.shownAlt`);
  ok('잠기면 다른 길 부채꼴이 뜸', !!f3, JSON.stringify(f3 && f3.opts));
}
