import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server output for the Dockerfile.
  output: "standalone",
};

export default nextConfig;
