---
title: "아르곤"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["아르곤"]
sources: ["raw/core/Reactive Sputtering  발표자료.pptx", "raw/core/반도체 정리.pdf", "https://sshmyb.tistory.com/category/%EB%B0%98%EB%8F%84%EC%B2%B4%EC%82%AC%EA%B4%80%ED%95%99%EA%B5%90%20%ED%9B%88%EB%A0%A8%EA%B3%BC%EC%A0%95/%EB%B0%98%EB%8F%84%EC%B2%B4%20%EC%A0%84%EA%B3%B5%EC%A0%95"]
confidence: high
tags: ["entity", "gas", "sputtering"]
---
> Ar를 쓰는 이유는 비활성이라서만이 아니라, 무게와 경제성, 플라즈마 유지가 모두 균형이 맞기 때문이다.

## What
- Ar은 비활성 기체로, sputtering과 plasma ignition에서 가장 흔히 쓰이는 working gas다.
- reactive sputtering에서는 화학 반응을 일으키는 가스가 아니라, 타깃을 때릴 운동량을 전달하는 기반 가스다.
- 후보군은 같은 18족인 He, Ne, Ar, Kr, Xe 같은 비활성 기체들이다.

## How
- 플라즈마에서 Ar+ 이온이 타깃을 때려 원자를 튀겨내고, reactive sputtering에서는 기본 충돌 에너지원 역할을 한다.
- N2나 O2 같은 reactive gas가 조성을 바꾸더라도, 실제 sputter yield를 좌우하는 충돌원은 대개 Ar 플라즈마다.
- 이때 너무 가벼운 기체는 운동량 전달이 약하고, 너무 무거운 기체는 비용과 운용성이 부담이 된다.

## Why
- He나 Ne보다 무거워 운동량 전달이 효율적이고, 반응성이 낮아 공정 화학을 과도하게 방해하지 않으며, 비용도 적절하다.
- Kr, Xe처럼 더 무거운 가스도 가능하지만 공정 비용과 운용성이 떨어져, Ar이 비활성+질량+경제성의 균형점이 된다.
- He(4amu), Ne(20amu)는 플라즈마를 만들 수는 있지만 타깃 원자에 주는 운동량이 약해 sputter yield가 낮기 쉽다.
- Kr(84amu), Xe(131amu)는 운동량 전달은 유리하지만 가스 단가와 공급성, 설비 운용 비용까지 같이 올라간다.
- Ar(40amu)는 비활성이고, 질량이 충분해 Si/금속 타깃에 충돌 효율이 좋고, 이온화 에너지(15.76eV)와 경제성도 실무적으로 균형이 좋다.
- 즉 선택 기준은 '비활성이라서' 하나가 아니라, 비활성 x 적절한 질량 x 플라즈마 유지 용이성 x 경제성의 교차점이다.

## Measure
- 플라즈마 안정성, deposition rate, target sputter yield, chamber pressure 변화를 함께 본다.
- 같은 power라도 working gas 조건이 달라지면 plasma ignition 안정성과 막질, 비저항이 함께 흔들릴 수 있다.

## Connections
- [[Reactive Sputtering]]
- [[Target Poisoning]]
- [[PVD Overhang]]
- [[PVD vs CVD vs ALD]]
- [[박막 증착]]

## Open Questions
- Kr, Xe를 쓰는 특수 공정에서 운동량·비용 trade-off를 더 비교할 수 있다.
