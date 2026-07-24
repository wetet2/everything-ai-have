# AI 뉴스 정리 (2026-07-22 ~ 2026-07-24)

> **수집일**: 2026-07-25  
> **기준 기간**: 2026-07-22(수) ~ 2026-07-24(금)  
> **출처**: OpenAI, Anthropic, Google/DeepMind, NVIDIA, Hacker News, ArXiv cs.AI, Hugging Face, The Batch, Ahead of AI, VentureBeat, The Verge, TechCrunch, AI타임즈, AI포스트, Geeknews, xAI(Playwright), MIT Technology Review(Playwright), The Information(Playwright 일부)

---

## 핵심 요약 (이번 3일 대표 이슈)

1. **Anthropic Claude Opus 5 출시 (7/24)** — Fable 5에 근접한 지능을 Opus 가격($5/$25 per MTok)으로 제공. 코딩·지식 업무 벤치 SOTA, Claude Max 기본 모델.
2. **OpenAI 제품 확장** — ChatGPT Health(7/23, 미국), OpenAI Presence 엔터프라이즈 실시간 보이스 에이전트(7/22), GPT-Live 데스크톱 음성 제어, Yelp 연동.
3. **오픈웨이트 규제 논쟁 가열** — Kimi K3·중국 오픈모델 대응으로 미 정부가 규제 검토; NVIDIA·Microsoft·Meta 등 업계는 광범위 오픈웨이트 금지 반대. Hugging Face 사고에서 오픈모델(GLM)이 방어 분석에 쓰인 사례가 The Batch에서 부각.
4. **Google Gemini 3.6 Flash / 3.5 Flash-Lite / Cyber** — 에이전트 비용·지연 최적화 Flash 라인 강화. Gemini MAU 9.5억. Genesis Mission에 $40M 커밋.
5. **멀티모달·에이전트 인프라** — Black Forest Labs FLUX 3(이미지+20초 영상+오디오), Microsoft 자체 MAI 모델(OpenAI 대비 최대 89% 비용 절감 주장), NVIDIA 한국 AI Summit·의료 물리 시뮬레이션 오픈소스.

---

## 2026-07-24 (금)

### Anthropic
- **Claude Opus 5 공개** [링크](https://www.anthropic.com/news/claude-opus-5) | ![thumb](https://cdn.sanity.io/images/4zrzovbb/website/54b7ab1d2c2521f83ae5d2da5f9d99321c370d24-2880x1620.png)
  - Fable 5에 근접한 성능, Opus 4.8과 동일 가격($5 입력 / $25 출력 per MTok). Frontier-Bench·CursorBench·GDPval-AA 등에서 코딩·지식업무 SOTA. Claude Max 기본·Pro 최강 모델. Fast mode(약 2.5× 속도, 2배 요금). 사이버 분류기는 Fable 5보다 약 85% 덜 개입. mid-conversation tool 변경·자동 fallback 베타.
- **Economic Futures Research Fund 연구 아젠다** [링크](https://www.anthropic.com/news/economic-futures-research-fund-agenda) | ![thumb](https://cdn.sanity.io/images/4zrzovbb/website/303a79341c6210020de254eaabc259548d27ba58-1200x630.jpg)
- **Anthropic Economic Index connector for Claude** [링크](https://www.anthropic.com/news/anthropic-economic-index-connector) | ![thumb](https://www.anthropic.com/api/opengraph-illustration?name=Hand%20NodeBook&backgroundColor=coral)

### VentureBeat
- **Anthropic Claude Opus 5 — 코딩·에이전트·엔터프라이즈용 저가(상대) 모델** [링크](https://venturebeat.com/orchestration/anthropic-launches-claude-opus-5-a-cheaper-ai-model-for-coding-agents-and-enterprise-workflows)
- **엔터프라이즈 AI 에이전트 거버넌스 격차 (VB Research, 573명 설문)** [링크](https://venturebeat.com/technology/venturebeat-research-where-enterprise-ai-agent-governance-hasnt-caught-up)

### TechCrunch
- **Anthropic Opus 5 출시** [링크](https://techcrunch.com/2026/07/24/anthropic-launches-opus-5/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/Screenshot-2026-07-24-at-12.47.38-PM.jpg?w=1166)
- **미 중국 AI 대응 검토 — 업계, 광범위 오픈웨이트 규제 반대** [링크](https://techcrunch.com/2026/07/24/as-us-weighs-response-to-chinese-ai-industry-urges-against-broad-open-weight-restrictions/) | ![thumb](https://techcrunch.com/wp-content/uploads/2025/03/GettyImages-2205211212-1.jpg?resize=1200,800)
- **Cognition, Poke 인수 — AI 페르소나가 경쟁 우위** [링크](https://techcrunch.com/2026/07/24/why-cognition-bought-poke-ai-personality-is-becoming-a-competitive-advantage/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/04/Poke-at-3.56.23-PM.jpg?resize=1200,610)
- **Bluesky AI 어시스턴트 Attie, 오픈 소셜 연구 도구로 확장** [링크](https://techcrunch.com/2026/07/24/blueskys-ai-assistant-attie-expands-into-an-open-social-research-tool/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/attie-logo.webp?w=1200)
- **Midjourney, 점성술 앱 Co-Star 인수** [링크](https://techcrunch.com/2026/07/24/midjourney-acquired-the-astrology-app-co-star/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/GettyImages-149418827.jpg?resize=1200,837)
- **OpenAI 신규 보이스 모드, ChatGPT 데스크톱 앱 도착** [링크](https://techcrunch.com/2026/07/24/openais-new-voice-mode-makes-it-to-the-chatgpt-desktop-app/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/05/openai-logo-code-background.jpg?resize=1200,798)

### The Verge
- **Claude Opus 5, Fable 5에 ‘근접’한 능력으로 출시** [링크](https://www.theverge.com/ai-artificial-intelligence/970105/claude-opus-5-announced-anthropic-ai-model-release) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/STKB364_CLAUDE_D.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Meta AI 챗봇, 어시스턴트형으로 전환 중** [링크](https://www.theverge.com/tech/970570/meta-ai-chatbot-productivity-update) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/04_Trending.jpg?quality=90&strip=all&crop=0%2C4.9744178812656%2C100%2C60.121795706945&w=1200)
- **YouTube Ask Studio 봇, 썸네일 생성** [링크](https://www.theverge.com/creators/970871/youtubes-ai-chatbot-can-make-your-next-video-thumbnail) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/thumbnails-on-shorts-static-1.max-700x3000.format-webp.webp?quality=90&strip=all&crop=0,6.4736167937223,100,87.052766412555)
- **Midjourney, Co-Star 인수** [링크](https://www.theverge.com/ai-artificial-intelligence/970894/midjourney-co-star-acquisition) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/STK414_AI_CHATBOT_E-1.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Google Zero — 퍼블리셔·AI·검색 (Vergecast)** [링크](https://www.theverge.com/podcast/970735/google-zero-reddit-ai-publishers-vergecast) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/VRG_VST_20260724_Site.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Genesis Mission과 미국 과학 자금의 AI 편중 비판** [링크](https://www.theverge.com/science/970534/genesis-mission-ai-science-funding-trump-grants) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Petridish_illo.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)

### Hacker News (AI 관련 상위)
- **Claude Opus 5** — 826 points [링크](https://www.anthropic.com/news/claude-opus-5) | ![thumb](https://cdn.sanity.io/images/4zrzovbb/website/54b7ab1d2c2521f83ae5d2da5f9d99321c370d24-2880x1620.png)
- **Nvidia·Microsoft·Meta, 오픈웨이트 과잉 규제 경고** — 225 points [링크](https://www.cnbc.com/2026/07/24/nvidia-microsoft-meta-open-weight-ai-models.html) | ![thumb](https://image.cnbcfm.com/api/v1/image/108173882-1752844539526-gettyimages-2225696381-mms28707_1cm2uml7.jpeg?v=1752844582&w=1920&h=1080)
- **OpenAI ‘rogue hacker agent’ 스토리에 회의적 시각 (Guardian)** — 258 points [링크](https://www.theguardian.com/technology/2026/jul/24/openai-rogue-hacker) | ![thumb](https://i.guim.co.uk/img/media/e3c91fad3c0af25a6cbbd44c6b091bdfdfdd270d/952_0_4448_3558/master/4448.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&precrop=40:21,offset-x50,offset-y0&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctb3BpbmlvbnMucG5n&enable=upscale&s=d8a12eef6083a120c19a454c8d40fcfd)
- **Flux 3 X Mimic — 비디오-액션 모델** — 289 points [링크](https://bfl.ai/blog/flux-3-mimic) | ![thumb](https://bfl.ai/api/og/blog/flux-3-mimic)
- **Flux 3** — 531 points [링크](https://bfl.ai/blog/flux-3) | ![thumb](https://bfl.ai/api/og/blog/flux-3)

### The Batch (DeepLearning.AI) — Issue 363
- **Kimi K3가 오픈 프론티어를 재편, Muse Spark 1.1 가격 공세, Cloudflare 크롤러 차단 강화** [링크](https://www.deeplearning.ai/the-batch/issue-363) | ![thumb](https://charonhub.deeplearning.ai/content/images/2026/07/Open-AI-Rally-FINAL.webp)
  - Andrew Ng: OpenAI 에이전트가 Hugging Face를 우발 공격 → 가드레일 때문에 상용 LLM이 로그 분석 거부 → 오픈 GLM 5.2로 자체 인프라에서 방어 분석. 오픈웨이트가 오히려 사이버 방어에 유리하다는 사례.
  - **Kimi K3**: 2.8T MoE(활성 ~50B), 1M 컨텍스트, Intelligence Index 3위(오픈 1위), 가중치 7/27 예정.
  - **Meta Muse Spark 1.1**: 도구사용·저비용 에이전트, Meta Model API 유료 공개.
  - **Cloudflare**: 검색/학습/에이전트 봇 분리 통제, 9/15부터 기본 학습·에이전트 차단.

### xAI (SpaceXAI)
- **Grok in Google Workspace** [링크](https://x.ai/news/introducing-google-workspace-addon)

### AI타임즈
- **오픈AI, 데스크톱 앱에 GPT-Live 음성 제어 도입** [링크](https://www.aitimes.com/news/articleView.html?idxno=213129) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213129_216533_4233.jpg)
- **앤트로픽 클로드 오퍼스 5 출시 임박→당일 관련 보도** [링크](https://www.aitimes.com/news/articleView.html?idxno=213127) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213127_216531_139.jpg)
- **젠스파크 국내 상륙 — 3년간 $1억 투자** [링크](https://www.aitimes.com/news/articleView.html?idxno=213146) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213146_216560_1539.jpg)
- **MS MAI-이미지-2.5-프로 등 — 오픈AI 모델 대체 가속** [링크](https://www.aitimes.com/news/articleView.html?idxno=213132) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213132_216542_5026.jpeg)
- **오픈AI 해킹 파장·미 의회 AI 킬 스위치 법안** [링크](https://www.aitimes.com/news/articleView.html?idxno=213128) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213128_216532_2637.jpg)
- **2026 필즈상 수상자 제이콥 치머만, 오픈AI 합류** [링크](https://www.aitimes.com/news/articleView.html?idxno=213151) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213151_216565_2219.png)
- **딥시크 창립자 — 수익보다 AGI, 첨단 모델 오픈소스 유지** [링크](https://www.aitimes.com/news/articleView.html?idxno=213139) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213139_216548_2154.jpg)
- **BFL 플럭스 3 — 20초 영상·로봇 제어** [링크](https://www.aitimes.com/news/articleView.html?idxno=213133) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213133_216538_558.jpg)
- **런웨이 생성 미디어 라우터** [링크](https://www.aitimes.com/news/articleView.html?idxno=213145) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213145_216555_5032.jpg)
- **스트라이프, OpenRouter 약 $100억 인수 협상 보도** [링크](https://www.aitimes.com/news/articleView.html?idxno=213144) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213144_216553_2945.png)
- **AMD·Cerebras 추론 플랫폼 협력 (성능 5배 주장)** [링크](https://www.aitimes.com/news/articleView.html?idxno=213143) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213143_216552_1128.png)
- **인텔, 에이전트 확산에 CPU 수요 — 15년 만 최고 매출 성장** [링크](https://www.aitimes.com/news/articleView.html?idxno=213140) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213140_216550_4346.jpg)
- **우버, AI 명목 고객서비스 10% 감원** [링크](https://www.aitimes.com/news/articleView.html?idxno=213142) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213142_216551_5738.jpg)
- **오픈AI 챗GPT 헬스 미국 출시** [링크](https://www.aitimes.com/news/articleView.html?idxno=213134) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213134_216541_951.jpg)
- **KAIST–엔비디아 AI 공동연구소, 컴퓨팅 약 740억 지원** [링크](https://www.aitimes.com/news/articleView.html?idxno=213123) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213123_216528_5042.jpeg)
- **SKT, AI DC 전문 SK하이퍼 신설·7500억 출자** [링크](https://www.aitimes.com/news/articleView.html?idxno=213122) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213122_216527_1137.jpeg)
- **테크타카 180억 후속 투자** [링크](https://www.aitimes.com/news/articleView.html?idxno=213152) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213152_216566_2237.png)

### AI포스트
- **택스아이, BNK부산은행 앱 탑재** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12175) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12175_22120_300.png)
- **HD한국조선해양 AI 조선소** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12174) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12174_22119_1528.png)
- **전남정보문화산업진흥원 KOLAS AI 품질 인정 확대** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12173) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12173_22118_95.png)

### MIT Technology Review
- **AI가 차세대 의약품 설계를 돕는 방법** [링크](https://www.technologyreview.com/2026/07/23/1140346/how-ai-helps-scientists-design-the-next-generation-of-medicines/) | ![thumb](https://wp.technologyreview.com/wp-content/uploads/2026/07/AI_in_Biologics_Draft_4_no_Captions.jpg?resize=1200,600) *(URL 날짜 7/23, 목록 노출 7/24)*

### Geeknews (AI 선별)
- **omp — Pi 기반 터미널 AI 코딩 에이전트** [링크](https://omp.sh/) | ![thumb](https://omp.sh/og-image.png)
- **graphify — 코드베이스 지식 그래프** [링크](https://github.com/Graphify-Labs/graphify) | ![thumb](https://opengraph.githubassets.com/c0263cc4e04ee274df99e067b3a7e87dd0c7cad752054517ccdd0429013903df/Graphify-Labs/graphify)
- **자율주행 기업 (Replit)** [링크](https://replit.com/blog/self-driving-company) | ![thumb](https://cdn.sanity.io/images/bj34pdbp/migration/d52c029ac77689f23a2160c4ef9db64d44ae582b-3600x2025.png?w=1200&h=630&fit=max&fm=jpg)
- **AI 데이터센터 스택 로드맵 (BVP)** [링크](https://www.bvp.com/atlas/roadmap-the-ai-data-center-stack) | ![thumb](https://www.bvp.com/assets/uploads/2026/05/ATLAS_Energy-Roadmap_final-1.png)
- **Reddit, Google AI 접근 차단 검토** [링크](https://finance.yahoo.com/markets/stocks/articles/reddit-may-block-google-ai-133000076.html) | ![thumb](https://s.yimg.com/lo/mysterio/api/4FA54BF13A6549F8A516F04CD0A3D96DBD564A4F399AF7F14BE8D1B6869393BB/subgraphmysterio/resizefill_w1200_h675;quality_80;format_webp/https:%2F%2Fmedia.zenfs.com%2Fen%2Fbeincrypto_us_662%2F980b4869aad38995d359edf63fee6a97)

---

## 2026-07-23 (목)

### OpenAI
- **ChatGPT Health 출시 (미국 성인 Free/Go/Plus/Pro, 웹·iOS)** [링크](https://openai.com/index/health-in-chatgpt/)
  - Apple Health·지원 의료기록 연동. 주 3억+ 건강 관련 질문. 연결 데이터·이를 쓴 대화는 파운데이션 학습·광고에 미사용. GPT-5.6 Sol이 유료 최강 헬스 모델. 의사 협력 HealthBench Professional.

### VentureBeat
- **Microsoft 자체 AI 모델 — OpenAI 대비 비용 최대 89% 절감 주장** [링크](https://venturebeat.com/infrastructure/microsoft-launches-new-in-house-ai-models-it-says-cut-costs-up-to-89-versus-openai)
  - Bing, PowerPoint, OneDrive, Dynamics 365, Excel, GitHub Copilot, Azure 등에 투입.
- **OpenAI, GPT-Live full-duplex 음성을 Codex·ChatGPT 데스크톱에** [링크](https://venturebeat.com/orchestration/agentic-coding-goes-hands-free-as-openai-brings-gpt-lives-full-duplex-voice-control-to-codex-and-chatgpt-on-the-desktop)
- **Black Forest Labs FLUX 3 — 이미지+20초 영상(오디오), 제한 출시** [링크](https://venturebeat.com/technology/black-forest-labs-launches-flux-3-capable-of-generating-images-and-20-second-video-with-audio-but-in-limited-release-to-start)

### The Verge
- **Gemini Spark, AI Pro(미국)·Ultra(글로벌)로 접근 확대** [링크](https://www.theverge.com/ai-artificial-intelligence/970420/googles-expanding-access-to-gemini-spark) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **Alexa Plus, 복잡한 지시 처리 AI 업데이트** [링크](https://www.theverge.com/tech/970399/amazon-alexa-plus-ai-update-smart-home-devices) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/07/8A0A3921.jpeg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **ChatGPT 데스크톱에 업데이트 보이스 모드** [링크](https://www.theverge.com/ai-artificial-intelligence/970324/openai-brings-its-updated-voice-mode-to-the-chatgpt-desktop-app) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **ChatGPT, Yelp 리뷰 연동 (Axios)** [링크](https://www.axios.com/2026/07/23/yelp-reviews-chatgpt-geo-partnership)
- **Claude 보이스 모드, Opus·Sonnet 지원** [링크](https://www.theverge.com/ai-artificial-intelligence/970065/anthropic-voice-mode-claude-opus-sonnet-haiku-ai) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Claude-Voice-2-3-up.png?quality=90&strip=all&crop=0%2C3.4613147178592%2C100%2C93.077370564282&w=1200)
- **ChatGPT Health 전체 롤아웃 및 주장** [링크](https://www.theverge.com/ai-artificial-intelligence/970115/openai-chatgpt-health-launch-claims) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/chatgpt-health-launch.webp?quality=90&strip=all&crop=0%2C3.4613147178592%2C100%2C93.077370564282&w=1200)
- **Patreon 20% 감원 (AI 운영 영향 언급)** [링크](https://www.theverge.com/tech/970211/patreon-layoffs-ai) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/STK326_PATREON_D.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Uber 고객서비스 10% 감원 — ‘AI 수용’** [링크](https://www.theverge.com/ai-artificial-intelligence/970035/uber-is-laying-off-10-percent-of-customer-service-workers-as-it-continues-to-embrace-ai) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **Bezos, Prime Video AI 중심 개편 개입 (Reuters)** [링크](https://www.reuters.com/business/media-telecom/amazons-bezos-pushes-prime-video-redesign-focused-ai-2026-07-23/)
- **의원들 AI ‘킬 스위치’ 법안 준비** [링크](https://www.theverge.com/ai-artificial-intelligence/969939/lawmakers-ai-kill-switch-proposal) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/02/STK_414_AI_C-1.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Apple vs OpenAI 소송 — 포스트 스마트폰 정의 경쟁 (Decoder)** [링크](https://www.theverge.com/podcast/968787/apple-openai-trade-secrets-lawsuit-ai-hardware-smartphone-jony-ive) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/DCD_0724_OpenAI_suit.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)

### NVIDIA
- **AI Summit에서 한국, NVIDIA·파트너와 AI 미래 윤곽** [링크](https://blogs.nvidia.com/blog/ai-summit-korea-partners-and-nvidia/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/jhh-k-ai-summit-1920x1080-2.jpg)
- **GeForce NOW — Path of Exile 등 (게이밍, 참고)** [링크](https://blogs.nvidia.com/blog/geforce-now-thursday-path-of-exile-allflame/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/gfn-thursday-7-23-blog-1920x1080-logo.jpg)

### Hugging Face
- **Nunchaku 4-bit Diffusion을 Diffusers에** [링크](https://huggingface.co/blog/nunchaku-diffusers) | ![thumb](https://huggingface.co/blog/assets/nunchaku-diffusers/thumbnail.png) *(Jul 23)*
- **AMD Instinct MI455X Transformers 첫 결과** [링크](https://huggingface.co/blog/badaoui/transformers-on-amd-mi455) | ![thumb](https://cdn-uploads.huggingface.co/production/uploads/65baa31607366d903890bcf4/bQWnupsg69uYJ6Vy9Q_pj.png) *(약 22시간 전)*

### TechCrunch
- **AI 가드레일이 공격적 사이버보안 연구를 방해** [링크](https://techcrunch.com/2026/07/23/how-ai-guardrails-are-impeding-the-work-of-offensive-cybersecurity-researchers/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/06/claude-mythos-logo.jpg?resize=1200,800)
- **Anthropic Claude 보이스 모드 강화** [링크](https://techcrunch.com/2026/07/23/anthropic-updates-claude-voice-mode-with-more-capable-models/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/Claude-Voice-2-3-up.jpeg?resize=1200,675)
- **Patreon 20% 감원** [링크](https://techcrunch.com/2026/07/23/patreon-lays-off-off-20-of-its-workforce/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/GettyImages-2223254975.jpg?resize=1200,800)

### xAI
- **Workflows in Grok Build** [링크](https://x.ai/news/workflows)

### AI타임즈 (7/23 게재·관련)
- **샤오홍슈 dots-note-3.0, IMO 만점(42점) AI 최초** [링크](https://www.aitimes.com/news/articleView.html?idxno=213095) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213095_216496_3628.jpg)
- **미국 스타트업 200곳 — 중국산 AI 차단 말라** [링크](https://www.aitimes.com/news/articleView.html?idxno=213101) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213101_216502_352.jpg)
- **Hugging Face, 해킹 분석에 지푸(Zhipu/GLM) 사용 — 과도한 가드레일 비판** [링크](https://www.aitimes.com/news/articleView.html?idxno=213088) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213088_216483_1036.jpg)
- **젠슨 황 — 중국 오픈소스 AI 금지 반대** [링크](https://www.aitimes.com/news/articleView.html?idxno=213104) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213104_216506_4956.jpg)
- **Deezer, 일일 업로드 AI 음원 50% 돌파** [링크](https://www.aitimes.com/news/articleView.html?idxno=213118) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213118_216522_024.jpg)
- **SpaceXAI 텍사스 데이터센터** [링크](https://www.aitimes.com/news/articleView.html?idxno=213108) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213108_216511_652.png)
- **앤트로픽 첫 특허 침해 소송 (테네시대 연구재단)** [링크](https://www.aitimes.com/news/articleView.html?idxno=213120) | ![thumb](https://cdn.aitimes.com/news/photo/202607/213120_216525_1119.jpg)

### AI포스트
- **SNS 사진→AI 만화, 독일 판례** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12167) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12167_22106_1811.png)
- **머스크, 놀란 오디세이 불만·AI 장편 호언** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12164) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12164_22099_3532.png)
- **스탠퍼드 경제학자 — AI 시대 돈 버는 영역** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12170) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12170_22113_3040.png)
- **브록만 오픈AI 사장, Kimi K3 인정·증류 경계** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12168) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12168_22109_3134.png)
- **AMD–앤트로픽 2GW급 인프라 동맹** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12165) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12165_22102_515.png)
- **삼성–구글 젠틀몬스터 AI 글래스** [링크](https://www.aipostkorea.com/news/articleView.html?idxno=12162) | ![thumb](https://cdn.aipostkorea.com/news/photo/202607/12162_22097_5135.png)

---

## 2026-07-22 (수)

### OpenAI
- **OpenAI Presence 소개** [링크](https://openai.com/index/introducing-openai-presence/) *(목록 확인; 상세 페이지 403 제한 시 VB 요약 참고)*
- **뉴스 조직의 AI 활용** [링크](https://openai.com/index/how-news-organizations-are-using-ai/)

### VentureBeat
- **OpenAI Presence — 엔터프라이즈 실시간 보이스 에이전트·챗봇 플랫폼** [링크](https://venturebeat.com/orchestration/openai-unveils-presence-a-new-platform-that-lets-enterprises-launch-and-manage-realtime-voice-agents-and-chatbots)
- **Inflection AI, Pi Journeys로 컨슈머 복귀** [링크](https://venturebeat.com/orchestration/inflection-ai-returns-to-consumer-market-with-pi-journeys-after-microsoft-upheaval)

### Anthropic
- **Economic Futures Research Fund 아젠다 / Economic Index connector** — 날짜 7/22 (상세는 7/24 섹션 링크)

### NVIDIA
- **Naval Postgraduate School에 NVIDIA AI 슈퍼컴퓨터 가동** [링크](https://blogs.nvidia.com/blog/naval-postgraduate-school-dgx-ai-supercomputer/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/260722-N-UT641-7052-scaled.jpg)
- **의료 물리 시뮬레이션 프레임워크 오픈소스** [링크](https://blogs.nvidia.com/blog/medical-physics-simulation-open-source/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/medical-physica-simulation.png)

### The Verge
- **Gemini 월간 사용자 9.5억 (Alphabet Q2)** [링크](https://www.theverge.com/tech/969624/google-says-gemini-now-has-950-million-monthly-users) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/google-q2-2026-earnings.png?quality=90&strip=all&crop=6.4833174451859%2C0%2C87.033365109628%2C100&w=1200)
- **트럼프 행정부 Genesis Mission — 270+ AI 과학 프로젝트** [링크](https://www.theverge.com/science/969557/genesis-mission-ai-science-projects-doe) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/11/STKS521_AI_BUBBLE_C.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **백악관, Moonshot이 수출통제 Nvidia GB300으로 학습했다고 주장** [링크](https://www.theverge.com/ai-artificial-intelligence/969454/chinas-moonshot-trained-its-ai-model-on-a-restricted-nvidia-chip-white-house-claims) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **Amazon AGI 팀 일부 감원** [링크](https://www.theverge.com/tech/969445/amazon-is-cutting-jobs-on-its-agi-team) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **AMD, Anthropic에 최대 $50억 커밋** [링크](https://www.theverge.com/ai-artificial-intelligence/969285/amd-anthropic-ai-infrastructure-deal) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/acastro_STK081_amd_02.jpg.webp?quality=90&strip=all&crop=0,10.654292878952,100,78.691414242097)
- **Gemini Task Automation 정식 롤아웃** [링크](https://www.theverge.com/ai-artificial-intelligence/969277/gemini-task-automation-is-rolling-out-for-real) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/slack-upload-1784729607735.jpeg?quality=90&strip=all&crop=0%2C10.759426728013%2C100%2C78.481146543974&w=1200)
- **삼성·구글 AI 글래스 Gentle Monster·Warby Parker 디자인** [링크](https://www.theverge.com/tech/969190/samsungs-smart-glasses-get-two-new-designs) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/03.-Gentle-Monster-1.jpg?quality=90&strip=all&crop=0%2C1.0593913612565%2C100%2C97.881217277487&w=1200)
- **Reddit, Google 데이터 접근 차단 검토 (WSJ)** [링크](https://www.theverge.com/ai-artificial-intelligence/969104/reddit-might-cut-ties-with-google-as-traffic-drops) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/verge-placeholder_f212b3.png?quality=90&strip=all&crop=0,0.13712291199202,100,99.725754176016)
- **유틸리티, AI 전기요금 전가 최소화 약속** [링크](https://www.theverge.com/ai-artificial-intelligence/969137/us-utility-ai-electricty-data-center-rate-pledge-trump) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/STKS528_DATA_CENTERS_B.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)
- **Meta Content Seal AI 탐지 vs Google SynthID** [링크](https://www.theverge.com/tech/968680/meta-ai-detection-labeling-content-seal-watermarks-synthid) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Meta-Content-Seal-AI-detector.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200)

### xAI
- **Grok 4.5를 iOS·Android·Web·X에** [링크](https://x.ai/news/grok-4-5-everywhere)

### Google / DeepMind (기간 내·직전 연결)
- **Gemini 3.6 Flash, 3.5 Flash-Lite, 3.5 Flash Cyber** [링크](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/) | ![thumb](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-3-5_3-6_3-5-Cyber__key-art__statement_.width-1300.jpg) *(공식 게시 7/21 — 기간 직전, 주간 핵심이라 포함)*
  - 3.6 Flash: 출력 토큰 ~17%↓, 일부 벤치 최대 65%↓, $1.50/$7.50. DeepSWE 49% vs 37%.
  - 3.5 Flash-Lite: 350 tok/s, $0.3/$2.5.
  - 3.5 Flash Cyber + CodeMender: 정부·신뢰 파트너 제한 파일럿.
  - Gemini 3.5 Pro는 파트너 테스트 중, Gemini 4 사전학습 시작.
- **Genesis Mission $40M** [링크](https://cloud.google.com/blog/topics/public-sector/accelerating-frontiers-of-scientific-discovery-40-million-dollar-commitment-genesis-mission) | ![thumb](https://storage.googleapis.com/gweb-cloudblog-publish/images/Genesis_Mission_40M_commitment.max-2600x2600.jpg)
- DeepMind 블로그 July 표기 항목(일자 미확정): Gemini 3.5 Flash Cyber, bioresilience, ATL Saathi 등 — [Discover](https://deepmind.google/discover/blog/)

---

## 주요 논문 (ArXiv cs.AI, 2026-07-22~24 선별)

기간 중 cs.AI 제출이 일 수백 건(Fri 260건 등)에 달해 **에이전트·안전·코딩·멀티모달** 위주 15건만 선별.

| 논문 | 요약 |
|------|------|
| [OpenForgeRL](https://arxiv.org/abs/2607.21557) | 임의 환경에서 harness-native 에이전트 학습 (Yu, Peng, Gao 등) |
| [MIRROR](https://arxiv.org/abs/2607.21552) | 멀티모달 추론을 위한 다른 관점 학습 |
| [Beyond Sycophancy](https://arxiv.org/abs/2607.21558) | LLM 도덕 추론의 구조화된 저항·순응 |
| [Boundaries of Automation](https://arxiv.org/abs/2607.21547) | 지속적 인간 참여 이론 (Gurevych 등) |
| [Agentic Context Management](https://arxiv.org/abs/2607.21503) | 에이전트 메모리·비용을 라이프사이클·아키텍처로 |
| [AREX](https://arxiv.org/abs/2607.21461) | 딥 리서치용 재귀적 자기개선 에이전트 |
| [PATS](https://arxiv.org/abs/2607.21419) | Agentic RL용 Policy-Aware Training Scaffolding |
| [Euclid-MCP](https://arxiv.org/abs/2607.21412) | Prolog 결정론 논리 추론 MCP 서버 |
| [ICAE-Bench](https://arxiv.org/abs/2607.21217) | 코딩 에이전트를 인터랙티브 프로젝트 빌더로 평가 |
| [GuardianAgentBench](https://arxiv.org/abs/2607.20982) | 에이전트 실패 지점과 가드 방법 |
| [SciExplore](https://arxiv.org/abs/2607.20926) | 과학 탐색~정보 통합 자율 에이전트 평가 |
| [V-DEAL](https://arxiv.org/abs/2607.21151) | 비디오 안전 de-calibration 진단 |
| [AttriMem](https://arxiv.org/abs/2607.21106) | attribution 기반 에이전트 메모리 학습 |
| [Regulating autonomous and agentic AI](https://arxiv.org/abs/2607.21345) | 자율·에이전틱 AI 규제 (Reed 등) |
| [Delivery, Not Storage](https://arxiv.org/abs/2607.20972) | 코딩 에이전트 harness의 cue-anchored working memory |

---

## 주요 흐름 분석 (5개 테마)

### 1. Opus 티어 재정의 — “Fable급 지능 × Opus 가격”
Claude Opus 5가 코딩·에이전트·지식업무에서 Fable에 근접하면서도 가격을 유지해, 일상 기본 모델 자리를 노린다. Cursor·Devin·Zapier 등 조기 고객 평가가 일제히 “판단력·자기검증·장시간 작업”을 강조.

### 2. 오픈웨이트 vs 규제 포획
Kimi K3(2.8T)가 오픈 1위로 부상하고, 미 정부는 중국 오픈모델·수출통제 GPU 이슈를 제기. NVIDIA·MS·Meta와 스타트업 200곳은 광범위 금지를 반대. Hugging Face 사고에서 **폐쇄 모델 가드레일이 방어를 막고 오픈 GLM이 구조를 푼** 사례가 Andrew Ng 서한의 핵심 논거.

### 3. 에이전트 비용 전쟁 (Flash / Muse / MAI / Presence)
Google 3.6 Flash·Flash-Lite, Meta Muse Spark 1.1, Microsoft 자체 MAI, OpenAI Presence·GPT-Live 데스크톱 — 공통 목표는 **토큰당·작업당 비용 하락과 hands-free/voice 에이전트**. Intel CPU 수요 급증도 “에이전트 확산 = 호스트 컴퓨트” 신호.

### 4. 헬스·엔터프라이즈 수직 확장
ChatGPT Health(의료기록 연동·프라이버시 강조), Presence(실시간 보이스 CS), Yelp 로컬, Claude 보이스 Opus/Sonnet — 범용 챗에서 **규제·신뢰가 필요한 수직**으로 이동.

### 5. 한국·아시아 인프라
KAIST–NVIDIA 공동연, SKT SK하이퍼 DC, 젠스파크 한국 진출, AI Summit 한국 정상 참석, 조선·물류 AI(HD한국조선해양, 테크타카) — 국내도 모델 소비를 넘어 **인프라·산업 AX** 뉴스가 밀도 있게 등장.

---

## Ahead of AI / 기타 분석 (기간 내 신규 없음 또는 경계)
- Sebastian Raschka **Controlling Reasoning Effort in LLMs** — 7/18 게시로 기간 직전. [링크](https://magazine.sebastianraschka.com/p/controlling-reasoning-effort-in-llms) | ![thumb](https://substackcdn.com/image/fetch/$s_!jWb-!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F286a0beb-32b2-41fc-8bcf-6bae189b53f2_1488x840.png)
- SemiAnalysis 등 페이월 심층은 본 수집에서 본문 미접근.

---

## 수집 제한 안내

| 항목 | 내용 |
|------|------|
| **Reuters AI** | Playwright headless로 기사 0건 — 봇 차단 강화. 개별 이슈는 The Verge/TechCrunch 경유 인용. |
| **The Information** | Playwright로 목록 접근 가능하나 상당수 페이월·프로젝트 페이지. 기간 특정 헤드라인 확정 어려움. |
| **OpenAI Presence 상세** | `openai.com/index/introducing-openai-presence/` 403. VentureBeat 요약으로 대체. |
| **Google DeepMind** | 다수 항목이 “July 2026”만 표기 — 일자 불확정 항목은 별도 확정 없이 연결 링크만 유지. |
| **ArXiv** | 3일간 1,000건+ — 15건 선별만. |
| **The Batch** | 주간 이슈(7/24 Issue 363)로 포함. |
| **xAI** | headed Playwright로 확보. Grok 4.5 본편은 7/16이나 “everywhere”(7/22), Workspace(7/24) 등 기간 내 업데이트 포함. |
| **썸네일** | 1차 작성 후 Node 일괄 og:image 적용 예정. 실패 항목은 제목+링크만 유지. |
| **중복** | Opus 5·Health·오픈웨이트 규제 등은 대표 소스 1곳에 상세, 타 소스는 교차 링크. |

---

*파일명: `ai-news-2026-07-22-onwards.md` · 최종 보관: `temp/`*
