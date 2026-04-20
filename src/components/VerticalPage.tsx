import React from 'react';
import { ArrowUpRight, Check, LucideIcon } from 'lucide-react';
import NavbarNew from './NavbarNew';
import FooterNew from './FooterNew';
import { useReveal } from '../hooks/useReveal';

export type VerticalUseCase = {
  title: string;
  description: string;
  roi: string;
  timeToValue: string;
};

export type VerticalStat = {
  value: string;
  label: string;
  source: string;
};

export type VerticalPainPoint = {
  title: string;
  description: string;
};

export type VerticalConfig = {
  slug: string;
  eyebrow: string;
  heroTitle: string[];
  heroGradientPart?: string;
  heroSubtitle: string;
  primaryCtaLabel?: string;
  heroStats: VerticalStat[];
  painHeadline: string;
  painIntro: string;
  painPoints: VerticalPainPoint[];
  useCaseHeadline: string;
  useCaseIntro: string;
  useCases: VerticalUseCase[];
  scenario: {
    headline: string;
    company: string;
    before: string;
    after: string;
    impact: string;
    disclaimer: string;
  };
  facts: VerticalStat[];
  closingHeadline: string;
  closingSub: string;
  icon?: LucideIcon;
};

type Props = {
  config: VerticalConfig;
};

const VerticalPage: React.FC<Props> = ({ config }) => {
  const heroRef = useReveal();
  const painHeaderRef = useReveal();
  const useCaseHeaderRef = useReveal();
  const scenarioRef = useReveal();
  const factsRef = useReveal();
  const closingRef = useReveal();

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden grain">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-20 md:pt-40 md:pb-28 relative z-10">
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <span className="font-body text-sm font-500 text-lv-accent">
                  {config.eyebrow}
                </span>
              </div>

              <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-display font-700 leading-[1.05] tracking-tight mb-8 text-lv-text">
                {config.heroTitle.map((line, i) => (
                  <React.Fragment key={i}>
                    <span
                      className={
                        config.heroGradientPart === line
                          ? 'text-gradient-accent'
                          : i === config.heroTitle.length - 1 && !config.heroGradientPart
                            ? 'text-gradient-accent'
                            : ''
                      }
                    >
                      {line}
                    </span>
                    {i < config.heroTitle.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-lg md:text-xl text-lv-text-muted max-w-2xl leading-relaxed mb-12 font-body">
                {config.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  {config.primaryCtaLabel || 'Boek een gratis AI-Scan'}
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#use-cases"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk use-cases
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
                {config.heroStats.map((s) => (
                  <div key={s.label} className="border-l-2 border-lv-accent/40 pl-4">
                    <div className="font-display text-2xl sm:text-3xl md:text-4xl font-700 text-lv-accent mb-2 leading-none">
                      {s.value}
                    </div>
                    <div className="font-body text-sm text-lv-text leading-snug mb-1">
                      {s.label}
                    </div>
                    <div className="font-body text-xs text-lv-text-subtle italic">
                      {s.source}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAIN POINTS */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div ref={painHeaderRef} className="reveal mb-14 md:mb-16 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  De pijn die we kennen
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.painHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
                {config.painIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {config.painPoints.map((p, i) => {
                const cardRef = useReveal(i * 0.06);
                return (
                  <div
                    key={p.title}
                    ref={cardRef}
                    className="reveal p-6 md:p-8 rounded-xl bg-lv-ink border border-lv-border-subtle hover:border-lv-border transition-colors"
                  >
                    <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3">
                      {p.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section id="use-cases" className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={useCaseHeaderRef} className="reveal mb-14 md:mb-16 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Wat AI concreet oplost
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.useCaseHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
                {config.useCaseIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {config.useCases.map((uc, i) => {
                const cardRef = useReveal(i * 0.05);
                return (
                  <div
                    key={uc.title}
                    ref={cardRef}
                    className="reveal p-6 md:p-8 rounded-xl bg-lv-surface border border-lv-border-subtle hover:border-lv-accent/20 transition-colors flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                      <Check className="w-5 h-5 text-lv-accent" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3">
                      {uc.title}
                    </h3>
                    <p className="font-body text-sm text-lv-text-muted leading-relaxed mb-5 flex-1">
                      {uc.description}
                    </p>
                    <div className="pt-5 border-t border-lv-border-subtle flex items-center justify-between">
                      <div>
                        <div className="font-display text-xs text-lv-text-subtle uppercase tracking-wider mb-1">
                          ROI-range
                        </div>
                        <div className="font-display text-sm font-700 text-lv-accent">
                          {uc.roi}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-xs text-lv-text-subtle uppercase tracking-wider mb-1">
                          Time-to-value
                        </div>
                        <div className="font-display text-sm font-700 text-lv-text">
                          {uc.timeToValue}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SCENARIO CASE */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div ref={scenarioRef} className="reveal max-w-5xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Scenario-case (voorbeeld)
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-10 leading-[1.1]">
                {config.scenario.headline}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 md:p-8 rounded-xl bg-lv-ink border border-lv-border-subtle">
                  <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-3">
                    Uitgangspunt
                  </div>
                  <p className="font-body text-sm md:text-base text-lv-text leading-relaxed">
                    {config.scenario.company}
                  </p>
                </div>
                <div className="p-6 md:p-8 rounded-xl bg-lv-ink border border-lv-border-subtle">
                  <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-3">
                    Situatie vooraf
                  </div>
                  <p className="font-body text-sm md:text-base text-lv-text leading-relaxed">
                    {config.scenario.before}
                  </p>
                </div>
                <div className="p-6 md:p-8 rounded-xl bg-lv-accent/[0.05] border border-lv-accent/20">
                  <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-wider mb-3">
                    Na 90 dagen
                  </div>
                  <p className="font-body text-sm md:text-base text-lv-text leading-relaxed">
                    {config.scenario.after}
                  </p>
                </div>
              </div>

              <div className="p-8 md:p-10 rounded-2xl bg-lv-accent/[0.05] border border-lv-accent/20">
                <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-wider mb-3">
                  Jaarlijkse impact
                </div>
                <p className="font-display text-2xl md:text-3xl font-700 text-lv-text leading-tight mb-4">
                  {config.scenario.impact}
                </p>
                <p className="font-body text-xs text-lv-text-subtle italic">
                  {config.scenario.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRY FACTS */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={factsRef} className="reveal mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  De cijfers
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                De sector-cijfers die het momentum bepalen.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.facts.map((f) => (
                <div key={f.label} className="border-l-2 border-lv-accent/40 pl-5">
                  <div className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-2 leading-none">
                    {f.value}
                  </div>
                  <div className="font-body text-sm text-lv-text-muted leading-snug mb-2">
                    {f.label}
                  </div>
                  <div className="font-body text-xs text-lv-text-subtle italic">
                    {f.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div ref={closingRef} className="reveal max-w-3xl text-center mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.closingHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed mb-10">
                {config.closingSub}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
                >
                  Boek een gratis AI-Scan
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk alle sectoren
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default VerticalPage;
