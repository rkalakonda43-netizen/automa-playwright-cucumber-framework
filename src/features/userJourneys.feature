Feature: Automation Exercise Critical User Journeys


  Scenario: User Registration Journey
    Given user launches the application
    When user clicks on Signup/Login button
    And user enters signup details
    Then signup page should be displayed
    When user completes account registration
    Then User should see "ACCOUNT CREATED!"


  Scenario: User Login Journey
    Given user launches the application
    When user clicks on Signup/Login button
    And user has a registered account
    And user logs in with valid credentials
    Then user should be logged in
    And user can see Logout button
    
  Scenario: Product Search Journey
    Given user launches the application
    When user searches for a product "Blue top"
    Then matching products "Blue top" should be displayed
    # And I wait for 50 seconds



  Scenario: User checkout  Journey
    Given user launches the application
    When user clicks on Signup/Login button
    And user has a registered account
    And user logs in with valid credentials
    Then user should be logged in
    And user adds a product to cart
    And product should be added to cart
    And user click on view cart button
    And user should see the product in the cart
    And user clicks on proceed to checkout button
    And User clicks on place order button
    And user fills in payment details
    Then the order should be placed successfully with message "Congratulations! Your order has been confirmed!"
    # And wait for 50 seconds
  
