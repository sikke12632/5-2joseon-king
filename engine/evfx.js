/* engine/evfx.js — 돌발 이벤트의 세계 연출 (설계서 10-13-4 연출 칸): 날씨·입자·작은 모형·사람 무리
 * 입자는 점 하나 그리기 호출(삼각형 0)로 그린다: 빗줄기·메뚜기 떼·꽃잎·김·엽전 빛.
 * 모형(흰 사슴·낯선 배·항아리·궤짝·볏단·천막·깃발 행렬·무지개)은 수백 삼각형 이하로, 장면이 끝나면 치운다.
 * 장면 이름은 카드의 fx.scene (tools/import-events.py가 붙임). 모두 [게임 속 일]이라 이름표를 달지 않는다.
 */
(function () {
  'use strict';
  const JK = window.JK;
  const T = THREE;
  const X = (JK.EvFx = {});
  let W = null;
  const N = 1400;
  let pts = null,
    head = 0;
  const now = () => JK.U.uTime.value;
  const col = (h) => new T.Color(h);
  const R = Math.random;
  const lerp = (a, b, t) => a + (b - a) * t;
  const emitters = [];
  const things = [];
  let cur = null;
  const swarm = { on: false, t: 0, path: null, pos: new T.Vector3(), dur: 9 };

  /* ---------- 입자 ---------- */
  const PV = `
    attribute vec4 aVel; attribute vec4 aInfo; attribute vec4 aCol;
    uniform float uTime, uScale; uniform vec3 uSwarm;
    varying float vA; varying vec3 vC; varying float vK; varying float vU; varying float vPh;
    void main(){
      float t = uTime - aInfo.x; float life = aInfo.y; float k = aInfo.w;
      float u = clamp( t / life, 0.0, 1.0 );
      float on = step( 0.0, t ) * step( t, life );
      vec3 p;
      float ph = aCol.w * 6.2832;
      if ( k > 2.5 && k < 3.5 ) {
        // 메뚜기 떼: 떼 가운데를 중심으로 붓질처럼 맴돈다
        p = uSwarm + position + vec3( sin( t * 6.0 + ph ) * 0.35, sin( t * 4.3 + ph * 1.7 ) * 0.2, cos( t * 5.1 + ph ) * 0.35 );
      } else {
        p = position + aVel.xyz * t + vec3( 0.0, 0.5 * aVel.w * t * t, 0.0 );
        // 꽃잎·김은 옆으로 살랑
        if ( k > 1.5 && k < 2.5 ) p.xz += vec2( sin( t * 1.9 + ph ), cos( t * 1.3 + ph ) ) * 0.25;
        if ( k < 0.5 ) p.x += sin( t * 1.2 + ph ) * 0.08 * t;
      }
      vec4 mv = modelViewMatrix * vec4( p, 1.0 );
      gl_Position = projectionMatrix * mv;
      float fade = smoothstep( 0.0, 0.12, u ) * ( 1.0 - smoothstep( 0.7, 1.0, u ) );
      vA = on * fade;
      vC = aCol.rgb; vK = k; vU = u; vPh = ph + t * 2.0;
      float grow = k < 0.5 ? 1.0 + u * 1.2 : 1.0;
      gl_PointSize = on > 0.0 ? uScale * aInfo.z * grow / -mv.z : 0.0;
    }`;
  const PF = `
    varying float vA; varying vec3 vC; varying float vK; varying float vU; varying float vPh;
    void main(){
      vec2 d = gl_PointCoord - 0.5;
      float a = vA;
      if ( vK > 0.5 && vK < 1.5 ) {
        // 빗줄기: 가는 세로 먹선
        if ( abs( d.x ) > 0.06 ) discard;
        a *= ( 1.0 - abs( d.y ) * 2.0 ) * 0.85;
      } else if ( vK > 1.5 && vK < 2.5 ) {
        // 꽃잎: 돌아가는 작은 타원
        float c = cos( vPh ), s = sin( vPh );
        vec2 q = vec2( c * d.x - s * d.y, s * d.x + c * d.y );
        if ( ( q.x * q.x ) / 0.2 + ( q.y * q.y ) / 0.06 > 1.0 ) discard;
      } else if ( vK > 2.5 && vK < 3.5 ) {
        // 메뚜기: 진한 점
        if ( length( d ) > 0.4 ) discard;
        a *= 0.95;
      } else if ( vK > 3.5 ) {
        // 반짝이(엽전 빛·사슴 빛): 십자 별
        float st = max( 1.0 - abs( d.x ) * 9.0 - abs( d.y ) * 1.6, 1.0 - abs( d.y ) * 9.0 - abs( d.x ) * 1.6 );
        float core = smoothstep( 0.35, 0.0, length( d ) );
        a *= clamp( max( st, core ), 0.0, 1.0 );
        if ( a < 0.02 ) discard;
      } else {
        // 김·먼지·연기: 부드러운 공
        float r = length( d );
        if ( r > 0.5 ) discard;
        a *= smoothstep( 0.5, 0.1, r ) * 0.7;
      }
      gl_FragColor = vec4( pow( vC, vec3( 2.2 ) ), a );
    }`;
  function ensure() {
    if (pts) return;
    W = JK.World;
    const g = new T.BufferGeometry();
    const P = new Float32Array(N * 3),
      V = new Float32Array(N * 4),
      I = new Float32Array(N * 4),
      C = new Float32Array(N * 4);
    for (let i = 0; i < N; i++) I[i * 4] = -100;
    g.setAttribute('position', new T.BufferAttribute(P, 3));
    g.setAttribute('aVel', new T.BufferAttribute(V, 4));
    g.setAttribute('aInfo', new T.BufferAttribute(I, 4));
    g.setAttribute('aCol', new T.BufferAttribute(C, 4));
    g.boundingSphere = new T.Sphere(new T.Vector3(), 60);
    pts = new T.Points(
      g,
      new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: JK.U.uTime, uScale: { value: 300 }, uSwarm: { value: swarm.pos } },
        vertexShader: PV,
        fragmentShader: PF,
      })
    );
    pts.frustumCulled = false;
    pts.renderOrder = 5;
    W.island.add(pts);
    W.stepHooks.push(step);
  }
  // 입자 하나: o = { p:[x,y,z], v:[vx,vy,vz,가속], life, size, kind, color, ph, delay }
  function spawn(o) {
    const g = pts.geometry;
    const k = head;
    head = (head + 1) % N;
    const c = o.color;
    g.attributes.position.setXYZ(k, o.p[0], o.p[1], o.p[2]);
    const v = o.v || [0, 0, 0, 0];
    g.attributes.aVel.setXYZW(k, v[0], v[1], v[2], v[3] || 0);
    g.attributes.aInfo.setXYZW(k, now() + (o.delay || 0), o.life || 2, o.size || 0.1, o.kind || 0);
    g.attributes.aCol.setXYZW(k, c.r, c.g, c.b, o.ph !== undefined ? o.ph : R());
    g.attributes.position.needsUpdate = g.attributes.aVel.needsUpdate = g.attributes.aInfo.needsUpdate = g.attributes.aCol.needsUpdate = true;
  }
  // 한 종류 입자를 모두 지운다(메뚜기 떼가 다음 장면까지 남지 않게)
  function clearKind(kind) {
    if (!pts) return;
    const I = pts.geometry.attributes.aInfo;
    for (let i = 0; i < N; i++) if (Math.abs(I.getW(i) - kind) < 0.5) I.setX(i, -100);
    I.needsUpdate = true;
  }
  // 이어서 뿌리는 것(비·김·꽃잎): rate 초당 개수, make() 가 입자 하나를 돌려줌, until 끝나는 시각
  function emit(rate, make, dur) {
    const e = { rate, make, until: now() + (dur || 9999), acc: 0, on: true };
    emitters.push(e);
    return e;
  }
  const H = (x, z) => W.height(x, z);
  const A = (name) => W.anchor(name);
  const AS = (name) => W.anchors(name);

  /* ---------- 모형 ---------- */
  function addThing(mesh, update, opts) {
    W.island.add(mesh);
    const t = { mesh, update, born: now(), dead: false, opts: opts || {} };
    things.push(t);
    return t;
  }
  // 줄어들며 사라지기
  function kill(t, dur) {
    if (!t || t.dead) return;
    t.dying = now();
    t.dieDur = dur || 0.8;
    t.s0 = t.mesh.scale.x;
  }
  function pop(t, k) {
    const s = k < 1 ? 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2) : 1;
    t.mesh.scale.setScalar(Math.max(0.0001, s * (t.opts.scale || 1)));
  }
  const mk = (b) => {
    const m = new T.Mesh(b.build(), JK.MAT);
    m.castShadow = false;
    return m;
  };
  const MODELS = {
    deer() {
      const b = new JK.Builder();
      const w = col('#f7f4ec'),
        sh = col('#e3ddd0'),
        hoof = col('#8a7a68'),
        eye = col('#2b2b30'),
        ant = col('#d9c8a4');
      b.box(0, 0.36, 0, 0.16, 0.15, 0.36, w, { top: col('#fffdf7') });
      b.box(0, 0.26, 0.02, 0.13, 0.04, 0.3, sh);
      for (const [x, z] of [[-0.05, 0.13], [0.05, 0.13], [-0.05, -0.13], [0.05, -0.13]]) {
        b.box(x, 0.15, z, 0.035, 0.26, 0.035, w);
        b.box(x, 0.02, z, 0.04, 0.04, 0.04, hoof);
      }
      b.cylAB([0, 0.42, 0.15], [0, 0.6, 0.22], 0.045, 0.035, 5, w);
      b.box(0, 0.62, 0.27, 0.08, 0.08, 0.14, w);
      b.box(0, 0.6, 0.35, 0.05, 0.05, 0.05, sh);
      b.box(-0.042, 0.64, 0.29, 0.012, 0.02, 0.02, eye);
      b.box(0.042, 0.64, 0.29, 0.012, 0.02, 0.02, eye);
      b.box(-0.05, 0.68, 0.22, 0.05, 0.03, 0.015, sh);
      b.box(0.05, 0.68, 0.22, 0.05, 0.03, 0.015, sh);
      for (const s of [-1, 1]) {
        b.cylAB([s * 0.025, 0.66, 0.24], [s * 0.07, 0.8, 0.2], 0.012, 0.009, 4, ant);
        b.cylAB([s * 0.07, 0.8, 0.2], [s * 0.11, 0.88, 0.16], 0.009, 0.006, 4, ant);
        b.cylAB([s * 0.06, 0.76, 0.21], [s * 0.04, 0.86, 0.26], 0.008, 0.005, 4, ant);
      }
      b.box(0, 0.42, -0.19, 0.04, 0.06, 0.03, col('#ffffff'));
      return mk(b);
    },
    ship() {
      const b = new JK.Builder();
      const hull = col('#3e2f2a'),
        deck = col('#7a5638'),
        sail = col('#3fa6b8'),
        pat = col('#ffd75a'),
        rope = col('#c8b48a');
      b.box(0, 0.05, 0, 0.22, 0.1, 0.62, hull, { top: deck });
      b.box(0, 0.08, 0.33, 0.14, 0.08, 0.08, hull);
      b.box(0, 0.12, -0.3, 0.2, 0.12, 0.1, deck);
      for (const [z, h] of [[0.1, 0.62], [-0.12, 0.5]]) {
        b.cyl(0, 0.1, z, 0.012, 0.01, h, 4, deck, { noTop: true });
        const y0 = 0.2,
          y1 = h + 0.04;
        b.quad([0.005, y0, z + 0.14], [0.005, y0, z - 0.14], [0.005, y1, z - 0.11], [0.005, y1, z + 0.11], sail);
        b.quad([-0.005, y0, z - 0.14], [-0.005, y0, z + 0.14], [-0.005, y1, z + 0.11], [-0.005, y1, z - 0.11], sail);
        // 낯선 무늬(이름 없는 장식): 마름모 하나
        const ym = (y0 + y1) / 2;
        for (const s of [1, -1]) b.quad([s * 0.012, ym - 0.08, z], [s * 0.012, ym, z - 0.06 * s], [s * 0.012, ym + 0.08, z], [s * 0.012, ym, z + 0.06 * s], pat);
        for (const s of [1, -1]) b.quad([s * 0.012, y1 - 0.02, z + 0.11], [s * 0.012, y1 - 0.02, z - 0.11], [s * 0.012, y1 - 0.05, z - 0.11], [s * 0.012, y1 - 0.05, z + 0.11], rope);
      }
      return mk(b);
    },
    jar() {
      const b = new JK.Builder();
      const c1 = col('#8d5a3a'),
        c2 = col('#6e4430'),
        lid = col('#4a3226');
      // lathe는 위→아래 순서로 준다(면 방향)
      b.lathe([[0, 0.5, lid], [0.08, 0.5, lid], [0.1, 0.46, lid], [0.11, 0.44, c2], [0.17, 0.38, c1], [0.2, 0.26, c1], [0.17, 0.1, c1], [0.11, 0.02, c2], [0, 0.0, c2]], 9);
      b.box(0, 0.53, 0, 0.05, 0.04, 0.05, lid);
      return mk(b);
    },
    chest() {
      const b = new JK.Builder();
      const wd = col('#6b4a30'),
        dk = col('#4a3220'),
        iron = col('#7b7d82'),
        rust = col('#9a5a34');
      b.box(0, 0.1, 0, 0.36, 0.2, 0.24, wd, { top: dk });
      b.box(0, 0.23, 0, 0.37, 0.06, 0.25, dk);
      for (const x of [-0.12, 0.12]) b.box(x, 0.13, 0, 0.03, 0.27, 0.26, iron);
      b.box(0, 0.16, 0.125, 0.06, 0.07, 0.02, rust);
      return mk(b);
    },
    sheaf() {
      const b = new JK.Builder();
      const g1 = col('#e8c25a'),
        g2 = col('#c99a36'),
        tie = col('#8a6a3a');
      b.cyl(0, 0, 0, 0.09, 0.05, 0.22, 6, g2, { noTop: true });
      b.cyl(0, 0.22, 0, 0.05, 0.11, 0.14, 6, g1, { top: g1 });
      b.cyl(0, 0.17, 0, 0.055, 0.055, 0.03, 6, tie, { noTop: true });
      return mk(b);
    },
    pot() {
      const b = new JK.Builder();
      const iron = col('#3a3a3e'),
        fire = col('#ff8a2a'),
        wood = col('#5a3a28');
      b.lathe([[0.15, 0.3, iron], [0.17, 0.27, iron], [0.18, 0.18, iron], [0.12, 0.06, iron], [0, 0.04, iron]], 8);
      b.box(0, 0.02, 0, 0.3, 0.04, 0.06, wood);
      b.box(0, 0.02, 0, 0.06, 0.04, 0.3, wood);
      b.cyl(0, 0.02, 0, 0.07, 0, 0.1, 5, fire);
      return mk(b);
    },
    tent() {
      const b = new JK.Builder();
      const pole = col('#6b4a30');
      const cloth = [col('#e7d6b0'), col('#c95a3a'), col('#3f7d8c'), col('#e8c25a')][Math.floor(R() * 4)];
      for (const [x, z] of [[-0.14, -0.1], [0.14, -0.1], [-0.14, 0.1], [0.14, 0.1]]) b.box(x, 0.1, z, 0.02, 0.2, 0.02, pole);
      b.quad([-0.18, 0.2, 0.14], [0.18, 0.2, 0.14], [0.18, 0.28, 0], [-0.18, 0.28, 0], cloth);
      b.quad([0.18, 0.2, -0.14], [-0.18, 0.2, -0.14], [-0.18, 0.28, 0], [0.18, 0.28, 0], cloth);
      b.box(0, 0.08, 0.06, 0.26, 0.04, 0.1, col('#a87850'));
      return mk(b);
    },
    flag() {
      const b = new JK.Builder();
      b.cyl(0, 0, 0, 0.012, 0.01, 0.7, 4, col('#5a3a28'), { noTop: true });
      const red = col('#c0392b');
      b.quad([0.01, 0.42, 0], [0.24, 0.45, 0], [0.24, 0.66, 0], [0.01, 0.68, 0], red);
      b.quad([0.24, 0.45, 0], [0.01, 0.42, 0], [0.01, 0.68, 0], [0.24, 0.66, 0], red);
      return mk(b);
    },
    rope() {
      // 마을 어귀 새끼줄(열병 — 길을 막는다)
      const b = new JK.Builder();
      const st = col('#6b4a30'),
        rp = col('#d8c08a');
      b.box(-0.35, 0.15, 0, 0.04, 0.3, 0.04, st);
      b.box(0.35, 0.15, 0, 0.04, 0.3, 0.04, st);
      b.bar([[-0.35, 0.24, 0], [0, 0.2, 0], [0.35, 0.24, 0]], 0.02, 0.02, rp);
      for (const x of [-0.2, 0, 0.2]) b.box(x, 0.17, 0, 0.03, 0.06, 0.005, col('#f4f0e6'));
      return mk(b);
    },
    rider() {
      // 말 탄 인형(역참 관리): 밤색 말 + 푸른 옷 사람
      const b = new JK.Builder();
      const horse = col('#7a4a2a'),
        mane = col('#3a2418'),
        cloth = col('#3f6f9f'),
        face = col('#f0c9a0'),
        hat = col('#2b2b30');
      b.box(0, 0.17, 0, 0.1, 0.09, 0.26, horse);
      for (const [x, z] of [[-0.035, 0.09], [0.035, 0.09], [-0.035, -0.09], [0.035, -0.09]]) b.box(x, 0.07, z, 0.026, 0.14, 0.026, horse);
      b.cylAB([0, 0.2, 0.11], [0, 0.3, 0.17], 0.03, 0.022, 4, horse);
      b.box(0, 0.3, 0.2, 0.05, 0.05, 0.09, horse);
      b.box(0, 0.27, 0.13, 0.012, 0.08, 0.06, mane);
      b.box(0, 0.2, -0.14, 0.02, 0.08, 0.02, mane);
      b.box(0, 0.27, -0.01, 0.07, 0.12, 0.06, cloth);
      b.ball(0, 0.37, 0, 0.035, 0, face);
      b.cyl(0, 0.39, 0, 0.055, 0.055, 0.01, 6, hat);
      b.cyl(0, 0.395, 0, 0.025, 0.02, 0.04, 6, hat);
      return mk(b);
    },
    scroll() {
      // 펼친 두루마리(두 대감 사이)
      const b = new JK.Builder();
      b.box(0, 0.012, 0, 0.3, 0.006, 0.16, col('#f3e6c4'));
      b.cyl(-0.15, 0.012, -0.09, 0.014, 0.014, 0.18, 6, col('#8a5a3a'));
      b.cyl(0.15, 0.012, -0.09, 0.014, 0.014, 0.18, 6, col('#8a5a3a'));
      for (let i = 0; i < 4; i++) b.box(-0.08 + i * 0.05, 0.016, 0, 0.012, 0.002, 0.11, col('#3a2a1e'));
      return mk(b);
    },
    lamp() {
      // 밤의 궁궐: 왕의 방 등불(빛 번짐은 입자로)
      const b = new JK.Builder();
      b.kind(2);
      b.box(0, 0.12, 0, 0.12, 0.16, 0.12, col('#ffd28a'));
      b.kind(0);
      b.box(0, 0.22, 0, 0.16, 0.03, 0.16, col('#3a2a20'));
      return mk(b);
    },
  };
  // 무지개(단비 뒤): 반원 띠 한 장, 일곱 빛은 반지름으로 칠한다
  function rainbow() {
    const g = new T.RingGeometry(10.5, 12.2, 72, 1, 0, Math.PI);
    const m = new T.Mesh(
      g,
      new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: T.DoubleSide,
        uniforms: { uA: { value: 0 } },
        vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); }',
        fragmentShader: `uniform float uA; varying vec2 vP;
          vec3 hue( float h ){ return clamp( abs( mod( h * 6.0 + vec3( 0.0, 4.0, 2.0 ), 6.0 ) - 3.0 ) - 1.0, 0.0, 1.0 ); }
          void main(){ float r = ( length( vP ) - 10.5 ) / 1.7; vec3 c = hue( 0.82 * ( 1.0 - r ) ) * 0.9 + 0.12;
            float edge = smoothstep( 0.0, 0.15, r ) * smoothstep( 1.0, 0.85, r );
            float foot = smoothstep( 0.0, 3.5, vP.y );
            gl_FragColor = vec4( pow( c, vec3( 2.2 ) ), uA * edge * foot * 0.55 ); }`,
      })
    );
    m.renderOrder = 4;
    return m;
  }

  /* ---------- 날씨 ---------- */
  const PAL = {
    drought: { top: '#f2c27a', hor: '#ffdca2', bot: '#eab67a', sun: '#ffc870', si: 1.35, hi: 1.08 },
    rain: { top: '#5d6f86', hor: '#9aa7b5', bot: '#7d8a99', sun: '#c8d2dc', si: 0.45, hi: 0.85 },
    gloom: { top: '#6e6457', hor: '#a39a86', bot: '#857a68', sun: '#d8c8a0', si: 0.6, hi: 0.9 },
    night: { top: '#0e1630', hor: '#2a3558', bot: '#1a2240', sun: '#7f90c8', si: 0.15, hi: 0.45, night: 1 },
    spring: { top: '#f5c3d4', hor: '#ffe7ef', bot: '#f0c8d6', sun: '#fff0f4', si: 1.05, hi: 1.1 },
    sick: { top: '#b4bea4', hor: '#d6dac6', bot: '#b6bca6', sun: '#e6e8d6', si: 0.8, hi: 0.95 },
    fire: { top: '#7a5a4a', hor: '#d89a6a', bot: '#a87458', sun: '#ffb070', si: 0.85, hi: 0.95 },
  };
  function weather(name) {
    const p = PAL[name];
    W.setWeather(p ? { top: col(p.top), hor: col(p.hor), bot: col(p.bot), sun: col(p.sun), si: p.si, hi: p.hi, night: p.night || 0 } : null);
  }

  /* ---------- 장면 ---------- */
  // 섬 위 아무 곳(도성 고리 안쪽 들판 위주)
  const field = () => {
    const f = AS('fields');
    const p = f[Math.floor(R() * f.length)];
    return [p[0] + (R() - 0.5) * 3, p[1] + (R() - 0.5) * 2];
  };
  const around = (cx, cz, r) => {
    const a = R() * Math.PI * 2,
      d = Math.sqrt(R()) * r;
    return [cx + Math.cos(a) * d, cz + Math.sin(a) * d];
  };
  const rainDrops = (rate, color) =>
    emit(rate, () => {
      const [x, z] = around(0, 0, 11);
      return { p: [x, 7 + R() * 2, z], v: [-0.6, -11, 0.2, 0], life: 0.75, size: 1.5 + R() * 0.6, kind: 1, color: col(color || '#e8eef6') };
    });
  const steam = (x, z, rate, color, size) =>
    emit(rate, () => ({ p: [x + (R() - 0.5) * 0.15, H(x, z) + 0.25, z + (R() - 0.5) * 0.15], v: [0.05, 0.45 + R() * 0.2, 0.02, 0], life: 2.6, size: size || 0.32, kind: 0, color: col(color || '#f6f3ea') }));
  const sparkleAt = (x, y, z, n, color, spread, up) => {
    for (let i = 0; i < n; i++) {
      const a = R() * 6.283,
        s = (spread || 1) * (0.4 + R());
      spawn({ p: [x, y, z], v: [Math.cos(a) * s, (up || 1.6) + R() * 1.5, Math.sin(a) * s, -2.6], life: 1.4 + R() * 0.8, size: 0.2 + R() * 0.12, kind: 4, color: col(color || '#ffe08a'), delay: R() * 0.25 });
    }
  };
  const puff = (x, y, z, n, color, size) => {
    for (let i = 0; i < n; i++) {
      const a = R() * 6.283,
        s = 0.3 + R() * 0.6;
      spawn({ p: [x, y, z], v: [Math.cos(a) * s, 0.3 + R() * 0.5, Math.sin(a) * s, 0], life: 1.8 + R(), size: size || 0.45, kind: 0, color: col(color || '#d8d0c0'), delay: R() * 0.2 });
    }
  };
  // 땅에서 솟는 모형(항아리 등): 튀어 오르며 커진다
  function rise(model, x, z, scale, opts) {
    const m = MODELS[model]();
    const y = H(x, z);
    m.position.set(x, y, z);
    m.rotation.y = (opts && opts.ry) || 0;
    const t = addThing(
      m,
      (th, el) => {
        if (el < 0.7) pop(th, el / 0.7);
        if (opts && opts.bob) m.position.y = y + Math.abs(Math.sin(el * 3)) * 0.02;
        if (opts && opts.shake && el > 0.7) m.rotation.z = Math.sin(el * 18) * 0.05 * Math.max(0, Math.sin(el * 1.3));
      },
      { scale: scale || 1 }
    );
    m.scale.setScalar(0.0001);
    puff(x, y + 0.05, z, 8, '#cdbb9a', 0.35);
    return t;
  }
  const SCENES = {
    // 가뭄: 하늘이 누렇게 타고, 들판에서 아지랑이가 오른다
    drought(h) {
      weather('drought');
      h.em.push(emit(26, () => {
        const [x, z] = field();
        return { p: [x, H(x, z) + 0.1, z], v: [0, 0.35, 0, 0.08], life: 3, size: 0.5, kind: 0, color: col('#ffe2a8') };
      }));
      W.state.dryTarget = 1;
    },
    // 메뚜기 떼: 검은 구름이 동쪽에서 몰려와 들판을 덮고 지나간다
    locust(h) {
      weather('gloom');
      swarm.on = true;
      swarm.t = 0;
      swarm.dur = 10;
      swarm.path = [[11, 2.5, -1], [4, 1.6, 3.5], [-2, 1.2, 5.5], [-6, 1.4, 4], [-12, 2.4, 1]];
      for (let i = 0; i < 560; i++) {
        const a = R() * 6.283,
          r = Math.pow(R(), 0.6) * 2.8;
        spawn({ p: [Math.cos(a) * r, (R() - 0.5) * 1.2, Math.sin(a) * r * 0.7], v: [0, 0, 0, 0], life: 10.5, size: 0.14 + R() * 0.08, kind: 3, color: col(R() < 0.75 ? '#26261e' : '#56563a'), delay: R() * 0.8 });
      }
      W.shake(0.15);
    },
    // 굶주린 사람들: 성문 앞에 긴 줄, 가마솥 김 (쓰러지는 장면 없음)
    hungry(h) {
      const g = A('southGate');
      W.eventScene({ crowds: [{ at: [g[0] + 0.2, g[1] - 1.4], n: 12, clothes: ['#e6dcc8', '#d6ccb4', '#c9bfa6'], face: 'southGate', mode: 'stand' }] });
      for (const dx of [-0.5, 0.5]) {
        const x = g[0] + dx,
          z = g[1] - 0.6;
        h.things.push(rise('pot', x, z, 1.2));
        h.em.push(steam(x, z, 6, '#f6f3ea', 0.38));
      }
    },
    // 큰비: 먹빛 하늘, 빗줄기, 강물이 불어 오른다
    flood(h) {
      weather('rain');
      h.em.push(rainDrops(140));
      W.setWaterRise(0.22);
      W.shake(0.12);
    },
    // 열병: 엷은 병색 하늘, 아랫마을 집집마다 약 달이는 김
    fever(h) {
      weather('sick');
      for (let i = 0; i < 7; i++) {
        const [x, z] = around(-1.2, 4.2, 2.6);
        h.em.push(steam(x, z, 2.2, '#eef0e4', 0.26));
      }
    },
    // 공사장 불: 붉은 불길과 연기 기둥
    fire(h) {
      weather('fire');
      const site = W.isBuilt('workyard') ? W.buildingPos('workyard') : W.buildingPos('gyeongbok') || [0, -3.1];
      W.eventScene({ fire: [[site[0] + 0.3, site[1] + 0.2], [site[0] - 0.2, site[1] + 0.4]], smoke: [[site[0], site[1] + 0.3]] });
      h.em.push(emit(30, () => ({ p: [site[0] + (R() - 0.5) * 0.6, H(site[0], site[1]) + 0.3, site[1] + 0.3 + (R() - 0.5) * 0.4], v: [(R() - 0.5) * 0.5, 1.6 + R(), (R() - 0.5) * 0.5, -0.6], life: 1.2, size: 0.12, kind: 4, color: col('#ffb050') })));
      W.state.alarm = 0.6;
    },
    // 곳간 도둑: 반쯤 열린 곳간 앞에 흩어진 쌀알
    thief(h) {
      const p = A('street');
      h.things.push(rise('chest', p[0] + 0.5, p[1] - 0.4, 1, { ry: 0.6 }));
      for (let i = 0; i < 70; i++) spawn({ p: [p[0] + 0.5, H(p[0], p[1]) + 0.25, p[1] - 0.3], v: [(R() - 0.5) * 1.6, 1 + R(), (R() - 0.5) * 1.6, -6], life: 0.9, size: 0.06, kind: 0, color: col('#fffaf0'), delay: 0.5 + R() * 0.3 });
    },
    // 단비: 굵은 빗줄기 → 개면 무지개
    rain(h) {
      weather('rain');
      // 누렇던 논이 초록으로 번진다(가뭄 빛 걷힘)
      W.state.dryTarget = 0;
      h.em.push(rainDrops(120, '#e6eef8'));
      h.after = () => {
        weather(null);
        const rb = rainbow();
        rb.position.set(0, -2.5, -9);
        const th = addThing(rb, (t, el) => {
          rb.material.uniforms.uA.value = Math.min(1, el / 1.5) * (t.dying ? Math.max(0, 1 - (now() - t.dying) / 1.5) : 1);
          rb.lookAt(W.camera.position.x, rb.position.y, W.camera.position.z);
        });
        setTimeout(() => kill(th, 1.5), 7000);
        sparkleAt(0, 2, 0, 30, '#fff4c0', 3, 1);
      };
    },
    // 묵은 땅의 첫 수확: 들판 가장자리에 볏단이 뿅뿅
    harvest(h) {
      const pts0 = AS('fields');
      let k = 0;
      for (const p of pts0)
        for (let i = 0; i < 4; i++) {
          const [x, z] = around(p[0], p[1], 0.7);
          setTimeout(() => {
            if (h.done) return;
            h.things.push(rise('sheaf', x, z, 2.1));
            sparkleAt(x, H(x, z) + 0.3, z, 6, '#ffe08a', 0.5);
          }, 300 + k++ * 160);
        }
    },
    // 흰 사슴: 뒷산 숲에서 걸어 나와 고개를 들고, 빛이 되어 사라진다
    deer(h) {
      const path = [[1.9, -5.9], [1.3, -5.2], [0.9, -4.9]];
      const m = MODELS.deer();
      const y0 = (x, z) => H(x, z);
      m.position.set(path[0][0], y0(path[0][0], path[0][1]), path[0][1]);
      const th = addThing(
        m,
        (t, el) => {
          const walk = Math.min(1, el / 3.2);
          const f = walk * (path.length - 1),
            i = Math.min(path.length - 2, Math.floor(f)),
            u = f - i;
          const x = lerp(path[i][0], path[i + 1][0], u),
            z = lerp(path[i][1], path[i + 1][1], u);
          m.position.set(x, y0(x, z) + (walk < 1 ? Math.abs(Math.sin(el * 7)) * 0.025 : 0), z);
          m.rotation.y = Math.atan2(path[i + 1][0] - path[i][0], path[i + 1][1] - path[i][1]) + (walk >= 1 ? Math.sin(el * 0.9) * 0.5 : 0);
          if (el < 0.5) pop(t, el / 0.5);
          if (Math.random() < 0.25) spawn({ p: [x + (R() - 0.5) * 0.3, y0(x, z) + 0.2 + R() * 0.5, z + (R() - 0.5) * 0.3], v: [0, 0.35, 0, 0], life: 1.4, size: 0.14, kind: 4, color: col('#fff6d0') });
        },
        { scale: 2.6 }
      );
      m.scale.setScalar(0.0001);
      h.things.push(th);
      h.onEnd = () => {
        const p = m.position;
        sparkleAt(p.x, p.y + 0.4, p.z, 40, '#fff6d0', 1.2, 1.2);
      };
    },
    // 북적이는 장터: 천막이 늘고 사람들이 들썩
    market(h) {
      const p = A('yard');
      W.eventScene({ crowds: [{ at: [p[0] - 0.6, p[1] + 0.1], n: 14, clothes: ['#ece4d2', '#c95a3a', '#3f7d8c', '#e8c25a', '#a2714a'], mode: 'hop' }] });
      for (let i = 0; i < 8; i++) {
        const x = p[0] - 1.9 + (i % 4) * 0.95,
          z = p[1] - 0.25 + Math.floor(i / 4) * 1.15;
        setTimeout(() => !h.done && h.things.push(rise('tent', x, z, 2.2, { ry: (R() - 0.5) * 0.4 })), 200 + i * 140);
      }
      sparkleAt(p[0], H(p[0], p[1]) + 0.6, p[1], 24, '#ffe08a', 1.2, 1.4);
    },
    // 낯선 상인 배: 폭포 쪽 강에서 처음 보는 돛배가 거슬러 올라온다
    ship(h) {
      const rv = W.riverPts;
      const n = rv.length - 4;
      const m = MODELS.ship();
      const th = addThing(
        m,
        (t, el) => {
          const s = h.leaving ? Math.max(0, 0.55 - (now() - h.leaving) * 0.05) : Math.max(0.55, 0.95 - el * 0.05);
          const f = s * (n - 1),
            k = Math.floor(f),
            u = f - k;
          const a = rv[k],
            c = rv[Math.min(k + 1, rv.length - 1)];
          m.position.set(lerp(a[0], c[0], u), -0.08 + Math.sin(el * 2) * 0.012, lerp(a[1], c[1], u));
          m.rotation.y = Math.atan2(a[0] - c[0], a[1] - c[1]) + (h.leaving ? Math.PI : 0);
          m.rotation.z = Math.sin(el * 1.6) * 0.04;
          if (el < 0.6) pop(t, el / 0.6);
        },
        { scale: 2.5 }
      );
      m.scale.setScalar(0.0001);
      h.things.push(th);
    },
    // 예고 없는 사신: 서쪽 문에서 붉은 깃발 행렬이 서둘러 궁궐로
    envoy(h) {
      const path = [W.gatePos.donui, [-5.8, 1.35], [-2.5, 1.35], [0, 1.3], [0, -0.75]].map((p) => [p[0], p[1]]);
      W.eventScene({ processions: [{ path, n: 12, clothes: ['#b23b30', '#c0392b', '#d8b64e'] }] });
      for (let i = 0; i < 5; i++) {
        const m = MODELS.flag();
        const off = i / 10;
        const th = addThing(m, (t, el) => {
          const s = (el * 0.035 * 1.0 + off + 0.02) % 1;
          const f = s * (path.length - 1),
            k = Math.floor(f),
            u = f - k;
          const a = path[k],
            b = path[Math.min(k + 1, path.length - 1)];
          const x = lerp(a[0], b[0], u),
            z = lerp(a[1], b[1], u);
          m.position.set(x, H(x, z) + Math.abs(Math.sin(el * 6 + i)) * 0.03, z);
          m.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]) - Math.PI / 2;
          m.scale.setScalar(1.8);
        });
        h.things.push(th);
      }
    },
    // 땅속 항아리: 궁궐 터에서 흙을 뚫고 솟는다
    jar(h) {
      const s = W.buildingPos('gyeongbok') || [0, -3.1];
      h.box = rise('jar', s[0] + 1.3, s[1] + 2.1, 1.6, { shake: true });
      h.things.push(h.box);
    },
    // 고려 때 문서 궤짝
    chest(h) {
      const s = W.buildingPos('sajik') || [-3.9, -1.7];
      h.box = rise('chest', s[0] + 0.9, s[1] + 0.9, 1.5, { ry: 0.4, shake: true });
      h.things.push(h.box);
    },
    // 낡은 지도: 화면에 지도, 섬 뒤 산에 작은 붉은 깃발이 꽂혔다 사라진다
    map(h) {
      const el = document.getElementById('evMap');
      if (el) {
        el.classList.remove('show');
        void el.offsetWidth;
        el.classList.add('show');
        clearTimeout(X._mt);
        X._mt = setTimeout(() => el.classList.remove('show'), 3200);
      }
      const mt = W.mounts.slice().sort((a, b) => b[2] - a[2])[0];
      const x = mt[0] + 0.5,
        z = mt[1] + 0.6;
      const f = rise('flag', x, z, 1.6);
      h.things.push(f);
      h.box = f;
      setTimeout(() => sparkleAt(x, H(x, z) + 0.8, z, 12, '#ff9070', 0.6), 700);
    },
    // 매화 핀 뜰: 분홍 꽃잎이 궁궐에 흩날린다
    plum(h) {
      weather('spring');
      const s = W.buildingPos('gyeongbok') || W.buildingPos('altPalace') || [0, -3.1];
      h.em.push(emit(40, () => {
        const [x, z] = around(s[0], s[1], 3);
        return { p: [x, H(x, z) + 2.5 + R(), z], v: [0.25, -0.45, 0.1, 0], life: 5, size: 0.3 + R() * 0.12, kind: 2, color: col(R() < 0.6 ? '#f7a8c0' : '#fde3ea') };
      }));
    },
    // 잠 못 드는 밤: 섬이 밤이 되고 등불이 다 꺼진다. 왕의 방에만 등불
    night(h) {
      weather('night');
      W.state.lightsHold = 0;
      W.state.lightsTarget = 0;
      const s = W.buildingPos('gyeongbok') || W.buildingPos('altPalace') || [0, -3.1];
      const x = s[0] + 0.3,
        z = s[1] + 0.2;
      const lamp = MODELS.lamp();
      lamp.position.set(x, H(x, z) + 0.55, z);
      h.things.push(addThing(lamp, () => {}));
      h.em.push(emit(5, () => ({ p: [x, H(x, z) + 0.68, z], v: [0, 0.02, 0, 0], life: 1.6, size: 1.3, kind: 0, color: col('#ffcf7a') })));
    },
  };
  // 갈래 카드(10-14-3)
  Object.assign(SCENES, {
    // 두 대감의 논쟁(AT05): 궁궐 마루에 붉은 관복과 푸른 관복이 마주 앉고 가운데 두루마리. 갈래 엔딩 ①에서는 성균관 마당
    debate(h) {
      const s = (h.opts && h.opts.at) || W.buildingPos('gyeongbok') || [0, -3.1];
      const x = s[0],
        z = s[1] + (h.opts && h.opts.at ? 0.7 : 1.9);
      W.eventScene({
        crowds: [
          { at: [x - 0.3, z], n: 1, clothes: ['#b23b30'], hat: 'samo', face: [x + 0.3, z], mode: 'stand' },
          { at: [x + 0.3, z], n: 1, clothes: ['#2f5f9f'], hat: 'samo', face: [x - 0.3, z], mode: 'stand' },
        ].concat(h.opts && h.opts.king ? [{ at: [x, z - 0.35], n: 1, clothes: ['#c0392b'], face: [x, z + 1], mode: 'stand' }] : []),
      });
      const sc = MODELS.scroll();
      sc.position.set(x, H(x, z), z);
      sc.scale.setScalar(2);
      h.things.push(addThing(sc, () => {}));
      sparkleAt(x, H(x, z) + 0.5, z, 26, '#ffe8b0', 0.6, 1.2);
    },
    // 한양을 그리워하는 신하(AT06): 섬 남쪽 가장자리에서 신하 둘이 지도를 펼쳐 남쪽을 가리킨다
    longing(h) {
      const x = 1.6,
        z = 6.5;
      W.eventScene({
        crowds: [
          { at: [x - 0.18, z], n: 1, clothes: ['#3f7d5a'], face: [x, 12], mode: 'stand' },
          { at: [x + 0.18, z], n: 1, clothes: ['#3f7d5a'], face: [x, 12], mode: 'stand' },
        ],
      });
      const sc = MODELS.scroll();
      sc.position.set(x, H(x, z) + 0.25, z + 0.15);
      sc.rotation.x = -0.9;
      sc.scale.setScalar(1.6);
      h.things.push(addThing(sc, (t, el) => (sc.position.y = H(x, z) + 0.25 + Math.sin(el * 2) * 0.02)));
      sparkleAt(x, H(x, z) + 0.6, z + 0.6, 14, '#bfe2ff', 0.5, 0.8);
    },
    // 먼 도읍(AT07): 섬 북쪽 끝에서 계룡산까지 점선 길 위를 말 탄 인형이 달린다
    relay(h) {
      const road = (JK.eraModels && JK.eraModels.relayRoad) || [[-1, -5.6], [-1.5, 5.2]];
      const L = [];
      let tot = 0;
      for (let i = 0; i < road.length - 1; i++) {
        const d = Math.hypot(road[i + 1][0] - road[i][0], road[i + 1][1] - road[i][1]);
        L.push(d);
        tot += d;
      }
      const m = MODELS.rider();
      const th = addThing(
        m,
        (t, el) => {
          let s = ((el * 1.6) % tot + tot) % tot;
          let i = 0;
          while (i < L.length - 1 && s > L[i]) s -= L[i++];
          const u = Math.min(1, s / L[i]);
          const a = road[i],
            b = road[i + 1];
          const x = lerp(a[0], b[0], u),
            z = lerp(a[1], b[1], u);
          m.position.set(x, H(x, z) + Math.abs(Math.sin(el * 11)) * 0.03, z);
          m.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]);
          if (el < 0.4) pop(t, el / 0.4);
          if (Math.random() < 0.3) spawn({ p: [x, H(x, z) + 0.05, z], v: [(R() - 0.5) * 0.3, 0.25, (R() - 0.5) * 0.3, 0], life: 1.1, size: 0.3, kind: 0, color: col('#d8c8a8') });
        },
        { scale: 1.8 }
      );
      m.scale.setScalar(0.0001);
      h.things.push(th);
    },
  });
  // 상자를 열었을 때(좋은·나쁜·빈)
  function opened(h, kind) {
    const t = h.box;
    const p = t ? t.mesh.position : new T.Vector3(0, 0, 0);
    const y = p.y + 0.5;
    if (kind === 'good') {
      sparkleAt(p.x, y, p.z, 60, '#ffd84a', 1.4, 2.4);
      for (let i = 0; i < 40; i++) spawn({ p: [p.x, y, p.z], v: [(R() - 0.5) * 2.2, 2.4 + R() * 1.6, (R() - 0.5) * 2.2, -6], life: 1.3, size: 0.1, kind: 0, color: col('#f2c94c'), delay: R() * 0.3 });
      W.fx.shock(p.x, p.y, p.z, 2.2);
    } else if (kind === 'bad') {
      for (let i = 0; i < 26; i++) spawn({ p: [p.x, y, p.z], v: [(R() - 0.5) * 1.2, 0.4 + R() * 0.6, (R() - 0.5) * 1.2, 0], life: 2.6, size: 0.6, kind: 0, color: col(R() < 0.5 ? '#8a9a5a' : '#6e7a4a'), delay: R() * 0.3 });
      W.shake(0.25);
    } else {
      puff(p.x, y, p.z, 14, '#d8d0c0', 0.4);
      for (let i = 0; i < 6; i++) spawn({ p: [p.x, y, p.z], v: [(R() - 0.5) * 0.6, 0.6, (R() - 0.5) * 0.6, -0.3], life: 2.2, size: 0.12, kind: 2, color: col('#efe7d6'), delay: R() * 0.3 });
    }
    if (t) setTimeout(() => kill(t, 1.0), 2200);
  }

  /* ---------- 바깥에서 부르는 것 ---------- */
  // 돌발 카드가 뜰 때
  X.play = function (name, card, opts) {
    ensure();
    X.stop(true);
    const fn = SCENES[name];
    if (!fn) return;
    cur = { name, em: [], things: [], card: card && card.id, t0: now(), opts: opts || null };
    fn(cur);
  };
  // 갈래 엔딩(10-14-2): ① 성균관 마당에 두 대감과 임금 · ② 개경 장터가 들썩 · ③ 역참 길을 달리는 말. 금빛 대신 푸른 빛
  X.branchEnd = function (b) {
    ensure();
    // 갈래 데이터에 end_fx { scene, at(건물 키) }가 있으면 그것을 쓴다(세종부터). 없으면 태조 갈래 셋
    const ef = b.end_fx || null;
    const at = ef ? W.buildingPos(ef.at) || [0, 0] : { '①': W.buildingPos('seonggyun') || [4.0, -4.45], '②': W.buildingPos('altPalace') || [0, -3.1], '③': W.buildingPos('gyeryongPalace') || [-0.9, 4.9] }[b.id] || [0, 0];
    if (ef) X.play(ef.scene, null, { at });
    else if (b.id === '①') X.play('debate', null, { at, king: true });
    else if (b.id === '②') X.play('market', null);
    else X.play('relay', null);
    for (let i = 0; i < 4; i++) setTimeout(() => sparkleAt(at[0], H(at[0], at[1]) + 1.2, at[1], 40, i % 2 ? '#bfe2ff' : '#8fc4ff', 1.8, 2), i * 700);
    W.fx.shock(at[0], H(at[0], at[1]), at[1], 3.6);
  };
  // 고른 뒤: 장면별 마무리, 몇 초 뒤 걷힌다
  X.chose = function (name, side, card) {
    const h = cur;
    if (!h || h.name !== name) return;
    if (name === 'ship' && side === 'left') h.leaving = now();
    if (name === 'hungry' && side === 'left') W.eventScene({ processions: [{ path: 'leave', n: 12, clothes: ['#e6dcc8', '#d6ccb4'] }] });
    if (name === 'fever' && side === 'left') {
      const p = A('southGate');
      h.things.push(rise('rope', p[0] - 1.2, p[1] - 0.3, 1.3, { ry: 0.3 }));
    }
    if (name === 'envoy' && side === 'right') sparkleAt(0, 1.2, -0.75, 24, '#ffd28a', 1.0, 1);
    if (name === 'drought' && side === 'right') sparkleAt(0, 0.8, 0.6, 20, '#f6e6b0', 0.8, 1);
    const hold = { ship: 6, rain: 1.2, deer: 1.5, market: 6, harvest: 5, envoy: 4, hungry: 4, thief: 2.5, jar: 3, chest: 3, map: 3, debate: 3, longing: 4, relay: 6 }[name];
    setTimeout(() => X.stop(false, h), (hold !== undefined ? hold : 2.5) * 1000);
  };
  X.open = function (name, kind) {
    if (cur && cur.name === name) opened(cur, kind);
  };
  // 장면 끝: 날씨 걷힘, 뿌리기 멈춤, 모형 사라짐
  X.stop = function (instant, h) {
    h = h || cur;
    if (!h || h.done) return;
    h.done = true;
    for (const e of h.em) e.on = false;
    if (h.onEnd) h.onEnd();
    for (const t of h.things) kill(t, instant ? 0.01 : 0.8);
    if (h.after && !instant) h.after();
    else weather(null);
    if (h === cur) cur = null;
    if (h.name === 'locust') {
      swarm.on = false;
      clearKind(3);
    }
    if (h.name === 'flood') W.setWaterRise(0);
    if (h.name === 'drought') W.state.dryTarget = 0;
    if (h.name === 'night') {
      W.state.lightsHold = undefined;
      W.state.lightsTarget = W.state.lightsBase !== undefined ? W.state.lightsBase : 1;
    }
    if (['hungry', 'fire', 'market', 'envoy', 'debate', 'longing'].includes(h.name)) W.eventScene(null);
  };
  X.reset = function () {
    if (!W) W = JK.World;
    if (cur) X.stop(true);
    emitters.length = 0;
    for (const t of things) {
      W.island.remove(t.mesh);
      if (t.mesh.geometry) t.mesh.geometry.dispose();
    }
    things.length = 0;
    swarm.on = false;
    if (pts) {
      const I = pts.geometry.attributes.aInfo;
      for (let i = 0; i < N; i++) I.setX(i, -100);
      I.needsUpdate = true;
    }
    W.setWeather && W.setWeather(null);
    W.setWaterRise && W.setWaterRise(0);
    W.eventScene && W.eventScene(null);
    W.state.lightsHold = undefined;
  };
  X.active = () => (cur ? cur.name : '');
  // 기질이 붙는 순간(설계서 10-13-2): 너그러운 왕 = 장터 사람들이 궁궐 쪽으로 손을 흔들며 들썩 · 굳센 왕 = 궁궐에 금빛
  //  나쁜 기질은 메달 연출만(세계를 어둡게 하지 않는다). 돌발 장면이 떠 있으면 사람 무리는 건너뛴다
  X.trait = function (key) {
    ensure();
    const s = W.buildingPos('gyeongbok') || [0, -3.1];
    if (key === 'generous') {
      const p = A('yard');
      if (!cur) {
        W.eventScene({ crowds: [{ at: [p[0], p[1] + 0.3], n: 14, clothes: ['#ece4d2', '#e8c25a', '#c95a3a', '#3f7d8c'], face: 'gate', mode: 'hop' }] });
        setTimeout(() => !cur && W.eventScene(null), 6000);
      }
      sparkleAt(p[0], H(p[0], p[1]) + 0.5, p[1], 20, '#ffc8c0', 1, 1.2);
    } else if (key === 'steadfast') {
      sparkleAt(s[0], H(s[0], s[1]) + 1.2, s[1], 50, '#ffe08a', 1.6, 1.8);
      W.fx.shock(s[0], H(s[0], s[1]), s[1], 3.2);
      W.shake(0.12);
    }
  };

  /* ---------- 한 프레임 ---------- */
  function step(dt) {
    const t = now();
    for (let i = emitters.length - 1; i >= 0; i--) {
      const e = emitters[i];
      if (!e.on || t > e.until) {
        emitters.splice(i, 1);
        continue;
      }
      e.acc += e.rate * dt;
      while (e.acc >= 1) {
        e.acc -= 1;
        spawn(e.make());
      }
    }
    for (let i = things.length - 1; i >= 0; i--) {
      const th = things[i];
      const el = t - th.born;
      th.update(th, el);
      if (th.dying !== undefined) {
        const k = (t - th.dying) / th.dieDur;
        th.mesh.scale.setScalar(Math.max(0.0001, th.s0 * (1 - Math.min(1, k))));
        if (k >= 1) {
          W.island.remove(th.mesh);
          th.mesh.geometry.dispose();
          if (th.mesh.material !== JK.MAT) th.mesh.material.dispose();
          things.splice(i, 1);
        }
      }
    }
    if (swarm.on) {
      swarm.t += dt;
      const P = swarm.path;
      const f = Math.min(0.999, swarm.t / swarm.dur) * (P.length - 1),
        k = Math.floor(f),
        u = f - k;
      swarm.pos.set(lerp(P[k][0], P[k + 1][0], u), lerp(P[k][1], P[k + 1][1], u), lerp(P[k][2], P[k + 1][2], u));
      if (swarm.t > swarm.dur) swarm.on = false;
    }
  }
})();
