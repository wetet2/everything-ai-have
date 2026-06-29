import { FurnitureType, ModelType } from "./types";

// 벽 두께 (mm)
export const WALL_THICKNESS = 100;

// 각 가구 타입의 기본 크기 (mm)
export const FURNITURE_DEFAULT_DIMENSIONS: Record<
  FurnitureType,
  { width: number; depth: number; height: number }
> = {
  bed: { width: 2000, depth: 1400, height: 700 },
  chair: { width: 600, depth: 600, height: 850 },
  table: { width: 1400, depth: 800, height: 750 },
  sofa: { width: 1900, depth: 800, height: 750 },
  bookshelf: { width: 900, depth: 300, height: 1800 },
  shelf: { width: 1000, depth: 350, height: 1800 },
  washingMachine: { width: 600, depth: 600, height: 850 },
  refrigerator: { width: 900, depth: 700, height: 1800 },
  door: { width: 900, depth: 240, height: 2000 },
};

// 모델 타입의 기본 크기 (mm)
// GLB 모델은 각 모델의 자연스러운 높이(height)를 기준으로 정규화하여
// 렌더링하므로, width/depth는 그 높이에서의 실제 렌더링 비율로 맞춘다.
// (fountain은 GLB가 아닌 코드로 그리는 모델이라 기존값 유지)
// 이 값들이 충돌 박스의 기준이 되므로 렌더링 크기와 일치해야 한다.
export const MODEL_DEFAULT_DIMENSIONS: Record<
  ModelType,
  { width: number; depth: number; height: number }
> = {
  fountain: { width: 1200, depth: 1200, height: 1500 },
  donkey: { width: 348, depth: 1419, height: 1200 },
  dog: { width: 416, depth: 1618, height: 1200 },
  couch: { width: 2080, depth: 757, height: 800 },
  badDouble: { width: 892, depth: 1050, height: 350 },
  bookcase2: { width: 983, depth: 355, height: 1800 },
  chair2: { width: 473, depth: 427, height: 850 },
  door2: { width: 1125, depth: 152, height: 2000 },
  clothesDryer: { width: 660, depth: 643, height: 850 },
  fridge: { width: 1427, depth: 679, height: 1800 },
  sink: { width: 746, depth: 781, height: 850 },
  stove: { width: 812, depth: 850, height: 850 },
};

export const TYPE_LABELS: Record<FurnitureType, string> = {
  bed: "침대",
  chair: "의자",
  table: "테이블",
  sofa: "소파",
  bookshelf: "책장",
  shelf: "선반",
  washingMachine: "세탁기",
  refrigerator: "냉장고",
  door: "문",
};

export const MODEL_LABELS: Record<ModelType, string> = {
  fountain: "분수대",
  donkey: "당나귀",
  dog: "강아지",
  couch: "소파(GLB)",
  badDouble: "침대 더블(GLB)",
  bookcase2: "책장2",
  chair2: "의자2",
  door2: "문2",
  clothesDryer: "건조기",
  fridge: "냉장고(GLB)",
  sink: "싱크대",
  stove: "스토브",
};

export const MODE_LABELS = {
  translate: "이동",
  rotate: "회전",
  scale: "크기",
} as const;

// 애니메이션 클립 영문 이름 -> 한국어 라벨
export const ANIMATION_LABELS: Record<string, string> = {
  Idle: "대기",
  Idle_2: "대기2",
  Idle_Headlow: "대기(고개 숙임)",
  Idle_2_HeadLow: "대기(고개 숙임)",
  Walk: "걷기",
  Gallop: "질주",
  Gallop_Jump: "질주 점프",
  Jump_toIdle: "점프 후 대기",
  Jump_ToIdle: "점프 후 대기",
  Eating: "먹기",
  Attack_Headbutt: "공격(박치기)",
  Attack_Kick: "공격(차기)",
  Attack: "공격",
  Death: "죽음",
  Idle_HitReact_Left: "피격 반응(좌)",
  Idle_HitReact_Right: "피격 반응(우)",
};

// 각 GLB 모델에 포함된 애니메이션 클립 이름 목록.
// 비어 있으면 애니메이션이 없는 정적 모델.
export const MODEL_ANIMATIONS: Partial<Record<ModelType, string[]>> = {
  donkey: [
    "Idle",
    "Idle_2",
    "Idle_Headlow",
    "Walk",
    "Gallop",
    "Gallop_Jump",
    "Jump_toIdle",
    "Eating",
    "Attack_Headbutt",
    "Attack_Kick",
    "Death",
    "Idle_HitReact_Left",
    "Idle_HitReact_Right",
  ],
  dog: [
    "Idle",
    "Idle_2",
    "Idle_2_HeadLow",
    "Walk",
    "Gallop",
    "Gallop_Jump",
    "Jump_ToIdle",
    "Eating",
    "Attack",
    "Death",
    "Idle_HitReact_Left",
    "Idle_HitReact_Right",
  ],
};
