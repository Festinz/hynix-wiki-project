import Link from "next/link";

import HBMStackViewer from "@/components/HBMStackViewer";

const cards = [
  {
    title: "왜 HBM인가",
    body: "AI 가속기는 연산량보다 메모리 대역폭에서 먼저 막히기 쉽습니다. HBM은 GPU 바로 옆에서 넓은 I/O를 제공해 병목을 줄입니다.",
  },
  {
    title: "하이닉스의 강점",
    body: "HBM 세대 전환을 빠르게 이어오면서 MR-MUF, TSV 적층, 패키징 완성도를 같이 끌어올린 점이 핵심입니다.",
  },
  {
    title: "다음 질문",
    body: "HBM4E, custom HBM, base die 전략, 패키징 협업 구조가 앞으로의 차별화 포인트가 됩니다.",
  },
];

export default function HynixHBMPage() {
  return (
    <main className="min-h-screen px-4 pb-12 pt-4">
      <div className="mx-auto max-w-5xl">
        <section
          className="glass-panel-strong relative overflow-hidden rounded-[28px] p-6 md:p-8"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(10, 12, 18, 0.55), rgba(10, 12, 18, 0.84)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Link href="/hynix" className="text-sm text-gray-400 hover:text-gray-200">
            ← 하이닉스 메인으로
          </Link>
          <p className="mt-5 text-xs uppercase tracking-[0.28em] text-red-200/80">HBM Focus</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold text-white md:text-5xl">
            하이닉스 HBM 축을 한 화면에서 읽는 요약 뷰
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-200/90 md:text-base">
            이 페이지는 HBM 세대 변화, 적층 구조, 패키징 맥락을 빠르게 훑는 허브입니다. 더 깊은 내용은 각 상세 노트와
            위키 그래프로 이어집니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/hynix/tech/hbm4" className="glass-panel rounded-full px-4 py-2 text-sm text-red-100">
              HBM4 상세 보기
            </Link>
            <Link href="/wiki/sk-hynix-memory-positioning" className="glass-chip rounded-full px-4 py-2 text-sm text-white">
              관련 위키 노트
            </Link>
          </div>
        </section>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="glass-panel rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-400">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <HBMStackViewer />
        </div>
      </div>
    </main>
  );
}
