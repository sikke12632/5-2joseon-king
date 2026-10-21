// yeongjo-shots.mjs — 담임 보고용(영조·정조 1~3단계): 붕당 저울 · 붕당 위기 · 화성·배다리 · 새 일상 카드 · 다른 길 · 갈래 엔딩
//   OUT=폴더 SOFTGL=1 node tools/cdp.mjs tools/yeongjo-shots.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const show = async (id, vals, wait) => {
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
      await ready();
    }
    if (vals) await t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,${JSON.stringify(vals)});JK.Cards.setGauges(r.vals,true);})()`);
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide'); __jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}'`, 8000).catch(() => {});
    await t.sleep(wait || 1800);
  };
  const pass = async (dir) => {
    await t.eval(`__jk.G.commit(${dir || 1})`);
    await t.sleep(2600);
  };
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`localStorage.clear(); JK.Save.meta.clears={taejo:1,sejong:1,seonjo:1}; JK.Save.meta.plays=4; JK.Save.saveMeta()`);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('yeongjo','normal'); })()`);
  await t.sleep(3000);
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}`);
  await show('Y01');
  await pass(1);
  await show('DY101', null, 1500);
  await t.shot(`${OUT}/y1-scale.png`);
  await show('Y02');
  await pass(1);
  await show('DY128', null, 1500);
  await t.shot(`${OUT}/y2-daily.png`);
  // 붕당 위기: 저울을 +5로 두고 위기 카드
  await t.eval(`(()=>{const r=__jk.G.run; r.device.scale=5; JK.Crisis.apply(r,true); __jk.G.refreshMetersForTest && __jk.G.refreshMetersForTest();})()`);
  await show('KY10', null, 2000);
  await t.shot(`${OUT}/y3-faction.png`);
  // 위기를 넘기면 실각할 수 있어 새 생으로 다시 시작
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('yeongjo','normal'); JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0};})()`);
  await t.sleep(2500);
  await show('Y08', { treasury: 35 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(1500);
  await t.shot(`${OUT}/y4-alt.png`);
  await t.eval(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
  await t.sleep(600);
  await show('Y08');
  await pass(1);
  await show('Y09');
  await pass(1);
  await t.eval(`__jk.W.camTo({ dist: 20, az: 1.9, el: 0.75, fov: 30 }, 0.1)`);
  await t.sleep(2500);
  await t.shot(`${OUT}/y5-hwaseong.png`);
  await t.eval(`__jk.W.camTo(__jk.W.CAM_PLAY, 0.1)`);
  await show('CY04b', null, 1500);
  await t.shot(`${OUT}/y6-chain.png`);
  // 갈래 엔딩 화면(푸른 실록)
  await t.eval(`(()=>{const b=JK.era.data.branches.find(x=>x.id==='yeongjo②'); document.querySelector('#panel').style.display='none'; JK.UI.showEnding('branch',{diff:'normal',route:__jk.G.routeSummary(),titles:[],branch:b}); if(JK.EvFx) JK.EvFx.branchEnd(b);})()`);
  await t.sleep(2500);
  await t.shot(`${OUT}/y7-branch-end.png`);
}
