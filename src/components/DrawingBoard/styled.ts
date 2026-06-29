import styled from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0;
  background: #0a0a0f;
`;

export const ToolDivider = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: rgba(0, 255, 255, 0.15);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  z-index: 20;

  width: 100%;

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
  padding-left: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;

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
  color: ${({ $primary }) =>
    $primary ? "#00ffff" : "rgba(255, 255, 255, 0.6)"};
  background: ${({ $active, $primary }) =>
    $primary
      ? "rgba(0, 255, 255, 0.15)"
      : $active
        ? "rgba(0, 255, 255, 0.08)"
        : "transparent"};
  border-radius: 6px;
  border: 1.5px solid
    ${({ $active, $primary }) =>
      $active || $primary ? "rgba(0, 255, 255, 0.5)" : "transparent"};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    color: #00ffff;
    background: ${({ $primary }) =>
      $primary ? "rgba(0, 255, 255, 0.2)" : "rgba(0, 255, 255, 0.05)"};
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
  gap: 5px;
  /* grid-template-columns: repeat(4, 22px);
  grid-template-rows: repeat(2, 22px); */

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
  background: ${({ $color }) => $color};
  border-radius: 5px;
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
  position: relative;
  width: 22px;
  height: 22px;
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
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::after {
    position: absolute;
    inset: 0;
    background: ${({ $color }) => $color};
    content: "";
    border-radius: 4px;
    opacity: 0.35;
  }
`;

export const ColorPickerPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
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
  min-width: 140px;
  padding: 0 4px;

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
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;

  &::-webkit-slider-runnable-track {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    margin-top: -5px;
    background: #00ffff;
    -webkit-appearance: none;
    border-radius: 50%;
    border: 2px solid #0a0a0f;
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.3);
  }

  &::-moz-range-track {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #00ffff;
    border-radius: 50%;
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
  position: relative;
  min-height: 0;
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
  cursor: crosshair;
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
  display: flex;
  align-items: stretch;
  position: absolute;
  left: ${({ $x }) => $x - TEXT_DRAG_HANDLE_WIDTH}px;
  top: ${({ $y }) => $y}px;
  z-index: 10;
  transform: translateY(-50%);
  filter: drop-shadow(0 2px 8px rgba(59, 130, 246, 0.15));
  /* 텍스트 입력창 기준점은 클릭 위치이며, 드래그 핸들은 그 왼쪽에 배치 */
`;

export const TextDragHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${TEXT_DRAG_HANDLE_WIDTH}px;
  color: #3b82f6;
  font-size: 12px;
  line-height: 1;
  background: rgba(255, 255, 255, 0.85);
  cursor: grab;
  user-select: none;
  border-radius: 3px 0 0 3px;
  border: 1.5px dashed #3b82f6;
  border-right: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }

  /* 드래그 핸들 그립 표시 */
  &::before {
    letter-spacing: -2px;
    content: "⋮⋮";
    opacity: 0.8;
  }
`;

export const TextOverlay = styled.input<TextOverlayProps>`
  width: ${({ $width }) => $width}px;
  min-width: 80px;
  padding: 2px 6px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  color: ${({ $color }) => $color};
  font-family: sans-serif;
  line-height: 1.2;
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px dashed #3b82f6;
  border-radius: 0 3px 3px 0;
  outline: none;
`;
