const { chromium } = require('playwright');
const path = require('path');

(async () => {
  if (process.argv.length < 3) {
    console.error('Usage: node verify.js <file-path-1> <file-path-2> ...');
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePaths = process.argv.slice(2);

  for (const filePath of filePaths) {
      const absolutePath = path.resolve(filePath);
      console.log(`Navigating to file://${absolutePath}`);
      await page.goto(`file://${absolutePath}`);

      const screenshotDir = 'verification';
      const screenshotFile = `${path.basename(filePath, '.html')}_page.png`;
      const screenshotPath = path.join(screenshotDir, screenshotFile);

      await page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved to ${screenshotPath}`);
  }

  await browser.close();
})();
