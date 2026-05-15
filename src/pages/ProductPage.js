const BasePage = require('./BasePage');

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            addToCartButton: '.productinfo .btn',
            viewCartLink: 'u:has-text("View Cart")',
            addedToCartTitle: '.modal-content h4:has-text("Added!")',
            cartProductName: '#cart_info .cart_description h4',
            searchInput: '#search_product',
            searchButton: '#submit_search',
            searchedProductsHeading: 'h2.title:has-text("Searched Products")',
            productCards: '.features_items .product-image-wrapper',
        };
    }

    async searchForProduct(productName) {
        await this.dismissConsentOverlay();
        await this.page.locator(this.locators.searchInput).waitFor({ state: 'visible', timeout: 15000 });
        await this.fill(this.locators.searchInput, productName);
        await this.click(this.locators.searchButton);
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissConsentOverlay();
    }

    async areMatchingProductsDisplayed(productName) {
        const matchingProduct = this.page
            .locator(this.locators.productCards)
            .filter({ hasText: new RegExp(escapeRegExp(productName), 'i') });
        await matchingProduct.first().waitFor({ state: 'visible', timeout: 20000 });

        return await matchingProduct.first().isVisible();
    }

    async addFirstProductToCart() {
        await this.dismissConsentOverlay();
        await this.page.locator(this.locators.addToCartButton).first().click();
    }

    async getAddedToCartText() {
        return this.getText(this.locators.addedToCartTitle);
    }

    async clickViewCart() {
        await this.click(this.locators.viewCartLink);
    }

    async getCartProductName() {
        const locator = this.page.locator(this.locators.cartProductName).first();
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        return (await locator.innerText()).trim();
    }

    async isProductVisibleInCart(productName) {
        return this.page.locator('#cart_info').getByText(productName).isVisible();
    }
}

module.exports = ProductPage;
