---
title: "위키 로그"
type: topic
created: 2026-04-15
updated: 2026-04-16
aliases: ["위키 로그"]
sources: ["CLAUDE.md"]
confidence: high
tags: ["log", "timeline", "operations"]
---

> ingest, 재생성, lint 결과를 누적 기록하는 운영 로그다.

## What
- 어떤 소스를 언제 반영했고, 어떤 노드를 새로 만들거나 보강했는지 남기는 작업 일지다.

## How
- 소스를 ingest할 때마다 생성/수정된 노트 묶음을 기록한다.
- build와 lint에서 발견한 문제도 함께 적는다.

## Why
- LLM 위키는 채팅이 아니라 파일이 기억을 보존해야 하므로, 운영 흔적도 문서화되어야 한다.

## Connections
- [[위키 인덱스]]
- [[전체 지식 지도]]

## [2026-04-15] 한글 위키 재생성
- PowerShell 인코딩 문제로 깨진 본문을 raw 추출본과 앱 데이터 기준으로 다시 생성했다.
- 공정 노트의 why 설명과 공정→계측→소자→수율 연결을 보강했다.

## [2026-04-15] why 중심 심화 보완
- [[아르곤]], [[할로젠 식각 가스]], [[HMDS]], [[High-k 유전체]], [[ALD Window]], [[Barrier Metal]]에 후보군 비교와 선택 이유를 보강했다.
- [[확산]], [[박막 증착]], [[식각]], [[CMP와 세정]], [[High-K Metal Gate]]에 `왜 이 방식인가` 관점을 추가했다.

## [2026-04-16] 인터랙티브/실무 노드 보강
- 앱 쪽에서는 wet vs dry vs RIE, diffusion 흐름, PVD/CVD/ALD, C&C 인터랙티브를 다시 만들고 공정 상세 라우트를 정리했다.
- 위키 쪽에서는 [[RIE]], [[Cleaning]], [[Aspect Ratio]], [[Sheet Resistance]], [[Four-Point Probe]], [[Alpha-Step]], [[Sputtering DOE]], [[Spotfire 상관관계 읽기]]를 추가했다.
- 루트의 비어 있던 [[계측]], [[누설전류]], [[문턱전압]], [[소자 특성 분석]], [[수율 분석]], [[폴리실리콘 게이트 vs 금속 게이트]] 노드를 허브 노트로 채웠다.

<!-- wiki-lint:start -->
## Lint Report (2026-04-15)
- unresolved wikilinks: 0
- orphan pages: 8
- process→metrology→device→yield chain gaps: 8
- weak cross references: 0

### Details
- unresolved: none
- orphan pages: [[poly-si-vs-metal-gate]], [[device-characterization]], [[leakage-current]], [[metrology]], [[yield-analysis]], [[threshold-voltage]], [[hynix-generation-codenames]], [[terminology-index]]
- chain gaps: [[photolithography]], [[etching]], [[diffusion]], [[ion-implantation]], [[thin-film-deposition]], [[cmp-cleaning]], [[high-k-metal-gate]], [[reactive-sputtering]]
- weak cross references: none
<!-- wiki-lint:end -->
