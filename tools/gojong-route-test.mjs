// gojong-route-test.mjs — 고종 루트(routes_G.py): 문을 끝내 닫은 갈래(G04a1 → 개항장 없음 · 개항장 카드 빠짐 → AG01·AG02)
//   · 갑오개혁 없는 갈래(G07a1 → AG03·AG04) · 실록 도전 실제 경로 잠금(real(G05))
//   SOFTGL=1 node tools/cdp.mjs tools/gojong-route-test.mjs
export const options = { width: 1280, height: 664 };
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const quiet = () => t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; document.querySelector('#warnFirst').classList.add('hide')`);
  const start = async (diff) => {
    await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('gojong','${diff}');})()`);
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

  console.log('1) 문을 끝내 닫은 조선');
  await start('normal');
  await show('G04', { army: 60 });
  const f4 = await J(`__jk.G.run.shownAlt`);
  ok('G04 「조약을 끝내 거부한다」 열림', f4 && f4.opts[0].open, JSON.stringify(f4 && f4.opts));
  await t.eval(`__jk.G.commitAlt('G04a1')`);
  await t.sleep(900);
  await passPending();
  ok('플래그 F_문닫음 · 개항장 없음', await t.eval(`!!__jk.G.run.flagsRun['F_문닫음'] && !__jk.G.run.built.includes('port')`));
  ok('개항장 카드(DG106)가 이 생에서 빠짐', !(await t.eval(`JK.Cond.test(__jk.G.card('DG106').conditions, {run:__jk.G.run, meta:JK.Save.meta})`)));
  await show('G05');
  await commit(1);
  let s = await within('AG01', 4);
  ok('G05 뒤 AG01(머무는 군함)', s[s.length - 1] === 'AG01', s.join(' → '));
  await commit(1);
  await show('G09');
  await commit(1);
  s = await within('AG02', 5);
  ok('G09 뒤 AG02(우리 손으로 만든 기계)', s[s.length - 1] === 'AG02', s.join(' → '));
  await commit(1);
  ok('문을 닫은 생에는 병원·학교·전등·전화 카드가 안 나옴', !(await t.eval(`['GX1','GX2','GX3','GX4'].some((id)=>__jk.G.run.seenRun.includes(id))`)), await t.eval(`JSON.stringify(__jk.G.run.seenRun.filter((x)=>/^GX/.test(x)))`));
  ok('갈래 ① 완성(gojong①)', await t.eval(`(__jk.G.run.branchDone||[]).includes('gojong①')`), await t.eval(`JSON.stringify(__jk.G.run.branchDone)`));

  console.log('2) 갑오개혁 없는 조선');
  await start('normal');
  await show('G07', { nobles: 70 });
  const f7 = await J(`__jk.G.run.shownAlt`);
  ok('G07 「옛 제도를 지킨다」 열림', f7 && f7.opts[0].open, JSON.stringify(f7 && f7.opts));
  await t.eval(`__jk.G.commitAlt('G07a1')`);
  await t.sleep(900);
  await passPending();
  ok('개혁 뒤 카드(DG120)가 이 생에서 빠짐', !(await t.eval(`JK.Cond.test(__jk.G.card('DG120').conditions, {run:__jk.G.run, meta:JK.Save.meta})`)));
  s = await within('AG03', 3);
  ok('G07a1 뒤 AG03(갓을 쓰고 싶은 사람들)', s[s.length - 1] === 'AG03', s.join(' → '));
  await commit(1);
  await show('G10');
  await commit(1);
  s = await within('AG04', 5);
  ok('G10 뒤 AG04(붐비는 과거장)', s[s.length - 1] === 'AG04', s.join(' → '));
  await commit(1);
  ok('갈래 ② 완성(gojong②)', await t.eval(`(__jk.G.run.branchDone||[]).includes('gojong②')`));

  console.log('3) 실록 도전: G07은 G05를 실제대로 해야 열림');
  await start('annals');
  await show('G05', { treasury: 30 });
  await t.eval(`__jk.G.commitAlt('G05a1')`);
  await t.sleep(900);
  await show('G07', { people: 60, nobles: 50 });
  const shut = await t.eval(`JK.Cond.test(__jk.G.card('G07').paths.real.require.annals, {run:__jk.G.run, meta:JK.Save.meta})`);
  ok('G07 실제 경로 잠김(real(G05) 없음)', !shut);
  const f8 = await J(`__jk.G.run.shownAlt`);
  ok('잠기면 다른 길 부채꼴이 뜸', !!f8, JSON.stringify(f8 && f8.opts));
}
