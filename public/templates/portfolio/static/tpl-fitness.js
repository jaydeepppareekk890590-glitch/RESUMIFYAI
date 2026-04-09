/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: FITNESS TRAINER
   Style: Bold Gym · High Contrast · Energy · Static
================================================================ */

window.TPL_FITNESS = {
  id: 'fitness',
  name: 'Fitness Trainer',
  category: 'Static Pro',
  theme: 'gym-energy',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#0d0d0d,#1a1a1a);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">💪</div>
        <div style="font-size:16px;font-weight:900;color:#ff4444">Fitness</div>
        <div style="font-size:10px;color:rgba(255,68,68,0.5);margin-top:6px;letter-spacing:0.2em">TRAIN · TRANSFORM · TRIUMPH</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Certified Fitness Trainer';
    const bio = data.bio || 'Transforming bodies and minds through disciplined training.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'fit@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['HIIT','Strength Training','Nutrition','Yoga'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Fitness Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0d0d0d;color:#fff;font-family:'Inter',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#0d0d0d 0%,#1a0a0a 50%,#0d0d0d 100%);position:relative}
.hero::before{content:'';position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,transparent,#ff4444,transparent)}
.hero-inner{z-index:2;padding:40px}
.fire{font-size:100px;margin-bottom:16px}
.hero h1{font-family:'Oswald',sans-serif;font-size:clamp(42px,9vw,90px);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;line-height:1}
.hero h1 span{color:#ff4444}
.hero .sub{font-family:'Oswald',sans-serif;font-size:14px;color:rgba(255,255,255,0.4);letter-spacing:0.4em;text-transform:uppercase;margin-top:16px;font-weight:300}
.hero .bio{max-width:400px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.25);line-height:1.8}
.content{max-width:820px;margin:0 auto;padding:60px 24px}
.red-bar{width:40px;height:4px;background:#ff4444;margin:50px 0}
.lbl{font-family:'Oswald',sans-serif;font-size:12px;letter-spacing:0.4em;text-transform:uppercase;color:#ff4444;font-weight:500}
.ttl{font-family:'Oswald',sans-serif;font-size:clamp(26px,5vw,40px);text-transform:uppercase;margin:6px 0 20px;font-weight:700}
.about{font-size:15px;color:rgba(255,255,255,0.5);line-height:2;font-weight:300}
.stat-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
.stat{background:rgba(255,68,68,0.06);border:1px solid rgba(255,68,68,0.15);padding:22px;text-align:center;transition:all 0.3s}
.stat:hover{border-color:#ff4444;background:rgba(255,68,68,0.1)}
.stat-em{font-size:28px;margin-bottom:8px}
.stat-nm{font-family:'Oswald',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#ff4444}
.exp-stack{display:grid;gap:14px}
.exp-card{border-left:4px solid #ff4444;padding:18px 22px;background:rgba(255,255,255,0.02)}
.exp-role{font-family:'Oswald',sans-serif;font-size:17px;font-weight:600;text-transform:uppercase}
.exp-co{font-size:12px;color:#ff4444;margin-top:2px}
.exp-dur{font-size:11px;color:rgba(255,255,255,0.3)}
.exp-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;margin-top:6px}
.prog-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.prog{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);padding:24px;transition:all 0.3s}
.prog:hover{border-color:rgba(255,68,68,0.3)}
.prog-em{font-size:36px;margin-bottom:10px}
.prog-nm{font-family:'Oswald',sans-serif;font-size:15px;font-weight:600;text-transform:uppercase}
.prog-ds{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;margin-top:6px}
.cta-sec{background:#ff4444;padding:50px;text-align:center;margin-top:50px}
.cta-sec .ttl{color:#fff}
.cta-sec .lbl{color:rgba(255,255,255,0.7)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:2px solid rgba(255,255,255,0.4);color:#fff;text-decoration:none;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;transition:all 0.3s}
.c-link:hover{background:#fff;color:#ff4444}
footer{text-align:center;padding:30px;font-size:10px;color:rgba(255,255,255,0.15);font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:0.2em}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="fire">💪</div>
    <h1>${name.split(' ').map((w,i) => i===0 ? w : `<span>${w}</span>`).join(' ')}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="content">
  <div class="lbl">About</div>
  <div class="ttl">My Philosophy</div>
  <p class="about">${about}</p>
  <div class="red-bar"></div>

  <div class="lbl">Specializations</div>
  <div class="ttl">Training Styles</div>
  <div class="stat-row">
    ${skillNames.map((s,i) => `<div class="stat"><div class="stat-em">${['🏋️','🥊','🧘','🏃','💥','🎯','⚡','🔥'][i%8]}</div><div class="stat-nm">${s}</div></div>`).join('')}
  </div>
  <div class="red-bar"></div>

  <div class="lbl">Experience</div>
  <div class="ttl">Career Highlights</div>
  <div class="exp-stack">
    ${experience.length ? experience.map(e => `
      <div class="exp-card">
        <div class="exp-role">${e.title}</div>
        <div class="exp-co">${e.company}</div>
        <div class="exp-dur">${e.duration}</div>
        <p class="exp-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="exp-card"><div class="exp-role">Head Trainer</div><div class="exp-co">Your Gym</div><div class="exp-dur">2020 – Present</div></div>'}
  </div>
  <div class="red-bar"></div>

  <div class="lbl">Programs</div>
  <div class="ttl">Training Programs</div>
  <div class="prog-grid">
    ${projects.length ? projects.map(p => `
      <div class="prog"><div class="prog-em">${p.emoji || '🏆'}</div><div class="prog-nm">${p.name}</div><p class="prog-ds">${p.description || ''}</p></div>`).join('') : '<div class="prog"><div class="prog-em">🏆</div><div class="prog-nm">Your Program</div><p class="prog-ds">Add your programs here.</p></div>'}
  </div>
</div>

<div class="cta-sec">
  <div class="lbl">Contact</div>
  <div class="ttl">Start Your Journey</div>
  <div class="c-links">
    <a href="mailto:${email}" class="c-link">📧 ${email}</a>
    ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
    <span class="c-link">📍 ${location}</span>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
