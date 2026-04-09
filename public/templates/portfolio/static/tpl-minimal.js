/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: MINIMAL PRO
   File: templates/portfolio/tpl-minimal.js
   Style: Clean white, typography-first, elegant scroll reveals
================================================================ */

window.TPL_MINIMAL = {
  id: 'minimal',
  name: 'Minimal Pro',
  category: 'Minimal',
  theme: 'clean-white',
  animated: false,

  thumbnail() {
    return `
      <div style="background:#f8f8fa;width:100%;height:100%;padding:16px;font-family:'Cormorant Garamond',serif">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid #e0e0ea">
          <div style="width:28px;height:28px;border-radius:50%;background:#1a1a2e;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0">J</div>
          <div style="display:flex;gap:12px">
            ${['Home','About','Skills','Work','Contact'].map(l=>`<span style="font-size:7px;color:#888">${l}</span>`).join('')}
          </div>
        </div>
        <div style="margin-bottom:10px">
          <div style="font-size:14px;font-weight:700;color:#1a1a2e;letter-spacing:-.02em">Your Name</div>
          <div style="font-size:8px;color:#7c3aed;margin-top:2px;letter-spacing:.08em;text-transform:uppercase">Frontend Developer</div>
        </div>
        <div style="height:1px;background:#e8e8f0;margin-bottom:8px"></div>
        <div style="font-size:7px;color:#888;line-height:1.6;margin-bottom:10px">Passionate about building beautiful digital experiences that make a difference.</div>
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          ${['React','TypeScript','Node.js'].map(t=>`<span style="font-size:6px;border:1px solid #e0e0ea;color:#666;padding:2px 6px;border-radius:3px">${t}</span>`).join('')}
        </div>
      </div>`;
  },

  render(data) {
    const name     = data.name        || 'Your Name';
    const role     = data.role        || 'Developer';
    const bio      = data.bio         || 'Building beautiful digital experiences.';
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
    const stats    = data.stats       || [];

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    const photoHTML = photo
      ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover"/>`
      : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:700;color:#fff;font-family:'Cormorant Garamond',serif;background:linear-gradient(135deg,#1a1a2e,#2d1b69)">${initials}</div>`;

    const skillsHTML = skills.map((s, i) => `
      <div class="skill-row reveal" style="transition-delay:${i * 0.06}s;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:13px;color:#1a1a2e;font-weight:500">${s.name || s}</span>
          <span style="font-size:12px;color:#7c3aed">${s.level || 80}%</span>
        </div>
        <div style="height:3px;background:#f0f0f5;border-radius:2px;overflow:hidden">
          <div class="min-bar" data-w="${s.level || 80}" style="height:100%;width:0%;background:linear-gradient(90deg,#7c3aed,#a78bfa);border-radius:2px;transition:width 1.2s cubic-bezier(.4,0,.2,1)"></div>
        </div>
      </div>`).join('');

    const expHTML = exp.map((e, i) => `
      <div class="reveal" style="transition-delay:${i * 0.1}s;margin-bottom:28px;padding-left:20px;border-left:2px solid #f0f0f5;position:relative">
        <div style="position:absolute;left:-5px;top:6px;width:8px;height:8px;border-radius:50%;background:#7c3aed"></div>
        <div style="font-size:15px;font-weight:600;color:#1a1a2e">${e.title}</div>
        <div style="font-size:12px;color:#7c3aed;margin:3px 0">${e.company} · <span style="color:#888">${e.duration}</span></div>
        <div style="font-size:13px;color:#555;line-height:1.75">${e.description}</div>
      </div>`).join('');

    const projHTML = projects.map((p, i) => `
      <div class="reveal proj-card-min" style="transition-delay:${i * 0.12}s;border:1px solid #e8e8f0;border-radius:12px;overflow:hidden;transition:all .3s;margin-bottom:0">
        <div style="height:140px;background:linear-gradient(135deg,#f5f0ff,#faf5ff);display:flex;align-items:center;justify-content:center;border-bottom:1px solid #eee8ff;position:relative">
          <div style="font-size:44px">${p.emoji || '📁'}</div>
          <div style="position:absolute;top:12px;right:12px;display:flex;gap:6px">
            ${p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank" style="width:28px;height:28px;border-radius:6px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.2);display:flex;align-items:center;justify-content:center;color:#7c3aed;text-decoration:none;font-size:11px">↗</a>` : ''}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="width:28px;height:28px;border-radius:6px;background:#f5f5f5;border:1px solid #eee;display:flex;align-items:center;justify-content:center;color:#555;text-decoration:none;font-size:11px"><i class='fab fa-github'></i></a>` : ''}
          </div>
        </div>
        <div style="padding:18px">
          <div style="font-size:15px;font-weight:600;color:#1a1a2e;margin-bottom:6px">${p.name}</div>
          <div style="font-size:12px;color:#666;line-height:1.7;margin-bottom:12px">${p.description}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${(p.tech||[]).map(t=>`<span style="font-size:10px;background:#f5f0ff;color:#7c3aed;padding:3px 9px;border-radius:20px;border:1px solid #e8d8ff">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');

    const statsHTML = stats.map(s => `
      <div class="reveal" style="text-align:center;padding:20px">
        <div style="font-size:28px;font-weight:700;color:#1a1a2e;font-family:'Cormorant Garamond',serif">${s.value}</div>
        <div style="font-size:11px;color:#888;margin-top:4px;letter-spacing:.04em">${s.label}</div>
      </div>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--violet:#7c3aed;--violet2:#a78bfa;--dark:#1a1a2e;--text:#333;--muted:#888;--border:#e8e8f0;--bg:#fafafa;--surface:#fff}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#e0d8f8;border-radius:2px}
/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:1000;height:60px;background:rgba(250,250,250,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 56px}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-avatar{width:32px;height:32px;border-radius:50%;overflow:hidden;background:var(--dark);flex-shrink:0}
.nav-name{font-size:14px;font-weight:600;color:var(--dark);font-family:'Cormorant Garamond',serif}
.nav-links{display:flex;gap:28px}
.nav-links a{color:var(--muted);font-size:13px;text-decoration:none;font-weight:400;transition:color .2s}
.nav-links a:hover,.nav-links a.active{color:var(--violet)}
.nav-cta{background:var(--dark);color:#fff;padding:8px 20px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;font-family:'DM Sans',sans-serif;transition:all .2s;letter-spacing:.04em}
.nav-cta:hover{background:var(--violet)}
/* SECTIONS */
section{padding:100px 56px 80px;max-width:1100px;margin:0 auto}
/* HOME */
#home{min-height:100vh;display:flex;align-items:center;gap:80px;padding-top:120px;max-width:100%;padding-left:8vw;padding-right:8vw}
.home-text{flex:1}
.home-tag{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--violet);margin-bottom:16px;opacity:0;animation:fadeUp .7s .1s forwards}
.home-name{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,6vw,80px);font-weight:700;color:var(--dark);line-height:1.05;letter-spacing:-.02em;margin-bottom:10px;opacity:0;animation:fadeUp .7s .25s forwards}
.home-role{font-size:clamp(16px,2vw,22px);color:var(--violet);font-weight:400;margin-bottom:24px;opacity:0;animation:fadeUp .7s .4s forwards;font-family:'Cormorant Garamond',serif;font-style:italic}
.home-bio{font-size:15px;color:var(--muted);line-height:1.85;max-width:500px;margin-bottom:36px;opacity:0;animation:fadeUp .7s .55s forwards}
.home-btns{display:flex;gap:14px;margin-bottom:36px;opacity:0;animation:fadeUp .7s .7s forwards}
.btn-dark{background:var(--dark);color:#fff;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;transition:all .3s}
.btn-dark:hover{background:var(--violet);transform:translateY(-2px)}
.btn-light{background:transparent;border:1.5px solid var(--border);color:var(--dark);padding:12px 28px;border-radius:8px;font-size:13px;font-weight:500;text-decoration:none;transition:all .2s}
.btn-light:hover{border-color:var(--violet);color:var(--violet)}
.home-social{display:flex;gap:12px;opacity:0;animation:fadeUp .7s .85s forwards}
.social-btn{width:38px;height:38px;border-radius:8px;border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--muted);text-decoration:none;transition:all .2s;font-size:14px}
.social-btn:hover{border-color:var(--violet);color:var(--violet)}
/* Home photo */
.home-photo{flex-shrink:0;opacity:0;animation:fadeIn .8s .9s forwards}
.photo-frame{width:320px;height:380px;border-radius:24px;overflow:hidden;position:relative;box-shadow:0 24px 60px rgba(124,58,237,0.12)}
.photo-frame::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(124,58,237,0.08),transparent);z-index:1;pointer-events:none}
.photo-deco{position:absolute;width:100px;height:100px;border:2px solid rgba(124,58,237,0.2);border-radius:16px;bottom:-20px;right:-20px;z-index:-1}
.photo-deco2{position:absolute;width:60px;height:60px;border:2px solid rgba(124,58,237,0.15);border-radius:10px;top:-15px;left:-15px;z-index:-1}
/* Stats bar */
.stats-bar{background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border);display:grid;grid-template-columns:repeat(4,1fr);max-width:100%;margin:0}
.stats-bar > div{border-right:1px solid var(--border)}
.stats-bar > div:last-child{border-right:none}
/* Section styles */
.sec-label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--violet);margin-bottom:12px}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4vw,52px);font-weight:700;color:var(--dark);line-height:1.1;margin-bottom:8px;letter-spacing:-.01em}
.sec-div{width:40px;height:2px;background:linear-gradient(90deg,var(--violet),var(--violet2));border-radius:1px;margin-bottom:36px}
/* About grid */
.about-grid{display:grid;grid-template-columns:1fr 340px;gap:60px;align-items:start}
.about-img{width:100%;height:380px;border-radius:20px;overflow:hidden;position:relative;box-shadow:0 16px 40px rgba(0,0,0,0.08)}
.about-img img{width:100%;height:100%;object-fit:cover}
.about-img-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#f5f0ff,#faf5ff);font-size:64px;font-family:'Cormorant Garamond',serif;font-weight:700;color:var(--violet)}
/* Skills */
#skills{background:var(--surface);max-width:100%;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:80px 8vw}
.skills-inner{max-width:1100px;margin:0 auto}
.skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:0 48px}
/* Projects */
.proj-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}
.proj-card-min{transition:all .3s}
.proj-card-min:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(124,58,237,0.1);border-color:rgba(124,58,237,0.3) !important}
/* Contact */
#contact{text-align:center;max-width:100%;padding:80px 8vw;background:var(--dark)}
.contact-grid{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:36px}
.contact-chip{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px 22px;display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;transition:all .3s}
.contact-chip:hover{background:rgba(124,58,237,0.15);border-color:rgba(124,58,237,0.3);transform:translateY(-2px)}
.contact-icon{width:38px;height:38px;border-radius:8px;background:rgba(124,58,237,0.15);display:flex;align-items:center;justify-content:center;color:var(--violet2);font-size:16px;flex-shrink:0}
/* Footer */
footer{padding:28px;text-align:center;font-size:12px;color:var(--muted);border-top:1px solid var(--border)}
footer span{color:var(--violet)}
/* Animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.reveal{opacity:0;transform:translateY(32px);transition:opacity .7s,transform .7s}
.reveal.visible{opacity:1;transform:translateY(0)}
/* Mobile */
@media(max-width:768px){
  nav{padding:0 20px}.nav-links{display:none}
  #home{flex-direction:column-reverse;gap:32px;padding:100px 20px 40px;text-align:center}
  .home-btns,.home-social{justify-content:center}
  .home-photo{width:100%}.photo-frame{width:100%;height:240px}
  section{padding:70px 20px 50px}
  .about-grid{grid-template-columns:1fr}
  .skills-grid{grid-template-columns:1fr}
  .stats-bar{grid-template-columns:repeat(2,1fr)}
  #skills,#contact{padding:60px 20px}
}
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#home" class="nav-logo">
    <div class="nav-avatar">${photoHTML}</div>
    <span class="nav-name">${name}</span>
  </a>
  <div class="nav-links">
    <a href="#home"     class="active">Home</a>
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Work</a>
    <a href="#contact">Contact</a>
  </div>
  <a href="#contact" class="nav-cta">Hire Me</a>
</nav>

<!-- HOME -->
<section id="home" style="max-width:100%">
  <div class="home-text">
    <div class="home-tag">Portfolio</div>
    <h1 class="home-name">${name}</h1>
    <div class="home-role">${role}</div>
    <p class="home-bio">${bio}</p>
    <div class="home-btns">
      <a href="#projects" class="btn-dark">View My Work</a>
      <a href="#contact"  class="btn-light">Get In Touch</a>
    </div>
    <div class="home-social">
      ${github   ? `<a href="https://${github}"   target="_blank" class="social-btn"><i class="fab fa-github"></i></a>` : ''}
      ${linkedin ? `<a href="https://${linkedin}" target="_blank" class="social-btn"><i class="fab fa-linkedin"></i></a>` : ''}
      ${email    ? `<a href="mailto:${email}" class="social-btn"><i class="fas fa-envelope"></i></a>` : ''}
    </div>
  </div>
  <div class="home-photo">
    <div style="position:relative">
      <div class="photo-frame">
        ${photo ? `<img src="${photo}" alt="${name}"/>` : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#f5f0ff,#1a1a2e);display:flex;align-items:center;justify-content:center;font-size:80px;font-family:'Cormorant Garamond',serif;font-weight:700;color:#a78bfa">${initials}</div>`}
      </div>
      <div class="photo-deco"></div>
      <div class="photo-deco2"></div>
    </div>
  </div>
</section>

<!-- STATS BAR -->
${stats.length ? `<div class="stats-bar">${statsHTML}</div>` : ''}

<!-- ABOUT -->
<section id="about">
  <div class="about-grid">
    <div>
      <div class="sec-label reveal">About Me</div>
      <h2 class="sec-title reveal">Who I Am</h2>
      <div class="sec-div reveal"></div>
      <p class="reveal" style="font-size:14px;color:#555;line-height:1.9;margin-bottom:20px">${about}</p>
      ${exp.length ? `
        <div class="sec-label reveal" style="margin-top:32px">Experience</div>
        <div style="margin-top:16px">${expHTML}</div>` : ''}
    </div>
    <div class="reveal" style="transition-delay:.2s">
      <div class="about-img">
        ${photo ? `<img src="${photo}" alt="${name}"/>` : `<div class="about-img-placeholder">${initials}</div>`}
      </div>
    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills" style="max-width:100%">
  <div class="skills-inner">
    <div style="text-align:center;margin-bottom:48px">
      <div class="sec-label reveal">Expertise</div>
      <h2 class="sec-title reveal">My Skills</h2>
      <div class="sec-div reveal" style="margin:0 auto"></div>
    </div>
    ${skills.length
      ? `<div class="skills-grid">${skillsHTML}</div>`
      : `<div style="text-align:center;color:var(--muted);padding:40px">Add your skills to display them here</div>`}
  </div>
</section>

<!-- PROJECTS -->
<section id="projects">
  <div style="text-align:center;margin-bottom:48px">
    <div class="sec-label reveal">My Work</div>
    <h2 class="sec-title reveal">Selected Projects</h2>
    <div class="sec-div reveal" style="margin:0 auto"></div>
  </div>
  ${projects.length
    ? `<div class="proj-grid">${projHTML}</div>`
    : `<div style="text-align:center;color:var(--muted);padding:40px">Add your projects to display them here</div>`}
</section>

<!-- CONTACT -->
<section id="contact" style="max-width:100%">
  <div class="sec-label reveal" style="color:rgba(255,255,255,0.4)">Get In Touch</div>
  <h2 class="sec-title reveal" style="color:#fff">Let's Work Together</h2>
  <div class="sec-div reveal" style="margin:0 auto 20px"></div>
  <p class="reveal" style="font-size:14px;color:rgba(255,255,255,0.5);max-width:480px;margin:0 auto;line-height:1.85">
    Available for freelance projects and full-time opportunities. Let's build something great together.
  </p>
  <div class="contact-grid reveal">
    ${email    ? `<a href="mailto:${email}" class="contact-chip"><div class="contact-icon"><i class="fas fa-envelope"></i></div><div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px">Email</div><div style="font-size:13px;color:#fff;font-weight:500">${email}</div></div></a>` : ''}
    ${phone    ? `<a href="tel:${phone}" class="contact-chip"><div class="contact-icon"><i class="fas fa-phone"></i></div><div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px">Phone</div><div style="font-size:13px;color:#fff;font-weight:500">${phone}</div></div></a>` : ''}
    ${location ? `<div class="contact-chip"><div class="contact-icon"><i class="fas fa-location-dot"></i></div><div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px">Location</div><div style="font-size:13px;color:#fff;font-weight:500">${location}</div></div></div>` : ''}
    ${github   ? `<a href="https://${github}"   target="_blank" class="contact-chip"><div class="contact-icon"><i class="fab fa-github"></i></div><div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px">GitHub</div><div style="font-size:13px;color:#fff;font-weight:500">View Profile</div></div></a>` : ''}
    ${linkedin ? `<a href="https://${linkedin}" target="_blank" class="contact-chip"><div class="contact-icon"><i class="fab fa-linkedin"></i></div><div><div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:2px">LinkedIn</div><div style="font-size:13px;color:#fff;font-weight:500">Connect</div></div></a>` : ''}
  </div>
</section>

<footer>
  <p>Designed & built by <span>${name}</span> · Powered by <span>Resumify</span></p>
</footer>

<script>
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal,.skill-row,.proj-card-min').forEach(el => obs.observe(el));

// Skill bars
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.min-bar').forEach(b => { b.style.width = b.dataset.w + '%'; });
    }
  });
}, { threshold: 0.2 });
const skillsSec = document.getElementById('skills');
if(skillsSec) barObs.observe(skillsSec);

// Active nav
const secs = document.querySelectorAll('section');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if(window.scrollY >= s.offsetTop - 80) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});
</script>
</body>
</html>`;
  }
};