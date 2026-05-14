# Automation Exercise Regression Framework

Framework created using:
- JavaScript
- Playwright
- Cucumber (BDD)
- Page Object Model (POM)

## Website Under Test
https://automationexercise.com

## Six Important User Journeys Identified

1. User Registration
2. User Login / Logout
3. Product Search and Product Details
4. Add Product to Cart and Checkout Flow
5. Contact Us Form Submission
6. Subscription Signup from Home/Footer

## Four Automated Journeys Selected

### 1. User Registration
Critical because account creation is a primary entry point for new users.

### 2. User Login
Validates authentication and existing user access.

### 3. Product Search
Ensures users can find products quickly and efficiently.

### 4. Add Product to Cart
Core e-commerce workflow directly linked to conversions and revenue.

## Framework Structure

```
src/
 ├── features/
 ├── pages/
 ├── steps/
 └── support/
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

Headless run:

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

`test:headed` slows actions down and waits 3 seconds before closing the browser after each scenario, so the browser window is easier to see.

## Notes
- Uses reusable page objects.
- Designed for easy scalability.
- Supports CI/CD integration.
