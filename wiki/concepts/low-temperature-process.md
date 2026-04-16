---
title: "저온 공정"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["저온 공정"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/HKMG.docx"]
confidence: medium
tags: ["concept", "thermal", "integration"]
---
> 미세화 이후의 좋은 공정은 더 뜨겁게 하는 공정보다, 꼭 필요한 만큼만 열을 쓰는 공정인 경우가 많다.

## What
- 저온 공정은 충분한 막질과 특성을 확보하면서도 하부 구조 손상과 재확산을 줄이기 위해 thermal budget을 낮춘 공정 전략이다.
- 특히 적층 구조가 많아질수록 상부 공정이 하부 구조를 망가뜨리지 않는 것이 중요해진다.

## How
- 긴 furnace anneal 대신 [[RTA]] 같은 짧은 열처리를 쓰거나, 증착 방식 선택에서 저온 PECVD/ALD 쪽을 택해 통합 부담을 줄인다.
- BEOL이나 민감한 유전체, 패키징 인접 공정에서는 공정 온도 제한이 사실상 재료 선택 기준이 된다.
- [source:hynix 지식 쌓기 5대 공정.pdf]와 [source:HKMG.docx]를 같이 읽으면, high-k/metal gate 같은 민감한 스택과 미세 도핑 프로파일은 높은 열 budget에 취약해 짧고 국소적인 열처리 쪽으로 점점 이동하게 된다.

## Why
- 온도가 높을수록 반응은 쉬워지지만, 도펀트 재확산, 계면 열화, 응력 증가, 하부 구조 손상이 함께 커지기 때문이다.
- 그래서 현대 공정에서는 '가장 잘 되는 조건'보다 '전체 integration이 감당 가능한 조건'이 더 중요해진다.

## Measure
- thermal budget, junction diffusion, 막 조성/밀도, 누설 특성 변화를 함께 본다.
- 같은 성능이라면 더 낮은 온도에서 구현되는 recipe가 integration 관점에서 더 유리한 경우가 많다.

## Connections
- [[박막 증착]]
- [[ALD Window]]
- [[RTA]]
- [[High-K Metal Gate]]
- [[PVD vs CVD vs ALD]]
- [[공정 통합 맵]]

## Open Questions
- low-temperature 공정이 항상 막질 열세를 갖는지, plasma assist와 후속 anneal 조합으로 어디까지 극복되는지 더 정리할 수 있다.
