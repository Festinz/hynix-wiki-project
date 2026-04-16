---
title: "FinFET"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["FinFET"]
sources: ["raw/core/반도체 정리.pdf", "src/semiconductor-site-master/apps/web/src/data/fundamentals.json"]
confidence: medium
tags: ["concept", "device", "3d"]
---
> FinFET은 평면 채널을 더 얇게 버티는 대신, gate가 채널을 더 입체적으로 잡게 만든 구조 전환이었다.

## What
- FinFET은 채널을 돌출된 fin 형태로 만들고 gate가 측면까지 감싸는 3D 구조다.
- planar MOSFET보다 gate electrostatics를 강화해 short-channel effect를 줄이는 데 유리하다.
- 평면 구조를 그대로 더 얇게 만드는 대신, 구조를 세워 gate 지배력을 늘린 대표적 세대 전환이기도 하다.

## How
- gate가 채널의 세 면을 제어해 drain 전계가 source barrier를 무너뜨리기 어렵게 만든다.
- 덕분에 같은 노드에서도 leakage와 DIBL을 줄이며 더 짧은 채널을 허용한다.
- 결과적으로 [[Subthreshold Slope]]와 off current를 개선하고, [[Halo Doping]] 같은 보조 수단에만 의존하던 한계를 구조적으로 넘어가게 한다.

## Why
- 평면 구조만으로는 미세화에 따라 [[DIBL]], [[Punch Through]], [[누설전류]]가 감당되지 않았기 때문이다.
- 즉 FinFET은 단순 성능 향상이 아니라, 스케일링을 계속하기 위한 전기장 제어 구조의 변화였다.
- 다시 말해 "도핑으로 버티는 시대"에서 "형상으로 제어력을 확보하는 시대"로 넘어가는 중간 해법이었다.

## Measure
- DIBL, subthreshold slope, off current, drive current, fin profile uniformity를 본다.

## Connections
- [[누설전류]]
- [[DIBL]]
- [[Punch Through]]
- [[GAA]]
- [[누설전류 억제 전략]]

## Open Questions
- fin height와 width variation이 전기 특성 분포를 어떻게 흔드는지 더 정리할 수 있다.
