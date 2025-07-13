
'use client';

import { cn } from "@/lib/utils";

interface TopLoaderProps {
  isNavigating: boolean;
}

export function TopLoader({ isNavigating }: TopLoaderProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 w-full h-0.5 bg-primary/20 overflow-hidden",
        isNavigating ? "opacity-100" : "opacity-0",
        "transition-opacity duration-300"
      )}
    >
      <div className="relative w-full h-full">
        <div className="top-loader-bar absolute top-0 h-full bg-primary" />
      </div>
    </div>
  );
}
