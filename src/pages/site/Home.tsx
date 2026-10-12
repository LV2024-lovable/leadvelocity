import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import { home } from "@/content/pages";
import { categories, categoryById } from "@/content/categories";
import { demoById, demos } from "@/content/demos";
import { ctaLabels } from "@/content/site";
import type { CategoryId } from "@/content/types";
import { checkHref, demoHref, parseCheckContext } from "@/lib/cta";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, PricingCards, Faq, Eyebrow, SegmentPicker,
  ExposureArt, CATEGORY_TONE, Pill, FactTiles, NumberedTabs, TimelineTabs, MediaCard,
} from "@/components/site";

export default function Home() {
  const initial = parseCheckContext(useLocation().search).category;
  const [segment, setSegment] = useState<CategoryId | undefined>(initial);
  const c = segment ? categoryById(segment) : undefined;

  const h1 = `${home.hero.h1Prefix} ${c?.audience ?? home.hero.audienceGeneric}.`;
  const sub = c?.sub ?? home.hero.sub;
  const situations = c?.situations ?? home.genericSituations;
  const demo = demoById(c?.demoId ?? "offerte-intake")!;
  const ctx = (source: string) => checkHref({ source, category: c?.id, process: c?.processKey });

  return (
    <SiteLayout>
      <Seo title={home.seoTitle} description={home.seoDescription} path="/" />

      {/* 1 — Hero, gecentreerd */}
      <section className="px-5 pt-14 sm:px-6 md:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <Pill>{home.hero.eyebrow}</Pill>
          <h1 className="mt-6 break-words text-balance font-display text-[clamp(2.5rem,6.4vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.015em]" aria-live="polite">{h1}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-lv-body">{sub}</p>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] text-lv-muted">{home.hero.forWho}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaLink to={ctx("home-hero")} ctaId="home-hero-check" trackParams={{ category: c?.id }}>{ctaLabels.primary}</CtaLink>
            <CtaLink to={demoHref(c?.demoId, "home-hero")} ctaId="home-hero-demo" variant="secondary">{home.hero.secondary}</CtaLink>
          </div>
          <p className="mt-4 text-[13px] text-lv-muted">{home.hero.ctaMicro}</p>
          <div className="mt-10">
            <SegmentPicker value={segment} onChange={setSegment} label={home.hero.pickerLabel} align="center" />
            {c && (
              <Link to={`/${c.id}`} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium underline-offset-4 hover:underline">
                {home.hero.moreAbout} {c.name.toLowerCase()} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        <ExposureArt tone="dusk" className="mx-auto mt-12 max-w-6xl md:mt-14">
          <div className="flex flex-col gap-6 p-3 sm:p-6 md:p-8">
            <div className="flex justify-start"><Pill tone="dark" dot>Zo werkt het, stap voor stap</Pill></div>
            <div className="mx-auto w-full max-w-xl md:py-6">
              <DemoStepper key={demo.id} demo={demo} source="home-hero" compact />
            </div>
            <div className="flex justify-end"><Pill tone="dark">Jullie team beslist</Pill></div>
          </div>
        </ExposureArt>
      </section>

      {/* 2 — Feittegels */}
      <Section className="pb-10 pt-16 md:pb-12 md:pt-20">
        <FactTiles items={home.facts} />
      </Section>

      {/* 3 — Herken je dit? */}
      <Section className="pb-20 pt-10 md:pb-24 md:pt-12">
        <SectionHead align="center" title={home.recognize.h2} />
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {situations.map((s, i) => (
            <li key={s} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <div className="h-full rounded-[24px] bg-lv-card p-7 text-[16.5px] leading-relaxed">{s}</div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[15.5px] leading-relaxed text-lv-body">{home.recognize.costLine}</p>
      </Section>

      {/* 4 — Wat we bouwen */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" eyebrow={home.build.eyebrow} title={home.build.h2} />
        <div className="mt-12">
          <NumberedTabs value={segment} onChange={setSegment} notes={home.build.notes} />
        </div>
      </Section>

      {/* 5 — Werkwijze */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" eyebrow={home.timeline.eyebrow} title={home.timeline.h2} />
        <div className="mt-12"><TimelineTabs steps={home.timeline.steps} note={home.timeline.note} /></div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <CtaLink to={ctx("home-how")} ctaId="home-how-check">{ctaLabels.primary}</CtaLink>
        </div>
        <p className="mx-auto mt-10 max-w-3xl rounded-[18px] bg-lv-card p-5 text-center text-[14.5px] leading-relaxed text-lv-body">{home.howItWorks.aiNote}</p>
      </Section>

      {/* 6 — Zo ziet het eruit */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" eyebrow={home.showcase.eyebrow} title={home.showcase.h2} intro={home.showcase.intro} />
        <ul className="mt-12 grid gap-3 md:grid-cols-2">
          {demos.map((d, i) => (
            <li key={d.id} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <MediaCard
                  tone={CATEGORY_TONE[d.categoryId]}
                  label={categoryById(d.categoryId)!.name}
                  title={d.title}
                  body={d.prepared.summary}
                  href={demoHref(d.id, "home-showcase")}
                  cta={home.showcase.cta}
                />
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <CtaLink to="/voorbeelden" ctaId="home-examples" variant="secondary" arrow>{home.howItWorks.examplesLink}</CtaLink>
        </div>
      </Section>

      {/* 7 — Past in wat je al hebt */}
      <Section className="py-20 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead title={home.fits.h2} intro={home.fits.intro} />
            <ul className="mt-8 space-y-3 text-[16px]">
              {home.fits.points.map((p) => <li key={p} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{p}</li>)}
            </ul>
          </div>
          <Reveal>
            <div className="rounded-[24px] bg-lv-card p-8">
              <p className="font-display text-[22px] font-medium leading-tight">{home.fits.needTitle}</p>
              <ul className="mt-5 space-y-3 text-[15.5px]">{home.fits.need.map((n) => <li key={n} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{n}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 8 — Prijzen */}
      <Section id="pakketten" className="py-20 md:py-24">
        <SectionHead align="center" eyebrow={home.pricing.eyebrow} title={home.pricing.h2} />
        <div className="mt-12"><PricingCards source="home-packages" /></div>
        <div className="mt-8 flex justify-center">
          <Link to="/prijzen" className="inline-flex items-center gap-1.5 text-[15px] font-medium underline-offset-4 hover:underline">{home.trajectory.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* 9 — Voor wie dit werkt (en voor wie niet) */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" title={home.qualifier.h2} />
        <div className="mt-12 grid gap-3 md:grid-cols-2">
          <div className="rounded-[24px] bg-lv-card p-8">
            <Eyebrow>{home.qualifier.fitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px]">{home.qualifier.fit.map((x) => <li key={x} className="flex gap-3"><Check aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
          <div className="rounded-[24px] bg-white p-8 ring-1 ring-lv-line">
            <Eyebrow>{home.qualifier.notFitTitle}</Eyebrow>
            <ul className="space-y-3 text-[15.5px] text-lv-body">{home.qualifier.notFit.map((x) => <li key={x} className="flex gap-3"><X aria-hidden className="mt-1 h-4 w-4 shrink-0" />{x}</li>)}</ul>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="mx-auto max-w-3xl font-display text-[22px] font-normal leading-snug">{home.qualifier.doubt}</p>
          <CtaLink to={ctx("home-qualifier")} ctaId="home-qualifier-check" className="mt-6">{ctaLabels.primary}</CtaLink>
        </div>
      </Section>

      {/* 10 — Zekerheden */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" title={home.assurances.h2} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {home.assurances.points.map((p, i) => (
            <li key={p} className="h-full">
              <Reveal delay={i * 0.05} className="h-full">
                <div className="flex h-full gap-4 rounded-[24px] bg-lv-card p-6 text-[15.5px] leading-relaxed sm:flex-col sm:gap-5">
                  <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" /><span>{p}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* 11 — FAQ */}
      <Section className="py-20 md:py-24">
        <SectionHead align="center" eyebrow="Veelgestelde vragen" title="Vragen, beantwoord." />
        <div className="mx-auto mt-12 max-w-3xl"><Faq ids={home.faqIds} /></div>
      </Section>

      {/* 12 — Slot */}
      <section className="px-4 pb-6 sm:px-6">
        <p className="mx-auto mb-6 max-w-6xl text-center text-[14px] text-lv-muted">
          {home.aboutLine.text}{" "}
          <Link to="/over" className="whitespace-nowrap font-medium text-lv-ink underline underline-offset-4">{home.aboutLine.link}</Link>
        </p>
        <ExposureArt tone="dusk" className="mx-auto max-w-6xl">
          <div className="px-6 py-20 text-center text-white sm:px-10 md:py-28">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.015em]">{home.closing.h2}</h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">{home.closing.body}</p>
            <CtaLink to={ctx("home-bottom")} ctaId="home-bottom" variant="lime" className="mt-9">{ctaLabels.primary}</CtaLink>
            <p className="mt-4 text-[13px] text-white/60">{ctaLabels.micro}</p>
            <p className="mt-10 text-[14px] text-white/70">
              Of kies je situatie:{" "}
              {categories.map((x, i) => (
                <span key={x.id}>
                  <Link to={`/${x.id}`} className="underline underline-offset-4 hover:text-white">{x.heroNoun}</Link>{i < categories.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </ExposureArt>
      </section>
    </SiteLayout>
  );
}
