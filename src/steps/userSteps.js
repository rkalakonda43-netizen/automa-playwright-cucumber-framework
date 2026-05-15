const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');

function buildSignupUser() {
    return {
        name: 'Automation User',
        email: `test${Date.now()}${Math.floor(Math.random() * 10000)}@mail.com`,
        password: 'Password123',
        day: '10',
        month: '5',
        year: '1995',
        firstName: 'Automation',
        lastName: 'User',
        company: 'Test Company',
        address: '123 Test Street',
        address2: 'Suite 456',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90001',
        mobileNumber: '5551234567',
    };
}

function buildPaymentDetails() {
    return {
        nameOnCard: 'Automation User',
        cardNumber: '4111111111111111',
        cvc: '123',
        expiryMonth: '12',
        expiryYear: '2030',
    };
}

function normalizeUiText(value) {
    return value.trim().replace(/\s+/g, ' ').toLowerCase();
}

function assertTextMatches(actual, expected) {
    assert.strictEqual(normalizeUiText(actual), normalizeUiText(expected));
}

Given('user launches the application', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.navigate();
});

When(/^user clicks on Signup\/Login button$/, async function () {
    await this.homePage.clickSignupLogin();
});

When('user enters signup details', async function () {
    this.loginPage = new LoginPage(this.page);
    this.signupUser = buildSignupUser();

    await this.loginPage.signup(this.signupUser.name, this.signupUser.email);
});

Then('signup page should be displayed', async function () {
    assert.ok(await this.loginPage.isSignupPageDisplayed());
});

When('user completes account registration', async function () {
    await this.loginPage.completeAccountRegistration(this.signupUser);
});

Then('User should see {string}', async function (message) {
    assertTextMatches(await this.loginPage.getAccountCreatedText(), message);
});

When('user has a registered account', async function () {
    this.loginPage = new LoginPage(this.page);
    this.signupUser = buildSignupUser();

    await this.loginPage.signup(this.signupUser.name, this.signupUser.email);
    await this.loginPage.completeAccountRegistration(this.signupUser);
    assertTextMatches(await this.loginPage.getAccountCreatedText(), 'Account Created!');
    await this.loginPage.continueAfterAccountCreated();
    await this.loginPage.logout();
});

When('user logs in with valid credentials', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.login(this.signupUser.email, this.signupUser.password);
});

Then('user should be logged in', async function () {
    assert.ok(await this.loginPage.isLoggedInAs(this.signupUser.name));
});

Then('user can see Logout button', async function () {
    assert.ok(await this.loginPage.isLogoutButtonVisible());
});

When('user searches for a product {string}', async function (productName) {
    this.productPage = new ProductPage(this.page);

    await this.homePage.clickProducts();
    await this.productPage.searchForProduct(productName);
});

Then('matching products {string} should be displayed', async function (productName) {
    assert.ok(await this.productPage.areMatchingProductsDisplayed(productName));
});

When('wait for 50 seconds', async function () {
    await this.page.waitForTimeout(50 * 1000);
});

When('I wait for 50 seconds', async function () {
    await this.page.waitForTimeout(50 * 1000);
});

When('user adds a product to cart', async function () {
    await this.homePage.clickProducts();
    this.productPage = new ProductPage(this.page);
    this.selectedProductName = 'Blue Top';
    await this.productPage.addFirstProductToCart();
});

Then('product should be added to cart', async function () {
    assert.strictEqual(await this.productPage.getAddedToCartText(), 'Added!');
});

When('user clicks on view cart button', async function () {
    await this.productPage.clickViewCart();
});

When('user click on view cart button', async function () {
    await this.productPage.clickViewCart();
});

Then('user should see the product in the cart', async function () {
    assert.strictEqual(await this.productPage.getCartProductName(), this.selectedProductName);
});

When('user clicks on proceed to checkout button', async function () {
    await this.productPage.proceedToCheckout();
});

When('user clicks on place order button', async function () {
    await this.productPage.placeOrder();
});

When('User clicks on place order button', async function () {
    await this.productPage.placeOrder();
});

When('user fills in payment details', async function () {
    await this.productPage.fillPaymentDetails(buildPaymentDetails());
});

Then('the order should be placed successfully with message {string}', async function (expectedMessage) {
    assertTextMatches(await this.productPage.getOrderPlacedHeadingText(), 'Order Placed!');
    assertTextMatches(await this.productPage.getOrderConfirmedMessageText(), expectedMessage);
});
