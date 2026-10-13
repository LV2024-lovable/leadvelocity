import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import type { CategoryId } from "@/content/types";
import { categoryById, GENERIC_NOT_FIT } from "@/content/categories";
import { demoById } from "@/content/demos";
import { home, buildH2For, categoryHero, categoryPricingTitle, categoryFaqTitle } from "@/content/pages";
import { solutionProcessLink } from "@/content/site";
import { checkHref, demoHref } from "@/lib/cta";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, PricingCards, Faq, Eyebrow,
  ExposureArt, CATEGORY_TONE, Pill, PartnerTrack,
} from "@/components/site";

export default function CategoryPage({ id }: { id: CategoryId }) {
  const c = categoryById(id)!;
  const demo = demoById(c.demoId)!;
  const checkCtx = { category: c.id, process: c.processKey } as const;

  return (
    <SiteLayout>
      <Seo title={c.seoTitle} description={c.seoDescription} path={`/${c.id}`} />

      <Section className="pt-14 md:pt-20">
        <Pill className="mb-5">{categoryHero(c.audience)}</Pill>
        <SectionHead as="h1" title={c.h1} intro={c.sub} />
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}` })} ctaId={`category-${c.id}-check`} trackParams={{ category: c.id, process: c.processKey }}>{c.primaryCta}</CtaLink>
          <CtaLink to={demoHref(c.demoId, `category-${c.id}`)} ctaId={`category-${c.id}-demo`} variant="secondary">{c.secondaryCta}</CtaLink>
        </Reveal>
        <p className="mt-6 font-mono text-[12px] text-lv-muted">Bijvoorbeeld: {c.subsegments.join(" · ")}</p>
        <ExposureArt tone={CATEGORY_TONE[c.id]} className="mt-12 min-h-[260px]">
          <div className="flex min-h-[260px] flex-wrap content-center items-center justify-center gap-2 p-6 sm:p-8">
            {c.exampleFlow.map((s) => <Pill key={s} tone="dark" dot>{s}</Pill>)}
          </div>
        </ExposureArt>
      </Section>

      <Section story="herkenbaar">
        <SectionHead story="herkenbaar" title={home.recognize.h2} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {c.situations.map((s, i) => (
            <li key={s} className="h-full"><Reveal delay={i * 0.05} className="h-full"><div className="h-full rounded-[24px] bg-lv-card p-7 text-[16.5px] leading-relaxed">{s}</div></Reveal></li>
          ))}
        </ul>
      </Section>

      <Section story="bouwen" tone="raised">
        <SectionHead story="bouwen" title={buildH2For(c.audience)} />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {c.solutions.map((s) => (
            <li key={s.title} data-solution-card className="flex h-full flex-col rounded-[24px] bg-lv-card p-7">
              <h3 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">{s.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-lv-body">{s.line}</p>
              <p className="mt-4 text-[13.5px] text-lv-muted">Jullie team beslist: {s.decides.charAt(0).toLowerCase() + s.decides.slice(1)}</p>
              <Link to={`/oplossingen/${s.processId}`} className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium underline-offset-4 hover:underline">
                {solutionProcessLink} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section story="voorbeelden" id="demo">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHead story="voorbeelden" title={demo.title} intro={demo.prepared.summary} />
            <ol className="mt-8 flex flex-wrap items-center gap-2 text-[14px]">
              {c.exampleFlow.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="rounded-[10px] bg-lv-card px-3 py-1.5"><span className="mr-2 font-mono text-[11px] text-lv-faint">{i + 1}</span>{s}</span>
                  {i < c.exampleFlow.length - 1 && <span aria-hidden className="text-lv-faint">→</span>}
                </li>
              ))}
            </ol>
          </div>
          <DemoStepper demo={demo} source={`category-${c.id}`} />
        </div>
      </Section>

      <Section story="samenwerken">
        <PartnerTrack source={`category-${c.id}`} align="left" showCta={false} />
      </Section>

      <Section story="prijzen" tone="raised">
        <SectionHead story="prijzen" title={categoryPricingTitle} />
        <div className="mt-12"><PricingCards source={`category-${c.id}`} /></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-[24px] bg-lv-card p-8">
            <Eyebrow>Passend</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{c.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
            <Eyebrow className="mt-8">Wat we meten</Eyebrow>
            <ul className="space-y-2 text-[15px] text-lv-body">{c.measures.map((x) => <li key={x}>— {x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>Niet passend</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{[...c.limits, ...GENERIC_NOT_FIT].map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section story="vragen">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead story="vragen" title={categoryFaqTitle} />
          <Faq ids={c.faqIds} />
        </div>
        <div className="mt-16 rounded-[28px] bg-lv-ink p-10 text-center text-white">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-normal tracking-[-0.015em]">{home.closing.h2}</h2>
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}-bottom` })} ctaId={`category-${c.id}-bottom`} variant="lime" className="mt-8">{c.primaryCta}</CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
