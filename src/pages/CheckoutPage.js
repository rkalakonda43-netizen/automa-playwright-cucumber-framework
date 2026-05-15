const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            proceedToCheckoutButton: 'a.check_out',
            placeOrderLink: 'a[href="/payment"]',
            nameOnCardInput: 'input[name="name_on_card"]',
            cardNumberInput: 'input[name="card_number"]',
            cvcInput: 'input[name="cvc"]',
            expiryMonthInput: 'input[name="expiry_month"]',
            expiryYearInput: 'input[name="expiry_year"]',
            payAndConfirmButton: '#submit',
            orderPlacedHeading: 'h2[data-qa="order-placed"]',
            orderConfirmedMessage: 'text=Congratulations! Your order has been confirmed!',
        };
    }

    async proceedToCheckout() {
        await this.click(this.locators.proceedToCheckoutButton);
    }

    async placeOrder() {
        await this.click(this.locators.placeOrderLink);
    }

    async fillPaymentDetails(paymentDetails) {
        await this.fill(this.locators.nameOnCardInput, paymentDetails.nameOnCard);
        await this.fill(this.locators.cardNumberInput, paymentDetails.cardNumber);
        await this.fill(this.locators.cvcInput, paymentDetails.cvc);
        await this.fill(this.locators.expiryMonthInput, paymentDetails.expiryMonth);
        await this.fill(this.locators.expiryYearInput, paymentDetails.expiryYear);
        await this.click(this.locators.payAndConfirmButton);
    }

    async getOrderPlacedHeadingText() {
        return this.getText(this.locators.orderPlacedHeading);
    }

    async getOrderConfirmedMessageText() {
        return this.getText(this.locators.orderConfirmedMessage);
    }
}

module.exports = CheckoutPage;
