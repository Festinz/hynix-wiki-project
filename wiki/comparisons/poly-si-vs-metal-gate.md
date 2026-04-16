---
title: "폴리실리콘 게이트 vs 금속 게이트"
type: comparison
created: 2026-04-15
updated: 2026-04-15
aliases: ["폴리실리콘 게이트 vs 금속 게이트"]
sources: ["raw/core/HKMG.docx", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["comparison", "gate", "HKMG"]
---
> gate material의 역사는 재료의 우열이 아니라, 그 시대 공정과 가장 잘 맞는 절충안의 역사다.

## What
- 초기 MOSFET은 metal gate를 썼지만, self-aligned gate와 고온 공정 호환성 때문에 poly-Si가 주류가 되었다.
- 그러나 미세화와 high-k 도입 이후 poly-Si의 단점이 다시 커지면서 metal gate가 복귀했다.

## How
- poly-Si는 공정 통합과 self-alignment 측면에서 유리했지만 depletion과 work function 한계를 가진다.
- metal gate는 공핍층이 없고 work function 조절이 유리해 high-k와의 조합에서 장점이 크다.

## Why
- 즉, poly-Si가 선택된 이유는 당시 공정 호환성 때문이었고, 다시 metal gate로 돌아온 이유는 전기적 한계가 공정 이점보다 커졌기 때문이다.
- 사용자가 중요하게 본 '왜 다시 돌아왔는가'의 답은 high-k와 만났을 때 poly-Si의 약점이 더 이상 감당되지 않았기 때문이다.

## Measure
- 비교 지표는 gate depletion, threshold voltage control, resistance, mobility, leakage다.
- 같은 산화막 조건에서 채널 제어력이 얼마나 유지되는지가 핵심이다.

## Connections
- [[High-K Metal Gate]]
- [[폴리실리콘 게이트]]
- [[금속 게이트]]
- [[High-k 유전체]]
- [[누설전류]]

## Open Questions
- metal gate stack의 재료 조합별 NMOS/PMOS work function 분할 전략은 별도 노트로 다룰 수 있다.
