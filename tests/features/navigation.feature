Feature: Site navigation

  Scenario: Navigation bar is visible
    Given I navigate to "/"
    Then I should see a navigation element

  Scenario: Nav links match the sitemap
    Given I navigate to "/"
    Then every primary navigation page should have a nav link

  Scenario: Clicking a nav link loads the correct page
    Given I navigate to "/"
    When I click the first non-home nav link
    Then I should be on the linked page
