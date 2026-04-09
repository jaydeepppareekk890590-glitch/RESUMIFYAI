/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: FILMMAKER
   Style: Cinematic · Widescreen · Dark · Static
================================================================ */

window.TPL_FILMMAKER = {
  id: 'filmmaker',
  name: 'Filmmaker',
  category: 'Static Pro',
  theme: 'cinematic-dark',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:#0a0a0a;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px;position:relative">
        <div style="position:absolute;top:0;left:0;right:0;height:18px;background:repeating-linear-gradient(90deg,#222 0,#222 14px,#0a0a0a 14px,#0a0a0a 18px)"></div>
        <div style="position:absolute;bottom:0;left:0;right:0;height:18px;background:repeating-linear-gradient(90deg,#222 0,#222 14px,#0a0a0a 14px,#0a0a0a 18px)"></div>
        <div style="font-size:48px;margin-bottom:8px;z-index:1">🎬</div>
        <div style="font-size:16px;font-weight:700;color:#e0c068;z-index:1">Filmmaker</div>
        <div style="font-size:10px;color:rgba(224,192,104,0.5);margin-top:6px;letter-spacing:0.2em;z-index:1">DIRECT · SHOOT · EDIT</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Director & Filmmaker';
    const bio = data.bio || 'Telling stories through the lens, one frame at a time.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'film@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Directing','Cinematography','Editing','Screenwriting'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Filmmaker Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0a;color:#e8e8e8;font-family:'Source Sans 3',sans-serif}
.letterbox{height:8vh;background:#000;position:relative;z-index:10}
.hero{height:84vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#0a0a0a,#141420);position:relative}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(224,192,104,0.04),transparent 70%)}
.hero-inner{z-index:2;padding:40px}
.clapper{font-size:90px;margin-bottom:16px}
.hero h1{font-family:'Bebas Neue',cursive;font-size:clamp(48px,10vw,96px);letter-spacing:0.08em;color:#e0c068;line-height:1}
.hero .sub{font-size:14px;color:rgba(255,255,255,0.3);letter-spacing:0.4em;text-transform:uppercase;margin-top:12px}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.2);line-height:1.8}
.reel{max-width:800px;margin:0 auto;padding:60px 24px}
.cut{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(224,192,104,0.2),transparent);margin:50px 0}
.r-lbl{font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:0.3em;color:#e0c068}
.r-ttl{font-family:'Bebas Neue',cursive;font-size:clamp(28px,5vw,44px);letter-spacing:0.05em;margin:4px 0 20px}
.r-text{font-size:15px;color:rgba(255,255,255,0.4);line-height:2;font-weight:300}
.craft-row{display:flex;gap:14px;flex-wrap:wrap}
.craft-pill{padding:12px 24px;border:1px solid rgba(224,192,104,0.2);color:#e0c068;font-size:13px;font-weight:600;transition:all 0.3s}
.craft-pill:hover{background:rgba(224,192,104,0.08);border-color:#e0c068}
.credit-list{display:grid;gap:14px}
.credit{padding:20px;border-bottom:1px solid rgba(255,255,255,0.04)}
.cr-role{font-family:'Bebas Neue',cursive;font-size:18px;letter-spacing:0.05em}
.cr-prod{font-size:12px;color:#e0c068;margin-top:2px}
.cr-year{font-size:11px;color:rgba(255,255,255,0.25)}
.cr-desc{font-size:13px;color:rgba(255,255,255,0.35);line-height:1.7;margin-top:6px}
.film-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.film-card{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);padding:24px;aspect-ratio:16/10;display:flex;flex-direction:column;justify-content:flex-end;transition:all 0.3s}
.film-card:hover{border-color:rgba(224,192,104,0.3)}
.film-em{font-size:40px;margin-bottom:auto}
.film-nm{font-family:'Bebas Neue',cursive;font-size:18px;letter-spacing:0.05em}
.film-ds{font-size:12px;color:rgba(255,255,255,0.35);line-height:1.5;margin-top:4px}
.contact-reel{border:1px solid rgba(224,192,104,0.2);padding:48px;text-align:center;margin-top:50px}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(224,192,104,0.25);color:#e0c068;text-decoration:none;font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:0.1em;transition:all 0.3s}
.c-link:hover{background:rgba(224,192,104,0.08)}
footer{text-align:center;padding:40px;font-size:10px;color:rgba(255,255,255,0.12);font-family:'Bebas Neue',cursive;letter-spacing:0.2em}
</style></head><body>

<div class="letterbox"></div>
<div class="hero">
  <div class="hero-inner">
    <div class="clapper">🎬</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>
<div class="letterbox"></div>

<div class="reel">
  <div class="r-lbl">About</div>
  <div class="r-ttl">Director's Note</div>
  <p class="r-text">${about}</p>
  <div class="cut"></div>

  <div class="r-lbl">Craft</div>
  <div class="r-ttl">Skills & Tools</div>
  <div class="craft-row">
    ${skillNames.map(s => `<div class="craft-pill">${s}</div>`).join('')}
  </div>
  <div class="cut"></div>

  <div class="r-lbl">Credits</div>
  <div class="r-ttl">Filmography</div>
  <div class="credit-list">
    ${experience.length ? experience.map(e => `
      <div class="credit">
        <div class="cr-role">${e.title}</div>
        <div class="cr-prod">${e.company}</div>
        <div class="cr-year">${e.duration}</div>
        <p class="cr-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="credit"><div class="cr-role">Director</div><div class="cr-prod">Your Film</div><div class="cr-year">2023</div></div>'}
  </div>
  <div class="cut"></div>

  <div class="r-lbl">Films</div>
  <div class="r-ttl">Selected Works</div>
  <div class="film-grid">
    ${projects.length ? projects.map(p => `
      <div class="film-card"><div class="film-em">${p.emoji || '🎥'}</div><div class="film-nm">${p.name}</div><p class="film-ds">${p.description || ''}</p></div>`).join('') : '<div class="film-card"><div class="film-em">🎥</div><div class="film-nm">Your Film</div><p class="film-ds">Add your films here.</p></div>'}
  </div>

  <div class="contact-reel">
    <div class="r-lbl">Contact</div>
    <div class="r-ttl">Let's Create</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · FIN</footer>
</body></html>`;
  }
};
