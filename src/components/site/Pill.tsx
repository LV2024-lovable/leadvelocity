import React from "react";
import { cn } from "@/lib/utils";

export function Pill({ children, tone = "light", dot = false, className }: { children: React.ReactNode; tone?: "light" | "dark"; dot?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-medium",
        tone === "light" ? "bg-lv-card text-lv-body" : "bg-black/45 text-white ring-1 ring-white/15 backdrop-blur",
        className,
      )}
    >
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-lv-lime" />}
      {children}
    </span>
  );
}
