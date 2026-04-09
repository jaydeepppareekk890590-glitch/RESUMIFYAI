"use client";
import { useEffect, useRef } from "react";

interface GlowingFishProps {
  count?: number;
  className?: string;
}

export default function GlowingFish({ count = 1, className = "" }: GlowingFishProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    const resize = () => {
      canvas.width = canvas.offsetWidth || 500;
      canvas.height = canvas.offsetHeight || 500;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── realistic neon fish drawer ──
    function drawNeonFish(
      fx: number, fy: number,
      angle: number, size: number,
      t: number, hue: number,
      flip: boolean
    ) {
      c.save();
      c.translate(fx, fy);
      c.rotate(angle);
      if (flip) c.scale(1, -1);

      const L = size;
      const H = L * 0.21;
      const wave = Math.sin(t * 3.5) * 0.18; // body flex

      // ── outer ambient glow ──
      const aura = c.createRadialGradient(0, 0, 0, 0, 0, L * 0.85);
      aura.addColorStop(0, `hsla(${hue - 10}, 100%, 65%, 0.18)`);
      aura.addColorStop(0.5, `hsla(${hue + 60}, 100%, 60%, 0.08)`);
      aura.addColorStop(1, "transparent");
      c.fillStyle = aura;
      c.beginPath();
      c.ellipse(0, 0, L * 0.85, L * 0.55, 0, 0, Math.PI * 2);
      c.fill();

      // ── TAIL FIN (caudal - forked) ──
      const tx = -L * 0.5;
      const tailSway = wave * H * 2.5;

      // Upper lobe
      c.beginPath();
      c.moveTo(tx, 0);
      c.bezierCurveTo(tx - L * 0.08, -H * 0.3 + tailSway, tx - L * 0.35, -H * 1.6 + tailSway * 1.4, tx - L * 0.25, -H * 1.85 + tailSway * 1.5);
      c.bezierCurveTo(tx - L * 0.18, -H * 1.65 + tailSway, tx - L * 0.05, -H * 0.5, tx, 0);

      const tg1 = c.createLinearGradient(tx - L * 0.25, -H * 1.8, tx, 0);
      tg1.addColorStop(0, `hsla(${hue + 160}, 100%, 70%, 0.1)`);
      tg1.addColorStop(0.6, `hsla(${hue + 120}, 100%, 65%, 0.45)`);
      tg1.addColorStop(1, `hsla(${hue}, 100%, 65%, 0.75)`);
      c.fillStyle = tg1;
      c.shadowColor = `hsl(${hue + 120}, 100%, 65%)`;
      c.shadowBlur = 14;
      c.fill();

      // Tail ray lines - upper
      c.save();
      c.globalAlpha = 0.4;
      for (let r = 0; r < 4; r++) {
        const frac = r / 4;
        c.beginPath();
        c.moveTo(tx, 0);
        c.lineTo(tx - L * 0.25 + frac * L * 0.05, -H * (0.8 + frac * 1.0) + tailSway * (0.5 + frac));
        c.strokeStyle = `hsla(${hue + 130}, 100%, 75%, 0.6)`;
        c.lineWidth = 0.7;
        c.stroke();
      }
      c.restore();

      // Lower lobe
      c.beginPath();
      c.moveTo(tx, 0);
      c.bezierCurveTo(tx - L * 0.08, H * 0.3 + tailSway, tx - L * 0.35, H * 1.6 + tailSway * 1.4, tx - L * 0.25, H * 1.85 + tailSway * 1.5);
      c.bezierCurveTo(tx - L * 0.18, H * 1.65 + tailSway, tx - L * 0.05, H * 0.5, tx, 0);
      c.fillStyle = tg1;
      c.shadowBlur = 14;
      c.fill();

      // Lower ray lines
      c.save();
      c.globalAlpha = 0.4;
      for (let r = 0; r < 4; r++) {
        const frac = r / 4;
        c.beginPath();
        c.moveTo(tx, 0);
        c.lineTo(tx - L * 0.25 + frac * L * 0.05, H * (0.8 + frac * 1.0) + tailSway * (0.5 + frac));
        c.strokeStyle = `hsla(${hue + 130}, 100%, 75%, 0.6)`;
        c.lineWidth = 0.7;
        c.stroke();
      }
      c.restore();

      // ── MAIN BODY ──
      c.beginPath();
      // Head point (right)
      c.moveTo(L * 0.47, 0);
      // Top edge - head to dorsal hump then taper to caudal
      c.bezierCurveTo(L * 0.38, -H * 0.55, L * 0.15, -H, -L * 0.1, -H);
      c.bezierCurveTo(-L * 0.3, -H, -L * 0.45, -H * 0.55, -L * 0.5, -H * 0.15);
      // Tail join
      c.lineTo(-L * 0.5, H * 0.15);
      // Bottom edge
      c.bezierCurveTo(-L * 0.45, H * 0.55, -L * 0.3, H, -L * 0.1, H);
      c.bezierCurveTo(L * 0.15, H, L * 0.38, H * 0.55, L * 0.47, 0);
      c.closePath();

      // Body fill — neon X-ray style: bright stripe + glowing edges
      const bg = c.createLinearGradient(0, -H, 0, H);
      bg.addColorStop(0, `hsla(${hue + 210}, 100%, 72%, 0.38)`);
      bg.addColorStop(0.25, `hsla(${hue + 185}, 100%, 68%, 0.55)`);
      bg.addColorStop(0.5, `hsla(${hue - 35}, 100%, 72%, 1.0)`); // bright neon stripe
      bg.addColorStop(0.75, `hsla(${hue + 185}, 100%, 68%, 0.55)`);
      bg.addColorStop(1, `hsla(${hue + 210}, 100%, 72%, 0.38)`);
      c.shadowColor = `hsl(${hue - 30}, 100%, 65%)`;
      c.shadowBlur = 22;
      c.fillStyle = bg;
      c.fill();

      // Body stroke — bright neon outline
      c.strokeStyle = `hsla(${hue + 180}, 100%, 80%, 0.7)`;
      c.lineWidth = 1.2;
      c.shadowColor = `hsl(${hue + 180}, 100%, 75%)`;
      c.shadowBlur = 12;
      c.stroke();

      // ── LATERAL LINE (iridescent neon stripe) ──
      c.beginPath();
      c.moveTo(L * 0.38, H * 0.02);
      c.bezierCurveTo(L * 0.2, H * 0.06, -L * 0.1, -H * 0.06, -L * 0.45, H * 0.02);
      c.strokeStyle = `hsla(${hue - 45}, 100%, 78%, 0.95)`;
      c.lineWidth = H * 0.3;
      c.lineCap = "round";
      c.shadowColor = `hsl(${hue - 45}, 100%, 72%)`;
      c.shadowBlur = 16;
      c.stroke();

      // ── DORSAL FIN (top) ──
      c.beginPath();
      c.moveTo(-L * 0.05, -H);
      c.bezierCurveTo(L * 0.02, -H * 1.58, L * 0.18, -H * 1.85, L * 0.26, -H * 1.72);
      c.bezierCurveTo(L * 0.32, -H * 1.4, L * 0.22, -H * 1.12, L * 0.08, -H);
      c.closePath();

      const dg = c.createLinearGradient(L * 0.05, -H * 1.8, L * 0.05, -H);
      dg.addColorStop(0, `hsla(${hue + 180}, 100%, 75%, 0.1)`);
      dg.addColorStop(1, `hsla(${hue + 170}, 100%, 68%, 0.6)`);
      c.fillStyle = dg;
      c.shadowColor = `hsl(${hue + 175}, 100%, 70%)`;
      c.shadowBlur = 10;
      c.fill();

      // Dorsal fin rays
      c.save();
      c.globalAlpha = 0.5;
      for (let r = 0; r < 5; r++) {
        const frac = r / 5;
        const bx = -L * 0.05 + frac * L * 0.13;
        const by = -H;
        const tx2 = -L * 0.05 + L * 0.31 * frac;
        const ty2 = -H * (1 + (1 - frac) * 0.85);
        c.beginPath();
        c.moveTo(bx, by);
        c.lineTo(tx2, ty2);
        c.strokeStyle = `hsla(${hue + 180}, 100%, 80%, 0.7)`;
        c.lineWidth = 0.6;
        c.stroke();
      }
      c.restore();

      // ── PECTORAL FIN ──
      c.beginPath();
      c.moveTo(L * 0.12, H * 0.08);
      c.bezierCurveTo(L * 0.22, H * 0.5, L * 0.38, H * 0.85, L * 0.32, H * 1.05);
      c.bezierCurveTo(L * 0.22, H * 0.95, L * 0.08, H * 0.55, L * 0.12, H * 0.08);
      const pg = c.createLinearGradient(L * 0.12, H * 0.1, L * 0.32, H * 1.0);
      pg.addColorStop(0, `hsla(${hue + 200}, 100%, 78%, 0.65)`);
      pg.addColorStop(1, `hsla(${hue + 170}, 100%, 70%, 0.08)`);
      c.fillStyle = pg;
      c.shadowColor = `hsl(${hue + 195}, 100%, 75%)`;
      c.shadowBlur = 8;
      c.fill();

      // ── VENTRAL FIN ──
      c.beginPath();
      c.moveTo(-L * 0.1, H);
      c.bezierCurveTo(-L * 0.04, H * 1.45, L * 0.04, H * 1.55, L * 0.06, H * 1.35);
      c.bezierCurveTo(L * 0.06, H * 1.1, -L * 0.04, H * 1.0, -L * 0.1, H);
      const vg = c.createLinearGradient(-L * 0.1, H, L * 0.06, H * 1.5);
      vg.addColorStop(0, `hsla(${hue + 200}, 100%, 72%, 0.5)`);
      vg.addColorStop(1, `hsla(${hue + 170}, 100%, 70%, 0.05)`);
      c.fillStyle = vg;
      c.shadowBlur = 6;
      c.fill();

      // ── SPINE (X-ray detail) ──
      c.beginPath();
      c.moveTo(L * 0.44, 0);
      c.bezierCurveTo(L * 0.25, H * 0.04, -L * 0.2, -H * 0.06, -L * 0.48, 0);
      c.strokeStyle = `hsla(${hue + 15}, 100%, 88%, 0.45)`;
      c.lineWidth = 0.8;
      c.shadowBlur = 4;
      c.stroke();

      // ── RIB DETAILS ──
      c.save();
      c.globalAlpha = 0.2;
      for (let r = 0; r < 7; r++) {
        const rx = L * (0.35 - r * 0.12);
        c.beginPath();
        c.moveTo(rx, -H * 0.5);
        c.lineTo(rx + L * 0.02, H * 0.5);
        c.strokeStyle = `hsla(${hue + 20}, 100%, 85%, 0.8)`;
        c.lineWidth = 0.5;
        c.stroke();
      }
      c.restore();

      // ── EYE ──
      const ex = L * 0.33;
      const ey = -H * 0.08;
      const er = H * 0.24;
      // Eye glow ring
      c.beginPath();
      c.arc(ex, ey, er * 1.4, 0, Math.PI * 2);
      const eyeGlow = c.createRadialGradient(ex, ey, er * 0.5, ex, ey, er * 1.4);
      eyeGlow.addColorStop(0, `hsla(${hue + 200}, 100%, 75%, 0.5)`);
      eyeGlow.addColorStop(1, "transparent");
      c.fillStyle = eyeGlow;
      c.shadowBlur = 0;
      c.fill();
      // Sclera
      c.beginPath();
      c.arc(ex, ey, er, 0, Math.PI * 2);
      c.fillStyle = "rgba(210,245,255,0.95)";
      c.shadowColor = "rgba(100,220,255,0.9)";
      c.shadowBlur = 14;
      c.fill();
      // Iris
      c.beginPath();
      c.arc(ex + er * 0.08, ey, er * 0.62, 0, Math.PI * 2);
      c.fillStyle = `hsla(${hue + 200}, 80%, 25%, 0.95)`;
      c.shadowBlur = 0;
      c.fill();
      // Pupil
      c.beginPath();
      c.arc(ex + er * 0.1, ey, er * 0.35, 0, Math.PI * 2);
      c.fillStyle = "rgba(2,2,15,0.98)";
      c.fill();
      // Specular highlight
      c.beginPath();
      c.arc(ex - er * 0.12, ey - er * 0.2, er * 0.18, 0, Math.PI * 2);
      c.fillStyle = "rgba(255,255,255,0.95)";
      c.fill();

      // ── SCALE PATTERN (subtle shimmer) ──
      c.save();
      c.globalAlpha = 0.12;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 6; col++) {
          const sx = L * 0.3 - col * L * 0.14;
          const sy = -H * 0.55 + row * H * 0.55;
          if (sx < -L * 0.45 || sx > L * 0.4) continue;
          c.beginPath();
          c.arc(sx + (row % 2) * L * 0.07, sy, H * 0.2, 0, Math.PI);
          c.strokeStyle = `hsla(${hue + 160}, 100%, 85%, 1)`;
          c.lineWidth = 0.8;
          c.stroke();
        }
      }
      c.restore();

      c.restore();
    }

    // ── Fish state objects ──
    const W = () => canvas.width;
    const H2 = () => canvas.height;

    const fishes = Array.from({ length: count }, (_, i) => ({
      x: W() * (count === 1 ? 0.5 : 0.3 + i * 0.4),
      y: H2() * (count === 1 ? 0.5 : 0.35 + i * 0.3),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 0.9,
      angle: 0,
      size: count === 1 ? 62 : 48,
      pathT: Math.random() * Math.PI * 2,
      pathSpeed: 0.003 + i * 0.0015,
      phase: i * Math.PI,
      hue: 280 + i * 130, // violet for 1st, green-cyan for 2nd
    }));

    const startTime = performance.now();

    function animate() {
      const now = performance.now();
      const t = (now - startTime) / 1000;

      c.clearRect(0, 0, W(), H2());

      fishes.forEach((fish, fi) => {
        // Lissajous figure-8 path
        fish.pathT += fish.pathSpeed;
        const tw = fish.pathT;
        const margin = fish.size * 1.5;
        const cx = W() / 2 + Math.sin(tw * 1.3 + fish.phase) * (W() * 0.35 - margin);
        const cy = H2() / 2 + Math.sin(tw * 0.71 + fish.phase) * (H2() * 0.35 - margin);

        fish.vx += (cx - fish.x) * 0.009;
        fish.vy += (cy - fish.y) * 0.009;
        fish.vx *= 0.92;
        fish.vy *= 0.92;
        fish.x += fish.vx;
        fish.y += fish.vy;

        const speed = Math.sqrt(fish.vx ** 2 + fish.vy ** 2);
        if (speed > 0.05) {
          const target = Math.atan2(fish.vy, fish.vx);
          let diff = target - fish.angle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          fish.angle += diff * 0.1;
        }

        // Rainbow hue cycle
        const hue = (fish.hue + t * 30) % 360;
        // Flip second fish vertically for variety
        const flip = fi % 2 === 1;
        drawNeonFish(fish.x, fish.y, fish.angle, fish.size, t + fi * 2, hue, flip);
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
