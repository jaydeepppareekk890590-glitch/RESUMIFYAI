import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050508",
        surface: "#0a0a0f",
        surface2: "#0f0f18",
        border: "rgba(255,255,255,0.06)",
        violet: "#7c3aed",
        violet2: "#6d28d9",
        violet3: "#a78bfa",
        "violet-dim": "rgba(124,58,237,0.12)",
        green: "#22c55e",
        "green-dim": "rgba(34,197,94,0.12)",
        muted: "rgba(255,255,255,0.4)",
        danger: "#f87171",
        warning: "#fbbf24",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        "rainbow-spin": "rainbow-spin 3s linear infinite",
        "fish-swim": "fish-swim 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fog-merge": "fog-merge 2s ease-out forwards",
        "text-materialize": "text-materialize 1s ease-out forwards",
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "rainbow-spin": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fog-merge": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "text-materialize": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
