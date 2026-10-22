// how-test.mjs — 첫 화면 「하는 방법 !」: 네 장 · 연습 카드 두 장(끌기·키) · 막대가 움직임 · 화면 안 · 닫기
//   SOFTGL=1 node tools/cdp.mjs tools/how-test.mjs   (OUT=폴더 를 주면 사진도 남긴다)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const shot = (n) => (OUT ? t.shot(`${OUT}/how-${n}.png`) : null);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  ok('첫 화면에 「하는 방법 !」 단추', await t.eval(`(()=>{const b=document.querySelector('#btnHow'); return !!b && b.textContent.trim()==='하는 방법 !' && b.getBoundingClientRect().width>0})()`));
  await shot('0-title');
  await t.eval(`document.querySelector('#btnHow').click()`);
  await t.sleep(900);
  const st = () => t.eval(`JSON.stringify({head:(document.querySelector('#hwPage .sc-head')||{}).textContent||'', text:document.querySelector('#hwPage').textContent, go:document.querySelector('#hwGo').textContent, wait:document.querySelector('#hwGo').classList.contains('wait'), hidden:document.querySelector('#howTo').classList.contains('hide'), clip:(()=>{const b=document.querySelector('#howTo .m-box').getBoundingClientRect();return b.top<0||b.bottom>innerHeight})(), bar:(document.querySelector('.hw-g[data-k=people] i')||{style:{}}).style.height})`).then(JSON.parse);
  let s = await st();
  ok('1장 「카드를 넘겨요」 · 연습 카드', /카드를 넘겨요/.test(s.head) && /곳간지기/.test(s.text) && s.wait && !s.clip, s.head);
  await shot('1');
  // 연습 1: 끌기(왼쪽 = 백성에게 나눈다 → 백성 60)
  const box = JSON.parse(await t.eval(`JSON.stringify(document.querySelector('#hwCard').getBoundingClientRect())`));
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  await t.eval(`(()=>{const c=document.querySelector('#hwCard'); const ev=(type,x)=>c.dispatchEvent(new PointerEvent(type,{clientX:x,clientY:${cy},pointerId:1,bubbles:true})); ev('pointerdown',${cx}); ev('pointermove',${cx - 60}); ev('pointermove',${cx - 140}); ev('pointerup',${cx - 140});})()`);
  await t.sleep(400);
  s = await st();
  ok('끌어서 고름 → 백성 막대가 오름(60%) · 결과 글', s.bar === '60%' && /백성 \+10/.test(s.text), s.bar);
  await shot('2-picked');
  await t.sleep(700);
  // 연습 2: → 키
  await t.eval(`window.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowRight'}))`);
  await t.sleep(1200);
  s = await st();
  ok('두 장 끝 → 「잘했어요」 · 다음 장 단추 밝아짐', /잘했어요/.test(s.text) && !s.wait && /국방 \+10/.test(s.text), s.go);
  await shot('3-done');
  const heads = [];
  for (let k = 0; k < 3; k++) {
    await t.eval(`document.querySelector('#hwGo').click()`);
    await t.sleep(300);
    s = await st();
    heads.push(s.head);
    ok(`${k + 2}장 화면 안`, !s.clip, s.head);
    await shot(`p${k + 2}`);
  }
  ok('네 장: 막대 · 다른 길 · 왕마다', /네 막대/.test(heads[0]) && /다른 길/.test(heads[1]) && /왕마다/.test(heads[2]) && /알겠어요/.test(s.go), heads.join(' / '));
  await t.eval(`document.querySelector('#hwGo').click()`);
  await t.sleep(300);
  ok('「알겠어요!」로 닫힘 · 게임 기록 그대로', (await st()).hidden && (await t.eval(`!__jk.G.run || !__jk.G.run.used || true`)) && (await t.eval(`JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k=>/meta|jk/i.test(k))||'null')||'{}').cardsPlayed||0`)) === 0);
  // 다시 열면 처음부터 · ✕로 닫힘
  await t.eval(`document.querySelector('#btnHow').click()`);
  await t.sleep(400);
  s = await st();
  ok('다시 열면 1장 연습 카드부터', /카드를 넘겨요/.test(s.head) && /곳간지기/.test(s.text) && s.bar === '50%', s.bar);
  await t.eval(`document.querySelector('#hwClose').click()`);
  await t.sleep(300);
  ok('✕로 닫힘', (await st()).hidden);
}
