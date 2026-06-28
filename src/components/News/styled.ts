import styled, { keyframes } from "styled-components";

export const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const glitch = keyframes`
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 1px); }
  94% { transform: translate(2px, -1px); }
  96% { transform: translate(-1px, 2px); }
  98% { transform: translate(1px, -2px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const flicker = keyframes`
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 22%, 24%, 55% { opacity: 0.6; }
`;

export const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
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
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

export const Scanline = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 255, 255, 0.015) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: ${scanline} 8s linear infinite;
`;

export const GlowOrb = styled.div<{ $x: number; $y: number; $color: string; $delay: number }>`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, ${({ $color }) => $color}40 0%, transparent 70%);
  top: ${({ $y }) => $y}%;
  left: ${({ $x }) => $x}%;
  filter: blur(60px);
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

export const Badge = styled.div`
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #00ffff;
  opacity: 0.6;
  animation: ${flicker} 3s linear infinite;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
`;

export const Title = styled.h1`
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 800;
  color: #fff;
  text-align: center;
  line-height: 1.1;
  margin: 0;
  animation: ${glitch} 5s infinite;

  span {
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 520px;
`;

export const Card = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 28px;
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 10px;
  background: rgba(0, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(0, 255, 255, 0.5);
    background: rgba(0, 255, 255, 0.06);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.15), 0 0 60px rgba(0, 255, 255, 0.05);
    transform: translateY(-1px);
  }

  &:hover .arrow {
    transform: translateX(4px);
  }
`;

export const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.15), rgba(255, 0, 255, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const CardDesc = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
`;

export const Arrow = styled.span`
  font-size: 20px;
  color: #00ffff;
  transition: transform 0.3s ease;
  margin-left: auto;
`;

export const Footer = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.15);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
`;
