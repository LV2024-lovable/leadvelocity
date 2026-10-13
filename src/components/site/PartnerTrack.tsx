import { partnership } from "@/content/pages";
import { ctaLabels } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { ShieldCheck } from "lucide-react";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { CtaLink } from "./CtaLink";

/** Samenwerken in 4 fasen plus "Waar je op kunt rekenen". Rendert geen eigen <section>: wikkel hem in <Section story="samenwerken">. */
export function PartnerTrack({ source, showCta = true, showLabel = true, align = "center" }: { source: string; showCta?: boolean; showLabel?: boolean; align?: "left" | "center" }) {
  return (
    <div data-partner-track>
      <SectionHead story={showLabel ? "samenwerken" : undefined} align={align} title={partnership.h2} />
      <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {partnership.phases.map((p, i) => (
          <li key={p.title} data-phase className="h-full">
            <Reveal delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-[24px] bg-lv-card p-7">
                <span className="font-mono text-[12px] text-lv-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-5 font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{partnership.weLabel}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{p.we}</p>
                <p className="mt-4 font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{partnership.youLabel}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{p.you}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className="mt-8 rounded-[24px] bg-white p-7 ring-1 ring-lv-line">
        <p className="font-display text-[20px] font-medium">{partnership.assurancesTitle}</p>
        <ul className="mt-4 grid gap-3 text-[15px] sm:grid-cols-2">
          {partnership.assurances.map((a) => <li key={a} className="flex gap-3"><ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />{a}</li>)}
        </ul>
      </div>
      {showCta && (
        <div className={align === "center" ? "mt-10 flex justify-center" : "mt-10"}>
          <CtaLink to={checkHref({ source })} ctaId={`${source}-check`}>{ctaLabels.primary}</CtaLink>
        </div>
      )}
    </div>
  );
}
