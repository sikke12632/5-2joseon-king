// event-sim.mjs — 무음으로 판을 여러 번 끝까지 두며 돌발 이벤트 숫자를 잰다(설계서 10-13-1 "보통에서 한 판 평균 약 2번")
//   고르기: 게이지를 50 가까이 지키는 쪽(잠기면 다른 쪽, 둘 다 잠기면 다른 길). 기다림 시간은 줄여 빨리 돈다(연출 시간은 재지 않음)
//   N=판 수(난이도마다, 기본 20) DIFFS=sprout,normal,sage,annals  node tools/cdp.mjs tools/event-sim.mjs
//   STRAT=random 이면 아이처럼 아무 쪽이나 고른다(게이지가 출렁여 왕의 마음·기질이 생긴다). CHANCE=1.5 면 돌발 확률에 곱한다(조정 검토용)
const N = Number(process.env.N || 20);
const DIFFS = (process.env.DIFFS || 'sprout,normal,sage,annals').split(',');
const STRAT = process.env.STRAT || 'keep';
const CHANCE = Number(process.env.CHANCE || 1);
export default async function (t) {
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval("document.querySelector('#btnNew').click()");
  await t.waitFor('JK.Cards.isReady()', 20000);
  // 기다림을 짧게(연출은 건너뛰듯)
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,15),...a);})()`);
  if (CHANCE !== 1) await t.eval(`(()=>{const c=JK.era.events.chance; for(const k in c) c[k]=Math.min(0.95,c[k]*${CHANCE});})()`);
  const all = {};
  for (const d of DIFFS) {
    const rows = [];
    for (let i = 0; i < N; i++) {
      await t.eval(`(()=>{for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('taejo','${d}');})()`);
      const r = JSON.parse(
        await t.eval(`new Promise((res)=>{ const t0=performance.now(); let steps=0; const tm0=JSON.stringify(JK.Save.meta.traits||{});
          const tick=()=>{ const G=__jk.G, r=G.run;
            if (r.ended || G.state!=='play' || performance.now()-t0>60000) {
              const tm=JK.Save.meta.traits||{}, a=JSON.parse(tm0); let traits=0; for(const k in tm) traits+=tm[k]-(a[k]||0);
              return res(JSON.stringify({ev:r.ev.count, chains:Object.keys(r.ev.depth||{}).filter(k=>r.ev.seen.includes(k)).length, boxes:r.ev.boxes.length, traits, nights:r._nights||0, fell:G.state==='fall', cards:r.pos, ids:r.ev.seen, mind:r.mind, kinds:r.ev.seen.map(id=>G.card(id).ev), timeout:performance.now()-t0>60000}));
            }
            if (!JK.Cards.isReady()) return setTimeout(tick,5);
            document.querySelector('#warnFirst').classList.add('hide');
            if (r.night && !r._nightSeen){ r._nights=(r._nights||0)+1; r._nightSeen=true; } if(!r.night) r._nightSeen=false;
            let dir=1;
            if (!r.pending) { const c=G.card(r.deck[r.pos]);
              if (c && !c.single) { const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
                dir = '${STRAT}'==='random' ? (Math.random()<0.5?1:-1) : cost(c.choices.right.effects||{})<=cost(c.choices.left.effects||{}) ? 1 : -1;
                if (JK.Cards.isLocked(dir)) dir = JK.Cards.isLocked(-dir) ? 2 : -dir; } }
            steps++; G.commit(dir); setTimeout(tick,5); };
          tick(); })`)
      );
      rows.push(r);
      await t.sleep(50);
    }
    const avg = (f) => (rows.reduce((s, x) => s + f(x), 0) / rows.length).toFixed(2);
    const kinds = {};
    for (const x of rows) for (const k of x.kinds) kinds[k] = (kinds[k] || 0) + 1;
    const ids = {};
    for (const x of rows) for (const k of x.ids) ids[k] = (ids[k] || 0) + 1;
    all[d] = { 판: rows.length, 평균돌발: avg((x) => x.ev), 최대: Math.max(...rows.map((x) => x.ev)), 연쇄: avg((x) => x.chains), 상자: avg((x) => x.boxes), 기질: avg((x) => x.traits), 밤: avg((x) => x.nights), 실각: rows.filter((x) => x.fell).length, 평균장수: avg((x) => x.cards), 종류: kinds, 카드: ids, 시간초과: rows.filter((x) => x.timeout).length };
    console.log(d, JSON.stringify(all[d]));
  }
  const max = { sprout: 2, normal: 4, sage: 5, annals: 6 };
  for (const d of DIFFS) console.log(Number(all[d].최대) <= max[d] ? '  ✔' : '  ✘', `${d} 한 판 최대 ${max[d]} 이하`, all[d].최대);
  if (all.normal) console.log(Number(all.normal.평균돌발) >= 1.2 && Number(all.normal.평균돌발) <= 3.2 ? '  ✔' : '  ✘', '보통 평균 약 2번(1.2~3.2)', all.normal.평균돌발);
}
