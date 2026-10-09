import React from 'react';
import { Check } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const matches = [
  'Industrieel MKB — producerend of handeldrijvend',
  'Gevestigd in Nederland of België',
  'Groeit nu via netwerk — en weet dat dat niet genoeg is',
  'Geen intern IT- of marketing-team',
  'Eigenaar of directeur die zelf beslissingen neemt',
];

const VoorWie = () => {
  const headerRef = useReveal();
  const listRef = useReveal(0.1);
  const noteRef = useReveal(0.2);

  return (
    <section id="voor-wie" className="section-padding relative">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div ref={headerRef} className="reveal mb-12 md:mb-16 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lv-lime" />
            <span className="font-mono text-xs uppercase tracking-widest text-lv-lime-ink">
              Voor wie
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-700 text-lv-ink leading-[1.1]">
            Wij werken met industriële MKB-bedrijven die klaar zijn{' '}
            <span className="text-lv-body">om te stoppen met improviseren.</span>
          </h2>
        </div>

        {/* Checklist */}
        <div
          ref={listRef}
          className="reveal max-w-3xl rounded-2xl border border-lv-line-soft bg-lv-surface p-8 md:p-10"
        >
          <ul className="space-y-4">
            {matches.map((m) => (
              <li key={m} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-lv-lime-soft border border-lv-lime-ink/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-lv-lime-ink" />
                </div>
                <span className="font-body text-base md:text-lg text-lv-ink leading-snug">
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* "Niet voor" note */}
        <div ref={noteRef} className="reveal mt-10 md:mt-12 max-w-3xl">
          <div className="p-6 md:p-7 rounded-xl border border-lv-line-soft bg-lv-paper/40">
            <div className="font-mono text-xs uppercase tracking-widest text-lv-faint mb-3">
              Niet voor
            </div>
            <p className="font-body text-base text-lv-body leading-relaxed">
              Wij werken niet met startups zonder omzet, e-commerce bedrijven of organisaties die al een volledig commercieel en operations team hebben.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoorWie;
