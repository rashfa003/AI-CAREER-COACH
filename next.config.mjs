/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  /* config options here */
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
