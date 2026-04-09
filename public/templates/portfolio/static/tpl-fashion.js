/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: FASHION DESIGNER
   Style: Runway · Editorial · Haute · Static
================================================================ */

window.TPL_FASHION = {
  id: 'fashion',
  name: 'Fashion Designer',
  category: 'Static Pro',
  theme: 'runway-editorial',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:#faf8f5;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">👗</div>
        <div style="font-size:16px;font-weight:700;color:#1a1a1a">Fashion</div>
        <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:6px;letter-spacing:0.2em">DESIGN · CREATE · INSPIRE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Fashion Designer';
    const bio = data.bio || 'Blending art with fabric to create wearable masterpieces.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'fashion@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Haute Couture','Pattern Making','Textile Design','Brand Strategy'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Fashion Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf8f5;color:#1a1a1a;font-family:'Montserrat',sans-serif}
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center}
.hero-left{padding:80px 60px;display:flex;flex-direction:column;justify-content:center}
.hero-right{min-height:100vh;background:linear-gradient(160deg,#1a1a1a,#333);display:flex;align-items:center;justify-content:center}
.hero-emoji{font-size:120px}
.hero-overline{font-size:10px;letter-spacing:0.6em;text-transform:uppercase;color:#999;margin-bottom:16px}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,60px);font-weight:300;line-height:1.15;font-style:italic}
.hero .bar{width:40px;height:1px;background:#1a1a1a;margin:24px 0}
.hero .sub{font-size:12px;letter-spacing:0.2em;color:#888;text-transform:uppercase}
.hero .bio{font-size:14px;color:#888;line-height:1.9;margin-top:20px;max-width:380px;font-weight:300}
@media(max-width:768px){.hero{grid-template-columns:1fr}.hero-right{min-height:40vh}.hero-left{padding:40px 24px}}
.content{max-width:900px;margin:0 auto;padding:80px 24px}
.editorial-line{width:1px;height:60px;background:#ddd;margin:0 auto}
.sec{padding:60px 0}
.sec-over{font-size:10px;letter-spacing:0.5em;text-transform:uppercase;color:#aaa;margin-bottom:8px}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,42px);font-weight:300;font-style:italic;margin-bottom:24px}
.sec-text{font-size:15px;color:#666;line-height:2;font-weight:300;max-width:550px}
.craft-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:#eee}
.craft{background:#faf8f5;padding:28px;text-align:center}
.craft-em{font-size:28px;margin-bottom:10px}
.craft-nm{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:600;color:#1a1a1a}
.runway{display:grid;gap:1px;background:#eee}
.run-item{display:grid;grid-template-columns:120px 1fr;background:#faf8f5}
.run-period{padding:20px;font-family:'Cormorant Garamond',serif;font-size:13px;color:#aaa;font-style:italic;border-right:1px solid #eee}
.run-info{padding:20px}
.run-role{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600}
.run-co{font-size:12px;color:#999;margin-top:2px}
.run-desc{font-size:13px;color:#777;line-height:1.7;margin-top:8px}
.collection-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.collection{border:1px solid #eee;padding:28px;transition:all 0.3s}
.collection:hover{box-shadow:0 8px 30px rgba(0,0,0,0.06)}
.col-em{font-size:36px;margin-bottom:12px}
.col-nm{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600}
.col-ds{font-size:12px;color:#888;line-height:1.7;margin-top:6px}
.col-tg{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.col-tg span{font-size:10px;padding:3px 10px;border:1px solid #ddd;color:#888;letter-spacing:0.05em}
.contact-editorial{text-align:center;padding:80px 24px;border-top:1px solid #eee}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
.c-link{padding:12px 28px;border:1px solid #ddd;color:#1a1a1a;text-decoration:none;font-size:12px;letter-spacing:0.1em;transition:all 0.3s}
.c-link:hover{background:#1a1a1a;color:#faf8f5}
footer{text-align:center;padding:40px;font-size:10px;color:#ccc;font-family:'Cormorant Garamond',serif;font-style:italic;letter-spacing:0.1em}
</style></head><body>

<div class="hero">
  <div class="hero-left">
    <div class="hero-overline">Fashion Portfolio</div>
    <h1>${name}</h1>
    <div class="bar"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
  <div class="hero-right">
    <div class="hero-emoji">👗</div>
  </div>
</div>

<div class="content">
  <div class="sec">
    <div class="sec-over">About</div>
    <div class="sec-title">The Designer</div>
    <p class="sec-text">${about}</p>
  </div>

  <div class="editorial-line"></div>

  <div class="sec">
    <div class="sec-over">Expertise</div>
    <div class="sec-title">Craft & Skill</div>
    <div class="craft-grid">
      ${skillNames.map((s,i) => `<div class="craft"><div class="craft-em">${['✂️','🧵','🎨','👠','💎','🪡','📐','🖌️'][i%8]}</div><div class="craft-nm">${s}</div></div>`).join('')}
    </div>
  </div>

  <div class="editorial-line"></div>

  <div class="sec">
    <div class="sec-over">Experience</div>
    <div class="sec-title">Career Path</div>
    <div class="runway">
      ${experience.length ? experience.map(e => `
        <div class="run-item">
          <div class="run-period">${e.duration}</div>
          <div class="run-info">
            <div class="run-role">${e.title}</div>
            <div class="run-co">${e.company}</div>
            <p class="run-desc">${e.description || ''}</p>
          </div>
        </div>`).join('') : '<div class="run-item"><div class="run-period">2020–Now</div><div class="run-info"><div class="run-role">Lead Designer</div><div class="run-co">Your Brand</div></div></div>'}
    </div>
  </div>

  <div class="editorial-line"></div>

  <div class="sec">
    <div class="sec-over">Collections</div>
    <div class="sec-title">Featured Work</div>
    <div class="collection-grid">
      ${projects.length ? projects.map(p => `
        <div class="collection">
          <div class="col-em">${p.emoji || '👗'}</div>
          <div class="col-nm">${p.name}</div>
          <p class="col-ds">${p.description || ''}</p>
          <div class="col-tg">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div>
        </div>`).join('') : '<div class="collection"><div class="col-em">👗</div><div class="col-nm">Your Collection</div><p class="col-ds">Add your work here.</p></div>'}
    </div>
  </div>
</div>

<div class="contact-editorial">
  <div class="sec-over">Contact</div>
  <div class="sec-title">Let's Collaborate</div>
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
