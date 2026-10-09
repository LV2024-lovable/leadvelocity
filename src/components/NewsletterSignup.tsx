import React, { useState } from 'react';
import { ArrowUpRight, Check, Loader2, Mail } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond } from '../lib/autoRespond';

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Props = {
  variant?: 'default' | 'inline' | 'compact';
  sourceHint?: string;
};

const NewsletterSignup: React.FC<Props> = ({ variant = 'default', sourceHint }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !isValidEmail(email)) {
      toast.error('Vul een geldig e-mailadres in.');
      return;
    }

    setSubmitting(true);

    try {
      const messageBody = [
        'NIEUWSBRIEF INSCHRIJVING',
        '',
        `Naam: ${name.trim() || '(niet ingevuld)'}`,
        `E-mail: ${email.trim()}`,
        '',
        `Bron: ${sourceHint || 'leadvelocity.nl'}`,
        `Ingeschreven op: ${new Date().toISOString()}`,
      ].join('\n');

      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name: name.trim() || 'Nieuwsbrief-abonnee',
          company: '',
          email: email.trim(),
          phone: '',
          message: messageBody,
        },
      });

      if (error) throw error;

      triggerAutoRespond({
        name: name.trim() || 'daar',
        email: email.trim(),
        assetType: 'newsletter',
      });

      setSubmitted(true);
      toast.success('Bedankt! Je staat op de lijst.');
    } catch (err) {
      console.error('Newsletter signup error:', err);
      toast.error('Er ging iets mis. Probeer het nog eens.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-5 rounded-lg bg-lv-lime/[0.06] border border-lv-lime-ink/30">
        <Check className="w-5 h-5 text-lv-lime-ink flex-shrink-0" />
        <span className="font-body text-sm text-lv-ink">
          Aangemeld — eerste uitgave komt volgende maand.
        </span>
      </div>
    );
  }

  const inputBase =
    'w-full px-4 py-3 rounded-lg border bg-lv-paper border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50 focus:ring-1 focus:ring-lv-lime-ink/20 transition-colors';

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="naam@bedrijf.nl"
          className={inputBase}
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-lv-lime text-lv-ink font-display font-700 text-sm rounded-lg transition-all duration-300 disabled:opacity-60 whitespace-nowrap"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Mail className="w-4 h-4" /> Aanmelden</>}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naam (optioneel)"
          className={inputBase}
          autoComplete="name"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="naam@bedrijf.nl"
          className={inputBase}
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg transition-all duration-300 group disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Bezig...
          </>
        ) : (
          <>
            Meld mij aan
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
      <p className="font-body text-xs text-lv-faint">
        Maandelijks, geen spam. Direct opzegbaar.
      </p>
    </form>
  );
};

export default NewsletterSignup;
