/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: MECHANIC
   Style: Garage · Industrial · Grease · Static
================================================================ */

window.TPL_MECHANIC = {
  id: 'mechanic',
  name: 'Mechanic',
  category: 'Static Pro',
  theme: 'garage-industrial',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a1a1a,#2a2a2a,#1a1a1a);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🔧</div>
        <div style="font-size:16px;font-weight:700;color:#f39c12">Mechanic</div>
        <div style="font-size:10px;color:rgba(243,156,18,0.5);margin-top:6px;letter-spacing:0.2em">FIX · BUILD · RESTORE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Auto Mechanic';
    const bio = data.bio || 'Keeping engines running and machines in peak condition.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'garage@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Engine Repair','Diagnostics','Welding','Electrical'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Mechanic Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&family=Barlow+Condensed:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#141414;color:#e0e0e0;font-family:'Barlow Condensed',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#141414,#1a1a1a);position:relative}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:6px;background:repeating-linear-gradient(90deg,#f39c12 0,#f39c12 20px,#141414 20px,#141414 24px)}
.hero-inner{z-index:2;padding:40px}
.wrench{font-size:90px;margin-bottom:16px}
.hero h1{font-family:'Russo One',sans-serif;font-size:clamp(40px,8vw,80px);text-transform:uppercase;letter-spacing:0.05em;color:#f39c12}
.hero .sub{font-size:14px;color:rgba(255,255,255,0.35);letter-spacing:0.3em;text-transform:uppercase;margin-top:12px}
.hero .bio{max-width:400px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.2);line-height:1.8}
.garage{max-width:800px;margin:0 auto;padding:60px 24px}
.bolt-sep{display:flex;align-items:center;gap:12px;padding:40px 0}
.bolt-sep::before,.bolt-sep::after{content:'';flex:1;height:1px;background:rgba(243,156,18,0.2)}
.bolt-sep span{font-size:20px}
.g-lbl{font-family:'Russo One',sans-serif;font-size:12px;letter-spacing:0.3em;color:#f39c12;text-transform:uppercase}
.g-ttl{font-family:'Russo One',sans-serif;font-size:clamp(24px,4vw,36px);text-transform:uppercase;margin:6px 0 18px}
.g-text{font-size:15px;color:rgba(255,255,255,0.45);line-height:2;font-weight:300}
.tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.tool{background:rgba(243,156,18,0.06);border:1px solid rgba(243,156,18,0.15);padding:20px;text-align:center;transition:all 0.3s}
.tool:hover{border-color:#f39c12;background:rgba(243,156,18,0.1)}
.tool-em{font-size:28px;margin-bottom:8px}
.tool-nm{font-family:'Russo One',sans-serif;font-size:12px;color:#f39c12;text-transform:uppercase}
.work-list{display:grid;gap:14px}
.work-card{border-left:4px solid #f39c12;padding:18px 22px;background:rgba(255,255,255,0.02)}
.work-role{font-family:'Russo One',sans-serif;font-size:16px;text-transform:uppercase}
.work-co{font-size:12px;color:#f39c12;margin-top:2px}
.work-dur{font-size:11px;color:rgba(255,255,255,0.25)}
.work-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;margin-top:6px}
.build-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.build{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);padding:24px;transition:all 0.3s}
.build:hover{border-color:rgba(243,156,18,0.3)}
.bld-em{font-size:36px;margin-bottom:10px}
.bld-nm{font-family:'Russo One',sans-serif;font-size:14px;text-transform:uppercase}
.bld-ds{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;margin-top:6px}
.contact-garage{background:#f39c12;padding:48px;text-align:center;color:#141414;margin-top:50px}
.contact-garage .g-ttl{color:#141414}
.contact-garage .g-lbl{color:rgba(20,20,20,0.6)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:2px solid rgba(20,20,20,0.3);color:#141414;text-decoration:none;font-family:'Russo One',sans-serif;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.3s}
.c-link:hover{background:#141414;color:#f39c12}
footer{text-align:center;padding:30px;font-size:10px;color:rgba(255,255,255,0.12);font-family:'Russo One',sans-serif;text-transform:uppercase;letter-spacing:0.2em}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="wrench">🔧</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="garage">
  <div class="g-lbl">About</div>
  <div class="g-ttl">Under the Hood</div>
  <p class="g-text">${about}</p>
  <div class="bolt-sep"><span>⚙️</span></div>

  <div class="g-lbl">Skills</div>
  <div class="g-ttl">Toolbox</div>
  <div class="tool-grid">
    ${skillNames.map((s,i) => `<div class="tool"><div class="tool-em">${['🔧','🔩','⚡','🛠️','🔨','🧰','⛽','🏎️'][i%8]}</div><div class="tool-nm">${s}</div></div>`).join('')}
  </div>
  <div class="bolt-sep"><span>⚙️</span></div>

  <div class="g-lbl">Experience</div>
  <div class="g-ttl">Work History</div>
  <div class="work-list">
    ${experience.length ? experience.map(e => `
      <div class="work-card"><div class="work-role">${e.title}</div><div class="work-co">${e.company}</div><div class="work-dur">${e.duration}</div><p class="work-desc">${e.description || ''}</p></div>`).join('') : '<div class="work-card"><div class="work-role">Lead Mechanic</div><div class="work-co">Your Garage</div><div class="work-dur">2020 – Present</div></div>'}
  </div>
  <div class="bolt-sep"><span>⚙️</span></div>

  <div class="g-lbl">Projects</div>
  <div class="g-ttl">Builds & Restorations</div>
  <div class="build-grid">
    ${projects.length ? projects.map(p => `
      <div class="build"><div class="bld-em">${p.emoji || '🏎️'}</div><div class="bld-nm">${p.name}</div><p class="bld-ds">${p.description || ''}</p></div>`).join('') : '<div class="build"><div class="bld-em">🏎️</div><div class="bld-nm">Your Build</div><p class="bld-ds">Add your projects here.</p></div>'}
  </div>
</div>

<div class="contact-garage">
  <div class="g-lbl">Contact</div>
  <div class="g-ttl">Need a Fix?</div>
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
