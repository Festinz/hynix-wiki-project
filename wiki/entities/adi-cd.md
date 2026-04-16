---
title: "ADI CD"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["ADI CD"]
sources: ["raw/metrology-yield/교안 1권.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["entity", "metrology", "photo"]
---
> ADI는 포토가 의도한 패턴이 실제로 얼마나 잘 찍혔는지를 가장 먼저 보여 주는 숫자다.

## What
- ADI CD는 After Develop Inspection Critical Dimension의 약자로, 포토 현상 직후 패턴 선폭을 뜻한다.
- 식각이나 증착 영향이 아직 들어오기 전이라, 순수하게 photo stack과 노광/현상 조건이 만든 치수라는 점이 중요하다.

## How
- 노광과 현상 이후 CD-SEM 등으로 측정하며, etch 이전의 패턴 fidelity를 확인한다.
- HMDS, [[BARC]], PR 두께, focus/exposure 조건이 ADI에 직접 영향을 준다.
- [source:교안 1권.pdf]의 흐름대로 보면 ADI는 단순 포토 결과값이 아니라, 이후 [[ACI CD]]와 비교하기 위한 기준선이다.
- 그래서 ADI가 이미 흔들리면 photo stack 문제를 먼저 의심하고, ADI는 정상인데 ACI만 틀어지면 etch bias나 profile 문제 쪽으로 원인을 좁혀 간다.

## Why
- 여기서부터 CD가 틀어지면 이후 식각과 증착이 아무리 잘 되어도 최종 소자 특성이 흔들린다.
- 따라서 ADI는 "포토가 문제인지 아닌지"를 가장 먼저 가르는 게이트 역할을 한다.
- 같은 recipe라도 wafer center/edge, 반사 조건, PR 두께 균일도에 따라 ADI가 먼저 움직일 수 있어, ADI는 공정 drift의 초기 경보값 역할도 한다.

## Measure
- 측정값 자체뿐 아니라 wafer 내 분포와 lot 간 drift를 함께 본다.
- line edge roughness, center/edge 분포, target 대비 bias까지 같이 봐야 이후 [[ACI CD]]와의 차이를 해석할 수 있다.
- overlay가 어긋나면 CD 숫자 자체는 맞아 보여도 다음 층과 관계가 틀어질 수 있으므로, [[오버레이]]를 분리해서 동시에 관리해야 한다.

## Connections
- [[포토리소그래피]]
- [[계측]]
- [[ACI CD]]
- [[오버레이]]
- [[공정→계측→소자→수율 파이프라인]]
- [[포토레지스트]]
- [[HMDS]]

## Open Questions
- ADI variation이 최종 전기 특성으로 얼마나 증폭되는지 사례를 더 모을 필요가 있다.
