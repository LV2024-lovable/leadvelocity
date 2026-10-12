import React from "react";
import { cn } from "@/lib/utils";
import type { CategoryId } from "@/content/types";

export type ExposureTone = "ember" | "moss" | "dusk" | "sand";

/** Vaste tint per categorie, gedeeld door NumberedTabs en de homepage. */
export const CATEGORY_TONE: Record<CategoryId, ExposureTone> = {
  groothandels: "ember",
  "importeurs-distributeurs": "moss",
  "service-onderhoud": "dusk",
  "maatwerk-montage": "sand",
};

/** [basis, kleurbaan 1, kleurbaan 2, onderglow] — zachte "long exposure"-vlakken, zelf gemaakt met CSS. */
const TONES: Record<ExposureTone, [string, string, string, string]> = {
  ember: ["#1c0b07", "#b8360f", "#f0743a", "#5c1a0a"],
  moss: ["#10150c", "#3f5a1b", "#a9bf72", "#24321a"],
  dusk: ["#0d1020", "#2f3f72", "#c58aa9", "#e3a073"],
  sand: ["#2a1d10", "#b98a55", "#efdcbc", "#7a5a37"],
};

export function ExposureArt({ tone = "dusk", className, children }: { tone?: ExposureTone; className?: string; children?: React.ReactNode }) {
  const [base, a, b, c] = TONES[tone];
  return (
    <div className={cn("relative isolate overflow-hidden rounded-[28px]", className)} style={{ backgroundColor: base }}>
      <div
        aria-hidden
        className="absolute -inset-[10%]"
        style={{
          background: `radial-gradient(90% 16% at 30% 30%, ${a} 0%, transparent 100%), radial-gradient(85% 20% at 68% 52%, ${b} 0%, transparent 100%), radial-gradient(100% 18% at 40% 74%, ${a} 0%, transparent 100%), radial-gradient(90% 40% at 50% 120%, ${c} 0%, transparent 100%)`,
          filter: "blur(22px) saturate(1.25)",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-[10%] opacity-60 mix-blend-soft-light"
        style={{ background: "linear-gradient(104deg, transparent 30%, rgba(255,255,255,0.45) 48%, transparent 62%)", filter: "blur(28px)" }}
      />
      <div aria-hidden className="grain-overlay absolute inset-0 opacity-[0.16] mix-blend-overlay" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
