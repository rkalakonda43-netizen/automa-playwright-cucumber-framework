const { dismissCookiePopup } = require('../support/cookieConsent');

function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartBtn = '.productinfo .btn';
        this.viewCartLink = 'u:has-text("View Cart")';
        this.proceedToCheckoutButton = 'a.check_out';
        this.placeOrderLink = 'a[href="/payment"]';
        this.nameOnCardInput = 'input[name="name_on_card"]';
        this.cardNumberInput = 'input[name="card_number"]';
        this.cvcInput = 'input[name="cvc"]';
        this.expiryMonthInput = 'input[name="expiry_month"]';
        this.expiryYearInput = 'input[name="expiry_year"]';
        this.payAndConfirmButton = '#submit';
        this.orderPlacedHeading = 'h2[data-qa="order-placed"]';
        this.orderConfirmedMessage = 'text=Congratulations! Your order has been confirmed!';
        this.addedToCartTitle = '.modal-content h4:has-text("Added!")';
        this.cartProductName = '#cart_info .cart_description h4';
        this.searchInput = '#search_product';
        this.searchButton = '#submit_search';
        this.searchedProductsHeading = 'h2.title:has-text("Searched Products")';
        this.productCards = '.features_items .product-image-wrapper';
    }

    async searchForProduct(productName) {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.searchInput).waitFor({ state: 'visible', timeout: 15000 });
        await this.page.locator(this.searchInput).fill(productName);
        await dismissCookiePopup(this.page);
        await this.page.locator(this.searchButton).click();
        await this.page.waitForLoadState('domcontentloaded');
        await dismissCookiePopup(this.page);
    }

    async areMatchingProductsDisplayed(productName) {
        const matchingProduct = this.page
            .locator(this.productCards)
            .filter({ hasText: new RegExp(escapeRegExp(productName), 'i') });
        await matchingProduct.first().waitFor({ state: 'visible', timeout: 20000 });

        return await matchingProduct.first().isVisible();
    }

    async addFirstProductToCart() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.addToCartBtn).first().click();
    }

    async getAddedToCartText() {
        const locator = this.page.locator(this.addedToCartTitle);
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        return (await locator.innerText()).trim();
    }

    async clickViewCart() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.viewCartLink).click();
    }

    async getCartProductName() {
        const locator = this.page.locator(this.cartProductName).first();
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        return (await locator.innerText()).trim();
    }

    async isProductVisibleInCart(productName) {
        return this.page.locator('#cart_info').getByText(productName).isVisible();
    }

    async proceedToCheckout() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.proceedToCheckoutButton).click();
    }

    async placeOrder() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.placeOrderLink).click();
    }

    async fillPaymentDetails(paymentDetails) {
        await this.page.fill(this.nameOnCardInput, paymentDetails.nameOnCard);
        await this.page.fill(this.cardNumberInput, paymentDetails.cardNumber);
        await this.page.fill(this.cvcInput, paymentDetails.cvc);
        await this.page.fill(this.expiryMonthInput, paymentDetails.expiryMonth);
        await this.page.fill(this.expiryYearInput, paymentDetails.expiryYear);
        await this.page.locator(this.payAndConfirmButton).click();
    }

    async isOrderPlacedSuccessfully() {
        await this.page.locator(this.orderPlacedHeading).waitFor({ state: 'visible' });

        return this.page.locator(this.orderConfirmedMessage).isVisible();
    }

    async getOrderPlacedHeadingText() {
        const locator = this.page.locator(this.orderPlacedHeading);
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        return (await locator.innerText()).trim();
    }

    async getOrderConfirmedMessageText() {
        const locator = this.page.locator(this.orderConfirmedMessage);
        await locator.waitFor({ state: 'visible', timeout: 10000 });

        return (await locator.innerText()).trim();
    }
}

module.exports = ProductPage;
