---
title: "5대 공정"
type: concept
created: 2026-04-15
updated: 2026-04-16
aliases: ["5대 공정"]
sources: ["raw/core/hynix 지식 쌓기 5대 공정.pdf", "raw/core/반도체 정리.pdf"]
confidence: high
tags: ["concept", "framework", "process"]
---
> 5대 공정은 외워야 할 목록이 아니라, 공정이 서로에게 무엇을 남기는지 보는 지도다.

## What
- 반도체 전공정의 큰 흐름을 [[포토리소그래피]], [[식각]], [[확산과 이온주입]], [[박막 증착]], [[CMP와 세정]]으로 묶어 이해하는 프레임이다.
- 원문 키워드 기준으로는 photo = PR/alignment/exposure/develop, etch = wet/dry/RIE, diffusion = ion implantation + annealing, thin film = PVD/CVD/ALD, 마지막은 CMP가 아니라 **CMP/cleaning**이다.

## How
- 포토가 패턴을 정하고, 식각이 형상을 만들고, 확산·이온주입이 전기적 성질을 주고, 박막 증착이 필요한 막을 올리고, C&C가 다음 스텝을 위한 표면을 돌려준다.
- 이 흐름은 단발이 아니라 반복 루프이며, 그 사이사이에 [[계측]], [[SPC]], [[FDC]], [[소자 특성 분석]], [[수율 분석]]이 계속 붙는다.

## Why
- 공정은 개별 스텝 최적화만으로는 이해되지 않는다. 앞 공정의 결과가 뒤 공정의 제약이 되고, 뒤 공정의 문제가 앞 공정 recipe를 다시 바꾸게 만든다.
- 예를 들어 식각 profile은 증착 coverage와 CMP 난이도로 이어지고, 도핑 프로파일은 누설전류와 문턱전압으로 번역된다.
- 그래서 5대 공정을 한 번에 보는 이유는 “왜 이 기술이 선택됐는가”를 앞뒤 공정까지 포함해 읽기 위해서다.

## Measure
- CD, overlay, thickness, defect, Vth, SS, DIBL, yield를 한 체인으로 본다.
- 특히 “무엇이 바뀌었고, 그것을 무엇으로 검증하는가”를 같이 보는 습관이 중요하다.

## Connections
- [[포토리소그래피]]
- [[식각]]
- [[확산과 이온주입]]
- [[박막 증착]]
- [[CMP와 세정]]
- [[공정→계측→소자→수율 파이프라인]]

## Open Questions
- 후공정과 패키징까지 포함한 확장 공정 지도는 overview에서 더 키울 수 있다.
