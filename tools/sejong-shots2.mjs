// sejong-shots2.mjs — 담임 보고용(세종 2·3단계): 새 일상 카드 · 다른 길 부채꼴 · 새 글자 사슬 · 갈래 엔딩
//   OUT=폴더 SOFTGL=1 node tools/cdp.mjs tools/sejong-shots2.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const show = async (id, vals) => {
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
      await ready();
    }
    if (vals) await t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,${JSON.stringify(vals)});JK.Cards.setGauges(r.vals,true);})()`);
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide'); __jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}'`, 8000).catch(() => {});
    await t.sleep(1800);
  };
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`localStorage.clear(); JK.Save.meta.clears={taejo:1}; JK.Save.meta.plays=2; JK.Save.saveMeta()`);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('sejong','normal'); })()`);
  await t.sleep(2500);
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}`);
  await show('DS125');
  await t.shot(`${OUT}/s8-daily.png`);
  await show('S01', { army: 45 });
  await t.eval(`document.querySelector('#altBtn').click()`);
  await t.sleep(1500);
  await t.shot(`${OUT}/s9-fan.png`);
  await t.eval(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))`);
  await t.sleep(600);
  await show('CS05a');
  await t.shot(`${OUT}/s10-hangul.png`);
  await show('RS07');
  await t.shot(`${OUT}/s11-rare.png`);
  // 갈래 엔딩 화면(푸른 실록)
  await t.eval(`(()=>{const b=JK.era.data.branches.find(x=>x.id==='sejong②'); document.querySelector('#panel').style.display='none'; JK.UI.showEnding('branch',{diff:'normal',route:__jk.G.routeSummary(),titles:[],branch:b}); if(JK.EvFx) JK.EvFx.branchEnd(b);})()`);
  await t.sleep(2500);
  await t.shot(`${OUT}/s12-branch-end.png`);
}
