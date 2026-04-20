import React, { useEffect } from 'react';
import { Mail, Check, Calendar, Zap, BookOpen, BarChart3 } from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import NewsletterSignup from '../components/NewsletterSignup';
import { useReveal } from '../hooks/useReveal';

const whatsInside = [
  {
    icon: BookOpen,
    title: 'Één lange-lees per maand',
    description:
      'Diepgaande analyse van een AI-thema dat er toe doet voor NL-industrie. Geen 20 korte tips — één doordacht artikel dat je rustig op een zondagmiddag leest.',
  },
  {
    icon: BarChart3,
    title: 'Sector-benchmarks die je niet elders vindt',
    description:
      'Cijfers uit onze eigen scans en gesprekken met NL MKB-directies. Specifiek, recent, bruikbaar in je eigen business case.',
  },
  {
    icon: Zap,
    title: 'Eén concrete AI-toepassing die werkt',
    description:
      'Elke maand belichten we een AI-use-case die bewezen is in Nederlandse context — inclusief wat het oplevert en waarom het werkt.',
  },
  {
    icon: Calendar,
    title: 'Geen ruis, geen spam',
    description:
      'Eén e-mail per maand, op een vaste maandag. Geen verkoop-sequences, geen promotie. Direct opzegbaar.',
  },
];

const previewIssues = [
  {
    date: 'Mei 2026',
    title: 'Vrachtwagenheffing 1 juli: de drie AI-compensaties die werken',
    teaser:
      'We werken uit wat de heffing écht betekent per vlootgrootte en welke AI-toepassingen reeds dit kwartaal kunnen starten.',
  },
  {
    date: 'Juni 2026',
    title: 'AI-pricing in technische groothandel: wat Turtle deed en waarom het werkte',
    teaser:
      'Diepe analyse van de Turtle-case (130 bps marge in 12 weken) en wat hier in NL van toepassing is.',
  },
  {
    date: 'Juli 2026',
    title: 'De echte OEE-gap in NL-maakindustrie (en waarom industrie 4.0 die niet dicht)',
    teaser:
      'Cijfers uit eigen scans bij NL-maakbedrijven. Waarom OEE-sprongen meestal stranden en wat een gerichte AI-implementatie anders doet.',
  },
];

const Nieuwsbrief = () => {
  const heroRef = useReveal();
  const insideRef = useReveal();
  const previewRef = useReveal();

  useEffect(() => {
    document.title = 'De Leadvelocity Nieuwsbrief — Maandelijkse AI-briefing voor NL MKB';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        'Schrijf je in voor de maandelijkse AI-briefing voor Nederlandse MKB-industrie. Diepgaande analyses, sector-benchmarks en concrete use-cases. Geen hype, geen spam.',
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
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                <Mail className="w-4 h-4 text-lv-accent" />
                <span className="font-body text-sm font-500 text-lv-accent">
                  Maandelijks · Gratis · Direct opzegbaar
                </span>
              </div>
              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                De maandelijkse{' '}
                <span className="text-gradient-accent">AI-briefing</span>
                {' '}voor NL MKB
              </h1>
              <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-10">
                Eén doordachte lange-lees per maand. Sector-benchmarks, bewezen use-cases en eerlijke observaties over wat wel en niet werkt in AI voor Nederlandse industrie.
              </p>

              <div className="max-w-lg mx-auto">
                <NewsletterSignup sourceHint="Nieuwsbrief-pagina hero" />
              </div>
            </div>
          </div>
        </section>

        {/* WHAT'S INSIDE */}
        <section ref={insideRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-y border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Wat er in zit
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Geen 20 tips. Één scherp stuk.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {whatsInside.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-6 md:p-7 rounded-xl bg-lv-ink border border-lv-border-subtle"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-11 h-11 rounded-lg bg-lv-accent/10 border border-lv-accent/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-lv-accent" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-700 text-lv-text mb-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed">
                            {item.description}
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

        {/* PREVIEW ISSUES */}
        <section ref={previewRef} className="reveal py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-10 bg-lv-accent" />
                  <span className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest">
                    Komende edities
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-700 text-lv-text leading-[1.1]">
                  Wat we de komende maanden behandelen
                </h2>
              </div>

              <div className="space-y-5">
                {previewIssues.map((issue) => (
                  <div
                    key={issue.title}
                    className="p-6 md:p-7 rounded-xl bg-lv-surface border border-lv-border-subtle"
                  >
                    <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-3">
                      {issue.date}
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-3 leading-tight">
                      {issue.title}
                    </h3>
                    <p className="font-body text-sm md:text-base text-lv-text-muted leading-relaxed italic">
                      {issue.teaser}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-20 relative bg-lv-surface border-t border-lv-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-6">
                <Check className="w-7 h-7 text-lv-accent" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-text mb-5 leading-[1.1]">
                Schrijf je in
              </h2>
              <p className="font-body text-base md:text-lg text-lv-text-muted leading-relaxed mb-8">
                Eén e-mail per maand. Alleen substantie. Direct opzegbaar.
              </p>
              <div className="max-w-lg mx-auto">
                <NewsletterSignup sourceHint="Nieuwsbrief-pagina footer" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterNew />
    </div>
  );
};

export default Nieuwsbrief;
