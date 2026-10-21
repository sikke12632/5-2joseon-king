// king-test.mjs — 판 = 왕 하나(담임 결정 2026-10-21) 흐름 시험, 디벗 화면 1280×664
//  첫 판(새싹) → 클리어 → 끝난 뒤 화면(별·진엔딩·버튼) → 이어 하기 없음 → 같은 왕 다시 → 난이도 고르기 → 시작 게이지 50
//  → 실각 → 실각 화면 버튼 → 다른 왕 고르기 → 태조 → 난이도 → 판 중간에 새로 고침 → 이어 하기
//   OUT=폴더 node tools/cdp.mjs tools/king-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const BASE = 'http://127.0.0.1:8643/index.html?idle=0';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const go = async () => {
    await t.goto(BASE);
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const vis = (sel) => t.eval(`!document.querySelector('${sel}').classList.contains('hide')`);
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  await go();
  await t.eval('localStorage.clear()');
  await go();

  console.log('1) 생애 첫 판 = 태조 + 새싹 → 클리어');
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  ok('태조·새싹으로 바로 시작', (await t.eval(`__jk.G.run.stage + '/' + __jk.G.run.diff`)) === 'taejo/sprout');
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  await t.eval('__jk.G.debugSkip()');
  await t.waitFor(`!document.querySelector('#compare').classList.contains('hide')`, 12000);
  await t.eval(`document.querySelector('#btnCmpNext').click()`);
  for (let i = 0; i < 3; i++) {
    await t.waitFor(`!document.querySelector('#quiz').classList.contains('hide')`, 6000);
    await t.eval(`(()=>{const q=JK.era.data.quizzes.find(x=>x.question===document.querySelector('#qText').textContent);[...document.querySelectorAll('.q-opt')].find(b=>b.textContent===q.answer).click();})()`);
    await t.sleep(200);
    await t.eval(`document.querySelector('#qNext').click()`);
    await t.sleep(300);
  }
  await t.waitFor(`!document.querySelector('#soon').classList.contains('hide')`, 12000);
  await t.sleep(400);
  const end = JSON.parse(await t.eval(`JSON.stringify({quiz:document.querySelector('#soonQuiz').textContent, tr:document.querySelector('#soonTrue').textContent, btns:[...document.querySelectorAll('#soon .btns button')].map(b=>b.textContent), kings:JK.Save.meta.kings, run:localStorage.getItem('jk.joseon.run.v1')})`));
  ok('끝난 뒤 화면: 같은 왕 다시 · 다른 왕 고르기 · 첫 화면', ['같은 왕 다시', '다른 왕 고르기', '첫 화면'].every((x) => end.btns.includes(x)), end.btns.join(' | '));
  ok('퀴즈 별(3문항 다 맞힘 ⭐⭐⭐)', /⭐⭐⭐/.test(end.quiz), end.quiz);
  ok('그 왕의 진엔딩 기록(새싹)', !!(end.kings.taejo && end.kings.taejo.trueEnd && end.kings.taejo.trueEnd.sprout) && /실제 역사대로 클리어/.test(end.tr), end.tr);
  ok('진행 중 판이 남지 않음', end.run === null, String(end.run).slice(0, 40));
  await t.shot(`${OUT}/king-1-end.png`);

  console.log('2) 같은 왕 다시 → 난이도 고르기(모두 열림) → 시작 게이지 50');
  await t.eval(`document.querySelector('#btnAgain').click()`);
  await t.sleep(400);
  ok('난이도 고르기 화면(태조)', (await vis('#diffPick')) && /태조/.test(await t.eval(`document.querySelector('#dpHead').textContent`)));
  ok('모든 난이도 열림', (await t.eval(`[...document.querySelectorAll('.dp-card')].filter(b=>b.disabled).length`)) === 0);
  await t.eval(`[...document.querySelectorAll('.dp-card')][1].click()`);
  await ready();
  const r2 = JSON.parse(await t.eval(`JSON.stringify({diff:__jk.G.run.diff, vals:__jk.G.run.vals, over:document.body.classList.contains('over')})`));
  ok('보통으로, 게이지 50에서(앞 판을 이어받지 않음)', r2.diff === 'normal' && Object.values(r2.vals).every((v) => v === 50) && !r2.over, JSON.stringify(r2));

  console.log('3) 실각 → 실각 화면 버튼 → 다른 왕 고르기');
  await t.eval(`(()=>{JK.Crisis._fc=JK.Crisis.fallChance;JK.Crisis.fallChance=function(){const r=JK.Crisis._fc.apply(null,arguments);r.p=1;return r;};const r=__jk.G.run;r.vals.people=0;JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  await t.eval(`__jk.G.debugInsert('KT01')`);
  await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='KT01'`, 8000);
  await t.eval('__jk.G.commit(1)');
  await t.waitFor(`!document.querySelector('#fall').classList.contains('hide')`, 15000);
  await t.sleep(400);
  const fb = JSON.parse(await t.eval(`JSON.stringify({btns:[...document.querySelectorAll('#fall .btns button')].map(b=>b.textContent), real:document.querySelector('#fallReal').textContent, run:localStorage.getItem('jk.joseon.run.v1')})`));
  ok('실각 화면: 같은 왕 다시 · 다른 왕 고르기 · 첫 화면', ['같은 왕 다시', '다른 왕 고르기', '첫 화면'].every((x) => fb.btns.includes(x)), fb.btns.join(' | '));
  ok('실각하면 이어 하기에 남지 않음 · "이 왕의 처음부터"', fb.run === null && /이 왕의 처음부터/.test(fb.real));
  await t.shot(`${OUT}/king-2-fall.png`);
  await t.eval(`document.querySelector('#btnFallKings').click()`);
  await t.sleep(400);
  const kp = await t.eval(`[...document.querySelectorAll('.kp-card')].map(b=>b.textContent+(b.disabled?'(잠김)':'')).join(' | ')`);
  ok('왕 고르기: 태조 기록(별·진엔딩) · 세종~고종 준비 중', (await vis('#kingPick')) && /준비 중\(잠김\)/.test(kp) && /⭐/.test(kp), kp.slice(0, 160));
  await t.shot(`${OUT}/king-3-kings.png`);
  await t.eval(`document.querySelector('.kp-card:not(.locked)').click()`);
  await t.sleep(300);
  await t.eval(`[...document.querySelectorAll('.dp-card')][2].click()`);
  await ready();
  ok('성군으로 새 판', (await t.eval(`__jk.G.run.diff + '/' + JSON.stringify(__jk.G.run.vals)`)) === 'sage/{"people":50,"nobles":50,"treasury":50,"army":50}');

  console.log('4) 판 중간에 새로 고침 → 이어 하기');
  for (let i = 0; i < 3; i++) {
    await ready();
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
    await t.eval(`__jk.G.commit(JK.Cards.isLocked(1) ? (JK.Cards.isLocked(-1) ? 2 : -1) : 1)`);
    await t.sleep(900);
  }
  await t.sleep(800);
  const pos = await t.eval('__jk.G.run.pos');
  await go();
  const cont = await t.eval(`document.querySelector('#btnContinue').classList.contains('hide') ? '' : document.querySelector('#btnContinue').textContent`);
  ok('첫 화면에 이어 하기', /이어 하기 · 태조/.test(cont), cont);
  await t.eval(`document.querySelector('#btnContinue').click()`);
  await ready();
  ok('같은 자리에서 이어짐', (await t.eval('__jk.G.run.pos')) === pos && (await t.eval('__jk.G.run.diff')) === 'sage');
  await t.shot(`${OUT}/king-4-continue.png`);
}
