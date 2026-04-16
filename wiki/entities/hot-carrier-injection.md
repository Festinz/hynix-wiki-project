---
title: "Hot Carrier Injection"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["Hot Carrier Injection"]
sources: ["raw/core/반도체 정리.pdf", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["entity", "reliability", "leakage"]
---
> HCI는 순간 성능보다 시간이 지난 뒤 문턱전압과 이동도가 어떻게 변하느냐에서 더 무섭다.

## What
- Hot Carrier Injection은 강한 전계에서 가속된 전하가 산화막이나 계면에 주입되어 손상을 남기는 현상이다.

## How
- 주로 drain 쪽 전계 피크에서 에너지를 얻은 캐리어가 계면 trap과 산화막 손상을 유발한다.
- 이 손상은 시간이 지나며 Vth shift와 구동 전류 저하로 드러난다.
- [[LDD]]가 등장한 중요한 이유도 여기 있다. drain edge 전계 피크를 완화해 hot carrier가 과도한 에너지를 얻지 못하게 하려는 것이다.
- HCI는 순간적인 on-current보다 stress 이후 degradation으로 읽어야 하므로, 측정도 초기값보다 변화량 해석이 중요하다.

## Why
- 미세화된 소자에서는 전계가 국부적으로 커지기 쉬워, 단기 특성만 맞춘 공정도 장기 신뢰성에서 문제를 드러낼 수 있기 때문이다.
- 즉 HCI는 "처음엔 잘 동작하지만 시간이 지나며 나빠지는" 대표 메커니즘이라, 양산에서 신뢰성 평가가 왜 별도 축인지 설명해 준다.
- on-current를 조금 더 얻기 위한 공격적 전계 설계가 장기 특성에서는 손해일 수 있다는 점도 보여 준다.

## Measure
- stress 전후의 Vth shift, gm 변화, drive current 저하, lifetime 모델을 본다.
- drain bias와 gate bias 조합에 따른 가속 stress 조건을 비교해 약한 지점을 찾는다.

## Connections
- [[LDD]]
- [[누설전류]]
- [[문턱전압]]
- [[소자 특성 분석]]
- [[누설전류 억제 전략]]
- [[GIDL]]
- [[RTA]]

## Open Questions
- logic과 memory 주변회로에서 HCI 민감도가 어떻게 다른지 더 정리할 수 있다.
