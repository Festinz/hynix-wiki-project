"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GENERATIONS = [
  { name: "HBM2E", year: 2018, layers: 8, capacity: "16GB", bandwidth: "460 GB/s", pinSpeed: "3.6 Gbps", color: "#6366f1" },
  { name: "HBM3", year: 2022, layers: 8, capacity: "24GB", bandwidth: "819 GB/s", pinSpeed: "6.4 Gbps", color: "#8b5cf6" },
  { name: "HBM3E", year: 2024, layers: 12, capacity: "36GB", bandwidth: "1.18 TB/s", pinSpeed: "9.6 Gbps", color: "#a855f7" },
  { name: "HBM4", year: 2026, layers: 12, capacity: "36GB", bandwidth: "~1.5 TB/s", pinSpeed: "11.7 Gbps", color: "#c084fc" },
  { name: "HBM4E", year: 2027, layers: 16, capacity: "48GB+", bandwidth: "4.0 TB/s", pinSpeed: "16 Gbps", color: "#e879f9" },
];

export default function HBMStackViewer() {
  const [selected, setSelected] = useState(3);
  const gen = GENERATIONS[selected];

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-300">HBM 적층 구조와 세대별 비교</h3>
      <p className="mb-5 text-[11px] text-gray-500">
        세대가 올라갈수록 적층 수, pin speed, 대역폭이 어떻게 커지는지 한 화면에서 볼 수 있습니다.
      </p>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {GENERATIONS.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setSelected(i)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selected === i ? "text-white" : "bg-gray-800/40 text-gray-500 hover:text-gray-300"
            }`}
            style={
              selected === i ? { backgroundColor: `${g.color}25`, border: `1px solid ${g.color}50`, color: g.color } : undefined
            }
          >
            {g.name} ({g.year})
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.svg
              key={gen.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              viewBox="0 0 240 320"
              className="h-[280px] w-[200px]"
            >
              <rect x="20" y="270" width="200" height="30" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="1" />
              <text x="120" y="289" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="500">
                Logic / Base Die
              </text>

              <rect x="10" y="305" width="220" height="12" rx="2" fill="#1f2937" stroke="#374151" strokeWidth="1" />
              <text x="120" y="314" textAnchor="middle" fill="#6b7280" fontSize="8">
                Silicon Interposer
              </text>

              {[50, 90, 150, 190].map((x) => (
                <rect
                  key={x}
                  x={x - 2}
                  y={270 - gen.layers * 18}
                  width="4"
                  height={gen.layers * 18}
                  fill="#f59e0b"
                  opacity="0.3"
                  rx="1"
                />
              ))}

              {Array.from({ length: gen.layers }).map((_, i) => {
                const y = 270 - (i + 1) * 18;
                return (
                  <motion.g key={i} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                    <rect x="30" y={y} width="180" height="14" rx="3" fill={`${gen.color}30`} stroke={gen.color} strokeWidth="1" strokeOpacity="0.5" />
                    {i === 0 && (
                      <text x="120" y={y + 10} textAnchor="middle" fill="#e5e7eb" fontSize="8" fontWeight="500">
                        DRAM Layer x{gen.layers}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </motion.svg>
          </AnimatePresence>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">세대</div>
            <div className="mt-1 text-sm font-semibold text-white">{gen.name}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">적층 수</div>
            <div className="mt-1 text-sm font-semibold text-white">{gen.layers}-Hi</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">용량</div>
            <div className="mt-1 text-sm font-semibold text-white">{gen.capacity}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">대역폭</div>
            <div className="mt-1 text-sm font-semibold text-white">{gen.bandwidth}</div>
          </div>
          <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] uppercase tracking-wider text-gray-500">Pin Speed</div>
            <div className="mt-1 text-sm font-semibold text-white">{gen.pinSpeed}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-gray-400">
              HBM은 TSV로 각 DRAM die를 수직 연결해, 같은 면적에서 훨씬 더 높은 대역폭을 확보하는 구조입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
