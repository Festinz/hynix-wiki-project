---
title: "용어 인덱스"
type: topic
created: 2026-04-15
updated: 2026-04-15
aliases: ["용어 인덱스", "Terminology Index"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf", "https://sshmyb.tistory.com/category/%EB%B0%98%EB%8F%84%EC%B2%B4%EC%82%AC%EA%B4%80%ED%95%99%EA%B5%90%20%ED%9B%88%EB%A0%A8%EA%B3%BC%EC%A0%95/%EB%B0%98%EB%8F%84%EC%B2%B4%20%EC%A0%84%EA%B3%B5%EC%A0%95"]
confidence: high
tags: ["topic", "glossary", "index"]
---
> 흩어진 용어를 한 곳에서 찾기 위한 빠른 참조 페이지다.

## What
- 계측/형상, 소자/재료, 포토 용어를 한 페이지에서 훑을 수 있게 모아 둔 인덱스다.

## How
- 각 용어는 1~2줄 정의와 함께, 더 읽어야 할 핵심 노드로 연결된다.

## Why
- 위키가 커질수록 용어가 여러 페이지에 흩어지므로, 빠르게 재접속할 수 있는 허브가 필요하다.

## Measure
- 이 페이지에서 주요 용어를 찾은 뒤 최소 하나 이상의 핵심 개념 페이지로 곧바로 이동할 수 있어야 한다.

## Connections
- [[위키 인덱스]]
- [[5대 공정]]
- [[계측]]
- [[누설전류]]

## Open Questions
- 후공정/패키징 용어를 별도 섹션으로 분리할지 검토할 수 있다.

## A. 계측/형상 용어
- Aspect Ratio: 구조의 깊이/폭 비. high AR일수록 [[PVD Overhang]], [[Conformality]], [[Step Coverage]] 해석이 중요해진다.
- Step Coverage: 단차 구조 상단·측벽·바닥의 막 두께 비. [[Step Coverage]], [[박막 증착]] 참고.
- Conformality: 막이 구조를 얼마나 균일하게 따라가는지 보는 개념. [[Conformality]], [[ALD Window]] 참고.
- Selectivity: 한 재료를 다른 재료보다 얼마나 더 잘 제거하는지 보는 비율. [[선택비]], [[식각]] 참고.
- Uniformity: wafer 내 위치별 결과 편차가 얼마나 작은지 보는 지표. [[계측]], [[수율 분석]] 참고.
- Etch Rate: 단위 시간당 제거 속도. [[식각]], [[선택비]] 참고.
- Deposition Rate: 단위 시간당 막 성장 속도. [[박막 증착]], [[Reactive Sputtering]] 참고.
- Loading Effect: 패턴 밀도 차이로 국부 etch/deposition 속도가 달라지는 현상. [[식각]], [[수율 분석]] 참고.
- CD: critical dimension, 핵심 선폭. [[ADI CD]], [[ACI CD]], [[계측]] 참고.
- Overlay: 층간 정렬 오차. [[오버레이]], [[포토리소그래피]] 참고.
- Defect Inspection: particle, scratch, residue 같은 결함을 보는 검사. [[계측]], [[CMP와 세정]], [[수율 분석]] 참고.

## B. 소자/재료 용어
- Spacer: gate 옆에 형성되는 측벽 절연 구조로, [[LDD]]와 overlap 제어에 중요하다. [[확산과 이온주입]], [[누설전류]] 참고.
- Silicide: Si와 금속이 반응해 접촉 저항을 줄이는 화합물층. [[Barrier Metal]], [[CMP와 세정]]과 함께 읽으면 좋다.
- Barrier Metal: 금속 확산을 막으면서 전기적 연결을 유지하는 얇은 금속막. [[Barrier Metal]], [[High-K Metal Gate]] 참고.
- Hard Mask: PR보다 내식성이 높은 마스크층. [[식각]], [[포토리소그래피]] 참고.
- High-k: 높은 유전율을 가진 절연막 계열. [[High-k 유전체]], [[High-K Metal Gate]] 참고.
- Metal Gate: poly-Si를 대체한 금속 전극. [[금속 게이트]], [[High-K Metal Gate]] 참고.
- Poly-Si Gate: 한동안 표준이었던 도핑 폴리실리콘 게이트. [[폴리실리콘 게이트]], [[폴리실리콘 게이트 vs 금속 게이트]] 참고.
- Gate Oxide: gate와 channel 사이 절연막. [[Gate Oxide Tunneling]], [[High-k 유전체]] 참고.
- Junction: source/drain와 body가 만나는 PN 영역. [[확산]], [[확산과 이온주입]], [[누설전류]] 참고.
- Self-Aligned Gate: gate를 기준으로 source/drain 위치를 맞추는 구조. [[포토리소그래피]], [[확산과 이온주입]] 참고.

## C. Photo 용어
- PR (= Polymer + PAC + Solvent): 노광과 현상으로 패턴을 만드는 감광성 재료. [[포토레지스트]], [[포토리소그래피]] 참고.
- HMDS: 탈수 -> 소수화 -> 접착 안정화 순서로 작동하는 표면 전처리제. [[HMDS]], [[포토리소그래피]] 참고.
- BARC: 반사광을 줄여 CD 변동을 줄이는 하부 반사 방지막. [[BARC]], [[포토리소그래피]] 참고.
- Soft Bake: PR 도포 후 용매를 날려 막을 안정화하는 단계. [[포토리소그래피]], [[포토레지스트]] 참고.
- PEB: post exposure bake, 노광 후 화학 반응을 안정화하는 단계. [[포토리소그래피]], [[포토레지스트]] 참고.
- Develop: 노광 후 용해도 차이를 이용해 패턴을 꺼내는 단계. [[포토리소그래피]], [[ADI CD]] 참고.
- Positive/Negative PR: 노광부가 녹는지, 비노광부가 녹는지에 따라 나뉘는 PR 방식. [[포토레지스트]], [[포토리소그래피]] 참고.
