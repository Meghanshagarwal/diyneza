"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MapPin, Globe, Building2, Store } from "lucide-react";
import { homepageContent } from "@/data/homepage-content";

export function MultiOutlet() {
  const { eyebrow, headline, description, locations } = homepageContent.multiOutlet;
  const [selectedLoc, setSelectedLoc] = React.useState(locations[0]?.city);

  const activeStats = locations.find((l) => l.city === selectedLoc);

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black/50 border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Interactive Map Mockup / Multi-outlet Panel */}
        <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
          {/* Header info */}
          <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4.5 w-4.5 text-primary" />
              <span className="font-heading text-sm font-bold text-white">Consolidated Enterprise View</span>
            </div>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">
              Global Admin
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Outlets List */}
            <div className="sm:col-span-1 flex flex-col space-y-2 border-r border-zinc-900/50 pr-4">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Outlets</span>
              {locations.map((loc) => {
                const isSelected = loc.city === selectedLoc;
                return (
                  <button
                    key={loc.city}
                    onClick={() => setSelectedLoc(loc.city)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border border-primary/20 text-primary"
                        : "border border-transparent text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{loc.city}</span>
                  </button>
                );
              })}
            </div>

            {/* Outlet Stats Details */}
            <div className="sm:col-span-2 flex flex-col justify-between pl-2">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Store className="h-4.5 w-4.5 text-zinc-400" />
                    <span className="font-heading text-sm font-bold text-white">{activeStats?.city} Franchise</span>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    activeStats?.status === "Busy" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  }`}>
                    {activeStats?.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded border border-zinc-900 bg-zinc-900/20 p-3">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Live Sales</span>
                    <span className="text-base font-heading font-bold text-white mt-1 block">{activeStats?.sales}</span>
                  </div>
                  <div className="rounded border border-zinc-900 bg-zinc-900/20 p-3">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Kitchen Load</span>
                    <span className="text-base font-heading font-bold text-white mt-1 block">{activeStats?.traffic}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button className="mt-8 rounded-lg bg-zinc-900 border border-zinc-800 text-center font-heading font-semibold text-xs text-zinc-200 py-2.5 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer flex items-center justify-center space-x-2">
                <Building2 className="h-4.5 w-4.5" />
                <span>Open Terminal Panel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Copy */}
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

          <div className="mt-10 space-y-6">
            <div className="flex items-start space-x-4">
              <span className="rounded bg-primary/10 border border-primary/20 p-2 text-primary font-bold text-xs">
                01
              </span>
              <div>
                <h4 className="font-heading text-sm font-bold text-zinc-200">Centralized Recipe Versioning</h4>
                <p className="mt-1 text-xs text-zinc-400">Push menu revisions or pricing updates to all franchise locations with a single click.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="rounded bg-primary/10 border border-primary/20 p-2 text-primary font-bold text-xs">
                02
              </span>
              <div>
                <h4 className="font-heading text-sm font-bold text-zinc-200">Unified Corporate Analytics</h4>
                <p className="mt-1 text-xs text-zinc-400">Consolidate sales records, staff costs, and ingredient margins into a single enterprise report.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
