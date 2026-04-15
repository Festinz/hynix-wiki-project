import wikiData from "@/data/wiki.generated.json";

export type WikiPage = (typeof wikiData.pages)[number];
export type WikiNode = (typeof wikiData.nodes)[number];
export type WikiEdge = (typeof wikiData.edges)[number];

export const wikiGraph = wikiData;
export const wikiPages = wikiData.pages;
export const wikiNodes = wikiData.nodes;
export const wikiEdges = wikiData.edges;
export const wikiSlugByKey = wikiData.slugByKey as Record<string, string>;

function normalizeWikiKey(value: string) {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[#|].*$/, "")
    .replace(/[\\/]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveWikiSlug(target: string) {
  return wikiSlugByKey[normalizeWikiKey(target)] ?? null;
}

export function getWikiPage(slug: string) {
  return wikiPages.find((page) => page.slug === slug) ?? null;
}

export function renderWikiMarkdown(content: string) {
  return content.replace(/\[\[([^\]]+)\]\]/g, (_, rawTarget: string) => {
    const target = rawTarget.trim();
    const [labelPart] = target.split("|");
    const label = labelPart.replace(/#.*/, "").trim();
    const slug = resolveWikiSlug(label);
    return slug ? `[${label}](/wiki/${slug})` : `**${label}**`;
  });
}

export function getBacklinkPages(slug: string) {
  const page = getWikiPage(slug);
  if (!page) return [];
  return page.backlinks
    .map((targetSlug) => getWikiPage(targetSlug))
    .filter((candidate): candidate is WikiPage => Boolean(candidate));
}
