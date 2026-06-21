import { useState, useRef, useCallback, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Header,
  HeaderButtons,
  LeftPanel,
  SectionTitle,
  ButtonGroup,
  Button,
  ColorInput,
  NumberInput,
  TextInput,
  InputRow,
  DimField,
  DimLabel,
  Hint,
  List,
  ListItem,
  ListItemType,
  OpacitySlider,
  Divider,
} from "./styled";
import {
  PlacedItem,
  Room,
  FurnitureItem,
  FurnitureType,
  TransformMode,
} from "./types";
import { findNonOverlappingRoomPosition } from "./collision";
import {
  FURNITURE_DEFAULT_DIMENSIONS,
  TYPE_LABELS,
  MODE_LABELS,
} from "./constants";
import type { CameraState } from "./Scene";

// SSR에서 Three.js를 로드하지 않도록 클라이언트에서만 씬을 렌더링
const Scene = dynamic(() => import("./Scene"), { ssr: false });

const FURNITURE_TYPES: FurnitureType[] = [
  "bed",
  "chair",
  "table",
  "sofa",
  "bookshelf",
  "shelf",
  "washingMachine",
  "refrigerator",
];

const DEFAULT_COLORS: Record<FurnitureType, string> = {
  bed: "#8b5cf6",
  chair: "#f59e0b",
  table: "#10b981",
  sofa: "#3b82f6",
  bookshelf: "#ec4899",
  shelf: "#14b8a6",
  washingMachine: "#94a3b8",
  refrigerator: "#64748b",
  door: "#92400e",
};

const DEFAULT_CAMERA: CameraState = {
  position: [16000, 16000, 16000],
  target: [0, 0, 0],
};

const STATE_KEY = "dtf-state";

function getInitialSavedState() {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

const DEFAULT_ROOM: PlacedItem = {
  id: `room-${Date.now()}`,
  kind: "room",
  name: "방 1",
  width: 8000,
  depth: 8000,
  height: 3000,
  position: [0, 0, 0],
  rotation: [0, 0, 0],
  color: "#a8afb3",
};

export default function DropTheFurniture() {
  // 서버와 클라이언트의 초기 상태를 동일하게 맞춰 hydration 오류를 방지
  const [items, setItems] = useState<PlacedItem[]>([DEFAULT_ROOM]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<TransformMode>("translate");
  const [cameraState, setCameraState] = useState<CameraState>(DEFAULT_CAMERA);
  const [wallOpacity, setWallOpacity] = useState(1);

  // 마지막으로 선택한 방을 기억해서 가구 추가 시 계속 같은 방에 배치
  const lastRoomIdRef = useRef<string | null>(DEFAULT_ROOM.id);

  // 목록에서 드래그 중인 가구 id, 드롭 대상 방 id
  const draggingFurnitureId = useRef<string | null>(null);
  const [dragOverRoomId, setDragOverRoomId] = useState<string | null>(null);

  // 마운트 후 localStorage에 저장된 상태가 있으면 복원
  useEffect(() => {
    const saved = getInitialSavedState();
    if (!saved) return;
    if (Array.isArray(saved.items)) {
      setItems(saved.items);
      setSelectedId(saved.selectedId ?? null);
      setMode(saved.mode ?? "translate");
      setCameraState(saved.camera ?? DEFAULT_CAMERA);
      setWallOpacity(saved.wallOpacity ?? 1);
      const firstRoom = saved.items.find(
        (item: PlacedItem): item is Room => item.kind === "room",
      );
      lastRoomIdRef.current = firstRoom?.id ?? DEFAULT_ROOM.id;
    }
  }, []);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const undoStack = useRef<PlacedItem[][]>([]);
  const redoStack = useRef<PlacedItem[][]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 상태가 바뀔 때마다 localStorage에 실시간 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    const state = {
      items,
      selectedId,
      mode,
      camera: cameraState,
      wallOpacity,
      version: 1,
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [items, selectedId, mode, cameraState, wallOpacity]);

  const syncHistoryState = useCallback(() => {
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  const pushHistory = useCallback(
    (nextItems: PlacedItem[]) => {
      undoStack.current.push(itemsRef.current);
      redoStack.current = [];
      setItems(nextItems);
      syncHistoryState();
    },
    [syncHistoryState],
  );

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return;
    const current = itemsRef.current;
    const prev = undoStack.current.pop()!;
    redoStack.current.push(current);
    setItems(prev);
    syncHistoryState();
  }, [syncHistoryState]);

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    const current = itemsRef.current;
    const next = redoStack.current.pop()!;
    undoStack.current.push(current);
    setItems(next);
    syncHistoryState();
  }, [syncHistoryState]);

  // 키보드 단축키: Ctrl/Cmd + Z (Undo), Ctrl/Cmd + Y 또는 Ctrl/Cmd + Shift + Z (Redo)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCtrl = event.ctrlKey || event.metaKey;
      if (!isCtrl) return;

      if (event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
      } else if (
        event.key.toLowerCase() === "y" ||
        (event.key.toLowerCase() === "z" && event.shiftKey)
      ) {
        event.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const roomCount = items.filter((item) => item.kind === "room").length;
  const furnitureCount = items.filter(
    (item) => item.kind === "furniture",
  ).length;
  const rooms = items.filter((item): item is Room => item.kind === "room");
  const unassignedFurniture = items.filter(
    (item): item is FurnitureItem => item.kind === "furniture" && !item.roomId,
  );
  const selectedItem = items.find((item) => item.id === selectedId);
  const isRoomSelected = selectedItem?.kind === "room";

  useEffect(() => {
    if (selectedItem?.kind === "room") {
      lastRoomIdRef.current = selectedItem.id;
    }
  }, [selectedItem]);

  const addRoom = useCallback(() => {
    const id = `room-${Date.now()}`;
    const width = 8000;
    const depth = 8000;
    const existingRooms = itemsRef.current.filter(
      (item): item is Room => item.kind === "room",
    );
    const position = findNonOverlappingRoomPosition(
      existingRooms,
      width,
      depth,
    );
    const newRoom: PlacedItem = {
      id,
      kind: "room",
      name: `방 ${roomCount + 1}`,
      width,
      depth,
      height: 3000,
      position,
      rotation: [0, 0, 0],
      color: "#a8afb3",
    };
    pushHistory([...itemsRef.current, newRoom]);
    setSelectedId(id);
  }, [pushHistory, roomCount]);

  const addFurniture = useCallback(
    (type: FurnitureType | "door") => {
      const id = `${type}-${Date.now()}`;
      const targetRoom = (() => {
        if (selectedItem?.kind === "room") return selectedItem;
        if (lastRoomIdRef.current) {
          const found = itemsRef.current.find(
            (item): item is Room =>
              item.kind === "room" && item.id === lastRoomIdRef.current,
          );
          if (found) return found;
        }
        return itemsRef.current.find(
          (item): item is Room => item.kind === "room",
        );
      })();
      const defaults = FURNITURE_DEFAULT_DIMENSIONS[type as FurnitureType];
      const newItem: PlacedItem = {
        id,
        kind: "furniture",
        furnitureType: type as FurnitureType,
        roomId: targetRoom?.id ?? null,
        name: `${TYPE_LABELS[type as FurnitureType]} ${furnitureCount + 1}`,
        width: defaults.width,
        depth: defaults.depth,
        height: defaults.height,
        position: targetRoom
          ? [0, type === "door" ? 0 : 10, 0]
          : [0, type === "door" ? 0 : 10, 0],
        rotation: [0, 0, 0],
        color: DEFAULT_COLORS[type as FurnitureType],
      };
      pushHistory([...itemsRef.current, newItem]);
      setSelectedId(id);
    },
    [pushHistory, furnitureCount, selectedItem],
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<PlacedItem>) => {
      const next = itemsRef.current.map((item) =>
        item.id === id ? ({ ...item, ...updates } as PlacedItem) : item,
      );
      pushHistory(next);
    },
    [pushHistory],
  );

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    const selected = itemsRef.current.find((item) => item.id === selectedId);
    if (selected?.kind === "room") {
      // 방을 삭제하면 소속 가구도 함께 삭제
      pushHistory(
        itemsRef.current.filter(
          (item) =>
            !(item.kind === "furniture" && item.roomId === selectedId) &&
            item.id !== selectedId,
        ),
      );
    } else {
      pushHistory(itemsRef.current.filter((item) => item.id !== selectedId));
    }
    setSelectedId(null);
  }, [pushHistory, selectedId]);

  const handleSave = useCallback(() => {
    const data = {
      items,
      camera: cameraState,
      wallOpacity,
      version: 1,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `drop-the-furniture-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [items, cameraState, wallOpacity]);

  const handleLoad = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = JSON.parse(e.target?.result as string);
          if (!Array.isArray(result.items) || !result.camera) {
            window.alert("올바르지 않은 파일 형식입니다.");
            return;
          }
          // 이전 저장 파일 호환: scale 기반 가구라면 크기로 변환
          const migratedItems = result.items.map((item: any) => {
            if (item.kind !== "furniture") return item;
            const defaults =
              FURNITURE_DEFAULT_DIMENSIONS[item.furnitureType as FurnitureType];
            if (!defaults) return item;
            const hasDims =
              typeof item.width === "number" &&
              typeof item.depth === "number" &&
              typeof item.height === "number";
            if (hasDims) return item;
            if (Array.isArray(item.scale) && item.scale.length === 3) {
              return {
                ...item,
                width: defaults.width * item.scale[0],
                depth: defaults.depth * item.scale[2],
                height: defaults.height * item.scale[1],
              };
            }
            return {
              ...item,
              width: defaults.width,
              depth: defaults.depth,
              height: defaults.height,
            };
          });
          pushHistory(migratedItems);
          setCameraState(result.camera);
          setWallOpacity(result.wallOpacity ?? 1);
          setSelectedId(null);
        } catch {
          window.alert("JSON 파싱에 실패했습니다.");
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    },
    [pushHistory],
  );

  const handleNew = useCallback(() => {
    if (undoStack.current?.length > 0 || redoStack.current?.length > 0) {
      handleSave();
    }
    const defaultRoom: PlacedItem = {
      id: `room-${Date.now()}`,
      kind: "room",
      name: "방 1",
      width: 8000,
      depth: 8000,
      height: 3000,
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      color: "#a8afb3",
    };
    undoStack.current = [];
    redoStack.current = [];
    setItems([defaultRoom]);
    setSelectedId(null);
    setMode("translate");
    setCameraState(DEFAULT_CAMERA);
    setWallOpacity(1);
    lastRoomIdRef.current = defaultRoom.id;
    if (typeof window !== "undefined") {
      localStorage.removeItem(STATE_KEY);
    }
    syncHistoryState();
  }, [syncHistoryState, handleSave]);

  return (
    <Container>
      <Header>
        <div>
          <h1>Drop the Furniture</h1>
          <p>방과 가구를 자유롭게 배치핼보세요.</p>
        </div>
        <HeaderButtons>
          <Button onClick={handleNew}>🗑️ New</Button>
          <OpacitySlider
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={wallOpacity}
            onChange={(event) => setWallOpacity(parseFloat(event.target.value))}
            title="벽 투명도"
          />
          <Button onClick={undo} disabled={!canUndo}>
            ↩ Undo
          </Button>
          <Button onClick={redo} disabled={!canRedo}>
            ↪ Redo
          </Button>
          <Button onClick={handleSave}>💾 저장</Button>
          <Button onClick={() => fileInputRef.current?.click()}>
            📂 불러오기
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={handleLoad}
          />
        </HeaderButtons>
      </Header>

      <LeftPanel>
        <SectionTitle>방 추가</SectionTitle>
        <ButtonGroup>
          <Button onClick={addRoom}>방 추가</Button>
          <Button onClick={() => addFurniture("door")}>🚪 문</Button>
        </ButtonGroup>

        <Divider />

        <SectionTitle>가구 추가</SectionTitle>
        <ButtonGroup>
          {FURNITURE_TYPES.map((type) => (
            <Button key={type} onClick={() => addFurniture(type)}>
              {TYPE_LABELS[type]}
            </Button>
          ))}
        </ButtonGroup>
        <Hint>버튼을 누르면 방 중앙에 방/가구/문이 생성됩니다.</Hint>

        <Divider />

        <SectionTitle>목록 (클릭해서 선택)</SectionTitle>
        <List>
          {rooms.map((room) => {
            const roomFurniture = items.filter(
              (item): item is FurnitureItem =>
                item.kind === "furniture" && item.roomId === room.id,
            );
            return (
              <Fragment key={room.id}>
                <ListItem
                  $selected={room.id === selectedId}
                  $kind="room"
                  $dragOver={dragOverRoomId === room.id}
                  onClick={() => setSelectedId(room.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggingFurnitureId.current) setDragOverRoomId(room.id);
                  }}
                  onDragLeave={() => setDragOverRoomId(null)}
                  onDrop={() => {
                    const furnitureId = draggingFurnitureId.current;
                    if (!furnitureId) return;
                    updateItem(furnitureId, {
                      roomId: room.id,
                      position: [0, 10, 0],
                    });
                    draggingFurnitureId.current = null;
                    setDragOverRoomId(null);
                  }}
                >
                  <span>{room.name}</span>
                  <ListItemType>방</ListItemType>
                </ListItem>
                {roomFurniture.map((furniture) => (
                  <ListItem
                    key={furniture.id}
                    $selected={furniture.id === selectedId}
                    $kind="furniture"
                    $indent={1}
                    draggable
                    onClick={() => setSelectedId(furniture.id)}
                    onDragStart={() => {
                      draggingFurnitureId.current = furniture.id;
                    }}
                    onDragEnd={() => {
                      draggingFurnitureId.current = null;
                      setDragOverRoomId(null);
                    }}
                  >
                    <span>{furniture.name}</span>
                    <ListItemType>
                      {TYPE_LABELS[furniture.furnitureType]}
                    </ListItemType>
                  </ListItem>
                ))}
              </Fragment>
            );
          })}
          {unassignedFurniture.map((furniture) => (
            <ListItem
              key={furniture.id}
              $selected={furniture.id === selectedId}
              $kind="furniture"
              draggable
              onClick={() => setSelectedId(furniture.id)}
              onDragStart={() => {
                draggingFurnitureId.current = furniture.id;
              }}
              onDragEnd={() => {
                draggingFurnitureId.current = null;
                setDragOverRoomId(null);
              }}
            >
              <span>{furniture.name}</span>
              <ListItemType>
                {TYPE_LABELS[furniture.furnitureType]}
              </ListItemType>
            </ListItem>
          ))}
        </List>

        {!selectedItem && (
          <Hint>목록에서 항목을 클릭하면 선택해서 편집할 수 있습니다.</Hint>
        )}

        {selectedItem && (
          <>
            <Divider />

            <SectionTitle>편집 도구</SectionTitle>
            <ButtonGroup $nowrap>
              {(["translate", "rotate", "scale"] as TransformMode[]).map(
                (m) => (
                  <Button
                    key={m}
                    $active={mode === m}
                    onClick={() => setMode(m)}
                  >
                    {MODE_LABELS[m]}
                  </Button>
                ),
              )}
            </ButtonGroup>

            <TextInput
              type="text"
              value={selectedItem.name}
              onChange={(event) =>
                updateItem(selectedItem.id, { name: event.target.value })
              }
            />

            <ColorInput
              type="color"
              value={selectedItem.color}
              onChange={(event) =>
                updateItem(selectedItem.id, { color: event.target.value })
              }
            />

            {selectedItem.kind === "room" && (
              <InputRow>
                <DimField>
                  <DimLabel>W</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={100}
                    value={selectedItem.width}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        width: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
                <DimField>
                  <DimLabel>D</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={100}
                    value={selectedItem.depth}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        depth: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
                <DimField>
                  <DimLabel>H</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={100}
                    value={selectedItem.height}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        height: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
              </InputRow>
            )}

            {selectedItem.kind === "furniture" && (
              <InputRow>
                <DimField>
                  <DimLabel>W</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={10}
                    value={selectedItem.width}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        width: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
                <DimField>
                  <DimLabel>D</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={10}
                    value={selectedItem.depth}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        depth: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
                <DimField>
                  <DimLabel>H</DimLabel>
                  <NumberInput
                    type="number"
                    min={100}
                    step={10}
                    value={selectedItem.height}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        height: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                </DimField>
              </InputRow>
            )}

            <Button $danger onClick={deleteSelected}>삭제</Button>
          </>
        )}
      </LeftPanel>

      <Scene
        items={items}
        selectedId={selectedId}
        mode={mode}
        cameraState={cameraState}
        wallOpacity={wallOpacity}
        onSelect={setSelectedId}
        onChange={updateItem}
        onCameraChange={setCameraState}
      />
    </Container>
  );
}
