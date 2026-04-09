"use client";
import { useEffect, useState, useCallback } from "react";
import { useDevUser } from "@/lib/useDevUser";
import Link from "next/link";
import Sidebar from "@/components/ui/Sidebar";
import RainbowButton from "@/components/ui/RainbowButton";
import {
  getUserResumes, getUserPortfolios, getATSHistory,
  getUserCredits, deleteResume, deletePortfolio, deductCredit, saveATSScore,
} from "@/lib/firebase";
import { RESUME_TEMPLATES } from "@/lib/template-registry";
import { resumeDataToText } from "@/lib/ats-algorithm";
import { generateResumeHTML } from "@/lib/resume-html-generator";

interface Resume {
  id: string;
  name?: string;
  role?: string;
  templateId?: string;
  updatedAt?: { seconds: number };
  downloads?: number;
  summary?: string;
  skills?: string[];
  experience?: { title: string; company: string; duration: string; description: string }[];
  education?: { degree: string; institution: string; year: string }[];
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  generatedHtml?: string;
}

interface Portfolio {
  id: string;
  name?: string;
  role?: string;
  templateId?: string;
  updatedAt?: { seconds: number };
}

interface ATSRecord {
  score: number;
  role: string;
  createdAt: number;
}

interface MiniATSResult {
  score: number;
  verdict: string;
  topSuggestions: string[];
  keywordsMissing: string[];
}

// ── Resume Preview Modal ──
function ResumeViewModal({ resume, onClose }: { resume: Resume; onClose: () => void }) {
  const tpl = RESUME_TEMPLATES.find(t => t.id === resume.templateId) || RESUME_TEMPLATES[0];

  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    generateResumeHTML({
      name: resume.name, role: resume.role, email: resume.email,
      phone: resume.phone, location: resume.location, linkedin: resume.linkedin,
      summary: resume.summary, skills: resume.skills,
      experience: resume.experience, education: resume.education,
      templateId: resume.templateId,
    }).then(setHtmlContent);
  }, [resume]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9500,
        background: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface)", borderRadius: 20, overflow: "hidden",
          border: "1px solid var(--border2)", width: "90vw", maxWidth: 960,
          maxHeight: "92vh", display: "flex", flexDirection: "column",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", borderBottom: "1px solid var(--border)", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{resume.name || "Resume"}</div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>
              Template: <span style={{ color: "var(--violet3)" }}>{tpl.name}</span>
              {resume.role && <> · {resume.role}</>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <RainbowButton as="a" href={`/manual?id=${resume.id}`} size="sm" variant="ghost">
              <i className="fas fa-pen" /> Edit
            </RainbowButton>
            <button onClick={onClose} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid var(--border2)",
              color: "var(--muted)", width: 36, height: 36, borderRadius: 10,
              cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>
          </div>
        </div>
        {/* Resume Preview — shows USER's actual data in their chosen template */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative", minHeight: 500 }}>
          <iframe
            srcDoc={htmlContent}
            style={{ width: "100%", height: "100%", border: "none", minHeight: 500 }}
            title={resume.name || "Resume"}
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
}

// ── Mini ATS result panel ──
function MiniATSPanel({ result, role, onFullAnalysis }: { result: MiniATSResult; role: string; onFullAnalysis: () => void }) {
  const color = result.score >= 75 ? "#4ade80" : result.score >= 50 ? "#fbbf24" : "#f87171";
  return (
    <div style={{
      marginTop: 10, padding: "12px 14px",
      background: `color-mix(in srgb, ${color} 6%, var(--surface))`,
      border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
      borderRadius: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: `color-mix(in srgb, ${color} 15%, transparent)`,
            border: `2px solid ${color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 800, color,
          }}>{result.score}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{result.verdict}</div>
            <div style={{ fontSize: 10, color: "var(--muted)" }}>ATS Score · {role || "General"}</div>
          </div>
        </div>
        <button onClick={onFullAnalysis} style={{
          background: "none", border: "1px solid rgba(124,58,237,0.3)",
          color: "var(--violet3)", fontSize: 10, fontWeight: 600,
          padding: "4px 10px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
        }}>Full Analysis ↗</button>
      </div>
      {result.keywordsMissing.length > 0 && (
        <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6 }}>
          Missing: {result.keywordsMissing.slice(0, 4).map(k => (
            <span key={k} style={{ marginRight: 4, color: "#f87171" }}>{k}</span>
          ))}
        </div>
      )}
      {result.topSuggestions.slice(0, 2).map((s, i) => (
        <div key={i} style={{ fontSize: 10, color: "var(--muted)", borderLeft: "2px solid rgba(255,255,255,0.1)", paddingLeft: 8, marginBottom: 3 }}>
          {s}
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useDevUser();
  const uid = user?.id;

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [atsHistory, setAtsHistory] = useState<ATSRecord[]>([]);
  const [credits, setCredits] = useState<{ credits: number; plan: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: "resume" | "portfolio" } | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [viewResume, setViewResume] = useState<Resume | null>(null);
  const [atsResults, setAtsResults] = useState<Record<string, MiniATSResult>>({});
  const [atsChecking, setAtsChecking] = useState<string | null>(null);
  const [atsRole, setAtsRole] = useState<Record<string, string>>({});

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    if (!uid) return;
    try {
      const [r, p, a, c] = await Promise.all([
        getUserResumes(uid),
        getUserPortfolios(uid),
        getATSHistory(uid, 8),
        getUserCredits(uid),
      ]);
      setResumes(r as Resume[]);
      setPortfolios(p as Portfolio[]);
      setAtsHistory(a as ATSRecord[]);
      setCredits(c);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [uid]);

  useEffect(() => { load(); }, [load]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "resume") {
        await deleteResume(deleteTarget.id);
        setResumes((r) => r.filter((x) => x.id !== deleteTarget.id));
      } else {
        await deletePortfolio(deleteTarget.id);
        setPortfolios((p) => p.filter((x) => x.id !== deleteTarget.id));
      }
      showToast("Deleted successfully");
    } catch {
      showToast("Delete failed", "error");
    }
    setDeleteTarget(null);
  };

  // ── Quick ATS Check — powered by expert Gemini prompt (costs 1 credit) ──
  const runQuickATS = async (resume: Resume) => {
    if (!uid) { showToast("Sign in required", "error"); return; }
    const role = atsRole[resume.id] || resume.role || "";
    if (!role) { showToast("Enter a job role first", "error"); return; }
    setAtsChecking(resume.id);
    try {
      const ok = await deductCredit(uid);
      if (!ok) {
        showToast("Not enough credits! Upgrade your plan.", "error");
        setAtsChecking(null);
        return;
      }
      getUserCredits(uid).then(c => setCredits(c));

      const text = resumeDataToText({
        name: resume.name, role: resume.role, email: resume.email,
        phone: resume.phone, location: resume.location, linkedin: resume.linkedin,
        summary: resume.summary, skills: resume.skills,
        experience: resume.experience, education: resume.education,
      });

      const prompt = `You are an expert ATS scoring engine. Analyze this resume for the role "${role}" using these 7 weighted parameters:
1. Keyword & Skills Match (30%) - compare resume against top 20-30 keywords typically required for this role
2. Job Title Relevance (20%) - how closely does the candidate title align?
3. Experience Match (20%) - years of relevant experience vs typical requirement
4. Education Match (10%) - degree level and field relevance
5. Achievements & Impact (10%) - quantified achievements, action verbs, impact
6. Formatting & Readability (5%) - structure, sections, contact info
7. Certifications & Extras (5%) - relevant certs, tools, projects

Final Score = (P1*0.30)+(P2*0.20)+(P3*0.20)+(P4*0.10)+(P5*0.10)+(P6*0.05)+(P7*0.05)

Be strict and realistic. Do NOT inflate scores. Return ONLY valid raw JSON with no markdown formatting, no code fences, just the raw JSON object starting with { and ending with }:
{"score": 0, "verdict": "string", "missing_keywords": [], "top_suggestions": []}

Replace the 0 and empty arrays with the actual values for this resume.

RESUME TEXT:
${text.slice(0, 4000)}`;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const apiData = await res.json();
      if (apiData.error) throw new Error(apiData.error);
      const raw = apiData.text || "";
      const firstBrace = raw.indexOf("{");
      const lastBrace = raw.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) throw new Error("No JSON in response");
      const parsed = JSON.parse(raw.slice(firstBrace, lastBrace + 1)) as { score: number; verdict: string; missing_keywords: string[]; top_suggestions: string[] };

      setAtsResults(prev => ({
        ...prev,
        [resume.id]: {
          score: parsed.score,
          verdict: parsed.verdict,
          topSuggestions: parsed.top_suggestions || [],
          keywordsMissing: parsed.missing_keywords || [],
        },
      }));

      await saveATSScore(uid, parsed.score, role || resume.role || "General");
      showToast(`ATS Score: ${parsed.score}/100 — 1 credit used`);
    } catch (e) {
      showToast("ATS check failed — try again", "error");
      console.error(e);
    } finally {
      setAtsChecking(null);
    }
  };

  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "there";

  const planBadgeStyle = (plan: string) => {
    if (plan === "pro") return { background: "rgba(139,92,246,0.15)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" };
    if (plan === "elite") return { background: "rgba(14,165,233,0.15)", color: "#38bdf8", border: "1px solid rgba(14,165,233,0.3)" };
    if (plan === "lifetime") return { background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.3)" };
    return { background: "rgba(124,58,237,0.1)", color: "var(--violet3)", border: "1px solid rgba(124,58,237,0.25)" };
  };

  if (loading) {
    return (
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div className="main-content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px",
            }} />
            <div style={{ color: "var(--muted)", fontSize: 13 }}>Loading your dashboard...</div>
          </div>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      {/* VIEW RESUME MODAL */}
      {viewResume && <ResumeViewModal resume={viewResume} onClose={() => setViewResume(null)} />}

      {/* DELETE MODAL */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 34, color: "var(--danger)", marginBottom: 12 }}>
              <i className="fas fa-trash" />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Outfit,sans-serif", color: "#fff", marginBottom: 8 }}>
              DELETE {deleteTarget.type === "resume" ? "RESUME" : "PORTFOLIO"}?
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
              This permanently deletes this item. You cannot undo this action.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <RainbowButton variant="ghost" size="sm" onClick={() => setDeleteTarget(null)}>Cancel</RainbowButton>
              <RainbowButton variant="danger" size="sm" onClick={confirmDelete}>Delete</RainbowButton>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <main className="main-content">
        {/* TOPBAR */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{
              fontFamily: "Outfit,sans-serif", fontSize: 22, fontWeight: 900, color: "#fff",
              marginBottom: 4, letterSpacing: "-0.01em",
            }}>
              GOOD TO SEE YOU,{" "}
              <span style={{ color: "var(--violet3)" }}>{firstName.toUpperCase()}</span>
            </h1>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>Here&apos;s everything you&apos;ve built so far.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {credits && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                  display: "flex", alignItems: "center", gap: 5,
                  ...planBadgeStyle(credits.plan),
                }}>
                  <i className="fas fa-bolt" style={{ fontSize: 9 }} />
                  {credits.plan.toUpperCase()}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  <span className={`credits-badge plan-${credits.plan}`}>{credits.credits === 99999 ? "∞" : credits.credits} credits</span>
                </div>
              </div>
            )}
            <RainbowButton as="a" href="/pricing" size="sm" variant="primary">
              <i className="fas fa-rocket" /> Upgrade Plan
            </RainbowButton>
          </div>
        </div>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Resumes Created", value: resumes.length, icon: "fas fa-file-lines", color: "var(--violet3)" },
            { label: "Times Downloaded", value: resumes.reduce((s, r) => s + (r.downloads || 0), 0), icon: "fas fa-download", color: "var(--violet3)" },
            { label: "Portfolios Live", value: portfolios.length, icon: "fas fa-globe", color: "var(--green)" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `color-mix(in srgb, ${s.color} 15%, transparent)`,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
              }}>
                <i className={s.icon} style={{ color: s.color, fontSize: 15 }} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", fontFamily: "Outfit,sans-serif" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* RESUMES */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>MY RESUMES</div>
          <Link href="/builder" style={{ fontSize: 12, color: "var(--violet3)", textDecoration: "none", fontWeight: 600 }}>
            Create new <i className="fas fa-arrow-right" />
          </Link>
        </div>

        <div className="horizontal-scroll" style={{ 
          display: "flex", flexWrap: "nowrap", overflowX: "auto", overflowY: "hidden", 
          gap: 16, marginBottom: 40, paddingBottom: 16, scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", scrollBehavior: "smooth"
        }}>
          {/* New Resume card */}
          <div style={{
            minWidth: 260, flexShrink: 0, scrollSnapAlign: "start",
            background: "var(--surface)", border: "2px dashed rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer",
            minHeight: 160, transition: "border-color 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: "var(--violet-dim)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            }}>
              <i className="fas fa-plus" style={{ color: "var(--violet3)" }} />
            </div>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>New Resume</span>
            <div style={{ display: "flex", gap: 8 }}>
              <RainbowButton as="a" href="/builder" size="sm" variant="primary">
                <i className="fas fa-wand-magic-sparkles" /> AI
              </RainbowButton>
              <RainbowButton as="a" href="/manual" size="sm" variant="ghost">
                <i className="fas fa-pen-to-square" /> Manual
              </RainbowButton>
            </div>
          </div>

          {resumes.map((r) => {
            const tpl = RESUME_TEMPLATES.find(t => t.id === r.templateId) || RESUME_TEMPLATES[0];
            const hasATS = !!atsResults[r.id];
            return (
              <div key={r.id} style={{
                minWidth: 260, flexShrink: 0, scrollSnapAlign: "start",
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 16, padding: 18, position: "relative",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${tpl.accent}, transparent)`, borderRadius: "16px 16px 0 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, marginTop: 4 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: "var(--violet-dim)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i className="fas fa-file-lines" style={{ color: "var(--violet3)", fontSize: 13 }} />
                  </div>
                  <button
                    onClick={() => setDeleteTarget({ id: r.id, type: "resume" })}
                    style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12, padding: "4px 8px", borderRadius: 6, transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--danger)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                  >
                    <i className="fas fa-trash" />
                  </button>
                </div>

                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{r.name || "Unnamed Resume"}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{r.role || "No role"}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>{tpl.name}</div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                  <RainbowButton
                    onClick={() => setViewResume(r)}
                    size="sm" variant="ghost"
                    style={{ flex: 1, justifyContent: "center", fontSize: 11 }}
                  >
                    <i className="fas fa-eye" /> View
                  </RainbowButton>
                  <RainbowButton as="a" href={`/builder?id=${r.id}`} size="sm" variant="ghost" style={{ flex: 1, justifyContent: "center", fontSize: 11 }}>
                    <i className="fas fa-pen" /> Edit
                  </RainbowButton>
                </div>

                {/* ATS Check */}
                {!hasATS && (
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input
                      placeholder="Job role for ATS..."
                      value={atsRole[r.id] || ""}
                      onChange={e => setAtsRole(prev => ({ ...prev, [r.id]: e.target.value }))}
                      className="form-input"
                      style={{ fontSize: 10, padding: "5px 10px", flex: 1 }}
                    />
                    <button
                      onClick={() => runQuickATS(r)}
                      disabled={atsChecking === r.id}
                      style={{
                        background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
                        color: "var(--violet3)", fontSize: 10, fontWeight: 700,
                        padding: "5px 10px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                        whiteSpace: "nowrap", transition: "all 0.2s", flexShrink: 0,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.25)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; }}
                    >
                      {atsChecking === r.id
                        ? <><i className="fas fa-spinner fa-spin" /> Checking...</>
                        : <><i className="fas fa-chart-line" /> Check ATS</>
                      }
                    </button>
                  </div>
                )}

                {/* ATS Result */}
                {hasATS && atsResults[r.id] && (
                  <MiniATSPanel
                    result={atsResults[r.id]}
                    role={atsRole[r.id] || r.role || ""}
                    onFullAnalysis={() => window.location.href = `/analyzer?resumeId=${r.id}`}
                  />
                )}
                {hasATS && (
                  <button
                    onClick={() => setAtsResults(prev => { const n = { ...prev }; delete n[r.id]; return n; })}
                    style={{ marginTop: 6, fontSize: 9, color: "var(--muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
                  >
                    reset
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* PORTFOLIOS */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>MY PORTFOLIOS</div>
          <Link href="/portfolio" style={{ fontSize: 12, color: "var(--violet3)", textDecoration: "none", fontWeight: 600 }}>
            Create new <i className="fas fa-arrow-right" />
          </Link>
        </div>

        <div className="horizontal-scroll" style={{ 
          display: "flex", flexWrap: "nowrap", overflowX: "auto", overflowY: "hidden", 
          gap: 16, marginBottom: 40, paddingBottom: 16, scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch", scrollBehavior: "smooth"
        }}>
          <div style={{
            minWidth: 260, flexShrink: 0, scrollSnapAlign: "start",
            background: "var(--surface)", border: "2px dashed rgba(255,255,255,0.08)",
            borderRadius: 16, padding: 24, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12, cursor: "pointer", minHeight: 140,
            transition: "border-color 0.2s",
          }}
            onClick={() => window.location.href = "/portfolio"}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: "var(--green-dim)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
            }}>
              <i className="fas fa-plus" style={{ color: "var(--green)" }} />
            </div>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>New Portfolio</span>
            <RainbowButton as="a" href="/portfolio" size="sm" variant="green">
              <i className="fas fa-globe" /> Create
            </RainbowButton>
          </div>

          {portfolios.map((p) => (
            <div key={p.id} style={{
              minWidth: 260, flexShrink: 0, scrollSnapAlign: "start",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 16, padding: 18, position: "relative",
              transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, background: "var(--green-dim)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className="fas fa-globe" style={{ color: "var(--green)", fontSize: 13 }} />
                </div>
                <button
                  onClick={() => setDeleteTarget({ id: p.id, type: "portfolio" })}
                  style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12, padding: "4px 8px", borderRadius: 6, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--danger)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{p.name || "My Portfolio"}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{p.role || ""}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.templateId || "custom"}</div>

              <div style={{ display: "flex", gap: 6 }}>
                <RainbowButton
                  as="a"
                  href={`/portfolio-view?id=${p.id}`}
                  size="sm" variant="green"
                  style={{ flex: 1, justifyContent: "center", fontSize: 11 }}
                >
                  <i className="fas fa-eye" /> View
                </RainbowButton>
                <RainbowButton
                  as="a"
                  href={`/portfolio?id=${p.id}`}
                  size="sm" variant="ghost"
                  style={{ flex: 1, justifyContent: "center", fontSize: 11 }}
                >
                  <i className="fas fa-pen" /> Edit
                </RainbowButton>
              </div>
            </div>
          ))}
        </div>

        {/* ATS HISTORY */}
        {atsHistory.length > 0 && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>ATS SCORE PROGRESS</div>
              <Link href="/analyzer" style={{ fontSize: 12, color: "var(--violet3)", textDecoration: "none", fontWeight: 600 }}>
                Check again <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "20px 24px", marginBottom: 40,
            }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                {atsHistory.map((a, i) => {
                  const color = a.score >= 75 ? "#4ade80" : a.score >= 50 ? "#fbbf24" : "#f87171";
                  return (
                    <div key={i} title={`${a.role}: ${a.score}`} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 9, color: "var(--muted)" }}>{a.score}</div>
                      <div style={{
                        width: "100%", background: color, borderRadius: "4px 4px 0 0",
                        height: `${(a.score / 100) * 60}px`,
                        transition: "height 0.5s ease",
                        boxShadow: `0 0 8px color-mix(in srgb, ${color} 40%, transparent)`,
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* TIPS */}
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 16 }}>TIPS TO GET HIRED FASTER</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 16 }}>
          {[
            { num: "01", title: "Tailor every application", desc: "A customized resume gets 3x more callbacks. Use our ATS checker to match keywords for every job." },
            { num: "02", title: "Keep it to one page", desc: "Recruiters spend 7 seconds on a resume. One clean, well-structured page always wins." },
            { num: "03", title: "Lead with impact numbers", desc: 'Instead of "managed social media," write "grew Instagram by 40% in 3 months." Numbers make it real.' },
          ].map((tip) => (
            <div key={tip.num} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "20px 20px 20px 28px", position: "relative",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
                background: "linear-gradient(180deg, var(--violet), var(--green))",
                borderRadius: "16px 0 0 16px",
              }} />
              <div style={{ fontSize: 30, fontFamily: "Outfit,sans-serif", fontWeight: 900, color: "rgba(255,255,255,0.05)", marginBottom: 6 }}>{tip.num}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{tip.title}</div>
              <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
