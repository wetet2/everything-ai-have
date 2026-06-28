import styled, { keyframes } from "styled-components";

const scanMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: #ffdd00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: "Pretendard", sans-serif;
  padding: 80px 20px;
`;

export const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
`;

export const Scanline = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.02) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: ${scanMove} 10s linear infinite;
`;

export const GlowBar = styled.div<{ $top: string; $left: string; $color: string }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $color }) => $color}25 0%, transparent 70%);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  filter: blur(80px);
  pointer-events: none;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
  max-width: 560px;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 700;

  &::after {
    content: "";
    width: 4px;
    height: 4px;
    background: #2266ff;
    border-radius: 50%;
    animation: ${blink} 1s step-end infinite;
  }
`;

export const Title = styled.h1`
  font-size: clamp(28px, 6vw, 48px);
  font-weight: 800;
  color: #0a0a0f;
  text-align: center;
  line-height: 1.15;
  margin: 0;

  span {
    background: linear-gradient(135deg, #0a0a0f, #2266ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 520px;
`;

export const Card = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &:hover .arrow {
    transform: translateX(4px);
    color: #2266ff;
  }
`;

export const CardIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  min-width: 0;
`;

export const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0f;
`;

export const CardDesc = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
`;

export const Arrow = styled.span`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
  margin-left: auto;
  flex-shrink: 0;
`;

export const Footer = styled.div`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
`;
