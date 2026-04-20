import React, { useState } from 'react';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

const initialData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Props = {
  /** Tone variant — 'light' uses darker surface on light context, 'dark' default */
  variant?: 'default' | 'inline';
  /** Subject prefix in the resulting email */
  sourceHint?: string;
};

const ContactForm: React.FC<Props> = ({ variant = 'default', sourceHint }) => {
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      toast.error('Vul naam, e-mail en bericht in om te versturen.');
      return;
    }

    if (!isValidEmail(data.email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }

    setSubmitting(true);

    try {
      const messageWithHint = sourceHint ? `[${sourceHint}]\n\n${data.message}` : data.message;

      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name: data.name.trim(),
          company: data.company.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          message: messageWithHint,
        },
      });

      if (error) throw error;

      setSubmitted(true);
      setData(initialData);
      toast.success('Bericht verstuurd — wij reageren binnen één werkdag.');
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error('Er ging iets mis. Probeer het nog eens, of mail direct naar info@leadvelocity.nl.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 md:p-10 rounded-2xl bg-lv-accent/[0.06] border border-lv-accent/30 text-center">
        <div className="w-14 h-14 rounded-full bg-lv-accent/10 border border-lv-accent/30 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-lv-accent" />
        </div>
        <h3 className="font-display text-2xl font-700 text-lv-text mb-3">
          Dank je — je bericht is binnen.
        </h3>
        <p className="font-body text-base text-lv-text-muted leading-relaxed max-w-md mx-auto">
          We reageren binnen één werkdag. Voor spoed: bel direct op{' '}
          <a href="tel:+31625471528" className="text-lv-accent hover:underline font-500">
            +31 6 25 47 15 28
          </a>.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex items-center gap-2 font-body text-sm text-lv-text-subtle hover:text-lv-text transition-colors"
        >
          Nog een bericht versturen →
        </button>
      </div>
    );
  }

  const inputBase =
    'w-full px-4 py-3 rounded-lg border bg-lv-ink border-lv-border text-lv-text placeholder:text-lv-text-subtle font-body text-base focus:outline-none focus:border-lv-accent/50 focus:ring-1 focus:ring-lv-accent/20 transition-colors';

  return (
    <form onSubmit={handleSubmit} className={variant === 'inline' ? '' : 'space-y-4'}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
            Naam *
          </label>
          <input
            id="name"
            type="text"
            required
            value={data.name}
            onChange={handleChange('name')}
            placeholder="Voornaam Achternaam"
            className={inputBase}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="company" className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
            Bedrijf
          </label>
          <input
            id="company"
            type="text"
            value={data.company}
            onChange={handleChange('company')}
            placeholder="Bedrijfsnaam"
            className={inputBase}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="email" className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={handleChange('email')}
            placeholder="naam@bedrijf.nl"
            className={inputBase}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
            Telefoon
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange('phone')}
            placeholder="+31 6 ..."
            className={inputBase}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block font-body text-xs font-600 text-lv-text-subtle uppercase tracking-wider mb-2">
          Waar zou AI voor jullie het meeste opleveren? *
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={data.message}
          onChange={handleChange('message')}
          placeholder="Een paar regels over jullie grootste pijnpunt, sector, of concrete vraag."
          className={`${inputBase} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-accent text-lv-ink font-display font-700 text-base rounded-lg hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Versturen...
          </>
        ) : (
          <>
            Verstuur bericht
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      <p className="font-body text-xs text-lv-text-subtle mt-4 leading-relaxed">
        Geen verkooppraatje. We reageren binnen één werkdag. Voor spoed:{' '}
        <a href="tel:+31625471528" className="text-lv-accent hover:underline">
          +31 6 25 47 15 28
        </a>.
      </p>
    </form>
  );
};

export default ContactForm;
