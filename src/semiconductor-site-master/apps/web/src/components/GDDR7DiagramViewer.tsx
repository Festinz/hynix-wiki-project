"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function GDDR7DiagramViewer() {
  const [showHynix, setShowHynix] = useState(false);

  const samsungCap = 36;
  const hynixCap = 48;
  const chipCount = 8;

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-300">GPU 주변 GDDR7 배치 다이어그램</h3>
      <p className="mb-5 text-[11px] text-gray-500">
        GPU 양쪽에 GDDR7 칩이 4개씩 배치된다고 가정하고, 삼성과 하이닉스의 총 메모리 용량 차이를 비교합니다.
      </p>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setShowHynix(false)}
          className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
            !showHynix
              ? "border border-blue-500/30 bg-blue-500/15 text-blue-400"
              : "bg-gray-800/40 text-gray-500 hover:text-gray-300"
          }`}
        >
          삼성 ({samsungCap}GB x {chipCount})
        </button>
        <button
          onClick={() => setShowHynix(true)}
          className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
            showHynix
              ? "border border-red-500/30 bg-red-500/15 text-red-400"
              : "bg-gray-800/40 text-gray-500 hover:text-gray-300"
          }`}
        >
          하이닉스 ({hynixCap}GB x {chipCount})
        </button>
      </div>

      <svg viewBox="0 0 500 220" className="mx-auto w-full max-w-lg">
        <rect x="170" y="60" width="160" height="100" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
        <text x="250" y="105" textAnchor="middle" fill="#9ca3af" fontSize="12" fontWeight="600">
          GPU Die
        </text>
        <text x="250" y="122" textAnchor="middle" fill="#6b7280" fontSize="9">
          AI / Graphics Processor
        </text>

        {[0, 1, 2, 3].map((i) => {
          const y = 45 + i * 38;
          const chipColor = showHynix ? "#E4002B" : "#1428A0";
          const cap = showHynix ? hynixCap : samsungCap;
          return (
            <motion.g key={`left-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <rect x="20" y={y} width="120" height="30" rx="4" fill={`${chipColor}20`} stroke={chipColor} strokeWidth="1" strokeOpacity="0.4" />
              <text x="80" y={y + 18} textAnchor="middle" fill={chipColor} fontSize="9" fontWeight="500">
                GDDR7 {cap}GB
              </text>
              <line x1="140" y1={y + 15} x2="170" y2={85 + i * 10} stroke="#4b5563" strokeWidth="1" strokeDasharray="3 2" />
            </motion.g>
          );
        })}

        {[0, 1, 2, 3].map((i) => {
          const y = 45 + i * 38;
          const chipColor = showHynix ? "#E4002B" : "#1428A0";
          const cap = showHynix ? hynixCap : samsungCap;
          return (
            <motion.g key={`right-${i}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.2 }}>
              <rect x="360" y={y} width="120" height="30" rx="4" fill={`${chipColor}20`} stroke={chipColor} strokeWidth="1" strokeOpacity="0.4" />
              <text x="420" y={y + 18} textAnchor="middle" fill={chipColor} fontSize="9" fontWeight="500">
                GDDR7 {cap}GB
              </text>
              <line x1="360" y1={y + 15} x2="330" y2={85 + i * 10} stroke="#4b5563" strokeWidth="1" strokeDasharray="3 2" />
            </motion.g>
          );
        })}

        <text x="250" y="200" textAnchor="middle" fill={showHynix ? "#E4002B" : "#1428A0"} fontSize="11" fontWeight="600">
          총 {(showHynix ? hynixCap : samsungCap) * chipCount}GB
          {showHynix && " (칩당 48GB)"}
        </text>
      </svg>

      <div className="mt-4 rounded-lg bg-gray-800/30 p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-blue-400">삼성</span>
              <span className="text-gray-400">{samsungCap * chipCount}GB</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-800">
              <motion.div
                className="h-full rounded-full bg-blue-500/60"
                animate={{ width: `${(samsungCap / hynixCap) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-1 flex justify-between text-[10px]">
              <span className="text-red-400">하이닉스</span>
              <span className="text-gray-400">{hynixCap * chipCount}GB</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-800">
              <motion.div className="h-full rounded-full bg-red-500/60" animate={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-gray-400">
          GDDR7은 HBM처럼 수직 적층된 구조는 아니지만, GPU 주변에 다수의 칩을 배치해 높은 그래픽 메모리 용량을 확보합니다.
        </p>
      </div>
    </div>
  );
}
