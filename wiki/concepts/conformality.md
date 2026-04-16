---
title: "Conformality"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["Conformality"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/Reactive Sputtering  발표자료.pptx"]
confidence: medium
tags: ["concept", "deposition", "geometry"]
---
> 3D 구조 시대의 증착에서는 막을 쌓는 것보다 끝까지 따라가게 만드는 것이 더 어렵다.

## What
- 단차 구조의 sidewall과 bottom까지 막이 얼마나 균일하게 형성되는지를 뜻한다.
- top만 두꺼운지, sidewall이 비는지, bottom이 굶는지를 함께 보는 3D 증착 품질 개념이다.

## How
- 입자 진행 방향, precursor 확산, 표면 반응 메커니즘이 conformality를 결정한다.
- [source:Reactive Sputtering 발표자료.pptx]와 [[PVD Overhang]] 노트가 보여 주듯, line-of-sight가 강한 PVD는 입구가 먼저 막히기 쉽고, CVD/ALD는 확산과 표면 반응 덕분에 더 유리하다.
- 따라서 동일 막질이라도 공정 방식 선택이 conformality를 좌우한다.

## Why
- 깊은 구조에서 막이 위쪽만 두꺼우면 void, 저항 증가, reliability 문제가 생기기 때문이다.
- 메모리 적층 구조와 HAR 패턴에서는 이 문제가 단순 외형 불량이 아니라 open, contact 저항 증가, fill failure로 번진다.

## Measure
- 단면 SEM/TEM으로 top, sidewall, bottom thickness 비를 확인한다.
- 흔히 bottom/top ratio, sidewall/top ratio로 수치화하고, 구조 깊이가 커질수록 그 값이 어떻게 무너지는지도 함께 본다.

## Connections
- [[박막 증착]]
- [[Step Coverage]]
- [[PVD vs CVD vs ALD]]
- [[ALD Window]]

## Open Questions
- high aspect ratio 구조에서 precursor starvation을 더 정리할 수 있다.
