// sejong-shots.mjs — 담임 보고용 세종 화면: 왕 고르기 · 소개 · 첫 카드 · 장치 카드(발명 진행도) · 위기 · 돌발 · 다 지은 한양
//   OUT=폴더 node tools/cdp.mjs tools/sejong-shots.mjs   (그래픽 칩이 멈추면 SOFTGL=1)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  // 태조를 한 번 마친 기록(왕 고르기·난이도가 열린 상태)
  await t.eval(`localStorage.clear(); JK.Save.meta.clears={taejo:1}; JK.Save.meta.plays=2; JK.Save.saveMeta()`);
  await t.goto('http://127.0.0.1:8643/index.html?idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20', 60000);
  await t.eval("document.querySelector('#btnNew').click()");
  await t.sleep(1500);
  await t.shot(`${OUT}/s1-kings.png`);
  await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.UI.leaveTitle(); JK.Game.newRun('sejong','normal');})()`);
  await t.waitFor(`!document.querySelector('#intro').classList.contains('hide')`, 15000);
  await t.sleep(2500);
  await t.shot(`${OUT}/s2-intro.png`);
  await t.eval(`(()=>{for(let k=0;k<5&&!document.querySelector('#intro').classList.contains('hide');k++) document.querySelector('#inGo').click()})()`);
  await t.waitFor('JK.Cards.isReady()', 15000);
  await t.sleep(3000);
  await t.shot(`${OUT}/s3-first.png`);
  // 장치 카드(혼천의)와 발명 진행도 눈금: 진행도 2로 두고 SX1을 끼운다
  await t.eval(`(()=>{const r=__jk.G.run; r.device.invention=2; JK.UI.setDevice(JK.era.stages[1].device, r.device, false, 1); __jk.G.debugInsert('SX1');})()`);
  await t.sleep(3500);
  await t.shot(`${OUT}/s4-device.png`);
  // 위기 카드(여진 무리)
  await t.eval(`__jk.G.debugInsert('KS07')`);
  await t.sleep(3500);
  await t.shot(`${OUT}/s5-crisis.png`);
  // 돌발(별똥별 비)
  await t.eval(`__jk.G.debugInsert('ES09')`);
  await t.sleep(4000);
  await t.shot(`${OUT}/s6-event.png`);
  // 다 지은 세종의 한양(세종 건물만)
  await t.eval(`(()=>{ if (JK.EvFx) JK.EvFx.reset(); __jk.W.setTOD(0.4, true); for(const k of ['jiphyeon','jin','jagyeok','honcheon','angbu','cheugu','kiln']) __jk.W.build(k,{state:'smooth'}); document.querySelector('#panel').style.display='none';})()`);
  await t.sleep(6000);
  await t.eval(`__jk.W.camLook(0.2, -2.6); __jk.W.camTo({ dist: 13, az: 0.35, el: 0.62 }, 0.1)`);
  await t.sleep(2000);
  await t.shot(`${OUT}/s7-hanyang.png`);
}
