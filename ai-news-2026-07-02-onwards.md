# AI 뉴스 스크랩 (2026-07-02 ~ 07-04)

> 수집일: 2026-07-05
> 기준: 해외 핵심 소스 14개 + 한국 AI타임즈, 기간 내 기사 선별
> 출처: OpenAI·Anthropic·Google·DeepMind·NVIDIA·Hacker News·ArXiv·Hugging Face·The Batch·VentureBeat·The Verge·TechCrunch·Reuters·AI타임스

---

## 핵심 요약 (이번 기간 대표 이슈)

1. **Anthropic Fable 5 재배포 후속**: 7/2 사이버 안전장치·jailbreak 심각도 평가 프레임워크 제안 공개 (Amazon·Microsoft·Google 등 공동).
2. **Alibaba, Claude Code 사내 사용 금지**: 백도어 리스크·중국 사용자 데이터 추적 우려로 자체 코드 도구로 회수.
3. **Hacker News 7/4 AI 토론 폭증**: GPT-5.5 Codex reasoning-token 클러스터링 성능 저하, Claude Code 세션/캐시 유출 가능성, "모델은 좋아졌는데 도구는 정체" 논쟁.
4. **OpenAI 정부 지분 5% 제안**: AI 붐 수익 일부를 연방 거버넌스에 할당 방안 검证.
5. **Z.ai ZCode 출시**: GLM-5.2 공식 IDE로 Cursor·Claude Code·GitHub Copilot 도전.

---

## 2026-07-04 (금)

### Anthropic
- **Fable 5 사이버 안전장치·jailbreak 프레임워크 상세 공개** (7/2 게시, 카테고리 발표)
  - Fable 5 재배포(7/1 전격 복귀)에 따른 사이버 보안장치 상세 설명
  - Amazon·Microsoft·Google 등 Glasswing 파트너와 함께 **jailbreak 심각도 업계 표준 평가 프레임워크 제안**
  - [Fable 5 Safeguards & Jailbreak Framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework)
- **Claude Sonnet 5 출시** (6/30, 기간 초과지만 후속 논의): 코딩·에이전트·전문 작업 프론티어 성능, Opus 4.8 대비 할인가
  - API 가격: 입력 $2/M, 출력 $10/M (8/31 이후 $3/$15로 인상, 여전히 Opus $5/$25 대비 저렴)
  - [Claude Sonnet 5](https://www.anthropic.com/news/claude-sonnet-5)
- **Claude Science (과학자용 AI 워크벤치) 베타 공개**: 생물학부터 시작, 단백질 3D 구조 등 시각화·감사 가능 산출물
  - [Claude Science](https://www.anthropic.com/news/claude-science-ai-workbench)

### Hacker News (추천수 높은 AI 글)
- **GPT-5.5 Codex reasoning-token clustering, 성능 저하 가능성** (224 points, 78 comments)
  - [github.com/openai/codex/issues/30364](https://github.com/openai/codex/issues/30364)
- **Better Models: Worse Tools** — Armin Ronacher, 모델은 좋아졌는데 개발자 도구 품질 정체 (144 points)
  - [pocoo.org/2026/7/4/better-models-worse-tools](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/)
- **Potential session/cache leakage between workspace instances (Claude Code)** (286 points, 130 comments)
  - [github.com/anthropics/claude-code/issues/74066](https://github.com/anthropics/claude-code/issues/74066)
- **Mouse: Precision Editing Tools for AI Coding Agents** — coding 에이전트 정밀 편집 도구 (12 points)
  - [hic-ai.com](https://hic-ai.com)
- **The Log Is the Agent** (arXiv 2605.21997) — 에이전트 아키텍처로서의 로그 (17 points)
  - [arxiv.org/abs/2605.21997](https://arxiv.org/abs/2605.21997)

### VentureBeat
- **Trunk Tools, 문서 검토 60일→10일로 단축** — 범용 모델 대신 전용 스택 도입 사례
  - [venturebeat.com/orchestration/trunk-tools-stack](https://venturebeat.com/orchestration/trunk-tools-stack-cut-document-review-from-60-days-to-10-by-ditching-general-purpose-models)
- **America's 250th, AI 기반 집단지능 실험** — 250인 토론 집단지능 AI (Louis Rosenberg)
  - [venturebeat.com/technology/how-americas-250th-birthday](https://venturebeat.com/technology/how-americas-250th-birthday-became-a-test-of-ai-powered-collective-intelligence)

### The Verge
- **Anthropic, 자체 신약 개발 의지** — Claude Science 기반 AI 신약 붐 (단 환자 도달까지는 갈 길)
  - [theverge.com/ai-artificial-intelligence/961311](https://www.theverge.com/ai-artificial-intelligence/961311/anthropic-claude-science-ai-drug-development)
- **Midjourney 의료용 초음파 스캐너 비하인드 영상** — 많은 의문 남아
  - [theverge.com/ai-artificial-intelligence/961265](https://www.theverge.com/ai-artificial-intelligence/961265/midjourney-medical-ultrasound-scanner-behind-the-scenes-video)
- **팬픽션 커뮤니티 vs AI, 그리고 자기 자신** (Jessica Weatherbed)
  - [theverge.com/tech/960854](https://www.theverge.com/tech/960854/ai-fanfiction-ao3-claude-detector)

### TechCrunch
- **Google 신광고, AI 도움으로 쓴 독립선언서 상상** (7/4)
  - [techcrunch.com/2026/07/04/new-google-commercial](https://techcrunch.com/2026/07/04/new-google-commercial-imagines-a-declaration-of-independence-written-with-help-from-ai/)
- **Midjourney, 할리우드 스튜디오에 AI 사용 상세 공개 요구**
  - [techcrunch.com/2026/07/04/midjourney-wants-hollywood-studios](https://techcrunch.com/2026/07/04/midjourney-wants-hollywood-studios-to-reveal-the-details-of-their-ai-usage/)
- **Alibaba, 직원 Claude Code 사용 금지** 보도
  - [techcrunch.com/2026/07/04/alibaba-reportedly-bans-claude-code](https://techcrunch.com/2026/07/04/alibaba-reportedly-bans-employees-from-using-claude-code/)
- **Mistral AI 설명 — OpenAI 경쟁사 전체 가이드**
  - [techcrunch.com/2026/07/04/what-is-mistral-ai](https://techcrunch.com/2026/07/04/what-is-mistral-ai-everything-to-know-about-the-openai-competitor/)

### AI타임즈 (국내)
- **Naver "이미지 중심 AI 검색으로 진화"** — 9년 멀티모달 기술력, 이제 이미지 기반 정보 이해
  - [aitimes.com 212445](https://www.aitimes.com/news/articleView.html?idxno=212445)
- **"테스트 타임 컴퓨트가 새로운 스케일링 법칙" — '엣지벤치' 공개**
  - [aitimes.com 212425](https://www.aitimes.com/news/articleView.html?idxno=212425)
- **'AI 토큰 지출' 지표 첫 하락세** — AI 거품 붕괴 vs 수요 조정 의견 충돌
  - [aitimes.com 212434](https://www.aitimes.com/news/articleView.html?idxno=212434)
- **알리바바, 직원 '클로드 코드' 사용 금지** — '중국 사용자 비밀 추적' 여파
  - [aitimes.com 212423](https://www.aitimes.com/news/articleView.html?idxno=212423)
- **Tesla, 직원 AI 사용료 주당 200달러로 제한** — 비용 급증 제동
  - [aitimes.com 212424](https://www.aitimes.com/news/articleView.html?idxno=212424)
- **젠슨 황 '가죽 재킷', 소더비 경매** — 낙찰가 9000만원 예상
  - [aitimes.com 212433](https://www.aitimes.com/news/articleView.html?idxno=212433)
- **Amazon, 온디바이스 AI 칩 설계** — 화면 없는 자체 AI 기기 곧 공개
  - [aitimes.com 212429](https://www.aitimes.com/news/articleView.html?idxno=212429)
- **KAIST, AI 에이전트 전력 비용 규명** — 챗봇보다 최대 136배 에너지 사용
  - [aitimes.com 212437](https://www.aitimes.com/news/articleView.html?idxno=212437)
- **한국딥러닝 기고 "기업 LLM 시대, 경쟁력은 컨텍스트 관리 시스템에"**
  - [aitimes.com 212435](https://www.aitimes.com/news/articleView.html?idxno=212435)
- **미스트랄, 수학 증명·코드 검증 '린스트랄 1.5' 공개** — 퍼트넘벤치 역대 최고 성적
  - [aitimes.com 212428](https://www.aitimes.com/news/articleView.html?idxno=212428)
- **엔비디아 차세대 '루빈 울트라' 4칩렛 → 2칩렛 선회** — 양산 현실 고려
  - [aitimes.com 212421](https://www.aitimes.com/news/articleView.html?idxno=212421)
- **인텔, 코어 울트라·제온 CPU 일부 가격 인상** — 공급망 비용·강한 수요 반영
  - [aitimes.com 212422](https://www.aitimes.com/news/articleView.html?idxno=212422)
- **'클링 AI' 4조 원 확보** — Alibaba·Tencent·Baidu·중동 자본 합세
  - [aitimes.com 212427](https://www.aitimes.com/news/articleView.html?idxno=212427)

---

## 2026-07-03 (목)

### The Batch (Andrew Ng) — Issue 360
- **OpenAI GPT-5.6 패밀리**: GPT-5.6 Sol(플래그십), GPT-5.6 Omni(멀티모달), GPT-5.6 Flash(경량) 동시 출시
- **로봇 훈련 새 방식**: 시뮬레이션-실세계 간 domain randomization 기법 발전
- **모델이 모델을 호출**: LLM 기반 에이전트 오케스트레이션 패턴 확산
- [The Batch Issue 360](https://www.deeplearning.ai/the-batch/issue-360)

### NVIDIA Blog
- **NVIDIA·파트너, 미국 내 제조 투자 "Build in America, for America"**
  - [blogs.nvidia.com/blog/nvidia-and-partners-build-in-america](https://blogs.nvidia.com/blog/nvidia-and-partners-build-in-america-for-america/)
- **NVIDIA, AI Compute at Scale — 자본 파트너 초청, AI 인프라 구축 가속**
  - [blogs.nvidia.com/blog/nvidia-unlocks-ai-compute-at-scale](https://blogs.nvidia.com/blog/nvidia-unlocks-ai-compute-at-scale-capital-partners-to-power-ai-infrastructure-buildout/)

### Google AI Blog
- **Nano Banana 2 Lite + Gemini Omni Flash** — 고품질 영상·대화형 편집, 가장 빠른 비용효율 Gemini Image 모델
  - [blog.google: gemini-omni-flash-nano-banana-2-lite](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni-flash-nano-banana-2-lite/)
- **Gemini Spark 업데이트** — macOS 출시, Canva/Instacart 연동, Tasks/Keep 연결
  - [blog.google: gemini-spark-updates-june-2026](https://blog.google/innovation-and-ai/products/gemini-app/gemini-spark-updates-june-2026/)

### AI타임즈 (7/3 게시분)
- **저커버그 "AI 에이전트 개발 속도 예상보다 느려"** — 사내 전체회의 공개 불만, 조직 개편 한계 인정
  - [aitimes.com 212385](https://www.aitimes.com/news/articleView.html?idxno=212385)
- **MS 코파일럿 소비자·기업용 전면 통합** — 8월 '업무형 슈퍼 앱' 진화
  - [aitimes.com 212399](https://www.aitimes.com/news/articleView.html?idxno=212399)
- **알리바바, 에이전트 도구 선택 프레임워크 '스킬위버' 공개** — 토큰 사용량 99.9% 절감
  - [aitimes.com 212408](https://www.aitimes.com/news/articleView.html?idxno=212408)
- **메타, 바이브 코딩 게임·앱 소셜 플랫폼 '포켓' 출시**
  - [aitimes.com 212395](https://www.aitimes.com/news/articleView.html?idxno=212395)
- **xAI, '보이스 에이전트 빌더' 베타 공개** — 코드 없이 음성 AI 구축
  - [aitimes.com 212402](https://www.aitimes.com/news/articleView.html?idxno=212402)
- **오픈AI 5% 제안, 트럼프 행정부·앤트로픽 지분 논의 "아직 없어"**
  - [aitimes.com 212389](https://www.aitimes.com/news/articleView.html?idxno=212389)
- **MS, 6000명 '최대 규모' FDE 전담 조직 신설** — 25억 달러 투자, 멀티모델 전략 지원
  - [aitimes.com 212387](https://www.aitimes.com/news/articleView.html?idxno=212387)
- **백악관, AI '출시 가이드라인' 다음 주 발표** — OpenAI·Anthropic 최종 조율
  - [aitimes.com 212388](https://www.aitimes.com/news/articleView.html?idxno=212388)
- **소프트뱅크, 미국서 10GW AI 클라우드 서비스 계획** — "제2의 창업"
  - [aitimes.com 212407](https://www.aitimes.com/news/articleView.html?idxno=212407)
- **SKT, '구글 AI 플랜' 구독 서비스 출시** — 제미나이/나노 바나나/노트북LM 할인
  - [aitimes.com 212404](https://www.aitimes.com/news/articleView.html?idxno=212404)
- **삼성, 영남에 60조 원 투자** — '글로벌 피지컬 AI 혁신 클러스터' 선언
  - [aitimes.com 212420](https://www.aitimes.com/news/articleView.html?idxno=212420)
- **구글 차세대 '제미나이 플래시' 테스트 중** — LM 아레나에서 포착
  - [aitimes.com 212397](https://www.aitimes.com/news/articleV.html?idxno=212397)
- **"한국 AI, 패배주의 벗어나야"** — OpenAI·MIT·NYU 전문가 권고 (하드웨어·차세대 AI 기회)
  - [aitimes.com 212410](https://www.aitimes.com/news/articleView.html?idxno=212410)

### TechCrunch
- **올해 AI 용어집 (Glossary)** — 환각·에이전트·토큰 등 필수 용어 정리
  - [techcrunch.com/2026/07/03/the-only-ai-glossary](https://techcrunch.com/2026/07/03/artificial-intelligence-definition-glossary-hallucinations-guide-to-common-ai-terms/)
- **브라우저 전쟁, 더 이상 검색이 아니다** — Chrome/Safari 대안
  - [techcrunch.com/2026/07/03/as-the-browser-wars-heat-up](https://techcrunch.com/2026/07/03/as-the-browser-wars-heat-up-here-are-the-hottest-alternatives-to-chrome-and-safari-in-2026/)

### Reuters
- **알리바바, Anthropic 코딩 도구 사용 금지** — 백도어 리스크 주장
  - [reuters.com/world/china/alibaba-ban-claude-code](https://www.reuters.com/world/china/alibaba-ban-claude-code-workplace-over-alleged-backdoor-risks-source-says-2026-07-03/)
- **AI 경쟁, 실리콘밸리 모방 약점 폭로** (Breakingviews)
  - [reuters.com/commentary/breakingviews/ai-fight-exposes-silicon-valleys-mimetic-flaw-2026-07-03](https://www.reuters.com/commentary/breakingviews/ai-fight-exposes-silicon-valleys-mimetic-flaw-2026-07-03/)

### ArXiv (cs.AI, 7/3 = 228건 중 주요 선별)
- **Distributed Attacks in Persistent-State AI Control** [arxiv 2607.02514](https://arxiv.org/abs/2607.02514)
- **Online Safety Monitoring for LLMs** (ICML 2026 Workshop) [2607.02510](https://arxiv.org/abs/2607.02510)
- **ReContext: Recursive Evidence Replay as LLM Harness for Long-Context Reasoning** [2607.02509](https://arxiv.org/abs/2607.02509)
- **What LLM Agents Say When No One Is Watching** — 멀티 에이전트 토론의 사회구조·잠재 목적 출현 [2607.02507](https://arxiv.org/abs/2607.02507)
- **G-RRM: Guiding Symbolic Solvers with Recurrent Reasoning Models** [2607.02491](https://arxiv.org/abs/2607.02491)
- **EvoPolicyGym: 자율 정책 진화評価** [2607.02440](https://arxiv.org/abs/2607.02440)
- **Text-Driven 3D Indoor Scene Synthesis in Non-Manhattan Environments** [2607.02407](https://arxiv.org/abs/2607.02407)
- **DRIFTLENS: 개인화 LLM의 메모리 유발 추론 드리프트 측정** [2607.02374](https://arxiv.org/abs/2607.02374)
- **DRIFTLENS** 외 — 점진적 멀티모달 학습의 '숨겨진 망각', 모델 편집, 에이전트 메모리 등 다수
- **Coding-agents can replicate scientific machine learning papers** [2607.02134](https://arxiv.org/abs/2607.02134)
- **ContextNest: 자율 AI 에이전트용 검증 가능 컨텍스트 거버넌스** [2607.02116](https://arxiv.org/abs/2607.02116)
- **OntoLearner: LLM 기반 온톨로지 학습 모듈 라이브러리** (Nature Communications 검수) [2607.01977](https://arxiv.org/abs/2607.01977)
- 전체 1,216건 등록(7/3 기준). 키워드: LLM 추론 최적화, 멀티모달 이해, 코드 생성, 환각 완화, AI 안전성, 자율 에이전트 메모리
- 출처: [arxiv.org/list/cs.AI/recent](https://arxiv.org/list/cs.AI/recent)

---

## 2026-07-02 (목)

### Hacker News
- 7/4 토론 위주 (7/2 직전 AI 키워드 글은 7/4 상단 섹션에 포함)

### VentureBeat
- **알리바바, 새로운 AI 프레임워크** — 도구 전부 로딩 건너뛰어 에이전트 토큰 99% 절감
  - [venturebeat.com/orchestration/new-alibaba-ai-framework](https://venturebeat.com/orchestration/new-alibaba-ai-framework-skips-loading-every-tool-cutting-agent-token-use-99)
- **Z.ai, ZCode 출시** — Cursor·Claude Code·GitHub Copilot 도전. GLM-5.2 공식 IDE, BYOK 지원
  - [venturebeat.com/technology/z-ai-launches-zcode](https://venturebeat.com/technology/z-ai-launches-zcode-to-challenge-cursor-claude-code-and-github-copilot-in-ai-coding)
- **Anthropic, Fable 5 글로벌 복귀** — 미국 수출통제 명령 철회 후 (상세는 7/1 섹션, 기간 초과지만 7/2 추궁)
  - [venturebeat.com/technology/anthropic-is-bringing-back-claude-fable-5](https://venturebeat.com/technology/anthropic-is-bringing-back-claude-fable-5-globally-after-us-lifts-export-control-order-where-can-enterprises-access-it)

### The Verge
- **Microsoft 'Copilot OS' 영상 유출** — Aion, AI 네이티브 경량 Windows 컨셉
  - [theverge.com/tech/961195/microsoft-copilot-os-aion-leak](https://www.theverge.com/tech/961195/microsoft-copilot-os-aion-leak)
- **Cloudflare, 다목적 크롤러 제한** — 9/15부터 검색+AI 훈련 혼용 봇 차단, 퍼블리셔 통제권 강화
  - [theverge.com/ai-artificial-intelligence/960795/cloudflare-is-cracking-down-on-multi-purpose-crawlers](https://www.theverge.com/ai-artificial-intelligence/960795/cloudflare-is-cracking-down-on-multi-purpose-crawlers)
- **Weave Robotics, $8,000 빨래 접기 로봇 'Isaac 1' 예약 판매**
  - [theverge.com/tech/960615/you-can-now-pre-order-this-8000-laundry-folding-robot](https://www.theverge.com/tech/960615/you-can-now-pre-order-this-8000-laundry-folding-robot)
- **OpenAI, Trump 행정부에 AI 붐 5% 지분 제안**
  - [theverge.com/ai-artificial-intelligence/960588/openai-government-5-percent-stake-trump](https://www.theverge.com/ai-artificial-intelligence/960588/openai-government-5-percent-stake-trump)

### TechCrunch
- **Mark Zuckerberg, AI 에이전트 진전 예상보다 느리다고 직원 통보**
  - [techcrunch.com/2026/07/02/mark-zuckerberg-tells-staff-that-ai-agents-havent-progressed-as-quickly-as-hed-hoped](https://techcrunch.com/2026/07/02/mark-zuckerberg-tells-staff-that-ai-agents-havent-progressed-as-quickly-as-hed-hoped/)
- **AI 진짜 비용 경고 — Google과 Amazon 사례** (Tim De Chant)
  - [techcrunch.com/2026/07/02/a-warning-sign-about-ais-real-cost](https://techcrunch.com/2026/07/02/a-warning-sign-about-ais-real-cost-courtesy-of-google-and-amazon/)
- **Meta, 바이브 코딩 게임 'Pocket' 조용히 출시**
  - [techcrunch.com/2026/07/02/meta-quietly-launches-vibe-coded-gaming-app-pocket](https://techcrunch.com/2026/07/02/meta-quietly-launches-vibe-coded-gaming-app-pocket/)
- **Hopper, FTC 합의 $35M — 숨겨진 수수료 부당 청구**
  - [techcrunch.com/2026/07/02/travel-app-hopper-to-pay-35m-in-ftc-settlement](https://techcrunch.com/2026/07/02/travel-app-hopper-to-pay-35m-in-ftc-settlement-over-unfairly-charging-hidden-fees/)
- **TV Time 앱 종료 — 회사 AI 집중**
  - [techcrunch.com/2026/07/02/popular-tv-tracking-app-tv-time-is-shutting-down-as-company-focuses-on-ai](https://techcrunch.com/2026/07/02/popular-tv-tracking-app-tv-time-is-shutting-down-as-company-focuses-on-ai/)

### Hugging Face Blog
- **Hugging Face + Cerebras, Gemma 4 실시간 음성 AI 파이프라인** (7/1)
  - [huggingface.co/blog/cerebras-gemma4-voice-ai](https://huggingface.co/blog/cerebras-gemma4-voice-ai)
- **ScarfBench — 기업 Java 프레임워크 마이그레이션 에이전트 벤치마크** (IBM Research, 6/30)
  - [huggingface.co/blog/ibm-research/scarfbench](https://huggingface.co/blog/ibm-research/scarfbench)
- **DiScoFormer — 밀도·스코어 동시 처리 단일 트랜스포머** (Allen AI, 6/29)
  - [huggingface.co/blog/allenai/discoformer](https://huggingface.co/blog/allenai/discoformer)
- **vLLM 서버, HF Jobs에서 한 줄 실행** (6/26)
  - [huggingface.co/blog/vllm-jobs](https://huggingface.co/blog/vllm-jobs)

### NVIDIA Blog (7/1)
- **NVIDIA Build in America / AI Compute at Scale** — 위 7/3 섹션 참고 (7/1 발행, 기간 경계)

### DeepMind (최근 — "Month Year" 표기, 정확 일자 미확정)
- **Securing the Future of AI Agents** (6/2026)
- **DiffusionGemma: 4x 빠른 텍스트 생성** (6/2026)
- **Gemma 4 12B: 엔코더-프리 멀티모달 통합 모델** (6/2026)
- 출처: [deepmind.google/discover/blog](https://deepmind.google/discover/blog/)

---

## OpenAI (참고, 6/30~ 기간 초과분 대표)
- **Introducing GeneBench-Pro** — 유전체 분석 벤치마크 (6/30)
  - [openai.com/index/introducing-genebench-pro](https://openai.com/index/introducing-genebench-pro/)
- **Previewing GPT-5.6 Sol** — 차세대 모델 프리뷰 (6/26)
  - [openai.com/index/previewing-gpt-5-6-sol](https://openai.com/index/previewing-gpt-5-6-sol/)
- **GPT-5.6 Preview System Card** (6/26, deploymentsafety.openai.com)
- **OpenAI + Broadcom, Jalapeño LLM 최적화 추론 칩 발표** (6/24)
  - [openai.com/index/openai-broadcom-jalapeno-inference-chip](https://openai.com/index/openai-broadcom-jalapeno-inference-chip/)

---

## 주요 흐름 분석 (5개 테마)

### 1. AI 안전 거버넌스, 정부 개입 심화
- Anthropic 주도 **jailbreak 심각도 업계 프레임워크** 제안 (Amazon·MS·Google 공동)
- **백악관 AI 출시 가이드라인** 다음 주 발표 — OpenAI·Anthropic 최종 조율
- **OpenAI, 정부에 5% 지분 제안** — AI 붐 수익의 연방 할당 구상
- Anthropic-백악관 Fable 5 접근 협상은 "아직 없어" (Anthropic 측)

### 2. 코딩 에이전트 경쟁 격화 + 보안 결함 노출
- **Z.ai ZCode** (GLM-5.2 공식 IDE) → Cursor·Claude Code·Copilot 정면 도전
- **Claude Code 세션/캐시 유출 가능성** (HN 286 points) — 워크스페이스 인스턴스 간 잠재 노출
- **GPT-5.5 Codex reasoning-token 클러스터링**, 성능 저하 버그 보고
- **"Better Models: Worse Tools"** — Armin Ronacher, 모델 향상 vs 도구 정체 비판
- 알리바바, **Claude Code 사내 금지** — 백도어·중국 사용자 추적 우려

### 3. 비용·토큰 효율성이 새 경쟁력
- 알리바바 **SkillWeaver** — 에이전트 도구 선택, 토큰 99.9% 절감 (해외 VB 99%)
- **AITimes 'AI 토큰 지출' 지표 첫 하락** — 거품 붕괴 vs 수요 조정 논쟁
- **Tesla, 직원 AI 사용료 주당 $200 제한** — 비용 급증 제동
- **"비싼 모델만 쓸 필요 없다"** — AI 토큰 비용 절감 흐름 (AITimes 브리핑)

### 4. 피지컬 AI·인프라 투자 폭증
- **NVIDIA Build in America + AI Compute at Scale** — 자본 파트너 초청
- **삼성 영남 60조** — '글로벌 피지컬 AI 혁신 클러스터'
- **소프트뱅크, 미국 10GW AI 클라우드** — "제2의 창업"
- **MS 6000명 FDE 전담조직 + 25억 달러** — 기업 AI 도입 직접 지원
- **NVIDIA Rubin Ultra 4→2칩렛 선회** — 양산 현실 고려
- **Weave Isaac 1** $8,000 빨래 로봇, **KAIST AI 에이전트 136배 전력** 경고

### 5. 멀티모달·온디바이스·음성
- **Google Nano Banana 2 Lite + Gemini Omni Flash** — 빠른 영상·대화형 편집 API
- **Hugging Face + Cerebras Gemma 4 음성 AI** — 실시간 저지연
- **xAI 보이스 에이전트 빌더** — 코드 없이 음성 AI 베타
- **Amazon 온디바이스 AI 칩** — 화면 없는 자체 AI 기기 예고
- **Naver 이미지 중심 AI 검색** — 9년 멀티모달 축적
- **한국 AI 전략** — "패배주의 벗어나야, 하드웨어·차세대 AI 기회"

---

## 수집 제한 안내

- **MIT Technology Review**: 미수집 (이번 실행에서 제외, JavaScript 필요로 실패 빈번)
- **SemiAnalysis / Interconnects / Simon Willison / Import AI / Stratechery / The Information / AI Snake Oil**: 보조 소스로 핵심 응답 부족시 추가 예정이었으나, 핵심 14개 응답 충분해 생략
- **ArXiv**: 7/3 기준 228건 중 주요 12건만 선별 (전체 요약 시도 안 함). 7/2분은 228건에서 후속 페이지
- **The Batch**: Issue 360 (7/3) 단일 주간 이슈 단위 포함 — 각 섹션(Research/Business/Science/Hardware/Culture)별 대표 1~2건
- **DeepMind "Month Year" 표기 항목** (6/2026 표기): 정확 일자 미확정이라 별도 섹션 처리
- **AI타임스 기사 발행일 표시**: 7/2~7/4 기사가 7/5 발행일로 표시된 경우 多수 — 내용 기준일로 분류 (7/3~7/4 관련 AI 이슈)
- **Reuters**: 일반 뉴스가 主라 AI 기사만 2건 선별 (알리바바 Claude Code 금지, AI 경쟁 모방 약점 Breakingviews)
- **OpenAI / HF Blog 일부 항목**: 6/30 게시분은 기간 초과이나 Anthropic·DeepMind 맥락과 연결되어 참고 섹션에만 배치
- **내용 요약**: 6단계는 미실행 (사용자가 "링크 잘 수집해" 요청에 맞춰 링크 중심으로 정리, 본문 fetch 생략)