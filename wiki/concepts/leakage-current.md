---
title: "누설전류"
type: concept
created: 2026-04-15
updated: 2026-04-15
aliases: ["누설전류"]
sources: ["raw/core/반도체 정리.pdf", "src/semiconductor-site-master/apps/web/src/data/fundamentals.json", "https://sshmyb.tistory.com/168", "https://news.skhynix.co.kr/"]
confidence: high
tags: ["concept", "device", "leakage"]
---
> 누설전류의 역사는 미세화의 역사와 거의 같은 말이다.

## What
- 누설전류는 OFF 상태에서도 흐르는 전류로, HCI, gate oxide tunneling, DIBL, GIDL, punch-through 등 다양한 메커니즘을 포함한다.
- 같은 누설이라도 발생 위치와 원인이 달라, 구조/재료/도핑/전계 완화 전략도 각각 달라진다.

## How
- 각 메커니즘은 전계 집중, 산화막 박막화, short-channel effect, band-to-band tunneling 같은 서로 다른 원인으로 발생한다.
- 그래서 누설전류는 하나의 해법으로 끝나는 문제가 아니라, 전계 분포, 재료, 구조, 도핑을 각각 다른 방향으로 만져야 하는 묶음 문제다.

## Why
- 저전력과 고집적이 동시에 요구되면서 누설 억제는 공정·재료·구조 혁신의 직접 동기가 되었다.

## Measure
- off current, gate leakage, retention loss, Vth shift를 본다.
- 메커니즘별로는 gate leakage, junction leakage, subthreshold leakage처럼 구분해서 봐야 진짜 원인을 좁힐 수 있다.

## Connections
- [[문턱전압]]
- [[DIBL]]
- [[GIDL]]
- [[Punch Through]]
- [[Gate Oxide Tunneling]]
- [[Hot Carrier Injection]]
- [[High-K Metal Gate]]
- [[LDD]]
- [[Halo Doping]]
- [[FinFET]]
- [[GAA]]
- [[누설전류 억제 전략]]
- [[수율 분석]]

## Open Questions
- 메모리 소자와 로직 소자에서 leakage를 다루는 방식 차이를 더 보강할 수 있다.

## Leakage Types
### DIBL
- 어디서 발생하는가: drain 쪽 전계가 source-channel barrier까지 영향을 주는 짧은 채널 영역
- 왜 발생하는가: drain 전계가 barrier를 낮춰 [[문턱전압]]을 사실상 끌어내리기 때문
- 어떤 문제가 생기는가: OFF 전류 증가, Vth 감소, short-channel 제어 악화
- 어떻게 줄이는가: [[Halo Doping]], [[FinFET]], [[GAA]]로 electrostatics를 강화한다

### GIDL
- 어디서 발생하는가: gate-drain overlap 근처의 모서리 전계 집중 영역
- 왜 발생하는가: 강한 전계가 band-to-band tunneling을 유도하기 때문
- 어떤 문제가 생기는가: OFF leakage 증가, layout 의존성이 큰 누설 문제
- 어떻게 줄이는가: [[LDD]]로 전계 피크를 낮추고 overlap 및 spacer 조건을 조정한다

### HCI
- 어디서 발생하는가: 주로 drain 근처 고전계 영역
- 왜 발생하는가: 고에너지 carrier가 산화막/계면에 손상을 남기기 때문
- 어떤 문제가 생기는가: 시간 경과 후 Vth shift, drive current 저하, 신뢰성 열화
- 어떻게 줄이는가: [[LDD]]와 전계 완화 구조, 적절한 bias 조건으로 스트레스를 줄인다

### Punch Through
- 어디서 발생하는가: source/drain depletion region이 짧은 채널에서 맞닿는 영역
- 왜 발생하는가: gate가 barrier를 장악하기 전에 depletion 영역이 연결되기 때문
- 어떤 문제가 생기는가: gate 제어 상실, OFF leakage 급증
- 어떻게 줄이는가: [[Halo Doping]], [[FinFET]], [[GAA]]로 barrier와 electrostatics를 강화한다

### Gate Oxide Tunneling
- 어디서 발생하는가: 매우 얇아진 gate oxide 자체
- 왜 발생하는가: 산화막이 초박막이 되면서 전자가 직접 터널링하기 때문
- 어떤 문제가 생기는가: static power 증가, gate leakage 증가, 산화막 신뢰성 열화
- 어떻게 줄이는가: [[High-K Metal Gate]]와 [[High-k 유전체]]로 물리 두께를 확보하면서 EOT를 낮춘다

### PN Junction Leakage
- 어디서 발생하는가: source/drain와 body 사이 역바이어스된 PN 접합
- 왜 발생하는가: reverse bias하의 소수 캐리어 생성과 trap 관련 누설이 생기기 때문
- 어떤 문제가 생기는가: standby current 증가, retention 열화, 불량 민감도 증가
- 어떻게 줄이는가: 접합 품질 개선, defect 억제, 구조적으로는 SOI 계열 격리 전략이 유리하다

### Subthreshold Leakage
- 어디서 발생하는가: gate가 완전히 켜지지 않은 약한 반전 영역
- 왜 발생하는가: barrier가 완전히 차단되지 않아 diffusion current가 흐르기 때문
- 어떤 문제가 생기는가: static power 증가, 저전력 동작 악화
- 어떻게 줄이는가: [[문턱전압]] 설계, [[FinFET]], [[GAA]], SS 개선 구조를 활용한다

## 솔루션 매핑
| 솔루션 | 해결하는 누설전류 | 원리 |
|--------|-----------------|------|
| Halo doping | DIBL, Punch Through | 채널 도핑 농도 증가로 barrier 강화 |
| LDD | HCI, GIDL | drain 근처 전계 완화 |
| SOI | Junction leakage, Punch Through | body를 절연체로 격리 |
| FinFET | SCE 전반 | gate가 3면을 감싸 electrostatics 강화 |
| GAA/MBCFET | SCE 전반 | gate가 채널을 거의 전방향에서 제어 |

## 💡 생각해보기
- 누설전류를 줄이는 구조가 항상 on-current나 공정 복잡도 측면에서도 이득일까?
- 같은 OFF current 증가라도 DIBL, GIDL, Junction leakage 중 무엇이 원인인지 어떻게 가려낼 수 있을까?
