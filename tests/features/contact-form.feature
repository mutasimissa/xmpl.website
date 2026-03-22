Feature: Contact form

  Scenario: Contact page has a form
    Given I navigate to "/contact"
    Then I should see a form element

  Scenario: Form has required fields
    Given I navigate to "/contact"
    Then the form should have a name field
    And the form should have an email field
    And the form should have a submit button

  Scenario: Empty form submission shows validation
    Given I navigate to "/contact"
    When I submit the form without filling it
    Then I should still be on the contact page
