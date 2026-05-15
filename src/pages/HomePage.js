const { dismissCookiePopup } = require('../support/cookieConsent');

class HomePage {
    constructor(page) {
        this.page = page;
        this.signupLoginLink = 'a[href="/login"]';
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com');
        await this.dismissConsentOverlay();
    }

    async clickSignupLogin() {
        await this.dismissConsentOverlay();
        await this.page.click(this.signupLoginLink);
    }

    async clickProducts() {
        await this.dismissConsentOverlay();
        await Promise.all([
            this.page.waitForURL('**/products', { timeout: 15000 }),
            this.page.getByRole('link', { name: /products/i }).click(),
        ]);
        await this.dismissConsentOverlay();
    }

    async dismissConsentOverlay() {
        await dismissCookiePopup(this.page);
    }
}

module.exports = HomePage;
