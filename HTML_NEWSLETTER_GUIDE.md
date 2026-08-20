# HTML AI 뉴스레터 작성 가이드

> 이 문서는 `temp/ai-news-2026-08-16-onwards.md`를 기반으로 독립형 HTML 뉴스레터를 작성하는 표준 방법을 정리한 문서다.
>
> 최종 HTML 경로 규칙: `public/news/ai-news-digest-MMDD-MMDD.html`
>
> 최근 실행 예시: [`public/news/ai-news-digest-0816-0821.html`](public/news/ai-news-digest-0816-0821.html)

## 1. 목표

- 과도한 브랜딩(NEXUS, SIGNAL, Intelligence 등)이나 불필요한 미사여구를 배제하고 직관적인 `AI News` 헤더를 사용한다.
- 뉴스 Markdown의 제목·요약·출처·썸네일을 하나의 독립 HTML에 담는다.
- 최종 HTML 파일은 반드시 `public/news/` 폴더에 `ai-news-digest-MMDD-MMDD.html` 형식으로 생성/배치한다.
- 첫 화면은 광고나 과장된 hero 대신 편집자가 정리한 요약본처럼 직관적으로 구성한다.
- 핵심 흐름 5개를 먼저 보여주고, 전체 기사는 검색·필터 가능한 아카이브로 제공한다.
- 썸네일은 외부 이미지 URL 대신 HTML 내부의 base64 WebP로 포함하여 단일 파일로 완전 독립 실행되게 한다.
- 데스크톱과 모바일 모두에서 가로 스크롤 없이 읽을 수 있게 한다.

## 2. 기본 구성 요소

| 구분 | 적용 원칙 |
|---|---|
| 파일 위치 및 명명 | `public/news/ai-news-digest-MMDD-MMDD.html` (예: `public/news/ai-news-digest-0816-0821.html`) |
| 브랜딩 | `AI News` (NEXUS, SIGNAL, Intelligence, Curated Archive 등 과장된 수식어 배제) |
| 상단 메타 | 수집 날짜 범위만 간결하게 표시 (`YYYY.MM.DD — MM.DD`) |
| 첫 화면 요약 | 5개 핵심 흐름 (수치, 맥락, 대표 기사 링크) |
| 전체 기사 그리드 | 상위 리드 카드 + 아카이브 카드 분리 렌더링 |
| 검색 및 필터 | 중요 뉴스, 카테고리별 필터 버튼 및 실시간 텍스트 검색 |
| 썸네일 | Playwright로 수집한 최대 640px WebP base64 인라인 임베딩 (클릭 시 원문 링크 이동) |
| 폰트 | Pretendard 단일 폰트 적용 (mono 폰트 금지) |
| 하단 푸터 | 데이터 기준일 및 출처 안내만 간결하게 표기 |

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
      <div class="topbar-meta">2026.08.16 — 08.21</div>
    </header>
    <main id="main-content">
      <section class="briefing-intro">브리핑 제목·수집 통계</section>
      <section class="briefing-digest">5개 핵심 흐름 요약</section>
      <section class="section" id="stories">
        <div class="control-row">필터·검색</div>
        <div class="lead-grid" id="leadGrid"></div>
        <div class="story-grid" id="storyGrid"></div>
      </section>
    </main>
    <footer class="footer">데이터 기준일·출처 안내</footer>
  </div>
</body>
```

### 4.1 브리핑 헤더

`briefing-intro`는 군더더기 없이 사실 중심의 정보를 전달한다.

- 소제목: `주간 AI 뉴스 브리핑`
- 제목: `이번 브리핑의 5대 핵심 흐름`
- 통계: `25 Stories`, `05 Key Clusters`
- 설명: 기간 내 주요 이슈의 핵심 방향을 2~3문장으로 간략히 안내

### 4.2 5개 핵심 요약

`briefing-digest`는 기사 목록보다 먼저 읽는 편집 요약이다. 각 항목은 다음 요소를 포함한다.

- 번호 (`01`~`05`)
- 카테고리 태그
- 핵심 제목
- 2~3문장의 맥락 요약
- 핵심 수치/사실 태그 3개
- 대표 기사 링크

강조할 정보는 일반 문장 안에서 `<strong>`으로 표시하고, 숫자는 별도의 `digest-fact`로 분리한다.

```html
<p class="digest-desc">
  OpenAI가 <strong>Astra 모델의 안전 위험</strong>으로 학습을 일시 감속했습니다.
</p>
<div class="digest-facts">
  <span class="digest-fact"><strong>30분</strong> 의심 행동 탐지</span>
  <span class="digest-fact"><strong>45개</strong> 스웜 에이전트</span>
</div>
```

## 5. 기사 카드 렌더링

### 5.1 핵심 카드와 전체 아카이브 분리

JavaScript에서 필터 결과의 상위 5개를 핵심 리드 카드로 렌더링하고 나머지를 전체 아카이브에 렌더링한다.

```js
leadGrid.innerHTML = leadStories.map(s => cardTemplate(s, true)).join("");
storyGrid.innerHTML = normalStories.map(s => cardTemplate(s, false)).join("");
```

필터 결과가 없으면 안내 문구를 표시한다.

### 5.2 카드에 포함할 정보 및 링크 구조

- **썸네일 링크 (`a.story-image`)**: 썸네일 클릭 시 새 탭(`target="_blank" rel="noopener noreferrer"`)에서 원문 기사로 바로 이동하도록 `<a>` 태그로 감싼다.
- **날짜 및 중요 뉴스 라벨**: 기사 작성일과 `⭐ 중요` 또는 카테고리 뱃지 표시.
- **기사 제목 링크**: 제목 클릭 시 원문으로 이동.
- **간략한 요약**: 1~2문장 핵심 사실 요약.
- **대표 출처 및 원문 링크**: 출처명 및 `원문 ↗` 링크.

```html
<article class="story-card">
  <a class="story-image" href="${story.url}" target="_blank" rel="noopener noreferrer" aria-label="${story.title}">
    <img src="${story.image}" alt="${story.title}" loading="lazy">
  </a>
  <div class="story-body">
    <!-- 메타, 제목, 요약, 출처 및 링크 -->
  </div>
</article>
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

- [ ] 상단 헤더에 `AI News`만 깔끔하게 표시되는가? (NEXUS, SIGNAL, Curated Archive 등 불필요한 단어 제거 확인)
- [ ] 하단 푸터에 과장된 문구 없이 `AI News · 데이터 기준: ...`으로 표시되는가?
- [ ] 5대 핵심 흐름 요약과 수치가 정상 표시되는가?
- [ ] 25개 모든 기사 카드에 실물 base64 썸네일이 누락 없이 표시되는가?
- [ ] 필터 및 검색이 실시간으로 동작하는가?
- [ ] 데스크톱 및 모바일(390px)에서 가로 스크롤이 없는가?
- [ ] JavaScript 오류(`pageerror`)가 0건인가?
