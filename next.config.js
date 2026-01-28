/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "inrext-backend.vercel.app",
      },
      {
        protocol: "https",
        hostname: "inrext.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v0/public/:path*',
        destination: 'http://localhost:3000/api/v0/public/:path*',
      },
    ];
  },
};

module.exports = nextConfig;