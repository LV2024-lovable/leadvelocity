// Werkstroomcheck-aanvraag (handover §13).
// Flow: valideer → honeypot → insert (dedupe op request_id) → mail via Resend → 200.
// Deploy (alleen met akkoord): supabase functions deploy werkstroomcheck
// Env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "npm:zod@3.23.8";
import { makeSchema } from "./schema.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const schema = makeSchema(z);
const esc = (s: unknown) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { ok: false });

  let raw: unknown;
  try { raw = await req.json(); } catch { return json(400, { ok: false, errors: [{ path: [], message: "Ongeldige JSON" }] }); }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) return json(400, { ok: false, errors: parsed.error.issues.map((i: { path: unknown; message: string }) => ({ path: i.path, message: i.message })) });
  const v = parsed.data;

  if (v.website) return json(200, { ok: true }); // honeypot: stil negeren

  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) { console.error("Supabase env ontbreekt"); return json(500, { ok: false }); }
  const db = createClient(url, key);

  const row = {
    request_id: v.request_id, name: v.name, company: v.company, email: v.email,
    category: v.category ?? null, process: v.process ?? null, work: v.work,
    phone: v.phone ?? null, contact_preference: v.contact_preference,
    frequency: v.frequency ?? null, software: v.software ?? null, context: v.context,
  };
  const { error: insertError } = await db.from("werkstroomcheck_requests").insert(row);
  if (insertError) {
    if (insertError.code === "23505") return json(200, { ok: true, duplicate: true }); // unique request_id
    console.error("Insert mislukt", insertError.message);
    return json(500, { ok: false });
  }

  let notify = "sent";
  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) throw new Error("RESEND_API_KEY ontbreekt");
    const resend = new Resend(apiKey);
    const lines: [string, unknown][] = [
      ["Naam", v.name], ["Bedrijf", v.company], ["E-mail", v.email], ["Telefoon", v.phone],
      ["Contactvoorkeur", v.contact_preference], ["Categorie", v.category], ["Proces", v.process],
      ["Werk dat terugkomt", v.work], ["Frequentie", v.frequency], ["Software", v.software],
      ["Context", JSON.stringify(v.context)], ["Request-ID", v.request_id],
    ];
    const { error: sendError } = await resend.emails.send({
      from: "Lead Velocity <info@leadvelocity.nl>",
      to: ["info@leadvelocity.nl"],
      reply_to: v.email,
      subject: `Werkstroomcheck: ${v.company.replace(/[\r\n]+/g, " ")}`,
      html: `<h2>Nieuwe aanvraag werkstroomcheck</h2><table>${lines.filter(([, x]) => x).map(([k, x]) => `<tr><td><b>${esc(k)}</b></td><td>${esc(x)}</td></tr>`).join("")}</table>`,
    });
    if (sendError) throw new Error(sendError.message);
  } catch (e) {
    notify = "failed";
    console.error("Notificatie mislukt", (e as Error).message);
  }
  await db.from("werkstroomcheck_requests").update({ notify_status: notify }).eq("request_id", v.request_id);

  return json(200, { ok: true });
});
