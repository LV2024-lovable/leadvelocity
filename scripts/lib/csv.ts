import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Row = Record<string, string>;

export function readInputCsv(filePath: string): Row[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Input CSV not found: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = Papa.parse<Row>(content, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  if (parsed.errors.length > 0) {
    console.warn(`CSV parse warnings: ${parsed.errors.length} issues`);
  }
  return parsed.data.filter((r) => Object.values(r).some((v) => v && v.trim() !== ""));
}

/** Returns set of emails already present in output CSV, for resume support. */
export function readExistingEmails(outputPath: string): Set<string> {
  if (!fs.existsSync(outputPath)) return new Set();
  const content = fs.readFileSync(outputPath, "utf-8");
  if (!content.trim()) return new Set();
  const parsed = Papa.parse<Row>(content, { header: true, skipEmptyLines: true });
  const key = findEmailColumn(parsed.data[0] ?? {});
  if (!key) return new Set();
  return new Set(parsed.data.map((r) => (r[key] ?? "").toLowerCase().trim()).filter(Boolean));
}

function findEmailColumn(row: Row): string | null {
  const keys = Object.keys(row);
  return (
    keys.find((k) => k.toLowerCase() === "email") ??
    keys.find((k) => k.toLowerCase().includes("email")) ??
    null
  );
}

/** Append a single row to the output CSV. Writes header if file doesn't exist. */
export function appendEnrichedRow(
  outputPath: string,
  row: Row,
  columnOrder: string[],
): void {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const fileExists = fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0;

  const csv = Papa.unparse([row], {
    columns: columnOrder,
    header: !fileExists,
    newline: "\n",
  });
  fs.appendFileSync(outputPath, fileExists ? "\n" + csv : csv);
}

export function getEmailFromRow(row: Row): string {
  return (row["Email"] ?? row["email"] ?? "").toLowerCase().trim();
}

export function getCompanyFromRow(row: Row): string {
  return (
    row["Company Name for Emails"] ??
    row["Company"] ??
    row["Company Name"] ??
    ""
  ).trim();
}

export function getWebsiteFromRow(row: Row): string {
  return (row["Website"] ?? row["website"] ?? "").trim();
}

export function getTitleFromRow(row: Row): string {
  return (row["Title"] ?? row["title"] ?? "").trim();
}

export function getIndustryFromRow(row: Row): string {
  return (row["Industry"] ?? row["industry"] ?? "").trim();
}

export function getFirstNameFromRow(row: Row): string {
  return (row["First Name"] ?? row["first_name"] ?? "").trim();
}
