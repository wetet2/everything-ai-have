import { DoubleSide } from "three";
import { WALL_THICKNESS } from "./constants";

type HiddenWalls = { front?: boolean; back?: boolean; left?: boolean; right?: boolean };

type RoomMeshProps = {
  width: number;
  height: number;
  depth: number;
  color: string;
  wallOpacity?: number;
  hiddenWalls?: HiddenWalls;
  hasWalls?: boolean;
};

export default function RoomMesh({
  width,
  height,
  depth,
  color,
  wallOpacity = 1,
  hiddenWalls = {},
  hasWalls = true,
}: RoomMeshProps) {
  const showWalls = hasWalls && wallOpacity > 0;

  return (
    <group>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={color} side={DoubleSide} />
      </mesh>

      {showWalls && (
        <>
          {!hiddenWalls.back && (
            <mesh position={[0, height / 2, -depth / 2 - WALL_THICKNESS / 2]}>
              <boxGeometry args={[width + WALL_THICKNESS * 2, height, WALL_THICKNESS]} />
              <meshStandardMaterial color={color} transparent opacity={wallOpacity} side={DoubleSide} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            </mesh>
          )}
          {!hiddenWalls.front && (
            <mesh position={[0, height / 2, depth / 2 + WALL_THICKNESS / 2]}>
              <boxGeometry args={[width + WALL_THICKNESS * 2, height, WALL_THICKNESS]} />
              <meshStandardMaterial color={color} transparent opacity={wallOpacity} side={DoubleSide} polygonOffset polygonOffsetFactor={1} polygonOffsetUnits={1} />
            </mesh>
          )}
          {!hiddenWalls.left && (
            <mesh position={[-width / 2 - WALL_THICKNESS / 2, height / 2, 0]}>
              <boxGeometry args={[WALL_THICKNESS, height, depth + WALL_THICKNESS * 2]} />
              <meshStandardMaterial color={color} transparent opacity={wallOpacity} side={DoubleSide} polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
            </mesh>
          )}
          {!hiddenWalls.right && (
            <mesh position={[width / 2 + WALL_THICKNESS / 2, height / 2, 0]}>
              <boxGeometry args={[WALL_THICKNESS, height, depth + WALL_THICKNESS * 2]} />
              <meshStandardMaterial color={color} transparent opacity={wallOpacity} side={DoubleSide} polygonOffset polygonOffsetFactor={2} polygonOffsetUnits={2} />
            </mesh>
          )}
        </>
      )}
    </group>
  );
}
