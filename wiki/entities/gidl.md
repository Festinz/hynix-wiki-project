---
title: "GIDL"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["GIDL"]
sources: ["raw/core/반도체 정리.pdf", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["entity", "leakage", "device"]
---
> GIDL은 채널 한가운데가 아니라 gate와 drain이 만나는 모서리의 전계가 너무 강해질 때 커진다.

## What
- GIDL은 Gate-Induced Drain Leakage의 약자로, gate-drain overlap 부근에서 발생하는 누설 메커니즘이다.

## How
- 높은 전계가 밴드 간 터널링을 유도해 OFF 상태에서도 전류가 흐르게 만든다.
- 특히 얇은 산화막, 높은 drain bias, 급한 전계 분포가 겹치면 민감해진다.
- [source:교안 2권.pdf] 문맥으로는 gate-drain overlap 가장자리에서 전계가 얼마나 몰리는지가 핵심이며, 단순 채널 도핑만으로는 해결되지 않는 누설이다.
- 그래서 spacer, overlap geometry, drain-side field shaping이 모두 GIDL 억제와 연결된다.

## Why
- 미세화와 고전계 조건에서는 채널 누설만이 아니라 모서리 전계 기반 누설도 함께 커지기 때문이다.
- 그래서 공정은 단순 채널 도핑뿐 아니라 overlap 구조와 field shaping까지 같이 설계해야 한다.
- [[LDD]]가 GIDL 완화 해법으로 자주 연결되는 이유도 drain edge 전계 피크를 눌러 주기 때문이다.
- 즉 GIDL은 "왜 drain 근처 구조를 따로 설계하나"에 대한 답을 준다.

## Measure
- off-state Id-Vg 곡선, drain bias 변화에 따른 leakage, 전계 집중 구조를 함께 본다.
- site별 분포를 보면 특정 레이아웃이나 공정 편차에서 더 두드러질 수 있다.
- [[문턱전압]]과 별개로 off-state tail이 나빠지는지, high drain bias에서 급격히 증가하는지 같이 읽으면 분류가 쉬워진다.

## Connections
- [[누설전류]]
- [[문턱전압]]
- [[소자 특성 분석]]
- [[수율 분석]]
- [[누설전류 억제 전략]]
- [[LDD]]
- [[Gate Oxide Tunneling]]

## Open Questions
- spacer 구조와 overlap 최적화가 GIDL에 주는 영향을 별도 노트로 보강할 수 있다.
