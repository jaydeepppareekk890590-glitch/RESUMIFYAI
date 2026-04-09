/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: VENDING MACHINE
   File: templates/portfolio/tpl-vending-machine.js
   Style: 3D Vending Machine · Retro-Futuristic · Glow · Three.js
================================================================ */

window.TPL_VENDING_MACHINE = {
  id: 'vending-machine',
  name: 'Vending Machine',
  category: 'Interactive 3D',
  theme: 'retro-futuristic',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#0d0020,#1a0040,#0a0030);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:12px">📱</div>
        <div style="font-size:18px;font-weight:900;color:#00ddff;text-shadow:0 0 15px rgba(0,220,255,0.4)">Vending Machine</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">SELECT · DROP · COLLECT</div>
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

    const slots = [
      { code:'A1', emoji:'👤', label:'About', content:`<div class="vend-text">${about}</div>` },
      { code:'A2', emoji:'⚡', label:'Skills', content:`<div class="vend-skills">${skillNames.map(s=>`<span class="vend-chip">${s}</span>`).join('')}</div>` },
      { code:'B1', emoji:'🚀', label:'Projects', content: projects.length ? projects.map(p=>`<div class="vend-proj"><strong>${p.emoji||'📦'} ${p.name}</strong><p>${p.description||''}</p><div class="vend-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('') : '<div class="vend-proj"><strong>📦 Your Project</strong><p>Add projects here.</p></div>' },
      { code:'B2', emoji:'💼', label:'Experience', content: experience.length ? experience.map(e=>`<div class="vend-exp"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('') : '<div class="vend-exp"><strong>Your Role</strong> · Company</div>' },
      { code:'C1', emoji:'📬', label:'Contact', content:`<div class="vend-contacts"><a href="mailto:${email}">📧 ${email}</a><a href="${github||'#'}" target="_blank">🐙 ${githubH}</a><a href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a><span>📍 ${location}</span></div>` }
    ];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Vending Machine Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0020;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}
#canvas-bg{position:fixed;inset:0;z-index:0}

#machine{position:relative;z-index:10;width:min(90vw,500px);margin:40px auto;padding:30px 20px}
.machine-header{text-align:center;margin-bottom:30px}
.machine-header h1{font-size:clamp(28px,5vw,48px);font-weight:900;color:#00ddff;text-shadow:0 0 30px rgba(0,220,255,0.3)}
.machine-header .sub{font-size:13px;color:rgba(255,255,255,0.4);margin-top:6px;letter-spacing:0.2em;text-transform:uppercase}
.machine-header .bio{max-width:400px;margin:12px auto;color:rgba(255,255,255,0.35);font-size:13px;line-height:1.7}

.machine-body{background:linear-gradient(180deg,rgba(0,20,40,0.8),rgba(0,10,30,0.9));border:2px solid rgba(0,220,255,0.2);border-radius:20px;padding:24px;box-shadow:0 0 40px rgba(0,220,255,0.1),inset 0 0 30px rgba(0,0,0,0.3)}
.machine-label{text-align:center;font-size:11px;color:rgba(0,220,255,0.5);letter-spacing:0.2em;margin-bottom:16px;font-weight:700}

.slot-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin-bottom:20px}
.slot-item{background:rgba(0,220,255,0.04);border:1px solid rgba(0,220,255,0.15);border-radius:14px;padding:16px;text-align:center;cursor:pointer;transition:all 0.3s}
.slot-item:hover{background:rgba(0,220,255,0.1);border-color:rgba(0,220,255,0.3);transform:scale(1.03);box-shadow:0 0 20px rgba(0,220,255,0.15)}
.slot-item.active{background:rgba(0,220,255,0.12);border-color:#00ddff;box-shadow:0 0 25px rgba(0,220,255,0.2)}
.slot-code{font-size:11px;font-weight:800;color:rgba(0,220,255,0.5);letter-spacing:0.15em}
.slot-emoji{font-size:30px;margin:8px 0}
.slot-label{font-size:12px;font-weight:700;color:rgba(255,255,255,0.6)}

.dispenser{min-height:200px;background:rgba(0,0,0,0.3);border:1px solid rgba(0,220,255,0.1);border-radius:14px;padding:24px;position:relative;overflow:hidden}
.dispenser::before{content:'DISPENSED';position:absolute;top:8px;right:12px;font-size:9px;color:rgba(0,220,255,0.3);letter-spacing:0.2em;font-weight:800}
.dispensed-content{animation:dropIn 0.5s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes dropIn{from{opacity:0;transform:translateY(-40px)}to{opacity:1;transform:translateY(0)}}

.vend-text{font-size:14px;line-height:2;color:rgba(255,255,255,0.7)}
.vend-skills{display:flex;flex-wrap:wrap;gap:8px}
.vend-chip{padding:6px 16px;border-radius:20px;background:rgba(0,220,255,0.08);border:1px solid rgba(0,220,255,0.2);color:#00ddff;font-size:12px;font-weight:700}
.vend-proj{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px;margin-bottom:10px}
.vend-proj strong{color:#00ddff;font-size:14px}
.vend-proj p{color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px}
.vend-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.vend-tags span{padding:3px 8px;border-radius:8px;font-size:10px;background:rgba(0,220,255,0.06);border:1px solid rgba(0,220,255,0.12);color:#66eeff;font-weight:700}
.vend-exp{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.05)}
.vend-exp strong{color:#00ddff;font-size:13px}
.vend-exp small{color:rgba(255,255,255,0.35)}
.vend-exp p{color:rgba(255,255,255,0.5);font-size:12px;margin-top:4px}
.vend-contacts{display:flex;flex-direction:column;gap:8px}
.vend-contacts a,.vend-contacts span{color:#00ddff;text-decoration:none;font-size:13px;padding:8px 0;border-bottom:1px solid rgba(0,220,255,0.1);transition:all 0.2s}
.vend-contacts a:hover{padding-left:8px;text-shadow:0 0 8px rgba(0,220,255,0.4)}

#loader{position:fixed;inset:0;background:#0d0020;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
</style>
</head><body>
<div id="loader"><div style="font-size:56px">📱</div><div style="margin-top:16px;font-size:12px;font-weight:800;color:#00ddff;letter-spacing:0.3em">STOCKING...</div></div>
<div id="canvas-bg"></div>

<div id="machine">
  <div class="machine-header">
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <div class="bio">${bio}</div>
  </div>

  <div class="machine-body">
    <div class="machine-label">✦ SELECT AN ITEM ✦</div>
    <div class="slot-grid">
      ${slots.map((s,i)=>`<div class="slot-item ${i===0?'active':''}" data-idx="${i}"><div class="slot-code">${s.code}</div><div class="slot-emoji">${s.emoji}</div><div class="slot-label">${s.label}</div></div>`).join('')}
    </div>
    <div class="dispenser">
      <div class="dispensed-content" id="dispensed">${slots[0].content}</div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const slots = ${JSON.stringify(slots)};

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Floating cubes (products)
  const cubes = [];
  for(let i=0;i<20;i++){
    const size = 0.3+Math.random()*0.5;
    const geo = new THREE.BoxGeometry(size,size,size);
    const hue = Math.random();
    const mat = new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(hue,0.8,0.5),transparent:true,opacity:0.2,wireframe:true});
    const cube = new THREE.Mesh(geo,mat);
    cube.position.set((Math.random()-0.5)*25,(Math.random()-0.5)*25,(Math.random()-0.5)*15);
    cube.userData={rx:Math.random()*0.02,ry:Math.random()*0.02,vy:0.003+Math.random()*0.005};
    scene.add(cube);
    cubes.push(cube);
  }

  // Grid
  const gridGeo = new THREE.PlaneGeometry(30,30,20,20);
  const gridMat = new THREE.MeshBasicMaterial({color:0x00ddff,wireframe:true,transparent:true,opacity:0.03});
  const grid = new THREE.Mesh(gridGeo,gridMat);
  grid.position.z=-5;
  scene.add(grid);

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.005;
    cubes.forEach(c=>{
      c.rotation.x+=c.userData.rx;
      c.rotation.y+=c.userData.ry;
      c.position.y+=Math.sin(t+c.position.x)*0.005;
    });
    renderer.render(scene,camera);
  }
  animate();

  // Slot selection
  document.querySelectorAll('.slot-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const idx=parseInt(item.dataset.idx);
      document.querySelectorAll('.slot-item').forEach(s=>s.classList.remove('active'));
      item.classList.add('active');
      const disp=document.getElementById('dispensed');
      disp.style.animation='none';
      disp.offsetHeight;
      disp.style.animation='dropIn 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      disp.innerHTML=slots[idx].content;
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
