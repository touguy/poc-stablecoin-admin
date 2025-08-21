import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: '/user',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // ✅ build 단계에서 ESLint 무시
  },

};

export default nextConfig;
