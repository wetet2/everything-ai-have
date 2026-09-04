import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });
  
  await page.goto('https://www.techmeme.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  const stories = await page.evaluate(() => {
    const items = [];
    document.querySelectorAll('.clus').forEach((clus) => {
      const mainLink = clus.querySelector('.ourh');
      if (!mainLink) return;
      const title = mainLink.innerText.trim();
      const url = mainLink.href;
      const source = clus.querySelector('.sour')?.innerText?.trim() || '';
      const cite = clus.querySelector('cite')?.innerText?.trim() || '';
      
      const altLinks = [];
      clus.querySelectorAll('.more, .drh').forEach(a => {
        altLinks.push({ text: a.innerText.trim(), url: a.href });
      });
      
      items.push({ title, url, source, cite, altLinks: altLinks.slice(0, 5) });
    });
    return items;
  });
  
  fs.writeFileSync('temp/techmeme-live-clusters.json', JSON.stringify(stories, null, 2), 'utf8');
  console.log(`Saved ${stories.length} clusters.`);
  await browser.close();
}

main().catch(console.error);
