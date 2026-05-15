const { dismissCookiePopup } = require('../support/cookieConsent');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
        await this.dismissConsentOverlay();
    }

    async click(selector) {
        await this.dismissConsentOverlay();
        await this.page.locator(selector).click();
    }

    async fill(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    async check(selector) {
        await this.page.locator(selector).check();
    }

    async selectOption(selector, value) {
        await this.page.locator(selector).selectOption(value);
    }

    async getText(selector, timeout = 10000) {
        const locator = this.page.locator(selector);
        await locator.waitFor({ state: 'visible', timeout });

        return (await locator.innerText()).trim();
    }

    async isVisible(selector, timeout = 10000) {
        try {
            await this.page.locator(selector).waitFor({ state: 'visible', timeout });
            return true;
        } catch (error) {
            return false;
        }
    }

    async dismissConsentOverlay() {
        await dismissCookiePopup(this.page);
    }
}

module.exports = BasePage;
