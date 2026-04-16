"use client";

import { motion } from "framer-motion";

interface JEDECProgressBarProps {
  achieved: number;
  target: number;
  unit: string;
  color: string;
  label?: string;
}

export default function JEDECProgressBar({
  achieved,
  target,
  unit,
  color,
  label = "JEDEC 목표 대비",
}: JEDECProgressBarProps) {
  const percentage = Math.min((achieved / target) * 100, 200);
  const displayPercent = Math.round(percentage);
  const overTarget = achieved > target;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-gray-500">{label}</span>
        <span className="text-[10px] text-gray-400">
          {achieved} / {target} {unit}
          <span className="ml-1 font-semibold" style={{ color: overTarget ? color : undefined }}>
            ({displayPercent}%)
          </span>
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-gray-800">
        <div
          className="absolute bottom-0 top-0 z-10 w-px bg-gray-500"
          style={{ left: `${Math.min(100, (100 / Math.max(percentage, 100)) * 100)}%` }}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
