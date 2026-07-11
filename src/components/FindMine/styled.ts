import styled, { css } from "styled-components";

const SILVER = "#c0c0c0";
const LIGHT = "#ffffff";
const GRAY = "#808080";
const DARK = "#404040";

const raised = css`
  background: ${SILVER};
  border-top: 2px solid ${LIGHT};
  border-left: 2px solid ${LIGHT};
  border-right: 2px solid ${DARK};
  border-bottom: 2px solid ${DARK};
`;

const sunken = css`
  background: ${SILVER};
  border-top: 2px solid ${DARK};
  border-left: 2px solid ${DARK};
  border-right: 2px solid ${LIGHT};
  border-bottom: 2px solid ${LIGHT};
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 16px;
  background: #008080;
  font-family: Tahoma, "MS Sans Serif", "Segoe UI", sans-serif;
  color: #000;
`;

export const Heading = styled.div`
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-shadow: 1px 1px 0 #000;
`;

export const DifficultyRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const DiffButton = styled.button<{ $active: boolean }>`
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 16px;
  color: #000;
  cursor: pointer;
  ${raised}
  box-shadow: inset 1px 1px 0 #dfdfdf;

  &:active {
    ${sunken}
  }

  ${({ $active }) =>
    $active &&
    css`
      ${sunken}
      color: #000080;
      text-shadow: none;
    `}
`;

export const Panel = styled.div`
  ${raised}
  padding: 8px;
  background: ${SILVER};
`;

export const Hud = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 8px;
  margin-bottom: 8px;
  ${sunken}
  background: ${SILVER};
`;

export const Counter = styled.div`
  background: #000;
  display: flex;
  align-items: center;
  padding: 4px 7px;
  border-top: 2px solid ${DARK};
  border-left: 2px solid ${DARK};
  border-right: 2px solid ${LIGHT};
  border-bottom: 2px solid ${LIGHT};
`;

export const LedRow = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

export const FaceButton = styled.button<{ $state: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffd83b;
  border-top: 2px solid #fff7c2;
  border-left: 2px solid #fff7c2;
  border-right: 2px solid #b38f00;
  border-bottom: 2px solid #b38f00;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:active {
    border-top: 2px solid #b38f00;
    border-left: 2px solid #b38f00;
    border-right: 2px solid #fff7c2;
    border-bottom: 2px solid #fff7c2;
  }
`;

export const FaceGraphic = styled.div<{ $state: string }>`
  position: relative;
  width: 24px;
  height: 24px;

  .eye {
    position: absolute;
    top: 6px;
    width: 4px;
    height: 5px;
    background: #1a1a1a;
    border-radius: 50%;
  }
  .eye.left {
    left: 4px;
  }
  .eye.right {
    right: 4px;
  }

  .mouth {
    position: absolute;
    bottom: 5px;
    left: 6px;
    width: 12px;
    height: 6px;
    border: 2px solid #1a1a1a;
    border-top: none;
    border-radius: 0 0 10px 10px;
  }

  ${({ $state }) =>
    $state === "lost" &&
    css`
      .eye {
        top: 7px;
        width: 7px;
        height: 7px;
        background: transparent;
        border-radius: 0;
        border-left: 2px solid #1a1a1a;
        border-bottom: 2px solid #1a1a1a;
        transform: rotate(-45deg);
      }
      .eye.left {
        left: 3px;
      }
      .eye.right {
        right: 3px;
      }
      .mouth {
        height: 5px;
        border: 2px solid #1a1a1a;
        border-bottom: none;
        border-radius: 10px 10px 0 0;
        bottom: 4px;
      }
    `}

  ${({ $state }) =>
    $state === "won" &&
    css`
      .eye {
        top: 7px;
        width: 8px;
        height: 5px;
        background: #1a1a1a;
        border-radius: 2px;
      }
      .eye.left {
        left: 3px;
      }
      .eye.right {
        right: 3px;
      }
    `}
`;

export const Field = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 30px);
  ${sunken}
  background: ${SILVER};
  padding: 0;
`;

export const Cell = styled.button<{
  $revealed: boolean;
  $n: number;
  $mine: boolean;
  $lost: boolean;
  $pressed: boolean;
}>`
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  padding: 0;
  font-family: Tahoma, "Segoe UI", Verdana, sans-serif;
  font-size: 21px;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 0.7px currentColor;
  paint-order: stroke fill;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $revealed }) => ($revealed ? "default" : "pointer")};
  user-select: none;
  background: ${SILVER};
  border-style: solid;
  border-width: 4px;

  ${({ $revealed, $n, $mine, $lost, $pressed }) => {
    if ($revealed) {
      if ($mine) {
        return css`
          border-width: 1px;
          border-color: ${GRAY};
          background: ${$lost ? "#ff0000" : SILVER};
        `;
      }
      const colors = [
        "",
        "#0000ff",
        "#008000",
        "#ff0000",
        "#000080",
        "#800000",
        "#008080",
        "#000000",
        "#808080",
      ];
      return css`
        border-width: 1px;
        border-color: ${GRAY};
        color: ${colors[$n] || "#000000"};
      `;
    }
    // 눌림(코드 실패) 상태: 안쪽으로 꺼진 베벨
    if ($pressed) {
      return css`
        border-top-color: ${DARK};
        border-left-color: ${DARK};
        border-right-color: ${LIGHT};
        border-bottom-color: ${LIGHT};
      `;
    }
    // 닫힌 타일: 위·왼쪽 밝게, 오른쪽·아래 진하게 (입체 베벨)
    return css`
      border-top-color: ${LIGHT};
      border-left-color: ${LIGHT};
      border-right-color: ${DARK};
      border-bottom-color: ${DARK};
    `;
  }}
`;

export const MineMark = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const FlagMark = styled.span`
  position: relative;
  width: 16px;
  height: 16px;

  &::before {
    content: "";
    position: absolute;
    left: 9px;
    top: 2px;
    width: 2px;
    height: 11px;
    background: #000;
  }
  &::after {
    content: "";
    position: absolute;
    left: 1px;
    top: 2px;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-right: 9px solid #ff0000;
  }
`;

export const FlagBase = styled.span`
  position: absolute;
  left: 2px;
  bottom: 1px;
  width: 11px;
  height: 3px;
  background: #000;
  border: 1px solid #000;
`;

export const WrongX = styled.span`
  position: absolute;
  width: 22px;
  height: 22px;
  pointer-events: none;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 10px;
    top: 0;
    width: 2px;
    height: 22px;
    background: #ff0000;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const Status = styled.div`
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-shadow: 1px 1px 0 #000;
  min-height: 18px;
`;

export const Hint = styled.div`
  color: #e0e0e0;
  font-size: 11px;
  text-shadow: 1px 1px 0 #000;
`;
