---
title: "Halo-Doping"
type: entity
created: 2026-04-15
updated: 2026-04-15
sources: ["raw/core/HKMG.docx", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["device", "short-channel", "implant"]
---

## What
- Halo doping은 source/drain 근처 채널 가장자리에 국부적으로 고농도 도핑을 넣어 short-channel effect를 억제하는 설계다.

## How
- 채널 끝단의 전위 장벽을 강화해 drain 전계가 source 쪽으로 파고드는 것을 줄인다.
- 보통 [[Ion-Implantation]] 공정과 열처리 조건이 함께 최적화된다.

## Why
- 채널이 짧아질수록 [[DIBL]]과 누설이 커지므로 단순 채널 도핑만으로는 제어가 어렵다.
- Halo doping은 short-channel suppression에 유리하지만 junction capacitance 증가와 이동도 저하 trade-off를 만든다.

## Measure
- [[Threshold-Voltage]], [[DIBL]], [[Subthreshold-Slope]] 변화를 통해 효과를 본다.
- 공정 쪽에서는 implant dose/energy와 anneal 후 profile SIMS 분석이 중요하다.

## Connections
- [[LDD]]
- [[Ion-Implantation]]
- [[Leakage-Current]]
- [[Device Characterization]]

## Open Questions
- FinFET/GAA 이후 halo doping 전략이 planar 대비 어떻게 달라졌는지 별도 비교 페이지가 있으면 좋다.
