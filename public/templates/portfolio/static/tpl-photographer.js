/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: PHOTOGRAPHER
   Style: Dark Gallery · Film Strip · Minimal · Static
================================================================ */

window.TPL_PHOTOGRAPHER = {
  id: 'photographer',
  name: 'Photographer',
  category: 'Static Pro',
  theme: 'dark-gallery',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:#0d0d0d;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Helvetica',sans-serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">📸</div>
        <div style="font-size:16px;font-weight:700;color:#fff">Photographer</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:6px;letter-spacing:0.2em">CAPTURE · COMPOSE · CREATE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Photographer';
    const bio = data.bio || 'Capturing moments that tell stories.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'photo@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Portrait','Landscape','Street','Editorial'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Photography Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d0d;color:#fff;font-family:'Inter',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative}
.film-strip{position:absolute;top:0;left:50px;width:36px;height:100%;background:repeating-linear-gradient(180deg,#1a1a1a 0px,#1a1a1a 40px,#0d0d0d 40px,#0d0d0d 50px);opacity:0.3}
.film-strip.right{left:auto;right:50px}
.hero-inner{text-align:center;z-index:2}
.shutter{font-size:100px;margin-bottom:24px}
.hero h1{font-size:clamp(40px,8vw,80px);font-weight:900;letter-spacing:-0.04em;line-height:1}
.hero .sub{font-size:13px;font-weight:200;letter-spacing:0.5em;color:rgba(255,255,255,0.4);margin-top:16px;text-transform:uppercase}
.hero .bio{max-width:400px;margin:20px auto 0;font-size:14px;color:rgba(255,255,255,0.3);line-height:1.9;font-weight:300}
.content{max-width:800px;margin:0 auto;padding:80px 24px}
.sep{width:40px;height:1px;background:rgba(255,255,255,0.15);margin:60px 0}
.lbl{font-size:10px;letter-spacing:0.5em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600;margin-bottom:8px}
.ttl{font-size:clamp(24px,4vw,36px);font-weight:800;letter-spacing:-0.02em;margin-bottom:20px}
.about{font-size:15px;color:rgba(255,255,255,0.55);line-height:2;font-weight:300}
.skill-strip{display:flex;gap:12px;flex-wrap:wrap}
.skill-pill{padding:10px 22px;border:1px solid rgba(255,255,255,0.12);font-size:12px;font-weight:600;color:rgba(255,255,255,0.7);letter-spacing:0.05em}
.exp-block{padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.06)}
.exp-role{font-size:17px;font-weight:800}
.exp-co{font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px}
.exp-dur{font-size:11px;color:rgba(255,255,255,0.25);margin-top:2px}
.exp-desc{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.7;margin-top:8px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.proj-item{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);padding:24px;transition:all 0.3s}
.proj-item:hover{background:rgba(255,255,255,0.06);transform:translateY(-2px)}
.proj-em{font-size:32px;margin-bottom:12px}
.proj-nm{font-weight:800;font-size:15px}
.proj-ds{font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;line-height:1.6}
.proj-tg{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.proj-tg span{font-size:10px;padding:3px 8px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5)}
.contact-sec{text-align:center;padding:80px 24px;border-top:1px solid rgba(255,255,255,0.06)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
.c-link{padding:10px 22px;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{border-color:#fff;color:#fff}
footer{text-align:center;padding:30px;font-size:10px;color:rgba(255,255,255,0.2)}
</style></head><body>

<div class="hero">
  <div class="film-strip"></div>
  <div class="film-strip right"></div>
  <div class="hero-inner">
    <div class="shutter">📸</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="content">
  <div class="lbl">About</div>
  <div class="ttl">My Vision</div>
  <p class="about">${about}</p>

  <div class="sep"></div>

  <div class="lbl">Specialties</div>
  <div class="ttl">What I Shoot</div>
  <div class="skill-strip">
    ${skillNames.map(s => `<div class="skill-pill">${s}</div>`).join('')}
  </div>

  <div class="sep"></div>

  <div class="lbl">Experience</div>
  <div class="ttl">My Journey</div>
  ${experience.length ? experience.map(e => `
    <div class="exp-block">
      <div class="exp-role">${e.title}</div>
      <div class="exp-co">${e.company}</div>
      <div class="exp-dur">${e.duration}</div>
      <p class="exp-desc">${e.description || ''}</p>
    </div>`).join('') : '<div class="exp-block"><div class="exp-role">Lead Photographer</div><div class="exp-co">Your Studio</div><div class="exp-dur">2020 – Present</div></div>'}

  <div class="sep"></div>

  <div class="lbl">Portfolio</div>
  <div class="ttl">Selected Work</div>
  <div class="proj-grid">
    ${projects.length ? projects.map(p => `
      <div class="proj-item">
        <div class="proj-em">${p.emoji || '🖼️'}</div>
        <div class="proj-nm">${p.name}</div>
        <p class="proj-ds">${p.description || ''}</p>
        <div class="proj-tg">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div>
      </div>`).join('') : '<div class="proj-item"><div class="proj-em">🖼️</div><div class="proj-nm">Your Project</div><p class="proj-ds">Showcase your photography here.</p></div>'}
  </div>
</div>

<div class="contact-sec">
  <div class="lbl">Contact</div>
  <div class="ttl">Let's Create</div>
  <div class="c-links">
    <a href="mailto:${email}" class="c-link">📧 ${email}</a>
    ${github ? `<a href="${github}" target="_blank" class="c-link">🐙 GitHub</a>` : ''}
    ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
    <span class="c-link">📍 ${location}</span>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
