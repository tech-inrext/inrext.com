module.exports = {
  // ...existing config...
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'inrext-backend.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'inrext.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};