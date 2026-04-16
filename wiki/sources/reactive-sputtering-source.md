---
title: "소스 요약 - Reactive Sputtering 발표자료"
type: source
created: 2026-04-15
updated: 2026-04-16
aliases: ["소스 요약 - Reactive Sputtering 발표자료"]
sources: ["raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: high
tags: ["source", "phase1", "PVD", "sputtering"]
---
> 이 발표자료는 증착 원리를 설명하는 데서 멈추지 않고, 공정 조건이 실제 데이터로 어떻게 움직이는지까지 보여 준다.

## What
- PVD 기반 sputtering 메커니즘과 reactive gas를 넣었을 때의 조성 변화, 그리고 DOE 실험 결과를 함께 담은 소스다.
- power intensity와 N2 flow를 바꾸며 thickness, sheet resistance, resistivity, non-uniformity를 비교한 데이터가 핵심이다.
- TiN을 barrier material 예시로 설명하고, reactive sputtering에서 [[Target Poisoning]]이 왜 문제인지도 함께 다룬다.

## How
- 이 소스를 바탕으로 [[Reactive Sputtering]], [[Target Poisoning]], [[아르곤]], [[PVD vs CVD vs ALD]], [[Sputtering DOE]]를 확장했다.
- 공정 순서는 loadlock 준비 -> pre-sputtering -> Ar plasma 점화 -> N2 주입 -> 증착 -> alpha-step / 4-point probe 측정 흐름으로 정리된다.
- 발표자료에 나온 DOE는 N2 flow 1/2/3 sccm, power 200/250/300 W 조건을 바탕으로 한다.

## Why
- reactive sputtering은 단순히 “막을 올리는 방법”이 아니라, 조성과 저항을 동시에 맞춰야 하는 공정이라는 점이 드러난다.
- power를 올리면 sputtering rate가 올라 thickness가 증가하고 저항이 변하고, N2 flow를 바꾸면 Ti 금속상과 화합물상 비율이 달라져 전기 특성이 바뀐다.
- 즉 이 소스의 가치는 원리 설명보다도 “공정 파라미터가 실제 데이터로 어떻게 읽히는가”를 보여 준다는 데 있다.

## Measure
- 두께는 [[Alpha-Step]], 전기 저항은 [[Four-Point Probe]], 공정 균일성은 non-uniformity로 평가한다.
- 발표자료는 thickness, sheet resistance, resistivity를 reduced/full model로 비교하고 p-value, R-square로 설명해 [[데이터 시각화]]와 [[Spotfire 상관관계 읽기]] 쪽으로도 연결된다.

## Connections
- [[Reactive Sputtering]]
- [[Target Poisoning]]
- [[아르곤]]
- [[Barrier Metal]]
- [[Sheet Resistance]]
- [[Four-Point Probe]]
- [[Alpha-Step]]
- [[Sputtering DOE]]

## Open Questions
- 실제 양산 조건에서 target material과 chamber history가 DOE 결과에 어떤 추가 편차를 주는지는 후속 보강이 필요하다.
