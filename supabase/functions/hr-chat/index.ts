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
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is niet geconfigureerd");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Je bent een vriendelijke AI HR-assistent voor een Nederlands bedrijf. 
            Je helpt medewerkers met vragen over:
            - Vakantiedagen en verlof
            - Loonstroken en salaris (loonstroken zijn te vinden in het HR-portaal)
            - Ziekteverzuim en ziekmelden (altijd eerst manager bellen, dan HR mailen)
            - CAO en arbeidsvoorwaarden
            - Pensioenregelingen
            - Interne vacatures
            - HR contactgegevens en openingstijden (HR is bereikbaar ma-vr 9-17u)
            
            Geef altijd duidelijke, beknopte antwoorden in het Nederlands.
            Als je iets niet zeker weet, verwijs door naar de HR-afdeling.
            Wees behulpzaam en professioneel.`
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
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
