import { useId } from "react";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { cn } from "@/lib/utils";

/** Keuzeknoppen voor het segment; de bezoeker bepaalt, niets wisselt vanzelf. */
export function SegmentPicker({ value, onChange, label, align = "left" }: { value?: CategoryId; onChange: (id: CategoryId) => void; label: string; align?: "left" | "center" }) {
  const labelId = useId();
  return (
    <div data-segment-picker role="group" aria-labelledby={labelId}>
      <p id={labelId} className={cn("mb-3 text-[14px] font-medium text-lv-body", align === "center" && "text-center")}>{label}</p>
      <div className={cn("flex flex-wrap gap-2", align === "center" && "justify-center")}>
        {categories.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(c.id)}
              className={cn(
                "rounded-[10px] px-4 py-2 text-[14.5px] font-medium capitalize transition-colors",
                active ? "bg-lv-ink text-white" : "bg-lv-card text-lv-ink hover:bg-lv-card-hover",
              )}
            >
              {c.heroNoun}
            </button>
          );
        })}
      </div>
    </div>
  );
}
