// event-test.mjs — 돌발 이벤트 시험(설계서 10-13): 돌발 사건 · 즉시 효과 · 연쇄 · 알 수 없는 상자 · 왕의 마음과 기질 · 사관의 한 줄 · 돌발 도감
//   디벗 화면 1280×664. OUT=폴더 이면 화면을 찍는다
//   OUT=폴더 node tools/cdp.mjs tools/event-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const go = async () => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const ready = () => t.waitFor('JK.Cards.isReady()', 15000);
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  const show = async (id) => {
    await ready();
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
    await t.eval(`__jk.G.debugInsert('${id}')`);
    await t.waitFor(`JK.Cards.isReady() && __jk.G.run.deck[__jk.G.run.pos]==='${id}' && !__jk.G.run.pending`, 8000);
  };
  const pass = async (dir) => {
    await ready();
    await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
    await t.eval(`__jk.G.commit(${dir || 1})`);
    await t.sleep(1000);
    await ready();
    if (await t.eval('!!__jk.G.run.pending')) {
      await t.eval('__jk.G.commit(1)');
      await t.sleep(900);
    }
  };
  await go();
  await t.eval('localStorage.clear()');
  await go();
  await t.eval("document.querySelector('#btnNew').click()");
  await ready();
  await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);

  console.log('1) 돌발 카드 18장 · 판 시작 때 마음 0');
  const base = await J(`{n:JK.era.data.cards.filter(c=>c.kind==='event').length, mind:__jk.G.run.mind, ev:__jk.G.run.ev, hud:getComputedStyle(document.querySelector('#kingMind')).display}`);
  ok('돌발 카드 18장', base.n === 18, base.n);
  ok('마음 0 · 돌발 기록 시작', base.mind === 0 && base.ev && base.ev.count === 0);
  ok('임금 메달·마음 붓 보임', base.hud !== 'none');

  console.log('2) 흉 돌발(가뭄): 큰 글씨 · 즉시 효과 · 마음 +10 · 날씨 · 사관 한 줄');
  await t.eval(`__jk.G.run.vals={people:50,nobles:50,treasury:50,army:50}; JK.Cards.setGauges(__jk.G.run.vals,true); __jk.G.run.ev.lastNarr=-99`);
  await show('ET01');
  await t.sleep(1100);
  const s1 = await J(`{tag:document.querySelector('#chainTag').textContent, cls:document.querySelector('#card').className, banner:document.querySelector('#evBanner').className, bn:document.querySelector('#evBanner .eb-name').textContent, vals:__jk.G.run.vals, mind:__jk.G.run.mind, wx:__jk.W.state.wxTarget, narr:document.querySelector('#sagwanLine').className, nt:document.querySelector('#sagwanLine .sl-text').textContent, game:getComputedStyle(document.querySelector('#gameTag')).display}`);
  ok('카드 띠 "돌발 · 흉 · 가뭄"', s1.tag === '돌발 · 흉 · 가뭄', s1.tag);
  ok('흉 테두리', /ev-bad/.test(s1.cls), s1.cls);
  ok('[게임 속 일] 표시', s1.game !== 'none');
  ok('큰 글씨 가뭄', /show/.test(s1.banner) && s1.bn === '가뭄', s1.banner);
  ok('즉시 효과: 백성이 내려감', s1.vals.people < 50, JSON.stringify(s1.vals));
  ok('왕의 마음 +10', s1.mind === 10, s1.mind);
  ok('가뭄 날씨', s1.wx === 1);
  ok('사관 한 줄', /show/.test(s1.narr) && s1.nt.length > 3, s1.nt);
  if (OUT) await t.shot(`${OUT}/ev-1-drought.png`);

  console.log('3) 연쇄: 가뭄 뒤 3~6장 안에 메뚜기 떼');
  await t.eval(`JK.era.events.chainMult.normal = 10`);
  await pass(1);
  const rs = await J(`__jk.G.run.reserve.filter(r=>r.ev)`);
  ok('연쇄 예약(돌발)', rs.length === 1 && ['ET02', 'ET04'].includes(rs[0].card), JSON.stringify(rs));
  let chainSeen = '';
  for (let i = 0; i < 9 && !chainSeen; i++) {
    await ready();
    const cur = await t.eval(`__jk.G.run.deck[__jk.G.run.pos]`);
    if (cur === rs[0].card) {
      chainSeen = cur;
      break;
    }
    await pass(1);
  }
  await t.sleep(1000);
  const s2 = await J(`{tag:document.querySelector('#chainTag').textContent, bn:document.querySelector('#evBanner .eb-kind').textContent, depth:__jk.G.run.ev.depth}`);
  ok('연쇄 카드가 옴', !!chainSeen, chainSeen + ' · ' + s2.tag);
  ok('연쇄 큰 글씨', /연쇄|돌발/.test(s2.bn), s2.bn);
  if (OUT && chainSeen) await t.shot(`${OUT}/ev-2-chain.png`);
  await pass(1);

  console.log('4) 알 수 없는 상자(낡은 지도): 미리보기 "?" · 셋 가운데 하나 · 도감에 남음');
  await show('ET15');
  const pv = await J(`(()=>{const v=JK.Cards; return 1})()`);
  await t.sleep(600);
  const s3pre = await J(`{bad:__jk.G.run.ev.boxes.length}`);
  await t.eval(`__jk.G.commit(1)`);
  await t.sleep(1700);
  const s3 = await J(`{cls:document.querySelector('#boxReveal').className, word:document.querySelector('#boxReveal .br-word').textContent, boxes:__jk.G.run.ev.boxes, meta:JK.Save.meta.boxes}`);
  ok('상자 열림 연출', /show/.test(s3.cls) && /(good|bad|empty)/.test(s3.cls), s3.cls + ' · ' + s3.word);
  ok('결과 기록', s3.boxes.length === s3pre.bad + 1 && s3.meta && s3.meta.ET15, JSON.stringify(s3.boxes));
  if (OUT) await t.shot(`${OUT}/ev-3-box.png`);
  await ready();
  if (await t.eval('!!__jk.G.run.pending')) await t.eval('__jk.G.commit(1)');

  console.log('5) 상자 확률: 난이도마다 나쁜 결과 +p (1000번 굴림)');
  const odds = await J(`(()=>{const c=__jk.G.card('ET13'); const out={}; for(const d of ['sprout','normal','annals']){ const r=__jk.G.run; const old=r.diff; r.diff=d; const n={good:0,bad:0,empty:0}; let s=7; const rnd=()=>{s=(s*16807)%2147483647; return s/2147483647;}; const bx=r.ev.boxes.slice(); for(let i=0;i<1000;i++) n[JK.Events.openBox(r,c,rnd).kind]++; r.ev.boxes=bx; r.diff=old; out[d]=n;} return out;})()`);
  ok('새싹 < 보통 < 실록 (나쁜 결과)', odds.sprout.bad < odds.normal.bad && odds.normal.bad < odds.annals.bad, JSON.stringify(odds));
  // 1000번 굴리며 쌓인 마음·기질·밤은 지운다(시험용 굴림)
  await t.eval(`(()=>{const r=__jk.G.run; r.mind=0; r.trait=null; r.night=null; JK.Events.takePending(); r.ev.q=[]; JK.Events.refresh(r);})()`);

  console.log('6) 왕의 마음 100 → 기질 · 효과 · 메달 연출');
  await t.eval(`(()=>{const r=__jk.G.run; r.trait=null; r.mind=95; JK.Events.addMind(r, 10);})()`);
  const s4 = await J(`{trait:__jk.G.run.trait, mind:__jk.G.run.mind, chip:getComputedStyle(document.querySelector('.km-trait')).display, name:document.querySelector('.kt-name').textContent, cls:document.querySelector('#kingMind').className}`);
  ok('기질이 붙고 마음은 50으로', !!s4.trait && s4.mind === 50, JSON.stringify(s4.trait));
  ok('기질 띠 "이번 판의 임금은 · …"', s4.chip !== 'none' && /^이번 판의 임금은 · /.test(s4.name), s4.name);
  ok('메달에 기질 모양', new RegExp('t-' + s4.trait.key).test(s4.cls), s4.cls);
  const eff = await J(`(()=>{const r=__jk.G.run; const v={people:50,nobles:50,treasury:50,army:50}; const o={}; for(const k of ['suspicious','hasty','generous','tired']){ r.trait={key:k,left:12}; o[k]={nob:__jk.G.effect('nobles',10,v), ppl:__jk.G.effect('people',-10,v), hide:JK.Events.previewHidden(r)}; } r.trait=null; o.none={nob:__jk.G.effect('nobles',10,v), ppl:__jk.G.effect('people',-10,v)}; return o;})()`);
  ok('의심 많은 왕: 양반 오름 절반', eff.suspicious.nob === Math.round(eff.none.nob / 2), JSON.stringify(eff.suspicious) + ' / ' + JSON.stringify(eff.none));
  ok('성급한 왕: ×1.25', Math.abs(eff.hasty.nob) > Math.abs(eff.none.nob), JSON.stringify(eff.hasty));
  ok('너그러운 왕: 백성 내림 절반', eff.generous.ppl === Math.round(eff.none.ppl / 2), JSON.stringify(eff.generous));
  ok('지친 왕: 미리보기 숨김', eff.tired.hide === true);
  const cm = await J(`(()=>{const r=__jk.G.run; r.trait={key:'fearful',left:12}; const a=JK.Events.crisisMult(r,'people'); r.trait={key:'steadfast',left:10}; const b=JK.Events.fallMult(r); r.trait=null; return {a,b};})()`);
  ok('겁먹은 왕 위기 ×1.3 · 굳센 왕 실각 ×0.5', cm.a === 1.3 && cm.b === 0.5, JSON.stringify(cm));
  await t.eval(`(()=>{const r=__jk.G.run; r.trait={key:'suspicious',left:12}; JK.Events.refresh(r); r.mind=60; JK.Events.refresh(r);})()`);
  await show('D001');
  await t.sleep(700);
  if (OUT) await t.shot(`${OUT}/ev-4-trait.png`);
  await pass(1);

  console.log('7) 나쁜 기질이 붙은 채 다시 100 → 무너질 듯한 밤');
  await t.eval(`(()=>{const r=__jk.G.run; r.trait={key:'fearful',left:12}; r.vals={people:20,nobles:50,treasury:50,army:50}; r.mind=99; JK.Events.addMind(r, 5);})()`);
  const s5 = await J(`{night:__jk.G.run.night, m:JK.Events.crisisMult(__jk.G.run,'people')}`);
  ok('무너질 듯한 밤(가장 나쁜 게이지 위기 ×2, 겁먹은 왕과 겹치면 ×2.6)', s5.night && s5.night.gauge === 'people' && Math.abs(s5.m - 2.6) < 1e-9, JSON.stringify(s5));
  await t.eval(`__jk.G.run.night=null; __jk.G.run.vals={people:50,nobles:50,treasury:50,army:50}; JK.Cards.setGauges(__jk.G.run.vals,true)`);

  console.log('8) 마음 카드(매화 핀 뜰)의 쉬는 쪽 → 마음 −30 · 나쁜 기질이 풀림');
  await t.eval(`(()=>{const r=__jk.G.run; r.trait={key:'suspicious',left:12}; r.mind=70; JK.Events.refresh(r);})()`);
  await show('ET16');
  await t.sleep(1000);
  if (OUT) await t.shot(`${OUT}/ev-5-plum.png`);
  await t.eval(`__jk.G.commit(1)`);
  await t.sleep(800);
  const s6 = await J(`{trait:__jk.G.run.trait, mind:__jk.G.run.mind}`);
  ok('기질 풀림 · 마음 내려감', !s6.trait && s6.mind <= 40, JSON.stringify(s6));
  await ready();
  if (await t.eval('!!__jk.G.run.pending')) await t.eval('__jk.G.commit(1)');

  console.log('9) 사관의 한 줄은 세 장에 한 번까지');
  const nar = await J(`(()=>{const r=__jk.G.run; const p0=r.pos; let n=0; const last=r.ev.lastNarr; r.ev.lastNarr=-99; for(let i=0;i<12;i++){ r.pos=p0+i; JK.Events.say(r,'big'); if(JK.Events.flush(r)) n++; } r.pos=p0; return n;})()`);
  ok('12장에 4번', nar === 4, nar);

  console.log('10) 뽑기 규칙: 처음 3장 · 마지막 역사 카드 바로 앞 · 쉬는 장수 · 한 판 최대');
  const rules = await J(`(()=>{const r=__jk.G.run; const save=JSON.stringify({pos:r.pos,ev:r.ev,deck:r.deck,reserve:r.reserve}); const one=()=>0; const o={};
    r.pos=1; o.first=JK.Events.tryReplace(r,one);
    r.pos=5; r.ev.rest=2; o.rest=JK.Events.tryReplace(r,one); r.ev.rest=0;
    r.ev.count=4; o.max=JK.Events.tryReplace(r,one); r.ev.count=0;
    let li=-1; for(let i=r.deck.length-1;i>=0;i--){ const c=__jk.G.card(r.deck[i]); if(c&&c.kind==='history'){li=i;break;} } r.pos=li-1; o.beforeLast=JK.Events.tryReplace(r,one);
    r.pos=6; o.ok=JK.Events.tryReplace(r,one);
    const s=JSON.parse(save); Object.assign(r,s); return o;})()`);
  ok('처음 3장 없음', rules.first === null);
  ok('쉬는 장수 동안 없음', rules.rest === null);
  ok('한 판 최대(보통 4) 넘으면 없음', rules.max === null);
  ok('마지막 역사 카드 바로 앞 없음', rules.beforeLast === null);
  ok('그 밖에는 돌발이 뽑힘', !!rules.ok, rules.ok);

  console.log('11) 억울함 막기: 벼랑이면 흉 ½ · 길 ×2 (2000번 뽑기)');
  const fair = await J(`(()=>{const r=__jk.G.run; const z=r.zones; const gh=r.grainHist, sn=r.ev.seen, us=r.used; r.grainHist=[]; r.ev.seen=[]; r.used=[]; const cnt=(zones)=>{r.zones=zones; const n={}; let s=11; const rnd=()=>{s=(s*16807)%2147483647; return s/2147483647;}; for(let i=0;i<2000;i++){ const id=JK.Events.pick(r,rnd); const c=__jk.G.card(id); if(c) n[c.ev]=(n[c.ev]||0)+1;} return n;}; r.pos=10; const calm=cnt({}); const cliff=cnt({people:{level:'cliff',side:'low',d:3}}); r.zones=z; r.grainHist=gh; r.ev.seen=sn; r.used=us; return {calm,cliff};})()`);
  ok('벼랑일 때 흉이 줄고 길이 늘어남', (fair.cliff.bad || 0) < (fair.calm.bad || 0) && (fair.cliff.good || 0) > (fair.calm.good || 0), JSON.stringify(fair));

  console.log('12) 돌발 도감(나의 기록)');
  await t.eval(`document.querySelector('#btnHome').click()`);
  await t.sleep(600);
  await t.eval(`document.querySelector('#btnRecords').click()`);
  await t.sleep(500);
  const rec = await t.eval(`document.querySelector('#recEvents').textContent`);
  ok('만난 돌발 수와 이름', /만난 돌발 \d+ \/ 18/.test(rec) && /가뭄/.test(rec), rec.slice(0, 80));
  if (OUT) {
    await t.eval(`document.querySelector('#recEvents').scrollIntoView()`);
    await t.shot(`${OUT}/ev-6-codex.png`);
  }
}
