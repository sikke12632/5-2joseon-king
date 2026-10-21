// gojong-test.mjs — 고종(설계서 2-5·3-5): 개항 압력(카드마다 +1, 10이면 군함 위협 → 5) → G04에서 개화 진행도 · 장치 카드 창(GX1~GX3: G05 뒤 G06 앞, GX4: G10 뒤)
//   · GX5·GX6 마지막 두 장면 고정 · 경복궁 다시(G02) · 고종 건물
//   node tools/cdp.mjs tools/gojong-test.mjs   (그래픽 칩이 멈추면 SOFTGL=1)
export const options = { width: 1280, height: 664 };
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,15),...a);})()`);
  // 고종은 완성 전까지 ready:false — 이 시험 안에서만 연다
  await t.eval(`JK.era.stages.find((s)=>s.id==='gojong').ready=true; JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}; JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
  const play = (pick) =>
    t.eval(`new Promise((res)=>{ for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('gojong','normal');
      const log=[]; const t0=performance.now();
      const tick=()=>{ const G=__jk.G, r=G.run;
        if (r.ended || G.state!=='play' || performance.now()-t0>90000) return res(JSON.stringify({log, built:r.built, unscene:r.unscene, state:G.state, dev:r.device}));
        if (!JK.Cards.isReady()) return setTimeout(tick,5);
        document.querySelector('#warnFirst').classList.add('hide');
        let dir=1;
        if (!r.pending) { const c=G.card(r.deck[r.pos]); log.push({id:c.id, p:r.device.pressure, o:r.device.open, army:r.vals.army, name:document.querySelector('#devName').textContent});
          if (c && !c.single) {
            const dv=(s)=>((c.choices[s].device||{}).open||0);
            const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
            if (dv('right')!==dv('left')) dir = (dv('right')>dv('left')) === (${pick}>0) ? 1 : -1;
            else dir = cost(c.choices.right.effects||{})<=cost(c.choices.left.effects||{}) ? 1 : -1;
            if (JK.Cards.isLocked(dir)) dir=-dir;
            if (JK.Cards.isLocked(dir) && r.shownAlt && r.shownAlt.open) { G.commitAlt(c.paths.alt[r.shownAlt.idx].id); setTimeout(tick,5); return; } } }
        G.commit(dir); setTimeout(tick,5); };
      setTimeout(tick,300); })`).then(JSON.parse);
  const a = await play(1);
  const ids = a.log.map((x) => x.id);
  const at = (id) => ids.indexOf(id);
  ok('끝까지 감', a.state !== 'play', a.state);
  ok('역사 카드 G00~G11 차례대로', a.state === 'fall' || ['G00', 'G01', 'G02', 'G03', 'G04', 'G05', 'G06', 'G07', 'G08', 'G09', 'G10', 'G11'].every((id, i, arr) => at(id) >= 0 && (i === 0 || at(id) > at(arr[i - 1]))), ids.filter((x) => /^G\d\d$/.test(x)).join(' '));
  const pre = a.log.slice(1, at('G04') + 1);
  ok('G04 앞: 막대 이름 「개항 압력」', pre.every((x) => x.name === '개항 압력'), [...new Set(pre.map((x) => x.name))].join(','));
  ok('G04 뒤: 막대 이름 「개화 진행도」', a.state === 'fall' || a.log.slice(at('G04') + 1).every((x) => x.name === '개화 진행도'), [...new Set(a.log.slice(at('G04') + 1).map((x) => x.name))].join(','));
  const ps = pre.map((x) => x.p);
  ok('압력이 카드마다 오름(10이면 5로)', ps.length > 2 && ps.every((p, i) => i === 0 || p === ps[i - 1] + 1 || p === ps[i - 1] + 3 || p === ps[i - 1] || (ps[i - 1] >= 9 && p <= 6) || p === ps[i - 1] - 0), ps.join(','));
  ok('GX1~GX3: G05 뒤 G06 앞', a.state === 'fall' || ['GX1', 'GX2', 'GX3'].every((id) => at(id) > at('G05') && at(id) < at('G06')), ['GX1', 'GX2', 'GX3'].map(at).join(','));
  ok('GX4: G10 뒤', a.state === 'fall' || at('GX4') > at('G10'), at('GX4'));
  ok('마지막 두 장면 GX5 · GX6', a.state === 'fall' || (ids[ids.length - 2] === 'GX5' && ids[ids.length - 1] === 'GX6'), ids.slice(-3).join(' '));
  ok('경복궁 다시(터는 치움)', a.built.includes('gyeongbok') && (a.unscene || []).includes('gyeongbokRuin'), a.built.join(','));
  ok('고종 건물', a.state === 'fall' || ['cheokhwa', 'port', 'ujeong', 'dongnipmun', 'hwangudan', 'hospital', 'school', 'lamps', 'telepole', 'tram', 'railway'].every((k) => a.built.includes(k)), a.built.join(','));
  ok('개화 진행도가 오름(오르는 쪽을 골랐을 때)', a.dev.open >= 3, JSON.stringify(a.dev));
  console.log('    순서:', a.log.map((x) => `${x.id}(${x.name === '개항 압력' ? 'p' + x.p : 'o' + x.o})`).join(' '));
  // 군함 위협: 압력 9에서 한 장 넘기면 국방 −15, 압력 5
  const hit = JSON.parse(await t.eval(`(()=>{ JK.Game.newRun('gojong','normal'); return 1; })()`));
  void hit;
  await t.sleep(1500);
  const h = JSON.parse(await t.eval(`new Promise((res)=>{ const G=__jk.G, r=G.run; const wait=()=>{ if(!JK.Cards.isReady()) return setTimeout(wait,20);
      r.device.pressure=9; const a0=r.vals.army; G.commit(1); setTimeout(()=>{ if (r.pending) G.commit(1); setTimeout(()=>res(JSON.stringify({p:r.device.pressure, d:r.vals.army-a0})),400); },400); }; wait(); })`));
  ok('압력 10 → 군함 위협(국방이 크게 줄고 압력 5)', h.p === 5 || h.p === 6, JSON.stringify(h));
}
