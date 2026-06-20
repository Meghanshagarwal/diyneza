import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { PricingClient } from "./pricing-client";
import { type PricingPlan } from "@/data/pricing";
import { siteConfig } from "@/lib/seo";

// Opt-out of static caching to make sure pricing changes are reflected immediately
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pricing — Simple Plans for Every Restaurant",
  description:
    "Transparent DIYNEZA pricing. Pick a plan for your cafe, QSR, or multi-outlet chain — POS, inventory, KDS, and QR ordering included. Start a free trial.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "DIYNEZA Pricing — Simple Plans for Every Restaurant",
    description:
      "Transparent pricing for POS, inventory, KDS, and QR ordering. Start your free trial.",
    url: "/pricing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYNEZA Pricing",
    description:
      "Transparent pricing for POS, inventory, KDS, and QR ordering.",
  },
};

export default async function PricingPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("pricing_plans")
    .select("*")
    .eq("visible", true);

  let plans: PricingPlan[] = [];

  if (data && !error) {
    // Map database snake_case fields to frontend camelCase fields
    plans = data.map((plan: any) => ({
      id: plan.id,
      name: plan.name,
      priceMonthly: plan.price_monthly,
      priceAnnual: plan.price_annual,
      description: plan.description,
      features: plan.features || [],
      popular: plan.popular || false,
      ctaText: plan.cta_text || "Start Free Trial",
    }));

    // Ensure they are ordered (e.g. Starter -> Growth -> Enterprise)
    // Starter: ~39, Growth: ~99, Enterprise: 0 (or by order)
    plans.sort((a, b) => {
      if (a.name.toLowerCase() === "starter") return -1;
      if (b.name.toLowerCase() === "starter") return 1;
      if (a.name.toLowerCase() === "enterprise") return 1;
      if (b.name.toLowerCase() === "enterprise") return -1;
      return a.priceMonthly - b.priceMonthly;
    });
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} Restaurant Management Platform`,
    description: siteConfig.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.priceMonthly,
      priceCurrency: "USD",
      url: `${siteConfig.url}/pricing`,
      availability: "https://schema.org/InStock",
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pricing",
        item: `${siteConfig.url}/pricing`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <PricingClient plans={plans} />
      <Footer />
    </>
  );
}
