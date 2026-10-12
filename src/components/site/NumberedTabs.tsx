import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/content/categories";
import type { CategoryId } from "@/content/types";
import { CATEGORY_TONE, ExposureArt } from "./ExposureArt";
import { Pill } from "./Pill";
import { cn } from "@/lib/utils";

export function NumberedTabs({ value, onChange, notes }: { value: CategoryId; onChange: (id: CategoryId) => void; notes: string[] }) {
  const active = categories.find((c) => c.id === value) ?? categories[0];
  const flow = active.exampleFlow.slice(0, 4);
  return (
    <div className="grid gap-3 lg:grid-cols-[0.95fr_1.25fr]">
      <div className="flex flex-col gap-2" role="group" aria-label="Kies een aanvraagstroom">
        {categories.map((c, i) => {
          const on = c.id === active.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(c.id)}
              className={cn("rounded-[20px] px-6 py-5 text-left transition-colors", on ? "bg-lv-ink text-white" : "bg-lv-card text-lv-ink hover:bg-[#E3E7E5]")}
            >
              <span className="flex items-baseline gap-4">
                <span className={cn("font-mono text-[12px]", on ? "text-white/60" : "text-lv-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal capitalize leading-tight">{c.heroNoun}</span>
              </span>
              {on && <span className="mt-2 block pl-9 text-[14.5px] leading-relaxed text-white/75">{c.sub}</span>}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <ExposureArt tone={CATEGORY_TONE[active.id]} className="min-h-[280px] flex-1 sm:min-h-[340px]">
          <div className="flex h-full min-h-[280px] flex-col justify-between p-5 sm:min-h-[340px] sm:p-6">
            <div className="flex justify-end"><Pill tone="dark">{active.name}</Pill></div>
            <ol className="flex flex-col items-center py-4">
              {flow.map((s, i) => (
                <li key={s} className="flex flex-col items-center">
                  <Pill tone="dark" dot>{s}</Pill>
                  {i < flow.length - 1 && <span aria-hidden className="h-4 w-px bg-white/45" />}
                </li>
              ))}
            </ol>
            <div>
              <Link to={`/${active.id}`} className="inline-flex items-center gap-1.5 rounded-[10px] bg-black/45 px-3 py-2 text-[13.5px] text-white ring-1 ring-white/15 backdrop-blur hover:bg-black/60">
                Meer over {active.name.toLowerCase()} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </ExposureArt>
        <ul className="grid gap-3 sm:grid-cols-3">
          {notes.map((n) => (
            <li key={n} className="flex items-start gap-2 rounded-[18px] bg-lv-card p-4 text-[14px] text-lv-body">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lv-lime ring-1 ring-black/10" />{n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
