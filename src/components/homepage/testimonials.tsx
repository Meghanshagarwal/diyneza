"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  restaurant: string;
  quote: string;
  avatar: string;
  metric: string;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

// NOTE: Until DIYNEZA has genuine, verifiable customer reviews, this section is
// presented as illustrative product outcomes — NOT attributed customer quotes.
// We deliberately do not render fabricated names, photos, restaurant names, or
// star ratings, and the page emits no Review/AggregateRating schema for these.
// Swap in real, named testimonials (with consent) when available.
export function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            OUTCOMES THAT MATTER
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Built to move the metrics that matter.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            From food cost to table turnover, DIYNEZA is designed to deliver measurable improvements across billing, inventory, kitchen and ordering.
          </p>
        </div>

        {/* Outcome cards grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 hover:border-primary/20 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Growth metric badge */}
                <div className="inline-flex items-center space-x-1 rounded bg-success-custom/10 border border-success-custom/20 px-2.5 py-0.5 text-xs font-semibold text-success-custom">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t.metric}</span>
                </div>

                {/* Outcome statement */}
                <p className="mt-6 text-sm text-zinc-300 leading-relaxed">
                  {t.quote}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transparency note */}
        <p className="mt-10 text-center text-xs text-zinc-600">
          Representative outcomes based on platform capabilities. Verified customer stories coming soon.
        </p>
      </div>
    </section>
  );
}
