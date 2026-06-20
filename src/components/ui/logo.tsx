import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Render as a plain element (no link wrapper) */
  asLink?: boolean;
}

/**
 * Official DIYNEZA brand lockup: logo mark (plate/growth symbol) + wordmark.
 * Replaces the previous generic flame icon so branding is consistent site-wide.
 */
export function Logo({ className, asLink = true }: LogoProps) {
  const inner = (
    <span className={cn("flex items-center gap-2", className)}>
      <img
        src="/images/logo-mark.png"
        alt="DIYNEZA logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
      />
      <span className="font-heading text-lg font-bold tracking-tight text-white">
        DIYNEZA<span className="text-primary">.</span>
      </span>
    </span>
  );

  if (!asLink) return inner;

  return (
    <Link href="/" className="flex items-center focus:outline-none" aria-label="DIYNEZA home">
      {inner}
    </Link>
  );
}
