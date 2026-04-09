/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: CHEF
   File: templates/portfolio/tpl-chef.js
   Style: Culinary · Warm Plating · Recipe Card · Static Designer
================================================================ */

window.TPL_CHEF = {
  id: 'chef',
  name: 'Chef',
  category: 'Static Pro',
  theme: 'culinary-warm',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a0a00,#2d1810,#3a1f15);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;position:relative;overflow:hidden;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">👨‍🍳</div>
        <div style="font-size:16px;font-weight:700;color:#e8a87c">Chef Portfolio</div>
        <div style="font-size:10px;color:rgba(232,168,124,0.5);margin-top:6px;letter-spacing:0.2em">TASTE · CREATE · SERVE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Executive Chef';
    const bio = data.bio || 'Passionate culinary artist crafting unforgettable dining experiences.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'chef@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['French Cuisine','Pastry','Plating','Farm-to-Table'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Chef Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf6f1;color:#2a1a0e;font-family:'Lato',sans-serif;overflow-x:hidden}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#1a0a00 0%,#3a1f15 40%,#5a3020 100%);position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L30 15 L25 20Z' fill='rgba(232,168,124,0.03)'/%3E%3C/svg%3E");opacity:0.5}
.hero-inner{text-align:center;position:relative;z-index:2;padding:40px 20px}
.chef-illustration{font-size:120px;margin-bottom:20px;filter:drop-shadow(0 10px 30px rgba(0,0,0,0.3))}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(36px,7vw,72px);color:#faf6f1;font-weight:900;letter-spacing:-0.02em}
.hero .role-tag{display:inline-block;margin-top:16px;padding:8px 28px;border:1px solid rgba(232,168,124,0.4);color:#e8a87c;font-size:12px;letter-spacing:0.3em;text-transform:uppercase}
.hero .bio-text{max-width:500px;margin:24px auto 0;color:rgba(250,246,241,0.6);font-size:15px;line-height:1.8;font-weight:300}
.divider{display:flex;align-items:center;justify-content:center;gap:16px;padding:60px 0}
.divider span{font-size:24px}
.divider::before,.divider::after{content:'';width:60px;height:1px;background:#d4a574}
section{max-width:900px;margin:0 auto;padding:0 24px 80px}
.section-label{font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#b87a4a;font-weight:700;margin-bottom:8px}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:#2a1a0e;margin-bottom:24px}
.about-text{font-size:16px;line-height:2;color:#5a3a25;max-width:650px}
.recipe-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px}
.recipe-card{background:#fff;border-radius:16px;padding:24px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid rgba(212,165,116,0.15);transition:transform 0.3s}
.recipe-card:hover{transform:translateY(-4px)}
.recipe-card .icon{font-size:32px;margin-bottom:12px}
.recipe-card .name{font-family:'Playfair Display',serif;font-weight:700;font-size:14px;color:#2a1a0e}
.exp-timeline{position:relative;padding-left:30px;border-left:2px solid #d4a574}
.exp-item{position:relative;padding:20px 0 30px 20px}
.exp-item::before{content:'';position:absolute;left:-7px;top:24px;width:12px;height:12px;border-radius:50%;background:#d4a574;border:3px solid #faf6f1}
.exp-role{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:#2a1a0e}
.exp-company{font-size:13px;color:#b87a4a;font-weight:700;margin-top:4px}
.exp-duration{font-size:11px;color:#999;letter-spacing:0.1em;margin-top:2px}
.exp-desc{font-size:14px;color:#5a3a25;line-height:1.7;margin-top:8px}
.proj-list{display:grid;gap:20px}
.proj-card{display:flex;gap:20px;background:#fff;border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,0.05);border:1px solid rgba(212,165,116,0.1)}
.proj-emoji{font-size:40px;flex-shrink:0}
.proj-name{font-family:'Playfair Display',serif;font-weight:700;font-size:16px;color:#2a1a0e}
.proj-desc{font-size:13px;color:#5a3a25;line-height:1.7;margin-top:4px}
.proj-tech{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
.proj-tech span{padding:3px 10px;background:#faf0e6;border-radius:12px;font-size:11px;color:#b87a4a;font-weight:700}
.contact-section{background:linear-gradient(160deg,#1a0a00,#3a1f15);border-radius:24px;padding:60px 40px;text-align:center;color:#faf6f1}
.contact-section .section-title{color:#faf6f1}
.contact-section .section-label{color:#e8a87c}
.contact-links{display:flex;flex-wrap:wrap;justify-content:center;gap:16px;margin-top:24px}
.contact-link{display:flex;align-items:center;gap:8px;padding:12px 24px;border:1px solid rgba(232,168,124,0.3);border-radius:30px;color:#e8a87c;text-decoration:none;font-size:14px;transition:all 0.3s}
.contact-link:hover{background:rgba(232,168,124,0.1);border-color:#e8a87c}
footer{text-align:center;padding:40px;font-size:12px;color:#999}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="chef-illustration">👨‍🍳</div>
    <h1>${name}</h1>
    <div class="role-tag">${role}</div>
    <p class="bio-text">${bio}</p>
  </div>
</div>

<div class="divider"><span>🍽️</span></div>

<section>
  <div class="section-label">About Me</div>
  <div class="section-title">My Culinary Story</div>
  <p class="about-text">${about}</p>
</section>

<div class="divider"><span>🔪</span></div>

<section>
  <div class="section-label">Specialties</div>
  <div class="section-title">What I Master</div>
  <div class="recipe-grid">
    ${skillNames.map((s,i) => `<div class="recipe-card"><div class="icon">${['🥘','🍰','🍣','🥗','🍝','🧁','🥩','🍜'][i%8]}</div><div class="name">${s}</div></div>`).join('')}
  </div>
</section>

<div class="divider"><span>📖</span></div>

<section>
  <div class="section-label">Experience</div>
  <div class="section-title">Kitchen Journey</div>
  <div class="exp-timeline">
    ${experience.length ? experience.map(e => `
      <div class="exp-item">
        <div class="exp-role">${e.title}</div>
        <div class="exp-company">${e.company}</div>
        <div class="exp-duration">${e.duration}</div>
        <p class="exp-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="exp-item"><div class="exp-role">Head Chef</div><div class="exp-company">Your Restaurant</div><div class="exp-duration">2020 – Present</div></div>'}
  </div>
</section>

<div class="divider"><span>⭐</span></div>

<section>
  <div class="section-label">Signature Dishes</div>
  <div class="section-title">Featured Creations</div>
  <div class="proj-list">
    ${projects.length ? projects.map(p => `
      <div class="proj-card">
        <div class="proj-emoji">${p.emoji || '🍽️'}</div>
        <div>
          <div class="proj-name">${p.name}</div>
          <p class="proj-desc">${p.description || ''}</p>
          <div class="proj-tech">${(p.tech||[]).map(t => `<span>${t}</span>`).join('')}</div>
        </div>
      </div>`).join('') : '<div class="proj-card"><div class="proj-emoji">🍽️</div><div><div class="proj-name">Your Signature Dish</div><p class="proj-desc">Add your culinary creations here.</p></div></div>'}
  </div>
</section>

<div class="divider"><span>📬</span></div>

<section>
  <div class="contact-section">
    <div class="section-label">Get In Touch</div>
    <div class="section-title">Let's Cook Together</div>
    <div class="contact-links">
      <a href="mailto:${email}" class="contact-link">📧 ${email}</a>
      ${github ? `<a href="${github}" target="_blank" class="contact-link">🐙 GitHub</a>` : ''}
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="contact-link">💼 LinkedIn</a>` : ''}
      <span class="contact-link">📍 ${location}</span>
    </div>
  </div>
</section>

<footer>© ${new Date().getFullYear()} ${name} · Crafted with ❤️ & 🔥</footer>
</body></html>`;
  }
};
