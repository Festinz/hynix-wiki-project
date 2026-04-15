---
title: "RTA"
type: entity
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/HKMG.docx"]
confidence: high
tags: ["thermal", "anneal", "activation"]
---

## What
- RTA는 Rapid Thermal Annealing으로, 짧은 시간에 고온을 가해 도핑 활성화와 결함 복구를 수행하는 열처리다.

## How
- 램프 업/다운이 빠른 장비로 확산을 최소화하면서 implant damage recovery와 dopant activation을 동시에 노린다.
- 그래서 [[Diffusion]]과 [[Ion-Implantation]] 사이를 잇는 후속 공정 성격을 가진다.

## Why
- 긴 furnace anneal은 도핑 프로파일을 퍼뜨려 미세 접합 제어를 해치기 쉽다.
- RTA는 "필요한 활성화는 주되 불필요한 재확산은 줄이기" 위해 중요해졌다.

## Measure
- sheet resistance, junction depth, activation ratio, SIMS profile을 본다.
- 소자 관점에서는 [[Threshold-Voltage]]와 contact resistance 변화를 함께 확인한다.

## Connections
- [[Diffusion]]
- [[Ion-Implantation]]
- [[LDD]]
- [[Halo-Doping]]

## Open Questions
- spike anneal, millisecond anneal까지 포함한 더 짧은 thermal budget 전략을 위키에 확장할 필요가 있다.
