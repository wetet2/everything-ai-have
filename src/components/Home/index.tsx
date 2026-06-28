import Head from "next/head";

import * as S from "./styled";

const pages = [
  {
    href: "/t",
    short: "Typing",
    icon: "⌨️",
    title: "타자연습",
    desc: "영문 타자 실력 향상 트레이닝",
  },
  {
    href: "/c",
    short: "Furniture",
    icon: "🪑",
    title: "Drop The Furniture",
    desc: "3D 공간에 가구 배치하기",
  },
  {
    href: "/d",
    short: "Drawing",
    icon: "✏️",
    title: "Drawing Board",
    desc: "자유롭게 그리고 색칠하기",
  },
  {
    href: "/g",
    short: "Chat",
    icon: "💬",
    title: "AI Chat",
    desc: "AI와 자유로운 대화",
  },
  {
    href: "/n",
    short: "News",
    icon: "📰",
    title: "AI 뉴스",
    desc: "최신 AI 뉴스 다이제스트",
  },
];

export default function Home() {
  return (
    <S.Container>
      <Head>
        <title>everything-ai-have</title>
        <meta
          name="description"
          content="everything-ai-have — 여러 AI 도구를 한곳에 모은 프로젝트입니다."
        />
      </Head>
      <S.Toolbar>
        <S.ToolbarBrand>
          everything<span>ai</span>have
        </S.ToolbarBrand>
      </S.Toolbar>
      <S.Grid />
      <S.Scanline />
      <S.Orb $top="10%" $left="5%" $size="400px" $delay={0} />
      <S.Orb $top="60%" $left="70%" $size="350px" $delay={2.5} />
      <S.Content>
        <S.Badge>master & guest</S.Badge>
        <S.Title>
          나의 <span>AI</span>저씨
        </S.Title>
        <S.Subtitle>AI 주인님께 드리는 미천한 나의 프롬프트</S.Subtitle>
        <S.CardGrid>
          {pages.map((p) => (
            <S.Card key={p.href} href={p.href}>
              <S.CardIcon>{p.icon}</S.CardIcon>
              <S.CardText>
                <S.CardTitle>{p.title}</S.CardTitle>
                <S.CardDesc>{p.desc}</S.CardDesc>
              </S.CardText>
              <S.Arrow className="arrow">→</S.Arrow>
            </S.Card>
          ))}
        </S.CardGrid>
        <S.Footer>©https://github.com/wetet2</S.Footer>
      </S.Content>
    </S.Container>
  );
}
