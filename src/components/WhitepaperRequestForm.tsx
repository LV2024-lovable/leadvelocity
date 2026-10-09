import React, { useState } from 'react';
import { ArrowUpRight, Check, Loader2, FileText } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';
import { triggerAutoRespond, AssetType } from '../lib/autoRespond';

type FormData = {
  name: string;
  company: string;
  email: string;
  role: string;
};

const initialData: FormData = {
  name: '',
  company: '',
  email: '',
  role: '',
};

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Props = {
  whitepaperTitle: string;
  whitepaperSlug: string;
  onSuccess?: () => void;
};

const WhitepaperRequestForm: React.FC<Props> = ({ whitepaperTitle, whitepaperSlug, onSuccess }) => {
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!data.name.trim() || !data.email.trim()) {
      toast.error('Vul naam en e-mail in om de whitepaper te ontvangen.');
      return;
    }

    if (!isValidEmail(data.email)) {
      toast.error('Dat lijkt geen geldig e-mailadres.');
      return;
    }

    setSubmitting(true);

    try {
      const messageBody = [
        `WHITEPAPER AANVRAAG — ${whitepaperTitle}`,
        '',
        `Naam: ${data.name}`,
        `Bedrijf: ${data.company || '(niet ingevuld)'}`,
        `Rol: ${data.role || '(niet ingevuld)'}`,
        `E-mail: ${data.email}`,
        '',
        `Whitepaper slug: ${whitepaperSlug}`,
        `Aangevraagd op: ${new Date().toISOString()}`,
      ].join('\n');

      const { error } = await supabase.functions.invoke('email-notify', {
        body: {
          name: data.name.trim(),
          company: data.company.trim(),
          email: data.email.trim(),
          phone: '',
          message: messageBody,
        },
      });

      if (error) throw error;

      // Map whitepaperSlug to AssetType
      const slugToAsset: Record<string, AssetType> = {
        'groothandel-2026': 'whitepaper_groothandel',
        'maakindustrie-2026': 'whitepaper_maakindustrie',
        'transport-2026': 'whitepaper_transport',
      };
      const assetType = slugToAsset[whitepaperSlug] ?? 'whitepaper_groothandel';

      triggerAutoRespond({
        name: data.name.trim(),
        email: data.email.trim(),
        assetType,
      });

      setSubmitted(true);
      toast.success('Whitepaper onderweg! Je ontvangt hem binnen enkele minuten.');
      onSuccess?.();
    } catch (err) {
      console.error('Whitepaper request error:', err);
      toast.error('Er ging iets mis. Probeer het nog eens, of mail direct naar info@leadvelocity.nl.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 md:p-10 rounded-2xl bg-lv-lime/[0.06] border border-lv-lime-ink/30 text-center">
        <div className="w-14 h-14 rounded-full bg-lv-lime-soft border border-lv-lime-ink/30 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-lv-lime-ink" />
        </div>
        <h3 className="font-display text-2xl font-700 text-lv-ink mb-3">
          De whitepaper is onderweg.
        </h3>
        <p className="font-body text-base text-lv-body leading-relaxed max-w-md mx-auto mb-5">
          Binnen enkele minuten vind je de whitepaper in je inbox ({data.email}).
        </p>
        <p className="font-body text-sm text-lv-faint leading-relaxed max-w-md mx-auto">
          Niets ontvangen? Check je spam-folder, of mail{' '}
          <a href="mailto:info@leadvelocity.nl" className="text-lv-lime-ink hover:underline">
            info@leadvelocity.nl
          </a>
          .
        </p>
      </div>
    );
  }

  const inputBase =
    'w-full px-4 py-3 rounded-lg border bg-lv-paper border-lv-line text-lv-ink placeholder:text-lv-faint font-body text-base focus:outline-none focus:border-lv-lime-ink/50 focus:ring-1 focus:ring-lv-lime-ink/20 transition-colors';

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wp-name" className="block font-body text-xs font-600 text-lv-faint uppercase tracking-wider mb-2">
            Naam *
          </label>
          <input
            id="wp-name"
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
          <label htmlFor="wp-email" className="block font-body text-xs font-600 text-lv-faint uppercase tracking-wider mb-2">
            E-mail *
          </label>
          <input
            id="wp-email"
            type="email"
            required
            value={data.email}
            onChange={handleChange('email')}
            placeholder="naam@bedrijf.nl"
            className={inputBase}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="wp-company" className="block font-body text-xs font-600 text-lv-faint uppercase tracking-wider mb-2">
            Bedrijf
          </label>
          <input
            id="wp-company"
            type="text"
            value={data.company}
            onChange={handleChange('company')}
            placeholder="Bedrijfsnaam"
            className={inputBase}
            autoComplete="organization"
          />
        </div>
        <div>
          <label htmlFor="wp-role" className="block font-body text-xs font-600 text-lv-faint uppercase tracking-wider mb-2">
            Functie
          </label>
          <input
            id="wp-role"
            type="text"
            value={data.role}
            onChange={handleChange('role')}
            placeholder="bv. COO, Commercieel Directeur"
            className={inputBase}
            autoComplete="organization-title"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-lv-lime text-lv-ink font-display font-700 text-base rounded-lg transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Bezig met versturen...
          </>
        ) : (
          <>
            <FileText className="w-5 h-5" />
            Stuur mij de whitepaper
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>

      <p className="font-body text-xs text-lv-faint mt-4 leading-relaxed">
        Geen spam, geen verkoop-trechter. We sturen je de whitepaper en houden contact op een menselijk tempo.
      </p>
    </form>
  );
};

export default WhitepaperRequestForm;
