---
title: "계측"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["계측"]
sources: ["raw/metrology-yield/교안 1권.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["concept", "metrology", "measurement"]
---
> 계측은 공정을 평가하는 사후 절차가 아니라, 공정이 제대로 진행되고 있는지 확인하는 실시간 언어다.

## What
- 계측은 공정 결과를 CD, overlay, thickness, defect 같은 수치로 읽어내는 활동이다.
- [source:교안 1권.pdf] 기준으로 보면 계측은 step 중간에 삽입되는 검증 포인트이며, photo 이후 [[ADI CD]], etch 이후 [[ACI CD]], 층간 정렬에서는 [[오버레이]]처럼 공정별로 역할이 다르다.

## How
- photo 이후에는 [[ADI CD]], etch 이후에는 [[ACI CD]], 층간 정렬은 [[오버레이]]처럼 step별 계측이 붙는다.
- inline metrology는 공정 직후 구조를 읽고, electrical characterization은 그 결과가 [[문턱전압]]이나 [[DIBL]]로 어떻게 번역되는지 읽는 식으로 연결된다.
- 두께 계측은 박막이 의도한 절연/전도 성능을 만들었는지 확인하고, defect count는 구조 결함이 단순 치수 문제가 아닌 결함 기인인지 분리하는 데 도움을 준다.

## Why
- 측정이 없으면 공정과 소자 사이의 인과를 확인할 수 없고, 데이터 기반 개선도 불가능하다.
- 같은 CD 숫자라도 ADI에서 틀어진 것과 ACI에서 틀어진 것은 원인과 대응이 다르므로, 계측은 단순 기록이 아니라 원인 분해의 출발점이다.

## Measure
- 대표 항목은 ADI CD, ACI CD, overlay, thickness, defect count다.
- 여기에 wafer 내 위치 분포, lot 간 drift, edge/center 편차까지 함께 봐야 공간적 변동과 시간적 변동을 구분할 수 있다.
- 좋은 계측은 단순 평균값보다 분포와 추세를 함께 제공해 [[SPC]]와 [[FDC]] 해석으로 바로 이어질 수 있어야 한다.

## Connections
- [[ADI CD]]
- [[ACI CD]]
- [[오버레이]]
- [[소자 특성 분석]]
- [[수율 분석]]
- [[SPC]]
- [[FDC]]

## Open Questions
- 장비별 계측 원리와 해상도 차이를 더 세분화할 수 있다.
- optical metrology와 CD-SEM 기반 계측의 역할 분담도 후속 보강이 가능하다.
