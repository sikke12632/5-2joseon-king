// grain-test.mjs — 카드의 결 시험(설계서 10-9): 무작위 칸을 그 자리에서 뽑기, 연속 규칙, 게이지 상태 가중치,
// 도박형('?' 미리보기 → 동전 → 운이 따랐다/없었다), 씨앗형(열매 예약·저장)
//   OUT=폴더 node tools/cdp.mjs tools/grain-test.mjs   (시험 카드는 이 스크립트 안에서만 등록한다)
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);

  console.log('1) 무작위 칸은 자리표(*)로 두고 그 자리에서 뽑는다');
  const d0 = JSON.parse(await t.eval(`JSON.stringify({deck:__jk.G.run.deck, pool:__jk.G.run.pool.length})`));
  ok('덱에 자리표', d0.deck.includes('*'), `${d0.deck.join(' ')} · 후보 ${d0.pool}장`);

  console.log('2) 연속 규칙: 시험 카드(선물·수렁·도박)를 후보에 섞고 판을 끝까지 넘긴다');
  const mk = (id, grain, extra) => Object.assign({ id, kind: 'daily', stages: ['taejo'], rarity: 'common', grain, who: { name: '시험', doll: 'farmer' }, line: '시험 카드입니다.', choice_type: 'free', out_of_textbook: false, sources: [], general: true, fx: {},
    choices: { right: { label: '오른쪽', effects: grain === 'mire' ? { treasury: -5 } : { people: 5 }, this_run: '시험 오른쪽' }, left: { label: '왼쪽', effects: grain === 'mire' ? { people: -5 } : grain === 'gift' ? { army: 5 } : { nobles: -5 }, this_run: '시험 왼쪽' } } }, extra || {});
  const tests = [];
  for (let i = 0; i < 4; i++) tests.push(mk('ZG' + i, 'gift'), mk('ZM' + i, 'mire'), mk('ZB' + i, 'gamble', { gamble: { side: 'right', win: { effects: { treasury: 20 }, this_run: '산삼을 캤다!' }, lose: { effects: { people: -10 }, this_run: '빈손으로 돌아왔다.' } } }));
  await t.eval(`(()=>{for(const c of ${JSON.stringify(tests)}) __jk.G.debugAddCard(c); const r=__jk.G.run; r.pool=r.pool.concat(${JSON.stringify(tests.map((c) => c.id))}); JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0};})()`);
  const seq = [];
  for (let i = 0; i < 60; i++) {
    await t.waitFor(`JK.Cards.isReady() || __jk.G.state!=='play'`, 12000);
    if ((await t.eval('__jk.G.state')) !== 'play') break;
    const cur = await t.eval(`(()=>{const r=__jk.G.run;if(r.pending) return '(기록)';const c=__jk.G.card(r.deck[r.pos]);return c.id+':'+(c.grain||'-');})()`);
    seq.push(cur);
    await t.eval(`__jk.G.run.vals = {people:50,nobles:50,treasury:50,army:50}`); // 게이지는 가운데로(상태 가중치 '그 밖')
    await t.eval(`__jk.G.commit(${i % 2 ? 1 : -1})`);
    await t.sleep(400);
  }
  const grains = seq.filter((x) => x !== '(기록)').map((x) => x.split(':')[1]).filter((g) => g !== '-');
  let breaks = 0;
  const maxRun = { balance: 3, complex: 2, gift: 1, mire: 1, seed: 1, gamble: 1 };
  for (let i = 0; i < grains.length; i++) {
    let k = 1;
    while (i - k >= 0 && grains[i - k] === grains[i]) k++;
    if (k > maxRun[grains[i]]) breaks++;
    if (i && grains[i - 1] === 'mire' && grains[i] === 'gamble') breaks++;
  }
  console.log('   ', seq.join(' → '));
  ok('같은 결 연속·수렁→도박 없음(무작위 칸 기준)', breaks === 0, `어긴 곳 ${breaks}`);
  ok('시험 카드가 실제로 뽑혔다', seq.some((x) => /^Z/.test(x)));

  console.log('3) 게이지 상태 가중치(위험 이하 → 선물 ×1.5 · 수렁 ×0.6 · 도박 ×1.2)');
  await t.eval(`(()=>{const r=__jk.G.run; r.vals.people=8; JK.Crisis.apply(r,true);})()`).catch(() => {});
  console.log('   상태:', await t.eval(`JSON.stringify(__jk.G.grainState && __jk.G.grainState())`));

  console.log('4) 도박형: 미리보기 "?", 동전, 결과');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.eval(`(()=>{for(const c of ${JSON.stringify(tests)}) __jk.G.debugAddCard(c);})()`);
  await t.eval(`__jk.G.debugInsert('ZB0')`);
  await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='ZB0'`, 8000);
  const box = JSON.parse(await t.eval(`JSON.stringify(document.querySelector('#card').getBoundingClientRect())`));
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  const mouse = (type, x, y) => t.send('Input.dispatchMouseEvent', { type, x, y, button: 'left', buttons: type === 'mouseReleased' ? 0 : 1, clickCount: 1, pointerType: 'mouse' });
  await mouse('mousePressed', cx, cy);
  for (let dx = 10; dx <= 70; dx += 15) await mouse('mouseMoved', cx + dx, cy);
  await t.sleep(300);
  const pv = await t.eval(`[...document.querySelectorAll('.gauge')].map(e=>e.dataset.key+':'+e.querySelector('.g-dot').textContent+(e.classList.contains('pv-q')?'(q)':'')).join(' ')`);
  ok('도박 쪽 미리보기 "?"', /\?\(q\)/.test(pv), pv);
  if (OUT) await t.shot(`${OUT}/grain-gamble-preview.png`);
  for (let dx = 70; dx >= 0; dx -= 35) await mouse('mouseMoved', cx + dx, cy);
  await mouse('mouseReleased', cx, cy);
  await t.sleep(500);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(700);
  const luck = JSON.parse(await t.eval(`JSON.stringify({cls:document.querySelector('#luck').className, text:document.querySelector('#luckText').textContent, log:__jk.G.run.gambles})`));
  ok('동전과 결과 글', /show/.test(luck.cls) && luck.text, JSON.stringify(luck));
  if (OUT) await t.shot(`${OUT}/grain-gamble-luck.png`);

  console.log('5) 씨앗형: 고르면 몇 장 뒤 열매 카드가 끼어든다(저장에도 남음)');
  await t.waitFor('JK.Cards.isReady()', 10000);
  const seed = mk('ZS0', 'seed', { seed: { fruit_id: 'ZS0f', after_n: 2, side: 'right' } });
  const fruit = mk('ZS0f', 'gift', { line: '그 서당 아이가 과거에 붙었사옵니다!' });
  await t.eval(`(()=>{__jk.G.debugAddCard(${JSON.stringify(seed)});__jk.G.debugAddCard(${JSON.stringify(fruit)});})()`);
  await t.eval(`__jk.G.debugInsert('ZS0')`);
  await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='ZS0'`, 8000);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(1200);
  const rsv = await t.eval(`JSON.stringify(JSON.parse(localStorage.getItem('jk.joseon.run.v1')).reserve)`);
  ok('예약이 저장됨', /ZS0f/.test(rsv), rsv);
  const after = [];
  for (let i = 0; i < 5; i++) {
    await t.waitFor('JK.Cards.isReady()', 10000);
    const id = await t.eval(`__jk.G.run.pending?'(기록)':__jk.G.run.deck[__jk.G.run.pos]`);
    after.push(id);
    if (id === 'ZS0f') break;
    await t.eval('__jk.G.commit(-1)');
    await t.sleep(500);
  }
  ok('열매 카드가 왔다', after.includes('ZS0f'), after.join(' → '));
}
