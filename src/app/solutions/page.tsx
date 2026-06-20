import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/homepage/navbar";
import { Footer } from "@/components/homepage/footer";
import { CheckCircle2, Monitor, Printer, Smartphone } from "lucide-react";
import { solutionsData } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions by Restaurant Profile",
  description: "Customized POS setups and hardware bundles tailored for QSR chains, cafes, bakeries, fine dining hubs, and multi-brand cloud kitchens.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: "DIYNEZA | Solutions by Restaurant Profile",
    description: "Customized POS setups and hardware bundles for QSR chains, cafes, bakeries, fine dining, and cloud kitchens.",
    url: "/solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DIYNEZA Solutions",
    description: "Customized POS setups and hardware bundles for every restaurant profile.",
  },
};

export default function SolutionsPage() {
  const hardwareIcons: Record<string, any> = {
    counter: Monitor,
    printer: Printer,
    handheld: Smartphone,
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-dark-bg text-white">
        {/* Banner/Header */}
        <section className="relative overflow-hidden pt-20 pb-16 border-b border-zinc-900 text-center">
          <div className="absolute top-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="mx-auto max-w-7xl px-6">
            <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
              RESTAURANT PROFILES
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
              Solutions for every kitchen.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-400">
              Select your restaurant type to explore customized hardware bundles, live system integrations, and client margin metrics.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutionsData.map((sol) => {
              return (
                <div
                  key={sol.id}
                  id={sol.id}
                  className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 hover:border-primary/20 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Growth Metric Badge */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="font-heading text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
                          {sol.subtitle}
                        </span>
                        <h2 className="mt-2 font-heading text-2xl font-bold text-white group-hover:text-primary transition-colors">
                          {sol.title}
                        </h2>
                      </div>
                      <div className="rounded bg-success-custom/10 border border-success-custom/20 px-3 py-1.5 text-right shrink-0">
                        <span className="font-heading text-sm font-bold text-success-custom block">{sol.metric}</span>
                        <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider block mt-0.5">
                          {sol.metricLabel.split(" ")[0]} Target
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 text-sm text-zinc-400 leading-relaxed">
                      {sol.description}
                    </p>

                    {/* Features list */}
                    <div className="mt-8 border-t border-zinc-900 pt-6">
                      <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                        Core System Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sol.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center space-x-2.5">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                            <span className="text-xs text-zinc-300 font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hardware bundle list */}
                  <div className="mt-8 border-t border-zinc-900 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                        Recommended Hardware
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {sol.hardware.map((item, hIdx) => {
                          const Icon = item.toLowerCase().includes("terminal")
                            ? Monitor
                            : item.toLowerCase().includes("printer")
                            ? Printer
                            : Smartphone;
                          return (
                            <span
                              key={hIdx}
                              className="inline-flex items-center space-x-1 rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-400 font-medium"
                            >
                              <Icon className="h-3 w-3" />
                              <span>{item}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    {/* Action */}
                    <Link
                      href="/contact?intent=demo"
                      className="rounded border border-zinc-800 bg-zinc-900/60 p-2 text-center text-xs font-heading font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 transition-all"
                    >
                      Request Hardware Quote
                    </Link>
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
