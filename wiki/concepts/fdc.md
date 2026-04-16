---
title: "FDC"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["FDC"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["concept", "data", "equipment"]
---
> FDC는 결과가 나빠진 뒤 왜 그랬는지 묻는 것이 아니라, 나빠지기 전에 설비가 이상 신호를 보내는지 보는 체계다.

## What
- FDC는 Fault Detection and Classification의 약자로, 설비 센서 데이터 기반 이상 감지 체계다.
- [source:hynix 지식 쌓기 5대 공정.pdf]에서는 pressure, temperature, gas flow, RF power, rotation speed, valve position 같은 설비 센서 값 전반을 FDC 파라미터로 본다.

## How
- pressure, temperature, gas flow, RF power, valve position 같은 실시간 파라미터를 정상 패턴과 비교한다.
- rule 기반 alarm뿐 아니라 waveform deviation, multi-sensor correlation 같은 이상 징후를 조기에 잡는 방식으로 운용된다.
- 포인트는 계측 결과가 나오기 전에도 설비가 뱉는 파형만으로 "정상 run과 다른 run"을 먼저 골라낼 수 있다는 점이다.

## Why
- 결과 계측만으로는 늦을 수 있으므로, upstream 설비 상태에서 이상을 먼저 잡기 위해 필요하다.
- 즉 SPC가 결과를 보고 판단한다면, FDC는 결과가 나빠지기 전 설비 쪽 신호를 먼저 읽는다는 점에서 별개 가치가 있다.
- 장비 이상을 조기에 차단하면 불량 lot 확산을 막고, 원인 센서까지 좁혀 재현 실험과 유지보수도 훨씬 빨라진다.

## Measure
- sensor trend, waveform deviation, abnormal event classification, alarm hit rate를 본다.
- 추가로 false alarm 비율, 이상 징후 탐지 lead time, 실제 yield loss와의 연동률도 유의미하다.

## Connections
- [[SPC와 FDC 비교]]
- [[SPC]]
- [[데이터 기반 Fab]]
- [[수율 분석]]
- [[계측]]

## Open Questions
- 예지보전 모델과 FDC 규칙 기반 시스템의 역할 분담을 더 정리할 수 있다.
