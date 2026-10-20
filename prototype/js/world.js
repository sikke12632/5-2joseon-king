/* world.js — 구름 위 미니어처 섬, 하늘, 사람들, 짓기 연출, 후처리(틸트시프트·수묵), 화질 단계 */
(function () {
  'use strict';
  const JK = window.JK;
  const T = THREE;
  const { lerp, clamp, smooth } = JK;
  const W = (JK.World = {});

  /* ================= 화질 단계 ================= */
  const TIERS = {
    high: { name: '높음', pr: 1.5, msaa: 4, shadow: 2048, softShadow: true, blur: 2, tilt: true, walkers: 80, clouds: 0.9, bloom: true },
    normal: { name: '보통', pr: 1.0, msaa: 0, shadow: 1024, blur: 4, tilt: true, walkers: 64, clouds: 0.8, bloom: true },
    low: { name: '낮음', pr: 0.8, msaa: 0, shadow: 0, blur: 4, tilt: false, walkers: 36, clouds: 0.55, bloom: false },
  };
  W.TIERS = TIERS;

  /* ================= 땅 모양 ================= */
  const MOUNTS = [
    [0.3, -7.4, 3.0, 1.45], // 북쪽 큰 산
    [-6.9, -2.5, 2.0, 1.3], // 서쪽 산
    [7.5, -3.2, 1.05, 1.05], // 동쪽 낮은 산
    [2.9, 6.25, 1.4, 1.1], // 남쪽 산
    [-8.0, 4.2, 0.8, 0.9],
    [6.6, 5.6, 0.6, 0.9],
  ];
  function rimR(a) {
    return 9.6 + 0.32 * Math.sin(a * 3 + 1) + 0.22 * Math.sin(a * 7 + 2) + 0.18 * (JK.noise2(Math.cos(a) * 3 + 5, Math.sin(a) * 3 + 5) - 0.5);
  }
  // 성곽 고리(타원)
  const RING = { cx: 0, cz: -0.4, rx: 7.1, rz: 6.3 };
  const ringPt = (phi) => [RING.cx + RING.rx * Math.cos(phi), RING.cz + RING.rz * Math.sin(phi)];
  const ringNorm = (x, z) => Math.hypot((x - RING.cx) / RING.rx, (z - RING.cz) / RING.rz);
  const GATES = { sungnye: 1.95, heungin: 0.2 };
  const gatePos = {};
  for (const k in GATES) gatePos[k] = ringPt(GATES[k]);
  // 강(남쪽 가장자리를 따라 흐르다 동남쪽 끝에서 폭포가 된다)
  const RIVER = [];
  (function () {
    for (let i = 0; i <= 26; i++) {
      const phi = 2.75 - (i / 26) * (2.75 - 0.72);
      const rr = 8.05 + 0.18 * Math.sin(i * 0.7);
      RIVER.push([Math.cos(phi) * rr, Math.sin(phi) * rr]);
    }
    const e = RIVER[RIVER.length - 1];
    const a = Math.atan2(e[1], e[0]);
    for (let k = 1; k <= 3; k++) {
      const rr = 8.05 + k * 0.6;
      RIVER.push([Math.cos(a - k * 0.02) * rr, Math.sin(a - k * 0.02) * rr]);
    }
  })();
  // 길
  const ROADS = [
    [
      [0, -1.15],
      [0, 1.3],
    ],
    [
      [-5.8, 1.35],
      [-2.5, 1.35],
      [0, 1.3],
      [3.5, 1.1],
      [gatePos.heungin[0], gatePos.heungin[1]],
      [9.3, 0.95],
    ],
    [
      [0, 1.3],
      [-1.25, 3.4],
      [gatePos.sungnye[0], gatePos.sungnye[1]],
      [-3.15, 7.3],
    ],
    [
      [4.1, 1.12],
      [4.1, -0.35],
    ],
  ];
  // 터(평평하게 고른 자리)
  const SITES = {
    gyeongbok: { x: 0, z: -3.1, hw: 2.45, hd: 1.95, h: 0.03 },
    jongmyo: { x: 4.1, z: -1.4, hw: 1.7, hd: 1.15, h: 0.03 },
  };
  function distSeg(px, pz, ax, az, bx, bz) {
    const dx = bx - ax,
      dz = bz - az;
    const t = clamp(((px - ax) * dx + (pz - az) * dz) / (dx * dx + dz * dz || 1), 0, 1);
    return Math.hypot(px - ax - dx * t, pz - az - dz * t);
  }
  function distPoly(px, pz, pts) {
    let d = 1e9;
    for (let i = 0; i < pts.length - 1; i++) d = Math.min(d, distSeg(px, pz, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]));
    return d;
  }
  const roadDist = (x, z) => {
    let d = 1e9;
    for (const r of ROADS) d = Math.min(d, distPoly(x, z, r));
    return d;
  };
  const riverDist = (x, z) => distPoly(x, z, RIVER);
  function rectMask(x, z, s, soft) {
    const dx = Math.abs(x - s.x) - s.hw,
      dz = Math.abs(z - s.z) - s.hd;
    const d = Math.max(dx, dz);
    return 1 - smooth(0, soft || 0.6, d);
  }
  function rawHeight(x, z) {
    let h = 0.07 * (JK.fbm(x * 0.33 + 3, z * 0.33 + 7) - 0.5);
    for (const m of MOUNTS) h += m[2] * Math.exp(-((x - m[0]) ** 2 + (z - m[1]) ** 2) / (2 * m[3] * m[3]));
    return h;
  }
  const gateH = {};
  for (const k in gatePos) gateH[k] = rawHeight(gatePos[k][0], gatePos[k][1]);
  function height(x, z) {
    const r = Math.hypot(x, z);
    const a = Math.atan2(z, x);
    const R = rimR(a);
    let h = rawHeight(x, z);
    for (const k in SITES) {
      const s = SITES[k];
      h = lerp(h, s.h, rectMask(x, z, s, 0.7));
    }
    for (const k in gatePos) {
      const g = gatePos[k];
      const d = Math.hypot(x - g[0], z - g[1]);
      h = lerp(h, gateH[k], 1 - smooth(0.55, 1.1, d));
    }
    const rd = riverDist(x, z);
    h -= 0.22 * (1 - smooth(0.18, 0.6, rd));
    h *= smooth(R + 0.02, R - 1.0, r);
    return h;
  }
  W.height = height;

  /* ================= 섬 지오메트리 ================= */
  const GC = {
    grass: JK.col('#a5d681'),
    grass2: JK.col('#8cc86c'),
    meadow: JK.col('#b5d986'),
    forest: JK.col('#6a9f5a'),
    rock: JK.col('#a9a594'),
    road: JK.col('#e0cda5'),
    yard: JK.col('#ddcfaa'),
    paddyA: JK.col('#bfe293'),
    paddyB: JK.col('#a5d6bf'),
    dike: JK.col('#7fb466'),
    sand: JK.col('#e8dab1'),
  };
  const _tc = new T.Color();
  function groundColor(x, z, h, out) {
    const n = JK.fbm(x * 0.5 + 11, z * 0.5 + 3);
    out.copy(GC.grass).lerp(GC.grass2, smooth(0.35, 0.7, n));
    out.lerp(GC.meadow, 0.35 * smooth(0.6, 0.85, JK.noise2(x * 1.3, z * 1.3)));
    // 산
    const mt = smooth(0.45, 1.4, h);
    out.lerp(GC.forest, mt * 0.85);
    out.lerp(GC.rock, smooth(1.9, 2.8, h) * 0.8);
    // 논
    const rn = ringNorm(x, z);
    const r = Math.hypot(x, z);
    const rd = riverDist(x, z);
    if (rn > 1.1 && r < rimR(Math.atan2(z, x)) - 0.8 && rd > 0.55 && h < 0.3 && (z > 2.2 || x < -6.2)) {
      const ca = 0.25,
        cs = Math.cos(ca),
        sn = Math.sin(ca);
      const u = (x * cs - z * sn) / 0.62,
        v = (x * sn + z * cs) / 0.5;
      const fu = u - Math.floor(u),
        fv = v - Math.floor(v);
      const edge = Math.min(fu, 1 - fu, fv, 1 - fv);
      const alt = (Math.floor(u) + Math.floor(v)) & 1;
      _tc.copy(alt ? GC.paddyA : GC.paddyB);
      if (edge < 0.08) _tc.copy(GC.dike);
      out.lerp(_tc, smooth(1.1, 1.2, rn) * (1 - smooth(0.2, 0.3, h)));
    }
    // 강가 모래
    out.lerp(GC.sand, 1 - smooth(0.32, 0.62, rd));
    // 터
    for (const k in SITES) out.lerp(GC.yard, rectMask(x, z, SITES[k], 0.12) * 0.85);
    // 길
    const dr = roadDist(x, z);
    out.lerp(GC.road, (1 - smooth(0.13, 0.2, dr)) * (1 - smooth(0.6, 1.2, h)));
    return out;
  }

  function buildIsland() {
    const NR = 50,
      NA = 150;
    const pos = [],
      colr = [],
      fx = [];
    const ringPts = [];
    for (let i = 0; i <= NR; i++) {
      const row = [];
      for (let j = 0; j < NA; j++) {
        const a = (j / NA) * Math.PI * 2 + (i % 2) * (Math.PI / NA);
        const R = rimR(a);
        const t = i / NR;
        const rr = R * Math.pow(t, 0.92);
        const x = Math.cos(a) * rr,
          z = Math.sin(a) * rr;
        row.push([x, height(x, z), z]);
      }
      ringPts.push(row);
    }
    const c = new T.Color();
    const pushV = (p) => {
      pos.push(p[0], p[1], p[2]);
      groundColor(p[0], p[2], p[1], c);
      colr.push(c.r, c.g, c.b);
      fx.push(0, 0, 0);
    };
    const center = [0, height(0, 0), 0];
    // 가운데
    for (let j = 0; j < NA; j++) {
      const a = ringPts[1][j],
        b = ringPts[1][(j + 1) % NA];
      pushV(center);
      pushV(b);
      pushV(a);
    }
    for (let i = 1; i < NR; i++) {
      const A = ringPts[i],
        B = ringPts[i + 1];
      const odd = i % 2;
      for (let j = 0; j < NA; j++) {
        const j1 = (j + 1) % NA;
        const a0 = A[j],
          a1 = A[j1];
        const b0 = B[j],
          b1 = B[j1];
        if (odd) {
          pushV(a0);
          pushV(a1);
          pushV(b1);
          pushV(a0);
          pushV(b1);
          pushV(b0);
        } else {
          pushV(a0);
          pushV(a1);
          pushV(b0);
          pushV(a1);
          pushV(b1);
          pushV(b0);
        }
      }
    }
    // 뒤집힌 순서 고치기: 위에서 보아 반시계가 되도록 (a는 각도 증가 방향 → 아래에서 볼 때 반시계)
    for (let i = 0; i < pos.length; i += 9) {
      // 법선 y가 음수면 두 점을 바꾼다
      const ax = pos[i],
        ay = pos[i + 1],
        az = pos[i + 2];
      const bx = pos[i + 3] - ax,
        by = pos[i + 4] - ay,
        bz = pos[i + 5] - az;
      const cx = pos[i + 6] - ax,
        cy = pos[i + 7] - ay,
        cz = pos[i + 8] - az;
      const ny = bz * cx - bx * cz;
      void by;
      void cy;
      if (ny < 0) {
        for (let k = 0; k < 3; k++) {
          const t = pos[i + 3 + k];
          pos[i + 3 + k] = pos[i + 6 + k];
          pos[i + 6 + k] = t;
          const tc = colr[i + 3 + k];
          colr[i + 3 + k] = colr[i + 6 + k];
          colr[i + 6 + k] = tc;
        }
      }
    }
    const topVerts = pos.length / 3;
    // 섬 아래 바위(지층)
    const strata = ['#7fb062', '#a87d53', '#c39563', '#8f6a4b', '#b08a5d', '#80624a', '#6c5444'].map((h) => JK.col(h));
    const depth = [-0.18, -0.75, -1.7, -2.9, -4.4, -6.0, -7.6];
    const fac = [1.005, 0.965, 0.87, 0.73, 0.56, 0.37, 0.17];
    const rim = ringPts[NR];
    const under = [rim.map((p) => [p[0], p[1], p[2]])];
    for (let k = 0; k < depth.length; k++) {
      const row = [];
      for (let j = 0; j < NA; j++) {
        const p = rim[j];
        const a = Math.atan2(p[2], p[0]);
        const nn = JK.noise2(Math.cos(a) * 2.5 + k * 3.1, Math.sin(a) * 2.5 + k * 1.7);
        const f = fac[k] * (0.9 + 0.2 * nn);
        row.push([p[0] * f + 0.3 * (1 - fac[k]), depth[k] * (0.9 + 0.25 * nn), p[2] * f + 0.2 * (1 - fac[k])]);
      }
      under.push(row);
    }
    const tip = [0.4, -9.4, 0.3];
    const pushC = (p, cc) => {
      pos.push(p[0], p[1], p[2]);
      colr.push(cc.r, cc.g, cc.b);
      fx.push(0, 0, 0);
    };
    for (let k = 0; k < under.length - 1; k++) {
      const A = under[k],
        B = under[k + 1];
      const cc = k === 0 ? strata[0] : strata[k];
      for (let j = 0; j < NA; j++) {
        const j1 = (j + 1) % NA;
        // 바깥을 향하게
        pushC(A[j], cc);
        pushC(B[j], cc);
        pushC(A[j1], cc);
        pushC(A[j1], cc);
        pushC(B[j], cc);
        pushC(B[j1], cc);
      }
    }
    const last = under[under.length - 1];
    for (let j = 0; j < NA; j++) {
      pushC(last[j], strata[6]);
      pushC(tip, strata[6]);
      pushC(last[(j + 1) % NA], strata[6]);
    }
    const g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(pos, 3));
    const colorAttr = new T.Float32BufferAttribute(colr, 3);
    g.setAttribute('color', colorAttr);
    g.setAttribute('aFx', new T.Float32BufferAttribute(fx, 3));
    g.computeVertexNormals();
    g.computeBoundingSphere();
    // 바닥 접촉 그림자를 다시 칠할 때 쓸 원래 색
    g.userData.baseColor = new Float32Array(colr);
    g.userData.topVerts = topVerts;
    return g;
  }

  // 아래 바위의 감기 방향을 확인해 바깥을 보게 한다(한 번)
  function fixUnderWinding(g) {
    const p = g.attributes.position.array,
      c = g.attributes.color.array;
    for (let i = g.userData.topVerts * 3; i < p.length; i += 9) {
      const ax = p[i],
        ay = p[i + 1],
        az = p[i + 2];
      const ux = p[i + 3] - ax,
        uy = p[i + 4] - ay,
        uz = p[i + 5] - az;
      const vx = p[i + 6] - ax,
        vy = p[i + 7] - ay,
        vz = p[i + 8] - az;
      const nx = uy * vz - uz * vy,
        nz = ux * vy - uy * vx;
      const cx = (ax + p[i + 3] + p[i + 6]) / 3,
        cz = (az + p[i + 5] + p[i + 8]) / 3;
      if (nx * cx + nz * cz < 0) {
        for (let k = 0; k < 3; k++) {
          let t = p[i + 3 + k];
          p[i + 3 + k] = p[i + 6 + k];
          p[i + 6 + k] = t;
          t = c[i + 3 + k];
          c[i + 3 + k] = c[i + 6 + k];
          c[i + 6 + k] = t;
        }
      }
    }
    g.userData.baseColor = new Float32Array(c);
    g.computeVertexNormals();
  }

  // 강과 폭포
  function buildWater() {
    const b = new JK.Builder();
    const wc = JK.col('#6cc3d3');
    const n = RIVER.length;
    let acc = 0;
    const L = [],
      Rr = [],
      S = [];
    for (let i = 0; i < n - 3; i++) {
      const p = RIVER[i],
        q = RIVER[Math.min(i + 1, n - 1)],
        o = RIVER[Math.max(i - 1, 0)];
      const dx = q[0] - o[0],
        dz = q[1] - o[1];
      const len = Math.hypot(dx, dz) || 1;
      const w = 0.3 + 0.05 * Math.sin(i);
      const nx = (-dz / len) * w,
        nz = (dx / len) * w;
      if (i > 0) acc += Math.hypot(p[0] - RIVER[i - 1][0], p[1] - RIVER[i - 1][1]);
      L.push([p[0] - nx, -0.1, p[1] - nz]);
      Rr.push([p[0] + nx, -0.1, p[1] + nz]);
      S.push(acc);
    }
    // 끝은 가장자리까지
    for (let i = 0; i < L.length - 1; i++) {
      const f = (k, s, v) => [s, v, 4];
      b.quad(L[i], L[i + 1], Rr[i + 1], Rr[i], wc, f(0, S[i], 0), f(0, S[i + 1], 0), f(0, S[i + 1], 1), f(0, S[i], 1));
    }
    // 위에서 봐서 앞면이 되게 맞춘다
    const g0 = b.build();
    flipUp(g0);
    // 폭포
    const e = RIVER[RIVER.length - 4];
    const a = Math.atan2(e[1], e[0]);
    const R0 = rimR(a) - 0.25;
    const dirx = Math.cos(a),
      dirz = Math.sin(a);
    const tx = -dirz,
      tz = dirx;
    const fb = new JK.Builder();
    const fc = JK.col('#9fdcea');
    const rows = 14;
    const pts = [];
    for (let k = 0; k <= rows; k++) {
      const t = k / rows;
      const out = R0 + 0.15 + Math.sin(t * Math.PI * 0.5) * 1.4 + t * 0.6;
      const y = -0.1 - t * t * 8.5 - t * 0.6;
      const w = 0.32 + t * 0.35;
      pts.push({ x: dirx * out, z: dirz * out, y, w, d: t * 8 });
    }
    // 강물에서 폭포 꼭대기까지 잇기
    const lastL = L[L.length - 1],
      lastR = Rr[Rr.length - 1];
    const p0 = pts[0];
    const fxw = (u, v) => [u, v, 5];
    fb.quad(lastL, lastR, [p0.x + tx * p0.w, p0.y, p0.z + tz * p0.w], [p0.x - tx * p0.w, p0.y, p0.z - tz * p0.w], wc, [0, 0, 4], [1, 0, 4], fxw(1, 0), fxw(0, 0));
    for (let k = 0; k < rows; k++) {
      const p = pts[k],
        q = pts[k + 1];
      const A = [p.x - tx * p.w, p.y, p.z - tz * p.w],
        B = [p.x + tx * p.w, p.y, p.z + tz * p.w];
      const Cq = [q.x + tx * q.w, q.y, q.z + tz * q.w],
        D = [q.x - tx * q.w, q.y, q.z - tz * q.w];
      fb.quad(A, B, Cq, D, fc, fxw(0, p.d), fxw(1, p.d), fxw(1, q.d), fxw(0, q.d));
      fb.quad(B, A, D, Cq, fc, fxw(1, p.d), fxw(0, p.d), fxw(0, q.d), fxw(1, q.d));
    }
    const g1 = fb.build();
    return { river: g0, fall: g1, fallBottom: [pts[rows].x, pts[rows].y, pts[rows].z], fallTop: [p0.x, p0.y, p0.z] };
  }
  function flipUp(g) {
    const p = g.attributes.position.array;
    const arrs = [g.attributes.position.array, g.attributes.color.array, g.attributes.aFx.array];
    for (let i = 0; i < p.length; i += 9) {
      const ux = p[i + 3] - p[i],
        uz = p[i + 5] - p[i + 2];
      const vx = p[i + 6] - p[i],
        vz = p[i + 8] - p[i + 2];
      const ny = uz * vx - ux * vz;
      if (ny < 0)
        for (const a of arrs)
          for (let k = 0; k < 3; k++) {
            const t = a[i + 3 + k];
            a[i + 3 + k] = a[i + 6 + k];
            a[i + 6 + k] = t;
          }
    }
    g.computeVertexNormals();
  }

  /* ================= 하늘 ================= */
  const skyVert = `
    varying vec3 vDir;
    void main(){ vDir = normalize( position ); vec4 p = modelViewMatrix * vec4( position, 1.0 ); gl_Position = projectionMatrix * p; gl_Position.z = gl_Position.w * 0.9999; }`;
  const skyFrag = `
    uniform vec3 uTop, uHor, uBot, uSun, uSunCol, uInkTint; uniform float uTime;
    varying vec3 vDir;
    float h21( vec2 p ){ return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
    float vn( vec2 p ){ vec2 i = floor( p ), f = fract( p ); f = f*f*(3.0-2.0*f);
      return mix( mix( h21(i), h21(i+vec2(1,0)), f.x ), mix( h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x ), f.y ); }
    float fbm( vec2 p ){ return vn(p)*0.55 + vn(p*2.03+3.1)*0.3 + vn(p*4.1+7.7)*0.15; }
    void main(){
      vec3 d = normalize( vDir );
      float e = d.y;
      vec3 c = e > 0.0 ? mix( uHor, uTop, pow( clamp( e, 0.0, 1.0 ), 0.55 ) ) : mix( uHor, uBot, pow( clamp( -e, 0.0, 1.0 ), 0.45 ) );
      float az = atan( d.z, d.x );
      // 수묵 번짐: 큰 얼룩이 천천히 번진다
      vec2 q = vec2( az * 1.6, e * 4.0 ) + vec2( uTime * 0.004, 0.0 );
      float n = fbm( q * 1.3 ) ;
      float n2 = fbm( q * 3.1 + 9.0 );
      c = mix( c, c * 0.9 + uInkTint * 0.05, smoothstep( 0.52, 0.78, n ) * 0.55 );
      c += vec3( 0.03 ) * smoothstep( 0.6, 0.9, n2 );
      // 먼 산(산수화 겹산)
      float r1 = 0.035 + 0.075 * fbm( vec2( az * 2.2, 1.0 ) ) + 0.03 * vn( vec2( az * 9.0, 2.0 ) );
      float r2 = 0.015 + 0.05 * fbm( vec2( az * 3.4 + 4.0, 3.0 ) );
      vec3 m1 = mix( uHor, uInkTint, 0.28 ), m2 = mix( uHor, uInkTint, 0.45 );
      c = mix( c, m1, smoothstep( r1 + 0.004, r1 - 0.004, e ) * smoothstep( -0.12, 0.0, e ) );
      c = mix( c, m2, smoothstep( r2 + 0.004, r2 - 0.004, e ) * smoothstep( -0.1, 0.0, e ) );
      // 해
      float s = max( dot( d, normalize( uSun ) ), 0.0 );
      c += uSunCol * ( pow( s, 6.0 ) * 0.25 + pow( s, 90.0 ) * 0.6 + smoothstep( 0.9993, 0.9996, s ) * 1.2 );
      gl_FragColor = vec4( c, 1.0 );
    }`;

  /* ================= 후처리 ================= */
  const quadVert = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4( position.xy, 0.0, 1.0 ); }`;
  const blurFrag = `
    uniform sampler2D tSrc; uniform vec2 uDir; varying vec2 vUv;
    void main(){
      vec3 c = texture2D( tSrc, vUv ).rgb * 0.227027;
      c += texture2D( tSrc, vUv + uDir * 1.3846 ).rgb * 0.3162162;
      c += texture2D( tSrc, vUv - uDir * 1.3846 ).rgb * 0.3162162;
      c += texture2D( tSrc, vUv + uDir * 3.2308 ).rgb * 0.0702703;
      c += texture2D( tSrc, vUv - uDir * 3.2308 ).rgb * 0.0702703;
      gl_FragColor = vec4( c, 1.0 );
    }`;
  const compFrag = `
    uniform sampler2D tScene, tBlur; uniform vec2 uTexel; uniform float uTilt, uFocusY, uInk, uBloom, uTime, uFlash, uAspect;
    varying vec2 vUv;
    float h21( vec2 p ){ return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453 ); }
    float vn( vec2 p ){ vec2 i = floor( p ), f = fract( p ); f = f*f*(3.0-2.0*f);
      return mix( mix( h21(i), h21(i+vec2(1,0)), f.x ), mix( h21(i+vec2(0,1)), h21(i+vec2(1,1)), f.x ), f.y ); }
    float fbm( vec2 p ){ return vn(p)*0.5 + vn(p*2.1+3.1)*0.3 + vn(p*4.3+7.7)*0.2; }
    vec3 toS( vec3 c ){ return pow( max( c, 0.0 ), vec3( 1.0 / 2.2 ) ); }
    float lum( vec3 c ){ return dot( c, vec3( 0.299, 0.587, 0.114 ) ); }
    uniform float uFxaa;
    // 가벼운 FXAA: 가장자리만 골라 이웃과 섞는다
    vec3 fxaa( vec2 uv ){
      vec3 rgbM = texture2D( tScene, uv ).rgb;
      vec3 rgbNW = texture2D( tScene, uv + vec2( -1.0, -1.0 ) * uTexel ).rgb;
      vec3 rgbNE = texture2D( tScene, uv + vec2( 1.0, -1.0 ) * uTexel ).rgb;
      vec3 rgbSW = texture2D( tScene, uv + vec2( -1.0, 1.0 ) * uTexel ).rgb;
      vec3 rgbSE = texture2D( tScene, uv + vec2( 1.0, 1.0 ) * uTexel ).rgb;
      vec3 L = vec3( 0.299, 0.587, 0.114 );
      float lNW = dot( sqrt( rgbNW ), L ), lNE = dot( sqrt( rgbNE ), L ), lSW = dot( sqrt( rgbSW ), L ), lSE = dot( sqrt( rgbSE ), L ), lM = dot( sqrt( rgbM ), L );
      float lMin = min( lM, min( min( lNW, lNE ), min( lSW, lSE ) ) );
      float lMax = max( lM, max( max( lNW, lNE ), max( lSW, lSE ) ) );
      if ( lMax - lMin < max( 0.04, lMax * 0.12 ) ) return rgbM;
      vec2 dir = vec2( -( ( lNW + lNE ) - ( lSW + lSE ) ), ( lNW + lSW ) - ( lNE + lSE ) );
      float red = max( ( lNW + lNE + lSW + lSE ) * 0.03125, 0.0078125 );
      float rcp = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + red );
      dir = clamp( dir * rcp, -8.0, 8.0 ) * uTexel;
      vec3 a = 0.5 * ( texture2D( tScene, uv + dir * ( 1.0 / 3.0 - 0.5 ) ).rgb + texture2D( tScene, uv + dir * ( 2.0 / 3.0 - 0.5 ) ).rgb );
      vec3 b = a * 0.5 + 0.25 * ( texture2D( tScene, uv - dir * 0.5 ).rgb + texture2D( tScene, uv + dir * 0.5 ).rgb );
      float lB = dot( sqrt( b ), L );
      return ( lB < lMin || lB > lMax ) ? a : b;
    }
    void main(){
      vec3 sharp = uFxaa > 0.5 ? fxaa( vUv ) : texture2D( tScene, vUv ).rgb;
      vec3 blur = texture2D( tBlur, vUv ).rgb;
      float dy = abs( vUv.y - uFocusY );
      float m = smoothstep( 0.16, 0.5, dy ) * uTilt;
      m = max( m, smoothstep( 0.45, 0.75, length( ( vUv - 0.5 ) * vec2( uAspect, 1.0 ) ) ) * uTilt * 0.8 );
      vec3 c = mix( sharp, blur, m );
      c += blur * uBloom * smoothstep( 0.55, 1.2, lum( blur ) ) * 0.45;
      vec3 s = toS( c );
      // 따뜻한 색 보정과 가장자리 어둡게
      s = mix( vec3( lum( s ) ), s, 1.08 );
      float v = smoothstep( 1.05, 0.35, length( ( vUv - 0.5 ) * vec2( 1.0, 0.9 ) ) );
      s *= mix( 0.86, 1.0, v );
      s += uFlash * 0.25;
      // 수묵화로 바뀌기
      if ( uInk > 0.001 ) {
        float L = lum( toS( sharp ) );
        float Lb = lum( toS( blur ) );
        float lx = lum( toS( texture2D( tScene, vUv + vec2( uTexel.x, 0.0 ) ).rgb ) ) - lum( toS( texture2D( tScene, vUv - vec2( uTexel.x, 0.0 ) ).rgb ) );
        float ly = lum( toS( texture2D( tScene, vUv + vec2( 0.0, uTexel.y ) ).rgb ) ) - lum( toS( texture2D( tScene, vUv - vec2( 0.0, uTexel.y ) ).rgb ) );
        float edge = smoothstep( 0.06, 0.22, length( vec2( lx, ly ) ) );
        float grain = fbm( vUv * vec2( uAspect, 1.0 ) * 180.0 );
        float wash = 1.0 - smoothstep( 0.18, 0.92, mix( L, Lb, 0.55 ) );
        wash = floor( wash * 4.0 + grain * 0.6 ) / 4.0 * 0.75 + wash * 0.25;
        float ink = clamp( wash * 0.85 + edge * 0.9, 0.0, 1.0 );
        vec3 paper = vec3( 0.95, 0.92, 0.85 ) - grain * 0.05;
        vec3 sumi = mix( paper, vec3( 0.09, 0.085, 0.1 ), ink );
        // 번짐이 가운데서 퍼져 나간다
        float spread = length( ( vUv - vec2( 0.5, 0.55 ) ) * vec2( uAspect, 1.0 ) ) + fbm( vUv * 6.0 ) * 0.35;
        float k = smoothstep( uInk * 1.9 - 0.25, uInk * 1.9, spread );
        float desat = clamp( uInk * 2.0, 0.0, 1.0 );
        vec3 gray = vec3( lum( s ) );
        vec3 faded = mix( s, gray * vec3( 1.0, 0.98, 0.95 ), desat * 0.85 );
        s = mix( sumi, faded, k );
      }
      gl_FragColor = vec4( s, 1.0 );
    }`;

  function makeRT(w, h, samples) {
    const rt = new T.WebGLRenderTarget(w, h, { samples: samples || 0, depthBuffer: true, stencilBuffer: false });
    rt.texture.colorSpace = T.SRGBColorSpace;
    rt.texture.generateMipmaps = false;
    return rt;
  }

  /* ================= 상태 ================= */
  let renderer, scene, camera, canvas;
  let sky, sun, hemi, islandMesh, islandGeo;
  let post = null;
  let tier = 'normal';
  let tierLocked = false;
  const meshes = {};
  const built = {};
  const anims = [];
  let shadowFrames = 0;
  const clock = { t: 0 };
  const view = { offX: 0, offY: 0, fit: 1 };
  const cam = {
    target: new T.Vector3(0, 0.2, -0.2),
    dist: 33,
    az: 0.3,
    el: 0.5,
    fov: 30,
    shake: 0,
    focus: new T.Vector3(),
    focusK: 0,
    orbit: 0,
  };
  const camFrom = {},
    camTo = {};
  let camT = 1,
    camDur = 1;
  W.state = { ink: 0, inkTarget: 0, tod: 0.1, todTarget: 0.1, people: 50, idle: false, title: true };

  /* ================= 초기화 ================= */
  W.init = function (cv, opts) {
    canvas = cv;
    renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: false, stencil: false, powerPreference: 'high-performance', preserveDrawingBuffer: !!opts.preserve });
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.shadowMap.autoUpdate = false;
    renderer.info.autoReset = false;
    W.renderer = renderer;

    scene = new T.Scene();
    W.scene = scene;
    scene.fog = new T.Fog(0xf3e3d3, 55, 150);
    camera = new T.PerspectiveCamera(30, 1, 1, 600);
    W.camera = camera;

    hemi = new T.HemisphereLight(0xcfe3ff, 0xe6d8b8, 1.0);
    scene.add(hemi);
    sun = new T.DirectionalLight(0xfff1d6, 2.2);
    sun.castShadow = true;
    sun.shadow.camera.left = -12.5;
    sun.shadow.camera.right = 12.5;
    sun.shadow.camera.top = 12.5;
    sun.shadow.camera.bottom = -12.5;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 80;
    sun.shadow.bias = -0.0006;
    sun.shadow.normalBias = 0.02;
    sun.shadow.mapSize.set(1024, 1024);
    scene.add(sun);
    scene.add(sun.target);

    // 하늘
    sky = new T.Mesh(
      new T.SphereGeometry(400, 32, 16),
      new T.ShaderMaterial({
        vertexShader: skyVert,
        fragmentShader: skyFrag,
        side: T.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new T.Color() },
          uHor: { value: new T.Color() },
          uBot: { value: new T.Color() },
          uSun: { value: new T.Vector3(1, 0.3, 0) },
          uSunCol: { value: new T.Color() },
          uInkTint: { value: new T.Color('#3a4660') },
          uTime: JK.U.uTime,
        },
      })
    );
    // 하늘은 불투명한 것들을 다 그린 뒤 빈 곳만 칠한다(깊이 시험으로 가려진 픽셀은 건너뜀)
    sky.renderOrder = 10;
    sky.frustumCulled = false;
    scene.add(sky);

    // 섬
    islandGeo = buildIsland();
    fixUnderWinding(islandGeo);
    islandMesh = new T.Mesh(islandGeo, JK.MAT);
    islandMesh.receiveShadow = true;
    islandMesh.castShadow = false;
    W.island = new T.Group();
    scene.add(W.island);
    W.island.add(islandMesh);

    const water = buildWater();
    const river = new T.Mesh(water.river, JK.MAT);
    river.receiveShadow = true;
    W.island.add(river);
    const fall = new T.Mesh(water.fall, JK.MAT);
    W.island.add(fall);
    W._fallBottom = water.fallBottom;

    buildBuildings();
    buildWall();
    buildHouses();
    buildTrees();
    buildClouds();
    buildPeople();
    buildFx();

    setupPost();
    W.setTier(opts.tier || 'normal', !!opts.tierLocked);
    applyTOD(W.state.tod);
    W.resize();
    window.addEventListener('resize', W.resize);

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      W.lost = true;
      if (W.onLost) W.onLost();
    });
    canvas.addEventListener('webglcontextrestored', () => {
      W.lost = false;
      setupPost();
      W.setTier(tier, tierLocked);
      shadowFrames = 3;
      if (W.onRestored) W.onRestored();
    });
    return W;
  };

  /* ================= 건물 배치 ================= */
  const BUILD_DEFS = {
    gyeongbok: { name: '경복궁', x: SITES.gyeongbok.x, z: SITES.gyeongbok.z, rot: 0, label: 2.2, shadowR: [2.4, 1.9] },
    jongmyo: { name: '종묘', x: SITES.jongmyo.x, z: SITES.jongmyo.z, rot: 0, label: 1.0, shadowR: [1.6, 1.05] },
    sungnye: { name: '숭례문', x: gatePos.sungnye[0], z: gatePos.sungnye[1], rot: 0, label: 1.4, shadowR: [0.7, 0.4] },
    heungin: { name: '흥인지문', x: gatePos.heungin[0], z: gatePos.heungin[1], rot: 0, label: 1.3, shadowR: [0.8, 0.8] },
  };
  W.BUILD_DEFS = BUILD_DEFS;
  // 성문은 성벽 방향에 맞춰 돌린다(앞 = 성 밖)
  for (const k of ['sungnye', 'heungin']) {
    const phi = GATES[k];
    const nx = Math.cos(phi) / RING.rx,
      nz = Math.sin(phi) / RING.rz;
    BUILD_DEFS[k].rot = Math.atan2(nx, nz);
  }
  function buildBuildings() {
    const geos = JK.buildModels();
    for (const k in BUILD_DEFS) {
      const d = BUILD_DEFS[k];
      const m = new T.Mesh(geos[k], JK.MAT);
      m.position.set(d.x, height(d.x, d.z) - 0.01, d.z);
      m.rotation.y = d.rot;
      m.castShadow = true;
      m.receiveShadow = true;
      m.visible = false;
      m.userData.baseY = m.position.y;
      W.island.add(m);
      meshes[k] = m;
    }
  }

  /* ================= 성곽 ================= */
  let wallMesh,
    wallData = [];
  function buildWall() {
    const geo = JK.wallSegment();
    const segs = [];
    const N = 900;
    let prev = ringPt(0),
      acc = 0;
    const pts = [];
    for (let i = 1; i <= N; i++) {
      const phi = (i / N) * Math.PI * 2;
      const p = ringPt(phi);
      acc += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
      prev = p;
      pts.push({ phi, s: acc, x: p[0], z: p[1] });
    }
    const total = acc;
    const step = 0.92;
    const n = Math.floor(total / step);
    let j = 0;
    for (let i = 0; i < n; i++) {
      const s = (i + 0.5) * (total / n);
      while (j < pts.length - 1 && pts[j].s < s) j++;
      const p = pts[j];
      let skip = false;
      for (const g in GATES) {
        let d = Math.abs(p.phi - GATES[g]);
        d = Math.min(d, Math.PI * 2 - d);
        if (d < 0.075) skip = true;
      }
      if (skip) continue;
      const a = ringPt(p.phi - 0.004),
        b = ringPt(p.phi + 0.004);
      const tx = b[0] - a[0],
        tz = b[1] - a[1];
      const ang = Math.atan2(tz, tx);
      const len = total / n;
      const h0 = height(p.x - (Math.cos(ang) * len) / 2, p.z - (Math.sin(ang) * len) / 2);
      const h1 = height(p.x + (Math.cos(ang) * len) / 2, p.z + (Math.sin(ang) * len) / 2);
      const hc = height(p.x, p.z);
      segs.push({ x: p.x, z: p.z, y: Math.min(hc, (h0 + h1) / 2), ang, pitch: Math.atan2(h1 - h0, len), len, phi: p.phi });
    }
    wallMesh = new T.InstancedMesh(geo, JK.MAT, segs.length);
    wallMesh.castShadow = true;
    wallMesh.receiveShadow = true;
    const m = new T.Matrix4(),
      q = new T.Quaternion(),
      e = new T.Euler(),
      sc = new T.Vector3(),
      ps = new T.Vector3();
    segs.forEach((s, i) => {
      // 바깥쪽(+z 로컬)이 고리 밖을 보도록 y 회전 = -ang
      e.set(0, -s.ang, s.pitch, 'YXZ');
      q.setFromEuler(e);
      ps.set(s.x, s.y, s.z);
      sc.set((s.len / 1.0) * 1.04, 1, 1);
      s.q = q.clone();
      s.sc = sc.clone();
      m.compose(ps, q, sc.set(0.0001, 0.0001, 0.0001));
      wallMesh.setMatrixAt(i, m);
    });
    wallMesh.visible = false;
    W.island.add(wallMesh);
    wallData = segs;
    meshes.wall = wallMesh;
  }

  /* ================= 집 ================= */
  let chogaMesh, giwaMesh;
  const houseData = { choga: [], giwa: [] };
  function buildHouses() {
    const rnd = JK.rng(7);
    const cand = [];
    for (let x = -6.6; x <= 6.6; x += 0.86) {
      for (let z = -5.6; z <= 5.8; z += 0.74) {
        const px = x + (rnd() - 0.5) * 0.4,
          pz = z + (rnd() - 0.5) * 0.3;
        if (ringNorm(px, pz) > 0.86) continue;
        let bad = false;
        for (const k in SITES) if (rectMask(px, pz, { ...SITES[k], hw: SITES[k].hw + 0.35, hd: SITES[k].hd + 0.35 }, 0.01) > 0.5) bad = true;
        for (const k in gatePos) if (Math.hypot(px - gatePos[k][0], pz - gatePos[k][1]) < 1.2) bad = true;
        if (bad) continue;
        const rd = roadDist(px, pz);
        if (rd < 0.48) continue;
        const h = height(px, pz);
        if (h > 0.45) continue;
        const sl = Math.abs(height(px + 0.3, pz) - height(px - 0.3, pz)) + Math.abs(height(px, pz + 0.3) - height(px, pz - 0.3));
        if (sl > 0.18) continue;
        cand.push({ x: px, z: pz, h, rd });
      }
    }
    // 종로와 궁궐 가까이는 기와집, 바깥쪽은 초가
    for (const c of cand) {
      const nearMain = Math.abs(c.z - 1.3) < 1.5 && c.x > -3.4 && c.x < 5.6;
      const nearPalace = c.z < -0.6 && Math.abs(c.x) < 3.2;
      const isGiwa = (nearMain || nearPalace) && rnd() < 0.85;
      // 길을 보도록 돌림
      let best = 1e9,
        dir = 0;
      for (let a = 0; a < 4; a++) {
        const ang = (a * Math.PI) / 2;
        const fx = c.x + Math.sin(ang) * 0.6,
          fz = c.z + Math.cos(ang) * 0.6;
        const d = roadDist(fx, fz) + (a === 0 ? -0.15 : 0);
        if (d < best) {
          best = d;
          dir = ang;
        }
      }
      c.rot = dir + (rnd() - 0.5) * 0.25;
      c.s = 0.92 + rnd() * 0.16;
      (isGiwa ? houseData.giwa : houseData.choga).push(c);
    }
    // 성 밖 논가 초가 몇 채
    const extra = [
      [-4.6, 7.0],
      [-5.6, 6.2],
      [-1.2, 7.4],
      [0.6, 7.3],
      [-7.8, 1.4],
      [-7.6, 0.3],
    ];
    for (const [x, z] of extra) houseData.choga.push({ x, z, h: height(x, z), rot: Math.atan2(-x, -z) * 0 + rnd() * 0.5, s: 0.9 });
    // 너무 많으면 줄인다
    houseData.choga = houseData.choga.slice(0, 40);
    houseData.giwa = houseData.giwa.slice(0, 30);
    chogaMesh = makeHouseMesh(JK.chogaHouse(), houseData.choga);
    giwaMesh = makeHouseMesh(JK.giwaHouse(), houseData.giwa);
    meshes.choga = chogaMesh;
    meshes.giwa = giwaMesh;
  }
  const _hm = new T.Matrix4(),
    _hq = new T.Quaternion(),
    _hs = new T.Vector3(),
    _hp = new T.Vector3(),
    _he = new T.Euler();
  function setHouseMatrix(mesh, i, d, sxz, sy) {
    _he.set(0, d.rot, 0);
    _hq.setFromEuler(_he);
    _hp.set(d.x, height(d.x, d.z) - 0.02, d.z);
    _hs.set(d.s * sxz, d.s * sy, d.s * sxz);
    _hm.compose(_hp, _hq, _hs);
    mesh.setMatrixAt(i, _hm);
  }
  function makeHouseMesh(geo, list) {
    const m = new T.InstancedMesh(geo, JK.MAT, list.length);
    m.castShadow = true;
    m.receiveShadow = true;
    list.forEach((d, i) => setHouseMatrix(m, i, d, 0.0001, 0.0001));
    m.visible = false;
    W.island.add(m);
    return m;
  }

  /* ================= 나무 ================= */
  function buildTrees() {
    const rnd = JK.rng(21);
    const pine = [],
      round = [],
      bush = [];
    const blocked = (x, z, pad) => {
      if (Math.hypot(x, z) > rimR(Math.atan2(z, x)) - 0.45) return true;
      if (roadDist(x, z) < 0.3 + pad) return true;
      if (riverDist(x, z) < 0.5) return true;
      if (Math.abs(ringNorm(x, z) - 1) < 0.045 + pad * 0.05) return true;
      for (const k in SITES) if (rectMask(x, z, { ...SITES[k], hw: SITES[k].hw + 0.2, hd: SITES[k].hd + 0.2 }, 0.01) > 0.5) return true;
      for (const k in gatePos) if (Math.hypot(x - gatePos[k][0], z - gatePos[k][1]) < 1.0) return true;
      for (const t of ['choga', 'giwa']) for (const d of houseData[t]) if (Math.hypot(x - d.x, z - d.z) < 0.5 + pad) return true;
      return false;
    };
    for (let i = 0; i < 1400 && (pine.length < 95 || round.length < 46 || bush.length < 70); i++) {
      const a = rnd() * Math.PI * 2,
        r = Math.sqrt(rnd()) * 9.4;
      const x = Math.cos(a) * r,
        z = Math.sin(a) * r;
      const h = height(x, z);
      if (blocked(x, z, 0)) continue;
      const inCity = ringNorm(x, z) < 0.95;
      if (h > 0.5 && rnd() < 0.75) {
        if (pine.length < 95) pine.push({ x, z, h, s: 0.8 + rnd() * 0.6 });
        else if (bush.length < 70 && rnd() < 0.5) bush.push({ x, z, h, s: 0.9 + rnd() * 0.6, flower: true });
      } else if (!inCity || rnd() < 0.18) {
        if (rnd() < 0.5 && round.length < 46) round.push({ x, z, h, s: 0.7 + rnd() * 0.5 });
        else if (bush.length < 70) bush.push({ x, z, h, s: 0.8 + rnd() * 0.5, flower: rnd() < 0.5 });
      }
    }
    const greens = ['#3f7d4f', '#467f4c', '#356e48', '#4d8a55'].map((c) => JK.col(c));
    const lightG = ['#79b25e', '#8cbf62', '#6aa65a', '#9cc66b'].map((c) => JK.col(c));
    const flowers = ['#ef8db3', '#f3a0c0', '#f2cf4d', '#e97aa6', '#f6dc6a'].map((c) => JK.col(c));
    const mk = (geo, list, colorFn) => {
      const m = new T.InstancedMesh(geo, JK.MAT, list.length);
      const mat = new T.Matrix4(),
        q = new T.Quaternion(),
        e = new T.Euler();
      list.forEach((d, i) => {
        e.set(0, rnd() * Math.PI * 2, 0);
        q.setFromEuler(e);
        mat.compose(new T.Vector3(d.x, d.h - 0.03, d.z), q, new T.Vector3(d.s, d.s, d.s));
        m.setMatrixAt(i, mat);
        m.setColorAt(i, colorFn(d));
      });
      m.castShadow = true;
      m.receiveShadow = true;
      W.island.add(m);
      return m;
    };
    meshes.pine = mk(JK.pineTree(), pine, () => greens[Math.floor(rnd() * greens.length)]);
    meshes.round = mk(JK.roundTree(), round, () => lightG[Math.floor(rnd() * lightG.length)]);
    meshes.bush = mk(JK.bush(), bush, (d) => (d.flower ? flowers : lightG)[Math.floor(rnd() * (d.flower ? flowers.length : lightG.length))]);
    meshes.bush.castShadow = false;
  }

  /* ================= 구름·떠 있는 바위·새 ================= */
  let cloudMesh, cloudCountFull, isletMesh, birdMesh;
  const isletData = [],
    birdData = [];
  function buildClouds() {
    const rnd = JK.rng(5);
    const list = [];
    // 구름 바다 (섬보다 한참 아래)
    for (let i = 0; i < 100; i++) {
      const a = rnd() * Math.PI * 2;
      const r = 11 + Math.pow(rnd(), 0.75) * 62;
      const s = 2.4 + rnd() * 2.6 + r * 0.06;
      list.push({ x: Math.cos(a) * r, y: -5.6 - rnd() * 2.2 - r * 0.03, z: Math.sin(a) * r, s, sy: 0.5 + rnd() * 0.25 });
    }
    // 섬 바로 밑 구름
    for (let i = 0; i < 14; i++) {
      const a = rnd() * Math.PI * 2,
        r = 3 + rnd() * 7;
      list.push({ x: Math.cos(a) * r, y: -8.2 - rnd() * 1.5, z: Math.sin(a) * r, s: 2 + rnd() * 1.6, sy: 0.55 });
    }
    // 폭포 물안개
    const fb = W._fallBottom;
    for (let i = 0; i < 4; i++) list.push({ x: fb[0] + (rnd() - 0.5) * 1.4, y: fb[1] + rnd() * 0.6, z: fb[2] + (rnd() - 0.5) * 1.4, s: 0.6 + rnd() * 0.5, sy: 0.8 });
    // 높이 떠 있는 작은 구름 (섬 뒤쪽)
    for (let i = 0; i < 8; i++) {
      const a = -Math.PI / 2 + (rnd() - 0.5) * 2.6;
      const r = 16 + rnd() * 12;
      list.push({ x: Math.cos(a) * r, y: 1.5 + rnd() * 4, z: Math.sin(a) * r, s: 1.0 + rnd() * 1.2, sy: 0.6 });
    }
    // 크기가 큰 것을 앞에 두어 화질 낮음에서 개수를 줄일 때 큰 덩어리부터 남긴다
    const tints = ['#ffffff', '#fdf7ff', '#fff6ee', '#f7f4ff', '#ffffff'].map((c) => JK.col(c));
    W.cloudMat = new T.MeshLambertMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.35 });
    cloudMesh = new T.InstancedMesh(JK.cloudPuff(), W.cloudMat, list.length);
    const m = new T.Matrix4(),
      q = new T.Quaternion(),
      e = new T.Euler();
    list.sort((A, B) => B.s - A.s);
    list.forEach((d, i) => {
      e.set(0, rnd() * 6.28, 0);
      q.setFromEuler(e);
      m.compose(new T.Vector3(d.x, d.y, d.z), q, new T.Vector3(d.s, d.s * d.sy, d.s * (0.8 + rnd() * 0.4)));
      cloudMesh.setMatrixAt(i, m);
      cloudMesh.setColorAt(i, tints[i % tints.length]);
    });
    cloudCountFull = list.length;
    W.clouds = new T.Group();
    W.clouds.add(cloudMesh);
    scene.add(W.clouds);

    // 떠 있는 작은 섬
    isletMesh = new T.InstancedMesh(JK.islet(), JK.MAT, 7);
    for (let i = 0; i < 7; i++) {
      const a = 0.4 + i * 0.95 + rnd() * 0.3,
        r = 12.5 + rnd() * 4;
      isletData.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, y: -1.5 + rnd() * 3, s: 0.6 + rnd() * 0.9, ph: rnd() * 6 });
    }
    scene.add(isletMesh);
    // 새
    birdMesh = new T.InstancedMesh(JK.bird(), JK.MAT, 7);
    for (let i = 0; i < 7; i++) birdData.push({ r: 10.5 + rnd() * 3, y: 3.2 + rnd() * 1.6, ph: (i < 4 ? 0 : 2.6) + i * 0.13, sp: 0.09 + rnd() * 0.02, fl: rnd() * 6 });
    birdMesh.frustumCulled = false;
    scene.add(birdMesh);
  }

  /* ================= 사람들 ================= */
  const PATHS = [];
  let dollMesh,
    hatMeshes = {};
  const walkers = [];
  const HAT_KINDS = ['gat', 'paeraengi', 'topknot', 'bun'];
  function buildPeople() {
    // 길 → 촘촘한 점과 높이
    const toPath = (pts) => {
      const out = [];
      let acc = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i],
          b = pts[i + 1];
        const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const n = Math.max(1, Math.ceil(L / 0.1));
        for (let k = 0; k < n; k++) {
          const t = k / n;
          const x = lerp(a[0], b[0], t),
            z = lerp(a[1], b[1], t);
          out.push({ x, z, y: height(x, z), s: acc + L * t });
        }
        acc += L;
      }
      const e = pts[pts.length - 1];
      out.push({ x: e[0], z: e[1], y: height(e[0], e[1]), s: acc });
      return { pts: out, len: acc };
    };
    for (const r of ROADS) PATHS.push(toPath(r));
    // 논두렁 길
    PATHS.push(
      toPath([
        [-3.15, 7.3],
        [-5.2, 6.4],
        [-6.9, 4.6],
      ])
    );
    PATHS.push(
      toPath([
        [gatePos.heungin[0], gatePos.heungin[1]],
        [8.3, 3.2],
        [7.2, 6.0],
      ])
    );
    const rnd = JK.rng(11);
    const MAX = 80;
    dollMesh = new T.InstancedMesh(JK.walkerDoll(), JK.MAT, MAX);
    dollMesh.castShadow = false;
    dollMesh.receiveShadow = true;
    W.island.add(dollMesh);
    for (const k of HAT_KINDS) {
      const hm = new T.InstancedMesh(JK.walkerHat(k), JK.MAT, MAX);
      hm.count = 0;
      hm.receiveShadow = true;
      W.island.add(hm);
      hatMeshes[k] = hm;
    }
    const clothes = {
      gat: ['#d7e8e0', '#e9eef0', '#c9dcea', '#e7e1f0'],
      paeraengi: ['#a8774f', '#b88a5b', '#8f6a4a', '#c39a6a'],
      topknot: ['#efe8d8', '#e6dcc6', '#f2ede2', '#ddd2bb'],
      bun: ['#e98f8f', '#f2c86b', '#9cc9a8', '#efa3b8', '#f3e9d8'],
    };
    for (let i = 0; i < MAX; i++) {
      const r = rnd();
      const hat = r < 0.18 ? 'gat' : r < 0.42 ? 'paeraengi' : r < 0.75 ? 'topknot' : 'bun';
      const p = Math.floor(rnd() * PATHS.length);
      const list = clothes[hat];
      walkers.push({
        path: p,
        s: rnd() * PATHS[p].len,
        dir: rnd() < 0.5 ? 1 : -1,
        sp: 0.22 + rnd() * 0.16,
        off: (rnd() - 0.5) * 0.24,
        hat,
        ph: rnd() * 10,
        color: JK.col(list[Math.floor(rnd() * list.length)]),
        idle: rnd() < 0.12,
        sc: 0.32 + rnd() * 0.04,
      });
    }
    dollMesh.count = 0;
  }
  const _wm = new T.Matrix4(),
    _wq = new T.Quaternion(),
    _we = new T.Euler(),
    _wp = new T.Vector3(),
    _ws = new T.Vector3();
  const hatIdx = { gat: 0, paeraengi: 0, topknot: 0, bun: 0 };
  let colorsSet = false;
  function updatePeople(dt, t) {
    const tierMax = TIERS[tier].walkers;
    const want = Math.round(clamp(8 + W.state.people * 0.7, 6, tierMax));
    // 사람 수는 부드럽게 바뀐다
    W._walkN = W._walkN === undefined ? want : W._walkN + clamp(want - W._walkN, -dt * 12, dt * 12);
    const n = Math.round(W._walkN);
    for (const k in hatIdx) hatIdx[k] = 0;
    for (let i = 0; i < n; i++) {
      const w = walkers[i];
      const P = PATHS[w.path];
      if (!w.idle) {
        w.s += w.dir * w.sp * dt;
        if (w.s > P.len) {
          w.s = P.len;
          w.dir = -1;
        } else if (w.s < 0) {
          w.s = 0;
          w.dir = 1;
        }
      }
      const pts = P.pts;
      let lo = 0,
        hi = pts.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (pts[mid].s < w.s) lo = mid;
        else hi = mid;
      }
      const a = pts[lo],
        b = pts[hi];
      const f = clamp((w.s - a.s) / (b.s - a.s || 1), 0, 1);
      const dx = b.x - a.x,
        dz = b.z - a.z;
      const L = Math.hypot(dx, dz) || 1;
      const nx = -dz / L,
        nz = dx / L;
      const x = lerp(a.x, b.x, f) + nx * w.off,
        z = lerp(a.z, b.z, f) + nz * w.off;
      const ph = t * 9 * w.sp * 3 + w.ph;
      const bob = w.idle ? Math.abs(Math.sin(t * 2 + w.ph)) * 0.015 : Math.abs(Math.sin(ph)) * 0.045;
      const y = lerp(a.y, b.y, f) + bob;
      const face = Math.atan2(dx * w.dir, dz * w.dir);
      _we.set(0, w.idle ? w.ph : face, w.idle ? 0 : Math.sin(ph) * 0.12, 'YXZ');
      _wq.setFromEuler(_we);
      _wp.set(x, y, z);
      _ws.set(w.sc, w.sc, w.sc);
      _wm.compose(_wp, _wq, _ws);
      dollMesh.setMatrixAt(i, _wm);
      if (!colorsSet) dollMesh.setColorAt(i, w.color);
      const hm = hatMeshes[w.hat];
      hm.setMatrixAt(hatIdx[w.hat]++, _wm);
    }
    if (!colorsSet) {
      for (let i = n; i < walkers.length; i++) dollMesh.setColorAt(i, walkers[i].color);
      dollMesh.instanceColor.needsUpdate = true;
      colorsSet = true;
    }
    dollMesh.count = n;
    dollMesh.instanceMatrix.needsUpdate = true;
    for (const k in hatMeshes) {
      hatMeshes[k].count = hatIdx[k];
      hatMeshes[k].instanceMatrix.needsUpdate = true;
    }
  }

  /* ================= 먼지·충격파·이름표 ================= */
  let dust, ring;
  const DUST_N = 220;
  let dustHead = 0;
  function buildFx() {
    const g = new T.BufferGeometry();
    const p = new Float32Array(DUST_N * 3),
      v = new Float32Array(DUST_N * 3),
      t0 = new Float32Array(DUST_N);
    t0.fill(-100);
    g.setAttribute('position', new T.BufferAttribute(p, 3));
    g.setAttribute('aVel', new T.BufferAttribute(v, 3));
    g.setAttribute('aT0', new T.BufferAttribute(t0, 1));
    g.boundingSphere = new T.Sphere(new T.Vector3(), 50);
    dust = new T.Points(
      g,
      new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: JK.U.uTime, uScale: { value: 300 }, uColor: { value: new T.Color('#f3e6c8') } },
        vertexShader: `
          attribute vec3 aVel; attribute float aT0; uniform float uTime, uScale; varying float vA;
          void main(){
            float t = uTime - aT0;
            float life = 1.1;
            vA = t < 0.0 || t > life ? 0.0 : ( 1.0 - t / life );
            vec3 p = position + aVel * ( 1.0 - exp( -t * 3.0 ) ) / 3.0 + vec3( 0.0, t * 0.25, 0.0 );
            vec4 mv = modelViewMatrix * vec4( p, 1.0 );
            gl_Position = projectionMatrix * mv;
            gl_PointSize = vA > 0.0 ? uScale * ( 0.09 + 0.16 * ( 1.0 - vA ) ) / -mv.z : 0.0;
          }`,
        fragmentShader: `
          uniform vec3 uColor; varying float vA;
          void main(){ vec2 d = gl_PointCoord - 0.5; float r = length( d ); if ( r > 0.5 ) discard;
            gl_FragColor = vec4( pow( uColor, vec3( 2.2 ) ), vA * 0.8 * smoothstep( 0.5, 0.15, r ) ); }`,
      })
    );
    dust.frustumCulled = false;
    W.island.add(dust);
    ring = new T.Mesh(new T.RingGeometry(0.9, 1.0, 48), new T.MeshBasicMaterial({ color: 0xfff6dc, transparent: true, opacity: 0, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    W.island.add(ring);
  }
  function burst(x, y, z, n, spread, power) {
    const g = dust.geometry;
    const P = g.attributes.position,
      V = g.attributes.aVel,
      T0 = g.attributes.aT0;
    for (let i = 0; i < n; i++) {
      const k = dustHead;
      dustHead = (dustHead + 1) % DUST_N;
      const a = Math.random() * Math.PI * 2,
        r = Math.random() * spread;
      P.setXYZ(k, x + Math.cos(a) * r, y + 0.05, z + Math.sin(a) * r);
      const sp = (0.6 + Math.random()) * power;
      V.setXYZ(k, Math.cos(a) * sp, 0.3 + Math.random() * 0.7 * power, Math.sin(a) * sp);
      T0.setX(k, clock.t + Math.random() * 0.06);
    }
    P.needsUpdate = V.needsUpdate = T0.needsUpdate = true;
  }
  let ringAnim = null;
  function shock(x, y, z, size) {
    ring.position.set(x, y + 0.04, z);
    ring.visible = true;
    ringAnim = { t: 0, size };
  }

  /* ================= 짓기 ================= */
  const easeBack = (t) => {
    const c1 = 2.2,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };
  W.isBuilt = (k) => !!built[k];
  W.build = function (key, opts) {
    opts = opts || {};
    if (built[key]) return 0;
    built[key] = true;
    const sfx = JK.Audio;
    if (key === 'wall') return buildWallAnim(sfx);
    if (key === 'choga' || key === 'giwa') return buildVillageAnim(key, sfx);
    const m = meshes[key];
    const d = BUILD_DEFS[key];
    m.visible = true;
    m.scale.set(0.001, 0.001, 0.001);
    const dur = 0.95;
    anims.push({
      t: -0.05,
      dur,
      step(t) {
        const k = clamp(t / dur, 0, 1);
        const sy = easeBack(k);
        const sq = 1 + 0.22 * Math.sin(k * Math.PI) * (1 - k);
        m.scale.set(Math.max(0.001, k < 0.15 ? k / 0.15 : 1) * sq * (0.6 + 0.4 * Math.min(1, k * 2)), Math.max(0.001, sy), Math.max(0.001, k < 0.15 ? k / 0.15 : 1) * sq * (0.6 + 0.4 * Math.min(1, k * 2)));
      },
      end() {
        m.scale.set(1, 1, 1);
      },
    });
    const y = m.position.y;
    setTimeout(() => {
      burst(d.x, y, d.z, 46, Math.max(d.shadowR[0], d.shadowR[1]) * 0.8, 1.4);
      shock(d.x, y, d.z, Math.max(d.shadowR[0], d.shadowR[1]) * 1.6);
      W.shake(0.35);
      if (sfx) sfx.pop(1);
    }, 90);
    W.label(d.name, new T.Vector3(d.x, y + d.label, d.z), 3200);
    W.focusOn(d.x, d.z, 0.4);
    groundShadow(d.x, d.z, d.shadowR[0], d.shadowR[1], d.rot, 0.28);
    shadowFrames = 70;
    return dur;
  };
  function buildVillageAnim(key, sfx) {
    const mesh = meshes[key];
    const list = houseData[key];
    mesh.visible = true;
    const order = list.map((d, i) => i).sort((a, b) => Math.hypot(list[a].x, list[a].z - 1) - Math.hypot(list[b].x, list[b].z - 1));
    const gap = 0.045;
    order.forEach((idx, n) => {
      const d = list[idx];
      const start = n * gap;
      anims.push({
        t: -start,
        dur: 0.6,
        started: false,
        step(t) {
          if (!this.started) {
            this.started = true;
            burst(d.x, d.h, d.z, 5, 0.25, 0.6);
            if (sfx && n % 3 === 0) sfx.pop(0.5 + Math.random() * 0.25, 0.45);
          }
          const k = clamp(t / 0.6, 0, 1);
          setHouseMatrix(mesh, idx, d, Math.min(1, k * 3) * (1 + 0.18 * Math.sin(k * Math.PI) * (1 - k)), Math.max(0.0001, easeBack(k)));
          mesh.instanceMatrix.needsUpdate = true;
        },
        end() {
          setHouseMatrix(mesh, idx, d, 1, 1);
          mesh.instanceMatrix.needsUpdate = true;
        },
      });
    });
    const total = order.length * gap + 0.6;
    const rects = list.map((d) => [d.x, d.z, 0.36 * d.s, 0.24 * d.s, d.rot]);
    groundShadowMany(rects, 0.22);
    W.label(key === 'choga' ? '초가집 마을' : '기와집 마을', new T.Vector3(list[0].x, 1.2, list[0].z), 3200);
    W.focusOn(key === 'choga' ? -1.5 : 1.0, key === 'choga' ? 2.6 : 0.8, 0.25);
    shadowFrames = Math.ceil(total * 60) + 10;
    W.shake(0.15);
    return total;
  }
  function buildWallAnim(sfx) {
    wallMesh.visible = true;
    const start = GATES.sungnye;
    const gap = 0.05;
    let maxT = 0;
    const m = new T.Matrix4(),
      p = new T.Vector3();
    wallData.forEach((s, i) => {
      let d = Math.abs(s.phi - start);
      d = Math.min(d, Math.PI * 2 - d);
      const delay = (d / Math.PI) * wallData.length * 0.5 * gap;
      maxT = Math.max(maxT, delay);
      anims.push({
        t: -delay,
        dur: 0.45,
        started: false,
        step(t) {
          if (!this.started) {
            this.started = true;
            if (i % 2 === 0) burst(s.x, s.y, s.z, 3, 0.2, 0.5);
            if (sfx && i % 5 === 0) sfx.thud(0.35);
          }
          const k = clamp(t / 0.45, 0, 1);
          p.set(s.x, s.y - 0.6 * (1 - easeBack(k)), s.z);
          m.compose(p, s.q, s.sc);
          wallMesh.setMatrixAt(i, m);
          wallMesh.instanceMatrix.needsUpdate = true;
        },
        end() {
          p.set(s.x, s.y, s.z);
          m.compose(p, s.q, s.sc);
          wallMesh.setMatrixAt(i, m);
          wallMesh.instanceMatrix.needsUpdate = true;
        },
      });
    });
    W.label('한양 도성', new T.Vector3(0.3, 3.6, -6.7), 3400);
    W.focusOn(0, 0, 0);
    shadowFrames = Math.ceil((maxT + 0.5) * 60) + 10;
    return maxT + 0.5;
  }

  // 바닥 접촉 그림자(미리 칠한 음영): 땅 꼭짓점 색을 어둡게
  const shadowRects = [];
  function groundShadow(x, z, hw, hd, rot, k) {
    shadowRects.push([x, z, hw, hd, rot, k]);
    repaintGround();
  }
  function groundShadowMany(list, k) {
    for (const r of list) shadowRects.push([r[0], r[1], r[2], r[3], r[4], k]);
    repaintGround();
  }
  // 땅 꼭짓점을 0.5칸 격자로 나눠 두어, 그림자 칠할 때 근처 꼭짓점만 본다
  let vbuckets = null;
  const CELL = 0.5;
  const ckey = (ix, iz) => (ix + 64) * 256 + (iz + 64);
  function buildBuckets() {
    vbuckets = new Map();
    const pos = islandGeo.attributes.position.array;
    const top = islandGeo.userData.topVerts * 3;
    for (let i = 0; i < top; i += 3) {
      const k = ckey(Math.floor(pos[i] / CELL), Math.floor(pos[i + 2] / CELL));
      let arr = vbuckets.get(k);
      if (!arr) vbuckets.set(k, (arr = []));
      arr.push(i);
    }
  }
  function repaintGround() {
    if (!vbuckets) buildBuckets();
    const base = islandGeo.userData.baseColor;
    const pos = islandGeo.attributes.position.array;
    const colA = islandGeo.attributes.color;
    const c = colA.array;
    c.set(base);
    // 햇빛 반대쪽으로 살짝 밀린 부드러운 그림자
    for (const [x, z, hw, hd, rot, k] of shadowRects) {
      const cs = Math.cos(rot),
        sn = Math.sin(rot);
      const R = Math.max(hw, hd) + 0.6;
      const ox = x + 0.12,
        oz = z + 0.1;
      const x0 = Math.floor((ox - R) / CELL),
        x1 = Math.floor((ox + R) / CELL),
        z0 = Math.floor((oz - R) / CELL),
        z1 = Math.floor((oz + R) / CELL);
      for (let ix = x0; ix <= x1; ix++)
        for (let iz = z0; iz <= z1; iz++) {
          const arr = vbuckets.get(ckey(ix, iz));
          if (!arr) continue;
          for (let n = 0; n < arr.length; n++) {
            const i = arr[n];
            const dx = pos[i] - ox,
              dz = pos[i + 2] - oz;
            const lx = Math.abs(dx * cs - dz * sn) - hw,
              lz = Math.abs(dx * sn + dz * cs) - hd;
            const dd = Math.max(lx, lz);
            if (dd > 0.45) continue;
            const f = 1 - k * (1 - smooth(-0.1, 0.45, dd));
            c[i] *= f;
            c[i + 1] *= f;
            c[i + 2] *= f;
          }
        }
    }
    colA.needsUpdate = true;
  }

  /* ================= 이름표 ================= */
  const labels = [];
  W.label = function (text, pos, ms) {
    const el = document.createElement('div');
    el.className = 'b-label';
    el.textContent = text;
    document.getElementById('labels').appendChild(el);
    labels.push({ el, pos: pos.clone(), until: performance.now() + ms, born: performance.now() });
  };
  const _lp = new T.Vector3();
  function updateLabels() {
    const now = performance.now();
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    for (let i = labels.length - 1; i >= 0; i--) {
      const L = labels[i];
      if (now > L.until) {
        L.el.remove();
        labels.splice(i, 1);
        continue;
      }
      _lp.copy(L.pos);
      W.island.localToWorld(_lp);
      _lp.project(camera);
      const x = (_lp.x * 0.5 + 0.5) * w,
        y = (-_lp.y * 0.5 + 0.5) * h;
      const age = (now - L.born) / 1000;
      const out = (L.until - now) / 1000;
      const a = Math.min(1, age * 3, out * 2);
      L.el.style.transform = `translate(${x.toFixed(1)}px, ${(y - 10 * Math.min(1, age * 2)).toFixed(1)}px) translate(-50%, -100%)`;
      L.el.style.opacity = a.toFixed(2);
    }
  }

  /* ================= 카메라 ================= */
  W.shake = (k) => (cam.shake = Math.max(cam.shake, k));
  W.focusOn = function (x, z, k) {
    cam.focus.set(x, 0, z);
    cam.focusK = k;
    cam.focusUntil = clock.t + 2.2;
  };
  W.camTo = function (p, dur) {
    for (const k of ['dist', 'az', 'el', 'fov']) {
      camFrom[k] = cam[k];
      camTo[k] = p[k] !== undefined ? p[k] : cam[k];
    }
    camT = 0;
    camDur = dur || 1.5;
  };
  W.CAM_PLAY = { dist: 30.5, az: 0.3, el: 0.6, fov: 30 };
  W.CAM_TITLE = { dist: 38, az: -0.55, el: 0.24, fov: 34 };
  W.setOrbit = (on) => (cam.orbit = on ? 1 : 0);
  const _cp = new T.Vector3(),
    _ct = new T.Vector3();
  function updateCamera(dt) {
    if (camT < 1) {
      camT = Math.min(1, camT + dt / camDur);
      const e = camT < 0.5 ? 4 * camT * camT * camT : 1 - Math.pow(-2 * camT + 2, 3) / 2;
      for (const k in camTo) cam[k] = lerp(camFrom[k], camTo[k], e);
    }
    if (cam.orbit) cam.az += dt * 0.32;
    else if (W.state.title) cam.az += dt * 0.05;
    const sway = W.state.title ? 0 : Math.sin(clock.t * 0.11) * 0.035;
    let fk = 0;
    if (cam.focusUntil && clock.t < cam.focusUntil) fk = cam.focusK * smooth(cam.focusUntil, cam.focusUntil - 0.6, clock.t) * smooth(cam.focusUntil - 2.2, cam.focusUntil - 1.6, clock.t);
    _ct.copy(cam.target).lerp(cam.focus, fk);
    const dist = cam.dist * view.fit * (1 - fk * 0.18);
    const az = cam.az + sway,
      el = cam.el;
    _cp.set(_ct.x + Math.sin(az) * Math.cos(el) * dist, _ct.y + Math.sin(el) * dist, _ct.z + Math.cos(az) * Math.cos(el) * dist);
    if (cam.shake > 0.001) {
      const s = cam.shake * 0.25;
      _cp.x += (Math.random() - 0.5) * s;
      _cp.y += (Math.random() - 0.5) * s;
      cam.shake *= Math.pow(0.02, dt);
    }
    camera.position.copy(_cp);
    camera.lookAt(_ct);
    // 제목 화면에서는 섬을 오른쪽(세로 화면은 아래쪽)으로 비켜 글자를 가리지 않게
    const L = W.layout;
    const tx = view.baseX + (W.state.title && !L.portrait ? -view.w * 0.2 : 0);
    const ty = view.baseY + (W.state.title && L.portrait ? -view.h * 0.16 : 0);
    if (view.offX === undefined) {
      view.offX = tx;
      view.offY = ty;
    }
    const k = 1 - Math.pow(0.05, dt);
    if (Math.abs(view.offX - tx) > 0.3 || Math.abs(view.offY - ty) > 0.3 || camera.fov !== cam.fov) {
      view.offX += (tx - view.offX) * k;
      view.offY += (ty - view.offY) * k;
      camera.setViewOffset(view.w, view.h, view.offX, view.offY, view.w, view.h);
      camera.fov = cam.fov;
      camera.updateProjectionMatrix();
    }
  }

  /* ================= 하루의 빛(시대 하늘) ================= */
  // 태조: 새 나라의 첫날. 새벽에서 해 질 녘까지
  const TOD_KEYS = [
    { t: 0.0, top: '#8a95cf', hor: '#f8c9ad', bot: '#f2d8cc', sun: '#ffbf98', si: 1.7, hs: '#cfd0f2', hg: '#dcb8a2', hi: 0.95, el: 0.14, az: 1.35, night: 0.5, ink: '#4a4f78' },
    { t: 0.35, top: '#86b9ea', hor: '#fdebcf', bot: '#f2efe8', sun: '#fff1d8', si: 2.5, hs: '#d4e6ff', hg: '#e8dcbc', hi: 1.05, el: 0.85, az: 0.75, night: 0.0, ink: '#3b4a66' },
    { t: 0.72, top: '#78a8de', hor: '#ffe3ae', bot: '#f6e7cf', sun: '#ffd89c', si: 2.4, hs: '#d2e0f8', hg: '#ecd6b0', hi: 1.0, el: 0.6, az: -0.2, night: 0.0, ink: '#4b4a66' },
    { t: 1.0, top: '#40447f', hor: '#f49b6c', bot: '#e8aa92', sun: '#ff9960', si: 1.6, hs: '#9496d6', hg: '#cf9f80', hi: 0.85, el: 0.13, az: -1.1, night: 1.0, ink: '#2f2f55' },
  ];
  TOD_KEYS.forEach((k) => {
    for (const c of ['top', 'hor', 'bot', 'sun', 'hs', 'hg', 'ink']) k[c] = JK.col(k[c]);
  });
  const _c1 = new T.Color(),
    _sunDir = new T.Vector3();
  function applyTOD(t) {
    let i = 0;
    while (i < TOD_KEYS.length - 2 && t > TOD_KEYS[i + 1].t) i++;
    const A = TOD_KEYS[i],
      B = TOD_KEYS[i + 1];
    const f = clamp((t - A.t) / (B.t - A.t), 0, 1);
    const u = sky.material.uniforms;
    u.uTop.value.copy(A.top).lerp(B.top, f);
    u.uHor.value.copy(A.hor).lerp(B.hor, f);
    u.uBot.value.copy(A.bot).lerp(B.bot, f);
    u.uSunCol.value.copy(A.sun).lerp(B.sun, f);
    u.uInkTint.value.copy(A.ink).lerp(B.ink, f);
    sun.color.copy(u.uSunCol.value);
    sun.intensity = lerp(A.si, B.si, f);
    hemi.color.copy(A.hs).lerp(B.hs, f);
    hemi.groundColor.copy(A.hg).lerp(B.hg, f);
    hemi.intensity = lerp(A.hi, B.hi, f);
    const el = lerp(A.el, B.el, f),
      az = lerp(A.az, B.az, f);
    _sunDir.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));
    u.uSun.value.copy(_sunDir);
    sun.position.copy(_sunDir).multiplyScalar(40);
    sun.target.position.set(0, 0, 0);
    JK.U.uNight.value = lerp(A.night, B.night, f);
    _c1.copy(u.uHor.value).lerp(u.uBot.value, 0.55);
    scene.fog.color.copy(_c1);
    if (W.cloudMat) W.cloudMat.emissive.copy(u.uHor.value).lerp(u.uTop.value, 0.25);
  }
  W.setTOD = function (t, instant) {
    W.state.todTarget = t;
    if (instant) {
      W.state.tod = t;
      applyTOD(t);
      shadowFrames = Math.max(shadowFrames, 2);
    }
  };

  /* ================= 후처리 설정 ================= */
  function setupPost() {
    if (post) {
      post.rtScene.dispose();
      post.rtA.dispose();
      post.rtB.dispose();
    }
    const quadGeo = new T.BufferGeometry();
    quadGeo.setAttribute('position', new T.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    quadGeo.setAttribute('uv', new T.Float32BufferAttribute([0, 0, 2, 0, 0, 2], 2));
    const blurMat = new T.ShaderMaterial({ vertexShader: quadVert, fragmentShader: blurFrag, uniforms: { tSrc: { value: null }, uDir: { value: new T.Vector2() } }, depthTest: false, depthWrite: false });
    const compMat = new T.ShaderMaterial({
      vertexShader: quadVert,
      fragmentShader: compFrag,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        tScene: { value: null },
        tBlur: { value: null },
        uTexel: { value: new T.Vector2() },
        uTilt: { value: 1 },
        uFocusY: { value: 0.5 },
        uInk: { value: 0 },
        uBloom: { value: 1 },
        uTime: JK.U.uTime,
        uFlash: { value: 0 },
        uAspect: { value: 1 },
        uFxaa: { value: 0 },
      },
    });
    const quad = new T.Mesh(quadGeo, blurMat);
    quad.frustumCulled = false;
    const qScene = new T.Scene();
    qScene.add(quad);
    const qCam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    post = { rtScene: makeRT(4, 4, 0), rtA: makeRT(4, 4, 0), rtB: makeRT(4, 4, 0), blurMat, compMat, quad, qScene, qCam, w: 0, h: 0 };
  }
  function sizePost() {
    const cfg = TIERS[tier];
    const pr = Math.min(window.devicePixelRatio || 1, cfg.pr);
    renderer.setPixelRatio(pr);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    const w = Math.max(2, Math.round(canvas.clientWidth * pr)),
      h = Math.max(2, Math.round(canvas.clientHeight * pr));
    post.rtScene.dispose();
    post.rtA.dispose();
    post.rtB.dispose();
    post.rtScene = makeRT(w, h, cfg.msaa);
    const bw = Math.max(2, Math.round(w / cfg.blur)),
      bh = Math.max(2, Math.round(h / cfg.blur));
    post.rtA = makeRT(bw, bh, 0);
    post.rtB = makeRT(bw, bh, 0);
    post.w = w;
    post.h = h;
    post.compMat.uniforms.uTexel.value.set(1 / w, 1 / h);
    post.compMat.uniforms.uAspect.value = w / h;
    post.pr = pr;
    if (dust) dust.material.uniforms.uScale.value = h * 0.42;
  }
  function renderPost() {
    const cfg = TIERS[tier];
    renderer.setRenderTarget(post.rtScene);
    renderer.render(scene, camera);
    // 흐림(틸트시프트·번짐용)
    post.quad.material = post.blurMat;
    post.blurMat.uniforms.tSrc.value = post.rtScene.texture;
    post.blurMat.uniforms.uDir.value.set(1 / post.rtA.width, 0);
    renderer.setRenderTarget(post.rtA);
    renderer.render(post.qScene, post.qCam);
    post.blurMat.uniforms.tSrc.value = post.rtA.texture;
    post.blurMat.uniforms.uDir.value.set(0, 1 / post.rtA.height);
    renderer.setRenderTarget(post.rtB);
    renderer.render(post.qScene, post.qCam);
    const u = post.compMat.uniforms;
    u.tScene.value = post.rtScene.texture;
    u.tBlur.value = post.rtB.texture;
    u.uTilt.value = cfg.tilt ? 1 : 0;
    u.uBloom.value = cfg.bloom ? 1 : 0.5;
    u.uInk.value = W.state.ink;
    u.uFxaa.value = cfg.msaa ? 0 : 1;
    u.uFocusY.value = view.focusY || 0.5;
    post.quad.material = post.compMat;
    renderer.setRenderTarget(null);
    renderer.render(post.qScene, post.qCam);
  }

  /* ================= 화질 단계 바꾸기 ================= */
  W.getTier = () => tier;
  W.isTierLocked = () => tierLocked;
  W.setTier = function (t, lock) {
    tier = t;
    tierLocked = !!lock;
    const cfg = TIERS[t];
    const useShadow = cfg.shadow > 0;
    // 부드러운 그림자(PCFSoft)는 높음에서만. 보통은 가벼운 PCF(보통 화질 fps가 약 1.6배)
    const sType = cfg.softShadow ? T.PCFSoftShadowMap : T.PCFShadowMap;
    if (renderer.shadowMap.enabled !== useShadow || renderer.shadowMap.type !== sType) {
      renderer.shadowMap.enabled = useShadow;
      renderer.shadowMap.type = sType;
      JK.MAT.needsUpdate = true;
      if (W.cloudMat) W.cloudMat.needsUpdate = true;
    }
    if (useShadow && sun.shadow.mapSize.x !== cfg.shadow) {
      sun.shadow.mapSize.set(cfg.shadow, cfg.shadow);
      if (sun.shadow.map) {
        sun.shadow.map.dispose();
        sun.shadow.map = null;
      }
    }
    cloudMesh.count = Math.round(cloudCountFull * cfg.clouds);
    shadowFrames = Math.max(shadowFrames, 3);
    if (canvas.clientWidth) sizePost();
    if (W.onTier) W.onTier(t);
  };

  /* ================= 화면 크기·배치 ================= */
  W.layout = { panelW: 0, panelH: 0, portrait: false };
  W.resize = function () {
    const w = canvas.clientWidth,
      h = canvas.clientHeight;
    camera.aspect = w / h;
    const L = W.layout;
    // 카드가 차지한 쪽을 피해 섬을 남은 자리 가운데에 둔다
    view.w = w;
    view.h = h;
    if (!L.portrait) {
      view.baseX = L.panelW / 2;
      view.baseY = 0;
      camera.setViewOffset(w, h, view.offX || view.baseX, 0, w, h);
      const freeAspect = (w - L.panelW) / h;
      view.fit = Math.max(0.92, 1.35 / freeAspect);
      view.focusY = 0.5;
    } else {
      view.baseX = 0;
      view.baseY = L.panelH / 2;
      camera.setViewOffset(w, h, 0, view.offY || view.baseY, w, h);
      const freeAspect = w / (h - L.panelH);
      view.fit = Math.max(1.0, 1.25 / freeAspect);
      view.focusY = 0.5 + L.panelH / h / 2;
    }
    camera.updateProjectionMatrix();
    if (post) sizePost();
  };

  /* ================= 매 프레임 ================= */
  const stats = (W.stats = { fps: 0, ms: 0, calls: 0, tris: 0, frames: 0, skipped: 0, shadowRenders: 0, walkers: 0 });
  let last = 0,
    fpsAcc = 0,
    fpsN = 0,
    fpsT = 0,
    frameNo = 0;
  W.lastInput = performance.now();
  W.noIdle = false;
  W.frameTimes = [];
  W.start = function () {
    last = performance.now();
    requestAnimationFrame(loop);
  };
  function loop(now) {
    requestAnimationFrame(loop);
    if (W.lost || document.hidden) {
      last = now;
      return;
    }
    let dt = (now - last) / 1000;
    frameNo++;
    // 움직임이 없으면(25초 손대지 않음, 연출 없음) 그리기를 반으로 쉰다
    const idle = !W.noIdle && now - W.lastInput > 25000 && anims.length === 0 && Math.abs(W.state.ink - W.state.inkTarget) < 0.001 && !cam.orbit;
    W.state.idle = idle;
    if (idle && frameNo % 2 === 1) {
      stats.skipped++;
      return;
    }
    last = now;
    dt = clamp(dt, 0, 0.1);
    W.frameTimes.push(dt * 1000);
    if (W.frameTimes.length > 600) W.frameTimes.shift();
    clock.t += dt;
    JK.U.uTime.value = clock.t;
    step(dt);
    renderer.info.reset();
    if (shadowFrames > 0 && renderer.shadowMap.enabled) {
      renderer.shadowMap.needsUpdate = true;
      shadowFrames--;
      stats.shadowRenders++;
    }
    renderPost();
    // 통계
    stats.calls = renderer.info.render.calls;
    stats.tris = renderer.info.render.triangles;
    stats.frames++;
    fpsAcc += dt;
    fpsN++;
    if (now - fpsT > 500) {
      stats.fps = fpsN / fpsAcc;
      stats.ms = (fpsAcc / fpsN) * 1000;
      fpsAcc = 0;
      fpsN = 0;
      fpsT = now;
      if (W.onStats) W.onStats(stats);
    }
    if (W.onFrame) W.onFrame(dt, now);
  }
  const _im = new T.Matrix4(),
    _iq = new T.Quaternion(),
    _ie = new T.Euler(),
    _ip = new T.Vector3(),
    _is = new T.Vector3();
  function step(dt) {
    const S = W.state;
    // 하루의 빛
    if (Math.abs(S.tod - S.todTarget) > 0.0005) {
      S.tod += clamp(S.todTarget - S.tod, -dt * 0.12, dt * 0.12);
      applyTOD(S.tod);
      if (frameNo % 6 === 0) shadowFrames = Math.max(shadowFrames, 1);
    }
    // 수묵
    if (Math.abs(S.ink - S.inkTarget) > 0.0005) S.ink += clamp(S.inkTarget - S.ink, -dt * 0.4, dt * 0.32);
    // 실각: 섬이 기울고 가라앉는다
    const tilt = S.inkTarget > 0 ? smooth(0, 1, S.ink) : smooth(0, 1, S.ink);
    W.island.rotation.z = tilt * 0.09;
    W.island.rotation.x = tilt * -0.05;
    W.island.position.y = -tilt * 0.9;
    // 연출
    for (let i = anims.length - 1; i >= 0; i--) {
      const a = anims[i];
      a.t += dt;
      if (a.t >= 0) a.step(a.t);
      if (a.t >= a.dur) {
        if (a.end) a.end();
        anims.splice(i, 1);
      }
    }
    if (ringAnim) {
      ringAnim.t += dt;
      const k = ringAnim.t / 0.6;
      const s = ringAnim.size * (0.3 + k * 1.1);
      ring.scale.set(s, s, s);
      ring.material.opacity = 0.45 * (1 - k) * (1 - k);
      if (k >= 1) {
        ring.visible = false;
        ringAnim = null;
      }
    }
    updatePeople(dt, clock.t);
    stats.walkers = dollMesh.count;
    W.clouds.rotation.y += dt * 0.004;
    // 떠 있는 섬
    for (let i = 0; i < isletData.length; i++) {
      const d = isletData[i];
      _ie.set(0, d.ph, 0);
      _iq.setFromEuler(_ie);
      _ip.set(d.x, d.y + Math.sin(clock.t * 0.5 + d.ph) * 0.25, d.z);
      _is.set(d.s, d.s, d.s);
      _im.compose(_ip, _iq, _is);
      isletMesh.setMatrixAt(i, _im);
    }
    isletMesh.instanceMatrix.needsUpdate = true;
    // 새 (y 크기를 흔들어 날갯짓)
    for (let i = 0; i < birdData.length; i++) {
      const b = birdData[i];
      const a = b.ph + clock.t * b.sp;
      _ip.set(Math.cos(a) * b.r, b.y + Math.sin(clock.t * 0.7 + i) * 0.3, Math.sin(a) * b.r);
      _ie.set(0, -a, 0);
      _iq.setFromEuler(_ie);
      const f = Math.sin(clock.t * 9 + b.fl);
      _is.set(1, f, 1);
      _im.compose(_ip, _iq, _is);
      birdMesh.setMatrixAt(i, _im);
    }
    birdMesh.instanceMatrix.needsUpdate = true;
    updateCamera(dt);
    updateLabels();
  }
  W.animating = () => anims.length > 0;

  /* ================= 다시 하기 ================= */
  W.reset = function () {
    for (const k in built) delete built[k];
    anims.length = 0;
    for (const k of ['gyeongbok', 'jongmyo', 'sungnye', 'heungin']) meshes[k].visible = false;
    for (const k of ['choga', 'giwa']) {
      houseData[k].forEach((d, i) => setHouseMatrix(meshes[k], i, d, 0.0001, 0.0001));
      meshes[k].instanceMatrix.needsUpdate = true;
      meshes[k].visible = false;
    }
    const m = new T.Matrix4();
    wallData.forEach((s, i) => {
      m.compose(new T.Vector3(s.x, s.y, s.z), s.q, new T.Vector3(0.0001, 0.0001, 0.0001));
      wallMesh.setMatrixAt(i, m);
    });
    wallMesh.instanceMatrix.needsUpdate = true;
    wallMesh.visible = false;
    shadowRects.length = 0;
    repaintGround();
    W.state.ink = 0;
    W.state.inkTarget = 0;
    cam.orbit = 0;
    shadowFrames = 3;
  };

  /* ================= 초상화 찍기 ================= */
  W.portraits = function (roles, size) {
    const out = {};
    const ps = new T.Scene();
    ps.add(new T.HemisphereLight(0xfff4e6, 0x9a8a7a, 1.4));
    const key = new T.DirectionalLight(0xfff0dc, 2.6);
    key.position.set(-1.2, 2.2, 2.4);
    ps.add(key);
    const rim = new T.DirectionalLight(0xdfe8ff, 1.2);
    rim.position.set(2, 1.5, -2);
    ps.add(rim);
    const pc = new T.PerspectiveCamera(24, 1, 0.1, 20);
    pc.position.set(0.0, 0.98, 3.05);
    pc.lookAt(0, 0.8, 0);
    const rt = new T.WebGLRenderTarget(size, size, { samples: 4 });
    rt.texture.colorSpace = T.SRGBColorSpace;
    const buf = new Uint8Array(size * size * 4);
    const cv = document.createElement('canvas');
    cv.width = cv.height = size;
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (const r of roles) {
      const geo = JK.portraitDoll(r.role);
      const mesh = new T.Mesh(geo, JK.MAT);
      mesh.rotation.y = -0.32;
      ps.add(mesh);
      ps.background = JK.col(r.bg);
      renderer.setRenderTarget(rt);
      renderer.render(ps, pc);
      renderer.readRenderTargetPixels(rt, 0, 0, size, size, buf);
      for (let y = 0; y < size; y++) {
        const src = (size - 1 - y) * size * 4;
        img.data.set(buf.subarray(src, src + size * 4), y * size * 4);
      }
      ctx.putImageData(img, 0, 0);
      out[r.role] = cv.toDataURL('image/png');
      ps.remove(mesh);
      geo.dispose();
    }
    renderer.setRenderTarget(null);
    rt.dispose();
    return out;
  };
})();
