/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: CLOCKWORK
   File: templates/portfolio/tpl-clockwork.js
   Style: 3D Steampunk Gears · Clockwork · Bronze · Three.js
================================================================ */

window.TPL_CLOCKWORK = {
  id: 'clockwork',
  name: 'Clockwork',
  category: 'Steampunk 3D',
  theme: 'steampunk-bronze',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#1a0f00,#2a1800,#3d2400);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:12px">⚙️</div>
        <div style="font-size:18px;font-weight:900;color:#cc8833">Clockwork</div>
        <div style="font-size:11px;color:rgba(204,136,51,0.5);margin-top:6px;letter-spacing:0.15em">GEARS · COGS · PRECISION</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Developer & Designer';
    const bio = data.bio || 'A passionate developer crafting beautiful web experiences.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'you@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];

    const githubH = github.replace(/^https?:\/\//, '') || 'github.com/you';
    const linkedinH = linkedin.replace(/^https?:\/\//, '') || 'linkedin.com/in/you';
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['JavaScript','React','Node.js','CSS'];

    const projHTML = projects.length
      ? projects.map(p=>`<div class="gear-card"><div class="gear-icon">${p.emoji||'⚙️'}</div><div class="gear-name">${p.name}</div><div class="gear-desc">${p.description||''}</div><div class="gear-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')
      : '<div class="gear-card"><div class="gear-icon">⚙️</div><div class="gear-name">Your Project</div><div class="gear-desc">Add projects here.</div></div>';

    const expHTML = experience.length
      ? experience.map(e=>`<div class="cog-card"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('')
      : '<div class="cog-card"><strong>Your Role</strong> · Company</div>';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Clockwork Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Fira+Code:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f0800;color:#e8c88a;font-family:'Fira Code',monospace;overflow-x:hidden}
#canvas-bg{position:fixed;inset:0;z-index:0}
#content{position:relative;z-index:10}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px}
.hero h1{font-size:clamp(36px,7vw,68px);font-family:'Playfair Display',serif;font-weight:900;color:#cc8833;text-shadow:0 0 40px rgba(204,136,51,0.3)}
.hero .sub{font-size:14px;color:rgba(232,200,138,0.5);margin-top:10px;letter-spacing:0.2em;text-transform:uppercase}
.hero .bio{max-width:480px;margin:20px auto;color:rgba(232,200,138,0.5);line-height:1.9;font-size:14px}
.scroll-hint{font-size:12px;color:rgba(204,136,51,0.4);letter-spacing:0.2em;margin-top:30px;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}

section{min-height:80vh;padding:80px 20px;display:flex;flex-direction:column;align-items:center}
.sec-title{font-size:28px;font-family:'Playfair Display',serif;font-weight:900;color:#cc8833;margin-bottom:8px;text-shadow:0 0 20px rgba(204,136,51,0.2)}
.sec-sub{font-size:11px;color:rgba(204,136,51,0.4);letter-spacing:0.2em;margin-bottom:30px}

.steam-about{max-width:580px;background:rgba(204,136,51,0.04);border:1px solid rgba(204,136,51,0.15);border-radius:4px;padding:30px;font-size:14px;line-height:2;color:rgba(232,200,138,0.7);position:relative}
.steam-about::before{content:'';position:absolute;top:-1px;left:20px;right:20px;height:2px;background:linear-gradient(90deg,transparent,#cc8833,transparent)}

.cog-skills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:500px}
.cog-skill{padding:8px 18px;border:1px solid rgba(204,136,51,0.2);color:#cc8833;font-size:13px;font-weight:700;transition:all 0.3s;cursor:default;position:relative}
.cog-skill:hover{background:rgba(204,136,51,0.1);box-shadow:0 0 15px rgba(204,136,51,0.2)}

.gear-card{background:rgba(204,136,51,0.04);border:1px solid rgba(204,136,51,0.12);border-radius:4px;padding:22px;margin-bottom:14px;max-width:520px;width:100%}
.gear-icon{font-size:26px;margin-bottom:8px}
.gear-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#cc8833}
.gear-desc{font-size:12px;color:rgba(232,200,138,0.55);margin-top:6px;line-height:1.7}
.gear-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.gear-tags span{padding:3px 10px;font-size:11px;border:1px solid rgba(204,136,51,0.2);color:#cc8833;font-weight:700}

.cog-card{background:rgba(204,136,51,0.04);border-left:3px solid #cc8833;padding:18px 22px;margin-bottom:12px;max-width:520px;width:100%}
.cog-card strong{color:#cc8833;font-size:14px}
.cog-card small{color:rgba(232,200,138,0.4)}
.cog-card p{color:rgba(232,200,138,0.55);font-size:12px;margin-top:6px;line-height:1.6}

.steam-contacts{display:flex;flex-direction:column;gap:10px;max-width:400px;width:100%}
.steam-link{display:flex;align-items:center;gap:14px;padding:14px 20px;border:1px solid rgba(204,136,51,0.12);background:rgba(204,136,51,0.03);color:#e8c88a;text-decoration:none;font-weight:600;font-size:13px;transition:all 0.2s}
.steam-link:hover{background:rgba(204,136,51,0.08);border-color:rgba(204,136,51,0.25);transform:translateX(5px)}

#loader{position:fixed;inset:0;background:#0f0800;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
</style>
</head><body>
<div id="loader"><div style="font-size:56px;animation:spin 2s linear infinite">⚙️</div><div style="margin-top:16px;font-size:12px;font-weight:700;color:#cc8833;letter-spacing:0.3em">WINDING UP...</div></div>
<div id="canvas-bg"></div>
<div id="content">
  <div class="hero">
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <div class="bio">${bio}</div>
    <div class="scroll-hint">↓ SCROLL TO TURN THE GEARS ↓</div>
  </div>
  <section><div class="sec-title">⚙️ About</div><div class="sec-sub">THE MECHANISM</div><div class="steam-about">${about}</div></section>
  <section><div class="sec-title">🔧 Skills</div><div class="sec-sub">PRECISION TOOLS</div><div class="cog-skills">${skillNames.map(s=>`<div class="cog-skill">${s}</div>`).join('')}</div></section>
  <section><div class="sec-title">⚙️ Projects</div><div class="sec-sub">ENGINEERED WORKS</div>${projHTML}</section>
  <section><div class="sec-title">🕰 Experience</div><div class="sec-sub">HOURS LOGGED</div>${expHTML}</section>
  <section>
    <div class="sec-title">📮 Contact</div><div class="sec-sub">SEND A TELEGRAM</div>
    <div class="steam-contacts">
      <a class="steam-link" href="mailto:${email}">📧 ${email}</a>
      <a class="steam-link" href="${github||'#'}" target="_blank">🐙 ${githubH}</a>
      <a class="steam-link" href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a>
      <div class="steam-link">📍 ${location}</div>
    </div>
  </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.set(0,0,18);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Gears
  const gears = [];
  function createGear(radius,teeth,thickness,x,y,speed){
    const shape = new THREE.Shape();
    const inner = radius*0.7;
    const toothH = radius*0.15;
    for(let i=0;i<teeth;i++){
      const a1 = (i/teeth)*Math.PI*2;
      const a2 = ((i+0.3)/teeth)*Math.PI*2;
      const a3 = ((i+0.5)/teeth)*Math.PI*2;
      const a4 = ((i+0.8)/teeth)*Math.PI*2;
      if(i===0)shape.moveTo(Math.cos(a1)*radius,Math.sin(a1)*radius);
      shape.lineTo(Math.cos(a2)*(radius+toothH),Math.sin(a2)*(radius+toothH));
      shape.lineTo(Math.cos(a3)*(radius+toothH),Math.sin(a3)*(radius+toothH));
      shape.lineTo(Math.cos(a4)*radius,Math.sin(a4)*radius);
    }
    const extGeo = new THREE.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:false});
    const mat = new THREE.MeshBasicMaterial({color:0xcc8833,transparent:true,opacity:0.2,wireframe:true});
    const mesh = new THREE.Mesh(extGeo,mat);
    mesh.position.set(x,y,-2);
    scene.add(mesh);
    gears.push({mesh,speed});
  }
  createGear(4,20,0.5,-6,3,0.3);
  createGear(3,15,0.5,0,-2,-0.4);
  createGear(5,25,0.5,7,1,0.2);
  createGear(2.5,12,0.5,-3,-5,-0.5);
  createGear(3.5,18,0.5,5,-4,0.35);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(300*3);
  for(let i=0;i<300;i++){
    pPos[i*3]=(Math.random()-0.5)*40;
    pPos[i*3+1]=(Math.random()-0.5)*40;
    pPos[i*3+2]=(Math.random()-0.5)*20-5;
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  scene.add(new THREE.Points(pGeo,new THREE.PointsMaterial({size:0.08,color:0xcc8833,transparent:true,opacity:0.25,blending:THREE.AdditiveBlending})));

  let scrollY=0,t=0;
  window.addEventListener('scroll',()=>scrollY=window.scrollY);

  function animate(){
    requestAnimationFrame(animate);
    t+=0.01;
    gears.forEach(g=>{
      g.mesh.rotation.z=t*g.speed+scrollY*0.001*g.speed;
    });
    camera.position.y=-scrollY*0.003;
    renderer.render(scene,camera);
  }
  animate();

  window.addEventListener('resize',()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });
  setTimeout(()=>document.getElementById('loader').classList.add('gone'),1200);
})();
<\/script>
</body></html>`;
  }
};
