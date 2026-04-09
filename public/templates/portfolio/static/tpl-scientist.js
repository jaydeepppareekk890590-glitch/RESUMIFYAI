/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: SCIENTIST
   Style: Lab · Data · Clean Academic · Static
================================================================ */

window.TPL_SCIENTIST = {
  id: 'scientist',
  name: 'Scientist',
  category: 'Static Pro',
  theme: 'lab-academic',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#f0f4ff,#e8ecff);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🔬</div>
        <div style="font-size:16px;font-weight:700;color:#2d3a8c">Scientist</div>
        <div style="font-size:10px;color:rgba(45,58,140,0.5);margin-top:6px;letter-spacing:0.2em">RESEARCH · DISCOVER · PUBLISH</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Research Scientist';
    const bio = data.bio || 'Advancing human knowledge through rigorous scientific inquiry.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'research@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Machine Learning','Molecular Biology','Data Analysis','Python'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Scientist Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Serif:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f8f9ff;color:#1a1a2e;font-family:'IBM Plex Sans',sans-serif}
.hero{min-height:80vh;display:flex;align-items:center;background:linear-gradient(160deg,#1a1a5c,#2d3a8c,#4a5aaa);padding:60px 24px}
.hero-inner{max-width:800px;margin:0 auto;display:grid;grid-template-columns:auto 1fr;gap:40px;align-items:center}
@media(max-width:640px){.hero-inner{grid-template-columns:1fr;text-align:center}}
.hero-icon{font-size:100px}
.hero-label{font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-bottom:8px}
.hero h1{font-size:clamp(32px,5vw,52px);color:#fff;font-weight:700;line-height:1.2}
.hero .sub{font-size:14px;color:rgba(255,255,255,0.5);margin-top:8px;font-weight:300}
.hero .bio{font-size:14px;color:rgba(255,255,255,0.3);line-height:1.9;margin-top:16px}
.lab{max-width:800px;margin:0 auto;padding:60px 24px}
.paper-card{background:#fff;border-radius:12px;padding:32px;margin-bottom:20px;box-shadow:0 2px 16px rgba(0,0,0,0.04);border:1px solid #e8ecf0}
.p-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#2d3a8c;font-weight:600;margin-bottom:6px}
.p-title{font-family:'IBM Plex Serif',serif;font-size:22px;font-weight:600;margin-bottom:14px}
.p-text{font-size:14px;color:#555;line-height:2}
.field-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px}
.field{background:#f0f4ff;border:1px solid #dce4f8;border-radius:8px;padding:16px;text-align:center;transition:all 0.3s}
.field:hover{border-color:#2d3a8c;transform:translateY(-2px)}
.field-em{font-size:24px;margin-bottom:6px}
.field-nm{font-size:12px;font-weight:600;color:#2d3a8c}
.pub-list{display:grid;gap:12px}
.pub{padding:16px;border-left:3px solid #2d3a8c;background:#f8f9ff}
.pub-title{font-family:'IBM Plex Serif',serif;font-weight:600;font-size:15px}
.pub-venue{font-size:12px;color:#2d3a8c;margin-top:2px}
.pub-year{font-size:11px;color:#999}
.pub-desc{font-size:13px;color:#666;line-height:1.7;margin-top:6px}
.research-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.research{background:#fff;border:1px solid #e8ecf0;border-radius:12px;padding:24px;transition:all 0.3s}
.research:hover{box-shadow:0 8px 25px rgba(0,0,0,0.06)}
.res-em{font-size:36px;margin-bottom:10px}
.res-nm{font-family:'IBM Plex Serif',serif;font-weight:600;font-size:15px}
.res-ds{font-size:12px;color:#666;line-height:1.7;margin-top:6px}
.contact-lab{background:linear-gradient(160deg,#1a1a5c,#2d3a8c);border-radius:12px;padding:40px;text-align:center;color:#fff}
.contact-lab .p-title{color:#fff}
.contact-lab .p-label{color:rgba(255,255,255,0.5)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(255,255,255,0.25);border-radius:8px;color:#fff;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(255,255,255,0.1)}
footer{text-align:center;padding:30px;font-size:11px;color:#aaa;font-family:'IBM Plex Sans',sans-serif}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="hero-icon">🔬</div>
    <div>
      <div class="hero-label">Research Portfolio</div>
      <h1>${name}</h1>
      <div class="sub">${role}</div>
      <p class="bio">${bio}</p>
    </div>
  </div>
</div>

<div class="lab">
  <div class="paper-card">
    <div class="p-label">Abstract</div>
    <div class="p-title">About Me</div>
    <p class="p-text">${about}</p>
  </div>

  <div class="paper-card">
    <div class="p-label">Methodology</div>
    <div class="p-title">Research Areas & Skills</div>
    <div class="field-grid">
      ${skillNames.map((s,i) => `<div class="field"><div class="field-em">${['🧬','🔬','📊','💻','🧪','🔭','🧮','📡'][i%8]}</div><div class="field-nm">${s}</div></div>`).join('')}
    </div>
  </div>

  <div class="paper-card">
    <div class="p-label">Career</div>
    <div class="p-title">Academic & Professional</div>
    <div class="pub-list">
      ${experience.length ? experience.map(e => `
        <div class="pub">
          <div class="pub-title">${e.title}</div>
          <div class="pub-venue">${e.company}</div>
          <div class="pub-year">${e.duration}</div>
          <p class="pub-desc">${e.description || ''}</p>
        </div>`).join('') : '<div class="pub"><div class="pub-title">Research Fellow</div><div class="pub-venue">Your Institution</div><div class="pub-year">2020 – Present</div></div>'}
    </div>
  </div>

  <div class="paper-card">
    <div class="p-label">Publications</div>
    <div class="p-title">Research & Projects</div>
    <div class="research-grid">
      ${projects.length ? projects.map(p => `
        <div class="research"><div class="res-em">${p.emoji || '📄'}</div><div class="res-nm">${p.name}</div><p class="res-ds">${p.description || ''}</p></div>`).join('') : '<div class="research"><div class="res-em">📄</div><div class="res-nm">Your Research</div><p class="res-ds">Add your publications here.</p></div>'}
    </div>
  </div>

  <div class="contact-lab">
    <div class="p-label">Contact</div>
    <div class="p-title">Collaborate</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${github ? `<a href="${github}" target="_blank" class="c-link">🐙 GitHub</a>` : ''}
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
