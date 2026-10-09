import { useState } from "react";
import { AlertCircle, CheckCircle2, FileText, Mail } from "lucide-react";
import type { Demo } from "@/content/types";
import { DEMO_LABEL, DEMO_CLOSING } from "@/content/demos";
import { checkHref } from "@/lib/cta";
import { track } from "@/lib/track";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

const TABS = ["Input", "Voorbereid", "Volgende stap"] as const;

export function DemoStepper({ demo, source, compact = false }: { demo: Demo; source: string; compact?: boolean }) {
  const [step, setStep] = useState(0);
  const go = (i: number) => { setStep(i); track("demo_step", { demo_id: demo.id, step: i + 1 }); };
  const tabId = (i: number) => `${demo.id}-tab-${i}`;
  const panelId = `${demo.id}-panel`;

  return (
    <div className="overflow-hidden rounded-3xl border border-lv-line bg-lv-surface shadow-[0_30px_70px_-34px_rgba(14,14,12,0.28)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lv-line-soft bg-lv-raised px-5 py-3">
        <p className="font-display text-[15px] font-semibold">{demo.title}</p>
        <span className="rounded-full bg-lv-paper px-2.5 py-1 font-mono text-[10.5px] text-lv-muted ring-1 ring-lv-line">{DEMO_LABEL}</span>
      </div>

      <div role="tablist" aria-label={`${demo.title} in drie stappen`} className="flex gap-1 border-b border-lv-line-soft px-3 pt-3">
        {TABS.map((t, i) => (
          <button
            key={t} id={tabId(i)} role="tab" type="button" aria-selected={step === i} aria-controls={panelId}
            onClick={() => go(i)}
            className={cn("-mb-px rounded-t-lg border-b-2 px-3 py-2 text-[13.5px] font-medium", step === i ? "border-lv-ink text-lv-ink" : "border-transparent text-lv-muted hover:text-lv-ink")}
          >
            <span className="mr-1.5 font-mono text-[11px] text-lv-faint">{i + 1}</span>{t}
          </button>
        ))}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={tabId(step)} className={cn("p-5", compact ? "min-h-[280px]" : "min-h-[320px]")}>
        {step === 0 && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-lv-paper p-4">
              <p className="flex items-center gap-2 font-mono text-[11px] text-lv-faint"><Mail aria-hidden className="h-3.5 w-3.5" />{demo.input.channel}</p>
              <p className="mt-2 text-[13.5px] font-semibold">{demo.input.from}</p>
              <p className="text-[13.5px] text-lv-muted">{demo.input.subject}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-lv-body">{demo.input.body}</p>
            </div>
            <dl className="grid gap-2 sm:grid-cols-2">
              {demo.input.fields.map((f) => (
                <div key={f.label} className={cn("rounded-xl border px-3 py-2", f.value ? "border-lv-line-soft" : "border-dashed border-[#C2410C]/50 bg-[#FFF7ED]")}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{f.label}</dt>
                  <dd className={cn("text-[14px]", !f.value && "text-[#9A3412]")}>{f.value ?? "Ontbreekt"}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <p className="flex items-start gap-2 text-[15px]"><FileText aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{demo.prepared.summary}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-lv-lime-soft p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-lime-ink">Aanwezig</p>
                <ul className="mt-2 space-y-1.5 text-[14px]">{demo.prepared.present.map((x) => <li key={x} className="flex gap-2"><CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-lv-lime-ink" />{x}</li>)}</ul>
              </div>
              <div className="rounded-2xl bg-[#FFF7ED] p-4">
                <p className="font-mono text-[10.5px] uppercase tracking-wider text-[#9A3412]">Ontbreekt</p>
                <ul className="mt-2 space-y-1.5 text-[14px]">{demo.prepared.missing.map((x) => <li key={x} className="flex gap-2"><AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#C2410C]" />{x}</li>)}</ul>
              </div>
            </div>
            {demo.prepared.source && <p className="font-mono text-[11.5px] text-lv-muted">Bron: {demo.prepared.source}</p>}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-lv-line p-4">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-faint">{demo.next.conceptTitle}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed">{demo.next.concept}</p>
              <p className="mt-3 inline-flex rounded-full bg-lv-paper px-2.5 py-1 font-mono text-[11px] text-lv-body ring-1 ring-lv-line">Status: {demo.next.status}</p>
            </div>
            <p className="text-[14px] text-lv-body"><span className="font-medium text-lv-ink">Je team beslist: </span>{demo.next.teamDecides}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-lv-line-soft bg-lv-raised p-5 sm:flex-row sm:items-center sm:justify-between">
        {step < 2
          ? <button type="button" onClick={() => go(step + 1)} className="rounded-full bg-lv-ink px-4 py-2 text-[14px] font-medium text-white">Volgende: {TABS[step + 1]}</button>
          : <p className="max-w-md text-[13px] text-lv-muted">{DEMO_CLOSING}</p>}
        {step === 2 && (
          <CtaLink to={checkHref({ source, demo: demo.id, process: demo.id })} ctaId={`demo-${demo.id}`} trackParams={{ demo_id: demo.id }} variant="lime" className="shrink-0">
            Bekijk of dit bij jullie past
          </CtaLink>
        )}
      </div>
    </div>
  );
}
