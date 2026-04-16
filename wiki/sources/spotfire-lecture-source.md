---
title: "소스 요약 - Spotfire 강의"
type: source
created: 2026-04-15
updated: 2026-04-15
aliases: ["소스 요약 - Spotfire 강의"]
sources: ["raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: medium
tags: ["source", "phase3", "시각화", "분석"]
---
> 같은 데이터라도 어떻게 시각화하느냐에 따라 전혀 다른 인사이트가 나온다는 사실을 가장 직접적으로 보여 준다.

## What
- Spotfire의 목적과 시각화의 중요성, 엔지니어가 데이터를 해석하는 방식에 초점을 맞춘다.
- Anscombe's quartet, Simpson's paradox 같은 사례를 통해 숫자만 보는 위험을 설명한다.
- 동시에 생산팀/수율팀/기술팀/CS팀처럼 조직별로 데이터가 어떻게 의사결정 언어가 되는지도 보여 준다.

## How
- [source:[Lecture] Spotfire.pdf]를 바탕으로 [[데이터 시각화]], [[데이터 기반 Fab]], [[SPC]], [[수율 분석]]을 데이터 해석 관점에서 확장했다.
- Anscombe's quartet, Simpson's paradox, ANOVA 같은 예시를 반도체 공정 데이터 맥락으로 다시 읽어 숫자 요약과 분포 해석의 차이를 강조했다.
- 공정 상관관계 분석 예시를 통해 공정 엔지니어가 단순 보고가 아니라 원인 설명을 해야 한다는 점을 강조했다.
- 특히 "oxide 두께 증가로 leakage 감소하나 Vt slow 경향 보임", "gate CD 증가 -> effective channel length 증가 -> Rch 증가, overlap capacitance 감소" 같은 문장은 [[계측에서 소자 특성으로]]와 [[공정→계측→소자→수율 파이프라인]] 노드의 핵심 근거가 되었다.

## Why
- 반도체 공정은 변수 수가 많고 서로 상호작용하므로, 표 하나만 보고 결론을 내리면 쉽게 착시가 생긴다.
- 따라서 시각화는 장식이 아니라, 복잡한 공정 관계를 읽기 위한 사고 도구다.
- 강의가 반복해서 강조하는 것도 "문제의 원인을 분석하고 논리를 펼쳐 상대방을 설득하는 것"이므로, 데이터 시각화는 리포팅이 아니라 설명 가능한 추론 도구로 이해하는 편이 맞다.

## Measure
- 숫자 자체보다 분포, 추세, 상관관계, 그룹별 분해 결과를 함께 봐야 한다.
- 시각화가 잘 되었는지의 기준은 '원인 가설을 더 빠르게 세울 수 있는가'다.

## Connections
- [[데이터 시각화]]
- [[데이터 기반 Fab]]
- [[SPC]]
- [[수율 분석]]
- [[계측에서 소자 특성으로]]
- [[산업 핫이슈]]

## Open Questions
- 향후에는 실제 wafer map, scatter plot, parallel coordinates 예시를 위키 뷰어에 넣을지 검토할 수 있다.
