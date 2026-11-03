/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    '172.20.10.2',
    '172.26.76.247',
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '172.20.10.2',
      },
      {
        protocol: 'http',
        hostname: '172.26.76.247',
      },
    ],
  },
};

export default nextConfig;