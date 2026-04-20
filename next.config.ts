import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    rules: { "*.md": { loaders: ["raw-loader"], as: "*.js" } },
  },
  compiler: {
    styledComponents: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx", "md"],
  allowedDevOrigins: ["192.168.0.38"],

  webpack: (config) => {
    config.module.rules.push({ test: /\.md$/, use: "raw-loader" });
    return config;
  },
};

export default nextConfig;
