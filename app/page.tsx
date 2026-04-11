"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const FogIntro = dynamic(() => import("@/components/ui/FogIntro"), { ssr: false });

/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════════════════ */
function ParticleMesh({ mx, my }: { mx: number; my: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mRef = useRef({ x: mx, y: my });
  useEffect(() => { mRef.current = { x: mx, y: my }; }, [mx, my]);
  useEffect(() => {
    const c = ref.current!; const ctx = c.getContext("2d")!; let raf = 0;
    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const N = 80;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      r: .7 + Math.random() * 1.4, h: [258, 248, 192][Math.floor(Math.random() * 3)],
      ph: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    const draw = () => {
      t += .004; ctx.clearRect(0, 0, c.width, c.height);
      const { x: ox, y: oy } = mRef.current;
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
        if (d < 110) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(139,92,246,${.055 * (1 - d / 110)})`; ctx.lineWidth = .3; ctx.stroke(); }
      }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
        const dx = p.x - ox, dy = p.y - oy, d = Math.hypot(dx, dy);
        if (d < 120) { p.vx += dx / d * .022; p.vy += dy / d * .022; }
        p.vx *= .984; p.vy *= .984;
        const a = .18 + .22 * Math.sin(t * 1.6 + p.ph);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},70%,70%,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL — spring-physics entrance
═══════════════════════════════════════════════════════ */
type RevealFrom = "bottom" | "left" | "right" | "scale" | "top";
function Reveal({ children, delay = 0, from = "bottom" as RevealFrom, style = {} }: {
  children: React.ReactNode; delay?: number; from?: RevealFrom; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.05 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const tx = { bottom: "translateY(52px)", top: "translateY(-52px)", left: "translateX(-52px)", right: "translateX(52px)", scale: "scale(0.92) translateY(24px)" }[from];
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : tx, transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════════════════════ */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0); const [txt, setTxt] = useState(""); const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    if (!del && txt === w) { const t = setTimeout(() => setDel(true), 2200); return () => clearTimeout(t); }
    if (del && txt === "") { setDel(false); setIdx(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1)), del ? 30 : 68);
    return () => clearTimeout(t);
  }, [txt, del, idx, words]);
  return (
    <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {txt}<span style={{ borderRight: "3px solid #a78bfa", marginLeft: 2, animation: "blink 1s step-end infinite", display: "inline-block", verticalAlign: "text-bottom" }} />
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNT-UP
═══════════════════════════════════════════════════════ */
function Count({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0); const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: .3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!go) return;
    let cur = 0; const step = Math.ceil(end / 60);
    const iv = setInterval(() => { cur = Math.min(cur + step, end); setN(cur); if (cur >= end) clearInterval(iv); }, 20);
    return () => clearInterval(iv);
  }, [go, end]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════
   LIVE ATS WIDGET
═══════════════════════════════════════════════════════ */
function ATSWidget() {
  const [score, setScore] = useState(0); const [kw, setKw] = useState(0);
  const keys = ["React.js", "TypeScript", "Node.js", "REST APIs", "Agile", "CI/CD"];
  useEffect(() => {
    const t = setTimeout(() => { let s = 0; const iv = setInterval(() => { s++; setScore(s); if (s >= 94) clearInterval(iv); }, 15); }, 600);
    const ki = setInterval(() => setKw(k => (k + 1) % keys.length), 1600);
    return () => { clearTimeout(t); clearInterval(ki); };
  }, []);
  const R = 50, C = 2 * Math.PI * R, dash = (score / 100) * C;
  return (
    <div style={{ background: "rgba(6,4,18,0.96)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 22, padding: "24px 26px", backdropFilter: "blur(28px)", width: 256, boxShadow: "0 0 60px rgba(124,58,237,0.1),0 40px 80px rgba(0,0,0,0.85)" }}>
      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", letterSpacing: ".15em", marginBottom: 16, textTransform: "uppercase", fontWeight: 700 }}>Live ATS Score</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width={114} height={114} viewBox="0 0 114 114">
          <defs>
            <linearGradient id="rg"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
            <filter id="rgl"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <circle cx={57} cy={57} r={R} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={8} />
          <circle cx={57} cy={57} r={R} fill="none" stroke="url(#rg)" strokeWidth={8} strokeDasharray={`${dash} ${C}`} strokeLinecap="round" transform="rotate(-90 57 57)" filter="url(#rgl)" style={{ transition: "stroke-dasharray .02s linear" }} />
          <text x={57} y={53} textAnchor="middle" fill="#fff" fontSize={26} fontWeight={900} fontFamily="Outfit,sans-serif">{score}</text>
          <text x={57} y={68} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={9.5}>/100</text>
          <text x={57} y={82} textAnchor="middle" fontSize={8} fill="#22c55e" fontFamily="Outfit,sans-serif" fontWeight={700}>EXCELLENT</text>
        </svg>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.28)", marginBottom: 10 }}>Keywords matched:</div>
          {keys.slice(0, 5).map((k, i) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5.5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: i <= kw ? "#22c55e" : "rgba(255,255,255,0.07)", transition: "all .3s", boxShadow: i <= kw ? "0 0 6px #22c55e" : "none", display: "inline-block" }} />
              <span style={{ fontSize: 10.5, color: i <= kw ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)", transition: "color .3s" }}>{k}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 14, padding: "8px 12px", background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.14)", borderRadius: 9, fontSize: 10.5, color: "#22c55e", display: "flex", gap: 6, alignItems: "center", fontWeight: 700 }}>
        <span>✓</span> Strong match — Apply with confidence
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED FLOW DIAGRAM
═══════════════════════════════════════════════════════ */
function FlowDiagram() {
  const [active, setActive] = useState(-1); const [prog, setProg] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let p = 0; const iv = setInterval(() => { p += 2; setProg(Math.min(p, 100)); if (p >= 100) clearInterval(iv); }, 18);
        [0, 1, 2, 3, 4].forEach(i => setTimeout(() => setActive(i), 200 + i * 450));
        obs.disconnect();
      }
    }, { threshold: .2 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const nodes = [
    { label: "Describe", sub: "Plain English", icon: "👤", color: "#a78bfa", cx: 80, cy: 130 },
    { label: "AI Writes", sub: "In seconds", icon: "✨", color: "#7c3aed", cx: 240, cy: 50 },
    { label: "Resume", sub: "ATS-ready", icon: "📄", color: "#06b6d4", cx: 400, cy: 130 },
    { label: "ATS Score", sub: "Live feedback", icon: "🎯", color: "#22c55e", cx: 560, cy: 50 },
    { label: "Interview", sub: "You get hired", icon: "🚀", color: "#fbbf24", cx: 720, cy: 130 },
  ];
  const path = "M80,130 C160,130 160,50 240,50 C320,50 320,130 400,130 C480,130 480,50 560,50 C640,50 640,130 720,130";
  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 820, margin: "0 auto" }}>
      <svg viewBox="0 0 800 210" style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="flowGrad"><stop offset="0%" stopColor="#7c3aed" /><stop offset="50%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#fbbf24" /></linearGradient>
          <filter id="glow3"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <clipPath id="progClip"><rect x={0} y={-30} width={`${prog * 8}`} height={210} /></clipPath>
        </defs>
        <path d={path} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={1.5} />
        <g clipPath="url(#progClip)">
          <path d={path} fill="none" stroke="url(#flowGrad)" strokeWidth={2.5} filter="url(#glow3)" opacity={.9} />
        </g>
        {prog > 8 && <circle r={4.5} fill="#fff" opacity={.95} filter="url(#glow3)"><animateMotion dur="2.6s" repeatCount="indefinite" path={path} /></circle>}
        {nodes.map((n, i) => (
          <g key={n.label}>
            {active >= i && (
              <circle cx={n.cx} cy={n.cy} r={32} fill="none" stroke={n.color} strokeWidth={.7} opacity={.22}>
                <animate attributeName="r" values="32;48;32" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values=".22;0;.22" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={n.cx} cy={n.cy} r={23} fill={active >= i ? `${n.color}18` : "rgba(9,6,24,.95)"} stroke={active >= i ? n.color : "rgba(255,255,255,0.08)"} strokeWidth={active >= i ? 1.5 : .8} style={{ transition: "all .4s", filter: active >= i ? `drop-shadow(0 0 10px ${n.color}88)` : "none" }} />
            <text x={n.cx} y={n.cy + 6} textAnchor="middle" fontSize={15} style={{ userSelect: "none" }}>{n.icon}</text>
            <text x={n.cx} y={n.cy + 44} textAnchor="middle" fill={active >= i ? "#fff" : "rgba(255,255,255,0.22)"} fontSize={11} fontWeight={700} fontFamily="Outfit,sans-serif" style={{ transition: "fill .4s" }}>{n.label}</text>
            <text x={n.cx} y={n.cy + 57} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize={8.5} style={{ transition: "fill .4s" }}>{n.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FEATURE SECTION — Apple alternating layout
═══════════════════════════════════════════════════════ */
function FeatureSection({
  badge, color, headline, highlight, description, bullets, cta, href, visual, flip, index,
}: {
  badge: string; color: string; headline: string; highlight: string; description: string;
  bullets: string[]; cta: string; href: string; visual: React.ReactNode; flip?: boolean; index: number;
}) {
  return (
    <div style={{ padding: "110px clamp(24px,5vw,72px)", borderBottom: "1px solid rgba(255,255,255,0.04)", position: "relative", zIndex: 1 }}>
      {/* Ambient glow on alternating sides */}
      <div style={{ position: "absolute", top: "20%", [flip ? "left" : "right"]: "5%", width: 500, height: 500, background: `radial-gradient(circle,${color}08 0%,transparent 70%)`, filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 80, flexDirection: flip ? "row-reverse" : "row", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        {/* Text side */}
        <div style={{ flex: "1 1 420px" }}>
          <Reveal delay={0} from={flip ? "right" : "left"}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, background: `${color}12`, border: `1px solid ${color}28`, marginBottom: 24, fontSize: 11, letterSpacing: ".12em", color, fontWeight: 800, textTransform: "uppercase" as const }}>
              {badge}
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16 }}>
              {headline}<br />
              <span style={{ background: `linear-gradient(135deg,${color},${index % 2 === 0 ? "#06b6d4" : "#a78bfa"})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{highlight}</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.42)", lineHeight: 1.82, marginBottom: 28, maxWidth: 480 }}>{description}</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 36 }}>
              {bullets.map(b => (
                <div key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
                  </span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{b}</span>
                </div>
              ))}
            </div>
            <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, background: `${color}14`, border: `1px solid ${color}33`, color, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all .2s", letterSpacing: ".02em" }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}14`; e.currentTarget.style.transform = "none"; }}>
              {cta} →
            </a>
          </Reveal>
        </div>

        {/* Visual side */}
        <div style={{ flex: "1 1 420px", display: "flex", justifyContent: "center" }}>
          <Reveal delay={0.12} from={flip ? "left" : "right"}>
            {visual}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PORTFOLIO TEMPLATE CARD
═══════════════════════════════════════════════════════ */
function TplCard({ name, category, color, emoji, bg, delay }: {
  name: string; category: string; color: string; emoji: string; bg: string; delay: number;
}) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={delay} from="scale">
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
        borderRadius: 16, overflow: "hidden", border: `1px solid ${h ? color + "44" : "rgba(255,255,255,0.06)"}`,
        transform: h ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all .4s cubic-bezier(.16,1,.3,1)", cursor: "pointer",
        boxShadow: h ? `0 28px 64px rgba(0,0,0,.7),0 0 0 1px ${color}22` : "0 4px 20px rgba(0,0,0,.4)",
      }}>
        <div style={{ height: 152, background: bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.12)" }} />
          <span style={{ position: "relative", zIndex: 1, fontSize: 46, filter: h ? `drop-shadow(0 0 18px ${color})` : "none", transition: "filter .3s" }}>{emoji}</span>
          <div style={{ position: "absolute", top: 10, right: 10, fontSize: 9, fontWeight: 800, letterSpacing: ".08em", color: "rgba(255,255,255,.7)", background: "rgba(0,0,0,.45)", padding: "3px 9px", borderRadius: 20, backdropFilter: "blur(8px)", textTransform: "uppercase" as const }}>{category}</div>
          {h && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,${color}22,transparent)` }} />}
        </div>
        <div style={{ padding: "14px 16px", background: "rgba(6,4,16,.98)", borderTop: `1px solid ${color}22` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{name}</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.3)" }}>3D Animated · Interactive</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════
   PRICING CARD
═══════════════════════════════════════════════════════ */
function PricingCard({ plan, price, period, features, cta, href, highlight, color }: {
  plan: string; price: string; period: string; features: string[]; cta: string; href: string; highlight?: boolean; color: string;
}) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      position: "relative", borderRadius: 24, padding: "36px 30px", flex: 1, minWidth: 240,
      background: highlight ? "linear-gradient(145deg,rgba(124,58,237,.1),rgba(6,182,212,.06))" : "rgba(255,255,255,.022)",
      border: `1px solid ${highlight ? "rgba(124,58,237,.38)" : "rgba(255,255,255,.07)"}`,
      transform: h ? "translateY(-8px)" : "none", transition: "all .35s cubic-bezier(.16,1,.3,1)",
      boxShadow: highlight ? "0 0 56px rgba(124,58,237,.12)" : h ? "0 24px 48px rgba(0,0,0,.45)" : "none",
    }}>
      {highlight && <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg,#7c3aed,#06b6d4)", borderRadius: 20, padding: "4px 18px", fontSize: 10, fontWeight: 800, letterSpacing: ".1em", color: "#fff", whiteSpace: "nowrap" }}>⭐ MOST POPULAR</div>}
      <div style={{ fontSize: 10, letterSpacing: ".15em", color, textTransform: "uppercase" as const, fontWeight: 800, marginBottom: 10 }}>{plan}</div>
      <div style={{ fontSize: 50, fontWeight: 900, color: "#fff", fontFamily: "Outfit,sans-serif", lineHeight: 1 }}>{price}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.28)", marginBottom: 28, marginTop: 6 }}>{period}</div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 12, marginBottom: 30 }}>
        {features.map(f => (
          <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ color: "#22c55e", flexShrink: 0, marginTop: 2, fontSize: 13 }}>✓</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,.58)", lineHeight: 1.5 }}>{f}</span>
          </div>
        ))}
      </div>
      <a href={href} style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 12, background: highlight ? "linear-gradient(90deg,#7c3aed,#06b6d4)" : "rgba(255,255,255,.06)", color: "#fff", fontWeight: 800, fontSize: 13, textDecoration: "none", border: highlight ? "none" : "1px solid rgba(255,255,255,.09)", boxShadow: highlight ? "0 0 20px rgba(124,58,237,.25)" : "none", transition: "opacity .2s", letterSpacing: ".04em" }}
        onMouseEnter={e => e.currentTarget.style.opacity = ".82"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>{cta}</a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════ */
export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMain, setShowMain] = useState(false);
  const [mx, setMx] = useState(0); const [my, setMy] = useState(0); const [sy, setSy] = useState(0);

  useEffect(() => { if (sessionStorage.getItem("introSkipped")) { setShowIntro(false); setShowMain(true); } }, []);
  useEffect(() => {
    if (!showMain) return;
    const onM = (e: MouseEvent) => { setMx(e.clientX); setMy(e.clientY); };
    const onS = () => setSy(window.scrollY);
    window.addEventListener("mousemove", onM, { passive: true });
    window.addEventListener("scroll", onS, { passive: true });
    return () => { window.removeEventListener("mousemove", onM); window.removeEventListener("scroll", onS); };
  }, [showMain]);
  const done = useCallback(() => { setShowIntro(false); setShowMain(true); sessionStorage.setItem("introSkipped", "1"); }, []);

  const W = typeof innerWidth !== "undefined" ? innerWidth : 1440;
  const H = typeof innerHeight !== "undefined" ? innerHeight : 900;
  const tiltX = (mx / W - .5) * 9;
  const tiltY = (my / H - .5) * -9;

  const templates = [
    { name: "The Abyss", category: "3D Ocean", color: "#06b6d4", emoji: "🌊", bg: "linear-gradient(135deg,#0c1a3a,#0891b2,#06b6d4aa)" },
    { name: "Luxe Dark", category: "3D Luxury", color: "#a78bfa", emoji: "✨", bg: "linear-gradient(135deg,#1a0a38,#7c3aed,#4f46e5)" },
    { name: "Solar System", category: "3D Space", color: "#fbbf24", emoji: "🪐", bg: "linear-gradient(135deg,#0a0510,#1a0f3a,#92400eaa)" },
    { name: "Clockwork", category: "Steampunk", color: "#f87171", emoji: "⚙️", bg: "linear-gradient(135deg,#1a0a0a,#7f1d1d,#dc2626aa)" },
    { name: "Neon City", category: "Cyberpunk", color: "#22c55e", emoji: "🌆", bg: "linear-gradient(135deg,#0a1a0a,#064e3b,#22c55eaa)" },
    { name: "Arctic", category: "Minimal Pro", color: "#7dd3fc", emoji: "🧊", bg: "linear-gradient(135deg,#0c1a2e,#1e3a5f,#7dd3fcaa)" },
    { name: "Velvet", category: "Dark Elegant", color: "#f0abfc", emoji: "🌸", bg: "linear-gradient(135deg,#1a0a1a,#7c3aed,#ec4899aa)" },
    { name: "Forge", category: "Industrial", color: "#fb923c", emoji: "🔥", bg: "linear-gradient(135deg,#1a0a00,#92400e,#d97706aa)" },
    { name: "Glacier", category: "Clean White", color: "#e2e8f0", emoji: "❄️", bg: "linear-gradient(135deg,#0f1e30,#1e3a5f,#3b82f6aa)" },
    { name: "Nebula", category: "Cosmic", color: "#c084fc", emoji: "🌌", bg: "linear-gradient(135deg,#0a0520,#1e0a3a,#7c3aedaa)" },
    { name: "Sakura", category: "Soft Dark", color: "#fb7185", emoji: "🌺", bg: "linear-gradient(135deg,#1a0a12,#831843,#e11d48aa)" },
    { name: "Aurora", category: "Northern", color: "#34d399", emoji: "🌈", bg: "linear-gradient(135deg,#0a1a15,#064e3b,#34d399aa)" },
  ];

  const featureSections = [
    {
      badge: "ATS Scanner",
      color: "#7c3aed",
      headline: "See exactly why you're",
      highlight: "being rejected — and fix it.",
      description: "75% of resumes are filtered out before a human ever reads them. Our 10-point ATS engine scans your resume in real time — highlighting missing keywords, flagging formatting issues, and showing your compatibility score live as you type. You'll know exactly what to fix before you apply.",
      bullets: [
        "Real-time keyword gap analysis against any job description",
        "10-point ATS compatibility checklist (format, density, headers, length)",
        "Formatting & parseability audit — catch invisible issues",
        "Live score counter — watch it climb as you fix issues",
        "Suggested keywords ranked by importance and frequency",
      ],
      cta: "Try ATS Scanner Free",
      href: "/analyzer",
      visual: (
        <div style={{ background: "rgba(6,4,18,.97)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 20, padding: 28, width: "min(420px,100%)", boxShadow: "0 40px 80px rgba(0,0,0,.7)" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".12em", marginBottom: 20, fontWeight: 700, textTransform: "uppercase" as const }}>ATS Compatibility Report</div>
          {[["Keywords Found", 92, "#22c55e"], ["Formatting", 88, "#22c55e"], ["Readability", 95, "#22c55e"], ["Section Headers", 100, "#22c55e"], ["Length Score", 82, "#fbbf24"], ["Keyword Density", 76, "#fbbf24"]].map(([l, v, c]) => (
            <div key={String(l)} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>{l}</span>
                <span style={{ fontSize: 12.5, color: String(c), fontWeight: 800 }}>{v}%</span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,.05)", borderRadius: 5 }}>
                <div style={{ width: `${v}%`, height: "100%", background: `linear-gradient(90deg,${c}aa,${c})`, borderRadius: 5, boxShadow: `0 0 6px ${c}88` }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(34,197,94,.07)", border: "1px solid rgba(34,197,94,.18)", borderRadius: 12, fontSize: 13, color: "#22c55e", fontWeight: 700, display: "flex", gap: 8, alignItems: "center" }}>
            <span>🎉</span> Overall Score: 89/100 — Strong Match
          </div>
        </div>
      ),
    },
    {
      badge: "AI Resume Builder",
      color: "#06b6d4",
      headline: "Describe yourself in plain language.",
      highlight: "Get a perfect resume instantly.",
      description: "No forms. No templates to fill. Just type who you are — your skills, experience, achievements. Our AI understands the nuance in your story, extracts the right signals, and produces a perfectly structured, ATS-optimized resume with impact-driven bullet points in seconds.",
      bullets: [
        "Natural language input — write like you're talking to a friend",
        "Structured bullet points with measurable achievements auto-generated",
        "ATS keywords automatically woven into every section",
        "Multiple resume versions for different job types",
        "Manual editor for full control after generation",
      ],
      cta: "Build My Resume Free",
      href: "/dashboard",
      visual: (
        <div style={{ background: "rgba(4,3,14,.97)", border: "1px solid rgba(6,182,212,.18)", borderRadius: 20, overflow: "hidden", width: "min(440px,100%)", boxShadow: "0 40px 80px rgba(0,0,0,.7)" }}>
          <div style={{ background: "rgba(255,255,255,.025)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8 }}>
            {["#f87171", "#fbbf24", "#22c55e"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: .7, display: "inline-block" }} />)}
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.2)", marginLeft: 6 }}>ai-resume-builder.tsx</span>
          </div>
          <div style={{ padding: "22px 24px", fontFamily: "monospace", fontSize: 12.5, lineHeight: 1.8 }}>
            <div style={{ color: "rgba(255,255,255,.2)", marginBottom: 12 }}>// Describe yourself naturally...</div>
            <div style={{ background: "rgba(6,182,212,.06)", border: "1px solid rgba(6,182,212,.15)", borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: 12, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>
              "I'm a <span style={{ color: "#22c55e" }}>full-stack developer</span> with <span style={{ color: "#fbbf24" }}>4 years</span> experience. Built a <span style={{ color: "#06b6d4" }}>SaaS product</span> from scratch that reached <span style={{ color: "#a78bfa" }}>50k MAU</span>. Strong in React, Node.js, cloud infra..."
            </div>
            <div style={{ color: "rgba(255,255,255,.22)", marginBottom: 10, fontSize: 11 }}>//  Generating in 4.1 seconds...</div>
            <div style={{ background: "rgba(34,197,94,.06)", border: "1px solid rgba(34,197,94,.15)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, marginBottom: 8, letterSpacing: ".08em" }}>✓ RESUME GENERATED</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>
                <div>• Led development of SaaS platform serving <span style={{ color: "#fff" }}>50,000+ monthly users</span></div>
                <div>• Architected microservices reducing latency by <span style={{ color: "#fff" }}>40%</span></div>
                <div>• Managed 3-person engineering team, shipping <span style={{ color: "#fff" }}>12 features/quarter</span></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      badge: "AI Cover Letter",
      color: "#22c55e",
      headline: "Cover letters that actually",
      highlight: "get read. Every time.",
      description: "Most cover letters are generic and get ignored. Ours are different. Paste any job description and our AI writes a personalized, tone-matched cover letter that speaks directly to the hiring manager — addressing the exact skills they want, in a voice that sounds authentically like you.",
      bullets: [
        "Personalized to each specific job posting and company",
        "Tone-matched to the role (startup casual vs. corporate formal)",
        "ATS-safe formatting — plain text structure that passes bots",
        "Auto-references your achievements from your resume",
        "Editable paragraph by paragraph in the builder",
      ],
      cta: "Generate a Cover Letter",
      href: "/builder",
      visual: (
        <div style={{ background: "rgba(4,3,14,.97)", border: "1px solid rgba(34,197,94,.18)", borderRadius: 20, padding: 28, width: "min(420px,100%)", boxShadow: "0 40px 80px rgba(0,0,0,.7)" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.28)", letterSpacing: ".12em", marginBottom: 20, fontWeight: 700, textTransform: "uppercase" as const }}>AI is writing...</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.7)", lineHeight: 1.85 }}>
            Dear Hiring Manager at <span style={{ color: "#06b6d4", fontWeight: 700 }}>Stripe</span>,<br /><br />
            I am writing to express my strong interest in the <span style={{ color: "#22c55e", fontWeight: 700 }}>Senior Frontend Engineer</span> role. With <span style={{ color: "#a78bfa", fontWeight: 700 }}>4 years</span> of experience building high-performance <span style={{ color: "#fbbf24" }}>React</span> applications at scale, I have developed a deep expertise in the payment UX patterns that define <span style={{ color: "#06b6d4", fontWeight: 700 }}>world-class fintech products</span>.<br /><br />
            At my current role, I led the redesign of our <span style={{ color: "#22c55e" }}>checkout flow</span> — reducing drop-off by <span style={{ color: "#fff", fontWeight: 700 }}>23%</span> and...<span style={{ borderRight: "2px solid #22c55e", animation: "blink 1s step-end infinite", marginLeft: 2 }} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {showIntro && (
        <>
          <FogIntro onComplete={done} />
          <button onClick={done} style={{ position: "fixed", bottom: 32, right: 32, zIndex: 99999, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.3)", padding: "8px 22px", borderRadius: 8, cursor: "pointer", fontSize: 11, letterSpacing: ".14em", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>SKIP INTRO</button>
        </>
      )}

      {showMain && (
        <div style={{ background: "#05050a", minHeight: "100vh", position: "relative", overflowX: "hidden", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <ParticleMesh mx={mx} my={my} />

          {/* Fixed orbs */}
          <div style={{ position: "fixed", top: "-5%", left: "5%", width: 900, height: 900, background: "radial-gradient(circle,rgba(124,58,237,.065) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }} />
          <div style={{ position: "fixed", top: "50%", right: "-5%", width: 700, height: 700, background: "radial-gradient(circle,rgba(6,182,212,.05) 0%,transparent 65%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }} />

          {/* ══════════ NAV ══════════ */}
          <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(24px,4vw,64px)", height: 64, background: sy > 30 ? "rgba(5,5,10,.88)" : "transparent", backdropFilter: sy > 30 ? "blur(28px) saturate(1.8)" : "none", borderBottom: sy > 30 ? "1px solid rgba(255,255,255,.055)" : "1px solid transparent", position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, transition: "all .45s cubic-bezier(.16,1,.3,1)" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <Image src="/logo.avif" alt="Resumify" width={32} height={32} style={{ borderRadius: 9, display: "block" }} />
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 19, letterSpacing: ".06em", color: "#fff" }}>
                RESUM<span style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IFY</span>
              </span>
            </Link>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {[["Features", "#features"], ["Portfolio", "#portfolio"], ["Pricing", "#pricing"]].map(([l, h]) => (
                <a key={l} href={h} style={{ fontSize: 13, color: "rgba(255,255,255,.42)", textDecoration: "none", fontWeight: 500, transition: "color .2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.42)"}>{l}</a>
              ))}
              <a href="/dashboard" style={{ padding: "9px 20px", borderRadius: 10, background: "linear-gradient(90deg,#7c3aed,#06b6d4)", color: "#fff", fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: ".02em", transition: "opacity .2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = ".8"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>Get Started →</a>
            </div>
          </nav>

          {/* ══════════ HERO ══════════ */}
          <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "96px clamp(24px,5vw,64px) 60px", position: "relative", zIndex: 1 }}>
            {/* Dot grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.055) 1px,transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent)" }} />

            <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 72, flexWrap: "wrap", justifyContent: "center" }}>
                {/* Left */}
                <div style={{ flex: "1 1 480px", transform: `perspective(1000px) rotateX(${tiltY * .16}deg) rotateY(${tiltX * .16}deg)`, transition: "transform .1s linear" }}>
                  <Reveal from="bottom">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", marginBottom: 28, fontSize: 11, letterSpacing: ".12em", color: "#a78bfa", fontWeight: 800 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse-dot 2s infinite", boxShadow: "0 0 8px #22c55e" }} />
                      ATS-Optimized · AI-Powered · Free to Start
                    </div>
                    <h1 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(46px,7.5vw,94px)", lineHeight: .96, letterSpacing: "-.04em", color: "#fff", marginBottom: 26 }}>
                      Your Resume.<br />
                      <span style={{ background: "linear-gradient(135deg,#c4b5fd,#7c3aed 42%,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI-Built.</span><br />
                      <Typewriter words={["Hired.", "Perfected.", "Promoted.", "Unstoppable."]} />
                    </h1>
                    <p style={{ fontSize: "clamp(15px,1.7vw,18px)", color: "rgba(255,255,255,.4)", lineHeight: 1.82, maxWidth: 480, marginBottom: 40 }}>
                      Build ATS-optimized resumes in seconds. Score them against real job postings. Launch a cinematic 3D portfolio with one click. Everything in one place.
                    </p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
                      <a href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 34px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff", fontWeight: 800, fontSize: 14, textDecoration: "none", boxShadow: "0 0 36px rgba(124,58,237,.38)", transition: "transform .2s,box-shadow .2s", letterSpacing: ".02em" }}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 56px rgba(124,58,237,.55)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 36px rgba(124,58,237,.38)"; }}>
                        Build My Resume — Free
                      </a>
                      <a href="#features" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 26px", borderRadius: 12, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", color: "rgba(255,255,255,.7)", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "background .2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}>
                        See Features ↓
                      </a>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex" }}>
                        {["#7c3aed", "#06b6d4", "#22c55e", "#fbbf24"].map((c, i) => (
                          <div key={c} style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg,${c},${c}66)`, border: "2px solid #05050a", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 800 }}>
                            {["G", "A", "M", "T"][i]}
                          </div>
                        ))}
                      </div>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,.24)" }}>Candidates at Google, Amazon, Microsoft & more</span>
                    </div>
                  </Reveal>
                </div>

                {/* Right — ATS widget */}
                <div style={{ flex: "0 0 auto", transform: `perspective(800px) rotateX(${tiltY * .44}deg) rotateY(${tiltX * .44}deg)`, transition: "transform .1s linear" }}>
                  <Reveal from="right" delay={.1}><ATSWidget /></Reveal>
                </div>
              </div>

              {/* Dashboard floating preview */}
              <Reveal delay={.22} from="scale">
                <div style={{ marginTop: 80, position: "relative" }}>
                  <div style={{ position: "absolute", top: "25%", left: "50%", transform: "translateX(-50%)", width: "65%", height: "65%", background: "radial-gradient(ellipse,rgba(124,58,237,.16) 0%,transparent 70%)", filter: "blur(50px)", zIndex: 0, pointerEvents: "none" }} />
                  <div style={{ position: "relative", zIndex: 1, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 0 0 1px rgba(124,58,237,.1),0 80px 160px rgba(0,0,0,.95)" }}>
                    <div style={{ background: "rgba(255,255,255,.02)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "11px 18px", display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {["#f87171aa", "#fbbf24aa", "#22c55eaa"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
                      </div>
                      <div style={{ flex: 1, background: "rgba(255,255,255,.035)", borderRadius: 6, height: 23, display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 340, margin: "0 auto" }}>
                        <span style={{ fontSize: 10.5, color: "rgba(255,255,255,.15)" }}>app.resumify.ai/dashboard</span>
                      </div>
                    </div>
                    <Image src="/dashboard-preview.svg" alt="Resumify AI Dashboard" width={1200} height={750} style={{ width: "100%", height: "auto", display: "block" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top,#05050a,transparent)", pointerEvents: "none" }} />
                  </div>
                </div>
              </Reveal>
            </div>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: "linear-gradient(to top,#05050a,transparent)", pointerEvents: "none" }} />
          </section>

          {/* ══════════ MARQUEE ══════════ */}
          <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,.04)", borderBottom: "1px solid rgba(255,255,255,.04)", background: "rgba(3,2,9,.96)", padding: "14px 0", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
              {[...Array(2)].map((_, rep) =>
                ["AI Resume Builder", "Live ATS Scoring", "12+ Portfolio Templates", "Cover Letters", "PDF Export", "Cloud Sync", "Keyword Match AI", "Real-Time Preview", "One-Click Apply", "Manual Editor"].map((item, i) => (
                  <span key={`${rep}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 22, padding: "0 28px", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.24)", letterSpacing: ".09em", whiteSpace: "nowrap", textTransform: "uppercase" as const }}>
                    {item}<span style={{ width: 3, height: 3, borderRadius: "50%", background: i % 3 === 0 ? "#7c3aed" : i % 3 === 1 ? "#06b6d4" : "#22c55e", display: "inline-block" }} />
                  </span>
                ))
              )}
            </div>
          </div>

          {/* ══════════ PROBLEM STATEMENT ══════════ */}
          <section style={{ padding: "120px clamp(24px,5vw,64px)", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
              <Reveal>
                <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#f87171", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 20 }}>The Hidden Problem</div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(30px,5vw,62px)", color: "#fff", letterSpacing: "-.03em", lineHeight: 1.08, marginBottom: 22 }}>
                  <span style={{ background: "linear-gradient(90deg,#f87171,#fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>75% of resumes</span> are rejected<br />before a human ever sees them.
                </h2>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,.38)", maxWidth: 600, margin: "0 auto 64px", lineHeight: 1.82 }}>
                  Applicant Tracking Systems automatically filter out candidates whose resumes don't match their exact criteria. Most applicants have no idea why they're not hearing back. Resumify changes that — permanently.
                </p>
              </Reveal>

              {/* ATS funnel — clean minimal steps */}
              <Reveal delay={.15}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
                  {[
                    { num: "01", label: "You Apply", sub: "Resume submitted", color: "rgba(255,255,255,.10)", accent: "rgba(255,255,255,.5)", glow: "#ffffff" },
                    { num: "02", label: "ATS Parses", sub: "System reads it", color: "rgba(251,191,36,.08)", accent: "#fbbf24", glow: "#fbbf24" },
                    { num: "03", label: "Keywords", sub: "Match or reject", color: "rgba(6,182,212,.08)", accent: "#06b6d4", glow: "#06b6d4" },
                    { num: "04", label: "Ranked", sub: "Scored & filtered", color: "rgba(124,58,237,.08)", accent: "#7c3aed", glow: "#7c3aed" },
                    { num: "05", label: "HR Sees You", sub: "Interview request", color: "rgba(34,197,94,.08)", accent: "#22c55e", glow: "#22c55e" },
                  ].map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center" }}>
                      <Reveal delay={i * .12} from="scale">
                        <div style={{ textAlign: "center", padding: "22px 16px", borderRadius: 18, background: s.color, border: "1px solid rgba(255,255,255,.07)", width: 110 }}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: s.accent, marginBottom: 9, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-.02em" }}>{s.num}</div>
                          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.7)", fontWeight: 700, lineHeight: 1.4 }}>{s.label}</div>
                          <div style={{ fontSize: 9.5, color: "rgba(255,255,255,.28)", marginTop: 4 }}>{s.sub}</div>
                        </div>
                      </Reveal>
                      {i < 4 && <div style={{ width: 40, height: 1.5, background: `linear-gradient(90deg,rgba(255,255,255,.06),${s.glow}55)`, margin: "0 3px" }} />}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={.3}>
                <div style={{ marginTop: 52, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 28px", borderRadius: 100, background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.18)" }}>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,.65)" }}>Resumify's ATS engine is built to help you <strong style={{ color: "#a78bfa" }}>pass every filter</strong> before you apply.</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ ALTERNATING FEATURE SECTIONS ══════════ */}
          <section id="features">
            {featureSections.map((feat, i) => (
              <FeatureSection key={feat.badge} {...feat} flip={i % 2 !== 0} index={i} />
            ))}
          </section>

          {/* ══════════ HOW IT WORKS — Flow Diagram ══════════ */}
          <section style={{ padding: "120px clamp(24px,5vw,64px)", background: "linear-gradient(180deg,transparent,rgba(124,58,237,.03),transparent)", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 70 }}>
                  <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#06b6d4", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 16 }}>How It Works</div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4.5vw,56px)", color: "#fff", letterSpacing: "-.03em", lineHeight: 1.08 }}>
                    From blank page to job offer.<br />
                    <span style={{ background: "linear-gradient(90deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>In under 5 minutes.</span>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={.15}><FlowDiagram /></Reveal>
            </div>
          </section>

          {/* ══════════ PORTFOLIO — DESCRIPTIVE ══════════ */}
          <section id="portfolio" style={{ padding: "120px clamp(24px,5vw,64px)", position: "relative", zIndex: 1, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1100, height: 600, background: "radial-gradient(ellipse,rgba(6,182,212,.05) 0%,transparent 65%)", filter: "blur(80px)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

              {/* Header */}
              <Reveal>
                <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#06b6d4", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 20 }}>Portfolio Builder</div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.5vw,60px)", color: "#fff", letterSpacing: "-.03em", lineHeight: 1.08, marginBottom: 22, maxWidth: 680 }}>
                  Your work deserves a home that<br />
                  <span style={{ background: "linear-gradient(90deg,#06b6d4,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>speaks before you do.</span>
                </h2>
                <p style={{ fontSize: 17, color: "rgba(255,255,255,.4)", maxWidth: 600, lineHeight: 1.85, marginBottom: 72 }}>
                  A resume tells recruiters what you've done. A portfolio shows them who you are. With Resumify, you get a cinematic, fully interactive portfolio site — built automatically from your resume data, live in under a minute, no design skills needed.
                </p>
              </Reveal>

              {/* Feature rows */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 2 }}>
                {[
                  {
                    num: "01",
                    title: "Auto-filled from your resume",
                    desc: "Every project, role, and skill you've entered into your resume is automatically pulled into your portfolio. No copy-pasting. No reformatting. Just pick a design and your story is already there.",
                    accent: "#06b6d4",
                  },
                  {
                    num: "02",
                    title: "12+ cinematic themes",
                    desc: "Choose from a library of visually distinct, fully animated portfolio themes — from clean editorial layouts to immersive 3D environments. Each one is mobile-optimized and built to impress.",
                    accent: "#a78bfa",
                  },
                  {
                    num: "03",
                    title: "One shareable link",
                    desc: "Your portfolio lives at a clean URL you can put on your resume, LinkedIn, or email signature. No login required to view. Share it with anyone, anywhere — it just works.",
                    accent: "#22c55e",
                  },
                  {
                    num: "04",
                    title: "Live drag-and-drop editor",
                    desc: "Rearrange sections, change colors, swap themes, and tweak every line of text right in the browser. See changes live as you make them. What you see is exactly what visitors get.",
                    accent: "#fbbf24",
                  },
                  {
                    num: "05",
                    title: "Custom domain support",
                    desc: "On the Pro plan, connect your own domain name — yourname.com — and turn your portfolio into a professional personal brand. No hosting fees, no extra setup.",
                    accent: "#f87171",
                  },
                  {
                    num: "06",
                    title: "Built to get noticed",
                    desc: "Most candidates send a PDF and hope for a callback. A live, interactive portfolio puts a face to your name before the interview. Recruiters remember candidates who stand out — be that candidate.",
                    accent: "#06b6d4",
                  },
                ].map((item, i) => (
                  <Reveal key={item.num} delay={i * .07} from="bottom">
                    <div style={{
                      padding: "36px 32px",
                      borderTop: `1px solid rgba(255,255,255,.06)`,
                      borderLeft: i % 2 === 0 ? "none" : "none",
                      position: "relative",
                      transition: "background .3s",
                    }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,.02)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 800, color: item.accent, letterSpacing: ".1em", marginBottom: 18, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.num}</div>
                      <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.3, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-.01em" }}>{item.title}</h3>
                      <p style={{ fontSize: 14.5, color: "rgba(255,255,255,.38)", lineHeight: 1.82 }}>{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={.3}>
                <div style={{ marginTop: 64, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                  <a href="/portfolio" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 12, background: "rgba(6,182,212,.1)", border: "1px solid rgba(6,182,212,.25)", color: "#06b6d4", fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "all .22s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(6,182,212,.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,182,212,.1)"; e.currentTarget.style.transform = "none"; }}>
                    Build Your Portfolio →
                  </a>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.22)", fontStyle: "italic" }}>Free on all plans · No design skills needed</span>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ PRICING ══════════ */}
          <section id="pricing" style={{ padding: "120px clamp(24px,5vw,64px)", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 1060, margin: "0 auto" }}>
              <Reveal>
                <div style={{ textAlign: "center", marginBottom: 72 }}>
                  <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#a78bfa", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 16 }}>Pricing</div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(30px,4.5vw,58px)", color: "#fff", lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 16 }}>
                    Start free.<br />
                    <span style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Upgrade when you land it.</span>
                  </h2>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,.3)", maxWidth: 420, margin: "0 auto" }}>No credit card required. Cancel anytime.</p>
                </div>
              </Reveal>
              <Reveal delay={.12}>
                <div style={{ display: "flex", gap: 18, alignItems: "stretch", flexWrap: "wrap" }}>
                  <PricingCard plan="Free" price="₹0" period="Forever free"
                    features={["3 AI resume generations", "1 portfolio template", "ATS score checker", "PDF download", "Manual editor"]}
                    cta="Get Started Free" href="/dashboard" color="rgba(255,255,255,.32)" />
                  <PricingCard plan="Pro" price="₹299" period="per month"
                    features={["Unlimited AI generations", "All 12+ portfolio templates", "Advanced ATS deep scanner", "AI cover letter generator", "Priority support", "Custom portfolio domain", "Cloud sync & history"]}
                    cta="Start Pro — ₹299/mo" href="/pricing" highlight color="#a78bfa" />
                  <PricingCard plan="Lifetime" price="₹999" period="one-time payment"
                    features={["Everything in Pro forever", "Lifetime updates included", "Early access to new features", "Priority feature requests", "Dedicated SLA support"]}
                    cta="Get Lifetime Access" href="/pricing" color="#06b6d4" />
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ CTA ══════════ */}
          <section style={{ position: "relative", zIndex: 1, overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(180deg,transparent,rgba(124,58,237,.05) 25%,rgba(124,58,237,.1) 55%,rgba(6,182,212,.05) 100%)", padding: "130px clamp(24px,5vw,64px) 140px", textAlign: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", WebkitMaskImage: "radial-gradient(ellipse 65% 75% at 50% 50%,black,transparent)" }} />
              <Reveal>
                <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
                  <div style={{ fontSize: 10, letterSpacing: ".18em", color: "#7c3aed", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 24 }}>Start Today — Free</div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "clamp(36px,6vw,76px)", color: "#fff", lineHeight: 1.0, letterSpacing: "-.04em", marginBottom: 24 }}>
                    Ready to land<br />
                    <span style={{ background: "linear-gradient(135deg,#c4b5fd,#7c3aed 42%,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your dream job?</span>
                  </h2>
                  <p style={{ fontSize: 17, color: "rgba(255,255,255,.35)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.82 }}>
                    Join thousands who landed their dream roles — the only resume builder that shows you your ATS score in real time.
                  </p>
                  <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href="/dashboard" style={{ padding: "16px 40px", borderRadius: 14, background: "linear-gradient(90deg,#7c3aed,#06b6d4)", color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 0 44px rgba(124,58,237,.38)", letterSpacing: ".02em", transition: "transform .2s,box-shadow .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 0 64px rgba(124,58,237,.55)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 44px rgba(124,58,237,.38)"; }}>⚡ Build My Resume Free</a>
                    <a href="/analyzer" style={{ padding: "16px 36px", borderRadius: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", color: "rgba(255,255,255,.7)", fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "background .2s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.04)"}>📊 Check ATS Score</a>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ══════════ FOOTER ══════════ */}
          <footer style={{ borderTop: "1px solid rgba(255,255,255,.04)", padding: "52px clamp(24px,5vw,64px) 32px", position: "relative", zIndex: 1 }}>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 44, marginBottom: 44 }}>
                <div style={{ maxWidth: 260 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
                    <Image src="/logo.avif" alt="Resumify" width={30} height={30} style={{ borderRadius: 8, display: "block" }} />
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: 18, letterSpacing: ".06em", color: "#fff" }}>
                      RESUM<span style={{ background: "linear-gradient(90deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IFY</span>
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.24)", lineHeight: 1.75 }}>Build resumes and portfolios that get you hired. Beat the bots. Land the interview.</p>
                </div>
                <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
                  {[
                    { heading: "Product", links: [["Dashboard", "/dashboard"], ["AI Builder", "/builder"], ["ATS Checker", "/analyzer"], ["Portfolio", "/portfolio"], ["Pricing", "/pricing"]] },
                    { heading: "Company", links: [["Privacy", "#"], ["Terms", "#"], ["Contact", "#"]] },
                    { heading: "Resources", links: [["Resume Tips", "#"], ["ATS Guide", "#"], ["Templates", "#"]] },
                  ].map(col => (
                    <div key={col.heading}>
                      <div style={{ fontSize: 10, letterSpacing: ".14em", color: "rgba(255,255,255,.18)", fontWeight: 800, textTransform: "uppercase" as const, marginBottom: 14 }}>{col.heading}</div>
                      <div style={{ display: "flex", flexDirection: "column" as const, gap: 11 }}>
                        {col.links.map(([l, h]) => (
                          <a key={l} href={h} style={{ fontSize: 13, color: "rgba(255,255,255,.32)", textDecoration: "none", transition: "color .2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.32)"}>{l}</a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,.04)", paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.16)" }}>© 2025 Resumify AI · Built with 💜 in India</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.16)" }}>Made for every student, every job seeker, every dream.</div>
              </div>
            </div>
          </footer>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
            @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.55)}}
            @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
            @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
            @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
            *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}
            ::-webkit-scrollbar-thumb{background:rgba(124,58,237,.35);border-radius:2px}
            ::-webkit-scrollbar-thumb:hover{background:rgba(124,58,237,.65)}
          `}</style>
        </div>
      )}
    </>
  );
}
