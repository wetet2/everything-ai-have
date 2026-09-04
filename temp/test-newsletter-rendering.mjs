import { chromium } from 'playwright';
import path from 'path';

async function testRender() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  const filePath = 'file:///' + path.resolve('public/news/ai-news-digest-0830-0904.html').replace(/\\/g, '/');
  console.log('Loading newsletter:', filePath);
  
  await page.goto(filePath, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // Check titles and cards count
  const cardCount = await page.locator('.story-card').count();
  console.log('Rendered story cards:', cardCount);

  // Check digest cards count
  const digestCount = await page.locator('.digest-card').count();
  console.log('Rendered digest cards:', digestCount);

  // Test filter
  await page.click('button[data-cat="benchmark"]');
  const benchmarkCards = await page.locator('.story-card').count();
  console.log('Benchmark filtered cards:', benchmarkCards);

  // Reset filter
  await page.click('button[data-cat="all"]');

  // Test modal
  await page.locator('.story-card').first().click();
  const isModalOpen = await page.locator('#detailModal.open').isVisible();
  console.log('Modal opened on first card click:', isModalOpen);
  
  const modalTitle = await page.locator('#modalTitle').innerText();
  const modalLink = await page.locator('#modalLinkBtn').getAttribute('href');
  console.log('Modal title:', modalTitle);
  console.log('Modal link:', modalLink);

  await page.click('#modalCloseBtn');
  const isModalClosed = !(await page.locator('#detailModal.open').isVisible());
  console.log('Modal closed:', isModalClosed);

  // Capture screenshot
  await page.screenshot({ path: 'temp/newsletter-rendered.png', fullPage: false });
  console.log('Saved screenshot to temp/newsletter-rendered.png');

  await browser.close();
}

testRender().catch(console.error);
