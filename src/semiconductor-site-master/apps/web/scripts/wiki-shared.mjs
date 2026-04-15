import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const projectRoot = path.resolve(process.cwd(), "../../../..");
export const wikiDir = path.join(projectRoot, "wiki");
export const outputPath = path.join(process.cwd(), "src", "data", "wiki.generated.json");

function walkMarkdownFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeKey(value) {
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

function extractWikiLinks(content) {
  return [...content.matchAll(/\[\[([^\]]+)\]\]/g)]
    .map((match) => match[1].trim())
    .filter(Boolean);
}

function resolveTarget(target, slugByKey) {
  const normalized = normalizeKey(target);
  return slugByKey[normalized] ?? null;
}

function buildExcerpt(content) {
  return content
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\-\s+/gm, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 220);
}

function getPageCategory(relativePath) {
  const directory = path.dirname(relativePath);
  return directory === "." ? "root" : directory.split(path.sep)[0];
}

export function buildWikiDataset() {
  const files = walkMarkdownFiles(wikiDir).filter((file) => {
    const relativePath = path.relative(wikiDir, file).replace(/\\/g, "/");
    return !relativePath.startsWith("_updates/");
  });

  const rawPages = files.map((file) => {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const relativePath = path.relative(wikiDir, file).replace(/\\/g, "/");
    const slug = path.basename(file, ".md");
    const title = String(data.title || slug);
    const category = getPageCategory(path.relative(wikiDir, file));

    return {
      slug,
      title,
      type: String(data.type || "concept"),
      category,
      path: relativePath,
      created: String(data.created || ""),
      updated: String(data.updated || data.created || ""),
      sources: Array.isArray(data.sources) ? data.sources.map(String) : [],
      confidence: String(data.confidence || "medium"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      content: content.trim(),
      excerpt: buildExcerpt(content),
      wikilinks: extractWikiLinks(content),
    };
  });

  const slugByKey = {};
  for (const page of rawPages) {
    const keys = [
      page.slug,
      page.title,
      page.slug.replace(/-/g, " "),
      page.title.replace(/-/g, " "),
    ];
    for (const key of keys) {
      const normalized = normalizeKey(key);
      if (normalized) slugByKey[normalized] = page.slug;
    }
  }

  const backlinksBySlug = Object.fromEntries(rawPages.map((page) => [page.slug, new Set()]));
  const edgeSet = new Set();

  const pages = rawPages.map((page) => {
    const resolvedLinks = [];
    const unresolvedLinks = [];

    for (const link of page.wikilinks) {
      const targetSlug = resolveTarget(link, slugByKey);
      if (!targetSlug) {
        unresolvedLinks.push(link);
        continue;
      }
      resolvedLinks.push(targetSlug);
      if (targetSlug !== page.slug) {
        backlinksBySlug[targetSlug].add(page.slug);
        edgeSet.add(`${page.slug}->${targetSlug}`);
      }
    }

    return {
      ...page,
      resolvedLinks: [...new Set(resolvedLinks)],
      unresolvedLinks: [...new Set(unresolvedLinks)],
      backlinks: [],
    };
  });

  const pageBySlug = Object.fromEntries(pages.map((page) => [page.slug, page]));
  for (const page of pages) {
    page.backlinks = [...backlinksBySlug[page.slug]];
  }

  const nodes = pages.map((page) => {
    const degree = page.backlinks.length + page.resolvedLinks.length;
    return {
      id: page.slug,
      slug: page.slug,
      label: page.title,
      type: page.type,
      category: page.category,
      degree,
      size: Math.max(10, Math.min(30, 10 + degree * 1.5)),
      updated: page.updated,
    };
  });

  const edges = [...edgeSet].map((edge) => {
    const [source, target] = edge.split("->");
    return { source, target };
  });

  const counts = pages.reduce((acc, page) => {
    acc[page.type] = (acc[page.type] || 0) + 1;
    return acc;
  }, {});

  const recent = [...pages]
    .sort((a, b) => String(b.updated).localeCompare(String(a.updated)))
    .slice(0, 12)
    .map((page) => ({
      slug: page.slug,
      title: page.title,
      updated: page.updated,
      type: page.type,
    }));

  return {
    generatedAt: new Date().toISOString(),
    stats: {
      pageCount: pages.length,
      edgeCount: edges.length,
      typeCounts: counts,
    },
    slugByKey,
    pages,
    nodes,
    edges,
    recent,
    pageBySlug,
  };
}

export function writeWikiDataset(data) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function replaceLogSection(sectionTitle, body) {
  const logPath = path.join(wikiDir, "log.md");
  const markerStart = `<!-- ${sectionTitle}:start -->`;
  const markerEnd = `<!-- ${sectionTitle}:end -->`;
  const current = fs.existsSync(logPath) ? fs.readFileSync(logPath, "utf8") : "";
  const nextSection = `${markerStart}\n${body.trim()}\n${markerEnd}`;

  if (current.includes(markerStart) && current.includes(markerEnd)) {
    const replaced = current.replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`),
      nextSection
    );
    fs.writeFileSync(logPath, replaced, "utf8");
    return;
  }

  const suffix = current.endsWith("\n") ? "" : "\n";
  fs.writeFileSync(logPath, `${current}${suffix}\n${nextSection}\n`, "utf8");
}
