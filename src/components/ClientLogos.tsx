import React from 'react';

// Bedrijven die met ons werken. Eenvoudig aan te vullen / wijzigen:
// voeg een naam toe, verwijder of her-orden. Volgorde bepaalt de marquee-volgorde.
const clients = [
  'Boest',
  'FlikFlak',
  'Cowboys',
  'Upply Jobs',
  'Solar Access',
  'Somo Agency',
  'Creative ICT',
  'Faslet',
  'Dome Auctions',
  'Cape',
];

type Props = {
  /** Optionele kop. Zet op null om te verbergen. */
  heading?: string | null;
  className?: string;
};

const ClientLogos: React.FC<Props> = ({
  heading = 'Bedrijven die met ons werken',
  className = '',
}) => {
  // Dubbel de lijst zodat de marquee naadloos kan loopen
  const marqueeClients = [...clients, ...clients];

  return (
    <section className={`py-12 md:py-14 relative border-y border-lv-border-subtle ${className}`}>
      {heading && (
        <div className="container mx-auto px-4 md:px-6 mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-lv-accent" />
            <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
              {heading}
            </span>
            <div className="h-px w-10 bg-lv-accent" />
          </div>
        </div>
      )}

      {/* Marquee wrapper — horizontaal scrollend, naadloze loop */}
      <div className="relative overflow-hidden">
        {/* Gradient-fade links + rechts zodat namen niet abrupt afgesneden worden */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-lv-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-lv-ink to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-12 md:gap-20 items-center whitespace-nowrap">
          {marqueeClients.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-display text-xl md:text-2xl font-600 text-lv-text-muted tracking-tight opacity-70 hover:opacity-100 hover:text-lv-text transition-all duration-300 select-none flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
