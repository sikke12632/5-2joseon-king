// regress.mjs — 시험을 차례로 모두 돌리고 ✘·실패만 모아 보여 준다(배포 전 확인용)
//   node tools/regress.mjs                 # 기능 시험 전부 + 삼각형 예산 + 무음 돌발 통계(짧게)
//   node tools/regress.mjs event-test king-test   # 고른 시험만
//   그래픽 칩이 멈춘 때(창이 잠김 등)는 SOFTGL=1 을 앞에 붙인다. OUT=폴더 를 주면 화면을 찍는다.
//   정적 서버를 먼저 켠다: python -m http.server 8643 --bind 127.0.0.1
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const ALL = ['event-test', 'route-test', 'king-test', 'diff-test', 'crisis-test', 'text-test', 'branch-test', 'true-test', 'more-test', 'grain-test', 't01-test', 'intro-shots', 'tris-max', 'event-sim', 'sejong-test', 'sejong-route-test', 'seonjo-test'];
const pick = process.argv.slice(2);
const list = pick.length ? pick : ALL;
const env = (name) => {
  const e = Object.assign({}, process.env);
  if (name === 'tris-max') e.Q = e.Q || 'normal';
  if (name === 'event-sim') Object.assign(e, { N: e.N || '6', STRAT: e.STRAT || 'random', DIFFS: e.DIFFS || 'normal,annals' });
  return e;
};
let pass = 0,
  fail = 0;
const bad = [];
for (const name of list) {
  const t0 = Date.now();
  const r = spawnSync(process.execPath, [join(ROOT, 'tools', 'cdp.mjs'), join(ROOT, 'tools', name + '.mjs')], { cwd: ROOT, env: env(name), encoding: 'utf8', timeout: 15 * 60 * 1000 });
  const out = (r.stdout || '') + (r.stderr || '');
  const lines = out.split(/\r?\n/);
  const ok = lines.filter((l) => l.includes('✔')).length;
  const ng = lines.filter((l) => l.includes('✘') || /^실패:|\[exception\]/.test(l));
  pass += ok;
  fail += ng.length;
  console.log(`${ng.length ? '✘' : '✔'} ${name}  (✔ ${ok}${ng.length ? ` · ✘ ${ng.length}` : ''}, ${Math.round((Date.now() - t0) / 1000)}초)`);
  for (const l of ng) {
    console.log('    ' + l.trim());
    bad.push(name + ': ' + l.trim());
  }
  if (name === 'tris-max' || name === 'event-sim') for (const l of lines.filter((x) => /^\[(normal|high)\]|^(normal|annals|sage|sprout) \{/.test(x))) console.log('    ' + l.slice(0, 220));
}
console.log(`\n모두 ✔ ${pass} · ✘ ${fail}`);
process.exit(fail ? 1 : 0);
