"use client";

import { motion } from "framer-motion";
import { CreditCard, Truck, MessageSquare, Calculator } from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  logoType: string;
  category: string;
}

interface IntegrationsProps {
  integrations: IntegrationItem[];
}

export function Integrations({ integrations }: IntegrationsProps) {
  // Map category icons
  const categoryIcons: Record<string, any> = {
    payment: CreditCard,
    delivery: Truck,
    accounting: Calculator,
    messaging: MessageSquare,
  };

  return (
    <section id="integrations" className="relative py-20 md:py-28 overflow-hidden bg-zinc-950/20 border-t border-zinc-900">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Animated Diagram */}
        <div className="flex justify-center items-center h-[340px] relative">
          {/* Central Hub */}
          <div className="z-10 flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 bg-zinc-950 shadow-2xl glow-primary">
            <img src="/images/logo-mark.png" alt="DIYNEZA" width={44} height={44} className="h-11 w-11 object-contain" />
          </div>

          {/* Left Wing Integrations */}
          <div className="absolute left-6 md:left-12 flex flex-col space-y-4">
            {integrations.slice(0, 3).map((item) => {
              const Icon = categoryIcons[item.category] || CreditCard;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-md w-36"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-heading text-xs font-bold text-zinc-300">{item.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Right Wing Integrations */}
          <div className="absolute right-6 md:right-12 flex flex-col space-y-4">
            {integrations.slice(3, 6).map((item) => {
              const Icon = categoryIcons[item.category] || CreditCard;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-md w-36"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-heading text-xs font-bold text-zinc-300">{item.name}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Animated Connecting Lines (SVG Backdrop) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 400">
            {/* Draw lines from left nodes to center */}
            <path d="M 120 120 Q 160 160 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 120 200 L 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 120 280 Q 160 240 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />

            {/* Draw lines from right nodes to center */}
            <path d="M 280 120 Q 240 160 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 280 200 L 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 280 280 Q 240 240 200 200" fill="none" stroke="#FF6B00" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
          </svg>
        </div>

        {/* Right Side: Copy */}
        <div>
          <span className="font-heading text-xs font-semibold tracking-widest text-primary uppercase">
            Ecosystem Connectivity
          </span>
          <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Connects with your entire tech stack.
          </h2>
          <p className="mt-6 text-base md:text-lg text-zinc-400 leading-relaxed">
            DIYNEZA syncs flawlessly with payment gateways, online food delivery aggregators, accounting ledgers, and marketing messaging lines.
          </p>
          <div className="mt-8 flex items-center space-x-6 text-xs font-heading font-semibold text-primary">
            <span className="hover:underline cursor-pointer">View all 140+ Integrations →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
