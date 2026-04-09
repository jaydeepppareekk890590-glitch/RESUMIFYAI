/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: TEACHER
   Style: Chalkboard · Warm Academic · Notebook · Static
================================================================ */

window.TPL_TEACHER = {
  id: 'teacher',
  name: 'Teacher',
  category: 'Static Pro',
  theme: 'chalkboard',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#2d4a3e,#3a5a4a,#2d4a3e);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">👩‍🏫</div>
        <div style="font-size:16px;font-weight:700;color:#ffeaa7">Teacher</div>
        <div style="font-size:10px;color:rgba(255,234,167,0.5);margin-top:6px;letter-spacing:0.2em">INSPIRE · EDUCATE · EMPOWER</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Educator';
    const bio = data.bio || 'Passionate about inspiring the next generation of thinkers.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'teach@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Mathematics','Curriculum Design','Mentoring','EdTech'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Teacher Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Nunito:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f9f4ee;color:#2d3436;font-family:'Nunito',sans-serif}
.chalkboard{min-height:100vh;background:linear-gradient(160deg,#2d4a3e,#3a5a4a,#2d4a3e);display:flex;align-items:center;justify-content:center;text-align:center;position:relative;border-bottom:12px solid #8b6914}
.chalkboard::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")}
.chalk{z-index:2;padding:40px}
.chalk-icon{font-size:80px;margin-bottom:16px}
.chalk h1{font-family:'Patrick Hand',cursive;font-size:clamp(36px,7vw,64px);color:#ffeaa7}
.chalk .sub{font-family:'Patrick Hand',cursive;font-size:18px;color:rgba(255,234,167,0.6);margin-top:8px}
.chalk .bio{font-size:14px;color:rgba(255,255,255,0.35);margin-top:16px;max-width:420px;line-height:1.8}
.notebook{max-width:820px;margin:-30px auto 0;padding:0 24px 80px;position:relative;z-index:3}
.page{background:#fff;border-radius:16px;padding:36px;margin-bottom:20px;box-shadow:0 4px 20px rgba(0,0,0,0.06);border-left:4px solid #e17055;position:relative}
.page::before{content:'';position:absolute;left:28px;top:0;bottom:0;width:1px;background:rgba(225,112,85,0.15)}
.page-label{font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#e17055;font-weight:700;margin-bottom:6px}
.page-title{font-family:'Patrick Hand',cursive;font-size:28px;color:#2d3436;margin-bottom:16px}
.page-text{font-size:15px;color:#636e72;line-height:2}
.subject-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}
.subject{background:#ffeaa7;border-radius:12px;padding:18px;text-align:center;font-weight:700;font-size:13px;color:#2d3436;box-shadow:0 2px 8px rgba(0,0,0,0.06);transform:rotate(${Math.random()*2-1}deg)}
.subject .em{font-size:24px;margin-bottom:6px;display:block}
.exp-stack{display:grid;gap:12px}
.exp-card{display:flex;gap:16px;padding:16px;background:#fafaf8;border-radius:12px;border:1px solid #eee}
.exp-dot{width:10px;height:10px;border-radius:50%;background:#e17055;margin-top:6px;flex-shrink:0}
.exp-role{font-weight:700;font-size:15px}
.exp-co{font-size:12px;color:#e17055;font-weight:600}
.exp-dur{font-size:11px;color:#b2bec3}
.exp-desc{font-size:13px;color:#636e72;line-height:1.7;margin-top:4px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
.proj-sticky{background:#ffeaa7;border-radius:4px;padding:20px;box-shadow:2px 3px 10px rgba(0,0,0,0.08);transform:rotate(${Math.random()*2-1}deg)}
.proj-nm{font-family:'Patrick Hand',cursive;font-size:17px;font-weight:700}
.proj-ds{font-size:12px;color:#636e72;line-height:1.6;margin-top:6px}
.contact-page{background:#2d4a3e;border-radius:16px;padding:40px;text-align:center;color:#ffeaa7}
.contact-page .page-title{color:#ffeaa7}
.c-btns{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-btn{padding:10px 22px;border:1px solid rgba(255,234,167,0.3);border-radius:30px;color:#ffeaa7;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-btn:hover{background:rgba(255,234,167,0.1)}
footer{text-align:center;padding:30px;font-size:11px;color:#b2bec3}
</style></head><body>

<div class="chalkboard">
  <div class="chalk">
    <div class="chalk-icon">👩‍🏫</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="notebook">
  <div class="page">
    <div class="page-label">About</div>
    <div class="page-title">About Me</div>
    <p class="page-text">${about}</p>
  </div>

  <div class="page">
    <div class="page-label">Subjects</div>
    <div class="page-title">What I Teach</div>
    <div class="subject-grid">
      ${skillNames.map((s,i) => `<div class="subject"><span class="em">${['📐','📚','🧮','💡','🎨','🔬','🌍','📝'][i%8]}</span>${s}</div>`).join('')}
    </div>
  </div>

  <div class="page">
    <div class="page-label">Experience</div>
    <div class="page-title">Teaching Career</div>
    <div class="exp-stack">
      ${experience.length ? experience.map(e => `
        <div class="exp-card"><div class="exp-dot"></div><div>
          <div class="exp-role">${e.title}</div>
          <div class="exp-co">${e.company}</div>
          <div class="exp-dur">${e.duration}</div>
          <p class="exp-desc">${e.description || ''}</p>
        </div></div>`).join('') : '<div class="exp-card"><div class="exp-dot"></div><div><div class="exp-role">Teacher</div><div class="exp-co">Your School</div><div class="exp-dur">2020 – Present</div></div></div>'}
    </div>
  </div>

  <div class="page">
    <div class="page-label">Projects</div>
    <div class="page-title">Initiatives & Programs</div>
    <div class="proj-grid">
      ${projects.length ? projects.map(p => `
        <div class="proj-sticky">
          <div class="proj-nm">${p.emoji || '📚'} ${p.name}</div>
          <p class="proj-ds">${p.description || ''}</p>
        </div>`).join('') : '<div class="proj-sticky"><div class="proj-nm">📚 Your Initiative</div><p class="proj-ds">Add your projects here.</p></div>'}
    </div>
  </div>

  <div class="contact-page">
    <div class="page-label">Contact</div>
    <div class="page-title">Let's Connect</div>
    <div class="c-btns">
      <a href="mailto:${email}" class="c-btn">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-btn">💼 LinkedIn</a>` : ''}
      <span class="c-btn">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
