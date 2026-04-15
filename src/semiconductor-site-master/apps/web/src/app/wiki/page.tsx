import Link from "next/link";

import WikiExplorer from "@/components/wiki/WikiExplorer";
import { wikiGraph } from "@/lib/wiki";

export default function WikiPage() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-3xl border border-white/10 bg-gray-950/70 p-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-300">
            ← 홈으로
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">LLM Wiki</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-300">
            Karpathy 패턴으로 11개 소스를 하나의 연결된 반도체 지식 체계로 컴파일했습니다.
            공정, 계측, 소자, 수율, 산업 맥락을 그래프 위에서 함께 읽을 수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-400">
            <span className="rounded-full border border-white/10 px-3 py-1">지식 그래프</span>
            <span className="rounded-full border border-white/10 px-3 py-1">백링크 탐색</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Perplexity 최신 정보</span>
          </div>
        </div>

        <WikiExplorer
          pages={wikiGraph.pages}
          nodes={wikiGraph.nodes}
          stats={wikiGraph.stats}
          recent={wikiGraph.recent}
        />
      </div>
    </main>
  );
}
