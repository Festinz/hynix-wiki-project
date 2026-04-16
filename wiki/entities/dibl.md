---
title: "DIBL"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["DIBL"]
sources: ["raw/metrology-yield/교안 2권.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["entity", "device", "short-channel"]
---
> DIBL은 drain이 source 쪽 장벽까지 흔들어 버리는 short-channel 시대의 대표적 부작용이다.

## What
- DIBL은 Drain-Induced Barrier Lowering의 약자로, drain 전압이 커질수록 문턱전압이 낮아지는 현상이다.

## How
- 채널이 짧아질수록 drain 전계가 source barrier까지 영향을 미쳐 OFF 상태에서도 전류가 흐르기 쉬워진다.
- 본질적으로 gate가 잡아야 할 barrier를 drain이 옆에서 끌어내리는 현상이라, electrostatics control의 붕괴 신호로 읽는다.
- 그래서 planar MOSFET에서 채널 길이가 줄수록 DIBL이 먼저 커지고, 이후 [[FinFET]]이나 [[GAA]]처럼 gate가 더 많이 감싸는 구조로 넘어가게 된다.

## Why
- DIBL이 크면 누설전류가 증가하고 문턱전압이 불안정해져 소자와 회로 설계가 어려워진다.
- 특히 같은 [[문턱전압]] nominal 값을 가져도 DIBL이 큰 소자는 실제 동작 조건에서 Vth가 더 크게 무너질 수 있어, 정적 스펙만으로는 소자 건전성을 판단하기 어렵다.
- 따라서 DIBL은 short-channel 시대에 "왜 구조를 바꿔야 했는가"를 설명하는 대표적인 why 지표다.

## Measure
- 서로 다른 Vd 조건에서 Vth를 추출해 차이를 본다.
- 보통 mV/V 형태로 정리하며, 값이 클수록 drain bias 민감도가 높다는 뜻이다.
- [[Subthreshold Slope]]와 함께 보면 gate control 약화가 channel 전체 문제인지, drain 쪽 electrostatics 붕괴가 더 큰 문제인지 해석에 도움이 된다.

## Connections
- [[누설전류]]
- [[문턱전압]]
- [[Halo Doping]]
- [[LDD]]
- [[소자 특성 분석]]
- [[FinFET]]
- [[GAA]]

## Open Questions
- FinFET과 GAA에서 DIBL 개선 정도를 구조적으로 비교하는 노트를 더 붙일 수 있다.
