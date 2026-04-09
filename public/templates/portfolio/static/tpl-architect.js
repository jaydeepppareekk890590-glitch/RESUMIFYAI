/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: ARCHITECT
   File: templates/portfolio/tpl-architect.js
   Style: Blueprint · Grid · Structural · Static Designer
================================================================ */

window.TPL_ARCHITECT = {
  id: 'architect',
  name: 'Architect',
  category: 'Static Pro',
  theme: 'blueprint',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#0a1628,#132744,#1a3a5c);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Courier New',monospace;position:relative;overflow:hidden;border-radius:16px">
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(100,180,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(100,180,255,0.08) 1px,transparent 1px);background-size:20px 20px"></div>
        <div style="font-size:48px;position:relative;z-index:1;margin-bottom:8px">🏛️</div>
        <div style="font-size:16px;font-weight:700;color:#64b4ff;position:relative;z-index:1">Architect</div>
        <div style="font-size:10px;color:rgba(100,180,255,0.5);margin-top:6px;letter-spacing:0.2em;position:relative;z-index:1">DESIGN · BUILD · INSPIRE</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Principal Architect';
    const bio = data.bio || 'Designing spaces that inspire and endure.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'architect@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['AutoCAD','Revit','SketchUp','Sustainable Design'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Architect Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f8f9fa;color:#1a1a2e;font-family:'Space Grotesk',sans-serif;overflow-x:hidden}
.blueprint-bg{position:fixed;inset:0;background:#0a1628;z-index:0}
.blueprint-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(100,180,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(100,180,255,0.06) 1px,transparent 1px);background-size:40px 40px;z-index:1}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;z-index:2}
.hero-content{text-align:center;padding:40px}
.hero-icon{font-size:80px;margin-bottom:24px;opacity:0.9}
.hero-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.5em;color:rgba(100,180,255,0.5);text-transform:uppercase;margin-bottom:16px}
.hero h1{font-size:clamp(36px,7vw,68px);font-weight:700;color:#fff;letter-spacing:-0.03em;line-height:1.1}
.hero .subtitle{font-size:16px;color:rgba(100,180,255,0.6);margin-top:16px;font-weight:300;letter-spacing:0.1em}
.hero .bio{max-width:480px;margin:20px auto 0;color:rgba(255,255,255,0.35);font-size:14px;line-height:1.9}
.main-content{position:relative;z-index:2;background:#f8f9fa;border-radius:32px 32px 0 0;margin-top:-40px}
.sec{max-width:880px;margin:0 auto;padding:80px 24px}
.sec-num{font-family:'Space Mono',monospace;font-size:48px;font-weight:700;color:rgba(26,26,46,0.06);margin-bottom:-20px}
.sec-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:0.4em;text-transform:uppercase;color:#64b4ff;margin-bottom:8px}
.sec-title{font-size:clamp(24px,4vw,36px);font-weight:700;color:#1a1a2e;margin-bottom:24px;letter-spacing:-0.02em}
.about-text{font-size:16px;line-height:2;color:#555;max-width:600px}
.skills-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.skill-block{background:#fff;border:1px solid #e8ecf0;padding:20px;text-align:center;font-weight:600;font-size:13px;color:#1a1a2e;transition:all 0.3s;border-left:3px solid #64b4ff}
.skill-block:hover{box-shadow:0 8px 30px rgba(0,0,0,0.08);transform:translateY(-2px)}
.exp-list{display:grid;gap:20px}
.exp-card{background:#fff;border:1px solid #e8ecf0;padding:28px;display:grid;grid-template-columns:auto 1fr;gap:20px;transition:all 0.3s}
.exp-card:hover{box-shadow:0 8px 30px rgba(0,0,0,0.06)}
.exp-line{width:3px;background:linear-gradient(180deg,#64b4ff,#1a3a5c);border-radius:2px}
.exp-role{font-size:17px;font-weight:700;color:#1a1a2e}
.exp-co{font-size:13px;color:#64b4ff;font-weight:600;margin-top:4px}
.exp-dur{font-family:'Space Mono',monospace;font-size:11px;color:#999;margin-top:2px}
.exp-desc{font-size:14px;color:#666;line-height:1.7;margin-top:8px}
.proj-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.proj-card{background:#fff;border:1px solid #e8ecf0;padding:28px;transition:all 0.3s;position:relative;overflow:hidden}
.proj-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#64b4ff,#1a3a5c)}
.proj-card:hover{box-shadow:0 12px 40px rgba(0,0,0,0.08);transform:translateY(-3px)}
.proj-emoji{font-size:36px;margin-bottom:12px}
.proj-name{font-size:16px;font-weight:700;color:#1a1a2e}
.proj-desc{font-size:13px;color:#666;line-height:1.7;margin-top:6px}
.proj-tech{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
.proj-tech span{padding:3px 10px;background:#f0f4f8;font-size:11px;color:#64b4ff;font-weight:600;font-family:'Space Mono',monospace}
.contact-bar{background:#0a1628;padding:60px 24px;text-align:center;position:relative;z-index:2}
.contact-bar .sec-title{color:#fff}
.contact-bar .sec-label{color:#64b4ff}
.contact-links{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:24px}
.contact-link{padding:12px 24px;border:1px solid rgba(100,180,255,0.25);color:#64b4ff;text-decoration:none;font-size:13px;font-weight:500;transition:all 0.3s}
.contact-link:hover{background:rgba(100,180,255,0.1);border-color:#64b4ff}
footer{text-align:center;padding:30px;font-size:11px;color:#aaa;background:#0a1628;font-family:'Space Mono',monospace}
</style></head><body>
<div class="blueprint-bg"></div>
<div class="blueprint-grid"></div>

<div class="hero">
  <div class="hero-content">
    <div class="hero-icon">🏛️</div>
    <div class="hero-label">Architecture Portfolio</div>
    <h1>${name}</h1>
    <div class="subtitle">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="main-content">
  <div class="sec">
    <div class="sec-num">01</div>
    <div class="sec-label">Introduction</div>
    <div class="sec-title">Design Philosophy</div>
    <p class="about-text">${about}</p>
  </div>

  <div class="sec">
    <div class="sec-num">02</div>
    <div class="sec-label">Expertise</div>
    <div class="sec-title">Technical Skills</div>
    <div class="skills-row">
      ${skillNames.map(s => `<div class="skill-block">${s}</div>`).join('')}
    </div>
  </div>

  <div class="sec">
    <div class="sec-num">03</div>
    <div class="sec-label">Career</div>
    <div class="sec-title">Professional Journey</div>
    <div class="exp-list">
      ${experience.length ? experience.map(e => `
        <div class="exp-card"><div class="exp-line"></div><div>
          <div class="exp-role">${e.title}</div>
          <div class="exp-co">${e.company}</div>
          <div class="exp-dur">${e.duration}</div>
          <p class="exp-desc">${e.description || ''}</p>
        </div></div>`).join('') : '<div class="exp-card"><div class="exp-line"></div><div><div class="exp-role">Lead Architect</div><div class="exp-co">Your Firm</div><div class="exp-dur">2020 – Present</div></div></div>'}
    </div>
  </div>

  <div class="sec">
    <div class="sec-num">04</div>
    <div class="sec-label">Portfolio</div>
    <div class="sec-title">Featured Projects</div>
    <div class="proj-grid">
      ${projects.length ? projects.map(p => `
        <div class="proj-card">
          <div class="proj-emoji">${p.emoji || '🏗️'}</div>
          <div class="proj-name">${p.name}</div>
          <p class="proj-desc">${p.description || ''}</p>
          <div class="proj-tech">${(p.tech||[]).map(t=>`<span>${t}</span>`).join('')}</div>
        </div>`).join('') : '<div class="proj-card"><div class="proj-emoji">🏗️</div><div class="proj-name">Your Project</div><p class="proj-desc">Showcase your architectural work here.</p></div>'}
    </div>
  </div>
</div>

<div class="contact-bar">
  <div class="sec-label">Contact</div>
  <div class="sec-title">Let's Build Together</div>
  <div class="contact-links">
    <a href="mailto:${email}" class="contact-link">📧 ${email}</a>
    ${github ? `<a href="${github}" target="_blank" class="contact-link">🐙 GitHub</a>` : ''}
    ${linkedin ? `<a href="${linkedin}" target="_blank" class="contact-link">💼 LinkedIn</a>` : ''}
    <span class="contact-link">📍 ${location}</span>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · Designed with precision</footer>
</body></html>`;
  }
};
