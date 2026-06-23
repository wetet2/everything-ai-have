import { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { DoubleSide } from "three";
import RoomObject from "./RoomObject";
import Furniture from "./Furniture";
import {
  PlacedItem,
  Room,
  FurnitureItem,
  ModelItem,
  TransformMode,
} from "./types";

export type CameraState = {
  position: [number, number, number];
  target: [number, number, number];
};

type SceneProps = {
  items: PlacedItem[];
  selectedId: string | null;
  mode: TransformMode;
  cameraState: CameraState;
  wallOpacity: number;
  autoTransparent: boolean;
  onSelect: (id: string | null) => void;
  onChange: (id: string, updates: Partial<PlacedItem>) => void;
  onCameraChange: (state: CameraState) => void;
};

function SceneContent({
  items,
  selectedId,
  mode,
  cameraState,
  wallOpacity,
  autoTransparent,
  onSelect,
  onChange,
  onCameraChange,
}: SceneProps) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    camera.position.set(...cameraState.position);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.set(...cameraState.target);
      controls.update();
    }
  }, [camera, cameraState]);

  const rooms = items.filter((item): item is Room => item.kind === "room");
  const unassignedItems = items.filter(
    (item): item is FurnitureItem | ModelItem =>
      (item.kind === "furniture" || item.kind === "model") && !item.roomId,
  );

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      {/* 주변광을 낮춰 그림자 부분을 더 어둡게 */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[8000, 30000, 8000]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-100000}
        shadow-camera-right={100000}
        shadow-camera-top={100000}
        shadow-camera-bottom={-100000}
        shadow-camera-near={0.5}
        shadow-camera-far={200000}
        shadow-bias={-0.0001}
        shadow-normalBias={5}
      />

      {/* 무한 그리드: 칩셀 1m, 섹션 5m, 화면 내에서는 페이드 없이 항상 보임 */}
      <Grid
        position={[0, 5, 0]}
        cellSize={1000}
        sectionSize={5000}
        cellThickness={0.8}
        sectionThickness={1}
        cellColor="#9ca3af"
        sectionColor="#9ca3af"
        fadeDistance={200000}
        fadeStrength={0}
        infiniteGrid
        followCamera
        side={DoubleSide}
      />

      {rooms.map((room) => (
        <RoomObject
          key={room.id}
          data={room}
          rooms={rooms}
          furniture={items.filter(
            (item): item is FurnitureItem | ModelItem =>
              (item.kind === "furniture" || item.kind === "model") &&
              item.roomId === room.id,
          )}
          isSelected={room.id === selectedId}
          selectedFurnitureId={selectedId}
          mode={mode}
          wallOpacity={wallOpacity}
          autoTransparent={autoTransparent}
          onSelect={onSelect}
          onChange={onChange}
        />
      ))}

      {unassignedItems.map((item) => (
        <Furniture
          key={item.id}
          data={item}
          room={null}
          siblingFurniture={[]}
          isSelected={item.id === selectedId}
          mode={mode}
          onSelect={onSelect}
          onChange={(id, updates) =>
            onChange(id, updates as Partial<PlacedItem>)
          }
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        makeDefault
        onEnd={() => {
          const controls = controlsRef.current;
          onCameraChange({
            position: [camera.position.x, camera.position.y, camera.position.z],
            target: controls
              ? [controls.target.x, controls.target.y, controls.target.z]
              : [0, 0, 0],
          });
        }}
      />
    </>
  );
}

export default function Scene(props: SceneProps) {
  return (
    <Canvas
      shadows="soft"
      camera={{
        position: props.cameraState.position,
        fov: 45,
        near: 10,
        far: 200000,
      }}
      onPointerMissed={() => props.onSelect(null)}
      style={{ width: "100%", height: "100%" }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
