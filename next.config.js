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
<<<<<<< HEAD
  async rewrites() {
    const isDevelopment = true;
    
    return [
      {
        source: '/api/v0/public/:path*',
        destination: isDevelopment
          ? 'http://localhost:3000/api/v0/public/:path*'
          : 'https://dashboard.inrext.com/api/v0/public/:path*',
      },
    ];
  },
=======
>>>>>>> 5d57175fde2c8850d9a320ce510187e316660df5
};

module.exports = nextConfig;