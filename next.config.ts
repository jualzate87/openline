import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/openline",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
