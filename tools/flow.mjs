// flow.mjs — 한 판 흐름 시험: 새로 시작 → 카드 끌기 → 사관 기록 → (실각/클리어) → 사관 퀴즈 → 준비 중 → 새로 고침 → 이어하기
//   PATTERN=RLRL... (R 오른쪽, L 왼쪽, 모자라면 R 반복)  OUT=캡처 폴더  node tools/cdp.mjs tools/flow.mjs
const BASE = process.env.BASE || 'http://127.0.0.1:8643/index.html';
const PAT = process.env.PATTERN || 'RLRRLRRLRRLRRLR';
const OUT = process.env.OUT || '';
export default async function (t) {
  const mouse = (type, x, y) => t.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1 });
  const ready = "(__jk.G.state !== 'play') || JK.Cards.isReady() && getComputedStyle(document.querySelector('#card')).opacity > 0.9";
  async function swipe(dir) {
    const r = await t.eval("(()=>{const b=document.querySelector('#card').getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height*0.6}})()");
    await mouse('mousePressed', r.x, r.y);
    for (let k = 1; k <= 10; k++) { await mouse('mouseMoved', r.x + dir * k * 16, r.y + k); await t.sleep(20); }
    await mouse('mouseReleased', r.x + dir * 160, r.y + 10);
  }
  await t.goto(BASE + '?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval('localStorage.clear()');
  await t.goto(BASE + '?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(2500);
  console.log('덱', await t.eval("__jk.G.run.deck.join(' ')"));
  let i = 0, shots = 0;
  for (let n = 0; n < 60; n++) {
    await t.waitFor(ready + " || !document.querySelector('#quiz').classList.contains('hide') || !document.querySelector('#compare').classList.contains('hide')", 15000);
    const st = await t.eval("__jk.G.state");
    if (st !== 'play') break;
    const info = await t.eval("(()=>{const r=__jk.G.run;return (r.pending?'[기록]':r.deck[r.pos])+' '+JSON.stringify(r.vals)})()");
    if (n === 3 && OUT) await t.shot(OUT + '/p0-1-카드.png');
    const dir = (PAT[i++] || 'R') === 'R' ? 1 : -1;
    await swipe(dir);
    console.log(n, dir > 0 ? 'R' : 'L', info);
    await t.sleep(400);
    // 중간에 새로 고침해서 이어하기 시험 (한 번)
    if (n === 5) {
      const before = await t.eval("JSON.stringify({pos:__jk.G.run.pos, vals:__jk.G.run.vals, built:__jk.G.run.built})");
      await t.sleep(2500);
      await t.goto(BASE + '?idle=0');
      await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
      console.log('이어하기 버튼:', await t.eval("document.querySelector('#btnContinue').textContent"));
      await t.eval("document.querySelector('#btnContinue').click()");
      await t.sleep(1500);
      const after = await t.eval("JSON.stringify({pos:__jk.G.run.pos, vals:__jk.G.run.vals, built:__jk.G.run.built})");
      console.log('새로 고침 전', before, '\n이어 한 뒤', after);
    }
  }
  const st = await t.eval('__jk.G.state');
  console.log('상태', st);
  if (st === 'fall') {
    await t.waitFor("!document.querySelector('#fall').classList.contains('hide')", 9000);
    console.log('실각 글:', await t.eval("document.querySelector('#fallName').textContent+' / '+document.querySelector('#fallReal').textContent"));
    if (OUT) await t.shot(OUT + '/p0-4-실각.png');
    await t.eval("document.querySelector('#btnRetry').click()");
    await t.sleep(2500);
    console.log('다시 도전 뒤:', await t.eval("__jk.G.state+' pos '+__jk.G.run.pos+' vals '+JSON.stringify(__jk.G.run.vals)+' built '+__jk.G.run.built.join(',')+' ink '+__jk.W.state.ink+' 실각기록 '+JSON.stringify(__jk.S.meta.falls)"));
    return;
  }
  // 왕을 마치면 먼저 "나의 역사 vs 실제 역사" 비교 화면(10-10-5) → 사관 퀴즈
  await t.waitFor("!document.querySelector('#compare').classList.contains('hide')", 9000);
  console.log('비교 화면:', await t.eval("document.querySelector('#cmpTrueN').textContent+' · '+document.querySelector('#cmpSum').textContent.slice(0,40)"));
  if (OUT) await t.shot(OUT + '/p0-5-비교.png');
  await t.eval("document.querySelector('#btnCmpNext').click()");
  // 사관 퀴즈: 첫 문항은 정답, 둘째는 오답, 셋째 정답
  for (let q = 0; q < 3; q++) {
    await t.waitFor("!document.querySelector('#quiz').classList.contains('hide')", 9000);
    const pick = await t.eval(`(()=>{const q=JK.era.data.quizzes.find(x=>x.question===document.querySelector('#qText').textContent);const bs=[...document.querySelectorAll('.q-opt')];
      const b = ${q === 1} ? bs.find(b=>b.textContent!==q.answer) : bs.find(b=>b.textContent===q.answer); b.click(); return document.querySelector('#qText').textContent+' → '+b.textContent;})()`);
    await t.sleep(500);
    console.log('퀴즈', pick, '|', await t.eval("document.querySelector('#qFeedback').textContent"));
    if (q === 1 && OUT) await t.shot(OUT + '/p0-2-사관퀴즈.png');
    await t.eval("document.querySelector('#qNext').click()");
  }
  await t.waitFor("!document.querySelector('#soon').classList.contains('hide')", 9000);
  await t.sleep(2500);
  if (OUT) await t.shot(OUT + '/p0-3-준비중.png');
  console.log('준비 중:', await t.eval("[...document.querySelectorAll('#soon .m-box > *')].map(e=>e.textContent).filter(Boolean).join(' | ')"));
  console.log('영구 기록', await t.eval("JSON.stringify({seen:Object.keys(__jk.S.meta.seen).length, clears:__jk.S.meta.clears, titles:Object.keys(__jk.S.meta.titles), quiz:__jk.S.meta.quiz, plays:__jk.S.meta.plays})"));
  // 기록 코드: 내보내기 → 지우기 → 불러오기
  const code = await t.eval('__jk.S.exportCode()');
  console.log('기록 코드 길이', code.length, code.slice(0, 24) + '…');
  await t.eval('__jk.S.clearAll()');
  console.log('지운 뒤 seen', await t.eval('Object.keys(__jk.S.meta.seen).length'));
  console.log('불러오기', await t.eval(`__jk.S.importCode(${JSON.stringify(code)}).then(r=>r.msg)`), await t.eval('Object.keys(__jk.S.meta.seen).length'));
  const bad = code.slice(0, 12) + (code[12] === 'A' ? 'B' : 'A') + code.slice(13);
  console.log('글자 하나 틀린 코드', await t.eval(`__jk.S.importCode(${JSON.stringify(bad)}).then(r=>r.msg)`));
  await t.goto(BASE + '?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  console.log('다시 연 뒤 이어하기:', await t.eval("document.querySelector('#btnContinue').textContent"));
}
