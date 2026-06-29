# Everything AI Have

AI 기반 도구들을 모아둔 Next.js 프로젝트입니다.
채팅, 드로잉 보드, 3D 가구 배치 세 가지 기능을 제공합니다.

## 기술 스택

- Next.js 16 (Pages Router, 정적 내보내기)
- React 19
- TypeScript
- styled-components
- @google/genai (Gemini), @anthropic-ai/sdk (Claude)
- @react-three/fiber + @react-three/drei (3D 렌더링)
- react-markdown, rehype-highlight, remark-gfm (마크다운 렌더링)

## 시작하기

```bash
yarn        # 의존성 설치
yarn dev    # 개발 서버 실행 (http://localhost:8080)
```

## 빌드 및 배포

```bash
yarn build        # 정적 내보내기 (./out 디렉터리 생성)
yarn serve        # 정적 파일 서빙 (http://localhost:8080)
yarn build2       # 빌드 후 deploy.sh 실행
```

> `next.config.ts`에서 `output: "export"`로 정적 내보내기 설정이 되어 있습니다.

## 페이지

| 경로 | 컴포넌트                      | 설명                                                                               |
| ---- | ----------------------------- | ---------------------------------------------------------------------------------- |
| `/`  | `pages/index.tsx`             | 기본 시작 페이지                                                                   |
| `/g` | `components/AiChat`           | Gemini / Claude 멀티 세션 AI 채팅 (스트리밍, 이미지 첨부, 마크다운 렌더링)         |
| `/d` | `components/DrawingBoard`     | 캔버스 기반 드로잉 보드 (펜/사각형/원/텍스트/이미지, 색상 팔레트, 언두/리두, 저장) |
| `/c` | `components/DropTheFurniture` | react-three-fiber 기반 3D 방/가구 배치 에디터                                      |

## 프로젝트 구조

```
src/
├── components/
│   ├── AiChat/            # AI 채팅 (Gemini, Claude)
│   ├── DrawingBoard/      # 드로잉 보드
│   └── DropTheFurniture/  # 3D 가구 배치
├── pages/
│   ├── index.tsx          # 홈
│   ├── g/index.tsx        # /g → AiChat
│   ├── d/index.tsx        # /d → DrawingBoard
│   └── c/index.tsx        # /c → DropTheFurniture
├── styles/
├── types/
└── utils/
resources/                  # 아이콘 등 정적 리소스
public/                      # 정적 파일
```

## AI 채팅 API 키 ( `/g` )

`/g` 페이지는 API 키를 URL 쿼리 파라미터로 전달합니다. 별도의 `.env` 설정 없이 접속 시 키를 넘겨주면 됩니다.

```
http://localhost:8080/g?gkey=<GEMINI_API_KEY>&ckey=<CLAUDE_API_KEY>
```

- `gkey`: Google Gemini API 키
- `ckey`: Anthropic Claude API 키

두 키 중 하나만 전달해도 해당 모델로 채팅이 가능합니다.

## 스크립트

| 명령          | 설명                          |
| ------------- | ----------------------------- |
| `yarn dev`    | 개발 서버 실행 (포트 8080)    |
| `yarn build`  | 정적 빌드 (`./out` 생성)      |
| `yarn start`  | Next.js 프로덕션 서버 실행    |
| `yarn serve`  | `./out` 정적 서빙 (포트 8080) |
| `yarn build2` | 빌드 후 `deploy.sh` 실행      |
| `yarn lint`   | ESLint 실행                   |

# favicon

- [뇌 아이콘 제작자: Freepik - Flaticon](https://www.flaticon.com/kr/free-icons/)
