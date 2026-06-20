"use client";

import { CheckCircle2, ShieldCheck, Database, LayoutGrid, Smartphone } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { homepageContent } from "@/data/homepage-content";

export function ProductDeepDive() {
  const { tabs } = homepageContent.productDeepDive;

  const tabPreviews: Record<string, React.ReactNode> = {
    pos: (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Active Ticket</div>
            <div className="text-sm font-heading font-bold text-white mt-0.5">Table T10</div>
          </div>
          <span className="rounded bg-success-custom/10 border border-success-custom/20 px-2 py-0.5 text-[10px] text-success-custom">Offline Mode Active</span>
        </div>
        <div className="flex-1 flex flex-col space-y-2 text-xs">
          <div className="flex justify-between items-center text-zinc-300">
            <span>2x Margherita Pizza (Extra Cheese)</span>
            <span className="font-semibold text-white">$24.00</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span>1x Garlic Breadsticks</span>
            <span className="font-semibold text-white">$6.50</span>
          </div>
          <div className="flex justify-between items-center text-zinc-300">
            <span>2x Fresh Lime Soda</span>
            <span className="font-semibold text-white">$8.00</span>
          </div>
        </div>
        <div className="border-t border-zinc-900 pt-4 flex justify-between items-center">
          <span className="text-xs text-zinc-400">Total Bill</span>
          <span className="text-lg font-heading font-bold text-primary">$38.50</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <span className="rounded border border-zinc-800 bg-zinc-900/60 p-2 text-center text-[10px] text-zinc-300 font-semibold cursor-pointer">UPI / Scan</span>
          <span className="rounded bg-primary hover:bg-primary-light text-black p-2 text-center text-[10px] font-semibold cursor-pointer">Settle Bill</span>
        </div>
      </div>
    ),
    inventory: (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Inventory Metrics</div>
            <div className="text-sm font-heading font-bold text-white mt-0.5">Ingredient Wastage</div>
          </div>
          <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary">Live Tracking</span>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300">Chicken Breast (Fresh)</span>
              <span className="text-zinc-400">18.5 kg left</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full">
              <div className="h-full w-3/4 bg-success-custom rounded-full" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-300">Tomato Sauce (Base)</span>
              <span className="text-zinc-400">4.2 kg left</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded-full">
              <div className="h-full w-[25%] bg-amber-500 rounded-full" />
            </div>
          </div>
        </div>
        <div className="rounded border border-zinc-900 bg-zinc-900/10 p-3 mt-4 text-[10px] text-zinc-400 flex items-center space-x-2">
          <Database className="h-4 w-4 text-primary shrink-0" />
          <span>Real-time recipe depletion syncs stock automatically.</span>
        </div>
      </div>
    ),
    kds: (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Kitchen Screen</div>
            <div className="text-sm font-heading font-bold text-white mt-0.5">Station: Grill</div>
          </div>
          <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] text-amber-500">3 Tickets Pending</span>
        </div>
        <div className="rounded border border-zinc-900 bg-zinc-900/20 p-3 space-y-2">
          <div className="flex justify-between items-center text-[10px] text-zinc-500">
            <span>TICKET #182</span>
            <span className="text-red-500 font-medium">8:14m</span>
          </div>
          <div className="text-[11px] font-bold text-white">1x Grilled Salmon (Lemon Butter)</div>
          <div className="text-[10px] text-zinc-400">1x Roasted Veggies (Side)</div>
          <span className="inline-block rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[8px] text-zinc-400 cursor-pointer">Mark Ready</span>
        </div>
      </div>
    ),
    delivery: (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <div>
            <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Direct Checkout</div>
            <div className="text-sm font-heading font-bold text-white mt-0.5">Scan & Order</div>
          </div>
          <span className="rounded bg-success-custom/10 border border-success-custom/20 px-2 py-0.5 text-[10px] text-success-custom">0% Commission</span>
        </div>
        <div className="flex flex-col items-center py-4 space-y-3">
          <Smartphone className="h-10 w-10 text-primary" />
          <div className="text-center">
            <div className="text-xs font-bold text-white">Table QR Checkout</div>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">Scan, choose payment (Stripe/UPI) and split bill dynamically.</p>
          </div>
        </div>
      </div>
    ),
  };

  const tabsContent = tabs.map((tab) => {
    return {
      id: tab.id,
      label: tab.label,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
          {/* Info */}
          <div>
            <h3 className="font-heading text-2xl font-bold text-white leading-tight md:text-3xl">
              {tab.title}
            </h3>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              {tab.description}
            </p>
            {/* Features check list */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tab.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-primary shrink-0" />
                  <span className="text-xs font-medium text-zinc-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Preview panel */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-primary/5 blur-2xl rounded-full" />
            {tabPreviews[tab.id]}
          </div>
        </div>
      ),
    };
  });

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            PRODUCT DETAILS
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Deep dive into our modules.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Explore how each feature is tailored to optimize billing speed, reduce wastage, and scale order fulfillment.
          </p>
        </div>

        {/* Tabs wrapper */}
        <div className="mt-12">
          <Tabs tabs={tabsContent} />
        </div>
      </div>
    </section>
  );
}
