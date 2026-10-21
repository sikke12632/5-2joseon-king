// fb-shots.mjs — 담임 피드백 3건 눈으로 확인(디벗 화면 1280×664): ① 고른 뒤 큰 숫자 ② 처음 위기 알림창 ③ 잠긴 선택지 조건 숫자
//   OUT=폴더 node tools/cdp.mjs tools/fb-shots.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const fresh = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const ready = () => t.waitFor('JK.Cards.isReady()', 12000);
  // 글자가 상자 밖으로 잘리는지: 요소의 스크롤 크기 > 보이는 크기 이거나, 화면 밖으로 나가면 잘림
  const clipped = (sel) => t.eval(`(()=>{const out=[];for(const e of document.querySelectorAll('${sel}')){if(!e.offsetParent&&getComputedStyle(e).position!=='fixed')continue;const r=e.getBoundingClientRect();if(r.width===0)continue;if(e.scrollWidth>e.clientWidth+2||r.right>innerWidth+1||r.left<-1||r.bottom>innerHeight+1)out.push(e.id||e.className);}return out.join(',');})()`);
  await fresh();
  await t.eval('localStorage.clear()');
  await fresh();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  await t.sleep(2500);

  console.log('1) 고른 뒤 큰 숫자(보통 난이도 — 미리보기는 점만)');
  await t.eval(`__jk.G.debugInsert('T04')`);
  await ready();
  await t.sleep(500);
  await t.eval('__jk.G.commit(1)');
  await t.sleep(500);
  const nums = await t.eval(`[...document.querySelectorAll('.g-num')].map(e=>e.parentElement.dataset.key+e.textContent).join(' ')`);
  ok('게이지마다 숫자', /[+−]\d+/.test(nums), nums);
  await t.shot(`${OUT}/fb-1-numbers.png`);
  await t.sleep(2500);

  console.log('2) 처음 위기 알림창(게이지별 처음 한 번)');
  await ready();
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=22;JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r);})()`);
  await t.sleep(600);
  const wf = await t.eval(`document.querySelector('#warnFirst').classList.contains('hide') ? '' : document.querySelector('#wfText').textContent + ' / ' + document.querySelector('#wfSub').textContent`);
  ok('알림창', !!wf, wf);
  ok('알림창 글자 안 잘림', (await clipped('#warnFirst .m-box, #wfText, #wfSub')) === '');
  await t.shot(`${OUT}/fb-2-warn.png`);
  await t.eval(`document.querySelector('#wfOk').click()`);
  await t.sleep(300);
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=50;JK.Crisis.apply(r);r.vals.people=20;JK.Crisis.apply(r);})()`);
  await t.sleep(300);
  ok('같은 게이지 두 번째는 안 뜸', await t.eval(`document.querySelector('#warnFirst').classList.contains('hide')`));
  await t.eval(`(()=>{const r=__jk.G.run;r.vals.people=50;r.vals.nobles=50;JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);

  console.log('3) 잠긴 선택지 조건 숫자');
  await ready();
  await t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:50,nobles:22,treasury:50,army:50});JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  await t.eval(`__jk.G.debugInsert('T02')`);
  await ready();
  await t.sleep(600);
  const lk = await t.eval(`document.querySelector('#chance').innerText.replace(/\\n/g,' | ') + ' // 다른 길: ' + document.querySelector('#altWhy').innerText.replace(/\\n/g,' | ')`);
  ok('실제 경로 조건(양반 35 이상 · 지금 22)', /양반 35 이상 필요 · 지금 22/.test(lk), lk);
  ok('잠김 글자 안 잘림', (await clipped('#chance span, #altBtn, #altWhy')) === '', await clipped('#chance span, #altBtn, #altWhy'));
  await t.shot(`${OUT}/fb-3-lock.png`);
  // 플래그 조건(성군: T03은 앞의 T02 실제대로가 필요)
  await t.eval(`__jk.G.commit(2)`);
  await t.sleep(2600);
  await ready();
  await t.eval(`__jk.G.setDifficulty('sage')`);
  await t.eval(`(()=>{const r=__jk.G.run;Object.assign(r.vals,{people:50,nobles:50,treasury:50,army:50});JK.Cards.setGauges(r.vals,true);JK.Crisis.apply(r,true);})()`);
  await t.eval(`__jk.G.debugInsert('T03')`);
  await ready();
  await t.sleep(600);
  const lk2 = await t.eval(`document.querySelector('#chance').innerText.replace(/\\n/g,' | ')`);
  ok('플래그 조건(앞에서 「유교 원리」를 실제 역사대로)', /앞에서 「유교 원리」를 실제 역사대로 해야 열림/.test(lk2), lk2);
  await t.shot(`${OUT}/fb-3b-lock-flag.png`);
}
