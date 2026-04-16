import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "SK하이닉스 LLM Wiki",
  description: "11개 raw 소스와 Obsidian 메모를 연결한 SK하이닉스 중심 반도체 지식 위키",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen selection:bg-cyan-300/20 selection:text-white">{children}</body>
    </html>
  );
}
