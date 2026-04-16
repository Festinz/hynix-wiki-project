"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import NewsCard from "./NewsCard";

interface NewsItem {
  title: string;
  summary: string;
  category: string;
  importance: "breaking" | "major" | "normal";
  date?: string;
  sourceUrl?: string;
  company?: string;
}

interface NewsListPageProps {
  company: "samsung" | "hynix";
  allNews: NewsItem[];
}

const CATEGORY_FILTERS = [
  { key: "all", label: "전체" },
  { key: "hbm", label: "HBM" },
  { key: "foundry", label: "파운드리" },
  { key: "memory", label: "메모리" },
  { key: "packaging", label: "패키징" },
  { key: "market", label: "시장" },
];

const PAGE_SIZE = 8;

export default function NewsListPage({ company, allNews }: NewsListPageProps) {
  const isSamsung = company === "samsung";
  const brandColor = isSamsung ? "#1428A0" : "#E4002B";
  const title = isSamsung ? "삼성전자" : "SK하이닉스";
  const basePath = isSamsung ? "/samsung" : "/hynix";
  const intro = isSamsung
    ? {
        eyebrow: "Samsung Briefing",
        heading: "메모리와 파운드리 축에서 읽는 삼성 뉴스 흐름",
        body: "메모리 제품 이슈만 따로 떼지 않고, GAA·수율·첨단 패키징과 어떻게 맞물리는지 함께 읽도록 구성했습니다.",
        chips: ["GAA", "파운드리", "패키징", "HBM"],
      }
    : {
        eyebrow: "Hynix Briefing",
        heading: "HBM과 패키징 중심으로 읽는 하이닉스 뉴스 흐름",
        body: "하이닉스 뉴스는 HBM 로드맵, TSV·MR-MUF 패키징, 메모리 공급 구조와 연결해서 읽을 때 가장 해상도가 높아집니다.",
        chips: ["HBM", "MR-MUF", "TSV", "메모리 시장"],
      };

  const companyNews = allNews.filter(
    (n) => n.company === company || n.company === "both" || n.company === "industry"
  );

  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = category === "all" ? companyNews : companyNews.filter((n) => n.category === category);

  const sorted = [...filtered].sort((a, b) => {
    const importanceOrder = { breaking: 0, major: 1, normal: 2 };
    const aDiff = importanceOrder[a.importance] ?? 2;
    const bDiff = importanceOrder[b.importance] ?? 2;
    if (aDiff !== bDiff) return aDiff - bDiff;
    return (b.date || "").localeCompare(a.date || "");
  });

  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + PAGE_SIZE);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category]);

  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-4xl rounded-2xl"
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href={basePath} className="text-gray-500 transition-colors hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold" style={{ color: brandColor }}>
              {title} 뉴스
            </h1>
            <p className="text-xs text-gray-500">Perplexity Sonar 자동 수집 · 하루 2회 갱신</p>
          </div>
        </div>
      </motion.header>

      <div className="mx-auto max-w-4xl py-6">
        <div className="glass-panel-strong mb-6 rounded-[24px] p-6">
          <p
            className="text-xs uppercase tracking-[0.28em]"
            style={{ color: `${brandColor}` }}
          >
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

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {CATEGORY_FILTERS.map((f) => {
            const count =
              f.key === "all" ? companyNews.length : companyNews.filter((n) => n.category === f.key).length;

            return (
              <button
                key={f.key}
                onClick={() => setCategory(f.key)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  category === f.key ? "text-white" : "bg-gray-900/30 text-gray-500 hover:text-gray-300"
                }`}
                style={
                  category === f.key
                    ? { backgroundColor: `${brandColor}20`, border: `1px solid ${brandColor}40`, color: brandColor }
                    : undefined
                }
              >
                {f.label}
                <span className="ml-1 text-gray-600">({count})</span>
              </button>
            );
          })}
        </div>

        <div className="mb-6 flex items-center gap-4 text-[10px] text-gray-600">
          <span>{sorted.length}건</span>
          <span>
            속보 {sorted.filter((n) => n.importance === "breaking").length} · 주요{" "}
            {sorted.filter((n) => n.importance === "major").length} · 일반{" "}
            {sorted.filter((n) => n.importance === "normal").length}
          </span>
        </div>

        {visible.length > 0 ? (
          <div className="space-y-4">
            {visible.map((item, i) => (
              <motion.div
                key={`${item.title}-${i}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
              >
                <NewsCard
                  title={item.title}
                  summary={item.summary}
                  category={item.category}
                  importance={item.importance}
                  date={item.date}
                  sourceUrl={item.sourceUrl}
                />
              </motion.div>
            ))}

            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-6">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: brandColor }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {!hasMore && sorted.length > PAGE_SIZE && (
              <p className="py-4 text-center text-[10px] text-gray-600">모든 뉴스를 불러왔습니다 ({sorted.length}건)</p>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl p-12 text-center"
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-300">뉴스 수집 대기 중</h2>
            <p className="mb-1 text-sm text-gray-500">
              Perplexity Sonar가 매일 09:00, 18:00 KST에 자동으로 뉴스를 수집합니다.
            </p>
            <p className="text-xs text-gray-600">
              수집된 뉴스는 하이닉스·삼성·산업 카테고리로 정리되어 위키와 비교 페이지에서 함께 읽을 수 있습니다.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
