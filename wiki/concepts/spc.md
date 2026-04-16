---
title: "SPC"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["SPC"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["concept", "data", "quality"]
---
> SPC는 숫자를 예쁘게 그리는 일이 아니라, 공정이 아직 통제 상태에 있는지 보는 언어다.

## What
- SPC는 Statistical Process Control의 약자로, 결과 데이터 기반 공정 관리 체계다.
- 설비가 무엇을 했는지보다 wafer 결과가 통계적으로 안정 상태에 있는지를 판정하는 언어에 가깝다.
- [source:hynix 지식 쌓기 5대 공정.pdf] 표현을 빌리면, Statistical은 통계적 기법, Process는 공정 상태 파악, Control은 원하는 생산 상태 유지까지 포함한다.

## How
- 관리도, Cpk, run rule 등을 이용해 공정 결과가 정상 범위를 벗어나는지 모니터링한다.
- lot 평균 이동, 이상점 출현, 장기 drift 같은 패턴을 읽어 공정 조건 변경이나 설비 이상을 의심한다.
- inline 데이터뿐 아니라 electrical 결과까지 SPC 관점으로 보면, 평균은 정상인데 분산이 커지는 상황과 평균 자체가 이동하는 상황을 구분할 수 있다.

## Why
- 수율 문제가 심각해지기 전에 drift와 abnormal pattern을 미리 잡기 위해 필요하다.
- 동일 spec 안에서도 분포가 기울기 시작하는 순간을 잡아야, 대형 loss로 번지기 전에 개입할 수 있다.
- 즉 SPC의 가치는 불량이 발생한 뒤 설명하는 것이 아니라, 아직 스펙 안에 있을 때도 "정상 상태에서 벗어나기 시작했다"를 먼저 읽는 데 있다.

## Measure
- UCL/LCL, mean shift, Cpk, lot trend를 본다.
- 중요한 것은 단일 숫자보다도 시간에 따른 분포와 이상 패턴의 지속성이다.
- 공정별 대표 지표는 CD, thickness, overlay, defect count, electrical parametric data가 될 수 있다.

## Connections
- [[SPC와 FDC 비교]]
- [[계측]]
- [[수율 분석]]
- [[데이터 시각화]]

## Open Questions
- 실제 fab에서 어떤 chart를 주력으로 쓰는지 사례를 더 넣을 수 있다.
