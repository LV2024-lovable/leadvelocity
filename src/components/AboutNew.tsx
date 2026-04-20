import React from 'react';
import { Users, Gauge, Shield } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const values = [
  {
    icon: Users,
    title: 'Twee mensen. Maximaal acht klanten.',
    description:
      'Geen hiërarchie, geen accountmanagers, geen handovers. Je krijgt Bart en zijn broer — direct, hands-on, beslissing binnen een uur. Maximaal 8 klanten tegelijk zodat niemand achter in de rij staat.',
  },
  {
    icon: Gauge,
    title: 'Commerciële DNA + Operationele DNA.',
    description:
      'Bart komt uit lead generation, z\'n broer uit operations, finance en inkoop. Niet het gemiddelde AI-bureau dat alleen kan bouwen maar niet weet hoe jouw sales- of inkoopproces écht werkt.',
  },
  {
    icon: Shield,
    title: 'Wij eten ons eigen hondenvoer.',
    description:
      'Elke workflow die we jou verkopen, draaien we zelf. Outbound, onboarding, rapportage, facturatie — alles AI-geautomatiseerd. Wij zijn jullie beste case study van dag één.',
  },
];

const AboutNew = () => {
  const headerRef = useReveal();
  const contentRef = useReveal(0.15);

  return (
    <section id="over-ons" className="section-padding relative bg-lv-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
          {/* Left: story */}
          <div>
            <div ref={headerRef} className="reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-lv-accent" />
                <span className="font-body text-sm font-600 text-lv-accent uppercase tracking-widest">
                  Wie wij zijn
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text mb-8 leading-[1.1]">
                AI vervangt geen goede mensen.{' '}
                <span className="text-gradient-accent">Maar wél bedrijven die blijven stilstaan.</span>
              </h2>
            </div>

            <div ref={contentRef} className="reveal space-y-6">
              <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                Wij bouwen geen AI-projecten. Wij bouwen AI-operaties — de systemen die je inkoop, je pipeline, je service en je planning zo laten draaien dat je team méér kan met minder gedoe, terwijl bedrijven die stil blijven staan ingehaald worden door iedereen die wél beweegt.
              </p>
              <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                De vraag is niet óf AI jouw bedrijf verandert. De vraag is: <span className="text-lv-text font-600">ben jij degene die ermee bouwt, of degene die wordt ingehaald?</span>
              </p>
              <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed">
                Leadvelocity is een Amsterdamse 2-persoons-studio. Twee broers, twintig jaar gecombineerde ervaring in sales, lead generation, inkoop en operations. Wij kiezen bewust klein te blijven — scherp, snel, selectief, met maximaal 8 klanten tegelijk. Zo kunnen we diep gaan, beslissen in uren in plaats van weken, en resultaten leveren die groot-consulting niet haalt.
              </p>
            </div>
          </div>

          {/* Right: values */}
          <div className="flex flex-col gap-6 lg:pt-16">
            {values.map((value, i) => {
              const valueRef = useReveal(i * 0.1);
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={valueRef}
                  className="reveal p-6 md:p-8 rounded-2xl bg-lv-ink border border-lv-border-subtle hover:border-lv-accent/20 transition-colors duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-lv-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3">
                        {value.title}
                      </h3>
                      <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNew;
