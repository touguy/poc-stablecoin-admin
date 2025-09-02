import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: "/admin",
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // ✅ build 단계에서 ESLint 무시
  },
  sassOptions: {
    includePaths: ["./src/styles"],
  },
};

export default nextConfig;
