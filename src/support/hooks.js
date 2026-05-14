const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { dismissCookiePopup, installCookiePopupHandler } = require('./cookieConsent');

setDefaultTimeout(60 * 1000);

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

After(async function () {
    const closeDelay = Number(process.env.BROWSER_CLOSE_DELAY || 0);

    if (this.page && closeDelay > 0) {
        await this.page.waitForTimeout(closeDelay);
    }

    if (this.browser) {
        await this.browser.close();
    }
});
