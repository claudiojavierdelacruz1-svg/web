const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const startPagePath = path.resolve('en/index.html');
  console.log(`Navigating to file://${startPagePath}`);
  await page.goto(`file://${startPagePath}`);

  console.log('Clicking on the "Diving" link...');
  await page.click('nav a:has-text("Diving")');

  await page.waitForLoadState('networkidle');

  const finalUrl = page.url();
  console.log(`Final URL is: ${finalUrl}`);

  const screenshotDir = 'verification';
  const screenshotPath = path.join(screenshotDir, 'diving_link_test.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to ${screenshotPath}`);

  if (finalUrl.includes('es/submarinismo.html')) {
      console.error('Error: Link incorrectly navigates to the Spanish page!');
      process.exit(1);
  } else if (finalUrl.includes('en/diving.html')) {
      console.log('Success: Link correctly navigates to the English page.');
  } else {
      console.warn('Warning: Link navigates to an unexpected page.');
  }

  await browser.close();
})();
