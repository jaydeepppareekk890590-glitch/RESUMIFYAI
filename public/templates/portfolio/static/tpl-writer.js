/* ================================================================
   RESUMIFY — PORTFOLIO TEMPLATE: WRITER / AUTHOR
   Style: Typewriter · Literary · Warm Parchment · Static
================================================================ */

window.TPL_WRITER = {
  id: 'writer',
  name: 'Writer',
  category: 'Static Pro',
  theme: 'typewriter-literary',
  animated: false,

  thumbnail() {
    return `
      <div style="width:100%;height:100%;background:linear-gradient(160deg,#f5ead8,#fdf6ec);display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:'Georgia',serif;border-radius:16px">
        <div style="font-size:48px;margin-bottom:8px">✍️</div>
        <div style="font-size:16px;font-weight:700;color:#2d1810">Writer</div>
        <div style="font-size:10px;color:rgba(45,24,16,0.4);margin-top:6px;letter-spacing:0.2em">WRITE · INSPIRE · PUBLISH</div>
      </div>`;
  },

  render(data) {
    const name = data.name || 'Your Name';
    const role = data.role || 'Author & Writer';
    const bio = data.bio || 'Weaving words into worlds, one story at a time.';
    const about = data.about || bio;
    const location = data.location || 'Your City';
    const email = data.email || 'write@email.com';
    const github = data.github || '';
    const linkedin = data.linkedin || '';
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const skillNames = skills.length ? skills.map(s => s.name || s) : ['Fiction','Copywriting','Screenwriting','Poetry'];

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${name} — Writer Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Special+Elite&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fdf6ec;color:#2d1810;font-family:'Lora',serif}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative}
.hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.1 0 0 0 0 0.06 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23p)'/%3E%3C/svg%3E")}
.hero-inner{z-index:2;padding:40px}
.pen{font-size:80px;margin-bottom:20px}
.hero h1{font-size:clamp(36px,6vw,60px);font-weight:700;line-height:1.2}
.hero h1 em{font-style:italic;font-weight:400}
.hero .bar{width:60px;height:1px;background:#2d1810;margin:20px auto}
.hero .sub{font-family:'Special Elite',cursive;font-size:14px;color:#8a6a50;letter-spacing:0.15em}
.hero .bio{max-width:450px;margin:20px auto 0;font-size:14px;color:#8a6a50;line-height:2;font-style:italic}
.manuscript{max-width:700px;margin:0 auto;padding:60px 24px}
.chapter{margin-bottom:60px}
.ch-num{font-family:'Special Elite',cursive;font-size:12px;color:#c4a882;letter-spacing:0.3em;margin-bottom:4px}
.ch-title{font-size:clamp(24px,4vw,36px);font-weight:600;margin-bottom:16px}
.ch-text{font-size:15px;color:#5a3a25;line-height:2.2;font-weight:400}
.genre-shelf{display:flex;gap:14px;flex-wrap:wrap}
.genre{padding:12px 24px;background:#f5ead8;border-radius:4px;font-family:'Special Elite',cursive;font-size:13px;color:#2d1810;border-bottom:2px solid #c4a882}
.pub-list{display:grid;gap:20px}
.pub{display:flex;gap:20px;padding:24px;background:#f5ead8;border-radius:4px;border-left:3px solid #c4a882}
.pub-em{font-size:36px;flex-shrink:0}
.pub-nm{font-weight:700;font-size:16px}
.pub-ds{font-size:13px;color:#5a3a25;line-height:1.7;margin-top:4px;font-style:italic}
.exp-stack{border-left:2px solid #c4a882;padding-left:24px}
.exp-item{padding:16px 0;position:relative}
.exp-item::before{content:'"';position:absolute;left:-32px;top:12px;font-size:24px;color:#c4a882;font-family:'Lora',serif}
.exp-role{font-size:17px;font-weight:700}
.exp-co{font-size:13px;color:#c4a882;font-weight:600;margin-top:2px}
.exp-dur{font-size:11px;color:#aaa}
.exp-desc{font-size:13px;color:#5a3a25;line-height:1.8;margin-top:6px;font-style:italic}
.contact-ch{text-align:center;padding:60px 24px;background:#2d1810;color:#fdf6ec;border-radius:4px}
.contact-ch .ch-title{color:#fdf6ec}
.contact-ch .ch-num{color:#c4a882}
.c-links{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin-top:16px}
.c-link{padding:10px 24px;border:1px solid rgba(196,168,130,0.4);color:#c4a882;text-decoration:none;font-family:'Special Elite',cursive;font-size:13px;transition:all 0.3s}
.c-link:hover{background:rgba(196,168,130,0.1)}
footer{text-align:center;padding:40px;font-size:12px;color:#c4a882;font-style:italic}
</style></head><body>

<div class="hero">
  <div class="hero-inner">
    <div class="pen">✍️</div>
    <h1>${name}</h1>
    <div class="bar"></div>
    <div class="sub">${role}</div>
    <p class="bio">${bio}</p>
  </div>
</div>

<div class="manuscript">
  <div class="chapter">
    <div class="ch-num">Chapter I</div>
    <div class="ch-title">About the Author</div>
    <p class="ch-text">${about}</p>
  </div>

  <div class="chapter">
    <div class="ch-num">Chapter II</div>
    <div class="ch-title">Genres & Craft</div>
    <div class="genre-shelf">
      ${skillNames.map(s => `<div class="genre">${s}</div>`).join('')}
    </div>
  </div>

  <div class="chapter">
    <div class="ch-num">Chapter III</div>
    <div class="ch-title">Writing Career</div>
    <div class="exp-stack">
      ${experience.length ? experience.map(e => `
        <div class="exp-item">
          <div class="exp-role">${e.title}</div>
          <div class="exp-co">${e.company}</div>
          <div class="exp-dur">${e.duration}</div>
          <p class="exp-desc">${e.description || ''}</p>
        </div>`).join('') : '<div class="exp-item"><div class="exp-role">Senior Writer</div><div class="exp-co">Your Publisher</div><div class="exp-dur">2020 – Present</div></div>'}
    </div>
  </div>

  <div class="chapter">
    <div class="ch-num">Chapter IV</div>
    <div class="ch-title">Published Works</div>
    <div class="pub-list">
      ${projects.length ? projects.map(p => `
        <div class="pub"><div class="pub-em">${p.emoji || '📖'}</div><div><div class="pub-nm">${p.name}</div><p class="pub-ds">${p.description || ''}</p></div></div>`).join('') : '<div class="pub"><div class="pub-em">📖</div><div><div class="pub-nm">Your Book</div><p class="pub-ds">Add your publications here.</p></div></div>'}
    </div>
  </div>

  <div class="contact-ch">
    <div class="ch-num">Epilogue</div>
    <div class="ch-title">Let's Write Together</div>
    <div class="c-links">
      <a href="mailto:${email}" class="c-link">📧 ${email}</a>
      ${linkedin ? `<a href="${linkedin}" target="_blank" class="c-link">💼 LinkedIn</a>` : ''}
      <span class="c-link">📍 ${location}</span>
    </div>
  </div>
</div>
<footer>© ${new Date().getFullYear()} ${name} · The End.</footer>
</body></html>`;
  }
};
