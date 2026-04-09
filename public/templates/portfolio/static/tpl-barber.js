/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: BARBER
   Style: Vintage Barbershop · Striped · Bold · Static
================================================================ */

window.TPL_BARBER = {
  id: 'barber',
  name: 'Barber',
  category: 'Static Pro',
  theme: 'vintage-barbershop',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px;position:relative;overflow:hidden">
        <div style="position:absolute;left:10px;top:0;bottom:0;width:6px;background:repeating-linear-gradient(180deg,#e74c3c 0,#e74c3c 10px,#fff 10px,#fff 20px,#3498db 20px,#3498db 30px);opacity:0.6"></div>
        <div style="font-size:48px;margin-bottom:8px;z-index:1">💈</div>
        <div style="font-size:16px;font-weight:700;color:#e74c3c;z-index:1">Barber</div>
        <div style="font-size:10px;color:rgba(231,76,60,0.5);margin-top:6px;letter-spacing:0.2em;z-index:1">CUT · STYLE · GROOM</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Master Barber';
    const bio = data.bio || 'Precision cuts and classic grooming for the modern gentleman.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'barber@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Fades','Beard Styling','Hot Towel Shave','Hair Design'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Barber Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0e0e18;color:#fff;font-family:'Barlow',sans-serif}
.pole{position:fixed;left:0;top:0;bottom:0;width:8px;background:repeating-linear-gradient(180deg,#e74c3c 0,#e74c3c 20px,#fff 20px,#fff 40px,#3498db 40px,#3498db 60px);z-index:100;opacity:0.8}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(160deg,#0e0e18,#1a1a2e);position:relative}
.hero-inner{z-index:2;padding:40px}
.scissors{font-size:90px;margin-bottom:16px}
.hero h1{font-family:'Bebas Neue',cursive;font-size:clamp(48px,10vw,100px);letter-spacing:0.08em;line-height:1}
.hero .stripe{width:80px;height:3px;background:linear-gradient(90deg,#e74c3c,#fff,#3498db);margin:16px auto}
.hero .sub{font-family:'Bebas Neue',cursive;font-size:16px;color:rgba(255,255,255,0.4);letter-spacing:0.4em}
.hero .bio{max-width:400px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.25);line-height:1.8}
.shop{max-width:800px;margin:0 auto;padding:60px 24px 60px 30px}
.shop-sep{width:50px;height:3px;background:linear-gradient(90deg,#e74c3c,#3498db);margin:50px 0}
.sh-lbl{font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:0.3em;color:#e74c3c}
.sh-ttl{font-family:'Bebas Neue',cursive;font-size:clamp(28px,5vw,42px);letter-spacing:0.05em;margin:4px 0 20px}
.sh-text{font-size:15px;color:rgba(255,255,255,0.5);line-height:2;font-weight:300}
.service-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px}
.service{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);padding:22px;text-align:center;transition:all 0.3s}
.service:hover{border-color:#e74c3c;background:rgba(231,76,60,0.05)}
.svc-em{font-size:28px;margin-bottom:8px}
.svc-nm{font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:0.1em;color:#e74c3c}
.chair-list{display:grid;gap:14px}
.chair{border-left:3px solid #e74c3c;padding:18px 22px;background:rgba(255,255,255,0.02)}
.chair-role{font-family:'Bebas Neue',cursive;font-size:18px;letter-spacing:0.05em}
.chair-co{font-size:12px;color:#e74c3c;margin-top:2px}
.chair-dur{font-size:11px;color:rgba(255,255,255,0.3)}
.chair-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.7;margin-top:6px}
.style-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.style-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);padding:24px;transition:all 0.3s}
.style-card:hover{border-color:rgba(231,76,60,0.3)}
.sty-em{font-size:32px;margin-bottom:10px}
.sty-nm{font-family:'Bebas Neue',cursive;font-size:16px;letter-spacing:0.05em}
.sty-ds{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;margin-top:6px}
.contact-shop{background:linear-gradient(160deg,#e74c3c,#c0392b);padding:48px;text-align:center;margin-top:50px}
.contact-shop .sh-ttl{color:#fff}
.contact-shop .sh-lbl{color:rgba(255,255,255,0.7)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:2px solid rgba(255,255,255,0.4);color:#fff;text-decoration:none;font-family:'Bebas Neue',cursive;font-size:14px;letter-spacing:0.1em;transition:all 0.3s}
.c-link:hover{background:#fff;color:#e74c3c}
footer{text-align:center;padding:30px;font-size:10px;color:rgba(255,255,255,0.15);font-family:'Bebas Neue',cursive;letter-spacing:0.2em}
</style></head><body>
<div class="pole"></div>

<div class="hero">
  <div class="hero-inner">
    <div class="scissors">💈</div>
    <h1>${name}</h1>
    <div class="stripe"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="shop">
  <div class="sh-lbl">About</div>
  <div class="sh-ttl">The Barber</div>
  <p class="sh-text">${about}</p>
  <div class="shop-sep"></div>

  <div class="sh-lbl">Services</div>
  <div class="sh-ttl">What I Offer</div>
  <div class="service-grid">
    ${skillNames.map((s,i) => `<div class="service"><div class="svc-em">${['✂️','🪒','💇','🧴','💆','🪮','🎨','👔'][i%8]}</div><div class="svc-nm">${s}</div></div>`).join('')}
  </div>
  <div class="shop-sep"></div>

  <div class="sh-lbl">Experience</div>
  <div class="sh-ttl">Career</div>
  <div class="chair-list">
    ${experience.length ? experience.map(e => `
      <div class="chair">
        <div class="chair-role">${e.title}</div>
        <div class="chair-co">${e.company}</div>
        <div class="chair-dur">${e.duration}</div>
        <p class="chair-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="chair"><div class="chair-role">Master Barber</div><div class="chair-co">Your Shop</div><div class="chair-dur">2020 – Present</div></div>'}
  </div>
  <div class="shop-sep"></div>

  <div class="sh-lbl">Styles</div>
  <div class="sh-ttl">Signature Work</div>
  <div class="style-grid">
    ${projects.length ? projects.map(p => `
      <div class="style-card"><div class="sty-em">${p.emoji || '💈'}</div><div class="sty-nm">${p.name}</div><p class="sty-ds">${p.description || ''}</p></div>`).join('') : '<div class="style-card"><div class="sty-em">💈</div><div class="sty-nm">Your Style</div><p class="sty-ds">Add your work here.</p></div>'}
  </div>
</div>

<div class="contact-shop">
  <div class="sh-lbl">Book Now</div>
  <div class="sh-ttl">Get In Touch</div>
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
