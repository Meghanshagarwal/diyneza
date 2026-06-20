import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { Target, Heart, Zap, Globe, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Building the Restaurant Operating System",
  description:
    "DIYNEZA is on a mission to give every restaurant one unified platform for POS, inventory, kitchen, and multi-outlet operations. Learn our story.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About DIYNEZA",
    description: "Our mission: one unified operating system for modern restaurants.",
    url: "/about",
    type: "website",
  },
};

const values = [
  { icon: Zap, title: "Speed first", desc: "Restaurants run on seconds. Every feature we ship is obsessively optimized for speed and reliability — even offline." },
  { icon: Heart, title: "Operator obsessed", desc: "We build alongside real restaurant owners, chefs, and cashiers, not in a vacuum. Their workflow drives our roadmap." },
  { icon: Target, title: "One source of truth", desc: "No more stitching 7 tools together. Billing, stock, kitchen, and reporting live in a single connected system." },
  { icon: Globe, title: "Built to scale", desc: "From a single cafe to a 1,000-outlet chain, the same platform grows with you across cities and brands." },
];

const stats = [
  { value: "12,000+", label: "Dining spaces" },
  { value: "30+", label: "Countries" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "<24h", label: "Avg. onboarding" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-16 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              Our story
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              We&apos;re building the operating system for restaurants.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">
              DIYNEZA started with a simple frustration: running a restaurant means juggling a dozen
              disconnected tools — one for billing, another for inventory, a third for the kitchen, and
              spreadsheets to glue it all together. We set out to replace that chaos with one fast,
              reliable, cloud-native platform that any restaurant can run their entire operation on.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-zinc-900 py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-3xl font-extrabold text-primary">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl font-bold">What we believe</h2>
              <p className="mt-3 text-sm text-zinc-400">
                The principles that shape everything we build.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                    <v.icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-900 py-20 text-center">
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-heading text-3xl font-bold">Ready to see it in action?</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Start your 45-day free trial — no credit card required, cancel anytime.
            </p>
            <Link
              href="/contact?intent=trial"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-base font-heading font-semibold text-black transition-all hover:bg-primary-light hover:scale-[1.02] glow-primary"
            >
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
