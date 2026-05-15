const { dismissCookiePopup } = require('../support/cookieConsent');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupBtn = 'button[data-qa="signup-button"]';

        this.loginEmail = 'input[data-qa="login-email"]';
        this.loginPassword = 'input[data-qa="login-password"]';
        this.loginBtn = 'button[data-qa="login-button"]';

        this.genderTitle = '#id_gender1';
        this.password = 'input[data-qa="password"]';
        this.day = 'select[data-qa="days"]';
        this.month = 'select[data-qa="months"]';
        this.year = 'select[data-qa="years"]';
        this.newsletter = '#newsletter';
        this.specialOffers = '#optin';
        this.firstName = 'input[data-qa="first_name"]';
        this.lastName = 'input[data-qa="last_name"]';
        this.company = 'input[data-qa="company"]';
        this.address = 'input[data-qa="address"]';
        this.address2 = 'input[data-qa="address2"]';
        this.country = 'select[data-qa="country"]';
        this.state = 'input[data-qa="state"]';
        this.city = 'input[data-qa="city"]';
        this.zipcode = 'input[data-qa="zipcode"]';
        this.mobileNumber = 'input[data-qa="mobile_number"]';
        this.accountInformationTitle = 'text=Enter Account Information';
        this.createAccountBtn = 'button[data-qa="create-account"]';
        this.accountCreatedTitle = '[data-qa="account-created"]';
        this.continueBtn = 'a[data-qa="continue-button"]';
        this.logoutLink = 'a[href="/logout"]';
    }

    async signup(name, email) {
        await this.page.fill(this.nameInput, name);
        await this.page.fill(this.emailInput, email);
        await this.dismissConsentOverlay();
        await this.page.click(this.signupBtn);
    }

    async isSignupPageDisplayed() {
        return (await this.isVisible(this.accountInformationTitle))
            && (await this.isVisible(this.createAccountBtn));
    }

    async login(email, password) {
        await this.page.fill(this.loginEmail, email);
        await this.page.fill(this.loginPassword, password);
        await this.dismissConsentOverlay();
        await this.page.click(this.loginBtn);
    }

    async completeAccountRegistration(user) {
        await this.page.check(this.genderTitle);
        await this.page.fill(this.password, user.password);
        await this.page.selectOption(this.day, user.day);
        await this.page.selectOption(this.month, user.month);
        await this.page.selectOption(this.year, user.year);
        await this.page.check(this.newsletter);
        await this.page.check(this.specialOffers);
        await this.page.fill(this.firstName, user.firstName);
        await this.page.fill(this.lastName, user.lastName);
        await this.page.fill(this.company, user.company);
        await this.page.fill(this.address, user.address);
        await this.page.fill(this.address2, user.address2);
        await this.page.selectOption(this.country, user.country);
        await this.page.fill(this.state, user.state);
        await this.page.fill(this.city, user.city);
        await this.page.fill(this.zipcode, user.zipcode);
        await this.page.fill(this.mobileNumber, user.mobileNumber);
        await this.dismissConsentOverlay();
        await this.page.click(this.createAccountBtn);
        await this.page.locator(this.accountCreatedTitle).waitFor({ state: 'visible', timeout: 20000 });
    }

    async getAccountCreatedText() {
        const locator = this.page.locator(this.accountCreatedTitle);
        await locator.waitFor({ state: 'visible', timeout: 20000 });

        return (await locator.innerText()).trim();
    }

    async isAccountCreated(message = 'Account Created!') {
        return await this.getAccountCreatedText() === message;
    }

    async continueAfterAccountCreated() {
        await this.dismissConsentOverlay();
        await this.page.click(this.continueBtn);
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissConsentOverlay();
    }

    async isLoggedInAs(name) {
        return this.isVisible(`text=Logged in as ${name}`);
    }

    async isLogoutButtonVisible() {
        return this.isVisible(this.logoutLink);
    }

    async logout() {
        await this.dismissConsentOverlay();
        await this.page.click(this.logoutLink);
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissConsentOverlay();
    }

    async isVisible(selector) {
        const locator = this.page.locator(selector);

        try {
            await locator.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            return false;
        }
    }

    async dismissConsentOverlay() {
        await dismissCookiePopup(this.page);
    }
}

module.exports = LoginPage;
