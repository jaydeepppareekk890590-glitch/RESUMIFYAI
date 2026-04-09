"use client";
import { useState } from "react";
import { useDevUser } from "@/lib/useDevUser";
import { updateUserPlan } from "@/lib/firebase";
import Link from "next/link";
import Sidebar from "@/components/ui/Sidebar";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "/ forever",
    badge: null,
    gradient: null,
    btnClass: "btn-ghost",
    btnLabel: "Current Plan",
    disabled: true,
    payLink: null,
    features: [
      { text: "5 lifetime AI credits", ok: true },
      { text: "All 40 resume templates", ok: true },
      { text: "Manual builder (always free)", ok: true },
      { text: "Up to 2 resumes", ok: true },
      { text: "1 portfolio", ok: true },
      { text: "Resumify watermark", ok: false },
      { text: "No HTML download", ok: false },
      { text: "3D portfolio templates locked", ok: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹199",
    period: "/ month",
    badge: "MOST POPULAR",
    gradient: "linear-gradient(135deg,#7c3aed,#4f46e5)",
    btnClass: "btn-primary",
    btnLabel: "Upgrade to Pro",
    disabled: false,
    payLink: "https://rzp.io/rzp/IiDrr1M",
    features: [
      { text: "50 AI credits / month", ok: true },
      { text: "Unlimited resumes & portfolios", ok: true },
      { text: "No watermark", ok: true },
      { text: "HTML download", ok: true },
      { text: "All portfolio templates", ok: true },
      { text: "ATS history tracking", ok: true },
      { text: "Cover letter generator", ok: true },
      { text: "3D portfolio templates locked", ok: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "₹499",
    period: "/ month",
    badge: null,
    gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)",
    btnClass: "btn-elite",
    btnLabel: "Upgrade to Elite",
    disabled: false,
    payLink: "https://rzp.io/rzp/chbWSluM",
    features: [
      { text: "Unlimited AI credits", ok: true },
      { text: "All 3D portfolio templates", ok: true },
      { text: "Priority AI generation", ok: true },
      { text: "Portfolio analytics", ok: true },
      { text: "Custom portfolio domain", ok: true },
      { text: "LinkedIn import", ok: true },
      { text: "Cover letter generator", ok: true },
      { text: "Founding Member badge", ok: true },
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: "₹2,999",
    period: "one-time",
    badge: "BEST VALUE",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444)",
    btnClass: "btn-lifetime",
    btnLabel: "Get Lifetime Access",
    disabled: false,
    payLink: "https://rzp.io/rzp/sVpIeY3E",
    features: [
      { text: "Everything in Elite forever", ok: true },
      { text: "Early template access", ok: true },
      { text: "Founding Member badge", ok: true },
      { text: "One-time payment", ok: true },
      { text: "All future updates free", ok: true },
    ],
  },
];

export default function PricingPage() {
  const { user } = useDevUser();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [activating, setActivating] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);

  const showToast = (msg: string, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpgrade = (plan: typeof PLANS[0]) => {
    if (!plan.payLink || plan.disabled) return;
    const uid = user?.id || "";
    const email = user?.emailAddresses?.[0]?.emailAddress || "";
    const url = `${plan.payLink}?uid=${encodeURIComponent(uid)}&email=${encodeURIComponent(email)}`;
    window.open(url, "_blank");
    // Show verify banner after a short delay
    setTimeout(() => showToast("Complete payment, then click 'Verify & Activate' below ↓", "success"), 1500);
  };

  const handleVerify = async (planId: string) => {
    if (!user?.id) { showToast("Please sign in first", "error"); return; }
    setActivating(planId);
    try {
      await updateUserPlan(user.id, planId);
      showToast(`🎉 ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan activated! Refresh to see changes.`);
    } catch {
      showToast("Activation failed — contact support", "error");
    } finally {
      setActivating(null);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      <main className="main-content" style={{ maxWidth: "none" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 18px",
            borderRadius: 24, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
            fontSize: 11, letterSpacing: "0.14em", color: "var(--violet3)", fontWeight: 600,
            textTransform: "uppercase", marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.6)" }} />
            Simple, transparent pricing
          </div>
          <h1 style={{
            fontFamily: "Outfit,sans-serif", fontSize: "clamp(32px,5vw,56px)",
            fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14,
          }}>
            UNLOCK THE FULL{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              RESUMIFY
            </span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Trusted by 10,000+ job seekers. Every plan unlocks powerful features to get you hired faster.
          </p>
          <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
            ⚡ Manual Builder is <strong style={{ color: "var(--green)" }}>always free</strong> — no plan required
          </div>
        </div>

        {/* PLANS GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20, maxWidth: 1100, margin: "0 auto 48px",
        }}>
          {PLANS.map((plan) => {
            const isHovered = hoveredPlan === plan.id;
            const isFeatured = plan.badge === "MOST POPULAR";
            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  background: isFeatured ? "rgba(124,58,237,0.07)" : "var(--surface)",
                  border: `1px solid ${isFeatured ? "rgba(124,58,237,0.5)" : isHovered ? "rgba(124,58,237,0.3)" : "var(--border)"}`,
                  borderRadius: 20, padding: "28px 24px", position: "relative",
                  display: "flex", flexDirection: "column", gap: 20,
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateY(-6px)" : "none",
                  boxShadow: isHovered
                    ? isFeatured ? "0 20px 60px rgba(124,58,237,0.25)" : "0 20px 40px rgba(0,0,0,0.4)"
                    : isFeatured ? "0 8px 30px rgba(124,58,237,0.15)" : "none",
                }}
              >
                {/* Gradient top bar */}
                {plan.gradient && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: plan.gradient, borderRadius: "20px 20px 0 0",
                  }} />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: plan.gradient || "var(--violet)",
                    color: "#fff", fontSize: 9, fontWeight: 800, padding: "4px 14px",
                    borderRadius: 12, whiteSpace: "nowrap", letterSpacing: "0.1em",
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Name & Price */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                    {plan.name}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "Outfit,sans-serif" }}>{plan.price}</span>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, flex: 1 }}>
                  {plan.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: f.ok ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)" }}>
                      <span style={{ color: f.ok ? "#4ade80" : "rgba(255,255,255,0.15)", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                        {f.ok ? "✓" : "✗"}
                      </span>
                      {f.text}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  disabled={plan.disabled}
                  onClick={() => handleUpgrade(plan)}
                  style={{
                    width: "100%", padding: "13px", borderRadius: 12, fontSize: 13, fontWeight: 700,
                    cursor: plan.disabled ? "default" : "pointer",
                    border: "none", fontFamily: "inherit", letterSpacing: "0.02em",
                    background: plan.disabled ? "rgba(255,255,255,0.05)" : plan.gradient || "rgba(255,255,255,0.08)",
                    color: plan.disabled ? "rgba(255,255,255,0.3)" : "#fff",
                    transition: "all 0.2s", transform: !plan.disabled && isHovered ? "scale(1.02)" : "none",
                    boxShadow: !plan.disabled && isHovered ? `0 0 20px rgba(124,58,237,0.4)` : "none",
                  }}
                >
                  {plan.disabled ? "Current Plan" : plan.btnLabel}
                </button>

                {/* Verify button (shown after clicking upgrade) */}
                {!plan.disabled && (
                  <button
                    onClick={() => handleVerify(plan.id)}
                    disabled={activating === plan.id}
                    style={{
                      width: "100%", padding: "9px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                      cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)",
                      background: "transparent", color: "var(--muted)", fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.color = "var(--violet3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "var(--muted)"; }}
                  >
                    {activating === plan.id
                      ? <><i className="fas fa-spinner fa-spin" /> Activating...</>
                      : <><i className="fas fa-circle-check" /> Verify & Activate</>
                    }
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* USD Note */}
        <div style={{
          textAlign: "center", padding: "16px 24px", background: "rgba(124,58,237,0.05)",
          border: "1px solid rgba(124,58,237,0.15)", borderRadius: 14,
          fontSize: 12, color: "var(--muted)", maxWidth: 600, margin: "0 auto 32px",
        }}>
          <i className="fas fa-globe" style={{ color: "var(--violet3)", marginRight: 8 }} />
          Payments secured by Razorpay · USD payments coming soon · Cancel anytime
          <br /><span style={{ opacity: 0.6 }}>Questions? resumify@gmail.com</span>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>
            FREQUENTLY ASKED
          </div>
          {[
            { q: "Is the manual builder really free forever?", a: "Yes! You can use the manual resume builder with all 40 templates, fill your details, and download — completely free, forever, no credits required." },
            { q: "What counts as 1 credit?", a: "Each AI operation uses 1 credit: AI resume generation, AI portfolio generation, ATS checker scan, and dashboard quick ATS check all cost 1 credit each." },
            { q: "How do I activate after payment?", a: "After completing payment on Razorpay, come back and click 'Verify & Activate' on your plan card. Your plan upgrades instantly in our database." },
            { q: "Can I cancel anytime?", a: "Yes, Pro and Elite are monthly — cancel any time from your Razorpay dashboard. Lifetime is a one-time payment with no recurring charges." },
          ].map((faq, i) => (
            <div key={i} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 14, padding: "18px 20px", marginBottom: 10,
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/dashboard" style={{ fontSize: 12, color: "var(--violet3)", textDecoration: "none", fontWeight: 600 }}>
            <i className="fas fa-arrow-left" /> Back to Dashboard
          </Link>
        </div>
      </main>

      <style>{`
        .btn-elite {
          background: linear-gradient(135deg,#0ea5e9,#6366f1);
        }
        .btn-lifetime {
          background: linear-gradient(135deg,#f59e0b,#ef4444);
        }
      `}</style>
    </div>
  );
}
