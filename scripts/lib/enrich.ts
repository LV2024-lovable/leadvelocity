import Anthropic from "@anthropic-ai/sdk";
import {
  CLASSIFY_SYSTEM_PROMPT,
  buildClassifyUserPrompt,
  OPENER_SYSTEM_PROMPT,
  buildOpenerUserPrompt,
} from "./prompts.js";

const HAIKU_MODEL = "claude-haiku-4-5-20251001";
const SONNET_MODEL = "claude-sonnet-4-6";

export type Classification = {
  sub_niche: string;
  icp_fit: number;
  fit_rationale: string;
  signal_type: string;
  signal_detail: string;
  signal_source_url: string;
};

export type OpenerPair = {
  opener_a: string;
  opener_b: string;
};

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local (see scripts/README.md).",
    );
  }
  client = new Anthropic({ apiKey });
  return client;
}

export async function classifyRow(args: {
  companyName: string;
  website: string;
  title: string;
  industry: string;
  scrapedText: string;
  pagesFetched: string[];
}): Promise<Classification> {
  const anthropic = getClient();
  const resp = await anthropic.messages.create({
    model: HAIKU_MODEL,
    max_tokens: 512,
    system: CLASSIFY_SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildClassifyUserPrompt(args) }],
  });
  const text = extractText(resp);
  return parseJsonResponse<Classification>(text, "classify");
}

export async function generateOpeners(args: {
  firstName: string;
  companyName: string;
  title: string;
  classification: Classification;
}): Promise<OpenerPair> {
  const anthropic = getClient();
  const resp = await anthropic.messages.create({
    model: SONNET_MODEL,
    max_tokens: 600,
    system: OPENER_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: buildOpenerUserPrompt({
          firstName: args.firstName,
          companyName: args.companyName,
          title: args.title,
          subNiche: args.classification.sub_niche,
          icpFit: args.classification.icp_fit,
          fitRationale: args.classification.fit_rationale,
          signalType: args.classification.signal_type,
          signalDetail: args.classification.signal_detail,
        }),
      },
    ],
  });
  const text = extractText(resp);
  return parseJsonResponse<OpenerPair>(text, "openers");
}

function extractText(resp: Anthropic.Messages.Message): string {
  const block = resp.content.find((c) => c.type === "text");
  if (!block || block.type !== "text") {
    throw new Error("No text block in LLM response");
  }
  return block.text;
}

function parseJsonResponse<T>(raw: string, label: string): T {
  const cleaned = stripCodeFence(raw).trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error(`${label}: no JSON object found in response`);
  }
  const jsonStr = cleaned.slice(firstBrace, lastBrace + 1);
  try {
    return JSON.parse(jsonStr) as T;
  } catch (err) {
    throw new Error(
      `${label}: JSON parse failed: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

function stripCodeFence(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
}
