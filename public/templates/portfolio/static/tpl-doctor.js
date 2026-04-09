/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: DOCTOR
   Style: Clean Medical · Teal & White · Trust · Static
================================================================ */

window.TPL_DOCTOR = {
  id: 'doctor',
  name: 'Doctor',
  category: 'Static Pro',
  theme: 'medical-clean',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#e8f5f0,#ffffff,#f0faf6);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🩺</div>
        <div style="font-size:16px;font-weight:700;color:#0d7a5f">Doctor</div>
        <div style="font-size:10px;color:rgba(13,122,95,0.5);margin-top:6px;letter-spacing:0.2em">CARE · HEAL · SERVE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Medical Doctor';
    const bio = data.bio || 'Dedicated to providing compassionate, evidence-based healthcare.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'doctor@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Internal Medicine','Cardiology','Diagnostics','Patient Care'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Dr. ${name} — Medical Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fafcfb;color:#1a2e28;font-family:'DM Sans',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;background:linear-gradient(160deg,#0d7a5f 0%,#0a5e48 50%,#074033 100%);position:relative;overflow:hidden}
.hero::after{content:'';position:absolute;right:-100px;bottom:-100px;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,0.03)}
.hero-inner{max-width:700px;padding:60px 40px;position:relative;z-index:2}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgba(255,255,255,0.1);border-radius:30px;font-size:12px;color:rgba(255,255,255,0.8);margin-bottom:24px}
.hero-badge span{font-size:20px}
.hero h1{font-family:'DM Serif Display',serif;font-size:clamp(36px,6vw,60px);color:#fff;line-height:1.15}
.hero .sub{font-size:15px;color:rgba(255,255,255,0.5);margin-top:12px;font-weight:300}
.hero .bio{font-size:15px;color:rgba(255,255,255,0.4);line-height:1.9;margin-top:20px;max-width:500px}
.main{max-width:820px;margin:0 auto;padding:80px 24px}
.card{background:#fff;border-radius:20px;padding:36px;margin-bottom:24px;box-shadow:0 2px 20px rgba(0,0,0,0.04);border:1px solid rgba(13,122,95,0.08)}
.card-label{font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#0d7a5f;font-weight:700;margin-bottom:6px}
.card-title{font-family:'DM Serif Display',serif;font-size:24px;color:#1a2e28;margin-bottom:16px}
.card-text{font-size:15px;color:#5a6e68;line-height:2}
.specialties{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.spec{background:#f0faf6;border:1px solid rgba(13,122,95,0.1);border-radius:12px;padding:18px;text-align:center}
.spec-icon{font-size:28px;margin-bottom:8px}
.spec-name{font-weight:600;font-size:13px;color:#0d7a5f}
.timeline{border-left:2px solid #0d7a5f;padding-left:24px}
.tl-item{padding-bottom:28px;position:relative}
.tl-item::before{content:'';position:absolute;left:-29px;top:4px;width:10px;height:10px;border-radius:50%;background:#0d7a5f}
.tl-role{font-weight:700;font-size:16px}
.tl-co{font-size:13px;color:#0d7a5f;font-weight:600;margin-top:2px}
.tl-dur{font-size:11px;color:#999}
.tl-desc{font-size:13px;color:#5a6e68;line-height:1.7;margin-top:6px}
.proj-list{display:grid;gap:16px}
.proj{display:flex;gap:16px;padding:20px;background:#f0faf6;border-radius:14px;border:1px solid rgba(13,122,95,0.08)}
.proj-em{font-size:36px;flex-shrink:0}
.proj-nm{font-weight:700;font-size:15px;color:#1a2e28}
.proj-ds{font-size:12px;color:#5a6e68;line-height:1.6;margin-top:4px}
.contact-card{background:linear-gradient(160deg,#0d7a5f,#074033);border-radius:20px;padding:40px;text-align:center;color:#fff}
.contact-card .card-title{color:#fff}
.contact-card .card-label{color:rgba(255,255,255,0.6)}
.c-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
.c-btn{padding:10px 22px;border:1px solid rgba(255,255,255,0.25);border-radius:30px;color:#fff;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-btn:hover{background:rgba(255,255,255,0.15)}
footer{text-align:center;padding:30px;font-size:11px;color:#aaa}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="hero-badge"><span>🩺</span> Medical Professional</div>
    <h1>Dr. ${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="main">
  <div class="card">
    <div class="card-label">About</div>
    <div class="card-title">About Me</div>
    <p class="card-text">${about}</p>
  </div>

  <div class="card">
    <div class="card-label">Specializations</div>
    <div class="card-title">Areas of Expertise</div>
    <div class="specialties">
      ${skillNames.map((s,i) => `<div class="spec"><div class="spec-icon">${['💊','🫀','🧬','🔬','🏥','💉','🧪','🩻'][i%8]}</div><div class="spec-name">${s}</div></div>`).join('')}
    </div>
  </div>

  <div class="card">
    <div class="card-label">Career</div>
    <div class="card-title">Professional Experience</div>
    <div class="timeline">
      ${experience.length ? experience.map(e => `
        <div class="tl-item">
          <div class="tl-role">${e.title}</div>
          <div class="tl-co">${e.company}</div>
          <div class="tl-dur">${e.duration}</div>
          <p class="tl-desc">${e.description || ''}</p>
        </div>`).join('') : '<div class="tl-item"><div class="tl-role">Your Position</div><div class="tl-co">Hospital</div><div class="tl-dur">2020 – Present</div></div>'}
    </div>
  </div>

  <div class="card">
    <div class="card-label">Research & Projects</div>
    <div class="card-title">Notable Work</div>
    <div class="proj-list">
      ${projects.length ? projects.map(p => `
        <div class="proj"><div class="proj-em">${p.emoji || '🔬'}</div><div><div class="proj-nm">${p.name}</div><p class="proj-ds">${p.description || ''}</p></div></div>`).join('') : '<div class="proj"><div class="proj-em">🔬</div><div><div class="proj-nm">Your Research</div><p class="proj-ds">Add your work here.</p></div></div>'}
    </div>
  </div>

  <div class="contact-card">
    <div class="card-label">Contact</div>
    <div class="card-title">Get In Touch</div>
    <div class="c-row">
      <a href="mailto:${email}" class="c-btn">📧 ${email}</a>
      ${github ? `<a href="${github}" target="_blank" class="c-btn">🐙 GitHub</a>` : ''}
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-btn">💼 LinkedIn</a>` : ''}
      <span class="c-btn">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} Dr. ${name}</footer>
</body></html>`;
  }
};
