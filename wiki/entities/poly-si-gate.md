---
title: "폴리실리콘 게이트"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["폴리실리콘 게이트"]
sources: ["raw/core/HKMG.docx", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["entity", "gate", "history"]
---
> poly-Si는 한 시대의 최적해였지만, high-k 시대에는 더 이상 충분하지 않았다.

## What
- 도핑된 polycrystalline silicon으로 만든 게이트 전극이다.

## How
- self-aligned gate 구현과 고온 공정 호환성 덕분에 오랫동안 표준으로 쓰였다.
- 도핑된 반도체이기 때문에 초기 CMOS 세대에서는 integration 측면에서 금속보다 실용적이었다.
- 초기 금속 게이트가 공정 통합과 신뢰성 측면에서 불리했던 시기에는 poly-Si가 오히려 제조 현실에 더 잘 맞는 선택지였다.
- 그래서 poly-Si는 성능 절대값보다 "공정 전체와 얼마나 잘 어울리느냐"의 관점에서 표준이 되었다.

## Why
- 하지만 depletion과 work function 한계 때문에 high-k와의 조합에서 문제가 드러나 metal gate로 대체되었다.
- 즉 poly-Si는 한 시대의 최적해였지만, 미세화와 high-k 도입 이후에는 같은 장점이 오히려 병목으로 돌아왔다.
- 중요한 점은 poly-Si가 나빠서 버려진 것이 아니라, SiO2 시대의 최적해가 high-k 시대에는 더 이상 최적이 아니게 된 것이다.
- 이 전환이 [[폴리실리콘 게이트 vs 금속 게이트]] 비교의 핵심이다.

## Measure
- depletion, gate resistance, Vth control 난이도를 통해 한계를 본다.
- high-k 도입 이후에는 depletion 두께 증가와 work function pinning 문제가 얼마나 커지는지 함께 본다.

## Connections
- [[금속 게이트]]
- [[High-K Metal Gate]]
- [[폴리실리콘 게이트 vs 금속 게이트]]
- [[Gate Oxide Tunneling]]
- [[문턱전압]]
- [[High-k 유전체]]

## Open Questions
- 초기 metal gate에서 poly-Si로 이동한 공정 통합 관점을 더 보강할 수 있다.
