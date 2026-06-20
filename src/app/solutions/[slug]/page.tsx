import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { solutionsData } from "@/data/solutions";
import { CheckCircle2, ArrowRight, Cpu } from "lucide-react";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return solutionsData.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const s = solutionsData.find((x) => x.id === slug);
  if (!s) return { title: "Solution Not Found" };
  const title = `${s.title} POS & Management Software`;
  const description = `${s.description} Run it all on DIYNEZA — POS, inventory, KDS & QR ordering. 45-day free trial, no credit card.`;
  return {
    title,
    description,
    alternates: { canonical: `/solutions/${s.id}` },
    openGraph: { title: `${title} | DIYNEZA`, description, url: `/solutions/${s.id}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SolutionDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const s = solutionsData.find((x) => x.id === slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `${s.title} Management Software`,
          description: s.description,
          path: `/solutions/${s.id}`,
          serviceType: `Restaurant POS for ${s.title}`,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
          { name: s.title, path: `/solutions/${s.id}` },
        ])}
      />
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              {s.subtitle}
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              {s.title} — built on DIYNEZA
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">{s.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-success-custom/10 border border-success-custom/20 px-4 py-1.5">
              <span className="font-heading text-sm font-bold text-success-custom">{s.metric}</span>
              <span className="text-xs text-zinc-500">{s.metricLabel}</span>
            </div>
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

        {/* Features */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-3xl font-bold">Core system features</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {s.features.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hardware */}
        <section className="border-t border-zinc-900 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-3xl font-bold">Recommended hardware</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {s.hardware.map((h) => (
                <span key={h} className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-300">
                  <Cpu className="h-4 w-4 text-primary" /> {h}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Other solutions */}
        <section className="border-t border-zinc-900 py-12">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-heading text-lg font-bold text-zinc-300">Other restaurant types</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {solutionsData.filter((x) => x.id !== s.id).map((o) => (
                <Link key={o.id} href={`/solutions/${o.id}`} className="rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-primary/40 hover:text-white transition-colors">
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-900 py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-heading text-3xl font-bold">Ready to run your {s.title.toLowerCase()} on DIYNEZA?</h2>
            <p className="mt-3 text-sm text-zinc-400">45-day free trial · No credit card required · Cancel anytime.</p>
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
