import React from 'react';
import { ArrowUpRight, Rocket, LayoutDashboard, Bot, LucideIcon } from 'lucide-react';
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

export type ProductApplication = {
  productKey: 'sales' | 'dashboard' | 'assistant';
  intro: string;
  applications: Array<{
    title: string;
    description: string;
  }>;
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
  productsHeadline: string;
  productsIntro: string;
  productApplications: ProductApplication[];
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

const PRODUCT_META: Record<ProductApplication['productKey'], { name: string; icon: LucideIcon; tagline: string }> = {
  sales: { name: 'AI Sales Systeem', icon: Rocket, tagline: 'Meer leads · hogere conversie' },
  dashboard: { name: 'AI Operations Dashboard', icon: LayoutDashboard, tagline: 'Eén live waarheid' },
  assistant: { name: 'AI Assistent', icon: Bot, tagline: 'Chatbot, voice of intern' },
};

type Props = {
  config: VerticalConfig;
};

const VerticalPage: React.FC<Props> = ({ config }) => {
  const heroRef = useReveal();
  const painHeaderRef = useReveal();
  const productsHeaderRef = useReveal();
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
                  href="#producten"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-lv-border text-lv-text font-display font-600 text-base rounded-lg hover:border-lv-text-subtle transition-all duration-300"
                >
                  Bekijk toepassingen
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

        {/* PRODUCT APPLICATIONS FOR THIS SECTOR */}
        <section id="producten" className="section-padding relative">
          <div className="container mx-auto px-4 md:px-6">
            <div ref={productsHeaderRef} className="reveal mb-14 md:mb-16 max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Onze producten, hier toegepast
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-700 text-lv-text mb-6 leading-[1.1]">
                {config.productsHeadline}
              </h2>
              <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
                {config.productsIntro}
              </p>
            </div>

            <div className="space-y-14">
              {config.productApplications.map((product, idx) => {
                const meta = PRODUCT_META[product.productKey];
                const ProductIcon = meta.icon;
                const blockRef = useReveal(idx * 0.1);
                return (
                  <div key={product.productKey} ref={blockRef} className="reveal">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10">
                      {/* Left: product heading */}
                      <div className="md:w-1/3 md:sticky md:top-24 self-start">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                            <ProductIcon className="w-6 h-6 text-lv-accent" />
                          </div>
                          <div>
                            <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider">
                              {meta.tagline}
                            </div>
                          </div>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4">
                          {meta.name}
                        </h3>
                        <p className="font-body text-base text-lv-text-muted leading-relaxed">
                          {product.intro}
                        </p>
                      </div>

                      {/* Right: applications */}
                      <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.applications.map((app) => (
                          <div
                            key={app.title}
                            className="p-6 rounded-xl bg-lv-surface border border-lv-border-subtle hover:border-lv-accent/20 transition-colors"
                          >
                            <h4 className="font-display text-base md:text-lg font-700 text-lv-text mb-3 leading-tight">
                              {app.title}
                            </h4>
                            <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                              {app.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Link to full product overview */}
            <div className="mt-16 text-center">
              <a
                href="/#diensten"
                className="inline-flex items-center gap-2 font-display text-sm font-600 text-lv-accent hover:underline"
              >
                Bekijk onze volledige dienstencatalogus
                <ArrowUpRight className="w-4 h-4" />
              </a>
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
