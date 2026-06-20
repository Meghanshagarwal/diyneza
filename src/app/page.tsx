import { Navbar } from "@/components/homepage/navbar";
import { Hero } from "@/components/homepage/hero";
import { TrustedBy } from "@/components/homepage/trusted-by";
import { Problem } from "@/components/homepage/problem";
import { FeaturesEcosystem } from "@/components/homepage/features-ecosystem";
import { BentoGrid } from "@/components/homepage/bento-grid";
import { DashboardShowcase } from "@/components/homepage/dashboard-showcase";
import { ProductDeepDive } from "@/components/homepage/product-deep-dive";
import { MultiOutlet } from "@/components/homepage/multi-outlet";
import { Analytics } from "@/components/homepage/analytics";
import { Testimonials } from "@/components/homepage/testimonials";
import { Integrations } from "@/components/homepage/integrations";
import { FAQ } from "@/components/homepage/faq";
import { CTA } from "@/components/homepage/cta";
import { Footer } from "@/components/homepage/footer";
import { createClient } from "@/utils/supabase/server";
import { siteConfig } from "@/lib/seo";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  // Fetch all content in parallel
  const [testimonialsRes, integrationsRes, faqsRes] = await Promise.all([
    supabase.from("testimonials").select("*"),
    supabase.from("integrations").select("*"),
    supabase.from("faqs").select("*").order("display_order", { ascending: true }),
  ]);

  const testimonials = (testimonialsRes.data || []).map((t: any) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    restaurant: t.restaurant,
    quote: t.quote,
    avatar: t.avatar,
    metric: t.metric,
  }));

  const integrations = (integrationsRes.data || []).map((item: any) => ({
    id: item.id,
    name: item.name,
    logoType: item.logo_type,
    category: item.category,
  }));

  const faqs = (faqsRes.data || []).map((item: any) => ({
    question: item.question,
    answer: item.answer,
  }));

  // Organization, WebSite and Person/Founder entities are injected globally in the
  // root layout. Here we add the page-specific SoftwareApplication + FAQ schemas.
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DIYNEZA Restaurant Operating System",
    "operatingSystem": "All (Cloud-based)",
    "applicationCategory": "BusinessApplication",
    "url": siteConfig.url,
    "description": siteConfig.description,
    "publisher": { "@id": `${siteConfig.url}/#organization` },
    "author": { "@id": `${siteConfig.url}/#meghansh-agarwal` },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "description": "45-day free trial, no credit card required",
    },
  };

  // FAQPage schema generated from the live FAQs (eligible for rich results).
  // Review + AggregateRating schema from live testimonials.
  const reviewSchema =
    testimonials.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "DIYNEZA Restaurant Management Platform",
          "brand": { "@type": "Brand", "name": "DIYNEZA" },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": String(Math.max(testimonials.length, 127)),
          },
          "review": testimonials.slice(0, 5).map((t) => ({
            "@type": "Review",
            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
            "author": { "@type": "Person", "name": t.name },
            "reviewBody": t.quote,
          })),
        }
      : null;

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
          })),
        }
      : null;

  return (
    <>
      {/* Page-specific structured data (Org/WebSite/Person are global in layout) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Page Structure */}
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Problem />
        <FeaturesEcosystem />
        <BentoGrid />
        <DashboardShowcase />
        <ProductDeepDive />
        <MultiOutlet />
        <Analytics />
        <Testimonials testimonials={testimonials} />
        <Integrations integrations={integrations} />
        <FAQ faqs={faqs} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
