---
name: scrape-ai-news
description: 최신 AI 뉴스·기사를 스크랩해서 md 파일로 정리. "AI 뉴스 스크랩", "최신 기사 정리", "AI 뉴스 모아줘", "최신 AI 소식" 등의 요청에 사용. 해외·국내 소스에서 병렬 수집 후 날짜별로 정리하고, 한글 번역과 핵심 기사 내용 요약까지 단계별로 수행. Use when the user asks to collect, scrape, or summarize recent AI news/articles into a markdown file.
---

# 최신 AI 뉴스 스크랩 스킬

최신 AI 관련 뉴스·기사·논문을 여러 소스에서 수집해 한글 md 파일로 정리한다.
모든 출력은 AGENTS.md 규칙에 따라 한글로 작성. 고유명사(회사명·제품명·사람 이름)와 기술 용어(LLM, AI, CPU, IPO 등)는 영어 그대로 유지.

## 기본 소스 목록

> 소스 검증 이력은 작업 디렉토리의 `ai-news-sources.md` 참고. 사용자가 별도 파일로 관리 중이면 최신 내용을 우선 반영.

### 핵심 소스 (항상 시도, 1차 병렬 그룹)

해외 모델·제품 발표:

- **OpenAI 블로그**: https://openai.com/news/
- **Anthropic 뉴스룸**: https://www.anthropic.com/news
- **Google AI 블로그**: https://blog.google (모델·도구 발표)
- **Google DeepMind 블로그**: https://deepmind.google/discover/blog/
- **NVIDIA 블로그**: https://blogs.nvidia.com (인프라·하드웨어)

커뮤니티·논문·분석:

- **Hacker News 메인**: https://news.ycombinator.com (AI 관련 글 선별, 추천수 높은 순)
- **ArXiv cs.AI 최근**: https://arxiv.org/list/cs.AI/recent
- **Hugging Face Blog**: https://huggingface.co/blog (모델 발표, Daily Papers, 튜토리얼 — 게시 빈도 높음)
- **The Batch (DeepLearning.AI)**: https://deeplearning.ai/the-batch (주간 종합: Research/Business/Science/Hardware/Culture)
- **Ahead of AI (Sebastian Raschka)**: https://magazine.sebastianraschka.com (LLM 아키텍처 심층 분석)

IT 뉴스 (해외):

- **VentureBeat AI**: https://venturebeat.com/category/ai (엔터프라이즈 AI·에이전트·인프라)
- **The Verge AI**: https://theverge.com/ai-artificial-intelligence (정책·저작권·제품 발표)
- **TechCrunch**: https://techcrunch.com
- **Reuters**: https://reuters.com (통신사)

한국:

- **AI타임즈**: https://www.aitimes.com (AI 전문 매체, 링크 다수)
- **AI포스트**: https://www.aipostkorea.com/ (AI 전문 매체, 링크 다수)

### 보조 소스 (사용자 요구 또는 시간 여유 시 추가, 2차 병렬 그룹)

해외:

- **MIT Technology Review**: https://www.technologyreview.com/topic/artificial-intelligence/ (JavaScript 필요로 실패 가능성 높음 — 실패 시 안내만)
- **SemiAnalysis**: https://newsletter.semianalysis.com/archive (반도체·AI 인프라 심층, 본문은 페이월 — **헤드라인·요약만 무료 접근, 제목 수집용으로 활용**)
- **Interconnects**: https://interconnects.ai (모델 심층 분석)
- **Simon Willison**: https://simonwillison.net (개발자 관점 LLM 노트)
- **Import AI**: https://jack-clark.net (AI 정책 주간지)
- **Stratechery**: https://stratechery.com (비즈니스 분석)
- **The Information**: https://theinformation.com (업계 내부·단독 보도, 일부 페이월)
- **AI Snake Oil**: https://aisnakeoil.com (AI 회의주의 비판)
- **Anthropic 연구**: https://www.anthropic.com/research
- **OpenAI 레서핑**: https://openai.com/research

한국 IT/AI 매체:

- **전자신문**: https://www.etnews.com
- **ZDNet Korea**: https://www.zdnet.co.kr
- **디지털데일리**: https://www.ddaily.co.kr
- **아이뉴스24**: https://www.inews24.com
- **ITWorld Korea**: https://www.itworld.co.kr
- **바이라인**: https://byline.network
- **AI 리포트**: https://aireport.kr (AI 특화)
- **보안뉴스**: https://www.boannews.com (보안 특화 — 보안 AI 이슈 있을 때)
- **데일리시큐**: https://www.dailysecu.com (보안 특화)
- **플래텀**: https://plutus.cc (스타트업·AI 트렌드)
- **인공지능신문**: 기타 한국 AI 매체

## 워크플로우

### 1단계: 날짜 범위 확인 → 검증: 사용자가 범위 인지

- 사용자가 날짜를 명시하면 그 범위 사용.
- 명시하지 않으면 "최근 7일"을 기본값으로 제안하고 진행.
- 파일명 규칙: `ai-news-YYYY-MM-DD-onwards.md` (시작일 기준). 이미 같은 파일 있으면 "copy" 접미사 붙이지 말고 사용자에게 확인.

### 2단계: 소스 병렬 수집 → 검증: 핵심 소스 최소 6개 이상 응답

- 핵심 소스 14개를 한 번에 병렬 webfetch (단일 메시지에 여러 tool call). 한 번에 너무 많으면 그룹 분할(예: 해외 모델 5개 + 분석·논문 4개 + IT 뉴스 4개 + 한국 1개).
- 형식: `markdown`.
- ArXiv는 제출 폭증(수백~수천 건)하므로 첫 페이지만 가져오고 주요 선별(10~15건).
- SemiAnalysis는 본문 페이월이므로 아카이브 헤드라인·요약만 수집 — 본문 요약 시도 금지.
- NVIDIA/Google AI 블로그(blog.google)는 DeepMind와 별개 소스로 중복 주의. Google 계열은 OpenAI/Anthropic과 중복 빈도 높음 → 가장 대표 소스에 배정.
- MIT Technology Review가 JavaScript 필요로 실패하면, 실패 사실을 파일 하단 "수집 제한 안내"에 기록.
- 보조 소스는 핵심 소스 응답 부족·사용자 요구 있을 때 2차 병렬 그룹으로 추가 수집. 한국 매체(전자신문·ZDNet 등)는 한국 기업·정책 이슈가 풍부할 때 우선 추가.

### 3단계: 날짜 필터링 → 검증: 기간 내 기사만 포함

- 각 소스에서 기준일 이후 기사만 추출.
- Hacker News: AI 키워드(AI, model, agent, LLM, GPT, Claude, Gemini, chip, GPU 등)로 필터. 추천수 높은 순.
- ArXiv: cs.AI 최근 제출 중 주목할 만한 주요 논문 10~15건 선별. 제목·간단 설명 포함. 전체 1,300+건 요약 시도 금지.
- Hugging Face Blog: 모델 발표·Daily Papers 중 기간 내 글 선별. GLM·Cohere·NVIDIA 등 다른 소스와 중복 시 가장 관련 높은 소스에 배정.
- The Batch: 주간 이슈 단위이므로 해당 주 이슈 번호·날짜 명시. 각 섹션(Research/Business/Science/Hardware/Culture)별 대표 1~2건 선별.
- Ahead of AI: 심층 분석 글은 분량이 길어도 핵심 아키텍처 포인트만 발췌.
- SemiAnalysis: 헤드라인·요약만 수집했음을 명시, 본문 미접근 안내.
- VentureBeat / The Verge: 제품 발표·정책·저작권 이슈 폭넓게 커버. OpenAI/Anthropic 전용 서브페이지 참고 가능.
- 한국 매체(전자신문·ZDNet Korea 등): 한국 기업(SK하이닉스·SKT·LG CNS·네이버 등)·정책 이슈 위주로 선별. AI타임즈와 중복 시 AI타임즈 우선.
- Google DeepMind: "Month Year" 표기 항목은 정확 일자 미확정이므로 별도 섹션으로 분리하고 안내 명시.

### 4단계: md 파일 작성 → 검증: 날짜별 섹션 + 링크 포함

구조:

```
# AI 뉴스 정리 (기간)
> 수집일, 기준, 출처
## 핵심 요약 (이번 주 대표 이슈 3~5개)
## YYYY-MM-DD (요일)
### 소스명
- 기사 제목 [링크]
## 주요 흐름 분석 (5개 테마)
## 수집 제한 안내
```

- 각 기사는 제목 + 링크 형식.
- 중복 기사(여러 소스에서 같은 이슈)는 가장 대표적인 소스 한 곳에 배치하고, 다른 섹션에서는 "(상세 요약은 X/Y 섹션 참고)"로 참조.

### 5단계: 한글 번역 → 검증: 영어 제목·설명·카테고리 없음

- 영어 제목, 영어 설명문, 영어 카테고리("Security", "Models", "Responsibility & Safety", "Company", "points" 등)를 모두 한글로 번역.
- 유지할 것: 고유명사(OpenAI, Claude, GLM-5.2, Jalapeño 등), 기술 용어(LLM, AI, ERP, CPU, IPO, SPAC, SaaS 등), 사람 이름, 회사명, 제품명.
- AGENTS.md "한글 표시" 규칙 준수.

### 6단계(옵션): 핵심 기사 내용 요약 → 검증: 요약이 사실 기반

사용자가 "내용 요약"을 요구하면:

1. 핵심 기사 10~15건 선정.
2. 각 기사 링크를 병렬 webfetch로 직접 방문.
3. 각 기사에 5~10줄 분량의 내용 요약 추가 (핵심 수치·사실·의미 중심).
4. 요약은 `> **내용 요약**: ...` 형식으로 기사 제목 아래에 인용 블록으로 작성.
5. 나머지 기사는 제목+링크만 유지.
6. 파일 하단 "내용 요약" 섹션에 몇 건을 요약했는지 명시.

요약 범위가 클 경우 사용자에게 범위 확인 (핵심만 / 날짜별 대표 / 전부). 기본값은 "핵심 10~15건".

## 주의사항

- webfetch는 한 번에 여러 URL을 병렬로 호출 (단일 메시지에 여러 tool call) — 순차 호출 금지, 시간 낭비.
- ArXiv 전체(1,300건+)를 요약하려 하지 말 것 — 주요 선별만.
- SemiAnalysis 본문은 페이월 — 헤드라인·요약만 수집, 본문 요약 시도 금지.
- The Batch는 주간 단위 발행 — 날짜 정밀 필터링 대신 주 단위로 포함 여부 판단.
- NVIDIA 블로그·Google AI 블로그(blog.google)는 DeepMind와 별개 소스 — Google 계열 중복 주의.
- 한국 매체는 한국 기업·정책 이슈가 있을 때만 추가 수집 — 무조건 전체 소스 돌리지 말 것.
- 자동으로 commit하지 말 것. 사용자가 명시적으로 요구할 때만.
- 파일 덮어쓰기 전에 반드시 Read 도구로 기존 내용 확인.
- "수집 제한 안내" 섹션에 실패한 소스·페이월 소스·선별 기준·날짜 불확정 항목을 투명하게 기록.
- 소스 검증 이력·후보 목록은 작업 디렉토리의 `ai-news-sources.md`가 있으면 우선 참고·갱신.

## 파일 저장 위치

기본: 현재 작업 디렉토리 루트에 `ai-news-YYYY-MM-DD-onwards.md`.
사용자가 별도 경로 요구하면 그 경로 사용.
