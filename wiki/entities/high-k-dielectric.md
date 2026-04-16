---
title: "High-k 유전체"
type: entity
created: 2026-04-15
updated: 2026-04-16
aliases: ["High-k 유전체"]
sources: ["raw/core/HKMG.docx", "https://sshmyb.tistory.com/168", "https://news.skhynix.co.kr/"]
confidence: high
tags: ["entity", "gate", "materials"]
---
> High-k의 핵심은 더 얇게 만드는 것이 아니라, 전기적으로는 얇고 물리적으로는 두껍게 만드는 데 있다.

## What
- HfO2, ZrO2처럼 SiO2보다 유전율이 높은 절연막 재료다.
- 실제 양산 관점의 핵심 후보는 Al2O3, ZrO2, TiO2, HfO2 같은 계열이며, 현재는 HfO2 계열이 가장 실용적인 균형점으로 받아들여진다.

## How
- 유전율이 높기 때문에 같은 capacitance를 더 두꺼운 물리막으로 구현할 수 있어 tunneling을 줄인다.
- 다만 계면 품질과 remote phonon scattering 같은 부작용이 생길 수 있어, 재료 도입만으로 모든 문제가 끝나지는 않는다.
- SiO2는 밴드갭과 계면 품질은 뛰어나지만 k=3.9라 너무 얇아져야 하고, TiO2는 k값은 매우 높지만 밴드갭이 낮아 leakage가 커지기 쉽다.
- HfO2는 k값(대략 20~25), 적절한 밴드갭, 열 안정성, Si 계면 품질, ALD 적용성 사이의 균형이 좋아 gate stack용 주력 재료가 되었다.
- ZrO2 역시 후보가 되지만, 실제 integration에서는 계면 안정성과 공정 호환성 측면에서 HfO2 계열이 더 널리 안착했다.
- Al2O3는 bandgap과 안정성은 좋지만 k가 상대적으로 낮아 "고유전" 도입의 이득이 충분히 크지 않을 수 있다.

## Why
- SiO2를 더 얇게 만들면 leakage가 급증하므로, 미세화 이후에는 high-k 도입이 필요했다.
- 중요한 것은 k값 하나만 높은 재료가 아니라, 높은 k x 충분한 bandgap x 열 안정성 x Si와의 계면 품질을 동시에 만족하는 재료를 고르는 것이다.
- [source:딴딴's 반도체사관학교] TiO2처럼 k는 높아도 bandgap이 낮으면 gate oxide로는 누설이 치명적일 수 있다.
- 그래서 high-k 후보군 중 HfO2가 "가장 높은 k"라서가 아니라, 실제 양산 가능한 trade-off의 중앙값이라서 선택되었다.

## Measure
- 핵심 지표는 EOT, leakage current, interface quality다.
- 여기에 mobility degradation, fixed charge, thermal stability도 같이 봐야 진짜로 usable한 high-k인지 판단할 수 있다.
- 결국 재료 선택 검증은 "k값이 높다"가 아니라, leakage를 줄이면서도 mobility와 Vth distribution을 감당 가능한 수준에 두느냐로 끝난다.

## Connections
- [[High-K Metal Gate]]
- [[ALD Window]]
- [[Gate Oxide Tunneling]]
- [[누설전류]]
- [[금속 게이트]]
- [[문턱전압]]
- [[ALD Window]]

## Open Questions
- interface layer와 remote phonon scattering까지 포함해 mobility trade-off를 더 정리할 필요가 있다.
