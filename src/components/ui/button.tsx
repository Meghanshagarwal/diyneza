"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", animate = true, children, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center font-heading font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
    
    const variants = {
      primary: "bg-primary text-black hover:bg-primary-light glow-primary hover:scale-[1.02]",
      secondary: "border border-zinc-700 bg-zinc-900/60 text-white hover:bg-zinc-800 hover:border-zinc-500",
      ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800/40",
      link: "text-primary underline-offset-4 hover:underline bg-transparent p-0",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3 text-base",
    };

    const cnClass = cn(baseStyle, variants[variant], sizes[size], className);

    if (animate && variant !== "link") {
      return (
        <motion.button
          ref={ref as any}
          className={cnClass}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          {...(props as any)}
        >
          {children}
        </motion.button>
      );
    }

    return (
      <button ref={ref} className={cnClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
