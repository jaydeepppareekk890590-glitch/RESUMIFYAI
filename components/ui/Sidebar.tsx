"use client";
import { useDevUser } from "@/lib/useDevUser";
import { signOut, auth, onAuthStateChanged, getUserCredits } from "@/lib/firebase";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/dashboard",  icon: "fas fa-grid-2",              label: "Dashboard" },
  { href: "/builder",    icon: "fas fa-wand-magic-sparkles",  label: "AI Builder" },
  { href: "/manual",     icon: "fas fa-pen-to-square",        label: "Manual Builder" },
  { href: "/analyzer",   icon: "fas fa-chart-line",           label: "ATS Checker" },
  { href: "/portfolio",  icon: "fas fa-globe",                label: "Portfolio Builder" },
];

const accountItems = [
  { href: "/pricing",  icon: "fas fa-rocket",  label: "Upgrade Plan" },
  { href: "/settings", icon: "fas fa-gear",    label: "Settings" },
];

export default function Sidebar() {
  const { user } = useDevUser();
  const pathname = usePathname();
  const router = useRouter();
  const [planInfo, setPlanInfo] = useState<{ credits: number; plan: string } | null>(null);

  // Set session cookie when Firebase user is present so middleware allows access
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        document.cookie = "fb_session=1; path=/; max-age=86400; SameSite=Lax";
        try {
          const c = await getUserCredits(u.uid);
          setPlanInfo(c);
        } catch {}
      } else {
        document.cookie = "fb_session=; path=/; max-age=0";
      }
    });
    return unsub;
  }, []);

  const handleSignOut = async () => {
    await signOut();
    document.cookie = "fb_session=; path=/; max-age=0";
    router.push("/sign-in");
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "?";

  const planColor = (plan: string) => {
    if (plan === "pro") return "#a78bfa";
    if (plan === "elite") return "#38bdf8";
    if (plan === "lifetime") return "#fbbf24";
    return "var(--muted)";
  };

  const planBg = (plan: string) => {
    if (plan === "pro") return "rgba(124,58,237,0.12)";
    if (plan === "elite") return "rgba(14,165,233,0.12)";
    if (plan === "lifetime") return "rgba(245,158,11,0.12)";
    return "rgba(255,255,255,0.04)";
  };

  return (
    <aside className="sidebar">
      <Link href="/" className="sidebar-logo">
        RESUM<span>IFY</span>
      </Link>

      <div className="sidebar-section">Main</div>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname.startsWith(item.href) ? "active" : ""}`}
        >
          <i className={item.icon} style={{ width: 16, textAlign: "center" }} />
          {item.label}
        </Link>
      ))}

      <div className="sidebar-section" style={{ marginTop: 16 }}>Account</div>
      {accountItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`nav-item ${pathname === item.href ? "active" : ""} ${item.href === "/pricing" ? "nav-upgrade" : ""}`}
          style={item.href === "/pricing" ? {
            background: "rgba(124,58,237,0.08)",
            color: "var(--violet3)",
            borderLeft: "2px solid rgba(124,58,237,0.4)",
          } : {}}
        >
          <i className={item.icon} style={{ width: 16, textAlign: "center" }} />
          {item.label}
          {item.href === "/pricing" && (
            <span style={{
              marginLeft: "auto", fontSize: 8, fontWeight: 800, letterSpacing: "0.08em",
              padding: "2px 6px", borderRadius: 6,
              background: "rgba(124,58,237,0.2)", color: "var(--violet3)",
            }}>PRO</span>
          )}
        </Link>
      ))}

      <div className="sidebar-bottom">
        {/* Credits & Plan badge */}
        {planInfo && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 12px", borderRadius: 10, marginBottom: 10,
            background: planBg(planInfo.plan), border: `1px solid color-mix(in srgb, ${planColor(planInfo.plan)} 25%, transparent)`,
          }}>
            <div>
              <div style={{ fontSize: 9, color: planColor(planInfo.plan), fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {planInfo.plan} plan
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                {planInfo.credits === 99999 ? "∞" : planInfo.credits} credits left
              </div>
            </div>
            {(planInfo.plan === "free" || planInfo.plan === "pro") && (
              <Link href="/pricing" style={{
                fontSize: 9, fontWeight: 700, color: "var(--violet3)",
                textDecoration: "none", padding: "3px 8px", borderRadius: 8,
                background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)",
              }}>
                ↑ Up
              </Link>
            )}
          </div>
        )}

        <div className="user-info">
          <div className="user-avatar">
            {user?.imageUrl ? (
              <Image src={user.imageUrl} alt="avatar" width={34} height={34} style={{ borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              initials
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="user-name">{user?.fullName || user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] || "User"}</div>
            <div className="user-email">{user?.emailAddresses?.[0]?.emailAddress || "Not signed in"}</div>
          </div>
        </div>

        <button
          className="btn-rainbow btn-ghost btn-sm w-full"
          style={{ justifyContent: "center", marginTop: 4 }}
          onClick={handleSignOut}
        >
          <i className="fas fa-right-from-bracket" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
