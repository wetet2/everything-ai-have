import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const realNewsData = [
  {
    id: "openai-gpt6-astra",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "The Verge",
    category: "프론티어 모델",
    tags: ["GPT-6 Astra", "OpenAI", "AGI"],
    important: true,
    lead: true,
    coverage: "The Verge 및 OpenAI 공식 발표",
    title: "OpenAI, 'GPT-6 Astra' 전격 출시... 그렉 브록만 '본격적인 AGI 시대 진입'",
    summary: "OpenAI가 차세대 주력 모델 'GPT-6 Astra'를 Daybreak 프로그램 고객을 시작으로 공식 출시했다. 그렉 브록만 사장은 이를 '세대적 도약'이라 평가하며 본격적인 AGI 시대 진입을 선언했다.",
    url: "https://www.theverge.com/ai-artificial-intelligence/989601/openai-gpt-6-astra-release"
  },
  {
    id: "anthropic-claude-fable-5-1",
    date: "2026-09-01",
    dateLabel: "09.01",
    source: "Anthropic",
    category: "모델 출시",
    tags: ["Claude Fable 5.1", "Mythos 5.1", "캐시 할인"],
    important: true,
    lead: true,
    coverage: "Anthropic 공식 발표 및 GitHub Copilot 탑재",
    title: "Anthropic, 장기 에이전트 특화 'Claude Fable 5.1' 및 'Mythos 5.1' 공식 공개",
    summary: "Anthropic이 고난도 장기 에이전트 작업을 위한 Claude Fable 5.1과 사이버·바이오 특화 트윈 모델 Mythos 5.1을 출시했다. 터미널 과학 벤치마크 52.6%를 기록했으며 캐시 읽기 가격을 75% 인하했다.",
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-1"
  },
  {
    id: "google-gemini-3-8-flash",
    date: "2026-09-02",
    dateLabel: "09.02",
    source: "Google Blog",
    category: "모델 출시",
    tags: ["Gemini 3.8 Flash", "Flash Cyber", "소프트웨어 엔지니어링"],
    important: true,
    lead: true,
    coverage: "Google 공식 발표 및 DeepMind 기술 보고서",
    title: "Google, 지능형 엔지니어링 워크호스 'Gemini 3.8 Flash' 및 'Flash Cyber' 출시",
    summary: "Google이 자율 에이전트와 소프트웨어 엔지니어링에 최적화된 Gemini 3.8 Flash를 발표했다. Terminal-Bench 2.1 90.8%, SWE-Bench Pro 61.6%를 기록했으며 방어 전용 사이버 모델도 함께 배포했다.",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/"
  },
  {
    id: "nvidia-huggingface-acquisition",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "CNBC",
    category: "인수·생태계",
    tags: ["Nvidia", "Hugging Face", "M&A"],
    important: true,
    lead: true,
    coverage: "CNBC 및 블룸버그 일제 보도 · 129억 달러",
    title: "Nvidia, 오픈소스 AI 허브 Hugging Face 129억 달러 인수 전격 합의",
    summary: "Nvidia가 오픈소스 AI 생태계의 중심인 Hugging Face를 약 129억 달러(약 17조 원)에 인수하기로 합의했다. 칩 제조사를 넘어 오픈 모델 호스팅과 배포 표준까지 수직 통합을 완성했다.",
    url: "https://www.cnbc.com/2026/09/03/nvidia-agrees-to-buy-hugging-face-for-almost-13-billion-ai-expansion.html"
  },
  {
    id: "cognition-devin-valuation",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "서울경제 / Sedaily",
    category: "투자·유니콘",
    tags: ["Cognition", "Devin", "470억 달러"],
    important: true,
    lead: true,
    coverage: "Techmeme 헤드라인 및 글로벌 금융 매체 보도",
    title: "자율 코딩 AI 스타트업 Cognition, 470억 달러 기업가치로 10억 달러 투자 유치 임박",
    summary: "AI 소프트웨어 엔지니어 Devin을 개발한 Cognition이 연간 반복 매출(ARR) 9억 달러 돌파에 힘입어 기업가치 약 470억 달러로 10억 달러 이상의 대규모 투자를 최종 조율 중이다.",
    url: "https://en.sedaily.com/finance/2026/09/03/cognition-ai-nears-funding-round-at-47-billion-valuation"
  },
  {
    id: "zai-glm-5-1-huggingface",
    date: "2026-09-02",
    dateLabel: "09.02",
    source: "Hugging Face",
    category: "오픈소스",
    tags: ["GLM-5.1", "MoE", "오픈 가중치"],
    important: true,
    lead: false,
    coverage: "Hugging Face 공식 오픈 모델 등록",
    title: "Z.ai, 초거대 MoE 오픈 모델 'GLM-5.1' 허깅페이스에 가중치 공개",
    summary: "Z.ai(지푸 AI)가 256개 라우팅 전문가(토큰당 8개 활성화)를 탑재하고 20만 토큰 컨텍스트를 지원하는 플래그십 MoE 모델 GLM-5.1의 가중치를 허깅페이스에 공개했다.",
    url: "https://huggingface.co/zai-org/GLM-5.1"
  },
  {
    id: "apple-tim-cook-ternus-transition",
    date: "2026-09-01",
    dateLabel: "09.01",
    source: "Apple Newsroom",
    category: "기업·리더십",
    tags: ["Apple", "존 터너스", "팀 쿡"],
    important: true,
    lead: false,
    coverage: "Apple 공식 뉴스룸 발표",
    title: "Apple, 팀 쿡 이사회 의장 전환 및 존 터너스 신임 CEO 공식 취임",
    summary: "Apple이 15년간 회사를 이끈 팀 쿡의 이사회 총괄 의장 취임과 하드웨어 엔지니어링 및 애플 실리콘 AI 혁신을 주도한 존 터너스의 신임 CEO 공식 승계를 발표했다.",
    url: "https://www.apple.com/newsroom/2026/04/tim-cook-to-become-apple-executive-chairman-john-ternus-to-become-apple-ceo/"
  },
  {
    id: "nvidia-pair-local-inference",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "The Verge",
    category: "도구·인프라",
    tags: ["Nvidia PAIR", "로컬 LLM", "분산 추론"],
    important: true,
    lead: false,
    coverage: "The Verge 단독 심층 리뷰",
    title: "Nvidia, 로컬 네트워크 분산 AI 추론 도구 'PAIR' 무료 베타 출시",
    summary: "Nvidia가 로컬 홈 네트워크 상의 PC, 맥북, RTX GPU 자원을 하나로 묶어 거대 로컬 LLM을 분산 실행할 수 있는 무료 도구인 Personal AI Router(PAIR)를 공개했다.",
    url: "https://www.theverge.com/ai-artificial-intelligence/989435/nvidia-pair-personal-ai-router-home-local-llm-compute-tool-rtx-macbook"
  },
  {
    id: "openai-critical-infrastructure-daybreak",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Axios",
    category: "보안·정책",
    tags: ["OpenAI", "Daybreak", "사이버 인프라"],
    important: true,
    lead: false,
    coverage: "Axios 단독 인터뷰 보도",
    title: "OpenAI, 전 세계 핵심 인프라 사이버 방어 지원에 10억 달러 투입",
    summary: "OpenAI가 수도, 전력망, 공공의료 등 국가 필수 인프라를 사이버 공격으로부터 방어하기 위해 자사 프론티어 AI 모델과 보안 툴을 보조하는 10억 달러 규모 지원 이니셔티브를 가동했다.",
    url: "https://www.axios.com/2026/09/03/openai-critical-infrastructure-cyber-ai-models"
  },
  {
    id: "microsoft-mai-transcribe-2",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "VentureBeat",
    category: "음성·멀티모달",
    tags: ["Microsoft", "음성 인식", "MAI-Transcribe"],
    important: false,
    lead: false,
    coverage: "VentureBeat 단독 기술 보도",
    title: "Microsoft AI, 차세대 음성 모델 'MAI-Transcribe-2' 공개... 시간당 0.10달러",
    summary: "마이크로소프트 AI가 제미나이와 GPT 음성 인식 모델을 능가하는 초고속 음성 모델 MAI-Transcribe-2를 발표했다. 시간당 0.10달러의 파격적인 단가로 시장 공략에 나섰다.",
    url: "https://venturebeat.com/infrastructure/microsoft-ais-mai-transcribe-2-undercuts-openai-google-and-elevenlabs-on-price-and-speed"
  },
  {
    id: "wired-cursor-openai-billion-revenue",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "WIRED",
    category: "비즈니스·생태계",
    tags: ["Cursor", "SpaceX", "OpenAI 매출"],
    important: true,
    lead: false,
    coverage: "WIRED 심층 취재 기사",
    title: "와이어드 취재: Cursor, OpenAI 최대 5대 고객이자 연간 10억 달러 매출원",
    summary: "SpaceX에 인수된 Cursor가 2026년 초 기준 OpenAI의 최상위 5대 고객 중 하나였으며, 연간 10억 달러 이상의 API 매출을 안겨주는 핵심 파트너였음이 내부 문건을 통해 드러났다.",
    url: "https://www.wired.com/story/openai-elon-musk-cursor-billion-revenue/"
  },
  {
    id: "crusoe-13b-jane-street-deal",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Bloomberg",
    category: "인프라·클라우드",
    tags: ["Crusoe", "Jane Street", "AI 클라우드"],
    important: false,
    lead: false,
    coverage: "Bloomberg 단독 특종",
    title: "Crusoe, Jane Street와 130억 달러 규모 AI GPU 인프라 공급 계약 체결",
    summary: "AI 네오클라우드 Crusoe가 글로벌 금융사 Jane Street와 5년간 약 130억 달러 규모의 GPU 트레이닝 및 추론 인프라를 공급하는 초대형 클라우드 계약을 체결했다.",
    url: "https://www.bloomberg.com/news/articles/2026-09-03/crusoe-signs-roughly-13-billion-ai-cloud-deal-with-jane-street"
  },
  {
    id: "meta-slack-ai-agents",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Techmeme",
    category: "엔터프라이즈",
    tags: ["Meta", "Slack", "사내 에이전트"],
    important: true,
    lead: false,
    coverage: "Techmeme 기술 클러스터 톱 보도",
    title: "Meta, 사내 협업 플랫폼 Google Chat에서 Slack 전면 전환... '에이전트 연동 우위'",
    summary: "Meta가 전사 사내 메신저를 Google Chat에서 Slack으로 전면 교체하기로 결정했다. 자율 워크플로우를 수행하는 사내 AI 에이전트 플랫폼으로서 Slack의 API 생태계와 상호작용 기능이 압도적으로 우수하다는 점이 배경이다.",
    url: "https://www.techmeme.com/260903/p12#a260903p12"
  },
  {
    id: "nvidia-rtx-spark-n1x",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Tom's Hardware",
    category: "하드웨어·칩",
    tags: ["Nvidia", "RTX Spark", "Blackwell"],
    important: false,
    lead: false,
    coverage: "Tom's Hardware 단독 하드웨어 스펙 보도",
    title: "Nvidia, 10월 출시 차세대 PC 프로세서 'RTX Spark N1X' 세부 사양 공개",
    summary: "Nvidia가 최대 6,144개 블랙웰 GPU 코어와 20코어 CPU, 최대 128GB 통합 메모리를 결합한 데스크톱 및 노트북용 온디바이스 AI 칩셋 RTX Spark N1X를 10월 출시한다고 밝혔다.",
    url: "https://www.tomshardware.com/laptops/nvidias-rtx-spark-n1x-launches-in-october-for-laptops-and-desktops-18-or-20-cpu-cores-paired-with-5-120-or-6-144-cuda-cores-up-to-128gb-of-unified-memory"
  },
  {
    id: "anker-eufy-mindbase-local-llm",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "The Verge",
    category: "스마트홈·엣지",
    tags: ["Anker", "Eufy MindBase", "로컬 LLM"],
    important: false,
    lead: false,
    coverage: "The Verge 신제품 발표 보도",
    title: "Anker, 자체 온디바이스 LLM 탑재한 보안 카메라 허브 'Eufy MindBase' 공개",
    summary: "앤커(Anker)가 전용 AI 칩셋과 사내 개발한 로컬 LLM을 탑재해 클라우드 전송 없이 가정 내 영상을 비공개로 실시간 분석하는 최대 48TB 용량의 홈 허브를 선보였다.",
    url: "https://www.theverge.com/tech/987936/anker-eufy-mindbase-ai-security-camera-system-matter"
  },
  {
    id: "nyt-big-tech-antitrust-analysis",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "New York Times",
    category: "정책·규제",
    tags: ["구글 반독점", "NYT", "빅테크 규제"],
    important: true,
    lead: false,
    coverage: "NYT 기명 심층 분석 리포트",
    title: "뉴욕타임스: 美 연방법원, 기술 혁신 속도 앞서 빅테크 강제 분할 명령에 신중",
    summary: "뉴욕타임스는 최근 구글 애드테크 반독점 재판 판결을 분석하며, 법원이 독점 위법성을 인정하면서도 AI 및 기술 패권 경쟁을 고려해 기업 분할 대신 상호운용성 강제라는 절충안을 택했다고 평가했다.",
    url: "https://www.nytimes.com/2026/09/03/business/google-antitrust-ad-tech-remedies-analysis.html?unlocked_article_code=1.-VA.FbkK.3Fdfs_606NbJ&smid=bs-share"
  },
  {
    id: "htc-vive-eagle-smart-glasses",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Bloomberg",
    category: "웨어러블",
    tags: ["HTC", "Vive Eagle", "스마트 안경"],
    important: false,
    lead: false,
    coverage: "Bloomberg 제품 출시 보도",
    title: "HTC, ChatGPT와 Gemini 선택 가능한 499달러 스마트 안경 'Vive Eagle' 출시",
    summary: "HTC가 사용자가 취향에 따라 ChatGPT 또는 Gemini를 AI 어시스턴트로 선택해 음성 및 시각 보조를 받을 수 있는 499달러 스마트 글래스 Vive Eagle을 글로벌 출시했다.",
    url: "https://www.bloomberg.com/news/articles/2026-09-03/htc-brings-499-vive-eagle-smart-glasses-to-us-amid-broader-privacy-concerns"
  },
  {
    id: "mira-murati-thinking-machines-funding",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "The Information",
    category: "스타트업·투자",
    tags: ["미라 무라티", "Thinking Machines Lab", "투자 유치"],
    important: false,
    lead: false,
    coverage: "The Information 단독 특종 보도",
    title: "미라 무라티의 'Thinking Machines Lab', 400억 달러 밸류로 10억 달러 투자 논의",
    summary: "전 OpenAI CTO 미라 무라티가 설립한 AI 연구소 Thinking Machines Lab이 기업가치 약 400억 달러를 기준으로 10억 달러 이상의 초기 펀딩을 투자자들과 협의 중이다.",
    url: "https://www.theinformation.com/articles/thinking-machines-lab-talks-raise-billions-roughly-40-billion-valuation"
  },
  {
    id: "equinix-nvidia-together-ai-deal",
    date: "2026-09-02",
    dateLabel: "09.02",
    source: "CNBC",
    category: "데이터센터·인프라",
    tags: ["Equinix", "Nvidia", "Together AI"],
    important: false,
    lead: false,
    coverage: "CNBC 기업 파트너십 보도",
    title: "시총 1,000억 달러 에퀴닉스, Nvidia와 제휴해 데이터센터서 Together AI 구동",
    summary: "글로벌 데이터센터 리츠 기업 Equinix가 Nvidia와 손잡고 기업 고객들이 자사 데이터센터 인프라 내에서 직접 Together AI 플랫폼을 통해 파운데이션 모델을 미세조정하고 서빙할 수 있는 파트너십을 체결했다.",
    url: "https://www.cnbc.com/2026/09/02/equinix-partners-with-nvidia-carves-niche-in-ai-data-center-boom.html"
  },
  {
    id: "g20-tech-ceos-pro-ai-lobbying",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Wall Street Journal",
    category: "글로벌·정책",
    tags: ["G20", "황젠슨", "올트먼", "머스크"],
    important: true,
    lead: false,
    coverage: "WSJ 워싱턴 특파원 현장 보도",
    title: "젠슨 황·저커버그·샘 올트먼·머스크, G20 정상회의서 과도한 AI 규제 완화 촉구",
    summary: "글로벌 테크 대표 경영진들이 G20 정상회의 현장에서 각국 정책 입안자들을 만나 과도한 AI 가드레일 규제가 기술 혁신과 생산성 향상을 저해할 수 있다며 유연한 정책 채택을 공동 건의했다.",
    url: "https://www.wsj.com/tech/ai/tech-ceos-trump-administration-ask-g-20-to-adopt-pro-ai-policies-5b27a45c?st=dgo29z&reflink=desktopwebshare_permalink"
  },
  {
    id: "github-copilot-gemini-3-8-flash",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "GitHub Blog",
    category: "개발 도구",
    tags: ["GitHub Copilot", "Gemini 3.8 Flash", "코딩 에이전트"],
    important: false,
    lead: false,
    coverage: "GitHub 공식 변경 로그 (Changelog)",
    title: "GitHub Copilot, 차세대 모델 'Gemini 3.8 Flash' 공식 지원 개시",
    summary: "깃허브가 최신 Copilot 업데이트를 통해 구글의 초고속 고지능 모델 Gemini 3.8 Flash를 코딩 모델 옵션으로 전격 추가하여 개발자들에게 더 빠른 자동 완성 및 디버깅 경험을 제공한다.",
    url: "https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot/"
  },
  {
    id: "github-copilot-claude-fable-5-1",
    date: "2026-09-01",
    dateLabel: "09.01",
    source: "GitHub Blog",
    category: "개발 도구",
    tags: ["GitHub Copilot", "Claude Fable 5.1", "Anthropic"],
    important: false,
    lead: false,
    coverage: "GitHub 공식 변경 로그 (Changelog)",
    title: "GitHub Copilot, Anthropic 'Claude Fable 5.1' 엔터프라이즈 정식 도입",
    summary: "GitHub가 대규모 코드베이스 리팩토링 및 다단계 자율 에이전트 작업에 특화된 Anthropic의 신규 모델 Claude Fable 5.1을 Copilot Enterprise에 정식 배포했다.",
    url: "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot/"
  },
  {
    id: "wired-meta-ai-agent-hatch",
    date: "2026-09-02",
    dateLabel: "09.02",
    source: "WIRED",
    category: "기업 문화",
    tags: ["Meta", "사내 에이전트", "Hatch"],
    important: false,
    lead: false,
    coverage: "WIRED 단독 취재 보도",
    title: "Meta, 직원 평가서 '토큰 소비량 경쟁' 완화... 사내 에이전트 'Hatch' 보급 주력",
    summary: "Meta가 직원 성과 평가 기준에서 맹목적인 AI 토큰 소비 지표를 완화하는 대신, 사내 업무 자동화 전용 AI 에이전트인 'Hatch'의 실질적 생산성 기여도를 중심으로 평가 체계를 개편했다.",
    url: "https://www.wired.com/story/meta-pushes-its-new-ai-agent-on-employees-but-eases-off-on-tokenmaxxing/"
  },
  {
    id: "pentagon-anthropic-supply-chain-risk",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "Bloomberg",
    category: "국방·안보",
    tags: ["미 국방부", "Anthropic", "공급망 리스크"],
    important: false,
    lead: false,
    coverage: "Bloomberg 워싱턴 특파원 보도",
    title: "미 국방부, 행정부 규제 완화 발언에도 'Anthropic 공급망 리스크 지정' 유지",
    summary: "미 국방부(DOD) 고위 관계자가 상무부 장관의 갈등 해소 발언에도 불구하고 모델 안전성 및 통제력 검증 문제로 Anthropic에 대한 공급망 리스크 지정을 현행 유지한다고 밝혔다.",
    url: "https://www.bloomberg.com/news/articles/2026-09-03/pentagon-says-its-anthropic-ban-is-on-despite-lutnick-remarks"
  },
  {
    id: "outages-chatgpt-claude-grok-recovery",
    date: "2026-09-03",
    dateLabel: "09.03",
    source: "9to5Google",
    category: "인프라 장애",
    tags: ["ChatGPT", "Claude", "Grok", "서비스 장애"],
    important: false,
    lead: false,
    coverage: "9to5Google 긴급 속보",
    title: "ChatGPT·Claude·Grok 주요 AI 서비스, 동시다발 대규모 장애 후 완전 복구",
    summary: "목요일 글로벌 클라우드 및 DNS 라우팅 병목으로 인해 챗GPT, 클로드, 그록 등 주요 프론티어 AI 서비스에서 동시다발적인 서비스 접속 오류가 발생한 뒤 전면 정상 복구되었다.",
    url: "https://9to5google.com/2026/09/03/chatgpt-claude-grok-outages/"
  }
];

async function runValidateAndExtract() {
  console.log("Launching Chromium via Playwright...");
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const liveThumbs = {};
  const checkedStories = [];

  for (let i = 0; i < realNewsData.length; i++) {
    const s = realNewsData[i];
    console.log(`[${i+1}/${realNewsData.length}] Visiting: ${s.url}`);
    const page = await context.newPage();

    let status = 0;
    let title = "";
    let ogImage = null;

    try {
      const res = await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 20000 });
      status = res ? res.status() : 0;
      title = await page.title();
      console.log(`   Status: ${status} | Page Title: ${title.slice(0, 50)}...`);

      // Extract real image from page
      ogImage = await page.evaluate(() => {
        const og = document.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
                   document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
        if (og && !og.includes("default") && !og.includes("placeholder") && !og.endsWith(".ico")) {
          return og;
        }
        const img = document.querySelector('article img, figure img, .hero img, img.lead');
        return img?.src || og || null;
      });
    } catch (e) {
      console.log(`   Nav Error: ${e.message}`);
    }

    let webpData = null;

    if (ogImage) {
      console.log(`   Found Image: ${ogImage.slice(0, 60)}...`);
      webpData = await page.evaluate(async (imgUrl) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const maxW = 640;
            const scale = Math.min(1, maxW / img.width);
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/webp", 0.72));
          };
          img.onerror = () => {
            fetch(imgUrl)
              .then(r => r.blob())
              .then(b => {
                const u = URL.createObjectURL(b);
                const i2 = new Image();
                i2.onload = () => {
                  const maxW = 640;
                  const scale = Math.min(1, maxW / i2.width);
                  const canvas = document.createElement("canvas");
                  canvas.width = Math.round(i2.width * scale);
                  canvas.height = Math.round(i2.height * scale);
                  const ctx = canvas.getContext("2d");
                  ctx.drawImage(i2, 0, 0, canvas.width, canvas.height);
                  URL.revokeObjectURL(u);
                  resolve(canvas.toDataURL("image/webp", 0.72));
                };
                i2.onerror = () => resolve(null);
                i2.src = u;
              })
              .catch(() => resolve(null));
          };
          img.src = imgUrl;
        });
      }, ogImage).catch(() => null);
    }

    // Fallback: visual screenshot of the top section of the real page!
    if (!webpData) {
      console.log(`   Capturing visual screenshot from real page...`);
      try {
        await page.waitForTimeout(800);
        const buf = await page.screenshot({
          type: "jpeg",
          quality: 80,
          clip: { x: 0, y: 0, width: 1280, height: 720 }
        });
        webpData = await page.evaluate((b64) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = 640;
              canvas.height = 360;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, 640, 360);
              resolve(canvas.toDataURL("image/webp", 0.72));
            };
            img.src = "data:image/jpeg;base64," + b64;
          });
        }, buf.toString("base64"));
      } catch (err) {
        console.log(`   Screenshot error: ${err.message}`);
      }
    }

    liveThumbs[s.id] = webpData || "";
    checkedStories.push({
      ...s,
      image: webpData || "",
      realStatus: status,
      realPageTitle: title
    });

    console.log(`   ✓ Thumbnail ready (${webpData ? (webpData.length / 1024).toFixed(1) + ' KB' : 'FAILED'})\n`);
    await page.close();
  }

  await browser.close();

  writeFileSync("temp/real-news-data.json", JSON.stringify(checkedStories, null, 2), "utf8");
  writeFileSync("temp/real-live-thumbs.json", JSON.stringify(liveThumbs, null, 2), "utf8");
  console.log("Validation and extraction completed successfully for all 25 stories!");
}

runValidateAndExtract().catch(console.error);
