import styled from "styled-components";

export const Page = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
`;

export const ToolDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(0, 255, 255, 0.15);
  margin: 0 4px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  width: 100%;
  z-index: 20;

  padding: 8px;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 600px) {
    gap: 6px;
  }
`;

export const ToolbarTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
  padding-left: 8px;

  span {
    color: #00ffff;
    text-shadow: 0 0 6px rgba(0, 255, 255, 0.3);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
    flex: 1 1 auto;
  }
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
  border-radius: 6px;
  border: 1.5px solid
    ${({ $active, $primary }) =>
      $active || $primary ? "rgba(0, 255, 255, 0.5)" : "transparent"};
  background: ${({ $active, $primary }) =>
    $primary
      ? "rgba(0, 255, 255, 0.15)"
      : $active
        ? "rgba(0, 255, 255, 0.08)"
        : "transparent"};
  color: ${({ $primary }) =>
    $primary ? "#00ffff" : "rgba(255, 255, 255, 0.6)"};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: ${({ $primary }) =>
      $primary ? "rgba(0, 255, 255, 0.2)" : "rgba(0, 255, 255, 0.05)"};
    color: #00ffff;
  }

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    min-width: 28px;
    height: 28px;

    svg {
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    min-width: 26px;
    height: 26px;

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const ToolButtonLabel = styled.span`
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.4px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.4);
`;

export const ColorPalette = styled.div`
  display: flex;
  /* grid-template-columns: repeat(4, 22px);
  grid-template-rows: repeat(2, 22px); */
  gap: 5px;

  @media (max-width: 600px) {
    flex-wrap: wrap;
    max-width: 120px;
    gap: 4px;
  }

  @media (max-width: 480px) {
    max-width: 110px;
  }
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
      ? "2px solid #00ffff"
      : $color === "#ffffff"
        ? "1px solid rgba(0, 255, 255, 0.2)"
        : "1px solid transparent"};
  box-shadow: ${({ $selected }) =>
    $selected ? "0 0 8px rgba(0, 255, 255, 0.3)" : "none"};
  cursor: pointer;
  outline: none;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.12);
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 18px;
    height: 18px;
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

  @media (max-width: 768px) {
    min-width: 110px;
    gap: 5px;
  }

  @media (max-width: 600px) {
    min-width: 90px;
  }

  @media (max-width: 480px) {
    min-width: 70px;
    padding: 0 2px;
  }
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
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.4px;
`;

export const SizeValue = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: rgba(0, 255, 255, 0.5);
`;

export const SizeSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #00ffff;
    border: 2px solid #0a0a0f;
    margin-top: -5px;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.1);
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #00ffff;
    border: 2px solid #0a0a0f;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
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
