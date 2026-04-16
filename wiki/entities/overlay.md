---
title: "오버레이"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["오버레이"]
sources: ["raw/metrology-yield/교안 1권.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["entity", "metrology", "alignment"]
---
> overlay가 틀어지면 각 층이 제자리에 있더라도 서로를 놓치게 된다.

## What
- 오버레이는 현재 층과 이전 층이 얼마나 정확히 정렬되었는지를 나타내는 값이다.
- 단일 층 품질이 아니라, 여러 층이 서로를 정확히 만나도록 만드는 "관계형" 계측 값이다.

## How
- alignment mark를 기준으로 층간 offset을 측정하며, 포토 공정의 정렬 능력을 평가한다.
- 미세화가 심해질수록 자체 노광 성능 못지않게 스테이지 보정, wafer 왜곡, 공정 이력까지 overlay budget에 들어온다.
- [source:교안 1권.pdf] 흐름에서 overlay는 ADI/ACI처럼 한 층의 치수 문제가 아니라, 서로 다른 층이 실제로 겹쳐야 하는 위치 관계를 보는 값이다.
- 그래서 같은 CD가 나와도 overlay가 틀어지면 contact misalignment, gate overlap 변화, via open 같은 다른 종류의 실패가 나온다.

## Why
- 다층 구조 반도체에서 overlay 오차는 short, open, capacitance shift로 바로 이어질 수 있다.
- 특히 contact, gate, via처럼 서로 만나야 동작하는 구조에서는 overlay가 곧 electrical yield와 직결된다.
- 요점은 "각 층이 예쁘게 만들어졌는가"가 아니라, "서로 맞물리게 만들어졌는가"다.
- 미세화 이후에는 CD shrink만큼이나 overlay budget 관리가 중요해져, 공정 능력의 무게중심이 단일 패턴 해상도에서 층간 정렬 정밀도로 이동했다.

## Measure
- 평균값뿐 아니라 wafer edge/center 분포, directionality, lot drift를 함께 본다.
- x/y 방향 비대칭, field-to-field 패턴, 장비별 보정 residual까지 읽어야 실제 문제 위치를 좁힐 수 있다.

## Connections
- [[포토리소그래피]]
- [[계측]]
- [[ADI CD]]
- [[문턱전압]]
- [[수율 분석]]
- [[ACI CD]]
- [[소자 특성 분석]]

## Open Questions
- EUV와 multi-patterning에서 overlay budget이 어떻게 달라지는지 추가 보강이 가능하다.
