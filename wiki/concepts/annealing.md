---
title: "어닐링"
type: concept
created: 2026-04-16
updated: 2026-04-16
sources:
  - "raw/core/hynix 지식 쌓기 5대 공정.pdf"
  - "raw/core/반도체 정리.pdf"
  - "https://news.skhynix.co.kr/"
confidence: high
tags: ["concept", "annealing", "activation", "thermal"]
---

> 어닐링은 열을 주는 행위가 아니라, 손상된 결정과 전기적으로 죽어 있는 dopant를 다시 살아 있게 만드는 공정이다.

## What
- 어닐링은 주입·증착·식각 이후 생긴 결함이나 비평형 상태를 열로 완화해 구조와 전기적 성질을 안정화하는 공정이다.
- 도핑 문맥에서는 특히 [[이온주입]] 이후 격자 손상 복구와 dopant activation을 담당한다.

## How
- 이온주입 후 dopant 일부는 interstitial 상태에 남아 바로 전기적으로 기여하지 못한다.
- 어닐링은 이들을 substitutional site로 이동시켜 활성화하고, 동시에 격자 결함을 줄인다.
- 하지만 열을 오래 주면 profile이 다시 퍼지므로, 현대 공정은 furnace보다 [[RTA]]나 flash 계열처럼 짧고 강한 열처리를 선호한다.

## Why
- 이온주입만으로는 "불순물이 들어갔다"와 "전기적으로 도핑이 되었다"가 같지 않다.
- 어닐링이 필요한 이유는 activation과 defect recovery를 동시에 확보해야 하기 때문이다.
- 즉 어닐링은 보조 공정이 아니라, [[확산과 이온주입]]을 완성시키는 마지막 핵심 단계다.

## Measure
- sheet resistance, activation ratio, junction depth, leakage, [[문턱전압]] 변화를 같이 본다.
- activation은 충분하지만 재확산이 커졌다면 열처리 조건이 과한 것이다.

## Connections
- [[확산]]
- [[확산과 이온주입]]
- [[RTA]]
- [[문턱전압]]
- [[누설전류]]

## Open Questions
- flash anneal, laser anneal, millisecond anneal을 구조별로 어떻게 나눠 읽을지 더 세분화할 수 있다.
