"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HighKCompareSlider() {
  const [thickness, setThickness] = useState(50);

  const sio2K = 3.9;
  const hfo2K = 20;
  const physicalThickness = 1 + (thickness / 100) * 4;
  const eotSiO2 = physicalThickness;
  const eotHfO2 = physicalThickness * (sio2K / hfo2K);

  const tunnelingS = Math.min(100, Math.exp(4 - physicalThickness * 1.5) * 10);
  const tunnelingH = Math.min(100, Math.exp(4 - physicalThickness * 1.5) * 0.3);

  return (
    <div className="glass-panel rounded-2xl p-6">
      <h3 className="mb-1 text-sm font-semibold text-gray-300">High-K vs SiO2 유전체 비교</h3>
      <p className="mb-5 text-[11px] text-gray-500">
        같은 물리 두께에서 전기적 두께와 터널링 차이가 어떻게 벌어지는지 직관적으로 볼 수 있습니다.
      </p>

      <div className="mb-6">
        <div className="mb-2 flex justify-between text-[10px] text-gray-500">
          <span>물리 두께: {physicalThickness.toFixed(1)} nm</span>
          <span>1nm ~ 5nm</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={thickness}
          onChange={(e) => setThickness(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-800 accent-blue-500"
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-700 bg-gray-800/30 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-gray-500" />
            <span className="text-xs font-semibold text-gray-300">SiO2 (기존)</span>
          </div>
          <div className="mb-3 flex items-end gap-4">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">Gate</span>
              <div className="w-16 rounded-sm bg-gray-600" style={{ height: 60 }} />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">산화막</span>
              <motion.div
                className="w-16 rounded-sm border border-amber-600/30 bg-amber-700/60"
                animate={{ height: Math.max(8, physicalThickness * 12) }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">채널</span>
              <div className="w-16 rounded-sm bg-blue-900/40" style={{ height: 30 }} />
            </div>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-500">유전율 (k)</span>
              <span className="text-gray-300">{sio2K}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">EOT</span>
              <span className="text-gray-300">{eotSiO2.toFixed(2)} nm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">직접 터널링</span>
              <span className="font-semibold text-red-400">{tunnelingS.toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              className="h-full rounded-full bg-red-500"
              animate={{ width: `${tunnelingS}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-blue-500/20 bg-blue-950/10 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm bg-blue-500" />
            <span className="text-xs font-semibold text-blue-300">HfO2 (High-K)</span>
          </div>
          <div className="mb-3 flex items-end gap-4">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">Metal Gate</span>
              <div className="w-16 rounded-sm bg-blue-600/60" style={{ height: 60 }} />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">High-K</span>
              <motion.div
                className="w-16 rounded-sm border border-blue-400/30 bg-blue-500/40"
                animate={{ height: Math.max(8, physicalThickness * 12) }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-[8px] text-gray-600">채널</span>
              <div className="w-16 rounded-sm bg-blue-900/40" style={{ height: 30 }} />
            </div>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-500">유전율 (k)</span>
              <span className="text-gray-300">{hfo2K}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">EOT</span>
              <span className="text-gray-300">{eotHfO2.toFixed(2)} nm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">직접 터널링</span>
              <span className="font-semibold text-cyan-300">{tunnelingH.toFixed(1)}%</span>
            </div>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              className="h-full rounded-full bg-cyan-400"
              animate={{ width: `${tunnelingH}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 text-[11px] text-gray-400 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-gray-300">왜 중요한가</div>
          <p className="mt-1">같은 gate control을 유지하면서 물리막은 더 두껍게 가져가 누설전류를 줄이기 위해서입니다.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-gray-300">무엇이 보이나</div>
          <p className="mt-1">HfO2는 k가 커서 EOT를 더 작게 만들 수 있고, 터널링 확률은 훨씬 낮게 유지됩니다.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-gray-300">연결 개념</div>
          <p className="mt-1">High-K는 metal gate와 함께 봐야 실제 threshold control과 poly depletion 문제까지 이어집니다.</p>
        </div>
      </div>
    </div>
  );
}
