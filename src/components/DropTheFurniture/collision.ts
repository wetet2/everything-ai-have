import { PlacedItem, Room } from "./types";
import {
  FURNITURE_DEFAULT_DIMENSIONS,
  MODEL_DEFAULT_DIMENSIONS,
  WALL_THICKNESS,
} from "./constants";

type Bounds3D = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

const WALL_OVERLAP_ALLOWANCE = 0;

export function rotatePointY(
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
    // 벽이 없는 "공간"은 벽 두께를 포함하지 않음
    const wallExtra = item.hasWalls === false ? 0 : WALL_THICKNESS;
    return {
      halfW: item.width / 2 + wallExtra,
      halfH: item.height / 2,
      halfD: item.depth / 2 + wallExtra,
    };
  }
  if (item.kind === "model") {
    const defaults = MODEL_DEFAULT_DIMENSIONS[item.modelType];
    return {
      halfW: (item.width || defaults.width) / 2,
      halfH: (item.height || defaults.height) / 2,
      halfD: (item.depth || defaults.depth) / 2,
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

// 특정 위치가 기존 방들과 겹치지 않는지 검사
function isPositionFree(
  x: number,
  z: number,
  width: number,
  depth: number,
  existingRooms: Room[]
): boolean {
  const candidate: PlacedItem = {
    id: "candidate",
    kind: "room",
    name: "",
    width,
    depth,
    height: 3,
    position: [x, 0, z],
    rotation: [0, 0, 0],
    color: "",
  };
  const b1 = getBounds3D(candidate);
  return !existingRooms.some((room) =>
    boxesOverlap3D(b1, getBounds3D(room), WALL_OVERLAP_ALLOWANCE)
  );
}

// 기준점에서 시작해 사각형 나선을 그리며 비어있는 자리를 찾습니다.
function findFreeSpotSpiral(
  center: [number, number, number],
  existingRooms: Room[],
  width: number,
  depth: number
): [number, number, number] {
  const spacing = WALL_THICKNESS * 2;
  const step = Math.max(width, depth) + spacing;

  const spiral = function* (): Generator<[number, number]> {
    yield [center[0], center[2]];
    let r = 1;
    while (r <= 100) {
      for (let i = -r + 1; i <= r; i++) yield [center[0] + i * step, center[2] - r * step];
      for (let i = -r + 1; i <= r; i++) yield [center[0] + r * step, center[2] + i * step];
      for (let i = r - 1; i >= -r; i--) yield [center[0] + i * step, center[2] + r * step];
      for (let i = r - 1; i >= -r; i--) yield [center[0] - r * step, center[2] + i * step];
      r++;
    }
  };

  for (const [x, z] of spiral()) {
    if (isPositionFree(x, z, width, depth, existingRooms)) {
      return [x, 0, z];
    }
  }

  return [center[0], 0, center[2]];
}

// 새 방/공간을 배치할 위치를 찾습니다.
// - 방이 없으면 카메라가 바라보는 위치(target) 한가운데
// - 방이 1개면 카메라와 그 방 사이(중간점)
// - 방이 여러 개면 (0,0)과 가장 가까운 방 옆에 인접하게
export function findNonOverlappingRoomPosition(
  existingRooms: Room[],
  width: number,
  depth: number,
  cameraTarget: [number, number, number] = [0, 0, 0],
  cameraPosition: [number, number, number] = [0, 0, 0]
): [number, number, number] {
  // 방이 없으면 카메라가 바라보는 위치 한가운데
  if (existingRooms.length === 0) {
    return [cameraTarget[0], 0, cameraTarget[2]];
  }

  // 방이 1개면 카메라와 그 방 사이(중간점)에서 비어있는 자리 탐색
  if (existingRooms.length === 1) {
    const room = existingRooms[0];
    const mid: [number, number, number] = [
      (cameraPosition[0] + room.position[0]) / 2,
      0,
      (cameraPosition[2] + room.position[2]) / 2,
    ];
    return findFreeSpotSpiral(mid, existingRooms, width, depth);
  }

  // 방이 여러 개면 (0,0)과 가장 가까운 방 찾기
  const nearest = existingRooms.reduce((closest, room) => {
    const dist = room.position[0] ** 2 + room.position[2] ** 2;
    const closestDist = closest.position[0] ** 2 + closest.position[2] ** 2;
    return dist < closestDist ? room : closest;
  }, existingRooms[0]);

  // 그 방 옆(동/서/남/북)에 인접하게 붙임
  const [bx, , bz] = nearest.position;
  const spacing = WALL_THICKNESS * 2;
  const candidates: [number, number][] = [
    [bx + nearest.width / 2 + width / 2 + spacing, bz],
    [bx - nearest.width / 2 - width / 2 - spacing, bz],
    [bx, bz + nearest.depth / 2 + depth / 2 + spacing],
    [bx, bz - nearest.depth / 2 - depth / 2 - spacing],
  ];

  for (const [x, z] of candidates) {
    if (isPositionFree(x, z, width, depth, existingRooms)) {
      return [x, 0, z];
    }
  }

  // 4방향 모두 막혀있으면 가장 가까운 방 주변에서 나선 탐색
  return findFreeSpotSpiral([bx, 0, bz], existingRooms, width, depth);
}
