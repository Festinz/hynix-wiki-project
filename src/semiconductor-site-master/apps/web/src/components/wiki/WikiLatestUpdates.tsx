"use client";

import { useEffect, useState } from "react";

interface WikiLatestUpdatesProps {
  slug: string;
  title: string;
}

interface WikiUpdateEntry {
  slug: string;
  title: string;
  content: string;
  citations: string[];
  fetchedAt: string;
  uploadedAt?: string;
}

export default function WikiLatestUpdates({ slug, title }: WikiLatestUpdatesProps) {
  const [updates, setUpdates] = useState<WikiUpdateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  async function loadUpdates() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/wiki/updates/${slug}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "최신 정보를 불러오지 못했습니다.");
      }
      setUpdates(data.updates || []);
    } catch (err: any) {
      setError(err.message || "최신 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }

  async function triggerUpdate() {
    setRefreshing(true);
    setError("");

    try {
      const response = await fetch("/api/wiki/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "업데이트 생성에 실패했습니다.");
      }
      await loadUpdates();
    } catch (err: any) {
      setError(err.message || "업데이트 생성에 실패했습니다.");
    } finally {
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadUpdates();
  }, [slug]);

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">최신 정보</h2>
          <p className="text-sm text-gray-400">
            {title}와 연결되는 최근 1주 업데이트를 Perplexity로 수집합니다.
          </p>
        </div>
        <button
          type="button"
          onClick={triggerUpdate}
          disabled={refreshing}
          className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {refreshing ? "업데이트 생성 중..." : "수동 업데이트"}
        </button>
      </div>

      {error ? (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-4 text-sm text-gray-400">최신 정보를 불러오는 중...</div>
      ) : updates.length === 0 ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-gray-950/40 px-4 py-4 text-sm text-gray-400">
          아직 저장된 업데이트가 없습니다. 수동 업데이트를 누르면 이 노드와 연결되는 최근 동향을 수집합니다.
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {updates.map((update) => (
            <article key={`${update.slug}-${update.fetchedAt}`} className="rounded-xl border border-white/10 bg-gray-950/60 p-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>{update.fetchedAt.slice(0, 10)}</span>
                {update.uploadedAt ? <span>blob 저장 {update.uploadedAt.slice(0, 10)}</span> : null}
              </div>
              <div className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-300">
                {update.content}
              </div>
              {update.citations?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {update.citations.slice(0, 6).map((citation) => (
                    <a
                      key={citation}
                      href={citation}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-cyan-200 hover:border-cyan-300/40"
                    >
                      출처
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
