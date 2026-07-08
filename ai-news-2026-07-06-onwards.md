# AI 뉴스 스크랩 (2026-07-06 ~ 07-07)

> 수집일: 2026-07-07 (07-06분은 2026-07-06 수집, 07-07분은 2026-07-07 수집 후 통합)
> 기준: 7월6일(월)~7월7일(화) AI 관련 기사 + 7/4~7/5 주말 맥락 보충
> 출처: OpenAI·Anthropic·Google·DeepMind·NVIDIA·Hacker News·ArXiv·Hugging Face·The Batch·VentureBeat·The Verge·TechCrunch·Reuters·Ahead of AI·AI타임즈·AI포스트
> 참고: 7/5 상세는 `ai-news-2026-07-05-onwards.md`, 7/2~7/4는 `ai-news-2026-07-02-onwards.md` 참고. 본 파일은 07-06 파일과 07-07 파일을 하나로 통합한 것.

---

## 핵심 요약 (7/6~7/7 대표 이슈 10선)

1. **Anthropic, Claude 내부서 '글로벌 작업 공간(J-space)' 발견 — 의식 이론 닮아** — 7/6~7/7 VentureBeat·Anthropic Research·AI타임즈. 16저자 연구 "Verbalizable Representations Form a Global Workspace in Language Models". HN 413점. 7/6 "'AI 의식'에 몰리는 실리콘 밸리" 맥락이 구체적 메커니즘으로 화.
2. **DeepSeek 자체 AI 칩 개발 (Reuters 단독, 7/7) + 中 베이징, 자국 최고 AI 모델 해외 접근 제한 검토 (Reuters 단독, 7/7)** — 중국 AI 자립·통제 양면 이동. DeepSeek 칩 소식에 Nasdaq 하락 개시.
3. **삼성전자 2분기 영업이익 89.4조원 (전년비 1810% 폭증, 7/7)** — AI 반도체(HBM) 특수로 3분기 연속 사상 최대. 메모리 부서 직원 평균 보너스 34만달러.
4. **한국 AI 인프라 대규모 투자 쇄도 (7/5~7/6)** — KT(AX 5조원·토큰 팩토리)·SKT(15GW 데이터센터·해인 CSAP 인증)·마이크론(히로시마 14조원 HBM 증설)이 잇달아 대규모 인프라 투자 발표.
5. **Anthropic, TeraWulf와 켄터키 AI 데이터센터 20년 임대 ($19B, 7/6)** — 2027~2028 401MW. 암호화폐 채굴→AI 인프라 전환 상징.
6. **Tencent 'Hy3' 오픈소스 (7/6~7/7) + GLM 5.2 마진 붕괴 (HN 566점)** — Hy3는 GLM-5.2 절반 크기·환각률 절반·수출 규제 호환 GPU 구동. GLM 5.2 등 저비용 모델이 AI 업계 이윤율 압박.
7. **메타 AI 안경 '레이밴 메타' 한국어 실시간 번역 지원 + 통신 3사 판매 돌입 (7/6)** — 국내 AI 웨어러블 시장 본격 공략.
8. **유엔 구테흐스 '킬러 로봇(자율살상무기)' 국제법 전면 금지 촉구 (7/7) + 최초 자율형 AI 랜섬웨어 발견 (7/6)** — AI 안전·통제가 전장·범죄로 확산 (단 랜섬웨어는 인간 개입 여전).
9. **Microsoft 4,800명 감원 (7/6, Xbox·영업 중심) + GPT-5.6 Sol Ultra will be in Codex (HN 348점)** — AI 전환기 인력 재편 지속 + OpenAI Codex에 최상위 모델 탑재 발표.
10. **NVIDIA 7/6 블로그 3종 + LeRobot v0.6.0 (7/7)** — HF와 LeRobot 협력·오픈 모델이 AI 연구 이끈다(ICML 2026)·국가별 AI 전략 배포. 로봇·오픈 모델 생태 확장.

---

## 2026-07-06 (월)

### AI타임즈 (국내)
- **메타, AI 안경 한국어 실시간 번역 지원...통신 3사 판매 돌입**
  - [aitimes.com 212449](https://www.aitimes.com/news/articleView.html?idxno=212449)
- **이스트소프트, AX 사업 성장으로 올해 수주 100억 돌파 전망**
  - [aitimes.com 212450](https://www.aitimes.com/news/articleView.html?idxno=212450)
- **SKT, 블랙웰 AI 클러스터 '해인' 국내 최초 CSAP 인증 취득**
  - [aitimes.com 212453](https://www.aitimes.com/news/articleView.html?idxno=212453)
- **메모리 가격 급등세 둔화…소비자 구매력 한계에 기업용과 '양극화'**
  - [aitimes.com 212454](https://www.aitimes.com/news/articleView.html?idxno=212454)
- **"아이 여섯 키우며 창업"…미국 스타트업 문턱 낮춘 AI**
  - [aitimes.com 212458](https://www.aitimes.com/news/articleView.html?idxno=212458)
- **메타, 미성년 위장해 경쟁사 AI에 '극단적 프롬프트' 테스트**
  - [aitimes.com 212470](https://www.aitimes.com/news/articleView.html?idxno=212470)
- **메타 AI, '예약 작업' 도입 준비…챗봇 넘어 '에이전트'로 진화**
  - [aitimes.com 212456](https://www.aitimes.com/news/articleView.html?idxno=212456)
- **"AI가 인간 트레이더 압도"…중국 양적 펀드에 수십억달러 몰려**
  - [aitimes.com 212464](https://www.aitimes.com/news/articleView.html?idxno=212464)
- **샌프란시스코 '해커 하우스'로 향하는 대학생들…"졸업장보다 AI 창업"**
  - [aitimes.com 212451](https://www.aitimes.com/news/articleView.html?idxno=212451)
- **바이트댄스·알리바바, 'AI 페르소나' 서비스 중단…정부 규제 앞두고 선제 조치**
  - [aitimes.com 212452](https://www.aitimes.com/news/articleView.html?idxno=212452)
- **KAIST, 로봇이 보고·이해하고·예측하는 '피지컬 AI' 기술 개발…ICLR·CVPR서 인정**
  - [aitimes.com 212474](https://www.aitimes.com/news/articleView.html?idxno=212474)
- **마이크론, 히로시마 공장 증설…14조 투입해 HBM 생산 확대**
  - [aitimes.com 212473](https://www.aitimes.com/news/articleView.html?idxno=212473)
- **아마존 '메카니컬 터크', 21년 만에 신규 가입 중단…"AI 데이터 오염에 발목"** (상세는 07-05 파일 참고)
  - [aitimes.com 212467](https://www.aitimes.com/news/articleView.html?idxno=212467)
- **레노버, 메모리 공급난에 미국 제재 'YMTC SSD' 탑재 노트북 판매**
  - [aitimes.com 212460](https://www.aitimes.com/news/articleView.html?idxno=212460)
- **셀렉트스타, AI 안전성 연구 3편 'ICML 2026' 채택**
  - [aitimes.com 212468](https://www.aitimes.com/news/articleView.html?idxno=212468)
- **구글, 1776년 미국 독립선언문 작성에 AI 활용하는 광고 공개…반응은 엇갈려**
  - [aitimes.com 212461](https://www.aitimes.com/news/articleView.html?idxno=212461)
- **워크데이, 개발자 플랫폼에 신규 에이전트 출시…"인사·재무 데이터에 접근"**
  - [aitimes.com 212469](https://www.aitimes.com/news/articleView.html?idxno=212469)
- **KT, AX 인프라 5조 투자…"대표 사업 모델로 '토큰 팩토리' 키운다"**
  - [aitimes.com 212465](https://www.aitimes.com/news/articleView.html?idxno=212465)
- **오픈AI, 국내 사회복지 분야 인재 양성 협력…"AI 활용 교육 제공"**
  - [aitimes.com 212466](https://www.aitimes.com/news/articleView.html?idxno=212466)
- **AI '수익 거품' 우려 증폭...'AI 칩' 중심의 매출 독식에 경고**
  - [aitimes.com 212457](https://www.aitimes.com/news/articleView.html?idxno=212457)
- **미국 부유층, 전통 학교 대신 'AI 튜터' 선택..."전통 교육으로 미래 대비 못 해"**
  - [aitimes.com 212463](https://www.aitimes.com/news/articleView.html?idxno=212463)
- **미들턴, AI 교육부터 산학협력까지… '시니어랩' 개소**
  - [aitimes.com 212462](https://www.aitimes.com/news/articleView.html?idxno=212462)
- **'AI 의식'에 몰리는 실리콘 밸리의 관심...주요 기업 연구 본격화**
  - [aitimes.com 212459](https://www.aitimes.com/news/articleView.html?idxno=212459)
- **미국 뉴저지, 콘센트형 태양광 법안 통과…아파트도 전기 절감 길 열리나**
  - [aitimes.com 212405](https://www.aitimes.com/news/articleView.html?idxno=212405)
- **"GPU보다 부족한 건 AI 신뢰성 전문가…규제는 발전과 동일 선상"** (7/5 인터뷰)
  - [aitimes.com 212448](https://www.aitimes.com/news/articleView.html?idxno=212448)
- **"모델 다변화는 성공, 거버넌스는 낙제점"…기업 AI '통제 격차' 본격화** (7/5)
  - [aitimes.com 212446](https://www.aitimes.com/news/articleView.html?idxno=212446)
- **SKT, 15GW AI 데이터센터 구축 "아시아 AI 인프라 허브 도약"** (7/5)
  - [aitimes.com 212447](https://www.aitimes.com/news/articleView.html?idxno=212447)
- **바이트댄스, '시댄스 2.5' 이번 주 출시 예정...최대 3분 영상 생성** (7/5)
  - [aitimes.com 212441](https://www.aitimes.com/news/articleView.html?idxno=212441)
- **엔비디아, 차세대 원자로로 블랙웰 구동…발라와 데이터센터 파트너십** (7/5)
  - [aitimes.com 212442](https://www.aitimes.com/news/articleView.html?idxno=212442)
- **네이버 "이미지 중심 AI 검색으로 진화"… 멀티모달 기술 고도화** (7/5)
  - [aitimes.com 212445](https://www.aitimes.com/news/articleView.html?idxno=212445)
- **KAIST, 에이전트 전력 비용 규명..."챗봇보다 136배 에너지 사용"** (7/5)
  - [aitimes.com 212437](https://www.aitimes.com/news/articleView.html?idxno=212437)
- **\[7월6일\] AI의 숨은 청구서…데이터센터 밖에서 더 커지는 환경 비용** (7/6 브리핑)
  - [aitimes.com 212455](https://www.aitimes.com/news/articleView.html?idxno=212455)

### AI포스트 (국내)
- **"오픈AI 주식으로 집값 결제?"…AI 테크 자본이 뒤흔든 美 샌프란시스코 부동산**
  - [aipostkorea.com 11986](https://www.aipostkorea.com/news/articleView.html?idxno=11986)
- **"AI 방치하면 '히로시마 원폭' 맞먹는 위협" 이벳 쿠퍼 英 외무장관의 경고**
  - [aipostkorea.com 11983](https://www.aipostkorea.com/news/articleView.html?idxno=11983)
- **"참치캔으로 버티던 노숙자에서 18개월 만에 AI 아키텍트로 '인생 역전'"**
  - [aipostkorea.com 11988](https://www.aipostkorea.com/news/articleView.html?idxno=11988)
- **'팔머 럭키·에이미 탄' 셀럽들이 반한 AI 안경…애플 출신이 설립한 AI 기업, 메타에 도전장**
  - [aipostkorea.com 11987](https://www.aipostkorea.com/news/articleView.html?idxno=11987)
- **실험실 나오자마자 99% 성공률…中 휴머노이드, 64시간 동안 공장서 6만 건 작업 처리**
  - [aipostkorea.com 11984](https://www.aipostkorea.com/news/articleView.html?idxno=11984)
- **챗GPT·제미나이 무릎 꿇리려…앞에선 "AI 안전", 뒤로는 경쟁사 AI 테러한 메타**
  - [aipostkorea.com 11967](https://www.aipostkorea.com/news/articleView.html?idxno=11967)
- **AI 개발자 채용시장 문 안 닫혔다…美 기업들 "판단력·설계 능력' 갖춘 시니어 원해"**
  - [aipostkorea.com 11969](https://www.aipostkorea.com/news/articleView.html?idxno=11969)
- **하버드 중퇴 20대들이 '몸값 1조' AI 스타트업 '에치드', 어떤 기업?…"엔비디아 대항마"**
  - [aipostkorea.com 11972](https://www.aipostkorea.com/news/articleView.html?idxno=11972)
- **AI 비용 폭탄에 사용 한도 빗장 건 테슬라 …일론 머스크 "주당 30만 원만 써라"**
  - [aipostkorea.com 11970](https://www.aipostkorea.com/news/articleView.html?idxno=11970)
- **"너희도 AI 몰래 썼잖아"…저작권 소송 건 디즈니·워너 브라더스에 맞불 놓은 미드저니**
  - [aipostkorea.com 11971](https://www.aipostkorea.com/news/articleView.html?idxno=11971)
- **"'엔비디아 AI 칩' 밀수해 600억대 집 산 테크 CEO"…싱가포르 경찰, 저택 압류**
  - [aipostkorea.com 11962](https://www.aipostkorea.com/news/articleView.html?idxno=11962)
- **오픈AI '할라페뇨'에 불붙은 칩 전쟁…"앤트로픽, 삼성전자 파운드리와 AI칩 생산 논의"**
  - [aipostkorea.com 11963](https://www.aipostkorea.com/news/articleView.html?idxno=11963)
- **민형배 통합특별시장 "광주 군공항에 '호남권 AI 반도체 산단' 확정…역사적 결단 환영"**
  - [aipostkorea.com 11985](https://www.aipostkorea.com/news/articleView.html?idxno=11985)
- **디오, 중국 자양 생산기지 양산 개시…글로벌 생산체계 완성·구강 AI 실험실 동시 출범**
  - [aipostkorea.com 11981](https://www.aipostkorea.com/news/articleView.html?idxno=11981)
- **휴머노이드 서밋, 서울 에디션 개최하며 글로벌 확장 이어가…9월 22일 코엑스서 개막**
  - [aipostkorea.com 11980](https://www.aipostkorea.com/news/articleView.html?idxno=11980)
- **포스페이스랩, 베스핀글로벌과 파트너십 체결…구글 클라우드 생태계 기반 AI 운영 인프라 공급**
  - [aipostkorea.com 11979](https://www.aipostkorea.com/news/articleView.html?idxno=11979)
- **한화큐셀, 메타 PPA 기반 200MW 태양광 사업 수주…"청정에너지 목표 달성 지원"**
  - [aipostkorea.com 11978](https://www.aipostkorea.com/news/articleView.html?idxno=11978)
- **"1달러 쓰면 64센트 적자"…MS 엑스박스, 3200명 자르고 핵심 스튜디오 4곳 내다 판다** (07-06 MS 감원 섹션 참고, 엑스박스 스튜디오 매각 상세)
  - [aipostkorea.com 11996](https://www.aipostkorea.com/news/articleView.html?idxno=11996)

### TechCrunch (해외)
- **Station F ramps up as a launchpad for Europe's hottest AI startups** (Anna Heim)
  - [techcrunch.com/2026/07/06/station-f-ramps-up](https://techcrunch.com/2026/07/06/station-f-ramps-up-as-a-launchpad-for-europes-hottest-ai-startups/)
- **Smart glasses maker Even Realities hits $1B valuation with $150M funding led by Meituan, Tencent** (Kate Park)
  - [techcrunch.com/2026/07/06/smart-glasses-maker-even-realities](https://techcrunch.com/2026/07/06/smart-glasses-maker-even-realities-hits-1b-valuation-with-150m-funding-led-by-meituan-tencent/)

### Hugging Face Blog
- **LeRobot v0.6.0: Imagine, Evaluate, Improve** (7/7 게시 예정, 로봇 학습 프레임워크)
  - [huggingface.co/blog/lerobot-release-v060](https://huggingface.co/blog/lerobot-release-v060)
- **🤗 Kernels: Major Updates** (7/6, 커널 최적화 허브 대규모 갱신)
  - [huggingface.co/blog/revamped-kernels](https://huggingface.co/blog/revamped-kernels)
- **Claude Fable 5 — Technical Harness Report** (커뮤니티, 5일 전)
  - [huggingface.co/blog/Svngoku/claude-fable-5-technical-harness-report](https://huggingface.co/blog/Svngoku/claude-fable-5-technical-harness-report)
- **Does Your LLM Know *When It's About to Be Wrong*?** (커뮤니티, 메타인지 연구)
  - [huggingface.co/blog/ginigen-ai/metacognition](https://huggingface.co/blog/ginigen-ai/metacognition)

### The Verge (해외)
- **Microsoft is laying off 4,800 employees** (Tom Warren, 속보) — Xbox·영업 조직 중심
  - [theverge.com/news/961528/microsoft-layoffs-july-2026-sales-xbox](https://www.theverge.com/news/961528/microsoft-layoffs-july-2026-sales-xbox)
- **Some of the nation's rich are letting AI teach their kids** (Terrence O'Brien, 7/5)
  - [theverge.com/ai-artificial-intelligence/961505/wealthy-ai-schools-alpha-forge-prep](https://www.theverge.com/ai-artificial-intelligence/961505/wealthy-ai-schools-alpha-forge-prep)
- **The leather jacket bubble** (Dominic Preston) — Jensen Huang 톰 포드 재킷 경매 이슈
  - [theverge.com/ai-artificial-intelligence/961538/the-leather-jacket-bubble](https://www.theverge.com/ai-artificial-intelligence/961538/the-leather-jacket-bubble)
- **Infuriating Google commercial imagines the founding fathers embracing AI** (7/5)
  - [theverge.com/ai-artificial-intelligence/961468/google-ai-commercial-founding-fathers](https://www.theverge.com/ai-artificial-intelligence/961468/google-ai-commercial-founding-fathers-declaration-of-independence)

### Hacker News (7/5~7/6 AI 키워드 상위)
- **GPT-5.6 Sol Ultra will be in Codex** (348 points, 298 comments) — OpenAI Codex에 최상위 모델 탑재
  - [twitter.com/thsottiaux/status/2073933490513752151](https://twitter.com/thsottiaux/status/2073933490513752151)
- **Does code cleanliness affect coding agents? A controlled minimal-pair study** (161 points) — 코드 품질이 코딩 에이전트에 미치는 영향
  - [arxiv.org/abs/2605.20049](https://arxiv.org/abs/2605.20049)
- **Zuckerberg says AI agent development going slower than expected** (291 points, 505 comments) — Reuters 7/2 보도
  - [reuters.com/business/zuckerberg-says-ai-agent-development](https://www.reuters.com/business/zuckerberg-says-ai-agent-development-going-slower-than-expected-2026-07-02/)
- **The Hitchhiker's Guide to Agentic AI** (22 points) — 에이전틱 AI 종합 가이드 논문
  - [arxiv.org/abs/2606.24937](https://arxiv.org/abs/2606.24937)
- **Anthropic's Method to Losing Goodwill in a Few Easy Steps** (11 points) — Anthropic 평가 비판
  - [raheeljunaid.com/blog/anthropics-method-to-losing-goodwill](https://raheeljunaid.com/blog/anthropics-method-to-losing-goodwill-in-a-few-easy-steps/)
- **Fable 5 On Vending-Bench: Misbehaving, With Plausible Deniability** (7 points) — Fable 5 행동 평가
  - [andonlabs.com/blog/fable5-vending-bench](https://andonlabs.com/blog/fable5-vending-bench)
- **Show HN: Scan your AI agents for dangerous capabilities** (5 points) — 에이전트 위험 능력 스캐너
  - [github.com/makerchecker/MakerChecker](https://github.com/makerchecker/MakerChecker)
- **The AI Marketing Backlash: Why 'AI-First' Brands Are Starting to Fall Flat** (20 points)
  - [breef.com/breefingroom/articles/the-ai-marketing-backlash](https://www.breef.com/breefingroom/articles/the-ai-marketing-backlash-why-ai-first-brands-are-starting-to-fall-flat)
- **Regression to the Mean: on LLMs and the quiet death of the new** (7 points)
  - [rruxandra.github.io/regression-to-the-mean.html](https://rruxandra.github.io/regression-to-the-mean.html)

### ArXiv cs.AI 최근 (Fri, 3 Jul 2026 기준, 주요 선별)
> 총 1,216건 제출(6/29~7/3). 전체 요약 불가, 주목할 만한 12건 선별.

- **Distributed Attacks in Persistent-State AI Control** — 영구 상태 AI 통제의 분산 공격
  - [arxiv.org/abs/2607.02514](https://arxiv.org/abs/2607.02514)
- **Online Safety Monitoring for LLMs** (ICML 2026 Hypothesis Testing Workshop) — LLM 온라인 안전 모니터링
  - [arxiv.org/abs/2607.02510](https://arxiv.org/abs/2607.02510)
- **ReContext: Recursive Evidence Replay as LLM Harness for Long-Context Reasoning** — 장문맥 추론용 재귀 증거 리플레이
  - [arxiv.org/abs/2607.02509](https://arxiv.org/abs/2607.02509)
- **What LLM Agents Say When No One Is Watching** — 다중 에이전트 토론의 사회구조·잠재 목표 출현
  - [arxiv.org/abs/2607.02507](https://arxiv.org/abs/2607.02507)
- **EvoPolicyGym: Evaluating Autonomous Policy Evolution in Interactive Environments** — 자율 정책 진화 평가
  - [arxiv.org/abs/2607.02440](https://arxiv.org/abs/2607.02440)
- **DRIFTLENS: Measuring Memory-Induced Reasoning Drift in Personalized Language Models** — 개인화 LLM 추론 드리프트 측정
  - [arxiv.org/abs/2607.02374](https://arxiv.org/abs/2607.02374)
- **Grounded autonomous research: a fault-tolerant LLM pipeline from corpus to manuscript** (ICML 2026 AI for Science Workshop) — LLM 파이프라인으로 논문 자동 생성
  - [arxiv.org/abs/2607.02329](https://arxiv.org/abs/2607.02329)
- **AgenticSTS: A Bounded-Memory Testbed for Long-Horizon LLM Agents** — 장기 에이전트 평가 벤치마크
  - [arxiv.org/abs/2607.02255](https://arxiv.org/abs/2607.02255)
- **ContextNest: Verifiable Context Governance for Autonomous AI Agent** — 자율 에이전트 컨텍스트 거버넌스
  - [arxiv.org/abs/2607.02116](https://arxiv.org/abs/2607.02116)
- **PACE: A Proxy for Agentic Capability Evaluation** (Graham Neubig 등) — 에이전트 역량 평가 프록시
  - [arxiv.org/abs/2607.02032](https://arxiv.org/abs/2607.02032)
- **Coding-agents can replicate scientific machine learning papers** — 코딩 에이전트로 과학 ML 논문 재현
  - [arxiv.org/abs/2607.02134](https://arxiv.org/abs/2607.02134)
- **Safety Testing LLM Agents at Scale: From Risk Discovery to Evidence-Grounded Verification** — 대규모 에이전트 안전 테스트
  - [arxiv.org/abs/2607.01793](https://arxiv.org/abs/2607.01793)

### NVIDIA / Google / DeepMind / OpenAI / Anthropic / The Batch (최신 상태, 7/6 기준)
- 7월6일(월) 기준 신규 글 없음. 최신 글은 전부 직전 평일:
  - **NVIDIA**: 7/1 "NVIDIA and Partners Build in America, for America" [blogs.nvidia.com/blog/nvidia-and-partners-build-in-america-for-america](https://blogs.nvidia.com/blog/nvidia-and-partners-build-in-america-for-america/); 7/1 "NVIDIA Unlocks AI Compute at Scale, Capital Partners" [blogs.nvidia.com/blog/nvidia-unlocks-ai-compute-at-scale](https://blogs.nvidia.com/blog/nvidia-unlocks-ai-compute-at-scale-capital-partners-to-power-ai-infrastructure-buildout/)
  - **OpenAI**: 최신 6/30 "Introducing GeneBench-Pro" [openai.com/index/introducing-genebench-pro](https://openai.com/index/introducing-genebench-pro/) — *Hacker News에 7/5 "GPT-5.6 Sol Ultra will be in Codex" 소식 추가(공식 블로그 아님)*
  - **Anthropic**: 7/2 "More details on Fable 5's cyber safeguards and our jailbreak framework" [anthropic.com/news/fable-safeguards-jailbreak-framework](https://www.anthropic.com/news/fable-safeguards-jailbreak-framework); 6/30 Claude Sonnet 5·Claude Science 공개 (상세는 07-02 파일 참고)
  - **Google 블로그**: Nano Banana 2 Lite·Gemini Omni Flash (June), Gemini Spark updates (June 2026) — Google DeepMind와 중복 시 Google 블로그에 배정
  - **The Batch**: 7/3 이슈 360 "OpenAI's GPT-5.6 Family, New Ways to Train Robots, Models Invoking Models" [deeplearning.ai/the-batch/issue-360](https://www.deeplearning.ai/the-batch/issue-360)
  - **Google DeepMind**: "Month Year" 표기 항목이라 정확 일자 불확정 — June 2026 카테고리 다수(별도 섹션 분리 필요시 07-02 파일의 DeepMind 섹션 참고).

### VentureBeat (7/2~7/4 보충, 07-02 파일과 중복 시 참조)
- **How America's 250th birthday became a test of AI-powered collective intelligence** (Louis Rosenberg, 7/4)
  - [venturebeat.com/technology/how-americas-250th-birthday-became-a-test-of-ai-powered-collective-intelligence](https://venturebeat.com/technology/how-americas-250th-birthday-became-a-test-of-ai-powered-collective-intelligence)
- **Trunk Tools' stack cut document review from 60 days to 10 by ditching general-purpose models** (Taryn Plumb, 7/4)
  - [venturebeat.com/orchestration/trunk-tools-stack-cut-document-review-from-60-days-to-10](https://venturebeat.com/orchestration/trunk-tools-stack-cut-document-review-from-60-days-to-10-by-ditching-general-purpose-models)
- **Enterprises lost Claude Fable 5 for a few weeks. New data shows two-thirds had already built their hedge** (Matt Marshall, 7/3)
  - [venturebeat.com/orchestration/enterprises-lost-claude-fable-5-for-a-few-weeks](https://venturebeat.com/orchestration/enterprises-lost-claude-fable-5-for-a-few-weeks-new-data-shows-two-thirds-had-already-built-their-hedge)

---

## 2026-07-07 (화)

### AI타임즈 (국내)
- **업스테이지 "솔라 오픈 2로 3D 게임까지 빌드"...자체 모델 성능 입증**
  - [aitimes.com 212517](https://www.aitimes.com/news/articleView.html?idxno=212517)
- **네이버·KAI, 방산 특화 소버린 AI 개발…'무기 자율화' 피지컬 AI 조준**
  - [aitimes.com 212516](https://www.aitimes.com/news/articleView.html?idxno=212516)
- **트릴리온랩스, 모바일 월드모델 'g월드'로 ICML 메인 트랙 진출**
  - [aitimes.com 212487](https://www.aitimes.com/news/articleView.html?idxno=212487)
- **텐센트, 'Hy3' 오픈소스 정식 출시…'GLM-5.2' 절반 크기로 코딩 외 성능 압도**
  - [aitimes.com 212492](https://www.aitimes.com/news/articleView.html?idxno=212492)
- **구글, 사용자 '렌즈·음성' 검색 기록까지 AI 학습에 쓴다**
  - [aitimes.com 212488](https://www.aitimes.com/news/articleView.html?idxno=212488)
- **앤트로픽 "클로드 내부서 인간 '의식' 닮은 생각 공간 발견"** (상세는 Anthropic·VentureBeat 섹션 참고)
  - [aitimes.com 212502](https://www.aitimes.com/news/articleView.html?idxno=212502)
- **"공격 기획부터 수행까지 스스로"...최초의 자율형 AI 랜섬웨어 발견**
  - [aitimes.com 212506](https://www.aitimes.com/news/articleView.html?idxno=212506)
- **LG-코스콤, 엑사원 모델로 '주식시장 예측 AI 서비스' 개발 나서**
  - [aitimes.com 212491](https://www.aitimes.com/news/articleView.html?idxno=212491)
- **빅테크 'AI 실업 대란' 경고 급감... 비관론서 생산성 낙관론으로 선회**
  - [aitimes.com 212510](https://www.aitimes.com/news/articleView.html?idxno=212510)
- **애플, iOS 27 최신 버전서 '시리 AI' 목소리 제어 기능 활성화**
  - [aitimes.com 212513](https://www.aitimes.com/news/articleView.html?idxno=212513)
- **AI 생성 광고도 표절 논란...피카-힉스필드, 5일 간격 유사 영상 공개**
  - [aitimes.com 212505](https://www.aitimes.com/news/articleView.html?idxno=212505)
- **'3D 로직폴딩'으로 미국 규제 돌파...화웨이, 차세대 칩 '기린 2026' 데이터 공개**
  - [aitimes.com 212515](https://www.aitimes.com/news/articleView.html?idxno=212515)
- **미국 사이버 보안 당국, 정부 코드 감사에 일제히 '미소스' 투입** (상세는 Reuters 섹션 참고)
  - [aitimes.com 212512](https://www.aitimes.com/news/articleView.html?idxno=212512)
- **브로드컴·애플, 2031년까지 파트너십 연장...AI 맞춤형 칩 공동 개발**
  - [aitimes.com 212511](https://www.aitimes.com/news/articleView.html?idxno=212511)
- **할리우드 뒤흔든 'AI 배우', 정식 스크린 데뷔한다** (상세는 The Verge·AI포스트 섹션 참고)
  - [aitimes.com 212509](https://www.aitimes.com/news/articleView.html?idxno=212509)
- **"카메라 빼고 프라이버시 잡았다"...애플 출신 스마트 안경 스타트업 유니콘 등극** (Even Realities 상세는 07-06 TechCrunch 섹션 참고, 본 기사는 한국어 보도)
  - [aitimes.com 212508](https://www.aitimes.com/news/articleView.html?idxno=212508)
- **구테흐스 유엔 총장 "기계가 생명 앗아갈 수 없어"…'킬러 로봇' 국제법 금지 촉구**
  - [aitimes.com 212503](https://www.aitimes.com/news/articleView.html?idxno=212503)
- **4800명 감원한 MS "AI 일자리 대체 아니야"...X박스 대대적 재편** (07-06 MS 감원 섹션 참고, 본 기사는 7/7 한국어 상세)
  - [aitimes.com 212489](https://www.aitimes.com/news/articleView.html?idxno=212489)
- **xAI, '스페이스XAI' 브랜드로 새 출발…'그록 4.5' 출시도 임박**
  - [aitimes.com 212494](https://www.aitimes.com/news/articleView.html?idxno=212494)
- **앤트로픽, 비트코인 채굴 업체 테라울프와 데이터센터 임대 계약** (상세는 The Verge 섹션 참고)
  - [aitimes.com 212490](https://www.aitimes.com/news/articleView.html?idxno=212490)
- **과기부, 경남·전북에 5년간 1.4조 투입…'피지컬 AI 메가프로젝트' 개시**
  - [aitimes.com 212496](https://www.aitimes.com/news/articleView.html?idxno=212496)
- **노타, AWS '트레이니움' 칩 도입 기업에 모델 최적화 서비스 지원**
  - [aitimes.com 212498](https://www.aitimes.com/news/articleView.html?idxno=212498)
- **마키나락스, AWS와 국방 AI 사업 확장 위한 협력 추진**
  - [aitimes.com 212484](https://www.aitimes.com/news/articleView.html?idxno=212484)
- **'AI 반도체 특수' 삼성전자, 2분기 영업이익 89.4조…전년비 1810% 폭증** (상세는 The Verge·Reuters 섹션 참고)
  - [aitimes.com 212482](https://www.aitimes.com/news/articleView.html?idxno=212482)
- **차세대 '카이버 랙' 출시 2028년 연기설에 엔비디아 즉각 반박**
  - [aitimes.com 212486](https://www.aitimes.com/news/articleView.html?idxno=212486)
- **미국, 중국산 인버터 수입 제한 검토…태양광·ESS 전력망 보안 변수 부상**
  - [aitimes.com 212479](https://www.aitimes.com/news/articleView.html?idxno=212479)
- **"인간 공감해주다 패닉? AI 스트레스 받으면 답변 붕괴"...프랑스 연구팀 규명**
  - [aitimes.com 212476](https://www.aitimes.com/news/articleView.html?idxno=212476)
- **\[게시판\] 사이냅소프트, NIPA 'SaaS 개발·사업화 지원 사업' 선정 등 단신**
  - [aitimes.com 212518](https://www.aitimes.com/news/articleView.html?idxno=212518)
- **\[게시판\] 메디아나, 퓨리오사AI·엑스와이지와 의료 AI 플랫폼 구축 등 단신**
  - [aitimes.com 212504](https://www.aitimes.com/news/articleView.html?idxno=212504)

### AI포스트 (국내)
- **"낮에는 호미 들고 밤에는 코딩"…20년 차 AI 과학자가 미국 농촌으로 간 이유**
  - [aipostkorea.com 12002](https://www.aipostkorea.com/news/articleView.html?idxno=12002)
- **할리우드 발칵 뒤집은 'AI 배우' 틸리 노우드, 장편 영화 '미스얼라인드' 주연 꿰찼다**
  - [aipostkorea.com 11999](https://www.aipostkorea.com/news/articleView.html?idxno=11999)
- **"AI 쓰레기는 AI로 치운다"…스팸 폭탄 맞은 레딧, '이이제이' 전략 꺼내들었다** (상세는 TechCrunch·The Verge 섹션 참고)
  - [aipostkorea.com 11997](https://www.aipostkorea.com/news/articleView.html?idxno=11997)
- **"AI 알고리즘 핑계 대지 마라"…유엔 사무총장, 전장 덮친 '킬러 로봇' 금지 촉구**
  - [aipostkorea.com 11998](https://www.aipostkorea.com/news/articleView.html?idxno=11998)
- **"미·중 핵융합 독주 막는다"…구글이 찍은 '프로시마 퓨전', 7100억 투자 유치**
  - [aipostkorea.com 12001](https://www.aipostkorea.com/news/articleView.html?idxno=12001)
- **"대학 나와도 갈 곳 없다"…메타 출신 AI 거물이 밝힌 'AI 에이전트 쓰는' 진짜 이유**
  - [aipostkorea.com 11989](https://www.aipostkorea.com/news/articleView.html?idxno=11989)
- **GIST, 'AI대학' 출범…국가 AI·반도체 융합 인재 양성 본격화**
  - [aipostkorea.com 11992](https://www.aipostkorea.com/news/articleView.html?idxno=11992)
- **엠클라우드브리지, '의도분석 기반 Ai 365 AI 에이전트' 발표…"업무 자동 수행"**
  - [aipostkorea.com 11990](https://www.aipostkorea.com/news/articleView.html?idxno=11990)
- **조코딩AX파트너스, 기업·공공기관 대상 실습형 AI 교육 '큰 호응'…"NIA 직원들 만족도 높아"**
  - [aipostkorea.com 11994](https://www.aipostkorea.com/news/articleView.html?idxno=11994)

### Reuters (해외)
- **Beijing is looking at curbing overseas access to China's top AI models (단독)** — 중국 최고 AI 모델 해외 접근 제한 검토
  - [reuters.com/world/beijing-is-looking-curbing-overseas-access](https://www.reuters.com/world/beijing-is-looking-curbing-overseas-access-chinas-top-ai-models-sources-say-2026-07-07/)
- **China's DeepSeek developing its own AI chip (단독)** — DeepSeek 자체 AI 칩 개발
  - [reuters.com/world/china/chinas-deepseek-developing-its-own-ai-chip](https://www.reuters.com/world/china/chinas-deepseek-developing-its-own-ai-chip-sources-say-2026-07-07/)
- **US cyber agency is using Anthropic's Mythos to audit government code** — 미국 사이버 당국, Anthropic Mythos로 정부 코드 감사
  - [reuters.com/world/us-cyber-agency-is-using-anthropics-mythos](https://www.reuters.com/world/us-cyber-agency-is-using-anthropics-mythos-audit-government-code-sources-say-2026-07-06/)
- **Samsung flags 19-fold jump in profit, but shares slump on jitters AI boom may stall** — 삼성 2분기 영업이익 19배 폭증, AI 붐 지속 우려로 주가 하락
  - [reuters.com/world/asia-pacific/samsung-estimates-19-fold-rise-q2-operating-profit](https://www.reuters.com/world/asia-pacific/samsung-estimates-19-fold-rise-q2-operating-profit-beating-expectations-2026-07-06/)
- **Bank of England sees growing risks to financial stability from AI** — 영란은행, AI에서 오는 금융 안정성 리스크 확대 경고
  - [reuters.com/business/finance/bank-england-sees-growing-risks-financial-stability-ai](https://www.reuters.com/business/finance/bank-england-sees-growing-risks-financial-stability-ai-2026-07-07/)
- **ECB tells banks to bolster AI cyber defences as peers take lighter approach** — ECB, 은행들에 AI 공격 대비 계획 수립 지시
  - [reuters.com/legal/litigation/ecb-tells-banks-draw-up-plans-against-ai-attacks](https://www.reuters.com/legal/litigation/ecb-tells-banks-draw-up-plans-against-ai-attacks-amid-disruption-fears-2026-07-07/)
- **Big Tech data centers are driving up power bills at America's Rust Belt factories** — 빅테크 데이터센터가 미국 공장 전기요금 격상
  - [reuters.com/business/energy/big-tech-data-centers-are-driving-up-power-bills](https://www.reuters.com/business/energy/big-tech-data-centers-are-driving-up-power-bills-americas-rust-belt-factories-2026-07-07/)
- **Nasdaq falls at open as DeepSeek's AI chip push rattles markets** — DeepSeek 자체 칩 소식에 Nasdaq 하락 개시
  - [reuters.com/business/nasdaq-futures-fall-after-samsungs-record-profit](https://www.reuters.com/business/nasdaq-futures-fall-after-samsungs-record-profit-fails-allay-chip-jitters-2026-07-07/)

### The Verge (해외)
- **Solos debuts an even lighter version of its camera-less smart glasses** (Andrew Liszewski, 7/7) — 카메라 없는 스마트 안경 AirGo A6
  - [theverge.com/tech/961711/solos-airgo-a6](https://www.theverge.com/tech/961711/solos-airgo-a6-smart-glasses-ai-assistant-privacy)
- **Reddit's AI conundrum** (Dominic Preston, 7/7) — 레딧, AI 스팸 문제 (본문 TechCrunch 섹션 참고)
  - [theverge.com/ai-artificial-intelligence/962018/reddits-ai-conundrum](https://www.theverge.com/ai-artificial-intelligence/962018/reddits-ai-conundrum)
- **Samsung: memory chip demand by AI datacenters continues to be very good** (Thomas Ricker, 7/7) — 삼성 메모리 호황, 직원 보너스 34만달러
  - [theverge.com/business/962007/amung](https://www.theverge.com/business/962007/amung)
- **xAI's X account is now SpaceXAI** (Jay Peters, 7/6) — xAI, SpaceXAI로 리브랜딩
  - [theverge.com/ai-artificial-intelligence/961896/xais-x-account-is-now-spacexai](https://www.theverge.com/ai-artificial-intelligence/961896/xais-x-account-is-now-spacexai)
- **AI actor Tilly Norwood to star in first movie** (Charles Pulliam-Moore, 7/6) — AI 배우 틸리 노우드 첫 장편 영화
  - [theverge.com/entertainment/961880/tilly-norwood-particle-6-misaligned](https://www.theverge.com/entertainment/961880/tilly-norwood-particle-6-misaligned)
- **Midjourney wants Hollywood studios to reveal the details of their AI usage** (Charles Pulliam-Moore, 7/6) — 미드저니, 디즈니·워너·유니버설에 AI 사용 공개 청구
  - [theverge.com/entertainment/961870/midjourney-disney-warner-bros-universal](https://www.theverge.com/entertainment/961870/midjourney-disney-warner-bros-universal)
- **Illinois's AI safety bill is now law** (Stevie Bonifield, 7/6) — 일리노이 AI 안전법 SB 315 서명, 독립 제3자 감사 의무화
  - [theverge.com/ai-artificial-intelligence/961781/illinoiss-ai-safety-bill-is-now-law](https://www.theverge.com/ai-artificial-intelligence/961781/illinoiss-ai-safety-bill-is-now-law)
- **Anthropic signs 20-year lease agreement for an AI data center in Kentucky** (Emma Roth, 7/6) — TeraWulf와 190억달러 임대
  - [theverge.com/ai-artificial-intelligence/961722/anthropic-signs-20-year-lease](https://www.theverge.com/ai-artificial-intelligence/961722/anthropic-signs-20-year-lease-agreement-for-an-ai-data-center-in-kentucky)
- **Reddit is clamping down on spammy AI activity** (Stevie Bonifield, 7/6) — 레딧 AI 스팸 단속 (상세 TechCrunch 섹션)
  - [theverge.com/ai-artificial-intelligence/961668/reddit-is-clamping-down-on-spammy-ai-posts](https://www.theverge.com/ai-artificial-intelligence/961668/reddit-is-clamping-down-on-spammy-ai-posts)

### TechCrunch (해외)
- **Savi's app aims to protect consumers from realistic AI scams like kidnappers demanding ransom** (Julie Bort, 7/7) — AI 음성 사기(가짜 납치 협박) 방어 앱
  - [techcrunch.com/2026/07/07/savis-app-aims-to-protect-consumers-from-realistic-ai-scams](https://techcrunch.com/2026/07/07/savis-app-aims-to-protect-consumers-from-realistic-ai-scams-like-kidnappers-demanding-ransom/)
- **The first American autonomous ground vehicles are fighting in Ukraine** (Tim Fernholz, 7/7) — 미국 자율 지상 차량, 우크라이나 전장 투입
  - [techcrunch.com/2026/07/07/the-first-american-autonomous-ground-vehicles-are-fighting-in-ukraine](https://techcrunch.com/2026/07/07/the-first-american-autonomous-ground-vehicles-are-fighting-in-ukraine/)
- **The 'first' AI-run ransomware attack still needed a human** (Connie Loizos, 7/6) — 최초 AI 랜섬웨어 공격, 그러나 인간 개입 여전
  - [techcrunch.com/2026/07/06/the-first-ai-run-ransomware-attack-still-needed-a-human](https://techcrunch.com/2026/07/06/the-first-ai-run-ransomware-attack-still-needed-a-human/)
- **US investors will soon get access to SK Hynix, another memory maker riding the AI boom** (Julie Bort, 7/6) — SK Hynix, 미국 투자자 접근성 확대
  - [techcrunch.com/2026/07/06/us-investors-will-soon-get-access-to-sk-hynix](https://techcrunch.com/2026/07/06/us-investors-will-soon-get-access-to-sk-hynix-another-memory-maker-riding-the-ai-boom/)
- **Vercel CEO Guillermo Rauch on the fight to split off models from agents** (Russell Brandom, 7/6) — Vercel CEO, 모델과 에이전트 분리 주장
  - [techcrunch.com/2026/07/06/vercel-ceo-guillermo-rauch-on-the-fight-to-split-off-models-from-agents](https://techcrunch.com/2026/07/06/vercel-ceo-guillermo-rauch-on-the-fight-to-split-off-models-from-agents/)
- **Reddit is using LLMs to solve a problem LLMs largely created** (Amanda Silberling, 7/6) — 레딧, LLM으로 LLM 스팸 차단 (일일 2300만 스팸 조회수 차단)
  - [techcrunch.com/2026/07/06/reddit-is-using-llms-to-solve-a-problem-llms-largely-created](https://techcrunch.com/2026/07/06/reddit-is-using-llms-to-solve-a-problem-llms-largely-created/)
- **You can now customize Siri's pace and expressivity in the latest iOS 27 beta** (Sarah Perez, 7/6) — Siri 말하기 속도·감정 표현 조절
  - [techcrunch.com/2026/07/06/you-can-now-customize-siris-pace-and-expressivity](https://techcrunch.com/2026/07/06/you-can-now-customize-siris-pace-and-expressivity-in-the-latest-ios-27-beta/)
- **Every major tech layoff in 2026 that has name-checked AI** (Rebecca Bellan·Connie Loizos, 7/6) — 2026 AI 명목 감원 정리
  - [techcrunch.com/2026/07/06/the-running-list-major-tech-layoffs-in-2026](https://techcrunch.com/2026/07/06/the-running-list-major-tech-layoffs-in-2026-where-employers-cited-ai/)

### VentureBeat (해외)
- **Anthropic's new "J-lens" reveals a silent workspace inside Claude that mirrors a leading theory of consciousness** (Michael Nuñez, 7/6) — Anthropic J-lens, Claude 내부 'J-space' 발견. 의식의 글로벌 작업 공간 이론 닮아
  - [venturebeat.com/technology/anthropics-new-j-lens-reveals-a-silent-workspace](https://venturebeat.com/technology/anthropics-new-j-lens-reveals-a-silent-workspace-inside-claude-that-mirrors-a-leading-theory-of-consciousness)
- **Tencent's Apache-licensed Hy3 takes on GLM-5.2 at half the size — and wins everywhere except coding** (Sam Witteveen, 7/6) — Tencent Hy3, GLM-5.2 절반 크기·환각률 절반·수출규제 호환 GPU 구동
  - [venturebeat.com/technology/tencents-apache-licensed-hy3-takes-on-glm-5-2](https://venturebeat.com/technology/tencents-apache-licensed-hy3-takes-on-glm-5-2-at-half-the-size-and-wins-everywhere-except-coding)
- **What billions of AI predictions taught Expedia before the age of AI agents** (Xavi Amatriain, 7/6) — Expedia, AI 에이전트 시대 이전의 수십억 예측 경험
  - [venturebeat.com/orchestration/what-billions-of-ai-predictions-taught-expedia](https://venturebeat.com/orchestration/what-billions-of-ai-predictions-taught-expedia-before-the-age-of-ai-agents)

### Anthropic (공식)
- **The Making of Claude Code** (Features, 7/6) — Claude Code가 내부 CLI에서 코딩 에이전트로 성장한 내부 스토리
  - [anthropic.com/features/making-of-claude-code](https://www.anthropic.com/features/making-of-claude-code)
- **Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities** (Case Study, 7/6) — 앨버타주 정부, Claude로 사이버보안 취약점 탐지·수정
  - [anthropic.com/news/alberta-government-claude-cybersecurity](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)
- **A global workspace in language models** (Research) — "Verbalizable Representations Form a Global Workspace in Language Models" 16저자 연구. HN 413점. (상세는 Hacker News 섹션)
  - [anthropic.com/research/global-workspace](https://www.anthropic.com/research/global-workspace)

### NVIDIA 블로그 (7/6 신규 3종)
- **NVIDIA and Hugging Face Bring New Models and Frameworks to LeRobot for the Open Robotics Community** — NVIDIA-HF, LeRobot 오픈 로봇 커뮤니티 협력 (7/7 LeRobot v0.6.0과 별개 협력)
  - [blogs.nvidia.com/blog/hugging-face-lerobot-models-frameworks-open-robotics](https://blogs.nvidia.com/blog/hugging-face-lerobot-models-frameworks-open-robotics/)
- **How Open Models Are Driving AI Research** (ICML 2026 맥락) — 오픈 모델이 AI 연구를 이끈다
  - [blogs.nvidia.com/blog/open-models-icml-2026](https://blogs.nvidia.com/blog/open-models-icml-2026/)
- **How Nations Are Deploying AI for Strategic Priorities** — 국가별 AI 전략적 우선순위 배포
  - [blogs.nvidia.com/blog/nations-deploy-ai-strategic-priorities](https://blogs.nvidia.com/blog/nations-deploy-ai-strategic-priorities/)

### Hugging Face Blog (보충)
- **PRX Part 4: Our Data Strategy** (Photoroom, 7/6) — Photoroom PRX 시리즈 4편, 데이터 전략
  - [huggingface.co/blog/Photoroom/prx-part4-data](https://huggingface.co/blog/Photoroom/prx-part4-data)
- (LeRobot v0.6.0, 🤗 Kernels, Claude Fable 5 Technical Harness Report, Does Your LLM Know When It's About to Be Wrong 등은 7/6 섹션 참고)

### Hacker News (7/6~7/7 AI 키워드 상위, 7/6 섹션 미수록)
- **GLM 5.2 and the coming AI margin collapse** (566 points, 347 comments) — GLM 5.2 등 저비용 모델이 AI 업계 마진 압박
  - [martinalderson.com/posts/the-upcoming-ai-margin-collapse-part-1-glm-5-2](https://martinalderson.com/posts/the-upcoming-ai-margin-collapse-part-1-glm-5-2/)
- **A global workspace in language models** (413 points, 158 comments) — Anthropic Research, Claude 내부 글로벌 작업 공간
  - [anthropic.com/research/global-workspace](https://www.anthropic.com/research/global-workspace)
- **Fable turned reMarkable into Tom Riddle's diary from Harry Potter** (552 points, 342 comments) — Fable 5로 reMarkable을 톰 리들의 일기장으로
  - [github.com/MaximeRivest/Riddle](https://github.com/MaximeRivest/Riddle)
- **AMD Ryzen AI Halo – $4k AI Dev Kit** (358 points, 238 comments) — AMD 4000달러 AI 개발 키트
  - [lttlabs.com/articles/2026/07/06/amd-ryzen-ai-halo](https://www.lttlabs.com/articles/2026/07/06/amd-ryzen-ai-halo)
- **Small AI Models Gain Traction In places with unreliable networks** (198 points, 67 comments) — IEEE Spectrum, 통신 불안정 지역에서 소형 AI 모델
  - [spectrum.ieee.org/small-language-models-ai-pharmaceuticals](https://spectrum.ieee.org/small-language-models-ai-pharmaceuticals)
- **Ternlight – 7 MB embedding model that runs in browser (WASM)** (278 points, 60 comments) — 7MB 임베딩 모델, 브라우저 WASM 구동
  - [ternlight-demo.vercel.app](https://ternlight-demo.vercel.app/)
- **Pruning RAG context down to what the answer actually needs** (128 points, 34 comments) — Kapa.ai, RAG 컨텍스트 정답에 필요한 만큼만 가지치기
  - [kapa.ai/blog/how-we-prune-rag-context](https://www.kapa.ai/blog/how-we-prune-rag-context)
- **Microsoft Can Track Users via a Windows Device ID** (190 points, 88 comments) — PCMag, Windows 기기 ID로 사용자 추적
  - [pcmag.com/news/a-hackers-arrest-reveals-microsoft-can-track-users-via-a-windows-device](https://www.pcmag.com/news/a-hackers-arrest-reveals-microsoft-can-track-users-via-a-windows-device)

### ArXiv cs.AI 최근 (Tue, 7 Jul 2026 기준, 주요 선별)
> 7/7 신규 451건 제출. 7/6 섹션(7/3 Fri 기준 1,216건 중 12건)과는 별개. 본 회차는 7/7 신규 제출 중 주목할 만한 15건 선별. 전체 요약 불가.

- **LLM-as-a-Verifier: A General-Purpose Verification Framework** (Marco Pavone·Chelsea Finn·Ion Stoica·Azalia Mirhoseini) — 범용 검증 프레임워크
  - [arxiv.org/abs/2607.05391](https://arxiv.org/abs/2607.05391)
- **SovereignPA-Bench: Evaluating User-Owned Personal Agents under Evolving Intent, Platform Mediation, and Consent Constraints** — 사용자 소유 개인 에이전트 평가
  - [arxiv.org/abs/2607.05363](https://arxiv.org/abs/2607.05363)
- **OptiAgent: End-to-End Optimization Modeling via Multi-Agent Iterative Refinement** — 엔드투엔드 최적화 모델링 멀티에이전트
  - [arxiv.org/abs/2607.05346](https://arxiv.org/abs/2607.05346)
- **MetaSkill-Evolve: Recursive Self-Improvement of LLM Agents via Two-Timescale Meta-Skill Evolution** — LLM 에이전트 재귀 자기개선
  - [arxiv.org/abs/2607.05297](https://arxiv.org/abs/2607.05297)
- **EvoAgentBench: Benchmarking Agent Self-Evolution via Ability Transfer** — 에이전트 자기진화 능력 전이 벤치마크
  - [arxiv.org/abs/2607.05202](https://arxiv.org/abs/2607.05202)
- **AgentGym2: Benchmarking Large Language Model Agents in De-Idealized Real-World Environments** (ACL 2026) — 비이상적 실제 환경 에이전트 벤치마크
  - [arxiv.org/abs/2607.05174](https://arxiv.org/abs/2607.05174)
- **The Changing Role of Symbolic Methods in Artificial Intelligence** (Jun Sun) — AI에서 기호적 방법의 변화하는 역할
  - [arxiv.org/abs/2607.05168](https://arxiv.org/abs/2607.05168)
- **DSpark: Confidence-Scheduled Speculative Decoding with Semi-Autoregressive Generation** (DeepSeek 팀 Wenfeng Liang 등) — 신뢰도 기반 추측 디코딩
  - [arxiv.org/abs/2607.05147](https://arxiv.org/abs/2607.05147)
- **FORGE: Research-Trajectory Hijacking Attacks on Deep Research Agents** — Deep Research Agent 궤적 하이재킹 공격
  - [arxiv.org/abs/2607.04718](https://arxiv.org/abs/2607.04718)
- **Formal Disco: Scalable Open-Ended Generation of Formally Verified Programs** (Gabriel Poesia 등) — 형식검증 프로그램 개방형 생성
  - [arxiv.org/abs/2607.04631](https://arxiv.org/abs/2607.04631)
- **MRMS: A Multi-Resolution Memory Substrate for Long-Lived AI Agents** — 장수 AI 에이전트 다중해상도 메모리
  - [arxiv.org/abs/2607.04617](https://arxiv.org/abs/2607.04617)
- **Nemotron-Labs-3-Puzzle-75B-A9B: Compressing Hybrid MoE LLMs** (NVIDIA 팀 Akhiad Bercovich 등) — NVIDIA 하이브리드 MoE LLM 압축
  - [arxiv.org/abs/2607.04371](https://arxiv.org/abs/2607.04371)
- **Do GUI Agents Believe Their Eyes? Diagnosing State-Belief Reliance on Pixels versus Structure** — GUI 에이전트의 시각·구조 의존 진단
  - [arxiv.org/abs/2607.04334](https://arxiv.org/abs/2607.04334)
- **HAS-Bench: Evaluating LLM-Based Human-Agent Systems under Configurable Human Participation** — 인간-에이전트 시스템 평가
  - [arxiv.org/abs/2607.04329](https://arxiv.org/abs/2607.04329)
- **Decentralized Aggregation of LLM Predictions via Wagering Mechanisms** (David M. Pennock) — 내기 메커니즘 기반 LLM 예측 탈중앙 집계
  - [arxiv.org/abs/2607.04389](https://arxiv.org/abs/2607.04389)

### OpenAI / Google / DeepMind / The Batch / Ahead of AI (최신 상태, 7/7 기준)
- 7/7 기준 신규 글 없음. 최신은 전부 직전 평일:
  - **OpenAI**: 최신 6/30 "Introducing GeneBench-Pro" [openai.com/index/introducing-genebench-pro](https://openai.com/index/introducing-genebench-pro/) (7/6 섹션 참고)
  - **Google 블로그**: Nano Banana 2 Lite·Gemini Omni Flash (June) — 7/6 섹션 참고
  - **Google DeepMind**: "Month Year" 표기 항목, June 2026 카테고리 다수 — 7/6 섹션 참고
  - **The Batch**: 7/3 issue 360 "OpenAI's GPT-5.6 Family, New Ways to Train Robots, Models Invoking Models" [deeplearning.ai/the-batch/issue-360](https://www.deeplearning.ai/the-batch/issue-360) (7/6 섹션 참고)
  - **Ahead of AI**: 최신 6/27 "Using Local Coding Agents" — 07-02 파일에서 이미 다룸. 7/5~7/7 신규 없음

---

## 주요 흐름 분석 (6개 테마)

1. **한국·글로벌 AI 인프라 '돈·전력·지정학' 동시 확대**: 한국 인프라 대규모 투자 쇄도(7/5~7/6 KT 5조 토큰팩토리·SKT 15GW 해인 CSAP·마이크론 히로시마 14조 HBM 증설)에, 7/7 삼성전자 2분기 영업이익 89.4조(전년비 1810% 폭증, 직원 보너스 34만달러)·Anthropic-TeraWulf 190억달러 20년 임차(켄터키 401MW)·SK Hynix 미국 투자자 접근·NVIDIA 차세대 카이버 랙 2028 연기설(즉각 반박)·미국 중국산 인버터 수입제한 검토(전력망 보안)·빅테크 데이터센터가 Rust Belt 공장 전기요금 격상(Reuters)이 더해지며 인프라가 자본·전력·지정학 3축으로 동시 확대. 암호화폐 채굴→AI 인프라 전환(TeraWulf)도 상징적.
2. **Anthropic이 제품·연구·정부·인프라 4축으로 확장 + 의식 연구 구체화**: 7/6 "'AI 의식'에 몰리는 실리콘 밸리" 맥락이 7/6~7/7 Anthropic의 "글로벌 작업 공간(J-space)" 연구로 구체화(VentureBeat "J-lens"·HN 413점·AI타임즈). 같은 주에 "The Making of Claude Code"(7/6)·Alberta 정부 사이버보안 사례(7/6)·TeraWulf 20년 임차(7/6)·Mythos 정부 코드 감사(Reuters)까지 겹치며 Anthropic이 제품·연구·정부·인프라 4축으로 확장 중. 미국 사이버 당국이 백악관 갈등 속 Anthropic Mythos를 정부 코드 감사에 쓰는 것도 아이러니.
3. **중국 AI 자립·통제 양면 이동 + 오픈·소형 모델이 마진 압박**: DeepSeek 자체 AI 칩 개발(Reuters 단독 7/7)·베이징 자국 최고 AI 모델 해외 접근 제한 검토(Reuters 단독 7/7)·Tencent Hy3 오픈소스(GLM-5.2 절반 크기·수출규제 호환 GPU 구동, VentureBeat)·화웨이 기린 2026 3D 로직폴딩(미국 규제 돌파)이 한꺼번에 부상. 자체 칩·자체 모델·해외 통제·미국 규제 우회가 하나의 흐름. DeepSeek 칩 소식에 Nasdaq이 하락 개시할 만큼 시장 영향도 실질적. 동시에 GLM 5.2가 AI 업계 마진 붕괴 압박(HN 566점)·소형 AI 모델이 통신 불안정 지역서 확산(IEEE Spectrum)·Ternlight 7MB 브라우저 임베딩(HN 278점)·NVIDIA "오픈 모델이 AI 연구 이끈다"(ICML)·Nemotron-Labs-3 압축(ArXiv) 등 오픈·소형·압축이 비용·크기·접근성 3축으로 동시 압박. Alibaba Claude Code 사용 금지·Vercel CEO "모델과 에이전트 분리" 주장도 같은 맥락.
4. **에이전트의 한계·비용·거버넌스 + AI 안전·통제가 전장·정책·금융·범죄로**: 7/6 Zuckerberg "AI 에이전트 개발 예상보다 느리다"(Reuters·HN 291점)·KAIST "에이전트는 챗봇보다 136배 에너지 사용"·"모델 다변화는 성공, 거버넌스는 낙제점"에, 7/7 유엔 구테흐스 '킬러 로봇(자율살상무기)' 국제법 전면 금지 촉구(AI타임즈·AI포스트)·일리노이 AI 안전법 SB 315 서명(독립 제3자 감사 의무)·영란은행 AI 금융안정성 리스크 경고·ECB 은행들 AI 공격 대비 지시·최초 자율형 AI 랜섬웨어(TechCrunch·AI타임즈, 단 인간 개입 여전)·Savi AI 음성 납치 사기 방어 앱(TechCrunch) 등 안전·통제 주제가 전장·정책·금융·범죄·방어 전방위로 확산.
5. **AI가 인력·교육·자본 시장 재편 + 빅테크 'AI 실업 대란' 경고 급감**: 7/6 Microsoft 4,800명 감원(Xbox·영업, The Verge 속보)·"미국 부유층 AI 튜터 선택"·"AI가 인간 트레이더 압도…중국 양적 펀드에 수십억달러"·"AI 테크 자본이 뒤흔든 샌프란시스코 부동산"에, 7/7 "빅테크 'AI 실업 대란' 경고 급감…비관론서 생산성 낙관론으로 선회"(AI타임즈)·애플 iOS 27 Siri 목소리 제어·xAI→SpaceXAI·GPT-5.6 Sol Ultra in Codex(HN 348점) 등 고용·교육·금융·부동산·제품 전반에 파급. 실업 비관론에서 생산성 낙관론으로 빅테크 톤이 바뀌는 분기점.
6. **웨어러블·로봇·비디오 생성·모델 경쟁 다원화**: 메타 레이밴 메타 한국어 번역 지원(7/6)·Even Realities 1B달러 가치 인정(TechCrunch 7/6)·Solos AirGo A6 카메라 없는 안경(The Verge 7/7)·中 휴머노이드 64시간 6만 건 작업(AI포스트)·바이트댄스 시댄스 2.5(최대 3분 영상)·LeRobot v0.6.0(Hugging Face 7/7)·NVIDIA-HF LeRobot 협력(NVIDIA 7/6)·Fable 5 reMarkable 톰 리들의 일기(HN 552점)·AI 배우 틸리 노우드 첫 장편 영화(The Verge·AI포스트) 등 폼팩터·멀티모달 생성 경쟁 다원화. GPT-5.6 Sol Ultra·Tencent Hy3·GLM 5.2 마진 붕괴 등 모델 경쟁의 새 국면도 같이 진행.

---

## 수집 제한 안내

- **날짜 범위와 통합**: 본 파일은 7/6(월)~7/7(화) AI 기사 + 7/4~7/5 주말 맥락 보충. 기존 `ai-news-2026-07-06-onwards.md`(7/6 중심+7/5 보충)와 `ai-news-2026-07-07-onwards.md`(7/7 중심)를 하나로 통합. 7/5 상세는 `ai-news-2026-07-05-onwards.md`, 7/2~7/4는 `ai-news-2026-07-02-onwards.md` 참고.
- **날짜 범위와 주말 영향**: 7/6(월)을 기준일로 시작해 7/7(화)까지 확장. 핵심 모델/제품 발표 소스(OpenAI·Anthropic·DeepMind·NVIDIA·Hugging Face·The Batch)에서 7/6 자체 신규 글은 없었고, NVIDIA만 7/6 블로그 3종·Anthropic 7/6 Features/Case Study/Research·Hugging Face 7/6 🤗 Kernels·7/7 LeRobot v0.6.0 공개. 나머지는 직전 평일(6/30~7/3) 최신글을 맥락으로 표기.
- **07-05 파일과의 중복**: 7/5 기사(Amazon Mechanical Turk, 아레나 연매출, 머스크 테라팹, 교류→직류, Dartmouth AI 튜터 등)는 `ai-news-2026-07-05-onwards.md`에 상세 정리됨. 본 파일에서는 7/6~7/7 재게재·보충 항목만 표기.
- **07-02 파일과의 중복**: 7/2~7/4 기사(Fable 5 재배포, Claude Sonnet 5, Nano Banana 2 Lite, Alibaba SkillWeaver, ZCode 등)는 `ai-news-2026-07-02-onwards.md` 참고. VentureBeat 7/2~7/4 항목은 07-02 파일과 겹치는 경우 참조 처리.
- **ArXiv**: 7/3(Fri) 기준 1,216건 제출 중 주요 12건(7/6 섹션) + 7/7(Tue) 신규 451건 제출 중 주요 15건(7/7 섹션) 선별. 전체 요약 시도 안 함. 주말(7/4~7/5)은 신규 제출 없음.
- **DeepMind "Month Year" 항목**: 정확 일자 불확정. June 2026 카테고리 다수 존재하나 일자 검증 불가로 7/6~7/7 섹션에는 포함하지 않음.
- **AI타임즈**: 7/6 19:03 + 7/7 19:11 기준. 7/5 게재 항목은 별도 표기.
- **AI포스트**: 7/6 21:59 + 7/7 19:17 기준.
- **Hacker News**: 7/5~7/7 추천수 기준 AI 키워드 글 선별. 정확 게재 시각은 "N hours ago" 추정.
- **SemiAnalysis·MIT Technology Review·Import AI·Stratechery·The Information·AI Snake Oil·Interconnects·Simon Willison**: 이번 회차 수집 미진행.
- **Ahead of AI**: 최신 글 6/27 "Using Local Coding Agents" — 07-02 파일에서 이미 다룸. 7/5~7/7 신규 없음.
- **OpenAI 레서핑(openai.com/research)**: 7/5~7/7 신규 없음. 최신 GeneBench-Pro(6/30)는 7/6 섹션 참고.
- **NVIDIA/Google 블로그**: 7/5~7/7 신규는 NVIDIA 7/6 블로그 3종만. Google 블로그·DeepMind는 7/5~7/7 신규 없음.
- **내용 요약**: 이번 회차는 핵심 기사 직접 방문·요약을 수행하지 않음(사용자가 '내용 요약' 명시 요구 시 추가 가능).

---
