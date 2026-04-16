"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import NewsSlider from "@/components/NewsSlider";
import TechCard from "@/components/TechCard";
import metricsData from "@/data/metrics.json";
import samsungData from "@/data/samsung-tech.json";

const BRAND_COLOR = "#1428A0";
const COMPETITOR = "하이닉스";

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
  rows.push({
    label: "용량",
    value: capVal,
    competitorValue: compCap
      ? metricsCompetitor?.capacityNote
        ? `${compCap} (${metricsCompetitor.capacityNote})`
        : compCap
      : null,
    unit: "GB",
    highlight: false,
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

export default function SamsungPage() {
  const lineups = samsungData.lineups;

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
                삼성전자 반도체
              </h1>
              <p className="text-xs text-gray-500">{samsungData.slogan}</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 text-xs text-gray-500 md:flex">
            <span>
              {samsungData.division} · {samsungData.leader}
            </span>
            <span className="text-gray-700">|</span>
            <span>시총 {samsungData.marketCap}</span>
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
              "linear-gradient(180deg, rgba(8, 12, 24, 0.55), rgba(8, 12, 24, 0.84)), url('https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-blue-200/80">Samsung Focus</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
              메모리와 파운드리를 함께 보는 삼성 축
            </h2>
            <p className="mt-4 text-sm leading-7 text-gray-200/90 md:text-base">
              하이닉스 축과 대비해서 삼성은 메모리 제품군에 더해 파운드리, GAA, 패키징 전략이 어떻게 얽혀 있는지
              보이도록 정리했습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/samsung/compare" className="glass-panel rounded-full px-4 py-2 text-sm text-blue-100">
                하이닉스와 비교 보기
              </Link>
              <Link href="/fundamentals/mosfet-evolution" className="glass-chip rounded-full px-4 py-2 text-sm text-white">
                GAA 배경 보기
              </Link>
              <Link href="/samsung/news" className="glass-chip rounded-full px-4 py-2 text-sm text-white">
                삼성 뉴스 보기
              </Link>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="glass-panel rounded-xl p-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-blue-400">파운드리 2nm GAA</span>
            </div>
            <p className="text-xs text-gray-400">
              MBCFET 기반 수율 {samsungData.foundry.yield} · {samsungData.foundry.yieldProgress}
            </p>
            <p className="mt-1 text-[10px] text-gray-600">{samsungData.foundry.competitorYield}</p>
          </div>
          <div className="glass-panel rounded-xl p-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm font-semibold text-blue-400">패키징 {samsungData.packaging.name}</span>
            </div>
            <p className="text-xs text-gray-400">{samsungData.packaging.advantage}</p>
            <p className="mt-1 text-[10px] text-gray-600">
              HCB: {samsungData.packaging.hcb.benefit}, {samsungData.packaging.hcb.stackSupport} 지원
            </p>
          </div>
        </motion.div>

        <div className="mb-6 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold"
          >
            기술 라인업
          </motion.h2>
          <Link
            href="/samsung/compare"
            className="glass-chip rounded-lg px-3 py-1.5 text-xs text-blue-300 transition-colors hover:border-blue-400/30"
          >
            양사 비교 →
          </Link>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lineupOrder.map((key, index) => {
            const lineup = lineups[key] as any;
            if (!lineup) return null;

            const metrics = (metricsData as any)[key];
            const metricsCompany = metrics?.samsung;
            const metricsCompetitor = metrics?.hynix;
            const jedecData = metrics?.jedec;

            return (
              <TechCard
                key={key}
                name={lineup.name}
                fullName={lineup.fullName}
                slug={key.toLowerCase()}
                company="samsung"
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
          <NewsSlider company="samsung" title="삼성 최신 뉴스" />
        </motion.div>
      </div>
    </main>
  );
}
