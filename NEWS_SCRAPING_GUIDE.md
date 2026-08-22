# AI 뉴스 스크랩 방법 및 사이트별 가이드

> 이 문서는 기본 출처 목록과 사용자 요청으로 추가된 출처를 기준으로 수행한 AI 뉴스 수집 방법을 재현할 수 있도록 정리한 문서다.
>
> 최근 실행 예시: 2026년 7월 31일~8월 2일 수집 · 결과 파일: [`temp/ai-news-2026-07-31-onwards.md`](temp/ai-news-2026-07-31-onwards.md)

## 1. 수집 원칙

- 이 가이드의 기본 출처 목록을 수집 기준으로 사용한다.
- 기본 스킬에 포함된 사이트라도 기본 출처 목록에 없으면 자동으로 추가하지 않는다. 기사 부족이나 사용자 요청이 있을 때만 보조 출처로 추가한다.
- 목록·홈페이지에서 후보 기사를 찾고, 최종 요약과 썸네일은 가능한 한 개별 기사 페이지에서 확인한다.
- 사용자가 지정한 시작일과 종료일을 포함한 기사만 본문에 넣는다.
- 원문 게시일과 후속 보도일이 다르면 후속 보도는 기간 내 기사로 포함할 수 있지만, 최초 발표일을 설명에 함께 적는다.
- 같은 사건이 2개 이상의 대상 사이트에 반복되면 대표 기사 하나로 통합하고 `⭐ 중요 뉴스`로 표시한다.
- 서로 다른 사건이라도 같은 시기에 같은 제품군·기술 흐름으로 반복 보도되면 `유사 이슈`로 묶어 중요 흐름으로 표시한다.
- 기사 제목과 요약은 한글로 작성하되 회사명, 제품명, 모델명, LLM·API·GPU 같은 기술 용어는 원래 표기를 유지한다.
- 기사 본문 전체를 복사하지 않고 제목, 날짜, 핵심 사실, 의미를 짧게 요약한다.
- 원문이 차단되거나 페이월 뒤에 있으면 접근한 범위만 사용하고 `수집 제한 안내`에 기록한다.
- robots.txt, 이용약관, 공개 API의 요청 제한을 준수하며 로그인·CAPTCHA·Cloudflare를 우회하지 않는다.

## 2. 이번 실행 요약

| 항목 | 적용 내용 |
|---|---|
| 입력 목록 | 이 가이드의 국내외 기본 출처 목록 |
| 수집 기간 | 2026-07-31 00:00 ~ 2026-08-02 23:59, 게시자 표시 날짜 기준 |
| 1차 수집 | `webfetch`로 사이트별 목록·AI 섹션을 병렬 요청 |
| 2차 수집 | 후보 기사 개별 페이지를 병렬 방문해 본문·날짜·메타데이터 확인 |
| 중복 판정 | 동일 사건, 동일 제품 발표, 같은 후속 보도를 제목·본문·링크로 비교 |
| 최종 기사 | 대표 기사 22건 |
| 썸네일 | 대표 기사 22건 중 22건 확보 |
| 결과 위치 | `temp/ai-news-2026-07-31-onwards.md` |
| 8월 2일 | 수집 시점에 날짜를 확정할 수 있는 신규 AI 기사 없음 |

## 3. 전체 수집 절차

### 3.1 날짜 범위 확정

1. 사용자의 시작일·종료일을 확인한다.
2. 연도가 생략되면 실행 환경의 현재 연도를 사용하되, 결과 파일 상단에 실제 연도를 명시한다.
3. 파일명은 시작일 기준으로 `ai-news-YYYY-MM-DD-onwards.md`를 사용한다.
4. 후보 기사 날짜는 목록의 상대 날짜보다 개별 기사 페이지의 정확한 날짜를 우선한다.
5. 날짜가 `July 2026`처럼 월까지만 표시되면 정확한 날짜 기사와 분리하고 날짜 불확정 사실을 적는다.

### 3.2 1차 목록 수집

- 정적 HTML과 Markdown으로 읽을 수 있는 사이트는 `webfetch`를 사용한다.
- 사이트별 홈, AI 카테고리, 태그, 최신 목록을 한 번에 병렬로 요청한다.
- 후보로 저장할 값은 `사이트`, `제목`, `URL`, `목록에 표시된 날짜`, `목록 요약`, `목록 썸네일`이다.
- 홈페이지의 광고, 이벤트, 오래된 인기 기사, 일반 IT 기사와 AI 관련 기사를 구분한다.
- 애그리게이터는 기사 본문 출처가 아니라 중복 보도와 출처 수를 확인하는 용도로 사용한다.

### 3.3 후보 기사 선별

- 기간 밖 기사는 우선 제외한다.
- 기간 안에 게시된 제품 발표, 모델 공개, 보안 사고, 정책·저작권 판결, AI 인프라 기사를 우선한다.
- 같은 회사의 같은 발표를 여러 번 다룬 기사는 하나의 이슈로 묶는다.
- 국내 매체는 한국 기업·정책·인프라·국방·반도체 관련 기사를 우선한다.
- Hacker News는 `AI`, `model`, `agent`, `LLM`, `GPT`, `Claude`, `Gemini`, `GPU`, `chip`, `robotics`, `security` 등의 키워드로 필터한 뒤 추천수와 토론량을 참고한다.
- 기사형 분석·튜토리얼은 속보와 구분해 `실무 분석` 또는 `커뮤니티 선별`로 표시한다.

### 3.4 개별 기사 확인

개별 기사 페이지에서 다음 순서로 확인한다.

1. 제목: `og:title`, 페이지의 대표 제목, 본문 제목 순서로 대조한다.
2. 날짜: `article:published_time`, 페이지의 게시일·입력일, URL 날짜 순서로 확인한다.
3. 요약: `og:description`과 본문 첫 단락을 비교한 뒤 핵심 사실을 한글로 다시 쓴다.
4. 이미지: `og:image`, `twitter:image`, 페이지 대표 이미지 순서로 확인한다.
5. 기사 URL: 상대경로를 절대경로로 바꾸고 추적 파라미터는 필요한 경우만 남긴다.
6. 보도 성격: 공식 발표, 통신사 보도, 매체 분석, 커뮤니티 큐레이션을 구분한다.

### 3.5 중복·유사 뉴스 판정

다음 조건을 2개 이상 만족하면 같은 이슈로 묶는다.

- 제목의 핵심 주어·제품·사건이 같다.
- 게시 시점이 같고 핵심 수치·발표 내용이 같다.
- 한 기사에서 다른 기사를 원출처로 인용한다.
- Techmeme·Ground News·Particle에서 하나의 클러스터로 묶인다.
- 여러 매체가 같은 공식 발표문·법원 판결·기업 성명을 인용한다.

중복 이슈는 대표성 높은 출처 하나를 본문 기사로 두고 다음 형식으로 다른 출처를 기록한다.

```markdown
### ⭐ 중요 뉴스: 이슈 제목

- **대표 기사 제목** [링크](https://example.com/article) | ![thumb](https://example.com/image.jpg)
  - 핵심 사실과 간략한 내용.
  - **반복 확인:** [출처 A](https://...), [출처 B](https://...), [출처 C](https://...)
```

### 3.6 요약·번역

- 핵심 기사 10~15건은 직접 본문을 읽고 수치·날짜·회사·제품을 포함해 2~4문장으로 요약한다.
- 나머지 대표 기사는 제목과 1~2문장 요약을 제공한다.
- 기업의 주장과 독립적으로 검증된 사실을 구분한다.
- 벤치마크 수치, 투자액, 이용자 수는 `회사가 밝혔다`, `매체가 보도했다`, `분석 기관이 집계했다`처럼 주체를 적는다.
- 오픈 모델·오픈웨이트·오픈소스는 라이선스 조건이 다를 수 있으므로 원문 표현을 확인한다.

### 3.7 썸네일 수집

이번 실행에서는 대표 기사 URL을 Markdown에 먼저 기록한 뒤, 임시 Node.js 스크립트로 일괄 수집했다.

- 동시 요청 수: 8개
- 요청 제한 시간: 기사당 20초
- User-Agent: `Mozilla/5.0 (compatible; NewsBot/1.0)`
- 확인 순서: `og:image` → `twitter:image`
- HTML의 `property`와 `content` 속성 순서가 바뀐 경우도 처리한다.
- 이미지 URL의 해상도 suffix나 경로를 임의로 조합하지 않는다.
- 실패한 URL은 Playwright 재시도 후에도 실패하면 썸네일 없이 남기고 제한 안내에 적는다.
- 수집이 끝나면 임시 `.mjs`, `.json` 파일을 즉시 삭제한다.

기본 Markdown 형식은 다음과 같다.

```markdown
- **기사 제목** [링크](https://example.com/article) | ![thumb](https://example.com/og-image.jpg)
  - 기사 간략한 내용.
```

## 4. 사이트별 수집 방법

### 4.0 기본 URL 목록

아래 URL은 기본 출처 목록과 사용자 요청으로 추가 확인한 출처다. 실제 수집 시에는 홈 URL보다 아래 표의 AI 섹션·태그·아카이브 URL을 우선 사용하고, 최종 내용은 개별 기사 URL에서 확인한다.

#### 국내 사이트

| 사이트 | 기본 URL |
|---|---|
| AI타임스 | https://www.aitimes.com/ |
| 지디넷코리아 | https://zdnet.co.kr/ |
| 전자신문 | https://www.etnews.com/ |
| 블로터 (Bloter) | https://www.bloter.net/news/articleList.html?sc_sub_section_code=S2N54 |
| 디지털투데이 | https://www.digitaltoday.co.kr/news/articleList.html?sc_section_code=S1N2 |
| 요즘IT | https://yozm.wishket.com/ |
| 다음 뉴스 AI 테크 | https://news.daum.net/ai-tech |
| GeekNews | https://news.hada.io/ |
| 카카오 테크 | https://tech.kakao.com/ |
| 업스테이지 (Upstage) 블로그 | https://www.upstage.ai/blog |
| 네이버 D2 | https://d2.naver.com/home |
| AI 코리아 커뮤니티 | https://aikoreacommunity.com/ |
| Disquiet | https://disquiet.io/ |
| 네이버 클라우드 블로그 | https://blog.navercloud.com/ |
| NIA | https://www.nia.or.kr/ |

#### 해외 언론·기술 매체

| 사이트 | 기본 URL |
|---|---|
| MIT Technology Review | https://www.technologyreview.com/topic/artificial-intelligence/ |
| TechCrunch | https://techcrunch.com/category/artificial-intelligence/ |
| VentureBeat | https://venturebeat.com/category/ai/ |
| The Decoder | https://the-decoder.com/ |
| IEEE Spectrum | https://spectrum.ieee.org/topic/artificial-intelligence/ |
| KDnuggets | https://www.kdnuggets.com/ |
| Epoch AI | https://epochai.org/ |
| WIRED | https://www.wired.com/tag/artificial-intelligence/ |
| Ars Technica | https://arstechnica.com/ai/ |
| The Verge | https://www.theverge.com/ai-artificial-intelligence |
| Unite.AI | https://www.unite.ai/ |
| Financial Times AI | https://www.ft.com/artificial-intelligence |

#### 공식 블로그 & 연구소

| 사이트 | 기본 URL |
|---|---|
| OpenAI News | https://openai.com/news/ |
| Anthropic News & Research | https://www.anthropic.com/news |
| Google AI Blog (The Keyword) | https://blog.google/ |
| Google DeepMind Blog | https://deepmind.google/discover/blog/ |
| NVIDIA Blog (AI/Deep Learning) | https://blogs.nvidia.com/blog/category/deep-learning/ |
| NVIDIA Newsroom | https://nvidianews.nvidia.com/news |
| Mistral AI News | https://mistral.ai/news/ |
| AWS ML Blog | https://aws.amazon.com/ko/blogs/machine-learning/ |
| Meta AI Blog | https://ai.meta.com/blog/ |

#### 연구·오픈소스·논문 플랫폼

| 사이트 | 기본 URL |
|---|---|
| Hugging Face Daily Papers | https://huggingface.co/papers |
| Hugging Face Blog | https://huggingface.co/blog |
| GitHub Trending (Python) | https://github.com/trending/python |

#### 애그리게이터·뉴스레터

| 사이트 | 기본 URL |
|---|---|
| The Rundown AI | https://www.therundown.ai/ |
| The Neuron | https://www.theneurondaily.com/ |
| AlphaSignal | https://alphasignal.ai/ |
| Superhuman AI | https://www.superhuman.ai/ |
| Import AI (Substack) | https://importai.substack.com/ |
| Last Week in AI (Substack) | https://lastweekin.ai/ |
| TLDR AI | https://tldr.tech/ai |
| Techmeme | https://www.techmeme.com/ |
| Ground News | https://ground.news/ |
| Particle | https://www.particle.news/ |
| Synced Review | https://syncedreview.com/ |
| Inoreader | https://www.inoreader.com/ |
| There's An AI For That | https://theresanaiforthat.com/ |
| Deepgram AI News Daily | https://deepgram.com/ |
| The AI Daily Brief | https://aibreakdown.beehiiv.com/ |

#### VC·시장 분석·커뮤니티

| 사이트 | 기본 URL |
|---|---|
| a16z AI | https://a16z.com/ai/ |
| CB Insights AI | https://www.cbinsights.com/research/tag/artificial-intelligence/ |
| Gartner AI Insights | https://www.gartner.com/en/information-technology/insights/artificial-intelligence |
| Reddit r/ArtificialInteligence | https://www.reddit.com/r/ArtificialInteligence/ |
| Reddit r/LocalLLaMA | https://www.reddit.com/r/LocalLLaMA/ |
| Hacker News | https://news.ycombinator.com/ |

### 4.1 국내 사이트

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **AI타임스** | AI 전문 언론. 홈, `AI산업`, `AI기술`, `AI기업`, 전체 기사 목록을 사용한다. | 홈의 최신 기사와 `articleList.html` AI 섹션에서 후보를 찾고 `articleView.html?idxno=...` 개별 페이지를 연다. | 개별 페이지의 입력일·업데이트일과 본문을 확인한다. 반드시 개별 페이지에서 `og:image`를 가져온다. `thumbnail/custom/` 목록 이미지의 경로·suffix를 조합하지 않는다. | 다수의 대표 기사와 국내 후속 보도에 사용 |
| **블로터 (Bloter)** | IT/과학 및 산업 전문 언론. `news/articleList.html?sc_sub_section_code=S2N54`(IT정책/기술) 또는 IT/과학 홈을 사용한다. | 섹션 목록에서 `articleView.html?idxno=...` 링크를 수집하고 상세 페이지를 방문한다. | 개별 기사의 작성일시와 본문 내 `og:image`를 확인한다. 목록 썸네일 `cdn.bloter.net/news/thumbnail/...` 대신 원문 대표 이미지를 우선한다. | 국내 AI 정책 및 엔터프라이즈 AI 특종 수집에 추천 |
| **디지털투데이** | AI·빅데이터·디지털 금융 매체. `news/articleList.html?sc_section_code=S1N2` 섹션을 사용한다. | 섹션 목록에서 최신 기사 URL(`articleView.html?idxno=...`)을 파싱하여 본문을 수집한다. | 상단 발행일자와 `og:image`를 추출한다. | 국내외 AI 산업 및 솔루션 기사 수집에 유용 |
| **지디넷코리아** | IT·테크 언론. 홈, 최신뉴스, `인공지능` 키워드, 컴퓨팅 섹션을 사용한다. | `/newskey/?lstcode=인공지능`와 홈에서 후보를 찾고 `/view/?no=...` 개별 기사를 방문한다. | 기사 상단의 `입력`·`수정` 날짜를 우선한다. `image.zdnet.co.kr` 대표 이미지와 `og:image`를 확인한다. | ChatGPT 이용자, Google Earth, 국방 LLM 기사에 사용 |
| **전자신문** | AI·SW, 반도체, 정책을 함께 다루는 IT 언론. `news/section.html?id1=04`가 핵심이다. | AI·SW 섹션과 홈의 AI 박스에서 후보를 찾고 숫자형 기사 URL을 연다. | 페이지의 `발행일`을 사용한다. 기사 대표 이미지가 오래된 보도사진일 수 있으므로 제목과 이미지의 관련성을 확인한다. | GPU 활용률, Claude 후속 보도, GPT-5.6 후속 보도에 사용 |
| **업스테이지 (Upstage) 블로그** | 국내 대표 AI/LLM 기업 공식 블로그. Solar 모델 및 AI 에이전트 기술 발표를 다룬다. | `/blog` 목록에서 포스트 URL을 찾고 상세 페이지를 연다. | 본문 게시일과 `cdn.prod.website-files.com/...` 기반 `og:image`를 수집한다. | 한국형 파운데이션 모델 및 에이전트 발표 수집 |
| **카카오 테크** | 카카오 기술 블로그. Kanana AI 모델 및 사내 AI 인프라 기술 글을 다룬다. | `https://tech.kakao.com/` 홈 및 포스트 목록에서 기사를 확인한다. | 게시일자와 `t1.kakaocdn.net` 대표 이미지/`og:image`를 추출한다. | 국내 빅테크 모델 개발기 및 실무 적용 사례 |
| **네이버 D2** | 네이버 개발자 기술 블로그. LLM 서빙(vLLM), 검색 AI, 엔지니어링 포스트를 다룬다. | `https://d2.naver.com/home`에서 최신 포스트를 확인한다. | 상세 글의 게시일자와 본문 첫 번째 대표 이미지를 추출한다. | 딥테크 AI 엔지니어링 사례 수집 |
| **요즘IT** | 개발·제품·AI 실무 콘텐츠 매체. `/magazine/list/ai/`와 `/magazine/list/new/`를 사용한다. | AI 목록에서 `magazine/detail/...`로 들어가 게시일·본문·작성자·이미지를 확인한다. | `/media/news/...` 이미지 또는 개별 페이지 메타데이터를 사용한다. 튜토리얼·사용기와 실제 뉴스 발표를 구분한다. | 실무 콘텐츠 참고용 |
| **다음 뉴스 AI 테크** | 여러 언론사의 AI 뉴스를 모은 포털 섹션이다. | `AI 주요뉴스`에서 제목과 외부 링크를 수집한 뒤, 최종 요약은 연결된 원문 출처에서 확인한다. | 다음의 카드 이미지는 보조로만 사용하고 원문 매체의 `og:image`를 대표 썸네일로 쓴다. | 중복 보도 교차 확인에 사용 |
| **GeekNews** | 개발·기술·스타트업 큐레이션 커뮤니티. `news.hada.io`를 사용한다. | 홈·최신글에서 AI 키워드가 있는 토픽을 찾고 `/topic?id=...` 상세 페이지를 연다. | 토픽 게시 시점과 원문 게시일을 구분한다. 요약은 GeekNews 번역을 참고하되, 제품 수치와 원문은 외부 링크에서 대조한다. | 커뮤니티 선별에 사용 |
| **AI 코리아 커뮤니티** | AI 사용자·개발자 커뮤니티다. | 홈의 최신 게시물·프로젝트·뉴스 카테고리를 확인하고 게시물 상세 페이지의 작성일과 원문 링크를 수집한다. | 게시물 이미지는 커뮤니티 썸네일로 구분하며, 뉴스 원문이 있으면 원문 이미지를 우선한다. | 404 발생 시 제외 |
| **Disquiet** | 국내 스타트업·프로덕트 커뮤니티다. | 홈 스트림에서 AI·스타트업 관련 포스트를 찾고 포스트의 게시 시각·제품 링크·본문을 확인한다. | 일반 뉴스가 아닌 제품 공개·메이커 로그가 많으므로 `커뮤니티 동향`으로 분리한다. | 제품 공개 동향 확인용 |
| **네이버 클라우드 블로그** | 기업 공식 블로그. AI·클라우드 제품 발표와 고객 사례를 다룬다. | 홈·카테고리·검색에서 기간 내 글을 찾고 블로그 상세 페이지를 방문한다. | 글의 게시일과 수정일을 구분하고, `og:image` 또는 대표 이미지를 확인한다. | 접근 실패 시 제외 |
| **NIA** | 한국지능정보사회진흥원 공공·연구기관 사이트다. 정책, 연구, 사업 공고가 중심이다. | AI·디지털 정책·연구자료·보도자료 목록에서 기간 내 문서를 찾는다. | 일반 뉴스보다 공식 보고서·정책 자료로 분류하고, PDF는 표지 이미지와 발행일을 사용한다. | 공식 정책·보고서용 |

### 4.2 해외 언론·기술 매체

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **TechCrunch** | 스타트업·제품·투자 중심의 글로벌 IT 언론. `/category/artificial-intelligence/`가 AI 목록이다. | AI 목록의 최신 기사와 `/YYYY/MM/DD/...` 날짜 URL을 확인한 뒤 개별 본문을 읽는다. | 페이지의 게시 시각과 `og:image`를 사용한다. `wp-content/uploads` 이미지를 임의로 변환하지 않는다. | 글로벌 대표 기사 출처 |
| **VentureBeat** | 엔터프라이즈 AI·에이전트·인프라 매체. `/category/ai/`와 `orchestration`, `technology` 섹션을 사용한다. | 목록과 홈의 날짜 표시를 확인하고 개별 기사에서 벤치마크·기업 주장을 직접 읽는다. | `images.ctfassets.net` 기반 `og:image`를 사용한다. 파트너 콘텐츠는 일반 기사와 구분한다. | 엔터프라이즈 AI에 강점 |
| **The Decoder** | AI 모델·정책·연구를 짧고 깊게 다루는 전문 매체다. 홈과 AI 카테고리에서 후보를 찾는다. | 홈의 날짜 표시와 상세 페이지 본문을 확인한다. `Short News`, `AI research`, `AI in practice`를 구분한다. | 상세 페이지의 `wp-content/uploads` `og:image`와 본문 요약을 사용한다. | 최신 모델 분석에 우수 |
| **The Verge** | 제품·정책·저작권·사회적 AI 이슈를 다룬다. `/ai-artificial-intelligence`와 `Latest In AI`를 사용한다. | AI 섹션의 최신 항목과 `tech`, `policy`에 배치된 AI 기사를 함께 확인한다. 외부 링크형 항목은 연결된 원문도 확인한다. | 개별 페이지의 게시 시각과 `platform.theverge.com` `og:image`를 사용한다. placeholder 이미지는 가능하면 제외한다. | 글로벌 이슈 파악에 필수 |
| **Ars Technica** | 기술·보안·정책 분석 매체다. `/ai/` 외에 `/security/`, `/tech-policy/`도 AI 후보를 제공한다. | 목록에서 날짜와 추천·댓글 수를 보고 상세 페이지의 본문과 이미지 URL을 확인한다. | 게시일은 기사 상단 날짜를 사용하고 `cdn.arstechnica.net` 대표 이미지를 쓴다. | 심층 기술/보안 분석 |
| **WIRED** | AI, 보안, 정책, 산업을 취재하는 기술 언론이다. AI 태그와 개별 `story` 페이지를 사용한다. | AI 태그에서 최신 후보를 찾고 상세 페이지의 작성일·본문·관련 링크를 확인한다. | `media.wired.com/photos/...`의 `og:image`를 사용한다. 같은 이슈의 분석과 속보를 구분한다. | 교차 검증용 |
| **Financial Times AI** | 글로벌 비즈니스·정책·규제 매체. `/artificial-intelligence` 섹션을 사용한다. | 봇 감지가 엄격하므로 Playwright로 목록을 탐색하고 개별 기사 요약을 수집한다. | 개별 기사의 `ft.com/__origami/...` `og:image`를 추출한다. 일부 유료 페이월 기사는 공개 범위만 요약한다. | Playwright 필수 (글로벌 규제/M&A) |
| **MIT Technology Review** | AI 심층 분석·과학 기술 매체. `/topic/artificial-intelligence/`가 AI 목록이다. | 일반 요청은 JavaScript 안내만 반환할 수 있으므로 Playwright로 페이지를 `load`까지 연다. 기사 링크의 `/YYYY/MM/DD/` URL에서 날짜를 추출한다. | `article:published_time`이 없을 수 있어 URL 날짜를 사용한다. 개별 페이지의 `og:image`와 `og:description`을 읽는다. | Playwright 사용 권장 |
| **Unite.AI** | AI 모델·보안·규제·로봇·인프라를 다루는 전문 매체다. 홈과 `series` 카테고리를 사용한다. | 홈 카드에서 날짜·카테고리·기사 링크를 찾고 상세 페이지에서 본문을 확인한다. | WordPress `wp-content/uploads` 대표 이미지를 사용한다. AI 생성 기자·파트너 콘텐츠 여부를 표시한다. | 교차 확인에 사용 |
| **KDnuggets** | 데이터 과학·머신러닝·AI 실무 콘텐츠 매체다. 홈의 `Latest Posts`와 AI 태그를 사용한다. | 최신 목록에서 게시일이 기간 안인 글을 찾고 상세 본문을 읽는다. | 글의 `Published on` 날짜와 본문 대표 이미지를 확인한다. 이미지가 SVG placeholder면 실제 이미지가 있는지 재확인한다. | 실무 분석에 사용 |
| **IEEE Spectrum** | 공학·과학·로봇·AI 전문 매체. `/topic/artificial-intelligence/`를 사용한다. | AI 목록에서 날짜가 기간 안인 기사만 고르고 상세 페이지를 확인한다. | 목록의 `data:image` placeholder를 썸네일로 쓰지 말고 상세 페이지에서 실제 이미지를 찾는다. | 공학/하드웨어 이슈용 |
| **Epoch AI** | AI 발전 속도·컴퓨트·모델 평가를 분석하는 연구기관이다. `/latest`, `/publications`, `/data-insights`를 사용한다. | 연구 보고서·데이터 인사이트의 게시·업데이트 날짜와 연구 유형을 구분한다. | `assets/images` 경로의 원본 대표 이미지와 보고서 요약을 사용한다. | 모델 트렌드/컴퓨트 분석용 |

### 4.3 공식 블로그 & 연구소

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **Anthropic News & Research** | Claude 모델, Anthropic 연구·안전 정책 공식 채널. `/news`와 `/research`를 사용한다. | 뉴스 카드 목록에서 `/news/...` 링크를 수집한 뒤 `webfetch`로 본문을 확인한다. | 본문 상단 게시일(`March 12, 2026` 형식)과 `cdn.sanity.io/images/...` 기반 `og:image`를 수집한다. | 모델 릴리즈 및 프론티어 연구 최우선 출처 |
| **OpenAI News** | OpenAI 공식 제품·연구·안전 발표 채널. `/news/`와 카테고리를 사용한다. | 뉴스 카드에서 후보를 찾은 후 `openai.com/index/...` 개별 페이지를 `webfetch`로 확인한다. | 기사 본문의 정확한 날짜와 공식 설명을 우선한다. 자동 `fetch`가 403이면 `webfetch`로 본문을 읽고 공식 뉴스 목록 또는 관련 보도의 대표 이미지를 대체 썸네일로 기록한다. | OpenAI 릴리즈 1차 출처 |
| **NVIDIA Blog & Newsroom** | GPU, AI 칩셋, CUDA 가속 라이브러리, Nemotron 모델 발표 채널. `/blog/category/deep-learning/`과 `/news`를 사용한다. | 블로그 및 뉴스룸 최신 글 목록을 `webfetch`로 수집한다. | 개별 기사의 `blogs.nvidia.com/wp-content/uploads/...` `og:image`와 게시일자를 추출한다. | AI 반도체 및 하드웨어 생태계 1차 출처 |
| **Mistral AI News** | Mistral, Codestral, Pixtral 등 유럽 오픈 모델 및 엔터프라이즈 발표 채널. `/news/`를 사용한다. | `/news/` 목록에서 개별 아티클 페이지 링크를 추출하여 방문한다. | 페이지의 `mistral.ai/cms-media/...` `og:image`와 날짜를 수집한다. | 오픈 가중치/소버린 AI 주요 출처 |
| **Google AI Blog (The Keyword)** | Google 공식 AI·제품 발표 채널. `/innovation-and-ai/technology/ai/` 및 RSS를 사용한다. | 홈페이지와 AI 허브, RSS(`/innovation-and-ai/technology/ai/rss/`), `news-sitemap.xml`을 병렬 확인한다. | 개별 페이지의 `Aug 13, 2026` 형식 날짜와 `storage.googleapis.com/...` `og:image`를 추출한다. | Gemini 및 Google 생태계 1차 출처 |
| **Google DeepMind Blog** | Gemini 기초 연구, 로봇, 과학 AI 공식 블로그. `/discover/blog/`를 사용한다. | 목록과 개별 `/blog/...` 페이지에서 발표 내용을 확인한다. | 개별 페이지의 날짜와 `lh3.googleusercontent.com` 이미지를 확인한다. | 연구/로보틱스 1차 출처 |
| **AWS ML Blog** | Amazon Bedrock, Trainium/Inferentia 등 클라우드 ML 채널. `/ko/blogs/machine-learning/`을 사용한다. | 최신 포스트 목록에서 아티클을 수집하고 상세 본문을 읽는다. | 본문 게시일과 AWS 대표 썸네일을 추출한다. | 클라우드 AI 인프라 출처 |
| **Meta AI Blog** | Llama 모델 및 오픈소스 연구 블로그. `/blog/`를 사용한다. | 일반 fetch가 400 에러를 반환하므로 Playwright를 통해 렌더링 후 링크를 추출한다. | 상세 페이지의 `fbcdn.net` 기반 `og:image`를 수집한다. | Playwright 권장 (Llama 모델 출처) |

### 4.4 연구·오픈소스·논문 플랫폼

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **Hugging Face Daily Papers** | 커뮤니티 투표 기반 일일 인기 AI 논문 랭킹. `https://huggingface.co/papers`를 사용한다. | 일별 페이지(`huggingface.co/papers?date=YYYY-MM-DD`)에서 최신 상위 논문 링크(`/papers/2608.xxxxx`)를 수집한다. | 논문 상세 페이지의 `cdn-thumbnails.huggingface.co/social-thumbnails/papers/...` `og:image`와 arXiv 요약을 수집한다. | 핫한 신규 AI 논문 조기 탐색에 최고 |
| **Hugging Face Blog** | 오픈소스 모델, 벤치마크, 튜토리얼 공식 블로그. `https://huggingface.co/blog`를 사용한다. | 블로그 메인 및 커뮤니티 아티클 목록에서 최신 글을 파싱한다. | 상세 포스트의 `og:image` 및 작성일자를 수집한다. | 오픈소스 모델 생태계 트렌드 |
| **GitHub Trending (Python)** | 글로벌 개발자들이 주목하는 신규 AI 오픈소스 저장소. `https://github.com/trending/python`을 사용한다. | 상위 랭킹된 레포지토리의 설명, 스타 증가량, README 링크를 수집한다. | GitHub 기본 로고 또는 프로젝트 대표 이미지를 사용한다. | 신규 AI 도구 및 프레임워크 발굴용 |

### 4.5 뉴스 애그리게이터·뉴스레터·탐색 서비스

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **The Rundown AI** | 글로벌 1위 일간 AI 뉴스레터. `https://www.therundown.ai/` 및 아티클 페이지를 사용한다. | 메인 및 `/articles/...` 목록에서 최신 이슈를 `webfetch`로 직접 수집한다. | 상세 페이지의 `beehiiv-images-production.s3.amazonaws.com` `og:image`와 작성일자를 수집한다. | 일간 속보 및 주요 토픽 요약에 최우수 |
| **The Neuron** | 매일 발행되는 실무자용 AI 뉴스레터. `https://www.theneurondaily.com/`을 사용한다. | 메인 피드의 최신 아티클(`/p/...`)을 `webfetch`로 파싱한다. | 개별 포스트의 `og:image`와 발행 시각을 확인한다. | 빠른 이슈 캐치업 및 실무 트렌드 |
| **AlphaSignal** | 엔지니어/연구자 대상 핵심 모델 및 논문 큐레이션. `https://alphasignal.ai/`를 사용한다. | `/news/...` 목록에서 최신 기사를 수집한다. | 개별 기사의 `alphasignal.ai/image/...` `og:image`를 추출한다. | 기술적 속보 요약에 매우 우수 |
| **Superhuman AI** | 생산성 및 최신 AI 도구 중심 뉴스레터. `https://www.superhuman.ai/`를 사용한다. | `/p/...` 최신 아티클 목록을 수집한다. | 개별 포스트의 Beehiiv CDN 썸네일과 날짜를 추출한다. | AI 생산성 도구 동향 파악 |
| **Import AI (Substack)** | Jack Clark이 발행하는 심층 AI 주간 뉴스레터. `https://importai.substack.com/`을 사용한다. | Substack 최신 이슈(`/p/import-ai-...`)를 정적 HTML 또는 Substack RSS로 수집한다. | Substack CDN `og:image`와 게시일을 수집한다. | 심층 AI 정책 및 연구 분석 |
| **Last Week in AI (Substack)** | 주간 단위 AI 기술/비즈니스/사회 종합 뉴스레터. `https://lastweekin.ai/`를 사용한다. | 주간 이슈(`/p/...`)에서 카테고리별 요약과 원문 링크를 추출한다. | Substack CDN `og:image`를 사용한다. | 주간 전체 동향 교차 검증에 최고 |
| **Techmeme** | 여러 매체의 같은 이슈를 클러스터로 묶는 기술 뉴스 집계 사이트다. 홈, 날짜 스냅샷, RSS를 사용한다. | 날짜 스냅샷에서 `Top News`와 `More`의 동일 사건·원출처·반복 매체 목록을 확인한다. | Techmeme 이미지와 요약을 최종 기사로 쓰지 않고, 가장 대표적인 원출처 링크로 이동해 본문과 `og:image`를 수집한다. | 중복 이슈 판정에 핵심적으로 사용 |
| **Ground News** | 여러 매체의 기사 클러스터·보도량·편향 정보를 제공한다. 홈, `Daily Briefing`, AI interest를 사용한다. | AI 관련 story cluster에서 기사 수와 제목을 확인한 뒤, 원출처 목록을 따라간다. | Ground News CDN 이미지는 보조 증거로만 쓰고, 최종 기사 썸네일은 원출처에서 가져온다. | 중복 보도 수 확인에 사용 |
| **Particle** | 여러 매체 기사를 이야기 단위로 요약·묶는 뉴스 서비스다. 홈의 story 목록과 topic을 사용한다. | story의 기사 수, 요약, 원출처를 확인해 중복 이슈를 찾는다. | story 대표 이미지는 원출처 이미지가 아니므로 최종 썸네일로 우선 사용하지 않는다. | 클러스터 확인에 사용 |
| **Synced Review** | 글로벌 AI 연구 및 아시아/중국 테크(DeepSeek 등) 전문 매체. `https://syncedreview.com/`을 사용한다. | 홈 및 최신 포스트 목록에서 상세 글을 확인한다. | 상세 글의 `og:image`와 발행일을 수집한다. | 글로벌/중국계 오픈 AI 동향 확인 |
| **TLDR AI** | 개발자·연구자 대상 일일 AI 뉴스레터다. `/ai`와 `/ai/archives`를 사용한다. | 아카이브에서 날짜가 기간 안인 issue를 찾고 issue 내부의 원문 링크를 추출한다. | 최종 본문·날짜·썸네일은 원문 기사에서 가져온다. | 아카이브 갱신 주기 확인 필요 |
| **Inoreader** | RSS·웹 피드·뉴스레터를 모아 보는 서비스다. | 로그인 환경에서 등록된 RSS 피드를 API/피드로 읽는다. | 각 RSS item의 `pubDate`, `link`, `media:content`를 사용한다. | 개인 피드 연동용 |
| **There's An AI For That** | AI 도구·서비스 탐색 플랫폼이다. | 신규 도구의 출시일과 공식 발표 링크를 확인한다. | 도구 상세 `og:image` 또는 공식 발표 원문 이미지를 사용한다. | 신규 도구 탐색용 |
| **Deepgram AI News Daily** | 음성 AI 기업 사이트. `/learn/article`를 사용한다. | 음성 AI 관련 분석·제품 발표를 날짜로 필터한다. | 상세 글의 Sanity CDN `og:image`를 사용한다. | 음성 AI 전문 |
| **The AI Daily Brief** | AI 뉴스·팟캐스트·뉴스레터다. Beehiiv 페이지를 사용한다. | 발행일이 있는 issue에서 원문 링크를 따라간다. | Beehiiv 대표 이미지를 사용한다. | 팟캐스트 요약 |

### 4.6 VC·시장 분석·해외 커뮤니티

| 사이트 | 사이트 정보와 탐색 위치 | 스크랩 방법 | 날짜·썸네일 처리 | 비고 |
|---|---|---|---|---|
| **Hacker News** | 개발자 커뮤니티다. 홈, `new`, `front`, 날짜별 `front?day=YYYY-MM-DD`, item 페이지를 사용한다. | 날짜별 목록에서 AI 키워드와 외부 링크를 필터하고 추천수·댓글 수가 높은 항목을 우선한다. | 외부 원문 `og:image`를 사용한다. 의견·토론은 기사 사실과 분리한다. | 글로벌 개발자 핫토픽 검증에 필수 |
| **a16z AI** | Andreessen Horowitz의 AI 투자·시장 분석 페이지다. `/ai/`를 사용한다. | 최신 리포트와 아티클을 확인한다. | CloudFront 대표 이미지를 사용한다. | 투자자 관점 인사이트 |
| **CB Insights AI** | 스타트업·투자 데이터 및 리서치 보고서를 제공한다. | 무료 공개 범위만 요약한다. | 보고서 대표 이미지와 게시일을 사용한다. | 스타트업 투자 동향 |
| **Gartner AI Insights** | 엔터프라이즈 AI 도입 컨설팅·리서치 사이트다. | 공개된 아티클 범위만 요약한다. | Gartner 대표 이미지를 사용한다. | 기업 도입 전략 |
| **Reddit r/LocalLLaMA** | 로컬 모델·양자화 커뮤니티다. | 공개 RSS·JSON에서 모델 공개 글을 키워드로 필터한다. | GitHub/Hugging Face 원문 이미지를 사용한다. | 봇 차단 시 건너뜀 |
| **Reddit r/ArtificialInteligence** | AI 일반 토론 커뮤니티다. | 공개 RSS·JSON을 사용한다. | 외부 링크 원문 이미지를 사용한다. | 봇 차단 시 건너뜀 |

### 4.7 ⚠️ 수집 주의 및 특수 처리 사이트

| 사이트 | 상황 및 난이도 | 수집 방법 및 권장 대체 방안 |
|---|---|---|
| **The Information** | 일반 fetch/Headless는 403 차단. 전면 유료 페이월 존재 | **Playwright Headed (`headless: false`)** 모드로 목록/제목/도입부 수집 가능. 또는 Techmeme/The Verge 인용 보도 활용 |
| **Bloomberg Technology** | 일반 fetch/Headless는 "Are you a robot?" 403 차단 | **Playwright Headed (`headless: false`)** 모드로 기사 목록 수집 가능. 또는 로이터/TechCrunch로 보조 |
| **디지털데일리 (DDaily)** | 단순 HTTP fetch 시 세션/리다이렉트 불안정 | **Playwright Headed/Headless**로 200 OK 수집 가능. 또는 블로터/전자신문으로 대체 |
| **Microsoft AI Blog** | Cloudflare Turnstile 인터랙션 챌린지로 자동 통과 난이도 높음 | The Verge, VentureBeat의 Copilot 보도로 대체 권장 |
| **Semafor Tech** | 피드 경로 잦은 변경 및 정적 파싱 불안정 | The Verge, Wired로 대체 |

---

## 5. Playwright가 필요한 사이트

`webfetch`로 HTML이 충분히 반환되지 않거나 봇 감지(Cloudflare, Anti-bot)가 걸리는 사이트는 Playwright를 사용한다. 특히 봇 감지가 엄격한 사이트는 `headless: false` 및 자동화 플래그 제거 옵션이 필수다.

```bash
npx playwright install chromium
```

### 5.1 사이트별 Playwright 실행 모드

| 사이트 | 모드 | 필수 옵션 / 접근 방법 | 날짜·썸네일 추출 |
|---|---|---|---|
| **The Information** | **headed 필수** (`headless: false`) | `--disable-blink-features=AutomationControlled`, 대기 5초 | 개별 기사 `og:image` 및 카드 텍스트 (공개 요약) |
| **Bloomberg Technology** | **headed 필수** (`headless: false`) | `--disable-blink-features=AutomationControlled`, 대기 5초 | 기사 카드 링크 및 대표 이미지 |
| **xAI** | **headed 필수** (`headless: false`) | Cloudflare 보호 통과 대기 | 페이지 카드·상세 텍스트의 게시일 |
| **Financial Times AI** | headless 가능 | `waitUntil: "domcontentloaded"`, 약 20초 timeout | 개별 기사 `ft.com/__origami/...` `og:image` |
| **Meta AI Blog** | headless 가능 | `waitUntil: "domcontentloaded"`, React CSR 렌더링 대기 | 아티클 상세 날짜 및 `fbcdn.net` `og:image` |
| **디지털데일리** | headless 가능 | `waitUntil: "domcontentloaded"`, 브라우저 렌더링 후 링크 수집 | 본문 `og:image` 및 상단 날짜 |
| **MIT Technology Review** | headless 가능 | `waitUntil: "load"` 사용 | URL의 `/YYYY/MM/DD/` 정규식 및 `og:image` |
| **Reuters** | headless 가능 | `waitUntil: "load"`, 약 30초 timeout | `article:published_time` 또는 페이지 날짜 |

### 5.2 Headed 모드 실행 코드 템플릿

```javascript
const browser = await chromium.launch({
  headless: false,
  args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
});
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 800 },
  locale: 'ko-KR'
});
```

Playwright 추출 필드:

- `og:title` 또는 `document.title`
- 절대 URL
- 게시일
- `og:image`
- `og:description`

Playwright 실행 결과는 임시 JSON으로 저장하고 Markdown에 통합한 뒤 `.mjs`와 `.json`을 삭제한다. 접근에 실패한 사이트는 성공한 것처럼 채우지 않고 `수집 제한 안내`에 남긴다.

## 6. 썸네일 수집 상세 규칙

### 6.1 공통 규칙

- 기사 목록 카드의 작은 이미지를 그대로 쓰지 말고 개별 기사 페이지의 `og:image`를 먼저 확인한다.
- `og:image` URL의 `w=1200`, `_600`, `_250` 같은 suffix를 임의로 바꾸지 않는다.
- URL이 HTML entity로 인코딩되어 있으면 `&amp;`만 `&`로 복원한다.
- 이미지가 기사와 무관한 사이트 로고·placeholder이면 관련 이미지가 있는지 한 번 더 확인한다.
- 이미지 메타데이터가 전혀 없으면 제목·링크·요약만 유지한다.

### 6.2 AI타임스

AI타임스는 목록 이미지와 원본 이미지 경로가 다르다.

- 사용 금지: `https://cdn.aitimes.com/news/thumbnail/custom/...`
- 사용 우선: `https://cdn.aitimes.com/news/photo/YYYYMM/...`
- 개별 `articleView.html?idxno=...` 페이지에서 `<meta property="og:image">`를 직접 읽는다.
- 해시와 파일명은 목록 URL에서 추정하지 않는다.

### 6.3 주요 CDN

| 사이트 | 대표 이미지 경로 |
|---|---|
| Anthropic | `cdn.sanity.io/images/4zrzovbb/...` |
| The Rundown AI | `beehiiv-images-production.s3.amazonaws.com/...` |
| The Neuron | `beehiiv-images-production.s3.amazonaws.com/...` |
| Superhuman AI | `beehiiv-images-production.s3.amazonaws.com/...` |
| AlphaSignal | `alphasignal.ai/image/...` |
| Hugging Face | `cdn-thumbnails.huggingface.co/social-thumbnails/...` 또는 `huggingface.co/front/...` |
| NVIDIA Blog | `blogs.nvidia.com/wp-content/uploads/...` |
| Mistral AI | `mistral.ai/cms-media/...` |
| 블로터 (Bloter) | `cdn.bloter.net/news/photo/...` 또는 본문 `og:image` |
| 디지털투데이 | `digitaltoday.co.kr/...` |
| 업스테이지 (Upstage) | `cdn.prod.website-files.com/...` |
| 카카오 테크 | `t1.kakaocdn.net/...` |
| Substack (Import AI / Last Week in AI) | `substackcdn.com/image/fetch/...` |
| Financial Times | `www.ft.com/__origami/service/image/...` |
| TechCrunch | `techcrunch.com/wp-content/uploads/...` |
| VentureBeat | `images.ctfassets.net/...` |
| The Verge | `platform.theverge.com/wp-content/uploads/...` |
| AI타임스 | `cdn.aitimes.com/news/photo/...` |
| ZDNet Korea | `image.zdnet.co.kr/...` |
| 전자신문 | `img.etnews.com/news/article/...` |
| The Decoder | `the-decoder.com/wp-content/uploads/...` |
| WIRED | `media.wired.com/photos/...` |
| Ars Technica | `cdn.arstechnica.net/wp-content/uploads/...` |
| Unite.AI | `unite.ai/wp-content/uploads/...` |
| OpenAI | `images.ctfassets.net/...` 또는 공식 목록 카드 이미지 |
| Google AI Blog | `storage.googleapis.com/gweb-uniblog-publish-prod/...` |
| Google DeepMind | `lh3.googleusercontent.com/...` |

## 7. Markdown 출력 형식

```markdown
# AI 뉴스 정리 (기간)

> 수집일 · 기준 기간 · 주요 출처

## 핵심 요약

1. 대표 이슈.

## 중요 뉴스 판별

| 이슈 | 반복 확인 출처 | 판정 |
|---|---|---|
| 동일 사건 | 출처 A, 출처 B | ⭐ 중요 |

## YYYY-MM-DD (요일)

### ⭐ 중요 뉴스: 이슈명

- **한글 제목** [링크](https://example.com/article) | ![thumb](https://example.com/image.jpg)
  - 제목과 간략한 내용.
  - **반복 확인:** [출처 A](https://...), [출처 B](https://...)

## 주요 흐름 분석

### 주제

흐름 요약.

## 수집 제한 안내

- 접근 실패·날짜 불확정·페이월·선별 기준을 기록한다.
```

## 8. 이번 실행에서 확인된 제한 사항 및 검증 결과

- **신규 검증 완료된 고품질 출처**:
  - **Anthropic News & Research, Mistral AI, NVIDIA Blog, Upstage, 카카오 테크, 네이버 D2**: 정적 HTML 및 메타데이터 파싱으로 최신 모델/엔지니어링 발표 즉시 확보 가능 (`cdn.sanity.io`, `mistral.ai`, `blogs.nvidia.com`, `cdn.prod.website-files.com` 썸네일).
  - **The Rundown AI, The Neuron, AlphaSignal, Superhuman AI, Import AI, Last Week in AI**: 일간/주간 AI 큐레이션 및 뉴스레터 정적 파싱 100% 정상 작동 (`beehiiv`, `alphasignal.ai`, `substackcdn` 썸네일).
  - **Hugging Face Daily Papers & Blog, GitHub Trending**: 최신 아카이브 논문 랭킹 및 오픈소스 트렌드 정상 수집.
  - **블로터 (Bloter), 디지털투데이**: 국내 정책 및 엔터프라이즈 AI 기사, `cdn.bloter.net` 썸네일 정상 확보.
- **Playwright 필요 출처**:
  - **Financial Times AI**: Playwright로 200 OK 접근 및 `ft.com/__origami/` 썸네일 확보 가능 (일부 유료 페이월 기사는 공개 요약 활용).
  - **Meta AI Blog**: React CSR 렌더링 구조로 Playwright 렌더링 후 링크/이미지 확보 권장.
- **수집 제외(폐기) 대상**:
  - **The Information, Bloomberg Technology, Microsoft AI Blog**: 강력한 Cloudflare Turnstile 및 봇 차단(403)으로 자동 수집 불가 -> 제외 및 타 매체 인용 보도로 대체.
  - **디지털데일리 (DDaily)**: 302 리다이렉트 루프 불안정 -> **블로터/전자신문/지디넷코리아**로 대체.

## 9. 재수집 체크리스트

- [ ] 요청 기간과 연도를 결과 파일 상단에 적었는가?
- [ ] 기본 출처 목록을 먼저 확인했는가?
- [ ] 목록 기사와 개별 기사 날짜가 일치하는가?
- [ ] 기간 밖의 원문 발표를 기간 내 신규 기사처럼 쓰지 않았는가?
- [ ] 동일 사건을 하나로 묶고 `⭐ 중요 뉴스`로 표시했는가?
- [ ] 기업 주장·언론 보도·독립 검증 결과를 구분했는가?
- [ ] 대표 기사마다 제목·링크·간략한 내용·썸네일이 있는가?
- [ ] AI타임스 썸네일에 `thumbnail/custom` 경로를 사용하지 않았는가?
- [ ] 실패한 사이트·날짜 불확정·페이월을 `수집 제한 안내`에 적었는가?
- [ ] 임시 `.mjs`, `.json` 파일을 삭제했는가?
- [ ] 최종 파일의 기사 링크 수와 `![thumb]` 수를 비교했는가?
