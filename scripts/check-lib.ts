// Run: npx tsx scripts/check-lib.ts
import { checkHref, demoHref, parseCheckContext } from "../src/lib/cta";

const fouten: string[] = [];
const eq = (a: unknown, b: unknown, m: string) => { if (JSON.stringify(a) !== JSON.stringify(b)) fouten.push(`${m}: ${JSON.stringify(a)} ≠ ${JSON.stringify(b)}`); };

eq(checkHref({ source: "header" }), "/werkstroomcheck?source=header", "header");
eq(checkHref({ category: "groothandels", process: "offerte-intake" }), "/werkstroomcheck?category=groothandels&process=offerte-intake", "categorie");
eq(checkHref({ source: "home-hero", package: "werkstroom" }), "/werkstroomcheck?source=home-hero&package=werkstroom", "volgorde source eerst");
eq(checkHref({}), "/werkstroomcheck", "leeg");
eq(demoHref("aftersales", "home-hero"), "/voorbeelden?demo=aftersales&source=home-hero", "demoHref");
eq(demoHref(undefined, "home-hero"), "/voorbeelden?source=home-hero", "demoHref zonder demo");
eq(parseCheckContext("?category=groothandels&process=offerte-intake&package=werkstroom&demo=offerte-intake&campaign=offerte-intake&source=header"),
  { source: "header", category: "groothandels", process: "offerte-intake", package: "werkstroom", demo: "offerte-intake", campaign: "offerte-intake" }, "parse volledig");
eq(parseCheckContext("?category=hacker&package=gratis&process=sales"), { process: "sales" }, "onbekende waarden worden genegeerd");
eq(parseCheckContext("?source=" + "x".repeat(200)), { source: "x".repeat(64) }, "source afgekapt op 64");
eq(parseCheckContext("?source=%3Cscript%3E"), { source: "script" }, "source alleen [a-z0-9-_]");

if (fouten.length) { console.error(`✗ ${fouten.length}:\n- ${fouten.join("\n- ")}`); process.exit(1); }
console.log("✓ lib klopt");
