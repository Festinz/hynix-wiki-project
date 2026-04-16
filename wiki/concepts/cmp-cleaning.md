---
title: "CMP와 세정"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["CMP와 세정", "C&C"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[Lecture] Spotfire.pdf", "https://sshmyb.tistory.com/229"]
confidence: high
tags: ["concept", "CMP", "clean"]
---
> 마지막 공정의 품질은 단순히 평탄하게 만드는 데서 끝나지 않고, 다음 스텝이 버틸 수 있는 표면을 돌려주는 데서 결정된다.

## What
- CMP는 화학적 반응과 기계적 연마를 동시에 써 표면을 평탄화하는 공정이다.
- 세정(cleaning)은 CMP 후 남은 slurry, particle, 오염물을 제거하는 공정이다.
- 따라서 5대 공정의 마지막은 CMP 단독보다 **C&C(CMP + Cleaning)** 로 읽는 편이 정확하다.

## How
- slurry의 화학 성분이 표면을 연화시키고, abrasive와 pad가 높은 부분을 우선 제거한다.
- 평탄화가 끝난 뒤에는 DI water, brush, megasonic 같은 방식으로 residue를 제거한다.
- [source:hynix 지식 쌓기 5대 공정.pdf]에서 CMP와 cleaning을 한 묶음으로 다루는 이유는, 평탄화만 하고 잔류물을 못 치우면 다음 [[포토리소그래피]]와 [[식각]]에서 다시 결함을 만들기 때문이다.

## Why
- 표면 높낮이가 크면 포토 초점 여유가 줄고, 이후 식각과 배선 신뢰성까지 흔들린다.
- cleaning이 부족하면 particle과 화학 잔류물이 contact issue, defect, leakage로 번역되어 결국 [[수율 분석]]에서 문제로 드러난다.
- 즉 CMP의 목적이 planarity라면 cleaning의 목적은 contamination break다.

## Measure
- removal rate, planarity, dishing, erosion, defect count, contact resistance를 본다.
- [source:[Lecture] Spotfire.pdf] 관점으로는 CMP/cleaning 이후 defect count와 electrical parametric 변화는 분리해서 보지 않는다.

## Connections
- [[5대 공정]]
- [[Cleaning]]
- [[계측]]
- [[데이터 기반 Fab]]
- [[수율 분석]]

## Open Questions
- slurry chemistry와 post-CMP cleaning chemistry를 재료별로 더 세분화한 노트가 필요하다.

## 💡 생각해보기
- 왜 “평탄화가 끝났다”와 “공정이 끝났다”는 같은 말이 아닐까?
- C&C를 제대로 못하면 다음 공정에서 어떤 종류의 defect가 가장 먼저 늘어날까?
