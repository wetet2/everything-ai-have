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
  gap: 16px;
  padding: 8px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

export const ToolGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
`;

export const ColorPalette = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

interface ColorSwatchProps {
  $color: string;
  $selected: boolean;
}

export const ColorSwatch = styled.button<ColorSwatchProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: ${({ $selected }) =>
    $selected ? "3px solid #3b82f6" : "2px solid #d1d5db"};
  cursor: pointer;
  outline: none;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.15);
  }
`;

export const ColorPickerButtonWrap = styled.div`
  position: relative;
`;

interface ColorPickerButtonProps {
  $color: string;
}

export const ColorPickerButton = styled.button<ColorPickerButtonProps>`
  width: 40px;
  height: 28px;
  border-radius: 6px;
  border: 2px solid #d1d5db;
  background: ${({ $color }) => $color};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.15s;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  span {
    margin-bottom: 1px;
    line-height: 1;
    font-size: 18px;
    font-weight: bold;
    color: ${({ $color }) => {
      // 밝은 색상인 경우 검은색, 어두운 색상인 경우 흰색 텍스트
      const hex = $color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 155 ? "#000000" : "#ffffff";
    }};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    border-color: #3b82f6;
    transform: scale(1.08);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

export const ColorPickerPopover = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  .chrome-picker {
    font-family: inherit !important;
  }
`;

export const Slider = styled.input`
  width: 100px;
  accent-color: #3b82f6;
  cursor: pointer;
`;

export const SliderValue = styled.span`
  font-size: 12px;
  color: #374151;
  min-width: 28px;
`;

interface ModeButtonProps {
  $active: boolean;
}

export const ModeButton = styled.button<ModeButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 6px;
  border: 1.5px solid ${({ $active }) => ($active ? "#3b82f6" : "#d1d5db")};
  background: ${({ $active }) => ($active ? "#eff6ff" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#2563eb" : "#374151")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1.5px solid #d1d5db;
  background: #ffffff;
  color: #374151;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    border-color: #6b7280;
    background: #f9fafb;
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
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

export const TextOverlay = styled.input<TextOverlayProps>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  font-size: ${({ $fontSize }) => $fontSize}px;
  color: ${({ $color }) => $color};
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px dashed #3b82f6;
  border-radius: 3px;
  outline: none;
  padding: 2px 6px;
  width: ${({ $width }) => $width}px;
  min-width: 80px;
  font-family: sans-serif;
  line-height: 1.2;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
`;
