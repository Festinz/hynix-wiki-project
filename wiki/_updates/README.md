---
title: "최신 정보 저장 규칙"
type: topic
created: 2026-04-15
updated: 2026-04-15
aliases: ["최신 정보 저장 규칙"]
sources: ["CLAUDE.md"]
confidence: high
tags: ["updates", "perplexity", "automation"]
---

> 이 디렉터리는 Perplexity 기반 최신 정보 스냅샷을 날짜별 JSON으로 저장하는 자리다.

## What
- 각 위키 노드별 최신 뉴스, 논문, 업계 변화를 JSON으로 적재한다.

## How
- 수동 업데이트 버튼 또는 `/api/cron/wiki-updates`가 `wiki/_updates/<slug>/<YYYY-MM-DD>.json` 형태로 저장한다.

## Why
- 정적 위키 위에 동적인 업계 맥락을 덧붙여, 지식이 자라는 감각을 유지하기 위해서다.

## Measure
- 같은 slug에 대해 최신 7일 정보가 누적 저장되는지 확인한다.

## Connections
- [[위키 인덱스]]
- [[위키 로그]]

## Open Questions
- 향후에는 요약 텍스트를 마크다운 스냅샷으로도 함께 남길지 검토할 수 있다.

