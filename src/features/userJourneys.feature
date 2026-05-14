Feature: Automation Exercise Critical User Journeys

  Scenario: User Registration Journey
    Given user launches the application
    When user navigates to signup page
    And user enters signup details
    Then signup page should be displayed
    When user completes account registration
    Then account should be created successfully

  Scenario: User Login Journey
    Given user launches the application
    When user navigates to signup page
    And user logs in with valid credentials
    Then user should be logged in

  Scenario: Product Search Journey
    Given user launches the application
    When user searches for a product
    Then matching products should be displayed

  Scenario: Add Product To Cart Journey
    Given user launches the application
    When user adds a product to cart
    Then product should be added to cart
