// seonjo-shots.mjs — 담임 보고용(선조·인조 1~3단계): 시작 한양 · 임진왜란(연기·전쟁 계기) · 한산도 배 · 남한산성(눈·식량 눈금)
//   · 새 일상 카드 · 다른 길 부채꼴 · 갈래 엔딩
//   OUT=폴더 SOFTGL=1 node tools/cdp.mjs tools/seonjo-shots.mjs
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
  await t.eval(`localStorage.clear(); JK.Save.meta.clears={taejo:1,sejong:1}; JK.Save.meta.plays=3; JK.Save.saveMeta()`);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('seonjo','normal'); })()`);
  await t.sleep(3000);
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}`);
  await show('DJ104');
  await t.shot(`${OUT}/j1-peace.png`);
  await show('J02');
  await pass(1);
  await show('DJ111', null, 1200);
  await t.shot(`${OUT}/j2-war.png`);
  await show('J03');
  await pass(1);
  await t.sleep(1500);
  await t.shot(`${OUT}/j3-fleet.png`);
  await show('J08', { people: 55, army: 45 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(1500);
  await t.shot(`${OUT}/j4-fan.png`);
  await t.eval(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
  await t.sleep(600);
  await pass(1);
  await show('J09');
  await pass(-1);
  await show('DJ146', null, 2500);
  await t.shot(`${OUT}/j5-siege.png`);
  await show('J10');
  await pass(-1);
  await t.sleep(2500);
  await t.shot(`${OUT}/j6-namhansan.png`);
  // 갈래 엔딩 화면(푸른 실록)
  await t.eval(`(()=>{const b=JK.era.data.branches.find(x=>x.id==='seonjo①'); document.querySelector('#panel').style.display='none'; JK.UI.showEnding('branch',{diff:'normal',route:__jk.G.routeSummary(),titles:[],branch:b}); if(JK.EvFx) JK.EvFx.branchEnd(b);})()`);
  await t.sleep(2500);
  await t.shot(`${OUT}/j7-branch-end.png`);
}
