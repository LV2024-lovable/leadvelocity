// Run: npx tsx scripts/check-werkstroomcheck-schema.ts
import { z } from "zod";
import { makeSchema } from "../supabase/functions/werkstroomcheck/schema";

const schema = makeSchema(z);
const fouten: string[] = [];
const base = {
  request_id: "3f1c9a5e-8b7d-4c2a-9e1f-2a6b5c4d3e21",
  name: "Test Persoon", company: "Testbedrijf BV", email: "test@testbedrijf.nl",
  work: "Offerteaanvragen overtypen", contact_preference: "email", context: { source: "header" },
};
const ok = (v: unknown, m: string) => { const r = schema.safeParse(v); if (!r.success) fouten.push(`${m}: verwacht geldig, kreeg ${JSON.stringify(r.error.issues)}`); };
const bad = (v: unknown, path: string, m: string) => {
  const r = schema.safeParse(v);
  if (r.success) fouten.push(`${m}: verwacht ongeldig`);
  else if (!r.error.issues.some((i: { path: (string | number)[] }) => i.path.join(".") === path)) fouten.push(`${m}: verwacht fout op '${path}', kreeg ${JSON.stringify(r.error.issues.map((i: { path: unknown }) => i.path))}`);
};

ok(base, "minimaal geldig");
ok({ ...base, contact_preference: "bel", phone: "+31 6 12345678" }, "bel met telefoon");
bad({ ...base, contact_preference: "bel" }, "phone", "bel zonder telefoon");
bad({ ...base, email: "geen-mail" }, "email", "ongeldige mail");
bad({ ...base, name: "" }, "name", "lege naam");
bad({ ...base, work: "" }, "work", "leeg werkveld");
bad({ ...base, request_id: "abc" }, "request_id", "request_id geen uuid");
bad({ ...base, frequency: "elk uur" }, "frequency", "onbekende frequentie");
ok({ ...base, phone: "", software: "" }, "lege optionele velden zijn toegestaan");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ werkstroomcheck-schema klopt");
