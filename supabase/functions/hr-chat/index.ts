import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log("Received messages:", messages);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Je bent een slimme AI HR-assistent die medewerkers helpt met hun HR-vragen. 

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
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Te veel verzoeken. Probeer het later opnieuw." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Credits opgebruikt. Neem contact op met de beheerder." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response received");

    return new Response(
      JSON.stringify({ 
        message: data.choices[0].message.content 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in hr-chat function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Er is een fout opgetreden" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
