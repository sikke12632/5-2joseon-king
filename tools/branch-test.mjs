// branch-test.mjs — 역사 분기 시험(설계서 10-10): 실제 경로 잠김(🔒 이유, 끌어도 안 넘어감), '다른 길' 버튼·위로 끌기,
// 깃발·건물 바뀜·위기 배율·한 왕 3개 한도, 저장·이어하기, 비교 화면 → 퀴즈(틀리면 비교 줄), 기록관
//   OUT=폴더 node tools/cdp.mjs tools/branch-test.mjs
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
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);

  console.log('1) T04 천도, 국고 10: 실제 경로 두 방식 잠김 → 다른 길만');
  await show('T04', { treasury: 10 });
  const v1 = JSON.parse(await t.eval(`JSON.stringify({L:document.querySelector('#chL').textContent, R:document.querySelector('#chR').textContent, alt:document.querySelector('#altBtn').style.display, altLocked:document.querySelector('#altBtn').classList.contains('locked'), label:document.querySelector('#altLabel').textContent})`));
  ok('두 버튼 🔒 + 이유', /🔒/.test(v1.L) && /🔒/.test(v1.R), `${v1.L} | ${v1.R}`);
  ok('다른 길 버튼 열림', v1.alt === '' && !v1.altLocked, v1.label);
  if (OUT) await t.shot(`${OUT}/branch-locked.png`);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(900);
  ok('잠긴 쪽으로는 안 넘어감', await t.eval(`__jk.G.run.deck[__jk.G.run.pos]==='T04' && JK.Cards.isReady()`));
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(1200);
  const a1 = JSON.parse(await t.eval(`JSON.stringify({ch:__jk.G.run.choices.T04, flag:__jk.G.run.flagsRun, built:__jk.G.run.built, result:document.querySelector('#result').textContent, pending:!!__jk.G.run.pending})`));
  ok('다른 길 고름 · 깃발 F_개경', a1.ch === 'alt' && a1.flag['F_개경'], JSON.stringify(a1.flag));
  ok('「실제 역사와 달라졌어요 📜」 표시, 두루마리 없음', /달라졌어요/.test(a1.result) && !a1.pending, a1.result);
  await t.sleep(1500);
  ok('옛 궁궐(이름 없는 장식)이 서고 짐배·기와 마을은 없음', a1.built.includes('altPalace') && !a1.built.includes('giwa'), a1.built.join(','));
  if (OUT) await t.shot(`${OUT}/branch-alt.png`);

  console.log('2) T05 경복궁, 보통 게이지: 다른 길 잠김(이유) · 실제 경로로 지으면 옛 궁궐 자리를 치움');
  // 개경에 머문 판에서는 T05가 변형판 T05v1로 바뀐다(more-test에서 확인). 여기서는 T05 자체를 보려고 변형판을 끈다
  await t.eval(`__jk.G.run.variants = {}`);
  await show('T05', {});
  const v2 = JSON.parse(await t.eval(`JSON.stringify({locked:document.querySelector('#altBtn').classList.contains('locked'), why:document.querySelector('#altWhy').textContent})`));
  ok('다른 길 🔒 + 이유', v2.locked && /🔒/.test(v2.why), v2.why);
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(700);
  ok('잠긴 다른 길은 눌러도 안 넘어감', await t.eval(`__jk.G.run.deck[__jk.G.run.pos]==='T05'`));
  await t.eval('__jk.G.commit(-1)');
  await t.sleep(2500);
  ok('경복궁이 옛 궁궐을 대신함', await t.eval(`__jk.G.run.built.includes('gyeongbok') && !__jk.G.run.built.includes('altPalace')`));
  await passRecord();

  console.log('3) T07 도성, 국방 80: 성 없이 문만 · 국방 낮음 위기 ×1.5');
  await show('T07', { army: 80 });
  // 위로 끌기
  const box = JSON.parse(await t.eval(`JSON.stringify(document.querySelector('#card').getBoundingClientRect())`));
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  const mouse = (type, x, y) => t.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'mouse' });
  await mouse('mousePressed', cx, cy);
  for (let dy = 20; dy <= 200; dy += 30) await mouse('mouseMoved', cx, cy - dy);
  await t.sleep(200);
  const hot = await t.eval(`document.querySelector('#altBtn').classList.contains('hot')`);
  if (OUT) await t.shot(`${OUT}/branch-dragup.png`);
  await mouse('mouseReleased', cx, cy - 200);
  await t.sleep(3500);
  const a3 = JSON.parse(await t.eval(`JSON.stringify({ch:__jk.G.run.choices.T07, built:__jk.G.run.built, mult:__jk.G.run.crisisMult})`));
  ok('위로 끌어 다른 길(끄는 동안 버튼 강조)', hot && a3.ch === 'alt');
  ok('성벽 없이 문 넷', ['heungin', 'donui', 'sungnye', 'sukjeong'].every((k) => a3.built.includes(k)) && !a3.built.includes('wall'), a3.built.join(','));
  ok('국방 낮음 위기 ×1.5', a3.mult['army:low'] === 1.5, JSON.stringify(a3.mult));

  console.log('4) 한 왕 다른 길 3개 한도');
  await show('T02', { people: 70 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(2500);
  await t.eval(`__jk.G.run.variants = {}`); // T02 다른 길 뒤 T08은 변형판 T08v1이 된다 — 여기서는 T08 자체로 한도를 본다
  await show('T08', { people: 70 });
  const v4 = JSON.parse(await t.eval(`JSON.stringify({locked:document.querySelector('#altBtn').classList.contains('locked'), why:document.querySelector('#altWhy').textContent, n:__jk.G.run.altCards.length})`));
  ok('네 번째 다른 길 잠김("이미 나라가 많이 흔들렸다")', v4.locked && /흔들렸다/.test(v4.why), `${v4.n}개 · ${v4.why}`);
  ok('절(이름 없는 장식)', await t.eval(`__jk.G.run.built.includes('altTemple')`));
  await t.eval('__jk.G.commit(1)');
  await t.sleep(2500);
  await passRecord();

  console.log('5) 저장·이어하기');
  await t.sleep(800);
  await fresh();
  await t.eval("document.querySelector('#btnContinue').click()");
  await ready();
  const back = JSON.parse(await t.eval(`JSON.stringify({flags:__jk.G.run.flagsRun, alts:__jk.G.run.altCards, mult:__jk.G.run.crisisMult, built:__jk.G.run.built})`));
  ok('깃발·다른 길·위기 배율·건물이 남음', back.flags['F_개경'] && back.flags['F_성곽'] && back.alts.length === 3 && back.mult['army:low'] === 1.5 && back.built.includes('altTemple'), JSON.stringify(back.alts));

  console.log('6) 왕을 마치면: 비교 화면 → 퀴즈');
  await t.eval('__jk.G.debugSkip()');
  await t.waitFor(`!document.querySelector('#compare').classList.contains('hide')`, 12000);
  await t.sleep(600);
  const cmp = JSON.parse(await t.eval(`JSON.stringify({rows:document.querySelectorAll('#cmpRows .c-row').length, diff:document.querySelectorAll('#cmpRows .c-row.diff').length, sum:document.querySelector('#cmpSum').textContent, merge:document.querySelector('#cmpMerge').textContent.slice(0,120)})`));
  ok('사건 9줄 · 다른 길 3줄', cmp.rows === 9 && cmp.diff === 3, cmp.sum);
  console.log('    합류:', cmp.merge);
  if (OUT) await t.shot(`${OUT}/branch-compare.png`);
  await t.eval(`document.querySelector('#btnCmpNext').click()`);
  await t.waitFor(`!document.querySelector('#quiz').classList.contains('hide')`, 5000);
  // 틀린 답 고르기
  let explained = '';
  for (let i = 0; i < 3; i++) {
    await t.sleep(300);
    await t.eval(`(()=>{const q=JK.era.data.quizzes.find(x=>x.question===document.querySelector('#qText').textContent); const b=[...document.querySelectorAll('.q-opt')].find(b=>!b.disabled && b.textContent!==q.answer); b.click();})()`);
    await t.sleep(300);
    const fb = await t.eval(`document.querySelector('#qFeedback').textContent`);
    if (/나의 역사/.test(fb)) explained = fb;
    if (await t.eval(`!document.querySelector('#qNext').classList.contains('hide')`)) await t.eval(`document.querySelector('#qNext').click()`);
  }
  ok('틀리면 비교 줄(다른 길로 간 사건과 이어진 문항일 때)', !!explained, explained.slice(0, 120));
  if (OUT && explained) await t.shot(`${OUT}/branch-quiz.png`);

  console.log('7) 기록관·갈림길 도감');
  await t.sleep(2500);
  const arc = await t.eval(`JSON.stringify({archive:JK.Save.meta.archive.length, paths:JK.Save.meta.paths, titles:Object.keys(JK.Save.meta.titles)})`);
  ok('기록관 비교 1건 · 갈림길 도장 · 다른 길 칭호', /"archive":1/.test(arc) && /path-flag-F_개경/.test(arc), arc.slice(0, 300));
  await t.eval(`JK.UI.showRecords()`);
  await t.sleep(400);
  const rec = await t.eval(`document.querySelector('#recPaths').textContent.slice(0,160) + ' / ' + document.querySelector('#recArchive').textContent`);
  console.log('   ', rec);
  if (OUT) {
    await t.eval(`document.querySelector('#recPaths').scrollIntoView()`);
    await t.shot(`${OUT}/branch-records.png`);
  }
}
