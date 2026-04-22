/**
 * Enrich Apollo prospect CSV with site-scraped signals + personalized openers.
 *
 * Usage:
 *   npm run enrich
 *   npm run enrich -- --input=data/prospects/my.csv --output=data/prospects/enriched.csv
 *   npm run enrich -- --limit=5         # for dry-runs
 *
 * Reads ANTHROPIC_API_KEY from .env.local (or environment).
 * See scripts/README.md for details.
 */
import "dotenv/config";
import dotenv from "dotenv";
import path from "node:path";
import {
  readInputCsv,
  readExistingEmails,
  appendEnrichedRow,
  getEmailFromRow,
  getCompanyFromRow,
  getWebsiteFromRow,
  getTitleFromRow,
  getIndustryFromRow,
  getFirstNameFromRow,
  Row,
} from "./lib/csv.js";
import { fetchSiteText } from "./lib/scrape.js";
import { classifyRow, generateOpeners, Classification, OpenerPair } from "./lib/enrich.js";

// Also load .env.local explicitly (dotenv default is .env)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), override: true });

const DEFAULT_INPUT = "data/prospects/input.csv";
const DEFAULT_OUTPUT = "data/prospects/output.csv";
const DELAY_MS = 1500;

const ENRICHED_COLUMNS = [
  "sub_niche",
  "icp_fit",
  "fit_rationale",
  "signal_type",
  "signal_detail",
  "signal_source_url",
  "opener_a",
  "opener_b",
  "scrape_status",
  "enriched_at",
];

type Args = {
  input: string;
  output: string;
  limit?: number;
};

function parseArgs(): Args {
  const args: Args = { input: DEFAULT_INPUT, output: DEFAULT_OUTPUT };
  for (const arg of process.argv.slice(2)) {
    const [k, v] = arg.split("=");
    if (k === "--input" && v) args.input = v;
    else if (k === "--output" && v) args.output = v;
    else if (k === "--limit" && v) args.limit = parseInt(v, 10);
  }
  return args;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type Stats = {
  processed: number;
  enriched: number;
  skipped: number;
  websiteUnreachable: number;
  noContent: number;
  llmError: number;
};

async function main() {
  const args = parseArgs();
  console.log(`Enrich Apollo prospects`);
  console.log(`  Input:  ${args.input}`);
  console.log(`  Output: ${args.output}`);
  if (args.limit) console.log(`  Limit:  ${args.limit}`);
  console.log("");

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      "ERROR: ANTHROPIC_API_KEY not found. Add it to .env.local (see scripts/README.md).",
    );
    process.exit(1);
  }

  let rows: Row[];
  try {
    rows = readInputCsv(args.input);
  } catch (err) {
    console.error(`ERROR: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }

  if (rows.length === 0) {
    console.error("No rows found in input CSV.");
    process.exit(1);
  }

  const processedEmails = readExistingEmails(args.output);
  if (processedEmails.size > 0) {
    console.log(`Resuming: ${processedEmails.size} rows already in output, will skip.\n`);
  }

  const inputColumns = Object.keys(rows[0]);
  const allColumns = [...inputColumns, ...ENRICHED_COLUMNS];

  const stats: Stats = {
    processed: 0,
    enriched: 0,
    skipped: 0,
    websiteUnreachable: 0,
    noContent: 0,
    llmError: 0,
  };

  const toProcess = args.limit ? rows.slice(0, args.limit) : rows;

  for (let i = 0; i < toProcess.length; i++) {
    const row = toProcess[i];
    const email = getEmailFromRow(row);
    const company = getCompanyFromRow(row);
    const prefix = `[${i + 1}/${toProcess.length}]`;

    if (!email) {
      console.log(`${prefix} ⨯ skip — no email`);
      stats.skipped++;
      continue;
    }
    if (processedEmails.has(email)) {
      console.log(`${prefix} ⊘ skip — already in output (${company})`);
      stats.skipped++;
      continue;
    }

    try {
      await processRow(row, args.output, allColumns, stats, prefix);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${prefix} ✗ error (${company}): ${msg}`);
      stats.llmError++;
      appendEnrichedRow(
        args.output,
        {
          ...row,
          sub_niche: "",
          icp_fit: "",
          fit_rationale: "",
          signal_type: "",
          signal_detail: "",
          signal_source_url: "",
          opener_a: "",
          opener_b: "",
          scrape_status: "llm_error",
          enriched_at: new Date().toISOString(),
        },
        allColumns,
      );
    }

    stats.processed++;
    if (i < toProcess.length - 1) await sleep(DELAY_MS);
  }

  console.log("");
  console.log(`Done.`);
  console.log(`  Processed:            ${stats.processed}`);
  console.log(`  Enriched (ok):        ${stats.enriched}`);
  console.log(`  Website unreachable:  ${stats.websiteUnreachable}`);
  console.log(`  No useful content:    ${stats.noContent}`);
  console.log(`  LLM error:            ${stats.llmError}`);
  console.log(`  Skipped:              ${stats.skipped}`);
  console.log("");
  console.log(`Output: ${args.output}`);
}

async function processRow(
  row: Row,
  outputPath: string,
  allColumns: string[],
  stats: Stats,
  logPrefix: string,
): Promise<void> {
  const company = getCompanyFromRow(row);
  const website = getWebsiteFromRow(row);
  const title = getTitleFromRow(row);
  const industry = getIndustryFromRow(row);
  const firstName = getFirstNameFromRow(row);

  // 1. Scrape site
  const scrape = await fetchSiteText(website);

  if (scrape.status === "website_unreachable") {
    console.log(`${logPrefix} ⚠ ${company} — website unreachable (${scrape.errorDetail ?? "?"})`);
    stats.websiteUnreachable++;
    appendEnrichedRow(
      outputPath,
      {
        ...row,
        sub_niche: "",
        icp_fit: "",
        fit_rationale: "",
        signal_type: "none",
        signal_detail: "",
        signal_source_url: "",
        opener_a: "",
        opener_b: "",
        scrape_status: "website_unreachable",
        enriched_at: new Date().toISOString(),
      },
      allColumns,
    );
    return;
  }

  // 2. Classify
  let classification: Classification;
  try {
    classification = await classifyRow({
      companyName: company,
      website,
      title,
      industry,
      scrapedText: scrape.text,
      pagesFetched: scrape.pagesFetched,
    });
  } catch (err) {
    throw new Error(`classify failed: ${err instanceof Error ? err.message : err}`);
  }

  // 3. Generate openers
  let openers: OpenerPair;
  try {
    openers = await generateOpeners({
      firstName,
      companyName: company,
      title,
      classification,
    });
  } catch (err) {
    throw new Error(`openers failed: ${err instanceof Error ? err.message : err}`);
  }

  const status = scrape.status === "no_useful_content" ? "no_useful_content" : "ok";
  if (status === "no_useful_content") stats.noContent++;
  else stats.enriched++;

  appendEnrichedRow(
    outputPath,
    {
      ...row,
      sub_niche: classification.sub_niche,
      icp_fit: String(classification.icp_fit),
      fit_rationale: classification.fit_rationale,
      signal_type: classification.signal_type,
      signal_detail: classification.signal_detail,
      signal_source_url: classification.signal_source_url,
      opener_a: openers.opener_a,
      opener_b: openers.opener_b,
      scrape_status: status,
      enriched_at: new Date().toISOString(),
    },
    allColumns,
  );

  const mark = status === "ok" ? "✓" : "◐";
  console.log(
    `${logPrefix} ${mark} ${company} — fit=${classification.icp_fit}, niche=${classification.sub_niche}, signal=${classification.signal_type}`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
