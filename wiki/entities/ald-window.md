---
title: "ALD Window"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["ALD Window"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf", "https://news.skhynix.co.kr/"]
confidence: high
tags: ["entity", "ALD", "process-window"]
---
> ALD는 아무 온도에서나 잘 되는 공정이 아니라, ALD답게 동작하는 좁은 창을 갖는다.

## What
- ALD precursor와 반응물이 condensation도 decomposition도 없이 self-limiting하게 반응하는 온도 범위다.
- 동시에 precursor 조합이 표면에 순차 흡착과 purge를 안정적으로 수행할 수 있는 공정 창을 뜻하기도 한다.

## How
- 너무 낮으면 반응성이 부족하거나 응축이 일어나고, 너무 높으면 탈착이나 열분해가 일어난다.
- precursor A와 reactant B가 서로 기상 반응해 버리거나, 표면에 남아야 할 흡착종이 purge 전에 날아가면 self-limiting이 깨진다.
- 즉 좋은 precursor 조합은 휘발성, 표면 반응성, ligand 제거 용이성, 부산물 배출성까지 함께 맞아야 한다.

## Why
- 이 창을 벗어나면 ALD의 장점인 두께 제어와 균일성이 무너진다.
- 특히 high-k 같은 민감한 막질에서는 window 밖 조건이 곧 조성 불안정, 불순물 증가, 누설 특성 악화로 이어질 수 있다.
- 결국 ALD는 "온도만 맞으면 된다"가 아니라, precursor 조합과 purge 조건까지 포함해 self-limiting을 유지하는 narrow process window를 다루는 공정이다.

## Measure
- cycle당 성장량(GPC), 조성, 불순물, 균일도 변화를 온도별로 본다.
- GPC가 plateau를 이루는지, impurity가 줄어드는지, surface saturation이 유지되는지를 함께 봐야 진짜 ALD Window로 판단할 수 있다.

## Connections
- [[박막 증착]]
- [[PVD vs CVD vs ALD]]
- [[High-k 유전체]]
- [[Conformality]]
- [[저온 공정]]

## Open Questions
- 실제 HfO2 공정에서 precursor 종류별 ALD window 차이를 별도 정리할 수 있다.
