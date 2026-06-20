import { useCallback, useEffect, useRef, useState } from "react";
import { CompactPicker } from "react-color";
import DownloadIcon from "../../../resources/icons/DownloadIcon";
import PenIcon from "../../../resources/icons/PenIcon";
import RectIcon from "../../../resources/icons/RectIcon";
import TextIcon from "../../../resources/icons/TextIcon";
import TrashIcon from "../../../resources/icons/TrashIcon";
import CircleIcon from "../../../resources/icons/CircleIcon";
import SaveIcon from "../../../resources/icons/SaveIcon";
import UndoIcon from "../../../resources/icons/UndoIcon";
import RedoIcon from "../../../resources/icons/RedoIcon";
import * as S from "./styled";

// 이미지 기준 2x4 팔레트 색상
const COLOR_PALETTE = [
  "#000000", // 검정
  "#ffffff", // 흰색
  "#ef4444", // 빨강
  "#FFA500", // 오렌지
  "#22c55e", // 초록
  "#3b82f6", // 파랑
  "#fff635", // 노랑
  "#d946ef", // 마젠타
];

type DrawMode = "pen" | "rect" | "circle" | "text" | "image";

type LoadedImage = {
  data: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const IMAGE_RESIZE_HANDLE_SIZE = 10;
const IMAGE_MIN_SIZE = 20;
const TEXT_OVERLAY_DRAW_OFFSET_X = 7;

type BoardSnapshot = {
  drawingLayer: ImageData;
  images: LoadedImage[];
};

type TextInput = {
  visible: boolean;
  x: number;
  y: number;
  value: string;
};

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawingLayerRef = useRef<HTMLCanvasElement | null>(null);

  // Mac인지 확인
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;

  // 현재 설정
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [fontSize, setFontSize] = useState(24);
  const [mode, setMode] = useState<DrawMode>("pen");
  const [canvasCursor, setCanvasCursor] = useState("crosshair");

  // 색상 선택기 팝업 표시 여부
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  // 이미지 관련 상태
  const [loadedImages, setLoadedImages] = useState<LoadedImage[]>([]);
  const loadedImagesRef = useRef<LoadedImage[]>([]);
  const [draggingImageIndex, setDraggingImageIndex] = useState<number | null>(
    null,
  );
  const [resizingImageIndex, setResizingImageIndex] = useState<number | null>(
    null,
  );
  const [activeResizeHandle, setActiveResizeHandle] =
    useState<ResizeHandle | null>(null);
  const [outlineDashOffset, setOutlineDashOffset] = useState(0);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const lastTouchTapRef = useRef<{ time: number; imageIndex: number | null }>({
    time: 0,
    imageIndex: null,
  });
  const touchMovedRef = useRef(false);
  const touchStartImageIndexRef = useRef<number | null>(null);
  const resizeStartRef = useRef({
    x: 0,
    y: 0,
    imageX: 0,
    imageY: 0,
    imageWidth: 0,
    imageHeight: 0,
  });
  const penCursorRef = useRef({ x: 0, y: 0, visible: false });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 텍스트 입력 오버레이 상태
  const [textInput, setTextInput] = useState<TextInput>({
    visible: false,
    x: 0,
    y: 0,
    value: "",
  });
  const textOverlayRef = useRef<HTMLInputElement>(null);
  // 텍스트 입력 오버레이 드래그 상태
  const isDraggingTextRef = useRef(false);
  const textDragStartRef = useRef({ x: 0, y: 0, inputX: 0, inputY: 0 });
  // 텍스트 입력창 동적 너비 (px)
  const [textInputWidth, setTextInputWidth] = useState(80);

  // 현재 폰트 기준으로 텍스트 너비 측정
  const measureTextWidth = useCallback(
    (text: string) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return 80;
      ctx.font = `${fontSize}px sans-serif`;
      // 패딩(12px) + 커서 여유(16px) 포함
      return Math.max(80, ctx.measureText(text).width + 28);
    },
    [fontSize],
  );

  // Undo / Redo 스택: 드로잉 레이어 + 이미지 상태 저장
  const undoStack = useRef<BoardSnapshot[]>([]);
  const redoStack = useRef<BoardSnapshot[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // 드로잉 상태
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  // 직사각형 그릴 때 배경 스냅샷 (실시간 프리뷰용)
  const rectSnapshot = useRef<ImageData | null>(null);
  // Shift 키 눌림 상태 추적
  const isShiftPressed = useRef(false);

  // 현재 브러시/텍스트 색상
  const getDrawColor = useCallback(() => color, [color]);

  // 스택 상태를 React state에 동기화
  const syncStackState = useCallback(() => {
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  // 이미지 배열을 얕게 복사 (HTMLImageElement는 참조 유지)
  const cloneImages = useCallback(
    (images: LoadedImage[]): LoadedImage[] => images.map((img) => ({ ...img })),
    [],
  );

  // 이미지 조작 가능 상태를 시각적으로 표시하는 가이드 테두리
  const drawImageGuide = useCallback(
    (ctx: CanvasRenderingContext2D, img: LoadedImage, isActive: boolean) => {
      const pad = 4;
      const x = img.x - pad;
      const y = img.y - pad;
      const w = img.width + pad * 2;
      const h = img.height + pad * 2;
      const hs = IMAGE_RESIZE_HANDLE_SIZE;
      const handles: Array<{ x: number; y: number }> = [
        { x, y },
        { x: x + w / 2, y },
        { x: x + w, y },
        { x: x + w, y: y + h / 2 },
        { x: x + w, y: y + h },
        { x: x + w / 2, y: y + h },
        { x, y: y + h },
        { x, y: y + h / 2 },
      ];

      ctx.save();

      // 은은한 하이라이트 배경
      ctx.fillStyle = isActive
        ? "rgba(59, 130, 246, 0.12)"
        : "rgba(59, 130, 246, 0.06)";
      ctx.fillRect(x, y, w, h);

      // 점선 느낌의 외곽선
      ctx.setLineDash(isActive ? [8, 5] : [6, 5]);
      ctx.lineDashOffset = -outlineDashOffset;
      ctx.lineWidth = 2;
      ctx.strokeStyle = isActive
        ? "rgba(30, 64, 175, 1)"
        : "rgba(59, 130, 246, 0.8)";
      ctx.strokeRect(x, y, w, h);

      // 리사이즈 핸들 (외곽선과 달리 실선으로 표시)
      ctx.setLineDash([]);
      handles.forEach((handle) => {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = isActive
          ? "rgba(30, 64, 175, 1)"
          : "rgba(59, 130, 246, 0.8)";
        ctx.lineWidth = 2;
        ctx.rect(handle.x - hs / 2, handle.y - hs / 2, hs, hs);
        ctx.fill();
        ctx.stroke();
      });

      ctx.restore();
    },
    [outlineDashOffset],
  );

  const getResizeCursor = useCallback((handle: ResizeHandle): string => {
    if (handle === "n" || handle === "s") return "ns-resize";
    if (handle === "e" || handle === "w") return "ew-resize";
    if (handle === "ne" || handle === "sw") return "nesw-resize";
    return "nwse-resize";
  }, []);

  // 특정 이미지의 리사이즈 핸들 영역 계산
  const getResizeHandleRects = useCallback((img: LoadedImage) => {
    const pad = 4;
    const x = img.x - pad;
    const y = img.y - pad;
    const w = img.width + pad * 2;
    const h = img.height + pad * 2;
    const hs = IMAGE_RESIZE_HANDLE_SIZE;
    const hh = hs / 2;

    return {
      nw: { x: x - hh, y: y - hh, w: hs, h: hs },
      n: { x: x + w / 2 - hh, y: y - hh, w: hs, h: hs },
      ne: { x: x + w - hh, y: y - hh, w: hs, h: hs },
      e: { x: x + w - hh, y: y + h / 2 - hh, w: hs, h: hs },
      se: { x: x + w - hh, y: y + h - hh, w: hs, h: hs },
      s: { x: x + w / 2 - hh, y: y + h - hh, w: hs, h: hs },
      sw: { x: x - hh, y: y + h - hh, w: hs, h: hs },
      w: { x: x - hh, y: y + h / 2 - hh, w: hs, h: hs },
    } as Record<ResizeHandle, { x: number; y: number; w: number; h: number }>;
  }, []);

  // 클릭한 위치가 리사이즈 핸들인지 확인 (최상위 이미지 우선)
  const getResizeHandleAtPosition = useCallback(
    (x: number, y: number) => {
      for (let i = loadedImages.length - 1; i >= 0; i--) {
        const rects = getResizeHandleRects(loadedImages[i]);
        const handles: ResizeHandle[] = [
          "nw",
          "n",
          "ne",
          "e",
          "se",
          "s",
          "sw",
          "w",
        ];
        for (const handle of handles) {
          const r = rects[handle];
          if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            return { imageIndex: i, handle };
          }
        }
      }
      return null;
    },
    [loadedImages, getResizeHandleRects],
  );

  // 펜 모드에서 현재 브러시 굵기를 미리 보여주는 커서 프리뷰
  const drawPenCursorPreview = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      const radius = Math.max(1, lineWidth / 2);

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);

      // 배경과 대비되는 이중 외곽선을 사용해 어떤 색에서도 잘 보이게 처리
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.restore();
    },
    [lineWidth, color],
  );

  // 메인 캔버스에 현재 장면을 다시 합성 렌더링
  const renderScene = useCallback(
    (images?: LoadedImage[]) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const drawingLayer = drawingLayerRef.current;
      if (!drawingLayer) return;

      const targetImages = images ?? loadedImagesRef.current;

      // 배경과 드로잉 레이어는 1:1 픽셀 매핑으로 합성 (변환 초기화)
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(drawingLayer, 0, 0);
      ctx.restore();

      targetImages.forEach((img) => {
        ctx.drawImage(img.data, img.x, img.y, img.width, img.height);
      });

      // 이미지 모드에서는 조작 가능한 이미지 가이드 표시
      if (mode === "image") {
        targetImages.forEach((img, idx) => {
          drawImageGuide(
            ctx,
            img,
            idx === draggingImageIndex || idx === resizingImageIndex,
          );
        });
      }

      if (mode === "pen" && penCursorRef.current.visible) {
        drawPenCursorPreview(
          ctx,
          penCursorRef.current.x,
          penCursorRef.current.y,
        );
      }
    },
    [
      mode,
      drawImageGuide,
      draggingImageIndex,
      resizingImageIndex,
      drawPenCursorPreview,
    ],
  );

  // 현재 상태를 스냅샷으로 생성
  const makeSnapshot = useCallback((): BoardSnapshot | null => {
    const drawingLayer = drawingLayerRef.current;
    if (!drawingLayer) return null;
    const drawingCtx = drawingLayer.getContext("2d");
    if (!drawingCtx) return null;

    return {
      drawingLayer: drawingCtx.getImageData(
        0,
        0,
        drawingLayer.width,
        drawingLayer.height,
      ),
      images: cloneImages(loadedImagesRef.current),
    };
  }, [cloneImages]);

  // 현재 캔버스 상태를 undo 스택에 저장
  const saveState = useCallback(() => {
    const snapshot = makeSnapshot();
    if (!snapshot) return;
    undoStack.current.push(snapshot);
    // 새로운 액션이 발생하면 redo 스택 초기화
    redoStack.current = [];
    syncStackState();
  }, [makeSnapshot, syncStackState]);

  // 떠있는 이미지 레이어를 드로잉 레이어에 병합해 고정
  const commitFloatingImagesToDrawingLayer = useCallback(
    (switchToPen = false) => {
      const images = loadedImagesRef.current;
      if (images.length === 0) {
        setDraggingImageIndex(null);
        if (switchToPen) {
          setMode("pen");
        }
        return;
      }

      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      saveState();
      images.forEach((img) => {
        drawingCtx.drawImage(img.data, img.x, img.y, img.width, img.height);
      });

      loadedImagesRef.current = [];
      setLoadedImages([]);
      setDraggingImageIndex(null);
      setResizingImageIndex(null);
      setActiveResizeHandle(null);
      renderScene([]);

      if (switchToPen) {
        setMode("pen");
      }
    },
    [saveState, renderScene],
  );

  // 스냅샷 상태 복원
  const restoreSnapshot = useCallback(
    (snapshot: BoardSnapshot) => {
      const drawingLayer = drawingLayerRef.current;
      if (!drawingLayer) return;
      const drawingCtx = drawingLayer.getContext("2d");
      if (!drawingCtx) return;

      drawingCtx.putImageData(snapshot.drawingLayer, 0, 0);
      loadedImagesRef.current = cloneImages(snapshot.images);
      setLoadedImages(cloneImages(snapshot.images));
      renderScene(snapshot.images);
    },
    [cloneImages, renderScene],
  );

  useEffect(() => {
    loadedImagesRef.current = loadedImages;
  }, [loadedImages]);

  // 이미지 모드에서 점선 가이드가 살아있는 느낌을 주기 위한 오프셋 애니메이션
  useEffect(() => {
    if (mode !== "image" || loadedImages.length === 0) return;
    const timer = window.setInterval(() => {
      setOutlineDashOffset((prev) => (prev + 1) % 1000);
    }, 90);
    return () => window.clearInterval(timer);
  }, [mode, loadedImages.length]);

  // 가이드 상태 변경 시 화면 재합성
  useEffect(() => {
    renderScene();
  }, [renderScene, outlineDashOffset, mode, draggingImageIndex, loadedImages]);

  // 모드가 펜에서 벗어나면 브러시 커서 프리뷰 숨김
  useEffect(() => {
    if (mode !== "pen" && penCursorRef.current.visible) {
      penCursorRef.current.visible = false;
      renderScene();
    }
  }, [mode, renderScene]);

  // 캔버스/드로잉 레이어 크기를 부모 컨테이너에 맞게 조정
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    if (!drawingLayerRef.current) {
      drawingLayerRef.current = document.createElement("canvas");
    }

    const resize = () => {
      const ctx = canvas.getContext("2d");
      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!ctx || !drawingLayer || !drawingCtx) return;

      const dpr = window.devicePixelRatio || 1;

      // 기존 드로잉 레이어를 임시 캔버스에 복사
      const tempDrawingLayer = document.createElement("canvas");
      tempDrawingLayer.width = drawingLayer.width;
      tempDrawingLayer.height = drawingLayer.height;
      tempDrawingLayer.getContext("2d")?.drawImage(drawingLayer, 0, 0);

      // HiDPI 대응: 캔버스 내적 픽셀 수를 DPR 배로 늘리고 CSS 크기는 그대로 유지
      canvas.width = wrap.clientWidth * dpr;
      canvas.height = wrap.clientHeight * dpr;
      canvas.style.width = `${wrap.clientWidth}px`;
      canvas.style.height = `${wrap.clientHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawingLayer.width = wrap.clientWidth * dpr;
      drawingLayer.height = wrap.clientHeight * dpr;
      drawingCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 드로잉 레이어 내용 복원 (변환을 초기화해서 1:1 픽셀 복사)
      drawingCtx.save();
      drawingCtx.setTransform(1, 0, 0, 1, 0, 0);
      drawingCtx.clearRect(0, 0, drawingLayer.width, drawingLayer.height);
      drawingCtx.drawImage(tempDrawingLayer, 0, 0);
      drawingCtx.restore();

      renderScene();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [renderScene]);

  // 화면 좌표를 캔버스 좌표로 변환
  const getPosFromClient = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  // 마우스 좌표를 캔버스 기준으로 변환
  const getPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) =>
      getPosFromClient(e.clientX, e.clientY),
    [getPosFromClient],
  );

  const loadImageFromFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          // 이미지 크기 조정 (캔버스의 50% 크기로 제한)
          const maxWidth = canvas.width * 0.5;
          const maxHeight = canvas.height * 0.5;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          // 캔버스 중앙에 배치
          const x = (canvas.width - width) / 2;
          const y = (canvas.height - height) / 2;

          // 먼저 현재 상태 저장
          saveState();

          setLoadedImages((prev) => {
            const next = [...prev, { data: img, x, y, width, height }];
            loadedImagesRef.current = next;
            renderScene(next);
            return next;
          });
          setMode("image"); // 이미지 모드로 자동 전환
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [saveState, renderScene],
  );

  // 이미지 파일 로드
  const handleImageLoad = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      loadImageFromFile(file);

      // input 초기화 (같은 파일 다시 선택 가능하도록)
      e.target.value = "";
    },
    [loadImageFromFile],
  );

  const handleCanvasDragOver = useCallback(
    (e: React.DragEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    [],
  );

  const handleCanvasDrop = useCallback(
    (e: React.DragEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const imageFile = Array.from(e.dataTransfer.files).find((file) =>
        file.type.startsWith("image/"),
      );
      if (!imageFile) return;
      loadImageFromFile(imageFile);
    },
    [loadImageFromFile],
  );

  // 클릭한 위치에 이미지가 있는지 확인 (역순으로 확인하여 최상위 이미지 우선)
  const getImageAtPosition = useCallback(
    (x: number, y: number) => {
      for (let i = loadedImages.length - 1; i >= 0; i--) {
        const img = loadedImages[i];
        if (
          x >= img.x &&
          x <= img.x + img.width &&
          y >= img.y &&
          y <= img.y + img.height
        ) {
          return i;
        }
      }
      return null;
    },
    [loadedImages],
  );

  // 텍스트를 캔버스에 확정 렌더링
  const handleTextConfirm = useCallback(
    (value: string, x: number, y: number) => {
      if (!value.trim()) {
        setTextInput({ visible: false, x: 0, y: 0, value: "" });
        return;
      }
      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      saveState();
      drawingCtx.font = `${fontSize}px sans-serif`;
      drawingCtx.fillStyle = getDrawColor();
      drawingCtx.textBaseline = "top";
      // 입력창 중앙이 클릭 위치이므로, 캔버스 텍스트 y는 폰트 높이 절반만큼 위로 보정
      const textOffsetY = -fontSize / 2 + fontSize / 20;
      drawingCtx.fillText(
        value,
        x + TEXT_OVERLAY_DRAW_OFFSET_X,
        y + textOffsetY,
      );
      renderScene();
      setTextInput({ visible: false, x: 0, y: 0, value: "" });
    },
    [fontSize, getDrawColor, saveState, renderScene],
  );

  // 텍스트 입력 오버레이 드래그 시작
  const handleTextPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!textInput.visible) return;
      isDraggingTextRef.current = true;
      (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
      textDragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        inputX: textInput.x,
        inputY: textInput.y,
      };
      // 포커스 이동과 텍스트 선택을 막아 입력 상태를 유지
      e.preventDefault();
    },
    [textInput.visible, textInput.x, textInput.y],
  );

  // 텍스트 입력 오버레이 드래그 중
  const handleTextPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingTextRef.current) return;
      const deltaX = e.clientX - textDragStartRef.current.x;
      const deltaY = e.clientY - textDragStartRef.current.y;
      setTextInput((prev) => ({
        ...prev,
        x: textDragStartRef.current.inputX + deltaX,
        y: textDragStartRef.current.inputY + deltaY,
      }));
    },
    [],
  );

  // 텍스트 입력 오버레이 드래그 종료
  const handleTextPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingTextRef.current) return;
      isDraggingTextRef.current = false;
      (e.target as HTMLDivElement).releasePointerCapture(e.pointerId);
      // 드래그 후에도 입력을 계속할 수 있도록 포커스 유지
      requestAnimationFrame(() => {
        textOverlayRef.current?.focus();
      });
    },
    [],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const pos = getPos(e);

      if (mode === "pen") {
        penCursorRef.current = { x: pos.x, y: pos.y, visible: true };
      }

      if (mode !== "image" && loadedImagesRef.current.length > 0) {
        // 떠있는 이미지가 남아있으면 먼저 확정해서 이후 드로잉이 이미지 위에 보이도록 처리
        commitFloatingImagesToDrawingLayer(false);
      }

      if (mode === "text") {
        // mousedown 기본 동작(포커스 이동)을 막아 TextOverlay의 blur 방지
        e.preventDefault();
        if (textInput.visible) {
          // 기존 텍스트 입력 중이면 먼저 확정
          handleTextConfirm(textInput.value, textInput.x, textInput.y);
          return;
        }
        setTextInput({ visible: true, x: pos.x, y: pos.y, value: "" });
        setTextInputWidth(80);
        return;
      }

      if (mode === "image") {
        const resizeTarget = getResizeHandleAtPosition(pos.x, pos.y);
        if (resizeTarget) {
          saveState();
          setResizingImageIndex(resizeTarget.imageIndex);
          setActiveResizeHandle(resizeTarget.handle);
          setCanvasCursor(getResizeCursor(resizeTarget.handle));
          const img = loadedImages[resizeTarget.imageIndex];
          resizeStartRef.current = {
            x: pos.x,
            y: pos.y,
            imageX: img.x,
            imageY: img.y,
            imageWidth: img.width,
            imageHeight: img.height,
          };
          return;
        }

        // 이미지 드래그 시작
        const imageIndex = getImageAtPosition(pos.x, pos.y);
        if (imageIndex !== null) {
          // 드래그 시작 시점 상태를 undo에 저장
          saveState();

          setDraggingImageIndex(imageIndex);
          setCanvasCursor("grabbing");
          const img = loadedImages[imageIndex];
          dragStartPos.current = { x: pos.x - img.x, y: pos.y - img.y };
        } else if (loadedImagesRef.current.length > 0) {
          // 이미지 바깥 영역 클릭 시 현재 위치로 이미지 고정
          commitFloatingImagesToDrawingLayer(true);
        }
        return;
      }

      // 드로잉 시작 전 현재 상태 저장
      saveState();

      isDrawing.current = true;
      startPos.current = pos;

      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      if (mode === "pen") {
        drawingCtx.beginPath();
        drawingCtx.moveTo(pos.x, pos.y);
      } else if (mode === "rect") {
        // 직사각형 프리뷰를 위해 현재 상태 스냅샷 저장
        rectSnapshot.current = drawingCtx.getImageData(
          0,
          0,
          drawingLayer.width,
          drawingLayer.height,
        );
      } else if (mode === "circle") {
        // 원 프리뷰를 위해 현재 상태 스냅샷 저장
        rectSnapshot.current = drawingCtx.getImageData(
          0,
          0,
          drawingLayer.width,
          drawingLayer.height,
        );
      }
    },
    [
      mode,
      getPos,
      saveState,
      textInput,
      handleTextConfirm,
      getImageAtPosition,
      getResizeCursor,
      getResizeHandleAtPosition,
      loadedImages,
      commitFloatingImagesToDrawingLayer,
    ],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = getPos(e);

      if (mode === "pen") {
        penCursorRef.current = { x: pos.x, y: pos.y, visible: true };
      } else if (penCursorRef.current.visible) {
        penCursorRef.current.visible = false;
      }

      if (mode === "image") {
        if (resizingImageIndex !== null && activeResizeHandle) {
          setCanvasCursor(getResizeCursor(activeResizeHandle));
        } else if (draggingImageIndex !== null) {
          setCanvasCursor("grabbing");
        } else {
          const resizeTarget = getResizeHandleAtPosition(pos.x, pos.y);
          if (resizeTarget) {
            setCanvasCursor(getResizeCursor(resizeTarget.handle));
          } else if (getImageAtPosition(pos.x, pos.y) !== null) {
            setCanvasCursor("grab");
          } else {
            setCanvasCursor("default");
          }
        }
      }

      // 이미지 리사이즈 중
      if (resizingImageIndex !== null && activeResizeHandle) {
        const { x, y, imageX, imageY, imageWidth, imageHeight } =
          resizeStartRef.current;
        const dx = pos.x - x;
        const dy = pos.y - y;

        setLoadedImages((prev) => {
          const next = [...prev];
          const img = { ...next[resizingImageIndex] };

          let nextX = imageX;
          let nextY = imageY;
          let nextWidth = imageWidth;
          let nextHeight = imageHeight;

          const west = activeResizeHandle.includes("w");
          const east = activeResizeHandle.includes("e");
          const north = activeResizeHandle.includes("n");
          const south = activeResizeHandle.includes("s");

          if (west) {
            nextX = imageX + dx;
            nextWidth = imageWidth - dx;
          }
          if (east) {
            nextWidth = imageWidth + dx;
          }
          if (north) {
            nextY = imageY + dy;
            nextHeight = imageHeight - dy;
          }
          if (south) {
            nextHeight = imageHeight + dy;
          }

          if (isShiftPressed.current) {
            const horizontalOnly = (west || east) && !(north || south);
            const verticalOnly = (north || south) && !(west || east);
            const cornerResize = (west || east) && (north || south);

            let scaleCandidate = 1;

            if (horizontalOnly) {
              scaleCandidate = nextWidth / imageWidth;
            } else if (verticalOnly) {
              scaleCandidate = nextHeight / imageHeight;
            } else if (cornerResize) {
              const scaleFromWidth = nextWidth / imageWidth;
              const scaleFromHeight = nextHeight / imageHeight;
              scaleCandidate =
                Math.abs(scaleFromWidth - 1) >= Math.abs(scaleFromHeight - 1)
                  ? scaleFromWidth
                  : scaleFromHeight;
            }

            const minScale = Math.max(
              IMAGE_MIN_SIZE / imageWidth,
              IMAGE_MIN_SIZE / imageHeight,
            );
            const nextScale = Math.max(minScale, Math.abs(scaleCandidate));

            nextWidth = imageWidth * nextScale;
            nextHeight = imageHeight * nextScale;

            const right = imageX + imageWidth;
            const bottom = imageY + imageHeight;
            const centerX = imageX + imageWidth / 2;
            const centerY = imageY + imageHeight / 2;

            if (west) {
              nextX = right - nextWidth;
            } else if (east) {
              nextX = imageX;
            } else {
              nextX = centerX - nextWidth / 2;
            }

            if (north) {
              nextY = bottom - nextHeight;
            } else if (south) {
              nextY = imageY;
            } else {
              nextY = centerY - nextHeight / 2;
            }
          } else {
            if (nextWidth < IMAGE_MIN_SIZE) {
              nextWidth = IMAGE_MIN_SIZE;
              if (west) {
                nextX = imageX + imageWidth - IMAGE_MIN_SIZE;
              }
            }
            if (nextHeight < IMAGE_MIN_SIZE) {
              nextHeight = IMAGE_MIN_SIZE;
              if (north) {
                nextY = imageY + imageHeight - IMAGE_MIN_SIZE;
              }
            }
          }

          img.x = nextX;
          img.y = nextY;
          img.width = nextWidth;
          img.height = nextHeight;
          next[resizingImageIndex] = img;

          loadedImagesRef.current = next;
          renderScene(next);
          return next;
        });
        return;
      }

      // 이미지 드래그 중
      if (draggingImageIndex !== null) {
        setLoadedImages((prev) => {
          const newImages = [...prev];
          newImages[draggingImageIndex] = {
            ...newImages[draggingImageIndex],
            x: pos.x - dragStartPos.current.x,
            y: pos.y - dragStartPos.current.y,
          };
          loadedImagesRef.current = newImages;
          renderScene(newImages);
          return newImages;
        });
        return;
      }

      if (!isDrawing.current) {
        if (mode === "pen") {
          renderScene();
        }
        return;
      }
      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      if (mode === "pen") {
        drawingCtx.strokeStyle = getDrawColor();
        drawingCtx.lineWidth = lineWidth;
        drawingCtx.lineCap = "round";
        drawingCtx.lineJoin = "round";
        drawingCtx.lineTo(pos.x, pos.y);
        drawingCtx.stroke();
        // 같은 path를 반복 stroke하면 반투명 색이 과도하게 누적되므로
        // 마지막 점을 시작점으로 새 path를 만들어 세그먼트만 그린다.
        drawingCtx.beginPath();
        drawingCtx.moveTo(pos.x, pos.y);
        renderScene();
      } else if (mode === "rect") {
        // 스냅샷으로 복원 후 직사각형 프리뷰 그리기
        if (rectSnapshot.current) {
          drawingCtx.putImageData(rectSnapshot.current, 0, 0);
        }
        const x = Math.min(startPos.current.x, pos.x);
        const y = Math.min(startPos.current.y, pos.y);
        let w = Math.abs(pos.x - startPos.current.x);
        let h = Math.abs(pos.y - startPos.current.y);
        // Shift 키가 눌려있으면 정사각형으로 그리기
        if (isShiftPressed.current) {
          const size = Math.min(w, h);
          w = size;
          h = size;
        }
        drawingCtx.strokeStyle = getDrawColor();
        drawingCtx.lineWidth = lineWidth;
        drawingCtx.lineJoin = "miter";
        drawingCtx.strokeRect(x, y, w, h);
        renderScene();
      } else if (mode === "circle") {
        // 스냅샷으로 복원 후 원 프리뷰 그리기
        if (rectSnapshot.current) {
          drawingCtx.putImageData(rectSnapshot.current, 0, 0);
        }
        let rx = Math.abs(pos.x - startPos.current.x) / 2;
        let ry = Math.abs(pos.y - startPos.current.y) / 2;
        // Shift 키가 눌려있으면 진원으로 그리기
        if (isShiftPressed.current) {
          const r = Math.min(rx, ry);
          rx = r;
          ry = r;
        }
        const centerX = Math.min(startPos.current.x, pos.x) + rx;
        const centerY = Math.min(startPos.current.y, pos.y) + ry;
        drawingCtx.strokeStyle = getDrawColor();
        drawingCtx.lineWidth = lineWidth;
        drawingCtx.beginPath();
        drawingCtx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
        drawingCtx.stroke();
        renderScene();
      }
    },
    [
      mode,
      getPos,
      getDrawColor,
      lineWidth,
      draggingImageIndex,
      resizingImageIndex,
      activeResizeHandle,
      getImageAtPosition,
      getResizeCursor,
      getResizeHandleAtPosition,
      renderScene,
    ],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (resizingImageIndex !== null) {
        setResizingImageIndex(null);
        setActiveResizeHandle(null);
        setCanvasCursor(mode === "image" ? "default" : "crosshair");
        return;
      }

      // 이미지 드래그 종료
      if (draggingImageIndex !== null) {
        setDraggingImageIndex(null);
        setCanvasCursor(mode === "image" ? "grab" : "crosshair");
        return;
      }

      if (!isDrawing.current) return;
      isDrawing.current = false;

      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      if (mode === "rect") {
        const pos = getPos(e);
        if (rectSnapshot.current) {
          drawingCtx.putImageData(rectSnapshot.current, 0, 0);
        }
        const x = Math.min(startPos.current.x, pos.x);
        const y = Math.min(startPos.current.y, pos.y);
        let w = Math.abs(pos.x - startPos.current.x);
        let h = Math.abs(pos.y - startPos.current.y);
        // Shift 키가 눌려있으면 정사각형으로 그리기
        if (isShiftPressed.current) {
          const size = Math.min(w, h);
          w = size;
          h = size;
        }
        drawingCtx.strokeStyle = getDrawColor();
        drawingCtx.lineWidth = lineWidth;
        drawingCtx.lineJoin = "miter";
        drawingCtx.strokeRect(x, y, w, h);
        rectSnapshot.current = null;
        renderScene();
      } else if (mode === "circle") {
        const pos = getPos(e);
        if (rectSnapshot.current) {
          drawingCtx.putImageData(rectSnapshot.current, 0, 0);
        }
        let rx = Math.abs(pos.x - startPos.current.x) / 2;
        let ry = Math.abs(pos.y - startPos.current.y) / 2;
        // Shift 키가 눌려있으면 진원으로 그리기
        if (isShiftPressed.current) {
          const r = Math.min(rx, ry);
          rx = r;
          ry = r;
        }
        const centerX = Math.min(startPos.current.x, pos.x) + rx;
        const centerY = Math.min(startPos.current.y, pos.y) + ry;
        drawingCtx.strokeStyle = getDrawColor();
        drawingCtx.lineWidth = lineWidth;
        drawingCtx.beginPath();
        drawingCtx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
        drawingCtx.stroke();
        rectSnapshot.current = null;
        renderScene();
      }
    },
    [
      mode,
      getPos,
      getDrawColor,
      lineWidth,
      draggingImageIndex,
      resizingImageIndex,
      renderScene,
    ],
  );

  // 캔버스 밖으로 마우스가 나가도 드로잉 종료
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDrawing.current) {
        handleMouseUp(e);
      }

      if (penCursorRef.current.visible) {
        penCursorRef.current.visible = false;
        renderScene();
      }

      if (mode === "text") {
        setCanvasCursor("text");
      } else {
        setCanvasCursor("crosshair");
      }
    },
    [handleMouseUp, renderScene, mode],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const pos = getPosFromClient(touch.clientX, touch.clientY);

      if (mode === "image") {
        e.preventDefault();
        touchMovedRef.current = false;

        const resizeTarget = getResizeHandleAtPosition(pos.x, pos.y);
        if (resizeTarget) {
          saveState();
          setResizingImageIndex(resizeTarget.imageIndex);
          setActiveResizeHandle(resizeTarget.handle);
          const img = loadedImages[resizeTarget.imageIndex];
          resizeStartRef.current = {
            x: pos.x,
            y: pos.y,
            imageX: img.x,
            imageY: img.y,
            imageWidth: img.width,
            imageHeight: img.height,
          };
          touchStartImageIndexRef.current = resizeTarget.imageIndex;
          return;
        }

        const imageIndex = getImageAtPosition(pos.x, pos.y);
        touchStartImageIndexRef.current = imageIndex;
        if (imageIndex !== null) {
          saveState();
          setDraggingImageIndex(imageIndex);
          const img = loadedImages[imageIndex];
          dragStartPos.current = { x: pos.x - img.x, y: pos.y - img.y };
        } else if (loadedImagesRef.current.length > 0) {
          // 모바일에서도 이미지 바깥 탭 시 현재 위치로 확정
          commitFloatingImagesToDrawingLayer(true);
        }
        return;
      }

      if (mode !== "pen") return;

      e.preventDefault();

      if (loadedImagesRef.current.length > 0) {
        // 모바일에서 바로 그리기 시작할 때 떠있는 이미지를 먼저 확정
        commitFloatingImagesToDrawingLayer(false);
      }

      saveState();
      isDrawing.current = true;
      startPos.current = pos;

      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      drawingCtx.beginPath();
      drawingCtx.moveTo(pos.x, pos.y);
    },
    [
      mode,
      saveState,
      commitFloatingImagesToDrawingLayer,
      getPosFromClient,
      getResizeHandleAtPosition,
      getImageAtPosition,
      loadedImages,
    ],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLCanvasElement>) => {
      const touch = e.touches[0];
      if (!touch) return;
      const pos = getPosFromClient(touch.clientX, touch.clientY);

      if (mode === "image") {
        if (resizingImageIndex === null && draggingImageIndex === null) {
          return;
        }

        e.preventDefault();
        touchMovedRef.current = true;

        if (resizingImageIndex !== null && activeResizeHandle) {
          const { x, y, imageX, imageY, imageWidth, imageHeight } =
            resizeStartRef.current;
          const dx = pos.x - x;
          const dy = pos.y - y;

          setLoadedImages((prev) => {
            const next = [...prev];
            const img = { ...next[resizingImageIndex] };

            let nextX = imageX;
            let nextY = imageY;
            let nextWidth = imageWidth;
            let nextHeight = imageHeight;

            const west = activeResizeHandle.includes("w");
            const east = activeResizeHandle.includes("e");
            const north = activeResizeHandle.includes("n");
            const south = activeResizeHandle.includes("s");

            if (west) {
              nextX = imageX + dx;
              nextWidth = imageWidth - dx;
            }
            if (east) {
              nextWidth = imageWidth + dx;
            }
            if (north) {
              nextY = imageY + dy;
              nextHeight = imageHeight - dy;
            }
            if (south) {
              nextHeight = imageHeight + dy;
            }

            if (isShiftPressed.current) {
              const horizontalOnly = (west || east) && !(north || south);
              const verticalOnly = (north || south) && !(west || east);
              const cornerResize = (west || east) && (north || south);

              let scaleCandidate = 1;

              if (horizontalOnly) {
                scaleCandidate = nextWidth / imageWidth;
              } else if (verticalOnly) {
                scaleCandidate = nextHeight / imageHeight;
              } else if (cornerResize) {
                const scaleFromWidth = nextWidth / imageWidth;
                const scaleFromHeight = nextHeight / imageHeight;
                scaleCandidate =
                  Math.abs(scaleFromWidth - 1) >= Math.abs(scaleFromHeight - 1)
                    ? scaleFromWidth
                    : scaleFromHeight;
              }

              const minScale = Math.max(
                IMAGE_MIN_SIZE / imageWidth,
                IMAGE_MIN_SIZE / imageHeight,
              );
              const nextScale = Math.max(minScale, Math.abs(scaleCandidate));

              nextWidth = imageWidth * nextScale;
              nextHeight = imageHeight * nextScale;

              const right = imageX + imageWidth;
              const bottom = imageY + imageHeight;
              const centerX = imageX + imageWidth / 2;
              const centerY = imageY + imageHeight / 2;

              if (west) {
                nextX = right - nextWidth;
              } else if (east) {
                nextX = imageX;
              } else {
                nextX = centerX - nextWidth / 2;
              }

              if (north) {
                nextY = bottom - nextHeight;
              } else if (south) {
                nextY = imageY;
              } else {
                nextY = centerY - nextHeight / 2;
              }
            } else {
              if (nextWidth < IMAGE_MIN_SIZE) {
                nextWidth = IMAGE_MIN_SIZE;
                if (west) {
                  nextX = imageX + imageWidth - IMAGE_MIN_SIZE;
                }
              }
              if (nextHeight < IMAGE_MIN_SIZE) {
                nextHeight = IMAGE_MIN_SIZE;
                if (north) {
                  nextY = imageY + imageHeight - IMAGE_MIN_SIZE;
                }
              }
            }

            img.x = nextX;
            img.y = nextY;
            img.width = nextWidth;
            img.height = nextHeight;
            next[resizingImageIndex] = img;

            loadedImagesRef.current = next;
            renderScene(next);
            return next;
          });
          return;
        }

        if (draggingImageIndex !== null) {
          setLoadedImages((prev) => {
            const next = [...prev];
            next[draggingImageIndex] = {
              ...next[draggingImageIndex],
              x: pos.x - dragStartPos.current.x,
              y: pos.y - dragStartPos.current.y,
            };
            loadedImagesRef.current = next;
            renderScene(next);
            return next;
          });
        }
        return;
      }

      if (mode !== "pen" || !isDrawing.current) return;

      e.preventDefault();

      const drawingLayer = drawingLayerRef.current;
      const drawingCtx = drawingLayer?.getContext("2d");
      if (!drawingLayer || !drawingCtx) return;

      drawingCtx.strokeStyle = getDrawColor();
      drawingCtx.lineWidth = lineWidth;
      drawingCtx.lineCap = "round";
      drawingCtx.lineJoin = "round";
      drawingCtx.lineTo(pos.x, pos.y);
      drawingCtx.stroke();
      drawingCtx.beginPath();
      drawingCtx.moveTo(pos.x, pos.y);
      renderScene();
    },
    [
      mode,
      getDrawColor,
      lineWidth,
      renderScene,
      getPosFromClient,
      resizingImageIndex,
      draggingImageIndex,
      activeResizeHandle,
    ],
  );

  const handleTouchEnd = useCallback(() => {
    if (mode === "image") {
      const tappedImageIndex = touchStartImageIndexRef.current;

      if (
        !touchMovedRef.current &&
        tappedImageIndex !== null &&
        loadedImagesRef.current.length > 0
      ) {
        const now = Date.now();
        const isDoubleTap =
          lastTouchTapRef.current.imageIndex === tappedImageIndex &&
          now - lastTouchTapRef.current.time < 300;

        if (isDoubleTap) {
          commitFloatingImagesToDrawingLayer(true);
          lastTouchTapRef.current = { time: 0, imageIndex: null };
        } else {
          lastTouchTapRef.current = { time: now, imageIndex: tappedImageIndex };
        }
      }

      setDraggingImageIndex(null);
      setResizingImageIndex(null);
      setActiveResizeHandle(null);
      touchMovedRef.current = false;
      touchStartImageIndexRef.current = null;
      return;
    }

    if (mode !== "pen") return;
    isDrawing.current = false;
  }, [mode, commitFloatingImagesToDrawingLayer]);

  const handleTouchCancel = useCallback(() => {
    if (mode === "image") {
      setDraggingImageIndex(null);
      setResizingImageIndex(null);
      setActiveResizeHandle(null);
      touchMovedRef.current = false;
      touchStartImageIndexRef.current = null;
      return;
    }

    if (mode !== "pen") return;
    isDrawing.current = false;
  }, [mode]);

  // 이미지 다운로드 (흰 배경 합성 후 저장)
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const drawingLayer = drawingLayerRef.current;
    if (!drawingLayer) return;

    const dpr = window.devicePixelRatio || 1;

    // 투명 픽셀이 검정으로 보이지 않도록 임시 캔버스에 흰 배경 + 내용 합성
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // 드로잉 레이어는 1:1 픽셀 매핑으로 복사
    tempCtx.setTransform(1, 0, 0, 1, 0, 0);
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(drawingLayer, 0, 0);

    // 이미지 좌표는 CSS 픽셀이므로 DPR 스케일로 그림
    tempCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    loadedImagesRef.current.forEach((img) => {
      tempCtx.drawImage(img.data, img.x, img.y, img.width, img.height);
    });

    const link = document.createElement("a");
    link.download = `drawing-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  }, []);

  // 전체 지우기
  const handleClear = useCallback(() => {
    const drawingLayer = drawingLayerRef.current;
    const drawingCtx = drawingLayer?.getContext("2d");
    if (!drawingLayer || !drawingCtx) return;
    saveState();
    const dpr = window.devicePixelRatio || 1;
    drawingCtx.clearRect(
      0,
      0,
      drawingLayer.width / dpr,
      drawingLayer.height / dpr,
    );
    loadedImagesRef.current = [];
    setLoadedImages([]);
    renderScene([]);
  }, [saveState, renderScene]);

  // 이동/리사이즈 가능한(확정 전) 이미지를 삭제
  const handleDeleteFloatingImage = useCallback(() => {
    if (loadedImagesRef.current.length === 0) return;

    saveState();
    const targetIndex =
      draggingImageIndex ??
      resizingImageIndex ??
      loadedImagesRef.current.length - 1;

    setLoadedImages((prev) => {
      if (prev.length === 0) return prev;
      const safeIndex = Math.max(0, Math.min(targetIndex, prev.length - 1));
      const next = prev.filter((_, idx) => idx !== safeIndex);
      loadedImagesRef.current = next;
      renderScene(next);
      return next;
    });

    setDraggingImageIndex(null);
    setResizingImageIndex(null);
    setActiveResizeHandle(null);
    setCanvasCursor("default");
  }, [draggingImageIndex, resizingImageIndex, saveState, renderScene]);

  // 실행 취소
  const handleUndo = useCallback(() => {
    if (undoStack.current.length === 0) return;

    // 현재 상태를 redo 스택에 저장
    const current = makeSnapshot();
    if (!current) return;
    redoStack.current.push(current);

    // undo 스택에서 복원
    const prev = undoStack.current.pop()!;
    restoreSnapshot(prev);
    syncStackState();
  }, [makeSnapshot, restoreSnapshot, syncStackState]);

  // 다시 실행
  const handleRedo = useCallback(() => {
    if (redoStack.current.length === 0) return;

    // 현재 상태를 undo 스택에 저장
    const current = makeSnapshot();
    if (!current) return;
    undoStack.current.push(current);

    // redo 스택에서 복원
    const next = redoStack.current.pop()!;
    restoreSnapshot(next);
    syncStackState();
  }, [makeSnapshot, restoreSnapshot, syncStackState]);

  // 텍스트 오버레이가 표시될 때 자동 포커스
  useEffect(() => {
    if (textInput.visible) {
      textOverlayRef.current?.focus();
    }
  }, [textInput.visible, textInput.x, textInput.y]);
  // 키보드 핸들러 통합: Shift 추적 + 단축키 처리
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        isShiftPressed.current = true;
      }

      if (
        e.key === "Escape" &&
        mode === "image" &&
        loadedImagesRef.current.length > 0
      ) {
        e.preventDefault();
        commitFloatingImagesToDrawingLayer(true);
        return;
      }

      // 텍스트 입력 중에는 단축키 무시
      if (document.activeElement === textOverlayRef.current) return;

      // Undo: Cmd+Z (Mac) 또는 Ctrl+Z (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }
      // Redo: Shift+Cmd+Z (Mac) 또는 Ctrl+Y / Ctrl+Shift+Z (Windows)
      if (
        (e.metaKey || e.ctrlKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "Z"))
      ) {
        e.preventDefault();
        handleRedo();
        return;
      }
      if (e.key === "t") {
        e.preventDefault();
        setMode("text");
      }
      if (e.key === "e" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setMode("rect");
      }
      if (e.key === "r" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setMode("circle");
      }
      if (e.key === "w") {
        e.preventDefault();
        setMode("pen");
      }
      if (e.key === "Delete") {
        if (mode === "image" && loadedImagesRef.current.length > 0) {
          e.preventDefault();
          handleDeleteFloatingImage();
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        isShiftPressed.current = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [
    handleUndo,
    handleRedo,
    handleDeleteFloatingImage,
    mode,
    commitFloatingImagesToDrawingLayer,
  ]);

  // 색상 선택기 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showColorPicker &&
        colorPickerRef.current &&
        !colorPickerRef.current.contains(e.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  useEffect(() => {
    document.title = "그림판";
  }, []);

  const effectiveCanvasCursor = (() => {
    if (mode === "image") {
      if (resizingImageIndex !== null && activeResizeHandle) {
        return getResizeCursor(activeResizeHandle);
      }
      if (draggingImageIndex !== null) {
        return "grabbing";
      }
      return canvasCursor;
    }
    if (mode === "text") {
      return "text";
    }
    return "crosshair";
  })();

  return (
    <S.Page>
      <S.Toolbar>
        {/* 모드 선택 */}
        <S.ToolGroup>
          <S.ToolButton
            $active={mode === "pen"}
            onClick={() => setMode("pen")}
            title="펜(w)"
          >
            <PenIcon />
          </S.ToolButton>
          <S.ToolButton
            $active={mode === "rect"}
            onClick={() => setMode("rect")}
            title="직사각형(e)"
          >
            <RectIcon />
          </S.ToolButton>
          <S.ToolButton
            $active={mode === "circle"}
            onClick={() => setMode("circle")}
            title="원(r)"
          >
            <CircleIcon />
          </S.ToolButton>
          <S.ToolButton
            $active={mode === "text"}
            onClick={() => setMode("text")}
            title="텍스트(t)"
          >
            <TextIcon />
          </S.ToolButton>
        </S.ToolGroup>

        <S.ToolDivider />

        {/* 색상 팔레트 */}
        <S.ToolGroup>
          <S.ColorPalette>
            {COLOR_PALETTE.flat().map((c) => (
              <S.ColorSwatch
                key={c}
                $color={c}
                $selected={color === c}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}

            <S.ColorSwatch
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="직접 선택"
            >
              C
            </S.ColorSwatch>
          </S.ColorPalette>
          <S.ColorPickerButtonWrap>
            {showColorPicker && (
              <S.ColorPickerPopover ref={colorPickerRef}>
                <CompactPicker
                  color={color}
                  onChange={(newColor) => setColor(newColor.hex)}
                />
              </S.ColorPickerPopover>
            )}
          </S.ColorPickerButtonWrap>
        </S.ToolGroup>

        <S.ToolDivider />

        {/* 두께 / 폰트 크기 */}
        <S.ToolGroup>
          {mode === "text" ? (
            <S.SizeSection>
              <S.SizeHeader>
                <S.SizeLabel>FONT SIZE</S.SizeLabel>
                <S.SizeValue>{fontSize} px</S.SizeValue>
              </S.SizeHeader>
              <S.SizeSlider
                type="range"
                min={8}
                max={100}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </S.SizeSection>
          ) : (
            <S.SizeSection>
              <S.SizeHeader>
                <S.SizeLabel>SIZE</S.SizeLabel>
                <S.SizeValue>{lineWidth} px</S.SizeValue>
              </S.SizeHeader>
              <S.SizeSlider
                type="range"
                min={1}
                max={20}
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
              />
            </S.SizeSection>
          )}
        </S.ToolGroup>

        <S.ToolDivider />

        {/* 액션 버튼 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageLoad}
          style={{ display: "none" }}
        />
        <S.ToolGroup>
          <S.ToolButton
            onClick={handleUndo}
            disabled={!canUndo}
            title={isMac ? "실행 취소 (⌘Z)" : "실행 취소 (Ctrl+Z)"}
          >
            <UndoIcon />
          </S.ToolButton>
          <S.ToolButton
            onClick={handleRedo}
            disabled={!canRedo}
            title={isMac ? "다시 실행 (⇧⌘Z)" : "다시 실행 (Ctrl+Y)"}
          >
            <RedoIcon />
          </S.ToolButton>
          <S.ToolButton
            onClick={() => fileInputRef.current?.click()}
            title="이미지 불러오기"
          >
            <SaveIcon />
          </S.ToolButton>
          <S.ToolButton onClick={handleClear} title="Clear all">
            <TrashIcon />
          </S.ToolButton>
          <S.ToolButton onClick={handleDownload} title="Download image">
            <DownloadIcon />
          </S.ToolButton>
        </S.ToolGroup>
      </S.Toolbar>

      <S.CanvasWrap ref={wrapRef}>
        <S.Canvas
          ref={canvasRef}
          style={{ cursor: effectiveCanvasCursor, touchAction: "none" }}
          onDragOver={handleCanvasDragOver}
          onDrop={handleCanvasDrop}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        />
        {/* 텍스트 입력 오버레이 */}
        {textInput.visible && (
          <S.TextOverlayWrap $x={textInput.x} $y={textInput.y}>
            <S.TextDragHandle
              onPointerDown={handleTextPointerDown}
              onPointerMove={handleTextPointerMove}
              onPointerUp={handleTextPointerUp}
              onPointerCancel={handleTextPointerUp}
            />
            <S.TextOverlay
              ref={textOverlayRef}
              $x={textInput.x}
              $y={textInput.y}
              $fontSize={fontSize}
              $color={color}
              $width={textInputWidth}
              value={textInput.value}
              onChange={(e) => {
                const newValue = e.target.value;
                setTextInput((prev) => ({ ...prev, value: newValue }));
                setTextInputWidth(measureTextWidth(newValue));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTextConfirm(textInput.value, textInput.x, textInput.y);
                }
                if (e.key === "Escape") {
                  setTextInput({ visible: false, x: 0, y: 0, value: "" });
                }
              }}
              onBlur={() => {
                if (isDraggingTextRef.current) return;
                handleTextConfirm(textInput.value, textInput.x, textInput.y);
              }}
            />
          </S.TextOverlayWrap>
        )}
      </S.CanvasWrap>
    </S.Page>
  );
}
