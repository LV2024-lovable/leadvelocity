import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ClipboardList, FileSearch, BellRing } from "lucide-react";
import { home } from "@/content/pages";
import { categories } from "@/content/categories";
import { processes } from "@/content/processes";
import { demoById } from "@/content/demos";
import { ctaLabels } from "@/content/site";
import { checkHref, demoHref, parseCheckContext } from "@/lib/cta";
import { GridPattern } from "@/components/ui/grid-pattern";
import {
  SiteLayout, Seo, Section, SectionHead, Reveal, CtaLink, DemoStepper, CategoryCard,
  ProcessCard, Steps, HumanControl, PricingCards, Faq, RotatingWord,
} from "@/components/site";

const SITUATION_ICONS = [ClipboardList, FileSearch, BellRing];

export default function Home() {
  // Bezoekers van een sector-, campagne- of outreachlink (?category=…) zien hun eigen proces.
  const lockedCategory = parseCheckContext(useLocation().search).category;
  const lockedIndex = lockedCategory ? categories.findIndex((c) => c.id === lockedCategory) : -1;
  const locked = lockedIndex >= 0 ? categories[lockedIndex] : undefined;
  const heroNouns = categories.map((c) => c.heroNoun);
  const heroDemo = demoById(locked?.demoId ?? "offerte-intake")!;
  const exampleDemos = [demoById("aftersales")!, demoById("service-intake")!];

  return (
    <SiteLayout>
      <Seo title={home.seoTitle} description={home.seoDescription} path="/" />

      {/* 1 — Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20">
        <GridPattern width={56} height={56} className="fill-transparent stroke-lv-line/70 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_0%,#000_35%,transparent_100%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Reveal><p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-lv-muted">{home.hero.eyebrow}</p></Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[clamp(2.1rem,6.4vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                <span className="sr-only">{`${home.hero.h1Before} ${locked?.heroNoun ?? home.hero.h1Fallback} ${home.hero.h1After}`}</span>
                <span aria-hidden="true">
                  {home.hero.h1Before}{" "}
                  <RotatingWord words={heroNouns} locked={locked ? lockedIndex : undefined} wordClassName="rounded-[0.18em] bg-lv-lime px-[0.12em]" />
                  <br />
                  {home.hero.h1After}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}><p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-lv-body">{home.hero.sub}</p></Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <CtaLink to={checkHref({ source: "home-hero", category: locked?.id, process: locked?.processKey })} ctaId="home-hero-check" trackParams={{ category: locked?.id }}>{ctaLabels.primary}</CtaLink>
              <CtaLink to={demoHref(locked?.demoId, "home-hero")} ctaId="home-hero-demo" variant="secondary">{home.hero.secondary}</CtaLink>
            </Reveal>
            <Reveal delay={0.2}><p className="mt-4 text-[13.5px] text-lv-muted">{ctaLabels.micro}</p></Reveal>
          </div>
          <Reveal delay={0.1}><DemoStepper demo={heroDemo} source="home-hero" compact /></Reveal>
        </div>
      </section>

      {/* 2 — Herkenbare situaties */}
      <Section tone="raised">
        <SectionHead title={home.situations.h2} intro={home.situations.intro} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {home.situations.cards.map((c, i) => {
            const Icon = SITUATION_ICONS[i];
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-lv-line bg-lv-surface p-7">
                  <Icon aria-hidden className="h-6 w-6" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display text-[21px] font-semibold tracking-[-0.02em]">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-lv-body">{c.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 3 — Voor wie */}
      <Section>
        <SectionHead eyebrow="Voor wie" title={home.forWhom.h2} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => <Reveal key={c.id} delay={i * 0.05}><CategoryCard category={c} /></Reveal>)}
        </div>
      </Section>

      {/* 4 — Eén concreet proces */}
      <Section tone="raised">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHead title={home.oneProcess.h2} intro={home.oneProcess.body} />
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-lv-line bg-lv-surface p-6">
              <p className="font-mono text-[10.5px] uppercase tracking-wider text-lv-muted">{home.oneProcess.label}</p>
              <dl className="mt-4 divide-y divide-lv-line-soft text-[14.5px]">
                {[
                  ["Klant", "Voorbeelddealer B"],
                  ["Referentie", "Claim Demo-100"],
                  ["Ontbrekend bewijs", "Aankoopbewijs"],
                  ["Volgende actie", "Conceptvraag aan dealer, wacht op review"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-3"><dt className="text-lv-muted">{k}</dt><dd className={k === "Ontbrekend bewijs" ? "text-[#9A3412]" : ""}>{v}</dd></div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Breder dan intake */}
      <Section>
        <SectionHead title={home.broader.h2} intro={home.broader.body} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {processes.map((p, i) => <Reveal key={p.id} delay={i * 0.05}><ProcessCard process={p} compact /></Reveal>)}
        </div>
      </Section>

      {/* 6 — Werkwijze */}
      <Section tone="raised">
        <SectionHead eyebrow="Werkwijze" title={home.method.h2} />
        <div className="mt-12"><Steps steps={home.method.steps} /></div>
        <Link to="/werkwijze" className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.method.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 7 — Team in controle */}
      <Section>
        <Reveal><HumanControl title={home.control.h2} body={home.control.body} prepared={["Informatie verzamelen", "Ontbrekende gegevens markeren", "Conceptberichten klaarzetten", "Open acties bijhouden"]} decides="Productkeuzes, prijzen, garanties en technische beoordelingen." /></Reveal>
      </Section>

      {/* 8 — Pakketten */}
      <Section tone="raised" id="pakketten">
        <SectionHead eyebrow="Pakketten" title={home.packages.h2} />
        <div className="mt-12"><PricingCards source="home-packages" /></div>
        <Link to="/prijzen" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">{home.packages.link}<ArrowRight aria-hidden className="h-4 w-4" /></Link>
      </Section>

      {/* 9 — Voorbeelden */}
      <Section>
        <SectionHead eyebrow="Voorbeelden" title={home.examples.h2} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {exampleDemos.map((d) => <Reveal key={d.id}><DemoStepper demo={d} source="home-examples" compact /></Reveal>)}
        </div>
      </Section>

      {/* 10 — Over */}
      <Section tone="raised">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.035em]">{home.about.h2}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-lv-body">{home.about.body}</p>
          <CtaLink to="/over" ctaId="home-about" variant="secondary" className="mt-7">{home.about.cta}</CtaLink>
        </Reveal>
      </Section>

      {/* 11 — FAQ + slot */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Veelgestelde vragen" title="Wat je waarschijnlijk wilt weten." />
          <Reveal delay={0.06}><Faq ids={home.faqIds} /></Reveal>
        </div>
      </Section>
      <section className="px-4 pb-6 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-lv-ink px-7 py-20 text-center text-white">
          <GridPattern width={48} height={48} className="fill-transparent stroke-white/[0.07]" />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance font-display text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{home.closing.h2}</h2>
            <p className="mx-auto mt-5 max-w-lg text-[17px] text-white/70">{home.closing.body}</p>
            <CtaLink to={checkHref({ source: "home-bottom" })} ctaId="home-bottom" variant="lime" className="mt-9">{ctaLabels.primary}</CtaLink>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
