---
title: "LDD"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["LDD"]
sources: ["raw/core/HKMG.docx", "raw/core/반도체 정리.pdf"]
confidence: medium
tags: ["entity", "implant", "reliability"]
---
> LDD는 저항을 조금 희생하더라도 drain 전계 피크를 낮추기 위해 선택된 구조적 절충안이다.

## What
- Lightly Doped Drain의 약자로, 채널과 고농도 source/drain 사이에 저농도 구간을 두는 구조다.

## How
- spacer 전후 이온주입을 이용해 완만한 도핑 gradient를 만든다.
- 구조적으로는 drain 바로 옆의 전계 peak를 blunt하게 만들어, channel 끝단이 한 번에 과도한 전계를 맞지 않게 한다.
- 따라서 LDD는 단순 도핑량 변경이 아니라, spacer integration과 self-aligned implant 순서가 핵심인 구조적 공정이다.

## Why
- drain 쪽 전계 집중을 줄여 HCI와 short-channel 문제를 완화하기 위해 도입되었다.
- series resistance를 조금 희생하더라도 hot carrier damage를 줄이는 편이 전체 신뢰성에는 유리한 경우가 많다.
- 즉 LDD는 on-current 극대화보다 전계 분산과 장기 신뢰성을 택한 구조적 절충안이다.
- 특히 drain edge 전계가 너무 세면 [[GIDL]]과 [[Hot Carrier Injection]]이 같이 악화될 수 있어, LDD는 누설과 신뢰성 문제를 동시에 누그러뜨리는 장치로 읽을 수 있다.

## Measure
- hot carrier reliability, series resistance, DIBL, drive current 변화를 함께 본다.
- 전계 피크가 줄면 누설과 장기 신뢰성은 좋아질 수 있지만, on-current 희생과의 균형도 같이 봐야 한다.

## Connections
- [[Halo Doping]]
- [[확산과 이온주입]]
- [[Hot Carrier Injection]]
- [[누설전류]]
- [[GIDL]]
- [[문턱전압]]

## Open Questions
- 고성능 로직과 메모리 셀에서 LDD 최적화 기준 차이를 더 비교할 수 있다.
