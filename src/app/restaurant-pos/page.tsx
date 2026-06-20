import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { cities } from "@/data/cities";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Restaurant POS Software by City",
  description:
    "DIYNEZA restaurant POS & management software, available across India. Find your city — billing, inventory, KDS & commission-free QR ordering with a 45-day free trial.",
  alternates: { canonical: "/restaurant-pos" },
  openGraph: { title: "Restaurant POS Software by City | DIYNEZA", description: "DIYNEZA restaurant POS across India.", url: "/restaurant-pos", type: "website" },
};

export default function RestaurantPosIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Restaurant POS", path: "/restaurant-pos" }])} />
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white">
        <section className="relative overflow-hidden border-b border-zinc-900 pt-20 pb-14 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-3xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">By location</span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">Restaurant POS software by city</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 leading-relaxed">
              DIYNEZA powers restaurants across India. Pick your city to learn more, or start your 45-day free trial today.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {cities.map((c) => (
              <Link key={c.slug} href={`/restaurant-pos/${c.slug}`} className="group flex items-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/20 px-4 py-4 transition-all hover:border-primary/30 hover:bg-zinc-900/40">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-zinc-200 group-hover:text-white">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
