---
title: "High-K Metal Gate"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["High-K Metal Gate"]
sources: ["raw/core/HKMG.docx", "raw/core/반도체 정리.pdf", "https://sshmyb.tistory.com/168"]
confidence: high
tags: ["concept", "HKMG", "gate"]
---
> HKMG는 하나의 기술명이지만, 실제로는 누설 문제와 게이트 제어 문제를 동시에 풀기 위해 합쳐진 두 기술이다.

## What
- High-k 절연막과 metal gate 전극을 함께 사용하는 게이트 스택 기술이다.

## How
- High-k는 EOT를 낮추면서 leakage를 줄이고, metal gate는 poly depletion 없이 work function을 맞춘다.
- HKMG.docx의 흐름대로 풀면, 1) SiO2 초박막화로 gate tunneling 증가, 2) high-k 도입으로 물리 두께 확보, 3) 그러나 poly depletion과 Fermi level pinning 때문에 metal gate까지 함께 도입, 이 3단계 전환으로 이해하는 편이 가장 정확하다.

## Why
- SiO2는 너무 얇아지면 터널링이 커지고, poly-Si는 high-k와 만나면 gate control이 약해지기 때문이다.
- [source:딴딴's 반도체사관학교] 핵심은 high-k 후보 중에서 누설과 계면 품질을 버티는 재료를 고르고, gate 후보 중에서는 depletion과 work function tuning 한계를 피하는 재료를 고르는 이중 선택 문제라는 점이다.
- [source:HKMG.docx]도 같은 결론을 더 명확히 보여 준다. high-k만으로는 끝나지 않고, gate 재료까지 바꿔야만 leakage 억제와 Vth 제어를 동시에 만족시킬 수 있었다.
- high-k 후보군만 놓고 봐도 Al2O3, ZrO2, TiO2, HfO2가 가능하지만, 실제 양산의 중심이 HfO2 계열로 모인 이유는 k값만이 아니라 밴드갭, 열안정성, Si 계면 품질, ALD 호환성의 균형이 좋았기 때문이다.
- metal gate 후보 역시 TiN, TaN, W 같은 재료가 있지만, [[Barrier Metal]] 관점과 work function tuning, integration 호환성까지 고려해야 해서 "금속이면 아무거나"가 아니다.
- 즉 HKMG의 why는 "더 높은 k"도 아니고 "금속 사용"도 아니다. 누설 억제, EOT 확보, work function 제어, mobility 손실 억제라는 네 요구 조건이 동시에 맞아떨어지는 조합을 찾는 문제다.

## Measure
- EOT, gate leakage, threshold voltage, mobility, SS, DIBL을 함께 본다.
- 여기에 hysteresis, reliability, bias temperature stress 반응까지 보면 재료 선택이 단기 특성뿐 아니라 장기 안정성으로도 번역되는지 확인할 수 있다.

## Connections
- [[High-k 유전체]]
- [[금속 게이트]]
- [[폴리실리콘 게이트 vs 금속 게이트]]
- [[누설전류]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- gate-first와 gate-last integration 차이를 별도 비교 노트로 확장할 수 있다.

## 💡 생각해보기
- HfO2보다 k값이 더 큰 후보가 있어도 왜 그대로 gate oxide로 못 가는 걸까?
- metal gate의 장점이 분명한데도 한동안 poly-Si가 표준이었던 이유는 공정 통합 측면에서 무엇이었을까?
