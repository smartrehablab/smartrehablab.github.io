import * as THREE from "three";
import { GLTFLoader } from "../vendor/three/GLTFLoader.js";

const hosts = [...document.querySelectorAll("[data-scene]")];
if (hosts.length) start();

async function start() {
  let buf;
  try {
    buf = await (await fetch(new URL("../models/xbot.glb", import.meta.url).href)).arrayBuffer();
  } catch (e) { hosts.forEach(fallback); return; }
  hosts.forEach((h) => { try { make(h, buf); } catch (e) { console.error(e); fallback(h); } });
}

function fallback(host) {
  const src = host.dataset.photo;
  if (!src) return;
  const im = new Image();
  im.onload = () => { host.innerHTML = ""; host.classList.remove("r3"); host.style.backgroundImage = `url("${src}")`; host.closest(".area").classList.remove("noimg"); };
  im.src = src;
}

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);
const _p = new THREE.Quaternion(), _q = new THREE.Quaternion();
function rotW(bone, axis, a) {
  bone.parent.getWorldQuaternion(_p);
  _q.setFromAxisAngle(axis, a);
  bone.quaternion.premultiply(_p.clone().invert().multiply(_q).multiply(_p));
}
const deg = THREE.MathUtils.degToRad;

function radial(stops) {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const g = c.getContext("2d"), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  stops.forEach(([o, col]) => r.addColorStop(o, col));
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}
const GLOW_RED = ["0:rgba(255,90,40,1)", ".35:rgba(234,38,25,.55)", "1:rgba(0,0,0,0)"].map((s) => { const i = s.indexOf(":"); return [+s.slice(0, i), s.slice(i + 1)]; });
const GLOW_OR = [[0, "rgba(255,170,70,1)"], [.35, "rgba(252,113,1,.5)"], [1, "rgba(0,0,0,0)"]];
const GLOW_WH = [[0, "rgba(255,255,255,.95)"], [.4, "rgba(200,210,230,.35)"], [1, "rgba(0,0,0,0)"]];

/* ---------- scene definitions ---------- */
const SCENES = {
  tech: {
    clip: "walk", walk: true, far: "L", az: .3, sway: .2, dist: 2.45, hgt: .58, look: .5,
    highlight: ["RightLeg", "RightFoot", "RightForeArm", "Head"],
    hud: () => `<div class="cap">${UI("s.tech.cap")}</div>
      <dl><dt>${UI("s.tech.sensors")}</dt><dd>${UI("s.tech.sensorsV")}</dd><dt>${UI("s.tech.cad")}</dt><dd data-k="cad">0</dd><dt>${UI("s.tech.cycle")}</dt><dd data-k="pct">0%</dd></dl>
      <p class="leg"><span><i class="or"></i>${UI("s.tech.imu")}</span><span><i class="rd"></i>${UI("s.tech.fnirs")}</span></p>`,
    setup(c) {
      const { H, B, scene } = c;
      const podGeo = new THREE.BoxGeometry(.034 * H, .02 * H, .05 * H);
      const podMat = new THREE.MeshBasicMaterial({ color: 0xff7a1a, depthTest: false, toneMapped: false, fog: false });
      const ringMat = () => new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, depthTest: false, side: THREE.DoubleSide, fog: false, toneMapped: false });
      const ringGeo = new THREE.RingGeometry(.92, 1, 40);
      c.pods = [["RightForeArm", "RightHand", .8], ["LeftForeArm", "LeftHand", .8], ["RightLeg", "RightFoot", .45], ["LeftLeg", "LeftFoot", .45]].map(([a, b, k], i) => {
        const m = new THREE.Mesh(podGeo, podMat); m.renderOrder = 6; scene.add(m);
        const rings = [0, 1].map(() => { const r = new THREE.Mesh(ringGeo, ringMat()); r.renderOrder = 6; scene.add(r); return r; });
        return { a: B(a), b: B(b), k, m, rings, ph: i * .27 };
      });
      c.fnirs = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial(GLOW_RED), blending: THREE.AdditiveBlending, depthTest: false, transparent: true, fog: false }));
      c.fnirs.renderOrder = 7; scene.add(c.fnirs);
      c.cad = Math.round(120 / c.clipDur);
    },
    update(c, t) {
      const pa = new THREE.Vector3(), pb = new THREE.Vector3(), d = new THREE.Vector3();
      for (const p of c.pods) {
        p.a.getWorldPosition(pa); p.b.getWorldPosition(pb);
        p.m.position.lerpVectors(pa, pb, p.k);
        d.subVectors(pb, pa).normalize();
        p.m.quaternion.setFromUnitVectors(Z, d);
        p.rings.forEach((r, j) => {
          const u = ((t * .9 + p.ph + j * .5) % 1);
          r.position.copy(p.m.position); r.quaternion.copy(c.camera.quaternion);
          r.scale.setScalar((.02 + u * .07) * c.H); r.material.opacity = (1 - u) * .8;
        });
      }
      const head = c.W("Head"), top = c.W("HeadTop_End");
      c.fnirs.position.copy(head).lerp(top, .55); c.fnirs.position.z += .06 * c.H;
      c.fnirs.scale.setScalar((.13 + Math.sin(t * 2.4) * .025) * c.H);
      c.fnirs.material.opacity = .7 + Math.sin(t * 2.4) * .3;
      c.hud.cad.textContent = c.cad + " " + UI("s.tech.cadU");
      c.hud.pct.textContent = Math.round(((c.mixer.time % c.clipDur) / c.clipDur) * 100) + "%";
    }
  },

  msk: {
    clip: "idle", far: "L", az: .12, sway: .1, dist: 2.85, hgt: .64, look: .6,
    highlight: ["RightArm", "RightForeArm", "RightHand", "RightShoulder"],
    hud: () => `<div class="cap">${UI("s.msk.cap")}</div>
      <dl><dt>${UI("s.msk.flex")}</dt><dd data-k="flex">0°</dd><dt>${UI("s.msk.target")}</dt><dd>0–160°</dd><dt>${UI("s.msk.rep")}</dt><dd data-k="rep">${UI("s.msk.repV", 1)}</dd></dl>`,
    pose(c, t) {
      const per = 6, u = (t % per) / per;
      const e = .5 - .5 * Math.cos(u * Math.PI * 2);
      c.target = e * 160;
      c.rep = Math.floor(t / per) % 10 + 1;
      rotW(c.B("RightArm"), X, -deg(c.target) + deg(c.armRest || 0));
    },
    setup(c) {
      const { scene, H } = c;
      const N = 64;
      const mk = (col, op) => {
        const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(N * 3), 3));
        const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: op, depthTest: false, fog: false, toneMapped: false }));
        l.renderOrder = 6; l.frustumCulled = false; scene.add(l); return l;
      };
      c.arcFull = mk(0x6e6e73, .7); c.arcNow = mk(0xff7a1a, 1);
      const fan = new THREE.BufferGeometry(); fan.setAttribute("position", new THREE.BufferAttribute(new Float32Array((N + 1) * 3), 3));
      const idx = []; for (let i = 1; i < N; i++) idx.push(0, i, i + 1); fan.setIndex(idx);
      c.fan = new THREE.Mesh(fan, new THREE.MeshBasicMaterial({ color: 0xea2619, transparent: true, opacity: .22, depthTest: false, side: THREE.DoubleSide, fog: false }));
      c.fan.renderOrder = 5; c.fan.frustumCulled = false; scene.add(c.fan);
      c.arcR = .2 * H; c.N = N;
    },
    update(c) {
      const sh = c.W("RightArm").clone(), el = c.W("RightForeArm").clone(), hip = c.W("Hips").clone(), sp = c.W("Spine2").clone();
      const down = new THREE.Vector3(0, hip.y - sp.y, hip.z - sp.z).normalize();
      const arm = new THREE.Vector3(0, el.y - sh.y, el.z - sh.z).normalize();
      const a = THREE.MathUtils.radToDeg(down.angleTo(arm));
      const base = Math.atan2(down.z, -down.y);
      const pt = (ang, arr, i) => { arr[i * 3] = sh.x - .002; arr[i * 3 + 1] = sh.y - Math.cos(base + ang) * c.arcR; arr[i * 3 + 2] = sh.z + Math.sin(base + ang) * c.arcR; };
      const full = c.arcFull.geometry.attributes.position.array, now = c.arcNow.geometry.attributes.position.array, fan = c.fan.geometry.attributes.position.array;
      fan[0] = sh.x - .002; fan[1] = sh.y; fan[2] = sh.z;
      for (let i = 0; i < c.N; i++) {
        pt(deg(160) * i / (c.N - 1), full, i);
        pt(deg(a) * i / (c.N - 1), now, i);
        pt(deg(a) * i / (c.N - 1), fan, i + 1);
      }
      c.arcFull.geometry.attributes.position.needsUpdate = true; c.arcNow.geometry.attributes.position.needsUpdate = true; c.fan.geometry.attributes.position.needsUpdate = true;
      c.hud.flex.textContent = a.toFixed(0) + "°";
      c.hud.rep.textContent = UI("s.msk.repV", c.rep);
    }
  },

  neuro: {
    clip: "idle", far: "L", az: .38, sway: .14, dist: 2.4, hgt: .6, look: .5,
    highlight: ["RightUpLeg", "RightLeg", "RightFoot", "Head"],
    hud: () => `<div class="cap">${UI("s.neuro.cap")}</div>
      <dl><dt>${UI("s.neuro.range")}</dt><dd data-k="cop">0 mm</dd><dt>${UI("s.neuro.vel")}</dt><dd data-k="vel">0 mm/s</dd></dl>
      <p class="leg"><span><i class="or"></i>${UI("s.neuro.cop")}</span><span><i class="rd"></i>${UI("s.neuro.stim")}</span></p>`,
    pose(c, t) {
      rotW(c.B("LeftUpLeg"), X, -deg(48));
      rotW(c.B("LeftLeg"), X, deg(82));
      rotW(c.B("LeftFoot"), X, -deg(20));
      rotW(c.B("Spine"), Z, -deg(2.5));
      rotW(c.B("RightUpLeg"), Z, deg(2));
    },
    setup(c) {
      const { scene, H } = c;
      c.pivot = new THREE.Group(); scene.add(c.pivot);
      c.TR = 220; c.trailHist = [];
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(c.TR * 3), 3));
      g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(c.TR * 3), 3));
      c.trail = new THREE.Line(g, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthTest: false, fog: false, toneMapped: false }));
      c.trail.renderOrder = 6; c.trail.frustumCulled = false; scene.add(c.trail);
      c.copDot = new THREE.Mesh(new THREE.SphereGeometry(.012 * H, 16, 12), new THREE.MeshBasicMaterial({ color: 0xff7a1a, depthTest: false, fog: false, toneMapped: false }));
      c.copDot.renderOrder = 7; scene.add(c.copDot);
      c.stim = [0, 1].map(() => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial(GLOW_RED), blending: THREE.AdditiveBlending, depthTest: false, transparent: true, fog: false })); s.renderOrder = 7; scene.add(s); return s; });
    },
    swayAt(t) {
      return [Math.sin(t * .9) * 1.1 + Math.sin(t * 2.3 + 1) * .5, Math.sin(t * 1.25 + .4) * .9 + Math.sin(t * 3.1) * .35];
    },
    preRender(c, t) {
      // sway the whole body about the stance ankle (ankle strategy)
      const [ax, az] = this.swayAt(t);
      c.model.position.copy(c.basePos); c.model.rotation.set(0, 0, 0);
      c.model.updateMatrixWorld(true);
      const f0 = c.W("RightFoot").clone(); f0.y = 0; c.f0 = f0;
      const e = new THREE.Euler(deg(ax), 0, deg(az));
      c.model.rotation.copy(e);
      c.model.position.copy(f0).add(c.basePos.clone().sub(f0).applyEuler(e));
      c.model.updateMatrixWorld(true);
    },
    cop(c, t) {
      // centre-of-mass projection, ~55% of body height above the ankle
      const [ax, az] = this.swayAt(t), h = .55 * c.H;
      return [h * Math.sin(deg(ax)), -h * Math.sin(deg(az))];
    },
    update(c, t) {
      const K = 7, mm = 1700 / c.H, cx = c.f0.x, cz = c.f0.z + .035 * c.H;
      const pos = c.trail.geometry.attributes.position.array, col = c.trail.geometry.attributes.color.array;
      let mnx = 1e9, mxx = -1e9, mnz = 1e9, mxz = -1e9, path = 0, prev = null;
      for (let i = 0; i < c.TR; i++) {
        const [dz, dx] = this.cop(c, t - (c.TR - 1 - i) / 30);
        pos[i * 3] = cx + dx * K; pos[i * 3 + 1] = .004; pos[i * 3 + 2] = cz + dz * K;
        const a = i / c.TR; col[i * 3] = .99 * a; col[i * 3 + 1] = .44 * a; col[i * 3 + 2] = .05 * a;
        mnx = Math.min(mnx, dx); mxx = Math.max(mxx, dx); mnz = Math.min(mnz, dz); mxz = Math.max(mxz, dz);
        if (prev) path += Math.hypot(dx - prev[0], dz - prev[1]);
        prev = [dx, dz];
      }
      c.trail.geometry.attributes.position.needsUpdate = true; c.trail.geometry.attributes.color.needsUpdate = true;
      c.copDot.position.set(pos[(c.TR - 1) * 3], .004, pos[(c.TR - 1) * 3 + 2]);
      c.hud.cop.textContent = (Math.hypot(mxx - mnx, mxz - mnz) * mm).toFixed(0) + " mm";
      c.hud.vel.textContent = (path / (c.TR / 30) * mm).toFixed(0) + " mm/s";
      const head = c.W("Head"), top = c.W("HeadTop_End");
      c.stim.forEach((s, i) => {
        const side = i ? -1 : 1;
        s.position.copy(head).lerp(top, .75); s.position.x += side * .045 * c.H; s.position.z -= .01 * c.H;
        const k = .5 + .5 * Math.sin(t * 3 + i * Math.PI);
        s.scale.setScalar((.07 + k * .05) * c.H); s.material.opacity = .45 + k * .55;
      });
    }
  },

  pain: {
    clip: "idle", far: "", az: -.95, sway: .22, dist: 2.35, hgt: .62, look: .52,
    highlight: ["Spine", "Spine1", "Spine2", "Neck", "Head"],
    hud: () => `<div class="cap">${UI("s.pain.cap")}</div>
      <p class="leg"><span><i class="rd"></i>${UI("s.pain.up")}</span><span><i class="wh"></i>${UI("s.pain.down")}</span></p>
      <dl><dt>${UI("s.pain.src")}</dt><dd>${UI("s.pain.srcV")}</dd><dt>${UI("s.pain.central")}</dt><dd data-k="brain">${UI("s.pain.mod")}</dd></dl>`,
    pose(c) {
      rotW(c.B("Spine"), X, deg(6));
      rotW(c.B("Neck"), X, -deg(4));
    },
    setup(c) {
      const { scene, H } = c;
      const spr = (stops) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: radial(stops), blending: THREE.AdditiveBlending, depthTest: false, transparent: true, fog: false })); s.renderOrder = 7; scene.add(s); return s; };
      c.src = [spr(GLOW_RED), spr(GLOW_RED)];
      c.brain = spr(GLOW_OR);
      c.up = Array.from({ length: 5 }, () => spr(GLOW_RED));
      c.down = Array.from({ length: 4 }, () => spr(GLOW_WH));
      c.redTex = c.up[0].material.map;
    },
    update(c, t) {
      const H = c.H;
      const P = (n) => c.W(n).clone();
      const lumbar = P("Hips").lerp(P("Spine"), .5); lumbar.z -= .045 * H;
      const knee = P("RightLeg"); knee.z += .02 * H;
      const path = [knee, P("RightUpLeg"), lumbar, P("Spine1").add(new THREE.Vector3(0, 0, -.04 * H)), P("Spine2").add(new THREE.Vector3(0, 0, -.04 * H)), P("Neck").add(new THREE.Vector3(0, 0, -.02 * H)), P("Head").lerp(P("HeadTop_End"), .5)];
      const lens = [0]; for (let i = 1; i < path.length; i++) lens.push(lens[i - 1] + path[i].distanceTo(path[i - 1]));
      const L = lens[lens.length - 1];
      const at = (u) => { const s = u * L; let i = 1; while (i < lens.length - 1 && lens[i] < s) i++; const k = (s - lens[i - 1]) / (lens[i] - lens[i - 1] || 1); return path[i - 1].clone().lerp(path[i], k); };
      const pulse = (x) => .5 + .5 * Math.sin(x);
      c.src[0].position.copy(lumbar); c.src[0].scale.setScalar((.17 + pulse(t * 2.2) * .07) * H); c.src[0].material.opacity = .55 + pulse(t * 2.2) * .45;
      c.src[1].position.copy(knee); c.src[1].scale.setScalar((.13 + pulse(t * 2.2 + 1.5) * .05) * H); c.src[1].material.opacity = .5 + pulse(t * 2.2 + 1.5) * .45;
      let arrive = 0;
      c.up.forEach((s, i) => {
        const u = (t * .32 + i / c.up.length) % 1;
        s.position.copy(at(u)); s.scale.setScalar(.075 * H); s.material.opacity = Math.min(1, u * 6) * (u > .93 ? (1 - u) / .07 : 1);
        if (u > .85) arrive = Math.max(arrive, (u - .85) / .15);
      });
      c.down.forEach((s, i) => {
        const u = 1 - ((t * .22 + i / c.down.length + .13) % 1);
        const v = .28 + u * .72;
        const p = at(v); p.x += .035 * H;
        s.position.copy(p); s.scale.setScalar(.05 * H); s.material.opacity = .75 * Math.min(1, (1 - u) * 5) * Math.min(1, u * 4);
      });
      c.glowB = Math.max((c.glowB || 0) * .96, arrive);
      c.brain.position.copy(P("Head").lerp(P("HeadTop_End"), .55));
      c.brain.scale.setScalar((.16 + c.glowB * .08) * H); c.brain.material.opacity = .35 + c.glowB * .65;
      c.hud.brain.textContent = c.glowB > .35 ? UI("s.pain.arrived") : UI("s.pain.mod");
    }
  }
};

/* ---------- shared stage ---------- */
function make(host, buf) {
  const cfg = SCENES[host.dataset.scene];
  if (!cfg) return;
  host.classList.add("r3");
  host.innerHTML = `<canvas role="img" aria-label="${host.dataset.label || UI("research.3d")}"></canvas><aside class="r3-hud">${cfg.hud()}</aside>`;
  host.closest(".area").classList.remove("noimg");
  const canvas = host.querySelector("canvas");
  const hud = {}; host.querySelectorAll("[data-k]").forEach((e) => (hud[e.dataset.k] = e));

  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); } catch (e) { fallback(host); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 6, 13);
  const camera = new THREE.PerspectiveCamera(26, 1, .1, 50);
  scene.add(new THREE.HemisphereLight(0x8890a0, 0x050505, .6));
  const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-3, 4, 2); scene.add(key);
  const rimA = new THREE.DirectionalLight(0xfc7101, 3.2); rimA.position.set(2, 2.5, -3); scene.add(rimA);
  const rimB = new THREE.DirectionalLight(0xea2619, 2.4); rimB.position.set(3, 1, 3); scene.add(rimB);

  const floorTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 256;
    const g = c.getContext("2d");
    g.fillStyle = "#000"; g.fillRect(0, 0, 256, 256);
    g.strokeStyle = "rgba(255,255,255,.22)"; g.lineWidth = 2;
    g.beginPath(); g.moveTo(0, 1); g.lineTo(256, 1); g.moveTo(1, 0); g.lineTo(1, 256); g.stroke();
    g.strokeStyle = "rgba(255,255,255,.07)"; g.lineWidth = 1;
    for (let i = 64; i < 256; i += 64) { g.beginPath(); g.moveTo(0, i); g.lineTo(256, i); g.moveTo(i, 0); g.lineTo(i, 256); g.stroke(); }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshBasicMaterial({ map: floorTex, transparent: true, opacity: .9 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: radial([[0, "rgba(234,38,25,.85)"], [.45, "rgba(252,113,1,.25)"], [1, "rgba(0,0,0,0)"]]), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = .002; scene.add(glow);

  const body = new THREE.MeshStandardMaterial({ color: 0x15161a, metalness: .35, roughness: .32, transparent: true, depthWrite: false });
  body.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace("#include <dithering_fragment>", `
      float fr = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.2);
      gl_FragColor.rgb += mix(vec3(0.99, 0.44, 0.0), vec3(0.92, 0.15, 0.1), fr) * fr * 1.35;
      gl_FragColor.a = clamp(0.16 + fr * 0.95, 0.0, 1.0);
      #include <dithering_fragment>`);
  };
  const boneMat = new THREE.MeshBasicMaterial({ color: 0xf2eee8, depthTest: false, transparent: true, opacity: .9, fog: false });
  const boneFar = new THREE.MeshBasicMaterial({ color: 0x8f8a84, depthTest: false, transparent: true, opacity: .5, fog: false });
  const markNear = new THREE.MeshBasicMaterial({ color: 0xff7a1a, depthTest: false, fog: false, toneMapped: false });
  const markRing = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: .85, side: THREE.DoubleSide, fog: false });
  const markFar = new THREE.MeshBasicMaterial({ color: 0x9a9aa0, depthTest: false, fog: false });

  new GLTFLoader().parse(buf.slice(0), "", (gltf) => build(gltf), () => fallback(host));

  function build(gltf) {
    const model = gltf.scene;
    model.traverse((o) => {
      if (o.isMesh) {
        if (/Joints/i.test((o.material && o.material.name) || "")) { o.visible = false; return; }
        o.material = body; o.renderOrder = 1; o.frustumCulled = false;
      }
    });
    scene.add(model);
    const B = (n) => model.getObjectByName("mixamorig" + n);
    const clip = gltf.animations.find((a) => a.name === cfg.clip);
    clip.tracks = clip.tracks.filter((t) => !/\.scale$/.test(t.name));
    const hp = clip.tracks.find((t) => t.name === "mixamorigHips.position");
    if (hp) { const v = hp.values, x0 = v[0], z0 = v[2]; for (let i = 0; i < v.length; i += 3) { v[i] = x0; v[i + 2] = z0; } }
    const mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(clip).play();
    mixer.update(0);

    const box = new THREE.Box3().setFromObject(model);
    const H = box.max.y - box.min.y;
    model.position.y -= box.min.y;
    const ctr = new THREE.Vector3(); box.getCenter(ctr);
    model.position.x -= ctr.x; model.position.z -= ctr.z;
    scene.fog.near = H * 4.2; scene.fog.far = H * 9;

    const v = {};
    const W = (n) => (v[n] = v[n] || new THREE.Vector3(), B(n).getWorldPosition(v[n]), v[n]);
    const c = { H, B, W, scene, camera, model, mixer, hud, clipDur: clip.duration, basePos: model.position.clone() };
    if (cfg.clip === "idle") {
      mixer.update(0); model.updateMatrixWorld(true);
      const sh = W("RightArm").clone(), el = W("RightForeArm").clone();
      c.armRest = THREE.MathUtils.radToDeg(Math.atan2(el.z - sh.z, -(el.y - sh.y)));
    }

    const cyl = new THREE.CylinderGeometry(1, 1, 1, 10, 1, false); cyl.translate(0, .5, 0);
    const segs = [];
    const chain = (names, mat, r0, r1, start) => {
      const bones = names.map(B); if (start) bones.unshift(B(start));
      for (let i = 0; i < bones.length - 1; i++) {
        const m = new THREE.Mesh(cyl, mat); m.renderOrder = 3; scene.add(m);
        segs.push({ a: bones[i], b: bones[i + 1], m, r: (r0 + (r1 - r0) * (i / Math.max(1, bones.length - 2))) * H });
      }
    };
    const farL = cfg.far === "L";
    chain(["LeftUpLeg", "LeftLeg", "LeftFoot", "LeftToeBase", "LeftToe_End"], farL ? boneFar : boneMat, .0075, .004, "Hips");
    chain(["LeftShoulder", "LeftArm", "LeftForeArm", "LeftHand"], farL ? boneFar : boneMat, .0055, .004, "Spine2");
    chain(["Hips", "Spine", "Spine1", "Spine2", "Neck", "Head", "HeadTop_End"], boneMat, .0085, .006);
    chain(["RightUpLeg", "RightLeg", "RightFoot", "RightToeBase", "RightToe_End"], boneMat, .0085, .0045, "Hips");
    chain(["RightShoulder", "RightArm", "RightForeArm", "RightHand"], boneMat, .006, .0045, "Spine2");

    const sph = new THREE.SphereGeometry(1, 16, 12), ring = new THREE.RingGeometry(1.35, 1.7, 32);
    const marks = [];
    const allJ = ["RightUpLeg", "RightLeg", "RightFoot", "RightArm", "RightForeArm", "RightHand", "LeftUpLeg", "LeftLeg", "LeftFoot", "LeftArm", "LeftForeArm", "LeftHand", "Head"];
    allJ.forEach((n) => {
      const hi = cfg.highlight.includes(n);
      const m = new THREE.Mesh(sph, hi ? markNear : markFar); m.renderOrder = 5; scene.add(m);
      let rg = null; if (hi) { rg = new THREE.Mesh(ring, markRing); rg.renderOrder = 5; scene.add(rg); }
      marks.push({ b: B(n), m, rg, s: (hi ? .0105 : .0062) * H });
    });

    if (cfg.setup) cfg.setup(c);

    let narrow = false;
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; narrow = w < 420;
      camera.fov = narrow ? 34 : 27;
      if (narrow) camera.setViewOffset(w, h, 0, h * .17, w, h); else camera.setViewOffset(w, h, -w * .16, 0, w, h);
      camera.updateProjectionMatrix();
    };
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas); else addEventListener("resize", resize);
    resize();

    let visible = true, t = 0;
    if ("IntersectionObserver" in window) new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { rootMargin: "120px" }).observe(host);
    const clock = new THREE.Clock();
    const up = new THREE.Vector3(0, 1, 0), d = new THREE.Vector3(), pa = new THREE.Vector3(), pb = new THREE.Vector3();
    const look = new THREE.Vector3(0, H * cfg.look, 0);
    host.classList.add("ready");

    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), .05);
      if (!visible) return;
      const step = reduce ? 0 : dt;
      t += step;
      mixer.update(step);
      if (cfg.pose) cfg.pose(c, t);
      if (cfg.preRender) cfg.preRender(c, t);
      model.updateMatrixWorld(true);

      const az = cfg.az + (reduce ? 0 : Math.sin(t * .15) * cfg.sway);
      const dist = H * cfg.dist * (narrow ? 1.25 : 1);
      camera.position.set(-Math.cos(az) * dist, H * cfg.hgt, Math.sin(az) * dist);
      camera.lookAt(look);
      if (cfg.walk) floorTex.offset.y = reduce ? 0 : (floorTex.offset.y + dt * .55) % 1;

      for (const s of segs) {
        s.a.getWorldPosition(pa); s.b.getWorldPosition(pb);
        d.subVectors(pb, pa); const len = d.length();
        s.m.position.copy(pa); s.m.quaternion.setFromUnitVectors(up, d.normalize()); s.m.scale.set(s.r, len, s.r);
      }
      for (const k of marks) {
        k.b.getWorldPosition(k.m.position); k.m.scale.setScalar(k.s);
        if (k.rg) { k.rg.position.copy(k.m.position); k.rg.scale.setScalar(k.s); k.rg.quaternion.copy(camera.quaternion); }
      }
      if (cfg.update) cfg.update(c, t, step);
      renderer.render(scene, camera);
    }
    frame();
  }
}
