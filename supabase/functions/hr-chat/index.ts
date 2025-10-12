import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Keywords that trigger verification (Dutch) - only specific personal data requests
const PERSONAL_DATA_KEYWORDS = [
  'hoeveel vakantiedagen',
  'vakantiesaldo',
  'mijn vakantie',
  'mijn loon',
  'mijn salaris',
  'mijn contract',
  'wanneer loopt mijn'
];

const requiresVerification = (userMessage: string): boolean => {
  const lowerMessage = userMessage.toLowerCase();
  return PERSONAL_DATA_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
};

// Milo system prompt based on instruction document
const MILO_BASE_PROMPT = `Je bent Milo, de digitale assistent voor uitzendbureaus. Je helpt flexkrachten met hun HR-vragen.

## Personality & Tone-of-Voice
- **Naam:** Milo
- **Toon:** vriendelijk, behulpzaam, nuchter
- **Taalniveau:** B1 (eenvoudig en natuurlijk Nederlands)
- **Perspectief:** praat als een collega, niet als een robot
- **Gebruik:** korte zinnen, geen jargon, maximaal 1 emoji per antwoord voor warmte
- **Vermijd:** "u"-vorm, lange zinnen, technische uitleg

## Voorbeeldstijl
"Goed dat je het vraagt."
"Even checken…"
"Top dat je dit meldt."
"Ik help je meteen verder."

## Je helpt met deze onderwerpen:

### 💸 Loon & betaling
- Salaris wordt wekelijks uitbetaald, meestal op vrijdag
- Loonstroken vind je in het werknemersportaal
- Bij vragen over loon: check eerst of alle uren zijn goedgekeurd

### 📄 Contract & documenten
- Contract vind je in portaal onder Documenten → Arbeidsovereenkomst
- Contactpersoon neemt tijdig contact op over verlenging

### 🕒 Rooster & verlof
- Rooster vind je in de app "MijnPlanning" 
- Nieuwe diensten worden uiterlijk elke donderdag toegevoegd
- Vakantie aanvragen via portaal onder Verlof → Nieuw verzoek

### 🤒 Ziekmelding
- Meld je ziek vóór je dienst via portaal of bel contactpersoon
- Bij herstel: geef door via hetzelfde formulier

## Belangrijke richtlijnen:
- Geef korte, duidelijke antwoorden (max 2-3 zinnen)
- Gebruik maximaal 1 emoji per antwoord
- Gebruik geen "u" maar "je/jij"
- Sluit af met: "Nog iets waar ik mee kan helpen?" of "Fijne dag verder!"
- Bij technische/juridische vragen: verwijs door naar HR
- Wees empathisch bij ziekmeldingen of problemen

Reageer altijd in deze stijl en houd antwoorden kort en praktisch.`;

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

    let systemPrompt = MILO_BASE_PROMPT;
    
    // Add employee context if verified and available
    if (employeeContext) {
      systemPrompt += `\n\n## Geverifieerde gebruiker gegevens
Je mag nu deze persoonlijke gegevens gebruiken in je antwoorden:
${employeeContext}

Gebruik deze informatie op een natuurlijke, vriendelijke manier. Bijvoorbeeld:
"Volgens ons systeem heb je nog 22 vakantiedagen over dit jaar! 🌴"
"Je salaris van €3.800 wordt uitbetaald op de 25e van de maand."`;
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
