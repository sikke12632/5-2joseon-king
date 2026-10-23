// scroll-test.mjs — 사관의 두루마리(data/common/scrolls.js): 세종 석 장 · 예언 카드 「📜 예언대로」 · 📜 다시 보기(✔) · 성군은 수수께끼 · 두루마리 없는 왕은 예전 한 장
//   SOFTGL=1 node tools/cdp.mjs tools/scroll-test.mjs   (OUT=폴더 를 주면 사진도 남긴다)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const shot = (n) => (OUT ? t.shot(`${OUT}/scroll-${n}.png`) : null);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  const page = () => t.eval(`JSON.stringify({head:(document.querySelector('#inPage .sc-head')||{}).textContent||'', text:document.querySelector('#inPage').textContent, go:document.querySelector('#inGo').textContent, dots:document.querySelectorAll('#inDots i').length, start:document.querySelector('#inStart').textContent, clip:(()=>{const b=document.querySelector('#intro .m-box').getBoundingClientRect();return b.top<0||b.bottom>innerHeight})(), hidden:document.querySelector('#intro').classList.contains('hide')})`).then(JSON.parse);
  const start = async (stage, diff) => {
    await t.eval(`JK.UI.leaveTitle(); JK.Game.newRun('${stage}','${diff}')`);
    await t.waitFor(`!document.querySelector('#intro').classList.contains('hide')`, 15000);
    await t.sleep(1000);
  };
  const next = async () => {
    await t.eval(`document.querySelector('#inGo').click()`);
    await t.sleep(500);
  };

  // 세종 · 보통: 석 장
  await start('sejong', 'normal');
  const p1 = await page();
  ok('1장 「지금까지 흘러온 이야기」', /지금까지/.test(p1.head) && /왜구/.test(p1.text) && /한자/.test(p1.text), p1.head);
  ok('점 세 개 · 버튼 「다음 장」', p1.dots === 3 && /다음 장/.test(p1.go) && !p1.start, p1.go);
  ok('1장이 화면 안', !p1.clip);
  await shot('1');
  await next();
  const p2 = await page();
  ok('2장 「앞으로 닥칠 일」 예언 다섯', /앞으로 닥칠 일/.test(p2.head) && (await t.eval(`document.querySelectorAll('#inPage .sc-omen li').length`)) === 5, p2.head);
  ok('2장이 화면 안', !p2.clip);
  await shot('2');
  await next();
  const p3 = await page();
  ok('3장 「사관의 귀띔」(보통은 쉬운 말) · 시작 게이지', /귀띔/.test(p3.head) && /국고를 조금/.test(p3.text) && /백성/.test(p3.start) && /다스리러/.test(p3.go), p3.go);
  ok('3장이 화면 안', !p3.clip);
  await shot('3');
  await t.eval(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowLeft'}))`);
  await t.sleep(400);
  ok('← 키로 앞 장', /앞으로 닥칠 일/.test((await page()).head));
  await t.eval(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight'}))`);
  await t.sleep(400);
  ok('→ 키로 다음 장', /귀띔/.test((await page()).head));
  await t.eval(`document.querySelector('#inBack').click()`);
  await t.sleep(400);
  await next();
  await next();
  ok('마지막 장에서 누르면 닫히고 첫 카드', (await page()).hidden);
  await t.waitFor('JK.Cards.isReady()', 15000);
  ok('📜 단추가 보임', await t.eval(`getComputedStyle(document.querySelector('#btnScroll')).display !== 'none'`));

  // S01(예언 1)까지 넘긴다
  let id = '';
  for (let k = 0; k < 12; k++) {
    await t.waitFor('JK.Cards.isReady()', 15000);
    id = await t.eval(`(__jk.G.run.lastShown||'').split(':')[1]`);
    if (id === 'S01') break;
    await t.eval(`__jk.G.commit(1)`);
    await t.sleep(700);
    if (await t.eval(`!!__jk.G.run.pending`)) { await t.eval(`__jk.G.commit(1)`); await t.sleep(700); }
  }
  await t.sleep(500);
  const tag = await t.eval(`document.querySelector('#chainTag').textContent`);
  ok('S01 카드에 「📜 예언대로 · 왜구의 섬」', id === 'S01' && /예언대로 · 왜구의 섬/.test(tag) && (await t.eval(`document.querySelector('#card').classList.contains('omen')`)), id + ' ' + tag);
  ok('이번 생의 이루어진 예언 기록(o1)', await t.eval(`JSON.stringify(__jk.G.run.omens)==='["o1"]'`));
  await shot('card');
  // 다시 보기: 예언 장부터, ✔ 하나
  await t.eval(`document.querySelector('#btnScroll').click()`);
  await t.sleep(900);
  const r = await page();
  ok('다시 보기: 예언 장부터 · ✔ 1 / 5', /앞으로 닥칠 일/.test(r.head) && (await t.eval(`document.querySelectorAll('#inPage li.hit').length`)) === 1 && /1 \/ 5/.test(r.text), r.head);
  await shot('review');
  await next();
  const r3 = await page();
  ok('다시 보기 끝 장: 「두루마리를 만다」 · 시작 게이지 없음', /두루마리를 만다/.test(r3.go) && !r3.start, r3.go);
  await next();
  ok('닫으면 같은 카드로', (await page()).hidden && (await t.eval(`(__jk.G.run.lastShown||'').split(':')[1]`)) === 'S01' && (await t.eval(`JK.Cards.isReady()`)));

  // 성군: 귀띔은 수수께끼
  await start('sejong', 'sage');
  await next();
  await next();
  const s3 = await page();
  ok('성군: 귀띔이 수수께끼', /벌레가 꾀고/.test(s3.text) && !/국고를 조금/.test(s3.text), s3.text.slice(0, 40));
  await next();

  // 다섯 왕 모두: 석 장이 화면 안 · 예언 수가 데이터와 같음 · 끝 장에 시작 게이지
  for (const [stage, kw] of [['taejo', '고려 말'], ['seonjo', '경국대전'], ['yeongjo', '붕당'], ['gojong', '세도 정치']]) {
    await start(stage, 'normal');
    const a = await page();
    await shot(`${stage}-1`);
    await next();
    const b = await page();
    const n = await t.eval(`document.querySelectorAll('#inPage .sc-omen li').length`);
    const want = await t.eval(`JK.eraData.scrolls.${stage}.omens.list.length`);
    await shot(`${stage}-2`);
    await next();
    const c = await page();
    await shot(`${stage}-3`);
    ok(`${stage}: 석 장(${kw} · 예언 ${want} · 귀띔) · 모두 화면 안`, new RegExp(kw).test(a.text) && n === want && /귀띔/.test(c.head) && /백성/.test(c.start) && !a.clip && !b.clip && !c.clip, [a.clip, b.clip, c.clip].join(','));
    await next();
  }

  // 두루마리 없는 왕(데이터를 잠시 빼고): 예전 한 장
  await t.eval(`window.__scTaejo = JK.eraData.scrolls.taejo; delete JK.eraData.scrolls.taejo`);
  await start('taejo', 'normal');
  const tj = await page();
  ok('두루마리 없는 왕: 한 장 · 「나라를 다스리러 간다」', tj.dots === 0 && /고려 말/.test(tj.text) && /다스리러/.test(tj.go), tj.go);
  await next();
  ok('두루마리 없는 왕: 📜 단추 숨김', await t.eval(`getComputedStyle(document.querySelector('#btnScroll')).display === 'none'`));
  await t.eval(`JK.eraData.scrolls.taejo = window.__scTaejo`);
}
