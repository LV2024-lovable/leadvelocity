import React from 'react';
import { TrendingUp, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

// Sourced industry benchmarks — every claim is defensible with primary source.
const benchmarks = [
  {
    icon: DollarSign,
    value: '1-2%',
    unit: '',
    label: 'Extra brutomarge via AI-pricing in B2B-distributie',
    source: 'McKinsey — B2B Pricing AI Revolution, 2025',
  },
  {
    icon: TrendingUp,
    value: '5-15%',
    unit: '',
    label: 'Inkoopbesparing met AI-supply-chain-optimalisatie',
    source: 'McKinsey — AI in Distribution Operations, 2024',
  },
  {
    icon: Clock,
    value: '60%',
    unit: '',
    label: 'Snellere documentverwerking via GenAI in logistiek',
    source: 'McKinsey — Beyond Automation, 2024',
  },
  {
    icon: AlertTriangle,
    value: '50%',
    unit: '',
    label: 'Van GenAI-projecten wordt na PoC gestaakt — door verkeerde scope',
    source: 'Gartner — GenAI Project Failure, 2024',
  },
];

const painPoints = [
  {
    fact: 'Slechts 7%',
    context: 'van Nederlandse handels- en logistiekbedrijven heeft een concreet AI-beleid',
    source: 'Evofenedex, 2025',
  },
  {
    fact: '6.800',
    context: 'openstaande chauffeursvacatures in NL — structureel, niet tijdelijk',
    source: 'STL Sectormonitor Q3 2025',
  },
  {
    fact: '68%',
    context: 'van NL technische bedrijven ervaart personeelstekort',
    source: 'TechBarometer, 2025',
  },
  {
    fact: '€1.817M',
    context: 'WBSO-budget 2026 — AI-projecten 36% aftrek op R&D-kosten',
    source: 'RVO, 2026',
  },
];

const ResultsNew = () => {
  const headerRef = useReveal();
  const painRef = useReveal(0.15);

  return (
    <section id="resultaten" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-lime" />
            <span className="font-body text-sm font-600 text-lv-lime-ink uppercase tracking-widest">
              De cijfers
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-ink mb-6 leading-[1.1]">
            Geen loze beloftes.{' '}
            <span className="text-lv-body">Alleen wat onafhankelijke onderzoekers meten.</span>
          </h2>
          <p className="font-body text-lg text-lv-body leading-relaxed max-w-3xl">
            Wij verzinnen geen klantcijfers. Dit zijn de benchmarks van McKinsey, Gartner, Evofenedex en RVO die bepalen waar Leadvelocity op stuurt — en waar jij op mag rekenen.
          </p>
        </div>

        {/* Benchmarks grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-24">
          {benchmarks.map((b, i) => {
            const cardRef = useReveal(i * 0.08);
            const Icon = b.icon;
            return (
              <div
                key={b.label}
                ref={cardRef}
                className="reveal p-8 md:p-10 rounded-2xl bg-lv-surface border border-lv-line-soft hover:border-lv-lime-ink/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-lv-lime-soft border border-lv-lime-ink/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-lv-lime-ink" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display text-4xl md:text-5xl font-700 text-lv-lime-ink mb-3 leading-none">
                      {b.value}
                      {b.unit && <span className="text-2xl md:text-3xl ml-1">{b.unit}</span>}
                    </div>
                    <div className="font-body text-base md:text-lg text-lv-ink leading-snug mb-3">
                      {b.label}
                    </div>
                    <div className="font-body text-xs text-lv-faint italic">
                      {b.source}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* NL-specific facts */}
        <div ref={painRef} className="reveal">
          <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-ink mb-8 max-w-2xl">
            De Nederlandse cijfers die het momentum bepalen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((p) => (
              <div
                key={p.fact}
                className="border-l-2 border-lv-lime-ink/40 pl-5"
              >
                <div className="font-display text-3xl md:text-4xl font-700 text-lv-ink mb-2 leading-none">
                  {p.fact}
                </div>
                <div className="font-body text-sm text-lv-body leading-snug mb-2">
                  {p.context}
                </div>
                <div className="font-body text-xs text-lv-faint italic">
                  {p.source}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResultsNew;
