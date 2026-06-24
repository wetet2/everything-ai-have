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
export const MODEL_DEFAULT_DIMENSIONS: Record<
  ModelType,
  { width: number; depth: number; height: number }
> = {
  fountain: { width: 1200, depth: 1200, height: 1500 },
  donkey: { width: 1200, depth: 600, height: 1200 },
  couch: { width: 1800, depth: 800, height: 800 },
  badDouble: { width: 1000, depth: 600, height: 350 },
  bookcase2: { width: 900, depth: 350, height: 1800 },
  chair2: { width: 600, depth: 600, height: 850 },
  door2: { width: 900, depth: 240, height: 2000 },
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
  couch: "소파(GLB)",
  badDouble: "침대 더블(GLB)",
  bookcase2: "책장2",
  chair2: "의자2",
  door2: "문2",
};

export const MODE_LABELS = {
  translate: "이동",
  rotate: "회전",
  scale: "크기",
} as const;
