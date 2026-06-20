"use client";

import { homepageContent } from "@/data/homepage-content";
import { Coffee, Utensils, Pizza, Flame, Leaf, Cake } from "lucide-react";

export function TrustedBy() {
  const brands = homepageContent.trustedBrands;
  
  // Map icons to brand indexes dynamically
  const icons = [Coffee, Utensils, Pizza, Flame, Leaf, Cake];

  return (
    <section className="border-y border-zinc-900 bg-zinc-950/20 py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center font-heading text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Empowering 12,000+ dining spaces, cloud kitchens, and franchises globally
        </p>

        {/* Infinite Marquee Container */}
        <div className="relative mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="animate-scroll flex space-x-16 items-center">
            {/* Double the list to make it seamless */}
            {[...brands, ...brands].map((brand, idx) => {
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="flex items-center space-x-3 opacity-40 hover:opacity-90 hover:scale-105 transition-all duration-300"
                >
                  <Icon className="h-5 w-5 text-zinc-400 group-hover:text-primary transition-colors" />
                  <span className="font-heading text-sm font-bold tracking-wider text-zinc-300 whitespace-nowrap uppercase">
                    {brand.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
