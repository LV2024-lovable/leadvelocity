import { Check } from "lucide-react";
import type { CampaignId } from "@/content/types";
import { campaignById } from "@/content/campaigns";
import { categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { standardPackages, formatEuro, scopeLine, costMicrocopy } from "@/content/pricing";
import { checkHref } from "@/lib/cta";
import {
  Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, Faq, Eyebrow,
  CampaignHeader, CampaignFooter, useScrollTopAndUtm, ExposureArt, CATEGORY_TONE, Pill,
} from "@/components/site";

export default function CampaignPage({ id }: { id: CampaignId }) {
  useScrollTopAndUtm();
  const c = campaignById(id)!;
  const cat = categoryById(c.categoryId)!;
  const demo = demoById(c.demoId)!;
  const href = (src: string) => checkHref({ source: src, category: c.categoryId, process: c.id, campaign: c.id });
  const from = standardPackages[0];

  return (
    <div className="min-h-screen bg-lv-paper text-lv-ink">
      <Seo title={c.seoTitle} description={c.seoDescription} path={`/campagnes/${c.id}`} noindex />
      <CampaignHeader ctaHref={href(`campaign-${c.id}-header`)} ctaLabel={c.primaryLabel} ctaId={`campaign-${c.id}-header`} />
      <main id="main">
        <Section className="pt-14 md:pt-20">
          <Eyebrow>{cat.name}</Eyebrow>
          <SectionHead as="h1" title={c.h1} intro={c.sub} />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <CtaLink to={href(`campaign-${c.id}-hero`)} ctaId={`campaign-${c.id}-hero`} trackParams={{ campaign_id: c.id }}>{c.primaryLabel}</CtaLink>
            <CtaLink to="#demo" ctaId={`campaign-${c.id}-demo`} variant="secondary">Bekijk het voorbeeld</CtaLink>
          </Reveal>
          <ExposureArt tone={CATEGORY_TONE[cat.id]} className="mt-12 min-h-[260px]">
            <div className="flex min-h-[260px] flex-wrap content-center items-center justify-center gap-2 p-6 sm:p-8">
              {cat.exampleFlow.map((s) => <Pill key={s} tone="dark" dot>{s}</Pill>)}
          </div>
        </ExposureArt>
        </Section>

        <Section tone="raised">
          <SectionHead title={c.message} />
          <ul className="mt-10 grid gap-3 md:grid-cols-3">
            {c.tasks.map((t) => <li key={t} className="flex gap-3 rounded-[20px] bg-lv-card p-5 text-[15.5px]"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{t}</li>)}
          </ul>
        </Section>

        <Section id="demo">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
            <DemoStepper demo={demo} source={`campaign-${c.id}`} />
          </div>
        </Section>

        <Section tone="raised">
          <HumanControl title="Wat we voorbereiden. Wat je team beslist." body={cat.teamDecides} prepared={c.tasks} decides={[cat.teamDecides, ...cat.limits].join(" ")} />
        </Section>

        <Section>
          <SectionHead title="Hoe het gratis adviesgesprek werkt" intro="In 20 minuten bekijken we welk werk bij jullie steeds terugkomt, wat jullie huidige software al doet en of automatiseren loont. Gratis en vrijblijvend." />
        </Section>

        <Section tone="raised">
          <SectionHead title="Prijsindicatie en scope" intro={scopeLine} />
          <p className="mt-6 font-display text-[22px] font-medium tracking-[-0.015em]">Inrichting vanaf {formatEuro(from.setupFrom)}, beheer vanaf {formatEuro(from.monthlyFrom)} per maand.</p>
          <p className="mt-3 text-[14px] text-lv-muted">{costMicrocopy}</p>
        </Section>

        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
            <Faq ids={c.faqIds} />
          </div>
          <div className="mt-16 rounded-[28px] bg-lv-ink p-10 text-center text-white">
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-normal tracking-[-0.015em]">{c.h1}</h2>
            <CtaLink to={href(`campaign-${c.id}-bottom`)} ctaId={`campaign-${c.id}-bottom`} variant="lime" className="mt-8">{c.primaryLabel}</CtaLink>
          </div>
        </Section>
      </main>
      <CampaignFooter />
    </div>
  );
}
