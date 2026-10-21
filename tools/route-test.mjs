// route-test.mjs — 루트 늘리기 시험(설계서 10-14): 다른 길 2~3개 부채꼴 · 계룡산 갈래(변형판·새 장식·역참) · CT01c 문장 · 한양 전용 카드 빠짐
//   · T08v1의 T08a2 · 정몽주 갈래(T09a2) · 갈래 엔딩(푸른 실록)·칭호 · 「두 갈래의 임금」 · 기록
//   디벗 1280×664. OUT=폴더 node tools/cdp.mjs tools/route-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const go = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  };
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const quiet = () => t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; document.querySelector('#warnFirst').classList.add('hide')`);
  const setVals = (o) => t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:50,nobles:50,treasury:50,army:50},${JSON.stringify(o)});r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  const show = async (id, vals) => {
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
      await ready();
    }
    if (vals) await setVals(vals);
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]===(__jk.G.run.variants['${id}']||'${id}') && !__jk.G.run.pending`, 8000).catch(() => {});
    await t.sleep(400);
  };
  const passRecord = async () => {
    await t.sleep(1000);
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
    }
  };
  await go();
  await t.eval('localStorage.clear()');
  await go();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await quiet();

  console.log('1) 다른 길 3개 부채꼴(T04)');
  await t.eval(`(()=>{const r=__jk.G.run; r.choices.CT01a='right'; r.seenRun.push('CT01a','CT02a');})()`);
  await show('T04', { treasury: 32, nobles: 66 });
  const f0 = await J(`{lab:document.querySelector('#altLabel').textContent, why:document.querySelector('#altWhy').textContent, multi:document.querySelector('#altBtn').classList.contains('multi')}`);
  ok('버튼 하나 "갈림길 3개"', f0.multi && /갈림길 3개/.test(f0.lab), f0.lab + ' · ' + f0.why);
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(700);
  const f1 = await J(`[...document.querySelectorAll('#altFan .af-opt')].map(b=>({t:b.textContent, open:b.classList.contains('open')}))`);
  ok('부채꼴 3개 펼침', f1.length === 3, f1.map((x) => (x.open ? '○' : '🔒') + x.t).join(' | '));
  ok('세 길 모두 열림(국고 32·양반 66, CT01a 크게·CT02a 봄)', f1.every((x) => x.open));
  ok('계룡산 길에 "갈래 ③"', /계룡산으로 옮긴다.*갈래 ③/.test(f1[1].t), f1[1].t);
  if (OUT) await t.shot(`${OUT}/route-1-fan.png`);
  await t.eval(`document.querySelector('#altFan .af-close').click()`);
  await t.sleep(300);
  ok('닫기', !(await t.eval(`document.querySelector('#altFan').classList.contains('show')`)));

  console.log('2) 잠긴 길은 회색 🔒 까닭(국고 25 → 계룡산 잠김)');
  await setVals({ treasury: 25, nobles: 66 });
  await t.eval(`__jk.G.debugInsert('T04')`);
  await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='T04'`, 8000);
  await t.sleep(300);
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(600);
  const f2 = await J(`[...document.querySelectorAll('#altFan .af-opt')].map(b=>({t:b.textContent, open:b.classList.contains('open')}))`);
  ok('계룡산 🔒 + 숫자 까닭', !f2[1].open && /국고 30 이상/.test(f2[1].t), f2[1].t);
  await t.eval(`document.querySelectorAll('#altFan .af-opt')[1].click()`);
  await t.sleep(300);
  ok('잠긴 길은 눌러도 안 넘어감', (await t.eval(`__jk.G.run.deck[__jk.G.run.pos]`)) === 'T04');
  if (OUT) await t.shot(`${OUT}/route-2-locked.png`);
  await t.eval(`JK.Cards.fan(false)`);

  console.log('3) 계룡산 갈래: 계룡산으로 옮긴다 → T05v2 → AT07 → T07v2');
  await t.eval('__jk.G.run.deck.splice(__jk.G.run.pos, 1)');
  await show('T04', { treasury: 40, nobles: 50 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(500);
  await t.eval(`document.querySelectorAll('#altFan .af-opt')[1].click()`);
  await t.sleep(2600);
  const r3 = await J(`{flags:__jk.G.run.flagsRun, var:__jk.G.run.variants, built:__jk.G.run.built}`);
  ok('F_계룡 · T05→T05v2 · T07→T07v2', r3.flags.F_계룡 && r3.var.T05 === 'T05v2' && r3.var.T07 === 'T07v2', JSON.stringify(r3.var));
  ok('계룡산 공사장 다시', r3.built.includes('gyeryong'));
  // 한양 전용 일상 카드는 빠짐
  const hy = await t.eval(`JK.Cond.test(__jk.G.card('DT101').conditions, {run:__jk.G.run, meta:JK.Save.meta})`);
  ok('한양 전용 일상 카드(DT101) 안 나옴', hy === false);
  await show('T05');
  ok('T05 대신 T05v2', (await t.eval(`__jk.G.run.deck[__jk.G.run.pos]`)) === 'T05v2', await t.eval(`document.querySelector('#text').textContent`));
  await t.eval('__jk.G.commit(1)');
  await t.sleep(3200);
  ok('계룡산 궁궐(이름 없는 장식) · 억지로', await t.eval(`__jk.G.run.built.includes('gyeryongPalace') && __jk.G.run.states.gyeryongPalace==='forced'`));
  await passRecord();
  await t.eval(`__jk.W.camTo({dist:22, az:0.15, el:0.75},0.1)`);
  await t.sleep(1400);
  if (OUT) await t.shot(`${OUT}/route-3-gyeryong-palace.png`);
  await t.eval(`__jk.W.camTo(__jk.W.CAM_PLAY,0.1)`);
  // AT07: 강제 카드(조건이 맞으면 한 번)
  await show('AT07');
  await t.sleep(1800);
  if (OUT) await t.shot(`${OUT}/route-4-relay.png`);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(3000);
  ok('역참(이름 없는 장식)', await t.eval(`__jk.G.run.built.includes('yeokcham')`));
  await show('T07');
  ok('T07 대신 T07v2', (await t.eval(`__jk.G.run.deck[__jk.G.run.pos]`)) === 'T07v2');
  await t.eval('__jk.G.commit(1)');
  await t.sleep(3200);
  ok('계룡산 산성(이름 없는 장식)', await t.eval(`__jk.G.run.built.includes('gyeryongFort')`));
  await passRecord();
  const bd = await J(`__jk.G.run.branchDone`);
  ok('갈래 ③ 완성 조건 채움', bd.includes('③'), JSON.stringify(bd));
  await t.eval(`__jk.W.camTo({dist:24, az:0.25, el:0.62},0.1)`);
  await t.sleep(1600);
  if (OUT) await t.shot(`${OUT}/route-5-gyeryong-fort.png`);
  await t.eval(`__jk.W.camTo(__jk.W.CAM_PLAY,0.1)`);

  console.log('4) CT01c: 계룡산 갈래에서는 "새 도읍까지 옮긴다" 결과 문장이 바뀜');
  await show('CT01c');
  await t.eval('__jk.G.commit(1)');
  await t.sleep(700);
  // CT01c는 「실제 역사」 두루마리가 있는 카드라 결과 문장은 두루마리의 「이번 판에서」 칸에 뜬다
  const ct = await t.eval(`(__jk.G.run.pending && __jk.G.run.pending.run) || document.querySelector('#result').textContent`);
  ok('바뀐 문장', /계룡산 새 도읍 공사장/.test(ct), ct);
  await passRecord();

  console.log('5) T08v1에 놓인 T08a2(불교와 함께 다스린 판)');
  await t.eval(`__jk.G.run.flagsRun.F_불교=true; __jk.G.run.variants.T08='T08v1'`);
  await show('T08', { people: 50 });
  const t8 = await J(`{id:__jk.G.run.deck[__jk.G.run.pos], lab:document.querySelector('#altLabel').textContent, alts:(__jk.G.run.shownAlt||{}).opts}`);
  ok('T08v1에 "절에서 인재를 기른다" 열림', t8.id === 'T08v1' && t8.alts && t8.alts.some((o) => o.open), JSON.stringify(t8));
  await t.eval('__jk.G.commit(1)');
  await passRecord();

  console.log('6) 정몽주 갈래: 정몽주 플래그면 T09a1 잠김 · T09a2 열림');
  await t.eval(`__jk.G.run.flagsRun.F_정몽주=true; __jk.G.run.altCards=[]`);
  await show('T09', { nobles: 55, army: 55 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(600);
  const f9 = await J(`[...document.querySelectorAll('#altFan .af-opt')].map(b=>({t:b.textContent, open:b.classList.contains('open')}))`);
  ok('형제를 화해시킨다 🔒 · 정몽주에게 맡긴다 열림', !f9[0].open && f9[1].open && /정몽주에게 맡긴다/.test(f9[1].t), f9.map((x) => (x.open ? '○' : '🔒') + x.t.slice(0, 14)).join(' | '));
  if (OUT) await t.shot(`${OUT}/route-6-t09-fan.png`);
  await t.eval(`document.querySelectorAll('#altFan .af-opt')[1].click()`);
  await t.sleep(2600);
  const b6 = await J(`{f:__jk.G.run.flagsRun.F_중재, bd:__jk.G.run.branchDone}`);
  ok('F_중재 · 갈래 ① 완성', b6.f && b6.bd.includes('①'), JSON.stringify(b6));

  console.log('7) 클리어 → 갈래 엔딩(먼저 채운 ③) · 푸른 실록 · 「두 갈래의 임금」');
  await t.eval('__jk.G.debugSkip()');
  await t.waitFor(`!document.querySelector('#compare').classList.contains('hide')`, 15000);
  await t.eval(`document.querySelector('#btnCmpNext').click()`);
  for (let i = 0; i < 3; i++) {
    await t.waitFor(`!document.querySelector('#quiz').classList.contains('hide')`, 8000);
    await t.eval(`(()=>{const q=JK.era.data.quizzes.find(x=>x.question===document.querySelector('#qText').textContent);[...document.querySelectorAll('.q-opt')].find(b=>b.textContent===q.answer).click();})()`);
    await t.sleep(200);
    await t.eval(`document.querySelector('#qNext').click()`);
    await t.sleep(300);
  }
  await t.waitFor(`!document.querySelector('#ending').classList.contains('hide')`, 12000);
  await t.sleep(2600);
  const en = await J(`{kind:document.querySelector('#endKind').textContent, title:document.querySelector('#endTitle').textContent, line:document.querySelector('#endLine').textContent, cls:document.querySelector('#ending').className, titles:Object.keys(JK.Save.meta.titles), endings:JK.Save.meta.endings}`);
  ok('갈래 엔딩 ③ 「남쪽 산 아래 나라」', /갈래 엔딩 · 계룡산 아래 조선/.test(en.kind) && /남쪽 산 아래 나라/.test(en.title), en.kind + ' ' + en.title);
  ok('사관의 말', /계룡산 아래였다/.test(en.line), en.line);
  ok('푸른 실록(기록관)', en.endings && en.endings.branch && en.endings.branch['③'], JSON.stringify(en.endings));
  ok('갈래 칭호 + 「두 갈래의 임금」', en.titles.includes('branch-③') && en.titles.includes('branch-two'), en.titles.join(','));
  if (OUT) await t.shot(`${OUT}/route-7-branch-ending.png`);
  await t.eval(`document.querySelector('#ending [data-close]').click()`);
  await t.waitFor(`!document.querySelector('#soon').classList.contains('hide')`, 8000);
  await t.sleep(500);
  const soon = await t.eval(`document.querySelector('#soonTrue').textContent`);
  ok('끝난 뒤 화면에 갈래 엔딩', /갈래 엔딩/.test(soon), soon);
  if (OUT) await t.shot(`${OUT}/route-8-soon.png`);

  console.log('8) 나의 기록: 갈래 칸 · 서가 푸른 실록');
  await t.eval(`document.querySelector('#btnSoonRecords').click()`);
  await t.sleep(500);
  const rec = await J(`{paths:[...document.querySelectorAll('#recPaths li')].map(l=>l.textContent).join(' / '), shelf:document.querySelector('#recShelf').textContent}`);
  ok('갈래 이야기 칸', /갈래 이야기.*📘 계룡산 아래 조선/.test(rec.paths), rec.paths.slice(-80));
  ok('서가: 푸른 실록', /푸른 실록 · 남쪽 산 아래 나라/.test(rec.shelf), rec.shelf);
}
