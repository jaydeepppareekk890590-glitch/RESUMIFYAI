/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: CARPENTER
   Style: Woodgrain · Rustic · Craft · Static
================================================================ */

window.TPL_CARPENTER = {
  id: 'carpenter',
  name: 'Carpenter',
  category: 'Static Pro',
  theme: 'woodgrain-rustic',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#3e2723,#5d4037,#4e342e);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🪚</div>
        <div style="font-size:16px;font-weight:700;color:#d7ccc8">Carpenter</div>
        <div style="font-size:10px;color:rgba(215,204,200,0.5);margin-top:6px;letter-spacing:0.2em">CRAFT · BUILD · SHAPE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Master Carpenter';
    const bio = data.bio || 'Handcrafting beautiful, lasting woodwork with passion and precision.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'wood@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Joinery','Cabinet Making','Wood Turning','Restoration'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Carpenter Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Bitter:wght@300;400;500;600;700&family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#efebe9;color:#3e2723;font-family:'Cabin',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#3e2723,#5d4037,#4e342e);position:relative}
.grain{position:absolute;inset:0;opacity:0.04;background-image:url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='5'/%3E%3CfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.8 0 0 0 0 0.7 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E")}
.hero-inner{z-index:2;padding:40px}
.saw{font-size:90px;margin-bottom:16px}
.hero h1{font-family:'Bitter',serif;font-size:clamp(36px,7vw,64px);color:#d7ccc8;font-weight:700}
.hero .bar{width:60px;height:2px;background:#a1887f;margin:20px auto}
.hero .sub{font-size:13px;color:rgba(215,204,200,0.5);letter-spacing:0.3em;text-transform:uppercase}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(215,204,200,0.35);line-height:1.9}
.workshop{max-width:800px;margin:0 auto;padding:80px 24px}
.wood-sep{display:flex;align-items:center;gap:12px;padding:40px 0}
.wood-sep::before,.wood-sep::after{content:'';flex:1;height:2px;background:linear-gradient(90deg,transparent,#a1887f,transparent)}
.wood-sep span{font-size:20px}
.w-lbl{font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#8d6e63;font-weight:700;margin-bottom:6px}
.w-ttl{font-family:'Bitter',serif;font-size:clamp(24px,4vw,36px);font-weight:700;margin-bottom:18px}
.w-text{font-size:15px;color:#6d4c41;line-height:2}
.tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.tool-card{background:#fff;border-radius:12px;padding:22px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.04);border-bottom:3px solid #a1887f;transition:all 0.3s}
.tool-card:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.tool-em{font-size:28px;margin-bottom:8px}
.tool-nm{font-family:'Bitter',serif;font-weight:600;font-size:13px;color:#5d4037}
.bench-list{display:grid;gap:14px}
.bench{display:flex;gap:16px;background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.03)}
.bench-mark{width:6px;border-radius:3px;background:linear-gradient(180deg,#a1887f,#5d4037);flex-shrink:0}
.bench-role{font-family:'Bitter',serif;font-weight:700;font-size:16px}
.bench-co{font-size:12px;color:#8d6e63;font-weight:600;margin-top:2px}
.bench-dur{font-size:11px;color:#bbb}
.bench-desc{font-size:13px;color:#6d4c41;line-height:1.7;margin-top:6px}
.piece-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.piece{background:#fff;border-radius:12px;padding:24px;box-shadow:0 4px 16px rgba(0,0,0,0.04);transition:all 0.3s}
.piece:hover{box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.pc-em{font-size:36px;margin-bottom:10px}
.pc-nm{font-family:'Bitter',serif;font-weight:700;font-size:15px}
.pc-ds{font-size:12px;color:#6d4c41;line-height:1.7;margin-top:6px}
.contact-workshop{background:linear-gradient(160deg,#3e2723,#5d4037);border-radius:16px;padding:48px;text-align:center;color:#d7ccc8}
.contact-workshop .w-ttl{color:#d7ccc8}
.contact-workshop .w-lbl{color:#a1887f}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(215,204,200,0.3);border-radius:8px;color:#d7ccc8;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(215,204,200,0.1)}
footer{text-align:center;padding:30px;font-size:11px;color:#bbb;font-family:'Bitter',serif}
</style></head><body>

<div class="hero">
  <div class="grain"></div>
  <div class="hero-inner">
    <div class="saw">🪚</div>
    <h1>${name}</h1>
    <div class="bar"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="workshop">
  <div class="w-lbl">About</div>
  <div class="w-ttl">The Craftsman</div>
  <p class="w-text">${about}</p>
  <div class="wood-sep"><span>🪵</span></div>

  <div class="w-lbl">Skills</div>
  <div class="w-ttl">Tools of the Trade</div>
  <div class="tool-grid">
    ${skillNames.map((s,i) => `<div class="tool-card"><div class="tool-em">${['🪚','🔨','🪵','📐','🔩','🪛','🗜️','✏️'][i%8]}</div><div class="tool-nm">${s}</div></div>`).join('')}
  </div>
  <div class="wood-sep"><span>🪵</span></div>

  <div class="w-lbl">Experience</div>
  <div class="w-ttl">Workbench History</div>
  <div class="bench-list">
    ${experience.length ? experience.map(e => `
      <div class="bench"><div class="bench-mark"></div><div>
        <div class="bench-role">${e.title}</div>
        <div class="bench-co">${e.company}</div>
        <div class="bench-dur">${e.duration}</div>
        <p class="bench-desc">${e.description || ''}</p>
      </div></div>`).join('') : '<div class="bench"><div class="bench-mark"></div><div><div class="bench-role">Master Carpenter</div><div class="bench-co">Your Workshop</div><div class="bench-dur">2020 – Present</div></div></div>'}
  </div>
  <div class="wood-sep"><span>🪵</span></div>

  <div class="w-lbl">Portfolio</div>
  <div class="w-ttl">Featured Pieces</div>
  <div class="piece-grid">
    ${projects.length ? projects.map(p => `
      <div class="piece"><div class="pc-em">${p.emoji || '🪑'}</div><div class="pc-nm">${p.name}</div><p class="pc-ds">${p.description || ''}</p></div>`).join('') : '<div class="piece"><div class="pc-em">🪑</div><div class="pc-nm">Your Piece</div><p class="pc-ds">Add your work here.</p></div>'}
  </div>

  <div style="padding-top:40px">
    <div class="contact-workshop">
      <div class="w-lbl">Contact</div>
      <div class="w-ttl">Let's Build Together</div>
      <div class="c-links">
        <a href="mailto:${email}" class="c-link">📧 ${email}</a>
        ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
        <span class="c-link">📍 ${location}</span>
      </div>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
