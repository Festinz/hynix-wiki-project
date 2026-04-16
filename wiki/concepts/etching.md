---
title: "식각"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["식각"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf", "https://sshmyb.tistory.com/203", "https://sshmyb.tistory.com/239"]
confidence: high
tags: ["concept", "etch", "profile"]
---
> 식각은 단순히 없애는 공정이 아니라, 원하는 모양만 남기도록 깎는 공정이다.

## What
- 식각은 포토 공정으로 정해 둔 패턴을 따라 불필요한 막을 제거해 실제 형상을 만드는 단계다.
- 핵심 분류는 [[Wet vs Dry vs RIE]]이며, 현대 미세공정에서는 [[RIE]]가 사실상 표준에 가깝다.

## How
- wet etch는 액상 화학 반응으로 재료를 녹여 제거한다.
- dry etch는 플라즈마 기반으로 반응성 종을 만들고, 특히 [[RIE]]에서는 외부 전기장으로 이온을 수직 가속해 방향성을 만든다.
- 이온 충돌이 표면 결합을 약화시키고, 그 밑에서 라디칼이 화학적으로 반응해 생성물을 휘발성 형태로 빼내면서 수직 profile을 형성한다.

## Why
- 같은 포토 패턴이라도 식각이 undercut, footing, residue를 만들면 이후 [[박막 증착]], [[누설전류]], [[수율 분석]]까지 영향을 받는다.
- 그래서 식각은 “얼마나 빨리 깎느냐”보다 “어떤 profile을 만들 것인가, 다른 막은 얼마나 지킬 것인가”가 더 중요하다.
- [source:hynix 지식 쌓기 5대 공정.pdf]가 wet, dry, RIE를 함께 적는 이유도 이 trade-off를 한 축에서 보라는 뜻이다.
- high aspect ratio 구조가 필요한 현재 시점에는 방향성 있는 anisotropic 식각이 더 중요해졌고, 그 맥락에서 [[RIE]] 계열이 대세가 되었다.

## Measure
- etch rate, [[선택비]], profile angle, residue, [[ACI CD]], damage를 함께 본다.
- [source:교안 1권.pdf] 흐름으로 읽으면 포토 직후 [[ADI CD]]와 식각 후 [[ACI CD]] 차이를 통해 bias와 profile 변형을 해석할 수 있다.

## Connections
- [[Wet vs Dry vs RIE]]
- [[RIE]]
- [[할로젠 식각 가스]]
- [[선택비]]
- [[ACI CD]]
- [[Aspect Ratio]]
- [[계측]]
- [[수율 분석]]

## Open Questions
- cryogenic etch, atomic layer etch 같은 차세대 식각 노트를 별도 비교로 확장할 수 있다.

## 💡 생각해보기
- 같은 재료를 깎더라도 왜 F 계열, Cl 계열, Br 계열 가스의 역할이 서로 다를까?
- 식각 속도가 빠른 recipe가 항상 좋은 recipe가 아니라면, 어떤 지표를 같이 봐야 할까?
