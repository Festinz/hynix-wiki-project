---
title: "Barrier Metal"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["Barrier Metal"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/Reactive Sputtering  발표자료.pptx", "https://news.skhynix.co.kr/chemical-film-growth/"]
confidence: medium
tags: ["entity", "thin-film", "TiN"]
---
> barrier metal의 선택은 전도성만 좋으면 되는 문제가 아니라, 확산 방지와 계면 접착, 공정 호환성을 동시에 맞추는 문제다.

## What
- barrier metal은 금속 배선이나 전극 재료가 주변 절연막이나 Si로 과도하게 확산하는 것을 막는 얇은 금속막이다.
- 대표 후보로 TiN, TaN, WN 등이 있지만 위키에서는 특히 TiN을 중심으로 읽는다.
- [source:Reactive Sputtering 발표자료.pptx]는 TiN을 "화학적으로 분리하면서도 전기적 연결은 유지하는 barrier material"로 직접 소개한다.

## How
- barrier metal은 얇고 치밀한 막으로 계면을 덮어 확산 경로를 차단하고, 동시에 위아래 층 사이의 접착력과 전기적 연결을 유지한다.
- TiN은 전도성이 있고 화학적 안정성이 높으며 PVD/CVD/ALD로 모두 접근 가능해 integration 선택지가 넓다.
- 발표자료의 TiN 예시는 높은 열적/화학적 안정성, 낮은 비저항, 높은 녹는점을 함께 제시해 왜 barrier 후보 중 TiN이 자주 등장하는지 보여 준다.

## Why
- 후보군 중 Ti는 접착은 좋지만 단독으로는 확산 방지막 성능이 부족하고, TaN은 우수하지만 공정과 저항 trade-off가 더 민감할 수 있다.
- TiN은 전도성 x 확산 방지 x 접착성 x 열안정성 x 공정 호환성의 균형이 좋아 barrier metal의 대표 선택지로 자리 잡았다.
- [source:SK하이닉스 뉴스룸] TiN은 일반 배선 barrier뿐 아니라 HKMG 계열에서는 work function 조절과 전극 스택의 일부 역할까지 겸할 수 있어 더욱 자주 등장한다.

## Measure
- sheet resistance, diffusion blocking 성능, 접착력, 열처리 후 계면 안정성을 함께 본다.
- 실제 양산에서는 막 두께를 줄여도 barrier 성능이 유지되는지가 핵심이다.

## Connections
- [[박막 증착]]
- [[Reactive Sputtering]]
- [[High-K Metal Gate]]
- [[금속 게이트]]

## Open Questions
- Cu 배선용 barrier와 HKMG용 TiN의 요구 특성을 더 분리해서 정리할 수 있다.
