import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  Check,
  BookOpen,
  Clock,
  Loader2,
  FileText,
} from 'lucide-react';
import NavbarNew from '../components/NavbarNew';
import FooterNew from '../components/FooterNew';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { useReveal } from '../hooks/useReveal';

const chapters = [
  {
    title: 'Begin klein, win snel',
    tips: 4,
    description:
      'De 4 dingen die je morgenochtend al kan doen om momentum te maken zonder budget of ICT.',
  },
  {
    title: 'Data & fundament',
    tips: 4,
    description:
      'Hoe je in een week zicht krijgt op welke data je hebt en welke AI er bovenop kan.',
  },
  {
    title: 'Team & verandervermogen',
    tips: 4,
    description:
      'Waarom training belangrijker is dan tooling, en wie je eerst moet meenemen.',
  },
  {
    title: 'Commerciële hefbomen',
    tips: 3,
    description:
      'Drie AI-toepassingen die direct op omzet of marge ingrijpen bij MKB-bedrijven.',
  },
  {
    title: 'Valkuilen vermijden',
    tips: 5,
    description:
      '5 klassieke AI-project-fouten die 50% van de MKB-initiatieven doen stranden — en hoe jij ze omzeilt.',
  },
];

const TipsEnTricks = () => {
  const heroRef = useReveal();
  const formRef = useReveal();
  const chaptersRef = useReveal();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = '20 AI-tips voor Nederlandse organisaties — Leadvelocity';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        'content',
        '20 praktische AI-tips voor Nederlandse organisaties die vooruit willen zonder te struikelen. Gratis PDF-download.',
      );
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error('Vul naam en e-mail in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }
    setSubmitting(true);
    try {
      const body = [
        'TIPS & TRICKS PDF AANVRAAG',
        '',
        `Naam: ${name}`,
        `E-mail: ${email}`,
        '',
        `Aangevraagd: ${new Date().toISOString()}`,
      ].join('\n');
      const { error } = await supabase.functions.invoke('email-notify', {
        body: { name, company: '', email, phone: '', message: body },
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success('PDF onderweg naar je inbox');
    } catch (err) {
      console.error(err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

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
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center">
                <div className="lg:col-span-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-accent/20 bg-lv-accent/[0.05] mb-8">
                    <FileText className="w-4 h-4 text-lv-accent" />
                    <span className="font-body text-sm font-500 text-lv-accent">
                      Gratis PDF · 20 tips · alle sectoren
                    </span>
                  </div>
                  <h1 className="font-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-700 text-lv-text leading-[1.05] tracking-tight mb-6">
                    20 AI-tips voor organisaties die{' '}
                    <span className="text-gradient-accent">vooruit willen zonder te struikelen</span>.
                  </h1>
                  <p className="font-body text-lg md:text-xl text-lv-text-muted leading-relaxed mb-8">
                    Concrete, toepasbare tips uit onze dagelijkse praktijk met Nederlandse organisaties. Geen hype, geen theorie — tips die je vandaag of volgende week al kan toepassen.
                  </p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-lv-text-subtle">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>~25 pagina&apos;s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>~20 min leestijd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Gratis PDF</span>
                    </div>
                  </div>
                </div>

                {/* Form card */}
                <div className="lg:col-span-2">
                  <div ref={formRef} className="reveal p-7 md:p-8 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20">
                    {submitted ? (
                      <div className="text-center py-4">
                        <div className="w-12 h-12 rounded-full bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-6 h-6 text-lv-accent" />
                        </div>
                        <h3 className="font-display text-xl font-700 text-lv-text mb-2">
                          PDF onderweg
                        </h3>
                        <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                          Binnen enkele minuten vind je de PDF in <span className="text-lv-text">{email}</span>.
                        </p>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-display text-lg md:text-xl font-700 text-lv-text mb-4 leading-tight">
                          Download direct naar je inbox
                        </h3>
                        <form onSubmit={submit} className="space-y-3">
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Voornaam"
                            className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                          />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="naam@bedrijf.nl"
                            className="w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
                          />
                          <button
                            type="submit"
                            disabled={submitting}
                            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 disabled:opacity-60"
                          >
                            {submitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Bezig...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                Download de PDF
                              </>
                            )}
                          </button>
                          <p className="font-body text-xs text-lv-text-subtle">
                            Geen spam. Je ontvangt ook onze maandelijkse AI-briefing, direct opzegbaar.
                          </p>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTERS */}
        <section ref={chaptersRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-y border-lv-border-subtle">
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
                  Vijf hoofdstukken, 20 tips.
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {chapters.map((ch, i) => (
                  <div
                    key={ch.title}
                    className="p-6 md:p-7 rounded-xl bg-lv-ink border border-lv-border-subtle"
                  >
                    <div className="font-display text-xs font-700 text-lv-accent uppercase tracking-widest mb-3">
                      Hoofdstuk {i + 1} · {ch.tips} tips
                    </div>
                    <h3 className="font-display text-lg font-700 text-lv-text mb-3 leading-tight">
                      {ch.title}
                    </h3>
                    <p className="font-body text-sm text-lv-text-muted leading-relaxed">
                      {ch.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECONDARY CTA */}
        {!submitted && (
          <section className="py-14 md:py-16 relative">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto text-center">
                <p className="font-body text-base text-lv-text-muted leading-relaxed">
                  Al klaar om verder te gaan? Bekijk de{' '}
                  <a href="/bronnen/ai-readiness-assessment" className="text-lv-accent hover:underline font-500">
                    AI-Readiness Assessment
                  </a>
                  {' '}of{' '}
                  <a href="/#contact" className="text-lv-accent hover:underline font-500">
                    plan direct een gesprek
                  </a>
                  .
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

export default TipsEnTricks;
