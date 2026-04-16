"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Mode = "wet" | "dry" | "rie";

const modeMeta: Record<
  Mode,
  {
    label: string;
    color: string;
    title: string;
    summary: string;
    pros: string;
    cons: string;
    usage: string;
  }
> = {
  wet: {
    label: "Wet",
    color: "#22d3ee",
    title: "Wet Etch",
    summary:
      "액상 화학 반응이 주도라 선택비와 처리량은 좋지만, 옆으로도 같이 깎이기 쉬워 undercut이 생깁니다.",
    pros: "선택비가 좋고 대량 처리에 유리합니다.",
    cons: "등방성이라 미세 패턴과 high aspect ratio 구조에 불리합니다.",
    usage: "세정, sacrificial layer 제거, strip 계열",
  },
  dry: {
    label: "Dry",
    color: "#fb923c",
    title: "Dry Etch",
    summary:
      "플라즈마 기반으로 방향성을 줄 수 있어 미세 패턴에 적합합니다. 다만 플라즈마 손상과 장비 복잡성 관리가 필요합니다.",
    pros: "비등방성 제어와 profile 관리가 좋습니다.",
    cons: "장비 비용과 플라즈마 데미지 부담이 있습니다.",
    usage: "게이트, 콘택, 미세 라인 식각",
  },
  rie: {
    label: "RIE",
    color: "#f43f5e",
    title: "Reactive Ion Etching",
    summary:
      "고진공 플라즈마 환경에서 외부 전기장으로 이온을 수직 가속해 표면을 때리고, 그 밑에서 약해진 표면을 라디칼이 화학적으로 결합해 깎는 방식입니다.",
    pros: "방향성과 선택비를 동시에 끌어올리기 좋습니다.",
    cons: "charging damage, micro-loading, recipe window 관리가 필요합니다.",
    usage: "현대 미세공정의 대표 dry etch",
  },
};

export default function EtchCompareAnimation() {
  const [mode, setMode] = useState<Mode>("rie");
  const [aspectRatio, setAspectRatio] = useState(24);

  const meta = modeMeta[mode];
  const trench = useMemo(() => {
    if (mode === "wet") {
      return { width: Math.max(84, 132 - aspectRatio * 1.2), depth: 54 };
    }
    if (mode === "dry") {
      return { width: Math.max(56, 104 - aspectRatio), depth: Math.min(92, 42 + aspectRatio * 1.1) };
    }
    return { width: Math.max(42, 86 - aspectRatio * 0.9), depth: Math.min(116, 50 + aspectRatio * 1.7) };
  }, [aspectRatio, mode]);

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">Wet vs Dry vs RIE</h3>
          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            고종횡비 구조가 중요해질수록 왜 식각이 RIE 중심으로 이동하는지 한 화면에서 비교합니다.
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-400">
          Aspect Ratio: {aspectRatio}:1
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(modeMeta) as Mode[]).map((key) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              mode === key ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            style={{
              borderColor: mode === key ? `${modeMeta[key].color}55` : "rgba(255,255,255,0.08)",
              backgroundColor: mode === key ? `${modeMeta[key].color}18` : "rgba(255,255,255,0.02)",
            }}
          >
            {modeMeta[key].label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label className="mb-2 flex items-center justify-between text-[11px] text-gray-500">
          <span>구조 종횡비</span>
          <span>낮은 구조에서 깊고 좁은 구조까지</span>
        </label>
        <input
          type="range"
          min={6}
          max={40}
          value={aspectRatio}
          onChange={(event) => setAspectRatio(Number(event.target.value))}
          className="w-full accent-cyan-400"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-gray-800 bg-black/20 p-4">
          <svg viewBox="0 0 280 220" className="w-full">
            <rect x="24" y="92" width="232" height="96" rx="8" fill="#1e293b" stroke="#334155" />
            <rect x="24" y="68" width="78" height="24" rx="4" fill="#713f12" opacity="0.72" />
            <rect x="178" y="68" width="78" height="24" rx="4" fill="#713f12" opacity="0.72" />
            <text x="63" y="83" textAnchor="middle" fill="#fbbf24" fontSize="9">
              PR / Hard Mask
            </text>
            <text x="217" y="83" textAnchor="middle" fill="#fbbf24" fontSize="9">
              PR / Hard Mask
            </text>

            {mode === "wet" && (
              <>
                <motion.ellipse
                  cx="140"
                  cy="108"
                  rx={trench.width / 2}
                  ry={trench.depth / 1.8}
                  fill={meta.color}
                  opacity={0.28}
                  animate={{ rx: trench.width / 2 + 4, ry: trench.depth / 1.7 }}
                  transition={{ repeat: Infinity, duration: 1.4, repeatType: "reverse" }}
                />
                <motion.ellipse cx="140" cy="108" rx={trench.width / 2 - 10} ry={trench.depth / 2.05} fill="#082f49" opacity={0.9} />
                <line x1="104" y1="116" x2="80" y2="116" stroke={meta.color} strokeWidth="2" />
                <line x1="176" y1="116" x2="200" y2="116" stroke={meta.color} strokeWidth="2" />
                <text x="140" y="145" textAnchor="middle" fill={meta.color} fontSize="10">
                  옆으로도 같이 깎여 undercut 발생
                </text>
              </>
            )}

            {mode === "dry" && (
              <>
                <motion.rect x={140 - trench.width / 2} y={92} width={trench.width} height={trench.depth} rx="2" fill={meta.color} opacity={0.24} />
                <motion.rect
                  x={140 - trench.width / 2 + 6}
                  y={92}
                  width={Math.max(20, trench.width - 12)}
                  height={Math.max(24, trench.depth - 8)}
                  rx="2"
                  fill="#431407"
                />
                <line x1="140" y1="54" x2="140" y2="88" stroke={meta.color} strokeWidth="2" />
                <line x1="126" y1="54" x2="126" y2="88" stroke={meta.color} strokeWidth="1.2" opacity="0.55" />
                <line x1="154" y1="54" x2="154" y2="88" stroke={meta.color} strokeWidth="1.2" opacity="0.55" />
                <text x="140" y="150" textAnchor="middle" fill={meta.color} fontSize="10">
                  수직 profile 확보
                </text>
              </>
            )}

            {mode === "rie" && (
              <>
                <motion.rect x={140 - trench.width / 2} y={92} width={trench.width} height={trench.depth} rx="2" fill={meta.color} opacity={0.22} />
                <motion.rect
                  x={140 - trench.width / 2 + 4}
                  y={92}
                  width={Math.max(18, trench.width - 8)}
                  height={Math.max(28, trench.depth - 6)}
                  rx="2"
                  fill="#3f0a1d"
                />
                {[112, 128, 140, 152, 168].map((x, index) => (
                  <motion.line
                    key={x}
                    x1={x}
                    y1={44}
                    x2={x}
                    y2={84}
                    stroke={meta.color}
                    strokeWidth={index === 2 ? "2.5" : "1.4"}
                    animate={{ y1: [40, 44, 40], y2: [80, 84, 80] }}
                    transition={{ repeat: Infinity, duration: 1.1, delay: index * 0.08 }}
                  />
                ))}
                {[92, 104, 176, 188].map((x, index) => (
                  <motion.circle
                    key={x}
                    cx={x}
                    cy={74 + index * 8}
                    r="3"
                    fill="#fda4af"
                    animate={{ cx: [x, x + (index % 2 === 0 ? 8 : -8), x] }}
                    transition={{ repeat: Infinity, duration: 1.8, delay: index * 0.2 }}
                  />
                ))}
                <text x="140" y="152" textAnchor="middle" fill={meta.color} fontSize="10">
                  이온은 직진, 라디칼은 반응 보조
                </text>
              </>
            )}

            <text x="140" y="204" textAnchor="middle" fill="#64748b" fontSize="10">
              구조가 깊고 좁아질수록 방향성 제어가 더 중요해집니다.
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: `${meta.color}35`, backgroundColor: `${meta.color}10` }}
          >
            <p className="text-xs font-semibold" style={{ color: meta.color }}>
              {meta.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-200">{meta.summary}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 text-[11px]">
            <div className="rounded-xl border border-green-500/15 bg-green-950/10 p-3">
              <p className="font-semibold text-green-400">장점</p>
              <p className="mt-1 text-gray-300">{meta.pros}</p>
            </div>
            <div className="rounded-xl border border-red-500/15 bg-red-950/10 p-3">
              <p className="font-semibold text-red-400">한계</p>
              <p className="mt-1 text-gray-300">{meta.cons}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gray-950/40 p-3">
              <p className="font-semibold text-gray-200">주로 쓰는 자리</p>
              <p className="mt-1 text-gray-400">{meta.usage}</p>
            </div>
          </div>

          {mode === "rie" && (
            <div className="rounded-xl border border-rose-500/15 bg-rose-950/10 p-4 text-[11px] leading-6 text-gray-300">
              <p className="font-semibold text-rose-400">왜 지금 RIE가 대세인가</p>
              <ul className="mt-2 space-y-1">
                <li>- RF 전기장이 양이온을 아래로 끌어당겨 직진성을 만듭니다.</li>
                <li>- 이온 충돌이 표면 결합을 약화시키고, 라디칼이 화학적으로 반응해 제거를 완성합니다.</li>
                <li>- high aspect ratio 구조일수록 바닥까지 도달하는 방향성이 없으면 원하는 모양이 나오지 않습니다.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
