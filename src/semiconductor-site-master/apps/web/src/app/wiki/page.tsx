import Link from "next/link";

import WikiExplorer from "@/components/wiki/WikiExplorer";
import { wikiGraph } from "@/lib/wiki";

export default function WikiPage() {
  return (
    <main className="min-h-screen px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel-strong mb-8 rounded-3xl p-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-300">
            홈으로
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">반도체 위키 그래프</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-300">
            공정, 계측, 소자, 수율, 패키징 노트가 어떻게 서로 이어지는지 한 화면에서 훑어볼 수 있게
            정리했습니다. 옵시디언 그래프처럼 연결 관계를 먼저 보고, 필요한 노드는 바로 열어 들어갈 수 있습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-400">
            <span className="rounded-full border border-white/10 px-3 py-1">지식 그래프</span>
            <span className="rounded-full border border-white/10 px-3 py-1">노트 탐색</span>
            <span className="rounded-full border border-white/10 px-3 py-1">최신 업데이트 연결</span>
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
