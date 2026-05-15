const BasePage = require('./BasePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.url = 'https://automationexercise.com';
        this.locators = {
            signupLoginLink: 'a[href="/login"]',
            productsLink: 'a[href="/products"]',
        };
    }

    async navigate() {
        await this.navigateTo(this.url);
    }

    async clickSignupLogin() {
        await this.click(this.locators.signupLoginLink);
    }

    async clickProducts() {
        await this.dismissConsentOverlay();
        await Promise.all([
            this.page.waitForURL('**/products', { timeout: 15000 }),
            this.page.locator(this.locators.productsLink).click(),
        ]);
        await this.dismissConsentOverlay();
    }
}

module.exports = HomePage;
