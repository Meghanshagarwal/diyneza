"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

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

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            RESTAURANT STORIES
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Loved by hospitality leaders.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Hear from owners, executive chefs, and operations directors who transitioned to DIYNEZA and unlocked massive efficiencies.
          </p>
        </div>

        {/* Testimonial cards grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => {
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/10 p-8 hover:border-primary/20 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Growth metric badge */}
                  <div className="mt-4 inline-flex items-center space-x-1 rounded bg-success-custom/10 border border-success-custom/20 px-2.5 py-0.5 text-xs font-semibold text-success-custom">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{t.metric}</span>
                  </div>

                  {/* Quote */}
                  <blockquote className="mt-6 text-sm text-zinc-300 leading-relaxed font-sans italic">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Profile */}
                <div className="mt-8 flex items-center space-x-3 pt-6 border-t border-zinc-900">
                  {/* Profile image */}
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-zinc-850"
                  />
                  <div>
                    <cite className="font-heading text-xs font-bold text-white not-italic block">{t.name}</cite>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">
                      {t.role}, <span className="text-zinc-400 font-semibold">{t.restaurant}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
