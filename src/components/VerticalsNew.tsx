import React from 'react';
import { Package, Factory, Truck, ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const verticals = [
  {
    icon: Package,
    label: 'Sector-expertise',
    title: 'Technische groothandel',
    pain:
      'Margedruk van D2C, Amazon Business en Chinese B2B-platforms. Handmatige inkoop, Excel-pricing en long-tail voorraad vreten aan je marge.',
    outcome:
      'AI-inkoopvoorspelling, dynamic pricing en pipeline-scoring die inkoopbesparingen en structureel hogere brutomarge opleveren.',
    stat: '5-15%',
    statLabel: 'typische inkoopbesparing bij AI-distributie',
    href: '/groothandel',
    accent: true,
  },
  {
    icon: Factory,
    label: 'Sector-expertise',
    title: 'Maakindustrie',
    pain:
      'Personeelstekort, ongeplande stilstand, handmatige kwaliteitscontrole en gefragmenteerde MES/ERP-data.',
    outcome:
      'Predictive maintenance, AI-planning en computer vision voor kwaliteit — met aantoonbaar lagere onderhoudskosten en minder downtime.',
    stat: '-50%',
    statLabel: 'minder downtime via predictive maintenance',
    href: '/maakindustrie',
    accent: false,
  },
  {
    icon: Truck,
    label: 'Sector-expertise',
    title: 'Transport & logistiek',
    pain:
      'Dunne marges onder druk van de vrachtwagenheffing, chauffeurstekort, ZE-zones en CSRD-ketendruk. Elke cent per km telt.',
    outcome:
      'Route-optimalisatie, ETA-predictie, tachograaf-analyse en fuel-coaching — lagere transportkosten en snellere documentverwerking.',
    stat: '5-10%',
    statLabel: 'lagere transportkosten via route-AI',
    href: '/transport',
    accent: false,
  },
];

const VerticalsNew = () => {
  const headerRef = useReveal();

  return (
    <section id="verticals" className="section-padding relative bg-lv-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
              Voor wie wij bouwen
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-6 leading-[1.1]">
            AI werkt overal in het MKB.{' '}
            <span className="text-lv-text-muted">In deze drie sectoren kennen wij het speelveld het best.</span>
          </h2>
          <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
            Wij werken met MKB-bedrijven in heel Nederland. Onze diepste sector-expertise zit in groothandel, maakindustrie en transport — daar hebben we de playbooks, de benchmarks en het netwerk om sneller impact te leveren.
          </p>
        </div>

        {/* Vertical cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {verticals.map((vertical, i) => {
            const cardRef = useReveal(i * 0.1);
            const Icon = vertical.icon;
            return (
              <a
                key={vertical.title}
                ref={cardRef}
                href={vertical.href}
                className={`reveal group relative rounded-2xl p-8 md:p-10 border transition-all duration-500 hover-lift flex flex-col ${
                  vertical.accent
                    ? 'bg-lv-accent/[0.04] border-lv-accent/20 hover:border-lv-accent/40'
                    : 'bg-lv-ink border-lv-border-subtle hover:border-lv-border'
                }`}
              >
                {/* Top label */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`font-body text-xs font-600 uppercase tracking-widest ${
                      vertical.accent ? 'text-lv-accent' : 'text-lv-text-subtle'
                    }`}
                  >
                    {vertical.label}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    vertical.accent
                      ? 'bg-lv-accent/10 border border-lv-accent/20'
                      : 'bg-lv-surface-raised border border-lv-border'
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${vertical.accent ? 'text-lv-accent' : 'text-lv-text-muted'}`}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-5">
                  {vertical.title}
                </h3>

                {/* Pain point */}
                <div className="mb-5">
                  <div className="font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
                    De pijn
                  </div>
                  <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                    {vertical.pain}
                  </p>
                </div>

                {/* Outcome */}
                <div className="mb-6">
                  <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-wider mb-2">
                    Wat AI oplost
                  </div>
                  <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                    {vertical.outcome}
                  </p>
                </div>

                {/* Stat */}
                <div className="mt-auto pt-6 border-t border-lv-border-subtle">
                  <div
                    className={`font-display text-3xl font-700 mb-1 ${
                      vertical.accent ? 'text-lv-accent' : 'text-lv-text'
                    }`}
                  >
                    {vertical.stat}
                  </div>
                  <div className="font-body text-xs text-lv-text-subtle mb-5">
                    {vertical.statLabel}
                  </div>

                  <div
                    className={`inline-flex items-center gap-2 font-display text-sm font-600 ${
                      vertical.accent
                        ? 'text-lv-accent'
                        : 'text-lv-text group-hover:text-lv-accent'
                    } transition-colors`}
                  >
                    Bekijk sector-aanpak
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VerticalsNew;
