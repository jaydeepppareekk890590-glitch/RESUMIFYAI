/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: FLORIST
   Style: Botanical · Soft Pastel · Garden · Static
================================================================ */

window.TPL_FLORIST = {
  id: 'florist',
  name: 'Florist',
  category: 'Static Pro',
  theme: 'botanical-garden',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#f0f7f0,#e8f5e0,#f5faf0);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🌸</div>
        <div style="font-size:16px;font-weight:700;color:#2d6a4f">Florist</div>
        <div style="font-size:10px;color:rgba(45,106,79,0.5);margin-top:6px;letter-spacing:0.2em">BLOOM · ARRANGE · DELIGHT</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Floral Designer';
    const bio = data.bio || 'Creating stunning floral arrangements that bring joy to every occasion.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'flowers@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Wedding Bouquets','Event Decor','Ikebana','Landscape Design'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Florist Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fafcf7;color:#2d3a2d;font-family:'Nunito',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#2d6a4f,#40916c,#52b788);position:relative}
.hero-inner{z-index:2;padding:40px}
.bloom{font-size:100px;margin-bottom:16px}
.hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,7vw,64px);color:#fff;font-weight:300;font-style:italic}
.hero .sub{font-size:13px;color:rgba(255,255,255,0.6);letter-spacing:0.3em;text-transform:uppercase;margin-top:12px;font-weight:300}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.4);line-height:1.9}
.garden{max-width:800px;margin:0 auto;padding:80px 24px}
.leaf-sep{text-align:center;padding:30px 0;font-size:24px;color:#95d5b2}
.g-label{font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#52b788;font-weight:600;margin-bottom:6px}
.g-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,4vw,38px);font-weight:400;font-style:italic;margin-bottom:20px;color:#2d3a2d}
.g-text{font-size:15px;color:#5a6e5a;line-height:2}
.petal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.petal{background:#fff;border:1px solid #d8f3dc;border-radius:20px;padding:22px;text-align:center;transition:all 0.3s}
.petal:hover{box-shadow:0 8px 25px rgba(45,106,79,0.1);transform:translateY(-3px)}
.petal-em{font-size:28px;margin-bottom:8px}
.petal-nm{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:600;color:#2d6a4f}
.stem-line{border-left:2px solid #95d5b2;padding-left:24px}
.stem-item{padding:16px 0;position:relative}
.stem-item::before{content:'🌿';position:absolute;left:-20px;top:18px;font-size:12px}
.stem-role{font-weight:700;font-size:16px;color:#2d3a2d}
.stem-co{font-size:12px;color:#52b788;font-weight:600;margin-top:2px}
.stem-dur{font-size:11px;color:#aaa}
.stem-desc{font-size:13px;color:#5a6e5a;line-height:1.7;margin-top:6px}
.bouquet-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px}
.bouquet{background:#fff;border:1px solid #d8f3dc;border-radius:16px;padding:24px;transition:all 0.3s}
.bouquet:hover{box-shadow:0 8px 25px rgba(45,106,79,0.08)}
.bq-em{font-size:36px;margin-bottom:10px}
.bq-nm{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:16px;color:#2d6a4f}
.bq-ds{font-size:12px;color:#5a6e5a;line-height:1.7;margin-top:6px}
.contact-garden{background:linear-gradient(160deg,#2d6a4f,#40916c);border-radius:20px;padding:48px;text-align:center;color:#fff}
.contact-garden .g-title{color:#fff}
.contact-garden .g-label{color:rgba(255,255,255,0.6)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(255,255,255,0.3);border-radius:30px;color:#fff;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(255,255,255,0.15)}
footer{text-align:center;padding:30px;font-size:11px;color:#aaa;font-family:'Cormorant Garamond',serif;font-style:italic}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="bloom">🌸</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="garden">
  <div class="g-label">About</div>
  <div class="g-title">My Story</div>
  <p class="g-text">${about}</p>
  <div class="leaf-sep">🌿</div>

  <div class="g-label">Specialties</div>
  <div class="g-title">What I Create</div>
  <div class="petal-grid">
    ${skillNames.map((s,i) => `<div class="petal"><div class="petal-em">${['🌹','🌻','🌷','🌺','💐','🌼','🪻','🌾'][i%8]}</div><div class="petal-nm">${s}</div></div>`).join('')}
  </div>
  <div class="leaf-sep">🌿</div>

  <div class="g-label">Experience</div>
  <div class="g-title">Growing Career</div>
  <div class="stem-line">
    ${experience.length ? experience.map(e => `
      <div class="stem-item">
        <div class="stem-role">${e.title}</div>
        <div class="stem-co">${e.company}</div>
        <div class="stem-dur">${e.duration}</div>
        <p class="stem-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="stem-item"><div class="stem-role">Lead Florist</div><div class="stem-co">Your Shop</div><div class="stem-dur">2020 – Present</div></div>'}
  </div>
  <div class="leaf-sep">🌿</div>

  <div class="g-label">Portfolio</div>
  <div class="g-title">Featured Arrangements</div>
  <div class="bouquet-grid">
    ${projects.length ? projects.map(p => `
      <div class="bouquet"><div class="bq-em">${p.emoji || '💐'}</div><div class="bq-nm">${p.name}</div><p class="bq-ds">${p.description || ''}</p></div>`).join('') : '<div class="bouquet"><div class="bq-em">💐</div><div class="bq-nm">Your Arrangement</div><p class="bq-ds">Add your creations here.</p></div>'}
  </div>
  <div class="leaf-sep">🌿</div>

  <div class="contact-garden">
    <div class="g-label">Contact</div>
    <div class="g-title">Let's Create Beauty</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · Made with 🌸</footer>
</body></html>`;
  }
};
