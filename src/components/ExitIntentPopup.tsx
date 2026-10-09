import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowUpRight, Check, Loader2, FileText } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond } from '../lib/autoRespond';

const STORAGE_KEY = 'lv-exit-intent-shown';
const SESSION_KEY = 'lv-exit-intent-session-shown';
const RESHOW_AFTER_DAYS = 30;

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // Don't show if recently closed (30d cookie) or already shown this session
    try {
      const lastShown = localStorage.getItem(STORAGE_KEY);
      if (lastShown) {
        const daysSince = (Date.now() - parseInt(lastShown, 10)) / (1000 * 60 * 60 * 24);
        if (daysSince < RESHOW_AFTER_DAYS) return;
      }
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage/localStorage not available — skip feature
      return;
    }

    // Don't show on certain pages (lead magnets themselves — user is already mid-conversion)
    const excludedPaths = [
      '/bronnen/tips-en-tricks',
      '/ai-readiness-assessment',
      '/lp/assessment',
    ];
    if (excludedPaths.some((p) => window.location.pathname.startsWith(p))) {
      return;
    }

    // Only trigger exit-intent after user has been on page at least 15 seconds
    const minDwellMs = 15_000;
    const startedAt = Date.now();

    const onMouseLeave = (e: MouseEvent) => {
      // Fire when mouse leaves viewport through the top
      if (e.clientY > 0) return;
      if (Date.now() - startedAt < minDwellMs) return;
      if (open) return;

      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // ignore
      }
      setOpen(true);
    };

    // Fallback for mobile: trigger on scrolling back to top very fast after going down
    // Skip mobile trigger for now to avoid false-positives

    document.addEventListener('mouseleave', onMouseLeave);
    return () => document.removeEventListener('mouseleave', onMouseLeave);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } catch {
      // ignore
    }
    close();
  };

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
        'TIPS & TRICKS PDF — exit-intent popup',
        '',
        `Naam: ${name}`,
        `E-mail: ${email}`,
        `Pagina: ${window.location.pathname}`,
        '',
        `Aangevraagd: ${new Date().toISOString()}`,
      ].join('\n');
      const { error } = await supabase.functions.invoke('email-notify', {
        body: { name, company: '', email, phone: '', message: body },
      });
      if (error) throw error;

      triggerAutoRespond({
        name: name.trim(),
        email: email.trim(),
        assetType: 'tips_tricks',
      });

      try {
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      } catch {
        // ignore
      }
      setSubmitted(true);
      toast.success('PDF onderweg naar je inbox');
    } catch (err) {
      console.error(err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className="relative w-full max-w-lg bg-lv-paper border border-lv-line rounded-2xl overflow-hidden shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-lv-line-soft bg-lv-surface text-lv-body hover:text-lv-lime-ink hover:border-lv-lime-ink/30 transition-colors flex items-center justify-center"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 md:p-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-lv-lime-soft border border-lv-lime-ink/30 flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-lv-lime-ink" />
              </div>
              <h3 className="font-display text-2xl font-700 text-lv-ink mb-3">
                Onderweg naar je inbox
              </h3>
              <p className="font-body text-base text-lv-body leading-relaxed max-w-sm mx-auto">
                Binnen enkele minuten vind je de PDF in <span className="text-lv-ink">{email}</span>.
              </p>
              <button
                onClick={close}
                className="mt-6 font-body text-sm text-lv-faint hover:text-lv-ink transition-colors"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <>
              <div className="w-11 h-11 rounded-lg bg-lv-lime-soft border border-lv-lime-ink/20 flex items-center justify-center mb-5">
                <FileText className="w-5 h-5 text-lv-lime-ink" />
              </div>
              <div className="font-body text-xs font-600 text-lv-lime-ink uppercase tracking-widest mb-3">
                Voor je gaat
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-700 text-lv-ink mb-4 leading-tight">
                20 AI-tips voor organisaties die vooruit willen.
              </h3>
              <p className="font-body text-base text-lv-body leading-relaxed mb-6">
                Concrete, toepasbare tips uit onze praktijk. Geen theorie. Gratis PDF in je inbox.
              </p>

              <form onSubmit={submit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Voornaam"
                  className="w-full px-4 py-3 rounded-lg border bg-lv-surface border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="naam@bedrijf.nl"
                  className="w-full px-4 py-3 rounded-lg border bg-lv-surface border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Bezig...
                    </>
                  ) : (
                    <>
                      Stuur mij de PDF
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="w-full text-center font-body text-xs text-lv-faint hover:text-lv-body transition-colors mt-2"
                >
                  Nee bedankt, ik lees liever verder
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
