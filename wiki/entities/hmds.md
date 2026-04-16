---
title: "HMDS"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["HMDS"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf", "https://sshmyb.tistory.com/318", "https://sshmyb.tistory.com/319"]
confidence: high
tags: ["entity", "photo", "adhesion"]
---
> HMDS는 단순 접착제라기보다, 표면 수분을 정리하고 PR이 붙을 환경을 만드는 전처리제에 가깝다.

## What
- Hexamethyldisilazane의 약자로, photo 이전 wafer surface priming에 쓰인다.
- 포토 공정에서 PR 자체가 아니라, PR이 잘 붙도록 표면의 화학 상태를 조정하는 보조 재료다.

## How
- 표면의 수분과 반응해 소수성을 높이고, PR이 균일하게 퍼지고 잘 붙도록 만든다.
- 베이크와 함께 쓰일 때 표면 수분을 줄이고, 이후 [[BARC]]나 PR 스택이 안정적으로 형성되도록 돕는다.
- 공정 관점에서는 탈수(dehydration) -> 표면 소수화(hydrophobic conversion) -> PR 접착 향상(adhesion stabilization)이라는 3단계로 이해하는 편이 정확하다.

## Why
- 수분이 남아 있으면 PR 접착과 패턴 안정성이 나빠지므로, 미세 패턴에서 HMDS 전처리가 중요하다.
- 특히 미세 CD일수록 edge bead, lifting, pattern collapse 같은 문제가 공정 변동을 키우므로, HMDS는 단순 보조제가 아니라 수율 안정화 요소가 된다.
- 즉 HMDS는 '잘 붙게 하는 약품'이 아니라, Si 표면의 -OH와 수분이 만든 친수성 상태를 PR 친화적인 소수성 상태로 바꾸는 표면 화학 처리다.

## Measure
- PR coating 균일도, pattern collapse, adhesion defect로 효과를 본다.
- [source:딴딴's 반도체사관학교] 관점으로 보면 lift-off, scum, develop 후 edge 불안정, ADI CD 분포 악화가 HMDS 부족의 초기 신호가 될 수 있다.

## Connections
- [[포토리소그래피]]
- [[포토레지스트]]
- [[BARC]]
- [[ADI CD]]

## Open Questions
- different bake condition과 HMDS priming 시간의 상관을 더 정리할 수 있다.
