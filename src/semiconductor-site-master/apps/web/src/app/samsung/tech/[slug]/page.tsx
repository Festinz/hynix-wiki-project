"use client";

import { notFound } from "next/navigation";

import DVFSSimulator from "@/components/DVFSSimulator";
import GDDR7DiagramViewer from "@/components/GDDR7DiagramViewer";
import HBMStackViewer from "@/components/HBMStackViewer";
import HighKCompareSlider from "@/components/HighKCompareSlider";
import TechDetailLayout from "@/components/TechDetailLayout";
import {
  buildSpecs,
  getAnalogy,
  getDeepDive,
  getJedec,
  getLineup,
  getLineupKey,
  getMetrics,
  getOneLiner,
  getRelatedNews,
} from "@/lib/tech-detail-data";

const INTERACTIVE_MAP: Record<string, React.ReactNode> = {
  HBM4: <HBMStackViewer />,
  DDR5: <HighKCompareSlider />,
  GDDR7: <GDDR7DiagramViewer />,
  LPDDR6: <DVFSSimulator />,
  NAND: (
    <div className="glass-panel rounded-2xl p-6 text-center">
      <p className="text-sm text-gray-400">NAND 3D 적층 인터랙티브는 다음 단계에서 연결할 예정입니다.</p>
    </div>
  ),
};

export default function SamsungTechPage({ params }: { params: { slug: string } }) {
  const key = getLineupKey(params.slug);
  if (!key) return notFound();

  const lineup = getLineup("samsung", key);
  if (!lineup) return notFound();

  const metrics = getMetrics(key);
  const metricsCompany = metrics?.samsung;
  const metricsCompetitor = metrics?.hynix;
  const jedecData = metrics?.jedec;

  return (
    <TechDetailLayout
      company="samsung"
      brandColor="#1428A0"
      competitorName="하이닉스"
      backHref="/samsung"
      name={lineup.name}
      fullName={lineup.fullName}
      oneLiner={getOneLiner(key, "samsung")}
      status={lineup.status}
      milestone={lineup.milestone || null}
      analogy={getAnalogy(key)}
      specs={buildSpecs(lineup, metricsCompany, metricsCompetitor)}
      jedec={getJedec(metricsCompany, jedecData)}
      deepDive={getDeepDive(key, "samsung", lineup)}
      interactive={INTERACTIVE_MAP[key] || <div />}
      relatedNews={getRelatedNews(key, "samsung")}
      sources={["삼성 반도체 뉴스룸", "JEDEC 공개 사양", "위키 raw 정리 노트"]}
    />
  );
}
