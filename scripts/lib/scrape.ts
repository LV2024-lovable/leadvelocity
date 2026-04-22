import { parse, HTMLElement } from "node-html-parser";

const USER_AGENT = "LeadvelocityBot/1.0 (+https://leadvelocity.nl)";
const FETCH_TIMEOUT_MS = 8000;
const MAX_CHARS = 8000;

const ABOUT_PATHS = [
  "/over-ons",
  "/over",
  "/about",
  "/about-us",
  "/bedrijf",
  "/wie-zijn-wij",
];

export type ScrapeResult = {
  status: "ok" | "website_unreachable" | "no_useful_content";
  text: string;
  pagesFetched: string[];
  errorDetail?: string;
};

export async function fetchSiteText(rawUrl: string): Promise<ScrapeResult> {
  const url = normalizeUrl(rawUrl);
  if (!url) {
    return { status: "website_unreachable", text: "", pagesFetched: [], errorDetail: "no-url" };
  }

  const collected: string[] = [];
  const pagesFetched: string[] = [];

  const homepage = await fetchPage(url);
  if (!homepage.html) {
    return {
      status: "website_unreachable",
      text: "",
      pagesFetched: [],
      errorDetail: homepage.error,
    };
  }

  pagesFetched.push(url);
  collected.push(extractText(homepage.html));

  // Try about-pages — bounded parallel, take first 2 successes
  const origin = new URL(url).origin;
  const aboutCandidates = ABOUT_PATHS.map((p) => `${origin}${p}`);

  for (const candidateUrl of aboutCandidates) {
    if (pagesFetched.length >= 3) break;
    const resp = await fetchPage(candidateUrl);
    if (resp.html) {
      pagesFetched.push(candidateUrl);
      collected.push(extractText(resp.html));
    }
  }

  const combined = collected.join("\n\n---\n\n").slice(0, MAX_CHARS);
  if (combined.trim().length < 200) {
    return { status: "no_useful_content", text: combined, pagesFetched };
  }
  return { status: "ok", text: combined, pagesFetched };
}

function normalizeUrl(raw: string): string | null {
  if (!raw || !raw.trim()) return null;
  let s = raw.trim();
  if (!s.startsWith("http://") && !s.startsWith("https://")) {
    s = "https://" + s;
  }
  try {
    const u = new URL(s);
    return u.href;
  } catch {
    return null;
  }
}

async function fetchPage(url: string): Promise<{ html: string | null; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const resp = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nl-NL,nl;q=0.9,en;q=0.8",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);
    if (!resp.ok) {
      return { html: null, error: `HTTP ${resp.status}` };
    }
    const text = await resp.text();
    return { html: text };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { html: null, error: msg };
  }
}

function extractText(html: string): string {
  let root: HTMLElement;
  try {
    root = parse(html);
  } catch {
    return "";
  }

  // Remove noise elements
  root.querySelectorAll("script, style, noscript, svg, nav, footer, header").forEach((n) => n.remove());

  const parts: string[] = [];

  const title = root.querySelector("title")?.textContent?.trim();
  if (title) parts.push(`# ${title}`);

  const metaDesc = root.querySelector('meta[name="description"]')?.getAttribute("content");
  if (metaDesc) parts.push(`Description: ${metaDesc.trim()}`);

  const h1s = root.querySelectorAll("h1").map((h) => h.textContent.trim()).filter(Boolean);
  if (h1s.length) parts.push(`H1: ${h1s.slice(0, 3).join(" | ")}`);

  const h2s = root.querySelectorAll("h2").map((h) => h.textContent.trim()).filter(Boolean);
  if (h2s.length) parts.push(`H2: ${h2s.slice(0, 8).join(" | ")}`);

  const bodyText = root.querySelector("main")?.textContent ?? root.querySelector("body")?.textContent ?? "";
  const cleaned = bodyText.replace(/\s+/g, " ").trim();
  if (cleaned) parts.push(cleaned);

  return parts.join("\n").slice(0, MAX_CHARS);
}
