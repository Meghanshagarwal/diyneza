"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, ShieldAlert, ZapOff, BarChart3 } from "lucide-react";
import { homepageContent } from "@/data/homepage-content";

export function Problem() {
  const { eyebrow, headline, cards } = homepageContent.problem;

  const cardIcons = [ShieldAlert, ZapOff, BarChart3];

  return (
    <section className="relative py-20 md:py-28 bg-zinc-950/40">
      {/* Radial overlay */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {headline}
          </h2>
          <p className="mt-4 text-base md:text-lg text-zinc-400">
            Running a restaurant shouldn't mean wasting hours syncing spreadsheets or losing margins to disconnected legacy software.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = cardIcons[idx % cardIcons.length];
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-xl border border-zinc-800/80 bg-zinc-900/10 p-8 hover:border-primary/30 transition-all duration-300"
              >
                {/* Stats badge */}
                <div className="absolute top-6 right-6 inline-flex items-center space-x-1 rounded bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                  <AlertCircle className="h-3 w-3" />
                  <span>{card.stat}</span>
                </div>

                {/* Icon wrapper */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-primary group-hover:border-primary/20 transition-all">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 font-heading text-lg font-bold text-white group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Solution preview trigger */}
                <div className="mt-6 flex items-center space-x-2 text-xs font-heading font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>How we fix this</span>
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
