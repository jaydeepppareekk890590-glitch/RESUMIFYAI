"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPortfolio } from "@/lib/firebase";

function PortfolioViewContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) { setError("No portfolio ID provided"); setLoading(false); return; }
    getPortfolio(id).then(data => {
      if (!data) { setError("Portfolio not found"); setLoading(false); return; }
      const d = data as Record<string, unknown>;

      // ── If the portfolio has pre-generated HTML (published from builder), use it directly ──
      if (d.generatedHtml && typeof d.generatedHtml === "string" && d.generatedHtml.length > 200) {
        setHtml(d.generatedHtml);
        setLoading(false);
        return;
      }

      // ── Otherwise generate HTML from saved portData fields (legacy) ──
      const name = (d.name as string) || "";
      const role = (d.role as string) || "";
      const bio = (d.bio as string) || "";
      const about = (d.about as string) || "";
      const github = (d.github as string) || "";
      const linkedin = (d.linkedin as string) || "";
      const email = (d.email as string) || "";
      const phone = (d.phone as string) || "";
      const skills = (d.skills as { name: string; level: number }[]) || [];
      const experience = (d.experience as { title: string; company: string; duration: string; description: string }[]) || [];
      const projects = (d.projects as { name: string; emoji: string; description: string; tech: string[]; liveUrl: string; githubUrl: string }[]) || [];
      const stats = (d.stats as { value: string; label: string }[]) || [];
      const testimonial = (d.testimonial as { text: string; author: string; role: string }) || { text: "", author: "", role: "" };

      const skillsHtml = skills.map(s => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px">
          <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:6px">
            <span>${s.name}</span><span style="color:#a78bfa">${s.level}%</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#22c55e);width:${s.level}%"></div>
          </div>
        </div>`).join("");

      const expHtml = experience.map(e => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px">
          <div style="font-weight:700;color:#fff;margin-bottom:4px">${e.title} — <span style="color:#a78bfa">${e.company}</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-bottom:8px">${e.duration}</div>
          <p style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6">${e.description}</p>
        </div>`).join("");

      const projHtml = projects.map(p => `
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px">
          <div style="font-size:24px;margin-bottom:10px">${p.emoji || "🚀"}</div>
          <h3 style="font-size:16px;font-weight:700;color:#fff;margin-bottom:8px">${p.name}</h3>
          <p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:12px">${p.description}</p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">
            ${(p.tech || []).map(t => `<span style="padding:2px 8px;border-radius:10px;background:rgba(124,58,237,0.12);color:#a78bfa;font-size:10px;border:1px solid rgba(124,58,237,0.2)">${t}</span>`).join("")}
          </div>
          <div style="display:flex;gap:8px">
            ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" style="padding:6px 14px;border-radius:8px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);color:#a78bfa;text-decoration:none;font-size:11px;font-weight:600">Live ↗</a>` : ""}
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" style="padding:6px 14px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;text-decoration:none;font-size:11px;font-weight:600">GitHub</a>` : ""}
          </div>
        </div>`).join("");

      const statsHtml = stats.map(s => `
        <div style="text-align:center">
          <div style="font-size:28px;font-weight:900;color:#a78bfa">${s.value}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-top:2px">${s.label}</div>
        </div>`).join("");

      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0a0a14;color:#f0f0f5;overflow-x:hidden}
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,10,20,0.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0 40px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Outfit',sans-serif;font-size:18px;font-weight:900;color:#fff}.logo span{color:#a78bfa}
nav ul{list-style:none;display:flex;gap:28px}
nav ul a{font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;font-weight:500;cursor:pointer;transition:color 0.2s}
nav ul a:hover{color:#fff}
section{padding:100px 40px 80px}.container{max-width:1060px;margin:0 auto}
h1{font-family:'Outfit',sans-serif;font-size:clamp(36px,5vw,66px);font-weight:900;line-height:1.05;letter-spacing:-0.02em}
h2{font-family:'Outfit',sans-serif;font-size:32px;font-weight:800;margin-bottom:16px}
.tag{display:inline-block;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3)}
footer{padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:rgba(255,255,255,0.3)}
@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.fade-up{animation:fadeUp 0.7s ease forwards}
</style>
</head>
<body>
<nav>
  <div class="logo">${name.split(" ")[0] || "PORTFOLIO"}<span>.</span></div>
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
<section id="home" style="min-height:100vh;display:flex;align-items:center;padding-top:80px;background:radial-gradient(ellipse at 60% 40%,rgba(124,58,237,0.15) 0%,transparent 60%)">
  <div class="container fade-up">
    <div class="tag">${role}</div>
    <h1>${name}</h1>
    <p style="font-size:18px;color:rgba(255,255,255,0.55);max-width:520px;margin:20px 0 32px;line-height:1.7">${bio || "Passionate professional building amazing things."}</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      ${github ? `<a href="${github}" target="_blank" rel="noopener" style="padding:10px 22px;border-radius:10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);color:#fff;text-decoration:none;font-size:13px;font-weight:600">GitHub</a>` : ""}
      ${linkedin ? `<a href="${linkedin}" target="_blank" rel="noopener" style="padding:10px 22px;border-radius:10px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);color:#a78bfa;text-decoration:none;font-size:13px;font-weight:600">LinkedIn</a>` : ""}
    </div>
    <div style="display:flex;gap:24px;margin-top:48px;flex-wrap:wrap">${statsHtml}</div>
  </div>
</section>
${about || experience.length ? `
<section id="about" style="background:rgba(255,255,255,0.02)">
  <div class="container">
    <h2>About <span style="color:#a78bfa">Me</span></h2>
    ${about ? `<p style="font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;max-width:680px">${about}</p>` : ""}
    ${experience.length ? `<div style="margin-top:40px"><h3 style="font-size:18px;font-weight:700;color:#fff;margin-bottom:20px">Experience</h3><div style="display:grid;gap:14px">${expHtml}</div></div>` : ""}
  </div>
</section>` : ""}
${skills.length ? `
<section id="skills">
  <div class="container">
    <h2>Skills &amp; <span style="color:#22c55e">Technologies</span></h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:20px">${skillsHtml}</div>
  </div>
</section>` : ""}
${projects.length ? `
<section id="projects" style="background:rgba(255,255,255,0.02)">
  <div class="container">
    <h2>Featured <span style="color:#a78bfa">Projects</span></h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:24px">${projHtml}</div>
  </div>
</section>` : ""}
<section id="contact">
  <div class="container" style="text-align:center">
    <h2>Get in <span style="color:#22c55e">Touch</span></h2>
    <div style="display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:20px">
      ${email ? `<a href="mailto:${email}" style="padding:12px 24px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;font-weight:700;font-size:14px">${email}</a>` : ""}
      ${phone ? `<a href="tel:${phone}" style="padding:12px 24px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#fff;text-decoration:none;font-weight:600;font-size:14px">${phone}</a>` : ""}
    </div>
    ${testimonial?.text ? `
    <div style="margin-top:56px;padding:28px;background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);border-radius:20px;max-width:540px;margin-left:auto;margin-right:auto">
      <p style="font-size:15px;font-style:italic;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:14px">"${testimonial.text}"</p>
      <div style="font-weight:700;color:#fff">${testimonial.author}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.4)">${testimonial.role}</div>
    </div>` : ""}
  </div>
</section>
<footer>© ${new Date().getFullYear()} ${name} · Built with Resumify</footer>
<script>
  window.addEventListener('load',function(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        e.preventDefault();
        var el=document.getElementById(this.getAttribute('href').slice(1));
        if(el)el.scrollIntoView({behavior:'smooth'});
      });
    });
  });
</script>
</body>
</html>`;
      setHtml(fullHtml);
    }).catch(() => setError("Failed to load portfolio")).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0a14" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading portfolio...</div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (error) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0a14" }}>
      <div style={{ textAlign: "center", color: "#f87171" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
        <div>{error}</div>
      </div>
    </div>
  );

  if (!html) return null;
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} style={{ minHeight: "100vh" }} />
  );
}

export default function PortfolioViewPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0a14" }}>
        <div style={{ color: "rgba(255,255,255,0.4)" }}>Loading...</div>
      </div>
    }>
      <PortfolioViewContent />
    </Suspense>
  );
}
