import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/real-time-quiz-platform",
        destination: "/projects/qlash",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
