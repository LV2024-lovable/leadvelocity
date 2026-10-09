import React from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal(delay);
  return <div ref={ref} className={cn("reveal", className)}>{children}</div>;
}
