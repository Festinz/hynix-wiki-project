import { list } from "@vercel/blob";

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

function buildWikiUpdateQuery(slug: string) {
  const page = getWikiPage(slug);
  if (!page) {
    throw new Error(`Unknown wiki slug: ${slug}`);
  }

  const related = page.resolvedLinks.slice(0, 8).join(", ");
  const tagText = page.tags.join(", ");

  return {
    page,
    query: `Find the most important semiconductor updates from the last 7 days about "${page.title}".
Focus on process, device, materials, yield, manufacturing, and market implications.
Use the existing wiki context only as grounding:
- related nodes: ${related || "none"}
- tags: ${tagText || "none"}

Return:
1. numbered bullets of key updates
2. why each update matters
3. which existing wiki nodes should connect
4. source URLs`,
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
      "You are updating a personal semiconductor knowledge wiki. Prioritize factual changes from the last 7 days, connect them to existing concepts, and always include source URLs.",
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

  const key = `wiki/_updates/${slug}/${entry.fetchedAt.slice(0, 10)}.json`;
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
        const response = await fetch(blob.url);
        if (!response.ok) return null;
        const json = (await response.json()) as WikiUpdateEntry;
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
