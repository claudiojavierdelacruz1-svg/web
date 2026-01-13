const { test, expect } = require('@playwright/test');
const path = require('path');

const languageConfigs = [
    { name: 'English', path: 'en/index.html', link: 'Diving', expected: 'en/diving.html' },
    { name: 'Spanish', path: 'es/index.html', link: 'Submarinismo', expected: 'es/submarinismo.html' },
    { name: 'French', path: 'fr/index.html', link: 'Plongée', expected: 'fr/plongee.html' },
    { name: 'Chinese', path: 'zh/index.html', link: '潜水', expected: 'zh/qian-shui.html' },
    { name: 'Japanese', path: 'ja/index.html', link: 'ダイビング', expected: 'ja/daibingu.html' },
    { name: 'Hindi', path: 'hi/index.html', link: 'डाइविंग', expected: 'hi/gota-khori.html' },
];

for (const config of languageConfigs) {
    test(`verifies diving link for ${config.name}`, async ({ page }) => {
        const filePath = path.join(__dirname, config.path);
        await page.goto(`file://${filePath}`);
        await page.click(`text=${config.link}`);
        const expectedPath = path.join(__dirname, config.expected);
        expect(page.url()).toBe(`file://${expectedPath}`);
        await page.screenshot({ path: `test-results/screenshot-${config.name}.png` });
    });
}
