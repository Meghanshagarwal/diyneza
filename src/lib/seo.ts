// Central SEO configuration. Keep all site-wide SEO constants here so they stay
// consistent across metadata, sitemap, robots, structured data, and OG images.

export const siteConfig = {
  name: "DIYNEZA",
  legalName: "DIYNEZA",
  // Production domain. Update here if the live domain changes.
  url: "https://diyneza.com",
  title: "DIYNEZA — Restaurant Management Software & POS | 45-Day Free Trial",
  description:
    "DIYNEZA is the all-in-one restaurant management software: POS & billing, live inventory, KDS, QR ordering, and multi-outlet operations in one platform. Start a 45-day free trial — no credit card, cancel anytime.",
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
    "restaurant POS software",
    "best restaurant management software",
    "restaurant billing software India",
    "cafe billing software",
    "cloud kitchen software",
    "restaurant ERP",
    "Petpooja alternative",
    "POS for restaurants",
    "restaurant order management system",
    "table reservation software",
    "online ordering system for restaurants",
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

export interface FounderProfile {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

// Static fallback rendered when the founders table is empty / unavailable.
// Editable from the admin dashboard once the migration is run.
export const defaultFounders: FounderProfile[] = [
  {
    name: "Meghansh Agarwal",
    role: "Founder & CEO",
    bio: founder.description,
    image: "/images/logo-mark.png",
    linkedin: founder.sameAs[0],
    twitter: founder.sameAs[1],
    github: founder.sameAs[2],
  },
  {
    name: "Roop Jaiswal",
    role: "Co-Founder",
    bio: "Roop Jaiswal is the co-founder of DIYNEZA. He leads product and operations, focused on building reliable, restaurant-grade software that scales from a single outlet to large multi-brand chains.",
    image: "/images/logo-mark.png",
    linkedin: "https://www.linkedin.com/in/roopjaiswal",
    twitter: "https://twitter.com/roopjaiswal",
  },
];

// Build an absolute URL from a path (e.g. "/blog" -> "https://diyneza.com/blog").
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
