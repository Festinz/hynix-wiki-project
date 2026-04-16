---
title: "포토리소그래피"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["포토리소그래피"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/metrology-yield/교안 1권.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf", "https://sshmyb.tistory.com/318", "https://sshmyb.tistory.com/319", "https://sshmyb.tistory.com/12"]
confidence: high
tags: ["concept", "photo", "patterning"]
---
> 포토는 패턴을 만드는 공정인 동시에, 이후 모든 오차의 출발점이 되는 공정이다.

## What
- 마스크의 패턴을 PR 위에 전사해 후속 식각·증착 공정의 좌표계를 정하는 공정이다.
- PR, HMDS, [[BARC]], 노광 광원, alignment, develop가 핵심 구성요소다.

## How
- 웨이퍼 표면을 prime한 뒤 PR을 도포하고, 마스크를 통해 빛을 쏘아 선택 영역만 화학적으로 바꾼 뒤 현상한다.
- 실제 공정에서는 HMDS priming, bake, [[BARC]] 반사 억제, develop 조건까지 포함한 스택 전체가 패턴 fidelity를 좌우한다.
- 이후 [[ADI CD]]와 [[오버레이]]를 측정해 패턴 품질을 확인한다.
- [source:딴딴's 반도체사관학교] 질문-답변 구조로 보면 포토는 광학, 재료, 현상, 정렬, 후속 식각까지 모두 연결된 시스템 공정으로 읽는 편이 맞다.

## Why
- 패턴이 처음부터 틀어지면 그 위에 아무리 좋은 식각·증착을 해도 최종 구조가 맞지 않는다.
- 또한 미세화가 심해질수록 광원 세대, PR 특성, alignment 정밀도가 전체 공정 수율을 좌우한다.
- [source:hynix 지식 쌓기 5대 공정.pdf]가 photo를 PR/alignment/exposure/develop 묶음으로 제시하는 이유도, 포토가 단순 노광 장비가 아니라 재료-정렬-현상 전체 시스템이기 때문이다.
- 특히 why 관점에서 [[HMDS]]는 "접착제"라서가 아니라, 탈수 -> 표면 소수화 -> PR 접착 안정화의 3단계를 통해 웨이퍼 표면을 PR 친화적으로 바꾸기 때문에 중요하다.
- [[BARC]] 역시 단순 보조막이 아니라, 하부 반사광이 PR 내부 간섭과 standing wave를 만들어 CD를 흔드는 것을 줄이기 위해 선택된다.
- 결국 포토의 선택 기준은 "빛을 쏘는가"가 아니라, 노광 전 표면 화학과 노광 중 광학 노이즈를 얼마나 통제하느냐에 있다.

## Measure
- 핵심 지표는 해상도, 오버레이, ADI CD, depth of focus다.
- 현상 직후의 line edge roughness와 defect도 함께 본다.
- [source:교안 1권.pdf] 기준으로 보면 포토 뒤에서 바로 [[ADI CD]]와 [[오버레이]]를 보는 이유는, 이후 [[식각]] 결과가 나빠졌을 때 원인이 photo인지 etch인지 분리하기 위해서다.
- 즉 포토 측정은 "잘 찍혔는가"를 넘어서, 후속 공정 문제의 책임 소재를 가르는 기준선 역할도 한다.

## Connections
- [[ADI CD]]
- [[오버레이]]
- [[포토레지스트]]
- [[HMDS]]
- [[BARC]]
- [[EUV]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- EUV stochastic defect와 high-NA EUV overlay budget을 별도 노트로 확장할 수 있다.

## 💡 생각해보기
- HMDS와 [[BARC]]를 모두 빼고 포토를 진행하면, 각각 어떤 종류의 불량이 먼저 눈에 띄게 될까?
- 같은 ADI CD가 나와도 이후 식각 결과가 달라질 수 있는 이유는 어디에 있을까?
