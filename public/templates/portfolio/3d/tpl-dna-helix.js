/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: DNA HELIX
   File: templates/portfolio/tpl-dna-helix.js
   Style: 3D DNA Double Helix · Bio-tech · Elegant · Three.js
================================================================ */

window.TPL_DNA_HELIX = {
  id: 'dna-helix',
  name: 'DNA Helix',
  category: 'Scientific 3D',
  theme: 'bio-tech',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#001a1a,#003333,#004d40);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 40%,rgba(0,255,200,0.1),transparent 60%)"></div>
        <div style="font-size:48px;margin-bottom:12px;filter:drop-shadow(0 0 20px rgba(0,255,180,0.5))">🧬</div>
        <div style="font-size:18px;font-weight:900;color:#00ffbb;text-shadow:0 0 20px rgba(0,255,180,0.4)">DNA Helix</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">SCROLL · ROTATE · DISCOVER</div>
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
      ? projects.map((p,i) => `<div class="node-card" style="animation-delay:${i*0.1}s"><div class="node-icon">${p.emoji||'🧪'}</div><h3>${p.name}</h3><p>${p.description||''}</p><div class="tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('')
      : '<div class="node-card"><div class="node-icon">🧪</div><h3>Your Project</h3><p>Add projects here.</p></div>';

    const expHTML = experience.length
      ? experience.map(e => `<div class="strand-card"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('')
      : '<div class="strand-card"><strong>Your Role</strong> · Company<br><small>Duration</small><p>Add experience.</p></div>';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — DNA Helix Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#001a1a;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden}
#canvas-bg{position:fixed;inset:0;z-index:0}
#content{position:relative;z-index:10}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px}
.hero h1{font-size:clamp(40px,7vw,72px);font-weight:900;background:linear-gradient(135deg,#00ffbb,#00aaff,#00ffdd);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero .subtitle{font-size:18px;color:rgba(255,255,255,0.5);margin-top:10px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700}
.hero .bio-text{max-width:500px;margin:24px auto 0;color:rgba(255,255,255,0.55);line-height:1.9;font-size:15px}
.scroll-hint{margin-top:40px;font-size:12px;color:rgba(0,255,187,0.5);letter-spacing:0.2em;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}

section{min-height:100vh;padding:80px 20px;display:flex;flex-direction:column;align-items:center}
.sec-title{font-size:32px;font-weight:900;color:#00ffbb;margin-bottom:40px;text-align:center;text-shadow:0 0 40px rgba(0,255,187,0.2)}

.about-helix{max-width:600px;font-size:16px;line-height:2;color:rgba(255,255,255,0.7);background:rgba(0,255,187,0.03);border:1px solid rgba(0,255,187,0.1);border-radius:24px;padding:40px;backdrop-filter:blur(10px)}

.skills-helix{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:600px}
.skill-node{padding:10px 22px;border-radius:30px;background:rgba(0,255,187,0.08);border:1px solid rgba(0,255,187,0.2);color:#00ffbb;font-size:14px;font-weight:700;transition:all 0.3s;cursor:default}
.skill-node:hover{background:rgba(0,255,187,0.15);transform:scale(1.1);box-shadow:0 0 25px rgba(0,255,187,0.3)}

.node-card{background:rgba(0,255,187,0.04);border:1px solid rgba(0,255,187,0.12);border-radius:20px;padding:24px;margin-bottom:16px;max-width:500px;width:100%;animation:slideUp 0.5s ease backwards}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.node-icon{font-size:30px;margin-bottom:10px}
.node-card h3{font-size:18px;font-weight:800;color:#fff}
.node-card p{font-size:13px;color:rgba(255,255,255,0.6);margin-top:8px;line-height:1.7}
.tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.tags span{padding:4px 12px;border-radius:12px;font-size:11px;background:rgba(0,170,255,0.1);border:1px solid rgba(0,170,255,0.2);color:#66ddff;font-weight:700}

.strand-card{background:rgba(255,255,255,0.04);border-left:3px solid #00ffbb;border-radius:0 16px 16px 0;padding:20px 24px;margin-bottom:14px;max-width:500px;width:100%}
.strand-card strong{color:#fff;font-size:15px}
.strand-card small{color:rgba(255,255,255,0.4);font-weight:700}
.strand-card p{color:rgba(255,255,255,0.6);font-size:13px;margin-top:8px;line-height:1.6}

.contact-strand{display:flex;flex-direction:column;gap:12px;max-width:400px;width:100%}
.contact-link{display:flex;align-items:center;gap:14px;padding:16px 22px;border-radius:18px;background:rgba(0,255,187,0.04);border:1px solid rgba(0,255,187,0.1);color:#fff;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.2s}
.contact-link:hover{background:rgba(0,255,187,0.1);transform:translateX(6px)}

#loader{position:fixed;inset:0;background:#001a1a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
.loader-dna{font-size:56px;animation:spin3d 1s linear infinite}
@keyframes spin3d{from{transform:rotateY(0)}to{transform:rotateY(360deg)}}
.loader-label{margin-top:16px;font-size:12px;font-weight:800;color:#00ffbb;letter-spacing:0.3em}
</style>
</head><body>
<div id="loader"><div class="loader-dna">🧬</div><div class="loader-label">SEQUENCING...</div></div>
<div id="canvas-bg"></div>
<div id="content">
  <div class="hero">
    <h1>${name}</h1>
    <div class="subtitle">${role}</div>
    <div class="bio-text">${bio}</div>
    <div class="scroll-hint">↓ SCROLL TO EXPLORE THE HELIX ↓</div>
  </div>

  <section><div class="sec-title">🧬 About</div><div class="about-helix">${about}</div></section>
  <section><div class="sec-title">⚡ Skills</div><div class="skills-helix">${skillNames.map(s=>`<div class="skill-node">${s}</div>`).join('')}</div></section>
  <section><div class="sec-title">🔬 Projects</div>${projHTML}</section>
  <section><div class="sec-title">📋 Experience</div>${expHTML}</section>
  <section>
    <div class="sec-title">📡 Contact</div>
    <div class="contact-strand">
      <a class="contact-link" href="mailto:${email}">📧 ${email}</a>
      <a class="contact-link" href="${github||'#'}" target="_blank">🐙 ${githubH}</a>
      <a class="contact-link" href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a>
      <div class="contact-link">📍 ${location}</div>
    </div>
  </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z = 20;
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // DNA Helix
  const helixGroup = new THREE.Group();
  scene.add(helixGroup);

  const sphereGeo = new THREE.SphereGeometry(0.2,12,12);
  const mat1 = new THREE.MeshBasicMaterial({color:0x00ffbb,transparent:true,opacity:0.8});
  const mat2 = new THREE.MeshBasicMaterial({color:0x00aaff,transparent:true,opacity:0.8});
  const lineMat = new THREE.LineBasicMaterial({color:0x00ffbb,transparent:true,opacity:0.15});

  for(let i=0;i<80;i++){
    const angle = i*0.25;
    const y = i*0.5 - 20;
    const x1 = Math.cos(angle)*4;
    const z1 = Math.sin(angle)*4;
    const x2 = Math.cos(angle+Math.PI)*4;
    const z2 = Math.sin(angle+Math.PI)*4;

    const s1 = new THREE.Mesh(sphereGeo,mat1);
    s1.position.set(x1,y,z1);
    helixGroup.add(s1);
    const s2 = new THREE.Mesh(sphereGeo,mat2);
    s2.position.set(x2,y,z2);
    helixGroup.add(s2);

    if(i%3===0){
      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x1,y,z1),new THREE.Vector3(x2,y,z2)]);
      helixGroup.add(new THREE.Line(lineGeo,lineMat));
    }
  }

  // Background particles
  const pCount = 500;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    pPos[i*3]=(Math.random()-0.5)*60;
    pPos[i*3+1]=(Math.random()-0.5)*60;
    pPos[i*3+2]=(Math.random()-0.5)*30;
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  const pMat = new THREE.PointsMaterial({size:0.08,color:0x00ffbb,transparent:true,opacity:0.3,blending:THREE.AdditiveBlending});
  scene.add(new THREE.Points(pGeo,pMat));

  let scrollY = 0;
  window.addEventListener('scroll',()=>scrollY=window.scrollY);

  function animate(){
    requestAnimationFrame(animate);
    helixGroup.rotation.y += 0.003;
    helixGroup.position.y = scrollY*0.01;
    camera.position.y = -scrollY*0.005;
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
