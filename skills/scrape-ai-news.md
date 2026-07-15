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
- **Reuters**: https://reuters.com (통신사, 🔴 Playwright 필요 — 봇 차단)

한국:

- **AI타임즈**: https://www.aitimes.com (AI 전문 매체, 링크 다수)
- **AI포스트**: https://www.aipostkorea.com/ (AI 전문 매체, 링크 다수)
- **Geeknews**: https://news.hada.io/ (한국어 IT 뉴스 큐레이션, AI 관련 글 선별)

### 보조 소스 (사용자 요구 또는 시간 여유 시 추가, 2차 병렬 그룹)

#### Playwright 전용 소스 (JS 렌더링·봇 차단 우회 필요)

이 소스들은 일반 `webfetch`로는 접근할 수 없으며, **Playwright**로만 스크래핑 가능하다. 2단계 이후 별도 Playwright 스크래핑 단계에서 처리한다.

- **xAI (SpaceXAI)**: https://x.ai/news (🔴 Cloudflare 보호막 — **headed 모드 필수**)
  - 머스크의 xAI 공식 뉴스룸. Grok 모델 발표·기능 업데이트·파트너십 소식. 사이트 구조가 단순해 Playwright headed 모드로만 접근 가능.
- **Reuters AI**: https://www.reuters.com/technology/artificial-intelligence/ (🔴 봇 차단 — headless 가능)
  - 통신사 AI 섹션. 401 차단이지만 headless Playwright로 우회 가능. og:image 수집도 가능해짐.
- **MIT Technology Review**: https://www.technologyreview.com/topic/artificial-intelligence/ (🔴 JS 렌더링 — headless 가능, `waitUntil: "load"`)
  - AI 심층 분석·특집. 날짜는 `article:published_time` 메타태그가 없으므로 **URL 패턴**(`/YYYY/MM/DD/`)에서 추출.
- **The Information**: https://theinformation.com (🔴 봇 차단 — headless 가능, 일부 페이월)
  - 업계 내부·단독 보도. 403 차단이지만 Playwright로 우회 가능. 일부 기사는 페이월.

#### webfetch 호환 보조 소스

해외:

해외:

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
- MIT Technology Review가 JavaScript 필요로 실패하면, Playwright로 우회 가능 (2-B단계 참고).
- 보조 소스는 핵심 소스 응답 부족·사용자 요구 있을 때 2차 병렬 그룹으로 추가 수집. 한국 매체(전자신문·ZDNet 등)는 한국 기업·정책 이슈가 풍부할 때 우선 추가.

### 2-B단계: Playwright 소스 스크래핑 → 검증: 각 소스별 5건 이상 기사 확보

`webfetch`로 접근 불가능한 4개 소스(xAI, Reuters, MIT Technology Review, The Information)는 Playwright로 스크래핑한다. `temp/scrape-playwright.mjs` 파일을 생성해 일괄 처리한다.

**소스별 접근법:**

| 소스 | headless | 비고 |
|------|----------|------|
| **xAI** | ❌ Cloudflare | **headed 필수** (`headless: false`). Windows에서는 바로 실행, Linux는 `xvfb-run` 필요 |
| **Reuters** | ✅ | `waitUntil: "load"`, timeout 30s |
| **MIT TR** | ✅ | `waitUntil: "load"` 필수 (`networkidle` 타임아웃). **날짜는 URL 패턴에서 추출** (`/YYYY/MM/DD/`) |
| **The Information** | ✅ | `waitUntil: "load"`, timeout 30s. 일부 기사 페이월 |

**Playwright 설치 (최초 1회):**
```bash
npx playwright install chromium
```

**MIT Technology Review 날짜 추출 특이사항:**
- `article:published_time` 메타태그가 없음
- URL 패턴(`https://www.technologyreview.com/2026/07/14/...`)에서 `/YYYY/MM/DD/` 정규식으로 날짜 추출
- 페이지 텍스트에도 "July 14, 2026" 형태로 날짜가 포함됨

**추출할 데이터:**
- 제목 (`og:title` 또는 `document.title`)
- URL (절대경로로 변환)
- 날짜 (메타태그 `article:published_time` 또는 URL 패턴 추출)
- og:image (`<meta property="og:image">`)
- 요약 (`og:description`)

**결과 처리:**
- JSON으로 저장 후 4단계 md 작성 시 통합
- 중복 기사(다른 소스와 동일 이슈)는 가장 대표 소스에 배치
- Playwright 소스 수집 실패 시 "수집 제한 안내"에 기록

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
- **기사 제목** [링크](https://...) | ![thumb](og:image URL)
  - 기사 설명...
## 주요 논문 (ArXiv)
| 논문 | 요약 |
## 주요 흐름 분석 (5개 테마)
## 수집 제한 안내
```

- 각 기사는 **제목 + 링크 + 썸네일** 형식. 썸네일은 `![thumb](URL)` 형식으로 링크 뒤에 추가.
- 썸네일 수집이 불가능한 기사는 제목+링크만 표기.
- 중복 기사(여러 소스에서 같은 이슈)는 가장 대표적인 소스 한 곳에 배치하고, 다른 섹션에서는 "(상세 요약은 X/Y 섹션 참고)"로 참조.

### 5단계: 썸네일 수집 → 검증: 각 기사별 og:image 원본 URL 확보 (Node.js 스크립트 방식)

기사 제목과 링크만으로는 시각적 정보가 부족하므로, 각 기사 페이지에서 og:image를 추출해 md에 추가한다. **해상도 suffix를 변경하거나 URL을 임의로 조작하지 않고, 페이지에 명시된 원본 URL을 그대로 사용**하는 것이 핵심이다.

**수집 방식 원칙:**

- OpenAI 등 메인 소스의 기사는 4단계 md 작성 중 `webfetch`로 og:image를 직접 수집한다.
- 나머지 모든 기사는 **Node.js `.mjs` 스크립트로 일괄 수집**한다. `webfetch`를 한땀한땀 호출하는 것보다 수십 배 빠르다.

**Node.js 스크립트 수집 절차:**

1. `temp/fetch-thumbnails.mjs` 생성 (아래 템플릿 참고)
2. `node temp/fetch-thumbnails.mjs` 실행
3. 결과 JSON 확인 후 `temp/apply-thumbnails.mjs`로 md에 일괄 적용
4. 모든 `.mjs`, `.json` 임시 파일 즉시 삭제
5. 최종 확보율 확인 (`node -e "...match(/\!\[thumb\]/g)..."`)

**fetch-thumbnails.mjs 템플릿:**

```js
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MD = join(__dirname, "ai-news-YYYY-MM-DD-onwards.md");

const text = readFileSync(MD, "utf-8");
const urls = [];
for (const line of text.split("\n")) {
  const m = line.match(/\[링크\]\((https:\/\/[^)]+)\)/);
  if (!m) continue;
  const after = line.slice(m.index + m[0].length);
  if (/!\[thumb\]/.test(after)) continue; // 이미 썸네일 있으면 건너뜀
  urls.push(m[1]);
}

console.log(`수집 대상: ${urls.length}건`);

const CONCURRENCY = 10;
const results = [];

async function fetchOg(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)" },
      signal: AbortSignal.timeout(20_000),
    });
    const html = await res.text();
    const og = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
    if (og) return og[1].replace(/&amp;/g, "&");
    const tw = html.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"/i);
    if (tw) return tw[1].replace(/&amp;/g, "&");
    return null;
  } catch { return null; }
}

async function run() {
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(batch.map(async (url) => {
      const og = await fetchOg(url);
      console.log(`${og ? "OK" : "X "} ${url.slice(0, 60)}`);
      return { url, ogImage: og };
    }));
    results.push(...batchResults);
    await new Promise((r) => setTimeout(r, 500)); // 배치 간 500ms 간격
  }

  writeFileSync(join(__dirname, "thumbnails-result.json"), JSON.stringify(results, null, 2));
  const hit = results.filter((r) => r.ogImage).length;
  console.log(`\n${hit}/${urls.length}건 확보 → thumbnails-result.json`);
}

run();
```

**apply-thumbnails.mjs 템플릿:**

```js
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MD = join(__dirname, "ai-news-YYYY-MM-DD-onwards.md");
const JSON_FILE = join(__dirname, "thumbnails-result.json");

const text = readFileSync(MD, "utf-8");
const results = JSON.parse(readFileSync(JSON_FILE, "utf-8"));

let updated = text;
let added = 0;
for (const r of results) {
  if (!r.ogImage) continue;
  const escaped = r.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(\\[링크\\]\\(${escaped}\\))(?![^\\n]*!\\[thumb\\])`, "g");
  const before = updated;
  updated = updated.replace(re, `$1 | ![thumb](${r.ogImage})`);
  if (updated !== before) added++;
}

writeFileSync(MD, updated, "utf-8");
console.log(`${added}건 썸네일 추가 완료`);
```

**소스별 og:image CDN 패턴:**

| 소스 | og:image CDN | 비고 |
|------|-------------|------|
| **AI타임즈** | `https://cdn.aitimes.com/news/photo/YYYYMM/IDXNO_HASH_ID.ext` | **반드시 개별 기사 페이지를 fetch**할 것. 목록 페이지의 `thumbnail/custom/` 경로는 썸네일 크기가 작고 해상도 suffix가 붙어 있음. 개별 페이지의 `og:image`는 원본 해상도. |
| **VentureBeat** | `https://images.ctfassets.net/...` | HTML 포맷으로 fetch하면 `<head>`에 og:image가 포함됨. markdown 포맷으로는 추출 불가. |
| **TechCrunch** | `https://techcrunch.com/wp-content/uploads/...` | 일부 기사는 JS 동적 로딩으로 og:image가 TC 로고로 fallback될 수 있음. |
| **The Verge** | `https://platform.theverge.com/wp-content/uploads/...` | 오피니언·컬럼 기사는 placeholder 이미지가 og:image로 설정된 경우 있음. |
| **NVIDIA 블로그** | `https://blogs.nvidia.com/wp-content/uploads/...` | Yoast SEO 플러그인으로 og:image가 명확히 설정됨. |
| **Hugging Face** | `https://cdn-uploads.huggingface.co/...` 또는 `https://huggingface.co/front/thumbnails/...` | 커뮤니티 글은 작성자 업로드 이미지, 공식 글은 CDN 썸네일. |
| **Anthropic** | `https://cdn.sanity.io/images/...` 또는 `https://www-cdn.anthropic.com/...` | Sanity CMS 기반. 일부는 OpenGraph API(`/api/opengraph-illustration`) 사용. |
| **AI포스트** | `https://cdn.aipostkorea.com/news/photo/YYYYMM/IDXNO_HASH_ID.ext` | AI타임즈와 유사한 CDN 구조. 개별 기사 페이지 fetch 필요. |
| **GitHub** | `https://opengraph.githubassets.com/...` | 레포지토리·이슈 등 og:image 자동 생성. |
| **Meta AI 블로그** | `https://scontent-*.xx.fbcdn.net/...` | Facebook CDN. 용량 큼. |

**AI타임즈 특별 주의사항:**

- AI타임즈는 **두 가지 CDN 경로**가 존재한다:
  - `https://cdn.aitimes.com/news/thumbnail/custom/...` — 목록 페이지용 저해상도 썸네일 (사용 금지)
  - `https://cdn.aitimes.com/news/photo/...` — 개별 기사 페이지의 원본 og:image (이것을 사용)
- `thumbnail/custom/` URL의 해상도 suffix(`_600`, `_250` 등)를 변경하거나 `news/photo/` 경로를 유추해서 조합하지 말 것. 해시값이 서로 달라 링크가 깨진다.
- **반드시 각 기사 페이지를 직접 fetch해서 `<meta property="og:image">` 값을 그대로 사용**한다.

**md 파일에 썸네일 추가 형식:**

```
- **기사 제목** [링크](https://...) | ![thumb](https://cdn...og이미지.jpg)
  - 기사 설명...
```

**썸네일 수집이 불가능한 경우:**

- JS 렌더링이 필요한 사이트 (MIT Technology Review 등)
- og:image가 아예 없는 텍스트 전용 기사
- fetch가 차단된 사이트

이 경우 썸네일 없이 제목+링크만 유지하고, "수집 제한 안내"에 해당 사실을 기록한다.

### 6단계: 한글 번역 → 검증: 영어 제목·설명·카테고리 없음

- 영어 제목, 영어 설명문, 영어 카테고리("Security", "Models", "Responsibility & Safety", "Company", "points" 등)를 모두 한글로 번역.
- 유지할 것: 고유명사(OpenAI, Claude, GLM-5.2, Jalapeño 등), 기술 용어(LLM, AI, ERP, CPU, IPO, SPAC, SaaS 등), 사람 이름, 회사명, 제품명.
- AGENTS.md "한글 표시" 규칙 준수.

### 7단계(옵션): 핵심 기사 내용 요약 → 검증: 요약이 사실 기반

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
- **Playwright 소스**(xAI, Reuters, MIT TR, The Information)는 `webfetch`로 접근 불가 → `temp/scrape-playwright.mjs` 스크립트로 별도 처리.
  - xAI는 Cloudflare 보호막 때문에 **반드시 headed 모드** (`headless: false`) 사용.
  - MIT TR은 `article:published_time` 메타태그 없음 → URL 패턴(`/YYYY/MM/DD/`)에서 날짜 추출.
  - Playwright 스크립트도 사용 완료 후 **즉시 삭제**할 것.
- ArXiv 전체(1,300건+)를 요약하려 하지 말 것 — 주요 선별만.
- SemiAnalysis 본문은 페이월 — 헤드라인·요약만 수집, 본문 요약 시도 금지.
- The Batch는 주간 단위 발행 — 날짜 정밀 필터링 대신 주 단위로 포함 여부 판단.
- NVIDIA 블로그·Google AI 블로그(blog.google)는 DeepMind와 별개 소스 — Google 계열 중복 주의.
- 한국 매체는 한국 기업·정책 이슈가 있을 때만 추가 수집 — 무조건 전체 소스 돌리지 말 것.
- 자동으로 commit하지 말 것. 사용자가 명시적으로 요구할 때만.
- 파일 덮어쓰기 전에 반드시 Read 도구로 기존 내용 확인.
- "수집 제한 안내" 섹션에 실패한 소스·페이월 소스·선별 기준·날짜 불확정 항목을 투명하게 기록.
- 소스 검증 이력·후보 목록은 작업 디렉토리의 `ai-news-sources.md`가 있으면 우선 참고·갱신.
- **임시 파일 정리**: 스크랩 과정에서 생성한 `.mjs`, `.json` 등 임시 스크립트·데이터 파일은 사용 완료 후 **즉시 삭제**한다. 최종 결과물(md 파일)만 남기고 모두 정리할 것.

## 파일 저장 위치

기본: 작업 디렉토리 루트에 `ai-news-YYYY-MM-DD-onwards.md` 생성 후, 최종적으로 `{root}/temp/` 폴더로 이동하여 보관한다. `temp/` 폴더가 없으면 생성한다.
사용자가 별도 경로 요구하면 그 경로 사용.
