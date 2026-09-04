# HTML AI 뉴스레터 작성 가이드

> 이 문서는 `temp/ai-news-2026-08-16-onwards.md`를 기반으로 독립형 HTML 뉴스레터를 작성하는 표준 방법을 정리한 문서다.
>
> **기본 HTML 샘플/템플릿**: [`HTML_NEWLETTER_SAMPLE.html`](HTML_NEWLETTER_SAMPLE.html) (뉴스레터 제작 시 이 파일의 UI/UX 디자인, 컴포넌트 마크업, CSS 스타일 및 스크립트 구조를 기본 템플릿으로 참고한다.)
>
> 최종 HTML 경로 규칙: `public/news/ai-news-digest-MMDD-MMDD.html`

## 1. 목표

- 뉴스레터 제작 시 기본 HTML 구조 및 디자인 템플릿으로 [`HTML_NEWLETTER_SAMPLE.html`](HTML_NEWLETTER_SAMPLE.html)을 참고하여 구현한다.
- 과도한 브랜딩(NEXUS, SIGNAL, Intelligence 등)이나 **'실물 검증', '100% 검증'과 같은 내부 작업 수식어를 일체 배제**하고 직관적이고 담백한 `AI News` 헤더를 사용한다.
- **중간 팝업(모달) 제거 및 원문 직행**: 기사 카드를 클릭했을 때 중간 상세 팝업 창을 띄우지 않고, **새 탭(`target="_blank" rel="noopener noreferrer"`)에서 즉시 원문 기사 페이지로 바로 이동**하도록 구현한다.
- 뉴스 Markdown의 제목·요약·출처·썸네일을 하나의 독립 HTML에 담는다.
- 최종 HTML 파일은 반드시 `public/news/` 폴더에 `ai-news-digest-MMDD-MMDD.html` 형식으로 생성/배치한다.
- 첫 화면은 광고나 과장된 hero 대신 편집자가 정리한 요약본처럼 직관적으로 구성한다.
- 핵심 흐름 5개를 먼저 보여주고, 주요 모델 격돌 시 **독립된 "Benchmark Showdown (벤치마크)" 섹션**을 미려한 카드와 매트릭스 표로 제공한다.
- 전체 기사는 검색·필터 가능한 아카이브 그리드로 제공하며, 기사 수는 고정 제한 없이 기간 내 보도량에 따라 유동적으로 조절한다(20~40건 이상).
- 썸네일은 외부 이미지 URL 대신 HTML 내부의 base64 WebP/JPEG로 포함하여 단일 파일로 완전 독립 실행(Standalone)되게 한다.
- 데스크톱과 모바일 모두에서 가로 스크롤 없이 읽을 수 있게 한다.

## 2. 기본 구성 요소

| 구분 | 적용 원칙 |
|---|---|
| 기준 샘플 | [`HTML_NEWLETTER_SAMPLE.html`](HTML_NEWLETTER_SAMPLE.html) 구조 및 스타일 참고 |
| 파일 위치 및 명명 | `public/news/ai-news-digest-MMDD-MMDD.html` (예: `public/news/ai-news-digest-0816-0821.html`) |
| 브랜딩 | `AI News` (NEXUS, SIGNAL, Intelligence, 실물 검증 등 과시적 수식어 전면 배제) |
| 상단 메타 | 수집 날짜 범위만 간결하게 표시 (`YYYY.MM.DD — MM.DD 주간 브리핑`) |
| 첫 화면 요약 | 5개 핵심 흐름 (수치, 맥락, 대표 기사 링크) |
| 특별 벤치마크 섹션 | 주요 프론티어 모델 비교 시 독립 섹션(시그니처 카드, 매트릭스 테이블, 추천 가이드) 구성 |
| 전체 기사 그리드 | 검색/필터 가능한 기사 카드 그리드 (카드 클릭 시 새 탭에서 원문 기사로 직행, 모달 없음) |
| 기사 수 유연성 | 20~25건을 표준 기준으로 하되, 기간 내 보도량에 따라 30~40건 이상 유연하게 확장 가능 |
| 검색 및 필터 | 카테고리별 필터 버튼 및 실시간 텍스트 검색 |
| 썸네일 | Playwright로 수집한 최대 640px WebP/JPEG base64 인라인 임베딩 (깨짐 없는 Standalone) |
| 폰트 | Pretendard 단일 폰트 적용 (mono 폰트 금지) |
| 하단 푸터 | 데이터 기준일 및 출처 안내만 간결하게 표기 (불필요한 검증 문구 배제) |

## 3. 전체 작성 순서

### 3.1 Markdown 구조 읽기

원본 Markdown에서 다음 정보를 추출한다.

- 날짜 섹션
- 기사 제목
- 기사 링크
- 기사 요약
- 대표 출처
- 반복 보도 여부
- 썸네일 URL
- 중요 뉴스 여부

원본 기사는 HTML JavaScript의 `stories` 배열로 옮긴다.

```js
{
  id: "story-01",
  date: "08.16",
  source: "TechCrunch",
  category: "비즈니스",
  tags: ["인수", "인프라", "API"],
  important: true,
  coverage: "다수 매체 보도",
  title: "Stripe, AI 게이트웨이 스타트업 OpenRouter 75억 달러 인수 추진",
  summary: "기사의 핵심 사실을 1~2문장으로 요약한다.",
  image: "data:image/webp;base64,...",
  url: "https://원문-기사-주소"
}
```

`important`는 원본 Markdown의 `⭐ 중요 뉴스` 기준을 그대로 반영한다. `coverage`에는 반복 확인된 출처 수나 보도 성격을 넣는다.

### 3.2 편집 흐름 결정

HTML은 다음 순서로 읽힌다.

1. 상단 `AI News` 브랜드와 기간 표시
2. `이번 브리핑의 핵심` 헤더
3. 5개 핵심 흐름의 상세 요약 (`briefing-digest`)
4. 상위 핵심 기사 리드 카드
5. 전체 기사 아카이브 그리드
6. 필터·검색 영역
7. 페이지 하단 간결한 출처 문구

과장된 hero, 복잡한 사이드바(`SIGNAL INDEX`), 미사여구(`READING PROTOCOL`, `Intelligence Briefing`)는 일체 사용하지 않는다.

## 4. 최종 HTML 구조

```html
<body>
  <a class="skip-link" href="#main-content">본문으로 이동</a>
  <div class="page-shell">
    <header class="topbar">
      <div class="brand">AI News</div>
      <div class="topbar-meta">2026.08.30 — 09.04 주간 브리핑</div>
    </header>
    <main id="main-content">
      <section class="briefing-intro">브리핑 제목·요약</section>
      <section class="briefing-digest">5개 핵심 흐름 요약</section>
      <!-- 주요 모델 출시 시 벤치마크 쇼다운 섹션 추가 -->
      <section class="benchmark-section" id="benchmark-showdown">
        3대 모델 스탠딩 카드 + 종합 매트릭스 표 + 시나리오별 권장 가이드
      </section>
      <section class="section" id="stories">
        <div class="control-row">필터·검색</div>
        <div class="story-grid" id="storyGrid"></div>
      </section>
    </main>
    <footer class="footer">데이터 기준일·출처 안내 (담백한 문구)</footer>
  </div>
</body>
```

### 4.1 브리핑 헤더

`briefing-intro`는 군더더기 없이 사실 중심의 정보를 전달한다.

- 소제목: `주간 AI 뉴스 브리핑`
- 제목: `이번 브리핑의 5대 핵심 흐름`
- 통계/날짜: 기간 내 주요 이슈의 핵심 방향을 2~3문장으로 간략히 안내
- **금지**: '실물 검증', '100% 검증' 등 내부 작업이나 과시적 수식어는 헤더/뱃지에 일체 포함하지 않는다.

### 4.2 5개 핵심 요약

`briefing-digest`는 기사 목록보다 먼저 읽는 편집 요약이다. 각 항목은 다음 요소를 포함한다.

- 번호 (`01`~`05`)
- 카테고리 태그
- 핵심 제목
- 2~3문장의 맥락 요약
- 핵심 수치/사실 불릿 포인트
- 대표 기사 원문 링크

### 4.3 벤치마크 쇼다운 섹션 (Benchmark Showdown)

신규 주요 모델이 발표되거나 주요 벤치마크 격돌이 있는 주차에는 독립 섹션을 구성한다.

1. **상단 3개 모델 시그니처 카드**:
   - 모델별 브랜드 컬러 (Anthropic 앰버/골드, Google 시안/블루, OpenAI 에메랄드 등)
   - 대형 Intelligence Index 점수 배너
   - 주요 벤치마크(LongAgent-Bench, Terminal-Bench 등) 핵심 수치 불릿
   - 토큰당 비용 뱃지
2. **종합 벤치마크 매트릭스 테이블**:
   - 지능 지수, 벤치 점수, 초기 지연(TTFT), 컨텍스트 윈도우, API 비용, 개발도구(GitHub Copilot 등) 지원 현황을 1:1 대조하는 글래스모피즘 표
3. **시나리오별 권장 가이드**:
   - 실무 개발자 관점에서 어떤 작업에 어떤 모델이 최적인지 명확한 불릿 가이드 제공

## 5. 기사 카드 렌더링 및 직접 링크 규칙

### 5.1 중간 팝업(모달) 절대 금지 & 즉시 원문 직행
- **중간 상세 모달(Modal) 창은 사용자 경험을 저해하므로 절대 사용하지 않는다.**
- 기사 카드는 전체를 `<a>` 태그로 구성하거나 클릭 이벤트로 감싸, **사용자가 카드 어디를 클릭하든 새 탭(`target="_blank" rel="noopener noreferrer"`)에서 해당 기사의 원문 웹페이지로 즉시 열리도록** 구현한다.
- 썸네일 이미지 및 타이틀 모두 원문 링크로 즉시 직행해야 한다.

### 5.2 카드 마크업 구조

```html
<a class="story-card" href="${story.url}" target="_blank" rel="noopener noreferrer" aria-label="${story.title}">
  <div class="story-thumb-wrap">
    <img src="${story.thumbnail}" alt="${story.title}" class="story-thumb" loading="lazy">
  </div>
  <div class="story-body">
    <div class="story-meta">
      <span class="story-cat">${story.category}</span>
      <span class="story-date">${story.date}</span>
    </div>
    <h3 class="story-title">${story.title}</h3>
    <p class="story-summary">${story.summary}</p>
    <div class="story-tags">
      ${story.tags.map(t => `<span class="story-tag">#${t}</span>`).join('')}
    </div>
    <div class="story-action">
      <span class="source-domain">${getDomain(story.url)}</span>
      <span class="open-btn">
        <span>원문 기사</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
      </span>
    </div>
  </div>
</a>
```

### 5.3 필터·검색

- `all`: 전체보기
- `important`: ⭐ 중요 뉴스
- `안전`: 안전·보안
- `도구`: 개발·도구
- `인프라`: 인프라·하드웨어
- `비즈니스`: 비즈니스·인수
- `정책`: 정책·규제

검색어는 제목, 요약, 출처, 카테고리, 태그를 합친 문자열에서 검색한다.

## 6. 디자인 및 CSS 작성 규칙

### 6.1 시각 테마

- 배경: 다크 네이비 `#071013`
- 패널: `#0c171a`, 하이라이트 패널 `#101f22`
- 주 강조색: 시안 `#70f0d1`
- 보조 강조색: 앰버 `#ffbd6b`
- 과도한 네온/발광 효과를 지양하고 텍스트 가독성을 최우선으로 한다.

### 6.2 Pretendard 적용

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css">
```

모든 텍스트 요소는 Pretendard를 사용하며 monospace 계열 폰트 선언은 사용하지 않는다.

### 6.3 CSS 속성 순서 (`AGENTS.md` 규칙)

1. flex·grid·align·justify·gap 등 레이아웃
2. 빈 줄
3. position·top·left·right·bottom·inset 등
4. 빈 줄
5. width·height 관련 등 사이즈
6. padding·margin 관련 등 영역
7. 빈 줄
8. font 관련
9. background 관련
10. border·color·transition 등 나머지

### 6.4 반응형 기준

- 기본: 최대 1440px 중앙 정렬
- `1040px 이하`: 아카이브 2열
- `720px 이하`: 카드 1열, 통계 세로 정렬
- 모바일(390px)에서도 가로 스크롤이 전혀 발생하지 않아야 한다.

## 7. 썸네일 수집 및 base64 인코딩 절차

1. Playwright를 사용해 기사 웹페이지를 직접 방문한다.
2. `og:image` 메타 태그를 탐색하거나, 없을 경우 실제 페이지 상단 비주얼 영역을 직접 캡처한다.
3. 이미지를 최대 640px 크기로 축소 후 `canvas.toDataURL("image/webp", 0.72)`로 변환한다.
4. 모든 썸네일을 `data:image/webp;base64,...` 형태로 HTML 내부에 인라인 삽입한다.
5. 변환에 사용된 임시 스크립트는 즉시 삭제한다.

## 8. 최종 검증 체크리스트

- [ ] 상단 헤더에 `AI News` 및 주간 브리핑 일자만 깔끔하게 표시되는가? (NEXUS, SIGNAL, Intelligence 등 과장된 브랜딩 및 **'실물 검증', '100% 검증' 등 내부 작업 수식어 일체 배제**)
- [ ] 하단 푸터에 과시적 문구 없이 `© YYYY AI News. Curated weekly tech digest.` 형태로 담백하게 표시되는가?
- [ ] 5대 핵심 흐름 요약과 대표 기사 원문 링크가 정상 동작하는가?
- [ ] 주요 모델 발표 시 **독립된 'Benchmark Showdown' 벤치마크 섹션(시그니처 카드, 매트릭스 표, 추천 가이드)**이 포함되었는가?
- [ ] **[필수] 중간 팝업 모달 없이, 기사 카드를 클릭하면 새 탭(`target="_blank"`)에서 해당 기사의 원문 페이지로 즉시 직행하는가?**
- [ ] **[필수] 모든 기사 카드 링크가 실제 동작하는 실물 URL(HTTP 200 OK)이며 내용이 카드와 일치하는가?**
- [ ] 모든 기사 카드에 실제 웹페이지에서 추출한 고화질 base64 썸네일이 누락 없이 인라인 탑재되었는가?
- [ ] 필터(카테고리) 및 검색이 실시간으로 부드럽게 동작하는가?
- [ ] 데스크톱 및 모바일(390px)에서 가로 스크롤 없이 매끄럽게 렌더링되는가?
- [ ] CSS 순서 규칙(flex/grid → position → sizing → padding/margin → font → background → etc.)이 준수되었는가?
- [ ] 브라우저 콘솔 및 JavaScript 오류(`pageerror`)가 0건인가?
