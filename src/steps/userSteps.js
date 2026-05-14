const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');

Given('user launches the application', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.navigate();
});

When('user navigates to signup page', async function () {
    await this.homePage.clickSignupLogin();
});

When('user enters signup details', async function () {
    this.loginPage = new LoginPage(this.page);
    this.signupUser = {
        name: 'Automation User',
        email: `test${Date.now()}@mail.com`,
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

    await this.loginPage.signup(this.signupUser.name, this.signupUser.email);
});

Then('signup page should be displayed', async function () {
    assert.ok(await this.page.url().includes('signup'));
    assert.ok(await this.loginPage.isSignupPageDisplayed());
});

When('user completes account registration', async function () {
    await this.loginPage.completeAccountRegistration(this.signupUser);
});

Then('account should be created successfully', async function () {
    assert.ok(await this.loginPage.isAccountCreated());
    await this.loginPage.continueAfterAccountCreated();
    assert.ok(await this.loginPage.isLoggedInAs(this.signupUser.name));
    await this.loginPage.deleteAccountIfPresent();
});

When('user logs in with valid credentials', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.login('test@test.com', 'password123');
});

Then('user should be logged in', async function () {
    assert.ok(await this.page.url());
});

When('user searches for a product', async function () {
    await this.homePage.clickProducts();
    this.productPage = new ProductPage(this.page);
    await this.productPage.searchProduct('Blue Top');
});

Then('matching products should be displayed', async function () {
    const content = await this.page.content();
    assert.ok(content.includes('Blue Top'));
});

When('user adds a product to cart', async function () {
    await this.homePage.clickProducts();
    this.productPage = new ProductPage(this.page);
    await this.productPage.addFirstProductToCart();
});

Then('product should be added to cart', async function () {
    const content = await this.page.content();
    assert.ok(content.includes('Added'));
});
