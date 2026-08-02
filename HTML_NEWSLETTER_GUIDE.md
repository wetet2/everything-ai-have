# HTML AI 뉴스레터 작성 가이드

> 이 문서는 `temp/ai-news-2026-07-31-onwards.md`를 기반으로 독립형 HTML 뉴스레터를 작성한 방법을 정리한 문서다.
>
> 최종 HTML: [`temp/ai-news-2026-07-31-onwards.html`](temp/ai-news-2026-07-31-onwards.html)

## 1. 목표

- 기존 HTML 뉴스레터 스타일을 참고하지 않고 새로운 화면을 설계한다.
- 뉴스 Markdown의 제목·요약·출처·썸네일을 하나의 독립 HTML에 담는다.
- 첫 화면은 광고처럼 거창한 hero보다 편집자가 만든 요약본처럼 읽히게 구성한다.
- 핵심 흐름 5개를 먼저 보여주고, 전체 기사 22개는 검색 가능한 아카이브로 제공한다.
- 썸네일은 외부 이미지 URL을 직접 사용하지 않고 HTML 내부의 base64 WebP로 포함한다.
- 데스크톱과 모바일 모두에서 가로 스크롤 없이 읽을 수 있게 한다.

## 2. 입력과 결과

| 구분 | 경로·값 |
|---|---|
| 원본 뉴스 | `temp/ai-news-2026-07-31-onwards.md` |
| 뉴스레터 HTML | `temp/ai-news-2026-07-31-onwards.html` |
| 수집 범위 | 2026-07-31 ~ 2026-08-02 |
| 대표 기사 | 22개 |
| 첫 화면 핵심 요약 | 5개 흐름 |
| base64 이미지 | 22개 참조, 21개 고유 이미지 |
| 이미지 변환 | 최대 640px, WebP 품질 72 |
| HTML 최종 크기 | 약 555KB |

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
  date: "07.31",
  source: "TechCrunch",
  category: "안전",
  tags: ["안전", "에이전트"],
  important: true,
  coverage: "6개 출처",
  title: "OpenAI, 추가 AI 에이전트가 통제를 벗어난 정황 확인",
  summary: "기사의 핵심 사실을 1~2문장으로 요약한다.",
  image: "썸네일 데이터 URI",
  url: "https://원문-기사-주소"
}
```

`important`는 원본 Markdown의 `⭐ 중요 뉴스` 기준을 그대로 반영한다. `coverage`에는 반복 확인된 출처 수나 `단독 분석`, `커뮤니티 선별` 같은 성격을 넣는다.

### 3.2 편집 흐름 결정

현재 HTML은 다음 순서로 읽힌다.

1. 상단 브랜드와 기간 표시
2. `이번 브리핑의 핵심` 헤더
3. 5개 핵심 흐름의 상세 요약
4. 핵심 기사 5개 카드
5. 전체 기사 17개 아카이브
6. 필터·검색 영역
7. 페이지 하단 출처 문구

처음에는 큰 hero를 만들었지만, 광고처럼 보이고 정보 진입이 늦어져 최종 버전에서 제거했다. `SIGNAL INDEX` 사이드바와 `02 / READING PROTOCOL` 섹션도 제거하고 뉴스 내용에 집중하도록 단순화했다.

## 4. 최종 HTML 구조

```html
<body>
  <a class="skip-link">본문으로 이동</a>
  <div class="page-shell">
    <header class="topbar">브랜드·기간·상태</header>
    <main>
      <section class="briefing-intro">브리핑 제목·수집 통계</section>
      <section class="briefing-digest">5개 핵심 흐름 요약</section>
      <section class="section" id="signals">
        <div class="lead-grid" id="leadStories"></div>
        <div class="control-row">필터·검색</div>
        <div class="story-grid" id="storyGrid"></div>
      </section>
    </main>
    <footer class="footer">브리핑 날짜·출처 문구</footer>
  </div>
</body>
```

### 4.1 브리핑 헤더

`briefing-intro`는 큰 이미지나 과도한 카피를 넣지 않는다.

- 기간: `AI SIGNAL / 07.31 — 08.02`
- 제목: `이번 브리핑의 핵심`
- 설명: 이번 기간에 반복 확인된 5개 흐름
- 통계: `22 stories`, `09 clusters`, `38 sources`

### 4.2 5개 핵심 요약

`briefing-digest`는 기사 목록보다 먼저 읽는 편집 요약이다. 각 항목은 다음 요소를 포함한다.

- 번호
- 흐름 라벨
- 핵심 제목
- 2~3문장의 맥락 요약
- 핵심 수치 3개
- 대표 기사 링크

현재 5개 요약 주제는 다음과 같다.

1. **통제와 안전**: OpenAI·Anthropic 에이전트 평가 환경 사고
2. **콘텐츠 신뢰**: Google Earth AI 편집 기능 철회
3. **모델 효율**: Astra, DeepSeek, Inkling-Small, GPT-5.6 가격 경쟁
4. **피지컬·멀티모달 AI**: Gemini Robotics 2, Seedance 2.5, MiniMax H3
5. **권리·인프라**: Suno 저작권 판결과 Anthropic 데이터센터 금융화

강조할 정보는 일반 문장 안에서 `<strong>`으로 표시하고, 숫자는 별도의 `digest-fact`로 분리한다.

```html
<p class="digest-text">
  Anthropic은 <strong>14만1,006건의 평가 로그</strong>를 다시 확인했다.
</p>
<div class="digest-facts">
  <span class="digest-fact"><strong>3곳</strong> 실제 조직</span>
  <span class="digest-fact"><strong>2개</strong> 프론티어 랩</span>
</div>
```

마지막에는 전체 흐름을 정리하는 `digest-verdict`를 둔다.

```html
<p class="digest-verdict">
  <strong>BRIEFING READ</strong>
  <span>AI가 현실에 더 깊이 들어갈수록 운영 구조·비용·신뢰·책임을 함께 설계해야 한다.</span>
</p>
```

## 5. 기사 카드 렌더링

### 5.1 핵심 카드와 전체 아카이브 분리

JavaScript에서 필터 결과의 앞 5개를 핵심 카드로 렌더링하고 나머지를 전체 아카이브에 렌더링한다.

```js
leadStories.innerHTML = visibleStories
  .slice(0, 5)
  .map((story, index) => cardTemplate(story, index, true))
  .join("");

storyGrid.innerHTML = visibleStories.length > 5
  ? visibleStories
      .slice(5)
      .map((story, index) => cardTemplate(story, index + 5))
      .join("")
  : "";
```

필터 결과가 5개 이하일 때는 핵심 영역에 모두 표시하고, 검색 결과가 없으면 안내 문구를 표시한다.

### 5.2 카드에 포함할 정보

- 날짜와 기사 번호
- 중요 뉴스 또는 카테고리 라벨
- base64 썸네일
- 기사 제목
- 3줄 이내의 간략한 요약
- 대표 출처와 반복 출처 수
- 원문 링크

카드의 원문 링크는 외부 URL을 유지한다. base64로 변환하는 것은 이미지뿐이며 기사 링크까지 내부화하지 않는다.

### 5.3 필터·검색

현재 필터는 다음 값을 사용한다.

- `all`: 전체
- `important`: 중요 뉴스
- `07.31`: 7월 31일 기사
- `08.01`: 8월 1일 기사
- `안전`: 안전 관련 태그
- `모델`: 모델 관련 태그

검색어는 제목, 요약, 출처, 카테고리, 태그를 합친 문자열에서 검색한다.

```js
const haystack = `${story.title} ${story.summary} ${story.source} ${story.category} ${story.tags.join(" ")}`.toLowerCase();
return matchesFilter && (!query || haystack.includes(query));
```

## 6. 디자인과 CSS 작성 방법

### 6.1 시각 방향

- 배경: 거의 검은 네이비 `#071013`
- 패널: 어두운 청록 계열
- 주 강조색: 차분한 시안 `#70f0d1`
- 보조 강조색: 앰버 `#ffbd6b`
- 보조 포인트: 낮은 채도의 바이올렛
- 격자 배경과 약한 radial gradient만 사용한다.
- 발광 효과는 선·상태·강조 수치에만 제한한다.
- 강한 형광색, 과도한 그라데이션, 자동 재생 애니메이션은 사용하지 않는다.

### 6.2 Pretendard 적용

로컬 폰트 파일이 없으므로 Pretendard 공식 배포 CSS를 연결한다.

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css">
```

모든 텍스트 요소는 같은 `--sans` 변수를 사용한다.

```css
:root {
  --sans: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
}

body {
  font-family: var(--sans);
}
```

별도의 `--mono`, `JetBrains Mono`, `Consolas`, `monospace` 선언은 사용하지 않는다. 브랜드·날짜·상태 라벨도 Pretendard의 크기와 자간으로 구분한다.

### 6.3 CSS 속성 순서

프로젝트의 `AGENTS.md` 규칙에 맞춰 CSS를 다음 순서로 작성한다.

1. flex·grid·align·justify·gap 등 레이아웃
2. 빈 줄
3. position·inset·z-index
4. 빈 줄
5. width·height·min/max 크기
6. padding·margin 영역
7. 빈 줄
8. font 관련
9. background 관련
10. border·color·transition 등 나머지

### 6.4 반응형 기준

- 기본: 최대 1440px 콘텐츠 폭
- `1040px 이하`: 기사 아카이브를 3열에서 2열로 변경
- `820px 이하`: 브리핑 헤더와 메타 통계를 세로 배치
- `560px 이하`: 카드 1열, 작은 여백, 긴 요약의 가독성 강화
- 모바일에서도 `document.documentElement.scrollWidth`가 viewport보다 커지지 않아야 한다.

## 7. Hover 애니메이션

### 7.1 카드 Hover

카드의 이동량이 너무 작으면 transition이 동작해도 사용자가 느끼기 어렵다. 현재는 이동·배경·테두리·그림자를 함께 전환한다.

```css
:root {
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
}

.story-card {
  background: rgba(12, 23, 26, 0.86);
  border: 1px solid var(--line);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition: border-color 320ms var(--ease-smooth), transform 320ms var(--ease-smooth), background 320ms var(--ease-smooth), box-shadow 320ms var(--ease-smooth);
}

.story-card:hover {
  background: var(--panel-raised);
  border-color: var(--line-strong);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(112, 240, 209, 0.12);
  transform: translate3d(0, -6px, 0);
}
```

중요 카드의 기본 테두리 규칙이 hover보다 뒤에서 우선될 수 있으므로 다음 규칙을 별도로 둔다.

```css
.story-card.is-important:hover {
  border-color: var(--line-strong);
}
```

### 7.2 썸네일 Hover

이미지 자체에 hover 상태를 연결하고 확대·채도·오버레이를 함께 전환한다.

```css
.story-image img {
  transform: scale(1);
  filter: saturate(0.72) contrast(1.04);
  transition: filter 320ms var(--ease-smooth), transform 700ms var(--ease-smooth);
  will-change: filter, transform;
}

.story-image:hover img,
.story-card:hover .story-image img {
  filter: saturate(1) contrast(1.06);
  transform: scale(1.055);
}
```

카드와 썸네일의 transition을 같은 easing 계열로 맞추면 카드가 떠오르는 동시에 이미지가 천천히 확대된다.

## 8. 썸네일을 base64로 삽입하는 방법

### 8.1 변환 이유

외부 썸네일 URL을 그대로 사용하면 다음 문제가 있다.

- 뉴스레터를 다른 환경으로 옮길 때 이미지가 사라질 수 있다.
- 원격 서버의 CORS·핫링크·접근 제한에 영향을 받는다.
- 오프라인 파일로 열었을 때 이미지가 즉시 보장되지 않는다.

따라서 이미지 URL만 base64 WebP로 변환하고, 기사 원문 링크는 외부 URL로 유지한다.

### 8.2 변환 절차

1. HTML의 `image: "https://..."` 값을 정규식으로 수집한다.
2. 중복 URL을 제거한다.
3. Node.js `fetch`로 이미지 바이너리를 내려받는다.
4. Playwright의 Canvas에서 이미지를 최대 640px로 축소한다.
5. `canvas.toDataURL("image/webp", 0.72)`로 재인코딩한다.
6. 원래 URL을 `data:image/webp;base64,...`로 치환한다.
7. 모든 이미지 치환 후 임시 `.mjs`, `.json` 파일을 삭제한다.

핵심 변환 코드는 다음과 같다.

```js
const scale = Math.min(640 / image.naturalWidth, 640 / image.naturalHeight, 1);
canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
context.drawImage(image, 0, 0, canvas.width, canvas.height);
const encoded = canvas.toDataURL("image/webp", 0.72);
```

현재 결과는 원본 이미지 약 6.24MB에서 변환 이미지 약 0.37MB로 줄었다. 5개 핵심 브리핑 요약과 base64 인코딩을 포함한 최종 파일 크기는 약 555KB다.

### 8.3 변환 후 확인

```js
const base64Images = (html.match(/image: \"data:image\/webp;base64,/g) || []).length;
const remoteImages = (html.match(/image: \"https?:/g) || []).length;
```

검증 기준:

- `base64Images === 22`
- `remoteImages === 0`
- `<img src="https://...">` 형태의 외부 이미지 태그가 없어야 한다.
- 기사 `url` 값은 원문 링크이므로 외부 URL이 남아 있어도 정상이다.

## 9. 브라우저 검증 방법

Playwright로 `file://` URL을 직접 열어 확인한다.

### 9.1 데스크톱 검증

- 5개 `digest-item` 렌더링
- 5개 핵심 카드 렌더링
- 전체 기사 카드 22개 렌더링
- 썸네일 22개 로딩
- JavaScript `pageerror` 없음
- 가로 스크롤 없음

### 9.2 모바일 검증

viewport를 `390 x 844`로 설정한다.

- 핵심 요약이 1열로 바뀌는가?
- 카드가 1열로 표시되는가?
- 긴 요약과 강조 수치가 화면 밖으로 나가지 않는가?
- `scrollWidth <= innerWidth`인가?
- 필터·검색 버튼을 계속 사용할 수 있는가?

### 9.3 Lazy 이미지 검증

카드 이미지에 `loading="lazy"`가 있으므로 모든 이미지를 확인하려면 페이지를 끝까지 스크롤한 뒤 `naturalWidth > 0`을 검사한다.

## 10. 최종 체크리스트

- [ ] 원본 Markdown의 대표 기사와 HTML `stories` 배열이 일치하는가?
- [ ] 첫 화면에 5개 핵심 흐름의 맥락과 수치가 있는가?
- [ ] 핵심 문장과 수치가 `<strong>`으로 강조되는가?
- [ ] hero·SIGNAL INDEX·READING PROTOCOL 같은 불필요한 영역이 남아 있지 않은가?
- [ ] 전체 기사 22개와 썸네일 22개가 렌더링되는가?
- [ ] 모든 텍스트가 Pretendard를 사용하는가?
- [ ] `--mono`, `JetBrains Mono`, `Consolas`, `monospace`가 남아 있지 않은가?
- [ ] 카드와 썸네일 hover가 확대·상승·그림자와 함께 부드럽게 동작하는가?
- [ ] 썸네일이 base64 WebP로 삽입됐는가?
- [ ] 기사 원문 링크는 유지되는가?
- [ ] 데스크톱·모바일에서 가로 스크롤이 없는가?
- [ ] 변환에 사용한 임시 파일을 삭제했는가?
