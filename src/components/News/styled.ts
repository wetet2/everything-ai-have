import styled, { keyframes } from "styled-components";

const scanMove = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glitch1 = keyframes`
  0%, 100% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(20% 0 60% 0); }
  40% { clip-path: inset(40% 0 40% 0); }
  60% { clip-path: inset(60% 0 20% 0); }
  80% { clip-path: inset(80% 0 5% 0); }
`;

const glitch2 = keyframes`
  0%, 100% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(10% 0 70% 0); }
  40% { clip-path: inset(50% 0 30% 0); }
  60% { clip-path: inset(30% 0 50% 0); }
  80% { clip-path: inset(70% 0 10% 0); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.8; }
  94% { opacity: 1; }
  96% { opacity: 0.6; }
  97% { opacity: 1; }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  padding: 80px 20px;
  font-family: "Pretendard", sans-serif;
  background: #0a0a0f;
  overflow: hidden;
`;

export const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.04) 1px, transparent 1px);
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
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, ${({ $color }) => $color}25 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 1;
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
  color: rgba(255, 0, 255, 0.6);
  font-weight: 700;

  &::after {
    width: 4px;
    height: 4px;
    background: #00ffff;
    content: "";
    border-radius: 50%;
    animation: ${blink} 1s step-end infinite;
  }
`;

export const Title = styled.h1`
  font-size: clamp(28px, 6vw, 48px);
  font-weight: 900;
  color: #fff;
  text-align: center;
  line-height: 1.15;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${flicker} 3s linear infinite;

  span:first-child {
    color: #00ffff;
    text-shadow:
      0 0 4px #00ffff,
      0 0 12px #00ffff66,
      0 0 24px #00ffff33;
  }

  .glitch {
    position: relative;
    color: #ff00ff;
    text-shadow:
      0 0 4px #ff00ff,
      0 0 12px #ff00ff66,
      0 0 24px #ff00ff33;

    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    &::before {
      color: #00ffff;
      animation: ${glitch1} 2s infinite linear alternate-reverse;
    }

    &::after {
      color: #ff00ff;
      animation: ${glitch2} 2s infinite linear alternate-reverse;
    }
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
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 0, 255, 0.15);
  border-radius: 8px;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow:
      0 0 12px rgba(0, 255, 255, 0.15),
      inset 0 0 12px rgba(0, 255, 255, 0.05);
    transform: translateY(-2px);
  }

  &:hover .arrow {
    color: #00ffff;
    transform: translateX(4px);
  }
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  font-size: 16px;
  background: rgba(255, 0, 255, 0.08);
  border-radius: 6px;
  border: 1px solid rgba(255, 0, 255, 0.2);
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
  color: #fff;
`;

export const CardDesc = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
`;

export const Arrow = styled.span`
  flex-shrink: 0;
  margin-left: auto;
  font-size: 16px;
  color: rgba(255, 0, 255, 0.3);
  transition: all 0.25s ease;
`;

export const Footer = styled.div`
  font-size: 10px;
  color: rgba(0, 255, 255, 0.3);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 600;
`;
