const { dismissCookiePopup } = require('../support/cookieConsent');

class ProductPage {
    constructor(page) {
        this.page = page;
        this.searchInput = '#search_product';
        this.searchBtn = '#submit_search';
        this.addToCartBtn = '.productinfo .btn';
    }

    async searchProduct(product) {
        await this.page.fill(this.searchInput, product);
        await dismissCookiePopup(this.page);
        await this.page.click(this.searchBtn);
    }

    async addFirstProductToCart() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.addToCartBtn).first().click();
    }
}

module.exports = ProductPage;
