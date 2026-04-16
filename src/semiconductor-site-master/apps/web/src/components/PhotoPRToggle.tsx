"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PhotoPRToggle() {
  const [isPositive, setIsPositive] = useState(true);

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <h3 className="text-sm font-semibold text-gray-200">PR 노광 결과 비교</h3>
      <p className="mt-1 text-[11px] leading-5 text-gray-500">
        Positive PR은 빛을 받은 부분이 녹아 사라지고, Negative PR은 빛을 받은 부분이 경화되어 남습니다.
        현재 미세 패턴 공정의 주류는 Positive PR입니다.
      </p>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setIsPositive(true)}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
            isPositive
              ? "border-sky-400/40 bg-sky-500/15 text-sky-300"
              : "border-white/10 bg-white/5 text-gray-400 hover:text-gray-200"
          }`}
        >
          Positive PR
        </button>
        <button
          onClick={() => setIsPositive(false)}
          className={`flex-1 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
            !isPositive
              ? "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-300"
              : "border-white/10 bg-white/5 text-gray-400 hover:text-gray-200"
          }`}
        >
          Negative PR
        </button>
      </div>

      <svg viewBox="0 0 500 230" className="mt-6 w-full max-w-3xl">
        <text x="85" y="18" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="500">
          1. 코팅
        </text>
        <text x="250" y="18" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="500">
          2. 노광
        </text>
        <text x="415" y="18" textAnchor="middle" fill="#9ca3af" fontSize="10" fontWeight="500">
          3. 현상
        </text>

        <rect x="20" y="128" width="130" height="28" rx="4" fill="#374151" />
        <text x="85" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="9">
          웨이퍼
        </text>
        <rect x="20" y="98" width="130" height="30" rx="4" fill={isPositive ? "#38bdf8" : "#d946ef"} opacity="0.55" />
        <text x="85" y="117" textAnchor="middle" fill="white" fontSize="9">
          PR 전체 도포
        </text>

        <rect x="185" y="128" width="130" height="28" rx="4" fill="#374151" />
        <text x="250" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="9">
          웨이퍼
        </text>
        <rect x="185" y="98" width="40" height="30" rx="3" fill={isPositive ? "#38bdf8" : "#d946ef"} opacity="0.55" />
        <rect x="275" y="98" width="40" height="30" rx="3" fill={isPositive ? "#38bdf8" : "#d946ef"} opacity="0.55" />
        <motion.rect
          x="225"
          y="98"
          width="50"
          height="30"
          rx="3"
          fill={isPositive ? "#38bdf8" : "#d946ef"}
          animate={{ opacity: [0.45, 0.95, 0.45] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        />
        <text x="250" y="117" textAnchor="middle" fill="white" fontSize="8">
          빛 받은 부분
        </text>

        {[235, 245, 255, 265].map((x, index) => (
          <motion.line
            key={x}
            x1={x}
            y1="40"
            x2={x}
            y2="92"
            stroke="#fbbf24"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, delay: index * 0.12 }}
          />
        ))}
        <rect x="220" y="62" width="60" height="8" rx="2" fill="#1f2937" stroke="#6b7280" strokeWidth="0.5" />
        <text x="250" y="57" textAnchor="middle" fill="#94a3b8" fontSize="7">
          Mask
        </text>
        <text x="250" y="86" textAnchor="middle" fill="#fbbf24" fontSize="8">
          UV / EUV
        </text>

        <rect x="350" y="128" width="130" height="28" rx="4" fill="#374151" />
        <text x="415" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="9">
          웨이퍼
        </text>
        {isPositive ? (
          <>
            <rect x="350" y="98" width="40" height="30" rx="3" fill="#38bdf8" opacity="0.55" />
            <rect x="440" y="98" width="40" height="30" rx="3" fill="#38bdf8" opacity="0.55" />
            <rect x="390" y="98" width="50" height="30" rx="3" fill="transparent" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
            <text x="415" y="117" textAnchor="middle" fill="#7dd3fc" fontSize="8">
              노광부 제거
            </text>
          </>
        ) : (
          <>
            <rect x="350" y="98" width="40" height="30" rx="3" fill="transparent" stroke="#d946ef" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
            <rect x="440" y="98" width="40" height="30" rx="3" fill="transparent" stroke="#d946ef" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
            <rect x="390" y="98" width="50" height="30" rx="3" fill="#d946ef" opacity="0.58" />
            <text x="415" y="117" textAnchor="middle" fill="#f0abfc" fontSize="8">
              노광부 유지
            </text>
          </>
        )}

        <line x1="156" y1="113" x2="180" y2="113" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#photo-arrow)" />
        <line x1="320" y1="113" x2="344" y2="113" stroke="#4b5563" strokeWidth="1.5" markerEnd="url(#photo-arrow)" />
        <defs>
          <marker id="photo-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="#4b5563" />
          </marker>
        </defs>
      </svg>

      <div className="mt-5 grid gap-3 md:grid-cols-2 text-xs">
        <div
          className={`rounded-xl border p-4 ${
            isPositive ? "border-sky-400/20 bg-sky-500/10" : "border-white/10 bg-white/5"
          }`}
        >
          <p className={`font-semibold ${isPositive ? "text-sky-300" : "text-gray-400"}`}>Positive PR</p>
          <p className="mt-2 text-gray-300">빛을 받은 부분의 용해도가 커져 현상액에 녹습니다.</p>
          <p className="mt-1 text-[11px] text-gray-500">미세 패턴 해상도와 공정 제어에 유리해서 현재 주류입니다.</p>
        </div>
        <div
          className={`rounded-xl border p-4 ${
            !isPositive ? "border-fuchsia-400/20 bg-fuchsia-500/10" : "border-white/10 bg-white/5"
          }`}
        >
          <p className={`font-semibold ${!isPositive ? "text-fuchsia-300" : "text-gray-400"}`}>Negative PR</p>
          <p className="mt-2 text-gray-300">빛을 받은 부분이 경화되어 남고, 비노광부가 제거됩니다.</p>
          <p className="mt-1 text-[11px] text-gray-500">두꺼운 구조나 특수 공정에는 여전히 의미가 있지만 주류는 아닙니다.</p>
        </div>
      </div>
    </div>
  );
}
