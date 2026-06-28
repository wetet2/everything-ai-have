import fs from "fs";
import path from "path";
import NewsPage from "@/components/News";
import type { NewsItem } from "@/components/News";

export async function getStaticProps() {
  const dir = path.join(process.cwd(), "public", "news");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));

  const news: NewsItem[] = files
    .map((file) => {
      const match = file.match(/ai-news-digest-(\d{4})-(\d{4})\.html$/);
      if (!match) return null;

      const [_, start, end] = match;
      const fmt = (d: string) => `2025.${d.slice(0, 2)}.${d.slice(2, 4)}`;
      return {
        title: `AI 뉴스 다이제스트`,
        href: `/news/${file}`,
        dateStart: fmt(start),
        dateEnd: fmt(end),
        label: `${fmt(start)} — ${fmt(end)}`,
      };
    })
    .filter((x): x is NewsItem => x !== null)
    .sort((a, b) => b.dateEnd.localeCompare(a.dateEnd));

  return { props: { news } };
}

export default NewsPage;
