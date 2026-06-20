import styled from "styled-components";

export const Page = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  z-index: 20;

  padding: 4px;
  background: linear-gradient(180deg, #3a3f47 0%, #2a2e35 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface ToolButtonProps {
  $active?: boolean;
  $primary?: boolean;
}

export const ToolButton = styled.button<ToolButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 32px;
  height: 32px;
  padding: 2px;
  border-radius: 4px;
  border: 1.5px solid
    ${({ $active, $primary }) =>
      $active || $primary ? "#3b82f6" : "transparent"};
  background: ${({ $active, $primary }) =>
    $primary
      ? "#2563eb"
      : $active
        ? "rgba(59, 130, 246, 0.18)"
        : "transparent"};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#d1d5db")};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $primary }) =>
      $primary ? "#1d4ed8" : "rgba(255, 255, 255, 0.08)"};
    color: ${({ $primary }) => ($primary ? "#ffffff" : "#ffffff")};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ToolButtonLabel = styled.span`
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.4px;
  line-height: 1;
`;

export const ToolDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
  margin: 0 4px;
`;

export const ColorPalette = styled.div`
  display: flex;
  /* grid-template-columns: repeat(4, 22px);
  grid-template-rows: repeat(2, 22px); */
  gap: 5px;
`;

interface ColorSwatchProps {
  $color?: string;
  $selected?: boolean;
}

export const ColorSwatch = styled.button<ColorSwatchProps>`
  width: 22px;
  height: 22px;
  font-weight: bold;
  border-radius: 5px;
  background: ${({ $color }) => $color};
  border: ${({ $selected, $color }) =>
    $selected
      ? "2px solid #3b82f6"
      : $color === "#ffffff"
        ? "1px solid #4b5563"
        : "1px solid transparent"};
  cursor: pointer;
  outline: none;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.12);
  }
`;

export const ColorPickerButtonWrap = styled.div`
  position: relative;
`;

export const CustomColorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomColorIcon = styled.div<{ $color: string }>`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background: conic-gradient(
    from 180deg at 50% 50%,
    #ff0000 0deg,
    #ffff00 60deg,
    #00ff00 120deg,
    #00ffff 180deg,
    #0000ff 240deg,
    #ff00ff 300deg,
    #ff0000 360deg
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background: ${({ $color }) => $color};
    opacity: 0.35;
  }
`;

export const ColorPickerPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  .chrome-picker {
    font-family: inherit !important;
  }
`;

export const SizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 4px;
  min-width: 140px;
`;

export const SizeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SizeLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #e5e7eb;
  letter-spacing: 0.4px;
`;

export const SizeValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
`;

export const SizeSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #4b5563;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
    background: #4b5563;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #3b82f6;
    border: 2px solid #ffffff;
    margin-top: -5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: #4b5563;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #3b82f6;
    border: 2px solid #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  }
`;

export const SizeTicks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2px;

  span {
    font-size: 9px;
    color: #9ca3af;
    font-weight: 500;
  }
`;

export const CanvasWrap = styled.div`
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
`;

export const Canvas = styled.canvas`
  background: #ffffff;
  cursor: crosshair;
  display: block;
  width: 100%;
  height: 100%;
`;

interface TextOverlayProps {
  $x: number;
  $y: number;
  $fontSize: number;
  $color: string;
  $width: number;
}

const TEXT_DRAG_HANDLE_WIDTH = 16;

export const TextOverlayWrap = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  /* 텍스트 입력창 기준점은 클릭 위치이며, 드래그 핸들은 그 왼쪽에 배치 */
  left: ${({ $x }) => $x - TEXT_DRAG_HANDLE_WIDTH}px;
  top: ${({ $y }) => $y}px;
  transform: translateY(-50%);
  display: flex;
  align-items: stretch;
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15));
`;

export const TextDragHandle = styled.div`
  width: ${TEXT_DRAG_HANDLE_WIDTH}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  color: #3b82f6;
  font-size: 12px;
  line-height: 1;
  user-select: none;
  border-radius: 3px 0 0 3px;
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px dashed #3b82f6;
  border-right: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  /* 드래그 핸들 그립 표시 */
  &::before {
    content: "⋮⋮";
    letter-spacing: -2px;
    opacity: 0.8;
  }
`;

export const TextOverlay = styled.input<TextOverlayProps>`
  font-size: ${({ $fontSize }) => $fontSize}px;
  color: ${({ $color }) => $color};
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px dashed #3b82f6;
  border-radius: 0 3px 3px 0;
  outline: none;
  padding: 2px 6px;
  width: ${({ $width }) => $width}px;
  min-width: 80px;
  font-family: sans-serif;
  line-height: 1.2;
`;
