Feature: Login functionality on SauceDemo

  Scenario: UC-1 Login with empty credentials
    Given I open the login page
    When I enter username "any_username"
    And I enter password "any_password"
    And I clear the username and password fields
    And I click the login button
    Then I should see the error message "Username is required"

  Scenario: UC-2 Login with only username
    Given I open the login page
    When I enter username "any_username"
    And I enter password "any_password"
    And I clear the password field
    And I click the login button
    Then I should see the error message "Password is required"

  Scenario Outline: UC-3 Login with accepted usernames
    Given I open the login page
    When I enter username "<username>"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see the dashboard title "Swag Labs" if login is successful or an error
    
    Examples:
      | username                  |
      | standard_user            |
      | locked_out_user          |
      | problem_user             |
      | performance_glitch_user |
