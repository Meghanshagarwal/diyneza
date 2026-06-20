import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { Home, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

const links = [
  { name: "Products", href: "/products" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Journal", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-dark-bg text-white flex items-center justify-center py-24">
        <div className="mx-auto max-w-xl px-6 text-center">
          <span className="font-heading text-7xl font-extrabold text-primary">404</span>
          <h1 className="mt-4 font-heading text-3xl font-bold">This page took a smoke break.</h1>
          <p className="mt-3 text-sm text-zinc-400">
            The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back on track.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-heading font-semibold text-black hover:bg-primary-light glow-primary">
              <Home className="h-4 w-4" /> Back to home
            </Link>
            <Link href="/contact?intent=demo" className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-heading font-medium text-white hover:bg-zinc-800">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-full border border-zinc-800 bg-zinc-900/40 px-4 py-1.5 text-xs font-medium text-zinc-300 hover:border-primary/40 hover:text-white transition-colors">
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
