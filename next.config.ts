import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Openline",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
