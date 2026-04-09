/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: SLOT MACHINE
   File: templates/portfolio/tpl-slot-machine.js
   Style: 3D Slot Machine · Neon Casino · Coin Burst · Three.js
================================================================ */

window.TPL_SLOT_MACHINE = {
  id: 'slot-machine',
  name: 'Slot Machine',
  category: 'Interactive 3D',
  theme: 'neon-casino',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#0a0015,#1a0030,#2d0050);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(255,0,100,0.15),transparent 60%)"></div>
        <div style="font-size:48px;margin-bottom:12px;filter:drop-shadow(0 0 20px rgba(255,0,100,0.6))">🎰</div>
        <div style="font-size:18px;font-weight:900;color:#ff3388;text-shadow:0 0 20px rgba(255,0,100,0.5)">Slot Machine</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">PULL · SPIN · EXPLORE</div>
      </div>`;
  },

  render(data) {
    const name       = data.name       || 'Your Name';
    const role       = data.role       || 'Developer & Designer';
    const bio        = data.bio        || 'A passionate developer crafting beautiful web experiences.';
    const about      = data.about      || bio;
    const location   = data.location   || 'Your City';
    const email      = data.email      || 'you@email.com';
    const github     = data.github     || '';
    const linkedin   = data.linkedin   || '';
    const skills     = data.skills     || [];
    const projects   = data.projects   || [];
    const experience = data.experience || [];

    const githubH   = github.replace(/^https?:\/\//, '') || 'github.com/you';
    const linkedinH = linkedin.replace(/^https?:\/\//, '') || 'linkedin.com/in/you';

    const skillNames = skills.length ? skills.map(s => s.name || s) : ['JavaScript','React','Node.js','CSS'];

    const projHTML = projects.length
      ? projects.map(p => `<div class="proj-card"><div class="proj-emoji">${p.emoji||'🚀'}</div><div class="proj-name">${p.name}</div><div class="proj-desc">${p.description||''}</div><div class="proj-tech">${(p.tech||[]).map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div></div>`).join('')
      : '<div class="proj-card"><div class="proj-emoji">🚀</div><div class="proj-name">Your Project</div><div class="proj-desc">Add your amazing projects here.</div></div>';

    const expHTML = experience.length
      ? experience.map(e => `<div class="exp-card"><div class="exp-title">${e.title} · ${e.company}</div><div class="exp-dur">${e.duration}</div><div class="exp-desc">${e.description||''}</div></div>`).join('')
      : '<div class="exp-card"><div class="exp-title">Your Role · Company</div><div class="exp-dur">Duration</div><div class="exp-desc">Add your experience here.</div></div>';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Slot Machine Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0015;color:#fff;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;overflow-x:hidden}
#canvas-container{position:fixed;inset:0;z-index:0}
canvas{display:block}

#ui-overlay{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 20px}
.hero-section{text-align:center;margin-bottom:40px}
.hero-name{font-size:clamp(36px,6vw,64px);font-weight:900;background:linear-gradient(135deg,#ff3388,#ff8800,#ffdd00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:none;filter:drop-shadow(0 0 30px rgba(255,50,136,0.3))}
.hero-role{font-size:clamp(14px,2vw,20px);color:rgba(255,255,255,0.6);margin-top:8px;letter-spacing:0.15em;text-transform:uppercase;font-weight:700}
.hero-bio{max-width:500px;margin:20px auto 0;font-size:15px;color:rgba(255,255,255,0.5);line-height:1.8}

.slot-display{display:flex;gap:12px;justify-content:center;margin:30px 0;perspective:800px}
.reel{width:100px;height:120px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,50,136,0.3);border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:40px;overflow:hidden;position:relative;box-shadow:0 0 30px rgba(255,50,136,0.1),inset 0 0 20px rgba(0,0,0,0.3)}
.reel-inner{transition:transform 0.5s cubic-bezier(0.34,1.56,0.64,1)}

#pull-lever{padding:16px 40px;font-size:16px;font-weight:900;background:linear-gradient(135deg,#ff3388,#ff6600);color:#fff;border:none;border-radius:40px;cursor:pointer;letter-spacing:0.1em;text-transform:uppercase;box-shadow:0 8px 30px rgba(255,50,136,0.4);transition:all 0.2s;margin-bottom:30px}
#pull-lever:hover{transform:scale(1.05);box-shadow:0 12px 40px rgba(255,50,136,0.6)}
#pull-lever:active{transform:scale(0.95)}

.sections-nav{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:20px 0}
.nav-chip{padding:10px 22px;border-radius:30px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,50,136,0.2);color:rgba(255,255,255,0.7);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;text-transform:uppercase;letter-spacing:0.08em}
.nav-chip:hover,.nav-chip.active{background:rgba(255,50,136,0.15);border-color:#ff3388;color:#ff3388;box-shadow:0 0 20px rgba(255,50,136,0.2)}

#section-panel{max-width:700px;width:100%;margin-top:30px;min-height:300px}
.panel-section{display:none;animation:fadeUp 0.4s ease}
.panel-section.active{display:block}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

.about-text{font-size:16px;line-height:2;color:rgba(255,255,255,0.75);background:rgba(255,255,255,0.04);border-radius:20px;padding:30px;border:1px solid rgba(255,255,255,0.08)}
.skills-grid{display:flex;flex-wrap:wrap;gap:10px}
.skill-chip{padding:8px 18px;border-radius:20px;background:linear-gradient(135deg,rgba(255,50,136,0.1),rgba(255,136,0,0.1));border:1px solid rgba(255,50,136,0.25);color:#ff88aa;font-size:13px;font-weight:700}
.proj-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:18px;padding:22px;margin-bottom:14px}
.proj-emoji{font-size:28px;margin-bottom:8px}
.proj-name{font-size:17px;font-weight:800;color:#fff}
.proj-desc{font-size:13px;color:rgba(255,255,255,0.6);margin-top:6px;line-height:1.6}
.proj-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.tech-tag{padding:4px 12px;border-radius:14px;font-size:11px;background:rgba(255,50,136,0.1);border:1px solid rgba(255,50,136,0.2);color:#ff88aa;font-weight:700}
.exp-card{background:rgba(255,255,255,0.04);border-left:4px solid #ff3388;border-radius:0 14px 14px 0;padding:18px 22px;margin-bottom:14px}
.exp-title{font-weight:800;color:#fff;font-size:15px}
.exp-dur{font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;font-weight:700}
.exp-desc{font-size:13px;color:rgba(255,255,255,0.6);margin-top:8px;line-height:1.6}
.contact-grid{display:flex;flex-direction:column;gap:12px}
.contact-item{display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:14px;font-weight:600;text-decoration:none;transition:all 0.2s}
.contact-item:hover{background:rgba(255,50,136,0.1);border-color:rgba(255,50,136,0.3);transform:translateX(5px)}

.coin-particle{position:fixed;pointer-events:none;z-index:100;font-size:24px;animation:coinFall 1.5s ease-in forwards}
@keyframes coinFall{0%{opacity:1;transform:translateY(0) rotate(0deg) scale(1)}100%{opacity:0;transform:translateY(400px) rotate(720deg) scale(0.3)}}

#loader{position:fixed;inset:0;background:#0a0015;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
#loader-icon{font-size:60px;animation:bounce 0.5s ease-in-out infinite alternate}
@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-15px)}}
#loader-text{margin-top:16px;font-size:12px;font-weight:800;color:#ff3388;letter-spacing:0.3em}
</style>
</head>
<body>
<div id="loader"><div id="loader-icon">🎰</div><div id="loader-text">LOADING JACKPOT...</div></div>
<div id="canvas-container"></div>
<div id="ui-overlay">
  <div class="hero-section">
    <div class="hero-name">${name}</div>
    <div class="hero-role">${role}</div>
    <div class="hero-bio">${bio}</div>
  </div>

  <div class="slot-display">
    <div class="reel" id="reel1"><div class="reel-inner">🎨</div></div>
    <div class="reel" id="reel2"><div class="reel-inner">💻</div></div>
    <div class="reel" id="reel3"><div class="reel-inner">🚀</div></div>
  </div>
  <button id="pull-lever">🎰 Pull the Lever!</button>

  <div class="sections-nav">
    <div class="nav-chip active" data-section="about">About</div>
    <div class="nav-chip" data-section="skills">Skills</div>
    <div class="nav-chip" data-section="projects">Projects</div>
    <div class="nav-chip" data-section="experience">Experience</div>
    <div class="nav-chip" data-section="contact">Contact</div>
  </div>

  <div id="section-panel">
    <div class="panel-section active" id="sec-about">
      <div class="about-text">${about}</div>
    </div>
    <div class="panel-section" id="sec-skills">
      <div class="skills-grid">${skillNames.map(s=>`<div class="skill-chip">${s}</div>`).join('')}</div>
    </div>
    <div class="panel-section" id="sec-projects">${projHTML}</div>
    <div class="panel-section" id="sec-experience">${expHTML}</div>
    <div class="panel-section" id="sec-contact">
      <div class="contact-grid">
        <a class="contact-item" href="mailto:${email}">📧 ${email}</a>
        <a class="contact-item" href="${github||'#'}" target="_blank">🐙 ${githubH}</a>
        <a class="contact-item" href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a>
        <div class="contact-item">📍 ${location}</div>
      </div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  // Three.js Scene — Neon casino particles
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z = 30;
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Neon particles
  const particleCount = 800;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount*3);
  const colors = new Float32Array(particleCount*3);
  const neonColors = [[1,0.2,0.53],[1,0.53,0],[1,0.87,0],[0.4,0.2,1]];
  for(let i=0;i<particleCount;i++){
    positions[i*3]=(Math.random()-0.5)*80;
    positions[i*3+1]=(Math.random()-0.5)*80;
    positions[i*3+2]=(Math.random()-0.5)*40;
    const c=neonColors[Math.floor(Math.random()*neonColors.length)];
    colors[i*3]=c[0];colors[i*3+1]=c[1];colors[i*3+2]=c[2];
  }
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3));
  const mat = new THREE.PointsMaterial({size:0.15,vertexColors:true,transparent:true,opacity:0.6,blending:THREE.AdditiveBlending});
  const particles = new THREE.Points(geo,mat);
  scene.add(particles);

  // Spinning coin rings
  const rings = [];
  for(let r=0;r<3;r++){
    const ringGeo = new THREE.TorusGeometry(8+r*5,0.08,8,60);
    const ringMat = new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(0.95-r*0.1,1,0.5),transparent:true,opacity:0.3});
    const ring = new THREE.Mesh(ringGeo,ringMat);
    ring.rotation.x = Math.PI/2 + r*0.3;
    scene.add(ring);
    rings.push(ring);
  }

  let time = 0;
  function animate(){
    requestAnimationFrame(animate);
    time += 0.005;
    particles.rotation.y = time*0.15;
    particles.rotation.x = Math.sin(time)*0.1;
    rings.forEach((r,i)=>{
      r.rotation.z = time*(0.3+i*0.15);
      r.rotation.x = Math.PI/2 + Math.sin(time+i)*0.2;
    });
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });

  // Slot machine logic
  const emojis = ['🎨','💻','🚀','⭐','🔥','💎','🎯','🏆','✨','🌟'];
  const sections = ['about','skills','projects','experience','contact'];
  const reels = [document.getElementById('reel1'),document.getElementById('reel2'),document.getElementById('reel3')];

  document.getElementById('pull-lever').addEventListener('click',function(){
    this.disabled = true;
    // Spin animation
    reels.forEach((reel,i)=>{
      const inner = reel.querySelector('.reel-inner');
      let spins = 0;
      const maxSpins = 10 + i*5;
      const interval = setInterval(()=>{
        inner.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        inner.style.transform = 'scale(0.8) rotate('+(spins*30)+'deg)';
        spins++;
        if(spins>=maxSpins){
          clearInterval(interval);
          inner.style.transform = 'scale(1.2) rotate(0deg)';
          setTimeout(()=>inner.style.transform='scale(1)',200);
          if(i===2){
            document.getElementById('pull-lever').disabled=false;
            spawnCoins();
            // Random section
            const sec = sections[Math.floor(Math.random()*sections.length)];
            showSection(sec);
          }
        }
      },60);
    });
  });

  function spawnCoins(){
    for(let i=0;i<12;i++){
      const coin=document.createElement('div');
      coin.className='coin-particle';
      coin.textContent='🪙';
      coin.style.left=Math.random()*window.innerWidth+'px';
      coin.style.top=Math.random()*200+'px';
      coin.style.animationDelay=Math.random()*0.5+'s';
      document.body.appendChild(coin);
      setTimeout(()=>coin.remove(),2000);
    }
  }

  // Nav
  function showSection(id){
    document.querySelectorAll('.panel-section').forEach(s=>s.classList.remove('active'));
    document.querySelectorAll('.nav-chip').forEach(c=>c.classList.remove('active'));
    document.getElementById('sec-'+id).classList.add('active');
    document.querySelector('.nav-chip[data-section="'+id+'"]').classList.add('active');
  }

  document.querySelectorAll('.nav-chip').forEach(chip=>{
    chip.addEventListener('click',()=>showSection(chip.dataset.section));
  });

  // Loader
  setTimeout(()=>document.getElementById('loader').classList.add('gone'),1500);
})();
<\/script>
</body></html>`;
  }
};
