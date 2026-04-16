"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const primaryPaths = [
  {
    title: "SK하이닉스 아틀라스",
    subtitle: "HBM · DRAM · NAND · MR-MUF",
    description:
      "제품 라인업을 훑는 페이지가 아니라, 왜 하이닉스가 이 메모리와 패키징 조합에 집중하는지까지 같이 읽는 출발점입니다.",
    href: "/hynix",
    accent: "#E4002B",
    stats: ["HBM 중심 제품 구조", "패키징 선택 이유", "삼성 비교 동선"],
  },
  {
    title: "위키 그래프",
    subtitle: "공정 · 계측 · 소자 · 수율",
    description:
      "여기저기 흩어져 있던 메모를 한 장의 그래프로 다시 묶었습니다. 노드를 따라가면 개념이 어떻게 이어지는지 바로 보입니다.",
    href: "/wiki",
    accent: "#38BDF8",
    stats: ["연결된 지식 노드", "백링크 탐색", "최신 업데이트 기록"],
  },
  {
    title: "공정 공부 경로",
    subtitle: "5대 공정 · HKMG · 누설전류",
    description:
      "정의만 외우는 흐름이 아니라, 왜 그 공정과 재료가 선택됐는지를 따라가며 이해할 수 있게 정리한 학습 경로입니다.",
    href: "/fundamentals",
    accent: "#22C55E",
    stats: ["왜 중심 설명", "계측과 수율 연결", "인터랙티브 정리"],
  },
];

const secondaryPaths = [
  { title: "하이닉스 뉴스", href: "/hynix/news" },
  { title: "HBM 상세", href: "/hynix/hbm" },
  { title: "양사 비교", href: "/hynix/compare" },
  { title: "위키 그래프", href: "/wiki" },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 pb-14 pt-4">
      <section
        className="relative mx-auto min-h-[78vh] max-w-7xl overflow-hidden rounded-[28px] border border-white/10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(6,10,18,0.24), rgba(6,10,18,0.82)), url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,0,43,0.16),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.16),transparent_28%)]" />

        <div className="relative flex min-h-[78vh] flex-col justify-between px-6 py-6 md:px-10 md:py-8">
          <header className="glass-panel flex items-center justify-between rounded-2xl px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-gray-400">
                Personal Semiconductor Notebook
              </p>
              <h1 className="mt-2 text-xl font-semibold text-white md:text-2xl">SK하이닉스 지식 위키</h1>
            </div>
            <div className="hidden gap-2 md:flex">
              <span className="glass-chip rounded-full px-3 py-1 text-xs text-gray-300">Obsidian Notes</span>
              <span className="glass-chip rounded-full px-3 py-1 text-xs text-gray-300">Raw Sources</span>
              <span className="glass-chip rounded-full px-3 py-1 text-xs text-gray-300">Perplexity Updates</span>
            </div>
          </header>

          <div className="max-w-4xl py-10 md:py-16">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm font-medium uppercase tracking-[0.32em] text-cyan-200/80"
            >
              Hynix-first semiconductor map
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              공부하면서 쌓인 반도체 메모를
              <br />
              서로 연결되는 지식 구조로 정리했습니다
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-5 max-w-2xl text-base leading-7 text-gray-200/88 md:text-lg"
            >
              5대 공정, HKMG, 계측, 누설전류, 수율, HBM과 패키징까지 한 번에 이어서 볼 수 있게
              다듬었습니다. 개념 하나를 읽다가도 바로 다음 노드로 넘어가면서, 왜 이 기술이 선택됐는지를
              흐름으로 따라갈 수 있습니다.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              <Link href="/wiki" className="glass-panel-strong rounded-full px-5 py-3 text-sm font-medium text-cyan-100">
                위키 그래프 보기
              </Link>
              <Link href="/fundamentals" className="glass-chip rounded-full px-5 py-3 text-sm font-medium text-white">
                공정 공부 경로 보기
              </Link>
            </motion.div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
            <div className="grid gap-4 md:grid-cols-3">
              {primaryPaths.map((path, index) => (
                <motion.div
                  key={path.href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.08 }}
                >
                  <Link href={path.href} className="block h-full">
                    <div className="glass-panel glass-card-hover flex h-full min-h-[220px] flex-col rounded-2xl p-5">
                      <div className="flex items-center justify-between">
                        <div
                          className="h-10 w-10 rounded-full border"
                          style={{ borderColor: `${path.accent}55`, backgroundColor: `${path.accent}18` }}
                        />
                        <span className="text-xs uppercase tracking-[0.24em]" style={{ color: path.accent }}>
                          Open
                        </span>
                      </div>
                      <p className="mt-5 text-xs uppercase tracking-[0.24em] text-gray-400">{path.subtitle}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">{path.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-gray-300">{path.description}</p>
                      <div className="mt-auto space-y-2 pt-5">
                        {path.stats.map((stat) => (
                          <div key={stat} className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: path.accent }} />
                            {stat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="glass-panel rounded-2xl p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-gray-400">How I Use It</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">지금 이 사이트는</h3>
              <div className="mt-5 space-y-4 text-sm leading-6 text-gray-300">
                <p>개념 하나를 따로 외우는 대신, 공정과 계측과 수율이 어떻게 이어지는지 같이 보게 만듭니다.</p>
                <p>하이닉스 제품과 패키징은 별도 축으로 정리해 두고, 필요할 때 위키 노드와 바로 왕복할 수 있게 했습니다.</p>
                <p>최신 업계 소식은 바로 덧붙이고, 나중에 위키 본문으로 흡수하면서 계속 두께를 키우는 방식으로 굴립니다.</p>
              </div>
              <div className="mt-6 grid gap-2">
                {secondaryPaths.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="glass-chip rounded-xl px-4 py-3 text-sm text-gray-200 transition-colors hover:border-white/20"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}
