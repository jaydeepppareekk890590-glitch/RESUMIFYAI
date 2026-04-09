"use client";
import { useState, useEffect, useRef, Suspense } from "react";
import { useDevUser } from "@/lib/useDevUser";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import RainbowButton from "@/components/ui/RainbowButton";
import { saveResume, getResume, deductCredit, getUserCredits, getPlanLimits } from "@/lib/firebase";
import { RESUME_TEMPLATES, RESUME_CATEGORIES } from "@/lib/template-registry";
import { generateResumeHTML } from "@/lib/resume-html-generator";

interface ResumeData {
  [key: string]: unknown;
  id?: string;
  name: string; role: string; email: string; phone: string;
  location: string; linkedin: string; summary: string;
  experience: { title: string; company: string; duration: string; description: string }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  templateId: string;
}

async function geminiCall(prompt: string): Promise<string> {
  const res = await fetch("/api/gemini", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt }) });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || "";
}

// ── Full-screen preview modal ──
function TemplatePreviewModal({ tpl, onClose, onSelect }: {
  tpl: typeof RESUME_TEMPLATES[0];
  onClose: () => void;
  onSelect: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--surface)", borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--border2)", width: "90vw", maxWidth: 900,
        maxHeight: "90vh", display: "flex", flexDirection: "column",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
      }}>
        {/* Modal Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{tpl.name}</div>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              {tpl.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 10,
                  background: "var(--violet-dim)", color: "var(--violet3)",
                  border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600,
                }}>{tag}</span>
              ))}
              <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)", color: "var(--muted)",
                border: "1px solid var(--border2)",
              }}>{tpl.category}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <RainbowButton size="sm" variant="primary" onClick={onSelect}>
              <i className="fas fa-check" /> Use Template
            </RainbowButton>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)",
              color: "var(--muted)", width: 36, height: 36, borderRadius: 10,
              cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>
        {/* Full iframe preview */}
        <iframe
          src={tpl.file}
          style={{ flex: 1, border: "none", width: "100%", minHeight: 600 }}
          title={tpl.name}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

// ── Template card with iframe thumbnail ──
function TemplateCard({ tpl, selected, onSelect, onPreview }: {
  tpl: typeof RESUME_TEMPLATES[0];
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div
      style={{
        borderRadius: 14, overflow: "hidden",
        border: selected ? "2px solid var(--violet3)" : "2px solid rgba(255,255,255,0.06)",
        background: "var(--surface)", cursor: "pointer",
        transition: "all 0.2s ease",
        transform: selected || hovered ? "translateY(-4px)" : "none",
        boxShadow: selected ? "0 0 24px rgba(124,58,237,0.4)" : hovered ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Selected badge */}
      {selected && (
        <div style={{
          position: "absolute", top: 8, right: 8, zIndex: 10,
          width: 22, height: 22, borderRadius: "50%", background: "var(--violet2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 12px rgba(124,58,237,0.6)",
        }}>
          <i className="fas fa-check" style={{ color: "#fff", fontSize: 9 }} />
        </div>
      )}

      {/* Iframe thumbnail */}
      <div style={{ height: 180, overflow: "hidden", position: "relative", background: "#f5f5f5" }}>
        <iframe
          ref={iframeRef}
          src={tpl.file}
          title={tpl.name}
          scrolling="no"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: "800px", height: "1050px",
            transform: "scale(0.225)", transformOrigin: "top left",
            border: "none", pointerEvents: "none",
          }}
        />
        {/* Hover overlay with preview button */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <button
              onClick={e => { e.stopPropagation(); onPreview(); }}
              style={{
                background: "rgba(124,58,237,0.9)", border: "1px solid rgba(167,139,250,0.5)",
                color: "#fff", padding: "8px 16px", borderRadius: 8, cursor: "pointer",
                fontSize: 11, fontWeight: 700, fontFamily: "inherit", letterSpacing: "0.05em",
              }}
            >
              <i className="fas fa-expand" /> Full Preview
            </button>
          </div>
        )}
        {/* Accent line at top */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${tpl.accent}, transparent)`,
        }} />
      </div>

      {/* Card footer */}
      <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{tpl.name}</span>
          <span style={{ fontSize: 9, color: "var(--muted)", fontWeight: 500 }}>{tpl.category}</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {tpl.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: "1px 6px", borderRadius: 6,
              background: "rgba(124,58,237,0.1)", color: "var(--violet3)",
              border: "1px solid rgba(124,58,237,0.15)",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BuilderContent() {
  const { user } = useDevUser();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(RESUME_TEMPLATES[0].id);
  const [previewTpl, setPreviewTpl] = useState<typeof RESUME_TEMPLATES[0] | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "", role: "", email: "", phone: "", location: "", linkedin: "",
    summary: "", experience: [], education: [], skills: [], templateId: RESUME_TEMPLATES[0].id,
  });
  const [previewHtml, setPreviewHtml] = useState<string>("");

  useEffect(() => {
    generateResumeHTML({ ...resumeData, templateId: selectedTemplate })
      .then(html => setPreviewHtml(html))
      .catch(e => console.error(e));
  }, [resumeData, selectedTemplate]);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [charCount, setCharCount] = useState(0);

  const showToast = (msg: string, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (resumeId) {
      getResume(resumeId).then((data) => {
        if (data) {
          setResumeData(data as ResumeData);
          setSelectedTemplate((data as ResumeData).templateId || RESUME_TEMPLATES[0].id);
          setStep(3);
        }
      });
    }
  }, [resumeId]);

  const EXAMPLES = [
    "I'm Arjun Sharma, a Computer Science student from Delhi University graduating in 2025. I know Python, JavaScript, and React. I've done internships at two startups where I built web apps. I want to work as a software engineer.",
    "I'm Priya, a UI/UX designer with 2 years experience. I'm skilled in Figma, Adobe XD, and user research. I've redesigned e-commerce apps and worked at a digital agency.",
    "MBA graduate from IIM Ahmedabad, specializing in marketing and strategy. Interned at Unilever and HUL. Looking for brand management roles.",
    "Mechanical engineer from IIT Bombay. Experience in CAD/CAM, AutoCAD, and manufacturing. Did project on electric vehicle chassis design.",
  ];

  const filteredTemplates = RESUME_TEMPLATES.filter(t => {
    const matchCat = filterCategory === "All" || t.category === filterCategory;
    const matchSearch = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const generateResume = async () => {
    if (prompt.length < 30) { showToast("Please write at least 30 characters about yourself", "error"); return; }
    if (!user?.id) { showToast("Please sign in to generate a resume", "error"); return; }
    setGenerating(true);
    try {
      // Deduct 1 credit (elite/lifetime always pass)
      const ok = await deductCredit(user.id);
      if (!ok) { showToast("Not enough credits! Upgrade your plan.", "error"); return; }

      const raw = await geminiCall(`You are a professional resume builder. Extract info from the text and return ONLY valid JSON (no markdown, no backticks):
{
  "name":"","role":"","email":"","phone":"","location":"","linkedin":"",
  "summary":"2-3 sentence professional summary",
  "experience":[{"title":"","company":"","duration":"","description":""}],
  "education":[{"degree":"","institution":"","year":""}],
  "skills":[]
}
User: ${prompt}`);
      const data = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResumeData({ ...data, templateId: selectedTemplate });
      setStep(2);
      showToast("Resume generated! ✨ Choose your template.");
    } catch (e) {
      showToast("Generation failed — try again", "error");
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const saveResumeData = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      const html = await generateResumeHTML({ ...resumeData, templateId: selectedTemplate });
      const newId = await saveResume(user.id, { ...resumeData, templateId: selectedTemplate, generatedHtml: html });
      
      if (newId && !resumeData.id) {
        setResumeData(prev => ({ ...prev, id: newId }));
        // Update URL to include the new ID without reloading the page
        window.history.replaceState(null, "", `/builder?id=${newId}`);
      }
      
      showToast("Resume saved! ☁️");
    } catch (e) {
      console.error("Failed to save resume:", e);
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // Generate resume with user data and download as PDF
  const downloadPDF = async () => {
    if (!user?.id) { showToast("Please sign in to download", "error"); return; }
    const creds = await getUserCredits(user.id);
    const limits = getPlanLimits(creds.plan);
    if (!limits.canDownloadHTML) {
      showToast("PDF download requires Pro, Elite or Lifetime plan!", "error");
      return;
    }
    setDownloading(true);
    try {
      const html = previewHtml;
      const iframe = document.getElementById("template-preview-frame") as HTMLIFrameElement | null;
      if (iframe && iframe.contentDocument?.body) {
        const { default: html2pdf } = await import("html2pdf.js");
        await html2pdf().set({
          margin: 0, filename: `${resumeData.name || "resume"}_${selectedTemplate}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        }).from(iframe.contentDocument.documentElement).save();
        showToast("PDF downloaded! 📄");
      } else {
        // Download as HTML
        const blob = new Blob([html], { type: "text/html" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${resumeData.name || "resume"}_${selectedTemplate}.html`;
        a.click();
        showToast("Downloaded as HTML — open in browser and Ctrl+P to print as PDF!");
      }
    } catch (e) {
      showToast("Download failed — try again", "error");
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const selectedTplObj = RESUME_TEMPLATES.find(t => t.id === selectedTemplate) || RESUME_TEMPLATES[0];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && <div className="toast-container"><div className={`toast ${toast.type}`}>{toast.msg}</div></div>}
      {previewTpl && (
        <TemplatePreviewModal
          tpl={previewTpl}
          onClose={() => setPreviewTpl(null)}
          onSelect={() => { setSelectedTemplate(previewTpl.id); setPreviewTpl(null); }}
        />
      )}

      <main className="main-content">
        {/* STEPS BAR */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          {[{ n: 1, label: "Describe Yourself" }, { n: 2, label: "Pick Template" }, { n: 3, label: "Edit & Download" }].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div onClick={() => step > s.n && setStep(s.n)} style={{
                  width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: step >= s.n ? "var(--violet)" : "rgba(255,255,255,0.06)",
                  border: step === s.n ? "2px solid var(--violet3)" : "none",
                  fontSize: 12, fontWeight: 700, color: step >= s.n ? "#fff" : "var(--muted)",
                  boxShadow: step === s.n ? "0 0 12px rgba(124,58,237,0.5)" : "none",
                  transition: "all 0.3s", cursor: step > s.n ? "pointer" : "default",
                }}>
                  {step > s.n ? <i className="fas fa-check" style={{ fontSize: 10 }} /> : s.n}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: step === s.n ? "#fff" : "var(--muted)" }}>{s.label}</span>
              </div>
              {i < 2 && <div style={{ width: 32, height: 2, background: step > s.n ? "var(--violet3)" : "rgba(255,255,255,0.08)", transition: "all 0.3s" }} />}
            </div>
          ))}
        </div>

        {/* STEP 1: DESCRIBE */}
        {step === 1 && (
          <div style={{ maxWidth: 720 }}>
            <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 8 }}>
              TELL US ABOUT <span style={{ color: "var(--violet3)" }}>YOURSELF</span>
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
              Write anything — your skills, education, experience, goals. No specific format needed.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {["💻 CS Student", "🎨 Designer", "📊 MBA Graduate", "⚙️ Engineer"].map((chip, i) => (
                <button key={chip} onClick={() => setPrompt(EXAMPLES[i])}
                  style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid var(--border2)", background: "transparent", color: "var(--muted)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border2)"}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border2)", borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <textarea
                className="form-input"
                placeholder={`Example: ${EXAMPLES[0]}`}
                value={prompt}
                onChange={e => { setPrompt(e.target.value); setCharCount(e.target.value.length); }}
                style={{ border: "none", background: "transparent", minHeight: 180, resize: "vertical", fontSize: 14, lineHeight: 1.7 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "var(--muted)" }}><i className="fas fa-lightbulb" style={{ color: "var(--violet3)" }} /> Include your name, skills, education, and experience</span>
                <span style={{ fontSize: 11, color: charCount > 800 ? "var(--warning)" : "var(--muted)" }}>{charCount} / 1000</span>
              </div>
            </div>
            <RainbowButton variant="primary" size="lg" onClick={generateResume} disabled={generating} style={{ width: "100%", justifyContent: "center" }}>
              {generating ? <><i className="fas fa-spinner fa-spin" /> Building your resume...</> : <><i className="fas fa-wand-magic-sparkles" /> Build My Resume</>}
            </RainbowButton>
          </div>
        )}

        {/* STEP 2: TEMPLATE PICKER */}
        {step === 2 && (
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
                  CHOOSE YOUR <span style={{ color: "var(--violet3)" }}>TEMPLATE</span>
                </h2>
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  {RESUME_TEMPLATES.length} premium templates · Click to select · Hover for full preview
                </p>
              </div>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <i className="fas fa-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: 12 }} />
                <input
                  className="form-input"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ paddingLeft: 34, fontSize: 12, width: 200, padding: "8px 12px 8px 34px" }}
                />
              </div>
            </div>

            {/* Category Filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["All", ...RESUME_CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setFilterCategory(cat)}
                  style={{
                    padding: "6px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "inherit", border: "1px solid",
                    borderColor: filterCategory === cat ? "rgba(124,58,237,0.5)" : "var(--border2)",
                    background: filterCategory === cat ? "var(--violet-dim)" : "transparent",
                    color: filterCategory === cat ? "var(--violet3)" : "var(--muted)",
                    transition: "all 0.15s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Count */}
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16 }}>
              Showing {filteredTemplates.length} of {RESUME_TEMPLATES.length} templates
              {selectedTemplate && <> · <span style={{ color: "var(--violet3)" }}>Selected: {selectedTplObj.name}</span></>}
            </div>

            {/* Template Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
              {filteredTemplates.map(tpl => (
                <TemplateCard
                  key={tpl.id}
                  tpl={tpl}
                  selected={selectedTemplate === tpl.id}
                  onSelect={() => setSelectedTemplate(tpl.id)}
                  onPreview={() => setPreviewTpl(tpl)}
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <RainbowButton variant="ghost" onClick={() => setStep(1)}>
                <i className="fas fa-arrow-left" /> Back
              </RainbowButton>
              <RainbowButton variant="primary" onClick={() => { setResumeData(r => ({ ...r, templateId: selectedTemplate })); setStep(3); }}>
                Use <span style={{ color: "var(--violet3)", marginLeft: 4 }}>{selectedTplObj.name}</span>
                <i className="fas fa-arrow-right" style={{ marginLeft: 6 }} />
              </RainbowButton>
            </div>
          </div>
        )}

        {/* STEP 3: EDIT & DOWNLOAD */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "Outfit,sans-serif", fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
              EDIT & <span style={{ color: "var(--green)" }}>DOWNLOAD</span>
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
              Template: <span style={{ color: "var(--violet3)", fontWeight: 600 }}>{selectedTplObj.name}</span>
              {" "}· <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, textDecoration: "underline", fontFamily: "inherit" }}>Change template</button>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Edit Fields */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Personal Info */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <i className="fas fa-user" /> Personal Info
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      { key: "name", label: "Full Name", placeholder: "Arjun Sharma" },
                      { key: "role", label: "Job Title", placeholder: "Software Engineer" },
                      { key: "email", label: "Email", placeholder: "email@example.com" },
                      { key: "phone", label: "Phone", placeholder: "+91 98765 43210" },
                      { key: "location", label: "Location", placeholder: "Delhi, India" },
                      { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/you" },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>{f.label}</label>
                        <input className="form-input" style={{ fontSize: 12, padding: "8px 12px" }} placeholder={f.placeholder}
                          value={resumeData[f.key] as string || ""}
                          onChange={e => setResumeData(r => ({ ...r, [f.key]: e.target.value }))}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 4 }}>Summary</label>
                    <textarea className="form-input" style={{ fontSize: 12, padding: "8px 12px", minHeight: 70, resize: "vertical" }}
                      value={resumeData.summary} onChange={e => setResumeData(r => ({ ...r, summary: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                    <i className="fas fa-code" /> Skills (comma separated)
                  </div>
                  <input className="form-input" style={{ fontSize: 12 }} placeholder="Python, React, Node.js, SQL"
                    value={resumeData.skills.join(", ")}
                    onChange={e => setResumeData(r => ({ ...r, skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) }))}
                  />
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <RainbowButton variant="ghost" onClick={() => setStep(2)}><i className="fas fa-arrow-left" /> Change Template</RainbowButton>
                  <RainbowButton variant="ghost" onClick={saveResumeData} disabled={saving}>
                    {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-cloud" /> Save</>}
                  </RainbowButton>
                  <RainbowButton variant="primary" onClick={downloadPDF} disabled={downloading}>
                    {downloading ? <><i className="fas fa-spinner fa-spin" /> Generating...</> : <><i className="fas fa-file-pdf" /> Download PDF</>}
                  </RainbowButton>
                </div>

                {/* Download HTML fallback note */}
                <div style={{ padding: "10px 14px", background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 10, fontSize: 11, color: "var(--muted)" }}>
                  <i className="fas fa-info-circle" style={{ color: "var(--violet3)", marginRight: 6 }} />
                  Tip: Open "Download HTML" in your browser and press Ctrl+P to save as PDF for best quality with this template.
                </div>
              </div>

              {/* Live Preview — user data in template style */}
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                  Live Preview · <span style={{ color: "var(--violet3)" }}>{selectedTplObj.name}</span>
                </div>
                <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", position: "relative", height: 500 }}>
                  <iframe
                    id="template-preview-frame"
                    key={selectedTemplate}
                    srcDoc={previewHtml}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    title="Resume Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
                <div style={{ marginTop: 8, fontSize: 11, color: "var(--muted)" }}>
                  <i className="fas fa-check-circle" style={{ color: "var(--green)", marginRight: 6 }} />
                  Showing your actual data in <strong style={{ color: "var(--violet3)" }}>{selectedTplObj.name}</strong> style
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><div style={{ color: "var(--muted)" }}>Loading...</div></div>}>
      <BuilderContent />
    </Suspense>
  );
}
