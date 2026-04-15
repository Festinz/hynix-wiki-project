---
title: "LDD"
type: entity
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/HKMG.docx", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["device", "implant", "hot-carrier"]
---

## What
- LDD는 Lightly Doped Drain의 약자로, 채널과 고농도 source/drain 사이에 완만한 도핑 구간을 두는 구조다.

## How
- drain 전계 피크를 완화해 hot carrier와 short-channel effect를 줄이도록 설계한다.
- 보통 spacer 형성 전후 두 번의 [[Ion-Implantation]]으로 profile을 만든다.

## Why
- 미세화가 진행되면 drain 쪽 전계 집중으로 [[Leakage-Current]]와 hot carrier degradation이 커진다.
- LDD는 신뢰성 개선에 유리하지만 series resistance 증가라는 비용을 낸다.

## Measure
- Id-Vg, Id-Vd, hot carrier stress, [[DIBL]] 변화를 통해 효과를 평가한다.
- 단면 분석과 SIMS profile로 실제 junction gradient를 검증한다.

## Connections
- [[Halo-Doping]]
- [[Ion-Implantation]]
- [[Device Characterization]]
- [[Threshold-Voltage]]

## Open Questions
- HKMG 이후 work-function tuning과 LDD 최적화가 어떤 상호작용을 보이는지 정리할 필요가 있다.
