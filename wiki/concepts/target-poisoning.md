---
title: "Target-Poisoning"
type: concept
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: high
tags: ["reactive-sputtering", "plasma", "process-control"]
---

## What
- Target-Poisoning은 reactive sputtering에서 target 표면이 금속 상태가 아니라 화합물층으로 덮이는 현상이다.

## How
- O2나 N2 유량이 늘어나면 타깃 표면에서도 산화물/질화물이 형성되고 sputter yield가 급격히 바뀐다.
- 이 전환점 부근에서 증착 속도, 조성, 플라즈마 임피던스가 비선형으로 움직여 공정이 매우 민감해진다.

## Why
- 원하는 조성의 TiN, TaN, 산화막을 얻으려면 reactive gas가 필요하지만, 과도하면 target이 compound mode로 넘어가 생산성이 급락한다.
- 결국 reactive sputtering의 핵심은 "반응은 충분히 일으키되 poisoning은 제어하는 것"이다.

## Measure
- deposition rate, chamber pressure, 전압/전류, 광방출(OES), sheet resistance 변화를 함께 본다.
- 발표자료의 실험 데이터처럼 gas flow sweep과 hysteresis 관찰이 대표적이다.

## Connections
- [[Reactive-Sputtering]]
- [[Argon]]
- [[Thin-Film-Deposition]]
- [[Reactive-Sputtering-Source]]

## Open Questions
- 현재 자료 기준으로는 closed-loop 제어에서 어떤 센서 조합이 poisoning 안정화에 가장 유효한지 더 조사할 필요가 있다.
