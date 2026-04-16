---
title: "선택비"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["선택비"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["concept", "etch", "materials"]
---
> 선택비는 단순 숫자가 아니라, 공정이 어디까지 용서받을 수 있는지 보여 주는 안전 여유다.

## What
- 식각 대상막과 마스크·하부막 사이의 식각 속도 비율을 뜻한다.
- 더 넓게는 "원하는 재료는 빨리, 보호해야 할 재료는 천천히"라는 재료 구분 능력 전체를 뜻한다.

## How
- 반응 가스 조합과 플라즈마 조건, 표면 passivation이 재료별 선택비를 바꾼다.
- [source:반도체 정리.pdf] 관점으로 보면 할로젠 선택 자체가 선택비 설계의 일부다. F 계열은 산화막, Cl 계열은 poly/metal, HBr은 Si 측벽 보호까지 포함해 profile을 다르게 만든다.
- 즉 선택비는 화학 반응성 하나가 아니라 휘발성 부산물, 표면 잔류물, 이온 방향성의 합성 결과다.

## Why
- 선택비가 낮으면 over etch 과정에서 하부 구조 손상과 CD 손실이 빠르게 커지기 때문이다.
- 고종횡비 구조에서는 anisotropy를 높이려고 RF bias를 키우면 선택비가 깨질 수 있어, 식각은 항상 "수직도 vs 하부막 보호"를 동시에 타협해야 한다.

## Measure
- 각 재료의 etch rate와 profile 변화를 비교해 산출한다.
- ADI 대비 ACI bias, residue 유무, undercut/footing, sidewall angle까지 함께 봐야 진짜 usable한 선택비인지 판단할 수 있다.

## Connections
- [[식각]]
- [[할로젠 식각 가스]]
- [[습식 식각 vs 건식 식각]]
- [[계측]]

## Open Questions
- anisotropy와 selectivity를 동시에 잡는 조건 최적화 사례를 더 넣을 수 있다.
