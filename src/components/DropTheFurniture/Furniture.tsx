import { useRef, useEffect, useMemo } from "react";
import { Group, Box3, Vector3 } from "three";
import { useThree, createPortal } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { FurnitureItem, Room, PlacedItem, TransformMode } from "./types";
import { resolveCollisions } from "./collision";
import { FURNITURE_DEFAULT_DIMENSIONS, WALL_THICKNESS } from "./constants";
import { activeTransformControls } from "./transformControlsRegistry";

type FurnitureProps = {
  data: FurnitureItem;
  room: Room | null;
  siblingFurniture: FurnitureItem[];
  isSelected: boolean;
  mode: TransformMode;
  onSelect: (id: string) => void;
  onChange: (id: string, updates: Partial<PlacedItem>) => void;
};

export default function Furniture({
  data,
  room,
  siblingFurniture,
  isSelected,
  mode,
  onSelect,
  onChange,
}: FurnitureProps) {
  const groupRef = useRef<Group>(null!);
  const scene = useThree((state) => state.scene);
  // 이 가구가 선택되어 TransformControls가 마운트되면
  // 전역 레지스트리에 컨트롤 인스턴스를 등록/해제한다.
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

  // 지정된 크기가 없으면 기본 크기로 폭백
  const dims = {
    width: data.width || FURNITURE_DEFAULT_DIMENSIONS[data.furnitureType].width,
    depth: data.depth || FURNITURE_DEFAULT_DIMENSIONS[data.furnitureType].depth,
    height:
      data.height || FURNITURE_DEFAULT_DIMENSIONS[data.furnitureType].height,
  };

  const base = FURNITURE_DEFAULT_DIMENSIONS[data.furnitureType];
  const scale: [number, number, number] = useMemo(
    () => [
      dims.width / base.width,
      dims.height / base.height,
      dims.depth / base.depth,
    ],
    [dims.width, dims.height, dims.depth, base]
  );

  // Shift/Ctrl 키 눌림 상태 추적
  const isShiftPressed = useRef(false);
  const isCtrlPressed = useRef(false);

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
    const group = groupRef.current;
    group.position.set(...data.position);
    // 문은 항상 바닥에 붙어 있어야 함
    if (data.furnitureType === "door") {
      group.position.y = 0;
    }
    group.rotation.set(...data.rotation);
    group.scale.set(...scale);
    group.updateMatrix();
    group.updateMatrixWorld();
  }, [data.position, data.rotation, scale, data.furnitureType]);

  const handleChange = () => {
    const groupObj = groupRef.current;

    if (mode === "translate") {
      // Shift를 누른 채 이동하면 이동을 멈추고 드래그 방향에 따라 90도 단위 회전
      if (isShiftPressed.current) {
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

      // 문은 항상 바닥에 붙어 있도록 y만 고정합니다.
      if (data.furnitureType === "door") {
        groupObj.position.y = 0;
      }

      // 수평 이동 시 바닥에 붙이고 방 안에서만 움직이도록 제한
      const box = new Box3().setFromObject(groupObj);
      const size = new Vector3();
      box.getSize(size);

      const halfFx = size.x / 2;
      const halfFz = size.z / 2;

      // 바닥에 붙도록 보정 (방 납부 기준 y=0)
      const bottomOffset = box.min.y;
      groupObj.position.y -= bottomOffset;

      if (room) {
        // 문은 두 방의 벽(200mm)을 뚫고 이웃 방 내부로 20mm 들어갈 수 있음
        const extra = data.furnitureType === "door" ? WALL_THICKNESS * 2 + 20 : 0;

        // 방 벽을 넘지 않도록 가구 중심 좌표를 제한
        const minX = -room.width / 2 - extra + halfFx;
        const maxX = room.width / 2 + extra - halfFx;
        const minZ = -room.depth / 2 - extra + halfFz;
        const maxZ = room.depth / 2 + extra - halfFz;

        const clampPosition = () => {
          groupObj.position.x = Math.max(
            minX,
            Math.min(maxX, groupObj.position.x)
          );
          groupObj.position.z = Math.max(
            minZ,
            Math.min(maxZ, groupObj.position.z)
          );
        };

        const resolveFurniture = () => {
          const tempItem: PlacedItem = {
            ...data,
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
          };
          return resolveCollisions(
            tempItem,
            siblingFurniture,
            groupObj.position.x,
            groupObj.position.z
          );
        };

        // 방 벽 제한과 가구 충돌 해결을 번갈아 수렴할 때까지 반복
        for (let i = 0; i < 5; i++) {
          clampPosition();
          const prevX = groupObj.position.x;
          const prevZ = groupObj.position.z;
          const resolved = resolveFurniture();
          groupObj.position.x = resolved.x;
          groupObj.position.z = resolved.z;
          groupObj.updateMatrix();
          groupObj.updateMatrixWorld();
          if (
            Math.abs(groupObj.position.x - prevX) < 0.01 &&
            Math.abs(groupObj.position.z - prevZ) < 0.01
          ) {
            break;
          }
        }
        clampPosition();
      } else {
        // 소속 방이 없으면 전체 그리드(60m x 60m) 안으로 제한
        groupObj.position.x = Math.max(
          -30000 + halfFx,
          Math.min(30000 - halfFx, groupObj.position.x)
        );
        groupObj.position.z = Math.max(
          -30000 + halfFz,
          Math.min(30000 - halfFz, groupObj.position.z)
        );
      }
    }


    // 드래그 중에는 상태를 저장하지 않고, 마우스를 뗄 때 한 번만 저장합니다.
    // 크기 조절(scale)은 onMouseUp에서 처리합니다.
    if (!isDraggingRef.current && mode !== "scale") {
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
        scale={scale}
        onPointerDown={(event) => {
          // 회전/크기 모드에서 활성 TransformControls의 핸들이 마우스 아래에 있거나
          // 드래그(변형) 중이면 핸들 조작이 우선되도록 다른 가구 선택을 막는다.
          const controls = activeTransformControls.current;
          if (controls && (controls.dragging || controls.axis !== null)) return;
          event.stopPropagation();
          onSelect(data.id);
        }}
      >
        {data.furnitureType === "bed" && <Bed color={data.color} />}
        {data.furnitureType === "chair" && <Chair color={data.color} />}
        {data.furnitureType === "table" && <Table color={data.color} />}
        {data.furnitureType === "sofa" && <Sofa color={data.color} />}
        {data.furnitureType === "bookshelf" && <Bookshelf color={data.color} />}
        {data.furnitureType === "shelf" && <Shelf color={data.color} />}
        {data.furnitureType === "washingMachine" && (
          <WashingMachine color={data.color} />
        )}
        {data.furnitureType === "refrigerator" && (
          <Refrigerator color={data.color} />
        )}
        {data.furnitureType === "door" && <Door color={data.color} />}
      </group>

      {isSelected &&
        createPortal(
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
                onChange(data.id, {
                  width: groupObj.scale.x * base.width,
                  height: groupObj.scale.y * base.height,
                  depth: groupObj.scale.z * base.depth,
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
          />,
          scene
        )}
    </>
  );
}

function Bed({ color }: { color: string }) {
  return (
    <group>
      {/* 매트리스 */}
      <mesh castShadow receiveShadow position={[0, 350, 0]}>
        <boxGeometry args={[2000, 300, 1400]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 침대 헤드 */}
      <mesh castShadow receiveShadow position={[0, 700, -600]}>
        <boxGeometry args={[2000, 700, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 다리 */}
      {[
        [-900, 150, -600],
        [900, 150, -600],
        [-900, 150, 600],
        [900, 150, 600],
      ].map((pos, idx) => (
        <mesh key={idx} castShadow position={pos as [number, number, number]}>
          <boxGeometry args={[100, 300, 100]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ color }: { color: string }) {
  return (
    <group>
      {/* 좌석 */}
      <mesh castShadow receiveShadow position={[0, 450, 0]}>
        <boxGeometry args={[600, 100, 600]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 등받이 */}
      <mesh castShadow receiveShadow position={[0, 850, -250]}>
        <boxGeometry args={[600, 500, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 다리 */}
      {[
        [-250, 225, -250],
        [250, 225, -250],
        [-250, 225, 250],
        [250, 225, 250],
      ].map((pos, idx) => (
        <mesh key={idx} castShadow position={pos as [number, number, number]}>
          <cylinderGeometry args={[30, 30, 450]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
      ))}
    </group>
  );
}

function Table({ color }: { color: string }) {
  return (
    <group>
      {/* 상판 */}
      <mesh castShadow receiveShadow position={[0, 750, 0]}>
        <boxGeometry args={[1400, 100, 800]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 다리 */}
      {[
        [-600, 375, -300],
        [600, 375, -300],
        [-600, 375, 300],
        [600, 375, 300],
      ].map((pos, idx) => (
        <mesh key={idx} castShadow position={pos as [number, number, number]}>
          <boxGeometry args={[80, 750, 80]} />
          <meshStandardMaterial color="#4b5563" />
        </mesh>
      ))}
    </group>
  );
}

function Sofa({ color }: { color: string }) {
  return (
    <group>
      {/* 좌석 */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1800, 400, 800]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 등받이 */}
      <mesh castShadow receiveShadow position={[0, 750, -350]}>
        <boxGeometry args={[1800, 400, 100]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 팔걸이 */}
      <mesh castShadow receiveShadow position={[-850, 550, 0]}>
        <boxGeometry args={[200, 400, 800]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow receiveShadow position={[850, 550, 0]}>
        <boxGeometry args={[200, 400, 800]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Bookshelf({ color }: { color: string }) {
  const w = 900;
  const d = 300;
  const h = 1800;
  const thickness = 20;
  const shelfY = [300, 700, 1100, 1500];
  return (
    <group>
      {/* 옆판 */}
      <mesh castShadow receiveShadow position={[-(w / 2 - thickness / 2), h / 2, 0]}>
        <boxGeometry args={[thickness, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow receiveShadow position={[w / 2 - thickness / 2, h / 2, 0]}>
        <boxGeometry args={[thickness, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 뒷판 */}
      <mesh castShadow receiveShadow position={[0, h / 2, -d / 2 + thickness / 2]}>
        <boxGeometry args={[w, h, thickness]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 선반 */}
      {shelfY.map((y, idx) => (
        <mesh key={idx} castShadow receiveShadow position={[0, y, 0]}>
          <boxGeometry args={[w - thickness * 2, thickness, d - thickness]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function Shelf({ color }: { color: string }) {
  const w = 1000;
  const d = 350;
  const h = 1800;
  const thickness = 25;
  const shelfY = [300, 750, 1200, 1650];
  return (
    <group>
      {/* 옆판 */}
      <mesh castShadow receiveShadow position={[-(w / 2 - thickness / 2), h / 2, 0]}>
        <boxGeometry args={[thickness, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow receiveShadow position={[w / 2 - thickness / 2, h / 2, 0]}>
        <boxGeometry args={[thickness, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 선반 */}
      {shelfY.map((y, idx) => (
        <mesh key={idx} castShadow receiveShadow position={[0, y, 0]}>
          <boxGeometry args={[w - thickness * 2, thickness, d]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

function WashingMachine({ color }: { color: string }) {
  const w = 600;
  const d = 600;
  const h = 850;
  return (
    <group>
      {/* 본체 */}
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 앞문 */}
      <mesh castShadow receiveShadow position={[0, h / 2, d / 2 + 1]}>
        <cylinderGeometry args={[w * 0.32, w * 0.32, 40]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {/* 조작 패널 */}
      <mesh castShadow receiveShadow position={[0, h - 60, d / 2 + 2]}>
        <boxGeometry args={[w * 0.7, 80, 20]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}

function Refrigerator({ color }: { color: string }) {
  const w = 900;
  const d = 700;
  const h = 1800;
  return (
    <group>
      {/* 본체 */}
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 상칸 문 */}
      <mesh castShadow receiveShadow position={[-w / 4, h * 0.72, d / 2 + 1]}>
        <boxGeometry args={[w / 2 - 4, h * 0.52, 20]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 하칸 문 */}
      <mesh castShadow receiveShadow position={[-w / 4, h * 0.24, d / 2 + 1]}>
        <boxGeometry args={[w / 2 - 4, h * 0.44, 20]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 손잡이 */}
      <mesh castShadow receiveShadow position={[w * 0.15, h * 0.72, d / 2 + 12]}>
        <boxGeometry args={[20, h * 0.4, 10]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh castShadow receiveShadow position={[w * 0.15, h * 0.24, d / 2 + 12]}>
        <boxGeometry args={[20, h * 0.32, 10]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
    </group>
  );
}

function Door({ color }: { color: string }) {
  const w = 900;
  const h = 2000;
  const d = 240;
  const frameW = 80;
  const slabD = 80;
  return (
    <group>
      {/* 문틀 - 좌측 */}
      <mesh position={[-(w / 2 - frameW / 2), h / 2, 0]}>
        <boxGeometry args={[frameW, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 문틀 - 우측 */}
      <mesh position={[w / 2 - frameW / 2, h / 2, 0]}>
        <boxGeometry args={[frameW, h, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 문틀 - 상단 */}
      <mesh position={[0, h - frameW / 2, 0]}>
        <boxGeometry args={[w, frameW, d]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {/* 문짝 */}
      <mesh position={[0, h / 2 - frameW / 2, slabD / 2]}>
        <boxGeometry args={[w - frameW * 2, h - frameW, slabD]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      {/* 손잡이 */}
      <mesh position={[w / 2 - 120, h / 2, slabD + 15]}>
        <boxGeometry args={[40, 120, 30]} />
        <meshStandardMaterial color="#374151" />
      </mesh>
    </group>
  );
}
