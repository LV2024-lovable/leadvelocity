import React, { useState } from 'react';
import { ArrowUpRight, Check, Download, Copy, Sparkles, FileText, Zap } from 'lucide-react';
import { SiteHeader, SiteFooter, Seo } from '@/components/site';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond, AssetType } from '../lib/autoRespond';
import { useReveal } from '../hooks/useReveal';
import { checkHref } from '@/lib/cta';
import { PromptPack } from '../data/promptPacks';

type Props = {
  pack: PromptPack;
};

const PromptPackPage: React.FC<Props> = ({ pack }) => {
  const heroRef = useReveal();
  const formRef = useReveal();
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) {
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
        `PROMPT PACK AANVRAAG — ${pack.title}`,
        '',
        `Naam: ${name}`,
        `E-mail: ${email}`,
        `Pack: ${pack.slug}`,
        `Vertical: ${pack.vertical}`,
        '',
        `Aangevraagd: ${new Date().toISOString()}`,
      ].join('\n');

      const { error } = await supabase.functions.invoke('email-notify', {
        body: { name, company: '', email, phone: '', message: body },
      });
      if (error) throw error;

      const slugToAsset: Record<string, AssetType> = {
        'groothandel-prompts-2026': 'prompts_groothandel',
        'maakindustrie-prompts-2026': 'prompts_maakindustrie',
        'transport-prompts-2026': 'prompts_transport',
      };
      const assetType = slugToAsset[pack.slug] ?? 'prompts_groothandel';

      triggerAutoRespond({
        name,
        email,
        assetType,
      });

      setUnlocked(true);
      toast.success('Pack ontgrendeld — we sturen ook een kopie naar je inbox.');
    } catch (err) {
      console.error(err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyPrompt = async (promptText: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPromptIdx(idx);
      toast.success('Prompt gekopieerd');
      setTimeout(() => setCopiedPromptIdx(null), 2000);
    } catch {
      toast.error('Kopiëren mislukt');
    }
  };

  return (
    <div className="min-h-screen bg-lv-paper">
      <Seo title={`${pack.title} — Lead Velocity`} description={pack.metaDescription} path={window.location.pathname} />
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden grain">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-lv-lime/[0.04] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

          <div ref={heroRef} className="reveal container mx-auto px-4 md:px-6 pt-32 pb-16 md:pt-40 md:pb-20 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lv-lime-ink/20 bg-lv-lime/[0.05] mb-8">
                <Sparkles className="w-4 h-4 text-lv-lime-ink" />
                <span className="font-body text-sm font-500 text-lv-lime-ink">
                  Prompt & Template Pack · {pack.vertical}
                </span>
              </div>

              <h1 className="font-display text-[2.25rem] sm:text-4xl md:text-5xl lg:text-6xl font-700 text-lv-ink leading-[1.05] tracking-tight mb-6">
                {pack.title}
              </h1>

              <p className="font-body text-lg md:text-xl text-lv-body leading-relaxed mb-8 max-w-3xl">
                {pack.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-5 text-sm text-lv-faint">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>{pack.prompts.length} AI-prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>{pack.templates.length} templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Gratis download</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EMAIL GATE — only shown if not unlocked */}
        {!unlocked && (
          <section ref={formRef} className="reveal py-16 md:py-20 relative bg-lv-surface border-y border-lv-line-soft">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto">
                <div className="p-8 md:p-10 rounded-2xl bg-lv-lime/[0.04] border border-lv-lime-ink/20">
                  <h2 className="font-display text-2xl md:text-3xl font-700 text-lv-ink mb-4 leading-tight">
                    Ontgrendel het volledige pack
                  </h2>
                  <p className="font-body text-base text-lv-body leading-relaxed mb-6">
                    Vul je gegevens in om direct alle prompts en templates te zien. We sturen ook een kopie naar je inbox zodat je ze kan delen.
                  </p>
                  <form onSubmit={submitRequest} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Naam"
                        className="w-full px-4 py-3 rounded-lg border bg-lv-paper border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="naam@bedrijf.nl"
                        className="w-full px-4 py-3 rounded-lg border bg-lv-paper border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg transition-all duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Bezig...' : 'Ontgrendel pack'}
                      {!submitting && <ArrowUpRight className="w-5 h-5" />}
                    </button>
                    <p className="font-body text-xs text-lv-faint mt-2">
                      Geen spam. Je kan je ook aanmelden voor onze maandelijkse nieuwsbrief.
                    </p>
                  </form>
                </div>

                {/* Preview — first prompt teaser when locked */}
                <div className="mt-10 p-6 rounded-xl bg-lv-paper border border-lv-line-soft">
                  <div className="font-body text-xs font-600 text-lv-faint uppercase tracking-widest mb-3">
                    Voorproefje · 1e prompt
                  </div>
                  <h3 className="font-display text-base font-700 text-lv-ink mb-2">
                    {pack.prompts[0].title}
                  </h3>
                  <p className="font-body text-sm text-lv-body italic">
                    Use-case: {pack.prompts[0].useCase}
                  </p>
                  <div className="mt-4 p-4 rounded-lg bg-lv-surface border border-lv-line-soft">
                    <div className="font-body text-sm text-lv-body leading-relaxed line-clamp-2">
                      {pack.prompts[0].prompt.substring(0, 120)}...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* UNLOCKED — show all prompts and templates */}
        {unlocked && (
          <>
            <section className="py-14 md:py-16 relative">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                      <Check className="w-5 h-5 text-lv-lime-ink" />
                      <span className="font-body text-xs font-600 text-lv-lime-ink uppercase tracking-widest">
                        Pack ontgrendeld · kopie naar {email}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-ink mb-4 leading-tight">
                      De {pack.prompts.length} AI-prompts
                    </h2>
                    <p className="font-body text-base text-lv-body leading-relaxed">
                      Kopieer een prompt en plak 'm in ChatGPT, Claude, Gemini of je eigen AI-stack. Vervang placeholders tussen [haakjes] met je eigen waardes.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {pack.prompts.map((prompt, idx) => (
                      <div
                        key={idx}
                        className="p-6 md:p-7 rounded-xl bg-lv-surface border border-lv-line-soft"
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="font-body text-xs font-600 text-lv-lime-ink uppercase tracking-widest mb-2">
                              Prompt {idx + 1}
                            </div>
                            <h3 className="font-display text-lg md:text-xl font-700 text-lv-ink leading-tight">
                              {prompt.title}
                            </h3>
                          </div>
                          <button
                            onClick={() => copyPrompt(prompt.prompt, idx)}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-lv-line text-lv-body hover:text-lv-lime-ink hover:border-lv-lime-ink/40 transition-colors text-sm font-body"
                          >
                            {copiedPromptIdx === idx ? (
                              <>
                                <Check className="w-4 h-4 text-lv-lime-ink" />
                                Gekopieerd
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Kopieer
                              </>
                            )}
                          </button>
                        </div>
                        <p className="font-body text-sm text-lv-faint italic mb-4">
                          Use-case: {prompt.useCase}
                        </p>
                        <div className="p-4 rounded-lg bg-lv-paper border border-lv-line-soft">
                          <pre className="font-body text-sm text-lv-body leading-relaxed whitespace-pre-wrap break-words">
                            {prompt.prompt}
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Templates */}
            <section className="py-14 md:py-16 relative bg-lv-surface border-y border-lv-line-soft">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-10">
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-ink mb-4 leading-tight">
                      De {pack.templates.length} templates
                    </h2>
                    <p className="font-body text-base text-lv-body leading-relaxed">
                      Onderstaande templates worden per e-mail als downloadbare bestanden verzonden. Ze zijn bewerkbaar in Excel, Word en Google Docs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pack.templates.map((template, idx) => (
                      <div
                        key={idx}
                        className="p-5 md:p-6 rounded-xl bg-lv-paper border border-lv-line-soft"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-lv-lime-soft border border-lv-lime-ink/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-lv-lime-ink" />
                          </div>
                          <div>
                            <h3 className="font-display text-base font-700 text-lv-ink mb-2 leading-tight">
                              {template.title}
                            </h3>
                            <p className="font-body text-sm text-lv-body leading-relaxed">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="font-body text-xs text-lv-faint mt-8 italic">
                    Templates worden binnen 15 minuten verzonden naar {email}. Check ook je spam-folder.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <section className="py-16 md:py-20 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-700 text-lv-ink mb-5 leading-tight">
                Wil je dit in jullie eigen systemen ingebouwd zien?
              </h2>
              <p className="font-body text-base md:text-lg text-lv-body leading-relaxed mb-8">
                Wij bouwen deze prompts in als AI-assistenten die naadloos in je binnendienst, planner of shop-floor werken.
              </p>
              <a
                href={checkHref({ source: `promptpack-${pack.slug}` })}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg transition-all duration-300 group"
              >
                Plan een gratis adviesgesprek
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PromptPackPage;
