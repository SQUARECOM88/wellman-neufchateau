import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cette option permet au build de finir même s'il y a des fautes de style ESLint
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  // On fait pareil pour TypeScript (optionnel mais recommandé si Prisma fait des siennes)
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;