---
title: "Punch Through"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["Punch Through"]
sources: ["raw/core/반도체 정리.pdf", "raw/metrology-yield/교안 2권.pdf"]
confidence: medium
tags: ["entity", "leakage", "short-channel"]
---
> Punch Through는 gate가 채널을 지키기 전에 source와 drain 쪽 depletion이 먼저 연결돼 버리는 상황이다.

## What
- Punch Through는 채널이 너무 짧아 source/drain depletion region이 연결되며 발생하는 누설 메커니즘이다.

## How
- gate가 barrier를 세우기도 전에 drain 쪽 전계가 source 쪽까지 침투해 OFF 장벽을 사실상 우회한다.
- 채널 도핑, 구조, junction 프로파일이 모두 영향을 준다.
- [source:반도체 정리.pdf] 관점에서 보면 punch-through는 단순 누설이 아니라 source/drain depletion region이 서로 만나면서 gate 지배력이 약해진 상태다.
- 그래서 채널 길이 축소, 얕지 않은 junction, 약한 electrostatics가 겹치면 갑자기 off current가 튀는 식으로 드러날 수 있다.

## Why
- 단순히 문턱전압만 맞춘다고 해결되지 않고, 채널 길이와 전계 분포를 구조적으로 다시 설계해야 하기 때문이다.
- [[Halo Doping]]이 필요한 이유도 바로 여기 있다. 채널 전체를 무겁게 도핑하기보다 끝단 barrier를 보강해 depletion 연결을 늦추려는 것이다.
- 결국 punch-through는 왜 미세화가 단순 축소 문제가 아니라 도핑과 구조 재설계 문제인지 보여 주는 대표 사례다.

## Measure
- off current 증가, channel length 축소에 따른 leakage 급증, drain bias 민감도를 본다.
- [[DIBL]]과 같이 보면 barrier lowering이 더 큰지, depletion 연결이 더 큰지 감을 잡는 데 도움이 된다.

## Connections
- [[DIBL]]
- [[누설전류]]
- [[Halo Doping]]
- [[FinFET]]
- [[GAA]]
- [[누설전류 억제 전략]]

## Open Questions
- planar, FinFET, GAA 구조에서 punch-through 억제 메커니즘 차이를 더 보강할 수 있다.
