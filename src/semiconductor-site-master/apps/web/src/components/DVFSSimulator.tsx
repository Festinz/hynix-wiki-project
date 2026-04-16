"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const MODES = [
  {
    name: "게임 / AI",
    icon: "GPU",
    voltage: 1.1,
    frequency: 8533,
    power: 100,
    description: "최대 성능이 필요할 때 전압과 주파수를 모두 높게 유지합니다.",
    color: "#ef4444",
  },
  {
    name: "일반 사용",
    icon: "BAL",
    voltage: 0.85,
    frequency: 6400,
    power: 60,
    description: "성능과 효율의 균형을 맞춘 기본 동작 모드입니다.",
    color: "#f59e0b",
  },
  {
    name: "절전 / 대기",
    icon: "ECO",
    voltage: 0.6,
    frequency: 3200,
    power: 25,
    description: "부하가 낮을 때 자동으로 전환되어 배터리 소모를 줄입니다.",
    color: "#22c55e",
  },
];

export default function DVFSSimulator() {
  const [modeIndex, setModeIndex] = useState(1);
  const mode = MODES[modeIndex];

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-300">DVFS 시뮬레이터 (LPDDR6)</h3>
      <p className="mb-5 text-[11px] text-gray-500">
        Dynamic Voltage and Frequency Scaling은 부하에 따라 전압과 주파수를 동시에 조절해 전력 효율을 끌어올립니다.
      </p>

      <div className="mb-6 grid grid-cols-3 gap-2">
        {MODES.map((m, i) => (
          <button
            key={m.name}
            onClick={() => setModeIndex(i)}
            className={`relative rounded-xl border p-3 text-center transition-all ${
              modeIndex === i
                ? ""
                : "border-gray-800 bg-gray-800/30 hover:border-gray-700"
            }`}
            style={modeIndex === i ? { backgroundColor: `${m.color}10`, borderColor: `${m.color}40` } : undefined}
          >
            <span className="mb-1 block text-[10px] font-semibold tracking-[0.2em] text-gray-500">{m.icon}</span>
            <span className="block text-[11px] font-medium" style={modeIndex === i ? { color: m.color } : { color: "#9ca3af" }}>
              {m.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">전압</p>
          <div className="relative mx-auto h-20 w-20">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={mode.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - mode.voltage / 1.2) }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: mode.color }}>
                {mode.voltage}V
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">주파수</p>
          <div className="relative mx-auto h-20 w-20">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={mode.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - mode.frequency / 9000) }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold" style={{ color: mode.color }}>
                {mode.frequency}
              </span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-gray-500">전력</p>
          <div className="relative mx-auto h-20 w-20">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={mode.color}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - mode.power / 100) }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: mode.color }}>
                {mode.power}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-medium text-gray-200">{mode.name}</p>
        <p className="mt-2 text-xs leading-relaxed text-gray-400">{mode.description}</p>
        <p className="mt-3 text-[11px] text-gray-500">
          전력은 대략 <code>P ∝ V² × f</code>에 비례하므로, 전압을 조금만 내려도 전체 소비전력이 크게 줄어듭니다.
        </p>
      </div>
    </div>
  );
}
