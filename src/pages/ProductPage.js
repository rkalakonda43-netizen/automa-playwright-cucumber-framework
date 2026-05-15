const { dismissCookiePopup } = require('../support/cookieConsent');

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
    }

    async addFirstProductToCart() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.addToCartBtn).first().click();
    }

    async clickViewCart() {
        await dismissCookiePopup(this.page);
        await this.page.locator(this.viewCartLink).click();
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
}

module.exports = ProductPage;
