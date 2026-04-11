"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";

export default function GlobalLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg)", // #050508 matching global bg
        position: "fixed",
        inset: 0,
        zIndex: 9999,
      }}
    >
      <div style={{ width: 140, height: 140 }}>
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <div
        style={{
          marginTop: -10,
          fontFamily: "Outfit,sans-serif",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "rgba(255,255,255,0.7)",
          textTransform: "uppercase",
        }}
      >
        Loading...
      </div>
    </div>
  );
}
