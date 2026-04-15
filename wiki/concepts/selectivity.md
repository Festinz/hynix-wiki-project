---
title: "Selectivity"
type: concept
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf"]
confidence: high
tags: ["etch", "process-window", "materials"]
---

## What
- Selectivity는 어떤 재료를 깎을 때 다른 재료는 얼마나 덜 깎이는지를 나타내는 비율이다.

## How
- 식각 화학종은 목표 재료와는 반응성이 높고, mask나 stop layer와는 반응성이 낮아야 한다.
- [[Halogen-Etch-Gases]]가 자주 쓰이는 이유도 실리콘, 산화막, 금속마다 반응 생성물의 휘발성이 달라 선택비를 설계하기 좋기 때문이다.

## Why
- 미세 패턴에서는 원하는 막만 제거하고 아래층이나 포토레지스트를 보존해야 CD와 profile을 유지할 수 있다.
- Selectivity가 낮으면 과식각 시 바로 하부막 손상, 마스크 소모, profile 붕괴가 이어져 수율 손실로 연결된다.

## Measure
- 식각 전후 두께 변화를 재료별로 측정해 etch rate 비율을 계산한다.
- CD-SEM, ellipsometry, 단면 SEM으로 목표막 소모량과 stop layer 손상을 함께 본다.

## Connections
- [[Etching]]
- [[Wet-Etch-vs-Dry-Etch]]
- [[Halogen-Etch-Gases]]
- [[Metrology]]

## Open Questions
- 플라즈마 조건 변화가 anisotropy와 selectivity를 동시에 만족시키는 공정창을 어떻게 좁히는지 사례별 비교가 더 필요하다.
