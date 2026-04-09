/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: PILOT
   Style: Aviation · Cockpit · Sky Blue · Static
================================================================ */

window.TPL_PILOT = {
  id: 'pilot',
  name: 'Pilot',
  category: 'Static Pro',
  theme: 'aviation-sky',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(180deg,#0a1628,#1a3a5c,#4a90c4);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:sans-serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">✈️</div>
        <div style="font-size:16px;font-weight:700;color:#fff">Pilot</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:6px;letter-spacing:0.2em">FLY · NAVIGATE · SOAR</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Commercial Pilot';
    const bio = data.bio || 'Navigating the skies with precision, safety, and passion.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'pilot@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Boeing 737','Instrument Rating','Navigation','CRM'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Capt. ${name} — Aviation Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#f0f4f8;color:#1a2a3a;font-family:'Inter',sans-serif}
.sky{min-height:100vh;background:linear-gradient(180deg,#0a1628 0%,#1a3a5c 40%,#4a90c4 80%,#8ec5e8 100%);display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden}
.clouds{position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(180deg,transparent,rgba(240,244,248,0.6),#f0f4f8)}
.sky-inner{z-index:2;padding:40px}
.plane{font-size:90px;margin-bottom:16px}
.sky h1{font-family:'Rajdhani',sans-serif;font-size:clamp(40px,8vw,72px);font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:0.1em}
.sky .sub{font-family:'Rajdhani',sans-serif;font-size:14px;color:rgba(255,255,255,0.5);letter-spacing:0.4em;text-transform:uppercase;font-weight:300}
.sky .bio{max-width:420px;margin:16px auto 0;font-size:14px;color:rgba(255,255,255,0.35);line-height:1.8}
.flight-log{max-width:820px;margin:0 auto;padding:60px 24px}
.fl-sec{margin-bottom:50px}
.fl-lbl{font-family:'Rajdhani',sans-serif;font-size:12px;letter-spacing:0.4em;text-transform:uppercase;color:#4a90c4;font-weight:600}
.fl-ttl{font-family:'Rajdhani',sans-serif;font-size:clamp(24px,4vw,36px);font-weight:700;text-transform:uppercase;margin:4px 0 18px}
.fl-text{font-size:15px;color:#5a6a7a;line-height:2}
.cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.cert{background:#fff;border-radius:12px;padding:20px;text-align:center;box-shadow:0 2px 15px rgba(0,0,0,0.04);border-top:3px solid #4a90c4;transition:all 0.3s}
.cert:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.cert-em{font-size:28px;margin-bottom:8px}
.cert-nm{font-family:'Rajdhani',sans-serif;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;color:#1a2a3a}
.log-entries{display:grid;gap:14px}
.log-entry{display:grid;grid-template-columns:60px 1fr;gap:16px;background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 10px rgba(0,0,0,0.03)}
.log-icon{width:48px;height:48px;background:linear-gradient(135deg,#4a90c4,#1a3a5c);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px}
.log-role{font-family:'Rajdhani',sans-serif;font-weight:700;font-size:16px;text-transform:uppercase}
.log-co{font-size:12px;color:#4a90c4;font-weight:600;margin-top:2px}
.log-dur{font-size:11px;color:#999}
.log-desc{font-size:13px;color:#5a6a7a;line-height:1.7;margin-top:6px}
.mission-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.mission{background:#fff;border-radius:12px;padding:24px;box-shadow:0 2px 15px rgba(0,0,0,0.04);transition:all 0.3s}
.mission:hover{box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.mis-em{font-size:36px;margin-bottom:10px}
.mis-nm{font-family:'Rajdhani',sans-serif;font-weight:700;font-size:15px;text-transform:uppercase}
.mis-ds{font-size:12px;color:#5a6a7a;line-height:1.6;margin-top:6px}
.contact-runway{background:linear-gradient(160deg,#0a1628,#1a3a5c);border-radius:16px;padding:48px;text-align:center;color:#fff}
.contact-runway .fl-ttl{color:#fff}
.contact-runway .fl-lbl{color:#8ec5e8}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(142,197,232,0.3);color:#8ec5e8;text-decoration:none;font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;transition:all 0.3s}
.c-link:hover{background:rgba(142,197,232,0.1)}
footer{text-align:center;padding:30px;font-size:11px;color:#aaa;font-family:'Rajdhani',sans-serif;text-transform:uppercase;letter-spacing:0.15em}
</style></head><body>

<div class="sky">
  <div class="clouds"></div>
  <div class="sky-inner">
    <div class="plane">✈️</div>
    <h1>Capt. ${name}</h1>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="flight-log">
  <div class="fl-sec">
    <div class="fl-lbl">About</div>
    <div class="fl-ttl">Flight Profile</div>
    <p class="fl-text">${about}</p>
  </div>

  <div class="fl-sec">
    <div class="fl-lbl">Certifications</div>
    <div class="fl-ttl">Ratings & Skills</div>
    <div class="cert-grid">
      ${skillNames.map((s,i) => `<div class="cert"><div class="cert-em">${['🛩️','📡','🧭','🎖️','⚙️','📋','🌐','🔧'][i%8]}</div><div class="cert-nm">${s}</div></div>`).join('')}
    </div>
  </div>

  <div class="fl-sec">
    <div class="fl-lbl">Flight Log</div>
    <div class="fl-ttl">Career History</div>
    <div class="log-entries">
      ${experience.length ? experience.map(e => `
        <div class="log-entry"><div class="log-icon">✈️</div><div>
          <div class="log-role">${e.title}</div>
          <div class="log-co">${e.company}</div>
          <div class="log-dur">${e.duration}</div>
          <p class="log-desc">${e.description || ''}</p>
        </div></div>`).join('') : '<div class="log-entry"><div class="log-icon">✈️</div><div><div class="log-role">First Officer</div><div class="log-co">Your Airline</div><div class="log-dur">2020 – Present</div></div></div>'}
    </div>
  </div>

  <div class="fl-sec">
    <div class="fl-lbl">Missions</div>
    <div class="fl-ttl">Notable Flights</div>
    <div class="mission-grid">
      ${projects.length ? projects.map(p => `
        <div class="mission"><div class="mis-em">${p.emoji || '🌍'}</div><div class="mis-nm">${p.name}</div><p class="mis-ds">${p.description || ''}</p></div>`).join('') : '<div class="mission"><div class="mis-em">🌍</div><div class="mis-nm">Your Mission</div><p class="mis-ds">Add your notable flights here.</p></div>'}
    </div>
  </div>

  <div class="contact-runway">
    <div class="fl-lbl">Contact</div>
    <div class="fl-ttl">Clear for Contact</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} Capt. ${name} · Blue Skies</footer>
</body></html>`;
  }
};
