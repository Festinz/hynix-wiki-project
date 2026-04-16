---
title: "RTA"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["RTA"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["entity", "anneal", "thermal"]
---
> RTA의 목적은 충분히 활성화하되, 불필요하게 다시 퍼지게 두지 않는 것이다.

## What
- Rapid Thermal Annealing의 약자로, 수초 수준의 빠른 열처리를 수행한다.

## How
- 이온주입으로 손상된 격자를 복구하고 도펀트를 substitutional site로 이동시켜 활성화한다.
- 같은 열처리라도 긴 furnace anneal과 달리, 짧은 시간에 높은 온도를 줘 activation은 확보하고 lateral diffusion은 억제하려는 발상이다.
- 그래서 RTA는 [[확산과 이온주입]] 이후의 마무리 공정이면서, 동시에 thermal budget 제어 기술로 읽는 편이 정확하다.

## Why
- 긴 furnace anneal은 재확산을 키우므로, 미세화 이후에는 짧고 강한 thermal budget이 더 유리해졌다.
- 결국 why는 "더 뜨겁게"가 아니라, "필요한 회복만 하고 더 이상 퍼뜨리지 않기"다.
- shallow junction, short-channel 시대에는 활성화 이득보다 재확산 피해가 더 커질 수 있어, 열처리 방식 선택이 소자 성능에 직접 연결된다.

## Measure
- sheet resistance, junction depth, activation ratio, Vth 변화를 본다.
- sheet resistance가 충분히 내려가도 junction이 너무 깊어지면 실패한 anneal일 수 있으므로, 활성화와 profile 보존을 같이 봐야 한다.

## Connections
- [[확산과 이온주입]]
- [[문턱전압]]
- [[LDD]]
- [[Halo Doping]]
- [[확산]]
- [[저온 공정]]

## Open Questions
- flash anneal과 laser anneal을 포함한 더 짧은 열처리 전략을 추가할 수 있다.
