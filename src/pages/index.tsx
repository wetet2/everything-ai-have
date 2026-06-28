import { keyframes } from "styled-components";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";

const pulse = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
`;

const scanline = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0f;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const Scanline = styled.div`
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

const Orb = styled.div<{ $top: string; $left: string; $size: string; $delay: number }>`
  position: absolute;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.06) 0%, transparent 70%);
  top: ${({ $top }) => $top};
  left: ${({ $left }) => $left};
  filter: blur(60px);
  animation: ${pulse} 5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
  max-width: 600px;
`;

const Badge = styled.div`
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: rgba(0, 255, 255, 0.5);
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
  text-align: center;
`;

const Title = styled.h1`
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

const Subtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  margin: -24px 0 0;
  letter-spacing: 0.5px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  @media (min-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border: 1px solid rgba(0, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(0, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  text-decoration: none;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(0, 255, 255, 0.4);
    background: rgba(0, 255, 255, 0.05);
    box-shadow: 0 0 24px rgba(0, 255, 255, 0.1);
    transform: translateY(-1px);
  }
`;

const CardIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.12), rgba(255, 0, 255, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
`;

const CardTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;

const CardDesc = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Arrow = styled.span`
  font-size: 18px;
  color: rgba(0, 255, 255, 0.4);
  transition: transform 0.25s ease;
  flex-shrink: 0;

  ${Card}:hover & {
    transform: translateX(4px);
    color: #00ffff;
  }
`;

const Footer = styled.div`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.1);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 8px;
`;

const pages = [
  { href: "/c", icon: "🪑", title: "Drop The Furniture", desc: "3D 공간에 가구 배치하기" },
  { href: "/d", icon: "✏️", title: "Drawing Board", desc: "자유롭게 그리고 색칠하기" },
  { href: "/g", icon: "💬", title: "AI Chat", desc: "AI와 자유로운 대화" },
  { href: "/n", icon: "📰", title: "AI 뉴스", desc: "최신 AI 뉴스 다이제스트" },
];

export default function Home() {
  return (
    <Container>
      <Head>
        <title>everything-ai-have</title>
        <meta name="description" content="everything-ai-have — 여러 AI 도구를 한곳에 모은 프로젝트입니다." />
      </Head>
      <Grid />
      <Scanline />
      <Orb $top="10%" $left="5%" $size="400px" $delay={0} />
      <Orb $top="60%" $left="70%" $size="350px" $delay={2.5} />
      <Content>
        <Badge>everything-ai-have</Badge>
        <Title>
          모든 <span>AI</span> 도구를 <span>한곳</span>에
        </Title>
        <Subtitle>원하는 도구를 선택하세요</Subtitle>
        <CardGrid>
          {pages.map((p) => (
            <Card key={p.href} href={p.href}>
              <CardIcon>{p.icon}</CardIcon>
              <CardText>
                <CardTitle>{p.title}</CardTitle>
                <CardDesc>{p.desc}</CardDesc>
              </CardText>
              <Arrow className="arrow">→</Arrow>
            </Card>
          ))}
        </CardGrid>
        <Footer>© everything-ai-have</Footer>
      </Content>
    </Container>
  );
}
