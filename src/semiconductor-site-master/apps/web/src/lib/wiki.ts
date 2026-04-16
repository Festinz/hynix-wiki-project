import wikiData from "@/data/wiki.generated.json";

export type WikiPage = (typeof wikiData.pages)[number];
export type WikiNode = (typeof wikiData.nodes)[number];
export type WikiEdge = (typeof wikiData.edges)[number];

export const wikiGraph = wikiData;
export const wikiPages = wikiData.pages;
export const wikiNodes = wikiData.nodes;
export const wikiEdges = wikiData.edges;
export const wikiSlugByKey = wikiData.slugByKey as Record<string, string>;

export interface WikiSection {
  id: string;
  title: string;
  content: string;
}

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

export function slugifyWikiHeading(value: string) {
  return normalizeWikiKey(value);
}

export function resolveWikiSlug(target: string) {
  return wikiSlugByKey[normalizeWikiKey(target)] ?? null;
}

export function getWikiPage(slug: string) {
  return wikiPages.find((page) => page.slug === slug) ?? null;
}

export function parseWikiSections(content: string) {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");
  const sections: WikiSection[] = [];
  const introLines: string[] = [];
  let currentTitle: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (!currentTitle) return;
    sections.push({
      id: slugifyWikiHeading(currentTitle),
      title: currentTitle,
      content: currentLines.join("\n").trim(),
    });
  };

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+?)\s*$/);
    if (headingMatch) {
      flush();
      currentTitle = headingMatch[1].trim();
      currentLines = [];
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    } else {
      introLines.push(line);
    }
  }

  flush();

  return {
    intro: introLines.join("\n").trim(),
    sections: sections.filter((section) => section.title || section.content),
  };
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
