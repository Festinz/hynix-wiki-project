---
title: "공정 통합 맵"
type: topic
created: 2026-04-15
updated: 2026-04-15
aliases: ["공정 통합 맵"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/HKMG.docx", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["topic", "integration", "map"]
---
> 좋은 integration 감각은 '이 공정이 좋다'가 아니라 '이 공정이 다음 공정에 무엇을 남기는가'를 보는 데서 나온다.

## What
- 공정 간 선후행 제약과 trade-off를 지도처럼 정리한 노트다.
- 앞 공정이 남긴 형상·재료·열 이력이 다음 공정의 선택지를 어떻게 제한하는지를 보여 주는 노트이기도 하다.

## How
- 포토 profile이 식각 bias를 만들고, 식각 형상이 증착 coverage를 좌우하며, 증착 결과가 CMP 난이도와 전기 특성으로 이어진다.
- [source:반도체 정리.pdf]가 지적하듯 wet etch의 undercut, PVD의 overhang, ALD window, 저온 공정 필요성은 모두 integration 문제다.
- 예를 들어 high-k 막을 넣고 싶어도 이후 열 budget이 크면 계면과 도핑 프로파일이 흔들릴 수 있고, BEOL에서는 Cu와 low-k 때문에 고온 선택지가 제한된다.

## Why
- 공정을 따로 최적화하면 국부 최적에 빠지기 쉽고, integration 관점이 있어야 전체 수율 최적화가 가능하기 때문이다.
- 따라서 "왜 지금 이 방식인가"라는 질문은 항상 개별 공정 원리보다 앞뒤 제약 조건과 함께 읽어야 정확해진다.

## Measure
- 각 스텝의 로컬 KPI보다 chain 전체의 전기 특성과 수율 개선으로 판단해야 한다.
- 개별 공정 optimum이 전체 optimum과 다를 수 있으므로, 최종 판단은 electrical/yield translation까지 포함해야 한다.

## Connections
- [[5대 공정]]
- [[포토리소그래피]]
- [[식각]]
- [[박막 증착]]
- [[CMP와 세정]]
- [[High-K Metal Gate]]

## Open Questions
- BEOL과 패키징 제약까지 포함한 확장 integration map을 만들 수 있다.
