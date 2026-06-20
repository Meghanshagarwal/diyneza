"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, QrCode, AlertCircle, TrendingUp } from "lucide-react";
import { homepageContent } from "@/data/homepage-content";

export function BentoGrid() {
  const items = homepageContent.bento;

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            Product Showcase
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Features engineered for growth.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            A closer look at the modules driving operational efficiency and customer loyalty at top restaurants.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[340px]">
          {items.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 hover:border-primary/20 hover:bg-zinc-900/20 transition-all duration-300 ${item.colSpan}`}
              >
                {/* Visual Backdrop/Details depending on type */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-900/10 to-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Visual Elements Layer */}
                <div className="absolute right-0 bottom-0 w-[240px] h-[160px] opacity-25 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none">
                  {item.visualType === "kds" && (
                    <div className="flex flex-col space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-tl-xl h-full shadow-2xl">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-900 pb-2">
                        <span className="font-bold">TICKET #421</span>
                        <span className="text-amber-500 font-semibold flex items-center space-x-1">
                          <Clock className="h-2.5 w-2.5" />
                          <span>4:12m</span>
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-white">1x Ribeye Steak (Med-Rare)</div>
                      <div className="text-[10px] text-zinc-400">1x Truffle Fries (Extra Crispy)</div>
                      <div className="flex space-x-2 mt-auto">
                        <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[8px] text-primary">Prepped</span>
                        <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[8px] text-zinc-400">Plating</span>
                      </div>
                    </div>
                  )}

                  {item.visualType === "qr" && (
                    <div className="flex flex-col items-center justify-center p-4 bg-zinc-950 border border-zinc-800 rounded-tl-xl h-full shadow-2xl space-y-2">
                      <QrCode className="h-10 w-10 text-primary" />
                      <span className="text-[10px] font-bold text-zinc-300">Scan to Order & Pay</span>
                      <div className="h-1.5 w-24 rounded-full bg-zinc-900 overflow-hidden">
                        <div className="h-full w-2/3 bg-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                  )}

                  {item.visualType === "inventory" && (
                    <div className="flex flex-col space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-tl-xl h-full shadow-2xl">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span>Milk (Whole)</span>
                        <span className="text-red-500 font-semibold flex items-center space-x-0.5">
                          <AlertCircle className="h-2.5 w-2.5" />
                          <span>Low Stock</span>
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-zinc-900">
                        <div className="h-full w-[15%] bg-red-500 rounded-full" />
                      </div>
                      <div className="mt-2 text-[9px] text-zinc-500">
                        Auto PO triggered: <span className="text-zinc-300">5 cases → Organic Foods Co.</span>
                      </div>
                    </div>
                  )}

                  {item.visualType === "analytics" && (
                    <div className="flex flex-col space-y-2 p-4 bg-zinc-950 border border-zinc-800 rounded-tl-xl h-full shadow-2xl">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500">
                        <span>Franchise Sales</span>
                        <TrendingUp className="h-3 w-3 text-success-custom" />
                      </div>
                      <div className="flex items-end space-x-1.5 h-16 pt-2">
                        {[20, 35, 15, 45, 60, 30, 75].map((val, i) => (
                          <div
                            key={i}
                            className="bg-primary/40 group-hover:bg-primary w-4 rounded-t-sm transition-all"
                            style={{ height: `${val}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="rounded-full bg-zinc-900 border border-zinc-800/80 px-3 py-1 text-[10px] font-semibold text-zinc-400 tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Corner hover link */}
                <div className="absolute bottom-6 right-6 flex items-center justify-center h-8 w-8 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 group-hover:border-primary/20 group-hover:text-primary transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
