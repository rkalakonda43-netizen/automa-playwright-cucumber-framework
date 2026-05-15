---

# User Journey Analysis

## Six Important User Journeys Identified

After reviewing the website, the following six important user journeys were identified from both business and testing perspectives.

### 1. User Registration

This flow allows new users to create an account in the application.

**Why important:**

- Main onboarding flow for new users
- Required to access account-related features
- Important functionality for user management

### 2. User Login and Logout

This flow checks whether users can log in and log out successfully.

**Why important:**

- Core authentication functionality
- Frequently used by all registered users
- Important for account access and security

### 3. Product Search

This flow allows users to search for products available on the website.

**Why important:**

- Helps users find products easily
- Important for customer experience
- Core shopping functionality

### 4. Add Product to Cart

This flow validates whether users can add products to cart successfully.

**Why important:**

- Main e-commerce functionality
- Required before checkout process
- Important regression scenario

### 5. Checkout and Place Order

This flow validates the complete order placement and payment process.

**Why important:**

- Most critical business flow
- Directly related to revenue generation
- End-to-end purchase validation

### 6. Contact Us Form Submission

This flow validates customer support form submission.

**Why important:**

- Helps customers contact support team
- Validates form functionality
- Important customer interaction flow

---

# Selected User Journeys for Automation

Out of the above six journeys, the following four flows were selected for automation.

## 1. User Registration Journey

**Why selected:**

- Important onboarding functionality
- Covers form handling and validations
- High-impact regression scenario

**Automated coverage:**

- Navigate to signup page
- Enter user details
- Complete registration
- Verify account created message

## 2. User Login Journey

**Why selected:**

- Core authentication functionality
- Frequently used user flow
- Important for application access validation

**Automated coverage:**

- Navigate to login page
- Login with valid credentials
- Verify successful login
- Verify logout button visibility

## 3. Product Search Journey

**Why selected:**

- Important shopping functionality
- High user interaction flow
- Validates search capability

**Automated coverage:**

- Search for product
- Verify matching products are displayed

## 4. Add Product to Cart and Checkout Journey

**Why selected:**

- Most important business workflow
- Covers end-to-end purchase flow
- High regression and business value

**Automated coverage:**

- Login to application
- Add product to cart
- Verify cart details
- Proceed to checkout
- Place order
- Enter payment details
- Verify order confirmation message

---

# Automated Scenarios

## Scenario 1 – Register a New User Successfully

**Steps:**

- Launch application
- Open Signup/Login page
- Enter registration details
- Complete registration
- Verify account creation message

## Scenario 2 – Login with Valid Credentials

**Steps:**

- Launch application
- Open login page
- Enter valid credentials
- Verify successful login
- Verify logout button

## Scenario 3 – Search for a Product

**Steps:**

- Launch application
- Search for a product
- Verify matching products are displayed

## Scenario 4 – Complete Checkout Successfully

**Steps:**

- Login to application
- Add product to cart
- Verify cart details
- Proceed to checkout
- Place order
- Enter payment details
- Verify order confirmation message

# Automation Exercise Regression Framework

Playwright + Cucumber regression framework for critical user journeys on Automation Exercise.

## Tech Stack

- JavaScript
- Playwright
- Cucumber BDD
- Page Object Model
- Node.js / npm

## Website Under Test

https://automationexercise.com

## Automated Journeys

The framework currently covers these regression journeys:

1. User registration
2. User login
3. Product search
4. Add product to cart and complete checkout

## Project Structure

```text
src/
  features/
    userJourneys.feature
  pages/
    BasePage.js
    HomePage.js
    LoginPage.js
    ProductPage.js
    CheckoutPage.js
  steps/
    userSteps.js
  support/
    cookieConsent.js
    hooks.js
scripts/
  run-cucumber.js
```

## Page Object Model

The project follows Page Object Model principles:

- `BasePage.js` contains shared browser helpers such as click, fill, text retrieval, visibility checks, and cookie popup handling.
- `HomePage.js` contains home page navigation actions.
- `LoginPage.js` contains signup, registration, login, logout, and account verification actions.
- `ProductPage.js` contains product search and cart product actions.
- `CheckoutPage.js` contains checkout, payment, and order confirmation actions.
- Step definitions call reusable page methods and do not store page locators.

## Test Tags

Scenarios are tagged in `src/features/userJourneys.feature`.

Available tags:

```text
@smoke
@regression
@registration
@login
@products
@checkout
@e2e
```

Examples:

```bash
npm test -- --tags @login
npm test -- --tags @products
npm test -- --tags @checkout
npm test -- --tags "@smoke or @checkout"
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

## Run Tests

Default headed test run:

```bash
npm test
```

Visible browser run:

```bash
npm run test:headed
```

Debug run with Playwright Inspector and DevTools:

```bash
npm run test:debug
```

Smoke tests:

```bash
npm run test:smoke
```

Regression tests:

```bash
npm run test:regression
```

Checkout tests:

```bash
npm run test:checkout
```

## Screenshots On Failure

The Cucumber `After` hook captures a full-page screenshot when a scenario fails.

Failed screenshots are saved to:

```text
reports/screenshots/
```

Screenshots are also attached to the Cucumber report output.

## Test Reports

Each test run creates a report folder:

```text
reports/
  cucumber-report.html
  cucumber-report.json
  screenshots/
```

Open the HTML report in a browser:

```text
reports/cucumber-report.html
```

The JSON report is useful for CI/CD pipelines and report integrations:

```text
reports/cucumber-report.json
```

The `reports/` folder is generated during test execution and is ignored by Git.

## Notes

- The project is currently JavaScript, not TypeScript.
- Tests run in headed mode by default through `scripts/run-cucumber.js`.
- `test:headed` slows actions down and waits briefly before closing the browser so execution is easier to observe.
- Cookie and advertising overlays are handled in `src/support/cookieConsent.js`.
