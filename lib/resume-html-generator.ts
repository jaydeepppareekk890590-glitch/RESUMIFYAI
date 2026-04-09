// ── Resume HTML Generator ──
// Generates fully-styled HTML resume with USER DATA for any of the 40 templates.
// Each template ID maps to a layout + color/font configuration.

export interface ResumeData {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  summary?: string;
  skills?: string[];
  experience?: { title: string; company: string; duration: string; description: string }[];
  education?: { degree: string; institution: string; year: string }[];
  templateId?: string;
}

interface TemplateConfig {
  layout: "clean" | "sidebar" | "split" | "dark" | "bold" | "tech" | "creative" | "luxury";
  primary: string;
  accent: string;
  bg: string;
  text: string;
  headerBg: string;
  headerText: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
}

const TEMPLATE_CONFIGS: Record<string, TemplateConfig> = {
  "01-minimalist-pro":      { layout: "clean",    primary: "#1a1a1a", accent: "#1a1a1a", bg: "#ffffff", text: "#333", headerBg: "#1a1a1a", headerText: "#fff", headingFont: "Georgia,serif", bodyFont: "Arial,sans-serif", borderRadius: "0" },
  "02-bold-sidebar":        { layout: "sidebar",  primary: "#2563eb", accent: "#2563eb", bg: "#f8fafc", text: "#1e293b", headerBg: "#2563eb", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "03-creative-cards":      { layout: "creative", primary: "#7c3aed", accent: "#7c3aed", bg: "#faf5ff", text: "#1e1b4b", headerBg: "#7c3aed", headerText: "#fff", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "12px" },
  "04-timeline":            { layout: "clean",    primary: "#0891b2", accent: "#0891b2", bg: "#f0f9ff", text: "#0c4a6e", headerBg: "#0891b2", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "6px" },
  "05-dark-mode":           { layout: "dark",     primary: "#a78bfa", accent: "#a78bfa", bg: "#0f0f1a", text: "#e2e8f0", headerBg: "#1e1b4b", headerText: "#a78bfa", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "8px" },
  "06-infographic":         { layout: "bold",     primary: "#f59e0b", accent: "#f59e0b", bg: "#fffbeb", text: "#1c1917", headerBg: "#f59e0b", headerText: "#000", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "10px" },
  "07-editorial":           { layout: "clean",    primary: "#1e293b", accent: "#475569", bg: "#f8fafc", text: "#1e293b", headerBg: "#f1f5f9", headerText: "#1e293b", headingFont: "Georgia,serif", bodyFont: "Georgia,serif", borderRadius: "0" },
  "08-modular-grid":        { layout: "split",    primary: "#3b82f6", accent: "#3b82f6", bg: "#f8fafc", text: "#1e293b", headerBg: "#1e293b", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "8px" },
  "09-split-accent":        { layout: "split",    primary: "#10b981", accent: "#10b981", bg: "#f0fdf4", text: "#064e3b", headerBg: "#064e3b", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "6px" },
  "10-neo-retro":           { layout: "bold",     primary: "#ef4444", accent: "#ef4444", bg: "#fff7f7", text: "#1a1a1a", headerBg: "#ef4444", headerText: "#fff", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "0" },
  "11-software-engineer":   { layout: "tech",     primary: "#6366f1", accent: "#6366f1", bg: "#f5f3ff", text: "#1e1b4b", headerBg: "#1e1b4b", headerText: "#6366f1", headingFont: "'Fira Code',monospace,'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "12-nurse-medical":       { layout: "clean",    primary: "#14b8a6", accent: "#14b8a6", bg: "#f0fdfa", text: "#134e4a", headerBg: "#14b8a6", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "6px" },
  "13-chef-culinary":       { layout: "bold",     primary: "#f97316", accent: "#f97316", bg: "#fff7ed", text: "#431407", headerBg: "#431407", headerText: "#f97316", headingFont: "Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "14-lawyer-attorney":     { layout: "clean",    primary: "#1e293b", accent: "#b45309", bg: "#fafafa", text: "#1e293b", headerBg: "#1e293b", headerText: "#d4af37", headingFont: "Georgia,serif", bodyFont: "'Times New Roman',serif", borderRadius: "0" },
  "15-photographer":        { layout: "creative", primary: "#7c3aed", accent: "#ec4899", bg: "#fdf4ff", text: "#1a1a2e", headerBg: "#1a1a2e", headerText: "#fff", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "16px" },
  "16-teacher-educator":    { layout: "clean",    primary: "#0284c7", accent: "#0284c7", bg: "#f0f9ff", text: "#0c4a6e", headerBg: "#0284c7", headerText: "#fff", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "8px" },
  "17-data-scientist":      { layout: "tech",     primary: "#8b5cf6", accent: "#8b5cf6", bg: "#f5f3ff", text: "#2e1065", headerBg: "#2e1065", headerText: "#8b5cf6", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "18-architect":           { layout: "split",    primary: "#64748b", accent: "#475569", bg: "#f8fafc", text: "#1e293b", headerBg: "#1e293b", headerText: "#94a3b8", headingFont: "Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "0" },
  "19-ux-designer":         { layout: "creative", primary: "#ec4899", accent: "#f43f5e", bg: "#fff1f2", text: "#1a1a2e", headerBg: "#831843", headerText: "#fff", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "20px" },
  "20-financial-analyst":   { layout: "clean",    primary: "#22c55e", accent: "#16a34a", bg: "#f0fff4", text: "#14532d", headerBg: "#14532d", headerText: "#22c55e", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "21-royal-portrait":      { layout: "luxury",   primary: "#d4af37", accent: "#b8960c", bg: "#0a0a0a", text: "#f5f0e8", headerBg: "#0a0a0a", headerText: "#d4af37", headingFont: "Georgia,serif", bodyFont: "'Times New Roman',serif", borderRadius: "0" },
  "22-glass-morphism":      { layout: "dark",     primary: "#60a5fa", accent: "#93c5fd", bg: "#0f172a", text: "#e2e8f0", headerBg: "rgba(15,23,42,0.8)", headerText: "#93c5fd", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "16px" },
  "23-noir-elegance":       { layout: "dark",     primary: "#e2e8f0", accent: "#94a3b8", bg: "#0a0a0a", text: "#e2e8f0", headerBg: "#0a0a0a", headerText: "#fff", headingFont: "Georgia,serif", bodyFont: "'Times New Roman',serif", borderRadius: "0" },
  "24-aurora-gradient":     { layout: "creative", primary: "#a855f7", accent: "#ec4899", bg: "#0f0f1a", text: "#e2e8f0", headerBg: "linear-gradient(135deg,#7c3aed,#ec4899)", headerText: "#fff", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "12px" },
  "25-swiss-poster":        { layout: "bold",     primary: "#dc2626", accent: "#dc2626", bg: "#fff", text: "#000", headerBg: "#dc2626", headerText: "#fff", headingFont: "Impact,'Arial Black',sans-serif", bodyFont: "'Helvetica Neue',Arial,sans-serif", borderRadius: "0" },
  "26-magazine-spread":     { layout: "creative", primary: "#f59e0b", accent: "#d97706", bg: "#fffbf0", text: "#1a1a1a", headerBg: "#1a1a1a", headerText: "#f59e0b", headingFont: "'Playfair Display',Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "27-blueprint":           { layout: "tech",     primary: "#0ea5e9", accent: "#38bdf8", bg: "#0c1445", text: "#bfdbfe", headerBg: "#0c1445", headerText: "#38bdf8", headingFont: "'Courier New',monospace", bodyFont: "'Courier New',monospace", borderRadius: "2px" },
  "28-vogue-editorial":     { layout: "bold",     primary: "#1c1c1c", accent: "#9ca3af", bg: "#fff", text: "#1c1c1c", headerBg: "#000", headerText: "#fff", headingFont: "'Times New Roman',serif", bodyFont: "'Inter',sans-serif", borderRadius: "0" },
  "29-zen-minimal":         { layout: "clean",    primary: "#84cc16", accent: "#65a30d", bg: "#f7fee7", text: "#1a2e05", headerBg: "#f7fee7", headerText: "#1a2e05", headingFont: "Georgia,serif", bodyFont: "Georgia,serif", borderRadius: "0" },
  "30-neon-punk":           { layout: "dark",     primary: "#f0abfc", accent: "#e879f9", bg: "#0a0010", text: "#f0e6ff", headerBg: "#0a0010", headerText: "#f0abfc", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "31-marble-luxury":       { layout: "luxury",   primary: "#d4af37", accent: "#c49b0a", bg: "#fafafa", text: "#1a1a1a", headerBg: "#f0f0f0", headerText: "#1a1a1a", headingFont: "Georgia,serif", bodyFont: "'Times New Roman',serif", borderRadius: "0" },
  "32-polaroid-collage":    { layout: "creative", primary: "#fb923c", accent: "#f97316", bg: "#fff7f0", text: "#1a1a1a", headerBg: "#fff7f0", headerText: "#1a1a1a", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "16px" },
  "33-monochrome-prestige": { layout: "clean",    primary: "#374151", accent: "#6b7280", bg: "#fafafa", text: "#111827", headerBg: "#111827", headerText: "#f9fafb", headingFont: "'Inter',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "0" },
  "34-passport-style":      { layout: "split",    primary: "#1d4ed8", accent: "#3b82f6", bg: "#eff6ff", text: "#1e3a8a", headerBg: "#1e3a8a", headerText: "#fff", headingFont: "Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "4px" },
  "35-terracotta-warm":     { layout: "clean",    primary: "#c2410c", accent: "#ea580c", bg: "#fff7ed", text: "#431407", headerBg: "#c2410c", headerText: "#fff", headingFont: "Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "6px" },
  "36-diagonal-split":      { layout: "split",    primary: "#7c3aed", accent: "#8b5cf6", bg: "#f5f3ff", text: "#1e1b4b", headerBg: "#1e1b4b", headerText: "#a78bfa", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "8px" },
  "37-art-deco":            { layout: "luxury",   primary: "#b45309", accent: "#d97706", bg: "#fef9c3", text: "#1c1917", headerBg: "#1c1917", headerText: "#d4af37", headingFont: "Georgia,serif", bodyFont: "'Times New Roman',serif", borderRadius: "0" },
  "38-brutalist-bold":      { layout: "bold",     primary: "#111827", accent: "#374151", bg: "#fff", text: "#000", headerBg: "#000", headerText: "#fff", headingFont: "Impact,'Arial Black',sans-serif", bodyFont: "'Helvetica Neue',sans-serif", borderRadius: "0" },
  "39-watercolor-soft":     { layout: "creative", primary: "#db2777", accent: "#ec4899", bg: "#fdf2f8", text: "#1a1a2e", headerBg: "#fce7f3", headerText: "#9d174d", headingFont: "Georgia,serif", bodyFont: "'Inter',sans-serif", borderRadius: "16px" },
  "40-constellation-dark":  { layout: "dark",     primary: "#818cf8", accent: "#6366f1", bg: "#030712", text: "#e0e7ff", headerBg: "#030712", headerText: "#818cf8", headingFont: "'Outfit',sans-serif", bodyFont: "'Inter',sans-serif", borderRadius: "8px" },
};

function getConfig(templateId: string): TemplateConfig {
  return TEMPLATE_CONFIGS[templateId] || TEMPLATE_CONFIGS["01-minimalist-pro"];
}

// ── LAYOUT: Clean (single column) ──
function layoutClean(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10.5pt;line-height:1.5}
.header{background:${c.headerBg};color:${c.headerText};padding:32px 40px 24px}
.header h1{font-family:${c.headingFont};font-size:26pt;font-weight:800;letter-spacing:-0.01em}
.header .role{font-size:12pt;opacity:0.8;margin:4px 0 10px}
.header .contact{font-size:9pt;opacity:0.65;display:flex;flex-wrap:wrap;gap:12px}
.body{padding:28px 40px}
.section{margin-bottom:22px}
.section-title{font-family:${c.headingFont};font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:${c.primary};border-bottom:2px solid ${c.primary};padding-bottom:4px;margin-bottom:12px}
.exp-item{margin-bottom:12px}
.exp-header{display:flex;justify-content:space-between;margin-bottom:2px}
.exp-title{font-weight:700;font-size:10.5pt}
.exp-duration{font-size:9pt;color:#888}
.exp-company{font-size:9.5pt;color:${c.primary};font-weight:600}
.exp-desc{font-size:9.5pt;color:#555;margin-top:3px;line-height:1.55}
.edu-item{display:flex;justify-content:space-between;margin-bottom:8px}
.edu-degree{font-weight:700;font-size:10pt}
.edu-school{font-size:9.5pt;color:#666}
.edu-year{font-size:9pt;color:#888}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skill{padding:3px 10px;border-radius:${c.borderRadius};background:${c.primary}15;color:${c.primary};font-size:9pt;font-weight:600;border:1px solid ${c.primary}30}
.summary{font-size:10pt;line-height:1.65;color:#555}
</style></head><body>
<div class="header">
  <h1>${d.name || "Your Name"}</h1>
  <div class="role">${d.role || "Professional Title"}</div>
  <div class="contact">
    ${d.email ? `<span>✉ ${d.email}</span>` : ""}
    ${d.phone ? `<span>☏ ${d.phone}</span>` : ""}
    ${d.location ? `<span>⌖ ${d.location}</span>` : ""}
    ${d.linkedin ? `<span>in ${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="body">
  ${d.summary ? `<div class="section"><div class="section-title">Summary</div><p class="summary">${d.summary}</p></div>` : ""}
  ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-header"><span class="exp-title">${e.title}</span><span class="exp-duration">${e.duration}</span></div><div class="exp-company">${e.company}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="edu-item"><div><div class="edu-degree">${e.degree}</div><div class="edu-school">${e.institution}</div></div><div class="edu-year">${e.year}</div></div>`).join("")}</div>` : ""}
  ${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
</div></body></html>`;
}

// ── LAYOUT: Sidebar (two-column) ──
function layoutSidebar(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt;display:flex;min-height:100vh}
.sidebar{width:240px;flex-shrink:0;background:${c.headerBg};color:${c.headerText};padding:32px 20px;display:flex;flex-direction:column;gap:20px}
.sidebar h1{font-family:${c.headingFont};font-size:18pt;font-weight:800;line-height:1.1;margin-bottom:4px}
.sidebar .role{font-size:10pt;opacity:0.75;margin-bottom:16px}
.sidebar-section-title{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;opacity:0.55;margin-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:4px}
.contact-item{font-size:8.5pt;opacity:0.75;margin-bottom:5px;word-break:break-all}
.skill-item{margin-bottom:7px}
.skill-name{font-size:9pt;margin-bottom:3px}
.skill-bar{height:3px;background:rgba(255,255,255,0.15);border-radius:2px}
.skill-fill{height:100%;border-radius:2px;background:${c.accent}88}
.main{flex:1;padding:32px 28px}
.section{margin-bottom:22px}
.section-title{font-family:${c.headingFont};font-size:8.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:${c.primary};border-bottom:2px solid ${c.primary};padding-bottom:4px;margin-bottom:14px}
.exp-item{margin-bottom:14px}
.exp-header{display:flex;justify-content:space-between;margin-bottom:2px}
.exp-title{font-weight:700;font-size:10.5pt}
.exp-duration{font-size:9pt;color:#888}
.exp-company{font-size:9.5pt;color:${c.primary};font-weight:600;margin-bottom:3px}
.exp-desc{font-size:9.5pt;color:#555;line-height:1.5}
.edu-item{margin-bottom:10px}
.edu-degree{font-weight:700;font-size:10pt}
.edu-info{font-size:9pt;color:#777}
.summary{font-size:10pt;line-height:1.65;color:#555}
</style></head><body>
<div class="sidebar">
  <div>
    <h1>${d.name || "Your Name"}</h1>
    <div class="role">${d.role || "Professional"}</div>
  </div>
  <div>
    <div class="sidebar-section-title">Contact</div>
    ${d.email ? `<div class="contact-item">✉ ${d.email}</div>` : ""}
    ${d.phone ? `<div class="contact-item">☏ ${d.phone}</div>` : ""}
    ${d.location ? `<div class="contact-item">⌖ ${d.location}</div>` : ""}
    ${d.linkedin ? `<div class="contact-item">in ${d.linkedin}</div>` : ""}
  </div>
  ${skills.length ? `<div><div class="sidebar-section-title">Skills</div>${skills.map(s => `<div class="skill-item"><div class="skill-name">${s}</div><div class="skill-bar"><div class="skill-fill" style="width:80%"></div></div></div>`).join("")}</div>` : ""}
</div>
<div class="main">
  ${d.summary ? `<div class="section"><div class="section-title">Profile</div><p class="summary">${d.summary}</p></div>` : ""}
  ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-header"><span class="exp-title">${e.title}</span><span class="exp-duration">${e.duration}</span></div><div class="exp-company">${e.company}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
</div></body></html>`;
}

// ── LAYOUT: Split (colored header + two-column body) ──
function layoutSplit(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt}
.header{background:${c.headerBg};color:${c.headerText};padding:36px 40px 28px;display:flex;align-items:flex-end;justify-content:space-between;border-left:6px solid ${c.primary}}
.header h1{font-family:${c.headingFont};font-size:28pt;font-weight:900;letter-spacing:-0.02em}
.header .role{font-size:11.5pt;opacity:0.75;margin-top:6px}
.header .contact{text-align:right;font-size:9pt;opacity:0.7;line-height:1.8}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:0}
.col{padding:28px 32px}
.col:first-child{border-right:1px solid ${c.primary}20}
.section-title{font-family:${c.headingFont};font-size:8.5pt;font-weight:800;text-transform:uppercase;letter-spacing:0.15em;color:${c.primary};margin-bottom:12px;padding-bottom:4px;border-bottom:2px solid ${c.primary}}
.section{margin-bottom:20px}
.exp-title{font-weight:700;font-size:10.5pt}
.exp-company{font-size:9.5pt;color:${c.primary};font-weight:600}
.exp-duration{font-size:8.5pt;color:#999;margin:2px 0 4px}
.exp-desc{font-size:9pt;color:#666;line-height:1.5}
.exp-item{margin-bottom:13px;padding-left:12px;border-left:2px solid ${c.primary}40}
.skills{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
.skill{padding:3px 9px;border-radius:${c.borderRadius};background:${c.primary}15;color:${c.primary};font-size:8.5pt;font-weight:600}
.edu-item{margin-bottom:10px}
.edu-degree{font-weight:700;font-size:10pt}
.edu-info{font-size:9pt;color:#777}
.summary{font-size:10pt;line-height:1.65;color:#555}
</style></head><body>
<div class="header">
  <div>
    <h1>${d.name || "Your Name"}</h1>
    <div class="role">${d.role || "Professional Title"}</div>
  </div>
  <div class="contact">
    ${d.email ? `<div>✉ ${d.email}</div>` : ""}
    ${d.phone ? `<div>☏ ${d.phone}</div>` : ""}
    ${d.location ? `<div>⌖ ${d.location}</div>` : ""}
    ${d.linkedin ? `<div>in ${d.linkedin}</div>` : ""}
  </div>
</div>
<div class="grid">
  <div class="col">
    ${d.summary ? `<div class="section"><div class="section-title">About</div><p class="summary">${d.summary}</p></div>` : ""}
    ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-title">${e.title}</div><div class="exp-company">${e.company}</div><div class="exp-duration">${e.duration}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  </div>
  <div class="col">
    ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
    ${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
  </div>
</div></body></html>`;
}

// ── LAYOUT: Dark ──
function layoutDark(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt;min-height:100vh}
.header{padding:40px 44px 28px;border-bottom:1px solid ${c.primary}30}
.header h1{font-family:${c.headingFont};font-size:30pt;font-weight:900;color:${c.headerText};letter-spacing:-0.02em}
.header .role{font-size:12pt;color:${c.primary};margin:6px 0 14px;font-weight:600}
.header .contact{display:flex;flex-wrap:wrap;gap:16px;font-size:9pt;opacity:0.5}
.body{padding:32px 44px;display:grid;grid-template-columns:1.4fr 1fr;gap:32px}
.section{margin-bottom:24px}
.section-title{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:${c.primary};margin-bottom:14px;display:flex;align-items:center;gap:8px}
.section-title::after{content:"";flex:1;height:1px;background:${c.primary}30}
.exp-item{margin-bottom:16px;padding:14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:${c.borderRadius}}
.exp-title{font-weight:700;font-size:10.5pt;color:#fff;margin-bottom:2px}
.exp-company{font-size:9.5pt;color:${c.primary};font-weight:600;margin-bottom:2px}
.exp-duration{font-size:8.5pt;color:#666;margin-bottom:6px}
.exp-desc{font-size:9pt;color:#999;line-height:1.5}
.edu-item{margin-bottom:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:${c.borderRadius}}
.edu-degree{font-weight:700;font-size:10pt;color:#e2e8f0}
.edu-info{font-size:9pt;color:#888}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skill{padding:4px 10px;border-radius:${c.borderRadius};background:${c.primary}20;color:${c.primary};font-size:9pt;font-weight:600;border:1px solid ${c.primary}40}
.summary{font-size:10pt;line-height:1.7;color:#aaa}
</style></head><body>
<div class="header">
  <h1>${d.name || "Your Name"}</h1>
  <div class="role">${d.role || "Professional Title"}</div>
  <div class="contact">
    ${d.email ? `<span>✉ ${d.email}</span>` : ""}
    ${d.phone ? `<span>☏ ${d.phone}</span>` : ""}
    ${d.location ? `<span>⌖ ${d.location}</span>` : ""}
    ${d.linkedin ? `<span>in ${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="body">
  <div>
    ${d.summary ? `<div class="section"><div class="section-title">Profile</div><p class="summary">${d.summary}</p></div>` : ""}
    ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-title">${e.title}</div><div class="exp-company">${e.company}</div><div class="exp-duration">${e.duration}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  </div>
  <div>
    ${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
    ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
  </div>
</div></body></html>`;
}

// ── LAYOUT: Bold ──
function layoutBold(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt}
.header{background:${c.headerBg};color:${c.headerText};padding:36px 40px;position:relative;overflow:hidden}
.header::before{content:"";position:absolute;right:-30px;top:-30px;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,0.06)}
.header h1{font-family:${c.headingFont};font-size:32pt;font-weight:900;letter-spacing:-0.02em;line-height:1;margin-bottom:6px}
.header .role{font-size:11pt;font-weight:600;opacity:0.75;margin-bottom:14px;text-transform:uppercase;letter-spacing:0.1em}
.header .contact{display:flex;flex-wrap:wrap;gap:14px;font-size:9pt;opacity:0.65}
.accent-bar{height:5px;background:${c.accent};width:100%}
.body{padding:30px 40px}
.section{margin-bottom:22px}
.section-title{font-family:${c.headingFont};font-size:14pt;font-weight:900;color:${c.primary};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;position:relative;padding-left:14px}
.section-title::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:5px;height:100%;background:${c.primary};border-radius:2px}
.exp-item{margin-bottom:14px;display:grid;grid-template-columns:auto 1fr;gap:0 16px}
.exp-date{font-size:8.5pt;color:${c.primary};font-weight:700;white-space:nowrap;margin-top:3px}
.exp-title{font-weight:800;font-size:10.5pt}
.exp-company{font-size:9.5pt;color:#777;margin-bottom:4px}
.exp-desc{font-size:9pt;color:#666;line-height:1.5}
.edu-item{margin-bottom:10px}
.edu-degree{font-weight:800;font-size:10pt}
.edu-info{font-size:9pt;color:#777}
.skills{display:flex;flex-wrap:wrap;gap:6px}
.skill{padding:4px 11px;font-weight:700;font-size:9pt;border:2px solid ${c.primary};color:${c.primary};background:transparent;border-radius:${c.borderRadius}}
.summary{font-size:10pt;line-height:1.65;color:#555;border-left:4px solid ${c.primary};padding-left:12px}
</style></head><body>
<div class="header">
  <h1>${d.name || "Your Name"}</h1>
  <div class="role">${d.role || "Professional Title"}</div>
  <div class="contact">
    ${d.email ? `<span>✉ ${d.email}</span>` : ""}
    ${d.phone ? `<span>☏ ${d.phone}</span>` : ""}
    ${d.location ? `<span>⌖ ${d.location}</span>` : ""}
    ${d.linkedin ? `<span>in ${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="accent-bar"></div>
<div class="body">
  ${d.summary ? `<div class="section"><div class="section-title">About</div><p class="summary">${d.summary}</p></div>` : ""}
  ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-date">${e.duration}</div><div><div class="exp-title">${e.title}</div><div class="exp-company">${e.company}</div><div class="exp-desc">${e.description}</div></div></div>`).join("")}</div>` : ""}
  ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
  ${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
</div></body></html>`;
}

// ── LAYOUT: Tech (monospace/code style) ──
function layoutTech(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt}
.header{background:${c.headerBg};padding:32px 40px;border-bottom:2px solid ${c.primary}}
.header .prompt{font-family:${c.headingFont};font-size:9pt;color:${c.primary};margin-bottom:6px}
.header h1{font-family:${c.headingFont};font-size:24pt;font-weight:700;color:${c.primary};letter-spacing:-0.01em}
.header .role{font-size:11pt;color:rgba(255,255,255,0.65);margin:4px 0 12px}
.header .contact{display:flex;flex-wrap:wrap;gap:16px;font-family:${c.headingFont};font-size:8.5pt;color:rgba(255,255,255,0.45)}
.body{padding:28px 40px;display:grid;grid-template-columns:1.6fr 1fr;gap:28px}
.section{margin-bottom:22px}
.section-title{font-family:${c.headingFont};font-size:8pt;font-weight:600;text-transform:uppercase;letter-spacing:0.2em;color:${c.primary};margin-bottom:12px}
.section-title::before{content:"// "}
.exp-item{margin-bottom:14px;padding:12px;background:rgba(255,255,255,0.04);border:1px solid ${c.primary}30;border-radius:${c.borderRadius};border-left:3px solid ${c.primary}}
.exp-title{font-weight:700;font-size:10pt;color:${c.text}}
.exp-company{font-size:9pt;color:${c.primary};font-weight:600}
.exp-duration{font-size:8.5pt;color:#777;font-family:${c.headingFont}}
.exp-desc{font-size:9pt;color:#888;line-height:1.5;margin-top:4px}
.edu-item{margin-bottom:10px;padding:10px;background:rgba(255,255,255,0.03);border-radius:${c.borderRadius}}
.edu-degree{font-weight:700;font-size:10pt}
.edu-info{font-size:9pt;color:#888}
.skills{display:flex;flex-wrap:wrap;gap:5px}
.skill{padding:3px 9px;font-family:${c.headingFont};font-size:8.5pt;background:${c.primary}20;color:${c.primary};border:1px solid ${c.primary}40;border-radius:${c.borderRadius}}
.summary{font-size:9.5pt;line-height:1.7;color:#aaa;font-family:${c.headingFont}}
</style></head><body>
<div class="header">
  <div class="prompt">$ whoami</div>
  <h1>${d.name || "Your Name"}</h1>
  <div class="role"># ${d.role || "Professional Title"}</div>
  <div class="contact">
    ${d.email ? `<span>email: ${d.email}</span>` : ""}
    ${d.phone ? `<span>phone: ${d.phone}</span>` : ""}
    ${d.location ? `<span>location: ${d.location}</span>` : ""}
    ${d.linkedin ? `<span>linkedin: ${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="body">
  <div>
    ${d.summary ? `<div class="section"><div class="section-title">profile</div><p class="summary">${d.summary}</p></div>` : ""}
    ${exp.length ? `<div class="section"><div class="section-title">experience</div>${exp.map(e => `<div class="exp-item"><div class="exp-title">${e.title}</div><div class="exp-company">${e.company}</div><div class="exp-duration">${e.duration}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  </div>
  <div>
    ${skills.length ? `<div class="section"><div class="section-title">skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
    ${edu.length ? `<div class="section"><div class="section-title">education</div>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
  </div>
</div></body></html>`;
}

// ── LAYOUT: Creative (cards/modern) ──
function layoutCreative(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Outfit:wght@700;900&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt}
.header{background:${c.headerBg};padding:40px;position:relative;overflow:hidden}
.header::after{content:"";position:absolute;bottom:-40px;right:-40px;width:180px;height:180px;border-radius:50%;background:${c.primary}20}
.header h1{font-family:${c.headingFont};font-size:30pt;font-weight:900;color:${c.headerText};letter-spacing:-0.02em;margin-bottom:4px}
.header .role{font-size:11pt;color:${c.primary};font-weight:600;margin-bottom:14px}
.header .contact{display:flex;flex-wrap:wrap;gap:16px;font-size:9pt;color:${c.headerText};opacity:0.6}
.body{padding:32px 40px}
.section{margin-bottom:24px}
.section-title{font-family:${c.headingFont};font-size:16pt;font-weight:900;color:${c.primary};margin-bottom:14px}
.card{background:rgba(255,255,255,0.5);border:1px solid ${c.primary}20;border-radius:${c.borderRadius};padding:16px;margin-bottom:10px;border-left:4px solid ${c.primary}}
.card-title{font-weight:700;font-size:10.5pt;margin-bottom:2px}
.card-sub{font-size:9.5pt;color:${c.primary};font-weight:600;margin-bottom:2px}
.card-meta{font-size:8.5pt;color:#999;margin-bottom:6px}
.card-desc{font-size:9.5pt;color:#666;line-height:1.5}
.skills{display:flex;flex-wrap:wrap;gap:7px}
.skill{padding:5px 12px;border-radius:${c.borderRadius};background:${c.primary};color:#fff;font-size:9pt;font-weight:700}
.summary{font-size:10.5pt;line-height:1.7;color:#555;padding:16px;background:${c.primary}08;border-radius:${c.borderRadius};border-left:4px solid ${c.primary}}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px}
</style></head><body>
<div class="header">
  <h1>${d.name || "Your Name"}</h1>
  <div class="role">${d.role || "Creative Professional"}</div>
  <div class="contact">
    ${d.email ? `<span>✉ ${d.email}</span>` : ""}
    ${d.phone ? `<span>☏ ${d.phone}</span>` : ""}
    ${d.location ? `<span>⌖ ${d.location}</span>` : ""}
    ${d.linkedin ? `<span>in ${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="body">
  ${d.summary ? `<div class="section"><p class="summary">${d.summary}</p></div>` : ""}
  ${exp.length ? `<div class="section"><div class="section-title">Experience</div>${exp.map(e => `<div class="card"><div class="card-title">${e.title}</div><div class="card-sub">${e.company}</div><div class="card-meta">${e.duration}</div><div class="card-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  <div class="two-col">
    ${edu.length ? `<div class="section"><div class="section-title">Education</div>${edu.map(e => `<div class="card"><div class="card-title">${e.degree}</div><div class="card-sub">${e.institution}</div><div class="card-meta">${e.year}</div></div>`).join("")}</div>` : ""}
    ${skills.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
  </div>
</div></body></html>`;
}

// ── LAYOUT: Luxury (premium dark/gold) ──
function layoutLuxury(d: ResumeData, c: TemplateConfig): string {
  const skills = d.skills || [];
  const exp = d.experience || [];
  const edu = d.education || [];
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:${c.bodyFont};background:${c.bg};color:${c.text};font-size:10pt}
.header{background:${c.headerBg};padding:44px 48px;border-bottom:1px solid ${c.primary}50;text-align:center}
.header .ornament{font-size:14pt;color:${c.primary};letter-spacing:0.5em;margin-bottom:10px}
.header h1{font-family:'Playfair Display',Georgia,serif;font-size:34pt;font-weight:900;color:${c.headerText};letter-spacing:0.02em;margin-bottom:6px}
.header .role{font-size:10pt;color:${c.primary};font-weight:400;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:16px}
.header .ornament-bot{font-size:10pt;color:${c.primary};margin-bottom:14px}
.header .contact{display:flex;justify-content:center;flex-wrap:wrap;gap:20px;font-size:9pt;color:${c.headerText};opacity:0.55;letter-spacing:0.05em}
.body{padding:36px 48px}
.section{margin-bottom:26px}
.section-title{font-family:'Playfair Display',Georgia,serif;font-size:16pt;font-weight:700;color:${c.primary};text-align:center;margin-bottom:6px}
.section-rule{border:none;border-top:1px solid ${c.primary}60;margin-bottom:16px}
.exp-item{margin-bottom:16px;padding:16px;border:1px solid ${c.primary}25;border-radius:${c.borderRadius};background:rgba(255,255,255,0.04)}
.exp-title{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:11pt;color:${c.headerText};margin-bottom:2px}
.exp-company{font-size:9.5pt;color:${c.primary};letter-spacing:0.08em;font-style:italic;margin-bottom:2px}
.exp-duration{font-size:8.5pt;color:#888;margin-bottom:6px}
.exp-desc{font-size:9.5pt;color:#aaa;line-height:1.6}
.edu-item{margin-bottom:12px;text-align:center}
.edu-degree{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:11pt;color:${c.headerText}}
.edu-info{font-size:9pt;color:#888}
.skills{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.skill{padding:4px 14px;border:1px solid ${c.primary}60;color:${c.primary};font-size:9pt;letter-spacing:0.1em;text-transform:uppercase;background:transparent}
.summary{font-family:'Playfair Display',Georgia,serif;font-size:11pt;line-height:1.8;color:${c.headerText};opacity:0.7;text-align:center;font-style:italic;max-width:600px;margin:0 auto}
</style></head><body>
<div class="header">
  <div class="ornament">✦ ✦ ✦</div>
  <h1>${d.name || "Your Name"}</h1>
  <div class="role">${d.role || "Professional Title"}</div>
  <div class="ornament-bot">— ◆ —</div>
  <div class="contact">
    ${d.email ? `<span>${d.email}</span>` : ""}
    ${d.phone ? `<span>${d.phone}</span>` : ""}
    ${d.location ? `<span>${d.location}</span>` : ""}
    ${d.linkedin ? `<span>${d.linkedin}</span>` : ""}
  </div>
</div>
<div class="body">
  ${d.summary ? `<div class="section"><div class="section-title">Profile</div><hr class="section-rule"/><p class="summary">${d.summary}</p></div>` : ""}
  ${exp.length ? `<div class="section"><div class="section-title">Experience</div><hr class="section-rule"/>${exp.map(e => `<div class="exp-item"><div class="exp-title">${e.title}</div><div class="exp-company">${e.company}</div><div class="exp-duration">${e.duration}</div><div class="exp-desc">${e.description}</div></div>`).join("")}</div>` : ""}
  ${edu.length ? `<div class="section"><div class="section-title">Education</div><hr class="section-rule"/>${edu.map(e => `<div class="edu-item"><div class="edu-degree">${e.degree}</div><div class="edu-info">${e.institution} · ${e.year}</div></div>`).join("")}</div>` : ""}
  ${skills.length ? `<div class="section"><div class="section-title">Expertise</div><hr class="section-rule"/><div class="skills">${skills.map(s => `<span class="skill">${s}</span>`).join("")}</div></div>` : ""}
</div></body></html>`;
}

// ── Async generation reading actual templates or falling back ──
export async function generateResumeHTML(d: ResumeData): Promise<string> {
  const tplId = d.templateId || "01-minimalist-pro";
  let html = "";
  
  try {
    // Try to fetch the static HTML directly
    const res = await fetch(`/templates/resume/${tplId}.html`);
    if (res.ok) {
      html = await res.text();
    }
  } catch (e) {
    console.warn("Failed to fetch template HTML:", e);
  }

  // If we fetched the HTML and the user has converted it with MACROS
  if (html && html.includes("{{NAME}}")) {
    html = html
      .replace(/\{\{NAME\}\}/g, d.name || "Your Name")
      .replace(/\{\{ROLE\}\}/g, d.role || "Your Role")
      .replace(/\{\{EMAIL\}\}/g, d.email || "")
      .replace(/\{\{PHONE\}\}/g, d.phone || "")
      .replace(/\{\{LOCATION\}\}/g, d.location || "")
      .replace(/\{\{LINKEDIN\}\}/g, d.linkedin || "")
      .replace(/\{\{SUMMARY\}\}/g, d.summary || "");

    const expRegex = /<!--\s*EXPERIENCE_START\s*-->([\s\S]*?)<!--\s*EXPERIENCE_END\s*-->/i;
    const expMatch = html.match(expRegex);
    if (expMatch) {
      const expBlock = expMatch[1];
      let expHtml = "";
      if (d.experience && d.experience.length) {
        d.experience.forEach(exp => {
          expHtml += expBlock
            .replace(/\{\{EXP_TITLE\}\}/g, exp.title || "Job Title")
            .replace(/\{\{EXP_COMPANY\}\}/g, exp.company || "Company")
            .replace(/\{\{EXP_DATE\}\}/g, exp.duration || "")
            .replace(/\{\{EXP_DESC\}\}/g, exp.description || "");
        });
      }
      html = html.replace(expRegex, expHtml);
    }

    const eduRegex = /<!--\s*EDUCATION_START\s*-->([\s\S]*?)<!--\s*EDUCATION_END\s*-->/i;
    const eduMatch = html.match(eduRegex);
    if (eduMatch) {
      const eduBlock = eduMatch[1];
      let eduHtml = "";
      if (d.education && d.education.length) {
        d.education.forEach(edu => {
          eduHtml += eduBlock
            .replace(/\{\{EDU_DEGREE\}\}/g, edu.degree || "Degree")
            .replace(/\{\{EDU_SCHOOL\}\}/g, edu.institution || "School")
            .replace(/\{\{EDU_YEAR\}\}/g, edu.year || "");
        });
      }
      html = html.replace(eduRegex, eduHtml);
    }

    const skillsRegex = /<!--\s*SKILLS_START\s*-->([\s\S]*?)<!--\s*SKILLS_END\s*-->/i;
    const skillsMatch = html.match(skillsRegex);
    if (skillsMatch) {
      const skillBlock = skillsMatch[1];
      let skillHtml = "";
      if (d.skills && d.skills.length) {
        d.skills.forEach(skill => {
          skillHtml += skillBlock.replace(/\{\{SKILL_NAME\}\}/g, skill || "");
        });
      }
      html = html.replace(skillsRegex, skillHtml);
    }
    
    return html;
  }

  // FALLBACK: Use Generic Layout if macro variables not found
  const c = getConfig(tplId);
  if (c.layout === "sidebar") return layoutSidebar(d, c);
  if (c.layout === "split") return layoutSplit(d, c);
  if (c.layout === "dark") return layoutDark(d, c);
  if (c.layout === "bold") return layoutBold(d, c);
  if (c.layout === "tech") return layoutTech(d, c);
  if (c.layout === "creative") return layoutCreative(d, c);
  if (c.layout === "luxury") return layoutLuxury(d, c);
  return layoutClean(d, c);
}
