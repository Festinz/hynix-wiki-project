---
title: "확산 vs 이온주입"
type: comparison
created: 2026-04-15
updated: 2026-04-16
aliases: ["확산 vs 이온주입"]
sources:
  - "raw/core/hynix 지식 쌓기 5대 공정.pdf"
  - "raw/core/반도체 정리.pdf"
  - "https://sshmyb.tistory.com/214"
  - "https://news.skhynix.co.kr/"
confidence: high
tags: ["comparison", "dopant", "why", "annealing"]
---

> 현대 반도체에서 중요한 것은 도핑을 "할 수 있는가"가 아니라, 원하는 위치와 농도로 얼마나 정밀하게 제어할 수 있는가다.

## What
- 확산은 고온에서 불순물이 자연스럽게 퍼져 들어가는 방식이고, 이온주입은 전기장으로 가속한 이온을 원하는 깊이에 직접 주입하는 방식이다.
- 두 방식 모두 도핑이라는 목적은 같지만, 제어력과 후공정 부담이 크게 다르다.

## How
- 확산은 등방적으로 퍼지므로 lateral diffusion이 커지고, junction 제어가 거칠어지기 쉽다.
- 이온주입은 dose와 energy로 농도와 깊이를 분리 제어할 수 있지만, 격자 손상을 만들기 때문에 [[어닐링]]과 [[RTA]]가 필수다.
- 그래서 실제 비교 단위는 "확산 vs 이온주입"이면서 동시에 "이온주입 + 어닐링/RTA vs thermal diffusion"으로 읽어야 한다.

## Why
- 미세화가 진행될수록 중요한 것은 "대략 이쯤 넣는다"가 아니라, shallow junction, lateral spread, site-to-site variation까지 직접 다루는 능력이다.
- Thermal diffusion은 시간/온도에 의존하는 간접 제어라 dose와 depth를 독립적으로 조절하기 어렵고, 미세 패턴일수록 수평 확산이 치명적이다.
- Ion implantation은 손상이라는 비용을 치르지만, 대신 dose 정밀도, 깊이 독립 제어, lateral diffusion 억제라는 미세화 시대 핵심 요구를 만족한다.
- 현재는 furnace보다 [[RTA]] 중심으로 빠른 열처리를 걸어 activation은 확보하고 재확산은 최소화하는 방향이 주류다.

## Measure
- 비교 지표는 junction depth, sheet resistance, threshold voltage, lateral spread, activation efficiency다.
- 동일 목표 농도를 만들더라도 공정 후 소자 특성 variation이 얼마나 작은지가 더 중요하다.

## Connections
- [[확산]]
- [[확산과 이온주입]]
- [[어닐링]]
- [[RTA]]
- [[LDD]]
- [[Halo Doping]]
- [[문턱전압]]

## Open Questions
- millisecond anneal과 laser anneal까지 포함한 최신 activation 전략을 이 비교 노트에 더 확장할 수 있다.

## 핵심 비교표
| 관점 | Thermal Diffusion | Ion Implantation |
|------|-------------------|------------------|
| 방향성 | isotropic, 열에 의한 확산 | 가속 전기장 기반 수직 주입 |
| 깊이 제어 | 시간/온도로 간접 제어 | 에너지로 직접 제어 |
| 농도 제어 | 표면 농도/확산 계수 의존 | dose 직접 설정 |
| Lateral diffusion | 큼 | 상대적으로 작음 |
| 결정 손상 | 작음 | 큼 -> [[RTA]] 필요 |
| 적합한 시대 | 큰 feature size | 미세화된 MOSFET |

## 공정 흐름으로 같이 보기
```text
[Thermal diffusion]
열로 표면에서 안쪽으로 퍼짐
등방성, profile 제어 한계

[Ion implantation]
가속 이온 수직 주입
깊이와 dose 비교적 정밀 제어

[Annealing / RTA]
격자 회복 + dopant activation
현재는 furnace보다 RTA 중심
```

## 💡 생각해보기
- 왜 MOSFET 시대에는 "결정 손상이 적다"보다 "깊이와 dose를 독립 제어할 수 있다"가 더 중요해졌을까?
- activation을 높이기 위해 열을 오래 주면 어떤 profile 문제가 다시 생길까?
