import React from 'react';
import { useReveal } from '../hooks/useReveal';

const painPoints = [
  {
    number: '01',
    title: 'Groei via via',
    text: 'Jullie winnen klanten via bestaande relaties en beurzen. Dat werkt — totdat het netwerk uitdroogt en er geen plan B is.',
  },
  {
    number: '02',
    title: 'Mensen doen machinewerk',
    text: 'Rapporten handmatig samenstellen, orders handmatig invoeren, e-mails kopiëren naar Excel. Het team verdient beter.',
  },
  {
    number: '03',
    title: 'Klanten vertrekken stil',
    text: 'Geen signaal, geen klacht — gewoon weg. Omdat er geen systeem is dat het ziet aankomen of voorkomt.',
  },
];

const Probleem = () => {
  const headerRef = useReveal();
  const closerRef = useReveal(0.15);

  return (
    <section id="probleem" className="section-padding relative bg-lv-surface">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lv-accent/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-16 md:mb-20 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-accent" />
            <span className="font-mono text-xs uppercase tracking-widest text-lv-accent">
              Het probleem
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.1] mb-6">
            De meeste MKB-bedrijven groeien op geluk en netwerk.{' '}
            <span className="text-lv-text-muted">Tot dat ophoudt.</span>
          </h2>
        </div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-20">
          {painPoints.map((p, i) => {
            const cardRef = useReveal(i * 0.08);
            return (
              <div
                key={p.number}
                ref={cardRef}
                className="reveal p-8 md:p-10 rounded-2xl border border-lv-border-subtle bg-lv-ink hover:border-lv-accent/30 transition-colors duration-300"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-lv-text-subtle mb-6">
                  {p.number}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-text mb-4 leading-tight">
                  {p.title}
                </h3>
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div ref={closerRef} className="reveal max-w-3xl">
          <p className="font-display text-2xl md:text-3xl font-600 text-lv-text leading-snug">
            Dit zijn geen onvermijdelijke problemen.{' '}
            <span className="text-gradient-accent">Het zijn oplosbare systemen.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Probleem;
