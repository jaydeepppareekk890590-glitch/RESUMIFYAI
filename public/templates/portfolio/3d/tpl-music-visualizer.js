/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: MUSIC VISUALIZER
   File: templates/portfolio/tpl-music-visualizer.js
   Style: 3D Audio Equalizer · Reactive Bars · Synthwave · Three.js
================================================================ */

window.TPL_MUSIC_VISUALIZER = {
  id: 'music-visualizer',
  name: 'Music Visualizer',
  category: 'Audio 3D',
  theme: 'synthwave',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(180deg,#0a001a,#1a0033,#330066);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Segoe UI',system-ui,sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(0deg,rgba(255,0,255,0.1),transparent)"></div>
        <div style="font-size:48px;margin-bottom:12px">🎵</div>
        <div style="font-size:18px;font-weight:900;color:#ff00ff;text-shadow:0 0 20px rgba(255,0,255,0.5)">Music Visualizer</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:6px;letter-spacing:0.15em">CLICK · VIBE · FEEL</div>
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
      ? projects.map(p=>`<div class="track-card"><div class="track-icon">${p.emoji||'🎵'}</div><div class="track-info"><div class="track-name">${p.name}</div><div class="track-desc">${p.description||''}</div><div class="track-tags">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div></div></div>`).join('')
      : '<div class="track-card"><div class="track-icon">🎵</div><div class="track-info"><div class="track-name">Your Project</div><div class="track-desc">Add projects here.</div></div></div>';

    const expHTML = experience.length
      ? experience.map(e=>`<div class="album-card"><strong>${e.title}</strong><span class="album-label">${e.company} · ${e.duration}</span><p>${e.description||''}</p></div>`).join('')
      : '<div class="album-card"><strong>Your Role</strong><span class="album-label">Company · Duration</span></div>';

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Music Visualizer Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a001a;color:#fff;font-family:'Segoe UI',system-ui,sans-serif;overflow-x:hidden}
#canvas-bg{position:fixed;inset:0;z-index:0}
#content{position:relative;z-index:10}

.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 20px}
.hero h1{font-size:clamp(36px,7vw,72px);font-weight:900;background:linear-gradient(90deg,#ff00ff,#00ffff,#ff00ff);background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradShift 3s ease infinite}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.hero .sub{font-size:16px;color:rgba(255,255,255,0.5);margin-top:10px;letter-spacing:0.2em;text-transform:uppercase}
.hero .bio{max-width:500px;margin:20px auto;color:rgba(255,255,255,0.4);line-height:1.8}
.beat-hint{margin-top:30px;padding:14px 32px;border-radius:40px;background:linear-gradient(135deg,rgba(255,0,255,0.15),rgba(0,255,255,0.15));border:1px solid rgba(255,0,255,0.3);color:#ff88ff;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s;letter-spacing:0.1em}
.beat-hint:hover{background:rgba(255,0,255,0.2);box-shadow:0 0 30px rgba(255,0,255,0.3)}

section{min-height:80vh;padding:80px 20px;display:flex;flex-direction:column;align-items:center}
.sec-title{font-size:28px;font-weight:900;margin-bottom:30px;background:linear-gradient(90deg,#ff00ff,#00ffff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}

.about-vinyl{max-width:600px;padding:30px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,0,255,0.1);border-radius:20px;font-size:15px;line-height:2;color:rgba(255,255,255,0.7)}

.freq-skills{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;max-width:600px}
.freq-bar{padding:10px 20px;background:linear-gradient(180deg,rgba(255,0,255,0.15),rgba(0,255,255,0.08));border:1px solid rgba(255,0,255,0.2);border-radius:12px;color:#ff88ff;font-size:13px;font-weight:700;transition:all 0.3s;cursor:default}
.freq-bar:hover{transform:scaleY(1.2);box-shadow:0 0 20px rgba(255,0,255,0.3)}

.track-card{display:flex;gap:16px;align-items:flex-start;padding:18px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;margin-bottom:12px;max-width:550px;width:100%;transition:all 0.2s}
.track-card:hover{background:rgba(255,0,255,0.05);border-color:rgba(255,0,255,0.2)}
.track-icon{font-size:28px;flex-shrink:0}
.track-name{font-weight:800;font-size:16px}
.track-desc{font-size:12px;color:rgba(255,255,255,0.5);margin-top:4px;line-height:1.6}
.track-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.track-tags span{padding:3px 10px;border-radius:10px;font-size:10px;background:rgba(0,255,255,0.1);border:1px solid rgba(0,255,255,0.2);color:#88ffff;font-weight:700}

.album-card{max-width:550px;width:100%;background:rgba(255,255,255,0.03);border-left:3px solid #ff00ff;border-radius:0 14px 14px 0;padding:18px 22px;margin-bottom:12px}
.album-card strong{color:#fff;font-size:15px}
.album-label{display:block;font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;font-weight:600}
.album-card p{font-size:13px;color:rgba(255,255,255,0.55);margin-top:8px;line-height:1.6}

.contact-mix{display:flex;flex-direction:column;gap:10px;max-width:400px;width:100%}
.mix-link{display:flex;align-items:center;gap:14px;padding:14px 20px;border-radius:16px;background:rgba(255,0,255,0.04);border:1px solid rgba(255,0,255,0.1);color:#fff;text-decoration:none;font-weight:600;font-size:14px;transition:all 0.2s}
.mix-link:hover{background:rgba(255,0,255,0.1);transform:translateX(5px)}

#loader{position:fixed;inset:0;background:#0a001a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
</style>
</head><body>
<div id="loader"><div style="font-size:56px;animation:bounce 0.4s ease infinite alternate">🎵</div><div style="margin-top:16px;font-size:12px;font-weight:800;color:#ff00ff;letter-spacing:0.3em">MIXING...</div></div>
<div id="canvas-bg"></div>
<div id="content">
  <div class="hero">
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <div class="bio">${bio}</div>
    <div class="beat-hint" id="beat-btn">🎧 Click for the Beat</div>
  </div>
  <section><div class="sec-title">🎙 About</div><div class="about-vinyl">${about}</div></section>
  <section><div class="sec-title">🎹 Skills</div><div class="freq-skills">${skillNames.map(s=>`<div class="freq-bar">${s}</div>`).join('')}</div></section>
  <section><div class="sec-title">🎵 Projects</div>${projHTML}</section>
  <section><div class="sec-title">💿 Experience</div>${expHTML}</section>
  <section>
    <div class="sec-title">📻 Contact</div>
    <div class="contact-mix">
      <a class="mix-link" href="mailto:${email}">📧 ${email}</a>
      <a class="mix-link" href="${github||'#'}" target="_blank">🐙 ${githubH}</a>
      <a class="mix-link" href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a>
      <div class="mix-link">📍 ${location}</div>
    </div>
  </section>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.set(0,8,20);
  camera.lookAt(0,0,0);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Equalizer bars
  const bars = [];
  const barCount = 40;
  for(let i=0;i<barCount;i++){
    const geo = new THREE.BoxGeometry(0.4,1,0.4);
    const hue = i/barCount;
    const mat = new THREE.MeshBasicMaterial({color:new THREE.Color().setHSL(hue,1,0.5),transparent:true,opacity:0.7});
    const bar = new THREE.Mesh(geo,mat);
    bar.position.x = (i-barCount/2)*0.6;
    bar.position.y = 0;
    scene.add(bar);
    bars.push({mesh:bar,phase:Math.random()*Math.PI*2,speed:0.5+Math.random()*2,amp:1+Math.random()*3});
  }

  // Grid floor
  const gridHelper = new THREE.GridHelper(40,40,0xff00ff,0x330033);
  gridHelper.position.y = -1;
  scene.add(gridHelper);

  // Particles
  const pCount = 400;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    pPos[i*3]=(Math.random()-0.5)*40;
    pPos[i*3+1]=Math.random()*20;
    pPos[i*3+2]=(Math.random()-0.5)*20-5;
  }
  pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));
  scene.add(new THREE.Points(pGeo,new THREE.PointsMaterial({size:0.1,color:0x00ffff,transparent:true,opacity:0.3,blending:THREE.AdditiveBlending})));

  let t=0,beatMode=false;
  document.getElementById('beat-btn').addEventListener('click',()=>{beatMode=!beatMode});

  let scrollY=0;
  window.addEventListener('scroll',()=>scrollY=window.scrollY);

  function animate(){
    requestAnimationFrame(animate);
    t+=0.016;
    const intensity = beatMode ? 2 : 0.8;
    bars.forEach(b=>{
      const h = (Math.sin(t*b.speed+b.phase)*0.5+0.5)*b.amp*intensity+0.1;
      b.mesh.scale.y=h;
      b.mesh.position.y=h/2-1;
    });
    camera.position.y = 8-scrollY*0.003;
    camera.lookAt(0,0,0);
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
