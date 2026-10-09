import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { track, type TrackParams } from "@/lib/track";

type Variant = "primary" | "secondary" | "lime" | "text";

export function CtaLink({ to, children, variant = "primary", ctaId, trackParams, className, arrow = variant !== "secondary" }: {
  to: string; children: React.ReactNode; variant?: Variant; ctaId: string; trackParams?: TrackParams; className?: string; arrow?: boolean;
}) {
  const isHash = to.startsWith("#");
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-colors",
    variant === "primary" && "bg-lv-ink px-5 py-3 text-white hover:bg-[#2A2A26]",
    variant === "secondary" && "px-5 py-3 text-lv-ink ring-1 ring-lv-line hover:bg-lv-surface",
    variant === "lime" && "bg-lv-lime px-5 py-3 text-lv-ink hover:bg-[#D6FF3D]",
    variant === "text" && "text-lv-ink underline-offset-4 hover:underline",
    className,
  );
  const onClick = () => track("cta_click", { cta_id: ctaId, ...trackParams });
  const inner = (<>{children}{arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}</>);
  return isHash
    ? <a href={to} className={cls} onClick={onClick}>{inner}</a>
    : <Link to={to} className={cls} onClick={onClick}>{inner}</Link>;
}
