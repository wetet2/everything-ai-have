import { chromium } from "playwright";

async function checkArchiveLinks() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox']
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  await page.goto("https://www.techmeme.com/", { waitUntil: "domcontentloaded" });

  const archiveLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("a"))
      .map(a => a.href)
      .filter(h => h.includes("/260"));
  });

  console.log("Archive links found:", [...new Set(archiveLinks)].slice(0, 20));
  await browser.close();
}

checkArchiveLinks();
