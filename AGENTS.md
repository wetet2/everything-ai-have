# 언어

- `중요` 모든 채팅은 한글로 표시한다.
- 주석은 모두 한글로 작성한다.

# css

- `중요` css 속성은 순서를 따라 작성한다.

```
1. flex, align-items, justify-content, gap 등 flex 관련 최우선
2. 빈 줄
3. position, top, left, bottom, right, inset 등
4. 빈 줄
5. width, height 관련 등 사이즈 관련
6. padding, margin 관련 등 영역 관련
7. 빈 줄
8. font 관련
9. background 관련
10. 그외 나머지
```

---

# DropTheFurniture - GLB 모델 추가 가이드

`src/components/DropTheFurniture/`에 GLB 모델을 새로 추가할 때 반드시 아래 절차를 따른다.

## 핵심 원칙

- 충돌 박스(`collision.ts`의 `getHalfSize`)는 `MODEL_DEFAULT_DIMENSIONS[modelType]`의 `width/depth/height`를 그대로 사용한다.
- `GLBModel`(Furniture.tsx)은 전달받은 `targetHeight`로 높이를 정규화해 렌더링하며, 가로/세로는 GLB 원본 비율을 유지한다.
- `Furniture.tsx`에서 `GLBModel`에 `targetHeight={base.height}`를 전달한다(고정값 금지).
- 따라서 **`MODEL_DEFAULT_DIMENSIONS` 값 = 실제 렌더링 크기**가 되어야 충돌 판정이 메시와 일치한다.
  - 값이 어긋나면 "충돌은 피했는데 메시가 겹쳐 보이는" 현상(예: 절반 겹침)이 발생한다.

## 추가 절차

1. GLB 파일을 `public/models/`에 추가한다.
2. GLB 원본 바운딩 박스를 측정한다 (Node + `three`의 `GLTFLoader`로 `Box3().setFromObject` 측정).
3. `constants.ts`의 `MODEL_DEFAULT_DIMENSIONS`에 항목 추가:
   - `height`: 모델의 자연스러운 높이(mm)를 정한다.
   - `width`: `round(원본size.x * height / 원본size.y)`
   - `depth`: `round(원본size.z * height / 원본size.y)`
4. `constants.ts`의 `MODEL_LABELS`에 한글 라벨을 추가한다.
5. `Furniture.tsx`:
   - 모델 경로 상수(`XXX_MODEL_PATH`) 추가
   - `useGLTF.preload(...)` 추가
   - 렌더링 분기에 `<GLBModel path={...} targetHeight={base.height} />` 추가
6. `index.tsx`의 `MODEL_TYPES` 배열과(필요시 `DEFAULT_MODEL_COLORS`)에 추가한다.
7. 기존 저장 레이아웃(`sample_layout.json` 등)에 해당 모델이 있다면, width/depth/height를 새 기본값으로 갱신한다 (비균일 스케일로 인한 형태 왜곡 방지).

## 주의

- 모든 GLB 모델을 같은 높이(예: 1200)로 일괄 정규화하지 말 것. 모델별로 비율이 달라 비현실적 크기가 된다.
- `MODEL_TARGET_HEIGHT` 같은 고정 정규화 높이 상수를 다시 도입하지 말 것.
- `fountain`은 GLB가 아닌 코드로 그리는 모델이라 이 절차에서 제외된다.

---

name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.
license: MIT

---

# Karpathy Guidelines

Behavioral guidelines to reduce common LLM coding mistakes, derived from [Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876) on LLM coding pitfalls.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
