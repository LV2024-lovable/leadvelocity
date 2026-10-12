import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function TimelineTabs({ steps, note }: { steps: { label: string; title: string; body: string; checks: string[] }[]; note?: string }) {
  const [i, setI] = useState(0);
  const s = steps[i];
  return (
    <div>
      <div role="tablist" aria-label="Werkwijze in stappen" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {steps.map((st, k) => (
          <button
            key={st.title}
            role="tab"
            id={`tl-tab-${k}`}
            aria-selected={k === i}
            aria-controls="tl-panel"
            type="button"
            onClick={() => setI(k)}
            className={cn("flex flex-col rounded-[18px] px-4 pb-4 pt-4 text-left transition-colors sm:px-5", k === i ? "bg-[#E3E7E5]" : "bg-lv-card hover:bg-[#E3E7E5]")}
          >
            <span className="block text-[13px] text-lv-muted">{st.label}</span>
            <span className="mb-4 mt-1 block font-display text-[18px] font-normal leading-tight sm:text-[21px]">{st.title}</span>
            <span aria-hidden className="mt-auto block h-[3px] rounded-full bg-lv-line">
              <span className={cn("block h-full rounded-full bg-lv-ink transition-all duration-500 motion-reduce:transition-none", k === i ? "w-1/4" : k < i ? "w-full" : "w-0")} />
            </span>
          </button>
        ))}
      </div>
      <div id="tl-panel" role="tabpanel" aria-labelledby={`tl-tab-${i}`} className="mt-2 grid gap-8 rounded-[24px] bg-lv-card p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
        <div>
          <p className="font-mono text-[12px] text-lv-muted">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-3 font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-normal leading-snug">{s.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.checks.map((c) => <li key={c} className="inline-flex items-center gap-2 rounded-[10px] bg-white px-3 py-1.5 text-[13.5px]"><Check aria-hidden className="h-3.5 w-3.5" />{c}</li>)}
          </ul>
        </div>
        {note && <p className="self-end text-[14px] leading-relaxed text-lv-muted">{note}</p>}
      </div>
    </div>
  );
}
