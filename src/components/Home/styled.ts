import { keyframes } from "styled-components";
import styled from "styled-components";
import Link from "next/link";

export const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

export const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

export const Toolbar = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 52px;
  padding: 0 24px;
  background: rgba(10, 10, 15, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
`;

export const ToolbarBrand = styled.div`
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;

  span {
    color: #00ffff;
    text-shadow: 0 0 8px rgba(0, 255, 255, 0.4);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  padding: 92px 20px 40px;
  background: #0a0a0f;
  overflow: hidden;
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
    rgba(0, 255, 255, 0.01) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  animation: ${scanline} 10s linear infinite;
`;

export const Orb = styled.div<{
  $top: string;
  $left: string;
  $size: string;
  $delay: number;
}>`
  position: absolute;
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  background: radial-gradient(
    circle,
    rgba(0, 255, 255, 0.06) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(60px);
  animation: ${pulse} 5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 600px;
`;

export const Badge = styled.div`
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(0, 255, 255, 0.5);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: clamp(28px, 6vw, 48px);
  font-weight: 800;
  color: #fff;
  text-align: center;
  line-height: 1.15;
  margin: 0;

  span {
    background: linear-gradient(135deg, #00ffff, #ff00ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const Subtitle = styled.p`
  margin: -24px 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  letter-spacing: 0.5px;
`;

export const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  text-decoration: none;
  background: rgba(0, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 10px;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 255, 0.05);
    border-color: rgba(0, 255, 255, 0.4);
    box-shadow: 0 0 24px rgba(0, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  font-size: 20px;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 255, 0.12),
    rgba(255, 0, 255, 0.08)
  );
  border-radius: 8px;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Arrow = styled.span`
  flex-shrink: 0;
  font-size: 18px;
  color: rgba(0, 255, 255, 0.4);
  transition: transform 0.25s ease;

  ${Card}:hover & {
    color: #00ffff;
    transform: translateX(4px);
  }
`;

export const Footer = styled.div`
  margin-top: 8px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.1);
  letter-spacing: 2px;
  text-transform: uppercase;
`;
