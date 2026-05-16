"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendEmailLink, completeEmailSignIn, checkIsEmailLink } from "@/lib/firebase";
import { useAuth } from "@/lib/useDevUser";
import GlobalLoader from "@/components/ui/GlobalLoader";

function SignInContent() { 
  const router = useRouter();
  const { user, loading } = useAuth();
  const [step, setStep] = useState<"email" | "sent" | "confirming">("email");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already signed in
  useEffect(() => {
    if (!loading && user) window.location.href = "/dashboard";
  }, [user, loading]);

  // Handle magic link return
  useEffect(() => {
    if (typeof window === "undefined") return;
    const href = window.location.href;
    if (!checkIsEmailLink(href)) return;

    // User landed back after clicking the email link
    const savedEmail = window.localStorage.getItem("emailForSignIn") || "";
    if (savedEmail) {
      setStep("confirming");
      setEmail(savedEmail);
      completeEmailSignIn(savedEmail, href)
        .then(() => { window.location.href = "/dashboard"; })
        .catch((e) => { setError(e.message || "Sign-in failed"); setStep("email"); });
    } else {
      // Email not in storage — ask user to enter it manually
      setStep("confirming");
    }
  }, [router]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Enter your email address"); return; }
    setError("");
    setSending(true);
    try {
      await sendEmailLink(email.trim());
      setStep("sent");
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to send link. Check your email.");
    } finally {
      setSending(false);
    }
  };

  const handleManualConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await completeEmailSignIn(email.trim(), window.location.href);
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError((err as Error).message || "Verification failed. Try again.");
    } finally {
      setSending(false);
    }
  };

  if (loading || (user && !error)) return <GlobalLoader />;

  return (
    <div style={{
      minHeight: "100vh", background: "#03030a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "20%", left: "30%", width: 500, height: 500, background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "block", textAlign: "center", marginBottom: 36, textDecoration: "none" }}>
          <span style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 24, letterSpacing: "0.08em", color: "#fff" }}>
            RESUM<span style={{ color: "#a78bfa" }}>IFY</span>
          </span>
        </Link>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, padding: "36px 32px", backdropFilter: "blur(12px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
        }}>
          {/* ── STEP: EMAIL FORM ── */}
          {step === "email" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>✉️</div>
                <h1 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 6 }}>
                  Sign in to Resumify
                </h1>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                  Enter your email — we&apos;ll send you a magic link.<br />No password needed. It&apos;s free.
                </p>
              </div>

              <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    autoFocus
                    required
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 14,
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                      color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                </div>

                {error && (
                  <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, fontSize: 12, color: "#f87171" }}>
                    <i className="fas fa-exclamation-circle" style={{ marginRight: 6 }} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: "13px 20px", borderRadius: 12, border: "none",
                    background: sending ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "#fff", fontSize: 14, fontWeight: 700, cursor: sending ? "not-allowed" : "pointer",
                    fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.02em",
                    boxShadow: sending ? "none" : "0 4px 20px rgba(124,58,237,0.4)",
                  }}
                >
                  {sending
                    ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }} />Sending link...</>
                    : <><i className="fas fa-paper-plane" style={{ marginRight: 8 }} />Send Magic Link</>
                  }
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                <i className="fas fa-shield-halved" style={{ marginRight: 6, color: "rgba(124,58,237,0.5)" }} />
                Powered by Firebase Authentication · Completely free · No spam
              </div>
            </>
          )}

          {/* ── STEP: LINK SENT ── */}
          {step === "sent" && (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%", margin: "0 auto 20px",
                background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <i className="fas fa-envelope-open-text" style={{ fontSize: 28, color: "#22c55e" }} />
              </div>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", marginBottom: 10 }}>
                Check your inbox!
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 4 }}>
                We sent a magic link to
              </p>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#a78bfa", marginBottom: 20 }}>{email}</div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.7, marginBottom: 28 }}>
                Click the link in the email to sign in instantly.<br />
                No password needed — the link expires in 1 hour.<br />
                Check your spam folder if you don&apos;t see it.
              </p>

              {/* Steps visual */}
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 28 }}>
                {["Open email", "Click the link", "You're in! 🎉"].map((label, i) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", margin: "0 auto 6px",
                      background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: "#a78bfa",
                    }}>{i + 1}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{label}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep("email")}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontSize: 12, cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
              >
                Use a different email
              </button>
            </div>
          )}

          {/* ── STEP: CONFIRMING (link clicked, need email) ── */}
          {step === "confirming" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>🔐</div>
              <h2 style={{ fontFamily: "Outfit,sans-serif", fontWeight: 900, fontSize: 20, color: "#fff", marginBottom: 8 }}>
                Confirm your email
              </h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
                For security, confirm the email you used to request the link.
              </p>
              <form onSubmit={handleManualConfirm} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoFocus
                  required
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12, fontSize: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  }}
                />
                {error && <div style={{ fontSize: 12, color: "#f87171" }}>{error}</div>}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: "12px", borderRadius: 12, border: "none",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {sending ? "Verifying..." : "Confirm & Sign In"}
                </button>
              </form>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          By signing in, you agree to our{" "}
          <a href="#" style={{ color: "rgba(167,139,250,0.5)", textDecoration: "none" }}>Terms</a>
          {" "}and{" "}
          <a href="#" style={{ color: "rgba(167,139,250,0.5)", textDecoration: "none" }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <SignInContent />
    </Suspense>
  );
}
