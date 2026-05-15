const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { dismissCookiePopup, installCookiePopupHandler } = require('./cookieConsent');

setDefaultTimeout(60 * 1000);

function sanitizeFileName(value) {
    return value
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-+|-+$/g, '')
        .toLowerCase();
}

Before(async function () {
    const headless = process.env.HEADLESS !== 'false';
    const slowMo = Number(process.env.SLOW_MO || 0);
    const devtools = process.env.DEVTOOLS === 'true';

    console.log(`Launching Chromium in ${headless ? 'headless' : 'headed'} mode`);

    if (process.env.PWDEBUG === '1') {
        console.log('PWDEBUG is enabled. Use the Playwright Inspector to step through the scenario.');
    }

    this.browser = await chromium.launch({ headless, slowMo, devtools });
    this.page = await this.browser.newPage();
    await installCookiePopupHandler(this.page);
    this.dismissCookiePopup = async () => dismissCookiePopup(this.page);
});

After(async function (scenario) {
    const closeDelay = Number(process.env.BROWSER_CLOSE_DELAY || 0);

    if (scenario.result?.status === Status.FAILED && this.page) {
        const screenshotsDir = process.env.SCREENSHOTS_DIR || path.join(process.cwd(), 'reports', 'screenshots');
        const scenarioName = sanitizeFileName(scenario.pickle?.name || 'failed-scenario');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join(screenshotsDir, `${scenarioName}-${timestamp}.png`);
        const screenshot = await this.page.screenshot({ fullPage: true });

        fs.mkdirSync(screenshotsDir, { recursive: true });
        fs.writeFileSync(screenshotPath, screenshot);

        await this.attach(screenshot, 'image/png');
        await this.attach(`Failure screenshot saved to: ${screenshotPath}`, 'text/plain');
    }

    if (this.page && closeDelay > 0) {
        await this.page.waitForTimeout(closeDelay);
    }

    if (this.browser) {
        await this.browser.close();
    }
});
