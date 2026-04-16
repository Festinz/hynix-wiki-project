---
title: "소스 요약 - 교안 2권"
type: source
created: 2026-04-15
updated: 2026-04-15
aliases: ["소스 요약 - 교안 2권"]
sources: ["raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["source", "phase2", "소자", "전기특성"]
---
> 이 소스는 패턴과 막 두께의 차이가 결국 Vth와 구동 전류 차이로 나타난다는 사실을 수치 예시로 보여 준다.

## What
- wafer site별 Vtsat, Idsat 예시를 통해 소자 특성 분석 데이터의 형태를 보여 준다.
- 계측 항목과 소자 항목이 같은 lot/wafer 맥락에서 함께 읽혀야 함을 보여 준다.

## How
- [source:교안 2권.pdf]를 반영해 [[소자 특성 분석]], [[문턱전압]], [[Subthreshold Slope]], [[DIBL]], [[누설전류]] 노트를 구체화했다.
- 공정 페이지의 Measure와 Connections에 소자 특성 링크를 넣어, 공정 변화가 전기적 결과로 이어지는 다리를 만들었다.

## Why
- 계측 값만 맞았다고 공정이 좋은 것이 아니라, 최종적으로는 전기적 사양을 만족해야 의미가 있다.
- 이 소스는 공정-계측-소자의 세 번째 다리, 즉 소자 특성 해석의 중요성을 보강해 준다.

## Measure
- 대표 값으로 Vtsat, Idsat, site별 분포가 제시된다.
- 같은 스펙 범위 안에 있더라도 공간 분포가 다르면 공정 기인 variation을 의심해야 한다.

## Connections
- [[소자 특성 분석]]
- [[문턱전압]]
- [[Subthreshold Slope]]
- [[DIBL]]
- [[누설전류]]
- [[공정→계측→소자→수율 파이프라인]]

## Open Questions
- 소자 특성 측정 장비의 세부 셋업과 파라미터 정의는 후속 보강이 필요하다.
