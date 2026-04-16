---
title: "Sputtering DOE"
type: topic
created: 2026-04-16
updated: 2026-04-16
sources: ["raw/core/Reactive Sputtering  발표자료.pptx", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["topic", "DOE", "sputtering", "data"]
---
> 이 실험 노트는 공정 파라미터가 감으로가 아니라 데이터로 읽힌다는 것을 보여 준다.

## What
- reactive sputtering 발표자료에 나온 DOE 실험을 위키 관점에서 다시 정리한 노트다.

## How
- power 200/250/300 W, N2 flow 1/2/3 sccm 조건을 바꿔 thickness, sheet resistance, resistivity, non-uniformity를 비교한다.
- 측정은 [[Alpha-Step]]과 [[Four-Point Probe]]가 중심이다.
- full model과 reduced model, p-value와 R-square를 함께 읽어 어떤 변수가 실제로 지배적인지 판단한다.

## Why
- “전력이 커지면 무조건 좋다”, “질소를 늘리면 무조건 TiN에 가깝다” 같은 단순화는 실제 recipe 창을 설명하지 못한다.
- DOE는 target poisoning과 compound mode 전환이 언제 시작되는지 읽게 해 준다.

## Connections
- [[Reactive Sputtering]]
- [[Target Poisoning]]
- [[Sheet Resistance]]
- [[Four-Point Probe]]
- [[Alpha-Step]]
- [[Spotfire 상관관계 읽기]]

## Open Questions
- production chamber history와 target age를 포함한 확장 DOE가 필요하다.
