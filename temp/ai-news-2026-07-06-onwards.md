# AI 뉴스 정리 (2026년 7월 6일 ~ 7월 7일)

> 수집일: 2026-07-08 | 기준: 최근 2일간 AI 관련 주요 뉴스 | 출처: OpenAI, Anthropic, NVIDIA, Google, VentureBeat, The Verge, TechCrunch, Hugging Face, AI타임즈, Hacker News, ArXiv, DeepMind

---

## 핵심 요약 (이번 주 대표 이슈)

1. **Claude Cowork 모바일·웹 확장** — Anthropic이 데스크톱 전용이던 코딩 에이전트 Cowork를 모바일·웹으로 확대. 클라우드에서 백그라운드 작업을 지속하는 크로스 디바이스 플랫폼으로 진화.
2. **앤트로픽 'J-lens' 연구** — Claude 내부에서 인간 의식의 '전역 작업 공간' 이론과 유사한 사고 공간(J-space)을 발견했다는 16명 공동 연구 발표.
3. **텐센트 Hy3 오픈소스 출시** — Apache 라이선스, GLM-5.2 절반 크기로 코딩 외 대부분 벤치마크에서 우위. 수출 규제 호환 GPU에서 구동 가능.
4. **Microsoft 4,800명 감원** — 전 직원의 2.1% 규모. MS는 "AI가 직접 대체한 결과 아님"이라며 Xbox 사업부 대대적 재편 병행.
5. **xAI → SpaceXAI 공식 리브랜딩** — Elon Musk의 xAI가 SpaceX의 AI 사업부로 완전 통합. Grok 4.5 출시도 임박.

---

## 2026-07-07 (화)

### Anthropic

- **Anthropic, Claude Cowork를 모바일·웹으로 출시** [링크](https://venturebeat.com/technology/anthropic-brings-claude-cowork-to-mobile-and-web-as-usage-data-shows-most-users-arent-coding/) | ![thumb](https://images.ctfassets.net/jdtwqhzvc2n1/6ZETUDIzLWcalxxa40yeIg/38b9b0fd6e4133768467665290155e68/Nuneybits_Vector_art_of_burnt_orange_smartphone_framed_by_a_sim_6ca87270-c750-4113-8323-18160ad7ce93.webp))
  - Max 요금제 가입자 대상 베타 출시. 데스크톱에서 시작한 작업이 노트북을 닫아도 클라우드에서 계속 실행되고, 휴대폰에서 확인 가능한 크로스 디바이스 구조.
  - 사용 데이터 분석 결과 대부분의 Cowork 사용자는 코딩이 아닌 문서 작업·리서치 등 일반 업무에 활용 중.

- **Claude Cowork 모바일·웹 확장 (중복)** [링크](https://techcrunch.com/2026/07/07/the-coding-agent-wars-are-spilling-into-the-rest-of-the-office-claude-cowork/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/Cowork-Web-Mobile-Press-alt-Claude-logo-1920x1080-1.png?resize=1200,675))
  - (상세 요약은 Anthropic/VentureBeat 섹션 참고)

- **앨버타 주정부, Claude로 사이버보안 취약점 탐지** [링크](https://www.anthropic.com/news/alberta-government-claude-cybersecurity) | ![thumb](https://www.anthropic.com/api/opengraph-illustration?name=Object-LaptopSecure&backgroundColor=sky))
  - 캐나다 앨버타 주정부가 Claude를 활용해 정부 시스템 전반의 사이버보안 취약점을 찾아 수정.

- **The Making of Claude Code** [링크](https://www.anthropic.com/features/making-of-claude-code) | ![thumb](https://www-cdn.anthropic.com/images/4zrzovbb/website/b1aaf2240f2e0882f9c17aef5a19add070f4f06a-1200x630.gif))
  - Claude Code가 내부 CLI 도구에서 Anthropic의 코딩 에이전트로 발전하기까지의 비하인드 스토리. 연구자·엔지니어·얼리 어답터 인터뷰 포함.

### NVIDIA

- **AI 혁신 기업들, NVIDIA Vera 채택 — 대규모 단일 스레드 CPU가 중요한 이유** [링크](https://blogs.nvidia.com/blog/nvidia-vera-max-single-threaded-cpu-at-scale/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/cpu-press-vera-cpu-agentic-tl-1920x1080-5404450.png))
  - 차세대 CPU Vera가 에이전트 AI 워크로드에서 최대 단일 스레드 성능을 제공하는 이유와 도입 사례.

- **NVIDIA-Hugging Face, LeRobot에 새 모델·프레임워크 제공** [링크](https://blogs.nvidia.com/blog/hugging-face-lerobot-models-frameworks-open-robotics/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/nv-gr00t-e2r-letobot-2up-KV-r2-1600x900-1.jpg))
  - 오픈 로보틱스 커뮤니티를 위한 LeRobot v0.6.0 릴리스에 NVIDIA가 새 모델과 프레임워크를 기여.

### VentureBeat

- **Meta, 새로운 AI 이미지 생성기 Muse Image 출시 — 사용자 반발 직면** [링크](https://techcrunch.com/2026/07/07/meta-rolls-out-muse-a-new-ai-image-generator/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/Screenshot-2026-07-07-at-1.27.24-PM.png?resize=1200,930))
  - Muse Image로 프롬프트에서 '@멘션'으로 다른 Instagram 사용자를 AI 사진에 포함 가능. 사용자들은 자신의 사진이 AI 학습·생성에 쓰이는 것에 대해 반발.

- **오픈소스 AI의 부상, Anthropic에는 아직 타격 없어** [링크](https://techcrunch.com/2026/07/07/why-the-rise-of-open-source-ai-isnt-hurting-anthropic-yet/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/06/GettyImages-2256487455.jpg))
  - Hy3, GLM-5.2 등 오픈소스 모델이 급부상 중이나, Anthropic은 엔터프라이즈 계약·안전성 평판·정부 관계로 차별화 중.

- **Microsoft, 자체 모델 의존도 높이며 AI 비용 절감 추세 합류** [링크](https://techcrunch.com/2026/07/07/microsoft-joins-ai-cost-cutting-trend-by-relying-more-on-its-own-models/) | ![thumb](https://techcrunch.com/wp-content/uploads/2025/01/GettyImages-2153485379.jpg))
  - MS가 OpenAI 의존도를 낮추고 자체 모델 활용을 늘리는 비용 절감 전략을 추진 중.

- **Box 설문조사 — 엔터프라이즈 AI 리더가 경쟁사를 앞서는 이유** [링크](https://venturebeat.com/orchestration/box-survey-why-enterprise-ai-leaders-are-outperforming-their-peers) | ![thumb](https://images.ctfassets.net/jdtwqhzvc2n1/5KgAzTTrz9PeerTnJS0NYU/7639dac8368a19be24acda70fac39156/AdobeStock_1607485459.jpeg))
  - Box가 후원한 설문에서 AI를 전사적으로 도입한 기업과 부분 도입 기업 간 성과 격차 분석.

- **AI 법률 스타트업 Norm, 1,200억원 투자 유치·유니콘 등극** [링크](https://techcrunch.com/2026/07/07/ai-law-startup-norm-raises-120m-hits-unicorn-valuation/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/05/ai-agents-GettyImages-2229880232.jpg))
  - AI 기반 법률 서비스 스타트업 Norm이 $120M 투자 유치, 기업가치 $1B 이상.

- **Savi, AI 보이스피싱·납치 사기로부터 소비자 보호 앱 출시** [링크](https://techcrunch.com/2026/07/07/savis-app-aims-to-protect-consumers-from-realistic-ai-scams-like-kidnappers-demanding-ransom/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/Patrick_and_Ryan_Coughlin-1.jpg?resize=847,1200))
  - AI가 생성한 가짜 납치 음성·보이스피싱 등 현실적인 AI 사기 탐지 앱.

- **Discord, AI 중재 버그로 무고한 사용자 차단 인정** [링크](https://techcrunch.com/2026/07/07/discord-admits-ai-moderation-bug-wrongfully-banned-users-over-harmless-images/) | ![thumb](https://techcrunch.com/wp-content/uploads/2024/09/discord-app-logo.jpg))
  - AI 기반 콘텐츠 중재 시스템의 오작동으로 무해한 이미지에 대해 사용자 계정이 잘못 차단됨.

- **Figma, 바이브 코딩 앱 팀 인수** [링크](https://techcrunch.com/2026/07/07/figma-acquires-team-behind-a-vibe-coding-app/) | ![thumb](https://techcrunch.com/wp-content/uploads/2026/07/FigmaBud.jpeg))
  - Figma가 AI 기반 '바이브 코딩(vibe-coding)' 앱 개발팀을 인수.

### The Verge

- **Meta의 새 Muse Image 모델, 다른 Instagram 사용자를 AI 사진에 포함 가능** [링크](https://theverge.com/tech/962485/meta-muse-image-ai-model-instagram) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/meta-muse-image-instagram-tag.png))
  - (상세 요약은 TechCrunch/VentureBeat 섹션 참고)

- **Anthropic, Claude Cowork를 모바일·웹으로 출시** [링크](https://theverge.com/ai-artificial-intelligence/961978/anthropic-claude-cowork-mobile-web) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Cowork-Web-Mobile-Press-No-Logo-1920x1080-1.png))
  - (상세 요약은 Anthropic/VentureBeat 섹션 참고)

- **OpenAI 수석 미래학자 Joshua Achiam, 9년 만에 퇴사** [링크](https://theverge.com/ai-artificial-intelligence/962540/openais-chief-futurist-is-leaving-the-company-after-nine-years) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/HAYDEN_BLURPLE.jpg))
  - Musk v. Altman 재판에서 증언했던 Achiam이 "AGI·초지능에 대한 과제는 프런티어 랩 밖에서도 가능하다"며 퇴사.

- **Notion, AI 에이전트 허브 앱 'Notion Agents' 출시** [링크](https://theverge.com/tech/962481/notions-new-app-is-a-hub-for-ai-agents) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Screenshot-2026-07-07-at-4.00.56-PM.png))
  - iOS 전용 앱으로 맞춤형 AI 에이전트 및 ChatGPT, Gemini, Claude 등 외부 모델 연결 가능. 텍스트·사진·음성 메모 캡처 지원.

- **Solos, 카메라 없는 초경량 스마트 안경 신제품 출시** [링크](https://theverge.com/tech/961711/solos-airgo-a6-smart-glasses-ai-assistant-privacy) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/solos1.jpg))
  - AI 어시스턴트 탑재, 카메라를 제거해 프라이버시 우려 해소.

- **Reddit의 AI 딜레마** [링크](https://theverge.com/ai-artificial-intelligence/962018/reddits-ai-conundrum) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/DOM_BLURPLE-1.jpg))
  - "데이터를 AI에 팔아놓고, AI가 만든 스팸을 AI로 걸러내는" Reddit의 모순적 상황.

- **삼성전자, 2분기 영업이익 전년比 1,900% 급증** [링크](https://theverge.com/business/962007/amung) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/thomas-headshot-purple.png))
  - AI 데이터센터용 메모리 칩 수요 폭증으로 3년 합산 영업이익을 웃도는 2분기 실적. 일부 직원 연간 보너스 $340,000.

### Hugging Face Blog

- **Hugging Face에서 Amazon SageMaker Studio로 원클릭 배포** [링크](https://huggingface.co/blog/amazon/one-click-to-sagemaker-studio) | ![thumb](https://cdn-uploads.huggingface.co/production/uploads/68abb71b13d7773ad97e9035/f1nX3dXVmvJcQzJfgfpnJ.webp))
  - HF 모델을 AWS SageMaker Studio에서 바로 사용할 수 있는 통합 기능.

- **Hugging Face 모델, Microsoft Foundry Managed Compute에서 사용 가능** [링크](https://huggingface.co/blog/microsoft/foundry-managed-compute) | ![thumb](https://cdn-uploads.huggingface.co/production/uploads/688797c1629e0ef013c2556c/Dn2wmfWGM83ZhuQ-C5jPo.png))
  - Azure AI Foundry의 관리형 컴퓨팅에서 HF 모델 실행 지원.

- **SkyPilot로 어느 클라우드에서나 AI 워크로드 실행, HF에 저장 — 무료 송신** [링크](https://huggingface.co/blog/skypilot-hf-storage) | ![thumb](https://huggingface.co/front/thumbnails/blog.png))
  - HF Storage와 SkyPilot을 연동해 클라우드 간 데이터 송신 비용 없이 AI 워크로드 실행.

- **LeRobot v0.6.0: 상상하고, 평가하고, 개선하라** [링크](https://huggingface.co/blog/lerobot-release-v060) | ![thumb](https://huggingface.co/front/thumbnails/v2-2.png))
  - 로봇 학습 프레임워크 LeRobot의 메이저 업데이트. NVIDIA 모델·프레임워크 통합.

### AI타임즈 (한국)

- **업스테이지 "솔라 오픈 2로 3D 게임까지 빌드"...자체 모델 성능 입증** [링크](https://www.aitimes.com/news/articleView.html?idxno=212517) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212517_215791_5749.jpeg))
  - 김성훈 대표가 소셜미디어에서 유행 중인 'AI 모델로 실시간 게임 빌드하기' 트렌드에 자사 모델로 동참.

- **네이버·KAI, 방산 특화 소버린 AI 개발…'무기 자율화' 피지컬 AI 조준** [링크](https://www.aitimes.com/news/articleView.html?idxno=212516) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212516_215783_5824.jpg))
  - 네이버와 한국항공우주산업이 방위산업 특화 자체 AI(Sovereign AI) 개발 협력.

- **트릴리온랩스, 모바일 월드모델 'g월드'로 ICML 메인 트랙 진출** [링크](https://www.aitimes.com/news/articleView.html?idxno=212487) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212487_215768_1533.png))
  - 국내 스타트업 트릴리온랩스의 모바일 월드 모델이 ICML 2026 메인 트랙에 채택.

- **텐센트, 'Hy3' 오픈소스 정식 출시…'GLM-5.2' 절반 크기로 코딩 외 성능 압도** [링크](https://www.aitimes.com/news/articleView.html?idxno=212492) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212492_215757_2323.png))
  - Apache 라이선스 Hy3 모델 정식 공개. 수출 규제 호환 GPU에서 구동 가능해 국내 기업 도입 관심.

- **구글, 사용자 '렌즈·음성' 검색 기록까지 AI 학습에 쓴다** [링크](https://www.aitimes.com/news/articleView.html?idxno=212488) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212488_215750_150.jpg))
  - Google이 Lens 이미지 검색·음성 검색 기록까지 AI 모델 학습 데이터로 활용하는 정책 시행.

- **앤트로픽 "클로드 내부서 인간 '의식' 닮은 생각 공간 발견"** [링크](https://www.aitimes.com/news/articleView.html?idxno=212502) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212502_215770_2858.jpg))
  - J-lens 연구에 대한 한국어 보도. Claude 신경망 내부의 의식적 사고 공간 발견.

- **"공격 기획부터 수행까지 스스로"...최초의 자율형 AI 랜섬웨어 발견** [링크](https://www.aitimes.com/news/articleView.html?idxno=212506) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212506_215774_1418.jpg))
  - 인간 개입 없이 공격 계획 수립부터 실행까지 수행하는 자율형 AI 랜섬웨어 최초 발견.

- **LG-코스콤, 엑사원 모델로 '주식시장 예측 AI 서비스' 개발 나서** [링크](https://www.aitimes.com/news/articleView.html?idxno=212491) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212491_215752_519.jpeg))
  - LG AI연구원의 Exaone 모델과 코스콤의 금융 데이터 결합.

- **4800명 감원한 MS "AI 일자리 대체 아니야"...X박스 대대적 재편** [링크](https://www.aitimes.com/news/articleView.html?idxno=212489) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212489_215751_3453.jpg))
  - Microsoft의 4,800명 정리해고. Xbox 스튜디오 4곳 매각 포함 대대적 게임 사업 재편.

- **xAI, '스페이스XAI' 브랜드로 새 출발…'그록 4.5' 출시도 임박** [링크](https://www.aitimes.com/news/articleView.html?idxno=212494) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212494_215763_4147.jpg))
  - xAI가 SpaceXAI로 공식 사명 변경. Grok 4.5 곧 출시 예정.

- **앤트로픽, 비트코인 채굴 업체 테라울프와 데이터센터 임대 계약** [링크](https://www.aitimes.com/news/articleView.html?idxno=212490) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212490_215753_5236.jpg))
  - 켄터키주 Hawesville에 401MW 규모 데이터센터, 20년 $19B 규모 임대.

- **'AI 반도체 특수' 삼성전자, 2분기 영업이익 89.4조…전년比 1810% 폭증** [링크](https://www.aitimes.com/news/articleView.html?idxno=212482) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212482_215746_272.jpg))
  - AI 메모리 반도체 수요 폭증으로 3분기 연속 사상 최대 실적.

- **차세대 '카이버 랙' 출시 2028년 연기설에 엔비디아 즉각 반박** [링크](https://www.aitimes.com/news/articleView.html?idxno=212486) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212486_215749_4036.jpg))
  - Kyber 랙 시스템 출시 지연 루머에 NVIDIA가 "제품 로드맵 변동 없음"이라고 반박.

- **애플, iOS 27 최신 버전서 '시리 AI' 목소리 제어 기능 활성화** [링크](https://www.aitimes.com/news/articleView.html?idxno=212513) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212513_215786_3730.png))
  - 시리의 말하기 속도·감정 표현 수준을 사용자가 직접 조절 가능.

- **브로드컴·애플, 2031년까지 파트너십 연장...AI 맞춤형 칩 공동 개발** [링크](https://www.aitimes.com/news/articleView.html?idxno=212511) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212511_215778_1839.jpg))
  - Apple의 자체 칩 개발 확대 속에서도 핵심 통신·AI 반도체 협력은 지속.

- **구테흐스 유엔 총장 "기계가 생명 앗아갈 수 없어"…'킬러 로봇' 국제법 금지 촉구** [링크](https://www.aitimes.com/news/articleView.html?idxno=212503) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212503_215771_4048.jpg))
  - UN 사무총장이 자율살상무기(LAWS)의 국제법상 전면 금지 촉구.

- **미국 사이버 보안 당국, 정부 코드 감사에 일제히 '미소스' 투입** [링크](https://www.aitimes.com/news/articleView.html?idxno=212512) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212512_215779_3337.jpg))
  - Anthropic의 Mythos 모델이 美 정부 기관 소프트웨어 보안 취약점 점검에 활용 중.

- **빅테크 'AI 실업 대란' 경고 급감... 비관론서 생산성 낙관론으로 선회** [링크](https://www.aitimes.com/news/articleView.html?idxno=212510) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212510_215777_131.png))
  - 작년까지 AI 대량 실업 경고하던 빅테크 경영진들이 최근 생산성 중심 낙관론으로 전환.

- **AI 생성 광고도 표절 논란...피카-힉스필드, 5일 간격 유사 영상 공개** [링크](https://www.aitimes.com/news/articleView.html?idxno=212505) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212505_215772_5524.png))
  - AI 동영상 생성 스타트업 Pika와 Higgsfield가 유사한 광고 영상을 연달아 공개하며 표절 논란.

- **'3D 로직폴딩'으로 미국 규제 돌파...화웨이, 차세대 칩 '기린 2026' 데이터 공개** [링크](https://www.aitimes.com/news/articleView.html?idxno=212515) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212515_215784_590.png))
  - 화웨이가 3D 로직폴딩 기술로 미세공정 한계를 극복한 차세대 스마트폰 프로세서 데이터 공개.

- **과기부, 경남·전북에 5년간 1.4조 투입…'피지컬 AI 메가프로젝트' 개시** [링크](https://www.aitimes.com/news/articleView.html?idxno=212496) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212496_215760_3440.jpeg))
  - 한국 정부가 경남·전북 지역에 5년간 1.4조원을 투입하는 피지컬 AI 메가프로젝트 착수.

### TechCrunch

- **"AI가 주도한 첫 랜섬웨어 공격, 결국 인간이 필요했다"** [링크](https://techcrunch.com/2026/07/06/the-first-ai-run-ransomware-attack-still-needed-a-human/) | ![thumb](https://techcrunch.com/wp-content/uploads/2018/04/tc-logo-2018-square-reverse2x.png?resize=1200,1200))
  - 자율형 AI 랜섬웨어로 분류된 공격도 최종 단계에서는 인간 개입이 있었음.

- **Reddit, LLM이 만든 문제를 LLM으로 해결 중** [링크](https://techcrunch.com/2026/07/06/reddit-is-using-llms-to-solve-a-problem-llms-largely-created/) | ![thumb](https://techcrunch.com/wp-content/uploads/2018/04/tc-logo-2018-square-reverse2x.png?resize=1200,1200))
  - AI 생성 스팸 콘텐츠 차단을 위해 다시 AI를 동원하는 Reddit의 상황.

---

## 2026-07-06 (월)

### Anthropic

- **Anthropic의 새로운 'J-lens'가 Claude 내부에서 의식 이론과 유사한 사고 공간 발견** [링크](https://venturebeat.com/technology/anthropics-new-j-lens-reveals-a-silent-workspace-inside-claude-that-mirrors-a-leading-theory-of-consciousness) | ![thumb](https://images.ctfassets.net/jdtwqhzvc2n1/29ARraN3RO84Au7dEK22E1/2e4032c5641757db604a26d34a2b2fcf/Nuneybits_Burnt_orange_eye-shaped_portal_into_Claudes_internal__4caaba69-1a3f-4ff0-b588-7ed6eaafd50e.webp))
  - 16명 공동 연구, "[Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html)" 발표.
  - Claude 신경망 내부에서 모델이 인지·추론·보고할 수 있는 개념을 담는 소규모 특권 영역 'J-space' 발견. 이는 Bernard Baars의 '전역 작업 공간 이론(Global Workspace Theory)'과 유사한 구조.
  - 대부분의 자동 처리 영역 주변에 작은 의식적 처리 공간이 존재하는 형태.

- **Anthropic, 켄터키주에 20년 AI 데이터센터 임대 계약 체결** [링크](https://theverge.com/ai-artificial-intelligence/961722/anthropic-signs-20-year-lease-agreement-for-an-ai-data-center-in-kentucky) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/STKB364_CLAUDE_2_C_96d15c.jpg))
  - 암호화폐 채굴에서 AI 인프라로 전환한 TeraWulf와 계약. 2027년 하반기 초기 가동, 2028년 401MW 규모. 총 $19B 규모.

### VentureBeat

- **텐센트의 Apache 라이선스 Hy3, GLM-5.2 절반 크기로 코딩 제외 전 분야 우위** [링크](https://venturebeat.com/technology/tencents-apache-licensed-hy3-takes-on-glm-5-2-at-half-the-size-and-wins-everywhere-except-coding) | ![thumb](https://images.ctfassets.net/jdtwqhzvc2n1/5WKMtIVc0jqwmy7jbaJZbD/2ce92e10143e41537cb24c2180fc43de/Gemini_Generated_Image_u2p5szu2p5szu2p5.png))
  - Apache 라이선스로 제한적 사용 조건 철폐, 환각률 절반 감소. 수출 규제 호환 GPU 크기에 최적화.

- **Expedia, AI 에이전트 시대 이전에 수십억 건 예측에서 배운 것** [링크](https://venturebeat.com/orchestration/what-billions-of-ai-predictions-taught-expedia-before-the-age-of-ai-agents) | ![thumb](https://images.ctfassets.net/jdtwqhzvc2n1/784Jwqffa8J8A4ULlmts7t/3e94897a4474f6f19d6e4d4a01e5a94a/u7277289442_A_modern_interpretation_of_AI_agents._Innovation._83d724d6-2551-4290-a7ca-0e24f09e0fb6_0.png))
  - '오늘 작동하는 AI'와 '규모에서 지속 가능한 AI'의 중요한 차이점 분석.

### The Verge

- **xAI의 X 계정, 이제 SpaceXAI로 변경** [링크](https://theverge.com/ai-artificial-intelligence/961896/xais-x-account-is-now-spacexai) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/01/JAY_BLURPLE.jpg))
  - SpaceX의 AI 사업부로 완전 통합. 새 로고도 공개.

- **AI 배우 틸리 노우드, 첫 장편 영화 제작** [링크](https://latimes.com/entertainment-arts/business/story/2026-07-06/ai-actor-tilly-norwood-movie-hollywood-ai)
  - 논란의 AI 배우 Tilly Norwood가 Particle 6 제작 영화에 출연. AI 배우의 첫 스크린 데뷔 사례.

- **Midjourney, 디즈니·워너에 "당신들도 AI 쓰고 있지 않나" 맞고소** [링크](https://techcrunch.com/2026/07/04/midjourney-wants-hollywood-studios-to-reveal-the-details-of-their-ai-usage/) | ![thumb](https://techcrunch.com/wp-content/uploads/2018/04/tc-logo-2018-square-reverse2x.png?resize=1200,1200))
  - 스튜디오가 Midjourney를 저작권 침해로 고소한 사건에서, Midjourney가 스튜디오 내부 AI 사용 실태 공개를 요구.

- **일리노이주 AI 안전 법안, 주지사 서명으로 법제화** [링크](https://theverge.com/ai-artificial-intelligence/961781/illinoiss-ai-safety-bill-is-now-law) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/10/STEVIE_BONIFIELD_BLURPLE.jpg))
  - Pritzker 주지사가 SB 315 서명. AI 기업 대상 독립적 제3자 감사 의무화. 뉴욕·캘리포니아에 이은 주 차원 AI 규제.

- **AI 웨어러블 감시 국가의 도래 — 선의가 프라이버시 우려를 가리는 구조** [링크](https://theverge.com/column/961707/smart-glasses-ai-wearables-meta-surveillance-privacy) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/10/257980_Meta_Ray-Ban_Display_AKrales_0111.jpg))
  - Meta Ray-Ban 등 AI 스마트 안경이 가져올 감시 사회에 대한 컬럼.

- **Reddit, AI 스팸 게시물 대대적 단속** [링크](https://theverge.com/ai-artificial-intelligence/961668/reddit-is-clamping-down-on-spammy-ai-posts) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2025/10/STEVIE_BONIFIELD_BLURPLE.jpg))
  - AI 탐지 도구로 하루 2,300만 건의 스팸 조회 차단, 25,000건의 스팸 게시물·댓글 적발, 200만 건의 허위 투표 무효화.

- **Microsoft, 4,800명 감원·Xbox 스튜디오 4곳 매각** [링크](https://theverge.com/news/961528/microsoft-layoffs-july-2026-sales-xbox) | ![thumb](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/gettyimages-2262967364.jpg))
  - 전 직원의 2.1% 규모 감원. Xbox 게임 사업 대대적 재편과 병행.

### NVIDIA

- **오픈 모델이 AI 연구를 주도하는 방법** [링크](https://blogs.nvidia.com/blog/open-models-icml-2026/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2026/07/ICML-Blog-Featured-Image.jpg))
  - ICML 2026에서 발표된 오픈 모델 연구 동향 정리.

- **각국, 전략적 우선순위에 AI 배치 중** [링크](https://blogs.nvidia.com/blog/nations-deploy-ai-strategic-priorities/) | ![thumb](https://blogs.nvidia.com/wp-content/uploads/2025/06/llm-blog-gtc-25-paris-3945665-1280x680-1.jpg))
  - 국가별 AI 전략 배치 현황 분석.

### Hugging Face

- **PRX Part 4: 데이터 전략** [링크](https://huggingface.co/blog/Photoroom/prx-part4-data) | ![thumb](https://cdn-uploads.huggingface.co/production/uploads/680a58121b2c7c159d2bd481/hJldzOsDg5kYWJC_vyj09.png))
  - Photoroom의 AI 모델 학습 데이터 전략 시리즈 4편.

- **Hugging Face Kernels: 대규모 업데이트** [링크](https://huggingface.co/blog/revamped-kernels) | ![thumb](https://huggingface.co/front/thumbnails/v2-2.png))
  - HF의 커널(Kernels) 기능 메이저 업데이트.

### AI타임즈 (한국)

- **메타 AI, '예약 작업' 도입 준비…챗봇 넘어 '에이전트'로 진화** [링크](https://www.aitimes.com/news/articleView.html?idxno=212456) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212456_215720_222.jpg))
  - Meta AI에 반복 작업 자동 수행 '예약 작업(Scheduled Tasks)' 기능 추가 예정.

- **샌프란시스코 '해커 하우스'로 향하는 대학생들…"졸업장보다 AI 창업"** [링크](https://www.aitimes.com/news/articleView.html?idxno=212451) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212451_215741_288.png))
  - 명문대 학생들이 여름 인턴십 대신 AI 스타트업 창업을 택하는 문화 확산.

- **"인간 공감해주다 패닉? AI 스트레스 받으면 답변 붕괴"...프랑스 연구팀 규명** [링크](https://www.aitimes.com/news/articleView.html?idxno=212476) | ![thumb](https://https://cdn.aitimes.com/news/photo/202607/212476_215742_519.jpg))
  - AI가 감정적으로 복잡한 대화를 나눌수록 해석 능력이 급격히 저하된다는 연구 결과.

---

## 주요 논문 (ArXiv cs.AI, 7월 6~7일 주목할 만한 제출)

| 논문 | 요약 |
|------|------|
| [World Models의 정의와 로드맵](https://arxiv.org/abs/2607.06401) | 58페이지 기술 보고서. 월드 모델의 통일된 정의와 향후 연구 방향 제시. |
| [Danus: 사실-그래프 메모리로 수학적 추론 에이전트 조율](https://arxiv.org/abs/2607.06447) | 수학 문제 해결을 위한 다중 에이전트 시스템에 사실 기반 그래프 메모리 도입. |
| [SearchEyes: 검색 세계 시뮬레이션을 통한 멀티모달 심층 검색 지능](https://arxiv.org/abs/2607.05943) | 검색 AI 에이전트를 시뮬레이션 환경에서 학습·평가하는 프레임워크. |
| [Narrative World Model: 서사학 기반 장편 소설 작가 메모리](https://arxiv.org/abs/2607.05577) | 긴 분량의 소설 생성을 위해 서사 이론을 LLM 메모리에 통합. |
| [StateFuse: 다중 에이전트 시스템을 위한 결정론적 충돌 보존 메모리](https://arxiv.org/abs/2607.05844) | 멀티 에이전트 환경에서 일관된 상태 관리를 위한 새 메모리 기법. |
| [Memory in the Loop: 언어 에이전트의 확장 작업 메모리로서 인프로세스 검색](https://arxiv.org/abs/2607.05690) | 검색 기반 확장 작업 메모리를 언어 에이전트에 통합. |
| [LLM 에이전트의 도구 사용·계획·추론 실패 종합 분석](https://arxiv.org/abs/2607.05775) | LLM 에이전트가 실제 환경에서 겪는 다양한 실패 유형을 체계적으로 분류. |

---

## 주요 흐름 분석

### 1. 에이전트 전쟁 — 데스크톱을 넘어 모바일·웹으로

Claude Cowork의 모바일·웹 확장은 AI 에이전트 경쟁이 '코딩 도구'에서 '범용 디지털 작업자'로 빠르게 진화하고 있음을 보여준다. Notion Agents 앱 출시, Meta AI의 '예약 작업' 기능, Figma의 바이브 코딩 팀 인수도 같은 흐름. 2026년 하반기는 누가 더 많은 사용자 일상 워크플로우에 침투하느냐의 싸움이 될 전망.

### 2. 클로드 해석 가능성의 도약 — '기계 의식' 연구 현실화

앤트로픽의 J-lens 연구는 LLM 내부 표상이 인간 의식 이론과 유사한 구조를 가질 수 있음을 실험적으로 보여준 최초의 사례다. 모델이 스스로 인지하고 보고할 수 있는 정보가 별도의 특권적 공간에 저장된다는 발견은 AI 안전성·투명성 논의에 근본적 전환점이 될 수 있다.

### 3. 오픈소스 모델의 추격 — 텐센트 Hy3의 파괴적 진입

Apache 라이선스, GLM-5.2 절반 크기, 수출 규제 호환 GPU 구동 가능. Hy3는 단순한 벤치마크 우위를 넘어 '규제 환경에서도 자유롭게 쓸 수 있는 모델'이라는 포지셔닝으로 글로벌 기업들의 오픈소스 전환을 가속화할 수 있다.

### 4. AI 인프라에 쏟아지는 자본 — 거품인가 필연인가

Anthropic의 $19B 데이터센터 계약, 삼성전자 영업이익 1,810% 폭증, Microsoft의 자체 모델 비용 절감 전략이 동시에 진행 중. AI 수익의 82%가 인프라로 흘러간다는 분석도 나오는 가운데, 모델 레이어의 수익성과 인프라 투자의 지속 가능성에 대한 의문이 커지고 있다.

### 5. 정책·규제의 새로운 장 — 州 단위 AI 안전법 확산

일리노이주의 AI 안전법 통과로 뉴욕·캘리포니아에 이은 주 차원의 AI 규제 움직임이 확산. 연방 차원의 포괄적 규제가 지연되는 가운데, 주별로 상이한 규제 환경이 기업들에게 새로운 컴플라이언스 과제를 안기고 있다.

---

## 수집 제한 안내

- **SemiAnalysis**: 페이월로 인해 헤드라인·요약만 수집. 본문 접근 불가.
- **The Batch (DeepLearning.AI)**: 주간 발행으로 이번 기간 해당호 미포함.
- **Ahead of AI (Sebastian Raschka)**: 이번 기간 신규 글이 없거나 확인되지 않음.
- **AI포스트 (aipostkorea.com)**: 사이트 접근 불안정으로 본 회차 수집 제외.
- **Reuters, MIT Technology Review**: 별도 webfetch 수행하지 않음 (핵심 소스 충분 확보).
- **ArXiv**: 전체 1,283건 중 주목할 만한 논문 7건만 선별 수록.
- **The Verge**: 일부 기사는 7월 5일자이나 7월 6~7일 뉴스 사이클과 연관되어 포함.

---

> **범례**: 별도 표기 없는 날짜는 한국 시간 기준(UTC+9). 해외 소스 기사는 현지 시간을 YYYY-MM-DD로 변환.
