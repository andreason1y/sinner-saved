/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Default is `true` but make it explicit — gzips HTML/CSS/JS at the edge.
  compress: true,
  // Drop the `X-Powered-By` header (cuts a few bytes per response).
  poweredByHeader: false,

  images: {
    // Prefer AVIF (~30% smaller than WebP), fall back to WebP.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 24h instead of the 60s default — fewer
    // re-encodes and faster repeat visits.
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  experimental: {
    // Tree-shakes per-icon / per-export so we don't ship the whole library.
    // Big win for `framer-motion` (full bundle ~50 kB gz) and `lucide-react`.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
