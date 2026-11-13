const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/jbati/casashantijp/screenshot-full.png', fullPage: true });
  await browser.close();
})();
