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
  email: "hello@diyneza.com",
  phone: "+1-555-012-3456",
  foundingYear: "2024",
} as const;

// Founder / author entity — connected to the Organization across every schema,
// the About page, and blog articles to strengthen E-E-A-T and Knowledge Graph signals.
export const founder = {
  name: "Meghansh Agarwal",
  jobTitle: "Founder & CEO",
  url: "https://diyneza.com/about",
  // The canonical Person entity id, referenced via @id from Organization.founder,
  // article authors, and the About ProfilePage.
  id: "https://diyneza.com/#meghansh-agarwal",
  image: "https://diyneza.com/images/logo-mark.png",
  description:
    "Meghansh Agarwal is the founder of DIYNEZA, a unified restaurant management platform. He builds technology that helps restaurants run POS, inventory, kitchen operations, and multi-outlet management from a single system.",
  sameAs: [
    "https://www.linkedin.com/in/meghanshagarwal",
    "https://twitter.com/meghanshagarwal",
    "https://github.com/Meghanshagarwal",
  ],
  knowsAbout: [
    "Restaurant management software",
    "Point of sale systems",
    "Restaurant inventory management",
    "Cloud kitchen operations",
    "SaaS product development",
  ],
} as const;

// Build an absolute URL from a path (e.g. "/blog" -> "https://diyneza.com/blog").
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
