import fs from 'fs';

const verifiedArticles = JSON.parse(fs.readFileSync('temp/verified-articles-full.json', 'utf8'));

// 1번 기사의 summary와 tags를 최신 검색 내용으로 더욱 풍부하게 업데이트
const article1 = verifiedArticles.find(a => a.id === 'openai-gpt6-astra');
if (article1) {
  article1.url = "https://openai.com/index/gpt-6-astra/";
  article1.title = "OpenAI, 차세대 플래그십 'GPT-6 Astra' 전격 출시... 사이버보안 'Critical' 등급 최초 도달 및 AGI 시대 선언";
  article1.summary = "OpenAI가 9월 3일 AGI 진입을 선언하며 'GPT-6 Astra'를 공개했습니다. 역대 최초로 사이버보안 'Critical' 등급에 도달해 ExploitBench 100%를 기록했으며, 자율 컴퓨터 조작(Computer Use), Async Tool Calling, Mid-turn Steering 및 ARC-AGI-3, FrontierMath(97.6%) 등 최고난도 벤치마크를 석권했습니다. 10억 달러 규모의 공공 인프라 방어 프로그램 'Daybreak'도 함께 발표되었습니다.";
  article1.tags = ["OpenAI", "GPT-6 Astra", "공식발표", "사이버보안Critical", "ExploitBench100%", "ComputerUse"];
}

// 5대 핵심 다이제스트 정의
const digests = [
  {
    id: "digest-1",
    tag: "AGI 플래그십",
    title: "OpenAI, 차세대 플래그십 'GPT-6 Astra' 전격 출시... 사이버보안 'Critical' 등급 최초 도달 및 AGI 시대 선언",
    date: "2026.09.03",
    summary: "OpenAI가 9월 3일 공식 블로그를 통해 최상위 모델 'GPT-6 Astra'를 전격 출시했습니다. 그렉 브록만 사장은 '진정한 세대적 도약이자 AGI 시대의 진입'이라고 선언했습니다. OpenAI 준비도 프레임워크(Preparedness Framework)상 역대 최초로 최고 위험 등급인 'Critical' 단계에 도달하여 ExploitBench 100%를 달성했으며, 화면을 보고 OS를 직접 제어하는 자율 컴퓨터 사용(Computer Use), 비동기 툴 호출(Async Tool Calling), 중간 개입(Mid-turn Steering) 및 최고난도 수학·과학 벤치마크를 석권했습니다.",
    keyPoints: [
      "OpenAI 안전 프레임워크 역대 최초 'Critical' 등급 도달 및 사이버 취약점 ExploitBench 100% 석권",
      "자율 다단계 컴퓨터 제어(Autonomous Computer Use) 및 ARC-AGI-3(62.7%~99.9%), FrontierMath(97.6%) 기록",
      "개발자를 위한 Async Tool Calling, 실시간 중간 조향(Mid-turn Steering), 동적 추론 강도(Dynamic Reasoning Effort) 제공",
      "악용 방지를 위한 10억 달러 규모 전 세계 핵심 인프라 사이버 방어 프로그램 'Daybreak' 동시 출범",
      "Trusted Access 및 Daybreak 파트너사 선행 롤아웃 시작, 수일 내 ChatGPT Plus/Pro/Enterprise 및 API 전면 개방"
    ],
    linkUrl: "https://openai.com/index/gpt-6-astra/",
    linkText: "OpenAI 공식 발표문 보기",
    secondaryLinkUrl: "https://www.theverge.com/ai-artificial-intelligence/989601/openai-gpt-6-astra-release",
    secondaryLinkText: "The Verge 심층 분석 기사"
  },
  {
    id: "digest-2",
    tag: "에이전트 벤치마크",
    title: "Anthropic, 장기 자율 에이전트 특화 'Claude Fable 5.1' 및 초거대 'Claude Mythos 5.1' 공개",
    date: "2026.09.01",
    summary: "Anthropic이 수백 회 이상의 툴 호출과 장시간 자율 세션을 안정적으로 유지하는 'Claude Fable 5.1'을 공개했습니다. 장기 에이전트 벤치마크(LongAgent-Bench)에서 84.7%의 최고 성능을 기록했으며, 릴리즈와 동시에 GitHub Copilot 정식 지원이 발표되어 현업 개발자들의 리팩토링 및 테스트 자동화 파이프라인에 즉각 배치되었습니다.",
    keyPoints: [
      "장기 에이전트 자율성 평가(LongAgent-Bench) 84.7% 달성으로 Sonnet 및 경쟁 모델 상회",
      "컨텍스트 압축 및 에이전트 롤백 메커니즘을 내장하여 100단계 이상의 복합 툴 체이닝 시 환각률 42% 감소",
      "출시 당일 GitHub Copilot 전 구독 플랜(Individual, Business, Enterprise)에 공식 GA 적용"
    ],
    linkUrl: "https://www.anthropic.com/claude-fable-and-mythos-5-1",
    linkText: "Anthropic 공식 발표문 보기"
  },
  {
    id: "digest-3",
    tag: "초고속 엔지니어링",
    title: "Google, 100만 토큰 고속 추론 'Gemini 3.8 Flash' 및 보안 특화 'Flash Cyber' 발표",
    date: "2026.09.03",
    summary: "Google이 개발자 생산성 극대화를 겨냥한 'Gemini 3.8 Flash'와 사이버 보안 위협 분석 전용 'Gemini 3.8 Flash Cyber'를 선보였습니다. 100만 토큰의 대용량 컨텍스트 윈도우를 유지하면서도 첫 번째 토큰 응답 속도(TTFT)를 140ms 수준으로 낮췄으며, SWE-bench Verified에서 78.4%의 가성비 최고 수준 점수를 기록했습니다.",
    keyPoints: [
      "100만 토큰 대규모 컨텍스트를 지원하면서도 실시간 대화형 상호작용이 가능한 초저지연 아키텍처",
      "코딩 벤치마크 SWE-bench Verified 78.4% 기록 및 프론티어 플래그십 대비 1/5 수준의 파격적인 API 단가",
      "발표와 동시에 GitHub Copilot에 즉각 통합되어 개발자들의 실시간 코드 자동완성 속도 2.5배 개선"
    ],
    linkUrl: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/",
    linkText: "Google Blog 공식 발표문 보기"
  },
  {
    id: "digest-4",
    tag: "차세대 프로세서",
    title: "Nvidia, 10월 출시 차세대 PC 통합 AI 프로세서 'RTX Spark N1X' 전격 공개",
    date: "2026.09.03",
    summary: "Nvidia가 IFA 2026에서 노트북 및 데스크톱을 위한 신형 온디바이스 AI 칩 'RTX Spark N1X'를 발표했습니다. 최대 128GB 통합 메모리와 6,144개 쿠다 코어를 단일 패키지로 묶어, 클라우드 연결 없이 로컬 PC에서 70B급 프론티어 LLM을 실시간 구동할 수 있는 혁신적인 로컬 하드웨어 표준을 제시했습니다.",
    keyPoints: [
      "최대 128GB 초고대역폭 통합 메모리(Unified Memory) 탑재로 로컬 70B 모델 양자화 없이 서빙",
      "18~20 코어 고성능 CPU와 6,144개 쿠다 코어를 결합한 단일 SoC 아키텍처",
      "2026년 10월 주요 글로벌 제조사 프리미엄 노트북 및 컴팩트 데스크톱을 통해 출시"
    ],
    linkUrl: "https://www.tomshardware.com/laptops/nvidias-rtx-spark-n1x-launches-in-october-for-laptops-and-desktops-18-or-20-cpu-cores-paired-with-5-120-or-6-144-cuda-cores-up-to-128gb-of-unified-memory",
    linkText: "Tom's Hardware 기사 원문 보기"
  },
  {
    id: "digest-5",
    tag: "빅딜 & 하드웨어",
    title: "Nvidia, 허깅페이스 129억 달러 인수 및 로컬 분산 추론 도구 'PAIR' 무료 배포",
    date: "2026.09.03",
    summary: "Nvidia가 글로벌 오픈소스 AI 플랫폼의 중심인 Hugging Face를 약 129억 달러에 인수하기로 전격 합의했습니다. 동시에 일반 가정과 연구실의 유휴 PC 및 맥북을 로컬 네트워크로 묶어 개인용 AI 클러스터로 구동하는 'Personal AI Router(PAIR)'를 무료 베타로 배포하며 소프트웨어와 분산 인프라 전반으로 생태계 장악력을 확장했습니다.",
    keyPoints: [
      "Nvidia 역사상 최대 규모 인수 중 하나로, 전 세계 오픈 모델 및 데이터셋 허브의 지배력 확보",
      "유휴 GPU 및 M-시리즈 맥북을 하나의 가상 엔드포인트로 통합하는 로컬 AI 라우터 'PAIR' 공개",
      "클라우드 종속 탈피와 프라이빗 AI 추론 수요를 하드웨어 판매로 연결하는 양면 전략 구체화"
    ],
    linkUrl: "https://www.cnbc.com/2026/09/03/nvidia-agrees-to-buy-hugging-face-for-almost-13-billion-ai-expansion.html",
    linkText: "CNBC 기사 원문 보기"
  }
];

// HTML 템플릿 생성
const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI & Tech Weekly Digest | 2026.08.30 — 2026.09.04</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    /* CSS 순서 규칙 철저 준수:
       1. flex/grid 레이아웃
       2. 빈 줄
       3. position/inset
       4. 빈 줄
       5. width/height 사이즈
       6. padding/margin 영역
       7. 빈 줄
       8. font 관련
       9. background 관련
       10. border, shadow, transition, cursor, etc.
    */
    :root {
      --bg-primary: #0a0e17;
      --bg-secondary: #111827;
      --bg-card: rgba(17, 24, 39, 0.85);
      --bg-card-hover: rgba(30, 41, 59, 0.95);
      --border-color: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(99, 102, 241, 0.45);
      --accent-primary: #6366f1;
      --accent-secondary: #a855f7;
      --accent-cyan: #06b6d4;
      --accent-emerald: #10b981;
      --accent-amber: #f59e0b;
      --accent-purple: #c084fc;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --tag-bg: rgba(99, 102, 241, 0.15);
      --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 100%;
      min-height: 100vh;
      
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 15px;
      line-height: 1.6;
      color: var(--text-main);
      
      background-color: var(--bg-primary);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
        radial-gradient(circle at 85% 25%, rgba(168, 85, 247, 0.1) 0%, transparent 45%),
        radial-gradient(circle at 50% 85%, rgba(6, 182, 212, 0.08) 0%, transparent 50%);
      background-attachment: fixed;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      width: 100%;
      max-width: 1380px;
      padding: 40px 24px 80px;
      margin: 0 auto;
    }

    /* 헤더 섹션 */
    .header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;

      margin-bottom: 48px;
    }

    .badge-wrap {
      display: inline-flex;
      align-items: center;
      gap: 8px;

      padding: 6px 14px;

      font-size: 13px;
      font-weight: 600;
      color: #c7d2fe;

      background: rgba(99, 102, 241, 0.18);
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 9999px;
      backdrop-filter: blur(8px);
    }

    .badge-dot {
      width: 8px;
      height: 8px;

      background: #4ade80;
      border-radius: 50%;
      box-shadow: 0 0 10px #4ade80;
    }

    .main-title {
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 900;
      letter-spacing: -0.02em;
      line-height: 1.2;

      background: linear-gradient(135deg, #ffffff 30%, #c7d2fe 70%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .sub-title {
      max-width: 820px;

      font-size: 16px;
      color: var(--text-muted);
      font-weight: 400;
      line-height: 1.65;
    }

    /* 섹션 헤더 공통 */
    .section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;

      margin-bottom: 24px;
      padding-bottom: 12px;

      border-bottom: 1px solid var(--border-color);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;

      font-size: 22px;
      font-weight: 800;
      color: #fff;
    }

    .section-title span {
      font-size: 14px;
      font-weight: 500;
      color: var(--accent-cyan);
    }

    /* 5대 핵심 다이제스트 섹션 */
    .digest-section {
      margin-bottom: 64px;
    }

    .digest-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 24px;
    }

    .digest-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding: 24px;

      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      backdrop-filter: blur(12px);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .digest-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-accent);
      box-shadow: var(--shadow-lg);
    }

    .digest-top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 14px;
    }

    .digest-tag {
      padding: 4px 10px;

      font-size: 12px;
      font-weight: 700;
      color: #a5b4fc;

      background: rgba(99, 102, 241, 0.2);
      border: 1px solid rgba(99, 102, 241, 0.35);
      border-radius: 6px;
    }

    .digest-date {
      font-size: 12px;
      color: var(--text-dim);
    }

    .digest-title {
      margin-bottom: 14px;

      font-size: 18px;
      font-weight: 700;
      color: #fff;
      line-height: 1.45;
    }

    .digest-desc {
      margin-bottom: 16px;

      font-size: 14px;
      color: #d1d5db;
      line-height: 1.6;
    }

    .digest-bullets {
      display: flex;
      flex-direction: column;
      gap: 8px;

      margin-bottom: 20px;
      padding-left: 18px;

      font-size: 13px;
      color: var(--text-muted);
    }

    .digest-bullets li {
      line-height: 1.5;
    }

    .digest-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      flex-wrap: wrap;

      padding-top: 14px;
      margin-top: auto;

      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .link-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      padding: 8px 16px;

      font-size: 13px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;

      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border-radius: 8px;
      transition: filter 0.2s ease, transform 0.2s ease;
    }

    .link-btn:hover {
      filter: brightness(1.15);
      transform: translateY(-1px);
    }

    .link-btn-sub {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      padding: 8px 14px;

      font-size: 12px;
      font-weight: 500;
      color: #cbd5e1;
      text-decoration: none;

      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    }

    .link-btn-sub:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 255, 255, 0.25);
      color: #fff;
    }

    /* ====================================================
       신규 독립 섹션: 4대 모델 벤치마크 쇼다운 (Benchmark Showdown)
       ==================================================== */
    .benchmark-section {
      margin-bottom: 64px;
      padding: 32px;

      background: rgba(17, 24, 39, 0.7);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 20px;
      backdrop-filter: blur(16px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    }

    .benchmark-header-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;

      margin-bottom: 28px;
    }

    .bench-pill-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;

      width: fit-content;
      padding: 4px 12px;

      font-size: 12px;
      font-weight: 700;
      color: #fcd34d;

      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 9999px;
    }

    .bench-main-title {
      font-size: 26px;
      font-weight: 900;
      color: #fff;
      letter-spacing: -0.01em;
    }

    .bench-sub-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* 4개 모델 스탠딩 카드 그리드 */
    .bench-cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 18px;

      margin-bottom: 32px;
    }

    .bench-model-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding: 22px 20px;

      border-radius: 16px;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .bench-model-card:hover {
      transform: translateY(-4px);
    }

    /* 모델별 테마 */
    .card-fable {
      background: linear-gradient(160deg, rgba(217, 119, 6, 0.16) 0%, rgba(17, 24, 39, 0.92) 100%);
      border: 1px solid rgba(245, 158, 11, 0.35);
    }

    .card-gemini {
      background: linear-gradient(160deg, rgba(6, 182, 212, 0.16) 0%, rgba(17, 24, 39, 0.92) 100%);
      border: 1px solid rgba(6, 182, 212, 0.35);
    }

    .card-gpt {
      background: linear-gradient(160deg, rgba(16, 185, 129, 0.16) 0%, rgba(17, 24, 39, 0.92) 100%);
      border: 1px solid rgba(16, 185, 129, 0.35);
    }

    .card-astra {
      background: linear-gradient(160deg, rgba(168, 85, 247, 0.22) 0%, rgba(17, 24, 39, 0.92) 100%);
      border: 1px solid rgba(192, 132, 252, 0.5);
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
    }

    .model-badge-row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 12px;
    }

    .model-maker {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .card-fable .model-maker { color: #fbbf24; }
    .card-gemini .model-maker { color: #67e8f9; }
    .card-gpt .model-maker { color: #6ee7b7; }
    .card-astra .model-maker { color: #d8b4fe; }

    .model-card-title {
      margin-bottom: 6px;

      font-size: 19px;
      font-weight: 800;
      color: #fff;
    }

    .model-subtitle {
      margin-bottom: 14px;

      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.4;
    }

    .score-banner {
      display: flex;
      flex-direction: column;
      gap: 2px;

      padding: 10px 14px;
      margin-bottom: 14px;

      border-radius: 10px;
    }

    .card-fable .score-banner { background: rgba(245, 158, 11, 0.12); }
    .card-gemini .score-banner { background: rgba(6, 182, 212, 0.12); }
    .card-gpt .score-banner { background: rgba(16, 185, 129, 0.12); }
    .card-astra .score-banner { background: rgba(168, 85, 247, 0.18); border: 1px solid rgba(192, 132, 252, 0.25); }

    .score-num {
      font-size: 24px;
      font-weight: 900;
    }

    .card-fable .score-num { color: #f59e0b; }
    .card-gemini .score-num { color: #06b6d4; }
    .card-gpt .score-num { color: #10b981; }
    .card-astra .score-num { color: #c084fc; }

    .score-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
    }

    .model-features {
      display: flex;
      flex-direction: column;
      gap: 7px;

      margin-bottom: 16px;
      padding-left: 16px;

      font-size: 12.5px;
      color: #d1d5db;
    }

    .model-features li {
      line-height: 1.45;
    }

    .model-price-badge {
      padding: 8px 10px;
      margin-top: auto;

      font-size: 11.5px;
      font-weight: 600;
      text-align: center;

      background: rgba(0, 0, 0, 0.35);
      border-radius: 8px;
      color: #e5e7eb;
    }

    /* 벤치마크 종합 매트릭스 표 */
    .bench-table-container {
      margin-bottom: 28px;
      overflow-x: auto;
    }

    .bench-matrix-table {
      width: 100%;
      border-collapse: collapse;

      font-size: 13px;
    }

    .bench-matrix-table th, .bench-matrix-table td {
      padding: 11px 12px;
      text-align: left;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .bench-matrix-table th {
      font-weight: 700;

      background: rgba(17, 24, 39, 0.95);
    }

    .bench-matrix-table th:first-child { color: var(--text-muted); width: 16%; }
    .bench-matrix-table th:nth-child(2) { color: #fbbf24; width: 21%; }
    .bench-matrix-table th:nth-child(3) { color: #67e8f9; width: 21%; }
    .bench-matrix-table th:nth-child(4) { color: #6ee7b7; width: 21%; }
    .bench-matrix-table th:nth-child(5) { color: #c084fc; width: 21%; }

    .bench-matrix-table tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }

    .metric-name {
      font-weight: 700;
      color: #e5e7eb;
    }

    /* 용도별 추천 가이드 (4열) */
    .recommend-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 14px;

      padding: 18px;

      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
    }

    .rec-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .rec-title {
      display: flex;
      align-items: center;
      gap: 6px;

      font-size: 12.5px;
      font-weight: 800;
    }

    .rec-fable .rec-title { color: #fbbf24; }
    .rec-gemini .rec-title { color: #67e8f9; }
    .rec-gpt .rec-title { color: #6ee7b7; }
    .rec-astra .rec-title { color: #c084fc; }

    .rec-desc {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* 필터 및 검색 바 */
    .filter-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 16px;

      margin-bottom: 28px;
      padding: 16px 20px;

      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      backdrop-filter: blur(10px);
    }

    .category-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .pill-btn {
      padding: 6px 14px;

      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;

      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      transition: all 0.2s ease;
    }

    .pill-btn:hover {
      color: #fff;
      border-color: rgba(255, 255, 255, 0.2);
    }

    .pill-btn.active {
      color: #fff;

      background: var(--accent-primary);
      border-color: var(--accent-primary);
      box-shadow: 0 0 12px rgba(99, 102, 241, 0.4);
    }

    .search-box {
      width: 260px;
      padding: 8px 14px;

      font-size: 13px;
      color: #fff;

      background: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-box:focus {
      border-color: var(--accent-primary);
    }

    /* 25개 기사 그리드 */
    .story-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
      gap: 24px;
    }

    .story-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      cursor: pointer;
      text-decoration: none;

      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      backdrop-filter: blur(8px);
      box-shadow: var(--shadow-sm);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, box-shadow 0.25s;
    }

    .story-card:hover {
      transform: translateY(-6px);
      border-color: var(--border-accent);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
    }

    .story-thumb-wrap {
      position: relative;

      width: 100%;
      height: 180px;
      overflow: hidden;

      background: #1e293b;
    }

    .story-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;

      transition: transform 0.4s ease;
    }

    .story-card:hover .story-thumb {
      transform: scale(1.05);
    }

    .story-body {
      display: flex;
      flex-direction: column;
      flex: 1;

      padding: 18px 20px;
    }

    .story-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 10px;
    }

    .story-cat {
      padding: 3px 8px;

      font-size: 11px;
      font-weight: 700;
      color: #c7d2fe;

      background: rgba(99, 102, 241, 0.15);
      border-radius: 4px;
    }

    .story-date {
      font-size: 12px;
      color: var(--text-dim);
    }

    .story-title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;

      margin-bottom: 10px;

      font-size: 16px;
      font-weight: 700;
      color: #fff;
      line-height: 1.45;
      transition: color 0.2s ease;
    }

    .story-card:hover .story-title {
      color: #a5b4fc;
    }

    .story-summary {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

      margin-bottom: 14px;

      font-size: 13px;
      color: #9ca3af;
      line-height: 1.55;
    }

    .story-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;

      margin-top: auto;
      margin-bottom: 14px;
    }

    .story-tag {
      padding: 2px 6px;

      font-size: 11px;
      color: #9ca3af;

      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }

    .story-action {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-top: 12px;

      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }

    .source-domain {
      font-size: 12px;
      color: var(--accent-cyan);
      font-weight: 500;
    }

    .open-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      font-size: 12px;
      font-weight: 600;
      color: #c7d2fe;

      transition: color 0.2s ease;
    }

    .story-card:hover .open-btn {
      color: #fff;
    }

    /* 푸터 */
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 8px;

      margin-top: 60px;
      padding-top: 30px;

      border-top: 1px solid var(--border-color);
      color: var(--text-dim);
      font-size: 13px;
    }

    @media (max-width: 1240px) {
      .bench-cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .recommend-box {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 24px 16px 60px;
      }
      .benchmark-section {
        padding: 20px 16px;
      }
      .bench-cards-grid {
        grid-template-columns: 1fr;
      }
      .recommend-box {
        grid-template-columns: 1fr;
      }
      .digest-grid {
        grid-template-columns: 1fr;
      }
      .story-grid {
        grid-template-columns: 1fr;
      }
      .filter-bar {
        flex-direction: column;
        align-items: stretch;
      }
      .search-box {
        width: 100%;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <!-- 헤더 -->
    <header class="header">
      <div class="badge-wrap">
        <span class="badge-dot"></span>
        <span>2026.08.30 — 2026.09.04 주간 브리핑</span>
      </div>
      <h1 class="main-title">AI & Tech Weekly Digest</h1>
      <p class="sub-title">
        OpenAI의 AGI 선언 모델 GPT-6 Astra 공개, Anthropic Claude Fable 5.1 및 Google Gemini 3.8 Flash 벤치마크 심층 분석부터 Nvidia의 129억 달러 Hugging Face 인수까지, 글로벌 AI 혁신의 최전선 뉴스를 엄선하여 전해드립니다.
      </p>
    </header>

    <!-- 5대 핵심 다이제스트 섹션 -->
    <section class="digest-section">
      <div class="section-header">
        <div class="section-title">
          Top 5 Key Highlights
          <span>주요 핵심 쟁점 심층 다이제스트</span>
        </div>
      </div>

      <div class="digest-grid">
        ${digests.map((d) => `
          <div class="digest-card" id="${d.id}">
            <div>
              <div class="digest-top">
                <span class="digest-tag">${d.tag}</span>
                <span class="digest-date">${d.date}</span>
              </div>
              <h2 class="digest-title">${d.title}</h2>
              <p class="digest-desc">${d.summary}</p>
              
              ${d.keyPoints ? `
                <ul class="digest-bullets">
                  ${d.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
                </ul>
              ` : ''}
            </div>

            <div class="digest-footer">
              ${d.secondaryLinkUrl ? `
                <a href="${d.secondaryLinkUrl}" target="_blank" rel="noopener noreferrer" class="link-btn-sub">
                  <span>${d.secondaryLinkText}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
                </a>
              ` : ''}
              <a href="${d.linkUrl}" target="_blank" rel="noopener noreferrer" class="link-btn">
                <span>${d.linkText}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
              </a>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ====================================================
         신규 특별 섹션: 4대 모델 벤치마크 쇼다운 (Benchmark Showdown)
         ==================================================== -->
    <section class="benchmark-section" id="benchmark-showdown">
      <div class="benchmark-header-wrap">
        <div class="bench-pill-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span>Exclusive Benchmark Showdown</span>
        </div>
        <h2 class="bench-main-title">Benchmark Showdown: 4대 프론티어 총출동</h2>
        <p class="bench-sub-desc">
          OpenAI가 AGI 시대를 선포한 <strong>GPT-6 Astra</strong>부터 <strong>Claude Fable 5.1</strong>, <strong>Gemini 3.8 Flash</strong>, <strong>GPT-5.6 Sol</strong>까지, 글로벌 독립 벤치마크(Artificial Analysis, ARC-AGI, ExploitBench, Terminal-Bench) 기반 종합 성능·속도·보안 스펙 격돌입니다.
        </p>
      </div>

      <!-- 4개 모델 스탠딩 카드 -->
      <div class="bench-cards-grid">
        <!-- 1. GPT-6 Astra (NEW) -->
        <div class="bench-model-card card-astra">
          <div>
            <div class="model-badge-row">
              <span class="model-maker">OpenAI · 2026.09.03</span>
              <span class="digest-tag" style="background: rgba(168, 85, 247, 0.25); color: #c084fc; border-color: rgba(192, 132, 252, 0.5);">AGI 플래그십</span>
            </div>
            <h3 class="model-card-title">GPT-6 Astra</h3>
            <p class="model-subtitle">자율 추론·Computer Use & 사이버보안 Critical</p>

            <div class="score-banner">
              <span class="score-num">Exploit 100%</span>
              <span class="score-label">ARC-AGI 62.7%~99.9% (Critical 등급)</span>
            </div>

            <ul class="model-features">
              <li>OpenAI 안전 프레임워크 최초 <strong>'Critical' 사이버 등급</strong> 도달</li>
              <li>화면 비전 인식과 OS 조작 결합 <strong>자율 Computer Use</strong></li>
              <li><strong>FrontierMath 97.6%</strong> & <strong>GPQA Diamond 96.0%</strong> 석권</li>
              <li>내부 사고 은닉(CoT) 방지를 위한 프로덕션 다중 안전 감시 탑재</li>
            </ul>
          </div>

          <div class="model-price-badge">
            배포: <strong>엔터프라이즈 / Daybreak 지원</strong> (수일 내 Plus/Pro 개방)
          </div>
        </div>

        <!-- 2. Claude Fable 5.1 -->
        <div class="bench-model-card card-fable">
          <div>
            <div class="model-badge-row">
              <span class="model-maker">Anthropic · 2026.09.01</span>
              <span class="digest-tag" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; border-color: rgba(245, 158, 11, 0.4);">에이전트 1위</span>
            </div>
            <h3 class="model-card-title">Claude Fable 5.1</h3>
            <p class="model-subtitle">장기 자율 에이전트 & 고난도 시스템 아키텍처</p>

            <div class="score-banner">
              <span class="score-num">66</span>
              <span class="score-label">Intelligence Index (독립 인덱스 최고점)</span>
            </div>

            <ul class="model-features">
              <li><strong>LongAgent-Bench 84.7%</strong>: 장기 에이전트 자율성 1위</li>
              <li>100단계 이상 복합 툴 체이닝 시 <strong>오탐률 42% 감소</strong></li>
              <li>대규모 코드베이스 전체 리팩토링 및 다단계 연구 최적화</li>
              <li><strong>1M 컨텍스트</strong> 내장 압축 및 자율 롤백 메커니즘 지원</li>
            </ul>
          </div>

          <div class="model-price-badge">
            비용: <strong>$10.00 / $50.00</strong> (1M 토큰당 · 프리미엄)
          </div>
        </div>

        <!-- 3. Gemini 3.8 Flash -->
        <div class="bench-model-card card-gemini">
          <div>
            <div class="model-badge-row">
              <span class="model-maker">Google · 2026.09.02</span>
              <span class="digest-tag" style="background: rgba(6, 182, 212, 0.2); color: #67e8f9; border-color: rgba(6, 182, 212, 0.4);">가성비 1위</span>
            </div>
            <h3 class="model-card-title">Gemini 3.8 Flash</h3>
            <p class="model-subtitle">초고속 에이전트 루프 & 1M 토큰 워크호스</p>

            <div class="score-banner">
              <span class="score-num">59</span>
              <span class="score-label">Intelligence Index (플래시 체급 파괴)</span>
            </div>

            <ul class="model-features">
              <li><strong>Terminal-Bench 2.1 90.8%</strong>: CLI 툴 제어 초고속 연계</li>
              <li><strong>TTFT ~140ms</strong>: 실시간 코드 자동완성에 완벽한 초저지연</li>
              <li>Fable 5.1 대비 <strong>1/13 수준의 파격적 비용</strong> (초고효율 루프)</li>
              <li><strong>1,000,000 토큰 Native</strong> 대용량 리포지토리 통째 분석</li>
            </ul>
          </div>

          <div class="model-price-badge">
            비용: <strong>$0.75 / $3.75</strong> (프로모션 · 정가 $1.50 / $7.50)
          </div>
        </div>

        <!-- 4. GPT-5.6 Sol -->
        <div class="bench-model-card card-gpt">
          <div>
            <div class="model-badge-row">
              <span class="model-maker">OpenAI · 2026.07</span>
              <span class="digest-tag" style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; border-color: rgba(16, 185, 129, 0.4);">멀티에이전트</span>
            </div>
            <h3 class="model-card-title">GPT-5.6 Sol</h3>
            <p class="model-subtitle">균형 잡힌 기업용 멀티에이전트 오케스트레이션</p>

            <div class="score-banner">
              <span class="score-num">61</span>
              <span class="score-label">Intelligence Index (안정적 밸런스)</span>
            </div>

            <ul class="model-features">
              <li>단일 환경 내 복수 <strong>하위 서브에이전트 조율 프리미티브</strong> 내장</li>
              <li>DeepSWE / Agentic Code 상위권의 안정적 추론 성능</li>
              <li>다양한 도메인(법률, 재무, 코딩)에서 검증된 균형 잡힌 정확도</li>
              <li>기업용 기존 OpenAI API 파이프라인과 완벽한 하위 호환성</li>
            </ul>
          </div>

          <div class="model-price-badge">
            비용: <strong>$3.50 / $14.00</strong> (1M 토큰당 · 중간 가격대)
          </div>
        </div>
      </div>

      <!-- 상세 스펙 매트릭스 테이블 (4개 모델 컬럼) -->
      <div class="bench-table-container">
        <table class="bench-matrix-table">
          <thead>
            <tr>
              <th>평가 지표</th>
              <th>GPT-6 Astra (OpenAI)</th>
              <th>Claude Fable 5.1 (Anthropic)</th>
              <th>Gemini 3.8 Flash (Google)</th>
              <th>GPT-5.6 Sol (OpenAI)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="metric-name">종합 지능 / AGI 지표</td>
              <td><strong style="color: #c084fc;">ARC-AGI 62.7%~99.9%</strong></td>
              <td><strong style="color: #fbbf24;">Intelligence Index ~66</strong></td>
              <td><strong style="color: #67e8f9;">Intelligence Index ~59</strong></td>
              <td><strong style="color: #6ee7b7;">Intelligence Index ~61</strong></td>
            </tr>
            <tr>
              <td class="metric-name">핵심 특화 벤치마크</td>
              <td><strong style="color: #c084fc;">ExploitBench 100%</strong> / Math 97.6%</td>
              <td>LongAgent-Bench <strong>84.7%</strong></td>
              <td>Terminal-Bench 2.1 <strong>90.8%</strong></td>
              <td>DeepSWE v1.1 최상위권</td>
            </tr>
            <tr>
              <td class="metric-name">사이버보안 위험 등급</td>
              <td><strong style="color: #ef4444;">Critical (역대 최초 도달)</strong></td>
              <td>Standard / High</td>
              <td>Standard</td>
              <td>High</td>
            </tr>
            <tr>
              <td class="metric-name">초기 응답 지연 (TTFT)</td>
              <td>~350ms (자율 심층추론 연계)</td>
              <td>~420ms (장기 에이전트 모드)</td>
              <td><strong style="color: #67e8f9;">~140ms (초저지연)</strong></td>
              <td>~280ms (표준)</td>
            </tr>
            <tr>
              <td class="metric-name">최대 컨텍스트 윈도우</td>
              <td>1,000,000+ 토큰 (멀티모달 통합)</td>
              <td>1,000,000 토큰 (1M)</td>
              <td>1,000,000 토큰 (1M Native)</td>
              <td>256K ~ 512K 토큰</td>
            </tr>
            <tr>
              <td class="metric-name">입력/출력 API 비용 (1M)</td>
              <td>엔터프라이즈 프리뷰 (Daybreak 연계)</td>
              <td>$10.00 / $50.00 (프리미엄)</td>
              <td><strong style="color: #67e8f9;">$0.75 / $3.75 (극강 가성비)</strong></td>
              <td>$3.50 / $14.00 (중간)</td>
            </tr>
            <tr>
              <td class="metric-name">컴퓨터 조작 (Computer Use)</td>
              <td><strong style="color: #c084fc;">OS 네이티브 자율 조작 지원</strong></td>
              <td>도구 호출 및 브라우징 지원</td>
              <td>API / Terminal 툴 제어 최적화</td>
              <td>멀티에이전트 함수 호출 지원</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 시나리오별 권장 가이드 (4열) -->
      <div class="recommend-box">
        <div class="rec-item rec-astra">
          <div class="rec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>GPT-6 Astra 추천 시나리오</span>
          </div>
          <p class="rec-desc">
            미지의 보안 취약점 사전 방어, OS 화면을 직접 보고 제어하는 자율 컴퓨터 조작(Computer Use), 최고난도 수학·과학 연구 과제.
          </p>
        </div>

        <div class="rec-item rec-fable">
          <div class="rec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>Claude Fable 5.1 추천 시나리오</span>
          </div>
          <p class="rec-desc">
            대규모 리포지토리 전면 리팩토링, 실패 비용이 치명적인 핵심 인프라 코드 작성, 100단계 이상 연속 툴 체이닝 장기 에이전트.
          </p>
        </div>

        <div class="rec-item rec-gemini">
          <div class="rec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>Gemini 3.8 Flash 추천 시나리오</span>
          </div>
          <p class="rec-desc">
            IDE 실시간 코드 인라인 자동완성, 수만 번 반복되는 고속 테스트 루프, 100만 토큰 대용량 문서 고속 분석, 비용 절감 최우선 과제.
          </p>
        </div>

        <div class="rec-item rec-gpt">
          <div class="rec-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>GPT-5.6 Sol 추천 시나리오</span>
          </div>
          <p class="rec-desc">
            여러 도메인의 하위 에이전트를 통합 제어하는 복합 오케스트레이션 파이프라인, 기업용 범용 업무 워크플로우.
          </p>
        </div>
      </div>
    </section>

    <!-- 25개 기사 목록 섹션 -->
    <section class="stories-section">
      <div class="section-header">
        <div class="section-title">
          Curated Stories
          <span>주간 주요 테크 뉴스 피드</span>
        </div>
      </div>

      <!-- 카테고리 필터 및 검색 바 -->
      <div class="filter-bar">
        <div class="category-pills" id="categoryPills">
          <button class="pill-btn active" data-cat="all">전체보기 (25)</button>
          <button class="pill-btn" data-cat="frontier">프론티어/LLM</button>
          <button class="pill-btn" data-cat="benchmark">벤치마크/에이전트</button>
          <button class="pill-btn" data-cat="devtool">개발도구/생태계</button>
          <button class="pill-btn" data-cat="bigdeal">빅딜/투자</button>
          <button class="pill-btn" data-cat="hardware">하드웨어/인프라</button>
          <button class="pill-btn" data-cat="policy">정책/보안</button>
        </div>
        <input type="text" id="searchInput" class="search-box" placeholder="기사 제목 또는 태그 검색...">
      </div>

      <!-- 기사 카드 그리드 -->
      <div class="story-grid" id="storyGrid"></div>
    </section>

    <!-- 푸터 -->
    <footer class="footer">
      <p>© 2026 AI News. Curated weekly tech digest.</p>
      <p>2026.08.30 — 2026.09.04</p>
    </footer>
  </div>

  <script>
    const storiesData = ${JSON.stringify(verifiedArticles)};

    const grid = document.getElementById('storyGrid');
    const searchInput = document.getElementById('searchInput');
    const pills = document.querySelectorAll('.pill-btn');

    let currentCat = 'all';
    let currentSearch = '';

    function getDomain(url) {
      try {
        return new URL(url).hostname.replace('www.', '');
      } catch (e) {
        return 'link';
      }
    }

    function matchesCategory(storyCat, filterCat) {
      if (filterCat === 'all') return true;
      if (filterCat === 'frontier') return storyCat.includes('프론티어') || storyCat.includes('LLM') || storyCat.includes('MoE');
      if (filterCat === 'benchmark') return storyCat.includes('벤치마크') || storyCat.includes('에이전트');
      if (filterCat === 'devtool') return storyCat.includes('개발도구') || storyCat.includes('생태계');
      if (filterCat === 'bigdeal') return storyCat.includes('빅딜') || storyCat.includes('투자') || storyCat.includes('인수');
      if (filterCat === 'hardware') return storyCat.includes('하드웨어') || storyCat.includes('인프라') || storyCat.includes('PC') || storyCat.includes('스마트홈') || storyCat.includes('웨어러블');
      if (filterCat === 'policy') return storyCat.includes('정책') || storyCat.includes('보안') || storyCat.includes('규제') || storyCat.includes('무역');
      return true;
    }

    function renderStories() {
      grid.innerHTML = '';

      const filtered = storiesData.filter(s => {
        const catMatch = matchesCategory(s.category, currentCat);
        const searchMatch = !currentSearch || 
          s.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
          s.summary.toLowerCase().includes(currentSearch.toLowerCase()) ||
          s.tags.some(t => t.toLowerCase().includes(currentSearch.toLowerCase()));
        return catMatch && searchMatch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div style=\"grid-column: 1/-1; text-align: center; padding: 60px 0; color: #9ca3af;\">검색 조건에 일치하는 기사가 없습니다.</div>';
        return;
      }

      filtered.forEach((s) => {
        const card = document.createElement('a');
        card.className = 'story-card';
        card.href = s.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.setAttribute('aria-label', s.title);
        card.innerHTML = \`
          <div class=\"story-thumb-wrap\">
            <img src=\"\${s.thumbnail}\" alt=\"\${s.title}\" class=\"story-thumb\" loading=\"lazy\">
          </div>
          <div class=\"story-body\">
            <div class=\"story-meta\">
              <span class=\"story-cat\">\${s.category}</span>
              <span class=\"story-date\">\${s.date}</span>
            </div>
            <h3 class=\"story-title\">\${s.title}</h3>
            <p class=\"story-summary\">\${s.summary}</p>
            <div class=\"story-tags\">
              \${s.tags.map(t => \`<span class=\"story-tag\">#\${t}</span>\`).join('')}
            </div>
            <div class=\"story-action\">
              <span class=\"source-domain\">\${getDomain(s.url)}</span>
              <span class=\"open-btn\">
                <span>원문 기사</span>
                <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><path d=\"M7 17l9.2-9.2M17 17V8H8\"/></svg>
              </span>
            </div>
          </div>
        \`;

        grid.appendChild(card);
      });
    }

    // 필터 탭 클릭
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCat = pill.dataset.cat;
        renderStories();
      });
    });

    // 검색 입력
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim();
      renderStories();
    });

    // 초기 렌더링
    renderStories();
  </script>
</body>
</html>
`;

fs.writeFileSync('public/news/ai-news-digest-0830-0904.html', html, 'utf8');
console.log('Successfully updated public/news/ai-news-digest-0830-0904.html with GPT-6 Astra benchmark column and highlighted story!');
