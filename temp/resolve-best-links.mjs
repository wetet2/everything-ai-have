import { chromium } from 'playwright';
import fs from 'fs';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
  });
  await page.goto('https://www.techmeme.com/', { waitUntil: 'domcontentloaded' });
  
  const clusters = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.clus')).map((c, i) => {
      const mainLink = c.querySelector('.ourh');
      const title = mainLink ? mainLink.innerText.trim() : '';
      const mainUrl = mainLink ? mainLink.href : '';
      
      const allLinks = Array.from(c.querySelectorAll('a'))
        .map(a => ({ text: a.innerText.trim(), href: a.href }))
        .filter(l => l.href && !l.href.includes('techmeme.com') && !l.href.endsWith('.com/') && !l.href.endsWith('.org/'));
      
      const desc = c.querySelector('.indent')?.innerText?.trim() || '';
      
      return { index: i, title, mainUrl, desc, allLinks };
    });
  });
  
  fs.writeFileSync('temp/techmeme-full-clusters.json', JSON.stringify(clusters, null, 2), 'utf8');
  console.log(`Saved ${clusters.length} full clusters.`);
  await browser.close();
}

main().catch(console.error);
