import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Section({ id, children, className, tone = "paper" }: { id?: string; children: React.ReactNode; className?: string; tone?: "paper" | "raised" | "ink" }) {
  return (
    <section
      id={id}
      className={cn(
        "px-5 py-20 sm:px-6 md:py-28",
        tone === "raised" && "border-y border-lv-line bg-lv-raised",
        tone === "ink" && "bg-lv-ink text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-lv-muted", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, title, intro, className, as: As = "h2" }: { eyebrow?: string; title: React.ReactNode; intro?: string; className?: string; as?: "h1" | "h2" }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <As className={cn("text-balance break-words font-display font-semibold tracking-[-0.035em]", As === "h1" ? "text-[clamp(2.3rem,5vw,3.9rem)] leading-[1.02]" : "text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.05]")}>
        {title}
      </As>
      {intro && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-lv-body">{intro}</p>}
    </Reveal>
  );
}
