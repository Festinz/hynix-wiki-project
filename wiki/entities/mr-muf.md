---
title: "MR-MUF"
type: entity
created: 2026-04-15
updated: 2026-04-15
aliases: ["MR-MUF"]
sources: ["raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_2주차_ 반도체 산업 Hot Issue.pdf", "src/semiconductor-site-master/apps/web/src/data/hynix-tech.json", "https://news.skhynix.co.kr/"]
confidence: medium
tags: ["entity", "HBM", "packaging"]
---
> MR-MUF는 단순 포장 공정이 아니라, HBM 수율과 열/신뢰성을 동시에 좌우하는 패키징 선택이다.

## What
- MR-MUF는 Mass Reflow Molded Underfill의 약자로, HBM 적층 패키징에서 underfill을 형성하는 방식이다.

## How
- 적층된 die와 bump 사이의 기계적·열적 안정성을 높이면서 생산성과 신뢰성을 확보하는 방향으로 쓰인다.
- 공개 자료 기준으로는 낮은 압력 조건과 자기 정렬 효과를 활용해 고단 적층과 열 방출 측면에서 이점을 노리는 전략으로 읽힌다.

## Why
- HBM은 die 적층 수가 늘수록 열, 응력, warpage, 수율 문제가 커지므로 underfill 전략이 차별화 포인트가 된다.
- SK하이닉스가 MR-MUF를 강조하는 이유도 단순 packaging 공정 차이가 아니라, 적층 생산성과 열 방출 성능을 동시에 확보하려는 선택으로 읽을 수 있다.
- [source:SK하이닉스 뉴스룸] HBM 고단 적층 설명을 같이 읽으면, MR-MUF는 TSV 자체 못지않게 수율과 신뢰성의 숨은 병목을 푸는 공정 선택으로 보인다.
- Spotfire 2주차가 패키징을 별도 산업 축으로 잡는 것도, MR-MUF 같은 underfill/적층 기술이 이제는 부품 공정이 아니라 제품 경쟁력의 일부가 되었기 때문이다.

## Measure
- 열 저항, warpage, 패키지 신뢰성, 수율 관점에서 성능을 판단한다.
- 고단 적층으로 갈수록 underfill 공정의 균일성과 void 억제가 실제 양품률을 좌우한다.

## Connections
- [[HBM]]
- [[TSV]]
- [[SK하이닉스 메모리 포지셔닝]]
- [[산업 핫이슈]]

## Open Questions
- 공개 자료 기준으로 세부 구조 설명은 제한적이므로, low-to-medium confidence를 유지하며 업데이트할 필요가 있다.
