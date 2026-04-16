---
title: "HBM"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["HBM"]
sources: ["raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_2주차_ 반도체 산업 Hot Issue.pdf", "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json", "src/semiconductor-site-master/apps/web/src/data/metrics.json", "https://news.skhynix.co.kr/"]
confidence: high
tags: ["entity", "memory", "packaging"]
---
> HBM은 DRAM 한 세대를 잘 만드는 문제를 넘어, 적층과 패키징, 열, 인터포저를 함께 푸는 문제다.

## What
- HBM은 TSV와 실리콘 인터포저를 이용해 여러 DRAM die를 수직 적층한 고대역폭 메모리다.

## How
- 짧은 배선과 넓은 I/O를 통해 높은 bandwidth를 확보하고, 최신 세대는 12-Hi 36GB 스택과 1.5 TB/s급 대역폭을 지향한다.
- [source:SK하이닉스 뉴스룸] HBM4 세대 설명에서도 핵심은 단순 용량보다 더 넓은 I/O와 대역폭, 그리고 이를 버티는 적층/패키징 구조다.

## Why
- AI 가속기에서는 메모리 용량보다도 bandwidth와 전력 효율이 병목이 되므로 HBM이 중요해졌다.
- 즉 HBM은 "DRAM을 더 빠르게"가 아니라, 시스템 병목을 패키징과 인터커넥트까지 포함해 다시 푸는 메모리 전략이다.
- [source:Spotfire 2주차]가 메모리 반도체와 패키징을 같은 산업 이슈 묶음에 둔 이유도 여기에 있다. HBM은 소자 세대보다 패키징과 인터커넥트 전략에서 차별화가 크게 난다.

## Measure
- pin speed, bandwidth, stack capacity, thermal resistance, yield가 핵심 지표다.

## Connections
- [[메모리 반도체]]
- [[DRAM]]
- [[TSV]]
- [[MR-MUF]]
- [[SK하이닉스 메모리 포지셔닝]]
- [[산업 핫이슈]]

## Open Questions
- HBM4와 HBM4E 이후 logic base die 구조가 어떻게 바뀌는지 계속 추적할 필요가 있다.
