---
title: "데이터 기반 Fab"
type: topic
created: 2026-04-15
updated: 2026-04-16
aliases: ["데이터 기반 Fab"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[Lecture] Spotfire.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_3주차_ 반도체 산업 데이터의 중요성.pdf"]
confidence: high
tags: ["topic", "data", "fab"]
---
> Fab는 장비의 집합이 아니라, 데이터로 학습하는 시스템에 가깝다.

## What
- 데이터 기반 Fab는 설비 센서, 계측, 소자, 수율 데이터를 통합해 공정을 운영하는 관점이다.
- [source:hynix 지식 쌓기 5대 공정.pdf]가 제시한 네 축, 즉 계측·설비(FDC)·소자·수율 데이터가 따로가 아니라 한 시스템으로 돌아가는 상태를 뜻한다.

## How
- SPC와 FDC, 시각화, correlation 분석을 통해 원인을 좁히고 recipe 최적화를 반복한다.
- [source:[Lecture] Spotfire.pdf]가 보여 주듯, scatter plot과 group comparison이 없으면 평균값만 보고 잘못된 결론에 도달할 수 있다.
- 예를 들어 gate CD, oxide thickness, leakage, Vth를 한 화면에서 보면 “누설 개선이 진짜 개선인지, 다른 spec 희생인지”를 함께 판단할 수 있다.

## Why
- 미세화 이후에는 변수 수가 너무 많아 경험만으로는 공정 상태를 안정적으로 유지하기 어렵기 때문이다.
- 결국 데이터 기반 Fab의 핵심은 데이터를 많이 모으는 것이 아니라, upstream 신호와 downstream 결과를 연결해 설명 가능한 개선 루프를 만드는 데 있다.

## Measure
- cycle time, yield, abnormal detection lead time, process drift reduction을 본다.
- 여기에 원인 분석 속도, 실험 회수 감소, 재발 방지율 같은 운영 지표도 같이 본다.

## Connections
- [[데이터 시각화]]
- [[SPC]]
- [[FDC]]
- [[수율 분석]]
- [[Spotfire 상관관계 읽기]]

## Open Questions
- 향후 AI 기반 root cause analysis 노트를 별도 토픽으로 만들 수 있다.
