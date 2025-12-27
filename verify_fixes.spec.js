
const { test, expect } = require('@playwright/test');
const path = require('path');

const languages = [
  { code: 'zh', home: 'index.html', island: 'dao.html' },
  { code: 'hi', home: 'index.html', island: 'dweep.html' }
];

for (const lang of languages) {
  test(`Visual verification for ${lang.code} homepage`, async ({ page }) => {
    const filePath = path.join(__dirname, lang.code, lang.home);
    await page.goto(`file://${filePath}`);
    await page.screenshot({ path: `screenshot-${lang.code}-home-fixed.png`, fullPage: true });
    // Add an assertion to make the test valid
    await expect(page.locator('h1')).toBeVisible();
  });

  test(`Visual verification for ${lang.code} island page`, async ({ page }) => {
    const filePath = path.join(__dirname, lang.code, lang.island);
    await page.goto(`file://${filePath}`);
    await page.screenshot({ path: `screenshot-${lang.code}-island-fixed.png`, fullPage: true });
    await expect(page.locator('h1')).toBeVisible();
  });
}
