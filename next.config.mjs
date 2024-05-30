/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "sirboxdev.wpenginepowered.com",
      },
    ],
  },
};

export default nextConfig;
