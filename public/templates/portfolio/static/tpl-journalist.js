/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: JOURNALIST
   Style: Newspaper · Editorial · Classic Print · Static
================================================================ */

window.TPL_JOURNALIST = {
  id: 'journalist',
  name: 'Journalist',
  category: 'Static Pro',
  theme: 'newspaper-editorial',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:#f5f0e8;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Times New Roman',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">📰</div>
        <div style="font-size:16px;font-weight:700;color:#1a1a1a">Journalist</div>
        <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:6px;letter-spacing:0.2em">REPORT · INVESTIGATE · INFORM</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Investigative Journalist';
    const bio = data.bio || 'Pursuing truth and accountability through fearless reporting.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'press@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Investigative','Broadcast','Data Journalism','Photojournalism'];

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Journalist Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:wght@300;400;600&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f5f0e8;color:#1a1a1a;font-family:'Source Serif 4',serif}
.masthead{max-width:900px;margin:0 auto;padding:40px 24px 0;text-align:center;border-bottom:4px double #1a1a1a}
.mast-date{font-family:'Inter',sans-serif;font-size:11px;color:#888;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:8px}
.mast-name{font-family:'Playfair Display',serif;font-size:clamp(40px,8vw,72px);font-weight:900;line-height:1;margin-bottom:8px}
.mast-tagline{font-family:'Inter',sans-serif;font-size:11px;color:#666;letter-spacing:0.4em;text-transform:uppercase;padding-bottom:16px}
.paper{max-width:900px;margin:0 auto;padding:24px}
.headline-section{border-bottom:1px solid #ddd;padding:40px 0}
.byline{font-family:'Inter',sans-serif;font-size:11px;color:#888;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px}
.headline{font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,38px);font-weight:900;line-height:1.2;margin-bottom:16px}
.lead{font-size:16px;color:#444;line-height:2;font-weight:300}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:40px 0;border-bottom:1px solid #ddd}
@media(max-width:640px){.two-col{grid-template-columns:1fr}}
.col-head{font-family:'Playfair Display',serif;font-size:18px;font-weight:900;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #1a1a1a}
.beat{padding:8px 0;font-size:14px;border-bottom:1px solid #eee;display:flex;align-items:center;gap:8px}
.beat-em{font-size:18px}
.beat-nm{font-weight:600}
.desk-list{padding:40px 0;border-bottom:1px solid #ddd}
.desk-item{padding:16px 0;border-bottom:1px solid #eee}
.desk-role{font-family:'Playfair Display',serif;font-size:16px;font-weight:700}
.desk-pub{font-family:'Inter',sans-serif;font-size:12px;color:#888;font-weight:600;margin-top:2px}
.desk-dur{font-family:'Inter',sans-serif;font-size:11px;color:#bbb}
.desk-desc{font-size:13px;color:#555;line-height:1.8;margin-top:6px}
.stories{padding:40px 0;border-bottom:1px solid #ddd}
.story-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.story{border:1px solid #ddd;padding:24px;background:#fff}
.story-em{font-size:32px;margin-bottom:10px}
.story-hl{font-family:'Playfair Display',serif;font-size:16px;font-weight:900;line-height:1.3}
.story-ds{font-size:12px;color:#666;line-height:1.7;margin-top:8px}
.classifieds{background:#1a1a1a;color:#f5f0e8;padding:48px;text-align:center;max-width:900px;margin:24px auto 0}
.classifieds .headline{color:#f5f0e8}
.classifieds .byline{color:#888}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(245,240,232,0.25);color:#f5f0e8;text-decoration:none;font-family:'Inter',sans-serif;font-size:12px;letter-spacing:0.05em;transition:all 0.3s}
.c-link:hover{background:rgba(245,240,232,0.08)}
footer{max-width:900px;margin:0 auto;text-align:center;padding:30px;font-size:11px;color:#aaa;font-family:'Inter',sans-serif;border-top:4px double #1a1a1a}
</style></head><body>

<div class="masthead">
  <div class="mast-date">${dateStr}</div>
  <div class="mast-name">${name}</div>
  <div class="mast-tagline">${role} · ${location}</div>
</div>

<div class="paper">
  <div class="headline-section">
    <div class="byline">About the Reporter</div>
    <div class="headline">The Story Behind the Byline</div>
    <p class="lead">${about}</p>
  </div>

  <div class="two-col">
    <div>
      <div class="col-head">Beats & Skills</div>
      ${skillNames.map((s,i) => `<div class="beat"><span class="beat-em">${['📝','🎙️','📊','📷','🔍','✍️','🌐','📻'][i%8]}</span><span class="beat-nm">${s}</span></div>`).join('')}
    </div>
    <div>
      <div class="col-head">Quick Facts</div>
      <div class="beat"><span class="beat-em">📍</span><span class="beat-nm">${location}</span></div>
      <div class="beat"><span class="beat-em">📧</span><span class="beat-nm">${email}</span></div>
      ${github ? `<div class="beat"><span class="beat-em">🐙</span><span class="beat-nm">${github.replace(/^https?:\\/\\//, '')}</span></div>` : ''}
      ${linkedin ? `<div class="beat"><span class="beat-em">💼</span><span class="beat-nm">${linkedin.replace(/^https?:\\/\\//, '')}</span></div>` : ''}
    </div>
  </div>

  <div class="desk-list">
    <div class="byline">Career</div>
    <div class="headline">The Newsroom</div>
    ${experience.length ? experience.map(e => `
      <div class="desk-item">
        <div class="desk-role">${e.title}</div>
        <div class="desk-pub">${e.company}</div>
        <div class="desk-dur">${e.duration}</div>
        <p class="desk-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="desk-item"><div class="desk-role">Senior Reporter</div><div class="desk-pub">Your Publication</div><div class="desk-dur">2020 – Present</div></div>'}
  </div>

  <div class="stories">
    <div class="byline">Portfolio</div>
    <div class="headline">Selected Stories</div>
    <div class="story-grid">
      ${projects.length ? projects.map(p => `
        <div class="story"><div class="story-em">${p.emoji || '📰'}</div><div class="story-hl">${p.name}</div><p class="story-ds">${p.description || ''}</p></div>`).join('') : '<div class="story"><div class="story-em">📰</div><div class="story-hl">Your Story</div><p class="story-ds">Add your published work here.</p></div>'}
    </div>
  </div>
</div>

<div class="classifieds">
  <div class="byline">Contact</div>
  <div class="headline">Get In Touch</div>
  <div class="c-links">
    <a href="mailto:${email}" class="c-link">📧 ${email}</a>
    ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
    <span class="c-link">📍 ${location}</span>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · All Rights Reserved</footer>
</body></html>`;
  }
};
