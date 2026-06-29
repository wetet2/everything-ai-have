import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #0a0a0f;
  overflow: hidden;

  &::before {
    position: absolute;
    inset: 0;
    z-index: 0;
    background-image:
      linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    content: "";
    pointer-events: none;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 8px 16px;
  color: #ffffff;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);

  h1 {
    margin: 0;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;

    span {
      background: linear-gradient(135deg, #00ffff, #ff00ff);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 12px;

    h1 {
      font-size: 15px;
    }

    p {
      display: none;
    }

    & > div {
      flex: 1 1 auto;
      min-width: 0;
    }
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: #00ffff;
  font-size: 18px;
  background: rgba(0, 255, 255, 0.06);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.12);
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.15);
  }

  @media (min-width: 769px) {
    display: none;
  }
`;

export const HeaderToggleButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  color: #00ffff;
  font-size: 18px;
  background: rgba(0, 255, 255, 0.06);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 255, 255, 0.12);
    border-color: rgba(0, 255, 255, 0.3);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;

  position: absolute;
  top: 50px;
  left: 0;
  bottom: 0;
  z-index: 10;

  width: 240px;
  padding: 16px;
  color: #ffffff;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-radius: 0;
  border-right: 1px solid rgba(0, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;

export const LeftPanel = styled(Panel)<{ $open?: boolean }>`
  @media (max-width: 768px) {
    width: 80vw;
    max-width: 280px;
    transition: transform 0.2s ease;
    transform: translateX(${(props) => (props.$open ? "0" : "-100%")});
  }
`;

export const RightPanel = styled(Panel)`
  right: 20px;
`;

export const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid rgba(0, 255, 255, 0.08);
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: rgba(0, 255, 255, 0.7);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const CollapseAllGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-left: auto;
`;

export const CollapseAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  color: rgba(0, 255, 255, 0.4);
  font-size: 13px;
  line-height: 1;
  background: none;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: #00ffff;
    background: rgba(0, 255, 255, 0.05);
    border-color: rgba(0, 255, 255, 0.2);
  }
`;

export const ButtonGroup = styled.div<{ $nowrap?: boolean }>`
  display: flex;
  flex-wrap: ${(props) => (props.$nowrap ? "nowrap" : "wrap")};
  gap: 8px;
`;

export const Button = styled.button<{
  $active?: boolean;
  $disabled?: boolean;
  $danger?: boolean;
  $compact?: boolean;
}>`
  flex: ${(props) => (props.$compact ? "0 0 auto" : "1 1 auto")};
  min-width: ${(props) => (props.$compact ? "0" : "60px")};
  padding: 8px 12px;
  color: ${(props) =>
    props.$disabled
      ? "rgba(255, 255, 255, 0.2)"
      : props.$danger
        ? "#ff4444"
        : props.$active
          ? "#00ffff"
          : "rgba(255, 255, 255, 0.7)"};
  font-size: 13px;
  font-weight: 500;
  text-shadow: ${(props) =>
    props.$active ? "0 0 8px rgba(0, 255, 255, 0.4)" : "none"};
  background: ${(props) =>
    props.$disabled
      ? "rgba(255, 255, 255, 0.03)"
      : props.$danger
        ? "rgba(255, 0, 0, 0.1)"
        : props.$active
          ? "rgba(0, 255, 255, 0.12)"
          : "rgba(0, 255, 255, 0.03)"};
  border: 1px solid
    ${(props) =>
      props.$active
        ? "rgba(0, 255, 255, 0.5)"
        : props.$danger
          ? "rgba(255, 0, 0, 0.3)"
          : "rgba(0, 255, 255, 0.1)"};
  border-radius: 8px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$disabled
        ? "rgba(255, 255, 255, 0.03)"
        : props.$danger
          ? "rgba(255, 0, 0, 0.15)"
          : props.$active
            ? "rgba(0, 255, 255, 0.18)"
            : "rgba(0, 255, 255, 0.06)"};
    border-color: ${(props) =>
      props.$disabled
        ? "rgba(0, 255, 255, 0.1)"
        : props.$danger
          ? "rgba(255, 0, 0, 0.5)"
          : props.$active
            ? "rgba(0, 255, 255, 0.7)"
            : "rgba(0, 255, 255, 0.3)"};
    box-shadow: ${(props) =>
      props.$active ? "0 0 16px rgba(0, 255, 255, 0.15)" : "none"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ColorInputWrap = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden; /* 원하는 크기 */ /* 원형으로 설정 */
`;

export const ColorInput = styled.input`

  position: absolute;
  top: -50%;
  left: -50%;
  width: 200% !important;
  height: 200% !important;
  background: none;
  border: none;
  cursor: pointer;
  /* width: 100%;
  height: 36px;
  min-height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent; */
`;

export const NumberInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  color: #ffffff;
  font-size: 13px;
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.1);
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  color: #ffffff;
  font-size: 13px;
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 8px;
  outline: none;

  &:focus {
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 8px rgba(0, 255, 255, 0.1);
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const DimField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

export const DimLabel = styled.span`
  padding-left: 2px;
  font-size: 10px;
  font-weight: 700;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const DimInputWrapper = styled.div`
  flex: 0 0 auto;
  position: relative;

  input {
    width: 100%;
    padding-right: 24px;
    box-sizing: border-box;
  }
`;

export const DimInlineLabel = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  font-size: 10px;
  font-weight: 700;
  color: #52525b;
  text-transform: uppercase;
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
`;

export const Hint = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.25);
  line-height: 1.5;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`;

export const ListItem = styled.div<{
  $selected?: boolean;
  $kind?: "room" | "furniture";
  $indent?: number;
  $dragOver?: boolean;
  $tree?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 6px 10px;
  color: ${(props) =>
    props.$selected ? "#00ffff" : "rgba(255, 255, 255, 0.7)"};
  font-size: 13px;
  text-shadow: ${(props) =>
    props.$selected ? "0 0 8px rgba(0, 255, 255, 0.3)" : "none"};
  background: ${(props) =>
    props.$selected ? "rgba(0, 255, 255, 0.12)" : "rgba(0, 255, 255, 0.02)"};

  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: ${(props) =>
    props.$dragOver ? "1px solid rgba(0, 255, 255, 0.5)" : "none"};

  ${(props) => props.$indent && `margin-left: ${10 + props.$indent * 16}px;`}

  &:hover {
    background: ${(props) =>
      props.$selected ? "rgba(0, 255, 255, 0.18)" : "rgba(0, 255, 255, 0.06)"};
  }

  ${(props) =>
    props.$tree &&
    `
    &::before {
      content: '';
      position: absolute;
      left: -12px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 2px;
      background: rgba(0, 255, 255, 0.15);
    }
  `}
`;

export const RoomChildren = styled.div<{
  $dragOver?: boolean;
  $empty?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 14px;
  padding-left: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-left: 2px solid rgba(0, 255, 255, 0.12);
  outline: ${(props) =>
    props.$dragOver ? "1px dashed rgba(0, 255, 255, 0.4)" : "none"};
  outline-offset: 2px;
  border-radius: 4px;

  ${(props) =>
    props.$empty &&
    `
    min-height: 28px;
    align-items: center;
    justify-content: center;
  `}
`;

export const ListItemType = styled.span`
  font-size: 11px;
  color: rgba(0, 255, 255, 0.4);
`;

export const CollapseToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  color: rgba(0, 255, 255, 0.4);
  font-size: 10px;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #00ffff;
  }
`;

export const RoomName = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const HeaderButtons = styled.div<{ $open?: boolean }>`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    right: 0;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    min-width: 160px;
    padding: 12px;
    gap: 10px;
    background: rgba(10, 10, 15, 0.95);
    border: 1px solid rgba(0, 255, 255, 0.1);
    border-radius: 0 0 0 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    transform-origin: top right;
    transform: scaleY(${(props) => (props.$open ? "1" : "0")});
    opacity: ${(props) => (props.$open ? "1" : "0")};
    pointer-events: ${(props) => (props.$open ? "auto" : "none")};
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
    z-index: 20;

    & > button {
      width: 100%;
    }
  }
`;

export const OpacitySlider = styled.input`
  width: 100%;
  cursor: pointer;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  position: absolute;
  top: 50px;
  left: 240px;
  right: 0px;
  z-index: 5;
  padding: 8px 14px;
  color: #ffffff;
  background: rgba(10, 10, 15, 0.5);
  border-bottom: 1px solid rgba(0, 255, 255, 0.06);

  @media (max-width: 768px) {
    left: 0;
    top: 52px;
    padding: 8px 10px;
  }
`;

export const ToolbarDivider = styled.div`
  flex-shrink: 0;
  width: 1px;
  height: 22px;
  background: rgba(0, 255, 255, 0.1);
`;
