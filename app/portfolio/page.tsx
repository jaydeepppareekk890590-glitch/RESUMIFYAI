"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useDevUser } from "@/lib/useDevUser";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import GlobalLoader from "@/components/ui/GlobalLoader";
import RainbowButton from "@/components/ui/RainbowButton";
import { savePortfolio, getPortfolio, deductCredit, getUserResumes, getUserCredits, getPlanLimits } from "@/lib/firebase";
import {
  PORTFOLIO_STATIC_TEMPLATES,
  PORTFOLIO_3D_TEMPLATES,
  type PortfolioTemplate
} from "@/lib/template-registry";

async function geminiCall(prompt: string): Promise<string> {
  const res = await fetch("/api/gemini", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || "";
}

interface Skill { name: string; level: number; }
interface Exp { title: string; company: string; duration: string; description: string; }
interface Proj { name: string; emoji: string; description: string; liveUrl: string; githubUrl: string; tech: string[]; }
interface PortData {
  id?: string; name: string; role: string; bio: string; about: string;
  photo: string; github: string; linkedin: string; email: string; phone: string; location: string;
  skills: Skill[]; experience: Exp[]; projects: Proj[];
  stats: { value: string; label: string }[];
  testimonial: { text: string; author: string; role: string };
  templateId: string;
}

// ── Load portfolio template JS and call render(data) ──
async function renderPortfolioTemplate(tpl: PortfolioTemplate, data: PortData): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create a hidden iframe to execute the template JS
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(iframe);

    const cleanup = () => {
      try { document.body.removeChild(iframe); } catch {}
    };

    iframe.onload = () => {
      try {
        const win = iframe.contentWindow as Window & { [key: string]: { render: (d: PortData) => string } };
        const script = iframe.contentDocument!.createElement("script");
        script.src = tpl.file + "?t=" + Date.now();
        script.onload = () => {
          try {
            const tplObj = (win as Record<string, unknown>)[tpl.scriptVar] as { render: (d: PortData) => string };
            if (tplObj && typeof tplObj.render === "function") {
              const html = tplObj.render(data);
              cleanup();
              resolve(html);
            } else {
              cleanup();
              reject(new Error("Template render function not found: " + tpl.scriptVar));
            }
          } catch (e) { cleanup(); reject(e); }
        };
        script.onerror = () => { cleanup(); reject(new Error("Failed to load template script")); };
        iframe.contentDocument!.head.appendChild(script);
      } catch (e) { cleanup(); reject(e); }
    };

    // Write a blank page into iframe
    iframe.src = "about:blank";
    const idoc = iframe.contentDocument;
    if (idoc) {
      idoc.open();
      idoc.write("<!DOCTYPE html><html><head></head><body></body></html>");
      idoc.close();
      // Trigger manually since onload may already have fired
      iframe.onload?.(new Event("load"));
    }
  });
}

// ── Thumbnail card component ──
function PortfolioTemplateCard({ tpl, selected, onSelect, onPreview }: {
  tpl: PortfolioTemplate;
  selected: boolean;
  onSelect: () => void;
  onPreview: (html: string) => void;
}) {
  const [thumbHtml, setThumbHtml] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);
  const [loading3D, setLoading3D] = useState(false);

  useEffect(() => {
    // Load thumbnail: fetch the JS, eval it, call thumbnail()
    let cancelled = false;
    (async () => {
      try {
        const code = await fetch(tpl.file + "?t=1").then(r => r.text());
        // Run in sandboxed Function context
        const fn = new Function(code + `; return window.${tpl.scriptVar} || this.${tpl.scriptVar};`);
        const obj = fn.call({}) as { thumbnail?: () => string; render?: (d: PortData) => string };
        // Try from window too (the JS sets window.TPL_*)
        const win = window as unknown as Record<string, unknown>;
        const tplObj = (win[tpl.scriptVar] as { thumbnail?: () => string }) || obj;
        if (tplObj?.thumbnail && !cancelled) {
          setThumbHtml(tplObj.thumbnail());
        }
      } catch {
        // Fallback thumbnail
        if (!cancelled) setThumbHtml(null);
      }
    })();
    return () => { cancelled = true; };
  }, [tpl.file, tpl.scriptVar]);

  const handlePreview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading3D(true);
    try {
      const dummyData: PortData = {
        name: "Alex Johnson", role: tpl.category, bio: "A passionate creator building amazing things.",
        about: "I specialise in building elegant solutions to complex problems.",
        photo: "", github: "https://github.com", linkedin: "https://linkedin.com",
        email: "alex@example.com", phone: "+1 234 567 890", location: "San Francisco, CA",
        skills: [{ name: "Design", level: 90 }, { name: "Development", level: 85 }, { name: "Strategy", level: 80 }],
        experience: [{ title: "Senior Designer", company: "Acme Corp", duration: "2021–Present", description: "Led the design team." }],
        projects: [{ name: "Project One", emoji: "🚀", description: "A great project.", liveUrl: "", githubUrl: "", tech: ["React", "Node.js"] }],
        stats: [{ value: "5+", label: "Years" }, { value: "20+", label: "Projects" }],
        testimonial: { text: "Outstanding work!", author: "Client", role: "CEO" },
        templateId: tpl.id,
      };
      const html = await renderPortfolioTemplate(tpl, dummyData);
      onPreview(html);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading3D(false);
    }
  };

  const fallbackThumb = (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(135deg, #0a0a0f, #1a1a2e)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 8,
    }}>
      <div style={{ fontSize: 36 }}>{tpl.emoji}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{tpl.name}</div>
      {tpl.animated && (
        <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>3D ANIMATED</div>
      )}
    </div>
  );

  return (
    <div
      style={{
        borderRadius: 16, overflow: "hidden",
        border: selected ? "2px solid var(--violet3)" : "2px solid rgba(255,255,255,0.06)",
        background: "var(--surface)", cursor: "pointer",
        transition: "all 0.25s ease",
        transform: selected || hovered ? "translateY(-4px)" : "none",
        boxShadow: selected ? "0 0 28px rgba(124,58,237,0.45)" : hovered ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {selected && (
        <div style={{
          position: "absolute", top: 10, right: 10, zIndex: 10,
          width: 24, height: 24, borderRadius: "50%", background: "var(--violet2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(124,58,237,0.6)",
        }}>
          <i className="fas fa-check" style={{ color: "#fff", fontSize: 10 }} />
        </div>
      )}

      {/* Thumbnail */}
      <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
        {thumbHtml ? (
          <div dangerouslySetInnerHTML={{ __html: thumbHtml }} style={{ width: "100%", height: "100%" }} />
        ) : fallbackThumb}

        {/* 3D badge */}
        {tpl.animated && (
          <div style={{
            position: "absolute", top: 8, left: 8,
            fontSize: 8, fontWeight: 800, background: "rgba(255,215,0,0.15)",
            color: "#ffd700", padding: "3px 8px", borderRadius: 8,
            border: "1px solid rgba(255,215,0,0.3)", letterSpacing: "0.1em",
          }}>3D</div>
        )}

        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <button
              onClick={handlePreview}
              disabled={loading3D}
              style={{
                background: "rgba(124,58,237,0.9)", border: "1px solid rgba(167,139,250,0.5)",
                color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: loading3D ? "wait" : "pointer",
                fontSize: 11, fontWeight: 700, fontFamily: "inherit",
              }}
            >
              {loading3D ? <><i className="fas fa-spinner fa-spin" /> Loading...</> : <><i className="fas fa-play" /> Preview</>}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{tpl.name}</div>
        <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6 }}>{tpl.category}</div>
        <div style={{ display: "flex", gap: 4 }}>
          {tpl.animated ? (
            <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(255,215,0,0.1)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.2)" }}>Animated</span>
          ) : (
            <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "rgba(34,197,94,0.1)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }}>Static</span>
          )}
          <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 8, background: "var(--violet-dim)", color: "var(--violet3)", border: "1px solid rgba(124,58,237,0.2)" }}>Download ✓</span>
        </div>
      </div>
    </div>
  );
}

// ── Preview Modal ──
function PortfolioPreviewModal({ html, tplName, onClose, onSelect }: {
  html: string; tplName: string;
  onClose: () => void; onSelect: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)",
      display: "flex", flexDirection: "column", padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 16px", background: "rgba(10,10,15,0.9)",
          border: "1px solid var(--border)", borderRadius: "16px 16px 0 0",
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Preview: {tplName}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <RainbowButton size="sm" variant="primary" onClick={onSelect}>
              <i className="fas fa-check" /> Use This Template
            </RainbowButton>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)",
              color: "var(--muted)", width: 36, height: 36, borderRadius: 10, cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>
        <iframe
          srcDoc={html}
          style={{ flex: 1, border: "none", borderRadius: "0 0 16px 16px", background: "#fff", width: "100%" }}
          title="Portfolio Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

function PortfolioContent() {
  const { user } = useDevUser();
  const searchParams = useSearchParams();
  const portfolioId = searchParams.get("id");
  const [step, setStep] = useState(1);
  const [tabMode, setTabMode] = useState<"static" | "3d">("static");
  const [selectedTemplate, setSelectedTemplate] = useState("architect");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishUrl, setPublishUrl] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [resumes, setResumes] = useState<{ id: string; name?: string; role?: string }[]>([]);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewTplName, setPreviewTplName] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [portData, setPortData] = useState<PortData>({
    name: "", role: "", bio: "", about: "", photo: "", github: "", linkedin: "",
    email: "", phone: "", location: "",
    skills: [], experience: [], projects: [],
    stats: [
      { value: "2+", label: "Years Experience" }, { value: "10+", label: "Projects Done" },
      { value: "5+", label: "Technologies" }, { value: "100%", label: "Satisfaction" },
    ],
    testimonial: { text: "", author: "", role: "" },
    templateId: "architect",
  });

  const showToast = (msg: string, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  const allTemplates = tabMode === "static" ? PORTFOLIO_STATIC_TEMPLATES : PORTFOLIO_3D_TEMPLATES;
  const selectedTplObj = [...PORTFOLIO_STATIC_TEMPLATES, ...PORTFOLIO_3D_TEMPLATES].find(t => t.id === selectedTemplate) || PORTFOLIO_STATIC_TEMPLATES[0];

  useEffect(() => {
    if (!user?.id) return;
    getUserResumes(user.id).then(r => setResumes(r as typeof resumes));
    if (portfolioId) getPortfolio(portfolioId).then(p => {
      if (p) { setPortData(p as PortData); setSelectedTemplate((p as PortData).templateId || "architect"); setStep(3); }
    });
  }, [user?.id, portfolioId]);

  const aiGenerate = async () => {
    if (!portData.name || !portData.role) { showToast("Enter your name and role first!", "error"); return; }
    if (!user?.id) { showToast("Please sign in to generate portfolio content", "error"); return; }
    setAiGenerating(true);
    try {
      const ok = await deductCredit(user.id);
      if (!ok) { showToast("Not enough credits! Upgrade your plan.", "error"); return; }

      let d: Record<string, unknown> | null = null;

      // Try Gemini
      try {
        const raw = await geminiCall(`Generate complete portfolio website content for ${portData.name}, a ${portData.role}.
Return ONLY valid raw JSON:
{"bio":"2-sentence tagline","about":"3-4 sentence about","github":"github.com/${portData.name.replace(/\s+/g, "").toLowerCase()}","linkedin":"linkedin.com/in/${portData.name.replace(/\s+/g, "").toLowerCase()}","email":"hello@${portData.name.replace(/\s+/g, "").toLowerCase()}.com","phone":"+1 234 567 8900","location":"San Francisco, CA","skills":[{"name":"SkillName","level":85}],"projects":[{"name":"","emoji":"🚀","description":"","tech":[],"liveUrl":"","githubUrl":""}],"experience":[{"title":"","company":"","duration":"","description":""}],"stats":[{"value":"2+","label":"Years Experience"},{"value":"10+","label":"Projects"},{"value":"8+","label":"Technologies"},{"value":"100%","label":"Satisfaction"}],"testimonial":{"text":"","author":"","role":""}}
Rules: 8 real skills relevant to ${portData.role}, exactly 3 realistic projects, exactly 2 experience entries.`);
        d = JSON.parse(raw.replace(/```json|```/g, "").trim());
      } catch {
        // Fallback: generate smart defaults based on name+role without Gemini
        const roleSkillMap: Record<string, string[]> = {
          "developer": ["JavaScript", "React", "Node.js", "TypeScript", "Python", "Git", "SQL", "REST APIs"],
          "designer": ["Figma", "Adobe XD", "UI/UX", "Prototyping", "Illustration", "CSS", "Sketch", "User Research"],
          "data": ["Python", "SQL", "Machine Learning", "Pandas", "TensorFlow", "Tableau", "R", "Statistics"],
          "manager": ["Project Management", "Agile", "Scrum", "Leadership", "Strategy", "Stakeholder Management", "JIRA", "Communication"],
          "engineer": ["System Design", "Java", "Python", "Cloud (AWS)", "Docker", "Kubernetes", "CI/CD", "Microservices"],
          "marketing": ["SEO", "Content Strategy", "Google Analytics", "Social Media", "Email Marketing", "Copywriting", "HubSpot", "PPC"],
        };
        const role = portData.role.toLowerCase();
        const matchedSkills = Object.keys(roleSkillMap).find(k => role.includes(k));
        const skills = (matchedSkills ? roleSkillMap[matchedSkills] : ["Problem Solving", "Communication", "Teamwork", "Leadership", "Critical Thinking", "Adaptability", "Time Management", "Creativity"]).map(s => ({ name: s, level: Math.floor(Math.random() * 20) + 75 }));
        const un = portData.name.replace(/\s+/g, "").toLowerCase() || "user";
        d = {
          bio: `I'm ${portData.name}, a passionate ${portData.role} who loves turning ideas into reality. I specialize in building solutions that make a real difference.`,
          about: `As a ${portData.role}, I bring years of hands-on experience to every project. I'm driven by a passion for excellence and a commitment to continuous learning. When I'm not working, I explore new technologies and contribute to open-source projects.`,
          email: `hello@${un}.com`,
          phone: "+1 (555) 123-4567",
          location: "New York, USA",
          github: `github.com/${un}`,
          linkedin: `linkedin.com/in/${un}`,
          skills,
          projects: [
            { name: "Portfolio Website", emoji: "🌐", description: `A sleek and responsive portfolio built to showcase my work as a ${portData.role}.`, tech: ["React", "TypeScript", "CSS"], liveUrl: "https://example.com", githubUrl: "https://github.com" },
            { name: "Analytics Dashboard", emoji: "📊", description: "Real-time analytics dashboard with interactive charts and data visualization.", tech: ["Next.js", "Chart.js", "Firebase"], liveUrl: "https://example.com", githubUrl: "https://github.com" },
            { name: "Mobile App MVP", emoji: "📱", description: "Cross-platform mobile application for team collaboration and productivity.", tech: ["React Native", "Node.js", "MongoDB"], liveUrl: "https://example.com", githubUrl: "https://github.com" },
          ],
          experience: [
            { title: portData.role, company: "Current Company", duration: "2022–Present", description: `Leading ${portData.role.toLowerCase()} initiatives, collaborating with cross-functional teams, and delivering high-quality solutions on time.` },
            { title: `Junior ${portData.role}`, company: "Previous Company", duration: "2020–2022", description: "Gained foundational experience, worked on multiple client projects, and honed core technical and soft skills." },
          ],
          stats: [{ value: "3+", label: "Years Experience" }, { value: "15+", label: "Projects" }, { value: "10+", label: "Technologies" }, { value: "100%", label: "Satisfaction" }],
          testimonial: { text: `Working with ${portData.name} was an absolute pleasure. They delivered beyond expectations and brought real value to our team.`, author: "Satisfied Client", role: "Project Manager" },
        };
      }

      if (d) {
        setPortData(prev => ({ ...prev, ...(d as Partial<PortData>) }));
        showToast("Portfolio content generated! ✨");
      }
    } catch (e) { showToast("Generation failed — please fill in remaining details manually", "error"); console.error(e); }
    finally { setAiGenerating(false); }
  };

  // Build a complete portfolio HTML from user data (fallback renderer)
  const buildFallbackPortfolioHtml = (data: PortData): string => {
    const skills = data.skills || [];
    const projects = data.projects || [];
    const experience = data.experience || [];
    const stats = data.stats || [];
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${data.name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:#0a0a14;color:#f0f0f5;overflow-x:hidden}
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,10,20,0.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.06);padding:0 40px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{font-family:'Outfit',sans-serif;font-size:18px;font-weight:900;color:#fff}.logo span{color:#a78bfa}
nav ul{list-style:none;display:flex;gap:28px}nav ul a{font-size:13px;color:rgba(255,255,255,0.5);text-decoration:none;font-weight:500;cursor:pointer;transition:color 0.2s}nav ul a:hover{color:#fff}
section{padding:100px 40px 80px}.container{max-width:1060px;margin:0 auto}
h1{font-family:'Outfit',sans-serif;font-size:clamp(36px,5vw,66px);font-weight:900;line-height:1.05;letter-spacing:-0.02em}
h2{font-family:'Outfit',sans-serif;font-size:32px;font-weight:800;margin-bottom:16px}
.tag{display:inline-block;padding:5px 14px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3)}
.skill-bar{height:6px;background:rgba(255,255,255,0.07);border-radius:3px;overflow:hidden;margin-top:4px}
.skill-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#7c3aed,#22c55e)}
.card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;transition:transform 0.2s,border-color 0.2s}
.card:hover{transform:translateY(-4px);border-color:rgba(124,58,237,0.4)}
footer{padding:32px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;font-size:12px;color:rgba(255,255,255,0.3)}
</style></head><body>
<nav><div class="logo">${data.name.split(" ")[0] || "PORTFOLIO"}<span>.</span></div>
<ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#skills">Skills</a></li><li><a href="#projects">Projects</a></li><li><a href="#contact">Contact</a></li></ul></nav>
<section id="home" style="min-height:100vh;display:flex;align-items:center;padding-top:80px;background:radial-gradient(ellipse at 60% 40%,rgba(124,58,237,0.15) 0%,transparent 60%)">
<div class="container"><div class="tag">${data.role}</div><h1>${data.name}</h1>
<p style="font-size:18px;color:rgba(255,255,255,0.55);max-width:520px;margin:20px 0 32px;line-height:1.7">${data.bio || "Passionate professional building amazing things."}</p>
<div style="display:flex;gap:12px;flex-wrap:wrap">
${data.github ? `<a href="${data.github}" target="_blank" style="padding:10px 22px;border-radius:10px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.13);color:#fff;text-decoration:none;font-size:13px;font-weight:600">GitHub</a>` : ""}
${data.linkedin ? `<a href="${data.linkedin}" target="_blank" style="padding:10px 22px;border-radius:10px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);color:#a78bfa;text-decoration:none;font-size:13px;font-weight:600">LinkedIn</a>` : ""}</div>
<div style="display:flex;gap:24px;margin-top:48px;flex-wrap:wrap">${stats.map(s => `<div style="text-align:center"><div style="font-size:28px;font-weight:900;color:#a78bfa">${s.value}</div><div style="font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.1em;margin-top:2px">${s.label}</div></div>`).join("")}</div>
</div></section>
<section id="about" style="background:rgba(255,255,255,0.02)"><div class="container">
<h2>About <span style="color:#a78bfa">Me</span></h2>
<p style="font-size:16px;color:rgba(255,255,255,0.6);line-height:1.8;max-width:680px">${data.about || data.bio || ""}</p>
${experience.length ? `<div style="margin-top:40px"><h3 style="font-size:18px;font-weight:700;color:#fff;margin-bottom:20px">Experience</h3><div style="display:grid;gap:14px">${experience.map(e => `<div class="card"><div style="font-weight:700;color:#fff;margin-bottom:4px">${e.title} — <span style="color:#a78bfa">${e.company}</span></div><div style="font-size:12px;color:rgba(255,255,255,0.35);margin-bottom:8px">${e.duration}</div><p style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.6">${e.description}</p></div>`).join("")}</div></div>` : ""}
</div></section>
<section id="skills"><div class="container">
<h2>Skills & <span style="color:#22c55e">Technologies</span></h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-top:20px">
${skills.map(s => `<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600;margin-bottom:6px"><span>${s.name}</span><span style="color:#a78bfa">${s.level}%</span></div><div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div></div>`).join("")}
</div></div></section>
<section id="projects" style="background:rgba(255,255,255,0.02)"><div class="container">
<h2>Featured <span style="color:#a78bfa">Projects</span></h2>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:24px">
${projects.map(p => `<div class="card"><div style="font-size:24px;margin-bottom:10px">${p.emoji || "🚀"}</div><h3 style="font-size:16px;font-weight:700;color:#fff;margin-bottom:8px">${p.name}</h3><p style="font-size:13px;color:rgba(255,255,255,0.5);line-height:1.6;margin-bottom:12px">${p.description}</p><div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px">${(p.tech||[]).map(t => `<span style="padding:2px 8px;border-radius:10px;background:rgba(124,58,237,0.12);color:#a78bfa;font-size:10px;border:1px solid rgba(124,58,237,0.2)">${t}</span>`).join("")}</div><div style="display:flex;gap:8px">${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" style="padding:6px 14px;border-radius:8px;background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.4);color:#a78bfa;text-decoration:none;font-size:11px;font-weight:600">Live</a>` : ""}${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" style="padding:6px 14px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;text-decoration:none;font-size:11px;font-weight:600">GitHub</a>` : ""}</div></div>`).join("")}
</div></div></section>
<section id="contact"><div class="container" style="text-align:center">
<h2>Get in <span style="color:#22c55e">Touch</span></h2>
<div style="display:flex;justify-content:center;flex-wrap:wrap;gap:12px;margin-top:20px">
${data.email ? `<a href="mailto:${data.email}" style="padding:12px 24px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;font-weight:700;font-size:14px">${data.email}</a>` : ""}
${data.phone ? `<a href="tel:${data.phone}" style="padding:12px 24px;border-radius:12px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:#fff;text-decoration:none;font-weight:600;font-size:14px">${data.phone}</a>` : ""}
</div></div></section>
<footer>© ${new Date().getFullYear()} ${data.name} · Built with Resumify</footer>
</body></html>`;
  };

  const generatePreview = async () => {
    setGenerating(true);
    try {
      const html = await renderPortfolioTemplate(selectedTplObj, { ...portData, templateId: selectedTemplate });
      setGeneratedHtml(html);
      setStep(3);
      showToast("Portfolio rendered! 🎉");
    } catch (e) {
      console.error("Template render failed, using fallback:", e);
      // Fallback: build our own HTML with user data
      const fallback = buildFallbackPortfolioHtml({ ...portData, templateId: selectedTemplate });
      setGeneratedHtml(fallback);
      setStep(3);
      showToast("Portfolio built with your data! 🎉");
    } finally { setGenerating(false); }
  };

  const publishPort = async () => {
    if (!portData.name) { showToast("Enter your name first!", "error"); return; }
    if (!user?.id) { showToast("Please sign in to publish", "error"); return; }
    setPublishing(true);
    try {
      // If no HTML generated yet, build the fallback
      const htmlToSave = generatedHtml || buildFallbackPortfolioHtml({ ...portData, templateId: selectedTemplate });
      const id = await savePortfolio(user.id, {
        ...portData,
        templateId: selectedTemplate,
        generatedHtml: htmlToSave,  // ← Save generated HTML so view-live shows user data
      });
      const url = `${window.location.origin}/portfolio-view?id=${id}`;
      setPublishUrl(url);
      setPublished(true);
    } catch (e) {
      showToast("Publish failed", "error");
      console.error(e);
    } finally { setPublishing(false); }
  };

  const downloadHTML = async () => {
    if (!generatedHtml) { showToast("Generate preview first", "error"); return; }
    if (!user?.id) { showToast("Please sign in to download", "error"); return; }
    // Plan gate: only pro/elite/lifetime can download HTML
    const creds = await getUserCredits(user.id);
    const limits = getPlanLimits(creds.plan);
    if (!limits.canDownloadHTML) {
      showToast("HTML download requires Pro, Elite or Lifetime plan. Upgrade to unlock!", "error");
      return;
    }
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${portData.name || "portfolio"}_${selectedTemplate}.html`;
    a.click();
    showToast("Portfolio HTML downloaded!");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && <div className="toast-container"><div className={`toast ${toast.type}`}>{toast.msg}</div></div>}

      {previewHtml && (
        <PortfolioPreviewModal
          html={previewHtml}
          tplName={previewTplName}
          onClose={() => setPreviewHtml(null)}
          onSelect={() => {
            // Find the template by name and actually update the selection
            const found = [...PORTFOLIO_STATIC_TEMPLATES, ...PORTFOLIO_3D_TEMPLATES].find(t => t.name === previewTplName);
            if (found) setSelectedTemplate(found.id);
            setPreviewHtml(null);
          }}
        />
      )}

      <main className="main-content" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
        {/* TOPBAR */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: 56, borderBottom: "1px solid var(--border)",
          background: "var(--surface)", flexShrink: 0,
        }}>
          <a href="/" style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: "0.08em", color: "#fff", textDecoration: "none" }}>
            RESUM<span style={{ color: "var(--violet3)" }}>IFY</span>
          </a>
          {/* STEP INDICATORS */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {["Template", "Your Info", "Preview & Publish"].map((label, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "var(--green)" : active ? "var(--violet)" : "rgba(255,255,255,0.06)",
                      fontSize: 11, fontWeight: 700, color: "#fff", transition: "all 0.3s",
                      boxShadow: active ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                    }}>
                      {done ? <i className="fas fa-check" style={{ fontSize: 9 }} /> : n}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: active ? "#fff" : "var(--muted)" }}>{label}</span>
                  </div>
                  {i < 2 && <div style={{ width: 24, height: 1, background: step > n ? "var(--green)" : "var(--border2)" }} />}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <RainbowButton as="a" href="/dashboard" size="sm" variant="ghost"><i className="fas fa-grid-2" /> Dashboard</RainbowButton>
          </div>
        </header>

        <div style={{ flex: 1, padding: 24, overflow: "auto" }}>

          {/* ── STEP 1: TEMPLATE PICKER ── */}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>Choose Your Style</h1>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
                {PORTFOLIO_STATIC_TEMPLATES.length} static + {PORTFOLIO_3D_TEMPLATES.length} immersive 3D templates.
                Hover any card for a live preview.
              </p>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {(["static", "3d"] as const).map(t => (
                  <button key={t} onClick={() => setTabMode(t)}
                    style={{
                      padding: "8px 20px", borderRadius: 20,
                      border: `1px solid ${tabMode === t ? "rgba(124,58,237,0.5)" : "var(--border2)"}`,
                      background: tabMode === t ? "var(--violet-dim)" : "transparent",
                      color: tabMode === t ? "var(--violet3)" : "var(--muted)",
                      fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {t === "static"
                      ? <><i className="fas fa-file-alt" /> Static — {PORTFOLIO_STATIC_TEMPLATES.length} templates</>
                      : <><i className="fas fa-cube" /> 3D Immersive — {PORTFOLIO_3D_TEMPLATES.length} templates <span style={{ fontSize: 9, background: "rgba(255,215,0,0.15)", color: "#ffd700", padding: "2px 6px", borderRadius: 8, border: "1px solid rgba(255,215,0,0.25)" }}>3D</span></>
                    }
                  </button>
                ))}
              </div>

              {/* Template Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
                {allTemplates.map(tpl => (
                  <PortfolioTemplateCard
                    key={tpl.id}
                    tpl={tpl}
                    selected={selectedTemplate === tpl.id}
                    onSelect={() => setSelectedTemplate(tpl.id)}
                    onPreview={html => { setPreviewHtml(html); setPreviewTplName(tpl.name); }}
                  />
                ))}
              </div>

              <RainbowButton variant="primary" onClick={() => setStep(2)} style={{ marginTop: 4 }}>
                Use <span style={{ color: "var(--violet3)", margin: "0 6px" }}>{selectedTplObj.name}</span> Continue <i className="fas fa-arrow-right" />
              </RainbowButton>
            </div>
          )}

          {/* ── STEP 2: CONTENT FORM ── */}
          {step === 2 && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, overflow: "auto" }}>
                {/* Import from resume */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--violet-dim)", borderRadius: 12, border: "1px solid rgba(124,58,237,0.2)", marginBottom: 16 }}>
                  <i className="fas fa-file-import" style={{ color: "var(--violet3)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Import from Resume</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>Pre-fill from a saved resume</div>
                  </div>
                  <select
                    onChange={e => {
                      const r = resumes.find(r => r.id === e.target.value);
                      if (r) setPortData(p => ({ ...p, name: r.name || "", role: r.role || "" }));
                    }}
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)", color: "#fff", padding: "6px 10px", borderRadius: 8, fontSize: 12, fontFamily: "inherit", cursor: "pointer" }}
                  >
                    <option value="">Select...</option>
                    {resumes.map(r => <option key={r.id} value={r.id}>{r.name || "Unnamed"}</option>)}
                  </select>
                </div>

                {/* Template badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 20 }}>{selectedTplObj.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>Template: {selectedTplObj.name}</div>
                  <button onClick={() => setStep(1)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 11, textDecoration: "underline", fontFamily: "inherit" }}>Change</button>
                </div>

                {/* AI Generate */}
                <RainbowButton variant="primary" onClick={aiGenerate} disabled={aiGenerating} style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}>
                  {aiGenerating ? <><i className="fas fa-spinner fa-spin" /> AI is building your portfolio...</> : <><i className="fas fa-wand-magic-sparkles" /> AI Generate Everything — just enter name + role below</>}
                </RainbowButton>

                {/* Basic Info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {( [["name", "Full Name *", "Arjun Sharma"], ["role", "Role / Title *", "Full Stack Developer"]] as [keyof PortData, string, string][] ).map(([k, l, p]) => (
                    <div key={k}>
                      <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{l}</label>
                      <input className="form-input" style={{ fontSize: 12, padding: "8px 12px" }} placeholder={p}
                        value={(portData[k] as string) || ""}
                        onChange={e => setPortData(d => ({ ...d, [k]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                {( [["bio", "Hero Bio", "AI will generate this..."], ["about", "About Me", "AI will generate this..."]] as [keyof PortData, string, string][] ).map(([k, l, p]) => (
                  <div key={k} style={{ marginBottom: 12 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{l}</label>
                    <textarea className="form-input" style={{ fontSize: 12, minHeight: 60, resize: "vertical" }} placeholder={p}
                      value={(portData[k] as string) || ""}
                      onChange={e => setPortData(d => ({ ...d, [k]: e.target.value }))}
                    />
                  </div>
                ))}

                {/* Links */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                  {( [["github", "GitHub", "github.com/username"], ["linkedin", "LinkedIn", "linkedin.com/in/username"], ["email", "Email", "hello@email.com"], ["phone", "Phone", "+91 98765 43210"], ["location", "Location", "Jaipur, India"]] as [keyof PortData, string, string][] ).map(([k, l, p]) => (
                    <div key={k}>
                      <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{l}</label>
                      <input className="form-input" style={{ fontSize: 12, padding: "8px 12px" }} placeholder={p}
                        value={(portData[k] as string) || ""}
                        onChange={e => setPortData(d => ({ ...d, [k]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right info panel */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>How it works</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>
                  Enter your <strong style={{ color: "#fff" }}>name and role</strong>, hit the AI button — everything else is generated automatically.
                </p>
                <div style={{ background: "var(--violet-dim)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 14, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--violet3)", marginBottom: 10 }}>AI generates</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 2 }}>
                    ✅ Hero bio & About me<br />✅ 8–10 skills with levels<br />✅ 3 realistic projects<br />✅ 2 work experiences<br />✅ Testimonial card<br />✅ Stats counters
                  </div>
                </div>

                {/* Selected template mini-card */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Selected Template</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 24 }}>{selectedTplObj.emoji}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{selectedTplObj.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{selectedTplObj.category}</div>
                    </div>
                    {selectedTplObj.animated && (
                      <span style={{ marginLeft: "auto", fontSize: 9, padding: "2px 8px", borderRadius: 8, background: "rgba(255,215,0,0.1)", color: "#ffd700", border: "1px solid rgba(255,215,0,0.2)" }}>3D</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, gridColumn: "1/-1" }}>
                <RainbowButton variant="ghost" onClick={() => setStep(1)}><i className="fas fa-arrow-left" /> Back</RainbowButton>
                <RainbowButton variant="primary" onClick={generatePreview} disabled={generating}>
                  {generating ? <><i className="fas fa-spinner fa-spin" /> Rendering...</> : <>Build Preview <i className="fas fa-eye" /></>}
                </RainbowButton>
              </div>
            </div>
          )}

          {/* ── STEP 3: PREVIEW & PUBLISH ── */}
          {step === 3 && !published && (
            <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}>
                  LIVE PREVIEW — <span style={{ color: "var(--violet3)" }}>{selectedTplObj.name} · Scroll inside ↓</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <RainbowButton size="sm" variant="ghost" onClick={downloadHTML}><i className="fas fa-download" /> Download HTML</RainbowButton>
                  <RainbowButton size="sm" variant="ghost" onClick={() => setStep(2)}><i className="fas fa-arrow-left" /> Back</RainbowButton>
                  <RainbowButton size="sm" variant="primary" onClick={publishPort} disabled={publishing}>
                    {publishing ? <><i className="fas fa-spinner fa-spin" /> Publishing...</> : <><i className="fas fa-rocket" /> Publish</>}
                  </RainbowButton>
                </div>
              </div>
              {generatedHtml ? (
                <iframe
                  srcDoc={generatedHtml}
                  style={{ flex: 1, width: "100%", border: "1px solid var(--border)", borderRadius: 12 }}
                  title="Portfolio Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, border: "1px solid var(--border)", borderRadius: 12 }}>
                  <div style={{ fontSize: 40 }}>{selectedTplObj.emoji}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)" }}>Fill in your details and click Build Preview</div>
                  <RainbowButton variant="primary" onClick={() => setStep(2)}>Fill Details <i className="fas fa-arrow-right" /></RainbowButton>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 4: PUBLISHED ── */}
          {published && (
            <div style={{ textAlign: "center", padding: "80px 40px" }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🚀</div>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Your Portfolio is Live!</h2>
              <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 28 }}>Share this link — they&apos;ll see your complete animated portfolio instantly.</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 12, maxWidth: 580, margin: "0 auto 24px" }}>
                <i className="fas fa-globe" style={{ color: "var(--violet3)" }} />
                <span style={{ flex: 1, fontSize: 13, color: "#fff", wordBreak: "break-all" }}>{publishUrl}</span>
                <RainbowButton size="sm" variant="primary" onClick={() => navigator.clipboard.writeText(publishUrl).then(() => showToast("Copied! 🔗"))}>
                  <i className="fas fa-copy" /> Copy
                </RainbowButton>
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <RainbowButton variant="ghost" onClick={downloadHTML}><i className="fas fa-download" /> Download HTML</RainbowButton>
                <RainbowButton variant="primary" onClick={() => window.open(publishUrl, "_blank")}><i className="fas fa-eye" /> View Live</RainbowButton>
                <RainbowButton as="a" href="/dashboard" variant="ghost"><i className="fas fa-grid-2" /> Dashboard</RainbowButton>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <PortfolioContent />
    </Suspense>
  );
}
