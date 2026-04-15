---
title: "Step-Coverage"
type: concept
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: high
tags: ["deposition", "profile", "geometry"]
---

## What
- Step-Coverage는 단차 구조의 상단, 측벽, 바닥에 형성된 막 두께 비율을 뜻한다.

## How
- 입사 각도가 제한된 증착일수록 상단 모서리에서 shadowing이 생기고 바닥 두께가 줄어든다.
- 이 때문에 PVD에서는 overhang과 void가 생기기 쉽고, CVD/ALD는 상대적으로 더 균일한 coverage를 제공한다.

## Why
- 컨택 홀, 비아, 트렌치 바닥까지 막이 도달하지 못하면 저항 증가, 단선, barrier 실패로 이어진다.
- 그래서 미세화 이후에는 단순 증착 속도보다 [[Conformality]]와 step coverage가 핵심 공정 선택 기준이 되었다.

## Measure
- 단면 SEM/TEM으로 top/bottom thickness ratio를 계산한다.
- 전기적 관점에서는 via resistance 분포나 chain resistance로 간접 확인할 수 있다.

## Connections
- [[Thin-Film-Deposition]]
- [[Conformality]]
- [[Reactive-Sputtering]]
- [[PVD-vs-CVD-vs-ALD]]

## Open Questions
- 구조별 aspect ratio가 step coverage 임계점을 어떻게 바꾸는지 HKMG와 배선 공정 사례를 더 보강할 필요가 있다.
