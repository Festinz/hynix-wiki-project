"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FilmMode = "pvd" | "cvd" | "ald";

const films: Record<
  FilmMode,
  {
    label: string;
    color: string;
    summary: string;
    strengths: string[];
    limits: string[];
  }
> = {
  pvd: {
    label: "PVD",
    color: "#f59e0b",
    summary: "직진성이 강해 빠르고 순도 높은 증착에 유리하지만, high AR 구조에서는 입구부터 막혀 overhang과 void가 생기기 쉽습니다.",
    strengths: ["증착 속도가 빠름", "금속막에 유리", "고순도 공정 구성 가능"],
    limits: ["step coverage가 약함", "overhang 발생", "bottom coverage 부족"],
  },
  cvd: {
    label: "CVD",
    color: "#22c55e",
    summary: "기체 전구체가 표면까지 도달해 화학 반응으로 막을 만들기 때문에 PVD보다 conformality가 좋습니다.",
    strengths: ["단차 피복성이 개선", "막 종류가 다양함", "생산성 균형이 좋음"],
    limits: ["부산물 관리 필요", "상대적으로 높은 온도", "열 budget 부담"],
  },
  ald: {
    label: "ALD",
    color: "#38bdf8",
    summary: "원자층 단위 self-limiting 반응이라 가장 균일한 피복성과 두께 제어를 제공하지만 느립니다.",
    strengths: ["거의 완전한 conformality", "원자층 수준 두께 제어", "high-k, GAA, 3D NAND에 적합"],
    limits: ["느린 증착 속도", "전구체 조합 민감", "ALD window 밖에서는 self-limiting 붕괴"],
  },
};

export default function ThinFilmProcessExplorer() {
  const [mode, setMode] = useState<FilmMode>("ald");
  const current = films[mode];

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-200">PVD vs CVD vs ALD</h3>
          <p className="mt-1 text-[11px] leading-5 text-gray-500">
            line-of-sight, conformality, ALD window, 저온 공정 필요성을 한 번에 보도록 구성했습니다.
          </p>
        </div>
        <div className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-gray-400">
          핵심: high AR + low thermal budget
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(films) as FilmMode[]).map((key) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              mode === key ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
            style={{
              borderColor: mode === key ? `${films[key].color}55` : "rgba(255,255,255,0.08)",
              backgroundColor: mode === key ? `${films[key].color}18` : "rgba(255,255,255,0.02)",
            }}
          >
            {films[key].label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-800 bg-black/20 p-4">
            <svg viewBox="0 0 320 220" className="w-full">
              <rect x="30" y="142" width="260" height="44" rx="8" fill="#1e293b" stroke="#334155" />
              <rect x="86" y="92" width="148" height="50" rx="6" fill="#0f172a" stroke="#475569" />
              <rect x="116" y="60" width="88" height="32" rx="6" fill="#111827" stroke="#475569" />

              {mode === "pvd" && (
                <>
                  {[96, 112, 128, 144, 160, 176, 192, 208].map((x, index) => (
                    <motion.line
                      key={x}
                      x1={x}
                      y1={24}
                      x2={x}
                      y2={58}
                      stroke="#f59e0b"
                      strokeWidth="2"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.3, delay: index * 0.05 }}
                    />
                  ))}
                  <rect x="104" y="56" width="20" height="12" rx="3" fill="#f59e0b" opacity="0.8" />
                  <rect x="196" y="56" width="20" height="12" rx="3" fill="#f59e0b" opacity="0.8" />
                  <text x="160" y="118" textAnchor="middle" fill="#fcd34d" fontSize="10">
                    입구가 먼저 막혀 overhang 발생
                  </text>
                </>
              )}

              {mode === "cvd" && (
                <>
                  {[88, 104, 120, 136, 184, 200, 216, 232].map((x, index) => (
                    <motion.circle
                      key={x}
                      cx={x}
                      cy={40 + (index % 3) * 10}
                      r="4"
                      fill="#22c55e"
                      animate={{ cy: [36, 46, 36] }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: index * 0.08 }}
                    />
                  ))}
                  <rect x="100" y="58" width="10" height="68" rx="4" fill="#22c55e" opacity="0.35" />
                  <rect x="210" y="58" width="10" height="68" rx="4" fill="#22c55e" opacity="0.35" />
                  <rect x="122" y="118" width="76" height="10" rx="4" fill="#22c55e" opacity="0.35" />
                  <text x="160" y="118" textAnchor="middle" fill="#86efac" fontSize="10">
                    측벽과 바닥까지 비교적 잘 도달
                  </text>
                </>
              )}

              {mode === "ald" && (
                <>
                  {[0, 1, 2].map((layer) => (
                    <motion.g key={layer} animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ repeat: Infinity, duration: 2.1, delay: layer * 0.3 }}>
                      <rect x={98 - layer} y={58 - layer} width={12 + layer} height={72 + layer * 2} rx="4" fill="#38bdf8" opacity="0.35" />
                      <rect x={210 - layer} y={58 - layer} width={12 + layer} height={72 + layer * 2} rx="4" fill="#38bdf8" opacity="0.35" />
                      <rect x={110 - layer} y={118 - layer} width={100 + layer * 2} height={12 + layer} rx="4" fill="#38bdf8" opacity="0.35" />
                      <rect x={110 - layer} y={48 - layer} width={100 + layer * 2} height={12 + layer} rx="4" fill="#38bdf8" opacity="0.35" />
                    </motion.g>
                  ))}
                  <text x="160" y="118" textAnchor="middle" fill="#7dd3fc" fontSize="10">
                    self-limiting으로 거의 균일한 피복
                  </text>
                </>
              )}

              <text x="160" y="205" textAnchor="middle" fill="#64748b" fontSize="10">
                구조가 복잡해질수록 step coverage와 conformality 차이가 커집니다.
              </text>
            </svg>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-cyan-500/15 bg-cyan-950/10 p-4 text-[11px] leading-6 text-gray-300">
              <p className="font-semibold text-cyan-400">왜 저온 공정이 중요해졌나</p>
              <p>- thermal budget 감소로 하부막과 기존 구조의 열 손상을 줄입니다.</p>
              <p>- dopant redistribution을 줄여 이온주입 프로파일이 퍼지는 것을 막습니다.</p>
              <p>- BEOL, low-k, high-k, 다층 적층 구조는 고온에 더 민감합니다.</p>
            </div>
            <div className="rounded-xl border border-sky-500/15 bg-sky-950/10 p-4 text-[11px] leading-6 text-gray-300">
              <p className="font-semibold text-sky-400">ALD Window</p>
              <p>- 너무 낮으면 precursor 응축 또는 반응 불충분</p>
              <p>- 적정 구간에서는 GPC가 안정되고 self-limiting 유지</p>
              <p>- 너무 높으면 precursor 분해로 CVD-like 거동</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div
            className="rounded-2xl border p-4"
            style={{ borderColor: `${current.color}35`, backgroundColor: `${current.color}10` }}
          >
            <p className="text-xs font-semibold" style={{ color: current.color }}>
              {current.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-200">{current.summary}</p>
          </div>

          <div className="rounded-xl border border-green-500/15 bg-green-950/10 p-4 text-[11px] leading-6 text-gray-300">
            <p className="font-semibold text-green-400">강점</p>
            {current.strengths.map((item) => (
              <p key={item}>- {item}</p>
            ))}
          </div>

          <div className="rounded-xl border border-red-500/15 bg-red-950/10 p-4 text-[11px] leading-6 text-gray-300">
            <p className="font-semibold text-red-400">한계</p>
            {current.limits.map((item) => (
              <p key={item}>- {item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
