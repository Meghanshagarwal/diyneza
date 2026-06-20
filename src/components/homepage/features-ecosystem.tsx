"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, ShieldCheck, Database, LayoutGrid, BarChart2, Users, Smartphone, BookOpen } from "lucide-react";
import { homepageContent } from "@/data/homepage-content";

export function FeaturesEcosystem() {
  const { eyebrow, headline, description, modules } = homepageContent.ecosystem;
  const [hoveredModule, setHoveredModule] = React.useState<string | null>(null);

  // Map icons dynamically
  const moduleIcons: Record<string, any> = {
    pos: ShieldCheck,
    menu: BookOpen,
    inventory: Database,
    kds: LayoutGrid,
    qr: Smartphone,
    crm: Users,
    analytics: BarChart2,
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-[300px] w-[300px] rounded-full bg-zinc-900/40 blur-2xl" />

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Copy */}
        <div>
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {headline}
          </h2>
          <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">
            {description}
          </p>

          {/* Module List with Status Indicators */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {modules.map((mod) => {
              const Icon = moduleIcons[mod.id] || ShieldCheck;
              const isHovered = hoveredModule === mod.id;

              return (
                <div
                  key={mod.id}
                  onMouseEnter={() => setHoveredModule(mod.id)}
                  onMouseLeave={() => setHoveredModule(null)}
                  className={`flex items-center space-x-3 rounded-lg border p-4 transition-all duration-300 ${
                    isHovered
                      ? "border-primary/40 bg-zinc-900/60"
                      : "border-zinc-800/60 bg-zinc-900/10"
                  }`}
                >
                  <div className={`rounded-md p-1.5 border transition-colors ${
                    isHovered ? "border-primary/20 text-primary bg-primary/5" : "border-zinc-800 text-zinc-500"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-heading text-xs font-semibold text-zinc-200">
                      {mod.name}
                    </div>
                    <div className="mt-0.5 flex items-center space-x-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        mod.status.includes("Alert") ? "bg-amber-500 animate-pulse" : "bg-success-custom"
                      }`} />
                      <span className="text-[10px] text-zinc-500 font-medium">{mod.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Circular Hub Visual */}
        <div className="flex justify-center items-center h-[400px] relative">
          {/* Radial Lines Grid (SVG Backdrop) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="80" stroke="#3f3f46" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            <circle cx="200" cy="200" r="140" stroke="#3f3f46" strokeWidth="1" fill="none" strokeDasharray="4 4" />
            {modules.map((_, idx) => {
              const angle = (idx * 2 * Math.PI) / modules.length;
              const x2 = 200 + Math.cos(angle) * 140;
              const y2 = 200 + Math.sin(angle) * 140;
              return (
                <line
                  key={idx}
                  x1="200"
                  y1="200"
                  x2={x2}
                  y2={y2}
                  stroke="#3f3f46"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Central Hub Node */}
          <motion.div
            className="z-10 flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-zinc-950 shadow-2xl glow-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <Flame className="h-10 w-10 text-primary fill-primary" />
          </motion.div>

          {/* Orbiting Satellite Nodes */}
          {modules.map((mod, idx) => {
            const angle = (idx * 2 * Math.PI) / modules.length;
            const radius = 135; // px from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const Icon = moduleIcons[mod.id] || ShieldCheck;
            const isHovered = hoveredModule === mod.id;

            return (
              <motion.div
                key={mod.id}
                onMouseEnter={() => setHoveredModule(mod.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className={`absolute z-20 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
                  isHovered
                    ? "border-primary text-primary bg-zinc-950 scale-110 shadow-lg"
                    : "border-zinc-800 text-zinc-400 bg-zinc-900 hover:border-zinc-600 hover:text-white"
                }`}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon className="h-5 w-5" />
                {/* Floating tooltips */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-white shadow-xl"
                  >
                    {mod.name}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
