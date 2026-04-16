---
title: "소자 특성 분석"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["소자 특성 분석"]
sources: ["raw/metrology-yield/교안 2권.pdf", "raw/spotfire/[Lecture] Spotfire.pdf"]
confidence: high
tags: ["concept", "device", "electrical"]
---
> 공정이 잘 되었다는 말은 결국 전기적으로도 spec 안에 들어왔다는 뜻이어야 한다.

## What
- 소자 특성 분석은 Vth, Idsat, SS, DIBL, leakage 같은 전기적 결과를 읽는 단계다.
- [source:교안 2권.pdf] 맥락상 핵심은 lot/wafer/site별 electrical 분포를 통해 공정 variation이 전기 특성으로 어떻게 번역되었는지 보는 것이다.
- [source:hynix 지식 쌓기 5대 공정.pdf]가 소자 데이터를 계측·설비·수율 데이터와 별도 축으로 둔 것도, electrical result가 단순 후행 결과가 아니라 공정 판단의 중심 기준이기 때문이다.

## How
- wafer와 site별 분포를 보고 공정 variation이 전기 특성에 어떻게 번역되었는지 확인한다.
- 교안 예시처럼 같은 wafer 안에서도 위치별 Vtsat, Idsat가 달라질 수 있으므로, 평균값보다 공간 분포가 더 중요할 때가 많다.
- [source:[Lecture] Spotfire.pdf]의 gate CD/oxide thickness 예시와 연결하면, 형상/두께 변화가 channel resistance, capacitance, leakage, Vt shift 같은 electrical 결과로 번역되는 과정을 함께 읽을 수 있다.
- 예를 들어 gate CD가 커지면 effective channel length 증가로 Rch가 커지고, oxide thickness가 증가하면 leakage는 줄어도 Vt가 느려질 수 있어, electrical data는 항상 다변수 trade-off로 읽어야 한다.
- 그래서 소자 특성 분석은 단순 spec pass/fail 체크가 아니라, 어떤 공정/계측 변화가 어떤 전기 항목에서 먼저 드러나는지 찾는 역추적 단계다.

## Why
- 계측 값이 좋아 보여도 전기 특성이 나쁘면 공정 조건의 진짜 문제를 놓칠 수 있기 때문이다.
- 반대로 electrical 결과만 보고도 끝이 아니다. 어떤 항목이 무너졌는지에 따라 다시 [[ADI CD]], [[ACI CD]], 두께, FDC 파라미터, 레시피 조건으로 거슬러 올라가야 한다.

## Measure
- Id-Vg, Id-Vd, site map, spec pass/fail, variation 분포가 핵심이다.
- 절대값뿐 아니라 wafer 내 위치 패턴, lot 간 이동, 공정 split 간 차이도 같이 봐야 실제 원인을 좁힐 수 있다.
- 실무적으로는 Vth, Idsat, SS, DIBL, off current를 묶어서 보고, 어떤 지표가 같이 움직이는지로 short-channel 문제인지 gate stack 문제인지, 혹은 구조/정렬 문제인지를 가늠한다.

## Connections
- [[문턱전압]]
- [[Subthreshold Slope]]
- [[DIBL]]
- [[GIDL]]
- [[Hot Carrier Injection]]
- [[Punch Through]]
- [[Gate Oxide Tunneling]]
- [[누설전류]]
- [[수율 분석]]
- [[공정→계측→소자→수율 파이프라인]]

## Open Questions
- device parametric data와 inline metrology를 연결하는 ML 사례를 더 추가할 수 있다.
- 교안 2권 원문을 더 잘 복구하면 Vtsat/Idsat 사례를 wafer map 수준으로 추가할 수 있다.
