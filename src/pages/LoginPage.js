const BasePage = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.locators = {
            signupNameInput: 'input[data-qa="signup-name"]',
            signupEmailInput: 'input[data-qa="signup-email"]',
            signupButton: 'button[data-qa="signup-button"]',
            loginEmailInput: 'input[data-qa="login-email"]',
            loginPasswordInput: 'input[data-qa="login-password"]',
            loginButton: 'button[data-qa="login-button"]',
            genderTitle: '#id_gender1',
            passwordInput: 'input[data-qa="password"]',
            daySelect: 'select[data-qa="days"]',
            monthSelect: 'select[data-qa="months"]',
            yearSelect: 'select[data-qa="years"]',
            newsletterCheckbox: '#newsletter',
            specialOffersCheckbox: '#optin',
            firstNameInput: 'input[data-qa="first_name"]',
            lastNameInput: 'input[data-qa="last_name"]',
            companyInput: 'input[data-qa="company"]',
            addressInput: 'input[data-qa="address"]',
            address2Input: 'input[data-qa="address2"]',
            countrySelect: 'select[data-qa="country"]',
            stateInput: 'input[data-qa="state"]',
            cityInput: 'input[data-qa="city"]',
            zipcodeInput: 'input[data-qa="zipcode"]',
            mobileNumberInput: 'input[data-qa="mobile_number"]',
            accountInformationTitle: 'text=Enter Account Information',
            createAccountButton: 'button[data-qa="create-account"]',
            accountCreatedTitle: '[data-qa="account-created"]',
            continueButton: 'a[data-qa="continue-button"]',
            logoutLink: 'a[href="/logout"]',
        };
    }

    async signup(name, email) {
        await this.fill(this.locators.signupNameInput, name);
        await this.fill(this.locators.signupEmailInput, email);
        await this.click(this.locators.signupButton);
    }

    async isSignupPageDisplayed() {
        return (await this.isVisible(this.locators.accountInformationTitle))
            && (await this.isVisible(this.locators.createAccountButton));
    }

    async login(email, password) {
        await this.fill(this.locators.loginEmailInput, email);
        await this.fill(this.locators.loginPasswordInput, password);
        await this.click(this.locators.loginButton);
    }

    async completeAccountRegistration(user) {
        await this.check(this.locators.genderTitle);
        await this.fill(this.locators.passwordInput, user.password);
        await this.selectOption(this.locators.daySelect, user.day);
        await this.selectOption(this.locators.monthSelect, user.month);
        await this.selectOption(this.locators.yearSelect, user.year);
        await this.check(this.locators.newsletterCheckbox);
        await this.check(this.locators.specialOffersCheckbox);
        await this.fill(this.locators.firstNameInput, user.firstName);
        await this.fill(this.locators.lastNameInput, user.lastName);
        await this.fill(this.locators.companyInput, user.company);
        await this.fill(this.locators.addressInput, user.address);
        await this.fill(this.locators.address2Input, user.address2);
        await this.selectOption(this.locators.countrySelect, user.country);
        await this.fill(this.locators.stateInput, user.state);
        await this.fill(this.locators.cityInput, user.city);
        await this.fill(this.locators.zipcodeInput, user.zipcode);
        await this.fill(this.locators.mobileNumberInput, user.mobileNumber);
        await this.click(this.locators.createAccountButton);
        await this.page.locator(this.locators.accountCreatedTitle).waitFor({ state: 'visible', timeout: 20000 });
    }

    async getAccountCreatedText() {
        return this.getText(this.locators.accountCreatedTitle, 20000);
    }

    async isAccountCreated(message = 'Account Created!') {
        return await this.getAccountCreatedText() === message;
    }

    async continueAfterAccountCreated() {
        await this.click(this.locators.continueButton);
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissConsentOverlay();
    }

    async isLoggedInAs(name) {
        return this.isVisible(`text=Logged in as ${name}`);
    }

    async isLogoutButtonVisible() {
        return this.isVisible(this.locators.logoutLink);
    }

    async logout() {
        await this.click(this.locators.logoutLink);
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissConsentOverlay();
    }
}

module.exports = LoginPage;
