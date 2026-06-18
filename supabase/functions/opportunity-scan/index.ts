// AI-kansenscan light Edge Function.
// Flow: cache-check (per domein, 30 dagen) -> homepage-fetch -> Claude-call
// (claude-haiku-4-5) -> JSON-validatie (exact 3 kansen) -> opslag -> prospect-mail.
//
// Geeft SIGNAAL/richting — GEEN implementatie-blauwdruk, GEEN ROI-cijfers.
// De diepe analyse loopt via de betaalde AI Ops Audit (kannibalisatie-grens).
//
// Deploy: supabase functions deploy opportunity-scan
// Required env: ANTHROPIC_API_KEY (de gebruiker zet die later zelf).
// Optioneel: RESEND_API_KEY (rapport-mail; niet-blokkerend), SUPABASE_URL,
//            SUPABASE_SERVICE_ROLE_KEY (cache + opslag).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE_URL = "https://www.leadvelocity.nl";

// De 5 Oplossingen-slugs — elke kans MOET aan exact 1 hiervan gekoppeld zijn.
const VALID_SLUGS = [
  "ai-agenten",
  "chatbots",
  "workflows",
  "dashboards",
  "voice-agents",
] as const;

const VALID_LABELS = ["laaghangend-fruit", "middellange-termijn"] as const;

type Opportunity = {
  title: string;
  pain: string;
  whatAiDoes: string;
  oplossingSlug: (typeof VALID_SLUGS)[number];
  label: (typeof VALID_LABELS)[number];
};

// Korte sector-context (toon afgeleid uit oplossingen.ts sectorExamples).
const sectorBlurbs: Record<string, string> = {
  groothandel:
    "Technische groothandel (MRO, industriële onderdelen, installatie). Typische pijn: RFQ's en offertes die handmatig door binnendienst lopen, productkennis verspreid over systemen en collega's, marge-zicht pas in maandrapporten.",
  maakindustrie:
    "Maakindustrie (metaalbewerking, machinebouw, precisiemechatronica). Typische pijn: werkvoorbereiding en order-invoer kosten veel handwerk, machinedata zonder live OEE-zicht, kennis van senior-operators slecht overdraagbaar.",
  transport:
    "Transport & logistiek (pallet-distributie, FTL, 3PL, bulk, koel/vries). Typische pijn: planners die handmatig herplannen bij verstoringen, klantvragen over ETA/status die tijd kosten, beladingsgraad en KPI's zonder live zicht.",
  overig:
    "MKB-bedrijf in Nederland. Typische pijn: terugkerend handwerk in offertes, order- en documentverwerking, klantvragen die het team tijd kosten, en versnipperde data zonder live operationeel zicht.",
};

// Map een binnenkomende sector-waarde (label of slug) naar de juiste blurb.
function resolveSectorBlurb(sector: string): string {
  const s = (sector || "").toLowerCase();
  if (s.includes("groothandel")) return sectorBlurbs.groothandel;
  if (s.includes("maak")) return sectorBlurbs.maakindustrie;
  if (s.includes("transport") || s.includes("logistiek")) {
    return sectorBlurbs.transport;
  }
  return sectorBlurbs.overig;
}

// Normaliseer websiteUrl -> kale host (https://www.eriks.nl/over -> eriks.nl).
function normalizeDomain(websiteUrl: string, companyName: string): string {
  const raw = (websiteUrl || "").trim().toLowerCase();
  if (raw) {
    try {
      const withProto = raw.startsWith("http") ? raw : `https://${raw}`;
      const host = new URL(withProto).hostname.replace(/^www\./, "");
      if (host) return host;
    } catch {
      // val terug op companyName
    }
  }
  return (companyName || "scan").toLowerCase().replace(/\s+/g, "");
}

// Strip HTML naar platte tekst, cap op ~8000 chars.
function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);
}

function esc(s: string | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(companyName: string, opps: Opportunity[]): string {
  const cards = opps
    .map(
      (o, i) => `
      <div style="padding:18px 20px;border-radius:12px;background:#f5f7f0;border:1px solid #c8ff0033;margin:0 0 16px">
        <div style="font-size:13px;font-weight:600;color:#6a9000;margin-bottom:4px">Kans ${i + 1}</div>
        <div style="font-size:17px;font-weight:700;color:#1a1a1a">${esc(o.title)}</div>
        <p style="margin:8px 0 4px"><strong>De pijn:</strong> ${esc(o.pain)}</p>
        <p style="margin:4px 0"><strong>Wat een AI-systeem doet:</strong> ${esc(o.whatAiDoes)}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#555">${o.label === "laaghangend-fruit" ? "Laaghangend fruit" : "Middellange termijn"}</p>
      </div>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; line-height: 1.6;">
  <div style="margin-bottom: 30px;">
    <span style="font-size: 20px; font-weight: 700; color: #1a1a1a;">Lead</span><span style="font-size: 20px; font-weight: 700; color: #7BA512;">velocity</span>
  </div>
  <div style="font-size: 16px; color: #333;">
    <p>Hi,</p>
    <p>Hier is jullie AI-kansenscan voor <strong>${esc(companyName)}</strong>. Wij hebben jullie website en sector bekeken en zien drie concrete richtingen waar AI verschil maakt.</p>
    ${cards}
    <div style="padding:18px 20px;border-radius:12px;background:#fff;border:1px solid #e3e3e3;margin:24px 0">
      <div style="font-size:16px;font-weight:700">Wat dit rapport niet is</div>
      <p style="margin:8px 0">Dit is een signaal, geen blauwdruk. Wij noemen bewust geen percentages, euro's of doorlooptijden — die hangen af van jullie data, systemen en processen. Voor de diepe analyse met prioritering en impact-inschatting is er de AI Ops Audit.</p>
      <p style="margin:8px 0">
        <a href="${BASE_URL}/ai-ops-audit" style="color:#6a9000;font-weight:600">Bekijk de AI Ops Audit</a>
        &nbsp;·&nbsp;
        <a href="${BASE_URL}/#contact" style="color:#6a9000;font-weight:600">Plan een 30-min kennismaking</a>
      </p>
    </div>
    <p>Wij denken graag met jullie mee over de eerste stap.</p>
    <p>— Team Leadvelocity</p>
  </div>
  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;" />
  <div style="font-size: 12px; color: #999; line-height: 1.6;">
    <p>Leadvelocity · Jouw AI operations partner · <a href="${BASE_URL}" style="color: #999;">leadvelocity.nl</a> · +31 6 25 47 15 28</p>
    <p>Je ontvangt deze e-mail omdat je op leadvelocity.nl een AI-kansenscan hebt aangevraagd. <a href="mailto:info@leadvelocity.nl?subject=Uitschrijven" style="color: #999;">Uitschrijven</a> kan altijd door te reageren op deze mail.</p>
  </div>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { companyName, email, websiteUrl, sector } = body as {
      companyName?: string;
      email?: string;
      websiteUrl?: string;
      sector?: string;
    };

    if (!companyName || !email) {
      return new Response(
        JSON.stringify({ error: "Bedrijfsnaam en e-mail zijn verplicht." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const domain = normalizeDomain(websiteUrl ?? "", companyName);

    // Graceful fail bij ontbrekende ANTHROPIC_API_KEY (LOCKED D-01).
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!anthropicKey) {
      console.error("ANTHROPIC_API_KEY ontbreekt — scan niet uitgevoerd.");
      return new Response(
        JSON.stringify({
          error:
            "AI-analyse is tijdelijk niet beschikbaar (ANTHROPIC_API_KEY ontbreekt).",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    // Supabase service-client voor cache + opslag.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase =
      supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;

    // Cache-check: recente scan op zelfde domein -> hergebruik, GEEN Claude-call.
    // (Mail bij cache-hit bewust overgeslagen om dubbele mails te voorkomen.)
    if (supabase) {
      const cutoff = new Date(
        Date.now() - 30 * 24 * 60 * 60 * 1000,
      ).toISOString();
      const { data: cached } = await supabase
        .from("opportunity_scans")
        .select("opportunities_json")
        .eq("domain", domain)
        .gt("created_at", cutoff)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cached?.opportunities_json) {
        return new Response(
          JSON.stringify({ opportunities: cached.opportunities_json, cached: true }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          },
        );
      }
    }

    // Homepage-fetch (LOCKED D-02): best-effort, 6s timeout, faalt zachtjes.
    let websiteText = "";
    if (websiteUrl && websiteUrl.trim()) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 6000);
        const raw = websiteUrl.trim();
        const fetchUrl = raw.startsWith("http") ? raw : `https://${raw}`;
        const res = await fetch(fetchUrl, { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          websiteText = htmlToText(await res.text());
        }
      } catch (e) {
        console.warn("Homepage-fetch mislukt, ga door zonder:", String(e));
      }
    }

    const sectorBlurb = resolveSectorBlurb(sector ?? "");

    const systemPrompt = `Je bent een nuchtere Nederlandse AI-operations-adviseur voor het MKB, schrijvend namens Leadvelocity.

Toon en regels (strikt):
- Nederlands, zakelijk, direct. Spreek in "wij/ons". Spreek de lezer aan met "jullie".
- Doelgroep is het MKB — gebruik NOOIT "50-250 FTE".
- GEEN hype-woorden ("digitale transformatie", "journey", "synergie", "revolutionair", "cutting-edge", "next-gen", "holistisch", "roadmap", "ontketenen", "unlocken").
- GEEN verzonnen cijfers: geen percentages, geen euro's, geen doorlooptijden, geen aantallen.
- Dit is een SIGNAAL/richting-scan, GEEN implementatie-blauwdruk en GEEN ROI-cijfers.

Opdracht: geef EXACT 3 concrete AI-kansen voor dit bedrijf. Antwoord UITSLUITEND met een geldige JSON-array (geen omliggende tekst, geen markdown).

Elk array-element is een object met precies deze velden:
- "title": korte titel van de kans (NL, max ~8 woorden)
- "pain": 1 zin over de operationele pijn die dit oplost
- "whatAiDoes": 1-2 zinnen over wat een AI-systeem concreet doet
- "oplossingSlug": EXACT EEN van: "ai-agenten", "chatbots", "workflows", "dashboards", "voice-agents"
- "label": EXACT EEN van: "laaghangend-fruit" of "middellange-termijn"

Kies de oplossingSlug die het beste past bij de kans. Varieer waar logisch. Geef geen toelichting buiten de JSON.`;

    const userMessage = `Bedrijf: ${companyName}
Sector-context: ${sectorBlurb}
${websiteText ? `\nWat we van hun website lazen (platte tekst, ingekort):\n${websiteText}` : "\n(Geen website-tekst beschikbaar — baseer je op bedrijfsnaam en sector-context.)"}

Geef nu de JSON-array met exact 3 AI-kansen.`;

    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!aiRes.ok) {
      const detail = await aiRes.text().catch(() => "");
      console.error("Anthropic API error:", aiRes.status, detail);
      return new Response(
        JSON.stringify({
          error: "AI-analyse is tijdelijk niet beschikbaar, probeer het later opnieuw.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    const aiJson = await aiRes.json();
    let text: string = aiJson?.content?.[0]?.text ?? "";
    // Strip eventuele markdown-fences.
    text = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();

    let opportunities: Opportunity[];
    try {
      opportunities = JSON.parse(text);
    } catch {
      console.error("JSON.parse mislukt op AI-antwoord:", text.slice(0, 500));
      return new Response(
        JSON.stringify({ error: "AI gaf een onverwacht antwoord, probeer het opnieuw." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    const isValid =
      Array.isArray(opportunities) &&
      opportunities.length === 3 &&
      opportunities.every(
        (o) =>
          o &&
          typeof o.title === "string" &&
          typeof o.pain === "string" &&
          typeof o.whatAiDoes === "string" &&
          (VALID_SLUGS as readonly string[]).includes(o.oplossingSlug) &&
          (VALID_LABELS as readonly string[]).includes(o.label),
      );

    if (!isValid) {
      console.error("Validatie mislukt op AI-antwoord:", JSON.stringify(opportunities).slice(0, 500));
      return new Response(
        JSON.stringify({ error: "AI gaf een onverwacht antwoord, probeer het opnieuw." }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 502,
        },
      );
    }

    // Opslag (best-effort).
    if (supabase) {
      const { error: insertErr } = await supabase
        .from("opportunity_scans")
        .insert({
          company_name: companyName,
          email,
          website_url: websiteUrl ?? null,
          sector: sector ?? null,
          domain,
          opportunities_json: opportunities,
        });
      if (insertErr) console.warn("Opslag mislukt (niet-blokkerend):", insertErr);
    }

    // Prospect-mail (niet-blokkerend).
    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "Leadvelocity <info@leadvelocity.nl>",
          to: [email],
          cc: ["info@leadvelocity.nl"],
          reply_to: "info@leadvelocity.nl",
          subject: `Jullie AI-kansenscan: 3 concrete kansen voor ${companyName}`,
          html: buildEmailHtml(companyName, opportunities),
        });
      } catch (mailErr) {
        console.warn("Prospect-mail mislukt (niet-blokkerend):", mailErr);
      }
    } else {
      console.warn("RESEND_API_KEY ontbreekt — prospect-mail overgeslagen.");
    }

    return new Response(
      JSON.stringify({ opportunities, cached: false }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    console.error("opportunity-scan error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Onbekende fout",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
