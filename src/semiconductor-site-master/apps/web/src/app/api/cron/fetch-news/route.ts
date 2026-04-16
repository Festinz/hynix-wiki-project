export const dynamic = "force-dynamic";

import {
  fetchGlobalNews,
  fetchSemiNews,
  summarizeNewsWithPerplexity,
  type PerplexityResponse,
} from "@/lib/perplexity";
import { readMetrics, readNews, writeMetrics, writeNews } from "@/lib/blob-store";

function extractArticles(
  response: PerplexityResponse,
  source: string
): { text: string; citations: string[]; source: string }[] {
  const content = response?.choices?.[0]?.message?.content;
  const citations = response?.citations || [];

  if (!content) {
    return [];
  }

  const blocks = content
    .split(/(?=\d+[\.\)]\s)/)
    .map((block) => block.trim())
    .filter((block) => block.length > 30);

  if (blocks.length > 0) {
    return blocks.map((text) => ({ text, citations, source }));
  }

  return content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 30)
    .map((text) => ({ text, citations, source }));
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const errors: string[] = [];
  let totalNews = 0;
  let totalMetrics = 0;

  try {
    const [samsungRes, hynixRes, globalRes] = await Promise.all([
      fetchSemiNews("samsung").catch((error: Error) => {
        errors.push(`Samsung KR news: ${error.message}`);
        return null;
      }),
      fetchSemiNews("hynix").catch((error: Error) => {
        errors.push(`Hynix KR news: ${error.message}`);
        return null;
      }),
      fetchGlobalNews().catch((error: Error) => {
        errors.push(`Global news: ${error.message}`);
        return null;
      }),
    ]);

    const allArticles = [
      ...(samsungRes ? extractArticles(samsungRes, "kr-samsung") : []),
      ...(hynixRes ? extractArticles(hynixRes, "kr-hynix") : []),
      ...(globalRes ? extractArticles(globalRes, "global") : []),
    ];

    if (allArticles.length === 0) {
      return Response.json({
        ok: false,
        message: "No articles extracted",
        errors,
      });
    }

    const summaryResults = await Promise.allSettled(
      allArticles
        .slice(0, 15)
        .map((article) =>
          summarizeNewsWithPerplexity(article.text, article.citations, article.source)
        )
    );

    const summaries = summaryResults
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<Awaited<ReturnType<typeof summarizeNewsWithPerplexity>>> =>
          result.status === "fulfilled"
      )
      .map((result) => result.value)
      .filter((summary) => summary?.title && summary?.summary);

    const failedCount = summaryResults.filter(
      (result) => result.status === "rejected"
    ).length;

    if (failedCount > 0) {
      errors.push(`${failedCount} articles failed normalization`);
    }

    let blobError = "";

    try {
      const existing = await readNews();
      const existingTitles = new Set(existing.map((entry: any) => entry.title));
      const newItems = summaries.filter((summary) => !existingTitles.has(summary.title));
      const updated = [...newItems, ...existing].slice(0, 100);

      await writeNews(updated);
      totalNews = newItems.length;
    } catch (error: any) {
      blobError = error.message;
      totalNews = summaries.length;
    }

    const metricsUpdates = summaries.flatMap(
      (summary) => summary.metricsUpdates || []
    );

    if (metricsUpdates.length > 0) {
      try {
        const metrics = await readMetrics();

        metricsUpdates.forEach((update) => {
          if (!update.product || !update.company || !update.field || !update.value) {
            return;
          }

          if (!metrics[update.product]) {
            metrics[update.product] = {};
          }

          if (!metrics[update.product][update.company]) {
            metrics[update.product][update.company] = {};
          }

          metrics[update.product][update.company][update.field] = update.value;
          metrics[update.product][update.company].lastUpdated =
            new Date().toISOString();
        });

        await writeMetrics(metrics);
        totalMetrics = metricsUpdates.length;
      } catch {
        // Blob storage is optional for local development.
      }
    }

    return Response.json({
      ok: true,
      newsAdded: totalNews,
      totalProcessed: summaries.length,
      metricsUpdated: totalMetrics,
      errors: errors.length > 0 ? errors : undefined,
      blobError: blobError || undefined,
      data: summaries,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return Response.json(
      { ok: false, error: error.message, errors },
      { status: 500 }
    );
  }
}
