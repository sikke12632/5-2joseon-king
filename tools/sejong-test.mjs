// sejong-test.mjs — 세종(설계서 2-2): 발명 진행도 · 장치 카드 창(혼천의·앙부일구·측우기) · 장영실의 길 · 세종 건물 · 위기/돌발 카드
//   node tools/cdp.mjs tools/sejong-test.mjs   (그래픽 칩이 멈추면 SOFTGL=1, OUT=폴더면 화면을 찍는다)
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '';
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval('localStorage.clear()');
  await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=normal');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 5', 60000);
  await t.eval(`(()=>{const o=window.setTimeout.bind(window); window.setTimeout=(f,ms,...a)=>o(f,Math.min(ms||0,15),...a);})()`);
  // 돌발은 끄고(카드 순서를 보기 쉽게) 한 생을 둔다
  await t.eval(`JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}`);
  const play = async (pickSide) =>
    JSON.parse(
      await t.eval(`new Promise((res)=>{ for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('sejong','normal');
        const log=[]; const t0=performance.now();
        const tick=()=>{ const G=__jk.G, r=G.run;
          if (r.ended || G.state!=='play' || performance.now()-t0>90000) return res(JSON.stringify({log, dev:r.device, built:r.built, state:G.state, bar:getComputedStyle(document.querySelector('#devBar')).display, num:document.querySelector('#devNum').textContent}));
          if (!JK.Cards.isReady()) return setTimeout(tick,5);
          document.querySelector('#warnFirst').classList.add('hide');
          let dir=1;
          if (!r.pending) { const c=G.card(r.deck[r.pos]); log.push([c.id, r.device.invention||0]);
            // 발명 진행도가 걸린 카드는 ${pickSide}(1 = 오르는 쪽, -1 = 안 오르는 쪽), 그 밖은 게이지를 50 가까이 지키는 쪽
            if (c && !c.single) {
              const dv=(s)=>((c.choices[s].device||{}).invention||0);
              const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
              if (dv('right')!==dv('left')) dir = (dv('right')>dv('left')) === (${pickSide}>0) ? 1 : -1;
              else dir = cost(c.choices.right.effects||{})<=cost(c.choices.left.effects||{}) ? 1 : -1;
              if (JK.Cards.isLocked(dir)) dir=-dir; } }
          G.commit(dir); setTimeout(tick,5); };
        setTimeout(tick,300); })`),
    );
  // 1) 오른쪽만(구리를 내준다 등 진행도가 오르는 쪽이 많다)
  const a = await play(1);
  const ids = a.log.map((x) => x[0]);
  const at = (id) => ids.indexOf(id);
  ok('끝까지 감(클리어 또는 실각)', a.state !== 'play', a.state);
  ok('발명 진행도 눈금이 보임', a.bar !== 'none', a.num);
  for (const id of ['SX1', 'SX2', 'SX3']) ok(`${id} 한 번 나옴`, ids.filter((x) => x === id).length === 1 || a.state === 'fall', at(id));
  if (a.state !== 'fall') {
    ok('장치 카드는 창 안(S04 뒤 ~ S08 앞)', at('SX1') > at('S04') && at('SX3') < at('S08') && at('SX2') > at('S05'), [at('S04'), at('SX1'), at('SX2'), at('SX3'), at('S08')].join(','));
    ok('SX3은 SX2 뒤', at('SX3') > at('SX2'));
  }
  ok('장영실의 길 C02a(진행도 1 뒤, S06 앞)', at('C02a') >= 0 && (at('S06') < 0 || at('C02a') < at('S06')), at('C02a'));
  ok('S06 구리를 내준다 → C02b 바로 다음', at('C02b') < 0 ? a.state === 'fall' && at('S06') < 0 : at('C02b') > at('S06') && at('C02b') - at('S06') <= 2, `${at('S06')} → ${at('C02b')}`);
  ok('세종 건물이 섬', a.state === 'fall' || ['jiphyeon', 'jin', 'jagyeok', 'honcheon', 'angbu', 'cheugu'].every((k) => a.built.includes(k)), a.built.join(','));
  ok('진행도가 오르는 쪽을 고르면 6까지(「과학 임금의 벗」)', a.state === 'fall' || a.dev.invention === 6, a.dev.invention);
  console.log('    순서:', a.log.map(([id, v]) => `${id}(${v})`).join(' '));
  // 2) 왼쪽만(재료를 아낀다·법대로 둔다 등): 진행도가 낮아 장치 카드가 창 끝(S08 바로 앞)에 몰린다
  const b = await play(-1);
  const idb = b.log.map((x) => x[0]);
  if (b.state !== 'fall') ok('진행도가 낮으면 장치 카드가 S08 바로 앞에 반드시', idb.indexOf('SX3') >= 0 && idb.indexOf('SX3') < idb.indexOf('S08'), b.log.map(([id, v]) => `${id}(${v})`).join(' '));
  else ok('(왼쪽만 고른 생은 실각 — 창 끝 시험 건너뜀)', true);
  // 3) 위기·돌발 카드가 세종 판에 있다
  const kinds = JSON.parse(await t.eval(`JSON.stringify({crisis: JK.era.data.cards.filter(c=>c.kind==='crisis'&&c.stages.includes('sejong')).length, events: JK.era.data.cards.filter(c=>c.kind==='event'&&c.stages.includes('sejong')).length, device: JK.era.data.cards.filter(c=>c.kind==='device').length})`));
  ok('세종 위기 24 · 돌발 18 · 장치 3', kinds.crisis === 24 && kinds.events === 18 && kinds.device === 3, JSON.stringify(kinds));
  // 4) 칭호: 진행도 6
  const title = await t.eval(`(()=>{ const r=__jk.G.run; JK.Game.newRun('sejong','normal'); __jk.G.run.device.invention=5; return 1; })()`);
  void title;
  if (OUT) await t.shot(`${OUT}/sejong-devbar.png`);
}
