"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
  activeTabId?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, className, activeTabId, onChange }: TabsProps) {
  const [selectedId, setSelectedId] = React.useState(activeTabId || tabs[0]?.id);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onChange) {
      onChange(id);
    }
  };

  const activeTabContent = tabs.find((t) => t.id === selectedId)?.content;

  return (
    <div className={cn("w-full", className)}>
      {/* Tabs Headers */}
      <div className="flex border-b border-zinc-800/80 overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex space-x-6 pb-px">
          {tabs.map((tab) => {
            const isActive = tab.id === selectedId;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={cn(
                  "relative py-4 text-sm font-heading font-medium transition-colors focus:outline-none cursor-pointer whitespace-nowrap",
                  isActive ? "text-primary" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {activeTabContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
