/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: VETERINARIAN
   Style: Warm Pet · Soft Green · Caring · Static
================================================================ */

window.TPL_VET = {
  id: 'vet',
  name: 'Veterinarian',
  category: 'Static Pro',
  theme: 'pet-care',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#f5f0e8,#faf6f0);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🐾</div>
        <div style="font-size:16px;font-weight:700;color:#6b8e5a">Veterinarian</div>
        <div style="font-size:10px;color:rgba(107,142,90,0.5);margin-top:6px;letter-spacing:0.2em">CARE · HEAL · LOVE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Veterinarian';
    const bio = data.bio || 'Dedicated to the health and wellbeing of our beloved animals.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'vet@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Surgery','Dentistry','Dermatology','Emergency Care'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dr. ${name} — Veterinary Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Fredoka:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf8f4;color:#3a3a3a;font-family:'Quicksand',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#6b8e5a,#8ab472,#a5c994);position:relative;overflow:hidden}
.paw-bg{position:absolute;inset:0;opacity:0.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ctext x='20' y='50' font-size='30'%3E🐾%3C/text%3E%3C/svg%3E")}
.hero-inner{z-index:2;padding:40px}
.paw{font-size:90px;margin-bottom:16px}
.hero h1{font-family:'Fredoka',sans-serif;font-size:clamp(36px,7vw,64px);color:#fff;font-weight:600}
.hero .sub{font-size:14px;color:rgba(255,255,255,0.6);letter-spacing:0.2em;margin-top:12px;font-weight:300}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.4);line-height:1.9}
.clinic{max-width:800px;margin:0 auto;padding:80px 24px}
.paw-sep{text-align:center;padding:30px 0;font-size:24px;opacity:0.3}
.cl-label{font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#6b8e5a;font-weight:700;margin-bottom:6px}
.cl-title{font-family:'Fredoka',sans-serif;font-size:clamp(24px,4vw,36px);font-weight:500;margin-bottom:18px}
.cl-text{font-size:15px;color:#666;line-height:2}
.care-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.care{background:#fff;border-radius:20px;padding:24px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,0.04);transition:all 0.3s}
.care:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.care-em{font-size:32px;margin-bottom:10px}
.care-nm{font-family:'Fredoka',sans-serif;font-weight:500;font-size:14px;color:#6b8e5a}
.exp-cards{display:grid;gap:14px}
.exp-c{display:flex;gap:16px;background:#fff;border-radius:16px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.03)}
.exp-icon{width:44px;height:44px;background:#e8f5e0;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.exp-role{font-family:'Fredoka',sans-serif;font-weight:500;font-size:15px}
.exp-co{font-size:12px;color:#6b8e5a;font-weight:600;margin-top:2px}
.exp-dur{font-size:11px;color:#aaa}
.exp-desc{font-size:13px;color:#777;line-height:1.7;margin-top:6px}
.case-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.case{background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.04);transition:all 0.3s}
.case:hover{box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.cas-em{font-size:36px;margin-bottom:10px}
.cas-nm{font-family:'Fredoka',sans-serif;font-weight:500;font-size:15px}
.cas-ds{font-size:12px;color:#777;line-height:1.7;margin-top:6px}
.contact-clinic{background:linear-gradient(160deg,#6b8e5a,#8ab472);border-radius:20px;padding:48px;text-align:center;color:#fff}
.contact-clinic .cl-title{color:#fff}
.contact-clinic .cl-label{color:rgba(255,255,255,0.6)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(255,255,255,0.3);border-radius:30px;color:#fff;text-decoration:none;font-size:13px;font-weight:500;transition:all 0.3s}
.c-link:hover{background:rgba(255,255,255,0.15)}
footer{text-align:center;padding:30px;font-size:11px;color:#bbb;font-family:'Fredoka',sans-serif}
</style></head><body>

<div class="hero">
  <div class="paw-bg"></div>
  <div class="hero-inner">
    <div class="paw">🐾</div>
    <h1>Dr. ${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="clinic">
  <div class="cl-label">About</div>
  <div class="cl-title">About Me</div>
  <p class="cl-text">${about}</p>
  <div class="paw-sep">🐾</div>

  <div class="cl-label">Specializations</div>
  <div class="cl-title">Areas of Care</div>
  <div class="care-grid">
    ${skillNames.map((s,i) => `<div class="care"><div class="care-em">${['🐕','🐈','🐇','🦜','🐢','🐎','🐠','🦎'][i%8]}</div><div class="care-nm">${s}</div></div>`).join('')}
  </div>
  <div class="paw-sep">🐾</div>

  <div class="cl-label">Experience</div>
  <div class="cl-title">Professional Journey</div>
  <div class="exp-cards">
    ${experience.length ? experience.map(e => `
      <div class="exp-c"><div class="exp-icon">🏥</div><div>
        <div class="exp-role">${e.title}</div>
        <div class="exp-co">${e.company}</div>
        <div class="exp-dur">${e.duration}</div>
        <p class="exp-desc">${e.description || ''}</p>
      </div></div>`).join('') : '<div class="exp-c"><div class="exp-icon">🏥</div><div><div class="exp-role">Veterinarian</div><div class="exp-co">Your Clinic</div><div class="exp-dur">2020 – Present</div></div></div>'}
  </div>
  <div class="paw-sep">🐾</div>

  <div class="cl-label">Cases</div>
  <div class="cl-title">Notable Work</div>
  <div class="case-grid">
    ${projects.length ? projects.map(p => `
      <div class="case"><div class="cas-em">${p.emoji || '🐾'}</div><div class="cas-nm">${p.name}</div><p class="cas-ds">${p.description || ''}</p></div>`).join('') : '<div class="case"><div class="cas-em">🐾</div><div class="cas-nm">Your Case</div><p class="cas-ds">Add your work here.</p></div>'}
  </div>
  <div class="paw-sep">🐾</div>

  <div class="contact-clinic">
    <div class="cl-label">Contact</div>
    <div class="cl-title">Schedule a Visit</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} Dr. ${name} · 🐾</footer>
</body></html>`;
  }
};
