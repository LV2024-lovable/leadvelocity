import { Check, UserCheck } from "lucide-react";

export function HumanControl({ title, body, prepared, decides }: { title: string; body: string; prepared?: string[]; decides?: string }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-3xl border border-lv-line bg-lv-line md:grid-cols-2">
      <div className="bg-lv-surface p-8">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
        <p className="mt-4 text-[16px] leading-relaxed text-lv-body">{body}</p>
      </div>
      <div className="grid gap-px bg-lv-line">
        {prepared && (
          <div className="bg-lv-surface p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-muted">Het systeem bereidt voor</p>
            <ul className="mt-3 space-y-2 text-[15px]">{prepared.map((p) => <li key={p} className="flex gap-2"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{p}</li>)}</ul>
          </div>
        )}
        {decides && (
          <div className="bg-lv-lime-soft p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-lv-lime-ink">Je team beslist</p>
            <p className="mt-3 flex gap-2 text-[15px]"><UserCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{decides}</p>
          </div>
        )}
      </div>
    </div>
  );
}
