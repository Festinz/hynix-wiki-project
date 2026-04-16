"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const cards = [
  {
    tag: "DEVICE",
    title: "MOSFET 진화",
    subtitle: "Planar · FinFET · GAA/MBCFET",
    desc: "게이트가 채널을 얼마나 감싸느냐에 따라 short-channel 제어가 어떻게 달라지는지 정리했습니다.",
    tip: "1면, 3면, 4면 제어 차이를 구조로 비교하기",
    href: "/fundamentals/mosfet-evolution",
    color: "#8b5cf6",
  },
  {
    tag: "STACK",
    title: "High-K Metal Gate",
    subtitle: "누설전류를 줄이기 위한 게이트 스택 전환",
    desc: "SiO2와 poly-Si의 한계에서 출발해 HfO2와 metal gate가 왜 필요해졌는지 따라갑니다.",
    tip: "high-k와 metal gate를 반드시 같이 읽어야 하는 이유",
    href: "/fundamentals/high-k-metal-gate",
    color: "#3b82f6",
  },
  {
    tag: "FLOW",
    title: "5대 공정 개요",
    subtitle: "Photo · Etch · Diffusion · Thin Film · C&C",
    desc: "공정 순서만 나열하지 않고, 앞 공정이 뒤 공정에 어떤 조건을 남기는지 흐름으로 정리했습니다.",
    tip: "왜 마지막 공정이 CMP가 아니라 C&C인지 같이 보기",
    href: "/fundamentals/process",
    color: "#0ea5e9",
  },
  {
    tag: "DETAIL",
    title: "공정 상세",
    subtitle: "재료 · 파라미터 · 형상 문제 · 인터랙티브",
    desc: "RIE, ion implantation, ALD window, PVD overhang, C&C처럼 자주 헷갈리는 포인트를 손으로 만지듯 볼 수 있습니다.",
    tip: "각 공정 페이지에서 인터랙티브 블록 먼저 보기",
    href: "/fundamentals/process/etch",
    color: "#16a34a",
  },
  {
    tag: "LEAKAGE",
    title: "누설전류와 억제 전략",
    subtitle: "DIBL · GIDL · Punch Through · HCI",
    desc: "누설 유형별 위치, 원인, 문제, 해법을 같은 형식으로 맞춰서 정리했습니다.",
    tip: "공정 해법과 누설 메커니즘을 1:1로 연결해 보기",
    href: "/fundamentals/leakage-current",
    color: "#ef4444",
  },
  {
    tag: "DATA",
    title: "계측 · SPC · FDC",
    subtitle: "공정에서 수율까지 이어지는 데이터 읽기",
    desc: "CD와 두께, 전기 특성, 설비 로그를 따로 보지 않고 같은 이야기로 읽는 관점을 정리했습니다.",
    tip: "결과 관리 SPC와 원인 감지 FDC의 차이 먼저 보기",
    href: "/fundamentals/spc-fdc",
    color: "#f59e0b",
  },
  {
    tag: "UPDATES",
    title: "최신 트렌드",
    subtitle: "Perplexity 브리핑과 위키 연결",
    desc: "HBM, TSV, GAA, AI 메모리 이슈를 기존 노드와 연결해서 보도록 구성했습니다.",
    tip: "최신 뉴스가 기존 개념 노드 어디에 붙는지 확인하기",
    href: "/fundamentals/trends",
    color: "#10b981",
  },
];

export default function FundamentalsPage() {
  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel sticky top-4 z-40 mx-auto max-w-5xl rounded-2xl"
      >
        <div className="flex items-center gap-4 px-4 py-4">
          <Link href="/" className="text-gray-500 transition-colors hover:text-gray-300">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-green-400">공정 공부 경로</h1>
            <p className="text-xs text-gray-500">MOSFET · 5대 공정 · HKMG · 누설전류 · 최신 트렌드</p>
          </div>
        </div>
      </motion.header>

      <div className="mx-auto max-w-5xl py-8">
        <div className="glass-panel-strong mb-6 rounded-[24px] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-green-300/75">Knowledge Paths</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            정의보다 연결을 먼저 보게 만드는 반도체 공부 경로
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
            이 섹션은 하이닉스 위키를 읽기 전에 필요한 공정, 소자, 계측 배경을 한 번에 연결해 두는 입구입니다.
            각 카드에서 자세한 설명으로 들어가고, 다시 위키 노드로 확장되는 흐름으로 구성했습니다.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div key={card.title} variants={item}>
              <Link href={card.href}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="glass-panel glass-card-hover flex h-full cursor-pointer flex-col rounded-2xl p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="rounded-md border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ borderColor: `${card.color}40`, color: card.color }}
                    >
                      {card.tag}
                    </span>
                    <div className="h-8 w-1 rounded-full opacity-70" style={{ backgroundColor: card.color }} />
                    <div>
                      <h3 className="text-sm font-bold text-gray-200">{card.title}</h3>
                      <p className="text-[10px] text-gray-500">{card.subtitle}</p>
                    </div>
                  </div>

                  <p className="mb-4 flex-1 text-xs leading-relaxed text-gray-400">{card.desc}</p>

                  <div
                    className="rounded-lg px-3 py-2 text-[10px] font-medium leading-snug"
                    style={{
                      backgroundColor: `${card.color}10`,
                      color: card.color,
                      border: `1px solid ${card.color}25`,
                    }}
                  >
                    {card.tip}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
                    자세히 보기
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
