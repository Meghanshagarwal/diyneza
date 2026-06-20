"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity, CreditCard, ShoppingBag, Plus, Bell, Settings } from "lucide-react";

export function DashboardShowcase() {
  const [activeTableTab, setActiveTableTab] = React.useState<"all" | "busy" | "ready">("all");

  const tables = [
    { id: "T1", guests: 4, bill: "$142.50", status: "busy", type: "Fine Dining" },
    { id: "T2", guests: 2, bill: "$54.00", status: "ready", type: "Fine Dining" },
    { id: "T3", guests: 6, bill: "$288.90", status: "busy", type: "Patio" },
    { id: "T4", guests: 0, bill: "$0.00", status: "available", type: "Bar" },
    { id: "T5", guests: 2, bill: "$45.20", status: "busy", type: "Fine Dining" },
    { id: "T6", guests: 0, bill: "$0.00", status: "available", type: "Patio" },
  ];

  const filteredTables = tables.filter((t) => {
    if (activeTableTab === "busy") return t.status === "busy";
    if (activeTableTab === "ready") return t.status === "ready" || t.status === "available";
    return true;
  });

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-black/40 border-t border-zinc-900">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            LIVE PREVIEW
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            See the dashboard in action.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            A premium desktop-optimized control center giving owners complete oversight of billing, staff, and table states in real-time.
          </p>
        </div>

        {/* Dynamic Interactive Panel */}
        <div className="mt-16 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 md:p-6 shadow-2xl">
          {/* Header Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-6 gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-success-custom animate-pulse" />
                <h3 className="font-heading text-lg font-bold text-white">Central Terminal — Main Floor</h3>
              </div>
              <p className="text-xs text-zinc-550 mt-1">Sync status: online (12 terminals active)</p>
            </div>
            {/* Actions */}
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Bell className="h-4 w-4" />
              </span>
              <span className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Settings className="h-4 w-4" />
              </span>
              <button className="flex items-center space-x-1.5 rounded-lg bg-primary hover:bg-primary-light text-black font-heading font-semibold text-xs px-3 py-2 transition-colors cursor-pointer">
                <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>

          {/* Grid panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left: Table Status Panel */}
            <div className="lg:col-span-2 border border-zinc-900 rounded-xl bg-zinc-900/10 p-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-xs font-heading font-semibold text-zinc-300">Live Tables</span>
                {/* Tabs */}
                <div className="flex space-x-1 bg-zinc-950 p-1 rounded-lg border border-zinc-900 text-[10px]">
                  <button
                    onClick={() => setActiveTableTab("all")}
                    className={`px-3 py-1 rounded font-medium cursor-pointer ${
                      activeTableTab === "all" ? "bg-zinc-900 text-white" : "text-zinc-500"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveTableTab("busy")}
                    className={`px-3 py-1 rounded font-medium cursor-pointer ${
                      activeTableTab === "busy" ? "bg-zinc-900 text-white" : "text-zinc-500"
                    }`}
                  >
                    Occupied
                  </button>
                  <button
                    onClick={() => setActiveTableTab("ready")}
                    className={`px-3 py-1 rounded font-medium cursor-pointer ${
                      activeTableTab === "ready" ? "bg-zinc-900 text-white" : "text-zinc-500"
                    }`}
                  >
                    Available
                  </button>
                </div>
              </div>

              {/* Seating Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                {filteredTables.map((table) => {
                  return (
                    <div
                      key={table.id}
                      className={`relative rounded-xl border p-4 transition-all duration-300 ${
                        table.status === "busy"
                          ? "border-primary/20 bg-primary/5"
                          : table.status === "ready"
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-zinc-800/80 bg-zinc-900/10"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading text-sm font-bold text-white">{table.id}</span>
                        <span
                          className={`h-2 w-2 rounded-full ${
                            table.status === "busy"
                              ? "bg-primary"
                              : table.status === "ready"
                              ? "bg-emerald-500"
                              : "bg-zinc-700"
                          }`}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="text-[10px] text-zinc-500">Guests: {table.guests || "—"}</div>
                        <div className="text-sm font-heading font-bold text-zinc-300 mt-1">{table.bill}</div>
                      </div>
                      <div className="mt-4 text-[9px] text-zinc-600 font-medium tracking-wider uppercase">
                        {table.type}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Live Activity Logs */}
            <div className="border border-zinc-900 rounded-xl bg-zinc-900/10 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="text-xs font-heading font-semibold text-zinc-300">Live Activity Feed</span>
                  <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="mt-6 flex flex-col space-y-4">
                  <div className="flex items-start space-x-3 text-xs">
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 mt-0.5">
                      <ShoppingBag className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-200">New Direct QR Order</div>
                      <p className="text-zinc-500 mt-0.5">Table T3 ordered 2x Margherita Pizzas</p>
                      <span className="text-[10px] text-zinc-600 mt-1 block">1 min ago</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 mt-0.5">
                      <CreditCard className="h-3.5 w-3.5 text-success-custom" />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-200">Bill Settled</div>
                      <p className="text-zinc-500 mt-0.5">Table T2 settled via UPI ($54.00)</p>
                      <span className="text-[10px] text-zinc-600 mt-1 block">4 mins ago</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-xs">
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 mt-0.5">
                      <Activity className="h-3.5 w-3.5 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-200">Inventory Alert</div>
                      <p className="text-zinc-500 mt-0.5">Stock check: Fresh Basil below threshold</p>
                      <span className="text-[10px] text-zinc-600 mt-1 block">12 mins ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shift Stats Footer inside Widget */}
              <div className="mt-6 border-t border-zinc-900 pt-4 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider block">Staff Active</span>
                  <span className="text-xs font-semibold text-zinc-300 mt-0.5">8 Servers on Shift</span>
                </div>
                <span className="text-xs text-primary font-heading font-semibold hover:underline cursor-pointer">
                  Manage Roster →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
