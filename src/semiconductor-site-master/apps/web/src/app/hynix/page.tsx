"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import NewsSlider from "@/components/NewsSlider";
import TechCard from "@/components/TechCard";
import hynixData from "@/data/hynix-tech.json";
import metricsData from "@/data/metrics.json";

const BRAND_COLOR = "#E4002B";
const COMPETITOR = "삼성";

function buildSpecRows(lineupKey: string, lineup: any, metricsCompany: any, metricsCompetitor: any) {
  const specs = lineup.specs;
  const rows = [];

  const pinVal = specs.pinSpeed?.value || (metricsCompany?.pinSpeed ? `${metricsCompany.pinSpeed} Gbps` : null);
  const compPin = metricsCompetitor?.pinSpeed ? `${metricsCompetitor.pinSpeed}` : null;
  rows.push({
    label: "전송속도",
    value: pinVal,
    competitorValue: compPin,
    unit: "Gbps",
    highlight: false,
  });

  const bwVal = specs.bandwidth?.value || (metricsCompany?.bandwidth ? `${metricsCompany.bandwidth} TB/s` : null);
  const compBw = metricsCompetitor?.bandwidth ? `${metricsCompetitor.bandwidth}` : null;
  rows.push({
    label: "대역폭",
    value: bwVal,
    competitorValue: compBw,
    unit: "TB/s",
    highlight: false,
  });

  const capVal = specs.capacity?.value || (metricsCompany?.capacity ? `${metricsCompany.capacity} GB` : null);
  const compCap = metricsCompetitor?.capacity ? `${metricsCompetitor.capacity}` : null;
  const isGDDR7Highlight = lineupKey === "GDDR7";
  rows.push({
    label: "용량",
    value: isGDDR7Highlight && specs.capacity?.note ? `${capVal} (${specs.capacity.note})` : capVal,
    competitorValue: compCap,
    unit: "GB",
    highlight: isGDDR7Highlight,
  });

  const peVal = specs.powerEfficiency?.value || (metricsCompany?.powerEfficiency ? `${metricsCompany.powerEfficiency}%` : null);
  const compPe = metricsCompetitor?.powerEfficiency ? `${metricsCompetitor.powerEfficiency}%` : null;
  rows.push({
    label: "전력효율",
    value: peVal,
    competitorValue: compPe,
    unit: "",
    highlight: false,
  });

  return rows;
}

function getJedec(lineupKey: string, metricsCompany: any, jedecData: any) {
  if (!metricsCompany?.actualAchieved || !jedecData?.pinSpeed) return null;
  return {
    achieved: parseFloat(metricsCompany.actualAchieved),
    target: parseFloat(jedecData.pinSpeed),
    unit: "Gbps",
  };
}

const lineupOrder = ["HBM4", "DDR5", "GDDR7", "LPDDR6", "NAND"] as const;

export default function HynixPage() {
  const lineups = hynixData.lineups;

  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-6xl rounded-2xl"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 transition-colors hover:text-gray-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-bold" style={{ color: BRAND_COLOR }}>
                SK하이닉스 반도체
              </h1>
              <p className="text-xs text-gray-500">{hynixData.slogan}</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 text-xs text-gray-500 md:flex">
            <span>2024 영업이익 {hynixData.operatingProfit2024}</span>
            <span className="text-gray-700">|</span>
            <span>2025 Q1 {hynixData.milestone2025Q1}</span>
          </div>
        </div>
      </motion.header>

      <div className="mx-auto max-w-6xl py-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel-strong relative mb-8 overflow-hidden rounded-[28px] p-6 md:p-8"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10, 12, 18, 0.55), rgba(10, 12, 18, 0.84)), url('https://images.unsplash.com/photo-1563770660941-10a63607692e?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-red-200/80">Hynix Focus</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              HBM에서 공정, 패키징, 위키 노트까지 한 줄로 읽는 하이닉스 중심 화면
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-200/90 md:text-base">
              제품 스펙 카드만 모아둔 페이지가 아니라, 하이닉스의 메모리 전략과 그 배경의 공정 지식이 자연스럽게
              이어지도록 묶었습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/wiki/sk-hynix-memory-positioning" className="glass-panel rounded-full px-4 py-2 text-sm text-red-100">
                하이닉스 관련 위키 노트
              </Link>
              <Link href="/hynix/compare" className="glass-chip rounded-full px-4 py-2 text-sm text-white">
                양사 비교 보기
              </Link>
              <Link href="/hynix/news" className="glass-chip rounded-full px-4 py-2 text-sm text-white">
                최신 뉴스 보기
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-panel mb-6 rounded-xl p-6"
        >
          <p className="text-sm italic text-red-300/80">&ldquo;{hynixData.coreStory}&rdquo;</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {hynixData.futureTech.map((tech) => (
            <div key={tech.name} className="glass-panel glass-card-hover rounded-xl p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-sm font-semibold text-red-400">{tech.name}</span>
              </div>
              <p className="text-xs text-gray-400">{tech.description}</p>
              <p className="mt-1 text-[10px] text-gray-600">{tech.benefit}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-panel mb-10 rounded-xl p-5"
        >
          <h3 className="mb-3 text-sm font-semibold" style={{ color: BRAND_COLOR }}>
            HBM 역사와 세계 최초 개발 흐름
          </h3>
          <div className="flex flex-wrap gap-2">
            {(lineups.HBM4.hbmHistory || "").split(" → ").map((gen: string, i: number, arr: string[]) => (
              <div key={gen} className="flex items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    i === arr.length - 1
                      ? "border-red-500/40 bg-red-500/10 font-semibold text-red-400"
                      : "border-gray-700 bg-gray-800/50 text-gray-400"
                  }`}
                >
                  {gen}
                </span>
                {i < arr.length - 1 && (
                  <svg className="h-3 w-3 flex-shrink-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-gray-500">
            <span>
              시장 점유율 <strong className="text-red-400">~70%</strong> (UBS)
            </span>
            <span>12단 36GB 가격 ~$500</span>
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-lg font-semibold"
          >
            기술 라인업
          </motion.h2>
          <Link
            href="/hynix/compare"
            className="glass-chip rounded-lg px-3 py-1.5 text-xs text-red-300 transition-colors hover:border-red-400/30"
          >
            양사 비교 →
          </Link>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lineupOrder.map((key, index) => {
            const lineup = lineups[key] as any;
            if (!lineup) return null;

            const metrics = (metricsData as any)[key];
            const metricsCompany = metrics?.hynix;
            const metricsCompetitor = metrics?.samsung;
            const jedecData = metrics?.jedec;

            return (
              <TechCard
                key={key}
                name={lineup.name}
                fullName={lineup.fullName}
                slug={key.toLowerCase()}
                company="hynix"
                status={lineup.status}
                milestone={lineup.milestone || null}
                differentiator={lineup.differentiator || null}
                specs={buildSpecRows(key, lineup, metricsCompany, metricsCompetitor)}
                jedec={getJedec(key, metricsCompany, jedecData)}
                brandColor={BRAND_COLOR}
                competitorName={COMPETITOR}
                index={index}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-[24px] p-5"
        >
          <NewsSlider company="hynix" title="하이닉스 최신 뉴스" />
        </motion.div>
      </div>
    </main>
  );
}
