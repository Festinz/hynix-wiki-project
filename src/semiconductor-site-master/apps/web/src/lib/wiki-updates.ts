import { get, list } from "@vercel/blob";

import { searchWithPerplexity } from "@/lib/perplexity";
import { writeBlobJson } from "@/lib/blob-store";
import { getWikiPage } from "@/lib/wiki";

export interface WikiUpdateEntry {
  slug: string;
  title: string;
  content: string;
  citations: string[];
  query: string;
  related: string[];
  fetchedAt: string;
  uploadedAt?: string;
}

const TECHNICAL_TOPIC_HINTS: Record<string, string[]> = {
  diffusion: [
    "thermal diffusion semiconductor",
    "dopant diffusion annealing",
    "thermal oxidation silicon",
    "junction depth diffusion",
  ],
  "ion-implantation": [
    "ion implantation semiconductor",
    "dopant activation annealing",
    "rapid thermal annealing implant damage recovery",
    "shallow junction implantation",
  ],
  annealing: [
    "rapid thermal annealing semiconductor",
    "dopant activation anneal",
    "implant damage recovery",
    "flash annealing laser annealing",
  ],
  rta: [
    "rapid thermal annealing semiconductor",
    "RTA dopant activation",
    "short anneal thermal budget",
  ],
  "thermal-oxidation": [
    "thermal oxidation silicon semiconductor",
    "Si consumption oxide growth",
    "gate oxide oxidation process",
  ],
  "high-k-metal-gate": [
    "high-k metal gate semiconductor",
    "HfO2 TiN gate stack",
    "gate leakage work function",
  ],
  "reactive-sputtering": [
    "reactive sputtering semiconductor",
    "target poisoning thin film deposition",
    "PVD process control sputtering",
  ],
  hbm: [
    "HBM semiconductor packaging",
    "TSV MR-MUF thermal reliability",
    "HBM4 memory stack",
  ],
  tsv: [
    "TSV thermal reliability semiconductor",
    "through silicon via bonding",
    "3D packaging stress reliability",
  ],
};

function buildWikiUpdateQuery(slug: string) {
  const page = getWikiPage(slug);
  if (!page) {
    throw new Error(`Unknown wiki slug: ${slug}`);
  }

  const related = page.resolvedLinks.slice(0, 8).join(", ");
  const tagText = page.tags.join(", ");
  const aliases = Array.isArray(page.aliases) ? page.aliases.join(", ") : "";
  const topicHints = TECHNICAL_TOPIC_HINTS[slug]?.join(", ") || "";

  return {
    page,
    query: `Find only semiconductor updates from the last 7 days that are directly relevant to this wiki topic.

Primary topic: "${page.title}"
Slug: "${slug}"
Aliases: ${aliases || "none"}
Technical search hints: ${topicHints || "none"}

Hard rules:
- Prefer process, device, materials, yield, reliability, packaging, or manufacturing updates that explicitly mention this topic or its immediate technical neighbors.
- Do NOT substitute generic company news, stock/market news, earnings, or broad AI industry news unless they directly change this exact topic.
- If there is no direct update in the last 7 days, say "직접적인 최근 업데이트 없음" first, then list at most 2 adjacent developments and explain why they are only adjacent.

Use the existing wiki context only as grounding:
- related nodes: ${related || "none"}
- tags: ${tagText || "none"}

Return:
1. numbered bullets of key updates
2. why each update matters
3. which existing wiki nodes should connect
4. source URLs
5. when relevance is weak, explicitly label it as adjacent rather than direct`,
  };
}

export async function generateWikiUpdate(slug: string) {
  if (!process.env.PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY is not configured.");
  }

  const { page, query } = buildWikiUpdateQuery(slug);
  const response = await searchWithPerplexity(query, "sonar-pro", {
    recency: "week",
    systemPrompt:
      "You are updating a personal semiconductor knowledge wiki. Only return factual updates from the last 7 days that are directly relevant to the requested technical topic. Avoid generic market filler. If there are no direct updates, say so explicitly instead of fabricating weak matches. Always include source URLs.",
  });

  const entry: WikiUpdateEntry = {
    slug,
    title: page.title,
    content: response.choices?.[0]?.message?.content?.trim() || "",
    citations: response.citations || [],
    query,
    related: page.resolvedLinks.slice(0, 8),
    fetchedAt: new Date().toISOString(),
  };

  const timestampKey = entry.fetchedAt.replace(/[:.]/g, "-");
  const key = `wiki/_updates/${slug}/${timestampKey}.json`;
  await writeBlobJson(key, entry);

  return entry;
}

export async function listWikiUpdates(slug: string) {
  try {
    const { blobs } = await list({ prefix: `wiki/_updates/${slug}/`, limit: 10 });
    const sorted = [...blobs].sort((a, b) => {
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });

    const updates: Array<WikiUpdateEntry | null> = await Promise.all(
      sorted.map(async (blob) => {
        const response = await get(blob.pathname, { access: "private" });
        if (!response || response.statusCode !== 200 || !response.stream) return null;
        const json = (await new Response(response.stream).json()) as WikiUpdateEntry;
        return {
          ...json,
          uploadedAt: new Date(blob.uploadedAt).toISOString(),
        };
      })
    );

    return updates.filter((item): item is WikiUpdateEntry => item !== null);
  } catch {
    return [];
  }
}
