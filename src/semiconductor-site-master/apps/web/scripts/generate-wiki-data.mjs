import fs from "fs";
import { buildWikiDataset, outputPath, wikiDir, wikiDirCandidates, writeWikiDataset } from "./wiki-shared.mjs";

if (!wikiDir) {
  if (!fs.existsSync(outputPath)) {
    throw new Error(
      `No wiki source directory was found and no prebuilt dataset exists. Tried: ${wikiDirCandidates.join(", ")}`
    );
  }

  console.log(
    `Skipped wiki dataset generation because no wiki source directory was found. Using existing dataset at ${outputPath}.`
  );
} else {
  const data = buildWikiDataset();
  writeWikiDataset(data);
  console.log(
    `Generated wiki dataset with ${data.stats.pageCount} pages and ${data.stats.edgeCount} edges.`
  );
}
