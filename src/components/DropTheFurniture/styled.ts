import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #1a1a1a;
`;

export const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: #272727;
  backdrop-filter: blur(8px);
  color: #ffffff;

  h1 {
    font-size: 18px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    color: #cccccc;
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

  width: 240px;
  /* max-height: calc(100vh - 100px); */
  padding: 16px;

  border-radius: 0px;
  background: rgba(30, 30, 30, 0.88);
  backdrop-filter: blur(10px);
  color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  z-index: 10;
`;

export const LeftPanel = styled(Panel)`
  /* left: 20px; */
`;

export const RightPanel = styled(Panel)`
  right: 20px;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #3f3f46;
  margin: 0;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #eeeeee;
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
  border: none;
  border-radius: 8px;
  background: ${(props) =>
    props.$disabled
      ? "#52525b"
      : props.$danger
        ? "#dc2626"
        : props.$active
          ? "#3b82f6"
          : "#3f3f46"};
  color: ${(props) => (props.$disabled ? "#a1a1aa" : "#ffffff")};
  font-size: 13px;
  font-weight: 500;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: background 0.15s ease;

  &:hover {
    background: ${(props) =>
      props.$disabled
        ? "#52525b"
        : props.$danger
          ? "#b91c1c"
          : props.$active
            ? "#2563eb"
            : "#52525b"};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ColorInputWrap = styled.div`
  position: relative;
  width: 32px; /* 원하는 크기 */
  height: 32px;
  border-radius: 50%; /* 원형으로 설정 */
  overflow: hidden;
`;

export const ColorInput = styled.input`
  /* width: 100%;
  height: 36px;
  min-height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: transparent; */

  position: absolute;
  top: -50%;
  left: -50%;
  width: 200% !important;
  height: 200% !important;
  border: none;
  cursor: pointer;
  background: none;
`;

export const NumberInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #52525b;
  border-radius: 8px;
  background: #27272a;
  color: #ffffff;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #52525b;
  border-radius: 8px;
  background: #27272a;
  color: #ffffff;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #3b82f6;
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
  font-size: 10px;
  font-weight: 700;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding-left: 2px;
`;

export const DimInputWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;

  input {
    padding-right: 24px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const DimInlineLabel = styled.span`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  font-weight: 700;
  color: #52525b;
  text-transform: uppercase;
  pointer-events: none;
  user-select: none;
`;

export const Hint = styled.div`
  font-size: 12px;
  color: #a1a1aa;
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;

  ${(props) => props.$indent && `margin-left: ${10 + props.$indent * 16}px;`}

  border-radius: 6px;
  background: ${(props) => (props.$selected ? "#3b82f6" : "#3f3f46")};
  color: #ffffff;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease;
  outline: ${(props) => (props.$dragOver ? "2px solid #60a5fa" : "none")};

  &:hover {
    background: ${(props) => (props.$selected ? "#2563eb" : "#52525b")};
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
      background: #52525b;
    }
  `}
`;

export const RoomChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 14px;
  padding-left: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-left: 2px solid #52525b;
`;

export const ListItemType = styled.span`
  font-size: 11px;
  color: #d4d4d8;
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const OpacitySlider = styled.input`
  width: 100%;
  cursor: pointer;
`;

export const Toolbar = styled.div`
  position: absolute;
  top: 50px;
  left: 240px;
  right: 0px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  color: #ffffff;
  flex-wrap: wrap;
`;

export const ToolbarDivider = styled.div`
  width: 1px;
  height: 22px;
  background: #3f3f46;
  flex-shrink: 0;
`;
