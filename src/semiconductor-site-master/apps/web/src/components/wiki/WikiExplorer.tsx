"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { WikiNode, WikiPage } from "@/lib/wiki";
import WikiMarkdown from "@/components/wiki/WikiMarkdown";

interface WikiExplorerProps {
  pages: WikiPage[];
  nodes: WikiNode[];
  stats: {
    pageCount: number;
    edgeCount: number;
    typeCounts: Record<string, number>;
  };
  recent: { slug: string; title: string; updated: string; type: string }[];
}

const TYPE_COLORS: Record<string, string> = {
  concept: "#22c55e",
  entity: "#38bdf8",
  source: "#f59e0b",
  topic: "#a78bfa",
  comparison: "#f97316",
};

export default function WikiExplorer({ pages, nodes, stats, recent }: WikiExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(pages[0]?.slug ?? "");

  const filteredPages = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    return pages.filter((page) => {
      if (activeType !== "all" && page.type !== activeType) return false;
      if (!lowered) return true;
      return [
        page.title,
        page.slug,
        page.excerpt,
        page.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(lowered);
    });
  }, [activeType, pages, query]);

  useEffect(() => {
    if (!filteredPages.some((page) => page.slug === selectedSlug)) {
      setSelectedSlug(filteredPages[0]?.slug ?? "");
    }
  }, [filteredPages, selectedSlug]);

  const filteredSlugs = new Set(filteredPages.map((page) => page.slug));
  const filteredNodes = nodes.filter((node) => filteredSlugs.has(node.slug));
  const selectedPage = filteredPages.find((page) => page.slug === selectedSlug) ?? filteredPages[0];

  const layout = useMemo(() => {
    const width = 920;
    const height = 620;
    const categories = Array.from(new Set(filteredNodes.map((node) => node.type)));
    const centers = categories.map((type, index) => {
      const angle = ((Math.PI * 2) / Math.max(categories.length, 1)) * index - Math.PI / 2;
      return {
        type,
        x: width / 2 + Math.cos(angle) * 180,
        y: height / 2 + Math.sin(angle) * 170,
      };
    });

    const positions: Record<string, { x: number; y: number }> = {};
    for (const center of centers) {
      const groupNodes = filteredNodes.filter((node) => node.type === center.type);
      groupNodes.forEach((node, index) => {
        const ring = Math.floor(index / 6);
        const localIndex = index % 6;
        const radius = 35 + ring * 28;
        const angle = (Math.PI * 2 * localIndex) / 6 + ring * 0.4;
        positions[node.slug] = {
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius,
        };
      });
    }

    return { width, height, positions };
  }, [filteredNodes]);

  const previewContent = selectedPage?.content.length > 1400
    ? `${selectedPage.content.slice(0, 1400)}\n\n...`
    : selectedPage?.content ?? "";

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
      <aside className="rounded-2xl border border-white/10 bg-gray-950/60 p-5">
        <div>
          <h2 className="text-lg font-semibold text-white">탐색</h2>
          <p className="mt-1 text-sm text-gray-400">
            {stats.pageCount}개 노드, {stats.edgeCount}개 연결
          </p>
        </div>

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="개념, 공정, 태그 검색"
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-400/50"
        />

        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={() => setActiveType("all")}
            className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
              activeType === "all"
                ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
            }`}
          >
            전체
          </button>
          {Object.entries(stats.typeCounts).map(([type, count]) => (
            <button
              key={type}
              type="button"
              onClick={() => setActiveType(type)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                activeType === type
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20"
              }`}
            >
              <span className="capitalize">{type}</span>
              <span className="text-xs text-gray-500">{count}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white">최근 업데이트</h3>
          <div className="mt-3 space-y-2">
            {recent.slice(0, 6).map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setSelectedSlug(item.slug)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:border-cyan-400/30"
              >
                <div className="text-sm text-gray-200">{item.title}</div>
                <div className="mt-1 text-xs text-gray-500">{item.updated}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="rounded-2xl border border-white/10 bg-gray-950/60 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Knowledge Graph</h2>
            <p className="text-sm text-gray-400">노드 클릭 시 오른쪽 패널에서 노트 내용을 바로 읽을 수 있습니다.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className="h-[620px] w-full">
            {filteredPages.flatMap((page) =>
              page.resolvedLinks
                .filter((target) => filteredSlugs.has(target) && layout.positions[page.slug] && layout.positions[target])
                .map((target) => (
                  <line
                    key={`${page.slug}-${target}`}
                    x1={layout.positions[page.slug].x}
                    y1={layout.positions[page.slug].y}
                    x2={layout.positions[target].x}
                    y2={layout.positions[target].y}
                    stroke="rgba(148, 163, 184, 0.18)"
                    strokeWidth="1"
                  />
                ))
            )}

            {filteredNodes.map((node) => {
              const position = layout.positions[node.slug];
              const selected = node.slug === selectedPage?.slug;
              return (
                <g key={node.slug} transform={`translate(${position.x}, ${position.y})`}>
                  <circle
                    r={selected ? node.size + 5 : node.size}
                    fill={TYPE_COLORS[node.type] || "#94a3b8"}
                    fillOpacity={selected ? 0.95 : 0.8}
                    stroke={selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)"}
                    strokeWidth={selected ? 2.5 : 1}
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedSlug(node.slug)}
                  />
                  <text
                    textAnchor="middle"
                    y={node.size + 18}
                    fill={selected ? "#ffffff" : "#cbd5e1"}
                    fontSize="12"
                    className="pointer-events-none"
                  >
                    {node.label.length > 18 ? `${node.label.slice(0, 18)}…` : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </section>

      <aside className="rounded-2xl border border-white/10 bg-gray-950/60 p-5">
        {selectedPage ? (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{selectedPage.type}</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">{selectedPage.title}</h2>
              </div>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${TYPE_COLORS[selectedPage.type] || "#94a3b8"}20`,
                  color: TYPE_COLORS[selectedPage.type] || "#94a3b8",
                }}
              >
                {selectedPage.confidence}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedPage.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-xs text-gray-500">
                backlinks {selectedPage.backlinks.length} · outgoing {selectedPage.resolvedLinks.length}
              </div>
              <WikiMarkdown content={previewContent} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {selectedPage.backlinks.slice(0, 6).map((slug) => {
                const backlink = pages.find((page) => page.slug === slug);
                if (!backlink) return null;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setSelectedSlug(slug)}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300 hover:border-cyan-400/30"
                  >
                    {backlink.title}
                  </button>
                );
              })}
            </div>

            <Link
              href={`/wiki/${selectedPage.slug}`}
              className="mt-5 inline-flex rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20"
            >
              전체 노트 열기
            </Link>
          </>
        ) : (
          <div className="text-sm text-gray-400">검색 결과가 없습니다.</div>
        )}
      </aside>
    </div>
  );
}
