---
title: "Wet vs Dry vs RIE"
type: comparison
created: 2026-04-15
updated: 2026-04-16
aliases: ["습식 식각 vs 건식 식각", "Wet vs Dry vs RIE"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["comparison", "etch", "anisotropy"]
---
> 식각 비교의 핵심은 얼마나 빨리 깎느냐보다, 얼마나 정확한 모양을 남기느냐다.

## What
- wet etch는 액상 화학 반응이 중심이다.
- dry etch는 플라즈마 기반 반응과 물리적 제거가 결합된 공정이다.
- [[RIE]]는 dry etch 안에서도 방향성과 선택비를 동시에 잡기 위한 대표 방식이다.

## How
| 관점 | Wet Etch | Dry Etch | RIE |
|------|----------|----------|-----|
| 주된 제거 메커니즘 | 액상 화학 반응 | 플라즈마 기반 반응 + 일부 물리 작용 | 반응성 라디칼 + 수직 가속 이온 |
| 방향성 | 등방성 | 조절 가능 | 강한 비등방성 |
| 장점 | 선택비, 처리량 | 미세 패턴 대응 | high AR 구조 대응, profile 제어 |
| 한계 | undercut | 장비 복잡성, 플라즈마 손상 | charging damage, window 관리 |
| 대표 사용 | 세정, strip | 일반 미세 식각 | 게이트, 콘택, HAR 식각 |

## Why
- 미세화 이전에는 “잘 녹느냐”가 더 중요했지만, 미세화 이후에는 “원하는 방향으로만 깎이느냐”가 더 중요해졌다.
- 따라서 high aspect ratio 구조가 등장한 뒤에는 wet보다 dry, dry 중에서도 [[RIE]] 쪽이 중심으로 이동했다.

## Measure
- [[선택비]], etch rate, profile angle, residue, [[ACI CD]], defect를 같이 본다.
- high AR 구조에서는 바닥 opening 여부와 측벽 손상까지 함께 봐야 한다.

## Connections
- [[식각]]
- [[RIE]]
- [[Aspect Ratio]]
- [[선택비]]
- [[CMP와 세정]]

## Open Questions
- DRIE, ALE, cryogenic etch를 포함한 확장 비교 페이지를 만들 수 있다.
