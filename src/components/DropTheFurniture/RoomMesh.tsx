import { DoubleSide } from "three";
import { WALL_THICKNESS } from "./constants";

type RoomMeshProps = {
  width: number;
  height: number;
  depth: number;
  color: string;
  wallOpacity?: number;
};

export default function RoomMesh({
  width,
  height,
  depth,
  color,
  wallOpacity = 1,
}: RoomMeshProps) {
  const showWalls = wallOpacity > 0;

  return (
    <group>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color={color} side={DoubleSide} />
      </mesh>

      {showWalls && (
        <>
          {/* 뒷벽: x축으로 벽 두께만큼 늘려 모서리가 면과 면으로 닿게 함 */}
          <mesh position={[0, height / 2, -depth / 2 - WALL_THICKNESS / 2]}>
            <boxGeometry args={[width + WALL_THICKNESS * 2, height, WALL_THICKNESS]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={wallOpacity}
              side={DoubleSide}
            />
          </mesh>
          {/* 앞벽 */}
          <mesh position={[0, height / 2, depth / 2 + WALL_THICKNESS / 2]}>
            <boxGeometry args={[width + WALL_THICKNESS * 2, height, WALL_THICKNESS]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={wallOpacity}
              side={DoubleSide}
            />
          </mesh>
          {/* 좌측벽: z축으로 벽 두께만큼 늘려 모서리가 면과 면으로 닿게 함 */}
          <mesh position={[-width / 2 - WALL_THICKNESS / 2, height / 2, 0]}>
            <boxGeometry args={[WALL_THICKNESS, height, depth + WALL_THICKNESS * 2]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={wallOpacity}
              side={DoubleSide}
            />
          </mesh>
          {/* 우측벽 */}
          <mesh position={[width / 2 + WALL_THICKNESS / 2, height / 2, 0]}>
            <boxGeometry args={[WALL_THICKNESS, height, depth + WALL_THICKNESS * 2]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={wallOpacity}
              side={DoubleSide}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
