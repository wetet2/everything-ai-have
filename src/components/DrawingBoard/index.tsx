import { useCallback, useEffect, useRef, useState } from "react";
import DownloadIcon from "../../../resources/icons/DownloadIcon";
import PenIcon from "../../../resources/icons/PenIcon";
import RectIcon from "../../../resources/icons/RectIcon";
import TextIcon from "../../../resources/icons/TextIcon";
import TrashIcon from "../../../resources/icons/TrashIcon";
import CircleIcon from "../../../resources/icons/CircleIcon";
import * as S from "./styled";

// 기본 팔레트 색상 8가지
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

type DrawMode = "pen" | "rect" | "circle" | "text";

type TextInput = {
  visible: boolean;
  x: number;
  y: number;
  value: string;
};

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 현재 설정
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(4);
  const [fontSize, setFontSize] = useState(24);
  const [mode, setMode] = useState<DrawMode>("pen");

  // 텍스트 입력 오버레이 상태
  const [textInput, setTextInput] = useState<TextInput>({
    visible: false,
    x: 0,
    y: 0,
    value: "",
  });
  const textOverlayRef = useRef<HTMLInputElement>(null);
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

  // Undo / Redo 스택: ImageData 저장
  const undoStack = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // 드로잉 상태
  const isDrawing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  // 직사각형 그릴 때 배경 스냅샷 (실시간 프리뷰용)
  const rectSnapshot = useRef<ImageData | null>(null);
  // Shift 키 눌림 상태 추적
  const isShiftPressed = useRef(false);

  // 스택 상태를 React state에 동기화
  const syncStackState = useCallback(() => {
    setCanUndo(undoStack.current.length > 0);
    setCanRedo(redoStack.current.length > 0);
  }, []);

  // 현재 캔버스 상태를 undo 스택에 저장
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push(snapshot);
    // 새로운 액션이 발생하면 redo 스택 초기화
    redoStack.current = [];
    syncStackState();
  }, [syncStackState]);

  // 캔버스 크기를 부모 컨테이너에 맞게 조정
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const resize = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 기존 내용을 임시 캔버스에 복사 (알파 합성 유지)
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCanvas.getContext("2d")?.drawImage(canvas, 0, 0);

      // wrap 전체를 꽉 채움
      canvas.width = wrap.clientWidth;
      canvas.height = wrap.clientHeight;

      // 흰 배경 채우기
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 이전 내용 복원 (drawImage는 흰 배경 위에 알파 합성)
      ctx.drawImage(tempCanvas, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // 마우스 좌표를 캔버스 기준으로 변환
  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // 텍스트를 캔버스에 확정 렌더링
  const handleTextConfirm = useCallback(
    (value: string, x: number, y: number) => {
      if (!value.trim()) {
        setTextInput({ visible: false, x: 0, y: 0, value: "" });
        return;
      }
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      saveState();
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = color;
      ctx.textBaseline = "top";
      ctx.fillText(value, x, y);
      setTextInput({ visible: false, x: 0, y: 0, value: "" });
    },
    [fontSize, color, saveState],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const pos = getPos(e);

      if (mode === "text") {
        // mousedown 기본 동작(포커스 이동)을 막아 TextOverlay의 blur 방지
        e.preventDefault();
        if (textInput.visible) {
          // 기존 텍스트 입력 중이면 먼저 확정
          handleTextConfirm(textInput.value, textInput.x, textInput.y);
        }
        setTextInput({ visible: true, x: pos.x, y: pos.y, value: "" });
        setTextInputWidth(80);
        return;
      }

      // 드로잉 시작 전 현재 상태 저장
      saveState();

      isDrawing.current = true;
      startPos.current = pos;

      if (mode === "pen") {
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      } else if (mode === "rect") {
        // 직사각형 프리뷰를 위해 현재 상태 스냅샷 저장
        rectSnapshot.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
      } else if (mode === "circle") {
        // 원 프리뷰를 위해 현재 상태 스냅샷 저장
        rectSnapshot.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
      }
    },
    [mode, saveState, textInput, handleTextConfirm],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const pos = getPos(e);

      if (mode === "pen") {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (mode === "rect") {
        // 스냅샷으로 복원 후 직사각형 프리뷰 그리기
        if (rectSnapshot.current) {
          ctx.putImageData(rectSnapshot.current, 0, 0);
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
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "miter";
        ctx.strokeRect(x, y, w, h);
      } else if (mode === "circle") {
        // 스냅샷으로 복원 후 원 프리뷰 그리기
        if (rectSnapshot.current) {
          ctx.putImageData(rectSnapshot.current, 0, 0);
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
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
    [mode, color, lineWidth],
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      if (mode === "rect") {
        const pos = getPos(e);
        if (rectSnapshot.current) {
          ctx.putImageData(rectSnapshot.current, 0, 0);
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
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "miter";
        ctx.strokeRect(x, y, w, h);
        rectSnapshot.current = null;
      } else if (mode === "circle") {
        const pos = getPos(e);
        if (rectSnapshot.current) {
          ctx.putImageData(rectSnapshot.current, 0, 0);
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
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        rectSnapshot.current = null;
      }
    },
    [mode, color, lineWidth],
  );

  // 캔버스 밖으로 마우스가 나가도 드로잉 종료
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDrawing.current) {
        handleMouseUp(e);
      }
    },
    [handleMouseUp],
  );

  // 이미지 다운로드 (흰 배경 합성 후 저장)
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // 투명 픽셀이 검정으로 보이지 않도록 임시 캔버스에 흰 배경 + 내용 합성
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = `drawing-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
  }, []);

  // 전체 지우기
  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    saveState();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [saveState]);

  // 실행 취소
  const handleUndo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || undoStack.current.length === 0) return;

    // 현재 상태를 redo 스택에 저장
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    redoStack.current.push(current);

    // undo 스택에서 복원
    const prev = undoStack.current.pop()!;
    ctx.putImageData(prev, 0, 0);
    syncStackState();
  }, [syncStackState]);

  // 다시 실행
  const handleRedo = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || redoStack.current.length === 0) return;

    // 현재 상태를 undo 스택에 저장
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    undoStack.current.push(current);

    // redo 스택에서 복원
    const next = redoStack.current.pop()!;
    ctx.putImageData(next, 0, 0);
    syncStackState();
  }, [syncStackState]);

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

      // 텍스트 입력 중에는 단축키 무시
      if (document.activeElement === textOverlayRef.current) return;

      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        handleUndo();
        return;
      }
      if (e.ctrlKey && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
        e.preventDefault();
        handleRedo();
        return;
      }
      if (e.key === "t") {
        e.preventDefault();
        setMode("text");
      }
      if (e.key === "r" && !e.ctrlKey) {
        e.preventDefault();
        setMode("rect");
      }
      if (e.key === "o" && !e.ctrlKey) {
        e.preventDefault();
        setMode("circle");
      }
      if (e.key === "p") {
        e.preventDefault();
        setMode("pen");
      }
      if (e.key === "Delete") {
        e.preventDefault();
        handleClear();
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
  }, [handleUndo, handleRedo, handleClear]);

  useEffect(() => {
    document.title = "그림판";
  }, []);

  return (
    <S.Page>
      <S.Toolbar>
        {/* 모드 선택 */}
        <S.ToolGroup>
          <S.Label>도구</S.Label>
          <S.ModeButton
            $active={mode === "pen"}
            onClick={() => setMode("pen")}
            title="펜"
          >
            <PenIcon />
          </S.ModeButton>
          <S.ModeButton
            $active={mode === "rect"}
            onClick={() => setMode("rect")}
            title="직사각형"
          >
            <RectIcon />
          </S.ModeButton>
          <S.ModeButton
            $active={mode === "circle"}
            onClick={() => setMode("circle")}
            title="원"
          >
            <CircleIcon />
          </S.ModeButton>
          <S.ModeButton
            $active={mode === "text"}
            onClick={() => setMode("text")}
            title="텍스트"
          >
            <TextIcon />
          </S.ModeButton>
        </S.ToolGroup>

        {/* 색상 팔레트 */}
        <S.ToolGroup>
          <S.Label>색상</S.Label>
          <S.ColorPalette>
            {COLOR_PALETTE.map((c) => (
              <S.ColorSwatch
                key={c}
                $color={c}
                $selected={color === c}
                onClick={() => setColor(c)}
                title={c}
              />
            ))}
          </S.ColorPalette>
        </S.ToolGroup>

        {/* 선 두께 (텍스트 모드 제외) */}
        {mode !== "text" && (
          <S.ToolGroup>
            <S.Label>두께</S.Label>
            <S.Slider
              type="range"
              min={1}
              max={50}
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
            />
            <S.SliderValue>{lineWidth}px</S.SliderValue>
          </S.ToolGroup>
        )}

        {/* 폰트 크기 (텍스트 모드 전용) */}
        {mode === "text" && (
          <S.ToolGroup>
            <S.Label>폰트 크기</S.Label>
            <S.Slider
              type="range"
              min={8}
              max={40}
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
            />
            <S.SliderValue>{fontSize}px</S.SliderValue>
          </S.ToolGroup>
        )}

        <div style={{ flex: 1 }}></div>

        {/* 액션 버튼 */}
        <S.ToolGroup>
          <S.ActionButton
            onClick={handleUndo}
            disabled={!canUndo}
            title="undo (Ctrl+Z)"
          >
            ↩
          </S.ActionButton>
          <S.ActionButton
            onClick={handleRedo}
            disabled={!canRedo}
            title="redo (Ctrl+Y)"
          >
            ↪
          </S.ActionButton>
          <S.ActionButton onClick={handleClear} title="Clear all">
            <TrashIcon />
          </S.ActionButton>
          <S.ActionButton onClick={handleDownload} title="Download image">
            <DownloadIcon />
          </S.ActionButton>
        </S.ToolGroup>
      </S.Toolbar>

      <S.CanvasWrap ref={wrapRef}>
        <S.Canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        />
        {/* 텍스트 입력 오버레이 */}
        {textInput.visible && (
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
                handleTextConfirm(
                  textInput.value,
                  textInput.x + 7,
                  textInput.y + 7,
                );
              }
              if (e.key === "Escape") {
                setTextInput({ visible: false, x: 0, y: 0, value: "" });
              }
            }}
            onBlur={() =>
              handleTextConfirm(textInput.value, textInput.x, textInput.y)
            }
          />
        )}
      </S.CanvasWrap>
    </S.Page>
  );
}
