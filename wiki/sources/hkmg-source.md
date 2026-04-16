---
title: "소스 요약 - HKMG"
type: source
created: 2026-04-15
updated: 2026-04-15
aliases: ["소스 요약 - HKMG"]
sources: ["raw/core/HKMG.docx"]
confidence: high
tags: ["source", "phase1", "HKMG", "MOSFET"]
---
> 이 소스는 High-k와 Metal Gate를 한 묶음이 아니라 서로 다른 문제를 푸는 두 개의 답으로 분리해서 보게 만든다.

## What
- 게이트 산화막과 게이트 전극이 왜 동시에 바뀌었는지를 구조적으로 설명한다.
- poly depletion, Fermi level pinning, leakage, Vth tuning 같은 핵심 문제를 한 흐름으로 연결한다.
- 특히 "SiO2가 3nm 이하로 얇아지며 터널링 leakage가 급증"하고, "high-k를 도입했더니 이번엔 poly-Si와의 궁합 문제가 드러난다"는 식으로 세대 전환 이유를 단계적으로 보여 준다.

## How
- [source:HKMG.docx]를 바탕으로 [[High-K Metal Gate]], [[High-k 유전체]], [[금속 게이트]], [[폴리실리콘 게이트]], [[폴리실리콘 게이트 vs 금속 게이트]]를 재구성했다.
- poly depletion, Fermi level pinning, mobility 저하, work function tuning 한계를 각각 분리해 어떤 문제가 High-k의 몫이고 어떤 문제가 metal gate의 몫인지 다시 써 넣었다.
- 기존 공정 페이지의 thin film, ALD, leakage current 설명도 이 소스의 관점에 맞게 교차 업데이트했다.
- 원문은 HfO2, ZrO2, Al2O3 같은 high-k 후보, TiN/TaN/W 같은 metal gate 후보를 같이 제시해 "재료와 전극 선택"이 따로 놀지 않음을 보여 준다.

## Why
- HKMG는 단순히 '새 재료를 썼다'가 아니라, 누설 문제와 게이트 제어 문제를 분리해서 해결한 기술적 절충의 결과다.
- 이 소스 덕분에 사용자가 특히 중요하게 본 '왜 poly-Si에서 다시 metal gate로 돌아왔는가'를 명시적으로 설명할 수 있다.

## Measure
- 핵심 검증 항목은 gate leakage, EOT, threshold voltage, mobility, subthreshold slope, DIBL이다.
- High-k가 두꺼운 물리막으로도 같은 정전용량을 만드는지와 Metal Gate가 work function tuning을 얼마나 안정화하는지가 중요하다.
- 특히 leakage를 줄였는데도 EOT 손실이나 mobility 저하가 남는다면, 재료 도입의 이점이 실제 소자 성능으로 충분히 번역되지 않았다는 뜻이다.

## Connections
- [[High-K Metal Gate]]
- [[High-k 유전체]]
- [[금속 게이트]]
- [[폴리실리콘 게이트]]
- [[폴리실리콘 게이트 vs 금속 게이트]]
- [[Gate Oxide Tunneling]]
- [[누설전류]]

## Open Questions
- gate-first와 gate-last의 공정 통합 차이를 별도 비교 노트로 확장할 여지가 있다.
