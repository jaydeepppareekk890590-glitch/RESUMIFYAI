import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "www.gstatic.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "img.clerk.com" },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
