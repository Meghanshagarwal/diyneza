"use client";

import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Users, ShoppingBag, Clock, CheckCircle2 } from "lucide-react";
import { homepageContent } from "@/data/homepage-content";

export function Hero() {
  const { eyebrow, subhead, primaryCTA, secondaryCTA } = homepageContent.hero;

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-28">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-transparent opacity-50 blur-3xl" />
      <div className="absolute top-12 left-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-zinc-900/50 blur-2xl" />

      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800/80 bg-zinc-900/40 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-xs font-semibold tracking-widest text-zinc-400 uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl leading-tight">
            Restaurant POS, billing &amp; inventory in{" "}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              one platform
            </span>
            .
          </h1>

          {/* Subhead */}
          <p className="mt-6 max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed font-sans">
            {subhead}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?intent=trial"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-base font-heading font-medium text-black transition-all hover:bg-primary-light hover:scale-[1.02] glow-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              <span>{primaryCTA}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?intent=demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-7 py-3 text-base font-heading font-medium text-white transition-all hover:bg-zinc-800 hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg"
            >
              <Play className="h-4 w-4 text-primary fill-primary" />
              <span>{secondaryCTA}</span>
            </Link>
          </div>

          {/* Trust line */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 45-day free trial
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Cancel anytime
            </span>
          </div>

          {/* Interactive Live Dashboard Mockup */}
          <div
            className="relative mt-16 md:mt-24 w-full max-w-5xl rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 shadow-2xl backdrop-blur-sm"
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
                <span className="px-3 py-1.5 text-xs text-zinc-500">Inventory Status</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500">Kitchen Display</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500">Tables Seating</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500">Loyalty & CRM</span>
                <span className="px-3 py-1.5 text-xs text-zinc-500">System Logs</span>
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
                  {/* Bar Chart */}
                  <div className="mt-6 h-36 flex items-end justify-between px-2 relative">
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-y border-zinc-900 py-2">
                      <div className="border-b border-zinc-900 w-full" />
                      <div className="border-b border-zinc-900 w-full" />
                    </div>
                    {[40, 65, 30, 85, 55, 95, 75, 110, 80, 120, 90, 130].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-1.5 z-10 flex-1">
                        <div
                          className="w-[14px] sm:w-[22px] rounded-t bg-gradient-to-t from-primary/50 to-primary"
                          style={{ height: `${val}px` }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
