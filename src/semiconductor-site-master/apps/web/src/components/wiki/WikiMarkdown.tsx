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
    <div className="prose prose-invert prose-headings:tracking-tight prose-a:text-cyan-300 prose-strong:text-white max-w-none prose-p:text-gray-300 prose-li:text-gray-300">
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
        }}
      >
        {renderWikiMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
