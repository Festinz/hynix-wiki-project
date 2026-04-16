---
title: "계측에서 소자 특성으로"
type: topic
created: 2026-04-15
updated: 2026-04-15
aliases: ["계측에서 소자 특성으로"]
sources: ["raw/metrology-yield/교안 1권.pdf", "raw/metrology-yield/교안 2권.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["topic", "linkage", "causality"]
---
> 좋은 계측 해석은 숫자를 읽는 것이 아니라, 그 숫자가 소자 물리에서 무엇으로 바뀌는지 읽는 일이다.

## What
- inline metrology와 electrical characterization 사이의 인과 관계를 정리한 노트다.
- 포토·식각·증착 단계에서 보이는 형상/두께 수치가 왜 [[문턱전압]], 전류, leakage, speed로 바뀌는지를 번역하는 중간 다리다.

## How
- 예를 들어 gate CD와 overlay는 effective channel length, overlap capacitance, leakage로 이어진다.
- [source:[Lecture] Spotfire.pdf]의 표현을 가져오면, gate CD가 커질수록 effective channel length가 늘어나 channel resistance는 증가하고 overlap capacitance는 줄어든다.
- 같은 강의의 또 다른 예시처럼 oxide thickness 증가는 leakage 감소로 이어질 수 있지만, 동시에 Vt slow 경향을 만들 수 있어 한 지표 개선이 다른 지표 저하로 이어지기도 한다.
- 따라서 metrology 해석은 "숫자가 맞다/틀리다"보다 "이 숫자가 소자 물리에서 무엇으로 번역되는가"에 초점을 둬야 한다.

## Why
- 이 연결을 이해해야 공정 엔지니어가 계측 값을 보고 소자 위험을 미리 예측할 수 있다.
- ADI/ACI/overlay가 왜 중요한지 체감되는 순간도, 결국 그것이 전기 특성과 수율에 어떤 비용으로 돌아오는지 볼 때다.

## Measure
- CD shift, thickness shift, overlay error와 Vth/Idsat/SS/DIBL 변화의 상관을 본다.
- wafer site별 분포를 함께 보면 전역적 레시피 문제인지, 특정 위치/장비 조건 문제인지까지 구분할 수 있다.

## Connections
- [[계측]]
- [[소자 특성 분석]]
- [[문턱전압]]
- [[DIBL]]
- [[공정→계측→소자→수율 파이프라인]]

## Open Questions
- 각 계측 항목별 민감도 매트릭스를 후속으로 추가할 수 있다.
