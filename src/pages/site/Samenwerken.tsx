import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { home, partnership, samenwerken } from "@/content/pages";
import { ctaLabels } from "@/content/site";
import { checkHref } from "@/lib/cta";
import { SiteLayout, Seo, Section, SectionHead, CtaLink, PartnerTrack } from "@/components/site";

const phaseTitleCls = "font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.015em]";

export default function Samenwerken() {
  return (
    <SiteLayout>
      <Seo title={samenwerken.seoTitle} description={samenwerken.seoDescription} path="/samenwerken" />
      <Section className="pt-14 md:pt-20" story="samenwerken">
        <SectionHead as="h1" story="samenwerken" title={samenwerken.h1} intro={samenwerken.intro} />
      </Section>
      <Section className="pt-0">
        <PartnerTrack source="samenwerken" showCta={false} align="left" />
      </Section>
      <Section tone="raised">
        {partnership.phases.map((ph, pi) => samenwerken.phaseSteps[pi].length > 0 && (
          <div key={ph.title} className="mt-12 first:mt-0">
            <h2 className={phaseTitleCls}>{ph.title}</h2>
            <ol className="mt-6 space-y-4">
              {samenwerken.phaseSteps[pi].map((si) => {
                const s = samenwerken.steps[si];
                return (
                  <li key={s.title} data-step className="grid gap-5 rounded-[24px] bg-lv-card p-7 md:grid-cols-[12rem_1fr_1fr_1fr]">
                    <div>
                      <span className="font-mono text-[12px] text-lv-muted">{String(si + 1).padStart(2, "0")}</span>
                      <h3 className="mt-1 font-display text-[24px] font-medium tracking-[-0.015em]">{s.title}</h3>
                    </div>
                    {(["output", "client", "decision"] as const).map((k) => (
                      <div key={k}>
                        <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{samenwerken.stepLabels[k]}</p>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-lv-body">{s[k]}</p>
                      </div>
                    ))}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
        <div className="mt-12">
          <h2 className={phaseTitleCls}>{samenwerken.expandTitle}</h2>
          <p className="mt-3 max-w-2xl text-[16.5px] leading-relaxed text-lv-body">{samenwerken.expandBody}</p>
          <Link to="/prijzen" className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">
            {home.pricing.link}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </Section>
      <Section>
        <div className="rounded-[24px] bg-lv-card p-8">
          <p className="font-display text-[22px] font-medium leading-tight">{samenwerken.needTitle}</p>
          <ul className="mt-5 space-y-3 text-[15.5px]">
            {samenwerken.need.map((n) => <li key={n} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{n}</li>)}
          </ul>
        </div>
        <CtaLink to={checkHref({ source: "samenwerken" })} ctaId="samenwerken-check" className="mt-12">{ctaLabels.primary}</CtaLink>
      </Section>
    </SiteLayout>
  );
}
