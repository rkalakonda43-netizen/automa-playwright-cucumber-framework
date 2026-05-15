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

Default test run:

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

The Cucumber `After` hook captures a full-page screenshot when a scenario fails:

```js
const screenshot = await this.page.screenshot({ fullPage: true });
await this.attach(screenshot, 'image/png');
```

Screenshots are attached to the Cucumber scenario result. For easier viewing, add a Cucumber HTML or JSON report.

## Notes

- The project is currently JavaScript, not TypeScript.
- Tests run in headed mode by default through `scripts/run-cucumber.js`.
- `test:headed` slows actions down and waits briefly before closing the browser so execution is easier to observe.
- Cookie and advertising overlays are handled in `src/support/cookieConsent.js`.
