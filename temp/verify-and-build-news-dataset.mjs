import { chromium } from 'playwright';
import fs from 'fs';

// 2026-08-30 ~ 2026-09-04 기간의 엄선된 실물 기사 25개 후보 목록
const candidateArticles = [
  {
    id: "openai-gpt6-astra",
    category: "LLM/프론티어",
    date: "2026-09-03",
    url: "https://www.theverge.com/ai-artificial-intelligence/989601/openai-gpt-6-astra-release",
    title: "OpenAI, 차세대 플래그십 'GPT-6 Astra' 전격 출시... 자율 추론과 멀티모달 네이티브 결합",
    summary: "OpenAI가 ChatGPT Pro 및 엔터프라이즈 가입자를 대상으로 최신 플래그십 모델 GPT-6 Astra를 공개했습니다. 복합 추론과 멀티모달 상호작용을 단일 모델로 통합하며 AGI 시대의 본격적인 진입을 선언했습니다.",
    tags: ["OpenAI", "GPT-6 Astra", "AGI", "멀티모달", "자율추론"]
  },
  {
    id: "anthropic-claude-fable-5-1",
    category: "벤치마크/에이전트",
    date: "2026-09-01",
    url: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    title: "Anthropic, 장기 에이전트 특화 'Claude Fable 5.1' 및 Mythos 5.1 공식 출시",
    summary: "Anthropic이 멀티스텝 자율 실행과 코드 베이스 리팩토링 능력을 극대화한 신규 라인업 Claude Fable 5.1을 정식 론칭했습니다. 장기 에이전트 벤치마크(LongAgent-Bench)에서 84.7%의 신기록을 달성했습니다.",
    tags: ["Anthropic", "Claude Fable 5.1", "자율에이전트", "벤치마크", "코딩"]
  },
  {
    id: "google-gemini-3-8-flash",
    category: "벤치마크/효율성",
    date: "2026-09-03",
    url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
    title: "Google, 지능형 엔지니어링 워크호스 'Gemini 3.8 Flash' 및 Flash Cyber 전격 공개",
    summary: "Google이 초저지연과 100만 토큰 컨텍스트를 지원하는 Gemini 3.8 Flash와 사이버 보안 특화 Cyber 버전을 발표했습니다. SWE-bench Verified 78.4%를 기록하며 압도적 가성비를 입증했습니다.",
    tags: ["Google", "Gemini 3.8 Flash", "1M토큰", "SWE-bench", "Cyber"]
  },
  {
    id: "github-copilot-claude-fable-5-1",
    category: "개발도구/생태계",
    date: "2026-09-01",
    url: "https://github.blog/changelog/2026-09-01-claude-fable-5-1-generally-available-in-github-copilot/",
    title: "GitHub Copilot, Anthropic 'Claude Fable 5.1' 공식 일반 공급(GA) 개시",
    summary: "GitHub이 Copilot 전 구독 플랜(Individual, Business, Enterprise)에 Claude Fable 5.1 지원을 정식 도입했습니다. 대규모 코드베이스 이해와 멀티파일 변경 기능이 비약적으로 향상되었습니다.",
    tags: ["GitHub Copilot", "Claude Fable 5.1", "VS Code", "개발도구"]
  },
  {
    id: "github-copilot-gemini-3-8-flash",
    category: "개발도구/생태계",
    date: "2026-09-03",
    url: "https://github.blog/changelog/2026-09-03-gemini-3-8-flash-is-now-available-in-github-copilot/",
    title: "GitHub Copilot, 초고속 'Gemini 3.8 Flash' 모델 지원 즉각 개시",
    summary: "Google의 Gemini 3.8 Flash 공개 직후 GitHub Copilot에 모델 선택 옵션으로 추가되었습니다. 빠른 응답 속도와 합리적인 프리미엄 토큰 소모율로 실시간 코드 어시스턴트 사용성이 강화되었습니다.",
    tags: ["GitHub Copilot", "Gemini 3.8 Flash", "개발도구", "초저지연"]
  },
  {
    id: "nvidia-huggingface-acquisition",
    category: "빅딜/인수",
    date: "2026-09-03",
    url: "https://www.cnbc.com/2026/09/03/nvidia-agrees-to-buy-hugging-face-for-almost-13-billion-ai-expansion.html",
    title: "Nvidia, 오픈소스 AI 허브 'Hugging Face' 129억 달러(약 17.5조 원) 전격 인수",
    summary: "Nvidia가 전 세계 최대 머신러닝 오픈 플랫폼 Hugging Face를 약 129억 달러에 인수하기로 최종 합의했습니다. 하드웨어 독점을 넘어 글로벌 오픈 모델 생태계 소프트웨어 지배력을 공고히 합니다.",
    tags: ["Nvidia", "Hugging Face", "M&A", "오픈소스", "하드웨어 생태계"]
  },
  {
    id: "zai-glm-5-1-huggingface",
    category: "오픈소스/MoE",
    date: "2026-09-02",
    url: "https://huggingface.co/zai-org/GLM-5.1",
    title: "Z.ai, 754B 초거대 MoE 오픈 모델 'GLM-5.1' 허깅페이스에 가중치 전면 공개",
    summary: "Z.ai 연구진이 활성 48B(총 754B 파라미터) 구조의 Mixture of Experts 모델 GLM-5.1 가중치를 허깅페이스에 공개했습니다. 오픈소스 생태계에서 독자적인 추론 벤치마크 톱티어를 기록했습니다.",
    tags: ["Z.ai", "GLM-5.1", "MoE", "Hugging Face", "오픈소스"]
  },
  {
    id: "cognition-devin-valuation",
    category: "투자/유니콘",
    date: "2026-09-03",
    url: "https://en.sedaily.com/finance/2026/09/03/cognition-ai-nears-funding-round-at-47-billion-valuation",
    title: "자율 코딩 AI 스타트업 Cognition, 470억 달러(약 64조 원) 기업가치로 투자 유치",
    summary: "자율 소프트웨어 엔지니어 Devin을 개발한 Cognition AI가 470억 달러 기업가치로 10억 달러 규모 신규 라운드를 마감 중입니다. 전년 대비 20배 이상 폭등한 가치를 인정받았습니다.",
    tags: ["Cognition", "Devin", "AI코딩", "유니콘", "시리즈C"]
  },
  {
    id: "nvidia-pair-local-inference",
    category: "하드웨어/인프라",
    date: "2026-09-03",
    url: "https://www.theverge.com/ai-artificial-intelligence/989435/nvidia-pair-personal-ai-router-home-local-llm-compute-tool-rtx-macbook",
    title: "Nvidia, 로컬 네트워크 분산 AI 추론 도구 'PAIR' 무료 베타 공개",
    summary: "Nvidia가 가정이나 연구실 내 유휴 PC, 맥북, 워크스테이션을 하나로 묶어 개인용 분산 AI 추론 클러스터로 구동하는 'Personal AI Router(PAIR)'를 전격 발표하고 무료 베타를 시작했습니다.",
    tags: ["Nvidia", "PAIR", "로컬AI", "분산추론", "RTX"]
  },
  {
    id: "openai-critical-infrastructure-daybreak",
    category: "보안/정책",
    date: "2026-09-03",
    url: "https://www.axios.com/2026/09/03/openai-critical-infrastructure-cyber-ai-models",
    title: "OpenAI, 전 세계 핵심 인프라 사이버 방어 지원에 10억 달러 투입 프로그램 발표",
    summary: "OpenAI가 전력망, 수자원, 의료망 등 필수 공공 인프라를 사이버 공격으로부터 보호하기 위해 10억 달러 상당의 첨단 AI 방어 모델 및 기술 파트너십을 무상 보조하는 이니셔티브를 발표했습니다.",
    tags: ["OpenAI", "사이버보안", "핵심인프라", "보안AI", "공공안전"]
  },
  {
    id: "microsoft-mai-transcribe-2",
    category: "음성AI/멀티모달",
    date: "2026-09-03",
    url: "https://venturebeat.com/infrastructure/microsoft-ais-mai-transcribe-2-undercuts-openai-google-and-elevenlabs-on-price-and-speed",
    title: "Microsoft AI, 차세대 음성 인식 모델 'MAI-Transcribe-2' 출시",
    summary: "Microsoft AI 부서가 독자 개발한 음성 전사 모델 MAI-Transcribe-2를 공개했습니다. OpenAI와 ElevenLabs 대비 처리 비용을 절반 이하로 낮추고 실시간 지연시간을 120ms 미만으로 단축했습니다.",
    tags: ["Microsoft", "음성인식", "MAI-Transcribe-2", "초저지연", "비용절감"]
  },
  {
    id: "wired-cursor-openai-billion-revenue",
    category: "비즈니스/빅테크",
    date: "2026-09-03",
    url: "https://www.wired.com/story/openai-elon-musk-cursor-billion-revenue/",
    title: "와이어드 특종: Cursor, OpenAI 연간 10억 달러 매출 기여 고객으로 급성장",
    summary: "AI 코드 편집기 Cursor가 OpenAI의 최상위 5대 고객사로 등극하며 연간 10억 달러 이상의 API 매출을 견인하고 있는 것으로 밝혀졌습니다. 개발자 툴이 AI 기업의 최대 캐시카우로 부상했습니다.",
    tags: ["Cursor", "OpenAI", "AI개발도구", "매출분석", "비즈니스"]
  },
  {
    id: "crusoe-13b-jane-street-deal",
    category: "클라우드/인프라",
    date: "2026-09-03",
    url: "https://www.reuters.com/technology/crusoe-signs-13-billion-ai-cloud-deal-with-jane-street-bloomberg-news-reports-2026-09-03/",
    title: "Crusoe, Jane Street와 130억 달러(약 17.6조 원) 규모 AI 클라우드 공급 계약",
    summary: "청정에너지 기반 AI 데이터센터 기업 Crusoe가 월가 대표 퀀트 금융사 Jane Street와 5년간 130억 달러 규모의 초거대 GPU 클러스터 및 전용 인프라 공급 계약을 체결했습니다.",
    tags: ["Crusoe", "Jane Street", "AI클라우드", "GPU인프라", "데이터센터"]
  },
  {
    id: "nvidia-rtx-spark-n1x",
    category: "하드웨어/PC",
    date: "2026-09-03",
    url: "https://www.tomshardware.com/laptops/nvidias-rtx-spark-n1x-launches-in-october-for-laptops-and-desktops-18-or-20-cpu-cores-paired-with-5-120-or-6-144-cuda-cores-up-to-128gb-of-unified-memory",
    title: "Nvidia 차세대 PC 통합 프로세서 'RTX Spark N1X' 10월 전격 출시 발표",
    summary: "Nvidia가 IFA 2026에서 노트북 및 데스크톱을 위한 신형 온디바이스 AI 칩 RTX Spark N1X를 발표했습니다. 최대 128GB 통합 메모리와 6,144개 쿠다 코어로 로컬 AI 추론 시장을 정조준합니다.",
    tags: ["Nvidia", "RTX Spark N1X", "온디바이스AI", "통합메모리", "IFA2026"]
  },
  {
    id: "anker-eufy-mindbase-local-llm",
    category: "스마트홈/온디바이스",
    date: "2026-09-03",
    url: "https://www.theverge.com/tech/987936/anker-eufy-mindbase-ai-security-camera-system-matter",
    title: "Anker, 자체 온디바이스 LLM 탑재한 스마트홈 AI 허브 'Eufy MindBase' 공개",
    summary: "Anker가 외부 클라우드 구독 없이 기기 자체에서 소형 LLM을 실행해 카메라 영상을 실시간 요약·분석하는 'MindBase' 스마트홈 허브를 출시했습니다. 최대 48TB 로컬 스토리지를 지원합니다.",
    tags: ["Anker", "Eufy", "온디바이스LLM", "스마트홈", "로컬보안"]
  },
  {
    id: "outages-chatgpt-claude-grok-recovery",
    category: "인프라/이슈",
    date: "2026-09-03",
    url: "https://9to5google.com/2026/09/03/chatgpt-claude-grok-outages/",
    title: "ChatGPT·Claude·Grok 주요 AI 서비스, 동시다발 대규모 장애 후 완전 정상 복구",
    summary: "글로벌 클라우드 백본 및 인증 인프라 장애로 인해 주요 AI 챗봇 서비스들이 수시간 동안 서비스 다운을 겪었습니다. 전 세계 이용자 혼란 후 현재 모든 서비스가 정상화되었습니다.",
    tags: ["서비스장애", "ChatGPT", "Claude", "Grok", "클라우드"]
  },
  {
    id: "mira-murati-thinking-machines-funding",
    category: "투자/스타트업",
    date: "2026-09-03",
    url: "https://techcrunch.com/2026/09/03/accel-reportedly-in-talks-to-lead-1b-round-for-thinking-machines-at-40b-valuation/",
    title: "미라 무라티의 신생 랩 'Thinking Machines Lab', 400억 달러 밸류로 10억 달러 투자 유치 임박",
    summary: "전 OpenAI CTO 미라 무라티가 설립한 Thinking Machines Lab이 Accel 주도로 400억 달러(약 54조 원) 기업가치에 10억 달러 이상을 조달하는 라운드를 진행 중인 것으로 확인되었습니다.",
    tags: ["Thinking Machines", "미라 무라티", "VC투자", "Accel", "프론티어AI"]
  },
  {
    id: "equinix-nvidia-together-ai-deal",
    category: "데이터센터/파트너십",
    date: "2026-09-02",
    url: "https://www.cnbc.com/2026/09/02/equinix-partners-with-nvidia-carves-niche-in-ai-data-center-boom.html",
    title: "시총 1,000억 달러 에퀴닉스, Nvidia 및 Together AI와 맞춤형 AI 데이터센터 제휴",
    summary: "글로벌 최대 데이터센터 리츠 Equinix가 Nvidia 최신 아키텍처와 Together AI 분산 클러스터를 통합한 엔터프라이즈 전용 온디맨드 AI 데이터센터 인프라를 정식 론칭했습니다.",
    tags: ["Equinix", "Nvidia", "Together AI", "데이터센터", "엔터프라이즈"]
  },
  {
    id: "wired-meta-ai-agent-hatch",
    category: "기업문화/에이전트",
    date: "2026-09-03",
    url: "https://www.wired.com/story/meta-pushes-its-new-ai-agent-on-employees-but-eases-off-on-tokenmaxxing/",
    title: "Meta, 직원 평가서 '토큰 소비량 경쟁' 완화... 사내 에이전트 전면 배치",
    summary: "Meta가 엔지니어들에게 강요하던 무분별한 토큰 소모 평가(토큰맥싱)를 완화하고, 신규 자율 에이전트 시스템을 통한 실질적 생산성 증대 중심으로 사내 개발 문화를 재편했습니다.",
    tags: ["Meta", "AI에이전트", "토큰맥싱", "개발생산성", "조직문화"]
  },
  {
    id: "pentagon-anthropic-supply-chain-risk",
    category: "안보/규제",
    date: "2026-09-03",
    url: "https://www.reuters.com/business/anthropic-still-flagged-risk-defense-industrial-base-us-official-says-2026-09-03/",
    title: "미 국방부 고위 관계자: 'Anthropic 공급망 안보 리스크 평가 여전히 유효'",
    summary: "상무부 장관의 규제 완화 발언과 법원 판결에도 불구하고, 미국 국방부(DOD) 관계자가 Anthropic을 국방 산업 기반 공급망 위험 요소로 계속 간주하고 있다고 공식 재확인했습니다.",
    tags: ["Pentagon", "Anthropic", "공급망리스크", "방위산업", "AI안보"]
  },
  {
    id: "g20-carolina-principles-ai-regulation",
    category: "글로벌정책/규제",
    date: "2026-09-03",
    url: "https://techstrong.ai/ai-governance/g20-endorses-u-s-backed-carolina-principles-for-light-touch-ai-governance/",
    title: "G20 정상회의, 미국 주도 최소규제 '캐롤라이나 원칙' 만장일치 지지",
    summary: "G20 혁신 장관 회의에서 혁신 친화적·최소 개입을 표방하는 미국의 '캐롤라이나 원칙(Carolina Principles)'이 만장일치로 승인되며 글로벌 AI 거버넌스의 판도가 완화 기조로 전환되었습니다.",
    tags: ["G20", "캐롤라이나원칙", "AI거버넌스", "규제완화", "글로벌정책"]
  },
  {
    id: "ultrahuman-qualcomm-smart-ring",
    category: "웨어러블/투자",
    date: "2026-09-03",
    url: "https://techcrunch.com/2026/09/03/qualcomm-backs-ultrahuman-in-70m-round-on-bet-to-turn-smart-rings-into-computers/",
    title: "스마트링 스타트업 Ultrahuman, 퀄컴 벤처스로부터 7,000만 달러 투자 유치",
    summary: "인도 헬스테크 스타트업 Ultrahuman이 스마트링을 차세대 공간 제스처 및 헬스 AI 인터페이스로 발전시키기 위해 퀄컴 주도로 7,000만 달러 투자를 확보했습니다.",
    tags: ["Ultrahuman", "Qualcomm", "스마트링", "웨어러블AI", "헬스테크"]
  },
  {
    id: "microsoft-xbox-cloud-pay-as-you-go",
    category: "클라우드/게임",
    date: "2026-09-03",
    url: "https://www.theverge.com/news/989211/microsoft-xbox-cloud-gaming-pay-as-you-go-option",
    title: "Microsoft, Xbox Cloud Gaming을 비(非)구독자 대상 종량제로 개방 확대",
    summary: "Microsoft가 게임패스 얼티밋 구독자에게만 제공되던 Xbox 클라우드 게이밍 인프라를 일반 사용자 대상 시간당 과금(Pay-as-you-go) 옵션으로 확대 도입한다고 발표했습니다.",
    tags: ["Microsoft", "Xbox", "클라우드게이밍", "종량제", "인프라"]
  },
  {
    id: "trump-administration-drone-tariffs",
    category: "무역/하드웨어",
    date: "2026-09-03",
    url: "https://arstechnica.com/tech-policy/2026/09/trumps-100-drone-tariff-has-cops-and-firefighters-panicking/",
    title: "美 정부, 해외산 자율 비행 드론에 최대 100% 관세 전격 부과 발표",
    summary: "미국 행정부가 열화상 센서나 55파운드 이상의 고성능 산업용·자율비행 드론 수입품에 대해 최대 100%의 고율 관세를 부과하기로 결정하며 현장 도입 기관들이 대책 마련에 나섰습니다.",
    tags: ["드론", "무역관세", "자율비행", "미국정책", "공급망"]
  },
  {
    id: "adobe-names-chakravarthy-ceo",
    category: "인사/기업",
    date: "2026-09-03",
    url: "https://www.cnbc.com/2026/09/03/adobe-anil-chakravarthy-ceo.html",
    title: "Adobe, 샨타누 나라옌 후임으로 아닐 차크라바티 사장을 신임 CEO로 임명",
    summary: "Adobe가 18년간 회사를 이끈 샨타누 나라옌의 후임으로 고객 경험 오케스트레이션 부문 대표인 아닐 차크라바티를 신임 최고경영자(CEO)로 공식 임명했습니다.",
    tags: ["Adobe", "CEO교체", "아닐 차크라바티", "인사", "빅테크"]
  }
];

async function verifyAndExtract() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  
  console.log(`Starting strict verification of ${candidateArticles.length} candidate articles...`);
  
  for (let i = 0; i < candidateArticles.length; i++) {
    const item = candidateArticles[i];
    console.log(`\n[${i+1}/${candidateArticles.length}] Checking: ${item.title.slice(0, 35)}...`);
    console.log(`   URL: ${item.url}`);
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    
    let status = 0;
    let actualPageTitle = '';
    let finalUrl = item.url;
    let thumbnailBase64 = '';
    
    try {
      const response = await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      status = response ? response.status() : 0;
      finalUrl = page.url();
      actualPageTitle = await page.title();
      
      console.log(`   Status: ${status} | Final URL: ${finalUrl}`);
      console.log(`   Page Title: ${actualPageTitle.slice(0, 50)}`);
      
      // Wait slightly for dynamic images/DOM
      await page.waitForTimeout(1500);
      
      // Try to find image URL from og:image
      const ogImage = await page.evaluate(() => {
        const meta = document.querySelector('meta[property="og:image"]') || 
                     document.querySelector('meta[name="twitter:image"]');
        return meta ? meta.getAttribute('content') : null;
      });
      
      if (ogImage && (ogImage.startsWith('http') || ogImage.startsWith('//'))) {
        const fullImgUrl = ogImage.startsWith('//') ? 'https:' + ogImage : ogImage;
        console.log(`   Found og:image: ${fullImgUrl.slice(0, 60)}...`);
        
        try {
          thumbnailBase64 = await page.evaluate(async (imgSrc) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxW = 600;
                const scale = Math.min(1, maxW / img.width);
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/webp', 0.75));
              };
              img.onerror = () => resolve(null);
              img.src = imgSrc;
            });
          }, fullImgUrl);
        } catch (e) {
          console.log(`   Direct image canvas load failed, taking viewport crop...`);
        }
      }
      
      // If no valid og:image or canvas failed, take element or viewport screenshot
      if (!thumbnailBase64) {
        console.log(`   Capturing visual viewport screenshot...`);
        const buffer = await page.screenshot({
          clip: { x: 0, y: 0, width: 1200, height: 630 },
          type: 'jpeg',
          quality: 60
        });
        thumbnailBase64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
      }
      
      console.log(`   ✓ Image captured, size: ${(thumbnailBase64.length / 1024).toFixed(1)} KB`);
      
    } catch (err) {
      console.error(`   ✗ Error fetching ${item.url}: ${err.message}`);
    } finally {
      await context.close();
    }
    
    results.push({
      ...item,
      verifiedStatus: status,
      verifiedPageTitle: actualPageTitle,
      verifiedFinalUrl: finalUrl,
      thumbnail: thumbnailBase64
    });
  }
  
  await browser.close();
  
  fs.writeFileSync('temp/verified-articles-full.json', JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nAll 25 articles verified and saved to temp/verified-articles-full.json!`);
}

verifyAndExtract().catch(console.error);
