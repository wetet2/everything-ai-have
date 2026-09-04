import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

async function scrapeAllDays() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const days = ['260903', '260902', '260901', '260831', '260830'];
  const allStories = [];

  for (const day of days) {
    const page = await context.newPage();
    const url = `https://www.techmeme.com/${day}/`;
    console.log(`Opening Techmeme archive: ${url}`);

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
      const items = await page.evaluate((d) => {
        const list = [];
        document.querySelectorAll(".clus").forEach((clus) => {
          const a = clus.querySelector(".ourh");
          const cite = clus.querySelector(".cite")?.innerText?.trim() || "";
          const desc = clus.querySelector(".sub")?.innerText?.trim() || "";
          if (a && a.href) {
            list.push({
              day: d,
              title: a.innerText.trim(),
              url: a.href,
              source: cite,
              desc: desc
            });
          }
        });
        return list;
      }, day);

      console.log(`  Found ${items.length} items for ${day}`);
      allStories.push(...items);
    } catch (e) {
      console.error(`  Error on ${day}:`, e.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  writeFileSync("temp/techmeme-archive-raw.json", JSON.stringify(allStories, null, 2), "utf8");
  console.log(`Total collected: ${allStories.length} stories! Saved to temp/techmeme-archive-raw.json`);
}

scrapeAllDays().catch(console.error);
