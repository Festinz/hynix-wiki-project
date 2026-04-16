"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { renderWikiMarkdown } from "@/lib/wiki";

interface WikiMarkdownProps {
  content: string;
}

export default function WikiMarkdown({ content }: WikiMarkdownProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:tracking-tight prose-headings:text-white prose-a:text-cyan-300 prose-strong:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-table:text-sm prose-th:border prose-th:border-white/10 prose-th:bg-white/5 prose-th:px-3 prose-th:py-2 prose-td:border prose-td:border-white/10 prose-td:px-3 prose-td:py-2 prose-code:text-cyan-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            if (!href) return <span>{children}</span>;
            if (href.startsWith("/wiki/")) {
              return (
                <Link href={href} className="text-cyan-300 hover:text-cyan-200 transition-colors">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                {children}
              </a>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-cyan-500/60 pl-4 italic text-gray-400">
                {children}
              </blockquote>
            );
          },
          code({ children }) {
            return (
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-sm text-cyan-200">
                {children}
              </code>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
                <table className="mb-0 min-w-full">{children}</table>
              </div>
            );
          },
        }}
      >
        {renderWikiMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
