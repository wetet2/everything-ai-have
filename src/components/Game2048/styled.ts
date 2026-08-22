import styled, { css, keyframes } from "styled-components";

// 타일 숫자별 색상 매핑
const TILE_COLORS: Record<number, { bg: string; color: string; fontSize?: string }> = {
  2: { bg: "#eee4da", color: "#776e65" },
  4: { bg: "#ede0c8", color: "#776e65" },
  8: { bg: "#f2b179", color: "#f9f6f2" },
  16: { bg: "#f59563", color: "#f9f6f2" },
  32: { bg: "#f67c5f", color: "#f9f6f2" },
  64: { bg: "#f65e3b", color: "#f9f6f2" },
  128: { bg: "#edcf72", color: "#f9f6f2", fontSize: "1.6rem" },
  256: { bg: "#edcc61", color: "#f9f6f2", fontSize: "1.6rem" },
  512: { bg: "#edc850", color: "#f9f6f2", fontSize: "1.6rem" },
  1024: { bg: "#edc53f", color: "#f9f6f2", fontSize: "1.3rem" },
  2048: { bg: "#edc22e", color: "#f9f6f2", fontSize: "1.3rem" },
};

// 큰 숫자용 기본 스타일
const SUPER_TILE = { bg: "#3c3a32", color: "#f9f6f2", fontSize: "1.1rem" };

// 타일 등장 애니메이션
const popIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// 타일 병합 애니메이션
const mergeAnim = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

// 게임오버 페이드인
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  box-sizing: border-box;
  width: 100%;
  min-height: 100dvh;
  padding: 24px 16px;

  font-family: "Inter", "Segoe UI", system-ui, -apple-system, sans-serif;
  color: #f9f6f2;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
  max-width: 400px;
`;

export const Title = styled.h1`
  margin: 0;

  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #edc22e, #f2b179, #f67c5f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ScoreArea = styled.div`
  display: flex;
  gap: 8px;
`;

export const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  min-width: 70px;
  padding: 8px 12px;
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
`;

export const ScoreLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
`;

export const ScoreValue = styled.span`
  font-size: 1.2rem;
  font-weight: 800;
  color: #f9f6f2;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 400px;
`;

export const NewGameButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #f9f6f2;
  background: linear-gradient(135deg, #f67c5f, #f2b179);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(246, 124, 95, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const UndoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;

  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #f9f6f2;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const Board = styled.div`
  position: relative;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

export const Grid = styled.div<{ $size: number }>`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$size}, 1fr);
  gap: 8px;

  position: relative;

  padding: 8px;
`;

export const EmptyCell = styled.div`
  width: clamp(60px, 18vw, 85px);
  height: clamp(60px, 18vw, 85px);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.05);
`;


export const Tile = styled.div<{ $value: number; $isNew: boolean; $isMerged: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  border-radius: 8px;

  font-size: ${(p) => {
    const style = TILE_COLORS[p.$value] ?? SUPER_TILE;
    return style.fontSize ?? "2rem";
  }};
  font-weight: 800;
  color: ${(p) => (TILE_COLORS[p.$value] ?? SUPER_TILE).color};
  background: ${(p) => (TILE_COLORS[p.$value] ?? SUPER_TILE).bg};
  box-shadow: ${(p) =>
    p.$value >= 128
      ? `0 0 20px rgba(237, 197, 63, ${Math.min(0.1 + p.$value / 4096, 0.6)})`
      : "none"};

  ${(p) =>
    p.$isNew &&
    css`
      animation: ${popIn} 0.2s ease forwards;
    `}

  ${(p) =>
    p.$isMerged &&
    css`
      animation: ${mergeAnim} 0.2s ease;
    `}
`;

export const Overlay = styled.div<{ $won?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  position: absolute;
  inset: 0;
  z-index: 10;

  border-radius: 12px;

  background: ${(p) =>
    p.$won ? "rgba(237, 194, 46, 0.7)" : "rgba(0, 0, 0, 0.6)"};
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.4s ease;
`;

export const OverlayText = styled.span<{ $won?: boolean }>`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: ${(p) => (p.$won ? "#776e65" : "#f9f6f2")};
  text-shadow: ${(p) =>
    p.$won ? "none" : "0 2px 8px rgba(0, 0, 0, 0.5)"};
`;

export const OverlayButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;

  font-size: 0.9rem;
  font-weight: 700;
  color: #f9f6f2;
  background: linear-gradient(135deg, #f67c5f, #f2b179);
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Instruction = styled.p`
  max-width: 400px;
  margin: 0;

  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
`;

