import React, { useEffect, useState } from 'react';
import { FileText, Check, ArrowDown, Download, Clock, BookOpen } from 'lucide-react';
import NavbarNew from '../../components/NavbarNew';
import FooterNew from '../../components/FooterNew';
import WhitepaperRequestForm from '../../components/WhitepaperRequestForm';
import { useReveal } from '../../hooks/useReveal';

const whatYouGet = [
  {
    icon: BookOpen,
    title: 'Volledige NL-marktanalyse 2026',
    description:
      'Gedetailleerde breakdown van de Nederlandse technische groothandel: margedruk, D2C-dynamiek, adoptie-cijfers en wat dit betekent voor de komende 18 maanden.',
  },
  {
    icon: FileText,
    title: '15 bewezen AI-use-cases met ROI-ranges',
    description:
      'Per use-case: wat het doet, bij welk type bedrijf, verwachte ROI, time-to-value, typische complexiteit. Geen theorie, alleen gedocumenteerde praktijk.',
  },
  {
    icon: Download,
    title: 'Implementatie-roadmap per kwartaal',
    description:
      'Concrete 12-maanden-route voor een technische groothandel: waar begin je, wat komt daarna, welke valkuilen vermijden.',
  },
];

const whitepaperSections = [
  { section: 'Samenvatting', length: '2 pag' },
  { section: 'De Nederlandse groothandel-realiteit in 2026', length: '4 pag' },
  { section: '15 AI-use-cases, gerangschikt op ROI', length: '8 pag' },
  { section: '3 scenario\'s: €10M, €30M, €75M groothandel', length: '4 pag' },
  { section: 'Implementatie-roadmap per kwartaal', length: '3 pag' },
  { section: 'Valkuilen en hoe ze te vermijden', length: '2 pag' },
  { section: 'WBSO 2026 subsidie-gids', length: '1 pag' },
  { section: 'Bronnen & referenties', length: '1 pag' },
];

const GroothandelWhitepaper2026 = () => {
  const heroRef = useReveal();
  const whatRef = useReveal(0.1);
  const formRef = useReveal();
  const [hasRequested, setHasRequested] = useState(false);

  useEffect(() => {
    document.title = 'Whitepaper: AI in de Nederlandse Technische Groothandel 2026 — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Download de volledige whitepaper: AI in de Nederlandse Technische Groothandel 2026. 25 pagina\'s over marktcontext, 15 AI-use-cases, ROI-scenario\'s en implementatie-roadmap.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-lv-ink">
      <NavbarNew />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
                {/* Left: intro */}
                <div className="lg:col-span-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                    <FileText className="w-4 h-4 text-lv-accent" />
                    <span className="font-body text-sm font-500 text-lv-accent">
                      Whitepaper · Technische Groothandel
                    </span>
                  </div>

                  <h1 className="font-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                    AI in de Nederlandse Technische Groothandel{' '}
                    <span className="text-gradient-accent">in 2026</span>
                  </h1>

                  <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-8">
                    25 pagina's diepgaande analyse, 15 gedocumenteerde AI-use-cases, en een concreet 12-maanden-implementatieplan voor technische groothandels die marge willen beschermen en operatie willen moderniseren.
                  </p>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-lv-text-subtle mb-8">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>25 pagina's</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>~30 min leestijd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>PDF-formaat</span>
                    </div>
                  </div>

                  <a
                    href="#download"
                    className="inline-flex items-center gap-2 font-display text-base font-700 text-lv-accent hover:underline"
                  >
                    Scroll naar download
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>

                {/* Right: table of contents teaser */}
                <div className="lg:col-span-2">
                  <div className="p-6 md:p-8 rounded-2xl bg-lv-surface border border-lv-border">
                    <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-5">
                      Inhoudsopgave
                    </div>
                    <ul className="space-y-3">
                      {whitepaperSections.map((s) => (
                        <li key={s.section} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-body text-lv-text leading-snug">{s.section}</span>
                          <span className="font-body text-xs text-lv-text-subtle whitespace-nowrap">{s.length}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section ref={whatRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Wat je krijgt
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Niet nog een AI-rapport met algemeenheden.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {whatYouGet.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 md:p-7 rounded-xl bg-lv-ink border border-lv-border-subtle"
                    >
                      <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5 text-lv-accent" />
                      </div>
                      <h3 className="font-display text-lg font-700 text-lv-text mb-3 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* KEY INSIGHTS PREVIEW */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Voorproefje: 5 insights
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Wat we in de whitepaper uitwerken
                </h2>
              </div>

              <ul className="space-y-4">
                {[
                  'Slechts 7% van NL handels-/logistiekbedrijven heeft concreet AI-beleid. Hier zit het adoptie-gat waar voorsprong wordt opgebouwd.',
                  'AI-pricing op long-tail SKU\'s levert 1-2% extra brutomarge. Voor een €30M-groothandel is dat €300-450k jaarlijks, zonder extra omzet.',
                  'Quote-automatisering versnelt RFQ-turnaround tot 93% — first-responders winnen ~50% vaker.',
                  'Binnendienst-AI maakt nieuwe medewerkers productief in 6 weken in plaats van 6 maanden. Cruciaal nu 68% van NL technische bedrijven personeelstekort ervaart.',
                  'WBSO 2026 verlaagt AI-investeringen effectief met 20-30% via R&D-aftrek. Slechts weinig agencies rekenen dit door in hun offertes — jij moet wel vragen.',
                ].map((insight, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-xl bg-lv-surface border border-lv-border-subtle">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mt-0.5">
                      <span className="font-display text-xs font-700 text-lv-accent">{i + 1}</span>
                    </span>
                    <span className="font-body text-base text-lv-text leading-relaxed">
                      {insight}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="font-body text-sm text-lv-text-subtle mt-8 italic">
                De whitepaper gaat 10x dieper op elk van deze punten, met bronnen, rekenvoorbeelden en implementatie-adviezen.
              </p>
            </div>
          </div>
        </section>

        {/* DOWNLOAD FORM */}
        <section id="download" ref={formRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-t border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="p-8 md:p-12 rounded-3xl bg-lv-accent/[0.04] border border-lv-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-lv-accent/[0.06] rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-5">
                      <Download className="w-7 h-7 text-lv-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text mb-4 leading-[1.1]">
                      Download de whitepaper
                    </h2>
                    <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed max-w-2xl mx-auto">
                      Vul je gegevens in. We sturen de PDF direct naar je inbox. Geen telefoon-tracking, geen verkooptrechter, geen spam.
                    </p>
                  </div>

                  <WhitepaperRequestForm
                    whitepaperTitle="AI in de Nederlandse Technische Groothandel 2026"
                    whitepaperSlug="groothandel-2026"
                    onSuccess={() => setHasRequested(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECONDARY CTA */}
        {!hasRequested && (
          <section className="py-14 md:py-16 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  Liever direct in gesprek? We doen vrijblijvende 30-min kennismakingsgesprekken met directies van technische groothandels.{' '}
                  <a href="/#contact" className="text-lv-accent hover:underline font-500">
                    Plan een gesprek →
                  </a>
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <FooterNew />
    </div>
  );
};

export default GroothandelWhitepaper2026;
