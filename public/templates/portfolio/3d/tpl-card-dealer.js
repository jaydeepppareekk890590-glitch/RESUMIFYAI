/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: CARD DEALER
   File: templates/portfolio/tpl-card-dealer.js
   Style: 3D Poker Table · Card Flip · Green Felt · Three.js
================================================================ */

window.TPL_CARD_DEALER = {
  id: 'card-dealer',
  name: 'Card Dealer',
  category: 'Game 3D',
  theme: 'poker-table',
  animated: true,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#0a2a0a,#1a4a1a,#0d3d0d);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:12px">🃏</div>
        <div style="font-size:18px;font-weight:900;color:#ffd700">Card Dealer</div>
        <div style="font-size:11px;color:rgba(255,215,0,0.5);margin-top:6px;letter-spacing:0.15em">FLIP · REVEAL · WIN</div>
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

    const cards = [
      { suit:'♠', label:'ABOUT', title:'About Me', content:about },
      { suit:'♥', label:'SKILLS', title:'Skills', content:`<div class="card-skills">${skillNames.map(s=>`<span class="chip">${s}</span>`).join('')}</div>` },
      { suit:'♦', label:'PROJECTS', title:'Projects', content: projects.length ? projects.map(p=>`<div class="card-proj"><strong>${p.emoji||'🃏'} ${p.name}</strong><p>${p.description||''}</p></div>`).join('') : '<div class="card-proj"><strong>🃏 Your Project</strong><p>Add projects here.</p></div>' },
      { suit:'♣', label:'EXPERIENCE', title:'Experience', content: experience.length ? experience.map(e=>`<div class="card-exp"><strong>${e.title}</strong> · ${e.company}<br><small>${e.duration}</small><p>${e.description||''}</p></div>`).join('') : '<div class="card-exp"><strong>Your Role</strong> · Company</div>' },
      { suit:'★', label:'CONTACT', title:'Contact', content:`<div class="card-contacts"><a href="mailto:${email}">📧 ${email}</a><a href="${github||'#'}" target="_blank">🐙 ${githubH}</a><a href="${linkedin||'#'}" target="_blank">💼 ${linkedinH}</a><span>📍 ${location}</span></div>` }
    ];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Card Dealer Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a1a0a;color:#fff;font-family:'Georgia','Times New Roman',serif;overflow-x:hidden;min-height:100vh}
#canvas-bg{position:fixed;inset:0;z-index:0}

#ui{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;min-height:100vh;padding:50px 20px}
.dealer-hero{text-align:center;margin-bottom:40px}
.dealer-hero h1{font-size:clamp(32px,6vw,56px);font-weight:900;color:#ffd700;text-shadow:0 0 30px rgba(255,215,0,0.3)}
.dealer-hero .role{font-size:14px;color:rgba(255,215,0,0.5);margin-top:8px;letter-spacing:0.2em;text-transform:uppercase}
.dealer-hero .bio{max-width:450px;margin:16px auto;color:rgba(255,255,255,0.4);font-size:14px;line-height:1.8}

.table-felt{background:radial-gradient(ellipse at center,#1a5a1a,#0d3d0d,#0a2a0a);border:3px solid #2a6a2a;border-radius:200px;padding:40px 30px;max-width:800px;width:100%;box-shadow:inset 0 0 60px rgba(0,0,0,0.5),0 20px 60px rgba(0,0,0,0.6)}

.card-hand{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-bottom:30px}
.playing-card{width:80px;height:112px;background:#fff;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.4s;box-shadow:0 4px 15px rgba(0,0,0,0.4);position:relative;transform-style:preserve-3d}
.playing-card:hover{transform:translateY(-10px) rotateY(5deg);box-shadow:0 12px 30px rgba(0,0,0,0.5)}
.playing-card.active{transform:translateY(-20px) scale(1.05);box-shadow:0 16px 40px rgba(255,215,0,0.3);border:2px solid #ffd700}
.playing-card .suit{font-size:28px;color:#cc0000}
.playing-card .suit.black{color:#000}
.playing-card .card-label{font-size:9px;font-weight:700;color:#333;margin-top:4px;text-transform:uppercase;letter-spacing:0.05em}

#card-reveal{max-width:600px;width:100%;min-height:200px;background:rgba(0,0,0,0.3);border:1px solid rgba(255,215,0,0.15);border-radius:16px;padding:30px;backdrop-filter:blur(5px);animation:dealCard 0.4s ease}
@keyframes dealCard{from{opacity:0;transform:translateY(-20px) rotateX(10deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}
.reveal-title{font-size:22px;font-weight:700;color:#ffd700;margin-bottom:16px;display:flex;align-items:center;gap:10px}
.reveal-body{font-size:14px;color:rgba(255,255,255,0.7);line-height:1.9}
.reveal-body .card-skills{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:6px 16px;border-radius:20px;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.25);color:#ffd700;font-size:12px;font-weight:700}
.card-proj{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08)}
.card-proj strong{color:#ffd700;font-size:14px}
.card-proj p{color:rgba(255,255,255,0.55);font-size:12px;margin-top:4px}
.card-exp{margin-bottom:12px}
.card-exp strong{color:#ffd700}
.card-exp small{color:rgba(255,255,255,0.4)}
.card-exp p{color:rgba(255,255,255,0.55);font-size:12px;margin-top:4px}
.card-contacts{display:flex;flex-direction:column;gap:10px}
.card-contacts a,.card-contacts span{color:#ffd700;text-decoration:none;font-size:14px;padding:6px 0}
.card-contacts a:hover{text-shadow:0 0 10px rgba(255,215,0,0.4)}

#loader{position:fixed;inset:0;background:#0a1a0a;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:999;transition:opacity 0.8s}
#loader.gone{opacity:0;pointer-events:none}
</style>
</head><body>
<div id="loader"><div style="font-size:56px">🃏</div><div style="margin-top:16px;font-size:12px;font-weight:700;color:#ffd700;letter-spacing:0.3em">SHUFFLING...</div></div>
<div id="canvas-bg"></div>
<div id="ui">
  <div class="dealer-hero">
    <h1>${name}</h1>
    <div class="role">${role}</div>
    <div class="bio">${bio}</div>
  </div>

  <div class="table-felt">
    <div class="card-hand">
      ${cards.map((c,i)=>`<div class="playing-card ${i===0?'active':''}" data-idx="${i}"><div class="suit ${c.suit==='♠'||c.suit==='♣'?'black':''}">${c.suit}</div><div class="card-label">${c.label}</div></div>`).join('')}
    </div>

    <div id="card-reveal">
      <div class="reveal-title"><span>${cards[0].suit}</span> ${cards[0].title}</div>
      <div class="reveal-body">${cards[0].content}</div>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script>
(function(){
  const cards = ${JSON.stringify(cards)};

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,500);
  camera.position.set(0,5,12);
  camera.lookAt(0,0,0);
  const renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  document.getElementById('canvas-bg').appendChild(renderer.domElement);

  // Floating chips/coins
  const chips = [];
  for(let i=0;i<30;i++){
    const geo = new THREE.CylinderGeometry(0.3,0.3,0.08,16);
    const colors = [0xff0000,0x0000ff,0x00aa00,0xffd700,0xff6600];
    const mat = new THREE.MeshBasicMaterial({color:colors[i%5],transparent:true,opacity:0.4});
    const chip = new THREE.Mesh(geo,mat);
    chip.position.set((Math.random()-0.5)*20,Math.random()*10-2,(Math.random()-0.5)*15);
    chip.rotation.x=Math.random()*Math.PI;
    scene.add(chip);
    chips.push({mesh:chip,vy:0.005+Math.random()*0.01,vr:0.01+Math.random()*0.02});
  }

  // Table glow
  const glowGeo = new THREE.PlaneGeometry(15,10);
  const glowMat = new THREE.MeshBasicMaterial({color:0x1a5a1a,transparent:true,opacity:0.1});
  const glow = new THREE.Mesh(glowGeo,glowMat);
  glow.rotation.x=-Math.PI/2;
  glow.position.y=-2;
  scene.add(glow);

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t+=0.005;
    chips.forEach(c=>{
      c.mesh.rotation.y+=c.vr;
      c.mesh.position.y+=Math.sin(t*c.vy*100)*0.01;
    });
    renderer.render(scene,camera);
  }
  animate();

  // Card click
  document.querySelectorAll('.playing-card').forEach(card=>{
    card.addEventListener('click',()=>{
      const idx = parseInt(card.dataset.idx);
      const c = cards[idx];
      document.querySelectorAll('.playing-card').forEach(p=>p.classList.remove('active'));
      card.classList.add('active');
      const reveal = document.getElementById('card-reveal');
      reveal.style.animation='none';
      reveal.offsetHeight;
      reveal.style.animation='dealCard 0.4s ease';
      reveal.innerHTML='<div class="reveal-title"><span>'+c.suit+'</span> '+c.title+'</div><div class="reveal-body">'+c.content+'</div>';
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
