---
title: "SPC와 FDC 비교"
type: comparison
created: 2026-04-15
updated: 2026-04-15
aliases: ["SPC와 FDC 비교"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[Lecture] Spotfire.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["comparison", "data", "yield"]
---
> SPC와 FDC는 둘 중 하나를 고르는 관계가 아니라, 결과를 보는 눈과 원인을 보는 눈이라는 점에서 서로 보완적이다.

## What
- SPC는 계측 결과와 통계 분포를 바탕으로 공정 상태를 관리하는 체계다.
- FDC는 설비 센서와 recipe 파라미터를 실시간으로 읽어 이상 징후를 감지하는 체계다.

## How
- SPC는 control chart와 Cpk 등으로 결과 변동을 본다.
- FDC는 pressure, gas flow, RF power, temperature 같은 실시간 센서값의 정상 패턴 이탈을 잡는다.

## Why
- SPC만 있으면 이미 나빠진 결과를 뒤늦게 발견할 수 있고, FDC만 있으면 결과 품질이 실제로 사양에 들어오는지 놓칠 수 있다.
- 그래서 두 체계는 결과 기반 관리와 원인 기반 감지를 나눠 맡는다.

## Measure
- SPC 지표는 UCL/LCL, Cpk, trend, run rule이다.
- FDC 지표는 센서 waveform, chamber parameter drift, abnormal event classification이다.

## Connections
- [[SPC]]
- [[FDC]]
- [[계측]]
- [[수율 분석]]
- [[데이터 기반 Fab]]

## Open Questions
- 향후에는 SPC와 FDC를 AI 기반 예지보전 관점에서 어떻게 통합하는지 정리할 필요가 있다.
