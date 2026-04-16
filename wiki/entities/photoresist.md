---
title: "포토레지스트"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["포토레지스트"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "src/semiconductor-site-master/apps/web/src/data/rag-knowledge.json"]
confidence: high
tags: ["entity", "photo", "materials"]
---
> 포토의 핵심은 광원만이 아니라, 그 빛을 화학 반응으로 바꿔 주는 PR에 있다.

## What
- 포토레지스트는 polymer, PAC, solvent로 이루어진 감광성 고분자 재료다.
- 노광 전에는 균일한 막이어야 하고, 노광 후에는 선택적으로 용해도 차이를 보여야 하는 화학 시스템이다.
- [source:hynix 지식 쌓기 5대 공정.pdf]의 photo = PR/alignment/exposure/develop 묶음 안에서, PR은 광학 신호를 실제 화학 패턴으로 번역하는 핵심 재료다.

## How
- 노광 후 현상 과정에서 positive PR은 노광부가 녹고, negative PR은 비노광부가 녹는다.
- 실제 공정에서는 HMDS priming, bake, [[BARC]] 조합까지 포함한 스택 전체가 패턴 품질을 결정한다.
- 즉 PR만 좋아도 되는 것이 아니라, 하부 표면 상태([[HMDS]]), 반사 억제([[BARC]]), bake 조건이 함께 맞아야 ADI profile이 안정된다.

## Why
- 미세 패턴을 전사하려면 빛을 선택적으로 화학 변화로 바꿔 줄 재료가 필요하다.
- 왜 PR 조성이 중요한가 하면, 해상도만 높고 line edge roughness가 크면 이후 [[식각]]과 [[ACI CD]]에서 패턴 fidelity가 무너지기 때문이다.
- EUV 시대에는 감도, stochastic defect, outgassing까지 같이 관리해야 해서 PR은 더 이상 단순 소모재가 아니라 핵심 재료 기술이 된다.

## Measure
- 해상도, line edge roughness, adhesion, thickness, outgassing 특성을 함께 본다.
- 현상 후 profile collapse, scum, footing 같은 결함도 실무적으로 중요한 평가 항목이다.

## Connections
- [[포토리소그래피]]
- [[HMDS]]
- [[BARC]]
- [[ADI CD]]
- [[식각]]
- [[ACI CD]]

## Open Questions
- EUV용 PR의 shot noise와 stochastic defect 문제를 별도 보강할 수 있다.
