// Auto-respond Edge Function
// Sends an asset-specific welcome email to the user who just submitted a form.
// Called in parallel with email-notify (which notifies Bart).
//
// Deploy with: supabase functions deploy auto-respond-asset
// Required env: RESEND_API_KEY (already set for email-notify)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type AssetType =
  | "tips_tricks"
  | "newsletter"
  | "whitepaper_groothandel"
  | "whitepaper_maakindustrie"
  | "whitepaper_transport"
  | "prompts_groothandel"
  | "prompts_maakindustrie"
  | "prompts_transport"
  | "ai_readiness_assessment"
  | "contact";

const BASE_URL = "https://www.leadvelocity.nl";

type TemplateContext = {
  name: string;
  email: string;
  extra?: Record<string, string>;
};

// ============================================================
// EMAIL TEMPLATES PER ASSET
// ============================================================

const templates: Record<
  AssetType,
  (ctx: TemplateContext) => { subject: string; html: string; text: string }
> = {
  tips_tricks: ({ name }) => ({
    subject: "Jouw 20 AI-tips zijn binnen",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is je PDF: <a href="${BASE_URL}/downloads/tips-en-tricks-2026.pdf">20 AI-tips voor Nederlandse organisaties</a>.</p>
      <p>Vijf hoofdstukken, 20 tips, 25 pagina's. Lees 'm rustig door — er staan er zeker een paar tussen die je vandaag al kan toepassen.</p>
      <p><strong>Wat doe je hierna?</strong></p>
      <ul>
        <li>Wil je zien hoe jouw organisatie scoort op AI-readiness? <a href="${BASE_URL}/bronnen/ai-readiness-assessment">Doe de Assessment</a> (5 min, persoonlijk rapport).</li>
        <li>Dieper in jouw sector duiken? Bekijk de <a href="${BASE_URL}/bronnen">whitepapers per sector</a>.</li>
      </ul>
      <p>Veel leesplezier.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Hier is je PDF met 20 AI-tips:
${BASE_URL}/downloads/tips-en-tricks-2026.pdf

Wat doe je hierna?
- Doe de AI-Readiness Assessment: ${BASE_URL}/bronnen/ai-readiness-assessment
- Bekijk sector-whitepapers: ${BASE_URL}/bronnen

Veel leesplezier.

— Bart
Leadvelocity`,
  }),

  newsletter: ({ name }) => ({
    subject: "Welkom bij de maandelijkse AI-briefing",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Welkom. Eén keer per maand ontvang je een doordachte analyse over AI in de Nederlandse industrie — met sector-benchmarks, use-cases en eerlijke observaties.</p>
      <p>Als welkom alvast dit: onze <a href="${BASE_URL}/downloads/tips-en-tricks-2026.pdf">20 AI-tips-PDF</a> — 25 pagina's praktische wijsheid uit onze dagelijkse praktijk.</p>
      <p>De eerste officiële editie komt op de eerste maandag van volgende maand. Tot dan.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Welkom bij de Leadvelocity AI-briefing. Eén keer per maand, doordachte analyses.

Als welkom: de 20 AI-tips PDF ${BASE_URL}/downloads/tips-en-tricks-2026.pdf

Eerste editie komt eerste maandag van volgende maand.

— Bart
Leadvelocity`,
  }),

  whitepaper_groothandel: ({ name }) => ({
    subject: "Jouw whitepaper: AI in NL Technische Groothandel",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is de whitepaper: <a href="${BASE_URL}/downloads/whitepaper-groothandel-2026.pdf">AI in de Nederlandse Technische Groothandel 2026</a> (25 pagina's).</p>
      <p>Wat er in staat:</p>
      <ul>
        <li>15 AI-use-cases met ROI-ranges</li>
        <li>3 scenario-cases (€10M / €30M / €75M groothandel)</li>
        <li>12-maanden implementatie-roadmap</li>
        <li>WBSO-subsidiegids voor AI-projecten 2026</li>
      </ul>
      <p><strong>Meest gestelde vervolgvragen:</strong></p>
      <p>Veel lezers vragen zich na deze whitepaper af: "Waar staan wij nu, en wat past bij onze specifieke situatie?" Daar hebben we iets voor gebouwd: de <a href="${BASE_URL}/bronnen/ai-readiness-assessment">AI-Readiness Assessment</a>. Duurt 5 minuten, geeft een persoonlijk rapport met aanbevolen vervolgstappen.</p>
      <p>Of plan direct een gesprek als je concreet wilt sparren: <a href="${BASE_URL}/#contact">leadvelocity.nl/#contact</a></p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Whitepaper: ${BASE_URL}/downloads/whitepaper-groothandel-2026.pdf

Inhoud:
- 15 AI-use-cases met ROI-ranges
- 3 scenario-cases
- 12-maanden roadmap
- WBSO-subsidiegids

Vervolg: doe de AI-Readiness Assessment: ${BASE_URL}/bronnen/ai-readiness-assessment
Of plan gesprek: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  whitepaper_maakindustrie: ({ name }) => ({
    subject: "Jouw whitepaper: AI voor NL Maakindustrie",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is de whitepaper: <a href="${BASE_URL}/downloads/whitepaper-maakindustrie-2026.pdf">AI voor Nederlandse Maakindustrie 2026</a> (25 pagina's).</p>
      <p>Wat er in staat:</p>
      <ul>
        <li>12 AI-use-cases specifiek voor NL-maakbedrijven</li>
        <li>OEE-roadmap: van 60% naar 78%</li>
        <li>Predictive maintenance, shop-floor copilot, CSRD-automation</li>
        <li>Scenario's voor €15M / €35M / €80M maakbedrijven</li>
      </ul>
      <p><strong>Vervolgstap:</strong> doe de <a href="${BASE_URL}/bronnen/ai-readiness-assessment">AI-Readiness Assessment</a> (5 min, persoonlijk rapport) of <a href="${BASE_URL}/#contact">plan een gesprek</a>.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Whitepaper: ${BASE_URL}/downloads/whitepaper-maakindustrie-2026.pdf

Vervolg:
- AI-Readiness Assessment: ${BASE_URL}/bronnen/ai-readiness-assessment
- Gesprek plannen: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  whitepaper_transport: ({ name }) => ({
    subject: "Jouw whitepaper: AI voor NL Transport & Logistiek",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is de whitepaper: <a href="${BASE_URL}/downloads/whitepaper-transport-2026.pdf">AI voor Nederlandse Transport & Logistiek 2026</a> (25 pagina's).</p>
      <p>Wat er in staat:</p>
      <ul>
        <li>Vrachtwagenheffing 1 juli 2026: impact-analyse per vlootgrootte</li>
        <li>15 AI-use-cases voor NL-transport</li>
        <li>CSRD scope-3 automation blueprint</li>
        <li>Scenario's voor pallet / FTL / 3PL</li>
      </ul>
      <p><strong>Vervolgstap:</strong> doe de <a href="${BASE_URL}/bronnen/ai-readiness-assessment">AI-Readiness Assessment</a> of <a href="${BASE_URL}/#contact">plan een gesprek</a>.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Whitepaper: ${BASE_URL}/downloads/whitepaper-transport-2026.pdf

Vervolg:
- AI-Readiness Assessment: ${BASE_URL}/bronnen/ai-readiness-assessment
- Gesprek: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  prompts_groothandel: ({ name }) => ({
    subject: "Jouw Prompt & Template Pack — Groothandel",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is je pack: <a href="${BASE_URL}/downloads/prompts-groothandel-2026.pdf">Prompt & Template Pack — Technische Groothandel</a>.</p>
      <p>12 getoetste AI-prompts voor binnendienst, sales en inkoop. Plus 8 templates (Excel/Word) voor offerte, CRM en supplier-scoring.</p>
      <p><strong>Tip:</strong> begin met prompt #1 (RFQ-interpretatie). Dat is de snelste win voor binnendienst-teams die dagelijks klant-aanvragen verwerken.</p>
      <p>Wil je dit ingebouwd zien als een echte AI-assistent in Outlook/Teams? <a href="${BASE_URL}/#contact">Plan een gesprek</a> — dan bouwen we 'm specifiek voor jullie productcatalogus.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Pack: ${BASE_URL}/downloads/prompts-groothandel-2026.pdf

12 prompts + 8 templates voor binnendienst, sales, inkoop.

Tip: begin met prompt #1 (RFQ-interpretatie).

Wil je dit als AI-assistent ingebouwd? Plan gesprek: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  prompts_maakindustrie: ({ name }) => ({
    subject: "Jouw Prompt & Template Pack — Maakindustrie",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is je pack: <a href="${BASE_URL}/downloads/prompts-maakindustrie-2026.pdf">Prompt & Template Pack — Maakindustrie</a>.</p>
      <p>12 prompts + 7 templates voor werkvoorbereiding, kwaliteit, engineering en shop-floor.</p>
      <p><strong>Tip:</strong> begin met de Shop-Floor Copilot-prompt. Kennis van senior-operators wordt doorzoekbaar voor junioren — onmiddellijke onboarding-versnelling.</p>
      <p>Wil je dit gebouwd zien als een AI-assistent op jullie shop-floor? <a href="${BASE_URL}/#contact">Plan een gesprek</a>.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Pack: ${BASE_URL}/downloads/prompts-maakindustrie-2026.pdf

12 prompts + 7 templates.

Gesprek: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  prompts_transport: ({ name }) => ({
    subject: "Jouw Prompt & Template Pack — Transport",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is je pack: <a href="${BASE_URL}/downloads/prompts-transport-2026.pdf">Prompt & Template Pack — Transport & Logistiek</a>.</p>
      <p>10 prompts + 7 templates voor planners, customer service en fleet management.</p>
      <p><strong>Tip:</strong> begin met de Planner Copilot-prompt en de CSRD-rapport-prompt — grote verladers vragen dat rapport nu al, dus directe waarde.</p>
      <p>Wil je de CSRD-automation ingebouwd? <a href="${BASE_URL}/#contact">Plan een gesprek</a>.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Pack: ${BASE_URL}/downloads/prompts-transport-2026.pdf

10 prompts + 7 templates.

Gesprek: ${BASE_URL}/#contact

— Bart
Leadvelocity`,
  }),

  ai_readiness_assessment: ({ name, extra }) => ({
    subject: `Jouw AI-Readiness Score: ${extra?.score ?? "?"}% — ${extra?.level ?? ""}`,
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Hier is je AI-Readiness rapport, zoals beloofd.</p>
      <p><strong>Score: ${esc(extra?.score ?? "")}% — ${esc(extra?.level ?? "")}</strong></p>
      <p>Je kan het volledige rapport altijd terugzien op <a href="${BASE_URL}/bronnen/ai-readiness-assessment">leadvelocity.nl/bronnen/ai-readiness-assessment</a>.</p>
      <p><strong>Vervolgstappen die bij jouw score passen:</strong></p>
      <ul>
        <li>Begin met de <a href="${BASE_URL}/downloads/tips-en-tricks-2026.pdf">20 AI-tips-PDF</a> als je nog zoekt waar je kan starten.</li>
        <li>Diepgaander in jouw sector duiken? Zie de <a href="${BASE_URL}/bronnen">sector-whitepapers</a>.</li>
        <li>Klaar voor een gesprek? <a href="${BASE_URL}/#contact">Plan een 30-min kennismaking</a> — we luisteren meer dan we praten.</li>
      </ul>
      <p>Over 3 dagen stuur ik je 3 concrete vervolgstappen specifiek op basis van je score.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

AI-Readiness Score: ${extra?.score ?? "?"}% — ${extra?.level ?? ""}

Terugkijken: ${BASE_URL}/bronnen/ai-readiness-assessment

Volgende stappen:
- 20 AI-tips PDF: ${BASE_URL}/downloads/tips-en-tricks-2026.pdf
- Sector-whitepapers: ${BASE_URL}/bronnen
- Gesprek plannen: ${BASE_URL}/#contact

Over 3 dagen stuur ik 3 concrete vervolgstappen op basis van je score.

— Bart
Leadvelocity`,
  }),

  contact: ({ name }) => ({
    subject: "Bedankt voor je bericht — ik reageer binnen 1 werkdag",
    html: wrap(`
      <p>Hi ${esc(name)},</p>
      <p>Je bericht is binnen. Ik reageer binnen één werkdag persoonlijk.</p>
      <p>Intussen, voor de niet-dringende nieuwsgierigheid:</p>
      <ul>
        <li><a href="${BASE_URL}/bronnen/ai-readiness-assessment">Doe de AI-Readiness Assessment</a> (5 min, persoonlijk rapport)</li>
        <li><a href="${BASE_URL}/downloads/tips-en-tricks-2026.pdf">Download de 20 AI-tips-PDF</a></li>
      </ul>
      <p>Tot snel.</p>
      <p>— Bart<br />Leadvelocity</p>
    `),
    text: `Hi ${name},

Je bericht is binnen. Ik reageer binnen één werkdag.

Intussen:
- AI-Readiness Assessment: ${BASE_URL}/bronnen/ai-readiness-assessment
- 20 AI-tips PDF: ${BASE_URL}/downloads/tips-en-tricks-2026.pdf

Tot snel.

— Bart
Leadvelocity`,
  }),
};

// ============================================================
// HELPERS
// ============================================================

function esc(s: string | undefined): string {
  if (!s) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrap(content: string): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8" /></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; line-height: 1.6;">
  <div style="margin-bottom: 30px;">
    <span style="font-size: 20px; font-weight: 700; color: #1a1a1a;">Lead</span><span style="font-size: 20px; font-weight: 700; color: #7BA512;">velocity</span>
  </div>
  <div style="font-size: 16px; color: #333;">
    ${content}
  </div>
  <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;" />
  <div style="font-size: 12px; color: #999; line-height: 1.6;">
    <p>Leadvelocity · Jouw AI operations partner · <a href="https://www.leadvelocity.nl" style="color: #999;">leadvelocity.nl</a> · +31 6 25 47 15 28</p>
    <p>Je ontvangt deze e-mail omdat je op leadvelocity.nl iets hebt aangevraagd. <a href="mailto:info@leadvelocity.nl?subject=Uitschrijven" style="color: #999;">Uitschrijven</a> kan altijd door te reageren op deze mail.</p>
  </div>
</body>
</html>`;
}

// ============================================================
// MAIN HANDLER
// ============================================================

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        },
      );
    }

    const body = await req.json();
    const { name, email, assetType, extra } = body as {
      name: string;
      email: string;
      assetType: AssetType;
      extra?: Record<string, string>;
    };

    if (!email || !assetType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email, assetType" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const template = templates[assetType];
    if (!template) {
      return new Response(
        JSON.stringify({ error: `Unknown assetType: ${assetType}` }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        },
      );
    }

    const { subject, html, text } = template({
      name: name || "daar",
      email,
      extra,
    });

    const resend = new Resend(resendApiKey);
    const result = await resend.emails.send({
      from: "Leadvelocity <info@leadvelocity.nl>",
      to: [email],
      reply_to: "info@leadvelocity.nl",
      subject,
      html,
      text,
    });

    console.log(
      `Auto-response sent to ${email} for asset ${assetType}:`,
      result,
    );

    return new Response(
      JSON.stringify({ success: true, messageId: result.data?.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (err) {
    console.error("auto-respond-asset error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      },
    );
  }
});
