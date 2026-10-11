import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { home } from "@/content/pages";
import { categories, categoryById } from "@/content/categories";
import { demoById } from "@/content/demos";
import { ctaLabels } from "@/content/site";
import type { CategoryId } from "@/content/types";
import { checkHref, demoHref, parseCheckContext } from "@/lib/cta";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, Steps, PricingCards, Faq, Eyebrow, SegmentPicker,
} from "@/components/site";

export default function Home() {
  const initial = parseCheckContext(useLocation().search).category;
  const [segment, setSegment] = useState<CategoryId | undefined>(initial);
  const c = segment ? categoryById(segment) : undefined;

  const h1 = c?.h1 ?? home.hero.h1;
  const sub = c?.sub ?? home.hero.sub;
  const situations = c?.situations ?? home.genericSituations;
  const demo = demoById(c?.demoId ?? "offerte-intake")!;
  const ctx = (source: string) => checkHref({ source, category: c?.id, process: c?.processKey });

  return (
    <SiteLayout>
      <Seo title={home.seoTitle} description={home.seoDescription} path="/" />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
        <GridPattern width={56} height={56} className="fill-transparent stroke-lv-line/70 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_35%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-lv-muted">{home.hero.eyebrow}</p>
            <h1 className="mt-5 break-words font-display text-[clamp(2.1rem,5.6vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]" aria-live="polite">{h1}</h1>
            <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-lv-body">{sub}</p>
            <p className="mt-3 text-[14.5px] text-lv-muted">{home.hero.forWho}</p>
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-4">
              <div>
                <CtaLink to={ctx("home-hero")} ctaId="home-hero-check" trackParams={{ category: c?.id }}>{ctaLabels.primary}</CtaLink>
                <p className="mt-2 max-w-[19rem] text-[13px] text-lv-muted">{home.hero.ctaMicro}</p>
              </div>
              <div>
                <CtaLink to={demoHref(c?.demoId, "home-hero")} ctaId="home-hero-demo" variant="secondary">{home.hero.secondary}</CtaLink>
                <p className="mt-2 text-[13px] text-lv-muted">{home.hero.secondaryMicro}</p>
              </div>
            </div>
            <div className="mt-10">
              <SegmentPicker value={segment} onChange={setSegment} label={home.hero.pickerLabel} />
              {c && (
                <Link to={`/${c.id}`} className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline">
                  {home.hero.moreAbout} {c.name.toLowerCase()} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
          <DemoStepper key={demo.id} demo={demo} source="home-hero" compact />
        </div>
      </section>

      {/* 2 — Herken je dit? */}
      <Section tone="raised">
        <SectionHead title={home.recognize.h2} />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {situations.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <li className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7 text-[16.5px] leading-relaxed">{s}</li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-[15.5px] text-lv-body">{home.recognize.costLine}</p>
      </Section>

      {/* 3 — Zo werkt het */}
      <Section>
        <SectionHead title={home.howItWorks.h2} />
        <div className="mt-12"><Steps steps={home.howItWorks.steps} /></div>
        <p className="mt-10 max-w-2xl rounded-2xl bg-lv-raised p-5 text-[15px] leading-relaxed text-lv-body ring-1 ring-lv-line">{home.howItWorks.aiNote}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <CtaLink to={ctx("home-how")} ctaId="home-how-check">{ctaLabels.primary}</CtaLink>
          <Link to="/voorbeelden" className="inline-flex items-center gap-1.5 text-[15px] font-medium">{home.howItWorks.examplesLink}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* 4 — Past in wat je al hebt */}
      <Section tone="raised">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead title={home.fits.h2} intro={home.fits.intro} />
            <ul className="mt-8 space-y-3 text-[16px]">
              {home.fits.points.map((p) => <li key={p} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{p}</li>)}
            </ul>
          </div>
          <Reveal>
            <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
              <Eyebrow>{home.fits.needTitle}</Eyebrow>
              <ul className="space-y-3 text-[15.5px]">{home.fits.need.map((n) => <li key={n} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{n}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Traject en prijs */}
      <Section id="pakketten">
        <SectionHead title={home.trajectory.h2} />
        <div className="mt-12"><Steps steps={home.trajectory.steps} /></div>
        <div className="mt-14"><PricingCards source="home-packages" /></div>
        <Link to="/prijzen" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.trajectory.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 6 — Voor wie dit werkt (en voor wie niet) */}
      <Section tone="raised">
        <SectionHead title={home.qualifier.h2} />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-lv-line bg-lv-surface p-8">
            <Eyebrow>{home.qualifier.fitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{home.qualifier.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-3xl border border-lv-line p-8">
            <Eyebrow>{home.qualifier.notFitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{home.qualifier.notFit.map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
        <p className="mt-6 text-[15.5px] text-lv-body">{home.qualifier.doubt}</p>
        <CtaLink to={ctx("home-qualifier")} ctaId="home-qualifier-check" className="mt-6">{ctaLabels.primary}</CtaLink>
      </Section>

      {/* 7 — Zekerheden */}
      <Section>
        <SectionHead title={home.assurances.h2} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {home.assurances.points.map((p) => (
            <li key={p} className="flex gap-3 rounded-2xl border border-lv-line bg-lv-surface p-5 text-[15.5px]"><ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0" />{p}</li>
          ))}
        </ul>
      </Section>

      {/* 8 — Over */}
      <Section tone="raised">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">{home.about.h2}</h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-lv-body">{home.about.body}</p>
          <CtaLink to="/over" ctaId="home-about" variant="secondary" className="mt-6">{home.about.cta}</CtaLink>
        </Reveal>
      </Section>

      {/* 9 — FAQ */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Faq ids={home.faqIds} />
        </div>
      </Section>

      {/* 10 — Slot */}
      <section className="px-4 pb-6 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-lv-ink px-7 py-20 text-center text-white">
          <GridPattern width={48} height={48} className="fill-transparent stroke-white/[0.07]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{home.closing.h2}</h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] text-white/70">{home.closing.body}</p>
            <CtaLink to={ctx("home-bottom")} ctaId="home-bottom" variant="lime" className="mt-9">{ctaLabels.primary}</CtaLink>
            <p className="mt-6 text-[14px] text-white/60">
              Of kies je situatie:{" "}
              {categories.map((x, i) => (
                <span key={x.id}>
                  <Link to={`/${x.id}`} className="underline underline-offset-4 hover:text-white">{x.heroNoun}</Link>{i < categories.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
