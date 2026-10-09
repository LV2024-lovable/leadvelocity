// Run: npx tsx scripts/generate-sitemap.ts
import { writeFileSync } from "node:fs";
import { indexableRoutes, SITE_URL } from "../src/content";

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexableRoutes.map((p) => `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);
console.log(`✓ sitemap met ${indexableRoutes.length} URL's`);
