---
title: "Subthreshold Slope"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["Subthreshold Slope"]
sources: ["raw/metrology-yield/교안 2권.pdf"]
confidence: high
tags: ["entity", "device", "SS"]
---
> SS가 작을수록 gate가 채널을 더 날카롭게 제어하고 있다는 뜻이다.

## What
- Subthreshold Slope는 subthreshold 영역에서 drain current가 한 decade 변할 때 필요한 gate voltage 변화를 뜻한다.

## How
- interface trap, gate control 능력, short-channel effect가 나빠질수록 SS가 커진다.
- channel을 gate가 얼마나 강하게 감싸는지, 그리고 계면이 얼마나 깨끗한지가 SS에 직접 반영된다.
- [source:교안 2권.pdf] 맥락에서는 SS를 단독으로 보기보다 [[문턱전압]], [[DIBL]], off current와 같이 읽어 short-channel 문제와 gate stack 문제를 구분하는 전기적 지표로 본다.
- 즉 SS는 "채널이 켜지기 시작하는 문턱"보다, gate가 subthreshold 영역에서 전위를 얼마나 날카롭게 조절하는지 보여 주는 electrostatics 지표다.

## Why
- 낮은 전압으로 빠르게 on/off를 바꾸려면 SS가 작아야 하므로, 저전력 소자에서 특히 중요하다.
- SS가 커진다는 것은 단순 숫자 악화가 아니라 "gate가 채널을 덜 잘 잡고 있다"는 물리적 신호다.
- planar MOSFET에서 [[FinFET]], [[GAA]]로 넘어간 이유도 DIBL뿐 아니라 SS를 더 작게 만들어 낮은 전압에서도 스위칭을 분명하게 하기 위해서다.
- 그래서 SS는 "왜 더 많이 감싸는 구조가 필요했는가"를 설명하는 대표 값 중 하나다.

## Measure
- Id-Vg semilog 그래프에서 mV/dec 단위로 추출한다.
- 이상적인 상온 한계는 대략 60 mV/dec 근처로 자주 언급되며, 실제 공정에서는 계면 trap, 누설, 구조 한계 때문에 이보다 커진다.
- wafer 분포와 bias 조건에 따른 변화까지 보면, 계면 품질 문제인지 short-channel 기여가 큰지 더 잘 해석할 수 있다.

## Connections
- [[소자 특성 분석]]
- [[문턱전압]]
- [[High-K Metal Gate]]
- [[DIBL]]
- [[FinFET]]
- [[GAA]]

## Open Questions
- GAA 구조에서 SS 개선 폭을 세대별로 비교하는 노트를 추가할 수 있다.
