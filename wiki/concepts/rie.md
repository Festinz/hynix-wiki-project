---
title: "RIE"
type: concept
created: 2026-04-16
updated: 2026-04-16
aliases: ["Reactive Ion Etching", "Reactive Ion Etch"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["concept", "etch", "RIE", "anisotropy"]
---
> RIE는 건식 식각 중에서도 “방향성 있는 화학 식각”을 가능하게 만든 방식이다.

## What
- RIE는 플라즈마에서 생성한 반응성 이온과 라디칼을 함께 이용하는 대표적인 dry etch 방식이다.

## How
- 챔버를 고진공 상태로 만들고 반응 가스를 넣어 플라즈마를 형성한다.
- RF 전기장이 양이온을 웨이퍼 표면 쪽으로 수직 가속해 물리적 충돌을 만든다.
- 충돌로 약해진 표면에 라디칼이 화학적으로 반응하면서 식각이 진행된다.

## Why
- wet etch는 선택비는 좋지만 방향성이 약하고, 단순 dry etch만으로는 high aspect ratio 구조에서 원하는 profile을 만들기 어렵다.
- RIE는 방향성, 선택비, 미세 패턴 대응력을 동시에 확보하기 위한 절충 해법이다.

## Measure
- profile angle, etch rate, selectivity, micro-loading, charging damage를 본다.
- 실제 결과는 [[ACI CD]]와 defect inspection으로 확인된다.

## Connections
- [[식각]]
- [[Wet vs Dry vs RIE]]
- [[Aspect Ratio]]
- [[할로젠 식각 가스]]
- [[ACI CD]]
- [[계측]]

## Open Questions
- ICP-RIE, DRIE, ALE를 세대별로 묶은 확장 노트가 필요하다.
