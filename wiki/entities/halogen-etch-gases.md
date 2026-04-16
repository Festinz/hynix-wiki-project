---
title: "할로젠 식각 가스"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["할로젠 식각 가스"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf", "https://sshmyb.tistory.com/203"]
confidence: high
tags: ["entity", "etch", "gas"]
---
> 할로젠 계열이 중요한 이유는 반응성이 강해서가 아니라, 반응 후 휘발성 부산물을 만들기 쉽기 때문이다.

## What
- Cl2, HBr, CF4, CHF3 같은 할로젠 계열 가스는 dry etch에서 주력 반응종을 제공한다.
- 핵심 후보는 F 계열, Cl 계열, Br 계열이며, 각 계열은 재료 선택비와 profile 형성 방식이 다르다.

## How
- 표면과 반응해 SiCl4, SiF4 같은 휘발성 생성물을 만들고, 이온 충돌과 결합해 anisotropic etch를 구현한다.
- F 계열은 SiO2와 강하게 반응하고, Cl 계열은 poly-Si나 금속과의 반응성이 좋으며, Br 계열은 측벽 보호 성향이 커 profile 제어에 유리하다.

## Why
- 반응성, 재료별 선택성, 휘발성 부산물 형성이라는 세 조건을 동시에 만족시키기 쉬워서 널리 쓰인다.
- 단순히 전기음성도가 높아서가 아니라, 반응 후 만들어지는 부산물이 휘발성이어야 표면에서 떨어져 나가며 etch가 계속 진행된다.
- 예를 들어 SiF4는 끓는점이 매우 낮고, SiCl4도 공정 조건에서 비교적 쉽게 배출된다. 부산물이 고체로 남으면 표면을 막아 식각이 멈추거나 residue가 된다.
- F 계열(CF4, SF6)은 oxide etch에 유리하고, Cl 계열(Cl2, BCl3)은 poly-Si/metal etch에 유리하며, Br 계열(HBr)은 측벽 passivation이 남아 anisotropic profile 확보에 좋다.
- 결국 선택 기준은 높은 반응성 x 휘발성 부산물 x 재료별 선택비 x 이방성 확보를 동시에 만족하느냐이다.

## Measure
- etch rate, residue, selectivity, sidewall polymer 형성을 함께 본다.

## Connections
- [[식각]]
- [[선택비]]
- [[습식 식각 vs 건식 식각]]
- [[ACI CD]]
- [[Reactive Sputtering]]

## Open Questions
- material별 최적 가스 조합과 sidewall passivation 메커니즘을 더 세분화할 수 있다.
