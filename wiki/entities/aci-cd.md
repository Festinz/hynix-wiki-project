---
title: "ACI CD"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["ACI CD"]
sources: ["raw/metrology-yield/교안 1권.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["entity", "metrology", "etch"]
---
> ACI는 식각이 의도한 형상을 얼마나 정확히 남겼는지를 보여 주는 결과값이다.

## What
- ACI CD는 After Etch/After Critical Inspection CD로 이해할 수 있으며, 식각 이후의 실제 선폭을 뜻한다.
- 같은 마스크를 썼더라도 etch chemistry와 profile control이 개입된 뒤의 "실제 구조 치수"라는 점에서 ADI와 성격이 다르다.

## How
- 포토 패턴을 식각으로 전사한 뒤 측정하여, etch bias와 profile 영향을 반영한 실제 구조 CD를 본다.
- 선택비와 anisotropy가 나쁘면 ADI는 정상이어도 ACI에서 undercut, necking, footing 같은 문제가 드러난다.
- [source:교안 1권.pdf]의 계측 흐름에서 ACI가 중요한 이유는, 포토에서 만든 가상 패턴이 식각을 통과한 뒤 실제 전기적 구조로 얼마나 보존되었는지를 보여 주기 때문이다.

## Why
- ADI가 좋아도 식각 selectivity와 profile이 나쁘면 ACI가 틀어질 수 있으므로 두 값을 같이 봐야 한다.
- 즉 ACI는 "식각이 잘 깎였는가"보다, "원래 의도한 CD를 전기적으로 쓸 수 있는 구조로 남겼는가"를 묻는 값이다.
- ACI 악화는 line width 자체뿐 아니라 sidewall angle, residue, microloading 문제까지 함께 암시한다.

## Measure
- ADI 대비 bias, line edge roughness, profile angle을 함께 확인하는 것이 유용하다.
- 이 차이를 lot별로 쌓으면 식각 레시피 drift와 챔버 상태 변화를 조기에 읽을 수 있다.
- 경우에 따라 ACI 편차는 [[문턱전압]] 이동, contact 저항 변화, 누설 증가로 번역되므로 [[소자 특성 분석]]과 이어서 읽어야 한다.

## Connections
- [[식각]]
- [[ADI CD]]
- [[계측]]
- [[선택비]]
- [[수율 분석]]
- [[소자 특성 분석]]
- [[오버레이]]

## Open Questions
- ACI와 최종 contact resistance의 상관관계 사례를 추가할 수 있다.
