---
title: "확산과 이온주입"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["확산과 이온주입", "이온주입"]
sources:
  - "raw/core/hynix 지식 쌓기 5대 공정.pdf"
  - "raw/core/반도체 정리.pdf"
  - "https://news.skhynix.co.kr/"
confidence: high
tags: ["concept", "implant", "dopant", "annealing"]
---

> 이온주입은 도핑을 감으로 하는 시대에서 수치로 설계하는 시대로 넘어가게 한 공정이다.

## What
- 도펀트 이온을 가속해 실리콘 내부에 직접 주입하는 도핑 공정이다.
- thermal diffusion처럼 열에 맡겨 퍼뜨리는 방식이 아니라, **energy와 dose를 분리 제어**해 필요한 위치에 필요한 양만 넣는 공정이다.
- 실제 공정 흐름에서는 주입으로 끝나지 않고, 뒤에 [[어닐링]]과 [[RTA]]가 붙어야 전기적으로 의미 있는 도핑이 완성된다.

## How
- dose가 농도를, energy가 깊이를 결정한다.
- photo/mask가 주입 영역을 정하고, tilt와 rotation이 채널링을 관리하며, spacer 전후 시퀀스가 [[LDD]]와 [[Halo Doping]] 같은 구조를 만든다.
- 이온 충돌 후에는 격자 손상(lattice damage)과 interstitial 상태가 남기 때문에, [[어닐링]]이 substitutional activation과 결함 복구를 담당한다.
- 현대 공정에서는 furnace보다 [[RTA]] 중심으로 빠르고 국소적인 열처리를 걸어, activation은 확보하고 재확산은 억제하려고 한다.

## Why
- [[확산]] 방식보다 위치·깊이·농도 제어력이 훨씬 좋아 미세 공정에 적합하다.
- diffusion은 isotropic하게 퍼지므로 lateral diffusion이 커지고, shallow junction과 짧은 channel 길이를 동시에 만족시키기 어렵다.
- 이온주입은 손상이라는 비용을 내지만, 대신 dose 직접 제어, 깊이 독립 제어, lateral diffusion 억제라는 미세화 시대의 핵심 요구를 만족한다.
- [source:반도체 정리.pdf]가 강조하듯 핵심 질문은 "왜 확산 대신 이온주입인가"이고, 답은 단순 정밀도보다도 **공정 변수와 소자 결과를 더 직접 연결할 수 있기 때문**이다.

## Measure
- dose monitor, sheet resistance, junction depth, leakage, threshold shift를 함께 본다.
- anneal 전후 sheet resistance 변화와 activation 정도를 같이 봐야, 주입은 되었지만 전기적으로 살아나지 않은 상태를 놓치지 않는다.
- short-channel 소자에서는 [[DIBL]], [[Punch Through]], [[Subthreshold Slope]] 변화까지 같이 봐야 도핑 profile이 구조적으로 맞았는지 판단할 수 있다.

## Connections
- [[확산]]
- [[확산 vs 이온주입]]
- [[어닐링]]
- [[RTA]]
- [[LDD]]
- [[Halo Doping]]
- [[문턱전압]]
- [[DIBL]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- plasma doping, monolayer doping, cryogenic implant까지 포함한 차세대 도핑 전략을 확장할 수 있다.
- activation을 높이면서도 diffusion tail을 최소화하는 anneal recipe를 구조별로 더 세분화할 수 있다.

## 공정 흐름으로 읽는 이온주입
1. [[열산화]] 또는 기존 구조 준비
2. photo/mask로 주입 영역 정의
3. ion implantation으로 depth와 dose 설계
4. [[어닐링]]으로 격자 복구와 dopant activation
5. [[RTA]]로 빠른 고온 처리와 재확산 억제

## 💡 생각해보기
- "이온주입은 정밀하다"를 넘어서, **왜 dose와 depth를 독립 제어할 수 있다는 점이 MOSFET 시대에 निर्णायक이었는가?**
- annealing이 없다면 주입된 도펀트는 왜 전기적으로 충분히 기여하지 못할까?
