import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/useDevUser";

export const metadata: Metadata = {
  title: "Resumify — Build Resumes That Get You Hired",
  description:
    "AI-powered resume builder. Describe yourself in plain English, get an ATS-optimized resume in seconds. Free to start.",
  keywords: "resume builder, AI resume, ATS checker, portfolio builder",
  icons: {
    icon: "/logo.avif",
    shortcut: "/logo.avif",
    apple: "/logo.avif",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.avif" type="image/avif" />
        <link rel="apple-touch-icon" href="/logo.avif" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
