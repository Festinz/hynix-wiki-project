"use client";

import dynamic from "next/dynamic";

const CompareDashboard = dynamic(() => import("@/components/CompareDashboard"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-panel rounded-2xl px-6 py-5 text-center">
        <p className="text-sm text-gray-300">비교 대시보드를 준비하는 중입니다.</p>
      </div>
    </div>
  ),
});

export default function HynixComparePage() {
  return <CompareDashboard company="hynix" />;
}
