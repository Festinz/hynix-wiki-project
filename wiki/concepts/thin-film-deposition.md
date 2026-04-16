---
title: "박막 증착"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["박막 증착"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/HKMG.docx", "raw/core/Reactive Sputtering  발표자료.pptx", "raw/core/반도체 정리.pdf", "https://news.skhynix.co.kr/chemical-film-growth/", "https://news.skhynix.co.kr/", "https://sshmyb.tistory.com/category/%EB%B0%98%EB%8F%84%EC%B2%B4%EC%82%AC%EA%B4%80%ED%95%99%EA%B5%90%20%ED%9B%88%EB%A0%A8%EA%B3%BC%EC%A0%95/%EB%B0%98%EB%8F%84%EC%B2%B4%20%EC%A0%84%EA%B3%B5%EC%A0%95"]
confidence: high
tags: ["concept", "deposition", "PVD", "CVD", "ALD"]
---
> 증착은 층을 쌓는 공정이지만, 실제로는 재료·온도·구조 제약 사이에서 가장 그럴듯한 방법을 고르는 공정이다.

## What
- 웨이퍼 위에 다양한 막질을 형성하는 공정이며, PVD·CVD·ALD가 대표 방식이다.

## How
- 방식에 따라 line-of-sight, 기상 화학 반응, self-limiting 표면 반응이라는 서로 다른 원리가 작동한다.
- [source:SK하이닉스 뉴스룸 - 화학적으로 막을 성장시키는 방법, CVD] CVD는 LPCVD, PECVD, HDPCVD처럼 에너지 공급 방식과 압력 조건에 따라 다시 갈라지며, 막질과 열부담이 달라진다.
- [source:SK하이닉스 뉴스룸 - ALD, 원자를 이용해 박막을 만드는 방법] ALD는 200~400°C 수준의 낮은 온도와 우수한 step coverage로 3D 구조에 특히 강하다.
- [source:hynix 지식 쌓기 5대 공정.pdf]에서는 PVD는 금속막, CVD는 균일한 절연막, ALD는 high-k gate 계열에 연결해 설명하는데, 이 구분은 실제 양산에서 "같은 증착"이 아니라 목적이 다른 세 가지 선택지라는 뜻이다.
- [source:Reactive Sputtering 발표자료.pptx]의 TiN 예시는, 막질 요구가 barrier/전도막 쪽으로 갈수록 반응성 스퍼터링 같은 PVD 계열이 여전히 중요한 이유를 보여 준다.

## Why
- 막질이 같아도 구조와 thermal budget이 다르면 최적 증착 방식이 달라진다.
- 특히 3D 구조 시대에는 단순 증착 속도보다 [[Conformality]]와 [[Step Coverage]]가 중요해졌다.
- 또 BEOL이나 민감한 재료 위로 갈수록 [[저온 공정]] 요구가 커져, 같은 막이라도 공정 선택 기준이 다시 달라진다.
- 저온 공정이 중요한 이유는 다섯 가지로 요약할 수 있다: 하부 구조 열손상 억제, dopant redistribution 최소화, 다층 적층 보호, BEOL 금속 배선 보호, high-k/low-k 같은 열민감 재료 보호.
- 그래서 PVD는 단순하고 빠르지만 고종횡비에서 [[PVD Overhang]]과 bottom coverage 한계가 있고, CVD는 더 잘 감싸지만 열과 전구체 chemistry 제약이 있으며, ALD는 가장 정밀하지만 속도와 precursor window 제약을 감수해야 한다.
- 결국 why는 "막을 올릴 수 있나"가 아니라, 형상 제약 x 재료 제약 x 온도 제약 x 생산성을 동시에 버틸 수 있느냐의 문제다.

## Measure
- 두께, 조성, 균일도, conformality, step coverage, leakage를 본다.
- 여기에 deposition rate, film stress, void 발생 여부, 공정 온도까지 같이 봐야 실제 양산 적합성을 판단할 수 있다.

## Connections
- [[Reactive Sputtering]]
- [[PVD vs CVD vs ALD]]
- [[ALD Window]]
- [[Conformality]]
- [[Step Coverage]]
- [[PVD Overhang]]
- [[저온 공정]]
- [[High-K Metal Gate]]
- [[계측]]
- [[소자 특성 분석]]
- [[수율 분석]]

## Open Questions
- 박막 형성 이후 stress와 reliability를 별도 축으로 확장할 수 있다.

## 왜 저온 공정이 중요한가
1. Thermal budget 감소 -> 하부막과 기존 구조 열손상 억제
2. Dopant redistribution 최소화 -> 이온주입으로 만든 프로파일 보존
3. 다층 적층 구조 보호 -> 상부 공정이 하부 구조를 망가뜨리지 않게 함
4. BEOL 호환성 -> Cu, Al 배선 위에서는 대체로 400°C 이하가 유리
5. High-k, low-k, 유기물 계열 등 열민감 신소재 보호

## PVD Overhang 메모
- PVD는 line-of-sight 성향이 강해 고종횡비 구조에서 입구 쪽 증착이 먼저 진행된다.
- 그 결과 입구가 더 좁아지고 내부 도달이 어려워지며, overhang, void, poor bottom coverage가 나타날 수 있다.
- 해결 전략은 [[PVD vs CVD vs ALD]] 관점에서 CVD/ALD 전환, ionized PVD, collimated PVD, long throw 조건을 검토하는 데 있다.

## ALD Window 스케치
```text
GPC (Growth Per Cycle)
 ^
 |  응축 ──┐         ┌── decomposition
 |        │ ALD     │
 |        │ Window  │
 |        └─────────┘
 |_______________________________> 온도
```
- 너무 낮음: precursor 응축, 반응 불충분
- ALD Window: self-limiting 안정, GPC 일정
- 너무 높음: precursor 열분해 -> CVD-like, 자기제한 붕괴

## 💡 생각해보기
- 동일한 막질을 만들더라도 why가 PVD인지, CVD인지, ALD인지는 어떤 구조 제약에서 갈릴까?
- 막질이 좋아도 온도가 너무 높으면 하부 구조가 망가질 수 있는데, 이 trade-off를 어떻게 정량화할 수 있을까?
