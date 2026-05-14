const { dismissCookiePopup } = require('../support/cookieConsent');

class HomePage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto('https://automationexercise.com');
        await this.dismissConsentOverlay();
    }

    async clickSignupLogin() {
        await this.dismissConsentOverlay();
        await this.page.getByRole('link', { name: /signup \/ login/i }).click();
    }

    async clickProducts() {
        await this.dismissConsentOverlay();
        await this.page.getByRole('link', { name: /products/i }).click();
    }

    async clickCart() {
        await this.dismissConsentOverlay();
        await this.page.getByRole('link', { name: /cart/i }).click();
    }

    async dismissConsentOverlay() {
        await dismissCookiePopup(this.page);
    }
}

module.exports = HomePage;
