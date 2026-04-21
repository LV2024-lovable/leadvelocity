import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  FileText,
  Zap,
  Mail,
  Sparkles,
  BookOpen,
  BarChart3,
  Lock,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { useReveal } from '../hooks/useReveal';

type FunnelStage = 'start' | 'ontdek' | 'verdieping';
type ResourceType = 'Whitepaper' | 'Assessment' | 'Prompt Pack' | 'Nieuwsbrief' | 'Benchmark' | 'Tips & Tricks';

type Resource = {
  stage: FunnelStage;
  type: ResourceType;
  title: string;
  description: string;
  href: string;
  vertical?: 'Groothandel' | 'Maakindustrie' | 'Transport' | 'Alle sectoren';
  status: 'Beschikbaar' | 'Binnenkort';
  gatedType: 'Gratis · e-mail' | 'Gratis · direct' | 'Binnenkort';
  icon: React.ElementType;
};

const resources: Resource[] = [
  // ===== START HIER (laagdrempelig) =====
  {
    stage: 'start',
    type: 'Tips & Tricks',
    title: '20 AI-tips voor NL organisaties',
    description:
      'Gratis PDF met 20 concrete tips uit onze praktijk. Begin hier als je nog zoekt waar AI in jouw organisatie kan landen.',
    href: '/bronnen/tips-en-tricks',
    vertical: 'Alle sectoren',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    stage: 'start',
    type: 'Nieuwsbrief',
    title: 'Maandelijkse AI-briefing',
    description:
      'Eén doordachte lange-lees per maand. Sector-benchmarks, use-cases en observaties. Geen spam, direct opzegbaar.',
    href: '/nieuwsbrief',
    vertical: 'Alle sectoren',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Mail,
  },

  // ===== ONTDEK JULLIE POSITIE (sector-specifiek, dieper) =====
  {
    stage: 'ontdek',
    type: 'Assessment',
    title: 'AI-Readiness Assessment',
    description:
      '15 vragen, persoonlijke score (0-100%), aanbevolen vervolgstappen. Direct zicht op waar jullie staan in AI-volwassenheid.',
    href: '/bronnen/ai-readiness-assessment',
    vertical: 'Alle sectoren',
    status: 'Beschikbaar',
    gatedType: 'Gratis · direct',
    icon: Sparkles,
  },
  {
    stage: 'ontdek',
    type: 'Whitepaper',
    title: 'AI in de Nederlandse Technische Groothandel 2026',
    description:
      '25 pagina\'s: 15 use-cases, 3 scenario\'s, 12-maanden-roadmap en valkuilen voor groothandels tussen €10M en €100M.',
    href: '/whitepapers/ai-in-technische-groothandel-2026',
    vertical: 'Groothandel',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    stage: 'ontdek',
    type: 'Whitepaper',
    title: 'AI voor Nederlandse Maakindustrie 2026',
    description:
      'Predictive maintenance, shop-floor copilot, OEE-roadmap 60% → 78%. Met scenario\'s voor €15M-€80M maakbedrijven.',
    href: '/whitepapers/ai-voor-nederlandse-maakindustrie-2026',
    vertical: 'Maakindustrie',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    stage: 'ontdek',
    type: 'Whitepaper',
    title: 'AI voor Nederlandse Transport & Logistiek 2026',
    description:
      'Vrachtwagenheffing-impact, 15 AI-use-cases, CSRD scope-3 blueprint, scenario\'s voor pallet/FTL/3PL.',
    href: '/whitepapers/ai-voor-nederlandse-transport-2026',
    vertical: 'Transport',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },

  // ===== DIEPER DE MATERIE IN (mid-bottom funnel) =====
  {
    stage: 'verdieping',
    type: 'Prompt Pack',
    title: 'Prompt & Template Pack — Technische Groothandel',
    description:
      '12 AI-prompts en 8 templates voor binnendienst, sales en inkoop. Direct inzetbaar in ChatGPT, Claude of Copilot.',
    href: '/bronnen/prompts/groothandel-2026',
    vertical: 'Groothandel',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    stage: 'verdieping',
    type: 'Prompt Pack',
    title: 'Prompt & Template Pack — Maakindustrie',
    description:
      '12 prompts en 7 templates voor werkvoorbereiding, kwaliteit, engineering en shop-floor.',
    href: '/bronnen/prompts/maakindustrie-2026',
    vertical: 'Maakindustrie',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    stage: 'verdieping',
    type: 'Prompt Pack',
    title: 'Prompt & Template Pack — Transport & Logistiek',
    description:
      '10 prompts en 7 templates voor planners, customer service en fleet management.',
    href: '/bronnen/prompts/transport-2026',
    vertical: 'Transport',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    stage: 'verdieping',
    type: 'Benchmark',
    title: 'Sector Benchmark Report 2026',
    description:
      'Jaarlijks benchmark-rapport met AI-adoptie-cijfers, marge-impact en best practices per sector. Publicatie Q4 2026.',
    href: '#',
    vertical: 'Alle sectoren',
    status: 'Binnenkort',
    gatedType: 'Binnenkort',
    icon: BarChart3,
  },
];

const stageConfig: Record<
  FunnelStage,
  { label: string; title: string; description: string }
> = {
  start: {
    label: 'Start hier',
    title: 'Nog aan het oriënteren?',
    description:
      'Laagdrempelige bronnen die je een goed eerste beeld geven. Geen commitment, wel direct bruikbare kennis.',
  },
  ontdek: {
    label: 'Ontdek jullie positie',
    title: 'Klaar voor concrete analyse?',
    description:
      'Vergelijk jezelf met sector-benchmarks en ontdek welke AI-toepassingen specifiek voor jouw sector werken.',
  },
  verdieping: {
    label: 'Dieper de materie in',
    title: 'Serieus aan het verkennen?',
    description:
      'Voor wie concreet wil gaan bouwen. Specifieke prompts, templates en implementatie-kaders per sector.',
  },
};

const stageOrder: FunnelStage[] = ['start', 'ontdek', 'verdieping'];

const Bronnen = () => {
  const heroRef = useReveal();

  useEffect(() => {
    document.title = 'Bronnen — Gratis AI-assets voor Nederlandse organisaties | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Gratis AI-bronnen voor Nederlandse organisaties: Tips & Tricks PDF, AI-Readiness Assessment, whitepapers per sector, prompt packs en maandelijkse nieuwsbrief.',
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <BookOpen className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  Bronnen · gratis assets
                </span>
              </div>
              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                Leer voordat je{' '}
                <span className="text-gradient-accent">belt</span>.
              </h1>
              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed">
                Drie lagen aan bronnen, geordend van "eerste oriëntatie" tot "serieuze implementatie". Kies waar je staat, download wat je nodig hebt.
              </p>
            </div>
          </div>
        </section>

        {/* STAGES */}
        {stageOrder.map((stage, stageIdx) => {
          const stageResources = resources.filter((r) => r.stage === stage);
          const stageRef = useReveal(stageIdx * 0.05);
          const cfg = stageConfig[stage];
          const isEven = stageIdx % 2 === 0;

          return (
            <section
              key={stage}
              ref={stageRef}
              className={`reveal py-14 md:py-18 relative ${
                isEven ? 'bg-lv-surface border-y border-lv-border-subtle' : ''
              }`}
            >
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-10 md:mb-12 max-w-3xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-px w-10 bg-lv-accent" />
                      <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                        Fase {stageIdx + 1} · {cfg.label}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-4 leading-[1.1]">
                      {cfg.title}
                    </h2>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                      {cfg.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stageResources.map((r) => {
                      const Icon = r.icon;
                      const available = r.status === 'Beschikbaar';
                      const Wrapper = available ? 'a' : 'div';
                      return (
                        <Wrapper
                          key={r.title}
                          {...(available ? { href: r.href } : {})}
                          className={`p-6 md:p-7 rounded-2xl border transition-colors flex flex-col ${
                            available
                              ? `group cursor-pointer ${
                                  isEven
                                    ? 'bg-lv-ink border-lv-border-subtle hover:border-lv-accent/30'
                                    : 'bg-lv-surface border-lv-border-subtle hover:border-lv-accent/30'
                                }`
                              : 'bg-lv-surface border-lv-border-subtle opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-5">
                            <div
                              className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                                available
                                  ? 'bg-lv-accent/10 border border-lv-accent/20'
                                  : 'bg-lv-surface-raised border border-lv-border'
                              }`}
                            >
                              {available ? (
                                <Icon className="w-5 h-5 text-lv-accent" />
                              ) : (
                                <Lock className="w-5 h-5 text-lv-text-muted" />
                              )}
                            </div>
                            <span className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                              {r.type}
                            </span>
                          </div>

                          <h3
                            className={`font-display text-lg md:text-xl font-700 text-lv-text leading-tight mb-3 ${
                              available ? 'group-hover:text-lv-accent transition-colors' : ''
                            }`}
                          >
                            {r.title}
                          </h3>

                          <p className="font-body text-sm text-lv-text-muted leading-relaxed mb-5 flex-1">
                            {r.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-lv-border-subtle">
                            <div className="flex flex-col gap-1">
                              {r.vertical && (
                                <span className="font-body text-xs text-lv-text-subtle">
                                  {r.vertical}
                                </span>
                              )}
                              <span className="font-body text-xs font-600 text-lv-accent">
                                {r.gatedType}
                              </span>
                            </div>
                            {available && (
                              <ArrowUpRight className="w-4 h-4 text-lv-text-subtle group-hover:text-lv-accent transition-colors flex-shrink-0" />
                            )}
                          </div>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-5 leading-[1.1]">
                Alles doorgenomen?
              </h2>
              <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-8">
                We nemen geen half uur om over ons te praten — wel om te luisteren en concreet mee te denken over waar AI voor jullie het meeste oplevert.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group"
              >
                Plan een 30-min gesprek
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default Bronnen;
