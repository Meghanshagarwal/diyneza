import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Blog/OG images are admin-entered remote URLs (any https host), so allow
  // next/image to optimize them regardless of source domain.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async redirects() {
    return [
      // Canonicalize www → non-www (matches the canonical tag https://diyneza.com)
      // so the site isn't served on two duplicate hostnames.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.diyneza.com" }],
        destination: "https://diyneza.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
