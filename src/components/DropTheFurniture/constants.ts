import { FurnitureType } from "./types";

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

export const MODE_LABELS = {
  translate: "이동",
  rotate: "회전",
  scale: "크기",
} as const;
