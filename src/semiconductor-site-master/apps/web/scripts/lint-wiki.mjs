import { buildWikiDataset, replaceLogSection } from "./wiki-shared.mjs";

const data = buildWikiDataset();
const pages = data.pages;
const unresolved = pages.flatMap((page) =>
  page.unresolvedLinks.map((link) => ({ page: page.slug, link }))
);

const orphanCandidates = pages.filter((page) => {
  if (page.type === "source") return false;
  if (["index", "overview", "log"].includes(page.slug)) return false;
  return page.backlinks.length === 0;
});

const processPages = [
  "photolithography",
  "etching",
  "diffusion",
  "ion-implantation",
  "thin-film-deposition",
  "cmp-cleaning",
  "high-k-metal-gate",
  "reactive-sputtering",
];

const chainIssues = processPages
  .map((slug) => pages.find((page) => page.slug === slug))
  .filter(Boolean)
  .filter((page) => {
    const linked = new Set(page.resolvedLinks);
    return !(
      linked.has("metrology") &&
      (linked.has("device-characterization") || linked.has("leakage-current")) &&
      (linked.has("yield-analysis") || linked.has("process-to-yield-pipeline"))
    );
  })
  .map((page) => page.slug);

const crossReferencePages = [
  "five-processes-source",
  "metrology-volume-1-source",
  "metrology-volume-2-source",
  "metrology-volume-3-source",
  "spotfire-week-1-source",
  "spotfire-week-2-source",
  "spotfire-week-3-source",
  "spotfire-lecture-source",
];

const weakCrossRefs = crossReferencePages
  .map((slug) => pages.find((page) => page.slug === slug))
  .filter(Boolean)
  .filter((page) => page.resolvedLinks.length < 4)
  .map((page) => page.slug);

const today = new Date().toISOString().slice(0, 10);
const report = `
## Lint Report (${today})
- unresolved wikilinks: ${unresolved.length}
- orphan pages: ${orphanCandidates.length}
- process→metrology→device→yield chain gaps: ${chainIssues.length}
- weak cross references: ${weakCrossRefs.length}

### Details
- unresolved: ${unresolved.length ? unresolved.map((item) => `[[${item.page}]] -> ${item.link}`).join(", ") : "none"}
- orphan pages: ${orphanCandidates.length ? orphanCandidates.map((page) => `[[${page.slug}]]`).join(", ") : "none"}
- chain gaps: ${chainIssues.length ? chainIssues.map((slug) => `[[${slug}]]`).join(", ") : "none"}
- weak cross references: ${weakCrossRefs.length ? weakCrossRefs.map((slug) => `[[${slug}]]`).join(", ") : "none"}
`;

replaceLogSection("wiki-lint", report);

if (unresolved.length > 0) {
  console.error("Unresolved wikilinks detected.");
  process.exit(1);
}

console.log("Wiki lint passed.");
