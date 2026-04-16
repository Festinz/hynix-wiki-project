---
title: "PVD Overhang"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["PVD Overhang"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/Reactive Sputtering  발표자료.pptx", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["concept", "PVD", "profile"]
---
> PVD의 문제는 막이 안 올라가는 것이 아니라, 위쪽에 먼저 쌓여 아래로 못 들어가게 되는 데서 시작된다.

## What
- PVD Overhang은 고종횡비 구조에서 입구 상단에 막이 먼저 두꺼워지며 내부 채움이 어려워지는 현상이다.
- 결과적으로 shadowing, void, poor bottom coverage가 함께 나타날 수 있다.

## How
- PVD는 기본적으로 line-of-sight 성향이 강해, 입자가 측벽 깊숙이 돌아들어가기보다 상단 모서리에 먼저 부착되기 쉽다.
- 그 상태에서 입구가 더 좁아지면 후속 입자는 내부보다 상단에 더 잘 쌓이며 문제가 증폭된다.
- Reactive sputtering 실험 자료처럼 실제 막질이 TiN 같은 barrier/금속 계열일수록 PVD를 쓰고 싶어지는 경우가 많지만, 구조가 깊어질수록 이 직진성이 바로 integration 병목으로 돌아온다.

## Why
- 단차가 깊어질수록 단순 평균 두께보다 어디에 두께가 몰리는지가 더 중요해지기 때문이다.
- 그래서 3D 구조에서는 같은 막질이라도 PVD 대신 CVD/ALD가 유리한 경우가 많고, PVD를 쓰더라도 구조와 recipe를 같이 조정해야 한다.

## Measure
- top/bottom thickness ratio, sidewall profile, void 발생 여부, contact resistance를 본다.
- 단면 SEM으로 mouth closure가 나타나는지 확인하는 것이 가장 직관적이다.

## Connections
- [[박막 증착]]
- [[Reactive Sputtering]]
- [[Step Coverage]]
- [[Conformality]]
- [[PVD vs CVD vs ALD]]
- [[공정 통합 맵]]

## Open Questions
- ionized PVD나 collimated sputtering이 overhang 문제를 얼마나 완화하는지 후속 보강이 가능하다.
