// crisis-test.mjs — 게이지 위기 시험(설계서 10-8, v3): 구간별 세계 반응, 0·100에서도 바로 실각 안 함,
// 위기 사건 → 수습(버팀·후속 예약·쿨다운·손상·저장) / 실각(무너진 위기 표시), 위기 장면 예산
//   OUT=폴더 node tools/cdp.mjs tools/crisis-test.mjs
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(5000);
  const setVals = (o) => t.eval(`(()=>{const r=__jk.G.run;for(const k in r.vals) r.vals[k]=50;Object.assign(r.vals,${JSON.stringify(o)});r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r);})()`);

  console.log('1) 구간별 아이콘·세계 반응');
  const cases = [['people', 20], ['people', 8], ['people', 3], ['people', 0], ['nobles', 9], ['treasury', 8], ['army', 9], ['army', 92], ['nobles', 100]];
  for (const [g, v] of cases) {
    await setVals({ [g]: v });
    await t.sleep(1500);
    const st = JSON.parse(await t.eval(`JSON.stringify({zone:__jk.G.run.zones['${g}'].level, cls:document.querySelector('.gauge[data-key="${g}"]').className.replace('gauge ',''), lights:JK.U.uLights.value.toFixed(2), tension:(__jk.W.state.tension||0).toFixed(2), edge:(__jk.W.state.edge||0).toFixed(2)})`));
    console.log(`  ${g} ${v}:`, JSON.stringify(st));
    if (OUT && (v === 0 || v === 8)) await t.shot(`${OUT}/crisis-${g}-${v}.png`);
  }

  console.log('2) 게이지 0이 되어도 바로 실각하지 않는다');
  await setVals({ people: 2 });
  await t.eval(`JK.era.crisis.chance = {warn:0,danger:0,cliff:0,end:0,cap:.95}`); // 이번 시험에서는 위기 굴림을 끈다
  await t.waitFor('JK.Cards.isReady()', 8000);
  // 아무 카드나 백성을 깎는 쪽: 게이지를 0으로 만들고 넘긴다
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=0;JK.Crisis.apply(r,true);})()`);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(2500);
  ok('0에서 넘겨도 실각 화면이 없다', await t.eval(`__jk.G.state==='play' && document.querySelector('#fall').classList.contains('hide')`), `state=${await t.eval('__jk.G.state')}`);

  console.log('3) 위기 사건 → 수습(버팀)');
  await t.waitFor('JK.Cards.isReady()', 8000);
  await setVals({ people: 0 });
  await t.eval(`__jk.G.debugInsert('KT01')`);
  await t.waitFor('JK.Cards.isReady()', 8000);
  await t.sleep(900);
  const ev = JSON.parse(await t.eval(`JSON.stringify({name:document.querySelector('#crisisName').textContent, tag:document.querySelector('#gameTag').style.display, chance:[...document.querySelectorAll('#chance span')].map(e=>e.textContent), quake:document.querySelector('.gauge[data-key="people"]').classList.contains('quake'), alarm:(__jk.W.state.alarm||0).toFixed(2)})`));
  ok('위기 카드: 이름·[게임 속 일]·확률 말(보통)', ev.name && ev.tag === '' && ev.chance.every(Boolean), JSON.stringify(ev));
  if (OUT) await t.shot(`${OUT}/crisis-event.png`);
  await t.eval(`(()=>{JK.Crisis._fc=JK.Crisis.fallChance;JK.Crisis.fallChance=function(){const r=JK.Crisis._fc.apply(null,arguments);r.p=0;return r;};})()`);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(900);
  const held = JSON.parse(await t.eval(`JSON.stringify({show:document.querySelector('#held').classList.contains('show'), line:document.querySelector('#heldLine').textContent, people:__jk.G.run.vals.people, pending:__jk.G.run.pendingFollow, hourglass:document.querySelector('.gauge[data-key="people"] .g-cd').textContent, cooldown:__jk.G.run.cooldown, damaged:__jk.G.run.damaged, held:__jk.G.run.stats.held, log:__jk.G.run.crisisLog.length, title:!!JK.Save.meta.titles['crisis-heldAtEnd'], meta:JK.Save.meta.crisis})`));
  ok('"버팀" 도장', held.show, held.line);
  ok('후속 위기를 걸어 둠(쉬는 장수가 끝날 때 거리 15 이하면 옴)', !!(held.pending['people:low']), JSON.stringify(held.pending));
  ok('같은 위기 쉬는 장수(보통 백성 낮음 5) · ⏳ 표시', held.cooldown['people:low'] >= 4 && /⏳/.test(held.hourglass), JSON.stringify(held.cooldown) + ' ' + held.hourglass);
  ok('수습 뒤 강한 대응 +20', held.people === 20, held.people);
  ok('끝 구간 수습 → 벼랑 끝의 임금', held.title);
  ok('영구 기록(위기 도감)', held.meta.held.KT01 === 1, JSON.stringify(held.meta));
  await t.sleep(1600);
  if (OUT) await t.shot(`${OUT}/crisis-held.png`);
  ok('손상(위험 이하에서 수습)', Object.keys(held.damaged).length === 1, JSON.stringify(held.damaged));
  // 수습 직후 최소 거리 8(10-8-3 ⑤-1)
  const minD = await t.eval(`(()=>{const r=JSON.parse(JSON.stringify(__jk.G.run)); r.vals.people=0; JK.Crisis.afterHeld(r, __jk.G.card('KT01')); const a=r.vals.people; r.vals.army=99; JK.Crisis.afterHeld(r, __jk.G.card('KT08')); return a+','+r.vals.army;})()`);
  ok('수습 직후 최소 거리 8', minD === '8,92', minD);

  console.log('4) 저장·이어하기에 위기 상태가 남는다');
  await t.sleep(1500);
  await fresh();
  await t.eval("document.querySelector('#btnContinue').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  const back = JSON.parse(await t.eval(`JSON.stringify({cooldown:__jk.G.run.cooldown, pending:__jk.G.run.pendingFollow, damaged:__jk.G.run.damaged, hg:document.querySelector('.gauge[data-key="people"] .g-cd').textContent})`));
  ok('이어하기 뒤 쉬는 장수·걸어 둔 후속·손상·⏳', back.cooldown['people:low'] > 0 && back.pending['people:low'] && Object.keys(back.damaged).length === 1 && /⏳/.test(back.hg), JSON.stringify(back));

  console.log('5) 쉬는 동안 같은 위기 안 터짐 / 쉬는 장수가 끝났을 때 거리 15 이하면 후속이 바로');
  await t.eval(`JK.era.crisis.chance = {warn:1,danger:1,cliff:1,end:1,cap:1}`);
  let seen = [];
  for (let i = 0; i < 10; i++) {
    await t.waitFor('JK.Cards.isReady()', 10000);
    const id = await t.eval(`(()=>{const r=__jk.G.run; r.vals.people=Math.min(r.vals.people,12); return r.pending?'(기록)':r.deck[r.pos];})()`);
    seen.push(id);
    if (id === 'KT01b') {
      if (OUT) await t.shot(`${OUT}/crisis-followup.png`);
      seen.push('먹구름=' + (await t.eval(`document.querySelector('.gauge[data-key="people"]').classList.contains('fu')`)));
      break;
    }
    await t.eval(`__jk.G.run.crisisRest=0`);
    // 실제 경로가 잠긴 역사 카드(10-11)면 열린 쪽으로
    await t.eval(`__jk.G.commit(JK.Cards.isLocked(-1) ? (JK.Cards.isLocked(1) ? 2 : 1) : -1)`);
    await t.sleep(1500);
  }
  ok('후속 KT01b가 왔다', seen.includes('KT01b'), seen.join(' → '));
  ok('쉬는 동안 KT01 다시 안 옴', !seen.includes('KT01'));
  ok('후속 위기 카드에 먹구름', seen.includes('먹구름=true'));

  console.log('6) 위기 사건 → 실각(무너진 위기 표시)');
  await t.eval(`(()=>{JK.Crisis._fc=JK.Crisis._fc||JK.Crisis.fallChance;JK.Crisis.fallChance=function(){const r=JK.Crisis._fc.apply(null,arguments);r.p=1;return r;};})()`);
  await t.waitFor('JK.Cards.isReady()', 10000);
  console.log('  지금 카드:', await t.eval(`__jk.G.run.deck[__jk.G.run.pos] + ' ready=' + JK.Cards.isReady()`));
  await t.eval('__jk.G.commit(1)');
  await t.sleep(1500);
  console.log('  넘긴 뒤:', await t.eval(`JSON.stringify({state:__jk.G.state, log:__jk.G.run.crisisLog.slice(-1)})`));
  await t.waitFor(`!document.querySelector('#fall').classList.contains('hide')`, 12000);
  const fl = await t.eval(`document.querySelector('#fallCrisis').textContent + ' / ' + document.querySelector('#fallName').textContent`);
  ok('실각 화면에 무너진 위기', /무너질 확률/.test(fl), fl);
  ok('실각 기록 띠', await t.eval(`JSON.stringify(JK.Save.meta.fallCrisis)`) !== '{}', await t.eval(`JSON.stringify(JK.Save.meta.fallCrisis)`));
  if (OUT) await t.shot(`${OUT}/crisis-fall.png`);
  await t.eval("document.querySelector('#btnRetry').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  ok('다시 도전: 위기 상태·손상 초기화', await t.eval(`(()=>{const r=__jk.G.run;return !r.followups.length && !Object.keys(r.cooldown).length && !Object.keys(r.damaged).length;})()`));

  console.log('7) 점검 상자 실각 보기(미리 보기)');
  await t.eval('__jk.G.debugFall()');
  await t.waitFor(`!document.querySelector('#fall').classList.contains('hide')`, 12000);
  console.log('  ', await t.eval(`document.querySelector('#fallCrisis').textContent + ' / ' + document.querySelector('#fallMsg').textContent`));
  await t.eval("document.querySelector('#btnRetry').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);

  console.log('8) 가장 무거운 위기 장면 예산(모두 짓고 + 위기 사건 장면 + 손상)');
  await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(5000);
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=0;r.vals.army=4;r.zones={};r.eventScene={gauge:'people',side:'low',until:r.pos+1};r.damaged={gyeongbok:'KT04'};__jk.W.setBuildState('gyeongbok','damaged',0);JK.Crisis.apply(r,true);})()`);
  await t.sleep(2500);
  const f = await t.fps(3);
  console.log('  ', JSON.stringify({ fps: f.avgFps.toFixed(0), calls: f.calls, tris: f.tris }));
  if (OUT) await t.shot(`${OUT}/crisis-heavy.png`);
}
