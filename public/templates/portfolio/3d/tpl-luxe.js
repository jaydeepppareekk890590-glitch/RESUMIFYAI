/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: LUXE
   File: templates/portfolio/tpl-luxe.js
   Style: 3D Book · Desk Lamp · Gold Noir · Three.js
   Version: 3.0 — Physically correct book flip (Y-axis hinge on spine)
================================================================ */

window.TPL_LUXE = {
  id: 'luxe',
  name: 'Luxe',
  category: 'Immersive 3D',
  theme: 'gold-noir',
  animated: true,

  thumbnail() {
    return `
      <div style="position:relative;width:100%;height:100%;background:linear-gradient(135deg,#04030a,#0a0814,#12101e);overflow:hidden;border-radius:12px;font-family:Georgia,'Times New Roman',serif;">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 30%,rgba(201,168,76,0.08),transparent 70%);"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) perspective(600px) rotateY(-12deg);width:55%;height:60%;background:linear-gradient(135deg,#1a150e,#2a2018);border-radius:2px 8px 8px 2px;box-shadow:-4px 4px 20px rgba(0,0,0,0.6),0 0 40px rgba(201,168,76,0.08);border-left:6px solid #3a2a18;">
          <div style="position:absolute;top:15%;left:15%;right:15%;">
            <div style="width:20px;height:1px;background:linear-gradient(90deg,#c9a84c,transparent);margin-bottom:8px;"></div>
            <div style="font-size:8px;letter-spacing:0.3em;color:#c9a84c;text-transform:uppercase;margin-bottom:4px;">PORTFOLIO</div>
            <div style="font-size:14px;font-weight:700;color:#f5ead8;line-height:1.3;">3D Book<br>Experience</div>
          </div>
        </div>
        <div style="position:absolute;bottom:8%;left:50%;transform:translateX(-50%);text-align:center;">
          <div style="font-size:12px;font-weight:700;color:#c9a84c;letter-spacing:0.25em;">LUXE</div>
        </div>
        <div style="position:absolute;bottom:3%;left:50%;transform:translateX(-50%);display:flex;gap:12px;">
          ${['About','Skills','Projects','Contact'].map(l=>`<span style="font-size:6px;color:rgba(201,168,76,0.4);letter-spacing:0.15em;text-transform:uppercase;">${l}</span>`).join('')}
        </div>
      </div>`;
  },

  render(data) {
    const name       = data.name       || 'Your Name';
    const role       = data.role       || 'Developer & Designer';
    const bio        = data.bio        || 'Crafting exceptional digital experiences with elegant code and beautiful interfaces.';
    const location   = data.location   || 'Your City';
    const email      = data.email      || '';
    const github     = data.github     || '';
    const linkedin   = data.linkedin   || '';
    const skills     = data.skills     || [];
    const projects   = data.projects   || [];
    const experience = data.experience || [];

    const skillNames = skills.map(s => s.name || s).slice(0, 10);
    while (skillNames.length < 4) skillNames.push('JavaScript', 'React', 'Node.js', 'Design');

    const projs = projects.slice(0, 4).map(p => ({
      name: p.name || 'Project',
      desc: p.description || '',
      tech: (p.tech || []).join(' · ')
    }));
    while (projs.length < 2) projs.push({ name: 'Project', desc: 'Amazing project', tech: 'React · Node.js' });

    const exps = experience.slice(0, 3).map(e => ({
      role: e.title || 'Developer',
      co: e.company || 'Company',
      period: e.duration || '2023 – Now',
      desc: e.description || ''
    }));

    const githubH   = github.replace(/^https?:\/\//, '') || 'github.com/you';
    const linkedinH = linkedin.replace(/^https?:\/\//, '') || 'linkedin.com/in/you';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${name} — Luxe Portfolio</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');
:root{--gold:#c9a84c;--gold-light:#e8cc7a;--gold-dim:rgba(201,168,76,0.4);--deep:#04030a;--cream:#f5ead8;--paper:#fdf6ec;--paper-dark:#e8dcc8;}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--deep);overflow:hidden;font-family:'Cormorant Garamond',serif;user-select:none;cursor:default;}
canvas{display:block;position:fixed;inset:0;z-index:0;}

/* Loader */
#loader{position:fixed;inset:0;background:var(--deep);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:1000;transition:opacity 0.8s;}
#loader.hidden{opacity:0;pointer-events:none;}
.loader-title{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,3vw,2rem);color:var(--gold);letter-spacing:0.35em;margin-bottom:1.5rem;animation:lpulse 2s ease-in-out infinite;}
@keyframes lpulse{0%,100%{opacity:0.4}50%{opacity:1}}
.loader-bar{width:160px;height:1px;background:rgba(201,168,76,0.15);overflow:hidden;border-radius:1px;}
.loader-fill{height:100%;background:var(--gold);width:0;transition:width 0.3s;}
.loader-sub{margin-top:1rem;font-size:0.65rem;letter-spacing:0.3em;color:var(--gold-dim);text-transform:uppercase;}

/* Top bar */
#topbar{position:fixed;top:0;left:0;right:0;padding:1.5rem 2.5rem;display:flex;justify-content:space-between;align-items:center;z-index:200;opacity:0;transition:opacity 0.8s;}
#topbar.show{opacity:1;}
.site-name{font-family:'Playfair Display',serif;font-size:0.75rem;letter-spacing:0.4em;color:var(--gold);text-transform:uppercase;}
.site-role{font-size:0.6rem;letter-spacing:0.2em;color:var(--gold-dim);text-transform:uppercase;margin-top:2px;}

/* Open Book CTA */
#open-cta{position:fixed;bottom:12vh;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.8rem;z-index:200;opacity:0;transition:opacity 0.8s;cursor:pointer;}
#open-cta.show{opacity:1;}
.cta-label{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(0.9rem,2vw,1.15rem);color:var(--gold-light);letter-spacing:0.12em;}
.cta-circle{width:48px;height:48px;border:1px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:cfloat 3s ease-in-out infinite;position:relative;}
.cta-circle::after{content:'';position:absolute;inset:-5px;border:1px solid rgba(201,168,76,0.15);border-radius:50%;animation:cripple 3s ease-in-out infinite;}
@keyframes cfloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes cripple{0%,100%{transform:scale(1);opacity:0.3}50%{transform:scale(1.25);opacity:0}}
.cta-arrow{color:var(--gold);font-size:18px;}

/* Lamp Toggle */
#lamp-btn{position:fixed;top:1.5rem;right:2.5rem;z-index:201;background:rgba(4,3,10,0.6);border:1px solid rgba(201,168,76,0.25);color:var(--gold-dim);padding:0.3rem 0.7rem;font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;transition:all 0.2s;backdrop-filter:blur(8px);opacity:0;border-radius:2px;}
#lamp-btn.show{opacity:1;}
#lamp-btn:hover{border-color:var(--gold);color:var(--gold);}

/* Page Navigation */
#page-nav{position:fixed;bottom:4vh;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:1.5rem;z-index:200;opacity:0;pointer-events:none;transition:opacity 0.5s;}
#page-nav.show{opacity:1;pointer-events:all;}
.pnav-btn{width:42px;height:42px;border:1px solid rgba(201,168,76,0.35);border-radius:50%;background:rgba(4,3,10,0.65);backdrop-filter:blur(8px);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:16px;transition:all 0.2s;}
.pnav-btn:hover{border-color:var(--gold);background:rgba(201,168,76,0.06);transform:scale(1.06);}
.pnav-btn:disabled{opacity:0.15;pointer-events:none;}
#page-indicator{font-family:'Space Mono',monospace;font-size:0.58rem;letter-spacing:0.2em;color:var(--gold-dim);min-width:90px;text-align:center;}

/* Dots navigation */
#page-dots{display:flex;gap:8px;align-items:center;}
.pdot{width:6px;height:6px;border-radius:50%;background:rgba(201,168,76,0.2);transition:all 0.3s;cursor:pointer;}
.pdot.active{background:var(--gold);box-shadow:0 0 6px rgba(201,168,76,0.4);transform:scale(1.3);}
.pdot:hover{background:rgba(201,168,76,0.5);}

/* Content Panel */
#content-panel{position:fixed;right:3vw;top:50%;transform:translateY(-50%) translateX(20px);width:min(34vw,400px);opacity:0;transition:all 0.5s cubic-bezier(0.16,1,0.3,1);z-index:150;pointer-events:none;}
#content-panel.show{opacity:1;transform:translateY(-50%) translateX(0);pointer-events:all;}
.cp-inner{background:rgba(6,4,14,0.88);backdrop-filter:blur(20px);border:1px solid rgba(201,168,76,0.15);border-radius:4px;padding:2rem 2.2rem;max-height:70vh;overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(201,168,76,0.15) transparent;}
.cp-inner::-webkit-scrollbar{width:3px;}
.cp-inner::-webkit-scrollbar-thumb{background:rgba(201,168,76,0.15);border-radius:2px;}
.cp-num{font-family:'Space Mono',monospace;font-size:0.55rem;letter-spacing:0.3em;color:var(--gold-dim);margin-bottom:0.4rem;}
.cp-title{font-family:'Playfair Display',serif;font-size:clamp(1.4rem,2.2vw,1.9rem);line-height:1.15;color:var(--cream);margin-bottom:0.5rem;}
.cp-line{width:30px;height:1px;background:var(--gold);margin:0.8rem 0;}
.cp-body{font-size:0.88rem;line-height:1.85;color:rgba(245,234,216,0.85);font-weight:300;}
.cp-body p{margin-bottom:0.6rem;}
.skill-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-top:0.8rem;}
.skill-tag{padding:0.35rem 0.7rem;border:1px solid rgba(201,168,76,0.22);font-family:'Space Mono',monospace;font-size:0.58rem;letter-spacing:0.12em;color:var(--gold);text-transform:uppercase;background:rgba(201,168,76,0.03);text-align:center;transition:all 0.2s;}
.skill-tag:hover{border-color:var(--gold);background:rgba(201,168,76,0.08);}
.proj-item{padding:0.7rem 0;border-bottom:1px solid rgba(201,168,76,0.08);transition:padding-left 0.2s;}
.proj-item:hover{padding-left:6px;}
.proj-name{font-family:'Playfair Display',serif;font-size:0.95rem;color:var(--cream);}
.proj-desc{font-size:0.72rem;color:rgba(245,234,216,0.7);line-height:1.5;margin-top:0.15rem;}
.proj-tech{margin-top:0.2rem;font-family:'Space Mono',monospace;font-size:0.52rem;color:var(--gold);letter-spacing:0.05em;}
.exp-item{margin-bottom:1rem;padding-left:12px;border-left:2px solid rgba(201,168,76,0.2);transition:border-color 0.2s;}
.exp-item:hover{border-color:var(--gold);}
.exp-role{font-family:'Playfair Display',serif;font-size:0.9rem;color:var(--cream);}
.exp-co{font-size:0.72rem;color:var(--gold);margin:0.12rem 0;}
.exp-period{font-family:'Space Mono',monospace;font-size:0.55rem;color:rgba(245,234,216,0.5);letter-spacing:0.08em;}
.exp-desc{font-size:0.72rem;color:rgba(245,234,216,0.75);margin-top:0.25rem;line-height:1.55;}
.contact-row{display:flex;align-items:center;gap:0.9rem;padding:0.55rem 0;border-bottom:1px solid rgba(201,168,76,0.06);transition:padding-left 0.2s;}
.contact-row:hover{padding-left:4px;}
.contact-icon{width:30px;height:30px;border:1px solid rgba(201,168,76,0.22);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.contact-lbl{display:block;font-family:'Space Mono',monospace;font-size:0.5rem;letter-spacing:0.2em;color:var(--gold);text-transform:uppercase;margin-bottom:0.05rem;}
.contact-val{font-size:0.78rem;color:rgba(245,234,216,0.85);}
.hire-center{text-align:center;padding:1rem 0;}
.hire-big{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(1.5rem,2.5vw,2.2rem);color:var(--gold);line-height:1.25;margin-bottom:0.8rem;}
.hire-sub{font-size:0.82rem;color:rgba(245,234,216,0.7);line-height:1.8;margin-bottom:1.5rem;}
.hire-cta{display:inline-block;padding:0.7rem 2rem;border:1px solid var(--gold);color:var(--gold);font-family:'Space Mono',monospace;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;transition:all 0.25s;}
.hire-cta:hover{background:var(--gold);color:var(--deep);}
#particles{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;}
.particle{position:absolute;width:1.5px;height:1.5px;background:var(--gold);border-radius:50%;opacity:0;animation:pdrift linear infinite;}
@keyframes pdrift{0%{transform:translateY(100vh);opacity:0}10%{opacity:0.25}85%{opacity:0.08}100%{transform:translateY(-20px) translateX(var(--dx));opacity:0}}
#close-panel{position:absolute;top:12px;right:14px;background:none;border:1px solid rgba(201,168,76,0.2);color:var(--gold-dim);width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;z-index:10;}
#close-panel:hover{border-color:var(--gold);color:var(--gold);}
</style>
</head>
<body>

<!-- Loader -->
<div id="loader">
  <div class="loader-title">Portfolio</div>
  <div class="loader-bar"><div class="loader-fill" id="loader-fill"></div></div>
  <div class="loader-sub">Preparing the book…</div>
</div>

<!-- Top bar -->
<div id="topbar">
  <div>
    <div class="site-name">${name.toUpperCase()}</div>
    <div class="site-role">${role}</div>
  </div>
</div>

<!-- Lamp toggle -->
<button id="lamp-btn" onclick="toggleLamp()">Lamp On</button>

<!-- Open Book CTA -->
<div id="open-cta" onclick="openBook()">
  <div class="cta-label">Open the Book</div>
  <div class="cta-circle"><span class="cta-arrow">↓</span></div>
</div>

<!-- Page Navigation -->
<div id="page-nav">
  <button class="pnav-btn" id="prev-btn" onclick="prevPage()">←</button>
  <div id="page-dots"></div>
  <span id="page-indicator">1 / 6</span>
  <button class="pnav-btn" id="next-btn" onclick="nextPage()">→</button>
</div>

<!-- Content Panel -->
<div id="content-panel">
  <div class="cp-inner" id="cp-inner">
    <button id="close-panel" onclick="closePanel()">✕</button>
  </div>
</div>

<!-- Particles -->
<div id="particles">
  ${Array.from({length:25},(_,i)=>`<div class="particle" style="left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*8}s;--dx:${(Math.random()-0.5)*60}px;"></div>`).join('')}
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  // ─── Config ───────────────────────────────────────────
  const PAGE_COUNT = 6;
  const PAGE_CONTENT = [
    \`<div class="cp-num">01 — Introduction</div>
     <div class="cp-title">Hello, I'm<br>${name}</div>
     <div class="cp-line"></div>
     <div class="cp-body">
       <p>${bio}</p>
       <p>Based in ${location} · Open to new opportunities.</p>
     </div>\`,

    \`<div class="cp-num">02 — Skills</div>
     <div class="cp-title">What I<br>Work With</div>
     <div class="cp-line"></div>
     <div class="skill-grid">
       ${skillNames.map(s=>`<div class="skill-tag">${s}</div>`).join('')}
     </div>\`,

    \`<div class="cp-num">03 — Work</div>
     <div class="cp-title">Selected<br>Projects</div>
     <div class="cp-line"></div>
     ${projs.map(p=>`<div class="proj-item"><div class="proj-name">${p.name}</div><div class="proj-desc">${p.desc}</div><div class="proj-tech">${p.tech}</div></div>`).join('')}\`,

    \`<div class="cp-num">04 — Journey</div>
     <div class="cp-title">Experience<br>&amp; Growth</div>
     <div class="cp-line"></div>
     ${exps.length ? exps.map(e=>`<div class="exp-item"><div class="exp-role">${e.role}</div><div class="exp-co">${e.co}</div><div class="exp-period">${e.period}</div><div class="exp-desc">${e.desc}</div></div>`).join('') : '<div class="cp-body">Your journey goes here.</div>'}\`,

    \`<div class="cp-num">05 — Connect</div>
     <div class="cp-title">Get In<br>Touch</div>
     <div class="cp-line"></div>
     ${email?`<div class="contact-row"><div class="contact-icon">✉</div><div><span class="contact-lbl">Email</span><span class="contact-val">${email}</span></div></div>`:''}
     ${githubH?`<div class="contact-row"><div class="contact-icon">⚙</div><div><span class="contact-lbl">GitHub</span><span class="contact-val">${githubH}</span></div></div>`:''}
     ${linkedinH?`<div class="contact-row"><div class="contact-icon">▦</div><div><span class="contact-lbl">LinkedIn</span><span class="contact-val">${linkedinH}</span></div></div>`:''}
    \`,

    \`<div class="cp-num">06 — The End</div>
     <div class="hire-center">
       <div class="hire-big">Let's Build<br>Something<br>Incredible</div>
       <div class="hire-sub">Open to exciting opportunities.<br>Let's make something great together.</div>
       ${email?`<a class="hire-cta" href="mailto:${email}">Start a Conversation</a>`:''}
     </div>\`
  ];

  // ─── Scene setup ──────────────────────────────────────
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04030a);
  scene.fog = new THREE.FogExp2(0x04030a, 0.022);

  // Camera positioned above-front to see the book lying flat on desk, pages arcing up
  const camera = new THREE.PerspectiveCamera(40, innerWidth/innerHeight, 0.1, 100);
  camera.position.set(0, 7, 8.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  document.body.appendChild(renderer.domElement);

  // ─── Lighting ─────────────────────────────────────────
  scene.add(new THREE.AmbientLight(0x1a1428, 0.6));

  const lampLight = new THREE.SpotLight(0xffe8c0, 3.0, 20, Math.PI*0.28, 0.5, 1.2);
  lampLight.position.set(-4, 7, 3);
  lampLight.target.position.set(0, 0, 0);
  lampLight.castShadow = true;
  lampLight.shadow.mapSize.set(1024,1024);
  scene.add(lampLight, lampLight.target);

  let lampOn = true;
  window.toggleLamp = function(){
    lampOn = !lampOn;
    lampLight.intensity = lampOn ? 3.0 : 0.2;
    document.getElementById('lamp-btn').textContent = lampOn ? 'Lamp On' : 'Lamp Off';
  };

  const rimLight = new THREE.PointLight(0xc9a84c, 0.4, 14);
  rimLight.position.set(4, 3, -2);
  scene.add(rimLight);

  // ─── Desk ─────────────────────────────────────────────
  const deskMat = new THREE.MeshStandardMaterial({color:0x1a1410, roughness:0.85, metalness:0.05});
  const desk = new THREE.Mesh(new THREE.BoxGeometry(16, 0.3, 9), deskMat);
  desk.position.y = -0.15;
  desk.receiveShadow = true;
  scene.add(desk);

  // Gold desk edge
  const edgeMat = new THREE.MeshStandardMaterial({color:0xc9a84c, metalness:0.7, roughness:0.3});
  const edge = new THREE.Mesh(new THREE.BoxGeometry(16.1, 0.05, 0.08), edgeMat);
  edge.position.set(0, 0.01, 4.46);
  scene.add(edge);

  // ─── Desk Lamp ────────────────────────────────────────
  const lampGroup = new THREE.Group();
  const lMetalMat = new THREE.MeshStandardMaterial({color:0x2e2618, metalness:0.65, roughness:0.35});
  // base disc
  lampGroup.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.14, 20), lMetalMat)));
  // vertical pole
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 3.2, 8), lMetalMat);
  pole.position.set(0, 1.65, 0);
  lampGroup.add(pole);
  // angled arm
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.6, 8), lMetalMat);
  arm.position.set(-0.45, 3.8, 0);
  arm.rotation.z = -0.48;
  lampGroup.add(arm);
  // shade cone
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.75, 0.85, 18, 1, true),
    new THREE.MeshStandardMaterial({color:0x1c1508, metalness:0.25, roughness:0.75, side:THREE.DoubleSide})
  );
  shade.position.set(-1.3, 5.35, 0);
  shade.rotation.z = 0.28;
  lampGroup.add(shade);
  // bulb
  const bulbMat = new THREE.MeshBasicMaterial({color:0xffe8c0});
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), bulbMat);
  bulb.position.set(-1.3, 4.98, 0);
  lampGroup.add(bulb);

  lampGroup.position.set(-4, 0.07, 1.8);
  lampGroup.scale.setScalar(0.82);
  scene.add(lampGroup);

  // ─── BOOK — physically correct ────────────────────────
  /*
    Real book anatomy when closed and lying flat on desk:
      - Spine runs along one edge (we'll put it on the LEFT side, at x = -BOOK_W/2)
      - Pages fan to the RIGHT from that spine
      - Opening a page = rotating it around the Y-axis (vertical axis through spine)
        from 0 (right side, closed) → π (left side, flipped over)
      - The book itself is laid flat so we rotate it: x-axis -π/2 keeps it on the desk
        but we'll just position geometry flat directly.
  */

  const BOOK_W  = 3.0;   // width of each page/cover (extends in +x from spine)
  const BOOK_H  = 3.8;   // spine length (runs along z-axis)
  const BOOK_D  = 0.55;  // total thickness
  const C_THICK = 0.065; // cover thickness
  const P_THICK = 0.011; // each page thickness

  /*
   COORDINATE SYSTEM — looking top-down:

     Spine is a vertical LINE at x=0 in bookGroup local space.
     Everything — pages and covers — extends to the RIGHT (+x).
     Hinge  = rotation around Y-axis AT x=0 (the spine line).
     Closed = rotation.y = 0   (page sits flat to the right)
     Turned = rotation.y = π   (page swept full 180° to the left)

     bookGroup is shifted left by BOOK_W/2 to visually center the book.
  */

  const bookGroup = new THREE.Group();
  // Center the open book on screen (spine in center, pages fan left and right)
  bookGroup.position.set(-BOOK_W / 2, 0.0, 0);
  scene.add(bookGroup);

  // ── Materials ──
  const coverMat = new THREE.MeshStandardMaterial({color:0x2a1c10, roughness:0.62, metalness:0.12});
  const spineM   = new THREE.MeshStandardMaterial({color:0x3a2a18, roughness:0.7,  metalness:0.15});
  const pageMat  = new THREE.MeshStandardMaterial({color:0xfdf6ec, roughness:0.95, metalness:0, side:THREE.DoubleSide});
  const goldMat  = new THREE.MeshStandardMaterial({color:0xc9a84c, metalness:0.72, roughness:0.28});

  // ── Spine block — sits at x = -BOOK_D/2 to x = BOOK_D/2, centered on spine line ──
  const spineMesh = new THREE.Mesh(
    new THREE.BoxGeometry(BOOK_D, C_THICK, BOOK_H),
    spineM
  );
  spineMesh.position.set(-BOOK_D / 2, C_THICK / 2, 0);
  bookGroup.add(spineMesh);

  // Gold spine stripe
  const spineStripe = new THREE.Mesh(
    new THREE.BoxGeometry(BOOK_D * 0.5, C_THICK + 0.005, BOOK_H * 0.04), goldMat
  );
  spineStripe.position.set(-BOOK_D / 2, C_THICK / 2 + 0.003, 0);
  bookGroup.add(spineStripe);

  // ── Back cover — STATIC, sits flat to the right of spine ──
  // Its LEFT edge is at x=0 (spine), extends to x=+BOOK_W.
  const cvGeo = new THREE.BoxGeometry(BOOK_W, C_THICK, BOOK_H);
  const backCover = new THREE.Mesh(cvGeo, coverMat);
  backCover.position.set(BOOK_W / 2, C_THICK / 2, 0); // center at BOOK_W/2 so left edge = 0
  backCover.receiveShadow = true;
  bookGroup.add(backCover);

  // ── Front cover — HINGED at spine (x=0), pivot rotates around Y-axis ──
  const frontCoverPivot = new THREE.Group();
  // Pivot sits right on the spine line, at the top of the page stack
  frontCoverPivot.position.set(0, C_THICK + PAGE_COUNT * P_THICK + 0.001, 0);
  bookGroup.add(frontCoverPivot);

  const frontCoverMesh = new THREE.Mesh(cvGeo, coverMat.clone());
  // RIGHT of pivot: left edge at x=0, center at x=+BOOK_W/2
  frontCoverMesh.position.set(BOOK_W / 2, 0, 0);
  frontCoverMesh.castShadow = true;
  frontCoverPivot.add(frontCoverMesh);

  // Gold title emboss on front cover
  const emboss = new THREE.Mesh(
    new THREE.BoxGeometry(BOOK_W * 0.58, 0.006, BOOK_H * 0.04), goldMat
  );
  emboss.position.set(BOOK_W / 2, 0.004, -BOOK_H * 0.12);
  frontCoverPivot.add(emboss);

  const emboss2 = new THREE.Mesh(
    new THREE.BoxGeometry(BOOK_W * 0.35, 0.006, BOOK_H * 0.026), goldMat
  );
  emboss2.position.set(BOOK_W / 2, 0.004, BOOK_H * 0.14);
  frontCoverPivot.add(emboss2);

  // ── Pages — each HINGED at spine (x=0) ──
  // Page 0 = topmost (first to turn). Page N-1 = bottom.
  const pages = [];
  for(let i = 0; i < PAGE_COUNT; i++){
    // Stack top-to-bottom: page 0 is highest up
    const yOff = C_THICK + (PAGE_COUNT - 1 - i) * P_THICK;

    const pivot = new THREE.Group();
    // Pivot IS the spine line at x=0
    pivot.position.set(0, yOff, 0);
    bookGroup.add(pivot);

    // Page mesh center at +BOOK_W/2 → left edge at x=0 (pivot/spine), right edge at x=+BOOK_W
    const pageGeo = new THREE.BoxGeometry(BOOK_W - 0.05, P_THICK, BOOK_H - 0.12);
    const pageMesh = new THREE.Mesh(pageGeo, pageMat.clone());
    pageMesh.position.set((BOOK_W - 0.05) / 2, 0, 0);
    pageMesh.castShadow = true;
    pivot.add(pageMesh);

    // Thin gold crease right at the hinge
    const crease = new THREE.Mesh(
      new THREE.BoxGeometry(0.006, P_THICK + 0.003, BOOK_H - 0.12),
      goldMat
    );
    crease.position.set(0.003, 0, 0); // just to the right of spine
    pivot.add(crease);

    pages.push({ pivot, targetAngle: 0, currentAngle: 0 });
  }

  // ─── State ────────────────────────────────────────────
  let bookOpen     = false;
  let currentPage  = 0;
  let coverTarget  = 0;   // front cover Y rotation (0=closed, -PI=open to left)
  let coverAngle   = 0;
  let bookTargetY  = 0;
  let bookRotY     = 0;

  // Build nav dots
  const dotsEl = document.getElementById('page-dots');
  for(let i = 0; i < PAGE_COUNT; i++){
    const dot = document.createElement('div');
    dot.className = 'pdot' + (i===0?' active':'');
    dot.onclick = () => goToPage(i);
    dotsEl.appendChild(dot);
  }

  function updateDots(){
    dotsEl.querySelectorAll('.pdot').forEach((d,i)=>{
      d.className = 'pdot' + (i===currentPage?' active':'');
    });
  }

  function updateNav(){
    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage === PAGE_COUNT - 1;
    document.getElementById('page-indicator').textContent = (currentPage+1) + ' / ' + PAGE_COUNT;
    updateDots();
  }

  function showContent(idx){
    const inner = document.getElementById('cp-inner');
    inner.innerHTML = '<button id="close-panel" onclick="closePanel()">✕</button>' + PAGE_CONTENT[idx];
    document.getElementById('content-panel').classList.add('show');
  }

  window.closePanel = function(){
    document.getElementById('content-panel').classList.remove('show');
  };

  function goToPage(idx){
    if(idx < 0 || idx >= PAGE_COUNT) return;
    currentPage = idx;

    /*
      Pages are ordered top-to-bottom in the stack (page 0 is on top when book is closed).
      When we flip to page N, pages 0..N-1 have been turned (angle = -PI).
      Pages N onwards remain flat.
    */
    for(let i = 0; i < PAGE_COUNT; i++){
      // +PI = rotate counterclockwise around Z = arcs UP over the table (correct!)
      pages[i].targetAngle = i < currentPage ? Math.PI * 0.97 : 0;
    }

    updateNav();
    showContent(idx);

    // Subtle book lean: when open and pages are turning, lean slightly toward viewer
    bookTargetY = (currentPage / Math.max(PAGE_COUNT - 1, 1)) * 0.1 - 0.05;
  }

  window.nextPage = function(){ if(currentPage < PAGE_COUNT-1) goToPage(currentPage+1); };
  window.prevPage = function(){ if(currentPage > 0) goToPage(currentPage-1); };

  window.openBook = function(){
    if(bookOpen) return;
    bookOpen = true;
    // +PI = arcs UP over the table surface to the left side
    coverTarget = Math.PI * 0.96;
    document.getElementById('open-cta').classList.remove('show');
    setTimeout(()=>{
      document.getElementById('page-nav').classList.add('show');
      goToPage(0);
    }, 700);
  };

  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight'||e.key===' '){ e.preventDefault(); bookOpen ? window.nextPage() : window.openBook(); }
    if(e.key==='ArrowLeft'){ e.preventDefault(); window.prevPage(); }
  });

  window.addEventListener('resize', ()=>{
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  // ─── Loader ───────────────────────────────────────────
  const loaderFill = document.getElementById('loader-fill');
  let loadProg = 0;
  const loadInt = setInterval(()=>{
    loadProg = Math.min(loadProg + 3 + Math.random()*6, 100);
    loaderFill.style.width = loadProg + '%';
    if(loadProg >= 100){
      clearInterval(loadInt);
      setTimeout(()=>{
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('topbar').classList.add('show');
        document.getElementById('lamp-btn').classList.add('show');
        document.getElementById('open-cta').classList.add('show');
      }, 400);
    }
  }, 45);

  // ─── Render loop ──────────────────────────────────────
  const clock = new THREE.Clock();
  const LERP = 0.065;

  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Front cover hinge: Z-axis rotation — page arcs UP and over
    coverAngle += (coverTarget - coverAngle) * LERP;
    frontCoverPivot.rotation.z = coverAngle;

    // Page turns: each pivots around Z-axis at spine (arc UP and over to left)
    pages.forEach(p=>{
      p.currentAngle += (p.targetAngle - p.currentAngle) * LERP;
      p.pivot.rotation.z = p.currentAngle;
    });

    // Gentle book breathe + subtle yaw
    bookRotY += (bookTargetY - bookRotY) * 0.04;
    bookGroup.rotation.y = bookRotY + Math.sin(t * 0.25) * 0.008;
    bookGroup.position.y = Math.sin(t * 0.7) * 0.008;

    // Lamp flicker
    if(lampOn){
      lampLight.intensity = 3.0 + Math.sin(t * 7) * 0.12;
    }

    renderer.render(scene, camera);
  }

  animate();
})();
<\/script>
</body></html>`;
  }
};
