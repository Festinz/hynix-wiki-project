---
title: "Spotfire 상관관계 읽기"
type: topic
created: 2026-04-16
updated: 2026-04-16
sources: ["raw/spotfire/[Lecture] Spotfire.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_3주차_ 반도체 산업 데이터의 중요성.pdf"]
confidence: high
tags: ["topic", "spotfire", "correlation", "data"]
---
> 좋은 시각화는 예쁘게 보여 주는 것이 아니라, 원인과 결과를 구분하게 만든다.

## What
- Spotfire 강의와 3주차 자료를 바탕으로, 반도체 데이터에서 상관관계를 어떻게 읽어야 하는지 정리한 노트다.

## How
- scatter plot, group comparison, wafer map을 같이 보며 평균값 착시를 피한다.
- gate CD, oxide thickness, leakage, Vth를 한 화면에 놓으면 “좋아진 것처럼 보이는 결과가 다른 지표 희생인지”를 읽기 쉬워진다.
- Anscombe’s quartet, Simpson’s paradox 같은 함정은 반도체 데이터 해석에서도 그대로 중요하다.

## Why
- 공정 엔지니어는 상관을 원인으로 착각하면 잘못된 recipe 결정을 내릴 수 있다.
- 그래서 시각화는 보고서가 아니라 의사결정 도구다.

## Connections
- [[데이터 시각화]]
- [[데이터 기반 Fab]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- 실제 wafer map 예시를 더 축적해 pattern density와 fail mode 연결을 시각화할 수 있다.
