---
title: "EUV"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["EUV"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_2주차_ 반도체 산업 Hot Issue.pdf"]
confidence: high
tags: ["entity", "photo", "lithography"]
---
> EUV는 더 짧은 파장을 쓴다는 한 문장으로 끝나는 기술이 아니라, 노광·마스크·수율·비용을 함께 흔드는 전환점이다.

## What
- EUV는 13.5nm 파장의 광원으로 미세 패턴을 형성하는 리소그래피 기술이다.

## How
- ArF immersion보다 더 짧은 파장을 이용해 multi-patterning 부담을 줄이고 더 작은 feature를 직접 인쇄한다.
- [source:Spotfire 2주차] 관점으로는 EUV는 단일 장비 기술이 아니라 High-NA EUV, pellicle, EUV 포토레지스트, 공급망 안정화까지 포함한 생태계 문제다.

## Why
- 노드가 줄어들수록 기존 광원과 pattern splitting만으로는 비용과 정렬 오차가 감당되지 않기 때문이다.
- 동시에 High-NA EUV 장비 가격, 공급 부족, ASML 의존도, 소재 국산화 이슈까지 따라오므로 "좋아서 쓴다"보다 "안 쓰면 다음 노드가 너무 비싸진다"에 가깝다.

## Measure
- resolution, stochastic defect, overlay budget, throughput를 함께 본다.

## Connections
- [[포토리소그래피]]
- [[ADI CD]]
- [[산업 핫이슈]]
- [[메모리 반도체]]

## Open Questions
- High-NA EUV의 생산성·마스크·pellicle 과제를 별도 노트로 확장할 수 있다.
