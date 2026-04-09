/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: TV CHANNEL
   File: templates/portfolio/tpl-tv-channel.js
   Style: Retro CRT TV · Channel Surfing · VHS Glitch · Three.js
================================================================ */

window.TPL_TV_CHANNEL = {
  id: 'tv-channel',
  name: 'TV Channel',
  category: 'Retro 3D',
  theme: 'retro-crt',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#0a0a0a,#1a1a1a,#0d0d0d);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Courier New',monospace;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,0,0.03) 2px,rgba(0,255,0,0.03) 4px)"></div>
        <div style="font-size:48px;margin-bottom:12px">📺</div>
        <div style="font-size:18px;font-weight:900;color:#00ff44;text-shadow:0 0 15px rgba(0,255,68,0.5)">TV Channel</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:6px;letter-spacing:0.15em">CH+ · CH- · SURF</div>
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

    const channels = [
      { num: 1, label: 'INTRO', content: `<div class="ch-intro"><div class="ch-name">${name}</div><div class="ch-role">${role}</div><div class="ch-bio">${bio}</div></div>` },
      { num: 2, label: 'ABOUT', content: `<div class="ch-about"><div class="ch-heading">ABOUT ME</div><p>${about}</p></div>` },
      { num: 3, label: 'SKILLS', content: `<div class="ch-skills"><div class="ch-heading">SKILLS</div><div class="skill-list">${skillNames.map(s=>`<div class="sk">${s}</div>`).join('')}</div></div>` },
      { num: 4, label: 'PROJECTS', content: `<div class="ch-projects"><div class="ch-heading">PROJECTS</div>${projects.length ? projects.map(p=>`<div class="tv-proj"><span class="tv-emoji">${p.emoji||'📺'}</span><strong>${p.name}</strong><p>${p.description||''}</p></div>`).join('') : '<div class="tv-proj"><span class="tv-emoji">📺</span><strong>Your Project</strong><p>Add projects here.</p></div>'}</div>` },
      { num: 5, label: 'EXPERIENCE', content: `<div class="ch-exp"><div class="ch-heading">EXPERIENCE</div>${experience.length ? experience.map(e=>`<div class="tv-exp"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('') : '<div class="tv-exp"><strong>Your Role</strong> · Company<br><small>Duration</small></div>'}</div>` },
      { num: 6, label: 'CONTACT', content: `<div class="ch-contact"><div class="ch-heading">CONTACT</div><div class="tv-contact"><a href="mailto:${email}">📧 ${email}</a><a href="${github||'#'}" target="_blank">🐙 ${githubH}</a><a href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a><span>📍 ${location}</span></div></div>` }
    ];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — TV Channel Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#00ff44;font-family:'Courier New','Lucida Console',monospace;overflow:hidden;height:100vh}
#canvas-bg{position:fixed;inset:0;z-index:0}

#tv-frame{position:fixed;inset:0;z-index:10;display:flex;align-items:center;justify-content:center}
.tv-body{position:relative;width:min(85vw,700px);height:min(70vh,500px);background:#111;border-radius:30px;padding:30px;box-shadow:0 20px 80px rgba(0,0,0,0.8),inset 0 0 60px rgba(0,0,0,0.5)}
.tv-bezel{position:absolute;inset:20px;border-radius:16px;border:3px solid #333;overflow:hidden}
.screen{position:absolute;inset:0;overflow:hidden;background:#000}
.screen::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px);pointer-events:none;z-index:5}
.screen::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.4));pointer-events:none;z-index:6}

.channel-content{position:absolute;inset:0;padding:30px;overflow-y:auto;z-index:2}
.channel-content.glitch{animation:glitch 0.3s ease}
@keyframes glitch{0%{transform:translate(0);filter:none}20%{transform:translate(-5px,3px);filter:hue-rotate(90deg)}40%{transform:translate(3px,-2px);filter:saturate(3)}60%{transform:translate(-2px,5px);filter:brightness(2)}80%{transform:translate(4px,-3px);filter:hue-rotate(-90deg)}100%{transform:translate(0);filter:none}}
.static-overlay{position:absolute;inset:0;z-index:3;opacity:0;pointer-events:none;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")}
.static-overlay.show{opacity:0.8;animation:staticFlicker 0.15s steps(3) 3}
@keyframes staticFlicker{0%{opacity:0.8}50%{opacity:0.4}100%{opacity:0.9}}

.ch-num{position:absolute;top:15px;right:20px;font-size:28px;font-weight:900;color:#00ff44;text-shadow:0 0 10px rgba(0,255,68,0.5);z-index:10;opacity:0.8}
.ch-label{position:absolute;top:15px;left:20px;font-size:11px;font-weight:700;color:#00ff44;opacity:0.6;letter-spacing:0.2em;z-index:10}

.ch-intro .ch-name{font-size:clamp(24px,4vw,42px);font-weight:900;color:#00ff44;text-shadow:0 0 30px rgba(0,255,68,0.4);margin-top:40px}
.ch-intro .ch-role{font-size:14px;color:rgba(0,255,68,0.6);margin-top:8px;text-transform:uppercase;letter-spacing:0.15em}
.ch-intro .ch-bio{font-size:13px;color:rgba(0,255,68,0.5);margin-top:20px;line-height:1.8;max-width:400px}

.ch-heading{font-size:22px;font-weight:900;color:#00ff44;margin-bottom:20px;text-shadow:0 0 15px rgba(0,255,68,0.3)}
.ch-about p{font-size:14px;color:rgba(0,255,68,0.7);line-height:2}
.skill-list{display:flex;flex-wrap:wrap;gap:8px}
.sk{padding:6px 14px;border:1px solid rgba(0,255,68,0.3);color:#00ff44;font-size:12px;font-weight:700}
.tv-proj{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(0,255,68,0.1)}
.tv-proj .tv-emoji{font-size:20px;margin-right:8px}
.tv-proj strong{color:#00ff44;font-size:14px}
.tv-proj p{color:rgba(0,255,68,0.6);font-size:12px;margin-top:4px;line-height:1.6}
.tv-exp{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid rgba(0,255,68,0.1)}
.tv-exp strong{color:#00ff44}
.tv-exp small{color:rgba(0,255,68,0.4)}
.tv-exp p{color:rgba(0,255,68,0.6);font-size:12px;margin-top:6px}
.tv-contact{display:flex;flex-direction:column;gap:12px}
.tv-contact a,.tv-contact span{color:#00ff44;text-decoration:none;font-size:14px;padding:8px 0;border-bottom:1px dashed rgba(0,255,68,0.2)}
.tv-contact a:hover{text-shadow:0 0 10px rgba(0,255,68,0.5)}

.controls{position:fixed;bottom:30px;left:50%;transform:translateX(-50%);z-index:20;display:flex;gap:12px;align-items:center}
.ctrl-btn{width:50px;height:50px;border-radius:50%;background:rgba(30,30,30,0.9);border:2px solid #333;color:#00ff44;font-size:18px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.15s;backdrop-filter:blur(10px)}
.ctrl-btn:hover{border-color:#00ff44;box-shadow:0 0 15px rgba(0,255,68,0.3)}
.ctrl-btn.power{background:rgba(255,0,0,0.15);border-color:rgba(255,0,0,0.3);color:#ff3333}
.ch-indicator{color:rgba(255,255,255,0.5);font-size:13px;font-weight:700;min-width:60px;text-align:center}

.tv-knobs{position:absolute;right:-20px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:16px}
.knob{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#444,#222);border:2px solid #555;cursor:pointer}

#loader{position:fixed;inset:0;background:#0a0a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
</style>
</head><body>
<div id="loader"><div style="font-size:56px;animation:pulse 1s infinite">📺</div><div style="margin-top:16px;font-size:12px;font-weight:800;color:#00ff44;letter-spacing:0.3em">TUNING IN...</div></div>
<div id="canvas-bg"></div>

<div id="tv-frame">
  <div class="tv-body">
    <div class="tv-bezel">
      <div class="screen">
        <div class="ch-num" id="ch-num">CH 1</div>
        <div class="ch-label" id="ch-label">INTRO</div>
        <div class="channel-content" id="channel-content">${channels[0].content}</div>
        <div class="static-overlay" id="static"></div>
      </div>
    </div>
    <div class="tv-knobs"><div class="knob"></div><div class="knob"></div></div>
  </div>
</div>

<div class="controls">
  <button class="ctrl-btn" id="ch-down">◀</button>
  <div class="ch-indicator" id="ch-info">CH 1 / 6</div>
  <button class="ctrl-btn" id="ch-up">▶</button>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const channels = ${JSON.stringify(channels)};
  let currentCh = 0;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.z = 15;
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Static noise particles
  const pCount = 1000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    pos[i*3]=(Math.random()-0.5)*50;
    pos[i*3+1]=(Math.random()-0.5)*50;
    pos[i*3+2]=(Math.random()-0.5)*20-5;
  }
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const pMat = new THREE.PointsMaterial({size:0.06,color:0x00ff44,transparent:true,opacity:0.2,blending:THREE.AdditiveBlending});
  const pts = new THREE.Points(geo,pMat);
  scene.add(pts);

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.003;
    pts.rotation.z=t*0.05;
    const posArr=geo.attributes.position.array;
    for(let i=0;i<pCount;i++){
      posArr[i*3+1]+=Math.sin(t+i*0.1)*0.01;
    }
    geo.attributes.position.needsUpdate=true;
    renderer.render(scene,camera);
  }
  animate();

  function switchChannel(dir){
    currentCh = (currentCh+dir+channels.length)%channels.length;
    const ch = channels[currentCh];
    const content = document.getElementById('channel-content');
    const staticEl = document.getElementById('static');

    staticEl.classList.add('show');
    content.classList.add('glitch');
    setTimeout(()=>{
      content.innerHTML = ch.content;
      document.getElementById('ch-num').textContent='CH '+ch.num;
      document.getElementById('ch-label').textContent=ch.label;
      document.getElementById('ch-info').textContent='CH '+ch.num+' / '+channels.length;
      staticEl.classList.remove('show');
      content.classList.remove('glitch');
    },300);
  }

  document.getElementById('ch-up').addEventListener('click',()=>switchChannel(1));
  document.getElementById('ch-down').addEventListener('click',()=>switchChannel(-1));
  document.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowUp')switchChannel(1);
    if(e.key==='ArrowLeft'||e.key==='ArrowDown')switchChannel(-1);
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
