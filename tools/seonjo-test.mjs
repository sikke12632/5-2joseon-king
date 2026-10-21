// seonjo-test.mjs — 선조·인조(설계서 2-3·3-3): 왕 바뀜(J08 인조) · 전쟁 중 국고 · 남한산성 식량 · 경복궁·종묘 터 · 눈 · 위기/돌발 카드
//   node tools/cdp.mjs tools/seonjo-test.mjs   (그래픽 칩이 멈추면 SOFTGL=1, OUT=폴더면 화면을 찍는다)
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
  // 돌발·위기는 끄고(카드 순서와 계기만 보기) 게이지를 50 가까이 지키며 한 생을 둔다
  await t.eval(`JK.era.events.chance={sprout:0,normal:0,sage:0,annals:0}`);
  const play = (diff) =>
    t.eval(`new Promise((res)=>{ for(const m of document.querySelectorAll('.modal')) m.classList.add('hide'); JK.Game.newRun('seonjo','${diff}');
        const log=[]; const t0=performance.now();
        const bar=()=>{const b=document.querySelector('#devBar'); return getComputedStyle(b).display==='none'?'':(b.classList.contains('text')?'text':'meter');};
        const tick=()=>{ const G=__jk.G, r=G.run;
          if (r.ended || G.state!=='play' || performance.now()-t0>90000) return res(JSON.stringify({log, built:r.built, unscene:r.unscene, state:G.state, snow:!!(r.flags&&r.flags.snow), king:r.kingName}));
          if (!JK.Cards.isReady()) return setTimeout(tick,5);
          document.querySelector('#warnFirst').classList.add('hide');
          let dir=1;
          if (!r.pending) { const c=G.card(r.deck[r.pos]);
            log.push({id:c.id, king:JK.Terms.king ? JK.Terms.king() : r.kingName, kingName:r.kingName, tr:r.vals.treasury, pe:r.vals.people, food:r.food, bar:bar(), name:(document.querySelector('#devName')||{}).textContent||''});
            if (c && !c.single) {
              const cost=(fx)=>{let m=0;for(const k in r.vals){const v=r.vals[k]+(fx[k]||0);m=Math.max(m,Math.abs(v-50));}return m;};
              dir = cost(c.choices.right.effects||{})<=cost(c.choices.left.effects||{}) ? 1 : -1;
              if (JK.Cards.isLocked(dir)) dir=-dir; } }
          G.commit(dir); setTimeout(tick,5); };
        setTimeout(tick,300); })`).then(JSON.parse);
  const a = await play('normal');
  const ids = a.log.map((x) => x.id);
  const at = (id) => ids.indexOf(id);
  const row = (id) => a.log[at(id)] || {};
  ok('끝까지 감(클리어 또는 실각)', a.state !== 'play', a.state);
  ok('역사 카드 J00~J11 차례대로', a.state === 'fall' || ['J00', 'J01', 'J02', 'J03', 'J04', 'J05', 'J06', 'J07', 'J08', 'J09', 'J10', 'J11'].every((id, i, arr) => at(id) >= 0 && (i === 0 || at(id) > at(arr[i - 1]))), ids.filter((x) => /^J\d\d$/.test(x)).join(' '));
  // 왕 바뀜: J08 앞은 선조, J08부터 인조
  const before = a.log.slice(0, Math.max(0, at('J08')));
  const after = at('J08') >= 0 ? a.log.slice(at('J08')) : [];
  ok('J08 앞 왕 이름 선조', before.length > 0 && before.every((x) => x.kingName === '선조'), [...new Set(before.map((x) => x.kingName))].join(','));
  ok('J08부터 왕 이름 인조', a.state === 'fall' || (after.length > 0 && after.every((x) => x.kingName === '인조')), [...new Set(after.map((x) => x.kingName))].join(','));
  // 전쟁 중(J02~J07): 계기에 '임진왜란' 글자가 보이고, 전쟁 밖에서는 안 보임
  const war = a.log.filter((x, i) => i > at('J02') && i <= at('J07'));
  ok('전쟁 계기(J02 뒤 ~ J07)', war.length > 0 && war.every((x) => x.bar === 'text'), war.map((x) => x.bar || '-').join(''));
  ok('전쟁 앞(J02 전)에는 계기 없음', a.log.slice(0, at('J02') + 1).every((x) => !x.bar), a.log.slice(0, at('J02') + 1).map((x) => x.bar || '-').join(''));
  // 전쟁 비용: 보통 카드마다 국고 −1 → 전쟁 동안 국고 흐름에 비용이 섞인다(정확한 값은 카드 효과와 겹치므로 계기 글자로 확인)
  // 남한산성 식량: J09 뒤 카드마다 1씩 준다
  const siege = a.log.filter((x, i) => i > at('J09'));
  const foods = siege.map((x) => x.food);
  ok('남한산성 식량이 J09 뒤 카드마다 줄어듦(보통 6)', a.state === 'fall' || (foods.length > 1 && foods[0] <= 6 && foods.every((f, i) => i === 0 || f === Math.max(0, foods[i - 1] - 1))), foods.join(','));
  ok('식량 계기(눈금)', a.state === 'fall' || siege.every((x) => x.bar === 'meter'), siege.map((x) => x.bar || '-').join(''));
  // 섬: 경복궁·종묘가 치워지고 터가 섬 · 남한산성·삼전도비
  ok('경복궁·종묘 치움(J02)', a.state === 'fall' || (a.unscene.includes('gyeongbok') && a.unscene.includes('jongmyo')), a.unscene.join(','));
  ok('경복궁 터는 남고, 종묘는 J07에서 다시 섬', a.built.includes('gyeongbokRuin') && (a.state === 'fall' || (a.built.includes('jongmyo') && !a.built.includes('jongmyoRuin'))), a.built.join(','));
  ok('남한산성·삼전도비', a.state === 'fall' || (a.built.includes('namhansan') && a.built.includes('samjeondo')));
  ok('병자호란 뒤 눈', a.state === 'fall' || a.snow);
  console.log('    순서:', a.log.map((x) => `${x.id}(${x.kingName === '인조' ? '인' : '선'}${x.food ? ' 식' + x.food : ''})`).join(' '));
  // 위기·돌발 카드가 선조·인조 생에 있다
  const kinds = JSON.parse(await t.eval(`JSON.stringify({crisis: JK.era.data.cards.filter(c=>c.kind==='crisis'&&c.stages.includes('seonjo')).length, events: JK.era.data.cards.filter(c=>c.kind==='event'&&c.stages.includes('seonjo')).length, scenes: JK.era.data.cards.filter(c=>c.kind==='event'&&c.stages.includes('seonjo')&&!(JK.EvFx.has?JK.EvFx.has(c.fx.scene):true)).map(c=>c.id)})`));
  ok('선조·인조 위기 24 · 돌발 18', kinds.crisis === 24 && kinds.events === 18, JSON.stringify(kinds));
  // 새 장면 셋이 오류 없이 돈다
  const errs = await t.eval(`(async()=>{ const out=[]; for (const s of ['seaFog','frost','wellSpring']) { try { JK.EvFx.play(s, {id:'x'}); await new Promise(r=>setTimeout(r,400)); JK.EvFx.reset && JK.EvFx.reset(); } catch(e) { out.push(s+': '+e.message); } } return out.join(' | '); })()`);
  ok('새 돌발 장면(바다 안개·얼음·산성 우물)', !errs, errs);
  if (OUT) await t.shot(`${OUT}/seonjo-end.png`);
}
