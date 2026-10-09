import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const diensten = [
  {
    number: '01',
    title: 'Commerciële Infrastructuur',
    description:
      'Een systeem dat elke maand nieuwe klantgesprekken genereert — zonder afhankelijk te zijn van het netwerk. AI-gedreven targeting, outreach en opvolging.',
    price: 'Vanaf €5.000 + retainer',
  },
  {
    number: '02',
    title: 'Procesautomatisering',
    description:
      'Rapportages, administratie en interne workflows die zichzelf uitvoeren. Mensen doen werk dat waarde toevoegt — niet werk dat een systeem kan doen.',
    price: 'Vanaf €4.000 + retainer',
  },
  {
    number: '03',
    title: 'Inkoop & Supply Chain',
    description:
      'Automatische bestellingen, leveranciersbeheer en voorraadbewaking. Geen stockouts meer. Geen handmatige orders meer.',
    price: 'Vanaf €6.000 + retainer',
  },
  {
    number: '04',
    title: 'HR & Onboarding',
    description:
      'Van contractgeneratie tot onboarding-flow — nieuwe medewerkers zijn sneller productief en HR verliest geen tijd meer aan papierwerk.',
    price: 'Vanaf €3.500 + retainer',
  },
  {
    number: '05',
    title: 'Klantenservice & After-Sales',
    description:
      'Geautomatiseerde opvolging, klachtenrouting en churn-signalering. Klanten die zich gezien voelen blijven langer.',
    price: 'Vanaf €4.000 + retainer',
  },
];

const ServicesNew = () => {
  const headerRef = useReveal();
  const closerRef = useReveal(0.15);

  return (
    <section id="diensten" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-lime" />
            <span className="font-mono text-xs uppercase tracking-widest text-lv-lime-ink">
              Diensten · Vijf businessvraagstukken
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-ink mb-6 leading-[1.1]">
            Wij bouwen niet "AI in het algemeen".{' '}
            <span className="text-gradient-accent">Wij lossen vijf concrete vraagstukken op.</span>
          </h2>
          <p className="font-body text-lg text-lv-body leading-relaxed max-w-3xl">
            Elke dienst start met een vaste audit. Daarna een pilot binnen 4–8 weken. Daarna doorlopend partnership. Geen losse projecten, geen black-box, geen verrassingen.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diensten.map((d, i) => {
            const cardRef = useReveal(i * 0.06);
            return (
              <a
                key={d.number}
                ref={cardRef}
                href="/#contact"
                className="reveal group relative rounded-2xl p-8 md:p-10 border border-lv-line-soft bg-lv-surface hover:border-lv-lime-ink/40 transition-all duration-300 hover-lift block"
              >
                <div className="flex items-start justify-between gap-6 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-lv-faint">
                    {d.number}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-lv-faint group-hover:text-lv-lime-ink transition-colors duration-300 flex-shrink-0" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-ink mb-4 leading-tight group-hover:text-lv-lime-ink transition-colors duration-300">
                  {d.title}
                </h3>
                <p className="font-body text-base text-lv-body leading-relaxed mb-8">
                  {d.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-lv-line-soft">
                  <span className="font-display text-sm font-600 text-lv-lime-ink">
                    {d.price}
                  </span>
                  <span className="font-body text-sm font-500 text-lv-body group-hover:text-lv-ink transition-colors duration-300">
                    Meer informatie →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Closing CTA */}
        <div ref={closerRef} className="reveal mt-16 md:mt-20 text-center max-w-2xl mx-auto">
          <p className="font-body text-base md:text-lg text-lv-body leading-relaxed mb-6">
            Weet je niet waar te beginnen? Wij ook niet — tot we jullie bedrijf kennen.
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300"
          >
            Vraag een gratis audit aan
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesNew;
