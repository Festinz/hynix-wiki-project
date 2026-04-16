import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const WIKI_DIR = path.join(ROOT, "wiki");
const TODAY = new Date().toISOString().slice(0, 10);

const SOURCE = {
  metaGuide: "raw/core/반도체 정리.pdf",
  fiveProcesses: "raw/core/hynix 지식 쌓기 5대 공정.pdf",
  hkmg: "raw/core/HKMG.docx",
  sputtering: "raw/core/Reactive Sputtering  발표자료.pptx",
  metrology1: "raw/metrology-yield/교안 1권.pdf",
  metrology2: "raw/metrology-yield/교안 2권.pdf",
  metrology3: "raw/metrology-yield/교안 3권.pdf",
  spotfireTerms: "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf",
  spotfireIssue: "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_2주차_ 반도체 산업 Hot Issue.pdf",
  spotfireData: "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_3주차_ 반도체 산업 데이터의 중요성.pdf",
  spotfireLecture: "raw/spotfire/[Lecture] Spotfire.pdf",
  fundamentals: "src/semiconductor-site-master/apps/web/src/data/fundamentals.json",
  hynixTech: "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json",
  metrics: "src/semiconductor-site-master/apps/web/src/data/metrics.json",
  news: "src/semiconductor-site-master/apps/web/src/data/news.json",
  ragKnowledge: "src/semiconductor-site-master/apps/web/src/data/rag-knowledge.json",
  claude: "CLAUDE.md",
};

const pages = [];

function extendPage(list, slug, patch) {
  const page = list.find((item) => item.slug === slug);
  if (!page) {
    throw new Error(`Unknown page slug: ${slug}`);
  }
  Object.assign(page, patch);
}

function addPage(page) {
  pages.push(page);
}

function lines(items) {
  return items.map((item) => `- ${item}`);
}

function renderPage(page) {
  const aliases = page.aliases ?? [page.title];
  const frontmatter = [
    "---",
    `title: "${page.title}"`,
    `type: ${page.type}`,
    `created: ${TODAY}`,
    `updated: ${TODAY}`,
    `aliases: [${aliases.map((alias) => `"${alias}"`).join(", ")}]`,
    `sources: [${page.sources.map((source) => `"${source}"`).join(", ")}]`,
    `confidence: ${page.confidence}`,
    `tags: [${page.tags.map((tag) => `"${tag}"`).join(", ")}]`,
    "---",
    "",
  ];

  const body = [
    `> ${page.quote}`,
    "",
    "## What",
    ...lines(page.what),
    "",
    "## How",
    ...lines(page.how),
    "",
    "## Why",
    ...lines(page.why),
    "",
    "## Measure",
    ...lines(page.measure),
    "",
    "## Connections",
    ...lines(page.connections),
    "",
    "## Open Questions",
    ...lines(page.questions),
    "",
  ];

  return `${frontmatter.join("\n")}${body.join("\n")}`;
}

function clearMarkdownFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      clearMarkdownFiles(fullPath);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      fs.unlinkSync(fullPath);
    }
  }
}

function ensureWikiDirs() {
  for (const subdir of ["concepts", "entities", "sources", "topics", "comparisons", "_updates"]) {
    fs.mkdirSync(path.join(WIKI_DIR, subdir), { recursive: true });
  }
}

function writeCatalog() {
  for (const page of pages) {
    const dirPath = page.dir === "root" ? WIKI_DIR : path.join(WIKI_DIR, page.dir);
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, `${page.slug}.md`), renderPage(page), "utf8");
  }
}

function buildIndexPage() {
  const sections = ["sources", "concepts", "entities", "topics", "comparisons"];
  const koreanLabels = {
    sources: "Source",
    concepts: "Concept",
    entities: "Entity",
    topics: "Topic",
    comparisons: "Comparison",
  };

  const body = [
    "---",
    'title: "위키 인덱스"',
    "type: topic",
    `created: ${TODAY}`,
    `updated: ${TODAY}`,
    'aliases: ["위키 인덱스"]',
    `sources: ["${SOURCE.claude}"]`,
    "confidence: high",
    'tags: ["index", "navigation", "catalog"]',
    "---",
    "",
    "> 이 위키의 출입문이다. 소스와 개념, 비교 노트를 빠르게 찾을 수 있도록 카테고리별로 묶어 둔다.",
    "",
    "## What",
    "- 이 페이지는 전체 위키의 목차이자 링크 허브다.",
    "- 새 페이지를 추가하거나 소스를 ingest할 때마다 이 인덱스가 함께 갱신되어야 한다.",
    "",
    "## How",
    "- 먼저 소스 노트에서 원문이 무엇을 말하는지 확인한 뒤, 연결된 개념 노트로 이동한다.",
    "- 특정 공정이나 문제를 따라갈 때는 개념 노트 → 엔티티 노트 → 비교 노트 순으로 읽으면 인과관계가 잘 보인다.",
    "",
    "## Why",
    "- Karpathy 패턴의 핵심은 개별 문서를 따로 읽는 것이 아니라, 새 소스가 기존 페이지들을 더 촘촘하게 만드는 데 있다.",
    "- 그래서 인덱스는 단순 목록이 아니라 현재 지식 체계의 밀도를 보여주는 지도 역할을 한다.",
    "",
    "## Measure",
    `- 현재 위키는 ${pages.length}개 노드로 구성되며, build 단계에서 JSON 그래프로 변환된다.`,
    "- 링크가 끊긴 페이지나 고립된 페이지가 없는지 lint 결과를 반드시 함께 본다.",
    "",
    "## Connections",
    "- [[전체 지식 지도]]",
    "- [[위키 로그]]",
  ];

  for (const section of sections) {
    body.push("", `## ${koreanLabels[section]}`);
    const items = pages
      .filter((page) => page.dir === section)
      .sort((a, b) => a.title.localeCompare(b.title, "ko"))
      .map((page) => `- [[${page.title}]]: ${page.summary}`);
    body.push(...items);
  }

  body.push(
    "",
    "## Open Questions",
    "- low confidence로 남겨둔 소스 페이지들을 다음 ingest 때 보강해야 한다.",
    "- Obsidian에서 어떤 경로로 탐색하는 것이 가장 자연스러운지, 실제 사용 패턴을 보며 인덱스 구조를 다시 다듬을 필요가 있다.",
    ""
  );

  fs.writeFileSync(path.join(WIKI_DIR, "index.md"), `${body.join("\n")}\n`, "utf8");
}

function writeOverviewPage() {
  const content = [
    "---",
    'title: "전체 지식 지도"',
    "type: topic",
    `created: ${TODAY}`,
    `updated: ${TODAY}`,
    'aliases: ["전체 지식 지도"]',
    `sources: ["${SOURCE.fiveProcesses}", "${SOURCE.metrology1}", "${SOURCE.metrology2}", "${SOURCE.metrology3}", "${SOURCE.spotfireLecture}", "${SOURCE.metaGuide}"]`,
    "confidence: high",
    'tags: ["overview", "map", "3-axis"]',
    "---",
    "",
    "> 이 위키는 공정기술 축, 계측→수율 축, 데이터·산업 축이 서로 교차하는 구조로 읽어야 가장 잘 보인다.",
    "",
    "## What",
    "- 첫 번째 축은 웨이퍼 위에 구조를 만드는 전공정 기술이다.",
    "- 두 번째 축은 공정 결과를 어떻게 측정하고, 소자 특성으로 해석하며, 수율로 환원하는가다.",
    "- 세 번째 축은 그렇게 쌓인 지식이 실제 메모리 산업과 데이터 분석, AI 기반 제조로 어떻게 이어지는가다.",
    "",
    "## How",
    "- 공정 축은 [[5대 공정]], [[포토리소그래피]], [[식각]], [[확산과 이온주입]], [[박막 증착]], [[CMP와 세정]]을 중심으로 읽는다.",
    "- 계측 축은 [[계측]], [[ADI CD]], [[ACI CD]], [[오버레이]], [[소자 특성 분석]], [[수율 분석]]으로 이어진다.",
    "- 누설/소자 축은 [[누설전류]], [[누설전류 억제 전략]], [[High-K Metal Gate]], [[FinFET]], [[GAA]]처럼 '왜 이 구조가 등장했는가'를 따라 읽는다.",
    "- 산업 축은 [[메모리 반도체]], [[HBM]], [[TSV]], [[MR-MUF]], [[산업 핫이슈]], [[데이터 기반 Fab]]으로 확장된다.",
    "",
    "## Why",
    "- 사용자가 원한 것은 시험 대비 요약집이 아니라, 흩어진 개념이 왜 연결되는지 보이는 지식 체계다.",
    "- 그래서 overview는 세 축을 분리해 보여주되, 실제로는 [[공정→계측→소자→수율 파이프라인]]에서 다시 만나는 구조를 강조한다.",
    "",
    "## Measure",
    "- 공정 노트는 가능한 한 모두 계측, 소자, 수율 링크를 함께 가진다.",
    "- overview의 링크만 따라가도 핵심 why 질문 열 가지에 도달할 수 있어야 한다.",
    "",
    "## Connections",
    "- [[위키 인덱스]]",
    "- [[공정 통합 맵]]",
    "- [[누설전류 억제 전략]]",
    "- [[공정→계측→소자→수율 파이프라인]]",
    "- [[계측에서 소자 특성으로]]",
    "- [[위키 로그]]",
    "",
    "## Open Questions",
    "- 저신뢰 소스인 [[소스 요약 - 교안 3권]]과 [[소스 요약 - Spotfire 3주차]]는 후속 보강이 필요하다.",
    "- 향후에는 패키징과 후공정 축을 별도 축으로 분리할지 검토할 필요가 있다.",
    "",
  ];

  fs.writeFileSync(path.join(WIKI_DIR, "overview.md"), `${content.join("\n")}\n`, "utf8");
}

function writeLogPage() {
  const content = [
    "---",
    'title: "위키 로그"',
    "type: topic",
    `created: ${TODAY}`,
    `updated: ${TODAY}`,
    'aliases: ["위키 로그"]',
    `sources: ["${SOURCE.claude}"]`,
    "confidence: high",
    'tags: ["log", "timeline", "operations"]',
    "---",
    "",
    "> ingest, 재생성, lint 결과를 누적 기록하는 운영 로그다.",
    "",
    "## What",
    "- 위키가 어떤 소스를 언제 반영했는지 남기는 작업 일지다.",
    "- 단순 성공 기록만이 아니라, 낮은 신뢰도나 추가 검증 필요 항목도 함께 남긴다.",
    "",
    "## How",
    "- 소스를 ingest할 때마다 생성/수정된 노트 묶음을 기록한다.",
    "- lint나 build에서 발견한 문제는 해결 여부까지 이 로그에 남긴다.",
    "",
    "## Why",
    "- LLM 위키는 채팅이 아니라 파일이 기억을 보존해야 하므로, 운영 흔적도 문서화되어야 한다.",
    "- 특히 이번처럼 인코딩 문제가 생겼을 때 무엇이 어떻게 다시 생성되었는지 추적 가능해야 한다.",
    "",
    "## Measure",
    "- 최신 lint 결과에서 unresolved wikilink 0, orphan page 0을 유지한다.",
    "- 소스 11개가 모두 source 페이지를 가지고 있는지 확인한다.",
    "",
    "## Connections",
    "- [[위키 인덱스]]",
    "- [[전체 지식 지도]]",
    "",
    "## Open Questions",
    "- Spotfire 2주차·3주차 소스는 추출 품질이 낮아, 후속 수기 보강이 계속 필요하다.",
    "",
    `## [${TODAY}] 재생성 | 한글 위키 복구`,
    "- 원인: PowerShell 기반 대량 생성 과정에서 다수 페이지가 `?` 문자로 치환되어 본문이 손상되었다.",
    "- 조치: raw 추출본과 기존 앱 데이터(`processes.json`, `fundamentals.json`, `rag-knowledge.json`)를 기준으로 wiki 전체를 UTF-8로 재생성했다.",
    "- 핵심 갱신: 공정 노트의 why 설명 강화, 공정→계측→소자→수율 링크 보강, SK하이닉스 메모리 컨텍스트와 데이터 분석 축 보강.",
    "",
  ];

  fs.writeFileSync(path.join(WIKI_DIR, "log.md"), `${content.join("\n")}\n`, "utf8");
}

function writeUpdatesReadme() {
  const content = [
    "---",
    'title: "최신 정보 저장 규칙"',
    "type: topic",
    `created: ${TODAY}`,
    `updated: ${TODAY}`,
    'aliases: ["최신 정보 저장 규칙"]',
    `sources: ["${SOURCE.claude}"]`,
    "confidence: high",
    'tags: ["updates", "perplexity", "automation"]',
    "---",
    "",
    "> 이 디렉터리는 Perplexity 기반 최신 정보 스냅샷을 날짜별 JSON으로 저장하는 자리다.",
    "",
    "## What",
    "- 각 위키 노드별 최신 뉴스, 논문, 업계 변화를 JSON으로 적재한다.",
    "",
    "## How",
    "- 수동 업데이트 버튼 또는 `/api/cron/wiki-updates`가 `wiki/_updates/<slug>/<YYYY-MM-DD>.json` 형태로 저장한다.",
    "",
    "## Why",
    "- 정적 위키 위에 동적인 업계 맥락을 덧붙여, 지식이 자라는 감각을 유지하기 위해서다.",
    "",
    "## Measure",
    "- 같은 slug에 대해 최신 7일 정보가 누적 저장되는지 확인한다.",
    "",
    "## Connections",
    "- [[위키 인덱스]]",
    "- [[위키 로그]]",
    "",
    "## Open Questions",
    "- 향후에는 요약 텍스트를 마크다운 스냅샷으로도 함께 남길지 검토할 수 있다.",
    "",
  ];

  fs.writeFileSync(path.join(WIKI_DIR, "_updates", "README.md"), `${content.join("\n")}\n`, "utf8");
}

const sourcePages = [
  {
    dir: "sources",
    slug: "five-processes-source",
    title: "소스 요약 - 5대 공정",
    type: "source",
    confidence: "high",
    tags: ["source", "phase1", "전공정", "데이터"],
    summary: "5대 공정과 데이터 4종류, SPC/FDC, 미세화 이후 공정 관리의 기본 뼈대를 제공한 핵심 소스.",
    sources: [SOURCE.fiveProcesses],
    quote: "이 소스는 전공정 흐름과 데이터 해석의 기본 프레임을 동시에 잡아 준다.",
    what: [
      "포토, 식각, 확산/이온주입, 박막 증착, CMP·세정을 하나의 전공정 흐름으로 설명한다.",
      "계측 데이터, 설비 데이터, 소자 데이터, 수율 데이터라는 네 가지 데이터 축을 동시에 제시한다.",
    ],
    how: [
      "[source:hynix 지식 쌓기 5대 공정.pdf]를 바탕으로 [[5대 공정]], [[SPC]], [[FDC]], [[공정→계측→소자→수율 파이프라인]] 페이지를 구성했다.",
      "공정 설명을 단순 정의가 아니라 why 질문과 데이터 해석 관점으로 재배치하는 출발점이 되었다.",
    ],
    why: [
      "이 소스가 중요한 이유는 공정을 따로 떼어 보지 않고, 공정 결과를 데이터로 읽는 관점을 동시에 주기 때문이다.",
      "특히 면접형 문답 구조가 아니라 실제 문제 해결 흐름처럼 설비→계측→소자→수율을 연결한다는 점이 위키의 뼈대와 잘 맞는다.",
    ],
    measure: [
      "대표 계측 항목으로 ADI CD, ACI CD, Overlay, 두께, Defect Count가 제시된다.",
      "대표 소자 항목으로 Vth, SS, DIBL, 전류가 제시되며, 이들이 수율과 연결된다는 점이 중요하다.",
    ],
    connections: [
      "[[5대 공정]]",
      "[[포토리소그래피]]",
      "[[식각]]",
      "[[확산과 이온주입]]",
      "[[박막 증착]]",
      "[[CMP와 세정]]",
      "[[SPC]]",
      "[[FDC]]",
    ],
    questions: [
      "원문에 있는 일부 실무 조언과 공정 설명을 어디까지 위키 본문으로 승격할지 추가 정리가 필요하다.",
    ],
  },
  {
    dir: "sources",
    slug: "hkmg-source",
    title: "소스 요약 - HKMG",
    type: "source",
    confidence: "high",
    tags: ["source", "phase1", "HKMG", "MOSFET"],
    summary: "SiO2+Poly-Si의 한계와 High-k+Metal Gate의 도입 배경을 단계적으로 설명한 심화 소스.",
    sources: [SOURCE.hkmg],
    quote: "이 소스는 High-k와 Metal Gate를 한 묶음이 아니라 서로 다른 문제를 푸는 두 개의 답으로 분리해서 보게 만든다.",
    what: [
      "게이트 산화막과 게이트 전극이 왜 동시에 바뀌었는지를 구조적으로 설명한다.",
      "poly depletion, Fermi level pinning, leakage, Vth tuning 같은 핵심 문제를 한 흐름으로 연결한다.",
    ],
    how: [
      "[source:HKMG.docx]를 바탕으로 [[High-K Metal Gate]], [[High-k 유전체]], [[금속 게이트]], [[폴리실리콘 게이트]], [[폴리실리콘 게이트 vs 금속 게이트]]를 재구성했다.",
      "기존 공정 페이지의 thin film, ALD, leakage current 설명도 이 소스의 관점에 맞게 교차 업데이트했다.",
    ],
    why: [
      "HKMG는 단순히 '새 재료를 썼다'가 아니라, 누설 문제와 게이트 제어 문제를 분리해서 해결한 기술적 절충의 결과다.",
      "이 소스 덕분에 사용자가 특히 중요하게 본 '왜 poly-Si에서 다시 metal gate로 돌아왔는가'를 명시적으로 설명할 수 있다.",
    ],
    measure: [
      "핵심 검증 항목은 gate leakage, EOT, threshold voltage, mobility, subthreshold slope, DIBL이다.",
      "High-k가 두꺼운 물리막으로도 같은 정전용량을 만드는지와 Metal Gate가 work function tuning을 얼마나 안정화하는지가 중요하다.",
    ],
    connections: [
      "[[High-K Metal Gate]]",
      "[[High-k 유전체]]",
      "[[금속 게이트]]",
      "[[폴리실리콘 게이트]]",
      "[[폴리실리콘 게이트 vs 금속 게이트]]",
      "[[누설전류]]",
    ],
    questions: [
      "gate-first와 gate-last의 공정 통합 차이를 별도 비교 노트로 확장할 여지가 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "reactive-sputtering-source",
    title: "소스 요약 - Reactive Sputtering 발표자료",
    type: "source",
    confidence: "high",
    tags: ["source", "phase1", "PVD", "실험"],
    summary: "Ar 플라즈마, N2 유량, 파워 강도, 두께·저항 데이터까지 포함한 reactive sputtering 실험 소스.",
    sources: [SOURCE.sputtering],
    quote: "이 소스는 증착을 원리로만 설명하지 않고, 공정 파라미터와 실험 데이터로 읽게 만든다.",
    what: [
      "PVD 기반 sputtering 메커니즘과 reactive gas를 넣었을 때의 공정 변화를 설명한다.",
      "Power intensity와 N2 flow를 바꾸며 thickness와 sheet resistance를 비교한 실험 결과가 포함되어 있다.",
    ],
    how: [
      "[source:Reactive Sputtering 발표자료.pptx]를 바탕으로 [[Reactive Sputtering]], [[Target Poisoning]], [[아르곤]], [[PVD vs CVD vs ALD]]를 구성했다.",
      "저항 데이터는 조건 변화가 단순 선형이 아니라 공정 전환 영역을 가진다는 점을 보여 주는 사례로 사용했다.",
    ],
    why: [
      "reactive sputtering의 핵심은 단순 막 증착이 아니라, 조성 제어와 poisoning 억제 사이에서 공정창을 찾는 데 있다.",
      "이 소스는 '왜 Ar인가'와 '왜 reactive gas가 많아지면 오히려 공정이 불안정해지는가'를 실제 데이터와 연결해 준다.",
    ],
    measure: [
      "발표자료에는 point별 sheet resistance와 non-uniformity가 제시되어 있다.",
      "thickness, resistance, uniformity를 함께 봐야 target poisoning과 compound mode 전환을 해석할 수 있다.",
    ],
    connections: [
      "[[Reactive Sputtering]]",
      "[[Target Poisoning]]",
      "[[아르곤]]",
      "[[박막 증착]]",
      "[[PVD vs CVD vs ALD]]",
    ],
    questions: [
      "실험에서 사용한 target 재료와 실제 양산 공정의 대응 관계를 더 명확히 붙일 필요가 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "meta-guide-source",
    title: "소스 요약 - 반도체 정리 보강 지침",
    type: "source",
    confidence: "high",
    tags: ["source", "phase1", "schema", "why"],
    summary: "이 위키를 어떤 관점으로 써야 하는지, 특히 왜 질문을 중심에 두어야 하는지를 규정한 메타 소스.",
    sources: [SOURCE.metaGuide],
    quote: "이 문서는 기술 소개보다 기술 선택의 이유를 중심으로 위키를 재구성하라는 직접 지침이다.",
    what: [
      "공정 설명을 What→How→Why 순서로 쓰고, 재료·가스·구조 선택 이유를 반드시 설명하라고 요구한다.",
      "특히 diffusion vs ion implantation, Ar, 할로젠 식각, metal gate 회귀, ALD window, MR-MUF 같은 why 질문을 핵심 축으로 제시한다.",
    ],
    how: [
      "모든 개념 페이지가 동일한 섹션 구조를 따르게 한 직접 근거가 이 문서다.",
      "새 소스가 들어올 때 기존 페이지 10~15개가 동시에 풍부해져야 한다는 Karpathy 패턴도 이 문서의 요구를 따른다.",
    ],
    why: [
      "이 소스는 위키의 목적이 단순 정리나 면접 대비가 아니라, 머릿속 파편 지식을 하나의 연결 체계로 컴파일하는 데 있음을 명확히 한다.",
      "그래서 이 페이지는 사실상 설계도이자 품질 기준이다.",
    ],
    measure: [
      "각 페이지가 Why 섹션을 충분히 가지는지, 연결 노트가 살아 있는지, orphan 페이지가 없는지를 이 문서를 기준으로 점검한다.",
      "핵심 why 질문 열 가지가 overview에서 모두 따라갈 수 있어야 한다.",
    ],
    connections: [
      "[[위키 인덱스]]",
      "[[전체 지식 지도]]",
      "[[5대 공정]]",
      "[[High-K Metal Gate]]",
      "[[Reactive Sputtering]]",
      "[[SPC와 FDC 비교]]",
    ],
    questions: [
      "향후 패키징과 후공정 영역까지 확장할 때도 같은 why 기준을 유지할지 세부 가이드를 보강할 필요가 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "metrology-volume-1-source",
    title: "소스 요약 - 교안 1권",
    type: "source",
    confidence: "medium",
    tags: ["source", "phase2", "계측", "공정흐름"],
    summary: "공정 step 시퀀스, ADI/ACI/Overlay와 같은 대표 계측 포인트, 공정 레시피 흐름을 연결한 계측 입문 소스.",
    sources: [SOURCE.metrology1],
    quote: "이 소스는 공정이 끝난 뒤 무엇을 재고, 그 측정값이 어느 step에 붙는지 보여 준다.",
    what: [
      "공정 sequence 안에서 Overlay, ADI CD, ACI CD, Thickness 같은 계측 step이 어디에 붙는지 보여 준다.",
      "CVD, diffusion, metal 같은 공정 기술이 계측과 어떻게 연결되는지 개괄적으로 설명한다.",
    ],
    how: [
      "[source:교안 1권.pdf]를 기준으로 [[계측]], [[ADI CD]], [[ACI CD]], [[오버레이]] 페이지를 만들고 각 공정 페이지에 계측 링크를 심었다.",
      "특히 photo 이후 ADI, etch 이후 ACI를 측정한다는 흐름이 공정 노트와 직접 연결되도록 반영했다.",
    ],
    why: [
      "같은 CD라도 언제 재느냐에 따라 의미가 달라지므로, 공정 step과 계측 step을 함께 보는 관점이 중요하다.",
      "이 소스는 계측을 독립적 기능이 아니라 공정 결과를 해석하는 언어로 보게 만든다.",
    ],
    measure: [
      "대표 계측 값은 Overlay, ADI CD, ACI CD, Thickness다.",
      "레시피와 step sequence를 함께 보면 어떤 공정 조건 변화가 어떤 계측 값에 먼저 반영되는지 추적할 수 있다.",
    ],
    connections: [
      "[[계측]]",
      "[[ADI CD]]",
      "[[ACI CD]]",
      "[[오버레이]]",
      "[[포토리소그래피]]",
      "[[식각]]",
    ],
    questions: [
      "측정 장비별 원리와 해상도 차이는 별도 확장 노트로 더 넣을 수 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "metrology-volume-2-source",
    title: "소스 요약 - 교안 2권",
    type: "source",
    confidence: "medium",
    tags: ["source", "phase2", "소자", "전기특성"],
    summary: "Vtsat, Idsat 등 소자 특성 데이터 예시를 통해 계측 결과가 전기적 성능으로 어떻게 이어지는지 보여 준 소스.",
    sources: [SOURCE.metrology2],
    quote: "이 소스는 패턴과 막 두께의 차이가 결국 Vth와 구동 전류 차이로 나타난다는 사실을 수치 예시로 보여 준다.",
    what: [
      "wafer site별 Vtsat, Idsat 예시를 통해 소자 특성 분석 데이터의 형태를 보여 준다.",
      "계측 항목과 소자 항목이 같은 lot/wafer 맥락에서 함께 읽혀야 함을 보여 준다.",
    ],
    how: [
      "[source:교안 2권.pdf]를 반영해 [[소자 특성 분석]], [[문턱전압]], [[Subthreshold Slope]], [[DIBL]], [[누설전류]] 노트를 구체화했다.",
      "공정 페이지의 Measure와 Connections에 소자 특성 링크를 넣어, 공정 변화가 전기적 결과로 이어지는 다리를 만들었다.",
    ],
    why: [
      "계측 값만 맞았다고 공정이 좋은 것이 아니라, 최종적으로는 전기적 사양을 만족해야 의미가 있다.",
      "이 소스는 공정-계측-소자의 세 번째 다리, 즉 소자 특성 해석의 중요성을 보강해 준다.",
    ],
    measure: [
      "대표 값으로 Vtsat, Idsat, site별 분포가 제시된다.",
      "같은 스펙 범위 안에 있더라도 공간 분포가 다르면 공정 기인 variation을 의심해야 한다.",
    ],
    connections: [
      "[[소자 특성 분석]]",
      "[[문턱전압]]",
      "[[Subthreshold Slope]]",
      "[[DIBL]]",
      "[[누설전류]]",
      "[[공정→계측→소자→수율 파이프라인]]",
    ],
    questions: [
      "소자 특성 측정 장비의 세부 셋업과 파라미터 정의는 후속 보강이 필요하다.",
    ],
  },
  {
    dir: "sources",
    slug: "metrology-volume-3-source",
    title: "소스 요약 - 교안 3권",
    type: "source",
    confidence: "low",
    tags: ["source", "phase2", "수율", "저신뢰"],
    summary: "수율 및 분석 흐름을 다루는 것으로 보이지만 텍스트 추출 품질이 낮아 구조적 힌트 위주로만 반영한 소스.",
    sources: [SOURCE.metrology3],
    quote: "이 소스는 방향은 맞지만, 현재 추출 품질만으로는 세부 내용을 강하게 단정하기 어렵다.",
    what: [
      "수율, 분석, 데이터 해석 흐름을 다루는 소스로 판단된다.",
      "다만 추출 텍스트가 매우 제한적이라 세부 주장보다는 큰 방향만 반영했다.",
    ],
    how: [
      "이 소스는 [[수율 분석]]과 [[공정→계측→소자→수율 파이프라인]]의 구조를 보강하는 참고 신호로 사용했다.",
      "직접 인용보다는 이미 확보된 5대 공정·Spotfire·계측 자료와의 교차 확인을 통해 반영했다.",
    ],
    why: [
      "불완전한 소스라도 전체 파이프라인에서 빠진 축이 무엇인지 알려주는 단서가 될 수 있다.",
      "다만 low confidence 플래그를 유지해야 위키 전체의 신뢰도가 오히려 올라간다.",
    ],
    measure: [
      "현재는 수율 관련 구조와 용어 수준만 반영했고, 세부 숫자나 사례는 채택하지 않았다.",
      "후속으로 PDF 원문을 수기 확인하거나 더 나은 OCR을 적용해야 한다.",
    ],
    connections: [
      "[[수율 분석]]",
      "[[공정→계측→소자→수율 파이프라인]]",
      "[[계측]]",
      "[[위키 로그]]",
    ],
    questions: [
      "교안 3권 원문을 다시 읽어 defective loss와 parametric loss의 구체 사례를 추가할 필요가 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "spotfire-week-1-source",
    title: "소스 요약 - Spotfire 1주차",
    type: "source",
    confidence: "medium",
    tags: ["source", "phase3", "용어", "산업입문"],
    summary: "반도체 핵심 용어와 메모리 반도체 기본 개념을 짧게 정리한 입문형 소스.",
    sources: [SOURCE.spotfireTerms],
    quote: "짧지만 용어 사전을 빠르게 맞추는 데는 꽤 유용한 소스다.",
    what: [
      "반도체, 메모리 반도체, DRAM, NAND, 문턱전압, 포토, 식각, 증착, 확산, CMP 같은 기본 용어를 정리한다.",
      "깊은 설명보다는 용어의 정의와 중요도 표시가 중심이다.",
    ],
    how: [
      "이 소스는 [[메모리 반도체]], [[DRAM]], [[NAND Flash]], [[문턱전압]] 같은 입문 노트의 정의 문장을 정리하는 데 활용했다.",
      "깊이 있는 why 설명은 다른 소스와 결합해 보강하고, 이 소스는 용어 표준화용으로 사용했다.",
    ],
    why: [
      "용어 정의가 맞지 않으면 이후 비교와 연결이 흐트러지므로, 입문 사전 역할이 필요하다.",
      "특히 Spotfire 계열 자료를 읽을 때 어떤 용어가 공정인지, 어떤 용어가 제품인지 빠르게 구분하는 데 도움이 된다.",
    ],
    measure: [
      "중요도 표기와 짧은 정의 외에 수치나 사례는 거의 없다.",
      "따라서 이 소스는 high confidence 용어 정의 보조용으로만 쓰고, 주장을 확장할 때는 다른 소스로 교차 확인한다.",
    ],
    connections: [
      "[[메모리 반도체]]",
      "[[DRAM]]",
      "[[NAND Flash]]",
      "[[문턱전압]]",
      "[[포토리소그래피]]",
      "[[식각]]",
    ],
    questions: [
      "비메모리 반도체 축을 얼마나 별도 확장할지는 후속 위키 범위 결정이 필요하다.",
    ],
  },
  {
    dir: "sources",
    slug: "spotfire-week-2-source",
    title: "소스 요약 - Spotfire 2주차",
    type: "source",
    confidence: "low",
    tags: ["source", "phase3", "산업", "핫이슈", "저신뢰"],
    summary: "EUV, 패키징, 메모리 반도체 이슈를 다루지만 텍스트 추출이 제한적이라 큰 축 위주로 반영한 산업 이슈 소스.",
    sources: [SOURCE.spotfireIssue],
    quote: "핫이슈의 주제 축은 분명하지만, 세부 내용은 원문 추출 품질 때문에 보수적으로 받아들여야 한다.",
    what: [
      "EUV, 패키징, 메모리 반도체를 산업 핫이슈의 세 축으로 제시한다.",
      "원문 일부만 살아 있어 세부 논리는 약하지만, 산업 컨텍스트의 큰 방향은 파악할 수 있다.",
    ],
    how: [
      "이 소스는 [[산업 핫이슈]], [[EUV]], [[HBM]], [[MR-MUF]], [[SK하이닉스 메모리 포지셔닝]]의 범주를 잡는 데 사용했다.",
      "세부 수치나 강한 주장 대신, 이미 다른 데이터와 뉴스에서 검증 가능한 방향성만 반영했다.",
    ],
    why: [
      "사용자 위키의 목적은 공정 지식을 산업 현실과 분리하지 않는 것이므로, 산업 이슈 소스도 반드시 축으로 포함되어야 한다.",
      "다만 텍스트 품질이 낮을수록 low confidence를 명시하는 것이 위키의 신뢰도에 유리하다.",
    ],
    measure: [
      "현 시점에서는 주제 분류와 연결 노드 생성에만 사용했고, 세부 숫자는 사용하지 않았다.",
      "후속 Perplexity 업데이트로 최신 이슈를 덧입히면 이 소스의 약점을 보완할 수 있다.",
    ],
    connections: [
      "[[산업 핫이슈]]",
      "[[EUV]]",
      "[[HBM]]",
      "[[MR-MUF]]",
      "[[SK하이닉스 메모리 포지셔닝]]",
    ],
    questions: [
      "패키징 섹션 원문을 다시 수집해 HBM과 advanced packaging 연결을 더 구체화할 필요가 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "spotfire-week-3-source",
    title: "소스 요약 - Spotfire 3주차",
    type: "source",
    confidence: "low",
    tags: ["source", "phase3", "데이터", "저신뢰"],
    summary: "반도체 산업에서 데이터의 중요성을 강조하는 소스지만 추출 품질이 낮아 구조적 메시지 위주로 반영한 자료.",
    sources: [SOURCE.spotfireData],
    quote: "세부 텍스트는 빈약하지만, 데이터 해석 역량이 왜 중요한지라는 메시지는 분명하다.",
    what: [
      "데이터가 중요해진 이유, 활용 사례, 필요한 역량과 도구라는 큰 목차가 보인다.",
      "반도체 산업의 의사결정이 공정 데이터 해석과 설득의 문제라는 메시지가 중심이다.",
    ],
    how: [
      "이 소스는 [[데이터 기반 Fab]], [[데이터 시각화]], [[수율 분석]]을 산업적 맥락에서 재정리하는 데 사용했다.",
      "원문 세부 대신 Spotfire lecture와 결합해 '왜 시각화와 분석이 필요한가'를 설명하는 축으로 사용했다.",
    ],
    why: [
      "반도체 엔지니어링은 데이터를 수집하는 것만으로 끝나지 않고, 원인을 좁히고 타인을 설득하는 해석 능력이 중요하다.",
      "이 관점은 사용자가 원하는 '살아 있는 지식'과 잘 맞는다.",
    ],
    measure: [
      "현재는 목차 수준 정보와 일부 문장만 살아 있어, low confidence로 유지한다.",
      "실제 사례를 추가하려면 향후 원문 재확인이 필요하다.",
    ],
    connections: [
      "[[데이터 기반 Fab]]",
      "[[데이터 시각화]]",
      "[[수율 분석]]",
      "[[위키 로그]]",
    ],
    questions: [
      "데이터 관련 tool 소개 파트를 더 복구하면 Spotfire/통계 기법 비교 노트까지 확장할 수 있다.",
    ],
  },
  {
    dir: "sources",
    slug: "spotfire-lecture-source",
    title: "소스 요약 - Spotfire 강의",
    type: "source",
    confidence: "medium",
    tags: ["source", "phase3", "시각화", "분석"],
    summary: "Spotfire 사용법보다도 데이터 시각화와 상관관계 분석이 반도체 엔지니어에게 왜 중요한지 보여 준 소스.",
    sources: [SOURCE.spotfireLecture],
    quote: "같은 데이터라도 어떻게 시각화하느냐에 따라 전혀 다른 인사이트가 나온다는 사실을 가장 직접적으로 보여 준다.",
    what: [
      "Spotfire의 목적과 시각화의 중요성, 엔지니어가 데이터를 해석하는 방식에 초점을 맞춘다.",
      "Anscombe's quartet, Simpson's paradox 같은 사례를 통해 숫자만 보는 위험을 설명한다.",
    ],
    how: [
      "[source:[Lecture] Spotfire.pdf]를 바탕으로 [[데이터 시각화]], [[데이터 기반 Fab]], [[SPC]], [[수율 분석]]을 데이터 해석 관점에서 확장했다.",
      "공정 상관관계 분석 예시를 통해 공정 엔지니어가 단순 보고가 아니라 원인 설명을 해야 한다는 점을 강조했다.",
    ],
    why: [
      "반도체 공정은 변수 수가 많고 서로 상호작용하므로, 표 하나만 보고 결론을 내리면 쉽게 착시가 생긴다.",
      "따라서 시각화는 장식이 아니라, 복잡한 공정 관계를 읽기 위한 사고 도구다.",
    ],
    measure: [
      "숫자 자체보다 분포, 추세, 상관관계, 그룹별 분해 결과를 함께 봐야 한다.",
      "시각화가 잘 되었는지의 기준은 '원인 가설을 더 빠르게 세울 수 있는가'다.",
    ],
    connections: [
      "[[데이터 시각화]]",
      "[[데이터 기반 Fab]]",
      "[[SPC]]",
      "[[수율 분석]]",
      "[[산업 핫이슈]]",
    ],
    questions: [
      "향후에는 실제 wafer map, scatter plot, parallel coordinates 예시를 위키 뷰어에 넣을지 검토할 수 있다.",
    ],
  },
];

const comparisonPages = [
  {
    dir: "comparisons",
    slug: "diffusion-vs-ion-implantation",
    title: "확산 vs 이온주입",
    type: "comparison",
    confidence: "high",
    tags: ["comparison", "도핑", "why"],
    summary: "열적 확산에서 이온주입+어닐링 조합으로 중심축이 이동한 이유를 비교한 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide],
    quote: "현대 반도체에서 중요한 것은 도핑을 '할 수 있는가'가 아니라 '원하는 위치와 농도로 제어할 수 있는가'다.",
    what: [
      "확산은 고온에서 불순물이 자연스럽게 퍼져 들어가는 방식이고, 이온주입은 전기장으로 가속한 이온을 원하는 깊이에 직접 박아 넣는 방식이다.",
      "두 방식 모두 도핑이라는 목적은 같지만, 프로파일 제어력과 후공정 영향이 크게 다르다.",
    ],
    how: [
      "확산은 등방적으로 퍼지므로 lateral diffusion이 커지고, junction 제어가 상대적으로 거칠다.",
      "이온주입은 dose와 energy로 농도와 깊이를 분리 제어할 수 있지만, 격자 손상을 만들기 때문에 [[RTA]] 같은 열처리가 필수다.",
    ],
    why: [
      "미세화가 진행될수록 도핑 위치가 수 nm 단위로 중요해지므로, '퍼지는' 방식보다 '주입하는' 방식이 유리하다.",
      "그래서 thermal diffusion 중심 공정에서 ion implantation + annealing 중심으로 축이 이동했다.",
    ],
    measure: [
      "비교 지표는 junction depth, sheet resistance, threshold voltage, lateral spread다.",
      "동일 목표 농도를 만들더라도 공정 후 소자 특성 variation이 얼마나 작은지가 중요하다.",
    ],
    connections: [
      "[[확산과 이온주입]]",
      "[[RTA]]",
      "[[LDD]]",
      "[[Halo Doping]]",
      "[[문턱전압]]",
    ],
    questions: [
      "millisecond anneal까지 포함한 최신 activation 전략을 이 비교에 추가할 필요가 있다.",
    ],
  },
  {
    dir: "comparisons",
    slug: "pvd-vs-cvd-vs-ald",
    title: "PVD vs CVD vs ALD",
    type: "comparison",
    confidence: "high",
    tags: ["comparison", "증착", "박막"],
    summary: "막을 어떻게 만들 것인가보다 어떤 구조와 온도 조건에서 어떤 방식이 유리한지 비교하는 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.sputtering, SOURCE.metaGuide],
    quote: "증착 방식의 선택은 막 재료보다 구조와 온도, step coverage 요구사항이 더 크게 결정한다.",
    what: [
      "PVD는 물리적으로 튀겨서 붙이고, CVD는 기상 반응으로 만들며, ALD는 self-limiting 반응으로 한 층씩 쌓는다.",
      "세 방식은 모두 증착이지만, 방향성·균일성·속도·온도창이 서로 다르다.",
    ],
    how: [
      "PVD는 직진성이 강해 금속막에 유리하지만 [[Step Coverage]]가 약하다.",
      "CVD는 복잡한 구조 내부까지 잘 들어가지만 고온과 전구체 부산물 관리가 중요하다.",
      "ALD는 가장 느리지만 [[Conformality]]와 두께 제어가 가장 뛰어나 High-k 같은 초박막에 적합하다.",
    ],
    why: [
      "미세화 전에는 빠르고 단순한 PVD/CVD로 충분한 경우가 많았지만, 3D 구조와 초박막 시대에는 ALD의 장점이 커졌다.",
      "결국 '어떤 막인가' 못지않게 '어떤 구조를 덮어야 하는가'가 선택을 결정한다.",
    ],
    measure: [
      "비교 지표는 증착 속도, 두께 균일도, step coverage, conformality, thermal budget다.",
      "공정 통합 관점에서는 후속 식각과 세정, 막질 안정성까지 함께 봐야 한다.",
    ],
    connections: [
      "[[박막 증착]]",
      "[[Reactive Sputtering]]",
      "[[ALD Window]]",
      "[[Conformality]]",
      "[[Step Coverage]]",
    ],
    questions: [
      "하이브리드 적층 구조에서 PVD와 ALD를 어떻게 조합하는지 사례를 더 보강할 수 있다.",
    ],
  },
  {
    dir: "comparisons",
    slug: "wet-etch-vs-dry-etch",
    title: "습식 식각 vs 건식 식각",
    type: "comparison",
    confidence: "high",
    tags: ["comparison", "식각", "이방성"],
    summary: "습식과 건식 식각의 장단점, undercut과 anisotropy의 trade-off를 정리한 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide],
    quote: "식각의 핵심 trade-off는 빠르고 싸게 지울 것인가, 아니면 정확하고 수직으로 깎을 것인가다.",
    what: [
      "습식 식각은 액체 화학 반응 중심이고, 건식 식각은 플라즈마/가스 기반의 화학·물리 복합 반응이다.",
      "전자는 등방성, 후자는 비등방성 제어에 유리하다는 차이가 있다.",
    ],
    how: [
      "습식 식각은 선택비와 대량 처리에 유리하지만 옆으로도 파고들어 undercut이 생기기 쉽다.",
      "건식 식각은 이온 충돌 덕분에 수직 프로파일 확보가 가능하지만 플라즈마 데미지와 장비 복잡성이 따른다.",
    ],
    why: [
      "미세 패턴 시대에는 단순 속도보다 profile 제어가 중요해져 건식 식각이 주류가 되었다.",
      "반대로 세정, strip, sacrificial layer 제거처럼 profile 정밀도가 덜 중요한 구간에서는 여전히 습식이 유용하다.",
    ],
    measure: [
      "비교 지표는 선택비, 이방성, 식각 속도, residue, damage다.",
      "실제 공정에서는 Over etch와 endpoint detection까지 함께 고려해야 한다.",
    ],
    connections: [
      "[[식각]]",
      "[[선택비]]",
      "[[할로젠 식각 가스]]",
      "[[CMP와 세정]]",
    ],
    questions: [
      "atomic layer etch와 cryogenic etch를 포함한 최신 건식 식각 계열 비교를 확장할 수 있다.",
    ],
  },
  {
    dir: "comparisons",
    slug: "poly-si-vs-metal-gate",
    title: "폴리실리콘 게이트 vs 금속 게이트",
    type: "comparison",
    confidence: "high",
    tags: ["comparison", "gate", "HKMG"],
    summary: "왜 한때 metal gate를 버리고 poly-Si를 썼다가, 다시 metal gate로 돌아왔는지 설명하는 노트.",
    sources: [SOURCE.hkmg, SOURCE.metaGuide],
    quote: "gate material의 역사는 재료의 우열이 아니라, 그 시대 공정과 가장 잘 맞는 절충안의 역사다.",
    what: [
      "초기 MOSFET은 metal gate를 썼지만, self-aligned gate와 고온 공정 호환성 때문에 poly-Si가 주류가 되었다.",
      "그러나 미세화와 high-k 도입 이후 poly-Si의 단점이 다시 커지면서 metal gate가 복귀했다.",
    ],
    how: [
      "poly-Si는 공정 통합과 self-alignment 측면에서 유리했지만 depletion과 work function 한계를 가진다.",
      "metal gate는 공핍층이 없고 work function 조절이 유리해 high-k와의 조합에서 장점이 크다.",
    ],
    why: [
      "즉, poly-Si가 선택된 이유는 당시 공정 호환성 때문이었고, 다시 metal gate로 돌아온 이유는 전기적 한계가 공정 이점보다 커졌기 때문이다.",
      "사용자가 중요하게 본 '왜 다시 돌아왔는가'의 답은 high-k와 만났을 때 poly-Si의 약점이 더 이상 감당되지 않았기 때문이다.",
    ],
    measure: [
      "비교 지표는 gate depletion, threshold voltage control, resistance, mobility, leakage다.",
      "같은 산화막 조건에서 채널 제어력이 얼마나 유지되는지가 핵심이다.",
    ],
    connections: [
      "[[High-K Metal Gate]]",
      "[[폴리실리콘 게이트]]",
      "[[금속 게이트]]",
      "[[High-k 유전체]]",
      "[[누설전류]]",
    ],
    questions: [
      "metal gate stack의 재료 조합별 NMOS/PMOS work function 분할 전략은 별도 노트로 다룰 수 있다.",
    ],
  },
  {
    dir: "comparisons",
    slug: "spc-vs-fdc",
    title: "SPC와 FDC 비교",
    type: "comparison",
    confidence: "high",
    tags: ["comparison", "data", "yield"],
    summary: "결과 기반 관리인 SPC와 설비 이상 감지인 FDC가 왜 별개이면서도 함께 필요한지 설명하는 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireLecture, SOURCE.metaGuide],
    quote: "SPC와 FDC는 둘 중 하나를 고르는 관계가 아니라, 결과를 보는 눈과 원인을 보는 눈이라는 점에서 서로 보완적이다.",
    what: [
      "SPC는 계측 결과와 통계 분포를 바탕으로 공정 상태를 관리하는 체계다.",
      "FDC는 설비 센서와 recipe 파라미터를 실시간으로 읽어 이상 징후를 감지하는 체계다.",
    ],
    how: [
      "SPC는 control chart와 Cpk 등으로 결과 변동을 본다.",
      "FDC는 pressure, gas flow, RF power, temperature 같은 실시간 센서값의 정상 패턴 이탈을 잡는다.",
    ],
    why: [
      "SPC만 있으면 이미 나빠진 결과를 뒤늦게 발견할 수 있고, FDC만 있으면 결과 품질이 실제로 사양에 들어오는지 놓칠 수 있다.",
      "그래서 두 체계는 결과 기반 관리와 원인 기반 감지를 나눠 맡는다.",
    ],
    measure: [
      "SPC 지표는 UCL/LCL, Cpk, trend, run rule이다.",
      "FDC 지표는 센서 waveform, chamber parameter drift, abnormal event classification이다.",
    ],
    connections: [
      "[[SPC]]",
      "[[FDC]]",
      "[[계측]]",
      "[[수율 분석]]",
      "[[데이터 기반 Fab]]",
    ],
    questions: [
      "향후에는 SPC와 FDC를 AI 기반 예지보전 관점에서 어떻게 통합하는지 정리할 필요가 있다.",
    ],
  },
];

const entityPages = [
  {
    dir: "entities", slug: "adi-cd", title: "ADI CD", type: "entity", confidence: "high", tags: ["entity", "metrology", "photo"], summary: "현상 직후 포토 패턴 선폭을 재는 핵심 계측 지표.",
    sources: [SOURCE.metrology1, SOURCE.fiveProcesses], quote: "ADI는 포토가 의도한 패턴이 실제로 얼마나 잘 찍혔는지를 가장 먼저 보여 주는 숫자다.",
    what: ["ADI CD는 After Develop Inspection Critical Dimension의 약자로, 포토 현상 직후 패턴 선폭을 뜻한다."],
    how: ["노광과 현상 이후 CD-SEM 등으로 측정하며, etch 이전의 패턴 fidelity를 확인한다."],
    why: ["여기서부터 CD가 틀어지면 이후 식각과 증착이 아무리 잘 되어도 최종 소자 특성이 흔들린다."],
    measure: ["측정값 자체뿐 아니라 wafer 내 분포와 lot 간 drift를 함께 본다."],
    connections: ["[[포토리소그래피]]", "[[계측]]", "[[ACI CD]]", "[[오버레이]]", "[[공정→계측→소자→수율 파이프라인]]"],
    questions: ["ADI variation이 최종 전기 특성으로 얼마나 증폭되는지 사례를 더 모을 필요가 있다."],
  },
  {
    dir: "entities", slug: "aci-cd", title: "ACI CD", type: "entity", confidence: "high", tags: ["entity", "metrology", "etch"], summary: "식각 후 실제 구조 선폭을 확인하는 핵심 계측 지표.",
    sources: [SOURCE.metrology1, SOURCE.fiveProcesses], quote: "ACI는 식각이 의도한 형상을 얼마나 정확히 남겼는지를 보여 주는 결과값이다.",
    what: ["ACI CD는 After Etch/After Critical Inspection CD로 이해할 수 있으며, 식각 이후의 실제 선폭을 뜻한다."],
    how: ["포토 패턴을 식각으로 전사한 뒤 측정하여, etch bias와 profile 영향을 반영한 실제 구조 CD를 본다."],
    why: ["ADI가 좋아도 식각 selectivity와 profile이 나쁘면 ACI가 틀어질 수 있으므로 두 값을 같이 봐야 한다."],
    measure: ["ADI 대비 bias, line edge roughness, profile angle을 함께 확인하는 것이 유용하다."],
    connections: ["[[식각]]", "[[ADI CD]]", "[[계측]]", "[[선택비]]", "[[수율 분석]]"],
    questions: ["ACI와 최종 contact resistance의 상관관계 사례를 추가할 수 있다."],
  },
  {
    dir: "entities", slug: "overlay", title: "오버레이", type: "entity", confidence: "high", tags: ["entity", "metrology", "alignment"], summary: "층간 정렬 오차를 나타내는 핵심 포토 계측 항목.",
    sources: [SOURCE.metrology1, SOURCE.fiveProcesses], quote: "overlay가 틀어지면 각 층이 제자리에 있더라도 서로를 놓치게 된다.",
    what: ["오버레이는 현재 층과 이전 층이 얼마나 정확히 정렬되었는지를 나타내는 값이다."],
    how: ["alignment mark를 기준으로 층간 offset을 측정하며, 포토 공정의 정렬 능력을 평가한다."],
    why: ["다층 구조 반도체에서 overlay 오차는 short, open, capacitance shift로 바로 이어질 수 있다."],
    measure: ["평균값뿐 아니라 wafer edge/center 분포, directionality, lot drift를 함께 본다."],
    connections: ["[[포토리소그래피]]", "[[계측]]", "[[ADI CD]]", "[[문턱전압]]", "[[수율 분석]]"],
    questions: ["EUV와 multi-patterning에서 overlay budget이 어떻게 달라지는지 추가 보강이 가능하다."],
  },
  {
    dir: "entities", slug: "threshold-voltage", title: "문턱전압", type: "entity", confidence: "high", tags: ["entity", "device", "vth"], summary: "MOSFET이 본격적으로 켜지기 시작하는 기준 전압.",
    sources: [SOURCE.metrology2, SOURCE.spotfireTerms, SOURCE.hkmg], quote: "Vth는 공정, 재료, 구조 변화가 소자 수준에서 어떻게 나타나는지 압축해서 보여 주는 값이다.",
    what: ["문턱전압은 채널에 반전층이 형성되어 트랜지스터가 켜지기 시작하는 게이트 전압이다."],
    how: ["gate work function, oxide thickness, channel doping, short-channel effect가 함께 영향을 준다."],
    why: ["Vth가 흔들리면 성능·전력·누설이 동시에 흔들리므로, 공정 변동을 소자 수준에서 읽는 대표 지표가 된다."],
    measure: ["Id-Vg curve에서 추출하며, lot/wafer/site별 분포와 target spec 이탈을 함께 본다."],
    connections: ["[[소자 특성 분석]]", "[[High-K Metal Gate]]", "[[DIBL]]", "[[Subthreshold Slope]]", "[[누설전류]]"],
    questions: ["different extraction method에 따른 Vth 정의 차이를 보완할 수 있다."],
  },
  {
    dir: "entities", slug: "subthreshold-slope", title: "Subthreshold Slope", type: "entity", confidence: "high", tags: ["entity", "device", "SS"], summary: "트랜지스터가 꺼진 상태에서 켜지는 구간의 가파름을 나타내는 지표.",
    sources: [SOURCE.metrology2], quote: "SS가 작을수록 gate가 채널을 더 날카롭게 제어하고 있다는 뜻이다.",
    what: ["Subthreshold Slope는 subthreshold 영역에서 drain current가 한 decade 변할 때 필요한 gate voltage 변화를 뜻한다."],
    how: ["interface trap, gate control 능력, short-channel effect가 나빠질수록 SS가 커진다."],
    why: ["낮은 전압으로 빠르게 on/off를 바꾸려면 SS가 작아야 하므로, 저전력 소자에서 특히 중요하다."],
    measure: ["Id-Vg semilog 그래프에서 mV/dec 단위로 추출한다."],
    connections: ["[[소자 특성 분석]]", "[[문턱전압]]", "[[High-K Metal Gate]]", "[[DIBL]]"],
    questions: ["GAA 구조에서 SS 개선 폭을 세대별로 비교하는 노트를 추가할 수 있다."],
  },
  {
    dir: "entities", slug: "dibl", title: "DIBL", type: "entity", confidence: "high", tags: ["entity", "device", "short-channel"], summary: "드레인 전압이 소스-채널 장벽을 낮추는 short-channel effect 지표.",
    sources: [SOURCE.metrology2, SOURCE.fiveProcesses], quote: "DIBL은 drain이 source 쪽 장벽까지 흔들어 버리는 short-channel 시대의 대표적 부작용이다.",
    what: ["DIBL은 Drain-Induced Barrier Lowering의 약자로, drain 전압이 커질수록 문턱전압이 낮아지는 현상이다."],
    how: ["채널이 짧아질수록 drain 전계가 source barrier까지 영향을 미쳐 OFF 상태에서도 전류가 흐르기 쉬워진다."],
    why: ["DIBL이 크면 누설전류가 증가하고 문턱전압이 불안정해져 소자와 회로 설계가 어려워진다."],
    measure: ["서로 다른 Vd 조건에서 Vth를 추출해 차이를 본다."],
    connections: ["[[누설전류]]", "[[문턱전압]]", "[[Halo Doping]]", "[[LDD]]", "[[소자 특성 분석]]"],
    questions: ["FinFET과 GAA에서 DIBL 개선 정도를 구조적으로 비교하는 노트를 더 붙일 수 있다."],
  },
  {
    dir: "entities", slug: "high-k-dielectric", title: "High-k 유전체", type: "entity", confidence: "high", tags: ["entity", "gate", "materials"], summary: "높은 유전율로 EOT를 낮추면서 물리 두께는 유지하게 해 주는 게이트 절연막 재료.",
    sources: [SOURCE.hkmg], quote: "High-k의 핵심은 더 얇게 만드는 것이 아니라, 전기적으로는 얇고 물리적으로는 두껍게 만드는 데 있다.",
    what: ["HfO2, ZrO2처럼 SiO2보다 유전율이 높은 절연막 재료다."],
    how: ["유전율이 높기 때문에 같은 capacitance를 더 두꺼운 물리막으로 구현할 수 있어 tunneling을 줄인다."],
    why: ["SiO2를 더 얇게 만들면 leakage가 급증하므로, 미세화 이후에는 high-k 도입이 필요했다."],
    measure: ["핵심 지표는 EOT, leakage current, interface quality다."],
    connections: ["[[High-K Metal Gate]]", "[[ALD Window]]", "[[누설전류]]", "[[금속 게이트]]"],
    questions: ["interface layer와 remote phonon scattering까지 포함해 mobility trade-off를 더 정리할 필요가 있다."],
  },
  {
    dir: "entities", slug: "metal-gate", title: "금속 게이트", type: "entity", confidence: "high", tags: ["entity", "gate", "materials"], summary: "poly depletion 없이 work function을 조절할 수 있는 게이트 전극.",
    sources: [SOURCE.hkmg], quote: "metal gate는 high-k와 함께 쓸 때 비로소 poly-Si의 약점을 정면으로 해결한다.",
    what: ["TiN, TaN, W 같은 금속 또는 금속성 스택으로 이루어진 게이트 전극이다."],
    how: ["공핍층이 생기지 않고 work function tuning이 가능해 NMOS/PMOS 요구치에 맞추기 쉽다."],
    why: ["poly-Si는 high-k와 조합될 때 depletion과 Vth tuning 한계가 커져 다시 metal gate가 필요해졌다."],
    measure: ["Vth control, resistance, mobility, reliability를 함께 본다."],
    connections: ["[[High-K Metal Gate]]", "[[폴리실리콘 게이트]]", "[[폴리실리콘 게이트 vs 금속 게이트]]", "[[문턱전압]]"],
    questions: ["dual metal gate stack의 세부 재료 조합은 추가 정리가 필요하다."],
  },
  {
    dir: "entities", slug: "poly-si-gate", title: "폴리실리콘 게이트", type: "entity", confidence: "high", tags: ["entity", "gate", "history"], summary: "오랫동안 표준 게이트 재료였던 도핑된 폴리실리콘 전극.",
    sources: [SOURCE.hkmg, SOURCE.metaGuide], quote: "poly-Si는 한 시대의 최적해였지만, high-k 시대에는 더 이상 충분하지 않았다.",
    what: ["도핑된 polycrystalline silicon으로 만든 게이트 전극이다."],
    how: ["self-aligned gate 구현과 고온 공정 호환성 덕분에 오랫동안 표준으로 쓰였다."],
    why: ["하지만 depletion과 work function 한계 때문에 high-k와의 조합에서 문제가 드러나 metal gate로 대체되었다."],
    measure: ["depletion, gate resistance, Vth control 난이도를 통해 한계를 본다."],
    connections: ["[[금속 게이트]]", "[[High-K Metal Gate]]", "[[폴리실리콘 게이트 vs 금속 게이트]]"],
    questions: ["초기 metal gate에서 poly-Si로 이동한 공정 통합 관점을 더 보강할 수 있다."],
  },
  {
    dir: "entities", slug: "ald-window", title: "ALD Window", type: "entity", confidence: "high", tags: ["entity", "ALD", "process-window"], summary: "ALD가 self-limiting 증착으로 안정적으로 동작하는 최적 온도 범위.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "ALD는 아무 온도에서나 잘 되는 공정이 아니라, ALD답게 동작하는 좁은 창을 갖는다.",
    what: ["ALD precursor와 반응물이 condensation도 decomposition도 없이 self-limiting하게 반응하는 온도 범위다."],
    how: ["너무 낮으면 반응성이 부족하거나 응축이 일어나고, 너무 높으면 탈착이나 열분해가 일어난다."],
    why: ["이 창을 벗어나면 ALD의 장점인 두께 제어와 균일성이 무너진다."],
    measure: ["cycle당 성장량(GPC), 조성, 불순물, 균일도 변화를 온도별로 본다."],
    connections: ["[[박막 증착]]", "[[PVD vs CVD vs ALD]]", "[[High-k 유전체]]", "[[Conformality]]"],
    questions: ["실제 HfO2 공정에서 precursor 종류별 ALD window 차이를 별도 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "argon", title: "아르곤", type: "entity", confidence: "high", tags: ["entity", "gas", "sputtering"], summary: "스퍼터링과 플라즈마 공정에서 가장 자주 쓰이는 비활성 기체.",
    sources: [SOURCE.sputtering, SOURCE.metaGuide], quote: "Ar를 쓰는 이유는 비활성이라서만이 아니라, 무게와 경제성, 플라즈마 유지가 모두 균형이 맞기 때문이다.",
    what: ["Ar은 비활성 기체로, sputtering과 plasma ignition에서 가장 흔히 쓰이는 working gas다."],
    how: ["플라즈마에서 Ar+ 이온이 타깃을 때려 원자를 튀겨내고, reactive sputtering에서는 기본 충돌 에너지원 역할을 한다."],
    why: ["He나 Ne보다 무거워 운동량 전달이 효율적이고, 반응성이 낮아 공정 화학을 과도하게 방해하지 않으며, 비용도 적절하다."],
    measure: ["플라즈마 안정성, deposition rate, target sputter yield, chamber pressure 변화를 함께 본다."],
    connections: ["[[Reactive Sputtering]]", "[[Target Poisoning]]", "[[PVD vs CVD vs ALD]]"],
    questions: ["Kr, Xe를 쓰는 특수 공정에서 운동량·비용 trade-off를 더 비교할 수 있다."],
  },
  {
    dir: "entities", slug: "halogen-etch-gases", title: "할로젠 식각 가스", type: "entity", confidence: "high", tags: ["entity", "etch", "gas"], summary: "F, Cl 계열을 중심으로 휘발성 부산물을 만들어 식각을 가능하게 하는 핵심 가스군.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "할로젠 계열이 중요한 이유는 반응성이 강해서가 아니라, 반응 후 휘발성 부산물을 만들기 쉽기 때문이다.",
    what: ["Cl2, HBr, CF4, CHF3 같은 할로젠 계열 가스는 dry etch에서 주력 반응종을 제공한다."],
    how: ["표면과 반응해 SiCl4, SiF4 같은 휘발성 생성물을 만들고, 이온 충돌과 결합해 anisotropic etch를 구현한다."],
    why: ["반응성, 재료별 선택성, 휘발성 부산물 형성이라는 세 조건을 동시에 만족시키기 쉬워서 널리 쓰인다."],
    measure: ["etch rate, residue, selectivity, sidewall polymer 형성을 함께 본다."],
    connections: ["[[식각]]", "[[선택비]]", "[[습식 식각 vs 건식 식각]]", "[[Reactive Sputtering]]"],
    questions: ["material별 최적 가스 조합과 sidewall passivation 메커니즘을 더 세분화할 수 있다."],
  },
  {
    dir: "entities", slug: "hmds", title: "HMDS", type: "entity", confidence: "high", tags: ["entity", "photo", "adhesion"], summary: "웨이퍼 표면을 소수화해 PR 접착을 안정화하는 포토 보조 재료.",
    sources: [SOURCE.metaGuide, SOURCE.fiveProcesses], quote: "HMDS는 단순 접착제라기보다, 표면 수분을 정리하고 PR이 붙을 환경을 만드는 전처리제에 가깝다.",
    what: ["Hexamethyldisilazane의 약자로, photo 이전 wafer surface priming에 쓰인다."],
    how: ["표면의 수분과 반응해 소수성을 높이고, PR이 균일하게 퍼지고 잘 붙도록 만든다."],
    why: ["수분이 남아 있으면 PR 접착과 패턴 안정성이 나빠지므로, 미세 패턴에서 HMDS 전처리가 중요하다."],
    measure: ["PR coating 균일도, pattern collapse, adhesion defect로 효과를 본다."],
    connections: ["[[포토리소그래피]]", "[[포토레지스트]]", "[[ADI CD]]"],
    questions: ["different bake condition과 HMDS priming 시간의 상관을 더 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "photoresist", title: "포토레지스트", type: "entity", confidence: "high", tags: ["entity", "photo", "materials"], summary: "빛에 반응해 포토 패턴을 실제 막으로 전사하게 해 주는 감광성 재료.",
    sources: [SOURCE.fiveProcesses, SOURCE.ragKnowledge], quote: "포토의 핵심은 광원만이 아니라, 그 빛을 화학 반응으로 바꿔 주는 PR에 있다.",
    what: ["포토레지스트는 polymer, PAC, solvent로 이루어진 감광성 고분자 재료다."],
    how: ["노광 후 현상 과정에서 positive PR은 노광부가 녹고, negative PR은 비노광부가 녹는다."],
    why: ["미세 패턴을 전사하려면 빛을 선택적으로 화학 변화로 바꿔 줄 재료가 필요하다."],
    measure: ["해상도, line edge roughness, adhesion, thickness, outgassing 특성을 함께 본다."],
    connections: ["[[포토리소그래피]]", "[[HMDS]]", "[[ADI CD]]"],
    questions: ["EUV용 PR의 shot noise와 stochastic defect 문제를 별도 보강할 수 있다."],
  },
  {
    dir: "entities", slug: "hbm", title: "HBM", type: "entity", confidence: "high", tags: ["entity", "memory", "packaging"], summary: "GPU와 AI 가속기용 초고대역폭 적층 메모리.",
    sources: [SOURCE.spotfireIssue, SOURCE.hynixTech, SOURCE.metrics], quote: "HBM은 DRAM 한 세대를 잘 만드는 문제를 넘어, 적층과 패키징, 열, 인터포저를 함께 푸는 문제다.",
    what: ["HBM은 TSV와 실리콘 인터포저를 이용해 여러 DRAM die를 수직 적층한 고대역폭 메모리다."],
    how: ["짧은 배선과 넓은 I/O를 통해 높은 bandwidth를 확보하고, 최신 세대는 12-Hi 36GB 스택과 1.5 TB/s급 대역폭을 지향한다."],
    why: ["AI 가속기에서는 메모리 용량보다도 bandwidth와 전력 효율이 병목이 되므로 HBM이 중요해졌다."],
    measure: ["pin speed, bandwidth, stack capacity, thermal resistance, yield가 핵심 지표다."],
    connections: ["[[메모리 반도체]]", "[[DRAM]]", "[[MR-MUF]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[산업 핫이슈]]"],
    questions: ["HBM4와 HBM4E 이후 logic base die 구조가 어떻게 바뀌는지 계속 추적할 필요가 있다."],
  },
  {
    dir: "entities", slug: "dram", title: "DRAM", type: "entity", confidence: "high", tags: ["entity", "memory", "device"], summary: "1T1C 구조로 데이터를 저장하는 휘발성 메모리.",
    sources: [SOURCE.spotfireTerms, SOURCE.hynixTech], quote: "DRAM은 셀 하나를 얼마나 작게 만들 것인가와 동시에, 얼마나 안정적으로 charge를 유지할 것인가의 싸움이다.",
    what: ["DRAM은 capacitor에 저장된 전하를 transistor로 읽고 쓰는 휘발성 메모리다."],
    how: ["1T1C 구조를 기본으로 하고, 미세화가 진행될수록 capacitor 용량 유지와 leakage 억제가 핵심 과제가 된다."],
    why: ["주기억장치로 널리 쓰이며, AI 시대에는 HBM과 DDR 계열의 기반 기술이 된다."],
    measure: ["retention time, refresh overhead, access speed, power, yield를 본다."],
    connections: ["[[메모리 반도체]]", "[[HBM]]", "[[문턱전압]]", "[[누설전류]]"],
    questions: ["3D DRAM과 CUA 방향을 별도 확장 노트로 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "nand-flash", title: "NAND Flash", type: "entity", confidence: "high", tags: ["entity", "memory", "storage"], summary: "전원이 없어도 데이터를 유지하는 비휘발성 메모리.",
    sources: [SOURCE.spotfireTerms, SOURCE.hynixTech], quote: "NAND는 저장 밀도 확장의 대표 사례이고, 3D 적층이 이미 산업 표준이 된 메모리다.",
    what: ["NAND Flash는 floating gate 또는 charge trap 구조로 데이터를 저장하는 비휘발성 메모리다."],
    how: ["수직 적층을 통해 셀 수를 늘리며, 식각과 증착의 high aspect ratio 기술이 핵심 역할을 한다."],
    why: ["대용량 저장장치의 밀도와 비용 경쟁력을 위해 필수적이다."],
    measure: ["층수, program/erase endurance, retention, latency, yield를 본다."],
    connections: ["[[메모리 반도체]]", "[[박막 증착]]", "[[식각]]", "[[산업 핫이슈]]"],
    questions: ["3D NAND와 차세대 storage class memory의 경계를 어떻게 볼지 추가 논의가 필요하다."],
  },
  {
    dir: "entities", slug: "euv", title: "EUV", type: "entity", confidence: "high", tags: ["entity", "photo", "lithography"], summary: "13.5nm 파장의 극자외선 광원을 쓰는 미세 패터닝 핵심 기술.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireIssue], quote: "EUV는 더 짧은 파장을 쓴다는 한 문장으로 끝나는 기술이 아니라, 노광·마스크·수율·비용을 함께 흔드는 전환점이다.",
    what: ["EUV는 13.5nm 파장의 광원으로 미세 패턴을 형성하는 리소그래피 기술이다."],
    how: ["ArF immersion보다 더 짧은 파장을 이용해 multi-patterning 부담을 줄이고 더 작은 feature를 직접 인쇄한다."],
    why: ["노드가 줄어들수록 기존 광원과 pattern splitting만으로는 비용과 정렬 오차가 감당되지 않기 때문이다."],
    measure: ["resolution, stochastic defect, overlay budget, throughput를 함께 본다."],
    connections: ["[[포토리소그래피]]", "[[ADI CD]]", "[[산업 핫이슈]]", "[[메모리 반도체]]"],
    questions: ["High-NA EUV의 생산성·마스크·pellicle 과제를 별도 노트로 확장할 수 있다."],
  },
  {
    dir: "entities", slug: "mr-muf", title: "MR-MUF", type: "entity", confidence: "medium", tags: ["entity", "HBM", "packaging"], summary: "SK하이닉스 HBM 차별화 포인트로 자주 언급되는 underfill 패키징 방식.",
    sources: [SOURCE.spotfireIssue, SOURCE.hynixTech], quote: "MR-MUF는 단순 포장 공정이 아니라, HBM 수율과 열/신뢰성을 동시에 좌우하는 패키징 선택이다.",
    what: ["MR-MUF는 Mass Reflow Molded Underfill의 약자로, HBM 적층 패키징에서 underfill을 형성하는 방식이다."],
    how: ["적층된 die와 bump 사이의 기계적·열적 안정성을 높이면서 생산성과 신뢰성을 확보하는 방향으로 쓰인다."],
    why: ["HBM은 die 적층 수가 늘수록 열, 응력, warpage, 수율 문제가 커지므로 underfill 전략이 차별화 포인트가 된다."],
    measure: ["열 저항, warpage, 패키지 신뢰성, 수율 관점에서 성능을 판단한다."],
    connections: ["[[HBM]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[산업 핫이슈]]"],
    questions: ["공개 자료 기준으로 세부 구조 설명은 제한적이므로, low-to-medium confidence를 유지하며 업데이트할 필요가 있다."],
  },
  {
    dir: "entities", slug: "halo-doping", title: "Halo Doping", type: "entity", confidence: "medium", tags: ["entity", "implant", "device"], summary: "short-channel effect를 억제하기 위해 채널 가장자리에 넣는 보조 도핑.",
    sources: [SOURCE.hkmg, SOURCE.metaGuide], quote: "halo doping은 채널 길이가 짧아질수록 문턱 장벽을 지키기 위해 채널 끝단을 보강하는 전략이다.",
    what: ["source/drain 인접 영역에 국부 고농도 도핑을 추가해 short-channel effect를 줄이는 방식이다."],
    how: ["drain 전계가 source barrier를 무너뜨리지 못하도록 채널 양끝 전위 구조를 강화한다."],
    why: ["채널이 짧아질수록 DIBL과 누설이 커지므로 단순 채널 도핑만으로는 제어가 어렵기 때문이다."],
    measure: ["DIBL, Vth roll-off, leakage current 감소 여부를 본다."],
    connections: ["[[LDD]]", "[[확산과 이온주입]]", "[[DIBL]]", "[[누설전류]]"],
    questions: ["FinFET/GAA 시대의 halo 전략 변화를 더 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "ldd", title: "LDD", type: "entity", confidence: "medium", tags: ["entity", "implant", "reliability"], summary: "drain 전계 피크를 낮춰 hot carrier와 short-channel effect를 완화하는 구조.",
    sources: [SOURCE.hkmg, SOURCE.metaGuide], quote: "LDD는 저항을 조금 희생하더라도 drain 전계 피크를 낮추기 위해 선택된 구조적 절충안이다.",
    what: ["Lightly Doped Drain의 약자로, 채널과 고농도 source/drain 사이에 저농도 구간을 두는 구조다."],
    how: ["spacer 전후 이온주입을 이용해 완만한 도핑 gradient를 만든다."],
    why: ["drain 쪽 전계 집중을 줄여 HCI와 short-channel 문제를 완화하기 위해 도입되었다."],
    measure: ["hot carrier reliability, series resistance, DIBL, drive current 변화를 함께 본다."],
    connections: ["[[Halo Doping]]", "[[확산과 이온주입]]", "[[누설전류]]"],
    questions: ["고성능 로직과 메모리 셀에서 LDD 최적화 기준 차이를 더 비교할 수 있다."],
  },
  {
    dir: "entities", slug: "rta", title: "RTA", type: "entity", confidence: "high", tags: ["entity", "anneal", "thermal"], summary: "짧은 시간 고온을 가해 활성화와 결함 복구를 수행하는 대표 어닐링 방식.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "RTA의 목적은 충분히 활성화하되, 불필요하게 다시 퍼지게 두지 않는 것이다.",
    what: ["Rapid Thermal Annealing의 약자로, 수초 수준의 빠른 열처리를 수행한다."],
    how: ["이온주입으로 손상된 격자를 복구하고 도펀트를 substitutional site로 이동시켜 활성화한다."],
    why: ["긴 furnace anneal은 재확산을 키우므로, 미세화 이후에는 짧고 강한 thermal budget이 더 유리해졌다."],
    measure: ["sheet resistance, junction depth, activation ratio, Vth 변화를 본다."],
    connections: ["[[확산과 이온주입]]", "[[문턱전압]]", "[[LDD]]", "[[Halo Doping]]"],
    questions: ["flash anneal과 laser anneal을 포함한 더 짧은 열처리 전략을 추가할 수 있다."],
  },
];

const conceptPages = [
  {
    dir: "concepts", slug: "five-processes", title: "5대 공정", type: "concept", confidence: "high", tags: ["concept", "전공정", "framework"], summary: "포토, 식각, 확산·이온주입, 박막 증착, CMP·세정을 하나의 제조 흐름으로 묶는 뼈대 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "5대 공정은 따로 외우는 항목이 아니라, 서로가 서로를 위한 전처리이자 후처리라는 점에서 하나의 흐름이다.",
    what: ["반도체 전공정의 큰 줄기를 포토리소그래피, 식각, 확산·이온주입, 박막 증착, CMP·세정으로 묶어 이해하는 프레임이다.", "실제로는 여러 번 반복되며, 각 반복마다 계측과 데이터 해석이 함께 붙는다."],
    how: ["[[포토리소그래피]]가 패턴을 정하고, [[식각]]이 형상을 만들고, [[확산과 이온주입]]이 전기적 성질을 주고, [[박막 증착]]이 필요한 막을 올리며, [[CMP와 세정]]이 다음 스텝을 위한 표면을 정리한다.", "이 흐름은 [[계측]]과 [[SPC]], [[FDC]]가 끊임없이 끼어드는 데이터 기반 루프로 운영된다."],
    why: ["5대 공정을 한 번에 보는 이유는 개별 스텝 최적화보다 스텝 간 trade-off가 더 중요하기 때문이다.", "예를 들어 식각 profile 하나가 이후 증착의 step coverage, 최종 전기 특성, 수율까지 연쇄적으로 흔든다."],
    measure: ["대표 측정 축은 CD, Overlay, Thickness, Defect Count, Vth, SS, DIBL, Yield다.", "각 공정이 끝날 때마다 '무엇이 바뀌었고 무엇으로 확인하는가'를 동시에 보는 것이 중요하다."],
    connections: ["[[포토리소그래피]]", "[[식각]]", "[[확산과 이온주입]]", "[[박막 증착]]", "[[CMP와 세정]]", "[[공정→계측→소자→수율 파이프라인]]", "[[SPC]]", "[[FDC]]"],
    questions: ["전공정과 후공정 경계를 overview에서 어느 수준까지 함께 다룰지 추후 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "photolithography", title: "포토리소그래피", type: "concept", confidence: "high", tags: ["concept", "photo", "patterning"], summary: "빛과 PR을 이용해 회로 패턴을 웨이퍼 위에 전사하는 공정.",
    sources: [SOURCE.fiveProcesses, SOURCE.metrology1, SOURCE.spotfireTerms], quote: "포토는 패턴을 만드는 공정인 동시에, 이후 모든 오차의 출발점이 되는 공정이다.",
    what: ["마스크의 패턴을 PR 위에 전사해 후속 식각·증착 공정의 좌표계를 정하는 공정이다.", "PR, HMDS, 노광 광원, alignment, develop가 핵심 구성요소다."],
    how: ["웨이퍼 표면을 prime한 뒤 PR을 도포하고, 마스크를 통해 빛을 쏘아 선택 영역만 화학적으로 바꾼 뒤 현상한다.", "이후 [[ADI CD]]와 [[오버레이]]를 측정해 패턴 품질을 확인한다."],
    why: ["패턴이 처음부터 틀어지면 그 위에 아무리 좋은 식각·증착을 해도 최종 구조가 맞지 않는다.", "또한 미세화가 심해질수록 광원 세대, PR 특성, alignment 정밀도가 전체 공정 수율을 좌우한다."],
    measure: ["핵심 지표는 해상도, 오버레이, ADI CD, depth of focus다.", "현상 직후의 line edge roughness와 defect도 함께 본다."],
    connections: ["[[ADI CD]]", "[[오버레이]]", "[[포토레지스트]]", "[[HMDS]]", "[[EUV]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["EUV stochastic defect와 high-NA EUV overlay budget을 별도 노트로 확장할 수 있다."],
  },
  {
    dir: "concepts", slug: "etching", title: "식각", type: "concept", confidence: "high", tags: ["concept", "etch", "profile"], summary: "포토 패턴을 실제 구조로 전사하기 위해 불필요한 막을 선택적으로 제거하는 공정.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "식각의 핵심은 깎는 속도가 아니라, 원하는 것만 원하는 모양으로 남기는 능력이다.",
    what: ["식각은 웨이퍼 위 막질 중 필요한 부분만 남기고 나머지를 제거해 실제 형상을 만드는 공정이다.", "습식과 건식, 그 안에서도 RIE 같은 방식으로 세분된다."],
    how: ["현대 미세공정에서는 플라즈마 기반 dry etch가 주류이며, 화학 반응과 이온 충돌을 조합해 수직 profile을 만든다.", "식각 후에는 [[ACI CD]]로 결과 형상을 확인한다."],
    why: ["같은 포토 패턴이라도 식각이 undercut, footing, residue를 만들면 소자 특성이 완전히 달라지기 때문이다.", "그래서 식각은 pattern transfer 공정이자, material selectivity와 anisotropy를 설계하는 공정이다."],
    measure: ["etch rate, [[선택비]], profile angle, residue, ACI CD, damage를 본다."],
    connections: ["[[습식 식각 vs 건식 식각]]", "[[할로젠 식각 가스]]", "[[선택비]]", "[[ACI CD]]", "[[계측]]", "[[누설전류]]", "[[수율 분석]]"],
    questions: ["cryogenic etch와 atomic layer etch를 공정 로드맵 안에서 더 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "diffusion", title: "확산", type: "concept", confidence: "high", tags: ["concept", "diffusion", "thermal"], summary: "열적 이동을 이용해 불순물이나 산화막을 형성하던 전통적 고온 공정 축.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "확산은 반도체 공정의 오래된 언어이고, 이온주입 시대에도 thermal budget이라는 형태로 여전히 남아 있다.",
    what: ["전통적으로는 고온에서 불순물이 퍼져 들어가게 하거나 산화막을 성장시키는 열 기반 공정을 의미했다."],
    how: ["열 에너지에 의해 농도 구배를 따라 이동이 일어나며, 구조 제어는 비교적 거칠고 등방적이다."],
    why: ["초기 공정에는 유용했지만, 미세화 이후에는 lateral diffusion 때문에 정밀 도핑 제어가 어렵다는 한계가 커졌다."],
    measure: ["junction depth, sheet resistance, 산화막 두께, thermal budget가 핵심이다."],
    connections: ["[[확산과 이온주입]]", "[[RTA]]", "[[문턱전압]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["산화공정과 도핑공정을 확산이라는 이름 아래 어디까지 묶을지 더 정교화할 수 있다."],
  },
  {
    dir: "concepts", slug: "ion-implantation", title: "확산과 이온주입", type: "concept", confidence: "high", tags: ["concept", "implant", "dopant"], summary: "불순물 원자를 전기장으로 가속해 원하는 깊이와 농도로 주입하는 현대 도핑 공정.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "이온주입은 도핑을 감으로 하는 시대에서 수치로 설계하는 시대로 넘어가게 한 공정이다.",
    what: ["도펀트 이온을 가속해 실리콘 내부에 직접 주입하는 도핑 공정이다."],
    how: ["dose로 농도를, energy로 깊이를 제어하고, 이후 [[RTA]]로 활성화와 결함 복구를 수행한다."],
    why: ["확산 방식보다 위치·깊이 제어력이 훨씬 좋아 미세 공정에 적합하다.", "대신 lattice damage와 activation 문제를 함께 다뤄야 한다."],
    measure: ["dose monitor, sheet resistance, junction depth, leakage, threshold shift를 함께 본다."],
    connections: ["[[확산 vs 이온주입]]", "[[LDD]]", "[[Halo Doping]]", "[[RTA]]", "[[문턱전압]]", "[[DIBL]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["plasma doping과 monolayer doping까지 포함한 차세대 도핑 전략을 추가할 수 있다."],
  },
  {
    dir: "concepts", slug: "thin-film-deposition", title: "박막 증착", type: "concept", confidence: "high", tags: ["concept", "deposition", "PVD", "CVD", "ALD"], summary: "필요한 전도체·절연체·반도체 막을 원자~나노미터 수준으로 형성하는 공정 축.",
    sources: [SOURCE.fiveProcesses, SOURCE.hkmg, SOURCE.sputtering], quote: "증착은 층을 쌓는 공정이지만, 실제로는 재료·온도·구조 제약 사이에서 가장 그럴듯한 방법을 고르는 공정이다.",
    what: ["웨이퍼 위에 다양한 막질을 형성하는 공정이며, PVD·CVD·ALD가 대표 방식이다."],
    how: ["방식에 따라 line-of-sight, 기상 화학 반응, self-limiting 표면 반응이라는 서로 다른 원리가 작동한다."],
    why: ["막질이 같아도 구조와 thermal budget이 다르면 최적 증착 방식이 달라진다.", "특히 3D 구조 시대에는 단순 증착 속도보다 [[Conformality]]와 [[Step Coverage]]가 중요해졌다."],
    measure: ["두께, 조성, 균일도, conformality, step coverage, leakage를 본다."],
    connections: ["[[Reactive Sputtering]]", "[[PVD vs CVD vs ALD]]", "[[ALD Window]]", "[[Conformality]]", "[[Step Coverage]]", "[[High-K Metal Gate]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["박막 형성 이후 stress와 reliability를 별도 축으로 확장할 수 있다."],
  },
  {
    dir: "concepts", slug: "cmp-cleaning", title: "CMP와 세정", type: "concept", confidence: "high", tags: ["concept", "CMP", "clean"], summary: "표면을 평탄화하고 잔류물을 제거해 다음 공정을 위한 조건을 맞추는 마무리 축.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireLecture], quote: "전공정의 많은 실패는 복잡한 공정보다, 표면을 다음 스텝이 감당할 수 있는 상태로 못 돌려놓는 데서 시작된다.",
    what: ["CMP는 화학적·기계적 방식으로 표면을 평탄화하고, cleaning은 잔류물과 오염을 제거한다."],
    how: ["pad, slurry, down force로 제거율을 맞추고, 세정으로 particle·chemical residue를 없앤다."],
    why: ["표면 평탄도가 무너지면 포토 초점, 식각 균일도, 금속 배선 신뢰성이 모두 나빠진다.", "또 cleaning이 부족하면 defect와 contact issue가 수율 killer가 된다."],
    measure: ["removal rate, dishing, erosion, defect count, contact resistance를 본다."],
    connections: ["[[식각]]", "[[계측]]", "[[데이터 기반 Fab]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["slurry chemistry와 금속 오염 관리 차이를 별도 세정 노트로 분리할 수 있다."],
  },
  {
    dir: "concepts", slug: "high-k-metal-gate", title: "High-K Metal Gate", type: "concept", confidence: "high", tags: ["concept", "HKMG", "gate"], summary: "SiO2+Poly-Si 조합의 한계를 넘어선 미세공정 핵심 게이트 스택.",
    sources: [SOURCE.hkmg, SOURCE.metaGuide], quote: "HKMG는 하나의 기술명이지만, 실제로는 누설 문제와 게이트 제어 문제를 동시에 풀기 위해 합쳐진 두 기술이다.",
    what: ["High-k 절연막과 metal gate 전극을 함께 사용하는 게이트 스택 기술이다."],
    how: ["High-k는 EOT를 낮추면서 leakage를 줄이고, metal gate는 poly depletion 없이 work function을 맞춘다."],
    why: ["SiO2는 너무 얇아지면 터널링이 커지고, poly-Si는 high-k와 만나면 gate control이 약해지기 때문이다."],
    measure: ["EOT, gate leakage, threshold voltage, mobility, SS, DIBL을 함께 본다."],
    connections: ["[[High-k 유전체]]", "[[금속 게이트]]", "[[폴리실리콘 게이트 vs 금속 게이트]]", "[[누설전류]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["gate-first와 gate-last integration 차이를 별도 비교 노트로 확장할 수 있다."],
  },
  {
    dir: "concepts", slug: "reactive-sputtering", title: "Reactive Sputtering", type: "concept", confidence: "high", tags: ["concept", "PVD", "sputtering"], summary: "Ar 플라즈마와 reactive gas를 함께 써 화합물 박막을 형성하는 PVD 계열 공정.",
    sources: [SOURCE.sputtering, SOURCE.metaGuide], quote: "reactive sputtering의 본질은 타깃을 때려 막을 올리는 것보다, 금속 모드와 화합물 모드 사이의 민감한 공정창을 다루는 데 있다.",
    what: ["sputtering 공정에 N2, O2 같은 reactive gas를 더해 질화막·산화막 같은 화합물 박막을 형성하는 방식이다."],
    how: ["Ar 플라즈마가 타깃을 때려 원자를 방출하고, reactive gas가 표면이나 타깃과 반응해 원하는 막 조성을 만든다."],
    why: ["금속 타깃 하나로도 공정 내에서 조성을 조절한 화합물 박막을 만들 수 있기 때문이다.", "하지만 reactive gas가 많아지면 [[Target Poisoning]]과 비선형 거동이 나타난다."],
    measure: ["thickness, sheet resistance, uniformity, hysteresis, deposition rate를 본다."],
    connections: ["[[Target Poisoning]]", "[[아르곤]]", "[[PVD vs CVD vs ALD]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
    questions: ["실험의 N2 flow와 power map을 위키 그래프와 연결해 시각화할 수 있다."],
  },
  {
    dir: "concepts", slug: "metrology", title: "계측", type: "concept", confidence: "high", tags: ["concept", "metrology", "measurement"], summary: "공정 결과를 수치화해 다음 판단의 입력값으로 만드는 측정 축.",
    sources: [SOURCE.metrology1, SOURCE.fiveProcesses], quote: "계측은 공정을 평가하는 사후 절차가 아니라, 공정이 제대로 진행되고 있는지 확인하는 실시간 언어다.",
    what: ["계측은 공정 결과를 CD, overlay, thickness, defect 같은 수치로 읽어내는 활동이다."],
    how: ["photo 이후에는 [[ADI CD]], etch 이후에는 [[ACI CD]], 층간 정렬은 [[오버레이]]처럼 step별 계측이 붙는다."],
    why: ["측정이 없으면 공정과 소자 사이의 인과를 확인할 수 없고, 데이터 기반 개선도 불가능하다."],
    measure: ["대표 항목은 ADI CD, ACI CD, overlay, thickness, defect count다."],
    connections: ["[[ADI CD]]", "[[ACI CD]]", "[[오버레이]]", "[[소자 특성 분석]]", "[[수율 분석]]", "[[SPC]]", "[[FDC]]"],
    questions: ["장비별 계측 원리와 해상도 차이를 더 세분화할 수 있다."],
  },
  {
    dir: "concepts", slug: "device-characterization", title: "소자 특성 분석", type: "concept", confidence: "high", tags: ["concept", "device", "electrical"], summary: "공정 변화가 실제 전기 특성으로 어떻게 나타나는지 읽는 축.",
    sources: [SOURCE.metrology2, SOURCE.spotfireLecture], quote: "공정이 잘 되었다는 말은 결국 전기적으로도 spec 안에 들어왔다는 뜻이어야 한다.",
    what: ["소자 특성 분석은 Vth, Idsat, SS, DIBL, leakage 같은 전기적 결과를 읽는 단계다."],
    how: ["wafer와 site별 분포를 보고 공정 variation이 전기 특성에 어떻게 번역되었는지 확인한다."],
    why: ["계측 값이 좋아 보여도 전기 특성이 나쁘면 공정 조건의 진짜 문제를 놓칠 수 있기 때문이다."],
    measure: ["Id-Vg, Id-Vd, site map, spec pass/fail, variation 분포가 핵심이다."],
    connections: ["[[문턱전압]]", "[[Subthreshold Slope]]", "[[DIBL]]", "[[누설전류]]", "[[수율 분석]]", "[[공정→계측→소자→수율 파이프라인]]"],
    questions: ["device parametric data와 inline metrology를 연결하는 ML 사례를 더 추가할 수 있다."],
  },
  {
    dir: "concepts", slug: "yield-analysis", title: "수율 분석", type: "concept", confidence: "high", tags: ["concept", "yield", "analysis"], summary: "공정·계측·소자 데이터가 최종 양품률과 어떻게 연결되는지 해석하는 축.",
    sources: [SOURCE.fiveProcesses, SOURCE.metrology3, SOURCE.spotfireLecture], quote: "수율은 마지막 숫자지만, 실제로는 앞선 모든 공정과 데이터의 누적 결과다.",
    what: ["수율 분석은 설계된 최대 칩 수 대비 정상 칩 비율이 왜 그렇게 나왔는지 원인을 좁혀 가는 활동이다."],
    how: ["defective loss와 parametric loss를 구분하고, 설비·계측·소자 데이터를 따라 upstream 원인을 추적한다."],
    why: ["좋은 수율 분석은 단순 불량 집계가 아니라, 공정 변경이 어떤 경로로 양품률에 영향을 줬는지 보여 준다."],
    measure: ["yield, defect pareto, parametric fail rate, lot별 trend, wafer map이 핵심이다."],
    connections: ["[[SPC]]", "[[FDC]]", "[[데이터 시각화]]", "[[공정→계측→소자→수율 파이프라인]]", "[[데이터 기반 Fab]]"],
    questions: ["교안 3권 원문 보강으로 defective/parametric 사례를 더 구체화할 필요가 있다."],
  },
  {
    dir: "concepts", slug: "process-to-yield-pipeline", title: "공정→계측→소자→수율 파이프라인", type: "concept", confidence: "high", tags: ["concept", "pipeline", "causality"], summary: "이 위키의 핵심 인과 체인: 공정 결과가 계측, 소자 특성, 수율로 이어지는 흐름.",
    sources: [SOURCE.fiveProcesses, SOURCE.metrology1, SOURCE.metrology2, SOURCE.metrology3], quote: "이 파이프라인을 잡아야 '공정 하나를 바꾸면 왜 수율이 움직이는가'가 보인다.",
    what: ["공정 수행 → 계측 → 소자 특성 → 수율이라는 인과 체인을 정리한 메타 노트다."],
    how: ["예를 들어 gate CD 변화는 [[ADI CD]]와 [[ACI CD]]에서 먼저 보이고, 이후 [[문턱전압]]과 drive current로 번역되며, 최종적으로 parametric yield를 흔든다."],
    why: ["사용자가 원하는 것은 단편 지식이 아니라 연결된 체계이므로, 이 파이프라인이 위키 전체의 주축이 된다."],
    measure: ["각 축의 대표 지표를 연결해 볼 수 있어야 한다: CD/overlay/thickness → Vth/SS/DIBL → yield."],
    connections: ["[[5대 공정]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]", "[[계측에서 소자 특성으로]]"],
    questions: ["향후에는 공정 시뮬레이터나 사례 기반 causal chain 시각화를 추가할 수 있다."],
  },
  {
    dir: "concepts", slug: "spc", title: "SPC", type: "concept", confidence: "high", tags: ["concept", "data", "quality"], summary: "통계적 방법으로 공정 결과의 안정성과 drift를 관리하는 체계.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireLecture], quote: "SPC는 숫자를 예쁘게 그리는 일이 아니라, 공정이 아직 통제 상태에 있는지 보는 언어다.",
    what: ["SPC는 Statistical Process Control의 약자로, 결과 데이터 기반 공정 관리 체계다."],
    how: ["관리도, Cpk, run rule 등을 이용해 공정 결과가 정상 범위를 벗어나는지 모니터링한다."],
    why: ["수율 문제가 심각해지기 전에 drift와 abnormal pattern을 미리 잡기 위해 필요하다."],
    measure: ["UCL/LCL, mean shift, Cpk, lot trend를 본다."],
    connections: ["[[SPC와 FDC 비교]]", "[[계측]]", "[[수율 분석]]", "[[데이터 시각화]]"],
    questions: ["실제 fab에서 어떤 chart를 주력으로 쓰는지 사례를 더 넣을 수 있다."],
  },
  {
    dir: "concepts", slug: "fdc", title: "FDC", type: "concept", confidence: "high", tags: ["concept", "data", "equipment"], summary: "설비 센서 데이터를 실시간으로 읽어 이상을 조기에 탐지하는 체계.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireLecture], quote: "FDC는 결과가 나빠진 뒤 왜 그랬는지 묻는 것이 아니라, 나빠지기 전에 설비가 이상 신호를 보내는지 보는 체계다.",
    what: ["FDC는 Fault Detection and Classification의 약자로, 설비 센서 데이터 기반 이상 감지 체계다."],
    how: ["pressure, temperature, gas flow, RF power, valve position 같은 실시간 파라미터를 정상 패턴과 비교한다."],
    why: ["결과 계측만으로는 늦을 수 있으므로, upstream 설비 상태에서 이상을 먼저 잡기 위해 필요하다."],
    measure: ["sensor trend, waveform deviation, abnormal event classification, alarm hit rate를 본다."],
    connections: ["[[SPC와 FDC 비교]]", "[[SPC]]", "[[데이터 기반 Fab]]", "[[수율 분석]]"],
    questions: ["예지보전 모델과 FDC 규칙 기반 시스템의 역할 분담을 더 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "data-visualization", title: "데이터 시각화", type: "concept", confidence: "high", tags: ["concept", "data", "spotfire"], summary: "같은 데이터라도 다른 분포와 인과를 읽게 해 주는 시각적 분석 방법.",
    sources: [SOURCE.spotfireLecture, SOURCE.spotfireData], quote: "반도체 데이터에서는 숫자를 아는 것보다 분포를 보는 것이 더 중요할 때가 많다.",
    what: ["데이터 시각화는 표와 숫자를 그래프, 분포, 상관관계 화면으로 바꿔 인사이트를 읽는 방법이다."],
    how: ["scatter, trend, histogram, wafer map, parallel coordinates처럼 문제에 맞는 시각화를 선택해야 한다."],
    why: ["Anscombe's quartet과 Simpson's paradox가 보여 주듯, 숫자 요약만으로는 놓치는 구조가 많기 때문이다."],
    measure: ["좋은 시각화의 기준은 원인 가설을 더 빨리 세우게 해 주는가다."],
    connections: ["[[데이터 기반 Fab]]", "[[SPC]]", "[[수율 분석]]", "[[산업 핫이슈]]"],
    questions: ["실제 wiki 뷰어에 wafer map 계열 인터랙션을 넣을지 검토할 수 있다."],
  },
  {
    dir: "concepts", slug: "leakage-current", title: "누설전류", type: "concept", confidence: "high", tags: ["concept", "device", "leakage"], summary: "꺼져 있어야 할 트랜지스터에서 흐르는 다양한 비의도성 전류의 총칭.",
    sources: [SOURCE.metaGuide, SOURCE.fundamentals], quote: "누설전류의 역사는 미세화의 역사와 거의 같은 말이다.",
    what: ["누설전류는 OFF 상태에서도 흐르는 전류로, HCI, gate oxide tunneling, DIBL, GIDL, punch-through 등 다양한 메커니즘을 포함한다."],
    how: ["각 메커니즘은 전계 집중, 산화막 박막화, short-channel effect, band-to-band tunneling 같은 서로 다른 원인으로 발생한다."],
    why: ["저전력과 고집적이 동시에 요구되면서 누설 억제는 공정·재료·구조 혁신의 직접 동기가 되었다."],
    measure: ["off current, gate leakage, retention loss, Vth shift를 본다."],
    connections: ["[[문턱전압]]", "[[DIBL]]", "[[High-K Metal Gate]]", "[[LDD]]", "[[Halo Doping]]", "[[수율 분석]]"],
    questions: ["메모리 소자와 로직 소자에서 leakage를 다루는 방식 차이를 더 보강할 수 있다."],
  },
  {
    dir: "concepts", slug: "memory-semiconductor", title: "메모리 반도체", type: "concept", confidence: "high", tags: ["concept", "memory", "industry"], summary: "DRAM, NAND, HBM, DDR 계열을 하나의 산업·기술 축으로 묶는 노트.",
    sources: [SOURCE.spotfireTerms, SOURCE.hynixTech], quote: "메모리 반도체를 이해하려면 소자만이 아니라 제품 포트폴리오와 시스템 병목까지 함께 봐야 한다.",
    what: ["데이터를 저장하는 반도체 제품군을 가리키며, DRAM과 NAND가 대표 축이다.", "AI 시대에는 HBM, DDR5, GDDR7, LPDDR6 같은 파생 제품군의 역할이 더 중요해졌다."],
    how: ["같은 DRAM 기술도 시스템 용도에 따라 HBM, DDR, GDDR, LPDDR로 다른 packaging·전력·속도 전략을 취한다."],
    why: ["메모리 산업은 공정 미세화와 패키징, 인터페이스 표준, 고객 애플리케이션 병목이 함께 얽히는 분야이기 때문이다."],
    measure: ["bandwidth, pin speed, 용량, 전력 효율, 시장 점유율이 핵심 비교 지표다."],
    connections: ["[[DRAM]]", "[[NAND Flash]]", "[[HBM]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[산업 핫이슈]]"],
    questions: ["비메모리 축과 함께 볼 때 시스템 레벨에서 어떤 균형이 생기는지 확장 가능하다."],
  },
  {
    dir: "concepts", slug: "conformality", title: "Conformality", type: "concept", confidence: "medium", tags: ["concept", "deposition", "geometry"], summary: "측벽과 바닥까지 막이 얼마나 고르게 따라 들어가는지를 보는 지표.",
    sources: [SOURCE.fiveProcesses, SOURCE.sputtering], quote: "3D 구조 시대의 증착에서는 막을 쌓는 것보다 끝까지 따라가게 만드는 것이 더 어렵다.",
    what: ["단차 구조의 sidewall과 bottom까지 막이 얼마나 균일하게 형성되는지를 뜻한다."],
    how: ["입자 진행 방향, precursor 확산, 표면 반응 메커니즘이 conformality를 결정한다."],
    why: ["깊은 구조에서 막이 위쪽만 두꺼우면 void, 저항 증가, reliability 문제가 생기기 때문이다."],
    measure: ["단면 SEM/TEM으로 top, sidewall, bottom thickness 비를 확인한다."],
    connections: ["[[박막 증착]]", "[[Step Coverage]]", "[[PVD vs CVD vs ALD]]", "[[ALD Window]]"],
    questions: ["high aspect ratio 구조에서 precursor starvation을 더 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "selectivity", title: "선택비", type: "concept", confidence: "high", tags: ["concept", "etch", "materials"], summary: "원하는 재료는 잘 제거하면서 다른 재료는 덜 깎이게 만드는 식각 공정의 핵심 비율.",
    sources: [SOURCE.fiveProcesses, SOURCE.metaGuide], quote: "선택비는 단순 숫자가 아니라, 공정이 어디까지 용서받을 수 있는지 보여 주는 안전 여유다.",
    what: ["식각 대상막과 마스크·하부막 사이의 식각 속도 비율을 뜻한다."],
    how: ["반응 가스 조합과 플라즈마 조건, 표면 passivation이 재료별 선택비를 바꾼다."],
    why: ["선택비가 낮으면 over etch 과정에서 하부 구조 손상과 CD 손실이 빠르게 커지기 때문이다."],
    measure: ["각 재료의 etch rate와 profile 변화를 비교해 산출한다."],
    connections: ["[[식각]]", "[[할로젠 식각 가스]]", "[[습식 식각 vs 건식 식각]]", "[[계측]]"],
    questions: ["anisotropy와 selectivity를 동시에 잡는 조건 최적화 사례를 더 넣을 수 있다."],
  },
  {
    dir: "concepts", slug: "step-coverage", title: "Step Coverage", type: "concept", confidence: "high", tags: ["concept", "deposition", "profile"], summary: "단차 구조의 상단·측벽·바닥에 형성된 막 두께 비를 보는 지표.",
    sources: [SOURCE.fiveProcesses, SOURCE.sputtering], quote: "step coverage는 막이 존재하는지보다, 원하는 위치까지 도달했는지를 묻는 지표다.",
    what: ["단차 구조에서 상단 대비 측벽과 바닥 두께가 얼마나 유지되는지를 뜻한다."],
    how: ["PVD는 직진성 때문에 overhang이 생기기 쉽고, CVD/ALD는 상대적으로 더 높은 coverage를 얻는다."],
    why: ["via와 trench 바닥까지 막이 충분히 형성되지 않으면 전기적 불량과 reliability 문제가 생긴다."],
    measure: ["bottom coverage, sidewall coverage 비율을 계산한다."],
    connections: ["[[박막 증착]]", "[[Conformality]]", "[[Reactive Sputtering]]", "[[PVD vs CVD vs ALD]]"],
    questions: ["실제 contact/via resistance와 step coverage의 상관 사례를 추가할 수 있다."],
  },
  {
    dir: "concepts", slug: "target-poisoning", title: "Target Poisoning", type: "concept", confidence: "high", tags: ["concept", "sputtering", "plasma"], summary: "reactive sputtering에서 타깃 표면이 화합물층으로 덮이며 공정이 급격히 민감해지는 현상.",
    sources: [SOURCE.sputtering], quote: "reactive sputtering에서 가장 다루기 어려운 순간은 막이 잘 붙는 순간이 아니라 타깃까지 반응해 버리는 순간이다.",
    what: ["reactive gas가 많아져 타깃 표면이 산화물·질화물 같은 화합물층으로 덮이는 현상이다."],
    how: ["타깃이 compound mode로 전환되면 sputter yield, 전압, deposition rate, 막 조성이 비선형적으로 변한다."],
    why: ["원하는 화합물막 형성에는 reactive gas가 필요하지만, 과도하면 생산성과 안정성이 급격히 나빠진다."],
    measure: ["deposition rate, sheet resistance, hysteresis, optical emission, chamber parameter drift를 본다."],
    connections: ["[[Reactive Sputtering]]", "[[아르곤]]", "[[박막 증착]]"],
    questions: ["closed-loop gas control 전략을 후속 보강할 수 있다."],
  },
];

const topicPages = [
  {
    dir: "topics", slug: "data-driven-fab", title: "데이터 기반 Fab", type: "topic", confidence: "high", tags: ["topic", "data", "fab"], summary: "공정·설비·계측·소자 데이터를 함께 읽어 fab 운영을 최적화하는 관점.",
    sources: [SOURCE.fiveProcesses, SOURCE.spotfireLecture, SOURCE.spotfireData], quote: "fab는 공정 장비의 집합이 아니라 데이터로 학습하는 시스템에 가깝다.",
    what: ["데이터 기반 Fab는 설비 센서, 계측, 소자, 수율 데이터를 통합해 공정을 운영하는 관점이다."],
    how: ["SPC와 FDC, 시각화, correlation 분석을 통해 원인을 좁히고 recipe 최적화를 반복한다."],
    why: ["미세화 이후에는 변수 수가 너무 많아 경험만으로는 공정 상태를 안정적으로 유지하기 어렵기 때문이다."],
    measure: ["cycle time, yield, abnormal detection lead time, process drift reduction을 본다."],
    connections: ["[[데이터 시각화]]", "[[SPC]]", "[[FDC]]", "[[수율 분석]]", "[[산업 핫이슈]]"],
    questions: ["향후 AI 기반 root cause analysis 노트를 별도 토픽으로 만들 수 있다."],
  },
  {
    dir: "topics", slug: "industry-hot-issues", title: "산업 핫이슈", type: "topic", confidence: "medium", tags: ["topic", "industry", "trend"], summary: "EUV, 패키징, 메모리 경쟁 구도를 현재 산업 맥락으로 엮는 노트.",
    sources: [SOURCE.spotfireIssue, SOURCE.news], quote: "기술 노드는 정적이지만, 산업 핫이슈는 그 노드들이 지금 왜 중요한지를 계속 다시 써 준다.",
    what: ["현재 반도체 업계에서 중요하게 다뤄지는 기술·제품·패키징 이슈를 모아 놓은 노트다."],
    how: ["정적 소스와 최신 뉴스 데이터를 함께 읽어 [[EUV]], [[HBM]], [[MR-MUF]], [[메모리 반도체]]에 연결한다."],
    why: ["사용자는 기술 자체뿐 아니라 그 기술이 지금 산업에서 왜 중요해졌는지 이해하고 싶어 하기 때문이다."],
    measure: ["시장 점유율 변화, 양산 일정, 성능 지표, 고객 채택 여부 같은 외부 신호를 본다."],
    connections: ["[[EUV]]", "[[HBM]]", "[[MR-MUF]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[메모리 반도체]]"],
    questions: ["패키징 하위 섹션을 독립 토픽으로 분리할지 검토할 수 있다."],
  },
  {
    dir: "topics", slug: "metrology-to-device-linkage", title: "계측에서 소자 특성으로", type: "topic", confidence: "high", tags: ["topic", "linkage", "causality"], summary: "CD·overlay·두께 같은 계측 값이 Vth·Idsat·leakage로 어떻게 번역되는지 정리한 연결 노트.",
    sources: [SOURCE.metrology1, SOURCE.metrology2, SOURCE.spotfireLecture], quote: "좋은 계측 해석은 숫자를 읽는 것이 아니라, 그 숫자가 소자 물리에서 무엇으로 바뀌는지 읽는 일이다.",
    what: ["inline metrology와 electrical characterization 사이의 인과 관계를 정리한 노트다."],
    how: ["예를 들어 gate CD와 overlay는 effective channel length, overlap capacitance, leakage로 이어진다."],
    why: ["이 연결을 이해해야 공정 엔지니어가 계측 값을 보고 소자 위험을 미리 예측할 수 있다."],
    measure: ["CD shift, thickness shift, overlay error와 Vth/Idsat/SS/DIBL 변화의 상관을 본다."],
    connections: ["[[계측]]", "[[소자 특성 분석]]", "[[문턱전압]]", "[[DIBL]]", "[[공정→계측→소자→수율 파이프라인]]"],
    questions: ["각 계측 항목별 민감도 매트릭스를 후속으로 추가할 수 있다."],
  },
  {
    dir: "topics", slug: "process-integration-map", title: "공정 통합 맵", type: "topic", confidence: "high", tags: ["topic", "integration", "map"], summary: "개별 공정을 독립 노드가 아니라 앞뒤 제약 조건이 있는 통합 시퀀스로 읽는 노트.",
    sources: [SOURCE.fiveProcesses, SOURCE.hkmg, SOURCE.metaGuide], quote: "좋은 integration 감각은 '이 공정이 좋다'가 아니라 '이 공정이 다음 공정에 무엇을 남기는가'를 보는 데서 나온다.",
    what: ["공정 간 선후행 제약과 trade-off를 지도처럼 정리한 노트다."],
    how: ["포토 profile이 식각 bias를 만들고, 식각 형상이 증착 coverage를 좌우하며, 증착 결과가 CMP 난이도와 전기 특성으로 이어진다."],
    why: ["공정을 따로 최적화하면 국부 최적에 빠지기 쉽고, integration 관점이 있어야 전체 수율 최적화가 가능하기 때문이다."],
    measure: ["각 스텝의 로컬 KPI보다 chain 전체의 전기 특성과 수율 개선으로 판단해야 한다."],
    connections: ["[[5대 공정]]", "[[포토리소그래피]]", "[[식각]]", "[[박막 증착]]", "[[CMP와 세정]]", "[[High-K Metal Gate]]"],
    questions: ["BEOL과 패키징 제약까지 포함한 확장 integration map을 만들 수 있다."],
  },
  {
    dir: "topics", slug: "sk-hynix-memory-positioning", title: "SK하이닉스 메모리 포지셔닝", type: "topic", confidence: "high", tags: ["topic", "hynix", "memory"], summary: "HBM, GDDR7, LPDDR6, NAND 축에서 SK하이닉스의 현재 포지션과 차별화 포인트를 정리한 노트.",
    sources: [SOURCE.hynixTech, SOURCE.metrics, SOURCE.spotfireIssue], quote: "지금의 SK하이닉스는 단순 DRAM 업체가 아니라 AI 메모리 병목을 가장 잘 해결하는 회사로 읽는 편이 맞다.",
    what: ["SK하이닉스의 메모리 제품 포트폴리오와 차별화 포인트를 정리한 산업 노트다."],
    how: ["HBM에서는 [[MR-MUF]]와 높은 점유율, GDDR7에서는 48GB 세계 최초, LPDDR6에서는 DVFS 기반 전력 효율을 축으로 읽는다."],
    why: ["제품 하나가 아니라 포트폴리오 전체가 AI 워크로드 병목을 어떻게 푸는지 이해해야 회사의 전략이 보인다."],
    measure: ["HBM bandwidth·capacity·yield, GDDR7 capacity, LPDDR6 전력 효율 같은 지표를 본다."],
    connections: ["[[HBM]]", "[[MR-MUF]]", "[[메모리 반도체]]", "[[산업 핫이슈]]"],
    questions: ["향후 logic base die, packaging partnership, customer mix 변화까지 추적할 필요가 있다."],
  },
];

extendPage(sourcePages, "hkmg-source", {
  how: [
    "[source:HKMG.docx]를 바탕으로 [[High-K Metal Gate]], [[High-k 유전체]], [[금속 게이트]], [[폴리실리콘 게이트]], [[폴리실리콘 게이트 vs 금속 게이트]]를 재구성했다.",
    "poly depletion, Fermi level pinning, mobility 저하, work function tuning 한계를 각각 분리해 어떤 문제가 High-k의 몫이고 어떤 문제가 metal gate의 몫인지 다시 써 넣었다.",
    "기존 공정 페이지의 thin film, ALD, leakage current 설명도 이 소스의 관점에 맞게 교차 업데이트했다.",
  ],
  measure: [
    "핵심 검증 항목은 gate leakage, EOT, threshold voltage, mobility, subthreshold slope, DIBL이다.",
    "High-k가 두꺼운 물리막으로도 같은 정전용량을 만드는지와 Metal Gate가 work function tuning을 얼마나 안정화하는지가 중요하다.",
    "특히 leakage를 줄였는데도 EOT 손실이나 mobility 저하가 남는다면, 재료 도입의 이점이 실제 소자 성능으로 충분히 번역되지 않았다는 뜻이다.",
  ],
  connections: [
    "[[High-K Metal Gate]]",
    "[[High-k 유전체]]",
    "[[금속 게이트]]",
    "[[폴리실리콘 게이트]]",
    "[[폴리실리콘 게이트 vs 금속 게이트]]",
    "[[Gate Oxide Tunneling]]",
    "[[누설전류]]",
  ],
});

extendPage(sourcePages, "reactive-sputtering-source", {
  how: [
    "[source:Reactive Sputtering 발표자료.pptx]를 바탕으로 [[Reactive Sputtering]], [[Target Poisoning]], [[아르곤]], [[PVD vs CVD vs ALD]]를 구성했다.",
    "loadlock 준비, pre-sputtering, Ar 플라즈마 점화, N2 투입, 증착 종료까지 장비 시퀀스를 노트 안에 녹여 실제 공정 흐름이 보이도록 했다.",
    "저항 데이터는 조건 변화가 단순 선형이 아니라 공정 전환 영역을 가진다는 점을 보여 주는 사례로 사용했다.",
  ],
  measure: [
    "발표자료에는 point별 sheet resistance와 non-uniformity가 제시되어 있다.",
    "thickness, resistance, uniformity를 함께 봐야 target poisoning과 compound mode 전환을 해석할 수 있다.",
    "검증 실험 오차와 blank 영역 침투, 표면 거칠기, contact 저항 같은 오차 원인도 함께 읽어야 recipe 최적화가 현실적으로 된다.",
  ],
  connections: [
    "[[Reactive Sputtering]]",
    "[[Target Poisoning]]",
    "[[아르곤]]",
    "[[박막 증착]]",
    "[[PVD Overhang]]",
    "[[PVD vs CVD vs ALD]]",
  ],
});

extendPage(sourcePages, "spotfire-lecture-source", {
  how: [
    "[source:[Lecture] Spotfire.pdf]를 바탕으로 [[데이터 시각화]], [[데이터 기반 Fab]], [[SPC]], [[수율 분석]]을 데이터 해석 관점에서 확장했다.",
    "Anscombe's quartet, Simpson's paradox, ANOVA 같은 예시를 반도체 공정 데이터 맥락으로 다시 읽어 숫자 요약과 분포 해석의 차이를 강조했다.",
    "공정 상관관계 분석 예시를 통해 공정 엔지니어가 단순 보고가 아니라 원인 설명을 해야 한다는 점을 강조했다.",
  ],
  connections: [
    "[[데이터 시각화]]",
    "[[데이터 기반 Fab]]",
    "[[SPC]]",
    "[[수율 분석]]",
    "[[계측에서 소자 특성으로]]",
    "[[산업 핫이슈]]",
  ],
});

extendPage(sourcePages, "meta-guide-source", {
  connections: [
    "[[위키 인덱스]]",
    "[[전체 지식 지도]]",
    "[[5대 공정]]",
    "[[High-K Metal Gate]]",
    "[[Reactive Sputtering]]",
    "[[저온 공정]]",
    "[[PVD Overhang]]",
    "[[누설전류 억제 전략]]",
    "[[BARC]]",
    "[[SPC와 FDC 비교]]",
  ],
});

extendPage(entityPages, "argon", {
  what: [
    "Ar은 비활성 기체로, sputtering과 plasma ignition에서 가장 흔히 쓰이는 working gas다.",
    "reactive sputtering에서는 화학 반응을 일으키는 가스가 아니라, 타깃을 때릴 운동량을 전달하는 기반 가스다.",
  ],
  how: [
    "플라즈마에서 Ar+ 이온이 타깃을 때려 원자를 튀겨내고, reactive sputtering에서는 기본 충돌 에너지원 역할을 한다.",
    "N2나 O2 같은 reactive gas가 조성을 바꾸더라도, 실제 sputter yield를 좌우하는 충돌원은 대개 Ar 플라즈마다.",
  ],
  why: [
    "He나 Ne보다 무거워 운동량 전달이 효율적이고, 반응성이 낮아 공정 화학을 과도하게 방해하지 않으며, 비용도 적절하다.",
    "Kr, Xe처럼 더 무거운 가스도 가능하지만 공정 비용과 운용성이 떨어져, Ar이 비활성+질량+경제성의 균형점이 된다.",
  ],
  measure: [
    "플라즈마 안정성, deposition rate, target sputter yield, chamber pressure 변화를 함께 본다.",
    "같은 power라도 working gas 조건이 달라지면 plasma ignition 안정성과 막질, 비저항이 함께 흔들릴 수 있다.",
  ],
  connections: ["[[Reactive Sputtering]]", "[[Target Poisoning]]", "[[PVD Overhang]]", "[[PVD vs CVD vs ALD]]"],
});

extendPage(entityPages, "hmds", {
  what: [
    "Hexamethyldisilazane의 약자로, photo 이전 wafer surface priming에 쓰인다.",
    "포토 공정에서 PR 자체가 아니라, PR이 잘 붙도록 표면의 화학 상태를 조정하는 보조 재료다.",
  ],
  how: [
    "표면의 수분과 반응해 소수성을 높이고, PR이 균일하게 퍼지고 잘 붙도록 만든다.",
    "베이크와 함께 쓰일 때 표면 수분을 줄이고, 이후 [[BARC]]나 PR 스택이 안정적으로 형성되도록 돕는다.",
  ],
  why: [
    "수분이 남아 있으면 PR 접착과 패턴 안정성이 나빠지므로, 미세 패턴에서 HMDS 전처리가 중요하다.",
    "특히 미세 CD일수록 edge bead, lifting, pattern collapse 같은 문제가 공정 변동을 키우므로, HMDS는 단순 보조제가 아니라 수율 안정화 요소가 된다.",
  ],
  connections: ["[[포토리소그래피]]", "[[포토레지스트]]", "[[BARC]]", "[[ADI CD]]"],
});

extendPage(entityPages, "photoresist", {
  what: [
    "포토레지스트는 polymer, PAC, solvent로 이루어진 감광성 고분자 재료다.",
    "노광 전에는 균일한 막이어야 하고, 노광 후에는 선택적으로 용해도 차이를 보여야 하는 화학 시스템이다.",
  ],
  how: [
    "노광 후 현상 과정에서 positive PR은 노광부가 녹고, negative PR은 비노광부가 녹는다.",
    "실제 공정에서는 HMDS priming, bake, [[BARC]] 조합까지 포함한 스택 전체가 패턴 품질을 결정한다.",
  ],
  connections: ["[[포토리소그래피]]", "[[HMDS]]", "[[BARC]]", "[[ADI CD]]"],
});

extendPage(entityPages, "mr-muf", {
  how: [
    "적층된 die와 bump 사이의 기계적·열적 안정성을 높이면서 생산성과 신뢰성을 확보하는 방향으로 쓰인다.",
    "공개 자료 기준으로는 낮은 압력 조건과 자기 정렬 효과를 활용해 고단 적층과 열 방출 측면에서 이점을 노리는 전략으로 읽힌다.",
  ],
  why: [
    "HBM은 die 적층 수가 늘수록 열, 응력, warpage, 수율 문제가 커지므로 underfill 전략이 차별화 포인트가 된다.",
    "SK하이닉스가 MR-MUF를 강조하는 이유도 단순 packaging 공정 차이가 아니라, 적층 생산성과 열 방출 성능을 동시에 확보하려는 선택으로 읽을 수 있다.",
  ],
  measure: [
    "열 저항, warpage, 패키지 신뢰성, 수율 관점에서 성능을 판단한다.",
    "고단 적층으로 갈수록 underfill 공정의 균일성과 void 억제가 실제 양품률을 좌우한다.",
  ],
  connections: ["[[HBM]]", "[[TSV]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[산업 핫이슈]]"],
});

extendPage(entityPages, "ldd", {
  why: [
    "drain 쪽 전계 집중을 줄여 HCI와 short-channel 문제를 완화하기 위해 도입되었다.",
    "series resistance를 조금 희생하더라도 hot carrier damage를 줄이는 편이 전체 신뢰성에는 유리한 경우가 많다.",
  ],
  measure: [
    "hot carrier reliability, series resistance, DIBL, drive current 변화를 함께 본다.",
    "전계 피크가 줄면 누설과 장기 신뢰성은 좋아질 수 있지만, on-current 희생과의 균형도 같이 봐야 한다.",
  ],
  connections: ["[[Halo Doping]]", "[[확산과 이온주입]]", "[[Hot Carrier Injection]]", "[[누설전류]]"],
});

extendPage(entityPages, "high-k-dielectric", {
  how: [
    "유전율이 높기 때문에 같은 capacitance를 더 두꺼운 물리막으로 구현할 수 있어 tunneling을 줄인다.",
    "다만 계면 품질과 remote phonon scattering 같은 부작용이 생길 수 있어, 재료 도입만으로 모든 문제가 끝나지는 않는다.",
  ],
  connections: ["[[High-K Metal Gate]]", "[[ALD Window]]", "[[Gate Oxide Tunneling]]", "[[누설전류]]", "[[금속 게이트]]"],
});

extendPage(entityPages, "metal-gate", {
  how: [
    "공핍층이 생기지 않고 work function tuning이 가능해 NMOS/PMOS 요구치에 맞추기 쉽다.",
    "poly-Si처럼 gate 내부에서 전압을 먹어버리는 depletion 효과가 작아, high-k 도입 이점을 더 직접적으로 채널에 전달할 수 있다.",
  ],
  connections: ["[[High-K Metal Gate]]", "[[폴리실리콘 게이트]]", "[[폴리실리콘 게이트 vs 금속 게이트]]", "[[문턱전압]]", "[[Gate Oxide Tunneling]]"],
});

extendPage(entityPages, "poly-si-gate", {
  how: [
    "self-aligned gate 구현과 고온 공정 호환성 덕분에 오랫동안 표준으로 쓰였다.",
    "도핑된 반도체이기 때문에 초기 CMOS 세대에서는 integration 측면에서 금속보다 실용적이었다.",
  ],
  why: [
    "하지만 depletion과 work function 한계 때문에 high-k와의 조합에서 문제가 드러나 metal gate로 대체되었다.",
    "즉 poly-Si는 한 시대의 최적해였지만, 미세화와 high-k 도입 이후에는 같은 장점이 오히려 병목으로 돌아왔다.",
  ],
  connections: ["[[금속 게이트]]", "[[High-K Metal Gate]]", "[[폴리실리콘 게이트 vs 금속 게이트]]", "[[Gate Oxide Tunneling]]"],
});

extendPage(entityPages, "ald-window", {
  why: [
    "이 창을 벗어나면 ALD의 장점인 두께 제어와 균일성이 무너진다.",
    "특히 high-k 같은 민감한 막질에서는 window 밖 조건이 곧 조성 불안정, 불순물 증가, 누설 특성 악화로 이어질 수 있다.",
  ],
  connections: ["[[박막 증착]]", "[[PVD vs CVD vs ALD]]", "[[High-k 유전체]]", "[[Conformality]]", "[[저온 공정]]"],
});

extendPage(entityPages, "hbm", {
  connections: ["[[메모리 반도체]]", "[[DRAM]]", "[[TSV]]", "[[MR-MUF]]", "[[SK하이닉스 메모리 포지셔닝]]", "[[산업 핫이슈]]"],
});

extendPage(conceptPages, "photolithography", {
  what: [
    "마스크의 패턴을 PR 위에 전사해 후속 식각·증착 공정의 좌표계를 정하는 공정이다.",
    "PR, HMDS, [[BARC]], 노광 광원, alignment, develop가 핵심 구성요소다.",
  ],
  how: [
    "웨이퍼 표면을 prime한 뒤 PR을 도포하고, 마스크를 통해 빛을 쏘아 선택 영역만 화학적으로 바꾼 뒤 현상한다.",
    "실제 공정에서는 HMDS priming, bake, [[BARC]] 반사 억제, develop 조건까지 포함한 스택 전체가 패턴 fidelity를 좌우한다.",
    "이후 [[ADI CD]]와 [[오버레이]]를 측정해 패턴 품질을 확인한다.",
  ],
  connections: ["[[ADI CD]]", "[[오버레이]]", "[[포토레지스트]]", "[[HMDS]]", "[[BARC]]", "[[EUV]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
});

extendPage(conceptPages, "thin-film-deposition", {
  why: [
    "막질이 같아도 구조와 thermal budget이 다르면 최적 증착 방식이 달라진다.",
    "특히 3D 구조 시대에는 단순 증착 속도보다 [[Conformality]]와 [[Step Coverage]]가 중요해졌다.",
    "또 BEOL이나 민감한 재료 위로 갈수록 [[저온 공정]] 요구가 커져, 같은 막이라도 공정 선택 기준이 다시 달라진다.",
  ],
  connections: ["[[Reactive Sputtering]]", "[[PVD vs CVD vs ALD]]", "[[ALD Window]]", "[[Conformality]]", "[[Step Coverage]]", "[[PVD Overhang]]", "[[저온 공정]]", "[[High-K Metal Gate]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
});

extendPage(conceptPages, "reactive-sputtering", {
  how: [
    "Ar 플라즈마가 타깃을 때려 원자를 방출하고, reactive gas가 표면이나 타깃과 반응해 원하는 막 조성을 만든다.",
    "실무 흐름으로는 loadlock 준비 → Ar 점화 → pre-sputtering → reactive gas 투입 → deposition 순으로 안정화 단계가 중요하다.",
  ],
  measure: [
    "thickness, sheet resistance, uniformity, hysteresis, deposition rate를 본다.",
    "특히 N2 flow와 power 변화에 따른 비저항, 막 두께, 면저항 오차를 같이 봐야 recipe 최적점을 찾을 수 있다.",
  ],
  connections: ["[[Target Poisoning]]", "[[아르곤]]", "[[PVD Overhang]]", "[[PVD vs CVD vs ALD]]", "[[계측]]", "[[소자 특성 분석]]", "[[수율 분석]]"],
});

extendPage(conceptPages, "metrology", {
  how: [
    "photo 이후에는 [[ADI CD]], etch 이후에는 [[ACI CD]], 층간 정렬은 [[오버레이]]처럼 step별 계측이 붙는다.",
    "inline metrology는 공정 직후 구조를 읽고, electrical characterization은 그 결과가 [[문턱전압]]이나 [[DIBL]]로 어떻게 번역되는지 읽는 식으로 연결된다.",
  ],
});

extendPage(conceptPages, "device-characterization", {
  how: [
    "wafer와 site별 분포를 보고 공정 variation이 전기 특성에 어떻게 번역되었는지 확인한다.",
    "교안 예시처럼 같은 wafer 안에서도 위치별 Vtsat, Idsat가 달라질 수 있으므로, 평균값보다 공간 분포가 더 중요할 때가 많다.",
  ],
  connections: ["[[문턱전압]]", "[[Subthreshold Slope]]", "[[DIBL]]", "[[GIDL]]", "[[Hot Carrier Injection]]", "[[Punch Through]]", "[[Gate Oxide Tunneling]]", "[[누설전류]]", "[[수율 분석]]", "[[공정→계측→소자→수율 파이프라인]]"],
});

extendPage(conceptPages, "spc", {
  what: [
    "SPC는 Statistical Process Control의 약자로, 결과 데이터 기반 공정 관리 체계다.",
    "설비가 무엇을 했는지보다 wafer 결과가 통계적으로 안정 상태에 있는지를 판정하는 언어에 가깝다.",
  ],
  how: [
    "관리도, Cpk, run rule 등을 이용해 공정 결과가 정상 범위를 벗어나는지 모니터링한다.",
    "lot 평균 이동, 이상점 출현, 장기 drift 같은 패턴을 읽어 공정 조건 변경이나 설비 이상을 의심한다.",
  ],
  why: [
    "수율 문제가 심각해지기 전에 drift와 abnormal pattern을 미리 잡기 위해 필요하다.",
    "동일 spec 안에서도 분포가 기울기 시작하는 순간을 잡아야, 대형 loss로 번지기 전에 개입할 수 있다.",
  ],
  measure: [
    "UCL/LCL, mean shift, Cpk, lot trend를 본다.",
    "중요한 것은 단일 숫자보다도 시간에 따른 분포와 이상 패턴의 지속성이다.",
  ],
});

extendPage(conceptPages, "fdc", {
  how: [
    "pressure, temperature, gas flow, RF power, valve position 같은 실시간 파라미터를 정상 패턴과 비교한다.",
    "rule 기반 alarm뿐 아니라 waveform deviation, multi-sensor correlation 같은 이상 징후를 조기에 잡는 방식으로 운용된다.",
  ],
  why: [
    "결과 계측만으로는 늦을 수 있으므로, upstream 설비 상태에서 이상을 먼저 잡기 위해 필요하다.",
    "즉 SPC가 결과를 보고 판단한다면, FDC는 결과가 나빠지기 전 설비 쪽 신호를 먼저 읽는다는 점에서 별개 가치가 있다.",
  ],
  connections: ["[[SPC와 FDC 비교]]", "[[SPC]]", "[[데이터 기반 Fab]]", "[[수율 분석]]", "[[계측]]"],
});

extendPage(conceptPages, "leakage-current", {
  what: [
    "누설전류는 OFF 상태에서도 흐르는 전류로, HCI, gate oxide tunneling, DIBL, GIDL, punch-through 등 다양한 메커니즘을 포함한다.",
    "같은 누설이라도 발생 위치와 원인이 달라, 구조/재료/도핑/전계 완화 전략도 각각 달라진다.",
  ],
  measure: [
    "off current, gate leakage, retention loss, Vth shift를 본다.",
    "메커니즘별로는 gate leakage, junction leakage, subthreshold leakage처럼 구분해서 봐야 진짜 원인을 좁힐 수 있다.",
  ],
  connections: ["[[문턱전압]]", "[[DIBL]]", "[[GIDL]]", "[[Punch Through]]", "[[Gate Oxide Tunneling]]", "[[Hot Carrier Injection]]", "[[High-K Metal Gate]]", "[[LDD]]", "[[Halo Doping]]", "[[FinFET]]", "[[GAA]]", "[[누설전류 억제 전략]]", "[[수율 분석]]"],
});

extendPage(conceptPages, "step-coverage", {
  how: [
    "PVD는 직진성 때문에 overhang이 생기기 쉽고, CVD/ALD는 상대적으로 더 높은 coverage를 얻는다.",
    "특히 high aspect ratio 구조에서는 입구 쪽이 먼저 막히며 [[PVD Overhang]]과 poor bottom coverage가 동시에 나타날 수 있다.",
  ],
  connections: ["[[박막 증착]]", "[[Conformality]]", "[[PVD Overhang]]", "[[Reactive Sputtering]]", "[[PVD vs CVD vs ALD]]"],
});

entityPages.push(
  {
    dir: "entities", slug: "barc", title: "BARC", type: "entity", confidence: "medium", tags: ["entity", "photo", "optics"], summary: "반사광을 줄여 standing wave와 CD 변동을 완화하는 포토 보조막.",
    sources: [SOURCE.metaGuide, SOURCE.fiveProcesses], quote: "미세 포토에서 빛은 내려가기만 하지 않고 다시 튀어 오기 때문에, BARC는 광학적 노이즈를 줄이는 안전장치가 된다.",
    what: ["BARC는 Bottom Anti-Reflective Coating의 약자로, PR 아래쪽에 두어 반사광을 줄이는 보조막이다.", "특히 미세 패턴에서 standing wave와 swing effect를 줄이는 역할을 한다."],
    how: ["입사광이 하부막에서 다시 반사되어 PR 내부 간섭을 만들지 않도록 광학 경로를 조절한다.", "덕분에 PR 프로파일과 CD 균일도가 더 안정적으로 유지된다."],
    why: ["반사광이 크면 같은 노광 조건에서도 wafer 위치나 하부막 상태에 따라 CD가 흔들릴 수 있기 때문이다.", "즉 BARC는 해상도를 키우는 재료라기보다, 이미 확보한 해상도를 실제 공정에서 잃지 않게 만드는 층이다."],
    measure: ["ADI CD 균일도, reflectivity, standing wave 억제 정도, PR profile 변화를 본다.", "공정적으로는 CD 분포와 line edge roughness 개선 여부가 실효성을 보여 준다."],
    connections: ["[[포토리소그래피]]", "[[포토레지스트]]", "[[HMDS]]", "[[ADI CD]]", "[[오버레이]]"],
    questions: ["EUV용 underlayer와 기존 BARC의 역할 차이를 더 세분화할 수 있다."],
  },
  {
    dir: "entities", slug: "gidl", title: "GIDL", type: "entity", confidence: "medium", tags: ["entity", "leakage", "device"], summary: "gate-drain overlap 근처의 강한 전계 때문에 생기는 band-to-band tunneling형 누설.",
    sources: [SOURCE.metaGuide, SOURCE.metrology2], quote: "GIDL은 채널 한가운데가 아니라 gate와 drain이 만나는 모서리의 전계가 너무 강해질 때 커진다.",
    what: ["GIDL은 Gate-Induced Drain Leakage의 약자로, gate-drain overlap 부근에서 발생하는 누설 메커니즘이다."],
    how: ["높은 전계가 밴드 간 터널링을 유도해 OFF 상태에서도 전류가 흐르게 만든다.", "특히 얇은 산화막, 높은 drain bias, 급한 전계 분포가 겹치면 민감해진다."],
    why: ["미세화와 고전계 조건에서는 채널 누설만이 아니라 모서리 전계 기반 누설도 함께 커지기 때문이다.", "그래서 공정은 단순 채널 도핑뿐 아니라 overlap 구조와 field shaping까지 같이 설계해야 한다."],
    measure: ["off-state Id-Vg 곡선, drain bias 변화에 따른 leakage, 전계 집중 구조를 함께 본다.", "site별 분포를 보면 특정 레이아웃이나 공정 편차에서 더 두드러질 수 있다."],
    connections: ["[[누설전류]]", "[[문턱전압]]", "[[소자 특성 분석]]", "[[수율 분석]]", "[[누설전류 억제 전략]]"],
    questions: ["spacer 구조와 overlap 최적화가 GIDL에 주는 영향을 별도 노트로 보강할 수 있다."],
  },
  {
    dir: "entities", slug: "hot-carrier-injection", title: "Hot Carrier Injection", type: "entity", confidence: "medium", tags: ["entity", "reliability", "leakage"], summary: "고전계에서 가속된 캐리어가 산화막과 계면을 손상시키는 신뢰성 메커니즘.",
    sources: [SOURCE.metaGuide, SOURCE.metrology2], quote: "HCI는 순간 성능보다 시간이 지난 뒤 문턱전압과 이동도가 어떻게 변하느냐에서 더 무섭다.",
    what: ["Hot Carrier Injection은 강한 전계에서 가속된 전하가 산화막이나 계면에 주입되어 손상을 남기는 현상이다."],
    how: ["주로 drain 쪽 전계 피크에서 에너지를 얻은 캐리어가 계면 trap과 산화막 손상을 유발한다.", "이 손상은 시간이 지나며 Vth shift와 구동 전류 저하로 드러난다."],
    why: ["미세화된 소자에서는 전계가 국부적으로 커지기 쉬워, 단기 특성만 맞춘 공정도 장기 신뢰성에서 문제를 드러낼 수 있기 때문이다."],
    measure: ["stress 전후의 Vth shift, gm 변화, drive current 저하, lifetime 모델을 본다."],
    connections: ["[[LDD]]", "[[누설전류]]", "[[문턱전압]]", "[[소자 특성 분석]]", "[[누설전류 억제 전략]]"],
    questions: ["logic과 memory 주변회로에서 HCI 민감도가 어떻게 다른지 더 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "punch-through", title: "Punch Through", type: "entity", confidence: "medium", tags: ["entity", "leakage", "short-channel"], summary: "source와 drain depletion region이 서로 닿으며 OFF 제어가 무너지는 short-channel 누설.",
    sources: [SOURCE.metaGuide, SOURCE.metrology2], quote: "Punch Through는 gate가 채널을 지키기 전에 source와 drain 쪽 depletion이 먼저 연결돼 버리는 상황이다.",
    what: ["Punch Through는 채널이 너무 짧아 source/drain depletion region이 연결되며 발생하는 누설 메커니즘이다."],
    how: ["gate가 barrier를 세우기도 전에 drain 쪽 전계가 source 쪽까지 침투해 OFF 장벽을 사실상 우회한다.", "채널 도핑, 구조, junction 프로파일이 모두 영향을 준다."],
    why: ["단순히 문턱전압만 맞춘다고 해결되지 않고, 채널 길이와 전계 분포를 구조적으로 다시 설계해야 하기 때문이다."],
    measure: ["off current 증가, channel length 축소에 따른 leakage 급증, drain bias 민감도를 본다."],
    connections: ["[[DIBL]]", "[[누설전류]]", "[[Halo Doping]]", "[[FinFET]]", "[[GAA]]", "[[누설전류 억제 전략]]"],
    questions: ["planar, FinFET, GAA 구조에서 punch-through 억제 메커니즘 차이를 더 보강할 수 있다."],
  },
  {
    dir: "entities", slug: "gate-oxide-tunneling", title: "Gate Oxide Tunneling", type: "entity", confidence: "high", tags: ["entity", "leakage", "oxide"], summary: "게이트 절연막이 너무 얇아질 때 직접 터널링으로 커지는 대표 누설 메커니즘.",
    sources: [SOURCE.metaGuide, SOURCE.hkmg], quote: "SiO2를 얇게 만들수록 정전용량은 좋아졌지만, 어느 순간부터는 gate 전류가 설계를 이겨 버렸다.",
    what: ["Gate Oxide Tunneling은 게이트 절연막을 전자가 직접 통과하며 생기는 누설 전류다."],
    how: ["산화막이 수 nm 이하로 얇아지면 전자가 장벽을 넘는 것이 아니라 터널링으로 통과하기 쉬워진다.", "이 때문에 전통 SiO2 스택은 미세화에 따라 빠르게 한계에 부딪혔다."],
    why: ["게이트 제어력을 높이기 위해 EOT를 줄이면, 동시에 gate leakage가 폭증하는 모순이 생기기 때문이다.", "그래서 [[High-k 유전체]]와 [[High-K Metal Gate]]가 등장해 전기적으로는 얇고 물리적으로는 두꺼운 절연막 전략으로 넘어갔다."],
    measure: ["gate leakage current density, EOT, breakdown 특성, 온도/전압 의존성을 함께 본다."],
    connections: ["[[누설전류]]", "[[High-k 유전체]]", "[[High-K Metal Gate]]", "[[문턱전압]]", "[[누설전류 억제 전략]]"],
    questions: ["interfacial layer 최적화가 leakage와 mobility에 주는 동시 영향까지 더 정리할 수 있다."],
  },
  {
    dir: "entities", slug: "tsv", title: "TSV", type: "entity", confidence: "medium", tags: ["entity", "packaging", "HBM"], summary: "적층된 die를 수직으로 연결해 HBM의 초고대역폭을 가능하게 하는 관통 전극 기술.",
    sources: [SOURCE.metaGuide, SOURCE.spotfireIssue, SOURCE.hynixTech], quote: "HBM의 대역폭은 DRAM 셀 자체만으로 생기는 것이 아니라, die 사이를 어떻게 수직 연결하느냐에서 결정된다.",
    what: ["TSV는 Through-Silicon Via의 약자로, 실리콘 다이를 관통해 수직 전기 연결을 만드는 구조다."],
    how: ["여러 DRAM die를 적층한 뒤 TSV와 마이크로범프, 인터포저를 통해 넓은 I/O를 짧은 경로로 연결한다.", "이 구조 덕분에 높은 bandwidth와 낮은 배선 지연을 동시에 달성할 수 있다."],
    why: ["AI 가속기에서는 클럭보다 총 대역폭과 전력 효율이 중요해, 평면 배선만으로는 병목을 풀기 어렵기 때문이다.", "따라서 TSV는 HBM을 단순 메모리 세대가 아니라 패키징 혁신으로 읽게 만드는 핵심 노드다."],
    measure: ["bandwidth, 적층 수, thermal behavior, package yield, interconnect reliability를 본다."],
    connections: ["[[HBM]]", "[[MR-MUF]]", "[[메모리 반도체]]", "[[산업 핫이슈]]", "[[SK하이닉스 메모리 포지셔닝]]"],
    questions: ["hybrid bonding 확대 시 TSV 역할이 어떻게 재편되는지 계속 추적할 필요가 있다."],
  }
);

conceptPages.push(
  {
    dir: "concepts", slug: "low-temperature-process", title: "저온 공정", type: "concept", confidence: "medium", tags: ["concept", "thermal", "integration"], summary: "하부 구조와 민감한 재료를 보호하기 위해 thermal budget을 낮추는 공정 선택 원리.",
    sources: [SOURCE.metaGuide, SOURCE.fiveProcesses, SOURCE.hkmg], quote: "미세화 이후의 좋은 공정은 더 뜨겁게 하는 공정보다, 꼭 필요한 만큼만 열을 쓰는 공정인 경우가 많다.",
    what: ["저온 공정은 충분한 막질과 특성을 확보하면서도 하부 구조 손상과 재확산을 줄이기 위해 thermal budget을 낮춘 공정 전략이다.", "특히 적층 구조가 많아질수록 상부 공정이 하부 구조를 망가뜨리지 않는 것이 중요해진다."],
    how: ["긴 furnace anneal 대신 [[RTA]] 같은 짧은 열처리를 쓰거나, 증착 방식 선택에서 저온 PECVD/ALD 쪽을 택해 통합 부담을 줄인다.", "BEOL이나 민감한 유전체, 패키징 인접 공정에서는 공정 온도 제한이 사실상 재료 선택 기준이 된다."],
    why: ["온도가 높을수록 반응은 쉬워지지만, 도펀트 재확산, 계면 열화, 응력 증가, 하부 구조 손상이 함께 커지기 때문이다.", "그래서 현대 공정에서는 '가장 잘 되는 조건'보다 '전체 integration이 감당 가능한 조건'이 더 중요해진다."],
    measure: ["thermal budget, junction diffusion, 막 조성/밀도, 누설 특성 변화를 함께 본다.", "같은 성능이라면 더 낮은 온도에서 구현되는 recipe가 integration 관점에서 더 유리한 경우가 많다."],
    connections: ["[[박막 증착]]", "[[ALD Window]]", "[[RTA]]", "[[High-K Metal Gate]]", "[[PVD vs CVD vs ALD]]", "[[공정 통합 맵]]"],
    questions: ["low-temperature 공정이 항상 막질 열세를 갖는지, plasma assist와 후속 anneal 조합으로 어디까지 극복되는지 더 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "pvd-overhang", title: "PVD Overhang", type: "concept", confidence: "high", tags: ["concept", "PVD", "profile"], summary: "line-of-sight 증착에서 구조 입구가 먼저 막히며 생기는 전형적 단차 불량 메커니즘.",
    sources: [SOURCE.metaGuide, SOURCE.sputtering, SOURCE.fiveProcesses], quote: "PVD의 문제는 막이 안 올라가는 것이 아니라, 위쪽에 먼저 쌓여 아래로 못 들어가게 되는 데서 시작된다.",
    what: ["PVD Overhang은 고종횡비 구조에서 입구 상단에 막이 먼저 두꺼워지며 내부 채움이 어려워지는 현상이다.", "결과적으로 shadowing, void, poor bottom coverage가 함께 나타날 수 있다."],
    how: ["PVD는 기본적으로 line-of-sight 성향이 강해, 입자가 측벽 깊숙이 돌아들어가기보다 상단 모서리에 먼저 부착되기 쉽다.", "그 상태에서 입구가 더 좁아지면 후속 입자는 내부보다 상단에 더 잘 쌓이며 문제가 증폭된다."],
    why: ["단차가 깊어질수록 단순 평균 두께보다 어디에 두께가 몰리는지가 더 중요해지기 때문이다.", "그래서 3D 구조에서는 같은 막질이라도 PVD 대신 CVD/ALD가 유리한 경우가 많고, PVD를 쓰더라도 구조와 recipe를 같이 조정해야 한다."],
    measure: ["top/bottom thickness ratio, sidewall profile, void 발생 여부, contact resistance를 본다.", "단면 SEM으로 mouth closure가 나타나는지 확인하는 것이 가장 직관적이다."],
    connections: ["[[박막 증착]]", "[[Reactive Sputtering]]", "[[Step Coverage]]", "[[Conformality]]", "[[PVD vs CVD vs ALD]]", "[[공정 통합 맵]]"],
    questions: ["ionized PVD나 collimated sputtering이 overhang 문제를 얼마나 완화하는지 후속 보강이 가능하다."],
  },
  {
    dir: "concepts", slug: "finfet", title: "FinFET", type: "concept", confidence: "medium", tags: ["concept", "device", "3d"], summary: "채널을 fin 형태로 세워 gate가 더 많은 면을 감싸도록 만든 3D 트랜지스터 구조.",
    sources: [SOURCE.metaGuide, SOURCE.fundamentals], quote: "FinFET은 평면 채널을 더 얇게 버티는 대신, gate가 채널을 더 입체적으로 잡게 만든 구조 전환이었다.",
    what: ["FinFET은 채널을 돌출된 fin 형태로 만들고 gate가 측면까지 감싸는 3D 구조다.", "planar MOSFET보다 gate electrostatics를 강화해 short-channel effect를 줄이는 데 유리하다."],
    how: ["gate가 채널의 세 면을 제어해 drain 전계가 source barrier를 무너뜨리기 어렵게 만든다.", "덕분에 같은 노드에서도 leakage와 DIBL을 줄이며 더 짧은 채널을 허용한다."],
    why: ["평면 구조만으로는 미세화에 따라 [[DIBL]], [[Punch Through]], [[누설전류]]가 감당되지 않았기 때문이다.", "즉 FinFET은 단순 성능 향상이 아니라, 스케일링을 계속하기 위한 전기장 제어 구조의 변화였다."],
    measure: ["DIBL, subthreshold slope, off current, drive current, fin profile uniformity를 본다."],
    connections: ["[[누설전류]]", "[[DIBL]]", "[[Punch Through]]", "[[GAA]]", "[[누설전류 억제 전략]]"],
    questions: ["fin height와 width variation이 전기 특성 분포를 어떻게 흔드는지 더 정리할 수 있다."],
  },
  {
    dir: "concepts", slug: "gaa", title: "GAA", type: "concept", confidence: "medium", tags: ["concept", "device", "3d"], summary: "gate가 채널을 사방에서 둘러싸도록 만들어 electrostatics를 극대화한 차세대 구조.",
    sources: [SOURCE.metaGuide, SOURCE.fundamentals], quote: "GAA는 gate가 채널을 더 많이 감싸면 누설을 더 잘 잡을 수 있다는 아이디어의 극단에 가깝다.",
    what: ["GAA는 Gate-All-Around의 약자로, gate가 채널을 거의 전 방향에서 둘러싸는 구조다.", "nanosheet나 nanowire 형태로 구현되며 FinFET 다음 세대로 자주 언급된다."],
    how: ["채널 둘레 전체를 gate가 제어하므로 short-channel effect 억제력이 더 높고, leakage와 SS 개선 여지가 크다.", "같은 이유로 공정 난이도와 구조 균일도 요구도 함께 상승한다."],
    why: ["FinFET 이후에도 더 짧은 채널과 더 낮은 누설을 동시에 요구받으면서 electrostatics를 한 단계 더 강화할 필요가 있었기 때문이다."],
    measure: ["off current, SS, DIBL, channel uniformity, nanosheet 폭/두께 variation을 본다."],
    connections: ["[[누설전류]]", "[[DIBL]]", "[[Punch Through]]", "[[FinFET]]", "[[누설전류 억제 전략]]"],
    questions: ["MBCFET와 nanosheet 구현 세부 차이를 별도 비교 노트로 확장할 수 있다."],
  }
);

topicPages.push(
  {
    dir: "topics", slug: "leakage-mitigation", title: "누설전류 억제 전략", type: "topic", confidence: "medium", tags: ["topic", "leakage", "device"], summary: "누설 메커니즘과 구조·도핑·재료 기반 해결책을 한 눈에 연결하는 주제 노트.",
    sources: [SOURCE.metaGuide, SOURCE.hkmg, SOURCE.metrology2], quote: "누설전류는 하나의 문제가 아니라 여러 전계 문제의 집합이고, 해결책도 층마다 다르게 배치된다.",
    what: ["이 노트는 [[DIBL]], [[GIDL]], [[Punch Through]], [[Gate Oxide Tunneling]], [[Hot Carrier Injection]] 같은 누설/신뢰성 메커니즘을 한 줄기에 묶는다.", "동시에 [[LDD]], [[Halo Doping]], [[High-K Metal Gate]], [[FinFET]], [[GAA]]가 각각 어떤 문제를 줄이기 위해 등장했는지도 함께 본다."],
    how: ["전계 피크를 낮추는 구조는 [[LDD]], barrier를 지키는 구조는 [[Halo Doping]], gate leakage를 낮추는 재료 선택은 [[High-K Metal Gate]], electrostatics를 강화하는 구조는 [[FinFET]]과 [[GAA]]처럼 분류해 읽는다.", "이렇게 분리해야 '왜 이 기술이 나왔는가'가 누설 메커니즘과 직접 연결된다."],
    why: ["사용자가 원하는 이해는 누설전류 정의 자체보다, 왜 특정 세대에 특정 구조가 등장했는지를 보는 데 있기 때문이다.", "즉 누설 억제 전략 노트는 소자 역사와 공정 선택 이유를 동시에 압축하는 중심 링크 역할을 한다."],
    measure: ["off current, Vth roll-off, DIBL, SS, gate leakage, reliability degradation를 함께 본다.", "해결책은 항상 한 지표만 좋게 하지 않고, on-current·공정 복잡도·수율과의 trade-off까지 같이 봐야 한다."],
    connections: ["[[누설전류]]", "[[DIBL]]", "[[GIDL]]", "[[Punch Through]]", "[[Gate Oxide Tunneling]]", "[[Hot Carrier Injection]]", "[[LDD]]", "[[Halo Doping]]", "[[High-K Metal Gate]]", "[[FinFET]]", "[[GAA]]"],
    questions: ["SOI까지 포함한 더 넓은 leakage mitigation 계보를 추가할지 검토할 수 있다."],
  }
);

for (const page of sourcePages) addPage(page);
for (const page of comparisonPages) addPage(page);
for (const page of entityPages) addPage(page);
for (const page of conceptPages) addPage(page);
for (const page of topicPages) addPage(page);

ensureWikiDirs();
clearMarkdownFiles(WIKI_DIR);
ensureWikiDirs();
writeCatalog();
buildIndexPage();
writeOverviewPage();
writeLogPage();
writeUpdatesReadme();

console.log(`Rebuilt wiki pages: ${pages.length}`);
