import { Check, X } from "lucide-react";
import type { CategoryId } from "@/content/types";
import { categoryById, GENERIC_NOT_FIT } from "@/content/categories";
import { demoById } from "@/content/demos";
import { home } from "@/content/pages";
import { checkHref, demoHref } from "@/lib/cta";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, HumanControl, Steps, PricingCards, Faq, Eyebrow,
} from "@/components/site";

export default function CategoryPage({ id }: { id: CategoryId }) {
  const c = categoryById(id)!;
  const demo = demoById(c.demoId)!;
  const checkCtx = { category: c.id, process: c.processKey } as const;

  return (
    <SiteLayout>
      <Seo title={c.seoTitle} description={c.seoDescription} path={`/${c.id}`} />

      <Section className="pt-14 md:pt-20">
        <Eyebrow>{c.name}</Eyebrow>
        <SectionHead as="h1" title={c.h1} intro={c.sub} />
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}` })} ctaId={`category-${c.id}-check`} trackParams={{ category: c.id, process: c.processKey }}>{c.primaryCta}</CtaLink>
          <CtaLink to={demoHref(c.demoId, `category-${c.id}`)} ctaId={`category-${c.id}-demo`} variant="secondary">{c.secondaryCta}</CtaLink>
        </Reveal>
        <p className="mt-6 font-mono text-[12px] text-lv-muted">Bijvoorbeeld: {c.subsegments.join(" · ")}</p>
      </Section>

      <Section>
        <SectionHead title="Herken je dit?" />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {c.situations.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <li className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7 text-[16.5px] leading-relaxed">{s}</li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="raised">
        <SectionHead title="Wat we voor je voorbereiden" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.tasks.map((t, i) => (
            <Reveal key={t} delay={i * 0.04}><li className="flex h-full gap-3 rounded-2xl border border-lv-line bg-lv-surface p-5 text-[15.5px]"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{t}</li></Reveal>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="Zo loopt een werkstroom" intro="Een voorbeeld met fictieve gegevens." />
        <ol className="mt-10 flex flex-wrap items-center gap-2 text-[14.5px]">
          {c.exampleFlow.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className="rounded-full border border-lv-line bg-lv-surface px-3.5 py-2"><span className="mr-2 font-mono text-[11px] text-lv-faint">{i + 1}</span>{s}</span>
              {i < c.exampleFlow.length - 1 && <span aria-hidden className="text-lv-faint">→</span>}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="raised">
        <HumanControl title="Je team houdt het oordeel." body={c.teamDecides} prepared={c.tasks.slice(0, 3)} decides={`Niet door het systeem: ${c.limits.join(". ")}.`} />
      </Section>

      <Section id="demo">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Voorbeeld" title={demo.title} intro={demo.prepared.summary} />
          <DemoStepper demo={demo} source={`category-${c.id}`} />
        </div>
      </Section>

      <Section tone="raised">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
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

      <Section>
        <SectionHead eyebrow="Werkwijze" title={home.trajectory.h2} />
        <div className="mt-12"><Steps steps={home.trajectory.steps} /></div>
      </Section>

      <Section tone="raised">
        <SectionHead eyebrow="Prijzen" title="Een passende start, met ruimte om uit te breiden." />
        <div className="mt-12"><PricingCards source={`category-${c.id}`} /></div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Faq ids={c.faqIds} />
        </div>
        <div className="mt-16 rounded-[28px] bg-lv-ink p-10 text-center text-white">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold tracking-[-0.035em]">{home.closing.h2}</h2>
          <CtaLink to={checkHref({ ...checkCtx, source: `category-${c.id}-bottom` })} ctaId={`category-${c.id}-bottom`} variant="lime" className="mt-8">{c.primaryCta}</CtaLink>
        </div>
      </Section>
    </SiteLayout>
  );
}
