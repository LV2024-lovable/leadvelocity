import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/content/types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link to={`/${category.id}`} className="group flex h-full flex-col rounded-3xl border border-lv-line bg-lv-surface p-7 transition-colors hover:border-lv-ink">
      <h3 className="font-display text-[22px] font-semibold tracking-[-0.025em]">{category.name}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-lv-body">{category.cardLine}</p>
      <p className="mt-4 font-mono text-[11.5px] text-lv-muted">{category.subsegments.slice(0, 3).join(" · ")}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[14px] font-medium">{category.cardCta}<ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
    </Link>
  );
}
