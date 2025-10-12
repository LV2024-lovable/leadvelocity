import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Ongeldig email adres' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate unique token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes

    // Store verification session
    const { error: dbError } = await supabase
      .from('verification_sessions')
      .insert({
        email,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Kon verificatie niet opslaan');
    }

    // Send magic link via Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const verificationUrl = `https://leadvelocity.nl/ai?verify=${token}`;

    const { error: emailError } = await resend.emails.send({
      from: 'Milo HR Assistant <onboarding@resend.dev>',
      to: [email],
      subject: '🔐 Verificatie voor je HR data',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #25D366;">Verificatie voor je HR-gegevens</h2>
          <p>Je hebt zojuist gevraagd om je persoonlijke HR-gegevens in te zien.</p>
          <p>Klik op onderstaande knop om je identiteit te verifiëren:</p>
          <div style="margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #25D366; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
              ✅ Verifieer mijn identiteit
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">Deze link is 60 minuten geldig.</p>
          <p style="color: #666; font-size: 14px;">Als je deze verificatie niet hebt aangevraagd, kun je deze email negeren.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">Milo HR Assistant - Automatische HR-communicatie</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('Email error:', emailError);
      throw new Error('Kon verificatie email niet versturen');
    }

    console.log('Verification email sent to:', email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Verificatie email is verstuurd! Check je inbox.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in send-verification:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Er ging iets mis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});