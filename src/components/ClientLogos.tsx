import React from 'react';

const logos = [
  { src: '/lovable-uploads/2ddf05ef-b445-4e82-a2bb-a84fc5e777ce.png', alt: 'Cowboys' },
  { src: '/lovable-uploads/c4b0893b-5d37-43ae-b56d-927cd8ebae4c.png', alt: 'Solar Access' },
  { src: '/lovable-uploads/abc5f770-794a-4ce4-abf6-35b479647f14.png', alt: 'Creative ICT' },
  { src: '/lovable-uploads/d63c7d5b-2ebe-4fd7-8825-ef6bdb828ba7.png', alt: 'Faslet' },
  { src: '/lovable-uploads/f14628e4-bf2a-45db-8029-49f246c685f2.png', alt: 'Cape' },
];

type Props = {
  /** Optional heading. Set to null to hide. */
  heading?: string | null;
  className?: string;
};

const ClientLogos: React.FC<Props> = ({
  heading = 'Bedrijven die met ons werken',
  className = '',
}) => {
  // Duplicate the logo list so the marquee can loop seamlessly
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className={`py-14 md:py-16 relative border-y border-lv-border-subtle ${className}`}>
      {heading && (
        <div className="container mx-auto px-4 md:px-6 mb-10">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-lv-accent" />
            <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
              {heading}
            </span>
            <div className="h-px w-10 bg-lv-accent" />
          </div>
        </div>
      )}

      {/* Marquee wrapper — horizontal scroll, seamless loop */}
      <div className="relative overflow-hidden">
        {/* Gradient fade left + right so logos don't just chop off */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-lv-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-lv-ink to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-12 md:gap-20 items-center whitespace-nowrap">
          {marqueeLogos.map((logo, i) => (
            <div
              key={`${logo.alt}-${i}`}
              className="flex items-center justify-center flex-shrink-0 h-14 md:h-16"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 md:max-h-14 w-auto opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
