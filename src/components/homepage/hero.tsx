"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, Users, ShoppingBag, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homepageContent } from "@/data/homepage-content";

export function Hero() {
  const { eyebrow, headline, subhead, primaryCTA, secondaryCTA } = homepageContent.hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-28">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-transparent opacity-50 blur-3xl" />
      <div className="absolute top-12 left-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-zinc-900/50 blur-2xl" />

      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-tight"
          >
            Everything your restaurant needs in{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              one platform
            </span>
            .
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed font-sans"
          >
            {subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" className="flex items-center space-x-2">
              <span>{primaryCTA}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" className="flex items-center space-x-2">
              <Play className="h-4 w-4 text-primary fill-primary" />
              <span>{secondaryCTA}</span>
            </Button>
          </motion.div>

          {/* Interactive Live Dashboard Mockup */}
          <motion.div
            variants={itemVariants}
            className="relative mt-16 md:mt-24 w-full max-w-5xl rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 shadow-2xl backdrop-blur-sm glow-primary/5"
            style={{ perspective: 1000 }}
          >
            {/* Window controls bar */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 px-3">
              <div className="flex space-x-1.5">
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
                <span className="h-3 w-3 rounded-full bg-zinc-800" />
              </div>
              <div className="rounded border border-zinc-900 bg-zinc-900/50 px-6 py-0.5 text-[10px] text-zinc-500 font-sans">
                diyneza.com/dashboard/analytics
              </div>
              <div className="h-4 w-4" />
            </div>

            {/* Dashboard Inner Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 text-left">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col space-y-2 border-r border-zinc-900/80 pr-3">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider px-2">Manage</span>
                <span className="rounded bg-zinc-900 px-3 py-1.5 text-xs text-white font-medium">Live Terminal</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">Inventory Status</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">Kitchen Display</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">Tables Seating</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">Loyalty & CRM</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300">System Logs</span>
              </div>

              {/* Main Content Area */}
              <div className="md:col-span-3 flex flex-col space-y-4">
                {/* Stats Widgets */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Today Sales</span>
                      <TrendingUp className="h-3.5 w-3.5 text-success-custom" />
                    </div>
                    <div className="mt-2 text-lg font-heading font-bold text-white">$4,821.50</div>
                    <div className="mt-1 text-[10px] text-success-custom font-medium">+14.2% vs yesterday</div>
                  </div>

                  <div className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Guests</span>
                      <Users className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="mt-2 text-lg font-heading font-bold text-white">248</div>
                    <div className="mt-1 text-[10px] text-zinc-400 font-medium">Active QR sessions</div>
                  </div>

                  <div className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">KDS Load</span>
                      <Clock className="h-3.5 w-3.5 text-yellow-500" />
                    </div>
                    <div className="mt-2 text-lg font-heading font-bold text-white">7 min</div>
                    <div className="mt-1 text-[10px] text-yellow-500 font-medium">Avg prep time</div>
                  </div>

                  <div className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-4">
                    <div className="flex justify-between items-center text-zinc-500">
                      <span className="text-[10px] font-bold uppercase tracking-wider">Orders</span>
                      <ShoppingBag className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="mt-2 text-lg font-heading font-bold text-white">182</div>
                    <div className="mt-1 text-[10px] text-success-custom font-medium">98.5% success rate</div>
                  </div>
                </div>

                {/* Dashboard Chart Mockup */}
                <div className="rounded-lg border border-zinc-900 bg-zinc-900/20 p-4 flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-heading font-semibold text-zinc-300">Hourly Traffic & Revenue</span>
                    <span className="rounded bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] text-primary">Live Sync</span>
                  </div>
                  {/* SVG Chart */}
                  <div className="mt-6 h-36 flex items-end justify-between px-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-y border-zinc-900 py-2">
                      <div className="border-b border-zinc-900 w-full" />
                      <div className="border-b border-zinc-900 w-full" />
                    </div>
                    {[40, 65, 30, 85, 55, 95, 75, 110, 80, 120, 90, 130].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-1.5 z-10 flex-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${val}px` }}
                          transition={{ duration: 1, delay: 0.5 + idx * 0.05 }}
                          className="w-[14px] sm:w-[22px] rounded-t bg-gradient-to-t from-primary/50 to-primary"
                        />
                        <span className={`text-[8px] text-zinc-600 font-medium ${idx % 2 === 0 ? "block" : "hidden sm:block"}`}>
                          {(10 + idx).toString()}:00
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
