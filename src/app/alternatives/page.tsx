import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { competitors } from "@/data/competitors";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant POS Alternatives & Comparisons",
  description:
    "Compare DIYNEZA with popular restaurant POS and management platforms. See why restaurants switch — all-in-one POS, inventory, KDS & commission-free QR ordering with a 45-day free trial.",
  alternates: { canonical: "/alternatives" },
  openGraph: {
    title: "Restaurant POS Alternatives & Comparisons | DIYNEZA",
    description: "See how DIYNEZA compares to popular restaurant management platforms.",
    url: "/alternatives",
    type: "website",
  },
};

export default function AlternativesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Alternatives", path: "/alternatives" },
        ])}
      />
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white">
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              Comparisons
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              DIYNEZA vs the alternatives
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">
              Thinking of switching your restaurant POS? See how DIYNEZA compares — one platform for
              POS, billing, inventory, KDS and commission-free QR ordering, with a 45-day free trial.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {competitors.map((c) => (
              <Link
                key={c.slug}
                href={`/alternatives/${c.slug}`}
                className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-7 transition-all hover:border-primary/30 hover:bg-zinc-900/40"
              >
                <h2 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {c.name} Alternative
                </h2>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  See the comparison <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
