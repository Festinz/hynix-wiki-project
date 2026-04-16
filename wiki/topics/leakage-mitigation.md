---
title: "누설전류 억제 전략"
type: topic
created: 2026-04-15
updated: 2026-04-15
aliases: ["누설전류 억제 전략"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/HKMG.docx", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["topic", "leakage", "device"]
---
> 누설전류는 하나의 문제가 아니라 여러 전계 문제의 집합이고, 해결책도 층마다 다르게 배치된다.

## What
- 이 노트는 [[DIBL]], [[GIDL]], [[Punch Through]], [[Gate Oxide Tunneling]], [[Hot Carrier Injection]] 같은 누설/신뢰성 메커니즘을 한 줄기에 묶는다.
- 동시에 [[LDD]], [[Halo Doping]], [[High-K Metal Gate]], [[FinFET]], [[GAA]]가 각각 어떤 문제를 줄이기 위해 등장했는지도 함께 본다.

## How
- 전계 피크를 낮추는 구조는 [[LDD]], barrier를 지키는 구조는 [[Halo Doping]], gate leakage를 낮추는 재료 선택은 [[High-K Metal Gate]], electrostatics를 강화하는 구조는 [[FinFET]]과 [[GAA]]처럼 분류해 읽는다.
- 이렇게 분리해야 '왜 이 기술이 나왔는가'가 누설 메커니즘과 직접 연결된다.

## Why
- 사용자가 원하는 이해는 누설전류 정의 자체보다, 왜 특정 세대에 특정 구조가 등장했는지를 보는 데 있기 때문이다.
- 즉 누설 억제 전략 노트는 소자 역사와 공정 선택 이유를 동시에 압축하는 중심 링크 역할을 한다.

## Measure
- off current, Vth roll-off, DIBL, SS, gate leakage, reliability degradation를 함께 본다.
- 해결책은 항상 한 지표만 좋게 하지 않고, on-current·공정 복잡도·수율과의 trade-off까지 같이 봐야 한다.

## Connections
- [[누설전류]]
- [[DIBL]]
- [[GIDL]]
- [[Punch Through]]
- [[Gate Oxide Tunneling]]
- [[Hot Carrier Injection]]
- [[LDD]]
- [[Halo Doping]]
- [[High-K Metal Gate]]
- [[FinFET]]
- [[GAA]]

## Open Questions
- SOI까지 포함한 더 넓은 leakage mitigation 계보를 추가할지 검토할 수 있다.
