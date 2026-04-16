---
title: "Halo Doping"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["Halo Doping"]
sources: ["raw/core/HKMG.docx", "raw/core/반도체 정리.pdf"]
confidence: medium
tags: ["entity", "implant", "device"]
---
> halo doping은 채널 길이가 짧아질수록 문턱 장벽을 지키기 위해 채널 끝단을 보강하는 전략이다.

## What
- source/drain 인접 영역에 국부 고농도 도핑을 추가해 short-channel effect를 줄이는 방식이다.

## How
- drain 전계가 source barrier를 무너뜨리지 못하도록 채널 양끝 전위 구조를 강화한다.
- 주입 각도와 spacer/integration 순서가 중요하며, 결국은 채널 중심이 아니라 끝단 barrier를 지키는 보강 공정으로 보는 편이 정확하다.

## Why
- 채널이 짧아질수록 DIBL과 누설이 커지므로 단순 채널 도핑만으로는 제어가 어렵기 때문이다.
- halo는 채널 전체를 무겁게 도핑하는 대신 꼭 필요한 가장자리만 보강해 short-channel penalty를 줄이려는 선택이기도 하다.
- 채널 전체 도핑을 올리면 mobility 저하와 variability가 커질 수 있어, halo는 "전체를 세게"가 아니라 "무너지는 끝단만 국부 보강"하는 절충안이다.
- 즉 Halo Doping의 why는 DIBL과 punch-through를 막으면서도 on-current 희생을 최소화하려는 국소 설계에 있다.

## Measure
- DIBL, Vth roll-off, leakage current 감소 여부를 본다.
- [source:반도체 정리.pdf] 관점으로는 punch-through 억제 여부와 source/drain depletion region 격리 유지도 함께 봐야 한다.

## Connections
- [[LDD]]
- [[확산과 이온주입]]
- [[DIBL]]
- [[누설전류]]
- [[Punch Through]]
- [[문턱전압]]

## Open Questions
- FinFET/GAA 시대의 halo 전략 변화를 더 정리할 수 있다.
