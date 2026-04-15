import Link from "next/link";
import { notFound } from "next/navigation";

import WikiLatestUpdates from "@/components/wiki/WikiLatestUpdates";
import WikiMarkdown from "@/components/wiki/WikiMarkdown";
import { getBacklinkPages, getWikiPage, wikiPages } from "@/lib/wiki";

export function generateStaticParams() {
  return wikiPages.map((page) => ({ slug: page.slug }));
}

export default function WikiDetailPage({ params }: { params: { slug: string } }) {
  const page = getWikiPage(params.slug);
  if (!page) notFound();

  const backlinks = getBacklinkPages(page.slug);

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-gray-950/70 p-8">
          <Link href="/wiki" className="text-sm text-gray-500 hover:text-gray-300">
            ← 위키 그래프로 돌아가기
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-gray-500">{page.type}</div>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">{page.title}</h1>
            </div>
            <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">
              confidence: {page.confidence}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {page.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-gray-500">created</div>
              <div className="mt-1 text-sm text-gray-200">{page.created}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-gray-500">updated</div>
              <div className="mt-1 text-sm text-gray-200">{page.updated}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-gray-500">connections</div>
              <div className="mt-1 text-sm text-gray-200">{page.backlinks.length + page.resolvedLinks.length}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="rounded-3xl border border-white/10 bg-gray-950/60 p-8">
            <WikiMarkdown content={page.content} />
          </article>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-gray-950/60 p-5">
              <h2 className="text-lg font-semibold text-white">Backlinks</h2>
              <div className="mt-4 space-y-2">
                {backlinks.length ? (
                  backlinks.map((backlink) => (
                    <Link
                      key={backlink.slug}
                      href={`/wiki/${backlink.slug}`}
                      className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 hover:border-cyan-400/30"
                    >
                      {backlink.title}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">이 페이지를 참조하는 노트가 아직 많지 않습니다.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-gray-950/60 p-5">
              <h2 className="text-lg font-semibold text-white">Sources</h2>
              <div className="mt-4 space-y-2">
                {page.sources.map((source) => (
                  <div key={source} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                    {source}
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <div className="mt-6">
          <WikiLatestUpdates slug={page.slug} title={page.title} />
        </div>
      </div>
    </main>
  );
}
