/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: SOLAR SYSTEM
   File: templates/portfolio/tpl-solar-system.js
   Style: 3D Orrery · Planets · Space · Three.js
================================================================ */

window.TPL_SOLAR_SYSTEM = {
  id: 'solar-system',
  name: 'Solar System',
  category: 'Space 3D',
  theme: 'cosmic-orrery',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#000010,#000824,#001040);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(255,200,50,0.1),transparent 50%)"></div>
        <div style="font-size:48px;margin-bottom:12px">🪐</div>
        <div style="font-size:18px;font-weight:900;color:#ffaa33;text-shadow:0 0 20px rgba(255,170,50,0.4)">Solar System</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">ORBIT · DISCOVER · EXPLORE</div>
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

    const planetSections = [
      { name:'About', emoji:'☀️', color:'#ffaa33' },
      { name:'Skills', emoji:'🌍', color:'#4488ff' },
      { name:'Projects', emoji:'🪐', color:'#cc8833' },
      { name:'Experience', emoji:'🌙', color:'#aaaacc' },
      { name:'Contact', emoji:'⭐', color:'#ffdd44' }
    ];

    const projHTML = projects.length
      ? projects.map(p=>`<div class="orbit-card"><strong>${p.emoji||'🚀'} ${p.name}</strong><p>${p.description||''}</p><div class="orbit-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')
      : '<div class="orbit-card"><strong>🚀 Your Project</strong><p>Add projects here.</p></div>';

    const expHTML = experience.length
      ? experience.map(e=>`<div class="orbit-exp"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('')
      : '<div class="orbit-exp"><strong>Your Role</strong> · Company</div>';

    const sectionContents = [
      `<div class="planet-text">${about}</div>`,
      `<div class="planet-skills">${skillNames.map(s=>`<span class="star-skill">${s}</span>`).join('')}</div>`,
      projHTML,
      expHTML,
      `<div class="planet-contacts"><a href="mailto:${email}">📧 ${email}</a><a href="${github||'#'}" target="_blank">🐙 ${githubH}</a><a href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a><span>📍 ${location}</span></div>`
    ];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Solar System Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#000010;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden;min-height:100vh}
#canvas-bg{position:fixed;inset:0;z-index:0}

#ui{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;padding:60px 20px;min-height:100vh}
.sun-hero{text-align:center;margin-bottom:50px}
.sun-hero h1{font-size:clamp(36px,6vw,64px);font-weight:900;color:#ffaa33;text-shadow:0 0 50px rgba(255,170,50,0.4)}
.sun-hero .sub{font-size:14px;color:rgba(255,255,255,0.4);margin-top:8px;letter-spacing:0.2em;text-transform:uppercase}
.sun-hero .bio{max-width:450px;margin:16px auto;color:rgba(255,255,255,0.35);font-size:14px;line-height:1.8}

.orbit-nav{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:40px}
.planet-btn{padding:10px 20px;border-radius:30px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);color:rgba(255,255,255,0.6);font-size:13px;font-weight:700;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;gap:8px}
.planet-btn:hover,.planet-btn.active{background:rgba(255,170,50,0.1);border-color:rgba(255,170,50,0.3);color:#ffaa33}

#planet-panel{max-width:600px;width:100%;min-height:200px}
.planet-section{display:none;animation:orbitIn 0.5s ease}
.planet-section.active{display:block}
@keyframes orbitIn{from{opacity:0;transform:scale(0.9) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}

.planet-text{background:rgba(255,170,50,0.04);border:1px solid rgba(255,170,50,0.1);border-radius:20px;padding:30px;font-size:15px;line-height:2;color:rgba(255,255,255,0.7)}
.planet-skills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.star-skill{padding:8px 18px;border-radius:20px;background:rgba(68,136,255,0.1);border:1px solid rgba(68,136,255,0.2);color:#6699ff;font-size:13px;font-weight:700}
.orbit-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;margin-bottom:12px}
.orbit-card strong{color:#ffaa33;font-size:15px}
.orbit-card p{color:rgba(255,255,255,0.55);font-size:13px;margin-top:6px;line-height:1.6}
.orbit-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.orbit-tags span{padding:3px 10px;border-radius:10px;font-size:11px;background:rgba(255,170,50,0.08);border:1px solid rgba(255,170,50,0.15);color:#ffaa33;font-weight:700}
.orbit-exp{background:rgba(255,255,255,0.04);border-left:3px solid #aaaacc;border-radius:0 14px 14px 0;padding:16px 20px;margin-bottom:12px}
.orbit-exp strong{color:#fff;font-size:14px}
.orbit-exp small{color:rgba(255,255,255,0.4)}
.orbit-exp p{color:rgba(255,255,255,0.55);font-size:13px;margin-top:6px}
.planet-contacts{display:flex;flex-direction:column;gap:10px}
.planet-contacts a,.planet-contacts span{display:block;padding:12px 18px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#ffdd44;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.2s}
.planet-contacts a:hover{background:rgba(255,170,50,0.08);transform:translateX(5px)}

#loader{position:fixed;inset:0;background:#000010;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
@keyframes orbitSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
</style>
</head><body>
<div id="loader"><div style="font-size:56px;animation:orbitSpin 3s linear infinite">🪐</div><div style="margin-top:16px;font-size:12px;font-weight:800;color:#ffaa33;letter-spacing:0.3em">LAUNCHING...</div></div>
<div id="canvas-bg"></div>
<div id="ui">
  <div class="sun-hero">
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <div class="bio">${bio}</div>
  </div>

  <div class="orbit-nav">
    ${planetSections.map((p,i)=>`<button class="planet-btn ${i===0?'active':''}" data-idx="${i}">${p.emoji} ${p.name}</button>`).join('')}
  </div>

  <div id="planet-panel">
    ${sectionContents.map((c,i)=>`<div class="planet-section ${i===0?'active':''}" data-idx="${i}">${c}</div>`).join('')}
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.set(0,15,25);
  camera.lookAt(0,0,0);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Sun
  const sunGeo = new THREE.SphereGeometry(2,32,32);
  const sunMat = new THREE.MeshBasicMaterial({color:0xffaa33,transparent:true,opacity:0.6});
  const sun = new THREE.Mesh(sunGeo,sunMat);
  scene.add(sun);
  // Sun glow
  const glowGeo = new THREE.SphereGeometry(2.5,32,32);
  const glowMat = new THREE.MeshBasicMaterial({color:0xffaa33,transparent:true,opacity:0.1});
  scene.add(new THREE.Mesh(glowGeo,glowMat));

  // Planets
  const planets = [];
  const pData = [
    {r:5,size:0.5,color:0x4488ff,speed:0.8},
    {r:8,size:0.7,color:0xcc8833,speed:0.5},
    {r:11,size:0.4,color:0xaaaacc,speed:0.3},
    {r:14,size:0.6,color:0xff6644,speed:0.2},
    {r:17,size:0.8,color:0xffdd44,speed:0.15}
  ];
  pData.forEach(p=>{
    // Orbit ring
    const orbitGeo = new THREE.RingGeometry(p.r-0.02,p.r+0.02,80);
    const orbitMat = new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.06,side:THREE.DoubleSide});
    const orbit = new THREE.Mesh(orbitGeo,orbitMat);
    orbit.rotation.x=-Math.PI/2;
    scene.add(orbit);

    const geo = new THREE.SphereGeometry(p.size,20,20);
    const mat = new THREE.MeshBasicMaterial({color:p.color,transparent:true,opacity:0.7});
    const mesh = new THREE.Mesh(geo,mat);
    scene.add(mesh);
    planets.push({mesh,radius:p.r,speed:p.speed,angle:Math.random()*Math.PI*2});
  });

  // Stars
  const sCount = 600;
  const sGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array(sCount*3);
  for(let i=0;i<sCount;i++){
    sPos[i*3]=(Math.random()-0.5)*100;
    sPos[i*3+1]=(Math.random()-0.5)*60;
    sPos[i*3+2]=(Math.random()-0.5)*100;
  }
  sGeo.setAttribute('position',new THREE.BufferAttribute(sPos,3));
  scene.add(new THREE.Points(sGeo,new THREE.PointsMaterial({size:0.1,color:0xffffff,transparent:true,opacity:0.5})));

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.005;
    sun.rotation.y+=0.002;
    planets.forEach(p=>{
      p.angle+=p.speed*0.005;
      p.mesh.position.x=Math.cos(p.angle)*p.radius;
      p.mesh.position.z=Math.sin(p.angle)*p.radius;
      p.mesh.position.y=Math.sin(p.angle*2)*0.3;
    });
    renderer.render(scene,camera);
  }
  animate();

  // Nav
  document.querySelectorAll('.planet-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const idx=btn.dataset.idx;
      document.querySelectorAll('.planet-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.planet-section').forEach(s=>s.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector('.planet-section[data-idx="'+idx+'"]').classList.add('active');
    });
  });

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
