/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: NOVA
   File: templates/portfolio/tpl-nova.js
================================================================ */

window.TPL_NOVA = {
  id: 'nova',
  name: 'Nova',
  category: '3D Pop',
  theme: 'dark-orange',
  animated: true,

  thumbnail() {
    return `
      <div style="background:linear-gradient(135deg,#0d0800,#1a0f00);width:100%;height:100%;position:relative;overflow:hidden;font-family:sans-serif">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(255,100,0,0.12),transparent 70%)"></div>
        <div style="padding:12px 14px">
          <div style="font-size:7px;color:rgba(255,255,255,0.4);margin-bottom:2px">Hey, I am</div>
          <div style="font-size:13px;font-weight:800;color:#fff;line-height:1">Your Name</div>
          <div style="font-size:9px;font-weight:700;color:#ff6400;margin-top:2px">Web Developer</div>
          <div style="margin-top:8px;display:inline-block;background:#ff6400;color:#fff;font-size:7px;font-weight:700;padding:3px 8px;border-radius:4px">Hire me</div>
        </div>
        <div style="position:absolute;right:14px;top:24px;width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#ff6400,#ff9500);box-shadow:0 0 18px rgba(255,100,0,0.5)"></div>
        <div style="position:absolute;bottom:12px;left:12px;right:12px;display:flex;gap:5px">
          ${['2+','10+','5+'].map(n=>`<div style="flex:1;background:rgba(255,100,0,0.1);border:1px solid rgba(255,100,0,0.3);border-radius:5px;padding:3px;text-align:center"><div style="font-size:9px;font-weight:700;color:#ff6400">${n}</div></div>`).join('')}
        </div>
      </div>`;
  },

  render(data) {
    const name        = data.name        || 'Your Name';
    const role        = data.role        || 'Web Developer';
    const bio         = data.bio         || 'Passionate developer creating amazing digital experiences.';
    const photo       = data.photo       || '';
    const skills      = data.skills      || [];
    const projects    = data.projects    || [];
    const exp         = data.experience  || [];
    const testimonial = data.testimonial || { text: '', author: 'Happy Client', role: 'Product Manager' };
    const email       = data.email       || '';
    const phone       = data.phone       || '';
    const location    = data.location    || '';
    const github      = data.github      || '';
    const linkedin    = data.linkedin    || '';

    const skillsHTML = skills.map((s, i) => `
      <div class="skill-card reveal" style="transition-delay:${i*0.07}s">
        <div style="font-size:13px;font-weight:600;color:#fff;margin-bottom:10px">${s.name || s}</div>
        <div style="height:5px;background:rgba(255,255,255,0.08);border-radius:3px;overflow:hidden;margin-bottom:5px">
          <div class="sbar" data-w="${s.level||80}" style="height:100%;width:0%;background:linear-gradient(90deg,#ff6400,#ff9500);border-radius:3px;transition:width 1.3s cubic-bezier(.4,0,.2,1)"></div>
        </div>
        <div style="text-align:right;font-size:11px;color:#ff6400">${s.level||80}%</div>
      </div>`).join('');

    const expHTML = exp.map((e, i) => `
      <div class="exp-card reveal" style="transition-delay:${i*0.1}s">
        <div style="font-size:15px;font-weight:700;color:#fff">${e.title}</div>
        <div style="font-size:12px;color:#ff6400;margin:3px 0">${e.company} <span style="color:rgba(255,255,255,0.3)">· ${e.duration}</span></div>
        <div style="font-size:12px;color:rgba(255,255,255,0.5);line-height:1.7;margin-top:6px">${e.description}</div>
      </div>`).join('');

    const projHTML = projects.map((p, i) => `
      <div class="proj-card reveal" style="transition-delay:${i*0.1}s">
        <div style="height:160px;background:linear-gradient(135deg,rgba(255,100,0,0.07),rgba(255,149,0,0.03));display:flex;align-items:center;justify-content:center;border-bottom:1px solid rgba(255,100,0,0.1)">
          <span style="font-size:44px">${p.emoji||'⚡'}</span>
        </div>
        <div style="padding:18px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <div style="font-size:15px;font-weight:700;color:#fff">${p.name}</div>
            <div style="display:flex;gap:6px">
              ${p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank" style="font-size:11px;color:#ff6400;text-decoration:none;background:rgba(255,100,0,0.12);padding:3px 8px;border-radius:4px;border:1px solid rgba(255,100,0,0.25)">↗ Live</a>` : ''}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="font-size:11px;color:rgba(255,255,255,0.5);text-decoration:none;background:rgba(255,255,255,0.05);padding:3px 8px;border-radius:4px;border:1px solid rgba(255,255,255,0.1)">Code</a>` : ''}
            </div>
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.45);line-height:1.7;margin-bottom:10px">${p.description}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px">
            ${(p.tech||[]).map(t=>`<span style="font-size:10px;background:rgba(255,100,0,0.08);color:#ff9500;padding:2px 8px;border-radius:16px;border:1px solid rgba(255,100,0,0.18)">${t}</span>`).join('')}
          </div>
        </div>
      </div>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--o:#ff6400;--o2:#ff9500;--bg:#080500;--sur:rgba(255,255,255,0.04);--bdr:rgba(255,100,0,0.14);--txt:#f0e8e0;--mut:rgba(255,232,220,0.42)}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--txt);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(255,100,0,0.25);border-radius:2px}

/* background orb */
.bg{position:fixed;inset:0;z-index:0;pointer-events:none}
.orb{position:absolute;border-radius:50%;width:600px;height:600px;background:radial-gradient(circle,rgba(255,100,0,0.06),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%)}

/* NAV — only brand + links, NO download button */
nav{position:fixed;top:0;left:0;right:0;z-index:9000;height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 40px;background:rgba(8,5,0,0.92);backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,100,0,0.07)}
.brand{font-family:'Rajdhani',sans-serif;font-size:17px;font-weight:700;color:#fff;text-decoration:none}
.brand span{color:var(--o)}
.nav-ul{display:flex;gap:22px;list-style:none}
.nav-ul a{color:var(--mut);font-size:13px;text-decoration:none;font-weight:500;transition:color .2s}
.nav-ul a:hover,.nav-ul a.active{color:var(--o)}

/* SECTIONS */
section{position:relative;z-index:1;padding:80px 48px 56px}
#home{min-height:100vh;display:flex;align-items:center;padding-top:100px;gap:32px}
.hero-l{flex:1}
.tag{font-size:12px;color:var(--mut);letter-spacing:.1em;margin-bottom:8px;opacity:0;animation:up .5s .1s forwards}
.hname{font-family:'Rajdhani',sans-serif;font-size:clamp(34px,5vw,58px);font-weight:700;color:#fff;line-height:1.08;margin-bottom:6px;opacity:0;animation:up .5s .22s forwards}
.hrole{font-size:clamp(16px,2.4vw,22px);font-weight:700;color:var(--o);margin-bottom:16px;opacity:0;animation:up .5s .36s forwards}
.hbio{font-size:13px;color:var(--mut);line-height:1.85;max-width:450px;margin-bottom:22px;opacity:0;animation:up .5s .5s forwards}
.hbtns{display:flex;gap:12px;opacity:0;animation:up .5s .64s forwards}
.btn-h{background:var(--o);color:#fff;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;transition:all .25s}
.btn-h:hover{box-shadow:0 0 24px rgba(255,100,0,0.4);transform:translateY(-2px)}
.btn-g{background:transparent;border:1px solid rgba(255,255,255,0.16);color:#fff;padding:10px 24px;border-radius:8px;font-size:13px;text-decoration:none;transition:all .2s}
.btn-g:hover{border-color:var(--o);color:var(--o)}

/* Testimonial */
.testi{margin-top:26px;opacity:0;animation:up .5s 1.1s forwards}
.tcard{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,100,0,0.1);border-radius:12px;padding:11px 14px;max-width:340px}
.tav{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#ff6400,#ff9500);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff}
.ttxt{font-size:11px;color:rgba(255,255,255,0.48);font-style:italic;line-height:1.5}
.tau{font-size:10px;color:var(--o);margin-top:3px}

/* Hero right */
.hero-r{flex-shrink:0;width:380px;height:460px;position:relative}
.photo-wrap{position:absolute;right:16px;bottom:0;width:240px;height:300px;opacity:0;transform:translateY(36px) scale(0.92);transition:all .75s cubic-bezier(.34,1.2,.64,1);transition-delay:1.8s}
.photo-wrap.px{opacity:1;transform:translateY(0) scale(1)}
.pring{width:220px;height:220px;border-radius:50%;background:radial-gradient(circle,rgba(255,100,0,0.18),transparent 70%);position:absolute;bottom:18px;left:50%;transform:translateX(-50%);animation:pulse 3s ease-in-out infinite}
.pcircle{width:190px;height:190px;border-radius:50%;overflow:hidden;background:rgba(255,100,0,0.08);border:3px solid rgba(255,100,0,0.38);position:absolute;bottom:26px;left:50%;transform:translateX(-50%);box-shadow:0 0 36px rgba(255,100,0,0.22)}
.pcircle img{width:100%;height:100%;object-fit:cover}

/* Stat floats */
.sf{position:absolute;background:rgba(255,255,255,0.05);backdrop-filter:blur(10px);border:1px solid rgba(255,100,0,0.18);border-radius:12px;padding:11px 15px;opacity:0;transform:scale(0.8) translateY(18px);transition:all .55s cubic-bezier(.34,1.4,.64,1)}
.sf.px{opacity:1;transform:scale(1) translateY(0)}
.sf1{top:38px;left:0;transition-delay:2.3s}
.sf2{top:136px;right:0;transition-delay:2.6s}
.sf3{bottom:90px;left:8px;transition-delay:2.9s}
.sn{font-family:'Rajdhani',sans-serif;font-size:19px;font-weight:700;color:var(--o)}
.sl{font-size:10px;color:var(--mut);margin-top:1px}

/* Floating icons */
.fi{position:absolute;opacity:0;transform:scale(0);transition:all .45s cubic-bezier(.34,1.56,.64,1)}
.fi.px{opacity:1;transform:scale(1)}
.fib{border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:20px;animation:floatY 3s ease-in-out infinite}

/* Section common */
.stag{font-size:11px;color:var(--o);letter-spacing:.18em;text-transform:uppercase;margin-bottom:8px}
.stitle{font-family:'Rajdhani',sans-serif;font-size:clamp(24px,3vw,38px);font-weight:700;color:#fff;margin-bottom:5px}
.stitle span{color:var(--o)}
.sdiv{width:44px;height:3px;background:linear-gradient(90deg,var(--o),var(--o2));border-radius:2px;margin-bottom:28px}

/* Skills */
.skills-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.skill-card{background:var(--sur);border:1px solid var(--bdr);border-radius:11px;padding:15px;transition:all .25s}
.skill-card:hover{border-color:rgba(255,100,0,0.38);background:rgba(255,100,0,0.04)}

/* Experience */
.exp-g{display:flex;flex-direction:column;gap:12px;max-width:680px;margin:0 auto}
.exp-card{background:var(--sur);border:1px solid var(--bdr);border-radius:12px;padding:18px;transition:all .25s}
.exp-card:hover{border-color:rgba(255,100,0,0.28);transform:translateX(4px)}

/* Projects */
.proj-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px}
.proj-card{background:var(--sur);border:1px solid var(--bdr);border-radius:12px;overflow:hidden;transition:all .25s}
.proj-card:hover{border-color:rgba(255,100,0,0.32);transform:translateY(-4px);box-shadow:0 16px 32px rgba(0,0,0,0.4)}

/* Contact */
#contact{text-align:center}
.contact-g{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:28px}
.cc{background:var(--sur);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit;transition:all .25s}
.cc:hover{border-color:rgba(255,100,0,0.38);background:rgba(255,100,0,0.04);transform:translateY(-2px)}
.cci{width:38px;height:38px;border-radius:8px;background:rgba(255,100,0,0.1);display:flex;align-items:center;justify-content:center;color:var(--o);font-size:16px;flex-shrink:0}

footer{position:relative;z-index:1;padding:22px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);font-size:12px;color:var(--mut)}
footer b{color:var(--o)}

@keyframes up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{transform:translateX(-50%) scale(1);opacity:.55}50%{transform:translateX(-50%) scale(1.07);opacity:1}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s,transform .65s}
.reveal.visible{opacity:1;transform:translateY(0)}

@media(max-width:768px){
  nav{padding:0 16px}.nav-ul{display:none}
  #home{flex-direction:column;padding:80px 20px 32px;gap:20px}
  .hero-r{width:100%;height:260px}
  .photo-wrap{right:50%;transform:translateX(50%) translateY(36px) scale(.92)}
  .photo-wrap.px{transform:translateX(50%) translateY(0) scale(1)}
  .sf1,.sf2,.sf3{display:none}
  section{padding:60px 20px 36px}
  .skills-g,.proj-g{grid-template-columns:1fr}
}
</style>
</head>
<body>

<div class="bg"><div class="orb"></div></div>

<nav>
  <a href="#home" class="brand">${name.split(' ')[0]}<span>.</span></a>
  <ul class="nav-ul">
    <li><a href="#home" class="active">Home</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<section id="home">
  <div class="hero-l">
    <div class="tag">Hey, I am</div>
    <div class="hname">${name}</div>
    <div class="hrole">${role}</div>
    <div class="hbio">${bio}</div>
    <div class="hbtns">
      <a href="#contact" class="btn-h">✉ Hire me</a>
      <a href="#projects" class="btn-g">View Work</a>
    </div>
    ${testimonial.text ? `
    <div class="testi">
      <div class="tcard">
        <div class="tav">${(testimonial.author||'C')[0]}</div>
        <div>
          <div class="ttxt">"${testimonial.text}"</div>
          <div class="tau">— ${testimonial.author}${testimonial.role?', '+testimonial.role:''}</div>
        </div>
      </div>
    </div>` : ''}
  </div>

  <div class="hero-r">
    <!-- Floating icons -->
    <div class="fi" id="fi1" style="top:28px;right:76px;transition-delay:2.15s">
      <div class="fib" style="width:44px;height:44px;background:rgba(97,218,251,0.1);border:1px solid rgba(97,218,251,0.22);animation-duration:3.2s">⚛</div>
    </div>
    <div class="fi" id="fi2" style="top:106px;right:6px;transition-delay:2.35s">
      <div class="fib" style="width:40px;height:40px;background:rgba(247,223,30,0.1);border:1px solid rgba(247,223,30,0.18);animation-duration:3.6s;font-size:16px;font-weight:700;color:#f7df1e">JS</div>
    </div>
    <div class="fi" id="fi3" style="top:188px;right:50px;transition-delay:2.55s">
      <div class="fib" style="width:40px;height:40px;background:rgba(41,101,241,0.1);border:1px solid rgba(41,101,241,0.22);animation-duration:2.9s">🎨</div>
    </div>
    <div class="fi" id="fi4" style="top:64px;left:6px;transition-delay:2.75s">
      <div class="fib" style="width:40px;height:40px;background:rgba(104,160,99,0.1);border:1px solid rgba(104,160,99,0.22);animation-duration:3.4s">🟢</div>
    </div>

    <!-- Photo -->
    <div class="photo-wrap" id="pw">
      <div class="pring"></div>
      <div class="pcircle">
        ${photo ? `<img src="${photo}" alt="${name}"/>` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:800;color:#ff6400;font-family:'Rajdhani',sans-serif">${name[0]?.toUpperCase()}</div>`}
      </div>
    </div>

    <!-- Stats -->
    <div class="sf sf1" id="sf1"><div class="sn">${data.stats?.[0]?.value||'2+'}</div><div class="sl">${data.stats?.[0]?.label||'Years Exp.'}</div></div>
    <div class="sf sf2" id="sf2"><div class="sn">${data.stats?.[1]?.value||'10+'}</div><div class="sl">${data.stats?.[1]?.label||'Projects'}</div></div>
    <div class="sf sf3" id="sf3"><div class="sn">${data.stats?.[2]?.value||'5+'}</div><div class="sl">${data.stats?.[2]?.label||'Technologies'}</div></div>
  </div>
</section>

<section id="skills">
  <div style="text-align:center">
    <div class="stag reveal">Expertise</div>
    <h2 class="stitle reveal">My <span>Skills</span></h2>
    <div class="sdiv reveal" style="margin:0 auto 28px"></div>
  </div>
  ${skills.length ? `<div class="skills-g">${skillsHTML}</div>` : '<p style="text-align:center;color:var(--mut);padding:32px">Add your skills to show them here</p>'}
</section>

<section id="experience">
  <div style="text-align:center;margin-bottom:32px">
    <div class="stag reveal">Journey</div>
    <h2 class="stitle reveal">Work <span>Experience</span></h2>
    <div class="sdiv reveal" style="margin:0 auto"></div>
  </div>
  ${exp.length ? `<div class="exp-g">${expHTML}</div>` : '<p style="text-align:center;color:var(--mut);padding:32px">Add your experience to show it here</p>'}
</section>

<section id="projects">
  <div style="text-align:center;margin-bottom:32px">
    <div class="stag reveal">Portfolio</div>
    <h2 class="stitle reveal">My <span>Projects</span></h2>
    <div class="sdiv reveal" style="margin:0 auto"></div>
  </div>
  ${projects.length ? `<div class="proj-g">${projHTML}</div>` : '<p style="text-align:center;color:var(--mut);padding:32px">Add your projects to show them here</p>'}
</section>

<section id="contact">
  <div class="stag reveal">Get In Touch</div>
  <h2 class="stitle reveal">Connect <span>With Me</span></h2>
  <div class="sdiv reveal" style="margin:0 auto 14px"></div>
  <p class="reveal" style="font-size:13px;color:var(--mut);max-width:440px;margin:0 auto;line-height:1.85">Open for new opportunities. Whether you have a project or just want to say hi — reach out!</p>
  <div class="contact-g reveal">
    ${email    ? `<a href="mailto:${email}" class="cc"><div class="cci">✉</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:2px">Email</div><div style="font-size:13px;font-weight:500">${email}</div></div></a>` : ''}
    ${phone    ? `<a href="tel:${phone}" class="cc"><div class="cci">📞</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:2px">Phone</div><div style="font-size:13px;font-weight:500">${phone}</div></div></a>` : ''}
    ${location ? `<div class="cc"><div class="cci">📍</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:2px">Location</div><div style="font-size:13px;font-weight:500">${location}</div></div></div>` : ''}
    ${github   ? `<a href="https://${github}"   target="_blank" class="cc"><div class="cci" style="font-size:12px;font-weight:700">GH</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:2px">GitHub</div><div style="font-size:13px;font-weight:500">View Profile</div></div></a>` : ''}
    ${linkedin ? `<a href="https://${linkedin}" target="_blank" class="cc"><div class="cci" style="font-size:12px;font-weight:700">in</div><div><div style="font-size:10px;color:var(--mut);margin-bottom:2px">LinkedIn</div><div style="font-size:13px;font-weight:500">Connect</div></div></a>` : ''}
  </div>
</section>

<footer>Built by <b>${name}</b> · Powered by <b>Resumify</b></footer>

<script>
// Pop-in after 1.8s
setTimeout(() => {
  ['pw','sf1','sf2','sf3','fi1','fi2','fi3','fi4'].forEach(id => {
    document.getElementById(id)?.classList.add('px');
  });
}, 1800);

// Scroll reveal
const ro = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }), { threshold:0.1 });
document.querySelectorAll('.reveal,.skill-card,.exp-card,.proj-card').forEach(el => ro.observe(el));

// Skill bars
const bo = new IntersectionObserver(es => es.forEach(e => {
  if(e.isIntersecting) e.target.querySelectorAll('.sbar').forEach(b => { b.style.width = b.dataset.w + '%'; });
}), { threshold:0.15 });
const ss = document.getElementById('skills');
if(ss) bo.observe(ss);

// Active nav
const secs = document.querySelectorAll('section[id]');
const nas  = document.querySelectorAll('.nav-ul a');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if(window.scrollY >= s.offsetTop - 80) cur = s.id; });
  nas.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive:true });
</script>
</body>
</html>`;
  }
};