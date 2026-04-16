"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import CompanyComparisonCard from "./CompanyComparisonCard";
import metricsData from "@/data/metrics.json";
import samsungData from "@/data/samsung-tech.json";
import hynixData from "@/data/hynix-tech.json";

const TABS = [
  { key: "HBM4", label: "HBM4" },
  { key: "DDR5", label: "DDR5" },
  { key: "GDDR7", label: "GDDR7" },
  { key: "LPDDR6", label: "LPDDR6" },
  { key: "NAND", label: "NAND" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const fullNames: Record<TabKey, string> = {
  HBM4: "High Bandwidth Memory 4",
  DDR5: "Double Data Rate 5",
  GDDR7: "Graphics DDR7",
  LPDDR6: "Low Power DDR6",
  NAND: "NAND Flash Memory",
};

const ALL_CATEGORIES: Record<string, { label: string; unit: string }> = {
  pinSpeed: { label: "전송속도", unit: "Gbps" },
  bandwidth: { label: "대역폭", unit: "TB/s" },
  capacity: { label: "용량", unit: "GB" },
  capacityGb: { label: "용량 (die)", unit: "Gb" },
  powerEfficiency: { label: "전력효율", unit: "% 절감" },
  latency: { label: "지연시간", unit: "ns" },
  busWidth: { label: "메모리 버스 폭", unit: "bit" },
  interposer: { label: "인터포저 연결 구조", unit: "" },
  capacityPerStack: { label: "스택당 용량", unit: "GB" },
  jedecTarget: { label: "JEDEC 목표", unit: "Gbps" },
  actualAchieved: { label: "실제 달성", unit: "Gbps" },
  processNode: { label: "공정 노드", unit: "nm" },
};

const DEFAULT_CATEGORIES = ["pinSpeed", "bandwidth", "capacity", "powerEfficiency", "actualAchieved"];

function parseNum(val: any): number | null {
  if (val == null || val === "") return null;
  const str = String(val).replace(/[^0-9.\-]/g, "");
  const n = parseFloat(str);
  return Number.isNaN(n) ? null : n;
}

function buildMetrics(tabKey: TabKey) {
  const data = (metricsData as any)[tabKey];
  if (!data) return [];

  const samsung = data.samsung || {};
  const hynix = data.hynix || {};
  const jedec = data.jedec || {};
  const categoryByProduct = (metricsData as any).categoryByProduct || {};
  const categoryKeys: string[] = categoryByProduct[tabKey] || DEFAULT_CATEGORIES;

  return categoryKeys
    .filter((key) => ALL_CATEGORIES[key])
    .map((key) => {
      const cat = ALL_CATEGORIES[key];
      return {
        label: cat.label,
        unit: cat.unit,
        samsung: parseNum(samsung[key]),
        hynix: parseNum(hynix[key]),
        jedec: parseNum(jedec[key]),
        samsungExtra:
          key === "pinSpeed" && samsung.pinSpeedMax
            ? `(max ${samsung.pinSpeedMax})`
            : key === "capacity" && samsung.capacityNote
              ? samsung.capacityNote
              : key === "capacityGb" && samsung.capacityGbNote
                ? samsung.capacityGbNote
                : undefined,
        hynixExtra:
          key === "pinSpeed" && hynix.pinSpeedMax
            ? `(max ${hynix.pinSpeedMax})`
            : key === "capacity" && hynix.capacityNote
              ? hynix.capacityNote
              : key === "capacityGb" && hynix.capacityGbNote
                ? hynix.capacityGbNote
                : undefined,
      };
    });
}

function getLineupInfo(tabKey: TabKey) {
  const s = (samsungData.lineups as any)[tabKey];
  const h = (hynixData.lineups as any)[tabKey];
  const m = (metricsData as any)[tabKey];

  return {
    samsungStatus: s?.status || "-",
    hynixStatus: h?.status || "-",
    samsungDiff: m?.samsung?.differentiator || s?.differentiator || "-",
    hynixDiff: m?.hynix?.differentiator || h?.differentiator || "-",
    samsungUpdated: m?.samsung?.lastUpdated || "",
    hynixUpdated: m?.hynix?.lastUpdated || "",
  };
}

interface CompareDashboardProps {
  company: "samsung" | "hynix";
}

export default function CompareDashboard({ company }: CompareDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("HBM4");

  const isSamsung = company === "samsung";
  const brandColor = isSamsung ? "#1428A0" : "#E4002B";
  const title = isSamsung ? "삼성전자" : "SK하이닉스";
  const basePath = isSamsung ? "/samsung" : "/hynix";
  const intro = isSamsung
    ? {
        eyebrow: "Samsung Lens",
        heading: "삼성 축에서 보는 비교 포인트",
        body: "삼성은 메모리와 파운드리를 함께 가진 구조라서, 수치 비교만 보기보다 GAA·패키징·생산 전략과 묶어서 읽는 편이 좋습니다.",
        chips: ["MBCFET", "I-Cube / H-Cube", "메모리+파운드리", "수율 관점"],
      }
    : {
        eyebrow: "Hynix Lens",
        heading: "하이닉스 축에서 보는 비교 포인트",
        body: "하이닉스는 HBM 리더십과 패키징 완성도가 핵심이므로, bandwidth·power·capacity 수치를 제품 전략과 함께 읽도록 정리했습니다.",
        chips: ["HBM 리더십", "MR-MUF", "TSV", "수익성 전환"],
      };

  const metrics = buildMetrics(activeTab);
  const info = getLineupInfo(activeTab);

  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-5xl rounded-2xl"
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href={basePath} className="text-gray-500 transition-colors hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold">
              <span style={{ color: brandColor }}>{title}</span>
              <span className="font-normal text-gray-400"> vs </span>
              <span className="text-gray-300">{isSamsung ? "SK하이닉스" : "삼성전자"}</span>
            </h1>
            <p className="text-xs text-gray-500">통합 지표 비교 대시보드</p>
          </div>
        </div>
      </motion.header>

      <div className="mx-auto max-w-5xl py-8">
        <div className="glass-panel-strong mb-8 rounded-[24px] p-6">
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: brandColor }}>
            {intro.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">{intro.heading}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-300">{intro.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {intro.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border px-3 py-1 text-xs text-gray-300"
                style={{ borderColor: `${brandColor}30` }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                  isActive ? "text-white" : "bg-gray-900/40 text-gray-500 hover:bg-gray-800/60 hover:text-gray-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: `${brandColor}20`, border: `1px solid ${brandColor}40` }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <CompanyComparisonCard
              lineup={activeTab}
              fullName={fullNames[activeTab]}
              metrics={metrics}
              samsungStatus={info.samsungStatus}
              hynixStatus={info.hynixStatus}
              samsungDiff={info.samsungDiff}
              hynixDiff={info.hynixDiff}
              samsungUpdated={info.samsungUpdated}
              hynixUpdated={info.hynixUpdated}
              highlightCompany={company}
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div
            className="glass-panel rounded-xl p-5"
            style={{
              borderColor: `${isSamsung ? brandColor : "#1428A0"}20`,
              backgroundColor: `${isSamsung ? brandColor : "#1428A0"}08`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#1428A0" }} />
              <span className="text-sm font-semibold" style={{ color: "#1428A0" }}>
                삼성전자
              </span>
            </div>
            <p className="mb-2 text-xs text-gray-400">{samsungData.slogan}</p>
            <div className="space-y-1 text-[11px] text-gray-500">
              <p>파운드리: {samsungData.foundry.name} (수율 {samsungData.foundry.yield})</p>
              <p>패키징: {samsungData.packaging.name}</p>
              <p>
                {samsungData.division} · {samsungData.leader}
              </p>
            </div>
          </div>

          <div
            className="glass-panel rounded-xl p-5"
            style={{
              borderColor: `${!isSamsung ? brandColor : "#E4002B"}20`,
              backgroundColor: `${!isSamsung ? brandColor : "#E4002B"}08`,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#E4002B" }} />
              <span className="text-sm font-semibold" style={{ color: "#E4002B" }}>
                SK하이닉스
              </span>
            </div>
            <p className="mb-2 text-xs text-gray-400">{hynixData.slogan}</p>
            <div className="space-y-1 text-[11px] text-gray-500">
              <p>HBM 점유율: ~70% (UBS)</p>
              <p>2024 영업이익: {hynixData.operatingProfit2024}</p>
              <p>미래 기술: {hynixData.futureTech.map((t) => t.name).join(", ")}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-[10px] text-gray-600">
          데이터 기준: {(metricsData as any).updatedAt} · Perplexity 수집과 수동 검수 기반 갱신
        </div>
      </div>
    </main>
  );
}
