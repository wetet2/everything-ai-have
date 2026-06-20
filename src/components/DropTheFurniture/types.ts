export type FurnitureType =
  | "bed"
  | "chair"
  | "table"
  | "sofa"
  | "bookshelf"
  | "shelf"
  | "washingMachine"
  | "refrigerator"
  | "door";

export type TransformMode = "translate" | "rotate" | "scale";

export type Room = {
  id: string;
  kind: "room";
  name: string;
  width: number;
  depth: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
};

export type FurnitureItem = {
  id: string;
  kind: "furniture";
  furnitureType: FurnitureType;
  roomId: string | null;
  name: string;
  // 방처럼 직접 크기(mm)를 가집니다.
  width: number;
  depth: number;
  height: number;
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
};

export type PlacedItem = Room | FurnitureItem;
