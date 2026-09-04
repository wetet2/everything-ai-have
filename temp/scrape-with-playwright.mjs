import { chromium } from "playwright";

async function scrapePlaywright() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();
  console.log("Opening Techmeme...");
  await page.goto("https://www.techmeme.com/", { waitUntil: "domcontentloaded", timeout: 20000 });

  const headlines = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll(".clus").forEach((clus) => {
      const a = clus.querySelector(".ourh");
      if (a) {
        items.push({
          title: a.innerText.trim(),
          url: a.href,
          source: clus.querySelector(".cite")?.innerText?.trim() || ""
        });
      }
    });
    return items;
  });

  console.log(`Found ${headlines.length} items on Techmeme:`);
  headlines.slice(0, 15).forEach((h, i) => {
    console.log(`[${i+1}] [${h.source}] ${h.title}\n     URL: ${h.url}`);
  });

  await browser.close();
}

scrapePlaywright().catch(console.error);
