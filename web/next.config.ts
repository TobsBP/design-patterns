import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // As demos importam as classes reais de ../creational, ../structural e ../behavioral,
  // então o bundler precisa enxergar a raiz do repositório.
  turbopack: { root: path.join(import.meta.dirname, "..") },
};

export default nextConfig;
