// true-test.mjs — 실제 역사 경로와 진엔딩 시험(설계서 10-11): 난이도별 실제 경로 잠금(이유·단서·모자란 게이지 깜빡임),
// 잠기면 다른 길이 조건 없이 열림, 진엔딩 셈(보통/판단/생명 사건)·금빛 도장 금 가기, 저장, 비교 화면 N/전체, 엔딩 자리
//   OUT=폴더 node tools/cdp.mjs tools/true-test.mjs
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const ready = () => t.waitFor('JK.Cards.isReady()', 12000);
  const setVals = (o) => t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:50,nobles:50,treasury:50,army:50},${JSON.stringify(o)});r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  const show = async (id, vals) => {
    await ready();
    await setVals(vals);
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`); // 처음 위기 알림창은 닫고
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}' && !__jk.G.run.pending`, 8000);
    await t.sleep(300);
  };
  const passRecord = async () => {
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
    }
  };
  const view = () => t.eval(`JSON.stringify({L:document.querySelector('#chL').textContent, R:document.querySelector('#chR').textContent, altLocked:document.querySelector('#altBtn').classList.contains('locked'), alt:document.querySelector('#altLabel').textContent, need:[...document.querySelectorAll('.gauge.need')].map(e=>e.dataset.key)})`).then(JSON.parse);
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);

  console.log('1) 새싹: T04 천도 국고 10 → 두 버튼 잠김 + "국고 10 더" + 국고 깜빡임, 다른 길 열림');
  await t.eval(`__jk.G.setDifficulty('sprout')`);
  await show('T04', { treasury: 10 });
  let v = await view();
  // 담임 피드백(2026-10-21): 잠긴 조건은 모든 난이도에서 숫자로 ("국고 20 이상 필요 · 지금 10"), 분위기 문장은 그 밑에 작게
  ok('잠김 조건 숫자', /국고 20 이상 필요 · 지금 10/.test(v.L), v.L);
  ok('분위기 문장(작게)', /곳간과 백성의 힘/.test(await t.eval(`document.querySelector('#chance').textContent`)));
  ok('국고 아이콘 깜빡임', v.need.join() === 'treasury', v.need.join());
  ok('다른 길 열림', !v.altLocked, v.alt);
  if (OUT) await t.shot(`${OUT}/true-lock-sprout.png`);

  console.log('2) 보통: 같은 카드 국고 25 → 게이지 이름만 / 국고 40 → 열림');
  await t.eval(`__jk.G.setDifficulty('normal')`);
  await show('T04', { treasury: 25 });
  v = await view();
  ok('보통도 숫자로', /국고 30 이상 필요 · 지금 25/.test(v.L), v.L);
  await show('T04', { treasury: 40 });
  v = await view();
  ok('조건을 채우면 열림', !/🔒/.test(v.L) && !/🔒/.test(v.R), `${v.L} | ${v.R}`);
  await t.eval('__jk.G.commit(-1)');
  await t.sleep(2500);
  await passRecord();
  ok('보통 사건 실제 경로 → 같음', await t.eval(`__jk.G.run.route.taejo.T04==='same'`));

  console.log('3) 성군: T05 경복궁은 앞 사건(T04) 실제대로가 필요 — 다른 왕 판에서 확인');
  await t.eval(`__jk.G.setDifficulty('sage')`);
  await t.eval(`__jk.G.run.choices.T04='alt'`);
  await show('T05', { treasury: 60 });
  v = await view();
  ok('성군: 앞 사건 조건을 글로', /앞에서 「천도」를 실제 역사대로 해야 열림/.test(v.L), v.L);
  ok('실제 경로가 잠기면 다른 길은 조건 없이 열림(국고 60이라 원래 조건은 안 맞음)', !v.altLocked, v.alt);
  await t.eval(`__jk.G.run.choices.T04='left'`);
  await t.eval(`__jk.G.setDifficulty('normal')`);

  console.log('4) 생명 사건(T01) 다른 길은 진엔딩을 막지 않는다');
  await show('T01', { nobles: 70, army: 40 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(2500);
  const r4 = JSON.parse(await t.eval(`JSON.stringify(__jk.G.routeSummary())`));
  ok('T01 다른 길 뒤에도 진엔딩 가능', !r4.broken && (await t.eval(`__jk.G.run.route.taejo.T01`)) === 'life', JSON.stringify(r4));

  console.log('5) 보통 사건(T05) 다른 길 → 도장에 금, "진엔딩은 멀어졌어요"');
  await show('T05', { treasury: 20 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(3400);
  const r5 = JSON.parse(await t.eval(`JSON.stringify({sum:__jk.G.routeSummary(), seal:document.querySelector('#trueSeal').className, toast:document.querySelector('#result').textContent})`));
  ok('진엔딩이 멀어짐 + 도장 금', r5.sum.broken && /broken/.test(r5.seal), JSON.stringify(r5.sum) + ' ' + r5.seal);
  ok('알림 글', /진엔딩은 멀어졌어요/.test(r5.toast), r5.toast);
  if (OUT) await t.shot(`${OUT}/true-broken.png`);

  console.log('6) 저장·이어하기에 진엔딩 셈이 남는다');
  await t.sleep(800);
  await fresh();
  await t.eval("document.querySelector('#btnContinue').click()");
  await ready();
  const back = JSON.parse(await t.eval(`JSON.stringify({route:__jk.G.run.route, sum:__jk.G.routeSummary(), seal:document.querySelector('#trueSeal').className})`));
  ok('이어하기 뒤 셈·도장', back.sum.broken && back.route.taejo.T04 === 'same' && /broken/.test(back.seal), JSON.stringify(back.route));

  console.log('7) 비교 화면: 실제 역사와 같은 사건 N / 지난 사건 + 진엔딩까지 남은 것');
  await t.eval('__jk.G.debugSkip()');
  await t.waitFor(`!document.querySelector('#compare').classList.contains('hide')`, 12000);
  await t.sleep(500);
  const cmp = await t.eval(`document.querySelector('#cmpTrueN').textContent + ' · ' + document.querySelector('#cmpTrueLeft').textContent`);
  ok('N / 전체 + 남은 것', /^\d+ \/ \d+/.test(cmp) && /진엔딩/.test(cmp), cmp);
  ok('생명 사건 표시', await t.eval(`document.querySelector('#cmpRows').textContent.includes('진엔딩 셈에서 빼요')`));
  if (OUT) await t.shot(`${OUT}/true-compare.png`);
  await t.eval(`document.querySelector('#compare').classList.add('hide')`);
  await t.eval(`document.querySelector('#quiz').classList.add('hide')`);

  console.log('8) 엔딩 자리(점검 상자 "진엔딩 보기")');
  await t.eval(`__jk.G.debugEnding('true')`);
  await t.sleep(2600);
  const en = await t.eval(`document.querySelector('#endKind').textContent + ' ' + document.querySelector('#endTitle').textContent + ' / ' + document.querySelector('#endLine').textContent`);
  ok('진엔딩 자리', /진엔딩/.test(en) && /「/.test(en), en);
  if (OUT) await t.shot(`${OUT}/true-ending.png`);
}
