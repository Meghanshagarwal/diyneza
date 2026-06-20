import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { siteConfig, defaultFounders, type FounderProfile } from "@/lib/seo";
import { createClient } from "@/utils/supabase/server";
import { Target, Heart, Zap, Globe, ArrowRight } from "lucide-react";

export const revalidate = 0;

const SOCIAL_PATHS = {
  linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

function SocialIcon({ path }: { path: string }) {
  return <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d={path} /></svg>;
}

export const metadata: Metadata = {
  title: "About Us — Building the Restaurant Operating System",
  description:
    "DIYNEZA is on a mission to give every restaurant one unified platform for POS, inventory, kitchen, and multi-outlet operations. Learn our story.",
  alternates: { canonical: "/about" },
  authors: [{ name: "Meghansh Agarwal", url: "https://diyneza.com/about" }],
  openGraph: {
    title: "About DIYNEZA — Founded by Meghansh Agarwal",
    description: "Our mission: one unified operating system for modern restaurants.",
    url: "/about",
    type: "profile",
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

function absolutize(url?: string) {
  if (!url) return undefined;
  return url.startsWith("http") ? url : `${siteConfig.url}${url}`;
}

function founderPersonSchema(f: FounderProfile, index: number) {
  const id = `${siteConfig.url}/#${f.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return {
    "@type": "Person",
    "@id": id,
    name: f.name,
    jobTitle: f.role,
    description: f.bio,
    image: absolutize(f.image),
    url: `${siteConfig.url}/about`,
    sameAs: [f.linkedin, f.twitter, f.github].filter(Boolean),
    [index === 0 ? "founderOf" : "memberOf"]: { "@id": `${siteConfig.url}/#organization` },
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  };
}

export default async function AboutPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("founders")
    .select("*")
    .order("display_order", { ascending: true });

  const founders: FounderProfile[] =
    data && data.length > 0
      ? data.map((f: any) => ({
          name: f.name,
          role: f.role || "",
          bio: f.bio || "",
          image: f.image || "/images/logo-mark.png",
          linkedin: f.linkedin || undefined,
          twitter: f.twitter || undefined,
          github: f.github || undefined,
        }))
      : defaultFounders;

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString().slice(0, 10),
    mainEntity: founders.map((f, i) => founderPersonSchema(f, i)),
    about: { "@id": `${siteConfig.url}/#organization` },
    url: `${siteConfig.url}/about`,
  };

  return (
    <>
      <JsonLd data={profilePageSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
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

        {/* Founders */}
        <section className="border-t border-zinc-900 py-20">
          <div className="mx-auto max-w-5xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              Leadership
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold">
              {founders.length > 1 ? "Meet the founders" : "Meet the founder"}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {founders.map((f) => {
                const socials = [
                  { href: f.linkedin, label: "LinkedIn", path: SOCIAL_PATHS.linkedin },
                  { href: f.twitter, label: "Twitter", path: SOCIAL_PATHS.twitter },
                  { href: f.github, label: "GitHub", path: SOCIAL_PATHS.github },
                ].filter((s) => s.href);
                return (
                  <div
                    key={f.name}
                    className="flex flex-col gap-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/20 p-8 sm:flex-row sm:items-start"
                  >
                    <img
                      src={f.image || "/images/logo-mark.png"}
                      alt={`${f.name}, ${f.role} of DIYNEZA`}
                      width={96}
                      height={96}
                      className="h-24 w-24 shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/40 object-cover"
                    />
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">{f.name}</h3>
                      <p className="mt-1 text-sm font-semibold text-primary">{f.role}, DIYNEZA</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.bio}</p>
                      {socials.length > 0 && (
                        <div className="mt-4 flex items-center gap-4">
                          {socials.map((s) => (
                            <a
                              key={s.label}
                              href={s.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${f.name} on ${s.label}`}
                              className="text-zinc-500 hover:text-primary transition-colors"
                            >
                              <SocialIcon path={s.path} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
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
