/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true, // Note: In Next 15+, 'reactCompiler' moved to 'experimental'
  },

  // ✅ ALLOW EXTERNAL IMAGES
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Matches ANY supabase project URL
      },
    ],
  },
};

export default nextConfig;
