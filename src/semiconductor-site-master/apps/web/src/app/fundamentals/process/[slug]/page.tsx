"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";

import CMPCleaningExplorer from "@/components/CMPCleaningExplorer";
import DiffusionProcessExplorer from "@/components/DiffusionProcessExplorer";
import EtchCompareAnimation from "@/components/EtchCompareAnimation";
import PhotoPRToggle from "@/components/PhotoPRToggle";
import ThinFilmProcessExplorer from "@/components/ThinFilmProcessExplorer";
import processesData from "@/data/processes.json";

const COLORS: Record<string, string> = {
  photo: "#8b5cf6",
  etch: "#ef4444",
  diffusion: "#3b82f6",
  "thin-film": "#f59e0b",
  cmp: "#10b981",
};

function joinKeyValue(items: string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export default function ProcessPage({ params }: { params: { slug: string } }) {
  const process = (processesData.processes as any[]).find((item) => item.slug === params.slug);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  if (!process) {
    notFound();
  }

  const color = COLORS[process.slug] ?? "#10b981";

  const sections = useMemo(() => {
    const nextSections: { title: string; content: string }[] = [];

    if (process.keyMaterials) {
      nextSections.push({
        title: "핵심 재료",
        content: process.keyMaterials
          .map((material: any) => {
            const lines = [`${material.name}`];
            if (material.composition) lines.push(`구성: ${material.composition}`);
            if (material.description) lines.push(material.description);
            if (material.types) {
              lines.push(
                ...material.types.map((type: any) => `${type.name}: ${type.behavior}`)
              );
            }
            return lines.join("\n");
          })
          .join("\n\n"),
      });
    }

    if (process.types) {
      nextSections.push({
        title: "공정 방식 비교",
        content: process.types
          .map((type: any) => {
            const lines = [type.name, type.description];
            if (type.pros) lines.push(`장점: ${type.pros}`);
            if (type.cons) lines.push(`한계: ${type.cons}`);
            if (type.useCase) lines.push(`주요 용도: ${type.useCase}`);
            if (type.variants) {
              lines.push(...type.variants.map((variant: any) => `${variant.name}: ${variant.description}`));
            }
            return lines.join("\n");
          })
          .join("\n\n"),
      });
    }

    if (process.methods) {
      nextSections.push({
        title: process.slug === "diffusion" ? "도핑 방식 변천" : "증착/공정 방법",
        content: process.methods
          .map((method: any) => {
            const lines = [`${method.name}${method.subtype ? ` (${method.subtype})` : ""}`, method.description];
            if (method.era) lines.push(`시대: ${method.era}`);
            if (method.pros) lines.push(`장점: ${method.pros}`);
            if (method.cons) lines.push(`한계: ${method.cons}`);
            if (method.useCase) lines.push(`주요 용도: ${method.useCase}`);
            if (method.selfLimitation) lines.push(`Self-limiting: ${method.selfLimitation}`);
            if (method.subTypes) {
              lines.push(...method.subTypes.map((subtype: any) => `${subtype.name}: ${subtype.description}`));
            }
            return lines.join("\n");
          })
          .join("\n\n"),
      });
    }

    if (process.lightSources) {
      nextSections.push({
        title: "광원 세대",
        content: process.lightSources
          .map((source: any) => `${source.name}: ${source.wavelength} (${source.era})`)
          .join("\n"),
      });
    }

    if (process.annealingProcess) {
      nextSections.push({
        title: "Annealing / RTA",
        content:
          `목적: ${process.annealingProcess.purpose}\n\n` +
          process.annealingProcess.types
            .map((item: any) => `${item.name}: ${item.temp}, ${item.time}`)
            .join("\n"),
      });
    }

    if (process.oxidation) {
      nextSections.push({
        title: "열산화",
        content:
          `${process.oxidation.description}\n\n` +
          process.oxidation.types
            .map((item: any) => `${item.name}: ${item.gas}, ${item.rate}, ${item.quality}, ${item.useCase}`)
            .join("\n") +
          `\n\nDeal-Grove Model: ${process.oxidation.dealGroveModel}`,
      });
    }

    if (process.dopants) {
      nextSections.push({
        title: "도펀트",
        content: process.dopants
          .map((dopant: any) => `${dopant.type}: ${dopant.elements.join(", ")} / 캐리어 ${dopant.carriers}`)
          .join("\n"),
      });
    }

    if (process.stepCoverage) {
      nextSections.push({
        title: "Step Coverage / Conformality",
        content:
          process.stepCoverage.comparison
            .map((item: any) => `${item.method}: ${item.coverage} / ${item.reason}`)
            .join("\n") +
          `\n\n의미: ${process.stepCoverage.importance}`,
      });
    }

    if (process.beol) {
      nextSections.push({
        title: "BEOL 연결",
        content: [
          process.beol.description,
          `배선층: ${process.beol.layers}`,
          `도체: ${process.beol.materials.conductor}`,
          `절연막: ${process.beol.materials.dielectric}`,
          `배리어: ${process.beol.materials.barrier}`,
          `핵심 과제: ${process.beol.challenge}`,
        ].join("\n"),
      });
    }

    if (process.mechanism) {
      nextSections.push({
        title: "메커니즘",
        content: [
          `화학적 역할: ${process.mechanism.chemical}`,
          `기계적 역할: ${process.mechanism.mechanical}`,
          `시너지: ${process.mechanism.synergy}`,
        ].join("\n"),
      });
    }

    if (process.materials) {
      nextSections.push({
        title: "사용 재료",
        content: process.materials.map((item: any) => `${item.name}: ${item.description}`).join("\n\n"),
      });
    }

    if (process.postCMP) {
      nextSections.push({
        title: "Cleaning",
        content: `${process.postCMP.description}\n방법: ${process.postCMP.method}`,
      });
    }

    if (process.defects) {
      nextSections.push({
        title: "대표 결함",
        content: process.defects
          .map((defect: any) => `${defect.name}\n원인: ${defect.cause}\n설명: ${defect.description}\n대응: ${defect.solution}`)
          .join("\n\n"),
      });
    }

    if (process.applications) {
      nextSections.push({
        title: "실제 적용 예시",
        content: process.applications
          .map((application: any) => {
            const lines = [application.name, application.description];
            if (application.steps) lines.push(joinKeyValue(application.steps));
            if (application.challenges) lines.push(joinKeyValue(application.challenges));
            if (application.keyChallenge) lines.push(`핵심 과제: ${application.keyChallenge}`);
            return lines.join("\n");
          })
          .join("\n\n"),
      });
    }

    if (process.futureTech) {
      nextSections.push({
        title: `미래 기술 - ${process.futureTech.name}`,
        content: [
          process.futureTech.description,
          `장점: ${(process.futureTech.benefits ?? []).join(", ")}`,
          process.futureTech.company ? `관련 기업: ${process.futureTech.company}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });
    }

    return nextSections;
  }, [process]);

  const interactive = (() => {
    if (process.slug === "photo") return <PhotoPRToggle />;
    if (process.slug === "etch") return <EtchCompareAnimation />;
    if (process.slug === "diffusion") return <DiffusionProcessExplorer />;
    if (process.slug === "thin-film") return <ThinFilmProcessExplorer />;
    if (process.slug === "cmp") return <CMPCleaningExplorer />;
    return null;
  })();

  const prev = (processesData.processes as any[]).find((item: any) => item.order === process.order - 1);
  const next = (processesData.processes as any[]).find((item: any) => item.order === process.order + 1);

  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel-strong rounded-3xl p-8">
          <Link href="/fundamentals/process" className="text-sm text-gray-500 hover:text-gray-300">
            공정 개요로 돌아가기
          </Link>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-5">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-gray-500">Process {process.order}</div>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">{process.name}</h1>
              <p className="mt-2 text-sm text-gray-400">{process.nameEn}</p>
              <p className="mt-5 text-sm leading-7 text-gray-300">{process.description}</p>
            </div>

            <div
              className="rounded-2xl border px-5 py-4 text-sm"
              style={{ borderColor: `${color}35`, backgroundColor: `${color}10` }}
            >
              <div className="text-xs text-gray-400">한 줄 감각</div>
              <div className="mt-2 font-semibold text-white">{process.analogy.title}</div>
              <div className="mt-2 max-w-xs text-xs leading-6 text-gray-300">{process.analogy.everyday}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {process.keyParameters.map((parameter: any) => (
              <div key={parameter.name} className="glass-chip rounded-2xl p-4">
                <div className="text-xs text-gray-500">{parameter.name}</div>
                <div className="mt-2 text-sm text-gray-200">{parameter.unit}</div>
                <div className="mt-2 text-xs leading-5 text-gray-400">{parameter.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white">왜 이 공정이 필요한가</h2>
              <p className="mt-4 text-sm leading-7 text-gray-300">{process.analogy.description}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Study Note</p>
                <p className="mt-3 text-sm leading-7 text-gray-300">
                  이 페이지는 단순 정의보다도 “왜 이 방식이 선택됐는가, 어떤 한계를 보완하는가, 다음 공정에 무엇을 남기는가”를 보도록 정리했습니다.
                </p>
              </div>
            </section>

            {interactive && (
              <section className="glass-panel rounded-3xl p-8">
                <div className="mb-5">
                  <h2 className="text-2xl font-semibold text-white">인터랙티브 이해</h2>
                  <p className="mt-2 text-sm leading-7 text-gray-400">
                    개념을 글로만 읽지 않고, 구조 변화와 trade-off를 손으로 넘겨보듯 볼 수 있게 만든 섹션입니다.
                  </p>
                </div>
                {interactive}
              </section>
            )}

            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white">기술 상세</h2>
              <div className="mt-5 space-y-3">
                {sections.map((section, index) => {
                  const isOpen = openAccordion === index;

                  return (
                    <div key={section.title} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                      <button
                        onClick={() => setOpenAccordion(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-sm font-medium text-gray-200">{section.title}</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-500">
                          ▾
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 whitespace-pre-line text-sm leading-7 text-gray-300">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="glass-panel rounded-3xl p-8">
              <h2 className="text-2xl font-semibold text-white">공부 포인트</h2>
              <div className="mt-5 space-y-3">
                {process.interviewPoints.map((point: string, index: number) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-sm leading-7 text-gray-300">{point.replace(/^★\s*/, "")}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="glass-panel rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white">핵심 질문</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-300">
                <p>이 공정은 무엇을 만들기 위해 존재하는가?</p>
                <p>기존 방법의 한계를 무엇으로 보완하는가?</p>
                <p>다음 공정에는 어떤 제약이나 이점을 남기는가?</p>
              </div>
            </section>

            <section className="glass-panel rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white">이어서 보기</h2>
              <div className="mt-4 space-y-2">
                {prev ? (
                  <Link
                    href={`/fundamentals/process/${prev.slug}`}
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 hover:border-cyan-400/30"
                  >
                    이전 공정: {prev.name}
                  </Link>
                ) : null}
                {next ? (
                  <Link
                    href={`/fundamentals/process/${next.slug}`}
                    className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 hover:border-cyan-400/30"
                  >
                    다음 공정: {next.name}
                  </Link>
                ) : null}
                <Link
                  href="/wiki"
                  className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 hover:border-cyan-400/30"
                >
                  위키 그래프에서 연결 보기
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
