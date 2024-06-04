/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "sirboxdev.wpenginepowered.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
