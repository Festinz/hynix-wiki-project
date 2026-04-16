---
title: "Reactive Sputtering"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["Reactive Sputtering"]
sources: ["raw/core/Reactive Sputtering  발표자료.pptx", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["concept", "PVD", "sputtering"]
---
> reactive sputtering의 본질은 타깃을 때려 막을 올리는 것보다, 금속 모드와 화합물 모드 사이의 민감한 공정창을 다루는 데 있다.

## What
- sputtering 공정에 N2, O2 같은 reactive gas를 더해 질화막·산화막 같은 화합물 박막을 형성하는 방식이다.
- 발표자료의 실습 예시는 Ti 타깃과 N2를 이용해 TiN 막을 형성하는 경우이며, TiN을 barrier material로 쓰는 맥락과 직접 연결된다.

## How
- Ar 플라즈마가 타깃을 때려 원자를 방출하고, reactive gas가 표면이나 타깃과 반응해 원하는 막 조성을 만든다.
- 실무 흐름으로는 loadlock 준비 → Ar 점화 → pre-sputtering → reactive gas 투입 → deposition 순으로 안정화 단계가 중요하다.
- power를 높이면 플라즈마 밀도와 sputtering rate가 증가해 두께 증가·면저항 감소 쪽으로 움직이고, N2 유량이 증가하면 평균 자유행로 감소와 Ti 산란 증가로 유효 Ti 플럭스가 줄어 막 두께가 줄어드는 경향을 보였다.
- 실험 데이터는 thickness, sheet resistance, resistivity를 각각 별도 모델로 읽었고, 일부 지표는 full model이 reduced model보다 설명력이 높았다.

## Why
- 금속 타깃 하나로도 공정 내에서 조성을 조절한 화합물 박막을 만들 수 있기 때문이다.
- 하지만 reactive gas가 많아지면 [[Target Poisoning]]과 비선형 거동이 나타난다.

## Measure
- thickness, sheet resistance, uniformity, hysteresis, deposition rate를 본다.
- 특히 N2 flow와 power 변화에 따른 비저항, 막 두께, 면저항 오차를 같이 봐야 recipe 최적점을 찾을 수 있다.
- 발표자료에서는 alpha-step으로 두께, 4-point probe로 면저항을 측정했고, 검증 실험에서 resistivity 오차는 작지만 sheet resistance 오차는 상대적으로 크게 나타나 실제 공정에서 어떤 지표가 더 민감한지도 보여 준다.

## Connections
- [[Target Poisoning]]
- [[아르곤]]
- [[PVD Overhang]]
- [[PVD vs CVD vs ALD]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- 실험의 N2 flow와 power map을 위키 그래프와 연결해 시각화할 수 있다.
- 제안 recipe로 적힌 300W / 1 sccm 근처 조건이 실제로 barrier 품질과 수율까지 개선하는지는 추가 검증이 필요하다.
