// Central SEO configuration. Keep all site-wide SEO constants here so they stay
// consistent across metadata, sitemap, robots, structured data, and OG images.

export const siteConfig = {
  name: "DIYNEZA",
  legalName: "DIYNEZA",
  // Production domain. Update here if the live domain changes.
  url: "https://diyneza.com",
  title: "DIYNEZA | Unified Restaurant Management Platform",
  description:
    "Everything your restaurant needs in one platform. Streamline POS & billing, live inventory, KDS, QR ordering, and multi-outlet operations.",
  tagline: "The all-in-one operating system for modern restaurants.",
  locale: "en_US",
  twitterHandle: "@diyneza",
  keywords: [
    "restaurant management software",
    "restaurant POS",
    "cloud POS system",
    "restaurant billing software",
    "inventory management for restaurants",
    "kitchen display system",
    "KDS",
    "QR code ordering",
    "tableside ordering",
    "multi-outlet restaurant management",
    "recipe costing software",
    "QSR software",
    "cafe POS",
  ],
  sameAs: [
    "https://twitter.com/diyneza",
    "https://linkedin.com/company/diyneza",
    "https://github.com/diyneza",
  ],
} as const;

// Build an absolute URL from a path (e.g. "/blog" -> "https://diyneza.com/blog").
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
