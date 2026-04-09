"use client";
import React from "react";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "green" | "danger";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
}

export default function RainbowButton({
  variant = "primary",
  size = "md",
  as = "button",
  href,
  children,
  className = "",
  ...props
}: RainbowButtonProps) {
  const variantClass = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    green: "btn-green",
    danger: "bg-red-900/40",
  }[variant];

  const sizeClass = {
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
  }[size];

  const cls = `btn-rainbow ${variantClass} ${sizeClass} ${className}`;

  if (as === "a") {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
