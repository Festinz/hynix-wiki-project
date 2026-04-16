# Hynix Wiki Project

SK hynix 중심의 반도체 지식을 하나의 연결된 위키로 정리하고, 이를 인터랙티브 웹사이트로 보여주는 개인 지식 시스템입니다.

이 프로젝트는 단순 면접 요약집이 아니라, 공정/소자/재료/계측/수율/패키징/산업 이슈를 서로 이어서 이해하기 위한 개인용 LLM Wiki입니다. 기본 철학은 Andrej Karpathy의 "LLM Wiki" 패턴을 따릅니다.

배포 주소: [https://web-flame-alpha-14.vercel.app](https://web-flame-alpha-14.vercel.app)

## 왜 만들었나

반도체 공부를 하다 보면 지식이 파일마다, 강의마다, 발표자료마다 끊겨 있습니다.

이 저장소의 목적은 그 파편을 다음처럼 다시 묶는 것입니다.

- 11개 raw source를 기반으로 지식을 연결된 wiki node로 재구성
- `왜 하필 그 재료/공정/구조가 선택됐는가`를 중심으로 설명
- Obsidian 스타일 graph view와 노트 뷰어를 웹으로 제공
- Perplexity API를 통해 최신 뉴스와 기술 업데이트를 기존 노드에 연결
- SK hynix 중심의 관점으로 HBM, TSV, MR-MUF, 메모리 전략까지 확장

## 현재 포함된 것

### Wiki

- `wiki/` 아래에 concept / entity / source / topic / comparison 노트
- 모든 노트는 `[[wikilink]]`로 상호 연결
- `index.md`, `overview.md`, `log.md` 운영
- source summary + cross-link 기반 구조

### Web App

- `/wiki`: Obsidian 느낌의 graph view
- `/wiki/[slug]`: 노션처럼 읽기 쉬운 노트 뷰어
- fundamentals / hynix / samsung / trends 페이지
- 공정 인터랙티브 컴포넌트
  - Wet vs Dry vs RIE
  - Diffusion / Ion Implantation / Annealing 흐름
  - PVD vs CVD vs ALD
  - CMP + Cleaning

### Live Updates

- Perplexity API 기반 최신 정보 수집
- wiki 노드별 업데이트 생성
- Vercel Cron으로 주기적 업데이트 가능
- Blob storage에 update JSON 저장

## 프로젝트 구조

```text
hynix-wiki-project/
├─ raw/                         # 불변 원천 자료
│  ├─ core/
│  ├─ metrology-yield/
│  └─ spotfire/
├─ wiki/                        # LLM이 관리하는 markdown wiki
│  ├─ concepts/
│  ├─ entities/
│  ├─ sources/
│  ├─ topics/
│  ├─ comparisons/
│  ├─ _updates/
│  ├─ index.md
│  ├─ overview.md
│  └─ log.md
├─ src/
│  └─ semiconductor-site-master/
│     ├─ apps/web/              # Next.js App Router 웹앱
│     └─ package.json
├─ tools/
│  └─ rebuild-wiki.mjs
├─ CLAUDE.md                    # 프로젝트 설계/스키마
└─ CODEX_PROMPT_v2.md           # 후속 보완 프롬프트
```

## Raw Source 구성

### 1. core

- 5대 공정 자료
- HKMG 문서
- Reactive Sputtering 발표자료
- 반도체 정리 PDF

### 2. metrology-yield

- 교안 1권
- 교안 2권
- 교안 3권

### 3. spotfire

- Spotfire lecture
- Spotfire 1주차
- Spotfire 2주차
- Spotfire 3주차

## 기술 스택

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- `@vercel/blob`
- Vercel Cron
- Perplexity API
- Markdown wiki dataset generator

## 핵심 설계 원칙

### 1. raw는 수정하지 않는다

`raw/` 는 원천 자료 보관소입니다. 여기는 불변입니다.

### 2. wiki는 파일 기반 지식 베이스다

질문-답변으로 휘발되는 방식이 아니라, 정리된 결과를 반드시 `wiki/`에 남깁니다.

### 3. 연결이 핵심이다

좋은 노트 하나보다, 서로 연결된 노트 묶음이 더 중요합니다.

예:

- 포토 → 식각 → 확산/이온주입 → 박막 → CMP/Cleaning
- 공정 → 계측 → 소자 특성 → 수율
- 누설전류 → HKMG → FinFET → GAA
- HBM → TSV → MR-MUF → SK hynix 전략

### 4. "왜 이 기술인가"를 설명한다

단순 정의를 넘어서 아래 질문에 답하는 것을 목표로 합니다.

- 왜 diffusion 대신 ion implantation인가
- 왜 Ar인가
- 왜 halogen etch gas인가
- 왜 Poly-Si에서 Metal Gate로 돌아갔는가
- 왜 ALD window가 중요한가
- 왜 low-temperature process가 중요해졌는가
- 왜 SPC와 FDC는 별개의 역할인가

## 로컬에서 실행하기

### 요구 사항

- Node.js 18+
- pnpm
- Vercel CLI (선택)

### 설치

```bash
cd src/semiconductor-site-master
pnpm install
```

### 개발 서버

```bash
cd src/semiconductor-site-master
pnpm dev
```

또는:

```bash
cd src/semiconductor-site-master
pnpm --filter web dev
```

### production build

```bash
cd src/semiconductor-site-master
pnpm --filter web build
```

## Wiki 데이터 재생성

웹앱은 `wiki/*.md` 를 읽어 `wiki.generated.json` 으로 변환한 뒤 렌더링합니다.

```bash
cd src/semiconductor-site-master/apps/web
pnpm run wiki:build
```

lint:

```bash
cd src/semiconductor-site-master/apps/web
pnpm run wiki:lint
```

보조 스크립트:

```bash
node tools/rebuild-wiki.mjs
```

## 환경 변수

이 프로젝트에서 실제로 사용하는 주요 환경 변수는 아래 3개입니다.

```bash
PERPLEXITY_API_KEY=
CRON_SECRET=
BLOB_READ_WRITE_TOKEN=
```

### 설명

- `PERPLEXITY_API_KEY`
  - 최신 뉴스/논문/기술 동향 수집
  - wiki 업데이트 생성

- `CRON_SECRET`
  - Vercel cron endpoint 보호용 bearer token

- `BLOB_READ_WRITE_TOKEN`
  - Vercel Blob에 업데이트/뉴스/트렌드 JSON 저장

## Vercel 설정

### Cron

현재 `src/semiconductor-site-master/apps/web/vercel.json` 기준:

- `/api/cron/fetch-news` : 매일 00:00, 09:00
- `/api/cron/fetch-trends` : 매주 월/목 00:00
- `/api/cron/wiki-updates` : 매일 21:00

### 배포

```bash
cd src/semiconductor-site-master/apps/web
vercel deploy --prod
```

## Obsidian에서 보기

`wiki/` 폴더를 그대로 Obsidian vault처럼 열어도 됩니다.

이 저장소는 웹사이트와 Obsidian 양쪽에서 같은 markdown을 재사용하는 구조입니다.

다만 `.obsidian/` 설정은 로컬 전용이라 git에는 포함하지 않도록 했습니다.

## 주요 라우트

- `/`
  - 홈

- `/wiki`
  - 전체 knowledge graph

- `/wiki/[slug]`
  - 개별 노트 보기

- `/fundamentals`
  - 공정/소자/누설전류/HKMG 관련 설명

- `/hynix`
  - SK hynix 중심 기술/제품/전략 페이지

- `/samsung`
  - 비교 참고용 페이지

## 현재 위키의 주제 축

### 공정 기술 축

- Photolithography
- Etching
- Diffusion
- Ion Implantation
- Thin Film Deposition
- CMP + Cleaning
- RIE
- Thermal Oxidation
- Annealing

### 계측 → 소자 → 수율 축

- ADI / ACI CD
- Overlay
- Four-point probe
- Sheet resistance
- Device characterization
- Leakage current
- SPC / FDC
- Yield analysis

### 산업 / 데이터 축

- Spotfire 기반 데이터 해석
- Data-driven fab
- Industry hot issue
- HBM / TSV / MR-MUF
- SK hynix memory positioning

## 이 저장소를 읽는 방법

처음 보면 아래 순서가 가장 자연스럽습니다.

1. `wiki/overview.md`
2. `wiki/index.md`
3. `wiki/concepts/five-processes.md`
4. `wiki/concepts/process-to-yield-pipeline.md`
5. `wiki/concepts/high-k-metal-gate.md`
6. `wiki/concepts/leakage-current.md`
7. `wiki/topics/sk-hynix-memory-positioning.md`

웹에서는 `/wiki` 에서 그래프를 먼저 보고, 관심 노드를 눌러 개별 노트로 들어가면 됩니다.

## 현재 상태 요약

- 위키 노드가 웹과 Obsidian 양쪽에서 읽히는 구조
- Gemini 기반 면접 코치 기능 제거
- Perplexity 중심 live update 구조 유지
- SK hynix 중심 서사로 콘텐츠 정리
- 그래프 뷰는 단색 node + hover neighborhood 강조 방식으로 개선

## 앞으로 보강할 수 있는 것

- local graph depth 토글
- 2-hop neighborhood highlight
- wiki lint 결과 자동 리포트 강화
- note diff / ingest diff 추적
- 최신 업데이트와 기존 노드의 자동 문단 병합

## 참고 문서

- `CLAUDE.md`
- `CODEX_PROMPT_v2.md`
- Andrej Karpathy LLM Wiki 패턴

---

이 저장소는 "지식을 모아두는 곳"이 아니라, "지식이 서로 연결되는 방식까지 드러내는 곳"을 목표로 계속 자라나도록 설계했습니다.
