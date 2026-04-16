---
title: "BARC"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["BARC"]
sources: ["raw/core/반도체 정리.pdf", "raw/core/hynix 지식 쌓기 5대 공정.pdf"]
confidence: medium
tags: ["entity", "photo", "optics"]
---
> 미세 포토에서 빛은 내려가기만 하지 않고 다시 튀어 오기 때문에, BARC는 광학적 노이즈를 줄이는 안전장치가 된다.

## What
- BARC는 Bottom Anti-Reflective Coating의 약자로, PR 아래쪽에 두어 반사광을 줄이는 보조막이다.
- 특히 미세 패턴에서 standing wave와 swing effect를 줄이는 역할을 한다.

## How
- 입사광이 하부막에서 다시 반사되어 PR 내부 간섭을 만들지 않도록 광학 경로를 조절한다.
- 덕분에 PR 프로파일과 CD 균일도가 더 안정적으로 유지된다.
- [source:반도체 정리.pdf]와 [[포토리소그래피]] 문맥을 같이 보면, BARC는 photo stack 안에서 "빛 경로 보정층" 역할을 한다.
- 같은 노광량이어도 하부막 반사 조건이 다르면 PR 내부 standing wave가 달라질 수 있기 때문에, BARC는 광원보다도 substrate condition variation을 누르는 장치에 가깝다.

## Why
- 반사광이 크면 같은 노광 조건에서도 wafer 위치나 하부막 상태에 따라 CD가 흔들릴 수 있기 때문이다.
- 즉 BARC는 해상도를 키우는 재료라기보다, 이미 확보한 해상도를 실제 공정에서 잃지 않게 만드는 층이다.
- 미세화가 심해질수록 "평균적으로 잘 보이는 것"보다 wafer 전역에서 같은 결과가 나오는 것이 더 중요하므로, BARC의 가치도 균일도 안정화 쪽에서 커진다.

## Measure
- ADI CD 균일도, reflectivity, standing wave 억제 정도, PR profile 변화를 본다.
- 공정적으로는 CD 분포와 line edge roughness 개선 여부가 실효성을 보여 준다.
- BARC 유무에 따른 center-edge CD split, focus margin 차이도 비교 포인트가 된다.

## Connections
- [[포토리소그래피]]
- [[포토레지스트]]
- [[HMDS]]
- [[ADI CD]]
- [[오버레이]]

## Open Questions
- EUV용 underlayer와 기존 BARC의 역할 차이를 더 세분화할 수 있다.
