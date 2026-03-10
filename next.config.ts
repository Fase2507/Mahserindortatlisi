import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow running dev server from non-localhost origins (e.g. VM / LAN IP)
  // See: Next.js warning about allowedDevOrigins in future major versions.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",

  ],
};

export default nextConfig;
