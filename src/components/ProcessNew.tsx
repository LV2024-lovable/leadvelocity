import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    number: '01',
    title: 'Oriëntatiegesprek',
    duration: '30 min · gratis',
    text: 'Geen pitch. Vragen over de operatie, processen en waar tijd en geld weglekt.',
  },
  {
    number: '02',
    title: 'Operations Audit',
    duration: '2–3 weken',
    text: 'Diepte-scan van commerciële en operationele processen. Concrete prioriteitenlijst met top-3 kansen.',
  },
  {
    number: '03',
    title: 'Bouwen',
    duration: '4–8 weken',
    text: 'Eén systeem end-to-end. Vaste scope, vaste prijs, meetbaar resultaat binnen één kwartaal.',
  },
  {
    number: '04',
    title: 'Draaien & verbeteren',
    duration: 'doorlopend',
    text: 'Wat we bouwen, blijven we beheren. Maandelijkse rapportage en continue optimalisatie.',
  },
];

const ProcessNew = () => {
  const headerRef = useReveal();
  const ctaRef = useReveal(0.15);

  return (
    <section id="aanpak" className="section-padding relative bg-lv-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-lv-accent">
              Aanpak · Vier stappen, geen verrassingen
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.1] mb-6">
            Stap voor stap naar{' '}
            <span className="text-gradient-accent">werkende AI</span>.{' '}
            <span className="text-lv-text-muted">Geen moonshots.</span>
          </h2>
          <p className="font-body text-lg text-lv-text-muted leading-relaxed max-w-3xl">
            Vaste prijzen tot en met de pilot. Pas daarna een retainer, en alleen als het werkt.
          </p>
        </div>

        {/* Steps grid (compact summary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const stepRef = useReveal(i * 0.08);
            return (
              <div
                key={s.number}
                ref={stepRef}
                className="reveal p-7 md:p-8 rounded-2xl border border-lv-border-subtle bg-lv-ink"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-lv-accent mb-4">
                  Stap {s.number}
                </div>
                <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-2 leading-tight">
                  {s.title}
                </h3>
                <div className="font-mono text-xs text-lv-text-subtle mb-4 uppercase tracking-wide">
                  {s.duration}
                </div>
                <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Link to full aanpak page */}
        <div ref={ctaRef} className="reveal mt-12 md:mt-16 text-center">
          <a
            href="/onze-aanpak"
            className="inline-flex items-center gap-2 font-display text-base font-600 text-lv-text hover:text-lv-accent transition-colors duration-200 group"
          >
            Lees de volledige aanpak
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProcessNew;
