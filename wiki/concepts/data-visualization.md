---
title: "데이터 시각화"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["데이터 시각화"]
sources: ["raw/spotfire/[Lecture] Spotfire.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_3주차_ 반도체 산업 데이터의 중요성.pdf"]
confidence: high
tags: ["concept", "data", "spotfire"]
---
> 반도체 데이터에서는 숫자를 아는 것보다 분포를 보는 것이 더 중요할 때가 많다.

## What
- 데이터 시각화는 표와 숫자를 그래프, 분포, 상관관계 화면으로 바꿔 인사이트를 읽는 방법이다.
- Spotfire 강의와 3주차 자료가 공통으로 강조하는 것은, 시각화가 "예쁘게 보여주는 것"이 아니라 공정-결함-전기 특성 관계를 설명하기 위한 분석 인터페이스라는 점이다.

## How
- scatter, trend, histogram, wafer map, parallel coordinates처럼 문제에 맞는 시각화를 선택해야 한다.
- 강의의 조직 예시를 빌리면 생산팀은 가동/라인 상태, 수율팀은 defective/parametric loss, 기술팀은 공정 최적화, CS팀은 고객 이슈 대응을 각각 다른 시각화 문법으로 읽는다.
- 3주차 자료의 Dry Etch RF power -> 절연막 높이 -> breakdown voltage 예시처럼, 좋은 시각화는 공정 변수와 electrical result 사이 인과를 한 화면에서 보여 준다.

## Why
- Anscombe's quartet과 Simpson's paradox가 보여 주듯, 숫자 요약만으로는 놓치는 구조가 많기 때문이다.
- 반도체 데이터는 스펙 안/밖보다도 분포의 모양과 group split에서 힌트가 나오는 경우가 많아, 시각화가 없으면 원인 가설 자체가 늦어진다.

## Measure
- 좋은 시각화의 기준은 원인 가설을 더 빨리 세우게 해 주는가다.
- 추가로 split 비교가 직관적인가, 추세와 이상점이 함께 보이는가, downstream electrical/yield와 연결되는가도 중요하다.

## Connections
- [[데이터 기반 Fab]]
- [[SPC]]
- [[수율 분석]]
- [[산업 핫이슈]]

## Open Questions
- 실제 wiki 뷰어에 wafer map 계열 인터랙션을 넣을지 검토할 수 있다.
