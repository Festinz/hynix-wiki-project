---
title: "Step Coverage"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["Step Coverage"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: high
tags: ["concept", "deposition", "profile"]
---
> step coverage는 막이 존재하는지보다, 원하는 위치까지 도달했는지를 묻는 지표다.

## What
- 단차 구조에서 상단 대비 측벽과 바닥 두께가 얼마나 유지되는지를 뜻한다.

## How
- PVD는 직진성 때문에 overhang이 생기기 쉽고, CVD/ALD는 상대적으로 더 높은 coverage를 얻는다.
- 특히 high aspect ratio 구조에서는 입구 쪽이 먼저 막히며 [[PVD Overhang]]과 poor bottom coverage가 동시에 나타날 수 있다.
- [source:hynix 지식 쌓기 5대 공정.pdf]가 CVD를 "우수한 step coverage의 균일 절연막"과 연결해 설명하는 것도, 실제로 step coverage가 단순 두께 문제가 아니라 공정 방식 선택의 핵심 기준임을 보여 준다.

## Why
- via와 trench 바닥까지 막이 충분히 형성되지 않으면 전기적 불량과 reliability 문제가 생긴다.

## Measure
- bottom coverage, sidewall coverage 비율을 계산한다.
- 단면 SEM/TEM, via/trench resistance, fill failure 여부까지 같이 봐야 전기적으로도 충분한 coverage인지 판단할 수 있다.

## Connections
- [[박막 증착]]
- [[Conformality]]
- [[PVD Overhang]]
- [[Reactive Sputtering]]
- [[PVD vs CVD vs ALD]]

## Open Questions
- 실제 contact/via resistance와 step coverage의 상관 사례를 추가할 수 있다.
