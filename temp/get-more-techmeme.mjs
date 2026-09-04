import { chromium } from "playwright";

async function getMoreTechmeme() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ userAgent: 'Mozilla/5.0' });
  await page.goto("https://www.techmeme.com/", { waitUntil: "domcontentloaded" });

  const all = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll(".clus, .ii").forEach((el) => {
      const a = el.querySelector(".ourh") || el.querySelector("a");
      const cite = el.querySelector(".cite")?.innerText?.trim() || "";
      if (a && a.href && !a.href.includes("techmeme.com")) {
        list.push({
          title: a.innerText.trim(),
          url: a.href,
          source: cite
        });
      }
    });
    return list;
  });

  console.log(`Total external links found on Techmeme front page: ${all.length}`);
  all.forEach((item, i) => {
    if (item.title.length > 20) {
      console.log(`[${i+1}] [${item.source}] ${item.title}`);
      console.log(`     URL: ${item.url}`);
    }
  });

  await browser.close();
}

getMoreTechmeme();
