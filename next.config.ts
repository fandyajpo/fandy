import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server output for the Dockerfile. Vercel injects its own build
  // adapter, and standalone output alongside an adapter fails the build on
  // Next 16.3.x (vercel/next.js#96646), so skip it there.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
