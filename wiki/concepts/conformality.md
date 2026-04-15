---
title: "Conformality"
type: concept
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: medium
tags: ["deposition", "geometry", "coverage"]
---

## What
- Conformality는 단차가 있는 구조의 옆벽과 바닥까지 막이 얼마나 균일하게 따라 들어가는지를 뜻한다.

## How
- 증착 입자의 진행 방향, 표면 반응 속도, 전구체의 확산 거동이 sidewall과 bottom의 막 두께 비를 결정한다.
- [[PVD-vs-CVD-vs-ALD]]에서 PVD는 line-of-sight 성격이 강해 conformality가 낮고, ALD는 표면 반응 기반이라 높은 conformality를 얻기 쉽다.

## Why
- 3D 구조가 깊어질수록 상부만 두껍고 하부가 비는 막은 저항, 누설, 단선 문제를 만든다.
- 그래서 미세화와 3D 적층이 진행될수록 "막을 넣을 수 있는가"보다 "깊은 구조 끝까지 균일하게 넣을 수 있는가"가 더 중요해졌다.

## Measure
- 단면 SEM/TEM으로 top, sidewall, bottom 두께를 비교한다.
- 공정 관점에서는 [[Step-Coverage]]와 함께 해석해야 실제 구조 충진 가능성을 판단할 수 있다.

## Connections
- [[Thin-Film-Deposition]]
- [[Step-Coverage]]
- [[PVD-vs-CVD-vs-ALD]]
- [[ALD-Window]]

## Open Questions
- ALD에서도 precursor purge 조건과 aspect ratio가 극단적으로 커질 때 conformality 한계가 어디서 시작되는지 더 정리할 필요가 있다.
