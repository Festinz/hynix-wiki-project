import Link from "next/link";
import { notFound } from "next/navigation";

import WikiLatestUpdates from "@/components/wiki/WikiLatestUpdates";
import WikiMarkdown from "@/components/wiki/WikiMarkdown";
import { getBacklinkPages, getWikiPage, parseWikiSections, wikiPages } from "@/lib/wiki";

export function generateStaticParams() {
  return wikiPages.map((page) => ({ slug: page.slug }));
}

export default function WikiDetailPage({ params }: { params: { slug: string } }) {
  const page = getWikiPage(params.slug);
  if (!page) notFound();

  const backlinks = getBacklinkPages(page.slug);
  const parsed = parseWikiSections(page.content);
  const toc = parsed.sections.filter((section) => section.title);

  return (
    <main className="min-h-screen px-4 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel-strong rounded-3xl p-8">
          <Link href="/wiki" className="text-sm text-gray-500 hover:text-gray-300">
            위키 그래프로 돌아가기
          </Link>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-gray-500">{page.type}</div>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-white">{page.title}</h1>
              <p className="mt-3 text-sm leading-7 text-gray-300">{page.excerpt}</p>
            </div>
            <div className="glass-chip rounded-full px-4 py-2 text-sm text-gray-300">
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

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="glass-chip rounded-2xl p-4">
              <div className="text-xs text-gray-500">created</div>
              <div className="mt-1 text-sm text-gray-200">{page.created}</div>
            </div>
            <div className="glass-chip rounded-2xl p-4">
              <div className="text-xs text-gray-500">updated</div>
              <div className="mt-1 text-sm text-gray-200">{page.updated}</div>
            </div>
            <div className="glass-chip rounded-2xl p-4">
              <div className="text-xs text-gray-500">connections</div>
              <div className="mt-1 text-sm text-gray-200">{page.backlinks.length + page.resolvedLinks.length}</div>
            </div>
            <div className="glass-chip rounded-2xl p-4">
              <div className="text-xs text-gray-500">sources</div>
              <div className="mt-1 text-sm text-gray-200">{page.sources.length}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            {parsed.intro && (
              <section className="glass-panel rounded-3xl p-8">
                <WikiMarkdown content={parsed.intro} />
              </section>
            )}

            {toc.length ? (
              toc.map((section) => (
                <section key={section.id} id={section.id} className="glass-panel rounded-3xl p-8 scroll-mt-24">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                    <a href={`#${section.id}`} className="text-xs text-gray-500 hover:text-gray-300">
                      #
                    </a>
                  </div>
                  <WikiMarkdown content={section.content} />
                </section>
              ))
            ) : (
              <section className="glass-panel rounded-3xl p-8">
                <WikiMarkdown content={page.content} />
              </section>
            )}

            <div className="glass-panel rounded-3xl p-6">
              <h2 className="text-lg font-semibold text-white">최신 정보</h2>
              <div className="mt-4">
                <WikiLatestUpdates slug={page.slug} title={page.title} />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <section className="glass-panel rounded-2xl p-5">
              <h2 className="text-lg font-semibold text-white">목차</h2>
              <div className="mt-4 space-y-2">
                {toc.length ? (
                  toc.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300 hover:border-cyan-400/30"
                    >
                      {section.title}
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">이 노트는 짧은 메모 형태라 별도 목차가 없습니다.</p>
                )}
              </div>
            </section>

            <section className="glass-panel rounded-2xl p-5">
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
                  <p className="text-sm text-gray-500">아직 이 페이지를 참조하는 다른 노트가 많지 않습니다.</p>
                )}
              </div>
            </section>

            <section className="glass-panel rounded-2xl p-5">
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
      </div>
    </main>
  );
}
