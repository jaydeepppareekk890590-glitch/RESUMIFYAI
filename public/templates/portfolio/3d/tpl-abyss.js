/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: ABYSS
   File: templates/portfolio/tpl-abyss.js
   Style: Deep Ocean World · Scuba Diver · Bioluminescent Night · Three.js
================================================================ */

window.TPL_ABYSS = {
  id: 'abyss',
  name: 'Abyss',
  category: 'Immersive 3D',
  theme: 'deep-ocean',
  animated: true,

  thumbnail() {
    return `
      <div style="background:linear-gradient(180deg,#010d18 0%,#011a2e 40%,#01263a 100%);width:100%;height:100%;position:relative;overflow:hidden;font-family:sans-serif">
        <!-- Bubbles -->
        <div style="position:absolute;bottom:30px;left:28px;width:3px;height:3px;border-radius:50%;border:1px solid rgba(0,220,255,0.5)"></div>
        <div style="position:absolute;bottom:40px;left:40px;width:2px;height:2px;border-radius:50%;border:1px solid rgba(0,220,255,0.4)"></div>
        <div style="position:absolute;bottom:50px;right:30px;width:2px;height:2px;border-radius:50%;border:1px solid rgba(0,220,255,0.3)"></div>
        <!-- Caustic light rays -->
        <div style="position:absolute;top:0;left:20px;width:6px;height:45px;background:linear-gradient(to bottom,rgba(0,180,255,0.12),transparent);transform:skewX(-8deg)"></div>
        <div style="position:absolute;top:0;left:40px;width:4px;height:35px;background:linear-gradient(to bottom,rgba(0,180,255,0.08),transparent);transform:skewX(5deg)"></div>
        <div style="position:absolute;top:0;right:25px;width:5px;height:40px;background:linear-gradient(to bottom,rgba(0,180,255,0.1),transparent);transform:skewX(-12deg)"></div>
        <!-- Coral reef floor -->
        <div style="position:absolute;bottom:0;left:0;right:0;height:22px;background:linear-gradient(to top,#0a1a0a,#0d2a12)"></div>
        <!-- Coral shapes -->
        <div style="position:absolute;bottom:14px;left:8px;width:4px;height:12px;background:#cc3344;border-radius:2px 2px 0 0"></div>
        <div style="position:absolute;bottom:14px;left:12px;width:3px;height:8px;background:#cc3344;border-radius:2px 2px 0 0"></div>
        <div style="position:absolute;bottom:14px;right:10px;width:5px;height:10px;background:#ff6622;border-radius:3px 3px 0 0"></div>
        <!-- Glow orbs (bioluminescence) -->
        <div style="position:absolute;bottom:25px;left:50%;transform:translateX(-50%);width:8px;height:8px;border-radius:50%;background:rgba(0,255,200,0.3);box-shadow:0 0 8px rgba(0,255,200,0.4)"></div>
        <div style="position:absolute;top:35%;left:15%;width:5px;height:5px;border-radius:50%;background:rgba(0,200,255,0.2);box-shadow:0 0 6px rgba(0,200,255,0.3)"></div>
        <div style="position:absolute;top:45%;right:18%;width:4px;height:4px;border-radius:50%;background:rgba(100,255,180,0.2);box-shadow:0 0 5px rgba(100,255,180,0.3)"></div>
        <!-- Diver -->
        <div style="position:absolute;top:38%;left:50%;transform:translateX(-50%);font-size:14px">🤿</div>
        <!-- HUD pill -->
        <div style="position:absolute;top:7px;left:8px;background:rgba(0,20,40,0.8);border-radius:10px;padding:2px 7px;font-size:7px;font-weight:700;color:#00e8ff;border:1px solid rgba(0,220,255,0.2)">🌊 My Abyss</div>
        <!-- Hint -->
        <div style="position:absolute;bottom:4px;left:0;right:0;text-align:center;font-size:6px;color:rgba(0,200,255,0.4);letter-spacing:.1em">SCROLL TO DIVE · CLICK TO DISCOVER</div>
      </div>`;
  },

  render(data) {
    const name       = data.name       || 'Your Name';
    const role       = data.role       || 'Developer & Designer';
    const bio        = data.bio        || 'A passionate creator who builds deep, purposeful digital experiences.';
    const about      = data.about      || bio;
    const location   = data.location   || 'Your City, India';
    const email      = data.email      || 'you@email.com';
    const github     = data.github     || '';
    const linkedin   = data.linkedin   || '';
    const skills     = data.skills     || [];
    const projects   = data.projects   || [];
    const experience = data.experience || [];

    const githubH   = github.replace(/^https?:\/\//, '')   || 'github.com/you';
    const linkedinH = linkedin.replace(/^https?:\/\//, '') || 'linkedin.com/in/you';

    // Skill groups
    const skillGroups = [
      { title: 'Frontend',        items: skills.filter((_,i)=>i<4).map(s=>s.name||s) },
      { title: 'Backend & Cloud', items: skills.filter((_,i)=>i>=4&&i<8).map(s=>s.name||s) },
      { title: 'Design & Tools',  items: skills.filter((_,i)=>i>=8).map(s=>s.name||s) },
    ].filter(g=>g.items.length>0);
    if(!skillGroups.length) skillGroups.push({title:'Skills',items:['JavaScript','React','Node.js','CSS']});

    const skillsHTML = skillGroups.map(g=>`
      <div class="pc"><div class="pt">${g.title}</div><div class="sg">${g.items.map(s=>`<span class="st">${s}</span>`).join('')}</div></div>`).join('');

    const expHTML = experience.length
      ? experience.map(e=>`<div class="exp-card"><div class="pt">${e.title} · ${e.company}</div><div class="ps">${e.duration}</div><div class="pb">${e.description||''}</div></div>`).join('')
      : `<div class="exp-card"><div class="pt">Your Experience</div><div class="ps">Company · Duration</div><div class="pb">Add your work experience here.</div></div>`;

    const projHTML = projects.length
      ? projects.map(p=>`<div class="pj"><div class="pjn">${p.emoji||'🔬'} ${p.name}</div><div class="pjd">${p.description||''}</div><div class="sg" style="margin-top:8px">${(p.tech||[]).map(t=>`<span class="st">${t}</span>`).join('')}</div></div>`).join('')
      : `<div class="pj"><div class="pjn">🔬 Your Project</div><div class="pjd">Add your amazing projects here.</div></div>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — The Abyss</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden;background:#010d18;font-family:'Segoe UI',sans-serif;user-select:none}
canvas{display:block;cursor:grab}
canvas:active{cursor:grabbing}

/* ── HUD ── */
#hud{position:fixed;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:14px 22px;z-index:50;pointer-events:none}
.hud-pill{background:rgba(0,15,30,0.72);backdrop-filter:blur(16px);border-radius:30px;padding:8px 20px;font-size:12px;font-weight:700;color:#00e8ff;letter-spacing:0.1em;border:1px solid rgba(0,220,255,0.22);text-shadow:0 0 10px rgba(0,220,255,0.5)}

/* ── Depth gauge (side bar) ── */
#depth-gauge{position:fixed;left:20px;top:50%;transform:translateY(-50%);z-index:50;pointer-events:none;display:flex;flex-direction:column;align-items:center;gap:6px}
.gauge-bar{width:4px;height:120px;background:rgba(0,220,255,0.1);border-radius:2px;border:1px solid rgba(0,220,255,0.2);overflow:hidden;position:relative}
.gauge-fill{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,#00e8ff,#0066aa);border-radius:2px;transition:height 0.4s ease;height:0%}
.gauge-label{font-size:9px;font-weight:700;color:#00e8ff;letter-spacing:0.1em;opacity:0.7}

/* ── Scroll hint ── */
#scroll-hint{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:rgba(0,10,25,0.8);backdrop-filter:blur(12px);border:1px solid rgba(0,220,255,0.18);border-radius:30px;padding:8px 22px;font-size:11px;font-weight:700;color:#00ccee;letter-spacing:0.12em;z-index:50;pointer-events:none;animation:bob 3s ease-in-out infinite;white-space:nowrap}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-6px)}}

/* ── Zoom ── */
#zoom-btns{position:fixed;right:20px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:8px;z-index:50}
.zoom-btn{width:40px;height:40px;border-radius:50%;background:rgba(0,15,30,0.72);backdrop-filter:blur(10px);border:1px solid rgba(0,220,255,0.25);color:#00ccee;font-size:20px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;pointer-events:all}
.zoom-btn:hover{background:rgba(0,50,80,0.8);border-color:rgba(0,220,255,0.6);box-shadow:0 0 12px rgba(0,220,255,0.3)}

/* ── Overlay pages ── */
#detail-page{display:none;position:fixed;inset:0;z-index:300;flex-direction:column;overflow:hidden}
#detail-page.show{display:flex;animation:surfaceUp 0.4s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes surfaceUp{from{opacity:0;transform:translateY(40px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
#page-hdr{display:flex;align-items:center;gap:16px;padding:20px 32px;flex-shrink:0;backdrop-filter:blur(20px)}
#back-btn{background:rgba(255,255,255,0.14);border:1.5px solid rgba(255,255,255,0.35);color:#fff;padding:9px 22px;border-radius:30px;font-size:13px;font-weight:800;cursor:pointer;transition:all 0.2s;letter-spacing:0.05em}
#back-btn:hover{background:rgba(255,255,255,0.25);transform:translateX(-3px)}
#page-title{font-size:24px;font-weight:900;color:#fff;text-shadow:0 0 20px currentColor}
#page-body{flex:1;overflow-y:auto;padding:0 32px 40px;scrollbar-width:thin;scrollbar-color:rgba(0,220,255,0.3) transparent}

/* ── Theme layers for each section ── */
.th-about    {background:linear-gradient(160deg,#010818 0%,#050e28 40%,#0a1540 100%)}
.th-skills   {background:linear-gradient(160deg,#010d15 0%,#011a25 40%,#012535 100%)}
.th-exp      {background:linear-gradient(160deg,#0d0800 0%,#1a1000 40%,#231500 100%)}
.th-projects {background:linear-gradient(160deg,#050018 0%,#0a0030 40%,#100040 100%)}
.th-awards   {background:linear-gradient(160deg,#001208 0%,#001a0e 40%,#002516 100%)}
.th-contact  {background:linear-gradient(160deg,#150008 0%,#220010 40%,#300018 100%)}

/* ── Cards & components ── */
.pc{background:rgba(255,255,255,0.055);border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:24px 28px;margin-bottom:16px;backdrop-filter:blur(8px)}
.pt{font-size:19px;font-weight:800;color:#fff;margin-bottom:8px}
.ps{font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase}
.pb{font-size:14px;color:rgba(255,255,255,0.8);line-height:1.85}
.sg{display:flex;flex-wrap:wrap;gap:9px;margin-top:10px}
.st{padding:5px 15px;border-radius:20px;font-size:12px;font-weight:700;background:rgba(0,220,255,0.1);border:1px solid rgba(0,220,255,0.3);color:#00e8ff}
.cr{display:flex;align-items:center;gap:14px;padding:14px 18px;border-radius:16px;margin-bottom:10px;background:rgba(255,255,255,0.065);border:1px solid rgba(255,255,255,0.13);color:#fff;font-size:14px;font-weight:600}
.pj{background:rgba(255,255,255,0.05);border-radius:16px;padding:16px 20px;margin-bottom:12px;border:1px solid rgba(255,255,255,0.1)}
.pjn{font-weight:800;color:#fff;font-size:14px}
.pjd{font-size:12px;color:rgba(255,255,255,0.6);margin-top:5px;line-height:1.6}
.exp-card{background:rgba(255,255,255,0.05);border-left:4px solid #00aaff;border-radius:0 16px 16px 0;padding:18px 22px;margin-bottom:14px}
.stat-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.stat-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:18px;text-align:center}
.stat-val{font-size:28px;font-weight:900;color:#00e8ff;text-shadow:0 0 15px rgba(0,232,255,0.5)}
.stat-lbl{font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase}

/* ── Diver overlay ── */
#diver-el{position:fixed;pointer-events:none;z-index:10;transition:none}

/* ── Loader ── */
#loader{position:fixed;inset:0;background:linear-gradient(180deg,#000d1a 0%,#010d18 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 1.2s}
#loader.gone{opacity:0;pointer-events:none}
#lb{font-size:56px;animation:drift 1.2s ease-in-out infinite alternate}
@keyframes drift{from{transform:translateY(0) rotate(-5deg)}to{transform:translateY(-18px) rotate(5deg)}}
#lt{margin-top:18px;font-size:11px;font-weight:800;color:#00aacc;letter-spacing:0.32em}
#lt-sub{margin-top:8px;font-size:10px;color:rgba(0,180,220,0.45);letter-spacing:0.2em}
</style>
</head>
<body>

<!-- LOADER -->
<div id="loader">
  <div id="lb">🤿</div>
  <div id="lt">DIVING INTO THE ABYSS</div>
  <div id="lt-sub">LOADING YOUR WORLD...</div>
</div>

<canvas id="c"></canvas>
<div id="diver-el"></div>

<!-- HUD -->
<div id="hud">
  <div class="hud-pill" id="hudName">🌊 ${name}'s Abyss</div>
  <div class="hud-pill" id="secLabel">Scroll to Dive</div>
</div>

<!-- Depth Gauge -->
<div id="depth-gauge">
  <div class="gauge-label">▲</div>
  <div class="gauge-bar"><div class="gauge-fill" id="gaugeFill"></div></div>
  <div class="gauge-label">▼</div>
</div>

<!-- Scroll hint -->
<div id="scroll-hint">← Scroll / Drag to Dive &nbsp;·&nbsp; Click Structures to Explore →</div>

<!-- Zoom -->
<div id="zoom-btns">
  <button class="zoom-btn" onclick="doZoom(1)">+</button>
  <button class="zoom-btn" onclick="doZoom(-1)">−</button>
</div>

<!-- Detail Page -->
<div id="detail-page">
  <div id="page-hdr">
    <button id="back-btn" onclick="closePage()">← Surface</button>
    <div id="page-title"></div>
  </div>
  <div id="page-body"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
// ═══════════════════════════════════════════════════════
//  PAGE CONTENT
// ═══════════════════════════════════════════════════════
const PAGES = {
  about: {
    theme:'th-about', title:'🎭 About Me',
    html:\`
    <div class="pc" style="text-align:center;padding:32px">
      <div style="font-size:72px;margin-bottom:14px">🤿</div>
      <div class="pt" style="font-size:26px;text-shadow:0 0 20px rgba(0,220,255,0.5)">Hi, I'm ${name}</div>
      <div class="ps">${role} &nbsp;·&nbsp; ${location}</div>
      <div class="pb">${about}</div>
    </div>
    <div class="stat-row">
      <div class="stat-card"><div class="stat-val">∞</div><div class="stat-lbl">Ideas Explored</div></div>
      <div class="stat-card"><div class="stat-val">💡</div><div class="stat-lbl">Always Learning</div></div>
    </div>
    <div class="pc"><div class="pt">My Story</div><div class="pb">${bio}</div></div>\`
  },
  skills: {
    theme:'th-skills', title:'⚗️ Skills Lab',
    html:\`${skillsHTML}\`
  },
  experience: {
    theme:'th-exp', title:'🏗️ Experience',
    html:\`${expHTML}\`
  },
  projects: {
    theme:'th-projects', title:'🔬 Projects',
    html:\`${projHTML}\`
  },
  awards: {
    theme:'th-awards', title:'🏆 Achievements',
    html:\`
    <div class="pc" style="text-align:center;padding:32px">
      <div style="font-size:72px;margin-bottom:14px">🏆</div>
      <div class="pt">Achievements</div>
      <div class="pb">Add your awards, certifications, and milestones using the Resumify builder.</div>
    </div>\`
  },
  contact: {
    theme:'th-contact', title:'📡 Contact',
    html:\`
    <div class="pc" style="text-align:center;margin-bottom:22px">
      <div class="pt">Let's Connect 📡</div>
      <div class="pb">Open to freelance, full-time roles, and exciting collaborations from the deep.</div>
    </div>
    ${email    ? `<div class="cr"><span style="font-size:22px">📧</span><span>${email}</span></div>` : ''}
    ${githubH  ? `<div class="cr"><span style="font-size:22px">🐙</span><span>${githubH}</span></div>` : ''}
    ${linkedinH? `<div class="cr"><span style="font-size:22px">💼</span><span>${linkedinH}</span></div>` : ''}
    <div class="cr"><span style="font-size:22px">📍</span><span>${location}</span></div>\`
  }
};

function openPage(id){
  const p=PAGES[id], pg=document.getElementById('detail-page');
  pg.className='show '+p.theme;
  document.getElementById('page-title').textContent=p.title;
  document.getElementById('page-body').innerHTML=p.html;
  pg.style.display='flex';
}
function closePage(){
  const pg=document.getElementById('detail-page');
  pg.style.display='none'; pg.className='';
}

// ═══════════════════════════════════════════════════════
//  THREE.JS SCENE
// ═══════════════════════════════════════════════════════
const canvas=document.getElementById('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.setClearColor(0x010d18);

const scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x010d18,0.018);

const camera=new THREE.PerspectiveCamera(46,innerWidth/innerHeight,0.1,280);
let camDist=28, camTarget=28;
camera.position.set(0,12,28);
camera.lookAt(0,0,0);

// Helpers
const M =(c,o={})=>new THREE.MeshLambertMaterial({color:c,...o});
const MB=(c,o={})=>new THREE.MeshBasicMaterial({color:c,...o});
const MP=(c,o={})=>new THREE.MeshPhongMaterial({color:c,...o});
function BOX(w,h,d,c,o={}){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),M(c,o));m.castShadow=m.receiveShadow=true;return m;}
function CYL(rt,rb,h,s,c,o={}){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),M(c,o));m.castShadow=m.receiveShadow=true;return m;}
function SPH(r,c,s,o={}){return new THREE.Mesh(new THREE.SphereGeometry(r,s||12,Math.ceil((s||12)*0.7)),M(c,o));}
function CONE(r,h,s,c,o={}){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,s),M(c,o));m.castShadow=true;return m;}
function pa(g,m,x,y,z){if(x!==undefined)m.position.set(x,y,z);g.add(m);return m;}

// ── Lighting ──────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x0a2244,1.2));
const sunRay=new THREE.DirectionalLight(0x2255aa,0.7);
sunRay.position.set(0,40,5); sunRay.castShadow=true;
sunRay.shadow.mapSize.set(2048,2048);
sunRay.shadow.camera.left=sunRay.shadow.camera.bottom=-28;
sunRay.shadow.camera.right=sunRay.shadow.camera.top=28;
sunRay.shadow.camera.far=80; scene.add(sunRay);
const causticFill=new THREE.PointLight(0x00aacc,0.6,30); causticFill.position.set(0,15,0); scene.add(causticFill);

// ── Caustic light shafts ──────────────────────────────
const shaftMat=new THREE.MeshBasicMaterial({color:0x004488,transparent:true,opacity:0.04,side:THREE.DoubleSide});
for(let i=0;i<10;i++){
  const w=0.3+Math.random()*0.7, h=28+Math.random()*10;
  const shaft=new THREE.Mesh(new THREE.PlaneGeometry(w,h),shaftMat.clone());
  shaft.position.set((Math.random()-0.5)*18, h/2-4, (Math.random()-0.5)*18);
  shaft.rotation.x=Math.PI/2+Math.PI;
  shaft.rotation.z=(Math.random()-0.5)*0.4;
  shaft.userData.shaftSpeed=0.003+Math.random()*0.004;
  shaft.userData.shaftPhase=Math.random()*Math.PI*2;
  shaft.userData.shaftBase=shaft.position.x;
  scene.add(shaft);
}

// ── Particles (bubbles + plankton) ────────────────────
const bubbleGeo=new THREE.BufferGeometry();
const N_BUBBLES=500; const bpos=new Float32Array(N_BUBBLES*3);
const bvel=new Float32Array(N_BUBBLES*3);
for(let i=0;i<N_BUBBLES;i++){
  bpos[i*3  ]=(Math.random()-0.5)*40;
  bpos[i*3+1]=(Math.random()-0.5)*25;
  bpos[i*3+2]=(Math.random()-0.5)*40;
  bvel[i*3+1]=0.008+Math.random()*0.015;
  bvel[i*3  ]=(Math.random()-0.5)*0.003;
  bvel[i*3+2]=(Math.random()-0.5)*0.003;
}
bubbleGeo.setAttribute('position',new THREE.BufferAttribute(bpos,3));
const bubbleMat=new THREE.PointsMaterial({color:0x44ccff,size:0.12,transparent:true,opacity:0.55});
const bubbles=new THREE.Points(bubbleGeo,bubbleMat);
scene.add(bubbles);

// plankton
const plankGeo=new THREE.BufferGeometry();
const N_PLANK=1200; const ppos=new Float32Array(N_PLANK*3);
for(let i=0;i<N_PLANK;i++){ppos[i*3]=(Math.random()-0.5)*60;ppos[i*3+1]=(Math.random()-0.5)*40;ppos[i*3+2]=(Math.random()-0.5)*60;}
plankGeo.setAttribute('position',new THREE.BufferAttribute(ppos,3));
scene.add(new THREE.Points(plankGeo,new THREE.PointsMaterial({color:0x00ffaa,size:0.055,transparent:true,opacity:0.25})));

// ── Ocean floor ───────────────────────────────────────
const floorMat=new THREE.MeshLambertMaterial({color:0x0a1808});
const floor=new THREE.Mesh(new THREE.CylinderGeometry(32,36,1.2,48),floorMat);
floor.position.y=-6.5; floor.receiveShadow=true; scene.add(floor);
// sand ripples
for(let i=0;i<6;i++){
  const ring=new THREE.Mesh(new THREE.RingGeometry(i*1.8+1,i*1.8+1.25,48),MB(0x0d2010,{transparent:true,opacity:0.4,side:THREE.DoubleSide}));
  ring.rotation.x=-Math.PI/2; ring.position.y=-5.85-i*0.01; scene.add(ring);
}
// surface top
const surface=new THREE.Mesh(new THREE.PlaneGeometry(80,80),MB(0x00aadd,{transparent:true,opacity:0.06,side:THREE.DoubleSide}));
surface.rotation.x=-Math.PI/2; surface.position.y=14; scene.add(surface);

// ── REEF PLATFORM ─────────────────────────────────────
const reef=new THREE.Group(); scene.add(reef);
// base cylinder
pa(reef,CYL(9.5,10.5,2.5,36,0x0a1208),-0,-5.25,0);
pa(reef,CYL(9.8,9.5,0.6,36,0x0d1a0a), 0,-4.05,0);
pa(reef,CYL(9.5,9.8,0.3,36,0x122018), 0,-3.7, 0);
// reef flat top
const topFlat=new THREE.Mesh(new THREE.CylinderGeometry(9.5,9.5,0.2,36),M(0x143018));
topFlat.position.y=-3.55; topFlat.receiveShadow=true; reef.add(topFlat);

// ── Coral garden ──────────────────────────────────────
function mkCoral(x,z,type,scale){
  const g=new THREE.Group(); g.position.set(x,-3.35,z);
  scale=scale||1;
  if(type===0){ // brain coral
    const main=SPH(0.55*scale,0xcc3344,8);
    main.scale.y=0.7; g.add(main);
    const vein=SPH(0.52*scale,0xaa2233,6);
    vein.scale.set(1.1,0.65,1.1); g.add(vein);
  } else if(type===1){ // tube coral - orange
    for(let i=0;i<4;i++){
      const t=CYL(0.1*scale,0.14*scale,(0.6+i*0.2)*scale,5,0xff6622);
      const a=(i/4)*Math.PI*1.5;
      t.position.set(Math.cos(a)*0.25*scale,(0.3+i*0.1)*scale,Math.sin(a)*0.25*scale);
      t.rotation.z=(Math.random()-0.5)*0.4;
      g.add(t);
    }
  } else if(type===2){ // fan coral
    const fan=new THREE.Mesh(new THREE.PlaneGeometry(0.8*scale,1.1*scale),M(0x66ccaa,{side:THREE.DoubleSide,transparent:true,opacity:0.7}));
    fan.position.y=0.55*scale;
    fan.rotation.y=Math.random()*Math.PI;
    g.add(fan);
    const stem=CYL(0.04*scale,0.06*scale,0.55*scale,5,0x44aa88);
    stem.position.y=0.27*scale; g.add(stem);
  } else if(type===3){ // staghorn
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2;
      const branch=CYL(0.045*scale,0.07*scale,(0.5+Math.random()*0.4)*scale,5,0xffaa44);
      branch.position.set(Math.cos(a)*0.2*scale,0.2*scale,Math.sin(a)*0.2*scale);
      branch.rotation.z=Math.cos(a)*0.6; branch.rotation.x=Math.sin(a)*0.6;
      g.add(branch);
    }
    const core=SPH(0.12*scale,0xffbb55,5);
    g.add(core);
  } else { // bubble coral
    const sizes=[0.28,0.22,0.18,0.15,0.12];
    [[0,0],[0.25,0],[0.12,0.22],[-0.12,0.22],[-0.22,0]].forEach(([ox,oz],j)=>{
      const b=SPH(sizes[j]*scale,0x88eedd,6,{transparent:true,opacity:0.85});
      b.position.set(ox*scale,sizes[j]*scale,oz*scale);
      g.add(b);
    });
  }
  return g;
}
const coralPositions=[
  [4.5,2,0],[3.5,-3,1],[5.5,-1,3],[2,5,2],[6,-3,4],[-4,3,0],[-5,-2,1],[-3,5,3],
  [-6,0,3],[5,4,4],[0,7,1],[7,3,0],[-7,-3,2],[3,-6,3],[-2,-7,1],[6,-5,2],
  [-5,5,4],[0,-5,0],[4,-1,4],[-3,-1,0],[7,-1,3],[-7,2,4],[2,-4,1],[-4,-5,3]
];
coralPositions.forEach(([x,z,t],i)=>{
  reef.add(mkCoral(x,z,t,0.7+Math.random()*0.6));
});

// ── PATH ring ─────────────────────────────────────────
const PATH_R=6.0, STRUCT_R=7.4;
const pathRing=new THREE.Mesh(new THREE.RingGeometry(PATH_R-0.5,PATH_R+0.5,72),M(0x0a1518));
pathRing.rotation.x=-Math.PI/2; pathRing.position.y=-3.52; pathRing.receiveShadow=true; reef.add(pathRing);
// glowing path edges
const innerGlow=new THREE.Mesh(new THREE.RingGeometry(PATH_R-0.52,PATH_R-0.44,72),MB(0x00aaff,{transparent:true,opacity:0.5}));
innerGlow.rotation.x=-Math.PI/2; innerGlow.position.y=-3.50; reef.add(innerGlow);
const outerGlow=new THREE.Mesh(new THREE.RingGeometry(PATH_R+0.44,PATH_R+0.52,72),MB(0x00aaff,{transparent:true,opacity:0.5}));
outerGlow.rotation.x=-Math.PI/2; outerGlow.position.y=-3.50; reef.add(outerGlow);
// dotted center line
for(let i=0;i<48;i++){
  if(i%3===2) continue;
  const a0=(i/48)*Math.PI*2, a1=((i+0.75)/48)*Math.PI*2;
  const pts=[];
  for(let j=0;j<=6;j++){const a=a0+(a1-a0)*(j/6);pts.push(new THREE.Vector3(Math.cos(a)*PATH_R,-3.50,Math.sin(a)*PATH_R));}
  const dash=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),4,0.028,4,false),MB(0x00ccee,{transparent:true,opacity:0.6}));
  reef.add(dash);
}

// ── LANDMARK DEFINITIONS ──────────────────────────────
const DEFS=[
  {id:'about',      angle:0,   label:'ABOUT ME',     lc:0x4455ff, gc:0x0022aa},
  {id:'skills',     angle:60,  label:'SKILLS LAB',   lc:0x00ccff, gc:0x005566},
  {id:'experience', angle:120, label:'EXPERIENCE',   lc:0xffaa00, gc:0x664400},
  {id:'projects',   angle:180, label:'PROJECTS',     lc:0xaa55ff, gc:0x440088},
  {id:'awards',     angle:240, label:'ACHIEVEMENTS', lc:0x00ff88, gc:0x004422},
  {id:'contact',    angle:300, label:'CONTACT',      lc:0xff4488, gc:0x880033},
];
const structGroups=[];

function glowTex(text,lc,gc){
  const cv=document.createElement('canvas'); cv.width=320; cv.height=96;
  const ctx=cv.getContext('2d');
  const h2=h=>({r:(h>>16)&255,g:(h>>8)&255,b:h&255});
  const L=h2(lc),G=h2(gc);
  const bg=ctx.createLinearGradient(0,0,320,96);
  bg.addColorStop(0, 'rgb(' + G.r + ',' + G.g + ',' + G.b + ')');
  bg.addColorStop(1, 'rgb(' + Math.min(G.r*2,40) + ',' + Math.min(G.g*2,40) + ',' + Math.min(G.b*2,40) + ')');
  ctx.fillStyle=bg; ctx.fillRect(0,0,320,96);
  ctx.strokeStyle='rgba(' + L.r + ',' + L.g + ',' + L.b + ',0.8)';
  ctx.lineWidth=3; ctx.strokeRect(3,3,314,90);
  ctx.shadowColor='rgba(' + L.r + ',' + L.g + ',' + L.b + ',0.9)';
  ctx.shadowBlur=12;
  ctx.fillStyle='rgb(' + L.r + ',' + L.g + ',' + L.b + ')';
  ctx.font='bold 26px Arial'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(text,160,48);
  return new THREE.CanvasTexture(cv);
}

DEFS.forEach(def=>{
  const g=new THREE.Group();
  const rad=def.angle*Math.PI/180;
  g.position.set(Math.cos(rad)*STRUCT_R,-3.55,Math.sin(rad)*STRUCT_R);
  g.rotation.y=-rad+Math.PI;
  g.userData={id:def.id,label:def.label};
  buildStructure(g,def.id);
  addGlowSign(g,def);
  reef.add(g);
  structGroups.push(g);
});

function addGlowSign(g,def){
  const pole=CYL(0.032,0.032,1.2,6,0x335566);
  pole.position.set(0,2.8,0); g.add(pole);
  const sign=new THREE.Mesh(
    new THREE.BoxGeometry(1.7,0.5,0.06),
    new THREE.MeshLambertMaterial({map:glowTex(def.label,def.lc,def.gc),emissive:0x111111,emissiveIntensity:0.3})
  );
  sign.position.set(0.85,3.1,0); g.add(sign);
  const sl=new THREE.PointLight(def.lc,0.45,2.5); sl.position.set(0.85,3.2,0.4); g.add(sl);
  const groundGlow=new THREE.Mesh(
    new THREE.CircleGeometry(1.0,16),
    MB(def.lc,{transparent:true,opacity:0.1,side:THREE.DoubleSide})
  );
  groundGlow.rotation.x=-Math.PI/2; groundGlow.position.y=0.01; g.add(groundGlow);
}

function buildStructure(g,id){
  switch(id){
    case 'about':      buildAncientTemple(g);   break;
    case 'skills':     buildResearchStation(g); break;
    case 'experience': buildSubmarine(g);        break;
    case 'projects':   buildTreasureVault(g);    break;
    case 'awards':     buildPearlAltar(g);       break;
    case 'contact':    buildSonarTower(g);       break;
  }
}

// ── ABOUT: Ancient sunken temple ──────────────────────
function buildAncientTemple(g){
  // base steps
  [[1.4,0.18,1.2,0x1a2e1a,-0.09],[1.2,0.18,1.0,0x1c321c,-0.0],[1.0,0.18,0.85,0x1e361e,0.09]].forEach(([w,h,d,c,y])=>{
    pa(g,BOX(w,h,d,c),0,y,0);
  });
  // columns
  [[-.3,0.3],[.3,0.3],[-.3,-.3],[.3,-.3]].forEach(([x,z])=>{
    const col=CYL(0.072,0.082,1.3,8,0x2a4a2a);
    col.position.set(x,0.82,z); g.add(col);
    const cap=BOX(0.2,0.06,0.2,0x334433);
    cap.position.set(x,1.49,z); g.add(cap);
  });
  // roof
  pa(g,BOX(0.85,0.08,0.75,0x223322),0,1.52,0);
  pa(g,BOX(0.92,0.06,0.82,0x1a2a1a),0,1.58,0);
  const pediment=CONE(0.55,0.42,4,0x2a3a2a);
  pediment.position.y=1.82; pediment.rotation.y=Math.PI/4; g.add(pediment);
  // door glow
  const doorLight=new THREE.Mesh(new THREE.PlaneGeometry(0.25,0.42),MB(0x4466ff,{transparent:true,opacity:0.35,side:THREE.DoubleSide}));
  doorLight.position.set(0,0.56,0.43); g.add(doorLight);
  const dl=new THREE.PointLight(0x3355ff,0.5,2.0); dl.position.set(0,0.7,0.5); g.add(dl);
  // barnacles & algae
  for(let i=0;i<8;i++){
    const a=(i/8)*Math.PI*2;
    const bn=SPH(0.045+Math.random()*0.03,0x446644,4);
    bn.position.set(Math.cos(a)*0.62,0.05,Math.sin(a)*0.48); g.add(bn);
  }
}

// ── SKILLS: Underwater research station ───────────────
function buildResearchStation(g){
  // base ring
  pa(g,CYL(0.9,1.0,0.22,10,0x112233),0,0.11,0);
  // main cylinder hub
  const hub=CYL(0.58,0.62,1.4,12,0x0d2240);
  hub.position.y=0.92; g.add(hub);
  // portholes
  for(let i=0;i<4;i++){
    const a=(i/4)*Math.PI*2;
    const port=new THREE.Mesh(new THREE.RingGeometry(0.1,0.145,14),MB(0x00ccff,{transparent:true,opacity:0.7}));
    port.position.set(Math.cos(a)*0.62,0.85,Math.sin(a)*0.62);
    port.lookAt(Math.cos(a)*5,0.85,Math.sin(a)*5);
    g.add(port);
    const glow=SPH(0.07,0x00ffee,5,{emissive:0x00ddcc,emissiveIntensity:0.9,transparent:true,opacity:0.8});
    glow.position.set(Math.cos(a)*0.62,0.85,Math.sin(a)*0.62); g.add(glow);
  }
  // dome top
  const dome=new THREE.Mesh(new THREE.SphereGeometry(0.58,12,6,0,Math.PI*2,0,Math.PI/2),M(0x0a1a30,{transparent:true,opacity:0.85}));
  dome.position.y=1.62; g.add(dome);
  // antenna mast
  pa(g,CYL(0.022,0.022,0.9,5,0x334455),0,2.12,0);
  const top=SPH(0.08,0x00ffcc,5,{emissive:0x00ffcc,emissiveIntensity:1.3});
  top.position.y=2.58; top.userData.blink=true; g.add(top);
  const bl=new THREE.PointLight(0x00ccaa,0.8,2.5); bl.position.y=2.5; g.add(bl);
  // cables
  [[-0.45,-.3],[.45,.3],[-.45,.3]].forEach(([x,z])=>{
    const cable=CYL(0.018,0.018,0.9,4,0x223344);
    cable.position.set(x,0.45,z); cable.rotation.z=x>0?-0.35:0.35; g.add(cable);
  });
}

// ── EXPERIENCE: Mini submarine ────────────────────────
function buildSubmarine(g){
  // hull
  const hull=new THREE.Mesh(new THREE.SphereGeometry(0.55,14,8,0,Math.PI*2,0,Math.PI),M(0xdd9900));
  hull.rotation.x=Math.PI/2; hull.scale.set(1,0.65,1.4); hull.position.y=0.52; g.add(hull);
  const hullBack=new THREE.Mesh(new THREE.SphereGeometry(0.55,14,8,0,Math.PI*2,Math.PI,Math.PI),M(0xcc8800));
  hullBack.rotation.x=Math.PI/2; hullBack.scale.set(1,0.65,1.4); hullBack.position.y=0.52; g.add(hullBack);
  const mid=CYL(0.56,0.56,1.0,14,0xdd9900);
  mid.scale.set(1,1,1); mid.rotation.x=Math.PI/2; mid.position.y=0.52; g.add(mid);
  // propeller
  for(let i=0;i<4;i++){
    const a=(i/4)*Math.PI*2;
    const blade=BOX(0.04,0.22,0.06,0xaa7700);
    blade.position.set(Math.cos(a)*0.15,0.52+Math.sin(a)*0.15,-0.8);
    blade.rotation.z=a; blade.userData.prop=true; g.add(blade);
  }
  pa(g,CYL(0.04,0.04,0.12,5,0x885500),0,0.52,-0.82);
  // conning tower
  const tower=BOX(0.28,0.4,0.2,0xcc8800);
  tower.position.set(0,0.92,0.15); g.add(tower);
  const tw_top=BOX(0.3,0.06,0.22,0xaa7700);
  tw_top.position.set(0,1.14,0.15); g.add(tw_top);
  // periscope
  const ps=CYL(0.025,0.025,0.38,5,0x887700);
  ps.position.set(0.08,1.3,0.15); g.add(ps);
  const ph=BOX(0.06,0.035,0.1,0x775500);
  ph.position.set(0.08,1.5,0.2); g.add(ph);
  // portholes
  [[-0.35,0.52,0],[.35,0.52,0]].forEach(([x,y,z])=>{
    const pw=new THREE.Mesh(new THREE.RingGeometry(0.075,0.1,12),MB(0xffddaa,{transparent:true,opacity:0.8}));
    pw.position.set(x,y,0.58); g.add(pw);
    const pgl=SPH(0.055,0xffeeaa,5,{emissive:0xffcc55,emissiveIntensity:0.7});
    pgl.position.set(x,y,0.58); g.add(pgl);
  });
  // exhaust bubbles
  const exl=new THREE.PointLight(0xffaa00,0.4,2.0); exl.position.set(0,0.8,0); g.add(exl);
  // fins
  [[-0.55,0.35,0],[.55,0.35,0],[0,0.35,-0.55],[0,0.35,.55]].forEach(([x,y,z])=>{
    const fin=BOX(0.22,0.15,0.04,0xbb8800);
    fin.position.set(x,y,z-0.55); fin.rotation.y=(z!==0)?Math.PI/2:0; g.add(fin);
  });
}

// ── PROJECTS: Treasure vault ──────────────────────────
function buildTreasureVault(g){
  // stone base
  pa(g,CYL(0.85,0.95,0.28,8,0x1a1428),0,0.14,0);
  // chest body
  const chest=BOX(1.1,0.7,0.8,0x5a3a10);
  chest.position.y=0.66; g.add(chest);
  // chest lid
  const lid=BOX(1.1,0.22,0.8,0x6a4a18);
  lid.position.y=1.08; g.add(lid);
  const ridgeFront=BOX(1.15,0.28,0.06,0x7a5a20);
  ridgeFront.position.set(0,0.96,0.43); g.add(ridgeFront);
  // iron bands
  [0.55,1.0].forEach(y=>{
    const band=BOX(1.14,0.06,0.82,0x334433);
    band.position.y=y; g.add(band);
  });
  // lock
  const lock=BOX(0.15,0.18,0.06,0xddaa00);
  lock.position.set(0,0.86,0.44); g.add(lock);
  const lockGlow=SPH(0.065,0xffcc00,5,{emissive:0xffaa00,emissiveIntensity:1.2});
  lockGlow.position.set(0,0.86,0.46); g.add(lockGlow);
  // gold spill
  for(let i=0;i<10;i++){
    const coin=new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.055,0.015,10),M(0xddaa00,{emissive:0xaa7700,emissiveIntensity:0.3}));
    coin.position.set((Math.random()-0.5)*0.9,(0.02+Math.random()*0.08)*0.5,(Math.random()-0.5)*0.7);
    coin.rotation.x=(Math.random()-0.5)*0.8; coin.rotation.z=(Math.random()-0.5)*0.8;
    g.add(coin);
  }
  // gem
  const gem=new THREE.Mesh(new THREE.OctahedronGeometry(0.12),M(0x55ccff,{transparent:true,opacity:0.8,emissive:0x2288aa,emissiveIntensity:0.6}));
  gem.position.set(0.28,1.14,0); gem.userData.float=true; g.add(gem);
  const gl=new THREE.PointLight(0xffcc00,0.7,2.5); gl.position.set(0,0.9,0); g.add(gl);
  // chains
  [[-0.5,0.7],[.5,0.7]].forEach(([x,y])=>{
    const chain=CYL(0.025,0.025,0.55,4,0x888888);
    chain.position.set(x,y,0); chain.rotation.z=Math.PI/2; g.add(chain);
  });
}

// ── AWARDS: Pearl altar ───────────────────────────────
function buildPearlAltar(g){
  // tiered altar
  [[1.0,0.18,0x1a2a18],[0.78,0.18,0x1e3020],[0.58,0.18,0x223824]].forEach(([r,h,c],i)=>{
    const t=CYL(r,r+0.06,h,8,c); t.position.y=i*h+h/2; g.add(t);
  });
  // giant clam shell
  const clamBase=new THREE.Mesh(new THREE.SphereGeometry(0.52,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),M(0xeeddcc));
  clamBase.rotation.x=Math.PI/2; clamBase.scale.y=0.3; clamBase.position.y=0.62; g.add(clamBase);
  const clamTop=new THREE.Mesh(new THREE.SphereGeometry(0.52,12,8,0,Math.PI*2,0,Math.PI/2),M(0xddd0bb));
  clamTop.rotation.x=Math.PI/2; clamTop.scale.y=0.28; clamTop.position.y=0.78; clamTop.rotation.z=0.4; g.add(clamTop);
  // pearl
  const pearl=SPH(0.22,0xeeeeff,14,{transparent:true,opacity:0.92,emissive:0x8888bb,emissiveIntensity:0.4});
  pearl.position.y=1.02; pearl.userData.float=true; g.add(pearl);
  // pearl glow
  const pgl=new THREE.PointLight(0xaaaaff,0.8,2.5); pgl.position.y=1.1; g.add(pgl);
  // small pearls orbit
  for(let i=0;i<6;i++){
    const a=(i/6)*Math.PI*2;
    const mp=SPH(0.055,0xddddee,5,{emissive:0x8888aa,emissiveIntensity:0.3});
    mp.position.set(Math.cos(a)*0.42,0.9,Math.sin(a)*0.42); mp.userData.orbitAngle=a; mp.userData.orbitR=0.42; g.add(mp);
  }
  // kelp fronds
  for(let i=0;i<5;i++){
    const a=(i/5)*Math.PI*2;
    const kpts=[new THREE.Vector2(0,0),new THREE.Vector2(0.04,0.3),new THREE.Vector2(-0.04,0.6),new THREE.Vector2(0.04,0.9),new THREE.Vector2(0,1.1)];
    const kelp=new THREE.Mesh(new THREE.LatheGeometry(kpts,4),M(0x1a5a22,{transparent:true,opacity:0.7,side:THREE.DoubleSide}));
    kelp.scale.set(0.35,0.6,0.35);
    kelp.position.set(Math.cos(a)*0.7,0.1,Math.sin(a)*0.7);
    kelp.userData.kelp=true; kelp.userData.kelpPhase=a; g.add(kelp);
  }
}

// ── CONTACT: Sonar/beacon tower ───────────────────────
function buildSonarTower(g){
  // base anchor block
  pa(g,BOX(0.9,0.22,0.8,0x1a1022),0,0.11,0);
  pa(g,BOX(0.75,0.18,0.65,0x221432),0,0.29,0);
  // main tower pillar
  pa(g,CYL(0.2,0.26,1.6,10,0x221a36),0,1.09,0);
  // rings on tower
  [0.5,0.9,1.3].forEach(y=>{
    const ring=new THREE.Mesh(new THREE.TorusGeometry(0.26,0.03,6,18),M(0xff4488));
    ring.position.y=y; ring.rotation.x=Math.PI/2; g.add(ring);
  });
  // satellite dish
  const dish=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,8,0,Math.PI*2,0,Math.PI*0.55),M(0x332244));
  dish.rotation.x=Math.PI; dish.position.y=2.0; g.add(dish);
  const dishCenter=SPH(0.06,0xff4488,6,{emissive:0xff2266,emissiveIntensity:1.2});
  dishCenter.position.y=1.9; dishCenter.userData.blink=true; g.add(dishCenter);
  // sonar pulse rings (animated)
  for(let i=0;i<4;i++){
    const pr=new THREE.Mesh(new THREE.RingGeometry(0.3+i*0.28,0.36+i*0.28,20),MB(0xff4488,{transparent:true,opacity:0.25-i*0.05,side:THREE.DoubleSide}));
    pr.rotation.x=-Math.PI/2; pr.position.y=0.02+i*0.005; pr.userData.sonarRing=true; pr.userData.sonarPhase=i*0.5; g.add(pr);
  }
  // signal spike
  pa(g,CYL(0.015,0.015,0.6,5,0xff4488),0,2.42,0);
  const tip=SPH(0.055,0xff66aa,5,{emissive:0xff2255,emissiveIntensity:1.4});
  tip.position.y=2.74; tip.userData.blink=true; g.add(tip);
  const tl=new THREE.PointLight(0xff2255,0.9,3.5); tl.position.y=2.6; g.add(tl);
  // support struts
  [[-0.35,0.9],[ .35,0.9]].forEach(([x,y])=>{
    const s=CYL(0.025,0.025,0.75,4,0x332244);
    s.position.set(x,y,0); s.rotation.z=x>0?-0.45:0.45; g.add(s);
  });
}

// ── Jellyfish flock ───────────────────────────────────
const jellies=[];
for(let i=0;i<12;i++){
  const jg=new THREE.Group();
  const col=i%3===0?0x88aaff:i%3===1?0xff88cc:0x44ffcc;
  const bell=new THREE.Mesh(new THREE.SphereGeometry(0.22+Math.random()*0.12,10,7,0,Math.PI*2,0,Math.PI/2),M(col,{transparent:true,opacity:0.45}));
  bell.rotation.x=Math.PI; jg.add(bell);
  for(let t=0;t<8;t++){
    const tent=CYL(0.008,0.015,0.35+Math.random()*0.3,4,col,{transparent:true,opacity:0.35});
    tent.position.set((Math.random()-0.5)*0.3,-(0.25+Math.random()*0.1),(Math.random()-0.5)*0.3);
    tent.rotation.z=(Math.random()-0.5)*0.3; jg.add(tent);
  }
  const jl=new THREE.PointLight(col,0.25,1.2); jg.add(jl);
  jg.position.set((Math.random()-0.5)*28,(Math.random()-0.5)*12+2,(Math.random()-0.5)*28);
  jg.userData={phase:Math.random()*Math.PI*2,speed:0.006+Math.random()*0.006,bx:jg.position.x,by:jg.position.y,bz:jg.position.z};
  scene.add(jg); jellies.push(jg);
}

// ── Fish school ───────────────────────────────────────
const fish=[];
for(let i=0;i<18;i++){
  const fg=new THREE.Group();
  const body=new THREE.Mesh(new THREE.SphereGeometry(0.09,6,4),M(0xffaa22));
  body.scale.set(1,0.55,0.7); fg.add(body);
  const tail=BOX(0.04,0.12,0.04,0xff8800);
  tail.position.set(-0.1,0,0); tail.rotation.z=0.4; fg.add(tail);
  fg.position.set((Math.random()-0.5)*20,(-2+Math.random()*8),(Math.random()-0.5)*20);
  fg.userData={phase:Math.random()*Math.PI*2,speed:0.012+Math.random()*0.01,wobble:Math.random()*Math.PI*2};
  scene.add(fg); fish.push(fg);
}

// ── Diver SVG character ───────────────────────────────
let diveCycle=0;
const diverEl=document.getElementById('diver-el');
function updateDiverSVG(speed){
  diveCycle+=speed*5+0.018;
  const flipperL=Math.sin(diveCycle)*28, flipperR=Math.sin(diveCycle+Math.PI)*28;
  const armL=Math.sin(diveCycle*0.7)*18, armR=Math.sin(diveCycle*0.7+Math.PI)*18;
  const roadPt=new THREE.Vector3(0,-3.55,PATH_R);
  const proj=roadPt.clone().project(camera);
  const sx=(proj.x*0.5+0.5)*innerWidth, sy=(-proj.y*0.5+0.5)*innerHeight;
  diverEl.style.left=(sx-50)+'px'; diverEl.style.top=(sy-110)+'px';
  diverEl.innerHTML = '<svg width="100" height="130" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">' +
    '<!-- Tank -->' +
    '<rect x="38" y="52" width="18" height="28" rx="9" fill="#334455" stroke="#4466aa" stroke-width="1.5"/>' +
    '<rect x="40" y="58" width="14" height="8" rx="3" fill="#2255aa"/>' +
    '<!-- Body suit -->' +
    '<rect x="32" y="58" width="32" height="26" rx="8" fill="#1a4488" stroke="#2255aa" stroke-width="1"/>' +
    '<!-- Waist -->' +
    '<rect x="34" y="82" width="28" height="8" rx="4" fill="#153a77"/>' +
    '<!-- Head -->' +
    '<circle cx="48" cy="44" r="14" fill="#1a3366" stroke="#2255aa" stroke-width="1.5"/>' +
    '<!-- Mask visor -->' +
    '<ellipse cx="48" cy="44" rx="11" ry="8" fill="#44aaff" fill-opacity="0.55" stroke="#66ccff" stroke-width="1"/>' +
    '<ellipse cx="48" cy="44" rx="8" ry="5.5" fill="#66ccff" fill-opacity="0.25"/>' +
    '<!-- Bubbles -->' +
    [0,1,2].map(i=>'<circle cx="' + (50+i*5) + '" cy="' + (22-i*6) + '" r="' + (3-i*0.5) + '" fill="none" stroke="#88ddff" stroke-width="1" opacity="' + (0.7-i*0.2) + '"/>').join('') +
    '<!-- Arm L -->' +
    '<g transform="translate(32,68) rotate(' + armL + ')">' +
      '<line x1="0" y1="0" x2="0" y2="18" stroke="#1a4488" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="-4" y="16" width="9" height="5" rx="2" fill="#2255aa"/>' +
    '</g>' +
    '<!-- Arm R -->' +
    '<g transform="translate(64,68) rotate(' + armR + ')">' +
      '<line x1="0" y1="0" x2="0" y2="18" stroke="#1a4488" stroke-width="7" stroke-linecap="round"/>' +
      '<rect x="-5" y="16" width="9" height="5" rx="2" fill="#2255aa"/>' +
    '</g>' +
    '<!-- Legs -->' +
    '<line x1="40" y1="90" x2="36" y2="108" stroke="#153a77" stroke-width="8" stroke-linecap="round"/>' +
    '<line x1="56" y1="90" x2="60" y2="108" stroke="#153a77" stroke-width="8" stroke-linecap="round"/>' +
    '<!-- Flippers -->' +
    '<g transform="translate(36,108) rotate(' + flipperL + ')">' +
      '<ellipse cx="0" cy="8" rx="6" ry="12" fill="#00aacc" fill-opacity="0.85"/>' +
    '</g>' +
    '<g transform="translate(60,108) rotate(' + flipperR + ')">' +
      '<ellipse cx="0" cy="8" rx="6" ry="12" fill="#00aacc" fill-opacity="0.85"/>' +
    '</g>' +
    '<!-- Torch/flashlight -->' +
    '<line x1="64" y1="70" x2="80" y2="62" stroke="#ccdd44" stroke-width="3" stroke-linecap="round"/>' +
    '<ellipse cx="82" cy="61" rx="5" ry="4" fill="#ffee88" fill-opacity="0.8"/>' +
    '<line x1="84" y1="60" x2="98" y2="52" stroke="#ffff88" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3,2"/>' +
  '</svg>';
}

// ── Scroll / drag physics ─────────────────────────────
let velocity=0, reefRot=0, dragActive=false, dragPrev=0;
const SCROLL_SENS=0.00038, DRAG_SENS=0.0048, INERTIA=0.962, MAX_V=0.02;
function applyDelta(d){velocity+=d*SCROLL_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));}
window.addEventListener('wheel',e=>{e.preventDefault();applyDelta(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY);},{passive:false});
canvas.addEventListener('mousedown',e=>{dragActive=true;dragPrev=e.clientX;});
window.addEventListener('mousemove',e=>{if(!dragActive)return;velocity+=-(e.clientX-dragPrev)*DRAG_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));dragPrev=e.clientX;});
window.addEventListener('mouseup',()=>{dragActive=false;});
canvas.addEventListener('touchstart',e=>{dragActive=true;dragPrev=e.touches[0].clientX;},{passive:true});
window.addEventListener('touchmove',e=>{if(!dragActive)return;velocity+=-(e.touches[0].clientX-dragPrev)*DRAG_SENS;velocity=Math.max(-MAX_V,Math.min(MAX_V,velocity));dragPrev=e.touches[0].clientX;},{passive:true});
window.addEventListener('touchend',()=>{dragActive=false;});
function doZoom(d){camTarget=Math.max(14,Math.min(44,camTarget-d*4));}
window.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='=')doZoom(1);if(e.key==='-')doZoom(-1);});

// ── Raycasting ────────────────────────────────────────
const rc=new THREE.Raycaster(); const mv=new THREE.Vector2();
canvas.addEventListener('click',e=>{
  if(Math.abs(velocity)>0.012)return;
  mv.x=(e.clientX/innerWidth)*2-1; mv.y=-(e.clientY/innerHeight)*2+1;
  rc.setFromCamera(mv,camera);
  for(const sg of structGroups){
    const kids=[]; sg.traverse(c=>{if(c.isMesh)kids.push(c);});
    if(rc.intersectObjects(kids).length){openPage(sg.userData.id);return;}
  }
  if(!e.target.closest('#detail-page'))closePage();
});
window.addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

// ── Section label util ────────────────────────────────
const secLabel=document.getElementById('secLabel');
const gaugeFill=document.getElementById('gaugeFill');
function nearestSection(rot){
  const deg=((-rot*180/Math.PI)%360+360)%360;
  let best=null,bd=999;
  DEFS.forEach(s=>{const d=Math.abs(((s.angle-deg+180+360)%360)-180);if(d<bd){bd=d;best=s;}});
  return bd<38?best:null;
}

// ═══════════════════════════════════════════════════════
//  ANIMATION LOOP
// ═══════════════════════════════════════════════════════
let t=0;
function animate(){
  requestAnimationFrame(animate); t+=0.016;

  // physics
  velocity*=INERTIA; reefRot+=velocity; reef.rotation.y=reefRot;

  // bubbles rise
  const bposArr=bubbleGeo.attributes.position.array;
  for(let i=0;i<N_BUBBLES;i++){
    bposArr[i*3+1]+=bvel[i*3+1];
    bposArr[i*3  ]+=Math.sin(t*0.8+i)*0.002;
    if(bposArr[i*3+1]>15){bposArr[i*3+1]=-12;bposArr[i*3]=(Math.random()-0.5)*40;bposArr[i*3+2]=(Math.random()-0.5)*40;}
  }
  bubbleGeo.attributes.position.needsUpdate=true;

  // caustic shafts sway
  scene.children.forEach(c=>{if(c.userData.shaftSpeed){c.position.x=c.userData.shaftBase+Math.sin(t*c.userData.shaftSpeed*40+c.userData.shaftPhase)*0.8;c.material.opacity=0.03+Math.sin(t*c.userData.shaftSpeed*30+c.userData.shaftPhase)*0.015;}});

  // jellies pulse
  jellies.forEach(j=>{
    const p=j.userData; const pulse=Math.sin(t*p.speed*60+p.phase);
    j.position.y=p.by+Math.sin(t*p.speed*40+p.phase)*1.8;
    j.position.x=p.bx+Math.cos(t*p.speed*30+p.phase)*1.2;
    j.children[0].scale.y=0.85+pulse*0.15;
    j.children[0].scale.x=j.children[0].scale.z=1.0-pulse*0.08;
  });

  // fish swim in circle
  fish.forEach((f,i)=>{
    const p=f.userData; const a=t*p.speed*8+p.phase;
    f.position.x=Math.cos(a)*9; f.position.z=Math.sin(a)*9;
    f.position.y=f.userData.by||(f.userData.by=f.position.y); f.position.y=f.userData.by+Math.sin(t*3+p.wobble)*0.5;
    f.rotation.y=-(a+Math.PI/2);
    f.children[0].scale.x=1+Math.sin(t*12+p.phase)*0.08;
  });

  // structure animations
  structGroups.forEach(sg=>{
    sg.traverse(c=>{
      if(c.userData.float){if(!c.userData._fy)c.userData._fy=c.position.y;c.position.y=c.userData._fy+Math.sin(t*2.2)*0.06;}
      if(c.userData.blink)c.material.emissiveIntensity=0.6+Math.abs(Math.sin(t*2.2))*0.9;
      if(c.userData.prop)c.rotation.z+=0.06;
      if(c.userData.kelp){c.rotation.z=Math.sin(t*0.8+c.userData.kelpPhase)*0.18;}
      if(c.userData.sonarRing){const age=(t*0.4+c.userData.sonarPhase)%1.5;c.material.opacity=Math.max(0,0.22-age*0.15);c.scale.setScalar(1+age*1.2);}
      if(c.userData.orbitAngle!==undefined){c.userData.orbitAngle+=0.018;c.position.x=Math.cos(c.userData.orbitAngle)*c.userData.orbitR;c.position.z=Math.sin(c.userData.orbitAngle)*c.userData.orbitR;}
    });
  });

  // water surface shimmer
  surface.material.opacity=0.04+Math.sin(t*0.6)*0.02;

  // camera zoom interpolation
  camDist+=(camTarget-camDist)*0.07;
  camera.position.set(0,camDist*0.42,camDist);
  camera.lookAt(0,-1,0);

  // depth gauge
  const depthPct=((camDist-14)/(44-14))*100;
  gaugeFill.style.height=(100-depthPct)+'%';

  // diver
  updateDiverSVG(Math.abs(velocity));

  // section label
  const ns=nearestSection(reefRot);
  secLabel.textContent=ns?('🧭 '+ns.label):'Scroll to Dive';

  renderer.render(scene,camera);
}

// ── Boot ──────────────────────────────────────────────
setTimeout(()=>{document.getElementById('loader').classList.add('gone');animate();},1400);
</script>
</body>
</html>`;
  }
};