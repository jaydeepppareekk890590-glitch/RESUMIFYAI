/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: LAWYER
   Style: Courtroom · Serif · Dark Authority · Static
================================================================ */

window.TPL_LAWYER = {
  id: 'lawyer',
  name: 'Lawyer',
  category: 'Static Pro',
  theme: 'courtroom-dark',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a1520,#2a2030,#1a1520);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">⚖️</div>
        <div style="font-size:16px;font-weight:700;color:#c9a84c">Lawyer</div>
        <div style="font-size:10px;color:rgba(201,168,76,0.5);margin-top:6px;letter-spacing:0.2em">JUSTICE · COUNSEL · ADVOCATE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Attorney at Law';
    const bio = data.bio || 'Committed to justice, precision, and unwavering advocacy.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'law@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Corporate Law','Litigation','Contract Drafting','Legal Research'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Legal Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0f0d14;color:#f0ece4;font-family:'Inter',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(201,168,76,0.05),transparent 70%)}
.hero-inner{z-index:2;padding:40px}
.scales{font-size:90px;margin-bottom:20px}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,7vw,72px);font-weight:700;color:#f0ece4;letter-spacing:0.02em}
.hero .bar{width:80px;height:2px;background:#c9a84c;margin:20px auto}
.hero .sub{font-size:14px;color:#c9a84c;letter-spacing:0.3em;text-transform:uppercase;font-weight:300}
.hero .bio{max-width:450px;margin:20px auto 0;font-size:14px;color:rgba(240,236,228,0.35);line-height:1.9}
.body-wrap{max-width:820px;margin:0 auto;padding:80px 24px}
.gold-line{width:50px;height:1px;background:#c9a84c;margin:60px 0}
.lbl{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#c9a84c;margin-bottom:6px}
.ttl{font-family:'Cormorant Garamond',serif;font-size:clamp(24px,4vw,38px);margin-bottom:20px;font-weight:600}
.about-text{font-size:15px;color:rgba(240,236,228,0.6);line-height:2;max-width:600px}
.practice-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px}
.practice{border:1px solid rgba(201,168,76,0.2);padding:22px;text-align:center;transition:all 0.3s}
.practice:hover{border-color:#c9a84c;background:rgba(201,168,76,0.04)}
.practice-icon{font-size:28px;margin-bottom:10px}
.practice-name{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:600;color:#c9a84c}
.case-list{display:grid;gap:16px}
.case-card{border-left:3px solid #c9a84c;padding:20px 24px;background:rgba(255,255,255,0.02);transition:all 0.3s}
.case-card:hover{background:rgba(201,168,76,0.04)}
.case-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600}
.case-co{font-size:12px;color:#c9a84c;margin-top:4px}
.case-dur{font-size:11px;color:rgba(240,236,228,0.3)}
.case-desc{font-size:13px;color:rgba(240,236,228,0.5);line-height:1.7;margin-top:8px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.proj{border:1px solid rgba(201,168,76,0.12);padding:24px;transition:all 0.3s}
.proj:hover{border-color:rgba(201,168,76,0.4)}
.proj-em{font-size:32px;margin-bottom:10px}
.proj-nm{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600}
.proj-ds{font-size:12px;color:rgba(240,236,228,0.45);line-height:1.7;margin-top:6px}
.contact-sec{border:1px solid rgba(201,168,76,0.2);padding:48px;text-align:center;margin-top:60px}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
.c-link{padding:10px 24px;border:1px solid rgba(201,168,76,0.3);color:#c9a84c;text-decoration:none;font-size:13px;transition:all 0.3s;font-weight:300}
.c-link:hover{background:rgba(201,168,76,0.1);border-color:#c9a84c}
footer{text-align:center;padding:40px;font-size:11px;color:rgba(240,236,228,0.2);font-family:'Cormorant Garamond',serif;letter-spacing:0.1em}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="scales">⚖️</div>
    <h1>${name}</h1>
    <div class="bar"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="body-wrap">
  <div class="lbl">About</div>
  <div class="ttl">Legal Philosophy</div>
  <p class="about-text">${about}</p>
  <div class="gold-line"></div>

  <div class="lbl">Practice Areas</div>
  <div class="ttl">Areas of Expertise</div>
  <div class="practice-grid">
    ${skillNames.map((s,i) => `<div class="practice"><div class="practice-icon">${['📜','🏛️','📋','🔍','💼','🗂️','📑','🤝'][i%8]}</div><div class="practice-name">${s}</div></div>`).join('')}
  </div>
  <div class="gold-line"></div>

  <div class="lbl">Career</div>
  <div class="ttl">Professional History</div>
  ${experience.length ? experience.map(e => `
    <div class="case-card">
      <div class="case-title">${e.title}</div>
      <div class="case-co">${e.company}</div>
      <div class="case-dur">${e.duration}</div>
      <p class="case-desc">${e.description || ''}</p>
    </div>`).join('') : '<div class="case-card"><div class="case-title">Senior Associate</div><div class="case-co">Your Firm</div><div class="case-dur">2020 – Present</div></div>'}
  <div class="gold-line"></div>

  <div class="lbl">Notable Cases</div>
  <div class="ttl">Key Achievements</div>
  <div class="proj-grid">
    ${projects.length ? projects.map(p => `
      <div class="proj"><div class="proj-em">${p.emoji || '⚖️'}</div><div class="proj-nm">${p.name}</div><p class="proj-ds">${p.description || ''}</p></div>`).join('') : '<div class="proj"><div class="proj-em">⚖️</div><div class="proj-nm">Your Case</div><p class="proj-ds">Add notable cases here.</p></div>'}
  </div>

  <div class="contact-sec">
    <div class="lbl">Contact</div>
    <div class="ttl">Schedule a Consultation</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · All Rights Reserved</footer>
</body></html>`;
  }
};
