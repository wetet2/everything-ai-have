import Head from "next/head";
import {
  Container,
  Grid,
  Scanline,
  GlowBar,
  Content,
  Badge,
  Title,
  Card,
  CardIcon,
  CardText,
  CardTitle,
  CardDesc,
  Arrow,
  List,
  Footer,
} from "./styled";

export interface NewsItem {
  title: string;
  href: string;
  dateStart: string;
  dateEnd: string;
  label: string;
}

interface Props {
  news: NewsItem[];
}

export default function NewsPage({ news }: Props) {
  return (
    <Container>
      <Head>
        <title>AI 뉴스 다이제스트 — everything-ai-have</title>
        <meta
          name="description"
          content="최신 AI 뉴스를 한눈에 모아보는 AI 뉴스 다이제스트입니다. 인공지능 트렌드와 소식을 날짜별로 정리했습니다."
        />
        <meta
          name="keywords"
          content="AI 뉴스, 인공지능, AI 다이제스트, AI 소식, 인공지능 트렌드, Artificial Intelligence, News"
        />
        <meta name="author" content="everything-ai-have" />
        <meta name="theme-color" content="#0a0a0f" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI 뉴스 다이제스트 — everything-ai-have" />
        <meta
          property="og:description"
          content="최신 AI 뉴스를 한눈에 모아보는 AI 뉴스 다이제스트입니다."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AI 뉴스 다이제스트 — everything-ai-have" />
        <meta
          name="twitter:description"
          content="최신 AI 뉴스를 한눈에 모아보는 AI 뉴스 다이제스트입니다."
        />
      </Head>
      <Grid />
      <Scanline />
      <GlowBar $top="15%" $left="10%" $color="#ffdd00" />
      <GlowBar $top="60%" $left="75%" $color="#2266ff" />

      <Content>
        <Badge>AI 뉴스 다이제스트</Badge>
        <Title>
          인공지능,<br />
          <span>오늘의 프론티어</span>
        </Title>

        <List>
          {news.map((item) => (
            <Card key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
              <CardIcon>📡</CardIcon>
              <CardText>
                <CardTitle>{item.title}</CardTitle>
                <CardDesc>{item.label}</CardDesc>
              </CardText>
              <Arrow className="arrow">→</Arrow>
            </Card>
          ))}
        </List>

        <Footer>neural feed // everything-ai-have</Footer>
      </Content>
    </Container>
  );
}
