// Centralized helper to trigger the auto-respond Edge Function.
// Fire-and-forget: the submission already succeeded (email-notify fired to Bart),
// so if auto-respond fails we just log — don't block the user.

import { supabase } from '../integrations/supabase/client';

export type AssetType =
  | 'tips_tricks'
  | 'newsletter'
  | 'whitepaper_groothandel'
  | 'whitepaper_maakindustrie'
  | 'whitepaper_transport'
  | 'prompts_groothandel'
  | 'prompts_maakindustrie'
  | 'prompts_transport'
  | 'ai_readiness_assessment'
  | 'contact';

type AutoRespondInput = {
  name: string;
  email: string;
  assetType: AssetType;
  extra?: Record<string, string>;
};

export const triggerAutoRespond = async (input: AutoRespondInput) => {
  try {
    const { error } = await supabase.functions.invoke('auto-respond-asset', {
      body: input,
    });
    if (error) {
      console.warn('Auto-respond failed (non-blocking):', error);
    }
  } catch (err) {
    console.warn('Auto-respond threw (non-blocking):', err);
  }
};
