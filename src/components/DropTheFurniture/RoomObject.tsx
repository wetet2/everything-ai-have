import { useRef, useEffect, useMemo, useState } from "react";
import { Group, Vector3 } from "three";
import { useThree, useFrame } from "@react-three/fiber";

// Shift/Ctrl 키 눌림 상태 추적
const isShiftPressed = { current: false };
const isCtrlPressed = { current: false };
import { TransformControls } from "@react-three/drei";
import { Room, FurnitureItem, PlacedItem, TransformMode } from "./types";
import RoomMesh from "./RoomMesh";
import Furniture from "./Furniture";
import { resolveCollisions } from "./collision";
import { WALL_THICKNESS } from "./constants";
import { activeTransformControls } from "./transformControlsRegistry";

type RoomObjectProps = {
  data: Room;
  rooms: Room[];
  furniture: FurnitureItem[];
  isSelected: boolean;
  selectedFurnitureId: string | null;
  mode: TransformMode;
  wallOpacity: number;
  autoTransparent?: boolean;
  onSelect: (id: string | null) => void;
  onChange: (id: string, updates: Partial<PlacedItem>) => void;
};

export default function RoomObject({
  data,
  rooms,
  furniture,
  isSelected,
  selectedFurnitureId,
  mode,
  wallOpacity,
  autoTransparent = false,
  onSelect,
  onChange,
}: RoomObjectProps) {
  const groupRef = useRef<Group>(null!);
  const { camera } = useThree();
  // 방이 선택되어 TransformControls가 마운트되면 전역 레지스트리에 등록.
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!isSelected) return;
    activeTransformControls.current = controlsRef.current;
    return () => {
      if (activeTransformControls.current === controlsRef.current) {
        activeTransformControls.current = null;
      }
    };
  }, [isSelected]);
  const [autoHiddenWalls, setAutoHiddenWalls] = useState({ front: false, back: false, left: false, right: false });
  const prevAuto = useRef({ front: false, back: false, left: false, right: false });

  useFrame(() => {
    const none = { front: false, back: false, left: false, right: false };
    if (!autoTransparent) {
      if (prevAuto.current.front || prevAuto.current.back || prevAuto.current.left || prevAuto.current.right) {
        prevAuto.current = none;
        setAutoHiddenWalls(none);
      }
      return;
    }
    const local = groupRef.current.worldToLocal(camera.position.clone());
    const next = {
      front: local.z > data.depth / 2,
      back:  local.z < -data.depth / 2,
      right: local.x > data.width / 2,
      left:  local.x < -data.width / 2,
    };
    const p = prevAuto.current;
    if (next.front !== p.front || next.back !== p.back || next.right !== p.right || next.left !== p.left) {
      prevAuto.current = next;
      setAutoHiddenWalls(next);
    }
  });

  // 인접한 방과 겹치는 벽 중 한쪽(left·back)만 숨겨 z-파이팅 제거
  // 규칙: right·front 벽은 항상 유지, left·back 벽은 상대 right·front 벽과 맞닿으면 숨김
  const hiddenWalls = useMemo(() => {
    const tol = WALL_THICKNESS * 2; // 약간의 여유 허용
    const [rx, , rz] = data.position;
    const hide = { front: false, back: false, left: false, right: false };

    for (const other of rooms) {
      if (other.id === data.id) continue;
      const [ox, , oz] = other.position;

      const myZMin = rz - data.depth / 2, myZMax = rz + data.depth / 2;
      const myXMin = rx - data.width / 2, myXMax = rx + data.width / 2;
      const otherZMin = oz - other.depth / 2, otherZMax = oz + other.depth / 2;
      const otherXMin = ox - other.width / 2, otherXMax = ox + other.width / 2;
      const zOverlap = myZMin < otherZMax && myZMax > otherZMin;
      const xOverlap = myXMin < otherXMax && myXMax > otherXMin;

      // 내 left 벽이 상대 right 벽과 맞닿으면 숨김 (상대는 유지)
      if (zOverlap && Math.abs((rx - data.width / 2) - (ox + other.width / 2)) < tol) {
        hide.left = true;
      }
      // 내 back 벽이 상대 front 벽과 맞닿으면 숨김 (상대는 유지)
      if (xOverlap && Math.abs((rz - data.depth / 2) - (oz + other.depth / 2)) < tol) {
        hide.back = true;
      }
    }
    return hide;
  }, [data, rooms]);

  // 이동 드래그 시작 시 위치/회전을 기억합니다.
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef(new Vector3());
  const dragStartRotRef = useRef<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Shift") isShiftPressed.current = true;
      if (event.key === "Control") isCtrlPressed.current = true;
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Shift") isShiftPressed.current = false;
      if (event.key === "Control") isCtrlPressed.current = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // 외부 상태가 바뀌면 메시 트랜스폼을 동기화
  useEffect(() => {
    const groupObj = groupRef.current;
    groupObj.position.set(...data.position);
    groupObj.rotation.set(...data.rotation);
    // 방은 크기로 조절하므로 스케일은 항상 1로 고정
    groupObj.scale.set(1, 1, 1);
    groupObj.updateMatrix();
    groupObj.updateMatrixWorld();
  }, [data.position, data.rotation, data.width, data.height, data.depth]);

  const handleChange = () => {
    const groupObj = groupRef.current;

    if (mode === "scale") {
      // 크기 조절은 onMouseUp에서 한 번만 처리합니다.
      return;
    }

    // 방은 크기로 조절하므로 스케일은 항상 1로 고정
    groupObj.scale.set(1, 1, 1);

    // 다른 방과 겹치지 않도록 위치 조정
    const tempRoom: PlacedItem = {
      ...data,
      position: [groupObj.position.x, groupObj.position.y, groupObj.position.z],
      rotation: [groupObj.rotation.x, groupObj.rotation.y, groupObj.rotation.z],
    };
    const otherRooms = rooms.filter((room) => room.id !== data.id);
    const resolved = resolveCollisions(
      tempRoom,
      otherRooms,
      groupObj.position.x,
      groupObj.position.z
    );
    groupObj.position.x = resolved.x;
    groupObj.position.z = resolved.z;

    // 이동 중 Shift를 누륾 이동을 멈추고 드래그 방향에 따라 90도 단위 회전
    if (mode === "translate" && isShiftPressed.current) {
      const dx = groupObj.position.x - dragStartPosRef.current.x;
      const dz = groupObj.position.z - dragStartPosRef.current.z;
      const angle = Math.atan2(dz, dx);
      const snap = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);

      groupObj.position.copy(dragStartPosRef.current);
      groupObj.rotation.set(
        dragStartRotRef.current[0],
        dragStartRotRef.current[1] - snap,
        dragStartRotRef.current[2]
      );

      return;
    }


    // 드래그 중에는 상태를 저장하지 않고, 마우스를 뗄 때 한 번만 저장합니다.
    if (!isDraggingRef.current) {
      onChange(data.id, {
        position: [groupObj.position.x, groupObj.position.y, groupObj.position.z],
        rotation: [groupObj.rotation.x, groupObj.rotation.y, groupObj.rotation.z],
      });
    }
  };

  return (
    <>
      <group
        ref={groupRef}
        position={data.position}
        rotation={data.rotation}
        onPointerDown={(event) => {
          // 방은 리스트에서만 선택할 수 있도록 3D 클릭은 선택에 영향을 주지 않음
          event.stopPropagation();
        }}
      >
        <RoomMesh
          width={data.width}
          height={data.height}
          depth={data.depth}
          color={data.color}
          wallOpacity={wallOpacity}
          hiddenWalls={{
            front: hiddenWalls.front || autoHiddenWalls.front,
            back:  hiddenWalls.back  || autoHiddenWalls.back,
            left:  hiddenWalls.left  || autoHiddenWalls.left,
            right: hiddenWalls.right || autoHiddenWalls.right,
          }}
        />

        {/* 방의 하위 가구들 - 방이 움직이면 함께 움직임 */}
        {furniture.map((item) => (
          <Furniture
            key={item.id}
            data={item}
            room={data}
            siblingFurniture={furniture.filter((f) => f.id !== item.id)}
            isSelected={item.id === selectedFurnitureId}
            mode={mode}
            onSelect={onSelect}
            onChange={onChange}
          />
        ))}
      </group>

      {isSelected && (
        <TransformControls
          ref={controlsRef}
          object={groupRef}
          mode={mode}
          showX={mode !== "rotate"}
          showY={mode !== "translate"}
          showZ={mode !== "rotate"}
          rotationSnap={mode === "rotate" ? Math.PI / 4 : undefined}
          onObjectChange={handleChange}
          onMouseDown={() => {
            isDraggingRef.current = true;
            const group = groupRef.current;
            dragStartPosRef.current.copy(group.position);
            dragStartRotRef.current = [
              group.rotation.x,
              group.rotation.y,
              group.rotation.z,
            ];
          }}
          onMouseUp={() => {
            isDraggingRef.current = false;
            const groupObj = groupRef.current;

            if (mode === "scale") {
              // 스케일 값을 실제 방 크기로 변환
              const sx = groupObj.scale.x;
              const sy = groupObj.scale.y;
              const sz = groupObj.scale.z;
              groupObj.scale.set(1, 1, 1);
              onChange(data.id, {
                width: data.width * sx,
                height: data.height * sy,
                depth: data.depth * sz,
              });
            } else {
              onChange(data.id, {
                position: [
                  groupObj.position.x,
                  groupObj.position.y,
                  groupObj.position.z,
                ],
                rotation: [
                  groupObj.rotation.x,
                  groupObj.rotation.y,
                  groupObj.rotation.z,
                ],
              });
            }
          }}
        />
      )}
    </>
  );
}
