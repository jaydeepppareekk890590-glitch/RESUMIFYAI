"use client";
import { useDevUser } from "@/lib/useDevUser";
import { signOut } from "@/lib/firebase";
import Sidebar from "@/components/ui/Sidebar";
import RainbowButton from "@/components/ui/RainbowButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user } = useDevUser();
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    document.cookie = "fb_session=; path=/; max-age=0";
    router.push("/sign-in");
  };
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const showToast = (msg: string, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      {toast && <div className="toast-container"><div className={`toast ${toast.type}`}>{toast.msg}</div></div>}
      <main className="main-content" style={{ maxWidth: 720 }}>
        <h1 style={{ fontFamily: "Outfit,sans-serif", fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
          <span style={{ color: "var(--violet3)" }}>SETTINGS</span>
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 28 }}>Manage your account and preferences.</p>

        {/* PROFILE */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="fas fa-user" /> Profile
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "var(--violet-dim)", border: "2px solid rgba(124,58,237,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 700, color: "var(--violet3)", overflow: "hidden",
            }}>
              {user?.imageUrl ? <img src={user.imageUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (user?.fullName?.[0] || "?")}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{user?.fullName || "User"}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{user?.emailAddresses?.[0]?.emailAddress}</div>
            </div>
          </div>
          <div style={{ padding: "12px 16px", background: "var(--violet-dim)", borderRadius: 10, border: "1px solid rgba(124,58,237,0.2)", fontSize: 13, color: "var(--muted)" }}>
            <i className="fas fa-info-circle" style={{ color: "var(--violet3)", marginRight: 8 }} />
            To update your name, email, or profile photo, visit your{" "}
            <a href="https://accounts.resumifyai.com/user" target="_blank" rel="noreferrer" style={{ color: "var(--violet3)", textDecoration: "none" }}>
              Clerk account page
            </a>
            .
          </div>
        </div>

        {/* AUTHENTICATION */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="fas fa-shield-halved" /> Authentication
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Authentication Provider</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Managed by Clerk</div>
              </div>
              <span style={{ padding: "4px 10px", borderRadius: 20, background: "var(--green-dim)", color: "var(--green)", fontSize: 11, fontWeight: 700, border: "1px solid rgba(34,197,94,0.3)" }}>Active</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Connected Accounts</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  Email (dev bypass)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PLAN */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--violet3)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="fas fa-bolt" /> Current Plan
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", fontFamily: "Outfit,sans-serif" }}>FREE PLAN</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>6 AI credits included</div>
            </div>
            <RainbowButton variant="primary" onClick={() => showToast("Upgrade coming soon!", "success")}>
              <i className="fas fa-rocket" /> Upgrade to Pro
            </RainbowButton>
          </div>
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {["AI Resume Generator","ATS Checker","Portfolio Builder","PDF Download","Cloud Save"].map(f => (
              <div key={f} style={{ padding: "8px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, fontWeight: 500, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <i className="fas fa-check" style={{ color: "var(--green)", fontSize: 10 }} /> {f}
              </div>
            ))}
          </div>
        </div>

        {/* DANGER ZONE */}
        <div style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--danger)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="fas fa-triangle-exclamation" /> Danger Zone
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Sign Out</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Sign out from all devices</div>
            </div>
            <RainbowButton variant="danger" size="sm" onClick={() => signOut()}>
              <i className="fas fa-right-from-bracket" /> Sign Out
            </RainbowButton>
          </div>
        </div>
      </main>
    </div>
  );
}
