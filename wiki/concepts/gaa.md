---
title: "GAA"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["GAA"]
sources: ["raw/core/반도체 정리.pdf", "src/semiconductor-site-master/apps/web/src/data/fundamentals.json"]
confidence: medium
tags: ["concept", "device", "3d"]
---
> GAA는 gate가 채널을 더 많이 감싸면 누설을 더 잘 잡을 수 있다는 아이디어의 극단에 가깝다.

## What
- GAA는 Gate-All-Around의 약자로, gate가 채널을 거의 전 방향에서 둘러싸는 구조다.
- nanosheet나 nanowire 형태로 구현되며 FinFET 다음 세대로 자주 언급된다.
- FinFET의 3면 제어보다 한 단계 더 나아가, gate가 채널을 거의 완전히 감싸는 구조적 해법이다.

## How
- 채널 둘레 전체를 gate가 제어하므로 short-channel effect 억제력이 더 높고, leakage와 SS 개선 여지가 크다.
- 같은 이유로 공정 난이도와 구조 균일도 요구도 함께 상승한다.
- 그래서 [[DIBL]], [[Punch Through]], [[Subthreshold Slope]]를 더 낮출 수 있고, 동일 노드에서도 성능/전력 최적화 여지가 커진다.

## Why
- FinFET 이후에도 더 짧은 채널과 더 낮은 누설을 동시에 요구받으면서 electrostatics를 한 단계 더 강화할 필요가 있었기 때문이다.
- 즉 GAA는 새로운 유행이 아니라, planar -> FinFET로도 남아 있던 electrostatics 한계를 더 밀어붙인 결과다.

## Measure
- off current, SS, DIBL, channel uniformity, nanosheet 폭/두께 variation을 본다.

## Connections
- [[누설전류]]
- [[DIBL]]
- [[Punch Through]]
- [[FinFET]]
- [[누설전류 억제 전략]]

## Open Questions
- MBCFET와 nanosheet 구현 세부 차이를 별도 비교 노트로 확장할 수 있다.
