export const dynamic = "force-dynamic";

import {
  fetchLatestPapers,
  fetchTrends,
  generatePaperBriefWithPerplexity,
  generateTrendBriefWithPerplexity,
} from "@/lib/perplexity";
import { readTrends, writeTrends } from "@/lib/blob-store";

const TREND_TOPICS = [
  "HBM4 HBM5 packaging",
  "GAA MBCFET gate all around yield",
  "EUV High-NA lithography",
  "3D DRAM CMOS under array",
  "cryogenic etching semiconductor",
  "silicon photonics chip interconnect",
  "glass substrate advanced packaging",
  "GDDR7 GDDR8 GPU memory",
  "CXL memory pooling",
  "neuromorphic computing semiconductor",
  "backside power delivery network BSPDN",
  "chiplet heterogeneous integration",
  "CFET complementary FET",
  "molybdenum interconnect",
  "high bandwidth memory thermal management",
];

const PAPER_TOPICS = [
  "HBM TSV thermal reliability",
  "gate-all-around nanosheet transistor",
  "EUV stochastic defect",
  "3D NAND string stacking",
  "advanced DRAM capacitor high-k",
  "atomic layer deposition ALD",
  "hybrid bonding wafer-to-wafer",
  "ferroelectric FET FeRAM memory",
  "2D material transistor MoS2",
  "in-memory computing DRAM PIM",
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const errors: string[] = [];

  try {
    const shuffledTrends = [...TREND_TOPICS].sort(() => Math.random() - 0.5);
    const shuffledPapers = [...PAPER_TOPICS].sort(() => Math.random() - 0.5);
    const trendTopics = shuffledTrends.slice(0, 3);
    const paperTopics = shuffledPapers.slice(0, 2);

    const briefs = [];

    for (const topic of trendTopics) {
      try {
        const trendData = await fetchTrends(topic);
        const brief = await generateTrendBriefWithPerplexity(
          JSON.stringify(trendData)
        );

        briefs.push({
          ...brief,
          fetchedAt: new Date().toISOString(),
          topic,
          type: "trend",
        });
      } catch (error: any) {
        errors.push(`Trend "${topic}": ${error.message}`);
      }
    }

    for (const topic of paperTopics) {
      try {
        const paperData = await fetchLatestPapers(topic);
        const brief = await generatePaperBriefWithPerplexity(
          JSON.stringify(paperData)
        );

        briefs.push({
          ...brief,
          fetchedAt: new Date().toISOString(),
          topic,
          type: "paper",
        });
      } catch (error: any) {
        errors.push(`Paper "${topic}": ${error.message}`);
      }
    }

    if (briefs.length === 0) {
      return Response.json({
        ok: false,
        message: "All trend fetches failed",
        errors,
      });
    }

    let blobError = "";
    let totalTrends = briefs.length;

    try {
      const existing = await readTrends();
      const existingTitles = new Set(existing.map((entry: any) => entry.title));
      const newBriefs = briefs.filter((brief) => !existingTitles.has(brief.title));
      const updated = [...newBriefs, ...existing].slice(0, 50);

      await writeTrends(updated);
      totalTrends = updated.length;
    } catch (error: any) {
      blobError = error.message;
    }

    return Response.json({
      ok: true,
      newTrends: briefs.length,
      totalTrends,
      topics: [...trendTopics, ...paperTopics],
      errors: errors.length > 0 ? errors : undefined,
      blobError: blobError || undefined,
      data: briefs,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return Response.json(
      { ok: false, error: error.message, errors },
      { status: 500 }
    );
  }
}
