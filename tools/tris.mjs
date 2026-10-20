// tris.mjs — 모두 지은 뒤 장면의 삼각형을 물체별로 나눠 본다(그림자 패스 포함 여부도)
export default async function (t) {
  await t.goto((process.env.BASE || 'http://127.0.0.1:8643/index.html') + '?q=normal&idle=0');
  await t.waitFor('window.__jk && __jk.W.stats.frames > 20');
  await t.eval("localStorage.clear(); document.querySelector('#btnNew').click()");
  await t.sleep(2500);
  await t.eval('__jk.G.debugBuildAll()');
  await t.sleep(9000);
  const r = await t.eval(`(()=>{const out=[];let main=0,shadow=0;__jk.W.scene.traverse(o=>{if(!o.isMesh||!o.visible)return;let p=o.parent,vis=true;while(p){if(!p.visible)vis=false;p=p.parent;}if(!vis)return;const g=o.geometry;const n=(g.index?g.index.count:g.attributes.position.count)/3;const inst=o.isInstancedMesh?o.count:1;const tot=Math.round(n*inst);main+=tot;if(o.castShadow)shadow+=tot;out.push([o.isInstancedMesh?'inst':'mesh', Math.round(n), inst, tot, o.castShadow?'그림자':'']);});out.sort((a,b)=>b[3]-a[3]);return {main,shadow,top:out.slice(0,16)};})()`);
  console.log('본 패스', r.main, '그림자 패스(그리는 물체)', r.shadow);
  for (const x of r.top) console.log(x.join('\t'));
}
