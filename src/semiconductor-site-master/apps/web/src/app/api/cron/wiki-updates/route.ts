export const dynamic = "force-dynamic";

import { generateWikiUpdate } from "@/lib/wiki-updates";

const DAILY_WIKI_SLUGS = [
  "high-k-metal-gate",
  "reactive-sputtering",
  "memory-semiconductor",
  "process-to-yield-pipeline",
  "leakage-current",
  "sk-hynix-memory-positioning",
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = [];
  const errors: string[] = [];

  for (const slug of DAILY_WIKI_SLUGS) {
    try {
      const update = await generateWikiUpdate(slug);
      results.push({ slug, fetchedAt: update.fetchedAt });
    } catch (error: any) {
      errors.push(`${slug}: ${error.message}`);
    }
  }

  return Response.json({
    ok: errors.length === 0,
    updated: results,
    errors: errors.length ? errors : undefined,
    timestamp: new Date().toISOString(),
  });
}
