
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'github.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Memastikan output stabil untuk deployment
  poweredByHeader: false,
};

export default nextConfig;
