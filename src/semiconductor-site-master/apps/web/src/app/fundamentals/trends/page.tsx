"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import TrendSlider from "@/components/TrendSlider";
import staticTrends from "@/data/trends.json";

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "bg-green-500/15 text-green-400 border-green-500/20",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/15 text-red-400 border-red-500/20",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: "입문",
  intermediate: "중급",
  advanced: "고급",
};

const TOPIC_LINKS: Record<string, { href: string; label: string }> = {
  "mosfet-evolution": { href: "/fundamentals/mosfet-evolution", label: "MOSFET 진화사" },
  mosfet: { href: "/fundamentals/mosfet-evolution", label: "MOSFET 진화사" },
  "high-k-metal-gate": { href: "/fundamentals/high-k-metal-gate", label: "High-K Metal Gate" },
  "high-k": { href: "/fundamentals/high-k-metal-gate", label: "High-K Metal Gate" },
  photo: { href: "/fundamentals/process/photo", label: "포토리소그래피" },
  etch: { href: "/fundamentals/process/etch", label: "식각" },
  diffusion: { href: "/fundamentals/process/diffusion", label: "확산·이온주입" },
  "thin-film": { href: "/fundamentals/process/thin-film", label: "박막 증착" },
  cmp: { href: "/fundamentals/process/cmp", label: "CMP" },
  hbm: { href: "/hynix/hbm", label: "HBM" },
  ddr5: { href: "/samsung/tech/ddr5", label: "DDR5" },
  gddr7: { href: "/hynix/tech/gddr7", label: "GDDR7" },
  packaging: { href: "/hynix/hbm", label: "패키징" },
  euv: { href: "/fundamentals/process/photo", label: "EUV 리소그래피" },
  gaa: { href: "/fundamentals/mosfet-evolution", label: "GAA/MBCFET" },
};

export default function TrendsPage() {
  const [trends, setTrends] = useState<any[]>(staticTrends as any[]);

  useEffect(() => {
    fetch("/api/data/trends")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTrends(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-4xl rounded-2xl"
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href="/fundamentals" className="text-gray-500 transition-colors hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-emerald-500">최신 트렌드 브리핑</h1>
            <p className="text-xs text-gray-500">Perplexity Sonar Pro 기반 브리핑 · 주간 수집 메모</p>
          </div>
        </div>
      </motion.header>

      <div className="mx-auto max-w-4xl py-8">
        <div className="mb-10">
          <TrendSlider title="주요 트렌드 브리핑" />
        </div>

        {trends.length > 0 ? (
          <div className="space-y-6">
            {trends.map((trend: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="glass-panel rounded-2xl p-6"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {trend.type === "paper" && (
                      <span className="rounded-full border border-purple-500/20 bg-purple-500/15 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                        논문
                      </span>
                    )}
                    {trend.type === "trend" && (
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                        트렌드
                      </span>
                    )}
                    <h3 className="text-sm font-bold text-gray-200">{trend.title || "트렌드"}</h3>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    {trend.difficulty && (
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                          DIFFICULTY_STYLES[trend.difficulty] || ""
                        }`}
                      >
                        {DIFFICULTY_LABELS[trend.difficulty] || trend.difficulty}
                      </span>
                    )}
                    {trend.fetchedAt && (
                      <span className="text-[10px] text-gray-600">
                        {new Date(trend.fetchedAt).toLocaleDateString("ko-KR")}
                      </span>
                    )}
                  </div>
                </div>

                {trend.papers && trend.papers.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {trend.papers.map((paper: any, j: number) => (
                      <div key={j} className="rounded-lg border border-purple-500/10 bg-purple-950/10 p-3">
                        <a
                          href={paper.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-purple-300 transition-colors hover:text-purple-200"
                        >
                          {paper.title}
                        </a>
                        <p className="mt-0.5 text-[10px] text-gray-500">
                          {paper.authors} {paper.venue && `· ${paper.venue}`}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {trend.summary && <p className="mb-4 text-xs leading-relaxed text-gray-400">{trend.summary}</p>}

                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                  {trend.whyImportant && (
                    <div className="rounded-lg border border-blue-500/10 bg-blue-950/10 p-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-blue-400">왜 중요한가</p>
                      <p className="text-xs leading-relaxed text-gray-400">{trend.whyImportant}</p>
                    </div>
                  )}
                  {trend.howToStudy && (
                    <div className="rounded-lg border border-green-500/10 bg-green-950/10 p-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-green-400">어떻게 볼까</p>
                      <p className="text-xs leading-relaxed text-gray-400">{trend.howToStudy}</p>
                    </div>
                  )}
                  {trend.interviewTip && (
                    <div className="rounded-lg border border-amber-500/10 bg-amber-950/10 p-3">
                      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-amber-400">설명 포인트</p>
                      <p className="text-xs leading-relaxed text-gray-400">{trend.interviewTip}</p>
                    </div>
                  )}
                </div>

                {trend.relatedTopics && trend.relatedTopics.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {trend.relatedTopics.map((topic: string) => {
                      const link = TOPIC_LINKS[topic.toLowerCase()];
                      if (link) {
                        return (
                          <Link
                            key={topic}
                            href={link.href}
                            className="rounded border border-emerald-500/15 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-400 transition-colors hover:bg-emerald-500/20"
                          >
                            {link.label} ↗
                          </Link>
                        );
                      }

                      return (
                        <span key={topic} className="rounded bg-gray-800 px-2 py-0.5 text-[10px] text-gray-500">
                          {topic}
                        </span>
                      );
                    })}
                  </div>
                )}

                {trend.sources && trend.sources.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {trend.sources.map((src: string, j: number) => (
                      <a
                        key={j}
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gray-600 underline underline-offset-2 transition-colors hover:text-gray-400"
                      >
                        출처 {j + 1}
                      </a>
                    ))}
                  </div>
                )}

                {trend.topic && <p className="mt-2 text-[10px] text-gray-700">검색 토픽: {trend.topic}</p>}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-10 text-center">
            <h2 className="text-lg font-semibold text-gray-300">브리핑 수집 대기 중</h2>
            <p className="mt-2 text-sm text-gray-500">Perplexity Sonar 파이프라인에서 새 트렌드를 수집하면 이곳에 채워집니다.</p>
          </div>
        )}
      </div>
    </main>
  );
}
