import type { Metadata } from "next";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { CheckCircle2, ShieldCheck, Database, LayoutGrid, Smartphone, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Modules & Products Overview",
  description: "Explore the core modules of DIYNEZA: Cloud POS terminals, real-time recipe inventory management, Kitchen KDS, QR ordering, and franchise reporting.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "DIYNEZA | Modules & Products Overview",
    description: "Cloud POS, recipe inventory, Kitchen KDS, QR ordering, and franchise reporting — all in one platform.",
    url: "/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYNEZA Modules & Products",
    description: "Cloud POS, recipe inventory, Kitchen KDS, QR ordering, and franchise reporting.",
  },
};

export default function ProductsPage() {
  const products = [
    {
      id: "pos",
      name: "Point of Sale & Billing",
      desc: "Fast counter billing terminals that process orders in seconds, even if your internet goes down.",
      icon: ShieldCheck,
      features: [
        "Offline-first billing architecture",
        "Split bills & multi-UPI payment integrations",
        "Customizable quick-keys menu layout",
        "Auto-sync transactions once online",
      ],
      badge: "High Throughput",
      visual: (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4 shadow-xl">
          <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-3">
            <span className="font-heading font-bold text-zinc-300">Terminal #01 (Main Counter)</span>
            <span className="h-2 w-2 rounded-full bg-success-custom animate-pulse" />
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-zinc-400">
              <span>2x Espresso (Double Shot)</span>
              <span>$7.00</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>1x Almond Croissant (Warm)</span>
              <span>$4.50</span>
            </div>
            <div className="flex justify-between text-zinc-400 border-t border-zinc-900 pt-2 font-bold text-white">
              <span>Total</span>
              <span className="text-primary">$11.50</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <span className="rounded border border-zinc-800 bg-zinc-900/60 p-2 text-center text-zinc-300 font-semibold cursor-pointer">Card Pay</span>
            <span className="rounded bg-primary text-black p-2 text-center font-semibold cursor-pointer">Settle (Cash)</span>
          </div>
        </div>
      ),
    },
    {
      id: "inventory",
      name: "Recipe Inventory & Costing",
      desc: "Automatically deduct raw ingredient stock down to the gram as bills are cleared on your POS terminal.",
      icon: Database,
      features: [
        "Recipe card stock integration",
        "Automated vendor Purchase Orders (PO)",
        "Wastage logging and quality reports",
        "Live ingredient profit margin metrics",
      ],
      badge: "Margin Optimization",
      visual: (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4 shadow-xl">
          <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-3">
            <span className="font-heading font-bold text-zinc-300">Ingredient Stock Tracker</span>
            <span className="text-xs text-primary font-bold">Live Inventory</span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-300">Espresso Beans (Organic)</span>
                <span className="text-zinc-500">12.4 kg remaining</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full">
                <div className="h-full w-2/3 bg-success-custom rounded-full" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-300">Fresh Whole Milk</span>
                <span className="text-red-500 font-semibold">1.5 L left (Alert)</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full">
                <div className="h-full w-[12%] bg-red-500 rounded-full" />
              </div>
            </div>
          </div>
          <div className="rounded bg-zinc-900/50 border border-zinc-800 p-2.5 text-[9px] text-zinc-400">
            Auto PO generated: <span className="text-zinc-200">2 cases Whole Milk</span> to Supplier.
          </div>
        </div>
      ),
    },
    {
      id: "kds",
      name: "Kitchen Display System (KDS)",
      desc: "Eliminate paper ticket errors. Route custom orders directly to prepare stations with active timer clocks.",
      icon: LayoutGrid,
      features: [
        "Automatic grid routing by food station",
        "Custom item-timer warnings",
        "Server alert notification",
        "Franchise prep-time analytics",
      ],
      badge: "Kitchen Speed",
      visual: (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4 shadow-xl">
          <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-3">
            <span className="font-heading font-bold text-zinc-300">Station: Kitchen Hot Line</span>
            <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] text-amber-500">2 Active Tickets</span>
          </div>
          <div className="rounded border border-zinc-900 bg-zinc-900/20 p-3 space-y-2 text-xs">
            <div className="flex justify-between items-center text-[10px] text-zinc-500">
              <span>TICKET #189</span>
              <span className="text-red-500 font-semibold">5:21m</span>
            </div>
            <div className="font-bold text-white">1x Chicken Burger (No Mayo)</div>
            <div className="text-zinc-400">1x Crispy Onion Rings</div>
            <span className="inline-block rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-300 cursor-pointer">Mark Ready</span>
          </div>
        </div>
      ),
    },
    {
      id: "qr",
      name: "QR Tableside & Online ordering",
      desc: "Launch your own branded online delivery storefront and allow tableside self-checkouts to boost sales.",
      icon: Smartphone,
      features: [
        "Scan-to-order tableside codes",
        "Commission-free direct orders",
        "Digital wallet payments & checkout",
        "Interactive digital table maps",
      ],
      badge: "0% Commission",
      visual: (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col items-center justify-center space-y-4 shadow-xl">
          <Smartphone className="h-10 w-10 text-primary" />
          <div className="text-center">
            <div className="text-xs font-bold text-white">Table T12 Guest Ordering</div>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">Add items, split check with friends, pay with Apple Pay or credit cards.</p>
          </div>
          <div className="h-1.5 w-32 rounded-full bg-zinc-900 overflow-hidden">
            <div className="h-full w-3/4 bg-primary rounded-full" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        {/* Banner/Header */}
        <section className="relative overflow-hidden pt-20 pb-16 border-b border-zinc-900 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              MODULES CATALOG
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Unified Operating Modules
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
              Replace multiple software subscriptions with a single, lightning-fast cloud terminal tailored for restaurant operations.
            </p>
          </div>
        </section>

        {/* Product Items Rows */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 space-y-24">
            {products.map((p, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={p.id}
                  id={p.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Info Column */}
                  <div className={isEven ? "" : "lg:order-2"}>
                    <span className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-[10px] font-semibold text-primary uppercase tracking-wider">
                      {p.badge}
                    </span>
                    <h2 className="mt-4 font-heading text-3xl font-bold text-white leading-tight md:text-4xl">
                      {p.name}
                    </h2>
                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {p.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center space-x-2.5">
                          <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                          <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Preview Column */}
                  <div className={`relative ${isEven ? "" : "lg:order-1"}`}>
                    <div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl rounded-full" />
                    {p.visual}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
