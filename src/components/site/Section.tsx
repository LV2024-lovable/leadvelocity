import React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Pill } from "./Pill";
import { storyLabels, type StoryStep } from "@/content/site";

export function Section({ id, children, className, tone = "paper", story }: { id?: string; children: React.ReactNode; className?: string; tone?: "paper" | "raised" | "ink"; story?: StoryStep }) {
  return (
    <section
      id={id}
      data-story={story}
      className={cn(
        "px-5 py-24 sm:px-6 md:py-32",
        tone === "raised" && "bg-lv-raised",
        tone === "ink" && "bg-lv-ink text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("mb-3 text-[13px] font-medium text-lv-muted", className)}>{children}</p>;
}

export function SectionHead({ eyebrow, story, title, intro, className, as: As = "h2", align = "left" }: { eyebrow?: string; story?: StoryStep; title: React.ReactNode; intro?: string; className?: string; as?: "h1" | "h2"; align?: "left" | "center" }) {
  const label = eyebrow ?? (story ? storyLabels[story] : undefined);
  return (
    <Reveal className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {label && <Pill className="mb-5">{label}</Pill>}
      <As className={cn("break-words text-balance font-display font-normal tracking-[-0.015em]", As === "h1" ? "text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02]" : "text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04]")}>
        {title}
      </As>
      {intro && <p className={cn("mt-5 text-[17px] leading-relaxed text-lv-body", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")}>{intro}</p>}
    </Reveal>
  );
}
