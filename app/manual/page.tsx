"use client";
import Sidebar from "@/components/ui/Sidebar";
import RainbowButton from "@/components/ui/RainbowButton";
import { useState, useEffect, useRef, Suspense } from "react";
import { useDevUser } from "@/lib/useDevUser";
import { useSearchParams } from "next/navigation";
import { saveResume, getResume, getUserCredits, getPlanLimits } from "@/lib/firebase";
import { RESUME_TEMPLATES, RESUME_CATEGORIES } from "@/lib/template-registry";
import { generateResumeHTML } from "@/lib/resume-html-generator";

interface Exp { title: string; company: string; duration: string; description: string; }
interface Edu { degree: string; institution: string; year: string; }

function ManualBuilderContent() {
  const { user } = useDevUser();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");

  const [step, setStep] = useState<"pick-template" | "fill-form">("pick-template");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [templateId, setTemplateId] = useState(RESUME_TEMPLATES[0].id);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [previewTpl, setPreviewTpl] = useState<typeof RESUME_TEMPLATES[0] | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [exps, setExps] = useState<Exp[]>([{ title: "", company: "", duration: "", description: "" }]);
  const [edus, setEdus] = useState<Edu[]>([{ degree: "", institution: "", year: "" }]);
  const [generatedHtml, setGeneratedHtml] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };

  // Load existing resume if editing
  useEffect(() => {
    if (!resumeId) return;
    getResume(resumeId).then((data) => {
      if (data) {
        const d = data as Record<string, unknown>;
        setTemplateId((d.templateId as string) || RESUME_TEMPLATES[0].id);
        setName((d.name as string) || "");
        setRole((d.role as string) || "");
        setEmail((d.email as string) || "");
        setPhone((d.phone as string) || "");
        setLocation((d.location as string) || "");
        setLinkedin((d.linkedin as string) || "");
        setSummary((d.summary as string) || "");
        setSkills((d.skills as string[] || []).join(", "));
        setExps((d.experience as Exp[]) || [{ title: "", company: "", duration: "", description: "" }]);
        setEdus((d.education as Edu[]) || [{ degree: "", institution: "", year: "" }]);
        setStep("fill-form");
      }
    });
  }, [resumeId]);

  // Regenerate HTML whenever form data or template changes
  useEffect(() => {
    generateResumeHTML({
      name, role, email, phone, location, linkedin, summary,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      experience: exps,
      education: edus,
      templateId,
    }).then(html => setGeneratedHtml(html));
  }, [name, role, email, phone, location, linkedin, summary, skills, exps, edus, templateId]);

  const save = async () => {
    if (!user?.id) { showToast("Please sign in to save", "error"); return; }
    if (!name.trim()) { showToast("Enter your name first", "error"); return; }
    setSaving(true);
    try {
      await saveResume(user.id, {
        ...(resumeId ? { id: resumeId } : {}),
        name, role, email, phone, location, linkedin, summary,
        skills: skills.split(",").map(s => s.trim()).filter(Boolean),
        experience: exps, education: edus, templateId,
        generatedHtml,
      });
      showToast("Resume saved! ☁️");
    } catch (e) {
      showToast("Save failed", "error"); console.error(e);
    } finally { setSaving(false); }
  };

  const downloadPDF = async () => {
    if (!user?.id) { showToast("Please sign in to download", "error"); return; }
    const creds = await getUserCredits(user.id);
    const limits = getPlanLimits(creds.plan);
    if (!limits.canDownloadHTML) {
      showToast("PDF download requires Pro, Elite or Lifetime plan. Upgrade to download!", "error");
      return;
    }
    setDownloading(true);
    try {
      const iframe = document.getElementById("manual-preview-iframe") as HTMLIFrameElement | null;
      if (iframe && iframe.contentDocument?.body) {
        const { default: html2pdf } = await import("html2pdf.js");
        await html2pdf().set({
          margin: 0,
          filename: `${name || "resume"}_${templateId}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        }).from(iframe.contentDocument.documentElement).save();
        showToast("PDF Downloaded! 📄");
      } else {
        // Fallback: download as HTML
        const blob = new Blob([generatedHtml], { type: "text/html" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${name || "resume"}_${templateId}.html`;
        a.click();
        showToast("Downloaded as HTML — open in browser and Ctrl+P to print as PDF!");
      }
    } catch (e) {
      // Final fallback
      const blob = new Blob([generatedHtml], { type: "text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${name || "resume"}_${templateId}.html`;
      a.click();
      showToast("Downloaded as HTML!");
      console.error(e);
    } finally { setDownloading(false); }
  };

  const addExp = () => setExps(e => [...e, { title: "", company: "", duration: "", description: "" }]);
  const removeExp = (i: number) => setExps(e => e.filter((_, j) => j !== i));
  const addEdu = () => setEdus(e => [...e, { degree: "", institution: "", year: "" }]);
  const removeEdu = (i: number) => setEdus(e => e.filter((_, j) => j !== i));

  const selectedTpl = RESUME_TEMPLATES.find(t => t.id === templateId) || RESUME_TEMPLATES[0];
  const categories = ["All", ...RESUME_CATEGORIES];
  const visibleTemplates = categoryFilter === "All" ? RESUME_TEMPLATES : RESUME_TEMPLATES.filter(t => t.category === categoryFilter);

  // ── STEP 1: TEMPLATE PICKER ──
  if (step === "pick-template") {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        {toast && <div className="toast-container"><div className={`toast ${toast.type}`}>{toast.msg}</div></div>}

        {/* FULL-SCREEN PREVIEW MODAL */}
        {previewTpl && (
          <div style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
            onClick={() => setPreviewTpl(null)}>
            <div onClick={e => e.stopPropagation()} style={{ background: "var(--surface)", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border2)", width: "90vw", maxWidth: 900, maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{previewTpl.name}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    {previewTpl.tags.map(tag => <span key={tag} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: "var(--violet-dim)", color: "var(--violet3)", border: "1px solid rgba(124,58,237,0.2)", fontWeight: 600 }}>{tag}</span>)}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <RainbowButton size="sm" variant="primary" onClick={() => { setTemplateId(previewTpl.id); setPreviewTpl(null); setStep("fill-form"); }}>
                    <i className="fas fa-check" /> Use Template
                  </RainbowButton>
                  <button onClick={() => setPreviewTpl(null)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)", color: "var(--muted)", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 13 }}>✕ Close</button>
                </div>
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <iframe src={previewTpl.file} title={previewTpl.name} style={{ width: "100%", height: "100%", border: "none", minHeight: 600 }} />
              </div>
            </div>
          </div>
        )}

        <main className="main-content">
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
              MANUAL <span style={{ color: "var(--violet3)" }}>BUILDER</span>
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Pick a template — your data will be filled into it automatically.</p>
          </div>

          {/* STEP INDICATOR */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, padding: "12px 16px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--violet3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>1</div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Choose Template</span>
            </div>
            <i className="fas fa-arrow-right" style={{ color: "var(--muted)", fontSize: 11 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>2</div>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Fill Details</span>
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategoryFilter(cat)} style={{
                padding: "6px 16px", borderRadius: 20, border: "1px solid",
                borderColor: categoryFilter === cat ? "var(--violet3)" : "var(--border2)",
                background: categoryFilter === cat ? "var(--violet-dim)" : "transparent",
                color: categoryFilter === cat ? "var(--violet3)" : "var(--muted)",
                fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>{cat} {cat !== "All" ? `(${RESUME_TEMPLATES.filter(t => t.category === cat).length})` : `(${RESUME_TEMPLATES.length})`}</button>
            ))}
          </div>

          {/* TEMPLATE GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {visibleTemplates.map(tpl => {
              const isSelected = tpl.id === templateId;
              return (
                <div key={tpl.id} onClick={() => setTemplateId(tpl.id)} style={{
                  border: `2px solid ${isSelected ? "var(--violet3)" : "var(--border)"}`,
                  borderRadius: 14, overflow: "hidden", cursor: "pointer",
                  background: isSelected ? "rgba(124,58,237,0.05)" : "var(--surface)",
                  transition: "all 0.2s", position: "relative",
                  boxShadow: isSelected ? "0 0 0 4px rgba(124,58,237,0.1)" : "none",
                }}
                  onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; } }}
                  onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; } }}
                >
                  <div style={{ height: 3, background: tpl.accent }} />
                  <div style={{ position: "relative", height: 160, overflow: "hidden", background: "#f8f8f8" }}>
                    <iframe src={tpl.file} title={tpl.name} style={{ width: "210%", height: "210%", border: "none", transform: "scale(0.48)", transformOrigin: "top left", pointerEvents: "none" }} loading="lazy" />
                    <div style={{ position: "absolute", inset: 0 }} />
                    <button onClick={e => { e.stopPropagation(); setPreviewTpl(tpl); }} style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      <i className="fas fa-expand" /> Preview
                    </button>
                    {isSelected && (
                      <div style={{ position: "absolute", top: 8, left: 8, background: "var(--violet3)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: "#fff" }}>
                        <i className="fas fa-check" /> Selected
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "10px 12px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{tpl.name}</div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "var(--muted)", border: "1px solid var(--border2)" }}>{tpl.category}</span>
                      {tpl.tags.slice(0, 1).map(tag => <span key={tag} style={{ fontSize: 9, padding: "2px 6px", borderRadius: 8, background: "var(--violet-dim)", color: "var(--violet3)", border: "1px solid rgba(124,58,237,0.2)" }}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM ACTION */}
          <div style={{ position: "sticky", bottom: 0, background: "linear-gradient(to top, var(--bg) 80%, transparent)", padding: "20px 0 24px", marginTop: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              Selected: <span style={{ color: "var(--violet3)", fontWeight: 700 }}>{selectedTpl.name}</span>
            </div>
            <RainbowButton variant="primary" onClick={() => setStep("fill-form")}>
              <i className="fas fa-arrow-right" /> Continue with this template
            </RainbowButton>
          </div>
        </main>
      </div>
    );
  }

  // ── STEP 2: FILL FORM ──
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && <div className="toast-container"><div className={`toast ${toast.type}`}>{toast.msg}</div></div>}
      <main className="main-content">
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <button onClick={() => setStep("pick-template")} style={{ background: "none", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            <i className="fas fa-arrow-left" /> Change Template
          </button>
          <div>
            <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 22, fontWeight: 900, color: "#fff", marginBottom: 2 }}>
              MANUAL <span style={{ color: "var(--violet3)" }}>BUILDER</span>
            </h1>
            <p style={{ fontSize: 12, color: "var(--muted)" }}>Template: <span style={{ color: "var(--violet3)" }}>{selectedTpl.name}</span></p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* FORM */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Personal */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 12 }}><i className="fas fa-user" /> Personal Info</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {([["Full Name", name, setName, "Arjun Sharma"], ["Job Title", role, setRole, "Software Engineer"], ["Email", email, setEmail, "email@example.com"], ["Phone", phone, setPhone, "+91 98765 43210"], ["Location", location, setLocation, "Delhi, India"], ["LinkedIn", linkedin, setLinkedin, "linkedin.com/in/you"]] as const).map(([l, v, s, p]) => (
                  <div key={l}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>{l}</label>
                    <input className="form-input" style={{ fontSize: 12, padding: "8px 12px" }} placeholder={p} value={v} onChange={e => (s as (v: string) => void)(e.target.value)} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <label style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Summary</label>
                <textarea className="form-input" style={{ fontSize: 12, minHeight: 70, resize: "vertical" }} placeholder="Professional summary..." value={summary} onChange={e => setSummary(e.target.value)} />
              </div>
            </div>

            {/* Experience */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 12 }}><i className="fas fa-briefcase" /> Experience</div>
              {exps.map((exp, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, marginBottom: 10, position: "relative" }}>
                  <button onClick={() => removeExp(i)} style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12, padding: "2px 6px" }}><i className="fas fa-times" /></button>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                    {(["title", "company", "duration"] as const).map(k => (
                      <input key={k} className="form-input" style={{ fontSize: 12, padding: "7px 10px" }}
                        placeholder={{ title: "Job Title", company: "Company", duration: "2022–Present" }[k]}
                        value={exp[k]} onChange={e => setExps(exs => exs.map((ex, j) => j === i ? { ...ex, [k]: e.target.value } : ex))} />
                    ))}
                  </div>
                  <textarea className="form-input" style={{ fontSize: 12, padding: "7px 10px", minHeight: 55, resize: "vertical" }}
                    placeholder="What you built, achieved..." value={exp.description}
                    onChange={e => setExps(exs => exs.map((ex, j) => j === i ? { ...ex, description: e.target.value } : ex))} />
                </div>
              ))}
              <button onClick={addExp} style={{ background: "none", border: "1px dashed rgba(255,255,255,0.15)", color: "var(--muted)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", width: "100%", marginTop: 4, transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
              ><i className="fas fa-plus" /> Add Experience</button>
            </div>

            {/* Education */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 12 }}><i className="fas fa-graduation-cap" /> Education</div>
              {edus.map((edu, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 80px 32px", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  {(["degree", "institution", "year"] as const).map(k => (
                    <input key={k} className="form-input" style={{ fontSize: 12, padding: "7px 10px" }}
                      placeholder={{ degree: "B.Tech CSE", institution: "Delhi University", year: "2025" }[k]}
                      value={edu[k]} onChange={e => setEdus(es => es.map((ed, j) => j === i ? { ...ed, [k]: e.target.value } : ed))} />
                  ))}
                  <button onClick={() => removeEdu(i)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12 }}><i className="fas fa-times" /></button>
                </div>
              ))}
              <button onClick={addEdu} style={{ background: "none", border: "1px dashed rgba(255,255,255,0.15)", color: "var(--muted)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", width: "100%" }}>
                <i className="fas fa-plus" /> Add Education
              </button>
            </div>

            {/* Skills */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 10 }}><i className="fas fa-code" /> Skills <span style={{ fontWeight: 400, color: "var(--muted)" }}>(comma separated)</span></div>
              <input className="form-input" style={{ fontSize: 12 }} placeholder="Python, React, Node.js, TypeScript, SQL" value={skills} onChange={e => setSkills(e.target.value)} />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <RainbowButton variant="ghost" onClick={save} disabled={saving}>
                {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-cloud" /> Save</>}
              </RainbowButton>
              <RainbowButton variant="primary" onClick={downloadPDF} disabled={downloading}>
                {downloading ? <><i className="fas fa-spinner fa-spin" /> Generating...</> : <><i className="fas fa-file-pdf" /> Download PDF</>}
              </RainbowButton>
            </div>

            <div style={{ padding: "10px 14px", background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 10, fontSize: 11, color: "var(--muted)" }}>
              <i className="fas fa-info-circle" style={{ color: "var(--violet3)", marginRight: 6 }} />
              Preview updates live as you type. Click Download PDF to get your resume with your data in the selected template style.
            </div>
          </div>

          {/* LIVE PREVIEW — generated from user's actual data */}
          <div ref={previewRef}>
            <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
              Live Preview · <span style={{ color: "var(--violet3)" }}>{selectedTpl.name}</span>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)", height: 520, position: "relative" }}>
              {generatedHtml ? (
                <iframe
                  id="manual-preview-iframe"
                  key={templateId}
                  srcDoc={generatedHtml}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  title="Resume Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--muted)" }}>
                  <div style={{ textAlign: "center" }}>
                    <i className="fas fa-file-lines" style={{ fontSize: 32, marginBottom: 12, display: "block", color: "var(--violet3)" }} />
                    Start filling your details to see the preview
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "var(--muted)" }}>
              <i className="fas fa-check-circle" style={{ color: "var(--green)", marginRight: 6 }} />
              Preview uses YOUR data in the <strong style={{ color: "var(--violet3)" }}>{selectedTpl.name}</strong> style
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ManualPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}><div style={{ color: "var(--muted)" }}>Loading...</div></div>}>
      <ManualBuilderContent />
    </Suspense>
  );
}
