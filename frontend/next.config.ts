import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  experimental: {

    allowedDevOrigins: [
      'localhost:3000',
      '127.0.0.1:3000',
      '0.0.0.0:3000'
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    unoptimized: isDev,
  },
};

export default nextConfig;