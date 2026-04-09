"use client";
import { useEffect, useRef } from "react";

interface FogIntroProps {
  onComplete: () => void;
}

export default function FogIntro({ onComplete }: FogIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx as CanvasRenderingContext2D;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;

    // ── Dense volumetric smoke particles ──
    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      r: number; baseR: number;
      opacity: number; maxOp: number;
      rotation: number; rotSpeed: number;
      hue: number; sat: number; lit: number;
      n1: number; n2: number; n3: number;
      layer: number; // depth 0=back, 1=mid, 2=front
      born: number; // birth time for stagger
    }

    // Noise – multi-octave sine for organic turbulence
    function noise(x: number, y: number, z: number): number {
      return (
        Math.sin(x * 1.23 + y * 4.56 + z * 0.78) * 0.35 +
        Math.sin(x * 5.67 - y * 1.34 + z * 2.45) * 0.25 +
        Math.sin(x * 3.1 + y * 7.89 - z * 1.1) * 0.2 +
        Math.sin(x * 9.2 - y * 3.7 + z * 0.3) * 0.12 +
        Math.cos(x * 2.5 + y * 6.1 + z * 1.7) * 0.08
      );
    }

    function makeParticles(count: number): Particle[] {
      const w = W(), h = H();
      return Array.from({ length: count }, (_, i) => {
        const layer = i % 3;
        // Distribute across viewport with concentration toward center-bottom
        const cx = w * 0.5 + (Math.random() - 0.5) * w * 1.2;
        const cy = h * 0.3 + Math.random() * h * 0.8;

        // Hue palette: deep violet (270) → teal (190) → emerald (140)
        const hueBase = [270, 250, 220, 190, 160, 140][Math.floor(Math.random() * 6)];
        const baseR = (50 + Math.random() * 140) * (0.6 + layer * 0.25);

        return {
          x: cx, y: cy,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.08 - Math.random() * 0.15,
          r: baseR, baseR,
          opacity: 0, maxOp: 0.04 + Math.random() * 0.08 + layer * 0.02,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.003,
          hue: hueBase + (Math.random() - 0.5) * 20,
          sat: 45 + Math.random() * 35,
          lit: 35 + Math.random() * 30 + layer * 8,
          n1: Math.random() * 200, n2: Math.random() * 200, n3: Math.random() * 200,
          layer,
          born: Math.random() * 1.5, // stagger birth over first 1.5s
        };
      });
    }

    let particles = makeParticles(200);

    const startTime = performance.now();

    // TIMELINE:
    // 0-2.5s    : fog billows in from everywhere, thickening
    // 2.5-3.5s  : peak density, central glow appears
    // 3.5-5.0s  : fog parts slightly, RESUMIFY text emerges with luminous glow
    // 5.0-6.5s  : text shines, particles sweep outward, fade to black
    // 6.5-7.5s  : clean fade out
    const TOTAL = 7.5;

    function drawParticle(p: Particle, t: number, globalAlpha: number) {
      if (t < p.born) return; // not born yet

      const age = t - p.born;
      // Fade in over 1s after birth
      const fadeIn = Math.min(age / 1.0, 1);
      const alpha = p.opacity * fadeIn * globalAlpha;
      if (alpha < 0.003) return;

      // Turbulent displacement — 3D noise for volumetric feel
      const tx = noise(p.n1 + t * 0.25, p.n2, t * 0.1) * 70 * (1 + p.layer * 0.3);
      const ty = noise(p.n1, p.n2 + t * 0.2, t * 0.15) * 50 * (1 + p.layer * 0.2);
      const breathing = 1 + noise(p.n3 + t * 0.4, p.n1 + t * 0.3, t * 0.2) * 0.25;

      const rx = p.x + tx;
      const ry = p.y + ty;
      const rr = p.r * breathing;

      c.save();
      c.translate(rx, ry);
      c.rotate(p.rotation + Math.sin(t * 0.3 + p.n1) * 0.1);

      // Multi-stop radial for deep volumetric look
      const grad = c.createRadialGradient(0, 0, 0, 0, 0, rr);
      const h = p.hue + Math.sin(t * 0.5 + p.n1) * 10;
      grad.addColorStop(0, `hsla(${h}, ${p.sat}%, ${p.lit}%, ${alpha * 0.7})`);
      grad.addColorStop(0.2, `hsla(${h + 10}, ${p.sat - 5}%, ${p.lit - 3}%, ${alpha * 0.5})`);
      grad.addColorStop(0.45, `hsla(${h + 20}, ${p.sat - 10}%, ${p.lit - 8}%, ${alpha * 0.3})`);
      grad.addColorStop(0.7, `hsla(${h + 30}, ${p.sat - 15}%, ${p.lit - 15}%, ${alpha * 0.12})`);
      grad.addColorStop(1, `hsla(${h + 40}, ${p.sat - 20}%, ${p.lit - 20}%, 0)`);

      c.fillStyle = grad;
      c.beginPath();
      // Organic blob shape via ellipse with noise-driven axes
      const a1 = rr * (1 + Math.sin(t * 0.6 + p.n1) * 0.2);
      const a2 = rr * (0.55 + Math.cos(t * 0.4 + p.n2) * 0.15);
      c.ellipse(0, 0, a1, a2, Math.sin(t * 0.15 + p.n3) * 0.3, 0, Math.PI * 2);
      c.fill();

      c.restore();
    }

    function evolve(t: number, phase: number) {
      const disperseForce = phase >= 3 ? (t - 5.0) * 0.8 : 0;

      particles.forEach(p => {
        const turb = noise(p.n1 + t * 0.5, p.n2 + t * 0.3, t * 0.2) * 0.06;
        p.vx += turb;
        p.vy += -0.005 + noise(p.n2 + t, p.n1, t * 0.1) * 0.02;

        // Phase 3+: push particles outward from center
        if (disperseForce > 0) {
          const dx = p.x - W() / 2;
          const dy = p.y - H() / 2;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * disperseForce * 0.12;
          p.vy += (dy / dist) * disperseForce * 0.08;
        }

        p.vx *= 0.988;
        p.vy *= 0.988;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Opacity envelope
        if (t < p.born) { p.opacity = 0; return; }
        const age = t - p.born;
        if (phase <= 1) {
          p.opacity = Math.min(age / 1.0, 1) * p.maxOp;
        } else if (phase === 2) {
          p.opacity = p.maxOp;
        } else {
          p.opacity = p.maxOp * Math.max(0, 1 - (t - 5.0) / 2.0);
        }
      });
    }

    function drawTitle(alpha: number, t: number) {
      if (alpha <= 0) return;
      c.save();
      const cx = W() / 2;
      const cy = H() / 2;

      // Background glow behind text
      const bgGlow = c.createRadialGradient(cx, cy, 0, cx, cy, W() * 0.35);
      bgGlow.addColorStop(0, `rgba(124,58,237,${alpha * 0.15})`);
      bgGlow.addColorStop(0.3, `rgba(34,197,94,${alpha * 0.06})`);
      bgGlow.addColorStop(1, "transparent");
      c.fillStyle = bgGlow;
      c.fillRect(0, 0, W(), H());

      // Multi-layer text glow for that premium luminous effect
      c.textAlign = "center";
      c.textBaseline = "middle";
      const fs = Math.min(W() * 0.09, 100);

      // Outer glow passes
      [40, 25, 12].forEach((blur, i) => {
        c.shadowColor = i === 0
          ? `hsla(270, 100%, 70%, ${alpha * 0.7})`
          : i === 1
            ? `hsla(150, 90%, 60%, ${alpha * 0.5})`
            : `hsla(210, 100%, 80%, ${alpha * 0.9})`;
        c.shadowBlur = blur * alpha;
        c.font = `900 ${fs}px Outfit, sans-serif`;

        const textGrad = c.createLinearGradient(cx - 280, cy, cx + 280, cy);
        textGrad.addColorStop(0, `hsla(270, 100%, 82%, ${alpha})`);
        textGrad.addColorStop(0.35, `hsla(220, 100%, 85%, ${alpha})`);
        textGrad.addColorStop(0.5, `hsla(160, 95%, 75%, ${alpha})`);
        textGrad.addColorStop(0.7, `hsla(270, 100%, 80%, ${alpha})`);
        textGrad.addColorStop(1, `hsla(300, 100%, 75%, ${alpha})`);
        c.fillStyle = textGrad;
        c.fillText("RESUMIFY", cx, cy - 10);
      });

      // Tagline
      c.shadowBlur = 0;
      c.shadowColor = "transparent";
      const tagFs = Math.min(W() * 0.016, 17);
      c.font = `300 ${tagFs}px Inter, sans-serif`;
      c.fillStyle = `rgba(255,255,255,${alpha * 0.5})`;
      c.letterSpacing = "0.2em";
      c.fillText("YOUR RESUME, REIMAGINED BY AI", cx, cy + fs * 0.55);

      c.restore();
    }

    function draw() {
      const now = performance.now();
      const t = (now - startTime) / 1000;

      c.clearRect(0, 0, W(), H());

      // Deep dark background
      c.fillStyle = "#03030a";
      c.fillRect(0, 0, W(), H());

      // Ambient background radials (always subtle)
      const ambientV = c.createRadialGradient(W() * 0.3, H() * 0.6, 0, W() * 0.3, H() * 0.6, W() * 0.5);
      ambientV.addColorStop(0, "rgba(124,58,237,0.06)");
      ambientV.addColorStop(1, "transparent");
      c.fillStyle = ambientV;
      c.fillRect(0, 0, W(), H());

      const ambientG = c.createRadialGradient(W() * 0.7, H() * 0.4, 0, W() * 0.7, H() * 0.4, W() * 0.4);
      ambientG.addColorStop(0, "rgba(34,197,94,0.04)");
      ambientG.addColorStop(1, "transparent");
      c.fillStyle = ambientG;
      c.fillRect(0, 0, W(), H());

      const phase = t < 2.5 ? 0 : t < 3.5 ? 1 : t < 5.0 ? 2 : 3;

      evolve(t, phase);

      // Global smoke alpha
      const smokeAlpha = phase === 0
        ? Math.min(t / 2.0, 1)
        : phase === 1
          ? 1.0
          : phase === 2
            ? 1.0 - (t - 3.5) * 0.15
            : Math.max(0, 0.78 - (t - 5.0) / 2.0);

      // Draw particles by layer (back to front) for depth
      for (let layer = 0; layer < 3; layer++) {
        particles
          .filter(p => p.layer === layer)
          .forEach(p => drawParticle(p, t, smokeAlpha));
      }

      // Central glow pulse in phases 1-2
      if (phase >= 1 && phase <= 2) {
        const glowStrength = phase === 1
          ? Math.sin((t - 2.5) / 1.0 * Math.PI) * 0.5
          : 0.3 - (t - 3.5) * 0.1;
        if (glowStrength > 0) {
          const cg = c.createRadialGradient(W() / 2, H() / 2, 0, W() / 2, H() / 2, W() * 0.4);
          cg.addColorStop(0, `rgba(200,180,255,${glowStrength * 0.6})`);
          cg.addColorStop(0.15, `rgba(124,58,237,${glowStrength * 0.3})`);
          cg.addColorStop(0.4, `rgba(34,197,94,${glowStrength * 0.1})`);
          cg.addColorStop(1, "transparent");
          c.fillStyle = cg;
          c.fillRect(0, 0, W(), H());
        }
      }

      // Text emerges in phase 2+
      if (phase >= 2) {
        const textAlpha = phase === 2
          ? Math.min((t - 3.5) / 1.2, 1)
          : Math.max(0, 1 - (t - 5.0) / 1.5);
        drawTitle(textAlpha, t);
      }

      // Deep vignette for cinematic feel
      const vig = c.createRadialGradient(W() / 2, H() / 2, H() * 0.25, W() / 2, H() / 2, H() * 0.9);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(0.7, "rgba(3,3,10,0.3)");
      vig.addColorStop(1, "rgba(3,3,10,0.85)");
      c.fillStyle = vig;
      c.fillRect(0, 0, W(), H());

      // Final fade to black
      if (phase >= 3) {
        const fadeOut = Math.min((t - 5.0) / 2.5, 1);
        c.fillStyle = `rgba(3,3,10,${fadeOut})`;
        c.fillRect(0, 0, W(), H());

        if (fadeOut >= 0.99) {
          cancelAnimationFrame(animRef.current);
          onComplete();
          return;
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      particles = makeParticles(200);
    };
    window.addEventListener("resize", onResize);

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "block", cursor: "default",
      }}
    />
  );
}
