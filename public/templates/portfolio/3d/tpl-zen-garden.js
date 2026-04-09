/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: ZEN GARDEN
   File: templates/portfolio/tpl-zen-garden.js
   Style: 3D Zen Sand Garden · Calm · Minimalist · Three.js
================================================================ */

window.TPL_ZEN_GARDEN = {
  id: 'zen-garden',
  name: 'Zen Garden',
  category: 'Calm 3D',
  theme: 'zen-minimal',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#f5e6d3,#e8d5b7,#dcc9a3);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:12px">🌸</div>
        <div style="font-size:18px;font-weight:700;color:#5a4a3a">Zen Garden</div>
        <div style="font-size:11px;color:rgba(90,74,58,0.6);margin-top:6px;letter-spacing:0.15em">BREATHE · EXPLORE · FIND PEACE</div>
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
      ? projects.map(p=>`<div class="stone-card"><div class="stone-icon">${p.emoji||'🪨'}</div><div class="stone-name">${p.name}</div><div class="stone-desc">${p.description||''}</div><div class="stone-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')
      : '<div class="stone-card"><div class="stone-icon">🪨</div><div class="stone-name">Your Project</div><div class="stone-desc">Add projects here.</div></div>';

    const expHTML = experience.length
      ? experience.map(e=>`<div class="bamboo-card"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('')
      : '<div class="bamboo-card"><strong>Your Role</strong> · Company</div>';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Zen Garden Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5e6d3;color:#3a2e22;font-family:'Inter',sans-serif;overflow-x:hidden}
#canvas-bg{position:fixed;inset:0;z-index:0}
#content{position:relative;z-index:10}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px}
.hero h1{font-size:clamp(36px,7vw,68px);font-family:'Playfair Display',serif;font-weight:900;color:#3a2e22}
.hero .sub{font-size:14px;color:rgba(58,46,34,0.5);margin-top:10px;letter-spacing:0.25em;text-transform:uppercase;font-weight:700}
.hero .zen-bio{max-width:450px;margin:24px auto 0;color:rgba(58,46,34,0.6);line-height:2;font-size:15px}
.zen-hint{margin-top:40px;font-size:12px;color:rgba(58,46,34,0.35);letter-spacing:0.2em}

section{min-height:70vh;padding:80px 20px;display:flex;flex-direction:column;align-items:center}
.zen-title{font-size:28px;font-family:'Playfair Display',serif;font-weight:900;color:#3a2e22;margin-bottom:10px;text-align:center}
.zen-subtitle{font-size:11px;color:rgba(58,46,34,0.4);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:30px}

.zen-about{max-width:550px;background:rgba(255,255,255,0.5);border:1px solid rgba(58,46,34,0.1);border-radius:24px;padding:36px;font-size:15px;line-height:2.2;color:rgba(58,46,34,0.75);backdrop-filter:blur(10px)}

.pebble-skills{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:500px}
.pebble{padding:10px 22px;border-radius:30px;background:rgba(58,46,34,0.06);border:1px solid rgba(58,46,34,0.12);color:#5a4a3a;font-size:13px;font-weight:700;transition:all 0.4s;cursor:default}
.pebble:hover{background:rgba(58,46,34,0.12);transform:scale(1.08)}

.stone-card{background:rgba(255,255,255,0.5);border:1px solid rgba(58,46,34,0.08);border-radius:20px;padding:24px;margin-bottom:14px;max-width:500px;width:100%;backdrop-filter:blur(8px)}
.stone-icon{font-size:28px;margin-bottom:8px}
.stone-name{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#3a2e22}
.stone-desc{font-size:13px;color:rgba(58,46,34,0.6);margin-top:6px;line-height:1.7}
.stone-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.stone-tags span{padding:4px 12px;border-radius:12px;font-size:11px;background:rgba(58,46,34,0.06);border:1px solid rgba(58,46,34,0.1);color:#6a5a4a;font-weight:700}

.bamboo-card{background:rgba(255,255,255,0.5);border-left:3px solid #8a7a5a;border-radius:0 16px 16px 0;padding:18px 22px;margin-bottom:12px;max-width:500px;width:100%}
.bamboo-card strong{color:#3a2e22;font-size:15px}
.bamboo-card small{color:rgba(58,46,34,0.4);font-weight:600}
.bamboo-card p{color:rgba(58,46,34,0.6);font-size:13px;margin-top:6px;line-height:1.6}

.zen-contacts{display:flex;flex-direction:column;gap:10px;max-width:400px;width:100%}
.zen-link{display:flex;align-items:center;gap:14px;padding:14px 22px;border-radius:18px;background:rgba(255,255,255,0.4);border:1px solid rgba(58,46,34,0.08);color:#3a2e22;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.3s}
.zen-link:hover{background:rgba(255,255,255,0.7);transform:translateX(5px)}

#loader{position:fixed;inset:0;background:#f5e6d3;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 1s}
#loader.gone{opacity:0;pointer-events:none}
@keyframes spin3d{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}
@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
</style>
</head><body>
<div id="loader"><div style="font-size:56px">🌸</div><div style="margin-top:16px;font-size:12px;font-weight:700;color:#8a7a5a;letter-spacing:0.3em">FINDING PEACE...</div></div>
<div id="canvas-bg"></div>
<div id="content">
  <div class="hero">
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <div class="zen-bio">${bio}</div>
    <div class="zen-hint">↓ scroll gently ↓</div>
  </div>
  <section><div class="zen-title">🍃 About</div><div class="zen-subtitle">THE JOURNEY</div><div class="zen-about">${about}</div></section>
  <section><div class="zen-title">☯ Skills</div><div class="zen-subtitle">MASTERED ARTS</div><div class="pebble-skills">${skillNames.map(s=>`<div class="pebble">${s}</div>`).join('')}</div></section>
  <section><div class="zen-title">🪨 Projects</div><div class="zen-subtitle">CARVED IN STONE</div>${projHTML}</section>
  <section><div class="zen-title">🎋 Experience</div><div class="zen-subtitle">THE PATH WALKED</div>${expHTML}</section>
  <section>
    <div class="zen-title">🕊 Contact</div><div class="zen-subtitle">REACH OUT</div>
    <div class="zen-contacts">
      <a class="zen-link" href="mailto:${email}">📧 ${email}</a>
      <a class="zen-link" href="${github||'#'}" target="_blank">🐙 ${githubH}</a>
      <a class="zen-link" href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a>
      <div class="zen-link">📍 ${location}</div>
    </div>
  </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf5e6d3,0.02);
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.set(0,12,15);
  camera.lookAt(0,0,0);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setClearColor(0xf5e6d3,0.3);
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Sand plane
  const planeGeo = new THREE.PlaneGeometry(40,40,80,80);
  const planeMat = new THREE.MeshBasicMaterial({color:0xe8d5b7,wireframe:true,transparent:true,opacity:0.15});
  const plane = new THREE.Mesh(planeGeo,planeMat);
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);

  // Stones (spheres)
  const stones = [];
  const stonePositions = [[-3,0.5,2],[2,0.8,-1],[0,0.4,4],[-1,0.6,-3],[4,0.5,1]];
  stonePositions.forEach(pos=>{
    const geo = new THREE.SphereGeometry(0.5+Math.random()*0.4,12,12);
    const mat = new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(0.08,0.1,0.4+Math.random()*0.2),transparent:true,opacity:0.6});
    const stone = new THREE.Mesh(geo,mat);
    stone.position.set(...pos);
    stone.scale.y = 0.6;
    scene.add(stone);
    stones.push(stone);
  });

  // Cherry blossom particles
  const pCount = 200;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount*3);
  const pVel = [];
  for(let i=0;i<pCount;i++){
    pPos[i*3]=(Math.random()-0.5)*30;
    pPos[i*3+1]=Math.random()*15;
    pPos[i*3+2]=(Math.random()-0.5)*30;
    pVel.push({x:(Math.random()-0.5)*0.02,y:-0.01-Math.random()*0.02,z:(Math.random()-0.5)*0.02});
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  const pMat = new THREE.PointsMaterial({size:0.15,color:0xffaaaa,transparent:true,opacity:0.6});
  const pts = new THREE.Points(pGeo,pMat);
  scene.add(pts);

  let scrollY=0,t=0;
  window.addEventListener('scroll',()=>scrollY=window.scrollY);

  function animate(){
    requestAnimationFrame(animate);
    t+=0.005;
    // Float petals
    const posArr=pGeo.attributes.position.array;
    for(let i=0;i<pCount;i++){
      posArr[i*3]+=pVel[i].x+Math.sin(t+i)*0.005;
      posArr[i*3+1]+=pVel[i].y;
      posArr[i*3+2]+=pVel[i].z;
      if(posArr[i*3+1]<-1){posArr[i*3+1]=15;posArr[i*3]=(Math.random()-0.5)*30}
    }
    pGeo.attributes.position.needsUpdate=true;
    camera.position.y=12-scrollY*0.004;
    camera.lookAt(0,0,0);
    // Gentle wave on sand
    const verts=planeGeo.attributes.position.array;
    for(let i=0;i<verts.length;i+=3){
      verts[i+2]=Math.sin(verts[i]*0.5+t)*0.15*Math.cos(verts[i+1]*0.5+t);
    }
    planeGeo.attributes.position.needsUpdate=true;
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
