---
title: "TSV"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["TSV"]
sources: ["raw/core/반도체 정리.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_2주차_ 반도체 산업 Hot Issue.pdf", "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json"]
confidence: medium
tags: ["entity", "packaging", "HBM"]
---
> HBM의 대역폭은 DRAM 셀 자체만으로 생기는 것이 아니라, die 사이를 어떻게 수직 연결하느냐에서 결정된다.

## What
- TSV는 Through-Silicon Via의 약자로, 실리콘 다이를 관통해 수직 전기 연결을 만드는 구조다.

## How
- 여러 DRAM die를 적층한 뒤 TSV와 마이크로범프, 인터포저를 통해 넓은 I/O를 짧은 경로로 연결한다.
- 이 구조 덕분에 높은 bandwidth와 낮은 배선 지연을 동시에 달성할 수 있다.
- Spotfire 2주차의 패키징 축과 연결해 보면, TSV는 메모리 셀 혁신이라기보다 적층 패키징을 통해 시스템 병목을 푸는 수직 인터커넥트 기술로 읽는 편이 맞다.

## Why
- AI 가속기에서는 클럭보다 총 대역폭과 전력 효율이 중요해, 평면 배선만으로는 병목을 풀기 어렵기 때문이다.
- 따라서 TSV는 HBM을 단순 메모리 세대가 아니라 패키징 혁신으로 읽게 만드는 핵심 노드다.

## Measure
- bandwidth, 적층 수, thermal behavior, package yield, interconnect reliability를 본다.

## Connections
- [[HBM]]
- [[MR-MUF]]
- [[메모리 반도체]]
- [[산업 핫이슈]]
- [[SK하이닉스 메모리 포지셔닝]]

## Open Questions
- hybrid bonding 확대 시 TSV 역할이 어떻게 재편되는지 계속 추적할 필요가 있다.
