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

await t("hero: zonder context roteert het procesnaamwoord", async () => {
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const visible = () => page.$$eval("h1 [aria-hidden] span.opacity-100", (els) => els.map((e) => e.textContent));
  const first = (await visible())[0];
  await page.waitForTimeout(2900);
  const second = (await visible())[0];
  expect(first && second && first !== second, `woord wisselde niet: ${first} → ${second}`);
  expect((await page.locator("h1 .sr-only").textContent()).includes("Automatiseer je"), "screenreadertekst ontbreekt");
});

await t("hero: ?category= zet woord, demo en CTA-context vast", async () => {
  await page.goto(BASE + "/?category=service-onderhoud", { waitUntil: "networkidle" });
  await page.waitForTimeout(2900);
  const words = await page.$$eval("h1 [aria-hidden] span.opacity-100", (els) => els.map((e) => e.textContent));
  expect(words[0] === "servicemeldingen", `woord: ${words[0]}`);
  expect((await page.locator("h1 .sr-only").textContent()).includes("servicemeldingen"), "sr-tekst niet vastgezet");
  expect(await page.locator("text=Servicemelding").first().count() === 1, "demo niet gewisseld naar servicemelding");
  const href = await page.locator("a:has-text('Plan een gratis adviesgesprek')").first().getAttribute("href");
  expect(href.includes("category=service-onderhoud") && href.includes("process=service-intake"), `href ${href}`);
});

await t("geen 'werkstroomcheck' meer zichtbaar op hoofdpagina's", async () => {
  for (const r of ["/", "/prijzen", "/adviesgesprek", "/groothandels", "/campagnes/aftersales"]) {
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const txt = await page.evaluate(() => document.body.innerText.toLowerCase());
    expect(!txt.includes("werkstroomcheck"), `${r} toont nog 'werkstroomcheck'`);
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
