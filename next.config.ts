import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // This allows ALL https images from any domain
      },
    ],
  },
};

export default nextConfig;