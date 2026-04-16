---
title: "수율 분석"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["수율 분석"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/metrology-yield/교안 3권.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["concept", "yield", "analysis"]
---
> 수율은 마지막 숫자지만, 실제로는 앞선 모든 공정과 데이터의 누적 결과다.

## What
- 수율 분석은 설계된 최대 칩 수 대비 정상 칩 비율이 왜 그렇게 나왔는지 원인을 좁혀 가는 활동이다.
- [source:hynix 지식 쌓기 5대 공정.pdf]의 관점대로라면 수율은 마지막 숫자이지만, 실제 분석은 계측·설비·소자 데이터를 거슬러 올라가는 역추적 과정이다.

## How
- defective loss와 parametric loss를 구분하고, 설비·계측·소자 데이터를 따라 upstream 원인을 추적한다.
- defective loss는 particle, pattern collapse, residue, defect clustering 같은 구조 문제를, parametric loss는 [[문턱전압]], leakage, speed bin 이탈 같은 전기 특성 문제를 더 많이 반영한다.
- Spotfire 강의가 보여 주듯, wafer map과 scatter plot, group-by trend를 함께 보면 단순 평균만으로는 안 보이는 로트/장비/레시피 기인성이 드러난다.

## Why
- 좋은 수율 분석은 단순 불량 집계가 아니라, 공정 변경이 어떤 경로로 양품률에 영향을 줬는지 보여 준다.
- 예를 들어 oxide thickness 증가가 leakage 개선으로만 읽히면 절반만 본 것이고, 동시에 Vt shift가 생겼다면 parametric yield는 오히려 나빠질 수 있다.

## Measure
- yield, defect pareto, parametric fail rate, lot별 trend, wafer map이 핵심이다.
- defect density, bin split, probe/e-test 결과, inline metrology correlation까지 붙이면 어느 단계에서 loss가 증폭됐는지 더 빨리 좁힐 수 있다.

## Connections
- [[SPC]]
- [[FDC]]
- [[데이터 시각화]]
- [[공정→계측→소자→수율 파이프라인]]
- [[데이터 기반 Fab]]
- [[계측에서 소자 특성으로]]

## Open Questions
- 교안 3권 원문 보강으로 defective/parametric 사례를 더 구체화할 필요가 있다.
- memory 제품군별 수율 해석 포인트 차이도 따로 정리할 수 있다.
