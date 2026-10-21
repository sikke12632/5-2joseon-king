// diff-test.mjs — 난이도 흐름(담임 결정 2026-10-21) 시험, 디벗 화면 1280×664
//  ① 생애 첫 판(저장 비움): 고르기 없이 새싹 + 안내 한 줄 ② 두 번째 판: 고르기 화면(새싹만 열림, 나머지 🔒)
//  ③ 왕 하나 클리어: "모든 난이도가 열렸어요!" → 다음 판 고르기 화면에서 모두 열림 ④ ?debug=1 은 모두 열림
//   OUT=폴더 node tools/cdp.mjs tools/diff-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const BASE = 'http://127.0.0.1:8643/index.html?idle=0';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const go = async (q) => {
    await t.goto(BASE + (q || ''));
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const pickState = () => t.eval(`JSON.stringify({open:!document.querySelector('#diffPick').classList.contains('hide'), cards:[...document.querySelectorAll('.dp-card')].map(b=>b.textContent+(b.disabled?'(잠김)':''))})`).then(JSON.parse);
  await go();
  await t.eval('localStorage.clear()');
  await go();

  console.log('① 생애 첫 판');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(400);
  ok('고르기 화면 없이 바로 시작', !(await pickState()).open);
  await (async () => { await t.waitFor(`JK.Cards.isReady() || !document.querySelector('#intro').classList.contains('hide')`, 15000); if (await t.eval(`!document.querySelector('#intro').classList.contains('hide')`)) { await t.eval(`document.querySelector('#inGo').click()`); await t.waitFor('JK.Cards.isReady()', 15000); } })();
  await t.sleep(1400);
  const r1 = JSON.parse(await t.eval(`JSON.stringify({diff:__jk.G.run.diff, toast:document.querySelector('#result').textContent})`));
  ok('새싹 + 안내', r1.diff === 'sprout' && /첫 생은 🌱 새싹/.test(r1.toast), JSON.stringify(r1));
  await t.shot(`${OUT}/diff-1-first.png`);

  console.log('② 두 번째 판(아직 클리어 없음)');
  await go();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(400);
  ok('왕 고르기 화면(태조만 열림, 나머지 준비 중)', await t.eval(`!document.querySelector('#kingPick').classList.contains('hide') && [...document.querySelectorAll('.kp-card')].filter(b=>b.disabled && /준비 중/.test(b.textContent)).length===4`));
  await t.shot(`${OUT}/diff-2a-kings.png`);
  await t.eval(`document.querySelector('.kp-card:not(.locked)').click()`);
  await t.sleep(400);
  const p2 = await pickState();
  ok('고르기 화면', p2.open, p2.cards.join(' | '));
  ok('새싹만 열림, 나머지 🔒 "왕 하나를 클리어하면 열려요"', p2.cards.filter((c) => c.includes('(잠김)') && c.includes('왕 하나를 클리어하면 열려요')).length === 3);
  ok('고르기 화면 글자 안 잘림', (await t.eval(`(()=>{const out=[];for(const e of document.querySelectorAll('#diffPick .m-box, .dp-card')){const r=e.getBoundingClientRect();if(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2||r.bottom>innerHeight+1||r.top<-1)out.push(e.className);}return out.join(',');})()`)) === '');
  await t.shot(`${OUT}/diff-2-pick-locked.png`);
  await t.eval(`document.querySelector('.dp-card:not(.locked)').click()`);
  await (async () => { await t.waitFor(`JK.Cards.isReady() || !document.querySelector('#intro').classList.contains('hide')`, 15000); if (await t.eval(`!document.querySelector('#intro').classList.contains('hide')`)) { await t.eval(`document.querySelector('#inGo').click()`); await t.waitFor('JK.Cards.isReady()', 15000); } })();
  ok('고르면 바로 시작(새싹)', (await t.eval('__jk.G.run.diff')) === 'sprout');

  console.log('③ 왕 하나 클리어 → 모두 열림');
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  await t.eval('__jk.G.debugSkip()');
  await t.waitFor(`!document.querySelector('#compare').classList.contains('hide')`, 12000);
  await t.eval(`document.querySelector('#btnCmpNext').click()`);
  for (let i = 0; i < 3; i++) {
    await t.waitFor(`!document.querySelector('#quiz').classList.contains('hide')`, 6000);
    await t.eval(`document.querySelector('.q-opt').click()`);
    await t.sleep(200);
    await t.eval(`document.querySelector('#qNext').click()`);
    await t.sleep(300);
  }
  await t.waitFor(`!document.querySelector('#soon').classList.contains('hide')`, 12000);
  const soon = await t.eval(`document.querySelector('#soonTitles').textContent + ' / ' + document.querySelector('#soonQuiz').textContent`);
  ok('"모든 난이도가 열렸어요!" 알림', /모든 난이도가 열렸어요/.test(soon), soon);
  await t.shot(`${OUT}/diff-3-unlocked.png`);
  await go();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(400);
  await t.eval(`document.querySelector('.kp-card:not(.locked)').click()`);
  await t.sleep(400);
  const p3 = await pickState();
  ok('다음 판: 네 난이도 모두 열림', p3.open && p3.cards.length === 4 && !p3.cards.some((c) => c.includes('(잠김)')), p3.cards.join(' | '));
  await t.shot(`${OUT}/diff-4-pick-open.png`);
  await t.eval(`[...document.querySelectorAll('.dp-card')][2].click()`);
  await (async () => { await t.waitFor(`JK.Cards.isReady() || !document.querySelector('#intro').classList.contains('hide')`, 15000); if (await t.eval(`!document.querySelector('#intro').classList.contains('hide')`)) { await t.eval(`document.querySelector('#inGo').click()`); await t.waitFor('JK.Cards.isReady()', 15000); } })();
  ok('성군으로 시작', (await t.eval('__jk.G.run.diff')) === 'sage');
  ok('설정의 난이도 칸도 모두 열림', (await t.eval(`[...document.querySelectorAll('#optDiff option')].filter(o=>o.disabled).length`)) === 0);

  console.log('④ ?debug=1 은 처음부터 모두 열림');
  await t.eval('localStorage.clear()');
  await go('&debug=1');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(400);
  await t.eval(`document.querySelector('.kp-card:not(.locked)').click()`);
  await t.sleep(400);
  const p4 = await pickState();
  ok('점검 모드: 고르기 화면, 모두 열림', p4.open && !p4.cards.some((c) => c.includes('(잠김)')), p4.cards.join(' | '));
}
