"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useDevUser } from "@/lib/useDevUser";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/ui/Sidebar";
import RainbowButton from "@/components/ui/RainbowButton";
import dynamic from "next/dynamic";
import { saveATSScore, deductCredit, getResume } from "@/lib/firebase";
import { resumeDataToText } from "@/lib/ats-algorithm";

import GlobalLoader from "@/components/ui/GlobalLoader";

interface ScoreParam {
  score: number;
  weight: string;
  weighted_score: number;
  comment: string;
  matched_keywords?: string[];
  missing_keywords?: string[];
  candidate_title?: string;
  years_found?: number;
  years_typically_required?: number;
  education_found?: string;
  quantified_achievements_found?: string[];
  issues_found?: string[];
  certifications_found?: string[];
}

interface PriorityImprovement {
  priority: "HIGH" | "MEDIUM" | "LOW";
  action: string;
  impact: string;
}

interface ATSResult {
  candidate_name: string;
  target_role: string;
  overall_ats_score: number;
  score_grade: string;
  will_pass_ats: boolean;
  score_breakdown: {
    keyword_skills_match: ScoreParam;
    job_title_relevance: ScoreParam;
    experience_match: ScoreParam;
    education_match: ScoreParam;
    achievements_impact: ScoreParam;
    formatting_readability: ScoreParam;
    certifications_extras: ScoreParam;
  };
  top_strengths: string[];
  critical_gaps: string[];
  priority_improvements: PriorityImprovement[];
  missing_keywords_to_add: string[];
  recruiter_verdict: string;
}

async function geminiCall(prompt: string): Promise<string> {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text || "";
}

export default function AnalyzerPage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <AnalyzerContent />
    </Suspense>
  );
}

function AnalyzerContent() {
  const { user } = useDevUser();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const [file, setFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState("");
  const [preloadedResumeName, setPreloadedResumeName] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [scoreAnimated, setScoreAnimated] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Animate score counter
  useEffect(() => {
    if (!result) return;
    let start = 0;
    const end = result.overall_ats_score;
    const step = Math.ceil(end / 60);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      setScoreAnimated(start);
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [result]);

  // Auto-load resume from Firestore if resumeId is in URL
  useEffect(() => {
    if (!resumeId) return;
    getResume(resumeId).then((data) => {
      if (data) {
        const r = data as Record<string, unknown>;
        const text = resumeDataToText({
          name: r.name as string,
          role: r.role as string,
          email: r.email as string,
          phone: r.phone as string,
          location: r.location as string,
          linkedin: r.linkedin as string,
          summary: r.summary as string,
          skills: r.skills as string[],
          experience: r.experience as { title: string; company: string; duration: string; description: string }[],
          education: r.education as { degree: string; institution: string; year: string }[],
        });
        setFileText(text);
        setPreloadedResumeName((r.name as string) || "Saved Resume");
        if (r.role) setRole(r.role as string);
      }
    }).catch(console.error);
  }, [resumeId]);

  // Extract readable text from PDF or plain text files
  const extractText = async (f: File): Promise<string> => {
    try {
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        // PDF extraction via pdfjs-dist dynamically imported to prevent SSR crash (DOMMatrix error)
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
          fullText += pageText + "\n";
        }
        return fullText.slice(0, 8000);
      } else {
        // Plain text / DOCX fallback
        const text = await f.text();
        return text.slice(0, 8000);
      }
    } catch (err) {
      console.error("Text extraction failed:", err);
      // Last resort: try reading as plain text
      const text = await f.text().catch(() => "");
      return text.slice(0, 8000);
    }
  };

  const handleFile = async (f: File) => {
    setFile(f);
    showToast("Extracting text from resume...", "success");
    const text = await extractText(f);
    setFileText(text);
    if (text.length > 100) {
      showToast(`Resume loaded — ${text.length} characters extracted ✓`, "success");
    } else {
      showToast("Warning: very little text extracted. Try a text-based PDF.", "error");
    }
  };

  // ── EXPERT ATS via Gemini ──
  const runAnalysis = async () => {
    if (!fileText) { showToast("Please upload your resume first", "error"); return; }
    if (!role) { showToast("Please enter a target job role", "error"); return; }
    if (!user?.id) { showToast("Please sign in to use the ATS checker", "error"); return; }

    setAnalyzing(true);
    setResult(null);
    try {
      const ok = await deductCredit(user.id);
      if (!ok) {
        showToast("Not enough credits! Upgrade your plan to continue.", "error");
        setAnalyzing(false);
        return;
      }

      const prompt = `You are an expert ATS (Applicant Tracking System) scoring engine with deep knowledge of how real corporate ATS software like Taleo, Workday, Greenhouse, and iCIMS evaluate resumes. Your job is to analyze the given resume against the target job role and return a highly accurate, detailed ATS score.

YOUR SCORING METHODOLOGY:

STEP 1 — UNDERSTAND THE JOB ROLE DEEPLY
Based on the target job role provided, you must:
- Identify the top 20-30 keywords, skills, and tools typically required for this role
- Identify must-have hard skills vs nice-to-have soft skills for this role
- Identify the typical experience level required (entry/mid/senior)
- Identify the typical education requirements for this role
- Identify industry-specific certifications commonly expected
- Use your knowledge of real job descriptions for this role to fill gaps (since no JD is provided, act as if you are a recruiter who knows this role deeply)

STEP 2 — PARSE THE RESUME THOROUGHLY
Extract and analyze:
- Candidate name and contact info (present or missing?)
- Current/recent job title
- Total years of experience (calculate from dates if present)
- All technical skills and tools mentioned
- All soft skills mentioned
- Education: degree level, field, institution
- Certifications and licenses
- Achievements with numbers/metrics
- Keywords and industry terms used
- Resume length and structure quality

STEP 3 — SCORE ON 7 WEIGHTED PARAMETERS

PARAMETER 1 — KEYWORD & SKILLS MATCH (Weight: 30%)
- Compare resume skills/keywords against typical requirements for the target role
- Check for exact matches, synonym matches (e.g. "ML" = "Machine Learning"), and related skill matches
- Check if keywords appear in prominent sections (Skills, Experience) vs buried text
- Score: (matched keywords / total expected keywords) × 100

PARAMETER 2 — JOB TITLE RELEVANCE (Weight: 20%)
- How closely does the candidate current/recent job title align with the target role?
- Exact match = 100, Related title = 60-80, Unrelated = 0-30
- Also consider progression: junior → mid → senior trajectory

PARAMETER 3 — EXPERIENCE MATCH (Weight: 20%)
- Calculate total years of relevant experience from resume
- Compare against typical requirement for the target role
- Exceeds requirement = 90-100, Meets = 75-90, Slightly below = 50-75, Significantly below = 0-50
- Penalize unexplained employment gaps longer than 6 months

PARAMETER 4 — EDUCATION MATCH (Weight: 10%)
- Does degree level match typical requirement for the role?
- Does field of study match? (e.g. CS degree for software engineer = perfect)
- Relevant certifications can compensate for degree gaps

PARAMETER 5 — ACHIEVEMENTS & IMPACT (Weight: 10%)
- Does the resume have quantifiable achievements? (numbers, percentages, revenue)
- Are accomplishments listed or just responsibilities?
- Strong action verbs used? (led, built, increased, reduced, managed)

PARAMETER 6 — RESUME FORMATTING & ATS READABILITY (Weight: 5%)
- Standard section headers used? (Work Experience, Education, Skills)
- No tables, columns, graphics, text boxes?
- Proper date formats used?
- Contact information present?
- Appropriate resume length?

PARAMETER 7 — CERTIFICATIONS & EXTRAS (Weight: 5%)
- Industry-relevant certifications present?
- Tools/platforms mentioned that are commonly used in the target role?
- Projects, publications, or portfolio mentioned if relevant?

STEP 4 — CALCULATE FINAL SCORE
Final ATS Score = (Param1 × 0.30) + (Param2 × 0.20) + (Param3 × 0.20) + (Param4 × 0.10) + (Param5 × 0.10) + (Param6 × 0.05) + (Param7 × 0.05)

IMPORTANT RULES:
- Be strict and realistic. Do NOT inflate scores to make candidates feel good.
- A score of 85+ should be rare and only for truly excellent matches.
- Always base keyword expectations on real industry standards for the target role.
- Never return a score without justification.
- Return ONLY valid raw JSON, no markdown, no code blocks, no extra text.

OUTPUT — RETURN STRICTLY THIS JSON STRUCTURE:
{
  "candidate_name": "string",
  "target_role": "string",
  "overall_ats_score": number,
  "score_grade": "Excellent|Good|Average|Poor",
  "will_pass_ats": true or false,
  "score_breakdown": {
    "keyword_skills_match": {
      "score": number,
      "weight": "30%",
      "weighted_score": number,
      "matched_keywords": ["list"],
      "missing_keywords": ["list"],
      "comment": "string"
    },
    "job_title_relevance": {
      "score": number,
      "weight": "20%",
      "weighted_score": number,
      "candidate_title": "string",
      "comment": "string"
    },
    "experience_match": {
      "score": number,
      "weight": "20%",
      "weighted_score": number,
      "years_found": number,
      "years_typically_required": number,
      "comment": "string"
    },
    "education_match": {
      "score": number,
      "weight": "10%",
      "weighted_score": number,
      "education_found": "string",
      "comment": "string"
    },
    "achievements_impact": {
      "score": number,
      "weight": "10%",
      "weighted_score": number,
      "quantified_achievements_found": ["list"],
      "comment": "string"
    },
    "formatting_readability": {
      "score": number,
      "weight": "5%",
      "weighted_score": number,
      "issues_found": ["list"],
      "comment": "string"
    },
    "certifications_extras": {
      "score": number,
      "weight": "5%",
      "weighted_score": number,
      "certifications_found": ["list"],
      "comment": "string"
    }
  },
  "top_strengths": ["strength 1", "strength 2", "strength 3"],
  "critical_gaps": ["gap 1 - what is missing and why it matters", "gap 2", "gap 3"],
  "priority_improvements": [
    { "priority": "HIGH", "action": "string", "impact": "string" },
    { "priority": "MEDIUM", "action": "string", "impact": "string" },
    { "priority": "LOW", "action": "string", "impact": "string" }
  ],
  "missing_keywords_to_add": ["keyword1", "keyword2", "keyword3"],
  "recruiter_verdict": "A 2-3 sentence summary written as if a recruiter is giving honest feedback on this resume for this specific role."
}

TARGET JOB ROLE: ${role}

RESUME TEXT:
${fileText.slice(0, 7000)}`;

      const raw = await geminiCall(prompt);
      // Robust JSON extraction: find first { to last }
      const firstBrace = raw.indexOf("{");
      const lastBrace = raw.lastIndexOf("}");
      if (firstBrace === -1 || lastBrace === -1) {
        throw new Error("No JSON found in Gemini response");
      }
      const jsonStr = raw.slice(firstBrace, lastBrace + 1);
      const data = JSON.parse(jsonStr) as ATSResult;
      setResult(data);
      await saveATSScore(user.id, data.overall_ats_score, role);
      showToast(`ATS Score: ${data.overall_ats_score}/100 — 1 credit used`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      showToast("Analysis failed: " + msg.slice(0, 60), "error");
      console.error("ATS analysis error:", e);
    } finally {
      setAnalyzing(false);
    }
  };

  const score = result?.overall_ats_score ?? 0;
  const scoreColor = result
    ? score >= 75 ? "#4ade80" : score >= 50 ? "#fbbf24" : "#f87171"
    : "var(--violet3)";

  const circumference = 2 * Math.PI * 60;
  const offset = result ? circumference * (1 - score / 100) : circumference;

  const priorityColor = (p: string) =>
    p === "HIGH" ? "#f87171" : p === "MEDIUM" ? "#fbbf24" : "#4ade80";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <main className="main-content">
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 6 }}>
            ATS <span style={{ color: "var(--violet3)" }}>CHECKER</span>
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)" }}>
            Upload your resume and enter a job role to get a precise ATS score, keyword analysis, and improvement tips.
            <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>· costs 1 credit per check</span>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24, maxWidth: result ? "100%" : 860, margin: result ? "0" : "0 auto" }}>

          {/* LEFT: Input Card */}
          <div>
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 20, padding: 24, marginBottom: 20,
            }}>
              {/* DROP ZONE or preloaded resume */}
              {preloadedResumeName ? (
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  background: "var(--violet-dim)", border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: 12, marginBottom: 20,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: "rgba(124,58,237,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i className="fas fa-file-lines" style={{ color: "var(--violet3)", fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{preloadedResumeName}</div>
                    <div style={{ fontSize: 11, color: "var(--violet3)" }}>Loaded from your saved resume</div>
                  </div>
                  <button onClick={() => { setPreloadedResumeName(null); setFileText(""); }}
                    style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, padding: "4px 8px" }}>
                    <i className="fas fa-times" /> Remove
                  </button>
                </div>
              ) : !file ? (
                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                  style={{
                    border: `2px dashed ${dragOver ? "var(--violet3)" : "rgba(255,255,255,0.1)"}`,
                    borderRadius: 16, padding: "40px 20px", textAlign: "center",
                    background: dragOver ? "var(--violet-dim)" : "transparent",
                    transition: "all 0.2s", cursor: "pointer", marginBottom: 20,
                  }}
                  onClick={() => fileRef.current?.click()}
                >
                  <div style={{ fontSize: 36, color: "var(--violet3)", marginBottom: 12 }}>
                    <i className="fas fa-file-arrow-up" />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Drop your resume here</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16 }}>PDF, DOC, DOCX or TXT — up to 5MB</div>
                  <RainbowButton size="sm" variant="primary" onClick={e => { e.stopPropagation(); fileRef.current?.click(); }}>
                    <i className="fas fa-folder-open" /> Browse Files
                  </RainbowButton>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: "none" }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </div>
              ) : (
                <div style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  background: "var(--violet-dim)", border: "1px solid rgba(124,58,237,0.3)",
                  borderRadius: 12, marginBottom: 20,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: "rgba(248,113,113,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <i className="fas fa-file-pdf" style={{ color: "#f87171", fontSize: 18 }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{file.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{(file.size / 1024).toFixed(1)} KB</div>
                  </div>
                  <button onClick={() => { setFile(null); setFileText(""); }}
                    style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13, padding: "4px 8px" }}>
                    <i className="fas fa-times" /> Remove
                  </button>
                </div>
              )}

              {/* ROLE */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Target Job Role
                </label>
                <input
                  className="form-input"
                  placeholder="e.g. Software Engineer, Product Manager, Data Analyst..."
                  value={role}
                  onChange={e => setRole(e.target.value)}
                />
              </div>

              {/* CHIPS */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {["💻 Software Engineer", "📊 Data Analyst", "🎯 Product Manager", "🎨 UI/UX Designer", "📣 Marketing Manager", "📈 Business Analyst"].map(r => (
                  <button key={r} onClick={() => setRole(r.slice(3))}
                    style={{
                      padding: "6px 14px", borderRadius: 20, border: "1px solid var(--border2)",
                      background: "transparent", color: "var(--muted)", fontSize: 11, fontWeight: 600,
                      cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; e.currentTarget.style.color = "var(--violet3)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(124,58,237,0.2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* ANALYZE BUTTON */}
              <RainbowButton
                variant="primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px" }}
                onClick={runAnalysis}
                disabled={analyzing}
              >
                {analyzing
                  ? <><i className="fas fa-spinner fa-spin" /> Analyzing your resume...</>
                  : <><i className="fas fa-magnifying-glass-chart" /> Analyze My Resume</>
                }
              </RainbowButton>
            </div>
          </div>



          {analyzing && (
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300,
            }}>
              <div style={{ textAlign: "center", color: "var(--violet3)" }}>
                <i className="fas fa-wand-magic-sparkles" style={{ fontSize: 32, marginBottom: 16, display: "block" }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
                  Running expert ATS analysis...
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  Analyzing keywords, experience, education & more...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RESULTS ── */}
        {result && (
          <div style={{ marginTop: 24 }}>

            {/* SCORE HERO */}
            <div style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 20, padding: 32, marginBottom: 20,
              display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap",
            }}>
              <div style={{ position: "relative", width: 145, height: 145, flexShrink: 0 }}>
                <svg viewBox="0 0 145 145" width={145} height={145}>
                  <circle cx="72.5" cy="72.5" r="60" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                  <circle
                    cx="72.5" cy="72.5" r="60" fill="none"
                    stroke={scoreColor} strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 8px ${scoreColor})` }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: scoreColor, fontFamily: "Outfit,sans-serif" }}>{scoreAnimated}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>/100</div>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 20,
                  background: `color-mix(in srgb, ${scoreColor} 15%, transparent)`,
                  color: scoreColor, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
                  textTransform: "uppercase", marginBottom: 10,
                }}>
                  {result.score_grade} {result.will_pass_ats ? "✓ Will Pass ATS" : "✗ May Not Pass ATS"}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", fontFamily: "Outfit,sans-serif", marginBottom: 8 }}>
                  ATS Score for <span style={{ color: "var(--violet3)" }}>{result.target_role}</span>
                </h2>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, maxWidth: 600 }}>{result.recruiter_verdict}</p>
                <div style={{ marginTop: 12 }}>
                  <button onClick={() => { setResult(null); setFile(null); setFileText(""); }}
                    style={{
                      background: "rgba(255,255,255,0.05)", border: "1px solid var(--border2)",
                      color: "var(--muted)", padding: "7px 14px", borderRadius: 10, cursor: "pointer",
                      fontSize: 11, fontFamily: "inherit", transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--muted)"; }}
                  >
                    <i className="fas fa-rotate" /> Check Another
                  </button>
                </div>
              </div>
            </div>

            {/* 7-PARAM BREAKDOWN */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
                <i className="fas fa-chart-bar" /> Score Breakdown (7 Parameters)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 14 }}>
                {Object.entries(result.score_breakdown).map(([key, param]) => {
                  const labels: Record<string, string> = {
                    keyword_skills_match: "🔑 Keyword & Skills Match",
                    job_title_relevance: "💼 Job Title Relevance",
                    experience_match: "📅 Experience Match",
                    education_match: "🎓 Education Match",
                    achievements_impact: "🏆 Achievements & Impact",
                    formatting_readability: "📄 Formatting & Readability",
                    certifications_extras: "🏅 Certifications & Extras",
                  };
                  const p = param as ScoreParam;
                  const c = p.score >= 75 ? "#4ade80" : p.score >= 50 ? "#fbbf24" : "#f87171";
                  return (
                    <div key={key} style={{ padding: "14px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)" }}>{labels[key] || key}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 10, color: "var(--muted)" }}>{p.weight}</span>
                          <span style={{ fontSize: 14, fontWeight: 700, color: c }}>{p.score}</span>
                        </div>
                      </div>
                      <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, marginBottom: 8, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p.score}%`, background: c, borderRadius: 3, transition: "width 0.8s ease" }} />
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.5 }}>{p.comment}</div>
                      {p.years_found !== undefined && (
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>
                          Found: {p.years_found} yrs · Typically required: {p.years_typically_required} yrs
                        </div>
                      )}
                      {p.candidate_title && (
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Current title: {p.candidate_title}</div>
                      )}
                      {p.education_found && (
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{p.education_found}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* KEYWORDS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              {/* Keywords Found */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="fas fa-circle-check" /> Keywords Found ({result.score_breakdown.keyword_skills_match.matched_keywords?.length ?? 0})
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(result.score_breakdown.keyword_skills_match.matched_keywords ?? []).slice(0, 20).map(kw => (
                    <span key={kw} style={{ padding: "3px 10px", borderRadius: 20, background: "var(--green-dim)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.3)", fontSize: 11 }}>{kw}</span>
                  ))}
                </div>
              </div>

              {/* Keywords Missing */}
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--danger)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="fas fa-circle-xmark" /> Keywords to Add ({result.missing_keywords_to_add.length})
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {result.missing_keywords_to_add.slice(0, 20).map(kw => (
                    <span key={kw} style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(248,113,113,0.1)", color: "var(--danger)", border: "1px solid rgba(248,113,113,0.3)", fontSize: 11 }}>{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* STRENGTHS + GAPS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4ade80", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="fas fa-trophy" /> Top Strengths
                </div>
                {result.top_strengths.map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, color: "#4ade80", fontWeight: 700 }}>{i + 1}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{s}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--warning)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <i className="fas fa-triangle-exclamation" /> Critical Gaps
                </div>
                {result.critical_gaps.map((g, i) => (
                  <div key={i} style={{ marginBottom: 10, paddingLeft: 12, borderLeft: "2px solid rgba(251,191,36,0.4)" }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>{g}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRIORITY IMPROVEMENTS */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <i className="fas fa-lightbulb" /> Priority Improvements
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12 }}>
                {result.priority_improvements.map((item, i) => {
                  const pc = priorityColor(item.priority);
                  return (
                    <div key={i} style={{
                      padding: "14px", background: "rgba(255,255,255,0.02)", borderRadius: 10,
                      border: `1px solid color-mix(in srgb, ${pc} 20%, transparent)`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{
                          padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                          background: `color-mix(in srgb, ${pc} 15%, transparent)`,
                          color: pc, letterSpacing: "0.05em",
                        }}>{item.priority}</span>
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{item.action}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>Impact: {item.impact}</div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
