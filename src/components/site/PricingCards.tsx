import { Check } from "lucide-react";
import { standardPackages, customPackage, formatEuro, costMicrocopy } from "@/content/pricing";
import { checkHref } from "@/lib/cta";
import { CtaLink } from "./CtaLink";
import { cn } from "@/lib/utils";

export function PricingCards({ source, showIncludes = false }: { source: string; showIncludes?: boolean }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-3">
        {standardPackages.map((p) => {
          const featured = !!p.badge;
          return (
            <div key={p.id} className={cn("relative flex flex-col rounded-[24px] p-7", featured ? "bg-lv-ink text-white" : "bg-lv-card")}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[21px] font-medium tracking-[-0.015em]">{p.name}</h3>
                {p.badge && <span className="rounded-full bg-lv-lime px-2.5 py-1 font-mono text-[10.5px] text-lv-ink">{p.badge}</span>}
              </div>
              <p className={cn("mt-2 text-[14.5px] leading-relaxed", featured ? "text-white/70" : "text-lv-body")}>{p.promise}</p>
              <dl className="mt-6 space-y-1">
                <div className="flex items-baseline gap-2"><dt className="sr-only">Inrichting vanaf</dt><dd className="font-display text-[32px] font-normal tracking-[-0.015em]">{formatEuro(p.setupFrom)}</dd><span className={cn("text-[13px]", featured ? "text-white/60" : "text-lv-muted")}>inrichting vanaf</span></div>
                <div className="flex items-baseline gap-2"><dt className="sr-only">Beheer per maand vanaf</dt><dd className="font-display text-[20px] font-medium">{formatEuro(p.monthlyFrom)}</dd><span className={cn("text-[13px]", featured ? "text-white/60" : "text-lv-muted")}>per maand vanaf</span></div>
              </dl>
              {showIncludes && (
                <ul className="mt-6 space-y-2 text-[14px]">
                  {p.includes.map((x) => <li key={x} className="flex gap-2"><Check aria-hidden className={cn("mt-0.5 h-4 w-4 shrink-0", featured && "text-lv-lime")} />{x}</li>)}
                </ul>
              )}
              <div className="mt-auto pt-7">
                <CtaLink to={checkHref({ source, package: p.id })} ctaId={`package-${p.id}`} trackParams={{ package_id: p.id }} variant={featured ? "lime" : "secondary"} className={cn("w-full", !featured && "bg-white hover:bg-lv-raised")}>{p.ctaLabel}</CtaLink>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col items-start justify-between gap-5 rounded-[24px] bg-white ring-1 ring-lv-line p-7 md:flex-row md:items-center">
        <div>
          <h3 className="font-display text-[19px] font-medium tracking-[-0.015em]">{customPackage.name}</h3>
          <p className="mt-1 text-[14.5px] text-lv-body">{customPackage.promise}</p>
          <p className="mt-1 font-mono text-[12.5px] text-lv-muted">{formatEuro(customPackage.setupFrom)} inrichting vanaf · {formatEuro(customPackage.monthlyFrom)} per maand vanaf</p>
        </div>
        <CtaLink to={checkHref({ source, package: "custom" })} ctaId="package-custom" trackParams={{ package_id: "custom" }} variant="secondary">{customPackage.ctaLabel}</CtaLink>
      </div>
      <p className="mt-4 text-[13.5px] text-lv-muted">{costMicrocopy}</p>
    </div>
  );
}
