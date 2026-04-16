---
title: "열산화"
type: concept
created: 2026-04-16
updated: 2026-04-16
sources:
  - "raw/core/hynix 지식 쌓기 5대 공정.pdf"
  - "raw/core/반도체 정리.pdf"
confidence: high
tags: ["concept", "oxidation", "thermal", "sio2"]
---

> 열산화는 실리콘 위에 산화막을 얹는 공정이 아니라, 실리콘 자체를 일부 소비해 SiO2를 자라게 하는 공정이다.

## What
- 열산화는 Si 표면이 O2 또는 H2O와 반응해 SiO2를 형성하는 공정이다.
- gate oxide, pad oxide, field oxide처럼 목적에 따라 다른 두께와 품질이 요구된다.

## How
- dry oxidation은 느리지만 막 품질이 좋고, wet oxidation은 빠르지만 상대적으로 치밀도가 낮다.
- 핵심은 "막이 위에 쌓인다"가 아니라, **Si가 실제로 소비되며 산화막이 성장한다**는 점이다.
- 일반적으로 형성된 산화막 두께 중 약 44%에 해당하는 Si가 아래쪽에서 소모된다.

## Why
- 열산화는 초기 MOS 구조에서 가장 중요한 절연막 형성 수단이었다.
- 지금도 isolation과 표면 보호, interface quality 확보 측면에서 여전히 중요하다.
- 다만 형상 변화와 thermal budget 문제를 함께 만들기 때문에, 단순 막 성장 공정으로만 보면 놓치는 것이 많다.

## Measure
- 산화막 두께, 균일도, interface quality, 누설 특성, active area 형상 변화를 같이 본다.
- STI나 isolation 경계에서는 산화막 두께만 아니라 Si consumption이 geometry에 준 영향도 중요하다.

## Connections
- [[확산]]
- [[확산과 이온주입]]
- [[High-K Metal Gate]]
- [[Gate Oxide Tunneling]]

## Open Questions
- dry/wet oxidation을 gate oxide와 isolation 문맥에서 더 명확히 분리한 노트를 추가할 수 있다.
