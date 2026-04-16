---
title: "DRAM"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["DRAM"]
sources: ["raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf", "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json"]
confidence: high
tags: ["entity", "memory", "device"]
---
> DRAM은 셀 하나를 얼마나 작게 만들 것인가와 동시에, 얼마나 안정적으로 charge를 유지할 것인가의 싸움이다.

## What
- DRAM은 capacitor에 저장된 전하를 transistor로 읽고 쓰는 휘발성 메모리다.
- [source:Spotfire 1주차] 용어집 기준으로는 "컴퓨터와 모바일 기기의 주기억장치로 가장 널리 쓰이는 메모리"라는 제품 정의가 먼저 주어진다.

## How
- 1T1C 구조를 기본으로 하고, 미세화가 진행될수록 capacitor 용량 유지와 leakage 억제가 핵심 과제가 된다.
- [source:Spotfire 1주차] 용어집 수준에서는 product 정의가 중심이지만, 위키에서는 [[누설전류]], [[문턱전압]], [[High-K Metal Gate]]까지 연결해 "왜 셀 스케일링이 어려운가"로 읽는다.
- 셀이 작아질수록 저장 전하가 줄어 retention이 나빠지고, access transistor 제어 여유도 줄어 공정 변동에 더 민감해진다.

## Why
- 주기억장치로 널리 쓰이며, AI 시대에는 HBM과 DDR 계열의 기반 기술이 된다.
- 즉 DRAM은 셀 물리만의 문제가 아니라, 범용 main memory에서 고대역폭 HBM까지 이어지는 큰 기술 줄기의 출발점이다.
- 그래서 DRAM의 why는 "빠른 메모리"라는 제품 정의를 넘어, 짧은 접근 시간과 대용량 시스템 메모리 역할 사이의 균형에 있다.
- SK하이닉스 맥락에서는 이 DRAM 축이 [[HBM]], TSV, 패키징 혁신으로 확장되며 AI 메모리 경쟁력의 출발점이 된다.

## Measure
- retention time, refresh overhead, access speed, power, yield를 본다.
- wafer 수준에서는 Vth distribution, leakage 분포, capacitor 관련 변동이 retention/refresh에 어떻게 번역되는지도 중요하다.

## Connections
- [[메모리 반도체]]
- [[HBM]]
- [[문턱전압]]
- [[누설전류]]
- [[TSV]]
- [[MR-MUF]]

## Open Questions
- 3D DRAM과 CUA 방향을 별도 확장 노트로 정리할 수 있다.
