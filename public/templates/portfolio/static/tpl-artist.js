/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: ARTIST / PAINTER
   Style: Gallery · Canvas · Paint Splash · Static
================================================================ */

window.TPL_ARTIST = {
  id: 'artist',
  name: 'Artist',
  category: 'Static Pro',
  theme: 'gallery-canvas',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#faf5ef,#f0e8dd);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px;position:relative;overflow:hidden">
        <div style="position:absolute;top:15px;right:15px;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,#e74c3c,transparent);opacity:0.3"></div>
        <div style="position:absolute;bottom:20px;left:15px;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,#3498db,transparent);opacity:0.3"></div>
        <div style="font-size:48px;margin-bottom:8px;z-index:1">🎨</div>
        <div style="font-size:16px;font-weight:700;color:#2c3e50;z-index:1">Artist</div>
        <div style="font-size:10px;color:rgba(44,62,80,0.4);margin-top:6px;letter-spacing:0.2em;z-index:1">PAINT · CREATE · EXHIBIT</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Visual Artist';
    const bio = data.bio || 'Expressing emotions through color, form, and texture.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'art@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Oil Painting','Watercolor','Sculpture','Digital Art'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Artist Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Karla:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#faf5ef;color:#2c3e50;font-family:'Karla',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
.splash{position:absolute;border-radius:50%;opacity:0.08}
.s1{width:300px;height:300px;background:#e74c3c;top:10%;left:5%}
.s2{width:250px;height:250px;background:#3498db;bottom:15%;right:8%}
.s3{width:200px;height:200px;background:#f1c40f;top:50%;left:50%;transform:translate(-50%,-50%)}
.hero-inner{z-index:2;padding:40px}
.palette{font-size:100px;margin-bottom:20px}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(38px,7vw,68px);font-weight:900;font-style:italic}
.hero .bar{width:60px;height:2px;background:#2c3e50;margin:20px auto}
.hero .sub{font-size:13px;color:#7f8c8d;letter-spacing:0.25em;text-transform:uppercase}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:#95a5a6;line-height:1.9}
.gallery{max-width:840px;margin:0 auto;padding:80px 24px}
.frame{border:3px solid #e0d5c5;padding:36px;margin-bottom:40px;background:#fff;box-shadow:0 4px 20px rgba(0,0,0,0.04);position:relative}
.frame::before{content:'';position:absolute;inset:6px;border:1px solid rgba(224,213,197,0.4)}
.fr-label{font-size:10px;letter-spacing:0.4em;text-transform:uppercase;color:#c0a882;margin-bottom:6px}
.fr-title{font-family:'Playfair Display',serif;font-size:clamp(22px,3.5vw,32px);font-weight:700;margin-bottom:16px}
.fr-text{font-size:15px;color:#7f8c8d;line-height:2}
.medium-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}
.medium{background:#faf5ef;border:2px solid #e0d5c5;border-radius:0;padding:22px;text-align:center;transition:all 0.3s}
.medium:hover{border-color:#c0a882;transform:translateY(-2px)}
.med-em{font-size:30px;margin-bottom:8px}
.med-nm{font-family:'Playfair Display',serif;font-size:13px;font-weight:700}
.exhibit-list{display:grid;gap:16px}
.exhibit{display:flex;gap:20px;padding:20px;border-bottom:1px solid #e0d5c5}
.exh-dot{width:12px;height:12px;border-radius:50%;background:#c0a882;margin-top:6px;flex-shrink:0}
.exh-role{font-family:'Playfair Display',serif;font-size:16px;font-weight:700}
.exh-venue{font-size:12px;color:#c0a882;margin-top:2px}
.exh-dur{font-size:11px;color:#bdc3c7}
.exh-desc{font-size:13px;color:#7f8c8d;line-height:1.7;margin-top:6px}
.artwork-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.artwork{border:3px solid #e0d5c5;padding:24px;background:#fff;transition:all 0.3s}
.artwork:hover{box-shadow:0 8px 30px rgba(0,0,0,0.06)}
.art-em{font-size:40px;margin-bottom:10px}
.art-nm{font-family:'Playfair Display',serif;font-size:16px;font-weight:700}
.art-ds{font-size:12px;color:#7f8c8d;line-height:1.7;margin-top:6px}
.contact-frame{border:3px solid #2c3e50;padding:48px;text-align:center;background:#2c3e50;color:#faf5ef}
.contact-frame .fr-title{color:#faf5ef}
.contact-frame .fr-label{color:#c0a882}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(250,245,239,0.3);color:#faf5ef;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(250,245,239,0.1)}
footer{text-align:center;padding:40px;font-size:11px;color:#bdc3c7;font-family:'Playfair Display',serif;font-style:italic}
</style></head><body>

<div class="hero">
  <div class="splash s1"></div>
  <div class="splash s2"></div>
  <div class="splash s3"></div>
  <div class="hero-inner">
    <div class="palette">🎨</div>
    <h1>${name}</h1>
    <div class="bar"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="gallery">
  <div class="frame">
    <div class="fr-label">About</div>
    <div class="fr-title">Artist Statement</div>
    <p class="fr-text">${about}</p>
  </div>

  <div class="frame">
    <div class="fr-label">Mediums</div>
    <div class="fr-title">Techniques & Skills</div>
    <div class="medium-grid">
      ${skillNames.map((s,i) => `<div class="medium"><div class="med-em">${['🖌️','🎨','🗿','💻','📷','✏️','🖼️','🪡'][i%8]}</div><div class="med-nm">${s}</div></div>`).join('')}
    </div>
  </div>

  <div class="frame">
    <div class="fr-label">Exhibitions</div>
    <div class="fr-title">Career Highlights</div>
    <div class="exhibit-list">
      ${experience.length ? experience.map(e => `
        <div class="exhibit"><div class="exh-dot"></div><div>
          <div class="exh-role">${e.title}</div>
          <div class="exh-venue">${e.company}</div>
          <div class="exh-dur">${e.duration}</div>
          <p class="exh-desc">${e.description || ''}</p>
        </div></div>`).join('') : '<div class="exhibit"><div class="exh-dot"></div><div><div class="exh-role">Solo Exhibition</div><div class="exh-venue">Your Gallery</div><div class="exh-dur">2023</div></div></div>'}
    </div>
  </div>

  <div class="frame">
    <div class="fr-label">Works</div>
    <div class="fr-title">Selected Artworks</div>
    <div class="artwork-grid">
      ${projects.length ? projects.map(p => `
        <div class="artwork"><div class="art-em">${p.emoji || '🖼️'}</div><div class="art-nm">${p.name}</div><p class="art-ds">${p.description || ''}</p></div>`).join('') : '<div class="artwork"><div class="art-em">🖼️</div><div class="art-nm">Your Artwork</div><p class="art-ds">Add your work here.</p></div>'}
    </div>
  </div>

  <div class="contact-frame">
    <div class="fr-label">Contact</div>
    <div class="fr-title">Commission & Collaborate</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name}</footer>
</body></html>`;
  }
};
