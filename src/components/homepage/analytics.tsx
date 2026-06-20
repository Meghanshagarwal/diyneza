"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Flame, DollarSign } from "lucide-react";

export function Analytics() {
  const menuItems = [
    { name: "Margherita Pizza", orders: 142, profit: "42% Margin", width: "w-full" },
    { name: "Truffle Fries", orders: 110, profit: "64% Margin", width: "w-[78%]" },
    { name: "Ribeye Steak", orders: 84, profit: "28% Margin", width: "w-[58%]" },
    { name: "Garlic Breadsticks", orders: 72, profit: "55% Margin", width: "w-[48%]" },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div>
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            Data & Insights
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Menu engineering, backed by data.
          </h2>
          <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">
            Stop guessing what menu items drive profits. DIYNEZA consolidates real-time sales records with ingredient recipe costs, revealing your exact item profit margins.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <Award className="h-6 w-6 text-primary" />
              <h4 className="font-heading text-sm font-bold text-zinc-200 mt-3">Identify Star Sellers</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">Know which dishes are high-volume/high-profit and which are dragging down ingredient margins.</p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <DollarSign className="h-6 w-6 text-primary" />
              <h4 className="font-heading text-sm font-bold text-zinc-200 mt-3">Optimize Food Costs</h4>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">Trigger alert reports when commodity price fluctuations erode ingredient profit margins.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Analytics Panel Mockup */}
        <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          {/* Title bar */}
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4.5 w-4.5 text-primary" />
              <span className="font-heading text-sm font-bold text-white">Menu Matrix Analysis</span>
            </div>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">
              Weekly Report
            </span>
          </div>

          {/* Menu items listing */}
          <div className="mt-6 space-y-4">
            {menuItems.map((item, idx) => {
              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-zinc-200">{item.name}</span>
                    <div className="flex space-x-3 text-zinc-400 font-medium">
                      <span>{item.orders} orders</span>
                      <span className="text-primary">{item.profit}</span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="h-2 w-full rounded-full bg-zinc-900">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.width.split("-")[1].replace("]", "") }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actionable recommendation card inside mockup */}
          <div className="mt-8 border-t border-zinc-900 pt-6">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start space-x-3">
              <Flame className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-heading text-xs font-bold text-primary">DIYNEZA Recommendation</span>
                <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                  <span className="font-bold text-zinc-200">Margherita Pizza</span> accounts for 42% of total food profits. Place it at the top of your tableside QR menu to boost checkout conversions by up to <span className="font-bold text-success-custom">+8%</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
