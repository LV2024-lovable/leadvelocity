import React, { useEffect } from 'react';
import {
  ArrowUpRight,
  FileText,
  Zap,
  Mail,
  Sparkles,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { useReveal } from '../hooks/useReveal';

type ResourceType = 'Whitepaper' | 'Assessment' | 'Prompt Pack' | 'Nieuwsbrief' | 'Benchmark';

type Resource = {
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
  {
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
    type: 'Whitepaper',
    title: 'AI in de Nederlandse Technische Groothandel 2026',
    description:
      '25 pagina\'s diepgaande analyse: 15 use-cases, 3 scenario\'s, 12-maanden-roadmap en implementatie-valkuilen.',
    href: '/whitepapers/ai-in-technische-groothandel-2026',
    vertical: 'Groothandel',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    type: 'Whitepaper',
    title: 'AI voor Nederlandse Maakindustrie 2026',
    description:
      '25 pagina\'s: predictive maintenance, shop-floor copilot, OEE-roadmap 60% → 78%. Met scenario\'s voor €15M-€80M maakbedrijven.',
    href: '/whitepapers/ai-voor-nederlandse-maakindustrie-2026',
    vertical: 'Maakindustrie',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    type: 'Whitepaper',
    title: 'AI voor Nederlandse Transport & Logistiek 2026',
    description:
      '25 pagina\'s: vrachtwagenheffing-impact, 15 AI-use-cases, CSRD scope-3 blueprint, scenario\'s voor pallet/FTL/3PL.',
    href: '/whitepapers/ai-voor-nederlandse-transport-2026',
    vertical: 'Transport',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: FileText,
  },
  {
    type: 'Prompt Pack',
    title: 'AI Prompt & Template Pack — Technische Groothandel',
    description:
      '24 getoetste AI-prompts en 8 templates voor binnendienst, sales en inkoop. Direct inzetbaar in ChatGPT, Claude of Copilot.',
    href: '/bronnen/prompts/groothandel-2026',
    vertical: 'Groothandel',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    type: 'Prompt Pack',
    title: 'AI Prompt & Template Pack — Maakindustrie',
    description:
      '22 prompts en 7 templates voor werkvoorbereiding, kwaliteit, engineering en shop-floor. Direct toepasbaar.',
    href: '/bronnen/prompts/maakindustrie-2026',
    vertical: 'Maakindustrie',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    type: 'Prompt Pack',
    title: 'AI Prompt & Template Pack — Transport & Logistiek',
    description:
      '20 prompts en 7 templates voor planners, customer service en fleet management.',
    href: '/bronnen/prompts/transport-2026',
    vertical: 'Transport',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Zap,
  },
  {
    type: 'Nieuwsbrief',
    title: 'Maandelijkse AI-briefing voor NL MKB',
    description:
      'Eén keer per maand een doordachte lange-lees: wat er echt werkt in AI voor Nederlandse industrie. Geen hype, geen verkoop.',
    href: '/nieuwsbrief',
    vertical: 'Alle sectoren',
    status: 'Beschikbaar',
    gatedType: 'Gratis · e-mail',
    icon: Mail,
  },
  {
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

const typeColors: Record<ResourceType, string> = {
  Assessment: 'text-lv-accent',
  Whitepaper: 'text-lv-accent',
  'Prompt Pack': 'text-lv-accent',
  Nieuwsbrief: 'text-lv-accent',
  Benchmark: 'text-lv-accent',
};

const Bronnen = () => {
  const heroRef = useReveal();

  useEffect(() => {
    document.title = 'Bronnen — Whitepapers, Assessment & Prompt Packs | Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Gratis AI-bronnen voor Nederlandse organisaties: whitepapers per sector, AI-Readiness Assessment, prompt packs en maandelijkse nieuwsbrief.',
      );
    }
  }, []);

  const available = resources.filter((r) => r.status === 'Beschikbaar');
  const upcoming = resources.filter((r) => r.status === 'Binnenkort');

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
                  Bronnen & gratis assets
                </span>
              </div>
              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                Leer voordat je{' '}
                <span className="text-gradient-accent">belt</span>.
              </h1>
              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed">
                Whitepapers, een AI-Readiness Assessment, sector-specifieke prompt packs en meer. Alles gratis, alles inzetbaar zonder dat je met ons hoeft te praten. Want goede inhoud overtuigt beter dan een verkoopgesprek.
              </p>
            </div>
          </div>
        </section>

        {/* RESOURCES GRID */}
        <section className="py-14 md:py-16 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-px w-10 bg-lv-accent" />
                <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                  Direct beschikbaar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {available.map((r, i) => {
                  const cardRef = useReveal(i * 0.04);
                  const Icon = r.icon;
                  return (
                    <a
                      key={r.title}
                      ref={cardRef}
                      href={r.href}
                      className="reveal group p-6 md:p-7 rounded-2xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/30 transition-colors flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-lv-accent" />
                        </div>
                        <span className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                          {r.type}
                        </span>
                      </div>

                      <h3 className="font-display text-lg md:text-xl font-700 text-lv-text leading-tight mb-3 group-hover:text-lv-accent transition-colors">
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
                          <span className={`font-body text-xs font-600 ${typeColors[r.type]}`}>
                            {r.gatedType}
                          </span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-lv-text-subtle group-hover:text-lv-accent transition-colors flex-shrink-0" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* UPCOMING */}
        {upcoming.length > 0 && (
          <section className="py-14 md:py-16 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Binnenkort
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcoming.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div
                        key={r.title}
                        className="p-6 md:p-7 rounded-2xl bg-lv-surface border border-lv-border-subtle opacity-70"
                      >
                        <div className="flex items-center justify-between mb-5">
                          <div className="w-11 h-11 rounded-lg bg-lv-surface-raised border border-lv-border flex items-center justify-center">
                            <Icon className="w-5 h-5 text-lv-text-muted" />
                          </div>
                          <span className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-widest">
                            {r.type}
                          </span>
                        </div>
                        <h3 className="font-display text-lg md:text-xl font-700 text-lv-text leading-tight mb-3">
                          {r.title}
                        </h3>
                        <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                          {r.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-20 relative bg-lv-surface border-t border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-5 leading-[1.1]">
                Alles doorgenomen en klaar om in gesprek te gaan?
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
