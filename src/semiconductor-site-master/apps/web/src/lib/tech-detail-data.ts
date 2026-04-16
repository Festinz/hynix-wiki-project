import hynixData from "@/data/hynix-tech.json";
import metricsData from "@/data/metrics.json";
import newsData from "@/data/news.json";
import samsungData from "@/data/samsung-tech.json";

const SLUG_MAP: Record<string, string> = {
  hbm4: "HBM4",
  ddr5: "DDR5",
  gddr7: "GDDR7",
  lpddr6: "LPDDR6",
  nand: "NAND",
};

export function getLineupKey(slug: string) {
  return SLUG_MAP[slug.toLowerCase()] || null;
}

export function getLineup(company: "samsung" | "hynix", key: string) {
  const source = company === "samsung" ? samsungData : hynixData;
  return (source.lineups as any)[key] || null;
}

export function getMetrics(key: string) {
  return (metricsData as any)[key] || null;
}

const SLUG_CATEGORIES: Record<string, string[]> = {
  HBM4: ["hbm", "packaging"],
  DDR5: ["memory"],
  GDDR7: ["memory"],
  LPDDR6: ["memory"],
  NAND: ["memory", "market"],
};

interface NewsItem {
  title: string;
  summary: string;
  category: string;
  importance: "breaking" | "major" | "normal";
  date?: string;
  sourceUrl?: string;
  company?: string;
}

export function getRelatedNews(key: string, company: string, limit = 4): NewsItem[] {
  const categories = SLUG_CATEGORIES[key] || [];
  return (newsData as NewsItem[])
    .filter(
      (n) =>
        categories.includes(n.category) &&
        (n.company === company || n.company === "both" || n.company === "industry")
    )
    .slice(0, limit);
}

export interface SpecRow {
  label: string;
  value: string | null;
  competitorValue: string | null;
  unit: string;
}

function withUnit(value: string | null | undefined, unit?: string) {
  if (value == null || value === "") return null;
  return unit ? `${value} ${unit}` : String(value);
}

export function buildSpecs(lineup: any, metricsCompany: any, metricsCompetitor: any): SpecRow[] {
  const specs = lineup?.specs || {};

  return [
    {
      label: "전송속도",
      value: specs.pinSpeed?.value || withUnit(metricsCompany?.pinSpeed, "Gbps"),
      competitorValue: withUnit(metricsCompetitor?.pinSpeed, "Gbps"),
      unit: "",
    },
    {
      label: "대역폭",
      value: specs.bandwidth?.value || withUnit(metricsCompany?.bandwidth, "TB/s"),
      competitorValue: withUnit(metricsCompetitor?.bandwidth, "TB/s"),
      unit: "",
    },
    {
      label: "용량",
      value: specs.capacity?.value || withUnit(metricsCompany?.capacity, "GB"),
      competitorValue: withUnit(metricsCompetitor?.capacity, "GB"),
      unit: "",
    },
    {
      label: "전력효율",
      value: specs.powerEfficiency?.value || withUnit(metricsCompany?.powerEfficiency, "%"),
      competitorValue: withUnit(metricsCompetitor?.powerEfficiency, "%"),
      unit: "",
    },
    {
      label: "공정 노드",
      value: specs.processNode || metricsCompany?.processNode || null,
      competitorValue: metricsCompetitor?.processNode || null,
      unit: "",
    },
  ].filter((row) => row.value || row.competitorValue);
}

export function getJedec(metricsCompany: any, jedecData: any) {
  if (!metricsCompany?.actualAchieved || !jedecData?.pinSpeed) return null;
  return {
    achieved: parseFloat(metricsCompany.actualAchieved),
    target: parseFloat(jedecData.pinSpeed),
    unit: "Gbps",
  };
}

export interface AnalogyData {
  emoji: string;
  title: string;
  description: string;
}

const ANALOGIES: Record<string, AnalogyData> = {
  HBM4: {
    emoji: "🏙️",
    title: "수직으로 쌓은 초고속 메모리 타워",
    description:
      "HBM은 여러 DRAM die를 TSV로 수직 연결해 같은 면적에서 훨씬 더 많은 데이터를 동시에 보내는 구조입니다. GPU 바로 옆의 초고층 메모리 빌딩처럼 이해하면 편합니다.",
  },
  DDR5: {
    emoji: "🚄",
    title: "차선이 늘어난 고속철도",
    description:
      "DDR5는 DDR4보다 더 높은 속도와 더 많은 병렬 처리를 지원합니다. 같은 시간에 더 많은 데이터를 싣고 달릴 수 있는 고속철도에 가깝습니다.",
  },
  GDDR7: {
    emoji: "🎮",
    title: "GPU 주변의 고속 외곽도로",
    description:
      "GDDR7은 HBM처럼 수직 적층은 아니지만, GPU 주변에 여러 칩을 배치해 그래픽과 AI 추론에 필요한 높은 전송량을 확보합니다.",
  },
  LPDDR6: {
    emoji: "🔋",
    title: "상황에 맞춰 스스로 연비를 조절하는 메모리",
    description:
      "LPDDR6는 모바일과 온디바이스 AI용 메모리답게 성능보다 효율 최적화가 핵심입니다. DVFS가 그 중심 기술입니다.",
  },
  NAND: {
    emoji: "🗄️",
    title: "층층이 쌓아 올린 초대형 저장 창고",
    description:
      "NAND는 DRAM보다 느리지만 훨씬 많은 데이터를 오래 저장합니다. 3D NAND는 그 저장 창고를 위로 계속 증축하는 방식입니다.",
  },
};

export function getAnalogy(key: string): AnalogyData {
  return ANALOGIES[key] || { emoji: "🧩", title: key, description: "" };
}

export interface DeepDiveItem {
  title: string;
  content: string;
}

const DEEP_DIVES: Record<string, (company: "samsung" | "hynix", lineup: any) => DeepDiveItem[]> = {
  HBM4: (company, lineup) => [
    {
      title: "왜 HBM은 TSV가 핵심인가",
      content:
        "HBM은 각 DRAM die를 TSV로 수직 연결해 I/O를 폭넓게 확보합니다.\n\n- 같은 footprint에서 대역폭을 크게 키울 수 있습니다.\n- GPU와의 거리를 줄여 지연과 전력 손실을 줄입니다.\n- 적층 수가 늘어날수록 열과 수율 관리가 더 중요해집니다.",
    },
    {
      title: company === "samsung" ? "삼성의 포인트: DTCO + 파운드리 연계" : "하이닉스의 포인트: MR-MUF + 패키징 완성도",
      content:
        company === "samsung"
          ? "삼성은 HBM을 메모리 단품이 아니라 파운드리와 패키징까지 이어지는 통합 전략으로 봅니다.\n\n- base die를 자체 파운드리와 연계해 최적화하려는 흐름\n- X-Cube, H-Cube 같은 패키징 역량과 함께 읽어야 함\n- 메모리와 시스템반도체를 같이 가진 구조가 강점이자 변수"
          : "하이닉스는 HBM 리더십을 패키징 안정성과 수율로 지켜왔습니다.\n\n- MR-MUF는 적층과 언더필 품질을 안정화하는 데 중요\n- TSV, mold, 열경로가 함께 맞아야 실제 양산 경쟁력이 생김\n- 단순 속도보다 일관된 출하 품질이 핵심",
    },
    {
      title: "HBM4 이후 관전 포인트",
      content:
        "HBM4E와 custom HBM으로 가면서 단순 메모리 성능이 아니라 고객 맞춤형 인터페이스와 패키징 협업이 더 중요해집니다.\n\n- 더 높은 pin speed\n- 더 많은 적층 수\n- 더 어려워지는 열 관리와 수율 확보",
    },
  ],
  DDR5: (company, lineup) => [
    {
      title: "왜 DDR5에서 HKMG가 다시 중요해졌나",
      content:
        "DDR5는 속도와 집적도가 오르면서 누설전류와 전력 손실 문제가 더 민감해집니다.\n\n- high-k는 gate leakage를 줄이고\n- metal gate는 poly depletion 문제를 줄이며\n- 결국 고속 메모리에서 전력효율을 유지하는 기반이 됩니다.",
    },
    {
      title: company === "samsung" ? "삼성의 포인트: 공정 최적화" : "하이닉스의 포인트: DVFS 중심 효율",
      content:
        company === "samsung"
          ? "삼성은 DDR5를 고속 메모리 공정 최적화의 연장선에서 봅니다.\n\n- 미세 공정과 HKMG 연결\n- 서버/PC 메모리에서 안정성 강조"
          : "하이닉스는 DDR5에서 DVFS를 전면에 내세워 효율을 강조합니다.\n\n- 부하에 따라 전압과 주파수를 조절\n- 서버와 PC 모두에서 전력 효율 개선",
    },
  ],
  GDDR7: () => [
    {
      title: "왜 GDDR7은 여전히 중요할까",
      content:
        "HBM이 모든 GPU를 대체하지는 않습니다.\n\n- HBM은 최고 대역폭이 필요할 때 유리하지만 비용이 큽니다.\n- GDDR7은 그래픽 카드와 일부 AI 추론 카드에 맞는 비용 대비 성능 지점을 제공합니다.\n- PAM3/PAM4 계열 신호 방식과 패키지 설계가 핵심입니다.",
    },
    {
      title: "칩당 용량 경쟁의 의미",
      content:
        "같은 보드에 붙는 칩 수가 제한된 만큼, 칩당 용량 증가는 곧 총 VRAM 증가로 이어집니다.\n\n- 보드 설계 자유도 증가\n- 대형 모델 추론/그래픽 처리에 유리\n- 메모리 공급 구조 차별화 포인트",
    },
  ],
  LPDDR6: () => [
    {
      title: "왜 LPDDR에서는 DVFS가 핵심인가",
      content:
        "모바일과 엣지 디바이스에서는 배터리와 발열이 곧 사용자 경험입니다.\n\n- 부하가 낮을 때 전압과 주파수를 낮춰 소비전력을 줄임\n- 필요할 때만 즉시 성능을 끌어올림\n- AI 추론과 모바일 작업이 섞일수록 중요해짐",
    },
    {
      title: "LPDDR6가 겨냥하는 시장",
      content:
        "스마트폰뿐 아니라 온디바이스 AI 기기, XR, 로봇, 자동차 인포테인먼트까지 확장됩니다.\n\n- 더 높은 성능\n- 더 낮은 전력\n- 더 다양한 사용 패턴 대응",
    },
  ],
  NAND: () => [
    {
      title: "왜 NAND는 3D 적층으로 갔는가",
      content:
        "2D NAND는 면적 축소만으로는 용량 증가가 어려워졌습니다.\n\n- 셀 간 간섭 문제\n- 리소그래피 한계\n- 3D 적층이 용량 확대의 현실적 해법",
    },
    {
      title: "NAND의 진짜 난제는 무엇인가",
      content:
        "층 수를 늘리는 것만으로 끝나지 않습니다.\n\n- 고종횡비 식각\n- 균일한 박막 증착\n- 프로그램/지우기 속도와 수명 균형\n- SSD 단에서의 컨트롤러와 시스템 최적화",
    },
  ],
};

export function getDeepDive(key: string, company: "samsung" | "hynix", lineup: any): DeepDiveItem[] {
  const fn = DEEP_DIVES[key];
  return fn ? fn(company, lineup) : [];
}

const ONE_LINERS: Record<string, Record<"samsung" | "hynix", string>> = {
  HBM4: {
    samsung: "AI 가속기 옆에 붙는 초고대역폭 메모리로, 삼성은 파운드리·패키징까지 연결된 축에서 접근합니다.",
    hynix: "AI 가속기 옆에 붙는 초고대역폭 메모리로, 하이닉스는 HBM 리더십과 패키징 완성도로 우위를 지켜왔습니다.",
  },
  DDR5: {
    samsung: "서버와 PC의 주력 DRAM 세대로, 고속화와 공정 최적화를 함께 읽어야 하는 메모리입니다.",
    hynix: "서버와 PC의 주력 DRAM 세대로, 하이닉스는 DVFS와 전력 효율 관점이 특히 중요합니다.",
  },
  GDDR7: {
    samsung: "고성능 GPU를 위한 그래픽 메모리로, HBM과는 다른 비용·용량 포지션을 가집니다.",
    hynix: "고성능 GPU를 위한 그래픽 메모리로, 하이닉스는 칩당 용량 확대를 강점으로 내세웁니다.",
  },
  LPDDR6: {
    samsung: "모바일과 온디바이스 AI 기기를 위한 저전력 메모리로, 효율과 안정성이 핵심입니다.",
    hynix: "모바일과 온디바이스 AI 기기를 위한 저전력 메모리로, DVFS가 실제 차별화 포인트로 작동합니다.",
  },
  NAND: {
    samsung: "대용량 저장의 핵심이며, 3D 적층과 SSD 생태계가 함께 읽혀야 하는 분야입니다.",
    hynix: "대용량 저장의 핵심이며, 고적층 경쟁과 SSD 제품 전략을 함께 보는 것이 중요합니다.",
  },
};

export function getOneLiner(key: string, company: "samsung" | "hynix"): string {
  return ONE_LINERS[key]?.[company] || "";
}
