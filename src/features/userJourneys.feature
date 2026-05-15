Feature: Automation Exercise Critical User Journeys

  Scenario: User checkout journey
    Given user launches the application
    When user clicks on Signup/Login button
    And user has a registered account
    And user logs in with valid credentials
    Then user should be logged in
    And user adds a product to cart
    And product should be added to cart
    And user clicks on view cart button
    And user should see the product in the cart
    And user clicks on proceed to checkout button
    And user clicks on place order button
    And user fills in payment details
    Then the order should be placed successfully
    And wait for 50 seconds
