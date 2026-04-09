/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: MUSICIAN
   Style: Vinyl Record · Dark Stage · Neon Glow · Static
================================================================ */

window.TPL_MUSICIAN = {
  id: 'musician',
  name: 'Musician',
  category: 'Static Pro',
  theme: 'stage-neon',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#0a0015,#1a0030,#0a0015);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">🎸</div>
        <div style="font-size:16px;font-weight:700;color:#ff6b9d">Musician</div>
        <div style="font-size:10px;color:rgba(255,107,157,0.5);margin-top:6px;letter-spacing:0.2em">PLAY · COMPOSE · PERFORM</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Musician & Composer';
    const bio = data.bio || 'Creating melodies that move souls.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'music@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Guitar','Piano','Vocals','Music Production'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Musician Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0015;color:#fff;font-family:'Inter',sans-serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(255,107,157,0.15),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%)}
.hero-inner{z-index:2;padding:40px}
.vinyl{font-size:110px;margin-bottom:20px}
.hero h1{font-family:'Bebas Neue',cursive;font-size:clamp(48px,10vw,100px);letter-spacing:0.05em;color:#fff;text-shadow:0 0 60px rgba(255,107,157,0.3)}
.hero .sub{font-size:14px;color:#ff6b9d;letter-spacing:0.3em;text-transform:uppercase;font-weight:300}
.hero .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.3);line-height:1.9}
.content{max-width:800px;margin:0 auto;padding:60px 24px}
.neon-line{width:60px;height:2px;background:linear-gradient(90deg,#ff6b9d,#c44dff);margin:50px 0;border-radius:2px;box-shadow:0 0 10px rgba(255,107,157,0.5)}
.lbl{font-family:'Bebas Neue',cursive;font-size:13px;letter-spacing:0.4em;color:#ff6b9d}
.ttl{font-family:'Bebas Neue',cursive;font-size:clamp(28px,5vw,42px);margin:6px 0 20px;letter-spacing:0.05em}
.about{font-size:15px;color:rgba(255,255,255,0.5);line-height:2;font-weight:300}
.instrument-row{display:flex;gap:14px;flex-wrap:wrap}
.inst{padding:14px 26px;border:1px solid rgba(255,107,157,0.25);border-radius:40px;font-size:13px;font-weight:600;color:#ff6b9d;background:rgba(255,107,157,0.05);transition:all 0.3s}
.inst:hover{background:rgba(255,107,157,0.15);box-shadow:0 0 20px rgba(255,107,157,0.2)}
.gig-list{display:grid;gap:16px}
.gig{padding:22px;border-left:3px solid #ff6b9d;background:rgba(255,255,255,0.02)}
.gig-role{font-size:16px;font-weight:700}
.gig-venue{font-size:12px;color:#ff6b9d;margin-top:4px}
.gig-time{font-size:11px;color:rgba(255,255,255,0.3)}
.gig-desc{font-size:13px;color:rgba(255,255,255,0.45);line-height:1.7;margin-top:8px}
.album-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}
.album{background:rgba(255,255,255,0.03);border:1px solid rgba(255,107,157,0.1);border-radius:12px;padding:24px;transition:all 0.3s}
.album:hover{border-color:rgba(255,107,157,0.4);box-shadow:0 0 30px rgba(255,107,157,0.1)}
.album-em{font-size:40px;margin-bottom:10px}
.album-nm{font-weight:700;font-size:15px}
.album-ds{font-size:12px;color:rgba(255,255,255,0.4);line-height:1.6;margin-top:4px}
.contact-sec{border:1px solid rgba(255,107,157,0.2);border-radius:16px;padding:40px;text-align:center;margin-top:50px;background:rgba(255,107,157,0.02)}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:20px}
.c-link{padding:10px 24px;border:1px solid rgba(255,107,157,0.3);border-radius:30px;color:#ff6b9d;text-decoration:none;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(255,107,157,0.1)}
footer{text-align:center;padding:40px;font-size:11px;color:rgba(255,255,255,0.15);font-family:'Bebas Neue',cursive;letter-spacing:0.2em}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="vinyl">🎸</div>
    <h1>${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="content">
  <div class="lbl">About</div>
  <div class="ttl">My Story</div>
  <p class="about">${about}</p>
  <div class="neon-line"></div>

  <div class="lbl">Skills</div>
  <div class="ttl">Instruments & Skills</div>
  <div class="instrument-row">
    ${skillNames.map(s => `<div class="inst">${s}</div>`).join('')}
  </div>
  <div class="neon-line"></div>

  <div class="lbl">Experience</div>
  <div class="ttl">Performances & Gigs</div>
  <div class="gig-list">
    ${experience.length ? experience.map(e => `
      <div class="gig">
        <div class="gig-role">${e.title}</div>
        <div class="gig-venue">${e.company}</div>
        <div class="gig-time">${e.duration}</div>
        <p class="gig-desc">${e.description || ''}</p>
      </div>`).join('') : '<div class="gig"><div class="gig-role">Lead Performer</div><div class="gig-venue">Your Venue</div><div class="gig-time">2020 – Present</div></div>'}
  </div>
  <div class="neon-line"></div>

  <div class="lbl">Discography</div>
  <div class="ttl">Albums & Tracks</div>
  <div class="album-grid">
    ${projects.length ? projects.map(p => `
      <div class="album"><div class="album-em">${p.emoji || '🎵'}</div><div class="album-nm">${p.name}</div><p class="album-ds">${p.description || ''}</p></div>`).join('') : '<div class="album"><div class="album-em">🎵</div><div class="album-nm">Your Album</div><p class="album-ds">Add your music here.</p></div>'}
  </div>

  <div class="contact-sec">
    <div class="lbl">Booking</div>
    <div class="ttl">Get In Touch</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · All Rights Reserved</footer>
</body></html>`;
  }
};
