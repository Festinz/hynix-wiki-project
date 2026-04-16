---
title: "소스 요약 - 5대 공정"
type: source
created: 2026-04-15
updated: 2026-04-15
aliases: ["소스 요약 - 5대 공정"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: high
tags: ["source", "phase1", "전공정", "데이터"]
---
> 이 소스는 전공정 흐름과 데이터 해석의 기본 프레임을 동시에 잡아 준다.

## What
- 포토, 식각, 확산/이온주입, 박막 증착, CMP·세정을 하나의 전공정 흐름으로 설명한다.
- 계측 데이터, 설비 데이터, 소자 데이터, 수율 데이터라는 네 가지 데이터 축을 동시에 제시한다.
- FEOL에서 트랜지스터를 만들고 BEOL에서 금속 배선으로 연결한다는 큰 공정 구분도 함께 제시한다.

## How
- [source:hynix 지식 쌓기 5대 공정.pdf]를 바탕으로 [[5대 공정]], [[SPC]], [[FDC]], [[공정→계측→소자→수율 파이프라인]] 페이지를 구성했다.
- 공정 설명을 단순 정의가 아니라 why 질문과 데이터 해석 관점으로 재배치하는 출발점이 되었다.
- 원문에는 Photo = PR/alignment/exposure/develop, Etch = wet/dry/RIE, Diffusion = ion implantation/annealing, Thin Film = PVD/CVD/ALD, CMP/Cleaning 같은 키워드가 직접 제시되어 있어 노드 간 기본 축을 잡는 데 유용했다.
- 특히 박막 파트에서 CVD는 균일한 절연막, PVD는 금속막, ALD는 high-k gate와 연결된다는 설명이 있어 [[박막 증착]], [[Step Coverage]], [[High-K Metal Gate]]를 연결하는 기반이 되었다.

## Why
- 이 소스가 중요한 이유는 공정을 따로 떼어 보지 않고, 공정 결과를 데이터로 읽는 관점을 동시에 주기 때문이다.
- 특히 면접형 문답 구조가 아니라 실제 문제 해결 흐름처럼 설비→계측→소자→수율을 연결한다는 점이 위키의 뼈대와 잘 맞는다.
- 또한 "미세화될수록 공정 step 증가 -> 데이터 관리 중요"라는 문장이 있어, 사용자의 위키 목적을 지식 정리에서 데이터 해석 체계로 확장시키는 축이 되었다.

## Measure
- 대표 계측 항목으로 ADI CD, ACI CD, Overlay, 두께, Defect Count가 제시된다.
- 대표 소자 항목으로 Vth, SS, DIBL, 전류가 제시되며, 이들이 수율과 연결된다는 점이 중요하다.
- FDC 파라미터 예시로 pressure, temperature, gas flow, RF power, rotation/speed, valve position이 직접 적혀 있어 [[FDC]] 노드의 구체성을 높였다.

## Connections
- [[5대 공정]]
- [[포토리소그래피]]
- [[식각]]
- [[확산과 이온주입]]
- [[박막 증착]]
- [[CMP와 세정]]
- [[SPC]]
- [[FDC]]

## Open Questions
- 원문에 있는 일부 실무 조언과 공정 설명을 어디까지 위키 본문으로 승격할지 추가 정리가 필요하다.
