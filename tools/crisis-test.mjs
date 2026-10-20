// crisis-test.mjs — 게이지 위기 시험: 구간별 세계 반응을 찍고, 시험용 위기 카드를 넣어 끼워 넣기·손상을 확인한다
//   OUT=폴더 node tools/cdp.mjs tools/crisis-test.mjs   (시험 카드는 이 스크립트 안에서만 쓰고 데이터에는 넣지 않는다)
const OUT = process.env.OUT || '';
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(2500);
  await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(6000);
  const cases = [
    ['people', 8], ['people', 20], ['nobles', 9], ['treasury', 8], ['army', 9], ['people', 93], ['nobles', 90], ['army', 92],
  ];
  for (const [g, v] of cases) {
    await t.eval(`(()=>{const r=__jk.G.run;for(const k in r.vals) r.vals[k]=50;r.vals['${g}']=${v};r.zones={};JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r);})()`);
    await t.sleep(2200);
    const st = await t.eval(`JSON.stringify({alert:document.querySelector('#zoneAlert').textContent, cls:document.querySelector('.gauge[data-key="${g}"]').className, lights:JK.U.uLights.value.toFixed(2), tension:(__jk.W.state.tension||0).toFixed(2)})`);
    console.log(g, v, st);
    if (OUT) await t.shot(`${OUT}/crisis-${g}-${v}.png`);
  }
  // 시험용 위기 카드(데이터에는 없음): 백성 낮음 위험 → 사건 카드가 다음 자리에 끼는지
  await t.eval(`(()=>{const D=JK.era.data;const mk=(id,level)=>({id,kind:'crisis',stages:['taejo'],gauge:'people',side:'low',level,who:{name:'시험',doll:'farmer'},line:'시험 카드입니다.',choice_type:'free',choices:{right:{label:'시험 오른쪽',effects:{people:5}},left:{label:'시험 왼쪽',effects:{treasury:-5}}},damage:{target:'random'},out_of_textbook:false,sources:[]});
    D.cards.push(mk('ZZ1','event'),mk('ZZ2','warn'));__jk.G.card;JK.era.crisis.chance={warn:1,danger:1};})()`);
  await t.eval(`(()=>{const r=__jk.G.run;for(const k in r.vals) r.vals[k]=50;r.vals.people=10;r.crisisRest=0;JK.Crisis.apply(r);})()`);
  // cardsById 갱신을 위해 G.card로 못 찾으면 다시 등록
  await t.eval(`(()=>{const id='ZZ1';if(!__jk.G.card(id)){ /* 엔진 색인에 넣기 */ }})()`);
  const picked = await t.eval(`JK.Crisis.pick(__jk.G.run, JK.rng(5))`);
  console.log('위기 카드 고름:', picked);
  const c = await t.eval(`JSON.stringify(JK.era.data.cards.find(x=>x.id==='${picked}'))`);
  await t.eval(`JK.Crisis.event(__jk.G.run, ${c})`);
  await t.sleep(3000);
  console.log('손상:', await t.eval('JSON.stringify(__jk.G.run.damaged)'), 'alarm', await t.eval('(__jk.W.state.alarm||0).toFixed(2)'));
  if (OUT) await t.shot(`${OUT}/crisis-event.png`);
  // 가장 무거운 위기 장면(모두 짓고 + 위기 + 손상)에서 예산
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=8;r.vals.army=9;r.zones={};JK.Crisis.apply(r,true);})()`);
  await t.sleep(2000);
  const f = await t.fps(3);
  console.log('위기 장면 예산:', JSON.stringify({ fps: f.avgFps.toFixed(0), calls: f.calls, tris: f.tris }));
}
