/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: MUSICA
   File: templates/portfolio/tpl-musica.js
   Style: Blue animated, multi-page, professional
================================================================ */

window.TPL_MUSICA = {
  id: 'musica',
  name: 'Musica',
  category: 'Animated',
  theme: 'dark-blue',
  animated: true,

  thumbnail() {
    return `
      <div style="background:linear-gradient(135deg,#0a0a1a,#0d1030);width:100%;height:100%;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:24px;background:rgba(0,0,0,0.4);display:flex;align-items:center;padding:0 10px;gap:8px">
          <span style="color:#00d4ff;font-size:8px;font-weight:700">Jaydeep.</span>
          <span style="color:rgba(255,255,255,0.3);font-size:7px">Home</span>
          <span style="color:rgba(255,255,255,0.3);font-size:7px">About</span>
          <span style="color:rgba(255,255,255,0.3);font-size:7px">Skills</span>
        </div>
        <div style="padding:32px 14px 0;display:flex;align-items:center;gap:10px">
          <div style="width:46px;height:46px;border-radius:50%;background:conic-gradient(#00d4ff,transparent,#0066ff,transparent,#00d4ff);padding:2px;flex-shrink:0">
            <div style="width:100%;height:100%;border-radius:50%;background:#0d1030;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#00d4ff">J</div>
          </div>
          <div>
            <div style="font-size:8px;color:rgba(255,255,255,0.5)">Hello, I'm</div>
            <div style="font-size:11px;font-weight:700;color:#fff">Jaydeep Pareek</div>
            <div style="font-size:8px;color:#00d4ff">Software Engineer</div>
          </div>
        </div>
        <div style="position:absolute;bottom:12px;left:12px;right:12px;display:flex;gap:5px">
          ${['2+','10+','5+','100%'].map(n=>`<div style="flex:1;background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);border-radius:4px;padding:3px;text-align:center"><div style="font-size:9px;font-weight:700;color:#00d4ff">${n}</div></div>`).join('')}
        </div>
      </div>`;
  },

  render(data) {
    const name     = data.name        || 'Your Name';
    const role     = data.role        || 'Frontend Developer';
    const bio      = data.bio         || 'Passionate developer creating amazing digital experiences.';
    const about    = data.about       || bio;
    const photo    = data.photo       || '';
    const skills   = data.skills      || [];
    const projects = data.projects    || [];
    const exp      = data.experience  || [];
    const email    = data.email       || '';
    const phone    = data.phone       || '';
    const location = data.location    || '';
    const github   = data.github      || '';
    const linkedin = data.linkedin    || '';
    const stats    = data.stats?.length ? data.stats : [
      { value: '2+',   label: 'Years Experience' },
      { value: '10+',  label: 'Projects Done'    },
      { value: '5+',   label: 'Technologies'     },
      { value: '100%', label: 'Satisfaction'      }
    ];

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

    const photoContent = photo
      ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"/>`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:56px;font-weight:800;color:#00d4ff">${initials}</div>`;

    const skillsHTML = skills.map((s, i) => `
      <div class="sk-item" style="animation-delay:${i*0.08}s">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span style="font-size:13px;color:#e0e0f0;font-weight:500">${s.name||s}</span>
          <span style="font-size:12px;color:#00d4ff">${s.level||80}%</span>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.07);border-radius:2px;overflow:hidden">
          <div class="sk-bar" data-w="${s.level||80}" style="height:100%;width:0%;background:linear-gradient(90deg,#00d4ff,#0066ff);border-radius:2px;transition:width 1.2s cubic-bezier(.4,0,.2,1)"></div>
        </div>
      </div>`).join('');

    const expHTML = exp.map((e, i) => `
      <div class="reveal" style="transition-delay:${i*0.1}s;padding-left:20px;border-left:2px solid rgba(0,212,255,0.25);margin-bottom:24px;position:relative">
        <div style="position:absolute;left:-6px;top:5px;width:10px;height:10px;border-radius:50%;background:#00d4ff;box-shadow:0 0 8px rgba(0,212,255,0.5)"></div>
        <div style="font-size:14px;font-weight:700;color:#fff">${e.title}</div>
        <div style="font-size:12px;color:#00d4ff;margin:2px 0">${e.company} · <span style="color:rgba(255,255,255,0.35)">${e.duration}</span></div>
        <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.7">${e.description}</div>
      </div>`).join('');

    const projHTML = projects.map((p, i) => `
      <div class="proj-card reveal" style="transition-delay:${i*0.12}s">
        <div style="height:150px;background:linear-gradient(135deg,rgba(0,212,255,0.08),rgba(0,102,255,0.04));display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(0,212,255,0.12);position:relative">
          <span style="font-size:40px">${p.emoji||'🚀'}</span>
          <div style="position:absolute;top:10px;right:10px;display:flex;gap:5px">
            ${p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank" style="font-size:10px;color:#00d4ff;text-decoration:none;background:rgba(0,212,255,0.1);padding:3px 8px;border-radius:4px;border:1px solid rgba(0,212,255,0.2)">↗ Live</a>` : ''}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="font-size:10px;color:rgba(255,255,255,0.4);text-decoration:none;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1)">Code</a>` : ''}
          </div>
        </div>
        <div style="padding:18px">
          <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:6px">${p.name}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.7;margin-bottom:10px">${p.description}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${(p.tech||[]).map(t=>`<span style="font-size:10px;background:rgba(0,212,255,0.08);color:#00d4ff;padding:2px 8px;border-radius:14px;border:1px solid rgba(0,212,255,0.18)">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--blue:#00d4ff;--blue2:#0066ff;--bg:#060612;--sur:rgba(255,255,255,0.03);--bdr:rgba(0,212,255,0.14);--txt:#e8e8f8;--mut:rgba(255,255,255,0.42)}
html{scroll-behavior:smooth}
body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--txt);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(0,212,255,0.25);border-radius:2px}

/* BG */
.bg-wrap{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.orb1{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,0.05),transparent 70%);top:-150px;right:-100px}
.orb2{position:absolute;width:400px;height:400px;border-radius:50%;background:radial-gradient(circle,rgba(0,102,255,0.04),transparent 70%);bottom:0;left:-80px}

/* NAV — low z-index so it doesn't fight portfolio-view's bar */
nav{position:fixed;top:0;left:0;right:0;z-index:100;height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;background:rgba(6,6,18,0.88);backdrop-filter:blur(14px);border-bottom:1px solid rgba(0,212,255,0.07)}
.nav-brand{font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#fff;text-decoration:none;letter-spacing:.08em}
.nav-brand span{color:var(--blue)}
.nav-ul{display:flex;gap:28px;list-style:none}
.nav-ul a{color:var(--mut);font-size:13px;text-decoration:none;font-weight:500;transition:color .2s;position:relative}
.nav-ul a::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--blue);transform:scaleX(0);transition:transform .25s}
.nav-ul a:hover,.nav-ul a.active{color:var(--blue)}
.nav-ul a:hover::after,.nav-ul a.active::after{transform:scaleX(1)}
.nav-hire{background:transparent;border:1px solid var(--blue);color:var(--blue);padding:7px 18px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;text-decoration:none;transition:all .2s;letter-spacing:.05em;font-family:'Outfit',sans-serif}
.nav-hire:hover{background:var(--blue);color:#000}

/* SECTIONS — padding-top accounts for fixed nav */
section{position:relative;z-index:1;padding:56px 48px 60px}

/* HOME */
#home{min-height:100vh;display:flex;align-items:center;gap:56px;padding-top:80px}
.home-l{flex:1}
.h-greet{font-size:13px;color:var(--blue);letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px;opacity:0;animation:up .7s .2s forwards}
.h-name{font-family:'Rajdhani',sans-serif;font-size:clamp(38px,5vw,64px);font-weight:700;color:#fff;line-height:1.08;margin-bottom:7px;opacity:0;animation:up .7s .35s forwards}
.h-name span{color:var(--blue)}
.h-role{font-size:clamp(18px,2.4vw,26px);color:var(--mut);font-weight:300;margin-bottom:18px;opacity:0;animation:up .7s .5s forwards}
.h-bio{font-size:14px;color:var(--mut);line-height:1.8;max-width:460px;margin-bottom:28px;opacity:0;animation:up .7s .65s forwards}
.h-btns{display:flex;gap:14px;opacity:0;animation:up .7s .8s forwards}
.btn-p{background:var(--blue);color:#000;padding:11px 26px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;transition:all .28s}
.btn-p:hover{box-shadow:0 0 28px rgba(0,212,255,0.38);transform:translateY(-2px)}
.btn-o{background:transparent;border:1px solid rgba(255,255,255,0.18);color:#fff;padding:11px 26px;border-radius:8px;font-size:13px;text-decoration:none;transition:all .2s}
.btn-o:hover{border-color:var(--blue);color:var(--blue)}
.h-social{display:flex;gap:12px;margin-top:24px;opacity:0;animation:up .7s 1s forwards}
.soc-btn{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--mut);text-decoration:none;transition:all .2s;font-size:14px}
.soc-btn:hover{border-color:var(--blue);color:var(--blue);background:rgba(0,212,255,0.06)}

/* Photo ring */
.home-r{flex-shrink:0;opacity:0;animation:fadeIn .8s .9s forwards}
.ring-outer{width:260px;height:260px;border-radius:50%;background:conic-gradient(var(--blue),transparent,var(--blue2),transparent,var(--blue));padding:3px;animation:spin 8s linear infinite}
.ring-inner{width:100%;height:100%;border-radius:50%;background:var(--bg);padding:10px}
.ring-circle{width:100%;height:100%;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,rgba(0,212,255,0.12),rgba(0,102,255,0.08))}

/* Stats row */
.stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:48px;opacity:0;animation:up .7s 1.3s forwards}
.stat-card{background:rgba(0,212,255,0.04);border:1px solid rgba(0,212,255,0.13);border-radius:10px;padding:18px;text-align:center;transition:all .25s}
.stat-card:hover{background:rgba(0,212,255,0.08);transform:translateY(-3px)}
.stat-n{font-family:'Rajdhani',sans-serif;font-size:26px;font-weight:700;color:var(--blue)}
.stat-l{font-size:10px;color:var(--mut);margin-top:3px;letter-spacing:.04em}

/* ABOUT */
#about{display:flex;gap:56px;align-items:center;padding-top:80px}
.about-img{flex-shrink:0;width:300px;height:360px;border-radius:18px;overflow:hidden;border:1px solid var(--bdr);background:linear-gradient(135deg,rgba(0,212,255,0.07),rgba(0,102,255,0.04));position:relative}
.about-img img{width:100%;height:100%;object-fit:cover}
.about-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-size:72px;font-weight:700;color:var(--blue)}
.corner{position:absolute;width:50px;height:50px;border-color:var(--blue);border-style:solid}
.c-tl{top:10px;left:10px;border-width:2px 0 0 2px}
.c-br{bottom:10px;right:10px;border-width:0 2px 2px 0}
.sec-tag{font-size:11px;color:var(--blue);letter-spacing:.18em;text-transform:uppercase;margin-bottom:10px}
.sec-title{font-family:'Rajdhani',sans-serif;font-size:clamp(26px,3vw,40px);font-weight:700;color:#fff;line-height:1.15;margin-bottom:5px}
.sec-title span{color:var(--blue)}
.sec-div{width:52px;height:3px;background:linear-gradient(90deg,var(--blue),var(--blue2));border-radius:2px;margin-bottom:20px}

/* SKILLS */
#skills{padding-top:80px}
.sk-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:36px}
.sk-item{opacity:0;transform:translateY(16px);transition:all .55s}
.sk-item.visible{opacity:1;transform:translateY(0)}

/* PROJECTS */
#projects{padding-top:80px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:36px}
.proj-card{background:var(--sur);border:1px solid var(--bdr);border-radius:12px;overflow:hidden;transition:all .25s;opacity:0;transform:translateY(24px)}
.proj-card.visible{opacity:1;transform:translateY(0)}
.proj-card:hover{border-color:rgba(0,212,255,0.38);transform:translateY(-5px);box-shadow:0 18px 36px rgba(0,0,0,0.35)}

/* CONTACT */
#contact{padding-top:80px;max-width:680px;margin:0 auto;text-align:center}
.contact-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:28px}
.cc{background:var(--sur);border:1px solid var(--bdr);border-radius:12px;padding:16px 22px;display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;transition:all .25s}
.cc:hover{border-color:rgba(0,212,255,0.38);background:rgba(0,212,255,0.04);transform:translateY(-2px)}
.cci{width:38px;height:38px;border-radius:9px;background:rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:center;color:var(--blue);font-size:16px;flex-shrink:0}

footer{padding:24px 48px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;font-size:12px;color:var(--mut)}
footer b{color:var(--blue)}

/* Animations */
@keyframes up{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s,transform .65s}
.reveal.visible{opacity:1;transform:translateY(0)}

/* Mobile */
@media(max-width:768px){
  nav{padding:0 16px}.nav-ul{display:none}
  section{padding:56px 20px 40px}
  #home{flex-direction:column-reverse;gap:24px;text-align:center;padding-top:72px}
  .h-btns,.h-social{justify-content:center}
  .ring-outer{width:180px;height:180px}
  #about{flex-direction:column}
  .about-img{width:100%;height:240px}
  .sk-grid{grid-template-columns:1fr}
  .stats-row{grid-template-columns:repeat(2,1fr)}
  footer{padding:20px}
}
</style>
</head>
<body>

<div class="bg-wrap">
  <div class="orb1"></div>
  <div class="orb2"></div>
</div>

<!-- NAV -->
<nav>
  <a href="#home" class="nav-brand">${name.split(' ')[0]}<span>.</span></a>
  <ul class="nav-ul">
    <li><a href="#home" class="active">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <a href="#contact" class="nav-hire">HIRE ME</a>
</nav>

<!-- HOME -->
<section id="home">
  <div class="home-l">
    <div class="h-greet">Hello, I'm</div>
    <div class="h-name">${name.split(' ')[0]} <span>${name.split(' ').slice(1).join(' ')}</span></div>
    <div class="h-role">And I'm a ${role}</div>
    <div class="h-bio">${bio}</div>
    <div class="h-btns">
      <a href="#contact" class="btn-p">Hire Me</a>
      <a href="#about" class="btn-o">About Me</a>
    </div>
    <div class="h-social">
      ${github   ? `<a href="https://${github}"   target="_blank" class="soc-btn">GH</a>` : ''}
      ${linkedin ? `<a href="https://${linkedin}" target="_blank" class="soc-btn">in</a>` : ''}
      ${email    ? `<a href="mailto:${email}" class="soc-btn">✉</a>` : ''}
    </div>
    <div class="stats-row">
      ${stats.map(s=>`<div class="stat-card"><div class="stat-n">${s.value}</div><div class="stat-l">${s.label}</div></div>`).join('')}
    </div>
  </div>

  <div class="home-r">
    <div class="ring-outer">
      <div class="ring-inner">
        <div class="ring-circle">${photoContent}</div>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="about-img reveal">
    ${photo ? `<img src="${photo}" alt="${name}"/>` : `<div class="about-ph">${initials}</div>`}
    <div class="corner c-tl"></div>
    <div class="corner c-br"></div>
  </div>
  <div style="flex:1">
    <div class="sec-tag reveal">About Me</div>
    <h2 class="sec-title reveal">Who Am I<span>?</span></h2>
    <div class="sec-div reveal"></div>
    <p class="reveal" style="font-size:13px;color:var(--mut);line-height:1.85;margin-bottom:20px">${about}</p>
    ${exp.length ? `
      <div class="sec-tag reveal" style="margin-top:24px">Experience</div>
      <div style="margin-top:14px">${expHTML}</div>` : ''}
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div style="text-align:center;margin-bottom:40px">
    <div class="sec-tag reveal">Expertise</div>
    <h2 class="sec-title reveal">What I <span>Know</span></h2>
    <div class="sec-div reveal" style="margin:0 auto"></div>
  </div>
  ${skills.length
    ? `<div class="sk-grid">${skillsHTML}</div>`
    : `<p style="text-align:center;color:var(--mut);padding:32px">Add your skills to display them here</p>`}
</section>

<!-- PROJECTS -->
<section id="projects">
  <div style="text-align:center;margin-bottom:40px">
    <div class="sec-tag reveal">My Work</div>
    <h2 class="sec-title reveal">Featured <span>Projects</span></h2>
    <div class="sec-div reveal" style="margin:0 auto"></div>
  </div>
  ${projects.length
    ? `<div class="proj-grid">${projHTML}</div>`
    : `<p style="text-align:center;color:var(--mut);padding:32px">Add your projects to display them here</p>`}
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="sec-tag reveal">Get In Touch</div>
  <h2 class="sec-title reveal">Contact <span>Me</span></h2>
  <div class="sec-div reveal" style="margin:0 auto 14px"></div>
  <p class="reveal" style="font-size:13px;color:var(--mut);line-height:1.8;max-width:440px;margin:0 auto">
    Available for freelance work and full-time opportunities. Let's build something great together.
  </p>
  <div class="contact-grid reveal">
    ${email    ? `<a href="mailto:${email}" class="cc"><div class="cci">✉</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:1px">Email</div><div style="font-size:13px;font-weight:500">${email}</div></div></a>` : ''}
    ${phone    ? `<a href="tel:${phone}" class="cc"><div class="cci">📞</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:1px">Phone</div><div style="font-size:13px;font-weight:500">${phone}</div></div></a>` : ''}
    ${location ? `<div class="cc"><div class="cci">📍</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:1px">Location</div><div style="font-size:13px;font-weight:500">${location}</div></div></div>` : ''}
    ${github   ? `<a href="https://${github}"   target="_blank" class="cc"><div class="cci" style="font-size:11px;font-weight:700">GH</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:1px">GitHub</div><div style="font-size:13px;font-weight:500">View Profile</div></div></a>` : ''}
    ${linkedin ? `<a href="https://${linkedin}" target="_blank" class="cc"><div class="cci" style="font-size:11px;font-weight:700">in</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:1px">LinkedIn</div><div style="font-size:13px;font-weight:500">Connect</div></div></a>` : ''}
  </div>
</section>

<footer><b>${name}</b> · Powered by <b>Resumify</b></footer>

<script>
// Scroll reveal
const ro = new IntersectionObserver(es => {
  es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.sk-item,.proj-card').forEach(el => ro.observe(el));

// Skill bars — trigger when skills section enters view
const bo = new IntersectionObserver(es => {
  es.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.sk-bar').forEach(b => { b.style.width = b.dataset.w + '%'; });
    }
  });
}, { threshold: 0.15 });
const ss = document.getElementById('skills');
if(ss) bo.observe(ss);

// Active nav link on scroll
const secs = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-ul a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if(window.scrollY >= s.offsetTop - 80) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });
</script>
</body>
</html>`;
  }
};