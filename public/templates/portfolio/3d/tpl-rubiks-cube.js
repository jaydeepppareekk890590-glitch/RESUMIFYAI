/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: RUBIK'S CUBE
   File: templates/portfolio/tpl-rubiks-cube.js
   Style: 3D Rubik's Cube · Puzzle · Interactive · Three.js
================================================================ */

window.TPL_RUBIKS_CUBE = {
  id: 'rubiks-cube',
  name: "Rubik's Cube",
  category: 'Puzzle 3D',
  theme: 'colorful-puzzle',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#111,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:12px">🧊</div>
        <div style="font-size:18px;font-weight:900;color:#ff6633;text-shadow:0 0 15px rgba(255,100,50,0.4)">Rubik's Cube</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">DRAG · TWIST · SOLVE</div>
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

    const sections = [
      { id:'about', icon:'🧩', title:'About', content:`<div class="card-content">${about}</div>` },
      { id:'skills', icon:'⚡', title:'Skills', content:`<div class="skill-grid">${skillNames.map(s=>`<span class="cube-skill">${s}</span>`).join('')}</div>` },
      { id:'projects', icon:'🚀', title:'Projects', content: projects.length ? projects.map(p=>`<div class="cube-proj"><strong>${p.emoji||'🚀'} ${p.name}</strong><p>${p.description||''}</p><div class="cube-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('') : '<div class="cube-proj"><strong>🚀 Your Project</strong><p>Add projects here.</p></div>' },
      { id:'experience', icon:'💼', title:'Experience', content: experience.length ? experience.map(e=>`<div class="cube-exp"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('') : '<div class="cube-exp"><strong>Your Role</strong> · Company</div>' },
      { id:'contact', icon:'📬', title:'Contact', content:`<div class="cube-contacts"><a href="mailto:${email}">📧 ${email}</a><a href="${github||'#'}" target="_blank">🐙 ${githubH}</a><a href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a><span>📍 ${location}</span></div>` }
    ];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Rubik's Cube Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d1a;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden;min-height:100vh}
#canvas-bg{position:fixed;inset:0;z-index:0}

#ui{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;padding:60px 20px;min-height:100vh}
.hero-block{text-align:center;margin-bottom:50px}
.hero-block h1{font-size:clamp(32px,6vw,60px);font-weight:900;color:#fff}
.hero-block .role{font-size:16px;color:rgba(255,255,255,0.5);margin-top:8px;letter-spacing:0.15em;text-transform:uppercase}
.hero-block .bio{max-width:450px;margin:16px auto 0;color:rgba(255,255,255,0.4);font-size:14px;line-height:1.8}

.face-nav{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:40px}
.face-btn{padding:12px 24px;border-radius:14px;border:2px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.7);font-size:14px;font-weight:700;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:8px}
.face-btn:hover,.face-btn.active{border-color:#ff6633;color:#ff6633;background:rgba(255,100,50,0.1);box-shadow:0 0 20px rgba(255,100,50,0.15)}
.face-btn .face-icon{font-size:18px}

#face-panel{max-width:650px;width:100%;min-height:250px;animation:cubeFlip 0.4s ease}
@keyframes cubeFlip{from{opacity:0;transform:perspective(600px) rotateY(15deg)}to{opacity:1;transform:perspective(600px) rotateY(0)}}
.face-content{display:none}
.face-content.active{display:block;animation:cubeFlip 0.4s ease}

.card-content{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:30px;font-size:15px;line-height:2;color:rgba(255,255,255,0.7)}
.skill-grid{display:flex;flex-wrap:wrap;gap:10px}
.cube-skill{padding:8px 18px;border-radius:12px;background:rgba(255,100,50,0.1);border:1px solid rgba(255,100,50,0.2);color:#ff8855;font-size:13px;font-weight:700}
.cube-proj{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;margin-bottom:14px}
.cube-proj strong{font-size:16px;color:#fff}
.cube-proj p{font-size:13px;color:rgba(255,255,255,0.55);margin-top:6px;line-height:1.6}
.cube-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.cube-tags span{padding:3px 10px;border-radius:10px;font-size:11px;background:rgba(255,100,50,0.08);border:1px solid rgba(255,100,50,0.15);color:#ff8855;font-weight:700}
.cube-exp{background:rgba(255,255,255,0.04);border-left:3px solid #ff6633;border-radius:0 14px 14px 0;padding:16px 20px;margin-bottom:12px}
.cube-exp strong{color:#fff;font-size:14px}
.cube-exp small{color:rgba(255,255,255,0.4);font-weight:600}
.cube-exp p{font-size:13px;color:rgba(255,255,255,0.55);margin-top:6px;line-height:1.6}
.cube-contacts{display:flex;flex-direction:column;gap:12px}
.cube-contacts a,.cube-contacts span{display:flex;align-items:center;gap:12px;padding:14px 20px;border-radius:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#fff;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.2s}
.cube-contacts a:hover{background:rgba(255,100,50,0.08);border-color:rgba(255,100,50,0.2);transform:translateX(5px)}

#loader{position:fixed;inset:0;background:#0d0d1a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
</style>
</head><body>
<div id="loader"><div style="font-size:56px;animation:spin3d 1.2s linear infinite">🧊</div><div style="margin-top:16px;font-size:12px;font-weight:800;color:#ff6633;letter-spacing:0.3em">SOLVING...</div></div>
<div id="canvas-bg"></div>
<div id="ui">
  <div class="hero-block">
    <h1>${name}</h1>
    <div class="role">${role}</div>
    <div class="bio">${bio}</div>
  </div>

  <div class="face-nav">
    ${sections.map((s,i)=>`<button class="face-btn ${i===0?'active':''}" data-face="${s.id}"><span class="face-icon">${s.icon}</span>${s.title}</button>`).join('')}
  </div>

  <div id="face-panel">
    ${sections.map((s,i)=>`<div class="face-content ${i===0?'active':''}" id="face-${s.id}">${s.content}</div>`).join('')}
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.set(8,6,8);
  camera.lookAt(0,0,0);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Rubik's cube
  const cubeGroup = new THREE.Group();
  const colors = [0xff3300,0xff8800,0x0066ff,0x00cc44,0xffcc00,0xffffff];
  const gap = 1.1;
  for(let x=-1;x<=1;x++){
    for(let y=-1;y<=1;y++){
      for(let z=-1;z<=1;z++){
        const geo = new THREE.BoxGeometry(0.95,0.95,0.95);
        const mats = colors.map(c=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0.85}));
        const cube = new THREE.Mesh(geo,mats);
        cube.position.set(x*gap,y*gap,z*gap);
        cubeGroup.add(cube);
      }
    }
  }
  scene.add(cubeGroup);

  // Ambient particles
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(300*3);
  for(let i=0;i<300;i++){
    pPos[i*3]=(Math.random()-0.5)*30;
    pPos[i*3+1]=(Math.random()-0.5)*30;
    pPos[i*3+2]=(Math.random()-0.5)*30;
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  scene.add(new THREE.Points(pGeo,new THREE.PointsMaterial({size:0.08,color:0xff6633,transparent:true,opacity:0.3,blending:THREE.AdditiveBlending})));

  let t=0,mouseX=0,mouseY=0;
  document.addEventListener('mousemove',e=>{
    mouseX=(e.clientX/window.innerWidth-0.5)*2;
    mouseY=(e.clientY/window.innerHeight-0.5)*2;
  });

  function animate(){
    requestAnimationFrame(animate);
    t+=0.005;
    cubeGroup.rotation.y=t*0.3+mouseX*0.3;
    cubeGroup.rotation.x=Math.sin(t*0.5)*0.2+mouseY*0.2;
    renderer.render(scene,camera);
  }
  animate();

  // Face nav
  document.querySelectorAll('.face-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.face-btn').forEach(b=>b.classList.remove('active'));
      document.querySelectorAll('.face-content').forEach(f=>f.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('face-'+btn.dataset.face).classList.add('active');
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
