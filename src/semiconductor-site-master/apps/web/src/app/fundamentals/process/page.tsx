import Link from "next/link";

import processesData from "@/data/processes.json";

const COLORS: Record<string, string> = {
  photo: "#8b5cf6",
  etch: "#ef4444",
  diffusion: "#3b82f6",
  "thin-film": "#f59e0b",
  cmp: "#10b981",
};

const NOTES: Record<string, string[]> = {
  photo: ["PR은 단순 재료가 아니라 pattern fidelity를 좌우하는 화학 시스템", "overlay와 CD는 결국 다음 식각과 소자 성능으로 번역됨"],
  etch: ["Wet, Dry, RIE를 같은 축에서 봐야 profile 감각이 생김", "high aspect ratio 시대라 방향성과 선택비를 같이 보는 습관이 중요"],
  diffusion: ["확산만 보지 말고 열산화, 이온주입, 어닐링까지 한 흐름으로 보기", "현대 주류는 ion implantation + RTA"],
  "thin-film": ["PVD overhang, CVD conformality, ALD window를 같이 봐야 integration 감각이 생김", "저온 공정은 신소재와 다층 적층을 지키기 위한 선택"],
  cmp: ["마지막 공정은 CMP 단독이 아니라 C&C로 보는 편이 정확함", "평탄화 뒤 cleaning이 residue와 defect를 끊어 준다"],
};

export default function ProcessHubPage() {
  const processes = (processesData.processes as any[]).map((process) => {
    if (process.slug === "cmp") {
      return {
        ...process,
        name: "CMP & Cleaning",
        nameEn: "Chemical Mechanical Polishing & Cleaning (C&C)",
      };
    }
    return process;
  });

  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel-strong rounded-3xl p-8">
          <Link href="/fundamentals" className="text-sm text-gray-500 hover:text-gray-300">
            반도체 상식으로 돌아가기
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">5대 공정 흐름</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-300">
            포토로 패턴을 정하고, 식각으로 형상을 만들고, 확산·이온주입으로 전기적 성질을 주고,
            박막 증착으로 필요한 막을 쌓고, 마지막에 C&amp;C로 표면을 정리합니다.
            각 카드에서는 왜 이 공정이 선택됐는지와 다음 스텝에 무엇을 남기는지를 같이 보도록 정리했습니다.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {processes.map((process) => (
            <Link
              key={process.slug}
              href={`/fundamentals/process/${process.slug}`}
              className="glass-panel rounded-3xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-gray-500">Process {process.order}</div>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{process.name}</h2>
                  <p className="mt-1 text-xs text-gray-400">{process.nameEn}</p>
                </div>
                <div
                  className="rounded-2xl border px-3 py-2 text-xs font-semibold"
                  style={{ borderColor: `${COLORS[process.slug]}35`, color: COLORS[process.slug] }}
                >
                  핵심 보기
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-300">{process.description}</p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Study Note</p>
                <div className="mt-3 space-y-2 text-sm leading-6 text-gray-300">
                  {NOTES[process.slug]?.map((note) => (
                    <p key={note}>- {note}</p>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
