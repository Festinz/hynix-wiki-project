---
title: "문턱전압"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["문턱전압"]
sources: ["raw/metrology-yield/교안 2권.pdf", "raw/spotfire/[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf", "raw/core/HKMG.docx"]
confidence: high
tags: ["entity", "device", "vth"]
---
> Vth는 공정, 재료, 구조 변화가 소자 수준에서 어떻게 나타나는지 압축해서 보여 주는 값이다.

## What
- 문턱전압은 채널에 반전층이 형성되어 트랜지스터가 켜지기 시작하는 게이트 전압이다.
- Spotfire 1주차 용어집이 보여 주듯 MOSFET 동작을 가르는 기본 기준점이고, HKMG 문맥에서는 재료와 구조 선택이 가장 직접적으로 반영되는 값이다.

## How
- gate work function, oxide thickness, channel doping, short-channel effect가 함께 영향을 준다.
- 그래서 [[High-k 유전체]], [[금속 게이트]], [[Halo Doping]], [[LDD]] 같은 기술이 모두 결국은 Vth 안정화와 trade-off 관리로 모인다.
- [source:교안 2권.pdf] 맥락으로 읽으면 Vth는 단독 수치가 아니라 Idsat, SS, DIBL과 같이 봐야 원인을 좁힐 수 있는 전기적 서명(signature)에 가깝다.
- 예를 들어 oxide thickness 증가나 EOT 변화는 gate control과 leakage에 동시에 흔적을 남기고, channel doping 변화는 Vth와 mobility를 동시에 흔든다.

## Why
- Vth가 흔들리면 성능·전력·누설이 동시에 흔들리므로, 공정 변동을 소자 수준에서 읽는 대표 지표가 된다.
- 너무 낮은 Vth는 빠르지만 OFF leakage가 커지고, 너무 높은 Vth는 누설은 줄지만 on-current가 줄어든다.
- 결국 Vth는 "좋은 값 하나"가 있는 것이 아니라, 속도 x 전력 x 누설 x 수율 사이에서 공정이 어디에 착지했는지를 보여 주는 균형점이다.

## Measure
- Id-Vg curve에서 추출하며, lot/wafer/site별 분포와 target spec 이탈을 함께 본다.
- absolute value뿐 아니라 split 간 이동량, 온도/드레인 바이어스 조건 변화에 대한 민감도도 중요하다.
- 추출법도 하나가 아니다. constant-current, gm extrapolation 등 방법에 따라 수치가 달라질 수 있어, 공정 비교에서는 같은 extraction rule을 고정하는 것이 중요하다.
- [source:[KDC] Spotfire 활용 반도체 공정분석_1주차_ 반도체 기초지식 핵심용어 모음집(중).pdf] 수준의 용어 정의를 넘어, 위키에서는 Vth 분포가 공정 편차와 어떻게 연결되는지까지 함께 읽는다.

## Connections
- [[소자 특성 분석]]
- [[High-K Metal Gate]]
- [[DIBL]]
- [[Subthreshold Slope]]
- [[누설전류]]
- [[오버레이]]
- [[소자 특성 분석]]

## Open Questions
- different extraction method에 따른 Vth 정의 차이를 보완할 수 있다.
