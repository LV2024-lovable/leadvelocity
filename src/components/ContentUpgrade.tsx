import React, { useState } from 'react';
import { ArrowUpRight, FileText, Check, Loader2, Download } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond } from '../lib/autoRespond';

type Props = {
  /** Welk asset-type bieden we aan? Default = tips_tricks */
  assetType?: 'tips_tricks' | 'newsletter';
  /** Custom heading. Default volgt assetType. */
  heading?: string;
  /** Custom body-tekst. */
  body?: string;
  /** Context waar dit component staat (voor lead-tracking). */
  source?: string;
};

const defaults = {
  tips_tricks: {
    heading: '20 AI-tips in je inbox',
    body:
      'Wil je meer dan dit artikel? Download de volledige gids met 20 praktische AI-tips voor Nederlandse organisaties — gratis in je inbox.',
    cta: 'Download de PDF',
  },
  newsletter: {
    heading: 'Meer van dit soort artikelen?',
    body:
      'Abonneer op onze maandelijkse AI-briefing voor NL MKB. Eén doordachte lange-lees per maand, geen spam.',
    cta: 'Schrijf mij in',
  },
};

const ContentUpgrade: React.FC<Props> = ({
  assetType = 'tips_tricks',
  heading,
  body,
  source = 'blog content-upgrade',
}) => {
  const copy = defaults[assetType];
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Vul je e-mail in.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }
    setSubmitting(true);
    try {
      const assetLabel = assetType === 'tips_tricks' ? 'TIPS & TRICKS PDF' : 'NIEUWSBRIEF';
      const body_msg = [
        `${assetLabel} — content-upgrade`,
        '',
        `E-mail: ${email}`,
        `Bron: ${source}`,
        `Pagina: ${window.location.pathname}`,
        '',
        `Aangevraagd: ${new Date().toISOString()}`,
      ].join('\n');
      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name: 'Blog-lezer',
          company: '',
          email,
          phone: '',
          message: body_msg,
        },
      });
      if (error) throw error;

      triggerAutoRespond({
        name: 'daar',
        email,
        assetType: assetType === 'tips_tricks' ? 'tips_tricks' : 'newsletter',
      });

      setSubmitted(true);
      toast.success(
        assetType === 'tips_tricks'
          ? 'PDF onderweg naar je inbox'
          : 'Aangemeld — tot volgende maand',
      );
    } catch (err) {
      console.error(err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-10 md:my-12 p-6 md:p-8 rounded-2xl bg-lv-accent/[0.04] border border-lv-accent/20 not-prose">
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center">
          {assetType === 'tips_tricks' ? (
            <FileText className="w-6 h-6 text-lv-accent" />
          ) : (
            <Download className="w-6 h-6 text-lv-accent" />
          )}
        </div>

        <div className="flex-1">
          <div className="font-body text-xs font-600 text-lv-accent uppercase tracking-widest mb-2">
            {assetType === 'tips_tricks' ? 'Content-upgrade · Gratis PDF' : 'Content-upgrade · Nieuwsbrief'}
          </div>
          <h3 className="font-display text-xl md:text-2xl font-700 text-lv-text mb-3 leading-tight">
            {heading ?? copy.heading}
          </h3>
          <p className="font-body text-base text-lv-text-muted leading-relaxed mb-5">
            {body ?? copy.body}
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 text-lv-accent">
              <Check className="w-5 h-5" />
              <span className="font-body text-sm font-500">
                {assetType === 'tips_tricks'
                  ? `Onderweg naar ${email}`
                  : 'Aangemeld — bedankt'}
              </span>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="naam@bedrijf.nl"
                className="flex-1 px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-accent text-lv-ink font-display font-700 text-sm rounded-lg hover:shadow-[0_0_20px_rgba(200,255,0,0.3)] transition-all duration-300 disabled:opacity-60 whitespace-nowrap"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {copy.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentUpgrade;
