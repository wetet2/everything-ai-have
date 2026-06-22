import { PlacedItem, Room } from "./types";
import { FURNITURE_DEFAULT_DIMENSIONS, WALL_THICKNESS } from "./constants";

type Bounds3D = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

const WALL_OVERLAP_ALLOWANCE = 0;

function rotatePointY(
  x: number,
  z: number,
  angleY: number
): [number, number] {
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  return [x * cos - z * sin, x * sin + z * cos];
}

function getHalfSize(item: PlacedItem) {
  if (item.kind === "room") {
    return {
      halfW: item.width / 2 + WALL_THICKNESS,
      halfH: item.height / 2,
      halfD: item.depth / 2 + WALL_THICKNESS,
    };
  }
  const defaults = FURNITURE_DEFAULT_DIMENSIONS[item.furnitureType];
  return {
    halfW: (item.width || defaults.width) / 2,
    halfH: (item.height || defaults.height) / 2,
    halfD: (item.depth || defaults.depth) / 2,
  };
}

// 3D 직육면체 영역을 반환합니다.
// 가구끼리는 높이를 포함한 3D 공간에서 침범을 판정합니다.
export function getBounds3D(item: PlacedItem): Bounds3D {
  const { halfW, halfH, halfD } = getHalfSize(item);

  const localCorners: [number, number, number][] = [
    [-halfW, -halfH, -halfD],
    [halfW, -halfH, -halfD],
    [halfW, halfH, -halfD],
    [-halfW, halfH, -halfD],
    [-halfW, -halfH, halfD],
    [halfW, -halfH, halfD],
    [halfW, halfH, halfD],
    [-halfW, halfH, halfD],
  ];

  const worldCorners = localCorners.map(([x, y, z]) => {
    const [rx, rz] = rotatePointY(x, z, item.rotation[1]);
    return [rx + item.position[0], y + item.position[1], rz + item.position[2]];
  });

  const xs = worldCorners.map(([x]) => x);
  const ys = worldCorners.map(([, y]) => y);
  const zs = worldCorners.map(([, , z]) => z);

  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    minZ: Math.min(...zs),
    maxZ: Math.max(...zs),
  };
}

export function boxesOverlap3D(
  a: Bounds3D,
  b: Bounds3D,
  allowance: number = 0
): boolean {
  // 방-방도 겹침을 허용하지 않습니다.
  // y축은 항상 0mm 허용입니다.
  return (
    a.minX < b.maxX - allowance &&
    a.maxX > b.minX + allowance &&
    a.minY < b.maxY &&
    a.maxY > b.minY &&
    a.minZ < b.maxZ - allowance &&
    a.maxZ > b.minZ + allowance
  );
}

// 모든 아이템은 절대 겹치면 안 됩니다.
function getOverlapAllowance(a: PlacedItem, b: PlacedItem): number {
  if (a.kind === "room" && b.kind === "room") return WALL_OVERLAP_ALLOWANCE;
  return 0;
}

// 이동 중인 아이템과 다른 아이템들이 겹치지 않도록 위치를 살짝 밀어냄
export function resolveCollisions(
  movedItem: PlacedItem,
  others: PlacedItem[],
  currentX: number,
  currentZ: number
): { x: number; z: number } {
  let x = currentX;
  let z = currentZ;
  const tempItem: PlacedItem = {
    ...movedItem,
    position: [x, movedItem.position[1], z],
  };

  for (let i = 0; i < 10; i++) {
    let hasOverlap = false;

    for (const other of others) {
      if (other.id === movedItem.id) continue;
      const b1 = getBounds3D(tempItem);
      const b2 = getBounds3D(other);

      const allowance = getOverlapAllowance(tempItem, other);
      if (boxesOverlap3D(b1, b2, allowance)) {
        hasOverlap = true;
        const overlapX = Math.min(b1.maxX - b2.minX, b2.maxX - b1.minX);
        const overlapZ = Math.min(b1.maxZ - b2.minZ, b2.maxZ - b1.minZ);

        // 허용 범위까지만 겹치도록 중심이 더 작은 쪽으로 밀어냄
        const pushX = Math.max(0, overlapX - allowance);
        const pushZ = Math.max(0, overlapZ - allowance);

        if (pushX > 0 && (pushZ === 0 || pushX < pushZ)) {
          const dir =
            (b1.minX + b1.maxX) / 2 < (b2.minX + b2.maxX) / 2 ? -1 : 1;
          x += dir * (pushX + 0.01);
        } else if (pushZ > 0) {
          const dir =
            (b1.minZ + b1.maxZ) / 2 < (b2.minZ + b2.maxZ) / 2 ? -1 : 1;
          z += dir * (pushZ + 0.01);
        }
        tempItem.position = [x, movedItem.position[1], z];
      }
    }

    if (!hasOverlap) break;
  }

  return { x, z };
}

// 새 방을 기존 방들과 겹치지 않는 인접 위치에 배치
export function findNonOverlappingRoomPosition(
  existingRooms: Room[],
  width: number,
  depth: number
): [number, number, number] {
  if (existingRooms.length === 0) return [0, 0, 0];

  // 방끼리 벽이 맞닿도록(겹치지 않게) 배치합니다.
  const spacing = WALL_THICKNESS * 2;
  const step = Math.max(width, depth) + spacing;
  const candidateRoom: PlacedItem = {
    id: "candidate",
    kind: "room",
    name: "",
    width,
    depth,
    height: 3,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    color: "",
  };

  // 원점에서 시작해 사각형 나선을 그리며 비어있는 자리를 찾습니다.
  // 이렇게 하면 방 100개도 10x10 그리드 형태로 촘촘히 배치됩니다.
  const spiral = function* (): Generator<[number, number]> {
    yield [0, 0];
    let r = 1;
    while (r <= 100) {
      for (let i = -r + 1; i <= r; i++) yield [i * step, -r * step];
      for (let i = -r + 1; i <= r; i++) yield [r * step, i * step];
      for (let i = r - 1; i >= -r; i--) yield [i * step, r * step];
      for (let i = r - 1; i >= -r; i--) yield [-r * step, i * step];
      r++;
    }
  };

  for (const [x, z] of spiral()) {
    const candidate: PlacedItem = {
      ...candidateRoom,
      position: [x, 0, z],
    };
    const b1 = getBounds3D(candidate);
    const overlaps = existingRooms.some((room) =>
      boxesOverlap3D(b1, getBounds3D(room), WALL_OVERLAP_ALLOWANCE)
    );
    if (!overlaps) return [x, 0, z];
  }

  // 안전장치: 혹시 못 찾으면 x축으로 나열
  return [existingRooms.length * step, 0, 0];
}
