---
title: "Gate Oxide Tunneling"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["Gate Oxide Tunneling"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/HKMG.docx"]
confidence: high
tags: ["entity", "leakage", "oxide"]
---
> SiO2를 얇게 만들수록 정전용량은 좋아졌지만, 어느 순간부터는 gate 전류가 설계를 이겨 버렸다.

## What
- Gate Oxide Tunneling은 게이트 절연막을 전자가 직접 통과하며 생기는 누설 전류다.

## How
- 산화막이 수 nm 이하로 얇아지면 전자가 장벽을 넘는 것이 아니라 터널링으로 통과하기 쉬워진다.
- 이 때문에 전통 SiO2 스택은 미세화에 따라 빠르게 한계에 부딪혔다.
- [source:HKMG.docx] 관점에서는 이 현상이 단순 leakage 증가가 아니라, "더 얇게 만들수록 gate control은 좋아지지만 전류가 새 버리는" 스케일링 패러독스의 핵심이다.

## Why
- 게이트 제어력을 높이기 위해 EOT를 줄이면, 동시에 gate leakage가 폭증하는 모순이 생기기 때문이다.
- 그래서 [[High-k 유전체]]와 [[High-K Metal Gate]]가 등장해 전기적으로는 얇고 물리적으로는 두꺼운 절연막 전략으로 넘어갔다.
- 즉 이 현상은 왜 HKMG가 필요했는지를 설명하는 직접 원인이다.
- SiO2를 계속 얇게 밀어붙이는 선택지와 high-k로 재료를 바꾸는 선택지 중 후자가 선택된 이유가 바로 여기 있다.

## Measure
- gate leakage current density, EOT, breakdown 특성, 온도/전압 의존성을 함께 본다.
- 누설이 낮아졌더라도 mobility와 [[문턱전압]] 분포가 나빠지면 대체 재료가 성공한 것이 아니므로, leakage만 단독으로 보면 안 된다.

## Connections
- [[누설전류]]
- [[High-k 유전체]]
- [[High-K Metal Gate]]
- [[문턱전압]]
- [[누설전류 억제 전략]]
- [[금속 게이트]]

## Open Questions
- interfacial layer 최적화가 leakage와 mobility에 주는 동시 영향까지 더 정리할 수 있다.
