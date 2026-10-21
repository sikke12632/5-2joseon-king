// more-test.mjs — 태조 추가 카드 시험(add_T.py 통합): 무작위 후보(희귀·사슬 시작), 사슬 다음 카드 예약, 꼭 끼울 카드,
// 변형판(다른 길 뒤 바뀐 사건)·비교 화면, 전설 조건(기록관 권수), 연출(세우기·치우기·공사장), 새 인형
//   OUT=폴더 node tools/cdp.mjs tools/more-test.mjs
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const ready = () => t.waitFor('JK.Cards.isReady()', 12000);
  const reset = (o) => t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:50,nobles:50,treasury:50,army:50},${JSON.stringify(o || {})});r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  const show = async (id) => {
    await ready();
    await reset();
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && !__jk.G.run.pending && __jk.G.run.deck[__jk.G.run.pos]`, 8000);
    await t.sleep(300);
  };
  const cur = () => t.eval(`__jk.G.run.pending ? '(기록)' : __jk.G.run.deck[__jk.G.run.pos]`);
  const next = async (dir) => {
    await ready();
    await reset();
    const d = dir || (await t.eval(`JK.Cards.isLocked(1) ? (JK.Cards.isLocked(-1) ? 2 : -1) : 1`));
    await t.eval(`__jk.G.commit(${d})`);
    await t.sleep(1300);
  };
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  // 화면 확인: 섬 변환이 숫자인지(NaN이면 섬이 사라진다 — 위기 v3에서 한 번 있었던 일)
  await t.sleep(1500);
  ok('섬이 보임(변환 정상)', await t.eval('Number.isFinite(__jk.W.island.rotation.z) && Number.isFinite(__jk.W.island.rotation.x) && Number.isFinite(__jk.W.island.position.y)'));

  console.log('1) 무작위 후보: 일상·희귀·전설·사슬 시작(다음 카드·열매·다른 길·꼭 끼울 카드는 빠짐)');
  const pool = JSON.parse(await t.eval(`JSON.stringify(__jk.G.run.pool)`));
  const kinds = JSON.parse(await t.eval(`JSON.stringify(${JSON.stringify(pool)}.reduce((o,id)=>{const k=__jk.G.card(id).kind;o[k]=(o[k]||0)+1;return o;},{}))`));
  ok('후보 구성', kinds.rare === 13 && kinds.legend === 2 && kinds.chain === 7 && !pool.includes('C01a') && !pool.includes('CT01b') && !pool.includes('DT141f') && !pool.includes('AT01') && !pool.includes('CT01a'), JSON.stringify(kinds));

  console.log('2) 사슬: CT01a → 3장 뒤 CT01b → CT01c, 계룡산 공사터가 섰다가 사라짐');
  await show('CT01a');
  ok('사슬 표시', (await t.eval(`document.querySelector('#chainTag').textContent`)).includes('계룡산'));
  await next(1);
  await t.sleep(1500);
  const r2 = JSON.parse(await t.eval(`JSON.stringify({reserve:__jk.G.run.reserve, built:__jk.G.run.built.includes('gyeryong')})`));
  ok('CT01b 예약 + 공사터', r2.reserve.some((r) => r.card === 'CT01b') && r2.built, JSON.stringify(r2.reserve));
  if (OUT) await t.shot(`${OUT}/more-gyeryong.png`);
  const seq = [];
  for (let i = 0; i < 8; i++) {
    const id = await cur();
    seq.push(id);
    if (id === 'CT01b') break;
    await next();
  }
  ok('3장 뒤 CT01b', seq.includes('CT01b'), seq.join(' → '));
  await next(1);
  await t.sleep(2200);
  ok('CT01b 뒤 공사터 치움', !(await t.eval(`__jk.G.run.built.includes('gyeryong')`)));

  console.log('3) 꼭 끼울 카드: 정몽주가 곁에 남은 판, T03 뒤 → AT02');
  await t.eval(`(()=>{const r=__jk.G.run;r.flagsRun['F_정몽주']=true;if(!r.seenRun.includes('T03'))r.seenRun.push('T03');})()`);
  await next();
  const s3 = [];
  for (let i = 0; i < 10; i++) { // 결 연속 규칙·예약 카드 때문에 한두 장 늦게 올 수 있다
    const id = await cur();
    s3.push(id);
    if (id === 'AT02') break;
    await next();
  }
  ok('AT02가 끼어듦', s3.includes('AT02'), s3.join(' → '));
  ok('정몽주 인형', (await t.eval(`__jk.G.card('AT02').who.doll`)) === 'jeongmongju');
  if (OUT && s3.includes('AT02')) await t.shot(`${OUT}/more-jeongmongju.png`);

  console.log('4) 변형판: 개경에 머문 판 → T05 대신 T05v1, 비교 화면에 "바뀐 사건"');
  await t.eval(`(()=>{const r=__jk.G.run;r.flagsRun['F_개경']=true;r.variants.T05='T05v1';})()`);
  await show('T05');
  ok('T05v1로 바뀜', (await cur()) === 'T05v1');
  await next(-1);
  await t.sleep(2500);
  const r4 = JSON.parse(await t.eval(`JSON.stringify({route:__jk.G.run.route.taejo, built:__jk.G.run.built.includes('altPalace'), entry:__jk.G.compareEntry()})`));
  ok('진엔딩 셈: T05 다름 · 옛 궁궐 장식', r4.route.T05 === 'diff' && r4.built, JSON.stringify(r4.route));
  const line = await t.eval(`(()=>{JK.UI.showCompare(__jk.G.compareEntry(),{view:true});return [...document.querySelectorAll('#cmpRows .c-row')].find(e=>e.textContent.includes('바뀐 사건'))?.textContent||''})()`);
  ok('비교 화면 "바뀐 사건"', /바뀐 사건/.test(line), line.slice(0, 80));
  await t.eval(`document.querySelector('#compare').classList.add('hide')`);

  console.log('5) 전설: 기록관 20권부터(완주·실각 기록 수)');
  const lg = await t.eval(`(()=>{const c=__jk.G.card('LT01');const ctx={run:Object.assign({},__jk.G.run,{seenRun:['T00']}),meta:JK.Save.meta};const a=JK.Cond.test(c.conditions,ctx);JK.Save.meta.clears.taejo=15;JK.Save.meta.falls.people0=5;const b=JK.Cond.test(c.conditions,ctx);return a+','+b+','+__jk.G.archiveCount();})()`);
  ok('19권 아래 안 나옴 / 20권이면 나옴', lg === 'false,true,20', lg);
  await show('LT01');
  ok('전설 금빛 테두리', await t.eval(`document.querySelector('#card').classList.contains('legend')`));
  if (OUT) await t.shot(`${OUT}/more-legend.png`);
  await next(1);
  await t.sleep(2500);
  await next();

  console.log('6) 연출: 공사장(공사철) · 천상열차분야지도 · 문묘 · 새 인형');
  await show('DT111');
  await next(1);
  await t.sleep(2000);
  ok('공사장 섬', await t.eval(`__jk.G.run.built.includes('workyard')`));
  await show('RT01');
  ok('희귀 카드 표시', (await t.eval(`document.querySelector('#chainTag').textContent`)) === '희귀');
  await next(1);
  await t.sleep(2600);
  ok('천상열차분야지도 돌판', await t.eval(`__jk.G.run.built.includes('starStone')`));
  if (OUT) await t.shot(`${OUT}/more-starstone.png`);
  await show('T08');
  await next(1);
  await t.sleep(3000);
  ok('성균관을 세우면 공사장 치움', !(await t.eval(`__jk.G.run.built.includes('workyard')`)));
  for (const id of ['RT07', 'CT08b']) {
    await show(id);
    if (OUT) await t.shot(`${OUT}/more-doll-${id}.png`);
    await next(1);
    await t.sleep(1500);
  }
  const dolls = await t.eval(`['haryun','gwongeun','baegeuk','jojun','jeongmongju','idoran','general','muhak','jurchen','craftsman'].filter(k=>!JK.eraData.roles[k]).join(',')`);
  ok('새 인형 10개 등록', dolls === '', dolls);
}
