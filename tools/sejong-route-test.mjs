// sejong-route-test.mjs — 세종 루트(routes_S.py): 다른 길 부채꼴 · 쓰시마 갈래(AS01·AS02 → 갈래 완성) · 장영실을 돌려보낸 생의 S08v1
//   · 장영실 갈래(S08a1 → AS03) · 실록 도전의 실제 경로 잠금(real(S01)) · 비교 화면 사건 이름
//   SOFTGL=1 node tools/cdp.mjs tools/sejong-route-test.mjs
export const options = { width: 1280, height: 664 };
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const quiet = () => t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; document.querySelector('#warnFirst').classList.add('hide')`);
  const start = async (diff) => {
    await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('sejong','${diff}');})()`);
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
  // id 카드를 지금 자리에 띄운다(변형판이 있으면 그것으로)
  const show = async (id, vals) => {
    await passPending();
    if (vals) await setVals(vals);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && !__jk.G.run.pending && __jk.G.run.deck[__jk.G.run.pos]===(__jk.G.run.variants['${id}']||'${id}')`, 8000).catch(() => {});
    await t.sleep(300);
  };
  const cur = () => t.eval('__jk.G.run.deck[__jk.G.run.pos]');
  // 지금 카드를 넘기고(dir), 다음 카드 id를 돌려준다
  const commit = async (dir) => {
    await t.eval(`__jk.G.commit(${dir})`);
    await t.sleep(900);
    await passPending();
    return cur();
  };
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,60),...a);})()`);

  console.log('1) 다른 길 부채꼴 · 쓰시마 갈래');
  await start('normal');
  await show('S01', { army: 45 });
  const fan = await J(`__jk.G.run.shownAlt`);
  ok('S01 다른 길 둘, 「정벌하지 않는다」 열림', fan && fan.opts.length === 2 && fan.opts[0].open, JSON.stringify(fan && fan.opts));
  await t.eval(`__jk.G.commitAlt('S01a1')`);
  await t.sleep(900);
  await passPending();
  ok('플래그 F_쓰시마', await t.eval(`!!__jk.G.run.flagsRun['F_쓰시마']`));
  await show('S02');
  // 꼭 나와야 하는 카드가 둘 겹치면(C02a 장영실의 길) 차례로 나온다 — 3장 안에 AS01
  let nx = await commit(1);
  const seenAS = [nx];
  for (let i = 0; i < 2 && nx !== 'AS01'; i++) seenAS.push((nx = await commit(1)));
  ok('S02 뒤 3장 안에 AS01(다시 나타난 왜구 배)', nx === 'AS01', seenAS.join(' → '));
  await commit(1);
  await show('S05');
  nx = await commit(1);
  ok('S05 뒤 AS02(쓰시마의 사신)', nx === 'AS02', nx);
  await commit(1);
  ok('갈래 ① 완성(sejong①)', await t.eval(`(__jk.G.run.branchDone||[]).includes('sejong①')`), await t.eval(`JSON.stringify(__jk.G.run.branchDone)`));
  const cmp = await J(`(()=>{const e=__jk.G.compareEntry(); return {ch:e.ch, tr:e.tr};})()`);
  ok('비교 화면: S01은 다른 길, 진엔딩 셈이 깨짐', cmp.ch.S01 === 'alt' && cmp.tr.broken, JSON.stringify(cmp.tr));

  console.log('2) 장영실을 돌려보낸 생 → S08 대신 S08v1');
  await start('normal');
  await show('S06', { nobles: 65 });
  const f6 = await J(`__jk.G.run.shownAlt`);
  ok('S06 「장영실을 돌려보낸다」 열림', f6 && f6.opts[0].open, JSON.stringify(f6 && f6.opts));
  await t.eval(`__jk.G.commitAlt('S06a1')`);
  await t.sleep(900);
  await passPending();
  ok('자격루가 서지 않음', !(await t.eval(`__jk.G.run.built.includes('jagyeok')`)));
  await show('S08');
  ok('S08 자리에 S08v1', (await cur()) === 'S08v1', await cur());
  ok('S08v1에는 다른 길이 없음(변형판)', await t.eval(`!__jk.G.card('S08v1').paths`));

  console.log('3) 장영실 갈래');
  await start('normal');
  await show('S08', { people: 60 });
  const f8 = await J(`__jk.G.run.shownAlt`);
  ok('S08 「장영실을 끝까지 감싼다」 열림', f8 && f8.opts[0].open, JSON.stringify(f8 && f8.opts));
  await t.eval(`__jk.G.commitAlt('S08a1')`);
  await t.sleep(900);
  await passPending();
  nx = await cur();
  if (nx !== 'AS03') nx = await commit(1);
  ok('S08a1 뒤 AS03(장영실의 새 기구)', nx === 'AS03', nx);
  await commit(1);
  ok('갈래 ② 완성(sejong②)', await t.eval(`(__jk.G.run.branchDone||[]).includes('sejong②')`));

  console.log('4) 실록 도전: 앞 사건을 실제대로 해야 열림');
  await start('annals');
  await show('S01', { army: 45 });
  await t.eval(`__jk.G.commitAlt('S01a1')`);
  await t.sleep(900);
  await show('S02', { people: 60, treasury: 60 });
  const lock = await J(`(()=>{const v=document.querySelector('#chR'); return {cls:v.className, txt:document.querySelector('#hint').textContent};})()`);
  const shut = await t.eval(`JK.Cond.test(__jk.G.card('S02').paths.real.require.annals, {run:__jk.G.run, meta:JK.Save.meta})`);
  ok('S02 실제 경로 잠김(real(S01) 없음)', !shut, lock.txt.slice(0, 60));
  const f2 = await J(`__jk.G.run.shownAlt`);
  ok('잠기면 다른 길이 열림', f2 && f2.open, JSON.stringify(f2 && f2.opts));
}
