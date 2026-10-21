// yeongjo-test.mjs — 영조·정조(설계서 2-4·3-4): 왕 바뀜(Y04 정조) · 붕당 저울(저+2 · 저0쪽N · 저기운쪽+N) · 저울 막대 · 붕당 위기(가상 게이지 faction)
//   · 영조·정조 건물 · 위기/돌발 카드 수
//   node tools/cdp.mjs tools/yeongjo-test.mjs   (그래픽 칩이 멈추면 SOFTGL=1)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const J = async (e) => JSON.parse(await t.eval(`JSON.stringify(${e})`));
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,15),...a);})()`);

  console.log('1) 한 생 끝까지(돌발·위기 끔)');
  await t.eval(`JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; window.__crisisBak = JSON.stringify(JK.era.crisis.chance); JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  const a = JSON.parse(await t.eval(`new Promise((res)=>{ for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('yeongjo','normal');
      const log=[]; const t0=performance.now();
      const tick=()=>{ const G=__jk.G, r=G.run;
        if (r.ended || G.state!=='play' || performance.now()-t0>90000) return res(JSON.stringify({log, built:r.built, state:G.state, scale:r.device.scale, bar:document.querySelector('#devBar').className, num:document.querySelector('#devNum').textContent}));
        if (!JK.Cards.isReady()) return setTimeout(tick,5);
        document.querySelector('#warnFirst').classList.add('hide');
        let dir=1;
        if (!r.pending) { const c=G.card(r.deck[r.pos]); log.push({id:c.id, king:r.kingName, s:r.device.scale});
          if (c && !c.single) {
            const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
            dir = cost(c.choices.right.effects||{})<=cost(c.choices.left.effects||{}) ? 1 : -1;
            if (JK.Cards.isLocked(dir)) dir=-dir;
            if (JK.Cards.isLocked(dir) && r.shownAlt && r.shownAlt.open) { G.commitAlt(c.paths.alt[r.shownAlt.idx].id); setTimeout(tick,5); return; } } }
        G.commit(dir); setTimeout(tick,5); };
      setTimeout(tick,300); })`));
  const ids = a.log.map((x) => x.id);
  const at = (id) => ids.indexOf(id);
  ok('끝까지 감', a.state !== 'play', a.state);
  ok('역사 카드 Y00~Y10 차례대로', a.state === 'fall' || ['Y00', 'Y01', 'Y02', 'Y03', 'Y04', 'Y05', 'Y06', 'Y07', 'Y08', 'Y09', 'Y10'].every((id, i, arr) => at(id) >= 0 && (i === 0 || at(id) > at(arr[i - 1]))), ids.filter((x) => /^Y\d\d$/.test(x)).join(' '));
  const before = a.log.slice(0, Math.max(0, at('Y04')));
  const after = at('Y04') >= 0 ? a.log.slice(at('Y04')) : [];
  ok('Y04 앞 왕 이름 영조', before.length > 0 && before.every((x) => x.king === '영조'), [...new Set(before.map((x) => x.king))].join(','));
  ok('Y04부터 왕 이름 정조', a.state === 'fall' || (after.length > 0 && after.every((x) => x.king === '정조')), [...new Set(after.map((x) => x.king))].join(','));
  ok('저울 막대(signed)', /signed/.test(a.bar), `${a.bar} · ${a.num}`);
  ok('영조·정조 건물', a.state === 'fall' || ['tangpyeong', 'gyujang', 'jwapan', 'hwaseong', 'geojunggi', 'baedari'].every((k) => a.built.includes(k)), a.built.join(','));
  console.log('    순서:', a.log.map((x) => `${x.id}(${x.s})`).join(' '));

  console.log('2) 저울 움직임');
  await t.eval(`JK.Game.newRun('yeongjo','normal')`);
  await t.sleep(800);
  const moves = await J(`(()=>{ const r=__jk.G.run; const out=[]; const f=__jk.G.debugDevice;
      if (!f) return null;
      r.device.scale=0; out.push(f({scale:2})); out.push(f({scale:2})); out.push(f({scaleToward:1})); out.push(f({scaleAway:1}));
      out.push(f({scale:-9})); out.push(f({scaleToward:2})); r.device.scale=0; out.push(f({scaleAway:1}));
      return out; })()`);
  ok('저+2 · 저+2 · 저0쪽1 · 저기운쪽+1 · 저-9(−5에서 멈춤) · 저0쪽2 · (0에서) 저기운쪽+1', JSON.stringify(moves) === JSON.stringify([2, 4, 3, 4, -5, -3, 0]), JSON.stringify(moves));

  console.log('3) 붕당 위기');
  await t.eval(`JK.era.crisis.chance=JSON.parse(window.__crisisBak)`);
  const cz = await J(`(()=>{ const r=__jk.G.run; r.device.scale=-5; const z=JK.Crisis.apply(r,true); return {z:z.faction, v:JK.Crisis.virtual(r)}; })()`);
  ok('저울 −5 → 가상 게이지 faction 끝(붉은 쪽)', cz.z && cz.z.level === 'end' && cz.z.side === 'low' && cz.v.faction === 0, JSON.stringify(cz));
  const z3 = await J(`(()=>{ const r=__jk.G.run; const o={}; for (const s of [2,3,4]) { r.device.scale=s; o[s]=JK.Crisis.apply(r,true).faction.level; } return o; })()`);
  ok('|2| 안정 · |3| 경고 · |4| 위험', z3[2] === 'stable' && z3[3] === 'warn' && z3[4] === 'danger', JSON.stringify(z3));
  const pick = await J(`(()=>{ const r=__jk.G.run; r.device.scale=5; r.crisisRest=0; r.cooldown={}; r.forewarned={faction:'high'}; JK.Crisis.apply(r,true); let id=null; for (let i=0;i<20 && !id;i++) id=JK.Crisis.pick(r, ()=>0, r.zones); return id; })()`);
  ok('저울 +5에서 붕당 위기 KY10', pick === 'KY10', pick);
  const fc = await J(`(()=>{ const c=__jk.G.card('KY10'); const p=JK.Crisis.fallChance(c,'right',__jk.G.run.vals); return {p:p.p, level:p.level, dev:c.choices.right.device}; })()`);
  ok('KY10 실각 확률(끝 구간)·강한 대응은 저울을 가운데로 2칸', fc.level === 'end' && fc.p > 0.3 && fc.dev && fc.dev.scaleToward === 2, JSON.stringify(fc));
  const held = await J(`(()=>{ const r=__jk.G.run; r.device.scale=5; JK.Crisis.afterHeld(r, __jk.G.card('KY10')); return r.device.scale; })()`);
  ok('수습하면 저울이 적어도 3칸 안으로', held === 3, held);
  const fallRec = await J(`JK.era.data.falls.find(f=>f.gauge==='faction')`);
  ok('붕당 실각 기록', !!fallRec && /붕당/.test(fallRec.name), JSON.stringify(fallRec && fallRec.name));
  const kinds = await J(`({crisis: JK.era.data.cards.filter(c=>c.kind==='crisis'&&c.stages.includes('yeongjo')).length, faction: JK.era.data.cards.filter(c=>c.kind==='crisis'&&c.gauge==='faction').length, events: JK.era.data.cards.filter(c=>c.kind==='event'&&c.stages.includes('yeongjo')).length})`);
  ok('영조·정조 위기 30(붕당 6 포함) · 돌발 18', kinds.crisis === 30 && kinds.faction === 6 && kinds.events === 18, JSON.stringify(kinds));
  if (OUT) await t.shot(`${OUT}/yeongjo-end.png`);
}
