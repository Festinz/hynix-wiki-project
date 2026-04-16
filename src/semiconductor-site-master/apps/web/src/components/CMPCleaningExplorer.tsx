"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const stages = [
  {
    id: "before",
    label: "Before",
    title: "증착과 식각을 거친 뒤",
    color: "#f59e0b",
    text: "표면 높낮이가 커지면 다음 포토 공정의 focus margin이 줄고, 결국 pattern fidelity가 무너집니다.",
  },
  {
    id: "cmp",
    label: "CMP",
    title: "화학적 기계적 평탄화",
    color: "#22c55e",
    text: "슬러리가 표면을 화학적으로 약화시키고 pad가 높은 부분을 먼저 제거하면서 planarity를 회복합니다.",
  },
  {
    id: "clean",
    label: "Cleaning",
    title: "잔류물 제거",
    color: "#38bdf8",
    text: "CMP 뒤에는 slurry particle, metal contamination, residue를 반드시 치워야 다음 공정 결함과 누설 리스크를 줄일 수 있습니다.",
  },
] as const;

export default function CMPCleaningExplorer() {
  const [stage, setStage] = useState<(typeof stages)[number]["id"]>("clean");
  const current = stages.find((item) => item.id === stage)!;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">C&amp;C = CMP + Cleaning</h3>
          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            5대 공정의 마지막은 CMP에서 끝나지 않습니다. 평탄화 뒤 cleaning까지 마쳐야 다음 스텝 품질이 살아납니다.
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-400">
          핵심: planarity + residue control
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {stages.map((item) => (
          <button
            key={item.id}
            onClick={() => setStage(item.id)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              stage === item.id ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            style={{
              borderColor: stage === item.id ? `${item.color}55` : "rgba(255,255,255,0.08)",
              backgroundColor: stage === item.id ? `${item.color}18` : "rgba(255,255,255,0.02)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-gray-800 bg-black/20 p-4">
          <svg viewBox="0 0 320 220" className="w-full">
            <rect x="26" y="154" width="268" height="28" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="160" y="171" textAnchor="middle" fill="#cbd5e1" fontSize="10">
              웨이퍼 기준면
            </text>

            {stage === "before" && (
              <>
                <rect x="52" y="110" width="56" height="44" rx="6" fill="#f59e0b" opacity="0.7" />
                <rect x="130" y="90" width="56" height="64" rx="6" fill="#f59e0b" opacity="0.7" />
                <rect x="208" y="102" width="56" height="52" rx="6" fill="#f59e0b" opacity="0.7" />
                <text x="160" y="72" textAnchor="middle" fill="#fcd34d" fontSize="10">
                  높낮이 차이 누적
                </text>
              </>
            )}

            {stage === "cmp" && (
              <>
                {[64, 98, 132, 166, 200, 234].map((x, index) => (
                  <motion.circle
                    key={x}
                    cx={x}
                    cy={68}
                    r="7"
                    fill="#86efac"
                    animate={{ cy: [64, 72, 64] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: index * 0.08 }}
                  />
                ))}
                <motion.rect x="48" y="126" width="224" height="22" rx="8" fill="#22c55e" opacity="0.6" />
                <text x="160" y="84" textAnchor="middle" fill="#86efac" fontSize="10">
                  slurry + pad로 높은 부분 우선 제거
                </text>
              </>
            )}

            {stage === "clean" && (
              <>
                <rect x="48" y="126" width="224" height="22" rx="8" fill="#38bdf8" opacity="0.48" />
                {[88, 122, 160, 198, 232].map((x, index) => (
                  <motion.circle
                    key={x}
                    cx={x}
                    cy={118}
                    r="4"
                    fill="#f8fafc"
                    animate={{ cy: [118, 104, 94], opacity: [0.9, 0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, delay: index * 0.12 }}
                  />
                ))}
                <text x="160" y="86" textAnchor="middle" fill="#7dd3fc" fontSize="10">
                  particle / residue 제거
                </text>
              </>
            )}

            <text x="160" y="205" textAnchor="middle" fill="#64748b" fontSize="10">
              평탄화만으로 끝나지 않고 cleaning까지 포함해야 다음 공정 품질이 안정됩니다.
            </text>
          </svg>
        </div>

        <div className="space-y-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: `${current.color}35`, backgroundColor: `${current.color}10` }}
          >
            <p className="text-xs font-semibold" style={{ color: current.color }}>
              {current.title}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-200">{current.text}</p>
          </div>

          <div className="rounded-xl border border-emerald-500/15 bg-emerald-950/10 p-4 text-[11px] leading-6 text-gray-300">
            <p className="font-semibold text-emerald-400">왜 C&amp;C로 봐야 하나</p>
            <p>- CMP가 높낮이를 맞춘다면, cleaning은 그 과정에서 남은 particle과 chemical residue를 지웁니다.</p>
            <p>- cleaning이 부족하면 defect, contact issue, leakage, 수율 저하로 다시 돌아옵니다.</p>
            <p>- 그래서 5대 공정의 마지막을 CMP 단독이 아니라 C&amp;C로 묶는 편이 integration 감각에 더 맞습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
