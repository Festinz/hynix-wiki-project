---
title: "공정→계측→소자→수율 파이프라인"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["공정→계측→소자→수율 파이프라인"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/metrology-yield/교안 1권.pdf", "raw/metrology-yield/교안 2권.pdf", "raw/metrology-yield/교안 3권.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["concept", "pipeline", "causality"]
---
> 이 파이프라인을 이해하면 “공정을 바꾸면 왜 수율이 움직이는가”가 한 번에 보인다.

## What
- 공정 조건이 계측 수치로 바뀌고, 그 계측 결과가 소자 특성으로 번역되고, 최종적으로 수율로 드러나는 인과 체인을 정리한 노트다.

## How
- gate CD 변화는 [[ADI CD]]와 [[ACI CD]]에서 먼저 보이고, 이후 [[문턱전압]]과 drive current 차이로 나타나며 최종적으로 parametric yield를 흔든다.
- pressure, gas flow, RF power 같은 [[FDC]] 신호는 막 두께나 식각 형상을 바꾸고, 그 결과가 [[DIBL]], [[Subthreshold Slope]], leakage 같은 electrical signature로 이어진다.
- [source:[Lecture] Spotfire.pdf]의 예시처럼 oxide thickness 증가는 leakage를 줄일 수 있지만 동시에 Vt를 느리게 만들 수도 있어, 한 지표 개선이 전체 최적을 뜻하지는 않는다.

## Why
- 사용자가 원하는 것은 조각난 지식이 아니라 연결된 체계이기 때문이다.
- 같은 수율 저하라도 원인이 포토 alignment인지, 식각 bias인지, 증착 두께인지, 소자 변동성인지 구분하려면 이 체인이 필요하다.

## Measure
- CD, overlay, thickness, defect -> Vth, SS, DIBL, leakage -> yield를 순서대로 본다.
- wafer map, SPC chart, lot trend, electrical distribution을 함께 봐야 chain의 어느 지점에서 이상이 시작됐는지 보인다.

## Connections
- [[5대 공정]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]
- [[계측에서 소자 특성으로]]
- [[데이터 기반 Fab]]

## Open Questions
- defective yield와 parametric yield를 더 세분화한 후속 노트가 필요하다.
