import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Keywords that indicate personal data requests
const PERSONAL_DATA_KEYWORDS = [
  'vakantiedagen', 'vakantie', 'verlof',
  'loon', 'salaris', 'betaling', 'loonstrook',
  'contract', 'arbeidsovereenkomst',
  'personeelsdossier', 'mijn gegevens',
  'hoeveel', 'wanneer krijg ik'
];

const requiresVerification = (userMessage: string): boolean => {
  const lowerMessage = userMessage.toLowerCase();
  return PERSONAL_DATA_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, verifiedEmail } = await req.json();
    console.log("Received messages:", messages);
    console.log("Verified email:", verifiedEmail);

    // Check if user message requires verification
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const needsVerification = requiresVerification(lastUserMessage);

    if (needsVerification && !verifiedEmail) {
      return new Response(
        JSON.stringify({ 
          message: "🔐 Voor je veiligheid moet je eerst je identiteit verifiëren om persoonlijke HR-gegevens in te zien. Wat is je email adres?",
          requiresVerification: true
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // If verified and asking for personal data, fetch from database
    let employeeContext = "";
    if (needsVerification && verifiedEmail) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      const { data: employeeData, error } = await supabase
        .from('employee_data')
        .select('*')
        .eq('email', verifiedEmail)
        .maybeSingle();

      if (employeeData && !error) {
        employeeContext = `
        
GEVERIFIEERDE MEDEWERKER DATA voor ${employeeData.name} (${verifiedEmail}):
- Naam: ${employeeData.name}
- Resterende vakantiedagen: ${employeeData.vacation_days} dagen
- Salaris: €${employeeData.salary_amount}
- Betalingsdatum: ${employeeData.salary_payment_date}
- Telefoonnummer: ${employeeData.phone}

Gebruik ALLEEN deze echte data als de vraag hierover gaat. Wees SPECIFIEK en noem de exacte cijfers.`;
      }
    }

    const systemPrompt = `Je bent een slimme AI HR-assistent die medewerkers helpt met hun HR-vragen.${employeeContext}

BELANGRIJKE INSTRUCTIES:
- Geef KORTE antwoorden van maximaal 2-3 zinnen
- Wees DIRECT en TO THE POINT
- Gebruik GEEN opsommingen tenzij strikt noodzakelijk
- Blijf vriendelijk maar zakelijk
- Als je niet zeker weet van het antwoord, verwijs direct naar de HR-afdeling

STANDAARD ANTWOORDEN OP VEELGESTELDE VRAGEN:

1. "Hoeveel vakantiedagen heb ik nog?"
   → "Volgens ons systeem heb je nog 15 vakantiedagen over dit jaar. Check je persoonlijke dashboard voor het exacte overzicht of neem contact op met HR."

2. "Wanneer krijg ik mijn loon?"
   → "Je salaris wordt altijd op de 25e van de maand uitbetaald. Als de 25e in het weekend valt, krijg je het de vrijdag ervoor."

3. "Hoe moet ik mij ziek melden?"
   → "Bel voor 10:00 uur naar je leidinggevende en stuur een kopie-email naar hr@bedrijf.nl. Bij langdurige ziekte neemt HR binnen 2 werkdagen contact met je op."

4. "Wat zijn de HR openingstijden?"
   → "De HR-afdeling is bereikbaar van maandag t/m vrijdag tussen 09:00 en 17:00 uur. Voor spoedgevallen kun je altijd terecht bij je direct leidinggevende."

5. "Waar kan ik mijn loonstrook vinden?"
   → "Log in op het medewerkersportaal via portal.bedrijf.nl en ga naar 'Mijn Documenten' > 'Loonstroken'. Daar vind je alle loonstroken van de afgelopen 5 jaar."

Voor andere vragen over vakantiedagen, verlof, salaris, ziekteverzuim, pensioen, interne vacatures, CAO-informatie en bedrijfsregels: geef een kort, duidelijk antwoord van maximaal 2-3 zinnen.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limiet bereikt. Probeer het later opnieuw." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Betalingsfout. Voeg credits toe aan je workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway fout");
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "Sorry, ik kon geen antwoord genereren.";

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in hr-chat function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Er ging iets mis" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
