import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema, localBusinessSchema } from "@/lib/schema";
import { cities, getCity } from "@/data/cities";
import { diynezaHighlights } from "@/data/competitors";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface RouteParams {
  params: Promise<{ city: string }>;
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return { title: "City Not Found" };
  const title = `Restaurant POS Software in ${c.name}`;
  const description = `DIYNEZA is the all-in-one restaurant POS & management software for restaurants in ${c.name} — billing, inventory, KDS & commission-free QR ordering. 45-day free trial, no credit card.`;
  return {
    title,
    description,
    alternates: { canonical: `/restaurant-pos/${c.slug}` },
    openGraph: { title: `${title} | DIYNEZA`, description, url: `/restaurant-pos/${c.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CityPage({ params }: RouteParams) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const faqs = [
    {
      q: `What is the best restaurant POS software in ${c.name}?`,
      a: `DIYNEZA is an all-in-one restaurant POS for ${c.name} covering billing, inventory, KDS and commission-free QR ordering — with offline-first reliability and a 45-day free trial.`,
    },
    {
      q: `Does DIYNEZA work for restaurants in ${c.name}?`,
      a: `Yes. DIYNEZA is cloud-based and works for cafes, QSR chains, fine dining and cloud kitchens across ${c.name}, with remote onboarding in under 24 hours.`,
    },
    {
      q: `Is there a free trial for restaurants in ${c.name}?`,
      a: `Yes — a 45-day free trial with no credit card required, cancel anytime.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={serviceSchema({
          name: `Restaurant POS Software in ${c.name}`,
          description: `All-in-one restaurant POS & management software for ${c.name}.`,
          path: `/restaurant-pos/${c.slug}`,
          serviceType: "Restaurant POS software",
          areaServed: c.name,
        })}
      />
      <JsonLd data={localBusinessSchema({ city: c.name, path: `/restaurant-pos/${c.slug}` })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Restaurant POS", path: "/restaurant-pos" },
          { name: c.name, path: `/restaurant-pos/${c.slug}` },
        ])}
      />
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              Restaurant POS in {c.name}
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Restaurant POS &amp; management software in {c.name}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">
              Run your {c.name} restaurant on one platform — POS &amp; billing, live inventory, kitchen
              display and commission-free QR ordering. Built for cafes, QSR chains, fine dining and
              cloud kitchens.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?intent=trial" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-base font-heading font-semibold text-black transition-all hover:bg-primary-light hover:scale-[1.02] glow-primary">
                <span>Start 45-day free trial</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact?intent=demo" className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-7 py-3 text-base font-heading font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-500">
                <span>Book a demo</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-heading text-3xl font-bold text-center">Why {c.name} restaurants choose DIYNEZA</h2>
            <ul className="mt-10 space-y-3">
              {diynezaHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-zinc-300">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-zinc-900 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-heading text-3xl font-bold">Restaurant POS in {c.name} — FAQs</h2>
            <div className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-heading text-base font-bold text-white">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-900 py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-lg font-bold text-zinc-300">Available in other cities</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {cities.filter((x) => x.slug !== c.slug).map((o) => (
                <Link key={o.slug} href={`/restaurant-pos/${o.slug}`} className="rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-primary/40 hover:text-white transition-colors">
                  {o.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
