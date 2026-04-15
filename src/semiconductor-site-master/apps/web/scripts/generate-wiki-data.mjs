import { buildWikiDataset, writeWikiDataset } from "./wiki-shared.mjs";

const data = buildWikiDataset();
writeWikiDataset(data);

console.log(`Generated wiki dataset with ${data.stats.pageCount} pages and ${data.stats.edgeCount} edges.`);
