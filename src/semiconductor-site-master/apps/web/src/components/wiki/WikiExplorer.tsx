"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { WikiNode, WikiPage } from "@/lib/wiki";

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

type GraphEdge = {
  source: string;
  target: string;
};

const TYPE_LABELS: Record<string, string> = {
  concept: "개념",
  entity: "엔티티",
  source: "소스",
  topic: "토픽",
  comparison: "비교",
};

const GRAPH_WIDTH = 2200;
const GRAPH_HEIGHT = 1500;
const GRAPH_PADDING = 90;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2.8;
const DEFAULT_NODE_FILL = "rgba(211, 218, 228, 0.78)";
const DEFAULT_NODE_STROKE = "rgba(255, 255, 255, 0.14)";
const DIMMED_NODE_FILL = "rgba(92, 103, 120, 0.22)";
const DIMMED_NODE_STROKE = "rgba(255, 255, 255, 0.04)";
const NEIGHBOR_NODE_FILL = "rgba(235, 240, 246, 0.92)";
const FOCUSED_NODE_FILL = "rgba(255, 255, 255, 0.98)";
const DEFAULT_EDGE_STROKE = "rgba(148, 163, 184, 0.14)";
const DIMMED_EDGE_STROKE = "rgba(148, 163, 184, 0.05)";
const FOCUSED_EDGE_STROKE = "rgba(241, 245, 249, 0.5)";

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function hashString(value: string) {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function buildGraph(filteredPages: WikiPage[], filteredNodes: WikiNode[]) {
  const filteredNodeMap = new Map(filteredNodes.map((node) => [node.slug, node]));
  const adjacency = new Map<string, Set<string>>();

  filteredNodes.forEach((node) => {
    adjacency.set(node.slug, new Set());
  });

  const edgeKeySet = new Set<string>();
  const edges: GraphEdge[] = [];

  filteredPages.forEach((page) => {
    page.resolvedLinks.forEach((target) => {
      if (!filteredNodeMap.has(page.slug) || !filteredNodeMap.has(target) || page.slug === target) return;

      const key = [page.slug, target].sort().join("::");
      if (edgeKeySet.has(key)) return;
      edgeKeySet.add(key);
      edges.push({ source: page.slug, target });
      adjacency.get(page.slug)?.add(target);
      adjacency.get(target)?.add(page.slug);
    });
  });

  const positions: Record<string, { x: number; y: number }> = {};
  const velocities: Record<string, { x: number; y: number }> = {};
  const centerX = GRAPH_WIDTH / 2;
  const centerY = GRAPH_HEIGHT / 2;
  const spread = Math.min(GRAPH_WIDTH, GRAPH_HEIGHT) * 0.34;

  filteredNodes.forEach((node, index) => {
    const hash = hashString(node.slug);
    const angle = ((hash % 360) * Math.PI) / 180;
    const radiusFactor = 0.22 + ((hash >> 9) % 1000) / 1000 * 0.78;
    const radius = spread * radiusFactor + (index % 7) * 10;

    positions[node.slug] = {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
    velocities[node.slug] = { x: 0, y: 0 };
  });

  const nodeIds = filteredNodes.map((node) => node.slug);
  const desiredLength = 122;
  const repulsionStrength = 26000;
  const springStrength = 0.0038;
  const centerStrength = 0.0024;
  const damping = 0.84;

  for (let iteration = 0; iteration < 220; iteration += 1) {
    const forces: Record<string, { x: number; y: number }> = {};
    nodeIds.forEach((id) => {
      forces[id] = { x: 0, y: 0 };
    });

    for (let index = 0; index < nodeIds.length; index += 1) {
      for (let nextIndex = index + 1; nextIndex < nodeIds.length; nextIndex += 1) {
        const sourceId = nodeIds[index];
        const targetId = nodeIds[nextIndex];
        const source = positions[sourceId];
        const target = positions[targetId];
        const dx = source.x - target.x;
        const dy = source.y - target.y;
        const distanceSq = Math.max(dx * dx + dy * dy, 0.01);
        const distance = Math.sqrt(distanceSq);
        const force = repulsionStrength / distanceSq;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        forces[sourceId].x += fx;
        forces[sourceId].y += fy;
        forces[targetId].x -= fx;
        forces[targetId].y -= fy;
      }
    }

    edges.forEach((edge) => {
      const source = positions[edge.source];
      const target = positions[edge.target];
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
      const stretch = distance - desiredLength;
      const force = stretch * springStrength;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;

      forces[edge.source].x += fx;
      forces[edge.source].y += fy;
      forces[edge.target].x -= fx;
      forces[edge.target].y -= fy;
    });

    nodeIds.forEach((id) => {
      const position = positions[id];
      const degree = adjacency.get(id)?.size ?? 0;
      const nodeCenterStrength = degree >= 14 ? centerStrength * 0.55 : centerStrength;

      forces[id].x += (centerX - position.x) * nodeCenterStrength;
      forces[id].y += (centerY - position.y) * nodeCenterStrength;

      velocities[id].x = (velocities[id].x + forces[id].x) * damping;
      velocities[id].y = (velocities[id].y + forces[id].y) * damping;

      position.x = clamp(position.x + velocities[id].x, GRAPH_PADDING, GRAPH_WIDTH - GRAPH_PADDING);
      position.y = clamp(position.y + velocities[id].y, GRAPH_PADDING, GRAPH_HEIGHT - GRAPH_PADDING);
    });
  }

  return { positions, adjacency, edges };
}

export default function WikiExplorer({ pages, nodes, stats, recent }: WikiExplorerProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
  });

  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const [selectedSlug, setSelectedSlug] = useState<string>(pages[0]?.slug ?? "");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.62);
  const [pan, setPan] = useState({ x: 100, y: 80 });

  const filteredPages = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return pages.filter((page) => {
      if (activeType !== "all" && page.type !== activeType) return false;
      if (!lowered) return true;

      return [page.title, page.slug, page.excerpt, page.tags.join(" ")]
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

  const filteredSlugs = useMemo(() => new Set(filteredPages.map((page) => page.slug)), [filteredPages]);
  const filteredNodes = useMemo(() => nodes.filter((node) => filteredSlugs.has(node.slug)), [filteredSlugs, nodes]);
  const selectedPage = pages.find((page) => page.slug === selectedSlug) ?? filteredPages[0] ?? null;
  const hoveredPage = hoveredSlug ? pages.find((page) => page.slug === hoveredSlug) ?? null : null;
  const focusedPage = hoveredPage ?? selectedPage;

  const graph = useMemo(() => buildGraph(filteredPages, filteredNodes), [filteredNodes, filteredPages]);

  const hoveredNeighborhood = useMemo(() => {
    if (!hoveredSlug) return null;
    const neighbors = graph.adjacency.get(hoveredSlug) ?? new Set<string>();
    return new Set([hoveredSlug, ...Array.from(neighbors)]);
  }, [graph.adjacency, hoveredSlug]);

  const fitGraph = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const fittedZoom = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, Math.min(rect.width / GRAPH_WIDTH, rect.height / GRAPH_HEIGHT) * 0.94)
    );

    setZoom(fittedZoom);
    setPan({
      x: (rect.width - GRAPH_WIDTH * fittedZoom) / 2,
      y: (rect.height - GRAPH_HEIGHT * fittedZoom) / 2,
    });
  }, []);

  const centerOnSlug = useCallback(
    (slug: string) => {
      const container = containerRef.current;
      const position = graph.positions[slug];
      if (!container || !position) return;

      const rect = container.getBoundingClientRect();
      setPan({
        x: rect.width / 2 - position.x * zoom,
        y: rect.height / 2 - position.y * zoom,
      });
    },
    [graph.positions, zoom]
  );

  useEffect(() => {
    fitGraph();
  }, [fitGraph, filteredNodes.length]);

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const pointX = event.clientX - rect.left;
      const pointY = event.clientY - rect.top;
      const factor = event.deltaY < 0 ? 1.12 : 0.9;
      const nextZoom = clamp(zoom * factor, MIN_ZOOM, MAX_ZOOM);

      if (nextZoom === zoom) return;

      const worldX = (pointX - pan.x) / zoom;
      const worldY = (pointY - pan.y) / zoom;

      setZoom(nextZoom);
      setPan({
        x: pointX - worldX * nextZoom,
        y: pointY - worldY * nextZoom,
      });
    },
    [pan.x, pan.y, zoom]
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const target = event.target as Element;
      if (target.closest("[data-node='true']")) return;

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startPanX: pan.x,
        startPanY: pan.y,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pan.x, pan.y]
  );

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) return;

    setPan({
      x: dragRef.current.startPanX + (event.clientX - dragRef.current.startX),
      y: dragRef.current.startPanY + (event.clientY - dragRef.current.startY),
    });
  }, []);

  const handlePointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current.active = false;
    dragRef.current.pointerId = -1;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const adjustZoom = useCallback(
    (factor: number) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const nextZoom = clamp(zoom * factor, MIN_ZOOM, MAX_ZOOM);
      const worldX = (centerX - pan.x) / zoom;
      const worldY = (centerY - pan.y) / zoom;

      setZoom(nextZoom);
      setPan({
        x: centerX - worldX * nextZoom,
        y: centerY - worldY * nextZoom,
      });
    },
    [pan.x, pan.y, zoom]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="glass-panel rounded-2xl p-5">
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
              <span>{TYPE_LABELS[type] || type}</span>
              <span className="text-xs text-gray-500">{count}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white">현재 포커스</h3>
          {focusedPage ? (
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500">{focusedPage.type}</div>
              <h4 className="mt-2 text-lg font-semibold text-white">{focusedPage.title}</h4>
              <p className="mt-3 text-sm leading-6 text-gray-400">{focusedPage.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {focusedPage.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSlug(focusedPage.slug);
                    centerOnSlug(focusedPage.slug);
                  }}
                  className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20"
                >
                  그래프에서 보기
                </button>
                <Link
                  href={`/wiki/${focusedPage.slug}`}
                  className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-200 hover:bg-cyan-400/20"
                >
                  노트 열기
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-3 text-sm text-gray-500">검색 결과가 없습니다.</div>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-white">최근 업데이트</h3>
          <div className="mt-3 space-y-2">
            {recent.slice(0, 6).map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setSelectedSlug(item.slug);
                  centerOnSlug(item.slug);
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:border-cyan-400/30"
              >
                <div className="text-sm text-gray-200">{item.title}</div>
                <div className="mt-1 text-xs text-gray-500">{item.updated}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="glass-panel rounded-2xl p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Knowledge Graph</h2>
            <p className="text-sm text-gray-400">
              옵시디언 그래프처럼 단색 노드 위에 관계만 드러나도록 정리했습니다. 노드에 커서를 올리면 바로
              연결된 주변 노드와 링크가 함께 반응합니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => adjustZoom(1.15)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20"
            >
              확대
            </button>
            <button
              type="button"
              onClick={() => adjustZoom(0.87)}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20"
            >
              축소
            </button>
            <button
              type="button"
              onClick={fitGraph}
              className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:border-white/20"
            >
              전체 맞춤
            </button>
            {selectedPage && (
              <button
                type="button"
                onClick={() => centerOnSlug(selectedPage.slug)}
                className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-400/20"
              >
                선택 노드 중앙
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="rounded-full border border-white/10 px-3 py-1">monochrome node palette</span>
          <span className="rounded-full border border-white/10 px-3 py-1">hover to reveal neighborhood</span>
          <span className="rounded-full border border-white/10 px-3 py-1">zoom {zoom.toFixed(2)}x</span>
        </div>

        <div
          ref={containerRef}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setHoveredSlug(null)}
          className="relative h-[72vh] min-h-[580px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b1117] touch-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.08),transparent_30%)]" />

          <div
            className="absolute left-0 top-0"
            style={{
              width: GRAPH_WIDTH,
              height: GRAPH_HEIGHT,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
            }}
          >
            <svg viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`} className="h-full w-full">
              {graph.edges.map((edge) => {
                const sourcePosition = graph.positions[edge.source];
                const targetPosition = graph.positions[edge.target];
                const isFocusedEdge = hoveredSlug && (edge.source === hoveredSlug || edge.target === hoveredSlug);
                const shouldDim = hoveredNeighborhood && !isFocusedEdge;

                return (
                  <line
                    key={`${edge.source}-${edge.target}`}
                    x1={sourcePosition.x}
                    y1={sourcePosition.y}
                    x2={targetPosition.x}
                    y2={targetPosition.y}
                    stroke={isFocusedEdge ? FOCUSED_EDGE_STROKE : shouldDim ? DIMMED_EDGE_STROKE : DEFAULT_EDGE_STROKE}
                    strokeWidth={isFocusedEdge ? 1.8 : 1}
                  />
                );
              })}

              {filteredNodes.map((node) => {
                const position = graph.positions[node.slug];
                const isHovered = node.slug === hoveredSlug;
                const isSelected = node.slug === selectedPage?.slug;
                const isNeighbor = hoveredNeighborhood?.has(node.slug) ?? false;
                const isDimmed = Boolean(hoveredNeighborhood) && !isNeighbor;
                const radius = isHovered ? node.size + 4 : isNeighbor ? node.size + 2 : node.size;
                const showLabel = isHovered || isNeighbor || isSelected || zoom > 1.16 || node.degree >= 18;

                const fill = isHovered
                  ? FOCUSED_NODE_FILL
                  : isNeighbor
                    ? NEIGHBOR_NODE_FILL
                    : isDimmed
                      ? DIMMED_NODE_FILL
                      : DEFAULT_NODE_FILL;

                const stroke = isHovered || isSelected
                  ? "rgba(255, 255, 255, 0.92)"
                  : isNeighbor
                    ? "rgba(255, 255, 255, 0.26)"
                    : isDimmed
                      ? DIMMED_NODE_STROKE
                      : DEFAULT_NODE_STROKE;

                return (
                  <g
                    key={node.slug}
                    transform={`translate(${position.x}, ${position.y})`}
                    data-node="true"
                    onMouseEnter={() => {
                      setHoveredSlug(node.slug);
                      setSelectedSlug(node.slug);
                    }}
                    onClick={() => {
                      setSelectedSlug(node.slug);
                      router.push(`/wiki/${node.slug}`);
                    }}
                    className="cursor-pointer"
                  >
                    <circle r={radius + 7} fill="rgba(255,255,255,0.025)" />
                    <circle r={radius} fill={fill} stroke={stroke} strokeWidth={isHovered ? 2.4 : isSelected ? 1.6 : 1} />
                    {showLabel && (
                      <text
                        textAnchor="middle"
                        y={radius + 16}
                        fill={isHovered || isNeighbor || isSelected ? "#f8fafc" : "#cbd5e1"}
                        fontSize="12"
                        className="pointer-events-none select-none"
                      >
                        {node.label.length > 20 ? `${node.label.slice(0, 20)}…` : node.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs text-gray-400 backdrop-blur">
            scroll: zoom / drag: move / hover: neighborhood / click: note
          </div>
        </div>
      </section>
    </div>
  );
}
