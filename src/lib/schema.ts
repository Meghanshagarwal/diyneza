import { siteConfig, founder, absoluteUrl } from "@/lib/seo";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Person entity for the founder, Meghansh Agarwal. */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": founder.id,
    name: founder.name,
    jobTitle: founder.jobTitle,
    url: founder.url,
    image: founder.image,
    description: founder.description,
    sameAs: [...founder.sameAs],
    knowsAbout: [...founder.knowsAbout],
    worksFor: { "@id": ORG_ID },
    founderOf: { "@id": ORG_ID },
  };
}

/** Organization entity, linked to its founder Person entity. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteConfig.url}/images/logo.png`,
    description: siteConfig.description,
    foundingDate: siteConfig.foundingYear,
    founder: { "@id": founder.id },
    email: siteConfig.email,
    sameAs: [...siteConfig.sameAs],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

/** WebSite entity with a SearchAction for sitelinks search box eligibility. */
export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Combined global graph injected once on every page via the root layout. */
export function globalGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), personSchema()],
  };
}

/** BreadcrumbList from [{name, path}] pairs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Service entity, linked back to the provider Organization. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  /** City/region the service targets — drives local-intent ranking. */
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType || opts.name,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: opts.areaServed
      ? { "@type": "City", name: opts.areaServed, containedInPlace: { "@type": "Country", name: "India" } }
      : "Worldwide",
  };
}

/** WebPage entity referencing the global org/website and primary image. */
export function webPageSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}
