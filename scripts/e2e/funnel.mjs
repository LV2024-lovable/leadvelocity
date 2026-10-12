// Funnelcheck (handover §18). Run:
// PLAYWRIGHT_MODULE=$SCRATCH/node_modules/playwright/index.mjs CHROME_PATH="…" OUT_DIR=$SCRATCH/shots node scripts/e2e/funnel.mjs
import { mkdirSync } from "node:fs";
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? "playwright");
const BASE = process.env.BASE_URL ?? "http://localhost:5179";
const OUT = process.env.OUT_DIR ?? "./e2e-shots";
mkdirSync(OUT, { recursive: true });

const results = [];
const pass = (n) => results.push(["PASS", n]);
const fail = (n, e) => results.push(["FAIL", `${n} — ${e}`]);
const t = async (name, fn) => { try { await fn(); pass(name); } catch (e) { fail(name, e.message.split("\n")[0]); } };
const expect = (c, m) => { if (!c) throw new Error(m); };

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH });

const ROUTES = ["/", "/voor-wie", "/groothandels", "/importeurs-distributeurs", "/service-onderhoud", "/maatwerk-montage",
  "/oplossingen", "/oplossingen/aanvragen-dossiers", "/oplossingen/communicatie-opvolging", "/oplossingen/data-inzicht",
  "/oplossingen/commerciele-voorbereiding", "/werkwijze", "/prijzen", "/voorbeelden", "/over", "/adviesgesprek",
  "/privacy", "/campagnes/offerte-intake", "/campagnes/aftersales", "/campagnes/service-intake", "/campagnes/project-intake", "/inzichten"];

for (const width of [360, 390, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const r of ROUTES) {
    await t(`${width}px ${r}: laadt, één h1, geen horizontale scroll`, async () => {
      await page.goto(BASE + r, { waitUntil: "networkidle" });
      expect(await page.locator("h1").count() === 1, `h1-count ${await page.locator("h1").count()}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow <= 1, `horizontale overflow ${overflow}px`);
      if (width !== 1440 || ["/", "/prijzen", "/groothandels", "/adviesgesprek"].includes(r)) {
        await page.screenshot({ path: `${OUT}/${width}${r.replaceAll("/", "_") || "_home"}.png`, fullPage: true });
      }
    });
  }
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await t("alle interne links wijzen naar bestaande pagina's", async () => {
  const seen = new Set();
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    for (const href of await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href")))) seen.add(href.split("#")[0]);
  }
  for (const href of seen) {
    await page.goto(BASE + href, { waitUntil: "networkidle" });
    expect(!(await page.locator("text=Deze pagina bestaat niet (meer).").count()), `404 voor ${href}`);
  }
});

await t("noindex op campagnes en /bedankt, niet op categorieën", async () => {
  for (const [r, want] of [["/campagnes/aftersales", true], ["/bedankt", true], ["/groothandels", false]]) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const has = await page.locator('meta[name="robots"][content*="noindex"]').count();
    expect(!!has === want, `${r}: noindex=${!!has}`);
  }
});

for (const [from, to] of [["/groothandel", "/groothandels"], ["/maakindustrie", "/maatwerk-montage"], ["/transport", "/service-onderhoud"],
  ["/ai-kansenscan", "/adviesgesprek"], ["/werkstroomcheck", "/adviesgesprek"], ["/oplossingen/chatbots", "/oplossingen/communicatie-opvolging"], ["/faq", "/prijzen"]]) {
  await t(`redirect ${from} → ${to}`, async () => {
    await page.goto(BASE + from, { waitUntil: "networkidle" });
    expect(new URL(page.url()).pathname === to, `kwam op ${page.url()}`);
  });
}

await t("redirect /werkstroomcheck behoudt querystring (outreach-context)", async () => {
  await page.goto(BASE + "/werkstroomcheck?category=groothandels&source=mail-a&utm_campaign=x", { waitUntil: "networkidle" });
  const u = new URL(page.url());
  expect(u.pathname === "/adviesgesprek", `kwam op ${u.pathname}`);
  expect(u.searchParams.get("category") === "groothandels" && u.searchParams.get("source") === "mail-a" && u.searchParams.get("utm_campaign") === "x", `query kwijt: ${u.search}`);
  expect(await page.locator("#category").inputValue() === "groothandels", "categorie niet voorgevuld na redirect");
});

await t("hero: generiek zonder context, geen segment gekozen", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Jouw AI-partner voor het MKB"), "generieke H1 ontbreekt");
  expect(await page.locator("[data-segment-picker] [aria-pressed=true]").count() === 0, "segment voorgeselecteerd zonder context");
  await page.goto(BASE + "/?category=onzin", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("Jouw AI-partner voor het MKB"), "onbekende category breekt hero");
});

await t("hero: ?category= toont segment-H1, demo en CTA-context", async () => {
  await page.goto(BASE + "/?category=service-onderhoud", { waitUntil: "networkidle" });
  expect((await page.locator("h1").textContent()).includes("servicebedrijven"), "segment-H1 niet getoond");
  expect(await page.locator("[data-segment-picker] [aria-pressed=true]").count() === 1, "segmentknop niet actief");
  expect(await page.locator("text=Servicemelding").first().count() === 1, "demo niet gewisseld");
  const href = await page.locator("a:has-text('Plan een gratis adviesgesprek')").first().getAttribute("href");
  expect(href.includes("category=service-onderhoud") && href.includes("process=service-intake"), `href ${href}`);
});

await t("keuzeknoppen: klik en toetsenbord wisselen alles mee", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.locator("[data-segment-picker] button", { hasText: /garantieclaims/i }).click();
  expect((await page.locator("h1").textContent()).includes("importeurs en distributeurs"), "H1 wisselt niet");
  expect(await page.locator("text=aankoopbewijs of serienummer").count() >= 1, "situaties wisselen niet");
  const btn = page.locator("[data-segment-picker] button", { hasText: /projectaanvragen/i });
  await btn.focus(); await page.keyboard.press("Enter");
  expect(await btn.getAttribute("aria-pressed") === "true", "toetsenbord kiest niet");
  const href = await page.locator("a:has-text('Plan een gratis adviesgesprek')").first().getAttribute("href");
  expect(href.includes("category=maatwerk-montage"), `href ${href}`);
});

await t("homepage: qualifier, voorbeelden, werkwijze en wat-we-bouwen aanwezig", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  for (const h of ["Voor wie dit werkt (en voor wie niet)", "Zo ziet het eruit.", "Van eerste gesprek tot werkende oplossing.", "Wat we voor jouw bedrijf bouwen."]) {
    expect(await page.locator(`h2:has-text("${h}")`).count() === 1, `sectie ontbreekt: ${h}`);
  }
});

await t("tabs 'wat we bouwen' en tijdlijn werken; geen nep-bewijs op home", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const tab = page.locator("[aria-label='Kies een aanvraagstroom'] button", { hasText: /servicemeldingen/i });
  await tab.click();
  expect(await tab.getAttribute("aria-pressed") === "true", "tab niet actief");
  expect((await page.locator("h1").textContent()).includes("servicebedrijven"), "hero volgt tab niet");
  const step3 = page.locator("[role=tab]", { hasText: "Inrichten en testen" });
  await step3.click();
  expect(await step3.getAttribute("aria-selected") === "true", "tijdlijnstap niet geselecteerd");
  const txt = (await page.evaluate(() => document.body.innerText)).toLowerCase();
  for (const bad of ["trusted by", "★", "case study", "klanten geholpen"]) expect(!txt.includes(bad), `nep-bewijs gevonden: ${bad}`);
});

await t("geen 'werkstroomcheck' meer zichtbaar op hoofdpagina's", async () => {
  for (const r of ["/", "/prijzen", "/adviesgesprek", "/groothandels", "/campagnes/aftersales"]) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const txt = await page.evaluate(() => document.body.innerText.toLowerCase());
    expect(!txt.includes("werkstroomcheck"), `${r} toont nog 'werkstroomcheck'`);
  }
});

await t("oplossingen per doelgroep: /groothandels en homepage-tabs", async () => {
  await page.goto(BASE + "/groothandels", { waitUntil: "networkidle" });
  const sec = page.locator("section", { has: page.locator('h2:has-text("Wat we voor jullie bouwen")') });
  expect(await sec.count() === 1, "sectie 'Wat we voor jullie bouwen' ontbreekt");
  expect(await sec.locator("[data-solution-card]").count() === 4, `verwacht 4 kaarten, kreeg ${await sec.locator("[data-solution-card]").count()}`);
  expect(await sec.locator("a[href^='/oplossingen/']").count() === 4, "kaarten linken niet naar /oplossingen/…");
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.locator("[aria-label='Kies een aanvraagstroom'] button", { hasText: /garantieclaims/i }).click();
  const list = page.locator("[data-solutions]");
  expect(await list.locator("[data-solution]").count() === 4, `verwacht 4 oplossingen in de tabs, kreeg ${await list.locator("[data-solution]").count()}`);
  expect((await list.innerText()).includes("Garantieclaims compleet"), "tabs tonen niet de oplossingen van de actieve doelgroep");
});

await t("geen 'werkstroom' meer zichtbaar", async () => {
  for (const r of ["/", "/prijzen", "/werkwijze", "/groothandels", "/voorbeelden"]) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const txt = await page.evaluate(() => document.body.innerText.toLowerCase());
    expect(!txt.includes("werkstroom"), `${r} toont nog 'werkstroom'`);
  }
});

await t("prefill vanuit categorie, pakket en onbekende waarden", async () => {
  await page.goto(BASE + "/adviesgesprek?category=groothandels&process=offerte-intake&package=werkstroom", { waitUntil: "networkidle" });
  expect(await page.locator("#category").inputValue() === "groothandels", "categorie niet voorgevuld");
  expect(await page.locator("#process").inputValue() === "offerte-intake", "proces niet voorgevuld");
  await page.goto(BASE + "/adviesgesprek?category=hacker&process=gratis", { waitUntil: "networkidle" });
  expect(await page.locator("#category").inputValue() === "", "onbekende categorie toch voorgevuld");
});

await t("validatie: lege velden en Bel mij zonder telefoon", async () => {
  await page.goto(BASE + "/adviesgesprek", { waitUntil: "networkidle" });
  await page.click("button[type=submit]");
  for (const id of ["name-err", "company-err", "email-err", "work-err"]) expect(await page.locator(`#${id}`).count() === 1, `${id} ontbreekt`);
  await page.check("input[value=bel]");
  await page.fill("#name", "Test Persoon"); await page.fill("#company", "Testbedrijf"); await page.fill("#email", "t@testbedrijf.nl"); await page.fill("#work", "Offertes overtypen");
  await page.click("button[type=submit]");
  expect(await page.locator("#phone-err").count() === 1, "geen telefoonfout bij Bel mij");
});

const fill = async () => {
  await page.goto(BASE + "/adviesgesprek?source=e2e&category=groothandels", { waitUntil: "networkidle" });
  await page.fill("#name", "Test Persoon"); await page.fill("#company", "Testbedrijf"); await page.fill("#email", "t@testbedrijf.nl"); await page.fill("#work", "Offertes overtypen");
};

await t("serverfout (gestubd 500): invoer blijft, foutmelding, geen navigatie", async () => {
  await page.route("**/functions/v1/werkstroomcheck", (r) => r.fulfill({ status: 500, contentType: "application/json", body: '{"ok":false}' }));
  await fill();
  await page.click("button[type=submit]");
  await page.waitForSelector("#form-error");
  expect(new URL(page.url()).pathname === "/adviesgesprek", "navigeerde toch weg");
  expect(await page.locator("#name").inputValue() === "Test Persoon", "invoer niet behouden");
  await page.unroute("**/functions/v1/werkstroomcheck");
});

await t("succes (gestubd 200) en double-submit: één request, daarna /bedankt", async () => {
  let calls = 0;
  await page.route("**/functions/v1/werkstroomcheck", async (r) => { calls++; await new Promise((s) => setTimeout(s, 400)); await r.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' }); });
  await fill();
  await page.click("button[type=submit]");
  await page.click("button[type=submit]", { force: true }).catch(() => {});
  await page.waitForURL("**/bedankt");
  expect(calls === 1, `${calls} requests verstuurd`);
  await page.unroute("**/functions/v1/werkstroomcheck");
});

await t("toetsenbord: eerste Tab geeft zichtbare focus", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => { const el = document.activeElement; const s = getComputedStyle(el); return s.boxShadow !== "none" || s.outlineStyle !== "none"; });
  expect(outline, "geen zichtbare focus");
});

await t("demo: stappen doorlopen en knop met context", async () => {
  await page.goto(BASE + "/voorbeelden?demo=aftersales", { waitUntil: "networkidle" });
  const first = page.locator("[role=tablist]").first();
  await first.locator("[role=tab]").nth(2).click();
  const href = await page.locator("a:has-text('Bekijk of dit bij jullie past')").first().getAttribute("href");
  expect(href.includes("demo=aftersales") && href.includes("process=aftersales"), `href ${href}`);
});

await browser.close();
for (const [s, n] of results) console.log(`${s}  ${n}`);
const failed = results.filter(([s]) => s === "FAIL").length;
console.log(`\n${results.length - failed}/${results.length} geslaagd`);
process.exit(failed ? 1 : 0);
