import React from 'react';
import { ArrowUpRight, Zap, Sparkles, Lock, LucideIcon } from 'lucide-react';
import NavbarNew from './NavbarNew';
import FooterNew from './FooterNew';
import { useReveal } from '../hooks/useReveal';

export type VerticalStat = {
  value: string;
  label: string;
  source?: string;
};

export type VerticalPainPoint = {
  title: string;
  description: string;
};

export type QuickWin = {
  title: string;
  description: string;
  duration: string; // e.g. "2 weken"
};

export type SectorSolution = {
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
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
  quickWinsHeadline: string;
  quickWinsIntro: string;
  quickWins: QuickWin[];
  sectorSolutionsHeadline: string;
  sectorSolutionsIntro: string;
  sectorSolutions: SectorSolution[];
  tier3Hint?: string;
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
  const quickWinsHeaderRef = useReveal();
  const solutionsHeaderRef = useReveal();
  const tier3Ref = useReveal();
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
                  {config.primaryCtaLabel || 'Plan een gesprek'}
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#quick-wins"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk oplossingen
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
                {config.heroStats.map((s) => (
                  <div key={s.label} className="border-l-2 border-lv-accent/40 pl-4">
                    <div className="font-display text-2xl sm:text-3xl md:text-4xl font-700 text-lv-accent mb-2 leading-none">
                      {s.value}
                    </div>
                    <div className="font-body text-sm text-lv-text leading-snug">
                      {s.label}
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

        {/* QUICK WINS — Tier 1 for this sector */}
        <section id="quick-wins" className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={quickWinsHeaderRef} className="reveal mb-12 md:mb-14 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Laagdrempelig starten
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.quickWinsHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
                {config.quickWinsIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.quickWins.map((qw, i) => {
                const cardRef = useReveal(i * 0.05);
                return (
                  <div
                    key={qw.title}
                    ref={cardRef}
                    className="reveal p-6 rounded-xl bg-lv-surface border border-lv-border-subtle hover:border-lv-accent/30 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-4">
                      <Zap className="w-4 h-4 text-lv-accent" />
                    </div>
                    <h3 className="font-display text-base md:text-lg font-700 text-lv-text mb-2 leading-tight">
                      {qw.title}
                    </h3>
                    <p className="font-body text-sm text-lv-text-muted leading-relaxed mb-4">
                      {qw.description}
                    </p>
                    <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-wider">
                      Live in {qw.duration}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTOR SOLUTIONS — Tier 2 specific to this vertical */}
        <section id="sector-solutions" className="section-padding relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={solutionsHeaderRef} className="reveal mb-12 md:mb-14 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Sector-specifieke oplossingen
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.sectorSolutionsHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
                {config.sectorSolutionsIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {config.sectorSolutions.map((sol, i) => {
                const cardRef = useReveal(i * 0.08);
                return (
                  <div
                    key={sol.title}
                    ref={cardRef}
                    className="reveal p-7 md:p-8 rounded-2xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/30 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                      <Sparkles className="w-5 h-5 text-lv-accent" />
                    </div>
                    <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                      {sol.tagline}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-4 leading-tight">
                      {sol.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed mb-5">
                      {sol.description}
                    </p>
                    <ul className="space-y-2">
                      {sol.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-lv-accent flex-shrink-0 mt-2" />
                          <span className="font-body text-sm text-lv-text-muted leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TIER 3 HINT — vague reference to heavier projects */}
        {config.tier3Hint && (
          <section ref={tier3Ref} className="reveal py-16 md:py-20 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <div className="p-8 md:p-10 rounded-2xl border border-lv-border-subtle bg-lv-surface flex items-start gap-5">
                  <div className="w-11 h-11 rounded-lg bg-lv-surface-raised border border-lv-border flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-lv-text-muted" />
                  </div>
                  <div>
                    <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest mb-2">
                      Voor wie verder gaat
                    </div>
                    <p className="font-body text-base md:text-lg text-lv-text leading-relaxed">
                      {config.tier3Hint}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SCENARIO CASE */}
        <section className="section-padding relative bg-lv-surface">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />
          <div className="container mx-auto px-4 md:px-6">
            <div ref={scenarioRef} className="reveal max-w-5xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Scenario (voorbeeld)
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
                    Na implementatie
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

        {/* SECTOR FACTS */}
        <section className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={factsRef} className="reveal mb-14 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  De sector-cijfers
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text leading-[1.1]">
                Wat het momentum bepaalt.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.facts.map((f) => (
                <div key={f.label} className="border-l-2 border-lv-accent/40 pl-5">
                  <div className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-2 leading-none">
                    {f.value}
                  </div>
                  <div className="font-body text-sm text-lv-text-muted leading-snug">
                    {f.label}
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
                  Plan een gesprek
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
