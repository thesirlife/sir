/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
			{
        hostname: "sirlifeprod.wpenginepowered.com",
      },
      {
        hostname: "sirlifedev.wpenginepowered.com",
      },
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "sir.local",
      },
      {
        hostname: "sirboxdev.wpenginepowered.com",
      },
    ],
  },
};

export default nextConfig;
