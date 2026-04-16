---
title: "금속 게이트"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["금속 게이트"]
sources: ["raw/core/HKMG.docx"]
confidence: high
tags: ["entity", "gate", "materials"]
---
> metal gate는 high-k와 함께 쓸 때 비로소 poly-Si의 약점을 정면으로 해결한다.

## What
- TiN, TaN, W 같은 금속 또는 금속성 스택으로 이루어진 게이트 전극이다.
- [source:HKMG.docx]는 metal gate를 high-k의 부속물이 아니라, poly-Si의 depletion과 work function tuning 한계를 끊기 위한 독립적 선택으로 설명한다.

## How
- 공핍층이 생기지 않고 work function tuning이 가능해 NMOS/PMOS 요구치에 맞추기 쉽다.
- poly-Si처럼 gate 내부에서 전압을 먹어버리는 depletion 효과가 작아, high-k 도입 이점을 더 직접적으로 채널에 전달할 수 있다.
- 후보 재료는 TiN, TaN, W 계열처럼 다양하지만, 필요한 work function과 공정 integration 경로에 따라 stack 조합이 달라진다.

## Why
- poly-Si는 high-k와 조합될 때 depletion과 Vth tuning 한계가 커져 다시 metal gate가 필요해졌다.
- poly-Si가 오래 표준이었던 이유는 self-aligned integration과 고온 공정 호환성이 좋았기 때문이다.
- 그럼에도 다시 metal gate로 돌아간 이유는, 미세화 이후에는 공정 편의보다 gate control 손실과 Vth 불안정의 대가가 더 커졌기 때문이다.
- 즉 metal gate의 why는 "금속이 더 좋아 보여서"가 아니라, depletion 감소 x work function tuning x HKMG 호환성에서 poly-Si보다 훨씬 유리했기 때문이다.

## Measure
- Vth control, resistance, mobility, reliability를 함께 본다.
- NMOS/PMOS 각각에서 원하는 work function window에 들어오는지, 그리고 bias stress 이후 drift가 얼마나 작은지도 중요하다.

## Connections
- [[High-K Metal Gate]]
- [[폴리실리콘 게이트]]
- [[폴리실리콘 게이트 vs 금속 게이트]]
- [[문턱전압]]
- [[Gate Oxide Tunneling]]
- [[Barrier Metal]]
- [[High-k 유전체]]

## Open Questions
- dual metal gate stack의 세부 재료 조합은 추가 정리가 필요하다.
