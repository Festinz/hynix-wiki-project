---
title: "NAND Flash"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["NAND Flash"]
sources: ["raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf", "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json"]
confidence: high
tags: ["entity", "memory", "storage"]
---
> NAND는 저장 밀도 확장의 대표 사례이고, 3D 적층이 이미 산업 표준이 된 메모리다.

## What
- NAND Flash는 floating gate 또는 charge trap 구조로 데이터를 저장하는 비휘발성 메모리다.
- [source:Spotfire 1주차]는 이를 "전원이 없어도 저장되는 메모리"로 정의하며, DRAM과 가장 먼저 대비되는 축으로 제시한다.

## How
- 수직 적층을 통해 셀 수를 늘리며, 식각과 증착의 high aspect ratio 기술이 핵심 역할을 한다.
- 그래서 [[박막 증착]], [[식각]], [[Step Coverage]], [[Conformality]]가 NAND에서는 제품 경쟁력으로 바로 연결된다.
- 3D NAND는 메모리 구조 문제이면서 동시에 high aspect ratio 공정 통합 문제이기도 하다.

## Why
- 대용량 저장장치의 밀도와 비용 경쟁력을 위해 필수적이다.
- 그래서 NAND는 속도보다 저장 밀도와 원가, DRAM은 저장 유지보다 접근 속도와 작업 메모리 성격이 더 중요하다는 산업적 분화가 생긴다.
- 즉 NAND의 why는 "느리지만 싸고 많이 담는다"가 아니라, 셀을 수직으로 쌓아 면적당 저장 밀도를 계속 끌어올릴 수 있다는 점에 있다.
- 이 때문에 NAND는 로직보다도 증착/식각의 형상 제어력이 제품 세대 경쟁의 핵심으로 더 직접 연결된다.

## Measure
- 층수, program/erase endurance, retention, latency, yield를 본다.
- 공정 관점에서는 channel hole profile, 막 균일도, string variation이 결국 endurance와 retention 분포로 번역된다.

## Connections
- [[메모리 반도체]]
- [[박막 증착]]
- [[식각]]
- [[산업 핫이슈]]
- [[Step Coverage]]
- [[Conformality]]

## Open Questions
- 3D NAND와 차세대 storage class memory의 경계를 어떻게 볼지 추가 논의가 필요하다.
