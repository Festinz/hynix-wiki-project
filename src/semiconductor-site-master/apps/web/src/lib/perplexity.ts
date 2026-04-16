const PERPLEXITY_API = "https://api.perplexity.ai/chat/completions";

export interface PerplexityResponse {
  choices?: { message?: { content?: string } }[];
  citations?: string[];
}

export interface NewsSummary {
  title: string;
  summary: string;
  category: string;
  importance: string;
  company: string;
  date: string;
  sourceUrl: string | null;
  sourceName: string;
  region: string;
  metricsUpdates?: {
    product: string;
    company: string;
    field: string;
    value: string;
  }[];
}

export interface TrendBrief {
  title: string;
  summary: string;
  whyImportant: string;
  howToStudy: string;
  interviewTip?: string;
  relatedTopics: string[];
  difficulty: string;
  sources: string[];
}

function parseJsonResponse<T>(text: string): T {
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    const objectMatch = cleaned.match(/\{[\s\S]*\}/);
    const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
    const candidate = objectMatch?.[0] || arrayMatch?.[0];

    if (!candidate) {
      throw new Error(`Failed to parse JSON: ${cleaned.slice(0, 200)}`);
    }

    return JSON.parse(candidate) as T;
  }
}

async function callPerplexity(
  messages: { role: "system" | "user"; content: string }[],
  options?: { model?: "sonar" | "sonar-pro"; recency?: "day" | "week" | "month" }
): Promise<PerplexityResponse> {
  const res = await fetch(PERPLEXITY_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: options?.model || "sonar",
      messages,
      return_citations: true,
      search_recency_filter: options?.recency || "week",
    }),
  });

  if (!res.ok) {
    throw new Error(`Perplexity API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function searchWithPerplexity(
  query: string,
  model: "sonar" | "sonar-pro" = "sonar",
  options?: { recency?: "day" | "week" | "month"; systemPrompt?: string }
): Promise<PerplexityResponse> {
  return callPerplexity(
    [
      {
        role: "system",
        content:
          options?.systemPrompt ||
          "You are a semiconductor research assistant. Provide factual, source-backed results and include citations when available.",
      },
      { role: "user", content: query },
    ],
    { model, recency: options?.recency }
  );
}

function responseText(response: PerplexityResponse): string {
  const content = response?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Perplexity response did not contain any message content.");
  }

  return content;
}

export async function summarizeNewsWithPerplexity(
  article: string,
  citations: string[] = [],
  source?: string
): Promise<NewsSummary> {
  const isGlobal = source === "global";
  const today = new Date().toISOString().split("T")[0];
  const citationText =
    citations.length > 0 ? `Candidate source URLs: ${citations.join(", ")}` : "Candidate source URLs: none";

  const response = await callPerplexity(
    [
      {
        role: "system",
        content:
          "You are a semiconductor news editor. Return exactly one JSON object, no markdown, no prose outside JSON.",
      },
      {
        role: "user",
        content: `Analyze the article fragment below and normalize it into JSON.

Article fragment:
${article}

${citationText}

Rules:
- If the article is global/non-Korean, still return Korean title and Korean summary.
- Keep the summary to exactly 3 Korean bullet-like sentences joined as one short paragraph.
- Choose category from: hbm, foundry, memory, packaging, market, ai-chip, process, other.
- Choose importance from: breaking, major, normal.
- Choose company from: samsung, hynix, tsmc, intel, micron, nvidia, both, industry.
- Use region "${isGlobal ? "global" : "kr"}".
- Use sourceUrl null if unclear.
- metricsUpdates can be an empty array.
- Return today's date unless the article clearly states a more precise publication date.

Return this exact shape:
{
  "title": "Korean title within 25 chars if possible",
  "summary": "Three-sentence Korean summary",
  "category": "hbm|foundry|memory|packaging|market|ai-chip|process|other",
  "importance": "breaking|major|normal",
  "company": "samsung|hynix|tsmc|intel|micron|nvidia|both|industry",
  "date": "${today}",
  "sourceUrl": "url-or-null",
  "sourceName": "publisher name",
  "region": "${isGlobal ? "global" : "kr"}",
  "metricsUpdates": [
    {
      "product": "HBM4|DDR5|GDDR7|LPDDR6|NAND",
      "company": "samsung|hynix",
      "field": "pinSpeed|bandwidth|capacity|powerEfficiency|actualAchieved",
      "value": "string value"
    }
  ]
}`,
      },
    ],
    { model: "sonar-pro", recency: "week" }
  );

  return parseJsonResponse<NewsSummary>(responseText(response));
}

export async function generateTrendBriefWithPerplexity(trendData: string): Promise<TrendBrief> {
  const response = await callPerplexity(
    [
      {
        role: "system",
        content:
          "You are a semiconductor trend analyst. Return exactly one JSON object, no markdown.",
      },
      {
        role: "user",
        content: `Read the research and industry notes below, then synthesize a study brief in Korean.

Source material:
${trendData}

Rules:
- Keep the writing accurate but readable for a semiconductor learner.
- relatedTopics must contain existing wiki-style slugs when possible.
- sources must be a list of URLs only.

Return this shape:
{
  "title": "short Korean title",
  "summary": "3-sentence Korean summary",
  "whyImportant": "Why this matters for semiconductor manufacturing and roadmap",
  "howToStudy": "How to study this topic from fundamentals to applications",
  "interviewTip": "Optional but concise Korean talking point",
  "relatedTopics": ["slug-1", "slug-2"],
  "difficulty": "beginner|intermediate|advanced",
  "sources": ["https://..."]
}`,
      },
    ],
    { model: "sonar-pro", recency: "month" }
  );

  return parseJsonResponse<TrendBrief>(responseText(response));
}

export async function generatePaperBriefWithPerplexity(paperData: string): Promise<TrendBrief> {
  const response = await callPerplexity(
    [
      {
        role: "system",
        content:
          "You are a semiconductor research analyst. Return exactly one JSON object, no markdown.",
      },
      {
        role: "user",
        content: `Read the paper list below and synthesize a Korean research brief.

Source material:
${paperData}

Rules:
- Focus on what changed technically and why it matters in production.
- relatedTopics must be wiki-style slugs when possible.
- sources must be a list of direct paper or publication URLs.

Return this shape:
{
  "title": "short Korean title",
  "summary": "3-sentence Korean summary",
  "whyImportant": "Why the papers matter for device/process/product direction",
  "howToStudy": "How to connect these papers to core semiconductor concepts",
  "interviewTip": "Optional but concise Korean talking point",
  "relatedTopics": ["slug-1", "slug-2"],
  "difficulty": "beginner|intermediate|advanced",
  "sources": ["https://..."]
}`,
      },
    ],
    { model: "sonar-pro", recency: "month" }
  );

  return parseJsonResponse<TrendBrief>(responseText(response));
}

export async function fetchSemiNews(company: "samsung" | "hynix") {
  const companyName = company === "samsung" ? "Samsung Electronics" : "SK hynix";
  const keywords =
    company === "samsung"
      ? "HBM DDR GDDR foundry GAA EUV 3nm 2nm"
      : "HBM DDR GDDR LPDDR NAND MR-MUF CXL packaging";

  const query = `Find the latest 2026 semiconductor news about ${companyName}.
Focus on ${keywords}.
Search Korean business and tech media when available.
List at least 5 items in numbered form, each with title, 2-3 sentence summary, and source URL.`;

  return searchWithPerplexity(query, "sonar", {
    systemPrompt:
      "You are a semiconductor news researcher. Provide concise factual coverage with source URLs.",
  });
}

export async function fetchGlobalNews() {
  return searchWithPerplexity(
    `Latest 2026 semiconductor industry news involving Samsung, SK hynix, TSMC, Intel, Micron, NVIDIA, and AMD.
Topics: HBM, DDR5, GDDR7, advanced packaging, GAA, EUV High-NA, foundry, AI chips, DRAM, NAND.
List at least 5 items in numbered form, each with title, 2-3 sentence summary, and source URL.`,
    "sonar",
    {
      systemPrompt:
        "You are a global semiconductor industry researcher. Provide factual updates with source URLs.",
    }
  );
}

export async function fetchLatestPapers(topic: string) {
  return searchWithPerplexity(
    `Find the most recent academic papers and research publications about semiconductor ${topic} from 2025 to 2026.
Search specifically on arxiv.org, ieee.org, nature.com, science.org, acs.org, springer.com, and iedm.org.
For each paper provide title, authors, venue, 2-3 sentence key findings, and direct URL.
List at least 3 to 5 papers in numbered form.`,
    "sonar-pro",
    {
      recency: "month",
      systemPrompt:
        "You are an academic research specialist in semiconductor technology. Cite only real papers with verifiable URLs.",
    }
  );
}

export async function fetchTrends(topic: string) {
  return searchWithPerplexity(
    `Summarize the latest 2025-2026 developments for semiconductor ${topic}.
Search across academic papers, industry reports, and technical media.
For each item include title, source, key details, why it matters for manufacturing, and source URL.
List at least 3 to 5 items in numbered form.`,
    "sonar-pro",
    { recency: "month" }
  );
}
