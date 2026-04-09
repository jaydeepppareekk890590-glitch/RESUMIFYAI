/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: WORLD
   File: templates/portfolio/tpl-world.js
   Style: 3D Island World · Cyclist · Night Scene · Three.js
================================================================ */

window.TPL_WORLD = {
  id: 'world',
  name: 'World',
  category: 'Immersive 3D',
  theme: 'night-island',
  animated: true,

  thumbnail() {
    return `
      <div style="background:linear-gradient(135deg,#060d1a,#0a1428);width:100%;height:100%;position:relative;overflow:hidden;font-family:sans-serif">
        <!-- Stars -->
        <div style="position:absolute;top:8px;left:20px;width:2px;height:2px;background:#fff;border-radius:50%;opacity:0.8"></div>
        <div style="position:absolute;top:15px;left:55px;width:1px;height:1px;background:#fff;border-radius:50%;opacity:0.6"></div>
        <div style="position:absolute;top:6px;right:22px;width:2px;height:2px;background:#fff;border-radius:50%;opacity:0.7"></div>
        <div style="position:absolute;top:22px;right:40px;width:1px;height:1px;background:#fff;border-radius:50%;opacity:0.5"></div>
        <!-- Moon -->
        <div style="position:absolute;top:10px;right:18px;width:14px;height:14px;border-radius:50%;background:#fffbe8;box-shadow:0 0 8px rgba(255,251,232,0.6)"></div>
        <!-- Island -->
        <div style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);width:70px;height:28px;background:linear-gradient(to bottom,#228818,#1a5a10);border-radius:50% 50% 40% 40%;overflow:hidden">
          <!-- Volcano -->
          <div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);width:20px;height:22px;background:linear-gradient(to top,#1e4a10,#2a6a14);clip-path:polygon(50% 0%,0% 100%,100% 100%)"></div>
          <!-- Lava glow -->
          <div style="position:absolute;top:-4px;left:50%;transform:translateX(-50%);width:6px;height:6px;border-radius:50%;background:#ff4400;box-shadow:0 0 6px #ff4400"></div>
          <!-- Road ring -->
          <div style="position:absolute;bottom:4px;left:50%;transform:translateX(-50%);width:52px;height:14px;border-radius:50%;border:2px solid #2a2a2a;background:transparent"></div>
        </div>
        <!-- Water -->
        <div style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);width:90px;height:14px;background:rgba(10,32,64,0.7);border-radius:50%;border:1px solid rgba(0,200,255,0.2)"></div>
        <!-- HUD -->
        <div style="position:absolute;top:8px;left:10px;background:rgba(10,20,50,0.7);border-radius:10px;padding:2px 8px;font-size:7px;font-weight:700;color:#a8d8ff;border:1px solid rgba(100,180,255,0.25)">🌙 My World</div>
        <!-- Cyclist emoji -->
        <div style="position:absolute;bottom:34px;left:50%;transform:translateX(-50%);font-size:12px">🚴</div>
        <!-- Landmarks hint -->
        <div style="position:absolute;bottom:6px;left:0;right:0;text-align:center;font-size:6px;color:rgba(100,180,255,0.5);letter-spacing:.1em">SCROLL TO RIDE · CLICK TO EXPLORE</div>
      </div>`;
  },

  render(data) {
    const name       = data.name       || 'Your Name';
    const role       = data.role       || 'Developer & Designer';
    const bio        = data.bio        || 'A passionate developer who crafts beautiful, fast, purposeful web experiences.';
    const about      = data.about      || bio;
    const location   = data.location   || 'Your City, India';
    const email      = data.email      || 'you@email.com';
    const github     = data.github     || '';
    const linkedin   = data.linkedin   || '';
    const skills     = data.skills     || [];
    const projects   = data.projects   || [];
    const experience = data.experience || [];

    const githubH   = github.replace(/^https?:\/\//, '') || 'github.com/you';
    const linkedinH = linkedin.replace(/^https?:\/\//, '') || 'linkedin.com/in/you';

    // Build skills HTML for overlay
    const skillGroups = [
      { title: 'Frontend', items: skills.filter((_, i) => i < 4).map(s => s.name || s) },
      { title: 'Backend & Cloud', items: skills.filter((_, i) => i >= 4 && i < 8).map(s => s.name || s) },
      { title: 'Design & Tools', items: skills.filter((_, i) => i >= 8).map(s => s.name || s) },
    ].filter(g => g.items.length > 0);
    if (skillGroups.length === 0) {
      skillGroups.push({ title: 'Skills', items: ['JavaScript', 'React', 'Node.js', 'CSS'] });
    }

    const skillsHTML = skillGroups.map(g => `
      <div class="pc"><div class="pt">${g.title}</div><div class="sg">${g.items.map(s => `<span class="st">${s}</span>`).join('')}</div></div>`).join('');

    // Experience HTML
    const expHTML = experience.length
      ? experience.map(e => `<div class="exp-card"><div class="pt">${e.title} · ${e.company}</div><div class="ps">${e.duration}</div><div class="pb">${e.description || ''}</div></div>`).join('')
      : `<div class="exp-card"><div class="pt">Your Experience</div><div class="ps">Company · Duration</div><div class="pb">Add your work experience here.</div></div>`;

    // Projects HTML
    const projHTML = projects.length
      ? projects.map(p => `<div class="pj"><div class="pjn">${p.emoji || '🚀'} ${p.name}</div><div class="pjd">${p.description || ''}</div><div class="sg" style="margin-top:8px">${(p.tech || []).map(t => `<span class="st">${t}</span>`).join('')}</div></div>`).join('')
      : `<div class="pj"><div class="pjn">🚀 Your Project</div><div class="pjd">Add your amazing projects here.</div></div>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — My World</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden;background:#060d1a;font-family:'Segoe UI',sans-serif;user-select:none}
canvas{display:block;cursor:grab}
canvas:active{cursor:grabbing}
#hud{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:14px 22px;z-index:50;pointer-events:none}
.hud-pill{background:rgba(10,20,50,0.7);backdrop-filter:blur(14px);border-radius:30px;padding:8px 20px;font-size:12px;font-weight:700;color:#a8d8ff;letter-spacing:0.1em;border:1px solid rgba(100,180,255,0.25)}
#scroll-hint{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:rgba(5,15,40,0.8);backdrop-filter:blur(10px);border:1px solid rgba(100,180,255,0.2);border-radius:30px;padding:8px 22px;font-size:11px;font-weight:700;color:#88ccff;letter-spacing:0.12em;z-index:50;pointer-events:none;animation:bob 2.5s ease-in-out infinite;white-space:nowrap}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-5px)}}
#zoom-btns{position:fixed;right:20px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;z-index:50}
.zoom-btn{width:40px;height:40px;border-radius:50%;background:rgba(10,20,50,0.7);backdrop-filter:blur(10px);border:1px solid rgba(100,180,255,0.3);color:#88ccff;font-size:20px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.zoom-btn:hover{background:rgba(30,60,120,0.8)}
#shop-page{display:none;position:fixed;inset:0;z-index:300;flex-direction:column;overflow:hidden}
#shop-page.show{display:flex;animation:pin 0.35s ease}
@keyframes pin{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}
#shop-hdr{display:flex;align-items:center;gap:16px;padding:20px 32px;flex-shrink:0}
#back-btn{background:rgba(255,255,255,0.18);border:2px solid rgba(255,255,255,0.4);color:#fff;padding:9px 20px;border-radius:30px;font-size:13px;font-weight:800;cursor:pointer;transition:all 0.2s}
#back-btn:hover{background:rgba(255,255,255,0.3);transform:translateX(-3px)}
#shop-ttl{font-size:24px;font-weight:900;color:#fff}
#shop-body{flex:1;overflow-y:auto;padding:0 32px 40px}
.th-about{background:linear-gradient(135deg,#0a0a18,#1a0a35,#2d1060)}
.th-skills{background:linear-gradient(135deg,#001428,#003366,#004488)}
.th-exp{background:linear-gradient(135deg,#0d0d0d,#1a1a2e,#16213e)}
.th-proj{background:linear-gradient(135deg,#0f0020,#1a0535,#0d0d30)}
.th-award{background:linear-gradient(135deg,#0a0800,#1a1400,#2a2000)}
.th-contact{background:linear-gradient(135deg,#0a0005,#1a000a,#300010)}
.pc{background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);border-radius:18px;padding:22px 26px;margin-bottom:16px}
.pt{font-size:19px;font-weight:800;color:#fff;margin-bottom:8px}
.ps{font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
.pb{font-size:14px;color:rgba(255,255,255,0.82);line-height:1.8}
.sg{display:flex;flex-wrap:wrap;gap:9px;margin-top:10px}
.st{padding:5px 14px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.25);color:#fff}
.cr{display:flex;align-items:center;gap:12px;padding:13px 16px;border-radius:14px;margin-bottom:10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.15);color:#fff;font-size:14px;font-weight:600}
.pj{background:rgba(255,255,255,0.06);border-radius:14px;padding:14px 18px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.12)}
.pjn{font-weight:800;color:#fff;font-size:14px}
.pjd{font-size:12px;color:rgba(255,255,255,0.65);margin-top:4px}
.exp-card{background:rgba(255,255,255,0.06);border-left:4px solid #4488ff;border-radius:0 14px 14px 0;padding:16px 20px;margin-bottom:14px}
#cyclist-svg{position:fixed;pointer-events:none;z-index:10;transition:none}
#loader{position:fixed;inset:0;background:linear-gradient(180deg,#030810 0%,#060d1a 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 1s}
#loader.gone{opacity:0;pointer-events:none}
#lb{font-size:52px;animation:lba 0.55s ease-in-out infinite alternate}
@keyframes lba{from{transform:translateY(0)}to{transform:translateY(-14px)}}
#lt{margin-top:16px;font-size:12px;font-weight:800;color:#4488ff;letter-spacing:0.28em}
</style>
</head>
<body>
<div id="loader"><div id="lb">🚴</div><div id="lt">BUILDING YOUR WORLD...</div></div>
<canvas id="c"></canvas>
<div id="cyclist-svg"></div>
<div id="hud">
  <div class="hud-pill">🌙 ${name}'s World</div>
  <div class="hud-pill" id="secLabel">Scroll to Ride</div>
</div>
<div id="scroll-hint">← Scroll / Drag to Ride &nbsp;·&nbsp; Click Landmarks to Explore →</div>
<div id="zoom-btns">
  <button class="zoom-btn" onclick="doZoom(1)">+</button>
  <button class="zoom-btn" onclick="doZoom(-1)">−</button>
</div>

<div id="shop-page">
  <div id="shop-hdr">
    <button id="back-btn" onclick="closePage()">← Back to Ride</button>
    <div id="shop-ttl"></div>
  </div>
  <div id="shop-body"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
// ─── PAGE CONTENT (injected from Resumify data) ───────────────
const PAGES = {
  about: {
    theme: 'th-about', title: '🎬 About Me',
    html: \`
    <div class="pc" style="text-align:center;padding:30px">
      <div style="font-size:64px;margin-bottom:12px">🎬</div>
      <div class="pt" style="font-size:24px">Hi, I'm ${name}</div>
      <div class="ps">${role} · ${location}</div>
      <div class="pb">${about}</div>
    </div>
    <div class="pc"><div class="pt">My Story</div><div class="pb">${bio}</div></div>\`
  },
  skills: {
    theme: 'th-skills', title: '⚡ Skills Lab',
    html: \`${skillsHTML}\`
  },
  experience: {
    theme: 'th-exp', title: '🏢 Experience',
    html: \`${expHTML}\`
  },
  projects: {
    theme: 'th-proj', title: '🚀 Projects',
    html: \`${projHTML}\`
  },
  awards: {
    theme: 'th-award', title: '🏆 Achievements',
    html: \`
    <div class="pc" style="text-align:center;padding:30px">
      <div style="font-size:64px;margin-bottom:12px">🏆</div>
      <div class="pt">Achievements</div>
      <div class="pb">Add your awards and achievements here using the Resumify builder.</div>
    </div>\`
  },
  contact: {
    theme: 'th-contact', title: '📞 Contact',
    html: \`
    <div class="pc" style="text-align:center;margin-bottom:22px"><div class="pt">Let's Talk! 📞</div><div class="pb">Open to freelance, full-time roles, and exciting collaborations.</div></div>
    ${email ? `<div class="cr"><span style="font-size:22px">📧</span><span>${email}</span></div>` : ''}
    ${githubH ? `<div class="cr"><span style="font-size:22px">🐙</span><span>${githubH}</span></div>` : ''}
    ${linkedinH ? `<div class="cr"><span style="font-size:22px">💼</span><span>${linkedinH}</span></div>` : ''}
    <div class="cr"><span style="font-size:22px">📍</span><span>${location}</span></div>\`
  }
};

function openPage(id) {
  const p = PAGES[id], pg = document.getElementById('shop-page');
  pg.className = 'show ' + p.theme;
  document.getElementById('shop-ttl').textContent = p.title;
  document.getElementById('shop-body').innerHTML = p.html;
  pg.style.display = 'flex';
}
function closePage() {
  const pg = document.getElementById('shop-page');
  pg.style.display = 'none'; pg.className = '';
}

// ─── THREE.JS ─────────────────────────────────────────────────
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x060d1a);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x060d1a, 0.011);

const camera = new THREE.PerspectiveCamera(44, innerWidth / innerHeight, 0.1, 300);
let camDist = 30, camTarget = 30;
camera.position.set(0, 14, 30);
camera.lookAt(0, 2, 0);

const M = (c, o = {}) => new THREE.MeshLambertMaterial({ color: c, ...o });
const MB = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, ...o });
function BOX(w, h, d, c, o = {}) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), M(c, o)); m.castShadow = m.receiveShadow = true; return m; }
function CYL(rt, rb, h, s, c, o = {}) { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, s), M(c, o)); m.castShadow = m.receiveShadow = true; return m; }
function SPH(r, c, s, o = {}) { return new THREE.Mesh(new THREE.SphereGeometry(r, s || 12, Math.ceil((s || 12) * 0.7)), M(c, o)); }
function CONE(r, h, s, c) { const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, s), M(c)); m.castShadow = true; return m; }
function pa(g, m, x, y, z) { if (x !== undefined) m.position.set(x, y, z); g.add(m); return m; }

// Lighting
scene.add(new THREE.AmbientLight(0x223366, 1.1));
const moonLight = new THREE.DirectionalLight(0x8899dd, 0.9);
moonLight.position.set(-18, 35, 12); moonLight.castShadow = true;
moonLight.shadow.mapSize.set(2048, 2048);
moonLight.shadow.camera.left = moonLight.shadow.camera.bottom = -25;
moonLight.shadow.camera.right = moonLight.shadow.camera.top = 25;
moonLight.shadow.camera.far = 100; scene.add(moonLight);
const lavaFill = new THREE.PointLight(0xff4400, 0.8, 20); lavaFill.position.set(0, 10, 0); scene.add(lavaFill);

// Stars
{ const sg = new THREE.BufferGeometry(); const N = 800, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i*3]=(Math.random()-.5)*200; pos[i*3+1]=20+Math.random()*80; pos[i*3+2]=(Math.random()-.5)*200; }
  sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.28, transparent: true, opacity: 0.9 }))); }

// Moon
{ const moon = SPH(2.5, 0xfffbe8, 16, { emissive: 0xeeddaa, emissiveIntensity: 0.35 });
  moon.position.set(-38, 38, -22); scene.add(moon);
  const halo = new THREE.Mesh(new THREE.RingGeometry(2.5, 4.2, 32), MB(0xfff8aa, { transparent: true, opacity: 0.06, side: THREE.DoubleSide }));
  halo.position.copy(moon.position); halo.lookAt(camera.position); scene.add(halo); }

// Ocean
const deepOcean = new THREE.Mesh(new THREE.CircleGeometry(100, 64), M(0x060f22));
deepOcean.rotation.x = -Math.PI / 2; deepOcean.position.y = -4.5; scene.add(deepOcean);
const nightWater = new THREE.Mesh(new THREE.CircleGeometry(28, 64), new THREE.MeshLambertMaterial({ color: 0x0a2040, transparent: true, opacity: 0.92 }));
nightWater.rotation.x = -Math.PI / 2; nightWater.position.y = -3.2; scene.add(nightWater);
const bioRings = [];
for (let i = 0; i < 6; i++) {
  const br = new THREE.Mesh(new THREE.RingGeometry(9.4+i*.55, 9.65+i*.55, 80), MB(0x00ccff, { transparent: true, opacity: .09-i*.012, side: THREE.DoubleSide }));
  br.rotation.x = -Math.PI/2; br.position.y = -3.0+i*.008; br.userData.phase = i*1.1; scene.add(br); bioRings.push(br);
}
const waterLight = new THREE.PointLight(0x0088ff, 0.4, 12); waterLight.position.set(0, -1, 0); scene.add(waterLight);

// Island
const island = new THREE.Group(); scene.add(island);
pa(island, CYL(8.2, 9.0, 4.0, 42, 0x1a1208), 0, -2.0, 0);
pa(island, CYL(8.5, 8.2, 0.55, 42, 0x2a1e0a), 0, 0.0, 0);
pa(island, CYL(8.8, 8.5, 0.3, 42, 0xb89a50), 0, 0.28, 0);
const beachSurf = new THREE.Mesh(new THREE.CylinderGeometry(8.8, 8.8, 0.1, 42), M(0xc8aa60));
beachSurf.position.y = 0.43; beachSurf.receiveShadow = true; island.add(beachSurf);
pa(island, CYL(8.0, 8.8, 0.55, 42, 0x1a5a10), 0, 0.72, 0);
const grassFlat = new THREE.Mesh(new THREE.CylinderGeometry(8.0, 8.0, 0.1, 42), M(0x228818));
grassFlat.position.y = 1.0; grassFlat.receiveShadow = true; island.add(grassFlat);

// Volcano
const volcGrp = new THREE.Group(); volcGrp.position.set(0, 1.0, 0);
const vPts = [new THREE.Vector2(0,0),new THREE.Vector2(.5,.15),new THREE.Vector2(1.2,.4),new THREE.Vector2(2.2,1.0),new THREE.Vector2(3.4,2.0),new THREE.Vector2(3.8,3.2),new THREE.Vector2(3.2,4.5),new THREE.Vector2(2.2,5.6),new THREE.Vector2(1.2,6.4),new THREE.Vector2(.55,6.9),new THREE.Vector2(.28,7.1)];
const volcMesh = new THREE.Mesh(new THREE.LatheGeometry(vPts, 20), M(0x1e4a10));
volcMesh.castShadow = volcMesh.receiveShadow = true; volcGrp.add(volcMesh);
for (let i=0;i<10;i++){const a=(i/10)*Math.PI*2,r=1.2+Math.random()*2.0,y=1.5+Math.random()*4;const patch=SPH(.35+Math.random()*.45,0x1a1a0a,6);patch.scale.set(1,.45+Math.random()*.25,1);patch.position.set(Math.cos(a)*r,y,Math.sin(a)*r);volcGrp.add(patch);}
const craterGeo=new THREE.TorusGeometry(.52,.2,7,16);const craterPos=craterGeo.attributes.position;
for(let i=0;i<craterPos.count;i++){craterPos.setX(i,craterPos.getX(i)*(.82+Math.random()*.36));craterPos.setY(i,craterPos.getY(i)+(Math.random()-.5)*.18);craterPos.setZ(i,craterPos.getZ(i)*(.82+Math.random()*.36));}craterPos.needsUpdate=true;
const craterRim=new THREE.Mesh(craterGeo,M(0x0a0a05));craterRim.position.y=7.15;craterRim.rotation.x=Math.PI/2;volcGrp.add(craterRim);
const lavaPool=new THREE.Mesh(new THREE.CircleGeometry(.42,14),MB(0xff4400,{transparent:true,opacity:.95}));lavaPool.rotation.x=-Math.PI/2;lavaPool.position.y=7.05;volcGrp.add(lavaPool);
const lavaGlow=new THREE.PointLight(0xff5500,1.5,7.0);lavaGlow.position.y=7.2;volcGrp.add(lavaGlow);
const lavaMat=MB(0xff5500,{transparent:true,opacity:.8});
for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2;const drip=new THREE.Mesh(new THREE.SphereGeometry(.1+Math.random()*.08,5,4),lavaMat);drip.position.set(Math.cos(a)*.42,6.88+Math.random()*.22,Math.sin(a)*.42);volcGrp.add(drip);}
const smokePuffs=[];const smokeMat=M(0x334433,{transparent:true,opacity:.5});
for(let i=0;i<6;i++){const sp=new THREE.Mesh(new THREE.SphereGeometry(.18+i*.07,6,4),smokeMat.clone());sp.userData.smokeIdx=i;sp.position.set((Math.random()-.5)*.3,7.3+i*.38,(Math.random()-.5)*.3);volcGrp.add(sp);smokePuffs.push(sp);}
island.add(volcGrp);

// Road
const ROAD_R=5.8,SHOP_R=7.25;
const roadRing=new THREE.Mesh(new THREE.RingGeometry(ROAD_R-.55,ROAD_R+.55,80),M(0x2a2a2a));
roadRing.rotation.x=-Math.PI/2;roadRing.position.y=1.02;roadRing.receiveShadow=true;island.add(roadRing);
const innerEdge=new THREE.Mesh(new THREE.RingGeometry(ROAD_R-.55,ROAD_R-.48,80),MB(0xffffff));
innerEdge.rotation.x=-Math.PI/2;innerEdge.position.y=1.03;island.add(innerEdge);
const outerEdge=new THREE.Mesh(new THREE.RingGeometry(ROAD_R+.48,ROAD_R+.55,80),MB(0xffffff));
outerEdge.rotation.x=-Math.PI/2;outerEdge.position.y=1.03;island.add(outerEdge);
for(let i=0;i<36;i++){if(i%3===2)continue;const a0=(i/36)*Math.PI*2,a1=((i+.72)/36)*Math.PI*2;const dashPts=[];for(let j=0;j<=8;j++){const a=a0+(a1-a0)*(j/8);dashPts.push(new THREE.Vector3(Math.cos(a)*ROAD_R,1.035,Math.sin(a)*ROAD_R));}const dash=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(dashPts),6,.038,4,false),MB(0xffee44));island.add(dash);}

// Trees
function mkTree(x,z,s){s=s||1;const g=new THREE.Group();pa(g,CYL(.09*s,.14*s,.95*s,7,0x5a3a1a),0,.47*s,0);const cc=[0x1a6a14,0x227718,0x145210];for(let i=0;i<3;i++){const c=CONE((.62-i*.11)*s,(.78+i*.12)*s,8,cc[i]);c.position.y=(1.0+i*.38)*s;g.add(c);}g.position.set(x,1.0,z);return g;}
[[.8,2.5,1.1],[-1.8,1.6,1.0],[2.2,-1.2,1.15],[-.8,-2.4,.95],[2.8,.8,.9],[-2.6,-.8,1.05],[.3,-3.0,.85],[-.5,3.4,.8],[1.8,3.0,.75],[-3.2,2.0,.9],[3.5,-.3,.8],[-3.0,-2.0,.92],[1.2,-3.8,.7],[-2.0,-3.2,.85],[0,-1.2,.7]].forEach(([x,z,s])=>island.add(mkTree(x,z,s)));

// Lamp posts
for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2,lr=ROAD_R+.72;const lg=new THREE.Group();pa(lg,CYL(.05,.06,2.4,7,0x334422),0,1.2,0);const arm=BOX(.58,.045,.045,0x334422);arm.position.set(-.29,2.44,0);lg.add(arm);const head=BOX(.26,.14,.18,0x111111);head.position.set(-.58,2.4,0);lg.add(head);const bulb=SPH(.09,0xffeeaa,5,{emissive:0xffcc44,emissiveIntensity:1.4});bulb.position.set(-.58,2.33,0);lg.add(bulb);const pool=new THREE.Mesh(new THREE.CircleGeometry(.85,14),MB(0xffee88,{transparent:true,opacity:.16,side:THREE.DoubleSide}));pool.rotation.x=-Math.PI/2;pool.position.set(-.58,1.02,0);lg.add(pool);const pl=new THREE.PointLight(0xffdd66,.7,3.8);pl.position.set(-.58,2.3,0);lg.add(pl);lg.position.set(Math.cos(a)*lr,1.0,Math.sin(a)*lr);lg.rotation.y=-a;island.add(lg);}

// Landmarks
const DEFS=[
  {id:'about',    angle:0,   label:'ABOUT ME',     bc:0x6633cc,tc:0xffd700},
  {id:'skills',   angle:60,  label:'SKILLS',       bc:0x0077aa,tc:0x00ffee},
  {id:'experience',angle:120,label:'EXPERIENCE',   bc:0x001166,tc:0x88aaff},
  {id:'projects', angle:180, label:'PROJECTS',     bc:0x220044,tc:0xcc88ff},
  {id:'awards',   angle:240, label:'ACHIEVEMENTS', bc:0x331100,tc:0xffcc00},
  {id:'contact',  angle:300, label:'CONTACT',      bc:0x330011,tc:0xff8888},
];
const shopGroups=[];

function bannerTex(text,bg,tc){const cv=document.createElement('canvas');cv.width=320;cv.height=96;const ctx=cv.getContext('2d');const h2=h=>({r:(h>>16)&255,g:(h>>8)&255,b:h&255});const b=h2(bg),t=h2(tc);ctx.fillStyle='rgb('+b.r+','+b.g+','+b.b+')';ctx.fillRect(0,0,320,96);const gr=ctx.createLinearGradient(0,0,0,96);gr.addColorStop(0,'rgba(255,255,255,0.22)');gr.addColorStop(1,'rgba(0,0,0,0.15)');ctx.fillStyle=gr;ctx.fillRect(0,0,320,96);ctx.strokeStyle='rgb('+t.r+','+t.g+','+t.b+')';ctx.lineWidth=5;ctx.strokeRect(4,4,312,88);ctx.fillStyle='rgb('+t.r+','+t.g+','+t.b+')';ctx.shadowColor='rgba('+t.r+','+t.g+','+t.b+',0.6)';ctx.shadowBlur=10;ctx.font='bold 28px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,160,48);return new THREE.CanvasTexture(cv);}

DEFS.forEach(def=>{
  const g=new THREE.Group();const rad=def.angle*Math.PI/180;
  g.position.set(Math.cos(rad)*SHOP_R,1.0,Math.sin(rad)*SHOP_R);
  g.rotation.y=-rad+Math.PI;g.userData={id:def.id,label:def.label};
  buildLandmark(g,def.id);addBanner(g,def);island.add(g);shopGroups.push(g);
});

function addBanner(g,def){const pole=CYL(.034,.034,1.1,6,0x888888);pole.position.set(0,2.65,0);g.add(pole);const bm=new THREE.Mesh(new THREE.BoxGeometry(1.65,.52,.07),new THREE.MeshLambertMaterial({map:bannerTex(def.label,def.bc,def.tc),emissive:0x111111,emissiveIntensity:.25}));bm.position.set(.82,3.08,0);g.add(bm);const bl=new THREE.PointLight(def.tc,.38,2.2);bl.position.set(.82,3.2,.5);g.add(bl);const glow=new THREE.Mesh(new THREE.CircleGeometry(.9,14),MB(def.bc,{transparent:true,opacity:.13,side:THREE.DoubleSide}));glow.rotation.x=-Math.PI/2;glow.position.y=.01;g.add(glow);}
function buildLandmark(g,id){switch(id){case'about':buildClapperBoard(g);break;case'skills':buildSkillsTower(g);break;case'experience':buildOfficeBlock(g);break;case'projects':buildRocketPad(g);break;case'awards':buildAstronautScene(g);break;case'contact':buildPhoneBooth(g);break;}}

function buildClapperBoard(g){pa(g,BOX(1.4,.15,1.1,0x3a3a3a),0,.07,0);const body=BOX(1.35,1.1,.12,0x111111);pa(g,body,0,.8,0);const textArea=BOX(1.1,.65,.04,0x222222);pa(g,textArea,0,.72,.07);[.55,.4,.25,.1].forEach((y,i)=>{const line=BOX(.85-i*.1,.025,.035,0x888888,{transparent:true,opacity:.6});pa(g,line,0,y,.09);});const clapTop=BOX(1.35,.2,.12,0xffffff);pa(g,clapTop,0,1.42,0);clapTop.rotation.z=.3;for(let i=0;i<6;i++){const stripe=BOX(.16,.22,.13,0x000000);stripe.position.set(-.52+i*.2,0,.01);clapTop.add(stripe);}const hinge=CYL(.06,.06,1.38,7,0x888888);hinge.rotation.z=Math.PI/2;pa(g,hinge,0,1.33,.01);const reel=new THREE.Mesh(new THREE.TorusGeometry(.22,.06,8,16),M(0x444444));reel.rotation.y=Math.PI/2;pa(g,reel,-.72,.8,0);const recLight=SPH(.06,0xff2222,5,{emissive:0xff0000,emissiveIntensity:1.2});pa(g,recLight,.55,1.32,.1);recLight.userData.blink=true;const pl=new THREE.PointLight(0xff0000,.4,1.5);pl.position.set(.55,1.32,.2);g.add(pl);}
function buildSkillsTower(g){pa(g,BOX(1.4,.15,1.1,0x0a1a2a),0,.07,0);const hex=new THREE.Mesh(new THREE.CylinderGeometry(.8,.9,.2,6),M(0x0a2244));pa(g,hex,0,.22,0);const tower=BOX(.9,1.5,.9,0x0d1f35);pa(g,tower,0,1.12,0);const cLines=[[.35,.7],[.25,.95],[.45,1.2],[.3,1.45],[.4,1.7]];cLines.forEach(([w,y])=>{const cl=BOX(w,.035,.04,0x00ffcc,{emissive:0x00ffcc,emissiveIntensity:1.0});pa(g,cl,0,y,.47);});const screen=BOX(.78,.58,.04,0x001144,{emissive:0x000822,emissiveIntensity:.5});pa(g,screen,0,.98,.47);const dotCols=[0x00ffcc,0x4488ff,0xffaa00,0xff4466,0xaaff44];for(let i=0;i<12;i++){const dot=SPH(.03,dotCols[i%5],4,{emissive:dotCols[i%5],emissiveIntensity:.8});dot.position.set(-.28+(i%4)*.18,1.18-Math.floor(i/4)*.16,.5);g.add(dot);}const dish=new THREE.Mesh(new THREE.SphereGeometry(.35,12,6,0,Math.PI*2,0,Math.PI/2),M(0x1a3a5a));dish.rotation.x=Math.PI;pa(g,dish,0,1.88,0);const ant=CYL(.02,.02,.5,5,0x4488ff);pa(g,ant,0,2.15,0);const antTop=SPH(.06,0x00ffcc,5,{emissive:0x00ffcc,emissiveIntensity:1.2});pa(g,antTop,0,2.42,0);const tl=new THREE.PointLight(0x00ccff,.7,3.0);tl.position.set(0,1.9,0);g.add(tl);}
function buildOfficeBlock(g){const b1=new THREE.Group();pa(b1,BOX(.55,1.9,.5,0xccd8e8),0,.95,0);pa(b1,BOX(.55,.08,.5,0x4466aa),0,1.94,0);for(let r=0;r<5;r++)for(let c=0;c<2;c++){const wg=BOX(.17,.24,.04,0x88bbee,{transparent:true,opacity:.7});wg.position.set(-.12+c*.24,.35+r*.32,.27);b1.add(wg);}b1.position.set(-.62,0,.05);g.add(b1);const b2=new THREE.Group();pa(b2,BOX(.5,1.4,.48,0x1a1a28),0,.7,0);pa(b2,BOX(.5,.06,.48,0x3333aa),0,1.43,0);for(let r=0;r<4;r++){const wg=BOX(.35,.06,.04,0xffee88,{emissive:0xffcc44,emissiveIntensity:.6});wg.position.set(0,.28+r*.3,.26);b2.add(wg);}b2.position.set(.1,0,.0);g.add(b2);const b3=new THREE.Group();pa(b3,BOX(.42,1.1,.42,0x883322),0,.55,0);pa(b3,BOX(.42,.06,.42,0x5a2010),0,1.13,0);for(let r=0;r<3;r++)for(let c=0;c<2;c++){const wg=BOX(.12,.18,.04,0xffee88,{transparent:true,opacity:.65});wg.position.set(-.1+c*.2,.28+r*.3,.23);b3.add(wg);}b3.position.set(.68,0,.1);g.add(b3);const b4=new THREE.Group();pa(b4,BOX(.38,.8,.35,0x2a3a4a),0,.4,0);pa(b4,BOX(.38,.05,.35,0x445566),0,.82,0);b4.position.set(0,0,-.45);g.add(b4);pa(g,BOX(1.5,.04,.3,0x222222),0,.02,.38);}
function buildRocketPad(g){pa(g,BOX(1.4,.15,1.2,0x2c2a4a),0,.07,0);const pad=new THREE.Mesh(new THREE.CylinderGeometry(.7,.8,.25,8),M(0x1a1830));pa(g,pad,0,.29,0);for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2;const strut=BOX(.06,.8,.06,0x334455);strut.position.set(Math.cos(a)*.55,.55,Math.sin(a)*.55);strut.rotation.y=a;g.add(strut);}const rb=CYL(.18,.22,1.1,10,0xddeeff);pa(g,rb,0,1.08,0);const nose=CONE(.18,.45,10,0xee3333);pa(g,nose,0,1.85,0);for(let i=0;i<4;i++){const a=(i/4)*Math.PI*2;const fin=BOX(.04,.38,.22,0xcc2222);fin.position.set(Math.cos(a)*.2,.45,Math.sin(a)*.2);fin.rotation.y=a;g.add(fin);}pa(g,SPH(.07,0x88ccff,6,{emissive:0x4488ff,emissiveIntensity:.5}),0,1.15,.19);pa(g,SPH(.05,0x88ccff,6,{emissive:0x4488ff,emissiveIntensity:.5}),0,1.4,.19);const flame=CONE(.2,.55,8,0xff6600);flame.rotation.x=Math.PI;flame.position.set(0,.07,0);flame.userData.flame=true;g.add(flame);const innerFlame=CONE(.1,.4,8,0xffee00);innerFlame.rotation.x=Math.PI;innerFlame.position.set(0,.1,0);innerFlame.userData.flame2=true;g.add(innerFlame);const el=new THREE.PointLight(0xff6600,1.0,3.0);el.position.y=.1;g.add(el);const fp=CYL(.025,.025,1.2,5,0xaaaaaa);pa(g,fp,.38,.85,.3);const flag=BOX(.42,.24,.04,0x4444ff);flag.position.set(.59,1.42,.3);g.add(flag);}
function buildAstronautScene(g){pa(g,new THREE.Mesh(new THREE.CircleGeometry(1.2,14),M(0xaaaaaa)),0,.03,0).rotation.x=-Math.PI/2;[[-.5,0,.3],[.4,0,-.4],[.7,0,.5]].forEach(([x,y,z])=>{const cr=new THREE.Mesh(new THREE.RingGeometry(.1,.16,10),M(0x888888,{side:THREE.DoubleSide}));cr.rotation.x=-Math.PI/2;cr.position.set(x,.04,z);g.add(cr);});const astGrp=new THREE.Group();pa(astGrp,BOX(.32,.42,.28,0xdddddd),0,.55,0);const helm=SPH(.22,0xeeeeee,10);pa(astGrp,helm,0,.99,0);const visor=SPH(.19,0x4488ff,10,{transparent:true,opacity:.55,emissive:0x2244aa,emissiveIntensity:.3});pa(astGrp,visor,0,.99,.04);pa(astGrp,BOX(.3,.36,.16,0xcccccc),0,.56,-.18);[-.22,.22].forEach(x=>{const arm=BOX(.12,.3,.14,0xdddddd);arm.position.set(x,.56,0);arm.rotation.z=x>0?.35:-.35;astGrp.add(arm);const glove=SPH(.07,0xbbbbbb,5);glove.position.set(x*1.3,.38,.04);astGrp.add(glove);});[-.1,.1].forEach(x=>{const leg=BOX(.13,.35,.14,0xcccccc);leg.position.set(x,.17,0);astGrp.add(leg);const boot=BOX(.15,.1,.22,0xaaaaaa);boot.position.set(x,-.02,.04);astGrp.add(boot);});pa(astGrp,BOX(.32,.04,.29,0xff2222),0,.68,0);pa(astGrp,BOX(.08,.08,.06,0x4444ff),.1,.62,.15);astGrp.position.set(-.15,.0,.3);g.add(astGrp);const robGrp=new THREE.Group();pa(robGrp,BOX(.18,.22,.16,0x888899),0,.28,0);pa(robGrp,BOX(.2,.18,.18,0x666677),0,.56,0);pa(robGrp,SPH(.06,0xffee44,4,{emissive:0xffcc00,emissiveIntensity:.8}),-.06,.6,.1);pa(robGrp,SPH(.06,0xffee44,4,{emissive:0xffcc00,emissiveIntensity:.8}),.06,.6,.1);robGrp.position.set(.5,.0,.2);robGrp.rotation.y=-.4;g.add(robGrp);pa(g,CYL(.02,.02,.9,5,0xcccccc),.6,.48,-.3);const pFlag=BOX(.36,.22,.03,0xffaa00);pFlag.position.set(.78,.86,-.3);g.add(pFlag);pa(pFlag,BOX(.34,.2,.02,0xff4400),0,0,.01);const sl=new THREE.PointLight(0x6688ff,.5,3.0);sl.position.set(0,1.5,0);g.add(sl);}
function buildPhoneBooth(g){pa(g,BOX(1.3,.15,1.1,0x880000),0,.07,0);const base=BOX(1.0,.2,.9,0x990000);pa(g,base,0,.22,0);const body=BOX(.96,1.7,.85,0xcc0000);pa(g,body,0,1.22,0);for(let row=0;row<3;row++){for(let col=0;col<2;col++){const pane=BOX(.3,.38,.04,0x88eeff,{transparent:true,opacity:.4});pane.position.set(-.18+col*.37,.52+row*.46,.45);g.add(pane);const frame=BOX(.33,.42,.03,0xaa0000);frame.position.set(-.18+col*.37,.52+row*.46,.44);g.add(frame);}}for(let row=0;row<3;row++){const sp=BOX(.04,.38,.6,0x88eeff,{transparent:true,opacity:.35});sp.position.set(-.5,.52+row*.46,.05);g.add(sp);}const door=BOX(.44,1.5,.06,0xaa0000);door.position.set(.28,1.0,.45);door.rotation.y=.25;g.add(door);const doorGlass=BOX(.36,1.1,.04,0x88eeff,{transparent:true,opacity:.38});doorGlass.position.set(.28,1.1,.46);doorGlass.rotation.y=.25;g.add(doorGlass);const roof=BOX(1.04,.18,.92,0xbb0000);pa(g,roof,0,2.17,0);const dome=BOX(.9,.14,.78,0x880000);pa(g,dome,0,2.31,0);pa(g,BOX(.82,.16,.04,0xffffff),0,2.08,.46);pa(g,BOX(.18,.38,.08,0x111111),-.15,1.1,.35);const boothGlow=new THREE.PointLight(0xff2222,.55,3.5);boothGlow.position.set(0,1.2,.5);g.add(boothGlow);const intLight=new THREE.Mesh(new THREE.SphereGeometry(.08,6,4),new THREE.MeshBasicMaterial({color:0xffffaa}));pa(g,intLight,0,2.0,0);const il=new THREE.PointLight(0xffffaa,.5,2.0);il.position.set(0,2.0,0);g.add(il);}

// Clouds
const CLOUDS=[];
[[14,10,5],[-16,11,-5],[7,13,-12],[-9,8,10],[17,8,-8],[-13,12,-15],[6,14,15],[-4,9,-16]].forEach(([x,y,z],i)=>{
  const cg=new THREE.Group();const cm=new THREE.MeshLambertMaterial({color:0x1a2a44,transparent:true,opacity:.88});
  [[0,0,0,1.5],[1.3,.2,0,1.1],[-1.2,.15,0,1.0],[.55,.4,.35,.82],[-.65,.25,-.35,.86],[2.1,.05,0,.72]].forEach(([ox,oy,oz,r])=>{const part=new THREE.Mesh(new THREE.SphereGeometry(r,8,6),cm);part.position.set(ox,oy,oz);cg.add(part);});
  cg.position.set(x,y,z);scene.add(cg);CLOUDS.push({g:cg,bx:x,by:y,speed:.0025+Math.random()*.003,phase:i*.85});
});

// Fireworks
const fireworks=[];let fwTimer=0;
function launchFirework(){const cols=[0xff4444,0xffaa00,0x44ffaa,0x4488ff,0xff44ff,0xffff44,0xff8844];const col=cols[Math.floor(Math.random()*cols.length)];const ox=(Math.random()-.5)*18,oz=(Math.random()-.5)*18,oy=14+Math.random()*9;const parts=[];for(let i=0;i<36;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.07,4,3),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:1}));const th=Math.random()*Math.PI*2,ph=Math.random()*Math.PI;const v=.1+Math.random()*.1;p.position.set(ox,oy,oz);p.userData.vel=new THREE.Vector3(Math.sin(ph)*Math.cos(th)*v,Math.cos(ph)*v+.04,Math.sin(ph)*Math.sin(th)*v);scene.add(p);parts.push(p);}const flash=new THREE.Mesh(new THREE.SphereGeometry(.5,7,5),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:1}));flash.position.set(ox,oy,oz);scene.add(flash);fireworks.push({parts,flash,life:0,max:2.2});}

// Cyclist SVG
let pedCycle=0;
const cyclistDiv=document.getElementById('cyclist-svg');
function updateCyclistSVG(speed){
  pedCycle+=speed*6+.02;
  const lAngle=Math.sin(pedCycle)*35,rAngle=Math.sin(pedCycle+Math.PI)*35;
  const lKnee=Math.max(0,Math.sin(pedCycle+.8)*25),rKnee=Math.max(0,Math.sin(pedCycle+Math.PI+.8)*25);
  const roadFront=new THREE.Vector3(0,1.0,ROAD_R);
  const projected=roadFront.clone().project(camera);
  const sx=(projected.x*.5+.5)*innerWidth,sy=(-projected.y*.5+.5)*innerHeight;
  cyclistDiv.style.left=(sx-55)+'px';cyclistDiv.style.top=(sy-115)+'px';
  cyclistDiv.innerHTML='<svg width="110" height="130" viewBox="0 0 110 130" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="100" r="20" fill="none" stroke="#222" stroke-width="3.5"/><circle cx="22" cy="100" r="14" fill="none" stroke="#666" stroke-width="1.5"/><circle cx="22" cy="100" r="3.5" fill="#888"/>'+[0,45,90,135].map(a=>'<line x1="22" y1="100" x2="'+(22+14*Math.cos(a*Math.PI/180))+'" y2="'+(100+14*Math.sin(a*Math.PI/180))+'" stroke="#888" stroke-width="1"/><line x1="22" y1="100" x2="'+(22-14*Math.cos(a*Math.PI/180))+'" y2="'+(100-14*Math.sin(a*Math.PI/180))+'" stroke="#888" stroke-width="1"/>').join('')+'<circle cx="88" cy="100" r="20" fill="none" stroke="#222" stroke-width="3.5"/><circle cx="88" cy="100" r="14" fill="none" stroke="#666" stroke-width="1.5"/><circle cx="88" cy="100" r="3.5" fill="#888"/>'+[0,45,90,135].map(a=>'<line x1="88" y1="100" x2="'+(88+14*Math.cos(a*Math.PI/180))+'" y2="'+(100+14*Math.sin(a*Math.PI/180))+'" stroke="#888" stroke-width="1"/><line x1="88" y1="100" x2="'+(88-14*Math.cos(a*Math.PI/180))+'" y2="'+(100-14*Math.sin(a*Math.PI/180))+'" stroke="#888" stroke-width="1"/>').join('')+'<line x1="22" y1="100" x2="55" y2="68" stroke="#ff5500" stroke-width="3.5" stroke-linecap="round"/><line x1="88" y1="100" x2="55" y2="68" stroke="#ff5500" stroke-width="3.5" stroke-linecap="round"/><line x1="55" y1="68" x2="44" y2="82" stroke="#ff5500" stroke-width="3.5" stroke-linecap="round"/><line x1="44" y1="82" x2="22" y2="100" stroke="#ff5500" stroke-width="3" stroke-linecap="round"/><line x1="55" y1="68" x2="75" y2="60" stroke="#ff5500" stroke-width="3" stroke-linecap="round"/><line x1="75" y1="60" x2="88" y2="100" stroke="#ff5500" stroke-width="2.5" stroke-linecap="round"/><line x1="75" y1="60" x2="80" y2="50" stroke="#555" stroke-width="2.5" stroke-linecap="round"/><line x1="78" y1="48" x2="86" y2="52" stroke="#333" stroke-width="3" stroke-linecap="round"/><line x1="44" y1="82" x2="44" y2="72" stroke="#555" stroke-width="2" stroke-linecap="round"/><rect x="36" y="68" width="18" height="5" rx="2.5" fill="#222"/><circle cx="55" cy="84" r="7" fill="none" stroke="#888" stroke-width="2"/><circle cx="55" cy="84" r="2.5" fill="#888"/><g transform="translate(55,84) rotate('+lAngle+')"><line x1="0" y1="0" x2="0" y2="14" stroke="#cc1111" stroke-width="5" stroke-linecap="round"/><g transform="translate(0,14) rotate('+lKnee+')"><line x1="0" y1="0" x2="0" y2="13" stroke="#111133" stroke-width="5" stroke-linecap="round"/><ellipse cx="0" cy="14" rx="5" ry="3.5" fill="#111" transform="rotate(-20)"/></g></g><g transform="translate(55,84) rotate('+rAngle+')"><line x1="0" y1="0" x2="0" y2="12" stroke="#aa0000" stroke-width="4" stroke-linecap="round"/><g transform="translate(0,12) rotate('+rKnee+')"><line x1="0" y1="0" x2="0" y2="11" stroke="#0a0a22" stroke-width="4" stroke-linecap="round"/><ellipse cx="0" cy="12" rx="4.5" ry="3" fill="#000" transform="rotate(-20)"/></g></g><line x1="44" y1="72" x2="68" y2="58" stroke="#cc1111" stroke-width="9" stroke-linecap="round"/><line x1="68" y1="58" x2="82" y2="52" stroke="#cc1111" stroke-width="6" stroke-linecap="round"/><circle cx="62" cy="52" r="10" fill="#ff9966"/><path d="M52,50 Q55,40 72,44 Q70,56 52,56 Z" fill="#22aa22"/><path d="M53,54 Q62,58 71,54" fill="none" stroke="#88ccff" stroke-width="2"/><circle cx="68" cy="53" r="2" fill="#222"/><path d="M53,56 Q58,62 62,62" fill="none" stroke="#1a881a" stroke-width="1.5"/></svg>';
}

// Scroll/drag physics
let velocity=0,islandRot=0,dragActive=false,dragPrev=0;
const SCROLL_SENS=.00042,DRAG_SENS=.005,INERTIA=.965,MAX_V=.022;
function applyDelta(d){velocity+=d*SCROLL_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));}
window.addEventListener('wheel',e=>{e.preventDefault();applyDelta(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY);},{passive:false});
canvas.addEventListener('mousedown',e=>{dragActive=true;dragPrev=e.clientX;});
window.addEventListener('mousemove',e=>{if(!dragActive)return;const dx=e.clientX-dragPrev;dragPrev=e.clientX;velocity+=-dx*DRAG_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));});
window.addEventListener('mouseup',()=>{dragActive=false;});
canvas.addEventListener('touchstart',e=>{dragActive=true;dragPrev=e.touches[0].clientX;},{passive:true});
window.addEventListener('touchmove',e=>{if(!dragActive)return;const dx=e.touches[0].clientX-dragPrev;dragPrev=e.touches[0].clientX;velocity+=-dx*DRAG_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));},{passive:true});
window.addEventListener('touchend',()=>{dragActive=false;});
function doZoom(d){camTarget=Math.max(16,Math.min(48,camTarget-d*4));}
window.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='=')doZoom(1);if(e.key==='-')doZoom(-1);});

// Raycasting for landmark clicks
const rc=new THREE.Raycaster();const mv=new THREE.Vector2();
canvas.addEventListener('click',e=>{
  if(Math.abs(velocity)>.015)return;
  mv.x=(e.clientX/innerWidth)*2-1;mv.y=-(e.clientY/innerHeight)*2+1;
  rc.setFromCamera(mv,camera);
  for(const sg of shopGroups){const kids=[];sg.traverse(c=>{if(c.isMesh)kids.push(c);});if(rc.intersectObjects(kids).length){openPage(sg.userData.id);return;}}
  if(!e.target.closest('#shop-page'))closePage();
});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});

const secLabel=document.getElementById('secLabel');
function nearestSection(rot){const deg=((-rot*180/Math.PI)%360+360)%360;let best=null,bd=999;DEFS.forEach(s=>{const d=Math.abs(((s.angle-deg+180+360)%360)-180);if(d<bd){bd=d;best=s;}});return bd<36?best:null;}

let t=0;
function animate(){
  requestAnimationFrame(animate);t+=.016;
  velocity*=INERTIA;islandRot+=velocity;island.rotation.y=islandRot;
  smokePuffs.forEach((sp,i)=>{const phase=(t*.42+i*.72)%1.4;sp.position.y=7.3+i*.38+phase*.6;sp.position.x=Math.sin(t*.7+i)*.12;sp.material.opacity=Math.max(0,.45-i*.06-(phase/1.4)*.4);sp.scale.setScalar(1.0+phase*.55);});
  lavaGlow.intensity=1.0+Math.sin(t*2.8)*.5;lavaPool.material.opacity=.88+Math.sin(t*2.8)*.1;
  nightWater.rotation.z+=.003;
  bioRings.forEach(br=>{br.material.opacity=.06+Math.sin(t*1.4+br.userData.phase)*.04;});
  waterLight.intensity=.3+Math.sin(t*.8)*.12;
  CLOUDS.forEach(c=>{c.g.position.x=c.bx+Math.sin(t*c.speed+c.phase)*3.2;c.g.position.y=c.by+Math.sin(t*.3+c.phase)*.24;});
  fwTimer+=.016;if(fwTimer>=3.0){fwTimer=0;launchFirework();}
  for(let i=fireworks.length-1;i>=0;i--){const fw=fireworks[i];fw.life+=.016;const pct=fw.life/fw.max;fw.flash.material.opacity=Math.max(0,1-pct*5);fw.flash.scale.setScalar(1+pct*3);fw.parts.forEach(p=>{p.position.addScaledVector(p.userData.vel,1);p.userData.vel.y-=.003;p.material.opacity=Math.max(0,1-pct*1.3);p.scale.setScalar(Math.max(0,1-pct));});if(fw.life>=fw.max){fw.parts.forEach(p=>scene.remove(p));scene.remove(fw.flash);fireworks.splice(i,1);}}
  shopGroups.forEach(sg=>{sg.traverse(c=>{if(c.userData.float){if(!c.userData._fy)c.userData._fy=c.position.y;c.position.y=c.userData._fy+Math.sin(t*2.3)*.04;}if(c.userData.flame)c.scale.set(.85+Math.sin(t*9)*.18,.88+Math.sin(t*7)*.15,.85+Math.sin(t*9)*.18);if(c.userData.flame2)c.scale.setScalar(.8+Math.sin(t*11)*.22);if(c.userData.blink)c.material.emissiveIntensity=.4+Math.abs(Math.sin(t*2.8))*.9;});});
  camDist+=(camTarget-camDist)*.07;camera.position.set(0,camDist*.5,camDist);camera.lookAt(0,2,0);
  updateCyclistSVG(Math.abs(velocity));
  const ns=nearestSection(islandRot);secLabel.textContent=ns?'📍 '+ns.label:'Scroll to Ride';
  renderer.render(scene,camera);
}

setTimeout(()=>{document.getElementById('loader').classList.add('gone');animate();},1300);
</script>
</body>
</html>`;
  }
};