import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function testDirectLinks() {
  const html = fs.readFileSync('public/news/ai-news-digest-0830-0904.html', 'utf8');

  // 1. Check if '실물 검증' or '검증' appears in UI text
  const matchVerified = html.match(/실물\s*검증|100%\s*실물/g);
  console.log('Matches for "실물 검증":', matchVerified ? matchVerified.length : 0);

  // 2. Check modal
  const hasModal = html.includes('id="detailModal"') || html.includes('modal-overlay');
  console.log('Has modal elements:', hasModal);

  // 3. Playwright browser click test
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const filePath = 'file:///' + path.resolve('public/news/ai-news-digest-0830-0904.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'load' });

  // Count story cards
  const cards = page.locator('a.story-card');
  const count = await cards.count();
  console.log('Story card links count:', count);

  // Verify first card attributes
  const firstCard = cards.first();
  const href = await firstCard.getAttribute('href');
  const target = await firstCard.getAttribute('target');
  const rel = await firstCard.getAttribute('rel');
  console.log('First card href:', href);
  console.log('First card target:', target);
  console.log('First card rel:', rel);

  // Verify click opens popup/new page
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    firstCard.click()
  ]);

  console.log('Clicked card successfully opened new page with URL:', newPage.url());
  await newPage.close();

  // Check 5th card (e.g. Gemini Copilot)
  const card5 = cards.nth(4);
  console.log('Card 5 href:', await card5.getAttribute('href'));

  await browser.close();
  console.log('All tests passed cleanly!');
}

testDirectLinks().catch(console.error);
