import * as THREE from "three";
import { GLTFLoader } from "../vendor/three/GLTFLoader.js";

const host = document.getElementById("gaitlab");
if (host) init();

function init() {
  const canvas = host.querySelector("canvas");
  const hud = {
    hip: host.querySelector("[data-k=hip]"),
    knee: host.querySelector("[data-k=knee]"),
    ankle: host.querySelector("[data-k=ankle]"),
    phase: host.querySelector("[data-k=phase]"),
    pct: host.querySelector("[data-k=pct]"),
    dot: host.querySelector(".phase-dot")
  };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  } catch (e) {
    host.classList.add("no-webgl");
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 1);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 6, 13);
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);

  scene.add(new THREE.HemisphereLight(0x8890a0, 0x050505, 0.6));
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
  const glowTex = (() => {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const g = c.getContext("2d"), r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, "rgba(234,38,25,.85)"); r.addColorStop(.45, "rgba(252,113,1,.25)"); r.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.6), new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.rotation.x = -Math.PI / 2; glow.position.y = 0.002; scene.add(glow);

  const body = new THREE.MeshStandardMaterial({ color: 0x15161a, metalness: .35, roughness: .32, transparent: true, depthWrite: false, side: THREE.FrontSide });
  body.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace("#include <dithering_fragment>", `
      float fr = pow(1.0 - abs(dot(normalize(normal), normalize(vViewPosition))), 2.2);
      gl_FragColor.rgb += mix(vec3(0.99, 0.44, 0.0), vec3(0.92, 0.15, 0.1), fr) * fr * 1.35;
      gl_FragColor.a = clamp(0.16 + fr * 0.95, 0.0, 1.0);
      #include <dithering_fragment>`);
  };

  const boneMat = new THREE.MeshBasicMaterial({ color: 0xf2eee8, depthTest: false, transparent: true, opacity: .92, fog: false });
  const boneFar = new THREE.MeshBasicMaterial({ color: 0x8f8a84, depthTest: false, transparent: true, opacity: .55, fog: false });
  const markNear = new THREE.MeshBasicMaterial({ color: 0xff7a1a, depthTest: false, fog: false, toneMapped: false });
  const markRing = new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: .85, side: THREE.DoubleSide, fog: false });
  const markFar = new THREE.MeshBasicMaterial({ color: 0x7a7a80, depthTest: false, fog: false });

  const loader = new GLTFLoader();
  const modelUrl = new URL("../models/xbot.glb", import.meta.url).href;
  loader.load(modelUrl, (gltf) => build(gltf), undefined, () => host.classList.add("no-webgl"));

  function build(gltf) {
    const model = gltf.scene;
    model.traverse((o) => {
      if (o.isMesh) {
        if (/Joints/i.test(o.material && o.material.name || "")) { o.visible = false; return; }
        o.material = body; o.renderOrder = 1; o.frustumCulled = false;
      }
    });
    scene.add(model);
    const B = (n) => model.getObjectByName("mixamorig" + n);

    const clip = gltf.animations.find((a) => a.name === "walk");
    clip.tracks = clip.tracks.filter((t) => !/\.(scale)$/.test(t.name));
    const hipsPos = clip.tracks.find((t) => t.name === "mixamorigHips.position");
    if (hipsPos) {
      const v = hipsPos.values, x0 = v[0], z0 = v[2];
      for (let i = 0; i < v.length; i += 3) { v[i] = x0; v[i + 2] = z0; }
    }
    const mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(clip); action.play();

    const box = new THREE.Box3().setFromObject(model);
    scene.fog.near = 1; 
    const H = box.max.y - box.min.y;
    model.position.y -= box.min.y;
    const center = new THREE.Vector3(); box.getCenter(center);
    model.position.x -= center.x; model.position.z -= center.z;
    const target = new THREE.Vector3(0, H * 0.5, 0);
    scene.fog.near = H * 4.2; scene.fog.far = H * 9;

    const chains = {
      axial: ["Hips", "Spine", "Spine1", "Spine2", "Neck", "Head", "HeadTop_End"],
      R: ["RightUpLeg", "RightLeg", "RightFoot", "RightToeBase", "RightToe_End"],
      L: ["LeftUpLeg", "LeftLeg", "LeftFoot", "LeftToeBase", "LeftToe_End"],
      RA: ["RightShoulder", "RightArm", "RightForeArm", "RightHand"],
      LA: ["LeftShoulder", "LeftArm", "LeftForeArm", "LeftHand"]
    };
    const segs = [];
    const cyl = new THREE.CylinderGeometry(1, 1, 1, 10, 1, false); cyl.translate(0, .5, 0);
    const addChain = (names, mat, r0, r1, start) => {
      const bones = names.map(B);
      if (start) bones.unshift(B(start));
      for (let i = 0; i < bones.length - 1; i++) {
        const m = new THREE.Mesh(cyl, mat); m.renderOrder = 3; scene.add(m);
        const r = (r0 + (r1 - r0) * (i / Math.max(1, bones.length - 2))) * H;
        segs.push({ a: bones[i], b: bones[i + 1], m, r });
      }
    };
    addChain(chains.L, boneFar, .0075, .004, "Hips");
    addChain(chains.LA, boneFar, .0055, .004, "Spine2");
    addChain(chains.axial, boneMat, .0085, .006);
    addChain(chains.R, boneMat, .0085, .0045, "Hips");
    addChain(chains.RA, boneMat, .006, .0045, "Spine2");

    const sph = new THREE.SphereGeometry(1, 16, 12);
    const ring = new THREE.RingGeometry(1.35, 1.7, 32);
    const markers = [];
    const addMark = (n, near) => {
      const m = new THREE.Mesh(sph, near ? markNear : markFar); m.renderOrder = 5; scene.add(m);
      let rg = null;
      if (near) { rg = new THREE.Mesh(ring, markRing); rg.renderOrder = 5; scene.add(rg); }
      markers.push({ b: B(n), m, rg, s: (near ? .0105 : .0065) * H });
    };
    ["RightUpLeg", "RightLeg", "RightFoot", "RightToeBase", "RightArm", "RightForeArm", "RightHand", "Head"].forEach((n) => addMark(n, true));
    ["LeftUpLeg", "LeftLeg", "LeftFoot", "LeftToeBase", "LeftArm", "LeftForeArm", "LeftHand"].forEach((n) => addMark(n, false));

    const TRAIL = 90;
    const trailGeo = new THREE.BufferGeometry();
    const tPos = new Float32Array(TRAIL * 3), tCol = new Float32Array(TRAIL * 3);
    trailGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
    trailGeo.setAttribute("color", new THREE.BufferAttribute(tCol, 3));
    const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthTest: false, fog: false, toneMapped: false }));
    trail.renderOrder = 4; trail.frustumCulled = false; scene.add(trail);
    const hist = [];

    const v = {}; const W = (n) => (v[n] = v[n] || new THREE.Vector3(), B(n).getWorldPosition(v[n]), v[n]);
    const ang = (a, b) => THREE.MathUtils.radToDeg(a.angleTo(b));
    const sagittal = (vec) => new THREE.Vector3(0, vec.y, vec.z).normalize();
    function angles() {
      const hip = W("RightUpLeg").clone(), knee = W("RightLeg").clone(), ankle = W("RightFoot").clone(), toe = W("RightToeBase").clone();
      const trunkDown = sagittal(W("Hips").clone().sub(W("Spine2")));
      const thigh = sagittal(knee.clone().sub(hip)), shank = sagittal(ankle.clone().sub(knee)), foot = sagittal(toe.clone().sub(ankle));
      const hipF = ang(trunkDown, thigh) * Math.sign(thigh.z - trunkDown.z || 1);
      const kneeF = ang(thigh, shank);
      const ankleA = ang(shank.clone().negate(), foot);
      return { hipF, kneeF, ankleA, footY: ankle.y, footZ: ankle.z - W("Hips").z };
    }

    const dur = clip.duration, N = 120;
    let ref = null, hsT = 0, maxZ = -1e9, minY = 1e9, maxY = -1e9;
    const samples = [];
    for (let i = 0; i < N; i++) {
      mixer.setTime((i / N) * dur); model.updateMatrixWorld(true);
      const a = angles(); samples.push(a);
      if (a.footZ > maxZ) { maxZ = a.footZ; hsT = (i / N) * dur; }
      minY = Math.min(minY, a.footY); maxY = Math.max(maxY, a.footY);
    }
    const ankleBase = samples.reduce((s, a) => s + a.ankleA, 0) / N;
    const kneeMin = Math.min(...samples.map((a) => a.kneeF));
    const stanceY = minY + (maxY - minY) * .22;
    let stride = 0;
    { const zs = samples.map((a) => a.footZ); stride = Math.max(...zs) - Math.min(...zs); }
    const speed = (stride * 2) / dur;

    let narrow = false;
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      narrow = w < 700;
      camera.fov = narrow ? 28 : 23;
      if (narrow) camera.clearViewOffset(); else camera.setViewOffset(w, h, w * 0.14, 0, w, h);
      camera.updateProjectionMatrix();
    }
    addEventListener("resize", resize);
    resize();

    const clock = new THREE.Clock();
    let visible = true, t = 0;
    if ("IntersectionObserver" in window) new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(host);
    host.classList.add("ready");

    function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), .05);
      if (!visible) return;
      t += dt;
      mixer.update(reduce ? 0 : dt);
      model.updateMatrixWorld(true);

      const orbit = reduce ? .25 : .25 + Math.sin(t * .16) * .3;
      const dist = narrow ? H * 2.35 : H * 3.4;
      camera.position.set(-Math.cos(orbit) * dist, H * .6, Math.sin(orbit) * dist);
      camera.lookAt(narrow ? target.clone().setY(H * .47) : target);
      floorTex.offset.y = reduce ? 0 : (floorTex.offset.y + (speed * dt) / 2) % 1;

      const up = new THREE.Vector3(0, 1, 0), d = new THREE.Vector3(), pa = new THREE.Vector3(), pb = new THREE.Vector3();
      for (const s of segs) {
        s.a.getWorldPosition(pa); s.b.getWorldPosition(pb);
        d.subVectors(pb, pa); const len = d.length();
        s.m.position.copy(pa);
        s.m.quaternion.setFromUnitVectors(up, d.normalize());
        s.m.scale.set(s.r, len, s.r);
      }
      for (const k of markers) {
        k.b.getWorldPosition(k.m.position); k.m.scale.setScalar(k.s);
        if (k.rg) { k.rg.position.copy(k.m.position); k.rg.scale.setScalar(k.s); k.rg.quaternion.copy(camera.quaternion); }
      }
      const fp = W("RightFoot").clone();
      hist.push(fp); if (hist.length > TRAIL) hist.shift();
      for (let i = 0; i < TRAIL; i++) {
        const p = hist[Math.max(0, hist.length - TRAIL + i)] || fp;
        tPos.set([p.x, p.y, p.z], i * 3);
        const a = i / TRAIL;
        tCol.set([.99 * a, .44 * a, .02 * a], i * 3);
      }
      trailGeo.attributes.position.needsUpdate = true; trailGeo.attributes.color.needsUpdate = true;

      const a = angles();
      const pct = ((((mixer.time - hsT) % dur) + dur) % dur) / dur * 100;
      hud.hip.textContent = (a.hipF >= 0 ? "+" : "") + a.hipF.toFixed(0) + "°";
      hud.knee.textContent = (a.kneeF - kneeMin).toFixed(0) + "°";
      const an = a.ankleA - ankleBase;
      hud.ankle.textContent = (an >= 0 ? "+" : "") + an.toFixed(0) + "°";
      hud.phase.textContent = a.footY < stanceY ? "입각기 Stance" : "유각기 Swing";
      hud.pct.textContent = pct.toFixed(0) + "%";
      hud.dot.style.left = pct + "%";

      renderer.render(scene, camera);
    }
    frame();
  }
}
