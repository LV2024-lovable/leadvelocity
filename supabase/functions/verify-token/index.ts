import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { token } = await req.json();
    
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token is verplicht' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find verification session
    const { data: session, error: fetchError } = await supabase
      .from('verification_sessions')
      .select('*')
      .eq('token', token)
      .maybeSingle();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      throw new Error('Kon verificatie niet ophalen');
    }

    if (!session) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Ongeldige of verlopen verificatie link' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if already verified
    if (session.verified) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          email: session.email,
          message: 'Je was al geverifieerd! Je kunt nu persoonsgebonden vragen stellen.' 
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if expired
    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Deze verificatie link is verlopen. Vraag een nieuwe aan.' 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark as verified
    const { error: updateError } = await supabase
      .from('verification_sessions')
      .update({ 
        verified: true, 
        verified_at: new Date().toISOString() 
      })
      .eq('token', token);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error('Kon verificatie niet updaten');
    }

    console.log('Token verified successfully for email:', session.email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        email: session.email,
        message: '✅ Verificatie geslaagd! Je kunt nu persoonsgebonden vragen stellen.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in verify-token:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Er ging iets mis' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});