/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "sirdev.wpenginepowered.com",
      },
    ],
  },
};

export default nextConfig;
