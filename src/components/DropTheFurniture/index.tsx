import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Fragment,
  startTransition,
} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Select, { StylesConfig } from "react-select";
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
  DimInputWrapper,
  DimInlineLabel,
  Hint,
  List,
  ListItem,
  ListItemType,
  RoomChildren,
  OpacitySlider,
  Divider,
  Toolbar,
  ToolbarDivider,
  ColorInputWrap,
  MenuButton,
  HeaderToggleButton,
  CollapseToggle,
  RoomName,
  CollapseAllButton,
  CollapseAllGroup,
} from "./styled";
import {
  PlacedItem,
  Room,
  FurnitureItem,
  ModelItem,
  FurnitureType,
  ModelType,
  TransformMode,
} from "./types";
import { findNonOverlappingRoomPosition } from "./collision";
import {
  FURNITURE_DEFAULT_DIMENSIONS,
  MODEL_DEFAULT_DIMENSIONS,
  TYPE_LABELS,
  MODEL_LABELS,
  MODEL_ANIMATIONS,
  ANIMATION_LABELS,
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

const MODEL_TYPES: ModelType[] = [
  "fountain",
  "donkey",
  "dog",
  "couch",
  "badDouble",
  "bookcase2",
  "chair2",
  "door2",
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

const DEFAULT_MODEL_COLORS: Record<ModelType, string> = {
  fountain: "#06b6d4",
  donkey: "#a78bfa",
  dog: "#fbbf24",
  couch: "#f59e0b",
  badDouble: "#ef4444",
  bookcase2: "#ec4899",
  chair2: "#f59e0b",
  door2: "#92400e",
};

const DEFAULT_CAMERA: CameraState = {
  position: [16000, 16000, 16000],
  target: [0, 0, 0],
};

const STATE_KEY = "dtf-state";

// react-select 다크 테마 스타일 (Toolbar의 다른 입력 요소와 통일)
const selectStyles: StylesConfig<{ value: string; label: string }, false> = {
  container: (base) => ({
    ...base,
    width: "150px",
  }),
  control: (base) => ({
    ...base,
    background: "#27272a",
    borderColor: "#52525b",
    borderRadius: "8px",
    minHeight: "34px",
    boxShadow: "none",
    cursor: "pointer",
    fontSize: "13px",
    ":hover": { borderColor: "#71717a" },
  }),
  singleValue: (base) => ({ ...base, color: "#ffffff" }),
  input: (base) => ({ ...base, color: "#ffffff" }),
  menu: (base) => ({
    ...base,
    background: "#27272a",
    border: "1px solid #52525b",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 30,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? "#3f3f46"
        : "#27272a",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
  }),
  indicatorSeparator: (base) => ({ ...base, background: "#52525b" }),
  dropdownIndicator: (base) => ({ ...base, color: "#a1a1aa" }),
};

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
  // ──────────────────────────────────────────────
  // 1. State & Ref 변수
  // ──────────────────────────────────────────────
  // SSR과 클라이언트 초기 렌더가 동일하도록 정적 기본값 사용
  const [items, setItems] = useState<PlacedItem[]>([DEFAULT_ROOM]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<TransformMode>("translate");
  const [cameraState, setCameraState] = useState<CameraState>(DEFAULT_CAMERA);
  const [wallOpacity, setWallOpacity] = useState(1);
  const [autoTransparent, setAutoTransparent] = useState(false);
  const [dragOverRoomId, setDragOverRoomId] = useState<string | null>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [headerOpen, setHeaderOpen] = useState(false);
  // 목록에서 접힌 방 id 집합
  const [collapsedRooms, setCollapsedRooms] = useState<Set<string>>(
    () => new Set(),
  );
  const panelRef = useRef<HTMLDivElement>(null);

  // 마지막으로 선택한 방을 기억해서 가구 추가 시 계속 같은 방에 배치
  const lastRoomIdRef = useRef<string | null>(DEFAULT_ROOM.id);

  // 목록에서 드래그 중인 가구 id, 드롭 대상 방 id
  const draggingFurnitureId = useRef<string | null>(null);
  const itemsRef = useRef(items);
  const undoStack = useRef<PlacedItem[][]>([]);
  const redoStack = useRef<PlacedItem[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ──────────────────────────────────────────────
  // 2. Callback / Handler 함수
  // ──────────────────────────────────────────────
  const syncHistoryState = useCallback(() => {
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  // 선택 해제 시 변환 모드를 이동으로 초기화
  const handleSelect = useCallback((id: string | null) => {
    setSelectedId(id);
    if (id === null) {
      setMode("translate");
    }
  }, []);

  // 목록에서 방 하위 항목 펼치기/접기
  const toggleRoomCollapse = useCallback((roomId: string) => {
    setCollapsedRooms((prev) => {
      const next = new Set(prev);
      if (next.has(roomId)) next.delete(roomId);
      else next.add(roomId);
      return next;
    });
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
      cameraState.target,
      cameraState.position,
    );
    const roomCount = itemsRef.current.filter(
      (item) => item.kind === "room",
    ).length;
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
    handleSelect(id);
  }, [pushHistory, handleSelect, cameraState]);

  const addSpace = useCallback(() => {
    const id = `room-${Date.now()}`;
    // 복도용 기본 크기: 좁고 길게
    const width = 2400;
    const depth = 8000;
    const existingRooms = itemsRef.current.filter(
      (item): item is Room => item.kind === "room",
    );
    const position = findNonOverlappingRoomPosition(
      existingRooms,
      width,
      depth,
      cameraState.target,
      cameraState.position,
    );
    const spaceCount = itemsRef.current.filter(
      (item) => item.kind === "room" && item.hasWalls === false,
    ).length;
    const newSpace: PlacedItem = {
      id,
      kind: "room",
      name: `공간 ${spaceCount + 1}`,
      width,
      depth,
      height: 3000,
      position,
      rotation: [0, 0, 0],
      color: "#a8afb3",
      hasWalls: false,
    };
    pushHistory([...itemsRef.current, newSpace]);
    handleSelect(id);
  }, [pushHistory, handleSelect, cameraState]);

  const addFurniture = useCallback(
    (type: FurnitureType | "door") => {
      const id = `${type}-${Date.now()}`;
      const selectedItem =
        itemsRef.current.find((i) => i.id === selectedId) ?? null;
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
      const furnitureCount = itemsRef.current.filter(
        (item) => item.kind === "furniture",
      ).length;
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
      handleSelect(id);
    },
    [pushHistory, selectedId, handleSelect],
  );

  const addModel = useCallback(
    (type: ModelType) => {
      const id = `${type}-${Date.now()}`;
      const selectedItem =
        itemsRef.current.find((i) => i.id === selectedId) ?? null;
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
      const defaults = MODEL_DEFAULT_DIMENSIONS[type];
      const modelCount = itemsRef.current.filter(
        (item) => item.kind === "model",
      ).length;
      const newItem: PlacedItem = {
        id,
        kind: "model",
        modelType: type,
        roomId: targetRoom?.id ?? null,
        name: `${MODEL_LABELS[type]} ${modelCount + 1}`,
        width: defaults.width,
        depth: defaults.depth,
        height: defaults.height,
        position: [0, 10, 0],
        rotation: [0, 0, 0],
        color: DEFAULT_MODEL_COLORS[type],
      };
      pushHistory([...itemsRef.current, newItem]);
      handleSelect(id);
    },
    [pushHistory, selectedId, handleSelect],
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
      // 방을 삭제하면 소속 가구/모델도 함께 삭제
      pushHistory(
        itemsRef.current.filter(
          (item) =>
            !(
              (item.kind === "furniture" || item.kind === "model") &&
              item.roomId === selectedId
            ) && item.id !== selectedId,
        ),
      );
    } else {
      pushHistory(itemsRef.current.filter((item) => item.id !== selectedId));
    }
    handleSelect(null);
  }, [pushHistory, selectedId, handleSelect]);

  // 이전 저장 파일 호환: scale 기반 가구라면 크기로 변환
  const migrateItems = useCallback((rawItems: any[]): PlacedItem[] => {
    return rawItems.map((item: any) => {
      if (item.kind === "model") {
        const defaults = MODEL_DEFAULT_DIMENSIONS[item.modelType as ModelType];
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
      }
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
  }, []);

  // 방 1개에 가구/모델이 없는 빈 상태인지 판정
  const isEmptyLayout = useCallback((items: PlacedItem[]): boolean => {
    const rooms = items.filter((i) => i.kind === "room");
    const others = items.filter((i) => i.kind !== "room");
    return rooms.length <= 1 && others.length === 0;
  }, []);

  const handleSave = useCallback(() => {
    const data = {
      items,
      camera: cameraState,
      wallOpacity,
      autoTransparent,
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
  }, [items, cameraState, wallOpacity, autoTransparent]);

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
          const migratedItems = migrateItems(result.items);
          pushHistory(migratedItems);
          setCameraState(result.camera);
          setWallOpacity(result.wallOpacity ?? 1);
          setAutoTransparent(result.autoTransparent ?? false);
          handleSelect(null);
        } catch {
          window.alert("JSON 파싱에 실패했습니다.");
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    },
    [pushHistory, handleSelect, migrateItems],
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
    handleSelect(null);
    setCameraState(DEFAULT_CAMERA);
    setWallOpacity(0.5);
    lastRoomIdRef.current = defaultRoom.id;
    if (typeof window !== "undefined") {
      localStorage.removeItem(STATE_KEY);
    }
    syncHistoryState();
  }, [syncHistoryState, handleSave, handleSelect]);

  // ──────────────────────────────────────────────
  // 3. useEffect (라이프사이클)
  // ──────────────────────────────────────────────
  // 마운트 후(클라이언트에서만) localStorage 복원 — hydration 완료 후 실행됨
  // 저장된 레이아웃이 없거나 빈 상태(방 1개+가구 없음)면 sample_layout.json을 불러옵니다.
  useEffect(() => {
    const applyState = (data: {
      items: PlacedItem[];
      camera?: CameraState;
      wallOpacity?: number;
      autoTransparent?: boolean;
      selectedId?: string | null;
      mode?: TransformMode;
    }) => {
      const firstRoom = data.items.find(
        (item: PlacedItem) => item.kind === "room",
      );
      lastRoomIdRef.current = firstRoom?.id ?? DEFAULT_ROOM.id;
      startTransition(() => {
        setItems(data.items);
        setSelectedId(data.selectedId ?? null);
        setMode(data.mode ?? "translate");
        setCameraState(data.camera ?? DEFAULT_CAMERA);
        setWallOpacity(data.wallOpacity ?? 1);
        setAutoTransparent(data.autoTransparent ?? false);
      });
    };

    const saved = getInitialSavedState();
    if (saved && Array.isArray(saved.items) && !isEmptyLayout(saved.items)) {
      applyState({
        items: migrateItems(saved.items),
        camera: saved.camera,
        wallOpacity: saved.wallOpacity,
        autoTransparent: saved.autoTransparent,
        selectedId: saved.selectedId,
        mode: saved.mode,
      });
      return;
    }

    // 저장된 레이아웃이 없거나 빈 상태면 sample_layout.json 불러오기
    fetch("/sample_layout.json")
      .then((res) => res.json())
      .then((result) => {
        if (!Array.isArray(result.items)) return;
        applyState({
          items: migrateItems(result.items),
          camera: result.camera,
          wallOpacity: result.wallOpacity,
          autoTransparent: result.autoTransparent,
        });
      })
      .catch(() => {
        // sample_layout.json 로드 실패 시 기본 방 유지
      });
  }, [isEmptyLayout, migrateItems]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // 상태가 바뀔 때마다 localStorage에 실시간 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    const state = {
      items,
      selectedId,
      mode,
      camera: cameraState,
      wallOpacity,
      autoTransparent,
      version: 1,
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [items, selectedId, mode, cameraState, wallOpacity, autoTransparent]);

  useEffect(() => {
    const item = items.find((i) => i.id === selectedId);
    if (item?.kind === "room") {
      lastRoomIdRef.current = item.id;
    }
  }, [items, selectedId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedId) {
          event.preventDefault();
          handleSelect(null);
        }
        return;
      }

      if (event.key === "Delete" || event.key === "Backspace") {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        ) {
          return;
        }

        if (selectedId) {
          event.preventDefault();
          deleteSelected();
          return;
        }
      }

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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo, selectedId, deleteSelected, handleSelect]);

  // 모바일에서 패널이 열려 있을 때 외부 영역 클릭/터치 시 닫기
  useEffect(() => {
    if (!panelOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setPanelOpen(false);
      }
    };
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [panelOpen]);

  // ──────────────────────────────────────────────
  // 4. Render 관련 조건 변수
  // ──────────────────────────────────────────────
  const roomCount = items.filter((item) => item.kind === "room").length;
  const furnitureCount = items.filter(
    (item) => item.kind === "furniture",
  ).length;
  const rooms = items.filter((item): item is Room => item.kind === "room");
  const unassignedFurniture = items.filter(
    (item): item is FurnitureItem => item.kind === "furniture" && !item.roomId,
  );
  const unassignedModels = items.filter(
    (item): item is ModelItem => item.kind === "model" && !item.roomId,
  );
  const selectedItem = items.find((item) => item.id === selectedId);
  const isRoomSelected = selectedItem?.kind === "room";

  // ──────────────────────────────────────────────
  // 5. Render
  // ──────────────────────────────────────────────
  return (
    <Container>
      <Head>
        <title>Drop the Furniture - 3D 방 &amp; 가구 배치</title>
        <meta
          name="description"
          content="3D 공간에서 방과 가구를 자유롭게 배치하고 편집할 수 있는 Next.js 기반 웹 앱입니다. 방 추가, 가구 배치, 이동/회전/크기 조절, 저장/불러오기 기능을 제공합니다."
        />
        <meta
          name="keywords"
          content="3D 가구 배치, 방 꾸미기, 인테리어 시뮬레이터, Drop the Furniture, Three.js, Next.js, 가구 배치 도구"
        />
        <meta name="author" content="Drop the Furniture" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Drop the Furniture - 3D 방 &amp; 가구 배치"
        />
        <meta
          property="og:description"
          content="3D 공간에서 방과 가구를 자유롭게 배치하고 편집할 수 있는 웹 앱입니다."
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Drop the Furniture - 3D 방 &amp; 가구 배치"
        />
        <meta
          name="twitter:description"
          content="3D 공간에서 방과 가구를 자유롭게 배치하고 편집할 수 있는 웹 앱입니다."
        />
      </Head>
      <Header>
        <MenuButton
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            setPanelOpen((v) => !v);
          }}
        >
          ☰
        </MenuButton>
        <div>
          <h1>Drop the Furniture</h1>
          <p>방과 가구를 자유롭게 배치해보세요.</p>
        </div>
        <HeaderToggleButton onClick={() => setHeaderOpen((v) => !v)}>
          ⋮
        </HeaderToggleButton>
        <HeaderButtons $open={headerOpen}>
          <Button $compact onClick={handleNew}>
            🗑️ New
          </Button>
          <Button $compact onClick={undo} disabled={!canUndo}>
            ↩ Undo
          </Button>
          <Button $compact onClick={redo} disabled={!canRedo}>
            ↪ Redo
          </Button>
          <Button $compact onClick={handleSave}>
            💾 저장
          </Button>
          <Button $compact onClick={() => fileInputRef.current?.click()}>
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

      <LeftPanel ref={panelRef} $open={panelOpen}>
        <SectionTitle>방 추가</SectionTitle>
        <ButtonGroup>
          <Button onClick={addRoom}>방</Button>
          <Button onClick={addSpace}>공간</Button>
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

        <SectionTitle>모델 추가</SectionTitle>
        <ButtonGroup>
          {MODEL_TYPES.map((type) => (
            <Button key={type} onClick={() => addModel(type)}>
              {MODEL_LABELS[type]}
            </Button>
          ))}
        </ButtonGroup>

        <Divider />

        <SectionTitle>설정</SectionTitle>
        <Hint>벽 투명도</Hint>
        <OpacitySlider
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={wallOpacity}
          onChange={(event) => setWallOpacity(parseFloat(event.target.value))}
        />
        <Button
          $compact={true}
          $active={autoTransparent}
          onClick={() => setAutoTransparent((v) => !v)}
        >
          👁 자동 투명
        </Button>

        <Divider />

        <SectionTitle>
          목록
          {rooms.length > 0 && (
            <CollapseAllGroup>
              <CollapseAllButton
                title="모두 펼치기"
                onClick={() => setCollapsedRooms(new Set())}
              >
                ⊞
              </CollapseAllButton>
              <CollapseAllButton
                title="모두 접기"
                onClick={() =>
                  setCollapsedRooms(new Set(rooms.map((r) => r.id)))
                }
              >
                ⊟
              </CollapseAllButton>
            </CollapseAllGroup>
          )}
        </SectionTitle>
        <List>
          {rooms.map((room) => {
            const roomFurniture = items.filter(
              (item): item is FurnitureItem =>
                item.kind === "furniture" && item.roomId === room.id,
            );
            const roomModels = items.filter(
              (item): item is ModelItem =>
                item.kind === "model" && item.roomId === room.id,
            );
            const roomChildren = [...roomFurniture, ...roomModels];
            return (
              <Fragment key={room.id}>
                <ListItem
                  $selected={room.id === selectedId}
                  $kind="room"
                  $dragOver={dragOverRoomId === room.id}
                  onClick={() => handleSelect(room.id)}
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
                  <RoomName>
                    <CollapseToggle
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRoomCollapse(room.id);
                      }}
                    >
                      {collapsedRooms.has(room.id) ? "▸" : "▾"}
                    </CollapseToggle>
                    {room.name}
                  </RoomName>
                  <ListItemType>
                    {room.hasWalls === false ? "공간" : "방"}
                  </ListItemType>
                </ListItem>
                {!collapsedRooms.has(room.id) && (
                  <RoomChildren
                    $dragOver={dragOverRoomId === room.id}
                    $empty={roomChildren.length === 0}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (draggingFurnitureId.current)
                        setDragOverRoomId(room.id);
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
                    {roomChildren.length > 0 ? (
                      roomChildren.map((child) => {
                        const isModel = child.kind === "model";
                        const label = isModel
                          ? MODEL_LABELS[child.modelType]
                          : TYPE_LABELS[child.furnitureType];
                        return (
                          <ListItem
                            key={child.id}
                            $selected={child.id === selectedId}
                            $kind="furniture"
                            $tree
                            draggable
                            onClick={() => handleSelect(child.id)}
                            onDragStart={() => {
                              draggingFurnitureId.current = child.id;
                            }}
                            onDragEnd={() => {
                              draggingFurnitureId.current = null;
                              setDragOverRoomId(null);
                            }}
                          >
                            <span>{child.name}</span>
                            <ListItemType>{label}</ListItemType>
                          </ListItem>
                        );
                      })
                    ) : (
                      <Hint>여기로 드래그</Hint>
                    )}
                  </RoomChildren>
                )}
              </Fragment>
            );
          })}
          {unassignedFurniture.map((furniture) => (
            <ListItem
              key={furniture.id}
              $selected={furniture.id === selectedId}
              $kind="furniture"
              draggable
              onClick={() => handleSelect(furniture.id)}
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
          {unassignedModels.map((model) => (
            <ListItem
              key={model.id}
              $selected={model.id === selectedId}
              $kind="furniture"
              draggable
              onClick={() => handleSelect(model.id)}
              onDragStart={() => {
                draggingFurnitureId.current = model.id;
              }}
              onDragEnd={() => {
                draggingFurnitureId.current = null;
                setDragOverRoomId(null);
              }}
            >
              <span>{model.name}</span>
              <ListItemType>{MODEL_LABELS[model.modelType]}</ListItemType>
            </ListItem>
          ))}
        </List>
        {!selectedItem && (
          <Hint>목록에서 항목을 클릭하면 선택해서 편집할 수 있습니다.</Hint>
        )}
      </LeftPanel>

      {selectedItem && (
        <Toolbar>
          <ButtonGroup $nowrap>
            {(["translate", "rotate", "scale"] as TransformMode[]).map((m) => (
              <Button key={m} $active={mode === m} onClick={() => setMode(m)}>
                {MODE_LABELS[m]}
              </Button>
            ))}
          </ButtonGroup>

          <TextInput
            type="text"
            value={selectedItem.name}
            style={{ width: "130px" }}
            onChange={(event) =>
              updateItem(selectedItem.id, { name: event.target.value })
            }
          />
          <ColorInputWrap>
            <ColorInput
              type="color"
              value={selectedItem.color}
              style={{ width: "36px", padding: 0 }}
              onChange={(event) =>
                updateItem(selectedItem.id, { color: event.target.value })
              }
            />
          </ColorInputWrap>

          {selectedItem.kind === "model" &&
            MODEL_ANIMATIONS[selectedItem.modelType] && (
              <Select<{ value: string; label: string }, false>
                styles={selectStyles}
                value={
                  (
                    selectedItem.animationName
                      ? MODEL_ANIMATIONS[selectedItem.modelType]!.includes(
                          selectedItem.animationName,
                        )
                      : false
                  )
                    ? {
                        value: selectedItem.animationName!,
                        label:
                          ANIMATION_LABELS[selectedItem.animationName!] ??
                          selectedItem.animationName!,
                      }
                    : null
                }
                onChange={(option) =>
                  updateItem(selectedItem.id, {
                    animationName: option?.value || undefined,
                  })
                }
                options={MODEL_ANIMATIONS[selectedItem.modelType]!.map(
                  (name) => ({
                    value: name,
                    label: ANIMATION_LABELS[name] ?? name,
                  }),
                )}
                placeholder="애니메이션"
              />
            )}

          {(selectedItem.kind === "room" ||
            selectedItem.kind === "furniture" ||
            selectedItem.kind === "model") && (
            <InputRow style={{ gap: "6px" }}>
              {(["width", "depth", "height"] as const).map((dim, i) => (
                <DimInputWrapper key={dim} style={{ width: "72px" }}>
                  <NumberInput
                    type="number"
                    min={100}
                    step={selectedItem.kind === "room" ? 100 : 10}
                    value={selectedItem[dim]}
                    onChange={(event) =>
                      updateItem(selectedItem.id, {
                        [dim]: parseFloat(event.target.value) || 1,
                      })
                    }
                  />
                  <DimInlineLabel>{["W", "D", "H"][i]}</DimInlineLabel>
                </DimInputWrapper>
              ))}
            </InputRow>
          )}

          <Button $danger $compact onClick={deleteSelected}>
            삭제
          </Button>
        </Toolbar>
      )}

      <Scene
        items={items}
        selectedId={selectedId}
        mode={mode}
        cameraState={cameraState}
        wallOpacity={wallOpacity}
        autoTransparent={autoTransparent}
        onSelect={handleSelect}
        onChange={updateItem}
        onCameraChange={setCameraState}
      />
    </Container>
  );
}
