// t01-test.mjs — T01 정몽주의 다른 길 「정몽주를 곁에 둔다」가 실제 판에서 열리는지(담임 제보 2026-10-21)
//  판마다: T00 → 꼭 놓이는 무작위 칸 2개에서 양반을 올리는(국방은 덜 올리는) 쪽을 고름 → T01에서 다른 길이 열렸는지
//  난이도마다 TRIES판씩 돌려 열린 비율을 세고, 열린 판 하나에서 실제로 눌러 고르고 찍는다(1280×664)
//   OUT=폴더 TRIES=12 node tools/cdp.mjs tools/t01-test.mjs
export const options = { width: 1280, height: 664 };
const OUT = process.env.OUT || '.';
const TRIES = Number(process.env.TRIES || 12);
export default async function (t) {
  const ok = (name, cond, extra) => console.log(cond ? '  ✔' : '  ✘', name, extra !== undefined ? extra : '');
  const go = async (pick) => {
    await t.goto('http://127.0.0.1:8643/index.html?idle=0&pick=' + pick);
    await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  };
  const ready = () => t.waitFor(`JK.Cards.isReady() || __jk.G.state !== 'play'`, 15000);
  let shot = false;
  for (const diff of (process.env.DIFFS || 'sprout,normal,sage,annals').split(',')) {
    let opened = 0,
      slotsSeen = 0;
    for (let i = 0; i < TRIES; i++) {
      await go(diff);
      await t.eval('localStorage.clear()');
      await t.eval("window.confirm=()=>true; document.querySelector('#btnNew').click()");
      await ready();
      await t.eval(`JK.era.crisis.chance={warn:0,danger:0,cliff:0,end:0,cap:0}`);
      // T01이 나올 때까지: 양반 +가 큰 쪽(같으면 국방이 덜 오르는 쪽)
      let guard = 0;
      while (guard++ < 12) {
        await ready();
        await t.eval(`document.querySelector('#warnFirst').classList.add('hide')`);
        const cur = await t.eval(`__jk.G.run.pending ? '(기록)' : __jk.G.run.deck[__jk.G.run.pos]`);
        if (cur === 'T01') break;
        if (cur !== '(기록)' && cur !== 'T00') slotsSeen++;
        const dir = await t.eval(`(()=>{const r=__jk.G.run;if(r.pending) return 1;const c=__jk.G.card(r.deck[r.pos]);if(c.single) return 1;
          const s=(sk)=>{const e=c.choices[sk].effects||{};return (e.nobles||0)*10-(e.army||0);};return s('right')>=s('left')?1:-1;})()`);
        await t.eval(`__jk.G.commit(${dir})`);
        await t.sleep(700);
      }
      await ready();
      await t.sleep(300);
      const st = JSON.parse(await t.eval(`JSON.stringify({card:__jk.G.run.deck[__jk.G.run.pos], vals:__jk.G.run.vals, locked:!(__jk.G.run.shownAlt && __jk.G.run.shownAlt.opts && __jk.G.run.shownAlt.opts[0].open), why:document.querySelector('#altWhy').innerText.replace(/\\n/g,' | ')})`));
      if (st.card === 'T01' && !st.locked) {
        opened++;
        if (!shot) {
          shot = true;
          await t.shot(`${OUT}/t01-open-${diff}.png`);
          // 실제로 눌러 고른다(사람 손 클릭)
          const b = JSON.parse(await t.eval(`JSON.stringify(document.querySelector('#altBtn').getBoundingClientRect())`));
          await t.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: b.x + b.width / 2, y: b.y + b.height / 2, button: 'left', buttons: 1, clickCount: 1 });
          await t.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: b.x + b.width / 2, y: b.y + b.height / 2, button: 'left', buttons: 0, clickCount: 1 });
          // 다른 길이 둘이라 부채꼴이 펼쳐진다(10-14) — "정몽주를 곁에 둔다"를 사람 손으로 누른다
          await t.sleep(700);
          await t.shot(`${OUT}/t01-fan-${diff}.png`);
          const o = JSON.parse(await t.eval(`JSON.stringify([...document.querySelectorAll('#altFan .af-opt')].find(x=>x.textContent.includes('정몽주를 곁에')).getBoundingClientRect())`));
          await t.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: o.x + o.width / 2, y: o.y + o.height / 2, button: 'left', buttons: 1, clickCount: 1 });
          await t.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: o.x + o.width / 2, y: o.y + o.height / 2, button: 'left', buttons: 0, clickCount: 1 });
          await t.sleep(1300);
          const r = JSON.parse(await t.eval(`JSON.stringify({ch:__jk.G.run.choices.T01, flag:!!__jk.G.run.flagsRun['F_정몽주'], toast:document.querySelector('#result').textContent})`));
          ok(`[${diff}] 다른 길을 눌러 골랐다 · 깃발 F_정몽주`, r.ch === 'alt' && r.flag, r.toast);
          await t.shot(`${OUT}/t01-chosen-${diff}.png`);
        }
      } else if (i === 0) console.log(`   (${diff} 첫 판 잠김 예: ${JSON.stringify(st.vals)} · ${st.why})`);
    }
    console.log(`  ${diff}: ${TRIES}판 가운데 ${opened}판 열림 (T01 앞 무작위 칸 ${slotsSeen}장)`);
    ok(`[${diff}] 한 판이라도 열림`, opened > 0);
  }
}
