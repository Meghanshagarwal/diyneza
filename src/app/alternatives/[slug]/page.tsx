import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/seo";
import { competitors, getCompetitor, diynezaHighlights, comparisonRows } from "@/data/competitors";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) return { title: "Alternative Not Found" };

  const title = `${c.name} Alternative — DIYNEZA Restaurant Management`;
  // Kept concise so the snippet isn't truncated in SERPs (~150 chars).
  const description = `Looking for a ${c.name} alternative? DIYNEZA gives restaurants POS, billing, inventory, KDS & commission-free QR ordering. 45-day free trial.`;
  return {
    title,
    description,
    alternates: { canonical: `/alternatives/${c.slug}` },
    openGraph: { title, description, url: `/alternatives/${c.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AlternativePage({ params }: RouteParams) {
  const { slug } = await params;
  const c = getCompetitor(slug);
  if (!c) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const otherCompetitors = competitors.filter((x) => x.slug !== c.slug);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Alternatives", path: "/alternatives" },
          { name: `${c.name} Alternative`, path: `/alternatives/${c.slug}` },
        ])}
      />
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              {c.name} Alternative
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              The all-in-one {c.name} alternative for restaurants
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">
              {c.blurb}
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

        {/* Why switch */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-3xl font-bold">Why restaurants choose DIYNEZA over {c.name}</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {c.switchReasons.map((r) => (
                <div key={r.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-6">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-heading text-lg font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="border-t border-zinc-900 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-heading text-3xl font-bold text-center">DIYNEZA vs {c.name}</h2>
            <p className="mt-3 text-center text-sm text-zinc-500">Feature-by-feature at a glance.</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/40 text-left">
                    <th className="px-4 py-3 font-heading font-semibold text-zinc-300">Feature</th>
                    <th className="px-4 py-3 text-center font-heading font-bold text-primary">DIYNEZA</th>
                    <th className="px-4 py-3 text-center font-heading font-semibold text-zinc-400">{c.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={i % 2 ? "bg-zinc-900/10" : ""}>
                      <td className="px-4 py-3 text-zinc-300">{row.feature}</td>
                      <td className="px-4 py-3 text-center">
                        <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-zinc-500">{row.competitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-zinc-600">
              {c.name} feature availability varies by plan — confirm current details on their official site. Comparison reflects DIYNEZA&apos;s standard capabilities.
            </p>
          </div>
        </section>

        {/* Capabilities checklist */}
        <section className="border-t border-zinc-900 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-heading text-3xl font-bold text-center">What you get with DIYNEZA</h2>
            <p className="mt-3 text-center text-sm text-zinc-500">
              Everything your restaurant needs in one platform — compare against your current {c.name} setup.
            </p>
            <ul className="mt-10 space-y-3">
              {diynezaHighlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-zinc-300">{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-zinc-600">
              Feature availability on {c.name} varies by plan — always confirm current details on their official site.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-zinc-900 py-16">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="font-heading text-3xl font-bold">{c.name} alternative — FAQs</h2>
            <div className="mt-8 space-y-6">
              {c.faqs.map((f) => (
                <div key={f.question}>
                  <h3 className="font-heading text-base font-bold text-white">{f.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other alternatives (internal linking) */}
        <section className="border-t border-zinc-900 py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-lg font-bold text-zinc-300">Compare other alternatives</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {otherCompetitors.map((o) => (
                <Link
                  key={o.slug}
                  href={`/alternatives/${o.slug}`}
                  className="rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-primary/40 hover:text-white transition-colors"
                >
                  {o.name} alternative
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-900 py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-heading text-3xl font-bold">Switch to DIYNEZA today</h2>
            <p className="mt-3 text-sm text-zinc-400">
              45-day free trial · No credit card required · Cancel anytime. We migrate your menu &amp; data for you.
            </p>
            <Link href="/contact?intent=trial" className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-base font-heading font-semibold text-black transition-all hover:bg-primary-light hover:scale-[1.02] glow-primary">
              <span>Start free trial</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
