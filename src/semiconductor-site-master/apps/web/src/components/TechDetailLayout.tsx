"use client";

import { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import JEDECProgressBar from "./JEDECProgressBar";
import NewsCard from "./NewsCard";

interface SpecItem {
  label: string;
  value: string | null;
  competitorValue?: string | null;
  unit: string;
}

interface AccordionItem {
  title: string;
  content: string;
}

interface NewsItem {
  title: string;
  summary: string;
  category: string;
  importance: "breaking" | "major" | "normal";
  date?: string;
  sourceUrl?: string;
}

interface TechDetailLayoutProps {
  company: "samsung" | "hynix";
  brandColor: string;
  competitorName: string;
  backHref: string;
  name: string;
  fullName: string;
  oneLiner: string;
  status: string;
  milestone?: string | null;
  analogy: {
    emoji: string;
    title: string;
    description: string;
  };
  specs: SpecItem[];
  jedec?: { achieved: number; target: number; unit: string } | null;
  deepDive: AccordionItem[];
  interactive: ReactNode;
  relatedNews: NewsItem[];
  sources?: string[];
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "양산 출하 중": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "양산 중": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "최종 샘플 단계": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "개발 중": "bg-sky-500/20 text-sky-400 border-sky-500/30",
    "차세대 개발 중": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };
  const cls = map[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";

  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>{status}</span>;
}

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="glass-panel overflow-hidden rounded-xl">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/5"
            >
              <span className="text-sm font-medium text-gray-200">{item.title}</span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="h-4 w-4 flex-shrink-0 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 whitespace-pre-line text-xs leading-relaxed text-gray-400">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function TechDetailLayout({
  company,
  brandColor,
  competitorName,
  backHref,
  name,
  fullName,
  oneLiner,
  status,
  milestone,
  analogy,
  specs,
  jedec,
  deepDive,
  interactive,
  relatedNews,
  sources,
}: TechDetailLayoutProps) {
  const companyLabel = company === "hynix" ? "SK하이닉스" : "삼성전자";

  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-5xl rounded-2xl"
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href={backHref} className="text-gray-500 transition-colors hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold" style={{ color: brandColor }}>
              {name}
            </h1>
            <p className="truncate text-xs text-gray-500">{fullName}</p>
          </div>
          <StatusBadge status={status} />
        </div>
      </motion.header>

      <div className="mx-auto max-w-5xl space-y-8 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-panel-strong rounded-[28px] p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: brandColor }}>
            {companyLabel} Detail
          </p>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-white md:text-4xl">{name}</h2>
              <p className="mt-3 text-base leading-7 text-gray-200">{oneLiner}</p>
            </div>
            {milestone && (
              <div
                className="rounded-full px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
              >
                {milestone}
              </div>
            )}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border px-3 py-1 text-xs text-gray-300" style={{ borderColor: `${brandColor}30` }}>
              경쟁 축: {competitorName}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">JEDEC 비교 포함</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">위키 연결용 상세 노트</span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
              {analogy.emoji}
            </span>
            <div>
              <h2 className="mb-1 text-base font-semibold text-gray-200">이렇게 떠올리면 쉽습니다: {analogy.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{analogy.description}</p>
            </div>
          </div>
        </motion.section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-panel rounded-2xl p-6"
          >
            <h2 className="mb-4 text-base font-semibold text-white">핵심 지표</h2>
            <div className="space-y-4">
              {specs.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-gray-500">{s.label}</span>
                    <div className="text-right">
                      {s.value ? (
                        <span className="text-sm font-semibold text-gray-100">
                          {s.value}
                          {s.unit && <span className="ml-1 text-[10px] text-gray-500">{s.unit}</span>}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">-</span>
                      )}
                    </div>
                  </div>
                  {s.competitorValue && (
                    <p className="mt-0.5 text-right text-[10px] text-gray-600">
                      {competitorName} {s.competitorValue} {s.unit}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {jedec && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <JEDECProgressBar achieved={jedec.achieved} target={jedec.target} unit={jedec.unit} color={brandColor} />
              </div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl p-6"
          >
            <h2 className="mb-4 text-base font-semibold text-white">인터랙티브 뷰</h2>
            {interactive}
          </motion.section>
        </div>

        {deepDive.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="mb-4 text-base font-semibold text-white">기술 깊이 읽기</h2>
            <Accordion items={deepDive} />
          </motion.section>
        )}

        {relatedNews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="mb-4 text-base font-semibold text-white">관련 뉴스</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {relatedNews.map((n, i) => (
                <NewsCard key={i} {...n} />
              ))}
            </div>
          </motion.section>
        )}

        {sources && sources.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="glass-panel rounded-2xl p-6 text-[11px] text-gray-600"
          >
            <h3 className="mb-2 text-xs font-medium text-gray-400">출처</h3>
            <ul className="space-y-1">
              {sources.map((src, i) => (
                <li key={i}>
                  {src.startsWith("http") ? (
                    <a href={src} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-400">
                      {src}
                    </a>
                  ) : (
                    src
                  )}
                </li>
              ))}
            </ul>
          </motion.section>
        )}
      </div>
    </main>
  );
}
