import { useId } from "react";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { cn } from "@/lib/utils";

/** Keuzeknoppen voor het segment; de bezoeker bepaalt, niets wisselt vanzelf. */
export function SegmentPicker({ value, onChange, label }: { value?: CategoryId; onChange: (id: CategoryId) => void; label: string }) {
  const labelId = useId();
  return (
    <div data-segment-picker role="group" aria-labelledby={labelId}>
      <p id={labelId} className="mb-3 text-[14px] font-medium text-lv-body">{label}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c.id === value;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(c.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[14.5px] font-medium capitalize transition-colors",
                active ? "bg-lv-ink text-white" : "bg-lv-surface text-lv-ink ring-1 ring-lv-line hover:ring-lv-ink",
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
